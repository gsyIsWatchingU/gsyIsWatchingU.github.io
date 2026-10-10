"""保留自有 GPU 网格和 UV，建立四足关节骨架供接地 IK 行走。"""
from pathlib import Path
import bpy, bmesh, math, hashlib, json, sys
import heapq
from mathutils import Vector, Matrix
source, output = map(Path, sys.argv[sys.argv.index('--')+1:]); output.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True); bpy.ops.import_scene.gltf(filepath=str(source))
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
for o in meshes:
    world=o.matrix_world.copy();o.parent=None;o.matrix_world=world
    bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
    bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
    # 图生网格把细胡须误生成了许多悬浮碎片；只保留连通的主体。
    bm=bmesh.new();bm.from_mesh(o.data)
    bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.00002)
    remaining=set(bm.verts);components=[]
    while remaining:
        seed=remaining.pop();group={seed};stack=[seed]
        while stack:
            vertex=stack.pop()
            for edge in vertex.link_edges:
                other=edge.other_vert(vertex)
                if other in remaining:remaining.remove(other);group.add(other);stack.append(other)
        components.append(group)
    largest=max(map(len,components))
    debris=[v for group in components if len(group)<max(100,largest*.008) for v in group]
    print(json.dumps({'components':len(components),'componentSizes':sorted(map(len,components),reverse=True)[:20],'debrisVertices':len(debris)}))
    if debris:bmesh.ops.delete(bm,geom=debris,context='VERTS')
    bm.to_mesh(o.data);bm.free()
    # 网页候选保留 GPU 曲面和贴图，面数控制在短毛多层渲染预算内。
    if len(o.data.polygons)>32000:
        mod=o.modifiers.new('web mesh budget','DECIMATE');mod.ratio=30000/len(o.data.polygons)
        bpy.ops.object.modifier_apply(modifier=mod.name)
p=[v.co for o in meshes for v in o.data.vertices]
lo=Vector([min(v[i] for v in p) for i in range(3)]);hi=Vector([max(v[i] for v in p) for i in range(3)])
scale=.85/(hi.z-lo.z);center=Vector(((lo.x+hi.x)/2,(lo.y+hi.y)/2,lo.z))
for o in meshes:
    for v in o.data.vertices:v.co=(v.co-center)*scale
# 四爪从地面点云初始化，按头部与爪子的距离区分前后腿；不依赖生成朝向。
p=[v.co.copy() for o in meshes for v in o.data.vertices];low=[v for v in p if v.z<.06]
centers=[min(low,key=lambda v:v.x).copy()]
while len(centers)<4:centers.append(max(low,key=lambda v:min((v-c).length_squared for c in centers)).copy())
for _ in range(40):
    clusters=[[] for _ in centers]
    for v in low:clusters[min(range(4),key=lambda i:(v-centers[i]).length_squared)].append(v)
    centers=[sum(g,Vector())/len(g) if g else centers[i] for i,g in enumerate(clusters)]
head_vertices=[v for v in p if v.z>.63]
head_center=sum(head_vertices,Vector())/len(head_vertices)
centers=sorted(centers,key=lambda v:(v.x-head_center.x)**2+(v.y-head_center.y)**2)
front=(centers[0]+centers[1])/2;back=(centers[2]+centers[3])/2
forward=front-back;rotation=Matrix.Rotation(-math.atan2(forward.x,-forward.y),3,'Z')
# 相机不改变骨架方向；规范猫朝 Blender -Y（glTF +Z）。
for o in meshes:
    for v in o.data.vertices:v.co=rotation@v.co
    # 轻度平滑脸部连在主体上的胡须碎刺，保留耳尖、眼鼻和原 UV。
    bm=bmesh.new();bm.from_mesh(o.data)
    face=[v for v in bm.verts if .43<v.co.z<.67 and v.co.y<-.20]
    for _ in range(8):bmesh.ops.smooth_vert(bm,verts=face,factor=.4,use_axis_x=True,use_axis_y=True,use_axis_z=True)
    bm.to_mesh(o.data);bm.free()
