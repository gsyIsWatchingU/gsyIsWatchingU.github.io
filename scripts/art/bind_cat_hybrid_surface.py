"""重拓扑身体，保留 GPU 原始头部曲面、UV 和贴图，再绑定同一四足骨架。"""
import bpy,bmesh,json,sys,math
from pathlib import Path
from mathutils import Vector
source,skeleton_path,output=map(Path,sys.argv[sys.argv.index('--')+1:])
bpy.ops.wm.read_factory_settings(use_empty=True);bpy.ops.import_scene.gltf(filepath=str(source))
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH' and o.name=='siamese_cat']
if len(meshes)!=1:raise RuntimeError('应只处理猫咪主体，排除 glTF 导入器的骨骼显示网格')
for o in meshes:
 world=o.matrix_world.copy();o.parent=None;o.matrix_world=world
 for mod in list(o.modifiers):o.modifiers.remove(mod)
 o.vertex_groups.clear()
 bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
 bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
for o in list(bpy.context.scene.objects):
 if o.type=='ARMATURE':bpy.data.objects.remove(o,do_unlink=True)
# 以原 GPU 曲面作高模，体素重建封闭的关节拓扑；原纹理烘焙到新 UV。
source_meshes=meshes;meshes=[]
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=8
scene.render.bake.use_pass_direct=False;scene.render.bake.use_pass_indirect=False;scene.render.bake.use_pass_color=True;scene.render.bake.margin=12
for high in source_meshes:
 low=high.copy();low.data=high.data.copy();bpy.context.collection.objects.link(low);low.name='siamese_cat'
 bpy.ops.object.select_all(action='DESELECT');low.select_set(True);bpy.context.view_layer.objects.active=low
 bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
 print('retopology before',len(low.data.vertices),len(low.data.polygons),list(low.dimensions),flush=True)
 original=low.data.copy();low.data.remesh_voxel_size=.005;bpy.ops.object.voxel_remesh()
 if not low.data.polygons:
  low.data=original;remesh=low.modifiers.new('closed joint topology','REMESH');remesh.mode='SMOOTH';remesh.octree_depth=8;remesh.use_remove_disconnected=False;remesh.use_smooth_shade=True;bpy.ops.object.modifier_apply(modifier=remesh.name)
 print('retopology after',len(low.data.vertices),len(low.data.polygons),flush=True)
 smooth=low.modifiers.new('joint surface relaxation','SMOOTH');smooth.factor=.35;smooth.iterations=3;bpy.ops.object.modifier_apply(modifier=smooth.name)
 triangles=sum(len(p.vertices)-2 for p in low.data.polygons)
 if triangles>29000:
  dec=low.modifiers.new('web budget','DECIMATE');dec.ratio=29000/triangles;bpy.ops.object.modifier_apply(modifier=dec.name)
 bm=bmesh.new();bm.from_mesh(low.data);remaining=set(bm.verts);components=[]
 while remaining:
  seed=remaining.pop();group={seed};stack=[seed]
  while stack:
   vert=stack.pop()
   for edge in vert.link_edges:
    other=edge.other_vert(vert)
    if other in remaining:remaining.remove(other);group.add(other);stack.append(other)
  components.append(group)
 largest=max(map(len,components));debris=[v for group in components if len(group)<max(60,largest*.01) for v in group]
 print('retopology components',list(map(len,components)),'debris',len(debris),flush=True)
 if debris:bmesh.ops.delete(bm,geom=debris,context='VERTS')
 bm.to_mesh(low.data);bm.free()
 bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT');bpy.ops.uv.smart_project(angle_limit=1.1519,island_margin=.015);bpy.ops.object.mode_set(mode='OBJECT')
 image=bpy.data.images.new('cat_retopology_basecolor',width=1024,height=1024,alpha=False)
 material=bpy.data.materials.new('cat_retopology_material');material.use_nodes=True;texture=material.node_tree.nodes.new('ShaderNodeTexImage');texture.image=image;material.node_tree.nodes.active=texture
 low.data.materials.clear();low.data.materials.append(material)
 bpy.ops.object.select_all(action='DESELECT');high.select_set(True);low.select_set(True);bpy.context.view_layer.objects.active=low
 bpy.ops.object.bake(type='DIFFUSE',use_selected_to_active=True,cage_extrusion=.025,max_ray_distance=.08)
 material.node_tree.links.new(texture.outputs['Color'],material.node_tree.nodes.get('Principled BSDF').inputs['Base Color']);material.node_tree.nodes.get('Principled BSDF').inputs['Roughness'].default_value=.9
 image.pack()
 for p in low.data.polygons:p.use_smooth=True
 meshes.append(low)
