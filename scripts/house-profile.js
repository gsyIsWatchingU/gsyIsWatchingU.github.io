import awards from '../src/data/house-awards.json';
import { createInternshipDiary } from './house-diary.js';

const reading=document.querySelector('[data-profile-reading]');
const nav=[...document.querySelectorAll('[data-profile-nav]')];
const dialog=document.querySelector('[data-award-dialog]');
const original=dialog.querySelector('[data-award-original]');
const photo=dialog.querySelector('.award-original');
const zoom=dialog.querySelector('[data-award-zoom]');
const awardById=new Map(awards.map(a=>[a.id,a]));
const resume=document.querySelector('[data-resume-dialog]');
const entry=document.querySelector('[data-resume-open]');
let previousFocus=null, resumeFocus=null;
const internshipDiary=createInternshipDiary();

function navigate(id) {
  const target=document.getElementById(id);
  if(!target || !reading.contains(target)) return;
  const section=target.closest('.profile-section')?.id || 'overview';
  document.body.dataset.profileSection=section;
  nav.forEach(a=>{if(a.dataset.profileNav===section)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  reading.scrollTo({top:Math.max(0,target.getBoundingClientRect().top-reading.getBoundingClientRect().top+reading.scrollTop-24),behavior:'instant'});
}

function openResume(sectionId='overview') {
  if(!resume.open) {
    resumeFocus=document.activeElement;
    resume.showModal();
    document.body.dataset.resumeState='open';
  }
  navigate(sectionId);
}
function closeResume() {
  if(dialog.open)dialog.close();
  if(resume.open)resume.close();
}
function restoreFocus(element) {
  if(element instanceof HTMLElement && element.getClientRects().length && !element.closest('[hidden]'))element.focus({preventScroll:true});
  else {
    const back=document.querySelector('[data-house-back]');
    (back.getClientRects().length?back:entry).focus({preventScroll:true});
  }
}
entry.addEventListener('click',()=>openResume());
resume.querySelector('[data-resume-close]').addEventListener('click',closeResume);
resume.addEventListener('close',()=>{document.body.dataset.resumeState='closed';restoreFocus(resumeFocus);});
document.addEventListener('click',event=>{
  const award=event.target.closest('[data-award-open]');
  if(award) {event.preventDefault();openAward(award.dataset.awardOpen);return;}
  const link=event.target.closest('[data-profile-nav],[data-profile-evidence]');
  if(link) {event.preventDefault();openResume(link.dataset.profileNav||link.dataset.profileEvidence);}
});
window.addEventListener('house:content',event=>{
  if(event.detail.id==='work-journal')internshipDiary.open();
  else openResume(event.detail.section);
});
window.addEventListener('house:award',event=>openAward(event.detail.id));
window.addEventListener('house:project',event=>openResume(`product-${event.detail.id}`));
window.openResume=openResume;
window.closeResume=closeResume;
document.body.dataset.resumeState='closed';

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
dialog.addEventListener('close',()=>restoreFocus(previousFocus));
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
// 原生 dialog 处理 Esc；阻止同一次按键重置背后的房间镜头。
window.addEventListener('keydown',event=>{
  if(event.key==='Escape' && (dialog.open || resume.open))event.stopImmediatePropagation();
});
