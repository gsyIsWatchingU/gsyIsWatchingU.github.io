// 容器保持竖屏时，页面内部横向显示；不锁定系统方向、不阻挡游戏。
(function(){
  'use strict';
  var frame=document.getElementById('viewportFrame'),app=document.getElementById('app'),rotated=false;
  function sync(){
    var width=frame.clientWidth,height=frame.clientHeight;
    rotated=height>width;
    document.body.classList.toggle('virtual-landscape',rotated);
    document.body.classList.toggle('compact-clues',(rotated?width:height)<570);
    document.body.classList.toggle('short-clues',(rotated?width:height)<350);
    app.style.width=(rotated?height:width)+'px';app.style.height=(rotated?width:height)+'px';
    app.style.setProperty('--restroom-art-height',Math.max(100,(rotated?width:height)*.44)+'px');
    app.style.left=(rotated?width:0)+'px';app.style.top='0px';
    app.style.transform=rotated?'rotate(90deg)':'none';
  }
  function localPoint(x,y){
    var r=frame.getBoundingClientRect();
    return rotated?{x:y-r.top,y:r.width-(x-r.left)}:{x:x-r.left,y:y-r.top};
  }
  function screenPoint(x,y){
    var r=frame.getBoundingClientRect();
    return rotated?{x:r.left+r.width-y,y:r.top+x}:{x:r.left+x,y:r.top+y};
  }
  function delta(x,y){return rotated?{x:y,y:-x}:{x:x,y:y};}
  window.KrustyViewport={sync:sync,localPoint:localPoint,screenPoint:screenPoint,delta:delta,rotated:function(){return rotated;}};
  sync();addEventListener('resize',sync);addEventListener('orientationchange',sync);
  if(window.ResizeObserver)new ResizeObserver(function(){sync();dispatchEvent(new Event('krusty-viewport'));}).observe(frame);
})();
