(() => {
  const backgroundCanvas = document.querySelector(".galaxy-canvas");
  const focusCanvas = document.querySelector(".galaxy-focus-canvas");
  const hero = document.querySelector(".hero");

  if (!backgroundCanvas || !focusCanvas || !hero) return;

  const backgroundContext = backgroundCanvas.getContext("2d");
  const focusContext = focusCanvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const tau = Math.PI * 2;
  let resizeFrame;
  let animationFrame;
  let focusBase;
  let focusWidth = 0;
  let focusHeight = 0;
  let focusPixelRatio = 1;
  let motionParticles = [];
  let heroVisible = true;

  const createSeededRandom = (seed) => () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

  const createGaussian = (random) => () =>
    random() + random() + random() + random() + random() + random() - 3;

  const prepareCanvas = (canvas, context) => {
    const bounds = canvas.getBoundingClientRect();
    const width = Math.round(bounds.width);
    const height = Math.round(bounds.height);
    if (!width || !height) return null;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    return { width, height, pixelRatio };
  };

  const drawBackground = () => {
    const metrics = prepareCanvas(backgroundCanvas, backgroundContext);
    if (!metrics) return;

    const { width, height } = metrics;
    const random = createSeededRandom(width * 107 + height * 211);
    const starCount = Math.min(2400, Math.max(900, Math.round((width * height) / 640)));
    backgroundContext.clearRect(0, 0, width, height);

    const haze = backgroundContext.createRadialGradient(
      width * 0.77,
      height * 0.54,
      0,
      width * 0.77,
      height * 0.54,
      Math.max(width, height) * 0.52,
    );
    haze.addColorStop(0, "rgba(48, 103, 151, 0.11)");
    haze.addColorStop(0.42, "rgba(18, 49, 82, 0.055)");
    haze.addColorStop(1, "rgba(2, 3, 9, 0)");
    backgroundContext.fillStyle = haze;
    backgroundContext.fillRect(0, 0, width, height);

    backgroundContext.save();
    backgroundContext.globalCompositeOperation = "lighter";

    for (let index = 0; index < starCount; index += 1) {
      const x = random() * width;
      const y = random() * height;
      const depth = Math.pow(random(), 2.1);
      const copyShield = x < width * 0.48 ? 0.38 : 1;
      const size = 0.28 + depth * 1.18;
      const alpha = (0.08 + depth * 0.5) * copyShield;
      const color = random();

      if (color > 0.982) {
        backgroundContext.fillStyle = `rgba(236, 183, 108, ${alpha})`;
      } else if (color > 0.86) {
        backgroundContext.fillStyle = `rgba(113, 194, 255, ${alpha})`;
      } else {
        backgroundContext.fillStyle = `rgba(229, 239, 249, ${alpha})`;
      }

      backgroundContext.fillRect(x, y, size, size);
    }

    const dustCount = Math.min(5200, Math.max(1800, Math.round((width * height) / 230)));
    const gaussian = createGaussian(random);
    for (let index = 0; index < dustCount; index += 1) {
      const progress = random();
      const x = width * (0.38 + progress * 0.78) + gaussian() * width * 0.045;
      const curve = height * (0.86 - Math.sin(progress * Math.PI) * 0.14);
      const y = curve + gaussian() * height * (0.025 + progress * 0.028);
      if (x < 0 || x > width || y < 0 || y > height) continue;

      const alpha = 0.035 + random() * 0.22;
      backgroundContext.fillStyle =
        random() > 0.88
          ? `rgba(91, 178, 237, ${alpha})`
          : `rgba(220, 232, 244, ${alpha})`;
      const size = 0.25 + random() * 0.72;
      backgroundContext.fillRect(x, y, size, size);
    }
    backgroundContext.restore();
  };

  const getRibbonPoint = (progress, lane, width, height) => {
    const angle = progress * tau;
    const compact = width < 520;
    const radiusX = width * (compact ? 0.44 : 0.45);
    const radiusY = height * (compact ? 0.2 : 0.235);
    const centerX = width * 0.5;
    const centerY = height * (compact ? 0.56 : 0.53);
    const localX = Math.sin(angle) * radiusX;
    const localY = Math.sin(angle * 2) * radiusY;
    const derivativeX = Math.cos(angle) * radiusX;
    const derivativeY = Math.cos(angle * 2) * radiusY * 2;
    const tangentLength = Math.hypot(derivativeX, derivativeY) || 1;
    const normalX = -derivativeY / tangentLength;
    const normalY = derivativeX / tangentLength;
    const outerStrength = 0.42 + Math.abs(Math.sin(angle)) * 0.78;
    const spread = height * (compact ? 0.073 : 0.082) * outerStrength;
    const rotation = -0.055;
    const offsetX = localX + normalX * lane * spread;
    const offsetY = localY + normalY * lane * spread;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);

    return {
      x: centerX + offsetX * cos - offsetY * sin,
      y: centerY + offsetX * sin + offsetY * cos,
      tangentX: (derivativeX * cos - derivativeY * sin) / tangentLength,
      tangentY: (derivativeX * sin + derivativeY * cos) / tangentLength,
      centerX,
      centerY,
    };
  };

  const drawObserver = (context, width, height) => {
    const point = getRibbonPoint(0, 0, width, height);
    const unit = Math.max(0.78, Math.min(width, height) / 500);
    const x = point.x + width * 0.004;
    const groundY = point.y + 19 * unit;

    context.save();
    context.lineCap = "round";
    context.lineJoin = "round";
    context.shadowColor = "rgba(216, 238, 255, 0.58)";
    context.shadowBlur = 4 * unit;
    context.fillStyle = "#02040a";
    context.strokeStyle = "#02040a";
    context.lineWidth = 3.1 * unit;
    context.beginPath();
    context.arc(x, groundY - 17 * unit, 3.5 * unit, 0, tau);
    context.fill();
    context.beginPath();
    context.moveTo(x, groundY - 13 * unit);
    context.lineTo(x - 1.3 * unit, groundY - 5.2 * unit);
    context.lineTo(x - 5.1 * unit, groundY);
    context.moveTo(x - 1.2 * unit, groundY - 5.4 * unit);
    context.lineTo(x + 4.5 * unit, groundY);
    context.moveTo(x - 0.2 * unit, groundY - 10 * unit);
    context.lineTo(x + 5.2 * unit, groundY - 7 * unit);
    context.stroke();
    context.restore();
  };

  const drawFocusBase = () => {
    const metrics = prepareCanvas(focusCanvas, focusContext);
    if (!metrics) return;

    focusWidth = metrics.width;
    focusHeight = metrics.height;
    focusPixelRatio = metrics.pixelRatio;
    focusBase = document.createElement("canvas");
    focusBase.width = focusCanvas.width;
    focusBase.height = focusCanvas.height;
    const context = focusBase.getContext("2d");
    context.setTransform(focusPixelRatio, 0, 0, focusPixelRatio, 0, 0);

    const random = createSeededRandom(focusWidth * 313 + focusHeight * 571);
    const gaussian = createGaussian(random);
    const particleCount = Math.min(
      focusWidth < 520 ? 17000 : 30000,
      Math.max(12500, Math.round((focusWidth * focusHeight) / 15)),
    );

    const center = getRibbonPoint(0, 0, focusWidth, focusHeight);
    const coreGlow = context.createRadialGradient(
      center.x,
      center.y,
      0,
      center.x,
      center.y,
      focusHeight * 0.2,
    );
    coreGlow.addColorStop(0, "rgba(237, 249, 255, 0.33)");
    coreGlow.addColorStop(0.12, "rgba(133, 206, 255, 0.15)");
    coreGlow.addColorStop(0.48, "rgba(39, 115, 183, 0.055)");
    coreGlow.addColorStop(1, "rgba(9, 24, 43, 0)");
    context.fillStyle = coreGlow;
    context.fillRect(0, 0, focusWidth, focusHeight);

    context.save();
    context.globalCompositeOperation = "lighter";

    for (let index = 0; index < particleCount; index += 1) {
      const progress = random();
      const mistParticle = random() > 0.79;
      const lane = gaussian() * (mistParticle ? 1.28 : 0.58);
      const point = getRibbonPoint(progress, lane, focusWidth, focusHeight);
      const centerWeight = Math.exp(-Math.abs(lane) * (mistParticle ? 0.58 : 1.18));
      const crossingWeight = Math.exp(-Math.pow(Math.min(progress, 1 - progress) / 0.085, 2));
      const depth = Math.pow(random(), 2.2);
      const alpha = Math.min(
        0.96,
        (mistParticle ? 0.035 : 0.11) + centerWeight * (0.2 + depth * 0.43) + crossingWeight * 0.15,
      );
      const bright = !mistParticle && random() > 0.982;
      const size = bright ? 1.45 + random() * 1.7 : 0.28 + depth * 1.12;
      const color = random();

      if (color > 0.974) {
        context.fillStyle = `rgba(231, 173, 104, ${alpha * 0.82})`;
      } else if (color > 0.805) {
        context.fillStyle = `rgba(87, 177, 240, ${alpha * 0.88})`;
      } else if (color > 0.54) {
        context.fillStyle = `rgba(170, 205, 231, ${alpha})`;
      } else {
        context.fillStyle = `rgba(238, 244, 249, ${alpha})`;
      }

      if (bright) {
        context.shadowColor = context.fillStyle;
        context.shadowBlur = 4;
      } else {
        context.shadowBlur = 0;
      }
      context.fillRect(point.x, point.y, size, size);
    }

    context.shadowBlur = 0;
    for (let index = 0; index < 820; index += 1) {
      const progress = random();
      const lane = gaussian() * 0.54;
      const point = getRibbonPoint(progress, lane, focusWidth, focusHeight);
      const length = 0.7 + random() * 3.2;
      context.beginPath();
      context.moveTo(point.x - point.tangentX * length, point.y - point.tangentY * length);
      context.lineTo(point.x + point.tangentX * length, point.y + point.tangentY * length);
      context.strokeStyle = `rgba(216, 236, 249, ${0.05 + random() * 0.19})`;
      context.lineWidth = 0.35 + random() * 0.65;
      context.stroke();
    }
    context.restore();

    drawObserver(context, focusWidth, focusHeight);

    motionParticles = Array.from({ length: focusWidth < 520 ? 58 : 96 }, () => ({
      phase: random(),
      lane: gaussian() * 0.38,
      speed: 0.008 + random() * 0.024,
      size: 0.7 + random() * 1.6,
      alpha: 0.28 + random() * 0.55,
      warm: random() > 0.92,
    }));
  };

  const drawFocusFrame = (time = 0) => {
    if (!focusBase || !focusWidth || !focusHeight) return;

    focusContext.setTransform(focusPixelRatio, 0, 0, focusPixelRatio, 0, 0);
    focusContext.clearRect(0, 0, focusWidth, focusHeight);
    focusContext.drawImage(focusBase, 0, 0, focusWidth, focusHeight);
    focusContext.save();
    focusContext.globalCompositeOperation = "lighter";

    const seconds = time / 1000;
    for (const particle of motionParticles) {
      const progress = (particle.phase + seconds * particle.speed) % 1;
      const point = getRibbonPoint(progress, particle.lane, focusWidth, focusHeight);
      const tail = Math.max(1.8, particle.size * 3.2);
      focusContext.beginPath();
      focusContext.moveTo(point.x - point.tangentX * tail, point.y - point.tangentY * tail);
      focusContext.lineTo(point.x, point.y);
      focusContext.strokeStyle = particle.warm
        ? `rgba(241, 191, 112, ${particle.alpha})`
        : `rgba(195, 231, 255, ${particle.alpha})`;
      focusContext.lineWidth = particle.size;
      focusContext.shadowColor = focusContext.strokeStyle;
      focusContext.shadowBlur = 6;
      focusContext.stroke();
    }

    const center = getRibbonPoint(0, 0, focusWidth, focusHeight);
    const pulse = 8 + (Math.sin(seconds * 1.25) + 1) * 3;
    const glow = focusContext.createRadialGradient(center.x, center.y, 0, center.x, center.y, pulse * 4.2);
    glow.addColorStop(0, "rgba(239, 249, 255, 0.34)");
    glow.addColorStop(0.22, "rgba(116, 196, 247, 0.12)");
    glow.addColorStop(1, "rgba(70, 154, 218, 0)");
    focusContext.fillStyle = glow;
    focusContext.fillRect(center.x - pulse * 4.2, center.y - pulse * 4.2, pulse * 8.4, pulse * 8.4);
    focusContext.restore();

    if (!reducedMotion.matches && heroVisible) {
      animationFrame = window.requestAnimationFrame(drawFocusFrame);
    }
  };

  const restartAnimation = () => {
    window.cancelAnimationFrame(animationFrame);
    drawFocusFrame(performance.now());
  };

  const drawAll = () => {
    drawBackground();
    drawFocusBase();
    restartAnimation();
  };

  const scheduleDraw = () => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(drawAll);
  };

  new ResizeObserver(scheduleDraw).observe(hero);
  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    if (heroVisible) restartAnimation();
    else window.cancelAnimationFrame(animationFrame);
  }).observe(hero);

  reducedMotion.addEventListener?.("change", restartAnimation);
  scheduleDraw();
})();
