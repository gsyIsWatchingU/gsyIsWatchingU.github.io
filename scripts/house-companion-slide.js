import * as THREE from 'three';
import { companionSlide } from './house-companion-motion.js';

export function createCompanionSlide({actor,avatar,model,bones,houseGroup}) {
  const seat=[];houseGroup.updateMatrixWorld(true);const inverse=avatar.matrixWorld.clone().invert();
  model.traverse(node=>{if(!node.isMesh||node.name.includes('eyelid'))return;const ids=[];
    for(let i=0;i<node.geometry.attributes.position.count;i++){const v=node.getVertexPosition(i,new THREE.Vector3()).applyMatrix4(node.matrixWorld).applyMatrix4(inverse);if(v.y>.26&&v.y<.43&&Math.abs(v.x)<.32)ids.push(i);}seat.push({node,ids});});
  function aim(bone,child,direction){
    const start=bone.getWorldPosition(new THREE.Vector3()),world=bone.getWorldQuaternion(new THREE.Quaternion());
    const from=child.getWorldPosition(new THREE.Vector3()).sub(start).normalize();
    const delta=new THREE.Quaternion().setFromUnitVectors(from,direction.clone().normalize());
    bone.quaternion.copy(bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(delta.multiply(world)));bone.updateWorldMatrix(false,true);
  }
  let contact=0,progress=0;
  function update(t,settle,entry){
    progress=t;const slide=companionSlide(t),position=new THREE.Vector3(...slide.position),tangent=new THREE.Vector3(...slide.direction).normalize();
    actor.position.copy(position).lerp(new THREE.Vector3(...entry),settle);
    avatar.rotation.set(-.10*(1-settle),Math.atan2(tangent.x,tangent.z),0);avatar.position.set(0,0,0);
    const lateral=new THREE.Vector3(tangent.z,0,-tangent.x).normalize(),normal=new THREE.Vector3().crossVectors(tangent,lateral).normalize();
    houseGroup.updateMatrixWorld(true);
    if(settle<1){
      // 上身保持坐姿后倾，大腿向前、膝盖弯曲，双脚沿下滑方向。
      for(const side of ['l','r']){
        const thigh=bones.get('comp_leg_'+side),shin=bones.get('comp_shin_'+side),foot=bones.get('comp_foot_'+side);if(!thigh||!shin||!foot)continue;
        aim(thigh,shin,tangent.clone().addScaledVector(normal,.30));
        aim(shin,foot,tangent.clone().addScaledVector(normal,.08));
      }
      houseGroup.updateMatrixWorld(true);
      let low=Infinity;for(const {node,ids} of seat)for(const i of ids)low=Math.min(low,node.getVertexPosition(i,new THREE.Vector3()).applyMatrix4(node.matrixWorld).sub(position).dot(normal));
      if(Number.isFinite(low))avatar.position.addScaledVector(normal,(.012-low)*(1-settle));
      houseGroup.updateMatrixWorld(true);
      // 双手收在膝前，不让张开的手臂穿过滑梯两侧。
      for(const side of ['l','r']){
        const upper=bones.get('comp_arm_'+side),lower=bones.get('comp_forearm_'+side),hand=bones.get('comp_hand_'+side),knee=bones.get('comp_shin_'+side);if(!upper||!lower||!hand||!knee)continue;
        const shoulder=upper.getWorldPosition(new THREE.Vector3()),elbow=lower.getWorldPosition(new THREE.Vector3()),wrist=hand.getWorldPosition(new THREE.Vector3()),a=shoulder.distanceTo(elbow),b=elbow.distanceTo(wrist),axis=knee.getWorldPosition(new THREE.Vector3()).addScaledVector(normal,.07).sub(shoulder),distance=Math.min(axis.length(),a+b-.001);axis.normalize();
        const pole=lateral.clone().multiplyScalar(side==='l'?1:-1);pole.addScaledVector(axis,-pole.dot(axis)).normalize();const c=THREE.MathUtils.clamp((a*a+distance*distance-b*b)/(2*a*distance),-1,1),joint=shoulder.clone().addScaledVector(axis,a*c).addScaledVector(pole,a*Math.sqrt(1-c*c));
        aim(upper,lower,joint.sub(shoulder));aim(lower,hand,shoulder.clone().addScaledVector(axis,distance).sub(lower.getWorldPosition(new THREE.Vector3())));
      }
      houseGroup.updateMatrixWorld(true);
      contact=Infinity;for(const {node,ids} of seat)for(const i of ids)contact=Math.min(contact,node.getVertexPosition(i,new THREE.Vector3()).applyMatrix4(node.matrixWorld).sub(position).dot(normal));
      if(!Number.isFinite(contact))contact=null;
    }
    return {slide,contact};
  }
  return {update,snapshot:()=>({progress,contact,posture:'seated'})};
}
