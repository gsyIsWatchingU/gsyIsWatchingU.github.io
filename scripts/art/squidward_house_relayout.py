"""修复现有家具的装配、尺寸和层内留白，保留原曲面、UV与材质。"""
from pathlib import Path
import bpy, sys, math, json, hashlib
from mathutils import Vector, Matrix

src,out=map(Path,sys.argv[sys.argv.index('--')+1:]);out.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(src/'house-v6.glb'))
for obj in list(bpy.context.scene.objects):
    if obj.type=='MESH' and obj.name.startswith(('kitchen_','living_','bedroom_','bath_','art_')):
        bpy.data.objects.remove(obj,do_unlink=True)
for obj in list(bpy.context.scene.objects):
    if obj.type!='MESH': continue
    obj.data.transform(obj.matrix_world);obj.matrix_world=Matrix.Identity(4)
    if obj.name.startswith('stairs_'):
        for v in obj.data.vertices:
            v.co.x=.88+(v.co.x-.82)*.62
            v.co.y=(v.co.y-.12)*.62
    # 门的高度收进一层，避免跨层遮住客厅。
    if obj.name.startswith('door_'):
        for v in obj.data.vertices:
            v.co.x*=.64;v.co.z*=.55

records=[]
def place(room,item,sub,file,x,z,floor,height=None,scale=None,yaw=0,raise_by=0,repair_boxes=0,mount=False):
    before=set(bpy.context.scene.objects)
    path=src/sub/file
    bpy.ops.import_scene.gltf(filepath=str(path))
    objects=[o for o in bpy.context.scene.objects if o not in before and o.type=='MESH']
    def number(o):
        suffix=o.name.rsplit('.',1)[-1]
        return int(suffix) if suffix.isdigit() else 0
    objects.sort(key=number)
    for index,obj in enumerate(objects):
        world=obj.matrix_world.copy()
        obj.parent=None;obj.data.transform(world);obj.matrix_world=Matrix.Identity(4)
        if index<repair_boxes:
            # 原 rbox 把半尺寸传给 size=1 的立方体；只补回已有曲面尺寸。
            origin=Vector([(min(v.co[k] for v in obj.data.vertices)+max(v.co[k] for v in obj.data.vertices))/2 for k in range(3)])
            for v in obj.data.vertices:v.co=origin+(v.co-origin)*2
    points=[v.co.copy() for obj in objects for v in obj.data.vertices]
    lo=Vector([min(v[i] for v in points) for i in range(3)])
    hi=Vector([max(v[i] for v in points) for i in range(3)])
    factor=scale if scale is not None else height/(hi.z-lo.z)
    center=Vector(((lo.x+hi.x)/2,(lo.y+hi.y)/2,lo.z))
    rotate=Matrix.Rotation(math.radians(yaw),3,'Z')
    anchor=Vector((x,-z,floor+raise_by))
    for index,obj in enumerate(objects):
        for v in obj.data.vertices:v.co=rotate@((v.co-center)*factor)+anchor
        obj.name=f'{room}_{item}_{index:02d}';obj.data.name=obj.name
        obj['assetSource']=file;obj['layoutRevision']=7
    points=[v.co for obj in objects for v in obj.data.vertices]
    lo=[min(v[i] for v in points) for i in range(3)];hi=[max(v[i] for v in points) for i in range(3)]
    records.append({'room':room,'item':item,'source':str(path),'sourceSHA256':hashlib.sha256(path.read_bytes()).hexdigest(),'bboxYUp':{'min':[lo[0],lo[2],-hi[1]],'max':[hi[0],hi[2],-lo[1]]},'floorY':floor,'groundGap':lo[2]-floor,'mounted':mount,'boxRepairParts':repair_boxes})

