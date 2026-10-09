import { Raycaster } from 'three/src/core/Raycaster.js';
import { Vector2 } from 'three/src/math/Vector2.js';
import { Vector3 } from 'three/src/math/Vector3.js';
import { toiletProjects as spec } from '../src/data/pineapple-house.json';
const root=document.querySelector('.house');
const canvas=document.querySelector('[data-house-canvas]');
const panel=document.querySelector('[data-toilet-panel]');
const effects=document.querySelector('[data-toilet-effects]');
const content=panel.querySelector('[data-toilet-content]');
const intro=panel.querySelector('[data-toilet-intro]');
const status=panel.querySelector('[data-toilet-status]');
const clean=panel.querySelector('[data-toilet-clean]');
const resume=document.querySelector('[data-resume-dialog]');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const raycaster=new Raycaster(),pointer=new Vector2();
const timers=new Set();
let room=null,down=null,state='idle',readerOwned=false,trackingHouse=null;
const house=()=>window.__pineappleHouse;
const later=(fn,delay)=>{const id=setTimeout(()=>{timers.delete(id);fn();},delay);timers.add(id);};
const cancelTimers=()=>{timers.forEach(clearTimeout);timers.clear();};
const setState=value=>{state=value;panel.dataset.phase=value;root.dataset.toiletState=value;};
const label=document.createElement('button');
label.type='button';label.className='room-label object-label toilet-label';label.textContent='憋出来的项目';
label.setAttribute('aria-label','点击马桶，查看憋出来的项目');label.hidden=true;
document.querySelector('[data-house-objects]').append(label);
const readerClean=document.createElement('button');readerClean.type='button';readerClean.hidden=true;
readerClean.textContent='🧹 一键打扫';readerClean.setAttribute('aria-label','一键打扫弹出的项目并返回浴室');
resume.querySelector('.resume-header').insertBefore(readerClean,resume.querySelector('[data-resume-close]'));

function updateLabel() {
  const h=house();if(!h)return;
  const rect=canvas.getBoundingClientRect(),p=new Vector3(...spec.anchor).project(h.camera);
  label.hidden=root.dataset.houseState!=='ready'||room!==spec.room||state!=='idle'||p.z>1||Math.abs(p.x)>1||Math.abs(p.y)>1;
  label.style.left=`${(p.x*.5+.5)*rect.width}px`;label.style.top=`${(-p.y*.5+.5)*rect.height}px`;
}
function attachHouse() {
  const h=house();if(!h||h===trackingHouse)return;
  trackingHouse=h;room=h.snapshot().view==='whole'?null:h.snapshot().view;
  h.controls.addEventListener('change',updateLabel);updateLabel();
}
window.addEventListener('house:ready',attachHouse);
window.addEventListener('house:camera-settled',attachHouse);
window.addEventListener('resize',updateLabel);
window.addEventListener('house:room-changed',event=>{room=event.detail.id;if(state!=='idle')sweep(false,false);attachHouse();updateLabel();});
attachHouse();

