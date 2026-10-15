// 图鉴面板：首屏 3D 场景里触发的项目档案浮层。
// 与 Three.js 完全解耦 —— Three.js 只在触发点派发 portfolio:archive（带项目序号），
// 面板自己负责轮播、项目切换与关闭。数据由构建期注入的内联 JSON 提供。
(() => {
  const root = document.querySelector("[data-archive]");
  if (!root) return;
  const dataNode = root.querySelector("[data-archive-data]");
  if (!dataNode) return;

  let projects = [];
  try {
    projects = JSON.parse(dataNode.textContent);
  } catch {
    return;
  }
  if (!Array.isArray(projects) || !projects.length) return;

  const panel = root.querySelector("[data-archive-panel]");
  const frame = root.querySelector("[data-archive-frame]");
  const viewport = root.querySelector("[data-archive-viewport]");
  const dotsBox = root.querySelector("[data-archive-dots]");
  const labelNode = root.querySelector("[data-archive-shot-label]");
  const captionNode = root.querySelector("[data-archive-shot-caption]");
  const counterNode = root.querySelector("[data-archive-counter]");
  const statusNode = root.querySelector("[data-archive-project-status]");
  const kickerNode = root.querySelector("[data-archive-kicker]");
  const nameNode = root.querySelector("[data-archive-name]");
  const descNode = root.querySelector("[data-archive-desc]");
  const techNode = root.querySelector("[data-archive-tech]");
  const entryButton = root.querySelector("[data-archive-entry]");
  const detailButton = root.querySelector("[data-archive-detail]");
  const prevButton = root.querySelector("[data-archive-prev]");
  const nextButton = root.querySelector("[data-archive-next]");
  const projectPrevButton = root.querySelector("[data-archive-project-prev]");
  const projectNextButton = root.querySelector("[data-archive-project-next]");

  // 面板是深色浮层，直接用页面上的暗色调会糊掉，这里单独给三个 tone 配发光色
  const toneAccents = {
    forest: { accent: "#8fb9a2", line: "rgba(143, 185, 162, 0.42)" },
    blue: { accent: "#8fc3d0", line: "rgba(143, 195, 208, 0.42)" },
    green: { accent: "#a9c7ab", line: "rgba(169, 199, 171, 0.42)" },
  };

  const pad = (value) => String(value).padStart(2, "0");
  const shotCache = new Map();
  let projectIndex = 0;
  let shotIndex = 0;
  let lastFocused = null;

  const currentProject = () => projects[projectIndex];

  // 截图只在第一次切到该项目时创建，避免开面板就拉 12 张图
  const ensureShots = (project) => {
    const cached = shotCache.get(project.id);
    if (cached) return cached;

    const images = project.shots.map((shot, index) => {
      const image = document.createElement("img");
      image.src = shot.src;
      image.alt = shot.alt || "";
      if (shot.width) image.width = shot.width;
      if (shot.height) image.height = shot.height;
      image.loading = index === 0 ? "eager" : "lazy";
      image.decoding = "async";
      const settle = () => {
        if (image.classList.contains("is-active")) frame.classList.remove("is-loading");
      };
      image.addEventListener("load", settle);
      image.addEventListener("error", settle);
      return image;
    });

    const dots = project.shots.map((shot, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `第 ${index + 1} 张：${shot.caption || shot.label || ""}`);
      dot.append(document.createElement("i"));
      dot.addEventListener("click", () => showShot(index));
      return dot;
    });

    const entry = { images, dots };
    shotCache.set(project.id, entry);
    return entry;
  };

  const showShot = (next) => {
    const project = currentProject();
    const entry = ensureShots(project);
    const total = entry.images.length;
    shotIndex = ((next % total) + total) % total;

    entry.images.forEach((image, index) => {
      const active = index === shotIndex;
      image.classList.toggle("is-active", active);
      image.setAttribute("aria-hidden", String(!active));
      if (active) frame.classList.toggle("is-loading", !image.complete);
    });
    entry.dots.forEach((dot, index) => dot.setAttribute("aria-current", String(index === shotIndex)));

    const shot = project.shots[shotIndex] || {};
    labelNode.textContent = shot.label || "";
    captionNode.textContent = shot.caption || "";

    const single = total < 2;
    prevButton.disabled = single;
    nextButton.disabled = single;
  };

  const showProject = (next) => {
    const total = projects.length;
    projectIndex = ((next % total) + total) % total;
    const project = currentProject();

    const tone = toneAccents[project.tone] || toneAccents.forest;
    panel.style.setProperty("--archive-accent", tone.accent);
    panel.style.setProperty("--archive-accent-line", tone.line);
    panel.dataset.tone = project.tone || "";

    counterNode.textContent = `${project.number}/${pad(total)}`;
    statusNode.textContent = `${project.number}/${pad(total)}`;
    kickerNode.textContent = project.kicker || "";
    nameNode.textContent = project.name || "";
    descNode.textContent = project.description || "";
    techNode.replaceChildren(
      ...(project.tech || []).map((item) => {
        const chip = document.createElement("span");
        chip.textContent = item;
        return chip;
      }),
    );

    if (project.entryUrl) {
      entryButton.hidden = false;
      entryButton.href = project.entryUrl;
      entryButton.target = "_blank";
      entryButton.rel = "noreferrer";
      const arrow = document.createElement("span");
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";
      entryButton.replaceChildren(document.createTextNode(`${project.entryLabel || `进入 ${project.name}`} `), arrow);
    } else {
      entryButton.hidden = true;
      entryButton.removeAttribute("href");
    }

    // 有独立详情卡就直接跳到那一节，否则退回到项目区
    const detailId = `project-${project.id}`;
    detailButton.href = document.getElementById(detailId) ? `#${detailId}` : "#projects";
    const detailArrow = document.createElement("span");
    detailArrow.setAttribute("aria-hidden", "true");
    detailArrow.textContent = "↓";
    detailButton.replaceChildren(document.createTextNode("查看完整项目介绍 "), detailArrow);

    const entry = ensureShots(project);
    viewport.replaceChildren(...entry.images);
    dotsBox.replaceChildren(...entry.dots);
    shotIndex = 0;
    showShot(0);

    // 顺手把下方项目轮播对齐到同一个项目
    window.dispatchEvent(new CustomEvent("portfolio:select-project", { detail: { projectId: project.id } }));
  };

  const openArchive = (index) => {
    const total = projects.length;
    const target = Number.isFinite(index) ? index : 0;
    lastFocused = document.activeElement;
    showProject(((target % total) + total) % total);
    root.hidden = false;
    document.body.classList.add("is-archive-open");
    panel.focus({ preventScroll: true });
  };

  const closeArchive = () => {
    if (root.hidden) return;
    root.hidden = true;
    document.body.classList.remove("is-archive-open");
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus({ preventScroll: true });
    }
    lastFocused = null;
  };

  root.querySelectorAll("[data-archive-dismiss]").forEach((node) => {
    node.addEventListener("click", closeArchive);
  });
  prevButton?.addEventListener("click", () => showShot(shotIndex - 1));
  nextButton?.addEventListener("click", () => showShot(shotIndex + 1));
  projectPrevButton?.addEventListener("click", () => showProject(projectIndex - 1));
  projectNextButton?.addEventListener("click", () => showProject(projectIndex + 1));
  // 两个跳转按钮点了就要收面板，否则浮层会挡住跳过去的内容
  [entryButton, detailButton].forEach((node) => {
    node?.addEventListener("click", closeArchive);
  });

  // 触摸滑动切图（阈值和项目轮播一致）
  let touchStartX = null;
  viewport.addEventListener("pointerdown", (event) => {
    touchStartX = event.pointerType === "touch" ? event.clientX : null;
  });
  viewport.addEventListener("pointerup", (event) => {
    if (touchStartX === null) return;
    const distance = event.clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) >= 42) showShot(shotIndex + (distance < 0 ? 1 : -1));
  });
  viewport.addEventListener("pointercancel", () => {
    touchStartX = null;
  });

  document.addEventListener("keydown", (event) => {
    if (root.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeArchive();
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      // 面板打开时左右键归截图轮播，不要冒泡给下面的项目轮播
      event.preventDefault();
      event.stopPropagation();
      showShot(shotIndex + (event.key === "ArrowRight" ? 1 : -1));
      return;
    }
    if (event.key !== "Tab") return;
    // 模态期间把焦点圈在面板内
    const focusable = [...panel.querySelectorAll("a[href], button:not([disabled])")].filter(
      (node) => node.offsetParent !== null,
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener("portfolio:archive", (event) => {
    const index = Number(event.detail?.index);
    openArchive(Number.isFinite(index) ? index : 0);
  });

  window.portfolioArchive = {
    open: openArchive,
    close: closeArchive,
    select: showProject,
    isOpen: () => !root.hidden,
    state: () => ({ project: projectIndex, shot: shotIndex, id: currentProject().id }),
  };
})();
