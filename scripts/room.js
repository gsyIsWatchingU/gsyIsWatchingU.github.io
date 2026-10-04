(() => {
  const root = document.querySelector(".room-app");
  const dock = document.querySelector("[data-dock]");
  const overlayLayer = document.querySelector("[data-overlay-layer]");
  const air = document.querySelector("[data-room-air]");
  const hint = document.querySelector("[data-room-hint]");
  if (!root || !dock || !overlayLayer) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = {
    active: null,
    opener: null,
    busy: false,
    pendingId: null,
    loading: true,
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
    if (hint) {
      hint.classList.add("is-visible");
      window.setTimeout(() => hint.classList.remove("is-visible"), 5200);
    }
  };

  if (loadBar && loadPercent) {
    let progress = 0;
    const steps = [
      [0.42, 120],
      [0.3, 160],
      [0.18, 220],
      [0.1, 320],
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

  /* ---------- 弹层管理 ---------- */
  const devices = new Map();
  overlayLayer.querySelectorAll("[data-device]").forEach((node) => {
    devices.set(node.dataset.device, node);
  });

  const overlayVisible = () => !overlayLayer.hidden;

  const openOverlay = (objectId) => {
    const device = devices.get(objectId);
    if (!device) return;
    state.active = objectId;
    state.opener = document.activeElement;
    overlayLayer.hidden = false;
    overlayLayer.setAttribute("aria-hidden", "false");
    overlayLayer.classList.remove("is-entering");
    void overlayLayer.offsetWidth;
    overlayLayer.classList.add("is-entering");
    devices.forEach((node, key) => {
      node.hidden = key !== objectId;
    });
    const body = device.querySelector("[data-device-body]");
    if (body) body.scrollTop = 0;
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
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeOverlay();
  });
  window.addEventListener("room:request-close", closeOverlay);

  const updateDock = () => {
    dock.querySelectorAll(".object-dock__item").forEach((item) => {
      const isCurrent = item.dataset.object === (state.active || "overview");
      item.setAttribute("aria-current", isCurrent ? "true" : "false");
      if (isCurrent) {
        item.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    });
  };

  /* ---------- 激活：转镜头后打开近景 ---------- */
  const beginActivate = (objectId) => {
    if (state.busy) return;
    state.busy = true;
    state.pendingId = objectId;
    dock.dataset.busy = "true";
    // 兜底：3D 场景缺失或卡住时也能打开近景
    window.clearTimeout(beginActivate._timer);
    beginActivate._timer = window.setTimeout(() => {
      if (state.busy) {
        state.busy = false;
        dock.dataset.busy = "false";
        openOverlay(state.pendingId);
      }
    }, reduceMotion ? 60 : 1100);
  };

  window.addEventListener("room:activate-done", (event) => {
    if (!state.busy) return;
    state.busy = false;
    dock.dataset.busy = "false";
    openOverlay(event.detail?.objectId || state.pendingId);
  });

  window.addEventListener("room:scene-click", (event) => {
    if (state.busy || overlayVisible()) return;
    beginActivate(event.detail?.objectId);
  });

  dock.addEventListener("click", (event) => {
    const item = event.target.closest("[data-object]");
    if (!item || item.disabled) return;
    const objectId = item.dataset.object;
    if (overlayVisible() && state.active === objectId) {
      closeOverlay();
      return;
    }
    beginActivate(objectId);
    window.dispatchEvent(new CustomEvent("room:activate-request", { detail: { objectId } }));
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
  const highlightTarget = (device, selector) => {
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
        highlightTarget(devices.get("macbook"), `[data-project="${projectId}"]`);
      }, 80);
    } else {
      openOverlay("ipad");
      window.setTimeout(() => {
        highlightTarget(devices.get("ipad"), `[data-exp="${target}"]`);
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
    node.style.setProperty("--delay", `-${(danmakuIndex * 3.7 + 2) % duration}s`);
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
})();
