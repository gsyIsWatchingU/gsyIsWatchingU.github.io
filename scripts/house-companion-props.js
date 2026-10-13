import * as THREE from 'three';

// 床上的日记始终是同一个场景物件；拿起和放回只改变它的变换。
export function createCompanionProps({actor,avatar,bones,houseGroup,getDisplay,getToyChest,root}) {
  const smooth=t=>{t=THREE.MathUtils.clamp(t,0,1);return t*t*(3-2*t);};
  let source=null,home=null,kind=null,phase='idle',opening=0,from=new THREE.Vector3(),stand=new THREE.Vector3(),yaw=0,handGap=null,reach=null;
  function reset(){
    if(source&&home){home.parent.add(source);source.position.copy(home.position);source.quaternion.copy(home.quaternion);source.scale.copy(home.scale);source.userData.diary.update(0,true,0);}
    getToyChest?.()?.setCompanionPlaying(false);source=null;home=null;kind=null;phase='idle';opening=0;handGap=null;
    root.dataset.companionProp='idle';
  }
  function begin(action){
    reset();if(!['journal','read','toy'].includes(action))return;
    kind=action==='toy'?'toy':'journal';from.copy(actor.position);
    if(kind==='journal'){
      source=getDisplay('work-journal');if(!source){kind=null;return;}
      home={parent:source.parent,position:source.position.clone(),quaternion:source.quaternion.clone(),scale:source.scale.clone()};
      home.housePosition=source.position.clone();home.houseQuaternion=source.quaternion.clone();home.houseScale=source.scale.clone();
      stand.copy(source.position).add(new THREE.Vector3(.155*source.scale.x,0,.32));stand.y=6;
    }else{
      const chest=getToyChest?.();if(!chest){kind=null;return;}
      stand.copy(houseGroup.worldToLocal(chest.touchPoint())).add(new THREE.Vector3(-.26,0,.30));stand.y=6;
    }
    yaw=Math.PI;phase='approach';
  }
  function place(time){
    if(!kind)return null;
    actor.position.lerpVectors(from,stand,smooth(time/2));
    if(time<2){phase='approach';const delta=stand.clone().sub(from);yaw=Math.atan2(delta.x,delta.z);}
    else {yaw=Math.PI;
      phase=kind==='toy'?(time<3?'open':time<7.4?'play':time<8.6?'close':'done'):
        time<3.2?'reach':time<4.5?'lift':time<7?'read':time<8.3?'return':time<9.1?'release':'done';
    }
    if(kind==='toy')getToyChest()?.setCompanionPlaying(time>=2.75&&time<8);
    if(kind==='journal'){
      // 小跳够到较高的床面，书仍留在原位，手接触后才拿起。
      const hop=(at,duration)=>{const t=(time-at)/duration;return t>0&&t<1?.36*Math.sin(Math.PI*t):0;};
      actor.position.y+=hop(2.35,1.7)+hop(7.45,1.7);
      if(time>4.5&&time<7)yaw=THREE.MathUtils.lerp(Math.PI,.10,smooth((time-4.5)/.6));
      if(time>=7&&time<7.5)yaw=THREE.MathUtils.lerp(.10,Math.PI,smooth((time-7)/.5));
    }
    root.dataset.companionProp=kind+':'+phase;
    return {walking:phase==='approach',yaw,phase};
  }
  function aimHand(side,target,weight=1){
    const upper=bones.get('comp_arm_'+side),lower=bones.get('comp_forearm_'+side),hand=bones.get('comp_hand_'+side);if(!upper||!lower||!hand)return;
    houseGroup.updateMatrixWorld(true);
    const shoulder=upper.getWorldPosition(new THREE.Vector3()),elbow=lower.getWorldPosition(new THREE.Vector3()),wrist=hand.getWorldPosition(new THREE.Vector3());
    target=wrist.clone().lerp(target,weight);
    const a=shoulder.distanceTo(elbow),b=elbow.distanceTo(wrist),axis=target.clone().sub(shoulder),distance=Math.min(axis.length(),a+b-.0001);axis.normalize();
    reach={shoulder:shoulder.toArray(),target:target.toArray(),length:a+b,distance:shoulder.distanceTo(target)};
    const pole=new THREE.Vector3(0,-1,.15).transformDirection(avatar.matrixWorld);pole.addScaledVector(axis,-pole.dot(axis)).normalize();
    const cosine=THREE.MathUtils.clamp((a*a+distance*distance-b*b)/(2*a*distance),-1,1),joint=shoulder.clone().addScaledVector(axis,a*cosine).addScaledVector(pole,a*Math.sqrt(1-cosine*cosine));
    const aim=(bone,child,to)=>{const position=bone.getWorldPosition(new THREE.Vector3()),world=bone.getWorldQuaternion(new THREE.Quaternion()),direction=child.getWorldPosition(new THREE.Vector3()).sub(position).normalize(),delta=new THREE.Quaternion().setFromUnitVectors(direction,to.clone().sub(position).normalize());bone.quaternion.copy(bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(delta.multiply(world)));bone.updateWorldMatrix(false,true);};
    aim(upper,lower,joint);aim(lower,hand,shoulder.clone().addScaledVector(axis,distance));
    return hand.getWorldPosition(new THREE.Vector3()).distanceTo(target);
  }
  function update(time,reducedMotion){
    handGap=null;if(!kind||phase==='approach')return;
    if(kind==='toy'){
      const target=getToyChest()?.touchPoint();if(target){target.y+=phase==='play'?.04+.04*Math.sin(time*4):0;handGap=aimHand('r',target,phase==='done'?0:smooth((time-2)/.6));}
      return;
    }
    const lift=time<4.5?smooth((time-3.2)/1.3):1-smooth((time-7)/1.3);
    opening=time<4.5?smooth((time-3.65)/.85):1-smooth((time-7)/.55);
    houseGroup.updateMatrixWorld(true);
    const held=avatar.localToWorld(new THREE.Vector3(0,.53,.36));home.parent.worldToLocal(held);
    const heldRotation=home.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(avatar.getWorldQuaternion(new THREE.Quaternion())).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0,Math.PI,0))).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-1.19,0,0)));
    source.position.lerpVectors(home.housePosition,held,lift);source.quaternion.slerpQuaternions(home.houseQuaternion,heldRotation,lift);source.scale.copy(home.houseScale);
    source.userData.diary.update(time,reducedMotion,opening);source.updateWorldMatrix(true,true);
    const weight=phase==='reach'?smooth((time-2)/1.2):phase==='release'?1-smooth((time-8.3)/.8):phase==='done'?0:1;
    const gaps=[];
    for(const [side,sign] of [['l',1],['r',-1]]){
      const closedX=.155-sign*.20,target=source.localToWorld(new THREE.Vector3(THREE.MathUtils.lerp(closedX,-sign*.30,opening),-.11,.035));
      const gap=aimHand(side,target,weight);if(gap!==undefined)gaps.push(gap);
    }
    handGap=gaps.length?Math.max(...gaps):null;
  }
  return {begin,reset,place,update,snapshot:()=>({kind,phase,opening,handGap,reach,source:source?.name??null,sourceId:source?.uuid??null,position:source?.position.toArray()??null,home:home?.housePosition.toArray()??null,visible:source?.visible??false})};
}
