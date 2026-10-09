"""完整三层菠萝屋的精确结构。Blender Z-up，导出 glTF Y-up。"""
import bpy
from mathutils import Vector
import math
from pathlib import Path
import random
import sys
import json
import hashlib

args=sys.argv[sys.argv.index("--")+1:]
OUT=Path(args[0]); TEXTURES=Path(args[1]);OUT.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.context.scene.unit_settings.system="METRIC"
rng=random.Random(20261009)

def material(name,color,texture=None):
    m=bpy.data.materials.new(name);m.use_nodes=True
    p=m.node_tree.nodes.get("Principled BSDF");p.inputs["Base Color"].default_value=(*color,1);p.inputs["Roughness"].default_value=.88
    if texture:
        t=m.node_tree.nodes.new("ShaderNodeTexImage");t.image=bpy.data.images.load(str(TEXTURES/f"{texture}.jpg"));m.node_tree.links.new(t.outputs["Color"],p.inputs["Base Color"])
    return m

orange=material("skin",(1,.6,.15),"pineapple");cut=material("cut_edge",(.67,.34,.10),"wood")
blue=material("living_wall",(.4,.7,.85),"blue-wall");green=material("bath_wall",(.3,.6,.2),"bath-wall")
plaid=material("bed_wall",(.9,.4,.3),"bed-wall");wood=material("wood",(.6,.4,.2),"wood")
sand=material("sand",(.9,.8,.6),"sand");pink=material("pink",(.9,.6,.6),"pink-floor")
libfloor=material("library_green",(.4,.6,.2),"library-floor");leafmat=material("leaf",(.3,.6,.1),"leaf")
metal=material("blue_metal",(.15,.29,.53));glass=material("window_glass",(.33,.67,.82))
rope=material("rope",(.69,.54,.3));dark=material("seams",(.22,.28,.32));rugmat=material("rug",(.3,.6,.2),"rug")
bookmats=[material(f"book_{i}",c) for i,c in enumerate([(.68,.44,.65),(.9,.66,.28),(.62,.74,.36),(.78,.42,.37),(.38,.62,.67),(.89,.76,.54)])]
pages=material("pages",(.88,.82,.63))

def mesh(name,verts,faces,mat,room=None,level=None,uv=None):
    me=bpy.data.meshes.new(name);me.from_pydata(verts,[],faces);me.update()
    ob=bpy.data.objects.new(name,me);bpy.context.collection.objects.link(ob);me.materials.append(mat)
    if room:ob["roomId"]=room
    if level is not None:ob["level"]=level
    if uv:
        layer=me.uv_layers.new(name="UVMap")
        for poly in me.polygons:
            for li in poly.loop_indices:layer.data[li].uv=uv[me.loops[li].vertex_index]
    return ob

def box(name,pos,size,mat,room=None,level=None,bevel=.025):
    bpy.ops.mesh.primitive_cube_add(size=1,location=pos);o=bpy.context.object;o.name=name;o.dimensions=size
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(mat)
    if bevel:
        m=o.modifiers.new("rounded edges","BEVEL");m.width=bevel;m.segments=2
        bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=m.name)
    if room:o["roomId"]=room
    if level is not None:o["level"]=level
    return o

def tube(name,points,radius,mat,room=None,level=None):
    c=bpy.data.curves.new(name,"CURVE");c.dimensions="3D";c.resolution_u=2;c.bevel_depth=radius;c.bevel_resolution=2
    s=c.splines.new("POLY");s.points.add(len(points)-1)
    for p,co in zip(s.points,points):p.co=(*co,1)
    o=bpy.data.objects.new(name,c);bpy.context.collection.objects.link(o);o.data.materials.append(mat)
    if room:o["roomId"]=room
    if level is not None:o["level"]=level
    return o

def radius(z):
    return 4.7*math.sqrt(max(.01,1-((z-3)/7.3)**2))

def back_y(x,z):
    return .72*math.sqrt(max(.02,(radius(z)-.28)**2-x*x))-.035

