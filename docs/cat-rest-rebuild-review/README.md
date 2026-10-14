# 猫咪侧卧重做预览

新网格来自自有 L20 的 Hunyuan3D，四足骨架与蒙皮重新制作；旧侧卧 V2 已撤回。

- 参考图：OpenAI ImageGen；GPU 任务与哈希见 `provenance.json`、`manifest.json`。
- Blender 重拓扑、原 GPU 颜色烘焙、28 骨骨热绑定；无未绑定点，每点最多四权重。
- 降低身体 → 换爪支撑 → 侧身落地 → 放松；上侧爪叠放，点猫后连续起身再回应。
- GLB 含两个 4.2 秒骨骼片段，无旧侧卧补形。预览使用 `scripts/cat-dual-quaternion.js`，普通线性蒙皮导入器的变形会不同。
- `geometry.json` 检查实际导出片段的 127 帧接地、连续性及拉伸分布；局部极值单独披露，不能替代观感审看。
- `local/`、`live/` 保存真实 Chrome 连续帧、五视角、裸网格、原生点击及录像。
- 公网 10 个关键文件与 6e7c31d 一致；线上 39 条动作/视角记录与原生点击通过，零脚本/资源错误。
- 仅独立候选，用户观感确认待定；脸部仍有生成细节残痕，肩髋/腕部局部拉伸极值见报告。正式页坐卧继续停用。

```powershell
node scripts/art/rebuild_cat_rest_rig.mjs
node scripts/verify-cat-rest-rebuilt.mjs
npm run build
npm run check
$env:NEIGHBORHOOD_HARDWARE_GPU='1'
node scripts/verify-cat-rest-rig-browser.mjs
```

从重拓扑前资产重建：`prepare_cat_rebuilt_base.py` → `refine_kitten_proportions.py` → `bind_cat_rebuilt_heat.py`（使用 `binding-skeleton.json`），再执行上列命令。Blender 脚本参数见各脚本入口；绑定日志保留于 `binding.log`。
