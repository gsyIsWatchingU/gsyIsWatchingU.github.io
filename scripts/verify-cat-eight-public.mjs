import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {writeFileSync} from 'node:fs';

// 必须与已提交内容比较，避免并行工作区修改污染公网验收。
const commit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const paths=['assets/house-review/props/siamese-cat-eight-poses.glb','assets/house-review/props/siamese-cat-clean-bound.glb',...['index.html','viewer.js','runtime.json','correctives.json','geometry.json','contacts.json','neck-colors.json','provenance.json','retopology.json','joint-fit.json','README.md'].map(p=>'docs/cat-eight-poses-review/'+p)];
const hash=b=>createHash('sha256').update(b).digest('hex');
const expected=new Map(paths.map(path=>{const bytes=execFileSync('git',['show',commit+':'+path],{maxBuffer:128*1024*1024});return[path,{bytes:bytes.length,sha256:hash(bytes)}];}));
const base='https://gsyiswatchingu.github.io/';
async function check(path){const response=await fetch(base+path+'?verify='+commit+'&t='+Date.now());const bytes=Buffer.from(await response.arrayBuffer()),want=expected.get(path);return{path,bytes:bytes.length,sha256:hash(bytes),match:response.ok&&bytes.length===want.bytes&&hash(bytes)===want.sha256};}
let ready=false;
for(let i=0;i<18;i++){const runtime=await check('docs/cat-eight-poses-review/runtime.json');if(runtime.match){ready=true;break;}console.log('等待 Pages 更新',i+1);await new Promise(resolve=>setTimeout(resolve,10000));}
if(!ready)throw Error('公网 runtime 尚未对应已提交版本');
const records=await Promise.all(paths.map(check));
if(records.some(r=>!r.match))throw Error('公网内容不一致：'+JSON.stringify(records.filter(r=>!r.match)));
writeFileSync('docs/cat-eight-poses-review/public-resources.json',JSON.stringify({status:'passed',commit,base,records},null,2)+'\n');
console.log(JSON.stringify({commit,matches:records.length,total:paths.length}));
