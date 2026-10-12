# 章鱼哥屋 最终装配 — 生产记录

日期：2026-10-12。主机 `mygpu`（192.168.88.122），Blender 4.5.13 `/workspace/.tools/blender-4.5.13-linux-x64/blender`。
装配脚本：`tmp/neighborhood-production/assembly/assemble_final.py`。源工程：`tmp/neighborhood-production/assembly/out/squidward-assembled.blend`。

## 一、输入（已核验）
- 结构灰模＋石壳：`tmp/neighborhood-production/structure/squidward-structure.glb`（11792 索引三角，厚壁扇形壳＋四层楼板＋右侧螺旋楼梯＋摩艾面部特征，前侧剖切 θ∈[-165°,-95°]）。
- 客厅成品 8 件（`livingroom/final/`）：sofa 2896 / armchair 1996 / coffee-table 16000 / old-tv 1060 / bookshelf 564 / plant 968 / rug-living 29100 / wall-picture 72。
- 房间成品 17 件（`rooms/`）：kitchen 7 / bedroom 4 / bathroom 4 / art 2。
- 空间配置（唯一权威）：`docs/neighborhood-review/config/space-config.json`。色板：`docs/neighborhood-review/livingroom-review/palette.json`。

## 二、装配做法
- 每件家具为 bottom-center 原点、正面朝 Blender -Y。落点 = `anchor(X,Y,Zfloor)`，绕 Z 旋转 `theta = facing_deg + 90`（沿用 `rooms/_build/assemble_rooms.py` 先例）；地毯类加 zoff=+0.005 避免与楼板 Z-fighting。
- 楼板行走面：一层 z=0.15、二层 1.20、三层 2.40、四层 3.60。
- 导出前对全部 mesh/curve 烘焙 `location+rotation+scale`（node=identity，网格空间=世界空间），这是 check_glb 按网格局部坐标统计包围盒时不误报穿地的关键（与 `build_structure.py` 同款做法）。

## 三、材质统一（按 palette 精确 baseColor 因子）
家具成品本已用平涂 PBR（baseColor/Roughness 因子、无图像贴图），实测床品=深蓝(52,78,128)、木作=(150,104,58) 均已在色板上。本次只重染结构灰模的 6 个材质：
- `stone_gray`（外壳外壁）→ 外墙冷蓝 (86,132,170)，rough 0.85
- `feature_gray`（眉梁/鼻/耳/舷窗）→ 外墙冷蓝同色，rough 0.85（摩艾石质）
- `stone_inner`（壳内壁）→ 室内绿灰 (122,138,116)，rough 0.90
- `floor_gray`（四层楼板）→ 地坪暖灰 (150,138,116)，rough 0.90
- `wood_gray` / `door_gray`（楼梯/门）→ 木作暖棕 (150,104,58)，rough 0.70

> 关于 AO/贴图：菠萝屋先例（`scripts/art/house_textures.py`）是程序化平涂，并非真 AO 烘焙；结构网格为 from_pydata 构建、无 UV，家具为已定稿平涂资产，故本次不做图像贴图/AO 烘焙，全部为 baseColor/Roughness PBR 因子。贴图预算（桌面≤2048 / 移动≤1024）因此天然满足——本模型不含任何图像贴图。

## 四、网格命名（供预览门交互与房间近景隐藏）
- 门：`door_frame` / `door_panel` / `door_handle`（把手加在门轴右侧）。
- 楼板：`floor_1`..`floor_4`。
- 外壳/面部：`shell_main` / `shell_eyebrow` / `shell_porthole_L/R` / `shell_nose` / `shell_ear_L/R`。
- 楼梯：`stairs_step0..38` / `stairs_pole` / `stairs_handrail` / `stairs_landing_0.15/1.2/2.4/3.6`。
- 家具网格均带房间前缀：`kitchen_*`(90) / `living_*`(94) / `bedroom_*`(57) / `bath_*`(25) / `art_*`(11)。零未命名网格。

## 五、四档 GLB（索引三角）
| 文件 | 档位 | 索引三角 | 说明 |
|---|---|---|---|
| `squidward-house.glb` | 桌面整屋 | 90,200 | 外壳＋结构＋全部家具，≤30万 |
| `squidward-house-web.glb` | 移动整屋 | 90,200 | 同几何（已≤15万），无贴图可降采样 |
| `squidward-interior.glb` | 桌面室内 | 81,504 | 删外壳＋面部特征，留楼板/楼梯/门/家具，供近景与剖切 |
| `squidward-interior-web.glb` | 移动室内 | 81,504 | 同几何 |

> web 档决策：桌面整屋仅 9.0 万索引三角，已远低于移动 15 万上限；模型无图像贴图，故 web 与桌面同几何（与旧档 house/web 三角数一致的菠萝屋先例相同），不另降面。

## 六、修正记录
- 浴室淋浴管件(faucet)与浴帘(shower-curtain)原始 GLB 高约 2.0，而四层浴室净高仅 0.85（z 3.60→4.40），装配后顶部 y≈5.5–5.6 穿出壳体顶点(4.62)。对这两件做竖向缩放（zscale 0.35 / 0.37），使其收进天花板下；其余家具按原始高度落地。

## 七、自检证据（check_glb.py）
- `squidward-house.glb`：ok=true，flags=[]，bbox y_min=0（落地），y_max=4.62（=壳体顶点，无穿出）。
- `squidward-interior.glb`：ok=true，flags=[]，y_min=0，y_max=4.592。
- 楼层连接：楼梯 `stairs_landing_*` 分别落在 z=0.15/1.20/2.40/3.60，与四层楼板顶面对齐；踏步与落脚平台相接；家具落点贴各层行走面（z=0.15/1.20/2.40/3.60）；无穿地、无悬空、无穿插（check flags 为空）。
- 渲染证据：`tmp/neighborhood-production/assembly/out/shot_front.png`（前/剖切）、`shot_side.png`（右侧螺旋楼梯侧）、`shot_back.png`（后）、`shot_cutaway.png`（剖切近景）、`shot_interior.png`（室内）。确认四层竖直完整、顶部为浴室、右侧连通螺旋楼梯、艺术品平台在楼梯旁。

## 八、边界
- 仅写 `assets/models/neighborhood/`（4 成品 + archive\ 备份）、`docs/neighborhood-review/`、`tmp/neighborhood-production/`；未改预览页、未改脚本库、未 git 提交。
- 旧 squidward 三件已移入 `assets/models/neighborhood/archive/`（保留备份）；派大星屋文件未动。
