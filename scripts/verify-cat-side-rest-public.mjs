import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const commit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),root='docs/cat-side-rest-review';
const runtime=JSON.parse(readFileSync(root+'/runtime.json')),preview=JSON.parse(readFileSync(root+'/runtime-preview.json'));
const paths=['index.html','pineapple-house.html','pineapple-companion.html','src/data/pineapple-house.json','assets/pineapple-house.js',runtime.output,preview.output,'docs/cat-anatomy-review/index.html','docs/cat-anatomy-review/viewer.js','docs/cat-anatomy-review/runtime.json',root+'/runtime.json',root+'/runtime-preview.json'];
const hash=buffer=>createHash('sha256').update(buffer).digest('hex'),expected=new Map(paths.map(path=>[path,hash(execFileSync('git',['show','HEAD:'+path],{maxBuffer:16*1024*1024}))]));
let records=[];for(let attempt=0;attempt<20;attempt++){
 records=await Promise.all(paths.map(async path=>{try{const response=await fetch('https://gsyiswatchingu.github.io/'+path+'?verify='+commit+'&t='+Date.now(),{signal:AbortSignal.timeout(20000)}),actual=hash(Buffer.from(await response.arrayBuffer()));return{path,status:response.status,expected:expected.get(path),actual,match:response.ok&&actual===expected.get(path)};}catch(error){return{path,match:false,error:error.message};}}));
 console.log('公网文件一致：'+records.filter(r=>r.match).length+'/'+paths.length);if(records.every(r=>r.match))break;if(attempt<19)await new Promise(resolve=>setTimeout(resolve,15000));
}
assert(records.every(r=>r.match),'公网页面、脚本与两份模型必须属于当前提交');writeFileSync(root+'/public-resources.json',JSON.stringify({status:'passed',commit,records},null,2)+'\n');
