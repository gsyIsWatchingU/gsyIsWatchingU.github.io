import * as THREE from 'three';
import config from '../src/data/house-neighborhood.json';
import {createPatrickExterior} from './patrick-exterior.js';

function addPortholeDetails(root) {
  if (root.userData.portholeDetails) return;
  root.userData.portholeDetails = true;
  const group = new THREE.Group();
  group.name = 'porthole_details';
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x617e9b, roughness: 0.78, metalness: 0 });
  const glassCanvas = document.createElement('canvas');
  glassCanvas.width = glassCanvas.height = 128;
  const context = glassCanvas.getContext('2d');
  const gradient = context.createRadialGradient(46, 38, 4, 64, 64, 88);
  gradient.addColorStop(0, '#cfdfdb');
  gradient.addColorStop(0.45, '#739ab7');
  gradient.addColorStop(1, '#345172');
  context.fillStyle = gradient; context.fillRect(0, 0, 128, 128);
  context.strokeStyle = 'rgba(240,250,248,0.3)'; context.lineWidth = 8;
  context.beginPath(); context.moveTo(18, 22); context.lineTo(91, 101); context.stroke();
  const glassTexture = new THREE.CanvasTexture(glassCanvas); glassTexture.colorSpace = THREE.SRGBColorSpace;
  const glassMat = new THREE.MeshPhysicalMaterial({
    map: glassTexture, metalness: 0.08, roughness: 0.22,
    transparent: false, clearcoat: 0.9, clearcoatRoughness: 0.15,
  });
  root.traverse(o => {
    if (!o.isMesh || !/^shell_porthole_[LR]$/.test(o.name)) return;
    const box = new THREE.Box3().setFromObject(o);
    const c = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const radius = Math.max(size.x, size.z) / 2;
    const dir = new THREE.Vector3(0, 0, 1);
    const frame = new THREE.Mesh(new THREE.TorusGeometry(radius, radius * 0.3, 12, 28), frameMat);
    frame.position.copy(root.worldToLocal(new THREE.Vector3(c.x, c.y, box.max.z + 0.012)));
    frame.lookAt(frame.position.clone().add(dir));
    group.add(frame);
    const glass = new THREE.Mesh(new THREE.CircleGeometry(radius * 0.66, 28), glassMat);
    glass.position.copy(root.worldToLocal(new THREE.Vector3(c.x, c.y, box.max.z + 0.025)));
    glass.lookAt(glass.position.clone().add(dir));
    group.add(glass);
  });
  if (group.children.length) root.add(group);
}


