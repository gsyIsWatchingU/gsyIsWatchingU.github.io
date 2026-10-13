import {spawn} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const out='docs/companion-actions-review';mkdirSync(out,{recursive:true});
const port=9700+process.pid%200,profile=`${process.cwd()}/tmp/actions-chrome-${Date.now()}`;
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',[`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`,'--headless=new','--no-first-run','--no-default-browser-check','--enable-unsafe-swiftshader','--window-size=1440,900','about:blank'],{stdio:'ignore',windowsHide:true});
const delay=ms=>new Promise(r=>setTimeout(r,ms));const pending=new Map(),errors=[],records=[];let ws,id=0,sid;
try{
  let url;for(let i=0;i<30;i++){try{url=(await(await fetch(`http://127.0.0.1:${port}/json/version`)).json()).webSocketDebuggerUrl;break;}catch{await delay(400);}}
  ws=new WebSocket(url);await new Promise(r=>ws.onopen=r);ws.onmessage=e=>{const d=JSON.parse(e.data);if(d.id){const p=pending.get(d.id);pending.delete(d.id);d.error?p?.reject(new Error(JSON.stringify(d.error))):p?.resolve(d.result);}else if(d.method==='Runtime.exceptionThrown')errors.push(d.params.exceptionDetails);};
  const call=(method,params={},session=sid)=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params,...(session?{sessionId:session}:{})}));});
  const target=await call('Target.createTarget',{url:'about:blank'},null);sid=(await call('Target.attachToTarget',{targetId:target.targetId,flatten:true},null)).sessionId;
  await call('Runtime.enable');await call('Page.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});await call('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
  const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  const wait=async expression=>{for(let i=0;i<100;i++){if(await evaluate(expression))return;await delay(300);}throw new Error('timeout '+expression);};
  const click=async selector=>{const point=await evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()`);await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...point});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,...point});};
  const key=async(key,code)=>{for(const type of ['keyDown','keyUp'])await call('Input.dispatchKeyEvent',{type,key,code:key,windowsVirtualKeyCode:code,nativeVirtualKeyCode:code});};
  const select=async index=>{await click('[data-companion-action]');await key('Home',36);for(let i=0;i<index;i++)await key('ArrowDown',40);await key('Enter',13);};
  const snapshot=()=>evaluate('({house:window.__pineappleHouse.snapshot(),companion:window.__pineappleHouse.companion.snapshot()})');
  const shot=async name=>{const r=await call('Page.captureScreenshot',{format:'png'});writeFileSync(`${out}/${name}.png`,Buffer.from(r.data,'base64'));};
  const base=process.argv.includes('--live')?'https://gsyiswatchingu.github.io':'http://127.0.0.1:8770';
  await call('Page.navigate',{url:base+'/pineapple-companion.html?privacy=1&t='+Date.now()});await wait('window.__pineappleHouse?.snapshot().state==="ready"&&window.__pineappleHouse.companion?.snapshot().loaded');
  await delay(800);await click('[data-house-room="library"]');
  for(let i=0;i<10;i++){await delay(330);const value=await snapshot();records.push({test:'slide-frame',value});if(i%2===0)await shot(`slide-${i}`);}
  await delay(3000);await shot('reading');records.push({test:'reading',value:await snapshot()});
  await click('[data-house-back]');await delay(800);await click('[data-house-room="living"]');await delay(800);
  await select(7);await wait('document.querySelector(".house").dataset.companionActivity==="pet"');
  await delay(5000);await shot('petting');records.push({test:'petting',value:await snapshot()});
  await delay(2200);await shot('cat-sit');records.push({test:'cat-sit',value:await snapshot()});
  // 参观者真实点击猫咪，再记录竖尾回应。
  const point=await evaluate('JSON.parse(document.querySelector(".house").dataset.petScreen)');
  await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,x:point[0],y:point[1]});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,x:point[0],y:point[1]});
  await delay(1400);await shot('cat-greeting');records.push({test:'cat-greeting',value:await snapshot()});
  const petting=records.find(r=>r.test==='petting').value;
  assert(petting.companion.petContact<.09,'抚摸手腕必须在猫头附近');assert(petting.house.pet.sit>.95&&petting.house.pet.interaction);
  assert(records.at(-1).value.house.pet.reactions>records.find(r=>r.test==='cat-sit').value.house.pet.reactions,'真实点击猫咪必须触发回应');
  // 正式小屋单独检查参观者招呼时的尾巴变化，不受陪伴动作影响。
  await call('Page.navigate',{url:base+'/pineapple-house.html?privacy=1&t='+Date.now()});await wait('window.__pineappleHouse?.snapshot().state==="ready"&&window.__pineappleHouse.snapshot().pet');
  await click('[data-house-room="living"]');await delay(1300);
  const catSample=()=>evaluate('(()=>{const h=window.__pineappleHouse,b=h.scene.getObjectByName("pet_tail_tip");return{pet:h.snapshot().pet,tip:b.getWorldPosition(b.position.clone()).y}})()');
  const relaxed=await catSample();await shot('tail-relaxed');
  const catPoint=await evaluate('JSON.parse(document.querySelector(".house").dataset.petScreen)');
  await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,x:catPoint[0],y:catPoint[1]});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,x:catPoint[0],y:catPoint[1]});
  await delay(1700);const raised=await catSample();await shot('tail-greeting');records.push({test:'visitor-tail',relaxed,raised});
  assert(raised.pet.reactions>relaxed.pet.reactions&&raised.pet.tailLift>.95);assert(raised.tip-relaxed.tip>.07,'访客点击后真实尾骨必须上翘');
  assert.equal(errors.length,0,'浏览器脚本应无异常');assert(records.some(r=>r.test==='slide-frame'&&r.value.companion.slide?.posture==='seated'));
  writeFileSync(`${out}/${process.argv.includes('--live')?'live':'local'}-browser.json`,JSON.stringify({status:'passed',records,errors},null,2)+'\n');console.log(JSON.stringify({checks:records.length,errors}));
}catch(error){writeFileSync(`${out}/browser-failure.json`,JSON.stringify({error:String(error),records,errors},null,2));throw error;}
finally{ws?.close();chrome.kill();}
