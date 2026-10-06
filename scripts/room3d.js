import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

(() => {
  const host = document.querySelector("[data-room3d-host]");
  const canvas = document.querySelector("[data-room-canvas]");
  const chip = document.querySelector("[data-room-chip]");
  const root = document.querySelector(".room-app");
  const dock = document.querySelector("[data-dock]");
  if (!host || !canvas || !root) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LABELS = {
    monitor: "显示屏 · 工程能力",
    macbook: "MacBook · 独立产品",
    ipad: "iPad · 实习经历",
    phone: "手机 · 留言墙",
    marshall: "Marshall · 音乐角落",
    piano: "钢琴 · 生活兴趣",
    window: "舷窗 · 关于我",
    lightswitch: "灯光 · 氛围",
    trashcan: "垃圾桶 · 小纸条",
  };

  /* ---------- 渲染器 ---------- */
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    // WebGL 不可用：兜底为「点击直接打开近景」，房间内容仍可达
    window.addEventListener("room:activate-request", () => {
      window.dispatchEvent(new CustomEvent("room:activate-done"));
    });
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(host.clientWidth, host.clientHeight, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  // 水下：浅蓝水雾
  scene.fog = new THREE.Fog(0x9fd8ea, 8.2, 13.5);

  /* 环境反射（柔和室内 IBL） */
  const pmrem = new THREE.PMREMGenerator(renderer);
  try {
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  } catch {
    try {
      scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
    } catch {}
  }
  if (scene.environment) {
    scene.environmentIntensity = 0.12;
  }

  const camera = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, 0.1, 60);
  const TARGET = new THREE.Vector3(0, 1.0, 0);
  const cam = { yaw: 0, pitch: 0.19, radius: 4.9 };
  const camGoal = { yaw: 0, pitch: 0.19, radius: 4.9 };
  let busy = false;

  /* ---------- 后处理：描边 + SSAO + Bloom（3D 漫画感） ---------- */
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const outlinePass = new OutlinePass(new THREE.Vector2(host.clientWidth, host.clientHeight), scene, camera);
  outlinePass.edgeStrength = 1.4;
  outlinePass.edgeGlow = 0.4;
  outlinePass.edgeThickness = 1.0;
  outlinePass.visibleEdgeColor.set("#2a3a4a");
  outlinePass.hiddenEdgeColor.set("#1a2530");
  composer.addPass(outlinePass);
  const ssaoPass = new SSAOPass(scene, camera, host.clientWidth, host.clientHeight);
  ssaoPass.kernelRadius = 0.04;
  ssaoPass.minDistance = 0.001;
  ssaoPass.maxDistance = 0.08;
  composer.addPass(ssaoPass);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(host.clientWidth, host.clientHeight), 0.12, 0.4, 0.92);
  composer.addPass(bloomPass);
  composer.addPass(new OutputPass());

  const applyCamera = () => {
    camera.position.set(
      TARGET.x + cam.radius * Math.cos(cam.pitch) * Math.sin(cam.yaw),
      TARGET.y + cam.radius * Math.sin(cam.pitch),
      TARGET.z + cam.radius * Math.cos(cam.pitch) * Math.cos(cam.yaw),
    );
    camera.lookAt(TARGET);
  };

  /* ---------- 工具 ---------- */
  const std = (color, roughness = 0.65, metalness = 0.05) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  // 卡通色但走 PBR 光影
  const toon = (color) =>
    std(color, 0.72, 0.03);

  const box = (w, h, d, material, opts = {}) => {
    const radius = Math.min(w, h, d) * 0.18;
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 4, Math.min(radius, 0.06)), material);
    mesh.castShadow = opts.cast ?? true;
    mesh.receiveShadow = opts.receive ?? true;
    if (opts.pick) mesh.userData.pick = opts.pick;
    if (opts.x !== undefined || opts.y !== undefined || opts.z !== undefined) {
      mesh.position.set(opts.x ?? 0, opts.y ?? 0, opts.z ?? 0);
    }
    if (opts.ry) mesh.rotation.y = opts.ry;
    if (opts.rx) mesh.rotation.x = opts.rx;
    return mesh;
  };

  const cyl = (rTop, rBottom, h, material, opts = {}) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, h, 28), material);
    mesh.castShadow = opts.cast ?? true;
    mesh.receiveShadow = opts.receive ?? true;
    if (opts.pick) mesh.userData.pick = opts.pick;
    mesh.position.set(opts.x ?? 0, opts.y ?? 0, opts.z ?? 0);
    return mesh;
  };

  const pickable = (group, id) => {
    group.traverse((node) => {
      if (node.isMesh) node.userData.pick = id;
    });
    return group;
  };

  /* ---------- 画布纹理 ---------- */
  const makeCanvas = (w, h) => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    return [c, c.getContext("2d")];
  };

  /* 舷窗视野：水下白天 */
  const skyDay = (() => {
    const [c, g] = makeCanvas(512, 256);
    const grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "#8fd0e8");
    grad.addColorStop(0.6, "#a8dcf0");
    grad.addColorStop(1, "#c8ecf6");
    g.fillStyle = grad;
    g.fillRect(0, 0, 512, 256);
    // 水面光斑
    g.fillStyle = "rgba(255,255,230,0.35)";
    for (let i = 0; i < 6; i += 1) {
      const x = 40 + i * 80;
      g.beginPath();
      g.ellipse(x, 30 + (i % 3) * 18, 36, 10, 0, 0, Math.PI * 2);
      g.fill();
    }
    // 上升气泡
    g.strokeStyle = "rgba(255,255,255,0.7)";
    g.lineWidth = 1.5;
    [[80, 180, 7], [160, 120, 5], [250, 200, 9], [330, 90, 6], [420, 160, 8], [470, 60, 4], [200, 40, 5]].forEach(([x, y, r]) => {
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.stroke();
    });
    // 远处剪影海草
    g.fillStyle = "rgba(40,110,90,0.35)";
    g.beginPath();
    g.ellipse(60, 240, 26, 40, 0.15, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.ellipse(460, 245, 30, 34, -0.1, 0, Math.PI * 2);
    g.fill();
    return new THREE.CanvasTexture(c);
  })();

  /* 舷窗视野：水下夜晚 */
  const skyNight = (() => {
    const [c, g] = makeCanvas(512, 256);
    const grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "#0e2a4a");
    grad.addColorStop(0.6, "#163a5e");
    grad.addColorStop(1, "#1e4a70");
    g.fillStyle = grad;
    g.fillRect(0, 0, 512, 256);
    g.fillStyle = "rgba(220,235,255,0.9)";
    g.shadowColor = "rgba(200,225,255,0.8)";
    g.shadowBlur = 26;
    g.beginPath();
    g.arc(420, 56, 20, 0, Math.PI * 2);
    g.fill();
    g.shadowBlur = 0;
    g.strokeStyle = "rgba(200,225,255,0.5)";
    g.lineWidth = 1.5;
    [[90, 170, 6], [180, 110, 4], [280, 190, 8], [360, 80, 5], [450, 150, 6]].forEach(([x, y, r]) => {
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.stroke();
    });
    return new THREE.CanvasTexture(c);
  })();

  /* 舷窗视野：多云 = 阴沉绿海水 */
  const skyCloudy = (() => {
    const [c, g] = makeCanvas(512, 256);
    const grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "#7ab8b8");
    grad.addColorStop(0.6, "#8fc8c8");
    grad.addColorStop(1, "#b0dcd0");
    g.fillStyle = grad;
    g.fillRect(0, 0, 512, 256);
    g.strokeStyle = "rgba(255,255,255,0.6)";
    g.lineWidth = 1.5;
    [[100, 160, 6], [220, 100, 5], [340, 180, 7], [440, 90, 5]].forEach(([x, y, r]) => {
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.stroke();
    });
    return new THREE.CanvasTexture(c);
  })();

  const appScreen = (() => {
    const [c, g] = makeCanvas(256, 160);
    g.fillStyle = "#f7f4ec";
    g.fillRect(0, 0, 256, 160);
    g.fillStyle = "#2f2b27";
    g.fillRect(0, 0, 256, 18);
    g.fillStyle = "#d98e5f";
    g.beginPath();
    g.arc(18, 9, 4, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#8d8172";
    g.fillRect(28, 6, 60, 6);
    g.fillStyle = "#ece5d6";
    g.fillRect(0, 18, 58, 142);
    g.fillStyle = "#d98e5f";
    g.fillRect(8, 30, 42, 6);
    g.fillRect(8, 46, 42, 6);
    g.fillRect(8, 62, 34, 6);
    g.fillStyle = "#7fb3c9";
    g.fillRect(70, 32, 120, 62);
    g.fillStyle = "#ffffff";
    g.fillRect(80, 42, 40, 20);
    g.fillRect(130, 42, 48, 20);
    g.fillRect(80, 70, 100, 12);
    g.fillStyle = "#d9b98c";
    g.fillRect(70, 104, 120, 10);
    g.fillRect(70, 122, 90, 10);
    g.fillStyle = "#e0c38a";
    g.fillRect(200, 32, 34, 18);
    g.fillStyle = "#d98e6a";
    g.fillRect(200, 56, 34, 18);
    g.fillStyle = "#8fb7a8";
    g.fillRect(200, 80, 34, 18);
    return new THREE.CanvasTexture(c);
  })();

  const screenMat = new THREE.MeshBasicMaterial({ map: appScreen, toneMapped: false });

  /* ---------- 灯光 ---------- */
  // 水下漫射：天青蓝 / 沙地黄
  const hemi = new THREE.HemisphereLight(0xcfeef8, 0xd8b878, 0.38);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xfff4e0, 2.4);
  key.position.set(-3.2, 4.6, 2.4);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 14;
  key.shadow.camera.left = -5;
  key.shadow.camera.right = 5;
  key.shadow.camera.top = 5;
  key.shadow.camera.bottom = -2.5;
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  scene.add(key);

  const fill = new THREE.PointLight(0x9fe0f0, 0.6, 9, 2);
  fill.position.set(2.6, 2.3, 1.6);
  scene.add(fill);

  /* ---------- 沙地地板 ---------- */
  const sandTex = (() => {
    const [c, g] = makeCanvas(512, 512);
    g.fillStyle = "#e6d39a";
    g.fillRect(0, 0, 512, 512);
    // 沙粒斑点
    for (let i = 0; i < 900; i += 1) {
      const x = (i * 53) % 512;
      const y = (i * 97) % 512;
      g.fillStyle = i % 2 ? "rgba(180,150,90,0.25)" : "rgba(255,245,210,0.3)";
      g.fillRect(x, y, 2, 2);
    }
    // 几块海星/贝壳
    g.fillStyle = "#f29a8a";
    g.beginPath();
    g.arc(90, 400, 10, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#fff2d0";
    g.beginPath();
    g.arc(420, 120, 7, 0, Math.PI * 2);
    g.fill();
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return tex;
  })();

  /* ---------- 绿松石竖纹墙板 ---------- */
  const wallTex = (() => {
    const [c, g] = makeCanvas(512, 256);
    g.fillStyle = "#5cc0d2";
    g.fillRect(0, 0, 512, 256);
    const plankW = 42;
    for (let x = 0; x < 512; x += plankW) {
      g.fillStyle = (x / plankW) % 2 ? "rgba(255,255,255,0.07)" : "rgba(20,90,110,0.08)";
      g.fillRect(x, 0, plankW, 256);
      g.strokeStyle = "rgba(20,90,110,0.35)";
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x, 256);
      g.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2.4, 1);
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return tex;
  })();

  /* ---------- 菠萝皮橙纹（穹顶） ---------- */
  const pineappleTex = (() => {
    const [c, g] = makeCanvas(512, 256);
    g.fillStyle = "#f2913a";
    g.fillRect(0, 0, 512, 256);
    // 菱格交叉线
    g.strokeStyle = "rgba(160,80,20,0.55)";
    g.lineWidth = 3;
    for (let i = -256; i < 768; i += 48) {
      g.beginPath();
      g.moveTo(i, 0);
      g.lineTo(i + 256, 256);
      g.stroke();
      g.beginPath();
      g.moveTo(i + 256, 0);
      g.lineTo(i, 256);
      g.stroke();
    }
    // 小眼斑
    g.fillStyle = "rgba(140,70,15,0.5)";
    for (let y = 24; y < 256; y += 48) {
      for (let x = 24; x < 512; x += 48) {
        g.beginPath();
        g.ellipse(x + ((y / 48) % 2) * 24, y, 4, 7, 0, 0, Math.PI * 2);
        g.fill();
      }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 1);
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return tex;
  })();

  /* ---------- 房间骨架 ---------- */
  const sandMat = new THREE.MeshStandardMaterial({ map: sandTex, roughness: 0.95, metalness: 0 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(6, 5), sandMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const wallMat = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.9 });
  const wallBack = new THREE.Mesh(new THREE.PlaneGeometry(6, 2.8), wallMat);
  wallBack.position.set(0, 1.4, -2.5);
  wallBack.receiveShadow = true;
  scene.add(wallBack);

  const wallLeft = new THREE.Mesh(new THREE.PlaneGeometry(5, 2.8), wallMat);
  wallLeft.rotation.y = Math.PI / 2;
  wallLeft.position.set(-3, 1.4, 0);
  wallLeft.receiveShadow = true;
  scene.add(wallLeft);

  // 踢脚线（蓝色船板风）
  scene.add(box(6, 0.14, 0.06, std("#3a7a9a", 0.7), { y: 0.07, z: -2.47, receive: true }));
  const baseLeft = box(5, 0.14, 0.06, std("#3a7a9a", 0.7), { x: -2.97, y: 0.07, receive: true });
  baseLeft.rotation.y = Math.PI / 2;
  scene.add(baseLeft);

  // 菠萝皮穹顶（倒扣半球罩在头顶，从内部看）
  const domeMat = new THREE.MeshStandardMaterial({ map: pineappleTex, roughness: 0.85, side: THREE.BackSide });
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(3.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    domeMat,
  );
  dome.position.set(0, 0.0, -0.4);
  dome.receiveShadow = false;
  scene.add(dome);

  // 穹顶上方的绿叶冠（几簇椭圆叶）
  const leafCrown = new THREE.Group();
  const leafGreen = std("#57a83f", 0.75);
  const leafGreen2 = std("#6cbf4a", 0.75);
  for (let i = 0; i < 7; i += 1) {
    const a = (i / 7) * Math.PI - Math.PI / 2;
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), i % 2 ? leafGreen : leafGreen2);
    leaf.scale.set(0.45, 2.6, 0.18);
    leaf.position.set(Math.sin(a) * 0.3, 3.6 + Math.cos(a) * 0.15, -0.4 + (i % 3) * 0.3);
    leaf.rotation.z = -a * 0.6;
    leaf.rotation.x = 0.25;
    leafCrown.add(leaf);
  }
  leafCrown.position.set(0, 0, -2.2);
  scene.add(leafCrown);

  // 绿色圆地毯（菠萝纹圆心）
  const rug = new THREE.Mesh(new THREE.CircleGeometry(1.5, 48), toon("#57a848"));
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0, 0.012, -0.7);
  rug.receiveShadow = true;
  scene.add(rug);

  // 接触阴影（漫画感：物体落地处压一圈暗）
  const blobTex = (() => {
    const [bc, bg] = makeCanvas(128, 128);
    const grad = bg.createRadialGradient(64, 64, 8, 64, 64, 62);
    grad.addColorStop(0, "rgba(40,30,20,0.42)");
    grad.addColorStop(0.7, "rgba(40,30,20,0.18)");
    grad.addColorStop(1, "rgba(40,30,20,0)");
    bg.fillStyle = grad;
    bg.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(bc);
  })();
  const contactBlob = (x, z, r) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(r * 2, r * 2), new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, depthWrite: false }));
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, 0.015, z);
    scene.add(m);
  };
  contactBlob(-0.85, -1.55, 0.55); // 红椅
  contactBlob(-0.85, -1.05, 0.38); // 救生圈
  contactBlob(0.0, -1.5, 0.32); // 小圆桌
  contactBlob(1.05, -1.95, 0.8); // 绿沙发
  contactBlob(-1.45, -0.3, 0.35); // 小蜗
  contactBlob(2.0, -2.1, 0.7); // 电视柜
  contactBlob(-2.55, 0.9, 0.4); // Marshall
  contactBlob(2.55, 0.3, 0.5); // 钢琴
  contactBlob(-2.55, -1.6, 0.4); // 植物
  const rugCenter = new THREE.Mesh(new THREE.CircleGeometry(0.55, 32), toon("#e9c860"));
  rugCenter.rotation.x = -Math.PI / 2;
  rugCenter.position.set(0, 0.014, -0.7);
  scene.add(rugCenter);


  /* ---------- 舷窗（pickable: window） ---------- */
  const windowGroup = new THREE.Group();
  const portholeBlue = std("#4a6fa5", 0.5, 0.2);
  // 圆形舷窗外框
  const winRing = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.09, 14, 40), portholeBlue);
  winRing.castShadow = false;
  windowGroup.add(winRing);
  // 玻璃 = 水下视野
  const winGlass = new THREE.Mesh(new THREE.CircleGeometry(0.56, 40), new THREE.MeshBasicMaterial({ map: skyDay, toneMapped: false }));
  winGlass.position.z = -0.02;
  winGlass.userData.pick = "window";
  windowGroup.add(winGlass);
  // 铆钉
  const rivetMat = std("#c9d8e8", 0.4, 0.5);
  for (let i = 0; i < 8; i += 1) {
    const a = (i / 8) * Math.PI * 2;
    const r = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), rivetMat);
    r.position.set(Math.cos(a) * 0.62, Math.sin(a) * 0.62, 0.05);
    windowGroup.add(r);
  }
  // 舷窗横档
  windowGroup.add(box(1.18, 0.06, 0.05, portholeBlue, { z: 0.04, cast: false }));
  windowGroup.add(box(0.06, 1.18, 0.05, portholeBlue, { z: 0.04, cast: false }));
  windowGroup.position.set(1.7, 1.62, -2.46);
  pickable(windowGroup, "window");
  scene.add(windowGroup);

  /* 左侧墙装饰舷窗（不可点） */
  const decoPort = new THREE.Group();
  const dpRing = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.06, 12, 28), portholeBlue);
  dpRing.rotation.y = Math.PI / 2;
  decoPort.add(dpRing);
  const dpGlass = new THREE.Mesh(new THREE.CircleGeometry(0.28, 28), new THREE.MeshBasicMaterial({ map: skyDay, toneMapped: false }));
  dpGlass.rotation.y = Math.PI / 2;
  dpGlass.position.z = 0.02;
  decoPort.add(dpGlass);
  decoPort.position.set(-2.97, 1.7, -0.6);
  scene.add(decoPort);

  /* ---------- 灯串 ---------- */
  const stringGroup = new THREE.Group();
  const stringMat = new THREE.MeshStandardMaterial({
    color: 0x3a7a9a,
    roughness: 0.8,
    emissive: 0x000000,
  });
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.7, 2.62, -2.42),
    new THREE.Vector3(-1.3, 2.32, -2.42),
    new THREE.Vector3(0, 2.52, -2.42),
    new THREE.Vector3(1.3, 2.3, -2.42),
    new THREE.Vector3(2.7, 2.6, -2.42),
  ]);
  const wire = new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.008, 6, false), stringMat);
  wire.castShadow = false;
  stringGroup.add(wire);
  const bulbMat = new THREE.MeshStandardMaterial({
    color: 0xffd97a,
    emissive: 0xffc46e,
    emissiveIntensity: 0.9,
    roughness: 0.3,
  });
  for (let i = 0; i <= 9; i += 1) {
    const p = curve.getPoint(i / 9);
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.032, 12, 10), bulbMat);
    b.position.copy(p);
    b.position.y -= 0.02;
    stringGroup.add(b);
  }
  scene.add(stringGroup);

  const stringGlow = new THREE.PointLight(0xffc46e, 1.2, 4.2, 2);
  stringGlow.position.set(0, 2.35, -2.35);
  scene.add(stringGlow);

  /* ---------- 台灯（装饰） ---------- */
  const lampGroup = new THREE.Group();
  lampGroup.add(cyl(0.09, 0.12, 0.3, std("#3a7a9a", 0.5), { y: 0.15 }));
  lampGroup.add(cyl(0.035, 0.035, 0.52, std("#2f4a5a", 0.4, 0.4), { y: 0.56 }));
  const shadeMat = new THREE.MeshStandardMaterial({
    color: 0xffe2b8,
    emissive: 0xffd9a0,
    emissiveIntensity: 0.75,
    roughness: 0.9,
  });
  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.16, 20, 1, true), shadeMat);
  shade.position.y = 0.86;
  shade.rotation.x = Math.PI;
  lampGroup.add(shade);
  const lampLight = new THREE.PointLight(0xffd9a0, 0.8, 3.4, 2);
  lampLight.position.set(0, 0.78, 0.08);
  lampGroup.add(lampLight);
  lampGroup.position.set(1.72, 0, -1.58);
  scene.add(lampGroup);

