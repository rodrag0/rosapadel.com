import { useEffect } from "react";
import Navbar from "@/components/rosa/Navbar";
import HeroSection from "@/components/rosa/HeroSection";
import ProblemSolution from "@/components/rosa/ProblemSolution";
import ProductFamilySlider from "@/components/rosa/ProductFamilySlider";
import AudiencePortals from "@/components/rosa/AudiencePortals";
import HowItWorks from "@/components/rosa/HowItWorks";
import PlayerExperience from "@/components/rosa/PlayerExperience";
import VisionEcosystem from "@/components/rosa/VisionEcosystem";
import Tournaments from "@/components/rosa/Tournaments";
import ROICalculator from "@/components/rosa/ROICalculator";
import Partners from "@/components/rosa/Partners";
import ContactCTA from "@/components/rosa/ContactCTA";
import Footer from "@/components/rosa/Footer";
import { useLanguage } from "@/components/rosa/LanguageProvider";

const Index = () => {
  const { copy } = useLanguage();

  useEffect(() => {
    document.title = copy.meta.homeTitle;

    const description =
      document.querySelector('meta[name="description"]') ??
      (() => {
        const element = document.createElement("meta");
        element.setAttribute("name", "description");
        document.head.appendChild(element);
        return element;
      })();

    description.setAttribute("content", copy.meta.homeDescription);
  }, [copy.meta.homeDescription, copy.meta.homeTitle]);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProductFamilySlider />
      <AudiencePortals />
      <ProblemSolution />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <PlayerExperience />
      <VisionEcosystem />
      <ROICalculator />
      <Tournaments />
      <Partners />
      <ContactCTA />
      <Footer />
    </main>
  );
};

export default Index;
