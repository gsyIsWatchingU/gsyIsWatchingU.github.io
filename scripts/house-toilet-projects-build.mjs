import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const root=resolve(import.meta.dirname,'..');
const read=name=>JSON.parse(readFileSync(resolve(root,'src/data',name),'utf8'));
const e=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');

export function renderToiletProjects() {
  const house=read('pineapple-house.json'),spec=house.toiletProjects;
  if(!spec || !house.rooms.some(r=>r.id===spec.room) || !house.assets.some(a=>a.id===spec.asset&&a.room===spec.room) || !Array.isArray(spec.anchor) || spec.anchor.length!==3 || !spec.anchor.every(Number.isFinite))throw new Error('马桶项目入口配置无效');
  const profile=read('house-profile.json'),products=read('projects.json');
  const items=[...profile.projects.map(p=>({...p,target:p.id,group:'resume',description:p.result})),
    ...products.map(p=>({...p,target:`product-${p.id}`,group:'personal',demo:profile.verifiedDemoIds.includes(p.id)}))];
  return `<div class="toilet-effects" data-toilet-effects hidden aria-hidden="true"></div>
<section class="toilet-panel" data-toilet-panel hidden role="dialog" aria-modal="false" aria-labelledby="toilet-title" data-phase="idle">
  <header class="toilet-header"><div><p>💩 憋了很久，终于做出来了</p><h2 id="toilet-title">憋出来的项目</h2></div><button type="button" data-toilet-clean aria-label="一键打扫憋出来的项目"><span aria-hidden="true">🧹</span> 一键打扫</button></header>
  <div class="toilet-intro" data-toilet-intro><p role="status" data-toilet-status>不用的脑花，先丢掉…</p><button type="button" data-toilet-skip>直接看项目 →</button></div>
  <div class="toilet-content" data-toilet-content hidden>
    <p class="toilet-description">简历项目、独立产品与可体验演示。</p>
    <nav class="toilet-filters" aria-label="筛选马桶项目"><button type="button" data-toilet-filter="all" aria-pressed="true">全部 ${items.length}</button><button type="button" data-toilet-filter="resume" aria-pressed="false">简历 ${profile.projects.length}</button><button type="button" data-toilet-filter="personal" aria-pressed="false">独立产品 ${products.length}</button><button type="button" data-toilet-filter="demo" aria-pressed="false">可体验 ${items.filter(p=>p.demo).length}</button></nav>
    <div class="toilet-projects" aria-label="项目列表">${items.map((p,i)=>`<article class="toilet-card" data-toilet-card data-group="${p.group}" data-demo="${Boolean(p.demo)}" style="--card-delay:${Math.min(i,4)*45}ms"><p class="toilet-card-kind">${p.group==='resume'?'简历项目':p.demo?'独立产品 · 演示入口':profile.unavailableDemoIds.includes(p.id)?'独立产品 · 入口维护中':'独立产品 · 界面展示'}</p><h3>${e(p.name)}</h3><p class="toilet-card-summary">${e(p.description)}</p><div class="toilet-card-tech">${p.tech.slice(0,3).map(t=>`<span>${e(t)}</span>`).join('')}</div><div class="toilet-card-actions"><button type="button" data-toilet-project="${e(p.target)}">查看项目 ↗</button>${p.demo?`<a href="${e(p.entryUrl)}" target="_blank" rel="noopener noreferrer">进入演示 ↗</a>`:''}</div></article>`).join('')}</div>
  </div>
</section>`;
}
