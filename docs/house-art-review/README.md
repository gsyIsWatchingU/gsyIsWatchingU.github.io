# 玩具箱画廊

- 来源：用户提供的五张图片，原文件完整保留在 `assets/house-art/`。
- 点击卧室玩具箱：打开箱盖与带金色画框的画廊；缩略图、左右按钮和方向键切换，关闭按钮、Esc 或点击外侧收起。
- 本地 Chrome 18 项检查通过：五幅图、箱盖状态、切换、关闭、焦点恢复及 1440×900、390×844、844×390 布局；零脚本错误及资源失败。
- 手机为浏览器视口模拟，实机未测。
- 复测：`node scripts/verify-house-art-browser.mjs`；公网：追加 `--live`。
- 截图与记录：本目录 `local-*.png`、`local-results.json`。

- 公网复测：18 项通过；8 个文件返回 200 且内容哈希一致，五张图与用户原附件哈希一致。见 live-results.json、public-files.json 和 live-*.png。
