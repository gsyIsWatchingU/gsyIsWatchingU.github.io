"""将闭合代理的骨热权重转移到原 GPU 曲面，保留原 UV 与毛色。"""
import bpy,bmesh,json,sys,math
import numpy as np
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
from mathutils.kdtree import KDTree
source,proxy_path,output=map(Path,sys.argv[sys.argv.index('--')+1:])
bpy.ops.wm.read_factory_settings(use_empty=True);bpy.ops.import_scene.gltf(filepath=str(proxy_path))
proxy=bpy.data.objects['siamese_cat'];head=bpy.data.objects['siamese_cat_head'];rig=next(o for o in bpy.context.scene.objects if o.type=='ARMATURE');proxy.name='heat_proxy'
old=set(bpy.context.scene.objects);bpy.ops.import_scene.gltf(filepath=str(source))
added=set(bpy.context.scene.objects)-old;body=next(o for o in added if o.type=='MESH' and o.name.startswith('siamese_cat'))
world=body.matrix_world.copy();body.parent=None;body.matrix_world=world
for mod in list(body.modifiers):body.modifiers.remove(mod)
for o in added:
 if o.type=='ARMATURE':bpy.data.objects.remove(o,do_unlink=True)
bpy.ops.object.select_all(action='DESELECT');body.select_set(True);bpy.context.view_layer.objects.active=body;bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
body.name='siamese_cat';body.data.update();normal_tree=KDTree(len(body.data.vertices));original_normals=[v.normal.copy() for v in body.data.vertices]
for v in body.data.vertices:normal_tree.insert(v.co,v.index)
normal_tree.balance();bpy.data.objects.remove(head,do_unlink=True);head=body.copy();head.data=body.data.copy();bpy.context.collection.objects.link(head);head.name='siamese_cat_head'
for part in [body,head]:
 bm=bmesh.new();bm.from_mesh(part.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=1e-6)
 bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),plane_co=Vector((0,0,.90)),plane_no=Vector((0,-1.4,1)),clear_outer=part==body,clear_inner=part==head)
 bm.to_mesh(part.data);bm.free();part.data.update();part.vertex_groups.clear()
 normals=[v.normal.copy() for v in part.data.vertices]
 for v in part.data.vertices:
  if abs(v.co.z-1.4*v.co.y-.90)<3e-5:
   samples=normal_tree.find_n(v.co,4);normals[v.index]=sum((original_normals[i]/max(.0001,distance) for co,i,distance in samples),Vector()).normalized()
 part.data.normals_split_custom_set_from_vertices(normals)
proxy.data.calc_loop_triangles();triangles=[list(t.vertices) for t in proxy.data.loop_triangles];points=[proxy.matrix_world@v.co for v in proxy.data.vertices];tree=BVHTree.FromPolygons(points,triangles,all_triangles=True)
groups=[body.vertex_groups.new(name=g.name) for g in proxy.vertex_groups];fields=[{g.group:g.weight for g in v.groups} for v in proxy.data.vertices];max_distance=0
for v in body.data.vertices:
 p=body.matrix_world@v.co;nearest,normal,index,distance=tree.find_nearest(p);max_distance=max(max_distance,distance)
 ids=triangles[index];a,b,c=[points[i] for i in ids];ab=b-a;ac=c-a;ap=nearest-a;aa=ab.dot(ab);bb=ac.dot(ac);cc=ab.dot(ac);den=max(1e-12,aa*bb-cc*cc);u=(ap.dot(ab)*bb-ap.dot(ac)*cc)/den;w=(ap.dot(ac)*aa-ap.dot(ab)*cc)/den
 weights={}
 for i,factor in zip(ids,[1-u-w,u,w]):
  for group,mass in fields[i].items():weights[group]=weights.get(group,0)+mass*max(0,factor)
 values=sorted(weights.items(),key=lambda row:row[1],reverse=True)[:4];total=sum(mass for group,mass in values)
 for group,mass in values:groups[group].add([v.index],mass/total,'REPLACE')
body.parent=rig;modifier=body.modifiers.new('Original GPU surface with transferred heat','ARMATURE');modifier.object=rig
names=[g.name for g in body.vertex_groups];lookup={n:i for i,n in enumerate(names)};limbs=['front_l','front_r','back_l','back_r'];trunk=['DEF_pelvis','DEF_spine_01','DEF_spine_02','DEF_spine_03','DEF_spine_04','DEF_chest'];centres={b.name:(rig.matrix_world@b.head_local) for b in rig.data.bones};count=len(body.data.vertices)
labels=np.zeros((count,5));fixed=np.zeros(count,dtype=bool);initial=[]
for v in body.data.vertices:
 field={names[g.group]:g.weight for g in v.groups};initial.append(field);p=v.co
 for k,limb in enumerate(limbs):labels[v.index,k+1]=sum(w for n,w in field.items() if n.startswith('DEF_'+limb+'_'))
 labels[v.index,0]=1-labels[v.index,1:].sum()
 torso=(p.z>.310 and -.42<p.y<.25) or (.05<-p.y<.16 and p.z>.16) or (abs(p.x)<.055 and p.z>.16 and -.37<p.y<.22) or p.z-1.4*p.y>.74
 if torso:labels[v.index]=[1,0,0,0,0];fixed[v.index]=True
 if p.z<.12:
  distances=[]
  for limb in limbs:
   a=centres['DEF_'+limb+'_lower'];b=centres['DEF_'+limb+'_paw'];ab=b-a;u=max(0,min(1,(p-a).dot(ab)/ab.length_squared));distances.append((p-(a+ab*u)).length)
  nearest=min(range(4),key=lambda k:distances[k])
  if p.z<.075 or distances[nearest]<.060:labels[v.index]=0;labels[v.index,nearest+1]=1;fixed[v.index]=True
 if p.y>.25:fixed[v.index]=True
