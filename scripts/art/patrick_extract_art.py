"""从用户布局图提取实际墙面画作；保留原图与裁切坐标，不伪称生成资产。"""
from pathlib import Path
from PIL import Image
import argparse, hashlib, json
parser=argparse.ArgumentParser();parser.add_argument('source');args=parser.parse_args()
root=Path(__file__).resolve().parents[2];source=Path(args.source)
out=root/'assets/patrick-reference/art';out.mkdir(parents=True,exist_ok=True)
archive=root/'docs/patrick-house-review/reference-20261013/sources';archive.mkdir(parents=True,exist_ok=True)
image=Image.open(source).convert('RGB');image.save(archive/'layout-original.png')
# Pillow QUAD: 左上、左下、右下、右上；仅反透视平面画作。
quads={
 'poster-band':(1027,316,1035,390,1081,398,1073,324),
 'poster-ocean':(1102,327,1120,408,1158,422,1139,342),
 'portrait-a':(586,650,585,677,607,674,608,644),
 'portrait-b':(1090,680,1090,719,1122,723,1123,685),
 'portrait-c':(1029,775,1026,805,1050,811,1056,778),
}
rows=[]
for name,quad in quads.items():
    size=(256,384) if name.startswith('poster') else (192,256)
    texture=image.transform(size,Image.Transform.QUAD,quad,Image.Resampling.BICUBIC)
    path=out/f'{name}.png';texture.save(path)
    rows.append(dict(id=name,source='用户提供的派大星屋布局图',quad=quad,size=size,file=path.relative_to(root).as_posix(),sha256=hashlib.sha256(path.read_bytes()).hexdigest()))
(archive/'art-extraction.json').write_text(json.dumps(dict(sourceSHA256=hashlib.sha256(source.read_bytes()).hexdigest(),art=rows),ensure_ascii=False,indent=2),encoding='utf-8')
