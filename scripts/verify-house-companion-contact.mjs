import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {companionSlide} from './house-companion-motion.js';
const spec=JSON.parse(readFileSync('src/data/house-companion.json','utf8'));
const data=readFileSync(spec.model),length=data.readUInt32LE(12),json=JSON.parse(data.subarray(20,20+length));
for(const mesh of json.meshes)for(const p of mesh.primitives)delete p.material;
delete json.images;delete json.materials;delete json.textures;
const raw=Buffer.from(JSON.stringify(json)),pad=Buffer.alloc(Math.ceil(raw.length/4)*4,32);raw.copy(pad);
const bin=data.subarray(20+length),bytes=Buffer.alloc(20+pad.length+bin.length);
bytes.writeUInt32LE(0x46546c67,0);bytes.writeUInt32LE(2,4);bytes.writeUInt32LE(bytes.length,8);bytes.writeUInt32LE(pad.length,12);bytes.writeUInt32LE(0x4e4f534a,16);pad.copy(bytes,20);bin.copy(bytes,20+pad.length);
const gltf=await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'');
const actor=new THREE.Group(),avatar=new THREE.Group(),model=gltf.scene;actor.add(avatar);avatar.add(model);actor.updateMatrixWorld(true);
const bb=new THREE.Box3().setFromObject(model);model.position.set(0,-bb.min.y,-(bb.min.z+bb.max.z)*.5);avatar.scale.setScalar(spec.height/1.25);
const mixer=new THREE.AnimationMixer(model);mixer.clipAction(gltf.animations.find(c=>c.name==='slide')).play();mixer.setTime(1);
const meshes=[];model.traverse(n=>{if(n.isSkinnedMesh&&!n.name.includes('eyelid')&&!n.name.includes('crease'))meshes.push(n);});
function clearance(t,lift=0){
  const slide=companionSlide(t);actor.position.fromArray(slide.position);
  avatar.rotation.set(Math.atan2(-slide.direction[1],Math.hypot(slide.direction[0],slide.direction[2]))-.25,Math.atan2(slide.direction[0],slide.direction[2]),0);
  avatar.position.copy(new THREE.Vector3(0,.35,-.21).multiplyScalar(spec.height/1.25).applyEuler(avatar.rotation)).multiplyScalar(-1);avatar.position.y+=.035+lift;actor.updateMatrixWorld(true);
  let minimum=Infinity;
  for(const mesh of meshes){const p=mesh.geometry.attributes.position;for(let i=0;i<p.count;i++){
    const v=new THREE.Vector3().fromBufferAttribute(p,i);mesh.applyBoneTransform(i,v);v.applyMatrix4(mesh.matrixWorld);
    const u=(v.z+.4)/2.1;if(u<0||u>1)continue;const s=companionSlide(u),width=Math.abs(s.position[0]-v.x);if(width>.34)continue;
    const rail=Math.max(0,(width-.28)/.06)*.13;
    minimum=Math.min(minimum,v.y-s.position[1]-rail);
  }}
  return minimum;
}
const path='src/data/house-companion-contact.json',sha=createHash('sha256').update(data).digest('hex');
if(process.argv.includes('--calibrate')){
  const slideLift=Array.from({length:65},(_,i)=>Math.max(0,.013-clearance(i/64)));
  writeFileSync(path,JSON.stringify({runtimeSHA256:sha,height:spec.height,slideLift},null,2)+'\n');
}
const calibration=JSON.parse(readFileSync(path,'utf8'));assert.equal(calibration.runtimeSHA256,sha);assert.equal(calibration.height,spec.height);
let minimum=Infinity,maximum=0;
for(let i=0;i<=256;i++){
  const u=i/256,index=u*64,lift=Math.max(calibration.slideLift[Math.floor(index)],calibration.slideLift[Math.min(64,Math.ceil(index))]);
  const gap=clearance(u,lift);minimum=Math.min(minimum,gap);maximum=Math.max(maximum,gap);
}
assert(minimum>=0,'坐姿网格不能进入滑面或翻边');assert(maximum<.10,'坐姿不能悬空');
const result={runtimeSHA256:sha,height:spec.height,slideSamples:257,minContactGap:minimum,maxContactGap:maximum,status:'review'};
writeFileSync('docs/house-companion-review/contact-check.json',JSON.stringify(result,null,2)+'\n');console.log(result);
