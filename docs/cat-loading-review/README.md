# 猫咪加载修复

截图对应八种睡姿预览。原页面等待约 77 MB 的完整动画文件才创建猫咪；下载、解析失败时没有提示，按钮仍可操作。

- 先显示约 7 MB 的原站姿模型，再载入完整动作；不修改模型或动作资产。
- 显示下载量与解析阶段，就绪前禁用动作、视角和进度控件。
- 连续 45 秒没有下载数据会退出等待；失败保留已显示的猫咪，支持重试。
- `before/` 是原版空地板复现；`local/`、`live/` 保存桌面和手机视口的等待、失败、恢复及版本往返检查。

```powershell
$env:NEIGHBORHOOD_HARDWARE_GPU='1'
node scripts/verify-cat-preview-loading.mjs
node scripts/verify-cat-preview-loading.mjs --live
```

本轮修复加载体验；模型仍为独立候选，手机实机性能待测。
