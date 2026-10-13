"""检查章鱼哥参考图的真实前景蒙版，再提交一次 Forge3D。"""
from pathlib import Path
import hashlib
import json
import urllib.request
import subprocess
import numpy as np
from PIL import Image
from rembg import remove

root = Path('/workspace/3d-assets/inputs/squidward-bunny-20261013')
source = root / 'reference.png'
rgba = remove(Image.open(source).convert('RGB')).convert('RGBA')
mask = rgba.getchannel('A')
fg = np.asarray(mask) > 127
ys, xs = np.where(fg)
ratio = float(fg.mean())
assert 0.01 < ratio < 0.95, f'Invalid foreground ratio {ratio}'
bbox = [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())]
assert bbox[0] > 4 and bbox[1] > 4 and bbox[2] < rgba.width - 4 and bbox[3] < rgba.height - 4, bbox
rgba.save(root / 'source.png')
mask.save(root / 'mask.png')
record = {'sourceSHA256': hashlib.sha256(source.read_bytes()).hexdigest(), 'preparedSHA256': hashlib.sha256((root / 'source.png').read_bytes()).hexdigest(), 'foregroundRatio': ratio, 'foregroundBBox': bbox, 'imageSize': list(rgba.size), 'maskValid': True}
(root / 'input-check.json').write_text(json.dumps(record, indent=2) + '\n')
print(json.dumps(record), flush=True)
job_path = root / 'job.json'
if job_path.exists():
    print(job_path.read_text(), flush=True)
else:
    prompt = '参考图中的兔耳帽装扮章鱼哥，青绿色皮肤，半睁黄色红瞳眼睛、长鼻子，棕色双马尾，白兔垂耳帽，粉色短上衣，粉紫蓝三层波浪裙，右手握蓝紫夹板，左手插腰，双腿与触足完整。完整单角色圆润连续曲面，真实手绘贴图，保留所有配饰与五官，不增加物件。'
    result = subprocess.run(['curl', '-fsS', '-X', 'POST', 'http://127.0.0.1:8091/v1/jobs', '-F', f'source=@{root / "source.png"}', '-F', 'asset_name=squidward-bunny-20261013', '-F', 'asset_kind=character', '-F', 'profile=xhs_mobile', '-F', 'seed=2026101301', '-F', f'prompt={prompt}'], check=True, capture_output=True, text=True)
    data = json.loads(result.stdout)
    job_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(data, ensure_ascii=False), flush=True)
