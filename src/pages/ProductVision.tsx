import { useEffect } from "react";
import { ArrowUpRight, Camera, Monitor, Palette, Shield, Tablet, Trophy } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import BrandText from "@/components/rosa/BrandText";
import ProductTitle from "@/components/rosa/ProductTitle";
import ContactCTA from "@/components/rosa/ContactCTA";
import { tournamentManagementHref } from "@/lib/siteLinks";

const FEATURES = [
  { icon: Monitor, name: "HD scoring", body: "Follow points, games and sets on the court display, alongside the match information." },
  { icon: Tablet, name: "Pads through the glass", body: "Players update the score by touching the rosa pads through the glass. No phone is needed during play." },
  { icon: Camera, name: "Replay & VAR", body: "Revisit a rally or review a disputed play with video. Players or a referee make the call." },
  { icon: Shield, name: "Match setup & referee control", body: "Set up the match with QR or web access and give a referee control of the score when needed." },
  { icon: Trophy, name: "Automated event management", body: "Connect the score feed to tournament, league and Americano workflows, keeping results and competition progress together." },
  { icon: Palette, name: "Your club on screen", body: "Bring your club identity, sponsors and event visuals to the scoring display." },
];

export default function ProductVision() {
  useEffect(() => {
    document.title = "rosa padel | rosa vision";
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <section className="pt-36 pb-20">
        <div className="container mx-auto px-6 lg:px-12 space-y-6">
          <p className="text-xs font-mono uppercase tracking-widest text-primary">Connected court system</p>
          <ProductTitle name="vision" />
          <p className="text-2xl font-semibold">Score. Replay. Connect.</p>
          <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">
            <BrandText text="HD scoring, pads and video in one connected court system. rosa vision brings the match on court together with replay, review and the club's events." />
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground">
              Discuss your setup <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="/products/portable" className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3 font-semibold">
              <BrandText text="Explore rosa portable" /><ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12 space-y-6">
          <img src="/sessions/matchi-live-score/poster.jpg" alt="A recorded padel match played with rosa" className="aspect-video w-full rounded-lg object-contain" loading="lazy" width="1920" height="1080" />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground"><BrandText text="A real match played with rosa." /></p>
            <a href="/match-session/matchi-live-score" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              Watch the recorded match <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-primary">On court. Across the club.</p>
            <h2 className="text-3xl md:text-5xl font-bold">One connected match experience.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, name, body }) => (
              <div key={name} className="space-y-4 rounded-lg border border-border bg-card p-6 md:p-8">
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="text-lg font-bold">{name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground"><BrandText text={body} /></p>
              </div>
            ))}
          </div>
          <a href={tournamentManagementHref} className="inline-flex items-center gap-2 text-primary font-medium">
            Explore tournament management <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="py-20 bg-card/50" data-product-layer="ai">
        <div className="container mx-auto px-6 lg:px-12 space-y-5">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">AI layer · In development</p>
          <h2 className="text-3xl md:text-4xl font-bold"><BrandText text="Go deeper with rosa coach." /></h2>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            <BrandText text="rosa coach is the AI software layer for shot analysis, tactical insights and progress tracking. Club and player services are selected separately to match your setup." />
          </p>
          <a href="/products/coach" className="inline-flex items-center gap-2 text-primary font-medium">
            <BrandText text="Explore rosa coach" /><ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
      <ContactCTA />
      <Footer />
    </main>
  );
}
