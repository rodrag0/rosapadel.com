import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Users, BarChart2, TrendingUp, Package, RefreshCw, Globe, ChevronRight, User } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import BrandText from "@/components/rosa/BrandText";
import { hardwareProducts, productCatalog } from "@/lib/productCatalog";

const MARKET_STATS = [
  { value: "25M+", label: "Padel players globally" },
  { value: "25,000+", label: "Courts worldwide" },
  { value: "20%", label: "Annual court growth" },
];

const PRODUCTS = hardwareProducts.map((product, index) => ({
  ...product,
  num: `0${index + 1}`,
  tagline: productCatalog.en[product.id].body,
}));

const BUSINESS_MODEL = [
  {
    icon: Package,
    title: "Hardware Sales",
    desc: "rosa Vision and rosa Portable are the two hardware products. Configuration and current commercial terms are quoted separately.",
  },
  {
    icon: RefreshCw,
    title: "Club Subscription",
    desc: "A separate B2B software and services offer for club operations, the match experience and events.",
  },
  {
    icon: Globe,
    title: "rosa Player Subscription",
    desc: "A separate B2C subscription for player services, with Padel Chess Engine as a player-facing layer. Plan inclusions and commercial terms are confirmed separately.",
  },
];

const TIMELINE = [
  { label: "Prototype", done: true },
  { label: "First pilots", done: true },
  { label: "LOI phase", done: true },
  { label: "Fundraising & launch", done: false },
];

