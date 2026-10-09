export function createInternshipDiary() {
  const dialog=document.querySelector('[data-internship-diary]');
  const reading=dialog.querySelector('[data-diary-reading]');
  let returnFocus=null;
  dialog.querySelector('[data-diary-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{
    document.body.dataset.diaryState='closed';
    const fallback=document.querySelector('[data-house-object="work-journal"]');
    const target=returnFocus instanceof HTMLElement && returnFocus.getClientRects().length && !returnFocus.closest('[hidden]')?returnFocus:fallback;
    target?.focus({preventScroll:true});
  });
  window.addEventListener('keydown',event=>{if(event.key==='Escape' && dialog.open)event.stopImmediatePropagation();});
  document.body.dataset.diaryState='closed';
  return {open(){
    if(!dialog.open){returnFocus=document.activeElement;dialog.showModal();}
    reading.scrollTop=0;document.body.dataset.diaryState='open';
  }};
}
