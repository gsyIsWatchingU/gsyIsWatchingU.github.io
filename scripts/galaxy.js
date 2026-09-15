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
const storyInstructionLabel = document.querySelector("[data-story-instruction]");
const storyActionLabel = document.querySelector("[data-story-action]");

if (!hero || !visual || !atmosphereCanvas || !sceneCanvas) {
  throw new Error("首屏叙事场景缺少必要节点");
}

const beamColor = new THREE.Color(0xb7c5bd);
const changeGoal = 3;
const stageNames = {
  idle: "寂静 · 他还在暗处",
  follow: "跟随 · 他走向光",
  lit: "驻足 · 他站在光里",
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

  const findExactClip = (clips, names) => names
    .map((name) => clips.find((clip) => clip.name.toLowerCase() === name))
    .find(Boolean);

  const makeInPlaceClip = (clip) => {
    const isLocomotion = /(walk|run|sprint)/i.test(clip.name);
    const tracks = clip.tracks.filter((track) => {
      if (/pelvis\.position$/i.test(track.name)) return false;
      if (isLocomotion && /hand_[lr]\.quaternion$/i.test(track.name)) return false;
      return true;
    });
    return new THREE.AnimationClip(clip.name, clip.duration, tracks);
  };

  const playCharacterAction = (name, fade = 0.2) => {
    const nextAction = characterRuntime.actions[name];
    if (!nextAction || nextAction === characterRuntime.currentAction) return;
    nextAction.reset().fadeIn(fade).play();
    characterRuntime.currentAction?.fadeOut(fade);
    characterRuntime.currentAction = nextAction;
    visual.dataset.action = name;
  };

  const actionForStoryMode = {
    idle: "idle",
    follow: "walk",
    lit: "idle",
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
        walk: ["walk_formal_loop", "walk_loop"],
      };
      Object.entries(clipMap).forEach(([name, candidates]) => {
        const sourceClip = findExactClip(gltf.animations, candidates);
        if (!sourceClip) return;
        const clip = makeInPlaceClip(sourceClip);
        characterRuntime.actions[name] = characterRuntime.mixer.clipAction(clip);
      });
      const npcWalkSource = findExactClip(gltf.animations, ["walk_formal_loop", "walk_loop"]);
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
  const pointer = new THREE.Vector2();
  const pointerDesired = new THREE.Vector2();
  const homePosition = new THREE.Vector3(-0.46, -1.025, 0.52);
  const beamAnchor = new THREE.Vector3(idleBeamAnchor.x, -0.985, idleBeamAnchor.z);
  let beamHold = 0;
  const characterStory = {
    mode: "idle",
    modeSince: 0,
    target: homePosition.clone(),
    exposure: 0,
  };
  let changeCount = 0;
  let storyResolved = false;
  let chosenPathIndex = 1;
  const storyStages = {
    idle: ["神秘的人 · 待机", "点击画面任意位置，把光束移过去"],
    follow: ["光换了位置", "他转过身，朝光走过去"],
    lit: ["他站在光里", "光停在哪，他就停在哪"],
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
    if (storyInstructionLabel) {
      storyInstructionLabel.textContent = "① 点击画面，移动光束";
    }
    if (storyActionLabel) {
      storyActionLabel.textContent = storyResolved
        ? "② 他已经走进光里"
        : changeCount >= changeGoal - 1
          ? "② 再点击一次，路会分开"
          : "② 点击三次，留下变化";
    }
    visual.dataset.choices = String(changeCount);
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
    if (changeCount === changeGoal) {
      beginDivergence();
    } else {
      setCharacterMode("follow", previousElapsed);
    }
  };

  const updateCharacterStory = (elapsed, delta) => {
    if (delta <= 0) return;
    const mode = characterStory.mode;
    const goal = mode === "follow" ? beamTarget : characterStory.target;

    if (mode === "follow" || mode === "resolve" || mode === "depart") {
      const toTarget = goal.clone().sub(protagonistAnchor.position);
      const remaining = Math.hypot(toTarget.x, toTarget.z);
      const arriveRadius = mode === "follow" ? 0.07 : 0.035;
      const speed = mode === "follow" ? 0.86 : mode === "depart" ? 0.82 : 0.62;
      if (remaining > arriveRadius) {
        const step = Math.min(remaining, speed * delta);
        protagonistAnchor.position.x += (toTarget.x / remaining) * step;
        protagonistAnchor.position.z += (toTarget.z / remaining) * step;
        if (mode === "follow" && elapsed - lastFootstepAt > 0.14) {
          const trace = footstepTraces[footstepCursor % footstepTraces.length];
          trace.position.x = protagonistAnchor.position.x + (footstepCursor % 2 ? 0.018 : -0.018);
          trace.position.z = protagonistAnchor.position.z + 0.025;
          trace.userData.bornAt = elapsed;
          trace.visible = true;
          lastFootstepAt = elapsed;
          footstepCursor += 1;
        }
        const facing = Math.sign(toTarget.x || 1);
        protagonistAnchor.rotation.y += ((facing > 0 ? -0.8 : 0.8) - protagonistAnchor.rotation.y) * Math.min(1, delta * 7);
      } else if (mode === "follow") {
        setCharacterMode("lit", elapsed);
      } else if (mode === "resolve") {
        characterStory.target.copy(pathTargets[chosenPathIndex]).setY(homePosition.y);
        setCharacterMode("depart", elapsed);
      } else if (mode === "depart") {
        setCharacterMode("arrived", elapsed);
      }
    }

    if (mode === "idle" || mode === "lit" || mode === "arrived") {
      protagonistAnchor.position.y = homePosition.y + Math.sin(elapsed * 1.2) * 0.005;
      const restingDirection = mode === "arrived" ? -0.72 : mode === "lit" ? -0.06 : -0.28;
      protagonistAnchor.rotation.y += (restingDirection - protagonistAnchor.rotation.y) * Math.min(1, delta * 3);
    }

    const exposureTarget = mode === "lit" ? 1 : mode === "follow" ? 0.42 : 0;
    characterStory.exposure += (exposureTarget - characterStory.exposure) * Math.min(1, delta * 4.2);

    const travelDirection = Math.sign(goal.x - protagonistAnchor.position.x || 1);
    const targetLean = mode === "follow" ? travelDirection * -0.09 : 0;
    protagonistAnchor.scale.y += (characterDisplayScale - protagonistAnchor.scale.y) * Math.min(1, delta * 7);
    protagonistAnchor.scale.x += (characterDisplayScale - protagonistAnchor.scale.x) * Math.min(1, delta * 7);
    protagonistAnchor.scale.z += (characterDisplayScale - protagonistAnchor.scale.z) * Math.min(1, delta * 7);
    protagonistAnchor.rotation.z += (targetLean - protagonistAnchor.rotation.z) * Math.min(1, delta * 6);

    if (!characterRuntime.loaded) {
      protagonist.scale.y += (0.92 - protagonist.scale.y) * Math.min(1, delta * 8);
      protagonist.userData.headPivot.rotation.y += (0 - protagonist.userData.headPivot.rotation.y) * Math.min(1, delta * 7);
    }

    characterRuntime.mixer?.update(delta);
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
    camera.position.z = compactViewport.matches ? 7.15 : 6.7;
    camera.updateProjectionMatrix();
    if (compactViewport.matches) {
      world.position.set(0.2, -0.03, 0);
      world.scale.setScalar(0.92);
    } else {
      world.position.set(0.34, -0.02, 0);
      world.scale.setScalar(1.04);
    }
  };

  const render = (timestamp) => {
    timer.update(timestamp);
    const elapsed = timer.getElapsed();
    const delta = Math.min(0.05, Math.max(0.001, elapsed - previousElapsed || 0.016));
    previousElapsed = elapsed;
    const motion = reducedMotion.matches ? 0 : 1;
    pointer.lerp(pointerDesired, 0.045);
    hoverAmount += (hoverTarget - hoverAmount) * 0.065;
    visitorLightPulse *= Math.pow(0.985, delta * 60);
    const interactionAmount = Math.max(hoverAmount * 0.55, visitorLightPulse, beamHold * 0.62);
    camera.position.x = 0.2 + pointer.x * 0.22;
    camera.position.y = 1.05 + pointer.y * 0.14;
    camera.lookAt(pointer.x * 0.08, -0.08 + pointer.y * 0.025, 0);

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
    pointerDesired.set(
      (event.clientX - bounds.left) / bounds.width - 0.5,
      0.5 - (event.clientY - bounds.top) / bounds.height,
    );
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

  const placeBeamAt = (clientX, clientY) => {
    const bounds = visual.getBoundingClientRect();
    const nx = (clientX - bounds.left) / bounds.width - 0.5;
    const ny = 0.5 - (clientY - bounds.top) / bounds.height;
    pointerDesired.set(nx, ny);
    beamNdc.set(nx * 2, ny * 2);
    beamRaycaster.setFromCamera(beamNdc, camera);
    const [hit] = beamRaycaster.intersectObject(floor, false);
    if (hit) {
      const local = world.worldToLocal(hit.point.clone());
      beamAnchor.set(
        THREE.MathUtils.clamp(local.x, -2.3, 2.3),
        -0.985,
        THREE.MathUtils.clamp(local.z, -1.2, 1.5),
      );
    } else {
      beamAnchor.set(nx * 3.2, -0.985, 0.42 + ny * 2.1);
    }
    beamHold = 1;
    hero.classList.add("is-searching");
    visual.dataset.beam = "locked";
    visual.style.setProperty("--scan-x", `${clientX - bounds.left}px`);
    visual.style.setProperty("--scan-y", `${clientY - bounds.top}px`);
  };

  visual.addEventListener("click", (event) => {
    if (reducedMotion.matches) return;
    placeBeamAt(event.clientX, event.clientY);
    triggerScanPulse();
    if (storyResolved) {
      if (characterStory.mode === "arrived" || characterStory.mode === "lit") {
        setCharacterMode("follow", previousElapsed);
      }
    } else {
      registerChange();
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
