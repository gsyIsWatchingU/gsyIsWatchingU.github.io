// 场景结构和交互件的参考修整。主要家具/角色由 patrick-house.js 加载自有 GPU GLB。
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/* ---------------- 基础工具 ---------------- */
let paletteSeed=20261013;
const random=()=>{paletteSeed=(Math.imul(paletteSeed,1664525)+1013904223)>>>0;return paletteSeed/4294967296;};
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
    blobs.push("#909997", "#777f7d", "#a8adaa", "#626d6c", "#8e9691", "#818b87");
  }
  const lc = base !== "#7c4b66" ? "#bdc5bd" : light;
  const dc = base !== "#7c4b66" ? "#485856" : dark;
  for (let i = 0; i < 70; i++) {
    g.fillStyle = blobs[(random() * blobs.length) | 0];
    g.globalAlpha = 0.12 + random() * 0.2;
    const r = size * (0.04 + random() * 0.16);
    g.beginPath();
    g.arc(random() * size, random() * size, r, 0, Math.PI * 2);
    g.fill();
  }
  g.globalAlpha = 1;
  // 噪点颗粒
  for (let i = 0; i < 2600; i++) {
    g.fillStyle = random() > 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)";
    g.fillRect(random() * size, random() * size, 1.5, 1.5);
  }
  // 竖向冲刷纹
  g.globalAlpha = 0.14;
  for (let i = 0; i < 26; i++) {
    const x = random() * size;
    const len = size * (0.2 + random() * 0.5);
    g.strokeStyle = random() > 0.5 ? lc : dc;
    g.lineWidth = 2 + random() * 5;
    g.beginPath();
    g.moveTo(x, random() * size * 0.3);
    g.lineTo(x + (random() - 0.5) * 20, random() * size * 0.3 + len);
    g.stroke();
  }
  g.globalAlpha = 1;
  return srgb(new THREE.CanvasTexture(c));
}
// 绿色内壁：柔和石膏感
export function greenWallTex(size = 512) {
  const [c, g] = makeCanvas(size, size);
  g.fillStyle = "#83934a";
  g.fillRect(0, 0, size, size);
  for (let i = 0; i < 900; i++) {
    g.fillStyle = random() > 0.5 ? "rgba(255,255,220,0.05)" : "rgba(30,60,20,0.07)";
    g.fillRect(random() * size, random() * size, 2, 2);
  }
  g.strokeStyle = "rgba(56,70,28,0.19)";
  g.lineWidth = 1.25;
  for (let i = 0; i < 32; i++) {
    g.beginPath();
    const x=(i+.5)*size/32, y=random()*size;
    g.moveTo(x,y);
    g.bezierCurveTo(x-8,y+24,x+12,y+58,x+5,y+95);
    g.stroke();
  }
  return srgb(new THREE.CanvasTexture(c));
}
// 木纹（板缝 + 木纹颗粒），variant: plank / dark；dir: h 横向（台面）/ v 竖向（门板、桌腿）
export function woodTex(size = 512, variant = "plank", dir = "h") {
  const [c, g] = makeCanvas(size, size);
  const base = variant === "dark" ? "#7a5230" : "#b98d5e";
  g.fillStyle = base;
  g.fillRect(0, 0, size, size);
  // 板缝
  g.fillStyle = "rgba(60,38,18,0.55)";
  if (dir === "h") {
    for (let y = 0; y < size; y += size / 8) {
      g.fillRect(0, y, size, 2 + (random() * 2));
    }
  } else {
    for (let x = 0; x < size; x += size / 6) {
      g.fillRect(x, 0, 2 + (random() * 2), size);
    }
  }
  // 木纹（顺板方向）
  for (let i = 0; i < 70; i++) {
    const off = random() * size;
    g.strokeStyle = `rgba(${variant === "dark" ? "70,42,22" : "120,82,48"},${0.15 + random() * 0.2})`;
    g.lineWidth = 1 + random() * 2;
    g.beginPath();
    if (dir === "h") {
      g.moveTo(0, off);
      let x = 0;
      while (x < size) {
        x += 8 + random() * 30;
        g.lineTo(x, off + (random() - 0.5) * 8);
      }
    } else {
      g.moveTo(off, 0);
      let y = 0;
      while (y < size) {
        y += 8 + random() * 30;
        g.lineTo(off + (random() - 0.5) * 8, y);
      }
    }
    g.stroke();
  }
  // 节疤
  for (let i = 0; i < 8; i++) {
    g.fillStyle = "rgba(70,45,22,0.35)";
    g.beginPath();
    g.ellipse(random() * size, random() * size, 5 + random() * 8, 3 + random() * 5, random() * 3, 0, Math.PI * 2);
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
    g.fillStyle = random() > 0.5 ? "rgba(255,244,205,0.16)" : "rgba(150,120,70,0.16)";
    g.fillRect(random() * size, random() * size, 1.4, 1.4);
  }
  g.globalAlpha = 0.18;
  for (let i = 0; i < 40; i++) {
    g.fillStyle = "#c8a86e";
    g.beginPath();
    g.ellipse(random() * size, random() * size, 4 + random() * 14, 3 + random() * 8, random() * 3, 0, Math.PI * 2);
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
    const x = random() * 256;
    const y = random() * 256;
    g.strokeStyle = random() > 0.5 ? dark : light;
    g.globalAlpha = 0.25;
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + (random() - 0.5) * 42, y + (random() - 0.5) * 42);
    g.stroke();
  }
  g.globalAlpha = 0.2;
  g.lineWidth = 2;
  for (let i = 0; i < 60; i++) {
    g.strokeStyle = random() > 0.5 ? dark : light;
    g.beginPath();
    g.moveTo(random() * 256, 0);
    g.lineTo(random() * 256, 256);
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
// 派大星全身皮肤贴图：粉底 + 头部正面五官（一次 UV 覆盖，背面/侧面不重复）
export function patrickBodyTex(sizeW = 512, sizeH = 1024) {
  const [c, g] = makeCanvas(sizeW, sizeH);
  g.fillStyle = "#ffa6c6";
  g.fillRect(0, 0, sizeW, sizeH);
  // 柔和体积高光（上亮下暗）
  const grad = g.createRadialGradient(sizeW * 0.42, sizeH * 0.36, sizeH * 0.05, sizeW * 0.5, sizeH * 0.5, sizeH * 0.66);
  grad.addColorStop(0, "rgba(255,208,220,0.55)");
  grad.addColorStop(1, "rgba(255,116,166,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, sizeW, sizeH);
  // 噪点颗粒
  for (let i = 0; i < 1500; i++) {
    g.fillStyle = random() > 0.5 ? "rgba(255,192,208,0.12)" : "rgba(214,104,148,0.1)";
    g.fillRect(random() * sizeW, random() * sizeH, 2, 2);
  }
  // 正面头部（canvas 中心 x=256，头部带 y≈0..360）五官
  // 眉毛
  g.strokeStyle = "#a3405f";
  g.lineWidth = 15;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(sizeW / 2 - 50, 76);
  g.quadraticCurveTo(sizeW / 2 - 30, 60, sizeW / 2 - 8, 74);
  g.moveTo(sizeW / 2 + 50, 76);
  g.quadraticCurveTo(sizeW / 2 + 30, 60, sizeW / 2 + 8, 74);
  g.stroke();
  // 眼睛（白 + 瞳 + 高光），加大保证远看可辨
  for (const s of [-1, 1]) {
    const ex = sizeW / 2 + s * 26;
    g.fillStyle = "#fff";
    g.beginPath();
    g.arc(ex, 124, 20, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#3a2030";
    g.beginPath();
    g.arc(ex + s * 7, 125, 11, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#fff";
    g.beginPath();
    g.arc(ex + s * 3, 119, 4.5, 0, Math.PI * 2);
    g.fill();
  }
  // 嘴（微笑弧）
  g.strokeStyle = "#a3405f";
  g.lineWidth = 13;
  g.beginPath();
  g.arc(sizeW / 2, 202, 38, 0.15, Math.PI - 0.15);
  g.stroke();
  return srgb(new THREE.CanvasTexture(c));
}
// 派大星纯色皮肤（腿/臂）
export function skinPlainTex(size = 128) {
  const [c, g] = makeCanvas(size, size);
  g.fillStyle = "#ffa6c6";
  g.fillRect(0, 0, size, size);
  for (let i = 0; i < 220; i++) {
    g.fillStyle = random() > 0.5 ? "rgba(255,190,205,0.14)" : "rgba(220,110,150,0.1)";
    g.fillRect(random() * size, random() * size, 2, 2);
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
    const x = random() * size;
    const y = random() * size;
    const r = 4 + random() * 6;
    g.fillStyle = "#9a4fae";
    for (let p = 0; p < 5; p++) {
      const a = (p / 5) * Math.PI * 2 + random() * 0.4;
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
    g.fillRect(random() * size, random() * size, 3, 3);
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
  // 参考图：浅蓝色金属双门冰箱，顶部红盒+罐头
  const body = new THREE.Mesh(rbox(0.7, 1.55, 0.6, 0.07), mat(0x9fc8dd, 0.42, { metalness: 0.32 }));
  body.position.y = 0.775;
  g.add(body);
  const door = new THREE.Mesh(rbox(0.3, 1.18, 0.035, 0.025), mat(0xb2d6e8, 0.4, { metalness: 0.3 }));
  door.position.set(-0.17, 0.72, 0.305);
  g.add(door);
  // 门缝（双门分隔线）
  const seam = new THREE.Mesh(rbox(0.012, 1.1, 0.005, 0.002), mat(0x6f92a5, 0.5, { metalness: 0.3 }));
  seam.position.set(0.02, 0.72, 0.335);
  g.add(seam);
  // 银色把手 ×2
  for (const hx of [-0.24, 0.16]) {
    const handle = new THREE.Mesh(rbox(0.03, 0.26, 0.045, 0.015), mat(0xdbe4e9, 0.3, { metalness: 0.7 }));
    handle.position.set(hx, 0.75, 0.37);
    g.add(handle);
  }
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
  // 参考图灰色炉灶：奶白箱体 + 黑色玻璃灶台 + 炉门/视窗/金色把手/旋钮
  const body = new THREE.Mesh(rbox(0.9, 0.62, 0.55, 0.06), mat(0xdde0e3, 0.55, { metalness: 0.25 }));
  body.position.y = 0.31;
  g.add(body);
  const cooktop = new THREE.Mesh(rbox(0.74, 0.045, 0.42, 0.015), mat(0x1d2126, 0.35, { metalness: 0.45 }));
  cooktop.position.y = 0.625;
  g.add(cooktop);
  for (const [bx, bz] of [[-0.24, -0.13], [0.24, -0.13], [-0.24, 0.13], [0.24, 0.13]]) {
    const burner = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.075, 0.018, 14), mat(0x10151a, 0.5, { metalness: 0.5 }));
    burner.position.set(bx, 0.655, bz);
    g.add(burner);
    const grate = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.008, 6, 16), mat(0x4a4d52, 0.45, { metalness: 0.5 }));
    grate.rotation.x = Math.PI / 2;
    grate.position.set(bx, 0.67, bz);
    g.add(grate);
  }
  // 炉门 + 视窗
  const door = new THREE.Mesh(rbox(0.56, 0.26, 0.045, 0.02), mat(0xc9cdd1, 0.5, { metalness: 0.3 }));
  door.position.set(0, 0.22, 0.283);
  g.add(door);
  const win = new THREE.Mesh(rbox(0.32, 0.1, 0.02, 0.01), mat(0x1a2226, 0.35, { metalness: 0.35 }));
  win.position.set(0, 0.24, 0.307);
  g.add(win);
  const handle = new THREE.Mesh(rbox(0.16, 0.03, 0.045, 0.012), goldMat());
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
  // 参考图蓝色洗手池：木质柜体 + 浅色台面 + 陶瓷盆腔 + 镀铬龙头
  const cabinetWood=texMat(woodTex(512, "plank"), 0.8);
  const counter = new THREE.Mesh(rbox(1.0, 0.48, 0.55, 0.04), cabinetWood);
  counter.position.y = 0.24;
  g.add(counter);
  for(const [w,d,x,z]of[[1,.04,0,.255],[1,.04,0,-.255],[.04,.51,-.48,0],[.04,.51,.48,0]]){
    const fascia=new THREE.Mesh(rbox(w,.145,d,.012),cabinetWood);fascia.position.set(x,.55,z);g.add(fascia);
  }
  // 台面（浅石英）
  const topShape=new THREE.Shape();topShape.moveTo(-.51,-.285);topShape.lineTo(.51,-.285);topShape.lineTo(.51,.285);topShape.lineTo(-.51,.285);topShape.closePath();
  const hole=new THREE.Path();hole.absellipse(-.16,0,.218,.158,0,Math.PI*2,true);topShape.holes.push(hole);
  const topGeo=new THREE.ExtrudeGeometry(topShape,{depth:.045,bevelEnabled:true,bevelSize:.005,bevelThickness:.005,bevelSegments:2});topGeo.rotateX(-Math.PI/2);
  const top = new THREE.Mesh(topGeo, mat(0xdbe4e0, 0.5, { metalness: 0.1 }));
  top.position.y = .625;
  g.add(top);
  // 盆腔（方形陶瓷盆 + 内侧深色）
  const basinProfile=[[0,.53],[.14,.54],[.19,.60],[.225,.665],[.23,.68],[.21,.69],[.19,.64],[.14,.57],[0,.56]];
  const basinGeometry=new THREE.LatheGeometry(basinProfile.map(p=>new THREE.Vector2(...p)),40);
  const colors=[];for(let i=0;i<basinGeometry.attributes.position.count;i++){const p=basinGeometry.attributes.position,n=basinGeometry.attributes.normal;const inward=p.getX(i)*n.getX(i)+p.getZ(i)*n.getZ(i)<-.005;colors.push(...(inward?[.67,.77,.80]:[1,1,1]));}
  basinGeometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  const basin=new THREE.Mesh(basinGeometry,mat(0xcadadc,.4,{vertexColors:true}));basin.scale.z=.72;basin.position.x=-.16;g.add(basin);
  // 镀铬龙头（L 形管 + 立管 + 双把手）
  const chrome = mat(0xd9e0e4, 0.2, { metalness: 0.75 });
  const faucet=new THREE.CatmullRomCurve3([new THREE.Vector3(-.16,.66,-.22),new THREE.Vector3(-.16,.86,-.22),new THREE.Vector3(-.16,.88,-.10),new THREE.Vector3(-.16,.79,-.02)]);
  g.add(new THREE.Mesh(new THREE.TubeGeometry(faucet,28,.022,10,false),chrome));
  for (const kx of [-.31,.01]) {
    const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.05, 10), chrome);
    knob.position.set(kx, .685, -.20);
    g.add(knob);
  }
  // 下方柜门（竖向木纹）
  for (const sx of [-0.28, 0.26]) {
    const d = new THREE.Mesh(rbox(0.42, 0.4, 0.04, 0.02), texMat(woodTex(512, "plank", "v"), 0.8));
    d.position.set(sx, 0.24, 0.28);
    g.add(d);
    const dknob = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 6), goldMat());
    dknob.position.set(sx, 0.24, 0.31);
    g.add(dknob);
  }
  return shade(g);
}

