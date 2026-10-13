"""运行时精修：等待实际 Paint 产物，不用占位物冒充生成结果。"""
from pathlib import Path
import subprocess, time, json, hashlib
ROOT=Path(__file__).resolve().parents[2]
REMOTE='/workspace/projects/patrick-reference-20261013'
names=['patrick','armchair','bed','fridge','stove','old-tv']
out=ROOT/'assets/patrick-reference/models';out.mkdir(parents=True,exist_ok=True)
records=ROOT/'docs/patrick-house-review/reference-20261013/manifests';records.mkdir(parents=True,exist_ok=True)
def run(cmd):
    p=subprocess.run(cmd,capture_output=True,text=True,encoding='utf-8',errors='replace')
    if p.returncode:raise RuntimeError(p.stdout[-1600:]+p.stderr[-1600:])
    return p.stdout
def ssh(cmd):return run(['ssh','-o','BatchMode=yes','gsy013',cmd])
def upload(file,target):run(['scp','-q','-o','BatchMode=yes',str(file),f'gsy013:{target}'])
ssh(f'mkdir -p {REMOTE}/runtime')
upload(ROOT/'scripts/art/patrick_finish_asset.py',f'{REMOTE}/')
for name in names:
    manifest=records/f'{name}.json';raw=ROOT/'tmp/patrick-production/raw'/name/'textured.glb'
    while not manifest.exists():time.sleep(8)
    meta=json.loads(manifest.read_text(encoding='utf-8'));assert hashlib.sha256(raw.read_bytes()).hexdigest()==meta['texturedSHA256']
    upload(raw,f'{REMOTE}/runtime/{name}-source.glb');print('REFINE_START',name,flush=True)
    ssh(f'/workspace/.tools/blender-4.5.13-linux-x64/blender -b -t 4 --python-exit-code 1 --python {REMOTE}/patrick_finish_asset.py -- {REMOTE}/runtime/{name}-source.glb {REMOTE}/runtime/{name}.glb {name} > {REMOTE}/runtime/{name}.log 2>&1')
    for f,dest in [(f'{name}.glb',out/f'{name}.glb'),(f'{name}.json',records/f'{name}-runtime.json')]:run(['scp','-q','-o','BatchMode=yes',f'gsy013:{REMOTE}/runtime/{f}',str(dest)])
    runtime=json.loads((records/f'{name}-runtime.json').read_text(encoding='utf-8'))
    assert hashlib.sha256((out/f'{name}.glb').read_bytes()).hexdigest()==runtime['runtimeSHA256']
    assert runtime['rawSHA256']==meta['texturedSHA256']
    print('MODEL_READY',name,flush=True)
config=ROOT/'src/data/patrick-house.json';data=json.loads(config.read_text(encoding='utf-8'))
data['version']='20261013-reference1';data['status']='review'
data['assets']=[dict(id=name,url=f'assets/patrick-reference/models/{name}.glb') for name in names]
config.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('ALL_RUNTIME_READY',flush=True)
