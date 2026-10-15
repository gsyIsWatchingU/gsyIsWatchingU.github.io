import * as T from 'three';
export const faceTargets=['blink','angry','happy','sad'];
const mouth=(name,t)=>{const q=Math.sqrt(Math.max(0,1-t*t));if(name==='happy')return[1.475+.040*t*t,1.475+.040*t*t-.085*q];if(name==='angry')return[1.515-.070*t*t,1.515-.070*t*t-.047*q];return[1.495-.060*t*t,1.495-.060*t*t-.006*q]};
function bake(factory,slices,rows){const poses={};for(const name of ['sad','happy','angry','blink']){const p=[];for(let v=0;v<=rows;v++)for(let u=0;u<=slices;u++)p.push(...factory(name,u/slices,v/rows));poses[name]=p;}const indices=[];for(let v=0;v<rows;v++)for(let u=0;u<slices;u++){const a=v*(slices+1)+u,b=a+1,c=a+slices+1,d=c+1;indices.push(a,b,c,b,d,c)}
 const normal=positions=>{const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();return Array.from(g.attributes.normal.array)};const normals=normal(poses.sad),morphs={},morphNormals={};for(const name of faceTargets){const desired=poses[name]||poses.sad,n=normal(desired);morphs[name]=desired.map((v,i)=>v-poses.sad[i]);morphNormals[name]=n.map((v,i)=>v-normals[i]);}return{positions:poses.sad,normals,indices,morphs,morphNormals};}
export function mouthGeometry(part){const cx=-.035,cy=1.47,rx=.26,ry=.10,rz=.09,cz=.015,half=.22;const depth=(x,y)=>cz+rz*Math.sqrt(Math.max(.006,1-((x-cx)/rx)**2-((y-cy)/ry)**2));
 return bake((name,u,v)=>{const theta=u*Math.PI*2,t=Math.cos(theta),upper=Math.sin(theta)>=0,[top,bottom]=mouth(name,t),iy=upper?top:bottom,ix=cx+half*t,iz=depth(ix,iy);
  if(part==='skin'){const ox=cx+rx*Math.cos(theta),oy=cy+ry*Math.sin(theta),x=T.MathUtils.lerp(ix,ox,v),y=T.MathUtils.lerp(iy,oy,v);return[x,y,depth(x,y)]}
  if(part==='back'){const angle=v*Math.PI/2;return[cx+rx*Math.cos(theta)*Math.cos(angle),cy+ry*Math.sin(theta)*Math.cos(angle),cz-rz*Math.sin(angle)]}
  if(part==='cavity'){const middle=(mouth(name,0)[0]+mouth(name,0)[1])/2;return[T.MathUtils.lerp(ix,cx,v),T.MathUtils.lerp(iy,middle,v),T.MathUtils.lerp(iz-.002,cz-.025,v)]}
  if(part==='lip'){const ring=v*Math.PI*2,r=.0036;return[ix+Math.cos(theta)*Math.cos(ring)*r,iy+Math.sin(theta)*Math.cos(ring)*r,iz+Math.sin(ring)*r+.001]}
  const tx=cx+(u*2-1)*half,[a]=mouth(name,u*2-1),q=Math.sqrt(Math.max(0,1-(u*2-1)**2)),h=name==='happy'?.024:name==='angry'?.015:0,y=a-.003-v*h*q;return[tx,y,depth(tx,y)-.002];
 },48,part==='lip'?6:part==='skin'?8:part==='back'?10:6);}
export function eyeGeometry(part,side){const cx=side==='left'?-.110:.040,cy=1.645,cz=.035,rx=.077,ry=.109,rz=.059;
 return bake((name,u,v)=>{const phi=u*Math.PI*2,inner=(side==='left'?1:-1)*Math.cos(phi);let edge;if(name==='happy')edge=1.05;else if(name==='angry')edge=1.68+inner*.37;else if(name==='blink')edge=3.06;else edge=1.68-inner*.34;
  if(part==='white'){const theta=v*Math.PI;return[cx+rx*Math.sin(theta)*Math.cos(phi),cy+ry*Math.cos(theta),cz+rz*Math.sin(theta)*Math.sin(phi)]}
  if(part==='pupil'){const angle=u*Math.PI*2,r=v,x=.018*r*Math.cos(angle),y=.037*r*Math.sin(angle)-.004;return[cx+x,cy+y,cz+rz*Math.sqrt(Math.max(.01,1-(x/rx)**2-(y/ry)**2))+.002]}
  const outer=part==='rim'?edge+(v-.5)*.065:v*edge;return[cx+rx*1.045*Math.sin(outer)*Math.cos(phi),cy+ry*1.035*Math.cos(outer),cz+rz*1.055*Math.sin(outer)*Math.sin(phi)];
 },48,part==='rim'?2:part==='pupil'?12:18);}
export function faceBaseGeometry(part){return bake((name,u,v)=>{const phi=u*Math.PI*2,theta=v*Math.PI,ny=Math.cos(theta),s=Math.sin(theta);if(part==='neck')return[.0+.039*s*Math.cos(phi),1.365+.065*ny,-.070+.036*s*Math.sin(phi)];if(part==='nose'){const radius=.048+.023*(1-ny)/2;return[-.035+radius*s*Math.cos(phi),1.535+.145*ny,.135+.088*s*Math.sin(phi)+.020*(1-ny)/2]};return[-.035+.205*s*Math.cos(phi),1.65+.17*ny,-.025+.075*s*Math.sin(phi)]},48,24);}
