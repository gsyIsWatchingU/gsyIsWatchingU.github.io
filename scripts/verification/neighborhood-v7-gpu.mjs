// 独立硬件渲染采样；手机视口仍是桌面GPU仿真，不作为手机实机性能。
import {launch} from './neighborhood-cdp-client.mjs';
import fs from 'node:fs';
process.env.NEIGHBORHOOD_HARDWARE_GPU='1';
const out='tmp/v7-production/gpu-public-final2',d=await launch(out,9975),samples=[];
const wait=()=>d.wait(`window.__neighborhood?.state.extMesh&&!window.__neighborhood.state.camAnim&&!window.__neighborhood.state.doorAnim`);
const renderer=()=>d.evaluate(`(()=>{const gl=__neighborhood.renderer.getContext(),e=gl.getExtension('WEBGL_debug_renderer_info');return{renderer:e?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),visibility:document.visibilityState}})()`);
async function sample(name){
 await d.pause(1200);const hardware=await renderer();
 const fps=await d.evaluate(`new Promise(resolve=>{let start=performance.now(),frames=0,last=start,gaps=[];function count(t){frames++;gaps.push(t-last);last=t;if(t-start>=5000)resolve({frames,elapsedMs:t-start,fps:frames*1000/(t-start),worstGapMs:Math.max(...gaps)});else requestAnimationFrame(count)}requestAnimationFrame(count)})`);
 const result={name,...hardware,...fps,state:await d.state(),minimum:name.startsWith('mobile')?30:50};result.hardware=!/SwiftShader|software/i.test(result.renderer);result.meets=result.hardware&&result.fps>=result.minimum;samples.push(result);console.log(JSON.stringify(result));await d.screenshot(name);
}
try{
 for(const mobile of [false,true]){
  const tag=mobile?'mobile-simulation':'desktop';await d.viewport(mobile?390:1440,mobile?844:900,mobile);
  await d.navigate('https://gsyiswatchingu.github.io/docs/neighborhood-review/?v=20261013-squidward-v7-final2');await wait();await sample(tag+'-exterior');
  await d.clickElement('#btn-cutaway',mobile);await d.wait(`__neighborhood.state.view==='cutaway'`);await wait();await sample(tag+'-cutaway');
 }
 const errors=d.events.filter(e=>e.type==='exception'||e.type==='error'||e.type==='browserError'||e.type==='httpFailure'||(e.type==='resourceFailure'&&!e.canceled));
 fs.writeFileSync(out+'/results.json',JSON.stringify({samples,errors,events:d.events,physicalPhone:'unverified',performanceDefinition:'5s requestAnimationFrame cadence in the running 3D app; headless hardware renderer recorded; not a physical phone test'},null,2));
 if(samples.some(s=>!s.meets)||errors.length)process.exitCode=1;
}finally{await d.dispose();}
