# 屋顶与卧室修复验收

2026-10-13；状态 `review`，等待用户视觉确认。

- 屋顶：躺椅与叶片交叉对从 186 降为 0，四脚留在地面内；平台顶面高于地面 18mm；近景保留出口几级楼梯。
- 闹钟：表盘收进外壳，补齐双铃、脚架和刻度；入口文案为“教育经历”。
- 玩具箱：箱体与按钮均可点击；箱盖转动，海绵宝宝玩偶弹出，再次点击收回。玩偶复用已有自有 GPU 角色资产。
- 睡觉：拉被、上床、躺下、盖被、闭眼休息；背部使用实际蒙皮顶点校准，接触间隙 7mm；角色完整留在床垫范围内。切换动作恢复原被子，睡眠指令持续 30 秒。

验证：`npm run build`、`npm run check`、`git diff --check`；角色资产、作息状态机、`verify-house-sleep.mjs` 通过。`sequence-*.jpg` 是浏览器操作后连续采样的五阶段画面；`roof-clearance.json` 来自 gsy013 上的 Blender 4.5.13，`roof-visibility.json` 记录真实运行时可见性。

屋顶和家具由 Blender 修整导出；源模型、GPU 来源与待审状态保留。浏览器验收不代表真实手机触屏和性能验收。

入口：正式首页及 `pineapple-house.html`；角色动作位于 `pineapple-companion.html` 独立预览。

公网：5d2bdab 的 Pages 部署成功，8 项资源 SHA-256 与提交内容一致（public-resources.json）。本地真实点击与动作截图通过；公网浏览器连接连续超时，未完成公网 UI 点击复测。
