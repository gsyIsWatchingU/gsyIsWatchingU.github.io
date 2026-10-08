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
  scene.fog = new THREE.Fog(0x9fd8ea, 8.5, 14.0);

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
    scene.environmentIntensity = 0.16;
  }

  const camera = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, 0.1, 60);
  const TARGET = new THREE.Vector3(0, 1.3, -0.3);
  const cam = { yaw: 0, pitch: 0.5, radius: 5.4 };
  const camGoal = { yaw: 0, pitch: 0.5, radius: 5.4 };
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
  ssaoPass.kernelRadius = 0.12;
  ssaoPass.minDistance = 0.005;
  ssaoPass.maxDistance = 0.45;
  composer.addPass(ssaoPass);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(host.clientWidth, host.clientHeight), 0.08, 0.35, 0.88);
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
  const gltfLoader = new GLTFLoader();
  // 水下漫射：天青蓝 / 沙地黄
  const hemi = new THREE.HemisphereLight(0xcfeef8, 0xd8b878, 0.45);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xf2fbff, 1.6);
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

  const fill = new THREE.PointLight(0x9fe0f0, 0.55, 9, 2);
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

  /* 蓝绿竖纹板墙（21 条竖条纹 + 板缝暗线 + 木纹水平颗粒） */
  const stripeTex = (() => {
    const [c, g] = makeCanvas(512, 256);
    const cols = ["#4aa7b0", "#3d94a2"];
    const w = 512 / 21;
    for (let i = 0; i < 21; i += 1) {
      g.fillStyle = cols[i % 2];
      g.fillRect(i * w, 0, w + 1, 256);
    }
    // 板缝暗线（条纹边界）
    for (let i = 0; i <= 21; i += 1) {
      g.fillStyle = "rgba(22,74,84,0.5)";
      g.fillRect(i * w - 1.5, 0, 3, 256);
      g.fillStyle = "rgba(255,255,245,0.22)";
      g.fillRect(i * w + 1.5, 0, 2, 256);
    }
    // 水平木纹颗粒（每条纹内）
    for (let i = 0; i < 21; i += 1) {
      const x0 = i * w;
      for (let y = 6; y < 256; y += 22) {
        g.strokeStyle = "rgba(28,88,96,0.22)";
        g.lineWidth = 1.4;
        g.beginPath();
        g.moveTo(x0 + 2, y);
        g.bezierCurveTo(x0 + w * 0.33, y - 3, x0 + w * 0.66, y + 3, x0 + w - 2, y);
        g.stroke();
      }
    }
    // 每根板条明度微差
    for (let i = 0; i < 21; i += 1) {
      const x0 = i * w;
      const a = ((i * 7) % 5) * 0.018 - 0.036;
      g.fillStyle = `rgba(${a > 0 ? "255,255,255" : "0,40,50"},${Math.abs(a)})`;
      g.fillRect(x0 + 1, 0, w - 2, 256);
    }
    seamNoise(g, 512, 256, 0.05, 260);
    const t = srgbTex(new THREE.CanvasTexture(c));
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    return t;
  })();

  /* 浅色方形地砖（5×4 格 + 缝线 + 色差 + 斑点） */
  const tileTex = (() => {
    const [c, g] = makeCanvas(512, 512);
    g.fillStyle = "#e9e0cc";
    g.fillRect(0, 0, 512, 512);
    const tw = 512 / 5, th = 512 / 4;
    for (let ty = 0; ty < 4; ty += 1) {
      for (let tx = 0; tx < 5; tx += 1) {
        const v = ((tx * 3 + ty * 5) % 7) * 0.014 - 0.042;
        const warm = ((tx + ty) % 3) === 0;
        g.fillStyle = warm
          ? `rgba(240,226,196,${0.5 + v})`
          : `rgba(226,216,190,${0.5 + v})`;
        g.fillRect(tx * tw + 2, ty * th + 2, tw - 4, th - 4);
        // 每格内轻微明暗梯度（大板感）
        const grad = g.createLinearGradient(tx * tw + 2, ty * th + 2, tx * tw + tw - 4, ty * th + th - 4);
        grad.addColorStop(0, "rgba(255,255,245,0.10)");
        grad.addColorStop(1, "rgba(120,105,80,0.12)");
        g.fillStyle = grad;
        g.fillRect(tx * tw + 2, ty * th + 2, tw - 4, th - 4);
        // 斑点
        for (let i = 0; i < 8; i += 1) {
          g.fillStyle = i % 2 ? "rgba(160,140,110,0.18)" : "rgba(255,255,250,0.25)";
          g.fillRect(tx * tw + 4 + ((i * 37) % (tw - 10)), ty * th + 4 + ((i * 53) % (th - 10)), 3, 3);
        }
      }
    }
    // 缝线
    g.strokeStyle = "#b0a286";
    g.lineWidth = 4;
    for (let i = 0; i <= 5; i += 1) {
      g.beginPath(); g.moveTo(i * tw, 0); g.lineTo(i * tw, 512); g.stroke();
    }
    for (let i = 0; i <= 4; i += 1) {
      g.beginPath(); g.moveTo(0, i * th); g.lineTo(512, i * th); g.stroke();
    }
    // 缝内阴影
    g.strokeStyle = "rgba(90,74,54,0.28)";
    g.lineWidth = 1;
    for (let i = 0; i <= 5; i += 1) {
      g.beginPath(); g.moveTo(i * tw + 2, 0); g.lineTo(i * tw + 2, 512); g.stroke();
    }
    return srgbTex(new THREE.CanvasTexture(c));
  })();

  /* 布料编织纹理（红椅 / 蓝坐垫 / 绿管通用） */
  const knitTex = (base, dark, light) => {
    const [c, g] = makeCanvas(256, 256);
    g.fillStyle = base;
    g.fillRect(0, 0, 256, 256);
    g.lineWidth = 2;
    for (let y = -256; y < 512; y += 7) {
      g.strokeStyle = dark;
      g.beginPath(); g.moveTo(y, 0); g.lineTo(y + 256, 256); g.stroke();
      g.strokeStyle = light;
      g.beginPath(); g.moveTo(y + 3, 0); g.lineTo(y + 259, 256); g.stroke();
      g.strokeStyle = dark;
      g.beginPath(); g.moveTo(-y, 256); g.lineTo(-y + 256, 0); g.stroke();
      g.strokeStyle = light;
      g.beginPath(); g.moveTo(-y + 3, 256); g.lineTo(-y + 259, 0); g.stroke();
    }
    seamNoise(g, 256, 256, 0.05, 120);
    const t = srgbTex(new THREE.CanvasTexture(c));
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    return t;
  };
  const fabricRedTex = knitTex("#c94a33", "rgba(138,46,30,0.30)", "rgba(232,120,86,0.22)");
  const fabricGreenTex = knitTex("#4cbc5f", "rgba(36,140,64,0.28)", "rgba(140,232,140,0.18)");
  const fabricBlueTex = knitTex("#4a8ccb", "rgba(38,106,166,0.28)", "rgba(150,196,240,0.20)");

  /* 救生圈橡胶（白，与顶点色相乘） */
  const ringRubberTex = (() => {
    const [c, g] = makeCanvas(256, 256);
    g.fillStyle = "#f4f4f0";
    g.fillRect(0, 0, 256, 256);
    seamNoise(g, 256, 256, 0.04, 200);
    g.strokeStyle = "rgba(180,180,175,0.18)";
    g.lineWidth = 1.5;
    for (let i = 0; i < 12; i += 1) {
      g.beginPath();
      g.moveTo((i * 31) % 256, 0);
      g.lineTo(((i * 31) + 120) % 256, 256);
      g.stroke();
    }
    return srgbTex(new THREE.CanvasTexture(c));
  })();

  /* 橙色绑带橡胶（横向肋纹） */
  const strapTex = (() => {
    const [c, g] = makeCanvas(256, 256);
    g.fillStyle = "#e88a2e";
    g.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 10) {
      g.fillStyle = "rgba(190,100,20,0.30)";
      g.fillRect(0, y, 256, 2);
      g.fillStyle = "rgba(255,200,120,0.18)";
      g.fillRect(0, y + 3, 256, 1.5);
    }
    seamNoise(g, 256, 256, 0.05, 100);
    return srgbTex(new THREE.CanvasTexture(c));
  })();

  /* 木纹（桌 / 腿 / 门；v 沿高度） */
  const woodTex = (() => {
    const [c, g] = makeCanvas(256, 512);
    g.fillStyle = "#a06a3c";
    g.fillRect(0, 0, 256, 512);
    for (let i = 0; i < 34; i += 1) {
      const y = (i * 15 + ((i * 37) % 7)) % 512;
      g.strokeStyle = i % 3 === 0 ? "rgba(122,74,38,0.55)" : "rgba(138,86,48,0.35)";
      g.lineWidth = 1 + (i % 3);
      g.beginPath();
      g.moveTo(0, y);
      g.bezierCurveTo(64, y - 3, 192, y + 4, 256, y);
      g.stroke();
    }
    // 节疤
    [[70, 140], [210, 330], [150, 60]].forEach(([x, y]) => {
      g.strokeStyle = "rgba(110,64,30,0.6)";
      g.lineWidth = 2;
      g.beginPath();
      g.ellipse(x, y, 10, 6, 0.3, 0, Math.PI * 2);
      g.stroke();
      g.beginPath();
      g.ellipse(x, y, 5, 3, 0.3, 0, Math.PI * 2);
      g.stroke();
    });
    seamNoise(g, 256, 512, 0.04, 180);
    const t = srgbTex(new THREE.CanvasTexture(c));
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    return t;
  })();

  /* 板条侧边深色木纹 */
  const plankEdgeTex = (() => {
    const [c, g] = makeCanvas(128, 128);
    g.fillStyle = "#3a6a74";
    g.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 10; i += 1) {
      g.fillStyle = i % 2 ? "rgba(24,60,66,0.35)" : "rgba(90,150,160,0.25)";
      g.fillRect((i * 17) % 128, 0, 4, 128);
    }
    return srgbTex(new THREE.CanvasTexture(c));
  })();

  /* 屋顶橙色菠萝纹 */
  const roofTex = (() => {
    const [c, g] = makeCanvas(256, 256);
    g.fillStyle = "#e88a2e";
    g.fillRect(0, 0, 256, 256);
    g.strokeStyle = "rgba(150,72,16,0.45)";
    g.lineWidth = 2;
    for (let i = -256; i < 512; i += 34) {
      g.beginPath(); g.moveTo(i, 0); g.lineTo(i + 256, 256); g.stroke();
      g.beginPath(); g.moveTo(i + 256, 0); g.lineTo(i, 256); g.stroke();
    }
    for (let y = 14; y < 256; y += 34) {
      for (let x = 14; x < 256; x += 34) {
        g.fillStyle = "rgba(120,58,12,0.4)";
        g.beginPath();
        g.ellipse(x, y, 3, 5, 0, 0, Math.PI * 2);
        g.fill();
      }
    }
    const t = srgbTex(new THREE.CanvasTexture(c));
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    return t;
  })();

  /* 叶片纹理 */
  const leafTex = (() => {
    const [c, g] = makeCanvas(128, 128);
    g.fillStyle = "#3f9a5a";
    g.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 16; i += 1) {
      g.fillStyle = i % 2 ? "rgba(30,110,60,0.25)" : "rgba(140,220,150,0.18)";
      g.fillRect((i * 19) % 128, (i * 43) % 128, 3, 4);
    }
    return srgbTex(new THREE.CanvasTexture(c));
  })();

  /* 金属（门箍 / 铆钉） */
  const metalTex = (() => {
    const [c, g] = makeCanvas(128, 128);
    g.fillStyle = "#7fa8c8";
    g.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 24; i += 1) {
      g.fillStyle = i % 2 ? "rgba(70,110,150,0.35)" : "rgba(220,240,255,0.35)";
      g.fillRect((i * 29) % 128, 0, 3, 128);
    }
    seamNoise(g, 128, 128, 0.04, 60);
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
  const remapWallUV = (mesh) => {
    const pos = mesh.geometry.attributes.position;
    const uv = mesh.geometry.attributes.uv;
    if (!pos || !uv) return;
    const bx = new THREE.Box3().setFromObject(mesh);
    const sx = bx.max.x - bx.min.x;
    const sz = bx.max.z - bx.min.z;
    for (let i = 0; i < pos.count; i += 1) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      const u = sx >= sz ? (x + 2.6) / 5.2 : (z + 2.3) / 4.0;
      const v = Math.min(Math.max(y / 2.8, 0), 1);
      uv.setXY(i, u, v);
    }
    uv.needsUpdate = true;
  };
  const remapFloorUV = (mesh) => {
    const pos = mesh.geometry.attributes.position;
    const uv = mesh.geometry.attributes.uv;
    if (!pos || !uv) return;
    for (let i = 0; i < pos.count; i += 1) {
      uv.setXY(i, (pos.getX(i) + 2.6) / 5.2, (pos.getZ(i) + 2.3) / 4.0);
    }
    uv.needsUpdate = true;
  };

  /* 菠萝屋剖切外壳（Blender 建模 room-shell-v2：蓝绿竖纹板墙 / 浅色方砖 / 橙皮 / 叶冠，前墙开放朝向 +Z） */
  const shellGroup = new THREE.Group();
  scene.add(shellGroup);
  const materialSlot = (mat, mesh, map, rough, opacity) => {
    if (mesh.isMesh && mesh.material && mesh.material.name === mat) {
      setMap(mesh.material, map, rough, opacity);
    }
  };
  const applyRoomMaterials = (root) => {
    const done = new Set();
    root.traverse((n) => {
      if (!n.isMesh) return;
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.name === "sand_floor") n.visible = false;
      const mat = n.material;
      if (!mat || done.has(mat)) return;
      done.add(mat);
      switch (mat.name) {
        case "wall_stripe": setMap(mat, stripeTex, 0.82); break;
        case "floor_tile": setMap(mat, tileTex, 0.9); remapFloorUV(n); break;
        case "wall_plank_edge": setMap(mat, plankEdgeTex, 0.88); break;
        case "pine_exterior": case "pine_edge": setMap(mat, pineappleTex, 0.8); break;
        case "roof_band": setMap(mat, roofTex, 0.85); break;
        case "leaf_green": case "leaf_green_dark": setMap(mat, leafTex, 0.8); break;
        case "chair_red": case "chair_red_dark": setMap(mat, fabricRedTex, 0.9); break;
        case "life_ring": setMap(mat, ringRubberTex, 0.55); break;
        case "tube_green": case "tube_green_dark": setMap(mat, fabricGreenTex, 0.6); break;
        case "seat_blue": case "seat_blue_dark": setMap(mat, fabricBlueTex, 0.88); break;
        case "strap_orange": setMap(mat, strapTex, 0.55); break;
        case "leg_wood": case "table_wood": case "table_leg": case "door_wood": case "door_wood_dark":
          setMap(mat, woodTex, 0.72); break;
        case "door_metal": setMap(mat, metalTex, 0.42); break;
        case "door_glass":
          setMap(mat, skyDay, 0.5, 0.88);
          mat.color.set(0xbfe8f8);
          break;
        case "snail_body": mat.roughness = 0.8; mat.needsUpdate = true; break;
        case "snail_shell": case "snail_shell_light": mat.roughness = 0.7; mat.needsUpdate = true; break;
        case "shell_phone": mat.roughness = 0.42; mat.needsUpdate = true; break;
        default: break;
      }
    });
  };
  gltfLoader.load("assets/models/room-shell-v2.glb", (gltf) => {
    const shell = gltf.scene;
    shell.traverse((n) => {
      if (n.isMesh) {
        n.castShadow = true;
        n.receiveShadow = true;
        if (n.material && n.material.name === "wall_stripe") remapWallUV(n);
        if (n.material && n.material.name === "floor_tile") remapFloorUV(n);
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

  // 绿色圆地毯（菠萝纹圆心）
  const rug = new THREE.Mesh(new THREE.CircleGeometry(1.4, 48), toon("#57a848"));
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0.5, 0.012, -1.3);
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
  contactBlob(-1.15, -1.35, 0.7); // 红椅
  contactBlob(0.05, -1.05, 0.55); // 小圆桌
  contactBlob(1.15, -1.75, 0.9); // 绿沙发
  contactBlob(-1.75, -0.55, 0.4); // 小蜗
  contactBlob(1.8, -1.35, 0.6); // 电视柜
  contactBlob(-2.0, 0.35, 0.45); // Marshall
  contactBlob(2.0, 0.35, 0.55); // 钢琴
  contactBlob(-2.0, -1.15, 0.45); // 植物
  const rugCenter = new THREE.Mesh(new THREE.CircleGeometry(0.5, 32), toon("#e9c860"));
  rugCenter.rotation.x = -Math.PI / 2;
  rugCenter.position.set(0.5, 0.014, -1.3);
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
  lampGroup.position.set(-1.15, 0, -1.6);
  scene.add(lampGroup);

/* ---------- 拱形木门（菠萝屋入口） ---------- */
/* ---------- 家具（Blender 手工建模 GLB 真模型） ---------- */
const gltfLoader2 = new GLTFLoader();

/* 统一配置：模型路径 / 位置 / 旋转 / 缩放 / 落地校准 */
const FURNITURE = [
  { url: "assets/models/arch-door-v2.glb",     name: "door",  pos: [0, 0, 0],     rotY: 0.0, scale: 1 },
  { url: "assets/models/red-armchair-v3.glb", name: "chair", pos: [-1.15, 0, -1.35], rotY: 0.35, scale: 1 },
  { url: "assets/models/green-couch-v2.glb",  name: "couch", pos: [1.15, 0, -1.75],  rotY: -0.2, scale: 1 },
  { url: "assets/models/round-table.glb",     name: "table", pos: [0.05, 0, -1.05],  rotY: 0.3,  scale: 1 },
  { url: "assets/models/snail.glb",           name: "snail", pos: [-1.75, 0, -0.55],  rotY: 0.7,  scale: 1 },
];
const furnitureGroups = {};
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
picFrame.add(box(0.34, 0.3, 0.03, std("#b9763f", 0.6), { receive: true }));
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
tvStand.add(box(1.1, 0.4, 0.4, std("#b9763f", 0.6), { y: 0.2 }));
tvStand.position.set(1.8, 0, -1.35);
scene.add(tvStand);
const monitorGroup = new THREE.Group();
monitorGroup.add(box(0.18, 0.22, 0.18, std("#3a7a9a", 0.55), { y: 0.11 }));
monitorGroup.add(box(0.1, 0.14, 0.08, std("#2f4a5a", 0.45), { y: 0.28 }));
const monFrame = box(0.95, 0.56, 0.05, std("#2f3a44", 0.4, 0.1), { y: 0.58, z: 0 });
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
const mbBaseMat = std("#5a7a8a", 0.45, 0.25);
mbGroup.add(box(0.62, 0.025, 0.42, mbBaseMat, { y: 0.012 }));
const mbLid = box(0.62, 0.38, 0.022, std("#3a5a6a", 0.4, 0.1), { y: 0.2, z: -0.18, rx: 0.5 });
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
ipadGroup.add(box(0.5, 0.66, 0.025, std("#4a6a7a", 0.45, 0.15), { z: -0.012 }));
const ipadScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.58), screenMat);
ipadScreen.position.z = 0.018;
ipadGroup.add(ipadScreen);
// 小画架
ipadGroup.add(box(0.04, 0.5, 0.04, std("#b9763f", 0.6), { x: -0.22, y: -0.3, z: -0.05 }));
ipadGroup.position.set(-2.5, 1.15, -0.55);
ipadGroup.rotation.x = -0.12;
ipadGroup.rotation.y = Math.PI / 2;
pickable(ipadGroup, "ipad");
scene.add(ipadGroup);

/* ---------- 手机（小支架上） ---------- */
const phoneGroup = new THREE.Group();
phoneGroup.add(box(0.22, 0.4, 0.02, std("#3a5a6a", 0.45, 0.15), { z: -0.01 }));
const phoneScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.19, 0.34), screenMat);
phoneScreen.position.z = 0.015;
phoneGroup.add(phoneScreen);
phoneGroup.add(box(0.16, 0.04, 0.12, std("#b9763f", 0.6), { y: -0.22, z: -0.02 }));
phoneGroup.position.set(2.0, 1.26, 0.5);
phoneGroup.rotation.y = -0.2;
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
marshallGroup.position.set(-2.0, 0, 0.35);
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
pianoGroup.position.set(2.0, 0, 0.35);
pianoGroup.rotation.y = -0.4;
pickable(pianoGroup, "piano");
scene.add(pianoGroup);

