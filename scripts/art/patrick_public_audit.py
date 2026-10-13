"""发布后逐字节核对 Git 提交中的页面、bundle、模型与画作。"""
from pathlib import Path
from urllib.request import Request, urlopen
import hashlib, json, subprocess, time
root=Path(__file__).resolve().parents[2]
files=['patrick-house.html','assets/patrick-house.js','styles/patrick-house.css']
files += [p.relative_to(root).as_posix() for p in (root/'assets/patrick-reference').rglob('*') if p.is_file()]
commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip()
expected={p:hashlib.sha256(subprocess.check_output(['git','show',f'HEAD:{p}'],cwd=root)).hexdigest() for p in files}
for attempt in range(24):
    results=[]
    for path in files:
        url='https://gsyiswatchingu.github.io/'+path+'?v=20261013-reference2&t='+str(int(time.time()))
        try:
            with urlopen(Request(url,headers={'Cache-Control':'no-cache'}),timeout=20) as r:
                raw=r.read();status=r.status
            sha=hashlib.sha256(raw).hexdigest()
            results.append(dict(path=path,status=status,sha256=sha,expected=expected[path],matched=sha==expected[path],bytes=len(raw)))
        except Exception as e:results.append(dict(path=path,matched=False,error=str(e)))
    print('PUBLIC_BYTES',sum(r['matched'] for r in results),'/',len(files),'attempt',attempt+1,flush=True)
    if all(r['matched'] for r in results):
        out=root/'docs/patrick-house-review/reference-20261013/public-resources.json'
        out.write_text(json.dumps(dict(commit=commit,version='20261013-reference2',files=results),indent=2)+'\n',encoding='utf-8');break
    time.sleep(10)
else:raise RuntimeError('Published files have not converged to the committed bytes')
