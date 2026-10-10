document.querySelectorAll("[data-project-carousel]").forEach((carousel) => {
  const track = carousel.querySelector("[data-carousel-track]");
  const viewport = carousel.querySelector("[data-carousel-viewport]");
  const slides = [...carousel.querySelectorAll("[data-carousel-slide]")];
  const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
  const previousButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const status = carousel.querySelector("[data-carousel-status]");

  if (!track || !viewport || slides.length < 2 || dots.length !== slides.length) return;

  let activeIndex = 0;
  let touchStartX = null;

  const showSlide = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    slides.forEach((slide, index) => slide.setAttribute("aria-hidden", String(index !== activeIndex)));
    dots.forEach((dot, index) => dot.setAttribute("aria-current", String(index === activeIndex)));
    status.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  };

  previousButton?.addEventListener("click", () => showSlide(activeIndex - 1));
  nextButton?.addEventListener("click", () => showSlide(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));

  carousel.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    showSlide(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
  });

  viewport.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") touchStartX = event.clientX;
  });
  viewport.addEventListener("pointerup", (event) => {
    if (touchStartX === null) return;
    const distance = event.clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) >= 42) showSlide(activeIndex + (distance < 0 ? 1 : -1));
  });
  viewport.addEventListener("pointercancel", () => {
    touchStartX = null;
  });

  showSlide(0);
});

// 轮播卡片内的界面截图切换器：缩略图只做导航，主图保持可读。
document.querySelectorAll("[data-overview-shot]").forEach((shot) => {
  const images = [...shot.querySelectorAll("[data-overview-shot-image]")];
  const tabs = [...shot.querySelectorAll("[data-overview-shot-tab]")];
  const label = shot.querySelector("[data-overview-shot-label]");
  const text = shot.querySelector("[data-overview-shot-text]");
  const captions = tabs.map((tab) => ({
    label: tab.querySelector("span")?.textContent ?? "",
    caption: tab.getAttribute("aria-label")?.replace(/^查看/, "") ?? "",
  }));

  if (images.length < 2 || tabs.length !== images.length) return;

  const show = (nextIndex) => {
    const active = (nextIndex + images.length) % images.length;
    images.forEach((img, i) => img.setAttribute("aria-hidden", String(i !== active)));
    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-current", String(i === active));
      tab.tabIndex = i === active ? 0 : -1;
    });
    if (label && captions[active]) label.textContent = captions[active].label;
    if (text && captions[active]) text.textContent = captions[active].caption;
  };

  tabs.forEach((tab, i) => tab.addEventListener("click", () => show(i)));
  shot.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    // 左右键留给截图切换，不冒泡给外层轮播，避免一次按键同时翻两处
    event.preventDefault();
    event.stopPropagation();
    const current = tabs.findIndex((tab) => tab.getAttribute("aria-current") === "true");
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = (current + step + tabs.length) % tabs.length;
    show(next);
    tabs[next]?.focus();
  });
  shot.showShot = show;
});

