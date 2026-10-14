import * as THREE from 'three';
export function createEightPosePlayer(model,animations,{duration,poses,camera}){
 const mixer=new THREE.AnimationMixer(model),actions=new Map(poses.map(p=>{const clip=animations.find(c=>c.name==='rest_'+p.id),a=mixer.clipAction(clip);a.setLoop(THREE.LoopOnce,1);a.clampWhenFinished=true;a.paused=true;return[p.id,a];}));
 let current=poses[0].id,pending=null,time=0,target=0,velocity=0,activeAction,reactions=0,greeting=0,headYaw=0,tailLift=0;
 const head=model.getObjectByName('DEF_head'),tail=model.getObjectByName('DEF_tail_01');
 const headOffset=new THREE.Quaternion(),tailOffset=new THREE.Quaternion(),inverse=new THREE.Quaternion();
 // Mixer 会跳过数值未变化的轨道；先撤销上帧偏移，避免逐帧累加。
 function removeOffsets(){head.quaternion.multiply(inverse.copy(headOffset).invert());tail.quaternion.multiply(inverse.copy(tailOffset).invert());headOffset.identity();tailOffset.identity();}
 function select(id){removeOffsets();activeAction?.stop();current=id;activeAction=actions.get(id);activeAction.reset().play();activeAction.paused=true;}
 select(current);
 function request(id){if(id==='stand'){pending=null;target=0;}else if(time===0&&target===0){select(id);pending=null;target=duration;}else if(id===current){pending=null;target=duration;}else{pending=id;target=0;}}
 function update(dt,active){if(active){const direction=Math.sign(target-time);velocity+=THREE.MathUtils.clamp(direction-velocity,-4*dt,4*dt);const next=time+velocity*dt;if(direction!==0&&Math.sign(target-next)!==direction){time=target;velocity=0;}else time=THREE.MathUtils.clamp(next,0,duration);if(Math.abs(time-target)<.00001){time=target;velocity=0;}if(time===0&&pending){const id=pending;pending=null;select(id);target=duration;}greeting=Math.max(0,greeting-dt);}
  removeOffsets();activeAction.time=time;mixer.update(0);model.updateMatrixWorld(true);const point=head.getWorldPosition(new THREE.Vector3()),attention=time===0&&greeting>0,angle=attention?THREE.MathUtils.clamp(Math.atan2(camera.position.x-point.x,camera.position.z-point.z),-.32,.32):0;
  if(active){headYaw=THREE.MathUtils.damp(headYaw,angle,6,dt);tailLift=THREE.MathUtils.damp(tailLift,attention?1:0,4,dt);}headOffset.setFromAxisAngle(new THREE.Vector3(0,1,0),headYaw);tailOffset.setFromAxisAngle(new THREE.Vector3(1,0,0),.55*tailLift);head.quaternion.multiply(headOffset);tail.quaternion.multiply(tailOffset);model.updateMatrixWorld(true);model.traverse(n=>{if(n.isSkinnedMesh)n.skeleton.update();});
 }
 function react(){reactions++;pending=null;target=0;greeting=duration+2;}
 function snapshot(){const t=time/duration;return{pose:current,time,target,progress:t,velocity,pending,state:time===0?'standing':time===duration?'resting':target===0?'rising':'lowering',phase:time===0?'站立':t<.28?'降低身体':t<.56?'换爪支撑':t<.79?'调整身体':'放松',reactions,tailLift,greeting,headYaw,headQuaternion:head.quaternion.toArray(),tailQuaternion:tail.quaternion.toArray()};}
 update(0,true);return{update,request,react,snapshot};
}
