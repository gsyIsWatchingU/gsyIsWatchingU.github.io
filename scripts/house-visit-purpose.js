const storageKey='house-visit-purpose';
export const visitPurposes={browse:'简单看看',recruit:'招人',inspiration:'找灵感'};

export function getVisitPurpose() {
  try {const value=sessionStorage.getItem(storageKey);return Object.hasOwn(visitPurposes,value)?value:null;} catch {return null;}
}

export function createVisitPurpose(root) {
  if(root.hasAttribute('data-house-companion-preview'))return;
  const card=document.createElement('section');card.className='house-visit-purpose';card.hidden=!!getVisitPurpose();card.setAttribute('aria-label','选择来访目的');
  const title=document.createElement('h2');title.textContent='今天想怎么逛？';card.append(title);
  const options=document.createElement('div');card.append(options);
  for(const [id,label] of Object.entries(visitPurposes)) {
    const button=document.createElement('button');button.type='button';button.dataset.visitPurpose=id;button.textContent=label;
    button.addEventListener('click',()=>{
      try {sessionStorage.setItem(storageKey,id);} catch {}
      // 存储不可用时，本页仍保留选择。
      root.dataset.visitPurpose=id;card.hidden=true;
      window.dispatchEvent(new CustomEvent('house:visit-purpose-changed',{detail:{id}}));
    });
    options.append(button);
  }
  root.append(card);
}
