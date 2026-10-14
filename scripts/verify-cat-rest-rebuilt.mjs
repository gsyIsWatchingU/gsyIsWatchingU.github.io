import * as THREE from 'three';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {loadGeometry} from './geometry-test-utils.mjs';
import {installCatDualQuaternion} from './cat-dual-quaternion.js';

const root='docs/cat-rest-rebuild-review',runtime=JSON.parse(readFileSync(root+'/runtime.json')),asset=await loadGeometry(runtime.output),model=asset.scene,mesh=model.getObjectByName('siamese_cat'),g=mesh.geometry,p=g.attributes.position;
installCatDualQuaternion(model);const mixer=new THREE.AnimationMixer(model),clip=asset.animations.find(c=>c.name==='lie_down_side'),action=mixer.clipAction(clip);action.setLoop(THREE.LoopOnce,1);action.clampWhenFinished=true;action.play();action.paused=true;
assert.equal(createHash('sha256').update(readFileSync(runtime.output)).digest('hex'),runtime.runtimeSHA256);assert.equal(g.morphAttributes.position?.length??0,0,'新版本使用骨骼片段，不能夹带旧侧卧补形');assert.equal(asset.animations.length,2);assert.equal(mesh.skeleton.bones.length,28);
let maxWeightError=0;for(let i=0;i<p.count;i++){let sum=0;for(let k=0;k<4;k++){const w=g.attributes.skinWeight.array[i*4+k];assert(Number.isFinite(w)&&w>=0);sum+=w;}maxWeightError=Math.max(maxWeightError,Math.abs(1-sum));}assert(maxWeightError<.00001);
const edges=new Map();for(let i=0;i<g.index.count;i+=3){const ids=[g.index.array[i],g.index.array[i+1],g.index.array[i+2]];for(let k=0;k<3;k++){const a=Math.min(ids[k],ids[(k+1)%3]),b=Math.max(ids[k],ids[(k+1)%3]),key=a+':'+b;if(edges.has(key))continue;const length=new THREE.Vector3().fromBufferAttribute(p,a).distanceTo(new THREE.Vector3().fromBufferAttribute(p,b));if(length>.003)edges.set(key,[a,b,length]);}}
const records=[];let minimumFloor=Infinity,maximumStretch=0,previous;
for(let frame=0;frame<=126;frame++){
 action.time=frame/30;mixer.update(0);model.updateMatrixWorld(true);mesh.skeleton.update();const points=Array.from({length:p.count},(_,i)=>mesh.getVertexPosition(i,new THREE.Vector3()));const floor=Math.min(...points.map(p=>p.y));minimumFloor=Math.min(minimumFloor,floor);
 const stretch=[...edges.values()].map(([a,b,rest])=>points[a].distanceTo(points[b])/rest).sort((a,b)=>a-b),max=stretch.at(-1),p99=stretch[Math.floor(stretch.length*.99)];maximumStretch=Math.max(maximumStretch,max);
 let step=0;if(previous)for(let i=0;i<points.length;i++)step=Math.max(step,points[i].distanceTo(previous[i]));assert(step<.06,'相邻烘焙帧不能出现突然跳动');assert(floor>-.001,'任何过渡帧都不能明显穿地');assert(p99<2.3,'不能有大范围面片拉伸');
 records.push({time:frame/30,minimumFloor:floor,p99EdgeStretch:p99,maxEdgeStretch:max,maxFrameDisplacement:step});previous=points;
}
const report={status:'passed',scope:'实际导出的骨骼片段：权重、127帧全网格接地、相邻帧连续性及拉伸分布；局部极值单独披露，不能替代观感审看',humanReview:'pending',runtimeSHA256:runtime.runtimeSHA256,vertices:p.count,triangles:g.index.count/3,bones:mesh.skeleton.bones.length,maxWeights:4,maxWeightError,minimumFloor,maximumStretch,records};writeFileSync(root+'/geometry.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({minimumFloor,maximumStretch,maxWeightError,frames:records.length}));
