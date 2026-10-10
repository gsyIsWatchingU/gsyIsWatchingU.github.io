import { readFileSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import { createHash } from 'node:crypto';
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createHousePet } from "./house-pet.js";

// 验证真实运行时网格、蒙皮变形与完整路线；Node 只省略贴图解码。
const config = JSON.parse(readFileSync(new URL("../src/data/pineapple-house.json", import.meta.url)));
const spec = structuredClone(config.assets.find(a => a.id === "siamese-cat"));
assert(spec.pet.fur && spec.pet.restPoses,'正式入口需启用短毛与坐卧');
const data = readFileSync(new URL(`../${spec.url}`, import.meta.url));
assert.equal(createHash('sha256').update(data).digest('hex'),spec.pet.runtimeSha256,'脸部标定需匹配本次 GLB');
const jsonLength = data.readUInt32LE(12);
const gltf = JSON.parse(data.subarray(20, 20 + jsonLength).toString());
for (const mesh of gltf.meshes) for (const primitive of mesh.primitives) delete primitive.material;
delete gltf.materials; delete gltf.textures; delete gltf.images;
const json = Buffer.from(JSON.stringify(gltf));
const padded = Buffer.alloc(Math.ceil(json.length / 4) * 4, 32); json.copy(padded);
const binary = data.subarray(20 + jsonLength);
const bytes = Buffer.alloc(20 + padded.length + binary.length);
bytes.writeUInt32LE(0x46546c67, 0); bytes.writeUInt32LE(2, 4); bytes.writeUInt32LE(bytes.length, 8);
bytes.writeUInt32LE(padded.length, 12); bytes.writeUInt32LE(0x4e4f534a, 16);
padded.copy(bytes, 20); binary.copy(bytes, 20 + padded.length);
const asset = await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), "");
const model = asset.scene; model.position.fromArray(spec.position); model.updateMatrixWorld(true);
const meshes = []; model.traverse(n => { if (n.isSkinnedMesh) meshes.push(n); });
assert(meshes.length > 0, "宠物必须使用真实蒙皮网格");
const camera = new THREE.PerspectiveCamera(34, 1.5); camera.position.set(0, 2, 8); camera.lookAt(0, .5, 0); camera.updateMatrixWorld();
globalThis.document={createElement:()=>({style:{},setAttribute(){},hidden:true})};
const options = { root: { dataset: {},append(){},getBoundingClientRect:()=>({left:0,top:0}) }, canvas: { getBoundingClientRect: () => ({ left: 0, top: 0, width: 1280, height: 720 }) }, camera, reducedMotion: false };

