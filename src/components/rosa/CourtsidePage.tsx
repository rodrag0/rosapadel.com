import type { ReactNode } from "react";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import logoLight from "@/assets/rosa-logo-light.png";
import logoDark from "@/assets/rosa-logo-dark.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CourtsideStudio } from "./CourtsideSections";
import { useLanguage } from "./LanguageProvider";

export default function CourtsidePage({ children, className = "" }: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={`courtside-home courtside-detail ${className}`}>
      <Navbar />
      <CourtsideStudio />
      {children}
      <Footer />
    </main>
  );
}

export function DetailHero({ title, product, image, alt, credit, status, variant }: {
  title: string;
  product?: "vision" | "portable";
  image: string;
  alt: string;
  credit: string;
  status?: string;
  variant: "vision" | "portable" | "clubs" | "investors" | "events";
}) {
  return (
    <header className={`detail-hero detail-hero-${variant}`}>
      <img className="detail-hero-photo" src={image} alt={alt} fetchPriority="high" />
      <div className="detail-hero-inner studio-container">
        <h1 aria-label={product ? `rosa ${product}` : undefined}>
          {product ? (
            <>
              <img
                className="detail-hero-wordmark"
                src={product === "portable" ? logoLight : logoDark}
                alt=""
                width="2226"
                height="644"
              />
              <span className="detail-product-display">{product}</span>
            </>
          ) : title}
        </h1>
        {status && <span className="detail-status">{status}</span>}
      </div>
      <p className="detail-hero-credit">{credit}</p>
    </header>
  );
}

export function DetailIntro({ title, children, actions }: {
  title: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="detail-introduction studio-container">
      <h2>{title}</h2>
      <div className="detail-introduction-copy">
        {children}
        {actions && <div className="studio-actions">{actions}</div>}
      </div>
    </section>
  );
}

export function DetailMedia({ src, poster, alt, caption, width = 1280, height = 720 }: {
  src: string;
  poster?: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
}) {
  const { language } = useLanguage();
  const expand = { en: "Open full-size media", es: "Abrir a tamaño completo", de: "Medien vollständig öffnen" }[language];
  return (
    <figure className="detail-media" data-portrait={height > width ? true : undefined}>
      {poster ? (
        <video aria-label={alt} src={src} poster={poster} width={width} height={height} controls playsInline preload="none" />
      ) : (
        <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      )}
      <figcaption>
        <span>{caption}</span>
        <a href={src} aria-label={expand} title={expand} target="_blank" rel="noopener noreferrer">
          <Maximize2 size={17} aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  );
}

export function DetailLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="studio-link" href={href}>{children}<ArrowUpRight size={17} aria-hidden="true" /></a>;
}
