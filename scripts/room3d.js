import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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
  renderer.toneMappingExposure = 1.0;

  const scene = new THREE.Scene();
  // 水下：浅蓝水雾（房间尺度拉远，雾也相应后移）
  scene.fog = new THREE.Fog(0xc2e6ef, 10.5, 16.0);

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
  const TARGET = new THREE.Vector3(0, 1.3, -0.3);
  const cam = { yaw: 0, pitch: 0.42, radius: 5.4 };
  const camGoal = { yaw: 0, pitch: 0.42, radius: 5.4 };
  let busy = false;

  /* ---------- 后处理：描边 + SSAO + Bloom（3D 漫画感） ---------- */
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const outlinePass = new OutlinePass(new THREE.Vector2(host.clientWidth, host.clientHeight), scene, camera);
  outlinePass.edgeStrength = 1.15;
  outlinePass.edgeGlow = 0.06;
  outlinePass.edgeThickness = 1.0;
  outlinePass.visibleEdgeColor.set("#46352a");
  outlinePass.hiddenEdgeColor.set("#241b14");
  outlinePass.selectedObjects = [];
  composer.addPass(outlinePass);
  const ssaoPass = new SSAOPass(scene, camera, host.clientWidth, host.clientHeight);
  ssaoPass.kernelRadius = 0.10;
  ssaoPass.minDistance = 0.004;
  ssaoPass.maxDistance = 0.38;
  composer.addPass(ssaoPass);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(host.clientWidth, host.clientHeight), 0.05, 0.3, 0.92);
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
  const std = (color, roughness = 0.72, metalness = 0.03) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  // 手绘分层明暗：MeshToonMaterial + 柔和灰阶渐变图（8 档，避免机械硬切三档）
  let toonGradientTex = null;
  const toon = (color, map) =>
    new THREE.MeshToonMaterial({ color, map, gradientMap: toonGradientTex });

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
  toonGradientTex = (() => {
    const [c, g] = makeCanvas(8, 1);
    const stops = ["#4c4c4c", "#5f5f5f", "#737373", "#878787", "#9a9a9a", "#adadad", "#c0c0c0", "#d2d2d2", "#e2e2e2", "#ececec", "#f4f4f4", "#f8f8f8"];
    stops.forEach((col, i) => {
      g.fillStyle = col;
      g.fillRect(i, 0, 1, 1);
    });
    const t = new THREE.CanvasTexture(c);
    t.minFilter = THREE.NearestFilter;
    t.magFilter = THREE.NearestFilter;
    return t;
  })();

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
  const gltfLoader = new GLTFLoader();
  // 水下漫射：天青蓝 / 沙地黄
  const hemi = new THREE.HemisphereLight(0xd6f0f8, 0xe8cf9a, 0.46);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xfff3e2, 1.15);
  key.position.set(-3.2, 4.8, 2.6);
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

  const fill = new THREE.PointLight(0xfff0dc, 0.5, 9, 2);
  fill.position.set(2.6, 2.2, 1.6);
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

  /* ---------- 菠萝皮橙纹（穹顶兜底） ---------- */
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
  const srgbTex = (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return t;
  };
  const seamNoise = (g, w, h, alpha, count) => {
    for (let i = 0; i < count; i += 1) {
      g.fillStyle = i % 2 ? `rgba(30,70,80,${alpha})` : `rgba(255,255,240,${alpha * 0.7})`;
      g.fillRect((i * 149) % w, (i * 61) % h, 2, 3);
    }
  };

  /* 墙面手绘竖纹（连续墙面：深浅不均的竖向笔触，粗细/长短/疏密有变化） */
  const wallTex = (() => {
    const [c, g] = makeCanvas(512, 256);
    const base = g.createLinearGradient(0, 0, 512, 256);
    base.addColorStop(0, "#8fc3c6");
    base.addColorStop(0.5, "#a3d0d2");
    base.addColorStop(1, "#8cc0c2");
    g.fillStyle = base;
    g.fillRect(0, 0, 512, 256);
    // 深浅不均的竖向笔触（约 46 道：宽度/长度/透明度各异，部分断开）
    const strokeCols = [
      [72, 168, 186], [44, 140, 162], [150, 206, 214], [96, 180, 196], [60, 152, 172],
    ];
    for (let i = 0; i < 46; i += 1) {
      const x = (i * 37 + 17) % 512;
      const w = 3 + (i * 13) % 11;
      const len = 70 + (i * 29) % 180;
      const a = 0.16 + (i % 5) * 0.05;
      const col = strokeCols[i % strokeCols.length];
      g.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${a.toFixed(2)})`;
      g.lineWidth = w;
      g.lineCap = "round";
      const y0 = 4 + (i * 53) % 80;
      g.beginPath();
      g.moveTo(x, y0);
      g.lineTo(x + ((i % 3) - 1) * 3, y0 + len);
      g.stroke();
      if (i % 4 === 0) {
        g.beginPath();
        g.moveTo(x + 2, y0 + len * 0.55);
        g.lineTo(x + 1, y0 + len * 0.85);
        g.stroke();
      }
    }
    // 6 道长程竖纹（贯穿大半墙面，疏密不均，强化“绘制竖纹”语言）
    for (let i = 0; i < 6; i += 1) {
      const x = 24 + (i * 89) % 470;
      const w = 6 + (i % 3) * 5;
      const a = 0.26 + (i % 4) * 0.05;
      const col = strokeCols[(i + 2) % strokeCols.length];
      g.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${a.toFixed(2)})`;
      g.lineWidth = w;
      g.lineCap = "round";
      const y0 = 2 + (i * 41) % 24;
      g.beginPath();
      g.moveTo(x, y0);
      g.bezierCurveTo(x + (i % 2 ? 2 : -3), 90, x - (i % 2 ? 3 : 2), 150, x + (i % 2 ? -2 : 2), 246);
      g.stroke();
    }
    // 底部浅暖色带（墙面与墙裙交界的手绘过渡）
    const skirt = g.createLinearGradient(0, 200, 0, 256);
    skirt.addColorStop(0, "rgba(120,170,175,0.0)");
    skirt.addColorStop(1, "rgba(140,190,195,0.28)");
    g.fillStyle = skirt;
    g.fillRect(0, 200, 512, 56);
    // 大尺度暖亮 / 冷暗色面
    g.fillStyle = "rgba(255,240,210,0.10)";
    g.beginPath(); g.ellipse(90, 60, 90, 70, 0.2, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.ellipse(400, 150, 110, 60, -0.1, 0, Math.PI * 2); g.fill();
    g.fillStyle = "rgba(40,90,100,0.10)";
    g.beginPath(); g.ellipse(260, 210, 120, 50, 0.3, 0, Math.PI * 2); g.fill();
    // 稀疏细颗粒
    seamNoise(g, 512, 256, 0.04, 140);
    const t = srgbTex(new THREE.CanvasTexture(c));
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    return t;
  })();

  /* 地面：浅暖底色 + 稀疏斑驳（弱化规则地砖格） */
  const floorTex = (() => {
    const [c, g] = makeCanvas(512, 512);
    g.fillStyle = "#ecd9b4";
    g.fillRect(0, 0, 512, 512);
    // 大尺度暖 / 冷斑驳
    const mottles = [
      [120, 140, 120, 90, "#e2c89c", 0.22],
      [330, 300, 140, 110, "#f4e6c8", 0.20],
      [210, 460, 150, 90, "#dcc398", 0.18],
      [60, 380, 100, 80, "#f0dfba", 0.16],
      [430, 120, 120, 80, "#e6cf9e", 0.20],
      [260, 60, 110, 70, "#f2e2c0", 0.16],
    ];
    mottles.forEach(([x, y, rx, ry, col, a]) => {
      g.globalAlpha = a;
      g.fillStyle = col;
      g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); g.fill();
    });
    g.globalAlpha = 1;
    // 稀疏画笔扫痕（灰尘感）
    g.strokeStyle = "rgba(190,160,110,0.12)";
    g.lineWidth = 3;
    g.lineCap = "round";
    for (let i = 0; i < 26; i += 1) {
      const x = (i * 61) % 512;
      const y = (i * 37) % 512;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + 40 + (i % 5) * 14, y + (i % 2 ? 8 : -6));
      g.stroke();
    }
    // 极淡的不规则接缝（不再强调网格）
    g.strokeStyle = "rgba(150,120,80,0.10)";
    g.lineWidth = 2;
    [[110, 340], [300, 150], [450, 420]].forEach(([x, y]) => {
      g.beginPath();
      g.moveTo(x, 0); g.bezierCurveTo(x - 14, y, x + 12, y, x, 512); g.stroke();
    });
    [[140, 210], [360, 390]].forEach(([x, y]) => {
      g.beginPath();
      g.moveTo(0, y); g.bezierCurveTo(x - 30, y - 8, x + 26, y + 8, 512, y); g.stroke();
    });
    seamNoise(g, 512, 512, 0.03, 220);
    return srgbTex(new THREE.CanvasTexture(c));
  })();

  /* 手绘布料 v4：软色块铺色 + 轮廓线与短涂抹（绘画上色语言，非木纹/编织） */
  const fabricTex = (base, dark, light, hot, angleBase = 0.06, count = 80) => {
    const [c, g] = makeCanvas(256, 256);
    g.fillStyle = base;
    g.fillRect(0, 0, 256, 256);
    // 不规则大色块：先铺明暗色面（柔边），再叠笔触
    const blobs = [
      [66, 62, 60, 52, light, 0.5], [188, 54, 46, 40, dark, 0.45],
      [52, 192, 44, 48, dark, 0.5], [202, 196, 60, 44, light, 0.44],
      [128, 128, 40, 38, hot, 0.3], [196, 120, 30, 26, hot, 0.26],
      [30, 118, 34, 30, light, 0.34], [120, 220, 30, 24, light, 0.3],
    ];
    g.shadowColor = "rgba(0,0,0,0)";
    blobs.forEach(([x, y, rx, ry, col, a]) => {
      g.globalAlpha = a;
      g.fillStyle = col;
      g.shadowBlur = 14;
      g.shadowColor = col;
      g.beginPath(); g.ellipse(x, y, rx, ry, 0.3, 0, Math.PI * 2); g.fill();
    });
    g.shadowBlur = 0;
    g.globalAlpha = 1;
    // 交叉短笔触：一半顺 angleBase、一半斜向交叉（布料涂抹，不形成长木纹线）
    g.lineCap = "round";
    for (let i = 0; i < count; i += 1) {
      const x = (i * 41 + 13) % 256;
      const y = (i * 67 + 7) % 256;
      const len = 5 + (i * 13) % 13;
      const cross = i % 2 === 0 ? 0 : 0.65 + ((i % 5) - 2) * 0.08;
      const a = angleBase + ((i % 7) - 3) * 0.1 + cross;
      const col = i % 3 === 0 ? light : (i % 3 === 1 ? dark : hot);
      g.strokeStyle = col;
      g.lineWidth = 1.1 + (i % 3);
      g.lineCap = "round";
      g.save();
      g.translate(x, y);
      g.rotate(a);
      g.beginPath();
      g.moveTo(-len, 0);
      g.quadraticCurveTo(0, (i % 2 ? 2.5 : -2.5), len, 1.2);
      g.stroke();
      g.restore();
    }
    // 少量干刷（细短稀疏线）
    g.strokeStyle = hot;
    g.lineWidth = 1;
    for (let i = 0; i < 16; i += 1) {
      const x = (i * 53) % 256;
      const y = (i * 29) % 256;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + 6 + (i % 4) * 3, y - 2);
      g.stroke();
    }
    seamNoise(g, 256, 256, 0.03, 60);
    const t = srgbTex(new THREE.CanvasTexture(c));
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    return t;
  };
  // 红椅：纵向笔触 + 更深暖红（不再发橙泛光）
  const fabricRedTex = fabricTex("#c4452e", "rgba(122,32,18,0.40)", "rgba(236,138,102,0.26)", "rgba(246,186,150,0.20)", 0.10, 92);
  // 绿沙发管：笔触顺管长
  const fabricGreenTex = fabricTex("#43bc66", "rgba(36,132,62,0.34)", "rgba(150,224,160,0.26)", "rgba(210,242,190,0.20)", 0.10, 78);
  // 蓝坐垫：横向涂抹（顺深度方向），更柔更密
  const fabricBlueTex = fabricTex("#4f96d4", "rgba(40,104,164,0.36)", "rgba(160,208,244,0.26)", "rgba(220,238,252,0.18)", 1.52, 70);
  /* 通用手绘表面（蜗牛 / 贝壳等） */
  const paintTex = fabricTex("#e6cf9e", "rgba(160,120,70,0.30)", "rgba(250,240,200,0.28)", "rgba(255,250,225,0.18)");

  /* 救生圈橡胶（暖白绘画表面，与顶点色相乘） */
  const ringRubberTex = (() => {
    const [c, g] = makeCanvas(256, 256);
    g.fillStyle = "#f4f2ea";
    g.fillRect(0, 0, 256, 256);
    g.fillStyle = "rgba(230,220,200,0.20)";
    g.beginPath(); g.ellipse(140, 130, 130, 110, 0.2, 0, Math.PI * 2); g.fill();
    g.fillStyle = "rgba(255,255,245,0.22)";
    g.beginPath(); g.ellipse(90, 90, 70, 90, -0.1, 0, Math.PI * 2); g.fill();
    g.strokeStyle = "rgba(150,140,120,0.14)";
    g.lineWidth = 2;
    g.lineCap = "round";
    for (let i = 0; i < 30; i += 1) {
      const x = (i * 31) % 256;
      const y = (i * 17) % 256;
      g.beginPath();
      g.arc(128, 128, 40 + (i % 6) * 9, (x * 0.001 + i * 0.31) % (Math.PI * 2), (x * 0.001 + i * 0.31) % (Math.PI * 2) + 0.24);
      g.stroke();
    }
    seamNoise(g, 256, 256, 0.03, 120);
    return srgbTex(new THREE.CanvasTexture(c));
  })();

  /* 橙色绑带（手绘：纵向短笔触 + 浅明暗，避免塑料高光） */
  const strapTex = (() => {
    const [c, g] = makeCanvas(256, 256);
    g.fillStyle = "#ee9c3e";
    g.fillRect(0, 0, 256, 256);
    g.fillStyle = "rgba(210,120,30,0.22)";
    g.beginPath(); g.ellipse(150, 200, 120, 60, 0.3, 0, Math.PI * 2); g.fill();
    g.fillStyle = "rgba(255,200,120,0.20)";
    g.beginPath(); g.ellipse(100, 80, 110, 60, -0.2, 0, Math.PI * 2); g.fill();
    g.strokeStyle = "rgba(200,110,26,0.20)";
    g.lineWidth = 2;
    g.lineCap = "round";
    for (let i = 0; i < 34; i += 1) {
      const x = (i * 29) % 256;
      const y = (i * 47) % 256;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + 18 + (i % 4) * 6, y + 3);
      g.stroke();
    }
    seamNoise(g, 256, 256, 0.04, 80);
    return srgbTex(new THREE.CanvasTexture(c));
  })();

  /* 手绘木纹（桌 / 腿 / 门：暖色、笔触化、明暗色面） */
  const woodTex = (() => {
    const [c, g] = makeCanvas(256, 512);
    g.fillStyle = "#b57a44";
    g.fillRect(0, 0, 256, 512);
    const grad = g.createLinearGradient(0, 0, 256, 0);
    grad.addColorStop(0, "rgba(120,66,32,0.30)");
    grad.addColorStop(0.5, "rgba(255,255,255,0.10)");
    grad.addColorStop(1, "rgba(90,48,24,0.22)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 512);
    g.strokeStyle = "rgba(110,62,30,0.35)";
    g.lineCap = "round";
    for (let i = 0; i < 30; i += 1) {
      const x = 6 + (i * 17) % 230;
      const y0 = 6 + (i * 37) % 90;
      const len = 140 + (i * 53) % 300;
      g.lineWidth = 1.2 + (i % 3);
      g.beginPath();
      g.moveTo(x, y0);
      g.bezierCurveTo(x - 5, y0 + len * 0.3, x + 4, y0 + len * 0.6, x - 2, y0 + len);
      g.stroke();
    }
    // 节疤（手绘椭圆）
    [[90, 180], [200, 380], [60, 460]].forEach(([x, y]) => {
      g.strokeStyle = "rgba(96,52,24,0.5)";
      g.lineWidth = 2;
      g.beginPath();
      g.ellipse(x, y, 12, 7, 0.3, 0, Math.PI * 2);
      g.stroke();
      g.beginPath();
      g.ellipse(x, y, 6, 3.5, 0.3, 0, Math.PI * 2);
      g.stroke();
    });
    seamNoise(g, 256, 512, 0.03, 150);
    const t = srgbTex(new THREE.CanvasTexture(c));
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    return t;
  })();

  /* 屋顶橙纹（手绘：不规则交叉笔触，低对比） */
  const roofTex = (() => {
    const [c, g] = makeCanvas(256, 256);
    g.fillStyle = "#ed9335";
    g.fillRect(0, 0, 256, 256);
    g.fillStyle = "rgba(255,210,140,0.20)";
    g.beginPath(); g.ellipse(80, 80, 90, 70, 0.2, 0, Math.PI * 2); g.fill();
    g.fillStyle = "rgba(160,74,18,0.18)";
    g.beginPath(); g.ellipse(180, 190, 100, 80, -0.15, 0, Math.PI * 2); g.fill();
    g.strokeStyle = "rgba(150,72,16,0.30)";
    g.lineWidth = 2;
    g.lineCap = "round";
    for (let i = -260; i < 520; i += 30) {
      g.beginPath(); g.moveTo(i + 8, 0); g.lineTo(i + 248, 256); g.stroke();
      g.beginPath(); g.moveTo(i + 250, 0); g.lineTo(i + 10, 256); g.stroke();
    }
    g.fillStyle = "rgba(120,58,12,0.30)";
    for (let y = 12; y < 256; y += 40) {
      for (let x = 12; x < 256; x += 40) {
        g.beginPath();
        g.ellipse(x + ((y / 40) % 2) * 20 + (x % 3), y, 4, 6, 0, 0, Math.PI * 2);
        g.fill();
      }
    }
    const t = srgbTex(new THREE.CanvasTexture(c));
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    return t;
  })();

  /* 叶片纹理（手绘短笔触） */
  const leafTex = (() => {
    const [c, g] = makeCanvas(128, 128);
    g.fillStyle = "#42965e";
    g.fillRect(0, 0, 128, 128);
    g.strokeStyle = "rgba(30,110,60,0.30)";
    g.lineCap = "round";
    g.lineWidth = 2;
    for (let i = 0; i < 26; i += 1) {
      const x = (i * 19) % 128;
      const y = (i * 43) % 128;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + 10 + (i % 3) * 5, y + 6);
      g.stroke();
    }
    g.strokeStyle = "rgba(160,220,170,0.22)";
    for (let i = 0; i < 20; i += 1) {
      const x = (i * 31) % 128;
      const y = (i * 11) % 128;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x - 8, y + 4);
      g.stroke();
    }
    seamNoise(g, 128, 128, 0.03, 40);
    return srgbTex(new THREE.CanvasTexture(c));
  })();

  /* 金属（门箍 / 铆钉）：手绘蓝灰，受控亮部 */
  const metalTex = (() => {
    const [c, g] = makeCanvas(128, 128);
    g.fillStyle = "#8fb0c0";
    g.fillRect(0, 0, 128, 128);
    g.fillStyle = "rgba(255,255,255,0.16)";
    g.beginPath(); g.ellipse(30, 36, 26, 20, 0.3, 0, Math.PI * 2); g.fill();
    g.fillStyle = "rgba(50,80,110,0.20)";
    g.beginPath(); g.ellipse(100, 100, 30, 24, -0.2, 0, Math.PI * 2); g.fill();
    g.strokeStyle = "rgba(60,95,130,0.22)";
    g.lineCap = "round";
    g.lineWidth = 1.5;
    for (let i = 0; i < 16; i += 1) {
      const x = (i * 29) % 128;
      const y = (i * 17) % 128;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + 10, y + 6);
      g.stroke();
    }
    seamNoise(g, 128, 128, 0.03, 40);
    return srgbTex(new THREE.CanvasTexture(c));
  })();

  /* ---------- 房间骨架 ---------- */
  const sandMat = new THREE.MeshStandardMaterial({ map: sandTex, roughness: 0.95, metalness: 0 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(6, 5), sandMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.02; // 略低于 GLB 内地面砖，避免 z-fight
  floor.receiveShadow = true;
  scene.add(floor);

  /* 按材质名挂程序化贴图（布料 / 木材 / 金属 / 地砖 / 橡胶 / 墙板） */
  const setMap = (mat, map, rough, opacity) => {
    if (!mat) return;
    if (map) { mat.map = map; }
    if (rough !== undefined) mat.roughness = rough;
    if (opacity !== undefined) { mat.transparent = true; mat.opacity = opacity; }
    mat.needsUpdate = true;
  };

  /* 菠萝屋剖切外壳（Blender room-shell-v3：连续墙面 + 手绘竖纹，仅真实接缝有几何起伏） */
  const shellGroup = new THREE.Group();
  scene.add(shellGroup);
  const ensureUV = (mesh) => {
    const geo = mesh.geometry;
    if (geo.attributes.uv) return;
    const pos = geo.attributes.position;
    if (!pos) return;
    const bmin = new THREE.Vector3(Infinity, Infinity, Infinity);
    const bmax = new THREE.Vector3(-Infinity, -Infinity, -Infinity);
    for (let i = 0; i < pos.count; i += 1) {
      bmin.min(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
      bmax.max(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
    }
    const sx = Math.max(bmax.x - bmin.x, 1e-6);
    const sy = Math.max(bmax.y - bmin.y, 1e-6);
    const uv = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i += 1) {
      uv[i * 2] = (pos.getX(i) - bmin.x) / sx;
      uv[i * 2 + 1] = (pos.getY(i) - bmin.y) / sy;
    }
    geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  };
  const matCache = new Map();
  const toonify = (name, color, map, opts = {}) => {
    let m = matCache.get(name);
    if (!m) {
      m = new THREE.MeshToonMaterial({ color, map, gradientMap: toonGradientTex, ...opts });
      matCache.set(name, m);
    }
    return m;
  };
  const applyRoomMaterials = (root) => {
    root.traverse((n) => {
      if (!n.isMesh) return;
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.name === "sand_floor") { n.visible = false; return; }
      const mat = n.material;
      const name = mat && mat.name;
      if (!name) return;
      let target = null;
      switch (name) {
        case "wall_paint": target = toonify("wall_paint", 0xffffff, wallTex); break;
        case "wall_paint_dark": target = toonify("wall_paint_dark", 0x5f949a); break;
        case "pine_exterior": target = toonify("pine_exterior", 0xffffff, pineappleTex); break;
        case "pine_edge": target = toonify("pine_edge", 0xf0b070, pineappleTex); break;
        case "roof_band": target = toonify("roof_band", 0xffffff, roofTex); break;
        case "leaf_green": target = toonify("leaf_green", 0xffffff, leafTex); break;
        case "leaf_green_dark": target = toonify("leaf_green_dark", 0xd4e8d4, leafTex); break;
        case "floor_warm": target = toonify("floor_warm", 0xffffff, floorTex); break;
        case "chair_red": target = toonify("chair_red", 0xffffff, fabricRedTex); break;
        case "chair_red_dark": target = toonify("chair_red_dark", 0xd8d8d8, fabricRedTex); break;
        case "life_ring": target = toonify("life_ring", 0xffffff, ringRubberTex, { vertexColors: true }); break;
        case "tube_green": target = toonify("tube_green", 0xffffff, fabricGreenTex); break;
        case "tube_green_dark": target = toonify("tube_green_dark", 0xd8e8d8, fabricGreenTex); break;
        case "seat_blue": target = toonify("seat_blue", 0xffffff, fabricBlueTex); break;
        case "seat_blue_dark": target = toonify("seat_blue_dark", 0xd8e0e8, fabricBlueTex); break;
        case "strap_orange": target = toonify("strap_orange", 0xffffff, strapTex); break;
        case "leg_wood": case "table_wood": case "table_leg": case "door_wood": case "door_wood_dark":
          target = toonify("wood", 0xffffff, woodTex); break;
        case "door_metal": target = toonify("door_metal", 0xffffff, metalTex); break;
        case "door_glass":
          target = new THREE.MeshStandardMaterial({ map: skyDay, color: 0xbfe8f8, roughness: 0.2, transparent: true, opacity: 0.88 });
          break;
        case "snail_body": target = toonify("snail_body", 0xffffff, paintTex); break;
        case "snail_shell": case "snail_shell_light":
          target = toonify("snail_shell", 0xffffff, paintTex); break;
        case "shell_phone": target = toonify("shell_phone", 0xffffff, paintTex); break;
        default: return;
      }
      if (target !== mat) n.material = target;
    });
  };
  gltfLoader.load("assets/models/room-shell-v3.glb", (gltf) => {
    const shell = gltf.scene;
    shell.traverse((n) => {
      if (n.isMesh) {
        n.castShadow = true;
        n.receiveShadow = true;
        ensureUV(n);
      }
    });
    applyRoomMaterials(shell);
    shellGroup.add(shell);
  }, undefined, () => {
    // 加载失败兜底：显示旧半球，但保持页面可用
    const domeMat = new THREE.MeshStandardMaterial({ map: pineappleTex, roughness: 0.85, side: THREE.BackSide });
    const dome = new THREE.Mesh(new THREE.SphereGeometry(3.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
    dome.position.set(0, 0.0, -0.4);
    shellGroup.add(dome);
    window.dispatchEvent(new CustomEvent("room3d:asset-fallback", { detail: { id: "room-shell" } }));
  });

  /* 绿色圆地毯：手绘图案 + 边缘厚度（不再是纯平色片） */
  const rugTex = (() => {
    const [c, g] = makeCanvas(512, 512);
    g.fillStyle = "#6db95e";
    g.fillRect(0, 0, 512, 512);
    g.strokeStyle = "#3f7c3a";
    g.lineWidth = 34;
    g.beginPath(); g.arc(256, 256, 226, 0, Math.PI * 2); g.stroke();
    g.strokeStyle = "#2e5f2b";
    g.lineWidth = 8;
    g.beginPath(); g.arc(256, 256, 208, 0, Math.PI * 2); g.stroke();
    g.fillStyle = "#e9c860";
    g.beginPath(); g.arc(256, 256, 74, 0, Math.PI * 2); g.fill();
    g.fillStyle = "#d9a83f";
    g.beginPath(); g.arc(256, 256, 40, 0, Math.PI * 2); g.fill();
    g.strokeStyle = "rgba(46,120,42,0.35)";
    g.lineCap = "round";
    g.lineWidth = 4;
    for (let i = 0; i < 90; i += 1) {
      const a = (i * 0.71) % (Math.PI * 2);
      const r0 = 96 + (i % 7) * 14;
      g.beginPath();
      g.arc(256, 256, r0, a, a + 0.10);
      g.stroke();
    }
    g.strokeStyle = "rgba(230,246,190,0.25)";
    g.lineWidth = 3;
    for (let i = 0; i < 60; i += 1) {
      const a = (i * 1.13) % (Math.PI * 2);
      g.beginPath();
      g.arc(256, 256, 150 + (i % 5) * 16, a, a + 0.14);
      g.stroke();
    }
    g.fillStyle = "rgba(40,90,38,0.25)";
    for (let i = 0; i < 40; i += 1) {
      const a = (i * 2.4) % (Math.PI * 2);
      const r = 110 + (i * 37) % 120;
      g.beginPath();
      g.arc(256 + Math.cos(a) * r, 256 + Math.sin(a) * r, 3 + (i % 3), 0, Math.PI * 2);
      g.fill();
    }
    seamNoise(g, 512, 512, 0.03, 160);
    return srgbTex(new THREE.CanvasTexture(c));
  })();
  const rug = new THREE.Group();
  const rugTop = new THREE.Mesh(new THREE.CircleGeometry(1.4, 56), toon(0xffffff, rugTex));
  rugTop.rotation.x = -Math.PI / 2;
  rugTop.position.y = 0.016;
  rugTop.receiveShadow = true;
  rug.add(rugTop);
  const rugEdge = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.032, 10, 56), toon("#3f7c3a"));
  rugEdge.rotation.x = Math.PI / 2;
  rugEdge.position.y = 0.006;
  rug.add(rugEdge);
  rug.position.set(0.5, 0, -1.3);
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
  contactBlob(-1.15, -1.35, 0.7); // 红椅
  contactBlob(0.05, -1.05, 0.55); // 小圆桌
  contactBlob(1.15, -1.75, 0.9); // 绿沙发
  contactBlob(-1.75, -0.55, 0.4); // 小蜗
  contactBlob(1.8, -1.35, 0.6); // 电视柜
  contactBlob(-2.0, 0.35, 0.45); // Marshall
  contactBlob(2.0, 0.35, 0.55); // 钢琴
  contactBlob(-2.0, -1.15, 0.45); // 植物


  /* ---------- 舷窗（pickable: window） ---------- */
  const windowGroup = new THREE.Group();
  const portholeBlue = toon("#4a6fa5");
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
  windowGroup.position.set(1.15, 1.65, -2.15);
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
  decoPort.position.set(-2.55, 1.7, -0.6);
  scene.add(decoPort);

  /* ---------- 灯串 ---------- */
  const stringGroup = new THREE.Group();
  const stringMat = new THREE.MeshStandardMaterial({
    color: 0x3a7a9a,
    roughness: 0.8,
    emissive: 0x000000,
  });
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.4, 2.62, -0.8),
    new THREE.Vector3(-1.3, 2.32, -1.9),
    new THREE.Vector3(0, 2.52, -2.15),
    new THREE.Vector3(1.3, 2.3, -1.9),
    new THREE.Vector3(2.4, 2.6, -0.8),
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
  stringGlow.position.set(0, 2.35, -1.8);
  scene.add(stringGlow);

  /* ---------- 台灯（装饰） ---------- */
  const lampGroup = new THREE.Group();
  lampGroup.add(cyl(0.09, 0.12, 0.3, std("#3a7a9a", 0.5), { y: 0.15 }));
  lampGroup.add(cyl(0.035, 0.035, 0.52, std("#2f4a5a", 0.4, 0.4), { y: 0.56 }));
  const shadeMat = new THREE.MeshToonMaterial({
    color: 0xffe2b8,
    emissive: 0xffd9a0,
    emissiveIntensity: 0.75,
    gradientMap: toonGradientTex,
  });
  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.16, 20, 1, true), shadeMat);
  shade.position.y = 0.86;
  shade.rotation.x = Math.PI;
  lampGroup.add(shade);
  const lampLight = new THREE.PointLight(0xffd9a0, 0.8, 3.4, 2);
  lampLight.position.set(0, 0.78, 0.08);
  lampGroup.add(lampLight);
  lampGroup.position.set(-2.15, 0, -1.2);
  scene.add(lampGroup);

