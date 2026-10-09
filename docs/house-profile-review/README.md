# 履历小屋预览

入口：`http://127.0.0.1:8769/pineapple-house.html?v=20261009-nautical3`。首屏全屏探索，无常驻履历侧栏。右上角“查看简历”打开完整内容；点击房间转场后打开对应内容。分类导航、下载与联系入口仅在阅读界面内出现。

| 房间 | 内容 |
| --- | --- |
| 客厅 | 三类技能与实习、项目证据 |
| 天台 | 字节实习与四项成果 |
| 图书馆 | ETMS、主页与五项独立产品 |
| 卧室 | 本科、硕士教育经历 |
| 储藏室 | 11 张真实证书及聘书 |

字体来自提供的 TTF；履历来自提供的 PDF；证书来自桌面 `郭书羽/award`。原件逐字节保留，SHA-256 与裁切、转正信息在 `assets/house-profile/sources.json`。缩略图由 `scripts/art/prepare_house_profile.py` 制作；原图点击后加载。证书未生成或改写；三维房屋及家具沿用已完成资产，来源见 `../house-review/`。

## 标志与按钮样式

恢复原 `gsy-logo-transparent-mark.png` 与手写 gsyIsWatchingU 名称。主入口用海绵黄孔纹与救生圈，房间标签采用木框、沙色底和舷窗细节；阅读、返回、证书和重试控件统一木牌样式。

实际桌面 1280×720、窄屏 478×750 验证通过：[结果](nautical-results.json)、[桌面](nautical-screenshots/desktop-house.jpg)、[窄屏](nautical-screenshots/narrow-house.jpg)、[阅读](nautical-screenshots/desktop-resume.jpg)。本轮视口覆盖接口未生效，截图按实际尺寸记录。

## 探索与阅读验证

- 1440×900、390×844 真实浏览器验证，24 项通过；[结果](explore-results.json)。手机为尺寸模拟，双指及实机性能仍需实机复核。
- 首屏画布覆盖视口，无侧栏占位、履历正文或底部按钮排；[桌面全屋](explore-screenshots/desktop-house.jpg)、[手机全屋](explore-screenshots/mobile-house.jpg)。
- 完整简历与分类导航不改镜头；[桌面阅读](explore-screenshots/desktop-resume.jpg)、[手机学历](explore-screenshots/mobile-education.jpg)。关闭保留房间和镜头，Esc 优先关闭最上层，刷新默认全屋。
- 五个履历房间转场结束后打开内容；浴室、楼梯只探索。七个房间近景见 [截图目录](explore-screenshots/)。近景调整视口不会重新打开已关闭内容。
- 图书馆实际点击 Coffee Research 书目签定位项目；储藏室实际点击证书打开原始照片。支持证书放大、滚动与返回；[项目](explore-screenshots/desktop-project.jpg)、[证书](explore-screenshots/desktop-certificate.jpg)。
- 鼠标拖拽、滚轮改变实际相机坐标。临时夹具注入扶手椅加载失败，显示资源名称、简历仍可打开；重试恢复 13 模型及 11 贴图。WebGL 禁用时显示明确提示且实习正文可读。
- 正常页面控制台无错误或警告；故障夹具的 WebGL 错误为预期。夹具保存在忽略目录 `tmp`，不提交。
- `npm run build`、`npm run check`、`git diff --check` 通过；正式 `index.html` 未改变，原有修改保留。

此前常驻履历侧栏版本的截图保留在 `screenshots/`，仅作历史记录；本轮以 `explore-screenshots/` 为准。

三个产品演示入口当前返回 200；Skill Dock 返回 410，保留说明与功能示意，不提供失效入口。私有产品没有源码或下载链接。ETMS 数字标明为平台规模；治理 Agent 明确为方案设计。

本轮为可操作预览，尚未替换首页、推送或发布；整体视觉批准由用户确认。
