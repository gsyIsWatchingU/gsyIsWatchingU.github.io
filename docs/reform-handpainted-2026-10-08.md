# 互动小屋手绘动画布景改造记录（2026-10-08）

## 背景与目标

用户反馈原菠萝屋「很假，很像积木，没有手工漫画的真实感」。本次把「规整几何体拼出来的塑料玩具小屋」改造为「保留真实三维空间和交互的手绘动画布景」：家具轮廓有设计、有体积、有软硬差异；墙面、家具和地面有可辨认的绘画笔触；线条、色块、明暗和造型属于同一种美术语言；转动镜头后仍然成立。

不追求写实摄影、高反光塑料、微缩模型、黏土、乐高；不覆盖噪点、不统一加黑边；保留真正的三维场景，不拿一张房间图片替换场景。

## 核心改动

### 1. 模型重建（轮廓优先，程序化建模，可复现）

本机无 Blender，全程在 GPU 服务器（`ssh 3d-gen`，Blender 4.5.13 LTS）用 bpy 脚本程序化建模并导出 GLB，源码保存在正式目录 `scripts/art/`（非 tmp）：

- `scripts/art/build_red_armchair_v4.py` → `assets/models/red-armchair-v4.glb`（最终 v7）
  - 高靠背纵向拉长（靠背 0.6..1.484），顶部真圆顶 + 连贯横卷软包（top_roll 1.279..1.462），C 形侧翼前卷包裹（背厚 0.21），中央软垫内凹，边框加宽鼓出；
  - 扶手为向前卷出的软包结构（半径 0.068→0.100），坐垫加大内凹/边缘鼓起/前缘卷边；
  - 红白 8 段救生圈（固定种子低频形变，允许椭圆/压扁/分段），四腿穿过圈体落地（y 0..0.44）。
- `scripts/art/build_green_couch_v3.py` → `assets/models/green-couch-v3.glb`（重导 v3）
  - 三根绿色横向软管保留，长度/弯曲/端部饱满度各有差异（z -0.378..-0.142），不再等径等距；
  - 橙色绑带三条贴合靠背前脸（0.12..1.08），蓝色软坐垫前伸、厚度/下陷明确（0.26..0.56，z -0.26..0.46 前缘朝镜头），中缝细条；木腿/侧轨落地不抢视觉重点。
- `scripts/art/build_room_shell_v3.py` → `assets/models/room-shell-v3.glb`
  - 从「21 条等距厚板条围栏」改为「连续墙面 + 绘制竖纹」，仅墙裙微阶/角柱/基脚线保留几何起伏；
  - 拱形门洞与 `arch-door-v2.glb` 门框精确配合（X0=-1.648 X1=-0.68 ACX=-1.164 R=0.484），无露缝。
- `scripts/art/build_table_snail_v2.py` → `assets/models/round-table-v2.glb` + `snail-v2.glb`
  - 圆桌边缘轻微不均匀、腿部造型明确；蜗牛身体/壳/眼柄可辨认（按 `snail_` 前缀分选择集导出）。

每个 GLB 均用 `tmp/glb-three.mjs`（THREE.GLTFLoader 真实加载 + Box3）验证落地 / 比例 / 朝向，输出存 `tmp/*-verify.txt`。

### 2. 手绘贴图（程序化 canvas，非规则纹理）

`scripts/room3d.js` 全部贴图重写为方向性笔触语言：

- 墙面 `wallTex`：连续浅蓝绿底色 + 深浅不均的蓝色竖向笔触（46 道短纹 + 6 道长程竖纹，宽度/长度/透明度各异），替代规则板条；
- 地面 `floorTex`：浅暖底色 + 稀疏斑驳，移除醒目规则地砖格；
- 布料 `fabricTex`：软色块铺色（大尺度明暗色面）+ 交叉短弧涂抹 + 少量干刷，替代规则交叉编织线（避免木纹/编织读感）；
- 救生圈橡胶、橙色绑带、木纹、屋顶、叶片、金属均为方向笔触版本；
- 颜色贴图 sRGB、数据贴图 sRGB 语义正确；`applyRoomMaterials` 按材质名映射重写（`done` 集合不跳过 UV 处理），新 GLB 自带材质不再被旧纹理无条件覆盖。

