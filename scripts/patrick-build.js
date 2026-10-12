// 派大星石头屋 · 程序化资产构建（几何 + 手绘画布材质）
// 说明：GPU Forge3D/Blender 管线在本次会话不可达（Tailscale SSH 未授权），
// 全部资产改为引擎内程序化重建，技法与菠萝屋手绘画布材质一致。
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/* ---------------- 基础工具 ---------------- */
export const makeCanvas = (w, h) => {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d")];
};
export const srgb = (t) => {
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
};
export const mat = (color, roughness = 0.85, extra = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness, ...extra });
export const texMat = (tex, roughness = 0.85, extra = {}) =>
  new THREE.MeshStandardMaterial({ map: tex, roughness, ...extra });
export const rbox = (w, h, d, r = 0.06) => new RoundedBoxGeometry(w, h, d, 4, r);
export const capsule = (rTop, rBottom, len, radial = 8) => {
  const g = new THREE.CylinderGeometry(rTop, rBottom, len, radial);
  g.translate(0, -len / 2, 0);
  return g;
};
export const starShape = (outer, inner, points = 5) => {
  const shape = new THREE.Shape();
  const step = Math.PI / points;
  const start = -Math.PI / 2;
  shape.moveTo(Math.cos(start) * outer, Math.sin(start) * outer);
  for (let i = 1; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = start + i * step;
    shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  shape.closePath();
  return shape;
};

/* ---------------- 材质 ---------------- */
// 紫褐色岩石（外壳）：底色 + 团块色差 + 噪点 + 竖向冲刷；base 可选（洞穴墙用棕灰）
export function rockTex(size = 512, base = "#7c4b66") {
  const [c, g] = makeCanvas(size, size);
  g.fillStyle = base;
  g.fillRect(0, 0, size, size);
  // 大块色差
  const blobs = ["#8a5570", "#6e4059", "#94607a", "#5f3748", "#845072", "#754963"];
  const light = "#a0718d";
  const dark = "#523047";
  if (base !== "#7c4b66") {
    blobs.length = 0;
    blobs.push("#9a7f68", "#7d6350", "#a88d74", "#6a5444", "#8e745f", "#7a624f");
  }
  const lc = base !== "#7c4b66" ? "#b39a80" : light;
  const dc = base !== "#7c4b66" ? "#5c4634" : dark;
  for (let i = 0; i < 70; i++) {
    g.fillStyle = blobs[(Math.random() * blobs.length) | 0];
    g.globalAlpha = 0.12 + Math.random() * 0.2;
    const r = size * (0.04 + Math.random() * 0.16);
    g.beginPath();
    g.arc(Math.random() * size, Math.random() * size, r, 0, Math.PI * 2);
    g.fill();
  }
  g.globalAlpha = 1;
  // 噪点颗粒
  for (let i = 0; i < 2600; i++) {
    g.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)";
    g.fillRect(Math.random() * size, Math.random() * size, 1.5, 1.5);
  }
  // 竖向冲刷纹
  g.globalAlpha = 0.14;
  for (let i = 0; i < 26; i++) {
    const x = Math.random() * size;
    const len = size * (0.2 + Math.random() * 0.5);
    g.strokeStyle = Math.random() > 0.5 ? lc : dc;
    g.lineWidth = 2 + Math.random() * 5;
    g.beginPath();
    g.moveTo(x, Math.random() * size * 0.3);
    g.lineTo(x + (Math.random() - 0.5) * 20, Math.random() * size * 0.3 + len);
    g.stroke();
  }
  g.globalAlpha = 1;
  return srgb(new THREE.CanvasTexture(c));
}
// 绿色内壁：柔和石膏感
export function greenWallTex(size = 256) {
  const [c, g] = makeCanvas(size, size);
  g.fillStyle = "#6d8a3d";
  g.fillRect(0, 0, size, size);
  for (let i = 0; i < 900; i++) {
    g.fillStyle = Math.random() > 0.5 ? "rgba(255,255,220,0.05)" : "rgba(30,60,20,0.07)";
    g.fillRect(Math.random() * size, Math.random() * size, 2, 2);
  }
  g.strokeStyle = "rgba(50,80,30,0.15)";
  g.lineWidth = 1;
  for (let i = 0; i < 14; i++) {
    g.beginPath();
    g.arc(Math.random() * size, Math.random() * size, size * (0.05 + Math.random() * 0.12), 0, Math.PI * 2);
    g.stroke();
  }
  return srgb(new THREE.CanvasTexture(c));
}
// 木纹（板缝 + 木纹颗粒），variant: plank / dark
export function woodTex(size = 512, variant = "plank") {
  const [c, g] = makeCanvas(size, size);
  const base = variant === "dark" ? "#7a5230" : "#b98d5e";
  g.fillStyle = base;
  g.fillRect(0, 0, size, size);
  // 横向板缝
  g.fillStyle = "rgba(60,38,18,0.55)";
  for (let y = 0; y < size; y += size / 8) {
    g.fillRect(0, y, size, 2 + (Math.random() * 2));
  }
  // 木纹
  for (let i = 0; i < 70; i++) {
    const y = Math.random() * size;
    g.strokeStyle = `rgba(${variant === "dark" ? "70,42,22" : "120,82,48"},${0.15 + Math.random() * 0.2})`;
    g.lineWidth = 1 + Math.random() * 2;
    g.beginPath();
    g.moveTo(0, y);
    let x = 0;
    while (x < size) {
      x += 8 + Math.random() * 30;
      g.lineTo(x, y + (Math.random() - 0.5) * 8);
    }
    g.stroke();
  }
  // 节疤
  for (let i = 0; i < 8; i++) {
    g.fillStyle = "rgba(70,45,22,0.35)";
    g.beginPath();
    g.ellipse(Math.random() * size, Math.random() * size, 5 + Math.random() * 8, 3 + Math.random() * 5, Math.random() * 3, 0, Math.PI * 2);
    g.fill();
  }
  return srgb(new THREE.CanvasTexture(c));
}
// 沙地：颗粒与色变
export function sandTex(size = 512) {
  const [c, g] = makeCanvas(size, size);
  g.fillStyle = "#e0c99a";
  g.fillRect(0, 0, size, size);
  for (let i = 0; i < 3200; i++) {
    g.fillStyle = Math.random() > 0.5 ? "rgba(255,244,205,0.16)" : "rgba(150,120,70,0.16)";
    g.fillRect(Math.random() * size, Math.random() * size, 1.4, 1.4);
  }
  g.globalAlpha = 0.18;
  for (let i = 0; i < 40; i++) {
    g.fillStyle = "#c8a86e";
    g.beginPath();
    g.ellipse(Math.random() * size, Math.random() * size, 4 + Math.random() * 14, 3 + Math.random() * 8, Math.random() * 3, 0, Math.PI * 2);
    g.fill();
  }
  g.globalAlpha = 1;
  return srgb(new THREE.CanvasTexture(c));
}
// 布料编织
export function fabricTex(base, dark, light, hot = null, count = 90) {
  const [c, g] = makeCanvas(256, 256);
  g.fillStyle = base;
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    g.strokeStyle = Math.random() > 0.5 ? dark : light;
    g.globalAlpha = 0.25;
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + (Math.random() - 0.5) * 42, y + (Math.random() - 0.5) * 42);
    g.stroke();
  }
  g.globalAlpha = 0.2;
  g.lineWidth = 2;
  for (let i = 0; i < 60; i++) {
    g.strokeStyle = Math.random() > 0.5 ? dark : light;
    g.beginPath();
    g.moveTo(Math.random() * 256, 0);
    g.lineTo(Math.random() * 256, 256);
    g.stroke();
  }
  g.globalAlpha = 1;
  return srgb(new THREE.CanvasTexture(c));
}
// 老电视屏幕：开（卡通水下画面）/ 关
export function tvScreenTex(on = true) {
  const [c, g] = makeCanvas(320, 240);
  if (!on) {
    g.fillStyle = "#1c2733";
    g.fillRect(0, 0, 320, 240);
    g.strokeStyle = "rgba(255,255,255,0.06)";
    g.beginPath();
    g.arc(160, 120, 90, 0, Math.PI * 2);
    g.stroke();
    return srgb(new THREE.CanvasTexture(c));
  }
  const grad = g.createLinearGradient(0, 0, 0, 240);
  grad.addColorStop(0, "#2f6f86");
  grad.addColorStop(1, "#173b52");
  g.fillStyle = grad;
  g.fillRect(0, 0, 320, 240);
  // 海底气泡 + 水草
  g.strokeStyle = "rgba(210,240,255,0.65)";
  g.lineWidth = 2;
  [[60, 50, 8], [150, 30, 5], [250, 70, 10], [300, 150, 6], [100, 190, 7]].forEach(([x, y, r]) => {
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.stroke();
  });
  g.fillStyle = "rgba(60,160,120,0.8)";
  for (const [x, y] of [[30, 240], [280, 240]]) {
    g.beginPath();
    g.moveTo(x, y);
    g.quadraticCurveTo(x + 12, y - 60, x + 26, y);
    g.quadraticCurveTo(x + 40, y - 90, x + 60, y);
    g.fill();
  }
  // 中间小派大星轮廓
  g.fillStyle = "#ff9dbd";
  g.beginPath();
  const cx = 160, cy = 120, R = 46, r = 22;
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 === 0 ? R : r;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const px = cx + Math.cos(a) * rr;
    const py = cy + Math.sin(a) * rr;
    i === 0 ? g.moveTo(px, py) : g.lineTo(px, py);
  }
  g.closePath();
  g.fill();
  g.fillStyle = "#244";
  g.beginPath();
  g.arc(cx - 12, cy - 8, 5, 0, Math.PI * 2);
  g.arc(cx + 12, cy - 8, 5, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = "#244";
  g.lineWidth = 3;
  g.beginPath();
  g.arc(cx, cy + 14, 12, 0.15, Math.PI - 0.15);
  g.stroke();
  return srgb(new THREE.CanvasTexture(c));
}
// 派大星纯色皮肤（腿/臂）
export function skinPlainTex(size = 128) {
  const [c, g] = makeCanvas(size, size);
  g.fillStyle = "#ffa6c6";
  g.fillRect(0, 0, size, size);
  for (let i = 0; i < 220; i++) {
    g.fillStyle = Math.random() > 0.5 ? "rgba(255,190,205,0.14)" : "rgba(220,110,150,0.1)";
    g.fillRect(Math.random() * size, Math.random() * size, 2, 2);
  }
  return srgb(new THREE.CanvasTexture(c));
}
// 派大星脸部：粉底 + 眼睛/眉毛/嘴（正面）
export function patrickFaceTex(size = 512) {
  const [c, g] = makeCanvas(size, size);
  g.fillStyle = "#ffa6c6";
  g.fillRect(0, 0, size, size);
  // 柔和肤色渐变
  const grad = g.createRadialGradient(size / 2, size * 0.45, size * 0.1, size / 2, size * 0.5, size * 0.75);
  grad.addColorStop(0, "rgba(255,190,205,0.5)");
  grad.addColorStop(1, "rgba(255,120,170,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  // 眉毛
  g.strokeStyle = "#a3405f";
  g.lineWidth = 9;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(size * 0.32, size * 0.34);
  g.quadraticCurveTo(size * 0.4, size * 0.28, size * 0.47, size * 0.34);
  g.moveTo(size * 0.68, size * 0.34);
  g.quadraticCurveTo(size * 0.6, size * 0.28, size * 0.53, size * 0.34);
  g.stroke();
  // 眼睛（白 + 黑 + 高光）
  for (const ex of [0.37, 0.63]) {
    g.fillStyle = "#fff";
    g.beginPath();
    g.arc(size * ex, size * 0.5, size * 0.075, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#3a2030";
    g.beginPath();
    g.arc(size * ex + size * 0.012, size * 0.5, size * 0.04, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#fff";
    g.beginPath();
    g.arc(size * ex + size * 0.004, size * 0.482, size * 0.014, 0, Math.PI * 2);
    g.fill();
  }
  // 嘴
  g.strokeStyle = "#a3405f";
  g.lineWidth = 8;
  g.beginPath();
  g.arc(size * 0.5, size * 0.58, size * 0.11, 0.12, Math.PI - 0.12);
  g.stroke();
  return srgb(new THREE.CanvasTexture(c));
}
// 绿紫花短裤
export function shortsTex(size = 256) {
  const [c, g] = makeCanvas(size, size);
  g.fillStyle = "#5f8f3a";
  g.fillRect(0, 0, size, size);
  // 紫花
  for (let i = 0; i < 34; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 4 + Math.random() * 6;
    g.fillStyle = "#9a4fae";
    for (let p = 0; p < 5; p++) {
      const a = (p / 5) * Math.PI * 2 + Math.random() * 0.4;
      g.beginPath();
      g.arc(x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * 0.7, r * 0.45, 0, Math.PI * 2);
      g.fill();
    }
    g.fillStyle = "#f5d15a";
    g.beginPath();
    g.arc(x, y, r * 0.35, 0, Math.PI * 2);
    g.fill();
  }
  // 明暗
  g.fillStyle = "rgba(255,255,255,0.08)";
  for (let i = 0; i < 40; i++) {
    g.fillRect(Math.random() * size, Math.random() * size, 3, 3);
  }
  return srgb(new THREE.CanvasTexture(c));
}
export function goldMat() {
  return mat(0xd9b23f, 0.3, { metalness: 0.55, roughness: 0.32 });
}

/* ---------------- 家具构建（原点在地面中心） ---------------- */
const shade = (obj) => {
  obj.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  return obj;
};

export function buildFridge() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(rbox(0.7, 1.55, 0.6, 0.07), texMat(woodTex(512, "plank"), 0.8));
  body.position.y = 0.775;
  g.add(body);
  const door = new THREE.Mesh(rbox(0.32, 1.18, 0.04, 0.03), texMat(woodTex(512, "plank"), 0.8));
  door.position.set(-0.17, 0.72, 0.31);
  g.add(door);
  const handle = new THREE.Mesh(rbox(0.03, 0.26, 0.05, 0.015), goldMat());
  handle.position.set(-0.17, 0.75, 0.36);
  g.add(handle);
  // 顶部小红盒与罐头（参考图）
  const box = new THREE.Mesh(rbox(0.16, 0.14, 0.14, 0.03), mat(0xd94f4f, 0.85));
  box.position.set(-0.16, 1.72, 0.05);
  g.add(box);
  const tin = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.11, 12), mat(0x8fb8d9, 0.55, { metalness: 0.25 }));
  tin.position.set(0.14, 1.7, -0.05);
  g.add(tin);
  return shade(g);
}

