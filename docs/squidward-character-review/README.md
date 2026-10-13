# 章鱼哥 · 兔耳帽装扮

基于用户插画制作静态全身角色，保留兔耳帽、双马尾、粉色上衣、三层裙摆与蓝紫夹板。原图被柜台遮住的双腿和触足为补全设计。

- [本机预览](http://127.0.0.1:8863/squidward-model.html)：拖动、缩放、正侧背视角、自动旋转。
- GLB：`assets/models/squidward-bunny/squidward-bunny.glb`；29,094 三角面，4.88 MB，Y 向上，正面 +Z，脚底 y=0，高约 1.99 归一化单位。
- 全身参考由 Codex ImageGen 根据原图生成；形体与贴图由自有 gsy013 L20 的 Hunyuan3D Shape / Paint 生成，Blender 规范化导出。
- job `413330331cd042a58d2cdb1080863637`；seed `2026101301`；输入、原始网格与成品 SHA 见 `reference.json` 和资产目录的 `asset.json`。
- 静态阶段完成；未绑定骨骼、未生成动作。夹板、帽子与衣服为同一网格，后续动作需分件和绑定。
- 浏览器已检查正侧背、拖动、滚轮缩放、自动旋转、重置，以及 1280×720、390×844、844×390 和窗口恢复。手机尺寸无页面溢出、角色完整入画；最终控制台零错误/警告。手机实机与物理双指未测。
- `npm run build`、`npm run check`、GLB UV/法线/接地检查通过。实际模型的五官、兔帽和小兔饰件细节较参考图简化，保留 **review / humanReview=pending**，等待用户审看。
- 当前仅独立预览，尚未接入章鱼哥房子或正式首页。

预览截图：`front.jpg`、`side.jpg`、`back.jpg`、`close.jpg`、`mobile.jpg`、`mobile-landscape.jpg`。来源、蒙版、阶段记录与日志保留在本目录；原 Shape / Paint 文件保留于创建主机的任务目录。

启动：仓库根目录运行 `python -m http.server 8863 --bind 127.0.0.1`。
