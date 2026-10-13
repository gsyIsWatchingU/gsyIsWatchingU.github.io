export function createInternshipDiary() {
  const dialog=document.querySelector('[data-internship-diary]');
  const reading=dialog.querySelector('[data-diary-reading]');
  const articles=[...reading.querySelectorAll('article')];
  const pagination=dialog.querySelector('[data-diary-pagination]');
  const previous=dialog.querySelector('[data-diary-prev]'),next=dialog.querySelector('[data-diary-next]');
  let page=0,perPage=articles.length;
  function render() {
    articles.forEach((article,index)=>article.hidden=index<page*perPage || index>=(page+1)*perPage);
    const pages=Math.ceil(articles.length/perPage);
    previous.disabled=page===0;next.disabled=page>=pages-1;
    dialog.querySelector('[data-diary-page]').textContent=`${page+1} / ${pages}`;
    pagination.hidden=pages===1;
  }
  function fit() {
    if(!dialog.open)return;
    const anchor=page*perPage;
    pagination.hidden=false;page=0;perPage=articles.length;
    while(perPage>1){
      let fits=true;
      for(page=0;page<Math.ceil(articles.length/perPage);page++){
        render();pagination.hidden=false;
        if(reading.scrollHeight>reading.clientHeight+1){fits=false;break;}
      }
      if(fits)break;
      perPage--;
    }
    page=Math.min(Math.floor(anchor/perPage),Math.ceil(articles.length/perPage)-1);
    render();
  }
  previous.addEventListener('click',()=>{if(page>0){page--;render();}});
  next.addEventListener('click',()=>{if((page+1)*perPage<articles.length){page++;render();}});
  new ResizeObserver(fit).observe(dialog);
  document.fonts.ready.then(fit);
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
    page=0;fit();document.body.dataset.diaryState='open';
  }};
}
