"""参考图驱动的 v6 建筑精修与自有 GPU 家具装配。Blender Z-up，导出 glTF Y-up。"""
import bpy
import bmesh
import json
import math
import pathlib
import sys
import numpy as np
from mathutils import Vector

ROOT = pathlib.Path(sys.argv[sys.argv.index('--') + 1])
OUT = ROOT / 'out'
OUT.mkdir(exist_ok=True)
config = json.loads((ROOT / 'references.json').read_text(encoding='utf-8-sig'))
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(ROOT / 'base-house.glb'))
for o in list(bpy.context.scene.objects):
    if o.type == 'MESH':
        world=o.matrix_world.copy();o.parent=None;o.matrix_world=world
        bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active=o
        bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
        if o.data.attributes.get('custom_normal'):
            o.data.attributes.remove(o.data.attributes['custom_normal'])

def material(name, texture, rough=.9, color=(1,1,1,1)):
    m=bpy.data.materials.new(name); m.use_nodes=True
    bs=m.node_tree.nodes.get('Principled BSDF'); bs.inputs['Base Color'].default_value=color
    bs.inputs['Roughness'].default_value=rough; bs.inputs['Specular IOR Level'].default_value=.22
    n=m.node_tree.nodes.new('ShaderNodeTexImage'); n.image=bpy.data.images.load(str(ROOT/'refs'/texture),check_existing=True)
    m.node_tree.links.new(n.outputs['Color'],bs.inputs['Base Color'])
    return m

stone=material('v7_blue_volcanic_stone','stone-weathered.png')
tiles=material('v7_emerald_glazed_tiles','tile-green.png',.83)
wood=material('v7_worn_oak','wood-planks.png',.85)
greenwood=material('v7_green_painted_wood','green-painted-wood.png',.86)
rugmat=material('v7_olive_woven_rug','rug-surface.png',.98)
portraitmat=material('v7_artist_portrait','portrait.png',.95)
floortile=material('v7_grey_green_floor_tiles','floor-tile.png',.93)
bluefabric=material('v7_blue_woven_cover','blue-fabric.png',.97)
curtainmat=material('v7_blue_white_striped_curtain','blue-striped-curtain.png',.94)

def uv(o, cylindrical=False, scale=1.0):
    if not o.data.uv_layers: o.data.uv_layers.new(name='UVMap')
    layer=o.data.uv_layers.active
    for p in o.data.polygons:
        axis=max(range(3),key=lambda a:abs(p.normal[a]))
        for index in p.loop_indices:
            v=o.data.vertices[o.data.loops[index].vertex_index].co
            if cylindrical:
                layer.data[index].uv=((math.atan2(v.y,v.x)+math.pi)/math.tau*scale,v.z/2)
            else:
                pairs=((v.y,v.z),(v.x,v.z),(v.x,v.y))
                a,b=pairs[axis]; layer.data[index].uv=(a/scale,b/scale)

def set_material(o,m,cyl=False,scale=1):
    o.data.materials.clear(); o.data.materials.append(m)
    for p in o.data.polygons: p.material_index=0
    uv(o,cyl,scale)

def remove_prefix(prefix):
    for o in list(bpy.context.scene.objects):
        if o.type=='MESH' and o.name.startswith(prefix): bpy.data.objects.remove(o,do_unlink=True)

