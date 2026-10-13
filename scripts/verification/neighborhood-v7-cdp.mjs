// 原生 CDP 输入验收；读取调试状态，不调用产品测试接口改变场景。
import {launch} from './neighborhood-cdp-client.mjs';
import fs from 'node:fs';
const url=process.argv[2]||'http://127.0.0.1:8797/docs/neighborhood-review/?v=20261013-squidward-v7';
const out=process.argv[3]||'tmp/v7-production/acceptance-local';
const d=await launch(out,9957),checks=[];
function check(name,ok,actual){checks.push({name,ok:!!ok,actual});console.log(`${ok?'PASS':'FAIL'} ${name}`);}
const settle=()=>d.wait(`window.__neighborhood?.state.extMesh&&!window.__neighborhood.state.camAnim&&!window.__neighborhood.state.doorAnim`);
const observe=()=>d.evaluate(`window.__inputEvidence=[];for(const t of ['pointerdown','pointerup','click','touchstart','touchmove','touchend','keydown','wheel'])document.addEventListener(t,e=>window.__inputEvidence.push({type:e.type,trusted:e.isTrusted,target:e.target.id||e.target.tagName}),{capture:true,passive:true});true`);
const layout=()=>d.evaluate(`(()=>{const rect=s=>{const r=document.querySelector(s).getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom}};const overlap=(a,b)=>Math.min(a.right,b.right)>Math.max(a.x,b.x)&&Math.min(a.bottom,b.bottom)>Math.max(a.y,b.y);const info=rect('#info-panel'),hint=rect('.controls-hint'),top=rect('.top-bar'),reset=rect('#btn-reset');return{overflow:document.documentElement.scrollWidth>innerWidth,infoHint:overlap(info,hint),topReset:overlap(top,reset),chipCount:[...document.querySelectorAll('.room-chip')].filter(e=>e.getBoundingClientRect().width>0&&!e.hidden).length};})()`);
const doorPoint=()=>d.evaluate(`(async()=>{const T=await import('three'),s=window.__neighborhood.state,m=s.extDoorMeshes.find(m=>m.name==='door_panel'),v=new T.Box3().setFromObject(m).getCenter(new T.Vector3()).project(window.__neighborhood.camera);return{x:(v.x*.5+.5)*innerWidth,y:(-.5*v.y+.5)*innerHeight};})()`);
const cam=()=>d.evaluate(`window.__neighborhood.camera.position.toArray()`);
const change=(a,b)=>Math.hypot(...a.map((v,i)=>v-b[i]));
try{
 for(const mobile of [false,true]){
  const tag=mobile?'mobile':'desktop',w=mobile?390:1440,h=mobile?844:900;
  d.stage(tag);await d.viewport(w,h,mobile);await d.navigate(url);await settle();await observe();
  let s=await d.state();check(tag+'-closed-exterior',s.view==='exterior'&&s.roomId===null&&s.extTris>0,s);
  check(tag+'-tier',s.tier===(mobile?'mobile':'desktop'),s.tier);
  check(tag+'-layout',Object.values(await layout()).slice(0,3).every(v=>!v),await layout());
  await d.screenshot(tag+'-exterior');
  if(!mobile){
   const before=await cam();await d.drag(w*.7,h*.45,w*.9,h*.45);check('desktop-orbit',change(before,await cam())>.1);await d.screenshot('desktop-side');
   await d.drag(w*.7,h*.45,w*.95,h*.45);await d.screenshot('desktop-back');
   await d.clickElement('#btn-reset');await settle();
  }
  const p=await doorPoint();if(!mobile){await d.mouse?.('mouseMoved',p.x,p.y);}
  await (mobile?d.tap:d.click)(p.x,p.y);await d.wait(`window.__neighborhood.state.view==='cutaway'`);await settle();
  s=await d.state();check(tag+'-native-door-entry',s.view==='cutaway'&&s.intTris>0&&s.roomId===null,{point:p,state:s});
  check(tag+'-four-chips',(await layout()).chipCount===4,await layout());await d.screenshot(tag+'-cutaway');
  if(mobile){
   const before=await cam(),x=w*.64,y=h*.48;
   await d.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x-28,y,id:1},{x:x+28,y,id:2}]});
   for(let k=1;k<=8;k++){await d.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-28-k*5,y,id:1},{x:x+28+k*5,y,id:2}]});await d.pause(70);}
   await d.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await d.pause(700);check('mobile-native-pinch',change(before,await cam())>.05);
   await d.clickElement('#btn-reset',true);await settle();s=await d.state();check('mobile-pinch-reset',s.view==='cutaway'&&s.roomId===null,s);
  }else{
   const before=await cam();await d.wheel(w*.8,h*.5,-150);check('desktop-wheel',change(before,await cam())>.05);await d.clickElement('#btn-reset');await settle();
  }
  for(const[i,room]of ['kitchen','living','bedroom','bathroom'].entries()){
   await d.clickElement(`#room-chips .room-chip:nth-child(${i+1})`,mobile);await settle();
   s=await d.state();check(tag+'-'+room+'-entry',s.roomId===room&&s.view==='room',s);
   check(tag+'-'+room+'-layout',Object.values(await layout()).slice(0,3).every(v=>!v),await layout());await d.screenshot(tag+'-'+room);
   if(mobile)await d.clickElement('#btn-exit',true);else await d.escape();await settle();
   s=await d.state();check(tag+'-'+room+'-return',s.view==='cutaway'&&s.roomId===null,s);
  }
  await d.clickElement('#room-chips .room-chip:nth-child(2)',mobile);await settle();
  await d.clickElement('#btn-exit',mobile);await d.clickElement('#btn-exit',mobile);await settle();
  s=await d.state();check(tag+'-double-return',s.view==='exterior'&&s.roomId===null,s);
  await d.clickElement('#btn-cutaway',mobile);await d.wait(`window.__neighborhood.state.view==='cutaway'`);await settle();
  await d.viewport(mobile?844:1100,mobile?390:900,mobile);await settle();check(tag+'-resize-layout',!(await layout()).overflow,await layout());await d.screenshot(tag+'-resized');
  await d.viewport(w,h,mobile);await settle();
  const trusted=await d.evaluate('window.__inputEvidence');check(tag+'-trusted-input',trusted.length>0&&trusted.every(e=>e.trusted),{count:trusted.length});fs.writeFileSync(out+'/'+tag+'-input.json',JSON.stringify(trusted,null,2));
  const direct=new URL(url);direct.searchParams.set('house','patrick');await d.navigate(direct.href);await settle();
  s=await d.state();check(tag+'-direct-patrick',s.house==='patrick'&&s.view==='exterior',s);
  await d.clickElement('#btn-squidward',mobile);await settle();await d.clickElement('#btn-cutaway',mobile);await d.wait(`window.__neighborhood.state.view==='cutaway'`);await settle();
  check(tag+'-switch-rebuild-chips',(await layout()).chipCount===4,await layout());
  await d.clickElement('#room-chips .room-chip:nth-child(4)',mobile);await settle();s=await d.state();check(tag+'-switch-chip-click',s.roomId==='bathroom',s);
 }
 const errors=d.events.filter(e=>e.type==='exception'||e.type==='error'||e.type==='browserError'||e.type==='httpFailure'||(e.type==='resourceFailure'&&!e.canceled));
 check('no-script-or-resource-errors',errors.length===0,errors);
 const report={url,checks,passed:checks.filter(c=>c.ok).length,failed:checks.filter(c=>!c.ok).length,events:d.events,environment:'Headless Chrome / ANGLE SwiftShader; mobile touch emulation; physical device and hardware FPS unverified'};
 fs.writeFileSync(out+'/results.json',JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,failed:report.failed}));if(report.failed)process.exitCode=1;
}finally{await d.dispose();}
