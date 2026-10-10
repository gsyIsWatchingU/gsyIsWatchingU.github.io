"""从 GPU 贴图的双眼位置校准脸的正面方向，独立于身体前进方向。"""
import bpy,sys,json,math,hashlib
from pathlib import Path
from mathutils import Vector
source=Path(sys.argv[sys.argv.index('--')+1]);bpy.ops.wm.open_mainfile(filepath=str(source))
o=next(o for o in bpy.context.scene.objects if o.type=='MESH')
shader=o.data.materials[0].node_tree.nodes.get('Principled BSDF')
node=shader.inputs['Base Color'].links[0].from_node
img=node.image;pixels=list(img.pixels);w,h=img.size;points=[]
uv=o.data.uv_layers.active.data
for loop in o.data.loops:
    v=o.data.vertices[loop.vertex_index].co
    if not (.52<v.z<.70 and v.y<-.18):continue
    u,t=uv[loop.index].uv;index=(int(t*h)%h*w+int(u*w)%w)*4;r,g,b=pixels[index:index+3]
    if b>r*1.4 and g>r*1.15 and b>.15:points.append(Vector((v.x,-v.y,v.z)))
assert len(points)>30,'未识别到双眼贴图，禁止猜测脸部朝向'
centers=[min(points,key=lambda v:v.x),max(points,key=lambda v:v.x)]
for _ in range(25):
    groups=[[],[]]
    for p in points:groups[min(range(2),key=lambda i:(p-centers[i]).length_squared)].append(p)
    centers=[sum(g,Vector())/len(g) for g in groups]
centers.sort(key=lambda v:v.x);across=centers[1]-centers[0]
# glTF +Z forward normal to the real eye line.
yaw=math.atan2(-across.y,across.x)
mid=(centers[0]+centers[1])*.5
record={'runtimeSha256':hashlib.sha256(source.with_suffix('.glb').read_bytes()).hexdigest(),'method':'centroids of blue eye pixels sampled on GPU textured surface','eyePoints':len(points),'eyeCenters':[[c.x,c.z,c.y] for c in centers],'faceCenter':[mid.x,mid.z,mid.y],'faceYaw':yaw,'faceForward':[math.sin(yaw),0,math.cos(yaw)]}
(source.parent/'rig-calibration.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps(record))
