import * as THREE from 'three';

// GLB 保存完整补形集，GPU 只接收当前活动的补形；避免毛层为数百个目标
// 分配巨大的纹理数组。CPU 动作、拾取和实际网格检查仍使用原始数据。
export function streamCatMorphs(model,{slots=8}={}){
 const states=new Map(),width=256,objects=[];
 const shaderCode=`
 uniform highp sampler2DArray catMorphTexture;
 uniform float catMorphWeights[${slots}];
 vec3 catMorphDelta(const int offset){
  int index=gl_VertexID*2+offset;
  vec3 delta=vec3(0.0);
  for(int slot=0;slot<${slots};slot++){
   if(catMorphWeights[slot]!=0.0)delta+=texelFetch(catMorphTexture,ivec3(index%${width},index/${width},slot),0).xyz*catMorphWeights[slot];
  }
  return delta;
 }
 `;
 function stateFor(geometry){
  if(states.has(geometry))return states.get(geometry);
  const full=geometry.morphAttributes,count=geometry.attributes.position.count,height=Math.ceil(count*2/width),layerLength=width*height*4,data=new Float32Array(layerLength*slots),texture=new THREE.DataArrayTexture(data,width,height,slots),weights=new Float32Array(slots),ids=Array(slots).fill(-1),used=Array(slots).fill(0);
  texture.type=THREE.FloatType;texture.format=THREE.RGBAFormat;texture.minFilter=texture.magFilter=THREE.NearestFilter;texture.generateMipmaps=false;texture.needsUpdate=true;
  let clock=0;
  const state={full,texture,weights,maximumActive:0,update(object){
   const active=[];for(let i=0;i<object.morphTargetInfluences.length;i++)if(Math.abs(object.morphTargetInfluences[i])>1e-8)active.push(i);
   if(active.length>slots)throw Error('同时活动的猫咪补形超出流式槽位：'+active.length);
   this.maximumActive=Math.max(this.maximumActive,active.length);weights.fill(0);const set=new Set(active);clock++;
   for(const id of active){
    let slot=ids.indexOf(id);
    if(slot<0){slot=ids.findIndex(id=>id<0);if(slot<0){let age=Infinity;for(let i=0;i<slots;i++)if(!set.has(ids[i])&&used[i]<age){age=used[i];slot=i;}}
     const p=full.position[id],n=full.normal?.[id],start=slot*layerLength;
     for(let i=0;i<count;i++){const at=start+i*8;data[at]=p.getX(i);data[at+1]=p.getY(i);data[at+2]=p.getZ(i);data[at+4]=n?.getX(i)??0;data[at+5]=n?.getY(i)??0;data[at+6]=n?.getZ(i)??0;}
     ids[slot]=id;texture.addLayerUpdate(slot);texture.needsUpdate=true;
    }
    weights[slot]=object.morphTargetInfluences[id];used[slot]=clock;
   }
  }};
  geometry.addEventListener('dispose',()=>texture.dispose());states.set(geometry,state);return state;
 }
 function patch(material,state){
  if(material.userData.catMorphStream)return;
  const previous=material.onBeforeCompile,key=material.customProgramCacheKey.bind(material);
  material.onBeforeCompile=function(shader,renderer){previous.call(this,shader,renderer);shader.uniforms.catMorphTexture={value:state.texture};shader.uniforms.catMorphWeights={value:state.weights};if(!shader.vertexShader.includes('vec3 catMorphDelta(')){shader.vertexShader=shaderCode+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ntransformed+=catMorphDelta(0);');shader.vertexShader=shader.vertexShader.replace('#include <beginnormal_vertex>','#include <beginnormal_vertex>\nobjectNormal+=catMorphDelta(1);');}};
  material.customProgramCacheKey=()=>key()+'-cat-morph-stream-'+slots;material.userData.catMorphStream=true;material.needsUpdate=true;
 }
 model.traverse(object=>{
  if(!object.isSkinnedMesh||!object.geometry.morphAttributes.position?.length)return;
  const geometry=object.geometry,state=stateFor(geometry);objects.push(object);
  if(!geometry.morphTargetsRelative)throw Error('猫咪补形必须使用相对位移');
  patch(object.material,state);object.customDepthMaterial=new THREE.MeshDepthMaterial({depthPacking:THREE.RGBADepthPacking});object.customDistanceMaterial=new THREE.MeshDistanceMaterial();patch(object.customDepthMaterial,state);patch(object.customDistanceMaterial,state);
  const before=object.onBeforeRender,after=object.onAfterRender,beforeShadow=object.onBeforeShadow,afterShadow=object.onAfterShadow;
  object.onBeforeRender=function(...args){before?.apply(this,args);state.update(this);geometry.morphAttributes={};};
  object.onAfterRender=function(...args){geometry.morphAttributes=state.full;after?.apply(this,args);};
  object.onBeforeShadow=function(...args){beforeShadow?.apply(this,args);state.update(this);geometry.morphAttributes={};};
  object.onAfterShadow=function(...args){geometry.morphAttributes=state.full;afterShadow?.apply(this,args);};
 });
 return{snapshot:()=>({slots,meshes:objects.length,geometries:states.size,maximumActive:Math.max(0,...[...states.values()].map(s=>s.maximumActive)),gpuMorphBytes:[...states.values()].reduce((sum,s)=>sum+s.texture.image.data.byteLength,0)})};
}