# 楼梯每段使用垂直轴；楼层间通过落脚平台换位，不再让整根轴斜穿房间。
STAIRS=[(2.8,1.35),(2.15,1.15),(1.15,.60)]
TREAD_R=.68;RAIL_R=.72
# 二、三层右后墙按隔墙边界拆分，近景保留房门后面的连续墙面。
for level in range(3):
    regions=[("right","living" if level==0 else "library",blue if level==0 else wood),
             ("left",["living","bathroom","bedroom"][level],[blue,green,plaid][level])]
    if level>0:
        room,mat=[("bathroom",green),("bedroom",plaid)][level-1]
        regions=[("right","library",wood),("room_back",room,mat),("left",room,mat)]
    for region,room,mat in regions:
        na,nz=32,16
        verts=[];uv=[]
        for inner in (False,True):
            for j in range(nz+1):
                z=level*3+j*3/nz;r=radius(z)-(.28 if inner else 0)
                split=math.acos((1.12 if level==2 else .25)/r)
                if region=="left":a0,a1=math.pi/2,math.pi+.10
                elif region=="room_back":a0,a1=split,math.pi/2
                else:a0,a1=-.10,(split if level>0 else math.pi/2)
                for i in range(na+1):
                    a=a0+(a1-a0)*i/na
                    verts.append((r*math.cos(a),r*.72*math.sin(a),z));uv.append((i/na*2,z/3))
        faces=[];offset=(na+1)*(nz+1)
        for j in range(nz):
            for i in range(na):
                k=j*(na+1)+i;faces.append((k,k+1,k+na+2,k+na+1));faces.append((k+offset,k+offset+na+1,k+offset+na+2,k+offset+1))
        for i in range(na):
            faces.append((i,i+offset,i+offset+1,i+1));k=nz*(na+1)+i;faces.append((k,k+1,k+1+offset,k+offset))
        for j in range(nz):
            for i in (0,na):
                k=j*(na+1)+i;faces.append((k,k+na+1,k+na+1+offset,k+offset))
        ob=mesh(f"shell_{level}_{region}",verts,faces,orange,room,level,uv)
        ob["occluder"]=True;ob.data.materials.append(mat);ob.data.materials.append(cut)
        for f in ob.data.polygons:
            f.material_index=1 if f.index<na*nz*2 and f.index%2 else (0 if f.index<na*nz*2 else 2)
            f.use_smooth=f.index<na*nz*2

def floor(name,z,r,mat,room,level,xmax=None,hole=False,xmin=None):
    pts=[(r*math.cos(a),r*.72*math.sin(a)) for i in range(129) for a in [i*math.tau/128]]
    if xmax is not None or xmin is not None:
        clipped=[]
        bound=xmax if xmax is not None else xmin
        inside=lambda x: x<=bound if xmax is not None else x>=bound
        for a,b in zip(pts,pts[1:]+pts[:1]):
            if inside(a[0]):clipped.append(a)
            if inside(a[0])!=inside(b[0]):
                t=(bound-a[0])/(b[0]-a[0]);clipped.append((bound,a[1]+t*(b[1]-a[1])))
        pts=clipped
    n=len(pts);verts=[(x,y,z+dz) for dz in (-.15,0) for x,y in pts]
    faces=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]
    uv=[((x/r+1)/2,(y/r+1)/2) for x,y in pts]*2
    ob=mesh(name,verts,faces,mat,room,level,uv)
    if hole:
        cx,cy=STAIRS[min(2,int(z/3)-1)]
        bpy.ops.mesh.primitive_cylinder_add(vertices=48,radius=.80,depth=.8,location=(cx,cy,z))
        cutter=bpy.context.object;m=ob.modifiers.new("stair opening","BOOLEAN");m.operation="DIFFERENCE";m.object=cutter
        bpy.context.view_layer.objects.active=ob;bpy.ops.object.modifier_apply(modifier=m.name);bpy.data.objects.remove(cutter,do_unlink=True)
    return ob

floor("floor_0",0,4.15,sand,"living",0)
floor("floor_1",3,4.65,pink,"bathroom",1,xmax=.25)
floor("library_floor",3,4.65,libfloor,"library",1,xmin=.25,hole=True)
floor("floor_2",6,4.02,sand,"bedroom",2,xmax=1.12)
floor("roof_garden",9,2.4,libfloor,"roof",3,hole=True)
# 弧形前缘、连续切面轮廓。
for z,r in [(0,4.15),(3,4.65),(6,4.02),(9,2.4)]:
    end=math.pi if z!=6 else math.acos(1.12/r)
    start=math.tau-end if z==6 else math.pi
    aa=[start+(math.tau-start)*i/96 for i in range(97)]
    tube(f"floor_trim_{z}",[(r*math.cos(a),r*.72*math.sin(a),z-.075) for a in aa],.065,cut,level=int(z/3))
