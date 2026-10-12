# 章鱼哥屋 — 参考整理 + 沙发 Shape+Paint 最小复现记录

日期：2026-10-12。主机：gsy013（NVIDIA L20），Forge3D `http://127.0.0.1:8091`。

## 一、输入（已核验 SHA-256）

| 图 | 路径 | SHA-256 |
| --- | --- | --- |
| 外观（图1） | `docs/neighborhood-review/refs/squidward-exterior-ref.png` (1080×1440) | `2AD29E2C1BE300ACA31AC13D5121C5A90F9123B2D8B387C35A575335A92607B2` |
| 室内剖面（图2） | `docs/neighborhood-review/refs/squidward-interior-ref.png` (1440×1080) | `AC31584187F115A082F590AF6D59A25987F21748C543D26F9500F9A23A1F6D66` |

两图 SHA 与任务书给定值一致。

## 二、已验证管线参数（取自菠萝屋 asset-index/references/verification/manifests）

- 后端：Shape = Hunyuan3D-2.1（DiT flow-matching，steps=40，octree=512，guidance=5.0）；Paint = Hunyuan3D-Paint-2.1（views=6~9，resolution=768）。
- Forge3D `POST /v1/jobs` 字段：`source`(图)、`asset_name`、`asset_kind=prop`、`profile`、`seed`、`prompt`(中文)。
- profile：菠萝屋家具 paint 段用 `xhs_mobile`（三角预算 30000，纹理 1024，paint default views=8/res=768）。本次沿用 `xhs_mobile`。
- 阶段序：prepare→generate_mesh→draft_preview→generate_material→normalize_mesh→export→render_preview→validate。终态 review ≠ approved（`human_art_review=required`）。

## 三、任务1：参考整理（输出 `docs/neighborhood-review/refs/sources/`）

- 共 30 件：外观 6（shell/eyebrow/porthole/nose/ear/door-arch）+ 空间 1（cutaway 去文字剖面）+ 家具 23（armchair/sofa/coffee-table/old-tv/bookshelf/plant/rug-living/bed/nightstand/dresser/bed-rug/bathtub/faucet/shower-curtain/washbasin/stove/sink-kitchen/fridge/dining-table/stool/cabinets/entrance-arch/staircase）。
- 每件：干净单件 PNG（多边形蒙版→裁剪 bbox→放大到最长边 600px→居中 768×768 透明画布）+ `references.json`（字段 id/room/note/source/sourceSha256/preprocessing{size,polygon}/reference/referenceSha256/seed/status，seed 留空待生产分配）。
- 蒙版/裁剪流程复刻 `scripts/art/house_prepare_refs.py`；检查脚本（hunyuan skill 下）尚未就位，改用本地等价检查（可读性/纯色/主体完整度/前景蒙版非空非满）。
- 图2 中过小/不清晰的件（小地毯、凳子、雕像、壁挂厨具、艺术品）已按估计多边形裁剪，未硬造细节；如需更准需更高清原图。

## 四、任务2：沙发输入检查 + GPU 任务

### 输入
- 参考图：`docs/neighborhood-review/refs/sources/sofa.png`（768×768 RGBA）
- SHA-256：`4432B25CF3A755C7D97FAEF57F673AB0FF8A6DBE3F839689279A009081A66971`
- 检查结果：readable=true，前景覆盖 0.3137，颜色 std 26.95（非纯色），bbox_fill 0.38（主体占画幅），蒙版非空非满 → **PASS**。

### 提交参数
- 远端加载路径：`scp` 到 `gsy013:/workspace/projects/squidward-house-20261012/sofa.png`（远端 SHA 校验一致）。
- `asset_name=squidward-sofa`，`asset_kind=prop`，`profile=xhs_mobile`，`seed=20261012`（固定）。
- prompt（中文）：「卡通动画风格三人沙发，橄榄绿色布艺靠背与坐垫，深棕色木质扶手与椅腿，座位右侧放一个米色靠垫，圆润饱满曲面，柔软织物纹理，比奇堡海绵宝宝卡通风格」。

### 第一次提交（失败，已如实记录）
- job_id `a447719f191447f3af9fd0d5e0043bd2`，state=**failed**，阶段 generate_mesh。
- 原因：`torch.OutOfMemoryError: CUDA out of memory`——L20 当时被一个外部 rusty2d/Qwen-Image-Edit 任务占住（host PID 28749 占 40582 MiB，容器 PID 14611 仍在跑），仅剩 ~5 MiB，DiT 模型加载即 OOM。**非输入图问题**（失败发生在模型加载、尚未处理图片）。
- 记录已存 `sources/_job-a447719f/{manifest.json,pipeline.log}`。未连续重复提交。

### 等待外部任务结束后补提交（唯一 1 次）
- 外部任务结束后显存全部释放（free 45586 MiB，无残留进程）。
- job_id `0afbebe8490f44a8a2624c5bd4b7f993`，state=**review**，8 阶段全部 completed。
- 参数与首提一致；source_sha `4432b25c…6971`。
- 三角面 **29100**（索引数量，符合 xhs_mobile 30k 预算），顶点 16351，材质 1。
- 自动质量门禁：file_exists/profile_contract/material_uv_review/render_anomaly_review/automatic_pipeline 全部 passed；`human_art_review=required`（待人工审片）。

### 产物（已下载并校验）
- 远端预览：`gsy013:/workspace/3d-assets/jobs/0afbebe8490f44a8a2624c5bd4b7f993/preview.png`
- 远端 manifest：`gsy013:/workspace/3d-assets/jobs/0afbebe8490f44a8a2624c5bd4b7f993/manifest.json`
- 远端 GLB：`gsy013:/workspace/3d-assets/exports/squidward-sofa/0afbebe8490f44a8a2624c5bd4b7f993/squidward-sofa-xhs_mobile.glb`（1772300 B）
- GLB SHA-256：`995A5367BC45310E71DB2F1AB323E15ECF7CBAC6A55853C98356E764862B6CB4`（远端/本地一致）
- 本地副本：`docs/neighborhood-review/refs/sources/_sofa-job/{preview.png,manifest.json,squidward-sofa-xhs_mobile.glb}`

### 质量对比（菠萝屋 couch 基线）
- 菠萝屋 couch：Hunyuan 原始 shape 2.1M 三角 → Blender 重拓扑/减面后 runtime 8568 三角；`verification.md` 明确"原始 Hunyuan 候选不是质量合格证明"。
- 本次 squidward-sofa：Forge3D xhs_mobile 直接预算到 29100 三角（无需单独减面步），自动门禁全过。
- 视觉结论：候选件几何偏薄偏平，呈弯板/卷片状，缺乏沙发体积、座深、扶手与腿；贴图带蓝色地面渗透（蒙版右下角带入蓝）。属第一版候选，待人工审片；若需合格资产，后续应换更干净/更大的沙发参考图重生成，或按菠萝屋流程做 Blender 曲面修整与重拓扑。**未再提交其他 GPU 任务。**

## 五、边界遵守
- 仅在 `docs/neighborhood-review/refs/`（含新建 `sources/`）下写文件；未改 models、预览页 index.html、脚本库；未 git 提交。
- 仅提交 1 个沙发 Shape+Paint GPU 任务（首提 OOM 失败后补提交 1 次，符合"同一坏图最多 1 次补交"）。
