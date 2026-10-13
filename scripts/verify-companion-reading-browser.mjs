import {makeDriver} from './verification/cdp-driver.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const tag=process.argv[2]??'after',live=process.argv.includes('--live');
const out=`docs/house-companion-review/reading-repair/${tag}`;mkdirSync(out,{recursive:true});
const d=makeDriver({port:9890,profile:`${process.cwd()}/tmp/reading-${Date.now()}`,gpu:true});
const records=[];
try {
 await d.start();await d.setViewport(1280,900);
 await d.navigate((live?'https://gsyiswatchingu.github.io':'http://127.0.0.1:8786')+'/pineapple-companion.html?privacy=1&t='+Date.now());
 const wait=async e=>{for(let i=0;i<160;i++){if(await d.evalRaw(e))return;await d.sleep(300);}throw Error('timeout '+e);};
 await wait('window.__pineappleHouse?.companion?.snapshot().loaded');
 const click=async selector=>{const p=await d.evalRaw(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()`);await d.clickAt(p.x,p.y);};
 const select=async value=>{const steps=await d.evalRaw(`Array.from(document.querySelector('[data-companion-action]').options).findIndex(o=>o.value===${JSON.stringify(value)})`);await click('[data-companion-action]');for(const key of ['Home',...Array(steps).fill('ArrowDown'),'Enter'])for(const type of ['keyDown','keyUp'])await d.send('Input.dispatchKeyEvent',{type,key,code:key});};
 // Only the evidence camera is set directly. Activity changes use native select input.
 const camera=async angle=>d.evalRaw(`(()=>{const h=window.__pineappleHouse,a=h.companion.actor,p=a.position.clone();p.y+=.47;h.controls.target.copy(p);h.camera.position.copy(p).add(p.clone().set(${Math.sin(angle)*2},.1,${Math.cos(angle)*2}));h.controls.update();})()`);
 const measure=()=>d.evalRaw(`(()=>{const h=window.__pineappleHouse,a=h.companion.actor,v=a.children[0],b=a.getObjectByName('companion-open-book'),T=h.camera.position.constructor; a.updateMatrixWorld(true);let points=[];b.traverse(n=>{if(!n.isMesh||!n.visible||n.parent.visible===false)return;const p=n.geometry.attributes.position;for(let i=0;i<p.count;i++)points.push(new T().fromBufferAttribute(p,i).applyMatrix4(n.matrixWorld).applyMatrix4(v.matrixWorld.clone().invert()));});const grips=[1,-1].map((side,i)=>{const hand=a.getObjectByName('comp_hand_'+(i?'r':'l')),upper=a.getObjectByName('comp_arm_'+(i?'r':'l')),lower=a.getObjectByName('comp_forearm_'+(i?'r':'l'));const target=b.localToWorld(new T(side*.30,-.11,.03)),w=hand.getWorldPosition(new T()),s=upper.getWorldPosition(new T()),e=lower.getWorldPosition(new T());return{error:w.distanceTo(target),reach:s.distanceTo(target)/(s.distanceTo(e)+e.distanceTo(w))};});return{state:h.companion.snapshot(),bookPosition:b.position.toArray(),bookRotation:b.rotation.toArray(),bookTop:Math.max(...points.map(p=>p.y)),grips,failed:h.snapshot().failed};})()`);
 for(const action of ['journal','read']){
  await select(action);await wait(`(()=>{const s=window.__pineappleHouse.companion.snapshot();return s.activity===${JSON.stringify(action)}&&s.book.visible&&s.entryTime>=${action==='read'?5.6:2}})()`);
  await camera(0);await d.sleep(250);records.push({action,value:await measure()});await d.shot(`${out}/${action}-front.png`);
  await camera(.9);await d.sleep(250);await d.shot(`${out}/${action}-side.png`);
  if(tag!=='before'){const m=records.at(-1).value;console.log(JSON.stringify({action,bookTop:m.bookTop,grips:m.grips}));assert(m.bookTop<.70,'书本上沿低于嘴部');assert(m.grips.every(g=>g.error<.012&&g.reach<=1.001),'双手可触及书本');}
 }
 await d.setViewport(390,844);await select('journal');await wait(`(()=>{const s=window.__pineappleHouse.companion.snapshot();return s.activity==='journal'&&s.book.visible&&s.entryTime>=2})()`);await camera(0);await d.sleep(300);await d.shot(`${out}/mobile-front.png`);
 await select('journal');await wait(`window.__pineappleHouse.companion.snapshot().book.visible`);
 const cycle=await d.evalRaw(`new Promise(resolve=>{const h=window.__pineappleHouse,a=h.companion.actor,b=a.getObjectByName('companion-open-book'),v=a.children[0],T=h.camera.position.constructor,samples=[],start=performance.now();function frame(){a.updateMatrixWorld(true);let top=-Infinity;b.traverse(n=>{if(!n.isMesh||!n.visible||n.parent.visible===false)return;const p=n.geometry.attributes.position;for(let i=0;i<p.count;i++){const point=new T().fromBufferAttribute(p,i).applyMatrix4(n.matrixWorld).applyMatrix4(v.matrixWorld.clone().invert());top=Math.max(top,point.y);}});samples.push({time:(performance.now()-start)/1000,top,turning:h.companion.snapshot().book.turning,visible:b.visible});if(performance.now()-start<4900)requestAnimationFrame(frame);else resolve(samples);}requestAnimationFrame(frame);})`);
 console.log(JSON.stringify({cycleFrames:cycle.length,maxBookTop:Math.max(...cycle.map(s=>s.top)),hiddenFrames:cycle.filter(s=>!s.visible).length}));
 if(tag!=='before'){assert(cycle.every(s=>s.visible&&s.top<.70),'完整翻页周期不挡嘴');assert(cycle.some(s=>s.turning),'实际观察到翻页');assert.equal(d.getLog().errors.length,0);}
 writeFileSync(`${out}/results.json`,JSON.stringify({records,cycle,log:d.getLog(),phone:'viewport simulation'},null,2)+'\n');console.log(JSON.stringify({tag,cycleFrames:cycle.length,maxBookTop:Math.max(...cycle.map(s=>s.top)),records:records.map(r=>({action:r.action,...r.value,state:undefined}))}));
}finally{d.dispose();}
