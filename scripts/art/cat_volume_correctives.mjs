import * as THREE from 'three';
import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';

// 体积笼直接求解皮肤；该预算衡量与旧线性蒙皮基底的差异，不是平滑位移额度。
export const CAT_VOLUME_CORRECTIVE_LIMIT=.18;

// 离线体积求解只输出标准 GLB 补形，浏览器不启动 Python 或专用物理运行时。
export async function createCatVolumeCorrectives(parts,{python,neutral,skeleton,pillow}){
 const child=spawn(python,['-u','scripts/art/cat_volume_skin.py',neutral,skeleton,pillow],{windowsHide:true,stdio:['pipe','pipe','inherit']}),lines=createInterface({input:child.stdout})[Symbol.asyncIterator]();
 const kill=()=>child.kill();process.once('exit',kill);
 async function read(){const line=await lines.next();if(line.done)throw Error('体积皮肤求解器提前退出');const result=JSON.parse(line.value);if(result.error)throw Error('体积皮肤求解失败：'+result.error);return result;}
 const ready=await read();if(!ready.ready)throw Error('体积皮肤求解器未就绪');
 let cacheRoot;
 const statePath=(pose,t)=>cacheRoot+'/'+pose+'-'+t.toFixed(7)+'.state.npy';
 const count=parts.reduce((sum,m)=>sum+m.geometry.attributes.position.count,0),point=new THREE.Vector3();
 const decode=value=>{const b=Buffer.from(value,'base64');return new Float32Array(b.buffer,b.byteOffset,b.byteLength/4);};
 return{
  setCacheRoot(path){cacheRoot=path;},
  async restore(pose,progress){child.stdin.write(JSON.stringify({action:'restore',pose,progress,statePath:statePath(pose,progress)})+'\n');const result=await read();if(!result.restored)throw Error('缺少体积笼缓存，应清理此轮离线缓存后重建');},
  async compute(pose,progress){
   const positions=new Float32Array(count*3);let cursor=0;
   for(const mesh of parts){mesh.skeleton.update();for(let i=0;i<mesh.geometry.attributes.position.count;i++){mesh.getVertexPosition(i,point).toArray(positions,cursor);cursor+=3;}}
   const matrices=parts[0].skeleton.bones.map((b,i)=>new THREE.Matrix4().multiplyMatrices(b.matrixWorld,parts[0].skeleton.boneInverses[i]).toArray());
   child.stdin.write(JSON.stringify({pose,progress,matrices,statePath:cacheRoot?statePath(pose,progress):undefined,positions:Buffer.from(positions.buffer).toString('base64')})+'\n');
   const output=await read(),desired=decode(output.positions),normals=decode(output.normals),deltas=[],normalDeltas=[];cursor=0;
   // 保留求解后的世界坐标，直到输出稳定基底时才反解；不再反解病态控制蒙皮。
   for(const mesh of parts){const length=mesh.geometry.attributes.position.count*3;deltas.push(desired.slice(cursor,cursor+length));normalDeltas.push(normals.slice(cursor,cursor+length));cursor+=length;}
   return{...output.report,worldSpace:true,geometricVertices:output.report.surfacePoints,deltas,normalDeltas};
  },
  close(){child.stdin.end();process.removeListener('exit',kill);}
 };
}
