"""为原 Hunyuan 网格制作专用蒙皮、IK烘焙动作和真实表情 morph。"""
from pathlib import Path
import bpy, math, sys, json, hashlib
import numpy as np
from mathutils import Vector, Matrix, Quaternion

src,out=map(Path,sys.argv[sys.argv.index('--')+1:]);out.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True);bpy.ops.import_scene.gltf(filepath=str(src))
original=next(o for o in bpy.context.scene.objects if o.type=='MESH')
original.data.transform(original.matrix_world);original.matrix_world=Matrix.Identity(4)
import bmesh
# glTF 导入在 UV 接缝处复制顶点；先按空间焊接，UV 仍保存在每个面角。
# 封口只处理后续分件产生的真实切边，不把材质接缝误当洞。
bm=bmesh.new();bm.from_mesh(original.data)
bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.000001)
bm.to_mesh(original.data);bm.free()
mat=original.data.materials[0];image=mat.node_tree.nodes.get('Principled BSDF').inputs['Base Color'].links[0].from_node.image
pixels=np.array(image.pixels[:],dtype=np.float32).reshape(image.size[1],image.size[0],4)
colors=np.zeros((len(original.data.vertices),3))
uvlayer=original.data.uv_layers.active
for loop in original.data.loops:
    u,v=uvlayer.data[loop.index].uv
    colors[loop.vertex_index]=pixels[min(image.size[1]-1,max(0,int(v*image.size[1]))),min(image.size[0]-1,max(0,int(u*image.size[0]))),:3]

arms={'L':[(-.165,.025,1.185),(-.290,.040,1.025),(-.185,-.040,.880),(-.200,-.055,.810)],'R':[(.145,.03,1.185),(.295,.10,.990),(.230,-.110,1.170),(.230,-.140,1.240)]}
def skin(c): return c[1]>c[0]*.86 and c[1]>c[2]*.86 and c[1]>.035
def tag(v,c):
    x,y,z=v
    if z<.675:return 'leg.L' if x<0 else 'leg.R'
    if skin(c) and .79<z<1.23 and x<-.12:return 'arm.L'
    if skin(c) and .94<z<1.30 and x>.135:return 'arm.R'
    return 'body'
tags=[tag(v.co,colors[v.index]) for v in original.data.vertices]
facegroups={k:[] for k in ['body','arm.L','arm.R','leg.L','leg.R','clipboard']}
for p in original.data.polygons:
    votes=[tags[i] for i in p.vertices]
    kind=max(set(votes),key=votes.count)
    facegroups[kind].append(p)
objects=[];colorMaps={};originalCaps={}
# 分离与腰部融合的触手，保留原表面及 UV；切口封边，不移动裙腰。
for kind,polys in facegroups.items():
    if not polys:continue
    used=sorted({i for p in polys for i in p.vertices});lookup={i:n for n,i in enumerate(used)}
    mesh=bpy.data.meshes.new(kind);mesh.from_pydata([tuple(original.data.vertices[i].co) for i in used],[],[[lookup[i] for i in p.vertices] for p in polys]);mesh.update()
    uv=mesh.uv_layers.new(name='UVMap')
    for new,old in zip(mesh.polygons,polys):
        new.use_smooth=True
        for li,oldli in zip(new.loop_indices,old.loop_indices):uv.data[li].uv=uvlayer.data[oldli].uv
    obj=bpy.data.objects.new('squidward_'+kind,mesh);bpy.context.collection.objects.link(obj);mesh.materials.append(mat)
    obj['semanticPart']=kind;objects.append(obj);colorMaps[obj.name]=colors[used]
