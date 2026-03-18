import { useTheme } from "./ThemeProvider";
import rosaLogoDark from "@/assets/rosa-logo-dark.png";
import rosaLogoLight from "@/assets/rosa-logo-light.png";

export default function Footer() {
  const { theme } = useTheme();
  const logo = theme === "dark" ? rosaLogoDark : rosaLogoLight;

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-1">
            <img src={logo} alt="rosa padel" className="h-8" />
            <p className="text-sm text-muted-foreground">The pro experience. Any court.</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#products" className="text-foreground/70 hover:text-primary transition-colors">Core LED</a></li>
              <li><a href="#products" className="text-foreground/70 hover:text-primary transition-colors">Core HD</a></li>
              <li><a href="#products" className="text-foreground/70 hover:text-primary transition-colors">rosa Vision</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Imprint</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} rosa padel. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/company/rosa-padel" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/rosa.padel" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
