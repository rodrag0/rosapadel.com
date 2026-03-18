import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Tv, Eye, Check } from "lucide-react";

const products = [
  {
    tier: "Entry",
    name: "Core LED",
    icon: Monitor,
    description: "Portable LED scoring for any court. Touchpad control, offline operation, plug-and-play installation.",
    features: ["LED Scoreboard", "Touchpad Control", "Offline Mode", "Plug & Play", "Tournament Ready"],
    highlight: false,
  },
  {
    tier: "Growth",
    name: "Core HD",
    icon: Tv,
    description: "HD display with QR/web match setup, referee mode, and premium event branding capabilities.",
    features: ["HD Monitor Display", "QR/Web Setup", "Referee Mode", "Custom Branding", "Event Management", "Cloud Sync"],
    highlight: true,
  },
  {
    tier: "Advanced",
    name: "rosa Vision",
    icon: Eye,
    description: "AI-powered analysis with video replay, heatmaps, and shot classification. Access your full match video and stats online after every game.",
    features: ["Everything in Core HD", "AI Video Analysis", "Instant Replay", "Heatmaps", "Shot Classification", "Player Stats", "Online Match Access"],
    highlight: false,
  },
];

export default function ProductLadder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32" id="products">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono uppercase tracking-widest text-primary">Modular Products</span>
          <h2 className="text-4xl md:text-5xl font-bold">One System. Three Tiers.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start where you are. Scale when you're ready. Every tier is built to work independently — or together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-2xl p-8 space-y-6 transition-shadow duration-300 ${
                  product.highlight
                    ? "bg-card box-glow border border-primary/20"
                    : "bg-card inner-glow"
                }`}
              >
                {product.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider">
                    Popular
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{product.tier}</span>
                    <h3 className="text-xl font-bold">{product.name}</h3>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">{product.description}</p>

                <ul className="space-y-2.5">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
