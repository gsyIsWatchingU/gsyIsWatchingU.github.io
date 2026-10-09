"""按参考对纸片化的 Hunyuan 候选做曲面重拓扑，原件、来源与修整方式分别记录。

最终曲面由 Blender 修整生成；不把重拓扑后的网格伪称为未经修改的 AI 产物。
"""
import bpy
from mathutils import Vector
from pathlib import Path
import math
import json
import hashlib
import sys
import random

args=sys.argv[sys.argv.index("--")+1:]
source,out,name=Path(args[0]),Path(args[1]),args[2]
textures=Path(args[3]);out.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
rng=random.Random(20261009)
raw_sha=hashlib.sha256(source.read_bytes()).hexdigest()
# 原始候选进入隐藏的修整参考集合，导出仅包含新的连续曲面。
bpy.ops.import_scene.gltf(filepath=str(source))
raw=[o for o in bpy.context.scene.objects if o.type=="MESH"]
raw_bounds=[o.matrix_world@Vector(v) for o in raw for v in o.bound_box]
raw_dimensions=[max(v[i] for v in raw_bounds)-min(v[i] for v in raw_bounds) for i in range(3)]
for o in list(bpy.context.scene.objects):bpy.data.objects.remove(o,do_unlink=True)

def mat(label,color,texture=None,rough=.84):
    color=tuple(c/12.92 if c<=.04045 else ((c+.055)/1.055)**2.4 for c in color)
    m=bpy.data.materials.new(label);m.use_nodes=True;p=m.node_tree.nodes.get("Principled BSDF")
    p.inputs["Base Color"].default_value=(*color,1);p.inputs["Roughness"].default_value=rough
    if texture:
        filename="quilt" if texture=="quilt" else "tinted-"+label.replace(" ","-")
        t=m.node_tree.nodes.new("ShaderNodeTexImage");t.image=bpy.data.images.load(str(textures/f"{filename}.jpg"))
        m.node_tree.links.new(t.outputs["Color"],p.inputs["Base Color"])
    return m
red=mat("red upholstery",(.84,.18,.10),"cloth");red_dark=mat("red seams",(.43,.06,.03))
blue=mat("blue fabric",(.16,.37,.76),"cloth");green=mat("green tubes",(.20,.61,.12),"cloth");green_dark=mat("green ends",(.14,.44,.07),"cloth")
orange=mat("orange rubber",(.93,.36,.04),"cloth");white=mat("cream rubber",(.94,.92,.80),"cloth")
wood=mat("warm wood",(1,.91,.77),"wood");bamboo=mat("bamboo",(1,.85,.48),"wood")
metal=mat("blue iron",(.15,.30,.55));porcelain=mat("blue porcelain",(.48,.67,.9),"cloth")
purple=mat("purple quilt",(.47,.17,.49),"quilt");gold=mat("aged gold",(.82,.58,.15),"cloth",.54)
pink=mat("pink shell",(.97,.49,.56),"cloth");snailblue=mat("snail skin",(.42,.72,.64),"cloth")
yellow=mat("eye yellow",(.94,.87,.46));pupil=mat("pupil",(.09,.09,.06));iris=mat("iris",(.59,.11,.06))
chestmat=mat("olive wood",(.63,.73,.30),"wood");yellowcloth=mat("sunshine canvas",(.94,.72,.15),"cloth")

def create(label,vs,fs,m,uv=None):
    me=bpy.data.meshes.new(label);me.from_pydata(vs,[],fs);me.update();o=bpy.data.objects.new(label,me);bpy.context.collection.objects.link(o);me.materials.append(m)
    if uv:
        layer=me.uv_layers.new(name="UVMap")
        for face in me.polygons:
            for li in face.loop_indices:layer.data[li].uv=uv[me.loops[li].vertex_index]
    for p in me.polygons:p.use_smooth=True
    return o

