import * as THREE from 'three';
import {readFileSync,writeFileSync,mkdirSync,copyFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {loadGeometry} from '../geometry-test-utils.mjs';

const root=process.argv[2]??'tmp/cat-repair-v2',input=process.argv[3]??root+'/neck-patch',out=root+'/neck-weighted',source=input+'/anatomy-neutral.glb';
mkdirSync(out,{recursive:true});
const model=(await loadGeometry(source)).scene,bytes=readFileSync(source),n=bytes.readUInt32LE(12),gltf=JSON.parse(bytes.subarray(20,20+n)),binary=bytes.subarray(28+n),chunks=[binary];let offset=binary.length;
const smooth=(a,b,x)=>{const t=THREE.MathUtils.clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};
const ids=new Map(gltf.skins[0].joints.map((node,i)=>[gltf.nodes[node].name,i])),canonical=new Map(),parts=[];
function append(array,type,count,componentType){const pad=(4-offset%4)%4;if(pad){chunks.push(Buffer.alloc(pad));offset+=pad;}const view=gltf.bufferViews.length,data=Buffer.from(array.buffer,array.byteOffset,array.byteLength);gltf.bufferViews.push({buffer:0,byteOffset:offset,byteLength:data.length});const id=gltf.accessors.length;gltf.accessors.push({bufferView:view,componentType,count,type});chunks.push(data);offset+=data.length;return id;}
for(const name of ['siamese_cat','siamese_cat_head']){
 const mesh=model.getObjectByName(name),g=mesh.geometry,p=g.attributes.position,indices=new Uint16Array(p.count*4),weights=new Float32Array(p.count*4);let changed=0,maximumTransfer=0,protectedVertices=0,maximumProtectedError=0;const examples=[];
 for(let i=0;i<p.count;i++){
  const position=new THREE.Vector3().fromBufferAttribute(p,i),field={};for(let k=0;k<4;k++){const w=g.attributes.skinWeight.array[i*4+k];if(w>1e-8)field[mesh.skeleton.bones[g.attributes.skinIndex.array[i*4+k]].name]=w;}
  const original={...field},headMass=(field.DEF_head??0)+(field.DEF_ear_l??0)+(field.DEF_ear_r??0),entry=smooth(.72,.88,position.y+1.4*position.z)*smooth(.18,.25,position.y),transfer=headMass>.985?0:(field.DEF_chest??0)*entry;
  if(headMass>.985)protectedVertices++;
  if(transfer>1e-8){field.DEF_chest-=transfer;field.DEF_neck=(field.DEF_neck??0)+transfer;maximumTransfer=Math.max(maximumTransfer,transfer);changed++;}
  const key=position.toArray().map(v=>v.toFixed(6)).join(','),selected=canonical.get(key)??field,sorted=Object.entries(selected).filter(([,w])=>w>1e-8).sort((a,b)=>b[1]-a[1]).slice(0,4),total=sorted.reduce((s,[,w])=>s+w,0),result={};
  sorted.forEach(([name,w],k)=>{indices[i*4+k]=ids.get(name);weights[i*4+k]=w/total;result[name]=w/total;});canonical.set(key,result);
  if(headMass>.985)for(const name of new Set([...Object.keys(original),...Object.keys(result)]))maximumProtectedError=Math.max(maximumProtectedError,Math.abs((original[name]??0)-(result[name]??0)));
  if(name==='siamese_cat_head'&&[22,26].includes(i))examples.push({vertex:i,position:position.toArray(),before:original,after:result});
 }
 const node=gltf.nodes.find(n=>n.name===name),primitive=gltf.meshes[node.mesh].primitives[0];primitive.attributes.JOINTS_0=append(indices,'VEC4',p.count,5123);primitive.attributes.WEIGHTS_0=append(weights,'VEC4',p.count,5126);
 if(maximumProtectedError>1e-6)throw Error('纯头/耳权重改变：'+maximumProtectedError);
 parts.push({name,vertices:p.count,changed,maximumChestToNeckTransfer:maximumTransfer,protectedVertices,maximumProtectedError,examples});
}
gltf.buffers[0].byteLength=offset;const json=Buffer.from(JSON.stringify(gltf)),padded=Buffer.alloc(Math.ceil(json.length/4)*4,32);json.copy(padded);const output=Buffer.alloc(28+padded.length+offset);output.writeUInt32LE(0x46546c67);output.writeUInt32LE(2,4);output.writeUInt32LE(output.length,8);output.writeUInt32LE(padded.length,12);output.writeUInt32LE(0x4e4f534a,16);padded.copy(output,20);output.writeUInt32LE(offset,20+padded.length);output.writeUInt32LE(0x004e4942,24+padded.length);let cursor=28+padded.length;for(const chunk of chunks){chunk.copy(output,cursor);cursor+=chunk.length;}
writeFileSync(out+'/anatomy-neutral.glb',output);copyFileSync(input+'/anatomy-skeleton.json',out+'/anatomy-skeleton.json');
const binding=JSON.parse(readFileSync(input+'/binding.json')),report={method:'Continuous chest-to-neck redistribution in the actual cervical collar; original head and ear mass is retained exactly, with pure skull/ears protected',source,sourceSHA256:createHash('sha256').update(bytes).digest('hex'),output:out+'/anatomy-neutral.glb',outputSHA256:createHash('sha256').update(output).digest('hex'),parts,bonesMoved:false,positionsChanged:false,headGeometryChanged:false,uvChanged:false,imagesChanged:false,newVertices:0,transition:{diagonalCoordinate:'y + 1.4z',start:.72,end:.88,heightStart:.18,heightEnd:.25},status:'review',humanReview:'pending'};
binding.neckWeights=report;binding.output=report.output;binding.outputSHA256=report.outputSHA256;writeFileSync(out+'/binding.json',JSON.stringify(binding,null,2)+'\n');writeFileSync(out+'/neck-weights.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
