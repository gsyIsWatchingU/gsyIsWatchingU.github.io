(() => {
  const form = document.querySelector("#rg-form");
  const list = document.querySelector("#rg-list");
  const empty = document.querySelector("#rg-empty");
  const toast = document.querySelector("#rg-toast");
  const status = document.querySelector("#rg-status");
  const nickname = document.querySelector("#rg-nickname");
  const content = document.querySelector("#rg-content");
  const count = document.querySelector("#rg-count");
  const submit = document.querySelector("#rg-submit");
  const moodInputs = Array.from(document.querySelectorAll('input[name="mood"]'));
  if (!form || !list || !submit || !content || !count || !moodInputs.length) return;

  const config = globalThis.GUESTBOOK_CONFIG || {};
  const apiBaseUrl = String(config.apiBaseUrl || "").replace(/\/$/, "");
  const apiConfigured = /^https?:\/\//.test(apiBaseUrl);

  const MOODS = {
    checkin: { label: "打个卡就溜", sending: "正在盖脚印…", toast: "打卡成功，溜了～" },
    chat: { label: "简单说两句", sending: "正在传话…", toast: "你的留言说给他听了" },
    cold: { label: "狠心冷漠", sending: "正在冷漠…", toast: "好的，已阅。" },
  };
  const MOOD_TAGS = { checkin: "打卡", chat: "聊聊", cold: "冷漠" };

  const getMood = () => {
    const checked = moodInputs.find((input) => input.checked);
    return checked && MOODS[checked.value] ? checked.value : "chat";
  };

  const setStatus = (message, type = "") => {
    status.textContent = message;
    status.dataset.type = type;
  };

  const applyMood = () => {
    const mood = getMood();
    const moodConfig = MOODS[mood] || MOODS.chat;
    submit.dataset.mood = mood;
    submit.firstChild.textContent = `${moodConfig.label} `;
    moodInputs.forEach((input) => {
      const label = input.closest(".guest-mood");
      if (label) label.classList.toggle("is-selected", input.checked);
    });
    content.required = mood === "chat";
    setStatus("");
  };

  moodInputs.forEach((input) => {
    input.addEventListener("change", applyMood);
  });
  content.addEventListener("input", () => {
    count.textContent = String(content.value.length);
  });

  const request = async (path, options = {}) => {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || "星际信号暂时中断");
    return payload;
  };

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => {
      toast.hidden = true;
    }, 3000);
  };

  const shareDanmaku = (items, fresh = false) => {
    window.dispatchEvent(new CustomEvent("room:danmaku", { detail: { items, fresh } }));
  };

  const renderItem = (item) => {
    const li = document.createElement("li");
    li.className = "guest-feed__item";
    const strong = document.createElement("strong");
    strong.textContent = String(item.nickname || "访客");
    const mood = ["checkin", "chat", "cold"].includes(item.mood) ? item.mood : "chat";
    const tag = document.createElement("i");
    tag.textContent = MOOD_TAGS[mood] || "";
    strong.append(tag);
    const p = document.createElement("p");
    p.textContent = String(item.content || "").replace(/\s*\n+\s*/g, " ");
    li.append(strong, p);
    const metaParts = [];
    if (item.ipDisplay) metaParts.push(item.ipDisplay);
    if (item.createdAt) metaParts.push(item.createdAt);
    if (metaParts.length) {
      const small = document.createElement("small");
      small.textContent = metaParts.join(" · ");
      li.append(small);
    }
    return li;
  };

  const renderList = (items) => {
    list.replaceChildren();
    if (!items.length) {
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    items.slice(0, 14).forEach((item) => {
      list.append(renderItem(item));
    });
  };

  const loadMessages = async () => {
    try {
      const payload = await request("/api/messages?limit=18");
      const items = Array.isArray(payload.items) ? payload.items : [];
      renderList(items);
      shareDanmaku(items, false);
    } catch {
      // 留言读取失败时静默降级，不影响房间体验
    }
  };

  const recordVisit = async () => {
    try {
      await request("/api/visits", { method: "POST", body: "{}" });
    } catch {}
  };

  const setSubmitting = (busy) => {
    submit.disabled = busy;
    submit.setAttribute("aria-busy", busy ? "true" : "false");
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submit.disabled) return;
    const mood = getMood();
    const moodConfig = MOODS[mood] || MOODS.chat;
    setSubmitting(true);
    setStatus(moodConfig.sending, "sending");
    const data = new FormData(form);
    try {
      const payload = await request("/api/messages", {
        method: "POST",
        body: JSON.stringify({
          nickname: data.get("nickname"),
          content: data.get("content"),
          mood,
          website: data.get("website"),
        }),
      });
      const item = payload.item;
      if (item) {
        const node = renderItem(item);
        list.prepend(node);
        while (list.children.length > 14) list.lastElementChild?.remove();
        if (empty) empty.hidden = true;
        shareDanmaku([item], true);
      }
      form.reset();
      count.textContent = "0";
      applyMood();
      showToast(moodConfig.toast);
      setStatus("");
    } catch (error) {
      setStatus(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  });

  if (apiConfigured) {
    Promise.allSettled([recordVisit(), loadMessages()]);
  } else {
    if (empty) empty.hidden = false;
  }
})();
