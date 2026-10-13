// 自主表情与预览共用同一组网格控制；时间来自场景循环。
export function companionFace(time, activity, speaking=false, preview='auto', pointer=null) {
  const pulse=(at)=>{const t=(time%20-at)/.24;return t>=0&&t<=1?Math.sin(Math.PI*t):0;};
  let blink=Math.max(...[2.8,7.2,7.55,12.6,17.4].map(pulse));
  const reading=['read','journal','tidy'].includes(activity),sleeping=activity==='sleep';
  let x=reading?Math.sin(time*.75)*.28:Math.sin(time*.47)*.38;
  let y=reading?-.95:Math.sin(time*.31)*.16;
  if(pointer&&!reading){x=pointer.x*.85;y=pointer.y*.65;}
  let smile=['wave','bubble','pet','wake'].includes(activity)?.85:.25;
  let calm=activity==='rest'?.8:reading?.65:0;
  blink=Math.max(blink,reading?.18:activity==='rest'?.12:0);
  let brow=activity==='wave'?.8:reading?.2:.1;
  if(sleeping){blink=1;x=0;y=0;smile=.1;calm=1;brow=0;}
  if(preview==='blink')blink=1;
  if(preview==='left'){blink=0;x=-1;y=0;}
  if(preview==='right'){blink=0;x=1;y=0;}
  if(preview==='happy'){blink=.13;smile=1;calm=0;brow=1;}
  if(preview==='calm'){blink=.35;smile=0;calm=1;brow=0;}
  return {blink,lookRight:Math.max(0,x),lookLeft:Math.max(0,-x),lookUp:Math.max(0,y),lookDown:Math.max(0,-y),smile,calm,browRaise:brow,talk:speaking?(Math.sin(time*13)+1)*.42:0};
}

export function companionRoute(room, progress) {
  const points=[room.entry,...(room.waypoints??[]),room.position];
  const distances=points.slice(1).map((p,i)=>Math.hypot(...p.map((v,k)=>v-points[i][k])));
  let distance=Math.max(0,Math.min(1,progress))*distances.reduce((a,b)=>a+b,0);
  for(let i=0;i<distances.length;i++){
    if(distance<=distances[i]||i===distances.length-1){
      const t=distances[i]?Math.min(1,distance/distances[i]):1;
      return {position:points[i].map((v,k)=>v+(points[i+1][k]-v)*t),direction:points[i+1].map((v,k)=>v-points[i][k])};
    }
    distance-=distances[i];
  }
}

// 与 house_structure.py 的蓝色滑梯同源（Blender Z-up → Three Y-up）。
export function companionSlide(progress) {
  const t=Math.max(0,Math.min(1,progress)),smooth=t*t*(3-2*t);
  return {position:[2.25+.60*Math.sin(t*Math.PI*.8),7.65-4.45*smooth,-.4+2.1*t],direction:[.60*Math.PI*.8*Math.cos(t*Math.PI*.8),-26.7*t*(1-t),2.1]};
}
