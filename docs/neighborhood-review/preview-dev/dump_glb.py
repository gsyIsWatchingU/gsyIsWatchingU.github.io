"""Dump GLB node/mesh structure + per-primitive local bbox, for deriving house-config."""
import json, struct, sys
from pathlib import Path

def parse(path):
    data = Path(path).read_bytes()
    magic, version, length = struct.unpack_from("<III", data, 0)
    assert magic == 0x46546C67
    off = 12
    j = None
    while off + 8 <= len(data):
        clen, ctype = struct.unpack_from("<II", data, off)
        off += 8
        chunk = data[off:off+clen]
        off += clen
        if ctype == 0x4E4F534A:
            j = json.loads(chunk.decode("utf-8"))
    return j

g = parse(sys.argv[1])
print("=== scenes/nodes ===")
def walk(ni, depth=0):
    n = g["nodes"][ni]
    line = "  " * depth + f"node[{ni}] name={n.get('name')!r}"
    if "mesh" in n: line += f" mesh={n['mesh']}({g['meshes'][n['mesh']].get('name')!r})"
    if "translation" in n: line += f" T={[round(v,3) for v in n['translation']]}"
    if "rotation" in n: line += f" R={[round(v,3) for v in n['rotation']]}"
    if "scale" in n: line += f" S={[round(v,3) for v in n['scale']]}"
    print(line)
    for c in n.get("children", []):
        walk(c, depth+1)

sc = g["scenes"][g.get("scene", 0)]
for ni in sc["nodes"]:
    walk(ni)

print("=== meshes (name, local bbox per prim) ===")
accs = g["accessors"]
for mi, m in enumerate(g.get("meshes", [])):
    print(f"mesh[{mi}] name={m.get('name')!r}")
    for pi, p in enumerate(m["primitives"]):
        pos = p["attributes"]["POSITION"]
        a = accs[pos]
        idx = p.get("indices")
        tricount = accs[idx]["count"] // 3 if idx is not None else a["count"] // 3
        print(f"  prim{pi} tris={tricount} min={[round(v,3) for v in a.get('min',[])]} max={[round(v,3) for v in a.get('max',[])]}")
