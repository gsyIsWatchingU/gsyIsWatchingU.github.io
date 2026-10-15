"""在既有 GPU 猫咪曲面上重建身体四边面，保留头部、毛色与颈部边界。"""
import bpy,bmesh,json,sys,math
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
source,skeleton_path,output=map(Path,sys.argv[sys.argv.index('--')+1:])
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(source))
body=bpy.data.objects['siamese_cat'];head=bpy.data.objects['siamese_cat_head']
rig=next(o for o in bpy.context.scene.objects if o.type=='ARMATURE')
for o in [body,head]:
 world=o.matrix_world.copy();o.parent=None;o.matrix_world=world
 for mod in list(o.modifiers):o.modifiers.remove(mod)
 bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
 bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
 bm=bmesh.new();bm.from_mesh(o.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=1e-6)
 bmesh.ops.dissolve_degenerate(bm,dist=1e-7,edges=list(bm.edges));bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
 print('surface health',o.name,'nonmanifold',sum(len(e.link_faces)>2 for e in bm.edges),'wire',sum(not e.link_faces for e in bm.edges),'boundary',sum(e.is_boundary for e in bm.edges),flush=True)
 bm.to_mesh(o.data);bm.free()
joint_data=json.loads(skeleton_path.read_text())
bpy.ops.object.select_all(action='DESELECT');rig.select_set(True);bpy.context.view_layer.objects.active=rig;bpy.ops.object.mode_set(mode='EDIT')
for index,joint in enumerate(joint_data):
 bone=rig.data.edit_bones.get(joint['name']) or rig.data.edit_bones.new(joint['name']);p=joint['position'];bone.head=Vector((p[0],-p[2],p[1]));children=[j for j in joint_data if j['parent']==index]
 if children:p=children[0]['position'];bone.tail=Vector((p[0],-p[2],p[1]))
 else:bone.tail=bone.head+Vector((0,-.03,.012))
 if (bone.tail-bone.head).length<.008:bone.tail=bone.head+Vector((0,0,.012))
for joint in joint_data:
 if joint['parent']>=0:rig.data.edit_bones[joint['name']].parent=rig.data.edit_bones[joint_data[joint['parent']]['name']]
bpy.ops.object.mode_set(mode='OBJECT')
body.data.calc_loop_triangles()
triangles=list(body.data.loop_triangles)
tree=BVHTree.FromPolygons([v.co for v in body.data.vertices],[list(t.vertices) for t in triangles],all_triangles=True)
uvs=body.data.uv_layers.active.data
for joint in joint_data:
 if joint['name'] not in body.vertex_groups:body.vertex_groups.new(name=joint['name'])
 if joint['name'] not in head.vertex_groups:head.vertex_groups.new(name=joint['name'])
names=[g.name for g in body.vertex_groups]
fields=[{names[g.group]:g.weight for g in vert.groups} for vert in body.data.vertices]
high=body;high.name='cat_gpu_body_source'
body=high.copy();body.data=high.data.copy();bpy.context.collection.objects.link(body);body.name='siamese_cat'
bpy.ops.object.select_all(action='DESELECT');body.select_set(True);bpy.context.view_layer.objects.active=body
before=len(body.data.vertices)
bm=bmesh.new();bm.from_mesh(body.data);bmesh.ops.holes_fill(bm,edges=[e for e in bm.edges if e.is_boundary],sides=0);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(body.data);bm.free()
# 生成网格有零面积接触与自交，先建立封闭体积，再进行四边面流重建。
body.data.remesh_voxel_size=.0035
bpy.ops.object.voxel_remesh()
if not body.data.polygons:raise RuntimeError('封闭身体体积重建失败')
print('closed voxel surface',len(body.data.vertices),len(body.data.polygons),flush=True)
bm=bmesh.new();bm.from_mesh(body.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));print('voxel health',sum(not e.is_manifold for e in bm.edges),sum(not v.is_manifold for v in bm.verts),sum(not e.is_contiguous for e in bm.edges),flush=True);bm.to_mesh(body.data);bm.free()
for v in body.data.vertices:v.select=True
# Quadriflow 的退化边判定使用固定 1e-4 单位阈值；临时放大避免误判毫米级细节。
for vertex in body.data.vertices:vertex.co*=100
result=bpy.ops.object.quadriflow_remesh(target_faces=8000,use_mesh_symmetry=False,use_preserve_sharp=False,use_preserve_boundary=True,seed=4)
if result!={'FINISHED'}:raise RuntimeError('身体重拓扑未完成')
for vertex in body.data.vertices:vertex.co/=100
print('quad body',before,len(body.data.vertices),len(body.data.polygons),flush=True)
body.data.update()
def nearest(p):
 co,n,index,d=tree.find_nearest(p)
 tri=triangles[index];a,b,c=[high.data.vertices[i].co for i in tri.vertices]
 ab=b-a;ac=c-a;ap=co-a;aa=ab.dot(ab);bb=ac.dot(ac);cc=ab.dot(ac);den=max(1e-15,aa*bb-cc*cc)
 u=(ap.dot(ab)*bb-ap.dot(ac)*cc)/den;w=(ap.dot(ac)*aa-ap.dot(ab)*cc)/den
 return tri,[max(0,1-u-w),max(0,u),max(0,w)],co,d