/* ---------- 拱形木门（菠萝屋入口） ---------- */
/* ---------- 家具（Blender 手工建模 GLB 真模型） ---------- */
const gltfLoader2 = new GLTFLoader();

/* 统一配置：模型路径 / 位置 / 旋转 / 缩放 / 落地校准 */
const FURNITURE = [
  { url: "assets/models/arch-door-v2.glb",     name: "door",  pos: [0, 0, 0],     rotY: 0.0, scale: 1 },
  { url: "assets/models/red-armchair-v4.glb", name: "chair", pos: [-1.15, 0, -1.35], rotY: 0.35, scale: 1 },
  { url: "assets/models/green-couch-v3.glb",  name: "couch", pos: [1.15, 0, -1.75],  rotY: -0.2, scale: 1 },
  { url: "assets/models/round-table-v2.glb",  name: "table", pos: [0.05, 0, -1.05],  rotY: 0.3,  scale: 1 },
  { url: "assets/models/snail-v2.glb",        name: "snail", pos: [-1.75, 0, -0.55],  rotY: 0.7,  scale: 1 },
];
const furnitureGroups = {};
const outlineMeshes = [];
const refreshOutline = () => { outlinePass.selectedObjects = outlineMeshes.slice(); };
let loadedCount = 0;
let failedCount = 0;