shells=[]
for o in list(bpy.context.scene.objects):
    if o.type!='MESH': continue
    name=o.name
    if name in ('shell_main','shell_cutaway_cover'):
        slots=[p.material_index for p in o.data.polygons]
        shells.append(o); o.data.materials.clear();o.data.materials.append(stone);o.data.materials.append(tiles)
        for p,index in zip(o.data.polygons,slots):p.material_index=min(index,1)
        # 摩艾头顶改为圆角平顶，浴室后墙保持竖直；不保留旧椭圆穹顶。
        inner_indices={i for p in o.data.polygons if p.material_index==1 for i in p.vertices}
        for index,vertex in enumerate(o.data.vertices):
            v=vertex.co
            if v.z<=3.9:continue
            r=math.hypot(v.x,v.y)
            if r<.01:continue
            target=(1.1 if index in inner_indices else 1.3)-.05*((v.z-3.9)/.72)
            v.x*=target/r;v.y*=target/r
        bm=bmesh.new();bm.from_mesh(o.data);bm.normal_update()
        for f in bm.faces:
            c=f.calc_center_median();radial=Vector((c.x,c.y,0))
            dot=f.normal.dot(radial)
            if (f.material_index==0 and dot<-.1) or (f.material_index==1 and dot>.1):f.normal_flip()
        bm.to_mesh(o.data);bm.free()
        for p in o.data.polygons:p.use_smooth=True
        uv(o,True,2.8)
    elif name.startswith('shell_'):
        set_material(o,stone,False,.9)
        if name in ('shell_nose','shell_ear_L','shell_ear_R','shell_eyebrow'):
            if name=='shell_nose':
                zs=[v.co.z for v in o.data.vertices];top=max(zs);low=top-(top-min(zs))*1.7
                for v in o.data.vertices:
                    v.co.z=top-(top-v.co.z)*1.7
                    t=(top-v.co.z)/max(top-low,1e-6);v.co.x*=.7+.65*t
                    v.co.y-=.08*t
            if name in ('shell_ear_L','shell_ear_R'):
                xs=[v.co.x for v in o.data.vertices];ys=[v.co.y for v in o.data.vertices];zs=[v.co.z for v in o.data.vertices]
                center=Vector(((min(xs)+max(xs))/2,(min(ys)+max(ys))/2,(min(zs)+max(zs))/2));size=Vector((max(xs)-min(xs),max(ys)-min(ys),max(zs)-min(zs)))
                for v in o.data.vertices:
                    v.co=Vector([(v.co[i]-center[i])*[.38,.53,1.25][i]/size[i]+[center.x,center.y,2.8][i] for i in range(3)])
            # glTF 硬边会拆开相同位置的顶点；先焊接再倒角，才能得到实际圆角而非无效 modifier。
            bm=bmesh.new();bm.from_mesh(o.data);bmesh.ops.remove_doubles(bm,verts=bm.verts,dist=.0001);bmesh.ops.recalc_face_normals(bm,faces=bm.faces);bm.to_mesh(o.data);bm.free()
            mod=o.modifiers.new('stone_edge_wear','BEVEL');mod.width=.035;mod.segments=3
            bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=mod.name)
    elif name.startswith('floor_'):
        level=int(name[-1]); set_material(o,wood if level in (2,3) else floortile,False,1.6)
    elif name.startswith('stairs_'):
        set_material(o,wood,False,.7)
        for v in o.data.vertices:
            if v.co.z>.15: v.co.z=.15+(v.co.z-.15)*3.45/3.6
    elif name.startswith('door_'):
        set_material(o,wood,False,.6)
        for v in o.data.vertices:
            v.co.x*=.72; v.co.z=.15+(v.co.z-.15)*.56
    else:
        for m in o.data.materials:
            if not m or not m.use_nodes: continue
            bs=m.node_tree.nodes.get('Principled BSDF')
            if not bs: continue
            if 'wood' in m.name.lower() or 'bamboo' in m.name.lower():
                set_material(o,wood,False,.65); break

# 完整外壳与室内剖切保留墙分别导出，剖切不再删除全部背景石墙。
walls=[]
for shell in shells:
    o=shell.copy();o.data=shell.data.copy();bpy.context.collection.objects.link(o);o.name='wall_'+shell.name
    bm=bmesh.new();bm.from_mesh(o.data)
    discarded=[]
    for f in bm.faces:
        c=f.calc_center_median();angle=math.atan2(c.y,c.x)
        delta=(angle-math.radians(-110)+math.pi)%math.tau-math.pi
        if abs(delta)<math.radians(83): discarded.append(f)
    bmesh.ops.delete(bm,geom=discarded,context='FACES')
    edges=[e for e in bm.edges if e.is_boundary]
    if edges:bmesh.ops.holes_fill(bm,edges=edges,sides=0)
    bm.to_mesh(o.data);bm.free()
    if len(o.data.polygons):walls.append(o)
    else:bpy.data.objects.remove(o,do_unlink=True)

