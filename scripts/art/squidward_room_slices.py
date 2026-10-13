"""由原石壳曲面生成后侧内墙；按真实楼层裁开连续楼梯，不替换原家具。"""
from pathlib import Path
import bpy,bmesh,sys,json,hashlib
from mathutils import Matrix

source,out=map(Path,sys.argv[sys.argv.index('--')+1:]);out.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True);bpy.ops.import_scene.gltf(filepath=str(source))
for obj in list(bpy.context.scene.objects):
    if obj.type=='MESH':obj.data.transform(obj.matrix_world);obj.matrix_world=Matrix.Identity(4)
layers=[('kitchen',.15,1.08,(.72,.75,.67,1)),('living',1.20,2.28,(.61,.73,.71,1)),('bedroom',2.40,3.48,(.65,.70,.78,1)),('bath',3.60,4.52,(.66,.78,.79,1))]

def slice_mesh(original,name,lo,hi,wall=False):
    obj=original.copy();obj.data=original.data.copy();obj.name=name;bpy.context.collection.objects.link(obj)
    bm=bmesh.new();bm.from_mesh(obj.data)
    def cut(point,normal):
        bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),plane_co=point,plane_no=normal,clear_inner=True,dist=1e-6)
    cut((0,0,lo),(0,0,1));cut((0,0,hi),(0,0,-1))
    if wall:
        # glTF 正面 +Z 对应 Blender -Y；保留后半圈和短侧墙，前侧开敞。
        cut((0,-.12,0),(0,1,0))
        bm.normal_update()
        # 只采用原壳外曲面，再加薄壁；不把原壳内外两片当两道内墙。
        remove=[]
        for face in bm.faces:
            center=face.calc_center_median();radial=center.copy();radial.z=0
            if radial.length and face.normal.dot(radial.normalized())<.1:remove.append(face)
        bmesh.ops.delete(bm,geom=remove,context='FACES')
        bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.000001)
        for vertex in bm.verts:vertex.co.x*=.97;vertex.co.y*=.97
        bmesh.ops.solidify(bm,geom=list(bm.faces),thickness=-.045)
    bm.to_mesh(obj.data);bm.free()
    if not obj.data.polygons:bpy.data.objects.remove(obj,do_unlink=True);return None
    obj['floorSlice']=[lo,hi];obj['derivedFrom']=original.name
    return obj

shell=bpy.data.objects.get('shell_main');records=[]
for room,lo,hi,color in layers:
    wall=slice_mesh(shell,room+'_wall_back',lo,hi,True)
    mat=bpy.data.materials.new(room+' interior plaster');mat.use_nodes=True
    shader=mat.node_tree.nodes.get('Principled BSDF');shader.inputs['Base Color'].default_value=color;shader.inputs['Roughness'].default_value=.92
    mat.use_backface_culling=False;wall.data.materials.clear();wall.data.materials.append(mat)
    records.append({'room':room,'wall':wall.name,'height':[lo,hi],'surfaceSource':'shell_main','frontOpening':'Blender Y < -0.12'})
for obj in list(bpy.context.scene.objects):
    if obj.type!='MESH' or not obj.name.startswith('stairs_'):continue
    # 立柱、扶手和踏步均真正裁成层内几何；包围盒相交不再让整根立柱跨层显示。
    for index,(room,lo,hi,_) in enumerate(layers):
        slice_mesh(obj,room+'_stairs_'+obj.name,lo,hi)
    obj.name='stairs_whole_'+obj.name

def export(name,whole=False):
    bpy.ops.object.select_all(action='DESELECT')
    chosen=[]
    for obj in bpy.context.scene.objects:
        if obj.type!='MESH':continue
        if whole and any(obj.name.startswith(room+'_stairs_') for room,_,_,_ in layers):continue
        obj.select_set(True);chosen.append(obj)
    path=out/name;bpy.ops.export_scene.gltf(filepath=str(path),export_format='GLB',export_yup=True,export_extras=True,use_selection=True)
    return {'path':name,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'triangles':sum(sum(len(p.vertices)-2 for p in obj.data.polygons) for obj in chosen)}
whole=export('squidward-house-layout-v8.glb',True)
for obj in list(bpy.context.scene.objects):
    if obj.name.startswith('shell_'):bpy.data.objects.remove(obj,do_unlink=True)
interior=export('squidward-interior-layout-v8.glb')
bpy.ops.wm.save_as_mainfile(filepath=str(out/'room-slices.blend'))
(out/'slices.json').write_text(json.dumps({'status':'review','humanReview':'pending','sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'whole':whole,'interior':interior,'layers':records},ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'whole':whole,'interior':interior}),flush=True)
