import * as THREE from 'three';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {loadGeometry} from '../geometry-test-utils.mjs';

const root=process.argv[2]??'tmp/cat-repair-v2';
const input=process.argv[3]??'tmp/cat-eight-neutral-bind.glb';
const candidate=root+'/anatomy-neutral.glb';
function raw(file){const bytes=readFileSync(file),n=bytes.readUInt32LE(12);return{g:JSON.parse(bytes.subarray(20,20+n)),bin:bytes.subarray(28+n)};}
const source=raw(input),output=raw(candidate),hash=b=>createHash('sha256').update(b).digest('hex');
function accessor(file,id){const a=file.g.accessors[id],view=file.g.bufferViews[a.bufferView],width={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT4:16}[a.type],size={5120:1,5121:1,5122:2,5123:2,5125:4,5126:4}[a.componentType],stride=view.byteStride??size*width,buffer=Buffer.alloc(a.count*size*width),offset=(view.byteOffset??0)+(a.byteOffset??0);for(let i=0;i<a.count;i++)file.bin.copy(buffer,i*width*size,offset+i*stride,offset+i*stride+width*size);return hash(buffer);}
const unchanged=[];
for(let i=0;i<source.g.meshes.length;i++)for(let k=0;k<source.g.meshes[i].primitives.length;k++){
 const a=source.g.meshes[i].primitives[k],b=output.g.meshes[i].primitives[k];
 for(const n of ['POSITION','NORMAL','TEXCOORD_0'])if(a.attributes[n]!==undefined)unchanged.push({mesh:i,primitive:k,attribute:n,equal:accessor(source,a.attributes[n])===accessor(output,b.attributes[n])});
 unchanged.push({mesh:i,primitive:k,attribute:'indices',equal:accessor(source,a.indices)===accessor(output,b.indices)});
}
const imageChecks=(source.g.images??[]).map((image,i)=>{const a=source.g.bufferViews[image.bufferView],b=output.g.bufferViews[output.g.images[i].bufferView];return{image:i,equal:hash(source.bin.subarray(a.byteOffset??0,(a.byteOffset??0)+a.byteLength))===hash(output.bin.subarray(b.byteOffset??0,(b.byteOffset??0)+b.byteLength))};});
if([...unchanged,...imageChecks].some(r=>!r.equal))throw Error('原曲面/UV/图像字节改变');
const models=await Promise.all([loadGeometry(input),loadGeometry(candidate)]);
function anatomy(model){const mesh=model.scene.getObjectByName('siamese_cat'),geometry=mesh.geometry,p=geometry.attributes.position,index=geometry.index,unique=[],map=new Map(),inverse=[];
 for(let i=0;i<p.count;i++){const v=new THREE.Vector3().fromBufferAttribute(p,i),key=v.toArray().map(n=>n.toFixed(6)).join(',');if(!map.has(key)){map.set(key,unique.length);unique.push(i);}inverse.push(map.get(key));}
 const edges=new Map(),adj=Array.from({length:unique.length},()=>[]);let minimumTriangleArea=Infinity,zeroTriangles=0;
 for(let i=0;i<index.count;i+=3){const t=[index.getX(i),index.getX(i+1),index.getX(i+2)],v=t.map(i=>new THREE.Vector3().fromBufferAttribute(p,i)),area=v[1].clone().sub(v[0]).cross(v[2].clone().sub(v[0])).length()*.5;minimumTriangleArea=Math.min(minimumTriangleArea,area);if(area<1e-10)zeroTriangles++;
  for(let e=0;e<3;e++){let a=inverse[t[e]],b=inverse[t[(e+1)%3]];if(a===b)continue;if(a>b)[a,b]=[b,a];const key=a+'/'+b;if(edges.has(key))edges.get(key).uses++;else{const pa=new THREE.Vector3().fromBufferAttribute(p,unique[a]),pb=new THREE.Vector3().fromBufferAttribute(p,unique[b]);edges.set(key,{a,b,uses:1,length:pa.distanceTo(pb)});adj[a].push(b);adj[b].push(a);}}
 }
 let components=0;const visited=new Set();for(let i=0;i<unique.length;i++)if(!visited.has(i)){components++;const queue=[i];visited.add(i);while(queue.length){const a=queue.pop();for(const b of adj[a])if(!visited.has(b)){visited.add(b);queue.push(b);}}}
 return{mesh,geometry,p,index,unique,edges:[...edges.values()],topology:{vertices:p.count,weldedVertices:unique.length,triangles:index.count/3,edges:edges.size,boundaryEdges:[...edges.values()].filter(e=>e.uses===1).length,nonmanifoldEdges:[...edges.values()].filter(e=>e.uses>2).length,components,minimumTriangleArea,zeroTriangles}};
}
const layouts=models.map(anatomy),jointTests=[];
for(const family of ['front_l','front_r','back_l','back_r']){
 const ids=family.startsWith('back')?['lower','hock','paw']:['lower','paw'];
 for(const suffix of ids){const name='DEF_'+family+'_'+suffix,records=[];
  for(let which=0;which<layouts.length;which++){
   const l=layouts[which],model=models[which].scene,bone=l.mesh.skeleton.bones.find(b=>b.name===name),rest=bone.quaternion.clone(),points=l.unique.map(()=>new THREE.Vector3());let maximumStretch=0,minimumCompression=1,maximumStep=0,worstEdge=null;
   for(let frame=0;frame<=24;frame++){
    // 单关节局部 X 轴渐进屈曲是绑定压力测试，不代表经过动作设计的真实猫姿。
    bone.quaternion.copy(rest).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),-1.7*frame/24));model.updateMatrixWorld(true);l.mesh.skeleton.update();
    for(let i=0;i<l.unique.length;i++){const next=l.mesh.getVertexPosition(l.unique[i],new THREE.Vector3());if(frame)maximumStep=Math.max(maximumStep,next.distanceTo(points[i]));points[i].copy(next);}
    for(const e of l.edges){if(e.length<1e-5)continue;const ratio=points[e.a].distanceTo(points[e.b])/e.length;if(ratio>maximumStretch){maximumStretch=ratio;worstEdge={frame,restLength:e.length,vertices:[e.a,e.b].map(i=>{const j=l.unique[i],field={};for(let k=0;k<4;k++){const w=l.geometry.attributes.skinWeight.array[j*4+k];if(w>1e-6)field[l.mesh.skeleton.bones[l.geometry.attributes.skinIndex.array[j*4+k]].name]=w;}return{index:j,rest:new THREE.Vector3().fromBufferAttribute(l.p,j).toArray(),posed:points[i].toArray(),weights:field};})};}minimumCompression=Math.min(minimumCompression,ratio);}
   }
   bone.quaternion.copy(rest);model.updateMatrixWorld(true);l.mesh.skeleton.update();
   const affected=l.unique.filter(i=>{for(let k=0;k<4;k++)if(l.mesh.skeleton.bones[l.geometry.attributes.skinIndex.array[i*4+k]].name===name&&l.geometry.attributes.skinWeight.array[i*4+k]>.01)return true;return false;}).length;
   records.push({binding:which?'anatomy-v2':'old-neutral',frames:25,rotationAxis:[1,0,0],maximumRadians:1.7,affectedUniqueVertices:affected,maximumStretch,minimumCompression,maximumStep,worstEdge});
  }
  jointTests.push({joint:name,records});
 }
}
const report={status:'review',humanReview:'pending',source:input,candidate,checks:{unchanged,imageChecks},topology:layouts[1].topology,jointTests,scope:'字节保持、拓扑与原始线性蒙皮单关节压力测试；不包含 GPU 补形、接地或视觉合格结论。关节极值不通过不应被分位数掩盖。',visualReview:'pending'};
mkdirSync(root,{recursive:true});writeFileSync(root+'/binding-probe.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({allPreservationChecksPass:[...unchanged,...imageChecks].every(r=>r.equal),topology:report.topology,jointTests},null,2));
