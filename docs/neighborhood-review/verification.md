# 验收记录

## v7 当前版本（2026-10-13，缓存 `?v=20261013-squidward-v7`）

按本轮用户参考精修平顶石壳、侧耳与楔形鼻、四层砖墙/木楼板、右侧弧形梯、家具及艺术品平台。参考与浏览器实测并排图见 [reference-comparison.png](acceptance/v7/reference-comparison.png)，未在模型截图中补画或叠加插画。

| 检查 | 结果 / 证据 |
| --- | --- |
| 最终 GLB | 整屋100,626 / 室内95,158三角；桌面/移动同哈希，23图像/23纹理，最大512×512；完整明细见 `asset-index.json` |
| 几何技术门禁 | 4件GLB均通过，最低y=0、最高y=4.62，有贴图的网格均有UV和法线；[model-checks.json](acceptance/v7/model-checks.json) |
| 来源 | 19张输入图检查通过；7件GPU候选进入精修，1件失败电视未采用；浴缸原始failed及白色搪瓷复核依据保留，见[生产登记](acceptance/v7/production/provenance.json) |
| 本地交互预检 | CDP原生输入51/51：1440×900、390×844，真实门网格点击、四房间/返回/Esc、双击返回、拖拽/滚轮/双指缩放及重置、直达派大星后切回、窗口变化；输入全trusted，健康运行零脚本错误/非取消资源失败；[results.json](acceptance/v7/local/results.json) |
| 故障恢复 | 5/5：外观加载阻断后重试、室内失败停止loading、原生重试恢复、双击进入只发一次成功请求；[retry/results.json](acceptance/v7/retry/results.json)。此用例故意阻断2次网络，不混计为健康冒烟错误 |
| 构建 | `npm run build` / `npm run check` / `git diff --check` 通过；正式首页源码和派大星模型未改 |
| 公网 | 待发布后追加公网SHA和CDP复验记录；最终以公网复验为准 |

本轮保持 `review`，没有用户视觉批准，也未接正式首页。插画笔触、石雕细节和透视与参考仍有差异；无头Chrome/SwiftShader及触屏仿真不能证明真实GPU帧率或物理手机操作，实机目标桌面≥50 / 手机≥30fps待复核。

---

## v4 / v5 / v6 历史记录（以下数值与生产边界非当前版本）

日期：2026-10-12。状态：待视觉审查（review），未批准发布、未接入首页。

本轮对象：章鱼哥人像屋最终重建（v4-final，缓存 `?v=20261012-squidward-v4-final`）。

> **v5 复验（2026-10-12，缓存 `?v=20261012-squidward-v5`）**：针对 v4 登记的两处问题修复后重新验收，详见文末「v5 复验」。两处问题均已修复，复验通过。

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

---

## v5 复验（2026-10-12，缓存 `?v=20261012-squidward-v5`）

针对 v4 两处已知问题的修复做重新验收。截图统一存 `acceptance/v5/`，运行数据 `acceptance/v5/v5-results.json`。

### 修复点复验

| v4 问题 | v5 修复 | 复验结果 | 证据 |
| --- | --- | --- | --- |
| 点击木门不能进入（探针盒热区偏到左侧剖切开口） | 改为射线直接对 `door_frame/door_panel/door_handle` 三网格求交，hover 同步切换指针 | **通过**：桌面 1440×900 门网格命中热区屏幕 x≈650–775、y≈550–775（即可视 tan 拱形木门本体），hover 触发 `pointer-hover`；点击后门开动画（doorAnim=true）并进入剖切 intTris=81,504 | `v5/d05-door-hover-desktop.png`、`v5/d06-door-enter-desktop.png`、`v5/d01c-annotated.png` |
| 厨房近景被门框/墙面大平面遮挡 | 房间近景整体隐藏 `door_*`；厨房镜头改为 `camera=[0.2,1.0,1.6] / target=[-0.3,0.55,-0.9]`（门内侧看向岛台/灶台/冰箱） | **通过**：岛台（木条台面）、两把圆凳、灶台（绿色+黑色旋钮）、右侧螺旋楼梯轮廓完整可读，无门框遮挡、无纯色积木感 | `v5/d03-kitchen.png`、`v5/m06-kitchen.png` |

### 运行复验（真实浏览器，无头 Chrome）

