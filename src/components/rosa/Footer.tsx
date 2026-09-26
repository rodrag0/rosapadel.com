import { useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import rosaLogoDark from "@/assets/rosa-logo-dark.png";
import rosaLogoLight from "@/assets/rosa-logo-light.png";
import { getSectionHref } from "@/lib/siteLinks";
import BrandText from "./BrandText";
import { experienceCopy } from "@/lib/experienceCopy";
import { getProductLinks } from "@/lib/productCatalog";

export default function Footer() {
  const { theme } = useTheme();
  const { copy, language } = useLanguage();
  const productLinks = getProductLinks(language);
  const nav = experienceCopy[language].nav;
  const location = useLocation();
  const logo = theme === "dark" ? rosaLogoDark : rosaLogoLight;
  const howItWorksHref = getSectionHref(location.pathname, "how-it-works");
  const contactHref = getSectionHref(location.pathname, "contact");

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="space-y-3 md:col-span-2">
            <img src={logo} alt="rosa padel" className="h-8" />
            <p className="text-sm text-muted-foreground">
              <BrandText text={copy.footer.tagline} />
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              {copy.footer.productsTitle}
            </h4>
            <ul className="space-y-2 text-sm">
              {productLinks.map((product) => (
                <li key={product.name}>
                  <a
                    href={product.href}
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    <BrandText text={product.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              {nav.explore}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/#players"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  {nav.players}
                </a>
              </li>
              <li>
                <a
                  href="/for-clubs"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  {copy.nav.forClubs}
                </a>
              </li>
              <li>
                <a
                  href="/investors"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  {copy.nav.forInvestors}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              {copy.footer.companyTitle}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/events"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  {nav.events}
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  {copy.footer.companyLinks.home}
                </a>
              </li>
              <li>
                <a
                  href={howItWorksHref}
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  {copy.footer.companyLinks.howItWorks}
                </a>
              </li>
              <li>
                <a
                  href={contactHref}
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  {copy.footer.companyLinks.contact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal links row */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-wrap gap-4 mb-6">
            <a
              href="/privacy-policy"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {copy.footer.legalLinks.privacy}
            </a>
            <a
              href="/imprint"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {copy.footer.legalLinks.imprint}
            </a>
            <a
              href="/cookie-policy"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {copy.footer.legalLinks.cookies}
            </a>
          </div>
        </div>

        <div className="pt-2 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} <BrandText text="rosa" /> padel.{" "}
            {copy.footer.rights}
          </p>
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/company/rosa-padel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              {copy.footer.social.linkedin}
            </a>
            <a
              href="https://www.instagram.com/rosa.padel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              {copy.footer.social.instagram}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
