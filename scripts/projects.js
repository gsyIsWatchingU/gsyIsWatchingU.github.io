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
