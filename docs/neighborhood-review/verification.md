# 验收记录

日期：2026-10-12。状态：待视觉审查（review），未批准发布、未接入首页。

本轮对象：章鱼哥人像屋最终重建（v4-final，缓存 `?v=20261012-squidward-v4-final`）。

## 模型与资产核对

| 项目 | 实测结果 | 证据 |
| --- | --- | --- |
| 桌面整屋 `squidward-house.glb` | 90,200 索引三角面；bbox y=0 落地、y_max=4.62；XYZ=3.22×4.62×3.19；无朝向/悬空/薄片硬失败；SHA256 `4d3249fc…e9daaa7` | asset-index、check_glb |
| 移动整屋 `squidward-house-web.glb` | 90,200 三角面；与桌面同几何同 SHA（≤15万移动上限） | asset-index、check_glb |
| 桌面室内 `squidward-interior.glb` | 81,504 索引三角面；y=0 落地、y_max=4.59；SHA256 `f7f1d974…dd2e285e` | asset-index、check_glb |
| 移动室内 `squidward-interior-web.glb` | 81,504 三角面；与桌面同几何同 SHA | asset-index、check_glb |
| 参考图哈希 | 外观参考 `2ad29e2c…a92607b2`、室内参考 `ac315841…3a1f6d66`，与 asset-index 一致 | check_glb / Get-FileHash |
| 旧模型归档 | 旧 `squidward-house(-web).glb`、`squidward-interior.glb` 已移入 `assets/models/neighborhood/archive/`；派大星屋两件未改动 | 文件系统 |

命名约定核对通过：`door_frame/door_panel/door_handle`、`floor_1..4`、`shell_*`、`stairs_*`、家具前缀 `kitchen_/living_/bedroom_/bath_/art_`。

## 几何与楼层连接

- 四层行走面：`floor_1..4` 顶面 y=0.15 / 1.20 / 2.40 / 3.60，与 `space-config.json` 权威布局一致。
- 楼梯：39 级踏步 `stairs_step0..38`，从 y≈0.155 连续上升到 y≈3.71；四个休息平台 `stairs_landing_0.15/1.2/2.4/3.6` 与各层楼板相接；手 railing y=0.875→4.525，中轴立柱 y=0.15→3.6。右侧连续螺旋楼梯贯通四层。
- 家具贴地：厨房家具 y_min=0.15、客厅 y_min=1.20、卧室 y_min=2.40、浴室 y_min=3.60，均落在对应层行走面；艺术品台座 `art_plinth-1` 落二层（y=1.2）、`art_plinth-2` 落三层（y=2.4）。无悬空/穿地。
- check_glb 仅两条已知软提示：`bed-rug`（地毯天然薄片）与 `bathtub`（浴缸横放），均为预期，非缺陷。

## 视觉验收（真实浏览器截图，非 Blender 渲染）

| 项目 | 实测结果 | 证据 |
| --- | --- | --- |
| 外观正面 1440×900 | 摩艾脸可读：圆形舷窗眼、长鼻块、木门嘴、两侧耳块、块状平顶；壳体平滑接地、有地面投影、无悬空碎片 | `d01-exterior-front.png` |
| 外观侧面 | 圆柱石壳、木门框、右侧楼梯/平台轮廓可见，壳体闭合 | `d02-exterior-side.png` |
| 外观背面 | 背面石壳完整封闭，螺旋楼梯、顶部浴缸等内部结构不外露碎片 | `d03-exterior-back.png` |
| 室内剖切全景 | 四层竖直完整可见，顶层=浴室（浴缸）、三层=卧室（床）、二层=客厅、一层=厨房；右侧螺旋楼梯与艺术品台座/雕塑清晰 | `d04-cutaway.png` |
| 客厅近景 | 扶手椅、绿沙发、圆茶几、书架（彩色书）、植物、青铜雕塑台座轮廓完整、贴地 | `d05-room-living.png` |
| 卧室近景 | 床、双白枕、双侧床头柜与台灯、床架轮廓完整贴地 | `d05-room-bedroom.png` |
| 浴室近景 | 浴缸（爪足）、立柱洗手台+水龙头、浴帘竖板轮廓完整贴地 | `d05-room-bathroom.png` |
| 厨房近景 | **不通过**：近景镜头被门框/墙面大平面遮挡，家具轮廓不可读（见已知问题） | `d05-room-kitchen.png`、`r02-kitchen-zoomout.png` |
| 移动视口 390×844 | 外观与剖切构图完整、无横向溢出（scrollWidth=390） | `m00-exterior.png`、`m01-cutaway.png`、`m02-room-kitchen.png` |

