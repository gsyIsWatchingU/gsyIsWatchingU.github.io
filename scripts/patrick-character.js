import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const smooth = (a,b,x) => THREE.MathUtils.smoothstep(x,a,b);
export function createPatrickCharacter() {
  const actor = new THREE.Group(); actor.name = 'patrick'; actor.userData.interaction = 'patrick';
  const pivot = new THREE.Group(); actor.add(pivot);
  let mesh, bones, action='idle', time=0, elapsed=0, counter=0, loaded=false;
  const props = new THREE.Group(); pivot.add(props);
  // 互动道具，固定在角色右手对应骨骼，不跟房间单独漂移。
  const cone = new THREE.Mesh(new THREE.ConeGeometry(.035,.105,24),new THREE.MeshStandardMaterial({color:0xd8a567,roughness:.92}));
  cone.rotation.z=Math.PI;cone.position.y=-.043;props.add(cone);
  const icecream = new THREE.Group();icecream.add(cone);props.add(icecream);
  for(let i=0;i<3;i++){
    const scoop=new THREE.Mesh(new THREE.SphereGeometry(.044-i*.008,24,16),new THREE.MeshStandardMaterial({color:i===1?0xf3c2da:0xffe7a2,roughness:.8}));
    scoop.scale.y=.8;scoop.position.y=.018+i*.037;icecream.add(scoop);
  }
  icecream.visible=false;
  const skirt=new THREE.Group(); skirt.position.y=.275;pivot.add(skirt);skirt.visible=false;
  for(let i=0;i<18;i++){
    const leaf=new THREE.Shape();leaf.moveTo(0,0);leaf.bezierCurveTo(-.065,-.08,-.075,-.16,0,-.2);leaf.bezierCurveTo(.075,-.16,.065,-.08,0,0);
    const leafMesh=new THREE.Mesh(new THREE.ExtrudeGeometry(leaf,{depth:.009,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.006,bevelThickness:.003}),new THREE.MeshStandardMaterial({color:i%2?0x7da73d:0xa4c85b,roughness:.86}));
    const a=i*Math.PI*2/18;leafMesh.position.set(Math.sin(a)*.22,0,Math.cos(a)*.135);leafMesh.rotation.y=a;leafMesh.rotation.x=-.32;skirt.add(leafMesh);
  }
  const promise = new GLTFLoader().loadAsync('./assets/models/patrick-house/patrick-reference-v4.glb').then(gltf=>{
    const source=gltf.scene; source.updateMatrixWorld(true);
    const box=new THREE.Box3().setFromObject(source), size=box.getSize(new THREE.Vector3()), center=box.getCenter(new THREE.Vector3());
    const scale=.98/size.y;
    source.traverse(node=>{
      if(!node.isMesh)return;
      const geometry=node.geometry.clone(); geometry.applyMatrix4(node.matrixWorld);
      geometry.translate(-center.x,-box.min.y,-center.z);geometry.scale(scale,scale,scale);
      // 所有变形作用于同一连续 Hunyuan 曲面；渐变权重避免肩部断开。
      const positions=geometry.attributes.position, index=[],weight=[];
      for(let i=0;i<positions.count;i++){
        const x=positions.getX(i),y=positions.getY(i);
        const inner=THREE.MathUtils.lerp(.265,.17,smooth(.33,.48,y));
        const arm=smooth(inner,inner+.09,Math.abs(x))*(1-smooth(.52,.64,y));
        const foot=(1-smooth(.105,.205,y))*.98;
        index.push(0,x<0?1:2,x<0?3:4,0);weight.push(1-arm-foot,arm,foot,0);
      }
      geometry.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(index,4));geometry.setAttribute('skinWeight',new THREE.Float32BufferAttribute(weight,4));
      const root=new THREE.Bone();root.name='body';
      const armL=new THREE.Bone(),armR=new THREE.Bone(),footL=new THREE.Bone(),footR=new THREE.Bone();
      armL.position.set(-.19,.435,0);armR.position.set(.19,.435,0);footL.position.set(-.115,.12,0);footR.position.set(.115,.12,0);
      root.add(armL,armR,footL,footR);bones=[root,armL,armR,footL,footR];
      mesh=new THREE.SkinnedMesh(geometry,node.material);mesh.name='patrick-continuous-skin';mesh.add(root);mesh.bind(new THREE.Skeleton(bones));mesh.normalizeSkinWeights();
      mesh.castShadow=mesh.receiveShadow=true;mesh.frustumCulled=false;
      const materials=Array.isArray(mesh.material)?mesh.material:[mesh.material];
      materials.forEach(m=>{m.roughness=.85;m.metalness=0;});
      const blink=positions.clone();
      for(let i=0;i<positions.count;i++){
        const x=positions.getX(i),y=positions.getY(i),z=positions.getZ(i);
        const dx=(Math.abs(x)-.041)/.049,dy=(y-.672)/.086;
        const mask=(1-smooth(.7,1.25,Math.sqrt(dx*dx+dy*dy)))*smooth(.052,.085,z);
        blink.setY(i,y-(y-.672)*.9*mask);
      }
      geometry.morphAttributes.position=[blink];mesh.updateMorphTargets();
      pivot.add(mesh);
    });
    if(!mesh)throw new Error('派大星模型没有可渲染网格');
    loaded=true;
  });
  const duration={wave:2.6,cheer:2.8,icecream:4.2,hula:4.5};
  const start = kind=>{
    if(!loaded)return false;
    action=kind;time=0;counter++;icecream.visible=kind==='icecream';skirt.visible=kind==='hula';return true;
  };
  return {actor,loaded:promise,start,
    reset(){action='idle';time=0;pivot.position.set(0,0,0);pivot.rotation.set(0,0,0);icecream.visible=skirt.visible=false;},
    update(dt){
      if(!loaded)return;elapsed+=dt;time+=dt;
      const envelope=Math.min(1,time/.35,(duration[action]-time)/.4),k=Math.max(0,envelope);
      bones.forEach(b=>{b.rotation.set(0,0,0);});pivot.position.set(0,0,0);pivot.rotation.set(0,0,0);
      if(action==='wave'){bones[2].rotation.z=1.3*k+Math.sin(time*11)*.12*k;pivot.rotation.z=Math.sin(time*4)*.025*k;}
      if(action==='cheer'){
        // 两次落地，每次脚底随同一根节点回到沙面。
        const p=(time%1.25)/1.25;pivot.position.y=Math.max(0,Math.sin(p*Math.PI))*.19*k;
        bones[1].rotation.z=-1.12*k;bones[2].rotation.z=1.12*k;pivot.rotation.z=Math.sin(time*6)*.04*k;
      }
      if(action==='icecream'){bones[2].rotation.z=(1.02+.13*Math.sin(time*3))*k;bones[2].rotation.x=-.12*k;pivot.rotation.y=Math.sin(time*2)*.07*k;}
      if(action==='hula'){pivot.rotation.y=Math.sin(time*5)*.17*k;pivot.rotation.z=Math.sin(time*5)*.045*k;bones[1].rotation.z=-.82*k;bones[2].rotation.z=.82*k;skirt.rotation.y=Math.sin(time*5+.6)*.12;}
      if(action==='idle'){bones[1].rotation.z=Math.sin(elapsed*1.4)*.018;bones[2].rotation.z=-Math.sin(elapsed*1.4)*.018;}
      const blinkPhase=elapsed%4.8;
      mesh.morphTargetInfluences[0]=action==='hula'?.42*Math.max(0,k):blinkPhase<.22?Math.sin(blinkPhase/.22*Math.PI):0;
      actor.updateMatrixWorld(true);
      const hand=new THREE.Vector3(.15,-.068,.012);bones[2].localToWorld(hand);pivot.worldToLocal(hand);icecream.position.copy(hand);icecream.position.y+=.04;
      if(action!=='idle'&&time>=duration[action]){action='idle';time=0;icecream.visible=skirt.visible=false;}
      actor.updateMatrixWorld(true);mesh.skeleton.update();
    },
    snapshot:()=>({loaded,action,time,counter,height:.98,offset:pivot.position.toArray(),costume:skirt.visible?'hula':'shorts',icecream:icecream.visible,blink:mesh?.morphTargetInfluences?.[0]??0}),
    meshes:()=>mesh?[mesh]:[],
    deformation(){
      if(!mesh)return null;
      mesh.updateMatrixWorld(true);mesh.skeleton.update();
      const positions=mesh.geometry.attributes.position,indices=mesh.geometry.index;
      const rest=[],deformed=[],v=new THREE.Vector3();let minimumY=Infinity;
      for(let i=0;i<positions.count;i++){
        rest.push(new THREE.Vector3().fromBufferAttribute(positions,i));mesh.getVertexPosition(i,v);deformed.push(v.clone());
        minimumY=Math.min(minimumY,v.clone().applyMatrix4(mesh.matrixWorld).y-actor.position.y);
      }
      const stretches=[];
      for(let i=0;i<indices.count;i+=3)for(let e=0;e<3;e++){
        const a=indices.getX(i+e),b=indices.getX(i+(e+1)%3),length=rest[a].distanceTo(rest[b]);
        if(length>.0001)stretches.push(deformed[a].distanceTo(deformed[b])/length);
      }
      stretches.sort((a,b)=>a-b);
      return {p99:stretches[Math.floor(stretches.length*.99)],max:stretches.at(-1),minimumY,bones:mesh.skeleton.bones.length,triangles:indices.count/3};
    },
  };
}
