"""保留 Hunyuan 网格与贴图；为方形身体制作对称骨架与动作。"""
from pathlib import Path
import bpy, bmesh, math, json, hashlib, sys
from mathutils import Vector

source,output=map(Path,sys.argv[sys.argv.index('--')+1:]);output.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True);bpy.ops.import_scene.gltf(filepath=str(source))
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
for o in meshes:
    matrix=o.matrix_world.copy();o.parent=None;o.matrix_world=matrix
    bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
    bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
points=[v.co.copy() for o in meshes for v in o.data.vertices]
lo=Vector([min(v[i] for v in points) for i in range(3)]);hi=Vector([max(v[i] for v in points) for i in range(3)])
factor=1.25/(hi.z-lo.z);center=Vector(((lo.x+hi.x)/2,(lo.y+hi.y)/2,lo.z))
for o in meshes:
    for v in o.data.vertices:v.co=(v.co-center)*factor
points=[v.co.copy() for o in meshes for v in o.data.vertices];height=1.25
# 生成网格有轻微三分之四透视；以无手臂的身体顶部确定身体边界，
# 不能用含手臂的全身宽度推断胸部，否则身体侧面会混入手臂权重。
torso=[v for v in points if v.z>height*.86]
left=min(v.x for v in torso);right=max(v.x for v in torso);body_center=(left+right)/2
for o in meshes:
    for v in o.data.vertices:v.co.x-=body_center
points=[v.co.copy() for o in meshes for v in o.data.vertices];width=max(v.x for v in points)-min(v.x for v in points)
body_half=(right-left)/2+.022
# 原 Shape 丢失了被透视遮住的一只手臂。以完整一侧的 GPU 曲面作
# 对称修复，复制原 UV；不以球体/方块替代缺失肢体。
for o in meshes:
    bm=bmesh.new();bm.from_mesh(o.data)
    bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),dist=.00001,plane_co=Vector((0,0,0)),plane_no=Vector((1,0,0)),clear_outer=True,clear_inner=False)
    bm.to_mesh(o.data);bm.free()
    bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
    mirror=o.modifiers.new('repair missing limb from GPU surface','MIRROR');mirror.use_axis[0]=True;mirror.use_clip=True;mirror.use_mirror_merge=True;mirror.merge_threshold=.0001
    bpy.ops.object.modifier_apply(modifier=mirror.name)
    triangles=sum(len(f.vertices)-2 for f in o.data.polygons)
    if triangles>29000:
        decimate=o.modifiers.new('mobile budget','DECIMATE');decimate.ratio=29000/triangles;bpy.ops.object.modifier_apply(modifier=decimate.name)
points=[v.co.copy() for o in meshes for v in o.data.vertices];width=max(v.x for v in points)-min(v.x for v in points)
bpy.ops.object.armature_add();rig=bpy.context.object;rig.name='spongebob_rig'
bpy.ops.object.mode_set(mode='EDIT');rig.data.edit_bones.remove(rig.data.edit_bones[0])
segments={
    'comp_root':((0,0,.30),(0,0,.75),None),
    'comp_head':((0,0,.75),(0,0,1.15),'comp_root')
}
for side,sign in [('l',1),('r',-1)]:
    shoulder=(sign*body_half,-.08,height*.52);elbow=(sign*(body_half+.07),0,height*.64);wrist=(sign*(body_half+.18),0,height*.73)
    hip=(sign*width*.125,0,height*.28);knee=(sign*width*.125,0,height*.16);ankle=(sign*width*.125,0,height*.06)
    segments.update({f'comp_arm_{side}':(shoulder,elbow,'comp_root'),f'comp_forearm_{side}':(elbow,wrist,f'comp_arm_{side}'),f'comp_hand_{side}':(wrist,(wrist[0]+sign*.06,0,wrist[2]+.025),f'comp_forearm_{side}'),f'comp_leg_{side}':(hip,knee,'comp_root'),f'comp_shin_{side}':(knee,ankle,f'comp_leg_{side}'),f'comp_foot_{side}':(ankle,(ankle[0],-.09,.03),f'comp_shin_{side}')})
for name,(head,tail,parent) in segments.items():
    b=rig.data.edit_bones.new(name);b.head=head;b.tail=tail
    if parent:b.parent=rig.data.edit_bones[parent]
bpy.ops.object.mode_set(mode='OBJECT')

def smooth(a,b,v):
    t=max(0,min(1,(v-a)/(b-a)));return t*t*(3-2*t)
