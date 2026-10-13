# 猫咪坐姿重做

旧坐姿被用户否定：后腿呈尖角、臀部悬空。新版保留原 GPU 网格、UV、贴图和骨架，重做脊柱截面、骨盆和后腿姿态，臀部落地、后脚收拢，前爪稳定支撑。

- 实际浏览器点击坐下、起身，检查连续帧、正/侧/后侧与裸网格；录像和截图见 `local/`。
- `contact-checks.json` 检查臀部接地面积、前爪支撑和过渡连续性，避免只检查脚底或平均高度。
- `geometry-checks.json` 检查脸部刚性、网格拉伸、接地、四方向招呼与暂停。
- 姿态参考：[Hiroko Nishimura 的暹罗猫照片](https://unsplash.com/photos/18Dsc6X5wdw)。仅用于姿态观察，未作为贴图或生成资产。
- 资产来源与哈希见 `runtime.json`。用户观感确认待定，手机实机未测；技术检查不能代替视觉确认。
- 公网九个关键文件哈希一致，见 `public-resources.json`；线上三十条动作/视角记录见 `live/browser.json`，正式场景十五条原生点击记录见 `companion-live.json`，脚本异常为零。
- 线上实录：[坐下与起身](live/sit-rise.webm)、[侧面](live/sit-side.png)、[裸网格](live/bare-side.png)。这些实际画面已逐一检查，用户最终观感确认待定。
