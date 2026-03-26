import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Video, Target, FileText, Play, BarChart3 } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const teamA = { name: "Rodrigo/Omar", short: "ROD/OMA" };
const teamB = { name: "Saul/Memo", short: "SAU/MEM" };

const setScores = [
  { a: 6, b: 4 },
  { a: 6, b: 2 },
  { a: 0, b: 0 },
];

const teamStats = [
  { label: "Points Won", a: "62", b: "49" },
  { label: "Winners", a: "29", b: "20" },
  { label: "Unforced Errors", a: "17", b: "25" },
  { label: "Break Points", a: "3/8", b: "0/1" },
];

const players = [
  { name: "Rodrigo", team: 1, rating: 5.56, w: 13, ue: 11, fe: 5, a: 3, smashes: "7/9", kp: -1.94, shots: { bandejas: 8, viboras: 5, volleys: 12 } },
  { name: "Omar", team: 1, rating: 9.2, w: 16, ue: 6, fe: 7, a: 0, smashes: "4/7", kp: 4.7, shots: { bandejas: 6, viboras: 9, volleys: 8 } },
  { name: "Saul", team: 2, rating: -7.95, w: 12, ue: 12, fe: 6, a: 3, smashes: "7/8", kp: 0.77, shots: { bandejas: 4, viboras: 7, volleys: 10 } },
  { name: "Memo", team: 2, rating: -3.83, w: 8, ue: 13, fe: 2, a: 6, smashes: "2/5", kp: -1.11, shots: { bandejas: 3, viboras: 2, volleys: 6 } },
];

const last10 = [1, 2, 2, 2, 1, 2, 2, 1, 1, 1];

