import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function createToyChest(chest,{root,version,reducedMotion}) {
  const hinge=new THREE.Group();hinge.position.set(0,.325,-.245);chest.add(hinge);
  const lids=[];chest.traverse(n=>{if(n.isMesh&&n.name.endsWith('__lid'))lids.push(n);});
  for(const lid of lids){hinge.attach(lid);}
  const holder=new THREE.Group();holder.visible=false;chest.add(holder);
  let open=false,amount=0,ready=false;
  root.dataset.toyChest='closed';
  new GLTFLoader().load(`assets/house-review/props/spongebob-toy.glb?v=${version}`,gltf=>{
    const toy=gltf.scene;toy.updateMatrixWorld(true);
    const box=new THREE.Box3().setFromObject(toy),size=box.getSize(new THREE.Vector3());
    const scale=.48/size.y;toy.scale.setScalar(scale);
    toy.position.set(-(box.min.x+box.max.x)*scale/2,-box.min.y*scale,-(box.min.z+box.max.z)*scale/2);
    holder.add(toy);
    toy.traverse(n=>{if(n.isMesh){n.castShadow=true;n.receiveShadow=true;}n.userData.roomId='bedroom';n.userData.contentId='toy-chest';});
    ready=true;root.dataset.toyChestReady='true';
  },undefined,()=>{root.dataset.toyChestReady='false';});
  return {
    toggle(){open=!open;root.dataset.toyChest=open?'open':'closed';},
    update(dt){
      const target=open?1:0;amount=reducedMotion?target:THREE.MathUtils.damp(amount,target,6,dt);
      if(Math.abs(amount-target)<.001)amount=target;
      hinge.rotation.x=-1.4*amount;
      holder.visible=ready&&amount>.05;
      holder.position.y=.06+.29*amount;
      holder.scale.setScalar(.55+.45*amount);
    },
    snapshot:()=>({open,amount,ready,lidParts:lids.length})
  };
}
