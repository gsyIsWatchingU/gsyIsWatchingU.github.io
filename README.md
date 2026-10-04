# 个人主页

项目已按板块拆分。日常修改 `src`、`styles`、`scripts` 中的源码，不直接修改根目录的 `index.html`。

## 互动小屋（首页）

首页整体重做为「互动房间」式主页，参考 Sharky's Room 的探索形态：加载后进入一间可拖拽观察、滚轮/双指缩放的温馨浅色小屋，点击房间里的物件或底部 dock 进入对应近景。

| 物件 | 近景内容 | 样式 | 交互 |
| --- | --- | --- | --- |
| 全景 overview | 房间导览地图 | `styles/room.css` | `scripts/room.js` |
| 显示屏 monitor | 工程能力控制台（8 项能力 + 站内证据跳转） | `styles/room-content.css` | `scripts/room.js`、`scripts/skill-links.js` |
| MacBook macbook | 独立产品列表（`<!-- @room-projects -->` 由 build 从 `src/data/projects.json` 渲染） | `styles/room-content.css` | `scripts/room.js` |
| iPad ipad | 实习经历与工程经历 | `styles/room-content.css` | `scripts/room.js` |
| 手机 phone | 留言墙（Cloudflare Worker + D1 后端） | `styles/room-content.css` | `scripts/room-guestbook.js`、`scripts/guestbook-config.js` |
| Marshall marshall | 音乐角落 | `styles/room-content.css` | — |
| 钢琴 piano | 生活兴趣（烘焙 / 影视 / AI 绘画 / 健身） | `styles/room-content.css` | — |
| 窗户 window | 关于我（教育、邮箱、定位） | `styles/room-content.css` | — |
| 灯光 lightswitch | 氛围控制（白天 / 夜晚 / 多云 + 灯串开关，localStorage 记忆 `gsy-room-ambient`） | `styles/room.css` | `scripts/room.js` |
| 垃圾桶 trashcan | 手写体小纸条 | `styles/room-content.css` | `scripts/room.js` |

- 页面入口：`src/index.html`；房间场景：`src/sections/room-stage.html`；全部近景层：`src/sections/room-overlays.html`。
- 房间为纯 CSS 3D 场景（`preserve-3d` + 透视），物件为内嵌手绘 SVG，无 Three.js 依赖，加载更快。
- 留言弹幕：`room-guestbook.js` 读取线上留言后通过 `room:danmaku` 事件投递，`room.js` 在房间空气中渲染浮动弹幕。
- 站内证据：工程控制台的能力项可跳转到对应实习经历 / 工程经历（`experience-a1` 等锚点）或 MacBook 产品卡（`project:xxx`），跳转后目标卡片短暂高亮。

## 其他页面

在线刷题页源码位于 `src/playground.html`，样式和交互分别位于 `styles/playground.css`、`scripts/playground.js`。该页面提供 JavaScript 编辑、用例运行、隐藏用例提交、超时保护和草稿自动保存。

## 数据与后端

- 独立产品的文案、可选在线入口与截图统一配置在 `src/data/projects.json`，字段约束见 `src/data/projects.schema.json`，真实产品截图位于 `assets/projects`。旧版产品区（轮播 / 详情卡）的渲染逻辑仍保留在 `scripts/build.mjs`，当前首页使用轻量版 `@room-projects` 渲染；私有产品只展示能力与界面，不提供源码或下载入口。
- 留言后端位于 `backend`，使用 Cloudflare Worker 和远程 D1，配置与查询方法见 [`backend/README.md`](backend/README.md)。

其他电脑通过 Tailscale SSH 外网连接 GPU 的步骤见 [`docs/gpu-external-ssh.md`](docs/gpu-external-ssh.md)。

算法训练平台的全栈 MVP 方案见 [`docs/plan-list.md`](docs/plan-list.md)，功能状态和开发记录见 [`docs/feature-list.md`](docs/feature-list.md)、[`docs/work-roadmap.md`](docs/work-roadmap.md)。

```powershell
npm run build
npm run check
```

`npm run build` 会合并 HTML 片段并生成可直接打开的 `index.html`（根目录文件为构建产物，直接修改会被覆盖）。多人或多个 AI 并行修改时，每个任务只认领对应板块的 HTML、CSS 和 JS 文件即可。
