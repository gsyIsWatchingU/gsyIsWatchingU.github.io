# 项目状态

最后更新：2026-10-10

## 当前阶段

按用户 2026-10-10 部署指令，将三层菠萝屋设为正式首页。

## 当前目标

默认不展示简历正文；点击房间只探索，点击房间物品才阅读对应履历；右上角可直接查看完整简历。本轮发布首页并核对远端提交、GitHub Pages 与线上浏览器。

## 本轮发布（2026-10-10）

- 首页源码复用菠萝屋，旧首页保存在 src/legacy-room.html；移除 noindex，统一资源版本 20261010-release1。
- 已纳入最新技能、日记、音乐、设备模型、图书馆墙体与猫咪交互。
- 构建、资源检查通过；本地 1440×900、390×844 浏览器 26 项通过，无脚本错误或资源失败。证据：docs/deployment-20261010/。
- 发布提交 44dcfc9 已推送 main 与当前分支；Pages 运行 37961112111 成功。线上 25 项资源返回 200，页面、脚本、样式、模型和简历哈希与本地一致。
- 线上 1440×900、390×844 浏览器 26 项通过，无脚本错误或资源失败；结果与截图见 docs/deployment-20261010/live-*。
- 下一步：按后续反馈迭代；旧首页相关未提交修改继续保留在本地。
- 问题：无发布阻塞；真实手机触屏及性能仍待实机验证。以下待审描述均为历史记录。

## 游戏试玩入口（2026-10-10）

- 项目集新增《罪恶蟹湖》分类和“开始试玩”按钮，打开站内独立游戏页。
- 托管已验证的 0.3.5 厕所主线版本；游戏文件保持原包内容，位于 games/krusty-krab/0.3.5/。
- 构建、资源检查及桌面/手机视口真实点击通过：打开游戏、开始、键盘移动、触控按钮、自动存档和刷新续玩正常，无脚本错误或资源失败。证据：docs/game-play-entry/。
- 发布提交 52e7b68 已推送 main，Pages 运行 37961938192 成功；线上 25 项资源返回 200，哈希与提交内容一致。
- 线上桌面/手机视口 37 项浏览器检查通过，无脚本错误或资源失败；见 docs/game-play-entry/public/。
- 下一步：按试玩反馈迭代；真实手机仍待实机验证。

## 已完成

- 项目集按产品名展示：北师大教育培训管理服务平台、Lumi Doc、AI Project Hub、Algorithm Lab、Skill Packer、CLI List；保留新增《罪恶蟹湖》试玩入口，七项均有图标，四个网站提供直达按钮。按用户补充要求，两个桌面应用仅展示截图，可打开大图。构建、资源与差异检查通过；桌面 1440×900、手机视口 390×844 本地与线上各 70 项浏览器检查通过。发布提交 200ef9e，Pages 37963105438 成功，线上 11 项资源与本地一致。记录见 docs/house-toilet-review/brands/；下一步按反馈迭代。

- 猫咪新增闲逛、趴下与点击正面看镜头：世界轴转头、受限颈角和四足踏步转身；240 秒蒙皮/接地、四方向及趴姿点击检查通过，浏览器实测回应。菠萝屋九张脱敏截图覆盖全屋、六房间和音箱/马桶交互，见 docs/house-gallery-review/。构建与资源检查通过，仍为待审预览。

- 暹罗猫脸部修正：脸、眼睛、嘴、下颌及胡须整体随头骨转动，混合权重仅保留在颈部；移动颈根枢轴并限制转头幅度。8319 个面部顶点、799 对距离与颈部伸展检查、240 秒步态及近景/手机视口/客厅点击实测通过。构建和资源检查通过，证据见 docs/cat-review/face-*，仍为待审预览。

- 音箱入口改为“听音乐”，播放器改为“我的音乐”，作为个人网页背景音乐；三首曲目保留，手动播放、收起播放器与切换房间可继续播放。浏览器实际播放及返回全屋、客厅验证通过，证据见 `docs/house-device-review/my-music/`；构建、资源和差异检查通过，仍为本地待审预览。

- 图书馆近景后墙缺口：上层墙片原归卧室，切换图书馆时被隐藏。Blender v6 导出同曲面厚壁补片，仅图书馆近景显示；全屋和卧室沿用原有墙体。原 64 个网格几何及标签一致，新增墙片表面闭合，模型与来源哈希已更新。1440×900、390×844 浏览器截图及 6 项交互检查通过，构建、资源和差异检查通过；见 docs/house-review/library-wall-review.md，仍为待审预览，未发布。

- 专业技能移除“工程交付”项，仅保留 Agent 工程和 AI 全栈开发；浏览器、构建和资源检查通过。

- AI 全栈卡新增“后端开发”一行及 Java / Go 标签，明确展示 Java、Go、Python、Node.js；浏览器确认新文案，构建与资源检查通过。

- 简历突出 Agent 工程与 AI 全栈：技能改为两块成果卡，前置 30+ 问题闭环、约 80% 人工复核一致率及 Smart Video 上线 20 天 1.2W+ PV；分别展示编排、恢复、验收与异步任务、业务集成、独立产品实现。工程交付收为辅助信息，删除技能、项目、学历的泛化说明。概览同步强化岗位与实际贡献；原“查看”链接不恢复。1440×900、390×844 浏览器无横向溢出、控制台无错误，构建与资源检查通过；截图见 `docs/house-profile-review/skill-focus/`。仍为本地待审预览。

- 暹罗猫点击回应：原动作仅轻微歪头且等待收步，改为即时“喵～”气泡、朝镜头方向偏头及摆尾；全屋点击猫同时进入客厅并回应。1440×900、390×844 浏览器验证点击、重复点击、拖动不误触、气泡消退、简历打开时暂停通过；脚掌 IK 采样误差小于 0.000001。记录见 `docs/house-pet-response-review/`；构建、资源和差异检查通过。保留并行修改，隔离提交，仅待审预览。

- 简历各部分统一去掉标题上方的编号与房间说明，概览移除“继续探索菠萝屋”提示；保留标题、日期和履历正文。浏览器确认全部五个板块标题，构建与资源检查通过。

- 简历关闭按钮改为“×”，移除“回小屋”文字；浏览器确认显示和关闭正常，构建与资源检查通过。

- 关闭控件统一为海绵黄圆润按钮，配救生圈、立体边缘及按压反馈；简历、日记、证书使用对应动作文案，音乐和项目清理沿用同一主题。新增公共样式 house-controls.css，仅接入独立预览。1440×900、390×844 浏览器视口 10 项通过，关闭、焦点、Esc、音乐退出、项目打扫均正常，见 docs/house-profile-review/cute-close-results.json 与 cute-close-screenshots/；构建及资源检查通过，未发布。

- 专业技能移除顶部“01 / 图书馆 · 专业技能书”说明及技能卡片的“查看”链接，保留技能正文与技术标签；浏览器、构建和资源检查通过，仍为待审预览。

- 概览信息将“电子信息背景”改为“华中科技大学电子信息硕士”；浏览器确认新文案，构建与资源检查通过，仍为待审预览。

- 螺旋楼梯移出房间配置，取消独立标签与近景，保留楼梯模型及卧室、天台的相关显示。浏览器确认剩余六个房间入口、屋顶进入与返回正常；`npm run build`、`npm run check`、`git diff --check` 通过，仍为待审预览。

- 图书馆仅展示专业技能：移除五个项目书目牌、配置与点击入口，保留装饰书架和黄色技能书；1280×720 浏览器确认无项目牌、点击技能书及关闭返回通过。截图见 `docs/house-profile-review/library-skills-only/desktop-library.jpg`；构建、资源与差异检查通过，未发布。

- 客厅：圆桌改为独立生成的黄色音箱，沙发笔记本点击打开基本信息；三首音乐可选曲、暂停、调音量、拖进度和收起继续播放，默认静音。自有 GPU 与 Blender 来源见 `docs/house-device-review/`；1440×900、390×844 浏览器验证及构建、资源、哈希检查通过。仅待审预览；本任务隔离提交，保留并行修改，不替换首页或发布。

- 卧室：闹钟点击教育经历，床上日记改为一页四项工作清单；每项仅保留做了什么和成果，删除目录、翻页及技术长文。1440×900、390×844 浏览器视口验证 7 项通过，见 `docs/house-profile-review/simple-diary-results.json` 与 `simple-diary-screenshots/`。关闭和 Esc 保持卧室；构建、资源检查通过，仅本地待审预览。