export function buildWallCabinet() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(rbox(1.5, 0.5, 0.3, 0.05), texMat(woodTex(512, "dark", "v"), 0.82));
  g.add(body);
  for (let i = 0; i < 4; i++) {
    const door = new THREE.Mesh(rbox(0.32, 0.42, 0.035, 0.015), texMat(woodTex(512, "dark", "v"), 0.82));
    door.position.set(-0.52 + i * 0.34, 0, 0.16);
    g.add(door);
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.015, 8, 6), goldMat());
    knob.position.set(-0.52 + i * 0.34, 0.18, 0.18);
    g.add(knob);
  }
  return shade(g);
}

export function buildBed() {
  const g = new THREE.Group();
  // 参考图：蓝垫紫被、双抽屉床头柜、拱形木门；床体带腿、紫被有厚度
  for (const [lx, lz] of [[-0.8, -0.45], [0.8, -0.45], [-0.8, 0.45], [0.8, 0.45]]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.1, 8), texMat(woodTex(128, "dark", "v"), 0.85));
    leg.position.set(lx, 0.05, lz);
    g.add(leg);
  }
  const frame = new THREE.Mesh(rbox(1.95, 0.2, 1.1, 0.05), texMat(woodTex(512, "plank"), 0.8));
  frame.position.y = 0.14;
  g.add(frame);
  const mattress = new THREE.Mesh(rbox(1.85, 0.15, 1.0, 0.05), mat(0x6aa5d8, 0.92, { emissive: 0x24598a, emissiveIntensity: 0.03 }));
  mattress.position.y = 0.32;
  g.add(mattress);
  // 紫被：两层（下层铺满、上层卷边）形成厚度感
  const blanket = new THREE.Mesh(rbox(1.62, 0.12, 0.72, 0.06), texMat(fabricTex("#9a5fa8", "#6d3f7c", "#c08fd0", null, 60), 0.9));
  blanket.position.set(-0.1, 0.4, 0.12);
  g.add(blanket);
  const blanketEdge = new THREE.Mesh(rbox(1.58, 0.06, 0.1, 0.03), texMat(fabricTex("#b06fc0", "#7d4a8c", "#d49ae0", null, 40), 0.9));
  blanketEdge.position.set(-0.1, 0.39, 0.53);
  g.add(blanketEdge);
  const pillow = new THREE.Mesh(rbox(0.5, 0.11, 0.3, 0.05), mat(0xf2eef0, 0.95));
  pillow.position.set(-0.4, 0.44, 0.32);
  g.add(pillow);
  const headboard = new THREE.Mesh(rbox(1.95, 0.55, 0.08, 0.04), texMat(woodTex(512, "dark", "v"), 0.8));
  headboard.position.set(0, 0.45, -0.52);
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
  const body = new THREE.Mesh(rbox(0.48, 0.5, 0.4, 0.05), texMat(woodTex(512, "plank", "v"), 0.82));
  body.position.y = 0.26;
  g.add(body);
  for (const dy of [0.34, 0.18]) {
    const drawer = new THREE.Mesh(rbox(0.36, 0.14, 0.02, 0.01), texMat(woodTex(512, "plank", "v"), 0.82));
    drawer.position.set(0, dy, 0.21);
    g.add(drawer);
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.016, 8, 6), goldMat());
    knob.position.set(0, dy, 0.23);
    g.add(knob);
  }
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
  // 参考图：卧推凳（真实支撑）+ 杠铃架（立柱 + 挂钩托杠 + 铃片）
  const upholstery=texMat(fabricTex('#bd4b3d','#773326','#e49372',null,60),.94);
  const bench = new THREE.Mesh(rbox(1.15, 0.12, 0.34, 0.05), upholstery);
  bench.position.y = 0.36;
  g.add(bench);
  const pad = new THREE.Mesh(rbox(0.5, 0.06, 0.3, 0.04), upholstery);
  pad.position.set(-0.28, 0.45, 0);
  g.add(pad);
  // 凳腿（斜撑 + 横撑）
  const steel = goldMat();
  for (const lx of [0.42, -0.42]) {
    for (const lz of [0.1, -0.1]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.032, 0.34, 8), steel);
      leg.position.set(lx, 0.17, lz);
      leg.rotation.x = lz > 0 ? 0.06 : -0.06;
      g.add(leg);
    }
  }
  const cross = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.84, 8), steel);
  cross.rotation.z = Math.PI / 2;
  cross.position.set(0, 0.1, .1);
  g.add(cross);
  const secondCross=cross.clone();secondCross.position.z=-.1;g.add(secondCross);
  // 杠铃架：两根立柱 + 顶部横梁 + 挂钩
  const rackX = 0.42;
  for (const s of [-1, 1]) {
    const post = new THREE.Mesh(rbox(0.06, 1.0, 0.06, 0.02), steel);
    post.position.set(rackX + s * 0.16, 0.5, 0);
    g.add(post);
    const hook = new THREE.Mesh(rbox(0.06, 0.05, 0.09, 0.015), steel);
    hook.position.set(rackX + s * 0.16, 0.78, 0.06);
    g.add(hook);
  }
  const topBar = new THREE.Mesh(rbox(0.38, 0.04, 0.05, 0.015), steel);
  topBar.position.set(rackX, 1.0, 0);
  g.add(topBar);
  // 杠铃（托在挂钩上）
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.1, 10), steel);
  bar.rotation.z = Math.PI / 2;
  bar.position.set(rackX, 0.8, 0.05);
  g.add(bar);
  for (const s of [-1, 1]) {
    for (const [pr, ph] of [[0.11, 0.07], [0.085, 0.05]]) {
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(pr, pr, ph, 14), mat(0x333, 0.6, { metalness: 0.5 }));
      plate.rotation.z = Math.PI / 2;
      plate.position.set(rackX + s * (pr===.11?.36:.43), 0.8, 0.05);
      g.add(plate);
    }
    const clip = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.07, 8), mat(0xc84a3a, 0.8));
    clip.rotation.z = Math.PI / 2;
    clip.position.set(rackX + s * 0.49, 0.8, 0.05);
    g.add(clip);
  }
  return shade(g);
}

