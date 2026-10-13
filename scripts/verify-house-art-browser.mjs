import {spawn} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const live=process.argv.includes('--live'),out='docs/house-art-review';mkdirSync(out,{recursive:true});
const port=9600+process.pid%500,profile=`${process.cwd()}/tmp/art-chrome-${Date.now()}`;
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',[`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`,'--headless=new','--no-first-run','--no-default-browser-check','--enable-unsafe-swiftshader','--window-size=1440,900','about:blank'],{stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms)),pending=new Map(),records=[],errors=[],failures=[];let ws,id=0,sessionId;
try{
 let url;for(let n=0;n<40;n++){try{url=(await(await fetch(`http://127.0.0.1:${port}/json/version`)).json()).webSocketDebuggerUrl;break;}catch{await delay(500);}}
 ws=new WebSocket(url);await new Promise(r=>ws.onopen=r);
 ws.onmessage=event=>{const data=JSON.parse(event.data);if(data.id){const p=pending.get(data.id);pending.delete(data.id);data.error?p?.reject(new Error(JSON.stringify(data.error))):p?.resolve(data.result);}else if(data.method==='Runtime.exceptionThrown')errors.push(data.params.exceptionDetails);else if(data.method==='Network.loadingFailed'&&!data.params.canceled)failures.push(data.params);};
 const call=(method,params={},sid=sessionId)=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params,...(sid?{sessionId:sid}:{})}));});
 const target=await call('Target.createTarget',{url:'about:blank'},null);sessionId=(await call('Target.attachToTarget',{targetId:target.targetId,flatten:true},null)).sessionId;
 await call('Runtime.enable');await call('Page.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});
 const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result?.value;};
 const wait=async(expression,timeout=60000)=>{const start=Date.now();while(Date.now()-start<timeout){if(await evaluate(expression))return;await delay(300);}throw new Error('timeout: '+expression);};
 const click=async selector=>{const p=await evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(selector)}),r=el.getBoundingClientRect();if(!r.width||!r.height)throw Error('hidden click target');return{x:r.x+r.width/2,y:r.y+r.height/2}})()`);await call('Input.dispatchMouseEvent',{type:'mouseMoved',button:'none',buttons:0,...p});await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...p});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,...p});};
 const key=async(key,code,num)=>{await call('Input.dispatchKeyEvent',{type:'keyDown',key,code,windowsVirtualKeyCode:num});await call('Input.dispatchKeyEvent',{type:'keyUp',key,code,windowsVirtualKeyCode:num});};
 const shot=async name=>{const r=await call('Page.captureScreenshot',{format:'png'});writeFileSync(`${out}/${live?'live':'local'}-${name}.png`,Buffer.from(r.data,'base64'));};
 const base=live?'https://gsyiswatchingu.github.io':'http://127.0.0.1:18783';
 await call('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
 await call('Page.navigate',{url:base+'/?t='+Date.now()});
 await wait('window.__pineappleHouse?.snapshot().state==="ready" && window.__pineappleHouse.toyChest()?.ready');
 assert.equal(await evaluate('window.__pineappleHouse.toyChest().paintings'),5);
 await click('[data-house-room="bedroom"]');await delay(2300);
 for(const [width,height] of [[1440,900],[390,844],[844,390]]){
  await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});await delay(1200);
  await click('[data-house-object="toy-chest"]');await wait('document.querySelector(".chest-gallery").open');await delay(1400);
  const seen=new Set();
  for(let i=0;i<5;i++){
   await click(`[data-art-index="${i}"]`);
   await wait('(()=>{const img=document.querySelector(".chest-gallery figure img");return img.complete&&img.naturalWidth>0})()');
   const value=await evaluate('(()=>{const d=document.querySelector(".chest-gallery"),r=d.getBoundingClientRect(),img=d.querySelector("figure img"),ir=img.getBoundingClientRect();return{index:d.dataset.artIndex,src:img.getAttribute("src"),width:r.width,height:r.height,x:r.x,y:r.y,image:{x:ir.x,y:ir.y,width:ir.width,height:ir.height},overflow:d.scrollHeight>d.clientHeight+1,horizontalOverflow:document.documentElement.scrollWidth>innerWidth,selected:d.querySelectorAll("[aria-pressed=true]").length,modal:d.matches(":modal"),chest:window.__pineappleHouse.toyChest()}})()');
   assert.equal(Number(value.index),i);assert.equal(value.selected,1);assert(value.modal);assert(!value.overflow&&!value.horizontalOverflow);assert(value.x>=0&&value.y>=0&&value.y+value.height<=height+1);assert(value.image.x>=0&&value.image.x+value.image.width<=width+1);assert(value.chest.open&&value.chest.amount>.98&&value.chest.loaded===5&&value.chest.lidParts>0);
   seen.add(value.src);records.push({test:`${width}x${height}-painting-${i+1}`,value});if(i===0||i===4&&width===1440)await shot(`${width}x${height}-art-${i+1}`);
  }
  assert.equal(seen.size,5);
  await click('[data-art-next]');assert.equal(await evaluate('document.querySelector(".chest-gallery").dataset.artIndex'),'0');
  await key('ArrowLeft','ArrowLeft',37);assert.equal(await evaluate('document.querySelector(".chest-gallery").dataset.artIndex'),'4');
  await key('Escape','Escape',27);await wait('!document.querySelector(".chest-gallery").open && !window.__pineappleHouse.toyChest().open');
  assert.equal(await evaluate('window.__pineappleHouse.snapshot().view'),'bedroom');assert.equal(await evaluate('document.activeElement.dataset.houseObject'),'toy-chest');
  await delay(1000);assert(await evaluate('window.__pineappleHouse.toyChest().amount===0'));
  await click('[data-house-object="toy-chest"]');await wait('document.querySelector(".chest-gallery").open');await click('.chest-gallery-close');await wait('!document.querySelector(".chest-gallery").open');
  records.push({test:`${width}x${height}-navigation-close-focus-and-reopen`,value:true});
 }
 assert.equal(errors.length,0);assert.equal(failures.length,0);
 writeFileSync(`${out}/${live?'live':'local'}-results.json`,JSON.stringify({status:'passed',records,errors,failures,limitations:['手机为 Chrome 视口模拟，实机未测']},null,2)+'\n');
 console.log(JSON.stringify({status:'passed',checks:records.length,errors,failures}));
}catch(error){writeFileSync(`${out}/${live?'live':'local'}-results.json`,JSON.stringify({status:'failed',error:String(error),records,errors,failures},null,2));throw error;}finally{ws?.close();chrome.kill();}
