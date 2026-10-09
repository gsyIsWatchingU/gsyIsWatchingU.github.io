"""按真实下载完成状态启动 Blender 修整并同步运行时产物。"""
from pathlib import Path
import subprocess
import time
import json

ROOT=Path(__file__).resolve().parents[2]
REMOTE="/workspace/projects/pineapple-house-20261009"
rows=json.loads((ROOT/"docs/house-review/sources/references.json").read_text(encoding="utf-8"))
out=ROOT/"assets/house-review/props";out.mkdir(parents=True,exist_ok=True)
previews=ROOT/"docs/house-review/props";previews.mkdir(parents=True,exist_ok=True)
def run(cmd):
    r=subprocess.run(cmd,capture_output=True,text=True,encoding="utf-8",errors="replace")
    if r.returncode:raise RuntimeError(r.stderr[-1200:])
    return r.stdout
def ssh(cmd):return run(["ssh","-o","BatchMode=yes","-o","ConnectTimeout=10","gsy013",cmd])
ssh(f"mkdir -p {REMOTE}/props/input {REMOTE}/props/export")
run(["scp","-q","-o","BatchMode=yes",str(ROOT/"scripts/art/house_retopology.py"),f"gsy013:{REMOTE}/"])
pending={r["id"] for r in rows}
while pending:
    for name in list(pending):
        path=out/f"{name}.glb"
        if path.exists() and (previews/f"{name}-runtime.json").exists() and (previews/f"{name}-quarter.png").exists():
            record=json.loads((previews/f"{name}-runtime.json").read_text(encoding="utf-8"))
            if record.get("meshBackend")=="Blender reference retopology" and record.get("revision")==3:pending.remove(name);continue
        raw=ROOT/f"tmp/house-production/raw/{name}/textured.glb"
        manifest=ROOT/f"docs/house-review/manifests/{name}.json"
        if not raw.exists() or not manifest.exists():continue
        run(["scp","-q","-o","BatchMode=yes",str(raw),f"gsy013:{REMOTE}/props/input/{name}.glb"])
        ssh(f"/workspace/.tools/blender-4.5.13-linux-x64/blender -b -t 6 --python {REMOTE}/house_retopology.py -- {REMOTE}/props/input/{name}.glb {REMOTE}/props/export {name} {REMOTE}/textures > {REMOTE}/props/{name}.log 2>&1")
        run(["scp","-q","-o","BatchMode=yes",f"gsy013:{REMOTE}/props/export/{name}.glb",str(path)])
        for filename in (f"{name}-runtime.json",f"{name}-front.png",f"{name}-quarter.png"):
            run(["scp","-q","-o","BatchMode=yes",f"gsy013:{REMOTE}/props/export/{filename}",str(previews/filename)])
        pending.remove(name);print(f"RUNTIME READY {name}",flush=True)
    if pending:time.sleep(12)
print("ALL RUNTIME PROPS READY",flush=True)
