"""候选背景/连通分量诊断；不修改产物。"""
import bpy,bmesh,json,sys
import numpy as np
from mathutils import Vector
bpy.ops.wm.read_factory_settings(use_empty=True);bpy.ops.import_scene.gltf(filepath=sys.argv[sys.argv.index('--')+1])
for o in [o for o in bpy.context.scene.objects if o.type=='MESH']:
    bpy.context.view_layer.objects.active=o;o.select_set(True);bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
    bm=bmesh.new();bm.from_mesh(o.data);bm.normal_update();pending=set(bm.verts);components=[]
    while pending:
        first=pending.pop();stack=[first];part=[first]
        while stack:
            v=stack.pop()
            for e in v.link_edges:
                t=e.other_vert(v)
                if t in pending:pending.remove(t);stack.append(t);part.append(t)
        p=np.array([list(v.co) for v in part]);components.append(dict(vertices=len(part),min=p.min(axis=0).tolist(),max=p.max(axis=0).tolist()))
    p=np.array([list(v.co) for v in bm.verts])
    print(json.dumps(dict(name=o.name,components=sorted(components,key=lambda c:c['vertices'],reverse=True)[:12],zQuantiles=np.quantile(p[:,2],[0,.01,.05,.1,.2,.5,.9,1]).tolist(),pointsAtZ={str(z):dict(x=np.quantile(p[(p[:,2]>z-.025)&(p[:,2]<z+.025),0],[0,.1,.5,.9,1]).tolist()) for z in [-.6,-.4,-.2,0,.2,.4,.6] if np.count_nonzero((p[:,2]>z-.025)&(p[:,2]<z+.025))})))
    bm.free()
