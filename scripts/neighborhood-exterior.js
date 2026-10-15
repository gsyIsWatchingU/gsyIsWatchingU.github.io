import * as THREE from 'three';

const smooth=t=>t*t*(3-2*t);
function arch(cx,bottom,half,spring,segments=24){
  const points=[[cx-half,bottom],[cx+half,bottom],[cx+half,spring]];
  for(let i=1;i<=segments;i++){const a=i/segments*Math.PI;points.push([cx+half*Math.cos(a),spring+half*Math.sin(a)]);}
  return points;
}
function shape(points){return new THREE.Shape(points.map(([x,y])=>new THREE.Vector2(x,y)));}
function mesh(geometry,material,name,parent){const o=new THREE.Mesh(geometry,material);o.name=name;parent.add(o);return o;}
function bounds(o){o.updateWorldMatrix(true,true);return new THREE.Box3().setFromObject(o);}
function doorOutline(root,panel){
  panel.updateWorldMatrix(true,true);const p=panel.geometry.attributes.position,unique=new Map(),v=new THREE.Vector3();
  for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i);root.worldToLocal(panel.localToWorld(v));unique.set(v.x.toFixed(6)+','+v.y.toFixed(6),[v.x,v.y]);}
  const points=[...unique.values()].sort((a,b)=>a[0]-b[0]||a[1]-b[1]),cross=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]),half=arr=>{const out=[];for(const p of arr){while(out.length>=2&&cross(out.at(-2),out.at(-1),p)<=1e-9)out.pop();out.push(p);}out.pop();return out;};
  return [...half(points),...half([...points].reverse())];
}

// 从原网格裁出门洞/门扇；交点同时插值 UV 和法线，保留菠萝屋原贴图。
export function splitArchGeometry(geometry,points,frontZ){
  const planes=points.map((p,i)=>{const q=points[(i+1)%points.length];return [-q[1]+p[1],q[0]-p[0],0,(q[1]-p[1])*p[0]-(q[0]-p[0])*p[1]];});
  planes.push([0,0,1,-frontZ]);
  const source=geometry.index?geometry.toNonIndexed():geometry,inside=[],outside=[];
  const attrs=['position','normal','uv'].filter(k=>source.attributes[k]);
  function vertex(i){return attrs.flatMap(k=>Array.from({length:source.attributes[k].itemSize},(_,c)=>source.attributes[k].array[i*source.attributes[k].itemSize+c]));}
  function emit(poly,out){for(let i=1;i<poly.length-1;i++)out.push(poly[0],poly[i],poly[i+1]);}
  for(let i=0;i<source.attributes.position.count;i+=3){
    let poly=[vertex(i),vertex(i+1),vertex(i+2)];
    if(planes.some(([a,b,c,d])=>poly.every(v=>a*v[0]+b*v[1]+c*v[2]+d< -1e-8))){emit(poly,outside);continue;}
    for(const [a,b,c,d] of planes){
      if(!poly.length)break;
      const keep=[],reject=[];
      for(let k=0;k<poly.length;k++){
        const v=poly[k],w=poly[(k+1)%poly.length],dv=a*v[0]+b*v[1]+c*v[2]+d,dw=a*w[0]+b*w[1]+c*w[2]+d;
        (dv>=-1e-8?keep:reject).push(v);
        if((dv>1e-8&&dw< -1e-8)||(dv< -1e-8&&dw>1e-8)){const t=dv/(dv-dw),cut=v.map((n,j)=>n+(w[j]-n)*t);keep.push(cut);reject.push(cut);}
      }
      emit(reject,outside);poly=keep;
    }
    emit(poly,inside);
  }
  function build(vertices){const g=new THREE.BufferGeometry();let offset=0;for(const k of attrs){const n=source.attributes[k].itemSize;g.setAttribute(k,new THREE.Float32BufferAttribute(vertices.flatMap(v=>v.slice(offset,offset+n)),n));offset+=n;}g.computeBoundingBox();g.computeBoundingSphere();return g;}
  return {inside:build(inside),outside:build(outside)};
}

