import * as THREE from 'three';import {readFileSync,writeFileSync} from 'node:fs';import assert from 'node:assert/strict';
import {loadGeometry} from './geometry-test-utils.mjs';import {createHousePet} from './house-pet.js';
const spec=JSON.parse(readFileSync('src/data/pineapple-house.json')).assets.find(a=>a.id==='siamese-cat');assert.equal(spec.pet.sitEnabled,false);assert.equal(spec.pet.lieEnabled,false);
globalThis.document={createElement:()=>({style:{},setAttribute(){}})};const model=(await loadGeometry(spec.url)).scene;model.position.fromArray(spec.position);model.updateMatrixWorld(true);const camera=new THREE.PerspectiveCamera();camera.position.set(0,2,8);
const pet=createHousePet(model,spec,{root:{dataset:{},append(){},getBoundingClientRect:()=>({left:0,top:0})},canvas:{getBoundingClientRect:()=>({left:0,top:0,width:1100,height:800})},camera,reducedMotion:false}),states=new Set();
pet.setRestPose('lie');for(let i=0;i<240;i++)pet.update(1/60,true);assert.equal(pet.snapshot().sideLie,0);pet.setRestPose('walk');
for(let i=0;i<7200;i++){pet.update(1/60,true);const s=pet.snapshot();states.add(s.state);assert.equal(s.sideLie,0);assert.equal(s.sit,0);}assert(states.has('walk'));
writeFileSync('docs/cat-side-rest-v2-review/disabled-gates.json',JSON.stringify({status:'passed',model:spec.url,sitDisabled:true,lieDisabled:true,manualLieBlocked:true,automaticSeconds:120,states:[...states]},null,2)+'\n');console.log('正式页手动与自主坐卧禁用，行走保留：通过');
