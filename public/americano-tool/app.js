const state = {
  data: null,
  selectedRound: null,
  followingActiveRound: true,
  lastScrolledRound: null,
  toastTimer: null,
  resultTimers: new Map(),
  timerDeadline: null,
  alarmPlayed: false,
  audioContext: null,
  alarmTimer: null,
  alarmNodes: [],
  settingsStarted: null,
};

const $ = (id) => document.getElementById(id);

async function api(path, body) {
  markSaving(true);
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body || {}),
    });
    const payload = await response.json();
    if (!response.ok || payload.error) {
      if (response.status === 401) showAuth();
      throw new Error(payload.error || "Request failed");
    }
    installData(payload);
    render();
    return payload;
  } finally {
    markSaving(false);
  }
}

async function loadState() {
  const response = await fetch("/api/state");
  const payload = await response.json();
  if (!payload.auth?.authenticated) {
    state.data = payload;
    showAuth();
    return;
  }
  installData(payload, { resetRound: !state.data?.auth?.authenticated });
  render();
}

async function authRequest(path) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: $("authUsername").value,
      password: $("authPassword").value,
    }),
  });
  const payload = await response.json();
  if (!response.ok || payload.error) {
    throw new Error(payload.error || "Authentication failed");
  }
  state.data = null;
  state.selectedRound = null;
  state.followingActiveRound = true;
  state.settingsStarted = null;
  await loadState();
}

function installData(payload, { resetRound = false } = {}) {
  const previousModel = buildRoundModel(state.data?.matches || []);
  const previousSelected = state.selectedRound;
  const wasFollowingActive = state.followingActiveRound;
  const nextPayload = payload.auth ? payload : { ...payload, auth: state.data?.auth };
  state.data = nextPayload;

  const nextModel = buildRoundModel(nextPayload.matches || []);
  const selectedStillExists = nextModel.rounds.some((round) => round.number === previousSelected);
  const fallbackRound = nextModel.activeRound ?? nextModel.rounds.at(-1)?.number ?? null;

  if (resetRound || !selectedStillExists) {
    state.selectedRound = fallbackRound;
  } else if (
    wasFollowingActive &&
    previousSelected === previousModel.activeRound &&
    previousModel.activeRound !== nextModel.activeRound
  ) {
    state.selectedRound = fallbackRound;
  } else {
    state.selectedRound = previousSelected;
  }

  state.followingActiveRound =
    nextModel.activeRound !== null && state.selectedRound === nextModel.activeRound;
}

function buildRoundModel(matches) {
  const groups = new Map();
  matches.forEach((match) => {
    const number = Number(match.round_no);
    if (!groups.has(number)) groups.set(number, []);
    groups.get(number).push(match);
  });

  const ordered = [...groups.entries()].sort(([left], [right]) => left - right);
  const activeEntry = ordered.find(([, roundMatches]) =>
    roundMatches.some((match) => match.status !== "finished"),
  );
  const activeRound = activeEntry ? activeEntry[0] : null;
  const rounds = ordered.map(([number, roundMatches]) => {
    const finishedCount = roundMatches.filter((match) => match.status === "finished").length;
    const status =
      finishedCount === roundMatches.length
        ? "finished"
        : number === activeRound
          ? "active"
          : "upcoming";
    return {
      number,
      matches: roundMatches,
      finishedCount,
      status,
    };
  });
  return { rounds, activeRound };
}

function showAuth() {
  $("authShell").hidden = false;
  $("appShell").hidden = true;
  markSaving(false);
}

function showApp() {
  $("authShell").hidden = true;
  $("appShell").hidden = false;
}

function markSaving(active) {
  const el = $("saveState");
  if (!el) return;
  el.textContent = active ? "Saving" : "Saved";
  el.classList.toggle("saving", active);
}

function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("visible");
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => el.classList.remove("visible"), 3000);
}

function activePlayers() {
  return (state.data?.players || []).filter((player) => player.active);
}

