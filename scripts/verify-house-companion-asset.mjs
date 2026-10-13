import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { readFileSync,writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const data=readFileSync('assets/house-companion/spongebob.glb');
const length=data.readUInt32LE(12),json=JSON.parse(data.subarray(20,20+length));
assert(json.images?.length>0,'必须保留 GPU 贴图');assert(json.skins?.length>0,'必须有蒙皮骨架');
const originalClips=json.animations.map(a=>a.name);for(const clip of ['idle','walk','wave','read','sit','slide','lie','wash','bubble'])assert(originalClips.includes(clip));
const bones=json.skins[0].joints.map(i=>json.nodes[i].name);assert(bones.length<=64);
for(const m of json.meshes)for(const p of m.primitives)delete p.material;
delete json.materials;delete json.textures;delete json.images;
const raw=Buffer.from(JSON.stringify(json)),padded=Buffer.alloc(Math.ceil(raw.length/4)*4,32);raw.copy(padded);
const binary=data.subarray(20+length),bytes=Buffer.alloc(20+padded.length+binary.length);
bytes.writeUInt32LE(0x46546c67,0);bytes.writeUInt32LE(2,4);bytes.writeUInt32LE(bytes.length,8);bytes.writeUInt32LE(padded.length,12);bytes.writeUInt32LE(0x4e4f534a,16);padded.copy(bytes,20);binary.copy(bytes,20+padded.length);
const gltf=await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'');
const model=gltf.scene;model.updateMatrixWorld(true);const meshes=[];model.traverse(n=>{if(n.isSkinnedMesh)meshes.push(n);});assert(meshes.length);
const facial={};for(const mesh of meshes)for(const [name,index] of Object.entries(mesh.morphTargetDictionary??{})){
  const target=mesh.geometry.morphAttributes.position[index],base=mesh.geometry.attributes.position;let max=0,moved=0;
  for(let i=0;i<target.count;i++){const delta=new THREE.Vector3().fromBufferAttribute(target,i);if(!mesh.geometry.morphTargetsRelative)delta.sub(new THREE.Vector3().fromBufferAttribute(base,i));const distance=delta.length();max=Math.max(max,distance);if(distance>.0001)moved++;}
  facial[name]={maxDisplacement:Math.max(facial[name]?.maxDisplacement??0,max),movedVertices:(facial[name]?.movedVertices??0)+moved};
}
for(const name of ['blink','lookRight','lookLeft','lookUp','lookDown','smile','calm','browRaise','talk'])assert(facial[name]?.movedVertices>20&&facial[name].maxDisplacement>.005,`${name} 必须改变实际网格`);
assert(facial.blink.maxDisplacement>.1,'眼睑必须能闭合，不能只有轻微抖动');
let maxWeightError=0;for(const mesh of meshes){const w=mesh.geometry.attributes.skinWeight;for(let i=0;i<w.count;i++)maxWeightError=Math.max(maxWeightError,Math.abs(w.getX(i)+w.getY(i)+w.getZ(i)+w.getW(i)-1));}
assert(maxWeightError<.001);
const samples=[];
for(const mesh of meshes){const p=mesh.geometry.attributes.position,index=mesh.geometry.index;for(let k=0;k<index.count;k+=Math.max(3,Math.floor(index.count/1000/3)*3)){const a=index.getX(k),b=index.getX(k+1);const va=new THREE.Vector3().fromBufferAttribute(p,a),vb=new THREE.Vector3().fromBufferAttribute(p,b),distance=va.distanceTo(vb);if(distance>.003)samples.push({mesh,a,b,distance});}}
const reports=[];
for(const clip of gltf.animations){const mixer=new THREE.AnimationMixer(model);mixer.clipAction(clip).play();const stretches=[];for(const frame of [0,.25,.5,.75,1]){mixer.setTime(clip.duration*frame);model.updateMatrixWorld(true);for(const {mesh,a,b,distance} of samples){const p=mesh.geometry.attributes.position;const va=new THREE.Vector3().fromBufferAttribute(p,a),vb=new THREE.Vector3().fromBufferAttribute(p,b);mesh.applyBoneTransform(a,va);mesh.applyBoneTransform(b,vb);stretches.push(va.distanceTo(vb)/distance);}}stretches.sort((a,b)=>a-b);const p99=stretches[Math.floor(stretches.length*.99)]??0,max=stretches.at(-1)??0;reports.push({clip:clip.name,p99,max});mixer.stopAllAction();mixer.uncacheRoot(model);}
const result={status:'review',runtimeSHA256:createHash('sha256').update(data).digest('hex'),bones,clips:originalClips,maxWeightError,facial,deformation:reports};
writeFileSync('docs/house-companion-review/asset-check.json',JSON.stringify(result,null,2)+'\n');
assert(reports.every(r=>r.p99<1.15&&r.max<2.3),'动作产生明显蒙皮拉伸');console.log(JSON.stringify({status:'passed',bones:bones.length,clips:originalClips.length,maxWeightError,facial,deformation:reports}));
