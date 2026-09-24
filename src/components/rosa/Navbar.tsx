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
import { getSectionHref } from "@/lib/siteLinks";
import BrandText from "./BrandText";
import { experienceCopy } from "@/lib/experienceCopy";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const productLinks = [
  {
    name: "Core LED",
    href: "/products/core-led",
    tier: "Entry",
    status: "Production ready",
    statusClass: "text-green-400",
  },
  {
    name: "Core HD",
    href: "/products/core-hd",
    tier: "Professional",
    status: "Production ready",
    statusClass: "text-green-400",
  },
  {
    name: "rosa Vision",
    href: "/products/vision",
    tier: "Advanced",
    status: "Pilot",
    statusClass: "text-yellow-400",
  },
  {
    name: "rosa Coach",
    href: "/products/coach",
    tier: "Intelligence",
    status: "Soon",
    statusClass: "text-muted-foreground",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { copy, language } = useLanguage();
  const experienceNav = experienceCopy[language].nav;
  const menuButton = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const logo = theme === "dark" ? rosaLogoDark : rosaLogoLight;
  const icon = theme === "dark" ? rosaIconDark : rosaIconLight;
  const howItWorksHref = getSectionHref(location.pathname, "how-it-works");
  const contactHref = getSectionHref(location.pathname, "contact");

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <nav className="site-nav fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <a href="/">
          <img src={logo} alt="rosa padel" className="h-8 hidden sm:block" />
          <img src={icon} alt="rosa padel" className="h-8 sm:hidden" />
        </a>

        {/* Desktop */}
        <div className="hidden xl:flex items-center gap-5">
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
              className="rounded-xl border border-border bg-card p-2 min-w-[260px] shadow-lg"
            >
              {productLinks.map((product) => (
                <DropdownMenuItem key={product.href} asChild>
                  <a
                    href={product.href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        <BrandText text={product.name} />
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                        {product.tier}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-widest ${product.statusClass}`}
                    >
                      {product.status}
                    </span>
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href={howItWorksHref}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {copy.nav.howItWorks}
          </a>
          <a
            href="/for-clubs"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {copy.nav.forClubs}
          </a>
          <a
            href="/events"
            aria-current={location.pathname === "/events" ? "page" : undefined}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {experienceNav.events}
          </a>

          <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            aria-label={copy.nav.toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 box-glow"
          >
            <a href={contactHref}>{copy.nav.bookDemo}</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="xl:hidden flex items-center gap-2">
          <LanguageSwitcher compact />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            aria-label={copy.nav.toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button
            ref={menuButton}
            className="text-foreground"
            onClick={() => setOpen(!open)}
            aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
            aria-expanded={open}
            aria-controls="site-mobile-menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="site-mobile-menu"
          className="xl:hidden glass border-t border-border px-6 py-4 space-y-4 max-h-[calc(100dvh-4rem)] overflow-y-auto"
        >
          {/* Products section in mobile */}
          <div className="space-y-2">
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              aria-expanded={productsOpen}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
            >
              {copy.nav.products}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${productsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {productsOpen && (
              <div className="pl-4 space-y-2 border-l border-border">
                {productLinks.map((product) => (
                  <a
                    key={product.href}
                    href={product.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>
                      <BrandText text={product.name} />
                    </span>
                    <span
                      className={`text-[10px] font-mono ${product.statusClass}`}
                    >
                      {product.status}
                    </span>
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
            href="/events"
            aria-current={location.pathname === "/events" ? "page" : undefined}
            onClick={() => setOpen(false)}
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {experienceNav.events}
          </a>
          <a
            href="/investors"
            onClick={() => setOpen(false)}
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {copy.nav.forInvestors}
          </a>
          <Button
            asChild
            size="sm"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <a href={contactHref} onClick={() => setOpen(false)}>
              {copy.nav.bookDemo}
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}