function render() {
  if (!state.data?.tournament) return;
  showApp();
  const tournament = state.data.tournament;
  const roundModel = buildRoundModel(state.data.matches || []);

  $("accountLabel").textContent = state.data.auth?.account?.username || "Account";
  $("tournamentTitle").textContent = tournament.name;
  $("eventName").value = tournament.name;
  $("pointLimit").value = tournament.point_limit;
  $("defaultScoringMode").value = tournament.default_scoring_mode || "points";
  $("timerMinutes").value = tournament.timer_minutes;
  $("courts").value = tournament.courts;
  $("playerCount").textContent = `${activePlayers().length} registered`;
  syncMatchConfiguration(tournament, roundModel.rounds.length > 0);
  syncScheduleAction(roundModel);

  const rankingMode = tournament.ranking_mode || "match_points";
  document.querySelectorAll('input[name="rankingMode"]').forEach((input) => {
    input.checked = input.value === rankingMode;
  });

  const completedRounds = roundModel.rounds.filter((round) => round.status === "finished").length;
  const expectedRounds = state.data.expected_rounds || 0;
  $("roundSummary").textContent = roundModel.rounds.length
    ? `${roundModel.rounds.length} rounds generated`
    : expectedRounds
      ? `${expectedRounds} automatic rotations ready to generate`
      : "Add at least four players to create the schedule";
  $("roundProgress").textContent = roundModel.rounds.length
    ? `${completedRounds} of ${roundModel.rounds.length} complete`
    : "0 complete";
  $("timerHeading").textContent = roundModel.activeRound
    ? `Round ${roundModel.activeRound} is active`
    : roundModel.rounds.length
      ? "Tournament complete"
      : "Ready for the first round";

  syncScoringSettings();
  syncTimerState();
  renderPlayers();
  renderRounds(roundModel);
  renderStandings();
}

function setSettingsExpanded(expanded) {
  const panel = $("settingsPanel");
  const body = $("settingsBody");
  const toggle = $("settingsToggle");
  body.hidden = !expanded;
  panel.classList.toggle("is-collapsed", !expanded);
  toggle.setAttribute("aria-expanded", String(expanded));
  toggle.textContent = expanded ? "Hide setup" : "Edit setup";
}

function syncMatchConfiguration(tournament, started) {
  const courts = Number(tournament.courts || 1);
  const timerMinutes = Number(tournament.timer_minutes || 0);
  const timerSummary = timerMinutes ? `${timerMinutes}-minute timer` : "No round timer";
  const scoringSummary =
    (tournament.default_scoring_mode || "points") === "time"
      ? `${timerMinutes}-minute rounds`
      : `${tournament.point_limit}-point target · ${timerSummary}`;
  $("settingsSummary").textContent = `${scoringSummary} · ${courts} ${courts === 1 ? "court" : "courts"}`;

  if (state.settingsStarted === null || state.settingsStarted !== started) {
    setSettingsExpanded(!started);
  }
  state.settingsStarted = started;
}

function syncScheduleAction(roundModel) {
  const playerCount = activePlayers().length;
  const expectedRounds = Number(state.data?.expected_rounds || 0);
  const hasSchedule = roundModel.rounds.length > 0;
  const button = $("generateRounds");
  $("generateRoundsLabel").textContent = hasSchedule
    ? "Regenerate full schedule"
    : "Generate full schedule";
  button.disabled = playerCount < 4;

  if (hasSchedule) {
    $("scheduleActionHint").textContent = `Rebuilds all ${roundModel.rounds.length} rounds from the current setup and replaces existing results.`;
  } else if (playerCount >= 4) {
    $("scheduleActionHint").textContent = `${playerCount} players · ${expectedRounds} rounds ready to generate.`;
  } else {
    const missingPlayers = 4 - playerCount;
    $("scheduleActionHint").textContent = `Add ${missingPlayers} more ${missingPlayers === 1 ? "player" : "players"} to generate the schedule.`;
  }
}

function syncScoringSettings() {
  const mode = $("defaultScoringMode").value || "points";
  const targetMode = mode === "points";
  $("pointTargetField").hidden = !targetMode;
  $("scoringModeHelp").textContent = targetMode
    ? "New matches use the target score. Entering one side automatically completes the other side to that total."
    : "New matches have no score target. Keep scoring during the shared round timer, then save the final score when time ends.";
  $("timerContext").textContent = targetMode
    ? "Optional shared timing keeps every court moving while matches play to the target score."
    : "Timed matches have no score cap; save each court's score when this shared timer ends.";
}

