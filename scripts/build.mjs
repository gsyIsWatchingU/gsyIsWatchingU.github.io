import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildSync } from "esbuild";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = join(projectRoot, "src");
const includePattern = /^[\t ]*<!-- @include ([^\s]+) -->[\t ]*$/gm;
const projectsPattern = /^[\t ]*<!-- @projects -->[\t ]*$/gm;
const heroProjectsPattern = /^[\t ]*<!-- @hero-projects -->[\t ]*$/gm;
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

const renderProject = (project) => {
  const proofItems = project.proofs
    .map(
      (proof) => `
                  <div class="product-proof">
                    <span>${escapeHtml(proof.label)}</span>
                    <p>${escapeHtml(proof.text)}</p>
                  </div>`,
    )
    .join("");
  const techItems = project.tech.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  const hasEntry = typeof project.entryUrl === "string" && project.entryUrl.trim();
  const gallery = Array.isArray(project.gallery) ? project.gallery : [];
  const secondaryAction = project.secondaryUrl
    ? `
                  <a class="project-action project-action--secondary magnetic" href="${escapeHtml(project.secondaryUrl)}">
                    ${escapeHtml(project.secondaryLabel)} <span aria-hidden="true">→</span>
                  </a>`
    : "";
  const primaryAction = hasEntry
    ? `<a class="project-action project-action--primary magnetic" href="${escapeHtml(project.entryUrl)}" target="_blank" rel="noreferrer">
                      ${escapeHtml(project.entryLabel)} <span aria-hidden="true">↗</span>
                    </a>`
    : `<span class="product-card__availability" aria-label="私有演示，不开放下载">
                      <b>PRIVATE DEMO</b><span>不开放下载</span>
                    </span>`;
  const visualContent = `<span class="product-card__browser-bar" aria-hidden="true"><i></i><i></i><i></i><b>${hasEntry ? "LIVE PRODUCT" : "WINDOWS DESKTOP"}</b></span>
                  <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}" width="${hasEntry ? "1440" : "720"}" height="${hasEntry ? "900" : "760"}" loading="lazy" />
                  <span class="product-card__visual-note">${hasEntry ? "临时演示地址" : "私有演示 · 不开放下载"}${hasEntry ? ' <b aria-hidden="true">↗</b>' : ""}</span>`;
  const visual = hasEntry
    ? `<a class="product-card__visual" href="${escapeHtml(project.entryUrl)}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(project.entryLabel)}（新窗口打开）">
                  ${visualContent}
                </a>`
    : gallery.length > 1
      ? `<div class="product-card__visual product-carousel" data-project-carousel role="region" aria-roledescription="轮播图" aria-label="${escapeHtml(project.name)} 功能截图" tabindex="0">
                  <span class="product-card__browser-bar" aria-hidden="true"><i></i><i></i><i></i><b>WINDOWS PRODUCT</b></span>
                  <div class="product-carousel__viewport" data-carousel-viewport>
                    <div class="product-carousel__track" data-carousel-track>${gallery
                      .map(
                        (item, index) => `
                      <figure class="product-carousel__slide" data-carousel-slide aria-hidden="${index === 0 ? "false" : "true"}">
                        <div class="product-carousel__media">
                          <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}" width="${escapeHtml(item.width)}" height="${escapeHtml(item.height)}" loading="lazy" />
                        </div>
                        <figcaption><b>${escapeHtml(item.label)}</b><span>${escapeHtml(item.caption)}</span></figcaption>
                      </figure>`,
                      )
                      .join("")}
                    </div>
                  </div>
                  <div class="product-carousel__footer">
                    <span>私有演示 · 不开放下载</span>
                    <div class="product-carousel__controls">
                      <button type="button" data-carousel-prev aria-label="上一张截图">←</button>
                      <div class="product-carousel__dots" aria-label="选择截图">${gallery
                        .map(
                          (item, index) =>
                            `<button type="button" data-carousel-dot="${index}" aria-label="查看第 ${index + 1} 张：${escapeHtml(item.caption)}" aria-current="${index === 0 ? "true" : "false"}"><i></i></button>`,
                        )
                        .join("")}</div>
                      <span data-carousel-status aria-live="polite">01 / ${String(gallery.length).padStart(2, "0")}</span>
                      <button type="button" data-carousel-next aria-label="下一张截图">→</button>
                    </div>
                  </div>
                </div>`
      : `<div class="product-card__visual product-card__visual--static" aria-label="${escapeHtml(project.name)} 私有演示界面">
                  ${visualContent}
                </div>`;

  return `            <article class="product-card product-card--${escapeHtml(project.tone)} reveal">
              <header class="product-card__head">
                <span class="product-card__number">${escapeHtml(project.number)}</span>
                <div>
                  <p>${escapeHtml(project.kicker)}</p>
                  <span>${escapeHtml(project.stage)}</span>
                </div>
              </header>

              <div class="product-card__layout">
                <div class="product-card__content">
                  <p class="product-card__role">${escapeHtml(project.role)}</p>
                  <h3>${escapeHtml(project.name)}<small>${escapeHtml(project.englishName)}</small></h3>
                  <p class="product-card__description">${escapeHtml(project.description)}</p>

                  <div class="product-card__proofs">${proofItems}
                  </div>

                  <div class="tag-row">${techItems}</div>

                  <div class="product-card__actions">
                    ${primaryAction}${secondaryAction}
                  </div>
                </div>

                ${visual}
              </div>
            </article>`;
};

const renderProjects = () => projects.map(renderProject).join("\n");

const renderHeroProjects = () => projects
  .map((project, index) => {
    const hasEntry = typeof project.entryUrl === "string" && project.entryUrl.trim();
    const projectUrl = hasEntry ? project.entryUrl : "#projects";
    const projectLabel = hasEntry ? project.entryLabel : "查看页面内项目详情";
    return `<button type="button"
                data-project-option="${escapeHtml(project.id)}"
                data-project-number="${escapeHtml(project.number)}"
                data-project-name="${escapeHtml(project.name)}"
                data-project-english="${escapeHtml(project.englishName)}"
                data-project-feature="${escapeHtml(project.heroFeature.label)}"
                data-project-feature-copy="${escapeHtml(project.heroFeature.text)}"
                data-project-url="${escapeHtml(projectUrl)}"
                data-project-label="${escapeHtml(projectLabel)}"
                data-project-external="${hasEntry ? "true" : "false"}"
                aria-pressed="${index === 0 ? "true" : "false"}"><span>${escapeHtml(project.number)}</span>${escapeHtml(project.name)}</button>`;
  })
  .join("\n");

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
    .replace(heroProjectsPattern, renderHeroProjects)
    .replace(projectsPattern, renderProjects);
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