# 软包、浴缸、电视等以本轮图生网格替换旧占位；未完成的候选不会自动假称成功。
adopted=[]
for item in config['items']:
    if item.get('kind')=='texture': continue
    src=ROOT/'props'/(item['id']+'.glb')
    if not src.exists(): continue
    room=item['room']; prefix=room+'_'+item['id'].replace('old-tv','old-tv')+'_'
    if item['id']=='bed': prefix='bedroom_bed_'  # 保留 bed-rug
    remove_prefix(prefix)
    before=set(bpy.context.scene.objects)
    bpy.ops.import_scene.gltf(filepath=str(src))
    imported=[o for o in set(bpy.context.scene.objects)-before if o.type=='MESH']
    for o in imported:
        world=o.matrix_world.copy();o.parent=None;o.matrix_world=world
        bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
        bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
    if item['id']=='bookshelf':
        for o in imported:
            zs=[v.co.z for v in o.data.vertices];zcut=min(zs)+(max(zs)-min(zs))*.015
            bm=bmesh.new();bm.from_mesh(o.data)
            bmesh.ops.delete(bm,geom=[f for f in bm.faces if max(v.co.z for v in f.verts)<zcut],context='FACES');bm.to_mesh(o.data);bm.free()
            for m in o.data.materials:
                bs=m.node_tree.nodes.get('Principled BSDF') if m and m.use_nodes else None
                if not bs or not bs.inputs['Base Color'].is_linked:continue
                node=bs.inputs['Base Color'].links[0].from_node
                if node.type!='TEX_IMAGE':continue
                image=node.image;w,h=image.size;pixels=np.array(image.pixels[:],dtype=np.float32).reshape(h,w,4)
                rgb=pixels[:,:,:3];mask=(rgb.max(2)-rgb.min(2)<.15)&(rgb.mean(2)>.45)
                palette=np.array([[.5,.65,.53],[.6,.42,.3],[.36,.5,.62],[.64,.57,.35],[.56,.42,.52]],dtype=np.float32)
                colors=palette[(np.indices((h,w))[1]//max(1,w//15))%len(palette)]
                rgb[mask]*=colors[mask];image.pixels[:]=pixels.flatten();image.update()
    bounds=[o.matrix_world@Vector(c) for o in imported for c in o.bound_box]
    lo=Vector([min(v[i] for v in bounds) for i in range(3)]);hi=Vector([max(v[i] for v in bounds) for i in range(3)])
    span=hi-lo; size=item['size']; center=Vector(((lo.x+hi.x)/2,(lo.y+hi.y)/2,lo.z))
    rot=math.radians(item.get('rotation',0)); position=Vector(item['position'])
    for k,o in enumerate(imported):
        if o.data.attributes.get('custom_normal'):o.data.attributes.remove(o.data.attributes['custom_normal'])
        for v in o.data.vertices:
            p=v.co-center; p=Vector([p[i]*size[i]/max(span[i],1e-6) for i in range(3)])
            v.co=Vector((p.x*math.cos(rot)-p.y*math.sin(rot),p.x*math.sin(rot)+p.y*math.cos(rot),p.z))+position
        o.name=prefix+str(k)
        triangles=sum(len(p.vertices)-2 for p in o.data.polygons)
        if triangles>5500:
            mod=o.modifiers.new('v7_runtime_budget','DECIMATE');mod.ratio=5500/triangles
            bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=mod.name)
        for p in o.data.polygons: p.use_smooth=True
        if item['id']=='bed':
            o.data.update();slot=len(o.data.materials);o.data.materials.append(bluefabric)
            original=next((n.image for m in o.data.materials[:-1] if m and m.use_nodes for n in m.node_tree.nodes if n.type=='TEX_IMAGE' and n.image and n.image.colorspace_settings.name=='sRGB'),None)
            pixels=np.array(original.pixels[:],dtype=np.float32).reshape(original.size[1],original.size[0],4) if original else None
            for p in o.data.polygons:
                center=sum((o.data.vertices[i].co for i in p.vertices),Vector())/len(p.vertices)
                if 2.64<center.z<2.87 and -.78<center.x<.08 and -.18<center.y<.55:
                    if pixels is not None:
                        texuv=sum((o.data.uv_layers.active.data[li].uv for li in p.loop_indices),Vector((0,0)))/len(p.loop_indices)
                        rgb=pixels[int(texuv.y%1*original.size[1]),int(texuv.x%1*original.size[0]),:3]
                        if rgb.mean()>.62 and rgb.max()-rgb.min()<.22:continue
                    p.material_index=slot
                    for li in p.loop_indices:
                        co=o.data.vertices[o.data.loops[li].vertex_index].co
                        o.data.uv_layers.active.data[li].uv=((co.x+.78)/.86,(co.y+.18)/.73)
    adopted.append(item['id'])

# 原柜体按四层层高与圆柱内径重新收纳，避免穿出后墙及上层楼板。
def relocate(prefix,target,size):
    obs=[o for o in bpy.context.scene.objects if o.type=='MESH' and o.name.startswith(prefix)]
    if not obs:return
    coords=[v.co for o in obs for v in o.data.vertices]
    lo=Vector([min(v[i] for v in coords) for i in range(3)]);hi=Vector([max(v[i] for v in coords) for i in range(3)])
    center=Vector(((lo.x+hi.x)/2,(lo.y+hi.y)/2,lo.z));span=hi-lo
    for o in obs:
        for v in o.data.vertices:v.co=Vector([(v.co[i]-center[i])*size[i]/max(span[i],1e-6)+target[i] for i in range(3)])
relocate('kitchen_cabinets_',(-.5,.85,.15),(1.2,.42,.66))
relocate('kitchen_stove_',(-.67,.67,.15),(.42,.44,.7))
relocate('kitchen_sink_',(-.13,.72,.15),(.42,.44,.7))
relocate('kitchen_fridge_',(.55,.75,.15),(.4,.45,.95))
relocate('kitchen_dining-table_',(-.2,-.3,.15),(.75,.65,.57))
relocate('kitchen_stool_',(-.2,-.3,.15),(.96,.3,.4))
relocate('bedroom_nightstand-L_',(-.93,.28,2.4),(.27,.27,.69))
relocate('bedroom_nightstand-R_',(.18,.65,2.4),(.27,.27,.69))
relocate('bedroom_dresser_',(.45,.6,2.4),(.38,.3,.6))
relocate('bedroom_bed-rug_',(-.33,-.55,2.405),(.65,.4,.015))
relocate('art_plinth-1_',(.76,-.62,1.2),(.27,.27,.3))
relocate('art_plinth-2_',(.76,-.62,2.4),(.27,.27,.3))
relocate('art_sculpture_',(.76,-.62,1.5),(.23,.23,.37))
relocate('bath_faucet_',(-.65,.63,3.6),(.18,.2,.62))
remove_prefix('living_wall-picture_')
for o in list(bpy.context.scene.objects):
    if o.type=='MESH' and o.name.startswith('art_plinth'):set_material(o,wood,False,.4)
    if o.type=='MESH' and ('statue-' in o.name or o.name.startswith('art_sculpture')):set_material(o,stone,False,.45)
    if o.type=='MESH' and o.name.startswith('kitchen_cabinets'):set_material(o,greenwood,False,.5)
    if o.type=='MESH' and ('bed-rug' in o.name or o.name.startswith('living_rug')):
        set_material(o,rugmat,False,1)
        xs=[v.co.x for v in o.data.vertices];ys=[v.co.y for v in o.data.vertices]
        xlo,xhi,ylo,yhi=min(xs),max(xs),min(ys),max(ys)
        for index,loop in enumerate(o.data.loops):
            v=o.data.vertices[loop.vertex_index].co
            o.data.uv_layers.active.data[index].uv=((v.x-xlo)/max(xhi-xlo,1e-6),(v.y-ylo)/max(yhi-ylo,1e-6))
        if o.name.startswith('living_rug'):
            mod=o.modifiers.new('woven_rug_budget','DECIMATE');mod.ratio=.075
            bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=mod.name)
    if o.type=='MESH' and o.name.startswith('living_coffee-table'):
        set_material(o,wood,False,.55)
        mod=o.modifiers.new('table_budget','DECIMATE');mod.ratio=.34
        bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=mod.name)