- 图书馆前侧新增醒目的黄色专业技能书，点击书本打开技能；移除客厅航海图入口，保留原项目书籍。桌面 1280×720、手机视口 390×844 验证通过，记录见 `docs/house-profile-review/skills-book-results.json` 和 `skills-book-screenshots/`；仍为独立预览。
- 马桶项目：“极品项目”按钮增加黄色高亮与“👆 点击查看”；一键打扫独立于项目集，清除所有马桶弹出物。项目集仅收起，保留物品与所选分类；Esc 逐层返回。实际桌面 1280×720、手机视口 390×844 验证通过，记录见 `docs/house-toilet-review/cleanup-results.json`。
- 客厅小蜗替换为参考图暹罗猫：否决坐姿小跳方案后，重新用自有 L20 / Hunyuan3D 生成四足站姿，17 骨骼驱动依次迈步、支撑脚固定、转弯减速及收步；保留歪头、摆尾与点击回应。240 秒真实蒙皮/脚掌测试及桌面、390×844 浏览器验证通过，记录见 `docs/cat-review/`；当前为待审预览。
- 新增 `pineapple-house.html`，与现有构建、资源检查接通；旧主页源码保留。
- Blender 完成厚壁曲面剖壳、三层分房、门洞、楼板、螺旋楼梯、挑高图书馆、滑梯与叶冠。
- 自有 GPU 逐件生成 12 件家具候选；不合格薄片网格经过 Blender 重新拓扑、连接与 UV 修整。原件、源图、任务、哈希和修整预览见 `docs/house-review/`。
- 独立房屋控制器提供 `focusRoom(roomId)`、`resetView()`；真实模型进度、资源失败名称及重试、WebGL 明确提示。
- 新预览移除旧底栏、设备与留言弹层。默认全屋，七个近景隐藏遮挡；旋转、缩放、返回与 Esc 已接通。
- 首屏取消常驻侧栏与六项导航，画布占满视口；履历内容、导航、下载与联系入口放入点击后才打开的阅读界面。桌面居中弹层、手机全屏阅读，模型失败仍可使用。
- 首屏恢复原 gsyIsWatchingU 图形标志与手写名称；按钮采用海绵黄、木质边框、救生圈和舷窗细节，覆盖简历、房间、返回、证书及重试控件。最新样式截图见 `docs/house-profile-review/nautical-screenshots/`。
- 使用提供的手写字体展示履历姓名与标题；储藏室挂载 11 张真实证书，支持原图、转正显示、放大滚动；保留原件与 SHA-256，未改写证书内容。
- 履历控制器独立于旧 `room.js`，提供 `openResume(sectionId)`、`closeResume()`；取消房间转场自动打开内容。航海图、实习日志、项目书籍、求学纪念、奖杯和奖状分别打开技能、实习、项目、学历、荣誉与真实原图。关闭保持房间，Esc 按证书、简历、全屋依次返回，刷新回到干净首屏。物品与展示件位置纳入房间配置。
- 修正二层粉色/绿色楼板与隔墙的共用边界；二、三层门后壳体按房间边界拆分，避免近景误隐藏墙面，隔墙后沿贴合曲面外壳。螺旋楼梯改为逐层垂直轴，使用落脚平台连接楼板与屋顶。Blender 源工程保留为 `tmp/house-production/structure-v5.blend`，修整版本与哈希纳入结构清单。
- 1440×900、390×844 浏览器实测 24 项通过，包括直接点击书目签、墙面证书、旋转缩放、房间阅读、关闭、Esc、刷新、尺寸变化、加载失败重试及 WebGL 故障。最新截图与结果见 `docs/house-profile-review/explore-results.json` 和 `explore-screenshots/`。三个产品演示入口返回 200；Skill Dock 入口返回 410，本页展示说明与示意图。
- 本轮验收与截图见 `docs/house-review/verification.md`；提交仅包含此任务，既有未提交修改保留。

## 本轮交接

- 马桶项目：六个项目分类与旧预览入口保留；本轮只更新点击提示及独立打扫，构建、资源与差异检查通过。待视觉确认后再替换首页、推送发布。
- 暹罗猫：已重做四足行走，旧坐姿小跳方案标记为已否决；动作与浏览器测试、构建、资源检查通过。下一步用户核对步态，实机触屏/性能待验证；保留并行修改，提交只包含本任务。
- 下一步：用户核对履历小屋预览及截图，批准后替换正式首页、推送并验证线上。当前仅提交本地预览，不发布。
- 边界：当前是待审预览；不把构建或自动检查当作视觉批准。手机为 390×844 浏览器视口模拟，双指手势与实机性能仍需实机复核。
- 已发现并修复：原始家具薄片/融合、GLB 导出颜色丢失、壳体遮挡、手机镜头比例、门前通道及近景裁切。
- 本轮验证：实际桌面 1280×720、窄屏 478×750 共 34 项通过，包含房间仅探索、物品阅读、证书原图、关闭、Esc、刷新、旋转缩放、加载失败重试及 WebGL 故障；证据见 `docs/house-profile-review/object-results.json` 和 `object-screenshots/`。视口覆盖接口未生效，不把本轮截图标成 1440×900 / 390×844；双指与实机性能待复核。
- 验证结果：`npm run build`、`npm run check`、`git diff --check` 通过；原个人主页的未提交修改没有并入本任务提交。

## 历史完成项

- **已将互动小屋从「规整几何体拼出的塑料玩具」改造为「保留真实三维空间与全部交互的手绘动画布景」（回应「很假，很像积木，没有手工漫画的真实感」）**。用户硬约束：不接受「旧造型上调色/纹理/AO/描边」的替代完成、不接受参考截图裁贴图、不接受 Blender 渲染冒充页面截图、不伪造帧率与还原度数字。核心改动：
  - **轮廓重建（B/C 关，程序化 bpy 建模，源码入正式目录 `scripts/art/`，GPU 服务器 Blender 4.5.13 导出 GLB）**：红椅 v7（`red-armchair-v4.glb`）——高靠背纵向拉长 + 顶部真圆顶与横卷软包 + C 形侧翼前卷 + 中央内凹 + 卷出扶手 + 坐垫下陷/边缘鼓起/前缘卷边 + 8 段红白救生圈（固定种子低频形变），正面/三分之四/侧面单色哑光检查通过，不再被读作鼓包/桶形；绿沙发 v3（`green-couch-v3.glb`）——三根绿管长度/弯曲/端部各异 + 橙绑带贴合 + 蓝色软坐垫前伸/厚度/下陷明确（前缘朝主镜头），不再像标准工业管件/木质工作台；房间外壳 v3（`room-shell-v3.glb`）——连续墙面 + 绘制竖纹（竖纹由 JS 贴图绘制，仅墙裙/角柱/基脚线保留几何起伏），拱门洞与 arch-door-v2 精确配合无露缝；圆桌 v2 / 蜗牛 v2（`round-table-v2.glb` / `snail-v2.glb`，按 `snail_` 前缀分选择集导出）。每个 GLB 用 `tmp/glb-three.mjs` 真实加载验证落地/比例/朝向（`tmp/*-verify.txt`）。
  - **手绘贴图（程序化 canvas，非规则纹理）**：`wallTex` 连续浅蓝绿底 + 深浅不均蓝色竖纹（46 短纹 + 6 长程纹）替代等距板条；`floorTex` 浅暖斑驳去地砖格；`fabricTex` 大尺度色块铺色 + 交叉短弧涂抹 + 干刷（四轮迭代去除木纹/编织读感）；救生圈橡胶/绑带/木纹/屋顶/叶片/金属全部方向笔触版；`applyRoomMaterials` 按材质名映射重写，UV 不跳网格，sRGB 语义正确。
  - **渲染（D 关）**：`toon()` 从「返回 MeshStandardMaterial」改为真 `MeshToonMaterial` + 12 档柔和 gradientMap；`OutlinePass` 收集全部家具/墙面/设备到 `selectedObjects`（edgeGlow 0.15→0.06，常驻描边，非悬停高亮）；SSAO 收紧、Bloom 阈值 0.92、环境反射降、雾/气泡减少；主镜头俯角降低（桌面 0.5→0.42、手机 0.58→0.5）减弱俯视模型感；台灯移离红椅消除「椅面蜡烛」误读；9 个设备全切 toon 材质统一语言；白天/夜晚/多云同一美术体系。缓存版本 `?v=20261008-handpainted`。
  - **真实浏览器验收（E 关部分完成）**：无头 Chrome CDP 截图存 `tmp/final/`（桌面主/左右/椅/沙发/墙门/夜/多云 + 手机全景/旋转/内容层），内容层用真实事件协议（dock 点击 → `room:activate-request` → `activate-done` → `openOverlay`）验证打开；控制台无新增错误（仅本地留言 API CORS 属预期）；同镜头对比图 `docs/reform-2026-10-08/compare-main.png`（参考 02-living-room / 改造前 `tmp/baseline/` / 改造后）。改造记录 `docs/reform-handpainted-2026-10-08.md`。
