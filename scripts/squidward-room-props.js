import * as THREE from 'three';

function planarUV(mesh){
  mesh.geometry=mesh.geometry.clone();mesh.updateWorldMatrix(true,false);
  const box=new THREE.Box3().setFromObject(mesh),size=box.getSize(new THREE.Vector3());
  const pos=mesh.geometry.attributes.position,uv=new Float32Array(pos.count*2);
  for(let i=0;i<pos.count;i++){
    const p=new THREE.Vector3().fromBufferAttribute(pos,i).applyMatrix4(mesh.matrixWorld);
    uv[i*2]=(p.x-box.min.x)/size.x;uv[i*2+1]=(p.y-box.min.y)/size.y;
  }
  mesh.geometry.setAttribute('uv',new THREE.BufferAttribute(uv,2));
}

export async function livingProps(interior){
  const objects=[];interior.traverse(o=>{if(o.isMesh)objects.push(o);});
  const picture=objects.find(o=>o.name.startsWith('living_wall-picture')&&o.material.name.startsWith('canvas-art'));
  if(picture){
    const image=await new THREE.TextureLoader().loadAsync('../../assets/images/squidward-house/self-portrait.png');
    const canvas=document.createElement('canvas');canvas.width=768;canvas.height=1024;
    canvas.getContext('2d').drawImage(image.image,0,0,768,1024);image.dispose();
    const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;planarUV(picture);
    picture.material=new THREE.MeshStandardMaterial({map,color:0xffffff,roughness:.94});picture.userData.portraitLoaded=true;
  }
  const screen=objects.find(o=>o.name.startsWith('living_old-tv')&&o.material.name.startsWith('crt-screen'));
  const video=document.createElement('canvas');video.width=256;video.height=256;const ctx=video.getContext('2d');
  const videoMap=new THREE.CanvasTexture(video);videoMap.colorSpace=THREE.SRGBColorSpace;
  let tvOn=false,t=0;
  if(screen){planarUV(screen);screen.material=screen.material.clone();screen.material.emissive=new THREE.Color(0x9bcbd0);screen.material.emissiveIntensity=0;}
  function setTV(on){tvOn=on;if(screen){screen.material.map=on?videoMap:null;screen.material.emissiveMap=on?videoMap:null;screen.material.color.set(on?0xffffff:0x25383c);screen.material.emissiveIntensity=on?.75:0;screen.material.needsUpdate=true;}}
  function update(dt){
    if(!tvOn)return;t+=dt;
    const gradient=ctx.createLinearGradient(0,0,0,256);gradient.addColorStop(0,'#79c5d6');gradient.addColorStop(1,'#245879');ctx.fillStyle=gradient;ctx.fillRect(0,0,256,256);
    ctx.fillStyle='#d9c788';ctx.fillRect(0,211,256,45);
    for(let i=0;i<7;i++){const x=(i*47+t*19)%290-18,y=48+i*24;ctx.fillStyle=['#f6ce67','#e7a5bb','#c9d892'][i%3];ctx.beginPath();ctx.ellipse(x,y,13,6,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(x-10,y);ctx.lineTo(x-22,y-8);ctx.lineTo(x-22,y+8);ctx.fill();}
    ctx.strokeStyle='rgba(245,255,255,.45)';for(let i=0;i<9;i++){ctx.beginPath();ctx.arc((i*29)%256,220-((t*16+i*31)%220),3+i%4,0,Math.PI*2);ctx.stroke();}
    videoMap.needsUpdate=true;
  }
  const interactions=[
    {id:'tv',object:'living_old-tv',destinationLabel:'电视',label:'看电视',point:[.28,-.48],focus:[.28,-.86],action:'idle',duration:7,enter:()=>setTV(true),exit:()=>setTV(false)},
    {id:'books',object:'living_bookshelf',destinationLabel:'书架',label:'看看书架',point:[.65,-.30],focus:[.95,-.60],action:'idle',duration:6},
    {id:'portrait',object:'living_wall-picture',destinationLabel:'肖像画',label:'欣赏自己的肖像',point:[.12,-.43],focus:[-.40,-1.13],action:'idle',duration:5,emotion:'happy'},
    {id:'plant',object:'living_plant',destinationLabel:'盆栽',label:'看看盆栽',point:[.56,-.49],focus:[.55,-.90],action:'idle',duration:5}
  ];
  for(const o of objects){const interaction=interactions.find(a=>o.name.startsWith(a.object));if(interaction)o.userData.residentInteraction=interaction.id;}
  const boxes=[];
  for(const o of objects){
    if(!o.name.startsWith('living_')||o.name.includes('squidward-bunny')||o.name.includes('wall')||o.name.includes('rug'))continue;
    const box=new THREE.Box3().setFromObject(o).applyMatrix4(interior.matrixWorld.clone().invert());
    if(box.min.y<1.80&&box.max.y>1.23)boxes.push(box);
  }
  const marker=new THREE.Mesh(new THREE.RingGeometry(.034,.053,32),new THREE.MeshBasicMaterial({color:0xe5ac43,transparent:true,opacity:.85,side:THREE.DoubleSide,depthWrite:false}));
  marker.name='living_destination_marker';marker.rotation.x=-Math.PI/2;marker.visible=false;marker.renderOrder=4;interior.add(marker);
  return {picture,screen,interactions,obstacles:boxes,update,get tvOn(){return tvOn;},get tvTime(){return t;},onGoal(plan,source){marker.visible=!!plan&&source!=='auto';if(plan)marker.position.set(plan.point[0],1.205,plan.point[1]);}};
}
