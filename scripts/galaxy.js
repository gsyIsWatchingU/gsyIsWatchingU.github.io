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
  background.addColorStop(0, "rgba(18, 52, 80, 0.18)");
  background.addColorStop(0.38, "rgba(5, 18, 34, 0.11)");
  background.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  const random = createRandom(20260911);
  const starCount = Math.min(1180, Math.floor((width * height) / 920));
  for (let index = 0; index < starCount; index += 1) {
    const x = random() * width;
    const y = random() * height;
    const rightBias = x / width;
    const radius = 0.25 + Math.pow(random(), 6) * 1.35;
    const alpha = (0.1 + Math.pow(random(), 2.8) * 0.68) * (0.62 + rightBias * 0.38);
    const warm = random() > 0.94;

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
      const alpha = 0.06 + random() * 0.32;
      context.fillStyle = random() > 0.91 ? `rgba(232, 178, 112, ${alpha})` : `rgba(206, 235, 255, ${alpha})`;
      context.fillRect(x, y, 0.5 + random() * 0.95, 0.5 + random() * 0.95);
    }

    const glow = context.createRadialGradient(sourceX, sourceY, 0, sourceX, sourceY, bounds.width * 0.18);
    glow.addColorStop(0, "rgba(255,255,255,.95)");
    glow.addColorStop(0.08, "rgba(255,218,166,.62)");
    glow.addColorStop(0.34, "rgba(109,192,245,.2)");
    glow.addColorStop(1, "rgba(27,104,158,0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, bounds.width, bounds.height);
    context.globalCompositeOperation = "source-over";
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
  renderer.toneMappingExposure = 1.08;
  renderer.sortObjects = true;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
  camera.position.set(0, 0, 8.4);

  const nebula = new THREE.Group();
  nebula.rotation.set(-0.12, -0.08, -0.08);
  scene.add(nebula);

  const whiteGlow = createGlowTexture([
    [0, "rgba(255,255,255,1)"],
    [0.035, "rgba(255,250,235,.98)"],
    [0.12, "rgba(255,207,145,.72)"],
    [0.32, "rgba(115,201,255,.28)"],
    [0.68, "rgba(39,126,184,.075)"],
    [1, "rgba(0,0,0,0)"],
  ]);
  const coolGlow = createGlowTexture([
    [0, "rgba(196,232,255,.58)"],
    [0.15, "rgba(92,177,236,.28)"],
    [0.52, "rgba(31,102,161,.1)"],
    [1, "rgba(0,0,0,0)"],
  ]);
  const warmGlow = createGlowTexture([
    [0, "rgba(255,235,206,.78)"],
    [0.14, "rgba(224,154,87,.32)"],
    [0.58, "rgba(119,66,34,.07)"],
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
    opacity: 0.72,
    scale: [6.8, 4.4],
    position: [0.35, 0.12, -1.8],
    order: 0,
  });
  const upperBeam = createSoftSprite({
    texture: coolGlow,
    opacity: 0.4,
    scale: [7.6, 1.5],
    position: [-1.55, 1.08, -1.15],
    rotation: -0.42,
    order: 1,
  });
  const lowerBeam = createSoftSprite({
    texture: warmGlow,
    opacity: 0.24,
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
    style[offset4 + 3] = 0.12 + Math.pow(random(), 0.76) * 0.48;
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
    },
    vertexShader: `
      uniform float uTime;
      uniform float uPixelRatio;
      uniform float uMotion;
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

        vec4 viewPosition = modelViewMatrix * vec4(transformed, 1.0);
        gl_Position = projectionMatrix * viewPosition;
        float perspective = 31.0 / max(2.0, -viewPosition.z);
        float coreBoost = 1.0 + (1.0 - smoothstep(0.0, 0.32, progress)) * 0.85;
        gl_PointSize = clamp(aStyle.x * uPixelRatio * perspective * coreBoost, 0.72, 4.8 * uPixelRatio);

        vec3 ice = vec3(0.58, 0.82, 1.0);
        vec3 white = vec3(0.96, 0.99, 1.0);
        vec3 amber = vec3(1.0, 0.66, 0.34);
        vec3 baseColor = mix(ice, white, smoothstep(0.16, 0.8, aStyle.z));
        vColor = mix(baseColor, amber, step(0.91, aStyle.z) * (0.45 + (1.0 - progress) * 0.28));
        vAlpha = aStyle.w * smoothstep(0.0, 0.035, progress) * (1.0 - smoothstep(0.9, 1.0, progress) * 0.38);
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
        float twinkle = 0.76 + 0.24 * sin(uTime * (0.7 + vSeed * 1.7) + vSeed * 21.0);
        float alpha = softDisc * vAlpha * twinkle;
        if (alpha < 0.012) discard;
        gl_FragColor = vec4(vColor * (0.68 + hotCore * 0.62), alpha);
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
    color: 0xaedcff,
    map: coolGlow,
    size: 0.055,
    opacity: 0.38,
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
    opacity: 0.94,
    scale: [2.5, 2.5],
    position: [0, 0, 0.05],
    order: 5,
  });
  const sourceCore = createSoftSprite({
    texture: whiteGlow,
    opacity: 1,
    scale: [0.72, 0.72],
    position: [0, 0, 0.18],
    order: 6,
  });
  const sourceFlare = createSoftSprite({
    texture: whiteGlow,
    opacity: 0.48,
    scale: [3.9, 0.16],
    position: [0, 0, 0.2],
    rotation: -0.12,
    order: 6,
  });
  const shadowPocket = createSoftSprite({
    texture: shadowTexture,
    color: 0x010308,
    opacity: 0.87,
    scale: [3.8, 1.46],
    position: [-1.08, -0.56, 0.65],
    rotation: 0.08,
    order: 4,
    blending: THREE.NormalBlending,
  });
  nebula.add(shadowPocket, sourceBloom, sourceCore, sourceFlare);

  const timer = new THREE.Timer();
  timer.connect(document);
  const pointer = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
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
    } else {
      nebula.position.set(0.76, -0.02, 0);
      nebula.scale.setScalar(0.96);
    }
  };

  const render = (timestamp) => {
    timer.update(timestamp);
    const elapsed = timer.getElapsed();
    particleMaterial.uniforms.uTime.value = elapsed;
    particleMaterial.uniforms.uMotion.value = reducedMotion.matches ? 0 : 1;

    pointer.lerp(pointerTarget, 0.035);
    camera.position.x = pointer.x * 0.16;
    camera.position.y = pointer.y * 0.12;
    camera.lookAt(0, 0, 0);
    nebula.rotation.z = -0.08 + pointer.x * 0.022 + Math.sin(elapsed * 0.08) * 0.012;
    nebula.rotation.x = -0.12 - pointer.y * 0.018;
    foregroundDust.rotation.z = elapsed * 0.002;

    const pulse = 1 + Math.sin(elapsed * 0.72) * 0.04;
    sourceBloom.scale.set(2.5 * pulse, 2.5 * pulse, 1);
    sourceBloom.material.opacity = 0.88 + Math.sin(elapsed * 0.58) * 0.06;
    upperBeam.material.opacity = 0.36 + Math.sin(elapsed * 0.31) * 0.045;
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
    visual.style.setProperty("--visual-x", `${pointerTarget.x * 7}px`);
    visual.style.setProperty("--visual-y", `${-pointerTarget.y * 5}px`);
  }, { passive: true });

  hero.addEventListener("pointerleave", () => {
    pointerTarget.set(0, 0);
    visual.style.setProperty("--visual-x", "0px");
    visual.style.setProperty("--visual-y", "0px");
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