function renderPlayers() {
  const el = $("playersList");
  const players = activePlayers();
  if (!players.length) {
    el.innerHTML = `<div class="empty">Register players to build the Americano rotation.</div>`;
    return;
  }
  el.innerHTML = players
    .map(
      (player) => `
        <div class="player-row">
          <span class="player-index" aria-hidden="true">${String(player.id).padStart(2, "0")}</span>
          <input class="player-name-input" type="text" value="${escapeAttr(player.name)}" data-player-name="${player.id}" aria-label="Player name" />
          <button class="button secondary compact" type="button" data-rename="${player.id}">Save</button>
          <button class="icon-button danger-text" type="button" data-deactivate="${player.id}" aria-label="Remove ${escapeAttr(player.name)}">×</button>
        </div>
      `,
    )
    .join("");
}

function renderRounds(roundModel = buildRoundModel(state.data?.matches || [])) {
  const navigation = $("roundNavigation");
  const selectedHeader = $("selectedRoundHeader");
  renderPrintRounds(roundModel);
  if (!roundModel.rounds.length) {
    navigation.hidden = true;
    selectedHeader.hidden = true;
    $("matches").innerHTML = `<div class="empty empty-large">
      <strong>No rounds yet</strong>
      <span>Add at least four players, choose the format, and generate the full schedule.</span>
    </div>`;
    return;
  }

  if (!roundModel.rounds.some((round) => round.number === state.selectedRound)) {
    state.selectedRound = roundModel.activeRound ?? roundModel.rounds.at(-1).number;
  }
  navigation.hidden = false;
  selectedHeader.hidden = false;

  $("roundTabs").innerHTML = roundModel.rounds
    .map((round) => {
      const selected = round.number === state.selectedRound;
      return `
        <button
          class="round-tab ${round.status} ${selected ? "selected" : ""}"
          type="button"
          role="tab"
          aria-selected="${selected}"
          aria-controls="matches"
          data-round="${round.number}"
        >
          <span>Round ${round.number}</span>
          <small>${roundStatusLabel(round.status)}</small>
        </button>
      `;
    })
    .join("");

  const selectedIndex = roundModel.rounds.findIndex((round) => round.number === state.selectedRound);
  $("previousRound").disabled = selectedIndex <= 0;
  $("nextRound").disabled = selectedIndex < 0 || selectedIndex >= roundModel.rounds.length - 1;

  const selectedRound = roundModel.rounds[selectedIndex];
  $("selectedRoundEyebrow").textContent =
    selectedRound.status === "active" ? "Now playing" : "Selected round";
  $("selectedRoundTitle").textContent = `Round ${selectedRound.number}`;
  $("selectedRoundSummary").textContent = `${selectedRound.finishedCount} of ${selectedRound.matches.length} matches finished`;
  const status = $("selectedRoundStatus");
  status.textContent = roundStatusLabel(selectedRound.status);
  status.className = `status-pill ${selectedRound.status}`;

  renderMatches(selectedRound);
  if (state.lastScrolledRound !== state.selectedRound) {
    state.lastScrolledRound = state.selectedRound;
    requestAnimationFrame(() => {
      $("roundTabs").querySelector('[aria-selected="true"]')?.scrollIntoView({
        block: "nearest",
        inline: "center",
      });
    });
  }
}

function roundStatusLabel(status) {
  return { finished: "Finished", active: "Active", upcoming: "Upcoming" }[status] || "Upcoming";
}

function renderMatches(round) {
  const el = $("matches");
  const target = Number(state.data?.tournament?.point_limit || 32);
  el.innerHTML = round.matches.map((match) => matchCardMarkup(match, round.number, target)).join("");
}

