"""核验运行资产、参考源与生成链哈希，生成独立审查清单。"""
from pathlib import Path
import hashlib
import json
import struct

ROOT=Path(__file__).resolve().parents[2]
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def read(path):return json.loads(path.read_text(encoding="utf-8-sig"))
config=read(ROOT/"src/data/pineapple-house.json")
structure=read(ROOT/"docs/house-review/manifests/structure.json")
assert sha(ROOT/config["structure"]["url"])==structure["sha256"]
records=[]
for asset in config["assets"]:
    name=asset["url"].split("/")[-1].split(".")[0]
    generation=read(ROOT/f"docs/house-review/manifests/{name}.json")
    runtime=read(ROOT/f"docs/house-review/props/{name}-runtime.json")
    assert sha(ROOT/asset["url"])==runtime["runtimeSha256"],name
    assert sha(ROOT/generation["source"])==generation["sourceSha256"],name
    assert sha(ROOT/generation["reference"])==generation["referenceSha256"],name
    raw=ROOT/f"tmp/house-production/raw/{name}/textured.glb"
    shape=ROOT/f"tmp/house-production/raw/{name}/shape.glb"
    assert sha(raw)==generation["rawTexturedSha256"]==runtime["rawSha256"],name
    assert sha(shape)==generation["shapeSha256"],name
    data=(ROOT/asset["url"]).read_bytes()
    gltf=json.loads(data[20:20+struct.unpack_from("<I",data,12)[0]])
    triangles=sum(gltf["accessors"][p["indices"]]["count"]//3 for mesh in gltf["meshes"] for p in mesh["primitives"])
    assert triangles==runtime["triangles"],(name,triangles,runtime["triangles"])
    records.append({"id":asset["id"],"room":asset["room"],"runtime":asset["url"],"sha256":runtime["runtimeSha256"],"triangles":triangles,"generationManifest":f"docs/house-review/manifests/{name}.json","repairManifest":f"docs/house-review/props/{name}-runtime.json","rawLocal":str(raw.relative_to(ROOT)).replace("\\","/"),"rawRemote":generation["rawRemotePath"],"blendRemote":f"gsy013:/workspace/projects/pineapple-house-20261009/props/export/{name}.blend","blendLocal":f"tmp/house-production/blender/{name}.blend","sourceBackend":generation["backend"],"runtimeMeshBackend":runtime["meshBackend"],"status":"review"})
report={"status":"review","humanReview":"pending","structure":structure,"primaryReference":"docs/refs/pineapple-house/01-cutaway-full.png","primaryReferenceSha256":sha(ROOT/"docs/refs/pineapple-house/01-cutaway-full.png"),"runtimeModels":13,"runtimeTriangles":structure["triangles"]+sum(r["triangles"] for r in records),"assets":records,"scripts":{str(p.relative_to(ROOT)).replace("\\","/"):sha(p) for p in sorted((ROOT/"scripts/art").glob("house_*.py"))}}
(ROOT/"docs/house-review/asset-index.json").write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(f"13 models verified; {report['runtimeTriangles']} triangles; provenance hashes matched")
