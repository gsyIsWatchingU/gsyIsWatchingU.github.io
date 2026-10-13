"""六件参考资产：两张 L20 制图 → 四张 T4 Shape → 两张 L20 Paint。"""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import hashlib, json, subprocess, time, sys

ROOT=Path(__file__).resolve().parents[2]
REMOTE='/workspace/projects/patrick-reference-20261013'
T4=['-o','BatchMode=yes','-o','StrictHostKeyChecking=yes','-o','IdentitiesOnly=yes','-i','C:/Users/Administrator/.ssh/id_ed25519']
SOURCE=ROOT/'docs/patrick-house-review/reference-20261013/sources'
RAW=ROOT/'tmp/patrick-production/raw';SOURCE.mkdir(parents=True,exist_ok=True);RAW.mkdir(parents=True,exist_ok=True)
names=['patrick','armchair','bed','fridge','stove','old-tv']
def run(cmd):
    p=subprocess.run(cmd,capture_output=True,text=True,encoding='utf-8',errors='replace')
    if p.returncode:raise RuntimeError(' '.join(cmd[:3])+' '+p.stderr[-1800:]+p.stdout[-800:])
    return p.stdout
def ssh(host,cmd):return run(['ssh','-o','BatchMode=yes','-o','ConnectTimeout=10',host,cmd])
def t4(cmd):return run(['ssh',*T4,'-p','30627','root@192.168.88.194',cmd])
def scp(host,remote,local):run(['scp','-q','-o','BatchMode=yes',f'{host}:{remote}',str(local)])
rows=[]
for i,name in enumerate(names):
    host='gsy013' if i%2==0 else 'mygpu';folder=SOURCE/name;folder.mkdir(exist_ok=True)
    while ssh(host,f'test -f {REMOTE}/refs/{name}/reference.json && echo ready || echo waiting').strip()!='ready':time.sleep(8)
    for f in ['reference.png','reference.json']:scp(host,f'{REMOTE}/refs/{name}/{f}',folder/f)
    row=json.loads((folder/'reference.json').read_text(encoding='utf-8'));assert hashlib.sha256((folder/'reference.png').read_bytes()).hexdigest()==row['sourceSHA256']
    rows.append(row)
    print('REFERENCE',name,flush=True)
