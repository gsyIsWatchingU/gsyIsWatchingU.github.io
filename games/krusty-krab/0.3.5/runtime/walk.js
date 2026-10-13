(function(){
"use strict";
const THREE=window.THREE;

function createWalk(scene,camera,canvas,getObstacles,extraBlocked=()=>false,onStep=()=>{}) {
  const position=new THREE.Vector3(),look=new THREE.Vector3(),keys=new Set(),joystick={x:0,y:0};
  const eyeHeight=1.65,bodyRadius=.23;
  let enabled=false,yaw=Math.PI,pitch=0,room='lobby',pointer=null,lastX=0,lastY=0,stepDistance=0;
  const spawns={entrance:[0,.20,-12.6],lobby:[0,.20,-7.7],cashier:[2,.20,-1.6],kitchen:[-2.7,.22,5.3],office:[4.8,.22,4.6],storage:[0,-3.1,2.5]};
  const pad=document.getElementById('movePad'),stick=document.getElementById('stick');let stickPointer=null;
  function resetStick(){joystick.x=joystick.y=0;stickPointer=null;stick.style.transform='translate(0px,0px)';}
  function paintCamera(){camera.position.copy(position);camera.position.y+=eyeHeight;look.set(-Math.sin(yaw)*Math.cos(pitch),-Math.sin(pitch),-Math.cos(yaw)*Math.cos(pitch)).add(camera.position);camera.lookAt(look);}
  function teleport(name){if(!spawns[name])return;room=name;position.fromArray(spawns[name]);yaw=Math.PI;pitch=0;keys.clear();resetStick();paintCamera();}
  function setEnabled(value,options={}){enabled=value;keys.clear();resetStick();pointer=null;if(value&&options.room)teleport(options.room);}
  function blocked(x,z){
    if(room==='entrance')return Math.abs(x)>12||z< -18||z> -8.8;
    if(room==='storage'){if(Math.abs(x)>3.7||z<1.8||z>8.2)return true;}
    else if(Math.abs(x)>6.55||z< -8.08||z>8.72)return true;
    if(extraBlocked(x,z,position.y))return true;
    return getObstacles().some(b=>position.y+1.4>b.min.y&&position.y+.1<b.max.y&&x>b.min.x-bodyRadius&&x<b.max.x+bodyRadius&&z>b.min.z-bodyRadius&&z<b.max.z+bodyRadius);
  }
  function update(dt){
    if(!enabled)return;
    const forward=-joystick.y+Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown'));
    const right=joystick.x+Number(keys.has('KeyD')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft'));
    const length=Math.hypot(forward,right);
    if(length){
      const speed=(keys.has('ShiftLeft')||keys.has('ShiftRight')?3.8:2.3)*dt/Math.max(1,length);
      const dx=(-Math.sin(yaw)*forward+Math.cos(yaw)*right)*speed,dz=(-Math.cos(yaw)*forward-Math.sin(yaw)*right)*speed;
      const beforeX=position.x,beforeZ=position.z;
      if(!blocked(position.x+dx,position.z))position.x+=dx;
      if(!blocked(position.x,position.z+dz))position.z+=dz;
      stepDistance+=Math.hypot(position.x-beforeX,position.z-beforeZ);
      if(stepDistance>.78){stepDistance%=.78;onStep(room);}
      if(room!=='storage'&&room!=='entrance')room=position.z>3.4?(position.x>3.5?'office':'kitchen'):(position.z> -2.3&&position.x>.6&&position.x<3.4?'cashier':'lobby');
    }
    paintCamera();
  }
  window.addEventListener('keydown',e=>{if(!enabled||/INPUT|TEXTAREA/.test(e.target.tagName))return;if(/^(Key[WASD]|Arrow|Shift)/.test(e.code)){e.preventDefault();keys.add(e.code);}});
  window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>{keys.clear();pointer=null;resetStick();});
  canvas.addEventListener('pointerdown',e=>{if(!enabled||e.button!==0||pointer!==null)return;pointer=e.pointerId;lastX=e.clientX;lastY=e.clientY;if(canvas.setPointerCapture)canvas.setPointerCapture(e.pointerId);});
  ['pointerup','pointercancel','lostpointercapture'].forEach(type=>canvas.addEventListener(type,e=>{if(pointer===e.pointerId)pointer=null;}));
  canvas.addEventListener('pointermove',e=>{if(!enabled||e.pointerId!==pointer)return;const d=window.KrustyViewport.delta(e.clientX-lastX,e.clientY-lastY);yaw-=d.x*.004;pitch=THREE.MathUtils.clamp(pitch+d.y*.003,-1.2,1.2);lastX=e.clientX;lastY=e.clientY;paintCamera();});
  function moveStick(e){const r=pad.getBoundingClientRect(),radius=pad.clientWidth*.30,d=window.KrustyViewport.delta(e.clientX-r.left-r.width/2,e.clientY-r.top-r.height/2),dx=d.x,dy=d.y;const len=Math.hypot(dx,dy),factor=len>radius?radius/len:1;joystick.x=len<4?0:dx*factor/radius;joystick.y=len<4?0:dy*factor/radius;stick.style.transform=`translate(${dx*factor}px,${dy*factor}px)`;}
  pad.addEventListener('pointerdown',e=>{if(!enabled||stickPointer!==null)return;e.preventDefault();stickPointer=e.pointerId;if(pad.setPointerCapture)pad.setPointerCapture(e.pointerId);moveStick(e);});
  pad.addEventListener('pointermove',e=>{if(e.pointerId===stickPointer){e.preventDefault();moveStick(e);}});
  ['pointerup','pointercancel','lostpointercapture'].forEach(type=>pad.addEventListener(type,e=>{if(e.pointerId===stickPointer)resetStick();}));
  return {setEnabled,teleport,update,paintCamera,getState:()=>({view:'第一人称',room,position:position.toArray(),yaw,pitch,eyeHeight,enabled})};
}

window.KrustyWalk={createWalk};
})();