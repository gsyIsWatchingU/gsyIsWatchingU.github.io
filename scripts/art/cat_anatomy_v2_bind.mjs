import * as THREE from 'three';
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {loadGeometry} from '../geometry-test-utils.mjs';

// 保留原 GPU 曲面、UV 和图片，只修正中立骨架与关节皮肤分配。
const input=process.argv[2]??'tmp/cat-eight-neutral-bind.glb';
const outputRoot=process.argv[3]??'tmp/cat-repair-v2';
const skeletonFile=process.argv[4]??'docs/cat-eight-poses-review/binding-skeleton.json';
mkdirSync(outputRoot,{recursive:true});
const bytes=readFileSync(input),jsonLength=bytes.readUInt32LE(12);
const gltf=JSON.parse(bytes.subarray(20,20+jsonLength)),binary=bytes.subarray(28+jsonLength);
const model=(await loadGeometry(input)).scene;model.updateMatrixWorld(true);
const body=model.getObjectByName('siamese_cat');
const joints=JSON.parse(readFileSync(skeletonFile));
const ids=new Map(joints.map((j,i)=>[j.name,i]));
const center=n=>new THREE.Vector3(...joints[ids.get(n)].position);
const smooth=(a,b,x)=>{const t=THREE.MathUtils.clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};
const quantile=(values,q)=>{values.sort((a,b)=>a-b);return values[Math.min(values.length-1,Math.floor(q*values.length))]??0;};
const hash=b=>createHash('sha256').update(b).digest('hex');
const families=['front_l','front_r','back_l','back_r'];
const oldFields=new Map();
model.traverse(mesh=>{if(!mesh.isSkinnedMesh)return;const g=mesh.geometry,fields=[];
 for(let i=0;i<g.attributes.position.count;i++){const f={};for(let k=0;k<4;k++){const w=g.attributes.skinWeight.array[i*4+k];if(w>1e-8){const n=mesh.skeleton.bones[g.attributes.skinIndex.array[i*4+k]].name;f[n]=(f[n]??0)+w;}}fields.push(f);}oldFields.set(mesh.name,fields);
});
function familyMass(field,family){return Object.entries(field).reduce((sum,[name,w])=>sum+(name.startsWith('DEF_'+family+'_')?w:0),0);}
function section(family,y){
 const p=body.geometry.attributes.position,index=body.geometry.index,fields=oldFields.get(body.name),segments=[];
 for(let t=0;t<index.count;t+=3){const vi=[index.getX(t),index.getX(t+1),index.getX(t+2)];
  if(vi.reduce((sum,i)=>sum+familyMass(fields[i],family),0)/3<.45)continue;
  const vertices=vi.map(i=>new THREE.Vector3().fromBufferAttribute(p,i));
  const crossings=[];for(let e=0;e<3;e++){const a=vertices[e],b=vertices[(e+1)%3];if((a.y-y)*(b.y-y)<0)crossings.push(a.clone().lerp(b,(y-a.y)/(b.y-a.y)));}
  if(crossings.length===2){const [a,b]=crossings,length=a.distanceTo(b);if(length>1e-8)segments.push({a,b,length});}
 }
 const length=segments.reduce((s,e)=>s+e.length,0),mean=new THREE.Vector3();
 for(const e of segments)mean.addScaledVector(e.a.clone().add(e.b).multiplyScalar(.5),e.length/Math.max(1e-12,length));
 return{height:y,segments:segments.length,length,position:mean.toArray()};
}
const hockFits=[];
for(const family of families.filter(f=>f.startsWith('back'))){
 const name='DEF_'+family+'_hock',before=center(name),fit=section(family,.12);
 if(fit.segments<8)throw Error('跗部真实截面不足：'+family);
 const after=new THREE.Vector3(...fit.position);after.y=.12;
 if(before.distanceTo(after)>.045)throw Error('跗部中心偏移异常：'+family);
 joints[ids.get(name)].position=after.toArray();hockFits.push({name,before:before.toArray(),after:after.toArray(),movement:before.distanceTo(after),section:fit});
}
function nearestOnChain(point,points){let best={distance:Infinity,s:0,segment:0,t:0},offset=0;
 for(let k=0;k<points.length-1;k++){const axis=points[k+1].clone().sub(points[k]),length=axis.length(),t=THREE.MathUtils.clamp(point.clone().sub(points[k]).dot(axis)/(length*length),0,1),q=points[k].clone().addScaledVector(axis,t),distance=point.distanceTo(q);
  if(distance<best.distance)best={distance,s:offset+length*t,segment:k,t};offset+=length;
 }return best;
}
const chainData=families.map(family=>{
 const suffixes=family.startsWith('back')?['upper','lower','hock','paw','toe']:['upper','lower','paw','toe'];
 const names=suffixes.map(s=>'DEF_'+family+'_'+s),points=names.map(center),boundaries=[0];
 for(let k=1;k<points.length;k++)boundaries.push(boundaries[k-1]+points[k].distanceTo(points[k-1]));
 const samples=Array.from({length:points.length-1},()=>[]),p=body.geometry.attributes.position,seen=new Set();
 for(let i=0;i<p.count;i++){const q=new THREE.Vector3().fromBufferAttribute(p,i),key=q.toArray().map(x=>x.toFixed(6)).join(',');if(seen.has(key)||familyMass(oldFields.get(body.name)[i],family)<.5)continue;seen.add(key);const hit=nearestOnChain(q,points);if(hit.t>.12&&hit.t<.88)samples[hit.segment].push(hit.distance);}
 const segments=samples.map((values,k)=>{const length=points[k].distanceTo(points[k+1]),r50=quantile([...values],.5),r90=quantile([...values],.9),radius=THREE.MathUtils.clamp(r50||.025,.016,k===0?.07:.055);return{bone:names[k],start:points[k].toArray(),end:points[k+1].toArray(),length,samples:values.length,radius,surfaceRadiusP90:r90};});
 const widths=points.slice(1,-1).map((_,k)=>Math.min(.055,Math.max(.030,(segments[k].radius+segments[k+1].radius)*.70),segments[k].length*.48,segments[k+1].length*.48));
 const jointAxes=points.slice(1,-1).map((p,k)=>p.clone().sub(points[k]).normalize().add(points[k+2].clone().sub(p).normalize()).normalize());
 const a=points[1].clone().sub(points[0]).normalize(),b=points[2].clone().sub(points[1]).normalize(),normal=a.clone().cross(b).normalize();
 return{family,names,points,boundaries,segments,widths,jointAxes,restPlaneNormal:normal.toArray()};
});
const edits=[],chunks=[binary];let offset=binary.length;
function append(array,type,count,componentType=5126){const pad=(4-offset%4)%4;if(pad){chunks.push(Buffer.alloc(pad));offset+=pad;}const data=Buffer.from(array.buffer,array.byteOffset,array.byteLength),view=gltf.bufferViews.length;gltf.bufferViews.push({buffer:0,byteOffset:offset,byteLength:data.length});const id=gltf.accessors.length;gltf.accessors.push({bufferView:view,componentType,count,type});chunks.push(data);offset+=data.length;return id;}
const fieldsByMesh=new Map(),canonicalWeights=new Map();
for(const node of gltf.nodes.filter(n=>n.mesh!==undefined)){
 const mesh=model.getObjectByName(node.name);if(!mesh?.isSkinnedMesh)continue;
 const old=oldFields.get(mesh.name),g=mesh.geometry,p=g.attributes.position,indices=new Uint16Array(p.count*4),weights=new Float32Array(p.count*4),fields=[];
 let changed=0,maximumDroppedMass=0,maximumNormalizationError=0;
 for(let i=0;i<p.count;i++){
  const point=new THREE.Vector3().fromBufferAttribute(p,i),field={...old[i]};
  // 原头、颈缝及所有 UV 缝的空间位置不动；只扩展侧面肩髋的渐变附着。
  const protectedMass=Object.entries(field).reduce((sum,[n,w])=>sum+(/DEF_(head|neck|ear|tail)/.test(n)?w:0),0);
  if(mesh===body&&protectedMass<.15&&point.y>.16&&point.y<.35){
   const possible=chainData.filter(c=>(c.family.endsWith('l')?point.x<0:point.x>0)).map(c=>{const a=c.points[0],b=c.points[1],hit=nearestOnChain(point,[a,b]),lateral=smooth(.025,.085,Math.abs(point.x)),cap=1-smooth(.23,.345,point.y),mass=.65*(1-smooth(.035,.095,hit.distance))*lateral*cap;return{c,mass};}).sort((a,b)=>b.mass-a.mass);
   const best=possible[0],existing=familyMass(field,best.c.family),desired=Math.max(existing,best.mass),torso=Object.entries(field).reduce((sum,[n,w])=>sum+(/^DEF_(pelvis|spine|chest)/.test(n)?w:0),0),take=Math.min(desired-existing,torso);
   if(take>0){for(const n of Object.keys(field))if(/^DEF_(pelvis|spine|chest)/.test(n))field[n]*=(torso-take)/torso;field[best.c.names[0]]=(field[best.c.names[0]]??0)+take;}
  }
  for(const c of chainData){
   const mass=familyMass(field,c.family);if(mass<1e-8)continue;
   for(const n of Object.keys(field))if(n.startsWith('DEF_'+c.family+'_'))delete field[n];
   // 弯折中心线的最近段弧长在肘外侧有 Voronoi 跳变。以相邻两骨的
   // 夹角平分面计算连续权重，避免相邻顶点突然从上臂跳到前臂。
   const factors=c.points.slice(1,-1).map((joint,k)=>smooth(-c.widths[k],c.widths[k],point.clone().sub(joint).dot(c.jointAxes[k])));
   for(let k=1;k<factors.length;k++)factors[k]=Math.min(factors[k],factors[k-1]);
   const local=factors.map((f,k)=>(k?factors[k-1]:1)-f);local.push(factors.at(-1));
   // 脚掌后缘也有较低顶点，最近骨段的弧长不能直接决定刚性脚底。
   // 用宽而连续的静止支撑平面过渡，避免 y=.035 的权重阶跃。
   const paw=1-smooth(.035,.095,point.y),proximal=local.slice(0,-1).reduce((a,b)=>a+b,0);
   for(let k=0;k<local.length-1;k++)local[k]=proximal>1e-8?local[k]/proximal*(1-paw):(k===local.length-2?1-paw:0);
   local[local.length-1]=paw;
   for(let k=0;k<local.length;k++)if(local[k]>1e-8)field[c.names[k]]=mass*local[k];
  }
  const key=point.toArray().map(v=>v.toFixed(6)).join(','),canonical=canonicalWeights.get(key)??field;
  const sorted=Object.entries(canonical).filter(([,w])=>w>1e-8).sort((a,b)=>b[1]-a[1]),top=sorted.slice(0,4),total=top.reduce((s,[,w])=>s+w,0);maximumDroppedMass=Math.max(maximumDroppedMass,sorted.slice(4).reduce((s,[,w])=>s+w,0));
  if(!(total>.99-maximumDroppedMass))throw Error('权重丢失：'+mesh.name+'/'+i);
  const result={};for(let k=0;k<top.length;k++){const[n,w]=top[k];indices[i*4+k]=ids.get(n);weights[i*4+k]=w/total;result[n]=w/total;}
  maximumNormalizationError=Math.max(maximumNormalizationError,Math.abs(Object.values(result).reduce((a,b)=>a+b,0)-1));
  if(Object.entries(result).some(([n,w])=>Math.abs(w-(old[i][n]??0))>1e-5))changed++;
  fields.push(result);canonicalWeights.set(key,result);
 }
 fieldsByMesh.set(mesh.name,fields);const primitive=gltf.meshes[node.mesh].primitives[0];primitive.attributes.JOINTS_0=append(indices,'VEC4',p.count,5123);primitive.attributes.WEIGHTS_0=append(weights,'VEC4',p.count);delete primitive.targets;delete gltf.meshes[node.mesh].weights;delete gltf.meshes[node.mesh].extras?.targetNames;
 edits.push({name:mesh.name,vertices:p.count,changed,maximumDroppedMass,maximumNormalizationError});
}
// 在重建的 35 骨静止坐标系中重算 inverseBind，不复用 33 骨矩阵。
const meshNodes=gltf.nodes.filter(n=>n.mesh!==undefined).map(n=>({...n}));
gltf.nodes=joints.map(j=>({name:j.name,translation:new THREE.Vector3(...j.position).sub(j.parent<0?new THREE.Vector3():new THREE.Vector3(...joints[j.parent].position)).toArray(),...((j.axis||j.faceYaw!==undefined)?{extras:{...(j.axis?{earAxis:j.axis}:{}),...(j.faceYaw!==undefined?{faceYaw:j.faceYaw}:{})}}:{})}));
joints.forEach((j,i)=>{if(j.parent>=0)(gltf.nodes[j.parent].children??=[]).push(i);});
for(const n of meshNodes){delete n.children;delete n.translation;delete n.rotation;delete n.scale;n.skin=0;gltf.nodes.push(n);}
gltf.scenes=[{nodes:[0,...meshNodes.map((_,i)=>joints.length+i)]}];gltf.scene=0;
const inverse=new Float32Array(joints.length*16);joints.forEach((j,i)=>new THREE.Matrix4().makeTranslation(...j.position.map(v=>-v)).toArray(inverse,i*16));
gltf.skins=[{joints:joints.map((_,i)=>i),inverseBindMatrices:append(inverse,'MAT4',joints.length),skeleton:0,name:'cat_anatomy_v2'}];delete gltf.animations;
gltf.buffers[0].byteLength=offset;const json=Buffer.from(JSON.stringify(gltf)),padded=Buffer.alloc(Math.ceil(json.length/4)*4,32);json.copy(padded);
const output=Buffer.alloc(28+padded.length+offset);output.writeUInt32LE(0x46546c67);output.writeUInt32LE(2,4);output.writeUInt32LE(output.length,8);output.writeUInt32LE(padded.length,12);output.writeUInt32LE(0x4e4f534a,16);padded.copy(output,20);output.writeUInt32LE(offset,20+padded.length);output.writeUInt32LE(0x004e4942,24+padded.length);
let cursor=28+padded.length;for(const chunk of chunks){chunk.copy(output,cursor);cursor+=chunk.length;}
const outputFile=outputRoot+'/anatomy-neutral.glb';writeFileSync(outputFile,output);writeFileSync(outputRoot+'/anatomy-skeleton.json',JSON.stringify(joints,null,2)+'\n');
const checked=(await loadGeometry(outputFile)).scene;checked.updateMatrixWorld(true);let maximumRestDisplacement=0,maximumSeamWeightDifference=0;
const massByBone={},point=new THREE.Vector3(),vertex=new THREE.Vector3(),shared=new Map();
for(const name of fieldsByMesh.keys()){const mesh=checked.getObjectByName(name),source=model.getObjectByName(name);mesh.skeleton.update();
 for(let i=0;i<mesh.geometry.attributes.position.count;i++){
  source.getVertexPosition(i,point);mesh.getVertexPosition(i,vertex);maximumRestDisplacement=Math.max(maximumRestDisplacement,point.distanceTo(vertex));
  const field=fieldsByMesh.get(name)[i],key=vertex.toArray().map(v=>v.toFixed(6)).join(',');
  if(shared.has(key)){const old=shared.get(key);for(const n of new Set([...Object.keys(old),...Object.keys(field)]))maximumSeamWeightDifference=Math.max(maximumSeamWeightDifference,Math.abs((old[n]??0)-(field[n]??0)));}else shared.set(key,field);
  for(const[n,w]of Object.entries(field))massByBone[n]=(massByBone[n]??0)+w;
 }
}
if(maximumRestDisplacement>1e-6)throw Error('静止曲面改变：'+maximumRestDisplacement);
if(maximumSeamWeightDifference>1e-5)throw Error('共享顶点权重不一致：'+maximumSeamWeightDifference);
const capsuleData=chainData.map(c=>{const basis=c.points.slice(0,-1).map((p,k)=>{const y=c.points[k+1].clone().sub(p).normalize(),x=new THREE.Vector3(...c.restPlaneNormal),z=x.clone().cross(y).normalize();x.copy(y).cross(z).normalize();return{bone:c.names[k],origin:p.toArray(),basisColumns:[x.toArray(),y.toArray(),z.toArray()],quaternion:new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(x,y,z)).toArray()};});return{family:c.family,segments:c.segments,transitionWidths:c.widths,jointBisectorAxes:c.jointAxes.map(v=>v.toArray()),restPlaneNormal:c.restPlaneNormal,bases:basis};});
const report={status:'review',humanReview:'pending',method:'Original owned-GPU surface and original images; perimeter-fitted hind hocks; continuous joint-bisector plane weights, broad sole transition and lateral proximal attachment blending',input,output:outputFile,sourceSHA256:hash(bytes),outputSHA256:hash(output),bones:joints.length,geometryChanged:false,uvChanged:false,imagesChanged:false,inverseBindRecomputed:true,bonePositionChanges:hockFits,parts:edits,maximumRestDisplacement,maximumSeamWeightDifference,massByBone,chains:capsuleData,visualVerification:'Pending: no posed image is validated by this neutral binding probe'};
writeFileSync(outputRoot+'/binding.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({output:outputFile,bones:joints.length,maximumRestDisplacement,maximumSeamWeightDifference,hockMass:[massByBone.DEF_back_l_hock,massByBone.DEF_back_r_hock],parts:edits},null,2));