(RAW/'references.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
t4(f'mkdir -p {REMOTE}/input {REMOTE}/shape')
run(['scp','-q',*T4,'-P','30627',str(ROOT/'scripts/art/patrick_shape_batch.py'),str(RAW/'references.json'),f'root@192.168.88.194:{REMOTE}/'])
for name in names:
    run(['scp','-q',*T4,'-P','30627',str(SOURCE/name/'reference.png'),f'root@192.168.88.194:{REMOTE}/input/{name}.png'])
def shape(slot):
    print('T4_START',slot,flush=True)
    result=t4(f'env CUDA_VISIBLE_DEVICES={slot} /workspace/runtime/hunyuan3d/bin/python {REMOTE}/patrick_shape_batch.py --root {REMOTE} --slot {slot} > {REMOTE}/shape-{slot}.log 2>&1')
    print('T4_DONE',slot,flush=True);return result
def paint(slot):
    host='gsy013' if slot==0 else 'mygpu';gpu=0 if slot==0 else 1
    ssh(host,f'mkdir -p {REMOTE}/paint')
    run(['scp','-q','-o','BatchMode=yes',str(ROOT/'scripts/art/house_reduce_shape.py'),f'{host}:{REMOTE}/'])
    for i,row in enumerate(rows):
        if i%2!=slot:continue
        name=row['id'];folder=RAW/name;folder.mkdir(exist_ok=True)
        if (ROOT/f'docs/patrick-house-review/reference-20261013/manifests/{name}.json').exists():continue
        while t4(f'test -f {REMOTE}/shape/{name}/manifest.json && echo ready || echo waiting').strip()!='ready':time.sleep(10)
        for f in ['shape.glb','manifest.json']:
            run(['scp','-q',*T4,'-P','30627',f'root@192.168.88.194:{REMOTE}/shape/{name}/{f}',str(folder/f)])
        manifest=json.loads((folder/'manifest.json').read_text(encoding='utf-8'));assert hashlib.sha256((folder/'shape.glb').read_bytes()).hexdigest()==manifest['shapeSha256']
        run(['scp','-q','-o','BatchMode=yes',str(folder/'shape.glb'),f'{host}:{REMOTE}/paint/{name}-shape.glb'])
        run(['scp','-q','-o','BatchMode=yes',str(SOURCE/name/'reference.png'),f'{host}:{REMOTE}/paint/{name}-reference.png'])
        ssh(host,f'/workspace/.tools/blender-4.5.13-linux-x64/blender -b -t 4 --python {REMOTE}/house_reduce_shape.py -- {REMOTE}/paint/{name}-shape.glb {REMOTE}/paint/{name}-reduced.glb > {REMOTE}/paint/{name}-reduce.log 2>&1')
        print('PAINT_START',host,name,flush=True)
        # 现有部署后端；不修改生产 API、不重启 Worker、不重复 Shape。
        for attempt in range(60):
            free=int(ssh(host,f'nvidia-smi --id={gpu} --query-gpu=memory.free --format=csv,noheader,nounits').strip())
            if free>44000:break
            if attempt%6==0:print('WAIT_GPU_RELEASE',host,free,flush=True)
            time.sleep(5)
        else:raise RuntimeError(f'{host} GPU {gpu} is occupied; no process was stopped')
        options=str(row['seed']) if host=='gsy013' else "'hand-painted cartoon material' --preserve-mesh"
        resolution=512 if '--paint-512' in sys.argv else 768
        ssh(host,f"env CUDA_VISIBLE_DEVICES={gpu} bash /workspace/projects/forge3d/scripts/run-hunyuan-paint.sh {REMOTE}/paint/{name}-reduced.glb {REMOTE}/paint/{name}-reference.png {REMOTE}/paint/{name}-textured.glb 6 {resolution} {'character' if name=='patrick' else 'prop'} 0.55 0.18 {options} > {REMOTE}/paint/{name}-paint.log 2>&1")
        for remote,local in [(f'{name}-textured.glb','textured.glb'),(f'{name}-paint.log','paint.log')]:scp(host,f'{REMOTE}/paint/{remote}',folder/local)
        manifest['referenceBackend']='Z-Image-Turbo';manifest['referenceModelRevision']=manifest.pop('modelRevision');manifest['shapeModelDirectory']='/workspace/models/forge3d/hy3dgen';manifest['jobIdKind']='local stage correlation ids; direct deployed backend, not Forge3D API job ids'
        manifest.update(paintHost=host,paintGpu=gpu,paintBackend='Hunyuan3D-Paint-2.1',execution='direct deployed backend; no production service changes',paintJobId=f'patrick-reference-20261013-{name}-paint',paintViews=6,paintResolution=resolution,texturedSHA256=hashlib.sha256((folder/'textured.glb').read_bytes()).hexdigest(),status='review',humanReview='pending')
        (folder/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
        dest=ROOT/'docs/patrick-house-review/reference-20261013/manifests';dest.mkdir(parents=True,exist_ok=True)
        (dest/f'{name}.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
        print('TEXTURED_READY',name,flush=True)
with ThreadPoolExecutor(max_workers=6) as pool:
    slots=[0] if '--paint-slot0' in sys.argv else [1] if '--paint-slot1' in sys.argv else [0,1]
    futures=([] if '--paint-only' in sys.argv else [pool.submit(shape,s) for s in range(4)])+[pool.submit(paint,s) for s in slots]
    for f in futures:f.result()
print('ALL_READY',flush=True)
