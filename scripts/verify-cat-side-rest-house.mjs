import {launch} from './verification/neighborhood-cdp-client.mjs';
import {writeFileSync,mkdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const live=process.argv.includes('--live'),base=live?'https://gsyiswatchingu.github.io':'http://127.0.0.1:8770',out='docs/cat-side-rest-review/'+(live?'live':'local');mkdirSync(out,{recursive:true});
const c=await launch('tmp/cat-side-house-'+(live?'live':'local'),9899);
try{
 await c.viewport(1440,900);await c.navigate(base+'/pineapple-companion.html?privacy=1&t='+Date.now());await c.wait('window.__pineappleHouse?.snapshot().state==="ready"&&window.__pineappleHouse.companion?.snapshot().loaded');await c.clickElement('[data-house-room=living]');await c.pause(1600);
 const targets=await c.evaluate('(()=>{let targets=[];window.__pineappleHouse.scene.traverse(n=>{if(n.name==="siamese_cat"&&!n.userData.petFur)targets=Object.keys(n.morphTargetDictionary??{})});return targets})()');assert.equal(targets.filter(n=>n.startsWith('lie_')).length,8);assert.equal(targets.filter(n=>n.startsWith('sit_')).length,0);
 console.log('正式页模型已加载，等待猫咪自主侧卧');await c.wait('window.__pineappleHouse.snapshot().pet.sideLie>.999',150000);
 const resting=await c.evaluate('window.__pineappleHouse.snapshot().pet');let shot=await c.send('Page.captureScreenshot',{format:'png'});writeFileSync(out+'/house-lie.png',Buffer.from(shot.data,'base64'));
 const point=await c.evaluate('JSON.parse(document.querySelector(".house").dataset.petScreen)');await c.click(...point);await c.wait('window.__pineappleHouse.snapshot().pet.reactions>'+resting.reactions);await c.wait('window.__pineappleHouse.snapshot().pet.sideLie<.001');await c.pause(1000);
 const greeting=await c.evaluate('window.__pineappleHouse.snapshot().pet');assert.equal(greeting.sit,0);shot=await c.send('Page.captureScreenshot',{format:'png'});writeFileSync(out+'/house-greet.png',Buffer.from(shot.data,'base64'));
 const cleared=await c.evaluate('(()=>{let cleared=true;window.__pineappleHouse.scene.traverse(n=>{if(n.name==="siamese_cat"&&!n.userData.petFur)cleared=Object.entries(n.morphTargetDictionary??{}).filter(([key])=>key.startsWith("lie_")).every(([,index])=>n.morphTargetInfluences[index]===0)});return cleared})()');assert(cleared);
 const errors=c.events.filter(e=>e.type==='exception'||e.type==='httpFailure');assert.equal(errors.length,0);writeFileSync(out+'/house.json',JSON.stringify({status:'passed',base,targets,resting,greeting,morphsCleared:cleared,sitDisabled:true,nativeCatClicked:true,errors},null,2)+'\n');console.log('自主侧卧、原生点击起身、清除侧卧形态：通过');
}finally{await c.dispose();}