- **已将互动小屋 3D 客厅从「圆角积木/塑料玩具」重建为参考《海绵宝宝》菠萝屋客厅的剖切小屋（主要 3D 复刻参考 `docs/refs/pineapple-house/10-sims-living-room.png`，造型配色参考 `02-living-room`、细节参考 `06-living-details`）**。任务要求「房间结构＋红椅＋绿沙发＋圆桌＋主光」一致风格优先、材质可区分、真实浏览器验收、视觉满意度由用户确认。核心改动：
  - **资产（在 3d-gen GPU 服务器用 Blender 4.5.13 bpy 脚本程序化建模并导出 GLB，非大量基础几何体直接拼装）**：`room-shell-v2.glb`（v4）——前墙开放、蓝绿竖纹板条墙（板条高 2.8、宽 0.232、缝 0.008、厚 0.16，按法线分 `wall_stripe / pine_exterior / wall_plank_edge` 材质槽）、后墙拱门洞（开口 x∈[-1.648,-0.68]、半圆拱顶 2.484，拱头板与门洞同圆无 Z-fight）、浅色方形地砖（5.2×4，材质 `floor_tile`）、橙色菠萝纹屋顶带 + 6 片交替叶冠、基脚线；`red-armchair-v3.glb`——靠背（底部与坐垫交叠 0.08、微后仰）、坐垫（顶面微凹）、卷管扶手 + 球头 + 支撑柱、红白 8 段救生圈（torus 顶点色、椭圆截面 1.06×1.018）、四腿穿过圈体落地、包边 torus；`green-couch-v2.glb`——3 根横管靠背（沿 X 横放，修正了圆柱轴向 bug）+ 端帽、橙色 U 形绑带 ×3（bezier_tube 从顶绕过坐垫到近地，r 0.028，贴合不穿模）+ 方形小扣、蓝色软包坐垫 ×2 + 中缝 + 前缘卷边、侧块、木腿 0.36 落地 + 底横梁；`arch-door-v2.glb`——拱形门叶（0.8×2.484×0.06，修正了把深度当高度的轴 bug）、门框立柱、4 条木横板条、2 条蓝金属箍、圆形舷窗环 + 玻璃 + 6 铆钉 + 门把手，与世界坐标已对齐（加载 pos=[0,0,0] rotY=0 即正对门洞）。所有 GLB 用 `tmp/glb-three.mjs`（THREE 权威加载）验证世界包围盒、落地 y≥0、朝向与材质槽。
  - **材质体系（`scripts/room3d.js`）**：新增 11 个程序化 canvas 贴图——竖纹板墙（21 条纹 + 板缝暗线 + 木纹颗粒 + 逐板明度差）、浅色方砖（5×4 格 + 缝线 + 色差 + 斑点 + 明暗梯度）、布料编织（红/绿/蓝三色 knit 交叉纹理）、救生圈白橡胶（与顶点色相乘）、橙色绑带肋纹橡胶、木纹（方向纹理 + 节疤）、板条侧边深木纹、屋顶菠萝纹、叶片、金属。`applyRoomMaterials` 按 GLB 材质名挂贴图并设 roughness（布料 0.88-0.9 / 绿管 0.6 / 橡胶 0.55 / 木 0.72 / 瓷砖 0.9 / 金属 0.42）；墙板按世界坐标重投影 UV（remapWallUV）、地砖重投影 UV（remapFloorUV），板条条纹跨板连续；门舷窗玻璃挂水下视野贴图（半透明）。旧黄色弧形墙（旧 room-shell.glb）已移除，前墙开放、主视角可见门/椅/沙发/桌/墙。
  - **灯光与后处理**：hemi 0.45 / 主光 1.6（冷白）方向 (−3.2,4.8,2.6) / fill 0.55；环境反射 0.16；exposure 1.0（去泛白）；SSAO kernel 0.12 / maxDistance 0.45（椅垫缝、沙发底、桌腿、墙角接触阴影）；Bloom 降为 0.08；雾 (8.5,14) 适配房间尺度；`applyAmbient` 昼夜数值同步重调（day hemi 0.45/key 1.6/fill 0.55，night 0.3/0.5/0.25，灯串与台灯发光随灯光开关）。
  - **布局重排**（新户型 x±2.6、z[-2.3,1.7]）：红椅 (−1.15,−1.35)、绿沙发 (1.15,−1.75)、圆桌 (0.05,−1.05)、小蜗 (−1.75,−0.55)；主舷窗贴后墙 (1.15,1.65,−2.15)、装饰舷窗贴左墙 (−2.55,1.7,−0.6)、开关移到门右侧、电视柜/显示器到右后墙、MacBook 上圆桌、iPad 贴左墙、手机上钢琴、灯串/Marshall/钢琴/植物/相框/海螺/气泡按新房型重排；相机 TARGET (0,1.3,−0.3)、desktop radius 5.4、移动端 6.4，FOCUS_YAW/RADIUS 表按新位置重估。交互全部保留：拖拽/缩放/拾取/聚焦/底栏 dock/弹层/键盘/昼夜天气灯光/移动端/加载与失败兜底。
- 已重制站点图标，解决「favicon 太暗、一眼看上去一片黑」的问题：保留黑发红衣少年侧影形象，背景由深暗青灰换成与页面主题一致的明亮奶油米色（`#f5efe3` 系），红衣提亮、黑发描清、外圈加暖白微光，缩小到 16px 仍可辨识为红衣少年而非暗色团块。新增源图 `assets/gsy-icon-source-bright.png`（2048×2048，可复现），用 `scripts/make-icon.py` 重新生成 `favicon.ico`（16/32/48 三帧、PNG 压缩、32bpp）与 `assets/gsy-icon-rounded-avatar.png`（512 圆角）；`src/index.html` 的 `icon`/`shortcut icon`/`apple-touch-icon` 与 `src/playground.html` 的 favicon 缓存版本号统一更新为 `20261008-bright`；「关于我」卡片头像同源自动更新。`npm run build`/`check` 通过，ICO 三帧 + 512 圆角实图目检合格。
- 已按用户提供的 8 张《海绵宝宝菠萝屋》参考图（存 `docs/refs/pineapple-house/`）把互动小屋从「写实浅色木屋」重做为**水下菠萝屋卡通风**：绿松石竖纹墙板、沙色地板（canvas 颗粒纹理）、橙色菠萝皮菱格穹顶（倒扣半球 BackSide）、穹顶绿叶冠；窗户改为蓝色铆钉圆形舷窗（窗外水下日/夜/多云 canvas 纹理）；新增红扶手椅坐救生圈、绿色圆管沙发叠橙色绑带、绿色圆地毯配黄心、小蜗 Q 版摆件、海草植物；MeshToonMaterial 平涂；水下蓝雾 + 36 个上升气泡。保留全部交互骨架（10 个 pickable ID/位置/FOCUS/事件桥/氛围联动不变）。缓存版本 `20261006-pineapple`。
- gsy013 Forge3D：菠萝壳 environment 任务（job `025034a4`，30K 三角 4MB GLB）已 review，转台预览良好，已下载 `assets/models/pineapple-shell.glb`（暂未接入）；红扶手椅 prop 任务（job `7553169e`）仍在跑。

