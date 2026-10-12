#!/bin/bash
for id in 38a0b8bd4bea480c98689bea5aca7f04; do
  curl -s http://127.0.0.1:8091/v1/jobs/$id | python3 -c '
import sys,json
d=json.load(sys.stdin)
print("state:", d["state"])
for s in d["stages"]:
    print(" ", s["name"], s["state"])
print("error:", d.get("error"))
print("outputs:", list(d.get("outputs",{}).keys()))
'
done
