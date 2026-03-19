import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import rosaLogoDark from "@/assets/rosa-logo-dark.png";
import rosaLogoLight from "@/assets/rosa-logo-light.png";
import rosaIconDark from "@/assets/rosa-icon-dark.svg";
import rosaIconLight from "@/assets/rosa-icon-light.svg";
import { getSectionHref } from "@/lib/siteLinks";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { copy } = useLanguage();
  const location = useLocation();

  const logo = theme === "dark" ? rosaLogoDark : rosaLogoLight;
  const icon = theme === "dark" ? rosaIconDark : rosaIconLight;
  const links = [
    { label: copy.nav.products, href: getSectionHref(location.pathname, "products") },
    { label: copy.nav.howItWorks, href: getSectionHref(location.pathname, "how-it-works") },
    { label: copy.nav.contact, href: getSectionHref(location.pathname, "contact") },
  ];
  const contactHref = getSectionHref(location.pathname, "contact");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <a href="/">
          <img src={logo} alt="rosa padel" className="h-8 hidden sm:block" />
          <img src={icon} alt="rosa padel" className="h-8 sm:hidden" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            aria-label={copy.nav.toggleTheme}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 box-glow">
            <a href={contactHref}>{copy.nav.bookDemo}</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            aria-label={copy.nav.toggleTheme}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            className="text-foreground"
            onClick={() => setOpen(!open)}
            aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-border px-6 py-4 space-y-4">
          <LanguageSwitcher compact />
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button asChild size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <a href={contactHref} onClick={() => setOpen(false)}>{copy.nav.bookDemo}</a>
          </Button>
        </div>
      )}
    </nav>
  );
}
