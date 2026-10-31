import { siteCopy, type Language } from "./siteCopy";
import { comparisonGuides, reviewGuidePaths, sourceCheckDate } from "./comparisonGuides";

export const siteOrigin = "https://www.rosapadel.com";
export const publicPagePaths = ["/", "/products/vision", "/products/portable", "/products/coach", "/for-clubs", "/tournament-management", "/investors", "/privacy-policy", "/cookie-policy", "/imprint"] as const;
export const routeAliases: Record<string, string> = {
  "/products/core-led": "/products/portable", "/products/core-hd": "/products/vision",
  "/new-tab": "/tournament-management", "/tournamen-managment": "/tournament-management", "/tournament-managment": "/tournament-management",
};
export const extraPagePaths = ["/match-session/matchi-live-score", ...reviewGuidePaths];
export type PageMetadata = { title: string; description: string; canonical: string | null; robots: "index, follow" | "noindex, nofollow" };

export function normalizePagePath(url: string) {
  const pathname = new URL(url, siteOrigin).pathname.replace(/\/+$/, "") || "/";
  return routeAliases[pathname] ?? pathname;
}

export function getPageMetadata(url: string, language: Language = "en"): PageMetadata {
  const pathname = normalizePagePath(url);
  const guide = comparisonGuides.find(guide => guide.path === pathname);
  if (guide) return { title: `${guide.title}: ${guide.subtitle} | rosa padel`, description: guide.description, canonical: siteOrigin + pathname, robots: "noindex, nofollow" };
  if (pathname === "/learn") return { title: "Padel Court System Buying Guides | rosa padel", description: "Review ROSA's evidence-led comparison drafts for club scoring, video, review and events. Prepared for product and editorial review.", canonical: siteOrigin + pathname, robots: "noindex, nofollow" };
  const copy = siteCopy[language];
  const pages: Record<string, { title: string; description: string }> = {
    "/": { title: copy.meta.homeTitle, description: copy.meta.homeDescription },
    "/products/portable": { title: "rosa portable | Padel LED Scoreboard", description: "Portable LED scoring for padel with wireless touchpads and offline operation. Explore rosa portable and discuss your court setup." },
    "/products/vision": { title: "rosa vision | Padel Scoring, Video and Replay", description: "Connect padel scoring, HD display, replay and video review with rosa vision. Explore the court workflow and discuss your club's setup." },
    "/products/coach": { title: "rosa coach | Padel AI Analysis in Development", description: "Explore rosa coach, the AI analysis layer in development for padel. See the planned video, tactical review and player insight workflows." },
    "/for-clubs": { title: "Padel Scoring and Connected Courts for Clubs | rosa padel", description: "Explore court scoring, video, replay and event workflows for padel clubs. Compare rosa portable and rosa vision for your venue." },
    "/investors": { title: "Investor Overview | rosa padel", description: "Learn about rosa padel's connected-court product family, hardware and software approach, and investor contact options." },
    "/privacy-policy": { title: copy.meta.privacyTitle, description: "How rosa padel handles personal data and website enquiries, with information about your privacy rights and contact options." },
    "/cookie-policy": { title: copy.meta.cookiesTitle, description: "Information about cookies, browser storage and preferences used on the rosa padel website." },
    "/imprint": { title: copy.meta.imprintTitle, description: "Provider and contact information for the rosa padel website." },
    "/tournament-management": { title: "Padel Tournament Management | rosa padel", description: "Explore rosa padel's tournament management workflow for courts, pairs, rounds and match scoring." },
    "/match-session/matchi-live-score": { title: "Matchi Livescore Showcase | rosa padel", description: "A recorded padel match demonstrating rosa court controls and a live scoreboard overlay." },
  };
  const page = pages[pathname];
  if (!page) return { title: `${copy.notFound.title} | rosa padel`, description: copy.notFound.body, canonical: null, robots: "noindex, nofollow" };
  return { ...page, canonical: siteOrigin + pathname, robots: pathname === "/match-session/matchi-live-score" ? "noindex, nofollow" : "index, follow" };
}

export const organizationData = { "@context": "https://schema.org", "@graph": [
  { "@type": "Organization", "@id": `${siteOrigin}/#organization`, name: "rosa padel", url: `${siteOrigin}/` },
  { "@type": "WebSite", "@id": `${siteOrigin}/#website`, name: "rosa padel", url: `${siteOrigin}/`, publisher: { "@id": `${siteOrigin}/#organization` } },
] };

export function getPageStructuredData(url: string) {
  const pathname = normalizePagePath(url);
  const guide = comparisonGuides.find(guide => guide.path === pathname);
  if (!guide) return organizationData;
  return { "@context": "https://schema.org", "@graph": [
    ...organizationData["@graph"],
    { "@type": "Article", "@id": siteOrigin + pathname + "#article", headline: guide.title, description: guide.description, inLanguage: "en", dateModified: sourceCheckDate, author: { "@type": "Organization", name: "ROSA product team" }, publisher: { "@id": siteOrigin + "/#organization" }, mainEntityOfPage: siteOrigin + pathname },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteOrigin + "/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: siteOrigin + "/learn" },
      { "@type": "ListItem", position: 3, name: guide.title, item: siteOrigin + pathname },
    ] },
  ] };
}
