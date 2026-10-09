# 极品项目集

- 进入浴室后点马桶，只弹出废弃脑花、打码团与卡通便便。
- 点击便便下方“极品项目”，才打开右侧项目集；手机使用底部阅读面板。
- 六个分类：ETMS、write-here、ai-project-hub、算法八股学习网站、skill-atlas、cli-list。每次只显示所选项目，介绍、实现与成果直接在面板内阅读。
- 一键打扫、Esc 清空物品与项目面板，保持浴室镜头并恢复焦点；刷新回到干净首屏。
- AI Project Hub 与 Skill Atlas 文案核对本地仓库 README；沿用其他项目的真实履历与截图，不新增未经核对的在线入口。

验证：实际浏览器 1440×900、390×844，两步点击、六类切换、动画中清理、Esc、刷新、简历入口、无横向溢出及控制台无错误。手机仅视口模拟。结果见 `premium-results.json`；最新截图文件名包含 `premium`，旧版截图保留。

`npm run build`、`npm run check`、`git diff --check` 通过；提交副本也独立构建并检查。预览：`http://127.0.0.1:8769/pineapple-house.html?v=20261009-toilet2`。只本地提交，未替换首页或发布。
