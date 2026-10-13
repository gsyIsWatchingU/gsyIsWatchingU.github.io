import * as THREE from 'three';

export function createCompanionSleep({actor,avatar,model,bones,houseGroup,getBed,root,height}) {
  let bed,quilt,cover,clothRest,clothBounds,surface,active=false,phase='idle',contactGap=null;
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
    const mattresses=[];bed.traverse(n=>{if(!n.isMesh||n===cover)return;if(n.material?.name==='purple quilt')quilt=n;if(n.material?.name==='blue porcelain')mattresses.push(n);});
    surface=Math.max(...mattresses.map(n=>new THREE.Box3().setFromObject(n).max.y));
    if(!Number.isFinite(surface)||!quilt)return;
    if(!cover){
      // 复用有厚度、圆角和 UV 的原被子，转换到床的坐标系后再变形。
      const geometry=quilt.geometry.clone(),transform=bed.matrixWorld.clone().invert().multiply(quilt.matrixWorld);
      geometry.applyMatrix4(transform);geometry.computeBoundingBox();clothBounds=geometry.boundingBox.clone();
      clothRest=geometry.attributes.position.array.slice();
      cover=new THREE.Mesh(geometry,quilt.material);cover.name='companion-sleep-quilt';cover.userData.roomId='bedroom';cover.castShadow=true;cover.receiveShadow=true;bed.add(cover);
    }
    // 走到床边之前保留原被子；首个睡眠帧才同步替换，避免显示未初始化的网格。
    cover.visible=false;active=true;contactGap=null;
  }
  function update(seconds){
    if(!active)return;
    const pull=smooth(seconds/1.2),climb=smooth((seconds-1.2)/1.4),lie=smooth((seconds-2.6)/1.4),covered=smooth((seconds-4)/1.2);
    phase=seconds<1.2?'pull':seconds<2.6?'climb':seconds<4?'lie':seconds<5.2?'cover':'sleep';root.dataset.companionSleep=phase;
    actor.position.set(bed.position.x+.87*(1-climb),bed.position.y+(surface-bed.position.y)*climb,bed.position.z+.30+(height/2-.30)*lie);
    avatar.rotation.set((-Math.PI/2+.18)*lie,-Math.PI/2*(1-lie),0);avatar.position.set(0,0,0);
    const set=(name,x,y,z)=>{const b=bones.get(name);if(b)b.rotation.set(x,y,z);};
    const reach=1-lie;set('comp_arm_l',-.55*reach,0,.16*reach);set('comp_arm_r',-.55*reach,0,-.16*reach);set('comp_forearm_l',0,-.45*reach,0);set('comp_forearm_r',0,.45*reach,0);
    set('comp_leg_l',-.65*climb*(1-lie),0,0);set('comp_leg_r',-.65*climb*(1-lie),0,0);
    // 按实际蒙皮后的背面最低点落床，不使用估计厚度。
    if(lie>0){houseGroup.updateMatrixWorld(true);let low=Infinity;for(const {node,ids} of samples)for(const i of ids)low=Math.min(low,node.getVertexPosition(i,new THREE.Vector3()).applyMatrix4(node.matrixWorld).y);
      if(Number.isFinite(low)){avatar.position.y+=(surface+.007-low)*lie;houseGroup.updateMatrixWorld(true);contactGap=lie===1?low+avatar.position.y-surface:null;}}
    if(phase==='pull'||phase==='climb')for(const [side,z] of [['l',-.12],['r',.12]])grasp(side,new THREE.Vector3(bed.position.x+.57,surface+.04+.10*pull*(1-climb),bed.position.z+.56+z));
    if(phase==='cover')for(const [side,x] of [['l',-.25],['r',.25]])grasp(side,new THREE.Vector3(bed.position.x+x,surface+.23,bed.position.z+.50-.40*covered));
    root.dataset.companionBedSurface=String(surface);root.dataset.companionBedGap=contactGap===null?'':contactGap.toFixed(4);
    const p=cover.geometry.attributes.position,{min,max}=clothBounds;
    // 床尾固定，拉开时将被子折到脚边，躺下后连续拉回胸口，枕头和脸留在外面。
    const headEdge=THREE.MathUtils.lerp(THREE.MathUtils.lerp(min.z,.30,pull),.10,covered);
    const bedInverse=bed.matrixWorld.clone().invert(),profile=new Float32Array(25).fill(max.y);let bodyHalfWidth=.24;
    if(lie>0){houseGroup.updateMatrixWorld(true);for(const {node,ids} of samples)for(const i of ids){
      const v=node.getVertexPosition(i,new THREE.Vector3()).applyMatrix4(node.matrixWorld).applyMatrix4(bedInverse);
      if(v.z>headEdge-.025&&v.z<max.z&&Math.abs(v.x)<.48){const row=THREE.MathUtils.clamp(Math.round((v.z-headEdge)/(max.z-headEdge)*24),0,24);profile[row]=Math.max(profile[row],v.y+.035);bodyHalfWidth=Math.max(bodyHalfWidth,Math.abs(v.x));}
    }}
    // 每一段只隆起到对应身体表面；空的床尾保持平铺，避免整张被子鼓成帐篷。
    const envelope=profile.map((_,row)=>Math.max(...profile.slice(Math.max(0,row-2),Math.min(25,row+3))));
    for(let i=0;i<p.count;i++){
      const x=clothRest[i*3],y=clothRest[i*3+1],z=clothRest[i*3+2],t=(z-min.z)/(max.z-min.z);
      const across=1-smooth((Math.abs(x)-bodyHalfWidth-.035)/(max.x-bodyHalfWidth-.035));
      const row=t*24,top=THREE.MathUtils.lerp(envelope[Math.floor(row)],envelope[Math.min(24,Math.ceil(row))],row%1),lift=Math.max(0,top-max.y)*covered;
      const fold=.08*pull*(1-covered)*(1-t)**2;
      p.setXYZ(i,x,y+lift*across+fold,headEdge+(max.z-headEdge)*t);
    }
    p.needsUpdate=true;cover.geometry.computeVertexNormals();cover.geometry.computeBoundingBox();cover.geometry.computeBoundingSphere();
    cover.visible=true;quilt.visible=false;
  }
  return {begin,reset,update,snapshot:()=>({phase,surface,contactGap,active})};
}
