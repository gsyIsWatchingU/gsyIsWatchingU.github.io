import {launch} from './verification/neighborhood-cdp-client.mjs';
import {writeFileSync,mkdirSync} from 'node:fs';
const label=process.argv[2]??'before',out='docs/cat-crouch-review/'+label;mkdirSync(out,{recursive:true});
const c=await launch('tmp/cat-crouch-cdp',9894);const records=[];
try{await c.viewport(1100,800);await c.navigate('http://127.0.0.1:8770/docs/cat-crouch-review/?t='+Date.now());await c.wait('document.querySelector("main").dataset.loaded==="true"');
for(const pose of ['idle','sit','lie']){await c.clickElement(`[data-pose="${pose}"]`);await c.wait(`window.__catReview.snapshot().state==="${pose}"`);if(pose==='sit')await c.wait('window.__catReview.snapshot().sit>.999');if(pose==='lie')await c.wait('window.__catReview.snapshot().sideLie>.999');await c.clickElement('#pause');for(const view of ['side','front','rear']){await c.clickElement(`[data-view="${view}"]`);await c.pause(600);const shot=await c.send('Page.captureScreenshot',{format:'png'});writeFileSync(`${out}/${pose}-${view}.png`,Buffer.from(shot.data,'base64'));records.push({pose,view,snapshot:await c.evaluate('window.__catReview.snapshot()'),bones:await c.evaluate('window.__catReview.bones()')});}await c.clickElement('#pause');}
writeFileSync(`${out}/browser.json`,JSON.stringify({records,errors:c.events.filter(e=>e.type==='exception')},null,2)+'\n');console.log('captured',records.length);
}finally{await c.dispose();}
