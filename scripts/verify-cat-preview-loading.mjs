import {launch} from './verification/neighborhood-cdp-client.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const before=process.argv.includes('--before'),live=process.argv.includes('--live');
const base=live?'https://gsyiswatchingu.github.io':'http://127.0.0.1:8770';
const out='docs/cat-loading-review/'+(before?'before':live?'live':'local');
mkdirSync(out,{recursive:true});
const c=await launch('tmp/cat-loading-browser',9938),requests=[],started=Date.now();
c.socket.addEventListener('message',message=>{const e=JSON.parse(String(message.data));if(e.method==='Fetch.requestPaused')requests.push(e.params);});
const state=()=>c.evaluate(`(()=>{const root=document.querySelector('main'),panel=document.querySelector('#cat-loading');return{loaded:root.dataset.loaded,preview:root.dataset.preview,stage:root.dataset.loadingStage,panel:!!panel&&!panel.hidden,detail:document.querySelector('#cat-load-detail')?.textContent,retry:!!document.querySelector('#cat-load-retry')&&!document.querySelector('#cat-load-retry').hidden,disabled:[...document.querySelectorAll('nav button,nav input')].every(b=>b.disabled),progress:document.querySelector('#progress').textContent,snapshot:window.__catEightReview?.snapshot()};})()`);
async function shot(name){const r=await c.send('Page.captureScreenshot',{format:'png'});writeFileSync(out+'/'+name+'.png',Buffer.from(r.data,'base64'));}
async function pausedRequest(){for(let i=0;i<180;i++){if(requests.length)return requests.shift();await c.pause(250);}throw Error('未收到动画文件请求');}
try{
 await c.viewport(1100,800);
 await c.send('Fetch.enable',{patterns:[{urlPattern:'*siamese-cat-eight-poses.glb*',requestStage:'Request'}]});
 await c.navigate(base+'/docs/cat-eight-poses-review/?v=20261016-cat-loading-v1&pose=side&progress=0.65&t='+Date.now());
 const first=await pausedRequest();await c.pause(600);const waiting=await state();await shot('waiting');
 if(before){assert(!waiting.preview&&!waiting.loaded);assert(!waiting.disabled&&!waiting.panel);writeFileSync(out+'/results.json',JSON.stringify({status:'reproduced',base,waiting,blankWhileFullDownloadPending:true},null,2));console.log('旧版复现：完整模型未到达时空白、动作按钮仍可操作');}
 else{
  assert.equal(waiting.preview,'true');assert(waiting.panel&&waiting.disabled);assert.equal(waiting.progress,'0%');
  await c.send('Fetch.failRequest',{requestId:first.requestId,errorReason:'ConnectionFailed'});
  await c.wait('document.querySelector("main").dataset.loadingStage==="error"');
  const failed=await state();assert(failed.preview==='true'&&failed.retry&&failed.disabled);await shot('failed');
  await c.clickElement('#cat-load-retry');const second=await pausedRequest();await c.send('Fetch.continueRequest',{requestId:second.requestId});
  await c.wait('document.querySelector("main").dataset.loaded==="true"',120000);
  const ready=await state();assert(!ready.panel&&!ready.disabled);assert(Math.abs(ready.snapshot.progress-.65)<.001);await shot('ready');
  await c.clickElement('[data-pose=loaf]');await c.wait('window.__catEightReview.snapshot().pose==="loaf"&&window.__catEightReview.snapshot().progress>.99');
  const point=await c.evaluate('window.__catEightReview.screen()');await c.click(...point);await c.wait('window.__catEightReview.snapshot().time===0');
  await c.viewport(390,844);await c.navigate(base+'/docs/cat-eight-poses-review/?t='+Date.now());const mobileRequest=await pausedRequest();await c.pause(300);
  const mobile=await c.evaluate('(()=>{const r=document.querySelector("#cat-loading").getBoundingClientRect();return {preview:document.querySelector("main").dataset.preview,inView:r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight};})()');assert(mobile.preview==='true'&&mobile.inView);await shot('mobile-waiting');
  await c.send('Fetch.continueRequest',{requestId:mobileRequest.requestId});await c.wait('document.querySelector("main").dataset.loaded==="true"',120000);await shot('mobile-ready');
  await c.viewport(1100,800);await c.clickElement('[data-pose=side]');
  const range=await c.evaluate('(()=>{const r=document.querySelector("#timeline").getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height};})()');
  await c.click(range.x+8+(range.w-16)*.65,range.y+range.h/2);
  const expected=await c.evaluate('({sha:window.__catEightReview.runtimeSHA256,snapshot:window.__catEightReview.snapshot()})');
  await c.clickElement('#compare');const oldRequest=await pausedRequest();assert(oldRequest.request.url.includes('raw.githubusercontent.com'));await c.send('Fetch.continueRequest',{requestId:oldRequest.requestId});
  await c.wait('document.querySelector("main").dataset.loaded==="true"',120000);const old=await c.evaluate('({sha:window.__catEightReview.runtimeSHA256,snapshot:window.__catEightReview.snapshot()})');assert.notEqual(old.sha,expected.sha);assert(Math.abs(old.snapshot.progress-expected.snapshot.progress)<.001);
  await c.clickElement('#compare');const latestRequest=await pausedRequest();await c.send('Fetch.continueRequest',{requestId:latestRequest.requestId});
  await c.wait('document.querySelector("main").dataset.loaded==="true"',120000);const latest=await c.evaluate('({sha:window.__catEightReview.runtimeSHA256,snapshot:window.__catEightReview.snapshot()})');assert.equal(latest.sha,expected.sha);assert(Math.abs(latest.snapshot.progress-expected.snapshot.progress)<.001);for(const key of ['camera','cameraTarget'])latest.snapshot[key].forEach((v,i)=>assert(Math.abs(v-expected.snapshot[key][i])<1e-5));
  const errors=c.events.filter(e=>{
   if(e.type==='resourceFailure'&&e.canceled)return false;
   if(e.url?.includes('siamese-cat-eight-poses.glb')&&['resourceFailure','browserError'].includes(e.type))return false;
   return ['exception','error','httpFailure','browserError','resourceFailure'].includes(e.type);
  });assert.deepEqual(errors,[]);
  writeFileSync(out+'/results.json',JSON.stringify({status:'passed',base,waiting,failed,ready,mobile,comparison:{expected,old,latest},elapsedMs:Date.now()-started,expectedNetworkFailure:true,errors},null,2)+'\n');console.log('站姿先显示 / 下载失败保留猫咪 / 重试恢复 / 动作与点击 / 手机等待布局 / 版本往返：PASS');
 }
}finally{await c.dispose();}
