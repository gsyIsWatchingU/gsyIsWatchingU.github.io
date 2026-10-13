# 菠萝屋角色服务

- GPU 服务目录：`/workspace/projects/house-companion`。
- Supervisor：`house-companion`；监听本机 `8112`，Funnel 新增 `/house-api`，其余路由保留。
- 公网健康：[health](https://gsy-gpu.tail660bdf.ts.net/house-api/health)。
- 密钥在服务器 `/workspace/etc/house-companion.env` 配置 `DEEPSEEK_API_KEY`，权限 `0600`；配置后只重启 `house-companion`。不提交、不回显密钥。
- 默认 DeepSeek `deepseek-flash`，仅文字聊天；`TTS_ENABLED=0`，不加载语音模型。
- 复用已安装的 `/workspace/.envs/game-audio-tts`；新增 Redis 客户端单独安装在服务 `vendor`，不修改其他服务依赖。
- Redis 保存匿名限流计数；聊天与对白仅存进程内，会话 30 分钟过期。每 IP 每分钟 10 次聊天，全站每天 500 次；语音 1 个推理、最多 4 个等待任务。
- `POST /session` 创建会话；`POST /chat` 接收会话、文本、房间、活动，返回 `turnId/reply/action`；`POST /speech` 仅接受该会话已生成的 `turnId`，返回 WAV。
- 未配置密钥时明确返回 503；不使用固定对白冒充自由聊天。

验证：`python -m unittest backend.companion.test_server`。模型与语音回复夹具仅验证协议、队列与隔离，不等于真实 DeepSeek 调用。
