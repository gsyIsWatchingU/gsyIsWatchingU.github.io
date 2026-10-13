import * as THREE from 'three';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {loadGeometry} from './geometry-test-utils.mjs';
import {createHousePet} from './house-pet.js';

globalThis.document={createElement:()=>({style:{},setAttribute(){}})};
const source=JSON.parse(readFileSync(process.argv[2]??'docs/cat-sit-v2-review/pet-spec.json'));
const output=process.argv[3]??'docs/cat-sit-v2-review';
const spec={...source,position:[0,0,0],pet:{...source.pet,route:[[0,.8],[.4,.8],[.4,-.3],[0,-.3]]}};
const model=(await loadGeometry(source.url)).scene;model.updateMatrixWorld(true);
const camera=new THREE.PerspectiveCamera();camera.position.set(0,1,3);
const pet=createHousePet(model,spec,{root:{dataset:{},append(){},getBoundingClientRect:()=>({left:0,top:0})},canvas:{getBoundingClientRect:()=>({left:0,top:0,width:1000,height:800})},camera,reducedMotion:false});
const mesh=model.getObjectByName('siamese_cat'),p=mesh.geometry.attributes.position,rear=[],front=[];
for(let i=0;i<p.count;i++){
  let body=0,paw=0;
  for(let k=0;k<4;k++){
    const name=mesh.skeleton.bones[mesh.geometry.attributes.skinIndex.array[i*4+k]].name,weight=mesh.geometry.attributes.skinWeight.array[i*4+k];
    if(['pet_root','pet_chest','pet_haunch','pet_back_l_upper','pet_back_r_upper'].includes(name))body+=weight;
    if(name.startsWith('pet_front')&&name.endsWith('_paw'))paw+=weight;
  }
  // A real rump surface, excluding feet and tail: a floor minimum alone cannot prove sitting.
  if(p.getZ(i)<-.1&&p.getY(i)>.08&&p.getY(i)<.4&&body>.7)rear.push(i);
  if(p.getZ(i)>.12&&p.getY(i)<.015&&paw>.995)front.push(i);
}
assert(front.length>100&&rear.length>100);
const position=i=>mesh.getVertexPosition(i,new THREE.Vector3()).applyMatrix4(mesh.matrixWorld);
pet.setRestPose('idle');for(let i=0;i<180;i++)pet.update(1/60,true);
pet.setRestPose('sit');for(let i=0;i<1000&&pet.snapshot().state!=='sit';i++)pet.update(1/60,true);
assert.equal(pet.snapshot().state,'sit');
const sample=rear.filter((_,i)=>i%43===0),anchors=front.map(position);let prev=sample.map(position),maximumJump=0,frontDrift=0;
for(let i=0;i<300;i++){
  pet.update(1/60,true);const current=sample.map(position);
  maximumJump=Math.max(maximumJump,...current.map((v,k)=>v.distanceTo(prev[k])));prev=current;
  frontDrift=Math.max(frontDrift,...front.map((id,k)=>position(id).distanceTo(anchors[k])));
}
const contact=rear.map(position).filter(v=>v.y<.012),bounds=new THREE.Box3().setFromPoints(contact),size=bounds.getSize(new THREE.Vector3());
console.log({contactCount:contact.length,contactWidth:size.x,contactDepth:size.z,maximumJump,frontDrift});
assert(contact.length>30,'臀部必须有实际接地面');
assert(size.x>.07&&size.z>.015,'臀部接地必须覆盖一片区域');
assert(frontDrift<.001,'坐下时前爪必须稳定支撑');
assert(maximumJump<.012,'坐下中间帧不能跳变');
assert(mesh.morphTargetInfluences[3]>.999);
pet.react();for(let i=0;i<240;i++)pet.update(1/60,true);
assert(pet.snapshot().sit<.001&&mesh.morphTargetInfluences.every(v=>v===0),'起身后必须清除坐姿修正');
writeFileSync(output+'/contact-checks.json',JSON.stringify({status:'passed',contactCount:contact.length,contactWidth:size.x,contactDepth:size.z,maximumJump,frontDrift,rise:true},null,2)+'\n');
console.log('rump contact surface / anchored front paws / continuous sit / clean rise: PASS');