- 已修复 3D 小屋上线后用户反馈的两处布局问题：① 左上角 logo 被裁切——`.page-brand__symbol` 是 64×40 的 `overflow:hidden` 盒子，而 logo 图被写死 `width:78px`（1254×1254 正方形图 → 渲染成 78×78），底部 38px 被裁掉；改为 `height:40px; width:auto`，logo 完整显示。② 底部 dock 按钮与白色胶囊背景错位——胶囊是 `.object-dock::before`（居中、固定 860px 宽），而按钮栏 `.object-dock__scroll` 从屏幕左缘开始排，宽屏下左侧按钮落在胶囊外；改为把胶囊样式直接套在 `.object-dock__scroll` 上（`width:max-content; max-width:min(860px,100vw-24px); margin:0 auto`），胶囊随按钮内容居中，窄屏自动横滑。CDP 实测量：1904 宽视口下 logo 40×40 完整、10 个按钮全部落在居中胶囊内（x=632..1272，胶囊 616..1287）；500 宽移动端胶囊贴边、首项无裁切可横滑。`npm run build`/`check` 通过，room.css 缓存版本号 bump 为 `20261006-room-fix`。
- 已将互动小屋的房间渲染从纯 CSS 3D 升级为 **Three.js 实时 3D**（回应“质感太差/完全不是 3D”的反馈）：WebGLRenderer + PCF 软阴影 + ACES 色调映射 + RoomEnvironment 环境反射 IBL + 场景雾；PerspectiveCamera 轨道相机（拖拽旋转 ±1.25 rad、滚轮/双指缩放 2.7–7.2、方向键微调），点击物件 / dock 时相机平滑转镜头（420ms 阻尼，`prefers-reduced-motion` 直切）后打开近景；房间由真实 3D 体块构成（木纹地板、后墙/左墙、踢脚线、地毯、挂画、书架 + 彩色书、可拾取窗户 + 窗景画布纹理 + 窗帘、灯串 TubeGeometry + 发光灯泡 + 点光、台灯自发光 + 点光、书桌、显示器/MacBook/iPad/手机发光屏幕、Marshall 菱格网罩 + 金色旋钮、胡桃木钢琴 + 琴键黑键 + 谱架乐谱 + 琴凳、开关、垃圾桶 + 纸条、植物、小狗摆件、积木塔）；氛围联动改为 MutationObserver 监听 `data-scene-tone/weather/lights`：窗景换日/夜/多云纹理、主光/环境光/补光强度与色温、灯串与台灯发光随昼夜 + 开关联动；射线拾取悬停高亮（光标 + 浮动标签 + 轻微放大）、tap 判定（移动 ≤6px 才算点击）；WebGL 不可用时兜底为“点击直接打开近景”。新增 `scripts/room3d.js`，`scripts/build.mjs` 增加第二个 esbuild 打包入口（`assets/room3d.js`，iife），`scripts/room.js` 改为事件桥接（`room:activate-request / activate-done / scene-click / reset-view / request-close / room3d:ready`），`styles/room.css` 移除 CSS 房间几何、保留外壳/dock/弹层/加载/弹幕样式。已修 three r186 两个坑：`Timer` 需每帧先 `update()` 再 `getDelta()`；`setPointerCapture` 对部分指针会抛异常需 try/catch。镜头聚焦角由投影扫描校准（物件中心投影到画面中央），窄屏（aspect < 0.75）FOV 自动 42°→64° 让更多物件入画。
- 已将首页整体重做为「互动小屋」式主页（参考 Sharky's Room 形态，用户拍板：整体重做 + 温馨浅色）：纯 CSS 3D 房间（`preserve-3d` + 透视，无 Three.js），加载层带进度与「直接阅读作品」跳过；顶部覆盖式品牌头、底部参考站式物件 dock；房间可拖拽旋转（±48°）、滚轮/双指缩放（0.7–1.6×），点击物件转镜头后进入近景（busy 锁 380ms），ESC/背板点击关闭。物件 ↔ 内容映射：显示器→工程能力控制台（8 项能力单项展开 + 站内证据）、MacBook→独立产品（build 渲染 `<!-- @room-projects -->`）、iPad→实习经历（4 条 + 工程经历 2 卡）、手机→留言墙（线上 Worker + D1）、Marshall→音乐角落、钢琴→生活兴趣、窗户→关于我、灯光开关→氛围控制（白天/夜晚/多云 + 灯串，localStorage `gsy-room-ambient`）、垃圾桶→手写体纸条、全景→导览地图；房间空气渲染留言弹幕（`room:danmaku` 事件）。新增 `src/sections/room-stage.html`、`src/sections/room-overlays.html`、`styles/room.css`、`styles/room-content.css`、`scripts/room.js`、`scripts/room-guestbook.js`；`scripts/build.mjs` 新增 `@room-projects` 渲染；`scripts/check.mjs` 的 gallery 校验由 ≥2 放宽为 ≥1（旧版详情轮播已不在新首页使用，WIP 项目数据含 1 张截图的产品不再误报）。
- 已将专业技能区重构为「工程控制台」：左侧 8 个能力入口（Agent 工程：上下文与输出 / 工具调用与编排 / 可靠执行与治理 / 评测与观测；AI 全栈：端到端产品交付 / 服务与数据建模 / 实时与异步系统 / 架构与持续交付），右侧展示当前能力的工程问题、解决方法、技术栈与站内证据；安全、成本、Prompt、RAG、沙箱等知识点归入对应详情。延续黑白工业风，Agent 蓝 / 全栈橙信号色，扫描线、连接脉冲与内容切换克制动效；原生 `<details>/<summary>` 保证无 JS 可读，脚本增强为单项展开、状态同步与动效；手机端单列手风琴、桌面端能力导航加详情面板；支持键盘、焦点样式与 `prefers-reduced-motion`。
- 已为实习成果增加稳定锚点（`#experience-a1` Agent Harness、`#experience-a2` 团队提效工具、`#experience-a3` 平台稳定性专项、`#experience-a4` Smart Video）与工程经历卡片锚点（`#case-agent-harness`、`#case-edu-platform`）；项目轮播项新增 `data-project-id`；新增内部事件 `portfolio:select-project`，技能证据链接可切换到 Coffee Research / Algorithm Lab / Horizon Docs / CLI List / Skill Dock 并暂停自动轮播供访客阅读；无 JS 时证据链接退化为跳转「实习经历」或「独立产品」；保留 `SKILL_DOCUMENT_LINKS` 作为可选次级实践说明（站内证据始终优先）。技能资源缓存版本更新为 `20260927-console`。
- 已纠正 CLI List 的主页产品定位：它是下载安装包后可直接双击打开的独立 Windows 应用，不再把资源管理器右键入口作为核心形态；简介改为“独立应用—集中管理—高频直达”，详情图替换为应用本体与命令管理界面，继续明确“仅展示 · 不开放下载”。
- 已修复「走路时手部动作不自然」的根因（在资产层面证实）：直接解码 `red-sweater-boy-hero-v2.glb` 的后备动画通道发现，原先优选的 `walk_formal_loop` 上臂整周期只转 **2.6°**（同一条片段里小腿却转 80°，是典型「手插兜」僵直走姿）；备用的 `walk_loop` 上臂 **32.4°**、小臂 27.2°、手腕 12.9°，才是正常摆臂。把 `clipMap.walk` 与 NPC 走路片段的优先级改为 `walk_loop` 优先。真实时钟下复测关节幅度：`upperarm_l` X 由约 0.3°（近乎冻结）提升到 **55.5°**、Z 44.7°，`lowerarm_l` X 28.8°，`hand_l` Y 20.9°，左右臂对称（`upperarm_r` X 54.1°、`hand_r` Y 21.1°），侧视连拍可见手臂前后摆动与屈肘。
- 已修复「鼠标点击有时不响应」：原先点击白名单 `interactiveModes` 只列 `idle/lit/glow/perch/arrived`，角色处于 `follow`/`approach`/`descend` 时点击被整段吞掉（`descend` 漏在白名单外尤其明显）。补齐白名单并新增 `lockedModes`（攀爬/拉绳/下梯/猫道）——过场中仍让光束跟随点击给出反馈，但不改目的地。CDP 真实鼠标事件验收：点梯子 `idle→approach`（`kind:"ladder"`）、点绳子 `kind:"rope"`、点空地 `kind:"beam"`，`applied` 均为 `true`；画布 5×4 网格 **20/20 全部命中**，无死区。
- 已修复下梯时腿脚不自然与穿模：`topEase` 下行方向写反（应为 `1 - step/easeSpan`）、`descendLead` 需为**负**（`rungForStep` 内部已含方向，下行 step 越大世界高度越低）、`climbBodyY` 去掉顶部往猫道高度插值（下行会把它当起点用，导致肩高于梯顶、手够不到任何横杆），并在 `poseRig` 的 `solve()` 内加"可达球钳制"作为不穿模兜底。下行 IK 复测：手残差 15–36mm、需求距离/肢长 0.70–1.34×，脚残差 15–29mm；侧后 3/4 视角连拍确认双手抓杆、屈肘、屈膝、一脚踩杆一脚抬起，无穿模。
- 已把调试接口补齐供无头验收（全部在 `?debug` 门控内，正式页面不生效）：`snapshot()`、`jointAngles()`（骨骼在父骨局部系下的欧拉角，用于判断"手在摆"还是"被身体带着平移"）、`actionState()`（只有 `running:true` 的动画才真的参与混合）、`clipTracks(name)`（轨道幅度，幅度≈0 即关节不动）、`__hitTest()` / `__hotspots()`（命中管线与判定体屏幕投影）、`elapsed()`（手动推进时间，无头下 `document.hidden` 会冻结 `THREE.Timer`）。
- 已修复 `playCharacterAction` 只 `fadeOut` 不 `stop` 的问题：淡出后未使用的 action 仍长期处于播放态，改为在淡出时长结束后 `stop()`，确保同一时刻只有一段动画真正参与混合。
- 已将首屏「神秘的人」指引改为「发现式」叙事：移除“可以点的三个地方 / 梯子口·他会爬上猫道 / ① 点击画面 ② 点击三次”等直白图例与操作提示，开场画面零操作说明；新增 `signal-field__discovery` 邻近提示（`updateDiscoveryHint`），光束扫到梯子口附近才浮现“这里好像有梯子……”，扫到绳子下方浮现“绳子下面好像藏着什么……”，离开该区域或角色进入攀爬/拉绳过程提示自然淡出；chapter 文案改为「他在暗处，等一束光」，idle 旁白改为「他站在暗处，等一束光找到他」。`npm run build` / `npm run check` 通过，浏览器实渲染验证：初始状态无任何指引文字，点击梯子/绳子后对应发现提示浮现。
- 已把「爬上猫道」从简单平移改成真正的骨骼动画：删掉原来的 lerp + 正弦抖动，新建两骨解析 IK（余弦定理定中间关节 + `aimBoneAt` 逐节对准，即 `solveTwoBone` / `poseRig`），每帧把两手两脚钉到具体横杆上。梯子按真实比例重做（横杆间距 0.062 ≈ 0.19 倍身高、12 级、攀爬高度 0.73 ≈ 2.2 倍身高、梯宽 0.14 ≈ 0.43 倍身高，原先 0.28 宽相当于身高 86%）；一级动作拆成「支撑 55% + 摆动 45%」，手比脚领先 `handLead` 级并早半个周期出手，左右各差半级形成交替；躯干前倾抬头、盆骨下沉由 `crouchWorld` 控制。实测踩过的三个坑：① 下蹲会把肩膀一起带低，手的目标点因此超出臂长（实测需求距离达臂长 1.56 倍），改为按蹲后肩高反推 `handLead` 并向下取整；② 左右手偏移必须按骨骼实际朝向取，写死 ± 会让手横跨身体去够横杆；③ 翻上猫道那 1.2 步 IK 要按 `topEase` 平滑淡出（`poseRig` 的 `blend`），否则人已站上平台、手还挂在横杆上。实测结果：贴在梯子上的 28 帧里，手落在横杆半级内的比例 96.4% / 92.9%、脚 100% / 100%，手/脚与实际目标点的残余偏差均值 0.015–0.031（世界单位，人物高 0.338，即身高的 4–9%），目标点需求距离全部回落到肢长以内。拉绳同样接进 IK：双手握绳把、双脚钉地，绳长由 2.46 改为 2.72 让绳把落在胸口高度（原来绳把比头顶还高 0.16，根本抓不到），下拉行程收到 0.05 以内，身体后仰配合下蹲。
- 已解决「互动点不明显、要靠文字提示才知道能点」的问题：梯子与绳子加了同色系微光材质（`ladderGlowMaterial` / `ropeGlowMaterial` / `ropeMaterial`，随悬停与空闲时长呼吸），脚下加「呼吸环 + 两圈交错外扩涟漪 + 一道竖直光柱」（`createBeacon`），鼠标划到装置上光标变手型并同步提亮（`updateHover` / `setHover` → `visual.dataset.hover`，CSS `cursor: pointer`）；最关键的一处是**点击判定体**——梯子和绳子本体只有几厘米粗，原网格直接做射线检测在 160 点网格扫描里梯子只命中 1 次、绳子 8 次，现在罩一层 `colorWrite:false` 的不可见盒子（`createPickVolume`）并把地面兜底半径由 0.68 放宽到 0.85。同时新增 `?debug` 门控的调试接口（`visual.__scene`）供无头验收读取骨骼落点，正式页面不受影响。验证：桌面 1440×900 与移动端 390×844 均 `rig = two-bone-ik`、无横向溢出、无控制台报错，梯子链路 approach→climb→perch、拉绳链路 approach→pull→glow 均走通。

