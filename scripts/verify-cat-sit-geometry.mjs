import * as THREE from 'three';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {loadGeometry} from './geometry-test-utils.mjs';
import {createHousePet} from './house-pet.js';
globalThis.document={createElement:()=>({style:{},setAttribute(){}})};
const config=JSON.parse(readFileSync('src/data/pineapple-house.json')),source=config.assets.find(a=>a.id==='siamese-cat'),spec={...source,position:[0,0,0],pet:{...source.pet,route:[[0,.8],[.4,.8],[.4,-.3],[0,-.3]]}},model=(await loadGeometry(source.url)).scene;model.updateMatrixWorld(true);
const camera=new THREE.PerspectiveCamera();camera.position.set(0,1,3);const pet=createHousePet(model,spec,{root:{dataset:{},append(){},getBoundingClientRect:()=>({left:0,top:0})},canvas:{getBoundingClientRect:()=>({left:0,top:0,width:1000,height:800})},camera,reducedMotion:false}),mesh=model.getObjectByName('siamese_cat'),p=mesh.geometry.attributes.position,rear=[],front=[];
for(let i=0;i<p.count;i++){let tail=0,paw=0;for(let k=0;k<4;k++){const name=mesh.skeleton.bones[mesh.geometry.attributes.skinIndex.array[i*4+k]].name,weight=mesh.geometry.attributes.skinWeight.array[i*4+k];if(name.startsWith('pet_tail'))tail+=weight;if(name.startsWith('pet_front')&&name.endsWith('_paw'))paw+=weight;}if(p.getZ(i)<-.16&&p.getY(i)>.15&&p.getY(i)<.4&&tail<.01)rear.push(i);if(p.getZ(i)>.12&&p.getY(i)<.015&&paw>.995)front.push(i);}
assert(front.length>100,'应采样足够的实际前爪接触面');
const position=i=>mesh.getVertexPosition(i,new THREE.Vector3()).applyMatrix4(mesh.matrixWorld),mean=ids=>ids.reduce((n,i)=>n+position(i).y,0)/ids.length;
pet.setRestPose('idle');for(let f=0;f<180;f++)pet.update(1/60,true);const standingY=mean(rear);pet.setRestPose('sit');for(let f=0;f<1000&&pet.snapshot().state!=='sit';f++)pet.update(1/60,true);assert.equal(pet.snapshot().state,'sit');const anchors=front.map(position);let maximumJump=0,previous=rear.filter((_,i)=>i%97===0).map(position),frontDrift=0;const frames=[];
for(let f=0;f<360;f++){pet.update(1/60,true);const current=rear.filter((_,i)=>i%97===0).map(position);maximumJump=Math.max(maximumJump,...current.map((v,i)=>v.distanceTo(previous[i])));previous=current;frontDrift=Math.max(frontDrift,...front.map((id,i)=>position(id).distanceTo(anchors[i])));if(f%30===0)frames.push({frame:f,sit:pet.snapshot().sit,rearY:mean(rear)});}
const seatedY=mean(rear);console.log({standingY,seatedY,maximumJump,frontDrift});assert(standingY-seatedY>.05,'后臀必须实际降低');assert(frontDrift<.001,'前爪必须稳定支撑');assert(maximumJump<.012,'蹲坐过程中不能跳变');assert(mesh.morphTargetInfluences[3]>.999,'最终必须进入完整坐姿');
pet.react();for(let f=0;f<240;f++)pet.update(1/60,true);assert(pet.snapshot().sit<.001,'打招呼时应能自然起身');assert(mesh.morphTargetInfluences.every(v=>v===0),'起身后必须清除坐姿修正');
writeFileSync('docs/cat-crouch-review/geometry.json',JSON.stringify({status:'passed',standingY,seatedY,rearDrop:standingY-seatedY,maximumJump,frontDrift,frames,rise:true},null,2)+'\n');console.log('actual rear lowering / anchored front paws / continuous sit / clean rise: PASS');
