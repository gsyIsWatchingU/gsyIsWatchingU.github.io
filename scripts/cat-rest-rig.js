import * as THREE from 'three';

const V=(x,y,z)=>new THREE.Vector3(x,y,z),Z=V(0,0,1),X=V(1,0,0);
export const restDuration=4.2;
export const smooth=(a,b,t)=>{const u=THREE.MathUtils.clamp((t-a)/(b-a),0,1);return u*u*(3-2*u);};

// 网页的 Y-up 四足约定；控制器不使用整只模型的侧翻或形态目标。
export function createRestRig(model){
 const bones=new Map();model.traverse(n=>{if(n.isBone)bones.set(n.name,n);});model.updateMatrixWorld(true);
 const saved=new Map([...bones].map(([n,b])=>[n,{position:b.position.clone(),quaternion:b.quaternion.clone(),world:b.getWorldPosition(new THREE.Vector3())}]));
 const mesh=model.getObjectByName('siamese_cat'),bodySupport=[],headSupport=[];const geometry=mesh.geometry;for(let i=0;i<geometry.attributes.position.count;i++){let body=0,face=0;for(let k=0;k<4;k++){const n=mesh.skeleton.bones[geometry.attributes.skinIndex.array[i*4+k]].name,w=geometry.attributes.skinWeight.array[i*4+k];if(['DEF_pelvis','DEF_spine_01','DEF_spine_02','DEF_chest'].includes(n))body+=w;if(['DEF_neck','DEF_head'].includes(n))face+=w;}if(body>.98)bodySupport.push(i);if(face>.98)headSupport.push(i);}
 const chains=['front_l','front_r','back_l','back_r'].map(name=>{const upper=bones.get('DEF_'+name+'_upper'),lower=bones.get('DEF_'+name+'_lower'),paw=bones.get('DEF_'+name+'_paw'),end=bones.get('DEF_'+name+'_toe');return{name,upper,lower,paw,end,hip:saved.get(upper.name).world,knee:saved.get(lower.name).world,ankle:saved.get(paw.name).world,tip:saved.get(end.name).world,a:saved.get(upper.name).world.distanceTo(saved.get(lower.name).world),b:saved.get(lower.name).world.distanceTo(saved.get(paw.name).world)};});
 for(const c of chains){c.foot=[];for(let i=0;i<geometry.attributes.position.count;i++){if(geometry.attributes.position.getY(i)>.06)continue;let weight=0;for(let k=0;k<4;k++){const name=mesh.skeleton.bones[geometry.attributes.skinIndex.array[i*4+k]].name;if(name===c.paw.name||name===c.end.name)weight+=geometry.attributes.skinWeight.array[i*4+k];}if(weight>.8)c.foot.push(new THREE.Vector3().fromBufferAttribute(geometry.attributes.position,i).sub(c.ankle));}}
 function world(b){return b.getWorldPosition(new THREE.Vector3());}
 // 烘焙时提前引导支撑前腿的弯曲面，避免接地解在两侧突然切换。
 function solve(chain,target){const hip=world(chain.upper),delta=target.clone().sub(hip),distance=Math.min(chain.a+chain.b-.000001,Math.max(Math.abs(chain.a-chain.b)+.000001,delta.length())),direction=delta.normalize();target=hip.clone().addScaledVector(direction,distance);const along=(chain.a**2-chain.b**2+distance**2)/(2*distance),height=Math.sqrt(Math.max(0,chain.a**2-along**2)),bend=V(0,0,chain.name.startsWith('front')?-1:1);bend.addScaledVector(direction,-bend.dot(direction));if(bend.length()<.000001)bend.copy(X);bend.normalize();if(chain.name==='front_r')bend.applyAxisAngle(direction,-.65*smooth(1.25,1.7,chain.poseTime)*(1-smooth(2.05,2.6,chain.poseTime)));const center=hip.clone().addScaledVector(direction,along),other=direction.clone().cross(bend).normalize();let knee=center.clone().addScaledVector(bend,height);
  const floor=chain.kneeFloor??.074;if(knee.y<floor){const amplitude=Math.hypot(bend.y,other.y),phi=Math.atan2(other.y,bend.y),limit=Math.acos(THREE.MathUtils.clamp((floor-center.y)/Math.max(.000001,height*amplitude),-1,1)),wrap=a=>Math.atan2(Math.sin(a),Math.cos(a)),a=wrap(phi-limit),b=wrap(phi+limit),angle=Math.abs(a)<Math.abs(b)?a:b;knee=center.clone().addScaledVector(bend,Math.cos(angle)*height).addScaledVector(other,Math.sin(angle)*height);}
  const restUpper=chain.knee.clone().sub(chain.hip),restLower=chain.ankle.clone().sub(chain.knee),nextUpper=knee.clone().sub(hip),nextLower=target.clone().sub(knee),restNormal=restUpper.clone().cross(restLower).normalize(),nextNormal=nextUpper.clone().cross(nextLower).normalize();
  function frameOrient(b,restVector,nextVector){const restY=restVector.clone().normalize(),nextY=nextVector.clone().normalize(),restFrame=new THREE.Matrix4().makeBasis(restNormal,restY,restNormal.clone().cross(restY)),nextFrame=new THREE.Matrix4().makeBasis(nextNormal,nextY,nextNormal.clone().cross(nextY)),rotation=new THREE.Quaternion().setFromRotationMatrix(nextFrame.multiply(restFrame.invert()));b.quaternion.copy(b.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(rotation));b.updateWorldMatrix(false,true);}
  frameOrient(chain.upper,restUpper,nextUpper);frameOrient(chain.lower,restLower,nextLower);const parent=chain.paw.parent.getWorldQuaternion(new THREE.Quaternion());chain.paw.quaternion.copy(parent.invert().multiply(new THREE.Quaternion().setFromAxisAngle(Z,chain.pawRoll??0)));chain.paw.updateWorldMatrix(false,true);return {target,knee};}
 function pose(time){
  for(const chain of chains)chain.poseTime=time;
  for(const [name,b]of bones){b.position.copy(saved.get(name).position);b.quaternion.copy(saved.get(name).quaternion);}
  const lower=smooth(0,.95,time),fold=smooth(.8,1.85,time),roll=smooth(1.7,3.1,time),relax=smooth(3,4.2,time);
  const pelvis=bones.get('DEF_pelvis'),spine1=bones.get('DEF_spine_01'),spine2=bones.get('DEF_spine_02'),chest=bones.get('DEF_chest'),neck=bones.get('DEF_neck'),head=bones.get('DEF_head');
  const angle=-Math.PI/2*roll;
  pelvis.position.y-=.030*lower+.025*fold+.093*roll;pelvis.position.z-=.008*lower;pelvis.quaternion.setFromAxisAngle(Z,angle);
  spine1.rotateZ(.05*Math.sin(Math.PI*roll));spine2.rotateZ(.07*Math.sin(Math.PI*roll));chest.rotateZ(.035*roll);chest.rotateX(-.075*fold*(1-roll));
  neck.rotateZ(.12*roll);neck.rotateX(.10*fold*(1-roll));head.rotateY(-.30*roll);head.rotateZ(.10*roll);head.rotateX(.10*relax);
  for(const side of ['l','r']){const scap=bones.get('DEF_scapula_'+side);scap.position.z+=.012*roll-.005*fold;scap.position.x+=(side==='l'?.015:0)*roll;scap.rotateZ((side==='l'?.025:-.025)*fold*(1-roll));}
  const tail=bones.get('DEF_tail_01');tail.rotateY(-.22*roll);bones.get('DEF_tail_02').rotateY(-.04*roll);bones.get('DEF_tail_03').rotateY(.02*relax);
  model.updateMatrixWorld(true);
  mesh.skeleton.update();let floor=Infinity;for(const i of bodySupport)floor=Math.min(floor,mesh.getVertexPosition(i,new THREE.Vector3()).y);pelvis.position.y+=Math.max(0,.003-floor);model.updateMatrixWorld(true);mesh.skeleton.update();floor=Infinity;for(const i of headSupport)floor=Math.min(floor,mesh.getVertexPosition(i,new THREE.Vector3()).y);const lift=Math.max(0,.003-floor),localUp=V(0,lift,0).applyQuaternion(neck.parent.getWorldQuaternion(new THREE.Quaternion()).invert());neck.position.add(localUp);model.updateMatrixWorld(true);
  const contacts=[];
  for(const c of chains){const front=c.name.startsWith('front'),upper=c.name.endsWith('l'),sign=upper?-1:1;
   const delay=upper?.15:0,reach=smooth((front?.9:1.05)+delay,(front?1.8:1.65)+delay,time);
   const standing=c.ankle.clone().add(V(sign*.008*fold,(front?.012:.009)*Math.sin(Math.PI*reach),front?.035*reach:-.018*reach));
   const other=chains.find(v=>v.name===(front?'front_r':'back_r')),quarter=new THREE.Quaternion().setFromAxisAngle(Z,-.35),ownQuarter=new THREE.Quaternion().setFromAxisAngle(Z,upper?-.60:-.35),lowProfile=other.foot.map(v=>v.clone().applyQuaternion(quarter).y),ownProfile=c.foot.map(v=>v.clone().applyQuaternion(ownQuarter).y),lowHeight=Math.max(.05,.001-Math.min(...lowProfile)),stackHeight=lowHeight+Math.max(...lowProfile)-Math.min(...ownProfile)+.002;
   const final=V(upper?-.220:-.230,upper?stackHeight:lowHeight,(upper?other.ankle.z:c.ankle.z)+(front?.08:-.08)+(upper?.018:0));
   const legRoll=smooth(upper?1.94:1.70,upper?3.25:3.10,time),target=standing.lerp(final,legRoll);
   c.kneeFloor=THREE.MathUtils.lerp(.074,.052,roll);c.pawRoll=(upper?-.60:-.35)*roll;const footRotation=new THREE.Quaternion().setFromAxisAngle(Z,c.pawRoll),minimum=Math.min(...c.foot.map(v=>v.clone().applyQuaternion(footRotation).y));target.y=Math.max(target.y,.001-minimum);const result=solve(c,target);contacts.push({name:c.name,paw:world(c.paw).toArray(),target:result.target.toArray(),knee:result.knee.toArray(),upper});
  }
  model.updateMatrixWorld(true);model.traverse(n=>{if(n.isSkinnedMesh)n.skeleton.update();});
  return{phase:time<.95?'降低身体':time<1.85?'换爪支撑':time<3.1?'侧身落地':'放松',lower,fold,roll,relax,contacts};
 }
 return{pose,bones,saved,chains};
}
