import * as THREE from 'three';
import {catSupportHeight} from './cat-rest-contact.js';

const v=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
const X=v(1,0,0),Y=v(0,1,0),Z=v(0,0,1);
const smooth=(a,b,t)=>{const u=THREE.MathUtils.clamp((t-a)/(b-a),0,1);return u*u*(3-2*u);};
const qaxis=(axis,angle)=>new THREE.Quaternion().setFromAxisAngle(axis,angle);
export const groundCatPoseIds=['prone','stretch','pillow','loaf','wall'];

// 地面五姿的控制骨目标。外层在每次调用前恢复 saved，离线体积求解负责皮肤保形。
// 不缩放肢骨；前肘向后、后膝向前，后脚另解跗段，脚掌不跟随膝弯被动反折。
export function createGroundCatPoses({model,mesh,faceMesh,bones,saved,chains,pillowSurface}){
 const pelvis=bones.get('DEF_pelvis'),neck=bones.get('DEF_neck'),head=bones.get('DEF_head');
 const faceAxis=v(Math.sin(head.userData.faceYaw??.555),0,Math.cos(head.userData.faceYaw??.555)),headRest=saved.get('DEF_head').world;
 const belly=[],flank=[],chin=[],p=v();
 for(const surface of [mesh,faceMesh]){
  const g=surface.geometry;
  for(let i=0;i<g.attributes.position.count;i++){
   const rest=v().fromBufferAttribute(g.attributes.position,i);let trunk=0,skull=0;
   for(let k=0;k<4;k++){
    const n=surface.skeleton.bones[g.attributes.skinIndex.array[i*4+k]].name,w=g.attributes.skinWeight.array[i*4+k];
    if(/^DEF_(pelvis|spine|chest)/.test(n))trunk+=w;
    if(n==='DEF_head')skull+=w;
   }
   if(surface===mesh&&trunk>.85&&rest.z>-.10&&rest.z<.25){
    if(Math.abs(rest.x)<.065&&rest.y<.29)belly.push(i);
    if(rest.y>.23)flank.push(i);
   }
   // 只用口鼻前下方的实际下巴；后颈最低点不能冒充下巴的支撑。
   if(surface===faceMesh&&skull>.95&&rest.y<.45&&rest.clone().sub(headRest).dot(faceAxis)>.105)chin.push([surface,i]);
  }
 }
 function update(){model.updateMatrixWorld(true);mesh.skeleton.update();faceMesh.skeleton.update();}
 function translateWorld(bone,delta){
  bone.position.add(delta.clone().applyQuaternion(bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert()));
  model.updateMatrixWorld(true);
 }
 function minimum(indices){let value=Infinity;for(const i of indices)value=Math.min(value,mesh.getVertexPosition(i,p).y);return value;}
 // 最小摆动保留骨段原有的转轴，避免旧 frame 对齐在折肘时凭空补入轴向扭转。
 function swing(bone,restDirection,nextDirection){
  const parent=bone.parent.getWorldQuaternion(new THREE.Quaternion());
  const carried=restDirection.clone().applyQuaternion(parent).normalize();
  const rotation=new THREE.Quaternion().setFromUnitVectors(carried,nextDirection.clone().normalize());
  bone.quaternion.copy(parent.clone().invert().multiply(rotation.multiply(parent)));
  bone.updateWorldMatrix(false,true);
 }
 function orientPaw(paw,rotation){
  paw.quaternion.copy(paw.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(rotation));
  paw.updateWorldMatrix(false,true);
 }
 function solveLimb(c,pawTarget,pole,pawRotation,metaDirection,fold){
  const [upper,lower,paw]=c.nodes,hip=upper.getWorldPosition(v());
  const target=pawTarget.clone();
  if(c.hock){
   const metaLength=c.hockRest.distanceTo(c.ankle);
   target.add(metaDirection.clone().normalize().multiplyScalar(metaLength));
  }
  let direction=target.clone().sub(hip),distance=direction.length();
  const min=Math.abs(c.a-c.b)+.008,max=c.a+c.b-.008;
  // 保持脚底高度；只把水平目标带回肢骨可达区。
  if(distance<min||distance>max){
   const desired=THREE.MathUtils.clamp(distance,min,max),dy=target.y-hip.y;
   const horizontal=v(target.x-hip.x,0,target.z-hip.z);
   horizontal.setLength(Math.sqrt(Math.max(.00001,desired*desired-dy*dy)));
   const correction=v(hip.x+horizontal.x-target.x,0,hip.z+horizontal.z-target.z);
   target.add(correction);pawTarget.add(correction);direction.copy(target).sub(hip);distance=direction.length();
  }
  direction.normalize();distance=THREE.MathUtils.clamp(distance,min,max);
  const along=(c.a*c.a-c.b*c.b+distance*distance)/(2*distance),radius=Math.sqrt(Math.max(.000001,c.a*c.a-along*along));
  const restDirection=(c.hockRest??c.ankle).clone().sub(c.hip).normalize();
  const restPole=c.knee.clone().sub(c.hip).addScaledVector(restDirection,-c.knee.clone().sub(c.hip).dot(restDirection));
  restPole.applyQuaternion(upper.parent.getWorldQuaternion(new THREE.Quaternion()));
  restPole.addScaledVector(direction,-restPole.dot(direction)).normalize();
  pole.addScaledVector(direction,-pole.dot(direction)).normalize();
  const turn=new THREE.Quaternion().setFromUnitVectors(restPole,pole);
  const hint=restPole.applyQuaternion(new THREE.Quaternion().slerp(turn,fold)).normalize();
  // 肘/膝中心必须在地板上方；在弯曲圆上调整 pole，不改骨长也不把爪压入地面。
  const minimumJoint=c.id.startsWith('front')?.055:.060,base=hip.y+direction.y*along;
  if(base+radius*hint.y<minimumJoint){
   const vertical=Y.clone().addScaledVector(direction,-direction.y).normalize();
   const across=direction.clone().cross(vertical).normalize();
   const cosine=THREE.MathUtils.clamp((minimumJoint-base)/Math.max(.00001,radius*vertical.y),-1,1);
   const sign=Math.sign(hint.dot(across))||(c.id.endsWith('l')?-1:1);
   hint.copy(vertical.multiplyScalar(cosine).addScaledVector(across,sign*Math.sqrt(1-cosine*cosine)));
  }
  const knee=hip.clone().addScaledVector(direction,along).addScaledVector(hint,radius);
  swing(upper,c.knee.clone().sub(c.hip),knee.clone().sub(hip));
  swing(lower,(c.hockRest??c.ankle).clone().sub(c.knee),target.clone().sub(knee));
  if(c.hock)swing(c.hock,c.ankle.clone().sub(c.hockRest),pawTarget.clone().sub(target));
  orientPaw(paw,pawRotation);
  return{hip:hip.toArray(),knee:knee.toArray(),hock:target.toArray(),paw:pawTarget.toArray()};
 }
 function pose(id,t){
  if(!groundCatPoseIds.includes(id))return null;
  if(t<=0)return{fold:0,roll:0,relax:0,phase:'站姿',joints:[]};
  const stretch=id==='stretch',pillow=id==='pillow',loaf=id==='loaf',wall=id==='wall';
  const lower=smooth(.025,.64,t),fore=smooth(.15,.70,t),settle=smooth(.65,1,t);
  const extend=stretch?smooth(.47,.98,t):0,tuck=loaf?smooth(.48,.91,t):0,lean=wall?smooth(.46,.95,t):0;
  const roll=stretch?.90*extend:wall?-.24*lean:0;
  pelvis.position.y-=.177*lower;
  pelvis.position.z-=.015*smooth(.025,.32,t);
  pelvis.rotateZ(-roll);
  // 伸展展开腰背；贴墙从骨盆到胸椎逐段侧弯，不能只移动卧睡网格。
  for(let i=1;i<=4;i++){
   const spine=bones.get('DEF_spine_0'+i);
   spine.rotateX((stretch?-.018:.025)*fore);
   if(wall){spine.rotateY(-[.035,.045,.055,.065][i-1]*lean);spine.rotateZ(.022*lean);}
  }
  bones.get('DEF_chest').rotateX((pillow?.025:.035)*fore);
  if(wall)bones.get('DEF_chest').rotateY(-.075*lean);
  const arc=(pillow?.58:loaf?.62:wall?.62:.60)*smooth(.43,.94,t);
  neck.position.copy(saved.get('DEF_neck').position).applyAxisAngle(X,arc);
  neck.rotateX(arc);
  head.rotateX((pillow?.48:loaf?.46:wall?.46:.44)*fore-arc);
  if(pillow)head.rotateY(-.18*settle);
  if(stretch)head.rotateZ(.36*extend);
  if(wall)head.rotateY(-.14*lean);
  for(const s of ['l','r']){
   const scapula=bones.get('DEF_scapula_'+s);
   // 肩胛贴着胸廓前滑，位移限制在原肩胛长度内。
   scapula.position.z+=(stretch?.012:loaf?-.005:.006)*fore;
   scapula.position.y-=.003*fore;
  }
  update();
  const bodyFloor=minimum(stretch?flank:belly),contact=smooth(.40,.72,t);
  if(Number.isFinite(bodyFloor))translateWorld(pelvis,v(0,(.010-bodyFloor)*(bodyFloor<.010?1:contact),0));
  const bodyRotation=pelvis.getWorldQuaternion(new THREE.Quaternion()),joints=[];
  for(const c of chains){
   const front=c.id.startsWith('front'),sign=c.id.endsWith('l')?-1:1,hip=c.nodes[0].getWorldPosition(v());
   const folding=front?fore:lower,start=c.ankle.clone();
   let finish=v(sign*(front?.119:.137),0,front?c.ankle.z+.165:c.hip.z-.135);
   if(loaf&&front)finish.set(sign*.050,0,hip.z+.074);
   if((loaf||pillow)&&!front)finish.set(sign*.130,0,c.hip.z-.155);
   if(pillow&&front)finish.set(sign*.155,0,.555+(sign>0?-.018:.012));
   if(stretch){
    finish.set(sign*(front?.082:.101)-(front?.145:.160),0,hip.z+(front?.265:-.235));
    if(sign>0)finish.z+=front?-.025:.035;
   }
   if(wall){
    finish.set(sign*(front?.058:.125),0,front?hip.z+(sign>0?.064:.095):c.hip.z-(sign>0?.145:.165));
    finish.x-=front?.026*lean:.018*lean;
   }
   const travel=smooth(front?.15:.06,front?.74:.59,t),target=start.clone().lerp(finish,travel);
   const pawRotation=qaxis(Z,-roll);
   if(front&&loaf)pawRotation.multiply(qaxis(X,.68*tuck));
   if(wall)pawRotation.multiply(qaxis(Y,(front?-.14:.10)*lean));
   if(!front&&!stretch){
    // 地面姿势的跟点均在趾根前上方；卧睡三姿只缩短后展幅度，避免跗掌反向形成环。
    pawRotation.multiply(qaxis(X,2.30*folding));
    pawRotation.multiply(qaxis(Z,sign*(loaf||wall||pillow?.10:.18)*folding));
   }
   if(stretch){
    // 后足随整条腿向后舒展，趾端指向尾侧；不能保持站姿脚朝前而在踝处折钩。
    pawRotation.multiply(qaxis(X,(front?-.28:2.30)*extend));
    if(!front)pawRotation.multiply(qaxis(Y,sign*.10*extend));
   }
   const sole=Math.min(...c.foot.map(point=>point.clone().applyQuaternion(pawRotation).y));
   const ground=pillow&&front?catSupportHeight(finish,id,1,pillowSurface):catSupportHeight(target,id,t,pillowSurface);
   let height=ground-sole;
   // 先小幅抬爪再放下，枕头移动到位后再接触；站姿起点完全保持。
   if(pillow&&front)height+=.055*Math.sin(Math.PI*smooth(.15,.72,t));
   if(loaf&&front)height+=.025*Math.sin(Math.PI*smooth(sign<0?.44:.49,sign<0?.82:.87,t));
   if(stretch&&sign>0)height+=.046*extend;
   target.y=THREE.MathUtils.lerp(start.y,height,pillow&&front?travel:smooth(.025,.20,t));
   // 跗骨由抬高的跟点过渡到向后的跗点，跗段绝不绕脚掌横轴翻到脚背。
   let meta=(c.hockRest??c.ankle).clone().sub(c.ankle);
   if(c.hock){
    const desired=stretch?v(0,.018,.068):v(sign*.009,.032,.061);
    desired.applyQuaternion(bodyRotation);
    meta.lerp(desired,folding).normalize();
   }
   const pole=v(sign*(front?.16:.21),front?-.30:.15,front?-1:1).applyQuaternion(bodyRotation);
   if(stretch)pole.lerp(v(-1,sign<0?-.10:.35,front?-.42:.30),extend);
   joints.push({id:c.id,...solveLimb(c,target,pole,pawRotation,meta,smooth(.02,.42,t))});
  }
  update();
  // 直接测下巴对地/枕面的支撑，不把整片前臂误当成头枕而抬高整颗头。
  let chinGap=Infinity;
  for(const[surface,i]of chin){surface.getVertexPosition(i,p);chinGap=Math.min(chinGap,p.y-catSupportHeight(p,id,t,pillowSurface));}
  if(Number.isFinite(chinGap)){
   const adjust=Math.max(-.025,Math.min(.040,.006-chinGap))*settle;
   translateWorld(neck,v(0,adjust,0));
  }
  // 尾巴仍在尾骨链内转动：卧睡侧收，贴墙绕向身体外侧，伸长低放。
  for(let i=1;i<=4;i++){
   const tail=bones.get('DEF_tail_0'+i);
   tail.rotateY((wall?-.30:loaf?.22:stretch?-.035:.045)*settle);
   tail.rotateX((stretch?-.035:loaf?.015:0)*settle);
  }
  for(const[s,sign]of[['l',-1],['r',1]]){
   const ear=bones.get('DEF_ear_'+s);
   if(ear)ear.rotateOnAxis(v(...(ear.userData.earAxis??[0,0,1])).normalize(),sign*.065*settle);
  }
  if(wall){
   update();let side= -Infinity;
   for(let i=0;i<mesh.geometry.attributes.position.count;i++)side=Math.max(side,mesh.getVertexPosition(i,p).x);
   translateWorld(pelvis,v((.205-side)*lean,0,0));
  }
  update();
  return{fold:lower,roll:Math.abs(roll),relax:settle,joints,phase:t<.20?'后肢承重':t<.64?'屈肘、胸腹降低':t<.90?(stretch?'前后肢舒展':loaf?'依次收腕':wall?'侧身靠墙':'放下头部'):'放松'};
 }
 return pose;
}
