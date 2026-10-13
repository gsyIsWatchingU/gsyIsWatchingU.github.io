import * as THREE from 'three';
import { createCompanionSleep } from './house-companion-sleep.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import spec from '../src/data/house-companion.json';
import contact from '../src/data/house-companion-contact.json';
import { createCompanionState } from './house-companion-state.js';
import { companionFace, companionRoute, companionSlide } from './house-companion-motion.js';

export function createHouseCompanion({root,canvas,camera,houseGroup,focusRoom,getRoom,getAsset,getPet,reducedMotion}) {
  const state=createCompanionState(spec), actor=new THREE.Group();actor.name='spongebob-companion';houseGroup.add(actor);
  actor.userData.companionId='spongebob';
  const avatar=new THREE.Group();actor.add(avatar);
  const visualScale=spec.height/1.25;avatar.scale.setScalar(visualScale);
  const bones=new Map(),rest=new Map();let model=null,mixer=null,currentClip=null;
  let sleepMotion=null;
  const faceMeshes=[],feet=[],fading=[];let faceTime=0,facePreview='auto',faceValues={},pointer=null,pointerTime=-10,diagnosticTime=0;
  let room=null,activity=null,entryTime=0,elapsed=0,loaded=false,greeting=0,bodyDepth=.64,backOffset=.32,bedHeight=null;
  let arrivalRequested=false,slideArrival=false,entryDuration=2;
  let session=null,epoch=0,request=null,opener=null;
  const hud=document.createElement('section');hud.className='companion-hud';hud.setAttribute('aria-label','海绵宝宝的作息');
  hud.innerHTML='<span class="companion-day">海绵宝宝入住预览 · 待审</span><strong data-companion-activity>正在载入海绵宝宝…</strong><div class="companion-review-controls"><select aria-label="预览角色动作" data-companion-action disabled>'+Object.entries(spec.actions).filter(([id])=>id!=='wake'&&id!=='tidy').map(([id,value])=>'<option value="'+id+'">'+value.label+'</option>').join('')+'</select></div>';
  root.append(hud);
  const expression=document.createElement('select');expression.setAttribute('aria-label','预览角色表情');
  expression.innerHTML='<option value="auto">自然表情</option><option value="blink">闭眼</option><option value="left">看左边</option><option value="right">看右边</option><option value="happy">开心</option><option value="calm">放松</option>';
  hud.querySelector('.companion-review-controls').append(expression);
  expression.addEventListener('change',()=>{facePreview=expression.value;});
  canvas.addEventListener('pointermove',event=>{const r=canvas.getBoundingClientRect();pointer={x:((event.clientX-r.left)/r.width-.5)*2,y:(.5-(event.clientY-r.top)/r.height)*2};pointerTime=faceTime;});
  const bubble=document.createElement('div');bubble.className='companion-bubble';bubble.hidden=true;bubble.setAttribute('role','status');root.append(bubble);
  const panel=document.createElement('dialog');panel.className='companion-chat';panel.setAttribute('aria-label','和海绵宝宝聊天');
  panel.innerHTML=`<header><div><b>海绵宝宝</b><small>有空聊两句吗？</small></div><button type="button" data-companion-close aria-label="关闭聊天">×</button></header>
    <p data-companion-config class="companion-config">正在连接聊天…</p>
    <div class="companion-messages" role="log" aria-live="polite"></div>
    <div class="companion-suggestions"><button type="button" data-say="翻翻实习日记吧">翻日记</button><button type="button" data-say="我们一起吹泡泡吧">吹泡泡</button><button type="button" data-say="去睡觉吧">晚安</button></div>
    <form><label for="companion-input">跟他说句话</label><div class="companion-input-row"><input id="companion-input" maxlength="400" autocomplete="off" placeholder="比如：一起去读书吧"><button type="submit">发送</button></div></form>
    <footer><span data-companion-status role="status"></span></footer>`;
  document.body.append(panel);
  const activityLabel=hud.querySelector('[data-companion-activity]');
  const messages=panel.querySelector('.companion-messages'),status=panel.querySelector('[data-companion-status]'),input=panel.querySelector('input'),send=panel.querySelector('[type=submit]');
  const controller={snapshot:()=>({...state.snapshot(),loaded,room,activity,entryTime,chatOpen:panel.open,position:actor.position.toArray(),height:spec.height,face:faceValues,bedHeight,backOffset,sleep:sleepMotion?.snapshot(),bones:[...bones.keys()],animations:model?.userData.animations??[],status:'review'}),actor};
  root.dataset.companionState='loading';
  const stylesheet=document.createElement('link');stylesheet.rel='stylesheet';stylesheet.href='./styles/house-companion.css?v='+spec.version;document.head.append(stylesheet);

  function log(text,who='assistant') {const item=document.createElement('p');item.className='companion-message '+who;item.textContent=text;messages.append(item);while(messages.children.length>24)messages.firstElementChild.remove();messages.scrollTop=messages.scrollHeight;}
  function invalidate(cancelActions=true) {epoch++;request?.abort();request=null;send.disabled=false;status.textContent='';if(cancelActions)state.cancel();}
  function close() {invalidate(false);if(panel.open)panel.close();opener?.focus({preventScroll:true});}
  function greet() {greeting=3;bubble.textContent='嗨！我准备好啦！';bubble.hidden=false;state.act('wave');}
  function open(from=canvas) {if(!loaded)return;opener=from;greet();if(!panel.open)panel.show();input.focus();}
  panel.querySelector('[data-companion-close]').addEventListener('click',close);
  hud.querySelector('[data-companion-action]').addEventListener('change',event=>{if(!loaded)return;invalidate();const action=event.target.value;const destination=spec.actions[action].room;if(destination)focusRoom(destination);state.act(action);activity=null;});
  document.addEventListener('keydown',event=>{if(event.key==='Escape' && panel.open && !document.querySelector('dialog:modal')){event.preventDefault();close();}});
  panel.addEventListener('cancel',event=>{event.preventDefault();close();});panel.addEventListener('close',()=>{invalidate(false);});

  async function api(path,body,signal) {
    const response=await fetch(spec.api+path,{method:body?'POST':'GET',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined,signal});
    if(!response.ok){const payload=await response.json().catch(()=>null);throw new Error(typeof payload?.detail==='string'?payload.detail:'小屋服务暂时不可用，请重试');}
    return response;
  }
  const healthRequest=new AbortController();const healthTimer=setTimeout(()=>healthRequest.abort(),8000);
  api('/health',null,healthRequest.signal).then(r=>r.json()).then(data=>{
    panel.querySelector('[data-companion-config]').textContent=data.chatConfigured?'文字聊天':'聊天尚未配置 · 需要服务器 DeepSeek 密钥';
    root.dataset.companionChatConfigured=String(data.chatConfigured);
  }).catch(()=>{panel.querySelector('[data-companion-config]').textContent='聊天服务暂时未连接，作息和房间陪伴仍可体验';root.dataset.companionChatConfigured='false';}).finally(()=>clearTimeout(healthTimer));

  async function chat(message) {
    message=message.trim();if(!message || message.length>400 || send.disabled)return;
    invalidate();const token=epoch;const pending=new AbortController();request=pending;
    const timer=setTimeout(()=>pending.abort(),60000);send.disabled=true;
    log(message,'user');input.value='';status.textContent='海绵宝宝正在想…';
    try {
      if(!session)session=(await (await api('/session',{},pending.signal)).json()).session;
      const response=await api('/chat',{session,message,room:room??'living',activity:activity??'idle'},pending.signal);
      const data=await response.json();if(token!==epoch)return;
      log(data.reply);status.textContent='';
      // 相机切换先结束，再登记动作。该次内部切换不让 room-changed 取消自己的回复。
      if(data.action && spec.actions[data.action]) {
        const destination=spec.actions[data.action].room;
        internalFocus=true;
        try{if(destination && destination!==getRoom())focusRoom(destination);}finally{internalFocus=false;}
        state.act(data.action);activity=null;
      }
    } catch(error) {
      if(token!==epoch)return;
      if(error.name==='AbortError')status.textContent='回复超时，请重新发送';
      else {status.textContent=error.message;if(error.message.includes('会话已过期'))session=null;}
    } finally {clearTimeout(timer);if(token===epoch){send.disabled=false;request=null;}}
  }
  panel.querySelector('form').addEventListener('submit',event=>{event.preventDefault();chat(input.value);});
  panel.querySelectorAll('[data-say]').forEach(button=>button.addEventListener('click',()=>chat(button.dataset.say)));
  let internalFocus=false;
  window.addEventListener('house:room-changed',event=>{
    arrivalRequested=event.detail.id==='library';
    if(!internalFocus)invalidate();state.follow(event.detail.id);activity=null;
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)invalidate();});

  const bubbles=new THREE.Group();actor.add(bubbles);
  const bubbleMaterial=new THREE.MeshPhysicalMaterial({color:0xafeaf6,transparent:true,opacity:.28,roughness:.1,metalness:.05,clearcoat:1});
  for(let i=0;i<6;i++){const ball=new THREE.Mesh(new THREE.SphereGeometry(.05+i*.006,12,8),bubbleMaterial);bubbles.add(ball);}bubbles.visible=false;
  let book=null;
  const bookTexture=(()=>{const c=document.createElement('canvas');c.width=256;c.height=256;const ctx=c.getContext('2d');ctx.fillStyle='#447a81';ctx.fillRect(0,0,256,256);ctx.strokeStyle='#d4b86b';ctx.lineWidth=10;ctx.strokeRect(14,14,228,228);ctx.fillStyle='#fff0be';ctx.font='bold 38px sans-serif';ctx.textAlign='center';ctx.fillText('航海日记',128,130);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;})();
  book=new THREE.Mesh(new THREE.BoxGeometry(.42,.30,.035),new THREE.MeshStandardMaterial({map:bookTexture,roughness:.95}));book.position.set(0,.63,.29);avatar.add(book);book.visible=false;
  const paperTexture=(()=>{const c=document.createElement('canvas');c.width=256;c.height=384;const ctx=c.getContext('2d');ctx.fillStyle='#fff6d9';ctx.fillRect(0,0,256,384);ctx.fillStyle='#47706e';ctx.textAlign='center';ctx.font='bold 25px sans-serif';ctx.fillText('实习日记',128,65);ctx.font='20px sans-serif';['字节跳动','AI 全栈','Agent 工程','开发与交付'].forEach((text,i)=>ctx.fillText(text,128,130+i*48));const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;return texture;})();
  const pageMaterial=new THREE.MeshStandardMaterial({map:paperTexture,roughness:1,side:THREE.DoubleSide});
  for(const x of [-.10,.10]){const page=new THREE.Mesh(new THREE.PlaneGeometry(.19,.28),pageMaterial);page.position.set(x,0,.021);book.add(page);}
  const turningPage=new THREE.Group();turningPage.position.z=.025;book.add(turningPage);const sheet=new THREE.Mesh(new THREE.PlaneGeometry(.19,.28),pageMaterial);sheet.position.x=.10;turningPage.add(sheet);

  new GLTFLoader().load(spec.model+'?v='+spec.version,gltf=>{
    model=gltf.scene;avatar.add(model);houseGroup.updateMatrixWorld(true);
    // 先让骨骼世界矩阵就位，再测蒙皮后的尺寸；道具、IK 与模型共用 avatar 缩放。
    const bounds=new THREE.Box3();model.traverse(node=>{if(!node.isMesh)return;if(node.isSkinnedMesh)node.computeBoundingBox();else node.geometry.computeBoundingBox();bounds.union((node.isSkinnedMesh?node.boundingBox:node.geometry.boundingBox).clone().applyMatrix4(node.matrixWorld).applyMatrix4(avatar.matrixWorld.clone().invert()));});
    const size=bounds.getSize(new THREE.Vector3());model.scale.setScalar(1.25/size.y);
    bodyDepth=size.z*model.scale.x;
    // 包围盒中心只用于 X/Z；Y 使用脚底，不以蒙皮根骨作为落地点。
    model.position.set(0,-bounds.min.y*model.scale.x,-(bounds.min.z+bounds.max.z)*.5*model.scale.x);
    model.traverse(node=>{node.userData.companionId='spongebob';if(node.isMesh){node.castShadow=true;node.receiveShadow=true;}if(node.morphTargetDictionary)faceMeshes.push(node);if(node.isSkinnedMesh)node.frustumCulled=false;if(node.isBone){bones.set(node.name,node);rest.set(node.name,{q:node.quaternion.clone(),p:node.position.clone()});}});
    model.updateMatrixWorld(true);
    model.traverse(node=>{if(!node.isSkinnedMesh||node.name.includes('eyelid'))return;const p=node.geometry.attributes.position,indices=[];for(let i=0;i<p.count;i++)if(p.getY(i)<.16)indices.push(i);feet.push({node,indices});});
    let back=Infinity;
    model.traverse(node=>{if(!node.isMesh)return;const p=node.geometry.attributes.position;for(let i=0;i<p.count;i++){const v=new THREE.Vector3().fromBufferAttribute(p,i).applyMatrix4(node.matrixWorld).applyMatrix4(avatar.matrixWorld.clone().invert());if(v.y>.5 && v.y<1.1)back=Math.min(back,v.z);}});
    backOffset=Number.isFinite(back)?-back:bodyDepth/2;
    model.userData.animations=gltf.animations.map(c=>c.name);mixer=new THREE.AnimationMixer(model);
    sleepMotion=createCompanionSleep({actor,avatar,model,bones,houseGroup,getBed:()=>getAsset?.('bed'),root,height:spec.height});
    controller.clips=gltf.animations;loaded=true;hud.querySelector('select').disabled=false;root.dataset.companionState='ready';activity=null;
  },undefined,()=>{root.dataset.companionState='error';activityLabel.textContent='角色未能载入，请刷新重试';});

  function bone(alias) {
    const candidates={head:['head','Head','mixamorigHead','comp_head'],hips:['Hips','pelvis','hips','comp_root'],leftArm:['LeftArm','upperarm_l','left_upper_arm','comp_arm_l'],rightArm:['RightArm','upperarm_r','right_upper_arm','comp_arm_r'],leftLeg:['LeftUpLeg','thigh_l','left_upper_leg','comp_leg_l'],rightLeg:['RightUpLeg','thigh_r','right_upper_leg','comp_leg_r'],jaw:['jaw','Jaw','comp_jaw']};
    for(const name of candidates[alias]??[]){if(bones.has(name))return bones.get(name);const match=[...bones].find(([n])=>n.toLowerCase().replace(/[^a-z_]/g,'').endsWith(name.toLowerCase()));if(match)return match[1];}
    return null;
  }
  function poseBone(name,x=0,y=0,z=0){const b=bone(name);if(b){b.rotateX(x);b.rotateY(y);b.rotateZ(z);}}
  function holdBook() {
    // 书页朝向角色的眼睛；从访客位置看到的是封面与页边。
    book.position.set(0,.78,.34);book.rotation.set(-1.88,0,0);
    actor.updateMatrixWorld(true);
    for(const [side,x] of [['l',.23],['r',-.23]]) {
      const upper=bones.get('comp_arm_'+side),lower=bones.get('comp_forearm_'+side),hand=bones.get('comp_hand_'+side);
      if(!upper || !lower || !hand)continue;
      const shoulder=upper.getWorldPosition(new THREE.Vector3()),elbow=lower.getWorldPosition(new THREE.Vector3()),wrist=hand.getWorldPosition(new THREE.Vector3());
      const a=shoulder.distanceTo(elbow),b=elbow.distanceTo(wrist);
      const target=book.localToWorld(new THREE.Vector3(x,-.04,0));const axis=target.clone().sub(shoulder);const distance=Math.min(axis.length(),a+b-.0001);axis.normalize();
      const pole=new THREE.Vector3(0,-1,.15).transformDirection(avatar.matrixWorld);pole.addScaledVector(axis,-pole.dot(axis)).normalize();
      const cosine=THREE.MathUtils.clamp((a*a+distance*distance-b*b)/(2*a*distance),-1,1);
      const joint=shoulder.clone().addScaledVector(axis,a*cosine).addScaledVector(pole,a*Math.sqrt(1-cosine*cosine));
      const aim=(bone,child,to)=>{const position=bone.getWorldPosition(new THREE.Vector3()),world=bone.getWorldQuaternion(new THREE.Quaternion());const direction=child.getWorldPosition(new THREE.Vector3()).sub(position).normalize();const delta=new THREE.Quaternion().setFromUnitVectors(direction,to.clone().sub(position).normalize());bone.quaternion.copy(bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(delta.multiply(world)));bone.updateWorldMatrix(false,true);};
      aim(upper,lower,joint);aim(lower,hand,shoulder.clone().addScaledVector(axis,distance));
    }
  }
  function startActivity(next) {
    sleepMotion?.reset();
    const arriving=room!==next.room||arrivalRequested;arrivalRequested=false;
    room=next.room;activity=next.action;elapsed=0;actor.userData.roomId=room;actor.userData.revision=next.revision;
    actor.traverse(node=>{node.userData.roomId=room;node.userData.companionId='spongebob';});
    if(arriving){slideArrival=room==='library';entryDuration=slideArrival?5.6:2;actor.position.fromArray(spec.rooms[room].entry);entryTime=0;}
    activityLabel.textContent=spec.actions[activity]?.label??activity;
    root.dataset.companionRoom=room;root.dataset.companionActivity=activity;
    if(activity==='sleep'){
      sleepMotion?.begin();
      const bed=getAsset?.('bed'),anchor=spec.rooms.bedroom.bed;
      const ray=new THREE.Raycaster(new THREE.Vector3(anchor[0],9,anchor[2]+.35),new THREE.Vector3(0,-1,0));
      bed?.updateMatrixWorld(true);bedHeight=bed?ray.intersectObject(bed,true).find(hit=>hit.point.y<7.05 && hit.point.y>6.3 && hit.face.normal.clone().transformDirection(hit.object.matrixWorld).y>.8)?.point.y:null;
    }
    if(activity==='pet')getPet?.()?.react();
  }
  controller.react=()=>open(canvas);
  function playClip(clip) {
    if(!clip||currentClip?.getClip()===clip)return;
    const next=mixer.clipAction(clip);const old=fading.findIndex(item=>item.action===next);if(old>=0)fading.splice(old,1);
    if(currentClip){currentClip.fadeOut(.18);fading.push({action:currentClip,time:.18});}
    currentClip=next;next.reset().fadeIn(.18).play();
  }
  controller.update=(dt,ready)=>{
    if(!loaded)return;
    const blocked=!ready || document.hidden;
    const paused=blocked || !!document.querySelector('dialog[open]');
    const next=state.tick(dt,paused,!blocked && panel.open);
    const motionPaused=blocked || (paused && !next.commanded);
    if(!blocked&&(!paused||panel.open))faceTime+=dt;
    if(room!==next.room || activity!==next.action || actor.userData.revision!==next.revision)startActivity(next);
    actor.visible=!getRoom() || getRoom()===room;
    if(!actor.visible){bubble.hidden=true;return;}
    if(!motionPaused){entryTime=Math.min(entryDuration,entryTime+dt);elapsed+=dt;}
    const sliding=slideArrival&&!reducedMotion&&entryTime<3.6;
    activityLabel.textContent=sliding?'滑滑梯':spec.actions[activity]?.label??activity;
    const pose=spec.rooms[room],t=reducedMotion||entryTime>=entryDuration?1:Math.max(0,Math.min(1,(entryTime-(slideArrival?3.6:0))/2)),e=t*t*(3-2*t);
    const targetPosition=new THREE.Vector3(...pose.position);
    if(activity==='pet'){const cat=getAsset?.('siamese-cat');if(cat)targetPosition.copy(cat.position).add(new THREE.Vector3(.55,0,.05));}
    const route=companionRoute(pose,e);actor.position.fromArray(route.position);
    if(activity==='pet')actor.position.lerpVectors(new THREE.Vector3(...pose.entry),targetPosition,e);
    avatar.rotation.set(0,0,0);avatar.position.set(0,0,0);avatar.scale.setScalar(visualScale);
    const walking=!sliding&&t<1;
    const wantedClip=sliding?'slide':walking?'walk':(({journal:'read',rest:'sit',sleep:'lie',listen:'idle'})[activity]??activity);
    const wanted=controller.clips?.find(c=>c.name===wantedClip);
    playClip(wanted);
    if(walking){avatar.rotation.y=Math.atan2(route.direction[0],route.direction[2]);}
    else avatar.rotation.y=(['read','journal'].includes(activity)?-.22:.10)+(reducedMotion?0:Math.sin(faceTime*.55)*.035);
    // 未播放绑定片段时恢复基准姿势；活动姿态叠加在同一骨架上。
    for(const [name,value] of rest){const b=bones.get(name);b.quaternion.copy(value.q);b.position.copy(value.p);}
    mixer?.update(motionPaused?0:dt);
    if(!motionPaused)for(let i=fading.length-1;i>=0;i--){fading[i].time-=dt;if(fading[i].time<=0){fading[i].action.stop();fading.splice(i,1);}}
    if(!wanted){
      if(walking){poseBone('leftLeg',Math.sin(elapsed*8)*.3);poseBone('rightLeg',-Math.sin(elapsed*8)*.3);}
      else if(activity==='wave'){poseBone('rightArm',0,0,-.55+Math.sin(elapsed*9)*.13);}
      else if(['journal','read','tidy','wash','bubble','pet'].includes(activity)){poseBone('leftArm',-.5,0,.12);poseBone('rightArm',-.5,0,-.12);poseBone('head',.08);}
    }
    if(activity==='sleep' && !walking)sleepMotion?.update(reducedMotion?6:Math.max(0,elapsed-entryDuration));
    const faceActivity=activity==='sleep'&&!['cover','sleep'].includes(root.dataset.companionSleep)?'rest':activity;
    faceValues=companionFace(faceTime,sliding?'bubble':faceActivity,false,facePreview,faceTime-pointerTime<4?pointer:null);
    for(const node of faceMeshes)for(const [name,value] of Object.entries(faceValues)){const index=node.morphTargetDictionary[name];if(index!==undefined)node.morphTargetInfluences[index]=value;}
    // 表情与轻微重心变化分别作用于网格和有权重的主骨，脚底随后校准。
    if(!walking&&!sliding&&activity!=='sleep'&&!reducedMotion)poseBone('hips',(['read','journal'].includes(activity)?.055:0)+Math.sin(faceTime*1.7)*.008,0,Math.sin(faceTime*.85)*.01);
    // 转头回应始终可见，弹层打开时不恢复自主动作。
    if(panel.open && !next.commanded){const target=camera.position.clone().sub(actor.position);avatar.rotation.y=Math.atan2(target.x,target.z);}
    book.visible=!walking && !sliding && ['read','journal','tidy'].includes(activity);
    if(book.visible)holdBook();
    if(sliding){
      const slide=companionSlide(Math.min(1,entryTime/3.2)),settle=THREE.MathUtils.clamp((entryTime-3.2)/.4,0,1);
      actor.position.fromArray(slide.position).lerp(new THREE.Vector3(...pose.entry),settle);
      avatar.rotation.y=Math.atan2(slide.direction[0],slide.direction[2]);avatar.rotation.x=(Math.atan2(-slide.direction[1],Math.hypot(slide.direction[0],slide.direction[2]))-.25)*(1-settle);
      const seat=new THREE.Vector3(0,.35,-.21).multiplyScalar(visualScale).applyEuler(avatar.rotation);
      avatar.position.copy(seat).multiplyScalar(-(1-settle));avatar.position.y+=.035*(1-settle);
      const sample=Math.min(1,entryTime/3.2)*64;
      avatar.position.y+=Math.max(contact.slideLift[Math.floor(sample)],contact.slideLift[Math.min(64,Math.ceil(sample))])*(1-settle);
    }else if(activity!=='sleep'||walking){
      actor.updateMatrixWorld(true);let foot=Infinity;const point=new THREE.Vector3();
      for(const {node,indices} of feet)for(const index of indices){point.fromBufferAttribute(node.geometry.attributes.position,index);node.applyBoneTransform(index,point);point.applyMatrix4(node.matrixWorld);foot=Math.min(foot,point.y);}
      if(Number.isFinite(foot))avatar.position.y+=pose.position[1]-foot+.008;
    }
    diagnosticTime+=dt;if(diagnosticTime>.2){diagnosticTime=0;root.dataset.companionFace=JSON.stringify(faceValues);root.dataset.companionPosition=JSON.stringify(actor.position.toArray());root.dataset.companionHeight=String(spec.height);root.dataset.companionArrival=sliding?'slide':walking?'walk':'activity';}
    turningPage.rotation.y=reducedMotion?-.35:-Math.PI*((elapsed%3)/3);
    bubbles.visible=!walking && activity==='bubble';bubbles.children.forEach((ball,i)=>{const phase=((elapsed*.25+i*.17)%1);ball.position.set(.23+Math.sin(i+phase*4)*.18,.9+phase*.8,.5+phase*.3);ball.scale.setScalar(.4+phase*.8);});
    hud.querySelector('.companion-day').textContent=`${Math.floor(next.day/120*24).toString().padStart(2,'0')}:00 · ${next.following?'陪你逛逛':'循环的一天'} · 预览待审`;
    if(greeting>0){greeting-=dt;const point=actor.position.clone().add(new THREE.Vector3(0,spec.height+.13,0)).project(camera);bubble.hidden=greeting<=0 || !actor.visible || point.z<-1 || point.z>1;bubble.style.left=THREE.MathUtils.clamp((point.x*.5+.5)*root.clientWidth,95,root.clientWidth-95)+'px';bubble.style.top=THREE.MathUtils.clamp((-.5*point.y+.5)*root.clientHeight,80,root.clientHeight-80)+'px';}
  };
  return controller;
}
