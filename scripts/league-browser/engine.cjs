'use strict';
const randomUUID = () => globalThis.crypto.randomUUID();
const id = prefix => `${prefix}_${randomUUID()}`;
const ensure = (ok, message) => { if (!ok) throw new Error(message); };
const clone = value => structuredClone(value);
const clean = (value, max = 100) => String(value ?? '').trim().slice(0, max);
const num = (v, min, max, label) => { const n = Number(v); ensure(Number.isInteger(n) && n >= min && n <= max, `${label}: enter a whole number between ${min} and ${max}.`); return n; };
const defaults = {
  format: 'individual', rounds: 8, scheduling: 'sessions', timezone: 'Europe/Berlin',
  startDate: new Date().toISOString().slice(0, 10), intervalDays: 7, deadlineDays: 6,
  groupMinutes: 90, matchMinutes: 25, restMinutes: 5, courts: ['Court 1', 'Court 2', 'Court 3', 'Court 4'],
  sessions: [{ label: 'Tuesday evening', day: 2, start: '18:00', duration: 180, groups: 'all', courts: ['Court 1', 'Court 2', 'Court 3', 'Court 4'] }],
  absencePenalty: 'lowestMinus', penaltyPoints: 2, announcedExempt: false,
  substituteCredit: 'original', absentMovement: 'bottom', promotion: true
};
function rules(input = {}) {
  const r = { ...clone(defaults), ...input };
  for (const [key, allowed] of Object.entries({ format: ['individual', 'pairs'], scheduling: ['sessions', 'flexible'], absencePenalty: ['lowestMinus', 'fixed', 'none'], substituteCredit: ['original', 'none'], absentMovement: ['bottom', 'points'] })) ensure(allowed.includes(r[key]), `Invalid ${key}.`);
  for (const [key, lo, hi] of [['rounds',1,52],['intervalDays',1,60],['deadlineDays',1,59],['groupMinutes',30,360],['matchMinutes',5,180],['restMinutes',0,60],['penaltyPoints',0,100]]) r[key] = num(r[key],lo,hi,key);
  ensure(r.deadlineDays < r.intervalDays, 'The deadline must fall before the next matchday starts.');
  ensure(/^\d{4}-\d{2}-\d{2}$/.test(r.startDate) && new Date(`${r.startDate}T12:00:00Z`).toISOString().slice(0,10) === r.startDate, 'Choose a valid start date.');
  try { new Intl.DateTimeFormat('en', { timeZone: r.timezone }).format(); } catch { throw new Error('Choose a valid IANA time zone.'); }
  r.courts = [...new Set((r.courts || []).map(c => clean(c,40)).filter(Boolean))];
  ensure(r.courts.length > 0 && r.courts.length <= 40, 'Add between 1 and 40 physical courts.');
  ensure(Array.isArray(r.sessions) && r.sessions.length <= 14, 'Use up to 14 session windows.');
  r.sessions = r.sessions.map(s => {
    ensure(/^([01]\d|2[0-3]):[0-5]\d$/.test(s.start), 'Use HH:MM for session start.');
    ensure(['all','odd','even'].includes(s.groups), 'Choose all, odd or even groups for each session.');
    const courts = [...new Set(s.courts || [])];
    ensure(courts.length && courts.every(c => r.courts.includes(c)), 'Session courts must belong to the league court pool.');
    return { label: clean(s.label) || 'League session', day: num(s.day,0,6,'Weekday'), start:s.start, duration:num(s.duration,30,720,'Session minutes'), groups:s.groups, courts };
  });
  ensure(r.scheduling !== 'sessions' || r.sessions.length, 'Add at least one session window.');
  ensure(r.groupMinutes>2*r.restMinutes,'Group duration must exceed the combined rest periods.');
  r.announcedExempt = !!r.announcedExempt; r.promotion = !!r.promotion;
  return r;
}
function createLeague(ownerId, data) {
  const name = clean(data.name); ensure(name.length >= 3, 'League name needs at least 3 characters.');
  return { id:id('league'), ownerId, name, club:clean(data.club), rules:rules(data.rules), demo:!!data.demo, status:'registration', entrants:[], requests:[], rounds:[], audit:[], revision:0 };
}
function addEntrant(l, data) {
  ensure(l.status === 'registration', 'Add mid-season entries through the next-round roster.');
  ensure(l.entrants.length < 160, 'This pilot supports up to 160 entries per league.');
  const names = (data.names || []).map(n => clean(n));
  ensure(names.length === (l.rules.format === 'pairs' ? 2 : 1) && names.every(n => n.length >= 2), 'Enter the player names required by this format.');
  const e = { id:id('entry'), name:names.join(' / '), players:names.map(name => ({id:id('player'),name})), seed:l.entrants.length+1, active:true, rating:Number(data.rating)||0 };
  l.entrants.push(e); return e;
}
function addDays(date, days) { const d=new Date(`${date}T12:00:00Z`); d.setUTCDate(d.getUTCDate()+days); return d.toISOString().slice(0,10); }
function zoned(date, time, zone) {
  const target = Date.parse(`${date}T${time}:00Z`); let at=target;
  const format=new Intl.DateTimeFormat('sv-SE',{ timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23' });
  for(let i=0;i<3;i++) { const parts=Object.fromEntries(format.formatToParts(at).map(p=>[p.type,p.value])); const represented=Date.parse(`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}Z`); at+=target-represented; }
  const actual=format.format(at).slice(0,16).replace(' ','T');
  ensure(actual === `${date}T${time}`, 'That local time does not exist due to a daylight-saving change. Choose another time.');
  return new Date(at).toISOString();
}
const current = l => l.rounds.at(-1);
const entrant = (l,eid) => l.entrants.find(e=>e.id===eid);
const participants = m => m.sides.flat();
function ranking(l, through=Infinity) {
  let rows=l.entrants.map(e=>({id:e.id,name:e.name,total:0,rank:e.seed,group:Math.ceil(e.seed/4),history:[],up:0,down:0,played:0,wins:0,absences:0,attended:0,sweeps:0}));
  for(const r of l.rounds.filter(r=>r.number<=through)) {
    for(const g of r.groups) for(const eid of g.entrants) { const row=rows.find(e=>e.id===eid); if(row) row.group=g.level; }
    if(r.status!=='complete') continue;
    for(const row of rows) { const s=r.summary[row.id]; if(!s)continue; row.total+=s.points; row.history.push(s.points); row.played+=s.played; row.wins+=s.wins; row.absences+=s.absent?1:0; row.attended+=s.attended?1:0; row.sweeps+=s.played===3&&s.wins===3?1:0; row.up+=s.movement<0?-s.movement:0; row.down+=s.movement>0?s.movement:0; }
    rows.sort((a,b)=>b.total-a.total||a.rank-b.rank); rows.forEach((e,i)=>e.rank=i+1);
  }
  return rows.sort((a,b)=>a.rank-b.rank);
}
function generateRound(l, groups) {
  const savedRules=l.rules;if(l.nextRules){l.rules=l.nextRules;delete l.nextRules;}
  const number=l.rounds.length+1, r={id:id('round'),number,status:'active',startDate:addDays(l.rules.startDate,(number-1)*l.rules.intervalDays),rules:clone(l.rules),groups:[],matches:[],attendance:{},summary:null};
  r.deadline=zoned(addDays(r.startDate,l.rules.deadlineDays),'23:59',l.rules.timezone);
  r.priorRanks=Object.fromEntries(ranking(l).map(e=>[e.id,e.rank]));
  groups.forEach((entries,i)=>{
    const g={id:id('group'),level:i+1,entrants:[...entries]};r.groups.push(g);
    entries.forEach(eid=>entrant(l,eid).players.forEach(p=>r.attendance[p.id]={status:'expected',substitute:null,announced:false}));
    const specs=l.rules.format==='individual' ? [ [[0,3],[1,2]],[[0,2],[1,3]],[[0,1],[2,3]] ] : [ [[0],[1]],[[2],[3]],[[0],[2]],[[1],[3]],[[0],[3]],[[1],[2]] ];
    specs.forEach((sideIndices,k)=>r.matches.push({id:id('match'),groupId:g.id,stage:l.rules.format==='pairs'?Math.floor(k/2)+1:k+1,ordinal:k+1,entrySides:sideIndices.map(side=>side.map(n=>entries[n])),sides:sideIndices.map(side=>side.flatMap(n=>entrant(l,entries[n]).players.map(p=>p.id))),status:'scheduled',score:null,submission:null,scheduledAt:null,court:null,proposal:null,binding:null,events:[],duration:l.rules.matchMinutes}));
  });
  l.rounds.push(r); schedule(l,r);l.rules=savedRules; return r;
}
function start(l) { ensure(l.status==='registration','This season has already started.');const sorted=l.entrants.filter(e=>e.active!==false).sort((a,b)=>a.seed-b.seed);ensure(sorted.length>=4&&sorted.length%4===0,'Add active entries in complete groups of four before starting.');l.status='active';return generateRound(l,Array.from({length:sorted.length/4},(_,i)=>sorted.slice(i*4,i*4+4).map(e=>e.id))); }
function schedule(l,r) {
  if(r.rules.scheduling==='flexible'){r.groups.forEach(g=>g.schedulingIssue=null);r.matches.filter(m=>m.status==='scheduled'&&!m.binding).forEach(m=>m.duration=r.rules.format==='individual'?((r.rules.groupMinutes||90)-2*r.rules.restMinutes)/3:r.rules.matchMinutes);return;}
  const windows=r.rules.sessions.map(s=>{
    const weekday=new Date(`${r.startDate}T12:00:00Z`).getUTCDay();
    const date=addDays(r.startDate,(s.day-weekday+7)%7), at=Date.parse(zoned(date,s.start,r.rules.timezone));
    return {...s,at,end:at+s.duration*60000};
  }).sort((a,b)=>a.at-b.at);
  const booked=r.matches.filter(m=>m.scheduledAt&&(m.status!=='scheduled'||m.binding)).map(m=>({at:Date.parse(m.scheduledAt),end:Date.parse(m.scheduledAt)+m.duration*60000,court:m.court,players:participants(m)}));
  for(const g of r.groups) {
    let assigned=false;
    for(const w of windows.filter(w=>w.groups==='all'||(g.level%2 ? w.groups==='odd':w.groups==='even'))) {
      const trial=[], matches=r.matches.filter(m=>m.groupId===g.id&&m.status==='scheduled'&&!m.binding); let fits=true;
      for(const m of matches) {
        m.duration=r.rules.format==='individual'?((r.rules.groupMinutes||90)-2*r.rules.restMinutes)/3:r.rules.matchMinutes;
        let chosen=null;
        for(const court of w.courts) {
          let at=w.at;
          for(let attempt=0;attempt<1000;attempt++) {
            const conflict=[...booked,...trial].find(b=> (b.court===court||b.players.some(p=>participants(m).includes(p))) && at < b.end+(b.players.some(p=>participants(m).includes(p))?r.rules.restMinutes*60000:0) && at+m.duration*60000 > b.at);
            if(!conflict)break;
            at=conflict.end+(conflict.players.some(p=>participants(m).includes(p))?r.rules.restMinutes*60000:0);
          }
          if(at+m.duration*60000<=w.end && at+m.duration*60000<=Date.parse(r.deadline) && (!chosen||at<chosen.at))chosen={at,end:at+m.duration*60000,court,players:participants(m),m};
        }
        if(!chosen){fits=false;break;} trial.push(chosen);
      }
      if(fits){trial.forEach(b=>{b.m.scheduledAt=new Date(b.at).toISOString();b.m.court=b.court;b.m.session=w.label;});booked.push(...trial);assigned=true;break;}
    }
    g.schedulingIssue=assigned?null:'No session window has enough available court time for this group.';
  }
}
function validScore(score) { ensure(Array.isArray(score)&&score.length===2&&score.every(n=>Number.isInteger(n)&&n>=0&&n<=7),'Enter two whole game scores from 0 to 7.'); const [a,b]=[...score].sort((a,b)=>b-a);ensure((a===6&&b<=4)||(a===7&&(b===5||b===6)),'A complete set must be 6–0 through 6–4, 7–5 or 7–6.'); }
function findMatch(l,mid) { for(const r of l.rounds){const m=r.matches.find(m=>m.id===mid);if(m)return {r,m,g:r.groups.find(g=>g.id===m.groupId)};}throw new Error('Match not found.'); }
function playable(r,m) {ensure(r.status==='active','This round is already closed.');ensure(m.sides.flat().every(p=>r.attendance[p]?.status!=='absent'),'An absent player needs a substitute before this group can play.');}
function submit(l,mid,score,actor,source='manual') {
  const {r,m}=findMatch(l,mid);playable(r,m);ensure(m.status!=='official','An official result cannot be overwritten.');validScore(score);
  if(actor.organizer){official(l,r,m,score,'organizer',{submittedBy:actor.id});return;}
  const side=m.sides.findIndex(side=>side.some(p=>actor.playerIds?.includes(p)));
  ensure(actor.organizer||side>=0,'Only participants or the league organizer can submit.');
  m.submission={id:id('result'),score,by:actor.id,side,source,at:new Date().toISOString()};m.status='pending';
}
function confirm(l,mid,submissionId,actor) {
  const {r,m}=findMatch(l,mid);ensure(r.status==='active'&&m.status==='pending'&&m.submission?.id===submissionId,'This result changed. Refresh and review it.');
  ensure(actor.id!==m.submission.by,'A second person must confirm this result.');
  const sides=m.sides.map((side,i)=>side.some(p=>actor.playerIds?.includes(p))?i:-1).filter(i=>i>=0);
  ensure(sides.length===1 && (m.submission.side===-1||sides[0]!==m.submission.side),'Confirmation must come from an opponent.');
  official(l,r,m,m.submission.score,m.submission.source,{submittedBy:m.submission.by,confirmedBy:actor.id});
}
function dispute(l,mid,reason,actor) {const {r,m}=findMatch(l,mid);ensure(r.status==='active'&&m.status==='pending','Only pending results can be disputed.');ensure(participants(m).some(p=>actor.playerIds?.includes(p)),'Only a match participant can dispute.');ensure(clean(reason).length>=3,'Explain what needs correcting.');m.status='disputed';m.dispute={reason:clean(reason,500),by:actor.id};}
function official(l,r,m,score,source,evidence={}) {
  validScore(score);m.score=[...score];m.status='official';m.source=source;m.evidence=evidence;m.completedAt=new Date().toISOString();m.proposal=null;
  if(!m.walkover)for(const p of participants(m))if(r.attendance[p]?.status==='expected')r.attendance[p].status='present';
  l.audit.unshift({at:m.completedAt,text:`Round ${r.number} · group ${r.groups.find(g=>g.id===m.groupId).level} · ${score.join('–')} official (${source})`,matchId:m.id});
  if(r.matches.every(m=>m.status==='official'))closeRound(l,r);
}
function walkover(l,mid,side,reason,actor){const {r,m}=findMatch(l,mid);ensure(actor.organizer&&r.status==='active'&&m.status!=='official','Only the organizer can resolve an unfinished active fixture.');ensure([0,1].includes(side)&&clean(reason).length>=3,'Choose the winning side and record a reason.');m.walkover=true;official(l,r,m,side===0?[6,0]:[0,6],'organizer-walkover',{reason:clean(reason,500),submittedBy:actor.id});}
function closeRound(l,r) {
  const summary={};
  for(const g of r.groups) {
    for(const eid of g.entrants) {
      const e=entrant(l,eid), relevant=r.matches.filter(m=>m.groupId===g.id && m.entrySides.flat().includes(eid));
      const attendance=e.players.map(p=>r.attendance[p.id]), absent=attendance.some(a=>a.status==='absent'||a.substitute);
      let points=0,wins=0;
      for(const m of relevant){const side=m.entrySides.findIndex(s=>s.includes(eid));points+=m.score[side]-m.score[1-side];if(!m.walkover&&m.score[side]>m.score[1-side])wins++;}
      if(absent&&r.rules.substituteCredit==='none')points=0;
      summary[eid]={points,wins:absent?0:wins,played:absent?0:relevant.filter(m=>!m.walkover).length,absent,attended:!absent&&attendance.every(a=>a.status==='present'),movement:0,group:g.level};
    }
    const presentPoints=g.entrants.filter(eid=>!summary[eid].absent).map(eid=>summary[eid].points);
    const min=presentPoints.length?Math.min(...presentPoints):0;
    for(const eid of g.entrants){const s=summary[eid], ats=entrant(l,eid).players.map(p=>r.attendance[p.id]);const exempt=r.rules.announcedExempt&&ats.filter(a=>a.status==='absent'||a.substitute).every(a=>a.announced);
      s.penalized=s.absent&&!exempt;
      if(s.penalized&&r.rules.absencePenalty!=='none')s.points=r.rules.absencePenalty==='fixed'?-r.rules.penaltyPoints:min-r.rules.penaltyPoints;
    }
  }
  const nextGroups=r.groups.map(g=>[...g.entrants]);
  const sorted=r.groups.map(g=>[...g.entrants].sort((a,b)=> (r.rules.absentMovement==='bottom'?(Number(summary[a].penalized)-Number(summary[b].penalized)):0)||summary[b].points-summary[a].points||r.priorRanks[a]-r.priorRanks[b]));
  if(r.rules.promotion)for(let i=0;i<sorted.length-1;i++){
    const down=sorted[i].at(-1),up=sorted[i+1][0];
    nextGroups[i][nextGroups[i].indexOf(down)]=up;nextGroups[i+1][nextGroups[i+1].indexOf(up)]=down;
    summary[up].movement=-1;summary[down].movement=1;
  }
  r.summary=summary;r.status='complete';r.closedAt=new Date().toISOString();
  l.audit.unshift({at:r.closedAt,text:`Round ${r.number} closed automatically. Standings and movement published.`});
  if(r.number>=l.rules.rounds)l.status='complete';
  else {const rank=Object.fromEntries(ranking(l).map(e=>[e.id,e.rank]));nextGroups.forEach(g=>g.sort((a,b)=>rank[a]-rank[b]));const rosterChanged=l.entrants.some(e=>(e.active!==false)!==r.groups.some(g=>g.entrants.includes(e.id)));const groups=l.nextGroups||(rosterChanged?require('./operations.cjs').activeGroups(l):nextGroups);if(groups){generateRound(l,groups);l.nextGroups=null;}else{l.status='needs-roster';l.audit.unshift({at:new Date().toISOString(),text:'Next round is waiting for complete groups of four. Review the active roster.'});}}
}
function attendance(l,playerId,data) {
  const r=current(l);ensure(r?.status==='active'&&r.attendance[playerId],'Player not in the active round.');
  const owner=l.entrants.find(e=>e.players.some(p=>p.id===playerId));const g=r.groups.find(g=>g.entrants.includes(owner.id));
  ensure(r.matches.filter(m=>m.groupId===g.id).every(m=>m.status==='scheduled'&&!m.binding),'Attendance changes are locked after scoring or court binding starts for the group.');
  ensure(['expected','present','absent'].includes(data.status),'Invalid attendance status.');
  const old=r.attendance[playerId], oldId=old.substitute?.id||playerId;
  const replacement=data.status==='absent'&&clean(data.substitute)?{id:id('guest'),name:clean(data.substitute)}:null;
  for(const m of r.matches.filter(m=>m.groupId===g.id))m.sides=m.sides.map(side=>side.map(p=>p===oldId?(replacement?.id||playerId):p));
  if(old.substitute)delete r.attendance[old.substitute.id];
  r.attendance[playerId]={status:data.status,announced:!!data.announced,substitute:replacement};
  if(replacement)r.attendance[replacement.id]={status:'expected',guest:true};
}
function propose(l,mid,data,actor) {
  const {r,m}=findMatch(l,mid);ensure(r.status==='active'&&m.status==='scheduled'&&!m.binding,'Scheduling is locked once scoring or court binding starts.');
  ensure(actor.organizer||participants(m).some(p=>actor.playerIds?.includes(p)),'Only participants can propose a time.');
  ensure(r.rules.courts.includes(data.court),'Choose a league court.');
  const at=Date.parse(data.at);ensure(Number.isFinite(at)&&at>=Date.parse(zoned(r.startDate,'00:00',r.rules.timezone))&&at+m.duration*60000<=Date.parse(r.deadline),'The match must fit between round start and deadline.');
  const candidate={at:new Date(at).toISOString(),court:data.court,by:actor.id,side:m.sides.findIndex(s=>s.some(p=>actor.playerIds?.includes(p))),id:id('proposal')};
  assertNoConflict(l,r,m,candidate);m.proposal=candidate;
  if(actor.organizer){m.scheduledAt=candidate.at;m.court=candidate.court;m.session='Organizer schedule';m.proposal=null;}
}
function assertNoConflict(l,r,m,candidate) {
  const start=Date.parse(candidate.at),end=start+m.duration*60000;
  for(const other of l.rounds.flatMap(x=>x.matches).filter(x=>x.id!==m.id&&x.scheduledAt)){
    const shared=participants(other).some(p=>participants(m).includes(p));const buffer=shared?r.rules.restMinutes*60000:0;
    if(other.court!==candidate.court&&!shared)continue;
    const at=Date.parse(other.scheduledAt);ensure(end+buffer<=at||start>=at+other.duration*60000+buffer,'That court or a player is already booked, including required rest.');
  }
}
function acceptSchedule(l,mid,pid,actor) {const {r,m}=findMatch(l,mid),p=m.proposal;ensure(p&&p.id===pid,'The proposed time changed.');ensure(p.by!==actor.id,'Another player must accept the proposal.');ensure(m.sides.some((s,i)=>i!==p.side&&s.some(p=>actor.playerIds?.includes(p))),'An opponent must accept the time.');assertNoConflict(l,r,m,p);m.scheduledAt=p.at;m.court=p.court;m.session='Agreed by players';m.proposal=null;}
function bind(l,mid,data) {
  const {r,m,g}=findMatch(l,mid);playable(r,m);ensure(!l.demo,'Use a real league to connect hardware.');ensure(m.status==='scheduled','Bind before score submission.');ensure(!m.binding,'This fixture already has a court session binding.');
  ensure(r.rules.courts.includes(data.court)&&clean(data.sessionId),'Choose a court and provide the ROSA scoring session ID.');
  ensure(m.court===data.court&&m.scheduledAt,'Schedule this fixture on the selected court before binding.');
  ensure(!l.rounds.flatMap(r=>r.matches).some(x=>x.id!==m.id&&x.status!=='official'&&x.binding?.court===data.court),'This court already has an unfinished bound fixture.');
  ensure(!l.rounds.flatMap(r=>r.matches).some(x=>x.binding?.sessionId===data.sessionId&&x.binding?.court===data.court),'This scoring session is already assigned.');
  const fixtures=r.rules.format==='individual'?r.matches.filter(x=>x.groupId===g.id):[m];
  ensure(fixtures.every(x=>x.status==='scheduled'&&!x.binding&&x.court===data.court),'All three individual rotations must be unscored and on the same physical court.');
  const sessionId=clean(data.sessionId);
  const courtId=l.connectedCourts?.find(c=>c.localCourt===data.court)?.courtId||data.court;
  fixtures.forEach(x=>x.binding={court:data.court,courtId,sessionId,setIndex:r.rules.format==='individual'?x.stage-1:0});
  const playerIds=r.rules.format==='individual'?g.entrants.map(eid=>{const p=entrant(l,eid).players[0];return r.attendance[p.id].substitute?.id||p.id;}):m.sides.flat();
  return {leagueId:l.id,format:r.rules.format,courtId,sessionId,players:playerIds.map(p=>({id:p,name:playerName(l,p)})),fixtures:fixtures.map(x=>({matchId:x.id,setIndex:x.binding.setIndex,playerIds:x.sides}))};
}
function rosaEvent(l,event) {
  const {r,m}=findMatch(l,event.matchId);ensure(event.version===1,'Use scoring event version 1.');
  const existing=m.events.find(e=>e.id===event.eventId);if(existing){ensure(existing.payload===JSON.stringify(event),'Event ID was reused with different data.');return;}
  ensure(!l.demo&&r.status==='active'&&m.status!=='official','This fixture cannot receive a new result.');playable(r,m);
  ensure(m.binding&&(m.binding.courtId||m.binding.court)===event.courtId&&m.binding.sessionId===event.sessionId,'Court or session does not match the assigned fixture.');
  ensure(event.setIndex===m.binding.setIndex,'Set index does not match this fixture rotation.');
  ensure(JSON.stringify(event.playerIds)===JSON.stringify(m.sides),'Player identities or side order do not match this fixture.');
  ensure(clean(event.eventId).length>=6,'Provide a unique event ID.');ensure(event.type==='set.completed','This league adapter accepts complete single-set results.');
  validScore(event.score);m.events.push({id:event.eventId,payload:JSON.stringify(event)});official(l,r,m,event.score,'rosa',{eventId:event.eventId,sessionId:event.sessionId});
}
function demoFinish(l,all=false) {ensure(l.demo,'Simulation is only available in demo leagues.');const r=current(l);ensure(r?.status==='active','Start an active round first.');const matches=r.matches.filter(m=>m.status!=='official');for(const m of all?matches:matches.slice(0,1)){const a=(r.number+m.ordinal+r.groups.findIndex(g=>g.id===m.groupId))%3;official(l,r,m,a===0?[4,6]:[6,a===1?2:3],'rosa-demo');}}
function insights(l,number) {
  const closed=l.rounds.filter(r=>r.status==='complete'&&(!number||r.number<=number));if(!closed.length)return [];
  const r=closed.at(-1), rows=ranking(l,r.number), facts=[];
  const add=(title,items,detail)=>{if(items.length)facts.push({title,names:items.map(e=>e.name),detail});};
  add('Ever-present',rows.filter(e=>e.attended===closed.length&&e.absences===0),`Attended every one of ${closed.length} completed rounds.`);
  add('Perfect round',rows.filter(e=>r.summary[e.id]?.played===3&&r.summary[e.id]?.wins===3),`Won all 3 ${l.rules.format==='individual'?'sets':'fixtures'} in round ${r.number}.`);
  add('Unbeaten',rows.filter(e=>e.played>0&&e.played===e.wins),`Won every played set through round ${r.number}.`);
  const maxWins=Math.max(...rows.map(e=>e.wins)),maxUp=Math.max(...rows.map(e=>e.up)),maxPlayed=Math.max(...rows.map(e=>e.played));
  if(maxWins>0)add('Most wins',rows.filter(e=>e.wins===maxWins),`${maxWins} set wins through round ${r.number}.`);
  if(maxUp>0)add('Biggest climbers',rows.filter(e=>e.up===maxUp),`${maxUp} promotions earned (not net group change).`);
  if(maxPlayed>0)add('Most played',rows.filter(e=>e.played===maxPlayed),`${maxPlayed} sets played; substitute appearances excluded.`);
  const roundMax=Math.max(...rows.map(e=>r.summary[e.id]?.points??-Infinity));
  add('Round points leaders',rows.filter(e=>r.summary[e.id]?.points===roundMax),`${roundMax} game-difference points in round ${r.number}.`);
  add('Bounce-back round',rows.filter(e=>e.history.length>=2&&e.history.at(-2)<0&&e.history.at(-1)>0),`Turned a negative previous round into positive points in round ${r.number}.`);
  add('Three positive rounds',rows.filter(e=>e.history.length>=3&&e.history.slice(-3).every(n=>n>0)),`Positive game difference in the last three completed rounds.`);
  return facts;
}
function playerName(l,pid) {for(const e of l.entrants){const p=e.players.find(p=>p.id===pid);if(p)return p.name;}for(const r of l.rounds)for(const a of Object.values(r.attendance)){if(a.substitute?.id===pid)return `${a.substitute.name} (sub)`;}return 'Player';}
module.exports={walkover,schedule,generateRound,id,ensure,clone,clean,defaults,rules,createLeague,addEntrant,start,current,ranking,findMatch,participants,submit,confirm,dispute,attendance,propose,acceptSchedule,bind,rosaEvent,demoFinish,insights,playerName,zoned,addDays};
