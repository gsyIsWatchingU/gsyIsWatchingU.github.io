import {spawn} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const live=process.argv.includes('--live'),probe=process.argv.includes('--probe');
const out='docs/patrick-house-review/reference-v4/'+(live?'live':'local');mkdirSync(out,{recursive:true});
const port=9600+process.pid%300,chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',[`--remote-debugging-port=${port}`,`--user-data-dir=${process.cwd()}/tmp/patrick-chrome-${Date.now()}`,'--headless=new','--no-first-run','--no-default-browser-check','--enable-unsafe-swiftshader','--window-size=1440,900','about:blank'],{stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms)),pending=new Map(),errors=[],failures=[],records=[];let ws,id=0,sessionId;
try{
  let url;for(let i=0;i<30;i++){try{url=(await(await fetch(`http://127.0.0.1:${port}/json/version`)).json()).webSocketDebuggerUrl;break;}catch{await delay(300);}}
  ws=new WebSocket(url);await new Promise(r=>ws.onopen=r);
  ws.onmessage=e=>{const d=JSON.parse(e.data);if(d.id){const c=pending.get(d.id);pending.delete(d.id);d.error?c.reject(new Error(JSON.stringify(d.error))):c.resolve(d.result);}else if(d.method==='Runtime.exceptionThrown')errors.push(d.params.exceptionDetails);else if(d.method==='Network.loadingFailed'&&!d.params.canceled)failures.push(d.params.errorText);};
  const call=(method,params={},sid=sessionId)=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params,...(sid?{sessionId:sid}:{})}));});
  const target=await call('Target.createTarget',{url:'about:blank'},null);sessionId=(await call('Target.attachToTarget',{targetId:target.targetId,flatten:true},null)).sessionId;
  await call('Runtime.enable');await call('Page.enable');await call('Network.enable');
  const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  const wait=async(expression,timeout=40000)=>{const start=Date.now();while(Date.now()-start<timeout){if(await evaluate(expression))return;await delay(250);}throw new Error('timeout '+expression);};
  const shot=async name=>{const r=await call('Page.captureScreenshot',{format:'png'});writeFileSync(`${out}/${name}.png`,Buffer.from(r.data,'base64'));};
  const mouse=async(x,y)=>{await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,x,y});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,x,y});};
  const click=async selector=>{const r=await evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()`);await mouse(r.x,r.y);};
  const viewport=(width,height)=>call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});
  const base=live?'https://gsyiswatchingu.github.io':'http://127.0.0.1:8776';
  await viewport(1440,900);await call('Page.navigate',{url:base+'/patrick-house.html?t='+Date.now()});await wait('document.querySelector(".house")?.dataset.houseState==="ready"');await delay(1200);
  const state=()=>evaluate('window.__patrickHouse.snapshot()');
  records.push({test:'ready',value:await state()});await shot('whole');
  const screenPoint=expression=>evaluate(`(()=>{const h=window.__patrickHouse,p=${expression};p.project(h.camera);return{x:(p.x*.5+.5)*innerWidth,y:(-.5*p.y+.5)*innerHeight}})()`);
  if(probe){
    await click('.room-label[aria-label^="下层"]');await delay(1000);await shot('living');
    records.push({test:'mesh-bounds',value:await evaluate('(()=>{const h=window.__patrickHouse,m=h.character.meshes()[0],p=m.geometry.attributes.position;let mins=[Infinity,Infinity,Infinity],maxs=[-Infinity,-Infinity,-Infinity];for(let i=0;i<p.count;i++)for(let k=0;k<3;k++){mins[k]=Math.min(mins[k],p.array[i*3+k]);maxs[k]=Math.max(maxs[k],p.array[i*3+k]);}return {mins,maxs,vertices:p.count,triangles:m.geometry.index.count/3}})()')});
    await click('[data-house-back]');await delay(800);await click('[data-house-mode]');await delay(800);await shot('exterior');
  }else{
    assert.equal((await state()).character.loaded,true);assert.equal((await state()).collection.count,12);
    const stair=(await state()).stair;assert.equal(stair.count,10);assert(stair.slopeDegrees<45);assert.equal(stair.bottom,-2.3);
    records.push({test:'stairs-connected-and-landed',value:stair});
    const point=await screenPoint('h.character.actor.position.clone().add({x:0,y:.52,z:.02})');assert.equal(await evaluate(`window.__patrickHouse.pick(${point.x},${point.y})?.interaction`),'patrick');await mouse(point.x,point.y);await delay(850);assert.equal((await state()).character.action,'wave');
    records.push({test:'real-character-click',value:await state()});await shot('wave');
    const deformation=async label=>{const metrics=await evaluate('window.__patrickHouse.character.deformation()');assert(metrics.p99<2.3);assert(metrics.max<6);assert(metrics.minimumY>-.012);records.push({test:'actual-skin-deformation-'+label,value:metrics});};
    await deformation('wave');
    for(const action of ['cheer','icecream','hula']){
      await click(`[data-patrick-action="${action}"]`);await delay(550);assert.equal((await state()).character.action,action);await shot(action);records.push({test:'real-action-'+action,value:(await state()).character});await deformation(action);
    }
    await delay(4500);assert.equal((await state()).character.action,'idle');assert.equal((await state()).character.icecream,false);
    await click('[data-house-back]');await delay(850);
    const relic=await screenPoint('h.relics.items[4].getWorldPosition(h.camera.position.clone())');
    assert.equal(await evaluate(`window.__patrickHouse.pick(${relic.x},${relic.y})?.interaction`),'relic');await mouse(relic.x,relic.y);await delay(600);assert((await state()).collection.selected);await shot('relic');records.push({test:'real-buried-object-click',value:(await state()).collection});
    await click('[data-patrick-close]');await click('.room-label[aria-label^="下层"]');await delay(850);await shot('living');
    await click('[data-house-back]');await delay(850);
    for(const [width,height] of [[390,844],[844,390],[1440,900]]){
      await viewport(width,height);await delay(850);assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth'),false);await shot('whole-'+width+'x'+height);
      records.push({test:'resize-'+width+'x'+height,value:await state()});
    }
    await click('[data-house-mode]');await delay(850);await shot('exterior');
    await call('Input.dispatchMouseEvent',{type:'mouseWheel',x:720,y:440,deltaY:-350,deltaX:0});await delay(800);await shot('character-detail');
    records.push({test:'render',value:await evaluate('window.__patrickHouse.frames()')});
    assert.equal(errors.length,0);assert.equal(failures.length,0);
  }
  writeFileSync(`${out}/${probe?'probe':'results'}.json`,JSON.stringify({records,errors,failures},null,2));console.log(JSON.stringify({passed:records.length,errors:errors.length,failures:failures.length,out}));
}catch(e){writeFileSync(`${out}/failure.json`,JSON.stringify({error:String(e),records,errors,failures},null,2));throw e;}finally{ws?.close();chrome.kill();}
