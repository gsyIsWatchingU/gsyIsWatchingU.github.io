// 独立 Chrome，仅用真实鼠标/键盘操作；snapshot 只用于读取证据。
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const out='docs/house-companion-review/text-chat';mkdirSync(out,{recursive:true});
const port=9500+(process.pid%1000),profile=`${process.cwd()}/tmp/companion-chrome-${Date.now()}`;
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',[`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`,'--headless=new',...(process.argv.includes('--live')?[]:['--disable-web-security']),'--no-first-run','--no-default-browser-check','--enable-unsafe-swiftshader','--window-size=1440,900','--autoplay-policy=no-user-gesture-required','about:blank'],{stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const records=[],errors=[],failures=[];let ws,id=0,sessionId,handleFetch;
const resultFile=`${out}/${process.argv.includes('--live')?'live-results':'local-results'}.json`;
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

  const base=process.argv.includes('--live')?'https://gsyiswatchingu.github.io':'http://127.0.0.1:8771';
  await viewport(1440,900);await call('Page.navigate',{url:base+'/pineapple-companion.html?t='+Date.now()});
  await wait('window.__pineappleHouse?.companion?.snapshot().loaded');
  await delay(2200);
  assert.equal(await evaluate('document.querySelectorAll("[data-companion-open],[data-companion-audition],[data-companion-mute],[data-companion-replay],audio[data-companion-audio]").length'),0);
  records.push({test:'no-chat-shortcut-or-voice-controls',value:true});
  let speechRequests=0;
  ws.addEventListener('message',event=>{const data=JSON.parse(event.data);if(data.method==='Network.requestWillBeSent' && data.params.request.url.endsWith('/speech'))speechRequests++;});
  await click('[data-house-room="bedroom"]');await delay(2700);
  const hit=await evaluate('(()=>{const h=window.__pineappleHouse,p=h.companion.actor.position.clone();p.y+=.95;p.project(h.camera);const r=document.querySelector("canvas").getBoundingClientRect();return{x:r.x+(p.x*.5+.5)*r.width,y:r.y+(-p.y*.5+.5)*r.height}})()');
  await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...hit});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,...hit});
  await wait('document.querySelector(".companion-chat").open');
  assert.equal(await evaluate('document.querySelector(".companion-chat").matches(":modal")'),false);
  records.push({test:'real-character-click-opens-nonmodal-chat',value:true});
  const bounds=()=>evaluate('(()=>{const d=document.querySelector(".companion-chat"),r=d.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height,right:innerWidth-r.right,bottom:innerHeight-r.bottom,overflow:d.scrollHeight>d.clientHeight+1}})()');
  records.push({test:'desktop-right-chat',value:await bounds()});
  assert((await bounds()).width<=301 && (await bounds()).right<=17);
  await click('#companion-input');await call('Input.insertText',{text:'你好，今天想做什么？'});await click('.companion-chat [type=submit]');
  await wait('document.querySelectorAll(".companion-message.assistant").length>0 && !document.querySelector(".companion-chat [type=submit]").disabled',65000);
  const reply=await evaluate('document.querySelector(".companion-message.assistant").textContent');
  assert(reply.length>0);assert.equal(speechRequests,0);records.push({test:'real-deepseek-text-reply-without-speech',value:reply});
  await shot('desktop-chat');
  await click('[data-house-back]');await delay(700);
  assert.equal(await evaluate('window.__pineappleHouse.snapshot().view'),'whole');assert.equal(await evaluate('document.querySelector(".companion-chat").open'),true);
  records.push({test:'room-controls-work-while-chat-open',value:true});
  await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});assert.equal(await evaluate('document.querySelector(".companion-chat").open'),false);
  for(const [width,height] of [[818,804],[390,844],[844,390]]){
    await viewport(width,height);await delay(700);await click('[data-house-room="bedroom"]');await delay(2700);
    const point=await evaluate('(()=>{const h=window.__pineappleHouse,p=h.companion.actor.position.clone();p.y+=.95;p.project(h.camera);const r=document.querySelector("canvas").getBoundingClientRect();return{x:r.x+(p.x*.5+.5)*r.width,y:r.y+(-p.y*.5+.5)*r.height}})()');
    await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...point});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,...point});await wait('document.querySelector(".companion-chat").open');
    const r=await bounds();assert(r.x>=0 && r.y>=0 && r.right>=0 && r.bottom>=0);assert.equal(r.overflow,false);records.push({test:'chat-'+width+'x'+height,value:r});await shot('chat-'+width+'x'+height);
    await click('[data-companion-close]');await click('[data-house-back]');await delay(600);
  }
  for(const [width,height] of [[1440,900],[1094,846],[818,804],[390,844],[844,390],[320,568]]){
    await viewport(width,height);await delay(600);await click('[data-house-room="bedroom"]');await delay(2200);await click('[data-house-object="work-journal"]');await wait('document.querySelector("[data-internship-diary]").open');await delay(350);
    const seen=new Set();let page=0;
    while(true){
      const value=await evaluate('(()=>{const d=document.querySelector("[data-internship-diary]"),reading=d.querySelector("[data-diary-reading]"),r=d.getBoundingClientRect();return{width:r.width,height:r.height,x:r.x,y:r.y,visible:[...reading.querySelectorAll("article:not([hidden]) h3")].map(n=>n.textContent),overflow:reading.scrollHeight>reading.clientHeight+1,dialogOverflow:d.scrollHeight>d.clientHeight+1,page:d.querySelector("[data-diary-page]").textContent,nextDisabled:d.querySelector("[data-diary-next]").disabled}})()');
      assert(!value.overflow && !value.dialogOverflow);assert(value.y>=0 && value.y+value.height<=height+1);value.visible.forEach(name=>seen.add(name));records.push({test:'diary-'+width+'x'+height+'-page-'+page,value});await shot('diary-'+width+'x'+height+'-page-'+page);
      if(value.nextDisabled)break;assert(page++<4);await click('[data-diary-next]');
    }
    assert.equal(seen.size,4);await click('[data-diary-close]');await click('[data-house-back]');await delay(400);
  }
  await viewport(1440,900);await call('Page.navigate',{url:base+'/pineapple-house.html?t='+Date.now()});await wait('document.querySelector(".house").dataset.houseState==="ready"');assert.equal(await evaluate('window.__pineappleHouse.companion.snapshot().loaded'),true);assert.equal(await evaluate('document.querySelector(".companion-hud").hidden'),true);records.push({test:'homepage-companion-without-preview-controls',value:true});
  assert.equal(errors.length,0);assert.equal(failures.length,0);
  writeFileSync(resultFile,JSON.stringify({status:'passed',records,errors,failures,speechRequests,limitations:['Chrome viewport simulation; physical phone not tested']},null,2)+'\n');
  console.log(JSON.stringify({status:'passed',checks:records.length,speechRequests,errors,failures}));
} catch(error){writeFileSync(resultFile,JSON.stringify({status:'failed',error:String(error),records,errors,failures},null,2));throw error;}
finally{ws?.close();chrome.kill();}
