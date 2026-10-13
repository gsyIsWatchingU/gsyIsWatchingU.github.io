import fs from 'node:fs';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { RoomNavigation } from '../squidward-navigation.js';

// 只加载最终 GLB 的真实几何/节点变换；不以理想圆形地板替代剖切楼板。
const file=process.argv[2]||'assets/models/neighborhood/squidward-interior-layout-v8.glb';
const b=fs.readFileSync(file),len=b.readUInt32LE(12),j=JSON.parse(b.subarray(20,20+len)),bin=28+len;
function accessor(id){const a=j.accessors[id],view=j.bufferViews[a.bufferView],size={SCALAR:1,VEC2:2,VEC3:3,VEC4:4}[a.type],bytes={5126:4,5125:4,5123:2}[a.componentType],offset=bin+(view.byteOffset||0)+(a.byteOffset||0),values=[];for(let row=0;row<a.count;row++)for(let k=0;k<size;k++){const at=offset+row*(view.byteStride||size*bytes)+k*bytes;values.push(a.componentType===5126?b.readFloatLE(at):a.componentType===5125?b.readUInt32LE(at):b.readUInt16LE(at));}return new THREE.BufferAttribute(a.componentType===5126?new Float32Array(values):new Uint32Array(values),size);}
const nodes=j.nodes.map(n=>{let o;if(n.mesh!==undefined){const p=j.meshes[n.mesh].primitives[0],g=new THREE.BufferGeometry();g.setAttribute('position',accessor(p.attributes.POSITION));if(p.indices!==undefined)g.setIndex(accessor(p.indices));o=new THREE.Mesh(g,new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));}else o=new THREE.Group();o.name=n.name||'';if(n.matrix)o.applyMatrix4(new THREE.Matrix4().fromArray(n.matrix));else{if(n.translation)o.position.fromArray(n.translation);if(n.rotation)o.quaternion.fromArray(n.rotation);if(n.scale)o.scale.fromArray(n.scale);}return o;});
j.nodes.forEach((n,i)=>n.children?.forEach(child=>nodes[i].add(nodes[child])));
const scene=new THREE.Group();j.scenes[j.scene||0].nodes.forEach(i=>scene.add(nodes[i]));scene.updateMatrixWorld(true);
const floor=scene.getObjectByName('floor_2'),obstacles=[];
scene.traverse(o=>{if(!o.isMesh||!o.name.startsWith('living_')||o.name.includes('wall')||o.name.includes('rug'))return;const box=new THREE.Box3().setFromObject(o);if(box.min.y<1.8&&box.max.y>1.23)obstacles.push(box);});
const nav=new RoomNavigation({floor,parent:scene,floorY:1.2,obstacles});
assert(nav.nodes.length>50);
let paths=0,samples=0;
const starts=[nav.nearest([.72,.60]).point,nav.nearest([.4,.64]).point,nav.nearest([.28,-.48]).point,nav.nearest([.65,-.3]).point];
for(const start of starts)for(const wanted of [[0,0],[-.4,-.77],[.28,-.86],[.95,-.6],[.55,-.90],[-.4,-1.13],[-1,1],[2,2],[-2,-2],[.72,.64]]){
  const plan=nav.plan(start,wanted);assert(plan);let from=start;
  for(const to of plan.path){const count=Math.ceil(Math.hypot(to[0]-from[0],to[1]-from[1])/.012);for(let i=0;i<=count;i++){const t=count?i/count:0;assert(nav.clear([from[0]+(to[0]-from[0])*t,from[1]+(to[1]-from[1])*t]),'路径穿过障碍或楼板缺口');samples++;}from=to;}paths++;
}
const layers={kitchen:[.15,1.2],living:[1.2,2.4],bedroom:[2.4,3.6],bath:[3.6,4.62]};let stairs=0,walls=0;
scene.traverse(o=>{if(!o.isMesh)return;const room=Object.keys(layers).find(r=>o.name.startsWith(r+'_'));if(!room)return;const box=new THREE.Box3().setFromObject(o);if(o.name.includes('_stairs_')||o.name.includes('_wall_')){assert(box.min.y>=layers[room][0]-.001);assert(box.max.y<=layers[room][1]+.001);if(o.name.includes('_stairs_'))stairs++;else walls++;}});
assert.equal(walls,4);assert(stairs>35);
const result={file,passed:true,nodes:nav.nodes.length,obstacles:obstacles.length,paths,samples,stairs,walls,initialPositionClear:nav.clear([.72,.60]),alternateHomeClear:nav.clear([.4,.64])};
console.log(JSON.stringify(result,null,2));if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(result,null,2)+'\n');
