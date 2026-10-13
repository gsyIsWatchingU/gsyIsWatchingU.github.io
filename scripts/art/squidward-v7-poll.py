import json
import pathlib
import sys
import urllib.request
root, host = pathlib.Path(sys.argv[1]), sys.argv[2]
records=json.loads((root/('jobs-'+host+'.json')).read_text(encoding='utf-8'))
latest=[]
for record in records:
    job_id=record['job']['job_id']
    with urllib.request.urlopen('http://127.0.0.1:8091/v1/jobs/'+job_id,timeout=20) as response:job=json.load(response)
    record['job']=job;latest.append(record)
    (root/'jobs'/(record['assetId']+'-manifest.json')).write_text(json.dumps(job,ensure_ascii=False,indent=2),encoding='utf-8')
    running=[s['name'] for s in job['stages'] if s['state']=='running']
    print(json.dumps({'asset':record['assetId'],'job':job_id,'state':job['state'],'stage':running,'error':job.get('error'),'outputs':job.get('outputs',{}) if job['state'] in ('review','completed','failed') else {}},ensure_ascii=False))
(root/('jobs-'+host+'.json')).write_text(json.dumps(latest,ensure_ascii=False,indent=2),encoding='utf-8')
