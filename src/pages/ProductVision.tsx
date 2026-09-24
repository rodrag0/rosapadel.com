import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Camera, Play, MapPin, User, Tv, BarChart2, ChevronRight, AlertTriangle } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import BrandText from "@/components/rosa/BrandText";

const FEATURES = [
  {
    icon: Camera,
    name: "Camera Integration",
    desc: "Fixed-position IP cameras capture the full match automatically. No operator required.",
  },
  {
    icon: Play,
    name: "Replay & VAR Review",
    desc: "Revisit a play with video during the Vision pilot. Players or a referee review the footage and retain the decision; this is not automated line calling.",
  },
  {
    icon: MapPin,
    name: "Court Heatmaps",
    desc: "See where points are won and lost on court. Positioning patterns and shot zones visualized.",
  },
  {
    icon: User,
    name: "Player History",
    desc: "Build a personal match archive. Stats, clips, and summaries stored for every session.",
  },
  {
    icon: Tv,
    name: "Club Screens",
    desc: "Live matches and replays feed directly to lobby screens and club displays.",
  },
  {
    icon: BarChart2,
    name: "Post-Match Insights",
    desc: "Automatic post-match summary with shot breakdown, rally data, and momentum chart.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Cameras capture the match",
    desc: "Fixed IP cameras on court record the session in sync with the Core HD scoring system.",
  },
  {
    num: "02",
    title: "Vision processes the data",
    desc: "On-device computer vision extracts points, positions, and shot data in real time.",
  },
  {
    num: "03",
    title: "Players and clubs review",
    desc: "Players access their dashboard. Clubs push content to screens. Everyone gets value.",
  },
];

const SPECS = [
  ["Camera", "Fixed-position IP camera"],
  ["Processing", "On-device computer vision"],
  ["Output", "Replay clips, heatmaps, dashboards"],
  ["App", "Web-based player dashboard"],
  ["Compatibility", "Requires Core HD"],
];

const STATS = [
  { value: "Camera", label: "Integrated" },
  { value: "Post-match", label: "Insights" },
  { value: "Club screens", label: "Ready" },
];

export default function ProductVision() {
  useEffect(() => {
    document.title = "rosa padel | rosa Vision";
  }, []);

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const stepsRef = useRef(null);
  const audienceRef = useRef(null);
  const compatRef = useRef(null);
  const specsRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const stepsInView = useInView(stepsRef, { once: true, margin: "-100px" });
  const audienceInView = useInView(audienceRef, { once: true, margin: "-100px" });
  const compatInView = useInView(compatRef, { once: true, margin: "-100px" });
  const specsInView = useInView(specsRef, { once: true, margin: "-100px" });
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
              <span className="text-foreground"><BrandText text="rosa Vision" /></span>
            </div>

            {/* Tier + Status */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-2.5 py-1 rounded border border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Advanced
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-400 text-[11px] font-mono uppercase tracking-[0.18em]">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                Pilot-ready
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight">
              Every match.<br />Captured.<br />
              <span className="text-primary">Analyzed. Shared.</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl">
              <BrandText text="rosa Vision adds camera-integrated replay, court heatmaps, and player analytics on top of Core HD." />
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#contact"
                className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-xl px-8 py-3 font-semibold inline-flex items-center gap-2"
              >
                Join the Vision Pilot
              </a>
              <a
                href="/products/core-hd"
                className="rounded-xl px-8 py-3 font-semibold inline-flex items-center gap-2 border border-border hover:border-primary/40 transition-colors text-foreground"
              >
                See Core HD <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid grid-cols-3 gap-px rounded-2xl border border-border overflow-hidden bg-border max-w-2xl"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-card px-6 py-6 space-y-1">
                <p className="font-mono text-xl md:text-2xl font-bold text-primary tabular-nums">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="py-24">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Features</span>
            <h2 className="text-4xl md:text-5xl font-bold">The full picture, every match.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
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
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
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

      {/* How it works */}
      <section ref={stepsRef} className="py-24 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold">Capture. Process. Review.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="space-y-4"
              >
                <span className="font-mono text-4xl font-bold text-primary/20">{step.num}</span>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Players + For Clubs */}
      <section ref={audienceRef} className="py-24">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={audienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Who It's For</span>
            <h2 className="text-4xl md:text-5xl font-bold">Value for everyone on court.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={audienceInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6"
            >
              <div className="space-y-2">
                <span className="text-sm font-mono uppercase tracking-widest text-primary">For Players</span>
                <h3 className="text-2xl font-bold">Your match. Revisited.</h3>
                <p className="text-muted-foreground">Turn every session into a resource you can learn from and share.</p>
              </div>
              <ul className="space-y-3">
                {[
                  "Instant replay of key points",
                  "Personal match history dashboard",
                  "Shot breakdown and court heatmaps",
                  "Shareable clips and match recaps",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={audienceInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6"
            >
              <div className="space-y-2">
                <span className="text-sm font-mono uppercase tracking-widest text-primary">For Clubs</span>
                <h3 className="text-2xl font-bold">More reasons to return.</h3>
                <p className="text-muted-foreground">Vision turns your courts into content — and your members into regulars.</p>
              </div>
              <ul className="space-y-3">
                {[
                  "Club screens showing live matches and replays",
                  "Content library for promotion and sponsors",
                  "Member retention through personalized stats",
                  "Seamless extension of the Core HD system",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compatibility note */}
      <section ref={compatRef} className="py-12 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={compatInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-6 flex items-start gap-4 max-w-2xl"
          >
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-yellow-400 text-sm">Core HD required</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <BrandText text="rosa Vision extends Core HD — you'll need Core HD installed first. " />
                <a href="/products/core-hd" className="text-primary hover:underline">
                  Learn about Core HD →
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Specs */}
      <section ref={specsRef} className="py-24">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={specsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Specifications</span>
            <h2 className="text-4xl md:text-5xl font-bold"><BrandText text="rosa Vision specs." /></h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={specsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-border bg-card overflow-hidden max-w-2xl"
          >
            {SPECS.map(([key, value], i) => (
              <div
                key={key}
                className={`grid grid-cols-2 px-6 py-4 gap-4 ${i < SPECS.length - 1 ? "border-b border-border" : ""}`}
              >
                <span className="text-sm font-medium text-muted-foreground">{key}</span>
                <span className="text-sm font-semibold">{value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} id="contact" className="py-24 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-6"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Join the Pilot</span>
            <h2 className="text-4xl md:text-5xl font-bold">Join the Vision Pilot.</h2>
            <p className="text-muted-foreground text-lg">
              A limited number of clubs are joining the Vision pilot. Get early access, direct support, and pilot pricing.
            </p>
            <a
              href="mailto:rodrigo@rosapadel.com"
              className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-xl px-8 py-3 font-semibold inline-flex items-center gap-2"
            >
              Join the Vision Pilot
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