/* ---------- 拱形木门（菠萝屋入口） ---------- */
const doorGroup = new THREE.Group();
const doorWood = std("#b9763f", 0.6);
const doorWoodDark = std("#8a5a30", 0.65);
// 门框（拱形：底部方柱 + 顶部半圆）
doorGroup.add(box(0.1, 1.5, 0.08, doorWoodDark, { x: -0.42, y: 0.75, z: 0 }));
doorGroup.add(box(0.1, 1.5, 0.08, doorWoodDark, { x: 0.42, y: 0.75, z: 0 }));
const doorTop = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.05, 10, 24, Math.PI), doorWoodDark);
doorTop.position.set(0, 1.5, 0);
doorGroup.add(doorTop);
// 门板
doorGroup.add(box(0.78, 1.5, 0.05, doorWood, { y: 0.75, z: -0.01 }));
// 门板竖纹
[-0.2, 0, 0.2].forEach((x) => {
  doorGroup.add(box(0.02, 1.4, 0.02, doorWoodDark, { x, y: 0.75, z: 0.03 }));
});
// 海星门环（蓝色）
const knob = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.02, 8, 16), std("#4a6fa5", 0.5, 0.3));
knob.position.set(0.28, 0.85, 0.05);
doorGroup.add(knob);
doorGroup.position.set(-1.35, 0, -2.46);
scene.add(doorGroup);

