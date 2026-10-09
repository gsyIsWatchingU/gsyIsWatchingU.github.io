"""保留 Hunyuan 道具轮廓与 UV，清理网格、统一底部枢轴，保存 Blender 工程。"""
import bpy,bmesh,json,hashlib,sys,math
from pathlib import Path
from mathutils import Vector

source,out,name=map(Path,sys.argv[sys.argv.index('--')+1:])
name=str(name);out.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(source))
objects=[o for o in bpy.context.scene.objects if o.type=='MESH']
removed=[]
if name=='table-speaker-base':
    for o in objects:
        if not any('warm wood' in m.name for m in o.data.materials if m):
            removed.append(o.name);bpy.data.objects.remove(o,do_unlink=True)
    objects=[o for o in bpy.context.scene.objects if o.type=='MESH']
for o in objects:
    bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
    bpy.ops.object.transform_apply(location=False,rotation=True,scale=True)
    if name!='table-speaker-base':
        bm=bmesh.new();bm.from_mesh(o.data)
        # Paint 的 UV 接缝会拆开顶点；按连通几何识别多余的大背景板。
        seen=set();background=[]
        for vertex in bm.verts:
            if vertex in seen:continue
            stack=[vertex];seen.add(vertex);component=[]
            while stack:
                v=stack.pop();component.append(v)
                for edge in v.link_edges:
                    other=edge.other_vert(v)
                    if other not in seen:seen.add(other);stack.append(other)
            points=[o.matrix_world@v.co for v in component]
            spans=[max(p[i] for p in points)-min(p[i] for p in points) for i in range(3)]
            oversized=(name=='speaker' and any(abs(p[0])>.7 or abs(p[2])>.7 for p in points)) or (name=='laptop' and any(abs(p[0])>.78 or abs(p[1])>.9 for p in points))
            if oversized or (spans[0]>1.7 and spans[2]>1.7 and spans[1]<.15):
                background.extend(component);removed.append({'kind':'background plate','vertices':len(component),'dimensionsZUp':spans})
        if background:bmesh.ops.delete(bm,geom=background,context='VERTS')
        if name=='laptop':
            # 原屏幕存在重叠破面；保留生成的键盘底座，按参考重拓扑屏幕。
            bad=[v for v in bm.verts if (o.matrix_world@v.co).z>-.30]
            bmesh.ops.delete(bm,geom=bad,context='VERTS')
            removed.append({'kind':'overlapping screen surfaces','vertices':len(bad)})
        if name!='laptop':
            bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.000001)
            bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
        bm.to_mesh(o.data);bm.free();o.data.update()
    for p in o.data.polygons:p.use_smooth=True
    for m in o.data.materials:
        if m and m.use_nodes:
            shader=m.node_tree.nodes.get('Principled BSDF')
            if shader:shader.inputs['Roughness'].default_value=.85;shader.inputs['Metallic'].default_value=0
if name=='laptop':
    def material(label,color):
        m=bpy.data.materials.new(label);m.use_nodes=True
        p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=.85
        return m
    blue=material('blue screen shell',(.14,.27,.62));navy=material('navy bezel',(.035,.085,.19));mint=material('mint display',(.13,.71,.57));cream=material('shell icon',(.8,.97,.86));rib=material('shell ribs',(.24,.54,.45))
    angle=math.radians(24)
    def point(x,v,d):return (x,.35+math.sin(angle)*v+math.cos(angle)*d,-.37+math.cos(angle)*v-math.sin(angle)*d)
    def rectangle(w,h,r,center=.47):
        result=[]
        for x,z,start in [(w/2-r,center+h/2-r,0),(-w/2+r,center+h/2-r,90),(-w/2+r,center-h/2+r,180),(w/2-r,center-h/2+r,270)]:
            for i in range(12):
                a=math.radians(start+i*90/11);result.append((x+r*math.cos(a),z+r*math.sin(a)))
        return result
    def mesh(label,vs,fs,m):
        me=bpy.data.meshes.new(label);me.from_pydata(vs,[],fs);me.update();o=bpy.data.objects.new(label,me);bpy.context.collection.objects.link(o);me.materials.append(m)
        uv=me.uv_layers.new(name='UVMap')
        for f in me.polygons:
            for li in f.loop_indices:
                v=me.vertices[me.loops[li].vertex_index].co;uv.data[li].uv=(v.x/1.5+.5,(v.z+.5)/1.1)
            f.use_smooth=True
        objects.append(o);return o
    loops=[(1.42,.94,.055,-.047),(1.47,.98,.075,-.025),(1.47,.98,.075,.025),(1.42,.94,.055,.047)]
    vs=[point(x,v,d) for w,h,r,d in loops for x,v in rectangle(w,h,r)];n=48
    fs=[(j*n+i,j*n+(i+1)%n,(j+1)*n+(i+1)%n,(j+1)*n+i) for j in range(3) for i in range(n)]
    fs.append(tuple(range(3*n,4*n)));mesh('retopologized rounded screen case',vs,fs,blue)
    outer=rectangle(1.42,.94,.055);inner=rectangle(1.29,.77,.035)
    mesh('continuous screen bezel',[point(x,v,-.047) for x,v in outer+inner],[(i,(i+1)%n,n+(i+1)%n,n+i) for i in range(n)],navy)
    mesh('clean display',[point(x,v,-.049) for x,v in inner],[tuple(range(n))],mint)
    icon=[(-.09,.29),(-.26,.43),(-.24,.60),(-.14,.71),(0,.75),(.14,.71),(.24,.60),(.26,.43),(.09,.29)]
    mesh('shell on display',[point(x,v,-.052) for x,v in icon],[tuple(range(len(icon)))],cream)
    for x,v in [(-.24,.60),(-.14,.71),(0,.75),(.14,.71),(.24,.60)]:
        c=bpy.data.curves.new('shell rib','CURVE');c.dimensions='3D';c.bevel_depth=.004;c.bevel_resolution=2
        s=c.splines.new('POLY');s.points.add(1)
        for p,co in zip(s.points,[point(0,.29,-.054),point(x,v,-.054)]):p.co=(*co,1)
        ob=bpy.data.objects.new('shell rib',c);bpy.context.collection.objects.link(ob);c.materials.append(rib)
        bpy.ops.object.select_all(action='DESELECT');ob.select_set(True);bpy.context.view_layer.objects.active=ob;bpy.ops.object.convert(target='MESH');ob=bpy.context.object
        # 曲线转换生成其 UV。
        if not ob.data.uv_layers:ob.data.uv_layers.new(name='UVMap')
        objects.append(ob)
