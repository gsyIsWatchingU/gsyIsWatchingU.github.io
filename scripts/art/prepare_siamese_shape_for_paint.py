"""修补、闭合并减面 GPU 原始网格；主体形体来自 GPU。"""
import bpy,bmesh,sys,json
source,output=sys.argv[sys.argv.index('--')+1:]
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=source)
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
for o in meshes:
    bpy.context.view_layer.objects.active=o
    bpy.ops.object.select_all(action='DESELECT');o.select_set(True)
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    # 修补生成表面互相覆盖的碎片和缺口，形体仍来自 GPU；闭合后重新进行 GPU 上色。
    o.data.remesh_voxel_size=max(o.dimensions)*.0018
    bpy.ops.object.voxel_remesh()
    bm=bmesh.new();bm.from_mesh(o.data)
    for _ in range(2):bmesh.ops.smooth_vert(bm,verts=list(bm.verts),factor=.25,use_axis_x=True,use_axis_y=True,use_axis_z=True)
    bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(o.data);bm.free()
    for p in o.data.polygons:p.use_smooth=True
    triangles=sum(len(p.vertices)-2 for p in o.data.polygons)
    if triangles>60000:
        mod=o.modifiers.new('web candidate budget','DECIMATE');mod.ratio=60000/triangles
        bpy.ops.object.modifier_apply(modifier=mod.name)
bpy.ops.export_scene.gltf(filepath=output,export_format='GLB')
print(json.dumps({'source':source,'output':output,'triangles':sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in meshes)}))