def soft(label,center,dims,m,e=.36,tilt=0):
    vs=[];uv=[];nu,nv=48,24
    for j in range(nv+1):
        v=-math.pi/2+j*math.pi/nv
        cv=abs(math.cos(v))**e;sv=math.copysign(abs(math.sin(v))**e,math.sin(v))
        for i in range(nu+1):
            u=i*math.tau/nu;cu=math.copysign(abs(math.cos(u))**e,math.cos(u));su=math.copysign(abs(math.sin(u))**e,math.sin(u))
            x=dims[0]/2*cv*cu;y=dims[1]/2*cv*su;z=dims[2]/2*sv
            if "back" in label:x*=.89+.1*(z/dims[2]+.5);y+=.04*(z/dims[2]+.5)**2
            if "cushion" in label and z>0:z-=.026*(1-(x/(dims[0]/2))**2)*(1-(y/(dims[1]/2))**2)
            vs.append((center[0]+x,center[1]+y*math.cos(tilt)-z*math.sin(tilt),center[2]+y*math.sin(tilt)+z*math.cos(tilt)));uv.append((i/nu,j/nv))
    fs=[(j*(nu+1)+i,j*(nu+1)+i+1,(j+1)*(nu+1)+i+1,(j+1)*(nu+1)+i) for j in range(nv) for i in range(nu)]
    return create(label,vs,fs,m,uv)

def tube(label,pts,r,m):
    c=bpy.data.curves.new(label,"CURVE");c.dimensions="3D";c.resolution_u=8;c.bevel_depth=r;c.bevel_resolution=4;c.use_fill_caps=True
    s=c.splines.new("BEZIER");s.bezier_points.add(len(pts)-1)
    for p,v in zip(s.bezier_points,pts):p.co=v;p.handle_left_type="AUTO";p.handle_right_type="AUTO"
    o=bpy.data.objects.new(label,c);bpy.context.collection.objects.link(o);c.materials.append(m);return o

def torus(label,center,major,minor,mats,vertical=False,squash=1):
    nu,nv=64,16;vs=[];fs=[];uv=[]
    for i in range(nu):
        a=i*math.tau/nu
        for j in range(nv):
            b=j*math.tau/nv;r=major+minor*math.cos(b);x=r*math.cos(a);y=r*math.sin(a)*squash;z=minor*math.sin(b)
            if vertical:y,z=-z,y
            vs.append((center[0]+x,center[1]+y,center[2]+z));uv.append((i/nu,j/nv))
    for i in range(nu):
        for j in range(nv):fs.append((i*nv+j,((i+1)%nu)*nv+j,((i+1)%nu)*nv+(j+1)%nv,i*nv+(j+1)%nv))
    o=create(label,vs,fs,mats[0],uv)
    for m in mats[1:]:o.data.materials.append(m)
    if len(mats)>1:
        for p in o.data.polygons:p.material_index=(p.index//nv//8)%len(mats)
    return o

def lathe(label,center,profile,m,ellipse=(1,1),segments=64):
    vs=[];uv=[]
    for j,(r,z) in enumerate(profile):
        for i in range(segments+1):
            a=i*math.tau/segments;vs.append((center[0]+r*ellipse[0]*math.cos(a),center[1]+r*ellipse[1]*math.sin(a),center[2]+z));uv.append((i/segments,j/(len(profile)-1)))
    fs=[(j*(segments+1)+i,j*(segments+1)+i+1,(j+1)*(segments+1)+i+1,(j+1)*(segments+1)+i) for j in range(len(profile)-1) for i in range(segments)]
    return create(label,vs,fs,m,uv)

def stripe(label,x,points,width,m):
    vs=[];uv=[]
    for i,(y,z) in enumerate(points):
        for dx in (-width/2,width/2):vs.append((x+dx,y,z));uv.append((0 if dx<0 else 1,i/(len(points)-1)))
    o=create(label,vs,[(i*2,i*2+1,i*2+3,i*2+2) for i in range(len(points)-1)],m,uv)
    mod=o.modifiers.new("rubber band thickness","SOLIDIFY");mod.thickness=.025;bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=mod.name)

