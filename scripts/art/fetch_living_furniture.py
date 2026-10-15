"""下载本轮任务与终态产物；不改变审核状态。"""
import json
from pathlib import Path
import subprocess

root = Path(__file__).resolve().parents[2]
jobs = [('sofa-rejected', 'gsy013', '0b0d02832f264418886227dd59ae653c'), ('shell', 'mygpu', 'eef84e98a88845efb553958b044f9be9'), ('sofa', 'gsy013', '2d0be628043b487b951ef7259f5a4812')]
for asset, host, job_id in jobs:
    folder = root / 'docs/living-furniture-review/production' / asset
    folder.mkdir(parents=True, exist_ok=True)
    remote = f'/workspace/3d-assets/jobs/{job_id}'
    def fetch(source, destination):
        subprocess.run(['scp', '-q', '-o', 'BatchMode=yes', host + ':' + source, str(destination)], check=True, timeout=120)
    fetch(remote + '/manifest.json', folder / 'manifest.json')
    job = json.loads((folder / 'manifest.json').read_text(encoding='utf-8'))
    print(json.dumps({'asset': asset, 'host': host, 'jobId': job_id, 'state': job['state'], 'stages': [(s['name'], s['state']) for s in job['stages']], 'error': job.get('error')}, ensure_ascii=False), flush=True)
    if job['state'] not in ('review', 'completed', 'failed'):
        continue
    fetch(remote + '/pipeline.log', folder / 'pipeline.log')
    if asset == 'sofa-rejected':
        for suffix in ('json', 'log'):
            fetch(remote + '/failure-before-uuid-retry.' + suffix, folder / ('failure-before-uuid-retry.' + suffix))
    outputs = job.get('outputs', {})
    if outputs.get('preview'):
        fetch(outputs['preview'], folder / 'preview.png')
    if outputs.get('game_asset'):
        fetch(outputs['game_asset'], folder / 'candidate.glb')
