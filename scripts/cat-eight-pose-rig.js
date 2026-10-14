import * as THREE from 'three';
import {createCatForepawSupport,catForepawHeight,catSupportHeight} from './cat-rest-contact.js';
const V=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z),Q=(axis,angle)=>new THREE.Quaternion().setFromAxisAngle(axis,angle),X=V(1,0,0),Y=V(0,1,0),Z=V(0,0,1);
export const catRestPoses=[
 {id:'side',label:'01 侧躺',support:'侧腹、下侧前后爪和脸颊'},
 {id:'prone',label:'02 趴地',support:'胸腹、前爪和下巴'},
 {id:'belly',label:'03 四脚朝天',support:'背部和侧头；四肢放松抬起'},
 {id:'curl',label:'04 蜷成球',support:'臀腹、收拢的四爪和侧头'},
 {id:'stretch',label:'05 伸长',support:'胸腹、前后伸展的爪和下巴'},
 {id:'pillow',label:'06 靠枕',support:'胸腹、枕上的前爪和下巴'},
 {id:'loaf',label:'07 卧睡',support:'胸腹、折叠收拢的四爪和下巴'},
 {id:'wall',label:'08 贴墙',support:'臀腹、收拢的四爪与墙侧背部'}
];
const ease=(a,b,t)=>{const u=THREE.MathUtils.clamp((t-a)/(b-a),0,1);return u*u*(3-2*u);};

