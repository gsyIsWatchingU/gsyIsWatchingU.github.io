"""核对六件运行时 GLB 的来源哈希、嵌入贴图、网格与动画。"""
from pathlib import Path
from PIL import Image
from io import BytesIO
import struct, json, hashlib
root=Path(__file__).resolve().parents[2]
review=root/'docs/patrick-house-review/reference-20261013'
rows=[]
for name in ['patrick','armchair','bed','fridge','stove','old-tv']:
    path=root/f'assets/patrick-reference/models/{name}.glb'
    raw=path.read_bytes();magic,version,length=struct.unpack_from('<III',raw);assert magic==0x46546c67 and version==2 and length==len(raw)
    n,kind=struct.unpack_from('<II',raw,12);doc=json.loads(raw[20:20+n]);binStart=20+n+8;binary=raw[binStart:]
    meta=json.loads((review/f'manifests/{name}-runtime.json').read_text(encoding='utf-8'))
    stages=json.loads((review/f'manifests/{name}.json').read_text(encoding='utf-8'))
    assert hashlib.sha256(raw).hexdigest()==meta['runtimeSHA256']
    assert meta['rawSHA256']==stages['texturedSHA256']
    assert hashlib.sha256((review/f'sources/{name}/reference.png').read_bytes()).hexdigest()==stages['sourceSHA256']
    assert not any(b.get('uri') for b in doc.get('buffers',[]))
    textures=[]
    for image in doc.get('images',[]):
        assert 'bufferView' in image and 'uri' not in image
        view=doc['bufferViews'][image['bufferView']];start=view.get('byteOffset',0)
        im=Image.open(BytesIO(binary[start:start+view['byteLength']]))
        assert max(im.size)<=1024
        textures.append(list(im.size))
    triangles=sum(doc['accessors'][p['indices']]['count']//3 for m in doc['meshes'] for p in m['primitives'])
    assert triangles<=30000,(name,triangles)
    clips=[a['name'] for a in doc.get('animations',[])]
    bones=max([len(s['joints']) for s in doc.get('skins',[])],default=0)
    if name=='patrick':assert bones==9 and set(clips)=={'idle','wave'}
    rows.append(dict(id=name,bytes=len(raw),sha256=meta['runtimeSHA256'],triangles=triangles,embeddedTextures=textures,bones=bones,animations=clips,status='review'))
(review/'asset-audit.json').write_text(json.dumps(rows,indent=2)+'\n',encoding='utf-8')
print('ASSET_AUDIT',len(rows),'PASS',sum(r['triangles'] for r in rows),'triangles')