import bmesh
for obj in objects:
    bm=bmesh.new();bm.from_mesh(obj.data)
    boundary=[e for e in bm.edges if e.is_boundary]
    layer=bm.loops.layers.uv.active
    edgeUV={}
    for edge in boundary:
        for vertex in edge.verts:
            samplesUV=[loop[layer].uv.copy() for face in vertex.link_faces for loop in face.loops if loop.vert==vertex]
            if samplesUV:edgeUV[vertex]=sum(samplesUV,Vector((0,0)))/len(samplesUV)
    caps=bmesh.ops.holes_fill(bm,edges=boundary,sides=0)['faces'] if boundary else []
    for face in caps:
        face.smooth=True
        for loop in face.loops:
            if loop.vert in edgeUV:loop[layer].uv=edgeUV[loop.vert]
    originalCaps[obj.name]=len(caps)
    bm.to_mesh(obj.data);bm.free()
bpy.data.objects.remove(original,do_unlink=True)

# 原角色参考未露腿；按用户新参考把两条补全腿改为四条纤细触足。
# 复用原曲面与吸盘贴图，逐顶点塑形；不以基础几何体替代。
for obj in list(objects):
    if not obj['semanticPart'].startswith('leg.'):continue
    side=obj['semanticPart'][-1];sign=-1 if side=='L' else 1;legColors=colorMaps[obj.name].copy()
    rear=obj.copy();rear.data=obj.data.copy();bpy.context.collection.objects.link(rear)
    colorMaps[rear.name]=colorMaps[obj.name].copy();objects.append(rear)
    for part,meshObj in [('F',obj),('B',rear)]:
        meshObj.name='squidward_leg.'+side+part;meshObj['semanticPart']='leg.'+side+part
        colorMaps[meshObj.name]=legColors.copy()
        for v in meshObj.data.vertices:
            x,y,z=v.co
            flare=1-max(0,min(1,(z-.15)/.53))
            v.co.x=x*.55+sign*((.03 if part=='F' else .08)+.035*flare)
            v.co.y=y*.60+(-.08 if part=='F' else .075)
            if z<.28:v.co.z=z*.68
            else:v.co.z=.1904+(z-.28)*(.675-.1904)/(.675-.28)

segments={
 'DEF_root':((0,0,0),(0,0,.25),None),
 'DEF_pelvis':((0,-.19,.69),(0,-.15,.93),'DEF_root'),
 'DEF_spine':((0,-.15,.93),(0,-.10,1.12),'DEF_pelvis'),
 'DEF_chest':((0,-.10,1.12),(0,-.08,1.23),'DEF_spine'),
 'DEF_neck':((0,-.08,1.23),(0,-.01,1.37),'DEF_chest'),
 'DEF_head':((0,-.01,1.37),(0,.05,1.79),'DEF_neck')}
feet={}
for side,sign in [('L',-1),('R',1)]:
    a=arms[side]
    for index,name in enumerate(['upper_arm','forearm','hand']):
        parent='DEF_chest' if index==0 else f'DEF_{["upper_arm","forearm"][index-1]}.{side}'
        segments[f'DEF_{name}.{side}']=(a[index],a[index+1],parent)
    for part in ['F','B']:
        leg=side+part;offset=.03 if part=='F' else .08;depth=-.08 if part=='F' else .075
        hip=(sign*(.060*.55+offset),-.185*.60+depth,.685)
        knee=(sign*(.100*.55+offset+.021),-.29*.60+depth,.29)
        ankle=(sign*(.150*.55+offset+.035),-.405*.60+depth,.065)
        toe=(sign*(.235*.55+offset+.035),-.48*.60+depth,.037)
        segments[f'DEF_thigh.{leg}']=(hip,knee,'DEF_pelvis');segments[f'DEF_shin.{leg}']=(knee,ankle,f'DEF_thigh.{leg}');segments[f'DEF_foot.{leg}']=(ankle,toe,f'DEF_shin.{leg}')
        feet[leg]=ankle
bpy.ops.object.armature_add();rig=bpy.context.object;rig.name='squidward_rig';bpy.ops.object.mode_set(mode='EDIT');rig.data.edit_bones.remove(rig.data.edit_bones[0])
for name,(head,tail,parent) in segments.items():
    bone=rig.data.edit_bones.new(name);bone.head=head;bone.tail=tail
    if parent:bone.parent=rig.data.edit_bones[parent]
