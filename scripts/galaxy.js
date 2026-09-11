(() => {
  const backgroundCanvas = document.querySelector(".galaxy-canvas");
  const focusCanvas = document.querySelector(".galaxy-focus-canvas");
  const hero = document.querySelector(".hero");

  if (!backgroundCanvas || !focusCanvas || !hero) return;

  const backgroundContext = backgroundCanvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const tau = Math.PI * 2;
  let resizeFrame;

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
    const renderWidth = Math.round(width * pixelRatio);
    const renderHeight = Math.round(height * pixelRatio);
    if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
      canvas.width = renderWidth;
      canvas.height = renderHeight;
    }
    context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    return { width, height, pixelRatio, renderWidth, renderHeight };
  };

  const drawBackground = () => {
    const metrics = prepareCanvas(backgroundCanvas, backgroundContext);
    if (!metrics) return;

    const { width, height } = metrics;
    const random = createSeededRandom(width * 107 + height * 211);
    const gaussian = createGaussian(random);
    const starCount = Math.min(2700, Math.max(1100, Math.round((width * height) / 520)));
    backgroundContext.clearRect(0, 0, width, height);

    const haze = backgroundContext.createRadialGradient(
      width * 0.78,
      height * 0.5,
      0,
      width * 0.78,
      height * 0.5,
      Math.max(width, height) * 0.6,
    );
    haze.addColorStop(0, "rgba(48, 97, 137, 0.105)");
    haze.addColorStop(0.46, "rgba(13, 40, 69, 0.045)");
    haze.addColorStop(1, "rgba(2, 3, 9, 0)");
    backgroundContext.fillStyle = haze;
    backgroundContext.fillRect(0, 0, width, height);

    backgroundContext.save();
    backgroundContext.globalCompositeOperation = "lighter";
    for (let index = 0; index < starCount; index += 1) {
      const x = random() * width;
      const y = random() * height;
      const depth = Math.pow(random(), 2.45);
      const copyShield = x < width * 0.48 ? 0.28 : 1;
      const alpha = (0.07 + depth * 0.48) * copyShield;
      const size = 0.25 + depth * 1.28;
      const color = random();
      backgroundContext.fillStyle =
        color > 0.987
          ? `rgba(235, 181, 107, ${alpha})`
          : color > 0.89
            ? `rgba(100, 181, 238, ${alpha})`
            : `rgba(224, 235, 245, ${alpha})`;
      backgroundContext.fillRect(x, y, size, size);
    }

    const veilCount = Math.min(3700, Math.max(1200, Math.round((width * height) / 300)));
    for (let index = 0; index < veilCount; index += 1) {
      const progress = random();
      const x = width * (0.5 + progress * 0.62) + gaussian() * width * 0.035;
      const y = height * (0.82 - progress * 0.18) + gaussian() * height * 0.055;
      if (x < 0 || x > width || y < 0 || y > height) continue;
      const alpha = 0.025 + random() * 0.12;
      backgroundContext.fillStyle =
        random() > 0.84
          ? `rgba(85, 167, 226, ${alpha})`
          : `rgba(208, 224, 238, ${alpha})`;
      const size = 0.2 + random() * 0.58;
      backgroundContext.fillRect(x, y, size, size);
    }
    backgroundContext.restore();
  };

  const drawCanvasFallback = () => {
    const context = focusCanvas.getContext("2d");
    const metrics = prepareCanvas(focusCanvas, context);
    if (!metrics) return;

    const { width, height } = metrics;
    const random = createSeededRandom(width * 431 + height * 683);
    const gaussian = createGaussian(random);
    const count = width < 520 ? 18000 : 29000;
    context.clearRect(0, 0, width, height);
    context.save();
    context.globalCompositeOperation = "lighter";

    for (let index = 0; index < count; index += 1) {
      const radius = 0.05 + Math.pow(random(), 0.7) * 1.04;
      const halo = random() > 0.78;
      const arm = halo ? random() * tau : (random() > 0.5 ? Math.PI : 0) + gaussian() * 0.34;
      const angle = arm + radius * 7.8;
      const thickness = gaussian() * (0.018 + radius * (halo ? 0.1 : 0.045));
      const localX = Math.cos(angle) * radius + Math.cos(angle + Math.PI / 2) * thickness;
      const localY = Math.sin(angle) * radius * 0.58 + Math.sin(angle + Math.PI / 2) * thickness;
      const x = width * 0.5 + localX * width * 0.43;
      const y = height * 0.51 + (localY - localX * 0.14) * height * 0.68;
      const alpha = halo ? 0.08 + random() * 0.19 : 0.15 + random() * 0.46;
      const size = 0.3 + Math.pow(random(), 2.2) * 1.8;
      const color = random();
      context.fillStyle =
        color > 0.975
          ? `rgba(238, 186, 111, ${alpha})`
          : color > 0.79
            ? `rgba(105, 188, 244, ${alpha})`
            : `rgba(229, 239, 247, ${alpha})`;
      context.fillRect(x, y, size, size);
    }
    context.restore();
  };

  const createShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(message || "Galaxy shader compilation failed");
    }
    return shader;
  };

  const createGalaxyRenderer = () => {
    const gl = focusCanvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
    });

    if (!gl) {
      drawCanvasFallback();
      return { resize: drawCanvasFallback, destroy: () => {} };
    }

    const vertexSource = `
      precision highp float;

      attribute vec4 aParticle;
      attribute vec4 aStyle;

      uniform float uTime;
      uniform float uPixelRatio;
      uniform float uMotion;
      uniform vec2 uPointer;

      varying float vAlpha;
      varying float vColor;
      varying float vSpark;

      void main() {
        float seed = aParticle.w;
        float flow = uTime * (0.028 + seed * 0.014) * uMotion;
        float radialPhase = fract(aParticle.x - flow);
        float radius = 0.05 + pow(radialPhase, 0.7) * 1.05;
        float breathing = sin(uTime * 0.32 + seed * 13.0) * 0.018 * uMotion;
        float angle = aParticle.y + radius * 7.85 + uTime * 0.095 * uMotion + breathing;
        float thickness = aParticle.z * (0.022 + radius * 0.075);

        float localX = cos(angle) * radius + cos(angle + 1.5707963) * thickness;
        float localY = sin(angle) * radius * 0.58 + sin(angle + 1.5707963) * thickness * 0.82;
        localY -= localX * 0.135;

        float parallax = 0.012 + seed * 0.018;
        vec2 position = vec2(localX * 0.88, localY * 1.04);
        position += uPointer * parallax;

        float coreLight = exp(-pow((radius - 0.11) / 0.14, 2.0));
        float innerLight = exp(-pow((radius - 0.28) / 0.24, 2.0));
        float edgeFade = 1.0 - smoothstep(0.78, 1.1, radius);
        float twinkle = 0.72 + 0.28 * sin(uTime * (0.72 + seed) + seed * 41.0) * uMotion;

        gl_Position = vec4(position, 0.0, 1.0);
        gl_PointSize = min(
          8.0 * uPixelRatio,
          aStyle.x * uPixelRatio * (0.88 + coreLight * 1.6 + aStyle.w * twinkle * 0.55)
        );

        vAlpha = aStyle.z * (0.48 + edgeFade * 0.52) * (0.82 + innerLight * 0.35) * (0.82 + twinkle * 0.18);
        vColor = aStyle.y;
        vSpark = aStyle.w;
      }
    `;

    const fragmentSource = `
      precision mediump float;

      varying float vAlpha;
      varying float vColor;
      varying float vSpark;

      void main() {
        vec2 point = gl_PointCoord - vec2(0.5);
        float distanceToCenter = length(point);
        float softness = smoothstep(0.5, 0.06, distanceToCenter);
        float sparkCore = smoothstep(0.23, 0.0, distanceToCenter) * vSpark;

        vec3 silver = vec3(0.82, 0.9, 0.97);
        vec3 ice = vec3(0.24, 0.67, 0.96);
        vec3 warm = vec3(0.98, 0.63, 0.3);
        vec3 color = silver;
        if (vColor < 0.18) {
          color = warm;
        } else if (vColor < 0.58) {
          color = ice;
        }
        color = mix(color, vec3(1.0), sparkCore * 0.68);

        gl_FragColor = vec4(color, vAlpha * softness);
      }
    `;

    let program;
    try {
      const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
      program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "Galaxy shader link failed");
      }
    } catch (error) {
      focusCanvas.classList.add("galaxy-focus-canvas--fallback");
      drawCanvasFallback();
      return { resize: drawCanvasFallback, destroy: () => {} };
    }

    const compact = focusCanvas.getBoundingClientRect().width < 520;
    const particleCount = compact ? 44000 : 76000;
    const data = new Float32Array(particleCount * 8);
    const random = createSeededRandom(94731);
    const gaussian = createGaussian(random);

    for (let index = 0; index < particleCount; index += 1) {
      const offset = index * 8;
      const halo = random() > 0.77;
      const bright = random() > 0.975;
      const color = random();
      data[offset] = random();
      data[offset + 1] = halo
        ? random() * tau
        : (random() > 0.5 ? Math.PI : 0) + gaussian() * 0.36;
      data[offset + 2] = gaussian() * (halo ? 1.7 : 0.68);
      data[offset + 3] = random();
      data[offset + 4] = bright ? 3.1 + random() * 3 : 0.72 + Math.pow(random(), 2.1) * 1.82;
      data[offset + 5] = color > 0.973 ? 0.08 : color > 0.75 ? 0.38 : 0.9;
      data[offset + 6] = halo ? 0.16 + random() * 0.27 : 0.28 + random() * 0.62;
      data[offset + 7] = bright ? 1 : Math.pow(random(), 4.2) * 0.65;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    const particleLocation = gl.getAttribLocation(program, "aParticle");
    const styleLocation = gl.getAttribLocation(program, "aStyle");
    const stride = 8 * Float32Array.BYTES_PER_ELEMENT;
    gl.enableVertexAttribArray(particleLocation);
    gl.vertexAttribPointer(particleLocation, 4, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(styleLocation);
    gl.vertexAttribPointer(styleLocation, 4, gl.FLOAT, false, stride, 4 * Float32Array.BYTES_PER_ELEMENT);

    const timeLocation = gl.getUniformLocation(program, "uTime");
    const ratioLocation = gl.getUniformLocation(program, "uPixelRatio");
    const motionLocation = gl.getUniformLocation(program, "uMotion");
    const pointerLocation = gl.getUniformLocation(program, "uPointer");
    let animationFrame;
    let visible = true;
    let pixelRatio = 1;
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;

    gl.useProgram(program);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.disable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);

    const resize = () => {
      const metrics = prepareCanvas(focusCanvas);
      if (!metrics) return;
      pixelRatio = metrics.pixelRatio;
      gl.viewport(0, 0, metrics.renderWidth, metrics.renderHeight);
    };

    const render = (timestamp = 0) => {
      pointerX += (targetPointerX - pointerX) * 0.055;
      pointerY += (targetPointerY - pointerY) * 0.055;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform1f(timeLocation, timestamp / 1000);
      gl.uniform1f(ratioLocation, pixelRatio);
      gl.uniform1f(motionLocation, reducedMotion.matches ? 0 : 1);
      gl.uniform2f(pointerLocation, pointerX, pointerY);
      gl.drawArrays(gl.POINTS, 0, particleCount);

      if (visible && !reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const restart = () => {
      window.cancelAnimationFrame(animationFrame);
      render(performance.now());
    };

    hero.addEventListener("pointermove", (event) => {
      const bounds = hero.getBoundingClientRect();
      targetPointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      targetPointerY = -((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    });
    hero.addEventListener("pointerleave", () => {
      targetPointerX = 0;
      targetPointerY = 0;
    });

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) restart();
      else window.cancelAnimationFrame(animationFrame);
    });
    observer.observe(hero);
    reducedMotion.addEventListener?.("change", restart);

    resize();
    restart();

    return {
      resize: () => {
        resize();
        restart();
      },
      destroy: () => {
        observer.disconnect();
        window.cancelAnimationFrame(animationFrame);
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
      },
    };
  };

  const galaxyRenderer = createGalaxyRenderer();

  const scheduleResize = () => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(() => {
      drawBackground();
      galaxyRenderer.resize();
    });
  };

  new ResizeObserver(scheduleResize).observe(hero);
  scheduleResize();
})();
