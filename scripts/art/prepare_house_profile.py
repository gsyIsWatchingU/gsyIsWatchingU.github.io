"""真实证书缩略图与来源清单；原图、简历、字体逐字节保留。"""
from pathlib import Path
from PIL import Image, ImageOps
import hashlib, json, shutil, math

ROOT = Path(__file__).resolve().parents[2]
DESKTOP = Path('C:/Users/Administrator/Desktop')
OUT = ROOT / 'assets/house-profile'
OUT.mkdir(parents=True, exist_ok=True)
items = [
    ('national-2021', '国家励志奖学金2021.jpg', '国家励志奖学金', '2020—2021 学年', 90, (.045,.235,.97,.955)),
    ('national-2023', '国家励志奖学金2023.jpg', '国家励志奖学金', '2022—2023 学年', 90, (.01,.19,.99,.975)),
    ('math-2022', '全国大学生数学竞赛.jpg', '全国大学生数学竞赛 · 一等奖', '第十四届 · 非数学类', 90, (.01,.14,.99,.9)),
    ('holtek-2023', '合泰杯2023.jpg', '合泰杯 · 一等奖', '2023 年单片机应用设计竞赛', 90, (.03,.13,.985,.89)),
    ('mathorcup-2022', 'mathorcup高校数模挑战赛.jpg', 'MathorCup · 三等奖', '2022 年 · 本科生组', 90, (.035,.16,.97,.94)),
    ('scholarship-2022', '一等奖学金2022.jpg', '一等奖学金', '2021—2022 学年', 0, (.015,.11,.98,.88)),
    ('graduate-2024', '优秀毕业生2024.jpg', '优秀毕业生', '西南大学 · 2024 年', 0, (.015,.14,.98,.875)),
    ('merit-2021', '校三好2021.jpg', '三好学生', '2020—2021 学年', 90, (.055,.035,.79,.995)),
    ('merit-2022', '校三好2022.jpg', '三好学生', '2021—2022 学年', 0, (.015,.2,.985,.95)),
    ('league-2021', '优秀共青团员2021.jpg', '优秀共青团员', '2020 年度 · 西南大学', 90, (.0,.145,.98,.93)),
    ('union-2021', '学生会2021.jpg', '学生会工作经历 · 聘书', '院学生会宣传部部长 · 2020.09—2021.06', 90, (.005,.11,.985,.94)),
]
records = []
for id, filename, title, detail, rotation, crop in items:
    src = DESKTOP / '郭书羽/award' / filename
    original = OUT / f'{id}-original.jpg'
    shutil.copyfile(src, original)
    im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
    box = tuple(round(v * (im.width if i%2==0 else im.height)) for i,v in enumerate(crop))
    im = im.crop(box).rotate(rotation, expand=True)
    im.thumbnail((640,640), Image.Resampling.LANCZOS)
    thumb = OUT / f'{id}.jpg'
    im.save(thumb, quality=86, optimize=True)
    records.append(dict(id=id,title=title,detail=detail,sourceName=filename,
        sourceSHA256=hashlib.sha256(src.read_bytes()).hexdigest(),
        thumbnail=f'./assets/house-profile/{thumb.name}',original=f'./assets/house-profile/{original.name}',
        width=im.width,height=im.height,rotation=rotation,crop=list(crop)))
sources = []
for filename, target in [('香焦闻雪灵感体.ttf','handwriting.ttf'), ('AI全栈开发工程师-郭书羽-0923.pdf','resume.pdf')]:
    src = DESKTOP / filename; shutil.copyfile(src, OUT / target)
    sources.append(dict(sourceName=filename,url=f'./assets/house-profile/{target}',sourceSHA256=hashlib.sha256(src.read_bytes()).hexdigest()))
(ROOT/'src/data/house-awards.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(OUT/'sources.json').write_text(json.dumps(dict(awards=records,documents=sources),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
house_file = ROOT/'src/data/pineapple-house.json'
house_text = house_file.read_text(encoding='utf-8')
displays = []
for i,a in enumerate(records):
    width=min(.43 if i<9 else .5,.48*a['width']/a['height'])
    height=width*a['height']/a['width']
    if i<9:
        x=[-3.86,-3.38,-2.90][i%3]; y=[1.43,2.02,2.61][i//3]
        r=4.7*math.sqrt(max(.01,1-((y-3)/7.3)**2))-.28
        z=-(.72*math.sqrt(max(.02,r*r-x*x))-.035)
        nx,nz=-x/(r*r),-z/(r*.72)**2
        length=math.hypot(nx,nz);nx/=length;nz/=length
        position=[x+nx*.06,y,z+nz*.06];normal=[nx,0,nz]
    else:position=[-2.66,1.91+(i-9)*.61,-1.30];normal=[-1,0,0]
    displays.append(dict(id=a['id'],kind='award',room='storage',level=0,
        position=[round(n,5) for n in position],normal=[round(n,5) for n in normal],size=[round(width,5),round(height,5)]))
products=json.loads((ROOT/'src/data/projects.json').read_text(encoding='utf-8'))
for i,p in enumerate(products):
    y=3.28+i*.43+.19;r=4.7*math.sqrt(1-((y-3)/7.3)**2)-.3
    displays.append(dict(id=p['id'],kind='project',room='library',level=1,
        position=[round(r-.42,5),round(y,5),.075],normal=[0,0,1],size=[.6,.3]))
base=house_text.split(',\n  "displays":')[0] if ',\n  "displays":' in house_text else house_text.rstrip()[:-1].rstrip()
rows=',\n'.join('    '+json.dumps(d,ensure_ascii=False,separators=(',',': ')) for d in displays)
house_file.write_text(base+',\n  "displays": [\n'+rows+'\n  ]\n}\n',encoding='utf-8')
print('11 张真实证书、原图与 SHA-256 已保存；仅缩略图裁切和转正。')
