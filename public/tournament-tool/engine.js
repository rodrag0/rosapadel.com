(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.Rosa = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const MIN = 60000;
  const clone = value => JSON.parse(JSON.stringify(value));
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const id = prefix => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const text = (v, max = 100) => String(v || '').trim().slice(0, max);
  const key = v => text(v).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ');
  const team = (s, teamId) => s.teams.find(t => t.id === teamId);
  const category = (s, catId) => s.categories.find(c => c.id === catId);
  const match = (s, matchId) => s.matches.find(m => m.id === matchId);
  const active = m => ['called', 'live'].includes(m.status);
  const score = () => ({ sets: [], games: [0, 0], points: [0, 0], tiebreak: false, serving: 0 });
  function log(s, title, detail, kind = 'info') {
    s.log.unshift({ id: id('log'), at: s.now, title, detail, kind });
    s.log = s.log.slice(0, 150);
  }
  function blank(options = {}) {
    const now = options.now || Date.now();
    return { schema: 2, revision: 0, now, demo: !!options.demo, archives: [],
      event: { id: id('event'), name: text(options.name) || 'My padel tournament', venue: text(options.venue) || 'Your club',
        date: localDay(now), endDate: localDay(now + (options.demo ? 3 * 86400000 : 0)), dailyStart: options.demo ? '00:00' : '09:00', dailyEnd: options.demo ? '23:59' : '22:00',
        deadline: new Date(now + 86400000).toISOString().slice(0, 10), fee: 35, currency: 'EUR', sponsor: 'ROSA PADEL',
        registrationOpen: true, registrationMode:'open', paymentTracking:'individual', playerAccounts:false, playerResults:false, visionEnabled:false, prizeMoney:0, prizeCurrency:'EUR', autoAssign: true, restMinutes: 15, warmupMinutes: 5, turnoverMinutes: 3, matchMinutes: 55 },
      categories: [], teams: [], courts: Array.from({ length: 6 }, (_, i) => ({ id: `c${i + 1}`, name: `Court ${i + 1}`, enabled: true, availableAt: now })),
      matches: [], log: [], seenEvents: [] };
  }
  function localDay(stamp) { const d = new Date(stamp); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
  function paymentsOf(t) { if(Array.isArray(t?.payments)&&t.payments.length===2){return t.paid===true&&!t.payments.every(p=>p.paid)?t.payments.map(p=>({...p,paid:true})):t.payments;}return [{paid:!!t?.paid,receipt:t?.receipt||null},{paid:!!t?.paid,receipt:t?.receipt||null}]; }
  function ensurePayments(t) { t.payments=paymentsOf(t); return t.payments; }
  function paymentSides(side) { assert(side === undefined || side === 'both' || side === 0 || side === 1 || side === '0' || side === '1','Choose player 1, player 2, or both players.'); return side === undefined || side === 'both' ? [0,1] : [Number(side)]; }
  function openOnePointRegistrations(s) {
    for (const event of [s,...(s.archives||[])]) for (const c of event.categories||[]) {
      if (c.scoring !== 'onepoint') continue;
      c.capacity = null;
      if (c.status === 'registration') for (const t of event.teams||[]) if (t.categoryId === c.id && t.status === 'waitlist') t.status = 'confirmed';
    }
    return s;
  }
  function windowStart(s, at, duration) {
    const e = s.event;
    const first = new Date(`${e.date}T${e.dailyStart || '00:00'}:00`).getTime();
    at = Math.max(at, first);
    const day = localDay(at), open = new Date(`${day}T${e.dailyStart || '00:00'}:00`).getTime(), close = new Date(`${day}T${e.dailyEnd || '23:59'}:00`).getTime();
    if (duration > close - open) return Infinity;
    at = Math.max(at, open);
    if (at + duration > close) { const next = new Date(open); next.setDate(next.getDate() + 1); at = next.getTime(); }
    return localDay(at) > e.endDate ? Infinity : at;
  }
  function addCategory(s, data) {
    const name = text(data.name);
    assert(name, 'Enter a category name.');
    assert(!s.categories.some(c => key(c.name) === key(name)), 'This category already exists.');
    const onePoint=data.format==='onepoint'||data.scoring==='onepoint';
    const capacity = onePoint ? null : Number(data.capacity || 16), groupSize = Number(data.groupSize || 3), advance = Number(data.advance || 1);
    assert(onePoint || (Number.isInteger(capacity) && capacity >= 2 && capacity <= 128), 'Capacity must be 2–128 pairs.');
    assert([3, 4].includes(groupSize) && [1, 2].includes(advance), 'Choose groups of 3 or 4 and 1 or 2 qualifiers.');
    const format = onePoint?'knockout':data.format || 'groups';
    assert(['groups', 'roundrobin', 'knockout'].includes(format), 'Choose a supported tournament format.');
    const scoring = onePoint?'onepoint':data.scoring || 'best3';
    assert(['best3', 'single', 'super', 'onepoint'].includes(scoring), 'Choose a supported scoring format.');
    s.categories.push({ id: id('cat'), name, capacity, groupSize, advance, format, scoring, status: 'registration', groups: [], champion: null, ...(onePoint?{slotMinutes:3,restMinutes:1,consolation:'off',lastChance:false,communityEnabled:false}: {}) });
    log(s, 'Category created', name);
  }
  function register(s, data) {
    const c = category(s, data.categoryId);
    assert(c && c.status === 'registration' && s.event.registrationOpen, 'Registration is closed for this category.');
    assert(s.now <= new Date(`${s.event.deadline}T23:59:59`).getTime(), 'The registration deadline has passed.');
    const players = [text(data.player1), text(data.player2)];
    assert(players.every(p => p.length >= 2), 'Enter the full name of both players.');
    const playerIds = players.map((p, i) => key(data[`rosaId${i + 1}`]) || key(p));
    assert(playerIds[0] !== playerIds[1], 'A pair needs two different players.');
    assert(!s.teams.some(t => t.categoryId === c.id && t.status !== 'withdrawn' && t.playerIds.some(p => playerIds.includes(p))), 'A player is already registered in this category.');
    const from = data.availableFrom ? Number(data.availableFrom) : s.now;
    const until = data.availableUntil ? Number(data.availableUntil) : null;
    assert(Number.isFinite(from) && (!until || Number.isFinite(until) && until > from), 'Availability end must be after the start.');
    const seed = Number(data.seed || 0);
    assert(Number.isSafeInteger(seed) && seed >= 0 && (c.scoring==='onepoint'||seed<=c.capacity), 'Enter a valid seed.');
    assert(!seed || !s.teams.some(t => t.categoryId === c.id && t.status !== 'withdrawn' && t.seed === seed), 'That seed is already assigned.');
    const count = s.teams.filter(t => t.categoryId === c.id && t.status === 'confirmed').length;
    const t = { id: id('team'), categoryId: c.id, players, playerIds, name: players.map(p => p.split(' ').at(-1)).join(' / '),
      contact: text(data.contact, 160), seed, status: c.scoring!=='onepoint'&&count>=c.capacity ? 'waitlist' : 'confirmed', paid: false, payments:[{paid:false,receipt:null},{paid:false,receipt:null}],
      checkedIn: false, availableFrom: from, availableUntil: until, registeredAt: s.now };
    s.teams.push(t);
    log(s, t.status === 'waitlist' ? 'Pair waitlisted' : 'Registration received', `${players.join(' / ')} · ${c.name}`, 'registration');
    return t;
  }
  function makeMatch(s, c, teams, stage, round, groupId = null, sources = []) {
    const m = { id: id('m'), number: s.matches.length + 1, categoryId: c.id, teamIds: teams, stage, round, groupId, sources,
      status: teams.every(Boolean) ? 'queued' : 'pending', courtId: null, score: score(), winner: null, history: [], source: 'manual' };
    s.matches.push(m); return m;
  }
  function roundRobin(s, c, teams, groupId) {
    const rotation = [...teams];
    if (rotation.length % 2) rotation.push(null);
    for (let r = 1; r < rotation.length; r++) {
      for (let i = 0; i < rotation.length / 2; i++) {
        const pair = [rotation[i], rotation[rotation.length - 1 - i]];
        if (pair.every(Boolean)) makeMatch(s, c, pair, 'group', r, groupId);
      }
      rotation.splice(1, 0, rotation.pop());
    }
  }
  const power2 = n => 2 ** Math.ceil(Math.log2(n));
  function seedOrder(size) {
    let order = [1, 2];
    while (order.length < size) order = order.flatMap(n => [n, order.length * 2 + 1 - n]);
    return order;
  }
  function bracket(s, c, qualifiers, stage='knockout') {
    if (qualifiers.length < 2) return;
    const size = power2(qualifiers.length);
    const slots = seedOrder(size).map(n => qualifiers[n - 1] || null);
    let previous = [];
    for (let i = 0; i < size; i += 2) {
      const m = makeMatch(s, c, slots.slice(i, i + 2), stage, 1);
      if (!m.teamIds[1] || !m.teamIds[0]) { m.status = 'finished'; m.winner = m.teamIds.find(Boolean); m.bye = true; m.finishedAt = s.now; }
      previous.push(m);
    }
    let round = 2;
    while (previous.length > 1) {
      const next = [];
      for (let i = 0; i < previous.length; i += 2) next.push(makeMatch(s, c, [null, null], stage, round, null, [previous[i].id, previous[i + 1].id]));
      previous = next; round++;
    }
    resolve(s, c);
  }
  function generate(s, catId) {
    const c = category(s, catId);
    assert(c && c.status === 'registration', 'The draw is already locked.');
    const entrants = s.teams.filter(t => t.categoryId === catId && t.status === 'confirmed')
      .sort((a, b) => (a.seed || 999) - (b.seed || 999) || a.registeredAt - b.registeredAt || a.id.localeCompare(b.id));
    assert(entrants.length >= 2, 'Register at least two confirmed pairs first.');assert(c.scoring!=='onepoint'||c.consolation==='off'||entrants.length>=4,'Consolation needs at least four main-bracket teams.');
    assert(c.format !== 'roundrobin' || entrants.length <= 32, 'A single round robin supports up to 32 pairs. Split larger events into groups.');
    c.status = 'live';
    if (c.format === 'knockout') bracket(s, c, entrants.map(t => t.id));
    else {
      const count = c.format === 'roundrobin' ? 1 : Math.max(1, Math.ceil(entrants.length / c.groupSize));
      c.groups = Array.from({ length: count }, (_, i) => ({ id: `${c.id}-g${i}`, name: `Group ${String.fromCharCode(65 + i)}`, teamIds: [] }));
      entrants.forEach((t, i) => { const row = Math.floor(i / count), col = i % count; c.groups[row % 2 ? count - 1 - col : col].teamIds.push(t.id); });
      c.groups.forEach(g => roundRobin(s, c, g.teamIds, g.id));
      // Interleave groups by round to avoid exhausting one group first.
      const local = s.matches.filter(m => m.categoryId === c.id).sort((a, b) => a.round - b.round);
      s.matches = [...s.matches.filter(m => m.categoryId !== c.id), ...local];
    }
    log(s, 'Draw published', `${c.name} · ${entrants.length} pairs · seeds distributed`, 'draw');
  }
  function standings(s, c, groupId) {
    const g = c.groups.find(g => g.id === groupId);
    if (!g) return [];
    const rows = g.teamIds.map(teamId => ({ teamId, played: 0, won: 0, lost: 0, setsFor: 0, setsAgainst: 0, gamesFor: 0, gamesAgainst: 0 }));
    const results = s.matches.filter(m => m.groupId === groupId && m.status === 'finished');
    for (const m of results) m.teamIds.forEach((t, i) => {
      const row = rows.find(r => r.teamId === t);
      row.played++; row.won += +(m.winner === t); row.lost += +(m.winner !== t);
      m.score.sets.forEach(set => { row.setsFor += +(set[i] > set[1 - i]); row.setsAgainst += +(set[i] < set[1 - i]); row.gamesFor += set[i]; row.gamesAgainst += set[1 - i]; });
    });
    return rows.sort((a, b) => {
      if (a.won !== b.won) return b.won - a.won;
      if (rows.filter(r => r.won === a.won).length === 2) {
        const h2h = results.find(m => m.teamIds.includes(a.teamId) && m.teamIds.includes(b.teamId));
        if (h2h) return h2h.winner === a.teamId ? -1 : 1;
      }
      return (b.setsFor - b.setsAgainst) - (a.setsFor - a.setsAgainst) || (b.gamesFor - b.gamesAgainst) - (a.gamesFor - a.gamesAgainst)
        || (team(s, a.teamId).seed || 999) - (team(s, b.teamId).seed || 999) || a.teamId.localeCompare(b.teamId);
    });
  }
  function resolve(s, c) {
    if(c.scoring==='onepoint')return OP.resolve(s,c);
    const groupMatches = s.matches.filter(m => m.categoryId === c.id && m.stage === 'group');
    const knockouts = s.matches.filter(m => m.categoryId === c.id && m.stage === 'knockout');
    if (groupMatches.length && groupMatches.every(m => m.status === 'finished') && !knockouts.length) {
      const ranked = c.groups.map(g => standings(s, c, g.id));
      if (c.format === 'roundrobin') { c.champion = ranked[0][0].teamId; c.status = 'complete'; log(s, 'Champion confirmed', `${team(s, c.champion).name} · ${c.name}`, 'trophy'); return; }
      const qualifiers = ranked.flatMap(rows => rows.slice(0, c.advance).map(r => r.teamId));
      const remaining = ranked.map(rows => rows[c.advance]).filter(Boolean).sort((a, b) =>
        b.won / (b.played || 1) - a.won / (a.played || 1) || (b.setsFor - b.setsAgainst) / (b.played || 1) - (a.setsFor - a.setsAgainst) / (a.played || 1)
        || (b.gamesFor - b.gamesAgainst) / (b.played || 1) - (a.gamesFor - a.gamesAgainst) / (a.played || 1) || a.teamId.localeCompare(b.teamId));
      const target = power2(Math.max(2, qualifiers.length));
      qualifiers.push(...remaining.slice(0, target - qualifiers.length).map(r => r.teamId));
      // A two-pair single group still needs two finalists.
      if (qualifiers.length === 1 && remaining.length) qualifiers.push(remaining[0].teamId);
      c.qualifiers = qualifiers;
      log(s, 'Knockout draw generated', `${c.name} · ${qualifiers.length} qualified pairs`, 'draw');
      bracket(s, c, qualifiers); return;
    }
    for (const m of knockouts) if (m.status === 'pending' && m.sources.length && m.sources.every(source => match(s, source).status === 'finished')) {
      m.teamIds = m.sources.map(source => match(s, source).winner); m.status = 'queued';
    }
    const final = knockouts.at(-1);
    if (final && final.status === 'finished' && !c.champion) {
      c.champion = final.winner; c.status = 'complete'; log(s, 'Champion confirmed', `${team(s, c.champion).name} · ${c.name}`, 'trophy');
    }
  }
  function playerIds(s, m) { return m.teamIds.flatMap(t => team(s, t)?.playerIds || []); }
  const matchMinutes=(s,m)=>category(s,m.categoryId).scoring==='onepoint'?(category(s,m.categoryId).slotMinutes||3):s.event.matchMinutes;
  const restMinutes=(s,m)=>category(s,m.categoryId).scoring==='onepoint'?(category(s,m.categoryId).restMinutes??1):s.event.restMinutes;
  function earliest(s, m) {
    let at = s.now;
    const ids = playerIds(s, m);
    for (const t of m.teamIds.map(t => team(s, t)).filter(Boolean)) at = Math.max(at, t.availableFrom);
    for (const done of s.matches.filter(x => x.status === 'finished' && !x.bye && playerIds(s, x).some(p => ids.includes(p)))) at = Math.max(at, done.finishedAt + restMinutes(s,m) * MIN);
    return windowStart(s, at, (matchMinutes(s,m) + s.event.warmupMinutes) * MIN);
  }
  function blocked(s, m) {
    if (m.status === 'pending') return 'Waiting for qualifying results';
    if (!m.teamIds.every(t => team(s, t)?.checkedIn)) return 'Waiting for player check-in';
    const ids = playerIds(s, m);
    if (s.matches.some(other => other.id !== m.id && active(other) && playerIds(s, other).some(p => ids.includes(p)))) return 'Player on another court';
    if (m.teamIds.some(t => team(s, t).availableUntil && team(s, t).availableUntil < s.now + matchMinutes(s,m) * MIN)) return 'Outside player availability';
    if (!Number.isFinite(earliest(s, m))) return 'Outside tournament playing hours';
    if (earliest(s, m) > s.now) return `Rest / availability until ${new Date(earliest(s, m)).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`;
    return null;
  }
  function assign(s, m, court) {
    assert(m && m.status === 'queued', 'This match is not ready for assignment.');
    assert(court && court.enabled && court.availableAt <= s.now && !s.matches.some(x => active(x) && x.courtId === court.id), 'That court is unavailable.');
    assert(!blocked(s, m), blocked(s, m));
    m.courtId = court.id; m.status = 'called'; m.calledAt = s.now;
    log(s, 'Players called', `${m.teamIds.map(t => team(s, t).name).join(' vs ')} → ${court.name}`, 'call');
  }
  function schedule(s) {
    if (!s.event.autoAssign) return;
    for (const court of s.courts.filter(c => c.enabled && c.availableAt <= s.now)) {
      if (s.matches.some(m => active(m) && m.courtId === court.id)) continue;
      const next = s.matches.find(m => m.status === 'queued' && !blocked(s, m));
      if (next) assign(s, next, court);
    }
  }
  function remainingMinutes(s, m) {
    const c = category(s, m.categoryId);
    if(c.scoring==='onepoint')return c.slotMinutes||3;
    const full = c.scoring === 'single' ? s.event.matchMinutes * 0.55 : s.event.matchMinutes;
    const progress = Math.min(0.94, m.score.sets.length * (c.scoring === 'single' ? 1 : 0.42) + Math.max(...m.score.games) / 6 * (c.scoring === 'single' ? 0.9 : 0.4));
    return Math.max(3, Math.round(full * (1 - progress)));
  }
  function projection(s) {
    const slots = s.courts.filter(c => c.enabled).map(c => ({ courtId: c.id, at: Math.max(s.now, c.availableAt), before: [] }));
    const players = new Map(); const result = {};
    for (const m of s.matches.filter(active)) {
      const slot = slots.find(c => c.courtId === m.courtId);
      const end = s.now + (remainingMinutes(s, m) + (m.status === 'called' ? s.event.warmupMinutes : 0)) * MIN;
      if (slot) { slot.at = end + s.event.turnoverMinutes * MIN; slot.before.push(m.id); }
      playerIds(s, m).forEach(p => players.set(p, Math.max(players.get(p) || 0, end + restMinutes(s,m) * MIN)));
      result[m.id] = { at: s.now, courtId: m.courtId, before: [], live: true };
    }
    for (const m of s.matches.filter(m => m.status === 'queued')) {
      if (!slots.length || !m.teamIds.every(t => team(s, t)?.checkedIn)) continue;
      const ready = Math.max(earliest(s, m), ...playerIds(s, m).map(p => players.get(p) || 0));
      const slot = [...slots].sort((a, b) => Math.max(a.at, ready) - Math.max(b.at, ready))[0];
      const at = windowStart(s, Math.max(slot.at, ready), (remainingMinutes(s, m) + s.event.warmupMinutes) * MIN);
      if (!Number.isFinite(at)) continue;
      if (m.teamIds.some(t => team(s, t).availableUntil && at + matchMinutes(s,m) * MIN > team(s, t).availableUntil)) continue;
      result[m.id] = { at, courtId: slot.courtId, before: [...slot.before] };
      slot.at = at + (remainingMinutes(s, m) + s.event.warmupMinutes + s.event.turnoverMinutes) * MIN;
      slot.before.push(m.id);
      playerIds(s, m).forEach(p => players.set(p, at + (remainingMinutes(s, m) + s.event.warmupMinutes + restMinutes(s,m)) * MIN));
    }
    return result;
  }
  function validResult(sets, scoring) {
    assert(Array.isArray(sets) && sets.length > 0 && sets.length <= (scoring === 'single' ? 1 : 3), 'Enter a complete match score.');
    const wins = [0, 0], target = scoring === 'single' ? 1 : 2;
    sets.forEach((set, index) => {
      assert(Array.isArray(set) && set.length === 2 && set.every(n => Number.isInteger(n) && n >= 0 && n <= 100), 'Scores must be non-negative whole numbers.');
      assert(Math.max(...wins) < target, 'Extra sets after the match was won.');
      const high = Math.max(...set), low = Math.min(...set);
      const superTB = scoring === 'super' && index === 2;
      assert(superTB ? high >= 10 && high - low >= 2 && (high === 10 || high - low === 2) : (high === 6 && low <= 4) || (high === 7 && [5, 6].includes(low)), 'Use valid set scores (6–0 to 6–4, 7–5, 7–6), or a third-set super tiebreak to 10 by two.');
      wins[set[0] > set[1] ? 0 : 1]++;
    });
    assert(Math.max(...wins) === target, 'The match is not complete yet.');
    return wins[0] > wins[1] ? 0 : 1;
  }
  function finish(s, m, sets, source, walkover, pointWinner) {
    assert(m && ['live', 'called', 'queued'].includes(m.status) && m.teamIds.every(Boolean), 'This match cannot receive a result.');
    const c = category(s, m.categoryId);
    assert(c.scoring!=='onepoint'||walkover!==undefined||[0,1].includes(pointWinner),'One Point matches use a rally winner, not games or sets.');const winnerIndex = walkover === undefined ? c.scoring==='onepoint'?pointWinner:validResult(sets, c.scoring) : Number(walkover);
    assert([0, 1].includes(winnerIndex), 'Choose the winning pair.');
    m.score.sets = clone(sets); m.score.games = [0, 0]; m.score.points = [0, 0]; m.score.tiebreak = false;if(c.scoring==='onepoint'&&walkover===undefined)m.score.points=winnerIndex===0?[1,0]:[0,1];
    m.status = 'finished'; m.winner = m.teamIds[winnerIndex]; m.finishedAt = s.now; m.source = source || 'manual'; m.walkover = walkover !== undefined; m.history = [];
    const court = s.courts.find(c => c.id === m.courtId);
    if (court) court.availableAt = s.now + s.event.turnoverMinutes * MIN;
    log(s, m.walkover ? 'Walkover recorded' : c.scoring==='onepoint'?'One point won':'Result confirmed', `${team(s, m.winner).name} · ${sets.map(x => x.join('–')).join('  ')} · ${c.name}`, 'result');
    resolve(s, c);
  }
  function addPoint(s, m, side) {
    assert(!m||category(s,m.categoryId).scoring!=='onepoint','Use the One Point winner control; conventional scoring is disabled.');
    assert(m && active(m), 'Select a called or live match.');
    assert([0, 1].includes(side), 'Choose a scoring side.');
    assert(m.source !== 'corehd', 'This match is controlled by Core HD.');
    m.history.push(clone({ score: m.score, status: m.status, startedAt: m.startedAt || null })); m.history = m.history.slice(-100);
    m.status = 'live'; m.startedAt ||= s.now;
    const q = m.score, c = category(s, m.categoryId), other = 1 - side;
    const superTB = c.scoring === 'super' && q.sets.length === 2;
    q.points[side]++;
    if (q.tiebreak || superTB) {
      const target = superTB ? 10 : 7;
      if (q.points[side] >= target && q.points[side] - q.points[other] >= 2) {
        if (superTB) q.games = [...q.points]; else q.games[side]++;
        winSet();
      } else if ((q.points[0] + q.points[1]) % 2 === 1) q.serving = 1 - q.serving;
    } else if (q.points[side] >= 4 && q.points[side] - q.points[other] >= 2) {
      q.games[side]++; q.points = [0, 0]; q.serving = 1 - q.serving;
      if (q.games[side] >= 6 && q.games[side] - q.games[other] >= 2) winSet();
      else if (q.games[0] === 6 && q.games[1] === 6) q.tiebreak = true;
    }
    function winSet() {
      q.sets.push([...q.games]); q.games = [0, 0]; q.points = [0, 0]; q.tiebreak = false;
      const wins = q.sets.filter(set => set[side] > set[other]).length;
      if (wins === (c.scoring === 'single' ? 1 : 2)) finish(s, m, q.sets, 'demo-pad');
      else if (c.scoring === 'super' && q.sets.length === 2) q.tiebreak = true;
    }
  }
  function ingest(s, event) {
    assert(event && typeof event.eventId === 'string' && event.eventId.length <= 150, 'A unique eventId is required.');
    if (s.seenEvents.includes(event.eventId)) return;
    const m = match(s, event.matchId);assert(!m||category(s,m.categoryId).scoring!=='onepoint','One Point hardware must use the bound rally event endpoint.');
    assert(m && active(m) && m.courtId === event.courtId, 'Score event does not match an active court assignment.');
    assert(Number.isInteger(event.sequence) && event.sequence > (m.sequence ?? -1), 'Out-of-order score event.');
    if (event.source === 'corehd') {
      assert(typeof event.sessionId === 'string' && event.sessionId.length > 0 && event.sessionId.length <= 100, 'Core HD requires a scoring session ID.');
      assert(!m.sessionId || m.sessionId === event.sessionId, 'Core HD scoring session changed. Review the court before accepting more scores.');
      m.sessionId = event.sessionId;
    }
    assert(event.type === 'match.finished' || event.type === 'score.updated', 'Unsupported score event.');
    if (event.type === 'match.finished') finish(s, m, event.sets, event.source === 'demo' ? 'demo' : 'corehd');
    else {
      const q = event.score;
      assert(q && Array.isArray(q.sets) && q.sets.length <= 2 && [q.games, q.points].every(a => Array.isArray(a) && a.length === 2 && a.every(n => Number.isInteger(n) && n >= 0 && n <= 100)), 'Invalid score snapshot.');
      assert(q.sets.every(a => Array.isArray(a) && a.length === 2 && a.every(n => Number.isInteger(n) && n >= 0 && n <= 100)), 'Invalid completed sets.');
      const c = category(s, m.categoryId), wins = [0, 0];
      q.sets.forEach(set => wins[validResult([set], 'single')]++);
      assert(Math.max(...wins) < (c.scoring === 'single' ? 1 : 2), 'A completed match must use match.finished.');
      assert(q.games.every(n => n <= 6) && !(Math.max(...q.games) >= 6 && Math.abs(q.games[0] - q.games[1]) >= 2), 'Completed games must move into the set history.');
      const superTB = c.scoring === 'super' && q.sets.length === 2;
      assert(!!q.tiebreak === (superTB || q.games.every(n => n === 6)), 'Tiebreak mode does not match the game score.');
      const pointTarget = q.tiebreak ? (superTB ? 10 : 7) : 4;
      assert(!(Math.max(...q.points) >= pointTarget && Math.abs(q.points[0] - q.points[1]) >= 2), 'Completed points must move into the game score.');
      m.score = { sets: clone(q.sets), games: [...q.games], points: [...q.points], tiebreak: !!q.tiebreak, serving: q.serving === 1 ? 1 : 0 };
      m.status = 'live'; m.startedAt ||= s.now; m.source = event.source === 'demo' ? 'demo' : 'corehd';
    }
    m.sequence = event.sequence; m.lastSignalAt = s.now;
    s.seenEvents.push(event.eventId); s.seenEvents = s.seenEvents.slice(-2000);
  }
  function demo(now = Date.now()) {
    const s = blank({ name: 'Rosa Autumn Open', venue: 'Rosa Padel Club · Berlin', now, demo: true });
    s.event.sponsor = 'ROSA × THE PADEL CLUB';
    addCategory(s, { name: 'Open A · Men', capacity: 16, groupSize: 3, advance: 1 });
    addCategory(s, { name: 'Open B · Mixed', capacity: 12, groupSize: 4, advance: 2 });
    addCategory(s, { name: 'Club C · Women', capacity: 8, groupSize: 3, advance: 1, scoring: 'single' });
    const names = ['Pablo Navarro','Carlos Sánchez','Javier López','David Torres','Sergio Fernández','Marco Ruiz','Tomás Jiménez','Raúl Herrera','Felipe Ortiz','Diego Ramos','Luis Delgado','Pedro Vargas','Andrés Guerrero','Miguel Cortés','Antonio Iglesias','Ricardo Peña','Nico Martín','Hugo Vidal','Lucas Silva','Mateo Costa','Leo Moreno','Alex Cruz','Bruno Santos','Enzo Molina','Lucía Vega','Pablo Campos','Ana Romero','Carlos Díaz','Elena Castro','Javier León','Clara García','David Álvarez','Sofía Muñoz','Sergio Flores','Nora Medina','Tomás Aguilar','Alba Gómez','Marco Suárez','Marta Gil','Leo Ramos','Valentina Cruz','Rosa Pérez','Daniela Flores','Isabel Aguilar'];
    for (let i = 0; i < 22; i++) {
      const c = s.categories[i < 12 ? 0 : i < 20 ? 1 : 2];
      const t = register(s, { categoryId: c.id, player1: names[i * 2], player2: names[i * 2 + 1], seed: i < 4 ? i + 1 : 0 });
      t.checkedIn = i < 20; t.paid = i !== 21; t.payments.forEach(p=>p.paid=t.paid);
    }
    generate(s, s.categories[0].id); generate(s, s.categories[1].id); schedule(s);
    s.matches.filter(active).forEach((m, i) => {
      if (i < 4) { m.status = 'live'; m.startedAt = now - (20 + i * 8) * MIN; m.source = 'demo'; m.score.sets = i < 2 ? [[6, 4]] : []; m.score.games = [[5, 3], [3, 4], [2, 2], [4, 3]][i]; m.score.points = [3, 1]; }
    });
    log(s, 'Demo ready', 'Sample players and simulated court signals. Advance a result to see the tournament react.', 'system');
    return s;
  }
  function snapshot(s) { const copy = clone(s); delete copy.archives; return copy; }
  function apply(original, action) {
    assert(action && typeof action.type === 'string', 'An action type is required.');
    let s = openOnePointRegistrations(clone(original)); const d = action.data || {};
    if (!s.demo) s.now = Date.now();
    switch (action.type) {
      case 'onePointToss': OP.toss(s,d);break;
      case 'onePointFlip': OP.toss(s,d,true);break;
      case 'onePointResult': OP.result(s,d);break;
      case 'onePointPlayerSubmit':OP.playerSubmit(s,d);break;
      case 'onePointPlayerConfirm':OP.playerConfirm(s,d);break;
      case 'onePointIncident': OP.incident(s,d);break;
      case 'onePointBind': OP.bind(s,d);break;
      case 'onePointEvent': OP.ingest(s,d);break;
      case 'onePointMedia': OP.media(s,d);break;
      case 'onePointConfig': OP.configure(s,d);break;
      case 'onePointCommunity': OP.qualification(s,d);break;
      case 'onePointConsolation': {const c=category(s,d.categoryId);assert(c?.champion,'Finish the main bracket before selecting manual consolation entrants.');OP.publishConsolation(s,c,d.teamIds);break;}
      case 'bulkRegister': {assert(Array.isArray(d.rows)&&d.rows.length,'Import at least one pair.');for(const row of d.rows)register(s,{categoryId:d.categoryId,player1:row[0],player2:row[1]});break;}
      case 'onePointTiming': {const c=category(s,d.id);assert(c?.scoring==='onepoint','Choose a One Point category.');for(const key of ['slotMinutes','restMinutes']){const value=Number(d[key]);assert(Number.isFinite(value)&&value>=(key==='slotMinutes'?0.25:0)&&value<=30,'Use valid One Point timing from 0–30 minutes.');c[key]=value;}break;}

      case 'register': register(s, d); break;
      case 'category': addCategory(s, d); break;
      case 'categoryCapacity': {
        const c = category(s,d.id), capacity = Number(d.capacity);
        assert(c && c.status === 'registration' && c.scoring !== 'onepoint', 'Only standard categories have a registration limit before publishing.');
        assert(Number.isInteger(capacity) && capacity >= 2 && capacity <= 128, 'Choose a valid team limit from 2–128.');
        const confirmed = s.teams.filter(t=>t.categoryId===c.id && t.status==='confirmed').length;
        assert(capacity >= confirmed, 'The limit cannot be below the number of confirmed pairs. Withdraw entries first.');
        c.capacity = capacity;
        const promoted = s.teams.filter(t=>t.categoryId===c.id && t.status==='waitlist').slice(0,capacity-confirmed);
        promoted.forEach(t=>t.status='confirmed');
        log(s,'Team limit updated',`${c.name} · ${capacity} places · ${promoted.length} waitlisted pairs promoted`,'registration');
        break;
      }
      case 'checkin': { const t = team(s, d.id); assert(t && t.status === 'confirmed', 'Only confirmed pairs can check in.'); assert(!s.matches.some(m => active(m) && m.teamIds.includes(t.id)) || !t.checkedIn, 'A called or playing pair cannot check out.'); t.checkedIn = !t.checkedIn; log(s, 'Check-in updated', `${t.name} · ${t.checkedIn ? 'ready to play' : 'not arrived'}`, 'registration'); break; }
      case 'payment': { const t = team(s, d.id); assert(t, 'Pair not found.'); const sides=paymentSides(d.side);const payments=ensurePayments(t);const paid=d.paid===undefined?!sides.every(side=>payments[side].paid):d.paid===true;for(const side of sides)payments[side].paid=paid;t.paid=payments.every(p=>p.paid);log(s,'Payment record updated',`${t.name} · ${payments.filter(p=>p.paid).length}/2 players paid (manual record)`);break; }
      case 'paymentReceipt': { const t = team(s, d.id); assert(t && /^[0-9a-f-]{36}$/.test(d.receiptId || ''), 'Choose a registered pair and a valid receipt.'); const payments=ensurePayments(t);for(const side of paymentSides(d.side)){payments[side].receipt={id:d.receiptId,uploadedAt:s.now};payments[side].paid=d.confirmPaid===true;}t.paid=payments.every(p=>p.paid);log(s,'Payment receipt attached',`${t.name} · ${payments.filter(p=>p.paid).length}/2 players paid`,'registration');break; }
      case 'withdraw': { const t = team(s, d.id); assert(t && t.status !== 'withdrawn' && category(s, t.categoryId).status === 'registration', 'Entry already withdrawn or draw locked. Use a match walkover after publication.'); const occupied = t.status === 'confirmed'; t.status = 'withdrawn'; t.checkedIn = false; const next = s.teams.find(x => x.categoryId === t.categoryId && x.status === 'waitlist'); if (occupied && next) next.status = 'confirmed'; log(s, 'Registration withdrawn', t.name); break; }
      case 'generate': generate(s, d.id); break;
      case 'assign': assign(s, match(s, d.matchId), s.courts.find(c => c.id === d.courtId)); break;
      case 'start': { const m = match(s, d.id); assert(m && m.status === 'called'&&!m.hold, 'Match has not been called or is on hold.'); m.status = 'live'; m.startedAt = s.now; break; }
      case 'point': addPoint(s, match(s, d.id), Number(d.side)); break;
      case 'undo': { const m = match(s, d.id); assert(m && active(m) && m.source !== 'corehd' && m.history.length, 'No local point to undo. Confirmed results are locked.'); Object.assign(m, m.history.pop()); break; }
      case 'result': {const m=match(s,d.id);if(m&&category(s,m.categoryId).scoring==='onepoint'&&d.walkover!==undefined){assert(text(d.reason).length>=3,'Record a walkover reason.');m.walkoverReason=text(d.reason,500);}finish(s,m,d.sets||[],'manual',d.walkover);break;}
      case 'event': ingest(s, d); break;
      case 'court': { const c = s.courts.find(c => c.id === d.id); assert(c && !s.matches.some(m => active(m) && m.courtId === c.id), 'Finish the current match before closing this court.'); c.enabled = !c.enabled; log(s, 'Court availability changed', `${c.name} · ${c.enabled ? 'open' : 'closed'}`); break; }
      case 'automation': s.event.autoAssign = !s.event.autoAssign; log(s, 'Court automation', s.event.autoAssign ? 'Enabled' : 'Paused'); break;
      case 'registration': s.event.registrationOpen = !s.event.registrationOpen; break;
      case 'settings': {
        const e = s.event;
        for(const f of ['playerAccounts','playerResults','visionEnabled'])if(d[f]!==undefined)e[f]=d[f]===true||d[f]==='true';assert(!e.playerResults||e.playerAccounts,'Player results require linked player accounts.');if(d.registrationMode!==undefined){assert(['organizer','open'].includes(d.registrationMode),'Choose organizer or open registration.');e.registrationMode=d.registrationMode;}if(d.paymentTracking!==undefined){assert(['individual','pair'].includes(d.paymentTracking),'Choose individual or pair payment tracking.');e.paymentTracking=d.paymentTracking;}for(const f of ['currency','prizeCurrency'])if(d[f]!==undefined){assert(['EUR','CHF','USD','GBP'].includes(d[f]),'Choose a supported currency.');e[f]=d[f];}if(d.prizeMoney!==undefined){assert(Number.isFinite(Number(d.prizeMoney))&&Number(d.prizeMoney)>=0,'Enter a valid prize fund.');e.prizeMoney=Number(d.prizeMoney);}
        for (const field of ['name', 'venue', 'sponsor']) if (d[field] !== undefined) { assert(text(d[field]), `Enter ${field}.`); e[field] = text(d[field]); }
        for (const field of ['date', 'endDate', 'deadline']) if (d[field]) { assert(/^\d{4}-\d{2}-\d{2}$/.test(d[field]) && Number.isFinite(Date.parse(d[field])), 'Use valid dates.'); e[field] = d[field]; }
        assert(e.endDate >= e.date, 'End date must be on or after the start date.');
        for (const field of ['dailyStart', 'dailyEnd']) if (d[field]) { assert(/^([01]\d|2[0-3]):[0-5]\d$/.test(d[field]), 'Use valid daily playing hours.'); e[field] = d[field]; }
        assert((e.dailyEnd || '23:59') > (e.dailyStart || '00:00'), 'Daily closing time must be after opening time.');
        for (const field of ['restMinutes', 'warmupMinutes', 'turnoverMinutes', 'matchMinutes', 'fee']) if (d[field] !== undefined) { const n = Number(d[field]); assert(Number.isFinite(n) && n >= (field === 'matchMinutes' ? 0.25 : 0) && n <= (field === 'fee' ? 10000 : 180), `Invalid ${field}.`); e[field] = n; }
        if (d.courtCount !== undefined) {
          const count = Number(d.courtCount); assert(Number.isInteger(count) && count >= 1 && count <= 32, 'Choose 1–32 courts.');
          assert(!s.matches.some(m => active(m) && s.courts.slice(count).some(c => c.id === m.courtId)), 'A court you are removing has an active match.');
          if (count < s.courts.length) { assert(!s.matches.some(m => m.courtId && s.courts.slice(count).some(c => c.id === m.courtId)), 'Courts with match history cannot be removed. Close those courts instead.'); s.courts = s.courts.slice(0, count); }
          while (s.courts.length < count) { const i = s.courts.length + 1; s.courts.push({ id: `c${i}`, name: `Court ${i}`, enabled: true, availableAt: s.now }); }
        }
        log(s, 'Tournament settings saved', e.name); break;
      }
      case 'create': { const archives = [...s.archives, snapshot(s)]; s = d.mode==='onepoint'?onePointPreset({name:d.name,venue:d.venue}):blank({ name: d.name, venue: d.venue }); s.archives = archives; log(s, 'Tournament created', 'Add categories and register your first pairs.'); break; }
      case 'switch': { const target = s.archives.find(a => a.event.id === d.id); assert(target, 'Tournament not found.'); const archives = [...s.archives.filter(a => a.event.id !== d.id), snapshot(s)]; s = clone(target); s.archives = archives; break; }
      case 'onePointDemo': {const archives=[...s.archives,snapshot(s)];s=onePointPreset({demo:true,capacity:d.capacity});s.archives=archives;break;}
      case 'resetDemo': { const archives = [...s.archives, snapshot(s)]; s = demo(); s.archives = archives; break; }
      case 'demoStep': {
        assert(s.demo, 'Simulation is only available in the demo tournament.');
        s.now += (s.categories.every(c=>c.scoring==='onepoint')?1:12) * MIN; schedule(s);
        let m = s.matches.find(active);
        if (!m && s.matches.some(m => m.status === 'queued')) { s.now += 60 * MIN; schedule(s); m = s.matches.find(active); }
        if(m&&category(s,m.categoryId).scoring==='onepoint'){if(!m.toss||m.toss.servingSide===null)OP.toss(s,{id:m.id,winnerSide:m.number%2,servingSide:m.number%2});if(m.hold)break;OP.result(s,{id:m.id,side:m.number%2},'demo');break;}
        if (m) { const winner = m.number % 3 === 0 ? 1 : 0; const sets = category(s, m.categoryId).scoring === 'single' ? [[6, 3]] : [[6, 4], [6, 3]]; ingest(s, { eventId: id('demo'), sequence: (m.sequence ?? -1) + 1, matchId: m.id, courtId: m.courtId, source: 'demo', type: 'match.finished', sets: winner ? sets.map(x => x.toReversed ? x.toReversed() : [...x].reverse()) : sets }); }
        else log(s, 'No playable matches', 'Check registration, draw publication, check-in, and court availability.');
        break;
      }
      case 'tick': break;
      default: throw new Error('Unknown action.');
    }
    openOnePointRegistrations(s); schedule(s); s.revision = original.revision + 1; return s;
  }
  function pointLabel(q, side) {
    if (q.tiebreak) return q.points[side];
    if (q.points[0] >= 3 && q.points[1] >= 3) return q.points[side] > q.points[1 - side] ? 'AD' : '40';
    return ['0', '15', '30', '40'][Math.min(3, q.points[side])];
  }
  function roundName(s, m) {
    if(m.stage==='last-chance')return 'Last Chance';
    if (m.stage === 'group') return `${category(s, m.categoryId).groups.find(g => g.id === m.groupId)?.name || 'League'} · R${m.round}`;
    const max = Math.max(...s.matches.filter(x => x.categoryId === m.categoryId && x.stage === m.stage).map(x => x.round));
    return (m.stage==='consolation'?'Consolation · ':'')+(['Final', 'Semifinal', 'Quarterfinal', 'Round of 16', 'Round of 32', 'Round of 64', 'Round of 128', 'Round of 256', 'Round of 512'][max - m.round] || `Round ${m.round}`);
  }
  function onePointPreset(options={}){
    const s=blank({name:options.name||'ROSA One Point Challenge',venue:options.venue||'Your club',demo:!!options.demo});
    Object.assign(s.event,{mode:'onepoint',fee:30,currency:'CHF',registrationMode:'organizer',prizeMoney:10000,prizeCurrency:'EUR',restMinutes:1,warmupMinutes:0,turnoverMinutes:0.5,matchMinutes:3});
    const demoTeams=Number(options.capacity??256);
    if(options.demo)assert(Number.isInteger(demoTeams)&&demoTeams>=2&&demoTeams<=512,'Choose any whole number of demo teams from 2 to 512.');
    s.courts=s.courts.slice(0,4);addCategory(s,{name:'One Point Open',format:'onepoint'});
    if(options.demo){for(let i=1;i<=demoTeams;i++){const t=register(s,{categoryId:s.categories[0].id,player1:`Team ${String(i).padStart(3,'0')} · Player A`,player2:`Team ${String(i).padStart(3,'0')} · Player B`,seed:i});t.name=`Team ${String(i).padStart(3,'0')}`;t.checkedIn=true;t.paid=true;t.payments.forEach(p=>p.paid=true);}generate(s,s.categories[0].id);schedule(s);}
    log(s,'One Point Challenge ready','One rally. One serve. Record the coin toss, then the rally winner.','system');return s;
  }
  const OP=(typeof module==='object'&&module.exports?require('./one-point.js'):globalThis.RosaOnePoint)({id,assert,team,match,category,active,log,bracket,finish,text,clone,makeMatch});
  return { onePointPreset, onePointEligible:OP.eligible, paymentsOf, openOnePointRegistrations, restMinutes, matchMinutes, blank, demo, apply, team, category, match, active, standings, projection, blocked, remainingMinutes, pointLabel, roundName, validResult, clone, MIN };
});