/* ---------- 开关（门边） ---------- */
const switchGroup = new THREE.Group();
switchGroup.add(box(0.16, 0.22, 0.02, std("#cfe8f0", 0.7), { z: -0.01, cast: false }));
switchGroup.add(box(0.09, 0.12, 0.015, std("#2f4a5a", 0.4), { y: 0.02, z: 0.005, cast: false }));
switchGroup.position.set(-0.5, 1.25, -2.16);
pickable(switchGroup, "lightswitch");
scene.add(switchGroup);

/* ---------- 垃圾桶（右前角） ---------- */
const trashGroup = new THREE.Group();
trashGroup.add(cyl(0.22, 0.18, 0.5, std("#6fa8c8", 0.55), { y: 0.25 }));
trashGroup.add(cyl(0.17, 0.17, 0.05, std("#5a92b2", 0.55), { y: 0.52 }));
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
  const bubbleCount = 36;
  const bubbleGeo = new THREE.SphereGeometry(0.025, 8, 6);
  const bubbleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 });
  const bubbles = [];
  const bubbleGroup = new THREE.Group();
  for (let i = 0; i < bubbleCount; i += 1) {
    const b = new THREE.Mesh(bubbleGeo, bubbleMat);
    b.position.set(
      (Math.random() - 0.5) * 4.4,
      Math.random() * 3.2,
      -2.1 + Math.random() * 2.8,
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
    hemi.color.set(night ? 0x7a9ad0 : 0xcfeef8);
    key.intensity = night ? 0.5 : 1.6;
    key.color.set(night ? 0x9db8e8 : 0xf2fbff);
    fill.intensity = night ? 0.25 : 0.55;
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
    if (aspect < 0.75) { fov = 65; radius = 6.4; pitch = 0.58; }
    else if (aspect < 1.2) { fov = 50; radius = 5.8; pitch = 0.52; }
    else { fov = 42; radius = 5.4; pitch = 0.5; }
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
