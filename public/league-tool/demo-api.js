"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // scripts/league-browser/operations.cjs
  var require_operations = __commonJS({
    "scripts/league-browser/operations.cjs"(exports, module) {
      "use strict";
      var E = require_engine();
      var assert = E.ensure;
      function audit(l, text) {
        l.audit.unshift({ at: (/* @__PURE__ */ new Date()).toISOString(), text });
      }
      function vision(l, d) {
        const { m } = E.findMatch(l, d.matchId), links = {};
        for (const k of ["summary", "replay", "livestream", "analytics"]) if (d[k]) {
          const url = new URL(d[k]);
          assert(["http:", "https:"].includes(url.protocol), "Vision links must be HTTP(S).");
          links[k] = url.href;
        }
        m.vision = { rosaMatchId: E.clean(d.rosaMatchId), links };
      }
      function scheduleGroup(l, d, actor) {
        const r = E.current(l), ms = r?.matches.filter((m) => m.groupId === d.groupId && m.status === "scheduled");
        assert(r?.status === "active" && ms.length, "No unstarted fixtures in this group.");
        assert(ms.every((m) => !m.binding), "Release the scoring session before moving bound fixtures.");
        ms.forEach((m) => {
          m.scheduledAt = null;
          m.court = null;
          m.proposal = null;
        });
        let at = Date.parse(d.at);
        for (const m of ms) {
          E.propose(l, m.id, { at: new Date(at).toISOString(), court: d.court }, actor);
          at += (m.duration + r.rules.restMinutes) * 6e4;
        }
        r.groups.find((g) => g.id === d.groupId).schedulingIssue = null;
        audit(l, `Group ${r.groups.find((g) => g.id === d.groupId).level}: remaining fixtures rescheduled together.`);
      }
      function unbind(l, d) {
        const { r, m } = E.findMatch(l, d.matchId);
        assert(r.status === "active" && m.binding && E.clean(d.reason).length >= 3, "Select a bound fixture and give a release reason.");
        const b = m.binding;
        const ms = r.matches.filter((x) => x.binding?.court === b.court && x.binding?.sessionId === b.sessionId);
        assert(ms.every((x) => x.status === "scheduled"), "This session has scored fixtures. Finish or resolve it before releasing.");
        ms.forEach((x) => x.binding = null);
        audit(l, `Court session released: ${E.clean(d.reason, 500)}`);
      }
      function reschedule(l, data) {
        const r = data.roundId ? l.rounds.find((r2) => r2.id === data.roundId) : E.current(l);
        assert(r?.status === "active", "Select an active round.");
        const config = E.rules({ ...r.rules, ...data.rules });
        assert(config.format === r.rules.format, "Round format cannot change.");
        const saved = r.matches.filter((m) => m.status !== "scheduled" || m.binding);
        assert(saved.every((m) => !m.court || config.courts.includes(m.court)), "A removed court has a scored or bound fixture. Keep it in the pool and exclude it from session availability instead.");
        if (data.startDate) {
          E.rules({ ...config, startDate: data.startDate });
          r.startDate = data.startDate;
        }
        r.rules = config;
        r.deadline = E.zoned(E.addDays(r.startDate, config.deadlineDays), "23:59", config.timezone);
        for (const m of r.matches.filter((m2) => m2.status === "scheduled" && !m2.binding)) {
          m.scheduledAt = null;
          m.court = null;
          m.session = null;
          m.proposal = null;
        }
        E.schedule(l, r);
        audit(l, `Round ${r.number} schedule rebuilt. Scored and bound fixtures preserved.`);
      }
      function changeRoster(l, d) {
        if (["add", "withdraw", "restore"].includes(d.kind) && l.nextGroups) {
          delete l.nextGroups;
          audit(l, "Prepared group allocation cleared because the active roster changed.");
        }
        if (d.kind === "add") {
          const status = l.status;
          l.status = "registration";
          let e2;
          try {
            e2 = E.addEntrant(l, { names: d.names });
          } finally {
            l.status = status;
          }
          e2.rating = Number(d.rating) || 0;
          e2.active = true;
          audit(l, `${e2.name} added to the pool for a future round.`);
          return e2;
        }
        const e = l.entrants.find((e2) => e2.id === d.id);
        assert(e, "Entry not found.");
        if (d.kind === "withdraw") {
          e.active = false;
          audit(l, `${e.name} withdrawn from future rounds. Published fixtures retained.`);
        }
        if (d.kind === "restore") {
          e.active = true;
          audit(l, `${e.name} restored to the next-round pool.`);
        }
        if (d.kind === "rename") {
          assert(Array.isArray(d.names) && d.names.length === e.players.length && d.names.every((n) => E.clean(n).length >= 2), "Enter the player names.");
          e.players.forEach((p, i) => p.name = E.clean(d.names[i]));
          e.name = e.players.map((p) => p.name).join(" / ");
          audit(l, `Player record updated: ${e.name}`);
        }
      }
      function reorder(l, ids) {
        assert(l.status === "registration", "Initial seeds are locked after the season starts.");
        assert(ids.length === l.entrants.length && new Set(ids).size === ids.length && ids.every((id) => l.entrants.some((e) => e.id === id)), "Include every entry once.");
        ids.forEach((id, i) => l.entrants.find((e) => e.id === id).seed = i + 1);
      }
      function setNextGroups(l, groups) {
        assert(Array.isArray(groups) && groups.length && groups.every((g) => Array.isArray(g) && g.length === 4), "Every group must contain four entries.");
        const ids = groups.flat();
        assert(new Set(ids).size === ids.length && ids.every((id) => l.entrants.some((e) => e.id === id && e.active !== false)), "Use each active entry at most once.");
        assert(l.entrants.filter((e) => e.active !== false).every((e) => ids.includes(e.id)), "Include all active entries or withdraw the entries sitting out.");
        l.nextGroups = groups;
        audit(l, "Organizer prepared the next round groups.");
      }
      function applyGroups(l, groups) {
        const r = E.current(l);
        assert(r?.status === "active" && r.matches.every((m) => m.status === "scheduled" && !m.binding), "Current groups can only be rebuilt before any scoring or binding.");
        setNextGroups(l, groups);
        const next = l.nextRules;
        l.rounds.pop();
        l.nextRules = { ...r.rules, startDate: E.addDays(r.startDate, -(r.number - 1) * r.rules.intervalDays) };
        E.generateRound(l, groups);
        if (next) l.nextRules = next;
        l.nextGroups = null;
        audit(l, "Current round groups rebuilt by organizer.");
      }
      function resume(l) {
        assert(l.status === "needs-roster", "This league is not awaiting a roster repair.");
        const groups = l.nextGroups || activeGroups(l);
        assert(groups, "Complete groups of four before continuing.");
        E.generateRound(l, groups);
        l.nextGroups = null;
        l.status = "active";
      }
      function activeGroups(l) {
        const entries = l.entrants.filter((e) => e.active !== false);
        if (entries.length < 4 || entries.length % 4) return null;
        const ranks = Object.fromEntries(E.ranking(l).map((e) => [e.id, e.rank]));
        entries.sort((a, b) => (ranks[a.id] || a.seed) - (ranks[b.id] || b.seed));
        return Array.from({ length: entries.length / 4 }, (_, i) => entries.slice(i * 4, i * 4 + 4).map((e) => e.id));
      }
      function correct(l, d) {
        const { r, m } = E.findMatch(l, d.matchId);
        assert(E.clean(d.reason).length >= 3, "Give a correction reason for the audit history.");
        assert(r.status === "active", "Closed-round corrections require a deliberate season rollback; this action only changes the active round.");
        const prior = m.score;
        m.status = "scheduled";
        E.submit(l, m.id, d.score, { id: d.actorId, organizer: true }, "organizer");
        audit(l, `Score corrected from ${prior?.join("\u2013") || "pending"}: ${d.reason}`);
      }
      function projections(l) {
        for (const r of l.rounds) {
          const courts = [...new Set(r.matches.map((m) => m.court).filter(Boolean))];
          for (const court of courts) {
            let ready = null;
            for (const m of r.matches.filter((m2) => m2.court === court && m2.scheduledAt).sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))) {
              if (m.status === "official") {
                if (m.completedAt && Math.abs(Date.parse(m.completedAt) - Date.parse(m.scheduledAt)) < 864e5) ready = Date.parse(m.completedAt) + r.rules.restMinutes * 6e4;
                continue;
              }
              const planned = Date.parse(m.scheduledAt);
              m.estimatedAt = new Date(ready === null ? planned : Math.max(ready, planned)).toISOString();
              ready = Date.parse(m.estimatedAt) + (m.duration + r.rules.restMinutes) * 6e4;
            }
          }
        }
        return l;
      }
      function evidence(l, eid, through) {
        const e = l.entrants.find((e2) => e2.id === eid);
        assert(e, "Entry not found.");
        return { name: e.name, rounds: l.rounds.filter((r) => r.status === "complete" && r.number <= through).map((r) => ({ number: r.number, ...r.summary[eid], matches: r.matches.filter((m) => m.entrySides.flat().includes(eid)).map((m) => ({ id: m.id, sides: m.sides.map((side) => side.map((p) => E.playerName(l, p))), score: m.score, source: m.source, completedAt: m.completedAt })) })) };
      }
      module.exports = { audit, vision, scheduleGroup, unbind, reschedule, changeRoster, reorder, setNextGroups, applyGroups, resume, activeGroups, correct, projections, evidence };
    }
  });

  // scripts/league-browser/engine.cjs
  var require_engine = __commonJS({
    "scripts/league-browser/engine.cjs"(exports, module) {
      "use strict";
      var randomUUID = () => globalThis.crypto.randomUUID();
      var id = (prefix) => `${prefix}_${randomUUID()}`;
      var ensure = (ok, message) => {
        if (!ok) throw new Error(message);
      };
      var clone = (value) => structuredClone(value);
      var clean = (value, max = 100) => String(value ?? "").trim().slice(0, max);
      var num = (v, min, max, label) => {
        const n = Number(v);
        ensure(Number.isInteger(n) && n >= min && n <= max, `${label}: enter a whole number between ${min} and ${max}.`);
        return n;
      };
      var defaults = {
        format: "individual",
        rounds: 8,
        scheduling: "sessions",
        timezone: "Europe/Berlin",
        startDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        intervalDays: 7,
        deadlineDays: 6,
        groupMinutes: 90,
        matchMinutes: 25,
        restMinutes: 5,
        courts: ["Court 1", "Court 2", "Court 3", "Court 4"],
        sessions: [{ label: "Tuesday evening", day: 2, start: "18:00", duration: 180, groups: "all", courts: ["Court 1", "Court 2", "Court 3", "Court 4"] }],
        absencePenalty: "lowestMinus",
        penaltyPoints: 2,
        announcedExempt: false,
        substituteCredit: "original",
        absentMovement: "bottom",
        promotion: true
      };
      function rules(input = {}) {
        const r = { ...clone(defaults), ...input };
        for (const [key, allowed] of Object.entries({ format: ["individual", "pairs"], scheduling: ["sessions", "flexible"], absencePenalty: ["lowestMinus", "fixed", "none"], substituteCredit: ["original", "none"], absentMovement: ["bottom", "points"] })) ensure(allowed.includes(r[key]), `Invalid ${key}.`);
        for (const [key, lo, hi] of [["rounds", 1, 52], ["intervalDays", 1, 60], ["deadlineDays", 1, 59], ["groupMinutes", 30, 360], ["matchMinutes", 5, 180], ["restMinutes", 0, 60], ["penaltyPoints", 0, 100]]) r[key] = num(r[key], lo, hi, key);
        ensure(r.deadlineDays < r.intervalDays, "The deadline must fall before the next matchday starts.");
        ensure(/^\d{4}-\d{2}-\d{2}$/.test(r.startDate) && (/* @__PURE__ */ new Date(`${r.startDate}T12:00:00Z`)).toISOString().slice(0, 10) === r.startDate, "Choose a valid start date.");
        try {
          new Intl.DateTimeFormat("en", { timeZone: r.timezone }).format();
        } catch {
          throw new Error("Choose a valid IANA time zone.");
        }
        r.courts = [...new Set((r.courts || []).map((c) => clean(c, 40)).filter(Boolean))];
        ensure(r.courts.length > 0 && r.courts.length <= 40, "Add between 1 and 40 physical courts.");
        ensure(Array.isArray(r.sessions) && r.sessions.length <= 14, "Use up to 14 session windows.");
        r.sessions = r.sessions.map((s) => {
          ensure(/^([01]\d|2[0-3]):[0-5]\d$/.test(s.start), "Use HH:MM for session start.");
          ensure(["all", "odd", "even"].includes(s.groups), "Choose all, odd or even groups for each session.");
          const courts = [...new Set(s.courts || [])];
          ensure(courts.length && courts.every((c) => r.courts.includes(c)), "Session courts must belong to the league court pool.");
          return { label: clean(s.label) || "League session", day: num(s.day, 0, 6, "Weekday"), start: s.start, duration: num(s.duration, 30, 720, "Session minutes"), groups: s.groups, courts };
        });
        ensure(r.scheduling !== "sessions" || r.sessions.length, "Add at least one session window.");
        ensure(r.groupMinutes > 2 * r.restMinutes, "Group duration must exceed the combined rest periods.");
        r.announcedExempt = !!r.announcedExempt;
        r.promotion = !!r.promotion;
        return r;
      }
      function createLeague(ownerId, data) {
        const name = clean(data.name);
        ensure(name.length >= 3, "League name needs at least 3 characters.");
        return { id: id("league"), ownerId, name, club: clean(data.club), rules: rules(data.rules), demo: !!data.demo, status: "registration", entrants: [], requests: [], rounds: [], audit: [], revision: 0 };
      }
      function addEntrant(l, data) {
        ensure(l.status === "registration", "Add mid-season entries through the next-round roster.");
        ensure(l.entrants.length < 160, "This pilot supports up to 160 entries per league.");
        const names = (data.names || []).map((n) => clean(n));
        ensure(names.length === (l.rules.format === "pairs" ? 2 : 1) && names.every((n) => n.length >= 2), "Enter the player names required by this format.");
        const e = { id: id("entry"), name: names.join(" / "), players: names.map((name) => ({ id: id("player"), name })), seed: l.entrants.length + 1, active: true, rating: Number(data.rating) || 0 };
        l.entrants.push(e);
        return e;
      }
      function addDays(date, days) {
        const d = /* @__PURE__ */ new Date(`${date}T12:00:00Z`);
        d.setUTCDate(d.getUTCDate() + days);
        return d.toISOString().slice(0, 10);
      }
      function zoned(date, time, zone) {
        const target = Date.parse(`${date}T${time}:00Z`);
        let at = target;
        const format = new Intl.DateTimeFormat("sv-SE", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
        for (let i = 0; i < 3; i++) {
          const parts = Object.fromEntries(format.formatToParts(at).map((p) => [p.type, p.value]));
          const represented = Date.parse(`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}Z`);
          at += target - represented;
        }
        const actual = format.format(at).slice(0, 16).replace(" ", "T");
        ensure(actual === `${date}T${time}`, "That local time does not exist due to a daylight-saving change. Choose another time.");
        return new Date(at).toISOString();
      }
      var current = (l) => l.rounds.at(-1);
      var entrant = (l, eid) => l.entrants.find((e) => e.id === eid);
      var participants = (m) => m.sides.flat();
      function ranking(l, through = Infinity) {
        let rows = l.entrants.map((e) => ({ id: e.id, name: e.name, total: 0, rank: e.seed, group: Math.ceil(e.seed / 4), history: [], up: 0, down: 0, played: 0, wins: 0, absences: 0, attended: 0, sweeps: 0 }));
        for (const r of l.rounds.filter((r2) => r2.number <= through)) {
          for (const g of r.groups) for (const eid of g.entrants) {
            const row = rows.find((e) => e.id === eid);
            if (row) row.group = g.level;
          }
          if (r.status !== "complete") continue;
          for (const row of rows) {
            const s = r.summary[row.id];
            if (!s) continue;
            row.total += s.points;
            row.history.push(s.points);
            row.played += s.played;
            row.wins += s.wins;
            row.absences += s.absent ? 1 : 0;
            row.attended += s.attended ? 1 : 0;
            row.sweeps += s.played === 3 && s.wins === 3 ? 1 : 0;
            row.up += s.movement < 0 ? -s.movement : 0;
            row.down += s.movement > 0 ? s.movement : 0;
          }
          rows.sort((a, b) => b.total - a.total || a.rank - b.rank);
          rows.forEach((e, i) => e.rank = i + 1);
        }
        return rows.sort((a, b) => a.rank - b.rank);
      }
      function generateRound(l, groups) {
        const savedRules = l.rules;
        if (l.nextRules) {
          l.rules = l.nextRules;
          delete l.nextRules;
        }
        const number = l.rounds.length + 1, r = { id: id("round"), number, status: "active", startDate: addDays(l.rules.startDate, (number - 1) * l.rules.intervalDays), rules: clone(l.rules), groups: [], matches: [], attendance: {}, summary: null };
        r.deadline = zoned(addDays(r.startDate, l.rules.deadlineDays), "23:59", l.rules.timezone);
        r.priorRanks = Object.fromEntries(ranking(l).map((e) => [e.id, e.rank]));
        groups.forEach((entries, i) => {
          const g = { id: id("group"), level: i + 1, entrants: [...entries] };
          r.groups.push(g);
          entries.forEach((eid) => entrant(l, eid).players.forEach((p) => r.attendance[p.id] = { status: "expected", substitute: null, announced: false }));
          const specs = l.rules.format === "individual" ? [[[0, 3], [1, 2]], [[0, 2], [1, 3]], [[0, 1], [2, 3]]] : [[[0], [1]], [[2], [3]], [[0], [2]], [[1], [3]], [[0], [3]], [[1], [2]]];
          specs.forEach((sideIndices, k) => r.matches.push({ id: id("match"), groupId: g.id, stage: l.rules.format === "pairs" ? Math.floor(k / 2) + 1 : k + 1, ordinal: k + 1, entrySides: sideIndices.map((side) => side.map((n) => entries[n])), sides: sideIndices.map((side) => side.flatMap((n) => entrant(l, entries[n]).players.map((p) => p.id))), status: "scheduled", score: null, submission: null, scheduledAt: null, court: null, proposal: null, binding: null, events: [], duration: l.rules.matchMinutes }));
        });
        l.rounds.push(r);
        schedule(l, r);
        l.rules = savedRules;
        return r;
      }
      function start(l) {
        ensure(l.status === "registration", "This season has already started.");
        const sorted = l.entrants.filter((e) => e.active !== false).sort((a, b) => a.seed - b.seed);
        ensure(sorted.length >= 4 && sorted.length % 4 === 0, "Add active entries in complete groups of four before starting.");
        l.status = "active";
        return generateRound(l, Array.from({ length: sorted.length / 4 }, (_, i) => sorted.slice(i * 4, i * 4 + 4).map((e) => e.id)));
      }
      function schedule(l, r) {
        if (r.rules.scheduling === "flexible") {
          r.groups.forEach((g) => g.schedulingIssue = null);
          r.matches.filter((m) => m.status === "scheduled" && !m.binding).forEach((m) => m.duration = r.rules.format === "individual" ? ((r.rules.groupMinutes || 90) - 2 * r.rules.restMinutes) / 3 : r.rules.matchMinutes);
          return;
        }
        const windows = r.rules.sessions.map((s) => {
          const weekday = (/* @__PURE__ */ new Date(`${r.startDate}T12:00:00Z`)).getUTCDay();
          const date = addDays(r.startDate, (s.day - weekday + 7) % 7), at = Date.parse(zoned(date, s.start, r.rules.timezone));
          return { ...s, at, end: at + s.duration * 6e4 };
        }).sort((a, b) => a.at - b.at);
        const booked = r.matches.filter((m) => m.scheduledAt && (m.status !== "scheduled" || m.binding)).map((m) => ({ at: Date.parse(m.scheduledAt), end: Date.parse(m.scheduledAt) + m.duration * 6e4, court: m.court, players: participants(m) }));
        for (const g of r.groups) {
          let assigned = false;
          for (const w of windows.filter((w2) => w2.groups === "all" || (g.level % 2 ? w2.groups === "odd" : w2.groups === "even"))) {
            const trial = [], matches = r.matches.filter((m) => m.groupId === g.id && m.status === "scheduled" && !m.binding);
            let fits = true;
            for (const m of matches) {
              m.duration = r.rules.format === "individual" ? ((r.rules.groupMinutes || 90) - 2 * r.rules.restMinutes) / 3 : r.rules.matchMinutes;
              let chosen = null;
              for (const court of w.courts) {
                let at = w.at;
                for (let attempt = 0; attempt < 1e3; attempt++) {
                  const conflict = [...booked, ...trial].find((b) => (b.court === court || b.players.some((p) => participants(m).includes(p))) && at < b.end + (b.players.some((p) => participants(m).includes(p)) ? r.rules.restMinutes * 6e4 : 0) && at + m.duration * 6e4 > b.at);
                  if (!conflict) break;
                  at = conflict.end + (conflict.players.some((p) => participants(m).includes(p)) ? r.rules.restMinutes * 6e4 : 0);
                }
                if (at + m.duration * 6e4 <= w.end && at + m.duration * 6e4 <= Date.parse(r.deadline) && (!chosen || at < chosen.at)) chosen = { at, end: at + m.duration * 6e4, court, players: participants(m), m };
              }
              if (!chosen) {
                fits = false;
                break;
              }
              trial.push(chosen);
            }
            if (fits) {
              trial.forEach((b) => {
                b.m.scheduledAt = new Date(b.at).toISOString();
                b.m.court = b.court;
                b.m.session = w.label;
              });
              booked.push(...trial);
              assigned = true;
              break;
            }
          }
          g.schedulingIssue = assigned ? null : "No session window has enough available court time for this group.";
        }
      }
      function validScore(score) {
        ensure(Array.isArray(score) && score.length === 2 && score.every((n) => Number.isInteger(n) && n >= 0 && n <= 7), "Enter two whole game scores from 0 to 7.");
        const [a, b] = [...score].sort((a2, b2) => b2 - a2);
        ensure(a === 6 && b <= 4 || a === 7 && (b === 5 || b === 6), "A complete set must be 6\u20130 through 6\u20134, 7\u20135 or 7\u20136.");
      }
      function findMatch(l, mid) {
        for (const r of l.rounds) {
          const m = r.matches.find((m2) => m2.id === mid);
          if (m) return { r, m, g: r.groups.find((g) => g.id === m.groupId) };
        }
        throw new Error("Match not found.");
      }
      function playable(r, m) {
        ensure(r.status === "active", "This round is already closed.");
        ensure(m.sides.flat().every((p) => r.attendance[p]?.status !== "absent"), "An absent player needs a substitute before this group can play.");
      }
      function submit(l, mid, score, actor, source = "manual") {
        const { r, m } = findMatch(l, mid);
        playable(r, m);
        ensure(m.status !== "official", "An official result cannot be overwritten.");
        validScore(score);
        if (actor.organizer) {
          official(l, r, m, score, "organizer", { submittedBy: actor.id });
          return;
        }
        const side = m.sides.findIndex((side2) => side2.some((p) => actor.playerIds?.includes(p)));
        ensure(actor.organizer || side >= 0, "Only participants or the league organizer can submit.");
        m.submission = { id: id("result"), score, by: actor.id, side, source, at: (/* @__PURE__ */ new Date()).toISOString() };
        m.status = "pending";
      }
      function confirm(l, mid, submissionId, actor) {
        const { r, m } = findMatch(l, mid);
        ensure(r.status === "active" && m.status === "pending" && m.submission?.id === submissionId, "This result changed. Refresh and review it.");
        ensure(actor.id !== m.submission.by, "A second person must confirm this result.");
        const sides = m.sides.map((side, i) => side.some((p) => actor.playerIds?.includes(p)) ? i : -1).filter((i) => i >= 0);
        ensure(sides.length === 1 && (m.submission.side === -1 || sides[0] !== m.submission.side), "Confirmation must come from an opponent.");
        official(l, r, m, m.submission.score, m.submission.source, { submittedBy: m.submission.by, confirmedBy: actor.id });
      }
      function dispute(l, mid, reason, actor) {
        const { r, m } = findMatch(l, mid);
        ensure(r.status === "active" && m.status === "pending", "Only pending results can be disputed.");
        ensure(participants(m).some((p) => actor.playerIds?.includes(p)), "Only a match participant can dispute.");
        ensure(clean(reason).length >= 3, "Explain what needs correcting.");
        m.status = "disputed";
        m.dispute = { reason: clean(reason, 500), by: actor.id };
      }
      function official(l, r, m, score, source, evidence = {}) {
        validScore(score);
        m.score = [...score];
        m.status = "official";
        m.source = source;
        m.evidence = evidence;
        m.completedAt = (/* @__PURE__ */ new Date()).toISOString();
        m.proposal = null;
        if (!m.walkover) {
          for (const p of participants(m)) if (r.attendance[p]?.status === "expected") r.attendance[p].status = "present";
        }
        l.audit.unshift({ at: m.completedAt, text: `Round ${r.number} \xB7 group ${r.groups.find((g) => g.id === m.groupId).level} \xB7 ${score.join("\u2013")} official (${source})`, matchId: m.id });
        if (r.matches.every((m2) => m2.status === "official")) closeRound(l, r);
      }
      function walkover(l, mid, side, reason, actor) {
        const { r, m } = findMatch(l, mid);
        ensure(actor.organizer && r.status === "active" && m.status !== "official", "Only the organizer can resolve an unfinished active fixture.");
        ensure([0, 1].includes(side) && clean(reason).length >= 3, "Choose the winning side and record a reason.");
        m.walkover = true;
        official(l, r, m, side === 0 ? [6, 0] : [0, 6], "organizer-walkover", { reason: clean(reason, 500), submittedBy: actor.id });
      }
      function closeRound(l, r) {
        const summary = {};
        for (const g of r.groups) {
          for (const eid of g.entrants) {
            const e = entrant(l, eid), relevant = r.matches.filter((m) => m.groupId === g.id && m.entrySides.flat().includes(eid));
            const attendance2 = e.players.map((p) => r.attendance[p.id]), absent = attendance2.some((a) => a.status === "absent" || a.substitute);
            let points = 0, wins = 0;
            for (const m of relevant) {
              const side = m.entrySides.findIndex((s) => s.includes(eid));
              points += m.score[side] - m.score[1 - side];
              if (!m.walkover && m.score[side] > m.score[1 - side]) wins++;
            }
            if (absent && r.rules.substituteCredit === "none") points = 0;
            summary[eid] = { points, wins: absent ? 0 : wins, played: absent ? 0 : relevant.filter((m) => !m.walkover).length, absent, attended: !absent && attendance2.every((a) => a.status === "present"), movement: 0, group: g.level };
          }
          const presentPoints = g.entrants.filter((eid) => !summary[eid].absent).map((eid) => summary[eid].points);
          const min = presentPoints.length ? Math.min(...presentPoints) : 0;
          for (const eid of g.entrants) {
            const s = summary[eid], ats = entrant(l, eid).players.map((p) => r.attendance[p.id]);
            const exempt = r.rules.announcedExempt && ats.filter((a) => a.status === "absent" || a.substitute).every((a) => a.announced);
            s.penalized = s.absent && !exempt;
            if (s.penalized && r.rules.absencePenalty !== "none") s.points = r.rules.absencePenalty === "fixed" ? -r.rules.penaltyPoints : min - r.rules.penaltyPoints;
          }
        }
        const nextGroups = r.groups.map((g) => [...g.entrants]);
        const sorted = r.groups.map((g) => [...g.entrants].sort((a, b) => (r.rules.absentMovement === "bottom" ? Number(summary[a].penalized) - Number(summary[b].penalized) : 0) || summary[b].points - summary[a].points || r.priorRanks[a] - r.priorRanks[b]));
        if (r.rules.promotion) for (let i = 0; i < sorted.length - 1; i++) {
          const down = sorted[i].at(-1), up = sorted[i + 1][0];
          nextGroups[i][nextGroups[i].indexOf(down)] = up;
          nextGroups[i + 1][nextGroups[i + 1].indexOf(up)] = down;
          summary[up].movement = -1;
          summary[down].movement = 1;
        }
        r.summary = summary;
        r.status = "complete";
        r.closedAt = (/* @__PURE__ */ new Date()).toISOString();
        l.audit.unshift({ at: r.closedAt, text: `Round ${r.number} closed automatically. Standings and movement published.` });
        if (r.number >= l.rules.rounds) l.status = "complete";
        else {
          const rank = Object.fromEntries(ranking(l).map((e) => [e.id, e.rank]));
          nextGroups.forEach((g) => g.sort((a, b) => rank[a] - rank[b]));
          const rosterChanged = l.entrants.some((e) => e.active !== false !== r.groups.some((g) => g.entrants.includes(e.id)));
          const groups = l.nextGroups || (rosterChanged ? require_operations().activeGroups(l) : nextGroups);
          if (groups) {
            generateRound(l, groups);
            l.nextGroups = null;
          } else {
            l.status = "needs-roster";
            l.audit.unshift({ at: (/* @__PURE__ */ new Date()).toISOString(), text: "Next round is waiting for complete groups of four. Review the active roster." });
          }
        }
      }
      function attendance(l, playerId, data) {
        const r = current(l);
        ensure(r?.status === "active" && r.attendance[playerId], "Player not in the active round.");
        const owner = l.entrants.find((e) => e.players.some((p) => p.id === playerId));
        const g = r.groups.find((g2) => g2.entrants.includes(owner.id));
        ensure(r.matches.filter((m) => m.groupId === g.id).every((m) => m.status === "scheduled" && !m.binding), "Attendance changes are locked after scoring or court binding starts for the group.");
        ensure(["expected", "present", "absent"].includes(data.status), "Invalid attendance status.");
        const old = r.attendance[playerId], oldId = old.substitute?.id || playerId;
        const replacement = data.status === "absent" && clean(data.substitute) ? { id: id("guest"), name: clean(data.substitute) } : null;
        for (const m of r.matches.filter((m2) => m2.groupId === g.id)) m.sides = m.sides.map((side) => side.map((p) => p === oldId ? replacement?.id || playerId : p));
        if (old.substitute) delete r.attendance[old.substitute.id];
        r.attendance[playerId] = { status: data.status, announced: !!data.announced, substitute: replacement };
        if (replacement) r.attendance[replacement.id] = { status: "expected", guest: true };
      }
      function propose(l, mid, data, actor) {
        const { r, m } = findMatch(l, mid);
        ensure(r.status === "active" && m.status === "scheduled" && !m.binding, "Scheduling is locked once scoring or court binding starts.");
        ensure(actor.organizer || participants(m).some((p) => actor.playerIds?.includes(p)), "Only participants can propose a time.");
        ensure(r.rules.courts.includes(data.court), "Choose a league court.");
        const at = Date.parse(data.at);
        ensure(Number.isFinite(at) && at >= Date.parse(zoned(r.startDate, "00:00", r.rules.timezone)) && at + m.duration * 6e4 <= Date.parse(r.deadline), "The match must fit between round start and deadline.");
        const candidate = { at: new Date(at).toISOString(), court: data.court, by: actor.id, side: m.sides.findIndex((s) => s.some((p) => actor.playerIds?.includes(p))), id: id("proposal") };
        assertNoConflict(l, r, m, candidate);
        m.proposal = candidate;
        if (actor.organizer) {
          m.scheduledAt = candidate.at;
          m.court = candidate.court;
          m.session = "Organizer schedule";
          m.proposal = null;
        }
      }
      function assertNoConflict(l, r, m, candidate) {
        const start2 = Date.parse(candidate.at), end = start2 + m.duration * 6e4;
        for (const other of l.rounds.flatMap((x) => x.matches).filter((x) => x.id !== m.id && x.scheduledAt)) {
          const shared = participants(other).some((p) => participants(m).includes(p));
          const buffer = shared ? r.rules.restMinutes * 6e4 : 0;
          if (other.court !== candidate.court && !shared) continue;
          const at = Date.parse(other.scheduledAt);
          ensure(end + buffer <= at || start2 >= at + other.duration * 6e4 + buffer, "That court or a player is already booked, including required rest.");
        }
      }
      function acceptSchedule(l, mid, pid, actor) {
        const { r, m } = findMatch(l, mid), p = m.proposal;
        ensure(p && p.id === pid, "The proposed time changed.");
        ensure(p.by !== actor.id, "Another player must accept the proposal.");
        ensure(m.sides.some((s, i) => i !== p.side && s.some((p2) => actor.playerIds?.includes(p2))), "An opponent must accept the time.");
        assertNoConflict(l, r, m, p);
        m.scheduledAt = p.at;
        m.court = p.court;
        m.session = "Agreed by players";
        m.proposal = null;
      }
      function bind(l, mid, data) {
        const { r, m, g } = findMatch(l, mid);
        playable(r, m);
        ensure(!l.demo, "Use a real league to connect hardware.");
        ensure(m.status === "scheduled", "Bind before score submission.");
        ensure(!m.binding, "This fixture already has a court session binding.");
        ensure(r.rules.courts.includes(data.court) && clean(data.sessionId), "Choose a court and provide the ROSA scoring session ID.");
        ensure(m.court === data.court && m.scheduledAt, "Schedule this fixture on the selected court before binding.");
        ensure(!l.rounds.flatMap((r2) => r2.matches).some((x) => x.id !== m.id && x.status !== "official" && x.binding?.court === data.court), "This court already has an unfinished bound fixture.");
        ensure(!l.rounds.flatMap((r2) => r2.matches).some((x) => x.binding?.sessionId === data.sessionId && x.binding?.court === data.court), "This scoring session is already assigned.");
        const fixtures = r.rules.format === "individual" ? r.matches.filter((x) => x.groupId === g.id) : [m];
        ensure(fixtures.every((x) => x.status === "scheduled" && !x.binding && x.court === data.court), "All three individual rotations must be unscored and on the same physical court.");
        const sessionId = clean(data.sessionId);
        const courtId = l.connectedCourts?.find((c) => c.localCourt === data.court)?.courtId || data.court;
        fixtures.forEach((x) => x.binding = { court: data.court, courtId, sessionId, setIndex: r.rules.format === "individual" ? x.stage - 1 : 0 });
        const playerIds = r.rules.format === "individual" ? g.entrants.map((eid) => {
          const p = entrant(l, eid).players[0];
          return r.attendance[p.id].substitute?.id || p.id;
        }) : m.sides.flat();
        return { leagueId: l.id, format: r.rules.format, courtId, sessionId, players: playerIds.map((p) => ({ id: p, name: playerName(l, p) })), fixtures: fixtures.map((x) => ({ matchId: x.id, setIndex: x.binding.setIndex, playerIds: x.sides })) };
      }
      function rosaEvent(l, event) {
        const { r, m } = findMatch(l, event.matchId);
        ensure(event.version === 1, "Use scoring event version 1.");
        const existing = m.events.find((e) => e.id === event.eventId);
        if (existing) {
          ensure(existing.payload === JSON.stringify(event), "Event ID was reused with different data.");
          return;
        }
        ensure(!l.demo && r.status === "active" && m.status !== "official", "This fixture cannot receive a new result.");
        playable(r, m);
        ensure(m.binding && (m.binding.courtId || m.binding.court) === event.courtId && m.binding.sessionId === event.sessionId, "Court or session does not match the assigned fixture.");
        ensure(event.setIndex === m.binding.setIndex, "Set index does not match this fixture rotation.");
        ensure(JSON.stringify(event.playerIds) === JSON.stringify(m.sides), "Player identities or side order do not match this fixture.");
        ensure(clean(event.eventId).length >= 6, "Provide a unique event ID.");
        ensure(event.type === "set.completed", "This league adapter accepts complete single-set results.");
        validScore(event.score);
        m.events.push({ id: event.eventId, payload: JSON.stringify(event) });
        official(l, r, m, event.score, "rosa", { eventId: event.eventId, sessionId: event.sessionId });
      }
      function demoFinish(l, all = false) {
        ensure(l.demo, "Simulation is only available in demo leagues.");
        const r = current(l);
        ensure(r?.status === "active", "Start an active round first.");
        const matches = r.matches.filter((m) => m.status !== "official");
        for (const m of all ? matches : matches.slice(0, 1)) {
          const a = (r.number + m.ordinal + r.groups.findIndex((g) => g.id === m.groupId)) % 3;
          official(l, r, m, a === 0 ? [4, 6] : [6, a === 1 ? 2 : 3], "rosa-demo");
        }
      }
      function insights(l, number) {
        const closed = l.rounds.filter((r2) => r2.status === "complete" && (!number || r2.number <= number));
        if (!closed.length) return [];
        const r = closed.at(-1), rows = ranking(l, r.number), facts = [];
        const add = (title, items, detail) => {
          if (items.length) facts.push({ title, names: items.map((e) => e.name), detail });
        };
        add("Ever-present", rows.filter((e) => e.attended === closed.length && e.absences === 0), `Attended every one of ${closed.length} completed rounds.`);
        add("Perfect round", rows.filter((e) => r.summary[e.id]?.played === 3 && r.summary[e.id]?.wins === 3), `Won all 3 ${l.rules.format === "individual" ? "sets" : "fixtures"} in round ${r.number}.`);
        add("Unbeaten", rows.filter((e) => e.played > 0 && e.played === e.wins), `Won every played set through round ${r.number}.`);
        const maxWins = Math.max(...rows.map((e) => e.wins)), maxUp = Math.max(...rows.map((e) => e.up)), maxPlayed = Math.max(...rows.map((e) => e.played));
        if (maxWins > 0) add("Most wins", rows.filter((e) => e.wins === maxWins), `${maxWins} set wins through round ${r.number}.`);
        if (maxUp > 0) add("Biggest climbers", rows.filter((e) => e.up === maxUp), `${maxUp} promotions earned (not net group change).`);
        if (maxPlayed > 0) add("Most played", rows.filter((e) => e.played === maxPlayed), `${maxPlayed} sets played; substitute appearances excluded.`);
        const roundMax = Math.max(...rows.map((e) => r.summary[e.id]?.points ?? -Infinity));
        add("Round points leaders", rows.filter((e) => r.summary[e.id]?.points === roundMax), `${roundMax} game-difference points in round ${r.number}.`);
        add("Bounce-back round", rows.filter((e) => e.history.length >= 2 && e.history.at(-2) < 0 && e.history.at(-1) > 0), `Turned a negative previous round into positive points in round ${r.number}.`);
        add("Three positive rounds", rows.filter((e) => e.history.length >= 3 && e.history.slice(-3).every((n) => n > 0)), `Positive game difference in the last three completed rounds.`);
        return facts;
      }
      function playerName(l, pid) {
        for (const e of l.entrants) {
          const p = e.players.find((p2) => p2.id === pid);
          if (p) return p.name;
        }
        for (const r of l.rounds) for (const a of Object.values(r.attendance)) {
          if (a.substitute?.id === pid) return `${a.substitute.name} (sub)`;
        }
        return "Player";
      }
      module.exports = { walkover, schedule, generateRound, id, ensure, clone, clean, defaults, rules, createLeague, addEntrant, start, current, ranking, findMatch, participants, submit, confirm, dispute, attendance, propose, acceptSchedule, bind, rosaEvent, demoFinish, insights, playerName, zoned, addDays };
    }
  });

  // scripts/league-browser/demo-api.entry.cjs
  var require_demo_api_entry = __commonJS({
    "scripts/league-browser/demo-api.entry.cjs"() {
      var E = require_engine();
      var O = require_operations();
      (() => {
        const nativeFetch = window.fetch.bind(window);
        const storageKey = "rosa-league-online-v1";
        const user = { id: "showcase-organizer", name: "League organizer", email: "showcase@rosapadel.com", admin: true, playerIds: [] };
        const publicUrl = `${location.origin}/league-tool`;
        const names = ["Alex Moreno", "Sofia Ramos", "Lucas Vidal", "Emma Cruz", "Nico Torres", "Mia Rojas", "Leo Marin", "Clara Soto", "Pablo Gil", "Julia Vega", "Diego Ruiz", "Elena Costa", "Mateo Sol", "Ana Luna", "Hugo Rey", "Lara Cano", "Luis Arias", "Eva Leon", "Ivan Mora", "Alba Serra", "Bruno Rio", "Sara Paz", "Raul Pino", "Celia Diaz"];
        function newDemo(format = "individual") {
          const league = E.createLeague(user.id, { name: format === "pairs" ? "Mixed pairs \xB7 Club Series" : "Club Series \xB7 Individual", club: "ROSA Padel Club", demo: true, rules: { format } });
          for (let index = 0; index < 12; index++) E.addEntrant(league, { names: format === "pairs" ? [names[index * 2], names[index * 2 + 1]] : [names[index]], rating: 3 + index % 4 });
          E.start(league);
          E.demoFinish(league, true);
          E.demoFinish(league, true);
          E.demoFinish(league, false);
          return league;
        }
        let db;
        try {
          db = JSON.parse(localStorage.getItem(storageKey));
        } catch {
        }
        if (!db?.leagues?.length) db = { schema: 1, leagues: [newDemo()], accounts: {} };
        const save = () => localStorage.setItem(storageKey, JSON.stringify(db));
        save();
        function publicLeague(league) {
          const copy = O.projections(E.clone(league));
          delete copy.ownerId;
          return { ...copy, organizer: true, accounts: league.entrants.flatMap((entry) => entry.players).map((player) => ({ playerId: player.id, email: db.accounts[player.id] || null })), ranking: E.ranking(league), insights: E.insights(league), roundInsights: Object.fromEntries(league.rounds.filter((round) => round.status === "complete").map((round) => [round.id, E.insights(league, round.number)])) };
        }
        const state = () => ({ user, publicUrl, defaults: E.defaults, leagues: db.leagues.map(publicLeague) });
        const response = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
        const leagueBy = (id) => db.leagues.find((league) => league.id === id);
        function mutate(body) {
          if (body.type === "create" || body.type === "demo") {
            const league2 = body.type === "demo" ? newDemo(body.format === "pairs" ? "pairs" : "individual") : E.createLeague(user.id, body.data);
            db.leagues.push(league2);
            save();
            return { leagueId: league2.id };
          }
          const league = leagueBy(body.leagueId);
          E.ensure(league, "League not found.");
          if (body.revision !== void 0 && body.revision !== league.revision) throw new Error("The league changed. Refresh and try again.");
          const actor = { ...user, organizer: true }, data = body.data || {};
          let result = {};
          switch (body.type) {
            case "walkover":
              E.walkover(league, data.matchId, Number(data.side), data.reason, actor);
              break;
            case "scheduleGroup":
              O.scheduleGroup(league, data, actor);
              break;
            case "unbind":
              O.unbind(league, data);
              break;
            case "roundSchedule":
              O.reschedule(league, data);
              break;
            case "nextRules": {
              const config = E.rules({ ...league.rules, ...data.rules });
              E.ensure(config.format === league.rules.format, "The competition format cannot change for one round.");
              if (data.startDate) config.startDate = E.addDays(data.startDate, -E.current(league).number * config.intervalDays);
              league.nextRules = config;
              O.audit(league, "Configuration override saved for the next round only.");
              break;
            }
            case "rosterChange":
              O.changeRoster(league, data);
              break;
            case "reorder":
              O.reorder(league, data.ids);
              break;
            case "nextGroups":
              O.setNextGroups(league, data.groups);
              break;
            case "currentGroups":
              O.applyGroups(league, data.groups);
              break;
            case "resume":
              O.resume(league);
              break;
            case "ratingSeed":
              O.reorder(league, [...league.entrants].sort((a, b) => (b.rating || 0) - (a.rating || 0) || a.seed - b.seed).map((entry) => entry.id));
              break;
            case "rating": {
              const entry = league.entrants.find((item) => item.id === data.id);
              E.ensure(entry, "Entry not found.");
              entry.rating = Number(data.rating);
              break;
            }
            case "accountLink": {
              if (data.email) db.accounts[data.playerId] = String(data.email);
              else delete db.accounts[data.playerId];
              break;
            }
            case "correct":
              O.correct(league, { ...data, actorId: user.id });
              break;
            case "resetDemo": {
              E.ensure(league.demo, "Only demo leagues can be restarted.");
              const replacement = newDemo(league.rules.format);
              replacement.id = league.id;
              db.leagues.splice(db.leagues.indexOf(league), 1, replacement);
              save();
              return {};
            }
            case "pairCourt": {
              league.connectedCourts = league.connectedCourts || [];
              league.connectedCourts.push({ localCourt: data.localCourt, courtId: "showcase-court", name: "ROSA Vision showcase" });
              O.audit(league, `ROSA showcase monitor assigned to ${data.localCourt}.`);
              break;
            }
            case "vision":
              O.vision(league, data);
              break;
            case "settings":
              league.rules = E.rules(data.rules);
              league.name = E.clean(data.name) || league.name;
              league.club = E.clean(data.club);
              break;
            case "add":
              if (league.status === "registration") E.addEntrant(league, data);
              else O.changeRoster(league, { ...data, kind: "add" });
              break;
            case "import":
              data.rows.forEach((row) => E.addEntrant(league, { names: row }));
              break;
            case "remove":
              league.entrants = league.entrants.filter((entry) => entry.id !== data.id);
              league.entrants.forEach((entry, index) => entry.seed = index + 1);
              break;
            case "seed": {
              const entry = league.entrants.find((item) => item.id === data.id), ordered = [...league.entrants].sort((a, b) => a.seed - b.seed).filter((item) => item.id !== data.id);
              ordered.splice(Number(data.seed) - 1, 0, entry);
              ordered.forEach((item, index) => item.seed = index + 1);
              break;
            }
            case "approve":
              break;
            case "start":
              E.start(league);
              break;
            case "demoNext":
              E.demoFinish(league);
              break;
            case "demoRound":
              E.demoFinish(league, true);
              break;
            case "submit":
              E.submit(league, data.matchId, data.score, actor, data.qr ? "qr" : "manual");
              break;
            case "confirm":
              E.confirm(league, data.matchId, data.submissionId, actor);
              break;
            case "dispute":
              E.dispute(league, data.matchId, data.reason, actor);
              break;
            case "attendance":
              E.attendance(league, data.playerId, data);
              break;
            case "propose":
              E.propose(league, data.matchId, data, actor);
              break;
            case "acceptSchedule":
              E.acceptSchedule(league, data.matchId, data.proposalId, actor);
              break;
            case "bind":
              result = { binding: E.bind(league, data.matchId, data) };
              break;
            case "invite":
              result = { url: `${publicUrl}/#overview` };
              break;
            case "share":
              result = { url: `${publicUrl}/#${data.kind === "join" ? "hub" : "round/" + (data.roundId || E.current(league)?.id)}` };
              break;
            case "revokeShares":
              break;
            default:
              throw new Error("Unknown action.");
          }
          league.revision++;
          save();
          return result;
        }
        window.fetch = async (input, init = {}) => {
          const url = new URL(typeof input === "string" ? input : input.url, location.href);
          if (!url.pathname.startsWith("/api/")) return nativeFetch(input, init);
          let body = {};
          try {
            body = init.body ? JSON.parse(init.body) : {};
          } catch {
          }
          try {
            if (url.pathname === "/api/state") return response(state());
            if (url.pathname === "/api/action") {
              const result = mutate(body);
              return response(result);
            }
            if (url.pathname === "/api/evidence") {
              const league = leagueBy(url.searchParams.get("league"));
              return response(O.evidence(league, url.searchParams.get("entry"), Number(url.searchParams.get("through")) || 52));
            }
            if (["/api/login", "/api/register", "/api/logout"].includes(url.pathname)) return response({ user });
            if (url.pathname === "/api/claim" || url.pathname === "/api/join") return response({ ok: true });
            return response({ error: "This online showcase keeps data in this browser. Shared-link and file services activate with the VPS backend." }, 501);
          } catch (error) {
            return response({ error: error.message || "Request failed." }, 400);
          }
        };
      })();
    }
  });
  require_demo_api_entry();
})();
