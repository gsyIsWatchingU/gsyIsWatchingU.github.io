import * as THREE from 'three';

export function skinnedBounds(root) {
  root.updateMatrixWorld(true);
  const box = new THREE.Box3();
  root.traverse(object => {
    if (!object.isMesh) return;
    if (object.isSkinnedMesh) { object.skeleton.update();object.computeBoundingBox();box.union(object.boundingBox.clone().applyMatrix4(object.matrixWorld)); }
    else {object.geometry.computeBoundingBox();box.union(object.geometry.boundingBox.clone().applyMatrix4(object.matrixWorld));}
  });
  return box;
}

const labels = {idle:'发呆',walk:'散步',wave:'招手',read:'看夹板',annoyed:'烦躁',happy:'开心',surprised:'惊讶',sad:'低头'};
const schedule = [['idle',3.2],['walk',7.5],['read',5.6],['idle',2.2],['happy',4],['walk',7.5],['annoyed',4],['surprised',3.4],['wave',4],['sad',4]];
const mood = {
  idle:{bored:.38},walk:{bored:.25},wave:{happy:.42,mouthOpen:.35},read:{bored:.7,lookDown:.9},
  annoyed:{angry:.85,mouthOpen:.24},happy:{happy:.92,mouthOpen:.93},surprised:{surprised:.95,mouthOpen:.9},sad:{sad:.88,lookDown:.55}
};