edges=np.array([list(e.vertices) for e in body.data.edges],dtype=int);src=np.concatenate((edges[:,0],edges[:,1]));dst=np.concatenate((edges[:,1],edges[:,0]));positions=np.array([list(v.co) for v in body.data.vertices]);conductance=1/np.maximum(.001,np.linalg.norm(positions[src]-positions[dst],axis=1));degree=np.bincount(dst,weights=conductance,minlength=count)
for iteration in range(1000):
 next_labels=np.stack([np.bincount(dst,weights=conductance*labels[src,k],minlength=count)/np.maximum(degree,1e-9) for k in range(5)],axis=1);next_labels[fixed]=labels[fixed];delta=np.max(np.abs(next_labels-labels));labels=next_labels
 if delta<1e-5:break
print('surface harmonic labels',iteration,delta,flush=True)
for _ in range(20):
 average=np.stack([np.bincount(dst,weights=conductance*labels[src,k],minlength=count)/np.maximum(degree,1e-9) for k in range(5)],axis=1);labels=labels*.75+average*.25
ordered=sorted([(centres[n].y,n) for n in trunk]);
def smooth(a,b,x):
 u=max(0,min(1,(x-a)/(b-a)));return u*u*(3-2*u)
for v in body.data.vertices:
 p=v.co;lab=labels[v.index].copy();field={};tail={n:w for n,w in initial[v.index].items() if n.startswith('DEF_tail_')};tail_mass=sum(tail.values())
 for a,b in [(1,2),(3,4)]:
  common=min(lab[a],lab[b]);lab[a]-=common;lab[b]-=common;lab[0]+=2*common
 dominant=1+int(np.argmax(lab[1:]));lab[0]+=sum(lab[k] for k in range(1,5) if k!=dominant)
 for k in range(1,5):
  if k!=dominant:lab[k]=0
 y=p.y;right=next((i for i,row in enumerate(ordered) if row[0]>=y),len(ordered)-1);left=max(0,right-1);a,n=ordered[left];b,m=ordered[right];u=max(0,min(1,(y-a)/max(1e-8,b-a)));field[n]=lab[0]*(1-u);field[m]=field.get(m,0)+lab[0]*u
 limb=limbs[dominant-1];segments=[]
 for part,next_part in [('upper','lower'),('lower','paw'),('paw','toe')]:
  name='DEF_'+limb+'_'+part;segments.append(((centres[name].z+centres['DEF_'+limb+'_'+next_part].z)/2,name))
 segments.sort();right=next((i for i,row in enumerate(segments) if row[0]>=p.z),len(segments)-1);left=max(0,right-1);a,n=segments[left];b,m=segments[right];u=max(0,min(1,(p.z-a)/max(1e-8,b-a)));field[n]=field.get(n,0)+lab[dominant]*(1-u);field[m]=field.get(m,0)+lab[dominant]*u
 field={n:w*(1-tail_mass) for n,w in field.items()};field.update(tail)
 d=p.z-1.4*p.y;skull=smooth(.46,.51,p.z)
 if d>.74 or skull>0:
  u=smooth(.74,.90,d);h=smooth(.85,.93,d);field={n:w*(1-u)*(1-skull) for n,w in field.items()};field['DEF_neck']=field.get('DEF_neck',0)+u*(1-h)*(1-skull);field['DEF_head']=field.get('DEF_head',0)+u*h*(1-skull)+skull
 if p.z<.105:
  name='DEF_'+limbs[min(range(4),key=lambda k:(p-centres['DEF_'+limbs[k]+'_paw']).length_squared)]+'_paw';u=1-smooth(.075,.105,p.z);field={n:w*(1-u) for n,w in field.items()};field[name]=field.get(name,0)+u
 values=sorted(field.items(),key=lambda row:row[1],reverse=True)[:4];total=sum(w for n,w in values)
 for group in [int(g.group) for g in v.groups]:body.vertex_groups[group].remove([v.index])
 for n,w in values:
  if w>1e-8:body.vertex_groups[lookup[n]].add([v.index],w/total,'REPLACE')
for name in names:head.vertex_groups.new(name=name)
for v in head.data.vertices:
 p=v.co;d=p.z-1.4*p.y;skull=smooth(.46,.51,p.z);h=smooth(.85,.93,d)*(1-skull)+skull
 if h<1:head.vertex_groups['DEF_neck'].add([v.index],1-h,'REPLACE')
 if h>0:head.vertex_groups['DEF_head'].add([v.index],h,'REPLACE')
head.parent=rig;head_modifier=head.modifiers.new('Original GPU head with anatomical neck ownership','ARMATURE');head_modifier.object=rig
for polygon in body.data.polygons:polygon.use_smooth=True
bpy.data.objects.remove(proxy,do_unlink=True)
records=[]
for o in [body,head]:
 for v in o.data.vertices:
  p=o.matrix_world@v.co;records.append({'part':o.name,'position':[p.x,p.z,-p.y],'weights':[[o.vertex_groups[g.group].name,g.weight] for g in v.groups]})
output.with_suffix('.json').write_text(json.dumps({'method':'Original GPU surface and UV; harmonic surface limb labels with continuous spine weights; heat proxy initializes tail and boundary','bodyTextureRebake':False,'faceTextureRebake':False,'maximumProxyDistance':max_distance,'labelIterations':iteration,'labelDelta':float(delta),'vertices':records}),encoding='utf-8')
bpy.ops.object.select_all(action='DESELECT')
for o in [body,head,rig]:o.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(output),export_format='GLB',export_yup=True,use_selection=True,export_animations=False)
print('Original surface transfer',len(records),max_distance)
