import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import { getSectionHref } from "@/lib/siteLinks";

const NotFound = () => {
  const location = useLocation();
  const { copy } = useLanguage();
  const contactHref = getSectionHref(location.pathname, "contact");
  const productsHref = getSectionHref(location.pathname, "products");

  useEffect(() => {
    document.title = `${copy.notFound.title} | rosa padel`;
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [copy.notFound.title, location.pathname]);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.18),_transparent_48%)]" />
        <div className="relative container mx-auto max-w-5xl px-6 lg:px-12">
          <div className="rounded-[2rem] border border-border bg-card/60 p-8 md:p-12 glass text-center">
            <p className="text-sm font-mono uppercase tracking-widest text-primary">Error</p>
            <h1 className="mt-4 text-5xl md:text-7xl font-bold tracking-tight text-glow">{copy.notFound.title}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{copy.notFound.body}</p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 box-glow">
                <a href="/">{copy.notFound.cta}</a>
              </Button>
              <Button asChild variant="outline" className="border-border bg-background/30 hover:bg-secondary">
                <a href={contactHref}>{copy.nav.bookDemo}</a>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <a href={productsHref} className="hover:text-foreground transition-colors">
                {copy.nav.products}
              </a>
              <a href={contactHref} className="hover:text-foreground transition-colors">
                {copy.nav.contact}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default NotFound;
