"""保留 GPU 网格/UV/贴图，仅统一实际尺寸与底部中心枢轴。由 Blender 执行。"""
import bpy
import hashlib
import json
from mathutils import Matrix, Vector
from pathlib import Path
import sys

source, target, width = sys.argv[sys.argv.index('--') + 1:]
source, target, width = Path(source), Path(target), float(width)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(source))
meshes = [obj for obj in bpy.context.scene.objects if obj.type == 'MESH']
if not meshes or any(obj.modifiers for obj in meshes):
    raise ValueError('预期无修改器的静态 GPU 道具')
points = [obj.matrix_world @ vertex.co for obj in meshes for vertex in obj.data.vertices]
low = Vector([min(point[axis] for point in points) for axis in range(3)])
high = Vector([max(point[axis] for point in points) for axis in range(3)])
scale = width / (high.x - low.x)
origin = Vector(((high.x + low.x) / 2, (high.y + low.y) / 2, low.z))
for obj in meshes:
    transform = obj.matrix_world.copy()
    obj.parent = None
    for vertex in obj.data.vertices:
        vertex.co = (transform @ vertex.co - origin) * scale
    obj.matrix_world = Matrix.Identity(4)
    obj.data.update()
bpy.context.view_layer.update()
for obj in bpy.context.scene.objects:
    obj.select_set(obj in meshes)
target.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.export_scene.gltf(filepath=str(target), export_format='GLB', export_yup=True, use_selection=True)
triangles = 0
for obj in meshes:
    obj.data.calc_loop_triangles()
    triangles += len(obj.data.loop_triangles)
record = {'sourceSHA256': hashlib.sha256(source.read_bytes()).hexdigest(), 'runtimeSHA256': hashlib.sha256(target.read_bytes()).hexdigest(), 'triangles': triangles, 'width': width, 'dimensionsYUp': [round((high.x-low.x)*scale, 5), round((high.z-low.z)*scale, 5), round((high.y-low.y)*scale, 5)], 'uniformScale': scale, 'operations': ['保留 Hunyuan 网格、UV 与贴图', '烘焙原节点变换', '统一缩放至摆放宽度', '底部中心枢轴，Y-up 导出'], 'state': 'review', 'humanReview': 'pending'}
target.with_suffix('.json').write_text(json.dumps(record, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(record, ensure_ascii=False), flush=True)
