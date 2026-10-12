import bpy, math, os

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

OUT = "/workspace/3d-assets/exports/neighborhood"
os.makedirs(OUT, exist_ok=True)

def mat(name, color, rough=0.8):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*color, 1)
    bsdf.inputs["Roughness"].default_value = rough
    return m

stone_ext = mat("stone_ext", (0.18, 0.24, 0.30), 0.95)
tile_green = mat("tile_green", (0.20, 0.38, 0.32), 0.85)
tile_floor = mat("tile_floor", (0.35, 0.45, 0.42), 0.9)
wood = mat("wood", (0.45, 0.32, 0.18), 0.75)
wood_dark = mat("wood_dark", (0.30, 0.20, 0.10), 0.8)
wood_light = mat("wood_light", (0.60, 0.45, 0.25), 0.7)
door_mat = mat("door", (0.48, 0.33, 0.16), 0.7)
fabric_brown = mat("fabric_brown", (0.42, 0.30, 0.20), 0.95)
fabric_blue = mat("fabric_blue", (0.25, 0.40, 0.60), 0.9)
fabric_green = mat("fabric_green", (0.35, 0.50, 0.35), 0.9)
white = mat("white", (0.92, 0.92, 0.90), 0.5)
chrome = mat("chrome", (0.55, 0.58, 0.62), 0.3)
green_paint = mat("green_paint", (0.25, 0.45, 0.35), 0.8)
pot = mat("pot", (0.55, 0.35, 0.20), 0.9)
leaf = mat("leaf", (0.20, 0.50, 0.25), 0.9)
brass = mat("brass", (0.70, 0.55, 0.20), 0.4)
rug_mat = mat("rug", (0.55, 0.25, 0.20), 0.95)
tv_screen = mat("tv_screen", (0.05, 0.08, 0.10), 0.3)
clay = mat("clay", (0.75, 0.70, 0.60), 0.9)

def bevel(obj, amount=0.03):
    mod = obj.modifiers.new("bevel", 'BEVEL')
    mod.width = amount
    mod.segments = 3
    mod.limit_method = 'ANGLE'
    return obj

def box(name, sx, sy, sz, loc, material, bevel_amt=0.02, rot=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.active_object
    o.name = name
    o.scale = (sx, sy, sz)
    bpy.ops.object.transform_apply(scale=True)
    if rot: o.rotation_euler = rot
    o.data.materials.append(material)
    if bevel_amt > 0: bevel(o, bevel_amt)
    return o

def cyl(name, r, depth, loc, material, vertices=16, rot=None, bevel_amt=0.01):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=r, depth=depth, location=loc, rotation=rot or (0,0,0))
    o = bpy.context.active_object
    o.name = name
    o.data.materials.append(material)
    if bevel_amt > 0: bevel(o, bevel_amt)
    return o

def sphere(name, r, loc, material, scale=None, bevel_amt=0.01):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=r, location=loc)
    o = bpy.context.active_object
    o.name = name
    if scale: o.scale = scale
    bpy.ops.object.transform_apply(scale=True)
    o.data.materials.append(material)
    if bevel_amt > 0: bevel(o, bevel_amt)
    return o

R = 1.3
H = 4.4

# Back half cylindrical wall
def arc_wall(name, r_inner, r_outer, y0, y1, mat_in, mat_out):
    seg = 24
    verts = []
    faces = []
    for i in range(seg+1):
        a = math.pi * i / seg
        ca, sa = math.cos(a), math.sin(a)
        verts.append((r_inner*ca, y0, r_inner*sa))
        verts.append((r_inner*ca, y1, r_inner*sa))
        verts.append((r_outer*ca, y0, r_outer*sa))
        verts.append((r_outer*ca, y1, r_outer*sa))
    for i in range(seg):
        b = i*4; n = (i+1)*4
        faces.append((b, n, n+1, b+1))
        faces.append((b+2, b+3, n+3, n+2))
        faces.append((b+1, n+1, n+3, b+3))
        faces.append((b, b+2, n+2, n))
    faces.append((0, 1, 3, 2))
    e = seg*4
    faces.append((e, e+2, e+3, e+1))
    mesh = bpy.data.meshes.new(name+"Mesh")
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    o = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(o)
    o.data.materials.append(mat_in)
    o.data.materials.append(mat_out)
    for i, poly in enumerate(mesh.polygons):
        poly.material_index = 0 if i % 4 == 0 else 1
    return o

