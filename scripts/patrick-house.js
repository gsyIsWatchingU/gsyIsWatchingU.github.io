import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import config from "../src/data/patrick-house.json";

const root = document.querySelector(".house");
const canvas = document.querySelector("[data-house-canvas]");
const loading = document.querySelector("[data-house-loading]");
const errorPanel = document.querySelector("[data-house-error]");
const caption = document.querySelector("[data-house-caption]");
const labelsHost = document.querySelector("[data-house-labels]");
const tooltip = document.querySelector("[data-house-tooltip]");
const toggleBtn = document.querySelector("[data-house-mode]");
const rooms = new Map(config.rooms.map((room) => [room.id, room]));
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
} catch {
  root.dataset.houseState = "error";
  loading.hidden = true;
  errorPanel.hidden = false;
}

if (renderer) {
  let viewWidth = Math.max(1, root.clientWidth);
  let viewHeight = Math.max(1, root.clientHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.setSize(viewWidth, viewHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, viewWidth / viewHeight, 0.1, 120);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 3.5;
  controls.maxDistance = 30;
  controls.maxPolarAngle = Math.PI * 0.55;

  scene.add(new THREE.HemisphereLight(0xf8f5df, 0x7693a1, 2.0));
  const key = new THREE.DirectionalLight(0xfff2d2, 2.6);
  key.position.set(-6, 12, 9);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -8, right: 8, top: 12, bottom: -8, near: 1, far: 42 });
  key.shadow.bias = -0.0005;
  key.shadow.normalBias = 0.025;
  key.target.position.set(0, 0, 0);
  scene.add(key, key.target);
  const fill = new THREE.DirectionalLight(0xd1edff, 0.8);
  fill.position.set(6, 6, 7);
  scene.add(fill);

  const mat = (color, roughness = 0.85, extra = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness, ...extra });

  const houseGroup = new THREE.Group();
  scene.add(houseGroup);
  const structureGroup = new THREE.Group();
  const furnitureGroup = new THREE.Group();
  houseGroup.add(structureGroup, furnitureGroup);

  // 沙滩（穹壳外圈环带）
  const sand = new THREE.Mesh(new THREE.RingGeometry(4.7, 30, 64), mat(0xe6d3a3, 1));
  sand.rotation.x = -Math.PI / 2;
  sand.position.y = -0.02;
  sand.receiveShadow = true;
  structureGroup.add(sand);

  // 剖面态紫红外壳（保留后方 240°，前方 +z 开 120°）
  const shellGeo = new THREE.SphereGeometry(4.5, 48, 24, (5 * Math.PI) / 6, (4 * Math.PI) / 3, 0, Math.PI / 2);
  const shell = new THREE.Mesh(shellGeo, mat(0x7c4b66, 0.9, { side: THREE.DoubleSide }));
  shell.castShadow = true;
  shell.receiveShadow = true;
  structureGroup.add(shell);

  // 橄榄绿内壁（同心、同样剖面开口）
  const inner = new THREE.Mesh(
    new THREE.SphereGeometry(4.3, 48, 24, (5 * Math.PI) / 6, (4 * Math.PI) / 3, 0, Math.PI / 2),
    mat(0x6d8a3d, 0.95, { side: THREE.DoubleSide }),
  );
  inner.receiveShadow = true;
  structureGroup.add(inner);

  // 外观态：完整封闭半球壳
  const extShell = new THREE.Mesh(
    new THREE.SphereGeometry(4.5, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2),
    mat(0x7c4b66, 0.9),
  );
  extShell.castShadow = true;
  extShell.receiveShadow = true;
  extShell.visible = false;
  structureGroup.add(extShell);

  // 木地板（厚 0.12）：保留后方 240°，前方 +z 开 120° 露出地下坑
  const floorShape = new THREE.Shape();
  floorShape.moveTo(0, 0);
  floorShape.absarc(0, 0, 4.25, -Math.PI / 6, (7 * Math.PI) / 6, false);
  floorShape.lineTo(0, 0);
  const stairHole = new THREE.Path();
  stairHole.absarc(2.3, -0.6, 1.1, 0, Math.PI * 2, true);
  floorShape.holes.push(stairHole);
  const floorGeo = new THREE.ExtrudeGeometry(floorShape, { depth: 0.12, bevelEnabled: false });
  floorGeo.rotateX(-Math.PI / 2);
  const floor = new THREE.Mesh(floorGeo, mat(0xb98d5e, 0.8));
  floor.position.y = -0.12;
  floor.castShadow = true;
  floor.receiveShadow = true;
  structureGroup.add(floor);

  // 楼梯井内衬
  const well = new THREE.Mesh(
    new THREE.CylinderGeometry(1.1, 1.1, 2.3, 24, 1, true),
    mat(0x5a4630, 1, { side: THREE.DoubleSide }),
  );
  well.position.set(2.3, -1.15, 0.6);
  structureGroup.add(well);

  // 地下客厅坑壁（保留后方 240°，前方敞开）
  const pitWall = new THREE.Mesh(
    new THREE.CylinderGeometry(3.3, 3.3, 2.3, 40, 1, true, Math.PI / 3, (4 * Math.PI) / 3),
    mat(0xc8b28a, 1, { side: THREE.DoubleSide }),
  );
  pitWall.position.y = -1.15;
  pitWall.receiveShadow = true;
  structureGroup.add(pitWall);
  const pitFloor = new THREE.Mesh(new THREE.CircleGeometry(3.3, 40), mat(0xdcc99c, 1));
  pitFloor.rotation.x = -Math.PI / 2;
  pitFloor.position.y = -2.3;
  pitFloor.receiveShadow = true;
  structureGroup.add(pitFloor);

  // 六级木台阶，沿楼梯口旁坑壁下行
  const stairGroup = new THREE.Group();
  const stepMat = mat(0x9c7448, 0.85);
  for (let i = 0; i < 6; i++) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.34), stepMat);
    step.position.set(2.3, -0.06 - i * 0.38, 0.6 + i * 0.3);
    step.castShadow = true;
    step.receiveShadow = true;
    stairGroup.add(step);
  }
  structureGroup.add(stairGroup);

  // 金色骨头风向标（穹顶顶 0,4.5,0）
  const gold = mat(0xd9b23f, 0.35, { metalness: 0.6, roughness: 0.35 });
  const vaneGroup = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.9, 10), gold);
  pole.position.y = 0.45;
  vaneGroup.add(pole);
  const vaneTop = new THREE.Group();
  vaneTop.position.y = 0.86;
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.15, 8), gold);
  bar.rotation.z = Math.PI / 2;
  vaneTop.add(bar);
  for (const s of [-1, 1]) {
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), gold);
    knob.position.set(s * 0.55, 0, 0);
    vaneTop.add(knob);
    const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.2, 8), gold);
    tip.position.set(s * 0.55, 0.13, 0);
    vaneTop.add(tip);
  }
  vaneGroup.add(vaneTop);
  vaneGroup.position.set(0, 4.5, 0);
  structureGroup.add(vaneGroup);

  // 右前小木拱门
  const archGroup = new THREE.Group();
  const wood = mat(0x8a5a33, 0.8);
  const postL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.3, 0.12), wood);
  postL.position.set(-0.4, 0.65, 0);
  const postR = postL.clone();
  postR.position.x = 0.4;
  const archTop = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.06, 8, 16, Math.PI), wood);
  archTop.position.y = 1.3;
  const doorPanel = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.1, 0.06), mat(0x9c6b3f, 0.85));
  doorPanel.position.y = 0.55;
  archGroup.add(postL, postR, archTop, doorPanel);
  archGroup.position.set(3.9, 0, -0.9);
  archGroup.rotation.y = -0.15;
  archGroup.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  structureGroup.add(archGroup);

  // ---- 房间分组（GLB 加载后挂入） ----
  const kitchenGroup = new THREE.Group();
  kitchenGroup.userData.roomId = "kitchen";
  const bedroomGroup = new THREE.Group();
  bedroomGroup.userData.roomId = "bedroom";
  const gymGroup = new THREE.Group();
  gymGroup.userData.roomId = "gym";
  const livingGroup = new THREE.Group();
  livingGroup.userData.roomId = "living";
  furnitureGroup.add(kitchenGroup, bedroomGroup, gymGroup, livingGroup);
  const roomGroups = { kitchen: kitchenGroup, bedroom: bedroomGroup, gym: gymGroup, living: livingGroup };

  // 床头柜木盒（承托床头灯）
  const nightstand = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.55, 0.45), mat(0x9c7448, 0.85));
  nightstand.position.set(3.0, 0.275, -2.3);
  nightstand.castShadow = true;
  nightstand.receiveShadow = true;
  bedroomGroup.add(nightstand);

  // ---- GLB 加载与配置 ----
  const gltfLoader = new GLTFLoader();
  const interactables = []; // {model, kind, spec}
  let fanObj = null;
  let fanSpinning = false;
  let patrickModel = null;
  let patrickMixer = null;
  let patrickActions = {};
  let patrickWavePlaying = false;

  function loadAsset(spec) {
    return new Promise((resolve) => {
      gltfLoader.load(
        spec.url,
        (gltf) => {
          const model = gltf.scene;
          model.rotation.y = spec.rotationY || 0;
          model.scale.setScalar(spec.scale || 1);
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          if (spec.hang) {
            model.position.set(spec.position[0] - center.x, spec.position[1] - box.max.y, spec.position[2] - center.z);
          } else {
            model.position.set(spec.position[0] - center.x, spec.position[1] - box.min.y, spec.position[2] - center.z);
          }
          model.traverse((o) => {
            if (o.isMesh) {
              o.castShadow = true;
              o.receiveShadow = true;
              o.userData.interaction = spec.interaction || null;
              o.userData.assetId = spec.id;
            }
          });
          model.userData.roomId = spec.room;
          resolve({ spec, model, gltf });
        },
        undefined,
        () => resolve(null),
      );
    });
  }

  // ---- 视图与交互 ----
  let mode = "cutaway";
  let activeRoom = null;
  let animation = null;
  let ready = false;

  function wholePose() {
    if (mode === "exterior") {
      return { target: new THREE.Vector3(0, 2.3, 0), position: new THREE.Vector3(0, 3.6, 16) };
    }
    const fov = THREE.MathUtils.degToRad(camera.fov);
    const halfH = 4.3;
    const halfW = 5.4;
    const dist = Math.max(halfH / Math.tan(fov / 2), halfW / (Math.tan(fov / 2) * camera.aspect)) * 1.18;
    return {
      target: new THREE.Vector3(0, 1.6, 0),
      position: new THREE.Vector3(0, 1.6 + dist * 0.21, dist),
    };
  }

  function tweenCamera(position, target) {
    root.dataset.cameraTransition = "moving";
    controls.enabled = false;
    animation = {
      start: performance.now(),
      fromPosition: camera.position.clone(),
      fromTarget: controls.target.clone(),
      position,
      target,
      duration: reducedMotion ? 0 : 650,
    };
  }

  function applyModeVisibility() {
    const ext = mode === "exterior";
    shell.visible = !ext;
    inner.visible = !ext;
    floor.visible = !ext;
    well.visible = !ext;
    pitWall.visible = !ext;
    pitFloor.visible = !ext;
    stairGroup.visible = !ext;
    furnitureGroup.visible = !ext;
    archGroup.visible = !ext;
    extShell.visible = ext;
    labelsHost.hidden = ext;
    if (patrickModel) {
      patrickModel.position.x = ext ? 0 : 0.6;
      patrickModel.position.y = ext ? 0 : -2.3;
      patrickModel.position.z = ext ? 5.2 : 0.2;
      patrickModel.rotation.y = 0;
    }
    toggleBtn.textContent = ext ? "剖面" : "外观";
    toggleBtn.setAttribute("aria-pressed", String(ext));
  }

  function applyRoomVisibility() {
    if (mode !== "cutaway") return;
    kitchenGroup.visible = !activeRoom || activeRoom === "kitchen";
    bedroomGroup.visible = !activeRoom || activeRoom === "bedroom";
    gymGroup.visible = !activeRoom || activeRoom === "gym";
    livingGroup.visible = !activeRoom || activeRoom === "living";
  }

  function focusRoom(id) {
    const room = rooms.get(id);
    if (!room || !ready || mode !== "cutaway") return false;
    activeRoom = id;
    root.dataset.houseView = "room";
    caption.hidden = false;
    labelsHost.hidden = true;
    tooltip.hidden = true;
    document.querySelector("[data-house-floor]").textContent = room.floor;
    document.querySelector("[data-house-room-name]").textContent = room.name;
    applyRoomVisibility();
    const target = new THREE.Vector3(...room.target);
    const position = new THREE.Vector3(...room.camera);
    const width = room.bounds[1][0] - room.bounds[0][0];
    const height = room.bounds[1][1] - room.bounds[0][1];
    const tangent = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const fit = Math.max(width / (2 * tangent * camera.aspect), height / (2 * tangent)) * 1.08;
    const offset = position.clone().sub(target);
    offset.multiplyScalar(Math.max(1, fit / offset.length()));
    position.copy(target).add(offset);
    tweenCamera(position, target);
    return true;
  }

  function resetView() {
    activeRoom = null;
    root.dataset.houseView = "whole";
    caption.hidden = true;
    labelsHost.hidden = mode !== "cutaway";
    tooltip.hidden = true;
    applyRoomVisibility();
    const pose = wholePose();
    tweenCamera(pose.position, pose.target);
  }

  function switchMode() {
    mode = mode === "cutaway" ? "exterior" : "cutaway";
    activeRoom = null;
    root.dataset.houseView = "whole";
    caption.hidden = true;
    applyModeVisibility();
    applyRoomVisibility();
    const pose = wholePose();
    tweenCamera(pose.position, pose.target);
  }

  // 房间名浮层按钮
  const roomButtons = new Map();
  for (const room of config.rooms) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "room-label";
    button.textContent = room.name;
    button.setAttribute("aria-label", `${room.floor} ${room.name}，进入近景`);
    button.addEventListener("click", () => {
      if (focusRoom(room.id)) document.querySelector("[data-house-back]").focus({ preventScroll: true });
    });
    labelsHost.append(button);
    roomButtons.set(room.id, button);
  }

  document.querySelector("[data-house-back]").addEventListener("click", () => {
    resetView();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activeRoom) resetView();
  });
  toggleBtn.addEventListener("click", switchMode);
  document.querySelector("[data-house-retry]").addEventListener("click", () => location.reload());

  // ---- 交互动作 ----
  function toggleTv(tvModel) {
    let on = tvModel.userData.tvOn !== true;
    tvModel.userData.tvOn = on;
    tvModel.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of mats) {
        if (on) {
          m.emissive = new THREE.Color(0x9fd0ff);
          m.emissiveIntensity = 0.6;
        } else {
          m.emissiveIntensity = 0;
        }
      }
    });
  }

  function toggleFan() {
    fanSpinning = !fanSpinning;
  }

  function toggleLamp(lampModel) {
    let on = lampModel.userData.lampOn !== true;
    lampModel.userData.lampOn = on;
    lampModel.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of mats) {
        if (on) {
          m.emissive = new THREE.Color(0xffe6a8);
          m.emissiveIntensity = 0.9;
        } else {
          m.emissiveIntensity = 0;
        }
      }
    });
    if (!lampModel.userData.pointLight) {
      const pl = new THREE.PointLight(0xffe6a8, 0, 4);
      pl.position.copy(lampModel.position);
      pl.position.y += 0.4;
      scene.add(pl);
      lampModel.userData.pointLight = pl;
    }
    lampModel.userData.pointLight.intensity = on ? 1.2 : 0;
  }

  function triggerPatrickWave() {
    if (!patrickMixer || patrickWavePlaying) return;
    patrickWavePlaying = true;
    patrickActions.wave.reset();
    patrickActions.wave.setLoop(THREE.LoopOnce);
    patrickActions.wave.clampWhenFinished = false;
    patrickActions.idle.fadeOut(0.2);
    patrickActions.wave.reset().fadeIn(0.2).play();
  }

  // 射线拾取
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let pointerDown = null;
  let rotating = false;
  controls.addEventListener("start", () => {
    animation = null;
    root.dataset.cameraTransition = "idle";
    rotating = true;
    tooltip.hidden = true;
  });
  controls.addEventListener("end", () => {
    rotating = false;
  });

  function hitInteractable(node) {
    while (node) {
      if (node.userData && node.userData.interaction) return node;
      node = node.parent;
    }
    return null;
  }

  function pick(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const meshes = [];
    furnitureGroup.traverse((node) => {
      if (!node.isMesh || !node.visible) return;
      meshes.push(node);
    });
    const hits = raycaster.intersectObjects(meshes, false);
    for (const hit of hits) {
      // 优先命中可交互物
      const inter = hitInteractable(hit.object);
      if (inter) return { kind: "interact", node: inter };
      let node = hit.object;
      while (node && !node.userData.roomId) node = node.parent;
      const id = node?.userData.roomId;
      if (id && rooms.has(id)) return { kind: "room", id };
    }
    return null;
  }

  canvas.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary) {
      pointerDown = null;
      return;
    }
    pointerDown = { x: event.clientX, y: event.clientY, time: performance.now(), id: event.pointerId };
  });
  canvas.addEventListener("pointercancel", () => {
    pointerDown = null;
  });
  canvas.addEventListener("pointerup", (event) => {
    const start = pointerDown;
    pointerDown = null;
    if (!start || start.id !== event.pointerId || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 7 || performance.now() - start.time > 650 || !ready) return;
    const result = pick(event.clientX, event.clientY);
    if (!result) return;
    if (result.kind === "interact") {
      const inter = result.node;
      const kind = inter.userData.interaction;
      if (kind === "tv") toggleTv(inter);
      else if (kind === "fan") toggleFan();
      else if (kind === "lamp") toggleLamp(inter);
      else if (kind === "patrick") triggerPatrickWave();
      return;
    }
    if (result.kind === "room" && !activeRoom) focusRoom(result.id);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || rotating || !ready || activeRoom) {
      tooltip.hidden = true;
      return;
    }
    const result = pick(event.clientX, event.clientY);
    canvas.style.cursor = result ? "pointer" : "grab";
    tooltip.hidden = !result;
    if (result) {
      const label = result.kind === "interact" ? "点击互动" : rooms.get(result.id).name;
      tooltip.textContent = label;
      const rect = canvas.getBoundingClientRect();
      tooltip.style.left = `${Math.min(event.clientX - rect.left + 14, viewWidth - 120)}px`;
      tooltip.style.top = `${Math.min(event.clientY - rect.top + 14, viewHeight - 40)}px`;
    }
  });
  canvas.addEventListener("pointerleave", () => {
    tooltip.hidden = true;
  });
  canvas.addEventListener("webglcontextlost", (event) => event.preventDefault());

  new ResizeObserver(() => {
    viewWidth = Math.max(1, root.clientWidth);
    viewHeight = Math.max(1, root.clientHeight);
    camera.aspect = viewWidth / viewHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
    renderer.setSize(viewWidth, viewHeight, false);
  }).observe(root);

  // ---- 加载全部 GLB ----
  (async () => {
    const results = await Promise.all(config.assets.map(loadAsset));
    for (const r of results) {
      if (!r) continue;
      const { spec, model, gltf } = r;
      if (spec.id === "patrick") {
        patrickModel = model;
        houseGroup.add(model);
        patrickMixer = new THREE.AnimationMixer(gltf.scene);
        for (const clip of gltf.animations) {
          patrickActions[clip.name] = patrickMixer.clipAction(clip);
        }
        if (patrickActions.idle) patrickActions.idle.play();
        patrickMixer.addEventListener("finished", (e) => {
          if (e.action === patrickActions.wave) {
            patrickWavePlaying = false;
            patrickActions.wave.fadeOut(0.2);
            patrickActions.idle.reset().fadeIn(0.2).play();
          }
        });
        applyModeVisibility();
      } else if (spec.id === "ceiling-fan") {
        fanObj = model;
        roomGroups[spec.room].add(model);
      } else {
        roomGroups[spec.room].add(model);
      }
    }

    applyModeVisibility();
    applyRoomVisibility();
    const pose = wholePose();
    camera.position.copy(pose.position);
    controls.target.copy(pose.target);
    controls.update();
    root.dataset.cameraTransition = "idle";
    ready = true;
    root.dataset.houseState = "ready";
    loading.hidden = true;
  })();

  const clock = new THREE.Clock();
  function frame() {
    requestAnimationFrame(frame);
    const delta = clock.getDelta();
    if (animation) {
      const t = animation.duration ? Math.min((performance.now() - animation.start) / animation.duration, 1) : 1;
      const eased = t * t * (3 - 2 * t);
      camera.position.lerpVectors(animation.fromPosition, animation.position, eased);
      controls.target.lerpVectors(animation.fromTarget, animation.target, eased);
      if (t === 1) {
        animation = null;
        controls.enabled = true;
        root.dataset.cameraTransition = "idle";
      }
    }
    if (patrickMixer) patrickMixer.update(delta);
    if (fanObj && fanSpinning) fanObj.rotation.y += delta * 6;
    controls.update();
    vaneTop.rotation.y += 0.002;
    if (!activeRoom && mode === "cutaway") {
      for (const room of config.rooms) {
        const point = new THREE.Vector3(...room.label).project(camera);
        const button = roomButtons.get(room.id);
        button.hidden = point.z > 1 || Math.abs(point.x) > 1 || Math.abs(point.y) > 1;
        button.style.left = `${(point.x * 0.5 + 0.5) * viewWidth}px`;
        button.style.top = `${(-point.y * 0.5 + 0.5) * viewHeight}px`;
      }
    }
    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);

  window.__patrickHouse = {
    focusRoom,
    resetView,
    switchMode,
    toggleTv: () => interactables[0] && toggleTv(interactables[0].model),
    scene,
    camera,
    controls,
    config,
    triggerPatrickWave,
    snapshot: () => ({ view: activeRoom ?? "whole", mode, state: root.dataset.houseState }),
  };
}
