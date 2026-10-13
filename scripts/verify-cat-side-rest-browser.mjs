import {launch} from './verification/neighborhood-cdp-client.mjs';
import {writeFileSync,mkdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const live=process.argv.includes('--live'),rootArg=process.argv.indexOf('--out-root'),root=rootArg>=0?process.argv[rootArg+1]:'docs/cat-side-rest-review',base=live?'https://gsyiswatchingu.github.io':'http://127.0.0.1:8770',out=root+'/'+(live?'live':'local');mkdirSync(out,{recursive:true});
const c=await launch('tmp/cat-side-rest-'+(live?'live':'local'),9898),records=[];
async function shot(name){const r=await c.send('Page.captureScreenshot',{format:'png'});writeFileSync(out+'/'+name+'.png',Buffer.from(r.data,'base64'));}
try{
 await c.viewport(1100,800);await c.navigate(base+'/docs/cat-anatomy-review/?t='+Date.now());await c.wait('document.querySelector("main").dataset.loaded==="true"');
 await c.clickElement('[data-view="opposite"]');
 await c.evaluate(`window.__record={chunks:[]};window.__record.recorder=new MediaRecorder(document.querySelector('canvas').captureStream(30),{mimeType:'video/webm;codecs=vp9'});window.__record.recorder.ondataavailable=e=>window.__record.chunks.push(e.data);window.__record.recorder.start();`);
 await c.clickElement('[data-pose="lie"]');
 for(let i=0;i<12;i++){await c.pause(170);await shot('lie-frame-'+i);records.push({frame:i,snapshot:await c.evaluate('window.__catReview.snapshot()')});}
 await c.wait('window.__catReview.snapshot().sideLie>.999');await c.pause(500);await c.clickElement('#greet');
 for(let i=0;i<12;i++){await c.pause(170);await shot('rise-frame-'+i);records.push({riseFrame:i,snapshot:await c.evaluate('window.__catReview.snapshot()')});}
 await c.wait('window.__catReview.snapshot().sideLie<.001');await c.pause(400);
 const movie=await c.evaluate(`new Promise(resolve=>{const r=window.__record;r.recorder.onstop=()=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.readAsDataURL(new Blob(r.chunks,{type:'video/webm'}));};r.recorder.stop();})`);writeFileSync(out+'/lie-rise.webm',Buffer.from(movie,'base64'));
 await c.navigate(base+'/docs/cat-anatomy-review/?t='+Date.now());await c.wait('document.querySelector("main").dataset.loaded==="true"');await c.clickElement('[data-pose="lie"]');await c.wait('window.__catReview.snapshot().sideLie>.999');await c.clickElement('#pause');
 for(const view of ['side','front','opposite','diagonal','rear']){await c.clickElement('[data-view="'+view+'"]');await c.pause(300);await shot('lie-'+view);records.push({view,snapshot:await c.evaluate('window.__catReview.snapshot()')});}
 await c.clickElement('#fur');for(const view of ['opposite','front']){await c.clickElement('[data-view="'+view+'"]');await c.pause(300);await shot('bare-'+view);}
 const errors=c.events.filter(e=>e.type==='exception'||e.type==='httpFailure');assert.equal(errors.length,0);assert(records.some(r=>r.snapshot.sideLie>.999));assert(records.some(r=>r.riseFrame!==undefined&&r.snapshot.sideLie<.001));
 writeFileSync(out+'/browser.json',JSON.stringify({status:'passed',base,records,errors},null,2)+'\n');
 writeFileSync(out+'/frames.html','<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#eee9dd;display:grid;grid-template-columns:repeat(3,1fr);gap:5px}figure{margin:0}img{width:100%;display:block}figcaption{font:14px sans-serif}</style>'+records.filter(r=>r.frame!==undefined||r.riseFrame!==undefined).map(r=>'<figure><img src="'+(r.frame!==undefined?'lie-frame-'+r.frame:'rise-frame-'+r.riseFrame)+'.png"><figcaption>'+r.snapshot.sideLie.toFixed(3)+'</figcaption></figure>').join(''));
 await c.viewport(1500,2960);await c.navigate('http://127.0.0.1:8770/'+out+'/frames.html');await c.pause(500);await shot('contact-sheet');console.log(JSON.stringify({records:records.length,errors,movieBytes:Buffer.from(movie,'base64').length}));
}finally{await c.dispose();}