arc_wall("wall_inner", R, R+0.12, 0, H, tile_green, stone_ext)

# Floor slabs
def arc_floor(name, r, y, material):
    seg = 24
    verts = []
    for i in range(seg+1):
        a = math.pi * i / seg
        verts.append((r*math.cos(a), y, r*math.sin(a)))
    center_idx = len(verts)
    verts.append((0, y, 0))
    faces = [(center_idx, i, i+1) for i in range(seg)]
    mesh = bpy.data.meshes.new(name+"Mesh")
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    o = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(o)
    o.data.materials.append(material)
    return o

for i, fy in enumerate([0.0, 1.15, 2.30, 3.45]):
    arc_floor(f"floor_{i}", R, fy, tile_floor)

# Dome
bpy.ops.mesh.primitive_uv_sphere_add(radius=R+0.12, location=(0, H, 0))
dome = bpy.context.active_object
dome.name = "dome"
dome.scale = (1, 0.6, 1)
bpy.ops.object.transform_apply(scale=True)
dome.data.materials.append(stone_ext)

# Antenna
cyl("antenna", 0.025, 0.4, (0.3, H+0.4, 0.3), chrome, 8, bevel_amt=0.005)
sphere("antenna_tip", 0.05, (0.3, H+0.62, 0.3), brass)

# === Door ===
door_group = bpy.data.objects.new("door", None)
bpy.context.collection.objects.link(door_group)
door_group.location = (-0.35, 0, R-0.05)
door_panel = box("door_panel", 0.5, 1.0, 0.05, (0.25, 0.55, 0), door_mat, bevel_amt=0.02)
door_panel.parent = door_group
door_panel.location = (0.25, 0.55, 0)
# Arch top
bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=0.25, depth=0.05, location=(0.25, 1.05, 0), rotation=(math.pi/2, 0, 0))
arch = bpy.context.active_object
arch.name = "door_arch"
arch.data.materials.append(door_mat)
arch.parent = door_group
arch.location = (0.25, 1.05, 0)
knob = sphere("door_knob", 0.04, (0.40, 0.55, 0.05), brass)
knob.parent = door_panel
knob.location = (0.15, 0, 0.05)

# === Spiral staircase ===
for i in range(20):
    angle = math.pi/2 - 0.3 - i * 0.12
    y = 0.05 + i * 0.18
    sx = (R-0.25) * math.cos(angle)
    sz = (R-0.25) * math.sin(angle)
    s = box(f"stair_{i}", 0.45, 0.06, 0.35, (sx, y, sz), wood_light, bevel_amt=0.015)
    s.rotation_euler[2] = angle
cyl("stair_pole", 0.04, 3.6, (R*math.cos(math.pi/2-0.3), 1.8, R*math.sin(math.pi/2-0.3)), chrome, 8, bevel_amt=0.005)

# ==========================================
# FLOOR 0: Kitchen + entrance
# ==========================================
# Kitchen counter (green cabinets)
box("kitchen_counter", 1.6, 0.5, 0.85, (0, 0.45, R-0.35), green_paint, bevel_amt=0.02)
box("kitchen_top", 1.65, 0.55, 0.05, (0, 0.90, R-0.35), white, bevel_amt=0.01)
# Cabinet doors
for cx in [-0.5, 0.0, 0.5]:
    box(f"cab_door_{cx}", 0.45, 0.02, 0.65, (cx, 0.45, R-0.08), wood_light, bevel_amt=0.01)
