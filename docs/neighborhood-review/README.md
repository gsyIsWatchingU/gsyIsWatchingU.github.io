# 比奇堡邻里 · 3D 模型审查

入口：`docs/neighborhood-review/index.html`（本地预览需 HTTP 服务）。

状态：`review`，等待视觉确认；首页未接入，未推送发布。

## 章鱼哥人像屋（本轮最终重建 v4-final）

- 深蓝灰摩艾造型石屋，块状平顶、圆形舷窗眼、长鼻与木门嘴、两侧耳块；内部按参考插画剖切重建为四层。
- 四层（行走面 y=0.15/1.20/2.40/3.60）：一层厨房、二层客厅、三层卧室、四层浴室（顶层）；右侧连续螺旋楼梯（39 级）贯通四层，艺术品台座/雕塑位于楼梯旁。
- 缓存版本：`?v=20261012-squidward-v4-final`。

## 模型清单（本轮）

| 模型 | 路径 | 索引三角面 | SHA256 |
| --- | --- | --- | --- |
| 桌面整屋 | `assets/models/neighborhood/squidward-house.glb` | 90,200 | `4d3249fc…e9daaa7` |
| 移动整屋 | `assets/models/neighborhood/squidward-house-web.glb` | 90,200 | 同上（同几何） |
| 桌面室内 | `assets/models/neighborhood/squidward-interior.glb` | 81,504 | `f7f1d974…dd2e285e` |
| 移动室内 | `assets/models/neighborhood/squidward-interior-web.glb` | 81,504 | 同上（同几何） |

- 旧模型已归档至 `assets/models/neighborhood/archive/`；派大星屋两件未改动。
- 生产主机 `gsy013`（L20），Blender 4.5.13 程序化建模导出。

## 文件说明

- `index.html` / `neighborhood.js` / `neighborhood.css`：独立 Three.js 预览，支持切换房屋、拖拽旋转、滚轮缩放、重置镜头、房间近景。
- `config/house-config.json`：镜头/房屋/房间配置（缓存 `v=20261012-squidward-v4-final`）；`config/space-config.json`：权威空间布局。
- `refs/`：参考图、Forge3D manifest、转台预览与建模源图。
- `acceptance/`：本轮验收截图、参考对照图与运行结果（见 `verification.md`）。
- `preview-dev/final/`：开发期交互自测截图。

## 验证

- 验收记录（对照表、截图索引、已知问题、限制）见 `verification.md`。
- `npm run build`、`npm run check`、`git diff --check` 通过。
- 已知问题（待用户决策）：厨房近景被门框遮挡、点击木门本体当前不触发进入（详见 `verification.md`）。
- 自动检查通过不等于视觉批准；用户确认后才标记 `approved` 并接入首页。
