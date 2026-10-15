"""在指定 Forge3D 主机提交/查询客厅家具候选，保留请求，防止重复提交。"""
import argparse
import hashlib
import json
from pathlib import Path
import urllib.request
import uuid

parser = argparse.ArgumentParser()
parser.add_argument('root', type=Path)
parser.add_argument('host')
parser.add_argument('asset', choices=['sofa', 'shell'])
args = parser.parse_args()
root = args.root
record_path = root / f'{args.asset}-job.json'
if record_path.exists():
    record = json.loads(record_path.read_text(encoding='utf-8'))
else:
    source = root / f'{args.asset}.png'
    fields = {
        'asset_name': f'pineapple-living-{args.asset}-20261015',
        'asset_kind': 'prop', 'profile': 'xhs_mobile',
        'seed': '20261015' if args.asset == 'sofa' else '20261016',
        'mesh_backend': 'single',
        'prompt': {
            'sofa': '按独立参考生成完整厚实的低沙发：三根浅绿色横向圆管叠成靠背，两道红棕绑带，顶部两个绳圈，一整块厚蓝色坐垫连接在靠背前方。保留圆润织物曲面、凹点缝线和真实体积，无传统扶手，无高腿，无地面背景。',
            'shell': '按独立参考生成完整紫色螺旋海螺贝壳，水平侧卧，左侧细螺旋尖塔，右侧饱满螺房及张开的椭圆壳口，奶白外翻薄壳唇，深紫内腔，微妙珍珠光与自然螺纹。是有机贝壳，无电子零件、音响网格、桌子或背景。',
        }[args.asset],
    }
    boundary = '----living-' + uuid.uuid4().hex
    parts = [f'--{boundary}\r\nContent-Disposition: form-data; name="{key}"\r\n\r\n{value}\r\n'.encode() for key, value in fields.items()]
    parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="source"; filename="{source.name}"\r\nContent-Type: image/png\r\n\r\n'.encode() + source.read_bytes() + b'\r\n')
    parts.append(f'--{boundary}--\r\n'.encode())
    request = urllib.request.Request('http://127.0.0.1:8091/v1/jobs', data=b''.join(parts), headers={'Content-Type': 'multipart/form-data; boundary=' + boundary})
    with urllib.request.urlopen(request, timeout=120) as response:
        job = json.load(response)
    record = {'asset': args.asset, 'host': args.host, 'sourceSHA256': hashlib.sha256(source.read_bytes()).hexdigest(), 'request': fields, 'job': job, 'humanReview': 'pending'}
    record_path.write_text(json.dumps(record, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
job_id = record['job']['job_id']
with urllib.request.urlopen('http://127.0.0.1:8091/v1/jobs/' + job_id, timeout=30) as response:
    current = json.load(response)
(root / f'{args.asset}-status.json').write_text(json.dumps(current, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'asset': args.asset, 'host': args.host, 'jobId': job_id, 'status': current}, ensure_ascii=False), flush=True)