export function buildStove() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(rbox(0.9, 0.62, 0.55, 0.06), mat(0x8a8f94, 0.6, { metalness: 0.2 }));
  body.position.y = 0.31;
  g.add(body);
  const cooktop = new THREE.Mesh(rbox(0.74, 0.04, 0.42, 0.015), mat(0x2e3238, 0.5, { metalness: 0.4 }));
  cooktop.position.y = 0.62;
  g.add(cooktop);
  for (const [bx, bz] of [[-0.24, -0.13], [0.24, -0.13], [-0.24, 0.13], [0.24, 0.13]]) {
    const burner = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.075, 0.015, 14), mat(0x10151a, 0.5, { metalness: 0.5 }));
    burner.position.set(bx, 0.65, bz);
    g.add(burner);
  }
  // 炉门
  const door = new THREE.Mesh(rbox(0.56, 0.26, 0.04, 0.02), mat(0x5d6166, 0.6, { metalness: 0.2 }));
  door.position.set(0, 0.22, 0.285);
  g.add(door);
  const win = new THREE.Mesh(rbox(0.32, 0.1, 0.02, 0.01), mat(0x243038, 0.4, { metalness: 0.3 }));
  win.position.set(0, 0.24, 0.305);
  g.add(win);
  const handle = new THREE.Mesh(rbox(0.16, 0.03, 0.04, 0.012), goldMat());
  handle.position.set(0, 0.1, 0.31);
  g.add(handle);
  // 旋钮
  for (const [kx, kz] of [[-0.3, -0.26], [-0.12, -0.26], [0.12, -0.26], [0.3, -0.26]]) {
    const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.05, 10), mat(0x22262c, 0.5, { metalness: 0.3 }));
    knob.position.set(kx, 0.66, kz);
    g.add(knob);
  }
  return shade(g);
}

