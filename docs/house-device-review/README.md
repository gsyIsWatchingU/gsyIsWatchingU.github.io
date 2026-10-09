# 客厅设备预览

- 圆桌移除原海螺，换成黄色蓝牙音箱；沙发放蓝色笔记本，点击打开基本信息。进入房间仍只探索。
- 点击音箱选择《约会》《圣诞快乐，劳伦斯先生》《菊次郎的夏天》；支持暂停、循环切歌、进度、音量、收起和 Esc。默认不播放。
- 音乐使用网易云公开播放源；《约会》是 RADWIMPS 作曲、戏说演奏的钢琴版，另两首为坂本龙一、久石让现场版。加载失败提供重试和平台入口，未复制音频到仓库。
- 两件模型分别由自有 GPU 生成：mygpu / Z-Image 源图 → gsy0930 / T4 Hunyuan Shape → mygpu / L20 Hunyuan Paint → Blender 修整。音箱去背景板；电脑保留生成的键盘底座与 UV，重拓扑破损屏幕。未使用整屋融合模型。
- `asset-index.json`、`raw/*/manifest.json` 保存任务、源图、原始模型和修整哈希；`refined/*.blend` 保存工程。原始大网格在本机 `raw/` 与清单中的自有 GPU 路径保留，不进入静态部署。
- 真实浏览器验证 1440×900、390×844：直接点实物、基本信息、三首播放进度递增、切歌、暂停、收起继续播放、分层 Esc、关闭保留房间、刷新干净首屏；404 音源测试显示重试入口。见 `browser-results.json`、`music-playback.json` 和 `screenshots/`。
- 验证：`npm run build`、`npm run check`、`git diff --check`、`python scripts/art/house_device_audit.py` 通过。
- 边界：手机为视口模拟；平台音源依赖网络及平台可用性。仅独立预览，尚未替换首页、推送或发布，视觉批准待用户确认。
