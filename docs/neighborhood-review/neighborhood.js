import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// ========== DOM ==========
const wrap = document.getElementById('canvas-wrap');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error-panel');
const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');
const infoMeta = document.getElementById('info-meta');
const btnExit = document.getElementById('btn-exit');
const btnReset = document.getElementById('btn-reset');
const chipsHost = document.getElementById('room-chips');
const hintEl = document.querySelector('.controls-hint');
const infoPanel = document.getElementById('info-panel');

// ========== Config ==========
let config = null;
async function loadConfig() {
  const res = await fetch('./config/house-config.json?v=20261013-squidward-v7-final');
  if (!res.ok) throw new Error('config load ' + res.status);
  config = await res.json();
}

// ========== Renderer / Scene ==========
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffeed0);
scene.fog = new THREE.Fog(0xffeed0, 18, 42);

const camera = new THREE.PerspectiveCamera(32, wrap.clientWidth / wrap.clientHeight, 0.1, 120);
camera.position.set(0, 2, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(wrap.clientWidth, wrap.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.localClippingEnabled = true;
wrap.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2 + 0.12;

// Lights (菠萝屋色彩管理/柔和主光补光为起点)
scene.add(new THREE.HemisphereLight(0xf2f0df, 0x455144, 1.25));
const key = new THREE.DirectionalLight(0xfff2d2, 2.2);
key.position.set(-4, 8, 7);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.bias = -0.0004;
key.shadow.normalBias = 0.02;
scene.add(key, key.target);
const fill = new THREE.DirectionalLight(0xd1edff, 0.55);
fill.position.set(-5, 4, -4);
scene.add(fill);
const frontFill = new THREE.DirectionalLight(0xe3eadf, 1.2);
frontFill.position.set(1, 4, 8);
scene.add(frontFill);

const ground = new THREE.Mesh(
  new THREE.CircleGeometry(2.25, 80),
  new THREE.MeshStandardMaterial({ color: 0xbcb08a, roughness: 0.98 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Composer with SSAO
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const ssaoPass = new SSAOPass(scene, camera, wrap.clientWidth, wrap.clientHeight);
ssaoPass.kernelRadius = 0.4;
ssaoPass.minDistance = 0.002;
ssaoPass.maxDistance = 0.09;
composer.addPass(ssaoPass);
composer.addPass(new OutputPass());

// ========== Groups ==========
const extGroup = new THREE.Group();
const intGroup = new THREE.Group();
scene.add(extGroup, intGroup);
intGroup.visible = false;

// ========== State ==========
const state = {
  house: 'squidward',
  view: 'exterior',      // exterior | cutaway | room
  roomId: null,
  tier: 'desktop',
  extMesh: null,
  intMesh: null,
  shift: new THREE.Vector3(),
  doorMeshes: [],       // 室内门网格（intGroup）
  extDoorMeshes: [],    // 外观门网格（extGroup）
  extTris: 0,
  intTris: 0,
  camAnim: null,
  doorAnim: null,
};
let loadGen = 0;
const cache = new Map(); // `${house}:${tier}` -> {ext, int, shift, doorMeshes, extTris, intTris}
let failInfo = null;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// ========== Helpers ==========
function countTris(root) {
  // 显示口径：索引数量（无索引时按 position/3）
  let t = 0;
  root.traverse(o => {
    if (!o.isMesh || !o.geometry) return;
    const g = o.geometry;
    t += g.index ? g.index.count : (g.attributes.position ? g.attributes.position.count : 0);
  });
  return Math.round(t / 3);
}

function setCam(pos, tgt, dur) {
  state.camAnim = {
    fromPos: camera.position.clone(),
    fromTgt: controls.target.clone(),
    toPos: pos.clone(),
    toTgt: tgt.clone(),
    start: performance.now(),
    dur: dur || 800,
  };
  controls.enabled = false;
}

function frameWhole(box) {
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const fov = THREE.MathUtils.degToRad(camera.fov);
  const distH = size.y / (2 * Math.tan(fov / 2));
  const distW = size.x / (2 * Math.tan(fov / 2) * camera.aspect);
  const dist = Math.max(distH, distW) * config.camera.wholePadding;
  const pitch = config.camera.pitch;
  const position = new THREE.Vector3(
    center.x,
    center.y + dist * Math.sin(pitch),
    center.z + dist
  );
  const target = new THREE.Vector3(center.x, center.y, center.z);
  return { position, target };
}

function fitShadow(box) {
  const s = box.getSize(new THREE.Vector3());
  const c = box.getCenter(new THREE.Vector3());
  const r = Math.max(s.x, s.y, s.z) * 1.2;
  Object.assign(key.shadow.camera, {
    left: -r, right: r, top: r, bottom: -r, near: 0.5, far: 40,
  });
  key.shadow.camera.updateProjectionMatrix();
  key.target.position.copy(c);
}

function showLoading(on) { loadingEl.style.display = on ? 'block' : 'none'; }
function showError(url) {
  failInfo = url;
  errorEl.hidden = false;
  showLoading(false);
}
function hideError() { errorEl.hidden = true; failInfo = null; }

// 移动端把操作提示排在信息卡上方（按信息卡内容高度定位），避免遮挡说明文字
function layoutHint() {
  if (!hintEl) return;
  if (state.tier === 'mobile' && infoPanel) {
    hintEl.style.bottom = Math.round(infoPanel.getBoundingClientRect().height) + 24 + 'px';
  } else {
    hintEl.style.bottom = '';
  }
}

function setInfo(title, desc, extraMeta) {
  infoTitle.textContent = title;
  infoDesc.textContent = desc;
  const cfg = config.houses[state.house];
  const tris = state.view === 'exterior' ? state.extTris : (state.intTris || state.extTris);
  infoMeta.innerHTML =
    `三角面(索引): ${tris.toLocaleString()}<br>` +
    `任务: ${cfg.jobId}<br>状态: review` +
    (extraMeta ? `<br>${extraMeta}` : '');
  layoutHint();
}
document.querySelector('.production-record').addEventListener('toggle', layoutHint);

// ========== 外观材质增强（运行时画布纹理 + 舷窗框/玻璃，不改 GLB） ==========
function makeStoneTexture() {
  const S = 256;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');
  g.fillStyle = '#e9eff3';
  g.fillRect(0, 0, S, S);
  const dots = [];
  for (let i = 0; i < 2200; i++) dots.push([Math.random() * S, Math.random() * S, 0.8 + Math.random() * 2.2, 0.08 + Math.random() * 0.15]);
  for (const [x, y, r, a] of dots) {
    g.fillStyle = 'rgba(88,118,143,' + a + ')';
    for (const ox of [0, S, -S]) for (const oy of [0, S, -S]) { g.beginPath(); g.arc(x + ox, y + oy, r, 0, Math.PI * 2); g.fill(); }
  }
  const lights = [];
  for (let i = 0; i < 1300; i++) lights.push([Math.random() * S, Math.random() * S, 0.5 + Math.random() * 1.1, 0.10 + Math.random() * 0.14]);
  for (const [x, y, r, a] of lights) {
    g.fillStyle = 'rgba(255,255,255,' + a + ')';
    for (const ox of [0, S, -S]) for (const oy of [0, S, -S]) { g.beginPath(); g.arc(x + ox, y + oy, r, 0, Math.PI * 2); g.fill(); }
  }
  for (let i = 0; i < 26; i++) {
    const y = Math.random() * S;
    g.fillStyle = 'rgba(66,96,121,0.10)';
    g.fillRect(0, y, S, 1 + Math.random() * 2);
    g.fillStyle = 'rgba(255,255,255,0.06)';
    g.fillRect(0, (y + 3) % S, S, 1);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function setCylindricalUv(geom) {
  // 外壳为旋转体：圆柱映射 (θ, y)，石材纹理沿壳面连续
  const pos = geom.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (Math.atan2(pos.getZ(i), pos.getX(i)) / (Math.PI * 2) + 0.5) * 2;
    uv[i * 2 + 1] = pos.getY(i) * 0.85;
  }
  geom.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
}

function setPlanarUv(geom) {
  const pos = geom.attributes.position;
  const box = new THREE.Box3();
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) { v.fromBufferAttribute(pos, i); box.expandByPoint(v); }
  const size = box.getSize(new THREE.Vector3());
  const s = Math.max(size.x, size.y, size.z) || 1;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) - box.min.x) / s;
    uv[i * 2 + 1] = (pos.getY(i) - box.min.y) / s;
  }
  geom.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
}

const extPatched = new WeakSet();
function applyExteriorMaterials(root) {
  if (extPatched.has(root)) return;
  extPatched.add(root);
  const stoneTex = makeStoneTexture();
  stoneTex.repeat.set(1.2, 1);
  root.traverse(o => {
    if (!o.isMesh) return;
    // GLTFLoader 对多 primitive 节点追加 _1/_2 后缀（shell_main、shell_cutaway_cover 均含内外壁两个 primitive）
    const isShell = /^shell_main(_\d+)?$/.test(o.name) || /^shell_cutaway_cover(_\d+)?$/.test(o.name);
    const isFace = /^shell_(eyebrow|porthole_L|porthole_R|nose|ear_L|ear_R)(_\d+)?$/.test(o.name);
    if (!isShell && !isFace) return;
    if (!o.geometry.attributes.uv) {
      if (isShell) setCylindricalUv(o.geometry);
      else setPlanarUv(o.geometry);
    }
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    for (const m of mats) {
      if (!m || m.userData.stonePatched || m.map) continue;
      m.userData.stonePatched = true;
      m.map = stoneTex;
      m.needsUpdate = true;
    }
  });
  addPortholeDetails(root);
}

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

// ========== Loading ==========
function keyFor(house, tier) { return house + ':' + tier; }

function normalizeAndAttach(sceneObj) {
  const box = new THREE.Box3().setFromObject(sceneObj);
  const c = box.getCenter(new THREE.Vector3());
  const min = box.min;
  sceneObj.position.set(-c.x, -min.y, -c.z);
  state.shift.set(-c.x, -min.y, -c.z);
  sceneObj.traverse(o => {
    if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
  });
  fitShadow(box);
  return box;
}

function loadExterior(gen) {
  hideError();
  showLoading(true);
  const cfg = config.houses[state.house];
  document.getElementById('btn-cutaway').hidden = !cfg.hasInterior;
  const model = cfg.models[state.tier];
  extGroup.clear();
  state.extMesh = null;
  const cached = cache.get(keyFor(state.house, state.tier));
  if (cached && cached.ext) {
    state.extMesh = cached.ext;
    state.shift.copy(cached.shift);
    state.extTris = cached.extTris;
    state.extDoorMeshes = cached.extDoorMeshes || [];
    extGroup.add(state.extMesh);
    applyExteriorMaterials(state.extMesh);
    showLoading(false);
    enterExterior();
    return;
  }
  loader.load(model.url + '?' + config.cacheBust, gltf => {
    if (gen !== loadGen) return; // 过期代际：丢弃旧结果
    try {
    const sceneObj = gltf.scene;
    normalizeAndAttach(sceneObj);
    state.extMesh = sceneObj;
    state.extTris = countTris(sceneObj);
    // 收集外观门网格（与室内门同名），射线直接对门网格求交
    state.extDoorMeshes = [];
    const names = cfg.door.meshNames || [];
    sceneObj.traverse(o => { if (o.isMesh && names.includes(o.name)) state.extDoorMeshes.push(o); });
    extGroup.add(sceneObj);
    applyExteriorMaterials(sceneObj);
    if (!cache.has(keyFor(state.house, state.tier))) cache.set(keyFor(state.house, state.tier), {});
    const c = cache.get(keyFor(state.house, state.tier));
    c.ext = sceneObj; c.shift = state.shift.clone(); c.extTris = state.extTris;
    c.extDoorMeshes = state.extDoorMeshes;
    console.log('[neighborhood] exterior loaded', state.extTris, 'tris, doors=', state.extDoorMeshes.length);
    showLoading(false);
    enterExterior();
    } catch (err) {
      console.error('[neighborhood] handler exception', err && err.stack);
      throw err;
    }
  }, undefined, (ev) => {
    if (gen !== loadGen) return;
    console.error('[neighborhood] exterior load failed', model.url, (ev && ev.message), (ev && ev.error && ev.error.stack));
    showError(model.url);
  });
}

function loadInterior(gen, done) {
  const cfg = config.houses[state.house];
  console.log('[neighborhood] loadInterior', state.house, 'hasInterior=', cfg.hasInterior, 'gen=', gen, 'cur=', loadGen);
  if (!cfg.hasInterior || !cfg.models[state.tier].interiorUrl) { done(false); return; }
  const cached = cache.get(keyFor(state.house, state.tier));
  if (cached && cached.int) {
    state.intMesh = cached.int;
    state.doorMeshes = cached.doorMeshes || [];
    state.intTris = cached.intTris;
    intGroup.add(state.intMesh);
    done(true);
    return;
  }
  showLoading(true);
  const url = cfg.models[state.tier].interiorUrl + '?' + config.cacheBust;
  loader.load(url, gltf => {
    if (gen !== loadGen) return;
    const sceneObj = gltf.scene;
    sceneObj.traverse(o => {
      if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
    });
    // 门网格：按配置名收集，射线只对门网格本身
    state.doorMeshes = [];
    const names = cfg.door.meshNames || [];
    sceneObj.traverse(o => { if (o.isMesh && names.includes(o.name)) state.doorMeshes.push(o); });
    state.intMesh = sceneObj;
    state.intTris = countTris(sceneObj);
    intGroup.add(sceneObj);
    const c = cache.get(keyFor(state.house, state.tier)) || {};
    c.int = sceneObj; c.doorMeshes = state.doorMeshes; c.intTris = state.intTris;
    cache.set(keyFor(state.house, state.tier), c);
    showLoading(false);
    done(true);
  }, undefined, () => {
    if (gen !== loadGen) return;
    showError(url);
    done(false);
  });
}

// ========== Views ==========
function setShellVisible(visible) {
  const prefix = config.houses[state.house].shellPrefix || 'shell_';
  if (!state.extMesh) return;
  state.extMesh.traverse(o => {
    if (o.isMesh && o.name.startsWith(prefix)) o.visible = visible;
  });
}

function setRoomFurnitureVisible(roomId) {
  // roomId=null 显示全部家具；否则只显示该房间前缀 + art_，其他房间家具隐藏。
  // 房间近景时按 hideFloors 隐藏当前房间上方的楼板（保留楼梯/门逻辑），返回后恢复。
  const cfg = config.houses[state.house];
  if (!state.intMesh) return;
  const room = roomId ? cfg.rooms.find(r => r.id === roomId) : null;
  const hideFloors = room && Array.isArray(room.hideFloors) ? room.hideFloors : [];
  const level = room ? cfg.rooms.indexOf(room) : -1;
  const section = level >= 0 ? [
    new THREE.Plane(new THREE.Vector3(0, 1, 0), -[0, 1.08, 2.28, 3.48][level] - state.shift.y),
    new THREE.Plane(new THREE.Vector3(0, -1, 0), [1.2, 2.4, 3.6, 4.62][level] + state.shift.y),
  ] : [];
  state.intMesh.traverse(o => {
    if (!o.isMesh) return;
    for (const material of (Array.isArray(o.material) ? o.material : [o.material])) {
      if (!material) continue;
      const changed = (material.clippingPlanes?.length || 0) !== section.length;
      material.clippingPlanes = section;
      material.clipShadows = !!room;
      if (changed) material.needsUpdate = true;
    }
    // 楼梯始终可见
    if (o.name.startsWith('stairs_')) { o.visible = true; return; }
    if (o.name.startsWith('wall_')) { o.visible = true; return; }
    // 楼板：房间近景按配置隐藏当前层上方的遮挡楼板
    if (o.name.startsWith('floor_')) { o.visible = !hideFloors.includes(o.name); return; }
    // 门组：房间近景时整体隐藏（frame/panel/handle 都不挡视线）；剖切全局时显示
    if (o.name.startsWith('door_')) { o.visible = !roomId; return; }
    if (!roomId) { o.visible = true; return; }
    const prefix = room && room.prefix;
    o.visible = !!prefix && (o.name.startsWith(prefix) || o.name.startsWith('art_'));
  });
}

function enterExterior() {
  ground.visible = true;
  ssaoPass.enabled = config.tiers[state.tier].ssao;
  state.view = 'exterior';
  state.roomId = null;
  setShellVisible(true);
  setRoomFurnitureVisible(null);
  intGroup.visible = false;
  extGroup.visible = true;
  btnExit.style.display = 'none';
  const cfg = config.houses[state.house];
  const box = new THREE.Box3().setFromObject(state.extMesh);
  const f = frameWhole(box);
  setCam(f.position, f.target, 700);
  setInfo(cfg.title, cfg.desc + (cfg.hasInterior ? ' 点击木门或「查看剖面」进入。' : ''), '');
  document.querySelectorAll('.top-bar > button').forEach(b => b.classList.remove('active'));
  document.getElementById('btn-' + state.house).classList.add('active');
  chipsHost.hidden = true;
  maybeAutotest();
}

// 自测钩子：?autotest=cutaway | room-kitchen | room-living | room-bedroom | room-gallery
let autotestFired = false;
function maybeAutotest() {
  if (autotestFired) return;
  const at = new URLSearchParams(location.search).get('autotest');
  if (!at) return;
  autotestFired = true;
  if (at === 'cutaway') {
    setTimeout(() => tryEnterInterior(), 400);
  } else if (at.startsWith('room-')) {
    const roomId = at.slice(5);
    setTimeout(() => tryEnterInterior(() => setTimeout(() => enterRoom(roomId), 600)), 400);
  }
}

function cutawayPose() {
  const box = new THREE.Box3().setFromObject(state.extMesh);
  const size = box.getSize(new THREE.Vector3());
  const target = new THREE.Vector3(0, 2.3, 0).add(state.shift);
  const vfov = THREE.MathUtils.degToRad(camera.fov);
  const distance = Math.max(size.y / (2 * Math.tan(vfov / 2)), size.x / (2 * Math.tan(vfov / 2) * camera.aspect)) * 1.38;
  const position = target.clone().add(new THREE.Vector3(-0.5, 0.55, 0.8).normalize().multiplyScalar(distance));
  return { position, target };
}

function enterCutaway() {
  ground.visible = true;
  ssaoPass.enabled = config.tiers[state.tier].ssao;
  state.view = 'cutaway';
  state.roomId = null;
  // 隐藏整个外壳组（外壳+结构），内部组（结构+家具）接管显示
  extGroup.visible = false;
  intGroup.visible = true;
  setRoomFurnitureVisible(null);
  btnExit.style.display = '';
  const cfg = config.houses[state.house];
  const pose = cutawayPose();
  setCam(pose.position, pose.target, 900);
  setInfo(cfg.title + ' · 内部剖切', '前侧外壳已切去：四层空间同时可见。点击房间进入近景，Esc 返回。', '');
  chipsHost.hidden = false;
}

function enterRoom(roomId) {
  const cfg = config.houses[state.house];
  const room = cfg.rooms.find(r => r.id === roomId);
  if (!room) return;
  ground.visible = false;
  ssaoPass.enabled = false;
  state.view = 'room';
  state.roomId = roomId;
  setRoomFurnitureVisible(roomId);
  const target = new THREE.Vector3(...room.target).add(state.shift);
  const basePosition = new THREE.Vector3(...room.camera).add(state.shift);
  const direction = basePosition.sub(target).normalize();
  const vfov = THREE.MathUtils.degToRad(camera.fov);
  const distance = Math.max(1.05 / (2 * Math.tan(vfov / 2)), 2.3 / (2 * Math.tan(vfov / 2) * camera.aspect)) * 1.25;
  const position = target.clone().add(direction.multiplyScalar(distance));
  setCam(position, target, 800);
  setInfo(cfg.title + ' · ' + room.name, '近景镜头。Esc 或「返回外部」回到全屋剖切。', '');
  chipsHost.hidden = true;
}

function exitInterior() {
  if (state.view === 'room') { enterCutaway(); return; }
  if (state.view === 'cutaway') { enterExterior(); }
}

function resetView() {
  if (state.view === 'exterior') {
    const box = new THREE.Box3().setFromObject(state.extMesh);
    const f = frameWhole(box); setCam(f.position, f.target, 600);
  } else if (state.view === 'cutaway') {
    const pose = cutawayPose(); setCam(pose.position, pose.target, 600);
  } else if (state.view === 'room' && state.roomId) {
    enterRoom(state.roomId);
  }
}

// ========== House switch ==========
function switchHouse(house) {
  if (house === state.house && state.extMesh) { enterExterior(); return; }
  const gen = ++loadGen;
  state.house = house;
  state.view = 'exterior';
  state.roomId = null;
  intGroup.visible = false;
  intGroup.clear();
  state.intMesh = null; state.doorMeshes = []; state.intTris = 0;
  state.extMesh = null;
  buildChips(); // 切换房屋后按新房屋重建房间标签（直达 URL 场景）
  loadExterior(gen);
}

// ========== Door / room picking ==========
function pickAt(clientX, clientY) {
  const rect = wrap.getBoundingClientRect();
  pointer.set(
    (clientX - rect.left) / rect.width * 2 - 1,
    -(clientY - rect.top) / rect.height * 2 + 1
  );
  raycaster.setFromCamera(pointer, camera);
  return raycaster;
}

let pendingInteriorGen = null;
function tryEnterInterior(done) {
  if (!state.extMesh || pendingInteriorGen === loadGen) return;
  const gen = loadGen;
  pendingInteriorGen = gen;
  loadInterior(gen, ok => {
    if (pendingInteriorGen === gen) pendingInteriorGen = null;
    if (!ok) return;
    // 开门动画
    if (state.doorMeshes.length) {
      const panel = state.doorMeshes.find(m => m.name === 'door_panel') || state.doorMeshes[0];
      panel.rotation.y = 0;
      state.doorAnim = { from: panel.rotation.y, to: -Math.PI / 2.2, start: performance.now(), dur: 900, mesh: panel };
    }
    enterCutaway();
    if (done) done();
  });
}

function onCanvasClick(e) {
  if (!state.extMesh && !state.intMesh) return;
  const ray = pickAt(e.clientX, e.clientY);
  if (state.view === 'exterior') {
    const cfg = config.houses[state.house];
    if (!cfg.hasInterior || !state.extDoorMeshes.length) return;
    // 射线只对门网格求交（door_frame/door_panel/door_handle），命中即触发进入
    const hits = ray.intersectObjects(state.extDoorMeshes, false);
    if (hits.length) tryEnterInterior();
  } else if (state.view === 'cutaway') {
    const hits = ray.intersectObject(state.intMesh, true);
    if (!hits.length) return;
    const cfg = config.houses[state.house];
    const local = hits[0].point.clone().sub(state.shift);
    for (const room of cfg.rooms) {
      const b = room.bounds;
      if (
        local.x >= b[0][0] && local.x <= b[1][0] &&
        local.y >= b[0][1] && local.y <= b[1][1] &&
        local.z >= b[0][2] && local.z <= b[1][2]
      ) { enterRoom(room.id); return; }
    }
  }
}

// ========== Pointer events (drag vs click) ==========
// 拾取仅绑定在渲染 canvas 上，排除 UI 控件（按钮/chip/提示/信息卡）触发的场景点击
const canvasEl = renderer.domElement;
let downPos = null;
canvasEl.addEventListener('pointerdown', e => { downPos = { x: e.clientX, y: e.clientY }; });
canvasEl.addEventListener('pointerup', e => {
  if (!downPos) return;
  const dx = e.clientX - downPos.x, dy = e.clientY - downPos.y;
  downPos = null;
  if (Math.hypot(dx, dy) > 6) return;
  onCanvasClick(e);
});

// Hover cursor on door (exterior) / room slice (cutaway)
canvasEl.addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return;
  const ray = pickAt(e.clientX, e.clientY);
  let hot = false;
  if (state.view === 'exterior' && state.extDoorMeshes.length) {
    const hits = ray.intersectObjects(state.extDoorMeshes, false);
    hot = hits.length > 0;
  } else if (state.view === 'cutaway' && state.intMesh) {
    const hits = ray.intersectObject(state.intMesh, true);
    if (hits.length) {
      const local = hits[0].point.clone().sub(state.shift);
      hot = config.houses[state.house].rooms.some(room => {
        const b = room.bounds;
        return local.x >= b[0][0] && local.x <= b[1][0] &&
               local.y >= b[0][1] && local.y <= b[1][1] &&
               local.z >= b[0][2] && local.z <= b[1][2];
      });
    }
  }
  wrap.classList.toggle('pointer-hover', hot);
});

