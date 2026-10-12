# 章鱼哥屋 一层厨房 / 三层卧室 / 四层浴室 / 右侧艺术品位 — 生产记录

日期：2026-10-12。主机 gsy013（L20，提交前 free≈37GB、0% util）。
Blender 4.5.13 `/workspace/.tools/blender-4.5.13-linux-x64/blender`（本机无 Blender，走本机写 .py → scp → ssh blender --background）。
坐标：Blender Z-up（X 右、Y 后/-Y 前、Z 上）；GLB 导出 Y-up、+Z 朝前。家具 bottom-center 原点，
放置锚点 Z=各层楼板顶，绕 Z 旋转 `theta = facing_deg + 90`（与 livingroom 一致）。

## 一、总体路线决策（如实记录）

- **输入门禁**：对 14 张候选参考图逐一跑 `check_image.py`（短边均 768px、非纯色、主体未贴边，readability 全过）。
- **立体充分性判定**：这些参考全部来自同一张 1440×1080 剖面插画的近正面/斜视角裁切，是**单视角扁平卡通图，无正交侧视/多视角**。
  这正是 B2 客厅已实证失败的参考类别——近正面低分辨率裁切 → Hunyuan 出「单张弯板/零体积」（沙发/扶手椅/电视/书柜/植物/地毯 6/7 全败，仅带腿圆茶几可用且仍需 Blender 大改）。
- **结论：本批全部走 Blender 程序化建模**（参考图仅作配色/结构依据），未提交任何 Shape+Paint GPU 任务
  （不重复已知坏实验、不连打坏图、省 L20 显存）。入口雕像 / 艺术台 / 雕塑在 references.json 中无参考，同样程序化。
- 色板严格沿用 `livingroom-review/palette.json`（外墙冷蓝 86,132,170 / 室内绿灰 / 木材暖棕 150,104,58 /
  床品深蓝 52,78,128 / 克制做旧）；金属/陶瓷/布料按材质分层 Roughness。

## 二、成品清单（final GLB，已拉回 tmp/neighborhood-production/rooms/<room>/）

### 一层厨房（楼板顶 z=0.15）
| 件 | GLB | 三角 | glTF尺寸(X,Y,Z) | check flags |
| --- | --- | --- | --- | --- |
| 绿色整体橱柜 | cabinets.glb | 2244 | 1.56×0.90×0.63 | [] |
| 灶台烤箱 | stove.glb | 1328 | 0.45×0.92×0.59 | [] |
| 厨房水槽 | sink-kitchen.glb | 1048 | 0.49×1.03×0.60 | [] |
| 银色冰箱 | fridge.glb | 664 | 0.55×1.70×0.65 | [] |
| 竹木方餐桌 | dining-table.glb | 1284 | 1.0×0.76×1.0 | [] |
| 圆凳 | stool.glb | 536 | 0.32×0.45×0.32 | [] |
| 入口雕像(L/R共用) | entrance-statue.glb | 1876 | 0.28×0.82×0.31 | [] |

### 三层卧室（楼板顶 z=2.40）
| 件 | GLB | 三角 | glTF尺寸 | check flags |
| --- | --- | --- | --- | --- |
| 竹节四柱床+深蓝床品 | bed.glb | 3184 | 1.12×1.90×1.62 | [] |
| 床头柜+台灯(L/R共用) | nightstand.glb | 592 | 0.40×0.94×0.44 | [] |
| 梳妆台/斗柜 | dresser.glb | 1072 | 0.52×0.87×0.45 | [] |
| 卧室地毯 | bed-rug.glb | 188 | 1.6×0.02×1.4 | orientation_suspect（薄毯误报，同客厅 rug） |

### 四层浴室（楼板顶 z=3.60）
| 件 | GLB | 三角 | glTF尺寸 | check flags |
| --- | --- | --- | --- | --- |
| 有内腔爪足浴缸 | bathtub.glb | 3736 | 0.80×0.59×1.50 | orientation_suspect（长矮浴缸，非真躺倒） |
| 淋浴花洒 | faucet.glb | 232 | 0.18×1.70×0.39 | [] |
| 洗手盆(壁厚/内腔) | washbasin.glb | 980 | 0.50×0.99×0.45 | [] |
| 蓝白褶皱浴帘 | shower-curtain.glb | 364 | 1.64×2.02×1.60 | [] |