# 边界不动；身体贴回 GPU 原曲面，保留耳眼鼻原始头部。
max_projection=0
for vertex in body.data.vertices:
 tri,weights,co,d=nearest(vertex.co);max_projection=max(max_projection,d);vertex.co=co
bm=bmesh.new();bm.from_mesh(body.data)
bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),plane_co=Vector((0,0,.84)),plane_no=Vector((0,-1.4,1)),clear_outer=True,clear_inner=False)
inner=[v for v in bm.verts if any(e.is_boundary for e in v.link_edges)]
head_bm=bmesh.new();head_bm.from_mesh(head.data)
outer_points=[v.co.copy() for v in head_bm.verts if any(e.is_boundary for e in v.link_edges)]
head_bm.free()
center=sum(outer_points,Vector())/len(outer_points);axis=Vector((0,1,1.4)).normalized()
def angle(p):return math.atan2((p-center).dot(axis),p.x-center.x)%(2*math.pi)
inner.sort(key=lambda vertex:angle(vertex.co));outer_points.sort(key=angle)
outer=[bm.verts.new(point) for point in outer_points]
i=j=0;bridge_faces=[]
while i<len(inner) or j<len(outer):
 a=inner[i%len(inner)];b=outer[j%len(outer)]
 next_i=angle(inner[(i+1)%len(inner)].co)+(2*math.pi if i+1>=len(inner) else 0)
 next_j=angle(outer[(j+1)%len(outer)].co)+(2*math.pi if j+1>=len(outer) else 0)
 if i>=len(inner):advance_inner=False
 elif j>=len(outer):advance_inner=True
 else:advance_inner=next_i<next_j
 if advance_inner:c=inner[(i+1)%len(inner)];i+=1
 else:c=outer[(j+1)%len(outer)];j+=1
 if len({a,b,c})==3:bridge_faces.append(bm.faces.new((a,b,c)))
bridge_edges={edge for face in bridge_faces for edge in face.edges if not edge.is_boundary}
subdivision=bmesh.ops.subdivide_edges(bm,edges=list(bridge_edges),cuts=3,use_grid_fill=True)
for element in subdivision['geom_inner']:
 if isinstance(element,bmesh.types.BMVert):element.co=nearest(element.co)[2]
bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(body.data);bm.free();body.data.update()
body.vertex_groups.clear()
for name in names:body.vertex_groups.new(name=name)
joints=json.loads(skeleton_path.read_text());centers={j['name']:Vector((j['position'][0],-j['position'][2],j['position'][1])) for j in joints}
def smooth(a,b,x):
 u=max(0,min(1,(x-a)/(b-a)));return u*u*(3-2*u)
def distance_segment(p,a,b):
 ab=b-a;u=max(0,min(1,(p-a).dot(ab)/ab.length_squared));return (p-a-ab*u).length
