"""
绿沙发 v3 —— 手绘动画风格「三管靠背 + 完整蓝色坐垫」
目标：三根绿管不再等径等长等弧度（工业管件感），蓝坐垫前伸、厚实、清晰可见。
- 3 根绿管：长度/半径/下垂幅度轻微差异，中部受重微垂
- 橙色绑带 ×3：贴合绿管（管面压出浅凹痕）、绕至前脸近地，无多余扣件
- 蓝色坐垫：一整块厚软垫（前伸 -0.46 朝向镜头、坐面内凹、边缘鼓起、中缝细脊）
- 木腿 + 底横梁，落地
坐标系：Blender z-up；沙发面朝 -Y（靠背在 +Y，蓝坐垫前缘在 -Y），导出 JS 正面朝向主镜头。
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

mat_tube    = new_material("tube_green",      (0.36, 0.76, 0.38), rough=0.8)
mat_tube_dk = new_material("tube_green_dark", (0.27, 0.63, 0.30), rough=0.85)
mat_strap   = new_material("strap_orange",    (0.93, 0.51, 0.16), rough=0.75)
mat_seat    = new_material("seat_blue",       (0.34, 0.60, 0.88), rough=0.85)
mat_seat_dk = new_material("seat_blue_dark",  (0.24, 0.46, 0.73), rough=0.88)
mat_leg     = new_material("leg_wood",        (0.56, 0.36, 0.18), rough=0.75)

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

def cylinder(r, h, pos, name, mat, rot=None):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=h, vertices=24, location=pos)
    obj = bpy.context.object
    obj.name = name
    if rot:
        obj.rotation_euler = rot
        bpy.ops.object.transform_apply(rotation=True)
    for p in obj.data.polygons:
        p.use_smooth = True
    if mat:
        obj.data.materials.append(mat)
    return obj

def catmull_rom(pts, n):
    out = []
    for i in range(len(pts) - 1):
        p0 = pts[max(i - 1, 0)]
        p1 = pts[i]
        p2 = pts[i + 1]
        p3 = pts[min(i + 2, len(pts) - 1)]
        for k in range(n):
            t = k / n
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t))
    out.append(pts[-1])
    return out

def sweep(pts, radius, name, mat, segs=24, rad_segs=14, cap_both=False):
    """圆管扫掠（等半径）；cap_both 时两端球形收口"""
    sample = catmull_rom(pts, segs)
    bm = bmesh.new()
    rings = []
    for k, p in enumerate(sample):
        prev = sample[max(k - 1, 0)]
        nxt = sample[min(k + 1, len(sample) - 1)]
        tan = nxt - prev
        if tan.length_squared < 1e-9:
            tan = mathutils.Vector((0, 1, 0))
        tan.normalize()
        ref = mathutils.Vector((0, 0, 1))
        if abs(tan.dot(ref)) > 0.99:
            ref = mathutils.Vector((0, 1, 0))
        b1 = tan.cross(ref)
        b1.normalize()
        b2 = tan.cross(b1)
        b2.normalize()
        ring = []
        for s in range(rad_segs):
            ang = (s / rad_segs) * math.tau
            ring.append(bm.verts.new(p + (b1 * math.cos(ang) + b2 * math.sin(ang)) * radius))
        rings.append(ring)
    for k in range(len(rings) - 1):
        for s in range(rad_segs):
            s2 = (s + 1) % rad_segs
            bm.faces.new((rings[k][s], rings[k][s2], rings[k + 1][s2], rings[k + 1][s]))
    if cap_both:
        for end in (0, -1):
            ring = rings[end]
            center = bm.verts.new(sample[end])
            for s in range(rad_segs):
                s2 = (s + 1) % rad_segs
                if end == 0:
                    bm.faces.new((ring[s], ring[s2], center))
                else:
                    bm.faces.new((ring[s], center, ring[s2]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    uv_layer = bm.loops.layers.uv.new("UVMap")
    for f in bm.faces:
        for loop in f.loops:
            vtx = loop.vert
            loop[uv_layer].uv = (vtx.co.x / 1.6 + 0.5, vtx.co.z / 1.2)
    obj = bmesh_to_obj(bm, name, mat)
    return obj

# ---------- 1. 三根绿管（靠背在 +Y；长度/半径/下垂微差异 + 绑带压痕） ----------
TUBES = [
    {"r": 0.118, "half": 0.72, "zc": 0.545, "droop": 0.016, "mat": mat_tube},
    {"r": 0.122, "half": 0.70, "zc": 0.745, "droop": 0.022, "mat": mat_tube_dk},
    {"r": 0.115, "half": 0.73, "zc": 0.945, "droop": 0.014, "mat": mat_tube},
]
STRAP_XS = [-0.55, 0.0, 0.55]
STRAP_HALF = 0.045
BACK_Y = 0.26

def build_tube(spec, idx):
    r = spec["r"]
    half = spec["half"]
    zc = spec["zc"]
    droop = spec["droop"]
    pts = []
    n = 22
    for k in range(n + 1):
        x = -half + (2 * half) * k / n
        z = zc - droop * (1.0 - (x / half) ** 2)   # 中部受重下垂
        pts.append(mathutils.Vector((x, BACK_Y, z)))
    tube = sweep(pts, r, f"tube_{idx}", spec["mat"], segs=n, rad_segs=16)
    # 端盖
    for sx in (-1.0, 1.0):
        end = pts[0] if sx < 0 else pts[-1]
        bpy.ops.mesh.primitive_uv_sphere_add(radius=r * (1.0 - 0.02 * idx % 2),
                                             segments=16, ring_count=10,
                                             location=(end.x + sx * 0.012, end.y, end.z))
        cap = bpy.context.object
        cap.name = f"tube_{idx}_cap_{sx}"
        for p in cap.data.polygons:
            p.use_smooth = True
        cap.data.materials.append(spec["mat"])
    # 绑带压痕：在 x 接近绑带位置的管面（朝向 -Y 的正面）推入浅凹
    bpy.ops.object.select_all(action="DESELECT")
    tube.select_set(True)
    bpy.context.view_layer.objects.active = tube
    bpy.ops.object.mode_set(mode="EDIT")
    bm = bmesh.from_edit_mesh(tube.data)
    for v in bm.verts:
        for sx in STRAP_XS:
            if abs(v.co.x - sx) < STRAP_HALF and v.co.y < BACK_Y - 0.05:
                v.co.y += 0.010
                zrel = v.co.z - zc
                v.co.z = zc + zrel * 0.985
    bmesh.update_edit_mesh(tube.data)
    bpy.ops.object.mode_set(mode="OBJECT")
    return tube

for i, spec in enumerate(TUBES):
    build_tube(spec, i)

# ---------- 2. 蓝色坐垫（整块厚软垫：前伸 -0.46、内凹、边缘鼓起、中缝细脊） ----------
def build_blue_seat():
    NU, NW = 20, 18
    X0, X1 = -0.66, 0.66
    Y0, Y1 = 0.26, -0.46          # 背端 +0.26（藏在管下），前缘 -0.46（朝镜头）
    ZBOT, ZTOP = 0.26, 0.52
    def top_z(u, w):
        z = ZTOP
        z -= 0.028 * (math.sin(math.pi * u)) ** 2 * (math.sin(math.pi * w)) ** 2
        d = min(u, 1.0 - u, w, 1.0 - w)
        if d < 0.14:
            z += 0.020 * (1.0 - d / 0.14) ** 1.2
        if w > 0.88:
            z += 0.022 * ((1.0 - w) / 0.12)        # 前缘卷边（-Y 侧）
        d2 = abs(d - 0.14)
        z += 0.007 * math.exp(-(d2 / 0.02) ** 2)
        return z
    bm = bmesh.new()
    verts = {}
    for j in range(NW + 1):
        w = j / NW
        for i in range(NU + 1):
            u = i / NU
            x = X0 + (X1 - X0) * u
            y = Y0 + (Y1 - Y0) * w
            verts[(i, j, 0)] = bm.verts.new((x, y, top_z(u, w)))
            verts[(i, j, 1)] = bm.verts.new((x * 0.95, y * 0.95, ZBOT))
    for j in range(NW):
        for i in range(NU):
            t0, t1 = verts[(i, j, 0)], verts[(i + 1, j, 0)]
            t2, t3 = verts[(i + 1, j + 1, 0)], verts[(i, j + 1, 0)]
            bm.faces.new((t0, t1, t2, t3))
    for j in range(NW):
        for side in (0, 1):
            i = 0 if side == 0 else NU
            a = verts[(i, j, 0)]
            b = verts[(i, j, 1)]
            c = verts[(i, j + 1, 1)]
            d = verts[(i, j + 1, 0)]
            bm.faces.new((a, b, c, d))
    for i in range(NU):
        a = verts[(i, 0, 0)]
        b = verts[(i + 1, 0, 0)]
        c = verts[(i + 1, 0, 1)]
        d = verts[(i, 0, 1)]
        bm.faces.new((a, b, c, d))
        a = verts[(i, NW, 0)]
        b = verts[(i + 1, NW, 0)]
        c = verts[(i + 1, NW, 1)]
        d = verts[(i, NW, 1)]
        bm.faces.new((d, c, b, a))
    # 中缝细脊（x=0 处沿 y 方向一条微凸脊）
    for j in range(NW + 1):
        for side in (0, 1):
            i = NU // 2 if side == 0 else NU // 2 + 1
            if i <= NU:
                vtx = verts[(i, j, 0)]
                vtx.co.z += 0.006
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    uv_layer = bm.loops.layers.uv.new("UVMap")
    for f in bm.faces:
        for loop in f.loops:
            vtx = loop.vert
            loop[uv_layer].uv = (vtx.co.x / 1.4 + 0.5, (vtx.co.y - 0.26) / -0.72)
    obj = bmesh_to_obj(bm, "blue_seat", mat_seat)
    # 中缝深色线（细扁条，与坐垫同高，贴住坐面）
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, -0.10, 0.42))
    seam = bpy.context.object
    seam.name = "seat_seam"
    seam.scale = (0.014, 0.70, 0.26)
    bpy.ops.object.transform_apply(scale=True)
    for p in seam.data.polygons:
        p.use_smooth = True
    seam.data.materials.append(mat_seat_dk)
    return obj

build_blue_seat()

# ---------- 3. 橙色绑带 ×3（顶部后缘 → 前脸 → 近地） ----------
for i, x in enumerate(STRAP_XS):
    pts = [
        mathutils.Vector((x, 0.34, 1.06)),
        mathutils.Vector((x, 0.16, 1.00)),
        mathutils.Vector((x, -0.02, 0.86)),
        mathutils.Vector((x, -0.20, 0.66)),
        mathutils.Vector((x, -0.34, 0.44)),
        mathutils.Vector((x, -0.38, 0.24)),
        mathutils.Vector((x, -0.38, 0.12)),
    ]
    sweep(pts, 0.022, f"strap_{i}", mat_strap, segs=26, rad_segs=10)

# ---------- 4. 木腿 + 底横梁 ----------
for sx, sy in ((-0.58, 0.34), (0.58, 0.34), (-0.58, -0.34), (0.58, -0.34)):
    cylinder(0.032, 0.30, (sx, sy, 0.15), f"leg_{sx}_{sy}", mat_leg)
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 0.02, 0.06))
rail = bpy.context.object
rail.name = "base_rail"
rail.scale = (1.36, 0.05, 0.12)
bpy.ops.object.transform_apply(scale=True)
for p in rail.data.polygons:
    p.use_smooth = True
rail.data.materials.append(mat_leg)

# ---------- 导出 ----------
fname = "green-couch-v3.glb"
bpy.ops.export_scene.gltf(
    filepath=os.path.join(out_dir, fname),
    export_format="GLB",
    use_selection=False,
    export_yup=True,
    export_apply=True,
)
print(f"EXPORTED {fname} -> {out_dir}")

