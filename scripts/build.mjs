import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildSync } from "esbuild";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = join(projectRoot, "src");
const includePattern = /^[\t ]*<!-- @include ([^\s]+) -->[\t ]*$/gm;
const projectOverviewPattern = /^[\t ]*<!-- @project-overview -->[\t ]*$/gm;
const projectDetailPattern = /^[\t ]*<!-- @project-detail ([a-z0-9-]+) -->[\t ]*$/gm;
const entries = ["index.html", "playground.html"];
const projects = JSON.parse(readFileSync(join(sourceRoot, "data", "projects.json"), "utf8"));
const galaxyOutput = join(projectRoot, "assets", "galaxy.js");

buildSync({
  entryPoints: [join(projectRoot, "scripts", "galaxy.js")],
  outfile: galaxyOutput,
  bundle: true,
  minify: true,
  format: "esm",
  target: ["es2020"],
  legalComments: "inline",
  logLevel: "silent",
});
writeFileSync(
  galaxyOutput,
  readFileSync(galaxyOutput, "utf8").replace(/[\t ]+$/gm, "").replace(/^ +\t/gm, "\t"),
  "utf8",
);

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const renderProjectOverview = () => {
  const slides = projects
    .map((project, index) => {
      const hasEntry = typeof project.entryUrl === "string" && project.entryUrl.trim();
      const techItems = project.tech.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
      const hasDetail = Array.isArray(project.gallery) && project.gallery.length >= 2;
      const action = hasEntry
        ? `<a class="project-overview__link magnetic" href="${escapeHtml(project.entryUrl)}" target="_blank" rel="noreferrer" tabindex="${index === 0 ? "0" : "-1"}">
                  ${escapeHtml(project.entryLabel)} <span aria-hidden="true">↗</span>
                </a>`
        : hasDetail
          ? `<div class="project-overview__actions">
                  <a class="project-overview__link magnetic" href="#project-${escapeHtml(project.id)}" tabindex="${index === 0 ? "0" : "-1"}">
                    查看项目详情 <span aria-hidden="true">↓</span>
                  </a>
                  <span class="project-overview__availability" aria-label="私有演示，不开放下载">
                    <b>PRIVATE DEMO</b><span>不开放下载</span>
                  </span>
                </div>`
          : `<span class="project-overview__availability" aria-label="私有演示，不开放下载">
                  <b>PRIVATE DEMO</b><span>不开放下载</span>
                </span>`;
      return `              <article class="project-overview__slide project-overview__slide--${escapeHtml(project.tone)}" data-overview-slide role="group" aria-roledescription="幻灯片" aria-label="${index + 1} / ${projects.length} · ${escapeHtml(project.name)}" aria-hidden="${index === 0 ? "false" : "true"}">
                <span class="project-overview__icon" aria-hidden="true">
                  <img src="${escapeHtml(project.icon)}" alt="" width="1024" height="1024" loading="${index === 0 ? "eager" : "lazy"}" />
                </span>
                <header class="project-overview__title">
                  <p><span>${escapeHtml(project.number)}</span>${escapeHtml(project.kicker)}</p>
                  <h3>${escapeHtml(project.name)}</h3>
                  <small>${escapeHtml(project.englishName)}</small>
                </header>
                <p class="project-overview__description">${escapeHtml(project.description)}</p>
                <div class="project-overview__details">
                  <section class="project-overview__feature" aria-label="核心功能">
                    <span>核心功能</span>
                    <strong>${escapeHtml(project.heroFeature.label)}</strong>
                    <p>${escapeHtml(project.heroFeature.text)}</p>
                  </section>
                  <section class="project-overview__stack" aria-label="技术栈">
                    <span>技术栈</span>
                    <div>${techItems}</div>
                  </section>
                </div>
                ${action}
              </article>`;
    })
    .join("\n");
  const dots = projects
    .map(
      (project, index) =>
        `<button type="button" data-overview-dot="${index}" aria-label="查看 ${escapeHtml(project.name)}" aria-current="${index === 0 ? "true" : "false"}"><i></i></button>`,
    )
    .join("");

  return `          <div class="project-overview reveal" data-project-overview role="region" aria-roledescription="轮播" aria-label="项目名称、功能与技术栈概览" tabindex="0">
            <div class="project-overview__viewport" data-overview-viewport>
              <div class="project-overview__track" data-overview-track>
${slides}
              </div>
            </div>
            <footer class="project-overview__controls">
              <button type="button" data-overview-prev aria-label="上一个项目">←</button>
              <div class="project-overview__dots" aria-label="选择项目">${dots}</div>
              <span data-overview-status aria-live="polite">01 / ${String(projects.length).padStart(2, "0")}</span>
              <button type="button" data-overview-next aria-label="下一个项目">→</button>
              <button type="button" data-overview-toggle aria-label="暂停自动轮播" title="暂停自动轮播">Ⅱ</button>
            </footer>
          </div>`;
};

