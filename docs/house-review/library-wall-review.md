# 图书馆后墙修复

原因：二层后墙从 x=0.25 开始，三层从 x=1.12 开始；中间墙片归卧室，图书馆近景隐藏后形成台阶缺口。

修复：Blender 4.5.13 在原曲面上导出 x=0.25—1.12、Y-up 高度 6—9 的厚壁墙片，仅图书馆近景显示。全屋与卧室仍显示原墙片，避免重叠。新增 2240 三角形，原 64 个结构网格几何和标签保持一致。

来源：gsy013 `/workspace/projects/pineapple-house-20261009/structure-v6-library/`；本地源工程 `tmp/house-production/structure-v6-library.blend`。GLB 哈希、源脚本哈希见 `manifests/structure.json`。状态为待审，未替换首页或发布。

验证：墙片闭合、范围和既有网格回归见 [几何检查](library-wall-geometry.json)。1440×900、390×844 浏览器视口检查技能点击、Esc、返回、卧室切换通过，旋转截图后墙连续；手机为模拟视口。

- [修复前](library-wall-screenshots/before-desktop.jpg)
- [修复后](library-wall-screenshots/after-desktop.jpg)
- [旋转](library-wall-screenshots/after-rotated.jpg)
- [全屋](library-wall-screenshots/whole-desktop.jpg)
- [卧室](library-wall-screenshots/bedroom-desktop.jpg)
- [手机](library-wall-screenshots/after-mobile.jpg)
- [浏览器结果](library-wall-browser.json)

构建、资源检查、git diff --check 通过。只保存本任务提交，保留并行修改。