function pivotDoor(root,panel,handle,hinge){
  const pivot=new THREE.Group();pivot.name='entrance_hinge';pivot.position.copy(hinge);root.add(pivot);root.updateMatrixWorld(true);
  for(const part of [panel,handle].filter(Boolean))pivot.attach(part);
  return pivot;
}

function paintedWood(){
  const c=document.createElement('canvas');c.width=512;c.height=768;const ctx=c.getContext('2d');
  let seed=18;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
  for(let p=0;p<6;p++){
    const x=p*512/6,w=512/6;ctx.fillStyle=['#b57b34','#c99245','#bf873d','#ce9a4e','#bc8238','#c58e42'][p];ctx.fillRect(x,0,w+1,768);
    for(let i=0;i<85;i++){const gx=x+3+rnd()*(w-6);ctx.strokeStyle=i%3?'#f3c97b18':'#67421c20';ctx.lineWidth=.5+rnd()*1.3;ctx.beginPath();ctx.moveTo(gx,0);ctx.bezierCurveTo(gx+8*rnd(),260,gx-8*rnd(),500,gx,768);ctx.stroke();}
    ctx.fillStyle='#553818';ctx.fillRect(x,0,6,768);ctx.fillStyle='#edbf6a';ctx.fillRect(x+6,0,2,768);
  }
  for(const [x,y] of [[125,225],[365,530]]){ctx.strokeStyle='#7d501f88';ctx.lineWidth=2;for(let i=1;i<4;i++){ctx.beginPath();ctx.ellipse(x,y,i*3,i*11,.06,0,Math.PI*2);ctx.stroke();}}
  const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;return map;
}

export function prepareSquidwardExterior(root){
  root.updateMatrixWorld(true);
  const shells=[];root.traverse(o=>{if(o.isMesh&&o.visible&&/^(shell_main|shell_cutaway_cover)/.test(o.name))shells.push(o);});
  const stone=shells.find(o=>o.material.name==='v7_blue_volcanic_stone')?.material.clone();
  if(stone){
    stone.color.setRGB(.78,.93,1.32);stone.roughness=.87;stone.bumpMap=stone.map;stone.bumpScale=.009;
    root.traverse(o=>{if(o.isMesh&&o.visible&&o.material.name==='v7_blue_volcanic_stone')o.material=stone;});
    // 原资产把穹顶拉成了直壁，顶环仍敞开。按实际顶环补同材质封口。
    const rim=new Map();let top=-Infinity;
    for(const o of shells){if(o.material!==stone)continue;const p=o.geometry.attributes.position;for(let i=0;i<p.count;i++)top=Math.max(top,p.getY(i));}
    for(const o of shells){if(o.material!==stone)continue;const p=o.geometry.attributes.position;for(let i=0;i<p.count;i++)if(Math.abs(p.getY(i)-top)<.001){const x=p.getX(i),z=p.getZ(i);if(Math.hypot(x,z)>.1)rim.set(Math.atan2(z,x).toFixed(5),[x,top,z]);}}
    const ring=[...rim.values()].sort((a,b)=>Math.atan2(a[2],a[0])-Math.atan2(b[2],b[0]));
    if(ring.length>=3){const pos=[],uv=[];for(let i=0;i<ring.length;i++){const a=ring[i],b=ring[(i+1)%ring.length];for(const v of [[0,top+.018,0],b,a]){pos.push(...v);uv.push(v[0]/2.8+.5,v[2]/2.8+.5);}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.computeVertexNormals();mesh(g,stone,'shell_roof_closed',root);root.userData.roofClosed=true;}
  }
  const blue=new THREE.MeshStandardMaterial({color:0x152e63,roughness:.74,metalness:.06});
  const frame=root.getObjectByName('door_frame'),panel=root.getObjectByName('door_panel'),oldHandle=root.getObjectByName('door_handle');
  if(!panel)throw new Error('Missing Squidward door panel');
  frame.position.y-=.15;panel.position.y-=.15;
  frame.scale.x=panel.scale.x=1.12;panel.position.x*=1.12;
  frame.material=blue;
  const pb=bounds(panel),points=doorOutline(root,panel),opening=points.map(([x,y])=>[x*1.015,y-.003]);
  // 旧 door_frame 是一整块拱形背板；裁掉中心后才是真正可穿过的门框。
  const frameCut=splitArchGeometry(frame.geometry,points.map(([x,y])=>[x/frame.scale.x,y-frame.position.y]),1);
  frame.geometry=frameCut.outside;frameCut.inside.dispose();
  for(const o of shells){if(o.material===stone){const cut=splitArchGeometry(o.geometry,opening,1.15);o.geometry=cut.outside;cut.inside.dispose();}}
  const wood=paintedWood(),pm=panel.material.clone();pm.map=wood;pm.color.set('#d8ba89');pm.bumpMap=wood;pm.bumpScale=.004;pm.roughness=.78;panel.material=pm;
  const g=panel.geometry.clone(),p=g.attributes.position,uv=[];
  for(let i=0;i<p.count;i++)uv.push(p.getX(i)/(.6624),p.getY(i)/.9968);
  g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));panel.geometry=g;
  const handle=mesh(new THREE.SphereGeometry(.045,20,14),new THREE.MeshStandardMaterial({color:0xd8ac48,roughness:.4,metalness:.4}),'door_brass_knob',root);
  handle.position.set(.255*1.12,.40,1.636);oldHandle.visible=false;
  const dark=new THREE.MeshStandardMaterial({color:0x101e29,roughness:1,side:THREE.DoubleSide});
  const recess=mesh(new THREE.ShapeGeometry(shape(points)),dark,'entrance_recess',root);recess.position.z=1.4;
  const pivot=pivotDoor(root,panel,handle,new THREE.Vector3(pb.min.x,pb.min.y,1.56));
  return {pivot,anchor:new THREE.Vector3(0,.45,1.59),doorMeshes:[panel,handle,frame],setOpen:t=>{pivot.rotation.y=-smooth(t)*Math.PI*.57;},reset(){pivot.rotation.y=0;}};
}

