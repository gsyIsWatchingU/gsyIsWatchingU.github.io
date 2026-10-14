import * as THREE from 'three';
import {restDuration} from './cat-rest-rig.js';

// 只播放资产内烘焙的骨骼片段；点击从当前帧平滑起身，完整站稳后回应。
export function createCatRestPlayer(model,animations,{root,camera}){
 const mixer=new THREE.AnimationMixer(model),clip=animations.find(c=>c.name==='lie_down_side'),action=mixer.clipAction(clip);action.setLoop(THREE.LoopOnce,1);action.clampWhenFinished=true;action.play();action.paused=true;
 let time=0,target=0,velocity=0,paused=false,reactions=0,greeting=0,headYaw=0,tailGreeting=0;const head=model.getObjectByName('DEF_head'),tail=model.getObjectByName('DEF_tail_01'),bones=[];model.traverse(n=>{if(n.isBone)bones.push(n);});
 const label=document.createElement('div');label.className='pet-greeting';label.textContent='喵～';label.hidden=true;root.append(label);
 function update(dt,active){paused=!active;if(active){const desired=Math.sign(target-time);velocity+=THREE.MathUtils.clamp(desired-velocity,-4*dt,4*dt);const next=time+velocity*dt;if(desired!==0&&Math.sign(target-next)!==desired){time=target;velocity=0;}else time=THREE.MathUtils.clamp(next,0,restDuration);if(Math.abs(time-target)<.00001){time=target;velocity=0;}greeting=Math.max(0,greeting-dt);}action.time=time;mixer.update(0);model.updateMatrixWorld(true);
  const point=head.getWorldPosition(new THREE.Vector3()),attention=time<.001&&greeting>0,angle=attention?THREE.MathUtils.clamp(Math.atan2(camera.position.x-point.x,camera.position.z-point.z),-.32,.32):0;
  if(active){headYaw=THREE.MathUtils.damp(headYaw,angle,6,dt);tailGreeting=THREE.MathUtils.damp(tailGreeting,attention?1:0,4,dt);}head.rotateY(headYaw);tail.rotateX(.65*tailGreeting);model.updateMatrixWorld(true);
  model.traverse(n=>{if(n.isSkinnedMesh)n.skeleton.update();});label.hidden=greeting<=0;const screen=head.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0,.12,0)).project(camera);label.style.left=(screen.x*.5+.5)*innerWidth+'px';label.style.top=(-screen.y*.5+.5)*innerHeight+'px';
 }
 function setRestPose(pose){target=pose==='lie'?restDuration:0;}
 function react(){reactions++;target=0;greeting=restDuration+2;}
 function snapshot(){return{state:paused?'paused':time===0?'idle':time===restDuration?'lie':target===0?'rising':'lying',sideLie:time/restDuration,sit:0,time,velocity,phase:time===0?'站立':time<.95?'降低身体':time<1.85?'换爪支撑':time<3.1?'侧身落地':'放松',bones:bones.length,reactions,tailLift:tailGreeting,head:head.quaternion.toArray()};}
 update(0,true);return{update,setRestPose,react,snapshot};
}