参考对照：`cmp-exterior.png`（左=外观参考，右=真实浏览器正面截图）、`cmp-interior.png`（左=室内参考插画，右=真实浏览器剖切截图）。左右对应关系：外观摩艾头/眼/鼻/门/耳轮廓一致；室内四层堆叠、右侧螺旋楼梯、艺术品区、顶层浴缸布局与参考一致。所有对照图右侧均为无头 Chrome 真实页面截图，非 Blender 渲染。

与菠萝屋对比：同为平涂 PBR + SSAO + 软阴影卡通语言；章鱼哥屋为低多边形平滑石壳 + 纯色材质，曲面连续、光照方向一致、接地阴影清晰，不以物件数量论合格。

## 运行验收（真实浏览器）

| 项目 | 实测结果 | 证据 |
| --- | --- | --- |
| 房屋切换 章鱼哥↔派大星 | 按钮切换派大星屋（深红圆顶+黄色风向标，40,000 三角面）并切回；`?house=patrick` 直达正确 | `r01-patrick.png`、`runtime-results.json` |
| 进入室内 | 经自测/房间链路可进入剖切（intTris=81,504）；但**点击木门本体不能进入**（见已知问题） | `runtime-results.json` |
| 房间近景 / 返回 / Esc | 房间 chip 进入客厅近景；Esc 回到剖切；「返回外部」回到外观 | `runtime-results.json` |
| 旋转 / 缩放 / 重置 | 拖拽旋转、滚轮缩放、重置镜头均执行无脚本报错（正面→侧面→背面截图已证实旋转生效） | `d01/d02/d03` |
| 窗口尺寸变化 | 1440→1100 重排后无横向溢出（scrollWidth=innerWidth）；移动 390 无溢出 | `runtime-results.json` |
| 控制台 | 无 error、无资源失败（loadingFailed/≥400 均为空）；仅一条 three r186 弃用警告 `PCFSoftShadowMap 已移除，改用 PCFShadowMap` | `runtime-results.json` |
| 三角面显示口径 | 页面「三角面(索引)」与 GLB 索引统计一致：整屋 90,200、室内 81,504 | 页面 meta |

性能采样（模型加载稳定后注入 rAF 计数 20 秒）：

- 桌面 1440×900 剖切：约 **4.4 fps**（90 帧 / 20.2s）。
- 移动 390×844 剖切：约 **9.4 fps**（188 帧 / 20.1s）。
- **限制**：以上为无头 Chrome + SwiftShader 软件光栅（`--disable-gpu`）测得，绝非真实独显性能，也不等于手机实机性能；桌面 ≥50fps、移动 ≥30fps 的目标需在真实 GPU 实机上复核。软件光栅下分辨率越高越慢，故移动(390)高于桌面(1440)属预期。

## 自动检查

- `npm run build`、`npm run check`、`git diff --check` 均通过（exit 0）；仅 LF/CRLF 换行提示，非空白错误。

## 已知问题（本轮未改预览逻辑，仅登记）

1. **厨房近景取景被遮挡**：`house-config.json` 中厨房近景 `camera=[0,2.2,2.8] / target=[0,0.5,-0.6]` 正对门框/墙面大平面，即使滚轮拉远仍只见大平面（`r02-kitchen-zoomout.png`），不满足「家具轮廓完整」。厨房家具本身存在且贴地（剖切图与 GLB 网格转储已证实）。建议：将厨房近景镜头下移/后撤避开门框，或在近景时隐藏 door_frame。
2. **点击木门不能进入**：门探针 `door.exteriorProbe` 的命中热区在屏幕 x≈680–760（左侧剖切开口处），而非可视木门（x≈905）。hover 与点击均不触发进入；室内可经房间链路/`?autotest` 进入，但主交互「点击门进入」当前不工作。建议：按归一化后模型重测并调整 `exteriorProbe` 局部坐标盒。

## 限制

- 手机为 390×844 浏览器视口模拟；双指手势与真实手机性能仍待实机复核。
- 视觉满意度（画风、外壳与参考相似度、上述两处交互问题是否接受）最终由用户视觉审查决定；自动检查与无头截图不等于批准。