export function createEightPoseRig(model,{pillowSurface}={}){
 const bones=new Map();model.traverse(n=>{if(n.isBone)bones.set(n.name,n);});model.updateMatrixWorld(true);
 const saved=new Map([...bones].map(([n,b])=>[n,{position:b.position.clone(),quaternion:b.quaternion.clone(),world:b.getWorldPosition(V())}]));
 const mesh=model.getObjectByName('siamese_cat'),g=mesh.geometry,faceMesh=model.getObjectByName('siamese_cat_head')??mesh,faceGeometry=faceMesh.geometry,body=[],face=[],tailSurface=[],bodyGround=[],bodyHead=[];
 for(let i=0;i<g.attributes.position.count;i++){let trunk=0,head=0;for(let k=0;k<4;k++){const n=mesh.skeleton.bones[g.attributes.skinIndex.array[i*4+k]].name,w=g.attributes.skinWeight.array[i*4+k];if(/DEF_(pelvis|spine|chest)/.test(n))trunk+=w;if(n==='DEF_head')head+=w;}if(trunk>.85&&i%3===0)body.push(i);}
 for(let i=0;i<faceGeometry.attributes.position.count;i++){let head=0;for(let k=0;k<4;k++)if(faceMesh.skeleton.bones[faceGeometry.attributes.skinIndex.array[i*4+k]].name==='DEF_head')head+=faceGeometry.attributes.skinWeight.array[i*4+k];if(head>.98)face.push(i);}
 for(let i=0;i<g.attributes.position.count;i++){let head=0,trunk=0;for(let k=0;k<4;k++){const n=mesh.skeleton.bones[g.attributes.skinIndex.array[i*4+k]].name,w=g.attributes.skinWeight.array[i*4+k];if(n==='DEF_head')head+=w;if(/^DEF_(pelvis|spine|chest)/.test(n))trunk+=w;}if(g.attributes.position.getY(i)<.050||trunk>.85)bodyGround.push(i);if(head>.98)bodyHead.push(i);}
 for(let i=0;i<g.attributes.position.count;i++){let mass=0;for(let k=0;k<4;k++)if(mesh.skeleton.bones[g.attributes.skinIndex.array[i*4+k]].name.startsWith('DEF_tail_'))mass+=g.attributes.skinWeight.array[i*4+k];if(mass>.5)tailSurface.push(i);}
 const chains=['front_l','front_r','back_l','back_r'].map(id=>{const names=['upper','lower','paw','toe'].map(part=>'DEF_'+id+'_'+part),nodes=names.map(n=>bones.get(n)),[hip,knee,ankle,tip]=names.map(n=>saved.get(n).world),foot=[];for(let i=0;i<g.attributes.position.count;i++){if(g.attributes.position.getY(i)>.09)continue;let w=0;for(let k=0;k<4;k++){const n=mesh.skeleton.bones[g.attributes.skinIndex.array[i*4+k]].name;if(names.slice(2).includes(n))w+=g.attributes.skinWeight.array[i*4+k];}if(w>.65)foot.push(new THREE.Vector3().fromBufferAttribute(g.attributes.position,i).sub(ankle));}if(!foot.length)throw Error('No sole points '+id);return{id,nodes,hip,knee,ankle,tip,foot,a:hip.distanceTo(knee),b:knee.distanceTo(ankle)};});
 const world=n=>n.getWorldPosition(V()),samplePoint=V(),forepawSupport=createCatForepawSupport(mesh);let progress=0;
 function groundHeight(point,id){return catSupportHeight(point,id,progress,pillowSurface);}
 function shiftWorld(bone,delta){bone.position.add(delta.applyQuaternion(bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert()));model.updateMatrixWorld(true);}
 function restTail(relax){if(!relax)return;const chain=[1,2,3,4].map(i=>bones.get('DEF_tail_0'+i)),original=chain.map(b=>b.quaternion.clone());function apply(amount){chain.forEach((b,i)=>{b.quaternion.copy(original[i]);b.rotateX(-.10*relax*amount);});model.updateMatrixWorld(true);mesh.skeleton.update();let min=Infinity;for(const i of tailSurface)min=Math.min(min,mesh.getVertexPosition(i,samplePoint).y);return min;}if(apply(1)>=.003)return;let low=0,high=1;for(let i=0;i<8;i++){const mid=(low+high)/2;if(apply(mid)>=.003)low=mid;else high=mid;}apply(low);}
 function solve(c,target,hint,pawRotation){
  const [upper,lower,paw]=c.nodes,hip=world(upper),direction=target.clone().sub(hip),d=THREE.MathUtils.clamp(direction.length(),Math.abs(c.a-c.b)+.003,c.a+c.b-.003);direction.normalize();target=hip.clone().addScaledVector(direction,d);
  const along=(c.a*c.a-c.b*c.b+d*d)/(2*d),height=Math.sqrt(Math.max(.000001,c.a*c.a-along*along));hint.addScaledVector(direction,-hint.dot(direction));if(hint.length()<.001)hint.copy(X).addScaledVector(direction,-direction.x);hint.normalize();const knee=hip.clone().addScaledVector(direction,along).addScaledVector(hint,height),restUpper=c.knee.clone().sub(c.hip),restLower=c.ankle.clone().sub(c.knee),nextUpper=knee.clone().sub(hip),nextLower=target.clone().sub(knee),oldNormal=restUpper.clone().cross(restLower).normalize(),nextNormal=nextUpper.clone().cross(nextLower).normalize();
  function orient(bone,rest,next){const local=next.clone().applyQuaternion(bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert()).normalize();bone.quaternion.setFromUnitVectors(rest.clone().normalize(),local);bone.updateWorldMatrix(false,true);}
  orient(upper,restUpper,nextUpper);orient(lower,restLower,nextLower);paw.quaternion.copy(paw.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(pawRotation));paw.updateWorldMatrix(false,true);
 }
 function pose(id,t){
  progress=t;
  for(const [n,b]of bones){b.position.copy(saved.get(n).position);b.quaternion.copy(saved.get(n).quaternion);}
  if(id!=='side'){
   const fold=ease(.08,.68,t),relax=ease(.68,1,t),up=id==='belly',curl=id==='curl',stretch=id==='stretch',pillow=id==='pillow',compact=curl||id==='loaf'||id==='wall',pelvis=bones.get('DEF_pelvis'),neck=bones.get('DEF_neck');
   pelvis.position.y-=.17*fold;
   if(up)pelvis.rotateZ(-Math.PI*5/6*ease(.35,.86,t));
   if(curl){pelvis.rotateY(-.15*fold);for(let i=1;i<=4;i++)bones.get('DEF_spine_0'+i).rotateY(-[.32,.40,.36,.20][i-1]*fold);bones.get('DEF_chest').rotateY(-.12*fold);}
   for(const c of chains){const front=c.id.startsWith('front');let upper,lower;
    if(up){upper=front?-.35:.4;lower=front?.55:-.4;}
    else if(stretch){upper=front?-1.45:1.60;lower=front?.15:-.80;}
    else if(compact){upper=front?.70:-.45;lower=front?-1.55:1.10;}
    else {upper=front?-1.30:-.45;lower=front?.15:1.10;}
    if(!up&&!compact&&!stretch&&!front)shiftWorld(c.nodes[0],V(0,-.008*fold,0));
    if(compact&&front)shiftWorld(c.nodes[0],V(0,-.019*fold,0));
    if(stretch)shiftWorld(c.nodes[0],V(0,-(front?.027:.012)*fold,0));
    if(pillow&&front)shiftWorld(c.nodes[0],V(0,.035*fold,0));
    c.nodes[0].rotateX(upper*fold);c.nodes[1].rotateX(lower*fold);
    const heading=V(0,0,1).applyQuaternion(c.nodes[0].parent.getWorldQuaternion(new THREE.Quaternion())),pawOrientation=up?Q(Z,-Math.PI*ease(.35,.86,t)):curl?Q(Y,Math.atan2(heading.x,heading.z)):new THREE.Quaternion();c.nodes[2].quaternion.copy(c.nodes[2].parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(pawOrientation));c.nodes[2].updateWorldMatrix(false,true);
   }
   if(pillow)shiftWorld(bones.get('DEF_chest'),V(0,.03*fold,0));
   if(up){neck.rotateX(-.10*relax);bones.get('DEF_head').rotateX(.10*relax);}
   else {const arc=compact?1.15:pillow?.70:.95,desired=.35,rest=saved.get('DEF_neck').position;neck.position.copy(rest).lerp(rest.clone().applyAxisAngle(X,arc),relax);if(curl)neck.rotateY(-.35*relax);neck.rotateX(arc*relax);bones.get('DEF_head').rotateX((desired-arc)*relax);}
   if(up)neck.rotateZ(Math.PI/3*relax);
   if(curl)bones.get('DEF_head').rotateY(-.35*relax);
   for(let i=1;i<=4;i++){const tail=bones.get('DEF_tail_0'+i);tail.rotateY((curl?.65:.04)*relax);if(up)tail.rotateX([.40,.12,.05,.05][i-1]*relax);}
   model.updateMatrixWorld(true);let lowest=Infinity;
   if(up){mesh.skeleton.update();let trunkFloor=Infinity;for(const i of body)trunkFloor=Math.min(trunkFloor,mesh.getVertexPosition(i,samplePoint).y-.003);for(let i=0;i<g.attributes.position.count;i++)lowest=Math.min(lowest,mesh.getVertexPosition(i,samplePoint).y-.003);lowest=THREE.MathUtils.lerp(lowest,trunkFloor,ease(.65,1,ease(.35,.86,t)));}
   else {mesh.skeleton.update();let trunkFloor=Infinity;for(const i of bodyGround){const p=mesh.getVertexPosition(i,samplePoint);lowest=Math.min(lowest,p.y-groundHeight(p,id));}for(const i of body){const p=mesh.getVertexPosition(i,samplePoint);trunkFloor=Math.min(trunkFloor,p.y-groundHeight(p,id));}lowest=THREE.MathUtils.lerp(lowest,trunkFloor,stretch?0:fold);}
   shiftWorld(pelvis,V(0,-lowest,0));
   if(!up&&!stretch)for(const c of chains){const front=c.id.startsWith('front'),hip=world(c.nodes[0]),knee=world(c.nodes[1]),target=world(c.nodes[2]),heading=V(0,0,1).applyQuaternion(c.nodes[0].parent.getWorldQuaternion(new THREE.Quaternion())),pawOrientation=curl?Q(Y,Math.atan2(heading.x,heading.z)):new THREE.Quaternion();if(compact)target.z=THREE.MathUtils.lerp(target.z,hip.z+(front?.060:-.070),fold);const solePoints=c.foot.map(p=>p.clone().applyQuaternion(pawOrientation)),sole=solePoints.map(p=>p.y);let height=Math.max(...solePoints.map(p=>groundHeight(target.clone().add(p),id)-p.y));if(pillow&&front){const lead=.083*ease(.05,.30,t)*(1-ease(.50,.70,t));height=Math.max(height,lead-Math.min(...sole));}target.y=Math.max(height,THREE.MathUtils.lerp(target.y,height,fold));const hint=knee.sub(hip);solve(c,target,hint,pawOrientation);}
   if(!up)restTail(relax);
   if(up){faceMesh.skeleton.update();let min=Infinity;for(const i of face)min=Math.min(min,faceMesh.getVertexPosition(i,samplePoint).y);shiftWorld(neck,V(0,Math.max(0,.003-min),0));}
   else {const support=forepawSupport.sample();faceMesh.skeleton.update();let gap=Infinity;for(const [surface,indices]of [[faceMesh,face],[mesh,bodyHead]]){surface.skeleton.update();for(const i of indices){const p=surface.getVertexPosition(i,samplePoint);gap=Math.min(gap,p.y-Math.max(groundHeight(p,id),catForepawHeight(support,p)+.003));}}shiftWorld(neck,V(0,Math.max(0,-gap)-Math.min(.17,Math.max(0,gap))*relax,0));}
   if(id==='wall'){mesh.skeleton.update();let max=-Infinity;for(let i=0;i<g.attributes.position.count;i++)max=Math.max(max,mesh.getVertexPosition(i,samplePoint).x);shiftWorld(pelvis,V((.205-max)*relax,0,0));}
   model.traverse(n=>{if(n.isSkinnedMesh)n.skeleton.update();});return{fold,relax,phase:t<.68?'收拢四肢':t<1?'放松躺下':'放松'};
  }
  if(id==='side'){
   const crouch=ease(0,.30,t),roll=ease(.32,.86,t),relax=ease(.68,1,t),pelvis=bones.get('DEF_pelvis');
   pelvis.quaternion.setFromAxisAngle(Z,-Math.PI/2*roll);
   for(const c of chains){const front=c.id.startsWith('front');c.nodes[0].rotateX((front?-1.4:-.5)*crouch*(1-relax)+(front?-.16:.20)*relax);c.nodes[1].rotateX((front?1.2:.9)*crouch*(1-relax)+(front?.10:-.16)*relax);c.nodes[2].quaternion.copy(c.nodes[2].parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(Q(Z,-Math.PI/2*roll)));}
   bones.get('DEF_neck').rotateX(.12*relax);bones.get('DEF_head').rotateY(-.15*relax);bones.get('DEF_head').rotateZ(.35*relax);
   for(let i=1;i<=4;i++)bones.get('DEF_tail_0'+i).rotateY(.035*relax);
   model.updateMatrixWorld(true);let lowest=Infinity;
   mesh.skeleton.update();for(const i of bodyGround)lowest=Math.min(lowest,mesh.getVertexPosition(i,samplePoint).y);
   shiftWorld(pelvis,V(0,.003-lowest,0));
   for(const c of chains)if(c.id.endsWith('l'))shiftWorld(c.nodes[0],V(0,-.04*relax,0));
   const rotation=Q(Z,-Math.PI/2*roll);
   for(const c of chains){const left=c.id.endsWith('l'),front=c.id.startsWith('front'),target=c.ankle.clone().sub(saved.get('DEF_pelvis').world).applyQuaternion(rotation).add(world(pelvis));
    const profile=c.foot.map(p=>p.clone().applyQuaternion(rotation).y),support=.003-Math.min(...profile)+(left?.06*relax:0);
    target.y=Math.max(support,THREE.MathUtils.lerp(target.y,support,relax));target.z+=(front?.06:.025)*relax;
    const rest=c.knee.clone().sub(c.hip),hint=rest.applyQuaternion(rotation);solve(c,target,hint,rotation);
   }
   faceMesh.skeleton.update();let faceFloor=Infinity;for(const [surface,indices]of [[faceMesh,face],[mesh,bodyHead]]){surface.skeleton.update();for(const i of indices)faceFloor=Math.min(faceFloor,surface.getVertexPosition(i,samplePoint).y);}
   shiftWorld(bones.get('DEF_neck'),V(0,Math.max(0,.003-faceFloor),0));model.traverse(n=>{if(n.isSkinnedMesh)n.skeleton.update();});
   return{roll,relax,phase:t<.28?'降低身体':t<.86?'侧身躺下':'放松'};
  }
 }
 return{pose,bones,saved,chains};
}
