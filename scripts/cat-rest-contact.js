import * as THREE from 'three';

export function pillowMotionOffset(progress){const u=THREE.MathUtils.clamp((progress-.15)/.40,0,1);return .28*(1-u*u*(3-2*u));}
export function catSupportHeight(point,id,progress,surface){
 if(id!=='pillow'||!surface)return .003;
 const z=point.z-pillowMotionOffset(progress),x=(point.x-surface.minX)/(surface.maxX-surface.minX)*(surface.n-1),v=(z-surface.minZ)/(surface.maxZ-surface.minZ)*(surface.n-1);
 if(x<0||v<0||x>surface.n-1||v>surface.n-1)return .003;
 const a=Math.min(surface.n-2,Math.floor(x)),b=Math.min(surface.n-2,Math.floor(v)),u=x-a,w=v-b,h=(i,j)=>surface.heights[j*surface.n+i];
 return THREE.MathUtils.lerp(THREE.MathUtils.lerp(h(a,b),h(a+1,b),u),THREE.MathUtils.lerp(h(a,b+1),h(a+1,b+1),u),w)+.003;
}

// 仅由实际脚掌表面采样头部支撑，排除抬起的前臂。
export function createCatForepawSupport(mesh){
 const g=mesh.geometry,indices=[];
 for(let i=0;i<g.attributes.position.count;i++){
  if(g.attributes.position.getY(i)>.10)continue;
  let mass=0;for(let k=0;k<4;k++){const name=mesh.skeleton.bones[g.attributes.skinIndex.array[i*4+k]].name;if(/^DEF_front_[lr]_(paw|toe)$/.test(name))mass+=g.attributes.skinWeight.array[i*4+k];}
  if(mass>.80)indices.push(i);
 }
 const n=41;
 function sample(){
  mesh.skeleton.update();const points=indices.map(i=>mesh.getVertexPosition(i,new THREE.Vector3()).applyMatrix4(mesh.matrixWorld));
  const minX=Math.min(...points.map(p=>p.x)),maxX=Math.max(...points.map(p=>p.x)),minZ=Math.min(...points.map(p=>p.z)),maxZ=Math.max(...points.map(p=>p.z)),heights=new Float32Array(n*n).fill(-Infinity);
  for(const p of points){const x=Math.min(n-1,Math.max(0,Math.floor((p.x-minX)/(maxX-minX)*(n-1)))),z=Math.min(n-1,Math.max(0,Math.floor((p.z-minZ)/(maxZ-minZ)*(n-1))));heights[z*n+x]=Math.max(heights[z*n+x],p.y);}
  return{n,minX,maxX,minZ,maxZ,heights};
 }
 return{sample,indices};
}

export function catForepawHeight(surface,point){
 const {n,minX,maxX,minZ,maxZ,heights}=surface;
 const x=(point.x-minX)/(maxX-minX)*(n-1),z=(point.z-minZ)/(maxZ-minZ)*(n-1);
 if(x<0||z<0||x>n-1||z>n-1)return -Infinity;
 const a=Math.min(n-2,Math.floor(x)),b=Math.min(n-2,Math.floor(z)),cells=[heights[b*n+a],heights[b*n+a+1],heights[(b+1)*n+a],heights[(b+1)*n+a+1]];
 if(cells.every(Number.isFinite)){const u=x-a,v=z-b;return THREE.MathUtils.lerp(THREE.MathUtils.lerp(cells[0],cells[1],u),THREE.MathUtils.lerp(cells[2],cells[3],u),v);}
 return Math.max(...cells);
}
