import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

if (process.env.VERCEL_GIT_COMMIT_REF?.startsWith("codex/seo-review-") && process.env.VERCEL_ENV === "production") {
  throw new Error("SEO review branches are preview-only; production deployment is on hold.");
}

process.env.NODE_ENV = "production";
const root = fileURLToPath(new URL("../", import.meta.url));
const { render, getPageMetadata, getPageStructuredData, publicPagePaths, extraPagePaths } = await import("../dist-ssr/entry-server.js");
const template = await readFile(path.join(root, "dist/index.html"), "utf8");
const escape = value => value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function documentFor(url) {
  const meta = getPageMetadata(url);
  let document = template
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\b[^>]*(?:name|property)=["'](?:description|robots|og:title|og:description|og:url|twitter:title|twitter:description)["'][^>]*>/gi, "")
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, "");
  const head = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}">`,
    `<meta name="robots" content="${meta.robots}">`,
    `<meta property="og:title" content="${escape(meta.title)}">`,
    `<meta property="og:description" content="${escape(meta.description)}">`,
    `<meta name="twitter:title" content="${escape(meta.title)}">`,
    `<meta name="twitter:description" content="${escape(meta.description)}">`,
    meta.canonical ? `<link rel="canonical" href="${meta.canonical}"><meta property="og:url" content="${meta.canonical}">` : "",
    `<script type="application/ld+json" id="rosa-organization">${JSON.stringify(getPageStructuredData(url)).replace(/</g, "\\u003c")}</script>`,
    // Preserve readable content before JS/with JS disabled. The normal client
    // mount removes the flag and restores existing in-view animation behavior.
    '<style>#root[data-prerendered] [style*="opacity:0;"],#root[data-prerendered] [style$="opacity:0"],#root[data-prerendered] [style*="opacity: 0;"],#root[data-prerendered] [style$="opacity: 0"]{opacity:1!important;transform:none!important}</style>',
  ].join("\n");
  document = document.replace("</head>", `${head}\n</head>`);
  return document.replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${render(url)}</div>`);
}

for (const url of [...publicPagePaths, ...extraPagePaths]) {
  const target = path.join(root, "dist", url === "/" ? "index.html" : `${url.slice(1)}/index.html`);
  await mkdir(path.dirname(target), { recursive: true });
  const document = documentFor(url);
  if (!document.includes('data-prerendered="true"')) throw new Error(`Missing pre-render placeholder: ${url}`);
  await writeFile(target, document);
}
await writeFile(path.join(root, "dist/404.html"), documentFor("/__not-found__"));
console.log(`Pre-rendered ${publicPagePaths.length + extraPagePaths.length} routes and the 404 page.`);
