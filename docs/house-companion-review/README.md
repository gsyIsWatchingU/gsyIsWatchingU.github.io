# 海绵宝宝入住预览

[本机试玩](http://127.0.0.1:8769/pineapple-companion.html)。启动方式：仓库根目录运行 `python -m http.server 8769 --bind 127.0.0.1`。

- 独立预览默认启用角色；正式首页未启用。
- 2 分钟作息、六个房间跟随、招手、翻页、睡觉、吹泡泡、聊天输入、静音与重播已接入。
- 参考图来自自有 gsy013 的 Z-Image；Hunyuan Shape + Paint job `a41edcc3ac8044cc9492d6b5742f2866`。UniRig 骨架检查失败，保留原始失败记录。
- 使用原 GPU 网格与贴图，在 Blender 对称修复缺失手臂，制作专用蒙皮和 11 段动作。14 骨骼、28,999 三角面；细节与 SHA 见 `runtime.json`、`asset-check.json`。
- `welcome.wav` 是 mygpu CUDA 生成的真实音色样本，参数和 SHA 见 `voice.json`。
- 后端已部署；DeepSeek 密钥尚未配置，真实自由聊天未验收。浏览器聊天动作测试使用明确标记的接口夹具。
- `browser/results.json` 记录完整循环与房间验收；`results-fixtures.json` 记录动作、语音重试、静音、过期响应取消。截图均来自真实 Chrome，手机为视口模拟。
- 模型与音色均为 **review，待用户审看/试听**；不记录 approved。手机实机性能、双指手势未验证。

复测：`npm run build`、`npm run check`、`node scripts/verify-house-companion-state.mjs`、`node scripts/verify-house-companion-asset.mjs`、`node scripts/verify-house-companion-browser.mjs --cycle`；聊天夹具另加 `--fixtures`。