for a in (-.1,math.pi+.1):
    tube("cut_arch",[(radius(z)*math.cos(a),radius(z)*.72*math.sin(a),z) for i in range(91) for z in [i/10]],.105,cut,level=0)

def partition(name,x,y0,y1,z,room,level,door_y=None,door_width=.90,door_height=1.7):
    wallmat=green if room=="bathroom" else plaid if room=="bedroom" else blue
    if room in ("bathroom","bedroom"):
        # 后沿随曲面外壳收窄，避免隔墙后端露天或穿出墙外。
        verts=[];steps=32
        for i in range(steps+1):
            zz=z+2.9*i/steps
            for xx,front in [(x-.065,True),(x+.065,True),(x+.065,False),(x-.065,False)]:
                verts.append((xx,y0 if front else back_y(xx,zz)+.06,zz))
        faces=[(3,2,1,0),tuple(steps*4+j for j in range(4))]
        for i in range(steps):
            for j in range(4):
                k=i*4+j;next_k=i*4+(j+1)%4;faces.append((k,next_k,next_k+4,k+4))
        ob=mesh(name,verts,faces,wallmat,room,level,[((yy-y0)/3,(zz-z)/3) for xx,yy,zz in verts])
    else:
        ob=box(name,(x,(y0+y1)/2,z+1.45),(.13,y1-y0,2.9),wallmat,room,level)
    ob["occluder"]=True
    if door_y is not None:
        cutter=box("door_cut",(x,door_y,z+door_height/2),(.8,door_width,door_height+.1),blue,bevel=.06)
        mod=ob.modifiers.new("real door opening","BOOLEAN");mod.object=cutter;mod.operation="DIFFERENCE"
        bpy.context.view_layer.objects.active=ob;bpy.ops.object.modifier_apply(modifier=mod.name);bpy.data.objects.remove(cutter,do_unlink=True)
    uv=ob.data.uv_layers.active
    if uv:
        for face in ob.data.polygons:
            for li in face.loop_indices:
                co=ob.data.vertices[ob.data.loops[li].vertex_index].co
                uv.data[li].uv=((co.y-y0)/3,(co.z-z)/3) if room in ("bathroom","bedroom") else ((co.y+y1-y0)/3,(co.z+1.45)/3)
    return ob

partition("storage_partition",-2.55,-1.6,2.35,0,"storage",0,-.25)
partition("bath_partition",.25,-1.9,2.4,3,"bathroom",1,-.5)
partition("bed_library_partition",1.12,-1.7,2.1,6,"bedroom",2,.6,1.75,2.9)
for room,x,y,z in [("storage",-2.55,-1.6,0),("bathroom",.25,-1.9,3),("bedroom",1.12,-1.7,6)]:
    tube("partition_front_post",[(x,y,z),(x,y,z+2.95)],.08,cut,room,level=int(z/3))

# 舷窗与门：分离的金属框、铆钉、玻璃和木门。
def porthole(name,x,y,z,r,room,level):
    points=[(xx,back_y(xx,zz)-.025,zz) for i in range(65) for a in [i*math.tau/64] for xx,zz in [(x+r*math.cos(a),z+r*math.sin(a))]]
    tube(name+"_frame",points,.07,metal,room,level)
    verts=[(x,back_y(x,z)-.01,z)]+[(xx,back_y(xx,zz)-.01,zz) for i in range(65) for a in [i*math.tau/64] for xx,zz in [(x+(r-.05)*math.cos(a),z+(r-.05)*math.sin(a))]]
    mesh(name+"_glass",verts,[(0,i,i+1) for i in range(1,65)],glass,room,level)
    for i in range(8):
        a=i*math.tau/8;xx=x+r*math.cos(a);zz=z+r*math.sin(a);bpy.ops.mesh.primitive_uv_sphere_add(segments=8,ring_count=4,radius=.035,location=(xx,back_y(xx,zz)-.09,zz))
        o=bpy.context.object;o.name=name+"_rivet";o.data.materials.append(dark);o["roomId"]=room;o["level"]=level

