import * as THREE from 'three';
import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {loadGeometry} from './geometry-test-utils.mjs';
import {createHousePet} from './house-pet.js';
const specPath=process.argv[2]??'docs/cat-side-rest-v2-review/pet-spec.json',reportPath=process.argv[3]??'docs/cat-side-rest-v2-review/volume.json',spec=JSON.parse(readFileSync(specPath)),model=(await loadGeometry(spec.url)).scene;
spec.position=[0,0,0];spec.rotation=0;globalThis.document={createElement:()=>({style:{},setAttribute(){}})};
model.updateMatrixWorld(true);const mesh=model.getObjectByName('siamese_cat'),g=mesh.geometry,p=g.attributes.position,camera=new THREE.PerspectiveCamera();camera.position.set(0,1,3);
const pet=createHousePet(model,spec,{root:{dataset:{},append(){},getBoundingClientRect:()=>({left:0,top:0})},canvas:{getBoundingClientRect:()=>({left:0,top:0,width:1000,height:800})},camera,reducedMotion:false}),pairs=[];
for(const family of ['front_l','front_r','back_l','back_r'])for(const height of [.075,.115,.165]){
 const ids=[];for(let i=0;i<p.count;i++){let weight=0;for(let k=0;k<4;k++)if(mesh.skeleton.bones[g.attributes.skinIndex.array[i*4+k]].name.startsWith('pet_'+family+'_'))weight+=g.attributes.skinWeight.array[i*4+k];if(weight>.99999&&Math.abs(p.getY(i)-height)<.006)ids.push(i);}
 for(const axis of ['X','Z'])if(ids.length>2){ids.sort((a,b)=>p['get'+axis](a)-p['get'+axis](b));const a=ids[0],b=ids.at(-1),rest=new THREE.Vector3().fromBufferAttribute(p,a).distanceTo(new THREE.Vector3().fromBufferAttribute(p,b));if(rest>.015)pairs.push({family,height,axis,a,b,rest});}
}
assert.equal(new Set(pairs.map(p=>p.family)).size,4,'四条腿都应有独立厚度样本');
const records=[];pet.setRestPose('lie');
for(let sample=1;sample<=32;sample++){
 while(pet.snapshot().sideLie<sample/32-.00001)pet.update(1/120,true);model.updateMatrixWorld(true);mesh.skeleton.update();
 let minimumAreaRatio=Infinity,minimumJointAreaRatio=Infinity,maximumStretch=0,worstJoint,worstTriangle;const triangles=g.index;
 for(let i=0;i<triangles.count;i+=3){const ids=[triangles.getX(i),triangles.getX(i+1),triangles.getX(i+2)],rest=ids.map(id=>new THREE.Vector3().fromBufferAttribute(p,id)),area=rest[1].clone().sub(rest[0]).cross(rest[2].clone().sub(rest[0])).length()*.5;if(area<.000001)continue;const actual=ids.map(id=>mesh.getVertexPosition(id,new THREE.Vector3())),changed=actual[1].clone().sub(actual[0]).cross(actual[2].clone().sub(actual[0])).length()*.5;if(changed/area<minimumAreaRatio){minimumAreaRatio=changed/area;worstTriangle={rest:rest.map(v=>v.toArray()),weights:ids.map(id=>[0,1,2,3].map(k=>[mesh.skeleton.bones[g.attributes.skinIndex.array[id*4+k]].name,g.attributes.skinWeight.array[id*4+k]]))};}}
 // 验收本次修改的肩髋、四肢；全网格面积诊断保留，不能与关节结果混为一谈。
 for(let i=0;i<triangles.count;i+=3){const ids=[triangles.getX(i),triangles.getX(i+1),triangles.getX(i+2)];let limb=0;for(const id of ids)for(let k=0;k<4;k++){const name=mesh.skeleton.bones[g.attributes.skinIndex.array[id*4+k]].name;if(name.startsWith('pet_front')||name.startsWith('pet_back'))limb=Math.max(limb,g.attributes.skinWeight.array[id*4+k]);}if(limb<.10)continue;const rest=ids.map(id=>new THREE.Vector3().fromBufferAttribute(p,id)),area=rest[1].clone().sub(rest[0]).cross(rest[2].clone().sub(rest[0])).length()*.5;if(area<.000001)continue;const actual=ids.map(id=>mesh.getVertexPosition(id,new THREE.Vector3())),changed=actual[1].clone().sub(actual[0]).cross(actual[2].clone().sub(actual[0])).length()*.5;if(changed/area<minimumJointAreaRatio){minimumJointAreaRatio=changed/area;worstJoint={ids,rest:rest.map(v=>v.toArray()),world:actual.map(v=>v.clone().applyMatrix4(mesh.matrixWorld).toArray())};}}
 for(let i=0;i<triangles.count;i+=3)for(const [a,b]of [[triangles.getX(i),triangles.getX(i+1)],[triangles.getX(i+1),triangles.getX(i+2)],[triangles.getX(i+2),triangles.getX(i)]]){const rest=new THREE.Vector3().fromBufferAttribute(p,a).distanceTo(new THREE.Vector3().fromBufferAttribute(p,b));if(rest<.003)continue;maximumStretch=Math.max(maximumStretch,mesh.getVertexPosition(a,new THREE.Vector3()).distanceTo(mesh.getVertexPosition(b,new THREE.Vector3()))/rest);}
 const widths=pairs.map(pair=>({...pair,ratio:mesh.getVertexPosition(pair.a,new THREE.Vector3()).distanceTo(mesh.getVertexPosition(pair.b,new THREE.Vector3()))/pair.rest}));records.push({sideLie:pet.snapshot().sideLie,minimumAreaRatio,minimumJointAreaRatio,maximumStretch,worstJoint,worstTriangle,widths});
}
const ratios=records.flatMap(r=>r.widths.map(w=>w.ratio)),minimumWidth=Math.min(...ratios),maximumWidth=Math.max(...ratios),minimumArea=Math.min(...records.map(r=>r.minimumAreaRatio)),minimumJointArea=Math.min(...records.map(r=>r.minimumJointAreaRatio));
const maximumStretch=Math.max(...records.map(r=>r.maximumStretch)),report={runtime:spec.url,runtimeSHA256:createHash('sha256').update(readFileSync(spec.url)).digest('hex'),scope:'四肢厚度、肩髋关节面积与全网格边长；全网格面积仅为诊断',minimumWidth,maximumWidth,minimumArea,minimumJointArea,maximumStretch,records};console.log(JSON.stringify({minimumWidth,maximumWidth,minimumArea,minimumJointArea,maximumStretch,pairs:pairs.length}));
try{assert(minimumWidth>.90&&maximumWidth<1.10,'侧卧不应压扁或拉粗四肢');assert(minimumJointArea>.15,'关节三角形不应压缩成薄片');assert(maximumStretch<2.5,'过渡帧不能出现局部拉长');report.status='passed';}catch(error){report.status='failed';report.failure=error.message;writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');throw error;}
writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
