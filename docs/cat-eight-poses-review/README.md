# 猫咪睡姿重做候选

[独立预览](./)参考用户提供的八种睡姿，保留暹罗幼猫造型。正式页保留原猫，坐卧继续停用。

- 来源：自有 L20 的 Hunyuan3D；参考图由 ImageGen 制作。任务、输入哈希与来源见 `provenance.json`、`manifest.json`。
- 原 GPU 曲面与贴图保留；重划头颈区域，肩髋和肘膝重新拟合，四肢使用连续权重与脚掌保护，尾骨按实际蒙皮坐标拟合。
- 31 骨、每点最多四权重；关节补形锁定脚掌和头骨，头身接缝合并求解，平滑关节修形并烘焙表面法线。标准 GLB 线性蒙皮，无专用双四元数适配器依赖。
- 八段躺下及八段起身，均为 4.6 秒、30 帧/秒。侧躺先屈腿再侧身；卧睡收拢前爪；靠枕先抬前爪、枕头滑入后再落爪靠头；用下巴/脸颊判断头部支撑。
- 修复打招呼转头、抬尾逐帧累加；每帧先撤销旧偏移，再施加当前偏移。浏览器实测旋转与 GLB 终态一致。
- 眼睑、细胡须、短绒毛及耳内色彩由预览材质控制，不改原始贴图。
- `geometry.json` 检查实际动画；`local/`、`live/` 保存连续帧、多视角、裸网格、实际点击及录像。技术检查不代表用户视觉批准。

```powershell
node scripts/art/build_cat_eight_poses.mjs
npm run build
npm run check
node scripts/verify-cat-eight-poses.mjs
$env:NEIGHBORHOOD_HARDWARE_GPU='1'
node scripts/verify-cat-eight-poses-browser.mjs
node scripts/verify-cat-eight-runtime-quaternions.mjs
```

源网格准备：`prepare_cat_clean_base.py` → `scale_cat_clean_base.py`；代理骨热：`bind_cat_hybrid_surface.py` → `bind_cat_heat_surface.py`；最终原曲面绑定：`transfer_cat_original_surface.py`。参数见各脚本入口，代理仅用于初始权重，未作为展示网格。
