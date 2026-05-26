import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { WifiOff, Plug, Monitor, Tablet, ChevronRight } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";

const FEATURES = [
  {
    icon: Monitor,
    name: "LED Scoreboard",
    desc: "Two bright LED scoreboards positioned courtside — visible from every angle, in any lighting condition.",
  },
  {
    icon: Tablet,
    name: "Touchpad Control",
    desc: "Both teams control the score via wireless touchpads. No phones, no apps, no distractions.",
  },
  {
    icon: WifiOff,
    name: "Offline Mode",
    desc: "Zero network dependency. Core LED runs entirely offline — perfect for any club, any location.",
  },
  {
    icon: Plug,
    name: "Plug & Play",
    desc: "Power on and you're ready. No configuration, no cables to hide, no contractor required.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Unbox and mount",
    desc: "Place the LED scoreboard courtside. No tools needed — the mounting system handles any surface.",
  },
  {
    num: "02",
    title: "Pair touchpads",
    desc: "Both teams get a wireless touchpad. Point control is immediate from the first rally.",
  },
  {
    num: "03",
    title: "Score every match",
    desc: "Live score visible to all players and spectators. Sets, games, tiebreaks — all handled.",
  },
];

const SPECS = [
  ["Display", "LED scoreboards × 2"],
  ["Control", "Wireless touchpads"],
  ["Power", "Mains adapter"],
  ["Connectivity", "None required — offline"],
  ["Setup time", "Under 1 minute"],
  ["Operating modes", "Match / Training"],
  ["Price", "From €299"],
];

const STATS = [
  { value: "< 1 min", label: "Setup time" },
  { value: "100%", label: "Offline-capable" },
  { value: "Any court", label: "Compatibility" },
];

export default function ProductCoreLED() {
  useEffect(() => {
    document.title = "rosa padel | Core LED";
  }, []);

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const stepsRef = useRef(null);
  const specsRef = useRef(null);
  const upgradeRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const stepsInView = useInView(stepsRef, { once: true, margin: "-100px" });
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
              <span className="text-foreground">Core LED</span>
            </div>

            {/* Tier + Status */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-2.5 py-1 rounded border border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Entry
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[11px] font-mono uppercase tracking-[0.18em]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                Available now
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight">
              Plug in.<br />Score on.
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl">
              The simplest way to bring professional scoring to any padel court. No network. No complexity. Just score.
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
            <h2 className="text-4xl md:text-5xl font-bold">Everything you need. Nothing you don't.</h2>
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
            <h2 className="text-4xl md:text-5xl font-bold">Up and running in under a minute.</h2>
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
            <h2 className="text-4xl md:text-5xl font-bold">Core LED specs.</h2>
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
      <section ref={upgradeRef} className="py-20 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={upgradeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Upgrade Path</span>
            <h2 className="text-3xl md:text-4xl font-bold">Ready to go further?</h2>
            <p className="text-muted-foreground">Core LED is just the beginning. Scale when you're ready.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                name: "Core HD",
                tier: "Professional",
                desc: "HD monitor display, QR match setup, referee mode, custom branding, and cloud sync.",
                href: "/products/core-hd",
              },
              {
                name: "Rosa Vision",
                tier: "Advanced",
                desc: "Camera-integrated replay, court heatmaps, player history, and club screen content.",
                href: "/products/vision",
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
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded border border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    {product.tier}
                  </span>
                </div>
                <h3 className="text-2xl font-bold">{product.name}</h3>
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
            <h2 className="text-4xl md:text-5xl font-bold">Get Core LED in your club.</h2>
            <p className="text-muted-foreground text-lg">
              We'll help you find the right configuration and get you set up. No commitment required.
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
