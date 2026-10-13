"""导出原角色的顶点、UV颜色与关节定位信息，不改原件。"""
from pathlib import Path
import bpy, sys, json
import numpy as np
source, target = map(Path, sys.argv[sys.argv.index('--')+1:])
target.mkdir(parents=True, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(source))
obj = next(o for o in bpy.context.scene.objects if o.type == 'MESH')
obj.data.transform(obj.matrix_world); obj.matrix_world.identity()
coords = np.array([tuple(v.co) for v in obj.data.vertices])
image = next(i for i in bpy.data.images if i.type=='IMAGE' and i.size[0]>100)
# base color 图片按 BSDF 的连接定位，不能把 ORM 当角色颜色。
shader = obj.data.materials[0].node_tree.nodes.get('Principled BSDF')
image = shader.inputs['Base Color'].links[0].from_node.image
pixels = np.array(image.pixels[:], dtype=np.float32).reshape(image.size[1],image.size[0],4)
colors = np.zeros((len(coords),3),dtype=np.float32)
uvs=obj.data.uv_layers.active.data
for loop in obj.data.loops:
    u,v=uvs[loop.index].uv
    colors[loop.vertex_index] = pixels[min(image.size[1]-1,max(0,int(v*image.size[1]))),min(image.size[0]-1,max(0,int(u*image.size[0]))),:3]
np.savez_compressed(target/'surface.npz', vertices=coords, colors=colors, edges=np.array([tuple(e.vertices) for e in obj.data.edges]))
print(json.dumps({'vertices':len(coords),'min':coords.min(axis=0).tolist(),'max':coords.max(axis=0).tolist(),'image':image.name,'size':list(image.size)}),flush=True)
