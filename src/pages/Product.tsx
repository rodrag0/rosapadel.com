import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import ContactCTA from "@/components/rosa/ContactCTA";
import BrandText from "@/components/rosa/BrandText";
import AppScreenshot from "@/components/rosa/AppScreenshot";
import { MatchProof } from "@/components/rosa/HomeSections";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import { useTheme } from "@/components/rosa/ThemeProvider";
import { hardwareProducts, productCatalog, type HardwareProduct } from "@/lib/productCatalog";
import rosaLogoDark from "@/assets/rosa-logo-dark.png";
import rosaLogoLight from "@/assets/rosa-logo-light.png";

export default function Product({ productId }: { productId: HardwareProduct }) {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const copy = productCatalog[language];
  const product = hardwareProducts.find((item) => item.id === productId)!;
  const details = copy[productId];
  const otherProduct = hardwareProducts.find((item) => item.id !== productId)!;

  useEffect(() => {
    document.title = `rosa padel | ${product.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", details.body);
  }, [product.name, details.body]);

  return (
    <main className="experience-page min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="experience-hero catalog-hero">
        <div className="hero-title">
          <h1 className="experience-wordmark" aria-label={product.name}>
            <img src={theme === "dark" ? rosaLogoDark : rosaLogoLight} alt="rosa" />
            <span>{productId === "vision" ? "Vision" : "Portable"}</span>
          </h1>
          <p className="hero-detail"><BrandText text={details.body} /></p>
          <div className="experience-actions">
            <a href="#contact" className="experience-button">{copy.contact}<ArrowRight size={17} /></a>
            <a href={otherProduct.href} className="experience-text-link"><BrandText text={otherProduct.name} /><ArrowRight size={17} /></a>
          </div>
        </div>
      </section>
      <section className="experience-section experience-container">
        <div className="experience-section-head">
          <h2>{copy.features}</h2>
          <p className="experience-intro">{details.note}</p>
        </div>
        <ul className="catalog-features">
          {details.features.map((feature, index) => (
            <li key={feature}><span>0{index + 1}</span><h3>{feature}</h3></li>
          ))}
        </ul>
      </section>
      {productId === "vision" && <MatchProof />}
      <section className="experience-section experience-band">
        <div className="experience-container">
          <div className="experience-section-head">
            <h2>{copy.subscriptions}</h2>
            <p className="experience-intro">{copy.subscriptionBody}</p>
          </div>
          {productId === "vision" && <AppScreenshot screen="venue" />}
          <div className="connection-foot">
            <p>{copy.subscriptionNote}</p>
            <a href="/subscriptions" className="experience-text-link">{copy.subscriptions}<ArrowRight size={18} /></a>
          </div>
        </div>
      </section>
      <ContactCTA editorial />
      <Footer />
    </main>
  );
}
