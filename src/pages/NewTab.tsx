import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDown, Image as ImageIcon } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";

type TabId = "courts" | "pairs" | "rounds";

const TABS: { id: TabId; label: string }[] = [
  { id: "courts", label: "Courts" },
  { id: "pairs", label: "Pairs" },
  { id: "rounds", label: "Rounds" },
];

const MATCHES = [
  { court: "Court 1", time: "10:00", teams: "Ana / Sofía vs. Lucía / Valeria", category: "Women · Round 1", status: "playing" },
  { court: "Court 2", time: "10:00", teams: "Diego / Pablo vs. Luis / Marco", category: "Men · Round 1", status: "playing" },
  { court: "Court 1", time: "11:30", teams: "Carla / Emma vs. Julia / Sara", category: "Women · Round 1", status: "scheduled" },
  { court: "Court 2", time: "11:30", teams: "Andrés / José vs. Leo / Hugo", category: "Men · Round 1", status: "scheduled" },
] as const;

const PAIRS = [
  { names: "Ana / Sofía", category: "Women" },
  { names: "Lucía / Valeria", category: "Women" },
  { names: "Carla / Emma", category: "Women" },
  { names: "Julia / Sara", category: "Women" },
  { names: "Diego / Pablo", category: "Men" },
  { names: "Luis / Marco", category: "Men" },
  { names: "Andrés / José", category: "Men" },
  { names: "Leo / Hugo", category: "Men" },
];

const ROUNDS = [
  { name: "Round 1", detail: "4 matches · 2 courts", status: "In play" },
  { name: "Semifinals", detail: "Winners advance", status: "Pending" },
  { name: "Final", detail: "Court 1", status: "Pending" },
];

const OPERATIONS = [
  {
    label: "01 / Courts",
    title: "A clear schedule.",
    desc: "Assign matches to courts and time slots. See the full schedule in one view.",
    tags: "Court · Time · Match",
  },
  {
    label: "02 / Participants",
    title: "Every pair accounted for.",
    desc: "Organize pairs, matchups and team members in one place.",
    tags: "Players · Pairs · Teams",
  },
  {
    label: "03 / Competition",
    title: "Round by round.",
    desc: "Keep each round, its matches and the order of play in view.",
    tags: "Rounds · Stages · Order of play",
  },
];

const VISION_POINTS = [
  { name: "Live scoring.", desc: "Follow the match score." },
  { name: "VAR.", desc: "Review specific plays on court." },
  { name: "Replay.", desc: "Watch the match again." },
  { name: "ROSA App.", desc: "Explore statistics, highlights and match moments." },
];

const AUDIENCES = ["Clubs", "Organizers", "Players", "Creators & communities"];

const TAB_DESCRIPTIONS: Record<TabId, string> = {
  courts: "Every match, with its court and time.",
  pairs: "All registered pairs, by category.",
  rounds: "Progress through the tournament.",
};

const TAB_FOOTERS: Record<TabId, string> = {
  courts: "4 matches · 2 courts",
  pairs: "8 pairs · 2 categories",
  rounds: "3 rounds",
};

