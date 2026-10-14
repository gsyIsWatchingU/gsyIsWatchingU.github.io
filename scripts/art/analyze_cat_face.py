"""读取 GLB 像素与表面眼区；不修改图片或网格。"""
import json,struct,io,hashlib
from pathlib import Path
import numpy as np
from PIL import Image
root=Path('docs/cat-eight-poses-review')
def glb(path,name):
 b=Path(path).read_bytes();size=struct.unpack_from('<I',b,12)[0];g=json.loads(b[20:20+size]);bin=b[28+size:];node=next(n for n in g['nodes'] if n.get('name')==name and 'mesh' in n);primitive=g['meshes'][node['mesh']]['primitives'][0];material=g['materials'][primitive['material']]
 index=material['pbrMetallicRoughness']['baseColorTexture']['index'];image=g['images'][g['textures'][index]['source']];view=g['bufferViews'][image['bufferView']];texture=Image.open(io.BytesIO(bin[view.get('byteOffset',0):view.get('byteOffset',0)+view['byteLength']])).convert('RGB')
 def attr(n,width):
  a=g['accessors'][primitive['attributes'][n]];v=g['bufferViews'][a['bufferView']];start=v.get('byteOffset',0)+a.get('byteOffset',0);stride=v.get('byteStride',width*4);return np.array([struct.unpack_from('<'+'f'*width,bin,start+i*stride) for i in range(a['count'])])
 return np.asarray(texture),attr('POSITION',3),attr('TEXCOORD_0',2),attr('NORMAL',3)
original,_,_,_=glb('assets/house-review/props/siamese-cat-clean-base.glb','siamese_cat')
texture,p,uv,n=glb('assets/house-review/props/siamese-cat-clean-bound.glb','siamese_cat_head')
h,w=texture.shape[:2];colors=texture[np.clip((uv[:,1]*h).astype(int),0,h-1),np.clip((uv[:,0]*w).astype(int),0,w-1)]/255
blue=(colors[:,2]>colors[:,0]*1.3)&(colors[:,2]>colors[:,1]*1.05)&(colors[:,2]>.28)&(p[:,1]>.37)
points=p[blue];normals=n[blue]
if len(points)<10:raise RuntimeError('没有找到可读的两个蓝眼区域')
# 眼部蓝像素须在同一几何小区域连通，排除耳部及毛色的蓝色噪点。
remaining=set(range(len(points)));components=[]
while remaining:
 seed=remaining.pop();group={seed};queue=[seed]
 while queue:
  i=queue.pop();near=[j for j in remaining if np.linalg.norm(points[j]-points[i])<.014]
  for j in near:remaining.remove(j);group.add(j);queue.append(j)
 components.append(sorted(group))
components=sorted(components,key=len,reverse=True)
print('blue surface components',[(len(g),np.ptp(points[g],axis=0).tolist()) for g in components])
chosen=components[:2]
if min(map(len,chosen))<6:raise RuntimeError('缺少两个稳定眼区')
kept=np.array(chosen[0]+chosen[1]);points=points[kept];normals=normals[kept];labels=np.array([0]*len(chosen[0])+[1]*len(chosen[1]));centers=np.array([points[labels==i].mean(axis=0) for i in range(2)])
eyes=[]
for i,center in enumerate(centers):
 normal=normals[labels==i].mean(axis=0);normal/=np.linalg.norm(normal);axis_x=np.cross([0,1,0],normal);axis_x/=np.linalg.norm(axis_x);axis_y=np.cross(normal,axis_x);difference=points[labels==i]-center;radius=np.quantile(np.abs(difference@np.array([axis_x,axis_y]).T),.97,axis=0)*1.18
 delta=p-center;ellipse=(delta@axis_x/radius[0])**2+(delta@axis_y/radius[1])**2;ring=(ellipse>1.05)&(ellipse<2.5)&(np.abs(delta@normal)<.02)&~blue
 skin=np.median(colors[ring],axis=0) if ring.sum()>3 else np.array([.29,.17,.10]);skin=np.where(skin<=.04045,skin/12.92,((skin+.055)/1.055)**2.4)
 assert max(radius)<.04, '眼区不能扩散到脸部或耳朵'
 eyes.append({'center':center.tolist(),'normal':normal.tolist(),'axisX':axis_x.tolist(),'axisY':axis_y.tolist(),'radius':radius.tolist(),'skinLinear':skin.tolist(),'blueVertices':int((labels==i).sum())})
same_shape=original.shape==texture.shape;mae=float(np.abs(original.astype(float)-texture).mean()/255) if same_shape else None
report={'status':'analyzed','faceTextureRebake':False,'sourceTexturePixelsSHA256':hashlib.sha256(original.tobytes()).hexdigest(),'headTexturePixelsSHA256':hashlib.sha256(texture.tobytes()).hexdigest(),'sameDimensions':same_shape,'meanPixelDifference':mae,'eyes':eyes,'frontNormal':np.mean([e['normal'] for e in eyes],axis=0).tolist()}
(root/'face.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({'blueVertices':len(points),'headTextureMeanDifference':mae,'eyes':len(eyes)}))