export default function Investors() {
  useEffect(() => {
    document.title = "rosa padel | Investor Overview";
  }, []);

  const heroRef = useRef(null);
  const marketRef = useRef(null);
  const problemRef = useRef(null);
  const productsRef = useRef(null);
  const bizRef = useRef(null);
  const tractionRef = useRef(null);
  const teamRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const marketInView = useInView(marketRef, { once: true, margin: "-100px" });
  const problemInView = useInView(problemRef, { once: true, margin: "-100px" });
  const productsInView = useInView(productsRef, { once: true, margin: "-100px" });
  const bizInView = useInView(bizRef, { once: true, margin: "-100px" });
  const tractionInView = useInView(tractionRef, { once: true, margin: "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-36 pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-3xl"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Investor Overview</span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight">
              Padel is growing.<br />
              <span className="text-primary">rosa is ready.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              <BrandText text="Hardware-led court intelligence for the fastest-growing racket sport in the world. rosa builds the technology infrastructure that every padel court needs but currently lacks." />
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#contact"
                className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-xl px-8 py-3 font-semibold inline-flex items-center gap-2"
              >
                Get in touch
              </a>
              <a
                href="/#products"
                className="rounded-xl px-8 py-3 font-semibold inline-flex items-center gap-2 border border-border hover:border-primary/40 transition-colors text-foreground"
              >
                View product family <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market opportunity */}
      <section ref={marketRef} className="py-24">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={marketInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Market Opportunity</span>
            <h2 className="text-4xl md:text-5xl font-bold">The market.</h2>
            <p className="text-muted-foreground max-w-2xl">
              Padel is one of the fastest-growing sports in the world. Court counts double every three years in Spain alone, and the sport is rapidly expanding across Europe, Latin America, and beyond. Yet the infrastructure serving these courts remains almost entirely analog.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-px rounded-2xl border border-border overflow-hidden bg-border max-w-3xl">
            {MARKET_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                animate={marketInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="bg-card px-6 py-8 space-y-2"
              >
                <p className="font-mono text-3xl md:text-4xl font-bold text-primary tabular-nums">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem + Solution */}
      <section ref={problemRef} className="py-24 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Problem & Solution</span>
            <h2 className="text-4xl md:text-5xl font-bold">A clear gap. A clear answer.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4"
            >
              <span className="text-sm font-mono uppercase tracking-widest text-muted-foreground">The Problem</span>
              <h3 className="text-2xl font-bold">Clubs lack proper tech infrastructure. Players get no data.</h3>
              <ul className="space-y-3">
                {[
                  "Scoreboards are handwritten or non-existent",
                  "No match recording at the club level",
                  "Players leave the court with zero data",
                  "Clubs miss sponsorship and subscription revenue",
                  "Tournaments are managed manually",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-border flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="rounded-2xl border border-primary/20 bg-card p-6 md:p-8 space-y-4"
            >
              <span className="text-sm font-mono uppercase tracking-widest text-primary">The Solution</span>
              <h3 className="text-2xl font-bold"><BrandText text="rosa fills the gap with modular hardware and software." /></h3>
              <ul className="space-y-3">
                {[
                  "LED and HD scoring hardware for any court size",
                  "Camera-integrated replay and analytics layer",
                  "Player dashboards and post-match insights",
                  "Sponsorship, subscription, and recording revenue",
                  "Modular — start entry-level, scale to AI coaching",
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

      {/* Product family */}
      <section ref={productsRef} className="py-24">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Product Family</span>
            <h2 className="text-4xl md:text-5xl font-bold">Two products. Separate subscriptions.</h2>
            <p className="text-muted-foreground max-w-xl">
              <BrandText text="rosa Vision combines connected scoring and video. rosa Portable focuses on LED scoring. Club and rosa Player subscriptions are separate offers." />
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {PRODUCTS.map((product, i) => (
              <motion.a
                key={product.name}
                href={product.href}
                initial={{ opacity: 0, y: 24 }}
                animate={productsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="group rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-muted-foreground/60">{product.num}</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold"><BrandText text={product.name} /></h3>
                  <p className="text-muted-foreground"><BrandText text={product.tagline} /></p>
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:opacity-80 transition-opacity">
                    View product <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Business model */}
      <section ref={bizRef} className="py-24 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={bizInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Business Model</span>
            <h2 className="text-4xl md:text-5xl font-bold">Three revenue streams.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {BUSINESS_MODEL.map((stream, i) => {
              const Icon = stream.icon;
              return (
                <motion.div
                  key={stream.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={bizInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg"><BrandText text={stream.title} /></h3>
                  <p className="text-sm text-muted-foreground leading-relaxed"><BrandText text={stream.desc} /></p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Traction */}
      <section ref={tractionRef} className="py-24">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={tractionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Early Traction</span>
            <h2 className="text-4xl md:text-5xl font-bold">Traction.</h2>
            <p className="text-muted-foreground max-w-xl">
              Current stage: prototype validation, pilot clubs, and first LOIs in place.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                label: "3 Letters of Intent",
                desc: "Signed LOIs from clubs and distributors across Spain and Europe.",
              },
              {
                label: "Prototype validated",
                desc: "Scoring hardware tested in real court conditions.",
              },
              {
                label: "Pilot clubs identified",
                desc: "First pilot venues confirmed and ready for live deployment.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                animate={tractionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-3"
              >
                <h3 className="font-bold text-lg text-primary">{item.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={tractionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl border border-border bg-card p-6 md:p-8"
          >
            <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">Roadmap</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
              {TIMELINE.map((item, i) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${item.done ? "border-primary bg-primary/10 text-primary" : "border-border bg-secondary text-muted-foreground"}`}>
                    <span className="text-xs font-bold">{i + 1}</span>
                  </div>
                  <span className={`text-sm font-medium ${item.done ? "text-foreground" : "text-muted-foreground"}`}>
                    {item.label}
                  </span>
                  {i < TIMELINE.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-24 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Team</span>
            <h2 className="text-4xl md:text-5xl font-bold">The team.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 max-w-4xl">
            {[
              {
                name: "Rodrigo Ponce",
                role: "Co-founder & CEO",
                location: "Heilbronn, Germany",
                bio: "Leads company vision, product strategy, and business development across the rosa ecosystem. Mechatronics engineer, startup operator, and previous founder.",
              },
              {
                name: "Leandro Ponce",
                role: "Co-founder & CFO",
                location: "Mexico",
                bio: "Leads finance, operations, and investment planning. Industrial engineer with 20+ years in finance, operations, and large-scale real estate investments.",
              },
              {
                name: "Saul Ortiz de la Tejera",
                role: "Co-founder & CTO",
                location: "Mexico",
                bio: "Leads hardware, software architecture, AI, IoT, and prototyping. Mechatronics engineer with hands-on engineering experience from Bosch.",
              },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                className="rounded-2xl border border-border bg-card p-6 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center">
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-bold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <p className="text-xs text-muted-foreground font-mono">{member.location}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed"><BrandText text={member.bio} /></p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} id="contact" className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-6"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Contact</span>
            <h2 className="text-4xl md:text-5xl font-bold"><BrandText text="Interested in rosa?" /></h2>
            <p className="text-muted-foreground text-lg">
              We're open to conversations with investors, partners, and distributors who believe in the padel opportunity.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:rodrigo@rosapadel.com"
                className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-xl px-8 py-3 font-semibold inline-flex items-center gap-2"
              >
                Get in touch
              </a>
              <p className="text-sm text-muted-foreground font-mono">rodrigo@rosapadel.com</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