// 复用三栋现有房屋，只统一尺度、朝向和门前道路；室内各自保留。
export function createHouseNeighborhood({root,scene,loader,camera,canvas,onProgress,onFailure,onPineapple,onStreet}) {
  const group=new THREE.Group();group.name='bikini-bottom-neighborhood';scene.add(group);
  const models=new Map(),boxes=new Map();let visible=true,visiting=false,frame=null;
  const nav=document.createElement('nav');nav.className='neighborhood-labels';nav.setAttribute('aria-label','比奇堡三位邻居');root.append(nav);
  const back=document.createElement('button');back.className='neighborhood-return';back.textContent='← 返回比奇堡';back.hidden=true;root.append(back);
  const note=document.createElement('p');note.className='neighborhood-hint';note.textContent='点击房子去做客 · 拖动环顾 · 滚轮或双指缩放';root.append(note);
  const visit=document.createElement('section');visit.className='neighborhood-visit';visit.hidden=true;visit.setAttribute('aria-label','邻居家中');root.append(visit);
  function closeVisit(){if(frame){frame.remove();frame=null;}visit.hidden=true;visiting=false;}
  function choose(id){
    if(root.dataset.houseState!=='ready'||!models.has(id))return;
    const spec=config.houses.find(h=>h.id===id);
    tooltipHide();nav.hidden=true;note.hidden=true;back.hidden=false;
    if(id==='pineapple'){visible=false;group.visible=false;root.dataset.neighborhood='inside';onPineapple();}
    else {visiting=true;root.dataset.neighborhood='visit';visit.hidden=false;frame=document.createElement('iframe');frame.title=spec.name;frame.src=spec.entry;visit.append(frame);back.focus({preventScroll:true});}
  }
  const buttons=new Map(config.houses.map(spec=>{
    const button=document.createElement('button');button.className='neighborhood-label';button.textContent=spec.name;button.dataset.neighbor=spec.id;button.disabled=true;button.addEventListener('click',()=>choose(spec.id));nav.append(button);return [spec.id,button];
  }));
  function tooltipHide(){const tooltip=root.querySelector('[data-house-tooltip]');if(tooltip)tooltip.hidden=true;}
  function show(){tooltipHide();closeVisit();visible=true;group.visible=true;nav.hidden=false;note.hidden=false;back.hidden=true;root.dataset.neighborhood='street';onStreet();}
  back.addEventListener('click',show);
  window.addEventListener('keydown',event=>{if(event.key==='Escape'&&visiting){event.preventDefault();show();}});
  function sandTexture(){
    const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');ctx.fillStyle='#e8dba5';ctx.fillRect(0,0,256,256);
    let seed=31;for(let i=0;i<3600;i++){seed=(seed*16807)%2147483647;const x=seed%256;seed=(seed*16807)%2147483647;const y=seed%256;ctx.fillStyle=i%3?'#c9ba862e':'#fff8d355';ctx.fillRect(x,y,1,1);}
    const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(12,12);return texture;
  }
  const sand=new THREE.Mesh(new THREE.PlaneGeometry(1000,1000),new THREE.MeshStandardMaterial({map:sandTexture(),roughness:1}));sand.rotation.x=-Math.PI/2;sand.position.y=-.025;sand.receiveShadow=true;group.add(sand);
  const roadMaterial=new THREE.MeshStandardMaterial({color:0x42636a,roughness:1});
  const road=new THREE.Mesh(new THREE.PlaneGeometry(150,4.5),roadMaterial);road.rotation.x=-Math.PI/2;road.position.set(0,-.012,9);road.receiveShadow=true;group.add(road);
  function paths(spec,box){
    const doorZ=box.max.z-.08,end=6.75;
    if(spec.id==='squidward'){
      for(let z=doorZ+.3;z<end;z+=.72){const stone=new THREE.Mesh(new THREE.BoxGeometry(1.5,.045,.4),new THREE.MeshStandardMaterial({color:0x767965,roughness:1}));stone.position.set(spec.x,0,z);stone.rotation.y=.04*Math.sin(z*5);stone.receiveShadow=true;group.add(stone);}
    } else {
      const length=Math.max(.4,end-doorZ);const path=new THREE.Mesh(new THREE.PlaneGeometry(spec.id==='patrick'?2.1:1.7,length),roadMaterial);path.rotation.x=-Math.PI/2;path.position.set(spec.x,-.005,doorZ+length/2);path.receiveShadow=true;group.add(path);
      if(spec.id==='pineapple')for(let z=doorZ+.3;z<end;z+=.65){const stone=new THREE.Mesh(new THREE.CircleGeometry(.25,7),new THREE.MeshStandardMaterial({color:0x9aa459,roughness:1}));stone.rotation.x=-Math.PI/2;stone.scale.x=1.3;stone.position.set(spec.x+.25*Math.sin(z*4),.004,z);group.add(stone);}
    }
  }
  async function load(spec){
    try{
      const model=spec.component==='patrick-exterior'?createPatrickExterior():(await loader.loadAsync(spec.url+'?v='+config.version)).scene;
      // 章鱼哥整屋包中只取闭合外壳与门；不把室内家具重复摆在街上。
      if(spec.shellOnly)model.traverse(o=>{if(o.isMesh){let ancestor=o,keep=false;while(ancestor&&ancestor!==model){if(/^(shell_|door_)/.test(ancestor.name))keep=true;ancestor=ancestor.parent;}o.visible=keep;}});
      if(spec.id==='squidward')addPortholeDetails(model);
      model.updateMatrixWorld(true);const box=new THREE.Box3();model.traverse(o=>{if(o.isMesh&&o.visible)box.union(new THREE.Box3().setFromObject(o));});
      const size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3()),scale=spec.height/size.y;
      model.scale.set(scale*(spec.widthScale||1),scale,scale);model.position.set(spec.x-center.x*scale*(spec.widthScale||1),-box.min.y*scale,spec.z-center.z*scale);model.userData.neighbor=spec.id;
      model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});group.add(model);model.updateMatrixWorld(true);
      const placed=new THREE.Box3();model.traverse(o=>{if(o.isMesh&&o.visible)placed.union(new THREE.Box3().setFromObject(o));});boxes.set(spec.id,placed);models.set(spec.id,model);paths(spec,placed);buttons.get(spec.id).disabled=false;
      root.dataset.neighborhoodBounds=JSON.stringify(config.houses.filter(h=>boxes.has(h.id)).map(h=>({id:h.id,min:boxes.get(h.id).min.toArray(),max:boxes.get(h.id).max.toArray()})));onProgress(spec.id);return true;
    }catch(error){onFailure({id:'neighbor-'+spec.id,name:spec.name,url:spec.url||'scripts/patrick-exterior.js',kind:'neighbor',neighbor:spec.id});return false;}
  }
  function pose(){
    const fov=THREE.MathUtils.degToRad(camera.fov),distance=Math.max(14,33/camera.aspect)/(2*Math.tan(fov/2))*1.12;
    return {target:new THREE.Vector3(.5,4.3,0),position:new THREE.Vector3(.5,4.3+distance*.10,distance)};
  }
  function pick(raycaster){
    const hits=raycaster.intersectObjects([...models.values()],true).filter(hit=>{let o=hit.object;while(o){if(!o.visible)return false;o=o.parent;}return true;});
    if(!hits.length)return null;let node=hits[0].object;while(node&&!node.userData.neighbor)node=node.parent;return node?.userData.neighbor||null;
  }
  function update(width,height){
    if(!visible||visiting)return;
    for(const spec of config.houses){const box=boxes.get(spec.id);if(!box)continue;const p=new THREE.Vector3(spec.x,-.45,box.max.z).project(camera),button=buttons.get(spec.id);button.style.left=`${(p.x*.5+.5)*width}px`;button.style.top=`${(-p.y*.5+.5)*height}px`;}
  }
  root.dataset.neighborhood='street';
  return {group,pose,pick,choose,show,update,loadAll:()=>Promise.all(config.houses.map(load)),retry:id=>load(config.houses.find(h=>h.id===id)),get loadedCount(){return models.size;},get visible(){return visible;},get visiting(){return visiting;}};
}
