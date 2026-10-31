import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import rosaLogoDark from "@/assets/rosa-logo-dark.png";
import rosaLogoLight from "@/assets/rosa-logo-light.png";
import rosaIconDark from "@/assets/rosa-icon-dark.svg";
import rosaIconLight from "@/assets/rosa-icon-light.svg";
import { getSectionHref, tournamentManagementHref } from "@/lib/siteLinks";
import { getProductLinks, getProductStatusClass } from "@/lib/productCatalog";
import BrandText from "./BrandText";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { copy, language } = useLanguage();
  const productLinks = getProductLinks(language);
  const location = useLocation();

  const logo = theme === "dark" ? rosaLogoDark : rosaLogoLight;
  const icon = theme === "dark" ? rosaIconDark : rosaIconLight;
  const howItWorksHref = getSectionHref(location.pathname, "how-it-works");
  const contactHref = getSectionHref(location.pathname, "contact");
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuToggle.current?.focus();
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 studio-nav" aria-label={{ en: "Main navigation", es: "Navegación principal", de: "Hauptnavigation" }[language]}>
      <div className="studio-container nav-content flex items-center justify-between">
        <a href="/">
          <img src={logo} alt="rosa padel" className="h-8 hidden sm:block" />
          <img src={icon} alt="rosa padel" className="h-8 sm:hidden" />
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Products dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                {copy.nav.products}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-80 max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-card p-2 shadow-lg"
            >
              {productLinks.map((product) => (
                <DropdownMenuItem key={product.href} asChild className="focus:bg-secondary focus:text-foreground">
                  <a
                    href={product.href}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 rounded px-3 py-3 hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <div className="min-w-0 space-y-1">
                      <span className="block text-sm font-semibold text-foreground">
                        <BrandText text={product.name} />
                      </span>
                      <span className="block text-xs text-muted-foreground">{product.tier}</span>
                    </div>
                    <span className={`max-w-32 text-right text-xs font-mono ${getProductStatusClass(product.statusType)}`}>
                      {product.status}
                    </span>
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <a href={howItWorksHref} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {copy.nav.howItWorks}
          </a>
          <a href="/for-clubs" aria-current={location.pathname === "/for-clubs" ? "page" : undefined} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {copy.nav.forClubs}
          </a>
          <a href="/investors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {copy.nav.forInvestors}
          </a>
          <a href={tournamentManagementHref} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {copy.nav.newTab}
          </a>

          <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            className="nav-tool text-muted-foreground hover:text-foreground transition-colors"
            aria-label={copy.nav.toggleTheme}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Button asChild size="sm" className="nav-command bg-primary text-primary-foreground hover:bg-primary/90">
            <a href={contactHref}>{copy.nav.bookDemo}</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="nav-tool text-muted-foreground hover:text-foreground transition-colors"
            aria-label={copy.nav.toggleTheme}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            className="nav-tool text-foreground"
            ref={menuToggle}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
            aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-navigation" className="lg:hidden bg-background border-t border-border px-6 py-4 space-y-4 max-h-[calc(100svh-72px)] overflow-y-auto">
          <LanguageSwitcher compact />

          {/* Products section in mobile */}
          <div className="space-y-2">
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
            >
              {copy.nav.products}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
            </button>
            {productsOpen && (
              <div className="pl-4 space-y-2 border-l border-border">
                {productLinks.map((product) => (
                  <a
                    key={product.href}
                    href={product.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center justify-between gap-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>
                      <BrandText text={product.name} />
                    </span>
                    <span className={`max-w-32 text-right text-xs font-mono ${getProductStatusClass(product.statusType)}`}>{product.status}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href={howItWorksHref}
            onClick={() => setOpen(false)}
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {copy.nav.howItWorks}
          </a>
          <a
            href="/for-clubs"
            onClick={() => setOpen(false)}
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {copy.nav.forClubs}
          </a>
          <a
            href="/investors"
            onClick={() => setOpen(false)}
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {copy.nav.forInvestors}
          </a>
          <a
            href={tournamentManagementHref}
            onClick={() => setOpen(false)}
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {copy.nav.newTab}
          </a>
          <Button asChild size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <a href={contactHref} onClick={() => setOpen(false)}>{copy.nav.bookDemo}</a>
          </Button>
        </div>
      )}
    </nav>
  );
}