export default function PlayerExperience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { copy } = useLanguage();
  const icons = [Video, BarChart3, FileText, Play];
  const mockup = copy.playerExperience.mockup;
  const features = copy.playerExperience.features.map((feature, index) => ({
    icon: icons[index] ?? Target,
    ...feature,
  }));
  const translatedTeamStats = teamStats.map((stat, index) => ({
    ...stat,
    label: mockup.teamStats[index] ?? stat.label,
  }));

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="relative w-72 h-[560px] rounded-[3rem] glass p-3 box-glow animate-float">
              <div className="w-full h-full rounded-[2.4rem] bg-background/90 overflow-hidden flex flex-col">
                <div className="flex justify-between items-center px-6 py-2 text-xs text-muted-foreground font-mono shrink-0">
                  <span>9:41</span>
                  <span className="text-primary font-semibold">ROSA</span>
                  <span>100%</span>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  <div className="text-center space-y-1">
                    <p className="text-[8px] text-muted-foreground font-mono uppercase tracking-widest">
                      {mockup.liveMatch}
                    </p>
                    <div className="flex justify-center items-center gap-3">
                      <div className="text-center">
                        <p className="text-[8px] text-muted-foreground leading-none">{teamA.short}</p>
                        <p className="font-mono text-2xl font-bold text-primary tabular-nums leading-tight">2</p>
                      </div>
                      <span className="text-muted-foreground text-xs">-</span>
                      <div className="text-center">
                        <p className="text-[8px] text-muted-foreground leading-none">{teamB.short}</p>
                        <p className="font-mono text-2xl font-bold tabular-nums leading-tight">0</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-px text-[7px] font-mono mx-4">
                      <div className="text-muted-foreground text-right pr-1" />
                      {["S1", "S2", "S3"].map((setLabel) => (
                        <div key={setLabel} className="text-muted-foreground text-center">{setLabel}</div>
                      ))}
                      <div className="text-[7px] text-primary text-right pr-1 font-semibold">{teamA.short}</div>
                      {setScores.map((score, index) => (
                        <div key={`a${index}`} className="text-center bg-primary/20 rounded-sm mx-0.5 text-primary font-semibold">
                          {score.a}
                        </div>
                      ))}
                      <div className="text-[7px] text-muted-foreground text-right pr-1">{teamB.short}</div>
                      {setScores.map((score, index) => (
                        <div key={`b${index}`} className="text-center bg-secondary rounded-sm mx-0.5">
                          {score.b}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-1 justify-center">
                    {mockup.tabs.map((tab, index) => (
                      <span
                        key={tab}
                        className={`text-[7px] font-mono px-2 py-0.5 rounded-full ${
                          index === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {tab}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[7px] font-mono text-muted-foreground px-1">
                      <span className="text-primary">{teamA.short}</span>
                      <span>{teamB.short}</span>
                    </div>
                    {translatedTeamStats.map((stat) => (
                      <div key={stat.label} className="flex items-center gap-1 text-[8px]">
                        <span className="font-mono font-bold text-primary w-6 text-right tabular-nums">{stat.a}</span>
                        <div className="flex-1 text-center text-[7px] text-muted-foreground truncate">{stat.label}</div>
                        <span className="font-mono font-bold w-6 text-left tabular-nums">{stat.b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-1">
                    {players.map((player) => (
                      <button
                        key={player.name}
                        className={`text-[7px] font-mono py-1 rounded-md text-center transition-colors ${
                          player.name === "Rodrigo" ? "bg-primary text-primary-foreground font-semibold" : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {player.name}
                      </button>
                    ))}
                  </div>

                  <div className="rounded-lg bg-card inner-glow p-2 space-y-1.5 ring-1 ring-primary/30">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-semibold text-primary">{players[0].name}</span>
                      <span className="text-[8px] font-mono text-primary tabular-nums">{players[0].rating}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-center">
                      {(["w", "ue", "fe", "a"] as const).map((key) => (
                        <div key={key}>
                          <p className="font-mono text-xs font-bold text-primary tabular-nums">{players[0][key]}</p>
                          <p className="text-[6px] text-muted-foreground uppercase">{key}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-[7px] text-muted-foreground">
                      <span>Smashes: <span className="font-semibold text-foreground">{players[0].smashes}</span></span>
                      <span>
                        KP:{" "}
                        <span
                          className={`font-semibold font-mono tabular-nums ${
                            players[0].kp >= 0 ? "text-green-400" : "text-destructive"
                          }`}
                        >
                          {players[0].kp}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[7px] font-mono text-muted-foreground uppercase tracking-widest">
                      {mockup.shotBreakdown}
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      {Object.entries(players[0].shots).concat([["smashes", 7] as [string, number]]).map(([shot, count]) => (
                        <div key={shot} className="flex items-center gap-1.5 bg-secondary/50 rounded-md px-2 py-1">
                          <div className="h-1 rounded-full bg-primary" style={{ width: `${(Number(count) / 14) * 100}%`, minWidth: 4 }} />
                          <span className="text-[7px] text-muted-foreground capitalize">{shot}</span>
                          <span className="text-[8px] font-mono font-bold tabular-nums ml-auto">{String(count)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-24 rounded-xl bg-secondary/50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-3 left-6 w-14 h-14 rounded-full bg-primary/40 blur-lg" />
                      <div className="absolute bottom-4 right-5 w-10 h-10 rounded-full bg-primary/60 blur-lg" />
                      <div className="absolute top-8 right-12 w-8 h-8 rounded-full bg-primary/30 blur-lg" />
                      <div className="absolute bottom-3 left-12 w-6 h-6 rounded-full bg-primary/50 blur-md" />
                    </div>
                    <span className="text-[7px] font-mono text-muted-foreground z-10 uppercase tracking-widest">
                      {mockup.courtHeatmap}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[7px] text-muted-foreground">
                      <span>{mockup.rallyAverage}: <span className="font-semibold text-foreground font-mono">6.8</span></span>
                      <span>{mockup.lastRally}: <span className="font-semibold text-foreground font-mono">7</span></span>
                      <span>{mockup.longestRally}: <span className="font-semibold text-foreground font-mono">22</span></span>
                    </div>
                    <div className="flex gap-0.5 justify-center">
                      {last10.map((team, index) => (
                        <span
                          key={index}
                          className={`w-2 h-2 rounded-full ${team === 1 ? "bg-primary" : "bg-muted-foreground/40"}`}
                        />
                      ))}
                    </div>
                    <p className="text-[6px] text-muted-foreground text-center font-mono">{mockup.lastTenPoints}</p>
                  </div>

                  <div className="rounded-lg bg-secondary/50 overflow-hidden">
                    <div className="h-16 bg-secondary flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                      <div className="w-6 h-6 rounded-full bg-primary/80 flex items-center justify-center z-10">
                        <Play className="w-3 h-3 text-primary-foreground fill-current" />
                      </div>
                    </div>
                    <div className="px-2 py-1.5 flex justify-between items-center">
                      <span className="text-[7px] font-semibold">{mockup.highlights}</span>
                      <span className="text-[7px] text-muted-foreground font-mono">2:34</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-4">
              <span className="text-sm font-mono uppercase tracking-widest text-primary">
                {copy.playerExperience.label}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                {copy.playerExperience.title} <span className="text-primary">{copy.playerExperience.accent}</span>{copy.playerExperience.titleSuffix}
              </h2>
              <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono uppercase tracking-[0.22em]">
                {copy.playerExperience.status}
              </div>
              <p className="text-muted-foreground text-lg">{copy.playerExperience.body}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="p-4 rounded-xl inner-glow bg-card space-y-2"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <p className="font-semibold text-sm">{feature.label}</p>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
