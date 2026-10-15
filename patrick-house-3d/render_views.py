import bpy
import math
from mathutils import Vector

# ===== Clear and import patched GLB =====
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()
bpy.ops.import_scene.gltf(filepath="/workspace/projects/patrick-house/v2_patched.glb")

# ===== Setup render =====
scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE_NEXT' if hasattr(scene, 'eevee') else 'BLENDER_EEVEE'
scene.render.resolution_x = 800
scene.render.resolution_y = 600
scene.render.film_transparent = False

# World background - dark blue like preview
world = bpy.data.worlds.get("World") or bpy.data.worlds.new("World")
scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes.get("Background")
bg.inputs[0].default_value = (0.05, 0.08, 0.15, 1.0)  # dark navy
bg.inputs[1].default_value = 0.5

# ===== Lighting =====
# Key light
bpy.ops.object.light_add(type='AREA', location=(2, -3, 4))
key = bpy.context.active_object
key.data.energy = 800
key.data.shape = 'DISK'
key.data.size = 3

# Fill light
bpy.ops.object.light_add(type='AREA', location=(-2, 2, 2))
fill = bpy.context.active_object
fill.data.energy = 400
fill.data.size = 3

# Rim light
bpy.ops.object.light_add(type='AREA', location=(0, 3, 3))
rim = bpy.context.active_object
rim.data.energy = 300
rim.data.size = 2

# ===== Ground plane =====
bpy.ops.mesh.primitive_plane_add(size=10, location=(0, 0, -0.001))
ground = bpy.context.active_object
ground.name = "Ground"
ground_mat = bpy.data.materials.new("Sand")
ground_mat.use_nodes = True
gbsdf = ground_mat.node_tree.nodes.get("Principled BSDF")
gbsdf.inputs["Base Color"].default_value = (0.76, 0.70, 0.55, 1.0)
gbsdf.inputs["Roughness"].default_value = 0.9
ground.data.materials.append(ground_mat)

# ===== Camera helper =====
def setup_camera(location, target, lens=50):
    bpy.ops.object.camera_add(location=location)
    cam = bpy.context.active_object
    cam.data.lens = lens
    direction = Vector(target) - cam.location
    cam.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
    scene.camera = cam
    return cam

# Center of model
center = (0, 0, 0.4)

# ===== Render views =====
views = [
    ("front",  (0, -2.5, 0.7),  center, 50),
    ("back",   (0, 2.5, 0.7),   center, 50),
    ("left",   (-2.5, 0, 0.7),  center, 50),
    ("right",  (2.5, 0, 0.7),   center, 50),
    ("roof_closeup", (-0.1, 0.3, 1.2), (-0.067, 0.449, 0.85), 80),
]

outdir = "/workspace/projects/patrick-house/"

for name, loc, tgt, lens in views:
    # Remove old camera
    if scene.camera:
        bpy.data.objects.remove(scene.camera)
    cam = setup_camera(loc, tgt, lens)
    scene.render.filepath = f"{outdir}view_{name}.png"
    bpy.ops.render.render(write_still=True)
    print(f"RENDERED: {name}")

# Mobile narrow view (vertical)
scene.render.resolution_x = 400
scene.render.resolution_y = 800
if scene.camera:
    bpy.data.objects.remove(scene.camera)
cam = setup_camera((0, -3.0, 0.9), center, 50)
scene.render.filepath = f"{outdir}view_mobile.png"
bpy.ops.render.render(write_still=True)
print("RENDERED: mobile")

print("ALL_RENDERS_DONE")
