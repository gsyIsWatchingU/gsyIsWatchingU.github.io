"""家具批次调度：T4 Shape → L20 Paint，下载原始产物并保存来源。"""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import hashlib
import json
import subprocess
import time

ROOT = Path(__file__).resolve().parents[2]
REMOTE = "/workspace/3d-assets/pineapple-house-20261009"
T4_SSH = ["-o","BatchMode=yes","-o","ConnectTimeout=10","-o","StrictHostKeyChecking=yes","-o","UserKnownHostsFile=C:/Users/Administrator/AppData/Local/Temp/codex-gsy0930-known-hosts","-o","IdentitiesOnly=yes","-i","C:/Users/Administrator/.ssh/id_ed25519"]
RAW = ROOT / "tmp/house-production/raw"
MANIFESTS = ROOT / "docs/house-review/manifests"
RAW.mkdir(parents=True, exist_ok=True)
MANIFESTS.mkdir(parents=True, exist_ok=True)
rows = json.loads((ROOT / "docs/house-review/sources/references.json").read_text(encoding="utf-8"))

def run(cmd):
    result = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if result.returncode:
        raise RuntimeError(f"{cmd[0]} failed: {result.stderr[-1500:]}")
    return result.stdout

def ssh(host, command):
    return run(["ssh","-o","BatchMode=yes","-o","ConnectTimeout=10",host,command])

def t4(command):
    return run(["ssh",*T4_SSH,"-p","30627","root@192.168.88.194",command])

def worker(slot, host):
    ssh(host, f"mkdir -p {REMOTE}/input")
    run(["scp","-q","-o","BatchMode=yes",str(ROOT / "scripts/art/house_reduce_shape.py"),f"{host}:{REMOTE}/input/"])
    for index, row in enumerate(rows):
        if index % 2 != slot:
            continue
        name = row["id"]
        destination = RAW / name
        destination.mkdir(exist_ok=True)
        record_path = MANIFESTS / f"{name}.json"
        if record_path.exists() and (destination / "textured.glb").exists():
            continue
        while t4(f"test -f {REMOTE}/shape/{name}/manifest.json && echo ready || echo waiting").strip() != "ready":
            time.sleep(12)
        run(["scp","-q",*T4_SSH,"-P","30627",f"root@192.168.88.194:{REMOTE}/shape/{name}/shape.glb",str(destination / "shape.glb")])
        shape = json.loads(t4(f"cat {REMOTE}/shape/{name}/manifest.json"))
        if hashlib.sha256((destination / "shape.glb").read_bytes()).hexdigest() != shape["shapeSha256"]:
            raise RuntimeError(f"{name}: transferred shape SHA differs")
        run(["scp","-q","-o","BatchMode=yes",str(destination / "shape.glb"),str(ROOT / row["reference"]),f"{host}:{REMOTE}/input/"])
        ssh(host, f"/workspace/.tools/blender-4.5.13-linux-x64/blender -b -t 4 --python {REMOTE}/input/house_reduce_shape.py -- {REMOTE}/input/shape.glb {REMOTE}/input/paint-source.glb > {REMOTE}/input/{name}-reduce.log 2>&1")
        if host == "mygpu":
            # 该机现有控制面不含 paint-only 路由。直接使用已部署的同一 Hunyuan 后端，
            # 不修改生产 API，也不重新执行已完成的 Shape。
            job_id=f"house-20261009-{name}-paint"
            print(f"PAINT {name} {host} {job_id} direct-backend",flush=True)
            output=f"{REMOTE}/input/{name}-textured.glb"
            ssh(host,f"test -f {output} || env CUDA_VISIBLE_DEVICES=1 bash /workspace/projects/forge3d/scripts/run-hunyuan-paint.sh {REMOTE}/input/paint-source.glb {REMOTE}/input/{name}.png {output} 6 768 prop 0.55 0.18 {row['seed']} > {REMOTE}/input/{name}-paint.log 2>&1")
            run(["scp","-q","-o","BatchMode=yes",f"{host}:{output}",str(destination/"textured.glb")])
            run(["scp","-q","-o","BatchMode=yes",f"{host}:{REMOTE}/input/{name}-paint.log",str(destination/"pipeline.log")])
            record={**shape,"paintHost":host,"paintJobId":job_id,"paintManifest":{"backend":"Hunyuan3D-Paint-2.1","execution":"direct deployed backend; API lacks paint-only route","seed":row['seed'],"views":6,"resolution":768,"state":"completed"},"rawTexturedSha256":hashlib.sha256((destination/"textured.glb").read_bytes()).hexdigest(),"rawRemotePath":f"{host}:{output}","humanReview":"pending","state":"review"}
            record_path.write_text(json.dumps(record,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
            print(f"DOWNLOADED {name}",flush=True)
            continue
        # 每个工位一次一个请求；同名 shape.glb 只在该任务提交完成前使用。
        job_file = destination / "paint-job.json"
        if job_file.exists():
            job = json.loads(job_file.read_text(encoding="utf-8"))
        else:
            command = f"curl -fsS --max-time 120 -X POST http://127.0.0.1:8091/v1/stages/paint -F mesh=@{REMOTE}/input/paint-source.glb -F material_source=@{REMOTE}/input/{name}.png -F asset_name=house-{name}-20261009 -F asset_kind=prop -F profile=xhs_mobile -F seed={row['seed']}"
            job = json.loads(ssh(host, command))
            job_file.write_text(json.dumps(job,ensure_ascii=False,indent=2),encoding="utf-8")
        job_id = job["job_id"]
        print(f"PAINT {name} {host} {job_id}", flush=True)
        while True:
            job = json.loads(ssh(host,f"curl -fsS http://127.0.0.1:8091/v1/jobs/{job_id}"))
            if job["state"] in ("completed","review"):
                break
            if job["state"] == "failed":
                raise RuntimeError(f"{name} paint failed: {json.dumps(job,ensure_ascii=False)[-1800:]}")
            time.sleep(12)
        for filename in ("manifest.json","pipeline.log","work/textured.glb"):
            run(["scp","-q","-o","BatchMode=yes",f"{host}:/workspace/3d-assets/jobs/{job_id}/{filename}",str(destination / Path(filename).name)])
        paint_manifest = json.loads((destination / "manifest.json").read_text(encoding="utf-8"))
        record = {**shape,"paintHost":host,"paintJobId":job_id,"paintManifest":paint_manifest,"rawTexturedSha256":hashlib.sha256((destination / "textured.glb").read_bytes()).hexdigest(),"rawRemotePath":f"{host}:/workspace/3d-assets/jobs/{job_id}/work/textured.glb","humanReview":"pending","state":"review"}
        record_path.write_text(json.dumps(record,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
        print(f"DOWNLOADED {name}",flush=True)

with ThreadPoolExecutor(max_workers=2) as pool:
    futures = [pool.submit(worker,0,"gsy013"),pool.submit(worker,1,"mygpu")]
    for future in futures:
        future.result()
print("ALL FURNITURE DOWNLOADED", flush=True)
