// 逐姿校验输入字节后复用已完成 CUDA 曲面；保留原 manifest，不冒充重算。
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const opt=n=>process.argv.find(a=>a.startsWith('--'+n+'='))?.slice(n.length+3);
const oldInput=opt('old-input'),input=opt('input'),skin=opt('skin'),out=opt('output'),wanted=opt('poses')?.split(',');
if(!oldInput||!input||!skin||!out||!wanted?.length)throw Error('需要 old-input/input/skin/output/poses');
const hash=b=>createHash('sha256').update(b).digest('hex'),read=p=>fs.readFileSync(p),sha=p=>hash(read(p));
const oldMeta=JSON.parse(read(path.join(oldInput,'goals.json'))),meta=JSON.parse(read(path.join(input,'goals.json')));
if(sha(path.join(oldInput,'anatomy-neutral.glb'))!==oldMeta.sourceSHA256||sha(path.join(input,'anatomy-neutral.glb'))!==meta.sourceSHA256||meta.sourceSHA256!==oldMeta.sourceSHA256)throw Error('复用模型不一致');
const parents=fs.readdirSync(skin).filter(f=>f.endsWith('-manifest.json')).map(f=>({file:f,bytes:read(path.join(skin,f)),value:JSON.parse(read(path.join(skin,f)))}));
const groups=new Map();
for(const id of wanted){
 const a=oldMeta.poses.find(p=>p.id===id),b=meta.poses.find(p=>p.id===id);if(!a||!b||JSON.stringify(a.times)!==JSON.stringify(b.times))throw Error('复用采样不一致 '+id);
 const inputProof={};for(const key of ['goals','matrices']){const h=sha(path.join(oldInput,a[key]));if(h!==sha(path.join(input,b[key])))throw Error('姿势已改变，须重新GPU求解 '+id+' '+key);inputProof[key]=h;}
 const file=id+'-skin.f32',found=parents.filter(p=>p.value.outputs?.some(a=>a.pose===id&&a.file===file));if(found.length!==1)throw Error('原始GPU manifest不唯一 '+id);
 const parent=found[0],m=parent.value,artifact=m.outputs.find(a=>a.pose===id&&a.file===file),bytes=read(path.join(skin,file));
 if(m.sourceSHA256!==meta.sourceSHA256||m.goalsSHA256!==sha(path.join(oldInput,'goals.json'))||artifact.sha256!==hash(bytes)||artifact.bytes!==bytes.length)throw Error('原GPU来源或输出不符 '+id);
 if(!groups.has(parent.file))groups.set(parent.file,{parent,proofs:[],outputs:[],files:[]});
 const group=groups.get(parent.file);group.proofs.push({pose:id,times:b.times,inputSHA256:inputProof});group.outputs.push(artifact);group.files.push({file,bytes});
}
fs.mkdirSync(out,{recursive:true});
for(const [file,{parent,proofs,outputs,files}]of groups){
 const m=parent.value,poses=proofs.map(p=>p.pose);
 const manifest={...m,method:'Verified reuse of completed CUDA curves; identical source and per-pose goals/matrices. '+m.method,goalsSHA256:sha(path.join(input,'goals.json')),poses,outputs,records:m.records?.filter(r=>poses.includes(r.pose)),reusedInput:{parentManifestSHA256:hash(parent.bytes),parentManifest:m,originalGoalsSHA256:m.goalsSHA256,proofs}};
 files.forEach(({file,bytes})=>fs.writeFileSync(path.join(out,file),bytes));fs.writeFileSync(path.join(out,'reused-'+file),JSON.stringify(manifest,null,2)+'\n');
 console.log('Reused actual GPU output',poses.join(','),'after input byte comparison');
}
