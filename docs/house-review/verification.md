# 验收记录

日期：2026-10-09。状态：待视觉审查，未批准发布。

| 项目 | 实测结果 | 证据 |
| --- | --- | --- |
| 桌面全屋 1440×900 | 叶冠、三层、入口同时可见，房间标签可辨 | `screenshots/desktop-whole.png` |
| 手机尺寸 390×844 | 全屋完整，无横向溢出（scrollWidth=390） | `screenshots/mobile-whole.png` |
| 七个近景 | 两种尺寸均进入 `room`；隐藏遮挡与其他家具，仅房名和返回控件 | `browser-checks.json`、`desktop-rooms.png`、`mobile-rooms.png` |
| 返回与 Esc | 桌面、手机尺寸返回全屋，恢复标签 | 本轮浏览器实测 |
| 旋转 | 相机从 `[1.521,8.703,27.649]` 变为 `[-12.269,6.342,24.987]`，状态仍是 whole | `screenshots/desktop-rotated.png` |
| 滚轮缩放 | 相机变为 `[-8.882,5.796,13.755]` | `screenshots/desktop-zoom.png` |
| 刷新 | 重新实际加载 13/13，恢复默认全屋 | 本轮浏览器实测 |
| 加载失败 | 临时移走本轮椅子模型，12 个成功、1 个失败，显示红扶手椅及路径；两种尺寸有截图 | `screenshots/*-load-failure.png` |
| 重试 | 恢复原文件后点重新载入，13 个成功、0 个失败；既有模型保留 | `screenshots/desktop-load-recovered.png` |
| WebGL 不可用 | 临时测试页让 getContext 返回 null，显示明确提示，无旧场景替代 | `screenshots/*-webgl-unavailable.png` |
| 正常控制台 | 最终页面载入后 error/warn 为空；故障注入日志不混入正常结果 | `final-console.json` |
| 自动检查 | build、check、diff --check、资产 SHA256 与 GLB 三角形核验通过 | `asset-index.json` |

参考对照：`reference-comparison.png`。对照图左侧为原参考，右侧为真实浏览器截图；房间图集也仅拼接浏览器截图，不是 Blender 渲染。

截图索引：`screenshot-index.json` 记录实际捕获尺寸。手机 CSS 视口为 390×844，浏览器工具输出为 390×843；未补像素或调整截图内容。

几何检查：三层布局与跨层图书馆可辨；床、椅、沙发、浴缸与小蜗接地；楼梯穿楼板开口连接至天台。修复了浴室门前的马桶位置、卧室门前的梯子、储藏室近景背景、GLB 材质颜色丢失和手机镜头缩放。

限制：手机为浏览器视口模拟；双指触控与真实手机性能仍待实机复核。最终家具是 Blender 曲面修整版本，原始 Hunyuan 候选不是质量合格证明。画风、外壳形态与参考相似度由用户视觉审查决定。
