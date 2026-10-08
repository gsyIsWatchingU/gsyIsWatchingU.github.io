"""
圆桌 v2 + 小蜗 v2 —— 手绘动画风格统一
- 圆桌：桌面边缘轻微不均匀（固定种子低频起伏）、明确弯曲腿型，桌面有厚度
- 小蜗：身体（前端头、后收尾的软体轮廓）、两根眼柄 + 眼珠、螺旋壳（可辨认身体/壳/眼柄）
坐标系：Blender z-up；分别导出 round-table-v2.glb / snail-v2.glb。
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

def new_material(name, color, rough=0.8, metal=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = (*color, 1.0)
        bsdf.inputs["Roughness"].default_value = rough
        bsdf.inputs["Metallic"].default_value = metal
    mat.diffuse_color = (*color, 1.0)
    return mat

mat_table      = new_material("table_wood",    (0.78, 0.52, 0.24), rough=0.78)
mat_table_dark = new_material("table_leg",     (0.52, 0.32, 0.15), rough=0.82)
mat_shell      = new_material("shell_phone",   (0.93, 0.78, 0.45), rough=0.65)
mat_snail_body = new_material("snail_body",    (0.80, 0.74, 0.38), rough=0.75)
mat_snail_shell= new_material("snail_shell",   (0.87, 0.42, 0.20), rough=0.7)
mat_snail_lite = new_material("snail_shell_light", (0.93, 0.62, 0.36), rough=0.75)

def bmesh_to_obj(bm, name, mat, smooth=True):
    mesh = bpy.data.meshes.new(name + "_mesh")
    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    if mat:
        mesh.materials.append(mat)
    for p in mesh.polygons:
        p.use_smooth = smooth
    return obj

# ================= 圆桌 =================
# 桌面：轻微不均匀边缘 + 厚度 + 圆角侧壁
def build_table_top():
    N = 64
    R0 = 0.55
    TH = 0.07
    bm = bmesh.new()
    top = []
    bot = []
    for k in range(N):
        a = (k / N) * math.tau
        r = R0 * (1.0 + 0.012 * math.sin(2 * a + 0.8) + 0.007 * math.sin(3 * a + 2.2))
        top.append(bm.verts.new((r * math.cos(a), r * math.sin(a), 0.60)))
        bot.append(bm.verts.new((r * math.cos(a), r * math.sin(a), 0.60 - TH)))
    for k in range(N):
        k2 = (k + 1) % N
        bm.faces.new((top[k], top[k2], bot[k2], bot[k]))
    # 顶面（扇面）
    ctop = bm.verts.new((0, 0, 0.60))
    for k in range(N):
        k2 = (k + 1) % N
        bm.faces.new((top[k], top[k2], ctop))
    cbot = bm.verts.new((0, 0, 0.60 - TH))
    for k in range(N):
        k2 = (k + 1) % N
        bm.faces.new((bot[k2], bot[k], cbot))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    uv_layer = bm.loops.layers.uv.new("UVMap")
    for f in bm.faces:
        for loop in f.loops:
            vtx = loop.vert
            loop[uv_layer].uv = (vtx.co.x / 1.2 + 0.5, vtx.co.y / 1.2 + 0.5)
    obj = bmesh_to_obj(bm, "table_top", mat_table)
    return obj

def curved_leg(name, top, bot):
    curve = bpy.data.curves.new(name + "_curve", "CURVE")
    curve.dimensions = "3D"
    curve.bevel_depth = 0.034
    curve.bevel_resolution = 5
    spline = curve.splines.new("BEZIER")
    spline.bezier_points.add(2)
    pts = spline.bezier_points
    pts[0].co = mathutils.Vector(top)
    pts[0].handle_right_type = "FREE"
    pts[0].handle_right = mathutils.Vector((top[0] * 0.3, top[1] * 0.3, top[2] - 0.14))
    mid = ((top[0] + bot[0]) / 2 * 1.25, (top[1] + bot[1]) / 2 * 1.25, 0.28)
    pts[1].co = mathutils.Vector(mid)
    pts[1].handle_left_type = "FREE"
    pts[1].handle_right_type = "FREE"
    pts[1].handle_left = mathutils.Vector((top[0] * 0.55 + bot[0] * 0.2, top[1] * 0.55 + bot[1] * 0.2, 0.34))
    pts[1].handle_right = mathutils.Vector((bot[0] * 0.4 + top[0] * 0.2, bot[1] * 0.4 + top[1] * 0.2, 0.22))
    pts[2].co = mathutils.Vector(bot)
    pts[2].handle_left_type = "FREE"
    pts[2].handle_left = mathutils.Vector((bot[0] * 0.85, bot[1] * 0.85, bot[2] + 0.10))
    obj = bpy.data.objects.new(name, curve)
    bpy.context.scene.collection.objects.link(obj)
    obj.data.materials.append(mat_table_dark)
    return obj

def build_table():
    build_table_top()
    for i in range(3):
        ang = i * math.pi * 2 / 3 + math.pi / 6
        lx, ly = math.cos(ang) * 0.34, math.sin(ang) * 0.34
        curved_leg(f"table_leg_{i}", (lx, ly, 0.56), (lx * 1.8, ly * 1.8, 0.02))
    # 桌面底缘深色箍（细圆环，低多边形）
    bpy.ops.mesh.primitive_torus_add(major_radius=0.52, minor_radius=0.014,
                                     major_segments=40, minor_segments=10, location=(0, 0, 0.565))
    rim = bpy.context.object
    rim.name = "table_rim"
    for p in rim.data.polygons:
        p.use_smooth = True
    rim.data.materials.append(mat_table_dark)

# ================= 小蜗 =================
def build_snail():
    # 身体：软体轮廓（前端头抬起，后端尾收细），沿 x 方向
    NU, NW = 20, 12
    X0, X1 = -0.42, 0.42
    def body_rx(t):
        # t: 0..1 沿身体 x；-0.42 尾 → 0.42 头
        u = (t + 0.42) / 0.84
        if u < 0.5:
            return 0.085 + 0.035 * (u / 0.5)      # 尾→中
        return 0.12 * (1.0 - (u - 0.5) / 0.5 * 0.35)
    def body_ry(t):
        u = (t + 0.42) / 0.84
        if u < 0.5:
            return 0.075 + 0.035 * (u / 0.5)
        return 0.11 * (1.0 - (u - 0.5) / 0.5 * 0.2)
    def body_z(t):
        u = (t + 0.42) / 0.84
        return 0.10 + 0.045 * math.sin(math.pi * u)   # 中间略鼓
    bm = bmesh.new()
    rings = []
    for j in range(NW + 1):
        t = X0 + (X1 - X0) * j / NW
        ring = []
        for i in range(NU + 1):
            a = (i / NU) * math.tau
            rx = body_rx(t)
            ry = body_ry(t)
            x = t
            y = ry * math.cos(a)
            z = body_z(t) + rx * math.sin(a)
            ring.append(bm.verts.new((x, y, z)))
        rings.append(ring)
    for j in range(NW):
        for i in range(NU):
            i2 = (i + 1) % (NU + 1)
            a = rings[j][i]
            b = rings[j][i2]
            c = rings[j + 1][i2]
            d = rings[j + 1][i]
            bm.faces.new((a, b, c, d))
    # 尾部 / 头部封口
    for end, cx in ((0, X0), (NW, X1)):
        ring = rings[end]
        center = bm.verts.new((cx, 0, body_z(cx)))
        for i in range(NU):
            i2 = (i + 1) % (NU + 1)
            if end == 0:
                bm.faces.new((ring[i], ring[i2], center))
            else:
                bm.faces.new((ring[i], center, ring[i2]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    uv_layer = bm.loops.layers.uv.new("UVMap")
    for f in bm.faces:
        for loop in f.loops:
            vtx = loop.vert
            loop[uv_layer].uv = ((vtx.co.x + 0.42) / 0.84, vtx.co.z / 0.2)
    bmesh_to_obj(bm, "snail_body", mat_snail_body)

    # 眼柄（细锥形）+ 眼珠
    for sx in (0.20, 0.30):
        bpy.ops.mesh.primitive_cylinder_add(radius=0.016, depth=0.16, vertices=10,
                                            location=(sx, 0, 0.24))
        stalk = bpy.context.object
        stalk.name = f"snail_stalk_{sx}"
        for p in stalk.data.polygons:
            p.use_smooth = True
        stalk.data.materials.append(mat_snail_body)
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.026, segments=12, ring_count=8,
                                             location=(sx, 0, 0.325))
        eye = bpy.context.object
        eye.name = f"snail_eye_{sx}"
        for p in eye.data.polygons:
            p.use_smooth = True
        eye.data.materials.append(mat_snail_lite)

    # 螺旋壳：沿螺旋线扫掠变径圆管
    def spiral_pts(turns=2.2, n=40):
        pts = []
        for k in range(n + 1):
            t = k / n
            a = t * turns * math.tau
            r = 0.10 * (1.0 - t * 0.45) + 0.03
            x = -0.06 - r * math.cos(a) * 0.85
            y = r * math.sin(a) * 0.55
            z = 0.18 + t * 0.20
            pts.append(mathutils.Vector((x, y, z)))
        return pts

    def sweep(pts, radii, name, mat, rad_segs=12):
        bm2 = bmesh.new()
        rings2 = []
        for k, p in enumerate(pts):
            prev = pts[max(k - 1, 0)]
            nxt = pts[min(k + 1, len(pts) - 1)]
            tan = nxt - prev
            tan.normalize()
            ref = mathutils.Vector((0, 0, 1))
            if abs(tan.dot(ref)) > 0.99:
                ref = mathutils.Vector((0, 1, 0))
            b1 = tan.cross(ref)
            b1.normalize()
            b2v = tan.cross(b1)
            b2v.normalize()
            ring = []
            for s in range(rad_segs):
                ang = (s / rad_segs) * math.tau
                rr = radii[k]
                ring.append(bm2.verts.new(p + (b1 * math.cos(ang) + b2v * math.sin(ang)) * rr))
            rings2.append(ring)
        for k in range(len(rings2) - 1):
            for s in range(rad_segs):
                s2 = (s + 1) % rad_segs
                bm2.faces.new((rings2[k][s], rings2[k][s2], rings2[k + 1][s2], rings2[k + 1][s]))
        ring = rings2[-1]
        center = bm2.verts.new(pts[-1])
        for s in range(rad_segs):
            s2 = (s + 1) % rad_segs
            bm2.faces.new((ring[s], center, ring[s2]))
        bmesh.ops.recalc_face_normals(bm2, faces=bm2.faces)
        bmesh_to_obj(bm2, name, mat)

    pts = spiral_pts()
    radii = [0.055 - 0.02 * (k / len(pts)) for k in range(len(pts))]
    sweep(pts, radii, "snail_shell", mat_snail_shell)
    # 壳口浅色圈
    bpy.ops.mesh.primitive_torus_add(major_radius=0.055, minor_radius=0.012,
                                     major_segments=20, minor_segments=8,
                                     location=(pts[-1].x, pts[-1].y, pts[-1].z))
    lip = bpy.context.object
    lip.name = "snail_shell_lip"
    for p in lip.data.polygons:
        p.use_smooth = True
    lip.data.materials.append(mat_snail_lite)

build_table()
build_snail()

# ---------- 导出 ----------
bpy.ops.export_scene.gltf(
    filepath=os.path.join(out_dir, "round-table-v2.glb"),
    export_format="GLB",
    use_selection=False,
    export_yup=True,
    export_apply=True,
)
print("EXPORTED round-table-v2.glb ->", out_dir)

# 只导出 snail 前缀对象
for o in bpy.context.scene.collection.objects:
    o.select_set(o.name.startswith("snail_"))
bpy.ops.export_scene.gltf(
    filepath=os.path.join(out_dir, "snail-v2.glb"),
    export_format="GLB",
    use_selection=True,
    export_yup=True,
    export_apply=True,
)
print("EXPORTED snail-v2.glb ->", out_dir)
