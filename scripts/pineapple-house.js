import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createSkillsBook } from "./house-skills-book.js";
import { createHousePet } from "./house-pet.js";
import { addSiameseFur } from "./house-pet-fur.js";
import config from "../src/data/pineapple-house.json";
import awards from "../src/data/house-awards.json";
import './house-music.js';

const root = document.querySelector(".house");
const canvas = document.querySelector("[data-house-canvas]");
const loading = document.querySelector("[data-house-loading]");
const errorPanel = document.querySelector("[data-house-error]");
const progress = document.querySelector("[data-house-progress]");
const caption = document.querySelector("[data-house-caption]");
const labelsHost = document.querySelector("[data-house-labels]");
const objectsHost = document.querySelector("[data-house-objects]");
const tooltip = document.querySelector("[data-house-tooltip]");
const rooms = new Map(config.rooms.map((room) => [room.id, room]));
const interactions = new Map(config.interactions.map(item=>[item.id,item]));
function activateObject(id) {
  const item=interactions.get(id);if(!item)return;
  window.dispatchEvent(new CustomEvent(item.action==='music'?'house:music':'house:content',{detail:{id,section:item.section}}));
}
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const structureOnly = new URLSearchParams(location.search).has("structure");
// 截图专用脱敏视图：证书保持展示位置，照片换成不含个人信息的封面。
const privatePreview = new URLSearchParams(location.search).has("privacy");
if(privatePreview)document.body.classList.add('privacy-preview');
const specs = [config.structure, ...(structureOnly ? [] : config.assets)];
const textureSpecs = structureOnly ? [] : awards.map(a=>({id:`award-${a.id}`,name:a.title,url:a.thumbnail,kind:'texture',award:a}));
const resourceCount=specs.length+textureSpecs.length;
const textureLoaded=new Set();
const loaded = new Map();
const failures = new Map();
let renderer;

function showFailure(message) {
  root.dataset.houseState = "error";
  loading.hidden = true;
  errorPanel.hidden = false;
  errorPanel.querySelector("h2").textContent = failures.size ? "部分资源未能载入" : "无法显示三维房屋";
  document.querySelector("[data-house-error-message]").textContent = message;
  const list = document.querySelector("[data-house-error-list]");
  list.replaceChildren();
  for (const [id, entry] of failures) {
    const li = document.createElement("li");
    li.textContent = `${entry.name}：${entry.url}`;
    li.dataset.assetId = id;
    list.append(li);
  }
}

try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
} catch {
  showFailure("浏览器未能启用 WebGL。请检查浏览器的硬件加速设置后重试。");
  document.querySelector("[data-house-retry]").addEventListener("click", () => location.reload());
}

