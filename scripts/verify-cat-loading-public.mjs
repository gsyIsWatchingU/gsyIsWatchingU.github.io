import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {writeFileSync} from 'node:fs';
const commit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const paths=['docs/cat-eight-poses-review/index.html','docs/cat-eight-poses-review/viewer.js','docs/cat-eight-poses-review/runtime.json','docs/cat-loading-review/README.md','scripts/cat-preview-loading.js','assets/house-review/props/siamese-cat-clean-bound.glb','assets/house-review/props/siamese-cat-eight-poses.glb'];
const sha=b=>createHash('sha256').update(b).digest('hex');
const expected=new Map(paths.map(path=>[path,sha(execFileSync('git',['show',commit+':'+path],{maxBuffer:128*1024*1024}))]));
async function check(path){const r=await fetch('https://gsyiswatchingu.github.io/'+path+'?verify='+commit+'&t='+Date.now());return{path,status:r.status,match:r.ok&&sha(Buffer.from(await r.arrayBuffer()))===expected.get(path)};}
let ready=false;
for(let i=0;i<45;i++){const state=await Promise.all(paths.slice(0,2).map(check));if(state.every(r=>r.match)){ready=true;break;}if(i%6===0)console.log('等待加载修复发布',i+1);await new Promise(r=>setTimeout(r,10000));}
if(!ready)throw Error('加载修复尚未在公网生效');
const records=await Promise.all(paths.map(check));
if(records.some(r=>!r.match))throw Error(JSON.stringify(records.filter(r=>!r.match)));
writeFileSync('docs/cat-loading-review/public-resources.json',JSON.stringify({status:'passed',commit,records},null,2)+'\n');
console.log(JSON.stringify({commit,matches:records.length,total:paths.length}));
