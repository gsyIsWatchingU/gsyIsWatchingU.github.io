import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { clone as cloneSkeleton } from "three/addons/utils/SkeletonUtils.js";

const hero = document.querySelector(".hero");
const visual = document.querySelector(".hero__visual");
const atmosphereCanvas = document.querySelector(".galaxy-canvas");
const sceneCanvas = document.querySelector(".galaxy-focus-canvas");
const visitorLightLabel = document.querySelector("[data-visitor-light]");
const storyKickerLabel = document.querySelector("[data-story-kicker]");
const storyCopyLabel = document.querySelector("[data-story-copy]");
const storyStageLabel = document.querySelector("[data-story-stage]");
const choiceCountLabel = document.querySelector("[data-choice-count]");
const discoveryHintLabel = document.querySelector("[data-discovery-hint]");

if (!hero || !visual || !atmosphereCanvas || !sceneCanvas) {
  throw new Error("首屏叙事场景缺少必要节点");
}

const beamColor = new THREE.Color(0xb7c5bd);
const changeGoal = 3;
const stageNames = {
  idle: "寂静 · 他还在暗处",
  follow: "跟随 · 他走向光",
  lit: "驻足 · 他站在光里",
  approach: "靠近 · 他发现了那件东西",
  climb: "攀爬 · 他顺着梯子往上",
  perch: "高处 · 他换了一个视角",
  descend: "下行 · 他回到地面",
  pull: "发力 · 他拉住了绳子",
  glow: "照亮 · 墙里的光漏了出来",
  resolve: "分岔 · 三条路出现",
  depart: "出发 · 他走进光里",
  arrived: "抵达 · 他走出了自己的路",
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const compactViewport = window.matchMedia("(max-width: 980px)");

const createRandom = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
  return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
};

