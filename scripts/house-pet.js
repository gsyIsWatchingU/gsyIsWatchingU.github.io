import * as THREE from "three";
import {felineSitPoint} from './house-pet-sit-v2.js';
import {seatedTrunk} from './house-pet-anatomy.js';

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
  const sittingBind=new Map();model.traverse(node=>{if(node.isBone)sittingBind.set(node.name,node.getWorldPosition(new THREE.Vector3()).applyMatrix4(model.matrixWorld.clone().invert()));});
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
  const cycle = spec.pet.gaitCycle??.94, stance = .66, speed = spec.pet.walkSpeed??.13;
  let distance = 0, state = "idle", elapsed = 0, clock = 0, gaitTime = 0;
  let walkNumber = 0, duration = 4.5, publishTime = 0, reactions = 0, paused = false, afterSettle = "idle";
  let crouch = 0, attention = false, attentionHold = 0, neckYaw = 0, resumeRest = false;
  let tailLift=0,companionTarget=null,interactionRemaining=0,interactionRest=null;
  const unit=spec.pet.bodyScale??1;
  const naturalRest = !!spec.pet.restPoses;
  let sideHeight=.165*unit;
  if(naturalRest)model.traverse(node=>{if(node.isSkinnedMesh&&!node.userData.petFur){const pos=node.geometry.attributes.position;for(let i=0;i<pos.count;i++)if(pos.getY(i)>.22&&pos.getY(i)<.55&&Math.abs(pos.getZ(i))<.2)sideHeight=Math.max(sideHeight,-pos.getX(i)+.004);}});
  let sit = 0, sideLie = 0, requestedRest = null, savedRest = "idle";
  const sitShapes=[];model.traverse(node=>{if(node.isMesh&&node.morphTargetDictionary?.sit_100!==undefined)sitShapes.push(node);});
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
  const cameraYaw = () => {const p=faceCenterInHead?faceCenterInHead.clone().applyMatrix4(head.node.matrixWorld):worldPosition(head.node),target=companionTarget??camera.position;return Math.atan2(target.x-p.x,target.z-p.z);};
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
    const a=leg.a*(leg.stretch??1),b=leg.b*(leg.stretch??1);
    const d=Math.max(Math.abs(a-b)+.00001,Math.min(a+b-.00001,requested));
    const pole=leg.pole.clone().applyQuaternion(model.getWorldQuaternion(new THREE.Quaternion()));
    pole.addScaledVector(axis,-pole.dot(axis)).normalize();
    const cos=THREE.MathUtils.clamp((a*a+d*d-b*b)/(2*a*d),-1,1);
    const knee=hip.clone().addScaledVector(axis,a*cos).addScaledVector(pole,a*Math.sqrt(1-cos*cos));
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
  function idle(next="idle") {if(next==='sit'&&spec.pet.sitEnabled===false)next='idle';state=next;elapsed=0;duration=next==="curious"?Infinity:next==="lie"?7+(walkNumber%3):4.5+(walkNumber%3)*.7; }
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
      sit:+sit.toFixed(4),sideLie:+sideLie.toFixed(4),tailLift:+tailLift.toFixed(4),interaction:interactionRemaining>0,head:bones.get("pet_head")?.node.quaternion.toArray(),tail:bones.get("pet_tail_tip")?.node.quaternion.toArray(),
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
      interactionRemaining=Math.max(0,interactionRemaining-dt);
      if(companionTarget&&interactionRemaining===0){companionTarget=null;requestedRest=interactionRest;interactionRest=null;}
      if(elapsed>=duration&&requestedRest===null) {
        if(state==="idle"&&!reducedMotion) {walkNumber++;beginSteps("turn");}
        else if(state==="walk")settle(naturalRest?(walkNumber%2===0?"lie":"sit"):(walkNumber%2===0?"lie":"idle"));
        else if(state==="lie"||state==="sit")idle();
      }
      // 正脸看镜头：小角度只转颈部；背向镜头时先起身，用四足踏步调整身体。
      const looking=attention||interactionRemaining>0;
      const desiredYaw=looking?cameraYaw()-faceYaw:curveYaw(distance);
      const gap=angleTo(yaw,desiredYaw);
      const needsTurn=Math.abs(gap)>(looking?.26:.035);
      if(state==="curious"&&needsTurn&&crouch<.02&&sit<.02&&sideLie<.02)beginSteps("turn");
      const standing=!naturalRest||(sit<.001&&sideLie<.001);
      const turning=state==="turn"&&standing;
      if(turning) {
        yaw+=THREE.MathUtils.clamp(gap,-.30*dt,.30*dt);
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
        sit=approach(sit,spec.pet.sitEnabled!==false&&!attention&&resting&&sideLie<.001&&(requestedRest??state)==="sit"?1:0,dt/1.9);
        sideLie=approach(sideLie,!attention&&resting&&sit<.001&&(requestedRest??state)==="lie"?1:0,dt/2.3);
        const sitting=ease(sit),lying=ease(sideLie),roll=lying*Math.PI*.5;
        model.quaternion.setFromAxisAngle(up,yaw).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),roll));
        const centerShift=.32*unit*Math.sin(roll),seatForward=spec.pet.poseSitV2||spec.pet.poseSitV3?0:.12*unit*sitting;
        // 侧躺围绕身体中心翻转，避免根节点在脚底造成大幅横移。
        const ground=curvePoint(distance);model.position.x=ground.x+centerShift*Math.cos(yaw)+seatForward*Math.sin(yaw);model.position.z=ground.z-centerShift*Math.sin(yaw)+seatForward*Math.cos(yaw);
        model.position.y=originY+(sideHeight+.008)*Math.sin(roll);
        model.updateMatrixWorld(true);
        const chest=bones.get("pet_chest")?.node;
        const rootBone=bones.get('pet_root')?.node;
        if(chest&&rootBone){
          const chestWorld=worldPosition(chest).add(new THREE.Vector3(-seatForward*Math.sin(yaw),spec.pet.poseSitV3 ? .064*sitting : spec.pet.poseSitV2 ? .030*sitting : spec.pet.sitCorrectives ? .018*sitting : 0,-seatForward*Math.cos(yaw)));
          const chestRotation=chest.getWorldQuaternion(new THREE.Quaternion());
          const parent=rootBone.parent.getWorldQuaternion(new THREE.Quaternion());
          const axis=new THREE.Vector3(1,0,0).applyAxisAngle(up,yaw);
          const tilt=new THREE.Quaternion().setFromAxisAngle(axis,spec.pet.poseSitV2||spec.pet.poseSitV3?0:-.45*sitting);
          rootBone.quaternion.copy(parent.clone().invert().multiply(tilt).multiply(parent).multiply(rootBone.quaternion));
          model.updateMatrixWorld(true);
          chest.position.copy(chestWorld.applyMatrix4(chest.parent.matrixWorld.clone().invert()));
          chest.quaternion.copy(chest.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(chestRotation));
          model.updateMatrixWorld(true);
        }
        const haunch=bones.get('pet_haunch')?.node;
        if(spec.pet.poseSitV2||spec.pet.poseSitV3){
          for(const name of ['pet_haunch','pet_back_l_upper','pet_back_r_upper']){const joint=bones.get(name)?.node;if(!joint)continue;const target=(spec.pet.poseSitV3?seatedTrunk:felineSitPoint)(sittingBind.get(name),sitting).applyMatrix4(model.matrixWorld);joint.position.copy(target.applyMatrix4(joint.parent.matrixWorld.clone().invert()));joint.updateWorldMatrix(false,true);}
        }else if(haunch){const offset=spec.pet.sitCorrectives?new THREE.Vector3(0,.010*sitting,.055*sitting).applyAxisAngle(up,yaw):new THREE.Vector3(0,-.02*unit*sitting,0);haunch.position.add(offset.applyQuaternion(haunch.parent.getWorldQuaternion(new THREE.Quaternion()).invert()));}
      }
      // 点击即回应，头尾动作不等待四足收步，脚掌仍由原有 IK 保持接地。
      const greet=greetingTime>0?ease(Math.min(1,(greetingDuration-greetingTime)/.2))*ease(Math.min(1,greetingTime/.65)):0;
      neckYaw=THREE.MathUtils.damp(neckYaw,looking?THREE.MathUtils.clamp(angleTo(yaw+faceYaw,cameraYaw()),-.30,.30):(walking?.025:.15)*Math.sin(clock*.65)*motion,7,dt);
      // 在世界竖直轴上转头，避免把头骨自身纵轴误当成水平转向轴。
      model.updateMatrixWorld(true);
      const parentQuaternion=head.node.parent.getWorldQuaternion(new THREE.Quaternion());
      const turn=new THREE.Quaternion().setFromAxisAngle(up,walking?THREE.MathUtils.clamp(neckYaw,-.035,.035):neckYaw);
      head.node.quaternion.copy(parentQuaternion.clone().invert().multiply(turn).multiply(parentQuaternion).multiply(head.quaternion));
      const target=companionTarget??camera.position,headPoint=worldPosition(head.node),pitch=looking?THREE.MathUtils.clamp(Math.atan2(target.y-headPoint.y,Math.hypot(target.x-headPoint.x,target.z-headPoint.z))*.10,-.03,.03):(walking?.006:.035)*Math.sin(clock*.9)*motion;
      head.node.rotateX(pitch);if(!looking)head.node.rotateZ((walking?.018:.035)*Math.sin(clock*.9)*motion);
      if(naturalRest&&sideLie>0){
        const axis=new THREE.Vector3(0,0,1).applyAxisAngle(up,yaw),parent=head.node.parent.getWorldQuaternion(new THREE.Quaternion());
        const lift=new THREE.Quaternion().setFromAxisAngle(axis,-.25*ease(sideLie)*Math.PI*.5);
        head.node.quaternion.copy(parent.clone().invert().multiply(lift).multiply(parent).multiply(head.node.quaternion));
      }
      tailLift=THREE.MathUtils.damp(tailLift,looking?1:state==='walk'?.30:.07,looking?5:1.8,dt);
      for(const [name,pitchDown] of [['pet_tail',spec.pet.poseSitV2?-1.15-.30*sit+.57*sideLie:-1.15+.35*sit+.57*sideLie],['pet_tail_tip',spec.pet.poseSitV2?-.70+.50*sit+.40*sideLie:-.70+.20*sit+.40*sideLie]]){
        const joint=bones.get(name),parent=joint.node.parent.getWorldQuaternion(new THREE.Quaternion()),axis=new THREE.Vector3(1,0,0).applyAxisAngle(up,yaw);
        const rotation=new THREE.Quaternion().setFromAxisAngle(up,.055*Math.sin(clock*1.5)*motion+.12*Math.sin(clock*4)*greet).multiply(new THREE.Quaternion().setFromAxisAngle(axis,pitchDown*(1-tailLift)));
        joint.node.quaternion.copy(parent.clone().invert().multiply(rotation).multiply(parent).multiply(joint.node.quaternion));joint.node.updateWorldMatrix(false,true);
      }
      model.updateMatrixWorld(true);
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
          leg.landing.copy(walking?landingFor(leg,velocity):leg.rest.clone().applyAxisAngle(up,yaw+(turning?THREE.MathUtils.clamp(angleTo(yaw,desiredYaw),-.15,.15):0)).add(naturalRest&&!turning?curvePoint(distance):model.position));
          leg.landing.y=originY+leg.rest.y;leg.landingIsRest=!walking&&!turning;
          leg.landingQuaternion.setFromAxisAngle(up,walking?curveYaw(distance+velocity*cycle*((1-stance)+stance*.5)):yaw+(turning?THREE.MathUtils.clamp(angleTo(yaw,desiredYaw),-.15,.15):0)).multiply(leg.pawQuaternion);
        }
        if(!swing&&leg.swing) {leg.anchor.copy(leg.landing);leg.anchorQuaternion.copy(leg.landingQuaternion);leg.contacts++;if(leg.landingIsRest)leg.settled=true;}
        if(swing) {
          const t=(phase-stance)/(1-stance);leg.target.lerpVectors(leg.start,leg.landing,ease(t));
          leg.target.y+=(spec.pet.stepHeight??.032)*Math.sin(Math.PI*t);leg.targetQuaternion.slerpQuaternions(leg.startQuaternion,leg.landingQuaternion,ease(t));
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
          if(leg.name.startsWith("back")){rest.z+=(spec.pet.poseSitV3 ? .13 : spec.pet.poseSitV2 ? .155 : .10*unit)*ease(sit);rest.x+=Math.sign(rest.x)*(spec.pet.poseSitV2?-.012:spec.pet.poseSitV3?0:.015*unit)*ease(sit);}
          leg.target.copy(rest.applyAxisAngle(up,yaw).add(curvePoint(distance)));leg.target.y=originY+leg.rest.y;
          if(spec.pet.poseSitV2&&leg.name.startsWith('back'))leg.target.y=originY+leg.rest.y*(1-.55*ease(sit))+.008*Math.sin(Math.PI*sit);
          if(spec.pet.poseSitV3&&leg.name.startsWith('back'))leg.target.y=originY+leg.rest.y+(.002+leg.rest.y*.60-leg.rest.y)*ease(sit);
          leg.anchor.copy(leg.target);
        }
        leg.stretch=spec.pet.poseSitV3&&leg.name.startsWith('front')?1+.30*ease(sit):1;
        if(leg.stretch!==1){leg.lower.position.copy(bones.get(leg.lower.name).position).multiplyScalar(leg.stretch);leg.paw.position.copy(bones.get(leg.paw.name).position).multiplyScalar(leg.stretch);model.updateMatrixWorld(true);}
        leg.swing=swing;solve(leg);
      }
      model.updateMatrixWorld(true);
      // 四个经实际蒙皮烘焙的修正姿态：后爪先收拢，后臀随后降低。
      for(const mesh of sitShapes){const names=['sit_25','sit_50','sit_75','sit_100'],scaled=sit*4,low=Math.floor(scaled),fraction=scaled-low;for(const name of names)mesh.morphTargetInfluences[mesh.morphTargetDictionary[name]]=0;if(low>0)mesh.morphTargetInfluences[mesh.morphTargetDictionary[names[low-1]]]=1-fraction;if(low<4)mesh.morphTargetInfluences[mesh.morphTargetDictionary[names[low]]]=fraction;}
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
  function beginInteraction(target){interactionRest=requestedRest;requestedRest=spec.pet.sitEnabled===false?'idle':'sit';attention=false;companionTarget=new THREE.Vector3().fromArray(target);interactionRemaining=14;settle(requestedRest);}
  function trackCompanion(target){if(interactionRemaining>0)companionTarget.fromArray(target);}
  function endInteraction(){if(companionTarget){companionTarget=null;interactionRemaining=0;requestedRest=interactionRest;interactionRest=null;}}
  const touchPoint=()=>{model.updateMatrixWorld(true);return faceCenterInHead?faceCenterInHead.clone().applyMatrix4(head.node.matrixWorld).add(new THREE.Vector3(0,.05,0)):worldPosition(head.node);};
  publish();return {update,react,snapshot,setRestPose,beginInteraction,trackCompanion,endInteraction,touchPoint};
}
