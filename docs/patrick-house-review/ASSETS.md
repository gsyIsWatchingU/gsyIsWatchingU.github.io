# 派大星石头屋 · 资产清单（ASSETS.md）

> 状态：**review（未 approved）**。本页所有新资产均为引擎内程序化重建，尚未经用户验收确认，任何人不得将其标记为 approved。
> 生成方式：本地程序化（Three.js 几何体 + Canvas 贴图），**非 GPU/Forge3D 生成**。GPU 管线（Tailscale gsy-gpu / ssh 3d-gen）因授权与超时被放弃（第二轮再次确认不可达：Tailscale SSH 需浏览器授权被跳过、ssh 3d-gen 超时），用户已确认接受本地程序化来源。不虚构任务号、资产或授权记录。

## 交付资产（built6 提交内容；built5→built6 仅含正脸朝向修复与缓存版本）

| 文件 | 说明 | 三角面数 / 纹理 | SHA-256 |
|---|---|---|---|
| `assets/patrick-house.js` | 页面 bundle（esbuild minify，构建产物） | — | `38A04903D148FD9D35924788A38C48A81D484BC941B9EED474E10659C6CA4BA0` |
| `patrick-house.html` | 根目录发布页（构建生成，缓存版本 `?v=20261012-built5`） | — | `4E8A1993BDEB1B471AF66A6ADCED60446B6BAA80C695A04B5BF1E4F686A22EAC` |
| `src/patrick-house.html` | 页面源码（占位文案已移除，缓存版本 built4→built5） | — | `16E9A07A95E0FF3F445EFE521D4C270890D711C6F5C68D4CAEB7B2DB06E25C22` |
| `scripts/patrick-build.js` | 程序化资产模块：紫褐岩石外壳/绿内壁/木地板/沙地/电视屏/派大星贴图（Canvas 绘制），全部家具与角色构建函数 | — | `E548D3DFB1FC2C51CCA7775410FA52A59E27D079D3AC0CDB96EAFAEBEC08BEDB` |
| `scripts/patrick-house.js` | 场景主脚本：拾取集合、遮挡过滤、招手状态机、互动隔离、自适应镜头（refitView/roomPose/wholePose）、标签夹取、错误面板、调试接口 | — | `7E0AD7D80F9C2D3316A5C1F3F102D46A2D711004F15D018DC6CD40EE03204E00` |
| `src/data/patrick-house.json` | 4 房间镜头配置（living 相机下沉至楼板下，避免楼板遮挡拾取） | — | `2A2465C90C69C558C09E4D11856A673CFC639589CAAF7541254984A8BA16D430` |

## 运行时几何统计（第二轮验收实测）

- `window.__patrickHouse.stat()`：网格/三角面数随构建变化，以验收时 `renderer.info` 为准（约 170+ meshes / 7 万+ triangles）。
- 贴图均为 Canvas 生成、512×512（rockTex / greenWallTex / woodTex / sandTex / tvScreenTex / patrickBodyTex / skinPlainTex / shortsTex），像素级无外部图片依赖。
- 原 14 个 Forge3D 薄片 GLB 已移入 `assets/models/patrick-house/archive/` 备份（14 个文件，合计约 62.9 MB），不再加载。

## 第二轮修复与修整记录

