# 暹罗猫预览

- 入口：pineapple-house.html → 客厅。小蜗已换为参考图的暹罗猫。
- 本轮修正：坐姿小跳方案已被用户否决，重建四足站姿模型。四只脚依次迈步，支撑脚位置与方向固定，双骨 IK 驱动膝肘；沿曲线转弯时减速，停下后逐脚收步。
- 小动作：轻摆尾巴、呼吸、歪头；点击回应，阅读履历或离开客厅暂停，减少动态效果设置下不自动走动。
- 来源：参考图经 ImageGen 调整为四足站姿；gsy013 / L20 使用 Hunyuan3D-2.1 与 Paint-2.1 生成网格及贴图。任务 656032dc06954cc69676480c7862cf7e，seed 1032；源件、日志、清单、哈希见本目录。
- 运行时：29,090 三角、17 骨骼、最多 4 权重、1024 贴图；Three.js 实时求解动作，GLB 不包含烘焙动画片段。
- 验证：240 秒完整路线、真实蒙皮脚掌接地、关节伸展、暂停、点击与减少动态效果通过；真实浏览器 48 次采样确认移动及支撑脚固定，桌面与手机视口测试通过。见 pose-results.json、browser-results.json、walking-desktop.png、walking-mobile.png。
- 状态：review，等待用户核对视觉和步态；手机为视口模拟，实机触屏和性能尚未验证。旧方案证据单独保存在 rejected-seated/。

动作约定：idle（4.5–5.9 秒）→ walk（6 秒，0.94 秒一步周期，支撑占 66%）→ settling（逐脚站稳）→ idle；点击进入 curious（3.2 秒），行走中先收步再回应。位移由角色路径驱动，脚掌落地为事件。

步序依据：[猫的四足行走研究](https://pmc.ncbi.nlm.nih.gov/articles/PMC4044364/)。

复测：node scripts/verify-house-pet.mjs、npm run build、npm run check。