data=json.loads(skeleton_path.read_text());joints=data if isinstance(data,list) else data['joints'];lookup={j['name']:j for j in joints}
def point(p):return Vector((p[0],-p[2],p[1]))
arm=bpy.data.armatures.new('cat_rest_heat_rig');rig=bpy.data.objects.new('cat_rest_heat_rig',arm);bpy.context.collection.objects.link(rig)
bpy.ops.object.select_all(action='DESELECT');rig.select_set(True);bpy.context.view_layer.objects.active=rig;bpy.ops.object.mode_set(mode='EDIT')
for i,j in enumerate(joints):
 b=arm.edit_bones.new(j['name']);b.head=point(j['position']);b.use_deform=j['name'].startswith('DEF_')
 radius=.10 if any(k in j['name'] for k in ['pelvis','spine','chest']) else .16 if j['name']=='DEF_head' else .055 if 'neck' in j['name'] else .045 if 'upper' in j['name'] or 'scapula' in j['name'] else .030
 b.head_radius=radius;b.tail_radius=radius*.85;b.envelope_distance=.045
 children=[k for k in joints if k['parent']==i]
 if children:b.tail=point(children[0]['position'])
 elif j['name']=='DEF_head':b.tail=b.head+Vector((0,-.065,.12))
 elif 'toe' in j['name']:b.tail=b.head+Vector((0,-.030,-.006))
 else:b.tail=b.head+Vector((0,-.030,0))
 if (b.tail-b.head).length<.008:b.tail=b.head+Vector((0,0,.012))
for i,j in enumerate(joints):
 if j['parent']>=0:arm.edit_bones[j['name']].parent=arm.edit_bones[joints[j['parent']]['name']]
bpy.ops.object.mode_set(mode='OBJECT');bpy.ops.object.select_all(action='DESELECT')
for o in meshes:o.select_set(True)
rig.select_set(True);bpy.context.view_layer.objects.active=rig;bpy.ops.object.parent_set(type='ARMATURE_AUTO')
method='ARMATURE_AUTO bone heat'
unbound=sum(not v.groups or sum(g.weight for g in v.groups)<.00001 for o in meshes for v in o.data.vertices)
print('bone heat unbound',unbound,flush=True)
if unbound:raise RuntimeError('骨热绑定失败，不能进入下一阶段')
# 头部保留源 GPU 网格；身体单独使用闭合代理拓扑。
heads=[]
for high in source_meshes:
 head=high.copy();head.data=high.data.copy();bpy.context.collection.objects.link(head);head.name='siamese_cat_head'
 bm=bmesh.new();bm.from_mesh(head.data);result=bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),plane_co=Vector((0,0,.54)),plane_no=Vector((0,-.55,1)),clear_inner=True,clear_outer=False)
 bm.to_mesh(head.data);bm.free();head.data.update();heads.append(head)
