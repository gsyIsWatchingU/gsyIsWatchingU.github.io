# 章鱼哥屋独立预览 — 开发期自测结论

日期：2026-10-12
视口：桌面 1440×900、移动 390×844
服务：本地 `python -m http.server 8123`（项目根），URL `http://127.0.0.1:8123/docs/neighborhood-review/index.html`
浏览器：headless Chrome（`--virtual-time-budget=25000~30000`）

## 交付物

| 文件 | 说明 |
| --- | --- |
| `index.html` | 精简壳：importmap + 引用 neighborhood.css / neighborhood.js |
| `neighborhood.js` | 全部交互逻辑（外观先加载/内部懒加载、加载代际防串扰、门探针盒射线判定、房间近景、Esc 两级返回、SSAO、三角面索引统计） |
| `neighborhood.css` | UI 样式（顶栏、info 面板、room chips、错误/加载层） |
| `config/house-config.json` | 模型版本与缓存标识、房间归属/边界/近景镜头、门探针盒、桌面/移动档位预算、space-config 权威 glTF 坐标并入 |
| `preview-dev/` | 截图与本结论 |

## 实测截图

| 截图 | 视口 | 结论 |
| --- | --- | --- |
| `01-exterior-desktop.png` | 1440×900 | 章鱼哥摩艾外观居中、木门可见、三角面 40,000（索引口径） |
| `02-cutaway-desktop.png` | 1440×900 | 进入内部剖切：四层切片 + room chips 投影可读 |
| `03-room-kitchen.png` | 1440×900 | 厨房近景：info 显示"一层·厨房入口"，三角面 10,836；近端弧形墙占位粗模偏大（最终 GLB 替换后重调） |
| `04-patrick-desktop.png` | 1440×900 | `?house=patrick` 直达正常：深红褐色圆顶巨石 + 风向标，40,000 面 |
| `05-mobile-squidward.png` | 390×844 | 移动视口外观正常，无横向溢出；取景略紧，已调 wholePadding=1.7 |

## 任务书第 4 节逐条核对

1. **默认全局剖切 + 点房间近景 + Esc/返回恢复全屋**：`enterCutaway()` 为内部默认视图；`enterRoom(id)` 读 config 近景；`exitInterior()` 两级退出（room→cutaway→exterior）；Esc 绑定。已移除旧四层楼层按钮逻辑。✅
2. **相机按包围盒/视口/UI 安全区适配，窄视角轻微俯视**：`frameWhole()` 用 Box3 尺寸 + fov + aspect 计算距离，`pitch=0.16` 轻微俯视；近景镜头从 `house-config.rooms[].camera/target` 读取。✅
3. **色彩管理 + 柔和主光补光 + SSAO**：ACESFilmicToneMapping + sRGB；HemisphereLight + 暖色主光（PCFShadowMap）+ 冷色补光；EffectComposer + SSAOPass + OutputPass。⚠️ PCFSoftShadowMap 在 r186 已移除，自动降级 PCFShadowMap（控制台仅此一条告警，无错误）。
4. **门点击只检测门网格、移除固定距离判断、加载失败重试、代际防串扰**：外观门用 `door.exteriorProbe` 探针盒（局部空间射线判定）；内部门收集 `door_panel/door_arch` 网格；错误面板"重试"按钮触发 `++loadGen` 重载；所有 loader 回调校验 `gen === loadGen`。✅
5. **外观先加载、内部懒加载、版本缓存标识**：`loadExterior()` 立即执行；`loadInterior()` 仅在门点击时调用；`?v=20261012-squidward-v4` 附加到所有 GLB URL；`cache Map` 按 `house:tier` 复用资源。✅
6. **三角面索引口径、桌面/移动档位**：`countTris()` 用 `geometry.index.count`（无索引按 position.count/3）；config 声明桌面 ≤30 万面/2048 贴图、移动 ≤15 万面/1024 贴图；当前占位 GLB 40,000 面，两档均未超限。✅
7. **派大星屋 `?house=patrick` 直达与两屋切换不回归**：截图 04 验证；顶栏两个 house 按钮切换走 `switchHouse()` + `loadGen`。✅

## 已知边界与后续

- 当前内部 GLB（`squidward-interior.glb`）是开发期横向 Z 条带占位；`space-config.json` 权威布局为 glTF Y-up 垂直堆叠四层（地面 y=0，四层楼板 y=0.15/1.20/2.40/3.60，正门朝 +Z）。已并入 `house-config.spaceConfigAuthoritative`；最终结构 GLB 接入时，由验收子代理用该坐标重写 `rooms[]` 与 `cutawayPose()`。
- 无头 Chrome 无法模拟指针拖拽/滚轮，旋转缩放仅靠 OrbitControls 默认参数（enableDamping、maxPolarAngle、enablePan=false）；未做真实手势点击测试。
- SSAO 视觉效果在占位粗模上不明显，最终 GLB 接入后需复查 kernelRadius/minDistance/maxDistance 尺度。
- 未 git 提交；未改 src/、styles/、scripts/、assets/。