function renderPrintRounds(roundModel) {
  const el = $("printRounds");
  if (!roundModel.rounds.length) {
    el.innerHTML = "";
    return;
  }
  const target = Number(state.data?.tournament?.point_limit || 32);
  el.innerHTML = roundModel.rounds
    .map(
      (round) => `
        <section class="print-round">
          <header class="print-round-head">
            <div>
              <p class="eyebrow">Tournament round</p>
              <h3>Round ${round.number}</h3>
              <p>${round.finishedCount} of ${round.matches.length} matches finished</p>
            </div>
            <span class="status-pill ${round.status}">${roundStatusLabel(round.status)}</span>
          </header>
          <div class="matches print-matches">
            ${round.matches.map((match) => matchCardMarkup(match, round.number, target)).join("")}
          </div>
        </section>
      `,
    )
    .join("");
}

function matchCardMarkup(match, roundNumber, target) {
  const finished = match.status === "finished";
  const scoringMode = effectiveScoringMode(match);
  const modeHelp =
    scoringMode === "points" ? `Scores must total ${target}` : "No target · save when time ends";
  return `
    <article class="match-card ${finished ? "finished" : ""}" data-match-id="${match.id}" data-round-no="${roundNumber}">
      <div class="match-top">
        <div>
          <span class="court-label">Court ${match.court_no}</span>
          <span class="match-format-summary">${modeHelp}</span>
        </div>
        <span class="match-status ${finished ? "finished" : "open"}">${finished ? "Result saved" : "Open"}</span>
      </div>
      <div class="teams">
        <div class="team">
          <small>Team A</small>
          <strong title="${escapeAttr(match.left_p1_name)} / ${escapeAttr(match.left_p2_name)}">
            ${escapeHtml(match.left_p1_name)} <span>&amp;</span> ${escapeHtml(match.left_p2_name)}
          </strong>
        </div>
        <div class="versus" aria-hidden="true">VS</div>
        <div class="team team-right">
          <small>Team B</small>
          <strong title="${escapeAttr(match.right_p1_name)} / ${escapeAttr(match.right_p2_name)}">
            ${escapeHtml(match.right_p1_name)} <span>&amp;</span> ${escapeHtml(match.right_p2_name)}
          </strong>
        </div>
      </div>
      <form class="score-form" data-result="${match.id}">
        <div class="score-inputs">
          <label>
            <span>Team A score</span>
            <input data-score="left" type="number" min="0" inputmode="numeric" value="${match.left_points ?? ""}" aria-label="Team A score on court ${match.court_no}" />
          </label>
          <span class="score-divider" aria-hidden="true">–</span>
          <label>
            <span>Team B score</span>
            <input data-score="right" type="number" min="0" inputmode="numeric" value="${match.right_points ?? ""}" aria-label="Team B score on court ${match.court_no}" />
          </label>
        </div>
        <label class="mode-field">
          <span>Match format</span>
          <select data-scoring-mode aria-label="Scoring format for court ${match.court_no}">
            <option value="points" ${scoringMode === "points" ? "selected" : ""}>Target points</option>
            <option value="time" ${scoringMode === "time" ? "selected" : ""}>Timed match</option>
          </select>
        </label>
        <div class="score-actions">
          <button class="button primary" type="submit">${finished ? "Update result" : "Save result"}</button>
          <button class="button secondary" type="button" data-clear-result="${match.id}" ${!finished && match.left_points == null && match.right_points == null ? "disabled" : ""}>Clear</button>
        </div>
      </form>
    </article>
  `;
}

function effectiveScoringMode(match) {
  return (
    match.scoring_mode ||
    match.finished_by ||
    state.data?.tournament?.default_scoring_mode ||
    "points"
  );
}

function renderStandings() {
  const el = $("standings");
  const standings = state.data.standings || [];
  const rankingMode = state.data.tournament?.ranking_mode || "match_points";
  $("rankingSubtitle").textContent =
    rankingMode === "point_total"
      ? "Every scored point counts toward the ranking"
      : "Win = 3 · Draw = 1 · Loss = 0";
  if (!standings.length) {
    el.innerHTML = `<div class="empty">The ranking appears as players are registered.</div>`;
    return;
  }
  el.innerHTML = standings
    .map(
      (row) => `
        <div class="standing-row">
          <span class="rank">${row.rank}</span>
          <div class="standing-main">
            <strong>${escapeHtml(row.name)}</strong>
            <span>${row.matches} played · ${row.wins}W ${row.draws}D ${row.losses}L</span>
          </div>
          <div class="standing-stat">
            <strong>${row.ranking_points}</strong>
            <span>${rankingMode === "point_total" ? `${formatSigned(row.point_diff)} diff` : `${row.points_for} scored · ${formatSigned(row.point_diff)}`}</span>
          </div>
        </div>
      `,
    )
    .join("");
}