for side in ['L','R']:
    for part,head,tail in [('hand',arms[side][2],arms[side][3])]:
        bone=rig.data.edit_bones.new(f'CTRL_{part}.{side}');bone.head=head;bone.tail=tail;bone.parent=rig.data.edit_bones['DEF_root'];bone.use_deform=False
    for part,head in [('knee',(-.10 if side=='L' else .10,-1.0,.40)),('elbow',(-.65 if side=='L' else .65,-.15,1.12))]:
        bone=rig.data.edit_bones.new(f'CTRL_{part}.{side}');bone.head=head;bone.tail=Vector(head)+Vector((0,0,.1));bone.parent=rig.data.edit_bones['DEF_root'];bone.use_deform=False
for leg,ankle in feet.items():
    bone=rig.data.edit_bones.new(f'CTRL_foot.{leg}');bone.head=ankle;bone.tail=segments[f'DEF_foot.{leg}'][1];bone.parent=rig.data.edit_bones['DEF_root'];bone.use_deform=False
    bone=rig.data.edit_bones.new(f'CTRL_knee.{leg}');bone.head=(ankle[0],-1,.30);bone.tail=Vector(bone.head)+Vector((0,0,.1));bone.parent=rig.data.edit_bones['DEF_root'];bone.use_deform=False
bpy.ops.object.mode_set(mode='OBJECT')

def smooth(a,b,x):
    t=max(0,min(1,(x-a)/(b-a)));return t*t*(3-2*t)
def distance_to_segment(p,a,b):
    a,b=Vector(a),Vector(b);d=b-a;t=max(0,min(1,(p-a).dot(d)/d.length_squared));return (p-(a+d*t)).length
