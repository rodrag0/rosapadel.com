import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, Camera, Gamepad2, Radio, Share2, Tv, Zap } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import BrandText from "@/components/rosa/BrandText";

const SESSION_VIDEO = "/sessions/matchi-live-score/scoreboard-session.mp4";
const SESSION_POSTER = "/sessions/matchi-live-score/poster.jpg";

const SIGNALS = [
  {
    icon: Gamepad2,
    title: "Through-glass pad input",
    body: "Players update the score by touching the rosa pads through the court glass. The signal reaches the scoring system without phones, apps, or someone entering the court.",
  },
  {
    icon: Radio,
    title: "Live score state",
    body: "Each pad touch updates the match state in real time, ready to sync into club software or broadcast layers.",
  },
  {
    icon: Camera,
    title: "Camera overlay",
    body: "The camera feed includes a persistent scoreboard overlay so viewers can follow the match without context loss.",
  },
];

export default function MatchSessionMatchi() {
  const heroRef = useRef(null);
  const detailsRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const detailsInView = useInView(detailsRef, { once: true, margin: "-80px" });

  useEffect(() => {
    document.title = "rosa padel | Matchi live scoring session";

    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section ref={heroRef} className="pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-[0.9fr_1.4fr] gap-10 items-end"
          >
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-mono uppercase tracking-widest text-primary">Match session</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Live scoring demo
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight">
                  <BrandText text="rosa live score session for Matchi TV" />
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  <BrandText text="A real padel match recorded with rosa pads, camera capture, and a live scoreboard overlay that updates as players touch the pads through the court glass." />
                </p>
              </div>

              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border">
                {[
                  ["Input", "through-glass pads"],
                  ["Output", "live overlay"],
                  ["Session", "39:36"],
                ].map(([label, value]) => (
                  <div key={label} className="bg-card px-4 py-4">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</p>
                    <p className="mt-1 text-sm font-semibold"><BrandText text={value} /></p>
                  </div>
                ))}
              </div>

              <a
                href="https://rosatournademo-alt1.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Open live management demo
              </a>
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-3 shadow-2xl shadow-primary/10">
              <video
                className="aspect-video w-full rounded-[1.35rem] bg-black object-cover"
                controls
                playsInline
                preload="metadata"
                poster={SESSION_POSTER}
              >
                <source src={SESSION_VIDEO} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={detailsRef} className="py-16 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={detailsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-[1fr_0.8fr] gap-10"
          >
            <div className="space-y-8">
              <div className="space-y-3 max-w-3xl">
                <span className="text-sm font-mono uppercase tracking-widest text-primary">Integration proof</span>
                <h2 className="text-4xl md:text-5xl font-bold">A live scoring layer for app and broadcast workflows.</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  This session shows the core loop Matchi asked about at Padel World Summit: through-glass court-side score input, live state updates, and a video feed that can carry the score into Matchi TV or other match-session views.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {SIGNALS.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={detailsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="rounded-2xl border border-border bg-card p-6 space-y-4"
                    >
                      <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          <BrandText text={item.body} />
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-primary/20 bg-card p-8 space-y-6 h-fit">
              <div className="space-y-2">
                <span className="text-sm font-mono uppercase tracking-widest text-primary">For Matchi</span>
                <h3 className="text-2xl font-bold">What this could become inside Matchi TV</h3>
              </div>

              <ul className="space-y-4">
                {[
                  ["Live match session links", Share2],
                  ["Court camera view with score overlay", Tv],
                  ["Through-glass pad scoring without manual app input", Zap],
                  ["Score state available for partner integrations", Activity],
                  ["Management software powered by the live pad score feed", Radio],
                ].map(([text, icon]) => {
                  const Icon = icon as typeof Activity;

                  return (
                    <li key={text as string} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{text as string}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="rounded-2xl bg-secondary p-5 space-y-2">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Session URL</p>
                <p className="break-all text-sm font-semibold">rosapadel.com/match-session/matchi-live-score</p>
              </div>

              <div className="rounded-2xl bg-secondary p-5 space-y-3">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Management demo</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Tournament and court management software that can use the live score feed coming from the pads.
                </p>
                <a
                  href="https://rosatournademo-alt1.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-sm font-semibold text-primary hover:underline"
                >
                  Open demo software →
                </a>
              </div>

              <a
                href="mailto:rodrigo@rosapadel.com?subject=rosa%20x%20Matchi%20TV%20live%20scoring"
                className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Discuss integration
              </a>
            </aside>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