# 各层家具统一缩到净高内，留出前侧与右侧的通道。
place('kitchen','stove','kitchen','stove.glb',-.70,-.60,.15,height=.43)
place('kitchen','sink','kitchen','sink-kitchen.glb',-.20,-.87,.15,height=.50)
place('kitchen','cabinets','kitchen','cabinets.glb',.29,-.80,.15,height=.35)
place('kitchen','fridge','kitchen','fridge.glb',.82,-.62,.15,height=.78)
place('kitchen','dining-table','kitchen','dining-table.glb',-.43,-.12,.15,height=.30)
place('kitchen','stool-L','kitchen','stool.glb',-.81,-.12,.15,height=.21)
place('kitchen','stool-R','kitchen','stool.glb',-.08,-.12,.15,height=.21)
# 门旁小雕像不再装配。
place('living','sofa','living','sofa.glb',-.38,-.77,1.20,scale=.58,repair_boxes=8)
place('living','armchair','living','armchair.glb',-.84,-.17,1.20,height=.47,yaw=20,repair_boxes=5)
place('living','coffee-table','living','coffee-table.glb',-.35,-.27,1.20,height=.18)
place('living','rug','living','rug-living.glb',-.40,-.35,1.20,scale=.53)
place('living','old-tv','living','old-tv.glb',.28,-.86,1.20,height=.43,repair_boxes=3)
place('living','bookshelf','living','bookshelf.glb',.95,-.60,1.20,height=.75,yaw=-90)
place('living','plant','living','plant.glb',.55,-.90,1.20,height=.36)
place('living','wall-picture','living','wall-picture.glb',-.40,-1.13,1.20,height=.29,raise_by=.55,mount=True)
place('bedroom','bed','bedroom','bed.glb',-.35,-.53,2.40,height=.84)
place('bedroom','nightstand-L','bedroom','nightstand.glb',-.79,-.76,2.40,height=.42)
place('bedroom','nightstand-R','bedroom','nightstand.glb',.06,-.76,2.40,height=.42)
place('bedroom','dresser','bedroom','dresser.glb',.61,-.65,2.40,height=.46)
place('bedroom','bed-rug','bedroom','bed-rug.glb',-.40,-.40,2.40,scale=.45)
place('bath','bathtub','bathroom','bathtub.glb',-.47,-.51,3.60,height=.32)
place('bath','faucet','bathroom','faucet.glb',-.47,-.75,3.60,height=.13,raise_by=.28,mount=True)
place('bath','washbasin','bathroom','washbasin.glb',.61,-.49,3.60,height=.48)
place('bath','shower-curtain','bathroom','shower-curtain.glb',.04,-.68,3.60,height=.72,yaw=90,raise_by=.03,mount=True)
place('art','plinth','art','art-plinth.glb',.84,.54,2.40,height=.14)
place('art','sculpture','art','art-sculpture.glb',.84,.54,2.40,height=.23,raise_by=.14,mount=True)

scene=bpy.context.scene
for obj in scene.objects:
    if obj.type=='MESH':obj.select_set(True)
def export(name):
    path=out/name
    bpy.ops.export_scene.gltf(filepath=str(path),export_format='GLB',use_selection=False,export_yup=True,export_extras=True)
    return {'path':name,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'triangles':sum(sum(len(p.vertices)-2 for p in obj.data.polygons) for obj in scene.objects if obj.type=='MESH')}
whole=export('squidward-house-layout-v7.glb')
for obj in list(scene.objects):
    if obj.name.startswith('shell_'):bpy.data.objects.remove(obj,do_unlink=True)
inside=export('squidward-interior-layout-v7.glb')
report={'revision':7,'status':'review','humanReview':'pending','sourceHouseSHA256':hashlib.sha256((src/'house-v6.glb').read_bytes()).hexdigest(),'whole':whole,'interior':inside,'furniture':records,'repairs':['修正沙发/扶手椅/电视已有部件半尺寸错误','以整件家具共同坐标旋转装配','降低书柜、四柱床等物件至层内净高','收窄楼梯，保留前侧活动留白','移除两座门旁雕像；门高收进一层']}
(out/'layout.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
bpy.ops.wm.save_as_mainfile(filepath=str(out/'layout-interior.blend'))
print(json.dumps({'whole':whole,'interior':inside,'furniture':len(records)},ensure_ascii=False),flush=True)
