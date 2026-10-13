import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export async function launch(out, port = 9863) {
  fs.mkdirSync(out, { recursive: true });
  const acceleration = process.env.NEIGHBORHOOD_HARDWARE_GPU === '1' ? [] : ['--disable-gpu', '--use-angle=swiftshader'];
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    `--remote-debugging-port=${port}`, `--user-data-dir=${path.join(out, 'chrome-profile-'+port)}`,
    '--headless=new', '--no-first-run', '--no-default-browser-check',
    ...acceleration, '--window-size=1440,900', 'about:blank',
  ], { windowsHide: true, stdio: ['ignore', fs.openSync(path.join(out, 'chrome-out.log'), 'a'), fs.openSync(path.join(out, 'chrome-error.log'), 'a')] });
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
  let endpoint;
  for (let i = 0; i < 40; i++) {
    try { endpoint = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); if (endpoint.webSocketDebuggerUrl) break; } catch {}
    await pause(250);
  }
  if (!endpoint?.webSocketDebuggerUrl) { chrome.kill(); throw new Error('Chrome CDP endpoint unavailable'); }
  const socket = new WebSocket(endpoint.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  const pending = new Map();
  const events = [];
  const urls = new Map();
  let id = 0, sessionId, stage = 'boot';
  socket.onmessage = message => {
    const event = JSON.parse(String(message.data));
    if (event.id) {
      const call = pending.get(event.id);
      if (call) { clearTimeout(call.timer); pending.delete(event.id); event.error ? call.reject(new Error(call.method + ': ' + JSON.stringify(event.error))) : call.resolve(event.result); }
      return;
    }
    if (event.sessionId !== sessionId) return;
    const p = event.params;
    if (event.method === 'Network.requestWillBeSent') urls.set(p.requestId, p.request.url);
    if (event.method === 'Network.loadingFailed') events.push({ stage, type: 'resourceFailure', url: urls.get(p.requestId), error: p.errorText, canceled: !!p.canceled });
    if (event.method === 'Network.responseReceived' && p.response.status >= 400) events.push({ stage, type: 'httpFailure', url: p.response.url, status: p.response.status });
    if (event.method === 'Runtime.exceptionThrown') events.push({ stage, type: 'exception', text: p.exceptionDetails.exception?.description || p.exceptionDetails.text });
    if (event.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(p.type)) events.push({ stage, type: p.type, text: p.args.map(a => a.value ?? a.description ?? a.type).join(' ') });
    if (event.method === 'Log.entryAdded' && p.entry.level === 'error') events.push({ stage, type: 'browserError', text: p.entry.text, url: p.entry.url });
  };
  function send(method, params = {}, sid = sessionId) {
    return new Promise((resolve, reject) => {
      const callId = ++id;
      const timer = setTimeout(() => { pending.delete(callId); reject(new Error('CDP timeout: ' + method)); }, 25000);
      pending.set(callId, { resolve, reject, timer, method });
      socket.send(JSON.stringify({ id: callId, method, params, ...(sid ? { sessionId: sid } : {}) }));
    });
  }
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  ({ sessionId } = await send('Target.attachToTarget', { targetId, flatten: true }));
  for (const domain of ['Page', 'Runtime', 'Network', 'Log']) await send(domain + '.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  async function evaluate(expression) {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result?.value;
  }
  async function screenshot(name) {
    const result = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(out, name + '.png'), Buffer.from(result.data, 'base64'));
  }
  async function viewport(width, height, mobile = false) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, mobile, deviceScaleFactor: 1 });
    await send('Emulation.setTouchEmulationEnabled', { enabled: mobile, maxTouchPoints: 2 });
  }
  async function mouse(type, x, y, buttons = 0) {
    await send('Input.dispatchMouseEvent', { type, x, y, button: buttons || type === 'mouseReleased' ? 'left' : 'none', buttons, clickCount: type === 'mousePressed' || type === 'mouseReleased' ? 1 : 0 });
  }
  async function click(x, y) {
    await mouse('mouseMoved', x, y); await mouse('mousePressed', x, y, 1);
    await pause(50); await mouse('mouseReleased', x, y);
  }
  async function tap(x, y) {
    await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, radiusX: 1, radiusY: 1, force: 1, id: 1 }] });
    await pause(60); await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  }
  async function clickElement(selector, touch = false) {
    const rect = await evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});if(!e||e.hidden||getComputedStyle(e).display==='none')return null;const r=e.getBoundingClientRect();if(!r.width||!r.height)return null;return{x:r.x+r.width/2,y:r.y+r.height/2};})()`);
    if (!rect) throw new Error('Missing visible element: ' + selector);
    await (touch ? tap : click)(rect.x, rect.y);
  }
  async function escape() {
    for (const type of ['keyDown', 'keyUp']) await send('Input.dispatchKeyEvent', { type, key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27, nativeVirtualKeyCode: 27 });
  }
  async function drag(x1, y1, x2, y2) {
    await mouse('mouseMoved', x1, y1); await mouse('mousePressed', x1, y1, 1);
    for (let i = 1; i <= 12; i++) { await mouse('mouseMoved', x1 + (x2-x1)*i/12, y1+(y2-y1)*i/12, 1); await pause(40); }
    await mouse('mouseReleased', x2, y2); await pause(800);
  }
  async function wheel(x, y, deltaY) { await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x, y, deltaX: 0, deltaY }); await pause(800); }
  async function wait(predicate, timeout = 45000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const value = await evaluate(predicate);
      if (value) return value;
      await pause(250);
    }
    throw new Error('Page state wait timed out: ' + predicate.slice(0, 100));
  }
  const stateExpr = `(()=>{const s=window.__neighborhood?.state;if(!s)return null;return{house:s.house,view:s.view,roomId:s.roomId,tier:s.tier,extTris:s.extTris,intTris:s.intTris,camAnimating:!!s.camAnim,doorAnimating:!!s.doorAnim,doorY:s.doorMeshes.find(o=>o.name==='door_panel')?.rotation.y,info:document.querySelector('#info-panel')?.innerText,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,roomChips:document.querySelector('#room-chips')?.hidden};})()`;
  return { chrome, socket, endpoint, events, send, evaluate, screenshot, viewport, click, tap, clickElement, escape, drag, wheel, wait, pause,
    state: () => evaluate(stateExpr), stage: name => { stage = name; },
    navigate: async url => { const result = await send('Page.navigate', { url }); if (result.errorText) throw new Error(result.errorText); },
    dispose: async () => { try { await send('Browser.close', {}, undefined); } catch {} socket.close(); chrome.kill(); },
  };
}
