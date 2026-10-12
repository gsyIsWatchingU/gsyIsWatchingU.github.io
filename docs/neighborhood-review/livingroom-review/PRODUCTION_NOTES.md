# 章鱼哥屋 二层客厅 — 质量样板生产记录（全屋质量锁定）

日期：2026-10-12。主机 gsy013（L20，提交前 free 45586 MiB、health ready）。
Forge3D `http://127.0.0.1:8091`，Blender 4.5.13 `/workspace/.tools/blender-4.5.13-linux-x64/blender`。
坐标：Blender Z-up（X 右、Y 后/-Y 前、Z 上）；GLB 导出 Y-up、+Z 朝前。家具 bottom-center 原点，
放置锚点 Z=楼板顶 1.20，绕 Z 旋转 `theta = facing_deg + 90`。

## 一、成品清单（final GLB，已拉回本地 tmp/neighborhood-production/livingroom/final/）

| 件 | GLB | 三角 | 尺寸 glTF(X,Y,Z) | 来源 | check_glb flags |
| --- | --- | --- | --- | --- | --- |
| sofa | sofa.glb | 2896 | 1.31×0.73×0.60 | Blender 程序化 | [] |
| armchair | armchair.glb | 1996 | 0.65×0.75×0.55 | Blender 程序化 | [] |
| coffee-table | coffee-table.glb | 16000 | 1.20×0.40×1.33 | Hunyuan bd384769 + Blender 精修 | orientation_suspect(圆矮桌误报) |
| old-tv | old-tv.glb | 1060 | 0.35×0.93×0.35 | Blender 程序化 | [] |
| bookshelf | bookshelf.glb | 564 | 0.80×1.90×0.35 | Blender 程序化 | [] |
| plant | plant.glb | 968 | 0.57×1.06×0.84 | Blender 程序化 | below_floor -0.01(可忽略) |
| rug-living | rug-living.glb | 29100 | 1.40×0.02×1.20 | Hunyuan c1edfa3d + Blender 放平 | orientation_suspect(薄毯误报) |
| wall-picture | wall-picture.glb | 72 | 0.40×0.55×0.035 | Blender 程序化 | below_floor(壁挂居中原点，预期) |

合计约 60.7k 三角。每件同目录有 `<name>-runtime.json`（含 runtimeSha256、bbox、来源、修复项）。

## 二、关键决策与来源（如实记录）

### 沙发（重生成后仍失败 → Blender 程序化）
- A2 候选 job `0afbebe8`（29100 三角）预览核验为单张弯板、零体积、蓝地渗透。
- 重生成 job `56252800`（同一张 canonical 参考 sofa.png + 强化三维体积 prompt）**结果仍是同一张弯板**。
- 结论：参考图是近乎正面的低分辨率扁平裁剪，Hunyuan 无论 prompt 都只浅挤压，无法靠"重拓扑"补体积（那是重建）。**改走 Blender 程序化建模**（圆角盒+斜角），橄榄绿布艺+深棕木扶手/腿+米色靠枕。
- 同因（近正面低分辨率参考 → Hunyuan 出折叠薄板/斜板）：armchair、old-tv、bookshelf、plant 全部改 Blender 程序化。

### 各件 Hunyuan 候选结论（均已 review/失败门禁记录）
| 件 | job_id | 状态 | 视觉结论 |
| --- | --- | --- | --- |
| sofa | 56252800 | review 29100 | 弯板零体积 → 程序化 |
| armchair | fda6e13f | review 29100 | 折叠三角帐板+薄背板 → 程序化 |
| coffee-table | bd384769 | failed(白杯误报) 29098 | **唯一可用**：矮圆桌+桌腿+桌上白杯 → Blender 去红地盘/减面16k/缩放 |
| old-tv | 260bbece | review 29100 | 无屏幕浅色楔形片 → 程序化 CRT |
| bookshelf | 8aaf039c | review 29100 | 两块分立薄板 → 程序化书柜+书脊 |
| plant | f0c7459a | review 29100 | 斜靠贴图平板 → 程序化盆栽 |
| rug | c1edfa3d | review 29100 | 竖板 → Blender 放平+压薄到 0.02 |