# 原雕像网格熔接成连续石雕表面，保留长鼻与眉眼造型，不保留悬浮的拼接球体。
for prefix in ('kitchen_statue-L_','kitchen_statue-R_','art_sculpture_'):
    obs=[o for o in bpy.context.scene.objects if o.type=='MESH' and o.name.startswith(prefix)]
    if not obs:continue
    bpy.ops.object.select_all(action='DESELECT')
    for o in obs:o.select_set(True)
    bpy.context.view_layer.objects.active=obs[0];bpy.ops.object.join();o=bpy.context.object
    remesh=o.modifiers.new('stone_sculpture_union','REMESH');remesh.mode='VOXEL';remesh.voxel_size=.009
    bpy.ops.object.modifier_apply(modifier=remesh.name)
    smooth=o.modifiers.new('stone_surface_finish','SMOOTH');smooth.factor=.5;smooth.iterations=4
    bpy.ops.object.modifier_apply(modifier=smooth.name)
    mod=o.modifiers.new('sculpture_budget','DECIMATE');tris=sum(len(p.vertices)-2 for p in o.data.polygons);mod.ratio=min(1,2500/max(tris,1))
    bpy.ops.object.modifier_apply(modifier=mod.name);set_material(o,stone,False,.4)
    for p in o.data.polygons:p.use_smooth=True
    if prefix.startswith('kitchen_statue'):o.name=prefix.replace('kitchen_','entrance_')+'continuous'
    else:
        upper=o.copy();upper.data=o.data.copy();upper.name='art_sculpture_upper';bpy.context.collection.objects.link(upper)
        for v in upper.data.vertices:v.co.z+=1.2

