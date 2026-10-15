import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { SquidwardResident, skinnedBounds } from './squidward-resident.js?v=20261015-reference-21';
import { RoomNavigation } from './squidward-navigation.js?v=20261013-nav-1';
import { livingProps } from './squidward-room-props.js?v=20261015-reference-21';

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
const residentPanel = document.getElementById('resident-panel');
const residentLabel = document.getElementById('resident-state');
const residentPause = document.getElementById('resident-pause');

// ========== Config ==========
let config = null;
async function loadConfig() {
  const res = await fetch('./config/house-config.json?v=20261015-reference-21');
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
renderer.shadowMap.type = THREE.PCFShadowMap;
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
  doorMeshes: [],       // 室内门网格（intGroup）
  extDoorMeshes: [],    // 外观门网格（extGroup）
  extTris: 0,
  intTris: 0,
  camAnim: null,
  doorAnim: null,
  resident: null,
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
  wrap.dataset.cameraReady='false';
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
  infoMeta.textContent = state.view === 'exterior' ? '点击木门进入房子' : (cfg.resident&&state.roomId==='living' ? '点击地板走过去 · 点击家具互动 · 点击章鱼哥招手' : '拖动查看本层家具与布局');
  layoutHint();
}

function updateResidentUI() {
  const active=state.resident&&state.view==='room'&&state.roomId===config.houses[state.house].resident?.roomId;
  residentPanel.hidden=!active;
  if(!state.resident)return;
  residentLabel.textContent='章鱼哥 · '+(state.resident.paused?'休息中':state.resident.diagnostic().label);
  residentPause.textContent=state.resident.paused?'继续活动':'暂停活动';
  document.getElementById('resident-mood').value=state.resident.expression;
}
document.querySelectorAll('[data-resident-action]').forEach(button=>button.addEventListener('click',()=>state.resident?.request(button.dataset.residentAction)));
document.getElementById('resident-mood').addEventListener('change',event=>state.resident?.setEmotion(event.target.value));
residentPause.addEventListener('click',()=>state.resident?.setPaused(!state.resident.paused));

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
      if (!m || m.userData.stonePatched) continue;
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
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x2f5a6b, roughness: 0.35, metalness: 0.25 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x3a8aa0, metalness: 0.5, roughness: 0.12,
    transparent: true, opacity: 0.45, clearcoat: 0.9, clearcoatRoughness: 0.15,
  });
  root.traverse(o => {
    if (!o.isMesh || !/^shell_porthole_[LR]$/.test(o.name)) return;
    const box = new THREE.Box3().setFromObject(o);
    const c = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const radius = Math.max(size.x, size.z) / 2;
    const dir = c.clone().setY(0).normalize();
    const frame = new THREE.Mesh(new THREE.TorusGeometry(radius, radius * 0.3, 12, 28), frameMat);
    frame.position.copy(c);
    frame.lookAt(c.clone().add(dir));
    group.add(frame);
    const glass = new THREE.Mesh(new THREE.CircleGeometry(radius * 0.66, 28), glassMat);
    glass.position.copy(c).addScaledVector(dir, radius * 0.16);
    glass.lookAt(c.clone().add(dir));
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
    const anchor = cfg.resident && state.intMesh.getObjectByName(cfg.rooms.find(room => room.id === cfg.resident.roomId).prefix + cfg.resident.id);
    if (anchor) {wrap.dataset.resident = JSON.stringify(anchor.userData.resident);state.resident=anchor.userData.controller;state.resident.onChange=updateResidentUI;}
    done(true);
    return;
  }
  showLoading(true);
  const url = cfg.models[state.tier].interiorUrl + '?' + config.cacheBust;
  loader.load(url, async gltf => {
    if (gen !== loadGen) return;
    const sceneObj = gltf.scene;
    intGroup.add(sceneObj);
    let residentResult;
    try {
      residentResult = await attachResident(sceneObj, cfg);
    } catch (error) {
      sceneObj.removeFromParent();
      if (gen !== loadGen) return;
      console.error('[neighborhood] resident load failed', error);
      showError(cfg.resident.url);
      done(false);
      return;
    }
    if (gen !== loadGen) {sceneObj.removeFromParent();return;}
    if (residentResult) wrap.dataset.resident = JSON.stringify(residentResult);
    sceneObj.traverse(o => {
      if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
    });
    // 门网格：按配置名收集，射线只对门网格本身
    state.doorMeshes = [];
    const names = cfg.door.meshNames || [];
    sceneObj.traverse(o => { if (o.isMesh && names.includes(o.name)) state.doorMeshes.push(o); });
    state.intMesh = sceneObj;
    const anchor=cfg.resident&&sceneObj.getObjectByName(cfg.rooms.find(room=>room.id===cfg.resident.roomId).prefix+cfg.resident.id);
    if(anchor){state.resident=anchor.userData.controller;state.resident.onChange=updateResidentUI;}
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

async function attachResident(interior, cfg) {
  if (!cfg.resident) return;
  const resident = cfg.resident;
  const room = cfg.rooms.find(item => item.id === resident.roomId);
  if (!room) throw new Error('角色房间不存在：' + resident.roomId);
  const gltf = await new Promise((resolve, reject) => loader.load(resident.url + '?' + config.cacheBust, resolve, undefined, reject));
  const root = gltf.scene;
  const anchor = new THREE.Group();anchor.name = room.prefix + resident.id;anchor.add(root);interior.add(anchor);interior.updateMatrixWorld(true);
  const box = skinnedBounds(root);
  const height = box.max.y - box.min.y;
  if (!(height > 0)) throw new Error('角色尺寸无效');
  const scale = resident.height / height;
  root.scale.setScalar(scale);
  interior.updateMatrixWorld(true);
  const scaled=skinnedBounds(root),center=scaled.getCenter(new THREE.Vector3());
  root.position.set(-center.x, -scaled.min.y, -center.z);
  anchor.position.fromArray(resident.position);
  anchor.rotation.y = resident.rotationY;
  let index = 0;
  root.traverse(object => {
    if (!object.isMesh) return;
    object.name = room.prefix + resident.id + '_' + object.name + '_' + index++;
    object.castShadow = object.receiveShadow = true;
  });
  interior.updateMatrixWorld(true);
  const placed = skinnedBounds(root);
  // 对实际楼板做向下射线，避免按包围盒摆到剖切掉的区域。
  const level = cfg.rooms.indexOf(room) + 1;
  const floor = interior.getObjectByName('floor_' + level);
  if (!floor) throw new Error('角色楼板不存在');
  const down = new THREE.Vector3(0, -1, 0);
  const samples = [[resident.position[0],resident.position[2]], [placed.min.x + .02,placed.min.z + .02], [placed.max.x - .02,placed.max.z - .02]];
  const contacts = samples.map(([x,z]) => {
    const probe = new THREE.Raycaster(new THREE.Vector3(x, placed.max.y + 1, z), down);
    const hit = probe.intersectObject(floor, true)[0];
    if (!hit) throw new Error('角色脚下没有楼板');
    return { x, z, floorY: hit.point.y, gap: placed.min.y - hit.point.y };
  });
  if (contacts.some(contact => Math.abs(contact.gap) > .002)) throw new Error('角色未贴合楼板');
  anchor.userData.resident = { id: resident.id, roomId: room.id, height: placed.max.y - placed.min.y, min: placed.min.toArray(), max: placed.max.toArray(), contacts };
  const props=await livingProps(interior);
  const navigation=new RoomNavigation({floor,parent:interior,floorY:resident.position[1],obstacles:props.obstacles});
  if(!navigation.nodes.length)throw new Error('客厅没有可行走区域');
  anchor.userData.controller=new SquidwardResident({model:root,actor:anchor,clips:gltf.animations,route:resident.walkRoute,floor,floorY:resident.position[1],navigation,interactions:props.interactions,onGoal:props.onGoal,speedMultiplier:resident.speedMultiplier||2.3});
  anchor.userData.controller.props=props;
  wrap.dataset.navigation=JSON.stringify({nodes:navigation.nodes.length,obstacles:props.obstacles.length});
  return anchor.userData.resident;
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
  state.intMesh.traverse(o => {
    if (!o.isMesh) return;
    if(o.name.startsWith('stairs_whole_')){o.visible=!room;return;}
    if(o.name.includes('_stairs_')&&!o.name.startsWith('stairs_')){o.visible=!!room&&o.name.startsWith(room.prefix);return;}
    // 近景仅保留本层楼梯，避免其他楼层叠在房间画面中。
    if (o.name.startsWith('stairs_') || o.name.startsWith('art_')) {
      const box = new THREE.Box3().setFromObject(o);
      o.visible = !room || (box.max.y >= room.bounds[0][1] + .10 && box.min.y < room.bounds[1][1] - .05);
      return;
    }
    // 楼板：房间近景按配置隐藏当前层上方的遮挡楼板
    if (o.name.startsWith('floor_')) { o.visible = !room || o.name === 'floor_' + (cfg.rooms.indexOf(room) + 1); return; }
    // 门组：房间近景时整体隐藏（frame/panel/handle 都不挡视线）；剖切全局时显示
    if (o.name.startsWith('door_')) { o.visible = false; return; }
    if (!roomId) { o.visible = true; return; }
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
  updateResidentUI();
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
  // 按当前整屋包围盒与窗口比例取景，避免固定距离裁掉顶层。
  return frameWhole(new THREE.Box3().setFromObject(state.intMesh));
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
  updateResidentUI();
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
  if (camera.aspect < 1) {
    position.sub(target).multiplyScalar(1.25 / camera.aspect).add(target);
  }
  setCam(position, target, 800);
  setInfo(cfg.title + ' · ' + room.name, '近景镜头。Esc 或「返回外部」回到全屋剖切。', '');
  chipsHost.hidden = true;
  updateResidentUI();
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
  state.resident=null;residentPanel.hidden=true;
  delete wrap.dataset.resident;
  delete wrap.dataset.residentAnimation;
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
  if(state.resident&&state.view!=='exterior'&&(state.view==='cutaway'||state.roomId==='living')){
    const hits=ray.intersectObject(state.resident.model,true);
    if(hits.length){state.resident.request('wave');return;}
  }
  if(state.resident&&state.view==='room'&&state.roomId==='living'){
    const visibleHits=ray.intersectObject(state.intMesh,true).filter(hit=>{let o=hit.object;while(o){if(!o.visible)return false;o=o.parent;}return !hit.object.name.includes('destination_marker');});
    const objectHit=visibleHits[0];
    const activity=objectHit&&state.resident.interactions.find(item=>item.id===objectHit.object.userData.residentInteraction);
    const point=objectHit?.point.clone()||ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),-(1.2+state.shift.y)),new THREE.Vector3());
    if(point){const local=state.intMesh.worldToLocal(point);state.resident.goTo(activity?.point||[local.x,local.z],activity||null,'click');wrap.dataset.clickDestination=JSON.stringify({point:[local.x,local.z],activity:activity?.id||null});}
    return;
  }
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
  camera.aspect = wrap.clientWidth / wrap.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  composer.setSize(wrap.clientWidth, wrap.clientHeight);
  layoutHint();
  const cfg = config && config.houses[state.house];
  if (cfg && cfg.resident && state.view === 'room' && state.roomId === cfg.resident.roomId) enterRoom(state.roomId);
});

// ========== Loop ==========
let lastFrame=performance.now(),lastResidentProbe=0;
function animate() {
  requestAnimationFrame(animate);
  const now=performance.now(),dt=Math.min(.05,(now-lastFrame)/1000);lastFrame=now;
  if (state.camAnim) {
    const a = state.camAnim;
    const t = Math.min(1, (performance.now() - a.start) / a.dur);
    const e = 1 - Math.pow(1 - t, 3);
    camera.position.lerpVectors(a.fromPos, a.toPos, e);
    controls.target.lerpVectors(a.fromTgt, a.toTgt, e);
    if (t >= 1) { state.camAnim = null; controls.enabled = true;wrap.dataset.cameraReady='true'; }
  }
  if (state.doorAnim) {
    const a = state.doorAnim;
    const t = Math.min(1, (performance.now() - a.start) / a.dur);
    const e = 1 - Math.pow(1 - t, 3);
    a.mesh.rotation.y = a.from + (a.to - a.from) * e;
    if (t >= 1) state.doorAnim = null;
  }
  controls.update();
  if(state.resident){
    const active=state.view==='cutaway'||(state.view==='room'&&state.roomId==='living');
    state.resident.update(dt,active);
    if(active&&!state.resident.paused)state.resident.props?.update(dt);
    if(active&&now-lastResidentProbe>250){wrap.dataset.residentAnimation=JSON.stringify({...state.resident.diagnostic(),tvOn:state.resident.props?.tvOn,tvTime:state.resident.props?.tvTime});lastResidentProbe=now;}
  }
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
  get camera() { return camera; },
  get renderer() { return renderer; },
  enterExterior, enterCutaway, enterRoom, exitInterior, resetView,
  switchHouse,
};
