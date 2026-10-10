"""自有 T4 Hunyuan Shape 阶段；来源、参数和 CUDA 峰值随产物保存。"""
from pathlib import Path
import os,sys,json,time,hashlib,socket
root=Path(sys.argv[1]);root.mkdir(parents=True,exist_ok=True)
repo=Path('/workspace/projects/forge3d/vendor/Hunyuan3D-2.1')
sys.path[:0]=[str(repo),str(repo/'hy3dshape')]
os.environ['HY3DGEN_MODELS']='/workspace/models/forge3d/hy3dgen'
os.environ['HF_HOME']='/workspace/models/forge3d/huggingface'
os.environ['U2NET_HOME']='/workspace/models/forge3d/rembg'
from PIL import Image
import torch
from hy3dshape.rembg import BackgroundRemover
from hy3dshape.pipelines import Hunyuan3DDiTFlowMatchingPipeline
source=root/'standing-guide.png';seed=int(sys.argv[4]) if len(sys.argv)>4 else 1040;started=time.time()
record={'asset':'siamese-kitten-fur','runId':sys.argv[2] if len(sys.argv)>2 else 'siamese-kitten-fur-20261010-shape','host':sys.argv[3] if len(sys.argv)>3 else 'gsy0930','hostname':socket.gethostname(),'gpu':int(os.environ.get('CUDA_VISIBLE_DEVICES','0')),'backend':'Hunyuan3D-2.1','seed':seed,'steps':50,'octree':512,'guidance':5.0,'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'state':'running'}
(root/'shape-manifest.json').write_text(json.dumps(record,indent=2)+'\n')
pipeline=Hunyuan3DDiTFlowMatchingPipeline.from_pretrained('tencent/Hunyuan3D-2.1',subfolder='hunyuan3d-dit-v2-1',dtype=torch.float16)
image=BackgroundRemover()(Image.open(source).convert('RGB'))
mesh=pipeline(image=image,num_inference_steps=50,guidance_scale=5.0,octree_resolution=512,generator=torch.Generator(device='cpu').manual_seed(seed))[0]
output=root/'shape.glb';mesh.export(output)
record.update(state='review',elapsedSeconds=round(time.time()-started,2),triangles=len(mesh.faces),cudaPeakBytes=torch.cuda.max_memory_allocated(),shapeSha256=hashlib.sha256(output.read_bytes()).hexdigest())
(root/'shape-manifest.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps(record),flush=True)