/* ---------- 红扶手椅（真实菠萝屋款） ---------- */
const chairGroup = new THREE.Group();
const redFabric = toon("#d9382e");
// 厚实坐垫
const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.32, 0.22, 24), redFabric);
seat.position.y = 0.24;
chairGroup.add(seat);
// 高靠背（圆角）
const back = box(0.56, 0.78, 0.16, redFabric, { y: 0.72, z: -0.2 });
chairGroup.add(back);
// 圆润扶手
chairGroup.add(box(0.12, 0.34, 0.4, redFabric, { x: -0.32, y: 0.42, z: 0 }));
chairGroup.add(box(0.12, 0.34, 0.4, redFabric, { x: 0.32, y: 0.42, z: 0 }));
chairGroup.position.set(-0.85, 0, -1.55);
chairGroup.rotation.y = 0.15;
scene.add(chairGroup);

/* 救生圈脚凳（放在椅子正前方地上） */
const ottomanGroup = new THREE.Group();
const ringWhite = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.07, 12, 28), toon("#f2f2f2"));
ringWhite.rotation.x = Math.PI / 2;
ringWhite.position.y = 0.09;
ottomanGroup.add(ringWhite);
[0, Math.PI, Math.PI / 2, Math.PI * 1.5].forEach((a) => {
  const seg = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.071, 8, 8, 0.5), toon("#d9382e"));
  seg.rotation.x = Math.PI / 2;
  seg.rotation.z = a;
  seg.position.y = 0.09;
  ottomanGroup.add(seg);
});
ottomanGroup.position.set(-0.85, 0, -1.05);
scene.add(ottomanGroup);

