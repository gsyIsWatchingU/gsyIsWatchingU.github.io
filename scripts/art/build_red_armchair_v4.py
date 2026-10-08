"""
红扶手椅 v4 —— 手绘动画风格「高靠背软包椅」
目标：明显区别于旧版「车削矮圆鼓包 + 细管球头扶手 + 外挂 torus 包边」。
- 高靠背：纵向拉长（z 0.60..1.42），上宽下收、顶部圆润；前脸「软包边框 + 中央内凹软垫」一体成型
- 接缝细脊：靠背边框内侧、坐垫边缘鼓起内侧（几何一体，非外挂 torus）
- 扶手：向前卷出的软包结构（变径扫掠，前端饱满）
- 坐垫：顶面内凹、边缘鼓起、前缘卷边、厚度变化
- 底座：红白 8 段救生圈（椭圆、压扁、分段低频微形变，固定种子）+ 四木腿落地
坐标系：Blender z-up；椅子面朝 -Y（靠背在 +Y），导出后 JS 朝向与 v3 一致。
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

mat_red    = new_material("chair_red",       (0.88, 0.24, 0.16), rough=0.85)
mat_red_dk = new_material("chair_red_dark",  (0.60, 0.15, 0.10), rough=0.88)
mat_wood   = new_material("leg_wood",        (0.56, 0.36, 0.18), rough=0.75)
mat_life   = new_material("life_ring",       (1.0, 1.0, 1.0),    rough=0.62)

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

def cylinder(r, h, pos, name, mat):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=h, vertices=22, location=pos)
    obj = bpy.context.object
    obj.name = name
    for p in obj.data.polygons:
        p.use_smooth = True
    if mat:
        obj.data.materials.append(mat)
    return obj

def sphere(r, pos, name, mat):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=r, segments=16, ring_count=10, location=pos)
    obj = bpy.context.object
    obj.name = name
    for p in obj.data.polygons:
        p.use_smooth = True
    if mat:
        obj.data.materials.append(mat)
    return obj

# ---------- 1. 高靠背（前脸：边框 + 内垫 + 细脊；顶部真圆顶 + 顶部横卷软包） ----------
def build_backrest():
    NU, NV = 22, 20
    Z_BASE = 1.28             # 圆顶起始高度
    Z_TOP = 1.44              # 圆顶顶点（横卷成为最上缘）
    def width(v):
        """v ∈ [0,1]；0.82 以下主体段，以上为半圆顶"""
        if v <= 0.82:
            t = v / 0.82
            return 0.34 + 0.05 * t * (1.0 - 0.10 * t) - 0.008 * v
        t = (v - 0.82) / 0.18
        return 0.385 * math.sqrt(max(1.0 - t * t, 0.0))
    def z_at(v):
        if v <= 0.82:
            return 0.60 + v * 0.85
        return Z_BASE + (v - 0.82) * (Z_TOP - Z_BASE) / 0.18
    def face_y(v):
        return 0.26 + 0.045 * min(v, 1.0)   # 顶部略后仰（不再过度前倾）
    def front_off(u, v):
        du = min(u, 1.0 - u)
        dt = max(1.0 - min(v, 0.95), 0.0)
        d = min(du, dt)
        off = 0.0
        if d < 0.13:                      # 软包边框（上缘 + 左右缘）更宽更鼓
            t = d / 0.13
            off += 0.040 * (1.0 - t * t)
        cu = (u - 0.5) * 2
        cv = (v - 0.62) * 1.35
        if v < 0.92:                      # 中央内凹软垫（更明显的结构层次）
            off -= 0.022 * max(0.0, 1.0 - cu * cu) * max(0.0, 1.0 - cv * cv)
        d2 = abs(d - 0.135)               # 边框内侧接缝细脊
        off += 0.010 * math.exp(-(d2 / 0.020) ** 2)
        return off
    bm = bmesh.new()
    verts = {}
    for j in range(NV + 1):
        v = (j / NV) * 1.05
        for i in range(NU + 1):
            u = i / NU
            x = width(v) * (u - 0.5) * 2
            z = z_at(v)
            # C 形侧翼：边缘前卷包裹（sin 峰值在边缘），顶部与圆顶区减弱
            du = min(u, 1.0 - u)
            wing = 0.050 * (1.0 - math.sin(math.pi * du)) * max(0.0, 1.0 - v / 1.35)
            depth = 0.105 - 0.035 * (1.0 - math.sin(math.pi * du)) * max(0.0, 1.0 - v / 1.35)
            yf = face_y(v) + front_off(u, v) + wing
            yb = face_y(v) + front_off(u, v) - depth
            verts[(i, j, 0)] = bm.verts.new((x, yf, z))
            verts[(i, j, 1)] = bm.verts.new((x, yb, z))
    for j in range(NV):
        for i in range(NU):
            f0, f1 = verts[(i, j, 0)], verts[(i + 1, j, 0)]
            f2, f3 = verts[(i + 1, j + 1, 0)], verts[(i, j + 1, 0)]
            bm.faces.new((f0, f1, f2, f3))
            b0, b1 = verts[(i, j, 1)], verts[(i + 1, j, 1)]
            b2, b3 = verts[(i + 1, j + 1, 1)], verts[(i, j + 1, 1)]
            bm.faces.new((b0, b3, b2, b1))
    for j in range(NV):
        for side in (0, 1):
            i = 0 if side == 0 else NU
            a = verts[(i, j, 0)]
            b = verts[(i, j, 1)]
            c = verts[(i, j + 1, 1)]
            d = verts[(i, j + 1, 0)]
            bm.faces.new((a, b, c, d))
    # 顶部封口：圆顶汇聚（宽度→0，逐列收拢到顶点）
    for i in range(NU):
        fi = verts[(i, NV, 0)]
        fj = verts[(i + 1, NV, 0)]
        bj = verts[(i + 1, NV, 1)]
        bi = verts[(i, NV, 1)]
        if abs(fi.co.x) < 1e-4 and abs(fj.co.x) < 1e-4:
            bm.faces.new((fi, fj, bj, bi))
        else:
            bm.faces.new((fi, fj, bj, bi))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    uv_layer = bm.loops.layers.uv.new("UVMap")
    for f in bm.faces:
        for loop in f.loops:
            vtx = loop.vert
            loop[uv_layer].uv = (vtx.co.x / 0.9 + 0.5, (vtx.co.z - 0.58) / 0.95)
    obj = bmesh_to_obj(bm, "backrest", mat_red)
    return obj

# ---------- 2. 坐垫（内凹顶面 + 边缘鼓起 + 前缘卷边 + 细脊） ----------
def build_seat():
    NU, NW = 18, 18
    X0, X1 = -0.34, 0.34
    Y0, Y1 = -0.30, 0.30
    ZBOT, ZTOP = 0.38, 0.68
    def top_z(u, w):
        z = ZTOP
        z -= 0.028 * (math.sin(math.pi * u)) ** 2 * (math.sin(math.pi * w)) ** 2
        d = min(u, 1.0 - u, w, 1.0 - w)
        if d < 0.16:
            z += 0.020 * (1.0 - d / 0.16) ** 1.2
        if w < 0.12:
            z += 0.014 * (1.0 - w / 0.12)      # 前缘卷边
        d2 = abs(d - 0.16)
        z += 0.008 * math.exp(-(d2 / 0.022) ** 2)
        return z
    bm = bmesh.new()
    verts = {}
    for j in range(NW + 1):
        w = j / NW
        for i in range(NU + 1):
            u = i / NU
            x = X0 + (X1 - X0) * u
            y = Y0 + (Y1 - Y0) * w
            zt = top_z(u, w)
            verts[(i, j, 0)] = bm.verts.new((x, y, zt))
            verts[(i, j, 1)] = bm.verts.new((x * 0.92, y * 0.92, ZBOT))
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
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    uv_layer = bm.loops.layers.uv.new("UVMap")
    for f in bm.faces:
        for loop in f.loops:
            vtx = loop.vert
            loop[uv_layer].uv = (vtx.co.x / 0.72 + 0.5, (vtx.co.z - 0.34) / 0.38)
    obj = bmesh_to_obj(bm, "seat", mat_red)
    return obj

# ---------- 3. 扶手（向前卷出的软包：变径扫掠，前端饱满） ----------
def catmull_rom(pts, n):
    out = []
    for i in range(len(pts) - 1):
        p0 = pts[max(i - 1, 0)]
        p1 = pts[i]
        p2 = pts[i + 1]
        p3 = pts[min(i + 2, len(pts) - 1)]
        for k in range(n):
            t = k / n
            a = 2 * p1
            b = (-p0 + p2) * t
            c = (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t
            d = (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t
            out.append(0.5 * (a + b + c + d))
    out.append(pts[-1])
    return out

def sweep_taper(pts, radii, name, mat, segs=26, rad_segs=14):
    sample = catmull_rom(pts, segs)
    radii_s = []
    for k in range(len(sample)):
        t = k / (len(sample) - 1)
        u = t * (len(radii) - 1)
        i0 = int(u)
        i1 = min(i0 + 1, len(radii) - 1)
        f = u - i0
        radii_s.append(radii[i0] * (1 - f) + radii[i1] * f)
    bm = bmesh.new()
    rings = []
    for k, p in enumerate(sample):
        prev = sample[max(k - 1, 0)]
        nxt = sample[min(k + 1, len(sample) - 1)]
        tan = (nxt - prev)
        if tan.length_squared < 1e-9:
            tan = mathutils.Vector((0, 1, 0))
        tan.normalize()
        # 正交基
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
            r = radii_s[k]
            ring.append(bm.verts.new(p + (b1 * math.cos(ang) + b2 * math.sin(ang)) * r))
        rings.append(ring)
    for k in range(len(rings) - 1):
        for s in range(rad_segs):
            s2 = (s + 1) % rad_segs
            f = bm.faces.new((rings[k][s], rings[k][s2], rings[k + 1][s2], rings[k + 1][s]))
    # 前端饱满封口（扇面收拢到中心点）
    last = rings[-1]
    center = bm.verts.new(sample[-1] + tan * 0.005)
    for s in range(rad_segs):
        s2 = (s + 1) % rad_segs
        bm.faces.new((last[s], center, last[s2]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    uv_layer = bm.loops.layers.uv.new("UVMap")
    for f in bm.faces:
        for loop in f.loops:
            vtx = loop.vert
            loop[uv_layer].uv = (vtx.co.x / 0.9 + 0.5, min(max((vtx.co.z - 0.6) / 0.9, 0.0), 1.0))
    obj = bmesh_to_obj(bm, name, mat)
    return obj

# ---------- 4. 红白救生圈（椭圆 + 压扁 + 分段微形变） ----------
def build_life_ring():
    bpy.ops.mesh.primitive_torus_add(major_radius=0.42, minor_radius=0.115,
                                     major_segments=56, minor_segments=16, location=(0, 0, 0.16))
    life = bpy.context.object
    life.name = "life_ring"
    bpy.ops.object.mode_set(mode="EDIT")
    bm = bmesh.from_edit_mesh(life.data)
    for v in bm.verts:
        x, y, z = v.co
        a = math.atan2(y, x)
        wob = 1.0 + 0.018 * math.sin(3 * a + 0.7) + 0.012 * math.sin(5 * a + 2.1)
        rx = x * wob * 0.985
        ry = y * wob * 1.0
        rz = 0.16 + (z - 0.16) * 0.84
        v.co = (rx, ry, rz)
    bmesh.update_edit_mesh(life.data)
    bpy.ops.object.mode_set(mode="OBJECT")
    col = life.data.vertex_colors.new(name="ring_color")
    for v in life.data.vertices:
        x, y, z = v.co
        ang = math.atan2(y, x)
        seg_i = int((ang + math.pi) / (math.pi / 4)) % 8
        c = (0.85, 0.18, 0.12) if seg_i % 2 == 0 else (1.0, 1.0, 1.0)
        for loop in life.data.loops:
            if loop.vertex_index == v.index:
                col.data[loop.index].color = (*c, 1.0)
    life.data.materials.append(mat_life)
    if life.data.materials:
        mat = life.data.materials[0]
        mat.use_nodes = True
        bsdf = mat.node_tree.nodes.get("Principled BSDF")
        nodes = mat.node_tree.nodes
        links = mat.node_tree.links
        vcol = nodes.new("ShaderNodeVertexColor")
        vcol.layer_name = "ring_color"
        links.new(vcol.outputs["Color"], bsdf.inputs["Base Color"])
    return life

# ---------- 5. 四腿 + 连接结 ----------
for sx, sz in ((-0.30, -0.30), (0.30, -0.30), (-0.30, 0.30), (0.30, 0.30)):
    cylinder(0.030, 0.44, (sx, sz, 0.22), f"leg_{sx}_{sz}", mat_wood)
    sphere(0.048, (sx, sz, 0.16), f"knot_{sx}_{sz}", mat_red_dk)

# ---------- 组装 ----------
build_backrest()
# 顶部横卷软包（参考图：椅背顶部一条连贯横卷，替代尖顶感）
top_pts = [
    mathutils.Vector((-0.38, 0.30, 1.34)),
    mathutils.Vector((-0.19, 0.29, 1.38)),
    mathutils.Vector((0.0, 0.285, 1.39)),
    mathutils.Vector((0.19, 0.29, 1.38)),
    mathutils.Vector((0.38, 0.30, 1.34)),
]
sweep_taper(top_pts, [0.062, 0.068, 0.072, 0.068, 0.062], "top_roll", mat_red, segs=24, rad_segs=12)
build_seat()
for sx in (-1.0, 1.0):
    pts = [
        mathutils.Vector((0.40 * sx, 0.30, 0.84)),
        mathutils.Vector((0.46 * sx, 0.08, 0.82)),
        mathutils.Vector((0.49 * sx, -0.12, 0.78)),
        mathutils.Vector((0.47 * sx, -0.26, 0.73)),
    ]
    radii = [0.068, 0.076, 0.088, 0.100]
    sweep_taper(pts, radii, f"armrest_{sx}", mat_red)
build_life_ring()

# ---------- 导出 ----------
fname = "red-armchair-v4.glb"
bpy.ops.export_scene.gltf(
    filepath=os.path.join(out_dir, fname),
    export_format="GLB",
    use_selection=False,
    export_yup=True,
    export_apply=True,
)
print(f"EXPORTED {fname} -> {out_dir}")
