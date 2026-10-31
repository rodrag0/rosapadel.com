import Navbar from "@/components/rosa/Navbar";
import HeroSection from "@/components/rosa/HeroSection";
import Partners from "@/components/rosa/Partners";
import ContactCTA from "@/components/rosa/ContactCTA";
import Footer from "@/components/rosa/Footer";
import {
  HardwareCollection,
  RealMatch,
  MatchWorkflow,
  EventsShowcase,
  ClubInvitation,
} from "@/components/rosa/StudioSections";

export default function Index() {
  return (
    <main className="rosa-studio min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <HardwareCollection />
      <RealMatch />
      <MatchWorkflow />
      <EventsShowcase />
      <ClubInvitation />
      <Partners />
      <ContactCTA />
      <Footer />
    </main>
  );
}