/* ---------- 小圆木桌（放海螺） ---------- */
const sideTableGroup = new THREE.Group();
const tableWood = std("#b9763f", 0.55);
const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.045, 24), tableWood);
tableTop.position.y = 0.5;
sideTableGroup.add(tableTop);
const tableLeg = cyl(0.035, 0.05, 0.48, std("#8a5a30", 0.6), { y: 0.25 });
sideTableGroup.add(tableLeg);
// 紫色海螺号角（桌上装饰）
const conch = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 10), toon("#8a5ab8"));
conch.scale.set(1.4, 0.7, 1);
conch.position.set(0.05, 0.58, 0);
sideTableGroup.add(conch);
sideTableGroup.position.set(0.0, 0, -1.5);
scene.add(sideTableGroup);

/* ---------- 绿色圆管沙发（靠墙，配蓝坐垫） ---------- */
const couchGroup = new THREE.Group();
const tubeGreen = toon("#4da83f");
for (let i = 0; i < 3; i += 1) {
  const tube = cyl(0.13, 0.13, 1.4, tubeGreen, { y: 0.2 + i * 0.27, z: 0 });
  tube.rotation.z = Math.PI / 2;
  couchGroup.add(tube);
}
// 蓝色坐垫
couchGroup.add(box(1.3, 0.12, 0.42, toon("#3a6a9a"), { y: 0.1, z: 0.18 }));
couchGroup.position.set(1.05, 0, -1.95);
couchGroup.rotation.y = -0.05;
scene.add(couchGroup);