if (renderer) {
  let viewWidth=Math.max(1,root.clientWidth),viewHeight=Math.max(1,root.clientHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.setSize(viewWidth, viewHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.14;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, viewWidth / viewHeight, 0.1, 120);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 3.5;
  controls.maxDistance = 60;
  controls.minPolarAngle = Math.PI * 0.26;
  controls.maxPolarAngle = Math.PI * 0.56;
  controls.minAzimuthAngle = -Math.PI * 0.30;
  controls.maxAzimuthAngle = Math.PI * 0.30;
  scene.add(new THREE.HemisphereLight(0xf8f5df, 0x7693a1, 2.15));
  const key = new THREE.DirectionalLight(0xfff2d2, 2.6);
  key.position.set(-8, 17, 13);
  key.castShadow = true;
  key.shadow.mapSize.set(2048,2048);
  Object.assign(key.shadow.camera, { left:-8, right:8, top:15, bottom:-6, near:1, far:42 });
  key.shadow.bias = -0.0005;
  key.shadow.normalBias = 0.025;
  key.target.position.set(0,5,0);
  scene.add(key,key.target);
  const fill = new THREE.DirectionalLight(0xd1edff,0.8);
  fill.position.set(7,8,8);
  scene.add(fill);
  const houseGroup = new THREE.Group();
  scene.add(houseGroup);
  const displays=new THREE.Group();
  houseGroup.add(displays);
  const awardMaterials=new Map();
  const loader = new GLTFLoader();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const roomButtons = new Map();
  const objectButtons = new Map();
  let activeRoom = null;
  let animation = null;
  let pointerDown = null;
  let rotating = false;
  let ready = false;
  let contextLost = false;
  let frames = 0;
  let lastFrameTime = performance.now();
  let measuredFps = 0;
  let pet = null;
  let lastPetFrame = null;

  // 实物证书作为墙面展示件；使用用户照片，不生成或改写证书内容。
  function displayPlane(name,width,height,material,position,normal,metadata) {
    const group=new THREE.Group();group.name=name;Object.assign(group.userData,metadata);
    group.position.fromArray(position);
    group.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),normal.clone().normalize());
    const book=metadata.book;
    const frame=new THREE.Mesh(new THREE.BoxGeometry(width+.045,height+.045,.045),new THREE.MeshStandardMaterial({color:book?0xf3e7c9:0x927146,roughness:.88}));
    frame.receiveShadow=true;group.add(frame);
    const paper=new THREE.Mesh(new THREE.PlaneGeometry(book?width+.055:width,book?height+.055:height),material);paper.position.z=.024;group.add(paper);
    if(book) {
      const back=paper.clone();back.position.z=-.024;back.rotation.y=Math.PI;group.add(back);
      const spine=frame.clone();spine.scale.set(.06,1.02,1.16);spine.position.x=-width/2;spine.material=new THREE.MeshStandardMaterial({color:0x416c79,roughness:.95});group.add(spine);
      for(let i=0;i<3;i++){
        const points=[new THREE.Vector3(-width/2, -height/2-.023,-.013+i*.011),new THREE.Vector3(width/2+.022,-height/2-.023,-.013+i*.011)];
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0xcbbb9c})));
      }
    }
    displays.add(group);return group;
  }
  if(!structureOnly) {
    awards.forEach((a,i)=>{
      const material=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.96});
      awardMaterials.set(a.id,material);
      const d=config.displays.find(d=>d.kind==='award' && d.id===a.id);
      displayPlane(`certificate-${a.id}`,...d.size,material,d.position,new THREE.Vector3(...d.normal),{roomId:d.room,awardId:a.id});
    });
    for(const d of config.displays.filter(d=>d.kind==='content')) {
      if(d.id==='skills-book') {displays.add(createSkillsBook(d));continue;}
      let material;
      if(d.sourceAward) material=awardMaterials.get(d.sourceAward);
      else {
        // 这些是个人记录展示件，复用证书框；不替换任何 Hunyuan 家具。
        const paper=document.createElement('canvas');paper.width=768;paper.height=512;
        const ctx=paper.getContext('2d');const chart=d.id==='skills-chart';
        ctx.fillStyle=chart?'#e5efe1':'#447a81';ctx.fillRect(0,0,768,512);
        ctx.strokeStyle=chart?'#bca172':'#d4b86b';ctx.lineWidth=14;ctx.strokeRect(22,22,724,468);
        ctx.fillStyle=chart?'#335d62':'#fff0be';ctx.textAlign='center';ctx.font='bold 68px sans-serif';
        ctx.fillText(chart?'技术航海图':'实习日记',384,126);
        if(chart) {
          for(const [i,text] of ['AI / Agent','全栈开发','工程交付'].entries()) {
            const x=154+i*230;ctx.strokeStyle='#6e9990';ctx.lineWidth=5;ctx.beginPath();ctx.arc(x,284,66,0,Math.PI*2);ctx.stroke();
            ctx.font='25px sans-serif';ctx.fillText(text,x,294);if(i<2){ctx.font='35px sans-serif';ctx.fillText('→',x+114,294);}
          }
          ctx.font='27px sans-serif';ctx.fillText('把技术带进真实业务',384,416);
        } else {ctx.font='40px sans-serif';ctx.fillText('字节跳动',384,244);ctx.font='30px sans-serif';ctx.fillText('AI 直播 · Agent 工程',384,330);ctx.font='26px sans-serif';ctx.fillText('2026.06 — 2026.09',384,413);}
        const texture=new THREE.CanvasTexture(paper);texture.colorSpace=THREE.SRGBColorSpace;
        material=new THREE.MeshStandardMaterial({map:texture,roughness:.96});
      }
      displayPlane(`content-${d.id}`,...d.size,material,d.position,new THREE.Vector3(...d.normal),{roomId:d.room,contentId:d.id,book:d.style==='book'});
    }
    root.dataset.awardDisplays=String(awards.length);root.dataset.projectDisplays='0';
  }

  function loadTexture(spec) {
    return new Promise(resolve=>{
      if(privatePreview){
        const cover=document.createElement('canvas');cover.width=512;cover.height=360;
        const ctx=cover.getContext('2d');ctx.fillStyle='#f8f0d9';ctx.fillRect(0,0,512,360);
        ctx.strokeStyle='#ad894c';ctx.lineWidth=12;ctx.strokeRect(18,18,476,324);
        ctx.fillStyle='#53665d';ctx.textAlign='center';ctx.font='bold 48px sans-serif';ctx.fillText('荣誉证书',256,162);
        ctx.font='28px sans-serif';ctx.fillText('个人信息已隐藏',256,226);
        const texture=new THREE.CanvasTexture(cover);texture.colorSpace=THREE.SRGBColorSpace;
        const material=awardMaterials.get(spec.award.id);material.map=texture;material.needsUpdate=true;
        textureLoaded.add(spec.id);updateLoading();resolve(true);return;
      }
      new THREE.TextureLoader().load(spec.url,texture=>{
        texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
        const material=awardMaterials.get(spec.award.id);material.map=texture;material.needsUpdate=true;
        textureLoaded.add(spec.id);failures.delete(spec.id);updateLoading();resolve(true);
      },undefined,()=>{failures.set(spec.id,spec);updateLoading();resolve(false);});
    });
  }

  // 背景海花轮廓为独立三维线条，不使用参考图贴屏。
  for (const [x,y,r,color] of [[-9,8,1.5,0x8cc3ce],[8,11,2,0x98c7cc],[-7,1,1.0,0xa3ccd0],[8,3,1.2,0x9bc3ce]]) {
    const pts=[];
    for(let i=0;i<=160;i++) {
      const a=i*Math.PI*2/160, rr=r*(0.73+0.27*Math.cos(a*5));
      pts.push(new THREE.Vector3(x+Math.cos(a)*rr,y+Math.sin(a)*rr,-6));
    }
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color,transparent:true,opacity:0.38})));
  }

  function wholePose() {
    const height = 15.8;
    const width = 11.8;
    const fov = THREE.MathUtils.degToRad(camera.fov);
    const distance = Math.max(height / (2*Math.tan(fov/2)),width / (2*Math.tan(fov/2)*camera.aspect)) * 1.07;
    return {target:new THREE.Vector3(0,5.8,0),position:new THREE.Vector3(distance*.055,5.8+distance*.105,distance)};
  }

  function tweenCamera(position,target) {
    root.dataset.cameraTransition = "moving";
    controls.enabled = false;
    animation = {start:performance.now(),fromPosition:camera.position.clone(),fromTarget:controls.target.clone(),position,target,duration:reducedMotion?0:650};
  }

  function applyVisibility() {
    displays.children.forEach(group=>{group.visible=!activeRoom || group.userData.roomId===activeRoom;});
    objectsHost.hidden=!activeRoom;
    for(const group of loaded.values()) {
      group.traverse((node) => {
        const d=node.userData;
        if(!node.isMesh) return;
        if(!activeRoom) { node.visible=!d.roomViewOnly;return; }
        const room=rooms.get(activeRoom);
        const roof = activeRoom === "roof";
        let visible = true;
        if (group.userData.assetId && group.userData.assetId !== "structure") {
          visible = group.userData.roomId === activeRoom;
        } else if (activeRoom === "library") {
          visible = d.roomId === "library";
        } else if(roof) {
          visible = d.roomId === "roof" || (d.roomId === "stairs" && d.level === 3);
        } else {
          visible = d.level === room.level && d.roomId !== "library";
          if(d.occluder && d.roomId !== activeRoom) visible=false;
          if(d.roomId === "stairs") visible=activeRoom === "bedroom" && d.level === 2;
          if(node.name.startsWith("cut_arch")) visible=false;
          if(activeRoom === "storage" && d.roomId === "living") visible=Boolean(d.occluder) || node.name === "living_L0_sand";
          if(activeRoom === "living" && d.roomId === "storage") visible=false;
        }
        node.visible=d.roomViewOnly?d.roomViewOnly===activeRoom:visible;
      });
    }
  }

  function focusRoom(id) {
    const room=rooms.get(id);
    if(!room || !ready || contextLost) return false;
    const changed=activeRoom!==id;
    activeRoom=id;
    root.dataset.houseView="room";
    caption.hidden=false;
    labelsHost.hidden=true;
    tooltip.hidden=true;
    document.querySelector("[data-house-floor]").textContent=room.floor;
    document.querySelector("[data-house-room-name]").textContent=room.name;
    applyVisibility();
    const target=new THREE.Vector3(...room.target);
    const position=new THREE.Vector3(...room.camera);
    const width=room.bounds[1][0]-room.bounds[0][0];
    const height=room.bounds[1][1]-room.bounds[0][1];
    const tangent=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
    const fit=Math.max(width/(2*tangent*camera.aspect),height/(2*tangent))*1.08;
    const offset=position.clone().sub(target);
    offset.multiplyScalar(Math.max(1,fit/offset.length()));
    position.copy(target).add(offset);
    tweenCamera(position,target);
    if(changed) window.dispatchEvent(new CustomEvent("house:room-changed",{detail:{id}}));
    return true;
  }

  function resetView() {
    activeRoom=null;
    root.dataset.houseView="whole";
    caption.hidden=true;
    labelsHost.hidden=false;
    tooltip.hidden=true;
    applyVisibility();
    const pose=wholePose();
    tweenCamera(pose.position,pose.target);
    window.dispatchEvent(new CustomEvent("house:room-changed",{detail:{id:null}}));
  }

  for(const room of config.rooms) {
    const button=document.createElement("button");
    button.type="button";
    button.className="room-label";
    button.textContent=room.name;
    button.dataset.houseRoom=room.id;
    button.setAttribute("aria-label",`${room.floor} ${room.name}，进入近景`);
    button.addEventListener("click",() => {if(focusRoom(room.id)) document.querySelector("[data-house-back]").focus({preventScroll:true});});
    labelsHost.append(button);
    roomButtons.set(room.id,button);
  }
  for(const item of config.interactions) {
    const button=document.createElement('button');button.type='button';button.className='room-label object-label';
    button.textContent=item.button;button.dataset.houseObject=item.id;button.setAttribute('aria-label',`点击${item.label}`);
    button.addEventListener('click',()=>{if(ready && activeRoom===item.room)activateObject(item.id);});
    objectsHost.append(button);objectButtons.set(item.id,button);
  }
  document.querySelector("[data-house-back]").addEventListener("click",() => {
    const previous=activeRoom;resetView();roomButtons.get(previous)?.focus({preventScroll:true});
  });
  window.addEventListener("keydown",(event) => {
    if(event.key==="Escape" && !event.defaultPrevented && !document.querySelector('dialog[open]') && activeRoom) { const previous=activeRoom;resetView();roomButtons.get(previous)?.focus({preventScroll:true}); }
  });
  controls.addEventListener("start",() => { animation=null;root.dataset.cameraTransition="idle";rotating=true;tooltip.hidden=true; });
  controls.addEventListener("end",() => { rotating=false; });
  controls.addEventListener("change",() => {
    canvas.dataset.camera=JSON.stringify(camera.position.toArray().map(n=>Number(n.toFixed(3))));
    canvas.dataset.target=JSON.stringify(controls.target.toArray().map(n=>Number(n.toFixed(3))));
  });

  function pick(clientX,clientY) {
    const rect=canvas.getBoundingClientRect();
    pointer.set((clientX-rect.left)/rect.width*2-1,-(clientY-rect.top)/rect.height*2+1);
    raycaster.setFromCamera(pointer,camera);
    const meshes=[];
    houseGroup.traverse((node) => {if(!node.isMesh)return;let parent=node;while(parent){if(!parent.visible)return;parent=parent.parent;}meshes.push(node);});
    const hits=raycaster.intersectObjects(meshes,false);
    for(const hit of hits) {
      let node=hit.object;
      while(node && !node.userData.roomId && !node.userData.awardId && !node.userData.contentId) node=node.parent;
      if(node?.userData.petId) return {petId:node.userData.petId,roomId:node.userData.roomId};
      if(node?.userData.contentId && (!node.userData.contentBounds || node.userData.contentBounds.containsPoint(node.worldToLocal(hit.point.clone())))) return {contentId:node.userData.contentId,roomId:node.userData.roomId};
      if(node?.userData.awardId) return {awardId:node.userData.awardId,roomId:'storage'};
      const id=node?.userData.roomId;
      if(rooms.has(id)) return {roomId:id};
    }
    return null;
  }
  canvas.addEventListener("pointerdown",event => {
    if(!event.isPrimary) {pointerDown=null;return;}
    pointerDown={x:event.clientX,y:event.clientY,time:performance.now(),id:event.pointerId};
  });
  canvas.addEventListener("pointercancel",() => {pointerDown=null;});
  canvas.addEventListener("pointerup",event => {
    const start=pointerDown;pointerDown=null;
    if(!start || start.id!==event.pointerId || Math.hypot(event.clientX-start.x,event.clientY-start.y)>7 || performance.now()-start.time>650 || !ready) return;
    const hit=pick(event.clientX,event.clientY);
    if(!activeRoom){if(hit){focusRoom(hit.roomId);if(hit.petId)pet?.react();}return;}
    if(!hit || hit.roomId!==activeRoom)return;
    if(hit.petId)pet?.react();
    else if(hit.contentId)activateObject(hit.contentId);
    else if(hit?.awardId)window.dispatchEvent(new CustomEvent('house:award',{detail:{id:hit.awardId}}));
  });
  canvas.addEventListener("pointermove",event => {
    if(event.pointerType!=="mouse" || rotating || !ready) {tooltip.hidden=true;return;}
    const hit=pick(event.clientX,event.clientY);
    const interactive=hit && (!activeRoom || hit.roomId===activeRoom && (hit.petId || hit.awardId || hit.contentId));
    canvas.style.cursor=interactive?"pointer":"grab";
    tooltip.hidden=!interactive;
    if(interactive) {
      tooltip.textContent=!activeRoom?rooms.get(hit.roomId).name:hit.petId?'暹罗猫 · 打个招呼':hit.contentId?interactions.get(hit.contentId).label:awards.find(a=>a.id===hit.awardId).title;
      const rect=canvas.getBoundingClientRect();
      tooltip.style.left=`${Math.min(event.clientX-rect.left+14,viewWidth-120)}px`;
      tooltip.style.top=`${Math.min(event.clientY-rect.top+14,viewHeight-40)}px`;
    }
  });
  canvas.addEventListener("pointerleave",() => {tooltip.hidden=true;});

  function updateLoading() {
    root.dataset.loadedModels=String(loaded.size);
    root.dataset.loadedTextures=String(textureLoaded.size);
    root.dataset.failedModels=String([...failures.values()].filter(s=>s.kind!=='texture').length);
    root.dataset.failedTextures=String([...failures.values()].filter(s=>s.kind==='texture').length);
    root.dataset.failedResources=String(failures.size);
    progress.value=(loaded.size+textureLoaded.size)/resourceCount*100;
    if(failures.size) {
      ready=false;
      showFailure("履历可以继续阅读。请重试以下资源，全部载入后即可进入房间。");
    } else if(loaded.size+textureLoaded.size===resourceCount) {
      const newlyReady=!ready;
      ready=true;
      root.dataset.houseState="ready";
      loading.hidden=true;
      errorPanel.hidden=true;
      if(newlyReady)window.dispatchEvent(new CustomEvent("house:ready"));
    }
  }

  function loadAsset(spec) {
    return new Promise(resolve => {
      loader.load(`${spec.url}?v=${config.version}`,gltf => {
        const model=gltf.scene;
        model.userData.assetId=spec.id;
        if(spec.room) {
          model.userData.roomId=spec.room;
          model.position.fromArray(spec.position);
          model.rotation.y=spec.rotation;
        }
        model.traverse(node => {
          if(!node.isMesh) return;
          // 多材质 GLB 壳体会变为 Group，extras 位于父节点，需继承到实际网格。
          let parent=node.parent;
          while(parent && parent!==model.parent) {
            for(const key of ["roomId","level","occluder","roomViewOnly"]) {
              if(node.userData[key]===undefined && parent.userData[key]!==undefined) node.userData[key]=parent.userData[key];
            }
            if(parent===model) break;
            parent=parent.parent;
          }
          node.castShadow=true;
          node.receiveShadow=true;
          if(spec.room) node.userData.roomId=spec.room;
          const interaction=config.interactions.find(item=>item.asset===spec.id);
          if(interaction){
            node.userData.contentId=interaction.id;
            if(interaction.localBounds)node.userData.contentBounds=new THREE.Box3(new THREE.Vector3(...interaction.localBounds[0]),new THREE.Vector3(...interaction.localBounds[1]));
          }
          const materials=Array.isArray(node.material)?node.material:[node.material];
          materials.forEach(material => {
            material.roughness=Math.max(material.roughness??0.8,0.7);
            material.metalness=Math.min(material.metalness??0,0.08);
            if(material.name === "window_glass") {material.emissive=new THREE.Color(0x2c5f74);material.emissiveIntensity=.16;}
          });
        });
        houseGroup.add(model);
        if(spec.pet){if(spec.pet.fur)addSiameseFur(model);pet=createHousePet(model,spec,{root,canvas,camera,reducedMotion});}
        loaded.set(spec.id,model);
        failures.delete(spec.id);
        applyVisibility();
        updateLoading();
        resolve(true);
      },undefined,() => {
        failures.set(spec.id,spec);
        updateLoading();
        resolve(false);
      });
    });
  }

  document.querySelector("[data-house-retry]").addEventListener("click",async () => {
    if(contextLost) {location.reload();return;}
    errorPanel.hidden=true;
    loading.hidden=false;
    root.dataset.houseState="loading";
    const failed=[...failures.values()];
    failures.clear();
    await Promise.all(failed.map(spec=>spec.kind==='texture'?loadTexture(spec):loadAsset(spec)));
    updateLoading();
  });
  canvas.addEventListener("webglcontextlost",event => {
    event.preventDefault();contextLost=true;ready=false;
    showFailure("图形上下文已丢失，请重新载入预览。");
  });
  new ResizeObserver(() => {
    viewWidth=Math.max(1,root.clientWidth);viewHeight=Math.max(1,root.clientHeight);
    camera.aspect=viewWidth/viewHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
    renderer.setSize(viewWidth,viewHeight,false);
    if(!activeRoom) {const pose=wholePose();tweenCamera(pose.position,pose.target);}
    else if(ready) focusRoom(activeRoom);
  }).observe(root);

  const pose=wholePose();
  camera.position.copy(pose.position);
  controls.target.copy(pose.target);
  controls.update();
  root.dataset.houseView="whole";
  root.dataset.cameraTransition="idle";
  if(structureOnly) {
    document.querySelector(".review-note").textContent="结构审查 · 家具尚未载入";
  }

  function frame(now) {
    requestAnimationFrame(frame);
    if(contextLost) return;
    if(animation) {
      const t=animation.duration?Math.min((now-animation.start)/animation.duration,1):1;
      const eased=t*t*(3-2*t);
      camera.position.lerpVectors(animation.fromPosition,animation.position,eased);
      controls.target.lerpVectors(animation.fromTarget,animation.target,eased);
      if(t===1) {animation=null;controls.enabled=true;root.dataset.cameraTransition="idle";window.dispatchEvent(new CustomEvent('house:camera-settled',{detail:{id:activeRoom}}));}
    }
    controls.update();
    camera.updateMatrixWorld();
    const petDt=lastPetFrame===null?0:Math.min((now-lastPetFrame)/1000,.06);
    lastPetFrame=now;
    pet?.update(petDt,ready && !document.hidden && (!activeRoom || activeRoom==='living') && !document.querySelector('dialog[open]'));
    if(!activeRoom) {
      for(const room of config.rooms) {
        const point=new THREE.Vector3(...room.label).project(camera);
        const button=roomButtons.get(room.id);
        button.hidden=point.z>1 || Math.abs(point.x)>1 || Math.abs(point.y)>1;
        button.style.left=`${(point.x*.5+.5)*viewWidth}px`;
        button.style.top=`${(-point.y*.5+.5)*viewHeight}px`;
      }
    }
    for(const item of config.interactions) {
      const button=objectButtons.get(item.id);const point=new THREE.Vector3(...item.anchor).project(camera);
      button.hidden=!ready || activeRoom!==item.room || point.z>1 || Math.abs(point.x)>1 || Math.abs(point.y)>1;
      button.style.left=`${(point.x*.5+.5)*viewWidth}px`;button.style.top=`${(-point.y*.5+.5)*viewHeight}px`;
    }
    renderer.render(scene,camera);
    frames++;
    if(now-lastFrameTime>2000) {measuredFps=frames*1000/(now-lastFrameTime);canvas.dataset.fps=measuredFps.toFixed(1);canvas.dataset.triangles=String(renderer.info.render.triangles);canvas.dataset.drawCalls=String(renderer.info.render.calls);frames=0;lastFrameTime=now;}
  }
  requestAnimationFrame(frame);
  // 验收接口只报告真实载入状态，不将候选标为 approved。
  window.__pineappleHouse={focusRoom,resetView,scene,camera,controls,config,
    snapshot:() => ({state:root.dataset.houseState,view:activeRoom??"whole",loaded:[...loaded.keys()],failed:[...failures.keys()],fps:Number(measuredFps.toFixed(1)),renderer:renderer.info.render,camera:camera.position.toArray(),target:controls.target.toArray(),pet:pet?.snapshot()??null,status:"review",structureOnly}),
    projectRoom:id => {
      const room=rooms.get(id);if(!room) return null;
      const point=new THREE.Vector3(...room.label).project(camera);
      const rect=canvas.getBoundingClientRect();
      return {x:rect.left+(point.x*.5+.5)*viewWidth,y:rect.top+(-.5*point.y+.5)*viewHeight};
    }
  };
  Promise.all([...specs.map(loadAsset),...textureSpecs.map(loadTexture)]).then(updateLoading);
}
