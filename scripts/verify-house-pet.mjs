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
const options = { root: { dataset: {} }, canvas: { getBoundingClientRect: () => ({ left: 0, top: 0, width: 1280, height: 720 }) }, camera, reducedMotion: false };
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
    if(previous&&!previous.swing&&!foot.swing&&previous.contacts===foot.contacts)maximumStanceSlip=Math.max(maximumStanceSlip,new THREE.Vector3().fromArray(foot.actual).distanceTo(new THREE.Vector3().fromArray(previous.actual)));
  }
  for(const mesh of meshes)mesh.skeleton.update();
  for(const toe of toeSamples){
    const foot=snapshot.feet.find(f=>f.name===toe.name);
    a.fromBufferAttribute(toe.mesh.geometry.attributes.position,toe.index);toe.mesh.applyBoneTransform(toe.index,a);a.applyMatrix4(toe.mesh.matrixWorld);
    if(toe.previous&&!foot.swing&&!toe.previous.swing&&foot.contacts===toe.previous.contacts)maximumToeSlip=Math.max(maximumToeSlip,a.distanceTo(toe.previous.position));
    toe.previous={position:a.clone(),swing:foot.swing,contacts:foot.contacts};
  }
  assert(snapshot.feet.filter(f=>f.swing).length<=2,"不能整只猫腾空移动");
  previousFeet=snapshot.feet;
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
assert(states.has("idle") && states.has("walk"));
assert(maximumIKError < .001, `脚掌 IK 未到位：${maximumIKError}`);
assert(maximumToeSlip < .001, `支撑脚网格滑动：${maximumToeSlip}`);
assert(maximumStanceSlip < .001, `支撑脚滑动：${maximumStanceSlip}`);
assert(maximumStretch < 1.8, `骨骼拉伸异常：${maximumStretch}`);
assert(minimumFootHeight > -.025, `模型明显穿地：${minimumFootHeight}`);
const paused = pet.snapshot().position;
for (let i = 0; i < 180; i++) pet.update(1 / 60, false);
assert.deepEqual(pet.snapshot().position, paused);
pet.react();for(let i=0;i<150;i++)pet.update(1/60,true);assert.equal(pet.snapshot().state,"curious");
const reducedAsset = await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength), "");
const reducedModel=reducedAsset.scene;reducedModel.position.fromArray(spec.position);reducedModel.updateMatrixWorld(true);
const reduced = createHousePet(reducedModel, spec, { ...options, reducedMotion: true });
const still = reduced.snapshot().position;
for (let i = 0; i < 3600; i++) reduced.update(1 / 60, true);
assert.deepEqual(reduced.snapshot().position, still);
const result = { status: "passed", durationSeconds: 240, states: [...states], positionRanges: ranges, minimumFootHeight, maximumSampledEdgeStretch: maximumStretch, maximumIKError, maximumStanceSlip, maximumToeSlip, toeVertexSamples:toeSamples.length, pause: true, clickResponse: true, reducedMotion: true, runtimeSHA: JSON.parse(readFileSync(new URL("../docs/cat-review/runtime.json", import.meta.url))).runtimeSha256 };
writeFileSync(new URL("../docs/cat-review/pose-results.json", import.meta.url), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result));