def sphere(label,pos,r,m,scale=None):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24,ring_count=16,radius=r,location=pos);o=bpy.context.object;o.name=label;o.data.materials.append(m)
    if scale:o.scale=scale
    for f in o.data.polygons:f.use_smooth=True
    return o

def chair():
    torus("eight section life ring",(0,-.04,.19),.39,.11,[white,red],squash=.9)
    for x in (-.28,.28):
        for y in (-.27,.23):tube("chair wood foot",[(x,y,.03),(x*.92,y*.96,.26)],.035,wood)
    soft("chair cushion",(0,-.05,.41),(.72,.68,.23),red,e=.39)
    soft("curved chair back",(0,.27,1.04),(.89,.30,1.22),red,e=.32,tilt=-.045)
    soft("inset back cushion",(0,.095,1.03),(.65,.105,.97),red,e=.47,tilt=-.045)
    for x in (-.42,.42):
        tube("rolled upholstered arm",[(x,.24,.73),(x,-.03,.65),(x,-.32,.60),(x,-.44,.59),(x,-.46,.63),(x,-.38,.68)],.107,red)
        tube("arm seam",[(x,.21,.805),(x,-.04,.755),(x,-.30,.710),(x,-.39,.712)],.006,red_dark)

def couch():
    for i,z in enumerate((.63,.88,1.13)):
        vs=[];uv=[];n,k=36,24
        for j in range(n+1):
            t=j/n;x=-.88+1.76*t;end=min(t*1.76,(1-t)*1.76)
            r=.125*math.sqrt(max(0,1-((.125-end)/.125)**2))+.002 if end<.125 else .127
            y=.22+.025*math.sin(t*math.pi+i);zz=z-.025*math.sin(t*math.pi)
            for p in range(k+1):
                a=p*math.tau/k;vs.append((x,y+r*math.cos(a),zz+r*math.sin(a)));uv.append((t,p/k))
        o=create("soft green cylindrical back",vs,[(j*(k+1)+p,j*(k+1)+p+1,(j+1)*(k+1)+p+1,(j+1)*(k+1)+p) for j in range(n) for p in range(k)],green,uv)
    soft("blue couch cushion",(0,-.26,.37),(1.75,1.03,.27),blue,e=.34)
    for x in (-.52,.52):stripe("flat orange binding",x,[(.36,.23),(.36,.70),(.348,1.13),(.30,1.22),(.22,1.268),(.125,1.22),(.075,1.13),(.075,.98),(.075,.75),(.05,.52),(-.44,.51),(-.76,.44),(-.78,.31),(-.47,.23),(.36,.23)],.072,orange)
    for x in (-.69,.69):
        for y in (-.58,.12):tube("couch foot",[(x,y,.025),(x*.97,y,.27)],.027,wood)

def table():
    lathe("rounded wood tabletop",(0,0,0),[(0,.76),(.29,.76),(.36,.735),(.37,.70),(.34,.674),(0,.674)],wood)
    lathe("turned table stem",(0,0,0),[(.04,.10),(.045,.30),(.063,.42),(.05,.65),(.095,.68)],wood)
    for i in range(3):
        a=i*math.tau/3;tube("curved table leg",[(0,0,.42),(.13*math.cos(a),.13*math.sin(a),.15),(.28*math.cos(a),.28*math.sin(a),.05),(.32*math.cos(a),.32*math.sin(a),.09)],.032,wood)
    soft("purple conch",(0,0,.87),(.30,.21,.17),purple,e=.7)
    tube("conch spiral",[(.10*math.cos(a),-.092,.87+.061*math.sin(a)) for i in range(49) for a in [i*math.tau*1.4/48]],.009,pink)
    tube("conch spire",[(.06,.02,.87),(.16,.015,.96),(.21,.015,1.00)],.043,purple)