export function buildSink() {
  const g = new THREE.Group();
  const counter = new THREE.Mesh(rbox(1.0, 0.62, 0.55, 0.06), texMat(woodTex(512, "plank"), 0.8));
  counter.position.y = 0.31;
  g.add(counter);
  // 台面
  const top = new THREE.Mesh(rbox(1.02, 0.05, 0.57, 0.02), mat(0x7ea6a9, 0.4, { metalness: 0.15 }));
  top.position.y = 0.635;
  g.add(top);
  // 盆腔
  const basin = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.13, 0.14, 20), mat(0xb8d0d2, 0.25, { metalness: 0.3 }));
  basin.position.set(-0.16, 0.55, 0);
  g.add(basin);
  const basinRim = new THREE.Mesh(new THREE.TorusGeometry(0.175, 0.025, 10, 24), mat(0xb8d0d2, 0.3, { metalness: 0.3 }));
  basinRim.rotation.x = Math.PI / 2;
  basinRim.position.set(-0.16, 0.645, 0);
  g.add(basinRim);
  // 龙头
  const spout = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.025, 8, 16, Math.PI), mat(0xc8d8da, 0.3, { metalness: 0.5 }));
  spout.position.set(0.22, 0.68, 0);
  g.add(spout);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.09, 10), mat(0xc8d8da, 0.3, { metalness: 0.5 }));
  stem.position.set(0.22, 0.66, 0);
  g.add(stem);
  const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.05, 10), mat(0xc8d8da, 0.3, { metalness: 0.5 }));
  knob.position.set(0.31, 0.68, 0);
  g.add(knob);
  // 下方柜门
  for (const sx of [-0.28, 0.26]) {
    const d = new THREE.Mesh(rbox(0.42, 0.4, 0.04, 0.02), texMat(woodTex(512, "plank"), 0.8));
    d.position.set(sx, 0.24, 0.28);
    g.add(d);
  }
  return shade(g);
}

