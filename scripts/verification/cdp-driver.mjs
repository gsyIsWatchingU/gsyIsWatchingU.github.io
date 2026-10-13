// Reusable headless-Chrome CDP driver for neighborhood-review acceptance.
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

export function makeDriver({ port = 9317, profile = path.join(process.cwd(),"tmp","cdp-chrome"), headless = true, gpu = false }) {
  fs.mkdirSync(profile, { recursive: true });
  const chrome = spawn(CHROME, [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    headless ? "--headless=new" : "",
    "--no-first-run",
    "--no-default-browser-check",
    gpu ? "--ignore-gpu-blocklist" : "--disable-gpu",
    gpu ? "" : "--use-angle=swiftshader",
    "--hide-scrollbars",
    "--window-size=1440,900",
    "about:blank",
  ].filter(Boolean), { stdio: "ignore" });

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  let msgId = 0;
  const pending = new Map();
  let ws, sessionId, log = { console: [], errors: [], failedReq: [] };
  const targetMessages = [];

  async function getWs() {
    for (let i = 0; i < 40; i += 1) {
      try {
        const r = await fetch(`http://127.0.0.1:${port}/json/version`);
        const j = await r.json();
        return j.webSocketDebuggerUrl;
      } catch { await sleep(500); }
    }
    throw new Error("no ws");
  }

  function connect(wsUrl) {
    ws = new WebSocket(wsUrl);
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data.toString());
      if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); return; }
      handleEvent(msg);
    };
    return new Promise((resolve) => { ws.onopen = () => resolve(); });
  }

  function handleEvent(msg) {
    const m = msg.method;
    if (msg.sessionId !== sessionId) return;
    if (m === "Runtime.consoleAPICalled") {
      const text = (msg.params.args || []).map(a => a.value ?? a.description ?? a.type).join(" ");
      log.console.push(`[${msg.params.type}] ${text}`);
      if (msg.params.type === "error" || msg.params.type === "warning") {
        if (!/three|GLTFLoader|neighborhood|exterior loaded|loadInterior/.test(text)) log.errors.push(text);
      }
    } else if (m === "Runtime.exceptionThrown") {
      const d = msg.params.exceptionDetails;
      log.errors.push("EXC: " + (d.exception?.description || d.text));
    } else if (m === "Network.loadingFailed") {
      log.failedReq.push(msg.params.requestId + " " + msg.params.errorText);
    } else if (m === "Network.responseReceived") {
      if (msg.params.response.status >= 400) log.failedReq.push(msg.params.response.status + " " + msg.params.response.url);
    }
  }

  const send = (method, params = {}, sid = sessionId) =>
    new Promise((resolve, reject) => {
      const id = ++msgId;
      pending.set(id, (msg) => {
        if (msg.error) reject(new Error(method + " " + JSON.stringify(msg.error)));
        else resolve(msg.result);
      });
      ws.send(JSON.stringify({ id, method, params, ...(sid ? { sessionId: sid } : {}) }));
    });

  async function evalExpr(expr) {
    const r = await send("Runtime.evaluate", { expression: `(function(){${expr}})()`, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error("EVAL " + (r.exceptionDetails.exception?.description || r.exceptionDetails.text).slice(0, 400));
    return r.result?.value;
  }

  async function evalRaw(expr) {
    const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error("EVAL " + (r.exceptionDetails.exception?.description || r.exceptionDetails.text).slice(0, 400));
    return r.result?.value;
  }

  async function shot(file) {
    const r = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    fs.writeFileSync(file, Buffer.from(r.data, "base64"));
  }

  async function setViewport(w, h) {
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: w < 600 }, sessionId);
  }

  async function navigate(url) {
    log = { console: [], errors: [], failedReq: [] };
    await send("Page.navigate", { url }, sessionId);
  }

  // drag on canvas to orbit: dx,dy in CSS px
  async function drag(dx, dy, cx = 720, cy = 450) {
    await send("Input.dispatchMouseEvent", { type: "mousePressed", x: cx, y: cy, button: "left", buttons: 1, clickCount: 1 }, sessionId);
    const steps = 12;
    for (let i = 1; i <= steps; i++) {
      await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: cx + (dx * i) / steps, y: cy + (dy * i) / steps, button: "left", buttons: 1 }, sessionId);
      await sleep(16);
    }
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: cx + dx, y: cy + dy, button: "left", buttons: 0, clickCount: 1 }, sessionId);
    await sleep(500);
  }

  // click at canvas point
  async function clickAt(x, y) {
    await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", buttons: 1, clickCount: 1 }, sessionId);
    await sleep(30);
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", buttons: 0, clickCount: 1 }, sessionId);
    await sleep(300);
  }

  async function wheel(dy) {
    await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: 720, y: 450, deltaX: 0, deltaY: dy }, sessionId);
    await sleep(400);
  }

  async function start() {
    const wsUrl = await getWs();
    await connect(wsUrl);
    const { targetId } = await send("Target.createTarget", { url: "about:blank" });
    const att = await send("Target.attachToTarget", { targetId, flatten: true });
    sessionId = att.sessionId;
    // route events to session
    await send("Page.enable", {}, sessionId);
    await send("Runtime.enable", {}, sessionId);
    await send("Network.enable", {}, sessionId);
  }

  function dispose() { try { chrome.kill(); } catch {} }

  return { sleep, start, evalExpr, evalRaw, shot, setViewport, navigate, drag, clickAt, wheel, send, getLog: () => log, dispose };
}