FURNITURE.forEach((cfg) => {
  const group = new THREE.Group();
  group.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
  group.rotation.y = cfg.rotY;
  scene.add(group);
  furnitureGroups[cfg.name] = group;

  gltfLoader2.load(cfg.url, (gltf) => {
    const m = gltf.scene;
    m.traverse((n) => {
      if (n.isMesh) {
        n.castShadow = true;
        n.receiveShadow = true;
      }
    });
    applyRoomMaterials(m);
    // 包围盒校准：底部落地（y=0）、整体缩放
    const box3 = new THREE.Box3().setFromObject(m);
    const size = box3.getSize(new THREE.Vector3());
    const yMin = box3.min.y;
    m.scale.setScalar(cfg.scale);
    m.position.y = -yMin * cfg.scale;
    group.add(m);
    m.traverse((x) => { if (x.isMesh) outlineMeshes.push(x); });
    refreshOutline();
    loadedCount += 1;
    window.dispatchEvent(new CustomEvent("room3d:asset-loaded", { detail: { id: cfg.name } }));
  }, undefined, () => {
    failedCount += 1;
    window.dispatchEvent(new CustomEvent("room3d:asset-fallback", { detail: { id: cfg.name } }));
  });
});

/* 加载完成通知（供加载界面收尾） */
window.addEventListener("room3d:asset-loaded", () => {
  if (loadedCount >= FURNITURE.length && failedCount === 0) {
    window.dispatchEvent(new CustomEvent("room3d:assets-ready"));
  }
});