function formatSigned(value) {
  return value > 0 ? `+${value}` : String(value);
}

function formatClock(seconds) {
  const safe = Math.max(0, Math.floor(Number(seconds) || 0));
  const minutes = Math.floor(safe / 60);
  const rest = safe % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function syncTimerState() {
  const timer = state.data?.timer || { remaining_seconds: 0, running: false };
  state.timerDeadline = timer.running ? Date.now() + timer.remaining_seconds * 1000 : null;
  $("timerDisplay").textContent = formatClock(timer.remaining_seconds);
  $("timerDisplay").classList.toggle("expired", timer.remaining_seconds <= 0 && !timer.running);
  $("startTimer").disabled = timer.running;
  $("pauseTimer").disabled = !timer.running;
}

function tickTimer() {
  if (!state.data?.timer || $("appShell").hidden) return;
  if (!state.timerDeadline) {
    $("timerDisplay").textContent = formatClock(state.data.timer.remaining_seconds);
    return;
  }
  const remaining = Math.max(0, Math.ceil((state.timerDeadline - Date.now()) / 1000));
  $("timerDisplay").textContent = formatClock(remaining);
  $("timerDisplay").classList.toggle("expired", remaining <= 0);
  if (remaining <= 0) {
    state.timerDeadline = null;
    if (!state.alarmPlayed) {
      state.alarmPlayed = true;
      ringAlarm();
      toast("Time is up");
    }
    loadState().catch((error) => toast(error.message));
  }
}

function ringAlarm() {
  const context = getAudioContext();
  if (!context) return;
  context.resume?.().catch(() => {});
  stopAlarm();
  const playBeep = () => {
    const start = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(880, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.42);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.45);
    state.alarmNodes.push(oscillator, gain);
    oscillator.onended = () => {
      state.alarmNodes = state.alarmNodes.filter((node) => node !== oscillator && node !== gain);
    };
  };
  playBeep();
  state.alarmTimer = setInterval(playBeep, 750);
  setTimeout(stopAlarm, 7000);
}

function stopAlarm() {
  if (state.alarmTimer) {
    clearInterval(state.alarmTimer);
    state.alarmTimer = null;
  }
  state.alarmNodes.forEach((node) => {
    try {
      node.stop?.();
      node.disconnect?.();
    } catch (_error) {
      // Some nodes may already be stopped.
    }
  });
  state.alarmNodes = [];
}

function getAudioContext() {
  if (state.audioContext) return state.audioContext;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  state.audioContext = new AudioContext();
  return state.audioContext;
}

function prepareAlarmAudio() {
  const context = getAudioContext();
  context?.resume?.().catch(() => {});
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char];
  });
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

function selectRound(roundNumber, { focus = false } = {}) {
  const roundModel = buildRoundModel(state.data?.matches || []);
  if (!roundModel.rounds.some((round) => round.number === roundNumber)) return;
  state.selectedRound = roundNumber;
  state.followingActiveRound = roundNumber === roundModel.activeRound;
  renderRounds(roundModel);
  if (focus) {
    $("roundTabs").querySelector(`[data-round="${roundNumber}"]`)?.focus();
  }
}

function stepRound(offset) {
  const roundModel = buildRoundModel(state.data?.matches || []);
  const currentIndex = roundModel.rounds.findIndex((round) => round.number === state.selectedRound);
  const target = roundModel.rounds[currentIndex + offset];
  if (target) selectRound(target.number, { focus: true });
}

