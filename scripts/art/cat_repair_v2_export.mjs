import * as THREE from 'three';
import {readFileSync,writeFileSync,mkdirSync,existsSync,readdirSync} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {loadGeometry} from '../geometry-test-utils.mjs';
import {createCatRepairRig,catRestPoses} from '../cat-repair-v2-rig.js';
import {rebaseCatVolumeCorrection} from './cat_stable_basis.mjs';
import {compressCatGlb} from './cat_meshopt.mjs';

const args=process.argv.slice(2),option=(name,fallback)=>args.find(a=>a.startsWith('--'+name+'='))?.slice(name.length+3)??fallback;
const input=option('input-dir','tmp/cat-repair-v2/input'),solved=option('solved-dir',null);
if(!solved)throw Error('请传 --solved-dir=实际 GPU 输出目录');
const output=option('output','assets/house-review/props/siamese-cat-repair-v2.glb'),runtimeFile=option('runtime','docs/cat-repair-v2-review/runtime.json');
const source=path.join(input,'anatomy-neutral.glb'),goalsFile=path.join(input,'goals.json'),goalsBytes=readFileSync(goalsFile),goals=JSON.parse(goalsBytes),sourceBytes=readFileSync(source),hash=b=>createHash('sha256').update(b).digest('hex'),sourceSHA256=hash(sourceBytes),goalsSHA256=hash(goalsBytes);
const requested=option('poses',null)?.split(',')??goals.poses.map(p=>p.id),poses=catRestPoses.filter(p=>requested.includes(p.id));
if(poses.length!==requested.length)throw Error('存在未知或重复姿势');
const partial=poses.length!==catRestPoses.length;
if(partial&&(!output.replaceAll('\\','/').startsWith('tmp/')||!runtimeFile.replaceAll('\\','/').startsWith('tmp/')))throw Error('部分姿势自测必须显式指定 --output=tmp/... 与 --runtime=tmp/...');
if(!goals.sourceSHA256||sourceSHA256!==goals.sourceSHA256)throw Error('中立模型 hash 与 GPU goals 不一致或缺失，禁止重用旧数据');
const sourceAsset=option('source-asset',partial?source:'assets/house-review/props/siamese-cat-repair-v2-neutral.glb');
if(!existsSync(sourceAsset)||hash(readFileSync(sourceAsset))!==sourceSHA256)throw Error('独立预览中立模型缺失或 hash 不符：'+sourceAsset);
const rigSources=['scripts/cat-repair-v2-rig.js','scripts/cat-ground-poses-v2.js','scripts/cat-roll-poses-v2.js'].map(file=>{
 const sha256=hash(readFileSync(file));if(goals.codeSHA256?.[file]&&goals.codeSHA256[file]!==sha256)throw Error('姿态代码与 GPU goals 不一致：'+file);return{file,sha256};
});
// 在构建任何补形前验证实际 GPU 输出，拒绝缺少来源或混入旧轮次的数据。
const manifests=readdirSync(solved).filter(f=>f.endsWith('-manifest.json')).map(file=>({file:path.join(solved,file),bytes:readFileSync(path.join(solved,file))})).map(item=>({...item,manifest:JSON.parse(item.bytes)}));
const gpuInputs=new Map();
for(const pose of poses){
 const file=path.join(solved,pose.id+'-skin.f32'),bytes=readFileSync(file),sha256=hash(bytes);
 const candidates=manifests.filter(item=>item.manifest.poses?.includes(pose.id));
 if(candidates.length!==1)throw Error('每姿必须对应唯一 GPU manifest：'+pose.id+'，实际 '+candidates.length);
 const manifestItem=candidates[0],manifest=manifestItem.manifest,manifestOutput=manifest.outputs?.find(o=>o.pose===pose.id);
 if(manifest.sourceSHA256!==sourceSHA256)throw Error('GPU manifest source hash 缺失或不符 '+pose.id);
 if(manifest.goalsSHA256!==goalsSHA256)throw Error('GPU manifest goals hash 缺失或不符 '+pose.id);
 if(!manifestOutput||manifestOutput.sha256!==sha256||manifestOutput.bytes!==bytes.byteLength)throw Error('GPU manifest 输出字节/hash 缺失或不符 '+pose.id);
 if(manifest.solverSHA256&&goals.codeSHA256?.['scripts/art/cat_gpu_skin.py']&&manifest.solverSHA256!==goals.codeSHA256['scripts/art/cat_gpu_skin.py'])throw Error('GPU manifest solver hash 不符 '+pose.id);
 gpuInputs.set(pose.id,{file,bytes,sha256,manifestItem});
}
const jsonLength=sourceBytes.readUInt32LE(12),g=JSON.parse(sourceBytes.subarray(20,20+jsonLength)),binary=sourceBytes.subarray(28+jsonLength);
if(g.buffers.length!==1||g.extensionsRequired?.includes('EXT_meshopt_compression'))throw Error('导出输入必须是未压缩中立 GLB');
const model=(await loadGeometry(source)).scene;model.updateMatrixWorld(true);
const pillow=JSON.parse(readFileSync(path.join(input,'pillow-surface.json'))),rig=createCatRepairRig(model,{pillowSurface:pillow});
const controls=goals.parts.map(p=>model.getObjectByName(p.name));
controls.forEach((m,i)=>{if(!m?.isSkinnedMesh||m.geometry.attributes.position.count!==goals.parts[i].vertices)throw Error('中立曲面顶点不符 '+goals.parts[i].name);});
// 每个顶点只保留原占比最大的骨作为输出基底，包含颈区，避免混合矩阵奇异。
// 站姿所有骨的 bind 变换均为单位阵，故改变基底不会改变站姿曲面。
const basis=controls.map(control=>{
 const mesh=new THREE.SkinnedMesh(control.geometry.clone(),control.material);mesh.name=control.name;mesh.bind(control.skeleton,control.bindMatrix);mesh.matrixWorld.copy(control.matrixWorld);let changed=0;
 const ids=mesh.geometry.attributes.skinIndex.array,weights=mesh.geometry.attributes.skinWeight.array;
 for(let i=0;i<weights.length;i+=4){let largest=0;for(let k=1;k<4;k++)if(weights[i+k]>weights[i+largest])largest=k;const bone=ids[i+largest];if(weights[i+largest]<.999999)changed++;for(let k=0;k<4;k++){ids[i+k]=k?0:bone;weights[i+k]=k?0:1;}}
 mesh.geometry.morphAttributes={position:[],normal:[]};mesh.geometry.morphTargetsRelative=true;mesh.morphTargetInfluences=[];return{mesh,changed};
});
const surfaces=basis.map(b=>b.mesh),chunks=[binary];let offset=binary.length;
function append(a,type,count,componentType=5126,bounds=false){
 const padding=(-offset)&3;if(padding){chunks.push(Buffer.alloc(padding));offset+=padding;}
 const data=Buffer.from(a.buffer,a.byteOffset,a.byteLength),bufferView=g.bufferViews.length;g.bufferViews.push({buffer:0,byteOffset:offset,byteLength:data.length});offset+=data.length;chunks.push(data);
 const accessor={bufferView,componentType,count,type};
 if(bounds){const width={SCALAR:1,VEC3:3}[type];accessor.min=Array(width).fill(Infinity);accessor.max=Array(width).fill(-Infinity);for(let i=0;i<a.length;i++){const k=i%width;accessor.min[k]=Math.min(accessor.min[k],a[i]);accessor.max[k]=Math.max(accessor.max[k],a[i]);}}
 g.accessors.push(accessor);return g.accessors.length-1;
}
const nodeMap=new Map(g.nodes.map((n,i)=>[n.name,i]));
const meshIds=goals.parts.map(part=>g.nodes[nodeMap.get(part.name)].mesh);
surfaces.forEach((mesh,i)=>{
 const primitive=g.meshes[meshIds[i]].primitives[0];primitive.attributes.JOINTS_0=append(mesh.geometry.attributes.skinIndex.array,'VEC4',mesh.geometry.attributes.position.count,5123);primitive.attributes.WEIGHTS_0=append(mesh.geometry.attributes.skinWeight.array,'VEC4',mesh.geometry.attributes.position.count);
 primitive.targets=[];g.meshes[meshIds[i]].weights=[];g.meshes[meshIds[i]].extras={...g.meshes[meshIds[i]].extras,targetNames:[]};delete g.nodes[nodeMap.get(mesh.name)].weights;
});
delete g.animations;
const keyMap=new Map(),reports=[],gpuSources=[],point=new THREE.Vector3();let morphCount=0,activeMorphMaximum=0;
const interpolationTolerance=Number(option('max-interpolation-error','.002'));
if(!(interpolationTolerance>0&&interpolationTolerance<=.002))throw Error('max-interpolation-error 必须位于 (0,.002]');
const duration=4.6,fps=30,frameCount=Math.round(duration*fps)+1,verificationGrid=(frameCount-1)*2,rebasingTolerance=interpolationTolerance*.9;
const total=goals.parts.reduce((n,p)=>n+p.vertices,0),stride=total*6;
if(total!==goals.vertexCount)throw Error('goals vertexCount 与 parts 不符');
// 只裁剪实际 Three 采样时的零目标引用；不改数据、次序或蒙皮算法。
function withActiveMorphPositions(meshOrMeshes,callback){
 const states=[];
 for(const mesh of Array.isArray(meshOrMeshes)?meshOrMeshes:[meshOrMeshes]){
  const positions=mesh.geometry.morphAttributes.position,influences=mesh.morphTargetInfluences;
  if(!positions?.length||!influences)continue;
  const active=[];for(let i=0;i<influences.length;i++)if(influences[i]!==0)active.push(i);
  states.push({mesh,positions,influences});
  mesh.geometry.morphAttributes.position=active.map(i=>positions[i]);mesh.morphTargetInfluences=active.map(i=>influences[i]);
 }
 try{return callback();}finally{for(const {mesh,positions,influences}of states){mesh.geometry.morphAttributes.position=positions;mesh.morphTargetInfluences=influences;}}
}
function worldFrame(data,index){let start=0;const positions=[],normals=[];for(const part of goals.parts){positions.push(data.slice(index*stride+start*3,index*stride+(start+part.vertices)*3));normals.push(data.slice(index*stride+total*3+start*3,index*stride+total*3+(start+part.vertices)*3));start+=part.vertices;}return{positions,normals};}
function interpolateGpu(times,frames,t){
 let right=times.findIndex(k=>k>=t-1e-9);if(right<1)right=1;const left=right-1,u=THREE.MathUtils.clamp((t-times[left])/(times[right]-times[left]),0,1);
 return{positions:goals.parts.map((part,p)=>Float32Array.from(frames[left].positions[p],(a,i)=>THREE.MathUtils.lerp(a,frames[right].positions[p][i],u))),normals:goals.parts.map((part,p)=>{const n=Float32Array.from(frames[left].normals[p],(a,i)=>THREE.MathUtils.lerp(a,frames[right].normals[p][i],u));for(let i=0;i<n.length;i+=3){const length=Math.hypot(n[i],n[i+1],n[i+2])||1;n[i]/=length;n[i+1]/=length;n[i+2]/=length;}return n;})};
}
for(const pose of poses){
 const item=goals.poses.find(p=>p.id===pose.id);if(!item)throw Error('缺少姿势 goals '+pose.id);
 const times=item.times;if(times[0]!==0||times.at(-1)!==1||times.some((t,i)=>!Number.isFinite(t)||i&&t<=times[i-1]))throw Error('GPU times 必须从0递增到1：'+pose.id);
 const {file,bytes,sha256,manifestItem}=gpuInputs.get(pose.id),manifest=manifestItem.manifest,data=new Float32Array(bytes.buffer,bytes.byteOffset,bytes.byteLength/4);
 if(data.length!==times.length*stride)throw Error('GPU 文件帧数/长度不符 '+file);
 if(!data.every(Number.isFinite))throw Error('GPU 曲面包含 NaN/Infinity '+file);
 gpuSources.push({pose:pose.id,file,sha256,bytes:bytes.byteLength,manifest:manifestItem.file,manifestSHA256:hash(manifestItem.bytes),sourceHashVerified:true,goalsHashVerified:true,outputHashVerified:true,host:manifest.host??null,device:manifest.device??null,deviceIndex:manifest.deviceIndex??null,gpuUUID:manifest.gpuUUID??null,solverSHA256:manifest.solverSHA256??null,method:manifest.method??null,reusedInput:manifest.reusedInput?{parentManifestSHA256:manifest.reusedInput.parentManifestSHA256,originalGoalsSHA256:manifest.reusedInput.originalGoalsSHA256,proof:manifest.reusedInput.proofs?.find(p=>p.pose===pose.id)??null}:null,postprocessSHA256:manifest.postprocessSHA256??null,postprocess:manifest.postprocess??manifest.fairing??null,parentGpuArtifact:manifest.parentGpuArtifacts?.find(p=>p.artifact?.pose===pose.id)??null});
 const entries=[{t:0,id:-1}],frames=times.map((t,i)=>worldFrame(data,i));let maximumKeyError=0,minimumFloor=Infinity;
 function addKey(t,desired){
  rig.pose(pose.id,t);surfaces.forEach(m=>m.morphTargetInfluences.fill(0));
  const correction=withActiveMorphPositions(surfaces,()=>rebaseCatVolumeCorrection(controls,surfaces,{worldSpace:true,deltas:desired.positions,normalDeltas:desired.normals}));
  surfaces.forEach((mesh,part)=>{
   const delta=correction.deltas[part],normalDelta=correction.normalDeltas[part],primitive=g.meshes[meshIds[part]].primitives[0];
   primitive.targets.push({POSITION:append(delta,'VEC3',delta.length/3,5126,true),NORMAL:append(normalDelta,'VEC3',normalDelta.length/3)});g.meshes[meshIds[part]].weights.push(0);g.meshes[meshIds[part]].extras.targetNames.push('gpu_'+pose.id+'_'+t);
   mesh.geometry.morphAttributes.position.push(new THREE.Float32BufferAttribute(delta,3));mesh.geometry.morphAttributes.normal.push(new THREE.Float32BufferAttribute(normalDelta,3));mesh.morphTargetInfluences.push(1);
   withActiveMorphPositions(mesh,()=>{for(let i=0;i<mesh.geometry.attributes.position.count;i++){mesh.getVertexPosition(i,point);maximumKeyError=Math.max(maximumKeyError,point.distanceTo(new THREE.Vector3().fromArray(desired.positions[part],i*3)));minimumFloor=Math.min(minimumFloor,point.y);}});
   mesh.morphTargetInfluences[morphCount]=0;
  });
  entries.push({t,id:morphCount++});entries.sort((a,b)=>a.t-b.t);
 }
 for(let frame=1;frame<times.length;frame++)addKey(times[frame],frames[frame]);
 // 局部骨坐标补形的线性混合不等于世界坐标线性混合；补确定性导出采样，避免弧线过冲。
 for(let pass=0;pass<9;pass++){
  const extra=[];
  for(let k=1;k<entries.length;k++){
   const a=entries[k-1],b=entries[k];let worst=0,at=0;
   // 同时检查最终重导入的60fps格点，避免只测四分点漏掉区间内的最大值。
   const checkTimes=[.25,.5,.75].map(u=>THREE.MathUtils.lerp(a.t,b.t,u));
   for(let i=Math.floor(a.t*verificationGrid)+1;i<b.t*verificationGrid-1e-9;i++)checkTimes.push(i/verificationGrid);
   for(const t of new Set(checkTimes)){
    const desired=interpolateGpu(times,frames,t),weights=weightsAt(entries,t);rig.pose(pose.id,t);
    surfaces.forEach((mesh,p)=>{mesh.morphTargetInfluences.splice(0,morphCount,...weights);mesh.skeleton.update();withActiveMorphPositions(mesh,()=>{for(let i=0;i<mesh.geometry.attributes.position.count;i++){mesh.getVertexPosition(i,point);const error=point.distanceTo(new THREE.Vector3().fromArray(desired.positions[p],i*3));if(error>worst){worst=error;at=t;}}});});
   }
   // 给标准骨轨道的线性重采样留余量；发布门禁仍严格使用 .002。
   if(worst>rebasingTolerance)extra.push(at);
  }
  if(!extra.length)break;
  if(pass===8||entries.length+extra.length>200)throw Error('导出插值重基底未收敛 '+pose.id);
  for(const t of extra)addKey(t,interpolateGpu(times,frames,t));
 }
 keyMap.set(pose.id,{entries,frames,times});reports.push({pose:pose.id,gpuKeys:times.length,exportKeys:entries.length,additionalExportKeys:entries.length-times.length,morphBytes:(entries.length-1)*total*6*4,exportKeyTimes:entries.map(e=>e.t),maximumKeyGpuError:maximumKeyError,minimumKeyFloor:minimumFloor});
 console.log('GPU keys rebased',pose.id,times.length,'export keys',entries.length,maximumKeyError);
}
// 所有曲面共享完整补形列表，任一时刻只激活相邻的两组。
surfaces.forEach(m=>{while(m.morphTargetInfluences.length<morphCount)m.morphTargetInfluences.push(0);});
g.animations=[];
function weightsAt(entries,t){const weights=new Float32Array(morphCount);if(t<=0)return weights;let right=entries.findIndex(e=>e.t>=t-1e-9);if(right<1)right=entries.length-1;const a=entries[right-1],b=entries[right],u=THREE.MathUtils.clamp((t-a.t)/(b.t-a.t),0,1);if(a.id>=0)weights[a.id]=1-u;weights[b.id]=u;return weights;}
function reverse(a,stride){const output=new Float32Array(a.length),count=a.length/stride;for(let i=0;i<count;i++)output.set(a.subarray((count-1-i)*stride,(count-i)*stride),i*stride);return output;}
for(const pose of poses){
 const {entries,frames:gpuFrames,times:gpuTimes}=keyMap.get(pose.id),report=reports.find(r=>r.pose===pose.id),joints=[...rig.bones];
 const progressKeys=[...new Set([...Array.from({length:frameCount},(_,i)=>i/(frameCount-1)),...entries.map(e=>e.t)])].sort((a,b)=>a-b),poseFrameCount=progressKeys.length,times=Float32Array.from(progressKeys,t=>t*duration),samples=joints.map(()=>({position:new Float32Array(poseFrameCount*3),quaternion:new Float32Array(poseFrameCount*4)})),morph=new Float32Array(poseFrameCount*morphCount);let maximumInterpolationError=0,minimumFloor=Infinity,startError=0;
 for(let frame=0;frame<poseFrameCount;frame++){
  const t=progressKeys[frame];rig.pose(pose.id,t);const weights=weightsAt(entries,t);morph.set(weights,frame*morphCount);activeMorphMaximum=Math.max(activeMorphMaximum,weights.reduce((n,w)=>n+(Math.abs(w)>1e-7?1:0),0));
  joints.forEach(([name,bone],i)=>{bone.position.toArray(samples[i].position,frame*3);bone.quaternion.toArray(samples[i].quaternion,frame*4);});
  let right=gpuTimes.findIndex(k=>k>=t-1e-9);if(right<1)right=1;const left=right-1,u=(t-gpuTimes[left])/(gpuTimes[right]-gpuTimes[left]);
  surfaces.forEach((mesh,part)=>{
   mesh.morphTargetInfluences.splice(0,morphCount,...weights);mesh.skeleton.update();const rest=mesh.geometry.attributes.position;
   withActiveMorphPositions(mesh,()=>{for(let i=0;i<rest.count;i++){
    mesh.getVertexPosition(i,point);minimumFloor=Math.min(minimumFloor,point.y);
    if(frame===0)startError=Math.max(startError,point.distanceTo(new THREE.Vector3().fromBufferAttribute(rest,i)));
    else{const expected=new THREE.Vector3().fromArray(gpuFrames[left].positions[part],i*3).lerp(new THREE.Vector3().fromArray(gpuFrames[right].positions[part],i*3),u);maximumInterpolationError=Math.max(maximumInterpolationError,point.distanceTo(expected));}
   }});
  });
 }
 Object.assign(report,{sampledFrames:poseFrameCount,nominal30fpsFrames:frameCount,maximumInterpolatedGpuError:maximumInterpolationError,minimumInterpolatedFloor:minimumFloor,startPoseError:startError});
 if(maximumInterpolationError>interpolationTolerance)throw Error('30fps 世界曲面插值误差超过门禁 '+pose.id+': '+maximumInterpolationError);
 for(const rising of [false,true]){
  const animation={name:(rising?'rise_':'rest_')+pose.id,samplers:[],channels:[]},clipTimes=rising?Float32Array.from(times,(_,i)=>duration-times[times.length-1-i]):times;
  if(rising)clipTimes[0]=0;
  const inputAccessor=append(clipTimes,'SCALAR',poseFrameCount,5126,true);
  joints.forEach(([name],i)=>{for(const [property,type,width]of [['position','VEC3',3],['quaternion','VEC4',4]]){const values=rising?reverse(samples[i][property],width):samples[i][property];animation.channels.push({sampler:animation.samplers.length,target:{node:nodeMap.get(name),path:property==='position'?'translation':'rotation'}});animation.samplers.push({input:inputAccessor,output:append(values,type,poseFrameCount),interpolation:'LINEAR'});}});
  const values=rising?reverse(morph,morphCount):morph,weightAccessor=append(values,'SCALAR',poseFrameCount*morphCount);
  for(const part of goals.parts){animation.channels.push({sampler:animation.samplers.length,target:{node:nodeMap.get(part.name),path:'weights'}});animation.samplers.push({input:inputAccessor,output:weightAccessor,interpolation:'LINEAR'});}
  g.animations.push(animation);
 }
 console.log('Baked',pose.id,'GPU interpolation error',maximumInterpolationError);
}
function encode(){g.buffers[0].byteLength=offset;const json=Buffer.from(JSON.stringify(g)),padded=Buffer.alloc(Math.ceil(json.length/4)*4,32);json.copy(padded);const bytes=Buffer.alloc(28+padded.length+offset);bytes.writeUInt32LE(0x46546c67);bytes.writeUInt32LE(2,4);bytes.writeUInt32LE(bytes.length,8);bytes.writeUInt32LE(padded.length,12);bytes.writeUInt32LE(0x4e4f534a,16);padded.copy(bytes,20);bytes.writeUInt32LE(offset,20+padded.length);bytes.writeUInt32LE(0x004e4942,24+padded.length);let cursor=28+padded.length;for(const chunk of chunks){chunk.copy(bytes,cursor);cursor+=chunk.length;}return bytes;}
const packed=await compressCatGlb(encode(),{morphQuantization:{positionBits:18,normalBits:14,maxPositionError:.00002,maxNormalError:.0005}}),validationFile='tmp/cat-repair-v2/export-validate-'+hash(packed.bytes).slice(0,12)+'.glb';
if(packed.bytes.byteLength>=100*1024*1024)throw Error('候选 GLB 超过100MiB发布门禁：'+packed.bytes.byteLength);
mkdirSync(path.dirname(validationFile),{recursive:true});writeFileSync(validationFile,packed.bytes);
// 重新读入真实压缩 GLB，按 Three AnimationMixer 重放；包含不落在30fps格点上的GPU原关键帧。
const decoded=await loadGeometry(validationFile),decodedModel=decoded.scene,mixer=new THREE.AnimationMixer(decodedModel),decodedParts=goals.parts.map(p=>decodedModel.getObjectByName(p.name));
for(const pose of poses){
 mixer.stopAllAction();const clip=decoded.animations.find(a=>a.name==='rest_'+pose.id);if(!clip)throw Error('重导入缺少动作 '+pose.id);
 const action=mixer.clipAction(clip);action.setLoop(THREE.LoopOnce,1);action.clampWhenFinished=true;action.reset().play();action.paused=true;
 const keys=keyMap.get(pose.id),samples=[...new Set([...Array.from({length:frameCount*2-1},(_,i)=>i/(frameCount*2-2)),...keys.entries.map(e=>e.t)])].sort((a,b)=>a-b);let maximum=0,start=0;
 for(const t of samples){
  action.time=t*duration;mixer.update(0);decodedModel.updateMatrixWorld(true);const desired=interpolateGpu(keys.times,keys.frames,t);
  decodedParts.forEach((mesh,part)=>{mesh.skeleton.update();withActiveMorphPositions(mesh,()=>{for(let i=0;i<mesh.geometry.attributes.position.count;i++){mesh.getVertexPosition(i,point);const target=t===0?new THREE.Vector3().fromBufferAttribute(controls[part].geometry.attributes.position,i):new THREE.Vector3().fromArray(desired.positions[part],i*3),error=point.distanceTo(target);if(t===0)start=Math.max(start,error);else maximum=Math.max(maximum,error);}});});
 }
 const report=reports.find(r=>r.pose===pose.id);Object.assign(report,{reimportSamples:samples.length,maximumReimportGpuError:maximum,reimportStartPoseError:start});
 if(maximum>interpolationTolerance||start>1e-6)throw Error('实际 GLB 重导入误差超过门禁 '+pose.id+': '+maximum+' / start '+start);
}
const standby=sourceAsset.replaceAll('\\','/');
const assetProvenanceFile='docs/cat-eight-poses-review/provenance.json',assetProvenance=JSON.parse(readFileSync(assetProvenanceFile));
const originalImages=(g.images??[]).map((image,i)=>{const view=g.bufferViews[image.bufferView];return{index:i,mimeType:image.mimeType,sha256:hash(binary.subarray(view.byteOffset??0,(view.byteOffset??0)+view.byteLength))};});
const streamSlots=8,streamWidth=256,streamBytes=goals.parts.reduce((sum,p)=>sum+streamWidth*Math.ceil(p.vertices*2/streamWidth)*4*4*streamSlots,0);
if(activeMorphMaximum>streamSlots)throw Error('活动补形超过流式槽位');
const runtime={status:'review',humanReview:'pending',partial,source:sourceAsset.replaceAll('\\','/'),sourceInput:source.replaceAll('\\','/'),sourceSHA256,goals:goalsFile.replaceAll('\\','/'),goalsSHA256,standby,standbySHA256:sourceSHA256,output:output.replaceAll('\\','/'),runtimeSHA256:hash(packed.bytes),bones:rig.bones.size,vertices:total,parts:goals.parts,fps,duration,poses,animations:g.animations.map(a=>a.name),morphTargets:morphCount,faceTextureRebake:false,bodyTextureRebake:false,compression:packed.report,sourceProvenance:{originalRecord:assetProvenanceFile,originalRecordSHA256:hash(readFileSync(assetProvenanceFile)),reportedOwnerGPU:assetProvenance.ownerGPU,reportedSourceJob:assetProvenance.sourceJob,rigSources,exporterSHA256:hash(readFileSync('scripts/art/cat_repair_v2_export.mjs')),inputBindingRecord:existsSync(path.join(input,'binding.json'))?{file:path.join(input,'binding.json'),sha256:hash(readFileSync(path.join(input,'binding.json'))),scope:'Upstream binding record; may precede final neck topology/weight repairs'}:null,images:originalImages,imagesAndUVReused:true},resources:{sourceBytes:sourceBytes.byteLength,uncompressedGlbBytes:packed.report.originalBytes,compressedGlbBytes:packed.bytes.byteLength,morphPositionNormalBytes:morphCount*total*6*4,morphTargets:morphCount,maximumActiveMorphs:activeMorphMaximum,streamSlots,estimatedBaseSurfaceStreamBytes:streamBytes,estimatedWithSharedFurGeometryStreamBytes:streamBytes*2,streamEstimateScope:'Actual streamCatMorphs layout, 256-wide RGBA32F, 8 layers; body/head plus one shared shell geometry per surface; excludes hair-fiber/other scene resources'},stableBasis:{method:'single original dominant bone per vertex; all joint regions including neck; world-space GPU curves rebased into relative glTF morphs',parts:basis.map((b,i)=>({name:goals.parts[i].name,changed:b.changed}))},gpu:{provenance:'Actual CUDA inputs/outputs verified by SHA256; owned-node UUID mapping verified by SSH in this repair session',ownedNodes:[{sshAlias:'mygpu',deviceIndex:1,gpuUUID:'GPU-f870b78d-ba8b-23ac-47d4-88922d4010a4'},{sshAlias:'gsy013',deviceIndex:0,gpuUUID:'GPU-1a462216-9e7c-59c9-5e0f-a1d2b2ef1766'}],solvedDirectory:solved.replaceAll('\\','/'),sources:gpuSources},validation:{scope:'Actual compressed GLB reimported with Three AnimationMixer at 60fps plus export keys; GPU world-surface error and unchanged source standing pose; also checked before compression at 30fps',reports},props:{pillow:{url:'assets/house-review/props/bed.glb',mesh:'bed_cream_rubber',reused:true},wall:{type:'preview ground extension'}},skin:'Owned GPU source mesh; supplied GPU world-space position/normal samples include guarded neck/contact postprocessing or rejected-frame raw fallback, baked into standard glTF relative morph targets and 35-bone tracks; no runtime surface correction'};
mkdirSync(path.dirname(output),{recursive:true});writeFileSync(output,packed.bytes);mkdirSync(path.dirname(runtimeFile),{recursive:true});writeFileSync(runtimeFile,JSON.stringify(runtime,null,2)+'\n');console.log(JSON.stringify({output,runtimeFile,sha256:runtime.runtimeSHA256,bytes:packed.bytes.length,morphCount,clips:g.animations.length}));