/* ---------- 墙上小相框（蜗牛画） ---------- */
const picFrame = new THREE.Group();
picFrame.add(box(0.34, 0.3, 0.03, std("#b9763f", 0.6), { receive: true }));
picFrame.add(box(0.26, 0.22, 0.02, toon("#e8d8a8"), { z: 0.02, receive: false }));
// 画里的小蜗牛剪影
const snailArt = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), toon("#d9785a"));
snailArt.position.set(0.02, 0, 0.035);
picFrame.add(snailArt);
picFrame.position.set(-0.25, 1.72, -2.47);
scene.add(picFrame);

/* ---------- 墙上海螺号角装饰 ---------- */
const hornGroup = new THREE.Group();
hornGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), toon("#c86aa8")));
const hornTip = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.16, 10), toon("#c86aa8"));
hornTip.rotation.z = -Math.PI / 2;
hornTip.position.x = 0.12;
hornGroup.add(hornTip);
// 黄色条纹
const hornStripe = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.02, 8, 16), toon("#e9c860"));
hornStripe.rotation.y = Math.PI / 2;
hornGroup.add(hornStripe);
hornGroup.position.set(0.45, 1.55, -2.46);
scene.add(hornGroup);

/* ---------- 电视柜 + 显示器（电视） ---------- */
const tvStand = new THREE.Group();
tvStand.add(box(1.1, 0.4, 0.4, std("#b9763f", 0.6), { y: 0.2 }));
tvStand.position.set(2.0, 0, -2.1);
scene.add(tvStand);
const monitorGroup = new THREE.Group();
monitorGroup.add(box(0.18, 0.22, 0.18, std("#3a7a9a", 0.55), { y: 0.11 }));
monitorGroup.add(box(0.1, 0.14, 0.08, std("#2f4a5a", 0.45), { y: 0.28 }));
const monFrame = box(0.95, 0.56, 0.05, std("#2f3a44", 0.4, 0.1), { y: 0.58, z: 0 });
monitorGroup.add(monFrame);
const monScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.87, 0.48), screenMat);
monScreen.position.set(0, 0.58, 0.028);
monitorGroup.add(monScreen);
monitorGroup.position.set(2.0, 0.42, -2.1);
monitorGroup.rotation.y = -0.25;
pickable(monitorGroup, "monitor");
scene.add(monitorGroup);

/* ---------- MacBook（小圆桌上） ---------- */
const mbGroup = new THREE.Group();
const mbBaseMat = std("#5a7a8a", 0.45, 0.25);
mbGroup.add(box(0.62, 0.025, 0.42, mbBaseMat, { y: 0.012 }));
const mbLid = box(0.62, 0.38, 0.022, std("#3a5a6a", 0.4, 0.1), { y: 0.2, z: -0.18, rx: 0.5 });
mbGroup.add(mbLid);
const mbScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.32), screenMat);
mbScreen.position.set(0, 0.195, -0.185);
mbScreen.rotation.x = 0.5;
mbGroup.add(mbScreen);
mbGroup.position.set(0.0, 0.525, -1.5);
mbGroup.rotation.y = 0.1;
pickable(mbGroup, "macbook");
scene.add(mbGroup);

/* ---------- iPad（小画架上） ---------- */
const ipadGroup = new THREE.Group();
ipadGroup.add(box(0.5, 0.66, 0.025, std("#4a6a7a", 0.45, 0.15), { z: -0.012 }));
const ipadScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.58), screenMat);
ipadScreen.position.z = 0.018;
ipadGroup.add(ipadScreen);
// 小画架
ipadGroup.add(box(0.04, 0.5, 0.04, std("#b9763f", 0.6), { x: -0.22, y: -0.3, z: -0.05 }));
ipadGroup.position.set(-2.0, 1.1, -2.2);
ipadGroup.rotation.x = -0.1;
ipadGroup.rotation.y = 0.3;
pickable(ipadGroup, "ipad");
scene.add(ipadGroup);