function GermanFlag() {
  return (
    <svg width="16" height="11" viewBox="0 0 5 3" className="rounded-[2px] flex-shrink-0" aria-hidden>
      <rect width="5" height="1" y="0" fill="#000000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  );
}

function StatusPill({ status }: { status: "playing" | "scheduled" }) {
  const isPlaying = status === "playing";
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-[11px] font-medium whitespace-nowrap ${
        isPlaying ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
      }`}
    >
      {isPlaying ? "In play" : "Scheduled"}
    </span>
  );
}

function TournamentCard() {
  const [tab, setTab] = useState<TabId>("courts");

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-lg">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border px-6 py-3">
        <span className="text-[11px] font-mono font-semibold text-primary">rosa / tournament management</span>
        <span className="text-[11px] font-semibold text-foreground">Illustrative view</span>
      </div>

      <div className="p-6 space-y-5">
        {/* Title */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Club Cup</h3>
            <p className="text-xs text-muted-foreground">Saturday · Match schedule</p>
          </div>
          <span className="rounded-md border border-border px-2.5 py-1 text-[11px] text-muted-foreground whitespace-nowrap">
            Sample data
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-border">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`-mb-px border-b-2 pb-2.5 text-xs font-semibold transition-colors ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="text-[11px] text-muted-foreground">{TAB_DESCRIPTIONS[tab]}</p>

        {/* Content */}
        <div className="min-h-[300px]">
          {tab === "courts" &&
            MATCHES.map((match, i) => (
              <div
                key={`${match.court}-${match.time}`}
                className={`flex items-center justify-between gap-4 py-4 ${
                  i < MATCHES.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex items-center gap-6 min-w-0">
                  <div className="w-14 flex-shrink-0 space-y-0.5">
                    <p className="text-xs font-semibold text-primary">{match.court}</p>
                    <p className="text-[11px] text-muted-foreground tabular-nums">{match.time}</p>
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-sm font-semibold truncate">{match.teams}</p>
                    <p className="text-[11px] text-muted-foreground">{match.category}</p>
                  </div>
                </div>
                <StatusPill status={match.status} />
              </div>
            ))}

          {tab === "pairs" &&
            PAIRS.map((pair, i) => (
              <div
                key={pair.names}
                className={`flex items-center justify-between py-3.5 ${
                  i < PAIRS.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <p className="text-sm font-semibold">{pair.names}</p>
                <span className="text-[11px] text-muted-foreground">{pair.category}</span>
              </div>
            ))}

          {tab === "rounds" &&
            ROUNDS.map((round, i) => (
              <div
                key={round.name}
                className={`flex items-center justify-between py-4 ${
                  i < ROUNDS.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold">{round.name}</p>
                  <p className="text-[11px] text-muted-foreground">{round.detail}</p>
                </div>
                <span
                  className={`rounded-md px-3 py-1.5 text-[11px] font-medium ${
                    round.status === "In play" ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {round.status}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border px-6 py-3 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Tournament management
        </span>
        <span className="tabular-nums">{TAB_FOOTERS[tab]}</span>
      </div>
    </div>
  );
}

export default function NewTab() {
  useEffect(() => {
    document.title = "rosa padel | Tournament Management";
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
                rosa · Tournament Management
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight">
                Your tournament.
                <br />
                Your courts.
                <br />
                All under control.
              </h1>

              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Courts, pairs and rounds. One clear view of your tournament, from the opening match to the final.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 box-glow"
                >
                  Plan your tournament <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#details"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground/90 transition-colors hover:text-primary"
                >
                  Explore tournament management <ArrowDown className="h-4 w-4" />
                </a>
              </div>

              <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <GermanFlag />
                German technology. Built for padel.
              </p>
            </motion.div>

            {/* Right: illustrative card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TournamentCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 1. Tournament operations */}
      <section id="details" className="py-20 md:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 grid gap-6 md:grid-cols-2 md:items-end"
          >
            <div className="space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
                Tournament operations, connected
              </span>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">Every match in the right place.</h2>
            </div>
            <p className="text-sm text-muted-foreground md:max-w-xs md:justify-self-end">
              Keep the organization clear. Keep the focus on the game.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {OPERATIONS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="space-y-4 rounded-xl border border-border bg-card p-6"
              >
                <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-primary">
                  {item.label}
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
                <p className="text-[11px] font-medium text-foreground/80">{item.tags}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Full-width banner (image placeholder as background) */}
      <section className="relative flex min-h-[360px] items-center overflow-hidden md:min-h-[420px]">
        {/* Background image placeholder.
            When you have the image, replace this <div> with:
            <img src="/images/banner.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        */}
        <div
          className="absolute inset-0 flex items-center justify-end gap-3 border-y border-dashed border-border bg-secondary/60 pr-8 text-muted-foreground md:pr-32"
          aria-hidden
        >
          <ImageIcon className="h-8 w-8 opacity-50" />
          <span className="text-xs font-mono uppercase tracking-widest opacity-60">Image placeholder</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />

        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-primary">
              Built around the game
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold leading-[0.95] tracking-tight">
              More play.
              <br />
              Less admin.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* 3. Tournament management + ROSA Vision */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-primary">
                Tournament management + ROSA Vision
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
                Manage the tournament.
                <br />
                Connect the experience.
              </h2>
              <p className="max-w-md text-muted-foreground leading-relaxed">
                Tournament Management runs the competition. ROSA Vision adds scoring, video and a connected
                experience on equipped courts.
              </p>
              <ul className="space-y-3">
                {VISION_POINTS.map((point) => (
                  <li key={point.name} className="flex items-center gap-3 text-sm">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>
                      <strong className="font-semibold">{point.name}</strong>{" "}
                      <span className="text-muted-foreground">{point.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              >
                Find the right setup for your tournament <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>

            {/* Illustrative ROSA Vision card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-3"
            >
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-5 py-3">
                  <span className="text-[11px] font-semibold text-primary">ROSA Vision</span>
                  <span className="text-[11px] text-muted-foreground">Court 1 · Tournament match</span>
                </div>

                <div className="space-y-4 p-5">
                  <div className="grid gap-3 sm:grid-cols-[1fr_150px]">
                    {/* Video / image placeholder.
                        When you have the image, replace this <div> with:
                        <img src="/images/vision.jpg" alt="" className="aspect-video w-full rounded-lg object-cover" />
                    */}
                    <div
                      className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-secondary/40 text-muted-foreground"
                      aria-hidden
                    >
                      <ImageIcon className="h-6 w-6 opacity-50" />
                      <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">
                        Image placeholder
                      </span>
                    </div>

                    <div className="flex flex-col justify-between gap-3 rounded-lg bg-secondary/50 p-3">
                      <span className="text-[9px] font-mono font-semibold uppercase tracking-widest text-primary">
                        Live score
                      </span>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span>Ana / Sofía</span>
                          <span className="text-base font-bold tabular-nums">30</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Lucía / Valeria</span>
                          <span className="text-base font-bold tabular-nums">15</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-muted-foreground">SET 1 · 2-1</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-md border border-primary px-3 py-1.5 text-[11px] font-medium text-primary">
                      Review a play / VAR
                    </span>
                    <span className="rounded-md border border-border px-3 py-1.5 text-[11px] font-medium">
                      Watch the match / Replay
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border px-5 py-3 text-[11px]">
                  <span className="font-semibold">The experience continues in ROSA App</span>
                  <span className="text-muted-foreground">Stats · Highlights</span>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Illustrative view. Video and analytics require the corresponding ROSA Vision setup.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Audience */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid gap-8 md:grid-cols-2 md:items-start"
          >
            <div className="space-y-4">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-primary">
                For the people behind every tournament
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
                Your club.
                <br />
                Your community.
              </h2>
            </div>
            <div className="space-y-5">
              <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
                From a club competition to a community event. Bring your players together with a clear tournament
                structure.
              </p>
              <div className="flex flex-wrap gap-2">
                {AUDIENCES.map((audience) => (
                  <span
                    key={audience}
                    className="rounded-md border border-border bg-card px-3.5 py-2 text-xs font-medium"
                  >
                    {audience}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}