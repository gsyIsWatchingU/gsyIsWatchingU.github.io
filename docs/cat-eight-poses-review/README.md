# 猫咪坐卧修复候选

[独立预览](./?v=20261015-cat-supported-v3)。正式页继续保留原猫，坐卧停用，当前候选尚未获得用户视觉确认。

- 沿用自有 L20 的 Hunyuan3D 猫咪，未重新生成 GPU 模型。Blender 重建身体四边面：9088 点、7777 四边面；保留原头部曲面及脸部贴图像素。来源见 `provenance.json`、`retopology.json`。
- 33 骨、每点最多四权重；按腿部曲面截面拟合肘膝，记录见 `joint-fit.json`；重绑肘膝、头颈和接缝，耳朵可折转。身体贴图重新烘焙至 2048²，颈部从原贴图传色，避免烘焙颈圈。
- 动作先后肢承重、屈前肘、胸腹降低，再侧转或收腕。脚掌约束、肘膝平面及肩髋扭转共同求解；补形与法线烘焙为标准 GLB，无专用蒙皮着色器依赖。
- 胸腹/侧腹接地与头部支撑单独检查，避免仅脚掌着地而身体悬空。靠枕抬爪后再落下，翻身时头颈和耳朵随支撑面调整。
- 八种进入与八种起身片段均为 4.6 秒、30 帧/秒。新增慢速、可拖动进度条和素模切换；拖动暂停，继续后沿当前进度播放。
- `geometry.json` 为 1112 帧网格检查；`contacts.json` 为身体/头部支撑检查；`neck-colors.json` 为贴图接缝采样。`local/` 保存连续帧、多角度、素模及录像，`live/` 保存公网摘要。
- 技术检查通过不代表造型已获认可。肩髋仍有可见折痕，不能据此声称达到影视动画质量；手机实机性能未验证。

```powershell
node scripts/art/build_cat_eight_poses.mjs
npm run build
npm run check
python scripts/art/analyze_cat_face.py
python scripts/verify-cat-neck-colors.py
node scripts/verify-cat-eight-poses.mjs
node scripts/verify-cat-rest-contacts.mjs
$env:NEIGHBORHOOD_HARDWARE_GPU='1'
node scripts/verify-cat-eight-poses-browser.mjs
node scripts/verify-cat-eight-extra-browser.mjs
node scripts/verify-cat-eight-runtime-quaternions.mjs
```

重拓扑入口：`scripts/art/retopologize_cat_joints.py`，输入原绑定 GLB 与 `binding-skeleton.json`，由 Blender 后台执行；输出绑定网格再交给动作构建脚本。原始绑定 SHA 及运行环境见来源记录。

关节拟合入口为 `scripts/art/fit_cat_surface_joints.mjs <绑定网格> <输出 JSON>`；先对初始重拓扑网格采样，再以拟合后的骨架重绑。
