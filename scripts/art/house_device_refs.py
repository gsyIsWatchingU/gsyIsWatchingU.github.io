"""自有 L20 生成音箱与笔记本的独立形体参考，保留参数和哈希。"""
from pathlib import Path
import hashlib
import json
import sys
import torch
from diffusers import ZImagePipeline

out=Path(sys.argv[1]);out.mkdir(parents=True,exist_ok=True)
model='/workspace/models/imagegen/huggingface/hub/models--Tongyi-MAI--Z-Image-Turbo/snapshots/f332072aa78be7aecdf3ee76d5c247082da564a6'
pipe=ZImagePipeline.from_pretrained(model,torch_dtype=torch.bfloat16,local_files_only=True)
pipe.enable_model_cpu_offload()
prompts={
 'speaker': '单个便携蓝牙音箱的游戏道具设计图，完整独立物品，纯白背景，无桌子无人物。海绵宝宝动画布景的手绘卡通风格，正面三分之四视角，圆角长方体，深蓝绿织物网罩，蜂蜜色木框，顶部两个圆形黄铜旋钮和小电源按钮，低矮橡胶脚，少量柔和明暗和轮廓线，比例宽2高1深1，厚实可信，表面细腻手绘材质，无文字无商标，无漂浮零件。',
 'laptop': '单个打开的笔记本电脑游戏道具设计图，完整独立物品，纯白背景，无桌子无人物。海绵宝宝动画布景的手绘卡通风格，正面三分之四视角，从略高处看见完整屏幕和键盘，屏幕与底座打开110度，浅蓝色圆润金属外壳，深蓝色屏幕边框，浅米色键帽，蓝绿色屏幕上一枚大大的海贝图案，底座有触控板，薄而有厚度的机身和清晰铰链，少量柔和明暗和轮廓线，表面细腻手绘材质，无文字无商标，只有一台电脑，无漂浮零件。'
}
for i,(name,prompt) in enumerate(prompts.items()):
 seed=2026100906+i;path=out/(name+'.png')
 if path.exists():continue
 image=pipe(prompt=prompt,width=768,height=768,num_inference_steps=9,guidance_scale=0,generator=torch.Generator('cuda').manual_seed(seed)).images[0]
 image.save(path)
 (out/(name+'-reference.json')).write_text(json.dumps({'id':name,'host':'mygpu','gpu':0,'backend':'Z-Image-Turbo','modelRevision':Path(model).name,'prompt':prompt,'seed':seed,'steps':9,'size':[768,768],'sourceSHA256':hashlib.sha256(path.read_bytes()).hexdigest(),'status':'review'},ensure_ascii=False,indent=2)+'\n')
 print('REFERENCE READY',name,flush=True)