export function preparePineappleEntrance(root){
  const surface=root.getObjectByProperty('isMesh',true),points=arch(0,.008,.14,.39);
  const cut=splitArchGeometry(surface.geometry,points,.46);surface.geometry=cut.outside;
  const panel=mesh(cut.inside,surface.material.clone(),'pineapple_original_door',surface.parent);panel.material.side=THREE.DoubleSide;
  panel.position.copy(surface.position);panel.quaternion.copy(surface.quaternion);panel.scale.copy(surface.scale);
  const recess=mesh(new THREE.ShapeGeometry(shape(points)),new THREE.MeshStandardMaterial({color:0x102c42,roughness:1,side:THREE.DoubleSide}),'pineapple_entrance_recess',root);recess.position.z=.48;
  const pivot=pivotDoor(root,panel,null,new THREE.Vector3(-.14,.008,.59));
  return {pivot,anchor:new THREE.Vector3(0,.27,.59),doorMeshes:[panel],setOpen:t=>{pivot.rotation.y=-smooth(t)*Math.PI*.56;},reset(){pivot.rotation.y=0;}};
}

export function preparePatrickEntrance(root){
  const pivot=new THREE.Group();pivot.name='rock_back_hinge';pivot.position.set(0,0,-4.35);root.add(pivot);root.updateMatrixWorld(true);
  for(const child of [...root.children])if(child!==pivot)pivot.attach(child);
  const opening=mesh(new THREE.CircleGeometry(4.32,72),new THREE.MeshStandardMaterial({color:0x2a2024,roughness:1,side:THREE.DoubleSide}),'under_rock_entrance',root);opening.rotation.x=-Math.PI/2;opening.position.y=.012;
  return {pivot,anchor:new THREE.Vector3(0,.1,0),doorMeshes:[pivot],setOpen:t=>{pivot.rotation.x=-smooth(t)*Math.PI*.46;},reset(){pivot.rotation.x=0;}};
}