function filterProjects(filter='all') {
  panel.querySelectorAll('[data-toilet-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.toiletFilter===filter)));
  panel.querySelectorAll('[data-toilet-card]').forEach(card=>{card.hidden=filter!=='all'&&(filter==='demo'?card.dataset.demo!=='true':card.dataset.group!==filter);});
}
function reveal() {
  if(state!=='burst')return;
  cancelTimers();intro.hidden=true;content.hidden=false;setState('reading');
  panel.querySelector('[data-toilet-filter="all"]').focus({preventScroll:true});
}
// 自嘲装饰仅使用卡通脑花与打码团，不改变项目内容或真实状态。
const brain=`<svg viewBox="0 0 100 88" aria-hidden="true"><path d="M49 16C39 4 22 8 20 22C5 22 3 39 12 47C1 64 16 78 29 76C35 87 49 82 50 73C55 86 70 86 75 75C90 77 99 64 89 51C99 39 91 22 80 24C78 8 62 5 51 16Z" fill="#ed9aaa" stroke="#80525b" stroke-width="4"/><path d="M50 18V72M23 27Q42 23 39 39M18 49Q32 37 39 52Q46 63 31 69M75 30Q59 26 62 42M81 51Q66 38 61 53Q56 65 73 69" fill="none" stroke="#b86b82" stroke-width="3.5" stroke-linecap="round"/></svg>`;
function scatter(origin) {
  effects.replaceChildren();effects.hidden=false;
  const pieces=[['brain','不用的脑花',0],['mosaic','这里打个码',180],['poop','项目已排出',360]];
  for(const [i,[kind,text,delay]] of pieces.entries()) {
    const piece=document.createElement('div');piece.className=`toilet-debris toilet-debris--${kind}`;
    piece.innerHTML=kind==='brain'?brain:kind==='mosaic'?`<span class="toilet-pixel-pile">${Array.from({length:25},(_,j)=>`<i style="--pixel:${j%5}"></i>`).join('')}</span>`:'<span class="toilet-poop" aria-hidden="true">💩</span>';
    const caption=document.createElement('b');caption.textContent=text;piece.append(caption);
    const tx=Math.max(60,Math.min(innerWidth-60,origin.x-80-i*85));
    const ty=Math.max(145,Math.min(innerHeight*.44,origin.y-190+i*45));
    piece.style.cssText=`left:${origin.x}px;top:${origin.y}px;--dx:${tx-origin.x}px;--dy:${ty-origin.y}px;--turn:${(i-1)*14}deg;--delay:${delay}ms`;
    effects.append(piece);
  }
}
function start() {
  attachHouse();
  if(state!=='idle'||room!==spec.room||root.dataset.houseState!=='ready'||root.dataset.cameraTransition!=='idle'||document.querySelector('dialog[open]'))return;
  const h=house(),rect=canvas.getBoundingClientRect(),p=new Vector3(...spec.anchor).project(h.camera);
  cancelTimers();filterProjects();panel.hidden=false;panel.querySelector('.toilet-projects').scrollTop=0;content.hidden=true;intro.hidden=false;
  status.textContent='不用的脑花，先丢掉…';setState('burst');updateLabel();
  scatter({x:rect.left+(p.x*.5+.5)*rect.width,y:rect.top+(-p.y*.5+.5)*rect.height});
  clean.focus({preventScroll:true});
  if(reduced.matches)reveal();else {later(()=>{status.textContent='咳，这部分先打个码。';},180);later(reveal,760);}
}
function sweep(animate=true,restore=true) {
  cancelTimers();if(state==='idle')return;
  readerClean.hidden=true;if(readerOwned){window.closeResume();readerOwned=false;}
  setState('cleaning');
  const finish=()=>{panel.hidden=true;content.hidden=true;intro.hidden=false;effects.hidden=true;effects.replaceChildren();setState('idle');filterProjects();updateLabel();if(restore&&room===spec.room)label.focus({preventScroll:true});};
  if(animate&&!reduced.matches)later(finish,180);else finish();
}
label.addEventListener('click',start);
panel.querySelector('[data-toilet-skip]').addEventListener('click',reveal);
clean.addEventListener('click',()=>sweep());readerClean.addEventListener('click',()=>sweep());
panel.addEventListener('click',event=>{
  const filter=event.target.closest('[data-toilet-filter]');if(filter)filterProjects(filter.dataset.toiletFilter);
  const project=event.target.closest('[data-toilet-project]');
  if(project){readerOwned=true;readerClean.hidden=false;window.openResume(project.dataset.toiletProject);}
});
resume.addEventListener('close',()=>{readerOwned=false;readerClean.hidden=true;});
window.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&state!=='idle'&&!document.querySelector('dialog[open]')){event.preventDefault();event.stopImmediatePropagation();sweep();}
},true);
canvas.addEventListener('pointerdown',event=>{down={room,x:event.clientX,y:event.clientY,time:performance.now(),id:event.pointerId};});
canvas.addEventListener('pointercancel',()=>{down=null;});
canvas.addEventListener('pointerup',event=>{
  const d=down;down=null;
  if(!d||d.id!==event.pointerId||d.room!==spec.room||performance.now()-d.time>650||Math.hypot(event.clientX-d.x,event.clientY-d.y)>7)return;
  const h=house();if(!h)return;
  const rect=canvas.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,h.camera);
  const meshes=[];h.scene.traverse(node=>{if(!node.isMesh)return;for(let p=node;p;p=p.parent)if(!p.visible)return;meshes.push(node);});
  const hit=raycaster.intersectObjects(meshes,false)[0];if(!hit)return;
  for(let node=hit.object;node;node=node.parent)if(node.userData.assetId===spec.asset){start();return;}
});
setState('idle');
