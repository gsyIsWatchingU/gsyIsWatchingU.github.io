import * as THREE from 'three';
import {createCatForepawSupport,catForepawHeight,catSupportHeight} from '../cat-rest-contact.js';

// 蒙皮修正后重新测量实际下巴和前爪，不能沿用控制网格的支撑高度。
export function createBakedCatHeadSupport(body,head,pillow){
 const g=head.geometry.attributes.position,chin=[],p=new THREE.Vector3(),paws=createCatForepawSupport(body);
 for(let i=0;i<g.count;i++)if(g.getY(i)>.32&&g.getY(i)<.45&&g.getZ(i)>.34)chin.push(i);
 return function(pose,t){
  if(pose==='side'||pose==='belly')return 0;
  body.skeleton.update();head.skeleton.update();const support=paws.sample();let gap=Infinity;
  for(const i of chin){head.getVertexPosition(i,p);gap=Math.min(gap,p.y-Math.max(catSupportHeight(p,pose,t,pillow),catForepawHeight(support,p)+.003));}
  const lift=gap<0?-gap+.001:0;if(lift>.04)throw Error('下巴支撑需要重做：'+pose+'/'+t+'/'+lift);return lift;
 };
}

export function smoothHeadSupport(signal,maximumStep=.002){
 const result=Float32Array.from(signal);
 for(let i=1;i<result.length;i++)result[i]=Math.max(result[i],result[i-1]-maximumStep);
 for(let i=result.length-2;i>=0;i--)result[i]=Math.max(result[i],result[i+1]-maximumStep);
 return result;
}
