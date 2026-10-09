"""客厅两件独立道具：自有 T4 Shape → L20 Paint；保留原始产物与来源。"""
from pathlib import Path
import subprocess,json,hashlib,time

ROOT=Path(__file__).resolve().parents[2]
REMOTE='/workspace/projects/pineapple-devices-20261009'
T4=['-o','BatchMode=yes','-o','StrictHostKeyChecking=yes','-o','UserKnownHostsFile=C:/Users/Administrator/AppData/Local/Temp/codex-gsy0930-known-hosts','-o','IdentitiesOnly=yes','-i','C:/Users/Administrator/.ssh/id_ed25519']
def run(args):
    r=subprocess.run(args,capture_output=True,text=True,encoding='utf-8',errors='replace')
    if r.returncode:raise RuntimeError(r.stderr[-2000:])
    return r.stdout
def ssh(cmd):return run(['ssh','-o','BatchMode=yes','mygpu',cmd])
rows=json.loads((ROOT/'docs/house-device-review/references/references.json').read_text(encoding='utf-8'))
for row in rows:
    name=row['id'];out=ROOT/'docs/house-device-review/raw'/name;out.mkdir(parents=True,exist_ok=True)
    print('WAIT SHAPE',name,flush=True)
    while True:
        r=subprocess.run(['ssh',*T4,'-p','30627','root@192.168.88.194',f'test -f {REMOTE}/shape/{name}/manifest.json'])
        if r.returncode==0:break
        time.sleep(10)
    run(['scp',*T4,'-P','30627',f'root@192.168.88.194:{REMOTE}/shape/{name}/shape.glb',f'root@192.168.88.194:{REMOTE}/shape/{name}/manifest.json',str(out)])
    shape=json.loads((out/'manifest.json').read_text(encoding='utf-8'))
    assert hashlib.sha256((out/'shape.glb').read_bytes()).hexdigest()==shape['shapeSha256']
    ssh(f'mkdir -p {REMOTE}/{name}')
    run(['scp',str(out/'shape.glb'),str(ROOT/row['reference']),str(ROOT/'scripts/art/house_reduce_shape.py'),f'mygpu:{REMOTE}/{name}/'])
    ssh(f'/workspace/.tools/blender-4.5.13-linux-x64/blender -b -t 4 --python {REMOTE}/{name}/house_reduce_shape.py -- {REMOTE}/{name}/shape.glb {REMOTE}/{name}/paint-source.glb > {REMOTE}/{name}/reduce.log 2>&1')
    print('PAINT',name,flush=True)
    ssh(f'env CUDA_VISIBLE_DEVICES=1 bash /workspace/projects/forge3d/scripts/run-hunyuan-paint.sh {REMOTE}/{name}/paint-source.glb {REMOTE}/{name}/{name}.png {REMOTE}/{name}/textured.glb 6 768 prop 0.55 0.18 {row["seed"]} > {REMOTE}/{name}/paint.log 2>&1')
    run(['scp',f'mygpu:{REMOTE}/{name}/textured.glb',f'mygpu:{REMOTE}/{name}/paint.log',str(out)])
    record={**shape,'paintHost':'mygpu','paintGpu':1,'paintJobId':f'pineapple-devices-20261009-{name}-paint','paintBackend':'Hunyuan3D-Paint-2.1','paintViews':6,'paintResolution':768,'rawTexturedSha256':hashlib.sha256((out/'textured.glb').read_bytes()).hexdigest(),'state':'review','humanReview':'pending'}
    (out/'manifest.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('READY',name,flush=True)
