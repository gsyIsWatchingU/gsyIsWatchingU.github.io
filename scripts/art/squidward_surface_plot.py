"""把数值表面投影成关节/表情定位图；用于资产检查。"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw
data=np.load(sys.argv[1]); points=data['vertices']; colors=data['colors']
im=Image.new('RGB',(1200,1040),'#f1eee9'); draw=ImageDraw.Draw(im)
for axis,offset,title in [(0,0,'FRONT: x / height'),(1,600,'SIDE: depth / height')]:
    draw.text((offset+15,10),title,fill='#111111')
    for h in np.arange(0,2.01,.1):
        y=1000-h*470
        draw.line((offset+10,y,offset+590,y),fill='#d9d4d0')
        draw.text((offset+10,y),f'{h:.1f}',fill='#555555')
    for x in np.arange(-.6,.61,.1):
        px=offset+300+x*450
        draw.line((px,45,px,1000),fill='#e5e0dc')
        draw.text((px,1010),f'{x:.1f}',fill='#555555')
    depth=1 if axis==0 else 0
    order=np.argsort(points[:,depth])[::-1]
    for idx in order:
        v=points[idx]; c=tuple(int(min(255,max(0,k**(1/2.2)*255))) for k in colors[idx])
        x=offset+300+v[axis]*450;y=1000-v[2]*470
        draw.ellipse((x-1.5,y-1.5,x+1.5,y+1.5),fill=c)
im.save(sys.argv[2])