# 将原窄螺旋踏步精修为贴右墙的连续弧形梯段；每段十三步与平台精确齐平。
remove_prefix('stairs_')
def mesh_object(name,verts,faces,mat):
    mesh=bpy.data.meshes.new(name);mesh.from_pydata(verts,[],faces);mesh.update()
    obj=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(obj)
    set_material(obj,mat,False,.65)
    return obj

# 楼板保留完整前侧行走面，只为右侧连续梯段留洞；不让地毯跨在旧剖切缺口上。
for level,(bottom,top,radius) in enumerate([(0,.15,1.341),(1.08,1.2,1.279),(2.28,2.4,1.208),(3.48,3.6,1.137)],1):
    remove_prefix('floor_'+str(level))
    outline=[]
    for k in range(129):
        angle=math.tau*k/128;x=radius*math.cos(angle);y=radius*math.sin(angle)
        if y>=-.88:outline.append((x,y))
    # 圆弧被前侧截平面裁切后的两个交点。
    cross=math.sqrt(radius*radius-.88*.88)
    outline.extend([(-cross,-.88),(cross,-.88)])
    outline=sorted(set(outline),key=lambda p:math.atan2(p[1],p[0]))
    n=len(outline);verts=[(x,y,z) for z in (bottom,top) for x,y in outline]
    faces=[tuple(reversed(range(n))),tuple(range(n,n*2))]+[(k,(k+1)%n,(k+1)%n+n,k+n) for k in range(n)]
    floor=mesh_object('floor_'+str(level),verts,faces,wood if level in (2,3) else floortile)
    bpy.ops.mesh.primitive_cylinder_add(vertices=64,radius=.47,depth=.8,location=(.68,.03,top))
    cutter=bpy.context.object
    mod=floor.modifiers.new('right_stairwell','BOOLEAN');mod.operation='DIFFERENCE';mod.solver='EXACT';mod.object=cutter
    bpy.context.view_layer.objects.active=floor;bpy.ops.object.modifier_apply(modifier=mod.name);bpy.data.objects.remove(cutter,do_unlink=True)
    uv(floor,False,1.6)

