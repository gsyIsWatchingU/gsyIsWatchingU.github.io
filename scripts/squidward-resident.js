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

const labels = {idle:'休息',walk:'散步',wave:'招手',read:'看夹板'};
const schedule = [['idle',3.2],['walk',7.5],['read',5.6],['idle',2.2],['wave',4]];
export const squidwardEmotions={happy:'喜',annoyed:'怒',sad:'哀'};
const mood = {
  annoyed:{angry:1},happy:{happy:1},sad:{sad:1}
};

export class SquidwardResident {
  constructor({model,actor,clips,route=[],floor=null,floorY=0,travel=true,onChange=()=>{},navigation=null,interactions=[],onGoal=()=>{},speedMultiplier=2.3}) {
    Object.assign(this,{model,actor,route,floor,floorY,travel,onChange,navigation,interactions,onGoal,speedMultiplier});
    this.mixer=new THREE.AnimationMixer(model);this.actions=new Map(clips.map(clip=>[clip.name,this.mixer.clipAction(clip)]));
    this.meshes=[];this.feet=[];
    model.traverse(object=>{
      if(!object.isMesh)return;object.frustumCulled=false;this.meshes.push(object);
      if(object.name.includes('mouth_inner')){this.mouth=object;object.visible=false;}
      if(object.userData.semanticPart?.startsWith('leg.')||/leg[._]?[LR]/.test(object.name)) {
        const pos=object.geometry.attributes.position,indices=[];
        const referenced=new Set(object.geometry.index?.array||Array.from({length:pos.count},(_,i)=>i));
        for(const i of referenced)if(pos.getY(i)<.018)indices.push(i);
        if(indices.length)this.feet.push({mesh:object,indices});
      }
    });
    this.elapsed=0;this.actionTime=0;this.paused=false;this.index=0;this.routeIndex=0;this.nextBlink=1.7;this.blinkAt=-100;this.expression='happy';
    this.homeRotation=actor.rotation.y;this.scale=model.getWorldScale(new THREE.Vector3()).y;
    this.speed=.32*this.scale/(clips.find(clip=>clip.name==='walk')?.duration||1.4)*speedMultiplier;
    this.mode='idle';this.path=[];this.goal=null;this.activity=null;this.autoCount=0;this.interactionCount=0;
    this.transition('idle',navigation?2.5:schedule[0][1]);
  }
  transition(name,duration) {
    const next=this.actions.get(name);if(!next)throw new Error('动作不存在：'+name);
    const previous=this.currentAction;next.reset().setEffectiveWeight(1).setEffectiveTimeScale(name==='walk'?this.speedMultiplier:1);
    next.setLoop(name==='idle'||name==='walk'||duration===Infinity?THREE.LoopRepeat:THREE.LoopOnce,Infinity);next.clampWhenFinished=true;next.play();
    if(previous&&previous!==next){previous.fadeOut(.22);next.fadeIn(.22);}else next.setEffectiveWeight(1);
    this.currentAction=next;this.action=name;this.actionTime=0;this.duration=duration;
    this.notify();
  }
  get label(){return this.mode==='navigate'?(this.intent?.destinationLabel?'走向'+this.intent.destinationLabel:'走过去'):this.mode==='arrived'?'到了，歇一会儿':this.activity?.label||labels[this.action];}
  notify(){this.onChange({action:this.action,label:this.label,paused:this.paused,expression:this.expression});}
  setEmotion(name){if(!squidwardEmotions[name])return;this.expression=name;this.paused=false;this.notify();}
  release(){this.activity?.exit?.();this.activity=null;this.intent=null;this.path=[];this.goal=null;this.requested=null;this.onGoal(null);}
  request(name,continuous=false) {
    if(squidwardEmotions[name]){this.setEmotion(name);return;}
    if(name==='wave'&&this.action==='wave'&&this.actionTime<this.duration&&this.currentAction.isRunning()){this.paused=false;this.notify();return;}
    this.paused=false;this.release();this.mode='manual';this.source='button';
    if(name==='walk'&&this.navigation)return this.goTo(this.navigation.random([this.actor.position.x,this.actor.position.z]),null,'button');
    this.transition(name,continuous?Infinity:name==='wave'?3.2:6);
  }
  goTo(point,intent=null,source='click') {
    const plan=this.navigation?.plan([this.actor.position.x,this.actor.position.z],point);if(!plan)return false;
    this.release();this.paused=false;this.goal=plan.point;this.requested=plan.requested;this.path=plan.path.map(p=>[...p]);this.intent=intent;this.source=source;this.mode='navigate';
    this.onGoal(plan,source);this.transition('walk',Infinity);return true;
  }
  chooseActivity() {
    this.autoCount++;
    // 穿插自由散步与真实物件活动；不靠用户再次点击维持自主行为。
    const activity=this.interactions.length&&this.autoCount%3!==0?this.interactions[(this.autoCount-1)%this.interactions.length]:null;
    this.goTo(activity?.point||this.navigation.random([this.actor.position.x,this.actor.position.z]),activity,'auto');
  }
  arrive() {
    const arrival={position:this.actor.position.toArray(),destination:this.goal,requested:this.requested,activity:this.intent?.id||null,source:this.source,time:this.elapsed};
    this.lastArrival=arrival;if(this.source!=='auto')this.lastUserArrival=arrival;
    this.path=[];this.onGoal(null);
    if(this.intent){this.activity=this.intent;this.intent=null;this.mode='interact';this.interactionCount++;this.activity.enter?.();if(this.activity.emotion)this.setEmotion(this.activity.emotion);this.transition(this.activity.action||'idle',this.activity.duration||6);}
    else {this.mode='arrived';this.goal=null;this.transition('idle',4.5);}
  }
  setPaused(value) {this.paused=value;this.notify();}
  update(dt,active=true) {
    if(!active)return;
    if(this.paused){if(this.mouth)this.mouth.visible=(this.mouth.morphTargetInfluences?.[this.mouth.morphTargetDictionary.mouthOpen]||0)>.10;return;}
    this.elapsed+=dt;this.actionTime+=dt;
    if(this.actionTime>=this.duration){
      if(this.navigation&&this.travel){this.release();this.chooseActivity();}
      else {this.index=(this.index+1)%schedule.length;this.transition(...schedule[this.index]);}
    }
    const moving=this.action==='walk'&&this.travel&&(this.path.length||this.route.length);
    if(moving) {
      const goal=this.navigation?this.path[0]:this.route[this.routeIndex];
      if(!goal){this.arrive();return;}
      const dx=goal[0]-this.actor.position.x,dz=goal[1]-this.actor.position.z;
      const distance=Math.hypot(dx,dz);
      if(distance<.008){if(this.navigation){this.path.shift();if(!this.path.length)this.arrive();}else this.routeIndex=(this.routeIndex+1)%this.route.length;}
      else {
        const amount=Math.min(distance,this.speed*dt);this.actor.position.x+=dx/distance*amount;this.actor.position.z+=dz/distance*amount;
        const desired=Math.atan2(dx,dz),angle=Math.atan2(Math.sin(desired-this.actor.rotation.y),Math.cos(desired-this.actor.rotation.y));
        this.actor.rotation.y+=angle*Math.min(1,dt*9);
      }
    } else {
      const focus=this.activity?.focus;
      const desired=focus?Math.atan2(focus[0]-this.actor.position.x,focus[1]-this.actor.position.z):this.homeRotation;
      const angle=Math.atan2(Math.sin(desired-this.actor.rotation.y),Math.cos(desired-this.actor.rotation.y));
      this.actor.rotation.y+=angle*Math.min(1,dt*5);
    }
    this.mixer.update(dt);
    if(this.elapsed>=this.nextBlink){this.blinkAt=this.elapsed;this.nextBlink=this.elapsed+3.0+(Math.sin(this.elapsed*2)+1)*.7;}
    const blinkAge=this.elapsed-this.blinkAt;
    const targets={...mood[this.expression],blink:blinkAge<.19?Math.sin(blinkAge/.19*Math.PI):0};
    for(const mesh of this.meshes) {
      if(!mesh.morphTargetDictionary)continue;
      for(const [name,index] of Object.entries(mesh.morphTargetDictionary)) {
        const eyeBlend=mesh.name.includes('expression_eye_')&&['happy','angry','sad'].includes(name)?1-targets.blink:1;
        const value=THREE.MathUtils.damp(mesh.morphTargetInfluences[index]||0,(targets[name]||0)*eyeBlend,name==='blink'?42:10,dt);
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
    const mesh=this.meshes.find(item=>item.name.includes('expression_eye_left_lid'))||this.meshes.find(item=>item.name.includes('body'));
    const values=Object.fromEntries(Object.entries(mesh?.morphTargetDictionary||{}).map(([name,index])=>[name,mesh.morphTargetInfluences[index]]));
    return {action:this.action,expression:this.expression,label:this.label,mode:this.mode,source:this.source,activity:this.activity?.id||null,intent:this.intent?.id||null,destination:this.goal,requested:this.requested,path:this.path,lastArrival:this.lastArrival,lastUserArrival:this.lastUserArrival,autoCount:this.autoCount,interactionCount:this.interactionCount,paused:this.paused,position:this.actor.position.toArray(),yaw:this.actor.rotation.y,clipTime:this.currentAction.time,footContact,morphs:values,speed:this.speed};
  }
}
