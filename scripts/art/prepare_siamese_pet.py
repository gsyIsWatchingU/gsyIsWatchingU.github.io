"""保留自有 GPU 网格和 UV，建立四足关节骨架供接地 IK 行走。"""
from pathlib import Path
import bpy, bmesh, math, hashlib, json, sys
from mathutils import Vector, Matrix
source, output = map(Path, sys.argv[sys.argv.index('--')+1:]); output.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True); bpy.ops.import_scene.gltf(filepath=str(source))
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
for o in meshes:
    world=o.matrix_world.copy();o.parent=None;o.matrix_world=world
    bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
    bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
p=[v.co for o in meshes for v in o.data.vertices]
lo=Vector([min(v[i] for v in p) for i in range(3)]);hi=Vector([max(v[i] for v in p) for i in range(3)])
scale=.85/(hi.z-lo.z);center=Vector(((lo.x+hi.x)/2,(lo.y+hi.y)/2,lo.z))
for o in meshes:
    for v in o.data.vertices:v.co=(v.co-center)*scale
p=[v.co.copy() for o in meshes for v in o.data.vertices];low=[v for v in p if v.z<.06]
centers=[Vector((x,y,0)) for x,y in [(-.1,-.2),(.1,-.2),(-.1,.2),(.1,.2)]]
for _ in range(30):
    clusters=[[] for _ in centers]
    for v in low:clusters[min(range(4),key=lambda i:(v-centers[i]).length_squared)].append(v)
    centers=[sum(g,Vector())/len(g) if g else centers[i] for i,g in enumerate(clusters)]
front=(centers[0]+centers[1])/2;back=(centers[2]+centers[3])/2
forward=front-back;rotation=Matrix.Rotation(-math.atan2(forward.x,-forward.y),3,'Z')
# 相机不改变骨架方向；规范猫朝 Blender -Y（glTF +Z）。
for o in meshes:
    for v in o.data.vertices:v.co=rotation@v.co
centers=[rotation@c for c in centers]
front=sorted(centers[:2],key=lambda v:v.x);back=sorted(centers[2:],key=lambda v:v.x)
feet=dict(zip(['front_l','front_r','back_l','back_r'],front+back))
front_y=sum(v.y for v in front)/2;back_y=sum(v.y for v in back)/2
arm=bpy.data.armatures.new('siamese_pet_rig');rig=bpy.data.objects.new('siamese_pet_rig',arm);bpy.context.collection.objects.link(rig)
bpy.ops.object.select_all(action='DESELECT');rig.select_set(True);bpy.context.view_layer.objects.active=rig;bpy.ops.object.mode_set(mode='EDIT')
positions={}
def bone(name,head,tail,parent=None):
    b=arm.edit_bones.new(name);b.head=head;b.tail=tail
    if parent:b.parent=arm.edit_bones[parent]
    positions[name]=list(head);return b
bone('pet_root',(0,0,.02),(0,0,.1))
bone('pet_chest',(0,front_y,.38),(0,front_y,.45),'pet_root')
bone('pet_head',(0,front_y-.015,.48),(0,front_y-.015,.57),'pet_root')
# 尾巴位于后臀正上方，连续链减少根部折角。
bone('pet_tail',(0,back_y+.11,.43),(0,back_y+.16,.58),'pet_root')
bone('pet_tail_tip',(0,back_y+.16,.58),(0,back_y+.19,.75),'pet_tail')
for name,f in feet.items():
    hind=name.startswith('back');hip=Vector((f.x,f.y+(.01 if hind else .018),.35 if hind else .34))
    knee=Vector((f.x,f.y+(-.105 if hind else .09),.205))
    ankle=Vector((f.x,f.y+.014,.065))
    bone('pet_'+name+'_upper',hip,knee,'pet_root')
    bone('pet_'+name+'_lower',knee,ankle,'pet_'+name+'_upper')
    bone('pet_'+name+'_paw',ankle,(f.x,f.y-.045,.027),'pet_'+name+'_lower')
