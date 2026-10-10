import * as THREE from "three";

// 四拍猫步：支撑脚固定在世界地面，摆动脚抬起后落地；关节由双骨 IK 求解。
export function createHousePet(model, spec, { root, canvas, camera, reducedMotion }) {
  const bones = new Map();
  model.traverse(node => {
    if (node.isBone) bones.set(node.name, { node, quaternion: node.quaternion.clone(), position: node.position.clone() });
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
  let crouch = 0, attention = false, attentionHold = 0, neckYaw = 0, resumeRest = false;
  const naturalRest = !!spec.pet.restPoses;
  let sideHeight=.165;
  if(naturalRest)model.traverse(node=>{if(node.isSkinnedMesh&&!node.userData.petFur){const pos=node.geometry.attributes.position;for(let i=0;i<pos.count;i++)if(pos.getY(i)>.22&&pos.getY(i)<.55&&Math.abs(pos.getZ(i))<.2)sideHeight=Math.max(sideHeight,-pos.getX(i)+.004);}});
  let sit = 0, sideLie = 0, requestedRest = null, savedRest = "idle";
  const up = new THREE.Vector3(0,1,0), yAxis = new THREE.Vector3(0,1,0);
  const originY = spec.position[1];
  const ease = t => t*t*(3-2*t);
  const curvePoint = d => curve.getPointAt(((d % length) + length) % length / length);
  const curveYaw = d => { const t=curve.getTangentAt(((d % length)+length)%length/length); return Math.atan2(t.x,t.z); };
  let yaw = spec.rotation;
  const head = bones.get("pet_head");
  const faceYaw=spec.pet.faceForward?Math.atan2(spec.pet.faceForward[0],spec.pet.faceForward[2]):0;
  const forwardInHead = new THREE.Vector3().fromArray(spec.pet.faceForward??[0,0,1]).applyQuaternion(modelQuaternion)
    .applyQuaternion(head.node.getWorldQuaternion(new THREE.Quaternion()).invert());
  const faceCenterInHead=spec.pet.faceCenter?new THREE.Vector3().fromArray(spec.pet.faceCenter).applyMatrix4(model.matrixWorld).applyMatrix4(head.node.matrixWorld.clone().invert()):null;
  const angleTo = (from,to) => Math.atan2(Math.sin(to-from),Math.cos(to-from));
  const approach = (value,target,step) => value + Math.max(-step,Math.min(step,target-value));
  const cameraYaw = () => {const p=faceCenterInHead?faceCenterInHead.clone().applyMatrix4(head.node.matrixWorld):worldPosition(head.node);return Math.atan2(camera.position.x-p.x,camera.position.z-p.z);};
  const greetingDuration = 4;
  let greetingTime = 0;
  const greeting = document.createElement("div");
  greeting.className = "pet-greeting";
  greeting.setAttribute("role", "status");
  greeting.setAttribute("aria-live", "polite");
  greeting.hidden = true;
  root.append(greeting);

  function showGreeting(active = !paused) {
    const point = new THREE.Vector3(0, 1.02, .2).applyMatrix4(model.matrixWorld).project(camera);
    const rect = canvas.getBoundingClientRect(), origin = root.getBoundingClientRect();
    greeting.hidden = !active || greetingTime <= 0 || point.z < -1 || point.z > 1;
    greeting.style.left = `${THREE.MathUtils.clamp(rect.left-origin.left+(point.x*.5+.5)*rect.width, 40, rect.width-40)}px`;
    greeting.style.top = `${THREE.MathUtils.clamp(rect.top-origin.top+(-point.y*.5+.5)*rect.height, 45, rect.height-45)}px`;
  }

  function resetBones() { for (const {node,quaternion,position} of bones.values()) {node.quaternion.copy(quaternion);node.position.copy(position);} }
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
  function idle(next="idle") { state=next;elapsed=0;duration=next==="curious"?Infinity:next==="lie"?7+(walkNumber%3):4.5+(walkNumber%3)*.7; }
  function beginSteps(next) {
    state=next;elapsed=0;duration=next==="walk"?5.5+(walkNumber%4)*1.1:Infinity;
    for(const leg of legs){leg.settled=false;leg.waitForStance=((gaitTime/cycle+leg.offset)%1+1)%1>=stance;}
  }
  function react() {
    reactions++;greetingTime=greetingDuration;attention=true;attentionHold=0;
    resumeRest=crouch>.5;
    if(naturalRest){savedRest=requestedRest??(sideLie>.1?"lie":sit>.1?"sit":"idle");requestedRest=null;resumeRest=false;}
    greeting.textContent="喵～";showGreeting();
    if(state==="walk"||state==="turn")settle("curious");else if(state==="settling")afterSettle="curious";else idle("curious");publish();
  }
  function snapshot() {
    return { state:paused?"paused":state,position:model.position.toArray().map(n=>+n.toFixed(5)),yaw:+yaw.toFixed(5),
      steps:legs.reduce((n,l)=>n+l.contacts,0),reactions,reducedMotion,bones:bones.size,crouch:+crouch.toFixed(4),
      facingCamera:+Math.cos(angleTo(Math.atan2(forwardInHead.clone().applyQuaternion(head.node.getWorldQuaternion(new THREE.Quaternion())).x,forwardInHead.clone().applyQuaternion(head.node.getWorldQuaternion(new THREE.Quaternion())).z),cameraYaw())).toFixed(5),
      sit:+sit.toFixed(4),sideLie:+sideLie.toFixed(4),head:bones.get("pet_head")?.node.quaternion.toArray(),tail:bones.get("pet_tail_tip")?.node.quaternion.toArray(),
      feet:legs.map(l=>({name:l.name,swing:l.swing,phase:+l.phase.toFixed(4),contacts:l.contacts,
        target:l.target.toArray(),actual:worldPosition(l.paw).toArray()})) };
  }
  function publish() {
    const data=snapshot();root.dataset.petState=data.state;root.dataset.petPosition=JSON.stringify(data.position);
    root.dataset.petPose=JSON.stringify({head:data.head,tail:data.tail,yaw:data.yaw,crouch:data.crouch,sit:data.sit,sideLie:data.sideLie,facingCamera:data.facingCamera});
    root.dataset.petFeet=JSON.stringify(data.feet);root.dataset.petSteps=String(data.steps);
    root.dataset.petReactions=String(reactions);root.dataset.petBones=String(bones.size);
    root.dataset.petFacing=String(attention&&data.sit<.02&&data.sideLie<.02&&data.facingCamera>.995);
    const point=worldPosition(head.node).add(new THREE.Vector3(0,.12,0)).project(camera);
    const rect=canvas.getBoundingClientRect();root.dataset.petScreen=JSON.stringify([rect.left+(point.x*.5+.5)*rect.width,rect.top+(-point.y*.5+.5)*rect.height]);
  }
  function update(dt,active) {
    paused=!active;
    if(active) {
      greetingTime=Math.max(0,greetingTime-dt);
      clock+=dt;if(!reducedMotion||attention)elapsed+=dt;
      if(elapsed>=duration&&requestedRest===null) {
        if(state==="idle"&&!reducedMotion) {walkNumber++;beginSteps("turn");}
        else if(state==="walk")settle(naturalRest?(walkNumber%2===0?"lie":"sit"):(walkNumber%2===0?"lie":"idle"));
        else if(state==="lie"||state==="sit")idle();
      }
      // 正脸看镜头：小角度只转颈部；背向镜头时先起身，用四足踏步调整身体。
      const desiredYaw=attention?cameraYaw()-faceYaw:curveYaw(distance);
      const gap=angleTo(yaw,desiredYaw);
      const needsTurn=Math.abs(gap)>(attention?.26:.035);
      if(state==="curious"&&needsTurn&&crouch<.02&&sit<.02&&sideLie<.02)beginSteps("turn");
      const standing=!naturalRest||(sit<.001&&sideLie<.001);
      const turning=state==="turn"&&standing;
      if(turning) {
        yaw+=THREE.MathUtils.clamp(gap,-.44*dt,.44*dt);
        model.rotation.y=yaw;
        if(Math.abs(angleTo(yaw,desiredYaw))<.035)settle(attention?"curious":"walk");
      }
      const walking=state==="walk"&&standing, stepping=standing&&(walking||state==="settling"||state==="turn");
      // 起步和收步渐变速度，躯干不跳跃；脚印系统仍独立保持接地。
      const angle=curveYaw(distance+.025)-curveYaw(distance);
      const curvature=Math.abs(Math.atan2(Math.sin(angle),Math.cos(angle)))/.025;
      const velocity=walking?Math.min(speed,.28/Math.max(.01,curvature))*ease(Math.min(1,elapsed/1.1))*ease(Math.min(1,(duration-elapsed)/1.1)):0;
      if(walking) {
        distance+=velocity*dt;model.position.copy(curvePoint(distance));yaw=curveYaw(distance);model.rotation.y=yaw;
      }
      const motion=reducedMotion?(state==="curious"?.6:0):1;
      const lieTarget=!naturalRest&&(state==="lie"||(attention&&resumeRest&&!needsTurn))?1:0;
      crouch=approach(crouch,lieTarget,dt/1.4);
      model.position.y=originY-.125*ease(crouch)+.0015*Math.sin(clock*1.5)*motion;
      resetBones();
      if(naturalRest){
        const resting=state!=="settling"&&state!=="walk"&&state!=="turn";
        sit=approach(sit,!attention&&resting&&sideLie<.001&&(requestedRest??state)==="sit"?1:0,dt/1.9);
        sideLie=approach(sideLie,!attention&&resting&&sit<.001&&(requestedRest??state)==="lie"?1:0,dt/2.3);
        const sitting=ease(sit),lying=ease(sideLie),roll=lying*Math.PI*.5;
        model.quaternion.setFromAxisAngle(up,yaw).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),roll));
        const centerShift=.32*Math.sin(roll),seatForward=.30*sitting;
        // 侧躺围绕身体中心翻转，避免根节点在脚底造成大幅横移。
        const ground=curvePoint(distance);model.position.x=ground.x+centerShift*Math.cos(yaw)+seatForward*Math.sin(yaw);model.position.z=ground.z-centerShift*Math.sin(yaw)+seatForward*Math.cos(yaw);
        model.position.y=originY-.025*sitting+(sideHeight+.008)*Math.sin(roll);
        model.updateMatrixWorld(true);
        const chest=bones.get("pet_chest")?.node;
        const rootBone=bones.get('pet_root')?.node;
        if(chest&&rootBone){
          const chestWorld=worldPosition(chest).add(new THREE.Vector3(-seatForward*Math.sin(yaw),.025*sitting,-seatForward*Math.cos(yaw)));
          const chestRotation=chest.getWorldQuaternion(new THREE.Quaternion());
          const parent=rootBone.parent.getWorldQuaternion(new THREE.Quaternion());
          const axis=new THREE.Vector3(1,0,0).applyAxisAngle(up,yaw);
          const tilt=new THREE.Quaternion().setFromAxisAngle(axis,-.55*sitting);
          rootBone.quaternion.copy(parent.clone().invert().multiply(tilt).multiply(parent).multiply(rootBone.quaternion));
          model.updateMatrixWorld(true);
          chest.position.copy(chestWorld.applyMatrix4(chest.parent.matrixWorld.clone().invert()));
          chest.quaternion.copy(chest.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(chestRotation));
          model.updateMatrixWorld(true);
        }
        const haunch=bones.get('pet_haunch')?.node;
        if(haunch)haunch.position.add(up.clone().multiplyScalar(-.02*sitting).applyQuaternion(haunch.parent.getWorldQuaternion(new THREE.Quaternion()).invert()));
      }
      // 点击即回应，头尾动作不等待四足收步，脚掌仍由原有 IK 保持接地。
      const greet=greetingTime>0?ease(Math.min(1,(greetingDuration-greetingTime)/.2))*ease(Math.min(1,greetingTime/.65)):0;
      neckYaw=approach(neckYaw,attention?THREE.MathUtils.clamp(angleTo(yaw+faceYaw,cameraYaw()),-.28,.28):.025*Math.sin(clock*.65)*motion,dt*1.2);
      // 在世界竖直轴上转头，避免把头骨自身纵轴误当成水平转向轴。
      model.updateMatrixWorld(true);
      const parentQuaternion=head.node.parent.getWorldQuaternion(new THREE.Quaternion());
      const turn=new THREE.Quaternion().setFromAxisAngle(up,neckYaw);
      head.node.quaternion.copy(parentQuaternion.clone().invert().multiply(turn).multiply(parentQuaternion).multiply(head.quaternion));
      if(!attention)head.node.rotateZ(.025*Math.sin(clock*.9)*motion);
      if(naturalRest&&sideLie>0){
        const axis=new THREE.Vector3(0,0,1).applyAxisAngle(up,yaw),parent=head.node.parent.getWorldQuaternion(new THREE.Quaternion());
        const lift=new THREE.Quaternion().setFromAxisAngle(axis,-.25*ease(sideLie)*Math.PI*.5);
        head.node.quaternion.copy(parent.clone().invert().multiply(lift).multiply(parent).multiply(head.node.quaternion));
      }
      pose("pet_tail",0,.055*Math.sin(clock*1.5)*motion+.2*Math.sin(clock*5)*greet,.035*Math.sin(clock*.8)*motion);
      pose("pet_tail_tip",0,.09*Math.sin(clock*1.5-.7)*motion+.28*Math.sin(clock*5-.6)*greet,.055*Math.sin(clock*.8-.6)*motion);
      model.updateMatrixWorld(true);
      if(naturalRest&&sit>0){
        const amount=ease(sit),axis=new THREE.Vector3(1,0,0).applyAxisAngle(up,yaw);
        for(const [name,pitch,twist] of [["pet_tail",1.15,-.5],["pet_tail_tip",.25,.6]]){
          const joint=bones.get(name),parent=joint.node.parent.getWorldQuaternion(new THREE.Quaternion());
          const rotation=new THREE.Quaternion().setFromAxisAngle(up,twist*amount).multiply(new THREE.Quaternion().setFromAxisAngle(axis,pitch*amount));
          joint.node.quaternion.copy(parent.clone().invert().multiply(rotation).multiply(parent).multiply(joint.node.quaternion));joint.node.updateWorldMatrix(false,true);
        }
      }
      if(stepping)gaitTime+=dt;
      for(const leg of legs) {
        if(naturalRest&&sideLie>.001){
          // 侧卧前爪伸到身体前侧，上侧腿放低，避免四爪僵直悬空。
          const amount=ease(sideLie);
          const parent=leg.upper.parent.getWorldQuaternion(new THREE.Quaternion());
          const axis=new THREE.Vector3(0,0,1).applyAxisAngle(up,yaw);
          const relax=new THREE.Quaternion().setFromAxisAngle(axis,-.5*amount*(leg.rest.x>0?1:.025));
          leg.upper.quaternion.copy(parent.clone().invert().multiply(relax).multiply(parent).multiply(leg.upper.quaternion));
          leg.lower.rotateX((leg.name.startsWith('front')?.12:-.12)*amount);
          leg.swing=false;
          leg.anchor.copy(leg.rest).applyAxisAngle(up,yaw).add(curvePoint(distance));
          leg.target.copy(leg.anchor);leg.anchorQuaternion.setFromAxisAngle(up,yaw).multiply(leg.pawQuaternion);leg.targetQuaternion.copy(leg.anchorQuaternion);
          continue;
        }
        const phase=((gaitTime/cycle+leg.offset)%1+1)%1;
        if(phase<stance)leg.waitForStance=false;
        const swing=stepping&&!leg.settled&&!leg.waitForStance&&phase>=stance;leg.phase=phase;
        if(swing&&!leg.swing) {
          leg.start.copy(leg.anchor);leg.startQuaternion.copy(leg.anchorQuaternion);
          leg.landing.copy(walking?landingFor(leg,velocity):leg.rest.clone().applyAxisAngle(up,yaw+(turning?THREE.MathUtils.clamp(angleTo(yaw,desiredYaw),-.22,.22):0)).add(naturalRest&&!turning?curvePoint(distance):model.position));
          leg.landing.y=originY+leg.rest.y;leg.landingIsRest=!walking&&!turning;
          leg.landingQuaternion.setFromAxisAngle(up,walking?curveYaw(distance+velocity*cycle*((1-stance)+stance*.5)):yaw+(turning?THREE.MathUtils.clamp(angleTo(yaw,desiredYaw),-.22,.22):0)).multiply(leg.pawQuaternion);
        }
        if(!swing&&leg.swing) {leg.anchor.copy(leg.landing);leg.anchorQuaternion.copy(leg.landingQuaternion);leg.contacts++;if(leg.landingIsRest)leg.settled=true;}
        if(swing) {
          const t=(phase-stance)/(1-stance);leg.target.lerpVectors(leg.start,leg.landing,ease(t));
          leg.target.y+=.032*Math.sin(Math.PI*t);leg.targetQuaternion.slerpQuaternions(leg.startQuaternion,leg.landingQuaternion,ease(t));
        } else {leg.target.copy(leg.anchor);leg.targetQuaternion.copy(leg.anchorQuaternion);}
        // 趴下时保持脚掌贴地，前爪向前摆，后爪收在腹部两侧。
        if(crouch>0&&!stepping){
          const rest=leg.rest.clone();
          if(leg.name.startsWith("front"))rest.z+=.08*ease(crouch);
          else {rest.x+=Math.sign(rest.x)*.02*ease(crouch);rest.z-=.025*ease(crouch);}
          leg.target.copy(rest.applyAxisAngle(up,yaw).add(model.position));leg.target.y=originY+leg.rest.y;
          leg.anchor.copy(leg.target);
        }
        if(naturalRest&&sit>0&&!stepping){
          const rest=leg.rest.clone();
          if(leg.name.startsWith("back")){rest.z+=.35*ease(sit);rest.x+=Math.sign(rest.x)*.025*ease(sit);}
          leg.target.copy(rest.applyAxisAngle(up,yaw).add(curvePoint(distance)));leg.target.y=originY+leg.rest.y;leg.anchor.copy(leg.target);
        }
        leg.swing=swing;solve(leg);
      }
      model.updateMatrixWorld(true);
      if(state==="settling"&&legs.every(l=>l.settled)){
        if(afterSettle==="walk")beginSteps("walk");else idle(afterSettle);
      }
      if(attention&&state==="curious"&&!needsTurn&&sit<.02&&sideLie<.02&&Math.abs(angleTo(neckYaw,angleTo(yaw+faceYaw,cameraYaw())))<.025){
        attentionHold+=dt;
        if(attentionHold>4.5){attention=false;if(naturalRest)idle(savedRest);else idle(resumeRest?"lie":"idle");}
      }
    }
    showGreeting(active);
    publishTime+=dt;if(publishTime>.1){publishTime=0;publish();}
  }
  // 初始朝向与路线起点一致，脚掌随整体摆放一次，之后不随躯干漂移。
  model.rotation.y=yaw=curveYaw(0);model.updateMatrixWorld(true);
  for(const leg of legs){leg.anchor.copy(leg.rest).applyMatrix4(model.matrixWorld);leg.target.copy(leg.anchor);leg.anchorQuaternion.copy(model.getWorldQuaternion(new THREE.Quaternion()).multiply(leg.pawQuaternion));leg.targetQuaternion.copy(leg.anchorQuaternion);}
  function setRestPose(next){
    if(!naturalRest||!["idle","sit","lie","walk"].includes(next))return;
    attention=false;requestedRest=next==="walk"?null:next;
    if(next==="walk"){walkNumber++;beginSteps("turn");}else settle(next);
  }
  publish();return {update,react,snapshot,setRestPose};
}