export function buildSofa() {
  const g = new THREE.Group();
  // 圆润连接：厚实底座 + 后倾靠背 + 双坐垫 + 弧形扶手，减少积木感
  const base = new THREE.Mesh(rbox(1.55, 0.4, 0.72, 0.11), mat(0x4a8f6e, 0.92));
  base.position.y = 0.24;
  g.add(base);
  const back = new THREE.Mesh(rbox(1.55, 0.46, 0.2, 0.1), mat(0x3f7c5d, 0.92));
  back.position.set(0, 0.52, -0.28);
  back.rotation.x = -0.07;
  g.add(back);
  // 坐垫（微微前倾出沿）
  const cushionGeo = rbox(0.64, 0.15, 0.52, 0.09);
  const cushionL = new THREE.Mesh(cushionGeo, mat(0x63b28a, 0.95));
  cushionL.position.set(-0.42, 0.55, 0.04);
  cushionL.rotation.x = 0.04;
  g.add(cushionL);
  const cushionR = new THREE.Mesh(cushionGeo.clone(), mat(0x63b28a, 0.95));
  cushionR.position.set(0.42, 0.55, 0.04);
  cushionR.rotation.x = 0.04;
  g.add(cushionR);
  // 弧形扶手（前圆后宽，与靠背融合）
  for (const s of [-1, 1]) {
    const arm = new THREE.Mesh(rbox(0.2, 0.34, 0.66, 0.1), mat(0x3f7c5d, 0.92));
    arm.position.set(s * 0.73, 0.48, 0);
    g.add(arm);
    const armPad = new THREE.Mesh(rbox(0.16, 0.06, 0.52, 0.05), mat(0x63b28a, 0.95));
    armPad.position.set(s * 0.73, 0.67, 0.03);
    g.add(armPad);
  }
  for (const [lx, lz] of [[-0.55, 0.26], [0.55, 0.26], [-0.55, -0.26], [0.55, -0.26]]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.036, 0.14, 8), mat(0x6b4526, 0.8));
    leg.position.set(lx, 0.07, lz);
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
  const mount = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 0.05, 12), mat(0x627d89, 0.7));
  mount.position.y = -0.025;
  g.add(mount);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.52, 8), mat(0x627d89, 0.7));
  pole.position.y = -0.31;
  g.add(pole);
  const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.09, 14), mat(0x627d89, 0.7));
  motor.position.y = -0.575;
  g.add(motor);
  // 叶片组（只转叶片）
  const blades = new THREE.Group();
  blades.position.y = -0.62;
  const bladeMat = mat(0x9eb4bf, 0.65);
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
  // 参考图：金色风向标——立柱 + 中球 + 两端箭头
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 1.0, 10), gold);
  pole.position.y = 0.5;
  g.add(pole);
  const top = new THREE.Group();
  top.position.y = 1.0;
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 1.1, 8), gold);
  bar.rotation.z = Math.PI / 2;
  top.add(bar);
  // 单片连续骨头轮廓：每端上下两个圆瓣，避免普通尖锥箭头。
  const boneShape=new THREE.Shape();
  boneShape.moveTo(-.40,.035);boneShape.lineTo(.40,.035);
  boneShape.bezierCurveTo(.43,.08,.43,.145,.50,.145);
  boneShape.bezierCurveTo(.60,.15,.64,.04,.59,0);
  boneShape.bezierCurveTo(.64,-.04,.60,-.15,.50,-.145);
  boneShape.bezierCurveTo(.43,-.145,.43,-.08,.40,-.035);
  boneShape.lineTo(-.40,-.035);
  boneShape.bezierCurveTo(-.43,-.08,-.43,-.145,-.50,-.145);
  boneShape.bezierCurveTo(-.60,-.15,-.64,-.04,-.59,0);
  boneShape.bezierCurveTo(-.64,.04,-.60,.15,-.50,.145);
  boneShape.bezierCurveTo(-.43,.145,-.43,.08,-.40,.035);
  const boneGeo=new THREE.ExtrudeGeometry(boneShape,{depth:.045,bevelEnabled:true,bevelThickness:.017,bevelSize:.017,bevelSegments:3,curveSegments:14});boneGeo.translate(0,0,-.0225);
  top.add(new THREE.Mesh(boneGeo,gold));
  const base=new THREE.Mesh(new THREE.CylinderGeometry(.095,.15,.085,24),gold);base.position.y=.045;g.add(base);
  for(const y of [.16,.51,.96]){const ring=new THREE.Mesh(new THREE.TorusGeometry(.043,.012,8,24),gold);ring.rotation.x=Math.PI/2;ring.position.y=y;g.add(ring);}
  // 中央球
  const mid = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), gold);
  top.add(mid);
  g.add(top);
  g.userData.vaneTop = top;
  return shade(g);
}

