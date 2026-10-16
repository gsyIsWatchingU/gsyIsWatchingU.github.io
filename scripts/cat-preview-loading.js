// 外观先显示，完整动作就绪前锁住操作；下载失败时保留外观并允许重试。
export function loadCatPreview({root,loader,standbyURL,animationURL,animationBytes,onStandby,onAnimated}){
 const panel=document.querySelector('#cat-loading'),detail=document.querySelector('#cat-load-detail'),bar=document.querySelector('#cat-load-progress'),retry=document.querySelector('#cat-load-retry');
 const controls=[...document.querySelectorAll('nav button,nav input')];
 let standbyReady=false,busy=false,controller;
 const lock=value=>controls.forEach(control=>control.disabled=value);
 function status(stage,text){root.dataset.loadingStage=stage;panel.hidden=false;panel.querySelector('h2').textContent=stage==='error'?'加载未完成':'猫咪正在加载';bar.hidden=stage==='error';detail.textContent=text;document.querySelector('#phase').textContent=text;document.querySelector('#support').textContent=standbyReady?'猫咪已显示，动作准备好后即可操作':'先载入外观，再载入完整动作';}
 async function load(url,label,expectedBytes){
  controller=new AbortController();let timer;
  const arm=()=>{clearTimeout(timer);timer=setTimeout(()=>controller.abort(),45000);};
  try{
   arm();const response=await fetch(url,{signal:controller.signal});
   if(!response.ok)throw Error('HTTP '+response.status);
   const reader=response.body.getReader(),chunks=[];let received=0;
   const total=Number(response.headers.get('content-length'))||expectedBytes;
   bar.removeAttribute('value');
   for(;;){const {done,value}=await reader.read();if(done)break;arm();chunks.push(value);received+=value.byteLength;
    if(total){bar.max=total;bar.value=Math.min(received,total);}
    const amount=(received/1e6).toFixed(1)+(total?' / '+(total/1e6).toFixed(1):'')+' MB';
    status(label==='外观'?'appearance':'animation','正在下载猫咪'+label+' · '+amount);
   }
   clearTimeout(timer);status('parsing','正在整理猫咪'+label+'…');bar.removeAttribute('value');
   // 先绘制下载完成的提示，再开始主线程解析。
   await new Promise(resolve=>requestAnimationFrame(()=>setTimeout(resolve,0)));
   const bytes=new Uint8Array(received);let offset=0;
   for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
   chunks.length=0;
   return await loader.parseAsync(bytes.buffer,new URL('.',new URL(url,location.href)).href);
  }finally{clearTimeout(timer);}
 }
 async function start(){
  if(busy)return;busy=true;lock(true);retry.hidden=true;root.dataset.loaded='false';
  try{
   if(!standbyReady){
    status('appearance','正在载入猫咪外观…');
    try{await onStandby(await load(standbyURL,'外观'));standbyReady=true;root.dataset.preview='true';}
    catch{status('animation','外观暂未载入，继续载入完整动作…');}
   }
   status('animation',(standbyReady?'猫咪外观已就绪，':'')+'正在载入完整动作…');
   await onAnimated(await load(animationURL,'动作',animationBytes));
   await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
   root.dataset.loaded='true';root.dataset.loadingStage='ready';panel.hidden=true;lock(false);
  }catch(error){
   status('error',(standbyReady?'猫咪已显示，动作':'猫咪')+'加载失败，请重试。');
   root.dataset.loadError=error.name==='AbortError'?'下载长时间无响应':String(error.message);
   bar.removeAttribute('value');retry.hidden=false;
  }finally{busy=false;}
 }
 retry.onclick=start;
 addEventListener('pagehide',()=>controller?.abort(),{once:true});
 start();
}

export function disposeCatPreview(object){
 const geometries=new Set(),materials=new Set(),textures=new Set(),skeletons=new Set();
 object.traverse(child=>{if(child.geometry)geometries.add(child.geometry);if(child.skeleton)skeletons.add(child.skeleton);for(const material of Array.isArray(child.material)?child.material:child.material?[child.material]:[]){materials.add(material);for(const value of Object.values(material))if(value?.isTexture)textures.add(value);}});
 for(const resource of [...geometries,...materials,...textures,...skeletons])resource.dispose();
}
