"""确定性手绘贴图：真实 UV 材质，避免等距几何板条与纯色塑料感。"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import math
import random

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "assets/house-review/textures"
OUT.mkdir(parents=True, exist_ok=True)
SIZE = 1024
rng = random.Random(20261009)

def paper(base):
    image = Image.new("RGB", (SIZE,SIZE), base)
    px = image.load()
    for y in range(SIZE):
        for x in range(SIZE):
            n = rng.uniform(-5,5)+3*math.sin(x/91+y/157)
            px[x,y] = tuple(max(0,min(255,round(c+n))) for c in base)
    return image

def save(name,image):
    image.save(OUT / f"{name}.jpg", quality=93)

image=paper((226,144,46)); d=ImageDraw.Draw(image)
for offset in range(-SIZE*2,SIZE*3,180):
    for sign in (-1,1):
        pts=[(x,offset+sign*x+7*math.sin(x/170+offset)) for x in range(-30,SIZE+31,20)]
        d.line(pts,fill=(160,83,28),width=7)
for y in range(70,SIZE,155):
    for x in range(65,SIZE,180):
        d.ellipse((x,y,x+13,y+35),fill=(171,91,27))
save("pineapple",image)

image=paper((111,183,215)); d=ImageDraw.Draw(image)
for x in range(-20,SIZE+20,43):
    pts=[(x+5*math.sin(y/110+x),y) for y in range(0,SIZE+1,14)]
    d.line(pts,fill=rng.choice([(48,131,174),(73,146,183),(153,201,221)]),width=rng.choice([5,7,10]))
    for _ in range(8):
        y=rng.randrange(SIZE);d.line((x+18,y,x+19,y+rng.randrange(12,80)),fill=(88,164,198),width=2)
save("blue-wall",image)

image=paper((95,163,64)); d=ImageDraw.Draw(image)
for y in range(-20,SIZE+80,145):
    for x in range(-20,SIZE+80,143):
        cx=x+(32 if (y//145)%2 else 0);cy=y
        pts=[(cx+math.cos(a)*r,cy+math.sin(a)*r) for i in range(101) for a,r in [(i*math.tau/100,34+10*math.cos(5*i*math.tau/100))]]
        d.polygon(pts,fill=(223,220,105));d.ellipse((cx-9,cy-9,cx+9,cy+9),fill=(158,177,69))
        d.arc((cx+37,cy-40,cx+109,cy+35),30,300,fill=(135,191,81),width=5)
save("bath-wall",image)

image=paper((226,137,95));d=ImageDraw.Draw(image)
for v in range(0,SIZE,128):
    d.line((v,0,v,SIZE),fill=(179,78,58),width=6);d.line((0,v,SIZE,v),fill=(179,78,58),width=6)
    for t in range(8,121,8):
        for k in range(8):
            if (v//128+k)%2:d.line((v+t,k*128+8,v+t,k*128+117),fill=(193,101,70),width=2)
            else:d.line((v+8,k*128+t,v+117,k*128+t),fill=(199,106,74),width=2)
save("bed-wall",image)
for name,color in [("sand",(232,224,180)),("pink-floor",(237,184,186)),("library-floor",(109,160,66))]:
    image=paper(color);d=ImageDraw.Draw(image)
    for _ in range(2400):
        x,y=rng.randrange(SIZE),rng.randrange(SIZE);c=tuple(max(0,v-rng.randrange(8,25)) for v in color)
        d.ellipse((x,y,x+2,y+2),fill=c)
    save(name,image)

image=paper((180,125,58)); d=ImageDraw.Draw(image)
for x in range(0,SIZE,13):
    d.line([(x+4*math.sin(y/96+x),y) for y in range(0,SIZE+1,12)],fill=(156,104,45),width=1)
save("wood",image)
image=paper((97,161,47));d=ImageDraw.Draw(image)
for y in range(SIZE):
    c=int(12*math.sin(y/220))
    d.line((0,y,SIZE,y),fill=(90+c,154+c,39+c))
for x in range(0,SIZE,44):
    d.line([(x+7*math.sin(y/160),y) for y in range(0,SIZE+1,16)],fill=(68,131,38),width=4)
save("leaf",image)
image=paper((60,132,51));d=ImageDraw.Draw(image)
for radius,color in [(491,(32,99,42)),(472,(91,167,65)),(423,(49,126,49)),(399,(92,165,64))]:
    d.ellipse((512-radius,512-radius,512+radius,512+radius),fill=color)
for i in range(6):
    a=i*math.tau/6;cx=512+240*math.cos(a);cy=512+240*math.sin(a)
    pts=[(cx+math.cos(b)*r,cy+math.sin(b)*r) for j in range(81) for b,r in [(j*math.tau/80,69+13*math.cos(j*math.tau/80*5))]]
    d.polygon(pts,fill=(222,193,91))
d.ellipse((387,387,637,637),fill=(211,181,81));save("rug",image)
image=paper((225,220,201));d=ImageDraw.Draw(image)
for _ in range(7000):
    x,y=rng.randrange(SIZE),rng.randrange(SIZE);d.arc((x,y,x+rng.randrange(8,23),y+rng.randrange(6,19)),30,180,fill=(210,204,187),width=1)
save("cloth",image)
image=paper((126,65,143));d=ImageDraw.Draw(image)
for y in range(90,SIZE,190):
    for x in range(90,SIZE,185):
        pts=[(x+math.cos(a)*r,y+math.sin(a)*r) for i in range(101) for a,r in [(i*math.tau/100,31+12*math.cos(5*i*math.tau/100))]]
        d.line(pts+[pts[0]],fill=(246,202,104),width=4)
save("quilt",image)
TINTS={
    "red upholstery":((.84,.18,.10),"cloth"),"blue fabric":((.16,.37,.76),"cloth"),
    "green tubes":((.20,.61,.12),"cloth"),"green ends":((.14,.44,.07),"cloth"),
    "orange rubber":((.93,.36,.04),"cloth"),"cream rubber":((.94,.92,.80),"cloth"),
    "warm wood":((1,.91,.77),"wood"),"bamboo":((1,.85,.48),"wood"),
    "blue porcelain":((.48,.67,.9),"cloth"),"aged gold":((.82,.58,.15),"cloth"),
    "pink shell":((.97,.49,.56),"cloth"),"snail skin":((.42,.72,.64),"cloth"),
    "olive wood":((.63,.73,.30),"wood"),"sunshine canvas":((.94,.72,.15),"cloth")
}
for label,(color,base) in TINTS.items():
    original=Image.open(OUT/f"{base}.jpg").convert("RGB")
    if base=="cloth":
        gray=original.convert("L")
        channels=[gray.point(lambda p,c=c:min(255,round(p/225*c*255))) for c in color]
    else:
        channels=[channel.point(lambda p,c=c:round(p*c)) for channel,c in zip(original.split(),color)]
    save("tinted-"+label.replace(" ","-"),Image.merge("RGB",channels))
print("painted base and baked color UV textures")
