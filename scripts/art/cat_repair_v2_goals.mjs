import fs from 'node:fs';
import {createHash} from 'node:crypto';
import * as THREE from 'three';
import {loadGeometry} from '../geometry-test-utils.mjs';
import {createCatRepairRig,catRestPoses} from '../cat-repair-v2-rig.js';

const root='tmp/cat-repair-v2',out=process.argv.find(a=>a.startsWith('--out-dir='))?.slice(10)??root+'/input';fs.mkdirSync(out,{recursive:true});
const source=process.argv.find(a=>a.startsWith('--source='))?.slice(9)??'assets/house-review/props/siamese-cat-repair-v2-neutral.glb',asset=await loadGeometry(source),model=asset.scene,pillowSurface=JSON.parse(fs.readFileSync('docs/cat-eight-poses-review/pillow-surface.json'));
const bindingFile=process.argv.find(a=>a.startsWith('--binding='))?.slice(10)??'docs/cat-repair-v2-review/binding-neutral.json',skeletonFile=process.argv.find(a=>a.startsWith('--skeleton='))?.slice(11)??'docs/cat-repair-v2-review/binding-skeleton.json',binding=JSON.parse(fs.readFileSync(bindingFile)),sourceSHA256=createHash('sha256').update(fs.readFileSync(source)).digest('hex');
if(binding.outputSHA256!==sourceSHA256)throw Error('绑定记录与中立模型 SHA-256 不符；新拓扑须显式传 --binding=实际绑定记录');
const rig=createCatRepairRig(model,{pillowSurface}),meshes=['siamese_cat','siamese_cat_head'].map(name=>model.getObjectByName(name)),step=Number(process.argv.find(a=>a.startsWith('--step='))?.slice(7)??'.05');
const selected=process.argv.find(a=>a.startsWith('--poses='))?.slice(8).split(',')??catRestPoses.map(p=>p.id),frames=Math.round(1/step)+1,vertexCount=meshes.reduce((sum,m)=>sum+m.geometry.attributes.position.count,0),p=new THREE.Vector3();
const sources=['scripts/cat-repair-v2-rig.js','scripts/cat-ground-poses-v2.js','scripts/cat-roll-poses-v2.js','scripts/art/cat_gpu_skin.py'];
const metadata={source:'anatomy-neutral.glb',sourceFile:source,sourceSHA256:createHash('sha256').update(fs.readFileSync(source)).digest('hex'),codeSHA256:Object.fromEntries(sources.map(path=>[path,createHash('sha256').update(fs.readFileSync(path)).digest('hex')])),parts:meshes.map(m=>({name:m.name,vertices:m.geometry.attributes.position.count})),vertexCount,bones:meshes[0].skeleton.bones.length,poses:[]};
metadata.bindingSHA256=createHash('sha256').update(fs.readFileSync(bindingFile)).digest('hex');metadata.skeletonSHA256=createHash('sha256').update(fs.readFileSync(skeletonFile)).digest('hex');
const skeleton=JSON.parse(fs.readFileSync(skeletonFile));if(skeleton.length!==metadata.bones||skeleton.some((b,i)=>b.name!==meshes[0].skeleton.bones[i].name))throw Error('骨架记录与中立模型骨顺序不符');
for(const id of selected){
 const points=new Float32Array(frames*vertexCount*3),matrices=new Float32Array(frames*metadata.bones*16),times=[];
 for(let frame=0;frame<frames;frame++){
  const progress=frame/(frames-1);times.push(progress);rig.pose(id,progress);let cursor=frame*vertexCount*3;
  for(const mesh of meshes)for(let i=0;i<mesh.geometry.attributes.position.count;i++){mesh.getVertexPosition(i,p).toArray(points,cursor);cursor+=3;}
  meshes[0].skeleton.bones.forEach((b,i)=>new THREE.Matrix4().multiplyMatrices(b.matrixWorld,meshes[0].skeleton.boneInverses[i]).toArray(matrices,(frame*metadata.bones+i)*16));
 }
 fs.writeFileSync(out+'/'+id+'-goals.f32',Buffer.from(points.buffer));fs.writeFileSync(out+'/'+id+'-matrices.f32',Buffer.from(matrices.buffer));
 metadata.poses.push({id,times,goals:id+'-goals.f32',matrices:id+'-matrices.f32'});console.log(id,frames,'keys',vertexCount,'vertices');
}
fs.copyFileSync(source,out+'/anatomy-neutral.glb');fs.copyFileSync(skeletonFile,out+'/anatomy-skeleton.json');fs.copyFileSync(bindingFile,out+'/binding.json');fs.writeFileSync(out+'/pillow-surface.json',JSON.stringify(pillowSurface));fs.writeFileSync(out+'/goals.json',JSON.stringify(metadata,null,2)+'\n');