export function buildWallCabinet() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(rbox(1.5, 0.5, 0.3, 0.05), texMat(woodTex(512, "dark"), 0.82));
  g.add(body);
  for (let i = 0; i < 4; i++) {
    const door = new THREE.Mesh(rbox(0.32, 0.42, 0.035, 0.015), texMat(woodTex(512, "dark"), 0.82));
    door.position.set(-0.52 + i * 0.34, 0, 0.16);
    g.add(door);
  }
  return shade(g);
}

export function buildBed() {
  const g = new THREE.Group();
  const frame = new THREE.Mesh(rbox(1.95, 0.2, 1.1, 0.05), texMat(woodTex(512, "plank"), 0.8));
  frame.position.y = 0.12;
  g.add(frame);
  const mattress = new THREE.Mesh(rbox(1.85, 0.14, 1.0, 0.05), mat(0x6aa5d8, 0.92, { emissive: 0x24598a, emissiveIntensity: 0.03 }));
  mattress.position.y = 0.3;
  g.add(mattress);
  const blanket = new THREE.Mesh(rbox(1.6, 0.1, 0.7, 0.04), texMat(fabricTex("#9a5fa8", "#6d3f7c", "#c08fd0", null, 60), 0.9));
  blanket.position.set(-0.1, 0.38, 0.12);
  g.add(blanket);
  const pillow = new THREE.Mesh(rbox(0.5, 0.1, 0.3, 0.05), mat(0xf2eef0, 0.95));
  pillow.position.set(-0.4, 0.42, 0.32);
  g.add(pillow);
  const headboard = new THREE.Mesh(rbox(1.95, 0.55, 0.08, 0.04), texMat(woodTex(512, "dark"), 0.8));
  headboard.position.set(0, 0.42, -0.52);
  g.add(headboard);
  return shade(g);
}

