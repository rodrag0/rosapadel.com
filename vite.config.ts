import { defineConfig, type PreviewServer, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { readFileSync } from "node:fs";
import { componentTagger } from "lovable-tagger";

// Keep direct tool URLs identical in local previews and Vercel deployments.
const standaloneRoutes = JSON.parse(readFileSync(new URL("./vercel.json", import.meta.url), "utf8")).routes
  .filter((route: { src?: string; dest?: string }) => route.src?.endsWith("/?") && route.dest?.endsWith("/index.html"))
  .map((route: { src: string; dest: string }) => ({ match: new RegExp(`^${route.src}$`), dest: route.dest }));

function configureStandaloneRoutes(server: ViteDevServer | PreviewServer) {
  server.middlewares.use((request, _response, next) => {
    const url = new URL(request.url || "/", "http://localhost");
    const route = standaloneRoutes.find((entry: { match: RegExp }) => entry.match.test(url.pathname));
    if (route) request.url = route.dest + url.search;
    next();
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
    { name: "standalone-tool-routes", configureServer: configureStandaloneRoutes, configurePreviewServer: configureStandaloneRoutes },
    react(), mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