const pet=createHousePet(model,spec,options),v=new THREE.Vector3(),w=new THREE.Vector3();
const result={states:[],poses:{},faceDistanceError:0,minimumFloor:Infinity,looks:[],walking:{maximumIK:0,maximumStretch:0,frames:0}};
const face=[];
for(const mesh of meshes){
  const pos=mesh.geometry.attributes.position,indices=mesh.geometry.attributes.skinIndex,weights=mesh.geometry.attributes.skinWeight;
  for(let i=0;i<pos.count;i++){let headWeight=0;for(let k=0;k<4;k++)if(mesh.skeleton.bones[indices.array[i*4+k]].name==='pet_head')headWeight+=weights.array[i*4+k];if(headWeight>.999&&pos.getY(i)>.44)face.push({mesh,index:i});}
}
assert(face.length>1000,'脸部需完整随头骨运动');
const vertex=s=>{const value=new THREE.Vector3().fromBufferAttribute(s.mesh.geometry.attributes.position,s.index);s.mesh.applyBoneTransform(s.index,value);return value.applyMatrix4(s.mesh.matrixWorld);};
for(const mesh of meshes)mesh.skeleton.update();
const pairs=face.filter((_,i)=>i%17===0).slice(0,500).map((a,i)=>{const b=face[(i*97+29)%face.length];return{a,b,rest:vertex(a).distanceTo(vertex(b))};});
function measure(){
  let floor=Infinity,stretch=0,ik=0;
  for(const mesh of meshes){mesh.skeleton.update();const pos=mesh.geometry.attributes.position,idx=mesh.geometry.index;
    for(let i=0;i<pos.count;i+=4){v.fromBufferAttribute(pos,i);mesh.applyBoneTransform(i,v);v.applyMatrix4(mesh.matrixWorld);floor=Math.min(floor,v.y);if(v.y<(result.worstFloor?.y??0))result.worstFloor={y:v.y,index:i,rest:new THREE.Vector3().fromBufferAttribute(pos,i).toArray(),weights:[0,1,2,3].map(k=>[mesh.skeleton.bones[mesh.geometry.attributes.skinIndex.array[i*4+k]].name,mesh.geometry.attributes.skinWeight.array[i*4+k]]),state:pet.snapshot().state};}
    for(let e=0;e+1<idx.count;e+=9){const a=idx.getX(e),b=idx.getX(e+1);v.fromBufferAttribute(pos,a);w.fromBufferAttribute(pos,b);const rest=v.distanceTo(w);if(rest<.003)continue;const original=[v.toArray(),w.toArray()];mesh.applyBoneTransform(a,v);mesh.applyBoneTransform(b,w);const ratio=v.distanceTo(w)/rest;stretch=Math.max(stretch,ratio);if(ratio>(result.worstEdge?.ratio??0))result.worstEdge={ratio,state:pet.snapshot().state,sit:pet.snapshot().sit,original,weights:[a,b].map(id=>[0,1,2,3].map(k=>[mesh.skeleton.bones[mesh.geometry.attributes.skinIndex.array[id*4+k]].name,mesh.geometry.attributes.skinWeight.array[id*4+k]]))};}
  }
  for(const p of pairs)result.faceDistanceError=Math.max(result.faceDistanceError,Math.abs(vertex(p.a).distanceTo(vertex(p.b))-p.rest));
  for(const f of pet.snapshot().feet)ik=Math.max(ik,new THREE.Vector3().fromArray(f.actual).distanceTo(new THREE.Vector3().fromArray(f.target)));
  result.minimumFloor=Math.min(result.minimumFloor,floor);return{floor,stretch,ik};
}
for(const pose of ['idle','sit','lie','idle','walk']){
  pet.setRestPose(pose);const metrics={minimumFloor:Infinity,maximumStretch:0,maximumIK:0};
  for(let frame=0;frame<720;frame++){pet.update(1/60,true);const snapshot=pet.snapshot();if(!result.states.includes(snapshot.state))result.states.push(snapshot.state);if(frame%30)continue;const m=measure();metrics.minimumFloor=Math.min(metrics.minimumFloor,m.floor);metrics.maximumStretch=Math.max(metrics.maximumStretch,m.stretch);if(snapshot.sideLie===0)metrics.maximumIK=Math.max(metrics.maximumIK,m.ik);if(snapshot.state==='walk'){result.walking.frames++;result.walking.maximumIK=Math.max(result.walking.maximumIK,m.ik);result.walking.maximumStretch=Math.max(result.walking.maximumStretch,m.stretch);}}
  result.poses[pose]={...metrics,snapshot:pet.snapshot()};
}
for(const rest of ['sit','lie'])for(const [x,z] of [[8,8],[-8,8],[-8,-8],[8,-8]]){
  pet.setRestPose(rest);for(let f=0;f<480;f++)pet.update(1/60,true);
  camera.position.set(x,2,z);camera.lookAt(model.position);camera.updateMatrixWorld();pet.react();let faced=false;
  for(let f=0;f<1800;f++){pet.update(1/60,true);if(f%30===0)measure();const s=pet.snapshot();if(s.sideLie<.01&&s.sit<.01&&s.state==='curious'&&s.facingCamera>.995)faced=true;}
  assert(faced,`${rest} 点击后没有正面看镜头`);result.looks.push({rest,x,z,faced});
}
const paused=pet.snapshot().position;
for(let f=0;f<180;f++)pet.update(1/60,false);
assert.deepEqual(pet.snapshot().position,paused,'暂停时不应移动');
const reducedAsset=await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'');
const reducedModel=reducedAsset.scene;reducedModel.position.fromArray(spec.position);reducedModel.updateMatrixWorld(true);
const reduced=createHousePet(reducedModel,spec,{...options,reducedMotion:true});
const still=reduced.snapshot().position;
for(let f=0;f<3600;f++)reduced.update(1/60,true);
assert.deepEqual(reduced.snapshot().position,still,'减少动态效果时不应自动移动');
result.pause=true;result.reducedMotion=true;result.runtimeUrl=spec.url;
result.faceVertices=face.length;result.facePairs=pairs.length;result.runtimeSHA=createHash('sha256').update(data).digest('hex');
console.log(JSON.stringify({face:result.faceDistanceError,poses:Object.fromEntries(Object.entries(result.poses).map(([key,p])=>[key,{floor:p.minimumFloor,stretch:p.maximumStretch}])),worstEdge:result.worstEdge,worstFloor:result.worstFloor}));
try {
assert(result.faceDistanceError<.00001,'脸部在歪头或坐卧时发生变形');
assert(result.minimumFloor>=-.003,'身体穿地');
assert(result.walking.frames>0&&result.walking.maximumIK<.001,'行走脚掌未到位');
assert(result.walking.maximumStretch<1.8,'行走蒙皮拉伸过大');
assert(result.worstEdge.ratio<2.5,'坐卧时局部蒙皮拉伸过大');
} catch(error) {result.status='failed';result.failure=error.message;writeFileSync(new URL('../docs/cat-fur-review/pose-results.json',import.meta.url),JSON.stringify(result,null,2)+'\n');throw error;}
result.status='passed';result.reviewLimits={faceDistanceError:.00001,floor:-.003,walkStretch:1.8,restStretch:2.5};writeFileSync(new URL('../docs/cat-fur-review/pose-results.json',import.meta.url),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({...result,poses:Object.fromEntries(Object.entries(result.poses).map(([k,p])=>[k,{minimumFloor:p.minimumFloor,maximumStretch:p.maximumStretch,maximumIK:p.maximumIK,sit:p.snapshot.sit,sideLie:p.snapshot.sideLie}]))}));
