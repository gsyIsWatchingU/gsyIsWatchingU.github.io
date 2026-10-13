"""在导出的真实网格上核验躺椅与叶片穿插、脚底支撑。"""
import bpy, json, sys
from mathutils import Vector
from mathutils.bvhtree import BVHTree
from pathlib import Path

structure,lounger,out=sys.argv[sys.argv.index('--')+1:]
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=structure)
leaves=[o for o in bpy.context.scene.objects if o.type=='MESH' and any(m and m.name=='leaf' for m in o.data.materials)]
def tree(objects):
    vertices=[];faces=[]
    for o in objects:
        start=len(vertices);vertices.extend(o.matrix_world@v.co for v in o.data.vertices)
        faces.extend(tuple(start+i for i in p.vertices) for p in o.data.polygons)
    return BVHTree.FromPolygons(vertices,faces)
leaf_tree=tree(leaves)
before=set(bpy.context.scene.objects);bpy.ops.import_scene.gltf(filepath=lounger)
chair=[o for o in bpy.context.scene.objects if o not in before and o.type=='MESH']
parents=[o for o in bpy.context.scene.objects if o not in before and o.parent is None]
results=[]
for pos,angle in [((-.85,-.15,9),.4),((-.95,-.9,9),.15)]:
    for o in parents:o.location=pos;o.rotation_euler.z=angle
    bpy.context.view_layer.update()
    overlaps=len(leaf_tree.overlap(tree(chair)))
    points=[o.matrix_world@v.co for o in chair for v in o.data.vertices]
    feet=[p for p in points if p.z<9.025]
    support=max((p.x/2.4)**2+(p.y/1.728)**2 for p in feet)
    hole=min(((p.x-1.15)**2+(p.y-.6)**2)**.5 for p in feet)
    results.append({'position':pos,'rotation':angle,'leafIntersectionPairs':overlaps,'footEllipseMax':support,'stairHoleClearance':hole-.8})
assert results[0]['leafIntersectionPairs']>0
assert results[1]['leafIntersectionPairs']==0
assert results[1]['footEllipseMax']<1 and results[1]['stairHoleClearance']>0
Path(out).write_text(json.dumps(results,indent=2)+'\n')
print(json.dumps(results))