weightCounts={name:0 for name in segments};morphCounts={}
for obj in objects:
    kind=obj['semanticPart'];groups={name:obj.vertex_groups.new(name=name) for name in segments};cs=colorMaps[obj.name]
    for v in obj.data.vertices:
        x,y,z=v.co;side='L' if x<0 else 'R'
        if kind=='clipboard':weights={'DEF_hand.R':1}
        elif kind.startswith('arm.'):
            side=kind[-1];a=arms[side]
            names=[f'DEF_{p}.{side}' for p in ['upper_arm','forearm','hand']]
            ds=[distance_to_segment(v.co,a[i],a[i+1]) for i in range(3)]
            raw=[math.exp(-d*d/.0018) for d in ds];total=sum(raw);weights={n:w/total for n,w in zip(names,raw)}
            if side=='R' and z>1.10:
                hand=smooth(1.10,1.16,z)
                weights={n:w*(1-hand) for n,w in weights.items()};weights['DEF_hand.R']=weights.get('DEF_hand.R',0)+hand
            blend=1-smooth(.025,.075,(v.co-Vector(a[0])).length)
            weights={n:w*(1-blend) for n,w in weights.items()};weights['DEF_chest']=blend
        elif kind.startswith('leg.'):
            side=kind.split('.')[1]
            foot=1-smooth(.105,.18,z);thigh=smooth(.27,.42,z);pelvis=smooth(.59,.70,z)
            weights={f'DEF_foot.{side}':foot*(1-pelvis),f'DEF_shin.{side}':max(0,1-foot-thigh)*(1-pelvis),f'DEF_thigh.{side}':thigh*(1-pelvis),'DEF_pelvis':pelvis}
        elif z<.75:weights={'DEF_pelvis':1}
        elif z>1.27 or (z>1.02 and abs(x)>.22):
            head=smooth(1.22,1.38,z)
            if abs(x)>.22:head=smooth(1.00,1.07,z)
            weights={'DEF_head':head,'DEF_neck':1-head}
        elif z>1.13:weights={'DEF_chest':1-smooth(1.19,1.27,z),'DEF_neck':smooth(1.19,1.27,z)}
        elif z>.95:weights={'DEF_spine':1-smooth(1.05,1.15,z),'DEF_chest':smooth(1.05,1.15,z)}
        else:weights={'DEF_pelvis':1-smooth(.85,1.0,z),'DEF_spine':smooth(.85,1.0,z)}
        if kind=='body':
            for armSide,sign in [('L',-1),('R',1)]:
                low,high=(.79,1.235) if sign<0 else (.94,1.415)
                a=arms[armSide]
                distance=min(distance_to_segment(v.co,a[i],a[i+1]) for i in range(3))
                zone=smooth(.10,.17,x*sign)*(1-smooth(.055,.12,distance))*smooth(low,low+.035,z)*(1-smooth(high-.025,high,z))
                if sign>0:
                    board=smooth(.075,.12,x)*(1-smooth(.34,.39,x))*(1-smooth(-.095,-.065,y))*smooth(.99,1.08,z)*(1-smooth(1.38,1.42,z))
                    zone=max(zone,board)
                zone=board if sign>0 else 0
                if zone>0:
                    a=arms[armSide];names=[f'DEF_{p}.{armSide}' for p in ['upper_arm','forearm','hand']]
                    ds=[distance_to_segment(v.co,a[i],a[i+1]) for i in range(3)]
                    raw=[math.exp(-d*d/.0018) for d in ds];norm=sum(raw)
                    armWeights={n:w/norm for n,w in zip(names,raw)}
                    # 夹板、持握的右手与相邻腕部共用刚性骨，避免板面开裂。
                    if sign>0 and z>1.10:
                        hand=smooth(1.10,1.16,z)
                        armWeights={n:w*(1-hand) for n,w in armWeights.items()}
                        armWeights['DEF_hand.R']=armWeights.get('DEF_hand.R',0)+hand
                    weights={n:w*(1-zone) for n,w in weights.items()}
                    for n,w in armWeights.items():weights[n]=weights.get(n,0)+w*zone
        # GLB 四权重预算，归一化后保留最大四项。
        weights=dict(sorted(weights.items(),key=lambda item:item[1],reverse=True)[:4])
        total=sum(weights.values())
        for name,w in weights.items():
            if w>1e-7:groups[name].add([v.index],w/total,'REPLACE');weightCounts[name]+=1
    obj.parent=rig;modifier=obj.modifiers.new('semantic skin','ARMATURE');modifier.object=rig
    obj.shape_key_add(name='Basis')
    for name in ['blink','lookLeft','lookRight','lookDown','bored','angry','happy','surprised','sad','mouthOpen']:
        key=obj.shape_key_add(name=name);changed=0
        for v in obj.data.vertices:
            x,y,z=v.co;c=cs[v.index];delta=Vector((0,0,0))
            eye=(abs((x+.025)/.205)<1 and 1.545<z<1.745 and -.11<y<.085)
            pupil=eye and -.16<x<.14 and 1.59<z<1.71 and y<.04 and c[0]>c[1]*1.5 and c[0]>c[2]*1.3 and c[1]<.23
            eyeFall=max(0,1-abs((x+.025)/.22)**4)*smooth(-.14,-.085,y)*(1-smooth(.05,.10,y))
            jaw=math.exp(-((x-.025)/.22)**4)*smooth(1.365,1.40,z)*(1-smooth(1.46,1.505,z))*smooth(-.41,-.34,y)*(1-smooth(-.14,-.09,y))
            if name=='blink' and eye:delta.z=-(z-1.555)*.94*eyeFall
            if name=='bored' and eye:delta.z=-.036*smooth(1.62,1.73,z)*eyeFall
            if name=='angry' and eye:delta.z=-.036*smooth(1.60,1.72,z)*eyeFall*(1-.8*abs(x)/.23)
            if name=='surprised' and eye:delta.z=(z-1.625)*.42*eyeFall
            if name=='sad' and eye:delta.z=.018*eyeFall*(-x if x<0 else x)/.15
            if pupil and name in ['lookLeft','lookRight']:delta.x=(-1 if name=='lookLeft' else 1)*.022
            if pupil and name=='lookDown':delta.z=-.019
            if name=='happy':delta.z=jaw*(-.046+.16*abs(x))
            if name=='angry':delta.z-=jaw*.025*min(1,abs(x)/.16)
            if name=='sad':delta.z-=jaw*.035*min(1,abs(x)/.16)
            if name=='mouthOpen':delta.z-=jaw*.055
            key.data[v.index].co+=delta
            if delta.length>1e-6:changed+=1
        morphCounts[obj.name+':'+name]=changed

