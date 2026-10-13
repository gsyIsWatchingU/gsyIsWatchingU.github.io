// 故障注入只阻断网络；恢复和进入均由浏览器原生点击触发。
import {launch} from './neighborhood-cdp-client.mjs';
import fs from 'node:fs';
const out='tmp/v7-production/retry-probe',d=await launch(out,9963),checks=[];let interiorRequests=0;
d.socket.addEventListener('message',e=>{const m=JSON.parse(String(e.data));if(m.method==='Network.requestWillBeSent'&&m.params.request.url.includes('squidward-interior'))interiorRequests++;});
const wait=()=>d.wait(`window.__neighborhood?.state.extMesh&&!window.__neighborhood.state.camAnim&&!window.__neighborhood.state.doorAnim`);
function check(name,ok,actual){checks.push({name,ok,actual});console.log((ok?'PASS ':'FAIL ')+name);}
try{
 await d.viewport(1440,900);await d.send('Network.setBlockedURLs',{urls:['*squidward-house.glb*']});
 await d.navigate('http://127.0.0.1:8797/docs/neighborhood-review/?v=20261013-squidward-v7-final');
 await d.wait(`!document.querySelector('#error-panel').hidden`);check('exterior-failure-retry-visible',true);await d.screenshot('exterior-error');
 await d.send('Network.setBlockedURLs',{urls:[]});await d.clickElement('#btn-retry');await wait();check('exterior-native-retry',(await d.state()).view==='exterior');
 await d.send('Network.setBlockedURLs',{urls:['*squidward-interior.glb*']});await d.clickElement('#btn-cutaway');
 await d.wait(`!document.querySelector('#error-panel').hidden`);check('interior-error-stops-spinner',await d.evaluate(`getComputedStyle(document.querySelector('#loading')).display==='none'`));await d.screenshot('interior-error');
 await d.send('Network.setBlockedURLs',{urls:[]});await d.clickElement('#btn-retry');await wait();
 await d.clickElement('#btn-cutaway');await d.clickElement('#btn-cutaway');await d.wait(`window.__neighborhood.state.view==='cutaway'`);await wait();
 check('interior-native-recovery',(await d.state()).view==='cutaway');check('double-enter-single-success-request',interiorRequests===2,{totalRequests:interiorRequests,expected:'one deliberately blocked request + one recovered request'});
 fs.writeFileSync(out+'/results.json',JSON.stringify({checks,events:d.events,expectedFailures:'Two Network.setBlockedURLs resource failures are intentional; separate from healthy smoke.'},null,2));if(checks.some(c=>!c.ok))process.exitCode=1;
}finally{await d.dispose();}
