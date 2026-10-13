// 独立 Chrome，仅用真实鼠标/键盘操作；snapshot 只用于读取证据。
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const out='docs/house-companion-review/diary-toy';mkdirSync(out,{recursive:true});
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

  const base=process.argv.includes('--live')?'https://gsyiswatchingu.github.io':'http://127.0.0.1:8774';
  await viewport(1440,900);await call('Page.navigate',{url:base+'/pineapple-companion.html?t='+Date.now()});
  await wait('window.__pineappleHouse?.companion?.snapshot().loaded && window.__pineappleHouse.snapshot().state==="ready"');
  await click('[data-house-room="bedroom"]');
  const samples=[];const seen=new Set();const start=Date.now();
  while(Date.now()-start<58000){
    const value=await snapshot();value.toyChest=await evaluate("window.__pineappleHouse.snapshot().toyChest");samples.push(value);const key=value.book.kind+':'+value.book.phase;
    if(value.book.kind==='journal'&&value.book.phase==='read'&&value.day%10>5.5&&!seen.has('steady-read')){seen.add('steady-read');await shot('steady-read');}if(!seen.has(key)){seen.add(key);await shot(key.replace(':','-'));console.log(key,JSON.stringify({activity:value.activity,pos:value.position,book:value.book}));}
    if(seen.has('toy:done')&&seen.has('journal:release'))break;
    await delay(220);
  }
  records.push({test:'autonomous-bedroom',seen:[...seen],samples});
  await shot('bedroom-final');
  assert(seen.has('journal:reach'));assert(seen.has('journal:lift'));assert(seen.has('journal:read'));assert(seen.has('journal:return'));assert(seen.has('journal:release'));assert(seen.has('toy:play'));
  assert(samples.filter(s=>s.book.kind==='journal').every(s=>s.book.source==='content-work-journal'&&s.book.visible));
  assert.equal(new Set(samples.filter(s=>s.book.kind==='journal').map(s=>s.book.sourceId)).size,1);
  const read=samples.filter(s=>s.book.phase==='read');assert(read.length>0);console.log('read gap',Math.max(...read.map(s=>s.book.handGap??0)));
  const contact=samples.filter(s=>s.book.kind==='journal'&&['lift','read','return'].includes(s.book.phase));
  console.log('contact gaps',Math.max(...contact.map(s=>s.book.handGap??0)));
  assert(Math.max(...contact.map(s=>s.book.handGap??0))<.065);
  const toy=samples.filter(s=>s.book.phase==='play');console.log('toy gaps',Math.max(...toy.map(s=>s.book.handGap??0)));assert(Math.max(...toy.map(s=>s.book.handGap??0))<.04);assert(toy.some(s=>s.toyChest.companionPlaying&&s.toyChest.amount>.8));
  const journalDone=samples.find(s=>s.book.kind==='journal'&&s.book.phase==='done');assert(journalDone);assert(journalDone.book.position.every((v,i)=>Math.abs(v-journalDone.book.home[i])<.0001));
  assert.equal(await evaluate('document.querySelector(".chest-gallery").open'),false);
  await delay(600);assert((await evaluate("window.__pineappleHouse.snapshot().toyChest.amount"))<.05);await click('[data-house-object="toy-chest"]');await wait('document.querySelector(".chest-gallery").open');await shot('visitor-gallery');await click('.chest-gallery-close');
  await click('[data-house-object="work-journal"]');await wait('document.querySelector("[data-internship-diary]").open');await shot('visitor-diary');await click('[data-diary-close]');
  await click('[data-house-back]');await delay(700);await click('[data-house-room="library"]');await delay(6500);
  assert.equal((await snapshot()).book.kind,null);assert.equal(await evaluate('window.__pineappleHouse.scene.getObjectByName("content-work-journal").visible'),false);
  await click('[data-house-back]');await delay(700);await click('[data-house-room="bedroom"]');await delay(3000);
  await viewport(390,844);await delay(700);await shot('mobile-bedroom');
  records.push({test:'visitor-diary-gallery-and-mobile',value:true});
  if(errors.length)throw new Error(JSON.stringify(errors));
  writeFileSync(resultFile,JSON.stringify({passed:true,records:records.map(r=>r.samples?{...r,samples:r.samples.map(s=>({activity:s.activity,room:s.room,day:s.day,position:s.position,book:s.book,toyChest:s.toyChest}))}:r),errors,failures},null,2));console.log('passed',resultFile);
} catch(error){writeFileSync(resultFile,JSON.stringify({passed:false,error:String(error),records,errors,failures},null,2));console.error(error);process.exitCode=1;} finally{ws?.close();chrome.kill();}
