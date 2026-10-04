(() => {
  const root = document.querySelector(".room-app");
  const stage = document.querySelector(".room-stage");
  const frame = document.querySelector("[data-room-view]");
  const scene = document.querySelector(".room-scene");
  const room = document.querySelector(".room");
  const dock = document.querySelector("[data-dock]");
  const overlayLayer = document.querySelector("[data-overlay-layer]");
  const air = document.querySelector("[data-room-air]");
  const hint = document.querySelector("[data-room-hint]");
  if (!root || !stage || !frame || !scene || !room || !dock || !overlayLayer) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const OBJECTS = {
    overview: { label: "全景", focus: 0 },
    monitor: { label: "显示屏", focus: -16 },
    phone: { label: "手机", focus: -24 },
    macbook: { label: "MacBook", focus: -6 },
    ipad: { label: "iPad", focus: -32 },
    marshall: { label: "Marshall", focus: -38 },
    piano: { label: "钢琴", focus: 34 },
    window: { label: "窗户", focus: 14 },
    lightswitch: { label: "灯光", focus: 8 },
    trashcan: { label: "垃圾桶", focus: 46 },
  };

  const state = {
    ry: 0,
    targetRy: 0,
    zoom: 1,
    userZoom: 1,
    baseZoom: 1,
    active: null, // 当前打开的弹层
    opener: null, // 打开弹层前获得焦点的元素
    busy: false,
    drag: null,
    pinch: null,
    suppressClickUntil: 0,
    loading: true,
  };

  const applyZoom = () => {
    const fit = Math.min((window.innerWidth - 24) / 1150, (window.innerHeight - 150) / 720, 1.15);
    state.baseZoom = Math.min(Math.max(fit, 0.4), 1.15);
    state.zoom = state.baseZoom * state.userZoom;
    scene.style.setProperty("--room-zoom", state.zoom.toFixed(3));
  };

  const applyRy = (value, immediate = false) => {
    state.targetRy = Math.min(Math.max(value, -48), 48);
    if (immediate) {
      state.ry = state.targetRy;
      room.style.setProperty("--room-ry", `${state.ry}deg`);
    }
  };

  /* ---------- 相机动画 ---------- */
  let raf = null;
  const tick = () => {
    const diff = state.targetRy - state.ry;
    if (Math.abs(diff) > 0.05) {
      state.ry += diff * (reduceMotion ? 1 : 0.14);
      room.style.setProperty("--room-ry", `${state.ry}deg`);
      raf = requestAnimationFrame(tick);
    } else {
      state.ry = state.targetRy;
      room.style.setProperty("--room-ry", `${state.ry}deg`);
      raf = null;
    }
  };

  const easeTo = (target) => {
    applyRy(target);
    if (!reduceMotion) {
      if (!raf) raf = requestAnimationFrame(tick);
    } else {
      tick();
    }
  };

  /* ---------- 加载流程 ---------- */
  const loadBar = document.querySelector("[data-load-bar]");
  const loadPercent = document.querySelector("[data-load-percent]");
  const loadSkip = document.querySelector("[data-load-skip]");
  let loadTimer = null;

  const finishLoading = () => {
    if (!state.loading) return;
    state.loading = false;
    root.dataset.roomState = "ready";
    window.clearTimeout(loadTimer);
    easeTo(0);
    if (hint) {
      hint.classList.add("is-visible");
      window.setTimeout(() => hint.classList.remove("is-visible"), 5200);
    }
    window.setTimeout(() => dock.dispatchEvent(new CustomEvent("room:loaded")), 0);
  };

  if (loadBar && loadPercent) {
    let progress = 0;
    const steps = [
      [0.42, 120], [0.3, 160], [0.18, 220], [0.1, 320],
    ];
    let stepIndex = 0;
    const advance = () => {
      if (!state.loading) return;
      const [amount, wait] = steps[stepIndex] || [0.04, 420];
      progress = Math.min(progress + amount, 0.96);
      loadBar.style.width = `${Math.round(progress * 100)}%`;
      loadPercent.textContent = String(Math.round(progress * 100));
      stepIndex += 1;
      loadTimer = window.setTimeout(() => {
        if (progress >= 0.96) {
          loadBar.style.width = "100%";
          loadPercent.textContent = "100";
          window.setTimeout(finishLoading, 260);
        } else {
          advance();
        }
      }, wait);
    };
    advance();
  }
  if (loadSkip) {
    loadSkip.addEventListener("click", finishLoading);
  }

  /* ---------- 输入：拖拽观察 / 缩放 / 键盘 ---------- */
  frame.addEventListener("pointerdown", (event) => {
    if (overlayLayer && !overlayLayer.hidden) return;
    if (event.target.closest("button")) return;
    state.drag = { x: event.clientX, moved: 0, id: event.pointerId, lastRy: state.ry };
    state.pinch = state.pinch ? state.pinch : { pointers: new Map(), distance: 0 };
    if (state.pinch.pointers.size < 2) {
      state.pinch.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }
    try { frame.setPointerCapture(event.pointerId); } catch {}
  });

  frame.addEventListener("pointermove", (event) => {
    if (state.pinch && state.pinch.pointers.has(event.pointerId)) {
      state.pinch.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }
    if (!state.drag || state.drag.id !== event.pointerId) return;
    const dx = event.clientX - state.drag.x;
    state.drag.moved = Math.max(state.drag.moved, Math.abs(dx));
    if (state.drag.moved > 6) {
      state.suppressClickUntil = performance.now() + 320;
      state.ry = Math.min(Math.max(state.drag.lastRy + dx * 0.16, -48), 48);
      state.targetRy = state.ry;
      room.style.setProperty("--room-ry", `${state.ry}deg`);
    }
  });

  const endPointer = (event) => {
    if (state.drag && state.drag.id === event.pointerId) {
      if (state.drag.moved > 10) state.suppressClickUntil = performance.now() + 320;
      state.drag = null;
    }
    if (state.pinch) {
      state.pinch.pointers.delete(event.pointerId);
      if (state.pinch.pointers.size < 2) {
        state.pinch.distance = 0;
      }
    }
  };

  frame.addEventListener("pointerup", endPointer);
  frame.addEventListener("pointercancel", endPointer);

  frame.addEventListener(
    "wheel",
    (event) => {
      if (overlayLayer && !overlayLayer.hidden) return;
      const factor = Math.exp(-event.deltaY * 0.0011);
      state.userZoom = Math.min(Math.max(state.userZoom * factor, 0.7), 1.6);
      applyZoom();
    },
    { passive: true },
  );

  // 双指缩放
  frame.addEventListener("pointerdown", (event) => {
    if (!state.pinch) return;
    if (state.pinch.pointers.size === 2) {
      const [a, b] = [...state.pinch.pointers.values()];
      state.pinch.distance = Math.hypot(a.x - b.x, a.y - b.y);
    }
  });

  const onPinchMove = (event) => {
    if (!state.pinch || state.pinch.pointers.size !== 2 || !state.pinch.distance) return;
    const [a, b] = [...state.pinch.pointers.values()];
    const distance = Math.hypot(a.x - b.x, a.y - b.y);
    if (state.pinch.distance > 0 && distance > 0) {
      state.userZoom = Math.min(Math.max(state.userZoom * (distance / state.pinch.distance), 0.7), 1.6);
      state.pinch.distance = distance;
      applyZoom();
    }
  };
  frame.addEventListener("pointermove", onPinchMove);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeOverlay();
      return;
    }
    if (overlayLayer && !overlayLayer.hidden) return;
    if (event.key === "ArrowLeft") easeTo(state.targetRy + 8);
    if (event.key === "ArrowRight") easeTo(state.targetRy - 8);
  });

  window.addEventListener("resize", () => applyZoom());
  applyZoom();
  applyRy(0, true);
  easeTo(10); // 入场：先偏一点，再回到正面

  /* ---------- 弹层管理 ---------- */
  const devices = new Map();
  overlayLayer.querySelectorAll("[data-device]").forEach((node) => {
    devices.set(node.dataset.device, node);
  });

  const overlayVisible = () => !overlayLayer.hidden;

  const focusBody = (device) => {
    const body = device.querySelector("[data-device-body]");
    if (body) body.scrollTop = 0;
  };

  const openOverlay = (objectId, { fromDock = false } = {}) => {
    if (state.busy) return;
    const device = devices.get(objectId);
    if (!device) return;
    const opener = fromDock ? document.activeElement : null;
    state.active = objectId;
    state.opener = opener || document.activeElement;
    overlayLayer.hidden = false;
    overlayLayer.setAttribute("aria-hidden", "false");
    overlayLayer.classList.remove("is-entering");
    void overlayLayer.offsetWidth;
    overlayLayer.classList.add("is-entering");
    devices.forEach((node, key) => {
      node.hidden = key !== objectId;
    });
    focusBody(device);
    const close = device.querySelector("[data-device-close]");
    if (close) window.setTimeout(() => close.focus(), 60);
    updateDock();
  };

  const closeOverlay = () => {
    if (!overlayVisible()) return;
    overlayLayer.hidden = true;
    overlayLayer.setAttribute("aria-hidden", "true");
    const opener = state.opener;
    state.active = null;
    state.opener = null;
    updateDock();
    if (opener && typeof opener.focus === "function") {
      window.setTimeout(() => opener.focus(), 0);
    }
  };

  overlayLayer.addEventListener("click", (event) => {
    if (event.target === overlayLayer) closeOverlay();
  });

  overlayLayer.querySelectorAll("[data-device-close]").forEach((button) => {
    button.addEventListener("click", closeOverlay);
  });

  const updateDock = () => {
    dock.querySelectorAll(".object-dock__item").forEach((item) => {
      const isCurrent = item.dataset.object === (state.active || "overview");
      item.setAttribute("aria-current", isCurrent ? "true" : "false");
      if (isCurrent) {
        item.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    });
  };

  /* ---------- 物件激活：转镜头 → 打开近景 ---------- */
  const activateObject = (objectId, fromDock = false) => {
    if (state.busy) return;
    const focus = OBJECTS[objectId] ? OBJECTS[objectId].focus : 0;
    if (state.active === objectId && overlayVisible()) {
      closeOverlay();
      return;
    }
    if (!OBJECTS[objectId] || objectId === "overview" || objectId === "window" || objectId === "lightswitch" || objectId === "trashcan") {
      // 这些物件已在墙体/近景上，直接打开
      openOverlay(objectId, { fromDock });
      return;
    }
    state.busy = true;
    dock.dataset.busy = "true";
    const opened = () => {
      state.busy = false;
      dock.dataset.busy = "false";
      openOverlay(objectId, { fromDock });
    };
    easeTo(focus);
    if (reduceMotion) {
      opened();
    } else {
      window.setTimeout(opened, 380);
    }
  };

  dock.addEventListener("click", (event) => {
    const item = event.target.closest("[data-object]");
    if (!item) return;
    if (item.disabled) return;
    if (performance.now() < state.suppressClickUntil) return;
    activateObject(item.dataset.object, true);
  });

  room.addEventListener("click", (event) => {
    const object = event.target.closest("[data-object]");
    if (!object) return;
    if (performance.now() < state.suppressClickUntil) return;
    if (object.classList.contains("room-object--decor")) return;
    activateObject(object.dataset.object, false);
  });

  /* ---------- 地图与按钮跳转 ---------- */
  overlayLayer.addEventListener("click", (event) => {
    const go = event.target.closest("[data-map-go]");
    if (!go) return;
    const target = go.dataset.mapGo;
    if (target && devices.has(target)) {
      openOverlay(target);
    }
  });

  /* ---------- 工程控制台：单项展开 ---------- */
  const consoleCard = document.querySelector("[data-console]");
  if (consoleCard) {
    const entries = Array.from(consoleCard.querySelectorAll("[data-cap]"));
    const details = Array.from(consoleCard.querySelectorAll("[data-cap-detail]"));
    const select = (cap) => {
      entries.forEach((entry) => {
        const active = entry.dataset.cap === cap;
        entry.classList.toggle("is-active", active);
        entry.setAttribute("aria-current", active ? "true" : "false");
      });
      details.forEach((detail) => {
        detail.classList.toggle("is-active", detail.dataset.capDetail === cap);
      });
    };
    entries.forEach((entry) => {
      entry.addEventListener("click", () => select(entry.dataset.cap));
    });
  }

  /* ---------- 站内证据跳转 ---------- */
  const highlightTarget = (device, selector, id) => {
    const node = device.querySelector(selector);
    if (!node) return;
    node.classList.add("is-highlight");
    node.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
    window.setTimeout(() => node.classList.remove("is-highlight"), 2600);
  };

  overlayLayer.addEventListener("click", (event) => {
    const evidence = event.target.closest("[data-room-evidence]");
    if (!evidence) return;
    const target = evidence.dataset.roomEvidence;
    if (target.startsWith("project:")) {
      const projectId = target.slice("project:".length);
      openOverlay("macbook");
      window.setTimeout(() => {
        highlightTarget(devices.get("macbook"), `[data-project="${projectId}"]`, projectId);
      }, 80);
    } else if (target.startsWith("experience-case")) {
      openOverlay("ipad");
      window.setTimeout(() => {
        highlightTarget(devices.get("ipad"), `[data-exp="${target}"]`, target);
      }, 80);
    } else {
      openOverlay("ipad");
      window.setTimeout(() => {
        highlightTarget(devices.get("ipad"), `[data-exp="${target}"]`, target);
      }, 80);
    }
  });

  /* ---------- 氛围控制 ---------- */
  const ambientKey = "gsy-room-ambient";
  let ambient = {};
  try {
    ambient = JSON.parse(localStorage.getItem(ambientKey) || "{}");
  } catch {}
  const ambientControls = document.querySelector("[data-device='lightswitch']");
  if (ambientControls) {
    const applyAmbient = () => {
      root.dataset.sceneTone = ambient.tone || "day";
      root.dataset.weather = ambient.weather || "sunny";
      root.dataset.lights = ambient.lights || "on";
      ambientControls.querySelectorAll("[data-tone]").forEach((btn) => {
        const active = btn.dataset.tone === (ambient.tone || "day");
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });
      ambientControls.querySelectorAll("[data-weather]").forEach((btn) => {
        const active = btn.dataset.weather === (ambient.weather || "sunny");
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });
      ambientControls.querySelectorAll("[data-lights]").forEach((btn) => {
        const active = btn.dataset.lights === (ambient.lights || "on");
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });
      const stringLights = document.querySelectorAll(".string-lights i");
      const lightsOn = (ambient.lights || "on") === "on";
      root.style.setProperty("--lights-on", lightsOn ? "rgba(255, 196, 110, 0.85)" : "rgba(255, 196, 110, 0)");
      if (!lightsOn && !reduceMotion) {
        stringLights.forEach((light) => {
          light.style.animation = "light-blink 2.4s ease-in-out infinite";
          light.style.animationDelay = `${Math.random() * 1.4}s`;
        });
      } else {
        stringLights.forEach((light) => {
          light.style.animation = "none";
        });
      }
    };
    ambientControls.addEventListener("click", (event) => {
      const tone = event.target.closest("[data-tone]");
      const weather = event.target.closest("[data-weather]");
      const lights = event.target.closest("[data-lights]");
      if (tone) ambient.tone = tone.dataset.tone;
      if (weather) ambient.weather = weather.dataset.weather;
      if (lights) ambient.lights = lights.dataset.lights;
      try {
        localStorage.setItem(ambientKey, JSON.stringify(ambient));
      } catch {}
      applyAmbient();
    });
    applyAmbient();
  }

  /* ---------- 留言弹幕 ---------- */
  const LANE_COUNT = () => (window.innerWidth <= 680 ? 5 : 7);
  const MAX_DANMAKU = 24;
  let danmakuIndex = 0;
  const MOOD_TAGS = { checkin: "打卡", chat: "聊聊", cold: "冷漠" };

  const makeDanmaku = (item) => {
    const node = document.createElement("div");
    const author = document.createElement("strong");
    const body = document.createElement("span");
    const text = String(item.content || "").replace(/\s*\n+\s*/g, " ");
    if (!text) return null;
    const mood = ["checkin", "chat", "cold"].includes(item.mood) ? item.mood : "chat";
    const duration = 18 + Math.min(text.length, 60) * 0.12 + (danmakuIndex % 4) * 1.6;
    node.className = `room-danmaku room-danmaku--${mood}`;
    node.style.setProperty("--lane-top", `${6 + (danmakuIndex % LANE_COUNT()) * 11}%`);
    node.style.setProperty("--duration", `${duration}s`);
    node.style.setProperty("--delay", `-${((danmakuIndex * 3.7) + 2) % duration}s`);
    author.textContent = String(item.nickname || "访客");
    body.textContent = text;
    node.append(author, body);
    const meta = document.createElement("small");
    const parts = [];
    if (MOOD_TAGS[mood]) parts.push(MOOD_TAGS[mood]);
    if (item.ipDisplay) parts.push(item.ipDisplay);
    if (parts.length) {
      meta.textContent = parts.join(" · ");
      node.append(meta);
    }
    danmakuIndex += 1;
    return node;
  };

  const appendDanmaku = (items, { fresh = false } = {}) => {
    if (!air) return;
    if (fresh) {
      items.forEach((item) => {
        const node = makeDanmaku(item);
        if (!node) return;
        node.classList.add("is-fresh");
        air.append(node);
      });
    } else {
      air.replaceChildren();
      items.forEach((item) => {
        const node = makeDanmaku(item);
        if (node) air.append(node);
      });
    }
    while (air.children.length > MAX_DANMAKU) {
      air.firstElementChild?.remove();
    }
  };

  window.addEventListener("room:danmaku", (event) => {
    const { items, fresh } = event.detail || {};
    if (Array.isArray(items)) appendDanmaku(items, { fresh: Boolean(fresh) });
  });

  /* ---------- 首次进入后恢复初始视角 ---------- */
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  prefersReduced.addEventListener?.("change", () => {
    if (prefersReduced.matches && raf) {
      cancelAnimationFrame(raf);
      raf = null;
      tick();
    }
  });
})();