// ========== UI bindings ==========
document.getElementById('btn-squidward').addEventListener('click', () => switchHouse('squidward'));
document.getElementById('btn-patrick').addEventListener('click', () => switchHouse('patrick'));
document.getElementById('btn-cutaway').addEventListener('click', () => tryEnterInterior());
btnExit.addEventListener('click', exitInterior);
btnReset.addEventListener('click', resetView);
errorEl.querySelector('button').addEventListener('click', () => {
  errorEl.hidden = true;
  const gen = ++loadGen;
  loadExterior(gen);
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && state.view !== 'exterior') exitInterior();
});

// Room chips
const chipMap = new Map();
function buildChips() {
  chipsHost.replaceChildren();
  chipMap.clear();
  const cfg = config.houses[state.house];
  for (const room of cfg.rooms) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'room-chip';
    b.textContent = room.name;
    b.addEventListener('click', () => enterRoom(room.id));
    chipsHost.appendChild(b);
    chipMap.set(room.id, b);
  }
}
function projectChips() {
  if (chipsHost.hidden || state.view !== 'cutaway') return;
  const w = wrap.clientWidth, h = wrap.clientHeight;
  // 底部悬浮层（信息卡/操作提示）矩形：落进其区域的 chip 上移到最高上沿之上，避免被遮挡不可点击
  let obstacleTop = 0;
  if (state.tier === 'mobile' && infoPanel) {
    obstacleTop = infoPanel.getBoundingClientRect().top;
    const hr = hintEl ? hintEl.getBoundingClientRect() : null;
    if (hr && hr.height > 0) obstacleTop = Math.min(obstacleTop, hr.top);
  }
  for (const room of config.houses[state.house].rooms) {
    const el = chipMap.get(room.id);
    if (!el) continue;
    const p = new THREE.Vector3(...room.label).add(state.shift).project(camera);
    el.hidden = p.z > 1 || Math.abs(p.x) > 1 || Math.abs(p.y) > 1;
    let cx = (p.x * 0.5 + 0.5) * w;
    let cy = (-p.y * 0.5 + 0.5) * h;
    if (obstacleTop && cy + el.offsetHeight / 2 > obstacleTop) cy = obstacleTop - el.offsetHeight / 2 - 6;
    el.style.left = cx + 'px';
    el.style.top = cy + 'px';
  }
}

