import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Megaphone, RefreshCw, Video, Trophy, Wrench, Users, TrendingUp, CheckCircle, LayoutGrid, Clock, Bell, CalendarDays } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import ROICalculator from "@/components/rosa/ROICalculator";
import BrandText from "@/components/rosa/BrandText";

const STATS = [
  { value: "Up to 25%", label: "More bookings" },
  { value: "3+", label: "New revenue streams" },
  { value: "< 5 min", label: "Installation" },
];

const REVENUE_STREAMS = [
  {
    icon: Megaphone,
    title: "Sponsorship Displays",
    desc: "Court-side screens show sponsor branding during every match. Turn your courts into advertising real estate.",
  },
  {
    icon: RefreshCw,
    title: "Analytics Subscriptions",
    desc: "Clubs earn recurring revenue as players subscribe to access their match history and performance insights.",
  },
  {
    icon: Video,
    title: "Premium Recording Packages",
    desc: "Offer match recording as a premium add-on. Players pay for the footage — you profit from the infrastructure.",
  },
  {
    icon: Trophy,
    title: "Tournament Content",
    desc: "Generate and sell event highlight packages. Premium tournament experiences that justify higher entry fees.",
  },
];

const REASONS = [
  {
    icon: Wrench,
    title: "Simple installation",
    desc: "rosa Portable brings offline LED scoring. We plan the screen, camera and connection requirements for each rosa Vision installation.",
  },
  {
    icon: Users,
    title: "Immediate player impact",
    desc: "Players notice the difference from the first match. Professional scoring elevates the perceived quality of your venue.",
  },
  {
    icon: TrendingUp,
    title: "Grows with you",
    desc: "Choose rosa Portable or rosa Vision for your courts, then discuss the separate club subscription that fits your operation.",
  },
];

const INSTALL_STEPS = [
  {
    num: "01",
    title: "Plan",
    desc: "Choose your hardware and subscription separately, based on your courts and priorities. We help you get the configuration right.",
  },
  {
    num: "02",
    title: "Install",
    desc: "Set up your rosa Portable scoreboard or prepare your rosa Vision installation with our team.",
  },
  {
    num: "03",
    title: "Activate",
    desc: "You're live immediately. Players see professional scoring from the very first match.",
  },
];

export default function ForClubs() {
  useEffect(() => {
    document.title = "rosa padel | For Clubs";
  }, []);

  const heroRef = useRef(null);
  const revenueRef = useRef(null);
  const tournamentRef = useRef(null);
  const reasonsRef = useRef(null);
  const installRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const revenueInView = useInView(revenueRef, { once: true, margin: "-100px" });
  const tournamentInView = useInView(tournamentRef, { once: true, margin: "-100px" });
  const reasonsInView = useInView(reasonsRef, { once: true, margin: "-100px" });
  const installInView = useInView(installRef, { once: true, margin: "-100px" });
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
            <span className="text-sm font-mono uppercase tracking-widest text-primary">For Clubs & Venues</span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight">
              Built for clubs that want to grow.
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              <BrandText text="rosa gives your venue professional-grade court technology that increases bookings, creates new revenue, and installs in minutes — not days." />
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#contact"
                className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-xl px-8 py-3 font-semibold inline-flex items-center gap-2"
              >
                Book a Demo
              </a>
              <a
                href="/#products"
                className="rounded-xl px-8 py-3 font-semibold inline-flex items-center gap-2 border border-border hover:border-primary/40 transition-colors text-foreground"
              >
                See Products
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

      {/* ROI Calculator */}
      <ROICalculator />

      {/* Revenue streams */}
      <section ref={revenueRef} className="py-24">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={revenueInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Revenue Streams</span>
            <h2 className="text-4xl md:text-5xl font-bold">New revenue from day one.</h2>
            <p className="text-muted-foreground max-w-xl">
              <BrandText text="rosa doesn't just improve your courts — it opens revenue channels you don't currently have." />
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {REVENUE_STREAMS.map((stream, i) => {
              const Icon = stream.icon;
              return (
                <motion.div
                  key={stream.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={revenueInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">{stream.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{stream.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tournament management */}
      <section ref={tournamentRef} className="py-24 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={tournamentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3 max-w-2xl"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Tournament Management</span>
            <h2 className="text-4xl md:text-5xl font-bold">Run tournaments without the chaos.</h2>
            <p className="text-muted-foreground text-lg">
              <BrandText text="rosa gives your organizers a live view of every court — who's playing, what's waiting, and where to send each match next. No whiteboards. No shouting across the venue." />
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: LayoutGrid,
                title: "Court Status Board",
                desc: "See every court at a glance — In Use, On Hold, or Available. Visible on the central club screen and on your device.",
              },
              {
                icon: CalendarDays,
                title: "Smart Court Allocation",
                desc: "Assign matches to courts from one screen. Drag, tap, confirm. Organizers stay in control without running between courts.",
              },
              {
                icon: Clock,
                title: "ETA & Wait Times",
                desc: "Players waiting for their court see a live estimated wait time based on match progress. No more gathering around the organizer asking when they're on.",
              },
              {
                icon: Bell,
                title: "Live Draw on Club Screens",
                desc: "The tournament bracket and court assignments display live across all rosa screens in the venue. Players always know where they stand.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={tournamentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.12 }}
                  className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed"><BrandText text={item.desc} /></p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why clubs choose rosa */}
      <section ref={reasonsRef} className="py-24 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={reasonsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary"><BrandText text="Why rosa" /></span>
            <h2 className="text-4xl md:text-5xl font-bold"><BrandText text="Why clubs choose rosa." /></h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {REASONS.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={reasonsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  className="space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{reason.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm"><BrandText text={reason.desc} /></p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Installation process */}
      <section ref={installRef} className="py-24">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={installInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Installation</span>
            <h2 className="text-4xl md:text-5xl font-bold">You're live the same day.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {INSTALL_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                animate={installInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-4xl font-bold text-primary/20">{step.num}</span>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed"><BrandText text={step.desc} /></p>
              </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold">Ready to upgrade your club?</h2>
            <p className="text-muted-foreground text-lg">
              Book a demo and we'll find the right configuration for your venue size, budget, and goals.
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
