# 比奇堡邻里 · 3D 模型审查

入口：`docs/neighborhood-review/index.html`（本地预览需 HTTP 服务）。

状态：`review`，等待视觉确认；首页未接入，未推送发布。

## 章鱼哥人像屋（本轮最终重建 v6，缓存 `?v=20261012-squidward-v6`）

- 蓝色石质摩艾造型，**完整闭合圆弧石壳**（v6 补齐前侧剖切缺口，`shell_cutaway_cover` 补片，2,200 三角）；圆形舷窗眼（蓝框+玻璃）、长鼻与木门嘴、两侧耳块；内部按参考插画剖切重建为四层。
- 四层（行走面 y=0.15/1.20/2.40/3.60）：一层厨房、二层客厅、三层卧室、四层浴室（顶层）；右侧连续螺旋楼梯（39 级）贯通四层，艺术品台座/雕塑位于楼梯旁。
- v6 修复（独立验收 9 项）：外观闭合外壳；场景拾取仅绑定渲染 canvas（返回/重置按钮不再误触房间）；切换房屋重建房间标签；厨房近景侧向镜头、客厅/卧室近景隐藏上方楼板；移动端操作提示排到信息卡上方；外观石壳/面部加运行时石材纹理、舷窗加框环与玻璃。

## 模型清单（本轮）

| 模型 | 路径 | 索引三角面 | SHA256 |
| --- | --- | --- | --- |
| 桌面整屋 | `assets/models/neighborhood/squidward-house.glb` | 92,400（含 `shell_cutaway_cover` 2,200） | `4d797fd3…40f6cb` |
| 移动整屋 | `assets/models/neighborhood/squidward-house-web.glb` | 92,400 | 同上（同几何同哈希） |
| 桌面室内 | `assets/models/neighborhood/squidward-interior.glb` | 81,504 | `f7f1d974…dd2e285e` |
| 移动室内 | `assets/models/neighborhood/squidward-interior-web.glb` | 81,504 | 同上（同几何同哈希） |

- 旧模型已归档至 `assets/models/neighborhood/archive/`；v5-final2 两件整屋 GLB 另备份于 `tmp/backup-v5-final2/`；派大星屋两件未改动。
- 生产主机 `gsy013`（L20），Blender 4.5.13 程序化建模导出；v6 外壳补片由 GLB 级网格补写（`tmp/nh-close-shell.mjs`，与 `build_structure.py` 参数化一致，边界顶点 0 误差贴合）。

## 材质与贴图说明（v6 实测）

- 外观石壳 `shell_main`、面部特征 `shell_*` 在运行时叠加画布石材纹理（圆柱 UV）与舷窗框环/玻璃（`neighborhood.js` `applyExteriorMaterials`），不改 GLB；GLB 三角面统计不含运行时新增件。
- 整屋/室内 GLB 各含 **4 张 1024×1024 图像、4 个纹理对象**：其中 2 张（`Forge3D_ORM_Material`）分别用于**最终采用**的 Forge3D 候选——茶几 `living_coffee-table`（16,000 三角）与地毯 `living_rug`（29,100 三角）；另 2 张（`textured`）未被任何材质引用。外壳与其余网格均为纯色 PBR，无图像纹理。

## 资产来源（最终采用 vs 候选）

- **最终采用**：Blender 程序结构（`build_structure.py`，石壳 8,464 三角 + 结构 + 精修家具）；Forge3D 候选中的茶几 `bd384769`、地毯 `c1edfa3d`。
- **候选未采用**：石壳 `a68d1b3f`、沙发 `0afbebe8`（最终沙发为 Blender 程序件）。候选不作为最终运行资产来源证明。

## 文件说明

- `index.html` / `neighborhood.js` / `neighborhood.css`：独立 Three.js 预览，支持切换房屋、拖拽旋转、滚轮缩放、重置镜头、房间近景。
- `config/house-config.json`：镜头/房屋/房间配置（缓存 `v=20261012-squidward-v6`）；`config/space-config.json`：权威空间布局。
- `refs/`：参考图、Forge3D manifest、转台预览与建模源图。
- `acceptance/`：本轮验收截图、参考对照图与运行结果（见 `verification.md`）。
- `preview-dev/final/`：开发期交互自测截图。

## 验证

- 验收记录（对照表、截图索引、已知问题、限制）见 `verification.md`（含 v5/v6 复验）。
- `npm run build`、`npm run check`、`git diff --check` 通过。
- v6 复验：外观正/侧/背面壳体闭合、四房间近景（厨房灶台可读、客厅/卧室楼板已隐藏）、返回/重置不误触房间、直达切换标签齐全、移动端文案无重叠，均通过（见 `verification.md`）；真实 GPU 帧率与物理触屏需用户实机复核。
- 自动检查通过不等于视觉批准；用户确认后才标记 `approved` 并接入首页。