centers=[rotation@c for c in centers]
lateral=sum(c.x for c in centers)/4
for o in meshes:
    for v in o.data.vertices:v.co.x-=lateral
for c in centers:c.x-=lateral
front=sorted(centers[:2],key=lambda v:v.x);back=sorted(centers[2:],key=lambda v:v.x)
feet=dict(zip(['front_l','front_r','back_l','back_r'],front+back))
front_y=sum(v.y for v in front)/2;back_y=sum(v.y for v in back)/2
tail_points=[v for o in meshes for v in o.data.vertices if v.co.z>.64 and v.co.y>.08]
tail_x=sum(v.co.x for v in tail_points)/len(tail_points)
arm=bpy.data.armatures.new('siamese_pet_rig');rig=bpy.data.objects.new('siamese_pet_rig',arm);bpy.context.collection.objects.link(rig)
bpy.ops.object.select_all(action='DESELECT');rig.select_set(True);bpy.context.view_layer.objects.active=rig;bpy.ops.object.mode_set(mode='EDIT')
positions={}
def bone(name,head,tail,parent=None):
    b=arm.edit_bones.new(name);b.head=head;b.tail=tail
    if parent:b.parent=arm.edit_bones[parent]
    positions[name]=list(head);return b
bone('pet_root',(0,0,.02),(0,0,.1))
bone('pet_chest',(0,front_y,.38),(0,front_y,.45),'pet_root')
bone('pet_haunch',(0,back_y-.03,.30),(0,back_y-.03,.40),'pet_root')
bone('pet_head',(0,front_y+.02,.43),(0,front_y+.02,.53),'pet_chest')
# 尾巴位于后臀正上方，连续链减少根部折角。
bone('pet_tail',(tail_x,back_y+.11,.43),(tail_x,back_y+.16,.58),'pet_haunch')
bone('pet_tail_tip',(tail_x,back_y+.16,.58),(tail_x,back_y+.19,.75),'pet_tail')
for name,f in feet.items():
    hind=name.startswith('back');hip=Vector((f.x,f.y+(.01 if hind else .018),.35 if hind else .34))
    knee=Vector((f.x,f.y+(-.105 if hind else .09),.205))
    ankle=Vector((f.x,f.y+.014,.065))
    bone('pet_'+name+'_upper',hip,knee,'pet_root' if hind else 'pet_chest')
    bone('pet_'+name+'_lower',knee,ankle,'pet_'+name+'_upper')
    bone('pet_'+name+'_paw',ankle,(f.x,f.y-.045,.027),'pet_'+name+'_lower')
bpy.ops.object.mode_set(mode='OBJECT')
def smooth(a,b,v):
    t=max(0,min(1,(v-a)/(b-a)));return t*t*(3-2*t)