# 拱形内门、肖像画与木质画框放在各层后墙，画面为本轮自有 GPU 生成纹理。
for level,prefix,x,y,z in [(2,'living',-.52,1.02,1.87),(3,'bedroom',-.75,.75,2.97)]:
    w,h=.3,.39
    ob=mesh_object(prefix+'_portrait',[(x-w/2,y-.012,z-h/2),(x+w/2,y-.012,z-h/2),(x+w/2,y-.012,z+h/2),(x-w/2,y-.012,z+h/2)],[(0,1,2,3)],portraitmat)
    for i,loop in enumerate(ob.data.loops):ob.data.uv_layers.active.data[i].uv=[(0,0),(1,0),(1,1),(0,1)][i]
    for k,(cx,cz,dx,dz) in enumerate([(x,z-h/2,w+.045,.025),(x,z+h/2,w+.045,.025),(x-w/2,z,.025,h),(x+w/2,z,.025,h)]):
        frame=mesh_object(prefix+'_portrait_frame_'+str(k),[(cx+vx,y+vy,cz+vz) for vy in (-.018,.018) for vx,vz in [(-dx/2,-dz/2),(dx/2,-dz/2),(dx/2,dz/2),(-dx/2,dz/2)]],[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],wood)
        mod=frame.modifiers.new('frame_edge','BEVEL');mod.width=.004;mod.segments=2
        bpy.context.view_layer.objects.active=frame;bpy.ops.object.modifier_apply(modifier=mod.name)
for prefix,target in [('bath',(.05,.91,3.6)),('bedroom',(.4,.8,2.4))]:
    copies=[]
    for name in ('door_frame','door_panel','door_handle'):
        old=bpy.data.objects.get(name)
        if not old:continue
        o=old.copy();o.data=old.data.copy();o.name=prefix+'_arch_'+name;bpy.context.collection.objects.link(o);copies.append(o)
    coords=[v.co for o in copies for v in o.data.vertices]
    lo=Vector([min(v[i] for v in coords) for i in range(3)]);hi=Vector([max(v[i] for v in coords) for i in range(3)]);span=hi-lo;center=Vector(((lo.x+hi.x)/2,(lo.y+hi.y)/2,lo.z))
    for o in copies:
        for v in o.data.vertices:v.co=Vector([(v.co[i]-center[i])*[.38,.06,.76][i]/span[i]+target[i] for i in range(3)])
        uv(o,False,.4)

def rail(name,coords,radius):
    curve=bpy.data.curves.new(name,'CURVE');curve.dimensions='3D';curve.bevel_depth=radius;curve.bevel_resolution=3
    line=curve.splines.new('POLY');line.points.add(len(coords)-1)
    for point,co in zip(line.points,coords):point.co=(*co,1)
    ob=bpy.data.objects.new(name,curve);bpy.context.collection.objects.link(ob);ob.data.materials.append(wood)
    bpy.ops.object.select_all(action='DESELECT');ob.select_set(True);bpy.context.view_layer.objects.active=ob;bpy.ops.object.convert(target='MESH');uv(ob,False,.65)
    return ob