def door(name,x,y,z,width,room,level):
    height=1.8;r=width/2
    pts=[(x-r,z),(x+r,z),(x+r,z+height-r)]+[(x+r*math.cos(a),z+height-r+r*math.sin(a)) for i in range(17) for a in [i*math.pi/16]]+[(x-r,z)]
    vs=[(xx,back_y(xx,zz)+dy,zz) for dy in (0,.065) for xx,zz in pts];n=len(pts)
    ob=mesh(name,vs,[tuple(range(n)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)],metal if name=="bed_metal_door" else wood,room,level,[((xx-x+r)/width,(zz-z)/height) for xx,yy,zz in vs])
    tube(name+"_frame",[(xx,back_y(xx,zz)-.025,zz) for xx,zz in pts],.06,metal,room,level)
    for zz in (.38,.8):box(name+"_strap",(x,back_y(x,z+zz)-.04,z+zz),(width-.06,.04,.09),metal,room,level,bevel=.01)
    porthole(name+"_window",x,y-.055,z+1.35,.18,room,level)
    tube(name+"_handle",[(x+width*.3,back_y(x+width*.3,z+.77)-.07,z+.77),(x+width*.3,back_y(x+width*.3,z+.95)-.11,z+.95)],.03,dark,room,level)

door("living_door",-.6,2.74,0,.88,"living",0)
door("bath_door",-.4,2.72,3,.82,"bathroom",1)
door("bed_metal_door",.3,2.00,6,.95,"bedroom",2)
porthole("living_porthole",1.4,2.62,1.65,.46,"living",0)
porthole("bath_porthole",-2.6,2.0,4.7,.46,"bathroom",1)
porthole("bed_porthole",-1.9,1.87,7.65,.41,"bedroom",2)

# 浴室绳框镜、毛巾杆；卧室梯子。都属于可独立检查的细部。
mesh("bath_mirror",[(x,back_y(x,z)-.025,z) for x,z in [(-1.94,4.18),(-1.26,4.18),(-1.26,4.92),(-1.94,4.92)]],[(0,1,2,3)],glass,"bathroom",1)
for dx,dz in [(-.34,0),(.34,0)]:
    tube("rope_mirror",[(x,back_y(x,z)-.07,z) for i in range(41) for x,z in [(-1.6+dx+.012*math.sin(i),4.18+i*.75/40)]],.045,rope,"bathroom",1)
for dz in (-.37,.37):
    tube("rope_mirror",[(x,back_y(x,z)-.07,z) for i in range(41) for x,z in [(-1.94+i*.68/40,4.55+dz+.012*math.sin(i))]],.045,rope,"bathroom",1)
for x in (-.88,-.28):tube("ladder_rail",[(x,1.5,6.15),(x,1.7,8.7)],.035,metal,"bedroom",2)
for i in range(9):tube("ladder_step",[(-.88,1.5+i*.023,6.35+i*.27),(-.28,1.5+i*.023,6.35+i*.27)],.029,metal,"bedroom",2)

# 三段直立螺旋梯，每层一个完整回转；后侧平台把各段接到楼板和屋顶。
for level,(cx,cy) in enumerate(STAIRS):
    for i in range(21):
        z=level*3+i*.15;a=i*math.tau/20
        aa=[a-.13+j*.29/5 for j in range(6)]
        vs=[(cx+r*math.cos(t),cy+r*math.sin(t),z+dz) for dz in (-.07,0) for r in (.14,TREAD_R) for t in aa]
        faces=[tuple(range(6))+tuple(range(11,5,-1)),tuple(range(12,18))+tuple(range(23,17,-1))]
        for j in range(5):faces.extend([(j,j+1,j+13,j+12),(j+6,j+18,j+19,j+7)])
        faces.extend([(0,12,18,6),(5,11,23,17)])
        mesh("stair_tread",vs,faces,wood,"stairs",level)
        if i%2==0:tube("stair_baluster",[(cx+RAIL_R*math.cos(a),cy+RAIL_R*math.sin(a),z),(cx+RAIL_R*math.cos(a),cy+RAIL_R*math.sin(a),z+.72)],.017,metal,"stairs",level)
    pts=[]
    for i in range(121):
        z=level*3+i/40;a=i/120*math.tau
        pts.append((cx+RAIL_R*math.cos(a),cy+RAIL_R*math.sin(a),z+.73))
    tube("stair_handrail",pts,.025,metal,"stairs",level)
    tube("stair_spine",[(cx,cy,level*3),(cx,cy,(level+1)*3)],.085,metal,"stairs",level)
    if level<2:
        nx,ny=STAIRS[level+1];z=(level+1)*3
        # 平台沿两段的东侧落脚点连接，横向扶手与踏步末端接齐。
        x0=min(cx+TREAD_R,nx+TREAD_R)-.30;x1=max(cx+TREAD_R,nx+TREAD_R)+.28
        y0=min(cy,ny)-.31;y1=max(cy,ny)+.31
        box("stair_transfer_landing",((x0+x1)/2,(y0+y1)/2,z-.055),(x1-x0,y1-y0,.11),wood,"stairs",level+1)
        tube("landing_guard",[(cx+RAIL_R,cy,z+.73),(nx+RAIL_R,ny,z+.73)],.025,metal,"stairs",level+1)
        for x,y in [(x0,y1),(x1,y1)]:tube("landing_post",[(x,y,z),(x,y,z+.73)],.02,metal,"stairs",level+1)
        tube("landing_back_guard",[(x0,y1,z+.73),(x1,y1,z+.73)],.025,metal,"stairs",level+1)
