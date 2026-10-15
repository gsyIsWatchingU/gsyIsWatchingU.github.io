"""检查头身接缝的实际贴图颜色，拦截射线漏烘焙产生的颈圈。"""
import json
from pathlib import Path
import numpy as np
exec(Path('scripts/art/analyze_cat_face.py').read_text(encoding='utf8').split('original,_,_,_=')[0])
path='assets/house-review/props/siamese-cat-clean-bound.glb'
a,ap,auv,_=glb(path,'siamese_cat');b,bp,buv,_=glb(path,'siamese_cat_head')
lookup={tuple(np.round(p,6)):i for i,p in enumerate(ap)};differences=[]
def sample(image,uv):
 h,w=image.shape[:2];return image[min(h-1,max(0,int(uv[1]*h))),min(w-1,max(0,int(uv[0]*w)))].astype(float)
for j,p in enumerate(bp):
 i=lookup.get(tuple(np.round(p,6)))
 if i is not None:differences.append(float(np.abs(sample(a,auv[i])-sample(b,buv[j])).mean()))
report={'status':'passed','sharedSamples':len(differences),'meanRGBDifference':float(np.mean(differences)),'p95RGBDifference':float(np.percentile(differences,95)),'maximumRGBDifference':max(differences),'scope':'实际头身接缝贴图采样；保留原始贴图 UV 接缝的单点极值'}
assert len(differences)>100
assert report['meanRGBDifference']<3 and report['p95RGBDifference']<5,report
Path('docs/cat-eight-poses-review/neck-colors.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print(json.dumps(report,ensure_ascii=False))
