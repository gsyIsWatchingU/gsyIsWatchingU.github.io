"""保留旧输入，以颜色及位置清理误混入红椅参考的背景。"""
from pathlib import Path
from PIL import Image
import colorsys
import hashlib
import json
ROOT=Path(__file__).resolve().parents[2]
folder=ROOT/"docs/house-review/sources"
image=Image.open(folder/"chair.png").convert("RGBA")
bounds=image.getbbox();threshold=bounds[1]+(bounds[3]-bounds[1])*.71
px=image.load()
for y in range(image.height):
    for x in range(image.width):
        r,g,b,a=px[x,y]
        if not a:continue
        h,s,v=colorsys.rgb_to_hsv(r/255,g/255,b/255)
        keep=(h<.13 and s>.28 and v>.22) or (y>threshold and v>.49 and (s<.38 or .52<h<.78))
        if not keep:px[x,y]=(r,g,b,0)
image.save(folder/"chair-v2.png")
row=json.loads((folder/"references.json").read_text(encoding="utf-8"))[0]
row.update({"reference":"docs/house-review/sources/chair-v2.png","referenceSha256":hashlib.sha256((folder/"chair-v2.png").read_bytes()).hexdigest(),"seed":20261109,"preprocessing":{"parentReference":"docs/house-review/sources/chair.png","remove":"blue/green background outside lower life ring","revision":2}})
(folder/"chair-v2-reference.json").write_text(json.dumps([row],ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("clean chair reference prepared")
