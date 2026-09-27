(() => {
  const consoleEl = document.querySelector("[data-console]");
  if (!consoleEl) return;

  const rail = consoleEl.querySelector("[data-console-rail]");
  const details = [...consoleEl.querySelectorAll("[data-console-detail]")];
  const entries = [...consoleEl.querySelectorAll("[data-console-entry]")];
  if (!details.length || !entries.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const byKey = new Map(details.map((detail) => [detail.dataset.consoleDetail, detail]));

  // 次级实践说明（可选；站内证据始终优先）
  const documentLinks = globalThis.SKILL_DOCUMENT_LINKS || {};
  consoleEl.querySelectorAll("[data-skill-document]").forEach((link) => {
    const documentUrl = String(documentLinks[link.dataset.skillDocument] || "").trim();
    if (!/^https:\/\//i.test(documentUrl)) return;
    link.href = documentUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.hidden = false;
  });

  // 单项展开 + 导航状态同步
  const activate = (key) => {
    const target = byKey.get(key);
    if (!target) return;

    details.forEach((detail) => {
      if (detail.open !== (detail === target)) detail.open = detail === target;
    });

    entries.forEach((entry) => {
      const active = entry.dataset.consoleEntry === key;
      entry.classList.toggle("is-active", active);
      if (active) entry.setAttribute("aria-current", "page");
      else entry.removeAttribute("aria-current");
    });
  };

  // 原生 details 开关（含键盘 Enter）→ 同步导航
  details.forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (!detail.open) return;
      activate(detail.dataset.consoleDetail);
    });
  });

  // 导航点击：打开对应详情，就近滚动
  entries.forEach((entry) => {
    entry.addEventListener("click", (event) => {
      const key = entry.dataset.consoleEntry;
      const detail = byKey.get(key);
      if (!detail) return;
      event.preventDefault();
      activate(key);
      detail.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "nearest" });
    });
  });

  // 键盘：在导航内用方向键轮换
  rail?.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(event.key)) return;
    const current = document.activeElement?.closest("[data-console-entry]");
    if (!current || !rail.contains(current)) return;
    event.preventDefault();
    const list = [...rail.querySelectorAll("[data-console-entry]")];
    const index = list.indexOf(current);
    if (index < 0) return;
    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const next = list[(index + direction + list.length) % list.length];
    next.focus();
    next.click();
  });

  // 站内项目证据：切换到对应轮播项并暂停自动播放，供访客阅读
  consoleEl.querySelectorAll("[data-project]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const projectId = link.dataset.project;
      if (!projectId) return;
      event.preventDefault();
      window.dispatchEvent(new CustomEvent("portfolio:select-project", { detail: { projectId } }));
      document.querySelector("#projects")?.scrollIntoView({
        behavior: reduceMotion.matches ? "auto" : "smooth",
      });
    });
  });

  // 实习 / 工程经历证据：滚动后短暂高亮目标卡片
  consoleEl.querySelectorAll('[data-evidence="experience"]').forEach((link) => {
    link.addEventListener("click", () => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      target.classList.remove("is-targeted");
      void target.offsetWidth;
      target.classList.add("is-targeted");
      window.setTimeout(() => target.classList.remove("is-targeted"), 1800);
    });
  });

  // 初始化：与默认展开的能力保持一致
  const openDetail = details.find((detail) => detail.open) || byKey.get("orchestration");
  if (openDetail) activate(openDetail.dataset.consoleDetail);
})();
