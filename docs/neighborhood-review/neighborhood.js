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

// ========== Config ==========
let config = null;
async function loadConfig() {
  const res = await fetch('./config/house-config.json');
  if (!res.ok) throw new Error('config load ' + res.status);
  config = await res.json();
}

// ========== Renderer / Scene ==========
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa8d4e6);
scene.fog = new THREE.Fog(0xa8d4e6, 14, 34);

const camera = new THREE.PerspectiveCamera(38, wrap.clientWidth / wrap.clientHeight, 0.1, 120);
camera.position.set(0, 2, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(wrap.clientWidth, wrap.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
wrap.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2 + 0.12;

// Lights (菠萝屋色彩管理/柔和主光补光为起点)
scene.add(new THREE.HemisphereLight(0xf2f6e8, 0x8a7a5a, 1.05));
const key = new THREE.DirectionalLight(0xfff2d2, 2.2);
key.position.set(4, 8, 6);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.bias = -0.0004;
key.shadow.normalBias = 0.02;
scene.add(key, key.target);
const fill = new THREE.DirectionalLight(0xd1edff, 0.55);
fill.position.set(-5, 4, -4);
scene.add(fill);

const ground = new THREE.Mesh(
  new THREE.CircleGeometry(12, 64),
  new THREE.MeshStandardMaterial({ color: 0xd4c89a, roughness: 0.95 })
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
  doorMeshes: [],
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

function setInfo(title, desc, extraMeta) {
  infoTitle.textContent = title;
  infoDesc.textContent = desc;
  const cfg = config.houses[state.house];
  const tris = state.view === 'exterior' ? state.extTris : (state.intTris || state.extTris);
  infoMeta.innerHTML =
    `三角面(索引): ${tris.toLocaleString()}<br>` +
    `任务: ${cfg.jobId.slice(0, 8)}…<br>状态: review` +
    (extraMeta ? `<br>${extraMeta}` : '');
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
  const model = cfg.models[state.tier];
  extGroup.clear();
  state.extMesh = null;
  const cached = cache.get(keyFor(state.house, state.tier));
  if (cached && cached.ext) {
    state.extMesh = cached.ext;
    state.shift.copy(cached.shift);
    state.extTris = cached.extTris;
    extGroup.add(state.extMesh);
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
    extGroup.add(sceneObj);
    if (!cache.has(keyFor(state.house, state.tier))) cache.set(keyFor(state.house, state.tier), {});
    const c = cache.get(keyFor(state.house, state.tier));
    c.ext = sceneObj; c.shift = state.shift.clone(); c.extTris = state.extTris;
    console.log('[neighborhood] exterior loaded', state.extTris, 'tris');
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
    showLoading(url);
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
  // roomId=null 显示全部家具；否则只显示该房间前缀 + art_，其他房间家具隐藏
  const cfg = config.houses[state.house];
  if (!state.intMesh) return;
  state.intMesh.traverse(o => {
    if (!o.isMesh) return;
    // 结构件始终可见
    if (o.name.startsWith('floor_') || o.name.startsWith('stairs_')) {
      o.visible = true; return;
    }
    // 门：frame/handle 始终可见；panel 在房间近景时隐藏（不挡视线）
    if (o.name === 'door_panel') { o.visible = !roomId; return; }
    if (o.name.startsWith('door_')) { o.visible = true; return; }
    if (!roomId) { o.visible = true; return; }
    const room = cfg.rooms.find(r => r.id === roomId);
    const prefix = room && room.prefix;
    o.visible = !!prefix && (o.name.startsWith(prefix) || o.name.startsWith('art_'));
  });
}

function enterExterior() {
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
  setInfo(cfg.title, cfg.desc + ' 点击木门进入。', '');
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
  // 新 GLB：垂直堆叠四层，正门朝 +Z。从正前偏上看，四层同时可读
  const target = new THREE.Vector3(0, 2.3, 0).add(state.shift);
  const position = new THREE.Vector3(0, 3.6, 6.8).add(state.shift);
  return { position, target };
}

function enterCutaway() {
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
  state.view = 'room';
  state.roomId = roomId;
  setRoomFurnitureVisible(roomId);
  const target = new THREE.Vector3(...room.target).add(state.shift);
  const position = new THREE.Vector3(...room.camera).add(state.shift);
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

function tryEnterInterior(done) {
  const gen = loadGen;
  loadInterior(gen, ok => {
    if (!ok) return;
    // 开门动画
    if (state.doorMeshes.length) {
      const panel = state.doorMeshes.find(m => m.name === 'door_panel') || state.doorMeshes[0];
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
    const hits = ray.intersectObject(state.extMesh, true);
    if (!hits.length) return;
    const cfg = config.houses[state.house];
    if (!cfg.hasInterior) return;
    // 门区域判定：命中点转换到模型局部空间，检查是否落在门探针盒内
    const hit = hits[0];
    const local = hit.object.worldToLocal(hit.point.clone());
    const probe = cfg.door.exteriorProbe;
    if (!probe) return;
    if (
      local.x >= probe.x[0] && local.x <= probe.x[1] &&
      local.y >= probe.y[0] && local.y <= probe.y[1] &&
      local.z >= probe.z[0] && local.z <= probe.z[1]
    ) {
      tryEnterInterior();
    }
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
let downPos = null;
wrap.addEventListener('pointerdown', e => { downPos = { x: e.clientX, y: e.clientY }; });
wrap.addEventListener('pointerup', e => {
  if (!downPos) return;
  const dx = e.clientX - downPos.x, dy = e.clientY - downPos.y;
  downPos = null;
  if (Math.hypot(dx, dy) > 6) return;
  onCanvasClick(e);
});

// Hover cursor on door (exterior) / room slice (cutaway)
wrap.addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return;
  const ray = pickAt(e.clientX, e.clientY);
  let hot = false;
  if (state.view === 'exterior' && state.extMesh) {
    const hits = ray.intersectObject(state.extMesh, true);
    if (hits.length) {
      const probe = config.houses[state.house].door.exteriorProbe;
      if (probe) {
        const local = hits[0].object.worldToLocal(hits[0].point.clone());
        hot = local.x >= probe.x[0] && local.x <= probe.x[1] &&
              local.y >= probe.y[0] && local.y <= probe.y[1] &&
              local.z >= probe.z[0] && local.z <= probe.z[1];
      }
    }
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
  for (const room of config.houses[state.house].rooms) {
    const el = chipMap.get(room.id);
    if (!el) continue;
    const p = new THREE.Vector3(...room.label).add(state.shift).project(camera);
    el.hidden = p.z > 1 || Math.abs(p.x) > 1 || Math.abs(p.y) > 1;
    el.style.left = ((p.x * 0.5 + 0.5) * w) + 'px';
    el.style.top = ((-p.y * 0.5 + 0.5) * h) + 'px';
  }
}

// ========== Resize ==========
window.addEventListener('resize', () => {
  camera.aspect = wrap.clientWidth / wrap.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  composer.setSize(wrap.clientWidth, wrap.clientHeight);
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
  enterExterior, enterCutaway, enterRoom, exitInterior, resetView,
  switchHouse,
};
