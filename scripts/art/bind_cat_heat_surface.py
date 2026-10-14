"""焊合 UV 拆点后重新骨热绑定，不按高度强行切换身体与四肢组织。"""
import bpy,bmesh,json,sys,math
from pathlib import Path
from mathutils import Vector
source,skeleton_path,output=map(Path,sys.argv[sys.argv.index('--')+1:])
bpy.ops.wm.read_factory_settings(use_empty=True);bpy.ops.import_scene.gltf(filepath=str(source))
body=bpy.data.objects['siamese_cat'];head=bpy.data.objects['siamese_cat_head'];rig=next(o for o in bpy.context.scene.objects if o.type=='ARMATURE');joints=json.loads(skeleton_path.read_text())
bpy.ops.object.select_all(action='DESELECT');rig.select_set(True);bpy.context.view_layer.objects.active=rig;bpy.ops.object.mode_set(mode='EDIT')
for i,j in enumerate(joints):
 bone=rig.data.edit_bones[j['name']];bone.head=Vector((j['position'][0],-j['position'][2],j['position'][1]));children=[k for k in joints if k['parent']==i]
 if children:bone.tail=Vector((children[0]['position'][0],-children[0]['position'][2],children[0]['position'][1]))
 else:bone.tail=bone.head+Vector((0,-.03,.012))
 if (bone.tail-bone.head).length<.008:bone.tail=bone.head+Vector((0,0,.012))
bpy.ops.object.mode_set(mode='OBJECT')
bm=bmesh.new();bm.from_mesh(body.data);before=len(bm.verts);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=1e-6);bm.to_mesh(body.data);bm.free();body.data.update()
body.vertex_groups.clear()
for mod in list(body.modifiers):
 if mod.type=='ARMATURE':body.modifiers.remove(mod)
world=body.matrix_world.copy();body.parent=None;body.matrix_world=world
bpy.ops.object.select_all(action='DESELECT');body.select_set(True);rig.select_set(True);bpy.context.view_layer.objects.active=rig;bpy.ops.object.parent_set(type='ARMATURE_AUTO')
if any(not v.groups or sum(g.weight for g in v.groups)<1e-5 for v in body.data.vertices):raise RuntimeError('骨热未覆盖整个身体')
def smooth(a,b,x):
 u=max(0,min(1,(x-a)/(b-a)));return u*u*(3-2*u)
fields=[{body.vertex_groups[g.group].name:g.weight for g in v.groups if g.weight>1e-7} for v in body.data.vertices];neighbors=[set() for _ in body.data.vertices]
for e in body.data.edges:
 a,b=e.vertices;neighbors[a].add(b);neighbors[b].add(a)
for _ in range(15):
 next_fields=[]
 for i,v in enumerate(body.data.vertices):
  p=body.matrix_world@v.co
  if p.z<.026 or not neighbors[i]:next_fields.append(fields[i]);continue
  field={n:w*.8 for n,w in fields[i].items()}
  for j in neighbors[i]:
   for n,w in fields[j].items():field[n]=field.get(n,0)+w*.2/len(neighbors[i])
  next_fields.append(field)
 fields=next_fields
for i,v in enumerate(body.data.vertices):
 p=body.matrix_world@v.co;field=fields[i];d=p.z-.55*p.y
 if p.z<.027:
  paw=min([j for j in joints if j['name'].endswith('_paw')],key=lambda j:(Vector((j['position'][0],-j['position'][2],j['position'][1]))-p).length_squared);u=1-smooth(.015,.027,p.z);field={n:w*(1-u) for n,w in field.items()};field[paw['name']]=field.get(paw['name'],0)+u
 if d>.42:
  u=smooth(.42,.54,d);h=smooth(.49,.57,d);field={n:w*(1-u) for n,w in field.items()};field['DEF_neck']=field.get('DEF_neck',0)+u*(1-h);field['DEF_head']=field.get('DEF_head',0)+u*h
 values=sorted(field.items(),key=lambda a:a[1],reverse=True)[:4];mass=sum(w for n,w in values)
 for group in [int(g.group) for g in v.groups]:body.vertex_groups[group].remove([i])
 for n,w in values:body.vertex_groups[n].add([i],w/mass,'REPLACE')
head.data.update();ring=[v for v in head.data.vertices if abs(v.co.z-.55*v.co.y-.54)<.00003];center=sum((v.co for v in ring),Vector())/len(ring);axis=Vector((0,1,.55)).normalized()
def angle(p):return math.atan2((p-center).dot(axis),p.x-center.x)
ordered=sorted([(angle(v.co),v.normal.copy()) for v in ring],key=lambda row:row[0]);normals=[v.normal.copy() for v in body.data.vertices]
for v in body.data.vertices:
 if abs(v.co.z-.55*v.co.y-.54)>3e-5:continue
 a=angle(v.co);i=next((i for i,row in enumerate(ordered) if row[0]>=a),0);hi=ordered[i];lo=ordered[(i-1)%len(ordered)];start,end=lo[0],hi[0]
 if end<start:end+=math.tau
 if a<start:a+=math.tau
 t=max(0,min(1,(a-start)/max(1e-6,end-start)));normals[v.index]=lo[1].lerp(hi[1],t).normalized()
body.data.normals_split_custom_set_from_vertices(normals)
records=[]
for o in [body,head]:
 for v in o.data.vertices:
  p=o.matrix_world@v.co;records.append({'part':o.name,'position':[p.x,p.z,-p.y],'weights':[[o.vertex_groups[g.group].name,g.weight] for g in v.groups]})
output.with_suffix('.json').write_text(json.dumps({'method':'Welded geometry with original continuous bone heat weights; rigid paw soles and original GPU whole head','weldedUVVertices':before-len(body.data.vertices),'bodyGeometricVertices':len(body.data.vertices),'faceTextureRebake':False,'bodyTextureRebake':True,'vertices':records}),encoding='utf-8')
bpy.ops.object.select_all(action='DESELECT')
for o in [body,head,rig]:o.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(output),export_format='GLB',export_yup=True,use_selection=True,export_animations=False)
print('continuous bone heat',len(records))
