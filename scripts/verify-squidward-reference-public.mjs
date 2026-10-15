import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {writeFileSync} from 'node:fs';

const commit=execFileSync('git',['rev-parse',process.argv[2]||'HEAD'],{encoding:'utf8'}).trim();
const base='https://gsyiswatchingu.github.io/';
const paths=['squidward-model.html','assets/squidward-model.js','assets/models/squidward-bunny/squidward-bunny-active.glb','assets/models/squidward-bunny/asset.json','docs/squidward-home/index.html','docs/squidward-home/app.js','docs/squidward-home/config/house-config.json'];
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const expected=paths.map(path=>({path,sha256:sha(execFileSync('git',['show',commit+':'+path],{maxBuffer:64*1024*1024}))}));
let records=[];
for(let attempt=1;attempt<=60;attempt++){
  records=await Promise.all(expected.map(async item=>{
    const response=await fetch(base+item.path+'?t='+Date.now(),{signal:AbortSignal.timeout(30000)});
    const bytes=Buffer.from(await response.arrayBuffer());
    return {...item,status:response.status,bytes:bytes.length,actualSHA256:sha(bytes),match:response.ok&&sha(bytes)===item.sha256};
  }));
  console.log('公网资源',attempt,records.filter(r=>r.match).length+'/'+records.length);
  if(records.every(r=>r.match))break;
  await new Promise(resolve=>setTimeout(resolve,10000));
}
assert(records.every(r=>r.match),'公网资源尚未全部更新到目标提交');
const response=await fetch('https://api.github.com/repos/gsyIsWatchingU/gsyIsWatchingU.github.io/actions/runs?per_page=10');
const workflows=response.ok?(await response.json()).workflow_runs.filter(r=>r.head_sha===commit).map(r=>({id:r.id,name:r.name,status:r.status,conclusion:r.conclusion,url:r.html_url})):[];
writeFileSync('docs/squidward-reference-review/public-resources.json',JSON.stringify({status:'passed',commit,verifiedAt:new Date().toISOString(),records,workflows},null,2)+'\n');
console.log('7 个公网资源与目标提交逐字节一致',commit,workflows);