for o in source_meshes:bpy.data.objects.remove(o,do_unlink=True)
records=[]
separated=0;sole_bound=0
for o in meshes:
 for v in o.data.vertices:
  p=o.matrix_world@v.co;field={o.vertex_groups[g.group].name:g.weight for g in v.groups if g.weight>.00001}
  for family,parent in [('front','DEF_chest'),('back','DEF_pelvis')]:
   left=[n for n in field if n.startswith('DEF_'+family+'_l_')];right=[n for n in field if n.startswith('DEF_'+family+'_r_')];a=sum(field[n] for n in left);b=sum(field[n] for n in right);shared=min(a,b)
   if shared>.002:
    for n in left:field[n]*=(a-shared)/a
    for n in right:field[n]*=(b-shared)/b
    field[parent]=field.get(parent,0)+shared*2;separated+=1
  # 在关节处先合并同一躯干组织的冗余骨，再限制四权重，防止第五权重切换成另一条腿。
  fore=sum(w for n,w in field.items() if n.startswith('DEF_front_'));hind=sum(w for n,w in field.items() if n.startswith('DEF_back_'))
  torso=['DEF_pelvis','DEF_spine_01','DEF_spine_02','DEF_spine_03','DEF_spine_04','DEF_chest']
  if max(fore,hind)>.02:
   parent='DEF_chest' if fore>=hind else 'DEF_pelvis';total_torso=sum(field.get(n,0) for n in torso)
   for n in torso:field.pop(n,None)
   field[parent]=total_torso
  left=field.get('DEF_scapula_l',0);right=field.get('DEF_scapula_r',0);shared=min(left,right)
  if shared>.001:field['DEF_scapula_l']=left-shared;field['DEF_scapula_r']=right-shared;field['DEF_chest']=field.get('DEF_chest',0)+shared*2
  if p.z>.075:
   blend=max(0,min(1,(p.z-.075)/.090));blend=blend*blend*(3-2*blend)
   for n in list(field):
    if n.startswith(('DEF_front_','DEF_back_')) and n.endswith(('_paw','_toe')):
     parent=n.rsplit('_',1)[0]+'_lower';mass=field[n]*blend;field[n]-=mass;field[parent]=field.get(parent,0)+mass
  if p.z<.075:
   paws=[j for j in joints if j['name'].endswith('_paw')];paw=min(paws,key=lambda j:(point(j['position'])-p).length_squared);name=paw['name'];toe=name[:-3]+'toe';sole={n:field.get(n,0) for n in [name,toe]};mass=sum(sole.values());t=max(0,min(1,(p.z-.022)/.053));t=t*t*(3-2*t)
   moved=sum(field[n]*(1-t) for n in field if n not in sole)
   for n in field:
    if n not in sole:field[n]*=t
   if mass>.001:
    for n in sole:field[n]=field.get(n,0)+moved*sole[n]/mass
   else:field[name]=field.get(name,0)+moved
   sole_bound+=1
  height=max(0,min(1,(p.z-.09)/.12));height=height*height*(3-2*height);side=max(0,min(1,(abs(p.x)-.035)/.065));side=side*side*(3-2*side);cap=max(0,min(1,(p.z-.23)/.09));cap=cap*cap*(3-2*cap);protect=max(height*(1-side),cap)
  for family,parent in [('front','DEF_chest'),('back','DEF_pelvis')]:
   moved=0
   for n in field:
    if n.startswith('DEF_'+family+'_'):mass=field[n]*protect;field[n]-=mass;moved+=mass
   field[parent]=field.get(parent,0)+moved
  weights=sorted(field.items(),key=lambda x:x[1],reverse=True)[:4];total=sum(w for _,w in weights)
  if total<.00001:raise RuntimeError('骨热绑定有未绑定顶点')
  for group_id in [int(g.group) for g in v.groups]:o.vertex_groups[group_id].remove([v.index])
  for name,w in weights:o.vertex_groups[name].add([v.index],w/total,'REPLACE')
  records.append({'position':[p.x,p.z,-p.y],'weights':[[n,w/total] for n,w in weights]})
