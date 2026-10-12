// 派大星石头屋 · 场景主脚本（v3 程序化重建）
// 资产由 scripts/patrick-build.js 程序化构建（Forge3D/Blender 管线本次会话不可达，
// 原 GLB 已备份至 assets/models/patrick-house/archive/，见 docs/patrick-house-review/ASSETS.md）。
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import config from "../src/data/patrick-house.json";
import {
  mat, texMat, rockTex, greenWallTex, woodTex, sandTex, tvScreenTex,
  buildFridge, buildStove, buildSink, buildWallCabinet, buildBed, buildStarPillow,
  buildNightstand, buildBedLamp, buildBenchPress, buildSofa, buildCoffeeTable,
  buildOldTv, buildFloorLamp, buildCeilingFan, buildWeatherVane, buildPatrick, buildArch,
} from "./patrick-build.js";

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
  fail("WebGL 初始化失败：当前浏览器环境不支持 3D 渲染，请更换浏览器或开启硬件加速后重试。");
}

function fail(message) {
  root.dataset.houseState = "error";
  loading.hidden = true;
  errorPanel.hidden = false;
  if (message) errorPanel.querySelector("[data-house-error-text]").textContent = message;
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
  const camera = new THREE.PerspectiveCamera(34, viewWidth / viewHeight, 0.1, 160);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 4;
  controls.maxDistance = 42;
  controls.maxPolarAngle = Math.PI * 0.55;

  scene.add(new THREE.HemisphereLight(0xf8f5df, 0x7693a1, 2.0));
  const key = new THREE.DirectionalLight(0xfff2d2, 2.6);
  key.position.set(-6, 12, 9);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -9, right: 9, top: 12, bottom: -9, near: 1, far: 46 });
  key.shadow.bias = -0.0005;
  key.shadow.normalBias = 0.03;
  key.target.position.set(0, 0, 0);
  scene.add(key, key.target);
  const fill = new THREE.DirectionalLight(0xd1edff, 0.8);
  fill.position.set(6, 6, 7);
  scene.add(fill);
  const bedLight = new THREE.PointLight(0xffe6a8, 0, 6);
  bedLight.position.set(2.9, 1.25, -2.3);
  scene.add(bedLight);
  const floorLight = new THREE.PointLight(0xffe6a8, 0, 9);
  floorLight.position.set(-0.3, -1.6, -0.5);
  scene.add(floorLight);

  const houseGroup = new THREE.Group();
  scene.add(houseGroup);
  const structureGroup = new THREE.Group();
  const furnitureGroup = new THREE.Group();
  houseGroup.add(structureGroup, furnitureGroup);

  const shade = (obj) => {
    obj.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    return obj;
  };

  /* ---------- 结构（剖面/外观两态） ---------- */
  const shellTex = rockTex(512);
  const extShellTex = rockTex(512);
  const innerTex = greenWallTex(256);
  const floorTex = woodTex(512, "plank");
  const darkWoodTex = woodTex(512, "dark");
  const sandBase = sandTex(512);
  const caveTex = rockTex(256, "#8a7258");

  function displace(geo, seed) {
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    const a = seed * 12.9898;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const r = v.length();
      if (r < 0.001) continue;
      const nx = v.x / r, ny = v.y / r, nz = v.z / r;
      const n =
        Math.sin(a + nx * 6.2 + ny * 3.1) * Math.cos(a + nz * 5.1 - ny * 2.2) +
        0.5 * Math.sin(a + nx * 11.3 - nz * 7.7 + ny * 4.4) +
        0.25 * Math.cos(a + nx * 17.7 + nz * 13.1 + ny * 8.8);
      const f = ny < 0.12 ? Math.max(0, 1 - (0.12 - ny) * 4) : 1;
      const grow = 1 + Math.max(-0.14, Math.min(0.16, n * 0.05)) * f;
      v.setLength(r * grow);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }

  // 沙地：外观态整环 + 剖面态前方开口环带（内沿 4.1 收进地板下）
  const sandFull = new THREE.Mesh(new THREE.RingGeometry(4.7, 30, 72), texMat(sandBase, 1));
  sandFull.rotation.x = -Math.PI / 2;
  sandFull.position.y = -0.02;
  sandFull.receiveShadow = true;
  sandFull.visible = false;
  structureGroup.add(sandFull);

  const sandShape = new THREE.Shape();
  sandShape.absarc(0, 0, 30, -Math.PI / 6, (7 * Math.PI) / 6, false);
  sandShape.absarc(0, 0, 4.1, (7 * Math.PI) / 6, -Math.PI / 6, true);
  sandShape.closePath();
  const sandGeo = new THREE.ExtrudeGeometry(sandShape, { depth: 0.08, bevelEnabled: false });
  sandGeo.rotateX(-Math.PI / 2);
  const sandSector = new THREE.Mesh(sandGeo, texMat(sandBase, 1));
  sandSector.position.y = -0.04;
  sandSector.receiveShadow = true;
  structureGroup.add(sandSector);

  // 紫褐岩石外壳（剖面态保留后方 240°，前方 +z 开 120°）
  const shellGeo = new THREE.SphereGeometry(4.5, 64, 28, (5 * Math.PI) / 6, (4 * Math.PI) / 3, 0, Math.PI / 2);
  displace(shellGeo, 1);
  const shell = new THREE.Mesh(shellGeo, texMat(shellTex, 0.9, { side: THREE.DoubleSide }));
  shade(shell);
  structureGroup.add(shell);

  // 橄榄绿内壁（同心、同样剖面开口，起伏更柔和）
  const innerGeo = new THREE.SphereGeometry(4.3, 56, 24, (5 * Math.PI) / 6, (4 * Math.PI) / 3, 0, Math.PI / 2);
  displace(innerGeo, 2);
  const inner = new THREE.Mesh(innerGeo, texMat(innerTex, 0.95, { side: THREE.DoubleSide }));
  shade(inner);
  structureGroup.add(inner);

  // 外观态完整封闭半球壳
  const extShellGeo = new THREE.SphereGeometry(4.5, 64, 28, 0, Math.PI * 2, 0, Math.PI / 2);
  displace(extShellGeo, 1);
  const extShell = new THREE.Mesh(extShellGeo, texMat(extShellTex, 0.9));
  shade(extShell);
  extShell.visible = false;
  structureGroup.add(extShell);

  // 木地板（厚 0.12）：后方 240° + 前方开口，带楼梯孔
  const floorShape = new THREE.Shape();
  floorShape.moveTo(0, 0);
  floorShape.absarc(0, 0, 4.25, -Math.PI / 6, (7 * Math.PI) / 6, false);
  floorShape.lineTo(0, 0);
  const stairHole = new THREE.Path();
  stairHole.absarc(2.0, -0.7, 0.95, 0, Math.PI * 2, true);
  floorShape.holes.push(stairHole);
  const floorGeo = new THREE.ExtrudeGeometry(floorShape, { depth: 0.12, bevelEnabled: false });
  floorGeo.rotateX(-Math.PI / 2);
  const floor = new THREE.Mesh(floorGeo, texMat(floorTex, 0.8));
  floor.position.y = -0.12;
  shade(floor);
  structureGroup.add(floor);

  // 地下客厅坑壁（与外壳同样保留后方 240°），坑底沙质
  const pitWall = new THREE.Mesh(
    new THREE.CylinderGeometry(3.3, 3.3, 2.3, 48, 1, true, Math.PI / 3, (4 * Math.PI) / 3),
    texMat(caveTex, 0.95, { side: THREE.DoubleSide }),
  );
  pitWall.position.y = -1.15;
  pitWall.receiveShadow = true;
  structureGroup.add(pitWall);
  const pitFloor = new THREE.Mesh(new THREE.CircleGeometry(3.3, 48), texMat(sandBase, 1));
  pitFloor.rotation.x = -Math.PI / 2;
  pitFloor.position.y = -2.3;
  pitFloor.receiveShadow = true;
  structureGroup.add(pitFloor);

  // 前侧沙地围挡（剖面态“切开”的断面，保留外围沙地与地下空间厚度）
  const collarShape = new THREE.Shape();
  collarShape.absarc(0, 0, 4.35, (-8 * Math.PI) / 9, (-Math.PI) / 9, false);
  collarShape.absarc(0, 0, 3.35, (-Math.PI) / 9, (-8 * Math.PI) / 9, true);
  collarShape.closePath();
  const collarGeo = new THREE.ExtrudeGeometry(collarShape, { depth: 2.55, bevelEnabled: false });
  collarGeo.rotateX(Math.PI / 2); // 断面向下：沙层厚度位于地下（0.25 → -2.3），不做地面以上沙墙
  const collar = new THREE.Mesh(collarGeo, texMat(sandBase, 1));
  collar.position.y = 0.25;
  collar.receiveShadow = true;
  structureGroup.add(collar);

  // 七级木台阶（紧凑靠后右，替代旧的大圆柱楼梯井）
  const stairGroup = new THREE.Group();
  const stepMat = texMat(darkWoodTex, 0.85);
  for (let i = 0; i < 7; i++) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.09, 0.34), stepMat);
    step.position.set(1.9, 0.03 - i * 0.34, -0.7 - i * 0.18);
    step.castShadow = true;
    step.receiveShadow = true;
    stairGroup.add(step);
    if (i < 6) {
      const riser = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.34, 0.04), texMat(darkWoodTex, 0.85));
      riser.position.set(1.9, 0.03 - i * 0.34 - 0.17, -0.7 - i * 0.18 - 0.15);
      riser.castShadow = true;
      stairGroup.add(riser);
    }
  }
  // 侧扶手（右侧一条）
  for (let i = 0; i < 7; i++) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.9), stepMat);
    rail.position.set(2.33, 0.3 + 0.6 - i * 0.34 * 0.9, -0.7 - i * 0.18);
    rail.rotation.x = 0.5;
    rail.castShadow = true;
    stairGroup.add(rail);
  }
  structureGroup.add(stairGroup);

  // 金色骨头风向标（穹顶顶）
  const vane = buildWeatherVane();
  vane.position.set(0, 4.5, 0);
  structureGroup.add(vane);
  const vaneTop = vane.userData.vaneTop;

  // 卧室小拱门
  const arch = buildArch();
  arch.position.set(3.8, 0, -1.0);
  structureGroup.add(arch);

  /* ---------- 房间分组与家具（包围盒校准、脚底接地） ---------- */
  const roomGroups = {
    kitchen: new THREE.Group(),
    bedroom: new THREE.Group(),
    gym: new THREE.Group(),
    living: new THREE.Group(),
  };
  roomGroups.kitchen.userData.roomId = "kitchen";
  roomGroups.bedroom.userData.roomId = "bedroom";
  roomGroups.gym.userData.roomId = "gym";
  roomGroups.living.userData.roomId = "living";
  furnitureGroup.add(roomGroups.kitchen, roomGroups.bedroom, roomGroups.gym, roomGroups.living);

  // 上层：左厨房 → 右卧室 → 前健身区
  const fridge = buildFridge();
  fridge.position.set(-2.45, 0, -2.65);
  roomGroups.kitchen.add(fridge);
  const stove = buildStove();
  stove.position.set(-1.6, 0, -2.8);
  roomGroups.kitchen.add(stove);
  const connector = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.62, 0.55), texMat(woodTex(512, "plank"), 0.8));
  connector.position.set(-1.08, 0.31, -2.85);
  shade(connector);
  roomGroups.kitchen.add(connector);
  const sink = buildSink();
  sink.position.set(-0.55, 0, -2.85);
  roomGroups.kitchen.add(sink);
  const cabinet = buildWallCabinet();
  cabinet.position.set(-1.15, 1.32, -2.7);
  roomGroups.kitchen.add(cabinet);
  const fan = buildCeilingFan();
  fan.position.set(0, 4.25, 0);
  fan.userData.interaction = "fan";
  // 吊扇为细长剪影，整屋视角射线可能沿轴线穿过打不到表面：加不可见球形拾取体
  const fanPick = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 12),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false }),
  );
  fanPick.position.y = -0.34;
  fan.add(fanPick);
  roomGroups.kitchen.add(fan);

  const bed = buildBed();
  bed.position.set(2.0, 0, -1.6);
  roomGroups.bedroom.add(bed);
  const pillow = buildStarPillow();
  pillow.position.set(1.75, 0.42, -1.5);
  roomGroups.bedroom.add(pillow);
  const nightstand = buildNightstand();
  nightstand.position.set(2.9, 0, -2.3);
  roomGroups.bedroom.add(nightstand);
  const bedLamp = buildBedLamp();
  bedLamp.position.set(2.9, 0.51, -2.3);
  bedLamp.userData.interaction = "lamp";
  roomGroups.bedroom.add(bedLamp);

  const bench = buildBenchPress();
  bench.position.set(-0.45, 0, 0.55);
  roomGroups.gym.add(bench);

  // 下层：客厅围合（沙发 ↔ 电视对视，茶几居中，落地灯靠后）
  const sofa = buildSofa();
  sofa.position.set(-1.1, -2.3, -0.9);
  sofa.rotation.y = 0.55;
  roomGroups.living.add(sofa);
  const coffeeTable = buildCoffeeTable();
  coffeeTable.position.set(-0.35, -2.3, -0.55);
  roomGroups.living.add(coffeeTable);
  const oldTv = buildOldTv();
  oldTv.position.set(1.0, -2.3, -1.9);
  oldTv.rotation.y = 2.7;
  oldTv.userData.interaction = "tv";
  roomGroups.living.add(oldTv);
  const floorLamp = buildFloorLamp();
  floorLamp.position.set(-1.85, -2.3, -1.55);
  floorLamp.userData.interaction = "lamp";
  roomGroups.living.add(floorLamp);

  /* ---------- 派大星（挂在 houseGroup，独立拾取） ---------- */
  const patrick = buildPatrick();
  patrick.userData.interaction = "patrick";
  patrick.position.set(0.15, -2.3, 0.7);
  houseGroup.add(patrick);

  const patrickBody = patrick.getObjectByName("patrick-body");
  const armL = patrick.userData.patrickArms.armL;
  const armR = patrick.userData.patrickArms.armR;
  const elbowL = armL.userData.elbow;
  const elbowR = armR.userData.elbow;

  /* ---------- 交互状态 ---------- */
  const tvOnTex = tvScreenTex(true);
  const tvOffTex = tvScreenTex(false);
  const interactState = {
    tvOn: false,
    fanSpinning: false,
    bedLampOn: false,
    floorLampOn: false,
  };

  function toggleTv() {
    const on = !interactState.tvOn;
    interactState.tvOn = on;
    const screen = oldTv.userData.tvScreenMesh;
    screen.material.map = on ? tvOnTex : tvOffTex;
    screen.material.emissive = new THREE.Color(on ? 0x9fd0ff : 0x000000);
    screen.material.emissiveIntensity = on ? 0.55 : 0;
    screen.material.needsUpdate = true;
  }

  function toggleFan() {
    interactState.fanSpinning = !interactState.fanSpinning;
  }

  function toggleLamp(lampModel) {
    const kind = lampModel.userData.lampKind;
    const key = kind === "bed" ? "bedLampOn" : "floorLampOn";
    const on = !interactState[key];
    interactState[key] = on;
    for (const m of lampModel.userData.lampShades || []) {
      m.material.emissive = new THREE.Color(on ? 0xffe6a8 : 0x000000);
      m.material.emissiveIntensity = on ? 0.85 : 0;
      m.material.needsUpdate = true;
    }
    if (kind === "bed") bedLight.intensity = on ? 1.6 : 0;
    else floorLight.intensity = on ? 2.2 : 0;
  }

  /* ---------- 派大星招手（时间驱动、可连续验证） ---------- */
  let waveState = "idle";
  let waveT = 0;
  const WAVE = { raise: 0.5, wave: 1.5, lower: 0.6 };
  const REST = { rz: 0.22, el: 0.15 };
  const UP = { rz: 2.35, el: -2.05 };
  const ease = (t) => t * t * (3 - 2 * t);

  function startWave() {
    if (waveState !== "idle") return; // 连续点击不叠加
    waveState = "raise";
    waveT = 0;
  }

  function updateWave(dt) {
    if (waveState === "idle") return;
    waveT += dt;
    if (waveState === "raise") {
      const k = ease(Math.min(waveT / WAVE.raise, 1));
      armR.rotation.z = REST.rz + (UP.rz - REST.rz) * k;
      elbowR.rotation.x = REST.el + (UP.el - REST.el) * k;
      if (waveT >= WAVE.raise) { waveState = "wave"; waveT = 0; }
    } else if (waveState === "wave") {
      const w = waveT * Math.PI * 2 * 1.6;
      armR.rotation.z = UP.rz + Math.sin(w) * 0.09;
      elbowR.rotation.x = UP.el + Math.sin(w + 0.9) * 0.55;
      if (waveT >= WAVE.wave) { waveState = "lower"; waveT = 0; }
    } else if (waveState === "lower") {
      const k = ease(Math.min(waveT / WAVE.lower, 1));
      armR.rotation.z = REST.rz + (UP.rz - REST.rz) * (1 - k);
      elbowR.rotation.x = REST.el + (UP.el - REST.el) * (1 - k);
      if (waveT >= WAVE.lower) { waveState = "idle"; waveT = 0; }
    }
  }

  /* ---------- 视图 ---------- */
  let mode = "cutaway";
  let activeRoom = null;
  let cameraAnim = null;
  let ready = false;

  const WHOLE_MIN = new THREE.Vector3(-5.1, -2.35, -5.1);
  const WHOLE_MAX = new THREE.Vector3(5.1, 5.7, 5.1);

  function applyFov() {
    const narrow = camera.aspect < 0.72;
    const fov = narrow ? 50 : 34;
    if (Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }

  function wholePose() {
    applyFov();
    const fov = THREE.MathUtils.degToRad(camera.fov / 2);
    if (mode === "exterior") {
      return { target: new THREE.Vector3(0, 2.4, 0), position: new THREE.Vector3(0, 3.4, 17.5) };
    }
    const halfW = (WHOLE_MAX.x - WHOLE_MIN.x) * 0.6;
    const halfH = (WHOLE_MAX.y - WHOLE_MIN.y) * 0.62;
    const dist = Math.max(halfH / Math.tan(fov), halfW / (Math.tan(fov) * camera.aspect));
    return {
      target: new THREE.Vector3(0, 1.7, 0),
      position: new THREE.Vector3(0, 1.7 + dist * 0.16, dist),
    };
  }

  function tweenCamera(position, target) {
    root.dataset.cameraTransition = "moving";
    controls.enabled = false;
    cameraAnim = {
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
    pitWall.visible = !ext;
    pitFloor.visible = !ext;
    stairGroup.visible = !ext;
    sandSector.visible = !ext;
    collar.visible = !ext;
    arch.visible = !ext;
    furnitureGroup.visible = !ext;
    vane.visible = true;
    extShell.visible = ext;
    sandFull.visible = ext;
    labelsHost.hidden = ext;
    if (ext) {
      patrick.position.set(0, 0.02, 5.9);
    } else {
      patrick.position.set(0.15, -2.3, 0.7);
    }
    patrick.rotation.y = 0;
    toggleBtn.textContent = ext ? "剖面" : "外观";
    toggleBtn.setAttribute("aria-pressed", String(ext));
  }

  function applyRoomVisibility() {
    if (mode !== "cutaway") return;
    roomGroups.kitchen.visible = !activeRoom || activeRoom === "kitchen";
    roomGroups.bedroom.visible = !activeRoom || activeRoom === "bedroom";
    roomGroups.gym.visible = !activeRoom || activeRoom === "gym";
    roomGroups.living.visible = !activeRoom || activeRoom === "living";
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

  /* ---------- 拾取集合（仅派大星 + 交互家具 + 房间家具） ---------- */
  const pickables = [];
  const occluders = [shell, extShell, inner, floor];
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  let pointerDown = null;
  let rotating = false;
  controls.addEventListener("start", () => {
    cameraAnim = null;
    root.dataset.cameraTransition = "idle";
    rotating = true;
    tooltip.hidden = true;
  });
  controls.addEventListener("end", () => {
    rotating = false;
  });

  function visibleChain(obj) {
    let o = obj;
    while (o) {
      if (o.visible === false) return false;
      o = o.parent;
    }
    return true;
  }

  function hitInteractable(node) {
    while (node) {
      if (node.userData && node.userData.interaction) return node;
      node = node.parent;
    }
    return null;
  }

  function lineOfSightBlocked(point) {
    const dir = new THREE.Vector3().subVectors(point, camera.position);
    const dist = dir.length();
    if (dist < 0.05) return false;
    dir.normalize();
    raycaster.set(camera.position, dir);
    raycaster.near = 0.02;
    raycaster.far = dist - 0.02;
    // 只考虑当前可见的遮挡物：剖面模式下 extShell 隐藏，不能参与遮挡判定
    const blockers = occluders.filter((o) => o.visible);
    const blocked = raycaster.intersectObjects(blockers, false).length > 0;
    raycaster.near = 0;
    raycaster.far = Infinity;
    return blocked;
  }

  function pick(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    pointerNdc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointerNdc, camera);
    const targets = [];
    for (const m of pickables) {
      if (m.visible && visibleChain(m)) targets.push(m);
    }
    const hits = raycaster.intersectObjects(targets, false);
    for (const hit of hits) {
      if (lineOfSightBlocked(hit.point)) continue; // 遮挡物（墙/地板）后不隔墙触发
      const inter = hitInteractable(hit.object);
      if (inter) return { kind: "interact", node: inter };
      let node = hit.object;
      while (node && !node.userData.roomId) node = node.parent;
      const id = node?.userData.roomId;
      if (id && rooms.has(id)) return { kind: "room", id };
    }
    return null;
  }

  function collectPickables() {
    pickables.length = 0;
    furnitureGroup.traverse((n) => {
      if (n.isMesh) pickables.push(n);
    });
    patrick.traverse((n) => {
      if (n.isMesh) pickables.push(n);
    });
  }
  collectPickables();

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
      const kind = result.node.userData.interaction;
      if (kind === "tv") toggleTv();
      else if (kind === "fan") toggleFan();
      else if (kind === "lamp") toggleLamp(result.node);
      else if (kind === "patrick") startWave();
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

  /* ---------- 房间标签（视口夹取，避免与标题/按钮重叠） ---------- */
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

  const projected = new THREE.Vector3();
  const titleGap = () => (viewWidth < 720 ? 86 : 112);

  function updateRoomLabels() {
    if (activeRoom || mode !== "cutaway" || !ready) return;
    const topSafe = titleGap();
    const marginX = 8;
    const labelW = 96;
    const labelH = 26;
    for (const room of config.rooms) {
      const button = roomButtons.get(room.id);
      const p = projected.set(room.label[0], room.label[1], room.label[2]).project(camera);
      button.hidden = p.z > 1;
      let x = (p.x * 0.5 + 0.5) * viewWidth;
      let y = (-p.y * 0.5 + 0.5) * viewHeight;
      x = Math.max(marginX + labelW / 2, Math.min(x, viewWidth - marginX - labelW / 2));
      y = Math.max(topSafe + labelH / 2, Math.min(y, viewHeight - marginX - labelH / 2));
      button.style.left = `${x - labelW / 2}px`;
      button.style.top = `${y - labelH / 2}px`;
    }
  }

  document.querySelector("[data-house-back]").addEventListener("click", () => {
    resetView();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activeRoom) resetView();
  });
  toggleBtn.addEventListener("click", switchMode);
  document.querySelector("[data-house-retry]").addEventListener("click", () => location.reload());

  /* ---------- 启动：全部程序化资产，同步就绪 ---------- */
  try {
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
  } catch (err) {
    console.error("派大星石头屋初始化失败：", err);
    fail("场景初始化失败，请刷新重试。");
  }

  /* ---------- 主循环 ---------- */
  let lastTick = performance.now();
  let elapsed = 0;
  let frameCount = 0;
  let lastRenderError = null;
  function frame() {
    requestAnimationFrame(frame);
    frameCount += 1;
    const now = performance.now();
    const delta = Math.min((now - lastTick) / 1000, 0.05);
    lastTick = now;
    elapsed += delta;
    if (cameraAnim) {
      const t = cameraAnim.duration ? Math.min((performance.now() - cameraAnim.start) / cameraAnim.duration, 1) : 1;
      const k = t * t * (3 - 2 * t);
      camera.position.lerpVectors(cameraAnim.fromPosition, cameraAnim.position, k);
      controls.target.lerpVectors(cameraAnim.fromTarget, cameraAnim.target, k);
      if (t === 1) {
        cameraAnim = null;
        controls.enabled = true;
        root.dataset.cameraTransition = "idle";
      }
    }
    // 待机呼吸 + 手臂轻摆（不做行走，脚底始终接地）
    patrickBody.scale.set(
      1 + Math.sin(elapsed * 1.9) * 0.012,
      1 + Math.sin(elapsed * 1.9) * 0.016,
      1 + Math.sin(elapsed * 1.9 + 0.7) * 0.012,
    );
    patrickBody.rotation.z = Math.sin(elapsed * 2.2) * 0.01;
    if (waveState === "idle") {
      armL.rotation.z = -REST.rz + Math.sin(elapsed * 1.6) * 0.035;
      armR.rotation.z = REST.rz + Math.sin(elapsed * 1.6 + 0.8) * 0.035;
      elbowL.rotation.x = REST.el + Math.sin(elapsed * 1.3) * 0.05;
    }
    updateWave(delta);
    if (interactState.fanSpinning) fan.userData.fanBlades.rotation.y += delta * 5;
    vaneTop.rotation.y += delta * 0.35;
    controls.update();
    updateRoomLabels();
    try {
      renderer.render(scene, camera);
    } catch (err) {
      lastRenderError = String(err && err.message ? err.message : err);
    }
  }
  requestAnimationFrame(frame);

  window.__patrickHouse = {
    focusRoom,
    resetView,
    switchMode,
    startWave,
    toggleTv,
    toggleFan,
    toggleLamp,
    scene,
    camera,
    controls,
    renderer,
    config,
    frames: () => ({ frameCount, lastRenderError, gl: renderer.info.render }),
    snapshot: () => ({
      view: activeRoom ?? "whole",
      mode,
      state: root.dataset.houseState,
      waveState,
      interact: { ...interactState },
      camPos: camera.position.toArray(),
      target: controls.target.toArray(),
      fov: camera.fov,
      patrickPos: patrick.position.toArray(),
    }),
    wavePose: () => ({
      state: waveState,
      t: waveT,
      armRz: armR.rotation.z,
      elbowRx: elbowR.rotation.x,
      bodyScale: patrickBody.scale.toArray(),
      patrickPos: patrick.position.toArray(),
    }),
    stat: () => {
      let tris = 0, meshes = 0;
      scene.traverse((o) => {
        if (o.isMesh) {
          meshes++;
          const g = o.geometry;
          if (g.index) tris += g.index.count / 3;
          else if (g.attributes.position) tris += g.attributes.position.count / 3;
        }
      });
      return { meshes, triangles: Math.round(tris) };
    },
    pick: (x, y) => {
      const r = pick(x, y);
      if (!r) return null;
      if (r.kind === "interact") return { kind: "interact", interaction: r.node.userData.interaction, lampKind: r.node.userData.lampKind ?? null };
      return { kind: "room", id: r.id };
    },
    rayHits: (x, y) => {      const rect = canvas.getBoundingClientRect();
      const ndc = new THREE.Vector2(((x - rect.left) / rect.width) * 2 - 1, -((y - rect.top) / rect.height) * 2 + 1);
      const rc = new THREE.Raycaster();
      rc.setFromCamera(ndc, camera);
      const hits = rc.intersectObjects(scene.children, true);
      return hits.slice(0, 10).map((h) => {
        let n = h.object;
        while (n && !n.userData.interaction) n = n.parent;
        return { mesh: h.object.type, name: h.object.name, dist: +h.distance.toFixed(3), visible: h.object.visible, inter: n ? n.userData.interaction : null, point: h.point ? h.point.toArray().map(v => +v.toFixed(3)) : null };
      });
    },
    worldCenter: (g) => {
      const box = new THREE.Box3().setFromObject(g);
      const c = new THREE.Vector3();
      box.getCenter(c);
      return [c.x, c.y, c.z];
    },
    gl: () => ({ calls: renderer.info.render.calls, triangles: renderer.info.render.triangles }),
  };
}
