import assert from "node:assert/strict";
import { cp, copyFile, mkdir, mkdtemp, readFile, readdir, stat, writeFile, symlink, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Build a publication snapshot without modifying or publishing the app's source repository.
const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(process.argv[2] || "");
assert(process.argv[2], "Usage: node scripts/package-player-app.mjs <rosaApp directory>");
const base = "/rosa-app/";
const output = path.join(root, "public", "rosa-app");
const stage = await mkdtemp(path.join(tmpdir(), "rosa-player-publication-"));
const dataset = path.resolve(source, "../../practicantes/dataset/match_001");
const ffmpeg = path.resolve(source, "../../VISION/ReplayOverlay/node_modules/ffmpeg-static/ffmpeg.exe");
const start = 4550;
const duration = 120;
const sourceFiles = [];
const digest = createHash("sha256");

async function fingerprint(directory, relative = "") {
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const name = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) await fingerprint(path.join(directory, entry.name), name);
    else if (entry.isFile()) {
      const bytes = await readFile(path.join(directory, entry.name));
      digest.update(name).update(bytes);
      sourceFiles.push(name);
    }
  }
}

await fingerprint(path.join(source, "src"), "src");
await fingerprint(path.join(source, "public"), "public");
await cp(path.join(source, "src"), path.join(stage, "src"), { recursive: true });
await cp(path.join(source, "public"), path.join(stage, "public"), { recursive: true });
await copyFile(path.join(root, "scripts/player-preview-entry.tsx"), path.join(stage, "src/main.tsx"));
await copyFile(path.join(source, "package.json"), path.join(stage, "package.json"));
await symlink(path.join(source, "node_modules"), path.join(stage, "node_modules"), "junction");
await writeFile(path.join(stage, "index.html"), `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow"><meta name="theme-color" content="#ffffff">
<title>rosa app</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`);

const { mergeAnnotations } = await import(pathToFileURL(path.join(source, "server/demo-media.mjs")));
const documents = await Promise.all([
  ["hary", "DataPruebaHary/Video1ros45min.json"],
  ["angel", "dataPruebaAngelRamses/video.json"],
].map(async ([name, file]) => ({ name, data: JSON.parse(await readFile(path.join(dataset, file), "utf8")) })));
const shots = mergeAnnotations(documents)
  .filter((shot) => shot.time >= start && shot.time < start + duration)
  .map((shot) => ({ ...shot, time: shot.time - start }));
assert(shots.length > 10, "Expected annotated shots in the selected excerpt");
const manifest = {
  id: "match-001-preview", duration, shots,
  labels: Object.fromEntries(shots.map((shot) => [shot.type, shot.label])),
  suggestions: [{ id: "demo-cluster-001", time: 4613.95 - start, player: 0, type: "match-highlight", label: "Lobs, bandejas & smashes", sources: ["editorial-demo-selection"], before: 10, after: 15, shotCount: shots.filter((shot) => shot.time >= 4603.95 - start && shot.time <= 4628.95 - start).length }],
  annotationMethod: "manual", scoreAvailable: false,
  liveAvailable: true, live2Available: false, exportAvailable: false,
  excerpt: { sourceStartSeconds: start, durationSeconds: duration, description: "Two-minute excerpt of the recorded match, with original manual annotations." },
};
await mkdir(path.join(stage, "public/demo"), { recursive: true });
await writeFile(path.join(stage, "public/demo/match.json"), JSON.stringify(manifest));
await run(ffmpeg, ["-y", "-hide_banner", "-loglevel", "error", "-ss", String(start), "-i", path.join(dataset, "video.mp4"), "-t", String(duration), "-map", "0:v:0", "-map", "0:a?", "-c:v", "libx264", "-preset", "fast", "-crf", "20", "-threads", "4", "-pix_fmt", "yuv420p", "-c:a", "aac", "-movflags", "+faststart", path.join(stage, "public/demo/replay.mp4")], { timeout: 600000 });
assert((await stat(path.join(stage, "public/demo/replay.mp4"))).size < 95 * 1024 * 1024, "Excerpt exceeds the static publication size budget; review before publishing");

