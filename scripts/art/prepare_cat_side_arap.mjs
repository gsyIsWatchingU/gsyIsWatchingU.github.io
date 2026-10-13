import * as THREE from 'three';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {loadGeometry} from '../geometry-test-utils.mjs';
import {createHousePet} from '../house-pet.js';
const source='assets/house-review/props/siamese-kitten-seated-anatomy.glb',output='assets/house-review/props/siamese-kitten-anatomy-side-rest-v2.glb',dir='docs/cat-side-rest-v2-review',temp='tmp/cat-side-arap-v2';
mkdirSync(dir,{recursive:true});mkdirSync(temp,{recursive:true});
const data=readFileSync(source),size=data.readUInt32LE(12),g=JSON.parse(data.subarray(20,20+size)),bin=data.subarray(28+size),model=(await loadGeometry(source)).scene;
model.updateMatrixWorld(true);const mesh=model.getObjectByName('siamese_cat'),geometry=mesh.geometry,p=geometry.attributes.position,skinIndex=geometry.attributes.skinIndex,skinWeight=geometry.attributes.skinWeight;
globalThis.document={createElement:()=>({style:{},setAttribute(){}})};const camera=new THREE.PerspectiveCamera();camera.position.set(0,1,3);
const original=JSON.parse(readFileSync('src/data/pineapple-house.json')).assets.find(a=>a.id==='siamese-cat'),spec={...original,position:[0,0,0],rotation:0,pet:{...original.pet,groundedSideLie:true,poseSideArap:true,lieEnabled:true,sitEnabled:true,sitCorrectives:true,poseSitV3:true,route:[[0,.8],[.4,.8],[.4,-.3],[0,-.3]]}};
const pet=createHousePet(model,spec,{root:{dataset:{},append(){},getBoundingClientRect:()=>({left:0,top:0})},canvas:{getBoundingClientRect:()=>({left:0,top:0,width:1000,height:800})},camera,reducedMotion:false});
const fixed=[],bodyAnchor=[];for(let i=0;i<p.count;i++){let torso=0,head=0,paw=0,tail=0,limb=0;const families=new Map();for(let k=0;k<4;k++){const name=mesh.skeleton.bones[skinIndex.array[i*4+k]].name,w=skinWeight.array[i*4+k];if(['pet_root','pet_chest','pet_haunch'].includes(name))torso+=w;if(name==='pet_head')head+=w;if(name.endsWith('_paw'))paw+=w;if(name.startsWith('pet_tail'))tail+=w;if(name.startsWith('pet_front')||name.startsWith('pet_back')){limb+=w;const family=name.split('_').slice(0,3).join('_');families.set(family,(families.get(family)??0)+w);}}const spine=torso>.80&&head<.10&&p.getY(i)>.295&&p.getZ(i)>-.23&&p.getZ(i)<.14,core=torso>.80&&p.getY(i)>.17&&Math.abs(p.getX(i))<.07&&Math.abs(p.getZ(i))<.12;bodyAnchor.push(spine||core);fixed.push(spine||core||head>.90||Math.max(0,...families.values())>.95||paw>.95||(tail>.90&&limb<.10));}
pet.setRestPose('idle');for(let i=0;i<600;i++)pet.update(1/600,true);model.updateMatrixWorld(true);mesh.skeleton.update();const baseline=[];for(let i=0;i<p.count;i++)(bodyAnchor[i]?new THREE.Vector3().fromBufferAttribute(p,i):mesh.getVertexPosition(i,new THREE.Vector3())).toArray(baseline,i*3);
const frames=[];pet.setRestPose('lie');
for(const level of Array.from({length:16},(_,i)=>(i+1)/16)){
 while(pet.snapshot().sideLie<level-.00001)pet.update(1/600,true);model.updateMatrixWorld(true);mesh.skeleton.update();
 const posed=[];for(let i=0;i<p.count;i++)(bodyAnchor[i]?new THREE.Vector3().fromBufferAttribute(p,i):mesh.getVertexPosition(i,new THREE.Vector3())).toArray(posed,i*3);
 const skinMatrices=mesh.skeleton.bones.map((bone,i)=>new THREE.Matrix4().copy(mesh.bindMatrixInverse).multiply(bone.matrixWorld).multiply(mesh.skeleton.boneInverses[i]).multiply(mesh.bindMatrix));
 frames.push({level,posed,matrix:mesh.matrixWorld.toArray(),skinMatrices});
}
writeFileSync(temp+'/input.json',JSON.stringify({positions:Array.from(p.array),indices:Array.from(geometry.index.array),fixed,baseline,frames:frames.map(({level,posed,matrix})=>({level,posed,matrix}))}));
const flag=process.argv.indexOf('--python'),python=flag>=0?process.argv[flag+1]:'python',result=spawnSync(python,['scripts/art/cat_side_arap.py',temp+'/input.json',temp+'/output.json'],{encoding:'utf8',windowsHide:true,maxBuffer:16*1024*1024});
process.stdout.write(result.stdout??'');if(result.status!==0)throw new Error(result.stderr||result.error?.message||'侧卧形态求解失败');
const solved=JSON.parse(readFileSync(temp+'/output.json')),chunks=[bin];let offset=bin.length;
function append(values){const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];for(let i=0;i<values.length;i++){min[i%3]=Math.min(min[i%3],values[i]);max[i%3]=Math.max(max[i%3],values[i]);}const bytes=Buffer.from(values.buffer),view=g.bufferViews.length;g.bufferViews.push({buffer:0,byteOffset:offset,byteLength:bytes.length});const id=g.accessors.length;g.accessors.push({bufferView:view,componentType:5126,count:p.count,type:'VEC3',min,max});chunks.push(bytes);offset+=bytes.length;return id;}
const primitive=g.meshes[0].primitives[0],targets=primitive.targets??[],names=g.meshes[0].extras?.targetNames??[];
for(let frame=0;frame<frames.length;frame++){
 const desired=new Float32Array(solved.frames[frame]),positions=new Float32Array(p.count*3),inverses=[];
 for(let i=0;i<p.count;i++){const skin=new THREE.Matrix4();skin.elements.fill(0);for(let k=0;k<4;k++){const index=skinIndex.array[i*4+k],weight=skinWeight.array[i*4+k];for(let e=0;e<16;e++)skin.elements[e]+=frames[frame].skinMatrices[index].elements[e]*weight;}const inverse=skin.clone().invert();inverses.push(inverse);new THREE.Vector3().fromArray(desired,i*3).applyMatrix4(inverse).sub(new THREE.Vector3().fromBufferAttribute(p,i)).toArray(positions,i*3);}
 const posed=geometry.clone();posed.setAttribute('position',new THREE.BufferAttribute(desired,3));posed.computeVertexNormals();const normalGroups=new Map(),keys=[];
 for(let i=0;i<p.count;i++){const key=[p.getX(i),p.getY(i),p.getZ(i)].map(v=>Math.round(v*100000)).join(',');keys.push(key);const normal=normalGroups.get(key)??new THREE.Vector3();normal.add(new THREE.Vector3().fromBufferAttribute(posed.attributes.normal,i));normalGroups.set(key,normal);}
 const normals=new Float32Array(p.count*3);for(let i=0;i<p.count;i++)if(!fixed[i]||bodyAnchor[i])normalGroups.get(keys[i]).clone().normalize().applyMatrix3(new THREE.Matrix3().setFromMatrix4(inverses[i])).normalize().sub(new THREE.Vector3().fromBufferAttribute(geometry.attributes.normal,i)).toArray(normals,i*3);
 targets.push({POSITION:append(positions),NORMAL:append(normals)});names.push('lie_'+Math.round(frames[frame].level*100));
}
primitive.targets=targets;g.meshes[0].extras={...g.meshes[0].extras,targetNames:names};g.meshes[0].weights=names.map(()=>0);g.buffers[0].byteLength=offset;
const json=Buffer.from(JSON.stringify(g)),padded=Buffer.alloc(Math.ceil(json.length/4)*4,32);json.copy(padded);const bytes=Buffer.alloc(28+padded.length+offset);bytes.writeUInt32LE(0x46546c67);bytes.writeUInt32LE(2,4);bytes.writeUInt32LE(bytes.length,8);bytes.writeUInt32LE(padded.length,12);bytes.writeUInt32LE(0x4e4f534a,16);padded.copy(bytes,20);bytes.writeUInt32LE(offset,20+padded.length);bytes.writeUInt32LE(0x004e4942,24+padded.length);let start=28+padded.length;for(const b of chunks){b.copy(bytes,start);start+=b.length;}writeFileSync(output,bytes);
const metadata={status:'review',humanReview:'pending',sideRestStatus:'review',sideRestMethod:'arap',source,sourceSHA256:createHash('sha256').update(data).digest('hex'),output,runtimeSHA256:createHash('sha256').update(bytes).digest('hex'),method:'四肢整体旋转，肩髋局部刚性过渡；上侧爪叠放；先起身再抬尾回应；原始网格、UV、权重和坐姿目标保留',targets:names,referencePose:'用户参考图01侧躺式'};
writeFileSync(dir+'/runtime.json',JSON.stringify(metadata,null,2)+'\n');writeFileSync(dir+'/solver.json',JSON.stringify({status:'review',stats:solved.stats},null,2)+'\n');writeFileSync(dir+'/pet-spec.json',JSON.stringify({...spec,url:output,pet:{...spec.pet,runtimeSha256:metadata.runtimeSHA256}},null,2)+'\n');console.log(output,bytes.length,metadata.runtimeSHA256);
