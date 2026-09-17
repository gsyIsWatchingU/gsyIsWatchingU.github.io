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
  const moodInputs = Array.from(document.querySelectorAll('input[name="mood"]'));
  const compose = document.querySelector("#guestbook-compose");
  const composeHint = document.querySelector("#guestbook-compose-hint");
  const submitLabel = document.querySelector("#guestbook-submit-label");
  if (!sky || !openButton || !dialog || !closeButton || !form || !submitButton || !status || !nickname || !content || !characterCount || !toast || !compose || !composeHint || !submitLabel || !moodInputs.length) return;

  const config = globalThis.GUESTBOOK_CONFIG || {};
  const apiBaseUrl = String(config.apiBaseUrl || "").replace(/\/$/, "");
  const apiConfigured = /^https?:\/\//.test(apiBaseUrl);
  let messageIndex = 0;
  let toastTimer;
  const launchDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1120;

  const MOODS = {
    checkin: {
      submit: "打个卡就溜",
      launching: "正在盖脚印…",
      status: "打卡中，盖完脚印就溜…",
      toast: "打卡成功，溜了～",
      placeholder: "",
      hint: "什么都不用写，这里会替你留一句打卡语。",
    },
    chat: {
      submit: "说给他听",
      launching: "正在传话",
      status: "正在把你的话传过去…",
      toast: "你的留言说给他听了",
      placeholder: "建议、问题，或者一句路过的招呼。",
      hint: "",
    },
    cold: {
      submit: "冷漠路过",
      launching: "正在冷漠",
      status: "正在面无表情地路过…",
      toast: "好的，已阅。",
      placeholder: "算了，一个字都不想打（留空也行）",
      hint: "什么都不想写的话，系统会替你冷冷地路过。",
    },
  };
  const MOOD_TAGS = { checkin: "打卡", chat: "聊聊", cold: "冷漠" };

  const getMood = () => {
    const checked = moodInputs.find((input) => input.checked);
    return checked && MOODS[checked.value] ? checked.value : "chat";
  };

  const applyMood = () => {
    const mood = getMood();
    const config = MOODS[mood] || MOODS.chat;
    submitButton.dataset.mood = mood;
    if (submitLabel) submitLabel.textContent = config.submit;
    content.placeholder = config.placeholder;
    content.required = mood === "chat";
    compose.classList.toggle("is-checkin", mood === "checkin");
    composeHint.hidden = mood === "chat";
    if (mood !== "chat") composeHint.textContent = config.hint;
    setStatus("");
  };

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
    const mood = ["checkin", "chat", "cold"].includes(item.mood) ? item.mood : "chat";

    message.className = `guestbook-danmaku guestbook-danmaku--${mood}`;
    message.style.setProperty("--lane-top", laneTop(index % laneCount()));
    message.style.setProperty("--duration", `${duration}s`);
    // 偏移 7s 起步，避免首屏第一条还停在视口外
    message.style.setProperty("--delay", immediate ? "0s" : `${-(((index * 4.1) + 7) % duration)}s`);
    author.textContent = String(item.nickname || "访客");
    body.textContent = text;
    message.append(author, body);
    const meta = document.createElement("small");
    meta.className = "guestbook-danmaku__meta";
    const metaParts = [];
    if (MOOD_TAGS[mood]) metaParts.push(MOOD_TAGS[mood]);
    if (item.ipDisplay) metaParts.push(item.ipDisplay);
    if (metaParts.length) {
      meta.textContent = metaParts.join(" · ");
      message.append(meta);
    }
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

  const setLaunchState = (isLaunching, mood = getMood()) => {
    const config = MOODS[mood] || MOODS.chat;
    submitButton.classList.toggle("is-launching", isLaunching);
    submitButton.toggleAttribute("aria-busy", isLaunching);
    submitButton.disabled = isLaunching;
    if (submitLabel) submitLabel.textContent = isLaunching ? config.launching : config.submit;
  };

  const loadMessages = async () => {
    try {
      const payload = await request("/api/messages?limit=18");
      sky.replaceChildren();
      messageIndex = 0;
      payload.items.forEach((item) => appendDanmaku(item));
      shareVisitorLight(payload.items);
    } catch {
      // 留言读取失败时保留原有弹幕，不打断首屏体验。
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
    applyMood();
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

  moodInputs.forEach((input) => {
    input.addEventListener("change", applyMood);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitButton.disabled) return;
    const mood = getMood();
    setLaunchState(true, mood);
    setStatus((MOODS[mood] || MOODS.chat).status, "launching");
    const data = new FormData(form);
    const launchAnimation = new Promise((resolve) => window.setTimeout(resolve, launchDuration));

    try {
      const [payload] = await Promise.all([
        request("/api/messages", {
          method: "POST",
          body: JSON.stringify({
            nickname: data.get("nickname"),
            content: data.get("content"),
            mood,
            website: data.get("website"),
          }),
        }),
        launchAnimation,
      ]);
      appendDanmaku(payload.item, true);
      shareVisitorLight([payload.item], true);
      form.reset();
      characterCount.textContent = "0";
      applyMood();
      dialog.close();
      showToast((MOODS[mood] || MOODS.chat).toast);
    } catch (error) {
      setStatus(error.message, "error");
    } finally {
      setLaunchState(false, mood);
    }
  });

  if (!apiConfigured) return;
  Promise.allSettled([recordVisit(), loadMessages()]);
})();