bpy.ops.object.mode_set(mode='OBJECT')
def smooth(a,b,v):
    t=max(0,min(1,(v-a)/(b-a)));return t*t*(3-2*t)
counts={n:0 for n in positions}
for o in meshes:
    bm=bmesh.new();bm.from_mesh(o.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.00002);bm.to_mesh(o.data);bm.free()
    for face in o.data.polygons:face.use_smooth=True
    groups={n:o.vertex_groups.new(name=n) for n in positions}
    for v in o.data.vertices:
        x,y,z=v.co;weights={}
        tail=smooth(back_y+.085,back_y+.18,y)*smooth(.35,.47,z)
        tip=smooth(.55,.67,z);weights['pet_tail']=tail*(1-tip);weights['pet_tail_tip']=tail*tip
        head=smooth(.44,.53,z)*(1-smooth(front_y+.055,front_y+.15,y))*(1-tail);weights['pet_head']=head
        nearest=min(feet,key=lambda name:(x-feet[name].x)**2+(y-feet[name].y)**2)
        f=feet[nearest];distance=math.hypot(x-f.x,y-f.y)
        middle_x=sum(v.x for v in (back if nearest.startswith('back') else front))/2
        medial=1-smooth(.075,.16,z)+smooth(.075,.16,z)*smooth(0,.065,abs(x-middle_x))
        radial=1-smooth(.06,.14,z)+smooth(.06,.14,z)*(1-smooth(.02,.18,distance))
        leg=radial*medial*(1-smooth(.23,.41,z))*(1-tail)*(1-head)
        paw=1-smooth(.04,.145,z);upper=smooth(.13,.27,z);lower=max(0,1-paw-upper)
        for part,w in [('paw',paw),('lower',lower),('upper',upper)]:weights['pet_'+nearest+'_'+part]=leg*w
        weights['pet_root']=max(0,1-sum(weights.values()))
        weights=dict(sorted(weights.items(),key=lambda row:row[1],reverse=True)[:4]);total=sum(weights.values())
        for name,w in weights.items():
            if w>.00001:groups[name].add([v.index],w/total,'REPLACE');counts[name]+=1
    o.parent=rig;mod=o.modifiers.new('quadruped skin','ARMATURE');mod.object=rig
    o.name='siamese_cat';o['assetId']='siamese-cat';o['sourceBackend']='Hunyuan3D-2.1';o['humanReview']='pending'
    for material in o.data.materials:
        if material and material.use_nodes:
            shader=material.node_tree.nodes.get('Principled BSDF')
            if shader:shader.inputs['Roughness'].default_value=.88;shader.inputs['Metallic'].default_value=0
for img in bpy.data.images:
    if img.type=='IMAGE' and max(img.size)>1024:
        ratio=1024/max(img.size);img.scale(round(img.size[0]*ratio),round(img.size[1]*ratio))
path=output/'siamese-cat.glb';bpy.ops.object.select_all(action='DESELECT');rig.select_set(True)
for o in meshes:o.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(path),export_format='GLB',export_yup=True,use_selection=True,export_extras=True,export_animations=False)
p=[v.co for o in meshes for v in o.data.vertices];dims=[max(v[i] for v in p)-min(v[i] for v in p) for i in range(3)]
record={'status':'review','humanReview':'pending','meshBackend':'Hunyuan3D-2.1','sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'runtimeSha256':hashlib.sha256(path.read_bytes()).hexdigest(),'dimensionsYUp':[dims[0],dims[2],dims[1]],'triangles':sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in meshes),'bones':len(positions),'maxWeights':4,'weightedVertices':counts,'feetBlender':{n:list(v) for n,v in feet.items()},'animation':'Four beat walk; stance anchors; two bone IK; ground oriented paws; head and tail idle','repairs':['uniform scale 0.85m','canonical forward +Z','preserve GPU mesh and UV','separate upper/lower/paw chains for four legs','texture <=1024']}
(output/'runtime.json').write_text(json.dumps(record,indent=2)+'\n');bpy.ops.wm.save_as_mainfile(filepath=str(output/'siamese-cat.blend'));print(json.dumps(record))
