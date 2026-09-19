(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  // 动态注入样式
  const style = document.createElement('style');
  style.textContent = '.capability-domain{transition:transform 300ms ease}.capability-domain.is-hovered{transform:translateY(-3px)}.capability-branch{transition:transform 250ms ease}.capability-branch:hover{transform:translateX(6px)}';
  document.head.appendChild(style);
  // ── 1. 数字滚动：进入视口时从 0 滚到目标值 ──
  const metricEls = document.querySelectorAll(".experience-entry__metric");
  const parseMetric = (text) => {
    const match = text.match(/([\d.]+)(W?)\+?/);
    if (!match) return null;
    const num = parseFloat(match[1]);
    const suffix = match[2] || (text.includes("+") ? "+" : "");
    return { num, suffix: text.includes("+") ? "+" : suffix, isPercent: text.includes("%") };
  };

  const animateNumber = (el) => {
    const parsed = parseMetric(el.textContent);
    if (!parsed) return;
    const { num, suffix, isPercent } = parsed;
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = num * eased;
      const display = num >= 100 ? Math.round(val) : val.toFixed(num % 1 === 0 ? 0 : 1);
      el.textContent = isPercent ? `${Math.round(val)}%` : `${display}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateNumber(entry.target);
      metricObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  metricEls.forEach((el) => metricObserver.observe(el));

  // ── 2. 点击粒子：点击时在光标处迸发小粒子 ──
  const spawnParticles = (x, y) => {
    const count = 6;
    for (let i = 0; i < count; i += 1) {
      const p = document.createElement("div");
      p.style.cssText = `
        position: fixed; left: ${x}px; top: ${y}px;
        width: 4px; height: 4px; border-radius: 50%;
        background: var(--orange, #d7a15d);
        pointer-events: none; z-index: 9999;
        mix-blend-mode: screen;
      `;
      document.body.appendChild(p);
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const dist = 30 + Math.random() * 30;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      p.animate([
        { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`, opacity: 0 },
      ], { duration: 500 + Math.random() * 200, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" })
        .onfinish = () => p.remove();
    }
  };
  document.addEventListener("click", (e) => {
    // 不在 hero 的 3D canvas 上迸发（那里已经有光束反馈了）
    if (e.target.closest(".hero__visual")) return;
    spawnParticles(e.clientX, e.clientY);
  });

  // ── 3. 右侧滚动进度条 ──
  const bar = document.createElement("div");
  bar.setAttribute("aria-hidden", "true");
  bar.style.cssText = `
    position: fixed; right: 0; top: 0; width: 3px; height: 100vh;
    background: rgba(0,0,0,0.06); z-index: 999; pointer-events: none;
  `;
  const fill = document.createElement("div");
  fill.style.cssText = "width: 100%; height: 0%; background: var(--orange, #d7a15d); transition: height 80ms linear;";
  bar.appendChild(fill);
  document.body.appendChild(bar);

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? window.scrollY / max : 0;
    fill.style.height = `${pct * 100}%`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ── 4. 键盘快捷键：1=首屏 2=技能 3=经历 4=项目 ──
  const sectionMap = { "1": "#top", "2": "#skills", "3": "#experience", "4": "#projects" };
  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea")) return;
    const target = sectionMap[e.key];
    if (target) document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  });

  // ── 5. 技能树 hover：鼠标 hover branch 时，整条 domain 提亮 ──
  document.querySelectorAll(".capability-branch").forEach((branch) => {
    const domain = branch.closest(".capability-domain");
    if (!domain) return;
    branch.addEventListener("mouseenter", () => domain.classList.add("is-hovered"));
    branch.addEventListener("mouseleave", () => domain.classList.remove("is-hovered"));
  });
})();

