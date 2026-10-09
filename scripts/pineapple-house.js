import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import config from "../src/data/pineapple-house.json";

const root = document.querySelector(".house");
const canvas = document.querySelector("[data-house-canvas]");
const loading = document.querySelector("[data-house-loading]");
const errorPanel = document.querySelector("[data-house-error]");
const progress = document.querySelector("[data-house-progress]");
const loadText = document.querySelector("[data-house-load-text]");
const loadCount = document.querySelector("[data-house-load-count]");
const caption = document.querySelector("[data-house-caption]");
const labelsHost = document.querySelector("[data-house-labels]");
const tooltip = document.querySelector("[data-house-tooltip]");
const rooms = new Map(config.rooms.map((room) => [room.id, room]));
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const structureOnly = new URLSearchParams(location.search).has("structure");
const specs = [config.structure, ...(structureOnly ? [] : config.assets)];
const loaded = new Map();
const failures = new Map();
let renderer;

function showFailure(message) {
  root.dataset.houseState = "error";
  loading.hidden = true;
  errorPanel.hidden = false;
  errorPanel.querySelector("h2").textContent = failures.size ? "部分模型未能载入" : "无法显示三维房屋";
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
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.14;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, innerWidth / innerHeight, 0.1, 120);
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
  const loader = new GLTFLoader();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const roomButtons = new Map();
  let activeRoom = null;
  let animation = null;
  let pointerDown = null;
  let rotating = false;
  let ready = false;
  let contextLost = false;
  let frames = 0;
  let lastFrameTime = performance.now();
  let measuredFps = 0;

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
    for(const group of loaded.values()) {
      group.traverse((node) => {
        const d=node.userData;
        if(!node.isMesh) return;
        if(!activeRoom) { node.visible=true;return; }
        const room=rooms.get(activeRoom);
        const roof = activeRoom === "roof";
        let visible = true;
        if (group.userData.assetId && group.userData.assetId !== "structure") {
          visible = group.userData.roomId === activeRoom;
        } else if (activeRoom === "library") {
          visible = d.roomId === "library";
        } else if (activeRoom === "stairs") {
          visible = d.roomId === "stairs" || d.roomId === "ground";
        } else if(roof) {
          visible = d.roomId === "roof";
        } else {
          visible = d.level === room.level && d.roomId !== "library";
          if(d.occluder && d.roomId !== activeRoom) visible=false;
          if(d.roomId === "stairs") visible=false;
          if(node.name.startsWith("cut_arch")) visible=false;
          if(activeRoom === "storage" && d.roomId === "living") visible=Boolean(d.occluder) || node.name === "living_L0_sand";
          if(activeRoom === "living" && d.roomId === "storage") visible=false;
        }
        node.visible=visible;
      });
    }
  }

  function focusRoom(id) {
    const room=rooms.get(id);
    if(!room || !ready || contextLost) return false;
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
    window.dispatchEvent(new CustomEvent("house:room-changed",{detail:{id}}));
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
  document.querySelector("[data-house-back]").addEventListener("click",() => {
    const previous=activeRoom;resetView();roomButtons.get(previous)?.focus({preventScroll:true});
  });
  window.addEventListener("keydown",(event) => {
    if(event.key==="Escape" && activeRoom) { const previous=activeRoom;resetView();roomButtons.get(previous)?.focus({preventScroll:true}); }
  });
  controls.addEventListener("start",() => { animation=null;root.dataset.cameraTransition="idle";rotating=true;tooltip.hidden=true; });
  controls.addEventListener("end",() => { rotating=false; });
  controls.addEventListener("change",() => {
    canvas.dataset.camera=JSON.stringify(camera.position.toArray().map(n=>Number(n.toFixed(3))));
    canvas.dataset.target=JSON.stringify(controls.target.toArray().map(n=>Number(n.toFixed(3))));
  });

  function pick(clientX,clientY) {
    pointer.set(clientX/innerWidth*2-1,-clientY/innerHeight*2+1);
    raycaster.setFromCamera(pointer,camera);
    const meshes=[];
    houseGroup.traverse((node) => {if(node.isMesh && node.visible) meshes.push(node);});
    const hits=raycaster.intersectObjects(meshes,false);
    for(const hit of hits) {
      let node=hit.object;
      while(node && !node.userData.roomId) node=node.parent;
      const id=node?.userData.roomId;
      if(rooms.has(id)) return id;
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
    if(!start || start.id!==event.pointerId || Math.hypot(event.clientX-start.x,event.clientY-start.y)>7 || performance.now()-start.time>650 || activeRoom || !ready) return;
    const id=pick(event.clientX,event.clientY);
    if(id) focusRoom(id);
  });
  canvas.addEventListener("pointermove",event => {
    if(event.pointerType!=="mouse" || rotating || activeRoom || !ready) {tooltip.hidden=true;return;}
    const id=pick(event.clientX,event.clientY);
    canvas.style.cursor=id?"pointer":"grab";
    tooltip.hidden=!id;
    if(id) {
      tooltip.textContent=rooms.get(id).name;
      tooltip.style.left=`${Math.min(event.clientX+14,innerWidth-120)}px`;
      tooltip.style.top=`${Math.min(event.clientY+14,innerHeight-40)}px`;
    }
  });
  canvas.addEventListener("pointerleave",() => {tooltip.hidden=true;});

  function updateLoading() {
    root.dataset.loadedModels=String(loaded.size);
    root.dataset.failedModels=String(failures.size);
    progress.value=loaded.size/specs.length*100;
    loadCount.textContent=`${loaded.size} / ${specs.length} 个模型`;
    if(failures.size) {
      ready=false;
      showFailure("已载入的模型保留在场景中。请重试以下资源，全部载入后即可进入房间。");
    } else if(loaded.size===specs.length) {
      ready=true;
      root.dataset.houseState="ready";
      loading.hidden=true;
      errorPanel.hidden=true;
      window.dispatchEvent(new CustomEvent("house:ready"));
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
            for(const key of ["roomId","level","occluder"]) {
              if(node.userData[key]===undefined && parent.userData[key]!==undefined) node.userData[key]=parent.userData[key];
            }
            if(parent===model) break;
            parent=parent.parent;
          }
          node.castShadow=true;
          node.receiveShadow=true;
          if(spec.room) node.userData.roomId=spec.room;
          const materials=Array.isArray(node.material)?node.material:[node.material];
          materials.forEach(material => {
            material.roughness=Math.max(material.roughness??0.8,0.7);
            material.metalness=Math.min(material.metalness??0,0.08);
            if(material.name === "window_glass") {material.emissive=new THREE.Color(0x2c5f74);material.emissiveIntensity=.16;}
          });
        });
        houseGroup.add(model);
        loaded.set(spec.id,model);
        failures.delete(spec.id);
        loadText.textContent=`已载入${spec.name}`;
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
    await Promise.all(failed.map(loadAsset));
    updateLoading();
  });
  canvas.addEventListener("webglcontextlost",event => {
    event.preventDefault();contextLost=true;ready=false;
    showFailure("图形上下文已丢失，请重新载入预览。");
  });
  window.addEventListener("resize",() => {
    camera.aspect=innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
    renderer.setSize(innerWidth,innerHeight,false);
    if(!activeRoom) resetView();
    else if(ready) focusRoom(activeRoom);
  });

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
      if(t===1) {animation=null;controls.enabled=true;root.dataset.cameraTransition="idle";}
    }
    controls.update();
    camera.updateMatrixWorld();
    if(!activeRoom) {
      for(const room of config.rooms) {
        const point=new THREE.Vector3(...room.label).project(camera);
        const button=roomButtons.get(room.id);
        button.hidden=point.z>1 || Math.abs(point.x)>1 || Math.abs(point.y)>1;
        button.style.left=`${(point.x*.5+.5)*innerWidth}px`;
        button.style.top=`${(-point.y*.5+.5)*innerHeight}px`;
      }
    }
    renderer.render(scene,camera);
    frames++;
    if(now-lastFrameTime>2000) {measuredFps=frames*1000/(now-lastFrameTime);canvas.dataset.fps=measuredFps.toFixed(1);canvas.dataset.triangles=String(renderer.info.render.triangles);canvas.dataset.drawCalls=String(renderer.info.render.calls);frames=0;lastFrameTime=now;}
  }
  requestAnimationFrame(frame);
  // 验收接口只报告真实载入状态，不将候选标为 approved。
  window.__pineappleHouse={focusRoom,resetView,scene,camera,controls,config,
    snapshot:() => ({state:root.dataset.houseState,view:activeRoom??"whole",loaded:[...loaded.keys()],failed:[...failures.keys()],fps:Number(measuredFps.toFixed(1)),renderer:renderer.info.render,camera:camera.position.toArray(),target:controls.target.toArray(),status:"review",structureOnly}),
    projectRoom:id => {
      const room=rooms.get(id);if(!room) return null;
      const point=new THREE.Vector3(...room.label).project(camera);
      return {x:(point.x*.5+.5)*innerWidth,y:(-.5*point.y+.5)*innerHeight};
    }
  };
  Promise.all(specs.map(loadAsset)).then(updateLoading);
}
