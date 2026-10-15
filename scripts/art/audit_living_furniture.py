"""核对参考、运行模型、纹理与来源；自动检查不代替视觉批准。"""
import hashlib
import io
import json
from pathlib import Path
import struct
from PIL import Image, ImageStat

root = Path(__file__).resolve().parents[2]
folder = root / 'docs/living-furniture-review'
def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()
references = []
for image in sorted((folder / 'sources').glob('*.png')):
    with Image.open(image) as decoded:
        references.append({'file': image.relative_to(root).as_posix(), 'sha256': sha(image), 'size': list(decoded.size), 'mode': decoded.mode, 'purpose': '用户原图' if image.name.startswith('user-') else 'ImageGen 单件参考'})
assets = []
for asset, width in [('sofa', 1.76), ('shell', .58)]:
    runtime = root / 'assets/living-furniture-review' / (asset + '.glb')
    data = runtime.read_bytes()
    magic, version, length = struct.unpack_from('<III', data)
    assert magic == 0x46546C67 and version == 2 and length == len(data)
    chunks = {}; offset = 12
    while offset < length:
        size, kind = struct.unpack_from('<II', data, offset); offset += 8
        chunks[kind] = data[offset:offset+size]; offset += size
    model = json.loads(chunks[0x4E4F534A]); binary = chunks[0x004E4942]
    accessors = model['accessors']; triangles = 0; lows = []; highs = []
    for mesh in model['meshes']:
        for primitive in mesh['primitives']:
            attributes = primitive['attributes']
            assert 'NORMAL' in attributes and 'TEXCOORD_0' in attributes
            position = accessors[attributes['POSITION']]
            lows.append(position['min']); highs.append(position['max'])
            triangles += accessors[primitive['indices']]['count'] // 3 if 'indices' in primitive else position['count'] // 3
    low = [min(item[i] for item in lows) for i in range(3)]
    high = [max(item[i] for item in highs) for i in range(3)]
    assert 0 < triangles <= 30000 and abs(low[1]) < .001
    assert abs(high[0] - low[0] - width) < .001
    assert not model.get('skins') and all('baseColorTexture' in material['pbrMetallicRoughness'] for material in model['materials'])
    textures = []
    for image in model['images']:
        view = model['bufferViews'][image['bufferView']]; start = view.get('byteOffset', 0)
        with Image.open(io.BytesIO(binary[start:start+view['byteLength']])) as decoded:
            stat = ImageStat.Stat(decoded.convert('RGB'))
            assert max(decoded.size) <= 1024
            textures.append({'size': list(decoded.size), 'stddev': [round(value, 3) for value in stat.stddev]})
    assert any(max(texture['stddev']) > 10 for texture in textures)
    manifest = json.loads((folder / 'production' / asset / 'manifest.json').read_text(encoding='utf-8'))
    normalization = json.loads((folder / 'production' / asset / 'runtime.json').read_text(encoding='utf-8'))
    assert sha(runtime) == normalization['runtimeSHA256']
    source = folder / 'sources' / ('sofa-clean.png' if asset == 'sofa' else 'shell.png')
    assert sha(source) == manifest['source_sha256']
    assets.append({'asset': asset, 'runtime': runtime.relative_to(root).as_posix(), 'runtimeSHA256': sha(runtime), 'bytes': len(data), 'triangles': triangles, 'bounds': {'min': low, 'max': high}, 'textures': textures, 'jobId': manifest['job_id'], 'seed': manifest['seed'], 'pipelineState': manifest['state'], 'qualityGates': manifest.get('quality_gates', {}), 'automaticMeshTextureChecks': 'passed', 'humanReview': 'pending'})
record = {'state': 'review', 'humanReview': 'pending', 'references': references, 'assets': assets, 'fleet': {'gsy013/GPU0': '专用 L20 UUID 固定，生成沙发', 'gsy0901/GPU0': '现有 ASR，不占用', 'gsy0901/GPU1': 'L20 生成贝壳', 'gsy0930/GPU0-3': 'SSH 独立信任记录不可用，未使用；未绕过主机校验'}, 'rejected': [{'jobId': '0b0d02832f264418886227dd59ae653c', 'reason': '参考光晕生成背景薄板；真实浏览器侧面检查拒绝，不用于候选运行模型'}], 'limits': ['待用户视觉审看', '贝壳原始流水线保留 render_white_patch_risk 告警', '未测手机实机性能', '音乐仅验证原入口与面板开关，未在本轮验证外部曲目可播放性']}
(folder / 'provenance.json').write_text(json.dumps(record, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'assets': [{key: asset[key] for key in ['asset', 'triangles', 'bytes', 'pipelineState', 'automaticMeshTextureChecks']} for asset in assets]}, ensure_ascii=False))
