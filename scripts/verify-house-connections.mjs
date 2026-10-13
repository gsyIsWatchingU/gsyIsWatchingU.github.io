// 独立 Chrome，仅用真实鼠标/键盘操作；snapshot 只用于读取证据。
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const out='docs/house-connections-review';mkdirSync(out,{recursive:true});
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
  
  const click=async selector=>{const rect=await evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()`);await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...rect});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,...rect});};
  const viewport=async(width,height)=>call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});

  const base=process.argv.includes('--live')?'https://gsyiswatchingu.github.io':'http://127.0.0.1:18843';
  const settled=()=>wait('document.querySelector(".house").dataset.cameraTransition==="idle"');
  const view=()=>evaluate('window.__pineappleHouse.snapshot().view');
  const key=async(key,code,n)=>{await call('Input.dispatchKeyEvent',{type:'keyDown',key,code,windowsVirtualKeyCode:n,nativeVirtualKeyCode:n,...(key==='Enter'?{text:'\r'}:{})});await call('Input.dispatchKeyEvent',{type:'keyUp',key,code,windowsVirtualKeyCode:n});};
  await viewport(1440,900);await call('Page.navigate',{url:base+'/?t='+Date.now()});
  await wait('document.querySelector(".house").dataset.houseState==="ready"');await settled();
  assert.equal(await evaluate('document.querySelector(".house-connections").hidden'),true);
  const route=['living','storage','living','bathroom','library','bedroom','roof','bedroom','library','bathroom','living'];
  for(const [width,height] of [[1440,900],[390,844],[844,390]]){
    await viewport(width,height);await delay(500);await settled();await click('[data-house-room="living"]');await settled();
    for(let i=1;i<route.length;i++){
      const from=route[i-1],to=route[i];
      const rects=await evaluate('(()=>{return [...document.querySelectorAll("[data-house-passage]:not([hidden])")].map(b=>{const r=b.getBoundingClientRect();return {id:b.dataset.housePassage,x:r.x,y:r.y,w:r.width,h:r.height,hit:document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)===b}})})()');
      for(const r of rects){assert(r.x>=0 && r.y>=0 && r.x+r.w<=width && r.y+r.h<=height);assert(r.hit,JSON.stringify(r));if(width<600||height<500)assert(r.h>=44);}
      await click(`[data-house-passage="${from}-${to}"]`);await settled();assert.equal(await view(),to);
      assert.equal(await evaluate('document.querySelector("[data-house-room-name]").textContent'),({living:'客厅',storage:'储藏室',bathroom:'浴室',library:'图书馆',bedroom:'卧室',roof:'屋顶花园'})[to]);
      records.push({test:`${width}x${height}:${from}->${to}`,rects});
      if(['storage','library','roof'].includes(to))await shot(`${width}x${height}-${to}`);
    }
    await key('Escape','Escape',27);await settled();assert.equal(await view(),'whole');
    assert.equal(await evaluate('document.querySelector(".house-connections").hidden'),true);
  }
  // 真实模型楼梯的射线点击，不使用 focusRoom 代替输入。
  await viewport(1440,900);await delay(500);await settled();await click('[data-house-room="living"]');await settled();
  for(const pair of ['living-bathroom','bathroom-library','library-bedroom','bedroom-roof']){await click(`[data-house-passage="${pair}"]`);await settled();}
  const points=await evaluate(`(()=>{const h=window.__pineappleHouse,c=document.querySelector('canvas'),r=c.getBoundingClientRect(),points=[];h.scene.traverse(n=>{if(!n.isMesh||!(n.name.startsWith('stairs_')||n.name.startsWith('roof_access_')||n.name.startsWith('roof_landing')))return;let parent=n;while(parent){if(!parent.visible)return;parent=parent.parent;}n.geometry.computeBoundingBox();const p=n.geometry.boundingBox.getCenter(n.position.clone()).applyMatrix4(n.matrixWorld).project(h.camera);const x=r.x+(p.x*.5+.5)*r.width,y=r.y+(-p.y*.5+.5)*r.height;if(x>=0&&y>=0&&x<innerWidth&&y<innerHeight&&document.elementFromPoint(x,y)===c)points.push({x,y,name:n.name});});return points;})()`);
  let hit;
  for(const p of points){
    await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:p.x,y:p.y});await delay(50);
    if(await evaluate('!document.querySelector("[data-house-tooltip]").hidden && document.querySelector("[data-house-tooltip]").textContent.includes("下楼")')){hit=p;break;}
  }
  assert(hit,'楼梯至少有一个未被墙面遮挡的可点击点');
  await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,x:hit.x,y:hit.y});
  await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,x:hit.x,y:hit.y});
  await settled();assert.equal(await view(),'bedroom');records.push({test:'physical-stair-click',hit});
  for(let i=0;i<20;i++){await key('Tab','Tab',9);if(await evaluate('document.activeElement.dataset.housePassage!==undefined'))break;}
  const destination=await evaluate('document.activeElement.dataset.housePassage?.split("-")[1]');assert(destination);await wait('!document.activeElement.disabled');
  await key('Enter','Enter',13);await settled();assert.equal(await view(),destination);records.push({test:'keyboard-passage',destination});
  await shot('desktop-final');
  assert.equal(errors.length,0);assert.equal(failures.length,0);
  writeFileSync(resultFile,JSON.stringify({status:'passed',records,errors,failures,limitations:['手机为视口模拟，实机未测']},null,2)+'\n');
  console.log(JSON.stringify({status:'passed',checks:records.length,errors,failures}));
} catch(error){writeFileSync(resultFile,JSON.stringify({status:'failed',error:String(error),records,errors,failures},null,2));throw error;}
finally{ws?.close();chrome.kill();}
