import Navbar from "@/components/rosa/Navbar";
import HeroSection from "@/components/rosa/HeroSection";
import ProblemSolution from "@/components/rosa/ProblemSolution";
import ProductLadder from "@/components/rosa/ProductLadder";
import HowItWorks from "@/components/rosa/HowItWorks";
import PlayerExperience from "@/components/rosa/PlayerExperience";
import Tournaments from "@/components/rosa/Tournaments";
import ClubROI from "@/components/rosa/ClubROI";
import Partners from "@/components/rosa/Partners";
import ContactCTA from "@/components/rosa/ContactCTA";
import Footer from "@/components/rosa/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProblemSolution />
      <ProductLadder />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <PlayerExperience />
      <Tournaments />
      <ClubROI />
      <Partners />
      <ContactCTA />
      <Footer />
    </main>
  );
};

export default Index;