// ========== Resize ==========
window.addEventListener('resize', () => {
  if (config) {
    state.tier = window.innerWidth < config.tiers.mobileMaxWidth ? 'mobile' : 'desktop';
    ssaoPass.enabled = config.tiers[state.tier].ssao;
  }
  camera.aspect = wrap.clientWidth / wrap.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  composer.setSize(wrap.clientWidth, wrap.clientHeight);
  layoutHint();
  if (state.extMesh) resetView();
});

// ========== Loop ==========
function animate() {
  requestAnimationFrame(animate);
  if (state.camAnim) {
    const a = state.camAnim;
    const t = Math.min(1, (performance.now() - a.start) / a.dur);
    const e = 1 - Math.pow(1 - t, 3);
    camera.position.lerpVectors(a.fromPos, a.toPos, e);
    controls.target.lerpVectors(a.fromTgt, a.toTgt, e);
    if (t >= 1) { state.camAnim = null; controls.enabled = true; }
  }
  if (state.doorAnim) {
    const a = state.doorAnim;
    const t = Math.min(1, (performance.now() - a.start) / a.dur);
    const e = 1 - Math.pow(1 - t, 3);
    a.mesh.rotation.y = a.from + (a.to - a.from) * e;
    if (t >= 1) state.doorAnim = null;
  }
  controls.update();
  projectChips();
  composer.render();
}

// ========== Boot ==========
const loader = new GLTFLoader();
(async function main() {
  await loadConfig();
  state.tier = window.innerWidth < config.tiers.mobileMaxWidth ? 'mobile' : 'desktop';
  ssaoPass.enabled = config.tiers[state.tier].ssao;
  const params = new URLSearchParams(location.search);
  const startHouse = params.get('house') === 'patrick' ? 'patrick' : 'squidward';
  state.house = startHouse;
  buildChips();
  const gen = ++loadGen;
  loadExterior(gen);
  animate();
})().catch(err => {
  showLoading(false);
  showError('init: ' + err.message);
});

// 自测/验收接口
window.__neighborhood = {
  get state() { return state; },
  get camera() { return camera; },
  get renderer() { return renderer; },
  enterExterior, enterCutaway, enterRoom, exitInterior, resetView,
  switchHouse,
};
