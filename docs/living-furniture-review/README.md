# 客厅沙发与贝壳预览

[打开三维预览](./)；状态：`review`，用户视觉确认待完成。

- 沙发依据用户图 1：三根绿色横管、两道红棕绑带、顶部绳圈、完整蓝色厚坐垫。
- 圆桌上的音乐物件依据用户图 2：紫色螺旋贝壳，保留「听音乐」入口。
- 可查看单件正面、侧面、背面和客厅摆放；拖动旋转、缩放、网格检查与原始参考对照。

## 来源

原图保存在 `sources/user-*.png`。单件参考由 ImageGen 依据原图整理；3D 网格与贴图由自有 L20 上的 Hunyuan3D-2.1 / Paint 生成。Blender 仅统一缩放、坐标与底部中心枢轴，保留 GPU 网格、UV 和贴图。

| 资产 | 主机 | 任务 | Seed | 运行模型 |
| --- | --- | --- | --- | --- |
| 沙发 | gsy013 | `2d0be628043b487b951ef7259f5a4812` | 20261015 | `../../assets/living-furniture-review/sofa.glb` |
| 贝壳 | mygpu / gsy0901 | `eef84e98a88845efb553958b044f9be9` | 20261016 | `../../assets/living-furniture-review/shell.glb` |

来源、哈希、自动检查和显卡分配见 `provenance.json`、`production/`。原始候选及高精网格在任务所属 GPU 主机保留。

## 修订与限制

- 沙发初版因显卡索引选中繁忙物理卡而显存不足；同任务固定专用 L20 UUID 后完成。浏览器转到侧面发现背景薄板，因此拒绝初版，清除参考光晕并重新生成；未采用初版网格。
- 贝壳流水线未通过 `render_white_patch_risk` 自动门禁，原始 `failed` 状态保留；壳口浅色边缘与高光需结合实际浏览器画面人工审看，不把警报改写成通过。
- T4 入口的独立信任记录不可用，本次未使用；没有绕过 SSH 主机校验。两台 L20 分别生产，不修改共享服务或中断其他任务。
- 正式页家具仍使用原资产；浏览器视口模拟不代表真实手机硬件验收。

## 验证

构建：`npm run build`、`npm run check`。真实 Chrome 验收脚本：`scripts/verification/living-furniture-cdp.mjs`；多视角截图与交互记录保存在 `local/`、`public/`。

技术检查、流水线状态与用户视觉批准分别记录。

发布提交：`05dc879`。本地与公网真实 Chrome 各 17 项通过，公网 10 个关键资源与提交逐字节一致；已查看在线客厅与手机视口画面。记录：`local/browser.json`、`public/browser.json`、`public-resources.json`。
