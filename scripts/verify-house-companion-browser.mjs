// 独立 Chrome，仅用真实鼠标/键盘操作；snapshot 只用于读取证据。
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const out='docs/house-companion-review/browser';mkdirSync(out,{recursive:true});
const port=9500+(process.pid%1000),profile=`${process.cwd()}/tmp/companion-chrome-${Date.now()}`;
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',[`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`,'--headless=new','--no-first-run','--no-default-browser-check','--enable-unsafe-swiftshader','--window-size=1440,900','--autoplay-policy=no-user-gesture-required','about:blank'],{stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const records=[],errors=[],failures=[];let ws,id=0,sessionId,handleFetch;
const resultFile=`${out}/${process.argv.includes('--fixtures')?'results-fixtures':'results'}.json`;
const pending=new Map();
try {
  let url;for(let n=0;n<30;n++){try{url=(await (await fetch(`http://127.0.0.1:${port}/json/version`)).json()).webSocketDebuggerUrl;break;}catch{await delay(500);}}
  ws=new WebSocket(url);await new Promise(r=>ws.onopen=r);
  ws.onmessage=event=>{const data=JSON.parse(event.data);if(data.id){const callback=pending.get(data.id);pending.delete(data.id);if(data.error)callback?.reject(new Error(JSON.stringify(data.error)));else callback?.resolve(data.result);}else if(data.method==='Fetch.requestPaused')handleFetch?.(data.params).catch(()=>{});else if(data.method==='Runtime.exceptionThrown')errors.push(data.params.exceptionDetails);else if(data.method==='Network.loadingFailed' && !data.params.canceled)failures.push(data.params.errorText);};
  const call=(method,params={},sid=sessionId)=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params,...(sid?{sessionId:sid}:{})}));});
  const target=await call('Target.createTarget',{url:'about:blank'},null);sessionId=(await call('Target.attachToTarget',{targetId:target.targetId,flatten:true},null)).sessionId;
  await call('Runtime.enable');await call('Page.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});
  const evaluate=async expression=>{const result=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw new Error(JSON.stringify(result.exceptionDetails));return result.result?.value;};
  const shot=async name=>{const result=await call('Page.captureScreenshot',{format:'png'});writeFileSync(`${out}/${name}.png`,Buffer.from(result.data,'base64'));};
  const wait=async(expression,timeout=45000)=>{const start=Date.now();while(Date.now()-start<timeout){if(await evaluate(expression))return;await delay(400);}throw new Error('timeout: '+expression);};
  const snapshot=()=>evaluate('window.__pineappleHouse.companion.snapshot()');
  const click=async selector=>{const rect=await evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()`);await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...rect});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,...rect});};
  const viewport=async(width,height)=>call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});
  await viewport(1440,900);await call('Page.navigate',{url:'http://127.0.0.1:8769/pineapple-companion.html'});
  await wait('document.querySelector(".house").dataset.houseState==="ready" && document.querySelector(".house").dataset.companionState==="ready"');
  const initial=await snapshot();records.push({test:'ready',value:initial});assert(initial.loaded);assert(initial.bones.length>=12);assert(initial.animations.includes('walk'));await delay(2200);await shot('desktop-whole');
  for(const room of ['bedroom','bathroom','living','storage','library','roof']){
    await click(`[data-house-room="${room}"]`);await delay(2700);const value=await snapshot();assert.equal(value.room,room);assert(value.following);records.push({test:'room-'+room,value});await shot('desktop-'+room);await click('[data-house-back]');await delay(850);
  }
  await click('[data-house-room="bedroom"]');await delay(2500);
  const projectActor=()=>evaluate('(()=>{const h=window.__pineappleHouse,p=h.companion.actor.position.clone();p.y+=.95;p.project(h.camera);const r=document.querySelector("canvas").getBoundingClientRect();return{x:r.x+(p.x*.5+.5)*r.width,y:r.y+(-p.y*.5+.5)*r.height}})()');
  let hit=await projectActor();await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...hit});await call('Input.dispatchMouseEvent',{type:'mouseMoved',button:'left',buttons:1,x:hit.x+45,y:hit.y+10});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,x:hit.x+45,y:hit.y+10});await delay(250);assert.equal((await snapshot()).chatOpen,false);records.push({test:'drag-not-click',value:true});
  hit=await projectActor();await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...hit});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,...hit});await wait('document.querySelector(".companion-chat").open');records.push({test:'actual-character-raycast-click',value:true});const paused=await snapshot();await delay(1600);assert.equal((await snapshot()).day,paused.day);await shot('desktop-chat');
  await click('#companion-input');await call('Input.insertText',{text:'去睡觉吧'});await click('.companion-chat [type=submit]');await wait('document.querySelector("[data-companion-status]").textContent.includes("尚未配置")');records.push({test:'missing-key-visible',value:await evaluate('document.querySelector("[data-companion-status]").textContent')});
  await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});assert.equal(await evaluate('document.querySelector(".companion-chat").open'),false);
  await delay(500);await click('[data-companion-audition]');await delay(1600);const audio=await evaluate('(()=>{const a=document.querySelector("audio[data-companion-audio]");return{paused:a.paused,time:a.currentTime,duration:a.duration,src:a.currentSrc,error:a.error?.message,status:document.querySelector("[data-companion-status]").textContent}})()');records.push({test:'real-gpu-voice-playback',value:audio});assert(!audio.paused&&audio.time>0);
  // 使用原生 select 的键盘选项选择睡觉（第5项）。
  await click('[data-companion-action]');await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Home',code:'Home',windowsVirtualKeyCode:36});for(let n=0;n<4;n++)await call('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowDown',code:'ArrowDown',windowsVirtualKeyCode:40});await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await delay(2700);records.push({test:'sleep-preview',value:await snapshot()});await shot('desktop-sleep');
  const contact=await evaluate('(()=>{const h=window.__pineappleHouse,c=h.companion;let minimum=Infinity;c.actor.traverse(n=>{if(!n.isSkinnedMesh)return;for(let i=0;i<n.geometry.attributes.position.count;i++){const v=n.getVertexPosition(i,n.position.clone());v.applyMatrix4(n.matrixWorld);minimum=Math.min(minimum,v.y);}});return{minimumY:minimum,bedHeight:c.snapshot().bedHeight,gap:minimum-c.snapshot().bedHeight};})()');records.push({test:'sleep-bed-contact',value:contact});assert(Math.abs(contact.gap)<.12,'sleep must touch mattress');
  if(process.argv.includes('--fixtures')) {
    let speechFails=true;
    handleFetch=async event=>{
      if(event.request.method==='OPTIONS'){await call('Fetch.fulfillRequest',{requestId:event.requestId,responseCode:204,responseHeaders:[{name:'Access-Control-Allow-Origin',value:'*'},{name:'Access-Control-Allow-Headers',value:'content-type'},{name:'Access-Control-Allow-Methods',value:'POST, GET, OPTIONS'}]});return;}
      let responseCode=200,contentType='application/json',body;
      if(event.request.url.endsWith('/speech')){if(speechFails){responseCode=503;body=Buffer.from(JSON.stringify({detail:'测试夹具：语音暂时不可用，可重播'}));}else{contentType='audio/wav';body=readFileSync('docs/house-companion-review/welcome.wav');}}
      else {const input=JSON.parse(event.request.postData??'{}');if(input.message?.includes('延迟'))await delay(1800);body=Buffer.from(JSON.stringify({turnId:'fixture-turn-id',reply:'测试夹具：我这就去睡觉，晚安！',action:'sleep'}));}
      await call('Fetch.fulfillRequest',{requestId:event.requestId,responseCode,responseHeaders:[{name:'Content-Type',value:contentType},{name:'Access-Control-Allow-Origin',value:'*'}],body:body.toString('base64')});
    };
    await call('Fetch.enable',{patterns:[{urlPattern:'*/house-api/chat'},{urlPattern:'*/house-api/speech'}]});
    await click('[data-companion-open]');await click('#companion-input');await call('Input.insertText',{text:'去睡觉吧'});await click('.companion-chat [type=submit]');await wait('document.querySelector("[data-companion-status]").textContent.includes("测试夹具")');await delay(2500);
    const commanded=await snapshot();assert.equal(commanded.action,'sleep');assert.equal(commanded.entryTime,2);records.push({test:'fixture-chat-drives-animation-while-open',value:commanded});
    speechFails=false;await click('[data-companion-replay]');await wait('window.__pineappleHouse.companion.snapshot().speaking');await click('[data-companion-mute]');assert.equal((await snapshot()).speaking,false);records.push({test:'fixture-replay-and-mute',value:true});await click('[data-companion-mute]');
    await click('#companion-input');await call('Input.insertText',{text:'延迟回复测试'});await click('.companion-chat [type=submit]');await delay(100);await click('[data-companion-close]');await delay(2200);assert.equal(await evaluate('document.querySelectorAll(".companion-message.assistant").length'),1);records.push({test:'fixture-stale-response-dropped',value:true});await call('Fetch.disable');
  }
  await click('[data-house-back]');await delay(800);
  await viewport(390,844);await delay(1000);await shot('mobile-whole');await click('[data-house-room="bedroom"]');await delay(2500);await shot('mobile-bedroom');await click('[data-companion-open]');await delay(400);await shot('mobile-chat');assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'));await click('[data-companion-close]');await click('[data-house-back]');
  if(process.argv.includes('--cycle')){
    const phases=new Set();const started=Date.now();while(Date.now()-started<123000){const value=await snapshot();phases.add(value.phase);records.push({test:'real-time-cycle',seconds:Math.round((Date.now()-started)/1000),room:value.room,action:value.action,day:value.day,phase:value.phase});await delay(4000);}assert.equal(phases.size,6);
  }
  await call('Page.navigate',{url:'http://127.0.0.1:8769/pineapple-house.html'});await wait('document.querySelector(".house").dataset.houseState==="ready"');assert.equal(await evaluate('window.__pineappleHouse.companion'),null);assert.equal(await evaluate('document.querySelectorAll(".companion-hud").length'),0);records.push({test:'homepage-default-isolation',value:true});
  assert.equal(errors.length,0);assert.equal(failures.length,0);
  writeFileSync(resultFile,JSON.stringify({status:'passed',records,errors,failures,fixtures:process.argv.includes('--fixtures'),limitations:['mobile viewport simulation; real phone not tested','DeepSeek real reply not tested: server key absent']},null,2)+'\n');
  console.log(JSON.stringify({status:'passed',checks:records.length,errors,failures}));
} catch(error){writeFileSync(resultFile,JSON.stringify({status:'failed',error:String(error),records,errors,failures},null,2));throw error;}
finally{ws?.close();chrome.kill();}