- **派大星五官不可见**：删除覆盖正脸的 `rim`（原为 bodyGeo 克隆放大 1.02/1.015/1.04 的不透明同形外壳，完全罩住带五官贴图的身体）。身体改为圆润旋转体（五角瓣幅度≈0.02，避免脊峰折脸），正面 +z 中央对应贴图 u=0.5，眼白/瞳孔/眉毛/嘴在 512×1024 贴图（229,104）/（281,104）附近，渲染像素聚类验证可见；`emissiveIntensity 0.22→0.32` 并增加正面柔和补光 frontFill(0xfff6ea, 0.5)。
- **体积比例**：身体轮廓改为「腰部（藏进短裤）→ 圆润腹部 → 胸部 → 颈部 → 细长圆润头部 → 冠」，新增颈段与头部（1.04–1.635），冠顶球 y1.66；短裤为 LatheGeometry 环带（腰带 0.335@0.38→鼓起裙摆 0.40@0.465→裤脚 0.38@0.49）+ 裤脚 hem + 腰带 torus，绿紫花 shortsTex；两条锥形圆润手臂（肩球 0.105 埋入躯干 → 上臂 0.06→0.045 → 肘 → 前臂 0.045→0.033 → 手 0.055），短腿 + 脚底接地。
- **招手连接**：肩部枢轴位于真实连接位置（side*0.4, 0.8, 0），肘为肩组子节点，抬手/摆动/回落全程肩-肘连续；连续点击不叠加（`startWave` 在非 idle 直接返回）；呼吸缩放与手臂同层级处理；待机轻摆。验收为真实鼠标点击（前端 8 帧 + 侧面 5 帧 + 状态机采样 idle→raise→wave→lower→idle），未调用 `startWave()` 替代点击。
- **窗口尺寸裁切**：`ResizeObserver` 改为每次有效尺寸变化调用 `refitView()`——取消进行中镜头补间（防旧终点覆盖）、重算当前视图 FOV（aspect<0.72→50°）、按可见主体包围盒重算镜头距离与目标点、保留用户旋转方向（超 maxPolar 时压制）；全屋 margin 1.42、外观 elev 0.25；地下房间相机钳制 y≤-0.2（楼板之下），避免楼板成为拾取遮挡物。验收：390×844 首载、1440×900→390×844→844×390→1440×900、剖面/外观、四房间近景、过渡中改尺寸均完整入画。
- **拾取与遮挡**：`lineOfSightBlocked` 改为递归收集可见遮挡网格（外壳/内壁/楼板可能是组合体），隐藏祖先节点物件不参与拾取（`visibleChain`），拖拽（位移>7px 或 >650ms）不误触；living 相机下沉后电视/落地灯/床头灯/吊扇均可真实点击。
- **互动隔离**：电视只替换屏幕贴图与屏幕 emissive（外壳不发光）；吊扇只旋转叶片组（吊杆/电机静止，驱动前后 rotation 对比验证）；两灯只改灯罩/bulb emissive 与 PointLight 强度（bedLight/floorLampOn 状态验证）；风向标保留缓慢旋转。
- **家具与材质（第二轮）**：冰箱浅蓝金属（0x9fc8dd 双门+门缝+银把手）、炉灶奶白箱体+黑玻璃灶台+4 火环+4 烤网+玻璃视窗炉门+金把手 4 旋钮、水槽石英台面+陶瓷盆+镀铬 L 龙头双把手+柜门竖纹、吊柜竖纹 4 门、床 4 腿+蓝垫紫被双层+带眼睛海星枕贴床+床头板竖纹、床头柜双抽屉、沙发圆角底座+后倾靠背+双坐垫+弧形扶手+4 腿、卧推凳+杠铃架/片/卡扣、茶几桌面+圆台支撑+汉堡小物；woodTex 增加 dir 参数（竖纹/横纹按件区分）；外壳保持圆润低矮穹顶。
- 证据目录：`docs/patrick-house-review/round2-diag/`（r2-* 修复前诊断、r2b-* 招手/特写、r2c-* 正脸微距与手臂 debug、r2d-* 尺寸变化、r2f-* 四区域+全屋+外观、r2g-* 招手连续帧正面/侧面）。

## built6 第三轮 · 正脸朝向修复（2026-10-13）

