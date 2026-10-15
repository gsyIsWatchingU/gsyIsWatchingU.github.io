// 实际加载、原生输入与模型可见性验收；不通过调试接口切换房间。
import {spawn} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const live=process.argv.includes('--live'),out=`docs/house-opening-review/${live?'live':'local'}`;
mkdirSync(out,{recursive:true});
const port=9800+process.pid%100,records=[],errors=[],failures=[],serviceFailures=[],requests=new Map(),pending=new Map();
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',[`--remote-debugging-port=${port}`,`--user-data-dir=${process.cwd()}/tmp/opening-chrome-${Date.now()}`,'--headless=new','--no-first-run','--no-default-browser-check',...(live?[]:['--no-proxy-server']),'--ignore-gpu-blocklist','--window-size=1440,900','about:blank'],{stdio:'ignore'});
let ws,sid,id=0,expectedFailure=false,code=0,hold=false;
const held=new Map(),delay=ms=>new Promise(r=>setTimeout(r,ms));
const call=(method,params={},session=sid)=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params,...(session?{sessionId:session}:{})}));});
const ev=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
async function wait(expr,timeout=90000){const start=Date.now();while(Date.now()-start<timeout){if(await ev(expr))return;await delay(250);}throw Error('timeout: '+expr);}
async function click(selector){const p=await ev(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});e.scrollIntoView({block:'nearest',inline:'nearest'});const r=e.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()`);await clickPoint(p);}
async function clickPoint(p){await call('Input.dispatchMouseEvent',{type:'mouseMoved',button:'none',buttons:0,...p});await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...p});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,...p});}
const shot=async name=>writeFileSync(`${out}/${name}.png`,Buffer.from((await call('Page.captureScreenshot',{format:'png'})).data,'base64'));
const settled=()=>wait('document.querySelector(".house").dataset.cameraTransition==="idle"');
const loader=()=>ev('(()=>{const e=document.querySelector(".house-loading"),r=e.getBoundingClientRect();return{state:document.querySelector(".house").dataset.houseState,canvas:getComputedStyle(document.querySelector("canvas")).visibility,x:r.x,y:r.y,width:r.width,height:r.height,viewport:[innerWidth,innerHeight],percent:document.querySelector("progress").value,animation:document.querySelector(".loading-buoy").getAnimations().map(a=>({state:a.playState,time:a.currentTime})),transform:getComputedStyle(document.querySelector(".loading-buoy")).transform}})()');
async function release(name){const key=held.get(name);assert(key,`expected held ${name}`);held.delete(name);await call('Fetch.continueRequest',{requestId:key});}
try{
  let debuggerUrl;for(let n=0;n<40;n++){try{debuggerUrl=(await(await fetch(`http://127.0.0.1:${port}/json/version`)).json()).webSocketDebuggerUrl;break;}catch{await delay(250);}}
  ws=new WebSocket(debuggerUrl);await new Promise(r=>ws.onopen=r);
  ws.onmessage=e=>{const d=JSON.parse(e.data);if(d.id){const p=pending.get(d.id);pending.delete(d.id);d.error?p?.reject(Error(JSON.stringify(d.error))):p?.resolve(d.result);return;}if(d.sessionId!==sid)return;
    if(d.method==='Runtime.exceptionThrown')errors.push(d.params.exceptionDetails);
    if(d.method==='Network.requestWillBeSent')requests.set(d.params.requestId,d.params.request.url);
    if(d.method==='Network.loadingFailed'&&!d.params.canceled){const f={url:requests.get(d.params.requestId),error:d.params.errorText};if(f.url?.includes('/house-api/'))serviceFailures.push(f);else if(!expectedFailure)failures.push(f);}
    if(d.method==='Fetch.requestPaused'){const name=d.params.request.url.includes('spongebob.glb')?'companion':'structure';if(expectedFailure&&name==='companion'){call('Fetch.failRequest',{requestId:d.params.requestId,errorReason:'Failed'}).catch(()=>{});expectedFailure=false;}else if(hold)held.set(name,d.params.requestId);else call('Fetch.continueRequest',{requestId:d.params.requestId}).catch(()=>{});}
  };
  const target=await call('Target.createTarget',{url:'about:blank'},null);sid=(await call('Target.attachToTarget',{targetId:target.targetId,flatten:true},null)).sessionId;
  await call('Runtime.enable');await call('Page.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});
  await call('Fetch.enable',{patterns:[{urlPattern:'*structure.glb*'},{urlPattern:'*spongebob.glb*'}]});
  const base=live?'https://gsyiswatchingu.github.io':'http://127.0.0.1:8781';
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});hold=true;
  await call('Page.navigate',{url:base+'/?t='+Date.now()});await wait('Number(document.querySelector(".house")?.dataset.loadedModels)>3');
  const first=await loader();assert.equal(first.state,'loading');assert.equal(first.canvas,'hidden');assert.equal(first.width,390);assert.equal(first.height,844);assert.equal(first.x,0);assert.equal(first.y,0);assert(first.animation.some(a=>a.state==='running'));await delay(250);assert.notEqual((await loader()).transform,first.transform);await shot('loading');records.push({test:'partial-models-hidden-with-active-fullscreen-animation',value:first});
  await release('structure');await wait('Number(document.querySelector(".house").dataset.loadedModels)===window.__pineappleHouse.config.assets.length+1',live?240000:90000);
  const pendingCompanion=await loader();assert.equal(pendingCompanion.state,'loading');assert(pendingCompanion.percent<100);assert.equal(await ev('window.__pineappleHouse.companion.snapshot().loaded'),false);records.push({test:'loader-waits-for-companion',value:pendingCompanion});
  hold=false;await release('companion');await wait('window.__pineappleHouse?.snapshot().state==="ready" && window.__pineappleHouse.companion.snapshot().loaded');await delay(300);
  assert.equal(await ev('document.querySelector(".house-loading").hidden'),true);assert.equal(await ev('getComputedStyle(document.querySelector(".companion-hud")).display'),'none');records.push({test:'homepage-companion-loaded-without-preview-controls',passed:true});
  for(const [width,height] of [[1440,900],[390,844]]){
    await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});await delay(300);
    for(const room of ['living','storage','bathroom','bedroom','library','roof']){
      await click(`[data-house-room="${room}"]`);await settled();await delay(250);
      const s=await ev(`(()=>{const meshes=[];window.__pineappleHouse.scene.traverse(n=>{if(!n.isMesh)return;for(let p=n;p;p=p.parent)if(!p.visible)return;let a=n;while(a&&!a.userData.assetId)a=a.parent;if(a?.userData.assetId==='structure')meshes.push({name:n.name,room:n.userData.roomId,shared:n.userData.occluder||n.name==='living_L0_sand'});});return{view:window.__pineappleHouse.snapshot().view,meshes,labels:[...document.querySelectorAll('[data-house-passage]:not([hidden])')].map(e=>e.textContent)}})()`);
      assert.equal(s.view,room);assert(!s.meshes.some(n=>n.room==='stairs'));assert(s.meshes.every(n=>n.room===room||room==='storage'&&n.room==='living'&&n.shared));assert(s.labels.every(t=>/^→ [^→]+$/.test(t)&&!/(穿门|下楼|上楼)/.test(t)));assert.equal(await ev('document.documentElement.scrollWidth<=innerWidth'),true);records.push({test:`isolated-${width}-${room}`,value:s});
      await shot(`${width}-${room}`);
      await click('[data-house-back]');await settled();
    }
    await click('[data-house-room="bathroom"]');await settled();await click('[data-house-passage="bathroom-library"]');await settled();assert.equal(await ev('window.__pineappleHouse.snapshot().view'),'library');records.push({test:`arrow-navigation-${width}`,passed:true});await click('[data-house-back]');await settled();
  }
  await click('[data-house-room="bedroom"]');await settled();await delay(2500);
  const point=await ev('(()=>{const h=window.__pineappleHouse,p=h.companion.actor.position.clone();p.y+=h.companion.snapshot().height*.6;p.project(h.camera);const r=document.querySelector("canvas").getBoundingClientRect();return{x:r.x+(p.x*.5+.5)*r.width,y:r.y+(-p.y*.5+.5)*r.height}})()');await clickPoint(point);await wait('document.querySelector(".companion-chat").open');await shot('character-chat');await click('[data-companion-close]');records.push({test:'real-companion-click-opens-chat',passed:true});
  const unexpectedBeforeFailure=failures.length;
  expectedFailure=true;await call('Page.navigate',{url:base+'/?failure-check&t='+Date.now()});await wait('document.querySelector(".house")?.dataset.houseState==="error"');
  assert.equal(await ev('document.querySelector(".house-error").hidden'),false);assert.equal(await ev('getComputedStyle(document.querySelector("canvas")).visibility'),'hidden');await shot('character-failure');
  await click('[data-house-retry]');await wait('window.__pineappleHouse?.snapshot().state==="ready" && window.__pineappleHouse.companion.snapshot().loaded');records.push({test:'character-failure-and-retry',passed:true});
  // 注入的一次网络失败单独登记；不计为意外资源失败。
  const injected=failures.splice(unexpectedBeforeFailure).filter(f=>f.url?.includes('spongebob.glb'));records.push({test:'injected-failure',value:injected});
  assert.equal(errors.length,0);assert.equal(failures.length,0);if(live)assert.equal(serviceFailures.length,0);
  writeFileSync(`${out}/results.json`,JSON.stringify({status:'passed',records,errors,failures,serviceFailures,limitations:['手机为浏览器视口模拟，实机未测','角色网络失败为明确注入的验收场景']},null,2)+'\n');console.log(JSON.stringify({status:'passed',checks:records.length,errors,failures,serviceFailures}));
}catch(error){code=1;writeFileSync(`${out}/results.json`,JSON.stringify({status:'failed',error:String(error),records,errors,failures,serviceFailures},null,2));console.error(error);}
finally{ws?.close();chrome.kill();setTimeout(()=>process.exit(code),500);}
