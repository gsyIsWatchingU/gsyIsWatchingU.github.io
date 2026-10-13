"""在现有 GPU 网格与骨架副本上缩短四肢、缩小体型；保留 UV。"""
import bpy,sys,json,hashlib,struct
from pathlib import Path
from mathutils import Vector
source,out=map(Path,sys.argv[sys.argv.index('--')+1:]);out.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True);bpy.ops.import_scene.gltf(filepath=str(source))
def deform(v):
    v=v.copy();v.x*=.80;v.y*=.80;v.z=(v.z*.78 if v.z<.30 else v.z-.066)*.80;return v
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
for o in meshes:
    world=o.matrix_world.copy();inverse=world.inverted()
    for v in o.data.vertices:v.co=inverse@deform(world@v.co)
    o.data.update()
for rig in [o for o in bpy.context.scene.objects if o.type=='ARMATURE']:
    bpy.context.view_layer.objects.active=rig;bpy.ops.object.mode_set(mode='EDIT');inverse=rig.matrix_world.inverted()
    for b in rig.data.edit_bones:b.head=inverse@deform(rig.matrix_world@b.head);b.tail=inverse@deform(rig.matrix_world@b.tail)
    bpy.ops.object.mode_set(mode='OBJECT')
path=out/'siamese-kitten-compact.glb';bpy.ops.export_scene.gltf(filepath=str(path),export_format='GLB',export_yup=True,export_extras=True)
data=path.read_bytes();gltf=json.loads(data[20:20+struct.unpack_from('<I',data,12)[0]]);accessors=[gltf['accessors'][p['attributes']['POSITION']] for m in gltf['meshes'] for p in m['primitives']]
dimensions=[max(a['max'][i] for a in accessors)-min(a['min'][i] for a in accessors) for i in range(3)]
record={'status':'review','humanReview':'pending','source':str(source),'sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'runtimeSHA256':hashlib.sha256(data).hexdigest(),'meshBackend':'existing Hunyuan3D-2.1 mesh and UV; Blender proportion repair','bodyScale':.80,'limbRatio':.78,'heightShift':.066,'dimensionsYUp':dimensions,'rigidFacePreserved':True}
(out/'runtime.json').write_text(json.dumps(record,indent=2)+'\n');bpy.ops.wm.save_as_mainfile(filepath=str(out/'siamese-kitten-compact.blend'));print(json.dumps(record))
