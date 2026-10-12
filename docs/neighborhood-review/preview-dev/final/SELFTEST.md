# 章鱼哥屋最终预览 — 重基线自测结论

日期：2026-10-12
模型版本：`?v=20261012-squidward-v4-final`
新 GLB：`squidward-house.glb`（90,200 索引三角）、`squidward-interior.glb`（81,504 索引三角）
视口：桌面 1440×900、移动 390×844
服务：本地 `python -m http.server 8123`，URL `http://127.0.0.1:8123/docs/neighborhood-review/index.html`

## 交付物

| 文件 | 说明 |
| --- | --- |
| `index.html` | 精简壳（importmap + 引用 css/js） |
| `neighborhood.js` | 交互逻辑（剖切隐藏外壳、房间家具按前缀隐藏、门 panel 近景隐藏、加载代际防串扰） |
| `neighborhood.css` | UI 样式 |
| `config/house-config.json` | 模型路径/版本/房间坐标/门网格/档位预算 |
| `preview-dev/final/` | 最终截图（8 张）+ 本文件 |

## 实测截图

| 截图 | 视口 | 结论 |
| --- | --- | --- |
| `01-exterior.png` | 1440×900 | 新摩艾外观：半剖壳，90,200 三角面，门/舷窗/鼻子可见 |
| `02-cutaway.png` | 1440×900 | 剖切全局：四层楼板+螺旋楼梯+家具同时可见，room chips 投影正确 |
| `03-room-kitchen.png` | 1440×900 | 一层近景：门框/雕像可见，室内橱柜视角被门框区遮挡（取景微调项） |
| `04-room-living.png` | 1440×900 | 二层近景：沙发/扶手椅/茶几/书柜/植物完整，其他房间家具已隐藏 |
| `05-room-bedroom.png` | 1440×900 | 三层近景：四柱床/枕头/床头柜/台灯完整，楼梯扶手可见 |
| `06-room-bathroom.png` | 1440×900 | 四层近景：爪足浴缸/洗手盆/浴帘完整 |
| `07-patrick.png` | 1440×900 | `?house=patrick` 直达正常：深红褐色圆顶巨石+风向标，40,000 三角面 |
| `08-mobile.png` | 390×844 | 移动视口外观正常，无横向溢出，90,200 三角面 |

## 任务书第 4 节逐条核对

1. **默认全局剖切 + 点房间近景 + Esc/返回恢复全屋**：`enterCutaway()` 为内部默认视图；`enterRoom(id)` 读 config 近景；`exitInterior()` 两级退出；Esc 绑定。✅
2. **相机按包围盒/视口/UI 安全区适配**：`frameWhole()` 用 Box3+fov+aspect；近景镜头从 `house-config.rooms[].camera/target` 读取。✅
3. **色彩管理 + 柔和主光补光 + SSAO**：ACESFilmicToneMapping + sRGB；HemisphereLight + 暖色主光 + 冷色补光；EffectComposer + SSAOPass + OutputPass。新模型上 SSAO 阴影可见（家具接地处）。✅
4. **门点击只检测门网格、移除固定距离、加载失败重试、代际防串扰**：门探针盒 + `door_frame/door_panel/door_handle` 网格名；错误面板重试；`gen === loadGen` 校验。✅
5. **外观先加载、内部懒加载、版本缓存标识**：`loadExterior()` 立即执行；`loadInterior()` 门点击时调用；`?v=20261012-squidward-v4-final`；cache Map 复用。✅
6. **三角面索引口径、桌面/移动档位**：`countTris()` 用 index.count；当前 90,200/81,504 面均在 30 万/15 万预算内。✅
7. **派大星屋 `?house=patrick` 不回归**：截图 07 验证。✅

## 已知边界

- 厨房近景（03）取景仍被门框/雕像区部分遮挡，需后续微调 camera/target 角度；功能正常（家具已按前缀隐藏，仅该层家具可见）。
- 无头 Chrome 无法模拟指针拖拽/滚轮，旋转缩放仅靠 OrbitControls 默认参数。
- 未 git 提交；未改 src/、styles/、scripts/、assets/。