- **缺陷事实（公网 built5 复测确认）**：默认全屋全景、外观模式、地下客厅近景三个 +z 观察镜头均看不到派大星五官；五官实际渲染在角色局部 -z 侧（房屋侧）。逐像素聚类：外观模式 +z（yaw≈0）头部暗色五官像素 = 0、−z（yaw≈π）= 687；固定相机 R=4 探针：正面 minLum=104（无五官）、背面 minLum=14 且放大可见眼睛/眉毛/微笑嘴。本地 r2 证据复核：round2-diag 中"面部特写"类截图（r2b-front-full/r2-face-full/r2-face-v2/r2b-face-macro）头部 dark<70 全部 = 0、minLum 106–221，实为纯粉色——第二轮"五官可见"的视觉证据本身是误判，缺陷自 built5 起即存在。
- **根因定位（多路运行时探针，未假设镜头朝向）**：①排除陈旧构建（线上/本地 bundle SHA 字节一致）；②排除贴图参数偏移（map offset/repeat/center/rotation 全默认、flipY=true、ClampToEdge）；③排除组/网格局部旋转或负 scale（剖切+外观两模式 patrick 组 rotation 全 0、scale 全 1、局部 +z→世界 +z；patrick-body 局部 rotation 0）；④排除重复渲染网格（仅 patrick-body 使用皮肤贴图）；⑤源码 UV 数学自洽（starBodyGeo u=0.5+atan2(x,z)/2π，+z 顶点 u=0.5，探针确认；五官绘制在贴图上部中央 u≈0.45–0.55）；⑥页面内射线求交：正面屏幕中心射线命中头部 +z 表面 UV≈(0.5,0.865)，贴图采样为粉色——映射数学无误但渲染结果相反。**关键反证**：把 patrick 组 rotation.y 设为 π 后，+z 特写 dark<70 由 0 → 129、minLum 17（正脸出现），−z 侧变为素面（dark<70=0）——证实五官贴图在渲染管线中实际落在网格局部 −z 侧（机制未在静态层解析，但方向与修复方式被逐像素实证）。
- **修复**：uildPatrick() 中 ody.rotation.y = Math.PI（仅旋转身体网格，不旋转组：短裤/腿/手臂/招手侧/拾取/遮挡均不受影响；不整体旋转角色掩盖问题）。外观模式与剖切模式下正脸均面向 +z 观察镜头。
- **本地 built6 验证**：默认全屋、地下客厅近景（角色面带微笑、眉眼嘴可见）、外观模式构图正常；真实 CDP 鼠标点击派大星招手全周期（idle→raise armRz≈2.5→wave→lower→idle）、TV 只亮屏不亮外壳、两盏灯只亮灯罩不整体发光、吊扇只转叶片吊杆静止，全部通过。
- **证据**：docs/patrick-house-review/round3-local/（l6-whole / l6-living / l6c-exterior / l6c-wave-mid 等）；公网 built5 诊断探针图存 docs/patrick-house-review/live-built5/（probe-h3-front/back、probe-rotpi-front/back、zoom-*、tex-body.png 等）。

## 备份与修整记录（第一轮）

- 原 GLB 备份位置：`assets/models/patrick-house/archive/`（未提交临时文件；备份保留原模型）。
- 第一轮重建记录：全部 14 个原资产判定为单网格高面数薄片（stove 厚 0.163、old-tv 厚 0.193、bench-press 全高 0.41、coffee-table 无腿扁块等）→ 弃用并归档；按参考图逐件程序化重建（水槽/炉灶/老电视/茶几/沙发/落地灯/吊扇/卧推凳/杠铃/床/海星枕/床头柜/床头灯/双门冰箱/吊柜/木台阶），全部带厚度与背面。

## 记录口径

- 三角面数/网格数来自验收时 `renderer.info` 与 `__patrickHouse.stat()`。
- SHA-256 为本次提交时对工作区文件的哈希；提交后如需复算请用 `git hash-object`。
- 技术测试通过 ≠ 角色/动画/材质验收合格；手机模拟视口 ≠ 真实手机；SwiftShader 帧率 ≠ 真实 GPU/手机性能。新资产保持 review，不自动标记 approved。
