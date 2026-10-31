import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMetadata, getPageStructuredData } from "@/lib/seo";
import { useLanguage } from "./LanguageProvider";

export default function PageMetadata() {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  useEffect(() => {
    const metadata = getPageMetadata(pathname, language);
    document.title = metadata.title;
    function meta(selector: string, attribute: "name" | "property", key: string, value: string) {
      const element = document.querySelector<HTMLMetaElement>(selector) ?? document.createElement("meta");
      element.setAttribute(attribute, key);
      element.content = value;
      if (!element.parentNode) document.head.appendChild(element);
    }
    meta('meta[name="description"]', "name", "description", metadata.description);
    meta('meta[name="robots"]', "name", "robots", metadata.robots);
    for (const [property, value] of [["og:title", metadata.title], ["og:description", metadata.description], ["og:url", metadata.canonical ?? ""]]) {
      meta(`meta[property="${property}"]`, "property", property, value);
    }
    meta('meta[name="twitter:title"]', "name", "twitter:title", metadata.title);
    meta('meta[name="twitter:description"]', "name", "twitter:description", metadata.description);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (metadata.canonical) {
      const element = canonical ?? document.createElement("link");
      element.rel = "canonical";
      element.href = metadata.canonical;
      if (!element.parentNode) document.head.appendChild(element);
    } else canonical?.remove();
    const schema = document.getElementById("rosa-organization") ?? document.createElement("script");
    schema.id = "rosa-organization";
    schema.setAttribute("type", "application/ld+json");
    schema.textContent = JSON.stringify(getPageStructuredData(pathname));
    if (!schema.parentNode) document.head.appendChild(schema);
  }, [pathname, language]);
  return null;
}
