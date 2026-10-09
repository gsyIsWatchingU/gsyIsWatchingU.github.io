# 菠萝屋审查预览

入口：`pineapple-house.html`；主参考：`docs/refs/pineapple-house/01-cutaway-full.png`。

状态：`review`，等待视觉确认；首页未替换，未推送发布。

- 一层：储藏室、客厅、楼梯；二层：浴室与走廊；三层：卧室。
- 右侧：跨二、三层图书馆、蓝色滑梯；后侧螺旋楼梯通往天台。
- 默认完整叶冠、三层与入口；点击房间进入近景，返回按钮或 Esc 恢复全屋。
- 新页没有底栏、品牌邮箱、求职设备、留言弹幕和个人内容弹层。

## 资产来源

房屋壳体、楼板、门洞、楼梯、书架与叶冠由 Blender 制作；12 件家具逐件使用自有 GPU Hunyuan3D-2.1 Shape/Paint 生成候选。

原始候选存在薄片、背景融合及轮廓缺陷，已拒绝直接使用。最终家具在 Blender 中依据参考重新拓扑、补齐曲面与连接、制作 UV 和手绘贴图；最终网格来源明确为 **Blender 修整**，不冒称未改动的 Hunyuan 网格。

- `sources/`：逐件参考裁切及源图哈希。
- `manifests/`：GPU、任务、原始 Shape/Paint 哈希及远程位置。
- `props/`：修整清单、运行模型哈希、正面与侧面预览（这些是 Blender 预览）。
- `screenshots/`：真实浏览器的桌面 1440×900、手机尺寸 390×844 全屋及各房间截图。
- `asset-index.json`：13 个运行模型的核验清单，共 411124 个三角形。
- `rejected/`：早期不合格候选，未用于最终场景。

原始模型本机保留于忽略目录 `tmp/house-production/raw/`，家具 Blender 源工程位于 `tmp/house-production/blender/`，房屋源工程为 `tmp/house-production/structure.blend`；远程备份路径记录在清单中。网站只提交精简运行模型；制作脚本位于 `scripts/art/house_*.py`。

## 验证

`npm run build`、`npm run check`、`git diff --check`；`python scripts/art/house_audit.py` 核对参考、原件、运行模型 SHA256 及 GLB 三角形数。

浏览器验证和对照见 [验收记录](verification.md)。手机测试使用浏览器视口模拟，不代表真实手机硬件性能或双指实机验收。自动检查通过不等于视觉批准。