- 已为首屏"神秘的人"新增两套可交互装置，点击落点决定人物行为：**左侧梯子 + 猫道**（点梯子口会被射线识别为攀爬区，他走过去后顺着 1.56 高的梯子爬上去，站在 0.42 高的猫道上，新增 `approach → climb → perch` 三态，追光会跟着他升高）；**右侧绳索 + 卷帘**（点绳子区域他走过去，做三次发力把墙上的九片卷帘拉起，`shutterProgress` 驱动百叶上滑、发光面板与暖色点光源渐亮，新增 `approach → pull → glow` 三态）；其它位置仍是原来的"走向光"。点击判定改用独立于鼠标视差的拾取相机做射线投射（`pickCamera`），并同时接受梯子踏杆、卷帘面板、绳索本体等网格的直接命中，热区半径 0.68；地面光斑钳制放开到 z∈[-2.3,1.55] 以覆盖靠墙装置。人物在猫道上时点空地会先 `descend` 再继续跟随。HUD 新增"可以点的三个地方"图例与 8 个新剧情态文案。
- 已将首屏"神秘的人"互动从"躲避光"改为"跟随光"：鼠标悬停不再牵引光束，改为点击画面任意位置定位光束（对地面做射线投射，落点限制在可行走范围内）；人物听到光的位移后转身走过去，抵达后站在光里（新增 `follow` / `lit` 两个剧情态），被光照亮时灯光、辉光、轮廓光、雾与人物反射同步增强。保留三次点击后道路分岔与人群分流的结局，结局抵达后再次点击可重新触发跟随；文案与 HUD 同步更新为"点击画面，移动光束 / 他转过身，朝光走过去 / 他站在光里"。`npm run build`、`npm run check` 通过，Chrome 无头实渲染验收：桌面端 1440×900 三次点击计数 0→3、第 3 次点击进入 `resolve → depart`、光束随点击在左右两侧移动且人物走到光里、390×844 触屏 tap 同样走通、控制台无报错、无横向溢出。
- 已修复留言弹幕"发送后看不见/不明显"的问题：弹幕层 `.hero__danmaku` 从 z-index 1 提升到 3（原被 `.hero::after` 左侧 0.96 不透明暗幕与 `.hero__visual` 的 3D 房间 canvas 双重盖住，可见窗口只剩中间一条缝）；新发送的留言改为通过负 delay 直接落在屏幕右侧可见区并附加 `is-fresh` 高亮样式（白字、蓝边光晕、光环脉冲约 3.6 秒）；新增发送时空闲车道避让（`resolveFreeLane`）与弹幕数量上限 42 条；初始弹幕 delay 增加 7s 基准偏移避免首屏空档；容器 mask 左侧渐隐从 5% 加宽到 14% 避让主文案，弹幕底色与文字不透明度略提升。
- 已将首屏互动场景改版为"神秘的人"：移除移动光束照亮真实产品的展台（项目选择按钮、项目卡片与 3D 产品碎片），只保留光束、人物、背景建模与互动；互动改为"移动光束靠近他会惊觉躲避，点击三次留下变化后道路分岔"。`npm run build`、`npm run check` 通过，Chrome 无头实渲染验收：桌面端与 390×844 移动端无横向溢出、控制台无报错、全剧情链路可走通。
- 已移除独立产品区轮播下方的项目大卡片画廊（`project-gallery`），以五项目概览轮播为准避免内容重复；CLI List 轮播入口改为"PRIVATE DEMO 不开放下载"标识，构建脚本同步清理 `@projects` 渲染逻辑。`npm run build`、`npm run check` 通过。
- 已将项目概览轮播的自动切换间隔缩短至 2.2 秒，并改为原位交叉淡入淡出，移除横向滑动。
- 已在独立产品区新增五项目概览轮播，统一展示项目 icon、名称、简介、核心功能和技术栈，并支持自动播放、暂停、箭头、圆点、键盘与手机滑动切换。
- 已将首页真实项目展台升级为“核心功能 3D 装置”：移除 Hero 内项目截图，以证据双锚点、隔离判题流水线、实时协同编辑和上下文命令编排四套动态图形解释项目；远景 NPC 复用 22 骨骼角色并以独立 Mixer、步速和相位真实行走。
- 已将首页 Hero 重做为“拥抱变化”互动短片：访客移动光束可预览自然、工业、数据、未来四种世界，点击保留三块变化后触发旧路分岔、人群分流与少年主动走入新路；首次进入的剧情、进度和两步操作提示均改为直白中文。
- 已将首页 Hero 重构为互动光影叙事：接入 GPU 生成并绑定 22 根骨骼的红衣少年；角色缩至上一版的 1/4，访客移动光束会触发警觉、冲刺躲避、蹲伏与步行返回，手掌跟随前臂自然摆动，留言轨迹会影响无人操作时的灯光位置。
- 已将“离开队列的人”扩展为可互动短剧情：自动巡逻追光、点击扫描波、实时剧情状态、冲刺脚步残光、队列停步回望与监控失焦会共同响应访客操作。
- 已将首页互动短剧情改写为职业隐喻：变化信号触发角色离开重复队列，依次点亮“理解问题—编排 Agent—全栈交付”，完成后队列进入自动运转状态。
- 已将首页互动区扩展为五个真实产品的光照展台：统一使用 Coffee Research、Algorithm Lab、Horizon Docs、CLI List 与 Skill Dock 品牌名；Skill Dock 新增“扫描—比对—同步”专属 3D 装置，CLI List 保持私有演示边界。
- 已把站点图标换成侧脸人物插画（深灰蓝背景 + 黑发 + 红衣侧影）：新增 `scripts/make-icon.py` 作为可复现的图标生成脚本（源图 → `favicon.ico` 16/32/48 三帧 + `assets/gsy-icon-rounded-avatar.png` 512px 圆角 PNG），`src/index.html` 的 `icon` / `shortcut icon` / `apple-touch-icon` 全部切到新图，缓存版本号更新为 `20261001-avatar`。头部品牌 logo（`gsy-logo-transparent-mark.png` + 手写 wordmark）保持不变——新图在 50px 高度下会糊成暗色块。
- 已重制站点 favicon：保留 `gsy` 手写字标，增加 GPT 风格白色圆角方底与透明外缘，同时更新 Apple Touch Icon。
- 已将 `new-prj`《雾钟孤院》剧本升级至 1.1，补全小川因幸存者负罪被困在 23:47 心牢的前因、六阶段心理成长、空位终局及可二次解读的公平叙诡线索。
- 已完成 `new-prj`《雾钟孤院》完整游戏设计剧本，明确“点名少一人”的核心谜团、8 枚记忆余烬、3 座钟坛、3 个结局、正史情绪闭环与 Steam 五章扩写方案。
- 已将 `new-prj` 主角替换为原创雨衣男孩贴图 GLB 模型，保留瘦弱儿童比例与深色兜帽，并增强全局亮度、冷色光束和落地明暗层次。
- 已完成 `new-prj`《雾钟孤院》第二轮视觉重构：瘦长儿童角色、低位电影镜头、冷灰雾林至钟塔场景、环境提灯光与按需出现的弱化 HUD。
- 已整理字节秋招后端面经精简回答，覆盖并发定时任务、MySQL/Redis 锁、进程线程协程、数据库设计、HTTP 安全与千万级任务治理。
- 已补充其他 Windows 电脑通过 Tailscale SSH 外网连接 GPU 的配置、验证、安全边界与故障处理说明。
- 已在 Cloudflare APAC 区域创建线上 D1 `gsy-guestbook`，完成表结构迁移并部署 `gsy-guestbook-api` Worker；前端开发与正式环境均直接连接该线上服务。
- 已将主页收敛为首屏星海、专业能力树、实习经历、大型项目实践四个部分。
- 已取消独立留言板块，入口并入首屏操作按钮，留言弹幕直接经过首屏现有星海背景。
- 专业技能区已重构为“AI 全栈系统工程 → 产品与全栈工程 / Agent 应用工程 / 系统工程与交付 → 9 个能力分支”的三级树结构；每个分支同时呈现系统问题、工程方法与关键技术，不再引用公司或实习名称。
- 能力树支持通过 `scripts/skill-links.js` 配置各分支的飞书实践说明链接。
- 已将留言墙简化为星空弹幕、单一留言按钮和原生弹窗，留言提交成功后立即进入弹幕轨道。
- 已新增 Cloudflare Worker + 远程 D1 留言后端，支持留言直发、防刷限流、每日轮转 IP HMAC 和访客统计；不依赖 Turnstile，本地与正式页面共用线上数据源。
- 已将首屏重构为 Three.js “离开队列的人”叙事场景：暗红低多边形主角停在前景，远处人群沿亮带机械前行，工业建筑、灰蓝雾、探照灯与长影共同建立孤独感；悬浮时光束追随鼠标、队列减速、监控镜头和主角同步响应，并保留 Canvas 降级。
- 已基于个人简历重写首屏职业定位，明确“AI 全栈工程师 / Agent 应用”求职方向。
- 已将项目实践扩展为研发 Agent Harness、教育培训管理平台和在线算法实验室三项，补充规模、技术难点与结果数据。
- 已将项目实践升级为独立产品展示，接入论迹、Algorithm Lab 与 WriteHere 的真实界面截图、工程亮点和在线体验入口，不提供源码入口；研发 Agent Harness 与教育培训管理平台保留为工程经历项目。
- 已将 CLI List 作为第 4 个独立产品接入主页，使用新生成的真实界面截图展示 Windows 原生命令编排、Shell 上下文接入与本地状态持久化；明确标注私有演示，不提供源码或下载入口。
- 已将 CLI List 产品展示升级为双图轮播，接入资源管理器右键入口与命令工作台实拍图，支持箭头、圆点、键盘和移动端滑动切换；文案强化上下文接管、异构编排与效率闭环。
- 已增加 `src/data/projects.json` 项目清单与 Schema，构建时统一生成产品卡片，检查脚本验证必填字段、HTTPS 入口和本地截图资源。
- 已补充职业邮箱入口、页面分享元信息、canonical 与个人结构化数据，未在网页公开手机号。
- 已修复实习经历与项目实践锚点被固定导航遮挡的问题。
- 页面已按组件和板块拆分，根页面通过构建脚本生成。
- 已更新个人主页内容与交互式能力展示。
- 专业技能树已覆盖前端产品架构、服务与数据、实时与异步、模型应用、Agent Runtime、可靠 Harness、架构边界、质量观测与安全交付等全站核心能力。
- 已移除专业技能标题说明区，并收紧桌面端能力图高度与留白。
- 导航栏已改为连续银灰白笔刷纹理，下滑后背景透明度提高并保留文字清晰度。
- 除品牌手写字标外，全站文字已统一为中文无衬线字体，并规范字重与标题字距。
- 已添加站点图标及 Apple Touch 图标引用。
- 已收紧 favicon 留白，使标签页中的品牌标志更醒目。
- 已补充项目协作与交接约定。
- 已新增仿刷题平台布局的在线算法练习场，并从主页导航和项目卡片接入。
- 已接入 Monaco Editor，支持 JavaScript 代码补全、行号、括号匹配和快捷键运行。
- 已实现可见用例运行、隐藏用例提交、答案校验、错误反馈和 2 秒超时保护。
- 已实现代码草稿自动保存、代码重置、用例切换和桌面端面板拖拽。

