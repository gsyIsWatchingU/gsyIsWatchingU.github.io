import * as THREE from 'three';

const paintings=[['pearl','戴珍珠耳环的章鱼哥'],['mona-lisa','章鱼哥的微笑'],['starry-portrait','星夜自画像'],['scream','章鱼哥的呐喊'],['cubist','几何肖像']];
const artUrl=id=>`assets/house-art/${id}.png`;

function createGallery(onClose){
  const dialog=document.createElement('dialog');dialog.className='chest-gallery';
  dialog.setAttribute('aria-labelledby','chest-gallery-title');
  dialog.innerHTML=`<header><div><span>卧室 · 私藏画作</span><h2 id="chest-gallery-title">玩具箱里的小画廊</h2></div><button class="chest-gallery-close" type="button" aria-label="关闭画廊">×</button></header><figure><div class="chest-art-frame"><img alt="" width="1080" height="1350"></div><figcaption></figcaption></figure><nav aria-label="切换画作"><button type="button" data-art-prev aria-label="上一幅画">←</button><div class="chest-art-thumbs">${paintings.map(([id,title],i)=>`<button type="button" data-art-index="${i}" aria-label="查看${title}" aria-pressed="false"><img src="${artUrl(id)}" alt="" width="40" height="50" loading="lazy"></button>`).join('')}</div><button type="button" data-art-next aria-label="下一幅画">→</button></nav>`;
  document.body.append(dialog);let current=0,trigger;
  const image=dialog.querySelector('figure img');
  function select(index){
    current=(index+paintings.length)%paintings.length;const [id,title]=paintings[current];
    image.src=artUrl(id);image.alt=title;dialog.dataset.artIndex=String(current);
    dialog.querySelector('figcaption').textContent=`${title} · ${current+1} / ${paintings.length}`;
    dialog.querySelectorAll('[data-art-index]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.artIndex)===current)));
  }
  dialog.querySelector('.chest-gallery-close').addEventListener('click',()=>dialog.close());
  dialog.querySelector('[data-art-prev]').addEventListener('click',()=>select(current-1));
  dialog.querySelector('[data-art-next]').addEventListener('click',()=>select(current+1));
  dialog.querySelectorAll('[data-art-index]').forEach(button=>button.addEventListener('click',()=>select(Number(button.dataset.artIndex))));
  dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();select(current+(event.key==='ArrowRight'?1:-1));}});
  dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))dialog.close();});
  dialog.addEventListener('close',()=>{onClose();trigger?.focus({preventScroll:true});});
  return{open(){trigger=document.activeElement;select(0);dialog.showModal();},close(){dialog.close();}};
}

export function createToyChest(chest,{root,version,reducedMotion}){
  const hinge=new THREE.Group();hinge.position.set(0,.325,-.245);chest.add(hinge);
  const lids=[];chest.traverse(n=>{if(n.isMesh&&n.name.endsWith('__lid'))lids.push(n);});
  for(const lid of lids)hinge.attach(lid);
  const holder=new THREE.Group();holder.visible=false;chest.add(holder);
  const gold=new THREE.MeshStandardMaterial({color:0xbd8732,metalness:.72,roughness:.32});
  const trim=new THREE.MeshStandardMaterial({color:0xf4d58a,metalness:.6,roughness:.26});
  let open=false,amount=0,loaded=0,failed=false;
  root.dataset.toyChest='closed';root.dataset.toyChestReady='loading';
  const gallery=createGallery(()=>{open=false;root.dataset.toyChest='closed';});
  paintings.forEach(([id],index)=>{
    const frame=new THREE.Group(),w=.25,h=.3125;
    const addBar=(width,height,x,y,depth,material)=>{const mesh=new THREE.Mesh(new THREE.BoxGeometry(width,height,depth),material);mesh.position.set(x,y,.008);frame.add(mesh);};
    for(const [border,depth,material] of [[.025,.027,gold],[.006,.033,trim]]){
      addBar(w+border*2,border,0,h/2+border/2,depth,material);addBar(w+border*2,border,0,-h/2-border/2,depth,material);
      addBar(border,h,-w/2-border/2,0,depth,material);addBar(border,h,w/2+border/2,0,depth,material);
    }
    const texture=new THREE.TextureLoader().load(`${artUrl(id)}?v=${version}`,()=>{loaded++;root.dataset.toyChestReady=failed?'false':loaded===paintings.length?'true':'loading';},undefined,()=>{failed=true;root.dataset.toyChestReady='false';});
    texture.colorSpace=THREE.SRGBColorSpace;
    const canvas=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:texture,roughness:.85,side:THREE.DoubleSide}));canvas.position.z=.026;frame.add(canvas);
    frame.position.set((index-2)*.082,.2+Math.abs(index-2)*.007,(2-index)*.028);frame.rotation.set(-.12,0,(index-2)*-.12);holder.add(frame);
    frame.traverse(n=>{if(n.isMesh){n.castShadow=true;n.receiveShadow=true;}n.userData.roomId='bedroom';n.userData.contentId='toy-chest';});
  });
  return{
    toggle(){if(open){gallery.close();return;}open=true;root.dataset.toyChest='open';gallery.open();},
    update(dt){const target=open?1:0;amount=reducedMotion?target:THREE.MathUtils.damp(amount,target,6,dt);if(Math.abs(amount-target)<.001)amount=target;hinge.rotation.x=-1.4*amount;holder.visible=amount>.05;holder.position.y=.06+.22*amount;holder.scale.setScalar(.55+.45*amount);},
    snapshot:()=>({open,amount,ready:loaded===paintings.length,lidParts:lids.length,paintings:paintings.length,loaded})
  };
}