/* ---------- 墙上小相框（蜗牛画） ---------- */
const picFrame = new THREE.Group();
picFrame.add(box(0.34, 0.3, 0.03, toon("#b9763f"), { receive: true }));
picFrame.add(box(0.26, 0.22, 0.02, toon("#e8d8a8"), { z: 0.02, receive: false }));
// 画里的小蜗牛剪影
const snailArt = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), toon("#d9785a"));
snailArt.position.set(0.02, 0, 0.035);
picFrame.add(snailArt);
picFrame.position.set(-0.3, 1.75, -2.17);
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
hornGroup.position.set(0.35, 1.55, -2.17);
scene.add(hornGroup);

/* ---------- 电视柜 + 显示器（电视） ---------- */
const tvStand = new THREE.Group();
tvStand.add(box(1.1, 0.4, 0.4, toon("#b9763f"), { y: 0.2 }));
tvStand.position.set(1.8, 0, -1.35);
scene.add(tvStand);
const monitorGroup = new THREE.Group();
monitorGroup.add(box(0.18, 0.22, 0.18, toon("#3a7a9a"), { y: 0.11 }));
monitorGroup.add(box(0.1, 0.14, 0.08, toon("#2f4a5a"), { y: 0.28 }));
const monFrame = box(0.95, 0.56, 0.05, toon("#2f3a44"), { y: 0.58, z: 0 });
monitorGroup.add(monFrame);
const monScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.87, 0.48), screenMat);
monScreen.position.set(0, 0.58, 0.028);
monitorGroup.add(monScreen);
monitorGroup.position.set(1.8, 0.42, -1.35);
monitorGroup.rotation.y = -0.25;
pickable(monitorGroup, "monitor");
scene.add(monitorGroup);