box("bed_landing",(1.73,1.15,5.945),(1.38,.55,.11),wood,"stairs",2)
box("roof_landing",(1.91,.6,8.945),(.42,.52,.11),wood,"stairs",3)

# 图书馆弧形书架：真实逐本书脊、上下封面与书页，按材质合批。
for row in range(12):
    z=3.28+row*.43;r=radius(min(z,8.9))-.3
    a0=.03;a1=1.02
    aa=[a0+(a1-a0)*i/48 for i in range(49)]
    vs=[((r+dr)*math.cos(a),(r+dr)*.72*math.sin(a),z+dz) for dz in (-.07,0) for dr in (-.40,.03) for a in aa]
    fs=[]
    for i in range(48):fs.extend([(i,i+1,i+50,i+49),(i+98,i+147,i+148,i+99),(i,i+98,i+99,i+1),(i+49,i+50,i+148,i+147)])
    mesh("library_shelf",vs,fs,wood,"library",int(z/3))
    count=int(r*11)
    for j in range(count):
        a=a0+.025+(a1-a0-.05)*(j+.5)/count;x=(r-.15)*math.cos(a);y=(r-.15)*.72*math.sin(a)
        h=rng.uniform(.21,.35);w=rng.uniform(.048,.076)
        book=box("library_book",(x,y,z+h/2+.025),(w,.23,h),rng.choice(bookmats),"library",int(z/3),bevel=.005);book.rotation_euler.z=a-math.pi/2
        book.rotation_euler.y=rng.uniform(-.1,.1)
        cover=box("book_pages",(x,y,z+h-.004),(w*.78,.205,.012),pages,"library",int(z/3),bevel=.002);cover.rotation_euler.z=a-math.pi/2

# 蓝色滑梯带翻边，起点和终点均在图书馆内。
pts=[]
for i in range(65):
    t=i/64;pts.append((2.25+.60*math.sin(t*math.pi*.8),.4-2.1*t,7.65-4.45*(t*t*(3-2*t))))
verts=[]
for x,y,z in pts:
    for dx,dz in [(-.34,.13),(-.28,0),(.28,0),(.34,.13)]:verts.append((x+dx,y,z+dz))
ob=mesh("library_slide",verts,[(i*4+j,i*4+j+1,(i+1)*4+j+1,(i+1)*4+j) for i in range(64) for j in range(3)],metal,"library",1)
m=ob.modifiers.new("slide thickness","SOLIDIFY");m.thickness=.045;bpy.context.view_layer.objects.active=ob;bpy.ops.object.modifier_apply(modifier=m.name)
for dx in (-.34,.34):tube("slide_rail",[(x+dx,y,z+.13) for x,y,z in pts],.025,metal,"library",1)
for x in (1.98,2.52):tube("slide_support",[(x,.4,6.05),(x,.4,7.65)],.04,metal,"library",2)

# 客厅地毯有真实厚度和完整图案。
N=96;rr=1.23;cx,cy=.0,-1.55
vs=[(cx,cy,.02)]+[(cx+rr*math.cos(a),cy+rr*.83*math.sin(a),.02) for i in range(N+1) for a in [i*math.tau/N]]
mesh("living_rug",vs,[(0,i,i+1) for i in range(1,N+1)],rugmat,"living",0,[(.5,.5)]+[(.5+.5*math.cos(i*math.tau/N),.5+.5*math.sin(i*math.tau/N)) for i in range(N+1)])