levels=[.15,1.2,2.4,3.6];stair_records=[]
for level in range(3):
    a0=math.radians(-120 if level%2==0 else 120);a1=-a0
    low,high=levels[level:level+2];coords=[]
    for k in range(13):
        t0=k/13;t1=(k+1)/13;z=low+(high-low)*t1
        points=[]
        for height in (z-.055,z):
            for angle,r in [(a0+(a1-a0)*t0,.14),(a0+(a1-a0)*t1,.14),(a0+(a1-a0)*t1,.43),(a0+(a1-a0)*t0,.43)]:
                points.append((.68+r*math.cos(angle),.03+r*math.sin(angle),height))
        ob=mesh_object(f'stairs_tread_{level}_{k}',points,[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],wood)
        mod=ob.modifiers.new('worn_tread_edges','BEVEL');mod.width=.007;mod.segments=2
        bpy.context.view_layer.objects.active=ob;bpy.ops.object.modifier_apply(modifier=mod.name)
        stair_records.append({'level':level,'step':k,'walkHeight':z})
        angle=a0+(a1-a0)*t1
        for r in (.16,.41):
            x=.68+r*math.cos(angle);y=.03+r*math.sin(angle)
            rail(f'stairs_baluster_{level}_{k}_{r}',[(x,y,z),(x,y,z+.48)],.009)
    for r in (.16,.41):
        coords=[]
        for k in range(81):
            t=k/80;a=a0+(a1-a0)*t;coords.append((.68+r*math.cos(a),.03+r*math.sin(a),low+(high-low)*t+.48))
        rail(f'stairs_curved_handrail_{level}_{r}',coords,.018)
    for t in (0,1):
        a=a0+(a1-a0)*t;z=low+(high-low)*t
        x=.68+.29*math.cos(a);y=.03+.29*math.sin(a)
        mesh_object(f'stairs_landing_{level}_{t}',[(x+dx,y+dy,z+dz) for dz in (-.06,0) for dx,dy in [(-.32,-.16),(.18,-.16),(.18,.16),(-.32,.16)]],[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],wood)

# 浴帘转向观众；洗手池收进上层内壁，避免与墙体穿插。
for prefix,target,scale,rotation in [('bath_shower-curtain_',(.35,.25,3.6),(.8,.8,1),90),('bath_washbasin_',(.75,.18,3.6),(.65,.65,.7),0)]:
    objects=[o for o in bpy.context.scene.objects if o.type=='MESH' and o.name.startswith(prefix)]
    if not objects: continue
    coords=[v.co for o in objects for v in o.data.vertices]; lo=Vector([min(v[i] for v in coords) for i in range(3)]);hi=Vector([max(v[i] for v in coords) for i in range(3)])
    center=Vector(((lo.x+hi.x)/2,(lo.y+hi.y)/2,lo.z));a=math.radians(rotation)
    for o in objects:
        for v in o.data.vertices:
            p=v.co-center;p=Vector([p[i]*scale[i] for i in range(3)])
            v.co=Vector((p.x*math.cos(a)-p.y*math.sin(a),p.x*math.sin(a)+p.y*math.cos(a),p.z))+Vector(target)
relocate('bath_shower-curtain_',(.34,.65,3.6),(.7,.06,.7))
for o in bpy.context.scene.objects:
    if o.type=='MESH' and o.name.startswith('bath_shower-curtain_'):
        set_material(o,curtainmat,False,.7)