/* ---------- MacBook（小圆桌上） ---------- */
const mbGroup = new THREE.Group();
const mbBaseMat = toon("#5a7a8a");
mbGroup.add(box(0.62, 0.025, 0.42, mbBaseMat, { y: 0.012 }));
const mbLid = box(0.62, 0.38, 0.022, toon("#3a5a6a"), { y: 0.2, z: -0.18, rx: 0.5 });
mbGroup.add(mbLid);
const mbScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.32), screenMat);
mbScreen.position.set(0, 0.195, -0.185);
mbScreen.rotation.x = 0.5;
mbGroup.add(mbScreen);
mbGroup.position.set(0.28, 0.64, -0.95);
mbGroup.rotation.y = 0.1;
pickable(mbGroup, "macbook");
scene.add(mbGroup);

/* ---------- iPad（小画架上） ---------- */
const ipadGroup = new THREE.Group();
ipadGroup.add(box(0.5, 0.66, 0.025, toon("#4a6a7a"), { z: -0.012 }));
const ipadScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.58), screenMat);
ipadScreen.position.z = 0.018;
ipadGroup.add(ipadScreen);
// 小画架
ipadGroup.add(box(0.04, 0.5, 0.04, toon("#b9763f"), { x: -0.22, y: -0.3, z: -0.05 }));
ipadGroup.position.set(-2.5, 1.15, -0.55);
ipadGroup.rotation.x = -0.12;
ipadGroup.rotation.y = Math.PI / 2;
pickable(ipadGroup, "ipad");
scene.add(ipadGroup);

