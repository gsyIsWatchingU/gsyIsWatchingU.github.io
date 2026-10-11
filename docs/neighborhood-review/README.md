# 比奇堡邻里 · 3D 模型审查

入口：`docs/neighborhood-review/index.html`（本地预览需 HTTP 服务）。

状态：`review`，等待视觉确认；首页未接入，未推送发布。

## 模型清单

| 房屋 | 任务 ID | Seed | 三角面（网页版） | 精细版大小 | 网页版大小 |
| --- | --- | --- | --- | --- | --- |
| 章鱼哥的人像屋 | `6374e2f2e7c44c75ac2c43fbca8226d4` | 1234 | 7,235 | 3.2 MB | 1.4 MB |
| 派大星的石头屋 | `d3c8b3a93370432c894153514c231551` | 1234 | 7,026 | 3.2 MB | 1.5 MB |

- 生产主机：`gsy013`（NVIDIA L20），Forge3D 0.1.0，Hunyuan3D-2.1 Shape + Paint。
- 参考图由 GPU 自托管 Z-Image-Turbo 生成，存于 `refs/`。
- 精细版为 steam_desktop 档（40K 三角面、2048 贴图），网页版贴图缩放至 1024px。
- 模型统一底部中心原点、Y 轴向上。

## 文件说明

- `index.html`：独立 Three.js 预览，支持切换房屋、拖拽旋转、滚轮缩放、重置镜头。
- `refs/`：参考图（Z-Image-Turbo 生成）、Forge3D manifest、转台预览。
- `screenshots/`：桌面 1440×900 与手机 390×844 验证截图。
- 模型文件：`assets/models/neighborhood/squidward-house.glb`（精细版）、`squidward-house-web.glb`（网页版）；派大星屋同理。

## 验证

- `npm run build`、`npm run check`、`git diff --check` 通过。
- 桌面 1440×900 与手机 390×844 视口实际加载、切换、旋转、缩放正常。
- 轮廓辨识度：章鱼哥屋还原摩艾头像、长鼻、矩形窗眼与木门；派大星屋还原圆顶巨石、拱形门洞与顶部天线。
- 背面完整、无悬空碎片、模型接地。
- 自动检查通过不等于视觉批准。用户确认后才标记 `approved` 并接入首页。