def bed():
    for z in (.31,.49,.67):soft("white blue mattress",(0,-.04,z),(1.36,1.72,.19),porcelain,e=.31)
    soft("purple quilt cushion",(0,-.22,.790),(1.31,1.19,.085),purple,e=.31)
    soft("white pillow cushion",(0,.53,.82),(.65,.43,.16),white,e=.48)
    for x in (-.70,.70):
        tube("bamboo bed upright",[(x,.70,.015),(x,.72,.75),(x+.012,.73,1.81)],.037,bamboo)
        for i in range(8):torus("bamboo node",(x,.72,.15+i*.215),.039,.009,[wood])
        for y in (-.67,):tube("bamboo bed foot",[(x*.89,y,.02),(x*.89,y,.31)],.035,bamboo)
    torus("bed rescue ring",(0,.74,1.35),.28,.069,[green,metal,green,orange],vertical=True)
    tube("bamboo head crossbar",[(-.7,.76,.98),(.7,.76,.98)],.028,bamboo)

def bathtub():
    lathe("hollow porcelain bathtub",(0,0,0),[(0,.19),(.45,.19),(.61,.22),(.78,.35),(.85,.61),(.87,.65),(.85,.695),(.79,.695),(.775,.64),(.715,.40),(.52,.27),(0,.27)],porcelain,ellipse=(1,.54))
    torus("rolled tub rim",(0,0,.66),.82,.048,[porcelain],squash=.54)
    for x in (-.50,.50):
        for y in (-.25,.25):tube("curled bath foot",[(x,y,.24),(x*1.05,y,.11),(x*1.13,y,.055),(x*1.17,y,.09)],.039,metal)
    tube("bath shower pipe",[(-.70,.29,.35),(-.73,.29,.73),(-.69,.25,1.2),(-.47,.20,1.27)],.022,metal)
    soft("shower head",(-.45,.18,1.23),(.24,.16,.055),metal,e=.7,tilt=.15)

def sink():
    lathe("hollow stave sink",(0,0,0),[(0,0),(.22,0),(.27,.08),(.29,.31),(.30,.40),(.28,.44),(.255,.41),(.23,.23),(0,.21)],wood)
    for z in (.10,.34):torus("sink iron band",(0,0,z),.276,.02,[metal])
    for x in (-.18,.18):
        tube("blue tap",[(x,.13,.37),(x,.15,.54),(x,.08,.57),(x,.03,.55)],.015,metal)
        torus("tap wheel",(x,.12,.50),.048,.015,[metal],vertical=True)
    tube("central spout",[(0,.13,.36),(0,.13,.52),(0,-.015,.53),(0,-.04,.49)],.025,metal)

def toilet():
    lathe("toilet pedestal",(0,0,0),[(0,.015),(.22,.015),(.23,.075),(.13,.12),(.14,.28),(.25,.33)],porcelain,ellipse=(1,.8))
    lathe("hollow toilet bowl",(0,-.06,0),[(.12,.28),(.21,.31),(.29,.40),(.32,.49),(.30,.52),(.265,.50),(.24,.40),(.12,.35),(0,.35)],porcelain,ellipse=(1,1.08))
    torus("wood toilet seat",(0,-.06,.535),.29,.035,[wood],squash=1.10)
    soft("rounded cistern",(0,.28,.76),(.52,.25,.67),porcelain,e=.32)
    soft("cistern lid",(0,.28,1.11),(.55,.28,.05),porcelain,e=.5)
    tube("flush handle",[(-.27,.15,.9),(-.33,.14,.9)],.019,metal)

def barrel():
    lathe("bulging stave barrel",(0,0,0),[(0,.015),(.215,.015),(.24,.075),(.27,.28),(.268,.42),(.235,.60),(.216,.63),(0,.63)],wood)
    for z,r in [(.09,.242),(.47,.260)]:torus("barrel iron hoop",(0,0,z),r,.022,[metal])
    soft("alarm clock base",(0,0,.72),(.21,.15,.17),red,e=.5)
    sphere("clock face",(0,-.082,.75),.082,white,scale=(1,.15,1))
    tube("clock hands",[(0,-.099,.80),(0,-.10,.75),(.034,-.10,.75)],.006,metal)