/* ---------- 手机（小支架上） ---------- */
const phoneGroup = new THREE.Group();
phoneGroup.add(box(0.22, 0.4, 0.02, toon("#3a5a6a"), { z: -0.01 }));
const phoneScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.19, 0.34), screenMat);
phoneScreen.position.z = 0.015;
phoneGroup.add(phoneScreen);
phoneGroup.add(box(0.16, 0.04, 0.12, toon("#b9763f"), { y: -0.22, z: -0.02 }));
phoneGroup.position.set(2.0, 1.26, 0.5);
phoneGroup.rotation.y = -0.2;
pickable(phoneGroup, "phone");
scene.add(phoneGroup);

/* ---------- Marshall（左角） ---------- */
const marshallGroup = new THREE.Group();
const ampBodyMat = toon("#3a4a55");
marshallGroup.add(box(0.5, 0.62, 0.32, ampBodyMat, { y: 0.36 }));
const grillMat = toon("#5a7a8a");
marshallGroup.add(box(0.42, 0.42, 0.02, grillMat, { y: 0.4, z: 0.16 }));
const knobMat = new THREE.MeshStandardMaterial({ color: 0xe9c860, roughness: 0.45, metalness: 0.3 });
[-0.14, 0, 0.14].forEach((x) => {
  const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.025, 14), knobMat);
  knob.rotation.x = Math.PI / 2;
  knob.position.set(x, 0.1, 0.16);
  marshallGroup.add(knob);
});
marshallGroup.position.set(-2.0, 0, 0.35);
marshallGroup.rotation.y = 0.4;
pickable(marshallGroup, "marshall");
scene.add(marshallGroup);

