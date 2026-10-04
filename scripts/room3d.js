import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

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
    window: "窗户 · 关于我",
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
  renderer.toneMappingExposure = 1.08;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf5efe3, 8.2, 13.5);

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
    scene.environmentIntensity = 0.5;
  }

  const camera = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, 0.1, 60);
  const TARGET = new THREE.Vector3(0, 1.0, 0);
  const cam = { yaw: 0, pitch: 0.19, radius: 4.9 };
  const camGoal = { yaw: 0, pitch: 0.19, radius: 4.9 };
  let busy = false;

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

  const box = (w, h, d, material, opts = {}) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
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

  const skyDay = (() => {
    const [c, g] = makeCanvas(512, 256);
    const grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "#bcd9ef");
    grad.addColorStop(0.7, "#dcebf4");
    grad.addColorStop(1, "#eef6f8");
    g.fillStyle = grad;
    g.fillRect(0, 0, 512, 256);
    g.fillStyle = "#ffd97a";
    g.shadowColor = "rgba(255, 214, 110, 0.9)";
    g.shadowBlur = 42;
    g.beginPath();
    g.arc(404, 66, 34, 0, Math.PI * 2);
    g.fill();
    g.shadowBlur = 0;
    g.fillStyle = "rgba(255, 255, 255, 0.92)";
    [
      [70, 90, 74, 20],
      [150, 130, 60, 16],
      [240, 80, 88, 22],
      [330, 150, 70, 17],
    ].forEach(([x, y, w, h]) => {
      g.beginPath();
      g.ellipse(x, y, w / 2, h / 2, 0, 0, Math.PI * 2);
      g.fill();
    });
    return new THREE.CanvasTexture(c);
  })();

  const skyNight = (() => {
    const [c, g] = makeCanvas(512, 256);
    const grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "#203356");
    grad.addColorStop(0.7, "#16233f");
    grad.addColorStop(1, "#1c2c4a");
    g.fillStyle = grad;
    g.fillRect(0, 0, 512, 256);
    g.fillStyle = "#f4f0df";
    g.shadowColor = "rgba(244, 240, 223, 0.85)";
    g.shadowBlur = 36;
    g.beginPath();
    g.arc(408, 70, 26, 0, Math.PI * 2);
    g.fill();
    g.shadowBlur = 0;
    g.fillStyle = "#fff6d8";
    [[60, 40, 3], [130, 80, 2], [210, 46, 3], [300, 90, 2], [360, 150, 2], [110, 170, 2], [250, 190, 2]].forEach(([x, y, r]) => {
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
    });
    return new THREE.CanvasTexture(c);
  })();

  const skyCloudy = (() => {
    const [c, g] = makeCanvas(512, 256);
    const grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "#c9d6e2");
    grad.addColorStop(0.7, "#dde6ec");
    grad.addColorStop(1, "#ecf1f2");
    g.fillStyle = grad;
    g.fillRect(0, 0, 512, 256);
    g.fillStyle = "rgba(255, 250, 240, 0.95)";
    [
      [60, 70, 110, 34],
      [170, 110, 130, 40],
      [300, 60, 120, 36],
      [380, 130, 100, 30],
      [220, 170, 150, 42],
    ].forEach(([x, y, w, h]) => {
      g.beginPath();
      g.ellipse(x, y, w / 2, h / 2, 0, 0, Math.PI * 2);
      g.fill();
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
  const hemi = new THREE.HemisphereLight(0xfff6e8, 0xc9a274, 0.6);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xfff1dc, 1.6);
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

  const fill = new THREE.PointLight(0xffdfb8, 0.55, 9, 2);
  fill.position.set(2.6, 2.3, 1.6);
  scene.add(fill);

  /* ---------- 地板木纹 ---------- */
  const woodFloorTex = (() => {
    const [c, g] = makeCanvas(512, 512);
    g.fillStyle = "#c9a274";
    g.fillRect(0, 0, 512, 512);
    const plankH = 64;
    for (let row = 0; row < 8; row += 1) {
      const y = row * plankH;
      g.fillStyle = row % 2 ? "rgba(150, 108, 66, 0.14)" : "rgba(255, 232, 200, 0.08)";
      g.fillRect(0, y, 512, plankH);
      g.strokeStyle = "rgba(122, 84, 50, 0.28)";
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(0, y + 1);
      g.lineTo(512, y + 1);
      g.stroke();
      const off = row % 2 ? 128 : 0;
      for (let seam = off; seam < 512; seam += 128) {
        g.beginPath();
        g.moveTo(seam, y);
        g.lineTo(seam, y + plankH);
        g.stroke();
      }
    }
    g.strokeStyle = "rgba(122, 84, 50, 0.1)";
    for (let i = 0; i < 46; i += 1) {
      g.beginPath();
      g.moveTo((i * 37) % 512, 0);
      g.lineTo(((i * 37) % 512) + 30, 512);
      g.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return tex;
  })();

  /* ---------- 房间骨架 ---------- */
  const woodFloorMat = new THREE.MeshStandardMaterial({ map: woodFloorTex, roughness: 0.55, metalness: 0.02 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(6, 5), woodFloorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const wallBack = new THREE.Mesh(new THREE.PlaneGeometry(6, 2.8), std("#f1e5d2", 0.92));
  wallBack.position.set(0, 1.4, -2.5);
  wallBack.receiveShadow = true;
  scene.add(wallBack);

  const wallLeft = new THREE.Mesh(new THREE.PlaneGeometry(5, 2.8), std("#eadcc5", 0.92));
  wallLeft.rotation.y = Math.PI / 2;
  wallLeft.position.set(-3, 1.4, 0);
  wallLeft.receiveShadow = true;
  scene.add(wallLeft);

  // 踢脚线
  scene.add(box(6, 0.14, 0.06, std("#ddc6a4", 0.7), { y: 0.07, z: -2.47, receive: true }));
  const baseLeft = box(5, 0.14, 0.06, std("#dcc5a2", 0.7), { x: -2.97, y: 0.07, receive: true });
  baseLeft.rotation.y = Math.PI / 2;
  scene.add(baseLeft);

  // 地毯
  const rug = new THREE.Mesh(new THREE.CircleGeometry(1.65, 48), std("#ecd3ae", 0.92));
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0, 0.012, -0.7);
  rug.receiveShadow = true;
  scene.add(rug);

  // 挂画（后墙）
  const frameMat = std("#dcc9ac", 0.6);
  const artMatA = std("#f6efe2", 0.85);
  const artMatB = std("#e8d9bd", 0.85);
  const wallArt = (x, y, w, h, innerMat, accent) => {
    const g = new THREE.Group();
    const f = box(w, h, 0.035, frameMat, { receive: true });
    const inner = box(w * 0.78, h * 0.78, 0.032, innerMat, { receive: false });
    inner.position.z = 0.02;
    const dot = box(w * 0.16, h * 0.16, 0.03, accent, { receive: false });
    dot.position.set(w * 0.2, h * 0.2, 0.022);
    g.add(f, inner, dot);
    g.position.set(x, y, -2.485);
    scene.add(g);
  };
  wallArt(-0.75, 1.92, 0.78, 0.98, artMatA, std("#e8b98a", 0.6));
  wallArt(0.5, 1.86, 0.62, 0.8, artMatB, std("#8fb7a8", 0.6));

  // 书架
  const shelfMat = std("#b9895f", 0.6);
  const shelf = box(2.5, 0.05, 0.34, shelfMat, { x: 0.72, y: 1.98, z: -2.18 });
  scene.add(shelf);
  const bookColors = ["#d98e5f", "#7fb3c9", "#8fb7a8", "#e0c38a", "#c98d62", "#9b8aa8"];
  bookColors.forEach((color, i) => {
    const b = box(0.07, 0.2 + (i % 3) * 0.05, 0.24, std(color, 0.7), {
      x: 0.72 - 0.85 + i * 0.17,
      y: 2.18 + (i % 3) * 0.05 * 0.5,
      z: -2.2,
      ry: (i % 2 ? -0.12 : 0.1),
    });
    scene.add(b);
  });

  /* ---------- 窗户 ---------- */
  const windowGroup = new THREE.Group();
  const winFrameMat = std("#8a5f3c", 0.5);
  const winGlassMat = new THREE.MeshBasicMaterial({ map: skyDay, toneMapped: false });
  const winGlass = new THREE.Mesh(new THREE.PlaneGeometry(1.36, 1.04), winGlassMat);
  winGlass.position.set(0, 0, -0.02);
  winGlass.userData.pick = "window";
  windowGroup.add(winGlass);
  const wfTop = box(1.56, 0.1, 0.08, winFrameMat, { y: 0.57, z: -0.04, cast: false });
  const wfBottom = box(1.56, 0.12, 0.08, winFrameMat, { y: -0.58, z: -0.04, cast: false });
  const wfLeft = box(0.1, 1.26, 0.08, winFrameMat, { x: -0.73, z: -0.04, cast: false });
  const wfRight = box(0.1, 1.26, 0.08, winFrameMat, { x: 0.73, z: -0.04, cast: false });
  const wfCross = box(0.07, 1.24, 0.06, winFrameMat, { z: -0.035, cast: false });
  const wfCross2 = box(1.34, 0.07, 0.06, winFrameMat, { z: -0.035, cast: false });
  windowGroup.add(wfTop, wfBottom, wfLeft, wfRight, wfCross, wfCross2);
  // 窗帘
  const curtainMat = std("#e8c9a4", 0.85);
  const curL = box(0.26, 1.4, 0.06, curtainMat, { x: -0.95, y: 0.1, cast: false });
  const curR = box(0.26, 1.4, 0.06, curtainMat, { x: 0.95, y: 0.1, cast: false });
  windowGroup.add(curL, curR);
  windowGroup.position.set(-1.55, 1.55, -2.47);
  pickable(windowGroup, "window");
  scene.add(windowGroup);

  /* ---------- 灯串 ---------- */
  const stringGroup = new THREE.Group();
  const stringMat = new THREE.MeshStandardMaterial({
    color: 0x6b5b48,
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
  lampGroup.add(cyl(0.09, 0.12, 0.3, std("#8a5f3c", 0.5), { y: 0.15 }));
  lampGroup.add(cyl(0.035, 0.035, 0.52, std("#3a3430", 0.4, 0.4), { y: 0.56 }));
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

  /* ---------- 书桌 ---------- */
  const deskGroup = new THREE.Group();
  const deskTopMat = std("#b9895f", 0.55, 0.02);
  deskGroup.add(box(2.7, 0.07, 1.15, deskTopMat, { y: 0.72, z: -1.85 }));
  const legMat = std("#8a5f3c", 0.6);
  [
    [-1.18, -2.35],
    [1.18, -2.35],
    [-1.18, -1.38],
    [1.18, -1.38],
  ].forEach(([x, z]) => {
    deskGroup.add(box(0.07, 0.7, 0.07, legMat, { x, y: 0.35, z }));
  });
  scene.add(deskGroup);

  /* ---------- 显示器 ---------- */
  const monitorGroup = new THREE.Group();
  monitorGroup.add(box(0.2, 0.24, 0.2, std("#8a5f3c", 0.55), { y: 0.12 }));
  monitorGroup.add(box(0.1, 0.16, 0.1, std("#3a3430", 0.45), { y: 0.32 }));
  const monFrame = box(1.12, 0.66, 0.05, std("#2f2b27", 0.4, 0.1), { y: 0.69, z: -0.01 });
  monitorGroup.add(monFrame);
  const monScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.02, 0.56), screenMat);
  monScreen.position.set(0, 0.69, 0.025);
  monitorGroup.add(monScreen);
  monitorGroup.position.set(0.8, 0.73, -2.05);
  monitorGroup.rotation.x = -0.04;
  pickable(monitorGroup, "monitor");
  scene.add(monitorGroup);

  /* ---------- MacBook ---------- */
  const mbGroup = new THREE.Group();
  const mbBaseMat = std("#5a524b", 0.45, 0.25);
  mbGroup.add(box(1.0, 0.035, 0.64, mbBaseMat, { y: 0.018 }));
  const mbLid = box(1.0, 0.6, 0.03, std("#3a3430", 0.4, 0.1), { y: 0.31, z: -0.28, rx: 0.5 });
  mbGroup.add(mbLid);
  const mbScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.52), screenMat);
  mbScreen.position.set(0, 0.3, -0.285);
  mbScreen.rotation.x = 0.5;
  mbGroup.add(mbScreen);
  mbGroup.position.set(-0.25, 0.735, -1.78);
  mbGroup.rotation.y = -0.12;
  pickable(mbGroup, "macbook");
  scene.add(mbGroup);

  /* ---------- iPad ---------- */
  const ipadGroup = new THREE.Group();
  ipadGroup.add(box(0.68, 0.92, 0.03, std("#55514c", 0.45, 0.15), { z: -0.015 }));
  const ipadScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.84), screenMat);
  ipadScreen.position.z = 0.02;
  ipadGroup.add(ipadScreen);
  ipadGroup.position.set(1.72, 0.95, -2.28);
  ipadGroup.rotation.x = -0.08;
  ipadGroup.rotation.y = -0.24;
  pickable(ipadGroup, "ipad");
  scene.add(ipadGroup);

  /* ---------- 手机 ---------- */
  const phoneGroup = new THREE.Group();
  phoneGroup.add(box(0.3, 0.54, 0.025, std("#4a443e", 0.45, 0.15), { z: -0.012 }));
  const phoneScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.48), screenMat);
  phoneScreen.position.z = 0.02;
  phoneGroup.add(phoneScreen);
  phoneGroup.position.set(1.35, 0.98, -1.66);
  phoneGroup.rotation.x = -0.16;
  phoneGroup.rotation.y = -0.4;
  pickable(phoneGroup, "phone");
  scene.add(phoneGroup);

  /* ---------- Marshall ---------- */
  const marshallGroup = new THREE.Group();
  const ampBodyMat = std("#3a3430", 0.6, 0.1);
  const ampBody = box(0.62, 0.78, 0.4, ampBodyMat, { y: 0.45 });
  marshallGroup.add(ampBody);
  const grillMat = new THREE.MeshStandardMaterial({ color: "#57504a", roughness: 0.9 });
  const grill = box(0.52, 0.52, 0.02, grillMat, { y: 0.5, z: 0.2 });
  marshallGroup.add(grill);
  const knobMat = new THREE.MeshStandardMaterial({ color: 0xd9b98c, roughness: 0.35, metalness: 0.5 });
  [-0.18, -0.06, 0.06, 0.18].forEach((x) => {
    const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.03, 16), knobMat);
    knob.rotation.x = Math.PI / 2;
    knob.position.set(x, 0.14, 0.2);
    marshallGroup.add(knob);
  });
  const bandMat = std("#8a7f72", 0.8);
  [-0.14, 0.0, 0.14].forEach((x) => {
    marshallGroup.add(box(0.36, 0.045, 0.02, bandMat, { x, y: -0.05, z: 0.2 }));
  });
  // 面板金字
  const script = box(0.3, 0.09, 0.012, new THREE.MeshStandardMaterial({ color: 0xd9b98c, roughness: 0.3, metalness: 0.6 }), { y: 0.76, z: 0.2, cast: false });
  marshallGroup.add(script);
  const standMat = std("#5a524b", 0.6);
  [0.26, -0.26].forEach((z) => {
    marshallGroup.add(box(0.05, 0.14, 0.05, standMat, { y: -0.07, z }));
  });
  marshallGroup.position.set(-2.3, 0.14, 0.9);
  marshallGroup.rotation.y = 0.35;
  pickable(marshallGroup, "marshall");
  scene.add(marshallGroup);

  /* ---------- 钢琴 ---------- */
  const pianoGroup = new THREE.Group();
  const walnut = std("#9c6f45", 0.55, 0.05);
  const walnutDeep = std("#8a5f3c", 0.55, 0.05);
  // 琴身（暖胡桃木）
  const pianoBody = box(0.72, 1.22, 0.6, walnut, { y: 0.66, z: 0.05 });
  pianoGroup.add(pianoBody);
  // 侧板
  const sidePanel = box(0.035, 1.22, 0.6, walnutDeep, { x: 0.34, y: 0.66, z: 0.05 });
  pianoGroup.add(sidePanel);
  // 闭合平顶盖
  const topLid = box(0.78, 0.09, 0.66, walnutDeep, { y: 1.32, z: 0.05 });
  pianoGroup.add(topLid);
  // 前挡板（深色斜面板，突显琴键）
  const fallboard = box(0.7, 0.26, 0.04, std("#4a443e", 0.5, 0.05), { y: 0.94, z: 0.36, rx: 0.12 });
  pianoGroup.add(fallboard);
  const emblem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.014, 20), std("#d9b98c", 0.3, 0.6));
  emblem.rotation.x = Math.PI / 2;
  emblem.position.set(0, 0.94, 0.38);
  pianoGroup.add(emblem);
  // 谱架 + 乐谱
  const musicRest = box(0.6, 0.02, 0.14, std("#2f2b27", 0.5), { y: 1.24, z: 0.1, rx: -0.28 });
  pianoGroup.add(musicRest);
  const sheet = box(0.42, 0.26, 0.012, std("#fff8ec", 0.8), { y: 1.36, z: 0.045, rx: 0.1 });
  pianoGroup.add(sheet);
  // 琴键：宽白色键面 + 清晰黑键
  const keybed = box(0.68, 0.11, 0.42, std("#f6efe2", 0.5), { y: 1.17, z: 0.33 });
  pianoGroup.add(keybed);
  const blackKeyMat = std("#2f2b27", 0.5);
  [-0.18, -0.09, 0, 0.09, 0.18].forEach((z) => {
    pianoGroup.add(box(0.58, 0.08, 0.055, blackKeyMat, { y: 1.255, z: 0.33 + z }));
  });
  // 琴腿
  const pianoLegMat = std("#5a524b", 0.6);
  [[-0.24, 0.32], [0.24, 0.32], [-0.24, -0.22], [0.24, -0.22]].forEach(([x, z]) => {
    pianoGroup.add(box(0.09, 0.22, 0.09, pianoLegMat, { x, y: 0.11, z }));
  });
  // 琴凳
  const stoolGroup = new THREE.Group();
  stoolGroup.add(box(0.56, 0.07, 0.3, std("#3a3430", 0.6), { y: 0.33 }));
  const stoolLegMat = std("#5a524b", 0.6);
  [[-0.21, -0.11], [0.21, -0.11], [-0.21, 0.11], [0.21, 0.11]].forEach(([x, z]) => {
    stoolGroup.add(box(0.05, 0.28, 0.05, stoolLegMat, { x, y: 0.14, z }));
  });
  stoolGroup.position.set(2.3, 0, 0.78);
  stoolGroup.rotation.y = 0.25;
  scene.add(stoolGroup);

  pianoGroup.position.set(2.66, 0, -0.3);
  pianoGroup.rotation.y = -0.18;
  pickable(pianoGroup, "piano");
  scene.add(pianoGroup);

  /* ---------- 开关 ---------- */
  const switchGroup = new THREE.Group();
  switchGroup.add(box(0.2, 0.3, 0.025, std("#f6efe2", 0.7), { z: -0.01, cast: false }));
  switchGroup.add(box(0.12, 0.16, 0.02, std("#3a3430", 0.4), { y: 0.03, z: 0.005, cast: false }));
  switchGroup.add(cyl(0.05, 0.05, 0.02, new THREE.MeshStandardMaterial({ color: 0xe9c46a, emissive: 0xe9c46a, emissiveIntensity: 0.35, roughness: 0.4 }), { y: -0.09, z: 0.01, cast: false }));
  switchGroup.position.set(1.62, 1.45, -2.485);
  pickable(switchGroup, "lightswitch");
  scene.add(switchGroup);

  /* ---------- 垃圾桶 ---------- */
  const trashGroup = new THREE.Group();
  const binMat = std("#7f9aa5", 0.55);
  trashGroup.add(cyl(0.26, 0.2, 0.62, binMat, { y: 0.31 }));
  trashGroup.add(cyl(0.2, 0.2, 0.06, std("#6f8791", 0.55), { y: 0.65 }));
  const note = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.14), new THREE.MeshStandardMaterial({ color: 0xfff8ec, roughness: 0.9, side: THREE.DoubleSide }));
  note.position.set(0.16, 0.72, 0.12);
  note.rotation.set(-0.3, -0.6, 0.2);
  trashGroup.add(note);
  trashGroup.position.set(2.0, 0, 1.35);
  pickable(trashGroup, "trashcan");
  scene.add(trashGroup);

  /* ---------- 植物 ---------- */
  const plantGroup = new THREE.Group();
  plantGroup.add(cyl(0.24, 0.18, 0.4, std("#c98d62", 0.6), { y: 0.2 }));
  const leafMat = std("#7fa87f", 0.75);
  const leafMat2 = std("#6f9a70", 0.75);
  [[0, 0.62, 0.34], [0.18, 0.52, 0.12], [-0.16, 0.5, 0.08], [0.06, 0.78, 0.3], [-0.1, 0.68, 0.22]].forEach(([x, y, r], i) => {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 12), i % 2 ? leafMat : leafMat2);
    leaf.position.set(x, y, 0);
    leaf.scale.y = 0.85;
    plantGroup.add(leaf);
  });
  const stem = cyl(0.02, 0.03, 0.45, std("#5d7f5e", 0.7), { y: 0.5 });
  plantGroup.add(stem);
  plantGroup.position.set(-2.55, 0, -1.7);
  scene.add(plantGroup);

  /* ---------- 小狗摆件 ---------- */
  const dogGroup = new THREE.Group();
  const dogMat = std("#d9b98c", 0.8);
  const dogMat2 = std("#c98d62", 0.8);
  dogGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 14), dogMat));
  const dogBody = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), dogMat2);
  dogBody.position.set(-0.12, -0.12, 0);
  dogBody.scale.set(1.3, 0.8, 0.9);
  dogGroup.add(dogBody);
  const dogEarL = new THREE.Mesh(new THREE.SphereGeometry(0.085, 10, 8), dogMat);
  dogEarL.position.set(-0.11, 0.15, 0.11);
  dogEarL.scale.set(1, 1.6, 0.6);
  dogGroup.add(dogEarL);
  const dogEarR = new THREE.Mesh(new THREE.SphereGeometry(0.085, 10, 8), dogMat);
  dogEarR.position.set(-0.11, 0.15, -0.11);
  dogEarR.scale.set(1, 1.6, 0.6);
  dogGroup.add(dogEarR);
  const dogEyeMat = new THREE.MeshStandardMaterial({ color: 0x2f2b27, roughness: 0.3 });
  const dogEyeL = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 6), dogEyeMat);
  dogEyeL.position.set(0.06, 0.05, 0.16);
  dogGroup.add(dogEyeL);
  const dogEyeR = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 6), dogEyeMat);
  dogEyeR.position.set(0.06, 0.05, -0.16);
  dogGroup.add(dogEyeR);
  const dogNose = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), dogEyeMat);
  dogNose.position.set(0.19, -0.04, 0);
  dogGroup.add(dogNose);
  dogGroup.position.set(-1.1, 0.22, 0.35);
  dogGroup.rotation.y = 0.6;
  scene.add(dogGroup);

  /* ---------- 积木塔（装饰） ---------- */
  const towerGroup = new THREE.Group();
  const towerMats = [std("#8fb7a8", 0.7), std("#a3c6b8", 0.7), std("#7aa99b", 0.7), std("#e9c46a", 0.6)];
  const towerSpecs = [
    [0.34, 0.14, 0.34, 0.07],
    [0.28, 0.12, 0.28, 0.2],
    [0.2, 0.1, 0.2, 0.31],
    [0.1, 0.12, 0.1, 0.42],
  ];
  towerSpecs.forEach(([w, h, d, y], i) => {
    const block = box(w, h, d, towerMats[i % towerMats.length], { y, cast: true });
    towerGroup.add(block);
  });
  towerGroup.position.set(0.65, 0, 0.15);
  towerGroup.rotation.y = 0.3;
  scene.add(towerGroup);

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
  // 由投影扫描校准：使物件投影落在画面中央附近（±1.05 rad 内）
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

    hemi.intensity = night ? 0.34 : 0.6;
    hemi.color.set(night ? 0x93a9d6 : 0xfff6e8);
    key.intensity = night ? 0.55 : 1.6;
    key.color.set(night ? 0x9db4e0 : 0xfff1dc);
    fill.intensity = night ? 0.3 : 0.55;
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
    renderer.render(scene, camera);
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