| 项目 | 实测结果 |
| --- | --- |
| 桌面门 hover/点击进入 | hover=true（门上）/false（门外地面）；点击进入剖切 81,504；「返回外部」回到外观 |
| 移动 390×844 门进入 | 门网格热区屏幕 x≈160–220、y≈470–610（中心≈190,540，即移动视口下可视木门）；hover=true；点击进入剖切 81,504，门动画触发 |
| 其余三房间近景回归 | 客厅/卧室/浴室近景家具轮廓完整、贴地、无回归 |
| 房屋切换 | 章鱼哥 90,200 ↔ 派大星 40,000（派大星 doors=0、无室内）切回正常 |
| 三角面口径 | 整屋 90,200 / 室内 81,504 索引三角面，与 v4、asset-index 一致，未变 |
| 横向溢出 | 1440=1440、390=390，无横向滚动；UI 不遮挡主要内容 |
| 控制台 | 仅 three r186 `PCFSoftShadowMap` 弃用警告（非错误），零资源失败 |
| 自动检查 | `npm run build`、`npm run check`、`git diff --check` 复跑全部 exit 0 |

### 性能（沿用 v4 环境限制，未伪造）

- 本环境无头 Chrome 仅 SwiftShader 软件光栅、无显示会话无法开真实窗口，真实 GPU 帧率不可测。
- 软渲染对照：桌面 ≈4–5 fps、移动模拟 ≈9–10 fps（沿用 v4 采样值）。
- **桌面 ≥50fps / 移动模拟 ≥30fps 目标需在用户真实设备复核**；本环境仅提供上述软渲染对照，不代表实机。

### v5 结论

- 两处 v4 问题均已修复，桌面与移动双视口「点击可视木门进入」「厨房近景可读」均通过；无回归、无脚本错误、无溢出。
- 仍待用户视觉审查与实机帧率复核；模型资产本轮无变动（GLB 哈希同 v4）。
### v5-final2（2026-10-12，信息卡文案修正，缓存 `?v=20261012-squidward-v5-final2`）

- `house-config.json`：squidward 描述改为「蓝色石质摩艾造型·圆弧石壳；四层自下而上：入口与厨房、客厅、卧室、浴室；右侧连续螺旋楼梯与艺术品平台」，任务号改为「本轮生产：石壳 a68d1b3f / 沙发 0afbebe8 / 茶几 bd384769 / 地毯 c1edfa3d；其余 Blender 精修」。
- `neighborhood.js`：信息卡不再对 jobId 做 `slice(0,8)…` 截断，完整显示。
- 公网冒烟确认：信息卡含「圆弧石壳」「四层」、四个任务号齐全、无省略号；模型加载与门点击进入正常、零资源失败、零脚本错误。

---

## v6 复验（2026-10-12，缓存 `?v=20261012-squidward-v6`）

针对独立验收（2026-10-12，45 项检查 42 过 3 败）9 项问题的修复复验。运行证据存 `tmp/cdp-v6/`（本地服务 + 无头 Chrome CDP 原生输入，双视口）。

### 修复对照（9 项）