document.querySelectorAll("[data-project-overview]").forEach((carousel) => {
  const track = carousel.querySelector("[data-overview-track]");
  const viewport = carousel.querySelector("[data-overview-viewport]");
  const slides = [...carousel.querySelectorAll("[data-overview-slide]")];
  const dots = [...carousel.querySelectorAll("[data-overview-dot]")];
  const previousButton = carousel.querySelector("[data-overview-prev]");
  const nextButton = carousel.querySelector("[data-overview-next]");
  const toggleButton = carousel.querySelector("[data-overview-toggle]");
  const status = carousel.querySelector("[data-overview-status]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!track || !viewport || !status || slides.length < 2 || dots.length !== slides.length) return;

  let activeIndex = 0;
  let touchStartX = null;
  let autoTimer = 0;
  let userPaused = reducedMotion.matches;
  let interactionPaused = false;

  const stopAutoPlay = () => {
    window.clearTimeout(autoTimer);
    autoTimer = 0;
  };

  const updateToggleButton = () => {
    if (!toggleButton) return;
    const paused = userPaused || reducedMotion.matches;
    toggleButton.textContent = paused ? "▶" : "Ⅱ";
    toggleButton.setAttribute("aria-label", paused ? "继续自动轮播" : "暂停自动轮播");
    toggleButton.title = paused ? "继续自动轮播" : "暂停自动轮播";
  };

  const showSlide = (nextIndex, automated = false) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const hidden = index !== activeIndex;
      slide.setAttribute("aria-hidden", String(hidden));
      slide.inert = hidden;
      slide.querySelectorAll("a, button, [tabindex]").forEach((control) => {
        control.tabIndex = hidden ? -1 : 0;
      });
      // 非当前页的截图切换器复位并退出键盘序，避免一张截图被多个页面同时选中
      const shot = slide.querySelector("[data-overview-shot]");
      if (shot) {
        if (hidden) shot.showShot?.(0);
        shot.querySelectorAll("[data-overview-shot-tab]").forEach((tab, tabIndex) => {
          tab.tabIndex = !hidden && tabIndex === 0 ? 0 : -1;
        });
      }
    });
    dots.forEach((dot, index) => dot.setAttribute("aria-current", String(index === activeIndex)));
    status.setAttribute("aria-live", automated ? "off" : "polite");
    status.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  };

  const scheduleAutoPlay = () => {
    stopAutoPlay();
    if (userPaused || interactionPaused || reducedMotion.matches || document.hidden) return;
    autoTimer = window.setTimeout(() => {
      showSlide(activeIndex + 1, true);
      scheduleAutoPlay();
    }, 2200);
  };

  const selectSlide = (nextIndex) => {
    showSlide(nextIndex);
    scheduleAutoPlay();
  };

  // 供技能证据联动：选中指定项目并暂停自动轮播，方便访客阅读
  carousel.selectProject = (projectId) => {
    const index = slides.findIndex((slide) => slide.dataset.projectId === projectId);
    if (index < 0) return false;
    userPaused = true;
    updateToggleButton();
    showSlide(index);
    scheduleAutoPlay();
    return true;
  };

  previousButton?.addEventListener("click", () => selectSlide(activeIndex - 1));
  nextButton?.addEventListener("click", () => selectSlide(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener("click", () => selectSlide(index)));
  toggleButton?.addEventListener("click", () => {
    userPaused = !userPaused;
    updateToggleButton();
    scheduleAutoPlay();
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    selectSlide(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
  });
  carousel.addEventListener("pointerenter", () => {
    interactionPaused = true;
    stopAutoPlay();
  });
  carousel.addEventListener("pointerleave", () => {
    interactionPaused = false;
    scheduleAutoPlay();
  });
  carousel.addEventListener("focusin", () => {
    interactionPaused = true;
    stopAutoPlay();
  });
  carousel.addEventListener("focusout", (event) => {
    if (carousel.contains(event.relatedTarget)) return;
    interactionPaused = false;
    scheduleAutoPlay();
  });

  viewport.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch") return;
    touchStartX = event.clientX;
    viewport.setPointerCapture?.(event.pointerId);
  });
  viewport.addEventListener("pointerup", (event) => {
    if (touchStartX === null) return;
    const distance = event.clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) >= 42) selectSlide(activeIndex + (distance < 0 ? 1 : -1));
  });
  viewport.addEventListener("pointercancel", () => {
    touchStartX = null;
  });

  document.addEventListener("visibilitychange", scheduleAutoPlay);
  reducedMotion.addEventListener?.("change", () => {
    if (reducedMotion.matches) userPaused = true;
    updateToggleButton();
    scheduleAutoPlay();
  });

  showSlide(0);
  updateToggleButton();
  scheduleAutoPlay();
});

window.addEventListener("portfolio:select-project", (event) => {
  const projectId = event.detail?.projectId;
  if (!projectId) return;
  document.querySelectorAll("[data-project-overview]").forEach((carousel) => {
    carousel.selectProject?.(projectId);
  });
});
