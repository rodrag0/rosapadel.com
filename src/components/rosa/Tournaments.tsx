import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Users, Monitor, Zap } from "lucide-react";

const benefits = [
  {
    icon: Monitor,
    title: "Live Court Visibility",
    desc: "Real-time scores visible on court and remotely. Spectators and organizers always know the match status.",
  },
  {
    icon: Trophy,
    title: "Pro Match Experience",
    desc: "Every match feels premium with live scoring, instant replays, and post-match stats for players and spectators.",
  },
  {
    icon: Users,
    title: "Post-Match Content",
    desc: "Players get shareable match videos and stats. Organizers get content for social media and event promotion.",
  },
  {
    icon: Zap,
    title: "Multi-Court Ready",
    desc: "Scale from a single court to full-venue events. Each court runs independently with rosa Vision.",
  },
];

export default function Tournaments() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32" id="tournaments">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono uppercase tracking-widest text-primary">Tournaments & Events</span>
          <h2 className="text-4xl md:text-5xl font-bold">Run Events Like the Pros</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From local padel tournaments to premium events — <span className="text-primary font-semibold">rosa</span> handles the match experience
            so organizers can focus on the event.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl inner-glow bg-card"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-lg">{b.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Video Output highlight */}
        <motion.div
          className="mt-12 p-8 rounded-2xl inner-glow bg-card text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto">
            <Monitor className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">TV-Style Video Output</h3>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Every match generates a full video with live score overlay throughout the game
            and complete statistics at the end of each set — just like a professional broadcast.
            Players can share and relive their matches instantly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