for vertex in body.data.vertices:
 tri,weights,_,_=nearest(vertex.co);field={}
 for i,mass in zip(tri.vertices,weights):
  for name,w in fields[i].items():field[name]=field.get(name,0)+w*mass
 # 胸下/髋内侧仍属四肢的表面不能被躯干标签锁住；用实际骨段距离补足归属。
 p=vertex.co;families=['front_l','front_r','back_l','back_r']
 if p.z<.27 and sum(w for n,w in field.items() if n.startswith('DEF_tail') or n in ['DEF_neck','DEF_head'])<.1:
  distances=[]
  for family in families:
   hip,knee,ankle=[centers['DEF_'+family+'_'+part] for part in ['upper','lower','paw']]
   distances.append(min(distance_segment(p,hip,knee),distance_segment(p,knee,ankle)))
  family=families[min(range(4),key=lambda k:distances[k])]
  old_mass=sum(w for n,w in field.items() if n.startswith('DEF_'+family+'_'))
  lateral=1-smooth(.10,.15,p.z)*(1-smooth(.035,.090,abs(p.x)))
  new_mass=max(old_mass,(1-smooth(.045,.085,min(distances)))*(1-smooth(.20,.27,p.z))*lateral)
  if new_mass>old_mass+1e-8:
   field={n:w*(1-new_mass)/max(1e-8,1-old_mass) for n,w in field.items() if not n.startswith('DEF_'+family+'_')}
   field['DEF_'+family+'_upper']=new_mass
 # 保留曲面传播得到的躯干/四肢归属；肘膝过渡按实际关节方向重建，避免端点等距时把大腿皮肤分给小腿。
 for family in ['front_l','front_r','back_l','back_r']:
  segment_names=['DEF_'+family+'_'+part for part in ['upper','lower','paw','toe']]
  mass=sum(field.pop(n,0) for n in segment_names)
  if mass<1e-8:continue
  p=vertex.co;hip,knee,ankle,toe=[centers[n] for n in segment_names]
  # 底部脚掌刚性，手腕上方宽过渡；肘膝沿关节平面做宽过渡。
  paw=1-smooth(.035,.085,p.z)
  axis=(hip-ankle).normalized();along=(p-knee).dot(axis);w0=smooth(-.055,.055,along);w1=1-w0;total=1
  field[segment_names[0]]=mass*(1-paw)*w0/total
  field[segment_names[1]]=mass*(1-paw)*w1/total
  field[segment_names[2]]=mass*paw
 values=sorted(field.items(),key=lambda row:row[1],reverse=True)[:4];total=sum(w for n,w in values)
 for name,w in values:
  if w>1e-8:body.vertex_groups[name].add([vertex.index],w/total,'REPLACE')
# 颈部不能沿斜面延伸到胸口；头颈过渡加宽，前脸和额顶保持头骨刚性。
for mesh in [body,head]:
 for vertex in mesh.data.vertices:
  q=Vector((vertex.co.x,vertex.co.z,-vertex.co.y));d=q.y+1.4*q.z
  if d<.70 and q.y<.46:continue
  height=smooth(.30,.39,q.y)
  skull=smooth(.46,.51,q.y);face=smooth(.40,.43,q.z)*smooth(.30,.34,q.y)
  head_mass=max(skull,face,smooth(.78,1.02,d)*height);neck_mass=(1-head_mass)*smooth(.70,.90,d)*height
  base={mesh.vertex_groups[g.group].name:g.weight for g in vertex.groups if mesh.vertex_groups[g.group].name not in ['DEF_head','DEF_neck']}
  total=sum(base.values())
  if total<.001:base={'DEF_chest':1};total=1
  field={name:w*(1-head_mass-neck_mass)/total for name,w in base.items()}
  field['DEF_head']=head_mass;field['DEF_neck']=neck_mass
  values=sorted(field.items(),key=lambda row:row[1],reverse=True)[:4];total=sum(w for name,w in values)
  for group in [int(g.group) for g in vertex.groups]:mesh.vertex_groups[group].remove([vertex.index])
  for name,w in values:
   if w>1e-8:mesh.vertex_groups[name].add([vertex.index],w/total,'REPLACE')
