// 对照提交内的字节验证公网资源，避免工作区换行和并行修改造成误判。
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const files=['docs/living-furniture-review/index.html','docs/living-furniture-review/viewer.js','styles/living-furniture-review.css','styles/house-music.css','assets/living-furniture-review/sofa.glb','assets/living-furniture-review/shell.glb','docs/living-furniture-review/sources/user-sofa.png','docs/living-furniture-review/sources/user-shell.png','docs/living-furniture-review/sources/sofa-clean.png','docs/living-furniture-review/sources/shell.png'];
const expected=new Map(files.map(file=>[file,execFileSync('git',['show','HEAD:'+file],{maxBuffer:12e6})]));
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
let records=[];
for(let attempt=0;attempt<18;attempt++){
  records=await Promise.all(files.map(async file=>{try{const response=await fetch('https://gsyiswatchingu.github.io/'+file+'?t='+Date.now(),{signal:AbortSignal.timeout(20000)});const bytes=Buffer.from(await response.arrayBuffer());return{file,status:response.status,bytes:bytes.length,sha256:sha(bytes),matches:response.ok&&sha(bytes)===sha(expected.get(file))};}catch(error){return{file,matches:false,error:error.message};}}));
  const matched=records.filter(record=>record.matches).length;console.log(JSON.stringify({attempt:attempt+1,matched,total:files.length}));
  if(matched===files.length)break;
  await new Promise(resolve=>setTimeout(resolve,10000));
}
const result={commit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),checkedAt:new Date().toISOString(),records};
fs.writeFileSync('docs/living-furniture-review/public-resources.json',JSON.stringify(result,null,2)+'\n');
if(records.some(record=>!record.matches))process.exitCode=1;
