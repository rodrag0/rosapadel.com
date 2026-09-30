'use strict';
const E = require('./engine.cjs');
const O = require('./operations.cjs');

(() => {
  const nativeFetch = window.fetch.bind(window);
  const storageKey = 'rosa-league-online-v1';
  const user = { id:'showcase-organizer', name:'League organizer', email:'showcase@rosapadel.com', admin:true, playerIds:[] };
  const publicUrl = `${location.origin}/league-tool`;
  const names = ['Alex Moreno','Sofia Ramos','Lucas Vidal','Emma Cruz','Nico Torres','Mia Rojas','Leo Marin','Clara Soto','Pablo Gil','Julia Vega','Diego Ruiz','Elena Costa','Mateo Sol','Ana Luna','Hugo Rey','Lara Cano','Luis Arias','Eva Leon','Ivan Mora','Alba Serra','Bruno Rio','Sara Paz','Raul Pino','Celia Diaz'];

  function newDemo(format='individual') {
    const league = E.createLeague(user.id, { name:format==='pairs'?'Mixed pairs · Club Series':'Club Series · Individual', club:'ROSA Padel Club', demo:true, rules:{format} });
    for (let index=0; index<12; index++) E.addEntrant(league,{ names:format==='pairs'?[names[index*2],names[index*2+1]]:[names[index]], rating:3+(index%4) });
    E.start(league); E.demoFinish(league,true); E.demoFinish(league,true); E.demoFinish(league,false);
    return league;
  }

  let db;
  try { db=JSON.parse(localStorage.getItem(storageKey)); } catch {}
  if (!db?.leagues?.length) db={schema:1,leagues:[newDemo()],accounts:{}};
  const save=()=>localStorage.setItem(storageKey,JSON.stringify(db));
  save();

  function publicLeague(league) {
    const copy=O.projections(E.clone(league)); delete copy.ownerId;
    return {...copy,organizer:true,accounts:league.entrants.flatMap(entry=>entry.players).map(player=>({playerId:player.id,email:db.accounts[player.id]||null})),ranking:E.ranking(league),insights:E.insights(league),roundInsights:Object.fromEntries(league.rounds.filter(round=>round.status==='complete').map(round=>[round.id,E.insights(league,round.number)]))};
  }
  const state=()=>({user,publicUrl,defaults:E.defaults,leagues:db.leagues.map(publicLeague)});
  const response=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json'}});
  const leagueBy=id=>db.leagues.find(league=>league.id===id);

  function mutate(body) {
    if(body.type==='create'||body.type==='demo'){
      const league=body.type==='demo'?newDemo(body.format==='pairs'?'pairs':'individual'):E.createLeague(user.id,body.data);
      db.leagues.push(league); save(); return {leagueId:league.id};
    }
    const league=leagueBy(body.leagueId); E.ensure(league,'League not found.');
    if(body.revision!==undefined&&body.revision!==league.revision) throw new Error('The league changed. Refresh and try again.');
    const actor={...user,organizer:true}, data=body.data||{}; let result={};
    switch(body.type){
      case 'walkover':E.walkover(league,data.matchId,Number(data.side),data.reason,actor);break;
      case 'scheduleGroup':O.scheduleGroup(league,data,actor);break;
      case 'unbind':O.unbind(league,data);break;
      case 'roundSchedule':O.reschedule(league,data);break;
      case 'nextRules':{const config=E.rules({...league.rules,...data.rules});E.ensure(config.format===league.rules.format,'The competition format cannot change for one round.');if(data.startDate)config.startDate=E.addDays(data.startDate,-E.current(league).number*config.intervalDays);league.nextRules=config;O.audit(league,'Configuration override saved for the next round only.');break;}
      case 'rosterChange':O.changeRoster(league,data);break;
      case 'reorder':O.reorder(league,data.ids);break;
      case 'nextGroups':O.setNextGroups(league,data.groups);break;
      case 'currentGroups':O.applyGroups(league,data.groups);break;
      case 'resume':O.resume(league);break;
      case 'ratingSeed':O.reorder(league,[...league.entrants].sort((a,b)=>(b.rating||0)-(a.rating||0)||a.seed-b.seed).map(entry=>entry.id));break;
      case 'rating':{const entry=league.entrants.find(item=>item.id===data.id);E.ensure(entry,'Entry not found.');entry.rating=Number(data.rating);break;}
      case 'accountLink':{if(data.email)db.accounts[data.playerId]=String(data.email);else delete db.accounts[data.playerId];break;}
      case 'correct':O.correct(league,{...data,actorId:user.id});break;
      case 'resetDemo':{E.ensure(league.demo,'Only demo leagues can be restarted.');const replacement=newDemo(league.rules.format);replacement.id=league.id;db.leagues.splice(db.leagues.indexOf(league),1,replacement);save();return {};}
      case 'pairCourt':{league.connectedCourts=league.connectedCourts||[];league.connectedCourts.push({localCourt:data.localCourt,courtId:'showcase-court',name:'ROSA Vision showcase'});O.audit(league,`ROSA showcase monitor assigned to ${data.localCourt}.`);break;}
      case 'vision':O.vision(league,data);break;
      case 'settings':league.rules=E.rules(data.rules);league.name=E.clean(data.name)||league.name;league.club=E.clean(data.club);break;
      case 'add':if(league.status==='registration')E.addEntrant(league,data);else O.changeRoster(league,{...data,kind:'add'});break;
      case 'import':data.rows.forEach(row=>E.addEntrant(league,{names:row}));break;
      case 'remove':league.entrants=league.entrants.filter(entry=>entry.id!==data.id);league.entrants.forEach((entry,index)=>entry.seed=index+1);break;
      case 'seed':{const entry=league.entrants.find(item=>item.id===data.id),ordered=[...league.entrants].sort((a,b)=>a.seed-b.seed).filter(item=>item.id!==data.id);ordered.splice(Number(data.seed)-1,0,entry);ordered.forEach((item,index)=>item.seed=index+1);break;}
      case 'approve':break;
      case 'start':E.start(league);break;
      case 'demoNext':E.demoFinish(league);break;
      case 'demoRound':E.demoFinish(league,true);break;
      case 'submit':E.submit(league,data.matchId,data.score,actor,data.qr?'qr':'manual');break;
      case 'confirm':E.confirm(league,data.matchId,data.submissionId,actor);break;
      case 'dispute':E.dispute(league,data.matchId,data.reason,actor);break;
      case 'attendance':E.attendance(league,data.playerId,data);break;
      case 'propose':E.propose(league,data.matchId,data,actor);break;
      case 'acceptSchedule':E.acceptSchedule(league,data.matchId,data.proposalId,actor);break;
      case 'bind':result={binding:E.bind(league,data.matchId,data)};break;
      case 'invite':result={url:`${publicUrl}/#overview`};break;
      case 'share':result={url:`${publicUrl}/#${data.kind==='join'?'hub':'round/'+(data.roundId||E.current(league)?.id)}`};break;
      case 'revokeShares':break;
      default:throw new Error('Unknown action.');
    }
    league.revision++;save();return result;
  }

  window.fetch=async(input,init={})=>{
    const url=new URL(typeof input==='string'?input:input.url,location.href);
    if(!url.pathname.startsWith('/api/'))return nativeFetch(input,init);
    let body={};try{body=init.body?JSON.parse(init.body):{};}catch{}
    try{
      if(url.pathname==='/api/state')return response(state());
      if(url.pathname==='/api/action'){const result=mutate(body);return response(result);}
      if(url.pathname==='/api/evidence'){const league=leagueBy(url.searchParams.get('league'));return response(O.evidence(league,url.searchParams.get('entry'),Number(url.searchParams.get('through'))||52));}
      if(['/api/login','/api/register','/api/logout'].includes(url.pathname))return response({user});
      if(url.pathname==='/api/claim'||url.pathname==='/api/join')return response({ok:true});
      return response({error:'This online showcase keeps data in this browser. Shared-link and file services activate with the VPS backend.'},501);
    }catch(error){return response({error:error.message||'Request failed.'},400);}
  };
})();