export function buildStarPillow() {
  const g = new THREE.Group();
  // 扁平五角星，正面朝上
  const shape = starShape(0.3, 0.14);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.09, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.02, bevelSegments: 2 });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, 0, -0.045);
  const m = new THREE.Mesh(geo, texMat(fabricTex("#f2a5c0", "#d97d9f", "#ffd0de", null, 70), 0.9));
  g.add(m);
  // 眼睛（装饰）
  for (const ex of [-0.07, 0.07]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 8), mat(0x333, 0.6));
    eye.position.set(ex, 0.03, 0.1);
    g.add(eye);
  }
  return shade(g);
}

export function buildNightstand() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(rbox(0.48, 0.5, 0.4, 0.05), texMat(woodTex(512, "plank"), 0.82));
  body.position.y = 0.26;
  g.add(body);
  const drawer = new THREE.Mesh(rbox(0.36, 0.16, 0.02, 0.01), texMat(woodTex(512, "plank"), 0.82));
  drawer.position.set(0, 0.38, 0.21);
  g.add(drawer);
  return shade(g);
}

export function buildBedLamp() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.04, 16), goldMat());
  base.position.y = 0.02;
  g.add(base);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.32, 10), goldMat());
  stem.position.y = 0.2;
  g.add(stem);
  const shadeMesh = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.16, 18, 1, true), mat(0xf2a5c0, 0.8, { side: THREE.DoubleSide }));
  shadeMesh.position.y = 0.38;
  g.add(shadeMesh);
  g.userData.lampShades = [shadeMesh];
  g.userData.lampKind = "bed";
  return shade(g);
}

