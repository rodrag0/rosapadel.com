import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import { AppProviders, SiteRoutes } from "./App";
import { normalizePagePath } from "./lib/seo";

export { getPageMetadata, publicPagePaths, extraPagePaths, routeAliases, organizationData, siteOrigin } from "./lib/seo";

// Pre-render the existing pages, not an independent SEO-only copy of the site.
export function render(url: string) {
  return renderToString(<AppProviders><StaticRouter location={normalizePagePath(url)}><SiteRoutes /></StaticRouter></AppProviders>);
}
