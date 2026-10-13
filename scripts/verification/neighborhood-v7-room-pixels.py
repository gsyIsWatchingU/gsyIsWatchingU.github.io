"""截图回归：房间近景上方应为空背景，不能保留其他楼层的大面积绿墙。"""
import sys,pathlib,json
import numpy as np
from PIL import Image
folder=pathlib.Path(sys.argv[1]);checks=[]
for tier in ('mobile',):
 for room in ('kitchen','living','bedroom','bathroom'):
  p=folder/f'{tier}-{room}.png';im=Image.open(p).convert('RGB');w,h=im.size
  box=(int(w*.3),110,int(w*.7),280)
  a=np.asarray(im.crop(box),dtype=np.float32);green=(a[:,:,1]>a[:,:,0]*1.15)&(a[:,:,1]>a[:,:,2]*1.05)
  ratio=float(green.mean());checks.append({'file':p.name,'roi':box,'greenRatio':ratio,'ok':ratio<.03})
  print(p.name,round(ratio,4),'PASS' if ratio<.03 else 'FAIL')
(folder/'room-pixels.json').write_text(json.dumps({'checks':checks,'purpose':'Detect other-floor green walls above the current room; does not certify artistic similarity.'},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
sys.exit(1 if any(not c['ok'] for c in checks) else 0)
