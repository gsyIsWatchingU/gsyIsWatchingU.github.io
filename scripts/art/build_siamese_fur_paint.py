"""在自有 L20 上执行 Hunyuan3D 贴图阶段，并记录可核验来源。"""
from pathlib import Path
import hashlib,json,os,subprocess,time,socket,sys
root=Path(sys.argv[1]);started=time.time()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
shape=json.loads((root/'shape-manifest.json').read_text()) if (root/'shape-manifest.json').is_file() else {'runId':'siamese-kitten-fur-20261010-shape','seed':1040}
record={'runId':shape['runId'].replace('shape','paint'),'host':'gsy013','hostname':socket.gethostname(),'gpu':0,'backend':'Hunyuan3D-2.1 Paint','views':8,'resolution':768,'seed':shape['seed'],'sourceSha256':sha(root/'standing-guide.png'),'meshSha256':sha(root/'shape-web.glb'),'state':'running'}
manifest=root/'paint-manifest.json'
manifest.write_text(json.dumps(record,indent=2)+'\n')
env=os.environ.copy();env['CUDA_VISIBLE_DEVICES']='0';env['FORGE3D_BLENDER']='/workspace/.tools/blender-4.5.13-linux-x64/blender'
command=['/workspace/projects/forge3d/scripts/run-hunyuan-paint.sh',str(root/'shape-web.glb'),str(root/'standing-guide.png'),str(root/'textured.glb'),'8','768','prop','.88','.15',str(shape['seed'])]
with (root/'paint.log').open('w') as log,(root/'paint-gpu.csv').open('w') as gpu:
    process=subprocess.Popen(command,env=env,stdout=log,stderr=subprocess.STDOUT)
    while process.poll() is None:
        sample=subprocess.check_output(['nvidia-smi','--query-gpu=timestamp,uuid,memory.used,utilization.gpu','--format=csv,noheader']).decode()
        gpu.write(sample);gpu.flush();time.sleep(4)
record.update(state='review' if process.returncode==0 else 'failed',exitCode=process.returncode,elapsedSeconds=round(time.time()-started,2))
if process.returncode==0:record['texturedSha256']=sha(root/'textured.glb')
manifest.write_text(json.dumps(record,indent=2)+'\n');print(json.dumps(record));sys.exit(process.returncode)