- 已修复下梯穿模与攀爬不自然：下行时手原本停在脚上方约 5 级（`limbToRung` 的 `rungForStep` 已按方向翻转索引，`handStep` 又乘 `dir` 造成双重翻转），手臂被 IK 拉成上举贴梯、既穿模又不自然；改为下行只探到脚下约 1 级。上行 `handLead` 原为手臂最大可达范围（约 5 级），手一直举过头顶，改为 2 级；`applyClimbPose` 增加 `down` 参数，下行时低头看脚下。数值校验：旧下行手-脚竖直间距 0.31m（超出肢长→IK clamp/穿模），新下行 0.07m、新上行 0.14m。bump 缓存版本号 `?v=20260918-ladder-ik`，`npm run build`/`npm run check` 通过并发布公网（`b2d54fe`）。

## 下一步

1. 发布手绘动画布景改造（本次改动）到 GitHub Pages 并验证公网页面：模型/贴图/缓存版本生效、WebGL 加载、氛围切换与留言弹幕、正式访客计数（`git ls-remote` + 无头 Chrome 直连公网冒烟 + 公网截图）。
2. 交互回归收尾：键盘操作、氛围 localStorage 持久化、留言墙与弹幕、加载失败兜底已在本地页面确认无回归（详见本次验证结果）；发布后按公网再复核一轮。
3. 发布 Three.js 3D 版互动小屋并验证 GitHub Pages 公网页面的 WebGL 房间加载、物件近景、氛围切换、留言弹幕与正式访客计数（`git ls-remote` 与无头 Chrome 直连公网冒烟）。
2. ~~发布工程控制台并验证 GitHub Pages 公网页面的控制台布局、证据联动与缓存版本生效。~~ 已完成（提交 `6749de1` 已推送，公网页面包含 `?v=20260927-console` 并通过无头 Chrome 冒烟）。
3. 发布最新主页并验证 GitHub Pages 上的弹窗提交、弹幕动画和正式访客计数。
4. ~~按 `docs/plan-list.md` 新建算法训练平台仓库并完成 W0。~~ 已完成（见 `E:/prj-gsy/algorithm-lab`，服务器内网已部署跑通）。
5. 确认服务器规格、域名、DNS 和 GitHub OAuth 配置。
   - 服务器规格已确认（128 vCPU / 503GB / 8TB / 2×L20，K8s Pod）。
   - 域名、DNS、GitHub OAuth 仍缺失，已列为阻塞项（见 `algorithm-lab/docs/deployment.md`）。
6. 确认字节跳动内部项目名称、指标与教育平台域名是否适合公开展示，必要时做进一步脱敏。
7. 为 Agent Harness 与教育培训平台补充脱敏架构图、关键决策和可验证演示材料。
8. 补充 GitHub 与简历下载入口，并在发布后确认 GitHub Pages 页面、分享预览和站点图标显示正常。

## 已知问题

- 浏览器可能缓存旧站点图标，验证时需要强制刷新或清除站点缓存。
- 三个独立产品仍使用 Cloudflare Quick Tunnel 临时地址，服务重启后需更新 `src/data/projects.json`；正式发布应迁移到固定子域名。
- 根目录 `index.html` 是生成文件，修改源码后必须重新构建。
- 互动小屋的房间为 Three.js 实时 3D（透视/软阴影/PBR 材质），钢琴、Marshall 等物件的辨识度依赖整体画面（自动读图模型可能误读为柜子/打印机），聚焦近景视角可辨认琴键、网罩等细节；后续可按需继续细化模型。
- 留言后端接口（Cloudflare Worker）的来源白名单为 `https://gsyiswatchingu.github.io` 与 `http://127.0.0.1:5500`、`http://localhost:5500`；其它端口本地预览会被 CORS 拒绝，留言列表与弹幕静默降级为空（部署后公网页面不受影响）。
- `scripts/check.mjs` 的 gallery 校验已放宽为 ≥1：旧首页的详情轮播（要求 ≥2 张截图）不再渲染，WIP 中 research-workbench / algorithm-lab / skill-dock 各只有 1 张截图的产品不再误报；补充第二张真实截图后可恢复更严校验。
- 留言后端接口为线上 Cloudflare Worker，本地预览时如网络不可达，留言列表与弹幕静默降级为空。
- Monaco Editor 通过 CDN 加载；网络不可用时自动使用基础文本编辑器。
- 当前静态版本仅执行 JavaScript；多语言运行需要后端沙箱。

## 验证结果

- 2026-10-08（手绘动画布景改造）：`npm run build` / `npm run check` / `git diff --check` 通过；无头 Chrome CDP 真实浏览器验收（`tmp/final/` 11 张 + `tmp/baseline/` 10 张改造前基线）：① 桌面主/左/右视角——红扶手椅（高靠背/侧翼/救生圈）、蓝绿拼接沙发（绿管+橙绑带+蓝垫）、拱门木门+舷窗、圆桌/显示器/平板/钢琴/Marshall 等全部读作正确物件且同一卡通语言，墙面为浅蓝绿绘制竖纹（非板条围栏）；② 近景：红椅正面/三分之四/侧面轮廓成立，沙发绿管/绑带/蓝垫清晰；③ 夜晚/多云切换沿用同一 toon 体系；④ 手机 390×844 全景与旋转视角主要家具可辨认，内容层经真实 dock 点击事件协议打开（`room:activate-request → activate-done → openOverlay`，`layerHidden=false`）；⑤ 控制台仅留言 API CORS（本地端口不在线上白名单，属预期，公网不受影响）；⑥ 视觉结论来自自动读图模型逐张复读，满意度最终由用户确认。改造记录 `docs/reform-handpainted-2026-10-08.md`，同镜头对比 `docs/reform-2026-10-08/compare-main.png`。
- 2026-10-08（3D 客厅重建）：`npm run build` / `npm run check` 通过；无头 Chrome CDP 真实浏览器验收（1440×900 桌面 + 390×844 移动端，共 16 张截图存 `tmp/acc-*.png`）：① 桌面主视角 + 左/右旋 45° 两视角，蓝绿竖纹板墙、浅色方砖、拱门木门、圆形舷窗、红椅（红白救生圈）、绿管沙发（橙绑带）、圆桌、贝壳电话全部入画且多角度体积一致；② 家具近景（红椅/沙发/圆桌/拱门/舷窗）形体、接缝、纹理与 SSAO 接触阴影可见，家具全部落地无悬浮穿插；③ 氛围切换 night/cloudy/lights-off 生效（夜晚暗调、串灯随开关亮灭）；④ 弹层交互：点舷窗、点显示器均 `overlayOpen=true`，关闭事件正常；⑤ 移动端 390×844 构图完整、触摸拖拽旋转正常、tap 点舷窗 `overlayOpen=true`；⑥ 控制台共 4 条 LOG.ERROR 全部为留言 API CORS（`gsy-guestbook-api.gsyiswatchingu.workers.dev`，本地 8791 端口不在白名单，属已知预期，3D 场景零异常）；⑦ 场景统计 glbMeshes=378 / mapped=256 / named=259，hemi 0.45、key 1.6、exposure 1.0、env 0.16。参考并排对比图 3 张（`tmp/compare-sims-overview.png` 客厅主视角 / `compare-chair.png` 红椅 / `compare-door.png` 拱门舷窗，左参考右真实浏览器截图，PIL 合成——10-sims-living-room.png 实际为 WEBP 编码需用 PIL 读取）。验收脚本 `tmp/accept.mjs`、资产验证 `tmp/glb-three.mjs`、建模脚本 `tmp/build_house_v2.py / build_chair_v3.py / build_couch_v2.py / build_door_v2.py`（tmp 已在 .gitignore）。视觉满意度最终由用户确认。
- 2026-10-04（Three.js 3D 版）：`npm run build` / `npm run check` 通过；无头 Chrome CDP 实渲染验收（1440×900 与 390×844）：WebGL 场景就绪（35 个网格、PCF 阴影、ACES 色调映射、RoomEnvironment 环境反射、场景雾），9 个物件投影命中射线拾取全部 `hit` 一致且在视；场景点击与 dock 点击均走通「转镜头 → `room:activate-done` → 近景打开」（显示器→工程能力、MacBook→独立产品）；拖拽改 yaw（阻尼生效）、滚轮改 radius、方向键微调正常；氛围联动验证：`night+cloudy+lights off` 后 key 1.6→0.55、hemi 0.6→0.34、灯串发光 0，窗景切夜空纹理，复位正常；弹层 10 个设备齐全、工程控制台内容正确渲染；留言弹幕链路通过合成事件验证（air 容器收到弹幕），真实 API 白名单仅含 github.io 与 5500 端口（本地 81xx 端口验证会被 CORS 拒绝，属预期）；窄屏 FOV 64° 下移动端默认视角 6/9 物件入画；全流程控制台零 error/warning。验收脚本 `tmp/room3d-verify.mjs`、`tmp/room3d-probe.mjs`、`tmp/room3d-sweep.mjs`、`tmp/room3d-final.mjs`、`tmp/danmaku-debug.mjs`（tmp 已在 .gitignore）。
- 2026-10-04：互动小屋版首页完成构建检查与无头 Chrome CDP 实渲染验收（1440×900 与 390×844 设备模拟）：`npm run build` / `npm run check` 通过；桌面端房间加载到 `ready`、9 个物件全部可见、dock/顶栏齐全、无横向溢出；7 个近景弹层（显示器/MacBook/iPad/手机/Marshall/钢琴/窗户/灯光/垃圾桶）全部可打开；MacBook 产品卡由 `@room-projects` 渲染出 5 个项目（入口链接 4 个 + CLI List PRIVATE）；工程控制台 8 项能力单项展开、证据按钮 18 个可跳转到 iPad 对应经历并高亮；氛围切换白天/夜晚/关灯生效（计算样式验证天窗变深蓝、月亮显现、暗幕叠加）并写入 `localStorage`；留言 API 在线可用（3 条已过审留言 + 访客计数递增）；移动端 390px 全物件可见、dock 可见、无横向溢出；全部运行控制台零 error/warning。验收脚本 `tmp/room-verify.mjs`、`tmp/room-verify2.mjs`、`tmp/room-evidence.mjs`、`tmp/room-ambient-debug.mjs`（tmp 已在 .gitignore）。