# 耳尖独立蒙皮；面部、眼鼻和额头中线保持原头骨权重。
ear_center=(Vector(joints[-1]['position'])+Vector(joints[-2]['position']))*.5
lateral=(Vector(joints[-1]['position'])-Vector(joints[-2]['position']));lateral.y=0;lateral.normalize()
for vertex in head.data.vertices:
 q=Vector((vertex.co.x,vertex.co.z,-vertex.co.y));side=(q-ear_center).dot(lateral);mass=smooth(.535,.605,q.y)*smooth(.035,.075,abs(side))
 if mass<1e-7:continue
 field={head.vertex_groups[group.group].name:group.weight*(1-mass) for group in vertex.groups}
 field['DEF_ear_'+('r' if side>0 else 'l')]=mass
 for group in [int(g.group) for g in vertex.groups]:head.vertex_groups[group].remove([vertex.index])
 for name,w in field.items():
  if w>1e-8:head.vertex_groups[name].add([vertex.index],w,'REPLACE')
# 分件共享顶点必须使用完全相同的骨骼权重。
shared={tuple(round(c,6) for c in v.co):v for v in body.data.vertices}
for vertex in head.data.vertices:
 other=shared.get(tuple(round(c,6) for c in vertex.co))
 if other is None:continue
 for group in [int(g.group) for g in vertex.groups]:head.vertex_groups[group].remove([vertex.index])
 for group in other.groups:
  name=body.vertex_groups[group.group].name
  head.vertex_groups[name].add([vertex.index],group.weight,'REPLACE')
if not body.data.uv_layers:body.data.uv_layers.new(name='UVMap')
uv=body.data.uv_layers.active.data
for loop in body.data.loops:
 tri,weights,_,_=nearest(body.data.vertices[loop.vertex_index].co)
 uv[loop.index].uv=sum((uvs[i].uv*w for i,w in zip(tri.loops,weights)),Vector((0,0)))
body.data.materials.clear()
for material in high.data.materials:body.data.materials.append(material)
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=1
scene.render.bake.use_pass_direct=False;scene.render.bake.use_pass_indirect=False;scene.render.bake.use_pass_color=True;scene.render.bake.margin=12
bpy.ops.object.select_all(action='DESELECT');body.select_set(True);bpy.context.view_layer.objects.active=body
bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT');bpy.ops.uv.smart_project(angle_limit=1.1519,island_margin=.015);bpy.ops.object.mode_set(mode='OBJECT')
image=bpy.data.images.new('cat_joint_body_color',width=2048,height=2048,alpha=False)
material=bpy.data.materials.new('cat_joint_body_material');material.use_nodes=True
texture=material.node_tree.nodes.new('ShaderNodeTexImage');texture.image=image;material.node_tree.nodes.active=texture
body.data.materials.clear();body.data.materials.append(material)
bpy.ops.object.select_all(action='DESELECT');high.select_set(True);body.select_set(True);bpy.context.view_layer.objects.active=body
bpy.ops.object.bake(type='DIFFUSE',use_selected_to_active=True,cage_extrusion=.02,max_ray_distance=.04)
material.node_tree.links.new(texture.outputs['Color'],material.node_tree.nodes.get('Principled BSDF').inputs['Base Color'])
material.node_tree.nodes.get('Principled BSDF').inputs['Roughness'].default_value=.95
image.pack()
import numpy as np
# 颈部用最近曲面的原 UV 精确转色，避免射线烘焙漏采样形成一圈色带。
source_image=next(node.image for slot in high.material_slots for node in slot.material.node_tree.nodes if node.type=='TEX_IMAGE' and node.image and 'basecolor' in node.name.lower()) if any(node.type=='TEX_IMAGE' and node.image and 'basecolor' in node.name.lower() for slot in high.material_slots for node in slot.material.node_tree.nodes) else next(node.image for slot in high.material_slots for node in slot.material.node_tree.nodes if node.type=='TEX_IMAGE' and node.image and node.image.channels>=3)
sw,sh=source_image.size;source_pixels=np.array(source_image.pixels[:]).reshape(sh,sw,4);tw,th=image.size;target_pixels=np.array(image.pixels[:]).reshape(th,tw,4)
body.data.calc_loop_triangles();target_uv=body.data.uv_layers.active.data;painted=0
for tri in body.data.loop_triangles:
 points=[body.data.vertices[i].co for i in tri.vertices]
 if max(point.z-1.4*point.y for point in points)<.74:continue
 coords=np.array([list(target_uv[i].uv) for i in tri.loops])*np.array([tw,th]);a,b,c=coords
 lo=np.maximum(0,np.floor(coords.min(axis=0)-3).astype(int));hi=np.minimum([tw-1,th-1],np.ceil(coords.max(axis=0)+3).astype(int))
 den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1])
 if abs(den)<1e-8:continue
 for y in range(lo[1],hi[1]+1):
  for x in range(lo[0],hi[0]+1):
   u=((b[1]-c[1])*(x+.5-c[0])+(c[0]-b[0])*(y+.5-c[1]))/den
   v=((c[1]-a[1])*(x+.5-c[0])+(a[0]-c[0])*(y+.5-c[1]))/den;w=1-u-v
   if min(u,v,w)<-.06:continue
   point=points[0]*u+points[1]*v+points[2]*w;alpha=smooth(.74,.83,point.z-1.4*point.y)
   if alpha<=0:continue
   source_tri,weights,_,_=nearest(point);uv=sum((uvs[i].uv*weight for i,weight in zip(source_tri.loops,weights)),Vector((0,0)))
   sx=max(0,min(sw-1,int(uv.x*sw)));sy=max(0,min(sh-1,int(uv.y*sh)))
   target_pixels[y,x,:3]=target_pixels[y,x,:3]*(1-alpha)+source_pixels[sy,sx,:3]*alpha;painted+=1