constraints=[]
for side in feet:
    for part,eff,pole in [('foot','shin','knee')]:
        ik=rig.pose.bones[f'DEF_{eff}.{side}'].constraints.new('IK');ik.target=rig;ik.subtarget=f'CTRL_{part}.{side}';ik.chain_count=2;ik.use_stretch=False
        ik.pole_target=rig;ik.pole_subtarget=f'CTRL_{pole}.{side}';ik.pole_angle=-math.pi/2
        copy=rig.pose.bones[f'DEF_{part}.{side}'].constraints.new('COPY_ROTATION');copy.target=rig;copy.subtarget=f'CTRL_{part}.{side}';copy.target_space='WORLD';copy.owner_space='WORLD'
        constraints.append((part,side,ik,copy))
for p in rig.pose.bones:p.rotation_mode='XYZ'

def control(name,delta,axis=None,angle=0):
    p=rig.pose.bones[name];rotation=p.bone.matrix_local.to_3x3();p.location=rotation.inverted()@Vector(delta)
    if axis:
        rest=rotation.to_quaternion();q=rest.inverted()@Quaternion(Vector(axis),angle)@rest;p.rotation_mode='QUATERNION';p.rotation_quaternion=q

clips={'idle':2.8,'walk':1.4,'wave':2.4,'read':3.0,'annoyed':2.4,'happy':2.4,'surprised':1.9,'sad':2.6}
samples={};scene=bpy.context.scene;scene.render.fps=30
for clip,duration in clips.items():
    frames=round(duration*30);framesets=[]
    for frame in range(frames+1):
        t=frame/30;phase=2*math.pi*t/duration;env=math.sin(math.pi*t/duration)**2
        for p in rig.pose.bones:p.location=(0,0,0);p.rotation_mode='XYZ';p.rotation_euler=(0,0,0);p.scale=(1,1,1)
        for part,side,ik,copy in constraints:
            ik.influence=copy.influence=1 if part=='foot' and clip=='walk' else 0
        rig.pose.bones['DEF_chest'].rotation_euler.z=math.sin(phase)*.008
        rig.pose.bones['DEF_head'].rotation_euler.x=math.sin(phase)*.013
        if clip=='walk':
            rig.pose.bones['DEF_pelvis'].location.y=-.060+.008*math.cos(phase*2)
            for side,offset in [('LF',0),('LB',0),('RF',.5),('RB',.5)]:
                cycle=(t/duration+offset)%1
                if cycle<.5:
                    f=cycle*2;forward=.16*(.5-f);lift=.11*math.sin(math.pi*f)
                else:
                    f=(cycle-.5)*2;forward=.16*(f-.5);lift=0
                control(f'CTRL_foot.{side}',(0,forward,lift))
                rig.pose.bones[f'DEF_upper_arm.{side[0]}'].rotation_euler.x=math.sin(phase+(math.pi if side[0]=='L' else 0))*.075
        if clip=='wave':
            control('DEF_upper_arm.L',(0,0,0),(0,1,0),.70*env)
            control('DEF_forearm.L',(0,0,0),(0,1,0),-env*(2.0+.12*math.sin(t*10)))
        if clip=='read':
            rig.pose.bones['DEF_upper_arm.R'].rotation_euler.x=-.12*env
            rig.pose.bones['DEF_forearm.R'].rotation_euler.x=.14*env
            rig.pose.bones['DEF_head'].rotation_euler.x=.14*env
        if clip=='annoyed':
            rig.pose.bones['DEF_forearm.L'].rotation_euler.x=.26*env
            rig.pose.bones['DEF_forearm.R'].rotation_euler.x=-.08*env
            rig.pose.bones['DEF_head'].rotation_euler.y=.13*env*math.sin(t*5)
        if clip=='happy':
            rig.pose.bones['DEF_forearm.L'].rotation_euler.x=.35*env
            rig.pose.bones['DEF_upper_arm.L'].rotation_euler.z=.12*env
            rig.pose.bones['DEF_head'].rotation_euler.z=.06*env*math.sin(t*5)
        if clip=='surprised':
            rig.pose.bones['DEF_forearm.L'].rotation_euler.x=.31*env
            rig.pose.bones['DEF_upper_arm.R'].rotation_euler.x=.07*env
            rig.pose.bones['DEF_head'].rotation_euler.x=-.07*env
        if clip=='sad':
            rig.pose.bones['DEF_head'].rotation_euler.x=.17*env;rig.pose.bones['DEF_forearm.L'].rotation_euler.x=-.10*env
        bpy.context.view_layer.update();evaluated=rig.evaluated_get(bpy.context.evaluated_depsgraph_get())
        framesets.append({name:evaluated.pose.bones[name].matrix.copy() for name in segments})
    samples[clip]=framesets

