# 猫咪侧卧历史记录

此版已被用户否定并从正式页撤回。以下仅保留历史技术记录，不能视为造型通过。新版见 `../cat-side-rest-v2-review/`。

- 对照用户参考图的「01 侧躺式」：侧身贴地、头降低、四肢落下、尾巴放低。
- 保留原始 GPU 网格、UV 和贴图；调整肩髋落点、脚掌接触和头部朝向，加入八段侧卧修正形态。
- 正式场景仅接入侧卧，坐姿继续停用；坐姿候选仍在独立预览中，观感确认待定。
- 检查：构建与资源检查、几何接地与拉伸、五个视角和裸网格、原生点击躺下与起身、正式场景自主侧卧和点击回应。
- `geometry-*.json` 是技术检查；`local/`、`live/` 是实际浏览器截图和录像，不代表用户审看通过。

生成与复查：

```powershell
node scripts/art/prepare_cat_side_rest.mjs
node scripts/verify-house-pet-fur.mjs --candidate docs/cat-side-rest-review/pet-spec.json
npm run build
npm run check
$env:NEIGHBORHOOD_HARDWARE_GPU='1'
node scripts/verify-cat-side-rest-browser.mjs
node scripts/verify-cat-side-rest-house.mjs
```

重新生成后同步模型 SHA 到配置；独立预览用同一脚本从 `siamese-kitten-seated-anatomy.glb` 追加侧卧目标，保留其坐姿目标。
