"""核对图书馆后墙范围、闭合表面和既有结构是否保持一致。"""
import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path
import struct

parser = argparse.ArgumentParser()
parser.add_argument("--baseline", type=Path, required=True)
parser.add_argument("--model", type=Path, required=True)
parser.add_argument("--output", type=Path, required=True)
args = parser.parse_args()

def read(path):
    data = path.read_bytes()
    length = struct.unpack_from("<I", data, 12)[0]
    return json.loads(data[20:20+length]), data[28+length:]

def values(gltf, binary, index):
    accessor = gltf["accessors"][index]
    view = gltf["bufferViews"][accessor["bufferView"]]
    width = {"SCALAR": 1, "VEC2": 2, "VEC3": 3, "VEC4": 4}[accessor["type"]]
    code = {5121: "B", 5123: "H", 5125: "I", 5126: "f"}[accessor["componentType"]]
    fmt = "<" + code * width
    stride = view.get("byteStride", struct.calcsize(fmt))
    start = view.get("byteOffset", 0) + accessor.get("byteOffset", 0)
    return [struct.unpack_from(fmt, binary, start+i*stride) for i in range(accessor["count"])]

def meshes(gltf, binary):
    return {node["name"]: (
        node.get("extras", {}),
        sorted(point for primitive in gltf["meshes"][node["mesh"]]["primitives"]
               for point in values(gltf, binary, primitive["attributes"]["POSITION"]))
    ) for node in gltf["nodes"] if "mesh" in node}

old, old_bin = read(args.baseline)
new, new_bin = read(args.model)
before, after = meshes(old, old_bin), meshes(new, new_bin)
name = "shell_2_library_back_fill"
assert set(after)-set(before) == {name}, "unexpected structure additions"
assert all(after[key] == value for key, value in before.items()), "existing structure changed"
metadata, points = after[name]
assert metadata["roomId"] == metadata["roomViewOnly"] == "library"
assert metadata["level"] == 2 and metadata["occluder"]
bounds = [[min(p[i] for p in points) for i in range(3)], [max(p[i] for p in points) for i in range(3)]]
assert abs(bounds[0][0]-.25) < 1e-5 and abs(bounds[1][0]-1.12) < 1e-5
assert abs(bounds[0][1]-6) < 1e-5 and abs(bounds[1][1]-9) < 1e-5
node = next(node for node in new["nodes"] if node.get("name") == name)
edges = Counter()
for primitive in new["meshes"][node["mesh"]]["primitives"]:
    vertices = values(new, new_bin, primitive["attributes"]["POSITION"])
    indices = [item[0] for item in values(new, new_bin, primitive["indices"])]
    for i in range(0, len(indices), 3):
        triangle = [tuple(round(v, 6) for v in vertices[k]) for k in indices[i:i+3]]
        assert len(set(triangle)) == 3, "degenerate triangle"
        for a, b in zip(triangle, triangle[1:]+triangle[:1]):
            edges[tuple(sorted((a, b)))] += 1
assert all(count == 2 for count in edges.values()), "wall surface is not closed"
report = {"modelSHA256": hashlib.sha256(args.model.read_bytes()).hexdigest(),
          "retainedMeshes": len(before), "newMesh": name, "bounds": bounds,
          "existingGeometryAndMetadataUnchanged": True, "closedWallSurface": True,
          "visibleOnlyIn": metadata["roomViewOnly"], "status": "review"}
args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
print(json.dumps(report, ensure_ascii=False))