# 椭圆洗手盆为连续双壁曲面，内腔与爪足浴缸共用真实搪瓷贴图。
remove_prefix('bath_washbasin_')
enamel=next(o.data.materials[0] for o in bpy.context.scene.objects if o.type=='MESH' and o.name.startswith('bath_bathtub_'))
def oval_profile(name,profile):
    verts=[(.75+r*math.cos(math.tau*k/64),.18+.8*r*math.sin(math.tau*k/64),z) for r,z in profile for k in range(64)]
    faces=[]
    for row in range(len(profile)-1):
        for k in range(64):faces.append((row*64+k,row*64+(k+1)%64,(row+1)*64+(k+1)%64,(row+1)*64+k))
    ob=mesh_object(name,verts,faces,enamel)
    bm=bmesh.new();bm.from_mesh(ob.data);bmesh.ops.recalc_face_normals(bm,faces=bm.faces);bm.to_mesh(ob.data);bm.free()
    for p in ob.data.polygons:p.use_smooth=True
oval_profile('bath_washbasin_curved_pedestal',[(0,3.6),(.085,3.6),(.09,3.64),(.045,3.7),(.035,3.96),(.08,4.0),(0,4.0)])
oval_profile('bath_washbasin_open_bowl',[(.03,3.985),(.1,3.98),(.17,4.065),(.185,4.09),(.175,4.105),(.157,4.09),(.12,4.03),(.04,4.005),(.03,3.985)])
tap=rail('bath_washbasin_faucet',[(.75,.31,4.05),(.75,.31,4.17),(.75,.28,4.18),(.75,.23,4.18)],.01)
chrome=bpy.data.materials.new('v7_brushed_faucet_chrome');chrome.use_nodes=True
bs=chrome.node_tree.nodes.get('Principled BSDF');bs.inputs['Base Color'].default_value=(.32,.38,.39,1);bs.inputs['Metallic'].default_value=.75;bs.inputs['Roughness'].default_value=.28
set_material(tap,chrome,False,.15)

# 正门绕真实左门轴打开，避免绕整屋原点旋转。
panel=bpy.data.objects.get('door_panel')
if panel:
    coords=[v.co for v in panel.data.vertices]; hinge=Vector((min(v.x for v in coords),sum(v.y for v in coords)/len(coords),min(v.z for v in coords)))
    for v in panel.data.vertices:v.co-=hinge
    panel.location=hinge

# 同材质的小网格合并为房间内批次，保留交互门、楼板、外壳及墙面语义。
groups={}
for o in list(bpy.context.scene.objects):
    if o.type!='MESH' or o.name.startswith(('shell_','wall_','door_','floor_')):continue
    prefix=o.name.split('_')[0]; key=(prefix,tuple(m.name if m else '' for m in o.data.materials))
    groups.setdefault(key,[]).append(o)
for index,((prefix,_),objects) in enumerate(groups.items()):
    if len(objects)<2:continue
    bpy.ops.object.select_all(action='DESELECT')
    for o in objects:o.select_set(True)
    bpy.context.view_layer.objects.active=objects[0];bpy.ops.object.join();bpy.context.object.name=prefix+'_batch_'+str(index)

all_meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
features=[]
for name in ('shell_ear_L','shell_ear_R','shell_nose'):
    old=bpy.data.objects.get(name)
    if old:
        feature=old.copy();feature.data=old.data.copy();feature.name=name.replace('shell_','feature_');bpy.context.collection.objects.link(feature);features.append(feature)
for o in all_meshes:o.data.name=o.name
for image in bpy.data.images:
    if image.source=='FILE':
        if max(image.size)>512:image.scale(512,512)
        image.pack()

def export(name,objects):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objects:o.select_set(True)
    bpy.ops.export_scene.gltf(filepath=str(OUT/name),export_format='GLB',use_selection=True,export_materials='EXPORT')

export('squidward-house.glb',[o for o in all_meshes if not o.name.startswith('wall_')])
export('squidward-interior.glb',[o for o in all_meshes if not o.name.startswith('shell_')]+features)
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'squidward-reference-v7.blend'))
(OUT/'assembly.json').write_text(json.dumps({'adoptedGPUAssets':adopted,'meshCount':len(all_meshes),'wallCount':len(walls),'status':'review'},ensure_ascii=False,indent=2),encoding='utf-8')
