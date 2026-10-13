import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { readFileSync,writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { createCompanionSleep } from './house-companion-sleep.js';
async function load(path){
  const data=readFileSync(path),length=data.readUInt32LE(12),gltf=JSON.parse(data.subarray(20,20+length));
  for(const m of gltf.materials??[]){for(const k of Object.keys(m))if(k.endsWith('Texture'))delete m[k];for(const k of Object.keys(m.pbrMetallicRoughness??{}))if(k.endsWith('Texture'))delete m.pbrMetallicRoughness[k];delete m.extensions;}
  delete gltf.textures;delete gltf.images;
  const json=Buffer.from(JSON.stringify(gltf)),padded=Buffer.alloc(Math.ceil(json.length/4)*4,32);json.copy(padded);
  const binary=data.subarray(20+length),bytes=Buffer.alloc(20+padded.length+binary.length);bytes.writeUInt32LE(0x46546c67);bytes.writeUInt32LE(2,4);bytes.writeUInt32LE(bytes.length,8);bytes.writeUInt32LE(padded.length,12);bytes.writeUInt32LE(0x4e4f534a,16);padded.copy(bytes,20);binary.copy(bytes,20+padded.length);
  return new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'');
}
const houseGroup=new THREE.Group(),bed=(await load('assets/house-review/props/bed.glb')).scene;bed.position.set(-1.65,6,-.25);houseGroup.add(bed);
const actor=new THREE.Group(),avatar=new THREE.Group();houseGroup.add(actor);actor.add(avatar);avatar.scale.setScalar(.88/1.25);
const gltf=await load('assets/house-companion/spongebob.glb'),model=gltf.scene;avatar.add(model);houseGroup.updateMatrixWorld(true);
const bounds=new THREE.Box3(),inverse=avatar.matrixWorld.clone().invert();model.traverse(n=>{if(!n.isMesh)return;if(n.isSkinnedMesh)n.computeBoundingBox();else n.geometry.computeBoundingBox();bounds.union((n.isSkinnedMesh?n.boundingBox:n.geometry.boundingBox).clone().applyMatrix4(n.matrixWorld).applyMatrix4(inverse));});
model.scale.setScalar(1.25/bounds.getSize(new THREE.Vector3()).y);model.position.set(0,-bounds.min.y*model.scale.x,-(bounds.min.z+bounds.max.z)*.5*model.scale.x);houseGroup.updateMatrixWorld(true);
const bones=new Map();model.traverse(n=>{if(n.isBone)bones.set(n.name,n);});
const root={dataset:{}},motion=createCompanionSleep({actor,avatar,model,bones,houseGroup,getBed:()=>bed,root,height:.88});
motion.begin();const results=[];let original;bed.traverse(n=>{if(n.material?.name==='purple quilt'&&n.name!=='companion-sleep-quilt')original=n;});
assert(original.visible,'到床边前原被子保持可见');
for(const seconds of [.5,1.9,3.3,4.6,6]){avatar.position.set(0,0,0);avatar.rotation.set(0,0,0);motion.update(seconds);results.push(motion.snapshot());assert(actor.position.toArray().every(Number.isFinite));}
assert.deepEqual(results.map(r=>r.phase),['pull','climb','lie','cover','sleep']);assert(Math.abs(results.at(-1).contactGap-.007)<1e-5);assert(results.at(-1).surface>6.7&&results.at(-1).surface<6.9);
const cover=houseGroup.getObjectByName('companion-sleep-quilt');assert(cover.visible);assert(cover.geometry.attributes.position.array.every(Number.isFinite));
assert.equal(cover.geometry.attributes.position.count,original.geometry.attributes.position.count,'使用原被子的厚度和圆角');
assert.deepEqual(cover.geometry.attributes.uv.array,original.geometry.attributes.uv.array,'保留原被子纹理 UV');
const actual=new THREE.Box3();model.traverse(n=>{if(n.isMesh)for(let i=0;i<n.geometry.attributes.position.count;i++)actual.expandByPoint(n.getVertexPosition(i,new THREE.Vector3()).applyMatrix4(n.matrixWorld));});
assert(Math.abs(actual.min.y-results.at(-1).surface-.007)<.012,'真实蒙皮必须落在床垫上');assert(actual.min.x>bed.position.x-.7&&actual.max.x<bed.position.x+.7&&actual.min.z>bed.position.z-.86&&actual.max.z<bed.position.z+.86,'整个角色必须留在床垫范围内');
motion.reset();assert(!cover.visible&&original.visible);assert.equal(motion.snapshot().phase,'idle');
motion.begin();motion.update(6);assert(cover.visible&&!original.visible,'再次睡觉不得误将动画被子识别成原被子');motion.reset();
writeFileSync('docs/sleep-quilt-review/geometry.json',JSON.stringify({results,actualBounds:{min:actual.min.toArray(),max:actual.max.toArray()},originalVertices:original.geometry.attributes.position.count,uvPreserved:true,repeatedSleep:true,reset:true},null,2)+'\n');console.log('sleep stages / actual skin contact / bed footprint / quilt thickness and UV / repeated sleep / interruption cleanup: PASS');