| 验收问题 | 修复 | 复验结果 | 证据 |
| --- | --- | --- | --- |
| P1 外观剖切缺口 | 新增 `shell_cutaway_cover` 补片网格（2,200 三角：外壁 1,192 + 内壁 1,008），填充 θ∈(95°,165°)（glTF xz，70° 缺口），边界顶点与 `shell_main` 0 误差贴合；外观显示完整壳体，剖切视图随整屋隐藏 | **通过**：整屋 90,200→92,400 三角；补片加载 2,200 三角、外观有效可见、剖切有效隐藏；正面/侧面/背面渲染为闭合圆柱壳（像素对照 v5「左侧剖开露内部」→ v6「闭合圆柱+斑点纹理」） | `desktop-shell-cover-loaded`、`desktop-cutaway-cover-hidden`、`desktop-exterior/side/back.png`、diff-v5-vs-v6-exterior.png |
| P2 材质与舷窗细节 | 运行时画布石材纹理（圆柱/平面 UV）应用于外壳/面部；舷窗加框环+玻璃（MeshPhysicalMaterial）；不改 GLB 贴图 | **通过**：右壳局部标准差 11.3→15.3（斑点纹理可见）；舷窗呈深色框+玻璃眼眶 | `applyExteriorMaterials`、texstat、`crop-v6-front2.png` |
| P2 房间近景 | 厨房近景改侧向镜头 `camera=[-1.7,0.9,1.0]/target=[-0.5,0.55,-1.15]`；客厅/卧室近景隐藏上方楼板（`hideFloors`） | **通过**：厨房可见橄榄绿橱柜+黑色把手/旋钮（灶台）+吧台凳；客厅沙发/茶几/置物架/绿植无楼板遮挡（floor_3 隐藏）；卧室四柱床/台灯无楼板遮挡（floor_4 隐藏）；返回剖切后楼板恢复 | `desktop/mobile-kitchen.png`、`desktop-living.png`、`desktop-bedroom.png`、floor-visible 断言 |
| P2 来源文档 | asset-index/README 分列「最终采用」与「候选任务」；jobId 卡片同步 | **通过**：最终=Blender 程序石壳+精修家具、采用候选茶几/地毯；未采用=石壳 a68d1b3f/沙发 0afbebe8；候选不作来源证明 | asset-index.json `provenance`、README、信息卡文本 |
| P2 贴图记录 | 按最终 GLB 实测更新：4 图像/4 纹理；2 张 Forge3D ORM 用于地毯/茶几，2 张未被引用；外壳无图像纹理 | **通过**：登记数量/尺寸/引用与解析一致 | asset-index.json `textureRecord`、README「材质与贴图说明」 |
| P1 桌面返回失效 | 场景拾取仅绑定渲染 canvas（`pointerdown/up/move` 移出 wrap），UI 控件事件不再触发场景点击 | **通过**：从房间连点两次「返回外部」依次回到剖切、外观（roomId null）；所有 UI 点击不触发背后场景拾取 | `desktop-return-1/2`、desktop-input.json（106 条全 trusted） |
| P2 手机重置误入浴室 | 同上（canvas 限定）；双指缩放后的重置保持剖切 | **通过**：pinch+重置后 view=cutaway、roomId=null | `mobile-pinch-reset-keeps-cutaway`、mobile-input.json |
| P2 直达切换后标签缺失 | `switchHouse` 内重建 `buildChips()` | **通过**：`?house=patrick` 切回章鱼哥并进门后 4 个房间标签齐全且可点击 | `direct-route-chips-after-switch`、`direct-squidward-chips.png` |
| P2 手机文案重叠 | 移动端操作提示按信息卡实际高度排在其上方（`layoutHint`）；落入信息卡/提示区域的房间标签自动上移（`projectChips`） | **通过**：390×844 外观与全部房间近景提示均位于信息卡上方（gap≈-12px），说明文字完整可读、标签可点击 | `mobile-*-no-overlap`、`mobile-exterior/kitchen.png` |

### 模型变更（v6）

| 模型 | 索引三角面 | SHA256 | 备注 |
| --- | --- | --- | --- |
| 桌面整屋 `squidward-house.glb` | 92,400 | `4d797fd3…40f6cb` | 原 90,200 + 补片 2,200（外壳补写，Blender 结构未动） |
| 移动整屋 `squidward-house-web.glb` | 92,400 | 同上 | 与桌面同几何同哈希 |
| 桌面/移动室内 | 81,504 | `f7f1d974…dd2e285e` | 未变 |

- 补片由 `tmp/nh-close-shell.mjs` 从 `shell_main` 实际顶点生成（29 层 y 环 0–4.62，外半径 1.55→0.37、内半径 1.35→0.17），与 `build_structure.py` 参数化一致；边界贴合 0 误差（θ=95°/165° 双侧最大偏差 0.0000）。
- v5-final2 整屋两件备份于 `tmp/backup-v5-final2/`；原 SHA `4d3249fc…e9daaa7` 对应备份。

### 运行复验（CDP 原生输入，双视口）

- 桌面 1440×900：加载（92,400）→ 门 hover/点击进入 → 四房间近景+Esc 返回 → 连点两次返回（剖切→外观）→ 重置 → 拖拽/滚轮 → 派大星↔章鱼哥切换（切回进门后 4 标签）→ 1100 宽无溢出。21 项全部 PASS。
- 移动 390×844（touch 仿真）：加载无溢出 → 提示/信息卡无重叠 → 门进入 → 双指缩放+重置保持剖切 → 四房间近景+返回 → 直达 `?house=patrick` 切章鱼哥进门 4 标签 → 标签可点击。20 项全部 PASS。
- 合计 41 项断言 0 失败；输入事件全部 isTrusted=true；页面零脚本错误、零非取消资源失败（各一条 three r186 `PCFSoftShadowMap` 弃用警告，非错误）。

### 限制（沿用）

- 无头 Chrome + SwiftShader 软件光栅（ANGLE/SwiftShader），**真实 GPU 帧率与物理触屏未测**；桌面 ≥50fps / 移动 ≥30fps 目标需用户实机复核。
- 视觉满意度（外壳闭合观感、石材/舷窗细节、房间近景构图）最终由用户视觉审查决定；当前仍 `review`，不接首页、不推送发布。