print('opposite limb tissue separation',separated,'sole bindings',sole_bound,flush=True)
for o in meshes:
 neighbors=[set() for _ in o.data.vertices]
 for edge in o.data.edges:
  a,b=edge.vertices;neighbors[a].add(b);neighbors[b].add(a)
 fields=[{o.vertex_groups[g.group].name:g.weight for g in v.groups} for v in o.data.vertices]
 for _ in range(16):
  next_fields=[]
  for i,v in enumerate(o.data.vertices):
   old=fields[i]
   if (o.matrix_world@v.co).z<.03 or max(old.values())>.985 or not neighbors[i]:next_fields.append(old);continue
   field={n:w*.65 for n,w in old.items()}
   for j in neighbors[i]:
    for n,w in fields[j].items():field[n]=field.get(n,0)+w*.35/len(neighbors[i])
   for family,parent in [('front','DEF_chest'),('back','DEF_pelvis')]:
    left=[n for n in field if n.startswith('DEF_'+family+'_l_')];right=[n for n in field if n.startswith('DEF_'+family+'_r_')];a=sum(field[n] for n in left);b=sum(field[n] for n in right);shared=min(a,b)
    if shared>0:
     for n in left:field[n]*=(a-shared)/a
     for n in right:field[n]*=(b-shared)/b
     field[parent]=field.get(parent,0)+shared*2
   fore=sum(w for n,w in field.items() if n.startswith('DEF_front_'));hind=sum(w for n,w in field.items() if n.startswith('DEF_back_'))
   if max(fore,hind)>.02:
    parent='DEF_chest' if fore>=hind else 'DEF_pelvis';mass=sum(field.get(n,0) for n in torso)
    for n in torso:field.pop(n,None)
    field[parent]=mass
   for n in list(field):
    if n.endswith('_toe'):parent=n[:-3]+'paw';field[parent]=field.get(parent,0)+field.pop(n)
   values=sorted(field.items(),key=lambda row:row[1],reverse=True)[:4];mass=sum(w for _,w in values);next_fields.append({n:w/mass for n,w in values})
  fields=next_fields
 for i,v in enumerate(o.data.vertices):
  p=o.matrix_world@v.co;field=fields[i];body=sum(field.get(n,0) for n in torso+['DEF_scapula_l','DEF_scapula_r'])
  def ease(a,b,value):
   t=max(0,min(1,(value-a)/(b-a)));return t*t*(3-2*t)
  protect=max((1-ease(.035,.105,abs(p.x)))*ease(.09,.21,p.z),ease(.23,.32,p.z))
  for family,parent in [('front','DEF_chest'),('back','DEF_pelvis')]:
   moved=0
   for n in list(field):
    if n.startswith('DEF_'+family+'_'):mass=field[n]*protect;field[n]-=mass;moved+=mass
   field[parent]=field.get(parent,0)+moved
  values=sorted(field.items(),key=lambda row:row[1],reverse=True)[:4];mass=sum(w for _,w in values);field={n:w/mass for n,w in values}
  for group_id in [int(g.group) for g in v.groups]:o.vertex_groups[group_id].remove([i])
  for n,w in field.items():o.vertex_groups[n].add([i],w,'REPLACE')
# 两部分在颈根保留窄重叠区；同一解析权重使接缝一起运动。
def neck_field(p):
 value=p.z-.55*p.y;u=max(0,min(1,(value-.49)/.080));u=u*u*(3-2*u)
 return {'DEF_neck':1-u,'DEF_head':u}
for o in meshes:
 bm=bmesh.new();bm.from_mesh(o.data);bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),plane_co=Vector((0,0,.54)),plane_no=Vector((0,-.55,1)),clear_inner=False,clear_outer=True)
 bm.to_mesh(o.data);bm.free();o.data.update()
 for v in o.data.vertices:
  value=v.co.z-.55*v.co.y
  if value>.42:
   u=max(0,min(1,(value-.42)/.120));u=u*u*(3-2*u);field={o.vertex_groups[g.group].name:g.weight*(1-u) for g in v.groups}
   for n,w in neck_field(v.co).items():field[n]=field.get(n,0)+w*u
   values=sorted(field.items(),key=lambda a:a[1],reverse=True)[:4];mass=sum(w for _,w in values)
   for group in [int(g.group) for g in v.groups]:o.vertex_groups[group].remove([v.index])
   for n,w in values:o.vertex_groups[n].add([v.index],w/mass,'REPLACE')
