// 真实 Chrome 点击：来访选择、角色开口、房间动作、输入与手机布局。
import {spawn} from 'node:child_process';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const live=process.argv.includes('--live'),base=live?'https://gsyiswatchingu.github.io':process.env.CHAT_TEST_BASE??'http://127.0.0.1:8769';
const out=`docs/house-chat-review/${live?'live':'local'}`;mkdirSync(out,{recursive:true});
const port=9700+process.pid%200,records=[],errors=[],failures=[],apiRequests=[];
const config=JSON.parse(readFileSync('src/data/house-companion.json','utf8'));
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',[`--remote-debugging-port=${port}`,`--user-data-dir=${process.cwd()}/tmp/chat-context-chrome-${Date.now()}`,'--headless=new','--no-first-run','--no-default-browser-check','--enable-unsafe-swiftshader','--window-size=1440,900','about:blank'],{stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms));let ws,sid,id=0;const pending=new Map();
try {
  let url;for(let n=0;n<40;n++){try{url=(await(await fetch(`http://127.0.0.1:${port}/json/version`)).json()).webSocketDebuggerUrl;break;}catch{await delay(300);}}
  ws=new WebSocket(url);await new Promise(r=>ws.onopen=r);
  ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p?.reject(new Error(JSON.stringify(m.error))):p?.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);else if(m.method==='Network.loadingFailed'&&!m.params.canceled)failures.push(m.params.errorText);else if(m.method==='Network.requestWillBeSent'&&m.params.request.url.endsWith('/chat')&&m.params.request.postData)apiRequests.push(JSON.parse(m.params.request.postData));};
  const call=(method,params={},sessionId=sid)=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params,...(sessionId?{sessionId}:{})}));});
  const target=await call('Target.createTarget',{url:'about:blank'},null);sid=(await call('Target.attachToTarget',{targetId:target.targetId,flatten:true},null)).sessionId;
  await call('Runtime.enable');await call('Page.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});
  const ev=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result?.value;};
  const wait=async(expression,timeout=90000)=>{const start=Date.now();while(Date.now()-start<timeout){if(await ev(expression))return;await delay(350);}throw new Error('timeout: '+expression);};
  const clickAt=async point=>{await call('Input.dispatchMouseEvent',{type:'mouseMoved',button:'none',buttons:0,...point});await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...point});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,...point});};
  const click=async selector=>clickAt(await ev(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()`));
  const shot=async name=>writeFileSync(`${out}/${name}.png`,Buffer.from((await call('Page.captureScreenshot',{format:'png'})).data,'base64'));
  const character=async()=>{
    const point=await ev('(()=>{const h=window.__pineappleHouse,p=h.companion.actor.position.clone();p.y+=.65;p.project(h.camera);const r=document.querySelector("canvas").getBoundingClientRect();return{x:r.x+(p.x*.5+.5)*r.width,y:r.y+(-p.y*.5+.5)*r.height}})()');
    await clickAt(point);await wait('document.querySelector(".companion-chat").open',5000);
  };
  const enterRoom=async room=>{await click(`[data-house-room="${room}"]`);await delay(room==='library'?6500:2800);};
  const checkChat=async(room,purpose)=>{
    const value=await ev('(()=>{const d=document.querySelector(".companion-chat"),r=d.getBoundingClientRect();return{opening:d.querySelector(".companion-message.assistant")?.textContent,tags:[...d.querySelectorAll("[data-action]")].map(n=>n.dataset.action),userMessages:d.querySelectorAll(".companion-message.user").length,hints:!!d.querySelector("small,[data-companion-config],label,input[placeholder]"),x:r.x,y:r.y,right:r.right,bottom:r.bottom,overflow:d.scrollHeight>d.clientHeight+1}})()');
    assert.deepEqual(value.tags,config.rooms[room].activities);assert(value.opening?.length>10);assert(!value.hints);assert(value.x>=0&&value.y>=0);assert(value.right<=await ev('innerWidth')&&value.bottom<=await ev('innerHeight'));assert(!value.overflow);
    records.push({test:`${purpose}-${room}`,value});return value;
  };
  const firstGreetings=[];
  for(const [purpose,width,height,room] of [['browse',1440,900,'living'],['recruit',1440,900,'bedroom'],['inspiration',390,844,'roof']]) {
    console.log('Checking '+purpose+' at '+width+'x'+height);
    await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});
    await call('Page.navigate',{url:base+'/?chat-review='+Date.now()});await wait('window.__pineappleHouse?.snapshot().state==="ready"');
    // 清理本测试标签页的会话选择，再由可见按钮完成选择。
    await ev('sessionStorage.removeItem("house-visit-purpose")');await call('Page.reload',{ignoreCache:true});await wait('window.__pineappleHouse?.snapshot().state==="ready"');
    await wait('document.querySelector(".house-visit-purpose")?.getBoundingClientRect().height>0');
    assert.deepEqual(await ev('[...document.querySelectorAll("[data-visit-purpose]")].map(n=>n.textContent)'),['简单看看','招人','找灵感']);
    if(purpose==='browse')await shot('visit-purpose-choices');
    await click(`[data-visit-purpose="${purpose}"]`);assert.equal(await ev('sessionStorage.getItem("house-visit-purpose")'),purpose);
    await click('[data-neighbor="pineapple"]');await wait('document.querySelector(".house").dataset.neighborhood==="inside"');await delay(1000);
    await enterRoom(room);await character();const seen=await checkChat(room,purpose);assert.equal(seen.userMessages,0);firstGreetings.push(seen.opening);await shot(`${purpose}-${room}-${width}`);
    const count=await ev('document.querySelectorAll(".companion-message").length');await click('[data-companion-close]');await character();assert.equal(await ev('document.querySelectorAll(".companion-message").length'),count);records.push({test:'reopen-does-not-duplicate-'+purpose,value:true});
    if(purpose==='browse') {
      // 聊天开着时仍能切房，标签立即更新。
      for(const next of ['storage','bathroom','bedroom','library','roof']) {
        await click('[data-house-back]');await delay(900);await enterRoom(next);await checkChat(next,purpose);
      }
    }
    if(purpose==='recruit') {
      await click('#companion-input');await call('Input.insertText',{text:'想了解 Agent 工程。'});await click('.companion-chat [type="submit"]');
      await wait('!document.querySelector(".companion-chat [type=submit]").disabled',65000);
      assert.equal(await ev('document.querySelectorAll(".companion-message.assistant").length'),2,await ev('document.querySelector("[data-companion-status]").textContent'));
      const reply=await ev('[...document.querySelectorAll(".companion-message.assistant")].at(-1).textContent');assert(reply.length>0);assert(apiRequests.at(-1).message.includes('来访目的：招人'));assert.equal(apiRequests.at(-1).room,'bedroom');records.push({test:'real-chat-preserves-purpose-and-opening',value:reply});await shot('recruit-reply');
    }
    if(purpose==='inspiration') {
      await click('[data-action="bubble"]');await wait('window.__pineappleHouse.companion.snapshot().activity==="bubble"&&window.__pineappleHouse.companion.snapshot().commanded',65000);
      assert.equal(await ev('window.__pineappleHouse.companion.snapshot().room'),'roof');records.push({test:'room-tag-performs-bubble-without-changing-room',value:true});
    }
    await click('[data-companion-close]');
    await call('Page.reload',{ignoreCache:true});await wait('window.__pineappleHouse?.snapshot().state==="ready"');assert.equal(await ev('document.querySelector(".house-visit-purpose").hidden'),true);records.push({test:'choice-survives-reload-'+purpose,value:true});
  }
  assert.equal(new Set(firstGreetings).size,3);assert.equal(errors.length,0);assert.equal(failures.length,0);
  writeFileSync(`${out}/results.json`,JSON.stringify({status:'passed',records,errors,failures,limitations:['手机为 Chrome 视口模拟，未测实机']},null,2)+'\n');console.log(JSON.stringify({status:'passed',checks:records.length,errors,failures}));
} catch(error){writeFileSync(`${out}/results.json`,JSON.stringify({status:'failed',error:String(error),records,errors,failures},null,2));throw error;}
finally {ws?.close();chrome.kill();}
