// 真实 Chrome：多视角、拖动、缩放、贝壳点击与手机视口检查。
import fs from 'node:fs';
import path from 'node:path';
import {makeDriver} from './cdp-driver.mjs';
const origin=process.argv[2]??'http://127.0.0.1:8776';
const out=process.argv[3]??'docs/living-furniture-review/local';
fs.mkdirSync(out,{recursive:true});
const driver=makeDriver({port:9364,profile:path.resolve('tmp/living-furniture/chrome'),gpu:true});
const records=[];
async function value(expression){return driver.evalRaw(expression);}
function check(name,ok,detail){records.push({name,ok:!!ok,detail});if(!ok)throw new Error(name+' '+JSON.stringify(detail));}
async function waitReady(){for(let i=0;i<120;i++){if(await value("document.body.dataset.reviewState==='ready'"))return;await driver.sleep(500);}throw new Error('模型载入超时');}
async function click(selector){const p=await value(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()`);await driver.clickAt(p.x,p.y);}
try{
  await driver.start();
  await driver.setViewport(1440,900);await driver.navigate(origin+'/docs/living-furniture-review/?t='+Date.now());await waitReady();
  check('desktop-loaded',await value('window.__livingReview.snapshot().models.length===5'),await value('window.__livingReview.snapshot()'));
  for(const asset of ['sofa','shell']){
    await click(`[data-asset="${asset}"]`);
    for(const view of ['diagonal','front','side','rear']){
      await click(`[data-view="${view}"]`);await driver.sleep(250);
      await driver.shot(path.join(out,asset+'-'+view+'.png'));
    }
    check(asset+'-grounded',Math.abs((await value('window.__livingReview.snapshot()')).bounds[asset].min[1])<.001,await value('window.__livingReview.snapshot()'));
  }
  const before=await value('window.__livingReview.snapshot().camera');await driver.drag(140,30,560,420);
  check('native-orbit',JSON.stringify(before)!==JSON.stringify(await value('window.__livingReview.snapshot().camera')),{before,after:await value('window.__livingReview.snapshot().camera')});
  const distance=await value('(()=>{const s=window.__livingReview.snapshot();return Math.hypot(...s.camera.map((v,i)=>v-s.target[i]))})()');
  await driver.wheel(-150);
  const afterDistance=await value('(()=>{const s=window.__livingReview.snapshot();return Math.hypot(...s.camera.map((v,i)=>v-s.target[i]))})()');
  check('native-zoom',afterDistance<distance,{distance,afterDistance});
  await click('[data-view="diagonal"]');
  let point=await value('window.__livingReview.shellPoint()');await driver.clickAt(point.x,point.y);
  check('shell-mesh-music',await value('window.__livingReview.snapshot().musicOpen'),{point});
  check('music-tracks',await value("document.querySelectorAll('[data-music-track]').length===3"));
  await driver.shot(path.join(out,'shell-music.png'));await click('[data-music-close]');
  check('music-close',await value('!window.__livingReview.snapshot().musicOpen'));
  await click('[data-asset="room"]');await driver.sleep(400);await driver.shot(path.join(out,'room.png'));
  check('room-view',await value("window.__livingReview.snapshot().active==='room'"),await value('window.__livingReview.snapshot()'));
  point=await value('window.__livingReview.shellPoint()');await driver.clickAt(point.x,point.y);
  check('room-shell-music',await value('window.__livingReview.snapshot().musicOpen'),{point});await click('[data-music-close]');
  await click('#wireframe');check('wireframe',await value('window.__livingReview.snapshot().wireframe'));await driver.shot(path.join(out,'room-wireframe.png'));await click('#wireframe');
  await driver.setViewport(390,844);await driver.sleep(300);
  for(const asset of ['sofa','shell','room']){await click(`[data-asset="${asset}"]`);await driver.sleep(300);await driver.shot(path.join(out,'mobile-'+asset+'.png'));check('mobile-'+asset+'-layout',await value('document.documentElement.scrollWidth===innerWidth'),await value('({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})'));const frames=await value('window.__livingReview.assetFrames()');check('mobile-'+asset+'-fully-visible',Object.values(frames).every(frame=>frame.onScreen),frames);}
  await click('#shell-music');check('mobile-music',await value('window.__livingReview.snapshot().musicOpen'));await click('[data-music-close]');
  const log=driver.getLog();check('runtime-errors',log.errors.length===0,log.errors);check('resource-failures',log.failedReq.length===0,log.failedReq);
  fs.writeFileSync(path.join(out,'browser.json'),JSON.stringify({origin,recordedAt:new Date().toISOString(),records,log},null,2)+'\n');
  console.log(JSON.stringify({passed:records.length,failed:records.filter(r=>!r.ok),out},null,2));
}catch(error){fs.writeFileSync(path.join(out,'failure.json'),JSON.stringify({message:error.message,records,log:driver.getLog()},null,2));throw error;}
finally{driver.dispose();process.exitCode=records.some(record=>!record.ok)?1:process.exitCode;}
