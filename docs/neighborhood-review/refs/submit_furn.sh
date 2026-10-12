#!/bin/bash
for f in couch bed piano stove bathtub; do
  echo "=== $f ==="
  curl -s -X POST http://127.0.0.1:8091/v1/jobs \
    -F source=@/workspace/3d-assets/refs/neighborhood/furniture/$f.png \
    -F asset_name=furn_$f \
    -F asset_kind=prop \
    -F seed=1234
  echo
done
