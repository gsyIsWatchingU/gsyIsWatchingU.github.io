import * as THREE from 'three';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {loadGeometry} from '../geometry-test-utils.mjs';
import {createHousePet} from '../house-pet.js';
const source='assets/house-review/props/siamese-kitten-compact.glb',output='assets/house-review/props/siamese-kitten-sit.glb';
const data=readFileSync(source),jsonLength=data.readUInt32LE(12),json=JSON.parse(data.subarray(20,20+jsonLength)),binary=data.subarray(28+jsonLength);
const gltf=await loadGeometry(source),model=gltf.scene;model.updateMatrixWorld(true);const mesh=model.getObjectByName('siamese_cat'),geometry=mesh.geometry,p=geometry.attributes.position;
const tailRoot=model.getObjectByName('pet_tail'),tailBind=tailRoot.getWorldPosition(new THREE.Vector3()).applyMatrix4(mesh.matrixWorld.clone().invert());
globalThis.document={createElement:()=>({style:{},setAttribute(){}})};
const camera=new THREE.PerspectiveCamera();camera.position.set(0,1,3);camera.updateMatrixWorld();
const config=JSON.parse(readFileSync('src/data/pineapple-house.json')),sourceSpec=config.assets.find(a=>a.id==='siamese-cat'),spec={...sourceSpec,position:[0,0,0],rotation:0,pet:{...sourceSpec.pet,route:[[0,.8],[.4,.8],[.4,-.3],[0,-.3]]}};
const pet=createHousePet(model,spec,{root:{dataset:{},append(){},getBoundingClientRect:()=>({left:0,top:0})},canvas:{getBoundingClientRect:()=>({left:0,top:0,width:1000,height:800})},camera,reducedMotion:false});pet.setRestPose('sit');
const names=[],buffers=[],primitive=json.meshes[0].primitives[0];primitive.targets=[];let offset=binary.length;
const smooth=(a,b,x)=>{const t=THREE.MathUtils.clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};
const deform=(v,pose)=>{const s=smooth(.15,-.22,v.z),t=smooth(.20,1,pose),feet=smooth(0,.45,pose),foot=1-smooth(.04,.13,v.y),out=v.clone();out.y-=s*t*(v.y>.055?(v.y-.055)*.40:0);out.y+=s*foot*.014*Math.sin(Math.PI*Math.min(1,pose/.45));out.z+=s*(t*.055+feet*.075*foot);out.x*=1+s*t*(.15-.29*foot);return out;};
for(const level of [.25,.5,.75,1]){
  while(pet.snapshot().sit<level-.00001)pet.update(1/600,true);model.updateMatrixWorld(true);mesh.skeleton.update();
  const pose=pet.snapshot().sit,values=new Float32Array(p.count*3),desiredPositions=new Float32Array(p.count*3),inverses=[];
  const seat=.12*(spec.pet.bodyScale??1)*(pose*pose*(3-2*pose)),tailGoal=deform(tailBind,pose);tailGoal.z-=seat;const attachment=tailGoal.sub(tailRoot.getWorldPosition(new THREE.Vector3()).applyMatrix4(mesh.matrixWorld.clone().invert()));
  for(let i=0;i<p.count;i++){
    const base=new THREE.Vector3().fromBufferAttribute(p,i),actual=mesh.getVertexPosition(i,new THREE.Vector3());let headWeight=0,tailWeight=0;for(let k=0;k<4;k++){const name=mesh.skeleton.bones[geometry.attributes.skinIndex.array[i*4+k]].name,weight=geometry.attributes.skinWeight.array[i*4+k];if(name==='pet_head')headWeight+=weight;if(name.startsWith('pet_tail'))tailWeight+=weight;}const body=smooth(.15,-.22,base.z)*(1-headWeight);
    // 正面胸颈和脸保留骨骼动作；后臀收低、后腿收在腹部下，修正混合蒙皮的薄片。
    const goal=deform(base,pose);goal.z-=seat;goal.lerp(actual.clone().add(attachment),tailWeight);
    const desired=actual.clone().lerp(goal,body);
    desired.toArray(desiredPositions,i*3);
    const si=geometry.attributes.skinIndex,sw=geometry.attributes.skinWeight,skin=new THREE.Matrix4();skin.elements.fill(0);
    for(let k=0;k<4;k++){const m=new THREE.Matrix4().multiplyMatrices(mesh.skeleton.bones[si.array[i*4+k]].matrixWorld,mesh.skeleton.boneInverses[si.array[i*4+k]]),weight=sw.array[i*4+k];for(let e=0;e<16;e++)skin.elements[e]+=m.elements[e]*weight;}
    skin.premultiply(mesh.bindMatrixInverse).multiply(mesh.bindMatrix);
    inverses.push(skin.clone().invert());const delta=desired.applyMatrix4(inverses[i]).sub(base);delta.toArray(values,i*3);
  }
  const posed=geometry.clone();posed.setAttribute('position',new THREE.BufferAttribute(desiredPositions,3));posed.computeVertexNormals();const normalValues=new Float32Array(p.count*3);
  for(let i=0;i<p.count;i++){const normal=new THREE.Vector3().fromBufferAttribute(posed.attributes.normal,i).applyMatrix3(new THREE.Matrix3().setFromMatrix4(inverses[i])).normalize().sub(new THREE.Vector3().fromBufferAttribute(geometry.attributes.normal,i));normal.toArray(normalValues,i*3);}
  const target={};for(const [semantic,array] of [['POSITION',values],['NORMAL',normalValues]]){const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];for(let i=0;i<array.length;i++){min[i%3]=Math.min(min[i%3],array[i]);max[i%3]=Math.max(max[i%3],array[i]);}const buffer=Buffer.from(array.buffer),view=json.bufferViews.length;json.bufferViews.push({buffer:0,byteOffset:offset,byteLength:buffer.length});const accessor=json.accessors.length;json.accessors.push({bufferView:view,componentType:5126,count:p.count,type:'VEC3',min,max});target[semantic]=accessor;buffers.push(buffer);offset+=buffer.length;}primitive.targets.push(target);names.push('sit_'+Math.round(level*100));
}
json.meshes[0].extras={...json.meshes[0].extras,targetNames:names};json.meshes[0].weights=names.map(()=>0);json.buffers[0].byteLength=offset;
const encoded=Buffer.from(JSON.stringify(json)),padded=Buffer.alloc(Math.ceil(encoded.length/4)*4,32);encoded.copy(padded);const result=Buffer.alloc(28+padded.length+offset);result.writeUInt32LE(0x46546c67);result.writeUInt32LE(2,4);result.writeUInt32LE(result.length,8);result.writeUInt32LE(padded.length,12);result.writeUInt32LE(0x4e4f534a,16);padded.copy(result,20);result.writeUInt32LE(offset,20+padded.length);result.writeUInt32LE(0x004e4942,24+padded.length);binary.copy(result,28+padded.length);let start=28+padded.length+binary.length;for(const b of buffers){b.copy(result,start);start+=b.length;}writeFileSync(output,result);
writeFileSync('docs/cat-crouch-review/runtime.json',JSON.stringify({status:'review',humanReview:'pending',source,sourceSHA256:createHash('sha256').update(data).digest('hex'),output,runtimeSHA256:createHash('sha256').update(result).digest('hex'),method:'existing GPU mesh/UV/rig; four sampled skin-space sitting corrective shapes',targets:names,faceUnchanged:true},null,2)+'\n');console.log(output,result.length);