# 叶冠：曲面叶片向外舒展，厚度、中心脊、轮廓独立建模。
for index,(tx,ty,height,width) in enumerate([(-3.5,.7,3.2,.72),(-2.8,1.7,3.6,.84),(-1.65,2.0,4.15,.8),(0,2.4,4.55,.8),(1.6,2.0,4.1,.9),(3.05,1.4,3.7,.93),(3.5,.4,3.1,.86)]):
    verts=[];uv=[];steps=24;cross=10
    for i in range(steps+1):
        t=i/steps;x=tx*(.18+.82*t);y=ty*(.25+.75*t);z=9+height*t
        w=width*(math.sin(math.pi*t)**.65)+.025
        for j in range(cross+1):
            u=j/cross*2-1;verts.append((x+w*u,y+.20*(1-u*u)*math.sin(math.pi*t),z-.22*u*u*math.sin(math.pi*t)));uv.append((j/cross,t))
    faces=[(i*(cross+1)+j,i*(cross+1)+j+1,(i+1)*(cross+1)+j+1,(i+1)*(cross+1)+j) for i in range(steps) for j in range(cross)]
    ob=mesh(f"leaf_{index}",verts,faces,leafmat,"roof",3,uv)
    m=ob.modifiers.new("leaf thickness","SOLIDIFY");m.thickness=.065;bpy.context.view_layer.objects.active=ob;bpy.ops.object.modifier_apply(modifier=m.name)
    for f in ob.data.polygons:f.use_smooth=True
    tube("leaf_spine",[(tx*(.18+.82*t),ty*(.25+.75*t)-.03,9+height*t) for i in range(25) for t in [i/24]],.02,leafmat,"roof",3)

# 沙地与进门石板。
floor("seabed",-.19,6.5,sand,"ground",-1)
for i in range(5):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=16,ring_count=8,radius=1,location=(.12*math.sin(i),-3.4-i*.57,-.1))
    o=bpy.context.object;o.name="entry_stone";o.scale=(.28,.20,.07);o.data.materials.append(libfloor);o["roomId"]="ground";o["level"]=-1

# 转曲线、按房间/层/材质合并，保留遮挡控制粒度并降低 draw call。
for o in list(bpy.context.scene.objects):
    if o.type=="CURVE":
        bpy.ops.object.select_all(action="DESELECT");o.select_set(True);bpy.context.view_layer.objects.active=o;bpy.ops.object.convert(target="MESH")
buckets={}
for o in list(bpy.context.scene.objects):
    if o.type!="MESH" or o.get("occluder") or len(o.data.materials)!=1:continue
    key=(o.get("roomId","structure"),o.get("level",0),o.data.materials[0].name)
    buckets.setdefault(key,[]).append(o)
for (room,level,mat),objects in buckets.items():
    bpy.ops.object.select_all(action="DESELECT")
    for o in objects:o.select_set(True)
    bpy.context.view_layer.objects.active=objects[0];bpy.ops.object.join();o=bpy.context.object;o.name=f"{room}_L{level}_{mat}";o["roomId"]=room;o["level"]=level

for o in bpy.context.scene.objects:
    if o.type=="MESH":
        bpy.context.view_layer.objects.active=o;o.select_set(True);bpy.ops.object.transform_apply(location=False,rotation=True,scale=True);o.select_set(False)
path=OUT/"structure.glb"
bpy.ops.export_scene.gltf(filepath=str(path),export_format="GLB",export_yup=True,export_extras=True)
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/"structure.blend"))
triangles=sum(sum(len(f.vertices)-2 for f in o.data.polygons) for o in bpy.context.scene.objects if o.type=="MESH")
(OUT/"structure-manifest.json").write_text(json.dumps({"backend":"Blender 4.5.13","source":"scripts/art/house_structure.py","coordinates":"glTF Y-up; +Z is front","floors":[0,3,6,9],"bodyHeight":9,"leafHeight":13.55,"triangles":triangles,"sha256":hashlib.sha256(path.read_bytes()).hexdigest(),"status":"review","humanReview":"pending","revision":5,"previousSha256":"8fe8b89c070f66ee1d18fda3df27c486a2fdc91d1ca18ad5c41537b1ad1ea89a","floorBoundaryX":.25,"bedroomWallBoundaryX":1.12,"stairFlightCenters":STAIRS,"stairAxis":"vertical per floor with transfer landings","sourceSHA256":hashlib.sha256(Path(__file__).read_bytes()).hexdigest()},indent=2)+"\n")
print(f"STRUCTURE EXPORTED {triangles} triangles")
