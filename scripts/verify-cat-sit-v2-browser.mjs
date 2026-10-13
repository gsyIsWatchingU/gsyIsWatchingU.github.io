import {launch} from './verification/neighborhood-cdp-client.mjs';
import {writeFileSync,mkdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const rootIndex=process.argv.indexOf('--review-path');
const label=process.argv[2]??'local',root=rootIndex>=0?process.argv[rootIndex+1]:'docs/cat-sit-v2-review',out=root+'/'+label;mkdirSync(out,{recursive:true});
const c=await launch('tmp/cat-sit-v2-'+label,9896);const records=[];
async function shot(name){const r=await c.send('Page.captureScreenshot',{format:'png'});writeFileSync(out+'/'+name+'.png',Buffer.from(r.data,'base64'));}
try{
  await c.viewport(1100,800);const base=process.argv.includes('--live')?'https://gsyiswatchingu.github.io':'http://127.0.0.1:8770';await c.navigate(base+'/'+root+'/?t='+Date.now());await c.wait('document.querySelector("main").dataset.loaded==="true"');
  await c.evaluate(`window.__record={chunks:[]};window.__record.recorder=new MediaRecorder(document.querySelector('canvas').captureStream(30),{mimeType:'video/webm;codecs=vp9'});window.__record.recorder.ondataavailable=e=>window.__record.chunks.push(e.data);window.__record.recorder.start();`);
  await c.pause(500);await c.clickElement('[data-pose="sit"]');
  for(let i=0;i<12;i++){await c.pause(170);await shot('sit-frame-'+i);records.push({frame:i,snapshot:await c.evaluate('window.__catReview.snapshot()')});}
  await c.wait('window.__catReview.snapshot().sit>.999');await c.pause(700);await c.clickElement('#greet');
  for(let i=0;i<12;i++){await c.pause(170);await shot('rise-frame-'+i);records.push({riseFrame:i,snapshot:await c.evaluate('window.__catReview.snapshot()')});}
  await c.wait('window.__catReview.snapshot().sit<.001');await c.pause(600);
  const movie=await c.evaluate(`new Promise(resolve=>{const r=window.__record;r.recorder.onstop=()=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.readAsDataURL(new Blob(r.chunks,{type:'video/webm'}));};r.recorder.stop();})`);writeFileSync(out+'/sit-rise.webm',Buffer.from(movie,'base64'));
  // 招呼会转身朝向镜头。重载后再拍固定视角，避免把已转身的正面误标成侧面。
  await c.navigate(base+'/'+root+'/?t='+Date.now());await c.wait('document.querySelector("main").dataset.loaded==="true"');
  for(const pose of ['sit','lie']){
    await c.clickElement('[data-pose="'+pose+'"]');await c.wait('window.__catReview.snapshot().'+(pose==='sit'?'sit':'sideLie')+'>.999');await c.clickElement('#pause');
    for(const view of ['side','front','rear']){await c.clickElement('[data-view="'+view+'"]');await c.pause(250);await shot(pose+'-'+view);records.push({pose,view,snapshot:await c.evaluate('window.__catReview.snapshot()')});}
    if(pose==='sit'){await c.clickElement('#fur');for(const view of ['side','front','rear']){await c.clickElement('[data-view="'+view+'"]');await c.pause(250);await shot('bare-'+view);}await c.clickElement('#fur');}
    await c.clickElement('#pause');
  }
  const errors=c.events.filter(e=>e.type==='exception'||e.type==='httpFailure');assert.equal(errors.length,0);assert(records.some(r=>r.snapshot.sit>.999));
  assert(records.some(r=>r.riseFrame!==undefined&&r.snapshot.sit<.001),'原生招呼应完整起身');
  writeFileSync(out+'/browser.json',JSON.stringify({status:'passed',base,records,errors},null,2)+'\n');
  writeFileSync(out+'/frames.html','<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#eee9dd;display:grid;grid-template-columns:repeat(3,1fr);gap:5px}figure{margin:0}img{width:100%;display:block}figcaption{font:14px sans-serif}</style>'+records.filter(r=>r.frame!==undefined).map(r=>'<figure><img src="sit-frame-'+r.frame+'.png"><figcaption>'+r.frame+' · '+r.snapshot.sit+'</figcaption></figure>').join(''));
  await c.viewport(1500,1480);await c.navigate('http://127.0.0.1:8770/'+out+'/frames.html');await c.pause(400);await shot('contact-sheet');console.log(JSON.stringify({records:records.length,errors,movieBytes:Buffer.from(movie,'base64').length}));
}finally{await c.dispose();}
