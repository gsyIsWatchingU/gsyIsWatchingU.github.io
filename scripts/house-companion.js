import * as THREE from 'three';
import { createCompanionSleep } from './house-companion-sleep.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import spec from '../src/data/house-companion.json';
import { createCompanionProps } from './house-companion-props.js';
import { createCompanionSlide } from './house-companion-slide.js';
import { createCompanionState } from './house-companion-state.js';
import { companionFace, companionRoute, companionSlide } from './house-companion-motion.js';
import { createVisitPurpose, getVisitPurpose, visitPurposes } from './house-visit-purpose.js';

export function createHouseCompanion({root,canvas,camera,houseGroup,focusRoom,getRoom,getAsset,getPet,getDisplay,getToyChest,reducedMotion,onReady=()=>{},onError=()=>{}}) {
  const state=createCompanionState(spec), actor=new THREE.Group();actor.name='spongebob-companion';houseGroup.add(actor);
  actor.userData.companionId='spongebob';
  const avatar=new THREE.Group();actor.add(avatar);
  const visualScale=spec.height/1.25;avatar.scale.setScalar(visualScale);
  const bones=new Map(),rest=new Map();let model=null,mixer=null,currentClip=null;
  let sleepMotion=null,slideMotion=null,petContact=null;
  const faceMeshes=[],feet=[],fading=[];let faceTime=0,facePreview='auto',faceValues={},pointer=null,pointerTime=-10,diagnosticTime=0;
  let room=null,activity=null,entryTime=0,elapsed=0,loaded=false,bodyDepth=.64,backOffset=.32,bedHeight=null;
  let arrivalRequested=false,slideArrival=false,entryDuration=2;
  let session=null,epoch=0,request=null,opener=null;
  let opening='',openingKey=null,openingSent=false;
  createVisitPurpose(root);
  const hud=document.createElement('section');hud.className='companion-hud';hud.setAttribute('aria-label','海绵宝宝的作息');
  hud.hidden=!root.hasAttribute('data-house-companion-preview');
  hud.innerHTML='<span class="companion-day">海绵宝宝入住预览 · 待审</span><strong data-companion-activity>正在载入海绵宝宝…</strong><div class="companion-review-controls"><select aria-label="预览角色动作" data-companion-action disabled>'+Object.entries(spec.actions).filter(([id])=>id!=='wake'&&id!=='tidy').map(([id,value])=>'<option value="'+id+'">'+value.label+'</option>').join('')+'</select></div>';
  root.append(hud);
  const expression=document.createElement('select');expression.setAttribute('aria-label','预览角色表情');
  expression.innerHTML='<option value="auto">自然表情</option><option value="blink">闭眼</option><option value="left">看左边</option><option value="right">看右边</option><option value="happy">开心</option><option value="calm">放松</option>';
  hud.querySelector('.companion-review-controls').append(expression);
  expression.addEventListener('change',()=>{facePreview=expression.value;});
  canvas.addEventListener('pointermove',event=>{const r=canvas.getBoundingClientRect();pointer={x:((event.clientX-r.left)/r.width-.5)*2,y:(.5-(event.clientY-r.top)/r.height)*2};pointerTime=faceTime;});
  const panel=document.createElement('dialog');panel.className='companion-chat';panel.setAttribute('aria-label','和海绵宝宝聊天');
  panel.innerHTML=`<header><div><b>海绵宝宝</b></div><button type="button" data-companion-close aria-label="关闭聊天"></button></header>
    <div class="companion-messages" role="log" aria-live="polite"></div>
    <div class="companion-suggestions" aria-label="当前房间可进行的动作"></div>
    <form><div class="companion-input-row"><input id="companion-input" aria-label="聊天内容" maxlength="400" autocomplete="off"><button type="submit">发送</button></div></form>
    <footer><span data-companion-status role="status"></span></footer>`;
  document.body.append(panel);
  const activityLabel=hud.querySelector('[data-companion-activity]');
  const messages=panel.querySelector('.companion-messages'),status=panel.querySelector('[data-companion-status]'),input=panel.querySelector('input'),send=panel.querySelector('[type=submit]');
  const controller={snapshot:()=>({...state.snapshot(),loaded,room,activity,entryTime,chatOpen:panel.open,position:actor.position.toArray(),height:spec.height,face:faceValues,bedHeight,backOffset,sleep:sleepMotion?.snapshot(),slide:slideMotion?.snapshot(),book:propMotion.snapshot(),petContact,bones:[...bones.keys()],animations:model?.userData.animations??[],status:'review'}),actor};
  root.dataset.companionState='loading';
  const stylesheet=document.createElement('link');stylesheet.rel='stylesheet';stylesheet.href='./styles/house-companion.css?v='+spec.version;document.head.append(stylesheet);

  function log(text,who='assistant') {const item=document.createElement('p');item.className='companion-message '+who;item.textContent=text;messages.append(item);while(messages.children.length>24)messages.firstElementChild.remove();messages.scrollTop=messages.scrollHeight;}
  function invalidate(cancelActions=true) {epoch++;request?.abort();request=null;send.disabled=false;status.textContent='';if(cancelActions)state.cancel();}
  function close() {invalidate(false);if(panel.open)panel.close();opener?.focus({preventScroll:true});}
  const currentRoom=()=>getRoom()??state.snapshot().room;
  const currentPurpose=()=>root.dataset.visitPurpose??getVisitPurpose()??'browse';
  const suggestions={
    listen:['听音乐','一起听音乐吧'],pet:['陪小猫','陪小猫玩一会儿吧'],rest:['歇一会儿','歇一会儿吧'],
    tidy:['整理收藏','整理一下收藏吧'],wash:['洗漱','洗漱一下吧'],journal:['翻日记','翻翻实习日记吧'],
    toy:['玩玩具','一起玩玩具吧'],sleep:['晚安','去睡觉吧'],bubble:['吹泡泡','我们一起吹泡泡吧']
  };
  const roomTopics={
    browse:{living:'要一起听会儿音乐，还是陪小猫玩？',storage:'这里放着不少收藏，你平时爱收集什么？',bathroom:'你猜他把项目藏在了浴室的哪里？',bedroom:'日记和玩具都在这儿，你想先看看哪个？',library:'来图书馆歇会儿吧，你最近在看什么？',roof:'屋顶最适合吹泡泡了，要一起吗？'},
    recruit:{living:'你在找全栈开发、AI 提效，还是 Agent 工程方向的伙伴？',storage:'这里有他的奖杯和证书，你更关注哪方面的积累？',bathroom:'他的项目入口藏在这里，你想先了解哪类项目？',bedroom:'实习日记就在旁边，你想先了解他实际负责过什么吗？',library:'这里有他的技能书，你更想了解全栈开发还是 Agent 工程？',roof:'我们边吹泡泡边聊吧，你希望新伙伴解决什么问题？'},
    inspiration:{living:'这间小屋把个人主页做成了可探索的场景，你想做什么样的作品？',storage:'这些收藏里，你最想听哪一件背后的故事？',bathroom:'把项目入口藏在浴室里是不是有点意外？你喜欢怎样的探索设计？',bedroom:'日记和玩具箱都藏着故事，你想聊叙事还是互动设计？',library:'你最近想尝试 AI 应用、Agent，还是三维交互？',roof:'来屋顶放空一下吧，你脑海里有没有一个还没动手的点子？'}
  };
  function refreshSuggestions() {
    const host=panel.querySelector('.companion-suggestions');host.replaceChildren();
    for(const action of spec.rooms[currentRoom()]?.activities??[]) {
      const item=suggestions[action];if(!item)continue;
      const button=document.createElement('button');button.type='button';button.dataset.action=action;button.dataset.say=item[1];button.textContent=item[0];host.append(button);
    }
    host.hidden=!host.children.length;
  }
  function greet() {
    const purpose=currentPurpose(),here=currentRoom(),key=purpose+':'+here;
    if(openingKey!==key) {
      const intro={browse:'嗨，我是海绵宝宝！欢迎来串门。',recruit:'嗨！听说你是来找伙伴的，我来陪你了解郭书羽。',inspiration:'嗨！来找灵感呀，我们边逛边聊！'};
      opening=intro[purpose]+roomTopics[purpose][here];openingKey=key;openingSent=false;log(opening);
    }
    state.act('wave');
  }
  function open(from=canvas) {if(!loaded)return;opener=from;refreshSuggestions();greet();if(!panel.open)panel.show();panel.querySelector('[data-companion-close]').focus({preventScroll:true});}
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
    root.dataset.companionChatConfigured=String(data.chatConfigured);
  }).catch(()=>{root.dataset.companionChatConfigured='false';}).finally(()=>clearTimeout(healthTimer));

  async function chat(message,suggestedAction=null) {
    message=message.trim();if(!message || message.length>400 || send.disabled)return;
    invalidate();const token=epoch;const pending=new AbortController();request=pending;
    const timer=setTimeout(()=>pending.abort(),60000);send.disabled=true;
    log(message,'user');input.value='';status.textContent='海绵宝宝正在想…';
    try {
      if(!session)session=(await (await api('/session',{},pending.signal)).json()).session;
      const context=openingSent?'':'（来访目的：'+visitPurposes[currentPurpose()]+'；你刚才的开场白：'+opening+'）\n';
      const response=await api('/chat',{session,message:context.length+message.length<=400?context+message:message,room:currentRoom(),activity:activity??'idle'},pending.signal);
      const data=await response.json();if(token!==epoch)return;
      log(data.reply);status.textContent='';openingSent=true;
      // 相机切换先结束，再登记动作。该次内部切换不让 room-changed 取消自己的回复。
      const action=suggestedAction??data.action;
      if(action && spec.actions[action]) {
        const destination=spec.actions[action].room;
        internalFocus=true;
        try{if(destination && destination!==getRoom())focusRoom(destination);}finally{internalFocus=false;}
        state.act(action);activity=null;
      }
    } catch(error) {
      if(token!==epoch)return;
      if(error.name==='AbortError')status.textContent='回复超时，请重新发送';
      else {status.textContent=error.message;if(error.message.includes('会话已过期'))session=null;}
    } finally {clearTimeout(timer);if(token===epoch){send.disabled=false;request=null;}}
  }
  panel.querySelector('form').addEventListener('submit',event=>{event.preventDefault();chat(input.value);});
  panel.querySelector('.companion-suggestions').addEventListener('click',event=>{const button=event.target.closest('[data-say]');if(button && spec.rooms[currentRoom()]?.activities.includes(button.dataset.action))chat(button.dataset.say,button.dataset.action);});
  window.addEventListener('house:visit-purpose-changed',()=>{invalidate();if(panel.open)greet();});
  let internalFocus=false;
  window.addEventListener('house:room-changed',event=>{
    arrivalRequested=event.detail.id==='library';
    if(!internalFocus)invalidate();state.follow(event.detail.id);activity=null;
    refreshSuggestions();
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)invalidate();});

  const bubbles=new THREE.Group();actor.add(bubbles);
  const bubbleMaterial=new THREE.MeshPhysicalMaterial({color:0xafeaf6,transparent:true,opacity:.28,roughness:.1,metalness:.05,clearcoat:1});
  for(let i=0;i<6;i++){const ball=new THREE.Mesh(new THREE.SphereGeometry(.05+i*.006,12,8),bubbleMaterial);bubbles.add(ball);}bubbles.visible=false;
  const propMotion=createCompanionProps({actor,avatar,bones,houseGroup,getDisplay,getToyChest,root});

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
    slideMotion=createCompanionSlide({actor,avatar,model,bones,houseGroup});
    controller.clips=gltf.animations;loaded=true;hud.querySelector('select').disabled=false;root.dataset.companionState='ready';activity=null;
    onReady();
  },undefined,()=>{root.dataset.companionState='error';activityLabel.textContent='角色未能载入，请刷新重试';onError({id:'companion',name:'海绵宝宝',url:spec.model,kind:'companion'});});

  function bone(alias) {
    const candidates={head:['head','Head','mixamorigHead','comp_head'],hips:['Hips','pelvis','hips','comp_root'],leftArm:['LeftArm','upperarm_l','left_upper_arm','comp_arm_l'],rightArm:['RightArm','upperarm_r','right_upper_arm','comp_arm_r'],leftLeg:['LeftUpLeg','thigh_l','left_upper_leg','comp_leg_l'],rightLeg:['RightUpLeg','thigh_r','right_upper_leg','comp_leg_r'],jaw:['jaw','Jaw','comp_jaw']};
    for(const name of candidates[alias]??[]){if(bones.has(name))return bones.get(name);const match=[...bones].find(([n])=>n.toLowerCase().replace(/[^a-z_]/g,'').endsWith(name.toLowerCase()));if(match)return match[1];}
    return null;
  }
  function poseBone(name,x=0,y=0,z=0){const b=bone(name);if(b){b.rotateX(x);b.rotateY(y);b.rotateZ(z);}}
  function startActivity(next) {
    sleepMotion?.reset();
    propMotion.reset();
    getPet?.()?.endInteraction?.();
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
    propMotion.begin(activity);
    if(activity==='pet')getPet?.()?.beginInteraction?.(actor.position.toArray());
  }
  controller.react=()=>open(canvas);
  window.addEventListener('house:pet-greet',()=>{if(!loaded)return;focusRoom('living');state.act('pet');activity=null;});
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
    if(!actor.visible)return;
    if(!motionPaused){entryTime=Math.min(entryDuration,entryTime+dt);elapsed+=dt;}
    const sliding=slideArrival&&!reducedMotion&&entryTime<3.6;
    activityLabel.textContent=sliding?'滑滑梯':spec.actions[activity]?.label??activity;
    const pose=spec.rooms[room],t=reducedMotion||entryTime>=entryDuration?1:Math.max(0,Math.min(1,(entryTime-(slideArrival?3.6:0))/2)),e=t*t*(3-2*t);
    const targetPosition=new THREE.Vector3(...pose.position);
    if(activity==='pet'){const cat=getAsset?.('siamese-cat');if(cat)targetPosition.copy(cat.position).add(new THREE.Vector3(.40,0,.38));}
    const route=companionRoute(pose,e);actor.position.fromArray(route.position);
    if(activity==='pet')actor.position.lerpVectors(new THREE.Vector3(...pose.entry),targetPosition,e);
    avatar.rotation.set(0,0,0);avatar.position.set(0,0,0);avatar.scale.setScalar(visualScale);
    const propPose=propMotion.place(elapsed);
    const walking=propPose?.walking??(!sliding&&t<1);
    const wantedClip=sliding?'slide':walking?'walk':(propPose?(['read','lift','return'].includes(propPose.phase)?'read':'idle'):({rest:'sit',sleep:'lie',listen:'idle'})[activity]??activity);
    const wanted=controller.clips?.find(c=>c.name===wantedClip);
    playClip(wanted);
    if(walking){avatar.rotation.y=Math.atan2(route.direction[0],route.direction[2]);}
    else avatar.rotation.y=(['read','journal'].includes(activity)?-.22:.10)+(reducedMotion?0:Math.sin(faceTime*.55)*.035);
    if(propPose)avatar.rotation.y=propPose.yaw;
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
    if(activity==='pet'&&!walking){faceValues.lookDown=.7;faceValues.lookLeft=.55;}
    for(const node of faceMeshes)for(const [name,value] of Object.entries(faceValues)){const index=node.morphTargetDictionary[name];if(index!==undefined)node.morphTargetInfluences[index]=value;}
    // 表情与轻微重心变化分别作用于网格和有权重的主骨，脚底随后校准。
    if(!walking&&!sliding&&activity!=='sleep'&&!reducedMotion)poseBone('hips',(['read','journal'].includes(activity)?.055:0)+Math.sin(faceTime*1.7)*.008,0,Math.sin(faceTime*.85)*.01);
    // 转头回应始终可见，弹层打开时不恢复自主动作。
    if(panel.open && !next.commanded){const target=camera.position.clone().sub(actor.position);avatar.rotation.y=Math.atan2(target.x,target.z);}

    petContact=null;
    if(activity==='pet'&&!walking)avatar.rotation.set(.10,.10,0);
    if(sliding){
      slideMotion?.update(Math.min(1,entryTime/3.2),THREE.MathUtils.clamp((entryTime-3.2)/.4,0,1),pose.entry);
    }else if(activity!=='sleep'||walking){
      houseGroup.updateMatrixWorld(true);let foot=Infinity;const point=new THREE.Vector3();
      for(const {node,indices} of feet)for(const index of indices){point.fromBufferAttribute(node.geometry.attributes.position,index);node.applyBoneTransform(index,point);point.applyMatrix4(node.matrixWorld);foot=Math.min(foot,point.y);}
      if(Number.isFinite(foot))avatar.position.y+=(propPose?actor.position.y:pose.position[1])-foot+.008;
    }
    if(activity==='pet'&&!walking){
      const point=getPet?.()?.touchPoint?.();
      if(point){
        getPet?.()?.trackCompanion?.(actor.position.clone().add(new THREE.Vector3(0,.7,0)).toArray());houseGroup.updateMatrixWorld(true);
        const upper=bones.get('comp_arm_r'),lower=bones.get('comp_forearm_r'),hand=bones.get('comp_hand_r');
        if(upper&&lower&&hand){
          const shoulder=upper.getWorldPosition(new THREE.Vector3()),elbow=lower.getWorldPosition(new THREE.Vector3()),wrist=hand.getWorldPosition(new THREE.Vector3()),a=shoulder.distanceTo(elbow),b=elbow.distanceTo(wrist),target=point.clone().add(new THREE.Vector3(0,.018,.018*Math.sin(elapsed*3))),axis=target.sub(shoulder),distance=Math.min(axis.length(),a+b-.001);axis.normalize();
          const pole=new THREE.Vector3(0,-1,0);pole.addScaledVector(axis,-pole.dot(axis)).normalize();const cosine=THREE.MathUtils.clamp((a*a+distance*distance-b*b)/(2*a*distance),-1,1),joint=shoulder.clone().addScaledVector(axis,a*cosine).addScaledVector(pole,a*Math.sqrt(1-cosine*cosine));
          const aim=(bone,child,to)=>{const origin=bone.getWorldPosition(new THREE.Vector3()),q=bone.getWorldQuaternion(new THREE.Quaternion()),from=child.getWorldPosition(new THREE.Vector3()).sub(origin).normalize(),delta=new THREE.Quaternion().setFromUnitVectors(from,to.clone().sub(origin).normalize());bone.quaternion.copy(bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(delta.multiply(q)));bone.updateWorldMatrix(false,true);};aim(upper,lower,joint);aim(lower,hand,shoulder.clone().addScaledVector(axis,distance));
          petContact=hand.getWorldPosition(new THREE.Vector3()).distanceTo(point);
        }
      }
    }
    diagnosticTime+=dt;if(diagnosticTime>.2){diagnosticTime=0;root.dataset.companionFace=JSON.stringify(faceValues);root.dataset.companionPosition=JSON.stringify(actor.position.toArray());root.dataset.companionHeight=String(spec.height);root.dataset.companionArrival=sliding?'slide':walking?'walk':'activity';}
    propMotion.update(elapsed,reducedMotion);
    bubbles.visible=!walking && activity==='bubble';bubbles.children.forEach((ball,i)=>{const phase=((elapsed*.25+i*.17)%1);ball.position.set(.23+Math.sin(i+phase*4)*.18,.9+phase*.8,.5+phase*.3);ball.scale.setScalar(.4+phase*.8);});
    hud.querySelector('.companion-day').textContent=`${Math.floor(next.day/120*24).toString().padStart(2,'0')}:00 · ${next.following?'陪你逛逛':'循环的一天'} · 预览待审`;
  };
  return controller;
}
