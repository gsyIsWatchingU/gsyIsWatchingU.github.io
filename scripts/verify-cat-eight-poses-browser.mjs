import {launch} from './verification/neighborhood-cdp-client.mjs';
import {writeFileSync,mkdirSync,readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const live=process.argv.includes('--live'),probe=process.argv.includes('--probe'),base=live?'https://gsyiswatchingu.github.io':'http://127.0.0.1:8770',runtime=JSON.parse(readFileSync('docs/cat-eight-poses-review/runtime.json')),out=probe?'tmp/cat-eight-probe':'docs/cat-eight-poses-review/'+(live?'live':'local');mkdirSync(out,{recursive:true});
const c=await launch('tmp/cat-eight-'+(live?'live':'local'),9901),records=[];
async function shot(name){const r=await c.send('Page.captureScreenshot',{format:'png'});writeFileSync(out+'/'+name+'.png',Buffer.from(r.data,'base64'));}
async function record(name){await shot(name);records.push({name,snapshot:await c.evaluate('window.__catEightReview.snapshot()')});}
try{
 await c.viewport(1100,800);await c.navigate(base+'/docs/cat-eight-poses-review/?t='+Date.now());await c.wait('document.querySelector("main").dataset.loaded==="true"');assert.equal(await c.evaluate('window.__catEightReview.runtimeSHA256'),runtime.runtimeSHA256);await c.pause(500);await record('standing');await c.clickElement('[data-view=face]');await c.pause(300);await record('face');await c.clickElement('[data-view=diagonal]');
 if(!probe)await c.evaluate(`window.__record={chunks:[]};window.__record.recorder=new MediaRecorder(document.querySelector('canvas').captureStream(24),{mimeType:'video/webm;codecs=vp9'});window.__record.recorder.ondataavailable=e=>window.__record.chunks.push(e.data);window.__record.recorder.start();`);
 for(const pose of runtime.poses){await c.clickElement('[data-pose='+pose.id+']');
  if(!probe)for(const threshold of [.15,.35,.55,.75,.95]){await c.wait('window.__catEightReview.snapshot().progress>='+threshold);await record(pose.id+'-enter-'+threshold);}
  await c.wait('window.__catEightReview.snapshot().progress>.9999');await record(pose.id);
  await c.clickElement('#pause');const paused=await c.evaluate('window.__catEightReview.snapshot().time');const frozen=await c.evaluate('window.__catEightReview.snapshot()');await c.pause(400);const still=await c.evaluate('window.__catEightReview.snapshot()');assert.equal(still.time,paused,'暂停应冻结动画');for(const key of ['headQuaternion','tailQuaternion'])frozen[key].forEach((v,i)=>assert(Math.abs(v-still[key][i])<1e-5,'暂停不能继续累加转头或抬尾'));if(!probe)assert(Math.abs(still.headYaw)<.002,'睡姿应消除打招呼偏移');
  if(!probe){for(const view of ['front','opposite','rear']){await c.clickElement('[data-view='+view+']');await c.pause(220);await record(pose.id+'-'+view);}await c.clickElement('#fur');await c.clickElement('[data-view=diagonal]');await c.pause(220);await record(pose.id+'-bare');await c.clickElement('#fur');}
  if(probe){await c.clickElement('#fur');await c.pause(100);await record(pose.id+'-bare');await c.clickElement('#fur');}
  const before=await c.evaluate('window.__catEightReview.snapshot().reactions'),point=await c.evaluate('window.__catEightReview.screen()');await c.click(...point);await c.pause(60);assert.equal(await c.evaluate('window.__catEightReview.snapshot().reactions'),before+1,'应实际点击猫咪并连续起身');
  if(!probe)for(const threshold of [.75,.45,.15]){await c.wait('window.__catEightReview.snapshot().progress<='+threshold);await record(pose.id+'-rise-'+threshold);}
  await c.wait('window.__catEightReview.snapshot().time===0');await c.clickElement('[data-view=diagonal]');
 }
 const errors=c.events.filter(e=>['exception','httpFailure','error','browserError'].includes(e.type)||(e.type==='resourceFailure'&&!e.canceled));assert.equal(errors.length,0,JSON.stringify(errors));
 if(!probe){const film=await c.evaluate(`new Promise(resolve=>{const r=window.__record;r.recorder.onstop=()=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.readAsDataURL(new Blob(r.chunks,{type:'video/webm'}));};r.recorder.stop();})`);writeFileSync(out+'/eight-poses.webm',Buffer.from(film,'base64'));}
 writeFileSync(out+'/browser.json',JSON.stringify({status:'passed',base,runtimeSHA256:runtime.runtimeSHA256,poses:runtime.poses.map(p=>p.id),nativeMeshClicks:runtime.poses.length,errors,records},null,2)+'\n');
 const selected=runtime.poses.map(p=>p.id);writeFileSync(out+'/sheet.html','<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#eee9dd;display:grid;grid-template-columns:repeat(2,1fr);gap:8px}figure{margin:0}img{width:100%}figcaption{font:16px sans-serif}</style>'+runtime.poses.map(p=>'<figure><img src="'+p.id+'.png"><figcaption>'+p.label+'</figcaption></figure>').join(''));await c.viewport(1500,2300);await c.navigate('http://127.0.0.1:8770/'+out+'/sheet.html');await c.pause(400);await shot('contact-sheet');console.log(JSON.stringify({poses:runtime.poses.length,records:records.length,errors}));
}finally{await c.dispose();}
