import * as THREE from 'three';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {loadGeometry} from '../geometry-test-utils.mjs';

// 以腿部曲面截面拟合肘膝，避免把关节放在皮肤外缘。
const input=process.argv[2]??'assets/house-review/props/siamese-cat-clean-bound.glb';
const output=process.argv[3]??'docs/cat-eight-poses-review/joint-fit.json';
const model=(await loadGeometry(input)).scene,mesh=model.getObjectByName('siamese_cat'),g=mesh.geometry,joints={};
for(const family of ['front_l','front_r','back_l','back_r']){
 const points=[],seen=new Set(),height=family.startsWith('front')?.19:.20;
 for(let i=0;i<g.attributes.position.count;i++){
  const point=new THREE.Vector3().fromBufferAttribute(g.attributes.position,i),key=point.toArray().map(v=>v.toFixed(5)).join(',');
  if(seen.has(key)||Math.abs(point.y-height)>.012)continue;
  let mass=0;for(let k=0;k<4;k++)if(mesh.skeleton.bones[g.attributes.skinIndex.array[i*4+k]].name.startsWith('DEF_'+family+'_'))mass+=g.attributes.skinWeight.array[i*4+k];
  if(mass>.6){seen.add(key);points.push(point);}
 }
 if(points.length<12)throw Error('腿部截面样本不足：'+family);
 const center=points.reduce((sum,p)=>sum.add(p),new THREE.Vector3()).divideScalar(points.length);
 joints['DEF_'+family+'_lower']={samples:points.length,position:center.toArray()};
}
writeFileSync(output,JSON.stringify({method:'Unique source surface vertices in elbow/knee height slices, family mass > 0.6; X/Z centroids place joint inside actual limb',sourceSHA256:createHash('sha256').update(readFileSync(input)).digest('hex'),joints},null,2)+'\n');
console.log(output);
