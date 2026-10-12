#!/bin/bash
for id in acb53cf5af0342aa853d51b528c02d51 25d927d7afc24a56a838ac4d007602b3 e88d81a5d3074ca180d0e3f6559fd93e 7e5e0310180544248bbd517abce3a1f3 8caa9e1b1ac5417cba1947298a79e6a4; do
  echo -n "$id: "
  curl -s http://127.0.0.1:8091/v1/jobs/$id | python3 -c 'import sys,json; d=json.load(sys.stdin); print(d["state"], d.get("error","") or "")'
done
echo "queue gpu: $(redis-cli LLEN forge3d:jobs:gpu)"
nvidia-smi --query-gpu=utilization.gpu,memory.used --format=csv,noheader