export function buildBenchPress() {
  const g = new THREE.Group();
  // 卧推凳
  const bench = new THREE.Mesh(rbox(1.15, 0.12, 0.34, 0.05), mat(0xc84a3a, 0.9));
  bench.position.y = 0.36;
  g.add(bench);
  const pad = new THREE.Mesh(rbox(0.5, 0.06, 0.3, 0.04), mat(0xd8674f, 0.92));
  pad.position.set(-0.28, 0.45, 0);
  g.add(pad);
  for (const lx of [0.45, -0.45]) {
    const legF = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.34, 8), mat(0x5a5a5a, 0.6, { metalness: 0.4 }));
    legF.position.set(lx, 0.17, 0.12);
    g.add(legF);
    const legB = legF.clone();
    legB.position.z = -0.12;
    g.add(legB);
  }
  // 杠铃架
  const rack = new THREE.Mesh(rbox(1.0, 0.5, 0.3, 0.04), mat(0xd94f4f, 0.7));
  rack.position.set(0.35, 0.55, -0.1);
  g.add(rack);
  // 杠铃
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.1, 10), mat(0x22272c, 0.45, { metalness: 0.7 }));
  bar.rotation.z = Math.PI / 2;
  bar.position.set(0.35, 0.82, 0.05);
  g.add(bar);
  for (const s of [-1, 1]) {
    for (const [pr, ph] of [[0.11, 0.07], [0.085, 0.05]]) {
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(pr, pr, ph, 14), mat(0x333, 0.6, { metalness: 0.5 }));
      plate.rotation.z = Math.PI / 2;
      plate.position.set(0.35 + s * 0.14, 0.82, 0.05);
      g.add(plate);
    }
    const clip = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.07, 8), mat(0xc84a3a, 0.8));
    clip.rotation.z = Math.PI / 2;
    clip.position.set(0.35 + s * 0.3, 0.82, 0.05);
    g.add(clip);
  }
  return shade(g);
}

export function buildSofa() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(rbox(1.55, 0.42, 0.72, 0.09), mat(0x4a8f6e, 0.92));
  base.position.y = 0.24;
  g.add(base);
  const back = new THREE.Mesh(rbox(1.55, 0.42, 0.18, 0.08), mat(0x3f7c5d, 0.92));
  back.position.set(0, 0.48, -0.29);
  g.add(back);
  const cushionL = new THREE.Mesh(rbox(0.62, 0.14, 0.5, 0.08), mat(0x63b28a, 0.95));
  cushionL.position.set(-0.42, 0.52, 0.03);
  g.add(cushionL);
  const cushionR = cushionL.clone();
  cushionR.position.x = 0.42;
  g.add(cushionR);
  for (const [ax, az] of [[-0.62, 0.22], [0.62, 0.22], [-0.62, -0.24], [0.62, -0.24]]) {
    const arm = new THREE.Mesh(rbox(0.14, 0.36, 0.68, 0.07), mat(0x3f7c5d, 0.92));
    arm.position.set(ax, 0.44, az);
    g.add(arm);
  }
  for (const [lx, lz] of [[-0.5, 0.24], [0.5, 0.24], [-0.5, -0.24], [0.5, -0.24]]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.12, 8), mat(0x6b4526, 0.8));
    leg.position.set(lx, 0.06, lz);
    g.add(leg);
  }
  return shade(g);
}

export function buildCoffeeTable() {
  const g = new THREE.Group();
  const top = new THREE.Mesh(rbox(0.85, 0.06, 0.5, 0.04), texMat(woodTex(512, "plank"), 0.8));
  top.position.y = 0.36;
  g.add(top);
  for (const [tx, tz] of [[-0.34, -0.19], [0.34, -0.19], [-0.34, 0.19], [0.34, 0.19]]) {
    const leg = new THREE.Mesh(rbox(0.05, 0.34, 0.05, 0.02), texMat(woodTex(512, "dark"), 0.8));
    leg.position.set(tx, 0.17, tz);
    g.add(leg);
  }
  // 参考图汉堡 ×2
  for (const hx of [-0.2, 0.18]) {
    const bun = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), mat(0xe8b968, 0.9));
    bun.scale.y = 0.55;
    bun.position.set(hx, 0.43, 0);
    g.add(bun);
    const patty = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.062, 0.025, 12), mat(0x7a4a2a, 0.85));
    patty.position.set(hx, 0.4, 0);
    g.add(patty);
  }
  return shade(g);
}

