"""只探测猫咪修复工位，不修改现有服务。"""
import json
import os
import subprocess
import sys
import time
import urllib.request

device = int(sys.argv[1]) if len(sys.argv) > 1 else 0
os.environ['CUDA_VISIBLE_DEVICES'] = str(device)
import cupy as cp
import cupyx.scipy.sparse as sparse
from cupyx.scipy.sparse.linalg import cg

samples = []
for _ in range(3):
    result = subprocess.run(['nvidia-smi', '--query-gpu=index,uuid,name,memory.total,memory.free,utilization.gpu', '--format=csv,noheader'], capture_output=True, text=True)
    samples.append(result.stdout.strip().splitlines())
    time.sleep(1)

started = time.perf_counter()
x = cp.random.RandomState(20261016).normal(size=(32000, 3, 3)).astype(cp.float32)
u, _, v = cp.linalg.svd(x)
cp.cuda.Stream.null.synchronize()
svd_seconds = time.perf_counter() - started
a = sparse.diags([cp.full(9999, -1.), cp.full(10000, 3.), cp.full(9999, -1.)], [-1, 0, 1], format='csr', dtype=cp.float32)
answer, code = cg(a, cp.ones(10000, dtype=cp.float32), tol=1e-5, maxiter=100)
cp.cuda.Stream.null.synchronize()
health = json.load(urllib.request.urlopen('http://127.0.0.1:8091/health', timeout=10))
report = {'deviceIndex': device, 'gpuName': cp.cuda.runtime.getDeviceProperties(0)['name'].decode(), 'cupy': cp.__version__, 'cudaRuntime': cp.cuda.runtime.runtimeGetVersion(), 'samples': samples, 'svd32000Seconds': svd_seconds, 'sparseCGCode': int(code), 'cgResidual': float(cp.linalg.norm(a @ answer - 1)), 'peakMemoryPoolBytes': cp.get_default_memory_pool().total_bytes(), 'forge3dHealth': health}
print(json.dumps(report), flush=True)
