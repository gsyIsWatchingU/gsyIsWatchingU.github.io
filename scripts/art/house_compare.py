"""将真实浏览器截图与参考并排，不修改场景或制作伪截图。"""
from pathlib import Path
from PIL import Image,ImageOps,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"docs/house-review"
# 原样像素转换为 PNG，不缩放或修饰单张截图；记录工具捕获的实际像素尺寸。
import json
captures=[]
for path in sorted((OUT/"screenshots").glob("*.png")):
    raw=Image.open(path);size=raw.size
    if raw.format!="PNG":
        converted=raw.convert("RGB");raw.close();converted.save(path,format="PNG")
    captures.append({"file":str(path.relative_to(ROOT)).replace("\\","/"),"viewportCss":[390,844] if path.name.startswith("mobile") else [1440,900],"capturedPixels":list(size),"source":"real browser screenshot","pixelEditing":False})
(OUT/"screenshot-index.json").write_text(json.dumps(captures,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
font=ImageFont.truetype("C:/Windows/Fonts/msyh.ttc",23)
def panel(path,size):
    return ImageOps.contain(Image.open(path).convert("RGB"),size)
image=Image.new("RGB",(1920,1100),(241,244,235));d=ImageDraw.Draw(image)
for x,label,path,size in [(20,"主参考 · 01-cutaway-full",ROOT/"docs/refs/pineapple-house/01-cutaway-full.png",(660,1010)),(700,"真实浏览器 · 1440 × 900",OUT/"screenshots/desktop-whole.png",(1190,1010))]:
    d.text((x,15),label,font=font,fill=(40,64,66));p=panel(path,size);image.paste(p,(x+(size[0]-p.width)//2,65+(size[1]-p.height)//2))
image.save(OUT/"reference-comparison.png")
rooms=[("living","客厅"),("storage","储藏室"),("bathroom","浴室"),("bedroom","卧室"),("library","图书馆"),("stairs","螺旋楼梯"),("roof","屋顶花园")]
for prefix in ("desktop","mobile"):
    cell=(600,420) if prefix=="desktop" else (270,610)
    cols=3 if prefix=="desktop" else 4;rows=(len(rooms)+cols-1)//cols
    image=Image.new("RGB",(cols*cell[0],rows*cell[1]),(241,244,235));d=ImageDraw.Draw(image)
    for i,(id,label) in enumerate(rooms):
        x=i%cols*cell[0];y=i//cols*cell[1]
        d.text((x+12,y+5),label,font=font,fill=(40,64,66));p=panel(OUT/f"screenshots/{prefix}-{id}.png",(cell[0]-12,cell[1]-45))
        image.paste(p,(x+(cell[0]-p.width)//2,y+40))
    image.save(OUT/f"{prefix}-rooms.png")
print("reference and browser screenshot sheets saved")