/* ---------- 手机（小支架上） ---------- */
const phoneGroup = new THREE.Group();
phoneGroup.add(box(0.22, 0.4, 0.02, std("#3a5a6a", 0.45, 0.15), { z: -0.01 }));
const phoneScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.19, 0.34), screenMat);
phoneScreen.position.z = 0.015;
phoneGroup.add(phoneScreen);
phoneGroup.add(box(0.16, 0.04, 0.12, std("#b9763f", 0.6), { y: -0.22, z: -0.02 }));
phoneGroup.position.set(-2.35, 0.55, -1.2);
phoneGroup.rotation.y = 0.4;
pickable(phoneGroup, "phone");
scene.add(phoneGroup);

/* ---------- Marshall（左角） ---------- */
const marshallGroup = new THREE.Group();
const ampBodyMat = std("#3a4a55", 0.6, 0.1);
marshallGroup.add(box(0.5, 0.62, 0.32, ampBodyMat, { y: 0.36 }));
const grillMat = new THREE.MeshStandardMaterial({ color: "#5a7a8a", roughness: 0.9 });
marshallGroup.add(box(0.42, 0.42, 0.02, grillMat, { y: 0.4, z: 0.16 }));
const knobMat = new THREE.MeshStandardMaterial({ color: 0xe9c860, roughness: 0.35, metalness: 0.5 });
[-0.14, 0, 0.14].forEach((x) => {
  const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.025, 14), knobMat);
  knob.rotation.x = Math.PI / 2;
  knob.position.set(x, 0.1, 0.16);
  marshallGroup.add(knob);
});
marshallGroup.position.set(-2.55, 0, 0.9);
marshallGroup.rotation.y = 0.4;
pickable(marshallGroup, "marshall");
scene.add(marshallGroup);

/* ---------- 钢琴（右角） ---------- */
const pianoGroup = new THREE.Group();
const walnut = std("#9c6f45", 0.55, 0.05);
const walnutDeep = std("#7a4f2c", 0.55, 0.05);
pianoGroup.add(box(0.6, 1.0, 0.5, walnut, { y: 0.55, z: 0.05 }));
pianoGroup.add(box(0.03, 1.0, 0.5, walnutDeep, { x: 0.29, y: 0.55, z: 0.05 }));
pianoGroup.add(box(0.64, 0.07, 0.54, walnutDeep, { y: 1.06, z: 0.05 }));
const keybed = box(0.56, 0.09, 0.34, std("#f6efe2", 0.5), { y: 0.95, z: 0.28 });
pianoGroup.add(keybed);
[-0.14, -0.07, 0, 0.07, 0.14].forEach((z) => {
  pianoGroup.add(box(0.5, 0.06, 0.045, std("#2f3a44", 0.5), { y: 1.01, z: 0.28 + z }));
});
pianoGroup.position.set(2.55, 0, 0.3);
pianoGroup.rotation.y = -0.4;
pickable(pianoGroup, "piano");
scene.add(pianoGroup);

/* ---------- 开关（门边） ---------- */
const switchGroup = new THREE.Group();
switchGroup.add(box(0.16, 0.22, 0.02, std("#cfe8f0", 0.7), { z: -0.01, cast: false }));
switchGroup.add(box(0.09, 0.12, 0.015, std("#2f4a5a", 0.4), { y: 0.02, z: 0.005, cast: false }));
switchGroup.position.set(-0.55, 1.25, -2.485);
pickable(switchGroup, "lightswitch");
scene.add(switchGroup);

/* ---------- 垃圾桶（右前角） ---------- */
const trashGroup = new THREE.Group();
trashGroup.add(cyl(0.22, 0.18, 0.5, std("#6fa8c8", 0.55), { y: 0.25 }));
trashGroup.add(cyl(0.17, 0.17, 0.05, std("#5a92b2", 0.55), { y: 0.52 }));
trashGroup.position.set(2.3, 0, 1.2);
pickable(trashGroup, "trashcan");
scene.add(trashGroup);

/* ---------- 海草植物（左角） ---------- */
const plantGroup = new THREE.Group();
plantGroup.add(cyl(0.22, 0.16, 0.36, toon("#e88a5a"), { y: 0.18 }));
const leafMat = toon("#3f9a7a");
const leafMat2 = toon("#57b890");
[[0, 0.55, 0.3], [0.16, 0.46, 0.1], [-0.14, 0.44, 0.08], [0.05, 0.7, 0.26], [-0.08, 0.6, 0.2]].forEach(([x, y, r], i) => {
  const leaf = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 12), i % 2 ? leafMat : leafMat2);
  leaf.position.set(x, y, 0);
  leaf.scale.y = 0.85;
  plantGroup.add(leaf);
});
plantGroup.position.set(-2.55, 0, -1.6);
scene.add(plantGroup);

