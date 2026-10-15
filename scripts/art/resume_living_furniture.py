"""仅恢复本轮失败任务；使用 UUID 固定显卡，不改共享 Worker。"""
import json
import os
from pathlib import Path
import sys

job_id, gpu_uuid = sys.argv[1:3]
if job_id != '0b0d02832f264418886227dd59ae653c':
    raise ValueError('仅允许恢复本轮沙发任务')
os.environ['CUDA_VISIBLE_DEVICES'] = gpu_uuid
os.environ['FORGE3D_PROJECT_ROOT'] = '/workspace/projects/forge3d'
from forge3d.pipeline import PipelineRunner
from forge3d.settings import Settings
from forge3d.store import JobStore

settings = Settings.from_env()
store = JobStore(settings)
job = store.load(job_id)
if job.state.value != 'failed':
    raise RuntimeError('任务不是 failed，禁止重复执行')
folder = store.job_dir(job_id)
(folder / 'failure-before-uuid-retry.json').write_text(job.model_dump_json(indent=2), encoding='utf-8')
log = folder / 'pipeline.log'
if log.exists():
    (folder / 'failure-before-uuid-retry.log').write_bytes(log.read_bytes())
job.provenance['retry'] = {'reason': 'CUDA index selected busy physical GPU; pin to assigned idle GPU UUID', 'gpu_uuid': gpu_uuid, 'execution': 'one-off same deployed PipelineRunner, no service mutation'}
store.save(job)
print(json.dumps({'jobId': job_id, 'gpuUUID': gpu_uuid, 'operation': 'resume-failed-job'}), flush=True)
PipelineRunner(settings, store).run(job)
print('PIPELINE FINISHED', flush=True)
