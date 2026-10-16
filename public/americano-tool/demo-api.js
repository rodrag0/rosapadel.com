(() => {
  const nativeFetch = window.fetch.bind(window);
  const STORAGE_KEY = "rosa-americano-online-v1";
  const names = [
    "Alex Moreno", "Sofia Ramos", "Lucas Vidal", "Emma Cruz",
    "Nico Torres", "Mia Rojas", "Leo Marin", "Clara Soto",
    "Pablo Gil", "Julia Vega", "Diego Ruiz", "Elena Costa",
    "Mateo Sol", "Ana Luna", "Hugo Rey", "Lara Cano",
  ];

  const fresh = () => ({
    tournament: {
      id: 1,
      name: "ROSA Club Americano",
      point_limit: 32,
      default_scoring_mode: "points",
      ranking_mode: "match_points",
      timer_minutes: 15,
      timer_remaining_seconds: 900,
      timer_running: false,
      timer_started_at: null,
      courts: 4,
      updated_at: new Date().toISOString(),
    },
    players: names.map((name, index) => ({ id: index + 1, name, active: 1 })),
    matches: [],
  });

  let data;
  try { data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || fresh(); }
  catch { data = fresh(); }

  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  const byId = id => data.players.find(player => String(player.id) === String(id));
  const activePlayers = () => data.players.filter(player => player.active);
  const timer = () => {
    const tournament = data.tournament;
    let remaining = Number(tournament.timer_remaining_seconds || 0);
    if (tournament.timer_running && tournament.timer_started_at) {
      remaining = Math.max(0, remaining - Math.floor((Date.now() - tournament.timer_started_at) / 1000));
      if (!remaining) {
        tournament.timer_running = false;
        tournament.timer_remaining_seconds = 0;
        tournament.timer_started_at = null;
        save();
      }
    }
    return {
      remaining_seconds: remaining,
      running: Boolean(tournament.timer_running && remaining),
      duration_seconds: Number(tournament.timer_minutes || 0) * 60,
    };
  };

  function standings() {
    const rows = new Map(activePlayers().map(player => [player.id, {
      player_id: player.id, name: player.name, matches: 0, table_points: 0,
      wins: 0, draws: 0, losses: 0, points_for: 0, points_against: 0, point_diff: 0,
    }]));
    for (const match of data.matches.filter(item => item.status === "finished")) {
      const score = [Number(match.left_points), Number(match.right_points)];
      [[match.left_p1, match.left_p2], [match.right_p1, match.right_p2]].forEach((side, sideIndex) => {
        side.forEach(id => {
          const row = rows.get(id); if (!row) return;
          row.matches += 1; row.points_for += score[sideIndex]; row.points_against += score[1 - sideIndex];
          if (score[sideIndex] > score[1 - sideIndex]) { row.wins += 1; row.table_points += 3; }
          else if (score[sideIndex] === score[1 - sideIndex]) { row.draws += 1; row.table_points += 1; }
          else row.losses += 1;
        });
      });
    }
    const mode = data.tournament.ranking_mode;
    const result = [...rows.values()].map(row => ({
      ...row,
      point_diff: row.points_for - row.points_against,
      ranking_points: mode === "point_total" ? row.points_for : row.table_points,
    }));
    result.sort((a, b) => mode === "point_total"
      ? b.points_for - a.points_for || b.point_diff - a.point_diff || b.wins - a.wins || a.name.localeCompare(b.name)
      : b.table_points - a.table_points || b.point_diff - a.point_diff || b.points_for - a.points_for || b.wins - a.wins || a.name.localeCompare(b.name));
    result.forEach((row, index) => row.rank = index + 1);
    return result;
  }

  function snapshot() {
    const active = activePlayers().length;
    return {
      auth: { authenticated: true, account: { id: "online-showcase", username: "showcase@rosapadel.com" } },
      tournament: data.tournament,
      timer: timer(),
      players: data.players,
      matches: data.matches.map(match => ({
        ...match,
        left_p1_name: byId(match.left_p1)?.name,
        left_p2_name: byId(match.left_p2)?.name,
        right_p1_name: byId(match.right_p1)?.name,
        right_p2_name: byId(match.right_p2)?.name,
      })),
      standings: standings(),
      generated_rounds: Math.max(0, ...data.matches.map(match => match.round_no)),
      expected_rounds: active < 4 ? 0 : (active % 2 ? active : active - 1),
      saved_at: new Date().toISOString(),
    };
  }

  function generate() {
    const ids = activePlayers().map(player => player.id);
    if (ids.length < 4) throw new Error("At least 4 active players are required.");
    if (ids.length % 2) ids.push(null);
    let rotation = [...ids];
    const matches = [];
    for (let round = 1; round < ids.length; round += 1) {
      const pairs = [];
      for (let i = 0; i < rotation.length / 2; i += 1) {
        const a = rotation[i], b = rotation[rotation.length - 1 - i];
        if (a && b) pairs.push([a, b]);
      }
      for (let index = 0; index + 1 < pairs.length; index += 2) {
        const [left, right] = [pairs[index], pairs[index + 1]];
        matches.push({
          id: `match-${round}-${index / 2 + 1}`, round_no: round,
          court_no: index / 2 % Math.max(1, Number(data.tournament.courts)) + 1,
          left_p1: left[0], left_p2: left[1], right_p1: right[0], right_p2: right[1],
          left_points: null, right_points: null,
          scoring_mode: data.tournament.default_scoring_mode || "points",
          finished_by: null, status: "pending",
        });
      }
      rotation = [rotation[0], rotation.at(-1), ...rotation.slice(1, -1)];
    }
    data.matches = matches;
  }

  const json = (body, status = 200) => new Response(JSON.stringify(body), {
    status, headers: { "Content-Type": "application/json" },
  });

  window.fetch = async (input, init = {}) => {
    const url = new URL(typeof input === "string" ? input : input.url, location.href);
    if (!url.pathname.startsWith("/api/")) return nativeFetch(input, init);
    let body = {};
    try { body = init.body ? JSON.parse(init.body) : {}; } catch {}
    try {
      if (url.pathname === "/api/state" || url.pathname === "/api/auth/me") return json(snapshot());
      if (url.pathname.startsWith("/api/auth/")) return json(snapshot());
      if (url.pathname === "/api/tournament") {
        Object.assign(data.tournament, {
          name: String(body.name || data.tournament.name).trim().slice(0, 64),
          point_limit: Math.max(1, Number(body.point_limit) || 32),
          default_scoring_mode: body.default_scoring_mode === "time" ? "time" : "points",
          ranking_mode: body.ranking_mode || data.tournament.ranking_mode,
          timer_minutes: Math.max(1, Number(body.timer_minutes) || 15),
          courts: Math.max(1, Math.min(20, Number(body.courts) || 1)),
          updated_at: new Date().toISOString(),
        });
        data.tournament.timer_remaining_seconds = data.tournament.timer_minutes * 60;
      } else if (url.pathname === "/api/ranking-mode") data.tournament.ranking_mode = body.ranking_mode;
      else if (url.pathname === "/api/players") {
        const name = String(body.name || "").trim(); if (name.length < 2) throw new Error("Enter a player name.");
        data.players.push({ id: Math.max(0, ...data.players.map(player => player.id)) + 1, name, active: 1 });
      } else if (url.pathname === "/api/players/rename") {
        const player = byId(body.id); if (!player) throw new Error("Player not found."); player.name = String(body.name || "").trim();
      } else if (url.pathname === "/api/players/deactivate") {
        const player = byId(body.id); if (!player) throw new Error("Player not found."); player.active = 0;
      } else if (url.pathname === "/api/players/clear") {
        if (body.confirmation !== "CLEAR") throw new Error("Type CLEAR to confirm."); data.players = []; data.matches = [];
      } else if (url.pathname === "/api/generate") generate();
      else if (url.pathname === "/api/results") {
        const match = data.matches.find(item => String(item.id) === String(body.id)); if (!match) throw new Error("Match not found.");
        match.left_points = Number(body.left_points); match.right_points = Number(body.right_points);
        match.scoring_mode = body.scoring_mode || match.scoring_mode; match.finished_by = body.finished_by; match.status = "finished";
      } else if (url.pathname === "/api/results/clear") {
        const match = data.matches.find(item => String(item.id) === String(body.id)); if (match) Object.assign(match, { left_points: null, right_points: null, status: "pending", finished_by: null });
      } else if (url.pathname === "/api/matches/scoring-mode") {
        const match = data.matches.find(item => String(item.id) === String(body.id)); if (match) match.scoring_mode = body.scoring_mode;
      } else if (url.pathname === "/api/timer") {
        const current = timer(); data.tournament.timer_remaining_seconds = current.remaining_seconds;
        if (body.action === "start") { data.tournament.timer_running = true; data.tournament.timer_started_at = Date.now(); }
        if (body.action === "pause") { data.tournament.timer_running = false; data.tournament.timer_started_at = null; }
        if (body.action === "reset") { data.tournament.timer_running = false; data.tournament.timer_started_at = null; data.tournament.timer_remaining_seconds = data.tournament.timer_minutes * 60; }
      } else if (url.pathname === "/api/reset") {
        if (body.confirmation !== "RESET") throw new Error("Type RESET to confirm."); data = fresh(); generate();
      }
      save(); return json(snapshot());
    } catch (error) { return json({ error: error.message }, 400); }
  };

  if (!data.matches.length) { generate(); save(); }
  addEventListener("DOMContentLoaded", () => {
    const exportLink = document.querySelector('a[href="/api/export"]');
    if (exportLink) exportLink.addEventListener("click", event => {
      event.preventDefault();
      const blob = new Blob([JSON.stringify(snapshot(), null, 2)], { type: "application/json" });
      const link = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "rosa-americano-showcase.json" });
      link.click(); URL.revokeObjectURL(link.href);
    });
  });
})();