- 2026-09-27：工程控制台已推送 `main`（`6749de1`）并发布公网。`git ls-remote origin main` 确认为 `6749de1`；`https://gsyiswatchingu.github.io/` 返回新版页面（`data-console` 结构、`skills.css/skills.js?v=20260927-console`、`projects.js?v=20260927-console-select`、`data-project-id`、实习/工程经历锚点齐全）；再用无头 Chrome 直连公网页面冒烟：8 个能力入口就绪、默认展开「工具调用与编排」、无横向溢出、评测详情证据链接切换到 Algorithm Lab 并暂停自动轮播、控制台零 error/warning。验收脚本 `tmp/check-live-console.mjs`。
- 2026-09-27：工程控制台完成无头 Chrome CDP 实渲染验收（1440×900 / 1280×720 / 390×844）：8 个能力入口齐全，默认展开「工具调用与编排」（唯一展开）且导航 `aria-current` 同步；桌面端导航与详情面板并排、切换单项展开无重叠无横向溢出；键盘方向键在导航内轮换并展开对应详情；Coffee Research / Algorithm Lab / Horizon Docs / CLI List / Skill Dock 五个项目证据全部切换正确（01–05 / 05）且暂停自动轮播（2.6 秒不前进）；实习与工程经历证据滚动到锚点并短暂高亮；`prefers-reduced-motion` 下交互正常；`--disable-javascript` 无 JS 降级可读（默认展开、证据锚点 href 完整、8 个次级实践说明默认隐藏）；控制台零 error/warning；`npm run build`、`npm run check`、`git diff --check` 通过。验收脚本 `tmp/verify-console.mjs`、`tmp/check-nojs.mjs`、`tmp/check-evidence.mjs`。
- 2026-09-15：本次改动已推送 `main`（`3f5a409` 两套装置、`88381cf` 资源缓存版本号 `20260915-mystery-props`）并发布到公网。`git ls-remote origin main` 确认为 `88381cf`；`https://gsyiswatchingu.github.io/` 约 40 秒后返回新页面（图例三行齐全、`?v=20260915-mystery-props`），`styles/hero.css`、`assets/galaxy.js`、`assets/characters/red-sweater-boy-hero-v2.glb` 均 200，线上 `galaxy.js` 与本地产物字节一致（688004 B）；再用无头 Chrome 直连公网页面冒烟：模型 `ready`、NPC `skeletal-walk`、点击梯子区域走完 `approach → climb → perch`、控制台无报错。注意本地 `origin/main` 跟踪引用会卡在旧值（`git status` 长期显示 ahead 61），以 `git ls-remote` 为准。
- 2026-09-15：首屏三套场景完成无头 Chrome CDP 实渲染验收（1440×900）。全画布 204 点扫描确认三类落点判定正确（`beam` 194 / `ladder` 5 / `rope` 5）；梯子链路 `approach → climb → perch`（终态"高处 · 他换了一个视角"）并截图确认人物站在猫道上；绳索链路 `approach → pull → glow`（终态"照亮 · 墙里的光漏了出来"）并截图确认卷帘拉起、暖光从开口漫出；下梯子链路 `perch → descend → lit` 走通；普通空地点击仍是 `follow → lit` 无回归；390×844 移动端 tap 正常、图例三行无重叠、无横向溢出；三轮运行控制台均无 warning/error；`npm run build`、`npm run check`、`git diff --check` 通过。验收脚本 `tmp/verify-hero-props.mjs`、`tmp/probe-descend.mjs`。
- 2026-09-15：首屏"点击定位光束 + 人物跟随"链路完成无头 Chrome CDP 实渲染验收（1440×900）：依次点击右下、左中、中下三点，`变化 00 → 01 → 02 → 03` 计数正确，剧情态依次 `idle → follow → lit → follow → resolve → depart`，`data-beam` 首次点击后固定为 `locked`，光束亮斑随点击在右侧与左侧之间移动、人物在每个落点走到光里；390×844 触屏 emulation 下 tap 两次同样从 `idle` 进入 `follow` 且计数递增；两次运行控制台无 warning/error，`document.scrollWidth` 等于视口宽度无横向溢出；`npm run build`、`npm run check` 通过。验收脚本 `tmp/verify-hero-beam.mjs`（tmp 已在 .gitignore）。
- 2026-09-15：留言弹幕可见性修复完成 Chrome CDP 实渲染验收（1600×1000）：注入 12 条普通弹幕 + 1 条刚发送弹幕后，新留言以 `is-fresh` 高亮样式立即出现在屏幕右侧可见区（负 delay 定位到视口 92% 处），普通弹幕在 3D 场景上方清晰可读；`document.elementsFromPoint` 确认修复前弹幕被 `galaxy-focus-canvas` 盖住、修复后位于其上；`npm run build`、`npm run check` 通过。
- 2026-09-14：项目概览轮播已验证 2.2 秒自动切换与原位交叉淡入淡出；桌面端与 390×844 手机端切换无横向位移、无页面溢出，控制台无警告或错误；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-14：五项目概览轮播通过桌面端与 390×844 手机端实渲染验收；五个 icon、项目名称、简介、核心功能和技术栈均正确展示，可切换至 Skill Dock `05 / 05`，页面无横向溢出且控制台无警告或错误；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-14：favicon 已改为 GPT 风格白色圆角方底，原始 `gsy` 字标保持不变；PNG 四角 Alpha 均为 0，ICO 包含 16、32、48、64、128、256px 六个 32 位图层，32px 粉色背景预览清晰；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-14：五个真实产品名称和 Skill Dock 交互已在桌面端与 390×844 手机端实渲染验收；Skill Dock 可切换至 `05 / 05`，五个按钮均可访问，页面无横向溢出且控制台无警告或错误；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-14：首页项目功能 3D 装置已在 1863×949 与 390×844 视口实渲染验收；Hero 无项目截图，默认装置、项目核心功能卡片和骨骼 NPC 均正常显示，生成页包含 `data-npcs="skeletal-walk"` 运行状态；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-14：真实项目光照展台已在 1863×949 与 390×844 视口验收；光束区域切换、四个项目按钮、线上链接同步、CLI List 页面内详情入口、骨骼人物躲光与响应式布局正常，浏览器控制台无警告或错误；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-13：“拥抱变化”互动短片已验证 `预览四种世界 → 保留三块变化 → 道路分岔 → 人群分流 → 少年主动选择` 完整链路；桌面端与 390×844 手机端无横向溢出、引导文案无重叠，骨骼动作加载正常，控制台无报错；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-12：首页互动光影 Hero 已完成 GPU 网格、材质、22 骨骼与 15 段动作管线；角色缩至上一版的 1/4，躲光切换为加速冲刺并清理行走、跑步中的腕骨旋转轨道，运行时状态已验证为 `alert → run → hide → walk → idle`；桌面端与 390×844 手机端验收通过，`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-13：首页互动短剧情已验证 `巡逻 → 被发现 → 奔向阴影 → 监控失焦 → 恢复巡逻` 全链路；点击扫描波、脚步残光、队列回望、警示灯与状态字幕正常，桌面端和 390×844 手机端布局无横向溢出，控制台无报错。
- 2026-09-13：首页职业剧情已验证 `变化 → 接住问题 → Agent 编排 → 全栈交付 → 自动运转 → 继续迭代` 全链路；三段 HUD 与 Three.js 工程节点同步点亮，桌面端和 390×844 手机端无横向溢出，控制台无报错。
- 2026-09-12：favicon 已移除粉色背景并改为透明外缘，生成 16、32、48、64、128、256px 六个图层；32px 实图确认字标与白色圆底清晰，四角 Alpha 均为 0；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-11：`new-prj/game-design-script.md` 升级至 1.1；主角被困原因、现实触发、四层错误叙事、五层误导、双重解读线索、六阶段成长与“停止逃跑—面对空位—回应名字”的玩家行动形成闭环；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-11：新增 `new-prj/game-design-script.md`，剧本与现有雨衣男孩、烛蛾、8 枚余烬、3 座钟坛、巡夜者、勇气值及三路线成长机制完成映射；第一版具备完整三结局，Steam 版具备五章扩写结构；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-11：`new-prj` 接入原创雨衣男孩 Meshy GLB 模型，运行时压缩为 41,924 个三角形与 1024×1024 贴图，替代程序化方块角色；桌面端、390×844 手机端正反面、光束和长影验收通过；Meshy 免费账号骨骼生成为 PRO，本版采用代码运动且未额外消耗积分；已生成 1.5.0 离线 ZIP；`main` 提交 `b5a2fa0` 已推送，公网页面与 GLB 返回 200 并完成实景渲染验收。
- 2026-09-11：`new-prj` 移除暂停菜单中的手动画质选择，改为按网络类型、下行速率、延迟和省流量模式自动匹配精细、均衡、流畅三档，并保留帧率降级；五类网络分支、浏览器暂停菜单、控制台、构建检查与公网 `v2.4` 资源均验证通过，已生成 1.4.0 离线 ZIP；`main` 提交 `c9b9757` 已部署成功。
- 2026-09-11：`new-prj` 重做入口、宿舍、钟塔三段冷灰方向光、雾中光束、落地亮区与人物长影，并将主角重塑为黄色雨衣瘦弱男孩；390×844 手机端和 1280×720 桌面端实景验收通过，父站 `npm run build`、`npm run check` 通过，已生成 1.3.0 离线 ZIP；`main` 提交 `e99d12a` 与远端一致，公网页面及 `v2.3` 资源返回 200。
- 2026-09-10：新增 `docs/interview-bytedance-backend-qa.md`，完成截图中 19 道问题的中文精简面试回答；`NC` 因缺少上下文保留澄清说明；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-09：专业技能区重构为根节点、三大能力域与九个工程分支的真实树状结构，移除技能区内的公司/实习表述；`npm run build`、`npm run check`、`git diff --check` 通过，桌面端与 390px 手机端视觉验收通过，页面无横向溢出，控制台无警告或错误。
- 2026-09-09：新增 `docs/gpu-external-ssh.md`，记录已验证的 Tailscale 节点、客户端安装、用户授权、连接验收和安全边界。
- 2026-09-09：完成论迹、Algorithm Lab 与 WriteHere 的个人主页集成；未添加源码入口；`npm run build`、`npm run check`、`git diff --check` 通过，桌面端与 390px 手机端产品区视觉验收通过。
- 2026-09-08：重写专业能力区，移除横向能力网络和悬浮详情，改为“AI 全栈 → 全栈开发 / Agent 工程 → 技术分支 → 共用工程底座”的纵向树结构；`npm run build`、`npm run check` 通过。
- 2026-09-08：修复留言弹窗进入浏览器顶层后鼠标不可见的问题；弹窗打开时使用系统鼠标，关闭后恢复自定义鼠标；`npm run build`、`npm run check` 通过。
- 2026-09-08：移除独立留言大板块与对应导航项，将留言按钮、弹窗和弹幕轨道并入首屏星海；`npm run build`、`npm run check` 通过。
- 2026-09-08：移除 Turnstile 与留言审核流程，完成“按钮 → 弹窗 → 线上 D1 → 星空弹幕”链路；线上留言直发与公开列表验证通过，测试弹幕已删除；`npm run build`、`npm run check` 与后端语法检查通过。
- 2026-09-08：线上 D1 `gsy-guestbook` 迁移成功，线上 Worker 健康检查、访客写入、统计和留言列表接口验证通过；本地 SQLite 已删除，联调记录已清零，localhost 只读线上数据且不计入正式访客统计。
- 2026-09-08：完成主页四部分结构调整与能力树飞书链接配置入口；`npm run build`、`npm run check` 通过。
- 2026-09-08：提高自定义鼠标外圈跟随速度；`npm run build`、`npm run check` 通过。
- 2026-09-08：优化首屏标题、岗位标签和简介排版，降低字号与字重并固定三行断句；`npm run build`、`npm run check` 通过，桌面端浏览器验收通过。
- 2026-09-08：完成算法训练平台 MVP 实施方案，明确架构、数据模型、API、判题、安全、工作包、部署和验收标准。
- 2026-09-08：基于简历完成岗位定位与项目内容改造；`npm run build`、`npm run check` 通过；桌面端首屏、项目区、经历锚点和结尾区域浏览器验收通过，控制台无警告或错误。
- 2026-09-06：Smart Video 技术标签新增 Monorepo；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-06：Smart Video 技术标签已统一为外部可理解的架构、技术栈与工程能力表达；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-06：Smart Video 已突出上线 20 天累计获得 `1.2W+ PV`，并补齐 5 项技术标签；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-06：Agent 工程技术难点标签已精简并调整为桌面端单行展示；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-06：平台稳定性专项文案已改为“专项治理—分级排期—多仓改动—修复上线”的工程闭环；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-06：Agent 工程难点标签已移除“上下文压缩”；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-06：中心定位更新为“全栈开发 × Agent 工程”，说明与标签收敛到专业能力层；桌面端中心标题、详情说明及四个标签截图确认正常；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-06：实习经历第 03 项完成平台稳定性专项重写，源码与生成页均已包含两大平台、六个仓库和 40+ 项问题的统一口径；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-06：首屏星轨装饰圆环已移除；按 1288×1058 视口完成截图确认；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-06：完成全站大字号与高占用留白收紧；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-06：团队研发提效工具完成内容重写与排序调整；`npm run build`、`npm run check` 通过。
- 2026-09-06：导航栏高度与品牌图标尺寸完成响应式收紧，并为导航样式增加缓存版本；本地 4173 服务确认返回 PC 端 50px、移动端 44px；`npm run build`、`npm run check` 通过。
- 2026-09-06：实习经历完成桌面端与 390px 移动端视觉检查，双列结构保持不变，卡片按内容自适应高度，技术标签换行和数字强调正常，无横向溢出；`npm run build`、`npm run check` 通过。
- 2026-09-04：全站字体、字重与中文标题字距已统一；`npm run build`、`npm run check` 通过。
- 2026-09-04：专业技能标题说明区已移除，能力图完成桌面端与手机端视觉检查；`npm run build`、`npm run check` 通过。
- 2026-09-04：导航栏笔刷纹理已取消重复平铺接缝，滚动透明态保持正常；`npm run build`、`npm run check` 通过。
- 2026-09-04：专业技能图完成桌面端和手机端视觉检查；`npm run build`、`npm run check` 通过。
- 2026-09-04：favicon 已包含 16、32、48、64、128、256px 图层；`npm run build`、`npm run check` 通过。
- 2026-09-03：`npm run check` 通过，HTML 结构、本地资源和脚本语法检查正常。
- 2026-09-07：在线算法练习场完成浏览器验收；正确解法通过 7 个用例，死循环在 2 秒后终止，浏览器控制台无警告或错误；`npm run build`、`npm run check` 通过。
- 2026-09-08：完成算法训练平台 MVP（`E:/prj-gsy/algorithm-lab`）并部署到 GPU 服务器内网（`192.168.88.122:3000`）。技术栈 Next.js 16 + Prisma 6 + PostgreSQL 14 + Redis + BullMQ + 原生沙箱；`pnpm typecheck` 全仓通过、23 个单元测试通过、`next build` 成功；端到端判题验证 ACCEPTED / TIME_LIMIT_EXCEEDED / COMPILE_ERROR 三态正确，隐藏用例零泄露。判题后端由 Judge0（Docker）改为原生沙箱——实测目标主机为 K8s Pod 缺 CAP_SYS_ADMIN 无法运行容器（详见 `algorithm-lab/docs/deployment.md`）。
- 2026-09-11：Three.js 首屏按低多边形工业叙事重构，完成暗红主角、远景队列、压迫性建筑、体积探照灯、真实投影、雾中尘埃与监控镜头；桌面端静态和悬浮态实景验收通过；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-11：CLI List 产品卡片已通过桌面端与 390×844 移动端实景验收，完整窗口截图、私有状态和响应式布局显示正常，控制台无警告或错误；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-11：CLI List 双图轮播已完成桌面端与 390×844 移动端验收，下一张、循环切换与键盘方向键状态同步，控制台无警告或错误；`npm run build`、`npm run check`、`git diff --check` 通过。
- 2026-09-18：下梯穿模与攀爬不自然修复完成；`npm run build`、`npm run check` 通过，提交 `b2d54fe` 推送 `main` 并发布公网；`git ls-remote origin main` 确认为 `b2d54fe`，`https://gsyiswatchingu.github.io/?t=...` 首次轮询即返回含 `?v=20260918-ladder-ik` 的页面。数值校验：旧下行手停在脚上方 5 级（0.31m，超出肢长→IK clamp/穿模），新下行探到脚下约 1 级（0.07m）、新上行约 2 级（0.14m），手脚均落回肢长可达范围。
