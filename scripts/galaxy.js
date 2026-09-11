import * as THREE from "three";

const hero = document.querySelector(".hero");
const visual = document.querySelector(".hero__visual");
const spaceCanvas = document.querySelector(".galaxy-canvas");
const focusCanvas = document.querySelector(".galaxy-focus-canvas");

if (!hero || !visual || !spaceCanvas || !focusCanvas) {
  throw new Error("星云场景缺少必要节点");
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const compactViewport = window.matchMedia("(max-width: 980px)");

const createRandom = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
  return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
};

const drawDeepSpace = () => {
  const context = spaceCanvas.getContext("2d");
  if (!context) return;

  const bounds = hero.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
  const width = Math.max(1, Math.round(bounds.width));
  const height = Math.max(1, Math.round(bounds.height));
  spaceCanvas.width = Math.round(width * ratio);
  spaceCanvas.height = Math.round(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);

  const background = context.createRadialGradient(width * 0.78, height * 0.5, 0, width * 0.78, height * 0.5, width * 0.72);
  background.addColorStop(0, "rgba(18, 46, 67, 0.1)");
  background.addColorStop(0.38, "rgba(5, 16, 29, 0.07)");
  background.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  const random = createRandom(20260911);
  const starCount = Math.min(860, Math.floor((width * height) / 1280));
  for (let index = 0; index < starCount; index += 1) {
    const x = random() * width;
    const y = random() * height;
    const rightBias = x / width;
    const radius = 0.25 + Math.pow(random(), 6) * 1.35;
    const alpha = (0.06 + Math.pow(random(), 3.1) * 0.48) * (0.58 + rightBias * 0.42);
    const warm = random() > 0.975;

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = warm ? `rgba(238, 187, 125, ${alpha})` : `rgba(201, 228, 246, ${alpha})`;
    context.fill();

    if (radius > 1.1) {
      context.fillRect(x - radius * 3.2, y - 0.2, radius * 6.4, 0.4);
      context.fillRect(x - 0.2, y - radius * 3.2, 0.4, radius * 6.4);
    }
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

const createSilhouetteTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 192;
  canvas.height = 384;
  const context = canvas.getContext("2d");
  context.translate(96, 20);
  context.lineJoin = "round";
  context.lineCap = "round";
  context.shadowColor = "rgba(116, 151, 171, 0.38)";
  context.shadowBlur = 8;
  context.fillStyle = "rgba(1, 3, 7, 0.98)";
  context.strokeStyle = "rgba(151, 181, 194, 0.34)";
  context.lineWidth = 3;

  context.beginPath();
  context.ellipse(0, 46, 20, 23, -0.08, 0, Math.PI * 2);
  context.fill();
  context.stroke();

  context.beginPath();
  context.moveTo(-19, 72);
  context.quadraticCurveTo(-38, 96, -34, 151);
  context.quadraticCurveTo(-31, 212, -48, 267);
  context.quadraticCurveTo(-8, 287, 39, 263);
  context.quadraticCurveTo(24, 205, 31, 145);
  context.quadraticCurveTo(37, 96, 18, 72);
  context.quadraticCurveTo(0, 62, -19, 72);
  context.closePath();
  context.fill();
  context.stroke();

  context.beginPath();
  context.moveTo(-27, 103);
  context.quadraticCurveTo(-54, 150, -59, 205);
  context.quadraticCurveTo(-60, 220, -51, 222);
  context.quadraticCurveTo(-42, 220, -40, 206);
  context.lineTo(-20, 145);
  context.closePath();
  context.fill();

  context.beginPath();
  context.moveTo(-25, 267);
  context.lineTo(-19, 341);
  context.quadraticCurveTo(-14, 354, -2, 346);
  context.lineTo(8, 276);
  context.closePath();
  context.fill();
  context.beginPath();
  context.moveTo(8, 274);
  context.lineTo(24, 342);
  context.quadraticCurveTo(32, 353, 41, 343);
  context.lineTo(35, 261);
  context.closePath();
  context.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const createSoftSprite = ({ texture, color = 0xffffff, opacity = 1, scale, position, rotation = 0, order = 0, blending = THREE.AdditiveBlending }) => {
  const material = new THREE.SpriteMaterial({
    map: texture,
    color,
    opacity,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending,
  });
  material.rotation = rotation;
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(scale[0], scale[1], 1);
  sprite.position.set(position[0], position[1], position[2]);
  sprite.renderOrder = order;
  return sprite;
};

const drawFallback = (canvas) => {
  const replacement = canvas.cloneNode();
  canvas.replaceWith(replacement);
  const context = replacement.getContext("2d");
  const random = createRandom(731992);

  const draw = () => {
    const bounds = replacement.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    replacement.width = Math.max(1, Math.round(bounds.width * ratio));
    replacement.height = Math.max(1, Math.round(bounds.height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, bounds.width, bounds.height);
    context.globalCompositeOperation = "lighter";

    const sourceX = bounds.width * 0.64;
    const sourceY = bounds.height * 0.5;
    for (let index = 0; index < 14000; index += 1) {
      const branch = random() > 0.72;
      const progress = Math.pow(random(), 0.95);
      const x = sourceX - Math.pow(progress, 0.84) * bounds.width * (branch ? 0.56 : 0.72);
      const lift = Math.pow(progress, 1.16) * bounds.height * (branch ? -0.3 : 0.44);
      const y = sourceY - lift + Math.sin(progress * 2.7) * bounds.height * (branch ? -0.03 : 0.06) + (random() - 0.5) * (4 + progress * 58);
      const alpha = 0.05 + random() * 0.27;
      context.fillStyle = random() > 0.91 ? `rgba(232, 178, 112, ${alpha})` : `rgba(206, 235, 255, ${alpha})`;
      context.fillRect(x, y, 0.5 + random() * 0.95, 0.5 + random() * 0.95);
    }

    const glow = context.createRadialGradient(sourceX, sourceY, 0, sourceX, sourceY, bounds.width * 0.18);
    glow.addColorStop(0, "rgba(198,218,226,.54)");
    glow.addColorStop(0.08, "rgba(174,196,207,.3)");
    glow.addColorStop(0.34, "rgba(75,126,153,.13)");
    glow.addColorStop(1, "rgba(27,104,158,0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, bounds.width, bounds.height);
    context.globalCompositeOperation = "source-over";

    context.save();
    context.translate(sourceX - 9, sourceY + 32);
    context.scale(Math.max(0.72, bounds.width / 920), Math.max(0.72, bounds.width / 920));
    context.fillStyle = "rgba(1, 3, 7, .98)";
    context.strokeStyle = "rgba(132, 159, 173, .22)";
    context.lineWidth = 1;
    context.beginPath();
    context.ellipse(0, -12, 4.5, 5.5, 0, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.beginPath();
    context.moveTo(-4, -5);
    context.quadraticCurveTo(-9, 5, -8, 19);
    context.lineTo(-12, 32);
    context.quadraticCurveTo(0, 38, 11, 31);
    context.lineTo(7, 17);
    context.quadraticCurveTo(9, 3, 4, -5);
    context.closePath();
    context.fill();
    context.restore();
  };

  draw();
  window.addEventListener("resize", draw, { passive: true });
};

drawDeepSpace();

let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    canvas: focusCanvas,
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
    premultipliedAlpha: true,
  });
} catch (error) {
  console.warn("Three.js 初始化失败，已切换到 Canvas 备用渲染。", error);
  drawFallback(focusCanvas);
}

if (renderer) {
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.sortObjects = true;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
  camera.position.set(0, 0, 8.4);

  const nebula = new THREE.Group();
  nebula.rotation.set(-0.12, -0.08, -0.08);
  scene.add(nebula);

  const whiteGlow = createGlowTexture([
    [0, "rgba(222,234,238,.76)"],
    [0.035, "rgba(211,225,231,.68)"],
    [0.12, "rgba(159,184,197,.38)"],
    [0.32, "rgba(82,132,159,.16)"],
    [0.68, "rgba(30,78,105,.045)"],
    [1, "rgba(0,0,0,0)"],
  ]);
  const coolGlow = createGlowTexture([
    [0, "rgba(169,198,211,.36)"],
    [0.15, "rgba(83,128,151,.18)"],
    [0.52, "rgba(28,70,94,.07)"],
    [1, "rgba(0,0,0,0)"],
  ]);
  const warmGlow = createGlowTexture([
    [0, "rgba(218,192,160,.38)"],
    [0.14, "rgba(168,116,74,.16)"],
    [0.58, "rgba(95,58,34,.035)"],
    [1, "rgba(0,0,0,0)"],
  ]);
  const shadowTexture = createGlowTexture([
    [0, "rgba(0,2,7,.94)"],
    [0.38, "rgba(0,2,8,.72)"],
    [0.72, "rgba(0,2,8,.22)"],
    [1, "rgba(0,0,0,0)"],
  ]);

  const farBloom = createSoftSprite({
    texture: coolGlow,
    opacity: 0.4,
    scale: [6.8, 4.4],
    position: [0.35, 0.12, -1.8],
    order: 0,
  });
  const upperBeam = createSoftSprite({
    texture: coolGlow,
    opacity: 0.22,
    scale: [7.6, 1.5],
    position: [-1.55, 1.08, -1.15],
    rotation: -0.42,
    order: 1,
  });
  const lowerBeam = createSoftSprite({
    texture: warmGlow,
    opacity: 0.12,
    scale: [5.8, 0.72],
    position: [-1.4, -0.38, -1.05],
    rotation: 0.08,
    order: 1,
  });
  nebula.add(farBloom, upperBeam, lowerBeam);

  const particleCount = compactViewport.matches ? 24000 : 42000;
  const positions = new Float32Array(particleCount * 3);
  const data = new Float32Array(particleCount * 4);
  const style = new Float32Array(particleCount * 4);
  const random = createRandom(20260912);

  for (let index = 0; index < particleCount; index += 1) {
    const offset3 = index * 3;
    const offset4 = index * 4;
    const branch = random() > 0.82 ? 1 : 0;
    const progress = Math.pow(random(), branch ? 1.08 : 0.94);
    const spread = random() + random() + random() - 1.5;
    const vertical = random() + random() - 1;
    const seed = random();

    positions[offset3] = 0;
    positions[offset3 + 1] = 0;
    positions[offset3 + 2] = 0;
    data[offset4] = progress;
    data[offset4 + 1] = spread;
    data[offset4 + 2] = vertical;
    data[offset4 + 3] = seed;
    style[offset4] = 0.22 + Math.pow(random(), 5.2) * 0.88;
    style[offset4 + 1] = branch;
    style[offset4 + 2] = random();
    style[offset4 + 3] = 0.12 + Math.pow(random(), 0.82) * 0.44;
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute("aData", new THREE.BufferAttribute(data, 4));
  particleGeometry.setAttribute("aStyle", new THREE.BufferAttribute(style, 4));

  const particleMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uMotion: { value: reducedMotion.matches ? 0 : 1 },
      uPointer: { value: new THREE.Vector2(20, 20) },
      uHover: { value: 0 },
    },
    vertexShader: `
      uniform float uTime;
      uniform float uPixelRatio;
      uniform float uMotion;
      uniform vec2 uPointer;
      uniform float uHover;
      attribute vec4 aData;
      attribute vec4 aStyle;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vSeed;

      void main() {
        float branch = aStyle.y;
        float drift = uTime * (0.006 + aData.w * 0.004) * uMotion;
        float progress = fract(aData.x + drift * mix(1.0, 0.7, branch));
        float filament = (floor(aData.w * 7.0) / 6.0 - 0.5) * progress;
        float upperFlow = pow(progress, 1.12) * 3.35 + sin(progress * 2.75) * 0.42 + filament * 1.5;
        float lowerFlow = -0.16 - pow(progress, 1.32) * 0.92 + sin(progress * 3.4 + 0.8) * 0.18 + filament * 0.42;
        vec3 transformed = vec3(
          -pow(progress, 0.84) * mix(6.55, 5.55, branch) + 0.28 * progress * progress,
          mix(upperFlow, lowerFlow, branch) + aData.y * mix(0.07, 1.02, progress),
          aData.z * mix(0.12, 1.62, progress) + sin(progress * 8.0 + aData.w * 13.0) * mix(0.04, 0.22, progress)
        );

        vec2 pointerDelta = transformed.xy - uPointer;
        float pointerInfluence = exp(-dot(pointerDelta, pointerDelta) * 0.78) * uHover;
        vec2 pointerTangent = normalize(vec2(-pointerDelta.y, pointerDelta.x) + vec2(0.0001));
        vec2 pointerRadial = normalize(pointerDelta + vec2(0.0001));
        transformed.xy += (pointerTangent * 0.9 + pointerRadial * 0.32) * pointerInfluence * (0.22 + aData.w * 0.38);
        transformed.z += pointerInfluence * (0.18 + aData.w * 0.28);

        vec4 viewPosition = modelViewMatrix * vec4(transformed, 1.0);
        gl_Position = projectionMatrix * viewPosition;
        float perspective = 31.0 / max(2.0, -viewPosition.z);
        float coreBoost = 1.0 + (1.0 - smoothstep(0.0, 0.32, progress)) * 0.34;
        gl_PointSize = clamp(aStyle.x * uPixelRatio * perspective * coreBoost * (1.0 + pointerInfluence * 0.52), 0.72, 4.2 * uPixelRatio);

        vec3 ice = vec3(0.47, 0.65, 0.75);
        vec3 white = vec3(0.86, 0.9, 0.92);
        vec3 amber = vec3(0.68, 0.43, 0.27);
        vec3 baseColor = mix(ice, white, smoothstep(0.16, 0.8, aStyle.z));
        vColor = mix(baseColor, amber, step(0.975, aStyle.z) * 0.34);
        vAlpha = aStyle.w * smoothstep(0.0, 0.035, progress) * (1.0 - smoothstep(0.9, 1.0, progress) * 0.4) * (1.0 + pointerInfluence * 0.48);
        vSeed = aData.w;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vSeed;

      void main() {
        vec2 centered = gl_PointCoord - 0.5;
        float distanceToCenter = length(centered);
        float softDisc = 1.0 - smoothstep(0.13, 0.5, distanceToCenter);
        float hotCore = 1.0 - smoothstep(0.0, 0.14, distanceToCenter);
        float twinkle = 0.88 + 0.12 * sin(uTime * (0.48 + vSeed * 0.9) + vSeed * 21.0);
        float alpha = softDisc * vAlpha * twinkle;
        if (alpha < 0.012) discard;
        gl_FragColor = vec4(vColor * (0.69 + hotCore * 0.42), alpha);
      }
    `,
  });

  const particleField = new THREE.Points(particleGeometry, particleMaterial);
  particleField.renderOrder = 2;
  nebula.add(particleField);

  const dustCount = compactViewport.matches ? 1100 : 1900;
  const dustPositions = new Float32Array(dustCount * 3);
  const dustRandom = createRandom(81173);
  for (let index = 0; index < dustCount; index += 1) {
    const offset = index * 3;
    const angle = -1.05 + dustRandom() * 4.7;
    const radius = 1.25 + Math.pow(dustRandom(), 0.7) * 6.8;
    dustPositions[offset] = Math.cos(angle) * radius + 0.5;
    dustPositions[offset + 1] = Math.sin(angle) * radius * 0.53 - 0.28;
    dustPositions[offset + 2] = 0.4 + dustRandom() * 3.6;
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
  const dustMaterial = new THREE.PointsMaterial({
    color: 0x7291a0,
    map: coolGlow,
    size: 0.055,
    opacity: 0.28,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const foregroundDust = new THREE.Points(dustGeometry, dustMaterial);
  foregroundDust.renderOrder = 3;
  nebula.add(foregroundDust);

  const sourceBloom = createSoftSprite({
    texture: whiteGlow,
    opacity: 0.34,
    scale: [1.8, 1.8],
    position: [0, 0, 0.05],
    order: 5,
  });
  const sourceCore = createSoftSprite({
    texture: whiteGlow,
    opacity: 0.44,
    scale: [0.3, 0.3],
    position: [0, 0, 0.18],
    order: 6,
  });
  const sourceFlare = createSoftSprite({
    texture: whiteGlow,
    opacity: 0.1,
    scale: [2.7, 0.075],
    position: [0, 0, 0.2],
    rotation: -0.12,
    order: 6,
  });
  const shadowPocket = createSoftSprite({
    texture: shadowTexture,
    color: 0x010308,
    opacity: 0.89,
    scale: [3.08, 2.28],
    position: [-1.22, -0.18, 0.65],
    rotation: -0.12,
    order: 4,
    blending: THREE.NormalBlending,
  });
  const voidRim = createSoftSprite({
    texture: coolGlow,
    opacity: 0.19,
    scale: [3.58, 2.74],
    position: [-1.22, -0.18, 0.48],
    rotation: -0.12,
    order: 3,
  });
  const figureShadow = createSoftSprite({
    texture: shadowTexture,
    color: 0x000106,
    opacity: 0.72,
    scale: [0.78, 0.13],
    position: [-0.16, -0.81, 0.86],
    rotation: -0.08,
    order: 6,
    blending: THREE.NormalBlending,
  });
  const figureHalo = createSoftSprite({
    texture: coolGlow,
    opacity: 0.29,
    scale: [0.84, 1.26],
    position: [-0.16, -0.59, 0.74],
    order: 5,
  });
  const lonelyFigure = createSoftSprite({
    texture: createSilhouetteTexture(),
    opacity: 0.98,
    scale: [0.24, 0.48],
    position: [-0.16, -0.61, 0.9],
    order: 7,
    blending: THREE.NormalBlending,
  });
  const lensShadow = createSoftSprite({
    texture: shadowTexture,
    color: 0x02050a,
    opacity: 0,
    scale: [1.18, 1.18],
    position: [20, 20, 0.78],
    order: 7,
    blending: THREE.NormalBlending,
  });
  nebula.add(voidRim, shadowPocket, sourceBloom, sourceCore, sourceFlare, figureHalo, figureShadow, lonelyFigure, lensShadow);

  const timer = new THREE.Timer();
  timer.connect(document);
  const pointer = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  const gravityPointer = new THREE.Vector2(20, 20);
  const gravityPointerTarget = new THREE.Vector2(20, 20);
  let hoverAmount = 0;
  let hoverTarget = 0;
  let visible = true;
  let frame = 0;

  const resize = () => {
    drawDeepSpace();
    const bounds = focusCanvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, compactViewport.matches ? 1.15 : 1.35);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(Math.max(1, bounds.width), Math.max(1, bounds.height), false);
    camera.aspect = Math.max(0.1, bounds.width / Math.max(1, bounds.height));
    camera.updateProjectionMatrix();
    particleMaterial.uniforms.uPixelRatio.value = pixelRatio;

    if (compactViewport.matches) {
      nebula.position.set(0.2, -0.36, 0);
      nebula.scale.setScalar(0.78);
      lonelyFigure.scale.set(0.29, 0.58, 1);
      figureHalo.material.opacity = 0.34;
    } else {
      nebula.position.set(0.76, -0.02, 0);
      nebula.scale.setScalar(0.96);
      lonelyFigure.scale.set(0.24, 0.48, 1);
      figureHalo.material.opacity = 0.29;
    }
  };

  const render = (timestamp) => {
    timer.update(timestamp);
    const elapsed = timer.getElapsed();
    particleMaterial.uniforms.uTime.value = elapsed;
    particleMaterial.uniforms.uMotion.value = reducedMotion.matches ? 0 : 1;

    pointer.lerp(pointerTarget, 0.035);
    gravityPointer.lerp(gravityPointerTarget, 0.08);
    hoverAmount += (hoverTarget - hoverAmount) * 0.075;
    particleMaterial.uniforms.uPointer.value.copy(gravityPointer);
    particleMaterial.uniforms.uHover.value = hoverAmount;

    camera.position.x = pointer.x * 0.28;
    camera.position.y = pointer.y * 0.2;
    camera.lookAt(0, 0, 0);
    nebula.rotation.z = -0.08 + pointer.x * 0.038 + Math.sin(elapsed * 0.06) * 0.009;
    nebula.rotation.x = -0.12 - pointer.y * 0.03;
    foregroundDust.rotation.z = elapsed * 0.002;

    const pulse = 1 + Math.sin(elapsed * 0.42) * 0.025;
    sourceBloom.scale.set(1.8 * pulse, 1.8 * pulse, 1);
    sourceBloom.material.opacity = 0.31 + Math.sin(elapsed * 0.34) * 0.028;
    sourceCore.material.opacity = 0.4 + Math.sin(elapsed * 0.3) * 0.028;
    upperBeam.material.opacity = 0.18 + Math.sin(elapsed * 0.24) * 0.022;

    lensShadow.position.set(gravityPointer.x, gravityPointer.y, 0.78);
    const lensScale = 0.94 + Math.sin(elapsed * 0.8) * 0.035 + hoverAmount * 0.08;
    lensShadow.scale.setScalar(1.62 * lensScale);
    lensShadow.material.opacity = hoverAmount * 0.2;
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
    pointerTarget.set((event.clientX - bounds.left) / bounds.width - 0.5, 0.5 - (event.clientY - bounds.top) / bounds.height);
    visual.style.setProperty("--visual-x", `${pointerTarget.x * 16}px`);
    visual.style.setProperty("--visual-y", `${-pointerTarget.y * 12}px`);
  }, { passive: true });

  hero.addEventListener("pointerleave", () => {
    pointerTarget.set(0, 0);
    visual.style.setProperty("--visual-x", "0px");
    visual.style.setProperty("--visual-y", "0px");
  });

  const updateGravityPointer = (event) => {
    const bounds = focusCanvas.getBoundingClientRect();
    const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const normalizedY = 1 - ((event.clientY - bounds.top) / bounds.height) * 2;
    const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * camera.position.z;
    const viewWidth = viewHeight * camera.aspect;
    const sceneX = normalizedX * viewWidth * 0.5;
    const sceneY = normalizedY * viewHeight * 0.5;
    visual.style.setProperty("--lens-x", `${event.clientX - bounds.left}px`);
    visual.style.setProperty("--lens-y", `${event.clientY - bounds.top}px`);
    gravityPointerTarget.set(
      (sceneX - nebula.position.x) / nebula.scale.x,
      (sceneY - nebula.position.y) / nebula.scale.y,
    );
  };

  visual.addEventListener("pointerenter", (event) => {
    if (reducedMotion.matches || event.pointerType === "touch") return;
    hoverTarget = 1;
    updateGravityPointer(event);
    hero.classList.add("is-gravity-active");
  }, { passive: true });

  visual.addEventListener("pointermove", (event) => {
    if (reducedMotion.matches || event.pointerType === "touch") return;
    updateGravityPointer(event);
  }, { passive: true });

  visual.addEventListener("pointerleave", () => {
    hoverTarget = 0;
    gravityPointerTarget.set(20, 20);
    hero.classList.remove("is-gravity-active");
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

  const handleMotionChange = () => renderOnce();
  reducedMotion.addEventListener("change", handleMotionChange);
  compactViewport.addEventListener("change", resize);
  window.addEventListener("resize", resize, { passive: true });

  resize();
  renderOnce();
}
