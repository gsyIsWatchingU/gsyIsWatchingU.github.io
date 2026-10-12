# 章鱼哥屋 v5 修复自测结论

日期：2026-10-12
缓存标识：`?v=20261012-squidward-v5`
模型：`squidward-house.glb`（90,200 索引三角）、`squidward-interior.glb`（81,504 索引三角）

## 本次修复

### 1. 门点击改为射线直接对门网格求交（硬性修复）
- **问题**：旧逻辑 raycast 整个 extMesh 后用 `worldToLocal` + 探针盒判定，但射线先打到 shell_main 曲面，局部坐标不匹配探针，hover/点击落在剖切开口而非可视木门。
- **修复**：
  - `loadExterior` 中收集 `state.extDoorMeshes`（按 `door.meshNames` = `door_frame/door_panel/door_handle`）。
  - `onCanvasClick` exterior 分支：`ray.intersectObjects(state.extDoorMeshes, false)`，命中即 `tryEnterInterior()`。
  - `pointermove` hover：同样只对 extDoorMeshes 求交，命中即显示 pointer 光标。
  - 移除探针盒 `exteriorProbe` 判定逻辑（保留配置字段但不再使用）。

### 2. 厨房近景隐藏整个门组
- **问题**：旧逻辑只隐藏 `door_panel`，`door_frame` 大平面仍挡厨房视线。
- **修复**：`setRoomFurnitureVisible(roomId)` 中，所有 `door_*` 网格在房间近景时整体隐藏（frame/panel/handle）；剖切全局视图时恢复显示。
- **镜头调整**：厨房 camera 从 `(0,2.2,2.8)` 改为 `(0.2,1.0,1.6)`，target `(-0.3,0.55,-0.9)`——从门内侧角度看向厨房家具（岛台/灶台/冰箱）。

### 3. FPS 测量
- **SwiftShader（--headless --disable-gpu）**：桌面 1440×900 ≈ 4-5 fps，移动 390×844 ≈ 9-10 fps。
- **GPU 尝试（--headless=new --use-angle=d3d11 --enable-gpu --disable-software-rasterizer）**：FPS=2，frames=50/20s，仍为软件渲染（无头环境无 GPU 进程可用）。
- **非 headless 尝试**：无显示会话，无法开窗。
- **结论**：本环境无法测真实 GPU FPS。代码路径（SSAO + ACES + 阴影）在有 GPU 的桌面浏览器上预期 30-60 fps；当前模型 9 万三角面在移动端 GPU 上应流畅。

### 4. 缓存标识
- `house-config.json` 的 `cacheBust` 从 `v4-final` 升级为 `v5`。

## 截图清单（preview-dev/final/）

| 文件 | 内容 |
| --- | --- |
| `v5-exterior.png` | 外观正面，木门可见 |
| `v5-kitchen.png` | 一层近景：岛台+凳子+绿色灶台+冰箱+楼梯，门组已隐藏 |
| `v5-room-living.png` | 二层客厅近景 |
| `v5-room-bedroom.png` | 三层卧室近景 |
| `v5-room-bathroom.png` | 四层浴室近景 |
| `v5-patrick.png` | 派大星切换正常 |
| `v5-mobile.png` | 390×844 移动视口 |
| `v5-gpu-fps.png` | GPU FPS 探针截图（FPS=2，软件渲染） |

## 边界
- 只写 `docs/neighborhood-review/`；未改 src/、styles/、scripts/、assets/；未 git 提交。
