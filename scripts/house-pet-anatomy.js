import * as THREE from 'three';
const smooth=(a,b,v)=>{const t=THREE.MathUtils.clamp((v-a)/(b-a),0,1);return t*t*(3-2*t);};

export function seatedTrunk(point,amount){
  const r=(.22-point.z)/.5,radius=point.y-.268;
  const dy=.205,dz=.30,length=Math.hypot(dy,dz);
  const target=new THREE.Vector3(point.x*(1+.07*smooth(.35,.8,r)),.335-.205*r+radius*dz/length-.075*smooth(.35,.95,r),.22-.30*r-radius*dy/length);
  const hip=new THREE.Vector3(point.x*1.10,.088+(point.y-.268)*.85,-.12+(point.z+.26)*.75);
  target.lerp(hip,smooth(.40,.95,r));
  if(r>.6)target.y=Math.max(.003,target.y);
  return point.clone().lerp(target,amount);
}

// Independent limb volumes: shoulder/elbow/wrist and hip/stifle/hock.
// The former sit shapes inherited a bowed foreleg and a stretched hind-leg sheet.
export function seatedForeleg(point,side,amount){
  const s=side*.096,y=point.y;
  const sleeve=smooth(.04,.09,y)*(1-smooth(.19,.26,y));
  const restZ=.207-.018*Math.sin(Math.PI*THREE.MathUtils.clamp(y/.23,0,1));
  const z=THREE.MathUtils.lerp(point.z,.226+(point.z-restZ)*(1-.42*sleeve),smooth(.03,.085,y));
  const target=new THREE.Vector3(s+(point.x-s)*(1-.34*sleeve),y+.064*smooth(.04,.23,y),z);
  return point.clone().lerp(target,amount);
}

export function seatedHindleg(point,side,amount){
  const s=side*.120,above=smooth(.075,.21,point.y);
  const target=new THREE.Vector3(s+(point.x-s)*.9,.002+point.y*.60,point.z+.13);
  // The upper thigh joins the pelvic volume; the folded hock keeps a rounded paw.
  target.lerp(seatedTrunk(point,1),above);
  return point.clone().lerp(target,amount);
}
