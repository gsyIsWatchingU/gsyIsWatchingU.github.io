"""服务器本地部署：只添加 house-companion 服务与 Funnel 路径。"""
from pathlib import Path
from datetime import datetime
import json, os, subprocess, sys

root=Path(__file__).resolve().parents[2]
env=Path('/workspace/etc/house-companion.env')
if not env.exists():
    model=next(Path('/workspace/models/game-audio/huggingface/hub/models--Qwen--Qwen3-TTS-12Hz-1.7B-CustomVoice/snapshots').iterdir())
    env.write_text('TTS_MODEL_PATH='+str(model)+'\nDEEPSEEK_API_KEY=\nDEEPSEEK_MODEL=deepseek-flash\nREDIS_URL=redis://127.0.0.1:6379/0\nRATE_LIMIT_SALT='+os.urandom(24).hex()+'\n')
    env.chmod(0o600)
launcher=root/'backend/companion/run.sh'
launcher.write_text('#!/bin/bash\nset -a\nsource /workspace/etc/house-companion.env\nset +a\nexport CUDA_VISIBLE_DEVICES=0\nexport PYTHONPATH='+str(root)+':'+str(root/'vendor')+'\ncd '+str(root)+'\nexec /workspace/.envs/game-audio-tts/bin/python -m uvicorn backend.companion.server:app --host 127.0.0.1 --port 8112 --no-access-log\n')
launcher.chmod(0o700)
config=Path('/workspace/etc/house-companion.conf')
config.write_text('[program:house-companion]\ncommand='+str(launcher)+'\ndirectory='+str(root)+'\nautostart=true\nautorestart=true\nstartsecs=10\nstdout_logfile=/workspace/logs/house-companion.log\nstderr_logfile=/workspace/logs/house-companion-error.log\nstdout_logfile_maxbytes=5MB\nstderr_logfile_maxbytes=5MB\n')
master=Path('/workspace/etc/supervisord.conf')
text=master.read_text()
if 'house-companion.conf' not in text and '/workspace/etc/*.conf' not in text:
    backup=master.with_name('supervisord.conf.before-house-companion-'+datetime.now().strftime('%Y%m%dT%H%M%S'))
    backup.write_text(text)
    if '[include]' not in text:raise RuntimeError('Supervisor include 未配置，未更改主文件')
    lines=text.splitlines();inside=False;added=False
    for i,line in enumerate(lines):
        if line.strip()=='[include]':inside=True
        elif inside and line.startswith('['):inside=False
        elif inside and line.strip().startswith('files'):
            lines[i]=line+' /workspace/etc/house-companion.conf';added=True;break
    if not added:raise RuntimeError('Supervisor include files 未找到')
    master.write_text('\n'.join(lines)+'\n')
subprocess.run(['supervisorctl','-c',str(master),'reread'],check=True)
subprocess.run(['supervisorctl','-c',str(master),'update','house-companion'],check=True)
tailscale=['/workspace/.tools/bin/tailscale','--socket=/workspace/.tailscale/tailscaled.sock']
before=subprocess.check_output([*tailscale,'serve','status','--json'])
(root/'backend/companion/funnel-before.json').write_bytes(before)
subprocess.run([*tailscale,'funnel','--bg','--set-path=/house-api','http://127.0.0.1:8112'],check=True)
after=json.loads(subprocess.check_output([*tailscale,'serve','status','--json']))
old=json.loads(before)
for host,web in old.get('Web',{}).items():
    for path,handler in web.get('Handlers',{}).items():
        if after.get('Web',{}).get(host,{}).get('Handlers',{}).get(path)!=handler:raise RuntimeError('已有 Funnel 路由发生变化')
print('DEPLOYED; existing routes preserved')
