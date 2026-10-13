(function(){
"use strict";
const THREE=window.THREE;
const { createWalk }=window.KrustyWalk;
const { buildRestaurant, createNightProps }=window.KrustyScene;
const { createGame }=window.KrustyGame;
const { createAudio }=window.KrustyAudio;

const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(68,innerWidth/innerHeight,.08,65);
const audio=createAudio(window.KrustyAudioData||{}),app=document.getElementById('app');
const viewport=window.KrustyViewport;
let renderer=null,restaurant=null,props=null,walk=null,game=null,mode='menu',raf=0,last=0,sampleStart=0,frames=0,fps=0,low=false,losses=0,stopped=false,cameraSnapshot=null,pointerTap=null,centerTarget=null,promptElapsed=0,roomElapsed=0,metricsElapsed=0;
const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();
const baseCollisions=[],gateBox=new THREE.Box3(new THREE.Vector3(3.98,.18,3.18),new THREE.Vector3(5.32,2.76,3.42));
const fallback=document.createElement('div');fallback.id='fallbackScene';fallback.hidden=true;app.appendChild(fallback);
const fallbackRoom={value:'lobby'};
let fallbackMode=false;
let doorMotion=null,worldTime=0,scareMotion=null,rattleMotion=null;
let cueCandidate=null,cueDwell=0,waterElapsed=0,cueScanElapsed=0,restroomDripElapsed=0;
const observedClues=new Set(),cueCamera=new THREE.Vector3(),cueRotation=new THREE.Quaternion();
const roomLights=[];
const doorFallback=document.createElement('div');doorFallback.id='doorFallback';doorFallback.hidden=true;doorFallback.setAttribute('aria-hidden','true');doorFallback.innerHTML='<div class="old-door-frame"><div class="old-door-leaf"><span>员工 001</span><i></i></div></div>';app.appendChild(doorFallback);
function doorProgress(seconds){
  // 锁舌先松动，再以停顿的三段缓慢推开；结束前稍稍回弹。
  const knots=[[0,0],[.38,0],[1.10,.23],[1.28,.23],[1.89,.56],[2.08,.56],[3.12,1.025],[3.6,1]];
  for(let i=1;i<knots.length;i++){if(seconds<=knots[i][0]){const a=knots[i-1],b=knots[i],t=Math.max(0,(seconds-a[0])/(b[0]-a[0])),smooth=t*t*(3-2*t);return a[1]+(b[1]-a[1])*smooth;}}return 1;
}
function moveDoor(id,amount){
  if(props)props.setDoor(id,amount);
  if(id==='exit'&&restaurant)restaurant.hinges.forEach((hinge,i)=>{if(hinge)hinge.rotation.y=(i===0?1:-1)*1.45*amount;});
}
function openDoor(id,duration){
  rattleMotion=null;
  doorMotion={id,duration,elapsed:0,amount:0};moveDoor(id,0);audio.openDoor(id,duration);
  if(fallbackMode){doorFallback.dataset.kind=id;doorFallback.style.setProperty('--door-angle','0deg');doorFallback.hidden=false;}
  if(id==='officeDoor'&&!fallbackMode){camera.position.set(4.65,1.6,1.08);camera.lookAt(4.65,1.48,3.29);camera.updateMatrixWorld(true);}
}
function resize(){
  viewport.sync();
  pointerTap=null;if(walk&&game)pause(!game.isPlaying());
  const width=Math.max(1,app.clientWidth),height=Math.max(1,app.clientHeight);
  camera.aspect=width/height;camera.updateProjectionMatrix();
  if(renderer){const limit=low?1000000:1600000;const dpr=Math.min(low?1:1.3,window.devicePixelRatio||1,Math.sqrt(limit/(width*height)));renderer.setPixelRatio(dpr);renderer.setSize(width,height);}
}
function centerPoint(){return viewport.screenPoint(app.clientWidth/2,app.clientHeight/2);}
function pause(value){if(walk)walk.setEnabled(!value&&!document.hidden&&!fallbackMode);document.getElementById('movePad').style.display=!value&&!fallbackMode?'block':'none';if(renderer&&!value)renderer.domElement.focus({preventScroll:true});}
function travel(room){cameraSnapshot=null;if(walk)walk.teleport(room);fallbackRoom.value=room;paintFallback();pause(false);}
function inspectCamera(id){
  audio.setHidden(document.hidden);audio.setPaused(id==='pause'||id==='restart');
  if(!renderer||!props)return;
  if(!id){if(cameraSnapshot){camera.position.copy(cameraSnapshot.position);camera.quaternion.copy(cameraSnapshot.quaternion);cameraSnapshot=null;}return;}
  const entry=props.targets.find(t=>t.id===id);if(!entry)return;
  observedClues.add(id);props.cue(null,0);cueCandidate=null;cueDwell=0;
  if(!cameraSnapshot)cameraSnapshot={position:camera.position.clone(),quaternion:camera.quaternion.clone()};
  camera.position.set(entry.position[0]+entry.offset[0],entry.position[1]+entry.offset[1],entry.position[2]+entry.offset[2]);camera.lookAt(...entry.position);camera.updateMatrixWorld(true);
}
function sound(id){
  if(id.indexOf('piano:')===0){audio.piano(Number(id.split(':')[1]));return;}
  if(id==='completedMusic'){audio.completedMusic(window.KrustyState.MUSIC_PHRASE);return;}
  if(id==='pianoDemo'){audio.pianoPhrase(window.KrustyState.MUSIC_PHRASE);return;}
  if(id.indexOf('ui_')===0){const parts=id.split(':');audio.ui(parts[0].slice(3),parts[1]||'');return;}
  if(id==='cover'){
    return audio.startCover();
  }
  if(id==='report_call'||id==='report_siren'){audio.report(id);return;}
  if(id==='stopReport'){audio.stopAll();return;}
  if(id==='reset'){audio.stopAll();return;}
  if(id==='mute'){audio.setMuted(true);return;}
  if(id==='unmute'){audio.unlock();audio.setMuted(false);return;}
  if(id==='stopFilm'){audio.stop('film_projector');return;}
  if(id==='stopSpeech'){audio.stopSpeech();return;}
  if(['squid_message','crab_wages','crab_hours'].includes(id)){audio.speak(id);return;}
  if(['step','paper','key','door','descent','water','heat','metal','dial','click','melody','warmth','broadcast','shock','knock','stallKnock','rattle','drip','creak'].includes(id)){audio.foley(id);return;}
  audio.play(id,{loop:id==='film_projector'});
}
function stateChanged(s){
  if(props)props.sync(s);audio.setMuted(s.muted);
  paintFallback();
}
function begin(room,s){
  mode='interior';cameraSnapshot=null;stopped=false;fallbackRoom.value=room;
  doorMotion=null;scareMotion=null;rattleMotion=null;doorFallback.hidden=true;document.body.classList.remove('door-opening');
  observedClues.clear();cueCandidate=null;cueDwell=0;waterElapsed=0;if(props)props.resetEnvironment();
  if(restaurant)restaurant.hinges.forEach(h=>{if(h)h.rotation.y=0;});
  if(walk)walk.teleport(room);
  audio.stopAll();const hasAudio=audio.unlock();audio.setMuted(s.muted);audio.play('night_room',{loop:true});
  if(!hasAudio)game.toast('此设备无法播放声音；所有关键线索均可阅读。');
  paintFallback();pause(false);
}
function paintFallback(){
  if(!fallbackMode||!game)return;
  const s=game.read(),room=fallbackRoom.value;
  const entries={lobby:[['note','值班牌'],['order','最后一张订单'],['menu','夜班菜单'],['register','收银机'],['meal','四号桌的留餐'],['officeDoor','办公室门'],['exit','正门']],cashier:[['note','值班牌'],['order','最后一张订单'],['menu','夜班菜单'],['register','收银机'],['meal','四号桌的留餐'],['officeDoor','办公室门']],office:[['photo','员工合影'],['safe','保险柜'],['music','桌上的留声机'],['ledger','夜班账本']],kitchen:[['ingredients','旧食材'],['drawer0','餐具抽屉'],['drawer1','调料抽屉'],['drawer2','擦布抽屉'],['sink','水槽'],['fridge','冰柜'],['stove','炉台'],['hatch','地板舱口']],storage:[['projector','放映机'],['return','返回舱口']]};
  let rooms=room==='storage'?[]:[['lobby','大厅'],['kitchen','厨房']];if(s.flags.officeUnlocked&&room!=='storage')rooms.push(['office','办公室']);
  const objects=(entries[room]||entries.lobby).slice();if(room==='kitchen'&&!s.flags.potTaken)objects.push(['pot','备餐台上的锅']);if(room==='kitchen'&&s.flags.loopBroken)objects.push(['recipe','炉台旁的事故夹页']);if(room==='lobby'&&s.flags.loopBroken)objects.push(['envelope','工资信封']);
  if(room==='lobby'||room==='cashier')objects.push(['restroom','右侧厕所门']);
  fallback.innerHTML='<div class="fallback-rooms">'+rooms.map(r=>'<button class="small-control" data-fallback-room="'+r[0]+'">'+r[1]+'</button>').join('')+'</div><h2>'+({lobby:'大厅',cashier:'收银台',office:'蟹老板办公室',kitchen:'厨房',storage:'地下仓库'})[room]+'</h2><div class="fallback-objects">'+objects.map(r=>'<button class="puzzle-button" data-fallback-object="'+r[0]+'">'+r[1]+'</button>').join('')+'</div>';
}
fallback.addEventListener('click',e=>{
  if(!game.isPlaying())return;const r=e.target.closest('[data-fallback-room]'),o=e.target.closest('[data-fallback-object]');
  if(r){const room=r.dataset.fallbackRoom;if(room==='office'&&!game.read().flags.officeUnlocked)return;fallbackRoom.value=room;game.visit(room);paintFallback();}
  if(o)game.inspect(o.dataset.fallbackObject);
});
function enableFallback(reason){
  if(game)fallbackRoom.value=game.read().room;
  fallbackMode=reason||true;if(renderer)renderer.domElement.hidden=true;fallback.hidden=false;if(walk)walk.setEnabled(false);document.getElementById('movePad').style.display='none';paintFallback();
}
function targetAt(clientX,clientY){
  if(!props||!game.isPlaying()||!renderer||fallbackMode)return null;
  const point=viewport.localPoint(clientX,clientY);pointer.set(point.x/app.clientWidth*2-1,-point.y/app.clientHeight*2+1);camera.updateMatrixWorld(true);ray.setFromCamera(pointer,camera);
  const s=game.read(),allowed=props.targets.filter(t=>props.active(t,s));
  const hits=ray.intersectObjects(allowed.map(t=>t.mesh),false);if(!hits.length)return null;
  const hit=hits.find(h=>allowed.some(t=>t.mesh===h.object&&/^drawerContents/.test(t.id)))||hits.find(h=>allowed.some(t=>t.mesh===h.object&&(/^(drawer|faucet)/.test(t.id))))||hits[0];
  const entry=allowed.find(t=>t.mesh===hit.object);if(hit.distance>entry.maxDistance)return null;
  if((entry.room==='storage')!==(s.room==='storage'))return null;
  const opaque=ray.intersectObjects([restaurant.model,props.root],true).find(hit=>!hit.object.material.transparent);
  if(opaque&&opaque.distance+.35<hit.distance)return null;
  return entry;
}
function useTarget(entry){
  observedClues.add(entry.id);if(props)props.cue(null,0);cueCandidate=null;cueDwell=0;
  const f=game.read().flags;
  const locked=(entry.id==='officeDoor'&&!f.orderSolved)||(entry.id==='hatch'&&!f.thawed)||(entry.id==='exit'&&!f.loopBroken);
  if(locked){rattleMotion={id:entry.id,elapsed:0};sound('rattle');if(entry.id==='officeDoor'||entry.id==='hatch')game.toast('开门需要钥匙。');return;}
  if(props&&/^drawer/.test(entry.id)){
    const index=Number(entry.id.slice(-1)),id='drawer'+index,d=props.environmentStats().drawers[index];
    if(d.open){scareMotion=null;game.inspect(id);return;}
    props.interact(id);sound('metal');if(!game.isCalm()&&game.event('drawerKnock')){scareMotion={id,elapsed:0};audio.foley('knock');}return;
  }
  if(props&&props.interact(entry.id)){sound('water');return;}
  game.inspect(entry.id);
}
function nearbyClue(){
  if(!props||!game.isPlaying()||fallbackMode)return null;
  const state=game.read();camera.updateMatrixWorld(true);
  const choices=props.targets.filter(t=>props.hasCue(t.id)&&!observedClues.has(t.id)&&t.id!=='exit'&&props.active(t,state)&&(t.room==='storage')===(state.room==='storage')).map(t=>({t,d:camera.position.distanceTo(new THREE.Vector3(...t.position))})).filter(c=>c.d<=Math.min(c.t.maxDistance,3.2)).sort((a,b)=>a.d-b.d);
  for(const {t,d} of choices){
    const p=new THREE.Vector3(...t.position).project(camera);if(p.z>1||Math.abs(p.x)>.88||Math.abs(p.y)>.90)continue;
    ray.set(camera.position,new THREE.Vector3(...t.position).sub(camera.position).normalize());
    const solid=ray.intersectObjects([restaurant.model,props.root],true).find(h=>!h.object.material.transparent);
    if(!solid||solid.distance+.35>=d)return t.id;
  }
  return null;
}
try{
  renderer=new THREE.WebGLRenderer({antialias:false,alpha:false,powerPreference:'low-power'});
  renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label','夜班餐厅第一视角画面，拖动环顾，点击近处物件查看');renderer.domElement.id='gameCanvas';app.appendChild(renderer.domElement);
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NoToneMapping;renderer.shadowMap.enabled=false;
  scene.background=new THREE.Color(0x18252f);scene.fog=new THREE.Fog(0x18252f,17,40);
  scene.add(new THREE.HemisphereLight(0xa9bcb7,0x263744,.68));scene.add(new THREE.AmbientLight(0xa5b5aa,.38));
  const moon=new THREE.DirectionalLight(0x8fa5c2,.75);moon.position.set(-8,14,-7);scene.add(moon);
  for(const [x,y,z,color,intensity] of [[0,2.8,-4,0xe3b988,16],[2,2.7,1.3,0x91c7ae,21],[5,2.8,6.5,0xc3a899,18],[-2.7,2.8,6,0xa6c5a8,22],[0,-.85,5.5,0x8fbba9,16]]){const light=new THREE.PointLight(color,intensity,10,2);light.position.set(x,y,z);scene.add(light);roomLights.push({light,intensity});}
  dispatchEvent(new CustomEvent('krusty-loading',{detail:'正在布置最后一张订单…'}));
  restaurant=buildRestaurant(window.KrustySceneData,window.KrustyGeometry);scene.add(restaurant.model);baseCollisions.push(...restaurant.collisions);
  props=createNightProps(scene,new URLSearchParams(location.search).has('greybox'));props.proxies.visible=false;props.root.updateMatrixWorld(true);baseCollisions.push(...props.collisions);
  // 顶层大型几何数组不再保留额外副本；GPU 几何与包内文件仍可正常复用。
  window.KrustyGeometry=null;
  walk=createWalk(scene,camera,renderer.domElement,()=>baseCollisions,(x,z,y)=>{
    if(!game)return false;const f=game.read().flags;
    return y> -1&&!f.officeUnlocked&&x>gateBox.min.x-.23&&x<gateBox.max.x+.23&&z>gateBox.min.z-.23&&z<gateBox.max.z+.23;
  },room=>audio.step(room,walk?walk.getState().position:null));
  walk.teleport('entrance');resize();
  renderer.domElement.addEventListener('pointerdown',e=>{if(e.button!==0||!game.isPlaying())return;pointerTap={id:e.pointerId,x:e.clientX,y:e.clientY,moved:false};});
  renderer.domElement.addEventListener('pointermove',e=>{if(pointerTap&&e.pointerId===pointerTap.id&&Math.hypot(e.clientX-pointerTap.x,e.clientY-pointerTap.y)>7)pointerTap.moved=true;});
  renderer.domElement.addEventListener('pointerup',e=>{if(pointerTap&&e.pointerId===pointerTap.id){const tap=pointerTap;pointerTap=null;if(!tap.moved&&Math.hypot(e.clientX-tap.x,e.clientY-tap.y)<=7){const entry=targetAt(e.clientX,e.clientY);if(entry)useTarget(entry);}}});
  ['pointercancel','lostpointercapture'].forEach(type=>renderer.domElement.addEventListener(type,()=>{pointerTap=null;}));
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();losses++;enableFallback('lost');if(game)game.toast('三维画面已暂停，已切换到可继续解谜的轻量模式。');});
  renderer.domElement.addEventListener('webglcontextrestored',()=>{if(game)game.toast('图形能力已恢复；本班继续使用轻量模式，重新载入可恢复三维画面。');});
}catch(error){console.warn('启用轻量点击模式：',error.message);enableFallback();}

