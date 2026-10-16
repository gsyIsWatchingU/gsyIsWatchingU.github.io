import * as THREE from 'three';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {loadGeometry} from '../geometry-test-utils.mjs';
import {createEightPoseRig,catRestPoses} from '../cat-eight-pose-rig.js';
import {createCatRepairRig} from '../cat-repair-v2-rig.js';

const root=process.argv[2]??'tmp/cat-repair-v2',pillowSurface=JSON.parse(readFileSync('docs/cat-eight-poses-review/pillow-surface.json'));
const setups=[{name:'old-neutral + old rig',source:'tmp/cat-eight-neutral-bind.glb',factory:createEightPoseRig},{name:'anatomy-v2 + new pose modules',source:root+'/anatomy-neutral.glb',factory:createCatRepairRig}];
const records=[],v=()=>new THREE.Vector3(),sha=b=>createHash('sha256').update(b).digest('hex');
for(const setup of setups){
 const model=(await loadGeometry(setup.source)).scene,mesh=model.getObjectByName('siamese_cat'),g=mesh.geometry,p=g.attributes.position,rig=setup.factory(model,{pillowSurface});
 const welded=[],inverse=[],seen=new Map();
 for(let i=0;i<p.count;i++){const q=v().fromBufferAttribute(p,i),key=q.toArray().map(x=>x.toFixed(6)).join(',');if(!seen.has(key)){seen.set(key,welded.length);welded.push(i);}inverse.push(seen.get(key));}
 const edgeMap=new Map();for(let i=0;i<g.index.count;i+=3)for(let k=0;k<3;k++){let a=inverse[g.index.getX(i+k)],b=inverse[g.index.getX(i+(k+1)%3)];if(a===b)continue;if(a>b)[a,b]=[b,a];const key=a+'/'+b;if(!edgeMap.has(key)){const pa=v().fromBufferAttribute(p,welded[a]),pb=v().fromBufferAttribute(p,welded[b]);edgeMap.set(key,{a,b,length:pa.distanceTo(pb),region:(pa.y+pb.y)*.5<.095?'paw':(pa.z+pb.z)*.5>.14?'shoulder_neck':(pa.z+pb.z)*.5<.05?'hip_hock':'torso'});}}
 const edges=[...edgeMap.values()].filter(e=>e.length>1e-5),footIndices={};
 for(const family of ['front_l','front_r','back_l','back_r'])footIndices[family]=welded.map((i,j)=>[i,j]).filter(([i])=>{if(p.getY(i)>.05)return false;let w=0;for(let k=0;k<4;k++)if(mesh.skeleton.bones[g.attributes.skinIndex.array[i*4+k]].name==='DEF_'+family+'_paw')w+=g.attributes.skinWeight.array[i*4+k];return w>.65;}).map(([,j])=>j);
 const current=welded.map(v),previous=welded.map(v);
 function describe(index){const i=welded[index],weights={};for(let k=0;k<4;k++){const w=g.attributes.skinWeight.array[i*4+k];if(w>1e-6)weights[mesh.skeleton.bones[g.attributes.skinIndex.array[i*4+k]].name]=w;}return{vertex:i,rest:v().fromBufferAttribute(p,i).toArray(),posed:current[index].toArray(),weights};}
 for(const pose of catRestPoses){let maximumStretch=0,minimumCompression=1,maximumFrameStep=0,minimumFloor=Infinity,maximumBoneLengthError=0,worst=null,minimumPawCenterDistance=Infinity,closestPaws=null;
  const regions={paw:0,shoulder_neck:0,hip_hock:0,torso:0};
  for(let frame=0;frame<=50;frame++){
   const t=frame/50;rig.pose(pose.id,t);model.updateMatrixWorld(true);mesh.skeleton.update();
   for(let j=0;j<welded.length;j++){mesh.getVertexPosition(welded[j],current[j]);minimumFloor=Math.min(minimumFloor,current[j].y);if(frame)maximumFrameStep=Math.max(maximumFrameStep,current[j].distanceTo(previous[j]));previous[j].copy(current[j]);}
   for(const e of edges){const ratio=current[e.a].distanceTo(current[e.b])/e.length;regions[e.region]=Math.max(regions[e.region],ratio);if(ratio>maximumStretch){maximumStretch=ratio;worst={progress:t,region:e.region,restLength:e.length,vertices:[describe(e.a),describe(e.b)]};}minimumCompression=Math.min(minimumCompression,ratio);}
   const centers=Object.entries(footIndices).map(([name,indices])=>({name,point:indices.reduce((sum,i)=>sum.add(current[i]),v()).divideScalar(indices.length)}));
   for(let a=0;a<centers.length;a++)for(let b=a+1;b<centers.length;b++){const distance=centers[a].point.distanceTo(centers[b].point);if(distance<minimumPawCenterDistance){minimumPawCenterDistance=distance;closestPaws={progress:t,names:[centers[a].name,centers[b].name],centers:[centers[a].point.toArray(),centers[b].point.toArray()]};}}
   for(const c of rig.chains){const names=['upper','lower',...(c.hock?['hock']:[]),'paw','toe'].map(s=>'DEF_'+c.id+'_'+s);for(let k=0;k<names.length-1;k++){const rest=rig.saved.get(names[k]).world.distanceTo(rig.saved.get(names[k+1]).world),a=rig.bones.get(names[k]).getWorldPosition(v()),b=rig.bones.get(names[k+1]).getWorldPosition(v());maximumBoneLengthError=Math.max(maximumBoneLengthError,Math.abs(a.distanceTo(b)-rest));}}
  }
  records.push({setup:setup.name,pose:pose.id,frames:51,maximumStretch,minimumCompression,maximumFrameStep,minimumFloor,maximumBoneLengthError,minimumPawCenterDistance,closestPaws,regionMaximumStretch:regions,worstEdge:worst});
 }
}
const report={status:'review',humanReview:'pending',scope:'八姿 raw 线性蒙皮对照；旧/新动作与绑定同时变化，不能单独归因为权重；极值按所有非零身体边，不使用分位数忽略局部缺陷；脚掌中心距离不是自碰撞证明。',sourceSHA256:sha(readFileSync(root+'/anatomy-neutral.glb')),modules:['scripts/cat-ground-poses-v2.js','scripts/cat-roll-poses-v2.js'].map(file=>({file,SHA256:sha(readFileSync(file))})),records};
writeFileSync(root+'/binding-pose-probe.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(records.map(r=>({setup:r.setup,pose:r.pose,maxStretch:r.maximumStretch,region:r.worstEdge.region,at:r.worstEdge.progress,minimumPawCenterDistance:r.minimumPawCenterDistance,boneError:r.maximumBoneLengthError})),null,2));
