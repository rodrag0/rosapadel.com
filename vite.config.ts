import { defineConfig, type PreviewServer, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { readFileSync, existsSync, statSync } from "node:fs";
import { componentTagger } from "lovable-tagger";

// Keep direct tool URLs identical in local previews and Vercel deployments.
const routing = JSON.parse(readFileSync(new URL("./vercel.json", import.meta.url), "utf8"));
const standaloneRoutes = routing.rewrites
  .filter((route: { source?: string; destination?: string }) => route.destination?.endsWith("/index.html"))
  .map((route: { source: string; destination: string }) => ({ source: route.source, dest: route.destination }));

function configureStandaloneRoutes(server: ViteDevServer | PreviewServer) {
  server.middlewares.use((request, _response, next) => {
    const url = new URL(request.url || "/", "http://localhost");
    const redirect = routing.redirects.find((entry: { source: string }) => entry.source === url.pathname.replace(/\/$/, ""));
    if (redirect) {
      _response.statusCode = 308;
      _response.setHeader("Location", redirect.destination + url.search);
      _response.end();
      return;
    }
    const route = standaloneRoutes.find((entry: { source: string }) => entry.source === url.pathname.replace(/\/$/, ""));
    if (route) request.url = route.dest + url.search;
    next();
  });
}

function configurePreviewRoutes(server: PreviewServer) {
  configureStandaloneRoutes(server);
  const output = path.resolve(server.config.root, server.config.build.outDir);
  server.middlewares.use((request, response, next) => {
    const pathname = new URL(request.url || "/", "http://localhost").pathname;
    let decoded: string;
    try { decoded = decodeURIComponent(pathname); } catch { response.statusCode = 400; response.end(); return; }
    const file = path.resolve(output, `.${decoded}`);
    const insideOutput = file === output || file.startsWith(output + path.sep);
    if (insideOutput && existsSync(file) && statSync(file).isFile()) return next();
    if (pathname === "/") return next();
    const notFound = path.join(output, "404.html");
    if (!existsSync(notFound)) return next();
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end(request.method === "HEAD" ? undefined : readFileSync(notFound));
  });
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    { name: "standalone-tool-routes", configureServer: configureStandaloneRoutes, configurePreviewServer: configurePreviewRoutes },
    react(), mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
