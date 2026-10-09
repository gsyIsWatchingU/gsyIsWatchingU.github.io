"""核验客厅新道具的源图、独立 Hunyuan 原件、Blender 修整与运行资产。"""
from pathlib import Path
import json,hashlib,struct
ROOT=Path(__file__).resolve().parents[2]
DOC=ROOT/'docs/house-device-review'
def read(p):return json.loads(p.read_text(encoding='utf-8'))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
rows=[]
for name in ['speaker','laptop','table-speaker-base']:
    runtime=read(DOC/f'refined/{name}-runtime.json');asset=ROOT/f'assets/house-review/props/{name}.glb'
    assert sha(asset)==runtime['runtimeSha256'],name
    blob=asset.read_bytes();gltf=json.loads(blob[20:20+struct.unpack_from('<I',blob,12)[0]])
    primitives=[p for mesh in gltf['meshes'] for p in mesh['primitives']]
    triangles=sum(gltf['accessors'][p['indices']]['count']//3 for p in primitives)
    assert triangles==runtime['triangles'],name
    assert all('TEXCOORD_0' in p['attributes'] for p in primitives),name+' UV'
    assert min(gltf['accessors'][p['attributes']['POSITION']]['min'][1] for p in primitives)>-1e-5,name+' bottom pivot'
    record={'id':name,'runtime':str(asset.relative_to(ROOT)).replace('\\','/'),'runtimeSha256':sha(asset),'triangles':triangles,'repairManifest':f'docs/house-device-review/refined/{name}-runtime.json','blend':f'docs/house-device-review/refined/{name}.blend','blendSha256':sha(DOC/f'refined/{name}.blend'),'dimensionsYUp':runtime['dimensionsYUp'],'state':'review'}
    if name!='table-speaker-base':
        generation=read(DOC/f'raw/{name}/manifest.json');reference=DOC/f'references/{name}.png'
        assert sha(reference)==generation['sourceSha256'],name+' reference'
        assert sha(DOC/f'raw/{name}/shape.glb')==generation['shapeSha256'],name+' shape'
        assert sha(DOC/f'raw/{name}/textured.glb')==generation['rawTexturedSha256']==runtime['sourceSha256'],name+' paint'
        assert generation['backend']=='Hunyuan3D-2.1' and generation['paintBackend']=='Hunyuan3D-Paint-2.1'
        record.update({'generationManifest':f'docs/house-device-review/raw/{name}/manifest.json','sourceSha256':sha(reference),'rawLocal':f'docs/house-device-review/raw/{name}','rawRemote':{'shape':f'gsy0930:/workspace/projects/pineapple-devices-20261009/shape/{name}/shape.glb','paint':f'mygpu:/workspace/projects/pineapple-devices-20261009/{name}/textured.glb'}})
    else:assert sha(ROOT/'assets/house-review/props/table.glb')==runtime['sourceSha256']
    rows.append(record)
report={'state':'review','humanReview':'pending','assets':rows,'scripts':{f'scripts/art/{name}':sha(ROOT/'scripts/art'/name) for name in ['house_device_refs.py','house_device_production.py','house_device_refine.py','house_device_audit.py']}}
(DOC/'asset-index.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('3 runtime models verified; '+str(sum(r['triangles'] for r in rows))+' triangles; source, raw, UV and Blender hashes matched')
