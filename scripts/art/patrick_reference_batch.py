"""自有 L20 制作单件形体参考；原始布局图另存，不混入 Shape 输入。"""
import argparse, hashlib, json
from pathlib import Path
import torch
from diffusers import ZImagePipeline

parser = argparse.ArgumentParser()
parser.add_argument('--root', required=True)
parser.add_argument('--slot', type=int, default=0)
parser.add_argument('--host', required=True)
args = parser.parse_args()
root = Path(args.root); root.mkdir(parents=True, exist_ok=True)
revision = 'f332072aa78be7aecdf3ee76d5c247082da564a6'
model = f'/workspace/models/imagegen/huggingface/hub/models--Tongyi-MAI--Z-Image-Turbo/snapshots/{revision}'
items = [
 ('patrick', '海绵宝宝中的派大星 Patrick Star 单角色，全身正面。头部是细长圆润尖顶，圆润粉色大肚子，两个大圆眼睛黑瞳孔，短黑眉毛，开心微笑嘴和小肚脐。穿浅黄绿色沙滩短裤，紫色花朵。两条粗圆锥手臂朝左右斜下伸展，手臂和腰有清楚间隙，两只短粉色腿分开站立，无手指无鞋。原动画角色比例，头和腹部连续柔和曲面，完整五官，干净皮肤。'),
 ('armchair', '一把派大星地下客厅的旧奶油米白色单人布艺扶手椅，宽大舒适，圆润弧形高靠背、厚软坐垫、两侧卷曲圆扶手、四个矮木脚，布料有少量小斑点和手绘缝线，温暖怀旧，没有人物没有其他家具。'),
 ('bed', '一张派大星房间的蓝灰色矮单人床，蓝灰色圆润床架，四条完整床腿、厚床垫，紫色柔软被子自然起伏有圆润褶皱并垂到侧边，枕头是黄色可爱海星抱枕，细小棕色斑点、微笑眼睛。床头和床尾完整，无墙无地板无人物。'),
 ('fridge', '一台海底卡通浅灰蓝色复古冰箱，上方冷冻门、下方冷藏门，上下两门不是左右两门，每扇门左侧银色弯把手，整体圆角、短脚，蓝灰色金属外壳，有少量手绘划痕和旧污点，门缝清楚，冰箱顶部没有杂物，无其他物品。'),
 ('stove', '一台海底卡通深灰蓝色四眼炉灶烤箱，圆角完整金属箱体，顶部四个黑色炉盘，上前侧四个圆旋钮，大烤箱门蓝玻璃视窗和弯把手，四条短脚，旧金属手绘细微刮痕，结构厚实，无柜子无墙无其他物品。'),
 ('old-tv', '一台卡通复古木壳小电视机，完整深棕色木质机箱，前侧灰黑色圆角凸面显像管屏幕，右侧两个圆旋钮，顶部两根V形金属天线，下面四个短脚，清晰厚实曲面与旧木纹，屏幕关闭，无桌子无背景杂物。'),
]
base = '精致圆润三维游戏资产产品参考，海绵宝宝动画手绘风格，保留手绘材质与柔和环境遮蔽，非写实摄影非低多边形积木。主体居中完整入画，纯白无缝背景，无地面，无文字无标注无水印，柔和均匀灯光，轻微三分之四视角，前面和侧面都有真实厚度。'
pipe = ZImagePipeline.from_pretrained(model, torch_dtype=torch.bfloat16, local_files_only=True)
pipe.enable_model_cpu_offload()
for index, (name, description) in enumerate(items):
    if index % 2 != args.slot: continue
    out = root / name; out.mkdir(exist_ok=True)
    if (out/'reference.json').exists(): continue
    prompt = description + base
    if name == 'patrick': prompt = description + base.replace('轻微三分之四视角', '严格正面，左右对称')
    seed = 2026101300 + index
    image = pipe(prompt=prompt, width=768, height=1024 if name=='patrick' else 768,
                 num_inference_steps=9, guidance_scale=0,
                 generator=torch.Generator('cuda').manual_seed(seed)).images[0]
    image.save(out/'reference.png')
    record = dict(id=name, host=args.host, backend='Z-Image-Turbo', modelRevision=revision,
                  prompt=prompt, seed=seed, sourceSHA256=hashlib.sha256((out/'reference.png').read_bytes()).hexdigest(), status='review', humanReview='pending')
    (out/'reference.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n')
    print('REFERENCE_READY', name, flush=True)
