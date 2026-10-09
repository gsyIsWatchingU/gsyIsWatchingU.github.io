import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const root=resolve(import.meta.dirname,'..');
const read=name=>JSON.parse(readFileSync(resolve(root,'src/data',name),'utf8'));
const e=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const icon=p=>p.icon?`<img class="toilet-project-icon" src="${e(p.icon)}" alt="" width="44" height="44" />`:`<span class="toilet-project-icon toilet-project-monogram" aria-hidden="true">${e(p.iconText||p.label.slice(0,2))}</span>`;
const actions=p=>p.screenshotOnly?'':`<div class="toilet-card-actions">${p.actionUrl?`<a href="${e(p.actionUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${e(p.actionLabel)}：${e(p.name)}">${e(p.actionLabel)} ↗</a>`:p.source==='resume'||p.source==='product'?`<button type="button" data-toilet-resume="${e(p.source==='resume'?p.sourceId:`product-${p.sourceId}`)}">查看项目介绍 ↗</button>`:'<span class="toilet-entry-note">暂无公开入口</span>'}${p.secondaryUrl?`<a href="${e(p.secondaryUrl)}">${e(p.secondaryLabel)}</a>`:''}</div>`;

export function renderToiletProjects() {
  const house=read('pineapple-house.json'),spec=house.toiletProjects;
  if(!spec || !house.rooms.some(r=>r.id===spec.room) || !house.assets.some(a=>a.id===spec.asset&&a.room===spec.room) || !Array.isArray(spec.anchor) || spec.anchor.length!==3 || !spec.anchor.every(Number.isFinite))throw new Error('马桶项目入口配置无效');
  const profile=read('house-profile.json'),products=read('projects.json'),collection=read('house-project-collection.json');
  const ids=new Set();
  const items=collection.map(item=>{
    const base=item.source==='resume'?profile.projects.find(p=>p.id===item.sourceId):item.source==='product'?products.find(p=>p.id===item.sourceId):item;
    if(!base||ids.has(item.id)||!item.label||!base.tech?.length)throw new Error(`项目集配置无效：${item.id}`);
    ids.add(item.id);
    const project={...base,...item,description:base.description||base.problem};
    project.actionUrl=item.actionUrl||(item.source==='product'&&profile.verifiedDemoIds.includes(base.id)?base.entryUrl:null);
    project.actionLabel=item.actionLabel||'直达网站';
    if(project.actionUrl&&!/^https:\/\//.test(project.actionUrl))throw new Error(`项目入口必须使用 HTTPS：${item.id}`);
    if(item.source==='product'&&!item.name)project.name=base.name;
    return project;
  });
  return `<div class="toilet-effects" data-toilet-effects hidden aria-label="马桶弹出的物品"></div>
<section id="toilet-project-collection" class="toilet-panel" data-toilet-panel hidden role="dialog" aria-modal="false" aria-labelledby="toilet-title" data-phase="idle">
  <header class="toilet-header"><div><p>💩 极品项目 · ${items.length} 个项目</p><h2 id="toilet-title">项目集</h2></div><button type="button" data-toilet-close aria-label="关闭项目集，保留弹出物品">收起 ×</button></header>
  <div class="toilet-content" data-toilet-content hidden>
    <p class="toilet-description">按项目阅读，查看实现与成果。</p>
    <nav class="toilet-filters" aria-label="项目分类">${items.map((p,i)=>`<button type="button" data-toilet-filter="${e(p.id)}" aria-pressed="${i===0}" aria-controls="toilet-project-${e(p.id)}">${icon(p)}<span>${e(p.label)}</span></button>`).join('')}</nav>
    <div class="toilet-projects" aria-label="项目内容">${items.map((p,i)=>`<article id="toilet-project-${e(p.id)}" class="toilet-card" data-toilet-card data-project="${e(p.id)}"${i?' hidden':''}><p class="toilet-card-kind">${e(p.status||p.stage)}${p.date?` · ${e(p.date)}`:''}</p><header class="toilet-project-heading">${icon(p)}<h3>${e(p.name)}</h3></header>${actions(p)}${p.screenshotOnly?p.image?`<a class="toilet-screenshot-link" href="${e(p.image)}" target="_blank" rel="noopener" aria-label="查看 ${e(p.name)} 应用界面大图"><img class="toilet-project-image" src="${e(p.image)}" alt="${e(p.imageAlt)}" loading="lazy" /><span>查看界面大图 ↗</span></a>`:'':''}${p.entryNote?`<p class="toilet-entry-note">${e(p.entryNote)}</p>`:''}${p.role?`<p class="toilet-card-summary">${e(p.role)}</p>`:''}<p class="toilet-card-summary">${e(p.description)}</p><div class="toilet-card-tech">${p.tech.map(t=>`<span>${e(t)}</span>`).join('')}</div>${p.source==='resume'?`<dl class="toilet-card-proof"><dt>我的贡献</dt><dd>${e(p.work)}</dd><dt>结果</dt><dd>${e(p.result)}</dd></dl>${p.note?`<p class="toilet-card-summary">${e(p.note)}</p>`:''}`:`${p.heroFeature?`<p class="toilet-card-summary"><strong>${e(p.heroFeature.label)}</strong>：${e(p.heroFeature.text)}</p>`:''}<dl class="toilet-card-proof">${p.proofs.map(f=>`<dt>${e(f.label)}</dt><dd>${e(f.text)}</dd>`).join('')}</dl>`}${p.screenshotOnly?'':p.image?`<a class="toilet-screenshot-link" href="${e(p.image)}" target="_blank" rel="noopener" aria-label="查看 ${e(p.name)} 应用界面大图"><img class="toilet-project-image" src="${e(p.image)}" alt="${e(p.imageAlt)}" loading="lazy" /><span>查看界面大图 ↗</span></a>`:''}</article>`).join('')}</div>
  </div>
</section>`;
}