### 3. 渲染方案（`scripts/room3d.js`）

- `toon()` 工厂从「返回 MeshStandardMaterial」改为返回 `MeshToonMaterial` + 12 档柔和 gradientMap（柔和分层，非机械硬切三档）；
- 描边：`OutlinePass` 现在收集全部家具/墙面/设备网格到 `selectedObjects`（`outlineMeshes` + `refreshOutline`），edgeGlow 0.15→0.06，线色为协调深暖色；
- 光照：hemi 0.46 / 主光 1.15（不再过曝），SSAO 收紧到接触/凹陷/缝隙，Bloom 阈值 0.92 只服务灯具发光，环境反射 intensity 降低避免墙面变深、红椅变脏；
- 雾、气泡减少干扰；白天/夜晚/多云沿用同一套 toon 语言（`applyAmbient` 同步重调）；
- 主镜头俯角降低（桌面 0.5→0.42、手机 0.58→0.5），减弱俯视桌面模型感，椅背/沙发座面/门/墙关系更接近参考图；
- 台灯移离红椅（-1.15,-1.6 → -2.15,-1.2），消除「椅面蜡烛」误读；
- 9 个现代设备（monitor/macbook/ipad/phone/marshall/piano/window/lightswitch/trashcan）全部切换 toon 材质，融入同一美术语言。

### 4. 页面与构建

- `scripts/room3d.js` 全部补丁写入（累计 70+ 处），保留 CRLF；
- `src/index.html` 资源 query 全部改为 `?v=20261008-handpainted` 突破缓存；
- `npm run build` 重新生成根 `index.html` 与 `assets/room3d.js`。

## 验证

- `npm run build` / `npm run check` / `git diff --check` 通过；
- 无头 Chrome CDP 真实浏览器验收截图（`tmp/final/`，11 张）：
  - 桌面：主视角、左/右旋转视角、红椅近景、沙发近景、墙面与门局部、夜晚、多云；
  - 手机 390×844：全景、旋转视角、底部导航打开「工程能力」内容层（真实事件协议 `room:activate-request → activate-done → openOverlay`）；
  - 控制台无新增错误（仅本地留言 API CORS，属预期：本地端口不在线上白名单，公网不受影响）；
- 同镜头对比图：`docs/reform-2026-10-08/compare-main.png`（参考图 02-living-room / 改造前基线 / 改造后主视角）；
- 基线截图：`tmp/baseline/`（10 张，改造前）；最终截图：`tmp/final/`。

### 视觉结论（自动读图模型逐张复读）

- 红椅：正面/三分之四/侧面均读作「红色扶手椅」，不再被读作方块/桶形/鼓包；救生圈红白分段成立；
- 绿沙发：读作「绿色圆柱 + 橙色绑带 + 蓝垫」的沙发/座椅，不再被读作木质工作台/工业管件；
- 墙面：读作「浅蓝带竖纹的背景墙」，绘制竖纹成立，无厚板条围栏感；
- 白天/夜晚/多云同一美术体系；手机端主要家具清晰可辨。

## 资产来源声明

- 全部模型为**程序化建模**（bpy 脚本在 GPU 服务器执行导出），非人工雕刻；贴图全部为**程序化 canvas 绘制**，非手工绘制、非参考截图裁剪；视觉上的手绘风格与资产的实际制作来源是两回事，如实标注；
- 参考图仅作美术方向：`docs/refs/pineapple-house/02-living-room.png`、`06-living-details.png`（手绘语言）、`01-cutaway-full.png`（空间配色）；`10-sims-living-room.png` 仅辅助三维摆放结构，未决定最终材质/地砖/灯光；未复制任何截图 UI 元素。

## 已知问题 / 未完成

- 性能：未能精确测量帧率（本机无 GPU/无稳定计量手段），如实说明；模型/贴图成本可控（低多边形 GLB + 256px 画布贴图 + 单 SSAO/单 Outline），未为截图堆大量实时灯光；
- 留言 API 在本地预览端口被 CORS 拒绝（线上白名单仅 github.io 与 5500 端口），公网部署不受影响；
- 视觉满意度最终由用户本人确认，本记录不代为宣称「还原度」。
