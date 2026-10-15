"""以干净白底参考运行现有 Forge3D 后端，显卡固定到自有专用 L20。"""
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import time

os.environ['CUDA_VISIBLE_DEVICES'] = 'GPU-1a462216-9e7c-59c9-5e0f-a1d2b2ef1766'
os.environ['FORGE3D_PROJECT_ROOT'] = '/workspace/projects/forge3d'
from forge3d.domain import AssetJob, StageResult
from forge3d.pipeline import PipelineRunner
from forge3d.settings import Settings
from forge3d.store import JobStore

settings = Settings.from_env()
store = JobStore(settings)
runner = PipelineRunner(settings, store)
job_id = '2d0be628043b487b951ef7259f5a4812'
source = Path('/workspace/projects/pineapple-living-20261015/sofa-clean.png')
if store.manifest_path(job_id).exists():
    raise RuntimeError('任务已存在；先查询，禁止重复提交')
folder = store.job_dir(job_id)
folder.mkdir(parents=True)
shutil.copy2(source, folder / 'source.png')
job = AssetJob(job_id=job_id, asset_name='pineapple-living-sofa-clean-20261015', asset_kind='prop', profile='xhs_mobile', source_file=str(folder / 'source.png'), source_sha256=hashlib.sha256(source.read_bytes()).hexdigest(), seed=20261015,
    prompt='依据干净单件参考：三根绿色横管靠背，两道红棕绑带，顶部两个绳圈，一整块厚蓝色坐垫；保留圆润厚实体积与织物细节，不生成背景、板或底座。',
    stages=[StageResult(name=name) for name in runner.pipelines['prop']],
    provenance={'source_filename': source.name, 'mesh_backend': 'single', 'forge3d_version': '0.1.0', 'execution': 'same deployed PipelineRunner; one-off job with pinned idle GPU UUID; no shared service changes', 'gpu_uuid': os.environ['CUDA_VISIBLE_DEVICES'], 'referenceRevision': 'white-background-no-glow', 'rejectedJobId': '0b0d02832f264418886227dd59ae653c'})
store.save(job)
for attempt in range(90):
    free = int(subprocess.check_output(['nvidia-smi', '--id=' + os.environ['CUDA_VISIBLE_DEVICES'], '--query-gpu=memory.free', '--format=csv,noheader,nounits'], text=True).strip())
    if free > 44000:
        break
    if attempt == 0:
        print('等待前一任务释放专用显卡', flush=True)
    time.sleep(10)
else:
    raise TimeoutError('等待显卡超时，任务尚未推理')
print(json.dumps({'jobId': job_id, 'asset': job.asset_name, 'sourceSHA256': job.source_sha256}, ensure_ascii=False), flush=True)
runner.run(job)
print('CLEAN SOFA FINISHED', flush=True)
