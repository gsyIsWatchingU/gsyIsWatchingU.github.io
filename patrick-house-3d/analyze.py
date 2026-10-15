import bpy
import sys
import json

# Clear scene
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

# Import GLB
bpy.ops.import_scene.gltf(filepath="/workspace/projects/patrick-house/v2.glb")

# Collect all mesh objects
mesh_objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']
print(f"Total mesh objects: {len(mesh_objs)}")
for o in mesh_objs:
    print(f"  - {o.name}: verts={len(o.data.vertices)}, faces={len(o.data.polygons)}")

# Compute overall bounding box in world space
min_corner = [float('inf')] * 3
max_corner = [float('-inf')] * 3
for o in mesh_objs:
    for corner in o.bound_box:
        world = o.matrix_world @ __import__('mathutils').Vector(corner)
        for i in range(3):
            min_corner[i] = min(min_corner[i], world[i])
            max_corner[i] = max(max_corner[i], world[i])

size = [max_corner[i] - min_corner[i] for i in range(3)]
center = [(max_corner[i] + min_corner[i]) / 2 for i in range(3)]

result = {
    "min": min_corner,
    "max": max_corner,
    "size": size,
    "center": center,
    "objects": [{"name": o.name, "verts": len(o.data.vertices), "faces": len(o.data.polygons)} for o in mesh_objs]
}
print("BBOX_RESULT:" + json.dumps(result))
