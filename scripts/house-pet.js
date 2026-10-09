import * as THREE from "three";

// 四拍猫步：支撑脚固定在世界地面，摆动脚抬起后落地；关节由双骨 IK 求解。
export function createHousePet(model, spec, { root, canvas, camera, reducedMotion }) {
  const bones = new Map();
  model.traverse(node => {
    if (node.isBone) bones.set(node.name, { node, quaternion: node.quaternion.clone() });
    if (node.isSkinnedMesh) node.frustumCulled = false;
    node.userData.petId = spec.id;
  });
  model.updateMatrixWorld(true);
  const inverseModel = model.matrixWorld.clone().invert();
  const modelQuaternion = model.getWorldQuaternion(new THREE.Quaternion());
  const legNames = ["back_r", "front_r", "back_l", "front_l"];
  const worldPosition = bone => bone.getWorldPosition(new THREE.Vector3());
  const legs = legNames.map((name, index) => {
    const upper = bones.get(`pet_${name}_upper`)?.node;
    const lower = bones.get(`pet_${name}_lower`)?.node;
    const paw = bones.get(`pet_${name}_paw`)?.node;
    if (!upper || !lower || !paw) throw new Error(`暹罗猫缺少四足骨骼：${name}`);
    const hip = worldPosition(upper), knee = worldPosition(lower), ankle = worldPosition(paw);
    const rest = ankle.clone().applyMatrix4(inverseModel);
    const pole = knee.clone().sub(hip.clone().lerp(ankle, .5)).transformDirection(inverseModel);
    return { name, offset: -index * .25, upper, lower, paw, rest, pole,
      a: hip.distanceTo(knee), b: knee.distanceTo(ankle),
      pawQuaternion: modelQuaternion.clone().invert().multiply(paw.getWorldQuaternion(new THREE.Quaternion())),
      anchorQuaternion: paw.getWorldQuaternion(new THREE.Quaternion()), targetQuaternion: paw.getWorldQuaternion(new THREE.Quaternion()), landingQuaternion: paw.getWorldQuaternion(new THREE.Quaternion()), startQuaternion: paw.getWorldQuaternion(new THREE.Quaternion()),
      anchor: ankle.clone(), target: ankle.clone(), start: ankle.clone(), landing: ankle.clone(),
      swing: false, phase: 0, contacts: 0 };
  });
  const curve = new THREE.CatmullRomCurve3([model.position.clone(), ...spec.pet.route.map(([x,z]) => new THREE.Vector3(x,spec.position[1],z))], true, "centripetal");
  const length = curve.getLength();
  const cycle = .94, stance = .66, speed = .13;
  let distance = 0, state = "idle", elapsed = 0, clock = 0, gaitTime = 0;
  let walkNumber = 0, duration = 4.5, publishTime = 0, reactions = 0, paused = false, afterSettle = "idle";
  const up = new THREE.Vector3(0,1,0), yAxis = new THREE.Vector3(0,1,0);
  const originY = spec.position[1];
  const ease = t => t*t*(3-2*t);
  const curvePoint = d => curve.getPointAt(((d % length) + length) % length / length);
  const curveYaw = d => { const t=curve.getTangentAt(((d % length)+length)%length/length); return Math.atan2(t.x,t.z); };
  let yaw = spec.rotation;

  function resetBones() { for (const {node,quaternion} of bones.values()) node.quaternion.copy(quaternion); }
  function pose(name,x=0,y=0,z=0) {
    const bone=bones.get(name);if(!bone)return;
    // 面部整体随头骨转动，限制颈关节角度，避免大幅转头拉扯胸毛。
    if(name==="pet_head"){x=THREE.MathUtils.clamp(x,-.07,.07);y=THREE.MathUtils.clamp(y,-.36,.36);z=THREE.MathUtils.clamp(z,-.19,.19); }
    bone.node.rotateX(x);bone.node.rotateY(y);bone.node.rotateZ(z);
  }
  function aim(bone,target) {
    const current=bone.getWorldQuaternion(new THREE.Quaternion());
    const direction=target.clone().sub(worldPosition(bone)).normalize();
    const delta=new THREE.Quaternion().setFromUnitVectors(yAxis.clone().applyQuaternion(current),direction);
    const parent=bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert();
    bone.quaternion.copy(parent.multiply(delta.multiply(current)));bone.updateWorldMatrix(false,true);
  }
  function solve(leg) {
    const hip=worldPosition(leg.upper), axis=leg.target.clone().sub(hip);
    const requested=axis.length();axis.normalize();
    const d=Math.max(Math.abs(leg.a-leg.b)+.00001,Math.min(leg.a+leg.b-.00001,requested));
    const pole=leg.pole.clone().applyQuaternion(model.getWorldQuaternion(new THREE.Quaternion()));
    pole.addScaledVector(axis,-pole.dot(axis)).normalize();
    const cos=THREE.MathUtils.clamp((leg.a*leg.a+d*d-leg.b*leg.b)/(2*leg.a*d),-1,1);
    const knee=hip.clone().addScaledVector(axis,leg.a*cos).addScaledVector(pole,leg.a*Math.sqrt(1-cos*cos));
    aim(leg.upper,knee);aim(leg.lower,hip.clone().addScaledVector(axis,d));
    const desired=leg.targetQuaternion;
    leg.paw.quaternion.copy(leg.paw.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(desired));
    leg.paw.updateWorldMatrix(false,true);
  }
  function landingFor(leg,travelSpeed) {
    // 落点预估到下一支撑期中点，留出前后伸展距离；转弯时沿曲线预测脚印。
    const ahead=distance+travelSpeed*cycle*((1-stance)+stance*.5);
    return leg.rest.clone().applyAxisAngle(up,curveYaw(ahead)).add(curvePoint(ahead));
  }
  function settle(next="idle") { state="settling";elapsed=0;duration=Infinity;afterSettle=next;for(const leg of legs){leg.settled=false;leg.landingIsRest=false;} }
  function idle(next="idle") { state=next;elapsed=0;duration=next==="curious"?3.2:4.5+(walkNumber%3)*.7; }
  function react() { reactions++;if(state==="walk")settle("curious");else if(state==="settling")afterSettle="curious";else idle("curious");publish(); }
  function snapshot() {
    return { state:paused?"paused":state,position:model.position.toArray().map(n=>+n.toFixed(5)),yaw:+yaw.toFixed(5),
      steps:legs.reduce((n,l)=>n+l.contacts,0),reactions,reducedMotion,bones:bones.size,
      head:bones.get("pet_head")?.node.quaternion.toArray(),tail:bones.get("pet_tail_tip")?.node.quaternion.toArray(),
      feet:legs.map(l=>({name:l.name,swing:l.swing,phase:+l.phase.toFixed(4),contacts:l.contacts,
        target:l.target.toArray(),actual:worldPosition(l.paw).toArray()})) };
  }
  function publish() {
    const data=snapshot();root.dataset.petState=data.state;root.dataset.petPosition=JSON.stringify(data.position);
    root.dataset.petPose=JSON.stringify({head:data.head,tail:data.tail,yaw:data.yaw});
    root.dataset.petFeet=JSON.stringify(data.feet);root.dataset.petSteps=String(data.steps);
    root.dataset.petReactions=String(reactions);root.dataset.petBones=String(bones.size);
    const point=new THREE.Vector3(0,.48,.23).applyMatrix4(model.matrixWorld).project(camera);
    const rect=canvas.getBoundingClientRect();root.dataset.petScreen=JSON.stringify([rect.left+(point.x*.5+.5)*rect.width,rect.top+(-point.y*.5+.5)*rect.height]);
  }
  function update(dt,active) {
    paused=!active;
    if(active) {
      clock+=dt;if(!reducedMotion||state==="curious")elapsed+=dt;
      if(elapsed>=duration) {
        if(state==="idle"&&!reducedMotion) {state="walk";elapsed=0;duration=6;walkNumber++;for(const leg of legs){leg.settled=false;leg.waitForStance=((gaitTime/cycle+leg.offset)%1+1)%1>=stance;}}
        else if(state==="walk")settle();else if(state==="settling")idle(afterSettle);else idle();
      }
      const walking=state==="walk", stepping=walking||state==="settling";
      // 起步和收步渐变速度，躯干不跳跃；脚印系统仍独立保持接地。
      const angle=curveYaw(distance+.025)-curveYaw(distance);
      const curvature=Math.abs(Math.atan2(Math.sin(angle),Math.cos(angle)))/.025;
      const velocity=walking?Math.min(speed,.28/Math.max(.01,curvature))*ease(Math.min(1,elapsed/1.1))*ease(Math.min(1,(duration-elapsed)/1.1)):0;
      if(walking) {
        distance+=velocity*dt;model.position.copy(curvePoint(distance));yaw=curveYaw(distance);model.rotation.y=yaw;
      }
      const motion=reducedMotion?(state==="curious"?.6:0):1;
      model.position.y=originY+.0015*Math.sin(clock*1.5)*motion;
      resetBones();
      const greet=state==="curious"?Math.sin(Math.PI*Math.min(1,elapsed/duration)):0;
      pose("pet_head",.018*Math.sin(clock*1.2)*motion,.045*Math.sin(clock*.65)*motion,.035*Math.sin(clock*.9)*motion+.13*greet);
      pose("pet_tail",0,.055*Math.sin(clock*1.5)*motion,.035*Math.sin(clock*.8)*motion);
      pose("pet_tail_tip",0,.09*Math.sin(clock*1.5-.7)*motion,.055*Math.sin(clock*.8-.6)*motion);
      model.updateMatrixWorld(true);
      if(stepping)gaitTime+=dt;
      for(const leg of legs) {
        const phase=((gaitTime/cycle+leg.offset)%1+1)%1;
        if(phase<stance)leg.waitForStance=false;
        const swing=stepping&&!leg.settled&&!leg.waitForStance&&phase>=stance;leg.phase=phase;
        if(swing&&!leg.swing) {
          leg.start.copy(leg.anchor);leg.startQuaternion.copy(leg.anchorQuaternion);
          leg.landing.copy(walking?landingFor(leg,velocity):leg.rest.clone().applyMatrix4(model.matrixWorld));
          leg.landing.y=originY+leg.rest.y;leg.landingIsRest=!walking;
          leg.landingQuaternion.setFromAxisAngle(up,walking?curveYaw(distance+velocity*cycle*((1-stance)+stance*.5)):yaw).multiply(leg.pawQuaternion);
        }
        if(!swing&&leg.swing) {leg.anchor.copy(leg.landing);leg.anchorQuaternion.copy(leg.landingQuaternion);leg.contacts++;if(leg.landingIsRest)leg.settled=true;}
        if(swing) {
          const t=(phase-stance)/(1-stance);leg.target.lerpVectors(leg.start,leg.landing,ease(t));
          leg.target.y+=.032*Math.sin(Math.PI*t);leg.targetQuaternion.slerpQuaternions(leg.startQuaternion,leg.landingQuaternion,ease(t));
        } else {leg.target.copy(leg.anchor);leg.targetQuaternion.copy(leg.anchorQuaternion);}
        leg.swing=swing;solve(leg);
      }
      model.updateMatrixWorld(true);
      if(state==="settling"&&legs.every(l=>l.settled))idle(afterSettle);
    }
    publishTime+=dt;if(publishTime>.1){publishTime=0;publish();}
  }
  // 初始朝向与路线起点一致，脚掌随整体摆放一次，之后不随躯干漂移。
  model.rotation.y=yaw=curveYaw(0);model.updateMatrixWorld(true);
  for(const leg of legs){leg.anchor.copy(leg.rest).applyMatrix4(model.matrixWorld);leg.target.copy(leg.anchor);leg.anchorQuaternion.copy(model.getWorldQuaternion(new THREE.Quaternion()).multiply(leg.pawQuaternion));leg.targetQuaternion.copy(leg.anchorQuaternion);}
  publish();return {update,react,snapshot};
}
