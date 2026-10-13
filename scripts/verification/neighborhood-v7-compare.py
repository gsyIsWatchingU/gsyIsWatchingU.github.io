"""并排展示原始参考局部与未加工的浏览器实测局部，不做模型画面补画。"""
import pathlib,sys,hashlib,json
from PIL import Image,ImageDraw,ImageFont,ImageOps
root=pathlib.Path(__file__).resolve().parents[2]
out=root/'docs/neighborhood-review/acceptance/v7';out.mkdir(parents=True,exist_ok=True)
ref=root/'docs/neighborhood-review/refs/v7/primary-reference.png'
shot=root/(sys.argv[1] if len(sys.argv)>1 else 'tmp/v7-production/acceptance-local-final/desktop-cutaway.png')
canvas=Image.new('RGB',(1600,1160),(244,236,219));draw=ImageDraw.Draw(canvas)
font=ImageFont.truetype('C:/Windows/Fonts/msyh.ttc',28);small=ImageFont.truetype('C:/Windows/Fonts/msyh.ttc',21)
for x,label,path,box in [(0,'用户参考 · 建筑局部',ref,(420,12,1060,1075)),(800,'v7 · 浏览器原始截图局部',shot,(410,92,1000,900))]:
 draw.text((x+48,30),label,font=font,fill=(57,65,53))
 im=ImageOps.contain(Image.open(path).convert('RGB').crop(box),(730,1010))
 canvas.paste(im,(x+(800-im.width)//2,82+(1010-im.height)//2))
draw.text((48,1110),'对照用于视觉审查；技术验收不替代用户批准。',font=small,fill=(80,86,72))
canvas.save(out/'reference-comparison.png')
meta={'reference':ref.relative_to(root).as_posix(),'referenceSHA256':hashlib.sha256(ref.read_bytes()).hexdigest(),'browserScreenshot':shot.relative_to(root).as_posix(),'screenshotSHA256':hashlib.sha256(shot.read_bytes()).hexdigest(),'operations':'crop, proportional resize, side-by-side; no retouching or overlay in the model view','modelSHA256':json.loads((root/'docs/neighborhood-review/asset-index.json').read_text(encoding='utf-8'))['assets'][0]['sha256']}
(out/'comparison.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
