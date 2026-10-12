"""在自有 GPU 上制作海绵宝宝形体参考，记录来源。"""
from pathlib import Path
import hashlib, json, sys
import torch
from diffusers import ZImagePipeline

out = Path(sys.argv[1]); out.mkdir(parents=True, exist_ok=True)
model = '/workspace/models/imagegen/huggingface/hub/models--Tongyi-MAI--Z-Image-Turbo/snapshots/f332072aa78be7aecdf3ee76d5c247082da564a6'
prompt = '海绵宝宝 SpongeBob SquarePants 的单角色全身三维游戏角色参考图。经典黄色长方形海绵身体，身体表面圆润起伏和大小海绵孔，蓝色大眼睛，长鼻子，两个门牙，快乐微笑。白色短袖衬衫，红色小领带，棕色短裤，两条纤细黄色腿，白袜带蓝红条纹，圆润黑色皮鞋。两只细黄色手臂向两侧伸开，A pose，手臂与身体分离，完整四根手指，双脚分开站立。正面，左右对称，纯白背景，只有一个角色，完整入画，不裁掉鞋子，无地面无家具无文字无水印。柔和均匀光线，动画片手绘纹理，精致圆润曲面，清晰五官，保留原作的可爱比例。'
seed = 2026101207
path = out / 'reference.png'
if not path.exists():
    pipe = ZImagePipeline.from_pretrained(model, torch_dtype=torch.bfloat16, local_files_only=True)
    pipe.enable_model_cpu_offload()
    image = pipe(prompt=prompt, width=768, height=1024, num_inference_steps=9, guidance_scale=0, generator=torch.Generator('cuda').manual_seed(seed)).images[0]
    image.save(path)
    (out / 'reference.json').write_text(json.dumps({'assetId':'spongebob-companion','host':'gsy013','backend':'Z-Image-Turbo','modelRevision':Path(model).name,'seed':seed,'prompt':prompt,'sourceSHA256':hashlib.sha256(path.read_bytes()).hexdigest(),'humanReview':'pending','status':'review'}, ensure_ascii=False, indent=2)+'\n')
print('REFERENCE_READY', flush=True)