/* ---------- 钢琴（右角） ---------- */
const pianoGroup = new THREE.Group();
const walnut = toon("#9c6f45");
const walnutDeep = toon("#7a4f2c");
pianoGroup.add(box(0.6, 1.0, 0.5, walnut, { y: 0.55, z: 0.05 }));
pianoGroup.add(box(0.03, 1.0, 0.5, walnutDeep, { x: 0.29, y: 0.55, z: 0.05 }));
pianoGroup.add(box(0.64, 0.07, 0.54, walnutDeep, { y: 1.06, z: 0.05 }));
const keybed = box(0.56, 0.09, 0.34, toon("#f6efe2"), { y: 0.95, z: 0.28 });
pianoGroup.add(keybed);
[-0.14, -0.07, 0, 0.07, 0.14].forEach((z) => {
  pianoGroup.add(box(0.5, 0.06, 0.045, toon("#2f3a44"), { y: 1.01, z: 0.28 + z }));
});
pianoGroup.position.set(2.0, 0, 0.35);
pianoGroup.rotation.y = -0.4;
pickable(pianoGroup, "piano");
scene.add(pianoGroup);

/* ---------- 开关（门边） ---------- */
const switchGroup = new THREE.Group();
switchGroup.add(box(0.16, 0.22, 0.02, toon("#cfe8f0"), { z: -0.01, cast: false }));
switchGroup.add(box(0.09, 0.12, 0.015, toon("#2f4a5a"), { y: 0.02, z: 0.005, cast: false }));
switchGroup.position.set(-0.5, 1.25, -2.16);
pickable(switchGroup, "lightswitch");
scene.add(switchGroup);