const renderProjectDetail = (projectId) => {
  const project = projects.find((item) => item.id === projectId);
  if (!project) {
    throw new Error(`找不到项目详情：${projectId}`);
  }

  const proofs = project.proofs
    .map(
      (proof) => `                    <div class="product-proof">
                      <span>${escapeHtml(proof.label)}</span>
                      <p>${escapeHtml(proof.text)}</p>
                    </div>`,
    )
    .join("\n");
  const techItems = project.tech.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  const gallery = Array.isArray(project.gallery) ? project.gallery : [];
  if (gallery.length < 2) {
    throw new Error(`项目 ${projectId} 的详情展示至少需要 2 张截图`);
  }

  const slides = gallery
    .map(
      (item, index) => `                      <figure class="product-carousel__slide" data-carousel-slide aria-hidden="${index === 0 ? "false" : "true"}">
                        <div class="product-carousel__media">
                          <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}" width="${item.width}" height="${item.height}" loading="${index === 0 ? "eager" : "lazy"}" />
                        </div>
                        <figcaption><b>${escapeHtml(item.label)}</b><span>${escapeHtml(item.caption)}</span></figcaption>
                      </figure>`,
    )
    .join("\n");
  const dots = gallery
    .map(
      (item, index) =>
        `<button type="button" data-carousel-dot="${index}" aria-label="查看详情图 ${index + 1}：${escapeHtml(item.caption)}" aria-current="${index === 0 ? "true" : "false"}"><i></i></button>`,
    )
    .join("");

  return `          <article class="product-card product-card--${escapeHtml(project.tone)} reveal" id="project-${escapeHtml(project.id)}" aria-labelledby="project-${escapeHtml(project.id)}-title">
            <header class="product-card__head">
              <span class="product-card__number">${escapeHtml(project.number)}</span>
              <div><p>${escapeHtml(project.kicker)}</p><span>${escapeHtml(project.stage)}</span></div>
            </header>
            <div class="product-card__layout">
              <div class="product-card__content">
                <p class="product-card__role">${escapeHtml(project.role)}</p>
                <h3 id="project-${escapeHtml(project.id)}-title">${escapeHtml(project.name)}<small>${escapeHtml(project.englishName)}</small></h3>
                <p class="product-card__description">${escapeHtml(project.description)}</p>
                <div class="product-card__proofs" aria-label="重要功能">
${proofs}
                </div>
                <div class="tag-row" aria-label="技术栈">${techItems}</div>
                <div class="product-card__actions">
                  <span class="product-card__availability" aria-label="私有演示，不开放下载"><b>PRIVATE DEMO</b><span>仅展示 · 不开放下载</span></span>
                </div>
              </div>
              <div class="product-card__visual product-carousel" data-project-carousel tabindex="0" aria-label="${escapeHtml(project.name)} 真实界面详情图">
                <div class="product-card__browser-bar" aria-hidden="true"><i></i><i></i><i></i><b>PRODUCT WALKTHROUGH</b></div>
                <div class="product-carousel__viewport" data-carousel-viewport>
                  <div class="product-carousel__track" data-carousel-track>
${slides}
                  </div>
                </div>
                <footer class="product-carousel__footer">
                  <span>真实界面 · ${String(gallery.length).padStart(2, "0")} 张详情图</span>
                  <div class="product-carousel__controls">
                    <button type="button" data-carousel-prev aria-label="上一张详情图">←</button>
                    <div class="product-carousel__dots" aria-label="选择详情图">${dots}</div>
                    <span data-carousel-status aria-live="polite">01 / ${String(gallery.length).padStart(2, "0")}</span>
                    <button type="button" data-carousel-next aria-label="下一张详情图">→</button>
                  </div>
                </footer>
              </div>
            </div>
          </article>`;
};

const render = (content, parents = []) => {
  const withIncludes = content.replace(includePattern, (_, relativePath) => {
    const includePath = resolve(sourceRoot, relativePath);
    const scopedPath = relative(sourceRoot, includePath);
    if (scopedPath.startsWith("..") || isAbsolute(scopedPath)) {
      throw new Error(`include 路径超出 src 目录：${relativePath}`);
    }
    if (parents.includes(includePath)) {
      throw new Error(`检测到循环 include：${[...parents, includePath].join(" -> ")}`);
    }
    const fragment = readFileSync(includePath, "utf8").trimEnd();
    return render(fragment, [...parents, includePath]);
  });
  return withIncludes
    .replace(projectOverviewPattern, renderProjectOverview)
    .replace(projectDetailPattern, (_, projectId) => renderProjectDetail(projectId));
};

const generatedNotice = "<!-- 此文件由 npm run build 生成，请修改 src 下的源码。 -->";
for (const entry of entries) {
  const entryPath = join(sourceRoot, entry);
  const outputPath = join(projectRoot, entry);
  const source = readFileSync(entryPath, "utf8");
  const output = render(source).replace("<!doctype html>", `<!doctype html>\n${generatedNotice}`);
  const previous = existsSync(outputPath) ? readFileSync(outputPath, "utf8") : "";

  if (previous !== output) {
    writeFileSync(outputPath, output, "utf8");
    console.log(`已生成 ${entry}`);
  } else {
    console.log(`${entry} 已是最新版本`);
  }
}
