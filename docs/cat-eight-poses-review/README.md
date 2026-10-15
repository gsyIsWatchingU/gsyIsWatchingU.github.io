# 猫咪坐卧修复

[本次预览](./?v=20261015-cat-volume-v4&pose=side&progress=0.65) · [同帧素模对照](volume/comparison.html)。仍为独立候选，正式页坐卧保持停用。

- 保留原自有 L20 猫咪曲面、UV 和脸部像素；本轮没有重新生成 GPU 模型。
- 后腿补齐跗关节，共 35 骨；重做收腕、后爪前移与翻身收腿弧线，避免膝肘突然换向。
- 用 32,432 个内部点的体积笼求解皮肤，替代原来的表面平滑补丁；头身接缝合并处理，脚掌与头部支撑复查实际修形后的网格。
- 关节补形烘焙到稳定基底，避免深屈曲时反解塌缩的线性蒙皮矩阵；输出仍为标准 GLB 的 16 段动作，4.6 秒、30 帧/秒。头尾回应保留原混合绑定。
- Meshopt 无损压缩为 77.1 MB，93.2 MB 数据经过网页同款解码器逐字节回读；网页只上传 8 个活动补形槽位，避免毛层分配完整补形集的显存。浏览器实际最多同时活动 5 个目标。
- 「对照上一版」保留进度、视角与素模状态；基线固定为提交 `749c170`，不会跟随新版覆盖。

验证：1112 帧网格检查、原站姿起点、接缝、身体/头部支撑通过；本地 Chrome 的 114 条播放记录、8 次模型点击，以及 51 个中间视角和前后对照通过。慢放、拖动、暂停、中途切换、头尾旋转对照通过。技术检查不代表用户视觉批准；手机实机性能待测。

`local/` 保存完整本地播放证据；`volume/` 保存素模对照与中间帧摘要。公网结果见 `public-resources.json`、`live/browser.json`。来源见 `provenance.json`。

重建资产需要本地 CPU Python 环境；普通网页构建只需 npm：

```powershell
python -m venv tmp/cat-volume-env
./tmp/cat-volume-env/Scripts/python.exe -m pip install -r scripts/art/requirements-cat-volume.txt
$env:CAT_VOLUME_PYTHON=(Resolve-Path tmp/cat-volume-env/Scripts/python.exe).Path
node scripts/art/build_cat_eight_poses.mjs
npm run build
npm run check
node scripts/verify-cat-eight-poses.mjs
node scripts/verify-cat-rest-contacts.mjs
```

新增源码为 `cat_volume_skin.py`、`cat_stable_basis.mjs`、`cat_baked_head_support.mjs` 与 `cat-stream-morphs.js`；离线缓存位于 `tmp/cat-correctives/`。渲染只使用已烘焙的动作，不在浏览器运行体积求解器。

[Meshoptimizer](https://github.com/zeux/meshoptimizer) 使用 MIT 许可，完整声明见 [MESHOPT-LICENSE.txt](MESHOPT-LICENSE.txt)；压缩采用 [EXT_meshopt_compression](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_meshopt_compression)，没有量化姿态或贴图。
