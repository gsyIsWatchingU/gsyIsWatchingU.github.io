"""在 Paint 前减面，保留原始 Shape，避免超过 API 上传体积。"""
import bpy
from pathlib import Path
import sys
args=sys.argv[sys.argv.index("--")+1:]
source,target=map(Path,args)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(source))
meshes=[o for o in bpy.context.scene.objects if o.type=="MESH"]
for o in meshes:
    bpy.context.view_layer.objects.active=o;o.select_set(True)
    bpy.ops.object.transform_apply(location=False,rotation=True,scale=True)
    m=o.modifiers.new("runtime topology","DECIMATE");m.ratio=min(1,26000/max(1,len(o.data.polygons)))
    bpy.ops.object.modifier_apply(modifier=m.name)
    for f in o.data.polygons:f.use_smooth=True
    o.select_set(False)
bpy.ops.export_scene.gltf(filepath=str(target),export_format="GLB",export_yup=True)
print("REDUCED",target.stat().st_size)
