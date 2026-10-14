import * as THREE from 'three';

const functions=`
uniform float catBoneSigns[29];
vec4 catMultiply(vec4 a,vec4 b){return vec4(a.w*b.xyz+b.w*a.xyz+cross(a.xyz,b.xyz),a.w*b.w-dot(a.xyz,b.xyz));}
vec3 catRotate(vec4 q,vec3 p){return p+2.0*cross(q.xyz,cross(q.xyz,p)+q.w*p);}
vec4 catQuaternion(mat4 m){
 float t=m[0][0]+m[1][1]+m[2][2];vec4 q;
 if(t>0.0){float s=sqrt(1.0+t)*2.0;q=vec4((m[1][2]-m[2][1])/s,(m[2][0]-m[0][2])/s,(m[0][1]-m[1][0])/s,.25*s);}
 else if(m[0][0]>m[1][1]&&m[0][0]>m[2][2]){float s=sqrt(1.0+m[0][0]-m[1][1]-m[2][2])*2.0;q=vec4(.25*s,(m[1][0]+m[0][1])/s,(m[2][0]+m[0][2])/s,(m[1][2]-m[2][1])/s);}
 else if(m[1][1]>m[2][2]){float s=sqrt(1.0+m[1][1]-m[0][0]-m[2][2])*2.0;q=vec4((m[1][0]+m[0][1])/s,.25*s,(m[2][1]+m[1][2])/s,(m[2][0]-m[0][2])/s);}
 else {float s=sqrt(1.0+m[2][2]-m[0][0]-m[1][1])*2.0;q=vec4((m[2][0]+m[0][2])/s,(m[2][1]+m[1][2])/s,.25*s,(m[0][1]-m[1][0])/s);}return normalize(q);
}
`;
const prepare=`
 #include <skinbase_vertex>
 #ifdef USE_SKINNING
 vec4 catQX=catQuaternion(boneMatX),catQY=catQuaternion(boneMatY),catQZ=catQuaternion(boneMatZ),catQW=catQuaternion(boneMatW);
 vec4 catSign=vec4(catBoneSigns[int(skinIndex.x)],catBoneSigns[int(skinIndex.y)],catBoneSigns[int(skinIndex.z)],catBoneSigns[int(skinIndex.w)])*skinWeight;
 vec4 catReal=catQX*catSign.x+catQY*catSign.y+catQZ*catSign.z+catQW*catSign.w;
 vec4 catDual=.5*(catMultiply(vec4(boneMatX[3].xyz,0.0),catQX)*catSign.x+catMultiply(vec4(boneMatY[3].xyz,0.0),catQY)*catSign.y+catMultiply(vec4(boneMatZ[3].xyz,0.0),catQZ)*catSign.z+catMultiply(vec4(boneMatW[3].xyz,0.0),catQW)*catSign.w);
 float catLength=length(catReal);catReal/=catLength;catDual/=catLength;catDual-=catReal*dot(catReal,catDual);
 #endif
`;
function patch(shader){if(shader.vertexShader.includes('vec4 catMultiply'))return;shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\n'+functions).replace('#include <skinbase_vertex>',prepare).replace('#include <skinnormal_vertex>',`#ifdef USE_SKINNING\nobjectNormal=mat3(bindMatrixInverse)*catRotate(catReal,mat3(bindMatrix)*objectNormal);\n#ifdef USE_TANGENT\nobjectTangent=mat3(bindMatrixInverse)*catRotate(catReal,mat3(bindMatrix)*objectTangent);\n#endif\n#endif`).replace('#include <skinning_vertex>',`#ifdef USE_SKINNING\nvec3 catTranslation=2.0*catMultiply(catDual,vec4(-catReal.xyz,catReal.w)).xyz;\ntransformed=(bindMatrixInverse*vec4(catRotate(catReal,(bindMatrix*vec4(transformed,1.0)).xyz)+catTranslation,1.0)).xyz;\n#endif`);}

// CPU 验证与 GPU/阴影使用同一双四元数变换，防止检查了不同的网格。
export function installCatDualQuaternion(model){
 const patched=new WeakSet();
 const caches=new Map();
 model.traverse(mesh=>{if(!mesh.isSkinnedMesh)return;mesh.frustumCulled=false;
  let cache=caches.get(mesh.skeleton);
  if(!cache){const skeleton=mesh.skeleton,ids=new Map(skeleton.bones.map((b,i)=>[b,i])),signs=new Float32Array(29).fill(1),real=[],dual=[];cache={signs,real,dual};caches.set(skeleton,cache);const prior=skeleton.update.bind(skeleton);skeleton.update=()=>{prior();skeleton.bones.forEach((b,i)=>{const matrix=new THREE.Matrix4().multiplyMatrices(b.matrixWorld,skeleton.boneInverses[i]),q=new THREE.Quaternion().setFromRotationMatrix(matrix),t=new THREE.Vector3().setFromMatrixPosition(matrix),parent=ids.get(b.parent);signs[i]=parent===undefined?(q.w<0?-1:1):(q.dot(real[parent])<0?-1:1);for(const k of ['x','y','z','w'])q[k]*=signs[i];real[i]=q;const d=new THREE.Quaternion(t.x,t.y,t.z,0).multiply(q);for(const k of ['x','y','z','w'])d[k]*=.5;dual[i]=d;});};skeleton.update();}
  const materials=Array.isArray(mesh.material)?mesh.material:[mesh.material];
  for(const material of materials){if(patched.has(material))continue;patched.add(material);const prior=material.onBeforeCompile,key=material.customProgramCacheKey.bind(material);material.onBeforeCompile=function(shader,renderer){prior.call(this,shader,renderer);patch(shader);shader.uniforms.catBoneSigns={value:cache.signs};};material.customProgramCacheKey=()=>key()+'-cat-dq-v3';material.needsUpdate=true;}
  for(const material of [new THREE.MeshDepthMaterial({depthPacking:THREE.RGBADepthPacking}),new THREE.MeshDistanceMaterial()]){material.onBeforeCompile=shader=>{patch(shader);shader.uniforms.catBoneSigns={value:cache.signs};};material.customProgramCacheKey=()=> 'cat-dq-shadow-v3';if(material.isMeshDepthMaterial)mesh.customDepthMaterial=material;else mesh.customDistanceMaterial=material;}
  mesh.applyBoneTransform=function(index,target){
   const skinIndex=this.geometry.attributes.skinIndex,skinWeight=this.geometry.attributes.skinWeight;
   let real=new THREE.Quaternion(0,0,0,0),dual=new THREE.Quaternion(0,0,0,0);
   for(let k=0;k<4;k++){const weight=skinWeight.array[index*4+k];if(weight===0)continue;const id=skinIndex.array[index*4+k],q=cache.real[id],d=cache.dual[id];for(const key of ['x','y','z','w']){real[key]+=q[key]*weight;dual[key]+=d[key]*weight;}}
   const length=real.length();for(const key of ['x','y','z','w']){real[key]/=length;dual[key]/=length;}const dot=real.dot(dual);for(const key of ['x','y','z','w'])dual[key]-=real[key]*dot;const t=dual.multiply(real.clone().conjugate());target.applyMatrix4(this.bindMatrix).applyQuaternion(real).add(new THREE.Vector3(t.x,t.y,t.z).multiplyScalar(2)).applyMatrix4(this.bindMatrixInverse);return target;
  };
 });
}