# 让身体开口沿原头部颈圈闭合，取消重叠平盖，避免胸前拼接线。
head=heads[0];head.data.update();ring=[v for v in head.data.vertices if abs(v.co.z-.55*v.co.y-.54)<.00003]
if len(ring)<8:raise RuntimeError('没有找到原头部颈圈')
center=sum((v.co for v in ring),Vector())/len(ring);axis=Vector((0,1,.55)).normalized()
def angle(p):return math.atan2((p-center).dot(axis),p.x-center.x)
ring=sorted(ring,key=lambda v:angle(v.co));ordered=[(angle(v.co),v.co.copy(),v.normal.copy()) for v in ring]
for o in meshes:
 boundary=[v for v in o.data.vertices if abs(v.co.z-.55*v.co.y-.54)<.00003]
 normals=[v.normal.copy() for v in o.data.vertices]
 for v in boundary:
  a=angle(v.co);index=next((i for i,row in enumerate(ordered) if row[0]>=a),0);high=ordered[index];low=ordered[(index-1)%len(ordered)];lo=low[0];hi=high[0]
  if hi<lo:hi+=math.tau
  if a<lo:a+=math.tau
  t=max(0,min(1,(a-lo)/max(.000001,hi-lo)));v.co=low[1].lerp(high[1],t);normals[v.index]=low[2].lerp(high[2],t).normalized()
 o.data.update()
 if hasattr(o.data,'normals_split_custom_set_from_vertices'):o.data.normals_split_custom_set_from_vertices(normals)
 print('matched neck ring',len(boundary),len(ring),flush=True)
for head in heads:
 head.vertex_groups.clear()
 for j in joints:head.vertex_groups.new(name=j['name'])
 for v in head.data.vertices:
  for n,w in neck_field(v.co).items():
   if w>1e-7:head.vertex_groups[n].add([v.index],w,'REPLACE')
 head.parent=rig;modifier=head.modifiers.new('original GPU face skin','ARMATURE');modifier.object=rig
records=[]
for o in meshes+heads:
 if o in meshes:o.name='siamese_cat'
 for v in o.data.vertices:
  values=sorted([(int(g.group),g.weight) for g in v.groups if g.weight>1e-7],key=lambda x:x[1],reverse=True)[:4];mass=sum(w for _,w in values)
  for group in [int(g.group) for g in v.groups]:o.vertex_groups[group].remove([v.index])
  for group,w in values:o.vertex_groups[group].add([v.index],w/mass,'REPLACE')
  assert len([g for g in v.groups if g.weight>1e-6])<=4
  assert abs(sum(g.weight for g in v.groups)-1)<1e-5
  p=o.matrix_world@v.co;records.append({'part':o.name,'position':[p.x,p.z,-p.y],'weights':[[o.vertex_groups[g.group].name,g.weight] for g in v.groups]})
output.write_text(json.dumps({'method':'voxel body bone heat plus unchanged GPU face mesh UV texture','faceTextureRebake':False,'bodyTextureRebake':True,'vertices':records}),encoding='utf-8')
bpy.ops.object.select_all(action='DESELECT');rig.select_set(True)
for o in meshes+heads:o.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(output.with_suffix('.glb')),export_format='GLB',export_yup=True,use_selection=True,export_extras=True,export_animations=False)
bpy.ops.wm.save_as_mainfile(filepath=str(output.with_suffix('.blend')));print('hybrid skin vertices',len(records))
