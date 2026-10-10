import { readFileSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createHousePet } from "./house-pet.js";

// 验证真实运行时网格、蒙皮变形与完整路线；Node 只省略贴图解码。
const config = JSON.parse(readFileSync(new URL("../src/data/pineapple-house.json", import.meta.url)));
const spec = config.assets.find(a => a.id === "siamese-cat");
if(spec.pet.fur){await import('./verify-house-pet-fur.mjs');process.exit(0);}
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
const pet = createHousePet(model, spec, options);
const states = new Set(), ranges = [[Infinity, -Infinity], [Infinity, -Infinity], [Infinity, -Infinity]];
let minimumFootHeight = Infinity, maximumStretch = 0, maximumIKError = 0, maximumStanceSlip = 0;
let previousFeet, maximumToeSlip = 0;
const toeSamples = [];
for(const mesh of meshes){
  const pos=mesh.geometry.attributes.position,skin=mesh.geometry.attributes.skinIndex,weight=mesh.geometry.attributes.skinWeight;
  for(let v=0;v<pos.count;v++){
    if(pos.getY(v)>.025)continue;
    for(let k=0;k<4;k++){
      const index=skin.array[v*4+k],value=weight.array[v*4+k],name=mesh.skeleton.bones[index]?.name;
      if(value>.999&&name?.endsWith("_paw"))toeSamples.push({mesh,index:v,name:name.slice(4,-4),previous:null});
    }
  }
}
assert(toeSamples.length>20,"脚掌需要完整蒙皮，不能只移动骨骼");
const a = new THREE.Vector3(), b = new THREE.Vector3(), pa = new THREE.Vector3(), pb = new THREE.Vector3();
for (let frame = 0; frame < 14400; frame++) {
  pet.update(1 / 60, true);
  const snapshot = pet.snapshot(); states.add(snapshot.state);
  for (const foot of snapshot.feet) {
    const err=new THREE.Vector3().fromArray(foot.actual).distanceTo(new THREE.Vector3().fromArray(foot.target));maximumIKError=Math.max(maximumIKError,err);
    const previous=previousFeet?.find(f=>f.name===foot.name);
    if(previous&&!previous.swing&&!foot.swing&&previous.contacts===foot.contacts&&snapshot.crouch===0&&previous.crouch===0)maximumStanceSlip=Math.max(maximumStanceSlip,new THREE.Vector3().fromArray(foot.actual).distanceTo(new THREE.Vector3().fromArray(previous.actual)));
  }
  for(const mesh of meshes)mesh.skeleton.update();
  for(const toe of toeSamples){
    const foot=snapshot.feet.find(f=>f.name===toe.name);
    a.fromBufferAttribute(toe.mesh.geometry.attributes.position,toe.index);toe.mesh.applyBoneTransform(toe.index,a);a.applyMatrix4(toe.mesh.matrixWorld);
    if(toe.previous&&!foot.swing&&!toe.previous.swing&&foot.contacts===toe.previous.contacts&&snapshot.crouch===0&&toe.previous.crouch===0)maximumToeSlip=Math.max(maximumToeSlip,a.distanceTo(toe.previous.position));
    toe.previous={position:a.clone(),swing:foot.swing,contacts:foot.contacts,crouch:snapshot.crouch};
  }
  assert(snapshot.feet.filter(f=>f.swing).length<=2,"不能整只猫腾空移动");
  previousFeet=snapshot.feet.map(f=>({...f,crouch:snapshot.crouch}));
  snapshot.position.forEach((v, i) => { ranges[i][0] = Math.min(ranges[i][0], v); ranges[i][1] = Math.max(ranges[i][1], v); });
  assert(snapshot.position[0] >= -1.66 && snapshot.position[0] <= .96 && snapshot.position[2] >= 1.32 && snapshot.position[2] <= 2.2, "宠物越过安全路线");
  if (frame % 30) continue;
  for (const mesh of meshes) {
    mesh.skeleton.update();
    const positions = mesh.geometry.attributes.position, indices = mesh.geometry.index;
    for (let v = 0; v < positions.count; v += 5) {
      a.fromBufferAttribute(positions, v); mesh.applyBoneTransform(v, a); a.applyMatrix4(mesh.matrixWorld);
      minimumFootHeight = Math.min(minimumFootHeight, a.y);
    }
    for (let edge = 0; edge + 1 < indices.count; edge += 9) {
      const i = indices.getX(edge), j = indices.getX(edge + 1);
      a.fromBufferAttribute(positions, i); b.fromBufferAttribute(positions, j);
      const restLength = a.distanceTo(b); if (restLength < .002) continue;
      mesh.applyBoneTransform(i, pa.copy(a)); mesh.applyBoneTransform(j, pb.copy(b));
      maximumStretch=Math.max(maximumStretch,pa.distanceTo(pb)/restLength);
    }
  }
}
assert(states.has("idle") && states.has("walk") && states.has("lie"),`动作状态缺失：${[...states]}`);
assert(maximumIKError < .001, `脚掌 IK 未到位：${maximumIKError}`);
assert(maximumToeSlip < .001, `支撑脚网格滑动：${maximumToeSlip}`);
assert(maximumStanceSlip < .001, `支撑脚滑动：${maximumStanceSlip}`);
assert(maximumStretch < 1.8, `骨骼拉伸异常：${maximumStretch}`);
assert(minimumFootHeight > -.025, `模型明显穿地：${minimumFootHeight}`);
const paused = pet.snapshot().position;
for (let i = 0; i < 180; i++) pet.update(1 / 60, false);
assert.deepEqual(pet.snapshot().position, paused);
const facing=[];let maximumTurnIKError=0,maximumTurnStretch=0,turningFrames=0;
for(const [x,z] of [[8,8],[-8,8],[-8,-8],[8,-8]]){
  const p=pet.snapshot().position;camera.position.set(p[0]+x,2,p[2]+z);camera.updateMatrixWorld();
  pet.react();let faced=false;
  for(let i=0;i<900;i++){
    pet.update(1/60,true);const s=pet.snapshot();if(s.state==='turn')turningFrames++;
    for(const f of s.feet)maximumTurnIKError=Math.max(maximumTurnIKError,new THREE.Vector3().fromArray(f.actual).distanceTo(new THREE.Vector3().fromArray(f.target)));
    if(i%30===0)for(const mesh of meshes){
      mesh.skeleton.update();const pos=mesh.geometry.attributes.position,idx=mesh.geometry.index;
      for(let e=0;e+1<idx.count;e+=9){const vi=idx.getX(e),vj=idx.getX(e+1);a.fromBufferAttribute(pos,vi);b.fromBufferAttribute(pos,vj);const rest=a.distanceTo(b);if(rest<.002)continue;mesh.applyBoneTransform(vi,pa.copy(a));mesh.applyBoneTransform(vj,pb.copy(b));maximumTurnStretch=Math.max(maximumTurnStretch,pa.distanceTo(pb)/rest);}
    }
    if(s.state==='curious'&&s.facingCamera>.999){faced=true;facing.push(s.facingCamera);break;}
  }
  assert(faced,'点击后未正面看向镜头');
}
assert(turningFrames>0,'背向镜头时缺少踏步转身');
assert(maximumTurnIKError<.001,`转身脚掌 IK 未到位：${maximumTurnIKError}`);
assert(maximumTurnStretch<1.8,`转身蒙皮异常：${maximumTurnStretch}`);
let reachedLie=false;
for(let i=0;i<6000;i++){pet.update(1/60,true);if(pet.snapshot().state==='lie'&&pet.snapshot().crouch===1){reachedLie=true;break;}}
assert(reachedLie,'猫咪没有自然趴下');
const resting=pet.snapshot().position;camera.position.set(resting[0]-8,2,resting[2]-8);camera.updateMatrixWorld();pet.react();
let lookedFromLie=false;
for(let i=0;i<900;i++){pet.update(1/60,true);const s=pet.snapshot();if(s.state==='curious'&&s.facingCamera>.999){lookedFromLie=true;break;}}
assert(lookedFromLie,'趴下后点击没有看向镜头');
const reducedAsset = await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength), "");
const reducedModel=reducedAsset.scene;reducedModel.position.fromArray(spec.position);reducedModel.updateMatrixWorld(true);
const reduced = createHousePet(reducedModel, spec, { ...options, reducedMotion: true });
const still = reduced.snapshot().position;
for (let i = 0; i < 3600; i++) reduced.update(1 / 60, true);
assert.deepEqual(reduced.snapshot().position, still);
const result = { status: "passed", durationSeconds: 240, states: [...states], positionRanges: ranges, minimumFootHeight, maximumSampledEdgeStretch: maximumStretch, maximumIKError, maximumStanceSlip, maximumToeSlip, toeVertexSamples:toeSamples.length, maximumTurnIKError,maximumTurnStretch,turningFrames,lookedFromLie,pause: true, clickResponse: true, facingCameraInFourQuadrants:facing, reducedMotion: true, runtimeSHA: JSON.parse(readFileSync(new URL("../docs/cat-review/runtime.json", import.meta.url))).runtimeSha256 };
writeFileSync(new URL("../docs/cat-review/pose-results.json", import.meta.url), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result));
