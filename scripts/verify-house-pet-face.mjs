import { readFileSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createHousePet } from "./house-pet.js";

// 验证真实运行时网格、蒙皮变形与完整路线；Node 只省略贴图解码。
const config = JSON.parse(readFileSync(new URL("../src/data/pineapple-house.json", import.meta.url)));
const spec = config.assets.find(a => a.id === "siamese-cat");
const data = readFileSync(new URL(`../${spec.url}`, import.meta.url));
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

let total=0,mixed=0,minWeight=1;const samples=[];
for(const mesh of meshes){
  const pos=mesh.geometry.attributes.position,idx=mesh.geometry.attributes.skinIndex,w=mesh.geometry.attributes.skinWeight;
  for(let i=0;i<pos.count;i++){
    if(pos.getY(i)<.39||pos.getZ(i)<.23)continue;
    let hw=0;for(let k=0;k<4;k++)if(mesh.skeleton.bones[idx.array[i*4+k]].name==='pet_head')hw+=w.array[i*4+k];
    total++;minWeight=Math.min(minWeight,hw);if(hw<.999)mixed++;
    if(samples.length<800)samples.push({mesh,index:i});
  }
}

assert(total>1000&&mixed===0,'脸部仍混入其他骨骼权重');
const pairs=samples.slice(0,-1).map((a,i)=>({a,b:samples[(i*53+17)%samples.length],distance:0}));
function vertex(sample){const v=new THREE.Vector3().fromBufferAttribute(sample.mesh.geometry.attributes.position,sample.index);sample.mesh.applyBoneTransform(sample.index,v);return v.applyMatrix4(sample.mesh.matrixWorld);}
for(const mesh of meshes)mesh.skeleton.update();for(const pair of pairs)pair.distance=vertex(pair.a).distanceTo(vertex(pair.b));
const pet=createHousePet(model,spec,options);let maximumFaceDistanceError=0,maximumNeckStretch=0;const headPoses=[];
for(const cameraX of [-8,0,8]){
  camera.position.set(cameraX,2,8);camera.lookAt(0,.5,0);camera.updateMatrixWorld();pet.react();
  for(let frame=0;frame<240;frame++){
    pet.update(1/60,true);for(const mesh of meshes)mesh.skeleton.update();
    for(const pair of pairs)maximumFaceDistanceError=Math.max(maximumFaceDistanceError,Math.abs(vertex(pair.a).distanceTo(vertex(pair.b))-pair.distance));
    if(frame===90)headPoses.push(pet.snapshot().head);
    if(frame%6)continue;
    for(const mesh of meshes){
      const pos=mesh.geometry.attributes.position,idx=mesh.geometry.index;
      for(let e=0;e+1<idx.count;e+=3){
        const i=idx.getX(e),j=idx.getX(e+1);const a=new THREE.Vector3().fromBufferAttribute(pos,i),b=new THREE.Vector3().fromBufferAttribute(pos,j);
        if(a.y<.32||a.z<-.04)continue;const rest=a.distanceTo(b);if(rest<.002)continue;
        mesh.applyBoneTransform(i,a);mesh.applyBoneTransform(j,b);maximumNeckStretch=Math.max(maximumNeckStretch,a.distanceTo(b)/rest);
      }
    }
  }
}
assert(maximumFaceDistanceError<.00001,'歪头时脸部相对距离改变');
assert(maximumNeckStretch<1.8,'脖子蒙皮拉伸异常');
const result={status:'passed',faceVertices:total,mixedFaceVertices:mixed,minHeadWeight:minWeight,pairSamples:pairs.length,maximumFaceDistanceError,maximumNeckStretch,headPoses,runtimeSHA:JSON.parse(readFileSync(new URL('../docs/cat-review/runtime.json',import.meta.url))).runtimeSha256};
writeFileSync(new URL('../docs/cat-review/face-results.json',import.meta.url),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
