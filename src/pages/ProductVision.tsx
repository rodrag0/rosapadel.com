import { ArrowUpRight, Camera, Monitor, Palette, Shield, Tablet, Trophy } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import BrandText from "@/components/rosa/BrandText";
import ProductTitle from "@/components/rosa/ProductTitle";
import ContactCTA from "@/components/rosa/ContactCTA";
import { tournamentManagementHref } from "@/lib/siteLinks";

const MATCH_PREVIEW_URL = "https://cloud.rosapadel.com/media/tolito-mati-expo-20261018/preview-63527cc14d19.mp4";
const MATCH_SHARE_URL = "https://cloud.rosapadel.com/watch?grant=f4cab714-f796-4a31-9e41-7dcd05a5e384";

const FEATURES = [
  { icon: Monitor, name: "HD scoring", body: "Follow points, games and sets on the court display, alongside the match information." },
  { icon: Tablet, name: "Pads through the glass", body: "Players update the score by touching the rosa pads through the glass. No phone is needed during play." },
  { icon: Camera, name: "Replay & VAR", body: "Revisit a rally or review a disputed play with video. Players or a referee make the call." },
  { icon: Shield, name: "Match setup & referee control", body: "Set up the match with QR or web access and give a referee control of the score when needed." },
  { icon: Trophy, name: "Automated event management", body: "Connect the score feed to tournament, league and Americano workflows, keeping results and competition progress together." },
  { icon: Palette, name: "Your club on screen", body: "Bring your club identity, sponsors and event visuals to the scoring display." },
];

export default function ProductVision() {
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

      <section id="match-preview" className="scroll-mt-24 py-16 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12">
          <figure className="space-y-6">
            <video
              controls
              playsInline
              preload="none"
              poster="https://cloud.rosapadel.com/media/tolito-mati-expo-20261018/poster-4e7582d7a08e.webp"
              width="1280"
              height="720"
              aria-label="Final Expo 2026 match preview: Tolito / Mati vs Argañaras / Pablo"
              className="aspect-video w-full rounded-lg bg-black object-contain"
            >
              <source src={MATCH_PREVIEW_URL} type="video/mp4" />
              <a href={MATCH_SHARE_URL}>Open the Final Expo 2026 match</a>
            </video>
            <figcaption className="flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0 space-y-1">
                <p className="font-medium">Tolito / Mati vs Argañaras / Pablo</p>
                <p className="text-sm text-muted-foreground">Final Expo 2026 · 18 October 2026 · Match preview</p>
              </div>
              <a href={MATCH_SHARE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary">
                Open preview <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
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
