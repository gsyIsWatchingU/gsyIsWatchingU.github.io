// 公网字节核对，HTTP 成功及版本字符串不能替代模型 SHA。
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const base=process.argv[2]||'https://gsyiswatchingu.github.io/';
const out=process.argv[3]||'tmp/v7-production/public-resources.json';
const root=fileURLToPath(new URL('../..',import.meta.url));
const registry=JSON.parse(fs.readFileSync(path.join(root,'docs/neighborhood-review/asset-index.json'),'utf8'));
const commit=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
const paths=['docs/neighborhood-review/index.html','docs/neighborhood-review/neighborhood.js','docs/neighborhood-review/neighborhood.css','docs/neighborhood-review/config/house-config.json','docs/neighborhood-review/asset-index.json',...registry.assets.map(a=>a.runtime)];
const checks=await Promise.all(paths.map(async file=>{
 const local=execFileSync('git',['show',commit+':'+file],{cwd:root,maxBuffer:32*1024*1024}),url=new URL(file,base);url.searchParams.set('t',Date.now());
 const response=await fetch(url),data=Buffer.from(await response.arrayBuffer());
 const hash=b=>createHash('sha256').update(b).digest('hex');return{file,url:url.href,status:response.status,expectedSHA256:hash(local),actualSHA256:hash(data),bytes:data.length,match:response.ok&&hash(local)===hash(data)};
}));
fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify({checkedAt:new Date().toISOString(),expectedGitCommit:commit,checks,passed:checks.filter(c=>c.match).length,failed:checks.filter(c=>!c.match).length},null,2));
console.log(JSON.stringify(checks.map(c=>({file:c.file,status:c.status,match:c.match,bytes:c.bytes}))));if(checks.some(c=>!c.match))process.exitCode=1;
