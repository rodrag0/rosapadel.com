import Navbar from "@/components/rosa/Navbar";
import ProblemSolution from "@/components/rosa/ProblemSolution";
import HeroSection from "@/components/rosa/HeroSection";
import ProductFamilySlider from "@/components/rosa/ProductFamilySlider";
import AudiencePortals from "@/components/rosa/AudiencePortals";
import HowItWorks from "@/components/rosa/HowItWorks";
import Scoreboard from "@/components/rosa/Marcadores";
import PlayerExperience from "@/components/rosa/PlayerExperience";
import VisionEcosystem from "@/components/rosa/VisionEcosystem";
import Tournaments from "@/components/rosa/Tournaments";
import ROICalculator from "@/components/rosa/ROICalculator";
import Partners from "@/components/rosa/Partners";
import ContactCTA from "@/components/rosa/ContactCTA";
import Footer from "@/components/rosa/Footer";

const Index = () => {
  return (
    // The section order is the sales narrative; keep it intentional when adding or moving sections.
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AudiencePortals />
      <VisionEcosystem />
      <Scoreboard />
      <ProductFamilySlider />
      <ProblemSolution />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <PlayerExperience />
      
      <ROICalculator />
      <Tournaments />
      <Partners />
      <ContactCTA />
      <Footer />
    </main>
  );
};

export default Index;
