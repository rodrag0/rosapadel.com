import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import ContactCTA from "@/components/rosa/ContactCTA";
import { EventsShowcase } from "@/components/rosa/StudioSections";

export default function NewTab() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <EventsShowcase standalone />
      <ContactCTA />
      <Footer />
    </main>
  );
}