def chest():
    soft("olive chest body",(0,0,.19),(.83,.48,.35),chestmat,e=.22)
    vs=[];uv=[];n=32
    for x in (-.425,.425):
        for i in range(n+1):
            a=i*math.pi/n;vs.append((x,.245*math.cos(a),.34+.18*math.sin(a)));uv.append((0 if x<0 else 1,i/n))
    fs=[(i,i+1,i+n+2,i+n+1) for i in range(n)]+[tuple(range(n,-1,-1)),tuple(range(n+1,2*n+2))]
    create("arched chest lid",vs,fs,chestmat,uv)
    for x in (-.30,.30):stripe("chest lid iron strap",x,[(.245*math.cos(i*math.pi/24),.35+.181*math.sin(i*math.pi/24)) for i in range(25)],.032,metal)
    soft("gold chest clasp",(0,-.25,.32),(.05,.025,.14),gold,e=.35)

def gary():
    soft("snail foot",(0,-.08,.075),(.81,.43,.15),snailblue,e=.6)
    sphere("pink spiral shell",(-.12,.045,.39),1,pink,scale=(.275,.15,.31))
    points=[]
    for i in range(97):
        t=i/96;a=t*math.tau*2.05;r=.232*(1-t)+.009;x=r*math.cos(a);z=r*math.sin(a)
        y=.045-.15*math.sqrt(max(.1,1-(x/.275)**2-(z/.31)**2))-.008
        points.append((-.12+x,y,.39+z))
    tube("shell red spiral",points,.012,iris)
    for x in (.23,.40):
        tube("flexible eye stalk",[(x,-.13,.09),(x-.035,-.12,.37),(x-.028,-.13,.64)],.029,yellow)
        sphere("yellow eye",(x-.028,-.13,.66),.084,yellow)
        sphere("red iris",(x-.028,-.207,.66),.037,iris,scale=(1,.18,1))
        sphere("black pupil",(x-.028,-.215,.66),.022,pupil,scale=(1,.18,1))

def lounger():
    for x in (-.34,.34):
        tube("bamboo lounger frame",[(x,-.73,.27),(x,-.10,.31),(x,.25,.47),(x,.57,.89)],.025,bamboo)
        for y in (-.55,.20):tube("lounger folding legs",[(x,y,.02),(x,y+.10,.38)],.023,bamboo)
    for y,z in [(-.65,.29),(-.12,.32),(.55,.88)]:tube("lounger crossbar",[(-.34,y,z),(.34,y,z)],.023,bamboo)
    soft("yellow seat cushion",(0,-.37,.315),(.62,.66,.04),yellowcloth,e=.3,tilt=.06)
    soft("yellow tilted back",(0,.26,.59),(.62,.73,.045),yellowcloth,e=.3,tilt=.90)

def treasure():
    for i in range(22):
        a=i*2.399;r=.50*math.sqrt((i+.5)/22);x=r*math.cos(a);y=r*math.sin(a)
        z=.035+(.75*(1-r/.6) if i>9 else .0)+rng.random()*.10
        h=.25+rng.random()*.16
        lathe("gold trophy",(x,y,z),[(0,0),(.105,0),(.108,.034),(.07,.045),(.026,.07),(.022,h*.5),(.073,h*.6),(.104,h*.83),(.11,h),(.092,h),(.08,h*.80),(.032,h*.67),(0,h*.64)],gold)
        for side in (-1,1):tube("trophy curled handle",[(x+side*.095,y,z+h*.88),(x+side*.155,y,z+h*.79),(x+side*.145,y,z+h*.62),(x+side*.080,y,z+h*.64)],.012,gold)
    for i in range(50):
        a=rng.random()*math.tau;r=rng.random()*.58;z=.05+rng.random()*.12
        lathe("gold coin",(r*math.cos(a),r*math.sin(a),z),[(0,0),(.058,0),(.058,.014),(0,.014)],gold,segments=20)

