# 个人主页

项目已按板块拆分。日常修改 `src`、`styles`、`scripts` 中的源码，不直接修改根目录的 `index.html`。

## 三层菠萝屋（首页）

首页与 `pineapple-house.html` 使用同一份源码：默认全屏探索三层菠萝屋，首屏仅显示原 gsyIsWatchingU 标志、查看简历入口和操作提示。点击房间只进入近景；图书馆仅以黄色技能书打开专业技能，书架保留装饰；其他履历由各房间物品打开。右上角可直接阅读完整简历。支持旋转缩放、返回和 Esc；旧底栏、设备与留言不加载。2026-10-10 按用户部署指令替换正式首页；旧首页源码保留在 `src/legacy-room.html`。

源码为 `src/pineapple-house.html`、`scripts/pineapple-house.js`、`styles/pineapple-house.css`；房间与镜头统一配置在 `src/data/pineapple-house.json`。制作来源、模型哈希与截图见 [审查记录](docs/house-review/README.md)。

履历内容在 `src/data/house-profile.json`，证书清单在 `src/data/house-awards.json`；构建时生成可直接阅读的 HTML，`scripts/house-profile.js` 独立控制阅读弹层与证书查看，提供 `openResume(sectionId)`、`closeResume()`；关闭内容保留原房间与镜头，Esc 优先关闭最上层内容。新增字体、简历、证书来源和浏览器截图见 [履历小屋记录](docs/house-profile-review/README.md)。

```powershell
npm run build
python -m http.server 8769 --bind 127.0.0.1
# 浏览 http://127.0.0.1:8769/pineapple-house.html
```

## 旧互动小屋（保留源码）

首页整体重做为「互动房间」式主页，参考 Sharky's Room 的探索形态：加载后进入一间可拖拽观察、滚轮/双指缩放的温馨浅色小屋，点击房间里的物件或底部 dock 进入对应近景。房间由 Three.js 实时渲染（透视相机、软阴影、环境反射、昼夜/天气/灯串联动），支持悬停高亮与点击转镜头。

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
- 房间为 Three.js 实时 3D 场景（`scripts/room3d.js`，构建打包为 `assets/room3d.js`）：`preserve-3d` CSS 版本已废弃；拖拽旋转、滚轮/双指缩放、射线拾取悬停高亮、点击物件相机平滑转镜头后由 `room.js` 打开对应近景（`room:activate-request / activate-done / scene-click / reset-view / request-close` 事件桥接）；WebGL 不可用时兜底为点击直接打开近景。
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
