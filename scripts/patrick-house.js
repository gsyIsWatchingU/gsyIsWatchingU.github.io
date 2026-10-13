// 派大星石头屋：参考图布局 + 自有 GPU 独立资产 + 手绘场景细节。
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { addReferenceDetails, artReady } from "./patrick-reference.js";
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
  // 正面柔和补光: 保证默认镜头/角色正脸与正面家具不被暗部吞掉
  const frontFill = new THREE.DirectionalLight(0xfff6ea, 0.5);
  frontFill.position.set(0, 4, 11);
  scene.add(frontFill);
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
  floorTex.wrapS=floorTex.wrapT=THREE.RepeatWrapping;
  floorTex.repeat.set(.17,.17);
  const darkWoodTex = woodTex(512, "dark");
  const sandBase = sandTex(512);
  const caveTex = rockTex(512, "#939a96");

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
      // 温和低频起伏：保持圆润低矮岩石穹顶，不做尖山/破碎壳
      const grow = 1 + Math.max(-0.035, Math.min(0.035, n * 0.012)) * f;
      v.setLength(r * grow);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }

  // 沙地：外观态整环 + 剖面态前方开口环带（内沿 4.1 收进地板下）
  const sandFull = new THREE.Mesh(new THREE.RingGeometry(4.4, 5.35, 72), texMat(sandBase, 1));
  sandFull.rotation.x = -Math.PI / 2;
  sandFull.position.y = -0.02;
  sandFull.receiveShadow = true;
  sandFull.visible = false;
  structureGroup.add(sandFull);

  const sandShape = new THREE.Shape();
  sandShape.absarc(0, 0, 5.35, -Math.PI / 6, (7 * Math.PI) / 6, false);
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
  const innerGeo = new THREE.SphereGeometry(4.3, 64, 28, (5 * Math.PI) / 6, (4 * Math.PI) / 3, 0, Math.PI / 2);
  displace(innerGeo, 1);
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
  // 完整的上层生活平台，前沿横向切开；不再是缺掉前方大扇区的两块三角板。
  const floorAngle = Math.asin(1.65 / 4.25);
  floorShape.moveTo(4.25 * Math.cos(floorAngle), -1.65);
  floorShape.absarc(0, 0, 4.25, -floorAngle, Math.PI+floorAngle, false);
  floorShape.closePath();
  const stairHole=new THREE.Path();
  stairHole.moveTo(2.82,.5);stairHole.lineTo(2.82,-1.25);stairHole.lineTo(3.66,-1.25);stairHole.lineTo(3.66,.5);stairHole.closePath();
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
  const pitFloor = new THREE.Mesh(new THREE.CircleGeometry(4.08, 64), texMat(sandBase, 1));
  pitFloor.rotation.x = -Math.PI / 2;
  pitFloor.position.y = -2.3;
  pitFloor.receiveShadow = true;
  structureGroup.add(pitFloor);
  const foundation=new THREE.Mesh(new THREE.CylinderGeometry(4.08,4.18,.76,72),texMat(sandBase,1));
  foundation.position.y=-2.7;foundation.receiveShadow=true;foundation.castShadow=true;structureGroup.add(foundation);

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

  // 右侧连续木台阶，从上层到地下地面；每级侧板连接，不堆叠悬空扶手。
  const stairGroup = new THREE.Group();
  const stepMat = texMat(darkWoodTex, 0.85);
  for (let i = 0; i < 8; i++) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.09, 0.34), stepMat);
    step.position.set(3.22, .01 - i * .33, -.3 + i * .18);
    step.castShadow = true;
    step.receiveShadow = true;
    stairGroup.add(step);
    if (i < 7) {
      const riser = new THREE.Mesh(new THREE.BoxGeometry(.78, .33, .04), texMat(darkWoodTex, 0.85));
      riser.position.set(3.22,.01-i*.33-.165,-.3+i*.18+.15);
      riser.castShadow = true;
      stairGroup.add(riser);
    }
  }
  const railPath=new THREE.CatmullRomCurve3([new THREE.Vector3(3.6,.76,-.4),new THREE.Vector3(3.6,-.42,.24),new THREE.Vector3(3.6,-1.55,1.02)]);
  const rail=new THREE.Mesh(new THREE.TubeGeometry(railPath,24,.028,8,false),stepMat);rail.castShadow=true;stairGroup.add(rail);
  for(const i of [0,3,7]){const post=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,.7,10),stepMat);post.position.set(3.6,.36-i*.33,-.3+i*.18);post.castShadow=true;stairGroup.add(post);}
  structureGroup.add(stairGroup);

  // 金色骨头风向标（穹顶顶）
  const vane = buildWeatherVane();
  vane.position.set(0, 4.5, 0);
  structureGroup.add(vane);
  const vaneTop = vane.userData.vaneTop;

  // 卧室小拱门
  const arch = buildArch();
  arch.position.set(3.12, 0, 1.62);
  arch.scale.setScalar(.66);
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
  fridge.position.set(-2.05, 0, -2.55);
  roomGroups.kitchen.add(fridge);
  const stove = buildStove();
  stove.position.set(-.05, 0, -2.76);
  roomGroups.kitchen.add(stove);
  const connector = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.62, 0.55), texMat(woodTex(512, "plank"), 0.8));
  connector.position.set(.69, 0.36, -2.84);
  shade(connector);
  roomGroups.kitchen.add(connector);
  const sink = buildSink();
  sink.position.set(-.93, 0, -2.79);
  sink.scale.set(.72,1.18,1);
  roomGroups.kitchen.add(sink);
  const cabinet = buildWallCabinet();
  cabinet.position.set(-.09, 2.03, -3.04);
  roomGroups.kitchen.add(cabinet);
  const fan = buildCeilingFan();
  fan.position.set(0, 4.38, -.28);
  fan.scale.setScalar(1.5);
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
  bed.position.set(2.0, 0, -.94);
  roomGroups.bedroom.add(bed);
  const pillow = buildStarPillow();
  pillow.position.set(1.75, 0.5, -1.5); // 独立候选床铺加载后改用其一体海星枕。
  roomGroups.bedroom.add(pillow);
  const nightstand = buildNightstand();
  nightstand.position.set(2.9, 0, -2.3);
  roomGroups.bedroom.add(nightstand);
  const bedLamp = buildBedLamp();
  bedLamp.position.set(2.9, 0.51, -2.3);
  bedLamp.userData.interaction = "lamp";
  roomGroups.bedroom.add(bedLamp);

  const bench = buildBenchPress();
  bench.position.set(-1.22, 0, .45);
  bench.rotation.y=.18;
  roomGroups.gym.add(bench);
  // 参考图上层的小电视与低木架；地下仍保留独立客厅电视。
  const upperTv=buildOldTv();upperTv.position.set(.48,.27,.72);upperTv.scale.setScalar(.78);
  upperTv.userData.interaction='tv';upperTv.userData.tvKind='upper';roomGroups.gym.add(upperTv);
  const upperStand=new THREE.Mesh(new THREE.BoxGeometry(.79,.08,.48),texMat(darkWoodTex,.88));upperStand.position.set(.48,.23,.72);shade(upperStand);roomGroups.gym.add(upperStand);
  for(const [x,z]of[[.17,.54],[.79,.54],[.17,.91],[.79,.91]]){const leg=new THREE.Mesh(new THREE.BoxGeometry(.055,.22,.055),texMat(darkWoodTex,.88));leg.position.set(x,.11,z);shade(leg);roomGroups.gym.add(leg);}

  // 下层：客厅围合（沙发 ↔ 电视对视，茶几居中，落地灯靠后）
  const sofa = buildSofa();
  sofa.position.set(-1.38, -2.3, -.7);
  sofa.rotation.y = .20;
  roomGroups.living.add(sofa);
  const coffeeTable = buildCoffeeTable();
  coffeeTable.position.set(-.38, -2.3, .24);
  roomGroups.living.add(coffeeTable);
  const oldTv = buildOldTv();
  oldTv.position.set(1.45, -2.3, -.97);
  oldTv.rotation.y = -.30;
  oldTv.userData.interaction = "tv";
  roomGroups.living.add(oldTv);
  const floorLamp = buildFloorLamp();
  floorLamp.position.set(-2.3, -2.3, -1.33);
  floorLamp.userData.interaction = "lamp";
  roomGroups.living.add(floorLamp);
  addReferenceDetails(roomGroups);

  /* ---------- 派大星（挂在 houseGroup，独立拾取） ---------- */
  const patrick = buildPatrick();
  patrick.userData.interaction = "patrick";
  patrick.position.set(0.15, -2.3, 0.7);
  houseGroup.add(patrick);

  let patrickBody = patrick.getObjectByName("patrick-body");
  let armL = patrick.userData.patrickArms.armL;
  let armR = patrick.userData.patrickArms.armR;
  let elbowL = armL.userData.elbow;
  let elbowR = armR.userData.elbow;
  let patrickMixer, idleAction, waveAction;

  /* ---------- 交互状态 ---------- */
  const tvOnTex = tvScreenTex(true);
  const tvOffTex = tvScreenTex(false);
  const interactState = {
    tvOn: false,
    upperTvOn:false,
    fanSpinning: false,
    bedLampOn: false,
    floorLampOn: false,
  };

  function toggleTv(target=oldTv) {
    const key=target.userData.tvKind==='upper'?'upperTvOn':'tvOn';
    const on = !interactState[key];
    interactState[key] = on;
    const screen = target.userData.tvScreenMesh;
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
  // 新臂链：肩球埋入躯干，肘为子节点；右臂自然抬-摆-放
  const REST = { rz: 0.15, el: 0.12 };
  const UP = { rz: 2.45, el: 1.05 };
  const ease = (t) => t * t * (3 - 2 * t);

  function startWave() {
    if (waveState !== "idle") return; // 连续点击不叠加
    waveState = "raise";
    waveT = 0;
    if (waveAction) {
      waveAction.reset().setLoop(THREE.LoopOnce,1);
      waveAction.clampWhenFinished=true;
      idleAction.fadeOut(.18);waveAction.fadeIn(.18).play();
    }
  }

  function updateWave(dt) {
    if (waveState === "idle") return;
    waveT += dt;
    if (patrickMixer) {
      if (waveState==='raise'&&waveT>=WAVE.raise) {waveState='wave';waveT=0;}
      else if(waveState==='wave'&&waveT>=WAVE.wave) {waveState='lower';waveT=0;}
      else if(waveState==='lower'&&waveT>=WAVE.lower) {
        waveState='idle';waveT=0;waveAction.fadeOut(.18);idleAction.reset().fadeIn(.18).play();
      }
      return;
    }
    if (waveState === "raise") {
      const k = ease(Math.min(waveT / WAVE.raise, 1));
      armR.rotation.z = REST.rz + (UP.rz - REST.rz) * k;
      elbowR.rotation.z = REST.el + (UP.el - REST.el) * k;
      if (waveT >= WAVE.raise) { waveState = "wave"; waveT = 0; }
    } else if (waveState === "wave") {
      const w = waveT * Math.PI * 2 * 1.6;
      armR.rotation.z = UP.rz + Math.sin(w) * 0.07;
      elbowR.rotation.z = UP.el + Math.sin(w + 0.9) * 0.32;
      if (waveT >= WAVE.wave) { waveState = "lower"; waveT = 0; }
    } else if (waveState === "lower") {
      const k = ease(Math.min(waveT / WAVE.lower, 1));
      armR.rotation.z = REST.rz + (UP.rz - REST.rz) * (1 - k);
      elbowR.rotation.z = REST.el + (UP.el - REST.el) * (1 - k);
      if (waveT >= WAVE.lower) { waveState = "idle"; waveT = 0; }
    }
  }

  /* ---------- 视图 ---------- */
  let mode = "cutaway";
  let activeRoom = null;
  let cameraAnim = null;
  let ready = false;

  const WHOLE_MIN = new THREE.Vector3(-5.35, -3.2, -5.1);
  const WHOLE_MAX = new THREE.Vector3(5.1, 5.7, 5.1);

  function applyFov() {
    const narrow = camera.aspect < 0.72;
    const fov = narrow ? 50 : 34;
    if (Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }

  // 按可见包围盒适配：全屋剖面/外观共用，窄屏/宽屏都完整入画
  function wholePose() {
    applyFov();
    const fov = THREE.MathUtils.degToRad(camera.fov / 2);
    const margin = 1.05;
    const target = new THREE.Vector3(0, mode === "exterior" ? 2.4 : 1.2, 0);
    const elev = mode === "exterior" ? 0.25 : 0.22;
    const direction=new THREE.Vector3(0,elev,1).normalize();
    const up=new THREE.Vector3(0,1,-elev).normalize();
    let dist=0;
    // 投影八角点并计入前后深度，近处地下断面不能因“正面宽高够了”仍被裁掉。
    for(const x of [WHOLE_MIN.x,WHOLE_MAX.x])for(const y of [mode==='exterior'?0:WHOLE_MIN.y,WHOLE_MAX.y])for(const z of [WHOLE_MIN.z,mode==='exterior'?6.9:WHOLE_MAX.z]){
      const v=new THREE.Vector3(x,y,z).sub(target);const depth=v.dot(direction);
      dist=Math.max(dist,depth+Math.abs(v.x)*margin/(Math.tan(fov)*camera.aspect),depth+Math.abs(v.dot(up))*margin/Math.tan(fov));
    }
    return {target,position:target.clone().addScaledVector(direction,dist)};
  }

  // 房间近景适配：默认视角方向 + 包围盒距离（focusRoom 用默认方向，resize 用当前方向）
  function roomPose(room, dir) {
    const target = new THREE.Vector3(...room.target);
    const w = room.bounds[1][0] - room.bounds[0][0];
    const h = room.bounds[1][1] - room.bounds[0][1];
    const tangent = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const fitBase = Math.max(w / (2 * tangent * camera.aspect), h / (2 * tangent)) * 1.08;
    // 手机窄屏下限制拉远，保持作者构图与近景质感，允许轻微裁边
    const defaultDist = new THREE.Vector3(...room.camera).sub(target).length();
    const fit = Math.min(fitBase, defaultDist * 1.3);
    const direction = dir ?? new THREE.Vector3(...room.camera).sub(target).normalize();
    // 地下房间：相机必须保持在上层楼板（y≈0）之下，避免楼板成为拾取遮挡物
    const maxCamY = room.level < 0 ? -0.2 : undefined;
    return { target, direction, fit, maxCamY };
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

  // 尺寸变化：保留用户观察方向（方位/俯仰），按当前视图重算镜头距离与目标点
  function refitView() {
    applyFov();
    if (!ready) return;
    cameraAnim = null; // 动画过渡中被改尺寸：取消旧补间，避免旧终点覆盖
    root.dataset.cameraTransition = "idle";
    controls.enabled = true;
    let target, fit;
    if (activeRoom) {
      const room = rooms.get(activeRoom);
      const pose = roomPose(room);
      target = pose.target;
      fit = pose.fit;
    } else {
      const pose = wholePose();
      target = pose.target;
      fit = pose.position.distanceTo(pose.target);
    }
    // 保留当前视角方向
    let dir = camera.position.clone().sub(controls.target);
    const len = dir.length();
    if (len < 0.001) dir.set(0, 0.2, 1);
    else dir.divideScalar(len);
    const polar = Math.acos(THREE.MathUtils.clamp(dir.y, -1, 1));
    const maxPolar = controls.maxPolarAngle;
    if (polar > maxPolar) {
      const az = Math.atan2(dir.x, dir.z);
      const p = Math.max(maxPolar, 0.01);
      dir.set(Math.sin(p) * Math.sin(az), Math.cos(p), Math.sin(p) * Math.cos(az));
    }
    controls.target.copy(target);
    camera.position.copy(target).addScaledVector(dir, fit);
    if (activeRoom) {
      const pose2 = roomPose(rooms.get(activeRoom));
      if (pose2.maxCamY !== undefined && camera.position.y > pose2.maxCamY) camera.position.y = pose2.maxCamY;
    }
    controls.update();
    updateRoomLabels();
  }

  function applyModeVisibility() {
    const ext = mode === "exterior";
    shell.visible = !ext;
    inner.visible = !ext;
    floor.visible = !ext;
    pitWall.visible = !ext;
    pitFloor.visible = !ext;
    foundation.visible = !ext;
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
    const pose = roomPose(room);
    const position = pose.target.clone().addScaledVector(pose.direction, pose.fit);
    if (pose.maxCamY !== undefined && position.y > pose.maxCamY) position.y = pose.maxCamY;
    tweenCamera(position, pose.target);
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
    // 只考虑当前可见的遮挡物：剖面模式下 extShell 隐藏，不能参与遮挡判定；
    // 递归收集可见网格（外壳/内壁/楼板可能是组合体）
    const blockers = [];
    for (const o of occluders) {
      if (o.visible) o.traverse((n) => { if (n.isMesh && visibleChain(n)) blockers.push(n); });
    }
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
      if (kind === "tv") toggleTv(result.node);
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
    const w = Math.max(1, root.clientWidth);
    const h = Math.max(1, root.clientHeight);
    if (w === viewWidth && h === viewHeight) return;
    viewWidth = w;
    viewHeight = h;
    camera.aspect = w / h;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
    renderer.setSize(w, h, false);
    refitView();
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
      button.style.left = `${x}px`;
      button.style.top = `${y}px`;
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

  /* ---------- 启动：GPU 网格、嵌入贴图、参考画作全部成功加载后才 ready ---------- */
  (async () => { try {
    const gltfLoader=new GLTFLoader();
    const targets={fridge,stove,bed,armchair:sofa,'old-tv':oldTv,patrick};
    const assets=config.assets??[];
    const loaded=await Promise.all(assets.map(async spec=>({spec,gltf:await gltfLoader.loadAsync(spec.url)})));
    for(const {spec,gltf}of loaded){
      const group=targets[spec.id];if(!group)continue;
      // 交互屏面独立于 GPU 机箱，不使木壳一起发光。
      const screen=spec.id==='old-tv'?group.userData.tvScreenMesh:null;
      group.clear();group.add(gltf.scene);
      gltf.scene.traverse(n=>{if(n.isMesh){n.castShadow=true;n.receiveShadow=true;}});
      group.userData.assetSource='Hunyuan3D Shape/Paint + Blender refinement';
      if(screen){
        screen.position.set(-.06,.38,.24);screen.scale.set(.91,1.3,1);group.add(screen);group.userData.tvScreenMesh=screen;
        const secondScreen=upperTv.userData.tvScreenMesh;
        upperTv.clear();upperTv.add(gltf.scene.clone(true));
        secondScreen.position.copy(screen.position);secondScreen.scale.copy(screen.scale);upperTv.add(secondScreen);upperTv.userData.tvScreenMesh=secondScreen;
      }
      if(spec.id==='bed')pillow.visible=false;
      if(spec.id==='patrick'){
        patrickBody=gltf.scene;
        armL=gltf.scene.getObjectByName('patrick_arm_L');armR=gltf.scene.getObjectByName('patrick_arm_R');
        elbowL=gltf.scene.getObjectByName('patrick_forearm_L');elbowR=gltf.scene.getObjectByName('patrick_forearm_R');
        if(!armL||!armR||!elbowL||!elbowR)throw new Error('派大星骨架缺失');
        patrickMixer=new THREE.AnimationMixer(gltf.scene);
        const idle=gltf.animations.find(a=>a.name==='idle');const wave=gltf.animations.find(a=>a.name==='wave');
        if(!idle||!wave)throw new Error('派大星待机或招手片段缺失');
        idleAction=patrickMixer.clipAction(idle);waveAction=patrickMixer.clipAction(wave);idleAction.play();
      }
    }
    await Promise.all(artReady);
    collectPickables();
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
  } })();

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
    if (patrickMixer) patrickMixer.update(delta);
    else { patrickBody.scale.set(
      1 + Math.sin(elapsed * 1.9) * 0.01,
      1 + Math.sin(elapsed * 1.9) * 0.014,
      1 + Math.sin(elapsed * 1.9 + 0.7) * 0.01,
    );
    patrickBody.rotation.z = Math.sin(elapsed * 2.2) * 0.01;
    if (waveState === "idle") {
      armL.rotation.z = -REST.rz + Math.sin(elapsed * 1.6) * 0.045;
      armR.rotation.z = REST.rz + Math.sin(elapsed * 1.6 + 0.8) * 0.045;
      elbowL.rotation.z = -REST.el + Math.sin(elapsed * 1.3) * 0.05;
      elbowR.rotation.z = REST.el + Math.sin(elapsed * 1.3 + 0.6) * 0.05;
    }
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
      elbowRz: elbowR.rotation.z,
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
