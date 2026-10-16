import * as THREE from 'three';
import {readFileSync,writeFileSync,mkdirSync,copyFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {loadGeometry} from '../geometry-test-utils.mjs';

const root=process.argv[2]??'tmp/cat-repair-v2',source=root+'/anatomy-neutral.glb',out=root+'/neck-patch';
mkdirSync(out,{recursive:true});
const model=(await loadGeometry(source)).scene,parts=['siamese_cat','siamese_cat_head'].map(n=>model.getObjectByName(n));
const points=[],pointMap=new Map(),originalFaces=[],rawToGlobal=new Map(),representatives=new Map();
for(const mesh of parts){const g=mesh.geometry,p=g.attributes.position,ids=[];
 for(let i=0;i<p.count;i++){const point=new THREE.Vector3().fromBufferAttribute(p,i),key=point.toArray().map(v=>v.toFixed(6)).join(',');if(!pointMap.has(key)){pointMap.set(key,points.length);points.push(point);}const id=pointMap.get(key);ids.push(id);if(mesh===parts[0]&&!representatives.has(id))representatives.set(id,i);}
 rawToGlobal.set(mesh.name,ids);
 for(let i=0;i<g.index.count;i+=3){const raw=[0,1,2].map(k=>g.index.getX(i+k));originalFaces.push({part:mesh.name,face:i/3,raw,ids:raw.map(i=>ids[i])});}
}
const plane=p=>p.y+1.4*p.z;
function area(ids){const[a,b,c]=ids.map(i=>points[i]);return b.clone().sub(a).cross(c.clone().sub(a)).length()*.5;}
function topology(faces,full=false){
 const edges=new Map(),used=new Set(),links=new Map();let small=0,minimumArea=Infinity;
 for(const f of faces){const value=area(f.ids);minimumArea=Math.min(minimumArea,value);if(value<1e-10)small++;
  for(let k=0;k<3;k++){const a=f.ids[k],b=f.ids[(k+1)%3],key=Math.min(a,b)+'/'+Math.max(a,b);used.add(a);if(!edges.has(key))edges.set(key,{a,b,uses:[]});edges.get(key).uses.push({face:f,from:a,to:b});if(!links.has(a))links.set(a,[]);links.get(a).push([b,f.ids[(k+2)%3]]);}
 }
 const boundary=[...edges.values()].filter(e=>e.uses.length===1),nonmanifold=[...edges.values()].filter(e=>e.uses.length>2),fanSplits=[];
 for(const[id,pairs]of links){const adj=new Map();for(const[a,b]of pairs){if(!adj.has(a))adj.set(a,[]);if(!adj.has(b))adj.set(b,[]);adj.get(a).push(b);adj.get(b).push(a);}const visited=new Set();let components=0;for(const n of adj.keys())if(!visited.has(n)){components++;const todo=[n];visited.add(n);while(todo.length){const v=todo.pop();for(const w of adj.get(v))if(!visited.has(w)){visited.add(w);todo.push(w);}}}if(components>1)fanSplits.push({vertex:id,components,position:points[id].toArray()});}
 const inconsistent=[...edges.values()].filter(e=>e.uses.length===2&&e.uses[0].from===e.uses[1].from);
 const result={usedVertices:used.size,triangles:faces.length,edges:edges.size,boundaryEdges:boundary.length,nonmanifoldEdges:nonmanifold.length,splitVertexFans:fanSplits.length,inconsistentWindingEdges:inconsistent.length,minimumArea,nearDegenerateFaces:small,euler:used.size-edges.size+faces.length};
 return full?{...result,boundary,fanSplits,edgeMap:edges}:result;
}
function desc(mesh,i){const g=mesh.geometry,p=new THREE.Vector3().fromBufferAttribute(g.attributes.position,i),weights={};for(let k=0;k<4;k++){const w=g.attributes.skinWeight.array[i*4+k];if(w>1e-7)weights[mesh.skeleton.bones[g.attributes.skinIndex.array[i*4+k]].name]=w;}return{vertex:i,position:p.toArray(),plane:plane(p),oldHardPin:p.y>.53||plane(p)>.92||p.y<.05,weights};}
const head=parts[1],g=head.geometry,edgeFaces=[];
for(let i=0;i<g.index.count;i+=3){const ids=[0,1,2].map(k=>g.index.getX(i+k));if(ids.includes(22)&&ids.includes(26))edgeFaces.push({face:i/3,vertices:ids,area:area(ids.map(i=>rawToGlobal.get(head.name)[i]))});}
const original=topology(originalFaces,true),headEdge={vertices:[desc(head,22),desc(head,26)],faces:edgeFaces,restLength:new THREE.Vector3(...desc(head,22).position).distanceTo(new THREE.Vector3(...desc(head,26).position))};
const summary={source,headEdge,sourceTopology:{...original,boundary:original.boundary.map(e=>({from:points[e.a].toArray(),to:points[e.b].toArray(),length:points[e.a].distanceTo(points[e.b]),part:e.uses[0].face.part})),edgeMap:undefined},headEdgeConclusion:'22/26 are ordinary interior head triangles; both were incorrectly hard pinned despite mixed chest/head weights. Removing the geometric hard-pin plane is required; filling this edge is not appropriate.'};
let faces=originalFaces.map(f=>({...f,ids:[...f.ids]}));const parent=points.map((_,i)=>i),collapsed=[];
const find=i=>{while(parent[i]!==i){parent[i]=parent[parent[i]];i=parent[i];}return i;};
function remap(all,a,b){const result=[],seen=new Set();for(const f of all){const ids=f.ids.map(i=>i===a?b:i);if(new Set(ids).size<3)continue;const key=[...ids].sort((a,b)=>a-b).join('/');if(seen.has(key))continue;seen.add(key);result.push({...f,ids});}return result;}
// 只折叠旧内颈平面中的近共线片；头部数据和图片保留。
// 补面若需中点，复用折叠后的空槽，单独记录该槽的局部属性更新。
for(let pass=0;pass<32;pass++){
 const current=topology(faces),flat=faces.filter(f=>f.part===parts[0].name&&area(f.ids)<1e-10&&f.ids.every(i=>Math.abs(plane(points[i])-.84)<1e-4));
 if(!flat.length)break;let applied=false;
 for(const f of flat){const choices=[0,1,2].map(k=>({a:f.ids[k],b:f.ids[(k+1)%3],distance:points[f.ids[k]].distanceTo(points[f.ids[(k+1)%3]])})).sort((a,b)=>a.distance-b.distance);
  for(const choice of choices){if(choice.distance>.0035)continue;for(const flip of [false,true]){const a=flip?choice.b:choice.a,b=flip?choice.a:choice.b,trial=remap(faces,a,b),state=topology(trial);
   if(state.nonmanifoldEdges>current.nonmanifoldEdges||state.splitVertexFans>current.splitVertexFans||state.boundaryEdges>current.boundaryEdges||state.nearDegenerateFaces>=current.nearDegenerateFaces)continue;
   parent[a]=b;faces=trial;collapsed.push({from:a,to:b,distance:choice.distance,fromPosition:points[a].toArray(),toPosition:points[b].toArray(),removedFaces:current.triangles-state.triangles});applied=true;break;
  }if(applied)break;}if(applied)break;
 }if(!applied)break;
}
const afterCollapse=topology(faces,true),boundaryEdges=afterCollapse.boundary.map(e=>({a:e.uses[0].to,b:e.uses[0].from})),incoming=new Map(),outgoing=new Map();
boundaryEdges.forEach((e,i)=>{if(!outgoing.has(e.a))outgoing.set(e.a,[]);if(!incoming.has(e.b))incoming.set(e.b,[]);outgoing.get(e.a).push(i);incoming.get(e.b).push(i);});
const nodes=[...outgoing.keys()],ambiguous=nodes.filter(n=>outgoing.get(n).length>1);
if(nodes.some(n=>(incoming.get(n)?.length??0)!==outgoing.get(n).length)||ambiguous.some(n=>outgoing.get(n).length!==2))throw Error('颈部残边不是可配对的定向边界');
const to2=id=>new THREE.Vector2(points[id].x,(1.4*points[id].y-points[id].z)/Math.sqrt(2.96));
let selected=null;const patchAttempts=[];
function simpleLoops(loop){const seen=new Map();for(let i=0;i<loop.length;i++){if(seen.has(loop[i])){const j=seen.get(loop[i]);return[...simpleLoops(loop.slice(j,i)),...simpleLoops([...loop.slice(0,j),...loop.slice(i)])];}seen.set(loop[i],i);}return[loop];}
for(let mask=0;mask<2**ambiguous.length;mask++){
 const next=new Map();for(const n of nodes){const ins=incoming.get(n),outs=outgoing.get(n),flip=ambiguous.includes(n)&&Boolean(mask&(1<<ambiguous.indexOf(n)));ins.forEach((id,k)=>next.set(id,outs[flip?outs.length-1-k:k]));}
 const visited=new Set(),loops=[];let valid=true;
 for(let i=0;i<boundaryEdges.length;i++)if(!visited.has(i)){const loop=[];let cursor=i;while(!visited.has(cursor)){visited.add(cursor);loop.push(boundaryEdges[cursor].a);cursor=next.get(cursor);}if(cursor!==i||loop.length<3){valid=false;break;}loops.push(...simpleLoops(loop));}
 if(!valid){patchAttempts.push({mask,reason:'invalid-cycle'});continue;}const patch=[],newPoints=[];
 for(const loop of loops){const coords=loop.map(to2),triangles=THREE.ShapeUtils.triangulateShape(coords,[]);if(triangles.length!==loop.length-2){valid=false;break;}
  const signed=coords.reduce((sum,p,k)=>sum+p.x*coords[(k+1)%coords.length].y-coords[(k+1)%coords.length].x*p.y,0);
  for(const tri of triangles){const pts=tri.map(i=>coords[i]),cross=(pts[1].x-pts[0].x)*(pts[2].y-pts[0].y)-(pts[1].y-pts[0].y)*(pts[2].x-pts[0].x);if(cross*signed<0)[tri[1],tri[2]]=[tri[2],tri[1]];patch.push({part:parts[0].name,face:-1,ids:tri.map(i=>loop[i]),patch:true});}
 }if(!valid){patchAttempts.push({mask,reason:'triangulation',loops});continue;}
 // 凹残孔的对角线可能已被原表面使用。以稍微离开旧切面的中点绕开，
 // 输出时复用折叠后空出的顶点槽，避免四面共边或凹多边形翻线。
 for(let repair=0;repair<8;repair++){
  const merged=topology([...faces,...patch],true),bad=[...merged.edgeMap.values()].find(e=>e.uses.length>2);
  if(!bad)break;const touching=patch.map((f,i)=>({f,i})).filter(({f})=>f.ids.includes(bad.a)&&f.ids.includes(bad.b));
  if(touching.length!==2)break;const tri=touching[0].f.ids.map(i=>points[i]),normal=tri[1].clone().sub(tri[0]).cross(tri[2].clone().sub(tri[0])).normalize(),position=points[bad.a].clone().add(points[bad.b]).multiplyScalar(.5).addScaledVector(normal,.0007),id=points.length;points.push(position);newPoints.push({id,position:position.toArray(),edge:[bad.a,bad.b],offset:.0007});
  for(const {f,i}of touching){const k=f.ids.findIndex((a,k)=>[bad.a,bad.b].includes(a)&&[bad.a,bad.b].includes(f.ids[(k+1)%3])),a=f.ids[k],b=f.ids[(k+1)%3],c=f.ids[(k+2)%3];patch[i]={part:parts[0].name,face:-1,ids:[a,id,c],patch:true};patch.push({part:parts[0].name,face:-1,ids:[id,b,c],patch:true});}
 }
 const result=topology([...faces,...patch]);
 patchAttempts.push({mask,loops,result});
 if(result.nonmanifoldEdges===0&&result.boundaryEdges===0&&result.splitVertexFans===0&&result.inconsistentWindingEdges===0&&(!selected||patch.length<selected.patch.length))selected={mask,patch,loops,result,newPoints};
}
summary.collapse=collapsed;summary.afterCollapse={...afterCollapse,boundary:undefined,fanSplits:afterCollapse.fanSplits,edgeMap:undefined};
summary.patchAttempts=patchAttempts;summary.patch=selected?{mask:selected.mask,loops:selected.loops,triangles:selected.patch.length,topology:selected.result,newPoints:selected.newPoints}:null;
if(selected){
 const finalFaces=[...faces,...selected.patch],rawIndices=[];let changedExistingIndices=0;
 const existingUsed=new Set();for(const f of finalFaces.filter(f=>f.part===parts[0].name))for(let k=0;k<3;k++){const id=f.ids[k];if(selected.newPoints.some(p=>p.id===id))continue;const originalIndex=f.raw?.[k],index=originalIndex!==undefined&&rawToGlobal.get(parts[0].name)[originalIndex]===id?originalIndex:representatives.get(id);existingUsed.add(index);}
 const freeSlots=Array.from({length:parts[0].geometry.attributes.position.count},(_,i)=>i).filter(i=>!existingUsed.has(i));
 if(freeSlots.length<selected.newPoints.length)throw Error('折叠后的空顶点槽不足');
 selected.newPoints.forEach((point,k)=>{point.rawSlot=freeSlots[k];representatives.set(point.id,point.rawSlot);});
 for(const f of finalFaces.filter(f=>f.part===parts[0].name))for(let k=0;k<3;k++){const originalIndex=f.raw?.[k],id=f.ids[k],index=originalIndex!==undefined&&find(rawToGlobal.get(parts[0].name)[originalIndex])===id&&rawToGlobal.get(parts[0].name)[originalIndex]===id?originalIndex:representatives.get(id);if(index===undefined)throw Error('补面引用了不属于身体的原顶点');rawIndices.push(index);if(originalIndex!==index)changedExistingIndices++;}
 const bytes=readFileSync(source),n=bytes.readUInt32LE(12),gltf=JSON.parse(bytes.subarray(20,20+n)),binary=bytes.subarray(28+n),indices=new Uint32Array(rawIndices),chunks=[binary];let offset=binary.length;
 function append(array,type,count,componentType=5126){const pad=(4-offset%4)%4;if(pad){chunks.push(Buffer.alloc(pad));offset+=pad;}const view=gltf.bufferViews.length,data=Buffer.from(array.buffer,array.byteOffset,array.byteLength);gltf.bufferViews.push({buffer:0,byteOffset:offset,byteLength:data.length});const id=gltf.accessors.length;gltf.accessors.push({bufferView:view,componentType,count,type});chunks.push(data);offset+=data.length;return id;}
 const bodyNode=gltf.nodes.find(n=>n.name===parts[0].name),primitive=gltf.meshes[bodyNode.mesh].primitives[0];primitive.indices=append(indices,'SCALAR',indices.length,5125);
 const g=parts[0].geometry,position=g.attributes.position.array.slice(),normal=g.attributes.normal.array.slice(),uv=g.attributes.uv.array.slice(),skinIndex=g.attributes.skinIndex.array.slice(),skinWeight=g.attributes.skinWeight.array.slice();
 for(const point of selected.newPoints){const [a,b]=point.edge.map(id=>representatives.get(id)),slot=point.rawSlot;new THREE.Vector3(...point.position).toArray(position,slot*3);new THREE.Vector3().fromBufferAttribute(g.attributes.normal,a).add(new THREE.Vector3().fromBufferAttribute(g.attributes.normal,b)).normalize().toArray(normal,slot*3);new THREE.Vector2().fromBufferAttribute(g.attributes.uv,a).add(new THREE.Vector2().fromBufferAttribute(g.attributes.uv,b)).multiplyScalar(.5).toArray(uv,slot*2);
  const field=new Map();for(const i of [a,b])for(let k=0;k<4;k++){const id=g.attributes.skinIndex.array[i*4+k],w=g.attributes.skinWeight.array[i*4+k]*.5;field.set(id,(field.get(id)??0)+w);}const top=[...field].sort((a,b)=>b[1]-a[1]).slice(0,4),total=top.reduce((s,[,w])=>s+w,0);for(let k=0;k<4;k++){skinIndex[slot*4+k]=top[k]?.[0]??0;skinWeight[slot*4+k]=(top[k]?.[1]??0)/total;}
 }
 primitive.attributes.POSITION=append(position,'VEC3',position.length/3);const positionAccessor=gltf.accessors[primitive.attributes.POSITION];positionAccessor.min=[Infinity,Infinity,Infinity];positionAccessor.max=[-Infinity,-Infinity,-Infinity];for(let i=0;i<position.length;i++){const k=i%3;positionAccessor.min[k]=Math.min(positionAccessor.min[k],position[i]);positionAccessor.max[k]=Math.max(positionAccessor.max[k],position[i]);}primitive.attributes.NORMAL=append(normal,'VEC3',normal.length/3);primitive.attributes.TEXCOORD_0=append(uv,'VEC2',uv.length/2);primitive.attributes.JOINTS_0=append(skinIndex,'VEC4',skinIndex.length/4,5123);primitive.attributes.WEIGHTS_0=append(skinWeight,'VEC4',skinWeight.length/4);
 const data=Buffer.concat(chunks);gltf.buffers[0].byteLength=data.length;const json=Buffer.from(JSON.stringify(gltf)),padded=Buffer.alloc(Math.ceil(json.length/4)*4,32);json.copy(padded);const result=Buffer.alloc(28+padded.length+data.length);
 result.writeUInt32LE(0x46546c67);result.writeUInt32LE(2,4);result.writeUInt32LE(result.length,8);result.writeUInt32LE(padded.length,12);result.writeUInt32LE(0x4e4f534a,16);padded.copy(result,20);result.writeUInt32LE(data.length,20+padded.length);result.writeUInt32LE(0x004e4942,24+padded.length);data.copy(result,28+padded.length);
 writeFileSync(out+'/anatomy-neutral.glb',result);copyFileSync(root+'/anatomy-skeleton.json',out+'/anatomy-skeleton.json');
 const binding=JSON.parse(readFileSync(root+'/binding.json'));binding.neckPatch={indicesOnly:selected.newPoints.length===0,newVertices:0,repurposedBodyVertexSlots:selected.newPoints.map(p=>p.rawSlot),changedPositionNormalUvAndWeightsAtRepurposedSlots:true,removedFaces:originalFaces.length-faces.length,addedFaces:selected.patch.length,maximumCollapsedEdge:Math.max(...collapsed.map(c=>c.distance)),topology:selected.result};binding.output=out+'/anatomy-neutral.glb';binding.outputSHA256=createHash('sha256').update(result).digest('hex');writeFileSync(out+'/binding.json',JSON.stringify(binding,null,2)+'\n');
 summary.output=out+'/anatomy-neutral.glb';summary.outputSHA256=binding.outputSHA256;summary.indicesOnly=selected.newPoints.length===0;summary.newVertices=0;summary.changedExistingIndices=changedExistingIndices;
}
writeFileSync(out+'/neck-topology.json',JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify({headEdge,sourceTopology:topology(originalFaces),collapsed:collapsed.length,afterCollapse:topology(faces),patch:summary.patch,output:summary.output},null,2));
