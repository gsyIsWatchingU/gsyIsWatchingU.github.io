const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');

export function renderInternshipDiary(profile) {
  const work=profile.internship;
  return `<dialog class="diary-dialog" data-internship-diary aria-labelledby="diary-title">
<header class="diary-header"><div><p>${escape(work.company)} · ${escape(work.date)}</p><h2 id="diary-title">实习经历</h2><p class="diary-role">${escape(work.team)} · ${escape(work.role)}</p></div><button type="button" data-diary-close aria-label="合上日记，继续探索">合上日记</button></header>
<div class="diary-reading" tabindex="0" aria-label="实习工作与成果" data-diary-reading>${work.cases.map(item=>`<article><h3>${escape(item.name)}</h3><p>${escape(item.summary)}</p><p class="diary-result">${escape(item.summaryResult || item.result)}</p></article>`).join('')}</div>
<footer class="diary-pagination" data-diary-pagination><button type="button" data-diary-prev aria-label="上一页实习经历">← 上一页</button><span data-diary-page role="status" aria-live="polite"></span><button type="button" data-diary-next aria-label="下一页实习经历">下一页 →</button></footer>
</dialog>`;
}