# Stove
box("stove", 0.4, 0.45, 0.08, (-0.4, 0.95, R-0.35), chrome, bevel_amt=0.01)
cyl("burner1", 0.06, 0.02, (-0.48, 1.0, R-0.35), tv_screen, 12, bevel_amt=0.005)
cyl("burner2", 0.06, 0.02, (-0.32, 1.0, R-0.35), tv_screen, 12, bevel_amt=0.005)
# Oven door
box("oven", 0.35, 0.05, 0.3, (-0.4, 0.5, R-0.1), wood_dark, bevel_amt=0.01)
# Sink
box("sink", 0.4, 0.3, 0.06, (0.3, 0.95, R-0.35), chrome, bevel_amt=0.01)
cyl("faucet", 0.02, 0.15, (0.3, 1.05, R-0.5), chrome, 8, bevel_amt=0.005)
# Fridge
box("fridge", 0.5, 0.55, 1.1, (0.75, 0.55, R-0.4), white, bevel_amt=0.03)
box("fridge_handle", 0.03, 0.03, 0.25, (0.52, 0.7, R-0.4), chrome, bevel_amt=0.005)

# Dining table (round wood)
cyl("dining_table", 0.35, 0.05, (0, 0.75, 0.3), wood_light, 20, bevel_amt=0.02)
cyl("dining_leg", 0.04, 0.7, (0, 0.38, 0.3), wood, 8, bevel_amt=0.01)
for i, (sx, sz) in enumerate([(0.3, 0.5), (-0.3, 0.5), (0, 0.75)]):
    cyl(f"stool_{i}", 0.12, 0.06, (sx, 0.5, sz), wood, 12, bevel_amt=0.015)
    cyl(f"stool_leg_{i}", 0.03, 0.45, (sx, 0.25, sz), wood, 8, bevel_amt=0.005)

# ==========================================
# FLOOR 1: Living room
# ==========================================
# Couch - more detailed
box("couch_base", 0.9, 0.3, 0.5, (-0.3, 1.35, R-0.45), fabric_brown, bevel_amt=0.04)
box("couch_back", 0.9, 0.5, 0.15, (-0.3, 1.6, R-0.25), fabric_brown, bevel_amt=0.04)
box("couch_arm_l", 0.15, 0.35, 0.5, (-0.75, 1.5, R-0.45), fabric_brown, bevel_amt=0.04)
box("couch_arm_r", 0.15, 0.35, 0.5, (0.15, 1.5, R-0.45), fabric_brown, bevel_amt=0.04)
box("couch_cush1", 0.35, 0.12, 0.4, (-0.55, 1.45, R-0.45), fabric_green, bevel_amt=0.03)
box("couch_cush2", 0.35, 0.12, 0.4, (-0.05, 1.45, R-0.45), fabric_green, bevel_amt=0.03)

# Armchair
box("armchair_seat", 0.4, 0.15, 0.4, (-0.7, 1.35, 0.2), fabric_brown, bevel_amt=0.04)
box("armchair_back", 0.4, 0.5, 0.12, (-0.7, 1.6, 0.05), fabric_brown, bevel_amt=0.04)
box("armchair_arm_l", 0.08, 0.3, 0.35, (-0.92, 1.45, 0.2), fabric_brown, bevel_amt=0.03)
box("armchair_arm_r", 0.08, 0.3, 0.35, (-0.48, 1.45, 0.2), fabric_brown, bevel_amt=0.03)

# Round coffee table
cyl("coffee_table", 0.25, 0.04, (-0.2, 1.35, 0.3), wood, 16, bevel_amt=0.02)
cyl("coffee_leg", 0.03, 0.3, (-0.2, 1.2, 0.3), wood, 8, bevel_amt=0.01)
# Rug
cyl("rug_living", 0.6, 0.01, (-0.2, 1.17, 0.3), rug_mat, 24, bevel_amt=0.01)

# Old TV
box("tv_body", 0.4, 0.4, 0.35, (0.6, 1.4, R-0.5), wood_dark, bevel_amt=0.03)
box("tv_screen", 0.32, 0.28, 0.02, (0.6, 1.42, R-0.32), tv_screen, bevel_amt=0.01)
box("tv_stand", 0.3, 0.05, 0.2, (0.6, 1.15, R-0.5), wood_dark, bevel_amt=0.01)

