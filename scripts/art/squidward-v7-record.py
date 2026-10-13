"""从最终 GLB 与原始任务证据生成登记，禁止把候选任务状态改成通过。"""
import argparse,hashlib,importlib.util,io,json,pathlib,shutil,subprocess,sys,os
from PIL import Image
args=argparse.ArgumentParser();args.add_argument('--checker-dir',required=True);opts=args.parse_args()
root=pathlib.Path(__file__).resolve().parents[2];docs=root/'docs/neighborhood-review';proof=docs/'acceptance/v7';proof.mkdir(parents=True,exist_ok=True)
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,v):p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
spec=importlib.util.spec_from_file_location('glb_check',pathlib.Path(opts.checker_dir)/'check_glb.py');mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
records=[];reports=[];model_records=[]
for stem in ('squidward-house','squidward-house-web','squidward-interior','squidward-interior-web'):
 path=root/'assets/models/neighborhood'/(stem+'.glb');report=mod.check_glb(path);reports.append(report)
 if not report['ok']:raise RuntimeError('Final GLB check failed: '+str(report))
 parsed=mod.parse_glb(path);g=parsed['gltf'];images=[]
 for i,im in enumerate(g.get('images',[])):
  bv=g['bufferViews'][im['bufferView']];payload=parsed['bin'][bv.get('byteOffset',0):bv.get('byteOffset',0)+bv['byteLength']]
  picture=Image.open(io.BytesIO(payload));uses=[]
  for mi,mat in enumerate(g.get('materials',[])):
   for channel,val in mat.get('pbrMetallicRoughness',{}).items():
    if isinstance(val,dict) and 'index' in val and g['textures'][val['index']].get('source')==i:uses.append({'material':mat.get('name',str(mi)),'channel':channel})
  images.append({'index':i,'name':im.get('name'),'dimensions':list(picture.size),'bytes':len(payload),'sha256':hashlib.sha256(payload).hexdigest(),'uses':uses})
 model_records.append({'id':stem,'runtime':path.relative_to(root).as_posix(),'sha256':digest(path),'triangles':report['triangles'],'bytes':path.stat().st_size,'images':images,'imageCount':len(images),'textureCount':len(g.get('textures',[])),'meshCount':len(g['meshes']),'bboxMin':report['bbox_min'],'bboxMax':report['bbox_max'],'status':'review'})
write(proof/'model-checks.json',reports)
for folder in sorted((root/'tmp/v7-production/jobs').iterdir()):
 if not (folder/'manifest.json').exists():continue
 m=json.loads((folder/'manifest.json').read_text(encoding='utf-8'));target=proof/'production'/folder.name;target.mkdir(parents=True,exist_ok=True)
 reference=docs/'refs/v7'/((folder.name.replace('-failed',''))+'.png')
 if digest(reference)!=m['source_sha256']:raise RuntimeError('Candidate reference hash mismatch: '+folder.name)
 for filename in ('manifest.json','pipeline.log','preview.png'):
  if (folder/filename).exists():shutil.copy2(folder/filename,target/filename)
 candidate=folder/'candidate.glb'
 if candidate.exists():
  check=mod.check_glb(candidate);write(target/'mesh-check.json',check)
  if folder.name!='old-tv-failed' and not check['ok']:raise RuntimeError('Adopted candidate geometry check failed: '+str(check))
 records.append({'asset':folder.name,'host':'mygpu' if folder.name in ('sofa','bathtub','plant','old-tv-failed') else 'gsy013','jobId':m['job_id'],'pipelineState':m['state'],'sourceSHA256':m['source_sha256'],'candidateSHA256':digest(candidate) if candidate.exists() else None,'adopted':folder.name!='old-tv-failed','exception':'白色搪瓷触发 render_white_patch_risk；原始状态仍 failed。UV/baseColor 引用齐全，内腔经浏览器目检；作为 Blender 精修输入进入 review，未宣称流水线通过。' if folder.name=='bathtub' else None,'manifest':target.relative_to(root).as_posix()+'/manifest.json'})
checks=[];env={**os.environ,'PYTHONIOENCODING':'utf-8'}
for path in sorted((docs/'refs/v7').glob('*.png')):
 run=subprocess.run([sys.executable,str(pathlib.Path(opts.checker_dir)/'check_image.py'),'--image',str(path)],capture_output=True,text=True,encoding='utf-8',env=env)
 checks.append({'file':path.relative_to(root).as_posix(),'sha256':digest(path),'exitCode':run.returncode,'result':json.loads(run.stdout)})
 if run.returncode:raise RuntimeError('Reference check failed: '+path.name)
write(proof/'image-checks.json',checks)
source={'revision':'v7','status':'review','humanReview':'pending','primaryReference':'docs/neighborhood-review/refs/v7/primary-reference.png','primaryReferenceSHA256':digest(docs/'refs/v7/primary-reference.png'),'baseRuntimeGitRef':'b926910:assets/models/neighborhood/squidward-house.glb','baseRuntimeSHA256':'4d797fd3894319a598e200c46bf688b3dac29ebcfb0547e7898c80e63f40f6cb','assemblyScript':'scripts/art/squidward-v7-assemble.py','assemblyScriptSHA256':digest(root/'scripts/art/squidward-v7-assemble.py'),'sourceBlendLocal':'tmp/v7-production/squidward-reference-v7.blend','sourceBlendSHA256':digest(root/'tmp/v7-production/squidward-reference-v7.blend'),'sourceRemote':'gsy013:/workspace/projects/squidward-reference-v7-20261013','assets':records,'refinement':['Blender 结构法线、圆柱 UV、保留厚壁剖切、完整楼板与梯洞','39 级弧形梯与平台、扶手、栏杆','家具比例/落点、床罩色彩、书柜白底清理与书脊配色','连续石雕曲面、开口洗手盆、后墙木门和画框','纹理缩至 512，室内同材质合批；门使用真实枢轴'],'deviceReview':'pending'}
write(proof/'production/provenance.json',source)
asset_index={'status':'review','humanReview':'pending','revision':'v7','house':'squidward','primaryReference':source['primaryReference'],'primaryReferenceSHA256':source['primaryReferenceSHA256'],'structure':{'backend':'Blender 4.5.13 + 自有 L20 Forge3D/Hunyuan3D + Z-Image','assemblyScript':source['assemblyScript'],'coordinates':'Blender(X,Y,Z) -> glTF(X,Z,-Y); glTF Y-up, +Z front','floors':[.15,1.2,2.4,3.6],'stairStyle':'右侧三段连续弧形木梯，13+13+13 步，每段平台接行走面','staircaseCenterBlender':[.68,.03],'cutawayRemovedPlanDeg':[-193,-27]},'runtimeTriangles':model_records[0]['triangles'],'assets':model_records,'provenanceFile':'docs/neighborhood-review/acceptance/v7/production/provenance.json','tierBudget':{'desktopMaxTriangles':300000,'mobileMaxTriangles':150000,'textureMaxPx':512,'sameGeometryAndHash':True,'mobileSSAO':False},'archived':'原 v6 基线保留在 Git b926910；更早版本在 assets/models/neighborhood/archive/；派大星模型未改'}
write(docs/'asset-index.json',asset_index)
print(json.dumps({'models':[{k:r[k] for k in ('id','sha256','triangles','bytes','imageCount','textureCount')} for r in model_records],'referenceChecks':len(checks),'candidateRecords':len(records)},ensure_ascii=False))
