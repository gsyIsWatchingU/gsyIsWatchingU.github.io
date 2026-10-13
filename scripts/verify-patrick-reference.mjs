// 真实 Chrome 输入、动态视口、GLB 加载与招手连续帧。视觉质量由保存的图片另行审查。
import { makeDriver } from './verification/cdp-driver.mjs';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const live=process.argv.includes('--live');
const layout=process.argv.includes('--layout');
const out=path.join(root,'docs/patrick-house-review/reference-20261013',live?'live':layout?'layout':'local');
fs.mkdirSync(out,{recursive:true});
const server=live?null:spawn('python',['-m','http.server','8693','--bind','127.0.0.1','--directory',root],{stdio:'ignore'});
const url=(live?'https://gsyiswatchingu.github.io/':'http://127.0.0.1:8693/')+'patrick-house.html?t='+Date.now();
const d=makeDriver({port:9475,profile:path.join(root,'tmp','patrick-cdp'),gpu:true});
const checks=[];const check=(name,ok,detail)=>{checks.push({name,ok,detail});console.log(ok?'PASS':'FAIL',name,JSON.stringify(detail??''));};
async function evalJson(e){return d.evalRaw(e);}
async function state(){return evalJson('__patrickHouse.snapshot()');}
async function waitFor(e,timeout=60000){const end=Date.now()+timeout;while(Date.now()<end){if(await evalJson(e))return;await d.sleep(200);}throw new Error('Timeout: '+e);}
async function button(selector){const p=await evalJson(`(()=>{const b=${selector};if(!b)return null;const r=b.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()`);if(!p)throw Error('missing button');await d.clickAt(p.x,p.y);await waitFor('document.querySelector(".house").dataset.cameraTransition==="idle"');}
async function shot(name){await d.shot(path.join(out,name+'.png'));}
async function hit(kind,lamp){return evalJson(`(()=>{const h=__patrickHouse;let target;h.scene.traverse(o=>{if(o.userData.interaction===${JSON.stringify(kind)}${lamp?`&&o.userData.lampKind===${JSON.stringify(lamp)}`:''}&&o.type==='Group'){let v=o,visible=true;while(v){if(!v.visible)visible=false;v=v.parent;}if(visible)target=o;}});if(!target)return null;const p=h.controls.target.clone().set(...h.worldCenter(target)).project(h.camera);const x=(p.x+1)*innerWidth/2,y=(1-p.y)*innerHeight/2;for(const dy of [0,-12,12,-24,24,-48,48])for(const dx of [0,-12,12,-24,24,-48,48]){if(x+dx<0||x+dx>innerWidth||y+dy<0||y+dy>innerHeight)continue;const r=h.pick(x+dx,y+dy);if(r?.interaction===${JSON.stringify(kind)}${lamp?`&&r.lampKind===${JSON.stringify(lamp)}`:''})return {x:x+dx,y:y+dy};}return null;})()`);}
try{
 await d.sleep(600);await d.start();await d.setViewport(1440,900);await d.navigate(url);
 await waitFor('document.querySelector(".house")?.dataset.houseState==="ready"');
 const first=await state();check('ready',first.state==='ready',first);
 const gpu=await evalJson(`(()=>{const gl=__patrickHouse.renderer.getContext();const e=gl.getExtension('WEBGL_debug_renderer_info');return e?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER)})()`);
 check('renderer-recorded',!!gpu,gpu);check('geometry',true,await evalJson('__patrickHouse.stat()'));await shot('01-whole');
 const skin=await evalJson(`(()=>{const rows=[];__patrickHouse.scene.traverse(o=>{if(o.isSkinnedMesh)rows.push({name:o.name,bones:o.skeleton.bones.length,weighted:!!o.geometry.attributes.skinWeight})});return rows})()`);
 check('loaded-skinned-character',skin.length>=5&&skin.every(o=>o.bones===9&&o.weighted),skin);
 for(const [id,title]of[['kitchen','厨房'],['bedroom','卧室'],['gym','健身区'],['living','地下客厅']]){
   await button(`[...document.querySelectorAll('.room-label')].find(b=>b.textContent.includes(${JSON.stringify(title)}))`);
   check('focus-'+id,(await state()).view===id);await shot('room-'+id);
   if(id==='living'&&!layout){
     const point=await hit('patrick');check('patrick-visible-hit',!!point,point);
     if(point){
       await evalJson(`window.__waveSamples=[];window.__waveEnd=performance.now()+6500;(function step(){__waveSamples.push(__patrickHouse.wavePose());if(performance.now()<__waveEnd)requestAnimationFrame(step)})()`);
       await d.clickAt(point.x,point.y);check('wave-start',(await state()).waveState!=='idle');
       const elapsed=()=>evalJson(`(()=>{const p=__patrickHouse.wavePose();return p.t+({raise:0,wave:.5,lower:2,idle:2.6}[p.state]??0)})()`);
       const firstT=await elapsed();await d.clickAt(point.x,point.y);check('repeat-click-does-not-restart',(await elapsed())>firstT);
       for(let i=0;i<8;i++){await shot('wave-'+String(i).padStart(2,'0'));await d.sleep(120);}
       await waitFor('__patrickHouse.snapshot().waveState==="idle"',20000);
       check('wave-return-idle',true);await d.sleep(500);
       const sampled=await evalJson('__waveSamples');fs.writeFileSync(path.join(out,'wave-poses.json'),JSON.stringify(sampled,null,2));
       check('wave-stages',['raise','wave','lower','idle'].every(s=>sampled.some(p=>p.state===s)),[...new Set(sampled.map(p=>p.state))]);
     }
     for(const [kind,lamp,key]of[['tv',null,'tvOn'],['lamp','floor','floorLampOn']]){const p=await hit(kind,lamp);check('hit-'+key,!!p,p);if(p){const before=(await state()).interact[key];await d.clickAt(p.x,p.y);check('toggle-'+key,(await state()).interact[key]!==before);}}
   }
   if(id==='kitchen'&&!layout){await button('document.querySelector("[data-house-back]")');const p=await hit('fan');check('hit-fan-in-whole',!!p,p);if(p){await d.clickAt(p.x,p.y);check('toggle-fan',(await state()).interact.fanSpinning===true);}}
   if(id==='bedroom'&&!layout){const p=await hit('lamp','bed');check('hit-bedLamp',!!p,p);if(p){await d.clickAt(p.x,p.y);check('toggle-bedLamp',(await state()).interact.bedLampOn===true);}}
   if(id==='gym'&&!layout){const p=await hit('tv');check('hit-upper-tv',!!p,p);if(p){const before=(await state()).interact;await d.clickAt(p.x,p.y);const after=(await state()).interact;check('upper-tv-isolated',after.upperTvOn!==before.upperTvOn&&after.tvOn===before.tvOn);}}
   await d.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await d.send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await waitFor('document.querySelector(".house").dataset.cameraTransition==="idle"');check('escape-'+id,(await state()).view==='whole');
 }
 await button('document.querySelector("[data-house-mode]")');check('exterior',(await state()).mode==='exterior');await shot('02-exterior');
 await d.setViewport(390,844);await d.sleep(800);check('exterior-mobile-fov',(await state()).fov===50);await shot('mobile-exterior');
 await button('document.querySelector("[data-house-mode]")');await shot('mobile-whole');
 const labels=await evalJson(`[...document.querySelectorAll('.room-label')].map(b=>{const r=b.getBoundingClientRect();return {text:b.textContent,left:r.left,top:r.top,right:r.right,bottom:r.bottom}})`);
 check('mobile-labels',labels.every(r=>r.left>=0&&r.top>=0&&r.right<=390&&r.bottom<=844),labels);
 await d.setViewport(844,390);await d.sleep(500);await shot('landscape');await d.setViewport(1440,900);await d.sleep(500);check('resize-return-fov',(await state()).fov===34);
 await d.drag(100,-30);check('drag-keeps-mode',(await state()).mode==='cutaway');
 const base=live?'https://gsyiswatchingu.github.io/':'http://127.0.0.1:8693/';
 await d.navigate(base+'pineapple-house.html?privacy=1&t='+Date.now());await waitFor('window.__pineappleHouse?.snapshot().state==="ready"');
 const pineapple=await evalJson('__pineappleHouse.snapshot()');check('pineapple-desktop-models',pineapple.loaded.length>=15&&pineapple.failed.length===0,pineapple);await shot('pineapple-desktop');
 await d.setViewport(390,844);await d.sleep(500);await shot('pineapple-mobile');check('pineapple-mobile-ready',(await evalJson('__pineappleHouse.snapshot().state'))==='ready');
 const log=d.getLog();check('zero-console-errors',log.errors.length===0,log.errors);check('zero-resource-failures',log.failedReq.length===0,log.failedReq);
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({url,gpu,checks,log,visualReview:'pending'},null,2));
 console.log('RESULT',checks.filter(c=>c.ok).length+'/'+checks.length,out);
 if(checks.some(c=>!c.ok))process.exitCode=1;
}finally{d.dispose();server?.kill();}
