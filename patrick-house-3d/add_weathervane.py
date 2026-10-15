import bpy
import bmesh
import math
from mathutils import Vector

# ===== Clear scene =====
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

# ===== Import original V2 GLB =====
bpy.ops.import_scene.gltf(filepath="/workspace/projects/patrick-house/v2.glb")
orig_mesh = [o for o in bpy.context.scene.objects if o.type == 'MESH'][0]
orig_mesh.name = "patrick_house_original"

# ===== Dimensions from analysis =====
# Dome top at approximately (-0.067, 0.449, 0.809)
dome_top = Vector((-0.067, 0.449, 0.809))
# House width ~1.34, height ~0.81
# Bone width = 15% of house width ~0.20
# Total added height = 15% of house height ~0.12

# ===== Create warm gold material for weathervane =====
gold_mat = bpy.data.materials.new(name="Weathervane_Gold")
gold_mat.use_nodes = True
bsdf = gold_mat.node_tree.nodes.get("Principled BSDF")
bsdf.inputs["Base Color"].default_value = (0.85, 0.65, 0.15, 1.0)  # warm gold
bsdf.inputs["Metallic"].default_value = 0.85
bsdf.inputs["Roughness"].default_value = 0.35

# ===== Build weathervane as a collection of meshes, then join =====
parts = []

# --- 1. Vertical pole (支杆) ---
# Sink base slightly into dome so it connects naturally
pole_base_z = dome_top.z - 0.005  # sink 5mm into dome
pole_top_z = dome_top.z + 0.075   # pole height ~0.075
pole_height = pole_top_z - pole_base_z

bpy.ops.mesh.primitive_cylinder_add(
    vertices=8,
    radius=0.006,
    depth=pole_height,
    location=(dome_top.x, dome_top.y, (pole_base_z + pole_top_z) / 2)
)
pole = bpy.context.active_object
pole.name = "wv_pole"
parts.append(pole)

# --- 2. Bone shape at top ---
# Bone is horizontal along X axis, at pole top
bone_center_z = pole_top_z
bone_half_length = 0.095  # total bone width ~0.19 (15% of house width ~0.20)

# Bone shaft (middle thin part)
bpy.ops.mesh.primitive_cylinder_add(
    vertices=8,
    radius=0.007,
    depth=bone_half_length * 2 - 0.02,  # shaft slightly shorter than total bone
    location=(dome_top.x, dome_top.y, bone_center_z),
    rotation=(0, math.radians(90), 0)  # rotate to horizontal along X
)
shaft = bpy.context.active_object
shaft.name = "wv_bone_shaft"
parts.append(shaft)

# Bone knobs: each end has two rounded lobes (up and down)
# Left end
end_x_left = dome_top.x - bone_half_length + 0.008
end_x_right = dome_top.x + bone_half_length - 0.008

for side_x, label in [(end_x_left, "L"), (end_x_right, "R")]:
    for dz, vlabel in [(0.014, "U"), (-0.014, "D")]:
        bpy.ops.mesh.primitive_uv_sphere_add(
            segments=12,
            ring_count=8,
            radius=0.015,
            location=(side_x, dome_top.y, bone_center_z + dz)
        )
        knob = bpy.context.active_object
        knob.name = f"wv_bone_knob_{label}{vlabel}"
        # Scale slightly to make oval
        knob.scale = (1.0, 0.85, 1.0)
        bpy.ops.object.transform_apply(scale=True)
        parts.append(knob)

# ===== Assign gold material to all parts =====
for p in parts:
    p.data.materials.append(gold_mat)

# ===== Join all parts into one named object =====
bpy.ops.object.select_all(action='DESELECT')
for p in parts:
    p.select_set(True)
bpy.context.view_layer.objects.active = parts[0]
bpy.ops.object.join()
weathervane = bpy.context.active_object
weathervane.name = "weathervane_bone"

# Smooth shading
for poly in weathervane.data.polygons:
    poly.use_smooth = True

# Recalculate normals using bmesh (operator name changed in 4.x)
bm = bmesh.new()
bm.from_mesh(weathervane.data)
bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
bm.to_mesh(weathervane.data)
bm.free()
weathervane.data.update()

# ===== Stats =====
print(f"Original mesh: {orig_mesh.name}, faces={len(orig_mesh.data.polygons)}")
print(f"Weathervane: {weathervane.name}, faces={len(weathervane.data.polygons)}, verts={len(weathervane.data.vertices)}")

# ===== Export GLB =====
export_path = "/workspace/projects/patrick-house/v2_patched.glb"
bpy.ops.export_scene.gltf(
    filepath=export_path,
    export_format='GLB',
    use_selection=False,
    export_apply=True,
    export_yup=True
)
print(f"EXPORTED: {export_path}")
