import {spawn} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const tag=process.argv[2]??'after',live=process.argv.includes('--live');
const out=`docs/sleep-quilt-review/${tag}`;mkdirSync(out,{recursive:true});
const port=9800+process.pid%150;
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',[`--remote-debugging-port=${port}`,`--user-data-dir=${process.cwd()}/tmp/quilt-${Date.now()}`,'--headless=new','--no-first-run','--no-default-browser-check','--enable-unsafe-swiftshader','--window-size=1440,900','about:blank'],{stdio:'ignore',windowsHide:true});
const delay=ms=>new Promise(r=>setTimeout(r,ms)),pending=new Map(),records=[],errors=[];let ws,id=0,sid;
try{
 let url;for(let i=0;i<40;i++){try{url=(await(await fetch(`http://127.0.0.1:${port}/json/version`)).json()).webSocketDebuggerUrl;break;}catch{await delay(300);}}
 ws=new WebSocket(url);await new Promise(r=>ws.onopen=r);ws.onmessage=e=>{const d=JSON.parse(e.data);if(d.id){const p=pending.get(d.id);pending.delete(d.id);d.error?p.reject(new Error(JSON.stringify(d.error))):p.resolve(d.result);}else if(d.method==='Runtime.exceptionThrown')errors.push(d.params.exceptionDetails);};
 const call=(method,params={},session=sid)=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params,...(session?{sessionId:session}:{})}));});
 const t=await call('Target.createTarget',{url:'about:blank'},null);sid=(await call('Target.attachToTarget',{targetId:t.targetId,flatten:true},null)).sessionId;
 await call('Runtime.enable');await call('Page.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});
 const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 const wait=async expr=>{for(let i=0;i<160;i++){if(await evaluate(expr))return;await delay(300);}throw new Error('timeout '+expr);};
 const click=async selector=>{const p=await evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()`);for(const type of ['mousePressed','mouseReleased'])await call('Input.dispatchMouseEvent',{type,button:'left',buttons:type==='mousePressed'?1:0,clickCount:1,...p});};
 const select=async value=>{const steps=await evaluate(`(()=>{const s=document.querySelector('[data-companion-action]');return [...s.options].findIndex(o=>o.value===${JSON.stringify(value)})})()`);await click('[data-companion-action]');for(const key of ['Home',...Array(steps).fill('ArrowDown'),'Enter'])for(const type of ['keyDown','keyUp'])await call('Input.dispatchKeyEvent',{type,key,code:key});};
 const snapshot=()=>evaluate(`(()=>{const h=window.__pineappleHouse,c=h.scene.getObjectByName('companion-sleep-quilt');let q;h.scene.traverse(n=>{if(n.material?.name==='purple quilt'&&n!==c)q=n});return{sleep:h.companion.snapshot().sleep,activity:h.companion.snapshot().activity,arrival:document.querySelector('.house').dataset.companionArrival,originalVisible:q?.visible,coverVisible:c?.visible,vertices:c?.geometry.attributes.position.count,failed:h.snapshot().failed}})()`);
 const shot=async name=>{const r=await call('Page.captureScreenshot',{format:'png'});writeFileSync(`${out}/${name}.png`,Buffer.from(r.data,'base64'));};
 await call('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
 await call('Page.navigate',{url:(live?'https://gsyiswatchingu.github.io':'http://127.0.0.1:8783')+'/pineapple-companion.html?privacy=1&t='+Date.now()});
 await wait('window.__pineappleHouse?.snapshot().state==="ready"&&window.__pineappleHouse.companion?.snapshot().loaded');
 await click('[data-house-room="bedroom"]');await delay(2700);await select('rest');await delay(2400);await shot('before-command');await select('sleep');
 records.push({test:'immediate',value:await snapshot()});await shot('immediate');
 for(const phase of ['pull','climb','lie','cover','sleep']){await wait(`window.__pineappleHouse.companion.snapshot().sleep?.phase===${JSON.stringify(phase)}`);records.push({test:phase,value:await snapshot()});await shot(phase);}
 await call('Input.dispatchMouseEvent',{type:'mouseWheel',x:650,y:510,deltaX:0,deltaY:-500});await delay(600);await shot('sleep-close');await call('Input.dispatchMouseEvent',{type:'mouseWheel',x:650,y:510,deltaX:0,deltaY:500});await delay(400);
 await select('rest');await delay(450);records.push({test:'reset',value:await snapshot()});await shot('reset');
 if(tag!=='before'){assert(records.slice(0,-1).every(r=>r.value.originalVisible||r.value.coverVisible),'被子始终可见');assert(records.find(r=>r.test==='sleep').value.vertices>625,'保留厚被子网格');assert(records.at(-1).value.originalVisible&&!records.at(-1).value.coverVisible,'切换动作恢复原被子');assert.equal(errors.length,0);}
 await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await delay(700);await select('sleep');await delay(450);await wait('window.__pineappleHouse.companion.snapshot().sleep?.phase==="sleep"&&window.__pineappleHouse.companion.snapshot().activity==="sleep"');await shot('mobile-sleep');records.push({test:'mobile-sleep',value:await snapshot()});
 if(tag!=='before')assert(records.at(-1).value.coverVisible&&!records.at(-1).value.originalVisible,'重复睡觉仍显示盖被');
 writeFileSync(`${out}/results.json`,JSON.stringify({records,errors,physicalPhoneTested:false},null,2)+'\n');console.log(JSON.stringify({tag,records,errors}));
}finally{ws?.close();chrome.kill();}
