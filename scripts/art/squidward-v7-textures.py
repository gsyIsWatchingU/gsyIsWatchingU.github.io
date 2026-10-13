"""GPU 纹理的确定性裁边与颜色适配，保留原图及处理参数。"""
import hashlib,json,pathlib
from PIL import Image,ImageOps
root=pathlib.Path(__file__).resolve().parents[2]/'docs/neighborhood-review/refs/v7'
wood=Image.open(root/'wood-planks.png').convert('RGB')
gray=ImageOps.grayscale(wood)
ImageOps.colorize(gray,(12,42,35),(76,115,86)).save(root/'green-painted-wood.png')
Image.open(root/'rug-green.png').crop((23,23,1000,1000)).save(root/'rug-surface.png')
tilegray=ImageOps.grayscale(Image.open(root/'tile-green.png'))
ImageOps.colorize(tilegray,(45,63,59),(166,174,160)).save(root/'floor-tile.png')
fabricgray=ImageOps.grayscale(Image.open(root/'rug-surface.png'))
ImageOps.colorize(fabricgray,(20,40,65),(88,126,158)).save(root/'blue-fabric.png')
curtain=Image.open(root/'blue-fabric.png').convert('RGB')
for x in range(0,curtain.width,128):
 curtain.paste((204,213,208),(x,0,min(x+60,curtain.width),curtain.height))
curtain.save(root/'blue-striped-curtain.png')
stonegray=ImageOps.autocontrast(ImageOps.grayscale(Image.open(root/'stone-blue.png')),cutoff=2)
ImageOps.colorize(stonegray,(19,32,48),(95,128,148)).save(root/'stone-weathered.png')
records=[{'source':'wood-planks.png','output':'green-painted-wood.png','operation':'grayscale then colorize','black':[12,42,35],'white':[76,115,86]}, {'source':'rug-green.png','output':'rug-surface.png','operation':'crop','box':[23,23,1000,1000]}, {'source':'tile-green.png','output':'floor-tile.png','operation':'grayscale then colorize','black':[45,63,59],'white':[166,174,160]}, {'source':'rug-surface.png','output':'blue-fabric.png','operation':'grayscale then colorize','black':[20,40,65],'white':[88,126,158]}, {'source':'blue-fabric.png','output':'blue-striped-curtain.png','operation':'60px pale stripe every 128px'}]
for r in records:
 for k in ('source','output'):r[k+'SHA256']=hashlib.sha256((root/r[k]).read_bytes()).hexdigest()
records.append({'source':'stone-blue.png','output':'stone-weathered.png','operation':'grayscale, autocontrast cutoff2, colorize','black':[19,32,48],'white':[95,128,148],'sourceSHA256':hashlib.sha256((root/'stone-blue.png').read_bytes()).hexdigest(),'outputSHA256':hashlib.sha256((root/'stone-weathered.png').read_bytes()).hexdigest()})
(root/'derived-textures.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