const ts = (await import(pathToFileURL(path.join(source, "node_modules/typescript/lib/typescript.js")))).default;
const { build } = await import(pathToFileURL(path.join(source, "node_modules/vite/dist/node/index.js")));
const react = (await import(pathToFileURL(path.join(source, "node_modules/@vitejs/plugin-react/dist/index.js")))).default;
const printer = ts.createPrinter();
function publicValue(value) {
  if (value === "/api/demo/match") return `${base}demo/match.json`;
  if (value === "/api/demo/video/replay") return `${base}demo/replay.mp4`;
  if (/^\/(assets|media|fonts)\//.test(value)) return base + value.slice(1);
  if (/^rosa-(theme|demo-database|match-001|setup-draft)/.test(value)) return `website-preview-${value}`;
  if (value === "Local demo link copied. It opens on this computer; share the MP4 with others.") return "Preview link copied. Saved highlights stay in this browser.";
  if (value === "Match data is unavailable. Check that the local media server is running.") return "Match data is unavailable. Reload the preview and try again.";
  return value;
}
await build({
  root: stage, configFile: false, envDir: false, base,
  plugins: [{
    name: "rosa-website-preview", enforce: "pre",
    transform(code, id) {
      if (!id.replaceAll("\\", "/").startsWith(path.join(stage, "src").replaceAll("\\", "/") + "/") || !/\.tsx?$/.test(id)) return;
      const file = ts.createSourceFile(id, code, ts.ScriptTarget.Latest, true, id.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
      const transformed = ts.transform(file, [(context) => {
        const visit = (node) => {
          if (ts.isVariableDeclaration(node) && node.name.getText(file) === "defaultReferralProgram" && node.initializer && ts.isObjectLiteralExpression(node.initializer)) {
            const properties = node.initializer.properties.map((property) => {
              if (!ts.isPropertyAssignment(property)) return property;
              if (property.name.getText(file) === "enabled") return ts.factory.updatePropertyAssignment(property, property.name, ts.factory.createFalse());
              if (property.name.getText(file) === "rewardMinor") return ts.factory.updatePropertyAssignment(property, property.name, ts.factory.createNumericLiteral(0));
              return property;
            });
            return ts.factory.updateVariableDeclaration(node, node.name, node.exclamationToken, node.type, ts.factory.updateObjectLiteralExpression(node.initializer, properties));
          }
          if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
            const value = publicValue(node.text);
            if (value !== node.text) return ts.factory.createStringLiteral(value);
          }
          if (ts.isTemplateExpression(node) && node.head.text === "/api/demo/video/") {
            // Only Court 01 is supplied; Court 02 stays unavailable in the manifest.
            return ts.factory.createStringLiteral(`${base}media/rosa-vision-demo.mp4`);
          }
          if (ts.isTemplateExpression(node) && node.head.text.startsWith("rosa-setup-draft-")) {
            return ts.factory.updateTemplateExpression(node, ts.factory.createTemplateHead(publicValue(node.head.text)), node.templateSpans);
          }
          return ts.visitEachChild(node, visit, context);
        };
        return (sourceFile) => ts.visitNode(sourceFile, visit);
      }]);
      const result = printer.printFile(transformed.transformed[0]);
      transformed.dispose();
      return { code: result, map: null };
    },
  }, react()],
  build: { outDir: path.join(stage, "dist"), sourcemap: false },
});
await mkdir(output, { recursive: true });
const artifacts = (await readdir(path.join(stage, "dist"), { recursive: true, withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => path.relative(path.join(stage, "dist"), path.join(entry.parentPath || entry.path, entry.name)).replaceAll("\\", "/"));
let previousArtifacts = [];
try {
  const previous = JSON.parse(await readFile(path.join(output, "release.json"), "utf8"));
  assert.equal(previous.profile, "interactive-demo-preview", "Output directory is not a managed app preview");
  previousArtifacts = previous.artifacts || (await readdir(output, { recursive: true, withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name !== "release.json")
    .map((entry) => path.relative(output, path.join(entry.parentPath || entry.path, entry.name)).replaceAll("\\", "/"));
} catch (error) { if (error.code !== "ENOENT") throw error; }
// Generated files only; no source, environment files, local databases or server code are copied.
await cp(path.join(stage, "dist"), output, { recursive: true });
for (const artifact of previousArtifacts.filter((file) => !artifacts.includes(file))) {
  const target = path.resolve(output, artifact);
  const relative = path.relative(output, target);
  assert(!path.isAbsolute(relative) && !relative.startsWith("..") && target !== output, "Unsafe artifact path");
  await rm(target, { force: true });
}
await writeFile(path.join(output, "release.json"), JSON.stringify({
  profile: "interactive-demo-preview", sourceSha256: digest.digest("hex"), sourceFileCount: sourceFiles.length,
  excerptStartSeconds: start, excerptDurationSeconds: duration, annotatedShots: shots.length,
  liveVideo: "Bundled recording; not a live court feed", exports: false,
  referralProgram: "Disabled; no unapproved reward offer", artifacts,
}, null, 2));
console.log(`Published snapshot: ${output}`);
console.log(`Replay: ${shots.length} original annotations, 1080p, ${duration}s. No cloud account or export backend included.`);
