> 2026-10-14：用户否定 V2 侧卧，已撤回。新网格与骨架见 [重做预览](../cat-rest-rebuild-review/)。以下为历史记录。

# 侧卧扭曲修正候选

2026-10-14：四肢按原形整体旋转，肩髋采用连续形变；上侧爪自然叠放，点击后先起身再抬尾。保留原 GPU 网格、UV、骨架、权重及坐姿目标。仅在独立预览中显示，正式页继续停用坐卧。

- `volume.json`：32 个过渡姿态，四肢截面、肩髋面积与边长检查；全网格面积为额外诊断，不代表全身造型通过。
- `rejected-v1-regression.json`：旧版被厚度检查拦截，符合预期。
- `geometry.json`：接地、面部刚性、转向、行走与暂停检查。
- `local/`、`live/`：五视角、裸网格、实际点击和完整动作录像；观感仍待用户审看。

重建需要 Node/Three.js 与 Python/NumPy/SciPy：

```powershell
python -m venv tmp/cat-arap-python
tmp/cat-arap-python/Scripts/python.exe -m pip install -r scripts/art/cat-side-arap-requirements.txt
node scripts/art/prepare_cat_side_arap.mjs --python tmp/cat-arap-python/Scripts/python.exe
node scripts/verify-cat-side-volume.mjs
node scripts/verify-house-pet-fur.mjs --candidate docs/cat-side-rest-v2-review/pet-spec.json
```

生成后同步独立预览的 `runtime.json`、`pet-spec.json`，再构建、检查并进行浏览器复查。
