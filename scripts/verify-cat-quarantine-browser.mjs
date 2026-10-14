import {launch} from './verification/neighborhood-cdp-client.mjs';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const outputIndex=process.argv.indexOf('--output'),out=outputIndex>=0?process.argv[outputIndex+1]:'docs/cat-anatomy-review',live=process.argv.includes('--live'),base=live?'https://gsyiswatchingu.github.io':'http://127.0.0.1:8770';
const c=await launch('tmp/cat-quarantine-'+(live?'live':'local'),9897);
try{
  await c.viewport(1100,800);await c.navigate(base+'/docs/cat-sit-v2-review/?t='+Date.now());await c.wait('document.querySelector("main").dataset.loaded==="true"');
  assert(await c.evaluate('document.querySelector("[data-pose=sit]").disabled'));
  await c.clickElement('[data-pose=sit]');await c.pause(500);assert.equal(await c.evaluate('window.__catReview.snapshot().sit'),0);
  await c.navigate(base+'/docs/cat-anatomy-review/?t='+Date.now());await c.wait('document.querySelector("main").dataset.loaded==="true"');
  assert(await c.evaluate('document.querySelector("[data-pose=lie]").disabled'),'被否定的 V2 侧卧应撤回');
  await c.navigate(base+'/pineapple-companion.html?privacy=1&t='+Date.now());await c.wait('window.__pineappleHouse?.snapshot().state==="ready"&&window.__pineappleHouse.companion?.snapshot().loaded');
  await c.clickElement('[data-house-room=living]');await c.pause(1600);
  const shapeCount=await c.evaluate('(()=>{let count=-1;window.__pineappleHouse.scene.traverse(n=>{if(n.name==="siamese_cat"&&!n.userData.petFur)count=n.morphTargetInfluences?.length??0});return count})()');assert.equal(shapeCount,0,'正式页面应加载原站立网格，不能加载被否定的坐姿');
  const before=await c.evaluate('window.__pineappleHouse.snapshot().pet.reactions'),point=await c.evaluate('JSON.parse(document.querySelector(".house").dataset.petScreen)');await c.click(...point);await c.pause(1400);
  const after=await c.evaluate('window.__pineappleHouse.snapshot().pet');assert(after.reactions>before&&after.sit===0);
  const errors=c.events.filter(e=>e.type==='exception'||e.type==='httpFailure');assert.equal(errors.length,0);
  const image=await c.send('Page.captureScreenshot',{format:'png'});writeFileSync(out+'/quarantine-'+(live?'live':'local')+'.png',Buffer.from(image.data,'base64'));
  writeFileSync(out+'/quarantine-'+(live?'live':'local')+'.json',JSON.stringify({status:'passed',base,shapeCount,sitDisabled:true,oldSideRestWithdrawn:true,catClicked:true,after,errors},null,2)+'\n');console.log('withdrawn sitting and old side rest / original mesh / native cat greeting: PASS');
}finally{await c.dispose();}
