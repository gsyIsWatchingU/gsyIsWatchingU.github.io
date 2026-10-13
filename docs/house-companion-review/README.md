# 海绵宝宝入住预览

## 2026-10-13 角色修复

- [本轮独立预览](http://127.0.0.1:8769/tmp/companion-expression-v3/pineapple-companion.html)：缩小约 30%，图书馆先滑滑梯，再去旁边读书；书页朝向他自己。
- 新增真实眼睑、左右/上下虹膜 morph、开心/放松/阅读表情；原身体与贴图仍来自 GPU，眼睑与骨架为 Blender 修整。
- 31,175 三角面、14 骨骼、12 动作；SHA、实际五官顶点变形、257 个滑面接触采样见 `runtime.json`、`asset-check.json`、`contact-check.json`。
- `refinement-v3/` 为本轮真实浏览器截图与采样；手机仅为视口模拟。保持 review，等待用户审看。
- 已发布的文字聊天保留；本轮未纳入其他任务的睡眠入床和家具调整。

复测新增：`node scripts/verify-house-companion-motion.mjs`、`node scripts/verify-house-companion-contact.mjs`；更换模型或尺寸后用 `--calibrate` 重算接触数据。

[本机试玩](http://127.0.0.1:8769/pineapple-companion.html)。启动方式：仓库根目录运行 `python -m http.server 8769 --bind 127.0.0.1`。

- 独立预览默认启用角色；正式首页未启用。
- 2 分钟作息、六个房间跟随、招手、翻页、睡觉、吹泡泡与文字聊天已接入；点击角色打开右侧小窗，可继续操作房间。
- 参考图来自自有 gsy013 的 Z-Image；Hunyuan Shape + Paint job `a41edcc3ac8044cc9492d6b5742f2866`。UniRig 骨架检查失败，保留原始失败记录。
- 使用原 GPU 网格与贴图，在 Blender 对称修复缺失手臂，制作专用蒙皮和 11 段动作。14 骨骼、28,999 三角面；细节与 SHA 见 `runtime.json`、`asset-check.json`。
- `welcome.wav` 是 mygpu CUDA 生成的真实音色样本，参数和 SHA 见 `voice.json`。
- 后端已配置 DeepSeek，真实文字回复已验证；语音已关闭，不加载 TTS 模型。
- `browser/results.json` 记录完整循环与房间验收；`results-fixtures.json` 记录动作、语音重试、静音、过期响应取消。截图均来自真实 Chrome，手机为视口模拟。
- 模型与音色均为 **review，待用户审看/试听**；不记录 approved。手机实机性能、双指手势未验证。

复测：`npm run build`、`npm run check`、`node scripts/verify-house-companion-state.mjs`、`node scripts/verify-house-companion-asset.mjs`、`node scripts/verify-house-companion-browser.mjs --cycle`；公网复测另加 `--live`。

2026-10-13：日记宽屏两列、窄屏按高度翻页；六种窗口尺寸未发现竖向溢出。文字聊天无遮罩、无快捷入口和语音控件，实际请求 `/speech` 为 0；最新证据见 `text-chat/`。
