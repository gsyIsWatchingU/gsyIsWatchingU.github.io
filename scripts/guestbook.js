(() => {
  const sky = document.querySelector("#guestbook-sky");
  const openButton = document.querySelector("#guestbook-open");
  const dialog = document.querySelector("#guestbook-dialog");
  const closeButton = document.querySelector("#guestbook-close");
  const form = document.querySelector("#guestbook-form");
  const submitButton = document.querySelector("#guestbook-submit");
  const status = document.querySelector("#guestbook-status");
  const nickname = document.querySelector("#guestbook-nickname");
  const content = document.querySelector("#guestbook-content");
  const characterCount = document.querySelector("#guestbook-character-count");
  const toast = document.querySelector("#guestbook-toast");
  if (!sky || !openButton || !dialog || !closeButton || !form || !submitButton || !status || !nickname || !content || !characterCount || !toast) return;

  const config = globalThis.GUESTBOOK_CONFIG || {};
  const apiBaseUrl = String(config.apiBaseUrl || "").replace(/\/$/, "");
  const apiConfigured = /^https?:\/\//.test(apiBaseUrl);
  let messageIndex = 0;
  let toastTimer;
  const launchLabel = submitButton.querySelector(".guestbook-launch__label");
  const launchDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1120;

  const request = async (path, options = {}) => {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || "星际信号暂时中断");
    return payload;
  };

  const laneTop = (lane) => `${10 + lane * 12}%`;
  const laneCount = () => (window.matchMedia("(max-width: 680px)").matches ? 5 : 7);
  const MAX_DANMAKU = 42;

  const createDanmaku = (item, index, immediate = false) => {
    const message = document.createElement("div");
    const author = document.createElement("strong");
    const body = document.createElement("span");
    const text = String(item.content || "").replace(/\s*\n+\s*/g, " ");
    const duration = 20 + Math.min(text.length, 60) * 0.12 + (index % 4) * 1.7;

    message.className = "guestbook-danmaku";
    message.style.setProperty("--lane-top", laneTop(index % laneCount()));
    message.style.setProperty("--duration", `${duration}s`);
    // 偏移 7s 起步，避免首屏第一条还停在视口外
    message.style.setProperty("--delay", immediate ? "0s" : `${-(((index * 4.1) + 7) % duration)}s`);
    author.textContent = String(item.nickname || "访客");
    body.textContent = text;
    message.append(author, body);
    return message;
  };

  // 挑一条入口处没有其它弹幕的车道，避免刚发出的留言被压在同一条水平线上
  const resolveFreeLane = (width, viewport) => {
    const count = laneCount();
    const skyLeft = sky.getBoundingClientRect().left;
    const entryLeft = viewport * 0.92 - width;
    const busy = new Set();
    sky.querySelectorAll(".guestbook-danmaku").forEach((node) => {
      const rect = node.getBoundingClientRect();
      const left = rect.left - skyLeft;
      if (rect.width > 0 && left < viewport && left + rect.width > entryLeft - 48) {
        busy.add(node.style.getPropertyValue("--lane-top"));
      }
    });
    for (let offset = 0; offset < count; offset += 1) {
      const lane = (messageIndex + offset) % count;
      if (!busy.has(laneTop(lane))) return lane;
    }
    return messageIndex % count;
  };

  // 把刚发出的留言直接放到屏幕右侧可见位置（用负 delay 快进动画），而不是从视口外慢慢飘进来
  const launchFresh = (node) => {
    const viewport = sky.clientWidth || window.innerWidth;
    const width = node.offsetWidth || 220;
    const duration = Number.parseFloat(node.style.getPropertyValue("--duration")) || 24;
    const start = viewport + 60;
    const end = -(width + viewport);
    const entryLeft = Math.min(viewport * 0.92 - width, viewport * 0.6);
    const elapsed = Math.max(0, ((start - entryLeft) / (start - end)) * duration);

    node.style.setProperty("--lane-top", laneTop(resolveFreeLane(width, viewport)));
    node.style.setProperty("--delay", `-${Math.min(elapsed, duration * 0.9).toFixed(2)}s`);
    node.classList.add("is-fresh");
    window.setTimeout(() => node.classList.remove("is-fresh"), 3600);
  };

  const appendDanmaku = (item, immediate = false) => {
    const node = createDanmaku(item, messageIndex, immediate);
    sky.append(node);
    if (immediate) launchFresh(node);
    messageIndex += 1;

    const overflow = sky.children.length - MAX_DANMAKU;
    for (let index = 0; index < overflow; index += 1) {
      sky.firstElementChild?.remove();
    }
  };

  const shareVisitorLight = (items, fresh = false) => {
    const detail = { items, fresh };
    globalThis.PORTFOLIO_VISITOR_LIGHT = detail;
    window.dispatchEvent(new CustomEvent("portfolio:visitor-light", {
      detail,
    }));
  };

  const showToast = (message) => {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
  };

  const setStatus = (message, type = "") => {
    status.textContent = message;
    status.dataset.type = type;
  };

  const setDialogCursor = (isOpen) => {
    document.documentElement.classList.toggle("guestbook-dialog-open", isOpen);
  };

  const setLaunchState = (isLaunching) => {
    submitButton.classList.toggle("is-launching", isLaunching);
    submitButton.toggleAttribute("aria-busy", isLaunching);
    submitButton.disabled = isLaunching;
    if (launchLabel) launchLabel.textContent = isLaunching ? "正在升空" : "发射到星海";
  };

  const loadMessages = async () => {
    try {
      const payload = await request("/api/messages?limit=18");
      sky.replaceChildren();
      messageIndex = 0;
      payload.items.forEach((item) => appendDanmaku(item));
      shareVisitorLight(payload.items);
    } catch {
      // 留言读取失败时保留原有星海，不打断首屏体验。
    }
  };

  const recordVisit = async () => {
    try {
      await request("/api/visits", { method: "POST", body: "{}" });
    } catch {
      // 访客记录失败不影响留言体验。
    }
  };

  openButton.addEventListener("click", () => {
    if (!apiConfigured) {
      showToast("留言服务暂时不可用");
      return;
    }
    setStatus("");
    setDialogCursor(true);
    dialog.showModal();
    window.setTimeout(() => nickname.focus(), 0);
  });

  dialog.addEventListener("close", () => setDialogCursor(false));
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    const inside =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;
    if (!inside) dialog.close();
  });

  content.addEventListener("input", () => {
    characterCount.textContent = String(content.value.length);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitButton.disabled) return;
    setLaunchState(true);
    setStatus("正在点火，校准发射轨道…", "launching");
    const data = new FormData(form);
    const launchAnimation = new Promise((resolve) => window.setTimeout(resolve, launchDuration));

    try {
      const [payload] = await Promise.all([
        request("/api/messages", {
          method: "POST",
          body: JSON.stringify({
            nickname: data.get("nickname"),
            content: data.get("content"),
            website: data.get("website"),
          }),
        }),
        launchAnimation,
      ]);
      appendDanmaku(payload.item, true);
      shareVisitorLight([payload.item], true);
      form.reset();
      characterCount.textContent = "0";
      dialog.close();
      showToast("你的留言正在穿过星海");
    } catch (error) {
      setStatus(error.message, "error");
    } finally {
      setLaunchState(false);
    }
  });

  if (!apiConfigured) return;
  Promise.allSettled([recordVisit(), loadMessages()]);
})();
