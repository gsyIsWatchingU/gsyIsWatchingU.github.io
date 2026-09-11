(function () {
  'use strict';

  var dom = {
    app: document.getElementById('app'),
    canvas: document.getElementById('game-canvas'),
    landing: document.getElementById('landing'),
    hud: document.getElementById('hud'),
    controls: document.getElementById('controls'),
    start: document.getElementById('start-button'),
    pause: document.getElementById('pause-button'),
    pauseModal: document.getElementById('pause-modal'),
    resume: document.getElementById('resume-button'),
    restart: document.getElementById('restart-button'),
    quality: document.getElementById('quality-button'),
    joystick: document.getElementById('joystick'),
    knob: document.getElementById('joystick-knob'),
    sneak: document.getElementById('sneak-button'),
    dash: document.getElementById('dash-button'),
    interact: document.getElementById('interact-button'),
    interactLabel: document.getElementById('interact-label'),
    hint: document.getElementById('interaction-hint'),
    courage: document.getElementById('courage-value'),
    courageBar: document.getElementById('courage-bar'),
    ember: document.getElementById('ember-value'),
    moth: document.getElementById('moth-value'),
    objective: document.getElementById('objective-text'),
    objectiveKicker: document.getElementById('objective-kicker'),
    danger: document.getElementById('danger'),
    toast: document.getElementById('toast'),
    choiceModal: document.getElementById('choice-modal'),
    ending: document.getElementById('ending'),
    endingSummary: document.getElementById('ending-summary'),
    again: document.getElementById('again-button'),
    fallback: document.getElementById('fallback'),
    fallbackStory: document.getElementById('fallback-story'),
    fallbackAction: document.getElementById('fallback-action')
  };

  var keys = {};
  var input = { x: 0, y: 0, sneak: false, pointerId: null, cameraPointer: null, lastCameraX: 0 };
  var lastFrame = 0;
  var rafId = 0;
  var toastTimer = 0;
  var objectiveTimer = 0;
  var audioContext = null;
  var renderer = null;
  var nearest = null;
  var performanceWindow = { total: 0, count: 0, degraded: false };

  var state = {
    started: false,
    paused: false,
    choosing: false,
    ended: false,
    x: 0,
    z: 17,
    facing: Math.PI,
    cameraYaw: 0,
    courage: 100,
    ember: 0,
    activated: 0,
    hidden: false,
    dashCooldown: 0,
    dashTime: 0,
    walkPhase: 0,
    motion: 0,
    qualityMode: 'auto',
    elapsed: 0,
    upgrades: loadUpgrades(),
    fragments: [],
    altars: [],
    enemies: []
  };

  function loadUpgrades() {
    try {
      var raw = localStorage.getItem('mist-clock-upgrades');
      var data = raw ? JSON.parse(raw) : null;
      if (data && typeof data.shelter === 'number' && typeof data.agility === 'number' && typeof data.echo === 'number') return data;
    } catch (error) { /* 本地存储不可用时仍可游玩 */ }
    return { shelter: 0, agility: 0, echo: 0 };
  }

  function saveUpgrades() {
    try { localStorage.setItem('mist-clock-upgrades', JSON.stringify(state.upgrades)); } catch (error) { /* 忽略隔离存储异常 */ }
  }

  function resetRun() {
    state.x = 0;
    state.z = 17;
    state.facing = Math.PI;
    state.cameraYaw = 0;
    state.courage = 100;
    state.ember = 0;
    state.activated = 0;
    state.hidden = false;
    state.dashCooldown = 0;
    state.dashTime = 0;
    state.walkPhase = 0;
    state.motion = 0;
    state.elapsed = 0;
    state.paused = false;
    state.choosing = false;
    state.ended = false;
    state.fragments = [
      { x: 0, z: 15.1, found: false },
      { x: -4.6, z: 11.6, found: false },
      { x: 4.4, z: 7.2, found: false },
      { x: 5.2, z: 1.6, found: false },
      { x: -5.6, z: -4.3, found: false },
      { x: 1.7, z: -8.4, found: false },
      { x: 5.6, z: -13.2, found: false },
      { x: -2.2, z: -16.5, found: false }
    ];
    state.altars = [
      { x: -6.3, z: 8.6, active: false },
      { x: 6.2, z: -2.2, active: false },
      { x: 0, z: -20.1, active: false }
    ];
    state.enemies = [
      { x: 4.7, z: 7.2, baseX: 4.7, baseZ: 7.2, phase: 0, axis: 'x', range: 2.1 },
      { x: -4.4, z: -5.6, baseX: -4.4, baseZ: -5.6, phase: 2.1, axis: 'z', range: 2.4 },
      { x: 3.7, z: -15.2, baseX: 3.7, baseZ: -15.2, phase: 4.4, axis: 'x', range: 2.2 }
    ];
    dom.choiceModal.hidden = true;
    dom.pauseModal.hidden = true;
    dom.ending.hidden = true;
    dom.objective.textContent = '';
    updateHud();
  }

  function setAppHeight() {
    var height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    document.documentElement.style.setProperty('--app-height', Math.round(height) + 'px');
    if (renderer) renderer.resize();
  }

  function supportsFlexGap() {
    var flex = document.createElement('div');
    flex.style.position = 'absolute';
    flex.style.visibility = 'hidden';
    flex.style.display = 'flex';
    flex.style.flexDirection = 'column';
    flex.style.rowGap = '1px';
    flex.appendChild(document.createElement('div'));
    flex.appendChild(document.createElement('div'));
    document.body.appendChild(flex);
    var supported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);
    return supported;
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    dom.toast.textContent = message;
    dom.toast.classList.add('is-visible');
    toastTimer = setTimeout(function () { dom.toast.classList.remove('is-visible'); }, 2100);
  }

  function initAudio() {
    if (audioContext) return;
    var AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return;
    try { audioContext = new AudioCtor(); } catch (error) { audioContext = null; }
  }

  function tone(frequency, duration, volume) {
    if (!audioContext) return;
    try {
      var oscillator = audioContext.createOscillator();
      var gain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(volume, audioContext.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration + 0.02);
    } catch (error) { /* 声音属于可选增强 */ }
  }

  function startGame() {
    initAudio();
    if (!renderer || !renderer.ready) {
      dom.landing.hidden = true;
      dom.fallback.hidden = false;
      return;
    }
    resetRun();
    state.started = true;
    dom.landing.hidden = true;
    dom.hud.hidden = false;
    dom.controls.hidden = false;
    lastFrame = performance.now();
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(frame);
    showToast('跟随烛蛾 · 光会指向可触碰之物');
  }

  function togglePause(force) {
    if (!state.started || state.ended || state.choosing) return;
    state.paused = typeof force === 'boolean' ? force : !state.paused;
    dom.pauseModal.hidden = !state.paused;
    if (!state.paused) lastFrame = performance.now();
  }

  function restart() {
    resetRun();
    state.started = true;
    dom.ending.hidden = true;
    dom.hud.hidden = false;
    dom.controls.hidden = false;
    lastFrame = performance.now();
    showToast('钟摆回到最初的位置');
  }

  function setQuality(mode) {
    state.qualityMode = mode;
    if (renderer) renderer.resize();
    var labels = { auto: '画质：自动', high: '画质：精细', low: '画质：流畅' };
    dom.quality.textContent = labels[mode];
  }

  function cycleQuality() {
    if (state.qualityMode === 'auto') setQuality('high');
    else if (state.qualityMode === 'high') setQuality('low');
    else setQuality('auto');
  }

  function setObjective(kicker, text) {
    if (dom.objective.textContent === text && dom.objectiveKicker.textContent === kicker) return;
    dom.objectiveKicker.textContent = kicker;
    dom.objective.textContent = text;
    dom.objective.parentNode.classList.add('is-visible');
    clearTimeout(objectiveTimer);
    objectiveTimer = setTimeout(function () { dom.objective.parentNode.classList.remove('is-visible'); }, 3600);
  }

  function updateHud() {
    dom.courage.textContent = Math.max(0, Math.round(state.courage));
    dom.courageBar.style.width = Math.max(0, state.courage) + '%';
    dom.courageBar.style.background = state.courage < 35 ? 'rgba(181,95,74,.82)' : 'rgba(194,202,196,.58)';
    dom.ember.textContent = state.ember;
    dom.moth.textContent = 'LV.' + (1 + state.activated + state.upgrades.shelter + state.upgrades.agility + state.upgrades.echo);
    if (state.activated === 0) {
      setObjective('雾林入口', state.ember < 2 ? '跟随微光，寻找遗落的余烬' : '用 2 枚余烬唤醒第一座钟坛');
    } else if (state.activated < 3) {
      setObjective('钟坛 ' + state.activated + ' / 3', state.ember < 2 ? '穿过沉默宿舍，补充烛蛾的光' : '深入钟楼，寻找下一座钟坛');
    } else {
      setObjective('钟声复苏', '前往孤院尽头');
    }
  }

  function distance(ax, az, bx, bz) {
    var dx = ax - bx;
    var dz = az - bz;
    return Math.sqrt(dx * dx + dz * dz);
  }

  function findNearest() {
    var range = 1.45 + state.upgrades.echo * 0.25;
    var best = null;
    var bestDistance = range;
    var i;
    for (i = 0; i < state.fragments.length; i += 1) {
      if (state.fragments[i].found) continue;
      var fd = distance(state.x, state.z, state.fragments[i].x, state.fragments[i].z);
      if (fd < bestDistance) { best = { type: 'fragment', item: state.fragments[i] }; bestDistance = fd; }
    }
    for (i = 0; i < state.altars.length; i += 1) {
      if (state.altars[i].active) continue;
      var ad = distance(state.x, state.z, state.altars[i].x, state.altars[i].z);
      if (ad < bestDistance + 0.55) { best = { type: 'altar', item: state.altars[i] }; bestDistance = ad; }
    }
    var hidingSpots = [{ x: -7.1, z: 3 }, { x: 7.1, z: -8 }, { x: -7.1, z: -14 }];
    for (i = 0; i < hidingSpots.length; i += 1) {
      var hd = distance(state.x, state.z, hidingSpots[i].x, hidingSpots[i].z);
      if (hd < bestDistance) { best = { type: 'hide', item: hidingSpots[i] }; bestDistance = hd; }
    }
    return best;
  }

  function updateInteraction() {
    nearest = findNearest();
    dom.interact.classList.toggle('is-active', !!nearest);
    if (!nearest) {
      dom.interactLabel.textContent = '感知';
      dom.hint.textContent = '';
      dom.hint.classList.remove('is-visible');
      return;
    }
    dom.hint.classList.add('is-visible');
    if (nearest.type === 'fragment') {
      dom.interactLabel.textContent = '拾取';
      dom.hint.textContent = '发现记忆余烬';
    } else if (nearest.type === 'altar') {
      dom.interactLabel.textContent = state.ember >= 2 ? '点燃' : '缺少余烬';
      dom.hint.textContent = state.ember >= 2 ? '消耗 2 枚余烬唤醒钟坛' : '钟坛需要 2 枚余烬';
    } else {
      dom.interactLabel.textContent = state.hidden ? '离开' : '藏身';
      dom.hint.textContent = state.hidden ? '离开藏身处' : '躲入阴影，避开巡夜者';
    }
  }

  function interact() {
    if (!state.started || state.paused || state.choosing || state.ended) return;
    nearest = findNearest();
    if (!nearest) { showToast('烛蛾没有感应到可互动之物'); tone(120, .08, .025); return; }
    if (nearest.type === 'fragment') {
      nearest.item.found = true;
      state.ember += 1;
      state.courage = Math.min(100, state.courage + 8);
      tone(520, .28, .055);
      setTimeout(function () { tone(780, .24, .035); }, 80);
      showToast('获得记忆余烬 · 烛蛾的光更明亮了');
    } else if (nearest.type === 'altar') {
      if (state.ember < 2) { showToast('钟坛回应微弱：还需要 ' + (2 - state.ember) + ' 枚余烬'); tone(95, .2, .03); return; }
      nearest.item.active = true;
      state.ember -= 2;
      state.activated += 1;
      state.choosing = true;
      dom.choiceModal.hidden = false;
      tone(170, .7, .05);
      setTimeout(function () { tone(340, .7, .04); }, 130);
    } else {
      state.hidden = !state.hidden;
      input.sneak = state.hidden;
      dom.sneak.classList.toggle('is-active', state.hidden);
      showToast(state.hidden ? '你藏进了阴影 · 巡夜者暂时看不见你' : '你离开藏身处');
    }
    updateHud();
    updateInteraction();
  }

  function chooseUpgrade(choice) {
    if (!state.choosing || !state.upgrades.hasOwnProperty(choice)) return;
    state.upgrades[choice] += 1;
    saveUpgrades();
    state.choosing = false;
    dom.choiceModal.hidden = true;
    updateHud();
    var names = { shelter: '温灯庇护', agility: '无声足迹', echo: '余烬回响' };
    showToast(names[choice] + ' 已融入烛蛾 · 永久养成已保存');
    if (state.activated >= 3) {
      setTimeout(finishRun, 700);
    } else {
      lastFrame = performance.now();
    }
  }

  function finishRun() {
    state.ended = true;
    state.paused = true;
    dom.controls.hidden = true;
    dom.hud.hidden = true;
    var strongest = '守护';
    if (state.upgrades.agility > state.upgrades.shelter && state.upgrades.agility >= state.upgrades.echo) strongest = '疾行';
    else if (state.upgrades.echo > state.upgrades.shelter && state.upgrades.echo > state.upgrades.agility) strongest = '感知';
    dom.endingSummary.textContent = '烛蛾记住了你的“' + strongest + '”倾向。新的旅程中，巡夜路径与成长选择仍会带来不同结果。';
    dom.ending.hidden = false;
  }

  function dash() {
    if (!state.started || state.paused || state.choosing || state.ended || state.dashCooldown > 0) return;
    state.dashCooldown = Math.max(.65, 1.25 - state.upgrades.agility * .08);
    state.dashTime = .18;
    state.hidden = false;
    tone(260, .12, .035);
  }

  function isBlocked(x, z) {
    if (x < -8.3 || x > 8.3 || z < -22 || z > 19) return true;
    var blocks = [
      { x: -3.85, z: 11.2, r: 2.15 },
      { x: -4.6, z: 6, r: .75 }, { x: 4.6, z: 6, r: .75 },
      { x: -4.6, z: -6, r: .75 }, { x: 4.6, z: -6, r: .75 },
      { x: -4.6, z: -17, r: .75 }, { x: 4.6, z: -17, r: .75 }
    ];
    for (var i = 0; i < blocks.length; i += 1) {
      if (distance(x, z, blocks[i].x, blocks[i].z) < blocks[i].r) return true;
    }
    return false;
  }

  function update(dt) {
    if (state.paused || state.choosing || state.ended) return;
    state.elapsed += dt;
    state.dashCooldown = Math.max(0, state.dashCooldown - dt);
    state.dashTime = Math.max(0, state.dashTime - dt);

    var moveX = input.x + (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0);
    var moveY = input.y + (keys.KeyS || keys.ArrowDown ? 1 : 0) - (keys.KeyW || keys.ArrowUp ? 1 : 0);
    var length = Math.sqrt(moveX * moveX + moveY * moveY);
    if (length > 1) { moveX /= length; moveY /= length; }
    var moving = length > .08;
    var sneaking = input.sneak || keys.ShiftLeft || keys.ShiftRight || state.hidden;
    state.motion = moving && !state.hidden ? Math.min(1, state.motion + dt * 7) : Math.max(0, state.motion - dt * 5);
    if (moving && !state.hidden) state.walkPhase += dt * (sneaking ? 5.2 : 8.4);
    var speed = sneaking ? 1.45 : 2.65 + state.upgrades.agility * .14;
    if (state.dashTime > 0) speed *= 3.2 + state.upgrades.agility * .12;
    if (moving && !state.hidden) {
      var sin = Math.sin(state.cameraYaw);
      var cos = Math.cos(state.cameraYaw);
      var worldX = moveX * cos - moveY * sin;
      var worldZ = moveX * sin + moveY * cos;
      var nextX = state.x + worldX * speed * dt;
      var nextZ = state.z + worldZ * speed * dt;
      if (!isBlocked(nextX, state.z)) state.x = nextX;
      if (!isBlocked(state.x, nextZ)) state.z = nextZ;
      state.facing = Math.atan2(worldX, worldZ);
    }

    var seen = false;
    for (var i = 0; i < state.enemies.length; i += 1) {
      var enemy = state.enemies[i];
      if (enemy.axis === 'x') enemy.x = enemy.baseX + Math.sin(state.elapsed * .34 + enemy.phase) * enemy.range;
      else enemy.z = enemy.baseZ + Math.sin(state.elapsed * .3 + enemy.phase) * enemy.range;
      var detectRange = sneaking ? 2.2 : 4.3;
      detectRange -= Math.min(.9, state.upgrades.shelter * .13);
      if (!state.hidden && distance(state.x, state.z, enemy.x, enemy.z) < detectRange) seen = true;
    }
    if (seen) {
      var resistance = Math.max(.35, 1 - state.upgrades.shelter * .12);
      state.courage -= dt * 17 * resistance;
    } else {
      state.courage = Math.min(100, state.courage + dt * 2.2);
    }
    dom.danger.classList.toggle('is-visible', seen);
    if (state.courage <= 0) {
      state.courage = 72;
      state.ember = Math.max(0, state.ember - 1);
      state.x = 0;
      state.z = 17;
      showToast('勇气耗尽 · 烛蛾把你带回了入口');
      tone(72, .7, .05);
    }
    updateInteraction();
    updateHud();
  }

  function frame(now) {
    var deltaMs = Math.min(50, now - lastFrame);
    lastFrame = now;
    update(deltaMs / 1000);
    if (renderer && renderer.ready) renderer.render(state);

    if (state.qualityMode === 'auto' && !performanceWindow.degraded) {
      performanceWindow.total += deltaMs;
      performanceWindow.count += 1;
      if (performanceWindow.count >= 90) {
        if (performanceWindow.total / performanceWindow.count > 36) {
          performanceWindow.degraded = true;
          setQuality('low');
          showToast('已自动降低粒子与像素密度，保持操作流畅');
        }
        performanceWindow.total = 0;
        performanceWindow.count = 0;
      }
    }
    rafId = requestAnimationFrame(frame);
  }

  function bindInput() {
    window.addEventListener('resize', setAppHeight);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', setAppHeight);
    window.addEventListener('keydown', function (event) {
      keys[event.code] = true;
      if (event.code === 'KeyE') interact();
      if (event.code === 'Space') { event.preventDefault(); dash(); }
      if (event.code === 'Escape') togglePause();
    });
    window.addEventListener('keyup', function (event) { keys[event.code] = false; });

    dom.start.addEventListener('click', startGame);
    dom.pause.addEventListener('click', function () { togglePause(); });
    dom.resume.addEventListener('click', function () { togglePause(false); });
    dom.restart.addEventListener('click', restart);
    dom.quality.addEventListener('click', cycleQuality);
    dom.interact.addEventListener('click', interact);
    dom.dash.addEventListener('click', dash);
    dom.sneak.addEventListener('pointerdown', function (event) {
      event.preventDefault();
      input.sneak = true;
      state.hidden = false;
      dom.sneak.classList.add('is-active');
    });
    function releaseSneak() { input.sneak = false; dom.sneak.classList.remove('is-active'); }
    dom.sneak.addEventListener('pointerup', releaseSneak);
    dom.sneak.addEventListener('pointercancel', releaseSneak);
    dom.sneak.addEventListener('pointerleave', releaseSneak);
    dom.again.addEventListener('click', restart);

    var choiceButtons = document.querySelectorAll('.choice-card');
    for (var i = 0; i < choiceButtons.length; i += 1) {
      choiceButtons[i].addEventListener('click', function (event) {
        chooseUpgrade(event.currentTarget.getAttribute('data-choice'));
      });
    }

    dom.joystick.addEventListener('pointerdown', function (event) {
      input.pointerId = event.pointerId;
      dom.joystick.setPointerCapture(event.pointerId);
      updateJoystick(event);
    });
    dom.joystick.addEventListener('pointermove', function (event) {
      if (event.pointerId === input.pointerId) updateJoystick(event);
    });
    function releaseJoystick(event) {
      if (input.pointerId !== null && event.pointerId !== input.pointerId) return;
      input.pointerId = null;
      input.x = 0;
      input.y = 0;
      dom.knob.style.transform = 'translate3d(0,0,0)';
    }
    dom.joystick.addEventListener('pointerup', releaseJoystick);
    dom.joystick.addEventListener('pointercancel', releaseJoystick);

    dom.canvas.addEventListener('pointerdown', function (event) {
      if (!state.started || state.paused) return;
      input.cameraPointer = event.pointerId;
      input.lastCameraX = event.clientX;
      dom.canvas.setPointerCapture(event.pointerId);
    });
    dom.canvas.addEventListener('pointermove', function (event) {
      if (event.pointerId !== input.cameraPointer) return;
      var movement = event.clientX - input.lastCameraX;
      input.lastCameraX = event.clientX;
      state.cameraYaw -= movement * .009;
    });
    function releaseCamera(event) { if (event.pointerId === input.cameraPointer) input.cameraPointer = null; }
    dom.canvas.addEventListener('pointerup', releaseCamera);
    dom.canvas.addEventListener('pointercancel', releaseCamera);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        if (state.started && !state.ended) togglePause(true);
      } else if (state.started && !state.ended) {
        lastFrame = performance.now();
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(frame);
      }
    });
  }

  function updateJoystick(event) {
    var rect = dom.joystick.getBoundingClientRect();
    var radius = rect.width * .34;
    var dx = event.clientX - (rect.left + rect.width / 2);
    var dy = event.clientY - (rect.top + rect.height / 2);
    var length = Math.sqrt(dx * dx + dy * dy);
    if (length > radius) { dx = dx / length * radius; dy = dy / length * radius; }
    input.x = dx / radius;
    input.y = dy / radius;
    dom.knob.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0)';
  }

  function createRenderer(canvas) {
    var gl;
    try { gl = canvas.getContext('webgl', { alpha: false, antialias: true, powerPreference: 'default' }); } catch (error) { gl = null; }
    if (!gl) return { ready: false, resize: function () {}, render: function () {} };

    var vertexSource = [
      'attribute vec3 aPosition;',
      'attribute vec3 aNormal;',
      'uniform mat4 uProjection;',
      'uniform mat4 uView;',
      'uniform mat4 uModel;',
      'varying vec3 vNormal;',
      'varying float vDepth;',
      'varying vec3 vWorld;',
      'void main(){',
      ' vec4 world=uModel*vec4(aPosition,1.0);',
      ' vec4 viewPos=uView*world;',
      ' gl_Position=uProjection*viewPos;',
      ' vNormal=mat3(uModel)*aNormal;',
      ' vDepth=-viewPos.z;',
      ' vWorld=world.xyz;',
      '}'
    ].join('\n');
    var fragmentSource = [
      'precision mediump float;',
      'uniform vec3 uColor;',
      'uniform float uEmissive;',
      'uniform float uTime;',
      'uniform vec3 uPlayerLight;',
      'varying vec3 vNormal;',
      'varying float vDepth;',
      'varying vec3 vWorld;',
      'void main(){',
      ' vec3 normal=normalize(vNormal);',
      ' vec3 light=normalize(vec3(-0.55,0.9,0.22));',
      ' float diffuse=max(dot(normal,light),0.0);',
      ' float backlight=max(dot(normal,normalize(vec3(0.6,0.15,-0.7))),0.0);',
      ' float lampDistance=length(vWorld-uPlayerLight);',
      ' float lamp=1.0-smoothstep(0.45,5.4,lampDistance);',
      ' float lampFace=max(dot(normal,normalize(uPlayerLight-vWorld)),0.0);',
      ' float pulse=1.0+sin(uTime*3.0+vWorld.x)*0.08*uEmissive;',
      ' vec3 lit=uColor*(0.24+diffuse*0.56+backlight*0.18);',
      ' lit+=vec3(0.48,0.31,0.12)*lamp*(0.1+lampFace*0.42);',
      ' lit+=uColor*uEmissive*pulse;',
      ' float fog=smoothstep(8.0,29.0,vDepth);',
      ' fog=max(fog,smoothstep(5.5,13.0,vDepth)*clamp((vWorld.y-4.0)*0.04,0.0,0.16));',
      ' vec3 fogColor=vec3(0.155,0.185,0.19);',
      ' gl_FragColor=vec4(mix(lit,fogColor,fog),1.0);',
      '}'
    ].join('\n');

    function compile(type, source) {
      var shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
      return shader;
    }

    var vertexShader = compile(gl.VERTEX_SHADER, vertexSource);
    var fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) return { ready: false, resize: function () {}, render: function () {} };
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return { ready: false, resize: function () {}, render: function () {} };

    var cubeData = new Float32Array([
      -1,-1,1, 0,0,1, 1,-1,1, 0,0,1, 1,1,1, 0,0,1, -1,-1,1, 0,0,1, 1,1,1, 0,0,1, -1,1,1, 0,0,1,
      1,-1,-1, 0,0,-1, -1,-1,-1, 0,0,-1, -1,1,-1, 0,0,-1, 1,-1,-1, 0,0,-1, -1,1,-1, 0,0,-1, 1,1,-1, 0,0,-1,
      -1,-1,-1, -1,0,0, -1,-1,1, -1,0,0, -1,1,1, -1,0,0, -1,-1,-1, -1,0,0, -1,1,1, -1,0,0, -1,1,-1, -1,0,0,
      1,-1,1, 1,0,0, 1,-1,-1, 1,0,0, 1,1,-1, 1,0,0, 1,-1,1, 1,0,0, 1,1,-1, 1,0,0, 1,1,1, 1,0,0,
      -1,1,1, 0,1,0, 1,1,1, 0,1,0, 1,1,-1, 0,1,0, -1,1,1, 0,1,0, 1,1,-1, 0,1,0, -1,1,-1, 0,1,0,
      -1,-1,-1, 0,-1,0, 1,-1,-1, 0,-1,0, 1,-1,1, 0,-1,0, -1,-1,-1, 0,-1,0, 1,-1,1, 0,-1,0, -1,-1,1, 0,-1,0
    ]);
    gl.useProgram(program);
    var aPosition = gl.getAttribLocation(program, 'aPosition');
    var aNormal = gl.getAttribLocation(program, 'aNormal');
    gl.enableVertexAttribArray(aPosition);
    gl.enableVertexAttribArray(aNormal);

    function pushVertex(vertices, point, normal) {
      vertices.push(point[0], point[1], point[2], normal[0], normal[1], normal[2]);
    }

    function pushTriangle(vertices, a, b, c, na, nb, nc) {
      pushVertex(vertices, a, na); pushVertex(vertices, b, nb); pushVertex(vertices, c, nc);
    }

    function spherePoint(latitude, longitude) {
      var ring = Math.cos(latitude);
      return [ring * Math.cos(longitude), Math.sin(latitude), ring * Math.sin(longitude)];
    }

    function createSphereData(segments, rings) {
      var vertices = [];
      for (var ringIndex = 0; ringIndex < rings; ringIndex += 1) {
        var latitude0 = -Math.PI / 2 + Math.PI * ringIndex / rings;
        var latitude1 = -Math.PI / 2 + Math.PI * (ringIndex + 1) / rings;
        for (var segmentIndex = 0; segmentIndex < segments; segmentIndex += 1) {
          var longitude0 = Math.PI * 2 * segmentIndex / segments;
          var longitude1 = Math.PI * 2 * (segmentIndex + 1) / segments;
          var p00 = spherePoint(latitude0, longitude0);
          var p01 = spherePoint(latitude0, longitude1);
          var p10 = spherePoint(latitude1, longitude0);
          var p11 = spherePoint(latitude1, longitude1);
          pushTriangle(vertices, p00, p10, p01, p00, p10, p01);
          pushTriangle(vertices, p01, p10, p11, p01, p10, p11);
        }
      }
      return new Float32Array(vertices);
    }

    function createFrustumData(segments, topRadius, bottomRadius) {
      var vertices = [];
      var slope = (bottomRadius - topRadius) / 2;
      for (var segmentIndex = 0; segmentIndex < segments; segmentIndex += 1) {
        var angle0 = Math.PI * 2 * segmentIndex / segments;
        var angle1 = Math.PI * 2 * (segmentIndex + 1) / segments;
        var bottom0 = [Math.cos(angle0) * bottomRadius, -1, Math.sin(angle0) * bottomRadius];
        var bottom1 = [Math.cos(angle1) * bottomRadius, -1, Math.sin(angle1) * bottomRadius];
        var top0 = [Math.cos(angle0) * topRadius, 1, Math.sin(angle0) * topRadius];
        var top1 = [Math.cos(angle1) * topRadius, 1, Math.sin(angle1) * topRadius];
        var normal0 = [Math.cos(angle0), slope, Math.sin(angle0)];
        var normal1 = [Math.cos(angle1), slope, Math.sin(angle1)];
        var normalLength = Math.sqrt(1 + slope * slope);
        normal0[0] /= normalLength; normal0[1] /= normalLength; normal0[2] /= normalLength;
        normal1[0] /= normalLength; normal1[1] /= normalLength; normal1[2] /= normalLength;
        pushTriangle(vertices, bottom0, top0, bottom1, normal0, normal0, normal1);
        pushTriangle(vertices, bottom1, top0, top1, normal1, normal0, normal1);
        pushTriangle(vertices, [0, 1, 0], top1, top0, [0, 1, 0], [0, 1, 0], [0, 1, 0]);
        pushTriangle(vertices, [0, -1, 0], bottom0, bottom1, [0, -1, 0], [0, -1, 0], [0, -1, 0]);
      }
      return new Float32Array(vertices);
    }

    function createMesh(data) {
      var meshBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, meshBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      return { buffer: meshBuffer, count: data.length / 6 };
    }

    var meshes = {
      cube: createMesh(cubeData),
      sphere: createMesh(createSphereData(18, 12)),
      cylinder: createMesh(createFrustumData(12, 1, 1)),
      cloak: createMesh(createFrustumData(14, .5, 1)),
      hood: createMesh(createFrustumData(14, .04, 1))
    };

    function bindMesh(mesh) {
      gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffer);
      gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 24, 0);
      gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 24, 12);
    }

    bindMesh(meshes.cube);

    var uniforms = {
      projection: gl.getUniformLocation(program, 'uProjection'),
      view: gl.getUniformLocation(program, 'uView'),
      model: gl.getUniformLocation(program, 'uModel'),
      color: gl.getUniformLocation(program, 'uColor'),
      emissive: gl.getUniformLocation(program, 'uEmissive'),
      time: gl.getUniformLocation(program, 'uTime'),
      playerLight: gl.getUniformLocation(program, 'uPlayerLight')
    };
    var projection = mat4();
    var view = mat4();
    var model = mat4();
    var ready = true;

    var staticObjects = createWorld();
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.clearColor(.065, .082, .086, 1);

    function resize() {
      var rect = canvas.getBoundingClientRect();
      var dpr = state.qualityMode === 'low' ? 1 : (state.qualityMode === 'high' ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 1.35));
      var maxPixels = state.qualityMode === 'low' ? 1000000 : 1800000;
      var width = Math.max(1, Math.round(rect.width * dpr));
      var height = Math.max(1, Math.round(rect.height * dpr));
      var pixels = width * height;
      if (pixels > maxPixels) {
        var factor = Math.sqrt(maxPixels / pixels);
        width = Math.round(width * factor);
        height = Math.round(height * factor);
      }
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
      gl.viewport(0, 0, width, height);
      perspective(projection, Math.PI / 3.45, width / height, .1, 64);
    }

    function drawShape(mesh, x, y, z, sx, sy, sz, color, rotationY, rotationX, rotationZ, emissive) {
      identity(model);
      translate(model, model, [x, y, z]);
      rotateY(model, model, rotationY || 0);
      rotateX(model, model, rotationX || 0);
      rotateZ(model, model, rotationZ || 0);
      scale(model, model, [sx, sy, sz]);
      bindMesh(mesh);
      gl.uniformMatrix4fv(uniforms.model, false, model);
      gl.uniform3fv(uniforms.color, color);
      gl.uniform1f(uniforms.emissive, emissive || 0);
      gl.drawArrays(gl.TRIANGLES, 0, mesh.count);
    }

    function drawCube(x, y, z, sx, sy, sz, color, rotation, emissive) {
      drawShape(meshes.cube, x, y, z, sx, sy, sz, color, rotation, 0, 0, emissive);
    }

    function render(world) {
      if (!ready) return;
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(program);
      var portrait = canvas.height > canvas.width * 1.25;
      var cameraDistance = portrait ? 8.5 : 9.2;
      var cameraHeight = portrait ? 2.78 : 2.45;
      var eyeX = world.x + Math.sin(world.cameraYaw) * cameraDistance;
      var eyeZ = world.z + Math.cos(world.cameraYaw) * cameraDistance;
      var lookAheadX = world.x - Math.sin(world.cameraYaw) * (portrait ? 2.1 : 3.1);
      var lookAheadZ = world.z - Math.cos(world.cameraYaw) * (portrait ? 2.1 : 3.1);
      lookAt(view, [eyeX, cameraHeight, eyeZ], [lookAheadX, .92, lookAheadZ], [0, 1, 0]);
      gl.uniformMatrix4fv(uniforms.projection, false, projection);
      gl.uniformMatrix4fv(uniforms.view, false, view);
      gl.uniform1f(uniforms.time, world.elapsed);
      gl.uniform3fv(uniforms.playerLight, [world.x, 1.05, world.z]);

      var i;
      for (i = 0; i < staticObjects.length; i += 1) {
        var o = staticObjects[i];
        drawShape(meshes[o.mesh || 'cube'], o.x, o.y, o.z, o.sx, o.sy, o.sz, o.color, o.r, o.rx || 0, o.rz || 0, o.e || 0);
      }

      for (i = 0; i < world.fragments.length; i += 1) {
        var fragment = world.fragments[i];
        if (!fragment.found) {
          var fy = .55 + Math.sin(world.elapsed * 2.2 + i) * .12;
          drawShape(meshes.sphere, fragment.x, fy, fragment.z, .1, .24, .07, [.72, .74, .43], world.elapsed + i, 0, .24, 1.25);
        }
      }

      for (i = 0; i < world.altars.length; i += 1) {
        var altar = world.altars[i];
        drawCube(altar.x, .18, altar.z, .68, .18, .68, [.13, .16, .16], 0, 0);
        drawShape(meshes.cylinder, altar.x, .74, altar.z, .16, .55, .16, altar.active ? [.45, .43, .24] : [.18, .22, .22], 0, 0, 0, altar.active ? .55 : .03);
        drawShape(meshes.hood, altar.x, 1.42, altar.z, .38, .38, .32, altar.active ? [.72, .68, .36] : [.23, .27, .27], world.elapsed * .08, Math.PI, 0, altar.active ? .72 : .02);
        drawShape(meshes.sphere, altar.x, 1.17, altar.z, .12, .08, .12, altar.active ? [.82, .76, .4] : [.12, .15, .15], 0, 0, 0, altar.active ? 1.25 : 0);
      }

      for (i = 0; i < world.enemies.length; i += 1) drawEnemy(world.enemies[i], world.elapsed + i);
      drawPlayer(world);
      drawMotes(world);
    }

    function drawPlayer(world) {
      var step = Math.sin(world.walkPhase) * world.motion;
      var bob = Math.abs(Math.sin(world.walkPhase * 2)) * .025 * world.motion;
      var legSwing = step * .48;
      var armSwing = -step * .4;
      var alpha = world.hidden ? .23 : 1;
      var cloth = [.18 * alpha, .235 * alpha, .23 * alpha];
      var clothDark = [.085 * alpha, .115 * alpha, .115 * alpha];
      var skin = [.255 * alpha, .225 * alpha, .19 * alpha];
      var rightX = Math.cos(world.facing);
      var rightZ = -Math.sin(world.facing);
      var frontX = Math.sin(world.facing);
      var frontZ = Math.cos(world.facing);
      var leftLegX = world.x - rightX * .12;
      var leftLegZ = world.z - rightZ * .12;
      var rightLegX = world.x + rightX * .12;
      var rightLegZ = world.z + rightZ * .12;

      drawShape(meshes.sphere, world.x, .025, world.z, .38, .025, .29, [.012, .016, .016], world.facing, 0, 0, 0);
      drawShape(meshes.cylinder, leftLegX, .37 + bob, leftLegZ, .075, .34, .075, [.065, .073, .071], world.facing, legSwing, 0, 0);
      drawShape(meshes.cylinder, rightLegX, .37 + bob, rightLegZ, .075, .34, .075, [.065, .073, .071], world.facing, -legSwing, 0, 0);
      drawShape(meshes.sphere, leftLegX + frontX * step * .13, .075, leftLegZ + frontZ * step * .13, .115, .075, .19, [.04, .046, .045], world.facing, 0, 0, 0);
      drawShape(meshes.sphere, rightLegX - frontX * step * .13, .075, rightLegZ - frontZ * step * .13, .115, .075, .19, [.04, .046, .045], world.facing, 0, 0, 0);

      drawShape(meshes.cloak, world.x - frontX * .015, .93 + bob, world.z - frontZ * .015, .36, .46, .29, cloth, world.facing, -.025 * step, .035 * step, 0);
      drawShape(meshes.sphere, world.x - frontX * .035, 1.29 + bob, world.z - frontZ * .035, .31, .15, .235, clothDark, world.facing, 0, 0, 0);
      drawShape(meshes.cube, world.x - frontX * .295, 1.03 + bob, world.z - frontZ * .295, .19, .25, .055, [.065 * alpha, .075 * alpha, .073 * alpha], world.facing, 0, 0, 0);
      drawShape(meshes.cube, world.x - frontX * .353, 1.12 + bob, world.z - frontZ * .353, .025, .37, .025, [.105 * alpha, .115 * alpha, .105 * alpha], world.facing, 0, .48, 0);
      drawShape(meshes.sphere, world.x - frontX * .05, 1.61 + bob, world.z - frontZ * .05, .285, .31, .255, clothDark, world.facing, -.035 * step, 0, 0);
      drawShape(meshes.sphere, world.x - frontX * .145 + rightX * .07, 1.75 + bob, world.z - frontZ * .145 + rightZ * .07, .16, .13, .145, [.075 * alpha, .102 * alpha, .1 * alpha], world.facing, -.16, .18, 0);
      drawShape(meshes.sphere, world.x + frontX * .11, 1.69 + bob, world.z + frontZ * .11, .245, .075, .22, [.07 * alpha, .095 * alpha, .093 * alpha], world.facing, 0, 0, 0);
      drawShape(meshes.sphere, world.x + frontX * .205, 1.57 + bob, world.z + frontZ * .205, .145, .195, .05, skin, world.facing, 0, 0, .01);
      drawShape(meshes.sphere, world.x + frontX * .257 - rightX * .055, 1.61 + bob, world.z + frontZ * .257 - rightZ * .055, .018, .023, .013, [.012, .013, .012], world.facing, 0, 0, .03);
      drawShape(meshes.sphere, world.x + frontX * .257 + rightX * .055, 1.61 + bob, world.z + frontZ * .257 + rightZ * .055, .018, .023, .013, [.012, .013, .012], world.facing, 0, 0, .03);
      drawShape(meshes.sphere, world.x + frontX * .12, 1.42 + bob, world.z + frontZ * .12, .29, .075, .19, [.07 * alpha, .095 * alpha, .093 * alpha], world.facing, .04, 0, 0);

      var leftHandX = world.x - rightX * .34 + frontX * step * .1;
      var leftHandZ = world.z - rightZ * .34 + frontZ * step * .1;
      var rightHandX = world.x + rightX * .34 - frontX * step * .1;
      var rightHandZ = world.z + rightZ * .34 - frontZ * step * .1;
      drawShape(meshes.cylinder, world.x - rightX * .3 + frontX * step * .04, 1.11 + bob, world.z - rightZ * .3 + frontZ * step * .04, .068, .22, .068, clothDark, world.facing, armSwing, -.05, 0);
      drawShape(meshes.cylinder, world.x + rightX * .3 - frontX * step * .04, 1.11 + bob, world.z + rightZ * .3 - frontZ * step * .04, .068, .22, .068, clothDark, world.facing, -armSwing * .55, .04, 0);
      drawShape(meshes.sphere, world.x - rightX * .34 + frontX * step * .07, .86 + bob, world.z - rightZ * .34 + frontZ * step * .07, .07, .075, .07, clothDark, world.facing, 0, 0, 0);
      drawShape(meshes.sphere, world.x + rightX * .34 - frontX * step * .07, .86 + bob, world.z + rightZ * .34 - frontZ * step * .07, .07, .075, .07, clothDark, world.facing, 0, 0, 0);
      drawShape(meshes.cylinder, leftHandX, .7 + bob, leftHandZ, .058, .18, .058, clothDark, world.facing, armSwing * .45, -.05, 0);
      drawShape(meshes.cylinder, rightHandX, .7 + bob, rightHandZ, .058, .18, .058, clothDark, world.facing, -armSwing * .25, .04, 0);
      drawShape(meshes.sphere, leftHandX + frontX * step * .1, .56 + bob, leftHandZ + frontZ * step * .1, .075, .09, .075, skin, world.facing, 0, 0, 0);
      drawShape(meshes.sphere, rightHandX - frontX * step * .07, .54 + bob, rightHandZ - frontZ * step * .07, .075, .09, .075, skin, world.facing, 0, 0, 0);

      var lanternX = rightHandX + frontX * .04;
      var lanternZ = rightHandZ + frontZ * .04;
      drawShape(meshes.cylinder, lanternX, .4 + bob, lanternZ, .095, .17, .095, [.16, .13, .08], world.facing, 0, 0, .08);
      drawShape(meshes.sphere, lanternX, .4 + bob, lanternZ, .068, .11, .068, [.83, .62, .26], world.elapsed * .4, 0, 0, 1.38);
      drawShape(meshes.cylinder, lanternX, .61 + bob, lanternZ, .11, .025, .11, [.14, .13, .1], world.facing, 0, 0, .04);

      var orbit = world.elapsed * (1.7 + world.activated * .12);
      var mothX = world.x + Math.sin(orbit) * .72 + frontX * .3;
      var mothZ = world.z + Math.cos(orbit) * .72 + frontZ * .3;
      var mothY = 1.28 + Math.sin(orbit * 2) * .15;
      drawShape(meshes.sphere, mothX - Math.cos(orbit) * .075, mothY, mothZ + Math.sin(orbit) * .075, .105, .018, .055, [.76, .73, .36], orbit, 0, .28 + Math.sin(orbit * 10) * .2, 1.18);
      drawShape(meshes.sphere, mothX + Math.cos(orbit) * .075, mothY, mothZ - Math.sin(orbit) * .075, .105, .018, .055, [.76, .73, .36], orbit, 0, -.28 - Math.sin(orbit * 10) * .2, 1.18);
    }

    function drawEnemy(enemy, time) {
      var sway = Math.sin(time * 1.35) * .04;
      var facing = Math.atan2(state.x - enemy.x, state.z - enemy.z);
      var frontX = Math.sin(facing);
      var frontZ = Math.cos(facing);
      var rightX = Math.cos(facing);
      var rightZ = -Math.sin(facing);
      drawShape(meshes.cylinder, enemy.x - rightX * .16, .62, enemy.z - rightZ * .16, .1, .61, .1, [.035, .043, .043], facing, sway, 0, 0);
      drawShape(meshes.cylinder, enemy.x + rightX * .16, .62, enemy.z + rightZ * .16, .1, .61, .1, [.035, .043, .043], facing, -sway, 0, 0);
      drawShape(meshes.cloak, enemy.x, 1.62, enemy.z, .39 + sway, .78, .31, [.045, .058, .058], facing, 0, 0, .01);
      drawShape(meshes.cylinder, enemy.x - rightX * .48, 1.35, enemy.z - rightZ * .48, .07, .63, .07, [.032, .04, .04], facing, -.18, -.08, 0);
      drawShape(meshes.cylinder, enemy.x + rightX * .48, 1.35, enemy.z + rightZ * .48, .07, .63, .07, [.032, .04, .04], facing, .18, .08, 0);
      drawShape(meshes.sphere, enemy.x - frontX * .04, 2.53, enemy.z - frontZ * .04, .255, .29, .24, [.055, .066, .066], facing, .12, 0, .01);
      drawShape(meshes.sphere, enemy.x + frontX * .225, 2.49, enemy.z + frontZ * .225, .115, .07, .05, [.5, .61, .59], facing, 0, 0, .72);
    }

    function drawMotes(world) {
      var count = state.qualityMode === 'low' ? 5 : 10;
      for (var i = 0; i < count; i += 1) {
        var angle = i * 2.41 + world.elapsed * .08;
        var radius = 2.2 + (i % 6) * 1.15;
        var px = world.x + Math.sin(angle) * radius;
        var pz = world.z + Math.cos(angle * .83) * radius;
        var py = .45 + (i % 6) * .74 + Math.sin(world.elapsed + i) * .18;
        drawShape(meshes.cube, px, py, pz, .007, .12 + (i % 3) * .055, .007, [.28, .36, .37], angle, 0, -.12, .18);
      }
    }

    canvas.addEventListener('webglcontextlost', function (event) {
      event.preventDefault();
      ready = false;
      togglePause(true);
      showToast('3D 场景暂时沉睡，正在等待图形环境恢复');
    });
    canvas.addEventListener('webglcontextrestored', function () {
      dom.fallback.hidden = false;
      dom.fallbackStory.textContent = '图形环境已改变。为避免反复重建，你可以继续低功耗叙事旅程。';
    });

    resize();
    return { ready: true, resize: resize, render: render };
  }

  function createWorld() {
    var objects = [];
    function add(x, y, z, sx, sy, sz, color, r, e, mesh, rx, rz) {
      objects.push({ x: x, y: y, z: z, sx: sx, sy: sy, sz: sz, color: color, r: r || 0, e: e || 0, mesh: mesh || 'cube', rx: rx || 0, rz: rz || 0 });
    }
    var ground = [.105, .12, .12];
    var earth = [.075, .087, .086];
    var bark = [.085, .1, .1];
    var iron = [.09, .115, .116];
    var stone = [.125, .145, .145];
    var glass = [.18, .235, .24];
    var z;

    add(0, -.2, -1.6, 9, .2, 23.6, ground, 0, 0);
    add(-8.65, .55, 9.5, 1.05, .72, 10.5, earth, -.04, 0);
    add(8.65, .55, 9.5, 1.05, .72, 10.5, earth, .04, 0);
    add(-8.75, 1.0, -11, .95, 1.18, 12, [.07, .08, .08], 0, 0);
    add(8.75, 1.0, -11, .95, 1.18, 12, [.07, .08, .08], 0, 0);
    for (z = 16; z >= 7; z -= 3) {
      add(-7.2 + (z % 2) * .3, 4.4, z, .34, 4.6, .34, bark, 0, 0, 'cylinder', 0, -.035);
      add(7.35 - (z % 2) * .22, 4.7, z - 1.1, .4, 4.9, .4, bark, 0, 0, 'cylinder', 0, .04);
    }
    add(-6.65, 5.3, 13.2, 1.25, .11, .13, bark, -.28, 0, 'cube', 0, .42);
    add(6.65, 5.8, 10.8, 1.35, .12, .13, bark, .24, 0, 'cube', 0, -.36);
    add(-6.7, 6.1, 7.8, 1.45, .12, .14, bark, -.4, 0, 'cube', 0, .31);
    add(6.8, 6.25, 15.4, 1.2, .11, .12, bark, .36, 0, 'cube', 0, -.43);
    add(-2.75, 4.75, 9.8, .25, 4.95, .25, [.075, .09, .09], 0, 0, 'cylinder', 0, -.025);
    add(2.85, 4.95, 7.15, .28, 5.1, .28, [.075, .09, .09], 0, 0, 'cylinder', 0, .03);

    for (z = 8.2; z <= 17; z += 2.2) {
      add(-7.65, .95, z, .055, .98, .055, iron, 0, 0);
      add(-7.65, 1.35, z - 1.1, .055, .055, 1.12, iron, 0, 0);
    }

    add(-3.85, .83, 11.2, 2.15, .78, 1.0, [.095, .108, .108], -.06, 0);
    add(-3.82, 1.62, 11.18, 1.92, .08, .87, [.07, .083, .083], -.06, 0);
    add(-4.65, 1.13, 10.18, .62, .32, .035, glass, -.06, .05);
    add(-3.15, 1.13, 10.12, .56, .32, .035, glass, -.06, .05);
    add(-5.15, .26, 10.92, .42, .42, .18, [.035, .04, .04], -.06, 0, 'cylinder', Math.PI / 2, 0);
    add(-2.58, .26, 11.08, .42, .42, .18, [.035, .04, .04], -.06, 0, 'cylinder', Math.PI / 2, 0);

    add(3.25, 1.45, 8.0, .1, 1.48, .1, iron, 0, 0);
    add(3.25, 2.92, 8.0, .42, .12, .25, [.13, .16, .16], -.18, 0);
    add(3.15, 2.92, 7.72, .2, .12, .055, [.52, .65, .64], -.18, .72);

    add(-8.1, 3.15, -3.4, .55, 3.2, 10.2, stone, 0, 0);
    add(8.1, 3.15, -3.4, .55, 3.2, 10.2, stone, 0, 0);
    for (z = 4; z >= -9; z -= 4.4) {
      add(-4.6, 1.72, z, .42, 1.74, .42, stone, 0, 0);
      add(4.6, 1.72, z, .42, 1.74, .42, stone, 0, 0);
      add(0, 4.9, z, 7.65, .12, .18, iron, 0, 0);
    }
    add(-7.1, .47, 1.4, 1.25, .42, .68, [.105, .11, .105], .06, 0);
    add(-7.1, 1.05, .82, 1.25, .48, .1, iron, .06, 0);
    add(7.0, .47, -3.2, 1.25, .42, .68, [.105, .11, .105], -.05, 0);
    add(7.0, 1.05, -3.78, 1.25, .48, .1, iron, -.05, 0);
    add(-7.15, 1.45, 3, .75, 1.5, .55, [.08, .1, .1], 0, 0);
    add(7.15, 1.45, -8, .75, 1.5, .55, [.08, .1, .1], 0, 0);
    add(-7.15, 1.45, -14, .75, 1.5, .55, [.08, .1, .1], 0, 0);

    add(-7.7, 3.25, -16, .5, 3.3, 7.2, [.085, .105, .105], 0, 0);
    add(7.7, 3.25, -16, .5, 3.3, 7.2, [.085, .105, .105], 0, 0);
    add(-4.6, 1.72, -17, .42, 1.74, .42, stone, 0, 0);
    add(4.6, 1.72, -17, .42, 1.74, .42, stone, 0, 0);
    add(-6.55, 3.1, -13, .14, .14, 3.4, iron, 0, 0, 'cylinder', Math.PI / 2, 0);
    add(6.55, 2.45, -17.4, .12, .12, 3.0, iron, 0, 0, 'cylinder', Math.PI / 2, 0);
    add(0, 4.8, -12.0, 7.2, .13, .18, iron, 0, 0);
    add(0, 4.8, -18.2, 7.2, .13, .18, iron, 0, 0);
    add(0, 3.9, -22.35, 2.45, 3.85, .32, [.075, .095, .096], 0, 0);
    add(0, 3.18, -22.0, 1.3, 3.12, .12, [.18, .17, .105], 0, .035);
    for (var i = 0; i < 8; i += 1) {
      var angle = i * Math.PI / 4;
      add(Math.sin(angle) * 1.18, 4.48, -21.62 + Math.cos(angle) * 1.18, .095, .095, 1.08, [.2, .195, .13], -angle, .035);
    }
    return objects;
  }

  function mat4() { var out = new Float32Array(16); identity(out); return out; }
  function identity(out) {
    out[0]=1; out[1]=0; out[2]=0; out[3]=0; out[4]=0; out[5]=1; out[6]=0; out[7]=0;
    out[8]=0; out[9]=0; out[10]=1; out[11]=0; out[12]=0; out[13]=0; out[14]=0; out[15]=1; return out;
  }
  function perspective(out, fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2);
    out[0]=f/aspect; out[1]=0; out[2]=0; out[3]=0; out[4]=0; out[5]=f; out[6]=0; out[7]=0;
    out[8]=0; out[9]=0; out[10]=(far+near)/(near-far); out[11]=-1; out[12]=0; out[13]=0; out[14]=(2*far*near)/(near-far); out[15]=0; return out;
  }
  function translate(out, a, v) {
    var x=v[0], y=v[1], z=v[2];
    out[12]=a[0]*x+a[4]*y+a[8]*z+a[12]; out[13]=a[1]*x+a[5]*y+a[9]*z+a[13];
    out[14]=a[2]*x+a[6]*y+a[10]*z+a[14]; out[15]=a[3]*x+a[7]*y+a[11]*z+a[15]; return out;
  }
  function scale(out, a, v) {
    var x=v[0], y=v[1], z=v[2];
    out[0]=a[0]*x; out[1]=a[1]*x; out[2]=a[2]*x; out[3]=a[3]*x;
    out[4]=a[4]*y; out[5]=a[5]*y; out[6]=a[6]*y; out[7]=a[7]*y;
    out[8]=a[8]*z; out[9]=a[9]*z; out[10]=a[10]*z; out[11]=a[11]*z; return out;
  }
  function rotateY(out, a, rad) {
    var s=Math.sin(rad), c=Math.cos(rad); var a00=a[0],a01=a[1],a02=a[2],a03=a[3],a20=a[8],a21=a[9],a22=a[10],a23=a[11];
    out[0]=a00*c-a20*s; out[1]=a01*c-a21*s; out[2]=a02*c-a22*s; out[3]=a03*c-a23*s;
    out[8]=a00*s+a20*c; out[9]=a01*s+a21*c; out[10]=a02*s+a22*c; out[11]=a03*s+a23*c; return out;
  }
  function rotateX(out, a, rad) {
    var s=Math.sin(rad), c=Math.cos(rad); var a10=a[4],a11=a[5],a12=a[6],a13=a[7],a20=a[8],a21=a[9],a22=a[10],a23=a[11];
    out[4]=a10*c+a20*s; out[5]=a11*c+a21*s; out[6]=a12*c+a22*s; out[7]=a13*c+a23*s;
    out[8]=a20*c-a10*s; out[9]=a21*c-a11*s; out[10]=a22*c-a12*s; out[11]=a23*c-a13*s; return out;
  }
  function rotateZ(out, a, rad) {
    var s=Math.sin(rad), c=Math.cos(rad); var a00=a[0],a01=a[1],a02=a[2],a03=a[3],a10=a[4],a11=a[5],a12=a[6],a13=a[7];
    out[0]=a00*c+a10*s; out[1]=a01*c+a11*s; out[2]=a02*c+a12*s; out[3]=a03*c+a13*s;
    out[4]=a10*c-a00*s; out[5]=a11*c-a01*s; out[6]=a12*c-a02*s; out[7]=a13*c-a03*s; return out;
  }
  function lookAt(out, eye, center, up) {
    var x0,x1,x2,y0,y1,y2,z0=eye[0]-center[0],z1=eye[1]-center[1],z2=eye[2]-center[2];
    var len=Math.sqrt(z0*z0+z1*z1+z2*z2); if (!len) z2=1; else { z0/=len; z1/=len; z2/=len; }
    x0=up[1]*z2-up[2]*z1; x1=up[2]*z0-up[0]*z2; x2=up[0]*z1-up[1]*z0;
    len=Math.sqrt(x0*x0+x1*x1+x2*x2); if (len) { x0/=len; x1/=len; x2/=len; }
    y0=z1*x2-z2*x1; y1=z2*x0-z0*x2; y2=z0*x1-z1*x0;
    out[0]=x0; out[1]=y0; out[2]=z0; out[3]=0; out[4]=x1; out[5]=y1; out[6]=z1; out[7]=0;
    out[8]=x2; out[9]=y2; out[10]=z2; out[11]=0; out[12]=-(x0*eye[0]+x1*eye[1]+x2*eye[2]);
    out[13]=-(y0*eye[0]+y1*eye[1]+y2*eye[2]); out[14]=-(z0*eye[0]+z1*eye[1]+z2*eye[2]); out[15]=1; return out;
  }

  function initFallbackStory() {
    var steps = [
      '你穿过第一道门，听见巨大钟摆在墙后移动。烛蛾找到一枚温热余烬。',
      '巡夜者的影子越过长廊。你屏住呼吸，躲进倾斜的衣柜。',
      '三声钟鸣划开浓雾。烛蛾记住了这条路，也会记住下一次选择。'
    ];
    var index = 0;
    dom.fallbackAction.addEventListener('click', function () {
      dom.fallbackStory.textContent = steps[index];
      index += 1;
      if (index >= steps.length) { index = 0; dom.fallbackAction.textContent = '再走一条路'; }
      else dom.fallbackAction.textContent = '继续前进';
    });
  }

  function init() {
    setAppHeight();
    if (supportsFlexGap()) document.documentElement.classList.add('supports-flex-gap');
    renderer = createRenderer(dom.canvas);
    if (!renderer.ready) {
      dom.landing.hidden = true;
      dom.fallback.hidden = false;
    }
    bindInput();
    initFallbackStory();
    resetRun();
    if (renderer.ready) renderer.render(state);
  }

  init();
}());
