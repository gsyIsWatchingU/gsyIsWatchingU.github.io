import profile from '../src/data/house-profile.json';
import awards from '../src/data/house-awards.json';

const reading=document.querySelector('[data-profile-reading]');
const nav=[...document.querySelectorAll('[data-profile-nav]')];
const dialog=document.querySelector('[data-award-dialog]');
const original=dialog.querySelector('[data-award-original]');
const photo=dialog.querySelector('.award-original');
const zoom=dialog.querySelector('[data-award-zoom]');
const awardById=new Map(awards.map(a=>[a.id,a]));
const roomSections=new Map(profile.sections.filter(s=>s.room).map(s=>[s.room,s.id]));
roomSections.set('living','skills');
let pendingRoom=null, syncing=false, previousFocus=null;

function navigate(id,{camera=true,history=true}={}) {
  const target=document.getElementById(id);
  if(!target || !reading.contains(target)) return;
  const section=target.closest('.profile-section')?.id || 'overview';
  document.body.dataset.profileSection=section;
  nav.forEach(a=>{if(a.dataset.profileNav===section)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  reading.scrollTo({top:Math.max(0,target.getBoundingClientRect().top-reading.getBoundingClientRect().top+reading.scrollTop-24),behavior:'instant'});
  if(history) window.history.replaceState(null,'',`#${id}`);
  if(camera) {
    pendingRoom=profile.sections.find(s=>s.id===section)?.room ?? null;
    syncing=true;
    if(pendingRoom) window.__pineappleHouse?.focusRoom(pendingRoom);
    else window.__pineappleHouse?.resetView();
    syncing=false;
  }
}
document.addEventListener('click',event=>{
  const award=event.target.closest('[data-award-open]');
  if(award) {event.preventDefault();openAward(award.dataset.awardOpen);return;}
  const link=event.target.closest('[data-profile-nav],[data-profile-evidence],.profile-brand');
  if(link) {event.preventDefault();navigate(link.dataset.profileNav||link.dataset.profileEvidence||'overview');}
});
window.addEventListener('house:room-changed',event=>{
  if(syncing) return;
  const section=roomSections.get(event.detail.id);
  pendingRoom=event.detail.id;
  if(section) navigate(section,{camera:false});
  else if(!event.detail.id) navigate('overview',{camera:false});
});
window.addEventListener('house:ready',()=>{
  if(pendingRoom) {syncing=true;window.__pineappleHouse.focusRoom(pendingRoom);syncing=false;}
});
window.addEventListener('house:award',event=>openAward(event.detail.id));
window.addEventListener('house:project',event=>navigate(`product-${event.detail.id}`));
window.addEventListener('hashchange',()=>navigate(location.hash.slice(1)||'overview',{history:false}));

function openAward(id) {
  const a=awardById.get(id);if(!a)return;
  previousFocus=document.activeElement;
  dialog.querySelector('h2').textContent=a.title;
  dialog.querySelector('[data-award-detail]').textContent=a.detail;
  const status=dialog.querySelector('[data-award-status]');
  photo.classList.remove('is-zoomed');original.style.maxWidth='';original.style.maxHeight='';
  zoom.textContent='放大查看';zoom.setAttribute('aria-pressed','false');zoom.disabled=true;
  status.textContent='正在载入原始照片…';
  original.hidden=true;
  original.onload=()=>{original.hidden=false;zoom.disabled=false;status.textContent='用户提供的原始照片';};
  original.onerror=()=>{status.textContent='原图载入失败，可点击下方链接重新打开。';};
  original.alt=`${a.title}，${a.detail}，原始照片`;
  original.classList.toggle('rotate-photo',a.rotation===90);
  original.src=a.original;
  dialog.querySelector('[data-award-link]').href=a.original;
  dialog.dataset.awardId=id;
  if(!dialog.open)dialog.showModal();
}
dialog.querySelector('[data-award-close]').addEventListener('click',()=>dialog.close());
zoom.addEventListener('click',()=>{
  const expand=!photo.classList.contains('is-zoomed');
  if(expand) {original.style.maxWidth=`${original.clientWidth}px`;original.style.maxHeight=`${original.clientHeight}px`;}
  photo.classList.toggle('is-zoomed',expand);
  zoom.textContent=expand?'还原大小':'放大查看';zoom.setAttribute('aria-pressed',String(expand));
  if(!expand){original.style.maxWidth='';original.style.maxHeight='';}
  else {photo.scrollLeft=(photo.scrollWidth-photo.clientWidth)/2;photo.scrollTop=(photo.scrollHeight-photo.clientHeight)/2;}
});
dialog.addEventListener('close',()=>previousFocus?.focus({preventScroll:true}));
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
window.addEventListener('keydown',event=>{
  if(event.key==='Escape' && dialog.open)event.stopImmediatePropagation();
  else if(event.key==='Escape')navigate('overview');
});
navigate(location.hash.slice(1)||'overview',{history:false});