export class SquidwardResident {
  constructor({model,actor,clips,route=[],floor=null,floorY=0,travel=true,onChange=()=>{}}) {
    Object.assign(this,{model,actor,route,floor,floorY,travel,onChange});
    this.mixer=new THREE.AnimationMixer(model);this.actions=new Map(clips.map(clip=>[clip.name,this.mixer.clipAction(clip)]));
    this.meshes=[];this.feet=[];
    model.traverse(object=>{
      if(!object.isMesh)return;object.frustumCulled=false;this.meshes.push(object);
      if(object.name.includes('mouth_inner')){this.mouth=object;object.visible=false;}
      if(object.userData.semanticPart?.startsWith('leg.')||/leg[._]?[LR]/.test(object.name)) {
        const pos=object.geometry.attributes.position,indices=[];
        for(let i=0;i<pos.count;i++)if(pos.getY(i)<.018)indices.push(i);
        this.feet.push({mesh:object,indices});
      }
    });
    this.elapsed=0;this.actionTime=0;this.paused=false;this.index=0;this.routeIndex=0;this.nextBlink=1.7;this.blinkAt=-100;
    this.homeRotation=actor.rotation.y;this.scale=model.getWorldScale(new THREE.Vector3()).y;
    this.speed=.32*this.scale/(clips.find(clip=>clip.name==='walk')?.duration||1.4);
    this.transition('idle',schedule[0][1]);
  }
  transition(name,duration) {
    const next=this.actions.get(name);if(!next)throw new Error('动作不存在：'+name);
    const previous=this.currentAction;next.reset().setEffectiveWeight(1).setEffectiveTimeScale(1);
    next.setLoop(name==='idle'||name==='walk'||duration===Infinity?THREE.LoopRepeat:THREE.LoopOnce,Infinity);next.clampWhenFinished=true;next.play();
    if(previous&&previous!==next){previous.fadeOut(.22);next.fadeIn(.22);}else next.setEffectiveWeight(1);
    this.currentAction=next;this.action=name;this.actionTime=0;this.duration=duration;
    this.onChange({action:name,label:labels[name],paused:this.paused});
  }
  request(name,continuous=false) {this.paused=false;this.transition(name,continuous?Infinity:name==='walk'?9:6);}
  setPaused(value) {this.paused=value;this.onChange({action:this.action,label:labels[this.action],paused:value});}
  update(dt,active=true) {
    if(!active)return;
    if(this.paused){if(this.mouth)this.mouth.visible=(this.mouth.morphTargetInfluences?.[this.mouth.morphTargetDictionary.mouthOpen]||0)>.10;return;}
    this.elapsed+=dt;this.actionTime+=dt;
    if(this.actionTime>=this.duration){this.index=(this.index+1)%schedule.length;this.transition(...schedule[this.index]);}
    if(this.action==='walk'&&this.travel&&this.route.length) {
      const goal=this.route[this.routeIndex],dx=goal[0]-this.actor.position.x,dz=goal[1]-this.actor.position.z;
      const distance=Math.hypot(dx,dz);
      if(distance<.014)this.routeIndex=(this.routeIndex+1)%this.route.length;
      else {
        const amount=Math.min(distance,this.speed*dt);this.actor.position.x+=dx/distance*amount;this.actor.position.z+=dz/distance*amount;
        const desired=Math.atan2(dx,dz),angle=Math.atan2(Math.sin(desired-this.actor.rotation.y),Math.cos(desired-this.actor.rotation.y));
        this.actor.rotation.y+=angle*Math.min(1,dt*9);
      }
    } else {
      const angle=Math.atan2(Math.sin(this.homeRotation-this.actor.rotation.y),Math.cos(this.homeRotation-this.actor.rotation.y));
      this.actor.rotation.y+=angle*Math.min(1,dt*5);
    }
    this.mixer.update(dt);
    if(this.elapsed>=this.nextBlink){this.blinkAt=this.elapsed;this.nextBlink=this.elapsed+3.0+(Math.sin(this.elapsed*2)+1)*.7;}
    const blinkAge=this.elapsed-this.blinkAt;
    const targets={...mood[this.action],blink:blinkAge<.19?Math.sin(blinkAge/.19*Math.PI):0};
    if(this.action!=='read'&&this.action!=='sad'){
      const glance=Math.sin(this.elapsed*.8);targets.lookLeft=Math.max(0,-glance)*.35;targets.lookRight=Math.max(0,glance)*.35;
    }
    for(const mesh of this.meshes) {
      if(!mesh.morphTargetDictionary)continue;
      for(const [name,index] of Object.entries(mesh.morphTargetDictionary)) {
        const value=THREE.MathUtils.damp(mesh.morphTargetInfluences[index]||0,targets[name]||0,name==='blink'?42:10,dt);
        mesh.morphTargetInfluences[index]=value;
      }
    }
    // 口腔内表面只在嘴张开时显示，闭嘴不覆盖原来的嘴线。
    if(this.mouth)this.mouth.visible=(this.mouth.morphTargetInfluences?.[this.mouth.morphTargetDictionary.mouthOpen]||0)>.10;
    this.actor.updateMatrixWorld(true);
  }
  diagnostic() {
    const footContact=this.feet.map(({mesh,indices})=>{
      mesh.skeleton.update();let lowest=new THREE.Vector3(0,Infinity,0);
      for(const i of indices){const point=mesh.getVertexPosition(i,new THREE.Vector3()).applyMatrix4(mesh.matrixWorld);if(point.y<lowest.y)lowest=point;}
      const hit=this.floor?new THREE.Raycaster(new THREE.Vector3(lowest.x,this.floorY+2,lowest.z),new THREE.Vector3(0,-1,0)).intersectObject(this.floor,true)[0]:null;
      return {position:lowest.toArray(),floorY:this.floor?hit?.point.y:this.floorY,gap:lowest.y-(this.floor?hit?.point.y:this.floorY)};
    });
    const mesh=this.meshes.find(item=>item.name.includes('body'));
    const values=Object.fromEntries(Object.entries(mesh?.morphTargetDictionary||{}).map(([name,index])=>[name,mesh.morphTargetInfluences[index]]));
    return {action:this.action,label:labels[this.action],paused:this.paused,position:this.actor.position.toArray(),yaw:this.actor.rotation.y,clipTime:this.currentAction.time,footContact,morphs:values,speed:this.speed};
  }
}
