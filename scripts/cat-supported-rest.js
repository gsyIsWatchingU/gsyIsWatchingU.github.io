import * as THREE from 'three';
import {catSupportHeight,createCatForepawSupport,catForepawHeight} from './cat-rest-contact.js';

const v=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z),X=v(1,0,0),Z=v(0,0,1);
const ease=(a,b,t)=>{const u=THREE.MathUtils.clamp((t-a)/(b-a),0,1);return u*u*(3-2*u);};

// 先由后肢承重降低骨盆，再屈前肘；胸腹接地后才侧转或收腕。
// 支撑爪用世界坐标约束，肘向后、膝向前，头颈沿关节弧线降低。
export function createSupportedCatRest({model,mesh,faceMesh,bones,saved,chains,solve,shiftWorld,pillowSurface}){
 const bellyPoints=[],flankPoints=[],skullPoints=[],p=new THREE.Vector3(),forepaws=createCatForepawSupport(mesh);
 for(const surface of [mesh,faceMesh]){
  const g=surface.geometry;
  for(let i=0;i<g.attributes.position.count;i++){
   const rest=v().fromBufferAttribute(g.attributes.position,i);let trunk=0,head=0;
   for(let k=0;k<4;k++){const name=surface.skeleton.bones[g.attributes.skinIndex.array[i*4+k]].name,w=g.attributes.skinWeight.array[i*4+k];if(/^DEF_(pelvis|spine|chest)/.test(name))trunk+=w;if(name==='DEF_head')head+=w;}
   if(surface===mesh&&trunk>.8&&Math.abs(rest.x)<.060&&rest.y>.15&&rest.y<.30&&rest.z>-.05&&rest.z<.15)bellyPoints.push(i);
   if(surface===mesh&&trunk>.8&&rest.y>.20&&rest.z>-.12&&rest.z<.20)flankPoints.push(i);
   if(head>.98||(surface===faceMesh&&rest.z>.34&&rest.y>.32&&rest.y<.45))skullPoints.push([surface,i]);
  }
 }
 function update(){model.updateMatrixWorld(true);mesh.skeleton.update();faceMesh.skeleton.update();}
 function minimum(points,surface){let h=Infinity;for(const i of points)h=Math.min(h,surface.getVertexPosition(i,p).y);return h;}
 return function pose(id,t){
  const up=id==='belly',curl=id==='curl',stretch=id==='stretch',pillow=id==='pillow',wall=id==='wall';
  const side=id==='side'||up,loaf=id==='loaf'||curl||wall,lower=ease(.03,side?.40:.65,t),fore=ease(.16,side?.40:.65,t),roll=side?ease(up?.40:.44,up?.98:.86,t)*(up?1.55:1):0,settle=ease(side?.80:.67,1,t),tuck=loaf?ease(.40,.85,t):0;
  const pelvis=bones.get('DEF_pelvis'),neck=bones.get('DEF_neck'),head=bones.get('DEF_head');
  pelvis.position.y+=.003-.175*lower;
  pelvis.position.z-=.018*ease(.03,.30,t)*(1-roll);
  pelvis.rotation.z=-Math.PI/2*roll;
  const upright=1-Math.min(1,roll),coil=curl?ease(.55,.95,t):0;
  bones.get('DEF_spine_03').rotateX((pillow?-.10:.065)*fore*upright);
  bones.get('DEF_spine_04').rotateX((pillow?-.10:.075)*fore*upright);
  bones.get('DEF_chest').rotateX((pillow?-.08:.07)*fore*upright);
  if(curl){pelvis.rotateY(-.10*coil);for(let i=1;i<=4;i++)bones.get('DEF_spine_0'+i).rotateY(-[.20,.24,.24,.20][i-1]*coil);bones.get('DEF_chest').rotateY(-.10*coil);}
  const neckArc=up?.80*ease(.25,.75,t):(.80*ease(.48,.92,t))*upright,local=saved.get('DEF_neck').position;
  neck.position.copy(local).applyAxisAngle(X,neckArc);
  neck.rotateX(neckArc);head.rotateX((.42-neckArc-(pillow?-.28:.21)*fore)*ease(.48,.92,t)*upright);
  head.rotateY(-.035*settle*Math.min(1,roll)-.16*coil);
  if(up){neck.rotateZ(Math.PI/2*.50*ease(.67,.96,t));model.updateMatrixWorld(true);const desired=new THREE.Quaternion().setFromAxisAngle(Z,-Math.PI/2*ease(.40,.98,t));desired.multiply(new THREE.Quaternion().setFromAxisAngle(X,.10*settle));head.quaternion.copy(neck.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(desired));}
  // 肩胛沿胸廓滑动，避免直接移动上臂根部拉开腋下。
  for(const s of ['l','r']){const b=bones.get('DEF_scapula_'+s);b.position.z-=.012*fore*upright;b.position.y-=.006*fore*upright;}
  update();
  const currentFloor=minimum(side?flankPoints:bellyPoints,mesh),contact=.008;
  // 只在胸腹确实接近地面时接管支撑，不把站姿整体突然吸到地上。
  const bodyContact=side?ease(.20,.40,t):ease(.45,.70,t);
  shiftWorld(pelvis,v(0,(contact-currentFloor)*(currentFloor<contact?1:bodyContact),0));
  const rotation=new THREE.Quaternion().setFromAxisAngle(Z,-Math.PI/2*roll);
  for(const c of chains){
   const front=c.id.startsWith('front'),upper=c.id.endsWith('l'),hip=c.nodes[0].getWorldPosition(v()),start=c.ankle.clone();
   const folding=front?fore:lower,restTarget=start.clone();
   // 趴地前爪向前伸，卧睡在胸下折腕；后爪随骨盆小步向内收。
   restTarget.z+=(front?(loaf?.045:.100):.040)*folding;
   if(stretch)restTarget.z+=(front?.120:-.100)*ease(.58,.95,t);
   if(pillow&&front)restTarget.z+=.12*fore;
   restTarget.x+=(c.id.endsWith('l')?-1:1)*(front?.008:.018)*folding;
   if(front&&loaf)restTarget.z=THREE.MathUtils.lerp(restTarget.z,hip.z+.015,tuck);
   if(curl){const direction=v(0,0,1).applyQuaternion(c.nodes[0].parent.getWorldQuaternion(new THREE.Quaternion())),offset=v(c.ankle.x-c.hip.x,0,front?.015:c.ankle.z-c.hip.z-.005).applyAxisAngle(v(0,1,0),Math.atan2(direction.x,direction.z));restTarget.x=THREE.MathUtils.lerp(restTarget.x,hip.x+offset.x,coil);restTarget.z=THREE.MathUtils.lerp(restTarget.z,hip.z+offset.z,coil);}
   const pawRotation=new THREE.Quaternion().setFromAxisAngle(X,front?2.55*tuck:0);
   const sideTarget=v(front?-.165:-.205,0,hip.z+(front?.205:up?.025:.170));
   if(upper)sideTarget.z-=.025;
   const target=restTarget.clone().lerp(sideTarget,Math.min(1,roll));
   pawRotation.premultiply(rotation);
   const sole=Math.min(...c.foot.map(point=>point.clone().applyQuaternion(pawRotation).y));
   const ground=catSupportHeight(target,id,t,pillowSurface);
   target.y=ground-sole+(side&&upper?.058*Math.min(1,roll):0);
   if(pillow&&front){const lead=.10*ease(.15,.35,t)*(1-ease(.55,.75,t));target.y=Math.max(target.y,lead-sole);}
   if(up){const local=c.hip.clone();local.x*=.30;local.y-=front?.11:.10;local.z+=front?.14:.13;local.sub(saved.get('DEF_pelvis').world).applyQuaternion(rotation).add(pelvis.getWorldPosition(v()));const release=ease(.05,.45,roll);target.lerp(local,release);if(!front)target.z+=.07*Math.sin(Math.PI*release);target.y=Math.max(target.y,ground-sole);}
   // 前腕依次收拢，短暂离地后落回胸下，避免贴地滑行。
   if(loaf&&front){const offset=c.id.endsWith('l')?0:.075;target.y+=.025*Math.sin(Math.PI*ease(.38+offset,.78+offset,t));}
   target.y=THREE.MathUtils.lerp(start.y+.003,target.y,ease(.02,.16,t));
   // 后腿分为股骨、胫骨和跗骨；跗部先向后折，脚掌继续贴住支撑面。
   const pawTarget=target.clone();
   if(c.hock){const restOffset=c.hockRest.clone().sub(c.ankle),length=restOffset.length(),bent=v(0,.018,-Math.sqrt(length*length-.018*.018)),meta=restOffset.lerp(bent,folding).normalize().multiplyScalar(length).applyQuaternion(rotation);if(curl){const heading=v(0,0,1).applyQuaternion(c.nodes[0].parent.getWorldQuaternion(new THREE.Quaternion()));meta.applyAxisAngle(v(0,1,0),Math.atan2(heading.x,heading.z));}target.add(meta);}
   const beforeReach=target.clone();
   // 在脚掌高度不变的前提下满足前两段肢骨的可达范围，避免裁剪把脚底压进地面。
   const dy=target.y-hip.y,horizontal=v(target.x-hip.x,0,target.z-hip.z),h=horizontal.length(),minReach=Math.abs(c.a-c.b)+.006,maxReach=c.a+c.b-.006,distanceToTarget=Math.hypot(h,dy);
   if(distanceToTarget<minReach||distanceToTarget>maxReach){const reach=THREE.MathUtils.clamp(distanceToTarget,minReach,maxReach),length=Math.sqrt(Math.max(.00001,reach*reach-dy*dy));if(h<.0001)horizontal.set(c.id.endsWith('l')?-1:1,0,front?.2:-.2);horizontal.normalize().multiplyScalar(length);target.x=hip.x+horizontal.x;target.z=hip.z+horizontal.z;}
   const hint=v();
   if(curl){const heading=v(0,0,1).applyQuaternion(c.nodes[0].parent.getWorldQuaternion(new THREE.Quaternion()));pawRotation.premultiply(new THREE.Quaternion().setFromAxisAngle(v(0,1,0),Math.atan2(heading.x,heading.z)));}
   // 前肘先向外侧屈曲，不能为了固定脚掌把肘关节解到地板下面。
   const direction=target.clone().sub(hip),distance=THREE.MathUtils.clamp(direction.length(),Math.abs(c.a-c.b)+.003,c.a+c.b-.003);direction.normalize();
   hint.copy(v(up?0:(c.id.endsWith('l')?-1:1)*Math.min(1,roll),-.20,front?-1:1).applyQuaternion(rotation));if(up)hint.lerp(v((c.id.endsWith('l')?-1:1)*1.2,2,front?-1:1),ease(.20,.55,t));
   if(curl){const heading=v(0,0,1).applyQuaternion(c.nodes[0].parent.getWorldQuaternion(new THREE.Quaternion()));hint.applyAxisAngle(v(0,1,0),Math.atan2(heading.x,heading.z));}
   const along=(c.a*c.a-c.b*c.b+distance*distance)/(2*distance),radius=Math.sqrt(Math.max(.000001,c.a*c.a-along*along));
   hint.addScaledVector(direction,-hint.dot(direction)).normalize();
   const restDirection=(c.hockRest??c.ankle).clone().sub(c.hip).normalize(),restPole=c.knee.clone().sub(c.hip);restPole.addScaledVector(restDirection,-restPole.dot(restDirection)).applyQuaternion(rotation).normalize();
   if(curl){const heading=v(0,0,1).applyQuaternion(c.nodes[0].parent.getWorldQuaternion(new THREE.Quaternion()));restPole.applyAxisAngle(v(0,1,0),Math.atan2(heading.x,heading.z));}
   restPole.addScaledVector(direction,-restPole.dot(direction)).normalize();hint.copy(restPole.clone().applyQuaternion(new THREE.Quaternion().slerp(new THREE.Quaternion().setFromUnitVectors(restPole,hint),ease(.02,.35,t))));
   const minimumKnee=THREE.MathUtils.lerp(front?.063:.070,.040,Math.min(1,roll)),baseHeight=hip.y+direction.y*along;
   if(!curl&&!up&&baseHeight+radius*hint.y<minimumKnee){
    const vertical=v(0,1,0).addScaledVector(direction,-direction.y).normalize(),across=direction.clone().cross(vertical).normalize();
    const cosine=THREE.MathUtils.clamp((minimumKnee-baseHeight)/Math.max(.00001,radius*vertical.y),-1,1);
    const outward=v(c.id.endsWith('l')?-1:1,0,0).applyQuaternion(c.nodes[0].parent.getWorldQuaternion(new THREE.Quaternion())),sign=Math.sign(outward.dot(across))||(c.id.endsWith('l')?-1:1);
    const safe=vertical.multiplyScalar(cosine).addScaledVector(across,sign*Math.sqrt(1-cosine*cosine));
    const blend=up?1:(1-ease(.80,1.00,Math.min(1,roll)))*ease(0,.025,minimumKnee-baseHeight-radius*hint.y);
    hint.applyQuaternion(new THREE.Quaternion().slerp(new THREE.Quaternion().setFromUnitVectors(hint,safe),blend)).normalize();
   }
   pawTarget.add(target.clone().sub(beforeReach));solve(c,target,hint,pawRotation,pawTarget,up);
  }
  if(up){update();const floor=minimum(flankPoints,mesh);if(floor<.003)shiftWorld(pelvis,v(0,.003-floor,0));}
  // 身体侧转时头保持在同一颈椎链上，最后才将脸颊放下。
  update();const headCenter=head.getWorldPosition(v());
  for(const[earSide,sign]of[['l',-1],['r',1]]){const ear=bones.get('DEF_ear_'+earSide);if(!ear)continue;const low=1-ease(-.025,.025,ear.getWorldPosition(v()).y-headCenter.y),fold=['side','belly'].includes(id)?1.15*low*ease(.35,.80,t):.08*settle;ear.rotateOnAxis(v(...(ear.userData.earAxis??[0,0,1])).normalize(),sign*fold);}
  update();let skullFloor=Infinity;const pawSurface=side?null:forepaws.sample();for(const [surface,i]of skullPoints){surface.getVertexPosition(i,p);const support=Math.max(catSupportHeight(p,id,t,pillowSurface),pawSurface?catForepawHeight(pawSurface,p)+.003:-Infinity);skullFloor=Math.min(skullFloor,p.y-support);}
  shiftWorld(neck,v(0,Math.max(0,-skullFloor)-Math.min(.065,Math.max(0,skullFloor))*settle,0));
  for(let i=1;i<=4;i++)bones.get('DEF_tail_0'+i).rotateY((curl?.50:.025)*settle);
  if(wall){update();let max=-Infinity;for(let i=0;i<mesh.geometry.attributes.position.count;i++)max=Math.max(max,mesh.getVertexPosition(i,p).x);shiftWorld(pelvis,v((.205-max)*settle,0,0));}
  update();
  return{fold:lower,roll,relax:settle,phase:t<.2?'后肢承重':t<(side?.44:.65)?'前肘屈曲、胸腹降低':side&&t<.86?'侧腹接地、放下头部':loaf&&t<.85?'依次收腕':'放松'};
 };
}