### 右侧艺术品位
| 件 | GLB | 三角 | glTF尺寸 | check flags |
| --- | --- | --- | --- | --- |
| 艺术品台(二/三层共用) | art-plinth.glb | 564 | 0.35×0.40×0.35 | [] |
| 自傲雕塑 | art-sculpture.glb | 2280 | 0.24×0.55×0.25 | [] |

合计 17 个唯一 GLB ≈ 20.3k 三角。每件同目录有 `<name>-runtime.json`（runtimeSha256、bbox、来源、triangles）。
check_glb 全量输出见 `rooms-review/check_glb-summary.txt`，全部 ok=True（2 个 orientation_suspect 为薄毯/长矮浴缸的已知误报）。

## 三、关键实现要点

- **统一 helper**：`box/cyl/sph/cone` 全部 `transform_apply(scale=True)` 把位置烘进网格（修复了 lamp-shade 首次导出丢 location 穿地 -0.08 的 bug）；全部 BEVEL 3–4 段圆角 + 平滑着色，避免直角积木感。
- **厨房**：橱柜=踢脚后缩+柜体+台面悬挑+4 扇内嵌门板+小拉手；灶台=黑灶面+4 炉头+烤箱黑玻门+横拉手+旋钮排；水槽=柜体+不锈钢盆沿+下沉内腔+龙头；冰箱=双门分缝+竖长拉手；餐桌=竹拼桌面嵌线+4 竹节腿(节点环)+横撑；雕像=底座+头颈+长鼻+眉梁（摩艾风）。
- **卧室**：四柱竹床=4 立柱带节点环+顶棚框+床头横梁+床垫+深蓝被子+2 枕头；床头柜=抽屉+台灯(金属柱+锥形灯罩)；斗柜=3 抽屉排。
- **浴室**：浴缸=外胖壳体+下沉内腔底板+四向口沿薄壁+4 爪足（真实壁厚/内腔）；花洒=立式立管+横臂+花洒盘（chrome 金属）；洗手盆=台柱+盆体+下沉内腔+龙头；浴帘=正弦褶皱网格(from_pydata 40×4)，布料高粗。
- **粗糙度分层**：陶瓷 0.25 / chrome 金属 0.15 metal=0.9 / 做旧金属 0.5 metal=0.6 / 木 0.7 / 布料与床品 0.9–0.95。

## 四、装配与对比（证据截图，rooms-review/）

- 临时装入 B1 灰模 `tmp/neighborhood-production/structure/squidward-structure.glb`，按 space-config 锚点放置（含已有客厅件作上下文）。
- 截图：`whole-house.png`（全屋四层剖切）、`kitchen-closeup.png`、`bedroom-closeup.png`、`bathroom-closeup.png`。
- 结论：轮廓完整、家具落位对齐锚点、绿橱柜/深蓝床品/白陶瓷浴缸/竹节木区分清楚、无纯色积木感、无明显悬空/穿插。

## 五、已知限制（如实）

- 全部程序化件为圆角盒/柱基础形体，未做近景软包褶皱/木纹法线细节（任务书"缝线/法线只做近景可见部分"留待后续近景 pass）。
- 浴缸 orientation_suspect(0.39) 为长矮爪足浴缸真实比例，非旋转错误；bed-rug 为薄毯误报。
- 灶台/水槽按独立整柜建模，装配时嵌入橱柜连续段（config 意图为内嵌），由装配子代理按锚点落位。
- 未提交任何 Shape GPU job（路线见第一节）。

## 六、边界遵守

- 只写 `tmp/neighborhood-production/rooms/`（kitchen/bedroom/bathroom/art/_build/_shots）与 `docs/neighborhood-review/rooms-review/`；
  未改 `assets/models/neighborhood/`、预览页、脚本库；未 git 提交。
