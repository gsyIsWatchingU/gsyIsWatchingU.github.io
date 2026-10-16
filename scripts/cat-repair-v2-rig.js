import * as THREE from 'three';
import {createEightPoseRig,catRestPoses} from './cat-eight-pose-rig.js';
import {createGroundCatPoses,groundCatPoseIds} from './cat-ground-poses-v2.js';
import {createRollCatPoses} from './cat-roll-poses-v2.js';

export {catRestPoses};
export function createCatRepairRig(model,{pillowSurface}={}){
 const base=createEightPoseRig(model,{pillowSurface});
 const shiftWorld=(bone,delta)=>{bone.position.add(delta.clone().applyQuaternion(bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert()));model.updateMatrixWorld(true);};
 const context={model,mesh:model.getObjectByName('siamese_cat'),faceMesh:model.getObjectByName('siamese_cat_head'),bones:base.bones,saved:base.saved,chains:base.chains,pillowSurface,shiftWorld};
 const ground=createGroundCatPoses(context),roll=createRollCatPoses(context);
 function pose(id,t){
  for(const [name,bone] of base.bones){const saved=base.saved.get(name);bone.position.copy(saved.position);bone.quaternion.copy(saved.quaternion);}
  const result=groundCatPoseIds.includes(id)?ground(id,t):roll(id,t);
  if(!result)throw Error('Unknown cat repair pose: '+id);
  model.updateMatrixWorld(true);model.traverse(m=>{if(m.isSkinnedMesh)m.skeleton.update();});
  return result;
 }
 return{...base,pose,context};
}