/* 派大星：连续圆润身体（躯干+头部一次参数化曲面，正面头部贴五官） */
function smoothProfile(pts, y) {
  for (let i = 0; i < pts.length - 1; i++) {
    const [y0, r0] = pts[i], [y1, r1] = pts[i + 1];
    if (y >= y0 && y <= y1) {
      const t = (y - y0) / (y1 - y0);
      const s = t * t * (3 - 2 * t);
      return r0 + (r1 - r0) * s;
    }
  }
  return pts[pts.length - 1][1];
}

export function starBodyGeo() {
  // 竖向轮廓 [y, 半径]：腰部（藏进短裤）→ 圆润腹部 → 胸部 → 颈部 → 细长圆润头部 → 冠
  const profile = [
    [0.50, 0.30], [0.60, 0.355], [0.72, 0.415], [0.84, 0.405], [0.96, 0.335],
    [1.04, 0.275], [1.12, 0.245], [1.20, 0.235], [1.30, 0.225],
    [1.42, 0.185], [1.52, 0.13], [1.60, 0.055], [1.635, 0.01],
  ];
  // 星形轮廓由四肢+头构成；身体本体用圆润旋转体（五角瓣幅度≈0，避免脊峰折脸）
  const ampAt = () => 0.02;
  const AZ = 72, HS = 52, Y0 = 0.5, H = 1.635;
  const positions = [], uvs = [], indices = [];
  for (let j = 0; j <= HS; j++) {
    const t = j / HS;
    const y = Y0 + t * (H - Y0);
    const radius = smoothProfile(profile, y);
    const amp = ampAt(y);
    for (let i = 0; i <= AZ; i++) {
      const th = (i / AZ) * Math.PI * 2;
      const r = radius * (1 + amp * Math.cos(5 * th));
      const x = r * Math.sin(th);
      const z = r * Math.cos(th);
      positions.push(x, y, z);
      // u：0.5 为正面 (+z)，接缝在背面；v：0 底 → 1 顶
      const phi = Math.atan2(x, z);
      uvs.push(0.5 + phi / (Math.PI * 2), t);
    }
  }
  for (let j = 0; j < HS; j++) {
    for (let i = 0; i < AZ; i++) {
      const a = j * (AZ + 1) + i, b = a + 1, c = a + AZ + 1, d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

// 绿紫花短裤：腰带上宽、下摆略鼓的环带（lathe），贴绿底紫花
export function shortsBandGeo() {
  const pts = [
    new THREE.Vector2(0.335, 0.38),
    new THREE.Vector2(0.365, 0.41),
    new THREE.Vector2(0.395, 0.435),
    new THREE.Vector2(0.40, 0.465),
    new THREE.Vector2(0.38, 0.49),
  ];
  return new THREE.LatheGeometry(pts, 44);
}

export function buildPatrick() {
  const g = new THREE.Group();
  const skin = texMat(patrickBodyTex(), 0.82);
  const plainSkin = texMat(skinPlainTex(), 0.82);
  const shortsM = texMat(shortsTex(), 0.85);

  // 身体（躯干+头部一体）：原点底边 y=0.5，网格自带高度
  const body = new THREE.Mesh(starBodyGeo(), skin);
  body.name = "patrick-body";
  // 正面朝向修正：公网逐像素验证五官贴图在网格局部 -z 侧渲染（UV 数学与渲染相反），绕 Y 转 π 使正脸面向世界 +z（观察镜头侧）
  body.rotation.y = Math.PI;
  // 少量自发光抬升：避免被阴影+ACES 压到与肤色不可分，五官始终可读
  body.material.emissive = new THREE.Color(0xffffff);
  body.material.emissiveMap = body.material.map;
  body.material.emissiveIntensity = 0.32;
  g.add(body);
  // 冠顶小圆球（收口圆润）
  const crown = new THREE.Mesh(new THREE.SphereGeometry(0.075, 14, 10), skin);
  crown.position.y = 1.66;
  g.add(crown);

  // 短裤（包住腰腹）
  const shorts = new THREE.Mesh(shortsBandGeo(), shortsM);
  shorts.name = "patrick-shorts";
  g.add(shorts);
  // 裤脚收边
  const hem = new THREE.Mesh(new THREE.TorusGeometry(0.385, 0.024, 8, 36), shortsM);
  hem.rotation.x = Math.PI / 2;
  hem.position.y = 0.47;
  g.add(hem);
  // 腰带
  const belt = new THREE.Mesh(new THREE.TorusGeometry(0.335, 0.03, 8, 36), shortsM);
  belt.rotation.x = Math.PI / 2;
  belt.position.y = 0.39;
  g.add(belt);

  // 腿 + 脚（从短裤下摆露出，与裤脚无缝衔接，脚底接地）
  for (const s of [-1, 1]) {
    const leg = new THREE.Mesh(capsule(0.062, 0.05, 0.3, 10), plainSkin);
    leg.position.set(s * 0.135, 0.33, 0);
    g.add(leg);
    const foot = new THREE.Mesh(rbox(0.11, 0.055, 0.18, 0.025), plainSkin);
    foot.position.set(s * 0.135, 0.035, 0.07);
    g.add(foot);
  }

  // 双臂：肩球埋入躯干 → 锥形上臂 → 肘 → 锥形前臂 → 圆手（肩关节在真实连接位）
  const makeArm = (side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.4, 0.8, 0);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.105, 14, 10), plainSkin);
    pivot.add(ball);
    const upper = new THREE.Mesh(capsule(0.06, 0.045, 0.22, 10), plainSkin);
    upper.position.y = -0.11;
    pivot.add(upper);
    const elbow = new THREE.Group();
    elbow.position.y = -0.22;
    pivot.add(elbow);
    const fore = new THREE.Mesh(capsule(0.045, 0.033, 0.18, 10), plainSkin);
    fore.position.y = -0.09;
    elbow.add(fore);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 10), plainSkin);
    hand.scale.y = 1.2;
    hand.position.y = -0.18;
    elbow.add(hand);
    pivot.userData.elbow = elbow;
    return pivot;
  };
  const armL = makeArm(-1);
  const armR = makeArm(1);
  g.add(armL, armR);

  g.userData.patrickArms = { armL, armR };

  // 地面投影环
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.44, 26), mat(0x7c4b66, 1, { transparent: true, opacity: 0.18 }));
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
