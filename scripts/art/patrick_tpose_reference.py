"""修复手臂/腹部融合：生成有明确肢体间隙的参考，不重跑家具。"""
from pathlib import Path
import hashlib,json,sys,torch
from diffusers import ZImagePipeline
root=Path(sys.argv[1]);root.mkdir(parents=True,exist_ok=True)
revision='f332072aa78be7aecdf3ee76d5c247082da564a6'
model=f'/workspace/models/imagegen/huggingface/hub/models--Tongyi-MAI--Z-Image-Turbo/snapshots/{revision}'
prompt='派大星 Patrick Star 的三维游戏角色建模参考，严格正面全身，标准T-pose。最重要：两条粉色圆锥形手臂完全水平伸向左右，两臂与腰腹之间有大面积清楚的白色空隙，手臂只在肩部连接躯干；不要下垂手臂，不要抱胸。粉色圆润细长尖头、大肚子、小肚脐，两个黑眉毛，大圆白眼黑瞳孔，开心微笑嘴。浅黄绿色短裤，紫色大花朵，两条粉色短腿分开，完整脚底无鞋无手指。海绵宝宝经典可爱比例，柔和连续曲面，清晰手绘卡通材质，非积木非低多边形。纯白背景，没有地面没有地面影子，无任何其他物体，无文字，无水印，角色完整入画。均匀柔和灯光。'
pipe=ZImagePipeline.from_pretrained(model,torch_dtype=torch.bfloat16,local_files_only=True);pipe.enable_model_cpu_offload()
image=pipe(prompt=prompt,width=1024,height=1024,num_inference_steps=9,guidance_scale=0,generator=torch.Generator('cuda').manual_seed(2026101318)).images[0]
image.save(root/'reference.png')
row=dict(id='patrick-tpose',host='mygpu',backend='Z-Image-Turbo',modelRevision=revision,prompt=prompt,seed=2026101318,sourceSHA256=hashlib.sha256((root/'reference.png').read_bytes()).hexdigest(),status='review',humanReview='pending')
(root/'reference.json').write_text(json.dumps(row,ensure_ascii=False,indent=2)+'\n');print('TPOSE_REFERENCE_READY',flush=True)