# 约束只在制作时使用；逐帧烘焙为真实 FK 数据，浏览器无 Blender 依赖。
for p in rig.pose.bones:
    for c in list(p.constraints):p.constraints.remove(c)
rig.animation_data_create()
for clip,framesets in samples.items():
    action=bpy.data.actions.new(clip);rig.animation_data.action=action
    for frame,poses in enumerate(framesets):
        for name in segments:
            p=rig.pose.bones[name];parent=p.parent
            basis=p.bone.convert_local_to_pose(poses[name],p.bone.matrix_local,parent_matrix=poses[parent.name] if parent else Matrix.Identity(4),parent_matrix_local=parent.bone.matrix_local if parent else Matrix.Identity(4),invert=True)
            loc,rot,scale=basis.decompose();p.location=loc;p.rotation_mode='QUATERNION';p.rotation_quaternion=rot;p.scale=scale
            for prop in ['location','rotation_quaternion','scale']:p.keyframe_insert(data_path=prop,frame=frame)
    action.use_fake_user=True
rig.animation_data.action=None
for p in rig.pose.bones:p.location=(0,0,0);p.rotation_quaternion=(1,0,0,0);p.scale=(1,1,1)
for image in bpy.data.images:
    if image.type=='IMAGE' and max(image.size)>1024:
        ratio=1024/max(image.size);image.scale(round(image.size[0]*ratio),round(image.size[1]*ratio))
path=out/'squidward-bunny-animated.glb'
bpy.ops.object.select_all(action='DESELECT');rig.select_set(True)
for obj in objects:obj.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(path),export_format='GLB',use_selection=True,export_yup=True,export_extras=True,export_animations=True,export_animation_mode='ACTIONS',export_morph=True,export_def_bones=True,export_force_sampling=True)
bpy.ops.wm.save_as_mainfile(filepath=str(out/'squidward-animated.blend'))
report={'status':'review','humanReview':'pending','sourceSHA256':hashlib.sha256(src.read_bytes()).hexdigest(),'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'bones':len(segments),'fps':30,'clips':clips,'morphs':list(objects[0].data.shape_keys.key_blocks.keys())[1:],'morphVertices':morphCounts,'weights':weightCounts,'triangles':sum(sum(len(p.vertices)-2 for p in obj.data.polygons) for obj in objects),'meshBackend':'原 Hunyuan3D-2.1 网格保留','rigBackend':'Blender 分件蒙皮、足部 IK 与手臂 FK 烘焙','repairs':['触手与融合的裙腰分离，按真实关节位置蒙皮；封闭切口','夹板与持握手同骨','按新参考塑形四条细长触足、紫色吸盘朝外，24 骨蒙皮','原脸部 blink / gaze / mood / jaw morph；未添加口腔补片'],'rootMotion':False,'walkDistancePerCycleAtHeight062':.32*(.62/1.9862113)}
(out/'animation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'clips':list(clips),'bones':len(segments),'triangles':report['triangles']},ensure_ascii=False),flush=True)
