import hashlib
import json
import pathlib
import sys
import urllib.request
import uuid

root, host, selection = pathlib.Path(sys.argv[1]), sys.argv[2], sys.argv[3].split(',')
config = json.loads((root / 'references.json').read_text(encoding='utf-8'))
record_file = root / ('jobs-' + host + '.json')
records = json.loads(record_file.read_text()) if record_file.exists() else []
for item in config['items']:
    if item['id'] not in selection or any(r['assetId'] == item['id'] for r in records):
        continue
    image = root / 'refs' / (item['id'] + '.png')
    boundary = '----forge-v7-' + uuid.uuid4().hex
    parts = []
    fields = {'asset_name':'squidward-v7-' + item['id'], 'asset_kind':'prop', 'profile':'xhs_mobile',
              'seed':str(item['seed']), 'mesh_backend':'single',
              'prompt':'依据上传的独立道具参考，保留完整厚实三维轮廓、材质配色、曲面、木纹与软包细节。不要增加背景、地板或其他物品。'}
    for key, value in fields.items():
        parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="{key}"\r\n\r\n{value}\r\n'.encode())
    parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="source"; filename="{image.name}"\r\nContent-Type: image/png\r\n\r\n'.encode()+image.read_bytes()+b'\r\n')
    parts.append(f'--{boundary}--\r\n'.encode())
    req = urllib.request.Request('http://127.0.0.1:8091/v1/jobs', data=b''.join(parts), headers={'Content-Type':'multipart/form-data; boundary='+boundary})
    with urllib.request.urlopen(req, timeout=120) as response:
        job = json.load(response)
    record = {'assetId':item['id'], 'host':host, 'referenceSHA256':hashlib.sha256(image.read_bytes()).hexdigest(), 'request':fields, 'job':job}
    records.append(record)
    record_file.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'assetId':item['id'],'host':host,'job':job},ensure_ascii=False),flush=True)
