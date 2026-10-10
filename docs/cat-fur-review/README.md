# 暹罗幼猫造型与动作

- 用户于 2026-10-10 回复“可以”，已采用为首页与菠萝屋默认宠物。
- 打开 index.html 可检查站立、行走、坐下、侧躺与点击回应；整屋脱敏入口：/pineapple-house.html?privacy=1。
- 正式模型：assets/house-review/props/siamese-kitten-fur.glb；约 3 万三角面、18 骨骼，短毛与主体共享骨架。旧模型保留备份。
- 自有 L20 / Hunyuan3D-2.1 生成形体与贴图；闭合修补后重新 GPU 上色，CPU 仅修补、减面、绑定和导出。来源记录见本目录 JSON 与 GPU CSV。
- 参考用户的站立、坐姿、侧躺照片；原始照片不发布。模型导图由图像工具生成，非网页截图。
- 验证：行走接地、坐卧不穿地、脸部刚性、起身后四方向看镜头，以及暂停和减少动态效果。浏览器结果见 browser-results.json。