const drawAtmosphere = () => {
  const context = atmosphereCanvas.getContext("2d");
  if (!context) return;
  const bounds = hero.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
  const width = Math.max(1, Math.round(bounds.width));
  const height = Math.max(1, Math.round(bounds.height));
  atmosphereCanvas.width = Math.round(width * ratio);
  atmosphereCanvas.height = Math.round(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);

  const base = context.createLinearGradient(0, 0, width, height);
  base.addColorStop(0, "rgba(2, 5, 8, 0)");
  base.addColorStop(0.5, "rgba(8, 17, 23, .18)");
  base.addColorStop(1, "rgba(21, 34, 39, .34)");
  context.fillStyle = base;
  context.fillRect(0, 0, width, height);

  const fog = context.createRadialGradient(width * 0.8, height * 0.44, 0, width * 0.8, height * 0.44, width * 0.46);
  fog.addColorStop(0, "rgba(147, 161, 155, .1)");
  fog.addColorStop(0.28, "rgba(68, 85, 87, .065)");
  fog.addColorStop(1, "rgba(3, 7, 10, 0)");
  context.fillStyle = fog;
  context.fillRect(0, 0, width, height);

  const random = createRandom(11092026);
  const dustCount = Math.min(280, Math.floor((width * height) / 5200));
  for (let index = 0; index < dustCount; index += 1) {
    const x = width * (0.38 + random() * 0.62);
    const y = random() * height;
    const radius = 0.25 + random() * 0.7;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(183, 198, 193, ${0.025 + random() * 0.09})`;
    context.fill();
  }
};

const createGlowTexture = (stops, size = 256) => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  for (const [offset, color] of stops) gradient.addColorStop(offset, color);
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const createSoftSprite = ({ texture, opacity, scale, position }) => {
  const material = new THREE.SpriteMaterial({
    map: texture,
    opacity,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(scale[0], scale[1], 1);
  sprite.position.set(position[0], position[1], position[2]);
  sprite.renderOrder = 4;
  return sprite;
};

const setShadow = (object, cast = true, receive = false) => {
  object.traverse((child) => {
    if (!child.isMesh) return;
    child.castShadow = cast;
    child.receiveShadow = receive;
  });
  return object;
};

const createLimb = (start, end, radius, material, taper = 0.82) => {
  const startVector = new THREE.Vector3(...start);
  const endVector = new THREE.Vector3(...end);
  const direction = endVector.clone().sub(startVector);
  const limb = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * taper, radius, direction.length(), 7, 1, false),
    material,
  );
  limb.position.copy(startVector).add(endVector).multiplyScalar(0.5);
  limb.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  limb.castShadow = true;
  return limb;
};

const createCharacter = ({ distant = false, accent = false } = {}) => {
  const group = new THREE.Group();
  const silhouette = new THREE.MeshStandardMaterial({ color: distant ? 0x11181b : 0x101417, roughness: 0.96 });
  const trousers = new THREE.MeshStandardMaterial({ color: 0x0a0d0f, roughness: 0.92 });
  const skin = new THREE.MeshStandardMaterial({ color: distant ? 0x192124 : 0x8a7868, roughness: 1 });
  const jacket = new THREE.MeshStandardMaterial({
    color: accent ? 0x6b292d : 0x151c1f,
    emissive: accent ? 0x220507 : 0x000000,
    emissiveIntensity: accent ? 0.18 : 0,
    roughness: 0.9,
  });

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.27, 4, 8), jacket);
  torso.position.set(-0.01, 0.46, 0);
  torso.scale.set(1, 1, 0.68);
  torso.rotation.z = -0.08;
  group.add(torso);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.043, 0.05, 0.09, 7), skin);
  neck.position.set(0.025, 0.68, 0);
  neck.rotation.z = -0.08;
  group.add(neck);

  const headPivot = new THREE.Group();
  headPivot.position.set(0.015, 0.77, 0);
  const head = new THREE.Mesh(new THREE.IcosahedronGeometry(0.115, 2), skin);
  head.scale.set(0.92, 1.05, 0.9);
  headPivot.add(head);
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 7, 0, Math.PI * 2, 0, Math.PI * 0.62), silhouette);
  hair.position.set(-0.018, 0.028, -0.004);
  hair.scale.set(1.02, 0.88, 1);
  headPivot.add(hair);
  group.add(headPivot);

  group.add(
    createLimb([-0.11, 0.57, 0], [-0.17, 0.39, 0.035], 0.048, jacket),
    createLimb([-0.17, 0.39, 0.035], [-0.11, 0.24, 0.055], 0.039, skin),
    createLimb([0.1, 0.56, 0], [0.16, 0.39, -0.035], 0.047, jacket),
    createLimb([0.16, 0.39, -0.035], [0.23, 0.28, 0.025], 0.038, skin),
    createLimb([-0.07, 0.29, 0.025], [-0.11, 0.08, 0.035], 0.057, trousers),
    createLimb([-0.11, 0.08, 0.035], [-0.16, -0.18, 0.08], 0.049, trousers),
    createLimb([0.065, 0.29, -0.025], [0.12, 0.07, -0.015], 0.057, trousers),
    createLimb([0.12, 0.07, -0.015], [0.21, -0.17, 0.035], 0.049, trousers),
  );

  const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.055, 0.11), trousers);
  leftShoe.position.set(-0.2, -0.205, 0.115);
  leftShoe.rotation.y = -0.1;
  const rightShoe = leftShoe.clone();
  rightShoe.position.set(0.255, -0.195, 0.07);
  rightShoe.rotation.y = 0.16;
  group.add(leftShoe, rightShoe);

  group.userData = { headPivot, torso, jacket };
  group.scale.setScalar(distant ? 0.48 : 0.92);
  setShadow(group, !distant, false);
  return group;
};

const createBeam = (source, target, radius, material) => {
  const direction = source.clone().sub(target);
  const beam = new THREE.Mesh(new THREE.ConeGeometry(radius, direction.length(), 24, 1, true), material);
  beam.position.copy(source).add(target).multiplyScalar(0.5);
  beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  beam.renderOrder = 2;
  return beam;
};

const aimBeam = (beam, source, target) => {
  const direction = source.clone().sub(target);
  beam.position.copy(source).add(target).multiplyScalar(0.5);
  beam.scale.y = direction.length() / beam.geometry.parameters.height;
  beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
};

const drawFallback = (canvas) => {
  const replacement = canvas.cloneNode();
  canvas.replaceWith(replacement);
  const context = replacement.getContext("2d");
  const draw = () => {
    const bounds = replacement.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    replacement.width = Math.max(1, Math.round(bounds.width * ratio));
    replacement.height = Math.max(1, Math.round(bounds.height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, bounds.width, bounds.height);
    const width = bounds.width;
    const height = bounds.height;
    const beam = context.createLinearGradient(width * 0.78, height * 0.08, width * 0.55, height * 0.78);
    beam.addColorStop(0, "rgba(211, 222, 211, .3)");
    beam.addColorStop(1, "rgba(131, 151, 145, 0)");
    context.fillStyle = beam;
    context.beginPath();
    context.moveTo(width * 0.72, height * 0.02);
    context.lineTo(width * 0.88, height * 0.02);
    context.lineTo(width * 0.67, height * 0.84);
    context.lineTo(width * 0.42, height * 0.84);
    context.closePath();
    context.fill();
    context.fillStyle = "rgba(10, 16, 19, .98)";
    context.fillRect(width * 0.03, 0, width * 0.17, height * 0.84);
    context.fillRect(width * 0.9, 0, width * 0.14, height);
    context.fillStyle = "rgba(34, 44, 45, .9)";
    context.fillRect(width * 0.17, height * 0.58, width * 0.72, height * 0.055);
    context.fillStyle = "rgba(15, 22, 25, .98)";
    context.beginPath();
    context.moveTo(width * 0.19, height * 0.8);
    context.lineTo(width * 0.88, height * 0.75);
    context.lineTo(width, height);
    context.lineTo(0, height);
    context.closePath();
    context.fill();
    for (let index = 0; index < 6; index += 1) {
      const x = width * (0.3 + index * 0.09);
      const y = height * 0.55;
      context.fillStyle = "rgba(7, 11, 13, .9)";
      context.beginPath();
      context.arc(x, y, 3, 0, Math.PI * 2);
      context.fill();
      context.fillRect(x - 2.2, y + 3, 4.4, 13);
    }
    const personX = width * 0.58;
    const personY = height * 0.78;
    context.lineCap = "round";
    context.strokeStyle = "#0b0f11";
    context.lineWidth = Math.max(4, width * 0.008);
    context.beginPath();
    context.moveTo(personX - 2, personY - 17);
    context.lineTo(personX - 7, personY + 7);
    context.moveTo(personX + 3, personY - 16);
    context.lineTo(personX + 11, personY + 7);
    context.stroke();
    context.fillStyle = "#6b292d";
    context.beginPath();
    context.ellipse(personX, personY - 31, 9, 15, -0.12, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#111719";
    context.beginPath();
    context.arc(personX + 2, personY - 49, 7.5, 0, Math.PI * 2);
    context.fill();
  };
  draw();
  window.addEventListener("resize", draw, { passive: true });
};

drawAtmosphere();

let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    canvas: sceneCanvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
    premultipliedAlpha: true,
  });
} catch (error) {
  console.warn("Three.js 初始化失败，已切换到 Canvas 备用渲染。", error);
  drawFallback(sceneCanvas);
}

if (renderer) {
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x111a1f, 0.09);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
  camera.position.set(0.2, 1.05, 6.7);
  // 拾取专用相机：不带鼠标视差，保证「点哪儿光就去哪儿」的映射稳定
  const pickCamera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
  pickCamera.position.copy(camera.position);
  const world = new THREE.Group();
  scene.add(world);

  const concrete = new THREE.MeshStandardMaterial({ color: 0x1b272b, roughness: 1, metalness: 0.02 });
  const nearBlack = new THREE.MeshStandardMaterial({ color: 0x0a1114, roughness: 0.98 });
  const bridgeMaterial = new THREE.MeshStandardMaterial({ color: 0x485250, roughness: 0.92 });
  const railMaterial = new THREE.MeshStandardMaterial({ color: 0x0d1417, roughness: 0.82, metalness: 0.18 });
  const litSurface = new THREE.MeshStandardMaterial({ color: 0x5f6d68, emissive: 0x28312f, emissiveIntensity: 0.26, roughness: 0.94 });
  const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x222d31, roughness: 0.96, metalness: 0.03 });

  const ambient = new THREE.HemisphereLight(0x83989a, 0x030608, 0.68);
  const coldFill = new THREE.DirectionalLight(0x879da0, 0.88);
  coldFill.position.set(-3.2, 2.4, 3.1);
  const characterRim = new THREE.DirectionalLight(0x91716a, 0.24);
  characterRim.position.set(2.8, 1.2, 2.6);
  scene.add(ambient, coldFill, characterRim);

  const backWall = new THREE.Mesh(new THREE.BoxGeometry(7.2, 4.2, 0.22), concrete);
  backWall.position.set(0.6, 0.45, -2.65);
  backWall.receiveShadow = true;
  world.add(backWall);
  const leftTower = new THREE.Mesh(new THREE.BoxGeometry(1.15, 4.7, 1.3), nearBlack);
  leftTower.position.set(-2.72, 0.48, -0.05);
  const rightTower = new THREE.Mesh(new THREE.BoxGeometry(1.28, 4.9, 1.5), nearBlack);
  rightTower.position.set(2.85, 0.42, -0.14);
  const overhead = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.34, 0.62), nearBlack);
  overhead.position.set(0.18, 2.22, -0.9);
  overhead.rotation.z = -0.045;
  world.add(leftTower, rightTower, overhead);

  const windowPanel = new THREE.Mesh(new THREE.PlaneGeometry(4.38, 1.46), litSurface);
  windowPanel.position.set(0.35, 0.27, -2.51);
  world.add(windowPanel);
  const windowFrameVertical = new THREE.Mesh(new THREE.BoxGeometry(0.055, 1.54, 0.08), railMaterial);
  windowFrameVertical.position.set(-1.82, 0.27, -2.42);
  const windowFrameMiddle = windowFrameVertical.clone();
  windowFrameMiddle.position.x = 0.35;
  const windowFrameRight = windowFrameVertical.clone();
  windowFrameRight.position.x = 2.52;
  const windowFrameTop = new THREE.Mesh(new THREE.BoxGeometry(4.46, 0.055, 0.08), railMaterial);
  windowFrameTop.position.set(0.35, 1.01, -2.42);
  const windowFrameBottom = windowFrameTop.clone();
  windowFrameBottom.position.y = -0.47;
  world.add(windowFrameVertical, windowFrameMiddle, windowFrameRight, windowFrameTop, windowFrameBottom);

  const warningMaterial = new THREE.MeshStandardMaterial({
    color: 0x251315,
    emissive: 0x7a1918,
    emissiveIntensity: 0.08,
    roughness: 0.72,
  });
  const warningLights = [-1.36, 0.34, 2.04].map((x) => {
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.018, 0.035), warningMaterial);
    lamp.position.set(x, 0.9, -2.37);
    world.add(lamp);
    return lamp;
  });

  const bridge = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.12, 0.72), bridgeMaterial);
  bridge.position.set(0.05, -0.36, -1.35);
  bridge.receiveShadow = true;
  world.add(bridge);
  const bridgeLight = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.025, 0.12), litSurface);
  bridgeLight.position.set(0.2, -0.285, -1.01);
  world.add(bridgeLight);
  const rail = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.035, 0.035), railMaterial);
  rail.position.set(0.14, 0.02, -0.98);
  world.add(rail);
  for (let index = 0; index < 8; index += 1) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.34, 0.025), railMaterial);
    post.position.set(-2.18 + index * 0.66, -0.13, -0.98);
    world.add(post);
  }

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 4.8), floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -1.04, 0.1);
  floor.receiveShadow = true;
  world.add(floor);
  const frontLedge = new THREE.Mesh(new THREE.BoxGeometry(6.7, 0.28, 0.28), nearBlack);
  frontLedge.position.set(-0.05, -1.08, 2.25);
  world.add(frontLedge);

  const leftShelter = new THREE.Group();
  const leftCabinet = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.68, 0.58), nearBlack);
  leftCabinet.position.set(-1.82, -0.7, 0.72);
  leftCabinet.rotation.y = 0.06;
  leftCabinet.castShadow = true;
  leftCabinet.receiveShadow = true;
  const cabinetSeam = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.48, 0.6), railMaterial);
  cabinetSeam.position.set(-1.81, -0.7, 0.72);
  const bentPipe = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.025, 6, 16, Math.PI * 1.35), railMaterial);
  bentPipe.position.set(-2.18, -0.38, 0.51);
  bentPipe.rotation.set(Math.PI / 2, 0.22, -0.18);
  leftShelter.add(leftCabinet, cabinetSeam, bentPipe);
  world.add(leftShelter);

  const rightShelter = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.38, 0.92), nearBlack);
  rightShelter.position.set(1.82, -0.84, 0.78);
  rightShelter.rotation.y = -0.14;
  rightShelter.castShadow = true;
  rightShelter.receiveShadow = true;
  world.add(rightShelter);

  const beamSource = new THREE.Vector3(1.5, 2.16, 1.18);
  const beamTarget = new THREE.Vector3(0.72, -0.88, 0.22);
  const beamTargetDesired = beamTarget.clone();
  const idleBeamAnchor = new THREE.Vector3(0.42, 0, 0.32);

  const watcher = new THREE.Group();
  watcher.position.set(1.5, 2.17, 1.08);
  const watcherBracket = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.48, 0.055), railMaterial);
  watcherBracket.position.y = 0.2;
  const watcherBody = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.19, 0.26), nearBlack);
  watcherBody.position.set(-0.15, -0.06, 0);
  const watcherLensMaterial = new THREE.MeshStandardMaterial({
    color: 0x202829,
    emissive: 0x5a1916,
    emissiveIntensity: 0.36,
    roughness: 0.52,
  });
  const watcherLens = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.075, 0.075, 12), watcherLensMaterial);
  watcherLens.position.set(-0.38, -0.06, 0);
  watcherLens.rotation.z = Math.PI / 2;
  watcher.add(watcherBracket, watcherBody, watcherLens);
  watcher.rotation.z = 0.34;
  world.add(watcher);
  const beamMaterial = new THREE.MeshBasicMaterial({ color: 0xb7c5bd, transparent: true, opacity: 0.052, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
  const beamOuterMaterial = beamMaterial.clone();
  beamOuterMaterial.opacity = 0.022;
  const beam = createBeam(beamSource, beamTarget, 0.8, beamMaterial);
  const beamOuter = createBeam(beamSource, beamTarget, 1.22, beamOuterMaterial);
  world.add(beamOuter, beam);

  const searchLight = new THREE.SpotLight(0xc9d3c9, 18, 9, Math.PI * 0.13, 0.78, 1.2);
  searchLight.position.copy(beamSource);
  searchLight.castShadow = true;
  searchLight.shadow.mapSize.set(1024, 1024);
  searchLight.shadow.camera.near = 0.2;
  searchLight.shadow.camera.far = 10;
  searchLight.shadow.bias = -0.0008;
  const lightTarget = new THREE.Object3D();
  lightTarget.position.copy(beamTarget);
  world.add(searchLight, lightTarget);
  searchLight.target = lightTarget;

  const coolGlow = createGlowTexture([
    [0, "rgba(215,226,217,.72)"],
    [0.12, "rgba(169,188,181,.28)"],
    [0.46, "rgba(92,119,116,.08)"],
    [1, "rgba(0,0,0,0)"],
  ]);
  const targetGlow = createSoftSprite({ texture: coolGlow, opacity: 0.18, scale: [0.72, 0.42], position: [beamTarget.x, beamTarget.y + 0.025, beamTarget.z] });
  world.add(targetGlow);


  const pathOrigin = new THREE.Vector3(0.12, -1.012, 0.42);
  const pathTargets = [
    new THREE.Vector3(-1.72, -1.012, -0.12),
    new THREE.Vector3(0.18, -1.012, -0.98),
    new THREE.Vector3(1.78, -1.012, -0.02),
  ];
  const pathColors = [0x7c9b78, 0x6f9ba8, 0xb0916c];
  const pathBranches = pathTargets.map((target, index) => {
    const control = pathOrigin.clone().lerp(target, 0.5);
    control.x += (index - 1) * 0.2;
    control.z += index === 1 ? 0.12 : -0.06;
    const curve = new THREE.QuadraticBezierCurve3(pathOrigin, control, target);
    const material = new THREE.MeshBasicMaterial({
      color: pathColors[index],
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    material.userData.baseOpacity = 0.32;
    const path = new THREE.Mesh(new THREE.TubeGeometry(curve, 42, 0.018, 6, false), material);
    path.renderOrder = 3;
    world.add(path);
    return { path, material, target };
  });

  const farBeamMaterial = new THREE.MeshBasicMaterial({
    color: 0x9baea9,
    transparent: true,
    opacity: 0.018,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const farBeamA = createBeam(
    new THREE.Vector3(-1.72, 2.04, -1.82),
    new THREE.Vector3(-0.88, -0.32, -1.36),
    0.38,
    farBeamMaterial,
  );
  const farBeamBMaterial = farBeamMaterial.clone();
  farBeamBMaterial.opacity = 0.012;
  const farBeamB = createBeam(
    new THREE.Vector3(0.18, 2.08, -1.92),
    new THREE.Vector3(0.82, -0.32, -1.34),
    0.3,
    farBeamBMaterial,
  );
  world.add(farBeamA, farBeamB);

  const scanRings = Array.from({ length: 3 }, (_, index) => {
    const material = new THREE.MeshBasicMaterial({
      color: 0xaebfb7,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.18, 0.19, 56), material);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(beamTarget.x, -1.014 + index * 0.001, beamTarget.z);
    ring.visible = false;
    ring.renderOrder = 3;
    world.add(ring);
    return ring;
  });

  const protagonistAnchor = new THREE.Group();
  protagonistAnchor.position.set(-0.46, -1.025, 0.52);
  protagonistAnchor.rotation.y = -0.28;
  world.add(protagonistAnchor);

  const protagonist = createCharacter({ accent: true });
  protagonist.position.y = 0.19;
  protagonistAnchor.add(protagonist);

  const footstepTraces = Array.from({ length: 8 }, (_, index) => {
    const material = new THREE.MeshBasicMaterial({
      color: index % 2 ? 0x8ca39a : 0xa07a70,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const trace = new THREE.Mesh(new THREE.RingGeometry(0.018, 0.028, 20), material);
    trace.rotation.x = -Math.PI / 2;
    trace.scale.set(0.62, 1, 1.28);
    trace.position.y = -1.012 + index * 0.0002;
    trace.visible = false;
    trace.userData.bornAt = -10;
    world.add(trace);
    return trace;
  });

  const characterRuntime = {
    actions: {},
    currentAction: null,
    loaded: false,
    mixer: null,
    model: null,
  };

  // ── 骨骼 IK：攀爬（手脚抓踩横杆）与拉绳（双手抓把手）共用
  // 模型是 Mixamo 骨架：upperarm→lowerarm→hand，thigh→calf→foot，pelvis 为根
  const ikBones = {};
  const ikRest = new Map();
  let climbRig = null;
  const ikV1 = new THREE.Vector3();
  const ikV2 = new THREE.Vector3();
  const ikV3 = new THREE.Vector3();
  const ikV4 = new THREE.Vector3();
  const ikQ1 = new THREE.Quaternion();
  const ikQ2 = new THREE.Quaternion();
  const ikQ3 = new THREE.Quaternion();

  const aimBoneAt = (bone, childBone, targetWorld) => {
    bone.updateWorldMatrix(true, false);
    childBone.updateWorldMatrix(true, false);
    const bonePos = ikV1.setFromMatrixPosition(bone.matrixWorld);
    const childPos = ikV2.setFromMatrixPosition(childBone.matrixWorld);
    const u = childPos.sub(bonePos).normalize();
    const v = ikV3.copy(targetWorld).sub(bonePos).normalize();
    if (u.lengthSq() < 1e-9 || v.lengthSq() < 1e-9) return;
    const delta = ikQ1.setFromUnitVectors(u, v);
    const parentQ = bone.parent.getWorldQuaternion(ikQ2);
    const localDelta = ikQ3.copy(parentQ).invert().multiply(delta).multiply(parentQ);
    bone.quaternion.premultiply(localDelta);
    bone.updateWorldMatrix(true, false);
  };

  // 两骨解析 IK：先按余弦定理定出中间关节位置（pole 决定弯曲朝向），再逐节对准
  const solveTwoBone = (root, mid, tip, targetWorld, poleWorld) => {
    root.updateWorldMatrix(true, false);
    mid.updateWorldMatrix(true, false);
    tip.updateWorldMatrix(true, false);
    const rootPos = ikV1.setFromMatrixPosition(root.matrixWorld).clone();
    const midPos = ikV2.setFromMatrixPosition(mid.matrixWorld).clone();
    const tipPos = ikV3.setFromMatrixPosition(tip.matrixWorld).clone();
    const upper = midPos.distanceTo(rootPos);
    const lower = tipPos.distanceTo(midPos);
    const toTarget = targetWorld.clone().sub(rootPos);
    const distance = THREE.MathUtils.clamp(
      toTarget.length(),
      Math.abs(upper - lower) + 1e-4,
      (upper + lower) * 0.985,
    );
    const direction = toTarget.normalize();
    const pole = poleWorld.clone().sub(rootPos);
    pole.sub(direction.clone().multiplyScalar(pole.dot(direction)));
    if (pole.lengthSq() < 1e-8) pole.set(0, -1, 0);
    pole.normalize();
    const cosAngle = THREE.MathUtils.clamp(
      (upper * upper + distance * distance - lower * lower) / (2 * upper * distance),
      -1,
      1,
    );
    const angle = Math.acos(cosAngle);
    const midTarget = rootPos.clone()
      .add(direction.multiplyScalar(Math.cos(angle) * upper))
      .add(pole.multiplyScalar(Math.sin(angle) * upper));
    aimBoneAt(root, mid, midTarget);
    aimBoneAt(mid, tip, targetWorld);
  };

  const buildClimbRig = () => {
    Object.keys(ikBones).forEach((key) => delete ikBones[key]);
    ikRest.clear();
    climbRig = null;
    const model = characterRuntime.model;
    if (!model) return;
    model.traverse((child) => {
      if (child.isBone) ikBones[child.name] = child;
    });
    [
      "upperarm_l", "lowerarm_l", "hand_l", "upperarm_r", "lowerarm_r", "hand_r",
      "thigh_l", "calf_l", "foot_l", "thigh_r", "calf_r", "foot_r",
      "pelvis", "spine_01", "spine_02", "neck_01",
    ].forEach((name) => {
      const bone = ikBones[name];
      if (bone) ikRest.set(bone, bone.quaternion.clone());
    });
    const required = ["upperarm_l", "lowerarm_l", "hand_l", "thigh_l", "calf_l", "foot_l", "pelvis"];
    if (required.some((name) => !ikBones[name])) return;

    protagonistAnchor.updateMatrixWorld(true);
    const worldPos = (bone) => bone.getWorldPosition(new THREE.Vector3());
    const anchorY = protagonistAnchor.getWorldPosition(new THREE.Vector3()).y;
    const heightOf = (bone) => worldPos(bone).y - anchorY;
    const span = (from, to) => worldPos(from).distanceTo(worldPos(to));
    const armLength = span(ikBones.upperarm_l, ikBones.lowerarm_l) + span(ikBones.lowerarm_l, ikBones.hand_l);
    const legLength = span(ikBones.thigh_l, ikBones.calf_l) + span(ikBones.calf_l, ikBones.foot_l);
    const shoulderHeight = heightOf(ikBones.upperarm_l);
    const hipHeight = heightOf(ikBones.pelvis);
    const ankleHeight = heightOf(ikBones.foot_l);
    const reachForward = 0.05;
    // 先算蹲多少：让"髋 → 横杆"的直线距离落在腿长之内，否则膝盖伸直了也够不到
    const legReach = legLength * 0.95;
    const standDrop = Math.sqrt(Math.max(0.0001, legReach * legReach - reachForward ** 2));
    const crouchWorld = THREE.MathUtils.clamp(hipHeight - standDrop, 0, hipHeight * 0.55);
    // 再算手抓多高。关键：下蹲会把肩膀一起带低 crouchWorld，
    // 不减掉这一截的话手的目标点会超出臂长，IK 只能截在半路上（实测需求距离曾达臂长 1.56 倍）
    const reachUp = Math.sqrt(Math.max(0.0004, (armLength * 0.88) ** 2 - reachForward ** 2));
    const gripHeight = shoulderHeight - crouchWorld + reachUp;
    // 向下取整：宁可让手低一级（约胸口高，正是正常爬梯的握法），
    // 也不要高一级 —— 高一级就会超出臂长，IK 只能把手截在半路
    const handLead = THREE.MathUtils.clamp(Math.floor((gripHeight - ankleHeight) / rungGap), 2, 6);
    // 左右必须按骨骼实际朝向取，不能写死 ±：写反的话手要横跨整个身体去够横杆，
    // 需求距离会直接超出臂长，IK 只能把手截在半路
    const sideOf = (bone) => Math.sign(worldPos(bone).x - worldPos(ikBones.pelvis).x) || 1;
    const limbSide = { hand_l: sideOf(ikBones.hand_l), foot_l: sideOf(ikBones.foot_l) };
    climbRig = {
      bones: ikBones,
      pelvisRestY: ikBones.pelvis.position.y,
      crouchWorld,
      leftSign: limbSide.hand_l,
      limbSide,
      handLead,
      armLength,
      legLength,
      // 脚踝相对锚点的高度：身体抬升量要按它校准，否则脚会系统性悬在落脚点下方
      // （实测未校准时 pelvis→foot 达 0.1656 > 腿长 0.1553，腿被拉长 = 穿模）
      ankleHeight,
      hipHeight,
    };
    visual.dataset.rig = "two-bone-ik";
    visual.dataset.rigInfo = `lead${handLead}/crouch${crouchWorld.toFixed(3)}`;
  };

  const resetClimbPose = () => {
    if (!climbRig) return;
    ikRest.forEach((quaternion, bone) => { bone.quaternion.copy(quaternion); });
    if (ikBones.pelvis) ikBones.pelvis.position.y = climbRig.pelvisRestY;
  };

  const twistBone = (bone, axis, angle) => {
    if (!bone) return;
    const rest = ikRest.get(bone);
    if (!rest) return;
    ikQ1.setFromAxisAngle(axis, angle);
    bone.quaternion.copy(rest).premultiply(ikQ1);
  };

  const ikAxisX = new THREE.Vector3(1, 0, 0);
  const ikAxisZ = new THREE.Vector3(0, 0, 1);

  // 通用姿态：先摆躯干和盆骨，再把四肢用两骨 IK 钉到目标点上
  // pole 是"中间关节往哪边弯"的提示点：手肘朝外下方，膝盖朝身前（-z）
  const poseRig = (targets, options) => {
    if (!climbRig || !targets) return;
    const {
      crouch = 1,
      lean = -0.12,
      leanUpper = -0.06,
      neck = 0.24,
      sway = 0,
      armOut = 0.16,
      armDrop = -0.2,
      armFwd = -0.05,
      legOut = 0.05,
      legDrop = -0.04,
      legFwd = -0.2,
      blend = 1,
    } = options || {};
    const bones = climbRig.bones;
    if (bones.pelvis) {
      const scaleY = bones.pelvis.getWorldScale(ikV4).y || 1;
      const drop = (climbRig.crouchWorld * crouch) / scaleY;
      bones.pelvis.position.y = climbRig.pelvisRestY - drop * blend;
    }
    twistBone(bones.spine_01, ikAxisX, lean);
    twistBone(bones.spine_02, ikAxisX, leanUpper);
    twistBone(bones.neck_01, ikAxisX, neck);
    const side = climbRig.leftSign;
    const pole = new THREE.Vector3();
    const clamped = new THREE.Vector3();
    const solve = (rootName, midName, tipName, target, ox, oy, oz) => {
      const root = bones[rootName];
      const mid = bones[midName];
      const tip = bones[tipName];
      if (!root || !mid || !tip || !target) return;
      const rootPos = root.getWorldPosition(ikV4).clone();
      // 安全钳制：目标点若超出"根关节 + 肢长"的可达球，就地拉到球面上。
      // 这一步是"不穿模"的兜底 —— 下梯起步段（身体还在梯子上方）时
      // 手的目标点比肩低 0.22，而臂长只有 0.078（约 3 倍臂长），
      // IK 只能把整条手臂拉直再截在半路，观感就是"胳膊笔直垂着、手不在横杆上"。
      // 钳到 0.96 倍肢长既保证够得到，又留一点余量避免完全锁死。
      const midPos = mid.getWorldPosition(ikV2).clone();
      const tipPos = tip.getWorldPosition(ikV3).clone();
      const reach = (midPos.distanceTo(rootPos) + tipPos.distanceTo(midPos)) * 0.96;
      clamped.copy(target);
      const delta = clamped.clone().sub(rootPos);
      const dist = delta.length();
      if (dist > reach && dist > 1e-6) {
        clamped.copy(rootPos).add(delta.multiplyScalar(reach / dist));
      }
      // pole 是"中间关节往哪边弯"的提示点。调用方传入的 ox 已经带了侧向符号
      // （armOut * side），这里不要再乘一次 side，否则会双重镜像。
      pole.set(rootPos.x + ox, rootPos.y + oy, rootPos.z + oz);
      solveTwoBone(root, mid, tip, clamped, pole);
    };
    solve("upperarm_l", "lowerarm_l", "hand_l", targets.hand_l, -armOut * side, armDrop, armFwd);
    solve("upperarm_r", "lowerarm_r", "hand_r", targets.hand_r, armOut * side, armDrop, armFwd);
    solve("thigh_l", "calf_l", "foot_l", targets.foot_l, -legOut * side, legDrop, legFwd);
    solve("thigh_r", "calf_r", "foot_r", targets.foot_r, legOut * side, legDrop, legFwd);
    twistBone(bones.pelvis, ikAxisZ, sway * 0.1);
    // blend < 1 时把姿态平滑退回骨骼静置位：翻上猫道 / 从猫道下梯那一段用得上，
    // 否则手还挂在横杆上、人已经站到平台上了，IK 会被拉成超长手臂
    if (blend < 1) {
      Object.values(bones).forEach((bone) => {
        const rest = ikRest.get(bone);
        if (rest) bone.quaternion.slerp(rest, 1 - blend);
      });
    }
  };

  // 攀爬：躯干贴梯前倾、抬头看上方、手脚交替抓踩横杆；下行时低头看脚下
  const applyClimbPose = (targets, sway, blend = 1, down = false) => poseRig(targets, {
    blend,
    crouch: 1,
    lean: -0.14,
    leanUpper: -0.07,
    neck: down ? -0.18 : 0.28,
    sway,
    armOut: 0.16,
    armDrop: -0.2,
    armFwd: -0.06,
    legOut: 0.05,
    legDrop: -0.04,
    legFwd: -0.2,
  });

  // 拉绳：站定后身体后仰，双手抓着绳把往下带，拉的那一下蹲得更低
  const applyPullPose = (targets, strain) => poseRig(targets, {
    crouch: 0.5 + strain * 0.95,
    lean: 0.05 + strain * 0.22,
    leanUpper: 0.03 + strain * 0.1,
    neck: 0.16,
    sway: 0,
    armOut: 0.1,
    armDrop: -0.16,
    armFwd: -0.18,
    legOut: 0.05,
    legDrop: -0.04,
    legFwd: -0.14,
  });

  const findExactClip = (clips, names) => names
    .map((name) => clips.find((clip) => clip.name.toLowerCase() === name))
    .find(Boolean);

  const makeInPlaceClip = (clip) => {
    // 只剥掉骨盆位移（把动作"原地化"），其余轨道一律保留。
    // 注意：曾经这里还额外删掉 walk/run/sprint 的 hand_l/hand_r.quaternion，
    // 而模型加载后没有任何其它代码驱动手部旋转 —— 结果走路时手保持固定朝向、
    // 只有小臂在摆，看起来就是"手部动作不自然"。攀爬/拉绳期间的手部姿态由
    // IK 接管并在退出时复位，不依赖这里删轨道。
    const tracks = clip.tracks.filter((track) => !/pelvis\.position$/i.test(track.name));
    return new THREE.AnimationClip(clip.name, clip.duration, tracks);
  };

  const playCharacterAction = (name, fade = 0.2) => {
    const nextAction = characterRuntime.actions[name];
    if (!nextAction || nextAction === characterRuntime.currentAction) return;
    nextAction.reset().fadeIn(fade).play();
    characterRuntime.currentAction?.fadeOut(fade);
    characterRuntime.currentAction = nextAction;
    visual.dataset.action = name;
    // 关键：把不在用的 action 真正停掉，而不是只 fadeOut。
    // 之前只调 fadeOut 不 stop，导致所有 action 长期同时处于播放态、
    // 各自权重都算 1 —— mixer 会把 idle/alert/run/hide/walk 五段动画
    // 一起平均进同一个骨骼，走路时手臂就是五段的混合结果，
    // 看起来"手不知道在干嘛"。停掉后同一时刻只有一段在跑。
    Object.entries(characterRuntime.actions).forEach(([key, action]) => {
      if (key === name) return;
      window.setTimeout(() => {
        if (characterRuntime.currentAction !== action) action.stop();
      }, Math.ceil(fade * 1000) + 20);
    });
  };

  const actionForStoryMode = {
    idle: "idle",
    follow: "walk",
    lit: "idle",
    approach: "walk",
    climb: "alert",
    perch: "idle",
    descend: "alert",
    pull: "alert",
    glow: "idle",
    resolve: "walk",
    depart: "walk",
    arrived: "idle",
  };

  const npcRuntimes = [];
  const characterLoader = new GLTFLoader();
  characterLoader.load(
    "./assets/characters/red-sweater-boy-hero-v2.glb",
    (gltf) => {
      const model = gltf.scene;
      const bounds = new THREE.Box3().setFromObject(model);
      const height = Math.max(0.01, bounds.max.y - bounds.min.y);
      const scale = 0.325 / height;
      model.scale.setScalar(scale);
      model.position.set(0, -bounds.min.y * scale, 0);
      model.rotation.y = Math.PI;
      model.traverse((child) => {
        if (!child.isMesh) return;
        child.castShadow = true;
        child.receiveShadow = true;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.filter(Boolean).forEach((material) => {
          material.roughness = Math.max(0.72, material.roughness ?? 0.72);
          material.metalness = Math.min(0.04, material.metalness ?? 0);
        });
      });
      protagonist.visible = false;
      protagonistAnchor.add(model);
      characterRuntime.model = model;
      characterRuntime.mixer = new THREE.AnimationMixer(model);
      const clipMap = {
        idle: ["idle_loop"],
        alert: ["interact", "idle_torch_loop"],
        run: ["sprint_loop", "run_loop"],
        hide: ["crouch_idle_loop"],
        // 优先用 walk_loop：经解码 GLB 实测，walk_formal_loop 的上臂整周期只转
        // 2.6°（腿却在动，calf 80°），是"手插兜"式的僵直走姿；
        // walk_loop 的上臂有 32.4°、小臂 27.2°、手腕 12.9°，才是正常摆臂。
        // 之前把 formal 排在前面，正是"走路时手部动作不自然"的直接原因。
        walk: ["walk_loop", "walk_formal_loop"],
      };
      Object.entries(clipMap).forEach(([name, candidates]) => {
        const sourceClip = findExactClip(gltf.animations, candidates);
        if (!sourceClip) return;
        const clip = makeInPlaceClip(sourceClip);
        characterRuntime.actions[name] = characterRuntime.mixer.clipAction(clip);
      });
      const npcWalkSource = findExactClip(gltf.animations, ["walk_loop", "walk_formal_loop"]);
      if (npcWalkSource) {
        const npcWalkClip = makeInPlaceClip(npcWalkSource);
        const npcTones = [0x293336, 0x20292c, 0x343c3d, 0x252e31, 0x30383a, 0x1d2629];
        queue.forEach((figure, index) => {
          const clone = cloneSkeleton(model);
          clone.scale.multiplyScalar(0.92 / figure.scale.x);
          clone.position.y -= 0.21;
          clone.traverse((child) => {
            if (!child.isMesh) return;
            const sourceMaterials = Array.isArray(child.material) ? child.material : [child.material];
            const clonedMaterials = sourceMaterials.map((sourceMaterial) => {
              const material = sourceMaterial.clone();
              material.color?.lerp(new THREE.Color(npcTones[index % npcTones.length]), 0.76);
              if (material.emissive) material.emissive.set(0x050809);
              material.emissiveIntensity = 0.08;
              material.roughness = Math.max(0.88, material.roughness ?? 0.88);
              material.metalness = 0;
              return material;
            });
            child.material = Array.isArray(child.material) ? clonedMaterials : clonedMaterials[0];
            child.castShadow = true;
            child.receiveShadow = true;
          });
          figure.children.forEach((child) => { child.visible = false; });
          figure.rotation.y = -Math.PI / 2;
          figure.add(clone);
          const mixer = new THREE.AnimationMixer(clone);
          const action = mixer.clipAction(npcWalkClip);
          const baseTimeScale = 0.78 + (index % 4) * 0.08;
          action.play();
          action.time = npcWalkClip.duration * ((index * 0.173) % 1);
          action.timeScale = baseTimeScale;
          const runtime = { action, baseTimeScale, mixer };
          figure.userData.npcRuntime = runtime;
          npcRuntimes.push(runtime);
        });
        visual.dataset.npcs = "skeletal-walk";
        visual.dataset.npcCount = String(npcRuntimes.length);
      }
      buildClimbRig();
      characterRuntime.loaded = true;
      playCharacterAction(actionForStoryMode[characterStory.mode], 0);
      visual.dataset.model = "ready";
      visual.dataset.motion = "skeletal-locomotion";
    },
    undefined,
    () => {
      visual.dataset.model = "fallback";
      visual.dataset.npcs = "procedural-fallback";
    },
  );

  const queue = [];
  for (let index = 0; index < 6; index += 1) {
    const figure = createCharacter({ distant: true });
    figure.position.set(-2.25 + index * 0.82, -0.19, -0.96 - (index % 2) * 0.05);
    figure.rotation.y = -0.22;
    figure.userData.speed = 0.22 + (index % 3) * 0.035;
    queue.push(figure);
    world.add(figure);
  }
  visual.dataset.npcs = "procedural-loading";

  const cable = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-2.3, 1.68, -0.35),
      new THREE.Vector3(-1.1, 1.57, -0.52),
      new THREE.Vector3(0.2, 1.6, -0.65),
      new THREE.Vector3(1.42, 1.48, -0.45),
      new THREE.Vector3(2.35, 1.53, -0.3),
    ]),
    new THREE.LineBasicMaterial({ color: 0x11191c, transparent: true, opacity: 0.9 }),
  );
  world.add(cable);

  const dustCount = compactViewport.matches ? 420 : 760;
  const dustPositions = new Float32Array(dustCount * 3);
  const dustBase = new Float32Array(dustCount * 3);
  const dustSeed = new Float32Array(dustCount);
  const dustRandom = createRandom(508173);
  for (let index = 0; index < dustCount; index += 1) {
    const progress = Math.pow(dustRandom(), 0.88);
    const radius = progress * (0.1 + dustRandom() * 0.74);
    const angle = dustRandom() * Math.PI * 2;
    const offset = index * 3;
    dustBase[offset] = THREE.MathUtils.lerp(beamSource.x, beamTarget.x, progress) + Math.cos(angle) * radius;
    dustBase[offset + 1] = THREE.MathUtils.lerp(beamSource.y, beamTarget.y, progress) + Math.sin(angle) * radius * 0.64;
    dustBase[offset + 2] = THREE.MathUtils.lerp(beamSource.z, beamTarget.z, progress) + (dustRandom() - 0.5) * radius;
    dustPositions[offset] = dustBase[offset];
    dustPositions[offset + 1] = dustBase[offset + 1];
    dustPositions[offset + 2] = dustBase[offset + 2];
    dustSeed[index] = dustRandom();
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
  const dustMaterial = new THREE.PointsMaterial({ color: 0xc0cec5, map: coolGlow, size: 0.025, opacity: 0.42, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
  const dust = new THREE.Points(dustGeometry, dustMaterial);
  dust.renderOrder = 4;
  world.add(dust);

  const timer = new THREE.Timer();
  timer.connect(document);
  // 无头验收时 document.hidden 恒为 true，THREE.Timer 会因此把 delta 归零，
  // 动画永远走不动（表现为 progress 卡在 0.05、四肢姿态冻结）。
  // 加一个只在 ?debug 下能用来"手动推进时间"的覆盖值，正式页面恒为 null。
  let debugElapsedOverride = null;
  const pointer = new THREE.Vector2();
  const pointerDesired = new THREE.Vector2();
  const homePosition = new THREE.Vector3(-0.46, -1.025, 0.52);
  const beamAnchor = new THREE.Vector3(idleBeamAnchor.x, -0.985, idleBeamAnchor.z);
  let beamHold = 0;
  const characterStory = {
    mode: "idle",
    modeSince: 0,
    target: homePosition.clone(),
    nextMode: null,
    exposure: 0,
  };
  // ── 可交互装置：左侧梯子与猫道、右侧绳索与卷帘
  const rigMaterial = new THREE.MeshStandardMaterial({ color: 0x0f1719, roughness: 0.86, metalness: 0.26 });
  // 可交互装置自带一层微光，颜色和它脚下的提示环一致 —— 这是"不看文字也认得出"的主线索
  const ladderGlowMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a2427,
    roughness: 0.78,
    metalness: 0.34,
    emissive: 0x2f4f45,
    emissiveIntensity: 0.5,
  });
  const ropeGlowMaterial = new THREE.MeshStandardMaterial({
    color: 0x241d16,
    roughness: 0.8,
    metalness: 0.3,
    emissive: 0x503a22,
    emissiveIntensity: 0.5,
  });
  // 站位贴着梯子（z 差 0.03）：再远手臂就够不到横杆，IK 会被截断成"伸不直的手"
  const ladderStand = new THREE.Vector3(-1.5, homePosition.y, -1.52);
  const perchSpot = new THREE.Vector3(-1.5, -0.295, -1.98);
  const ropeStand = new THREE.Vector3(0.9, homePosition.y, -1.93);

  // 梯子按真实比例重做：人物高 0.325，单级 0.062（约 0.19 倍身高），
  // 攀爬高度 0.73（约 2.2 倍身高），手脚交替才有可信的步频
  const rungGap = 0.062;
  const rungCount = 12;
  const rungBaseY = -0.98;
  const ladderRungs = Array.from({ length: rungCount }, (_, index) => rungBaseY + index * rungGap);
  const ladderTopY = rungBaseY + (rungCount - 1) * rungGap;
  const deckTopY = -0.3;

  const platformDeck = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.06, 0.86), bridgeMaterial);
  platformDeck.position.set(-1.5, deckTopY - 0.03, -2.03);
  platformDeck.castShadow = true;
  platformDeck.receiveShadow = true;
  const platformEdge = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.04, 0.04), railMaterial);
  platformEdge.position.set(-1.5, deckTopY + 0.015, -1.61);
  const platformRail = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.03, 0.03), railMaterial);
  platformRail.position.set(-1.5, deckTopY + 0.32, -2.44);
  const platformGlow = new THREE.Mesh(new THREE.BoxGeometry(1.44, 0.018, 0.05), litSurface);
  platformGlow.position.set(-1.5, deckTopY + 0.002, -1.62);
  world.add(platformDeck, platformEdge, platformRail, platformGlow);
  [-2.16, -0.84].forEach((postX) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.74, 0.055), rigMaterial);
    post.position.set(postX, -0.67, -2.3);
    post.castShadow = true;
    const brace = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.28), rigMaterial);
    brace.position.set(postX, -0.42, -2.42);
    world.add(post, brace);
  });

  // 梯宽按真实比例：真人梯子约一个肩宽（≈0.25 倍身高），这里取 0.14（0.43 倍身高，
  // 已经比现实略宽一点，是为了让玩家一眼看出是梯子），否则人物站在上面像个小矮人
  const ladder = new THREE.Group();
  [-1.57, -1.43].forEach((railX) => {
    const railMesh = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.82, 0.026), ladderGlowMaterial);
    railMesh.position.set(railX, -0.63, -1.55);
    railMesh.castShadow = true;
    ladder.add(railMesh);
  });
  ladderRungs.forEach((rungY) => {
    const rung = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.011, 0.024), ladderGlowMaterial);
    rung.position.set(-1.5, rungY, -1.55);
    ladder.add(rung);
  });
  world.add(ladder);

  // ── 攀爬目标点：把"第几级横杆"换算成骨骼 IK 要用的世界坐标
  const rungLocalX = -1.5;
  const rungLocalZ = -1.55;
  const groundRung = -1;                        // 地面算作第 -1 级
  const topRung = rungCount - 1;
  const climbSteps = topRung - groundRung;      // 一共 12 步，对应 12 级横杆
  const rungYAt = (index) => rungBaseY
    + THREE.MathUtils.clamp(index, groundRung, topRung) * rungGap;
  const worldPoint = (x, y, z, out) => world.localToWorld(out.set(x, y, z));
  const rungPoint = (index, offsetX, out) => worldPoint(
    rungLocalX + offsetX,
    rungYAt(index),
    rungLocalZ,
    out,
  );
  const rungForStep = (step, dir) => (dir > 0 ? groundRung + step : topRung - step);
  // 身体抬升量：锚点要坐落在"脚踝刚好踩到横杆"的高度上。
  // 关键：脚踝骨骼相对锚点本身有 ankleHeight 的偏移，必须补上这一截，
  // 否则脚会系统性悬在落脚点下方约半级横杆，腿被 IK 拉长（实测超出腿长 6.6% = 穿模）。
  const climbAnkleOffset = climbRig ? climbRig.ankleHeight : 0;
  const climbBodyLift = climbAnkleOffset + (homePosition.y - rungYAt(groundRung));
  // 身体高度只跟"脚踩在哪一级"走，不再在顶部往猫道高度插值。
  // 曾经顶部用 climbBodyLiftTop = perchSpot.y - rungYAt(topRung) 把身体抬到猫道高度：
  // 上行结束时很合适（人确实站到猫道上了），但下行是把它当**起点**用的 ——
  // 结果下梯前段身体的肩部高于梯子最高一级（实测肩 y=-0.163 > 顶杆 y=-0.304），
  // 而臂长只有 0.078（≈1.26 级横杆），手根本够不到任何一根横杆，
  // IK 只能把手臂拉直截在半路，观感就是"两条胳膊笔直垂着往下滑"。
  // 上/下猫道那一段的位移交给 topEase 只处理 z（身体从猫道侧挪到梯子侧），
  // 高度一律由脚下的横杆决定。
  const climbBodyY = (travelled) => rungYAt(groundRung + travelled) + climbBodyLift;
  // 一开始就落在最低一级上，避免进入攀爬的第一帧读到还没写过的 (0,0,0)
  const climbTargets = {
    hand_l: rungPoint(2, -0.045, new THREE.Vector3()),
    hand_r: rungPoint(2, 0.045, new THREE.Vector3()),
    foot_l: rungPoint(0, -0.032, new THREE.Vector3()),
    foot_r: rungPoint(0, 0.032, new THREE.Vector3()),
  };
  const limbPointA = new THREE.Vector3();
  const limbPointB = new THREE.Vector3();
  // 一级动作拆成"支撑 + 摆动"：支撑段锁死在横杆上，摆动段沿弧线换到下一级。
  // 摆动占比 0.62；中段额外把目标点朝身体收（flex），让膝盖/手肘真正弯起来 ——
  // 只抬高 y 是不够的，腿会保持伸直、看起来像"贴着梯子平移"。
  const limbToRung = (out, step, dir, offsetX, clearance, flex = 0, flexFrom = null, flexBase = 0) => {
    const base = Math.floor(step);
    // 支撑段 45% + 摆动段 55%。注意窗口必须让"相位中点"对应 ease≈1：
    // 写成 (frac-0.38)/0.62 时 frac=0.5 只得到 swing=0.19 → arc 峰值仅 0.30，
    // 摆动几乎看不出来（膝/肘不弯，像贴着梯子平移）。
    const swing = THREE.MathUtils.clamp((step - base - 0.45) / 0.55, 0, 1);
    const ease = swing * swing * (3 - 2 * swing);
    rungPoint(rungForStep(base, dir), offsetX, limbPointA);
    rungPoint(rungForStep(base + 1, dir), offsetX, limbPointB);
    out.lerpVectors(limbPointA, limbPointB, ease);
    // 弧线两端为 0（中间点刚好贴住横杆），中段最大：避免手脚从横杆里穿过去。
    // 屈膝/屈肘靠"把目标点朝身体收"实现：sin 弧线让摆动中段的目标点离开梯子、
    // 更靠近身体 → 该肢体被折起来（膝盖/手肘真正弯曲），而不是整体平移。
    const arc = Math.sin(ease * Math.PI);
    const lift = arc * clearance;
    out.z += lift;
    out.y += lift * 0.6;
    // flex：摆动中段把目标点朝"关节根"（髋/肩，由 flexFrom 传入）收，
    // 让该肢体的中间关节真正折起来。两端 arc=0 不生效，落点仍精确落在横杆上。
    // 注意 z 分量必须一起收：梯子方向（z）才是"抬腿离开横杆"的主方向；
    // 只收 x/y 时，下梯这种"脚只往下挪一级"的场景膝盖仍然不会弯（实测 1.000）。
    if ((flex > 0 || flexBase > 0) && flexFrom) {
      // k = 摆动量（两端为 0）+ 基础量（全程都有）。
      // 加 flexBase 是为了让"支撑段"也保持屈肘/屈膝，而不是被拉成笔直的一条线。
      const k = Math.min(0.92, arc * flex + flexBase);
      out.x += (flexFrom.x - out.x) * k;
      out.y += (flexFrom.y - out.y) * k;
      out.z += (flexFrom.z - out.z) * k;
    }
    return out;
  };

  const ropeAnchor = new THREE.Vector3(0.9, 1.92, -1.98);
  // 绳长定成"手刚好抓得到"：人物头顶约 -0.70，绳把落在胸口高度
  const ropeRestLength = 2.72;
  const ropeMaterial = new THREE.MeshStandardMaterial({
    color: 0x3d352c,
    roughness: 0.94,
    emissive: 0x2b1e11,
    emissiveIntensity: 0.55,
  });
  const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, ropeRestLength, 6), ropeMaterial);
  rope.position.set(ropeAnchor.x, ropeAnchor.y - ropeRestLength / 2, ropeAnchor.z);
  world.add(rope);
  const ropeHandle = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.012, 6, 16), ropeGlowMaterial);
  ropeHandle.rotation.x = Math.PI / 2;
  ropeHandle.position.set(ropeAnchor.x, ropeAnchor.y - ropeRestLength, ropeAnchor.z);
  world.add(ropeHandle);

  const revealMaterial = new THREE.MeshStandardMaterial({
    color: 0x241c15,
    emissive: 0xffb066,
    emissiveIntensity: 0,
    roughness: 0.9,
  });
  const revealPanel = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 1.0), revealMaterial);
  revealPanel.position.set(1.85, 0.25, -2.5);
  world.add(revealPanel);
  const revealLight = new THREE.PointLight(0xffc58c, 0, 5.2, 2);
  revealLight.position.set(1.85, 0.22, -2.2);
  world.add(revealLight);
  const shutterSlats = Array.from({ length: 9 }, (_, index) => {
    const slat = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.1, 0.035), rigMaterial);
    slat.position.set(1.85, -0.2 + index * 0.112, -2.46);
    slat.userData.closedY = slat.position.y;
    slat.userData.openY = 0.72 - index * 0.038;
    slat.castShadow = true;
    world.add(slat);
    return slat;
  });
  const frameTop = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.05, 0.06), railMaterial);
  frameTop.position.set(1.85, 0.79, -2.44);
  const frameBottom = frameTop.clone();
  frameBottom.position.y = -0.29;
  world.add(frameTop, frameBottom);
  [1.36, 2.34].forEach((frameX) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.14, 0.06), railMaterial);
    post.position.set(frameX, 0.25, -2.44);
    world.add(post);
  });

  const createHotspot = (x, z, color) => {
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.17, 0.21, 48), material);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, -1.012, z);
    ring.renderOrder = 3;
    world.add(ring);
    return ring;
  };

  // 不需要文字的可点提示：地面呼吸环 + 一圈圈向外扩散的涟漪 + 一道竖直光柱。
  // 三样都是"会动的光"，在人眼余光里就能被注意到，比一行说明文字更早被看到。
  const createBeacon = (x, z, color, height) => {
    const columnMaterial = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.055, height, 14, 1, true), columnMaterial);
    column.position.set(x, -1.01 + height / 2, z);
    column.renderOrder = 2;
    world.add(column);
    const ripples = [0, 0.5].map((offset) => {
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.2, 48), material);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(x, -1.008, z);
      ring.renderOrder = 3;
      ring.userData.offset = offset;
      world.add(ring);
      return ring;
    });
    return { column, ripples, hover: 0, kind: "beam" };
  };

  // 点击判定体：梯子和绳子本身只有几厘米粗，直接拿它们做射线检测几乎点不中。
  // 罩一层看不见的盒子（真的写得进射线、但一点都不画出来），整片区域都能点。
  const pickMaterial = new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: false,
    transparent: true,
    opacity: 0,
  });
  const createPickVolume = (x, y, z, w, h, d) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), pickMaterial);
    mesh.position.set(x, y, z);
    mesh.renderOrder = -1;
    world.add(mesh);
    return mesh;
  };
  const ladderVolume = createPickVolume(-1.5, -0.64, -1.5, 0.72, 1.06, 0.62);
  const ropeVolume = createPickVolume(0.9, -0.52, -2.0, 0.76, 1.24, 0.64);

  const ladderHotspot = createHotspot(ladderStand.x, -1.4, 0x9cc0b1);
  const ropeHotspot = createHotspot(ropeStand.x, -2.02, 0xd3a672);
  const ladderBeacon = { ...createBeacon(ladderStand.x, -1.4, 0x9cc0b1, 1.08), kind: "ladder" };
  const ropeBeacon = { ...createBeacon(ropeStand.x, -2.02, 0xd3a672, 1.4), kind: "rope" };
  const beacons = [ladderBeacon, ropeBeacon];
  let shutterProgress = 0;
  let shutterTarget = 0;
  let climbPoseActive = false;

  let changeCount = 0;
  let storyResolved = false;
  let chosenPathIndex = 1;
  const storyStages = {
    idle: ["神秘的人 · 待机", "他站在暗处，等一束光找到他"],
    follow: ["光换了位置", "他转过身，朝光走过去"],
    lit: ["他站在光里", "光停在哪，他就停在哪"],
    approach: ["他选中了一件东西", "先走过去，再决定怎么用"],
    climb: ["他抓住了梯子", "一级一级往上，离队列越来越远"],
    perch: ["他站在猫道上", "换个高度，看得见队列之外的方向"],
    descend: ["他从高处下来", "落地之后，继续跟着光走"],
    pull: ["他握住绳子", "一下、两下，卷帘开始上升"],
    glow: ["卷帘升起了", "他自己把这块地方点亮了"],
    resolve: ["三次变化已被留下", "旧道路分开，人群开始走向不同方向"],
    depart: ["他做出了选择", "这一次，他主动走进光里"],
    arrived: ["拥抱变化", "没有现成地图，也可以亲手走出一条路"],
  };
  const updateStoryLabels = (mode) => {
    const stage = storyStages[mode] || storyStages.idle;
    const [kicker, copy] = stage;
    if (storyKickerLabel) storyKickerLabel.textContent = kicker;
    if (storyCopyLabel) storyCopyLabel.textContent = copy;
  };
  const updateProgressLabels = () => {
    if (choiceCountLabel) {
      choiceCountLabel.textContent = `变化 ${String(changeCount).padStart(2, "0")} / ${String(changeGoal).padStart(2, "0")}`;
    }
    if (storyStageLabel) storyStageLabel.textContent = stageNames[characterStory.mode] || stageNames.idle;
    visual.dataset.choices = String(changeCount);
  };
  // 发现提示：不提前剧透。光束扫到梯子/绳子附近时，才浮现一句自然的话
  const discoveryHints = {
    ladder: "这里好像有梯子……",
    rope: "绳子下面好像藏着什么……",
  };
  let lastDiscoveryKind = null;
  const updateDiscoveryHint = () => {
    if (!discoveryHintLabel) return;
    const mode = characterStory.mode;
    let kind = null;
    // 爬梯/下梯/拉绳期间不重复提示，其余时候光束扫到就自然浮现
    const busy = mode === "climb" || mode === "descend" || mode === "pull";
    if (!busy) {
      const beamX = beamTarget.x;
      const beamZ = beamTarget.z;
      const ladderDist = Math.hypot(beamX - ladderStand.x, beamZ - ladderStand.z);
      const ropeDist = Math.hypot(beamX - ropeStand.x, beamZ - ropeStand.z);
      const reach = 1.05;
      const onPerch = mode === "perch";
      const shutterDone = mode === "glow" && shutterProgress > 0.9;
      if (!onPerch && ladderDist < reach && ladderDist <= ropeDist) kind = "ladder";
      else if (!shutterDone && ropeDist < reach) kind = "rope";
    }
    if (kind === lastDiscoveryKind) return;
    lastDiscoveryKind = kind;
    discoveryHintLabel.textContent = kind ? discoveryHints[kind] : "";
    visual.dataset.discovery = kind || "";
  };
  visual.dataset.story = characterStory.mode;
  visual.dataset.scan = "idle";
  visual.dataset.scene = "mystery-figure";
  visual.dataset.queue = "repetitive";
  visual.dataset.paths = "single";
  visual.dataset.choices = "0";
  updateStoryLabels(characterStory.mode);
  updateProgressLabels();
  let hoverAmount = 0;
  let hoverTarget = 0;
  let hoverKind = null;
  let lastInteractionAt = 0;
  let visitorLightOffset = 0;
  let visitorLightPulse = 0;
  let visitorTraceCount = 0;
  let touchDragging = false;
  let previousElapsed = 0;
  let characterDisplayScale = 1;
  let visible = true;
  let frame = 0;
  let scanPulseStartedAt = -10;
  const scanPulseOrigin = beamTarget.clone();
  let pulseResetTimer = 0;
  let lastFootstepAt = -10;
  let footstepCursor = 0;

  const setCharacterMode = (mode, elapsed) => {
    if (characterStory.mode === mode) return;
    characterStory.mode = mode;
    characterStory.modeSince = elapsed;
    visual.dataset.story = mode;
    visual.dataset.queue = storyResolved
      ? "dispersing"
      : mode === "follow" || mode === "lit"
        ? "watching"
        : "repetitive";
    updateStoryLabels(mode);
    updateProgressLabels();
    playCharacterAction(actionForStoryMode[mode]);
  };

  const triggerScanPulse = () => {
    scanPulseStartedAt = previousElapsed;
    scanPulseOrigin.copy(beamTarget);
    visual.dataset.scan = "active";
    hero.classList.remove("is-pulsing");
    void visual.offsetWidth;
    hero.classList.add("is-pulsing");
    window.clearTimeout(pulseResetTimer);
    pulseResetTimer = window.setTimeout(() => {
      hero.classList.remove("is-pulsing");
      visual.dataset.scan = "idle";
    }, 860);
  };

  const beginDivergence = () => {
    storyResolved = true;
    chosenPathIndex = beamTarget.x < -0.45 ? 0 : beamTarget.x > 0.45 ? 2 : 1;
    visual.dataset.paths = "diverging";
    visual.dataset.queue = "dispersing";
    queue.forEach((figure, index) => {
      const branch = pathTargets[index % pathTargets.length];
      figure.userData.branchTarget = branch.clone().setY(-0.19);
      figure.userData.branchTarget.x += (index > 2 ? 0.13 : -0.08) * (index % 2 ? 1 : -1);
      figure.userData.branchTarget.z += index > 2 ? 0.12 : -0.03;
    });
    characterStory.target.copy(pathOrigin).setY(homePosition.y);
    setCharacterMode("resolve", previousElapsed);
    updateProgressLabels();
  };

  const registerChange = () => {
    if (storyResolved || changeCount >= changeGoal) return;
    changeCount += 1;
    updateProgressLabels();
    if (changeCount === changeGoal) beginDivergence();
  };

  let climbDuration = 4.4;   // 12 级横杆，约 0.37 秒一级
  const pullDuration = 3.1;

  const dropFootstep = (elapsed) => {
    const trace = footstepTraces[footstepCursor % footstepTraces.length];
    trace.position.x = protagonistAnchor.position.x + (footstepCursor % 2 ? 0.018 : -0.018);
    trace.position.z = protagonistAnchor.position.z + 0.025;
    trace.userData.bornAt = elapsed;
    trace.visible = true;
    lastFootstepAt = elapsed;
    footstepCursor += 1;
  };

  const releaseFootsteps = (elapsed) => {
    lastFootstepAt = elapsed;
    footstepTraces.forEach((trace) => { trace.visible = false; });
  };

  const updateCharacterStory = (elapsed, delta) => {
    if (delta <= 0) return;
    const mode = characterStory.mode;
    const goal = mode === "follow" ? beamTarget : characterStory.target;
    const walkingMode = mode === "follow" || mode === "approach" || mode === "resolve" || mode === "depart";
    const posing = mode === "climb" || mode === "descend" || mode === "pull";
    // IK 必须写在动画混合器之后，否则这一帧的姿态会被 clip 覆盖回去
    characterRuntime.mixer?.update(delta);
    if (!posing && climbPoseActive) {
      resetClimbPose();
      climbPoseActive = false;
    }

    if (walkingMode) {
      const toTarget = goal.clone().sub(protagonistAnchor.position);
      const remaining = Math.hypot(toTarget.x, toTarget.z);
      const arriveRadius = mode === "follow" ? 0.07 : 0.045;
      const restY = Math.min(goal.y, homePosition.y);
      const speed = mode === "approach" ? 0.8 : mode === "depart" ? 0.82 : 0.86;
      if (remaining > arriveRadius) {
        const step = Math.min(remaining, speed * delta);
        protagonistAnchor.position.x += (toTarget.x / remaining) * step;
        protagonistAnchor.position.z += (toTarget.z / remaining) * step;
        protagonistAnchor.position.y += (restY - protagonistAnchor.position.y) * Math.min(1, delta * 2.6);
        if (elapsed - lastFootstepAt > 0.14) dropFootstep(elapsed);
        const facing = Math.sign(toTarget.x || 1);
        protagonistAnchor.rotation.y += ((facing > 0 ? -0.8 : 0.8) - protagonistAnchor.rotation.y) * Math.min(1, delta * 7);
      } else if (mode === "follow") {
        setCharacterMode("lit", elapsed);
      } else if (mode === "approach") {
        setCharacterMode(characterStory.nextMode || "follow", elapsed);
      } else if (mode === "resolve") {
        characterStory.target.copy(pathTargets[chosenPathIndex]).setY(homePosition.y);
        setCharacterMode("depart", elapsed);
      } else {
        setCharacterMode("arrived", elapsed);
      }
    }

    if (mode === "climb" || mode === "descend") {
      const progress = Math.min(1, (elapsed - characterStory.modeSince) / climbDuration);
      const goingUp = mode === "climb";
      const dir = goingUp ? 1 : -1;
      const step = progress * climbSteps;
      const travelled = goingUp ? step : climbSteps - step;
      // 梯子↔猫道的换位过渡。
      // topEase 的语义统一为「离猫道有多近」：
      //   上行 —— 越接近终点越"在猫道上"，所以随 step 递增（0 → 1）
      //   下行 —— 起点就在猫道上，所以随 step 递减（1 → 0）
      // 之前下行也写成 step/easeSpan（0 → 1），导致 step>0 的第一帧 topEase 就恒为 1：
      //   · lead = descendLead*(1-topEase) 恒为 0 → 手和脚抓同一级横杆，手臂笔直下垂
      //   · poseBlend = 1-poseEase 恒为 0 → 整段下行都被 slerp 回 bind pose（悬空折叠）
      // 这两个症状（"腿脚不自然" + "穿模"）其实都出自这一个符号错误。
      // 位置换位（zMix）走得快一些（0.45 步），姿态淡入更短（0.3 步），
      // 这样开头那一小段不会出现"人在梯子位置、姿态却还是静置位"。
      const easeSpan = goingUp ? 1.2 : 0.45;
      const raw = goingUp
        ? (step - (climbSteps - easeSpan)) / easeSpan
        : 1 - step / easeSpan;
      const topOut = THREE.MathUtils.clamp(raw, 0, 1);
      const topEase = topOut * topOut * (3 - 2 * topOut);
      // zMix：身体在 z 上位于"梯子 ↔ 猫道"之间的比例。
      // topEase 现在统一表示"离猫道有多近"，所以两个方向都用它直接当比例：
      // 上行越到后面越靠近猫道；下行开头最靠近猫道，随 step 递减回到梯子。
      const zMix = topEase;
      // 姿态淡入
      const poseSpan = goingUp ? 1.2 : 0.3;
      const poseRaw = goingUp
        ? (step - (climbSteps - poseSpan)) / poseSpan
        : 1 - step / poseSpan;
      const poseOut = THREE.MathUtils.clamp(poseRaw, 0, 1);
      const poseEase = poseOut * poseOut * (3 - 2 * poseOut);
      const poseBlend = 1 - poseEase;
      // 身体高度跟着脚下的横杆走，再叠一层踩踏的起伏
      protagonistAnchor.position.set(
        ladderStand.x,
        climbBodyY(travelled) + Math.sin(step * Math.PI * 4) * 0.005,
        THREE.MathUtils.lerp(ladderStand.z, perchSpot.z, zMix),
      );
      protagonistAnchor.rotation.y += (
        THREE.MathUtils.lerp(-0.06, -0.14, zMix) - protagonistAnchor.rotation.y
      ) * Math.min(1, delta * 4);
      // 手要抓在"肩膀高度"的横杆上。肩比骨盆高约 0.13，一级横杆 0.062，
      // 也就是肩大约比脚高 3.7 级。
      // 关键：rungForStep 里已经带了方向（下行 = topRung - step），
      // 所以 step 越大世界高度越低 —— 下行的"手比脚高"必须用**负**的提前量。
      // 之前一直写成正数，实际是把手放到脚**下面**去，
      // 于是手臂被 IK 拉成笔直下垂（"扶着梯子往下滑"的观感）。
      const climbLead = climbRig ? Math.min(climbRig.handLead, 2.2) : 2.2;
      const descendLead = -1.7;
      // 收梯过渡（身体挪上/挪下猫道）时把提前量收到 0，
      // 否则手会被钉在横杆上、身体却往平台走，臂长被拉爆。
      const lead = (goingUp ? climbLead : descendLead) * (1 - topEase);
      // 左右手错开半级；下梯时让"右手与左脚同步"（对侧步态），
      // 观感上才是人在一格格挪，而不是四肢同时平移。
      const handPhase = goingUp ? 0.5 : 0.0;
      const handStep = step + handPhase + lead;
      const side = climbRig ? climbRig.limbSide : { hand_l: -1, foot_l: -1 };
      const handX = side.hand_l * 0.045;
      const footX = side.foot_l * 0.032;
      // 取各肢体的"关节根"世界坐标（髋/肩）作为 flex 的收拢中心，
      // 让摆动段膝盖、手肘真正弯曲而不是整体平移
      const bones = climbRig ? climbRig.bones : null;
      const rootOf = (name) => (bones && bones[name]
        ? bones[name].getWorldPosition(new THREE.Vector3())
        : null);
      const hipL = rootOf("thigh_l");
      const hipR = rootOf("thigh_r");
      const shoL = rootOf("upperarm_l");
      const shoR = rootOf("upperarm_r");
      // 腿弯得更明显（人爬梯时膝盖折得最狠），手臂略收。
      // 注意：手的目标点不能再往肩收（flexBase），因为手的 reach 本来就 >1（够不到），
      // 再收只会把手从横杆上拽开。手"看起来像下垂"的根因是目标点太低，
      // 已用 descendLead 抬高到胸口解决。
      limbToRung(climbTargets.hand_l, handStep, dir, handX, 0.05, 0.3, shoL);
      limbToRung(climbTargets.hand_r, handStep + 0.5, dir, -handX, 0.05, 0.3, shoR);
      limbToRung(climbTargets.foot_l, step, dir, footX, 0.055, 0.42, hipL);
      limbToRung(climbTargets.foot_r, step + 0.5, dir, -footX, 0.055, 0.42, hipR);
      // 登顶/离顶过渡：身体已经在往猫道上挪（climbBodyY 的 lift 往 perchSpot 插值），
      // 但 IK 目标点还钉在梯子横杆上 —— 两者拉开后手会被扯到臂长的 2 倍以上。
      // 所以这一段把四肢目标点同样往身体收（保留 blend 淡出），让手脚跟着躯干一起"收梯"。
      if (topEase > 0) {
        const bodyY = protagonistAnchor.position.y;
        const bodyZ = protagonistAnchor.position.z;
        for (const key of ["hand_l", "hand_r", "foot_l", "foot_r"]) {
          const target = climbTargets[key];
          target.y += (bodyY - target.y) * topEase * 0.8;
          target.z += (bodyZ - target.z) * topEase * 0.5;
        }
      }
      // 姿态淡入/淡出用 poseEase（下行是一条更快的曲线，理由见上面 topEase 的注释），
      // 位置换位仍用 topEase。两者分开后，下行刚开始那一段不会再出现
      // "anchor 还在猫道、pose 却已被 slerp 回 bind pose"的悬空折叠姿态。
      applyClimbPose(climbTargets, Math.sin(step * Math.PI * 2), poseBlend, !goingUp);
      climbPoseActive = true;
      beamAnchor.set(
        protagonistAnchor.position.x,
        Math.min(0.92, protagonistAnchor.position.y + 0.34),
        protagonistAnchor.position.z,
      );
      beamHold = 1;
      if (progress >= 1) {
        releaseFootsteps(elapsed);
        if (goingUp) {
          setCharacterMode("perch", elapsed);
        } else {
          const next = characterStory.nextMode || "follow";
          characterStory.nextMode = null;
          setCharacterMode(next, elapsed);
        }
      }
    }

    if (mode === "pull") {
      const progress = Math.min(1, (elapsed - characterStory.modeSince) / pullDuration);
      const stroke = Math.sin(progress * Math.PI * 6);
      const strain = Math.max(0, stroke);
      // 绳子下拉的行程不能超过臂长能覆盖的范围，否则手会被 IK 扯在绳把外面
      const ropeExtension = strain * 0.05;
      const handleY = ropeAnchor.y - (ropeRestLength + ropeExtension);
      protagonistAnchor.position.set(
        ropeStand.x,
        ropeStand.y - strain * 0.026,
        ropeStand.z,
      );
      protagonistAnchor.rotation.y += (0.04 - protagonistAnchor.rotation.y) * Math.min(1, delta * 4);
      // 双手握住绳把，双脚钉在地面上，靠躯干后仰把绳子往下带
      const side = climbRig ? climbRig.limbSide : { hand_l: -1, foot_l: -1 };
      worldPoint(ropeAnchor.x + side.hand_l * 0.045, handleY, ropeAnchor.z + 0.028, climbTargets.hand_l);
      worldPoint(ropeAnchor.x - side.hand_l * 0.045, handleY, ropeAnchor.z + 0.028, climbTargets.hand_r);
      worldPoint(ropeStand.x + side.foot_l * 0.072, homePosition.y, ropeStand.z + 0.02, climbTargets.foot_l);
      worldPoint(ropeStand.x - side.foot_l * 0.072, homePosition.y, ropeStand.z + 0.02, climbTargets.foot_r);
      applyPullPose(climbTargets, strain);
      climbPoseActive = true;
      beamAnchor.set(ropeStand.x + 0.55, -0.58, ropeStand.z - 0.2);
      beamHold = 1;
      shutterTarget = Math.min(1, Math.max(0, (progress - 0.1) / 0.72));
      if (progress >= 1) {
        releaseFootsteps(elapsed);
        setCharacterMode("glow", elapsed);
      }
    }

    if (mode === "idle" || mode === "lit" || mode === "arrived" || mode === "perch" || mode === "glow") {
      const restY = mode === "perch" ? perchSpot.y : homePosition.y;
      protagonistAnchor.position.y += (restY + Math.sin(elapsed * 1.2) * 0.005 - protagonistAnchor.position.y) * Math.min(1, delta * 3);
      const restingDirection = mode === "arrived"
        ? -0.72
        : mode === "perch"
          ? -0.14
          : mode === "glow"
            ? -0.85
            : mode === "lit"
              ? -0.06
              : -0.28;
      protagonistAnchor.rotation.y += (restingDirection - protagonistAnchor.rotation.y) * Math.min(1, delta * 3);
    }

    const exposureTarget = mode === "lit" || mode === "perch" || mode === "glow"
      ? 1
      : mode === "follow" || mode === "approach" || mode === "climb" || mode === "pull"
        ? 0.42
        : 0;
    characterStory.exposure += (exposureTarget - characterStory.exposure) * Math.min(1, delta * 4.2);

    const travelDirection = Math.sign(goal.x - protagonistAnchor.position.x || 1);
    const targetLean = walkingMode ? travelDirection * -0.09 : mode === "pull" ? 0.12 : 0;
    protagonistAnchor.scale.y += (characterDisplayScale - protagonistAnchor.scale.y) * Math.min(1, delta * 7);
    protagonistAnchor.scale.x += (characterDisplayScale - protagonistAnchor.scale.x) * Math.min(1, delta * 7);
    protagonistAnchor.scale.z += (characterDisplayScale - protagonistAnchor.scale.z) * Math.min(1, delta * 7);
    protagonistAnchor.rotation.z += (targetLean - protagonistAnchor.rotation.z) * Math.min(1, delta * 6);

    if (!characterRuntime.loaded) {
      protagonist.scale.y += (0.92 - protagonist.scale.y) * Math.min(1, delta * 8);
      const lookUp = mode === "climb" || mode === "descend" || mode === "pull" || mode === "glow" ? -0.5 : 0;
      protagonist.userData.headPivot.rotation.y += (lookUp - protagonist.userData.headPivot.rotation.y) * Math.min(1, delta * 7);
    }
  };

  const applyVisitorLight = (detail = {}) => {
    const items = Array.isArray(detail.items) ? detail.items : [];
    const signature = items.map((item) => `${item.nickname || ""}:${item.content || ""}`).join("|");
    let hash = 2166136261;
    for (let index = 0; index < signature.length; index += 1) {
      hash ^= signature.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    visitorLightOffset = signature ? (((hash >>> 0) % 2001) / 1000 - 1) : 0;
    visitorLightPulse = detail.fresh ? 1 : Math.min(0.32, items.length * 0.018);
    visitorTraceCount = detail.fresh ? visitorTraceCount + items.length : items.length;
    if (visitorLightLabel) visitorLightLabel.textContent = `VISITOR TRACE · ${String(visitorTraceCount).padStart(2, "0")}`;
  };
  window.addEventListener("portfolio:visitor-light", (event) => applyVisitorLight(event.detail));
  if (globalThis.PORTFOLIO_VISITOR_LIGHT) applyVisitorLight(globalThis.PORTFOLIO_VISITOR_LIGHT);

  const resize = () => {
    drawAtmosphere();
    characterDisplayScale = 1;
    const bounds = sceneCanvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, compactViewport.matches ? 1.2 : 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(Math.max(1, bounds.width), Math.max(1, bounds.height), false);
    camera.aspect = Math.max(0.1, bounds.width / Math.max(1, bounds.height));
    camera.fov = compactViewport.matches ? 45 : 38;
    // 调试近景镜头接管时不要动它的位置：resize 会在启动 / 视口变化时被调用，
    // 如果这里无条件写 camera.position.z，调试镜头会被立刻拉回默认机位。
    if (!debugCamera) camera.position.z = compactViewport.matches ? 7.15 : 6.7;
    camera.updateProjectionMatrix();
    pickCamera.aspect = camera.aspect;
    pickCamera.fov = camera.fov;
    pickCamera.position.set(0.2, 1.05, camera.position.z);
    pickCamera.lookAt(0, -0.08, 0);
    pickCamera.updateProjectionMatrix();
    pickCamera.updateMatrixWorld();
    if (compactViewport.matches) {
      world.position.set(0.2, -0.03, 0);
      world.scale.setScalar(0.92);
    } else {
      world.position.set(0.34, -0.02, 0);
      world.scale.setScalar(1.04);
    }
  };

  // 近景调试镜头（只在 ?debug 下由视觉接口赋值；正式页面恒为 null）。
  // 必须声明在 render 之前，且与 render 同处一个作用域，否则 render 读不到。
  let debugCamera = null;

  // 把调试镜头写进 camera。抽成函数是因为 render 与 resize/接口 setter 都要用，
  // 而且必须"每帧重设 position + lookAt"——只设一次会被后续的矩阵更新吃掉。
  const applyDebugCamera = () => {
    if (!debugCamera) return;
    if (debugCamera.follow) {
      // 跟随模式：pos/look 是相对角色锚点的偏移（world 组局部坐标）
      const t = protagonistAnchor.position;
      debugCamera.pos.set(t.x + debugCamera.follow.x, t.y + debugCamera.follow.y, t.z + debugCamera.follow.z);
      const lk = debugCamera.followLook;
      debugCamera.look.set(
        lk ? t.x + lk.x : t.x,
        lk ? t.y + lk.y : t.y + 0.17,
        lk ? t.z + lk.z : t.z,
      );
    }
    camera.position.copy(world.localToWorld(debugCamera.pos.clone()));
    camera.lookAt(world.localToWorld(debugCamera.look.clone()));
    camera.updateProjectionMatrix();
  };

  const render = (timestamp) => {
    timer.update(timestamp);
    // ?debug 下允许外部直接指定 elapsed（无头里 document.hidden 会冻结 timer）
    const elapsed = debugElapsedOverride !== null ? debugElapsedOverride : timer.getElapsed();
    const delta = Math.min(0.05, Math.max(0.001, elapsed - previousElapsed || 0.016));
    previousElapsed = elapsed;
    const motion = reducedMotion.matches ? 0 : 1;
    pointer.lerp(pointerDesired, 0.045);
    hoverAmount += (hoverTarget - hoverAmount) * 0.065;
    visitorLightPulse *= Math.pow(0.985, delta * 60);
    const interactionAmount = Math.max(hoverAmount * 0.55, visitorLightPulse, beamHold * 0.62);
    if (debugCamera) {
      // 仅 ?debug 下生效：把镜头推到梯子/角色近处，用于无头验收时看清骨骼姿态。
      // 正式页面 debugCamera 恒为 null，这段不会执行。
      applyDebugCamera();
    } else {
      camera.position.x = 0.2 + pointer.x * 0.22;
      camera.position.y = 1.05 + pointer.y * 0.14;
      camera.lookAt(pointer.x * 0.08, -0.08 + pointer.y * 0.025, 0);
    }

    const unattendedTargetX = idleBeamAnchor.x
      + visitorLightOffset * 0.12
      + Math.sin(elapsed * 0.16) * 0.42 * motion;
    const unattendedTargetZ = idleBeamAnchor.z + Math.cos(elapsed * 0.13) * 0.18 * motion;
    const heldTargetX = beamAnchor.x + Math.sin(elapsed * 0.9) * 0.015 * motion;
    const heldTargetZ = beamAnchor.z + Math.cos(elapsed * 0.72) * 0.012 * motion;
    beamTargetDesired.set(
      THREE.MathUtils.lerp(unattendedTargetX, heldTargetX, beamHold),
      -0.985,
      THREE.MathUtils.lerp(unattendedTargetZ, heldTargetZ, beamHold),
    );
    beamTarget.lerp(beamTargetDesired, 0.055 + beamHold * 0.05);
    lightTarget.position.copy(beamTarget);
    targetGlow.position.copy(beamTarget);
    targetGlow.position.y += 0.025;
    aimBeam(beam, beamSource, beamTarget);
    aimBeam(beamOuter, beamSource, beamTarget);
    beamMaterial.opacity = 0.042 + interactionAmount * 0.026;
    beamOuterMaterial.opacity = 0.017 + interactionAmount * 0.011;
    searchLight.intensity = 15 + interactionAmount * 4.5;
    targetGlow.material.opacity = 0.15 + interactionAmount * 0.14;
    targetGlow.scale.set(0.68 + interactionAmount * 0.2, 0.38 + interactionAmount * 0.1, 1);

    searchLight.color.lerp(beamColor, Math.min(1, delta * 2.6));
    beamMaterial.color.lerp(beamColor, Math.min(1, delta * 2.2));
    beamOuterMaterial.color.lerp(beamColor, Math.min(1, delta * 2.2));

    pathBranches.forEach((branch, index) => {
      const pulse = 0.86 + Math.sin(elapsed * 1.4 + index * 1.7) * 0.14;
      const opacity = storyResolved ? branch.material.userData.baseOpacity * pulse : 0;
      branch.material.opacity += (opacity - branch.material.opacity) * Math.min(1, delta * 2.8);
    });
    bridgeLight.scale.x += ((storyResolved ? 0.24 : 1) - bridgeLight.scale.x) * Math.min(1, delta * 1.8);

    updateCharacterStory(elapsed, delta * motion);
    updateDiscoveryHint();

    shutterProgress += (shutterTarget - shutterProgress) * Math.min(1, delta * 2.4);
    shutterSlats.forEach((slat) => {
      slat.position.y = THREE.MathUtils.lerp(slat.userData.closedY, slat.userData.openY, shutterProgress);
    });
    revealMaterial.emissiveIntensity = shutterProgress * 1.05;
    revealLight.intensity = shutterProgress * 4.4;
    const ropeSway = Math.sin(elapsed * 0.9) * 0.012 * motion;
    const ropeExtension = characterStory.mode === "pull"
      ? Math.max(0, Math.sin((elapsed - characterStory.modeSince) * Math.PI * 6)) * 0.05
      : 0;
    const ropeLength = ropeRestLength + ropeExtension;
    rope.scale.y = ropeLength / ropeRestLength;
    rope.position.y = ropeAnchor.y - ropeLength / 2;
    rope.rotation.z = ropeSway * 0.8;
    ropeHandle.position.set(ropeAnchor.x + ropeSway, ropeAnchor.y - ropeLength, ropeAnchor.z);
    const hotspotPulse = 0.5 + Math.sin(elapsed * 1.8) * 0.5;
    const ladderBusy = characterStory.mode === "climb"
      || characterStory.mode === "descend"
      || characterStory.mode === "perch";
    const ropeBusy = characterStory.mode === "pull" || shutterProgress > 0.9;
    // 一直没动手时把提示加强，让人注意到这两个点是能点的
    const idleFor = elapsed - lastInteractionAt;
    const nudge = THREE.MathUtils.clamp((idleFor - 3.5) / 2.5, 0, 1) * (changeCount === 0 ? 1 : 0.3);
    const beaconWave = (elapsed * 0.5) % 1;
    beacons.forEach((beacon) => {
      const wanted = hoverKind === beacon.kind ? 1 : 0;
      beacon.hover += (wanted - beacon.hover) * Math.min(1, delta * 8);
      const busy = beacon.kind === "ladder" ? ladderBusy : ropeBusy;
      const dim = busy ? 0.26 : 1;
      beacon.column.material.opacity = (0.028 + Math.sin(elapsed * 1.5) * 0.014
        + beacon.hover * 0.06 + nudge * 0.014) * dim;
      beacon.ripples.forEach((ring) => {
        const wave = (beaconWave + ring.userData.offset) % 1;
        ring.scale.setScalar(0.85 + wave * 1.7);
        ring.material.opacity = (1 - wave) * (0.085 + nudge * 0.09 + beacon.hover * 0.18) * dim;
      });
    });
    ladderHotspot.material.opacity = (0.085 + hotspotPulse * 0.08 + ladderBeacon.hover * 0.16)
      * (ladderBusy ? 0.3 : 1);
    ropeHotspot.material.opacity = (0.085 + hotspotPulse * 0.08 + ropeBeacon.hover * 0.16)
      * (ropeBusy ? 0.3 : 1);
    ladderGlowMaterial.emissiveIntensity = (0.36 + Math.sin(elapsed * 1.5) * 0.08
      + ladderBeacon.hover * 0.85 + nudge * 0.22) * (ladderBusy ? 0.55 : 1);
    ropeGlowMaterial.emissiveIntensity = (0.36 + Math.sin(elapsed * 1.7 + 1) * 0.08
      + ropeBeacon.hover * 0.85 + nudge * 0.22) * (ropeBusy ? 0.55 : 1);
    ropeMaterial.emissiveIntensity = 0.5 + ropeBeacon.hover * 0.5 + nudge * 0.18;

    const exposure = characterStory.exposure;
    const traveling = characterStory.mode === "follow" ? 1 : 0;
    const divergenceAmount = storyResolved ? 1 : 0;
    const warningPulse = 0.5 + Math.sin(elapsed * 9.5) * 0.5;
    searchLight.intensity += exposure * 3.6;
    targetGlow.material.opacity *= 1 + exposure * 0.42;
    warningMaterial.emissiveIntensity = 0.05 + traveling * (0.18 + warningPulse * 0.12);
    warningLights.forEach((lamp, index) => {
      const pulse = traveling ? 1 + Math.sin(elapsed * 8.5 + index * 1.7) * 0.12 : 1;
      lamp.scale.x += (pulse - lamp.scale.x) * Math.min(1, delta * 10);
    });
    windowPanel.material.emissiveIntensity = 0.24 + exposure * 0.06;
    farBeamMaterial.opacity = 0.016 + Math.sin(elapsed * 0.42) * 0.004;
    farBeamBMaterial.opacity = 0.01 + Math.sin(elapsed * 0.36 + 1.8) * 0.003;
    scene.fog.density = 0.09 - exposure * 0.009;
    characterRim.intensity = 0.22 + exposure * 0.3;
    protagonist.userData.torso.rotation.z = -0.08 + exposure * 0.05;
    protagonist.userData.jacket.emissiveIntensity = 0.16 + exposure * 0.22;
    watcher.rotation.z = 0.34 + pointer.x * interactionAmount * 0.15;
    watcherLensMaterial.emissiveIntensity = 0.24 + interactionAmount * 0.34 + (1 - exposure) * 0.26;

    scanRings.forEach((ring, index) => {
      const age = elapsed - scanPulseStartedAt - index * 0.1;
      const active = age >= 0 && age < 1.08;
      ring.visible = active;
      if (!active) return;
      const progress = age / 1.08;
      const size = 0.72 + progress * 5.2;
      ring.position.x = scanPulseOrigin.x;
      ring.position.z = scanPulseOrigin.z;
      ring.scale.setScalar(size);
      ring.material.opacity = (1 - progress) * (0.2 - index * 0.035);
    });

    footstepTraces.forEach((trace) => {
      const age = elapsed - trace.userData.bornAt;
      const active = age >= 0 && age < 0.9;
      trace.visible = active;
      if (!active) return;
      const progress = age / 0.9;
      trace.material.opacity = (1 - progress) * 0.28;
      trace.scale.set(0.62 + progress * 0.2, 1, 1.28 + progress * 0.34);
    });

    queue.forEach((figure, index) => {
      let walkingPace = 0;
      if (storyResolved && figure.userData.branchTarget) {
        const target = figure.userData.branchTarget;
        const toTarget = target.clone().sub(figure.position);
        const remaining = Math.hypot(toTarget.x, toTarget.z);
        if (remaining > 0.04) {
          walkingPace = 0.2 + (index % 3) * 0.035;
          const step = Math.min(remaining, delta * walkingPace);
          figure.position.x += (toTarget.x / remaining) * step;
          figure.position.z += (toTarget.z / remaining) * step;
          figure.rotation.y += ((toTarget.x > 0 ? -Math.PI / 2 : Math.PI / 2) - figure.rotation.y) * Math.min(1, delta * 4);
        }
        figure.position.y += (-0.19 - figure.position.y) * Math.min(1, delta * 0.72);
      } else if (motion) {
        walkingPace = figure.userData.speed * (1 - interactionAmount * 0.6);
        figure.position.x += walkingPace * delta;
        if (figure.position.x > 2.35) figure.position.x = -2.35;
      }
      const npcRuntime = figure.userData.npcRuntime;
      if (npcRuntime) {
        const relativePace = walkingPace / Math.max(0.001, figure.userData.speed);
        npcRuntime.action.timeScale = npcRuntime.baseTimeScale * Math.max(0.08, relativePace);
        npcRuntime.mixer.update(delta * motion);
      } else if (!storyResolved) {
        figure.position.y = -0.19 + Math.abs(Math.sin(elapsed * 1.9 + index * 0.8)) * 0.008 * motion;
      }
      if (!npcRuntime) {
        const glance = ((traveling + exposure) * 0.5 + divergenceAmount * 0.42)
          * Math.sign(protagonistAnchor.position.x - figure.position.x) * 0.56;
        figure.userData.headPivot.rotation.y += (glance - figure.userData.headPivot.rotation.y) * Math.min(1, delta * 4.5);
        figure.userData.torso.rotation.z += (((traveling || exposure || divergenceAmount) ? -0.03 : -0.08) - figure.userData.torso.rotation.z) * Math.min(1, delta * 3.8);
      }
    });

    const positionAttribute = dustGeometry.getAttribute("position");
    for (let index = 0; index < dustCount; index += 1) {
      const offset = index * 3;
      const seed = dustSeed[index];
      const x = dustBase[offset] + Math.sin(elapsed * (0.18 + seed * 0.22) + seed * 12) * 0.025 * motion;
      const y = dustBase[offset + 1] + Math.sin(elapsed * (0.12 + seed * 0.18) + seed * 8) * 0.035 * motion;
      const dx = x - beamTarget.x;
      const dy = y - beamTarget.y;
      const influence = interactionAmount * Math.exp(-(dx * dx + dy * dy) * 1.2);
      positionAttribute.array[offset] = x - dy * influence * 0.1;
      positionAttribute.array[offset + 1] = y + dx * influence * 0.1;
      positionAttribute.array[offset + 2] = dustBase[offset + 2] + influence * 0.08;
    }
    positionAttribute.needsUpdate = true;
    renderer.render(scene, camera);
    if (visible && !reducedMotion.matches) frame = requestAnimationFrame(render);
  };

  const renderOnce = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    render();
  };

  hero.addEventListener("pointermove", (event) => {
    if (reducedMotion.matches) return;
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = 0.5 - (event.clientY - bounds.top) / bounds.height;
    visual.style.setProperty("--visual-x", `${x * 10}px`);
    visual.style.setProperty("--visual-y", `${-y * 8}px`);
  }, { passive: true });
  hero.addEventListener("pointerleave", () => {
    pointerDesired.set(0, 0);
    setHover(null);
    visual.style.setProperty("--visual-x", "0px");
    visual.style.setProperty("--visual-y", "0px");
  });
  visual.addEventListener("pointerenter", (event) => {
    if (reducedMotion.matches || event.pointerType === "touch") return;
    hoverTarget = 1;
    hero.classList.add("is-searching");
  }, { passive: true });
  visual.addEventListener("pointermove", (event) => {
    if (reducedMotion.matches || (event.pointerType === "touch" && !touchDragging)) return;
    const bounds = visual.getBoundingClientRect();
    const nx = (event.clientX - bounds.left) / bounds.width - 0.5;
    const ny = 0.5 - (event.clientY - bounds.top) / bounds.height;
    pointerDesired.set(nx, ny);
    updateHover(nx, ny);
    hoverTarget = 1;
    hero.classList.add("is-searching");
    visual.style.setProperty("--scan-x", `${event.clientX - bounds.left}px`);
    visual.style.setProperty("--scan-y", `${event.clientY - bounds.top}px`);
  }, { passive: true });
  visual.addEventListener("pointerdown", (event) => {
    if (reducedMotion.matches) return;
    if (event.pointerType !== "touch") return;
    touchDragging = true;
    visual.setPointerCapture(event.pointerId);
    hoverTarget = 1;
    hero.classList.add("is-searching");
  });
  const beamRaycaster = new THREE.Raycaster();
  const beamNdc = new THREE.Vector2();
  // 可交互状态：只要不是"正在走的过场动画"都接受点击。
  // 之前白名单只列 idle/lit/glow/perch/arrived，角色处于 follow/approach/descend 时
  // 点击会被直接吞掉 —— 这是"鼠标点了没反应"的主因（descend 漏在白名单外尤其明显）。
  const interactiveModes = [
    "idle", "lit", "glow", "perch", "arrived",
    "follow", "approach", "descend", "resolve", "depart",
  ];
  // 过场中不接受"改目的地"的状态：攀爬/拉绳/已登顶
  const lockedModes = ["climb", "pull", "descend", "perch"];

  const pickInteraction = (point, hitObject) => {
    if (hitObject === ladderVolume) return "ladder";
    if (hitObject === ropeVolume) return "rope";
    if (hitObject === platformDeck || hitObject === platformEdge || ladder.children.includes(hitObject)) return "ladder";
    if (hitObject === revealPanel || hitObject === rope || hitObject === ropeHandle || shutterSlats.includes(hitObject)) return "rope";
    const ladderDistance = Math.hypot(point.x - ladderStand.x, point.z - ladderStand.z);
    const ropeDistance = Math.hypot(point.x - ropeStand.x, point.z - ropeStand.z);
    if (ladderDistance < 0.85 && ladderDistance <= ropeDistance) return "ladder";
    if (ropeDistance < 0.85) return "rope";
    return "beam";
  };

  // 鼠标划过可交互装置时给出的即时反馈：光标变手型 + 光柱和地面环加亮。
  // 这是"不用文字也能看出哪里能点"的关键一环。
  const setHover = (kind) => {
    if (hoverKind === kind) return;
    hoverKind = kind;
    visual.dataset.hover = kind || "";
  };

  const hoverRaycaster = new THREE.Raycaster();
  const hoverNdc = new THREE.Vector2();
  const updateHover = (nx, ny) => {
    if (reducedMotion.matches || !interactiveModes.includes(characterStory.mode)) {
      setHover(null);
      return;
    }
    hoverNdc.set(nx * 2, ny * 2);
    hoverRaycaster.setFromCamera(hoverNdc, pickCamera);
    const [hit] = hoverRaycaster.intersectObjects(
      [ladderVolume, ropeVolume, ...ladder.children, platformDeck, platformEdge, rope, ropeHandle, revealPanel, ...shutterSlats],
      false,
    );
    if (!hit) {
      setHover(null);
      return;
    }
    setHover(pickInteraction(world.worldToLocal(hit.point.clone()), hit.object));
  };

  const engageInvention = (kind, point, elapsed) => {
    if (kind === "ladder") {
      if (characterStory.mode === "perch") {
        beamAnchor.set(perchSpot.x, perchSpot.y + 0.42, perchSpot.z);
        return false;
      }
      characterStory.target.copy(ladderStand);
      characterStory.nextMode = "climb";
      setCharacterMode("approach", elapsed);
      return true;
    }
    if (kind === "rope") {
      if (shutterProgress > 0.9 && characterStory.mode === "glow") {
        beamAnchor.set(1.85, -0.1, -2.2);
        return false;
      }
      characterStory.target.copy(ropeStand);
      characterStory.nextMode = "pull";
      setCharacterMode("approach", elapsed);
      return true;
    }
    if (characterStory.mode === "perch") {
      characterStory.nextMode = "follow";
      setCharacterMode("descend", elapsed);
    } else {
      setCharacterMode("follow", elapsed);
    }
    return true;
  };

  // 只有带 ?debug 时才挂载：给无头浏览器验收用的读数口，不影响正式页面
  if (new URLSearchParams(window.location.search).has("debug")) {
    const limbNames = [
      "hand_l", "hand_r", "foot_l", "foot_r",
      "upperarm_l", "upperarm_r", "thigh_l", "thigh_r", "pelvis",
    ];
    visual.__scene = {
      climbDuration: (value) => { climbDuration = value; },
      // 无头验收用：手动指定"当前时间"（秒），让动画在没有真实 rAF 时间推进时也能跑。
      // 传 null 恢复用 timer 自己的时间。正式页面不带 ?debug，用不到这个口。
      elapsed: (value) => { debugElapsedOverride = value === null || value === undefined ? null : value; },
      forceMode: (m) => setCharacterMode(m, debugElapsedOverride !== null ? debugElapsedOverride : timer.getElapsed()),
      // 把镜头推到指定位置看特写（传 null 恢复）。坐标是 world 组局部坐标
      // （snapshot().anchor 同一坐标系）。第二个参数传 true 表示跟随角色。
      camera: (pos, look, follow) => {
        debugCamera = pos
          ? {
            pos: new THREE.Vector3(pos[0], pos[1], pos[2]),
            look: new THREE.Vector3(look[0], look[1], look[2]),
            // follow=true 时把 pos/look 当作"相对角色的偏移"
            follow: follow ? new THREE.Vector3(pos[0], pos[1], pos[2]) : null,
            followLook: follow ? new THREE.Vector3(look[0], look[1], look[2]) : null,
          }
          : null;
        if (debugCamera && debugCamera.follow) applyDebugCamera();
      },
      follow: (offset) => {
        // 让近景镜头持续盯住角色（用于动画过程中的特写采样）
        if (!offset) { debugCamera && (debugCamera.follow = null); return; }
        const o = new THREE.Vector3(offset[0], offset[1], offset[2]);
        debugCamera = {
          pos: new THREE.Vector3(), look: new THREE.Vector3(),
          follow: o.clone(), followLook: null,
        };
        applyDebugCamera();
      },
      cameraState: () => (debugCamera
        ? {
          followed: !!debugCamera.follow,
          pos: world.worldToLocal(camera.position.clone()).toArray(),
          look: debugCamera.look.toArray(),
        }
        : { followed: false }),
      // 特写时提亮，否则近景里角色全黑看不清骨骼姿态（仅调试用）
      exposure: (v) => { renderer.toneMappingExposure = v; },
      rungs: () => Array.from({ length: rungCount + 1 }, (_, i) => rungPoint(i - 1, 0, new THREE.Vector3()).toArray()),
      snapshot: () => {
        // 量测时必须同坐标系：anchor 是 world 组局部坐标，bones 是场景世界坐标，
        // 直接相减会得出"手够不到目标"的假结论。这里统一给 world 坐标版本。
        protagonistAnchor.updateMatrixWorld(true);
        const anchorWorld = protagonistAnchor.getWorldPosition(new THREE.Vector3()).toArray();
        return {
          mode: characterStory.mode,
          progress: +((((debugElapsedOverride !== null ? debugElapsedOverride : timer.getElapsed()) - characterStory.modeSince) / climbDuration).toFixed(4)),
          rig: climbRig ? {
            lead: climbRig.handLead,
            arm: +climbRig.armLength.toFixed(4),
            leg: +climbRig.legLength.toFixed(4),
            crouch: +climbRig.crouchWorld.toFixed(4),
            ankle: +climbRig.ankleHeight.toFixed(4),
            hip: +climbRig.hipHeight.toFixed(4),
            side: { hand_l: climbRig.limbSide.hand_l, foot_l: climbRig.limbSide.foot_l },
            leftSign: climbRig.leftSign,
          } : null,
          // 梯子横杆与锚点在"world 组局部坐标"下的位置，用于核对目标点偏移是否合理
          ladderLocal: { x: rungLocalX, z: rungLocalZ, groundY: rungYAt(groundRung), topY: rungYAt(topRung) },
          // 横杆在世界坐标下的位置（与 targets / bones 同系，便于直接比对"脚是否踩在横杆上"）
          rungWorld: Array.from({ length: rungCount + 1 }, (_, i) => rungPoint(i - 1, 0, new THREE.Vector3()).toArray()),
          anchor: protagonistAnchor.position.toArray(),
          anchorWorld,
          bones: Object.fromEntries(limbNames.map((name) => [
            name,
            ikBones[name] ? ikBones[name].getWorldPosition(new THREE.Vector3()).toArray() : null,
          ])),
          // climbTargets 本身已经是世界坐标（rungPoint 内部走过 localToWorld），
          // 之前这里又套了一层 localToWorld，导致"目标点理角色 4 倍臂长"的假报警。
          targets: Object.fromEntries(Object.entries(climbTargets).map(([k, v]) => [k, v.toArray()])),
        };
      },
      // 走路手部动作验收用：给出关键骨在**父骨局部系**下的欧拉角（度）。
      // 只看世界坐标位置无法区分"手在摆"和"整条手臂被身体带着平移"，
      // 必须看相对父骨的旋转量。
      // 注意：这两个必须挂在 __scene 上，不能塞进 snapshot 的返回值里 ——
      // 曾经误放进 snapshot 的返回对象，结果 `__scene.jointAngles` 是 undefined，
      // 只剩 `__scene.snapshot().jointAngles` 能用，排查时非常迷惑。
      jointAngles: () => {
        const pick = [
          "upperarm_l", "lowerarm_l", "hand_l", "upperarm_r", "lowerarm_r", "hand_r",
          "thigh_l", "calf_l", "foot_l", "thigh_r", "calf_r", "foot_r", "spine", "spine1", "spine2",
        ];
        const out = {};
        pick.forEach((name) => {
          const bone = ikBones[name];
          if (!bone) return;
          const e = bone.rotation;
          out[name] = [
            +(THREE.MathUtils.radToDeg(e.x)).toFixed(1),
            +(THREE.MathUtils.radToDeg(e.y)).toFixed(1),
            +(THREE.MathUtils.radToDeg(e.z)).toFixed(1),
          ];
        });
        return out;
      },
      // 当前播放的动作名与权重。
      // 注意 getEffectiveWeight() 对**已停止**的 action 也会返回 1，
      // 单看它会把"没在跑的动画"也报成满权重，误判成"五段动画在混"。
      // 判据以 running 为准，weight 只作参考。
      actionState: () => ({
        mode: characterStory.mode,
        story: visual.dataset.story || null,
        action: visual.dataset.action,
        actions: Object.fromEntries(Object.entries(characterRuntime.actions).map(([k, a]) => [
          k,
          {
            running: a.isRunning(),
            weight: +a.getEffectiveWeight().toFixed(3),
            time: +a.time.toFixed(3),
          },
        ])),
      }),
      // 动作片段自检：列出某个 action 的每条轨道及其取值幅度。
      // 幅度接近 0 说明这条轨道是常量（关节点不会动）——
      // 这正是"走路时手腕不动"这类问题的直接证据。
      clipTracks: (name) => {
        const action = characterRuntime.actions[name];
        if (!action) return null;
        const clip = action.getClip();
        const head = [];
        const amp = [];
        clip.tracks.forEach((track) => {
          const v = track.values;
          const stride = track.getValueSize?.() ?? (v.length / track.times.length);
          let mn = Infinity;
          let mx = -Infinity;
          for (let i = 0; i < v.length; i++) {
            if (v[i] < mn) mn = v[i];
            if (v[i] > mx) mx = v[i];
          }
          const row = {
            name: track.name,
            keys: track.times.length,
            stride,
            range: +(mx - mn).toFixed(4),
            first: +v[0].toFixed(4),
          };
          head.push(row);
          if (row.range < 1e-4) amp.push(track.name);
        });
        return { clip: clip.name, duration: +clip.duration.toFixed(3), trackCount: clip.tracks.length, constantTracks: amp, tracks: head };
      },
    };

    // ---- 仅在 ?debug 下挂载的"点击命中验证"接口 ----
    // 自动验收要回答的问题是"画面里看得见的东西，点下去认不认"。
    // 所以这里给的不是内部对象，而是：把指定世界坐标投影成屏幕坐标、
    // 以及按屏幕坐标走一遍真实的命中管线并回报它认成了什么。
    visual.__hitTest = (worldPoint, screenPoint) => {
      const toScreen = (p) => {
        const v = world.localToWorld(new THREE.Vector3(p[0], p[1], p[2]));
        v.project(camera);
        const bounds = visual.getBoundingClientRect();
        return {
          x: bounds.left + (v.x * 0.5 + 0.5) * bounds.width,
          y: bounds.top + (-v.y * 0.5 + 0.5) * bounds.height,
          ndc: [v.x, v.y, v.z],
        };
      };
      const out = {};
      if (worldPoint) out.screen = toScreen(worldPoint);
      if (screenPoint) {
        // 屏幕坐标 → NDC（按 pickCamera，和真实点击走同一套相机与判定体）
        const bounds = visual.getBoundingClientRect();
        const nx = (screenPoint.x - bounds.left) / bounds.width - 0.5;
        const ny = 0.5 - (screenPoint.y - bounds.top) / bounds.height;
        const ray = new THREE.Raycaster();
        ray.setFromCamera(new THREE.Vector2(nx * 2, ny * 2), pickCamera);
        const [hit] = ray.intersectObjects(
          [ladderVolume, ropeVolume, floor, platformDeck, platformEdge, revealPanel, rope, ropeHandle,
            ...shutterSlats, ...ladder.children],
          false,
        );
        const local = hit ? world.worldToLocal(hit.point.clone()) : null;
        out.hitObject = hit ? (hit.object.name || hit.object.uuid.slice(0, 6)) : null;
        out.local = local ? local.toArray() : null;
        out.kind = local
          ? pickInteraction(local, hit?.object)
          : pickInteraction(new THREE.Vector3(nx * 3.2, -0.985, 0.42 + ny * 2.1), null);
      }
      return out;
    };
    // 直接看几个关键判定体在屏幕上的位置与尺寸，方便脚本瞄准
    visual.__hotspots = () => {
      const bounds = visual.getBoundingClientRect();
      const probe = (name, obj) => {
        obj.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(obj);
        if (!box.isEmpty() && box.max.distanceTo(box.min) === 0) return null;
        // 取包围盒中心做投影；空盒/nan 直接返回 null
        const c = box.getCenter(new THREE.Vector3());
        if (!Number.isFinite(c.x)) return null;
        const v = c.clone().project(camera);
        return {
          name,
          local: world.worldToLocal(c.clone()).toArray(),
          screen: {
            x: bounds.left + (v.x * 0.5 + 0.5) * bounds.width,
            y: bounds.top + (-v.y * 0.5 + 0.5) * bounds.height,
          },
        };
      };
      return [
        probe("ladderVolume", ladderVolume),
        probe("ropeVolume", ropeVolume),
        probe("ropeHandle", ropeHandle),
        probe("platformDeck", platformDeck),
        probe("revealPanel", revealPanel),
      ].filter(Boolean);
    };
  }

  const placeBeamAt = (clientX, clientY) => {
    const bounds = visual.getBoundingClientRect();
    const nx = (clientX - bounds.left) / bounds.width - 0.5;
    const ny = 0.5 - (clientY - bounds.top) / bounds.height;
    pointerDesired.set(nx, ny);
    beamNdc.set(nx * 2, ny * 2);
    beamRaycaster.setFromCamera(beamNdc, pickCamera);
    const [hit] = beamRaycaster.intersectObjects(
      [ladderVolume, ropeVolume, floor, platformDeck, platformEdge, revealPanel, rope, ropeHandle,
        ...shutterSlats, ...ladder.children],
      false,
    );
    const local = hit ? world.worldToLocal(hit.point.clone()) : null;
    const kind = local
      ? pickInteraction(local, hit?.object)
      : pickInteraction(new THREE.Vector3(nx * 3.2, -0.985, 0.42 + ny * 2.1), null);
    const point = local
      ? new THREE.Vector3(
        THREE.MathUtils.clamp(local.x, -2.3, 2.3),
        -0.985,
        THREE.MathUtils.clamp(local.z, -2.3, 1.55),
      )
      : new THREE.Vector3(nx * 3.2, -0.985, 0.42 + ny * 2.1);
    beamHold = 1;
    lastInteractionAt = previousElapsed;
    hero.classList.add("is-searching");
    visual.dataset.beam = "locked";
    visual.dataset.prop = kind;
    visual.style.setProperty("--scan-x", `${clientX - bounds.left}px`);
    visual.style.setProperty("--scan-y", `${clientY - bounds.top}px`);

    // 过场动画中（攀爬/拉绳/下梯）不接受新的目的地，但光束仍要跟随点击，
    // 保证"点了有反馈"，而不是静默无响应。
    if (lockedModes.includes(characterStory.mode)) {
      beamAnchor.copy(point);
      return { kind, applied: false, locked: true };
    }
    beamAnchor.copy(point);
    const applied = engageInvention(kind, point, previousElapsed);
    if (applied) registerChange();
    return { kind, applied, locked: false };
  };

  visual.addEventListener("click", (event) => {
    if (reducedMotion.matches) return;
    const result = placeBeamAt(event.clientX, event.clientY);
    triggerScanPulse();
    // ?debug 下把"这次点击被认成了什么"记下来，供无头验收读取
    if (visual.__scene) {
      visual.__scene.lastClick = { x: event.clientX, y: event.clientY, ...result };
    }
  });
  const releaseLight = (event) => {
    if (event?.pointerType === "touch") touchDragging = false;
    hoverTarget = 0;
    pointerDesired.set(0, 0);
    hero.classList.remove("is-searching");
  };
  visual.addEventListener("pointerup", (event) => {
    if (event.pointerType === "touch") releaseLight(event);
  });
  visual.addEventListener("pointercancel", releaseLight);
  visual.addEventListener("pointerleave", (event) => {
    if (touchDragging) return;
    releaseLight(event);
  });

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && frame === 0) renderOnce();
    if (!visible && frame !== 0) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  }, { threshold: 0.02 });
  observer.observe(hero);
  reducedMotion.addEventListener("change", renderOnce);
  compactViewport.addEventListener("change", resize);
  window.addEventListener("resize", resize, { passive: true });
  resize();
  renderOnce();
}
