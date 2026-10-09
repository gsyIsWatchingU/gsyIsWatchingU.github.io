// 经典脚本启动反馈；离线包直接打开，不跳转、不发起请求。
(function(){
  var loading=document.getElementById('loading'),ready=false;
  function fail(message,error){
    loading.hidden=false;loading.style.display='block';loading.setAttribute('role','alert');loading.textContent=message;
    var retry=document.createElement('button');retry.className='btn';retry.textContent='重新载入';retry.style.cssText='display:block;margin:12px auto 0';retry.addEventListener('click',function(){location.reload();});loading.appendChild(retry);
    if(error)console.error('夜班启动失败',error);
  }
  addEventListener('krusty-ready',function(){ready=true;loading.hidden=true;loading.style.display='none';});
  addEventListener('krusty-loading',function(e){if(!ready)loading.textContent=e.detail||'正在准备夜班…';});
  addEventListener('error',function(e){if(e.error)fail(ready?'游戏遇到错误；进度已保留，请重新载入。':'游戏启动失败，请重新载入。',e.error);});
  addEventListener('unhandledrejection',function(e){fail('游戏遇到错误；进度已保留，请重新载入。',e.reason);});
})();
// 触控按钮直接处理轻点，避免 WebView 在取消/拖动后吞掉兼容鼠标 click。
(function(){
  var taps=new Map(),activated=null;
  document.addEventListener('pointerdown',function(e){
    if(e.pointerType!=='touch')return;var button=e.target.closest('button');
    if(button&&!button.disabled)taps.set(e.pointerId,{button:button,x:e.clientX,y:e.clientY});
  },true);
  document.addEventListener('pointercancel',function(e){taps.delete(e.pointerId);},true);
  document.addEventListener('pointerup',function(e){
    var tap=taps.get(e.pointerId);taps.delete(e.pointerId);if(!tap)return;
    if(e.target.closest('button')!==tap.button||Math.hypot(e.clientX-tap.x,e.clientY-tap.y)>10||tap.button.disabled)return;
    activated={time:Date.now(),x:e.clientX,y:e.clientY};e.preventDefault();tap.button.click();
  },true);
  document.addEventListener('click',function(e){
    var button=e.target.closest('button');
    if(button&&activated&&e.isTrusted&&e.detail>0&&Date.now()-activated.time<700&&Math.hypot(e.clientX-activated.x,e.clientY-activated.y)<20){e.preventDefault();e.stopImmediatePropagation();}
  },true);
  addEventListener('blur',function(){taps.clear();});
})();
