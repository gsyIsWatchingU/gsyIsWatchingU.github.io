"""在原创建主机续跑静态角色阶段，不改变共享 Worker 配置。"""
from pathlib import Path
import json
import os
from forge3d.settings import Settings
from forge3d.store import JobStore
from forge3d.pipeline import PipelineRunner

job_id = '413330331cd042a58d2cdb1080863637'
os.environ['FORGE3D_PROJECT_ROOT'] = '/workspace/projects/forge3d'
os.environ['FORGE3D_BLENDER'] = '/workspace/.tools/blender-4.5.13-linux-x64/blender'
settings = Settings.from_env()
store = JobStore(settings)
job = store.load(job_id)
assert job.state.value in ('queued', 'failed'), 'Job already started; do not duplicate'
backup = store.job_dir(job_id) / 'manifest-before-static.json'
if not backup.exists():
    backup.write_text(job.model_dump_json(indent=2) + '\n')
store.redis.lrem('forge3d:jobs:gpu', 0, job_id)
job.stop_after = 'normalize_mesh'
job.provenance['delivery_scope'] = 'static_character_mesh_and_texture'
job.provenance['dispatch'] = 'direct_original_host_after_queue_consumed_without_start'
store.save(job)
runner = PipelineRunner(settings, store)
runner.run(job)
print(json.dumps({'job_id': job_id, 'state': job.state.value, 'outputs': job.outputs}, ensure_ascii=False), flush=True)
