"""四个自有 T4 独立 Shape 工位，输入与输出各自记录。"""
import argparse, hashlib, json, os, sys, time
from pathlib import Path
parser=argparse.ArgumentParser();parser.add_argument('--root',required=True);parser.add_argument('--slot',type=int,required=True)
args=parser.parse_args();root=Path(args.root)
repo=Path('/workspace/projects/forge3d/vendor/Hunyuan3D-2.1')
sys.path.insert(0,str(repo));sys.path.insert(0,str(repo/'hy3dshape'))
os.environ['HY3DGEN_MODELS']='/workspace/models/forge3d/hy3dgen';os.environ['HF_HOME']='/workspace/models/forge3d/huggingface'
from PIL import Image
import torch
from hy3dshape.pipelines import Hunyuan3DDiTFlowMatchingPipeline
pipe=Hunyuan3DDiTFlowMatchingPipeline.from_pretrained('tencent/Hunyuan3D-2.1',subfolder='hunyuan3d-dit-v2-1')
rows=json.loads((root/'references.json').read_text())
for i,row in enumerate(rows):
    if i%4!=args.slot:continue
    out=root/'shape'/row['id'];out.mkdir(parents=True,exist_ok=True)
    if (out/'manifest.json').exists():continue
    source=root/'input'/f"{row['id']}.png"
    image=Image.open(source).convert('RGBA')
    # 单件白底参考，明确前景。保留浅色布料，不将白色物件整个抠空。
    import numpy as np
    a=np.array(image)
    if row.get('cleanBorder'):
        from scipy.ndimage import binary_propagation
        neutral=a[:,:,:3].max(axis=2).astype(float)-a[:,:,:3].min(axis=2)<32
        seeds=np.zeros(neutral.shape,dtype=bool);seeds[0]=neutral[0];seeds[-1]=neutral[-1];seeds[:,0]=neutral[:,0];seeds[:,-1]=neutral[:,-1]
        background=binary_propagation(seeds,mask=neutral)
    else:background=(a[:,:,:3].min(axis=2)>245)&((a[:,:,:3].max(axis=2)-a[:,:,:3].min(axis=2))<5)
    a[:,:,3]=np.where(background,0,255).astype('uint8');image=Image.fromarray(a)
    if np.count_nonzero(a[:,:,3])<a.shape[0]*a.shape[1]*.03:raise RuntimeError('empty foreground '+row['id'])
    image.save(out/'shape-input.png');started=time.time();print('START',row['id'],flush=True)
    steps=row.get('steps',40);resolution=row.get('octree',512)
    mesh=pipe(image=image,num_inference_steps=steps,guidance_scale=5.0,octree_resolution=resolution,
              generator=torch.Generator(device='cpu').manual_seed(row['seed']))[0]
    mesh.export(out/'shape.glb')
    record={**row,'shapeHost':'gsy0930','gpu':args.slot,'backend':'Hunyuan3D-2.1','steps':steps,'octree':resolution,
            'job_id':f"patrick-reference-20261013-{row['id']}-shape",'shapeSha256':hashlib.sha256((out/'shape.glb').read_bytes()).hexdigest(),
            'triangles':len(mesh.faces),'elapsedSeconds':round(time.time()-started,2),'status':'review','humanReview':'pending'}
    (out/'manifest.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n');print('DONE',row['id'],flush=True)
    del mesh;torch.cuda.empty_cache()
