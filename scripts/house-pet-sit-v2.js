import * as THREE from 'three';

// 以胸廓—骨盆中心线建立坐姿截面；保留截面体积，不把大腿压成薄片。
export function felineSitPoint(point,amount){
  const r=(.22-point.z)/.50,q=THREE.MathUtils.clamp(r,0,1),curve=q*q*(3-2*q);
  const dy=.178*6*q*(1-q)/.50,dz=.34/.50,length=Math.hypot(dy,dz),normalY=dz/length,normalZ=-dy/length;
  const radius=point.y-.268;
  const seated=new THREE.Vector3(point.x*(1+.04*curve),Math.max(.006,.298-.178*curve+radius*normalY),.22-.34*r+radius*normalZ);
  return point.clone().lerp(seated,amount);
}
