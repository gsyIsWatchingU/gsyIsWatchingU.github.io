const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');

export function renderInternshipDiary(profile) {
  const work=profile.internship;
  return `<dialog class="diary-dialog" data-internship-diary aria-labelledby="diary-title">
<header class="diary-header"><div><h2 id="diary-title">实习经历</h2><p>${escape(work.company)} · ${escape(work.date)}</p><p class="diary-role"><span>${escape(work.team)}</span><span>${escape(work.role)}</span></p></div><button type="button" data-diary-close aria-label="合上日记，继续探索"></button></header>
<div class="diary-reading" tabindex="0" aria-label="实习工作与成果" data-diary-reading>${work.cases.map((item,index)=>`<article><div class="diary-case-heading"><span class="diary-case-number" aria-hidden="true">${String(index+1).padStart(2,'0')}</span><h3>${escape(item.name)}</h3></div><p>${escape(item.summary)}</p><p class="diary-result">${escape(item.summaryResult || item.result)}</p></article>`).join('')}</div>
<footer class="diary-pagination" data-diary-pagination><button type="button" data-diary-prev aria-label="上一页实习经历">← 上一页</button><span data-diary-page role="status" aria-live="polite"></span><button type="button" data-diary-next aria-label="下一页实习经历">下一页 →</button></footer>
</dialog>`;
}
