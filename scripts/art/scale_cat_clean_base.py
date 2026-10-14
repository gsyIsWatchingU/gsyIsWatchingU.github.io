"""只做统一缩放，保持 GPU 猫咪脸形、四肢比例、原 UV 和贴图。"""
import bpy,sys,json,hashlib
from pathlib import Path
source,out=map(Path,sys.argv[sys.argv.index('--')+1:]);out.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True);bpy.ops.import_scene.gltf(filepath=str(source))
for o in bpy.context.scene.objects:
 if o.parent is None:o.scale*=.80
path=out/'siamese-cat-clean-base.glb'
bpy.ops.export_scene.gltf(filepath=str(path),export_format='GLB',export_yup=True,export_extras=True)
(out/'scale.json').write_text(json.dumps({'sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'runtimeSHA256':hashlib.sha256(path.read_bytes()).hexdigest(),'scale':.80,'limbShortening':False,'textureRebake':False,'faceDeformation':False},indent=2)+'\n')