points=[o.matrix_world@v.co for o in objects for v in o.data.vertices]
mins=[min(v[i] for v in points) for i in range(3)];maxs=[max(v[i] for v in points) for i in range(3)]
width=maxs[0]-mins[0];scale={'speaker':.43,'laptop':.75}.get(name,width)/width
offset=Vector(((mins[0]+maxs[0])/2,(mins[1]+maxs[1])/2,mins[2]))
for o in objects:
    o.location=(o.location-offset)*scale;o.scale*=scale
    bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
    bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
    o['assetId']=name;o['sourceBackend']='Hunyuan3D-2.1' if name!='table-speaker-base' else 'existing Blender table';o['humanReview']='pending'
    if not o.data.uv_layers:raise RuntimeError('UV missing: '+o.name)
points=[o.matrix_world@v.co for o in objects for v in o.data.vertices]
mins=[min(v[i] for v in points) for i in range(3)];maxs=[max(v[i] for v in points) for i in range(3)]
path=out/f'{name}.glb'
bpy.ops.object.select_all(action='DESELECT')
for o in objects:o.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(path),export_format='GLB',use_selection=True,export_extras=True,export_yup=True)
for im in bpy.data.images:
    if im.source=='FILE':im.pack()
bpy.ops.wm.save_as_mainfile(filepath=str(out/f'{name}.blend'))
record={'asset':name,'state':'review','humanReview':'pending','sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'runtimeSha256':hashlib.sha256(path.read_bytes()).hexdigest(),'triangles':sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in objects),'dimensionsYUp':[maxs[0]-mins[0],maxs[2]-mins[2],maxs[1]-mins[1]],'origin':'bottom-center','repairs':['remove generated background plates','preserve painted base UV','normalize physical size and contact pivot']+(['rebuild overlapping screen as rounded continuous shell, bezel and shell icon'] if name=='laptop' else ['merge coincident vertices','recalculate normals']),'removedMeshes':removed}
(out/f'{name}-runtime.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n')
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=16;scene.cycles.device='CPU'
scene.world=bpy.data.worlds.new('review world');scene.world.color=(.7,.7,.7)
scene.render.resolution_x=512;scene.render.resolution_y=512;scene.render.resolution_percentage=100;scene.view_settings.view_transform='Standard'
height=maxs[2];size=max(record['dimensionsYUp']);target=Vector((0,0,height*.5))
for loc,energy in [((-2,-3,4),200),((3,1,3),140)]:
    bpy.ops.object.light_add(type='AREA',location=loc);lamp=bpy.context.object;lamp.data.energy=energy;lamp.data.size=3;lamp.rotation_euler=(target-lamp.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add();cam=bpy.context.object;cam.data.type='ORTHO';cam.data.ortho_scale=size*1.4;scene.camera=cam
for view,loc in [('front',(0,-4,height*.8)),('quarter',(3,-4,height*1.3))]:
    cam.location=loc;cam.rotation_euler=(target-cam.location).to_track_quat('-Z','Y').to_euler();scene.render.filepath=str(out/f'{name}-{view}.png');bpy.ops.render.render(write_still=True)
print('REFINED',name,record)