function bindEvents() {
  $("authForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await authRequest("/api/auth/login");
      toast("Signed in");
    } catch (error) {
      toast(error.message);
    }
  });

  $("registerButton").addEventListener("click", async () => {
    try {
      await authRequest("/api/auth/register");
      toast("Account created");
    } catch (error) {
      toast(error.message);
    }
  });

  $("logoutButton").addEventListener("click", async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      state.data = null;
      state.selectedRound = null;
      state.followingActiveRound = true;
      state.settingsStarted = null;
      showAuth();
      toast("Logged out");
    } catch (error) {
      toast(error.message);
    }
  });

  $("defaultScoringMode").addEventListener("change", syncScoringSettings);

  $("settingsToggle").addEventListener("click", () => {
    setSettingsExpanded($("settingsToggle").getAttribute("aria-expanded") !== "true");
  });

  $("saveSettings").addEventListener("click", async () => {
    try {
      await api("/api/tournament", {
        name: $("eventName").value,
        point_limit: $("pointLimit").value,
        default_scoring_mode: $("defaultScoringMode").value,
        ranking_mode: state.data?.tournament?.ranking_mode || "match_points",
        timer_minutes: $("timerMinutes").value,
        courts: $("courts").value,
      });
      toast("Settings saved");
    } catch (error) {
      toast(error.message);
    }
  });

  $("playerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await api("/api/players", { name: $("playerName").value });
      $("playerName").value = "";
      $("playerName").focus();
      toast("Player added");
    } catch (error) {
      toast(error.message);
    }
  });

  $("generateRounds").addEventListener("click", async () => {
    try {
      await api("/api/generate", {});
      toast("Rounds generated");
    } catch (error) {
      toast(error.message);
    }
  });

  $("previousRound").addEventListener("click", () => stepRound(-1));
  $("nextRound").addEventListener("click", () => stepRound(1));

  $("startTimer").addEventListener("click", async () => {
    try {
      state.alarmPlayed = false;
      stopAlarm();
      prepareAlarmAudio();
      await api("/api/timer", { action: "start" });
      toast("Timer started");
    } catch (error) {
      toast(error.message);
    }
  });

  $("pauseTimer").addEventListener("click", async () => {
    try {
      stopAlarm();
      await api("/api/timer", { action: "pause" });
      toast("Timer paused");
    } catch (error) {
      toast(error.message);
    }
  });

  $("resetTimer").addEventListener("click", async () => {
    try {
      state.alarmPlayed = false;
      stopAlarm();
      await api("/api/timer", { action: "reset" });
      toast("Timer reset");
    } catch (error) {
      toast(error.message);
    }
  });

  $("printSheet").addEventListener("click", () => window.print());

  $("openReset").addEventListener("click", () => {
    $("resetConfirmText").value = "";
    $("confirmReset").disabled = true;
    $("resetDialog").showModal();
    $("resetConfirmText").focus();
  });

  $("openClearPlayers").addEventListener("click", () => {
    $("clearPlayersConfirmText").value = "";
    $("confirmClearPlayers").disabled = true;
    $("clearPlayersDialog").showModal();
    $("clearPlayersConfirmText").focus();
  });

  $("cancelReset").addEventListener("click", () => $("resetDialog").close());
  $("cancelClearPlayers").addEventListener("click", () => $("clearPlayersDialog").close());
  $("resetConfirmText").addEventListener("input", () => {
    $("confirmReset").disabled = $("resetConfirmText").value !== "RESET";
  });
  $("clearPlayersConfirmText").addEventListener("input", () => {
    $("confirmClearPlayers").disabled = $("clearPlayersConfirmText").value !== "CLEAR";
  });

  $("confirmReset").addEventListener("click", async () => {
    try {
      state.selectedRound = null;
      await api("/api/reset", { confirmation: $("resetConfirmText").value });
      $("resetDialog").close();
      toast("Tournament reset");
    } catch (error) {
      toast(error.message);
    }
  });

  $("confirmClearPlayers").addEventListener("click", async () => {
    try {
      state.selectedRound = null;
      await api("/api/players/clear", { confirmation: $("clearPlayersConfirmText").value });
      $("clearPlayersDialog").close();
      toast("Players cleared");
    } catch (error) {
      toast(error.message);
    }
  });

  document.addEventListener("click", async (event) => {
    const roundButton = event.target.closest("[data-round]");
    if (roundButton) {
      selectRound(Number(roundButton.dataset.round));
      return;
    }

    const deactivateId = event.target.closest("[data-deactivate]")?.dataset.deactivate;
    const renameId = event.target.closest("[data-rename]")?.dataset.rename;
    const clearId = event.target.closest("[data-clear-result]")?.dataset.clearResult;
    if (renameId) {
      const input = document.querySelector(`[data-player-name="${renameId}"]`);
      try {
        await api("/api/players/rename", { id: renameId, name: input.value });
        toast("Player updated");
      } catch (error) {
        toast(error.message);
      }
    }
    if (deactivateId) {
      try {
        await api("/api/players/deactivate", { id: deactivateId });
        toast("Player removed");
      } catch (error) {
        toast(error.message);
      }
    }
    if (clearId) {
      clearTimeout(state.resultTimers.get(clearId));
      try {
        await api("/api/results/clear", { id: clearId });
        toast("Result cleared");
      } catch (error) {
        toast(error.message);
      }
    }
  });

  document.addEventListener("submit", async (event) => {
    const form = event.target.closest("[data-result]");
    if (!form) return;
    event.preventDefault();
    clearTimeout(state.resultTimers.get(form.dataset.result));
    try {
      await saveResultForm(form);
      toast("Result saved");
    } catch (error) {
      toast(error.message);
    }
  });

  document.addEventListener("input", (event) => {
    const form = event.target.closest("[data-result]");
    if (!form || !event.target.matches("input[data-score]")) return;
    completeScorePair(form, event.target);
    scheduleResultAutosave(form);
  });

  document.addEventListener("change", async (event) => {
    if (event.target.name === "rankingMode") {
      api("/api/ranking-mode", { ranking_mode: event.target.value })
        .then(() => toast("Ranking mode updated"))
        .catch((error) => toast(error.message));
      return;
    }
    const form = event.target.closest("[data-result]");
    if (!form || !event.target.matches("select[data-scoring-mode]")) return;
    clearTimeout(state.resultTimers.get(form.dataset.result));
    try {
      await api("/api/matches/scoring-mode", {
        id: form.dataset.result,
        scoring_mode: event.target.value,
      });
      toast("Match format updated");
    } catch (error) {
      renderRounds();
      toast(error.message);
    }
  });

  $("roundTabs").addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepRound(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      stepRound(1);
    }
  });
}