### 画框 wall-picture
- references.json **无参考图**，走 Blender 程序化（木框+内衬+抽象海景画布），72 三角。

## 三、材质样板与整屋色板（锁定）
- 程序化 canvas 贴图：`tmp/neighborhood-production/livingroom/materials/`
  - `wall-green-tile.png`（绿灰墙砖，淡砖缝）、`floor-living.png`（暖灰褐地坪）、
    `wood-warm.png`（暖棕木纹）、`fabric-olive.png`、`fabric-red.png`。
- 整屋色板 JSON：`livingroom-review/palette.json`（= materials/palette.json）。
- **锁定色板**（供厨房/卧室/浴室沿用）：外墙冷蓝 RGB(86,132,170)；室内绿灰 (122,138,116)；
  木材暖棕 (150,104,58)；床品深蓝 (52,78,128)；沙发橄榄绿 (108,122,84)；扶手椅红棕 (140,86,60)；
  地坪暖灰 (150,138,116)。整体**克制做旧**（细微石纹/木纹/污渍/磨损，非密集条纹）。
- PBR：每件成品 Base Color 来自 Hunyuan 烘焙贴图（仅 coffee-table/rug）或程序化 Principled 材质；
  Roughness 统一 0.82（程序化件 0.6–0.95 按材质）；小装饰共用图集策略沿用菠萝屋做法。

## 四、装配与对比（质量锁定证据）
- 临时装入灰模 `tmp/neighborhood-production/structure/squidward-structure.glb` 二层（行走面 z=1.20）。
- 截图（livingroom-review/）：
  - `whole-house-v2.png`：全屋四层剖切视角，二层可见家具合入。
  - `living-furniture-only-v2.png`：隐藏外壳后家具组合近景。
  - `living-front-v2.png`：剖切开口正面平视二层。
- **曲面/纹理/光照锁定结论**：
  - 曲面：程序化件全部 BEVEL 4 段圆角 + 平滑着色，沙发/扶手椅软包饱满、木扶手圆卷，无直角积木感；
    coffee-table/rug 保留 Hunyuan 曲面。
  - 纹理：绿灰墙砖/暖棕木纹/橄榄布艺均为程序化带噪点做旧贴图，非纯色塑料。
  - 光照：本记录仅锁定材质与阴影期望（柔和面光、家具落影在地毯上）；最终灯光由预览子代理调。
- 对标菠萝屋：runtime 三角数（chair 12960/couch 8568/table 14884）量级一致；本批程序化件三角偏低
  （box 模型），如近景需要更精细软包褶皱可在后续 pass 用 Subdivision + Sculpt 提升。

## 五、已知限制（如实）
- coffee-table 顶面保留了 Hunyuan 烘焙的白色小杯（参考图带入），如需纯桌面可后续 Blender 删顶凸块。
- armchair 实际高 0.75（锚点 0.9），sofa 高 0.73（锚点 0.85）——程序化模型偏矮，装配时可按锚点微调。
- plant 底穿地 -0.01、wall-picture 居中原点（壁挂件预期）。
- 程序化软包为圆角盒，尚未做坐垫凹陷缝线细节（任务书"缝线只做近景可见部分"留待近景 pass）。
- 各件正面朝向以 Blender -Y 为准，装配子代理按 facing_deg 旋转（theta=facing+90）。

## 六、边界遵守
- 只写 `tmp/neighborhood-production/livingroom/` 与 `docs/neighborhood-review/livingroom-review/`；
  未改 `assets/models/neighborhood/`、预览页、脚本库；未 git 提交。
- 共提交 7 个 GPU Shape+Paint 任务（1 个咖啡-table 软门禁 failed 但 GLB 已导出可用），无连打坏图。
