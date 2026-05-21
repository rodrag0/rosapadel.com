import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Zap, BarChart2, TrendingUp, Video, ChevronRight, Clock } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";

const FEATURES = [
  {
    icon: Zap,
    name: "AI Shot Analysis",
    desc: "Automatic classification of every shot — type, placement, outcome. No manual tagging required.",
  },
  {
    icon: BarChart2,
    name: "Tactical Breakdown",
    desc: "Match patterns analyzed and presented as clear tactical summaries. Understand what's working and what isn't.",
  },
  {
    icon: TrendingUp,
    name: "Improvement Tracking",
    desc: "Track progress across sessions. See which areas are improving and where to focus next.",
  },
  {
    icon: Video,
    name: "Video Review",
    desc: "AI-tagged video clips of key moments, linked directly to your stats and tactical notes.",
  },
];

export default function ProductCoach() {
  useEffect(() => {
    document.title = "rosa padel | Rosa Coach";
  }, []);

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const roadmapRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const roadmapInView = useInView(roadmapRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-36 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-3xl"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
              <a href="/" className="hover:text-primary transition-colors">rosa</a>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">Rosa Coach</span>
            </div>

            {/* Tier + Status */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-2.5 py-1 rounded border border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Intelligence
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-secondary text-muted-foreground text-[11px] font-mono uppercase tracking-[0.18em]">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 flex-shrink-0" />
                In Development
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight">
              Your AI padel coach.
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl">
              Rosa Coach is the intelligence layer on top of Vision — AI-powered shot analysis, tactical breakdowns, and improvement tracking built for every player level.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#contact"
                className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-xl px-8 py-3 font-semibold inline-flex items-center gap-2"
              >
                Join the Waitlist
              </a>
              <a
                href="/products/vision"
                className="rounded-xl px-8 py-3 font-semibold inline-flex items-center gap-2 border border-border hover:border-primary/40 transition-colors text-foreground"
              >
                See Rosa Vision <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Ecosystem note */}
            <p className="text-sm text-muted-foreground font-mono pt-2">
              Part of the{" "}
              <a href="/products/vision" className="text-primary hover:underline">
                Rosa Vision ecosystem
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature preview cards */}
      <section ref={featuresRef} className="py-24 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">What Rosa Coach Will Do</span>
            <h2 className="text-4xl md:text-5xl font-bold">AI coaching, built for padel.</h2>
            <p className="text-muted-foreground max-w-xl">
              Each of these features is in development. Install Rosa Vision today and Rosa Coach will activate automatically when ready.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-border bg-secondary text-muted-foreground text-[10px] font-mono uppercase tracking-widest">
                      <Clock className="w-3 h-3" />
                      In Development
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roadmap note */}
      <section ref={roadmapRef} className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={roadmapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-8"
          >
            <div className="space-y-3">
              <span className="text-sm font-mono uppercase tracking-widest text-primary">Roadmap</span>
              <h2 className="text-4xl md:text-5xl font-bold">Built on Vision. Automatic when ready.</h2>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Rosa Coach is built on top of Rosa Vision. Install Vision today and Coach will activate automatically when ready — no additional hardware, no reconfiguration.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm font-medium">Core HD</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground hidden sm:block" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  </div>
                  <span className="text-sm font-medium">Rosa Vision</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground hidden sm:block" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Rosa Coach</span>
                </div>
              </div>
            </div>

            <a
              href="/products/vision"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
            >
              Learn about Rosa Vision <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section ref={ctaRef} id="contact" className="py-24 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-6"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Waitlist</span>
            <h2 className="text-4xl md:text-5xl font-bold">Be the first to get Rosa Coach.</h2>
            <p className="text-muted-foreground text-lg">
              Join the waitlist and we'll notify you as soon as Rosa Coach is ready. Early access for Vision pilot clubs.
            </p>
            <a
              href="mailto:rodrigo@rosapadel.com"
              className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-xl px-8 py-3 font-semibold inline-flex items-center gap-2"
            >
              Join the Waitlist
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
