import * as THREE from 'three';

export function createCompanionSleep({actor,avatar,model,bones,houseGroup,getBed,root,height}) {
  let bed,quilt,cover,surface,active=false,phase='idle',contactGap=null;
  const samples=[],inverse=avatar.matrixWorld.clone().invert();
  model.updateWorldMatrix(true,true);
  model.traverse(node=>{if(!node.isMesh||node.name.includes('eyelid'))return;
    const ids=[];for(let i=0;i<node.geometry.attributes.position.count;i++){
      const v=node.getVertexPosition(i,new THREE.Vector3()).applyMatrix4(node.matrixWorld).applyMatrix4(inverse);
      if(v.y>.35&&v.y<1.15)ids.push(i);
    }samples.push({node,ids});
  });
  const smooth=v=>{v=THREE.MathUtils.clamp(v,0,1);return v*v*(3-2*v);};
  function grasp(side,target){
    const upper=bones.get('comp_arm_'+side),lower=bones.get('comp_forearm_'+side),hand=bones.get('comp_hand_'+side);if(!upper||!lower||!hand)return;
    houseGroup.updateMatrixWorld(true);
    const shoulder=upper.getWorldPosition(new THREE.Vector3()),elbow=lower.getWorldPosition(new THREE.Vector3()),wrist=hand.getWorldPosition(new THREE.Vector3());
    const a=shoulder.distanceTo(elbow),b=elbow.distanceTo(wrist),axis=target.clone().sub(shoulder),distance=Math.min(axis.length(),a+b-.0001);axis.normalize();
    const pole=new THREE.Vector3(0,-1,.15);pole.addScaledVector(axis,-pole.dot(axis)).normalize();
    const cosine=THREE.MathUtils.clamp((a*a+distance*distance-b*b)/(2*a*distance),-1,1),joint=shoulder.clone().addScaledVector(axis,a*cosine).addScaledVector(pole,a*Math.sqrt(1-cosine*cosine));
    const aim=(bone,child,to)=>{const position=bone.getWorldPosition(new THREE.Vector3()),world=bone.getWorldQuaternion(new THREE.Quaternion()),direction=child.getWorldPosition(new THREE.Vector3()).sub(position).normalize(),delta=new THREE.Quaternion().setFromUnitVectors(direction,to.clone().sub(position).normalize());bone.quaternion.copy(bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(delta.multiply(world)));bone.updateWorldMatrix(false,true);};
    aim(upper,lower,joint);aim(lower,hand,shoulder.clone().addScaledVector(axis,distance));
  }
  function reset(){active=false;phase='idle';if(quilt)quilt.visible=true;if(cover)cover.visible=false;root.dataset.companionSleep='idle';}
  function begin(){
    reset();bed=getBed();if(!bed)return;bed.updateWorldMatrix(true,true);
    const mattresses=[];bed.traverse(n=>{if(!n.isMesh)return;if(n.material?.name==='purple quilt')quilt=n;if(n.material?.name==='blue porcelain')mattresses.push(n);});
    surface=Math.max(...mattresses.map(n=>new THREE.Box3().setFromObject(n).max.y));
    if(!Number.isFinite(surface))return;
    if(!cover){const material=quilt.material.clone();material.side=THREE.DoubleSide;cover=new THREE.Mesh(new THREE.PlaneGeometry(1.27,.80,24,24),material);cover.name='companion-sleep-quilt';cover.userData.roomId='bedroom';cover.castShadow=true;cover.receiveShadow=true;houseGroup.add(cover);}
    cover.visible=true;quilt.visible=false;active=true;contactGap=null;
  }
  function update(seconds){
    if(!active)return;
    const pull=smooth(seconds/1.2),climb=smooth((seconds-1.2)/1.4),lie=smooth((seconds-2.6)/1.4),covered=smooth((seconds-4)/1.2);
    phase=seconds<1.2?'pull':seconds<2.6?'climb':seconds<4?'lie':seconds<5.2?'cover':'sleep';root.dataset.companionSleep=phase;
    actor.position.set(bed.position.x+.87*(1-climb),bed.position.y+(surface-bed.position.y)*climb,bed.position.z+.30+(height/2-.30)*lie);
    avatar.rotation.set(-Math.PI/2*lie,-Math.PI/2*(1-lie),0);avatar.position.set(0,0,0);
    const set=(name,x,y,z)=>{const b=bones.get(name);if(b)b.rotation.set(x,y,z);};
    const reach=1-lie;set('comp_arm_l',-.55*reach,0,.16*reach);set('comp_arm_r',-.55*reach,0,-.16*reach);set('comp_forearm_l',0,-.45*reach,0);set('comp_forearm_r',0,.45*reach,0);
    set('comp_leg_l',-.65*climb*(1-lie),0,0);set('comp_leg_r',-.65*climb*(1-lie),0,0);
    // 按实际蒙皮后的背面最低点落床，不使用估计厚度。
    if(lie>0){houseGroup.updateMatrixWorld(true);let low=Infinity;for(const {node,ids} of samples)for(const i of ids)low=Math.min(low,node.getVertexPosition(i,new THREE.Vector3()).applyMatrix4(node.matrixWorld).y);
      if(Number.isFinite(low)){avatar.position.y+=(surface+.007-low)*lie;houseGroup.updateMatrixWorld(true);contactGap=lie===1?low+avatar.position.y-surface:null;}}
    if(phase==='pull'||phase==='climb')for(const [side,z] of [['l',-.12],['r',.12]])grasp(side,new THREE.Vector3(bed.position.x+.57,surface+.04+.10*pull*(1-climb),bed.position.z+.56+z));
    if(phase==='cover')for(const [side,x] of [['l',-.25],['r',.25]])grasp(side,new THREE.Vector3(bed.position.x+x,surface+.23,bed.position.z+.50-.40*covered));
    root.dataset.companionBedSurface=String(surface);root.dataset.companionBedGap=contactGap===null?'':contactGap.toFixed(4);
    const p=cover.geometry.attributes.position;
    for(let i=0;i<p.count;i++){const x=(i%25)/24*1.27-.635,z=.4-Math.floor(i/25)/24*.80;const bulge=.20*Math.exp(-((x/.35)**4))*covered,fold=.15*pull*(1-covered)*Math.exp(-(((z-.42)/.19)**2));p.setXYZ(i,x,surface-bed.position.y+.015+bulge+fold,z+.42+.12*pull*(1-covered));}
    p.needsUpdate=true;cover.geometry.computeVertexNormals();cover.position.copy(bed.position);
  }
  return {begin,reset,update,snapshot:()=>({phase,surface,contactGap,active})};
}
