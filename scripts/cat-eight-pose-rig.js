import * as THREE from 'three';
import {createSupportedCatRest} from './cat-supported-rest.js';
const V=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z),X=V(1,0,0);
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

export function createEightPoseRig(model,{pillowSurface}={}){
 const bones=new Map();model.traverse(n=>{if(n.isBone)bones.set(n.name,n);});model.updateMatrixWorld(true);
 const saved=new Map([...bones].map(([n,b])=>[n,{position:b.position.clone(),quaternion:b.quaternion.clone(),world:b.getWorldPosition(V())}]));
 const mesh=model.getObjectByName('siamese_cat'),g=mesh.geometry,faceMesh=model.getObjectByName('siamese_cat_head');
 const chains=['front_l','front_r','back_l','back_r'].map(id=>{const names=['upper','lower','paw','toe'].map(part=>'DEF_'+id+'_'+part),nodes=names.map(n=>bones.get(n)),[hip,knee,ankle,tip]=names.map(n=>saved.get(n).world),foot=[];for(let i=0;i<g.attributes.position.count;i++){if(g.attributes.position.getY(i)>.09)continue;let w=0;for(let k=0;k<4;k++){const n=mesh.skeleton.bones[g.attributes.skinIndex.array[i*4+k]].name;if(names.slice(2).includes(n))w+=g.attributes.skinWeight.array[i*4+k];}if(w>.65)foot.push(new THREE.Vector3().fromBufferAttribute(g.attributes.position,i).sub(ankle));}if(!foot.length)throw Error('No sole points '+id);return{id,nodes,hip,knee,ankle,tip,foot,a:hip.distanceTo(knee),b:knee.distanceTo(ankle)};});

 const world=n=>n.getWorldPosition(V());
 function shiftWorld(bone,delta){bone.position.add(delta.applyQuaternion(bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert()));model.updateMatrixWorld(true);}
 function solve(c,target,hint,pawRotation){
  const [upper,lower,paw]=c.nodes,hip=world(upper),direction=target.clone().sub(hip),d=THREE.MathUtils.clamp(direction.length(),Math.abs(c.a-c.b)+.003,c.a+c.b-.003);direction.normalize();target=hip.clone().addScaledVector(direction,d);
  const along=(c.a*c.a-c.b*c.b+d*d)/(2*d),height=Math.sqrt(Math.max(.000001,c.a*c.a-along*along));hint.addScaledVector(direction,-hint.dot(direction));if(hint.length()<.001)hint.copy(X).addScaledVector(direction,-direction.x);hint.normalize();const knee=hip.clone().addScaledVector(direction,along).addScaledVector(hint,height),restUpper=c.knee.clone().sub(c.hip),restLower=c.ankle.clone().sub(c.knee),nextUpper=knee.clone().sub(hip),nextLower=target.clone().sub(knee),oldNormal=restUpper.clone().cross(restLower).normalize(),nextNormal=nextUpper.clone().cross(nextLower).normalize();
  // 同时匹配肢段方向与肘膝弯曲平面。只匹配一根向量会留下自由扭转。
  function frame(direction,normal){const y=direction.clone().normalize(),x=normal.clone().normalize(),z=x.clone().cross(y).normalize();x.copy(y).cross(z).normalize();return new THREE.Matrix4().makeBasis(x,y,z);}
  function orient(bone,rest,next){const rotation=frame(next,nextNormal).multiply(frame(rest,oldNormal).invert()),worldRotation=new THREE.Quaternion().setFromRotationMatrix(rotation);const parentRotation=bone.parent.getWorldQuaternion(new THREE.Quaternion());if(bone===upper){const carried=rest.clone().applyQuaternion(parentRotation),swing=new THREE.Quaternion().setFromUnitVectors(carried.normalize(),next.clone().normalize()).multiply(parentRotation),twist=swing.angleTo(worldRotation);worldRotation.copy(swing.slerp(worldRotation,Math.min(1,.45/Math.max(.00001,twist))));}bone.quaternion.copy(parentRotation.invert().multiply(worldRotation));bone.updateWorldMatrix(false,true);}
  orient(upper,restUpper,nextUpper);orient(lower,restLower,nextLower);paw.quaternion.copy(paw.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(pawRotation));paw.updateWorldMatrix(false,true);
 }

 const supportedRest=createSupportedCatRest({model,mesh,faceMesh,bones,saved,chains,solve,shiftWorld,pillowSurface});
 function pose(id,t){for(const[n,b]of bones){b.position.copy(saved.get(n).position);b.quaternion.copy(saved.get(n).quaternion);}return supportedRest(id,t);}
 return{pose,bones,saved,chains};
}
