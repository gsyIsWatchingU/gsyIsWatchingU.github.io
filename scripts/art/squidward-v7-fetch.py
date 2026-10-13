"""下载本轮指定任务的来源、预览、日志及网格，不修改远端流水线状态。"""
import json,pathlib,subprocess
root=pathlib.Path(__file__).resolve().parents[2]
out=root/'tmp/v7-production/jobs';out.mkdir(parents=True,exist_ok=True)
jobs={'gsy013':{'armchair':'9841e667186e4f92a3b1aa6d500793f9','bed':'5935250665b245adb4ccd592c4856f8b','bookshelf':'3d80f102032244919e68ab83bda5cddf','old-tv':'77b9ac8abbfc4879804fe8c67dd5dcf7'},'mygpu':{'sofa':'270e7eef51da43dd9d38fda1e942eb23','bathtub':'d84ca85345044a4093acf1679b0f0f00','old-tv-failed':'9e5b28f403f347f9a9967a4cdc54df58','plant':'767f6d4092c0453bb08c85a89f83db39'}}
def fetch(host,remote,local):
 subprocess.run(['scp',host+':'+remote,str(local)],check=True,timeout=120)
for host,items in jobs.items():
 for asset,job in items.items():
  target=out/asset;target.mkdir(exist_ok=True)
  fetch(host,f'/workspace/3d-assets/jobs/{job}/manifest.json',target/'manifest.json')
  manifest=json.loads((target/'manifest.json').read_text(encoding='utf-8'))
  if manifest['state'] not in ('review','failed','completed'):print(asset,manifest['state']);continue
  fetch(host,f'/workspace/3d-assets/jobs/{job}/pipeline.log',target/'pipeline.log')
  outputs=manifest.get('outputs',{})
  if outputs.get('preview'):fetch(host,outputs['preview'],target/'preview.png')
  mesh=outputs.get('game_asset') or outputs.get('shape_mesh')
  if mesh:fetch(host,mesh,target/'candidate.glb')
  print(asset,manifest['state'],flush=True)
