"""
菠萝屋客厅外壳 v3 —— 「连续墙面 + 绘制竖纹」手绘动画风格
目标：从「厚板条围栏」改成「连续墙面」，竖纹由贴图绘制；仅在真实接缝处保留几何起伏。
- 后墙 / 左墙 / 右墙：连续平面 + 0.12 厚度；拱形门洞开口（与 arch-door-v2 门框精确配合）
- 几何起伏仅限：墙裙水平接缝（z=1.35 一道微阶）、前缘圆角角柱、基脚线
- 开口切边 / 外皮橙：绘画化表达
- 屋顶弧带 + 6 片叶冠：保留但不抢主视角
- 地面：浅暖地板（纹理由 JS 贴图绘制）
坐标系：Blender z-up；后墙 y=2.3（导出 JS z=-2.3）；房间 JS x∈[-2.6,2.6] z∈[-2.3,1.7]。
"""
import bpy
import bmesh
import math
import os
import sys
import mathutils

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
out_dir = argv[0] if argv else "."
os.makedirs(out_dir, exist_ok=True)

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.context.scene.unit_settings.system = "METRIC"

def new_material(name, color, rough=0.82, metal=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = (*color, 1.0)
        bsdf.inputs["Roughness"].default_value = rough
        bsdf.inputs["Metallic"].default_value = metal
    mat.diffuse_color = (*color, 1.0)
    return mat

mat_wall    = new_material("wall_paint",       (0.44, 0.72, 0.76), rough=0.85)
mat_wall_dk = new_material("wall_paint_dark",  (0.32, 0.58, 0.62), rough=0.88)
mat_ext     = new_material("pine_exterior",    (0.96, 0.60, 0.18), rough=0.68)
mat_ext_dk  = new_material("pine_edge",        (0.80, 0.44, 0.12), rough=0.75)
mat_floor   = new_material("floor_warm",       (0.93, 0.88, 0.76), rough=0.9)
mat_roof    = new_material("roof_band",        (0.93, 0.55, 0.16), rough=0.66)
mat_leaf    = new_material("leaf_green",       (0.30, 0.72, 0.32), rough=0.78)
mat_leaf_dk = new_material("leaf_green_dark",  (0.22, 0.60, 0.26), rough=0.8)

# ---------- 拱形门洞参数（与 arch-door-v2 门框精确配合） ----------
X0, X1 = -1.648, -0.68
ACX, ACZ, R = -1.164, 2.0, 0.484
def arch_top(x):
    dx = x - ACX
    return ACZ + math.sqrt(max(R * R - dx * dx, 0.0))

def set_face_materials(obj, inner_n, inner_mat, outer_mat, edge_mat):
    """按面法线分配材质：inner_n 方向为内墙纹，反方向为外皮橙，其余为切边"""
    obj.data.materials.clear()
    obj.data.materials.append(inner_mat)
    obj.data.materials.append(outer_mat)
    obj.data.materials.append(edge_mat)
    for f in obj.data.polygons:
        n = f.normal
        dot = n.dot(inner_n)
        if dot > 0.5:
            f.material_index = 0
        elif dot < -0.5:
            f.material_index = 1
        else:
            f.material_index = 2

def contour_wall():
    """后墙带拱门洞的平面轮廓点列 [(x,z)]，逆时针"""
    n_arc = 26
    pts = [(2.6, 0.0), (2.6, 2.8), (-2.6, 2.8), (-2.6, 0.0), (X0, 0.0)]
    for k in range(n_arc + 1):
        x = X0 + (X1 - X0) * k / n_arc
        pts.append((x, arch_top(x)))
    pts.append((X1, 0.0))
    return pts

# ---------- 1. 后墙（连续平面 + 拱门洞 + 0.12 厚度） ----------
def build_back_wall():
    contour = contour_wall()
    bpy.ops.mesh.primitive_plane_add(size=1.0, location=(0, 0, 0))
    obj = bpy.context.object
    obj.name = "wall_back"
    mesh = obj.data
    mesh.clear_geometry()
    bm = bmesh.new()
    front = [bm.verts.new((x, 2.26, z)) for (x, z) in contour]
    back = [bm.verts.new((x, 2.38, z)) for (x, z) in contour]
    bm.verts.ensure_lookup_table()
    n = len(contour)
    bm.faces.new(front)
    bm.faces.new(list(reversed(back)))
    for k in range(n):
        k2 = (k + 1) % n
        bm.faces.new((front[k], front[k2], back[k2], back[k]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(mesh)
    bm.free()
    for p in mesh.polygons:
        p.use_smooth = False
    # 内墙法线 -y（面向 JS +z）
    set_face_materials(obj, mathutils.Vector((0, -1, 0)), mat_wall, mat_ext, mat_ext_dk)
    # UV：内墙面按世界坐标投影（竖纹跨墙连续，由 JS 贴图 + remap 控制）
    return obj

# ---------- 2. 左右墙（连续平面 + 0.12 厚度） ----------
def build_side_wall(side):
    bpy.ops.mesh.primitive_plane_add(size=1.0, location=(0, 0, 0))
    obj = bpy.context.object
    obj.name = "wall_left" if side < 0 else "wall_right"
    mesh = obj.data
    mesh.clear_geometry()
    bm = bmesh.new()
    x = 2.6 * side
    front = [bm.verts.new((x, y, z)) for (y, z) in [(-1.7, 0), (2.3, 0), (2.3, 2.8), (-1.7, 2.8)]]
    back = [bm.verts.new((x + 0.12 * side, y, z)) for (y, z) in [(-1.7, 0), (2.3, 0), (2.3, 2.8), (-1.7, 2.8)]]
    bm.verts.ensure_lookup_table()
    bm.faces.new(front)
    bm.faces.new(list(reversed(back)))
    for k in range(4):
        k2 = (k + 1) % 4
        bm.faces.new((front[k], front[k2], back[k2], back[k]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(mesh)
    bm.free()
    for p in mesh.polygons:
        p.use_smooth = False
    inner_n = mathutils.Vector((side, 0, 0))   # 左墙 +x，右墙 -x
    set_face_materials(obj, inner_n, mat_wall, mat_ext, mat_ext_dk)
    return obj

# ---------- 3. 墙裙水平接缝（一道微阶，说明真实接缝） ----------
def build_wainscot():
    def strip(y0, y1, name, inner_n, mat):
        bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 0, 0))
        obj = bpy.context.object
        obj.name = name
        if inner_n.x != 0:
            obj.scale = (0.02, (y1 - y0), 0.02)
            obj.location = (2.6 * inner_n.x, (y0 + y1) / 2, 1.35)
        else:
            obj.scale = (5.2, 0.02, 0.02)
            obj.location = (0, (y0 + y1) / 2, 1.35)
        bpy.ops.object.transform_apply(scale=True)
        obj.data.materials.append(mat)
        return obj
    strip(1.34, 1.36, "wainscot_back", mathutils.Vector((0, 1, 0)), mat_wall_dk)
    strip(1.34, 1.36, "wainscot_left", mathutils.Vector((-1, 0, 0)), mat_wall_dk)
    strip(1.34, 1.36, "wainscot_right", mathutils.Vector((1, 0, 0)), mat_wall_dk)

# ---------- 4. 前缘圆角角柱（让开放切边像手绘收口） ----------
def build_corner_posts():
    for sx, sy in ((-2.6, -1.7), (2.6, -1.7)):
        bpy.ops.mesh.primitive_cylinder_add(vertices=14, radius=0.10, depth=2.8,
                                            location=(sx, sy, 1.4))
        post = bpy.context.object
        post.name = f"corner_post_{sx}_{sy}"
        for p in post.data.polygons:
            p.use_smooth = True
        post.data.materials.append(mat_wall_dk)
    # 前缘地面收口（一道矮门槛）
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, -1.7, 0.06))
    sill = bpy.context.object
    sill.name = "front_sill"
    sill.scale = (5.2, 0.08, 0.12)
    bpy.ops.object.transform_apply(scale=True)
    for p in sill.data.polygons:
        p.use_smooth = True
    sill.data.materials.append(mat_wall_dk)

# ---------- 5. 基脚线 ----------
def build_baseboard():
    def bb(x0, x1, y0, y1):
        bpy.ops.mesh.primitive_cube_add(size=1.0, location=((x0 + x1) / 2, (y0 + y1) / 2, 0.07))
        o = bpy.context.object
        o.scale = ((x1 - x0), (y1 - y0), 0.07)
        bpy.ops.object.transform_apply(scale=True)
        o.data.materials.append(mat_wall_dk)
        return o
    bb(-2.6, 2.6, 2.26, 2.38)
    bb(-2.66, -2.54, -1.7, 2.3)
    bb(2.54, 2.66, -1.7, 2.3)

# ---------- 6. 地面（浅暖地板，纹理由 JS 贴图） ----------
def build_floor():
    bpy.ops.mesh.primitive_plane_add(size=1.0, location=(0, 0.3, 0))
    floor = bpy.context.object
    floor.name = "floor_warm"
    floor.scale = (5.2, 4.0, 1.0)
    bpy.ops.object.transform_apply(scale=True)
    floor.data.materials.append(mat_floor)
    return floor

# ---------- 7. 屋顶弧带（菠萝外皮：后墙上方的浅穹带） ----------
def roof_tube():
    Rr = 2.7
    zc = 1.2
    y0, y1 = 2.45, 3.05
    steps = 26
    seg = 10
    bpy.ops.mesh.primitive_plane_add(size=1.0, location=(0, 0, 0))
    obj = bpy.context.object
    obj.name = "roof_band"
    mesh = obj.data
    mesh.clear_geometry()
    bm = bmesh.new()
    for k in range(steps + 1):
        th = math.pi * k / steps
        x = Rr * math.cos(th)
        z = zc + Rr * math.sin(th)
        for s in range(seg + 1):
            yy = y0 + (y1 - y0) * s / seg
            bm.verts.new((x, yy, z))
    bm.verts.ensure_lookup_table()
    for k in range(steps):
        for s in range(seg):
            i00 = k * (seg + 1) + s
            i10 = k * (seg + 1) + s + 1
            i01 = (k + 1) * (seg + 1) + s
            i11 = (k + 1) * (seg + 1) + s + 1
            f = bm.faces.new((bm.verts[i00], bm.verts[i10], bm.verts[i11], bm.verts[i01]))
            f.smooth = True
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(mesh)
    bm.free()
    for f in mesh.polygons:
        f.use_smooth = True
    mesh.materials.append(mat_roof)
    return obj

# ---------- 8. 叶冠 ----------
def leaf(a, i):
    bpy.ops.mesh.primitive_cone_add(vertices=12, radius1=0.20, depth=0.62, location=(0, 0, 0))
    cone = bpy.context.object
    cone.scale = (1.0, 0.9, 1.3)
    bpy.ops.object.transform_apply(scale=True)
    x = 1.30 * math.cos(a)
    z = 1.2 + math.sqrt(max(7.29 - x * x, 0.1))
    cone.location = (x, 2.75, z)
    cone.rotation_euler.z = a
    cone.rotation_euler.x = -1.15
    cone.data.materials.append(mat_leaf if i % 2 else mat_leaf_dk)
    return cone

# ---------- 组装 ----------
build_back_wall()
build_side_wall(-1)
build_side_wall(1)
build_wainscot()
build_corner_posts()
build_baseboard()
build_floor()
roof_tube()
for i in range(6):
    leaf(i * math.pi / 3 + 0.5, i)

# ---------- 导出 ----------
fname = "room-shell-v3.glb"
bpy.ops.export_scene.gltf(
    filepath=os.path.join(out_dir, fname),
    export_format="GLB",
    use_selection=False,
    export_yup=True,
    export_apply=True,
)
print(f"EXPORTED {fname} -> {out_dir}")
