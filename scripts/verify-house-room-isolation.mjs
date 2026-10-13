import {spawn} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const before=process.argv.includes('--before'),live=process.argv.includes('--live');
const out='docs/house-room-isolation-review';mkdirSync(out,{recursive:true});
const port=9600+process.pid%500;
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',[`--remote-debugging-port=${port}`,`--user-data-dir=${process.cwd()}/tmp/isolation-chrome-${Date.now()}`,'--headless=new','--no-first-run','--no-default-browser-check','--enable-unsafe-swiftshader','--window-size=1440,900','about:blank'],{stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
let ws,sid,id=0;const pending=new Map(),records=[],errors=[],failures=[],serviceFailures=[],requests=new Map();
try {
  let url;for(let n=0;n<40;n++){try{url=(await(await fetch(`http://127.0.0.1:${port}/json/version`)).json()).webSocketDebuggerUrl;break;}catch{await delay(300);}}
  ws=new WebSocket(url);await new Promise(r=>ws.onopen=r);
  ws.onmessage=e=>{const d=JSON.parse(e.data);if(d.id){const p=pending.get(d.id);pending.delete(d.id);d.error?p?.reject(new Error(JSON.stringify(d.error))):p?.resolve(d.result);}else if(d.method==='Runtime.exceptionThrown')errors.push(d.params.exceptionDetails);else if(d.method==='Network.requestWillBeSent')requests.set(d.params.requestId,d.params.request.url);else if(d.method==='Network.loadingFailed'&&!d.params.canceled){const failure={url:requests.get(d.params.requestId),error:d.params.errorText};(failure.url?.includes('/house-api/health')?serviceFailures:failures).push(failure);}};
  const call=(method,params={},session=sid)=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params,...(session?{sessionId:session}:{})}));});
  const t=await call('Target.createTarget',{url:'about:blank'},null);sid=(await call('Target.attachToTarget',{targetId:t.targetId,flatten:true},null)).sessionId;
  await call('Runtime.enable');await call('Page.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});
  const ev=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  const wait=async expr=>{for(let n=0;n<180;n++){if(await ev(expr))return;await delay(400);}throw new Error('timeout '+expr);};
  const click=async selector=>{const p=await ev(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()`);assert(p.x>0&&p.y>0);await call('Input.dispatchMouseEvent',{type:'mouseMoved',button:'none',buttons:0,...p});await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...p});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,...p});};
  const shot=async name=>writeFileSync(`${out}/${name}.png`,Buffer.from((await call('Page.captureScreenshot',{format:'png'})).data,'base64'));
  const state=()=>ev(`(()=>{const h=window.__pineappleHouse,meshes=[];h.scene.traverse(n=>{if(!n.isMesh)return;let p=n;while(p){if(!p.visible)return;p=p.parent;}if(n.userData.roomId){const m=Array.isArray(n.material)?n.material:[n.material];meshes.push({name:n.name,room:n.userData.roomId,level:n.userData.level,roofAccess:!!n.userData.roofAccess,clipping:m.map(x=>(x.clippingPlanes??[]).map(p=>[...p.normal.toArray(),p.constant]))});}});return{...h.snapshot(),meshes}})()`);
  const base=live?'https://gsyiswatchingu.github.io':'http://127.0.0.1:8783';
  for(const [width,height]of before?[[1440,900]]:[[1440,900],[390,844]]){
    await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});
    await call('Page.navigate',{url:base+'/pineapple-companion.html?privacy&t='+Date.now()});await wait('window.__pineappleHouse?.snapshot().state==="ready" && window.__pineappleHouse?.companion?.snapshot().loaded');await delay(900);
    const whole=await state();
    for(const room of before?['living']:['living','storage','bathroom','bedroom','library','roof']){
      await click(`[data-house-room="${room}"]`);await wait(`window.__pineappleHouse.snapshot().view===${JSON.stringify(room)} && document.querySelector('.house').dataset.cameraTransition==='idle'`);await delay(200);
      const s=await state();records.push({viewport:[width,height],room,state:s});await shot(`${before?'before':live?'live':'local'}-${width}-${room}`);
      if(!before){
        assert(!s.meshes.some(m=>m.room==='structure'||m.room==='ground'||m.name==='roof_L3_leaf'),'whole-house remnants');
        for(const m of s.meshes){const stairs=m.room==='stairs'&&(room==='bedroom'&&m.level===2||room==='roof'&&(m.level===3||m.roofAccess));const shared=room==='storage'&&m.room==='living';const companion=m.room===room;assert(companion||stairs||shared,`foreign room ${room} ${m.name} ${m.room}`);if((room==='living'||shared)&&m.room==='living'&&m.name!==''){/* separate props can remain unclipped */}}
        if(room==='storage')assert(s.meshes.some(m=>m.clipping.some(p=>p.some(v=>v[0]===-1&&v[3]===-2.55))),'storage shared surfaces clipped');
        if(room==='living')assert(s.meshes.some(m=>m.clipping.some(p=>p.some(v=>v[0]===1&&v[3]===2.55))),'living shared surfaces clipped');
        if(room==='roof')assert(s.meshes.some(m=>m.room==='stairs'&&m.roofAccess),'roof exit remains');
      }
      await click('[data-house-back]');await wait('window.__pineappleHouse.snapshot().view==="whole" && document.querySelector(".house").dataset.cameraTransition==="idle"');
      const restored=await state();assert.equal(restored.meshes.length,whole.meshes.length);assert(restored.meshes.every(m=>m.clipping.every(p=>p.length===0)));
    }
    if(!before)await shot(`${live?'live':'local'}-${width}-whole`);
  }
  if(!before){
    await call('Emulation.setDeviceMetricsOverride',{width:670,height:510,deviceScaleFactor:1,mobile:false});
    await call('Page.navigate',{url:base+'/?privacy&t='+Date.now()});await wait('window.__pineappleHouse?.snapshot().state==="ready"');
    await click('[data-house-room="living"]');await wait('document.querySelector(".house").dataset.cameraTransition==="idle"');
    for(let n=0;n<3;n++){await call('Input.dispatchMouseEvent',{type:'mouseWheel',x:335,y:255,deltaX:0,deltaY:300});await delay(250);}
    await delay(500);const s=await state();assert.equal(s.view,'living');assert(!s.meshes.some(m=>m.room==='structure'||m.room==='storage'));records.push({viewport:[670,510],room:'homepage-living-zoomed-out',state:s});await shot(`${live?'live':'local'}-670-living-zoomed-out`);
    await click('[data-house-object="laptop-profile"]');await wait('document.querySelector("[data-house-profile]")?.open || document.querySelector("dialog[open]")');await shot(`${live?'live':'local'}-profile-interaction`);
  }
  console.log(JSON.stringify({errors,failures}));
  assert.equal(errors.length,0);if(!before)assert.equal(failures.length,0);
  writeFileSync(`${out}/${before?'before':live?'live':'local'}-results.json`,JSON.stringify({status:'passed',records,errors,failures,serviceFailures,limitations:['手机为 Chrome 视口模拟，实机未测。','陪伴聊天健康请求的环境连接失败单独记录，不代表模型资源错误。']},null,2)+'\n');console.log(JSON.stringify({status:'passed',rooms:records.length,errors,failures,serviceFailures}));
}finally{ws?.close();chrome.kill();}