# Bookshelf
box("bookshelf", 0.5, 0.25, 0.8, (0.9, 1.55, R-0.5), wood, bevel_amt=0.02)
for i in range(3):
    box(f"book_{i}", 0.4, 0.03, 0.15, (0.9, 1.3+i*0.25, R-0.35), fabric_blue, bevel_amt=0.005)

# Potted plant
cyl("pot", 0.1, 0.2, (0.4, 1.25, 0.0), pot, 12, bevel_amt=0.02)
sphere("plant", 0.18, (0.4, 1.55, 0.0), leaf, scale=(1, 1.3, 1))

# Wall pictures
for i, px in enumerate([-0.5, 0.0]):
    box(f"pic_frame_{i}", 0.25, 0.03, 0.3, (px, 1.8, R-0.05), wood, bevel_amt=0.01)
    box(f"pic_{i}", 0.2, 0.02, 0.24, (px, 1.8, R-0.03), mat(f"paint_{i}", (0.7, 0.5, 0.4), 0.9), bevel_amt=0.005)

# ==========================================
# FLOOR 2: Bedroom + bathroom
# ==========================================
# Four-poster bed
box("bed_frame", 0.9, 0.2, 0.55, (-0.2, 2.45, R-0.45), wood_light, bevel_amt=0.02)
box("bed_mattress", 0.85, 0.12, 0.5, (-0.2, 2.60, R-0.45), fabric_blue, bevel_amt=0.04)
box("bed_pillow", 0.25, 0.1, 0.4, (-0.5, 2.70, R-0.45), white, bevel_amt=0.04)
for px in [-0.6, 0.2]:
    for pz in [R-0.7, R-0.2]:
        cyl(f"bedpost_{px}_{pz}", 0.025, 0.8, (px, 2.85, pz), wood_light, 8, bevel_amt=0.008)

# Nightstand + lamp
box("nightstand", 0.25, 0.3, 0.25, (0.3, 2.45, R-0.5), wood, bevel_amt=0.02)
cyl("lamp_base", 0.06, 0.03, (0.3, 2.62, R-0.5), brass, 12, bevel_amt=0.01)
sphere("lamp_shade", 0.1, (0.3, 2.72, R-0.5), white, scale=(1, 0.7, 1), bevel_amt=0.01)

# Dresser
box("dresser", 0.5, 0.3, 0.6, (0.8, 2.5, R-0.5), wood, bevel_amt=0.02)
for i in range(2):
    box(f"drawer_{i}", 0.4, 0.03, 0.25, (0.8, 2.4+i*0.25, R-0.32), wood_light, bevel_amt=0.01)

# Bathtub
sphere("bathtub", 0.25, (-0.8, 2.45, 0.3), white, scale=(1.5, 0.5, 0.8), bevel_amt=0.03)
box("bath_water", 0.35, 0.02, 0.18, (-0.8, 2.48, 0.3), fabric_blue, bevel_amt=0.01)
box("bath_sink", 0.25, 0.15, 0.2, (-0.5, 2.5, -0.1), white, bevel_amt=0.02)

# ==========================================
# FLOOR 3: Art gallery
# ==========================================
for i, (px, pz) in enumerate([(-0.5, R-0.4), (0.0, R-0.5), (0.5, R-0.4)]):
    cyl(f"plinth_{i}", 0.12, 0.3, (px, 3.6, pz), clay, 12, bevel_amt=0.02)
    sphere(f"sculpt_{i}", 0.1, (px, 3.85, pz), clay, scale=(0.8, 1.2, 0.8), bevel_amt=0.01)
    box(f"sculpt_nose_{i}", 0.04, 0.08, 0.06, (px, 3.85, pz+0.08), clay, bevel_amt=0.01)

for i, px in enumerate([-0.7, 0.0, 0.7]):
    box(f"gallery_frame_{i}", 0.3, 0.03, 0.4, (px, 3.9, R-0.05), wood, bevel_amt=0.01)
    box(f"gallery_art_{i}", 0.25, 0.02, 0.34, (px, 3.9, R-0.03), mat(f"gart_{i}", (0.6, 0.4, 0.5), 0.9), bevel_amt=0.005)

# Export
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, "squidward-interior.glb"), export_format='GLB')
print("Exported. Objects:", len(bpy.data.objects))