export function buildOldTv() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(rbox(0.66, 0.56, 0.42, 0.06), texMat(woodTex(512, "dark"), 0.8));
  body.position.y = 0.28;
  g.add(body);
  const front = new THREE.Mesh(rbox(0.7, 0.6, 0.05, 0.02), mat(0x8a5a33, 0.85));
  front.position.y = 0.28;
  front.position.z = 0.225;
  g.add(front);
  const screen = new THREE.Mesh(rbox(0.46, 0.36, 0.02, 0.01), mat(0x17222e, 0.4, { metalness: 0.3 }));
  screen.position.set(0, 0.34, 0.26);
  g.add(screen);
  screen.userData.tvScreen = true;
  // 旋钮
  for (const [kx, ky] of [[-0.2, 0.09], [0.2, 0.09]]) {
    const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 10), goldMat());
    knob.rotation.x = Math.PI / 2;
    knob.position.set(kx, 0.09, 0.26);
    g.add(knob);
  }
  // 天线
  const antL = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.012, 0.3, 6), mat(0x4a4a4a, 0.5, { metalness: 0.6 }));
  antL.rotation.z = 0.35;
  antL.position.set(-0.14, 0.82, 0.05);
  g.add(antL);
  const antR = antL.clone();
  antR.rotation.z = -0.35;
  antR.position.x = 0.14;
  g.add(antR);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 6), mat(0xd9b23f, 0.35, { metalness: 0.6 }));
  tip.position.set(-0.14, 0.94, 0.05);
  g.add(tip);
  const tipR = tip.clone();
  tipR.position.x = 0.14;
  g.add(tipR);
  // 腿
  for (const [lx, lz] of [[-0.26, 0.12], [0.26, 0.12], [-0.26, -0.12], [0.26, -0.12]]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.2, 8), texMat(woodTex(512, "dark"), 0.8));
    leg.position.set(lx, 0.1, lz);
    g.add(leg);
  }
  g.userData.tvScreenMesh = screen;
  return shade(g);
}

export function buildFloorLamp() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.19, 0.05, 18), mat(0x8a9aa0, 0.6, { metalness: 0.3 }));
  base.position.y = 0.025;
  g.add(base);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.15, 10), goldMat());
  stem.position.y = 0.6;
  g.add(stem);
  const shadeMesh = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.3, 20, 1, true), mat(0xf7d9a8, 0.7, { side: THREE.DoubleSide }));
  shadeMesh.position.y = 1.32;
  g.add(shadeMesh);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), mat(0xffe9b8, 0.4, { emissive: 0xffe9b8, emissiveIntensity: 0 }));
  bulb.position.y = 1.18;
  g.add(bulb);
  g.userData.lampShades = [shadeMesh, bulb];
  g.userData.lampKind = "floor";
  return shade(g);
}

export function buildCeilingFan() {
  const g = new THREE.Group();
  // 原点 = 天花板挂点：底座贴顶，吊杆向下，电机+叶片在底部
  const mount = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 0.05, 12), mat(0x9c7448, 0.7));
  mount.position.y = -0.025;
  g.add(mount);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.52, 8), mat(0x9c7448, 0.7));
  pole.position.y = -0.31;
  g.add(pole);
  const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.09, 14), mat(0x8a5a33, 0.7));
  motor.position.y = -0.575;
  g.add(motor);
  // 叶片组（只转叶片）
  const blades = new THREE.Group();
  blades.position.y = -0.62;
  const bladeMat = mat(0xc8a050, 0.75);
  for (let i = 0; i < 4; i++) {
    const blade = new THREE.Mesh(rbox(0.5, 0.02, 0.16, 0.008), bladeMat);
    blade.position.x = 0.31;
    blade.rotation.z = 0.06;
    const holder = new THREE.Group();
    holder.add(blade);
    holder.rotation.y = (i * Math.PI) / 2;
    blades.add(holder);
  }
  g.add(blades);
  g.userData.fanBlades = blades;
  return shade(g);
}

