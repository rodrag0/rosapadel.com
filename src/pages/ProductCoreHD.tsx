import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Monitor, QrCode, Shield, Palette, Cloud, LayoutGrid, Trophy, ChevronRight } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import BrandText from "@/components/rosa/BrandText";

const FEATURES = [
  {
    icon: Monitor,
    name: "HD Monitor",
    desc: "27\" 1080p monitor mounted courtside. Crystal clear scoring and match info visible from any angle.",
  },
  {
    icon: QrCode,
    name: "QR Match Setup",
    desc: "Players scan a QR code to enter names and match settings instantly. No manual input at the controller.",
  },
  {
    icon: Shield,
    name: "Referee Mode",
    desc: "Dedicated referee control for tournaments — full match authority with score override and event management.",
  },
  {
    icon: Trophy,
    name: "Tournament Management",
    desc: "Run brackets, sets, tiebreaks, and court assignments from the HD system without extra setup overhead.",
  },
  {
    icon: Palette,
    name: "Custom Branding",
    desc: "Display your club logo, sponsor banners, and custom event visuals directly on the match screen.",
  },
  {
    icon: Cloud,
    name: "Cloud Sync",
    desc: "Match data syncs to the cloud automatically. Access stats and history from any device.",
  },
  {
    icon: LayoutGrid,
    name: "Multi-Court",
    desc: "Manage multiple courts from a single dashboard. View all active matches at a glance.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Install the HD monitor",
    desc: "One HDMI cable and one power connection. Mounts on any surface — wall, post, or portable stand.",
  },
  {
    num: "02",
    title: "Set up the match",
    desc: "Players scan a QR code or use the web interface to enter names and settings. Ready in seconds.",
  },
  {
    num: "03",
    title: "Referee or self-manage",
    desc: "Referee mode for tournaments, or players self-manage with touchpads. Either way, it just works.",
  },
];

const SPECS = [
  ["Display", '27" HD monitor, 1080p'],
  ["Display", "HD monitor — wall or stand mount"],
  ["Control pads", "Wireless pads for each team"],
  ["Control", "Wireless touchpads"],
  ["Connectivity", "Wi-Fi / Ethernet"],
  ["Tournament tools", "Brackets, sets, tiebreaks, court assignments"],
  ["Setup time", "Under 5 minutes"],
  ["Price", "From €549"],
];

const STATS = [
  { value: "< 5 min", label: "Setup" },
  { value: "HD 1080p", label: "Display" },
  { value: "Cloud sync", label: "Enabled" },
];

export default function ProductCoreHD() {
  useEffect(() => {
    document.title = "rosa padel | Core HD";
  }, []);

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const stepsRef = useRef(null);
  const archRef = useRef(null);
  const specsRef = useRef(null);
  const upgradeRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const stepsInView = useInView(stepsRef, { once: true, margin: "-100px" });
  const archInView = useInView(archRef, { once: true, margin: "-100px" });
  const specsInView = useInView(specsRef, { once: true, margin: "-100px" });
  const upgradeInView = useInView(upgradeRef, { once: true, margin: "-100px" });
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
              <span className="text-foreground">Core HD</span>
            </div>

            {/* Tier + Status */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-2.5 py-1 rounded border border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Professional
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[11px] font-mono uppercase tracking-[0.18em]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                Production ready
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight">
              The professional<br />match experience.
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl">
              HD display, QR match setup, referee mode, and cloud sync — everything a professional padel venue needs.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#contact"
                className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-xl px-8 py-3 font-semibold inline-flex items-center gap-2"
              >
                Book a Demo
              </a>
              <a
                href="/products/core-led"
                className="rounded-xl px-8 py-3 font-semibold inline-flex items-center gap-2 border border-border hover:border-primary/40 transition-colors text-foreground"
              >
                See Core LED
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
                <p className="font-mono text-2xl md:text-3xl font-bold text-primary tabular-nums">{stat.value}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold">Professional-grade, out of the box.</h2>
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
            <h2 className="text-4xl md:text-5xl font-bold">From box to match in five minutes.</h2>
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

      {/* Architecture */}
      <section ref={archRef} className="py-24">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={archInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Architecture</span>
            <h2 className="text-4xl md:text-5xl font-bold">The hardware stack.</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={archInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid sm:grid-cols-3 gap-5 max-w-3xl"
          >
            {[
              { label: "HD Screen", desc: "Wall or stand mounted. Shows the live score, match timer, and branding — clearly visible from anywhere on court." },
              { label: "Control Pads", desc: "One pad per team. Players tap to record points. Wireless, simple, and built to last." },
              { label: "One box. Everything inside.", desc: "All the software, display, and wireless in a single compact unit. No servers, no IT setup, no technician required." },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-card p-6 space-y-2">
                <p className="font-bold">{item.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Specs */}
      <section ref={specsRef} className="py-24 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={specsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Specifications</span>
            <h2 className="text-4xl md:text-5xl font-bold">Core HD specs.</h2>
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

      {/* Upgrade path */}
      <section ref={upgradeRef} className="py-20">
        <div className="container mx-auto px-6 lg:px-12 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={upgradeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">What's Next</span>
            <h2 className="text-3xl md:text-4xl font-bold">Take it further with Vision.</h2>
            <p className="text-muted-foreground">
              <BrandText text="Core HD is the foundation. rosa Vision and rosa Coach build on top." />
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                name: "rosa Vision",
                tier: "Advanced",
                desc: "Camera-integrated replay, court heatmaps, player history, and club screen content.",
                href: "/products/vision",
                status: "Pilot-ready",
                statusClass: "border-yellow-400/30 bg-yellow-400/10 text-yellow-400",
                dotClass: "bg-yellow-400",
              },
              {
                name: "rosa Coach",
                tier: "Intelligence",
                desc: "AI shot analysis, tactical breakdown, improvement tracking, and video review.",
                href: "/products/coach",
                status: "Coming soon",
                statusClass: "border-border bg-secondary text-muted-foreground",
                dotClass: "bg-muted-foreground/40",
              },
            ].map((product, i) => (
              <motion.a
                key={product.name}
                href={product.href}
                initial={{ opacity: 0, y: 24 }}
                animate={upgradeInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="group rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-2 py-0.5 rounded border border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    {product.tier}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono uppercase tracking-[0.18em] ${product.statusClass}`}>
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${product.dotClass}`} />
                    {product.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold"><BrandText text={product.name} /></h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:opacity-80 transition-opacity">
                  Learn more <ChevronRight className="w-4 h-4" />
                </span>
              </motion.a>
            ))}
          </div>
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
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Get Started</span>
            <h2 className="text-4xl md:text-5xl font-bold">Get Core HD in your club.</h2>
            <p className="text-muted-foreground text-lg">
              Book a demo and we'll walk you through the setup, features, and pricing for your venue.
            </p>
            <a
              href="mailto:rodrigo@rosapadel.com"
              className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-xl px-8 py-3 font-semibold inline-flex items-center gap-2"
            >
              Book a Demo
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
