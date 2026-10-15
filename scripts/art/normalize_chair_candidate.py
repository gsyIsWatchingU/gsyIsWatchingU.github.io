"""只规范 GPU 网格的尺寸与落地枢轴，不重建几何或替换纹理。"""
import bpy
import hashlib
import json
import sys
from pathlib import Path
from mathutils import Matrix, Vector

source, target = map(Path, sys.argv[sys.argv.index('--') + 1:])
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(source))
objects = [obj for obj in bpy.context.scene.objects if obj.type == 'MESH']
points = [obj.matrix_world @ Vector(corner) for obj in objects for corner in obj.bound_box]
low = Vector([min(p[i] for p in points) for i in range(3)])
high = Vector([max(p[i] for p in points) for i in range(3)])
scale = 1.62 / (high.z - low.z)
offset = Vector(((low.x + high.x) / 2, (low.y + high.y) / 2, low.z))
transform = Matrix.Scale(scale, 4) @ Matrix.Translation(-offset)
for obj in objects:
    world = obj.matrix_world.copy()
    obj.parent = None
    obj.matrix_world = transform @ world
    obj['assetId'] = 'chair-reference-candidate'
    obj['sourceBackend'] = 'Hunyuan3D-2.1'
    obj['humanReview'] = 'pending'
bpy.ops.object.select_all(action='DESELECT')
for obj in objects:
    obj.select_set(True)
bpy.context.view_layer.objects.active = objects[0]
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
bpy.ops.export_scene.gltf(filepath=str(target), export_format='GLB', use_selection=True, export_yup=True, export_extras=True)
dimensions = (high - low) * scale
report = {
    'status': 'review', 'humanReview': 'pending',
    'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(),
    'runtimeSha256': hashlib.sha256(target.read_bytes()).hexdigest(),
    'dimensionsYUp': [dimensions.x, dimensions.z, dimensions.y],
    'triangles': sum(sum(len(p.vertices) - 2 for p in obj.data.polygons) for obj in objects),
    'origin': 'bottom-center', 'operations': ['uniform scale to 1.62m height', 'bottom-center origin', 'preserve GPU geometry and textures'],
}
target.with_suffix('.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(report, ensure_ascii=False))