export function buildWeatherVane() {
  const g = new THREE.Group();
  const gold = goldMat();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 1.0, 10), gold);
  pole.position.y = 0.5;
  g.add(pole);
  const top = new THREE.Group();
  top.position.y = 1.0;
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 1.25, 8), gold);
  bar.rotation.z = Math.PI / 2;
  top.add(bar);
  // 骨头两端：圆球头 + 小叉
  for (const s of [-1, 1]) {
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.085, 12, 10), gold);
    knob.scale.set(1, 1.35, 1);
    knob.position.set(s * 0.62, 0, 0);
    top.add(knob);
    const prong1 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.11, 8), gold);
    prong1.rotation.z = Math.PI / 2;
    prong1.position.set(s * 0.66, 0.06, 0);
    top.add(prong1);
    const prong2 = prong1.clone();
    prong2.rotation.z = Math.PI / 2 - 0.5;
    prong2.position.set(s * 0.66, 0, 0.09);
    top.add(prong2);
  }
  // 中央球
  const mid = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), gold);
  top.add(mid);
  g.add(top);
  g.userData.vaneTop = top;
  return shade(g);
}

export function buildPatrick() {
  const g = new THREE.Group();
  const skin = texMat(patrickFaceTex(), 0.82);
  const skinEdge = mat(0xf28aa8, 0.85);
  const plainSkin = texMat(skinPlainTex(), 0.82);
  const shortsM = texMat(shortsTex(), 0.85);

  // 身体：圆润五角星（正面向 +z）
  const bodyShape = starShape(0.4, 0.2);
  const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, { depth: 0.26, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.09, bevelSegments: 3, curveSegments: 18 });
  bodyGeo.translate(0, 0, -0.13);
  const body = new THREE.Mesh(bodyGeo, skin);
  body.name = "patrick-body";
  body.position.y = 0.66;
  g.add(body);
  // 身体边缘描边（卡通感）
  const rim = new THREE.Mesh(bodyGeo.clone(), skinEdge);
  rim.name = "patrick-rim";
  rim.scale.set(1.02, 1.015, 1.04);
  rim.position.y = 0.66;
  rim.position.z = -0.005;
  g.add(rim);

  // 短裤（稍大于身体下部的绿紫花环带）
  const shortsShape = starShape(0.42, 0.22);
  const shortsGeo = new THREE.ExtrudeGeometry(shortsShape, { depth: 0.3, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 2, curveSegments: 16 });
  shortsGeo.translate(0, 0, -0.15);
  const shorts = new THREE.Mesh(shortsGeo, shortsM);
  shorts.name = "patrick-shorts";
  shorts.position.y = 0.36;
  g.add(shorts);

  // 腿
  for (const s of [-1, 1]) {
    const leg = new THREE.Mesh(capsule(0.055, 0.045, 0.16, 10), plainSkin);
    leg.position.set(s * 0.14, 0.06, 0);
    g.add(leg);
    const foot = new THREE.Mesh(rbox(0.09, 0.05, 0.14, 0.02), plainSkin);
    foot.position.set(s * 0.14, 0.02, 0.06);
    g.add(foot);
  }

  // 双臂（独立枢轴链）
  const makeArm = (side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.42, 0.62, 0);
    const upper = new THREE.Mesh(capsule(0.05, 0.042, 0.3, 10), plainSkin);
    upper.position.y = -0.15;
    pivot.add(upper);
    const elbow = new THREE.Group();
    elbow.position.y = -0.3;
    pivot.add(elbow);
    const fore = new THREE.Mesh(capsule(0.042, 0.035, 0.26, 10), plainSkin);
    fore.position.y = -0.13;
    elbow.add(fore);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.062, 12, 10), plainSkin);
    hand.scale.y = 1.25;
    hand.position.y = -0.26;
    elbow.add(hand);
    pivot.userData.elbow = elbow;
    return pivot;
  };
  const armL = makeArm(-1);
  const armR = makeArm(1);
  g.add(armL, armR);

  g.userData.patrickArms = { armL, armR };

  // 地面投影环
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.32, 0.42, 26), mat(0x7c4b66, 1, { transparent: true, opacity: 0.2 }));
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.01;
  g.add(ring);

  return shade(g);
}

/* 小拱门 */
export function buildArch() {
  const g = new THREE.Group();
  const wood = texMat(woodTex(512, "plank"), 0.8);
  const postL = new THREE.Mesh(rbox(0.14, 1.5, 0.14, 0.05), wood);
  postL.position.set(-0.42, 0.75, 0);
  g.add(postL);
  const postR = postL.clone();
  postR.position.x = 0.42;
  g.add(postR);
  const arch = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.07, 10, 24, Math.PI), wood);
  arch.position.y = 1.5;
  g.add(arch);
  const panel = new THREE.Mesh(rbox(0.68, 1.2, 0.07, 0.03), texMat(woodTex(512, "dark"), 0.85));
  panel.position.y = 0.6;
  g.add(panel);
  return shade(g);
}