function completeScorePair(form, changedInput) {
  if (form.querySelector("select[data-scoring-mode]").value !== "points") return;
  const target = Number(state.data?.tournament?.point_limit || 32);
  const inputs = [...form.querySelectorAll("input[data-score]")];
  const other = inputs.find((input) => input !== changedInput);
  const value = Number(changedInput.value);
  if (!Number.isFinite(value) || changedInput.value === "") return;
  const clamped = Math.max(0, Math.min(target, value));
  if (clamped !== value) changedInput.value = clamped;
  other.value = Math.max(0, target - clamped);
}

function scheduleResultAutosave(form) {
  const inputs = [...form.querySelectorAll("input[data-score]")];
  if (inputs.some((input) => input.value === "")) return;
  const matchId = form.dataset.result;
  clearTimeout(state.resultTimers.get(matchId));
  state.resultTimers.set(
    matchId,
    setTimeout(async () => {
      try {
        await saveResultForm(form);
      } catch (error) {
        toast(error.message);
      }
    }, 700),
  );
}

async function saveResultForm(form) {
  const inputs = form.querySelectorAll("input[data-score]");
  if (inputs[0].value === "" || inputs[1].value === "") {
    throw new Error("Both scores are required.");
  }
  const scoringMode = form.querySelector("select[data-scoring-mode]").value;
  return api("/api/results", {
    id: form.dataset.result,
    left_points: inputs[0].value,
    right_points: inputs[1].value,
    scoring_mode: scoringMode,
    finished_by: scoringMode,
  });
}

bindEvents();
setInterval(tickTimer, 500);
loadState().catch((error) => toast(error.message));