image.pixels[:]=target_pixels.ravel();image.update();image.pack();print('neck original texture transfer',painted,flush=True)
for o in [body,head]:
 o.parent=rig;mod=o.modifiers.new('Cat anatomical skin','ARMATURE');mod.object=rig
 for polygon in o.data.polygons:polygon.use_smooth=True
# 验证保留的颈部边界在两侧严格对应，不靠毛发覆盖裂缝。
def boundary(mesh):
 bm=bmesh.new();bm.from_mesh(mesh.data);points=[v.co.copy() for v in bm.verts if any(e.is_boundary for e in v.link_edges)];bm.free();return points
a,b=boundary(body),boundary(head)
seam=[p for p in b if abs(p.z-1.4*p.y-.90)<3e-5]
gap=max(min((p-q).length for q in a) for p in seam)
if gap>.0001:raise RuntimeError('重拓扑破坏颈部边界: '+str(gap))
output.parent.mkdir(parents=True,exist_ok=True)
report={'method':'Voxel cleanup and Quadriflow body on owned GPU surface; original head retained; anatomical joint-plane weights at elbow/knee, protected soles, height-gated head/neck, shared seam weights and two ear bones','source':str(source),'bodyVerticesBefore':before,'bodyVerticesAfter':len(body.data.vertices),'bodyQuads':sum(len(p.vertices)==4 for p in body.data.polygons),'bodyFaces':len(body.data.polygons),'headVertices':len(head.data.vertices),'maximumProjectionBeforeNeckCapRemoval':max_projection,'neckBoundaryPoints':len(seam),'maximumNeckGap':gap,'bodyTextureRebake':True,'bodyTextureSize':[2048,2048],'neckTextureTransferredTexels':painted,'bones':len(rig.data.bones),'faceTextureRebake':False,'status':'review','humanReview':'pending'}
output.with_suffix('.json').write_text(json.dumps(report,indent=2)+'\n')
bpy.ops.object.select_all(action='DESELECT')
for o in [body,head,rig]:o.select_set(True)
bpy.context.view_layer.objects.active=body
bpy.ops.export_scene.gltf(filepath=str(output),export_format='GLB',export_yup=True,use_selection=True,export_animations=False)
print(json.dumps(report),flush=True)