game=createGame({onSettings:value=>{audio.setPaused(value||(game.settingsOpen()||['pause','restart'].includes(game.currentView())));pause(value||!game.isPlaying());},onPause:pause,onStart:begin,onTravel:travel,onState:stateChanged,onSound:sound,onDialogue:seconds=>audio.holdForeground(seconds),onEnvironment:(id,action)=>{if(props){if(action==='close')props.closeDrawer(id);else props.interact(id);}sound(id==='faucet'?'water':'metal');},onDoor:openDoor,onInspect:inspectCamera,onFilm:index=>{if(props)props.screen.draw([['23:50 / 不准离店','23:55 / 超时打卡','23:59 / 事故原始记录'][index],'工号 001 / 小海','◀ 倒序读取门禁']);},onExit:()=>{mode='ending';audio.stopAll();}});
game.showMenu();if(fallbackMode)paintFallback();dispatchEvent(new Event('krusty-ready'));
addEventListener('keydown',e=>{if(e.code==='KeyE'&&game.isPlaying()&&!/INPUT|TEXTAREA/.test(e.target.tagName)){e.preventDefault();const point=centerPoint(),entry=targetAt(point.x,point.y);if(entry)useTarget(entry);}});
addEventListener('resize',resize);addEventListener('orientationchange',resize);addEventListener('krusty-viewport',resize);
if(window.ResizeObserver)new ResizeObserver(resize).observe(app);
function animate(now){
  if(document.hidden||stopped){raf=0;return;}raf=requestAnimationFrame(animate);
  if(last&&now-last<32)return;const dt=last?Math.min((now-last)/1000,.08):0;last=now;
  game.update(dt);if(walk&&!fallbackMode)walk.update(dt);
  worldTime+=dt;
  if(props&&mode==='interior'){
    props.update(dt);
    cueScanElapsed+=dt;if(cueScanElapsed>=.25){cueScanElapsed=0;centerTarget=nearbyClue();}
    const candidate=typeof centerTarget==='string'?centerTarget:null,moving=cueCamera.distanceTo(camera.position)>.015||cueRotation.angleTo(camera.quaternion)>.025;cueCamera.copy(camera.position);cueRotation.copy(camera.quaternion);
    if(candidate!==cueCandidate||moving||!game.isPlaying()){cueCandidate=candidate;cueDwell=0;props.cue(null,0);}
    else {cueDwell+=dt;props.cue(cueDwell>=8?candidate:null,Math.max(0,cueDwell-8));}
    if(game.isPlaying()&&game.readRoom()==='kitchen'&&props.environmentStats().faucetRunning){waterElapsed+=dt;if(waterElapsed>=1.25){waterElapsed=0;audio.foley('water');}}else waterElapsed=0;
    if(game.isPlaying()&&!game.isCalm()&&Math.hypot(camera.position.x-6.08,camera.position.z-3.00)<3){restroomDripElapsed+=dt;if(restroomDripElapsed>=2.4){restroomDripElapsed=0;audio.foley('drip');}}else restroomDripElapsed=0;
  }
  if(doorMotion){
    doorMotion.elapsed=Math.min(doorMotion.duration,doorMotion.elapsed+dt);doorMotion.amount=doorProgress(doorMotion.elapsed);moveDoor(doorMotion.id,doorMotion.amount);
    doorFallback.style.setProperty('--door-angle',(doorMotion.amount*(doorMotion.id==='hatch'?72:-83))+'deg');
    if(doorMotion.elapsed>=doorMotion.duration){moveDoor(doorMotion.id,1);doorMotion=null;scareMotion=null;doorFallback.hidden=true;}
  }
  if(rattleMotion){rattleMotion.elapsed+=dt;const t=Math.min(1,rattleMotion.elapsed/.65);moveDoor(rattleMotion.id,.014*Math.sin(t*Math.PI*8)*(1-t));if(t>=1){moveDoor(rattleMotion.id,0);rattleMotion=null;}}
  if(scareMotion&&game.isPlaying()){scareMotion.elapsed+=dt;if(scareMotion.elapsed>=1.65&&!scareMotion.struck){scareMotion.struck=true;props.closeDrawer(scareMotion.id);audio.foley('shock');}if(scareMotion.elapsed>=2.5)scareMotion=null;}
  roomLights.forEach((entry,i)=>{
    const hum=.985+.015*Math.sin(worldTime*1.7+i),dip=doorMotion?1-.48*Math.exp(-Math.pow((doorMotion.elapsed-.54)/.2,2))-.18*Math.exp(-Math.pow((doorMotion.elapsed-1.94)/.15,2)):1;
    const shock=scareMotion&&scareMotion.elapsed>1.65&&scareMotion.elapsed<1.88?.055:1;entry.light.intensity=entry.intensity*hum*dip*shock;
  });
  if(mode==='menu')audio.updateCover(dt,game.coverTime());
  else if(mode==='interior')audio.update(dt,game.readRoom(),game.progress(),game.isCalm());
  roomElapsed+=dt;promptElapsed+=dt;metricsElapsed+=dt;
  if(roomElapsed>.2){roomElapsed=0;if(game.isPlaying())game.visit(fallbackMode?fallbackRoom.value:walk.getState().room);}
  if(promptElapsed>.12)promptElapsed=0;
  if(renderer&&!fallbackMode)renderer.render(scene,camera);
  frames++;
  if(!sampleStart)sampleStart=now;
  if(metricsElapsed>=3){fps=Math.round(frames*1000/(now-sampleStart));frames=0;sampleStart=now;metricsElapsed=0;if(renderer&&!low&&(fps<23||renderer.info.render.calls>100)){low=true;resize();}else if(renderer&&low&&fps<12&&game.isPlaying()){enableFallback('slow');game.toast('已切换轻量点击模式，进度保留。');}}
}
document.addEventListener('visibilitychange',()=>{if(document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;pause(true);audio.setHidden(true);}else{last=0;sampleStart=0;frames=0;metricsElapsed=0;audio.setHidden(false);audio.setPaused((game.settingsOpen()||['pause','restart'].includes(game.currentView())));pause(!game.isPlaying());if(!raf)raf=requestAnimationFrame(animate);}});
// 只读验收信息；不提供跳关、改状态或瞬移入口。
window.__nightDebug={snapshot:()=>({state:game.read(),view:game.currentView(),settingsOpen:game.settingsOpen(),selected:game.getSelected(),mode,viewport:{rotated:viewport.rotated(),width:app.clientWidth,height:app.clientHeight},walk:walk?walk.getState():null,fallback:!!fallbackMode,low,fps,losses,environment:props?props.environmentStats():null,clueCue:{candidate:cueCandidate,dwell:cueDwell,observed:Array.from(observedClues)},rattle:rattleMotion?Object.assign({},rattleMotion):null,scare:scareMotion?Object.assign({},scareMotion):null,doors:{motion:doorMotion?Object.assign({},doorMotion):null,hinges:props?props.doorStats():null,front:restaurant?restaurant.hinges.map(h=>h?h.rotation.y:null):[]},render:renderer?{calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,width:renderer.domElement.width,height:renderer.domElement.height}:null,audio:audio.stats(),targets:props?props.targets.map(t=>({id:t.id,position:t.position,active:props.active(t,game.read())})):[],collisions:baseCollisions.map(b=>({min:b.min.toArray(),max:b.max.toArray()})),gate:gateBox?{min:gateBox.min.toArray(),max:gateBox.max.toArray()}:null}),screenPoint:id=>{if(!props)return null;const t=props.targets.find(x=>x.id===id);if(!t)return null;const p=new THREE.Vector3(...t.position).project(camera);const point=viewport.screenPoint((p.x+1)*app.clientWidth/2,(1-p.y)*app.clientHeight/2);return {x:point.x,y:point.y,z:p.z};}};
raf=requestAnimationFrame(animate);


})();