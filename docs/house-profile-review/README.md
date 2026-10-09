# 履历小屋预览

入口：`http://127.0.0.1:8769/pineapple-house.html?v=20261009-cute-close1`。首屏全屏探索，无常驻履历侧栏。点击房间只进入近景，再点击物品打开履历；右上角“查看简历”直接打开完整内容。分类导航、下载与联系入口仅在阅读界面内出现。

| 房间物品 | 内容 |
| --- | --- |
| 图书馆 · 黄色专业技能书 | 三类技能与工程证据 |
| 卧室 · 床上日记 | 字节实习 · 一页工作与成果 |
| 浴室 · 马桶 | 项目探索；完整简历保留项目内容 |
| 卧室 · 闹钟 | 本科、硕士教育经历 |
| 储藏室 · 奖杯、奖状 | 荣誉汇总、11 张真实证书及聘书原图 |

字体来自提供的 TTF；履历来自提供的 PDF；证书来自桌面 `郭书羽/award`。原件逐字节保留，SHA-256 与裁切、转正信息在 `assets/house-profile/sources.json`。缩略图由 `scripts/art/prepare_house_profile.py` 制作；原图点击后加载。证书未生成或改写；三维房屋及家具沿用已完成资产，来源见 `../house-review/`。

## 标志与按钮样式

恢复原 `gsy-logo-transparent-mark.png` 与手写 gsyIsWatchingU 名称。主入口用海绵黄孔纹与救生圈，房间标签采用木框、沙色底和舷窗细节；阅读、返回、证书和重试控件统一木牌样式。

实际桌面 1280×720、窄屏 478×750 验证通过：[结果](nautical-results.json)、[桌面](nautical-screenshots/desktop-house.jpg)、[窄屏](nautical-screenshots/narrow-house.jpg)、[阅读](nautical-screenshots/desktop-resume.jpg)。本轮视口覆盖接口未生效，截图按实际尺寸记录。

## 探索与阅读验证

图书馆移除五个项目书目牌及点击入口，仅保留黄色专业技能书和装饰书架。1280×720 实际点击技能书、关闭留在图书馆通过；[最新截图](library-skills-only/desktop-library.jpg)。构建与资源检查通过，未发布。

技能入口移至图书馆前侧的黄色实体书，保留独立书脊、封面与页块；移除客厅航海图入口。1280×720、390×844 实际点击书本、保留项目书籍、关闭返回、Esc 与刷新通过；[结果](skills-book-results.json)、[截图](skills-book-screenshots/)。房间进入仍只探索，未发布。

当前以 [物品点击结果](object-results.json) 和 [截图](object-screenshots/) 为准：桌面 1280×720、窄屏 478×750；七个房间不自动打开阅读，实际点击航海图、日志、求学纪念、书籍、奖杯和奖状通过。关闭保留房间，Esc 分层返回，刷新恢复干净全屋。原模型和 11 张证书保留；新增画面仅为航海图、日志封面及现有优秀毕业生证书展示框。未新生成家具或学籍证明。

二层地板分色与隔墙统一到 x=0.25，卧室门后墙按 x=1.12 拆分并保留，浴室同步修复门后壳体；螺旋楼梯使用逐层垂直轴与转接平台。结构来源及哈希见 `../house-review/manifests/structure.json`。当前截图尺寸按浏览器实值记录，视口覆盖接口未生效。

以下为前一轮“房间自动阅读”版本的历史验证，当前行为已由物品点击替代。

- 1440×900、390×844 真实浏览器验证，24 项通过；[结果](explore-results.json)。手机为尺寸模拟，双指及实机性能仍需实机复核。
- 首屏画布覆盖视口，无侧栏占位、履历正文或底部按钮排；[桌面全屋](explore-screenshots/desktop-house.jpg)、[手机全屋](explore-screenshots/mobile-house.jpg)。
- 完整简历与分类导航不改镜头；[桌面阅读](explore-screenshots/desktop-resume.jpg)、[手机学历](explore-screenshots/mobile-education.jpg)。关闭保留房间和镜头，Esc 优先关闭最上层，刷新默认全屋。
- 五个履历房间转场结束后打开内容；浴室、楼梯只探索。七个房间近景见 [截图目录](explore-screenshots/)。近景调整视口不会重新打开已关闭内容。
- 图书馆实际点击 Coffee Research 书目签定位项目；储藏室实际点击证书打开原始照片。支持证书放大、滚动与返回；[项目](explore-screenshots/desktop-project.jpg)、[证书](explore-screenshots/desktop-certificate.jpg)。
- 鼠标拖拽、滚轮改变实际相机坐标。临时夹具注入扶手椅加载失败，显示资源名称、简历仍可打开；重试恢复 13 模型及 11 贴图。WebGL 禁用时显示明确提示且实习正文可读。
- 正常页面控制台无错误或警告；故障夹具的 WebGL 错误为预期。夹具保存在忽略目录 `tmp`，不提交。
- `npm run build`、`npm run check`、`git diff --check` 通过；正式 `index.html` 未改变，原有修改保留。

此前常驻履历侧栏版本与房间自动阅读版本的截图保留在 `screenshots/`、`explore-screenshots/`，仅作历史记录；本轮以 `object-screenshots/` 为准。

三个产品演示入口当前返回 200；Skill Dock 返回 410，保留说明与功能示意，不提供失效入口。私有产品没有源码或下载链接。ETMS 数字标明为平台规模；治理 Agent 明确为方案设计。

本轮为可操作预览，尚未替换首页、推送或发布；整体视觉批准由用户确认。

## 卧室日记与闹钟

日记复用现有履历与展示件，移至床面并补封面、书脊和书页边缘；按四项真实实习成果组织第一人称札记，未编造每日日期。闹钟使用局部命中范围，点击下方木桶不触发教育经历。完整简历仍保留常规实习内容。

17 项浏览器检查通过，见 [结果](diary-results.json)、[卧室](diary-screenshots/bedroom.jpg)、[日记](diary-screenshots/desktop-diary.jpg)、[手机](diary-screenshots/mobile-diary.jpg)。手机为视口模拟，暂未发布。

## 实习阅读精简

按简历展示四项工作，每项一条工作内容和一条成果；删除目录、翻页、问题背景和技术标签。床上日记仍是点击入口，完整简历保留原履历细节。

1440×900、390×844 浏览器视口 7 项通过，见 [结果](simple-diary-results.json)、[桌面](simple-diary-screenshots/desktop.jpg)、[手机](simple-diary-screenshots/mobile.jpg)。手机为模拟视口；未替换首页或发布。

## 可爱关闭按钮

简历、日记、证书关闭采用海绵黄与救生圈，音乐采用图标按钮；项目打扫保留扫帚。统一圆润轮廓、立体边缘、按压反馈，保持原关闭和焦点逻辑，支持减少动态效果。手机点击区域至少 44px。

1440×900、390×844 浏览器视口 10 项通过，见 [结果](cute-close-results.json)、[日记](cute-close-screenshots/desktop-diary.jpg)、[手机证书](cute-close-screenshots/mobile-certificate.jpg)、[音乐](cute-close-screenshots/mobile-music.jpg)。仅更新预览，未发布。