counts={n:0 for n in positions}
for o in meshes:
    bm=bmesh.new();bm.from_mesh(o.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.00002);bm.to_mesh(o.data);bm.free()
    for face in o.data.polygons:face.use_smooth=True
    # 沿网格连通表面计算尾巴权重，弯曲尾尖不会再按空间坐标误归躯干。
    neighbors=[set() for _ in o.data.vertices]
    for edge in o.data.edges:
        a,b=edge.vertices;neighbors[a].add(b);neighbors[b].add(a)
    distances=[float('inf')]*len(o.data.vertices);queue=[]
    for v in o.data.vertices:
        if v.co.z>.66 and v.co.y>.06:distances[v.index]=0;heapq.heappush(queue,(0,v.index))
    while queue:
        distance,index=heapq.heappop(queue)
        if distance>distances[index]:continue
        for other in neighbors[index]:
            candidate=distance+(o.data.vertices[index].co-o.data.vertices[other].co).length
            if candidate<distances[other]:distances[other]=candidate;heapq.heappush(queue,(candidate,other))
    print(json.dumps({'tailCoreVertices':sum(d<.09 for d in distances),'tailX':tail_x}))
    leg_distances={}
    for name in feet:
        field=[float('inf')]*len(o.data.vertices);queue=[]
        for v in o.data.vertices:
            closest=min(feet,key=lambda key:(v.co.x-feet[key].x)**2+(v.co.y-feet[key].y)**2)
            if v.co.z<.045 and closest==name:field[v.index]=0;heapq.heappush(queue,(0,v.index))
        while queue:
            distance,index=heapq.heappop(queue)
            if distance>field[index]:continue
            for other in neighbors[index]:
                candidate=distance+(o.data.vertices[index].co-o.data.vertices[other].co).length
                if candidate<field[other]:field[other]=candidate;heapq.heappush(queue,(candidate,other))
        leg_distances[name]=field
    groups={n:o.vertex_groups.new(name=n) for n in positions}
    for v in o.data.vertices:
        x,y,z=v.co;weights={}
        # 极小的分离片也必须绑定；禁止 inf-inf 产生 NaN 并落入导出器 neutral_bone。
        for name,f in feet.items():
            if not math.isfinite(leg_distances[name][v.index]):leg_distances[name][v.index]=(v.co-f).length
        tail=1-smooth(.09,.30,distances[v.index])
        tip=smooth(.55,.67,z);weights['pet_tail']=tail*(1-tip);weights['pet_tail_tip']=tail*tip
        # 脸、眼、下颌和胡须整体归头骨；仅颈部斜面过渡，避免脸内混入躯干。
        head=smooth(.29,.415,z-.6*(y-front_y))*(1-smooth(front_y+.20,front_y+.32,y))*(1-tail)
        if head>.995:head=1
        weights['pet_head']=head
        nearest=min(feet,key=lambda name:leg_distances[name][v.index])
        nearest_distance=leg_distances[nearest][v.index]
        leg=(1-smooth(.16,.34,nearest_distance))*(1-tail)*(1-head)
        paw=1-smooth(.10,.165,z);upper=smooth(.13,.27,z);lower=max(0,1-paw-upper)
        pair=sorted(feet,key=lambda name:leg_distances[name][v.index])[:2]
        blend=smooth(.21,.28,nearest_distance)
        other_share=math.exp(-(leg_distances[pair[1]][v.index]-nearest_distance)/.065)
        for name,share in [(pair[0],1-blend+blend/(1+other_share)),(pair[1],blend*other_share/(1+other_share))]:
            for part,w in [('paw',paw),('lower',lower),('upper',upper)]:weights['pet_'+name+'_'+part]=leg*w*share
        torso=max(0,1-sum(weights.values()))
        chest=1-smooth(front_y+.08,back_y-.02,y)
        weights['pet_chest']=torso*chest
        weights['pet_root']=torso*(1-chest)
        haunch=smooth(0,.25,y)*smooth(.13,.32,z)*(1-smooth(.40,.55,z))
        weights['pet_haunch']=weights['pet_root']*haunch
        weights['pet_root']*=1-haunch
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
record={'status':'review','humanReview':'pending','meshBackend':'Hunyuan3D-2.1','sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'runtimeSha256':hashlib.sha256(path.read_bytes()).hexdigest(),'dimensionsYUp':[dims[0],dims[2],dims[1]],'triangles':sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in meshes),'bones':len(positions),'maxWeights':4,'weightedVertices':counts,'feetBlender':{n:list(v) for n,v in feet.items()},'animation':'Four beat walk; stance anchors; two bone IK; ground oriented paws; head and tail idle','repairs':['uniform scale 0.85m','canonical forward +Z','preserve GPU mesh and UV','separate upper/lower/paw chains for four legs','texture <=1024','rigid face weighting; blend only at sloped neck; head pivot at neck base']}
(output/'runtime.json').write_text(json.dumps(record,indent=2)+'\n');bpy.ops.wm.save_as_mainfile(filepath=str(output/'siamese-cat.blend'));print(json.dumps(record))
