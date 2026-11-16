import Navbar from "@/components/rosa/Navbar";
import { CourtsideHero, CourtsideProof, CourtsideShare, CourtsideStudio, CourtsideWorkflow } from "@/components/rosa/CourtsideSections";
import Partners from "@/components/rosa/Partners";
import ContactCTA from "@/components/rosa/ContactCTA";
import Footer from "@/components/rosa/Footer";
import {
  HardwareCollection,
  EventsShowcase,
  ClubInvitation,
} from "@/components/rosa/StudioSections";

export default function Index() {
  return (
    <main className="rosa-studio courtside-home min-h-screen bg-background text-foreground">
      <Navbar />
      <CourtsideStudio />
      <CourtsideHero />
      <CourtsideProof />
      <CourtsideWorkflow />
      <CourtsideShare />
      <HardwareCollection />
      <EventsShowcase />
      <ClubInvitation />
      <Partners />
      <ContactCTA />
      <Footer />
    </main>
  );
}