counts={name:0 for name in segments}
for o in meshes:
    groups={name:o.vertex_groups.new(name=name) for name in segments}
    for v in o.data.vertices:
        x,y,z=v.co;side='l' if x>=0 else 'r';weights={'comp_root':1}
        if z<height*.30:
            foot=1-smooth(height*.055,height*.095,z);upper=smooth(height*.15,height*.23,z)
            weights={f'comp_leg_{side}':upper,f'comp_shin_{side}':max(0,1-foot-upper),f'comp_foot_{side}':foot}
        elif abs(x)>body_half and height*.42<z<height*.84:
            reach=max(0,min(1,(abs(x)-body_half)/.18))
            hand=smooth(.75,.96,reach);lower=smooth(.26,.63,reach)*(1-hand);upper=1-lower-hand
            boundary=smooth(body_half,body_half+.035,abs(x))
            weights={'comp_root':1-boundary,f'comp_arm_{side}':upper*boundary,f'comp_forearm_{side}':lower*boundary,f'comp_hand_{side}':hand*boundary}
        # 主体与全部五官保持刚性，不把方形身体当作人类胸颈挤压。
        for name,w in weights.items():
            if w>1e-6:groups[name].add([v.index],w,'REPLACE');counts[name]+=1
    o.parent=rig;modifier=o.modifiers.new('character skin','ARMATURE');modifier.object=rig
    o['sourceBackend']='Hunyuan3D-2.1 + Hunyuan3D Paint';o['humanReview']='pending'
    basis=o.shape_key_add(name='Basis');talk=o.shape_key_add(name='talk')
    for i,v in enumerate(o.data.vertices):
        x,y,z=v.co;strength=(1-smooth(width*.10,width*.18,abs(x)))*smooth(height*.54,height*.56,z)*(1-smooth(height*.61,height*.64,z))*(1-smooth(-.04,.005,y))
        talk.data[i].co.z-=.008*strength
    for mat in o.data.materials:
        if mat and mat.use_nodes:
            shader=mat.node_tree.nodes.get('Principled BSDF')
            if shader:shader.inputs['Roughness'].default_value=.85;shader.inputs['Metallic'].default_value=0

# 对称的身体语义骨架；所有基础活动烘焙成 GLB 独立片段。
clips=['idle','walk','wave','read','sit','lie','wash','bubble','wake','pet','tidy']
rig.animation_data_create();scene=bpy.context.scene;scene.render.fps=30
for name in clips:
    action=bpy.data.actions.new(name);rig.animation_data.action=action
    for frame in range(0,61,5):
        t=frame/30;phase=t*math.pi*2
        for p in rig.pose.bones:p.rotation_mode='XYZ';p.rotation_euler=(0,0,0)
        # 参考是张开手臂；默认轻度放低，而不旋转身体或面部。
        for side,sign in [('l',1),('r',-1)]:
            rig.pose.bones[f'comp_arm_{side}'].rotation_euler[0]=sign*.22
        if name=='walk':
            for side,sign in [('l',1),('r',-1)]:rig.pose.bones[f'comp_leg_{side}'].rotation_euler[0]=sign*math.sin(phase)*.28
        if name=='wave':rig.pose.bones['comp_arm_r'].rotation_euler[0]=-.08;rig.pose.bones['comp_forearm_r'].rotation_euler[1]=math.sin(phase*2)*.20
        if name in ['read','wash','bubble','pet','tidy']:
            for side,sign in [('l',1),('r',-1)]:
                rig.pose.bones[f'comp_arm_{side}'].rotation_euler[0]=sign*.18
                rig.pose.bones[f'comp_forearm_{side}'].rotation_euler[1]=sign*(.45+math.sin(phase)*.045)
        if name=='sit':
            for side in ['l','r']:rig.pose.bones[f'comp_leg_{side}'].rotation_euler[0]=-.45;rig.pose.bones[f'comp_shin_{side}'].rotation_euler[0]=.42
        if name=='wake':
            for side,sign in [('l',1),('r',-1)]:rig.pose.bones[f'comp_arm_{side}'].rotation_euler[0]=sign*(.15+math.sin(phase)*.1)
        for p in rig.pose.bones:p.keyframe_insert(data_path='rotation_euler',frame=frame)
    action.use_fake_user=True
rig.animation_data.action=None
for p in rig.pose.bones:p.rotation_euler=(0,0,0)
for image in bpy.data.images:
    if image.type=='IMAGE' and max(image.size)>1024:
        r=1024/max(image.size);image.scale(int(image.size[0]*r),int(image.size[1]*r))
bpy.ops.object.select_all(action='DESELECT');rig.select_set(True)
for o in meshes:o.select_set(True)
path=output/'spongebob.glb'
bpy.ops.export_scene.gltf(filepath=str(path),export_format='GLB',export_yup=True,use_selection=True,export_extras=True,export_animations=True,export_animation_mode='ACTIONS',export_morph=True)
bpy.ops.wm.save_as_mainfile(filepath=str(output/'spongebob.blend'))
record={'status':'review','humanReview':'pending','jobId':'a41edcc3ac8044cc9492d6b5742f2866','sourceMeshSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'runtimeSHA256':hashlib.sha256(path.read_bytes()).hexdigest(),'meshBackend':'Hunyuan3D-2.1','textureBackend':'Hunyuan3D Paint 2.1','rigBackend':'Blender character-specific symmetric skeleton; UniRig candidate rejected by structural QC','bones':len(segments),'triangles':sum(sum(len(f.vertices)-2 for f in o.data.polygons) for o in meshes),'dimensionsYUp':[width,height,max(v.y for v in points)-min(v.y for v in points)],'clips':clips,'weights':counts,'repairs':['mirror complete GPU mesh half to restore missing arm; preserve source UV','mobile triangle reduction','body stays rigid; symmetric limbs skin independently'],'sleep':'engine places lie clip on calibrated bed surface','mouth':'small lower-mouth morph; no cloned voice'}
(output/'runtime.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n');print(json.dumps(record))
