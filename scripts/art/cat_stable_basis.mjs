import * as THREE from 'three';

// 体积皮肤由离线笼求解。输出关节区域改用单骨基底承载补形，避免深屈曲时
// 线性混合矩阵趋于奇异；控制网格、头尾反应和脚掌约束继续使用原绑定。
export function createStableCatBasis(control){
 const mesh=new THREE.SkinnedMesh(control.geometry.clone(),control.material);mesh.name=control.name;mesh.bind(control.skeleton,control.bindMatrix);mesh.matrixWorld.copy(control.matrixWorld);
 const g=mesh.geometry,p=g.attributes.position,ids=g.attributes.skinIndex.array,weights=g.attributes.skinWeight.array;let changed=0;
 for(let i=0;i<p.count;i++){
  if(p.getY(i)<=.05||p.getY(i)>=.32)continue;
  let limb=0,paw=0,largest=0;
  for(let k=0;k<4;k++){const name=mesh.skeleton.bones[ids[i*4+k]].name,w=weights[i*4+k];if(/^DEF_(front|back)_/.test(name))limb+=w;if(/_(paw|toe)$/.test(name))paw+=w;if(w>weights[i*4+largest])largest=k;}
  if(limb<=.25||paw>.65)continue;
  const bone=ids[i*4+largest];for(let k=0;k<4;k++){ids[i*4+k]=k===0?bone:0;weights[i*4+k]=k===0?1:0;}changed++;
 }
 return{mesh,changed};
}

export function rebaseCatVolumeCorrection(controls,outputs,result){
 const deltas=[],normalDeltas=[],origin=new THREE.Vector3(),x=new THREE.Vector3(),y=new THREE.Vector3(),z=new THREE.Vector3(),oldMatrix=new THREE.Matrix3(),newMatrix=new THREE.Matrix3(),desired=new THREE.Vector3(),raw=new THREE.Vector3(),normal=new THREE.Vector3();let maximumCorrection=0;
 function linear(mesh,i,m){mesh.applyBoneTransform(i,origin.set(0,0,0));mesh.applyBoneTransform(i,x.set(1,0,0)).sub(origin);mesh.applyBoneTransform(i,y.set(0,1,0)).sub(origin);mesh.applyBoneTransform(i,z.set(0,0,1)).sub(origin);m.set(x.x,y.x,z.x,x.y,y.y,z.y,x.z,y.z,z.z);}
 controls.forEach((control,part)=>{
  const output=outputs[part],p=control.geometry.attributes.position,n=control.geometry.attributes.normal,delta=new Float32Array(p.count*3),normalDelta=new Float32Array(p.count*3);control.skeleton.update();output.skeleton.update();
  for(let i=0;i<p.count;i++){
   linear(control,i,oldMatrix);linear(output,i,newMatrix);if(Math.abs(newMatrix.determinant())<.02)throw Error('输出基底仍然塌缩：'+part+'/'+i);
   if(result.worldSpace)desired.fromArray(result.deltas[part],i*3);else{control.getVertexPosition(i,desired);desired.add(raw.fromArray(result.deltas[part],i*3).applyMatrix3(oldMatrix));}output.getVertexPosition(i,raw);desired.sub(raw);maximumCorrection=Math.max(maximumCorrection,desired.length());newMatrix.invert();desired.applyMatrix3(newMatrix).toArray(delta,i*3);
   if(result.worldSpace)normal.fromArray(result.normalDeltas[part],i*3);else normal.fromBufferAttribute(n,i).add(raw.fromArray(result.normalDeltas[part],i*3)).applyMatrix3(oldMatrix).normalize();normal.applyMatrix3(newMatrix).normalize().sub(raw.fromBufferAttribute(n,i)).toArray(normalDelta,i*3);
  }
  deltas.push(delta);normalDeltas.push(normalDelta);
 });
 return{...result,worldSpace:false,deltas,normalDeltas,maximumBasisCorrection:maximumCorrection};
}
