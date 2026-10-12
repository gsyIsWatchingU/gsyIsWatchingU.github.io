# 派大星石头屋 · 资产清单（ASSETS.md）

> 状态：**review（未 approved）**。本页所有新资产均为引擎内程序化重建，尚未经用户验收确认，任何人不得将其标记为 approved。
> 生成方式：本地程序化（Three.js 几何体 + Canvas 贴图），**非 GPU/Forge3D 生成**。GPU 管线（Tailscale gsy-gpu / ssh 3d-gen）因授权与超时被放弃，用户已确认接受本地程序化来源。

## 交付资产（本轮提交内容）

| 文件 | 说明 | 三角面数 / 纹理 | SHA-256 |
|---|---|---|---|
| `assets/patrick-house.js` | 页面 bundle（esbuild minify，构建产物） | — | `AA8D04E1F548A11324EB646CC38041DB28BC91599468E2D7B8B91133C58D410A` |
| `patrick-house.html` | 根目录发布页（构建生成，缓存版本 `?v=20261012-built3`） | — | `C999740266B9C3105186B851ACAF8257366155B0CB04EAA0DAEA4AA145957DA6` |
| `src/patrick-house.html` | 页面源码（占位文案已移除） | — | `28F99EE43E5E2BBF1B53CC702EAB95800D01274A91C109AE7DE5EE99B9B78145` |
| `scripts/patrick-build.js` | 程序化资产模块：紫褐岩石外壳/绿内壁/木地板/沙地/电视屏/派大星贴图（Canvas 绘制），全部家具与角色构建函数 | — | `AC1C02F2398F4A6D7886BFCD128B2B9B25996126F20C2D3F7AAD2B6792B33118` |
| `scripts/patrick-house.js` | 场景主脚本：拾取集合、遮挡过滤、招手状态机、互动隔离、自适应镜头、标签夹取、错误面板、调试接口 | — | `0DBEB32D8F63EE6427AE2729CB2416FF15BA4F8507CFAC6121AFB12F6CEEC10E` |
| `src/data/patrick-house.json` | 4 房间镜头配置（kitchen/bedroom 相机已移入沙围挡环内） | — | `9F44E3FF5A8EA52D9D3F10092AC1D7DD4EF8A94AC0E2C23473F240CAC81A914D` |

## 运行时几何统计（验收实测）

- **162 meshes / 68,830 triangles**（`window.__patrickHouse.stat()`，验收结果 results.json 存档）。
- 贴图均为 Canvas 生成、512×512（rockTex / greenWallTex / woodTex / sandTex / tvScreenTex / patrickFaceTex / skinPlainTex），像素级无外部图片依赖。
- 原 14 个 Forge3D 薄片 GLB（fridge/stove/sink/cabinet/bed/star-pillow/bed-lamp/bench-press/sofa/coffee-table/old-tv/floor-lamp/ceiling-fan/patrick）已移入 `assets/models/patrick-house/archive/` 备份（14 个文件，合计约 62.9 MB），不再加载。

## 备份与修整记录

- 原 GLB 备份位置：`assets/models/patrick-house/archive/`（未提交临时文件；备份保留原模型）。
- 重建记录：
  - 全部 14 个原资产判定为单网格高面数薄片（stove 厚 0.163、old-tv 厚 0.193、bench-press 全高 0.41、coffee-table 无腿扁块等），不符合"可独立拾取、有厚度结构"的要求 → 弃用并归档。
  - 按参考图逐件程序化重建：水槽（盆腔+边缘+龙头+柜体）、炉灶（箱体+灶台+炉门+金色拉手）、老电视（机箱+屏幕+旋钮+天线+底座）、茶几（桌面+四条支撑腿）、沙发/落地灯/吊扇/卧推凳/杠铃/床/海星枕/床头柜/床头灯/双门冰箱/吊柜/木台阶，全部带厚度与背面。
  - 派大星：程序化五角星身体 + 两条独立手臂（肩部/肘部可动）+ 腿 + 绿色紫花短裤，Canvas 重绘脸部/眼睛/眉毛/短裤贴图；手臂骨骼为独立 Group（抬手→摆动→放下状态机），不再拉伸胸前贴图冒充招手。
  - 材质细节：外壳紫褐岩石（noise displace + 色差 + roughness）、内壁绿色柔和纹理、木地板木纹+板缝+厚度、沙地颗粒色差、电视屏发光纹理；剖面围挡改向地下（保留外围沙地厚度，不做地面以上沙墙）。
- 待办：此文档对应的资产截图证据见 `docs/patrick-house-review/after-build/` 与 `docs/patrick-house-review/before-live/`。

## 记录口径

- 三角面数/网格数来自验收时 `renderer.info` 与 `__patrickHouse.stat()`，以 `after-build/results.json` 为准。
- SHA-256 为本次提交时对工作区文件的哈希；提交后如需复算请用 `git hash-object`。