/* ---------- 垃圾桶（右前角） ---------- */
const trashGroup = new THREE.Group();
trashGroup.add(cyl(0.22, 0.18, 0.5, toon("#6fa8c8", metalTex), { y: 0.25 }));
trashGroup.add(cyl(0.17, 0.17, 0.05, toon("#5a92b2", metalTex), { y: 0.52 }));
trashGroup.position.set(1.9, 0, 1.0);
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
plantGroup.position.set(-2.0, 0, -1.15);
scene.add(plantGroup);

  /* ---------- 上升气泡 ---------- */
  const bubbleCount = 10;
  const bubbleGeo = new THREE.SphereGeometry(0.02, 8, 6);
  const bubbleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.16 });
  const bubbles = [];
  const bubbleGroup = new THREE.Group();
  for (let i = 0; i < bubbleCount; i += 1) {
    const b = new THREE.Mesh(bubbleGeo, bubbleMat);
    b.position.set(
      (Math.random() - 0.5) * 3.4,
      1.3 + Math.random() * 1.9,
      -2.2 + Math.random() * 1.4,
    );
    const s = 0.3 + Math.random() * 0.6;
    b.scale.setScalar(s);
    b.userData.speed = 0.2 + Math.random() * 0.3;
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
          camGoal.radius = Math.min(Math.max(cam.radius * (pinchDist / d), 2.2), 6.2);
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
      camGoal.radius = Math.min(Math.max(cam.radius * factor, 2.2), 6.2);
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
    monitor: -0.55,
    macbook: 0.25,
    ipad: 0.95,
    phone: -0.95,
    marshall: 1.05,
    piano: -1.0,
    window: -0.35,
    lightswitch: 0.2,
    trashcan: -1.15,
  };
  const FOCUS_RADIUS = {
    overview: 5.4,
    monitor: 2.8,
    macbook: 2.6,
    ipad: 2.9,
    phone: 2.7,
    marshall: 2.9,
    piano: 2.9,
    window: 2.8,
    lightswitch: 2.5,
    trashcan: 2.8,
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
    camGoal.radius = 5.4;
  });

  /* ---------- 氛围联动 ---------- */
  const applyAmbient = () => {
    const tone = root.dataset.sceneTone || "day";
    const weather = root.dataset.weather || "sunny";
    const lights = root.dataset.lights || "on";
    const night = tone === "night";

    winGlass.material.map = night ? skyNight : weather === "cloudy" ? skyCloudy : skyDay;
    winGlass.material.needsUpdate = true;

    hemi.intensity = night ? 0.3 : 0.45;
    hemi.color.set(night ? 0x7a9ad0 : 0xd6f0f8);
    key.intensity = night ? 0.45 : 1.35;
    key.color.set(night ? 0x9db8e8 : 0xfff3e2);
    fill.intensity = night ? 0.22 : 0.5;
    lampLight.intensity = night ? 1.6 : 0.9;

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
    composer.setSize(w, h);
    camera.aspect = w / h;
    const aspect = w / h;
    let fov, radius, pitch;
    if (aspect < 0.75) { fov = 65; radius = 6.4; pitch = 0.5; }
    else if (aspect < 1.2) { fov = 50; radius = 5.8; pitch = 0.44; }
    else { fov = 42; radius = 5.4; pitch = 0.42; }
    camera.fov = fov;
    camera.updateProjectionMatrix();
    if (!busy) { cam.radius = camGoal.radius = radius; cam.pitch = camGoal.pitch = pitch; }
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
          b.position.x = (Math.random() - 0.5) * 4.4;
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

  // 描边对象：关键家具与设备（墙面/地面不进描边，避免整面轮廓线）
  [tvStand, monitorGroup, mbGroup, ipadGroup, phoneGroup, marshallGroup, pianoGroup, windowGroup, lampGroup, trashGroup, plantGroup, switchGroup, picFrame, hornGroup].forEach((g) => {
    g.traverse((n) => { if (n.isMesh) outlineMeshes.push(n); });
  });
  refreshOutline();

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
