#!/bin/bash
for id in 38a0b8bd4bea480c98689bea5aca7f04 adb4a6b621b04cd5908a508af64a366b aa4c6b9d88744bbfb19e009b875dcd5d 50cf2d32e19146929ed9c9e720b2f287 b56c9ec47f044073b3223d525a540a8e; do
  echo -n "$id: "
  curl -s http://127.0.0.1:8091/v1/jobs/$id | python3 -c 'import sys,json; d=json.load(sys.stdin); print(d["state"], d.get("error","") or "")'
done