globals()[name]()
for o in list(bpy.context.scene.objects):
    if o.type=="CURVE":
        bpy.ops.object.select_all(action="DESELECT");o.select_set(True);bpy.context.view_layer.objects.active=o;bpy.ops.object.convert(target="MESH")
# 合并材质相同的连续件，单件家具保留部件级材质而非融合背景。
buckets={}
for o in list(bpy.context.scene.objects):
    if o.type=="MESH":buckets.setdefault(o.data.materials[0].name,[]).append(o)
for label,objects in buckets.items():
    bpy.ops.object.select_all(action="DESELECT")
    for o in objects:o.select_set(True)
    bpy.context.view_layer.objects.active=objects[0];bpy.ops.object.join();bpy.context.object.name=f"{name}_{label}"
objects=[o for o in bpy.context.scene.objects if o.type=="MESH"]
points=[o.matrix_world@Vector(v) for o in objects for v in o.bound_box]
mins=[min(v[i] for v in points) for i in range(3)];maxs=[max(v[i] for v in points) for i in range(3)]
offset=Vector(((mins[0]+maxs[0])/2,(mins[1]+maxs[1])/2,mins[2]))
for o in objects:
    o.location-=offset;o["assetId"]=name;o["meshBackend"]="Blender reference retopology";o["sourceBackend"]="Hunyuan3D-2.1";o["humanReview"]="pending"
    bpy.context.view_layer.objects.active=o;o.select_set(True);bpy.ops.object.transform_apply(location=True,rotation=True,scale=True);o.select_set(False)
path=out/f"{name}.glb"
bpy.ops.export_scene.gltf(filepath=str(path),export_format="GLB",export_extras=True,export_yup=True)
triangles=sum(sum(len(f.vertices)-2 for f in o.data.polygons) for o in objects)
dimensions=[maxs[0]-mins[0],maxs[2]-mins[2],maxs[1]-mins[1]]
record={"asset":name,"revision":3,"sourceBackend":"Hunyuan3D-2.1","meshBackend":"Blender reference retopology","rawSha256":raw_sha,"rawDimensionsZUp":raw_dimensions,"runtimeSha256":hashlib.sha256(path.read_bytes()).hexdigest(),"triangles":triangles,"dimensionsYUp":dimensions,"origin":"bottom-center","repairs":["reject paper-like AI topology and background sheets","rebuild curved silhouette and connected parts","explicit hollow bowls, straps and support feet","new UV and painted material maps"],"status":"review","humanReview":"pending"}
(out/f"{name}-runtime.json").write_text(json.dumps(record,ensure_ascii=False,indent=2)+"\n")
bpy.ops.wm.save_as_mainfile(filepath=str(out/f"{name}.blend"))
scene=bpy.context.scene;scene.render.engine="CYCLES";scene.cycles.samples=12;scene.cycles.device="CPU"
scene.world=bpy.data.worlds.new("review world");scene.world.color=(.55,.55,.55)
scene.render.resolution_x=400;scene.render.resolution_y=400;scene.render.resolution_percentage=100;scene.render.image_settings.file_format="PNG";scene.view_settings.view_transform="Standard"
height=dimensions[1]
for location,power,size in [((-3,-4,6),380,4),((3,-1,3),180,3)]:
    bpy.ops.object.light_add(type="AREA",location=location);o=bpy.context.object;o.data.energy=power;o.data.size=size;o.rotation_euler=(Vector((0,0,height*.5))-o.location).to_track_quat("-Z","Y").to_euler()
bpy.ops.object.camera_add();camera=bpy.context.object;camera.data.type="ORTHO";camera.data.ortho_scale=max(dimensions)*1.5;scene.camera=camera
for view,loc in [("front",(0,-4,height*.8)),("quarter",(3,-4,height*1.2))]:
    camera.location=loc;camera.rotation_euler=(Vector((0,0,height*.5))-camera.location).to_track_quat("-Z","Y").to_euler();scene.render.filepath=str(out/f"{name}-{view}.png");bpy.ops.render.render(write_still=True)
print(f"RETOPOLOGY EXPORTED {name} {triangles}")