/* ---------- 小蜗（地毯左边） ---------- */
const snailGroup = new THREE.Group();
snailGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 14), toon("#d9785a")));
const snBody = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), toon("#f2b8a8"));
snBody.position.set(-0.08, -0.08, 0);
snBody.scale.set(1.3, 0.7, 0.9);
snailGroup.add(snBody);
[[0.1, 0.1], [0.1, -0.1]].forEach(([x, z]) => {
  const stalk = cyl(0.01, 0.01, 0.18, toon("#f2b8a8"), { x: 0.09, y: 0.16, z });
  snailGroup.add(stalk);
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), toon("#f2f2f2"));
  eye.position.set(0.09, 0.27, z);
  snailGroup.add(eye);
  const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.013, 8, 6), toon("#2f2b27"));
  pupil.position.set(0.1, 0.27, z);
  snailGroup.add(pupil);
});
snailGroup.position.set(-1.45, 0.16, -0.3);
snailGroup.rotation.y = 0.8;
scene.add(snailGroup);

  /* ---------- 上升气泡 ---------- */
  const bubbleCount = 36;
  const bubbleGeo = new THREE.SphereGeometry(0.025, 8, 6);
  const bubbleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 });
  const bubbles = [];
  const bubbleGroup = new THREE.Group();
  for (let i = 0; i < bubbleCount; i += 1) {
    const b = new THREE.Mesh(bubbleGeo, bubbleMat);
    b.position.set(
      (Math.random() - 0.5) * 5.5,
      Math.random() * 3.2,
      -2.2 + Math.random() * 3.5,
    );
    const s = 0.5 + Math.random() * 1.6;
    b.scale.setScalar(s);
    b.userData.speed = 0.25 + Math.random() * 0.4;
    b.userData.drift = Math.random() * Math.PI * 2;
    bubbleGroup.add(b);
    bubbles.push(b);
  }
  scene.add(bubbleGroup);

  /* ---------- 交互：悬停 / 点击 / 旋转 / 缩放 ---------- */
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const pickMeshes = [];
  scene.traverse((node) => {
    if (node.isMesh && node.userData.pick) pickMeshes.push(node);
  });

  let hovered = null;
  let hoverGoal = null;
  let downPos = null;
  let dragging = false;
  let pinchDist = 0;

  const setHover = (id, sx, sy) => {
    if (hovered === id) return;
    hovered = id;
    if (id) {
      canvas.style.cursor = "pointer";
      if (chip) {
        chip.textContent = LABELS[id] || "";
        chip.hidden = false;
        const rect = host.getBoundingClientRect();
        chip.style.left = `${Math.min(Math.max(sx - rect.left, 8), rect.width - 8)}px`;
        chip.style.top = `${Math.max(sy - rect.top - 44, 8)}px`;
        chip.classList.add("is-visible");
      }
    } else {
      canvas.style.cursor = "grab";
      if (chip) {
        chip.classList.remove("is-visible");
        chip.hidden = true;
      }
    }
  };

  const updatePointer = (clientX, clientY) => {
    const rect = host.getBoundingClientRect();
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  };

  const raycastPick = (clientX, clientY) => {
    updatePointer(clientX, clientY);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(pickMeshes, false);
    if (!hits.length) return null;
    for (const hit of hits) {
      let node = hit.object;
      while (node && !node.userData.pick) node = node.parent;
      if (node && node.userData.pick) return node.userData.pick;
    }
    return null;
  };

  const onPointerMove = (event) => {
    if (busy || overlayOpen()) {
      setHover(null);
      return;
    }
    if (dragging || (downPos && downPos.active)) return;
    const id = raycastPick(event.clientX, event.clientY);
    setHover(id, event.clientX, event.clientY);
  };

  const overlayOpen = () => {
    const layer = document.querySelector("[data-overlay-layer]");
    return layer ? !layer.hidden : false;
  };

  canvas.addEventListener("pointermove", onPointerMove);

  canvas.addEventListener(
    "pointerdown",
    (event) => {
      try {
        canvas.setPointerCapture?.(event.pointerId);
      } catch {
        // 某些设备/合成指针不支持捕获，忽略即可
      }
      downPos = { x: event.clientX, y: event.clientY, moved: 0, active: true, id: event.pointerId, yaw: cam.yaw, radius: cam.radius };
      if (pinchActive()) {
        pinchDist = pinchDistance();
      }
    },
  );

  const pointers = new Map();
  const pinchActive = () => pointers.size >= 2;
  const pinchDistance = () => {
    const [a, b] = [...pointers.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };
  const trackPointer = (event, add) => {
    if (add) pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    else pointers.delete(event.pointerId);
  };

  canvas.addEventListener(
    "pointermove",
    (event) => {
      if (!downPos || downPos.id !== event.pointerId) return;
      if (pinchActive()) {
        if (pointers.has(event.pointerId)) pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        const d = pinchDistance();
        if (pinchDist > 0 && d > 0) {
          camGoal.radius = Math.min(Math.max(cam.radius * (pinchDist / d), 2.7), 7.2);
          cam.radius = camGoal.radius;
        }
        pinchDist = d;
        return;
      }
      const dx = event.clientX - downPos.x;
      const dy = event.clientY - downPos.y;
      downPos.moved = Math.max(downPos.moved, Math.abs(dx), Math.abs(dy));
      if (downPos.moved > 5) {
        dragging = true;
        canvas.style.cursor = "grabbing";
        camGoal.yaw = Math.min(Math.max(downPos.yaw + dx * 0.0045, -1.25), 1.25);
      }
    },
  );

  canvas.addEventListener("pointerup", (event) => {
    trackPointer(event, false);
    if (!downPos || downPos.id !== event.pointerId) return;
    const wasDrag = dragging;
    const moved = downPos.moved;
    const tap = !wasDrag && moved <= 6;
    const tx = event.clientX;
    const ty = event.clientY;
    downPos = null;
    dragging = false;
    canvas.style.cursor = "grab";
    if (tap && !busy && !overlayOpen()) {
      const id = raycastPick(tx, ty);
      if (id) {
        setHover(null);
        window.dispatchEvent(new CustomEvent("room:scene-click", { detail: { objectId: id } }));
      }
    }
  });
  canvas.addEventListener("pointercancel", () => {
    pointers.clear();
    downPos = null;
    dragging = false;
    canvas.style.cursor = "grab";
  });
  canvas.addEventListener("pointerdown", (event) => trackPointer(event, true));

  canvas.addEventListener(
    "wheel",
    (event) => {
      if (overlayOpen()) return;
      event.preventDefault();
      const factor = Math.exp(event.deltaY * 0.0011);
      camGoal.radius = Math.min(Math.max(cam.radius * factor, 2.7), 7.2);
    },
    { passive: false },
  );

  window.addEventListener("keydown", (event) => {
    if (overlayOpen()) {
      if (event.key === "Escape") {
        window.dispatchEvent(new CustomEvent("room:request-close"));
      }
      return;
    }
    if (event.key === "ArrowLeft") camGoal.yaw = Math.min(Math.max(cam.yaw + 0.09, -1.25), 1.25);
    if (event.key === "ArrowRight") camGoal.yaw = Math.min(Math.max(cam.yaw - 0.09, -1.25), 1.25);
  });

  /* ---------- 镜头聚焦 ---------- */
  const FOCUS_YAW = {
    overview: 0,
    monitor: -0.31,
    macbook: 0.21,
    ipad: -0.59,
    phone: -0.61,
    marshall: 1.25,
    piano: -1.25,
    window: 0.61,
    lightswitch: -0.53,
    trashcan: -1.25,
  };
  const FOCUS_RADIUS = {
    overview: 5.7,
    monitor: 4.6,
    macbook: 4.4,
    ipad: 4.0,
    phone: 3.9,
    marshall: 3.6,
    piano: 3.2,
    window: 4.2,
    lightswitch: 3.7,
    trashcan: 3.6,
  };

  const easeToObject = (id) => {
    const yaw = FOCUS_YAW[id] ?? 0;
    const radius = FOCUS_RADIUS[id] ?? 4.9;
    camGoal.yaw = yaw;
    camGoal.radius = radius;
    if (reduceMotion) {
      cam.yaw = yaw;
      cam.radius = radius;
    }
  };

  let currentFocus = "overview";
  window.addEventListener("room:activate-request", (event) => {
    const id = event.detail?.objectId;
    if (!id) return;
    easeToObject(id);
    const delay = reduceMotion ? 0 : 420;
    window.setTimeout(() => {
      currentFocus = id;
      window.dispatchEvent(new CustomEvent("room:activate-done", { detail: { objectId: id } }));
    }, delay);
  });

  window.addEventListener("room:scene-click", (event) => {
    const id = event.detail?.objectId;
    if (!id) return;
    window.dispatchEvent(new CustomEvent("room:activate-request", { detail: { objectId: id } }));
  });

  window.addEventListener("room:reset-view", () => {
    camGoal.yaw = 0;
    camGoal.radius = 4.9;
  });

  /* ---------- 氛围联动 ---------- */
  const applyAmbient = () => {
    const tone = root.dataset.sceneTone || "day";
    const weather = root.dataset.weather || "sunny";
    const lights = root.dataset.lights || "on";
    const night = tone === "night";

    winGlass.material.map = night ? skyNight : weather === "cloudy" ? skyCloudy : skyDay;
    winGlass.material.needsUpdate = true;

    hemi.intensity = night ? 0.34 : 0.62;
    hemi.color.set(night ? 0x7a9ad0 : 0xcfeef8);
    key.intensity = night ? 0.55 : 1.5;
    key.color.set(night ? 0x9db8e8 : 0xf2fbff);
    fill.intensity = night ? 0.3 : 0.6;
    lampLight.intensity = night ? 1.5 : 0.8;

    const on = lights === "on";
    stringGlow.intensity = on ? (night ? 2.1 : 1.1) : 0;
    stringGroup.children.forEach((child, index) => {
      if (index === 0) return;
      if (child.isMesh) {
        child.material.emissiveIntensity = on ? (night ? 1.8 : 0.9) : 0;
      }
    });
  };
  applyAmbient();

  const ambientObserver = new MutationObserver(applyAmbient);
  ambientObserver.observe(root, {
    attributes: true,
    attributeFilter: ["data-scene-tone", "data-weather", "data-lights"],
  });

  /* ---------- 渲染循环 ---------- */
  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // 窄屏拉宽视野，让更多物件入画
    camera.fov = w / h < 0.75 ? 64 : 42;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", resize);
  resize();

  const clock = new THREE.Timer();
  const debug = { frames: 0, lastDt: 0 };
  const animate = (timestamp) => {
    clock.update(timestamp);
    const dt = Math.min(clock.getDelta(), 0.05);
    debug.frames += 1;
    debug.lastDt = dt;
    const k = reduceMotion ? 1 : 1 - Math.exp(-dt * 5.5);

    cam.yaw += (camGoal.yaw - cam.yaw) * k;
    cam.radius += (camGoal.radius - cam.radius) * k;

    // 气泡上升
    if (!reduceMotion) {
      bubbles.forEach((b) => {
        b.position.y += b.userData.speed * dt;
        b.userData.drift += dt;
        b.position.x += Math.sin(b.userData.drift * 2) * 0.0015;
        if (b.position.y > 3.2) {
          b.position.y = 0.1;
          b.position.x = (Math.random() - 0.5) * 5.5;
        }
      });
    }

    // 悬停缩放
    if (hovered && !reduceMotion) {
      const target = pickMeshes.find((m) => m.userData.pick === hovered);
      if (target) {
        const parent = target.parent;
        if (parent && parent.isGroup) {
          const goal = 1.035;
          parent.scale.x += (goal - parent.scale.x) * 0.12;
          parent.scale.y += (goal - parent.scale.y) * 0.12;
          parent.scale.z += (goal - parent.scale.z) * 0.12;
        }
      }
    }

    applyCamera();
    composer.render();
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);

  // 房间就绪后允许悬停/点击
  window.dispatchEvent(new CustomEvent("room3d:ready"));

  // 调试句柄：供无头验收读取场景与相机状态
  const project = (id) => {
    let mesh = null;
    scene.traverse((n) => {
      if (n.isMesh && n.userData.pick === id && !mesh) mesh = n;
    });
    if (!mesh) return null;
    const v = new THREE.Vector3();
    mesh.getWorldPosition(v);
    v.project(camera);
    const rect = canvas.getBoundingClientRect();
    return {
      x: (v.x * 0.5 + 0.5) * rect.width,
      y: (-v.y * 0.5 + 0.5) * rect.height,
      z: v.z,
      visible: v.z < 1,
    };
  };
  window.__room3d = {
    scene,
    camera,
    cam,
    camGoal,
    renderer,
    key,
    hemi,
    stringGlow,
    winGlass,
    raycastPick,
    project,
    applyCamera,
    FOCUS_YAW,
    debug,
  };
})();
