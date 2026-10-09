"""自有 T4 单卡工位：常驻 Hunyuan Shape，输出独立网格与来源记录。"""
import argparse
import hashlib
import json
import os
from pathlib import Path
import sys
import time

parser = argparse.ArgumentParser()
parser.add_argument("--root", required=True)
parser.add_argument("--slot", required=True, type=int)
args = parser.parse_args()
root = Path(args.root)
repo = Path("/workspace/projects/forge3d/vendor/Hunyuan3D-2.1")
sys.path.insert(0, str(repo))
sys.path.insert(0, str(repo / "hy3dshape"))
os.environ["HY3DGEN_MODELS"] = "/workspace/models/forge3d/hy3dgen"
os.environ["HF_HOME"] = "/workspace/models/forge3d/huggingface"
from PIL import Image
import torch
from hy3dshape.pipelines import Hunyuan3DDiTFlowMatchingPipeline

pipeline = Hunyuan3DDiTFlowMatchingPipeline.from_pretrained("tencent/Hunyuan3D-2.1", subfolder="hunyuan3d-dit-v2-1")
rows = json.loads((root / "sources/references.json").read_text())
for index, row in enumerate(rows):
    if index % 4 != args.slot:
        continue
    out = root / "shape" / row["id"]
    out.mkdir(parents=True, exist_ok=True)
    path = out / "shape.glb"
    if path.exists() and (out / "manifest.json").exists():
        continue
    started = time.time()
    print(f"START {row['id']}", flush=True)
    mesh = pipeline(image=Image.open(root / "sources" / f"{row['id']}.png").convert("RGBA"), num_inference_steps=40, guidance_scale=5.0, octree_resolution=512, generator=torch.Generator(device="cpu").manual_seed(row["seed"]))[0]
    mesh.export(path)
    record = {**row, "shapeHost":"gsy0930", "gpu":int(os.environ.get("CUDA_VISIBLE_DEVICES",args.slot)), "backend":"Hunyuan3D-2.1", "steps":40,"octree":512,"shapeSha256":hashlib.sha256(path.read_bytes()).hexdigest(),"triangles":len(mesh.faces),"elapsedSeconds":round(time.time()-started,2),"state":"review","job_id":f"{root.name}-{row['id']}-shape"}
    (out / "manifest.json").write_text(json.dumps(record, ensure_ascii=False,indent=2)+"\n")
    print(f"DONE {row['id']} {len(mesh.faces)} triangles", flush=True)
    del mesh
    torch.cuda.empty_cache()
