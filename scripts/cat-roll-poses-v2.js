import * as THREE from 'three';

const v=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
const X=v(1,0,0),Y=v(0,1,0),Z=v(0,0,1);
const smooth=(a,b,t)=>{const u=THREE.MathUtils.clamp((t-a)/(b-a),0,1);return u*u*(3-2*u);};
const q=(axis,angle)=>new THREE.Quaternion().setFromAxisAngle(axis,angle);

// 侧躺 / 仰卧 / 蜷缩：关节目标先在胸廓和骨盆各自的坐标系中建立。
// 不使用世界坐标锁头，也不把左右四爪投向同一个地面目标。
export function createRollCatPoses({model,mesh,faceMesh,bones,saved,chains,shiftWorld}){
 const pelvis=bones.get('DEF_pelvis'),neck=bones.get('DEF_neck'),head=bones.get('DEF_head');
 const torso=[],skull=[],point=v();
 for(const surface of [mesh,faceMesh]){
  const g=surface.geometry;
  for(let i=0;i<g.attributes.position.count;i++){
   const p=v().fromBufferAttribute(g.attributes.position,i);let trunk=0,headWeight=0;
   for(let k=0;k<4;k++){
    const n=surface.skeleton.bones[g.attributes.skinIndex.array[i*4+k]].name,w=g.attributes.skinWeight.array[i*4+k];
    if(/^DEF_(pelvis|spine|chest)/.test(n))trunk+=w;
    if(n==='DEF_head')headWeight+=w;
   }
   if(surface===mesh&&trunk>.8&&p.z>-.20&&p.z<.31)torso.push(i);
   if(headWeight>.985)skull.push([surface,i]);
  }
 }
 function update(){model.updateMatrixWorld(true);mesh.skeleton.update();faceMesh.skeleton.update();}
 function floor(points,surface){let low=Infinity;for(const i of points)low=Math.min(low,surface.getVertexPosition(i,point).y);return low;}
 function rotate(name,axis,angle){bones.get(name)?.quaternion.multiply(q(axis,angle));}
 function world(bone){return bone.getWorldPosition(v());}
 function frame(bone){return bone.getWorldQuaternion(new THREE.Quaternion());}
 function localOffset(bone,offset){return world(bone).add(offset.applyQuaternion(frame(bone)));}

 // 逐段最短弧转动保留父节的轴向旋转；不重新强制匹配整套世界弯曲平面，
 // 避免肩髋突然多扭转一圈，把腋下和大腿内侧拉成薄膜。
 function aim(bone,child,target){
  const parent=frame(bone.parent),base=parent.clone().multiply(saved.get(bone.name).quaternion);
  const rest=child.position.clone().applyQuaternion(base).normalize(),next=target.clone().sub(world(bone)).normalize();
  bone.quaternion.copy(parent.invert().multiply(qBetween(rest,next).multiply(base)));
  bone.updateWorldMatrix(false,true);
 }
 function qBetween(a,b){return new THREE.Quaternion().setFromUnitVectors(a,b);}
 function hingeFrame(direction,normal){
  const y=direction.clone().normalize(),x=normal.clone().addScaledVector(y,-normal.dot(y)).normalize(),z=x.clone().cross(y).normalize();
  return new THREE.Matrix4().makeBasis(x,y,z);
 }
 function solveLimb(c,pawTarget,pole,pawWorld,meta){
  const [upper,lower,paw]=c.nodes,hip=world(upper),target=pawTarget.clone();
  if(c.hock)target.add(meta);
  const direction=target.clone().sub(hip),distance=THREE.MathUtils.clamp(direction.length(),Math.abs(c.a-c.b)+.008,c.a+c.b-.010);
  direction.normalize();target.copy(hip).addScaledVector(direction,distance);
  pole.addScaledVector(direction,-pole.dot(direction));
  if(pole.lengthSq()<1e-8)pole.copy(X).addScaledVector(direction,-direction.x);
  pole.normalize();
  const along=(c.a*c.a-c.b*c.b+distance*distance)/(2*distance),height=Math.sqrt(Math.max(1e-8,c.a*c.a-along*along));
  const knee=hip.clone().addScaledVector(direction,along).addScaledVector(pole,height);
  aim(upper,lower,knee);aim(lower,c.hock??paw,target);
  if(c.hock){
   const rest=hingeFrame(paw.position,X),next=hingeFrame(meta.clone().negate(),X.clone().applyQuaternion(pawWorld));
   const desired=new THREE.Quaternion().setFromRotationMatrix(next.multiply(rest.invert()));
   c.hock.quaternion.copy(frame(c.hock.parent).invert().multiply(desired));c.hock.updateWorldMatrix(false,true);
  }
  paw.quaternion.copy(frame(paw.parent).invert().multiply(pawWorld));
  paw.updateWorldMatrix(false,true);
 }
 function unfoldBellyLimb(c,t,bodyRotation,pawRotation,meta){
  const [upper,lower,paw]=c.nodes,front=c.id.startsWith('front'),sign=c.id.endsWith('l')?-1:1;
  const affected=[upper,lower,...(c.hock?[c.hock]:[]),paw],before=affected.map(b=>b.quaternion.clone());
  const extension=smooth(.62,.89,t),blend=smooth(.30,.48,t);
  const upperDirection=v(-sign*.25,-.30,front?-.95:.95).normalize().lerp(
   (front?v(sign*.23,-.85,-.48):v(sign*.35,-.60,.90)).normalize(),extension).normalize().applyQuaternion(bodyRotation);
  const lowerDirection=(front?v(sign*.15,.10,.97):v(sign*.15,.45,-.89)).normalize().lerp(
   (front?v(sign*.14,-.55,.82):v(sign*.10,-.95,-.75)).normalize(),extension).normalize().applyQuaternion(bodyRotation);
  const knee=world(upper).addScaledVector(upperDirection,c.a),end=knee.clone().addScaledVector(lowerDirection,c.b);
  aim(upper,lower,knee);aim(lower,c.hock??paw,end);
  if(c.hock){
   const rest=hingeFrame(paw.position,X),next=hingeFrame(meta.clone().negate(),X.clone().applyQuaternion(bodyRotation));
   c.hock.quaternion.copy(frame(c.hock.parent).invert().multiply(new THREE.Quaternion().setFromRotationMatrix(next.multiply(rest.invert()))));
   c.hock.updateWorldMatrix(false,true);
  }
  paw.quaternion.copy(frame(paw.parent).invert().multiply(pawRotation));
  affected.forEach((b,i)=>b.quaternion.copy(before[i].slerp(b.quaternion,blend)));
  model.updateMatrixWorld(true);
 }
 function wrapCurlTail(coil){
  const tail=Array.from({length:4},(_,i)=>bones.get('DEF_tail_0'+(i+1))),before=tail.map(b=>b.quaternion.clone());
  const directions=[v(-.55,0,-.84),v(.95,0,-.31),v(.96,0,.28)];
  for(let i=0;i<3;i++){
   const bone=tail[i],child=tail[i+1],start=world(bone),length=child.position.length();
   const height=[.090,.050,.037][i]+.050*Math.sin(Math.PI*coil),dy=THREE.MathUtils.clamp(height-start.y,-.92*length,.40*length),horizontal=Math.sqrt(Math.max(1e-8,length*length-dy*dy));
   const target=start.clone().add(directions[i].clone().normalize().multiplyScalar(horizontal));target.y+=dy;
   aim(bone,child,target);
  }
  const tip=world(tail[3]);aim(tail[3],{position:saved.get(tail[3].name).position},tip.add(v(.75,0,.66).multiplyScalar(.05)));
  tail.forEach((bone,i)=>bone.quaternion.copy(before[i].slerp(bone.quaternion,coil)));
  model.updateMatrixWorld(true);
 }

 return function pose(id,t){
  if(!['side','belly','curl'].includes(id))return null;
  const up=id==='belly',curl=id==='curl',fold=smooth(.025,.43,t),release=smooth(.33,.64,t),settle=smooth(.76,1,t);
  const rolling=smooth(.43,.90,t),roll=(curl?0:up?-Math.PI*.94:-Math.PI*.49)*rolling;
  const coil=curl?smooth(.40,.94,t):0;
  pelvis.position.y-=.165*fold;
  pelvis.position.z-=.012*smooth(.04,.25,t);
  pelvis.quaternion.multiply(q(Z,roll));
  if(curl)rotate('DEF_pelvis',Y,-.10*coil);
  const spineYaw=[.64,.68,.68,.64];
  for(let i=1;i<=4;i++){
   rotate('DEF_spine_0'+i,X,(curl?[.03,.035,-.015,-.04][i-1]:.018)*fold);
   if(curl)rotate('DEF_spine_0'+i,Y,spineYaw[i-1]*coil);
  }
  if(curl)rotate('DEF_chest',Y,.22*coil);
  // 颈椎先向前屈，再随躯干侧转；仰卧保留约 60°自然颈部轴转。
  const neckFlex=(up?1.20:curl?1.05:.87)*smooth(.25,.73,t);
  neck.position.copy(saved.get('DEF_neck').position).applyAxisAngle(X,neckFlex);
  rotate('DEF_neck',X,neckFlex);rotate('DEF_head',X,(curl?.13:-.20-neckFlex*.24)*smooth(.35,.82,t));
  if(up){rotate('DEF_neck',Z,.64*rolling);rotate('DEF_head',Z,.30*rolling);}
  if(curl){rotate('DEF_neck',Y,.65*coil);rotate('DEF_head',Y,.30*coil);}
  for(const side of ['l','r']){
   const scapula=bones.get('DEF_scapula_'+side);
   scapula.position.z-=.006*fold;
   scapula.position.y-=.003*fold;
  }
  update();
  if(curl){
   const chest=bones.get('DEF_chest'),desired=frame(chest).multiply(q(Y,1.30*coil)).multiply(q(X,.95*smooth(.35,.82,t)));
   head.quaternion.copy(frame(neck).invert().multiply(desired));
   update();
  }
  // 身体在降低途中逐渐接地。高度由真实躯干表面决定，四肢在后面单独求解。
  const low=floor(torso,mesh),contact=smooth(.30,.48,t);
  shiftWorld(pelvis,v(0,(.008-low)*(low<.008?1:contact),0));
  update();
  for(const c of chains){
   const front=c.id.startsWith('front'),sign=c.id.endsWith('l')?-1:1;
   const upper=c.nodes[0],parent=upper.parent,bodyRotation=frame(parent),hip=world(upper);
   const standing=c.ankle.clone(),grounded=standing.clone();
   grounded.z+=(front?.08:.055)*fold;grounded.x+=sign*.010*fold;
   const legExtension=up?smooth(.62,.89,t):1;
   const local=curl?
    v(sign*(front?.037:.045),front?-.185:-.183,front?.070:.035):
    up?v(sign*(front?.068:.073),THREE.MathUtils.lerp(front?-.100:-.090,front?-.210:-.190,legExtension),front?.070:.060):
    v(sign*(front?.035:.055),front?-.195:-.180,front?(sign<0?.160:.100):(sign<0?.145:.095));
   const relaxed=hip.clone().add(local.applyQuaternion(bodyRotation));
   // 下侧脚掌接地，上侧脚掌自然错开；仰卧的四肢完全交给胸廓坐标框架。
   const limbRelease=curl?smooth(.38,.72,t):up?smooth(.25,.44,t):release;
   const target=grounded.lerp(relaxed,limbRelease);
   const wrist=(up?.50:curl?(front?.45:.10):.10)*limbRelease;
   const pawRotation=bodyRotation.clone().multiply(q(X,wrist));
   let sole=Infinity;for(const p of c.foot)sole=Math.min(sole,p.clone().applyQuaternion(pawRotation).y);
   const pawLift=(curl?.008:up?.020:sign<0?.015:0)*limbRelease;
   target.y=Math.max(target.y,.005-sole+pawLift);
   target.y=THREE.MathUtils.lerp(standing.y,target.y,smooth(.02,.18,t));
   const metaLength=c.hock?c.hockRest.distanceTo(c.ankle):0;
   const foldedMeta=v(0,.025,-Math.sqrt(Math.max(.00001,metaLength*metaLength-.025*.025)));
   const meta=c.hock?c.hockRest.clone().sub(c.ankle).lerp(foldedMeta,fold).normalize().multiplyScalar(metaLength).applyQuaternion(bodyRotation):v();
   const restDirection=(c.hockRest??c.ankle).clone().sub(c.hip).normalize();
   const restPole=c.knee.clone().sub(c.hip);restPole.addScaledVector(restDirection,-restPole.dot(restDirection));
   const anatomicalPole=v(sign*(front?.28:.34),front?-.06:-.03,front?-1:1);
   const pole=restPole.normalize().lerp(anatomicalPole.normalize(),smooth(.06,.34,t)).normalize().applyQuaternion(bodyRotation);
   solveLimb(c,target,pole,pawRotation,meta);
   // 翻身前先抬起并折叠四肢；越过侧腹后才向上舒展。
   // 以逐节方向插值穿过抬脚段，避免接地投影把跗目标挤到髋点造成膝盖翻转。
   if(up&&t>.30)unfoldBellyLimb(c,t,bodyRotation,pawRotation,meta);
   rotate(c.nodes[3].name,X,(up?.15:curl?.28:.04)*settle);
  }
  // 尾根先顺势下降，再把末端铺在腹外缘；不把整条尾巴绕成悬空半环。
  if(curl)wrapCurlTail(coil);
  else for(let i=1;i<=4;i++)rotate('DEF_tail_0'+i,X,.04*fold);
  update();
  // 头部支撑只允许小量软组织余量；不以平移颈部掩盖错误的躯干/头部滚转。
  let skullLow=Infinity;for(const [surface,i]of skull)skullLow=Math.min(skullLow,surface.getVertexPosition(i,point).y);
  if(skullLow<.003)shiftWorld(neck,v(0,Math.min(.026,.003-skullLow)*smooth(.48,.78,t),0));
  for(const [side,sign]of [['l',-1],['r',1]]){
   const ear=bones.get('DEF_ear_'+side);if(!ear)continue;
   const down=1-smooth(-.025,.025,world(ear).y-world(head).y);
   const axis=v(...(ear.userData.earAxis??[0,0,1])).normalize();
   ear.rotateOnAxis(axis,sign*(curl?.07:.85*down)*settle);
  }
  update();
  return {fold,roll:Math.abs(roll)/(Math.PI/2),relax:settle,phase:t<.3?'后肢承重、身体降低':t<.48?'屈肘、胸腹接地':curl&&t<.94?'脊柱弯曲、头尾收拢':t<.90?'肩胯同步侧转、四肢放松':'放松'};
 };
}
