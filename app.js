/* TampifyAI Learning Hub — app logic */
(function(){
"use strict";

/* ---------- merge Pro lesson bodies into tracks ---------- */
var B = window.LESSON_BODIES || {};
window.TRACKS.forEach(function(tr){ tr.lessons.forEach(function(l){ if(!l.body && B[l.id]) l.body = B[l.id]; }); });

/* ---------- flatten lessons ---------- */
var ALL = [];
window.TRACKS.forEach(function(tr){ tr.lessons.forEach(function(l){ ALL.push({ l:l, tr:tr }); }); });
var TOTAL_LESSONS = ALL.length;

/* ---------- state ---------- */
var KEY = "tampify_hub_v1";
function load(){
  var d = { xp:0, done:[], streak:0, last:null, articles:[], pro:false, read:[], badges:[], ch:{} };
  try{ var raw = localStorage.getItem(KEY); if(raw){ var p = JSON.parse(raw); for(var k in d){ if(p[k]!==undefined) d[k]=p[k]; } } }catch(e){}
  return d;
}
var S = load();
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }

/* ---------- streak ---------- */
function today(){ var d=new Date(); return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); }
function streakTick(){
  var t = today();
  if(S.last === t) return;
  var y = new Date(); y.setDate(y.getDate()-1);
  var yest = y.getFullYear()+"-"+(y.getMonth()+1)+"-"+y.getDate();
  S.streak = (S.last === yest) ? (S.streak||0)+1 : 1;
  S.last = t; save();
}

/* ---------- levels ---------- */
function levelInfo(){
  var lv = window.LEVELS, i, cur = lv[0], next = null;
  for(i=0;i<lv.length;i++){ if(S.xp >= lv[i].at) cur = lv[i]; }
  for(i=0;i<lv.length;i++){ if(lv[i].at > S.xp){ next = lv[i]; break; } }
  return { cur:cur, next:next };
}

/* ---------- stats for badges ---------- */
function stats(){
  var trackDone = {};
  window.TRACKS.forEach(function(tr){
    trackDone[tr.id] = tr.lessons.every(function(l){ return S.done.indexOf(l.id)>-1; });
  });
  var chDone = 0;
  window.CHALLENGES.forEach(function(c){ if(chAll(c)) chDone++; });
  return {
    done: S.done.length, streak: S.streak, level: levelInfo().cur.n,
    articles: S.read.length, trackDone: trackDone, challengesDone: chDone
  };
}
function chAll(c){
  var st = (S.ch = S.ch||{})[c.id]; if(!st) return false;
  return c.tasks.every(function(_,i){ return st[i]; });
}

/* ---------- badges ---------- */
function checkBadges(){
  var st = stats(), gained = [];
  window.BADGES.forEach(function(b){
    if(S.badges.indexOf(b.id)===-1 && b.test(st)){ S.badges.push(b.id); gained.push(b); }
  });
  if(gained.length){ save(); gained.forEach(function(b){ toast(b.icon+"  Badge unlocked: "+b.name); }); }
}

/* ---------- helpers ---------- */
function el(id){ return document.getElementById(id); }
function esc(s){ return String(s).replace(/[&<>]/g,function(c){ return c==="&"?"&amp;":c==="<"?"&lt;":"&gt;"; }); }
function h(html){ return html; }
var toastT;
function toast(msg){
  var t = el("toast"); t.textContent = msg; t.hidden = false;
  t.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(function(){ t.classList.remove("show"); setTimeout(function(){ t.hidden=true; },250); }, 2600);
}

function lessonById(id){
  for(var i=0;i<ALL.length;i++) if(ALL[i].l.id===id) return ALL[i];
  return null;
}
function trackOf(id){ var x=lessonById(id); return x?x.tr:null; }
function isLocked(tr){ return tr.tier==="pro" && !S.pro; }

/* ---------- actions ---------- */
function markLesson(tr, l){
  if(isLocked(tr)){ openPaywall(); return; }
  var i = S.done.indexOf(l.id);
  if(i>-1){ S.done.splice(i,1); S.xp = Math.max(0, S.xp - l.xp); toast("Unmarked &minus;"+l.xp+" XP"); }
  else { S.done.push(l.id); S.xp += l.xp; toast("+"+l.xp+" XP"); }
  save(); checkBadges(); render();
}
function toggleChallengeTask(c, i){
  if(c.tier==="pro" && !S.pro){ openPaywall(); return; }
  S.ch = S.ch||{}; var st = S.ch[c.id] = S.ch[c.id] || new Array(c.tasks.length).fill(false);
  var was = chAll(c);
  st[i] = !st[i];
  if(!was && chAll(c)){ S.xp += c.xp; toast("Challenge complete  +"+c.xp+" XP"); }
  else if(was && !chAll(c)){ S.xp = Math.max(0, S.xp - c.xp); }
  save(); checkBadges(); render();
}
function readArticle(a){
  if(!S.pro && a.tier!=="free"){ openPaywall(); return; }
  openModal(articleHTML(a));
  if(S.read.indexOf(a.id)===-1){ S.read.push(a.id); S.xp += 20; save(); checkBadges(); updateChips(); toast("+20 XP"); }
}
function unlockPro(){
  if(S.pro) return; S.pro = true; S.xp += 100; save(); checkBadges();
  closePaywall(); toast("Pro unlocked  +100 XP"); render();
}
function resetAll(){
  if(!confirm("Reset all progress on this device?")) return;
  S = { xp:0, done:[], streak:0, last:today(), articles:[], pro:false, read:[], badges:[], ch:{} };
  save(); render(); toast("Progress reset");
}

/* ---------- TOPBAR ---------- */
function updateChips(){
  var lv = levelInfo();
  el("topbar").innerHTML =
    '<h1 class="brand"><span class="dot"></span>TampifyAI <small>Learning Hub</small></h1>'+
    '<span class="spacer"></span>'+
    '<span class="chip">🔥 <b>'+S.streak+'</b></span>'+
    '<span class="chip"><span class="em">'+S.xp+'</span> XP</span>'+
    (S.pro ? '<span class="chip pro">★ Pro</span>' : '');
}

/* ---------- TABS ---------- */
var TABS = [
  { id:"home", label:"Home", icon:'<path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z"/>' },
  { id:"courses", label:"Courses", icon:'<path d="M4 5h16v12H4z"/><path d="M4 9h16"/>' },
  { id:"challenges", label:"Quests", icon:'<path d="M8 3h8v4a4 4 0 0 1-8 0z"/><path d="M6 7H4v2a3 3 0 0 0 3 3M18 7h2v2a3 3 0 0 1-3 3M10 15h4v3h-4z"/>' },
  { id:"feed", label:"AI Feed", icon:'<path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h5"/>' },
  { id:"careers", label:"Careers", icon:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>' },
  { id:"profile", label:"Profile", icon:'<path d="M4 20a8 8 0 0 1 16 0"/><circle cx="12" cy="8" r="4"/>' }
];
var route = "home";
function go(r){ route = r; render(); window.scrollTo(0,0); }
function renderTabs(){
  var inner = TABS.map(function(t){
    return '<button class="tab'+(route===t.id?' active':'')+'" data-go="'+t.id+'" aria-current="'+(route===t.id?'page':'false')+'">'+
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+t.icon+'</svg>'+t.label+'</button>';
  }).join("");
  el("tabs").innerHTML = '<div class="inner">'+inner+'</div>';
  Array.prototype.forEach.call(el("tabs").querySelectorAll("[data-go]"), function(b){ b.onclick=function(){ go(b.getAttribute("data-go")); }; });
}

/* ---------- VIEWS ---------- */
function vHome(){
  var lv = levelInfo(), st = stats();
  var pct = lv.next ? Math.round((S.xp-lv.cur.at)/(lv.next.at-lv.cur.at)*100) : 100;
  var weeks = ["S","M","T","W","T","F","S"];
  var jsDow = new Date().getDay();
  var streakBar = weeks.map(function(d,i){
    var on = i <= jsDow && (jsDow-i) < (S.streak||0);
    return '<div style="flex:1;text-align:center"><div style="height:6px;border-radius:99px;background:'+(on?'var(--cyan)':'rgba(148,163,184,.18)')+'"></div><div style="font-size:10px;color:var(--dim);margin-top:5px">'+d+'</div></div>';
  }).join("");
  var nextLesson = null;
  for(var i=0;i<ALL.length;i++){ if(S.done.indexOf(ALL[i].l.id)===-1){ nextLesson = ALL[i]; break; } }
  var continueCard = nextLesson ?
    '<div class="card"><div class="s" style="color:var(--muted);font-size:12px;margin-bottom:4px">CONTINUE LEARNING</div>'+
    '<div class="row" style="border:0;padding:0" data-lesson="'+nextLesson.l.id+'"><div class="grow"><div class="t">'+esc(nextLesson.l.title)+'</div><div class="s">'+esc(nextLesson.tr.title)+' &middot; +'+nextLesson.l.xp+' XP</div></div><div style="color:var(--cyan)">&rsaquo;</div></div></div>' :
    '<div class="card"><b>All caught up!</b><div class="s" style="color:var(--muted)">You have finished every lesson. Legend.</div></div>';
  return h(
    '<h2 class="page-h">Welcome back 👋</h2><p class="page-sub">Small daily steps. Big compounding skill.</p>'+
    '<div class="grid two">'+
      '<div class="card" style="display:flex;gap:14px;align-items:center"><div class="ring" style="--p:'+pct+'"><span>Lv'+lv.cur.n+'</span></div><div><div style="font-family:var(--f-head);font-weight:700">'+lv.cur.name+'</div><div class="s" style="color:var(--muted);font-size:12px">'+(lv.next? (lv.next.at-S.xp)+' XP to '+lv.next.name : 'Max level')+'</div></div></div>'+
      '<div class="card"><div style="font-family:var(--f-head);font-weight:700">🔥 '+S.streak+'-day streak</div><div class="s" style="color:var(--muted);font-size:12px">Come back tomorrow to keep it alive</div></div>'+
    '</div>'+
    '<div class="card" style="margin-top:12px"><div style="display:flex;gap:6px">'+streakBar+'</div></div>'+
    '<div class="section-t">Today</div>'+ continueCard+
    '<div class="section-t">Your stats</div>'+
    '<div class="grid two">'+
      '<div class="card"><div style="font-family:var(--f-head);font-size:24px;font-weight:700">'+st.done+'</div><div class="s" style="color:var(--muted);font-size:12px">lessons done</div></div>'+
      '<div class="card"><div style="font-family:var(--f-head);font-size:24px;font-weight:700">'+S.read.length+'</div><div class="s" style="color:var(--muted);font-size:12px">articles read</div></div>'+
    '</div>'+
    '<div class="section-t">Explore</div>'+
    '<div class="card"><button class="row" data-go="courses" style="border:0"><div class="grow"><div class="t">Browse courses</div><div class="s">9 tracks, '+TOTAL_LESSONS+' lessons</div></div>&rsaquo;</button>'+
    '<button class="row" data-go="careers" style="border:0"><div class="grow"><div class="t">Career explorer</div><div class="s">9 roles, salaries and paths</div></div>&rsaquo;</button></div>'
  );
}

function vCourses(){
  var tracks = window.TRACKS.map(function(tr){
    var doneN = tr.lessons.filter(function(l){ return S.done.indexOf(l.id)>-1; }).length;
    var pct = Math.round(doneN/tr.lessons.length*100);
    var locked = isLocked(tr);
    return '<div class="card"><div style="display:flex;gap:12px;align-items:center">'+
      '<div style="width:42px;height:42px;border-radius:12px;display:grid;place-items:center;font-family:var(--f-head);font-weight:700;background:'+(locked?'var(--pro-dim)':'var(--cyan-dim)')+';color:'+(locked?'var(--pro)':'var(--cyan)')+'">'+tr.icon+'</div>'+
      '<div class="grow"><div class="t" style="font-weight:600">'+esc(tr.title)+' <span class="pill '+(locked?'locked':(pct===100?'done':'free'))+'">'+(locked?'PRO':(pct===100?'DONE':'FREE'))+'</span></div>'+
      '<div class="s" style="color:var(--muted);font-size:12.5px">'+esc(tr.desc)+'</div></div></div>'+
      '<div class="bar" style="margin:14px 0 10px"><i style="width:'+pct+'%"></i></div>'+
      '<div style="display:flex;justify-content:space-between;font-size:12px;color:var(--dim);margin-bottom:8px"><span>'+doneN+' / '+tr.lessons.length+' lessons</span><span>'+pct+'%</span></div>'+
      '<div class="rows">'+tr.lessons.map(function(l){
        var dn = S.done.indexOf(l.id)>-1;
        return '<button class="row" data-lesson="'+l.id+'"><span class="check'+(dn?' on':'')+'">'+(dn?'✓':'')+'</span><div class="grow"><div class="t">'+esc(l.title)+'</div><div class="s">+'+l.xp+' XP</div></div><span style="color:var(--dim)">'+(isLocked(tr)?'🔒':'›')+'</span></button>';
      }).join("")+'</div></div>';
  }).join("");
  return h('<h2 class="page-h">Courses</h2><p class="page-sub">'+TOTAL_LESSONS+' lessons across 9 tracks. Tap a lesson to read it.</p>'+tracks);
}

function vChallenges(){
  var cards = window.CHALLENGES.map(function(c){
    var locked = c.tier==="pro" && !S.pro;
    var st = (S.ch&&S.ch[c.id]) || new Array(c.tasks.length).fill(false);
    var doneN = st.filter(Boolean).length;
    return '<div class="card"><div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">'+
      '<div><div style="font-family:var(--f-head);font-weight:700">'+esc(c.title)+' <span class="pill '+(locked?'locked':'free')+'">'+(c.tier==="pro"?'PRO':'FREE')+'</span></div>'+
      '<div class="s" style="color:var(--muted);font-size:13px;margin-top:3px">'+esc(c.desc)+'</div></div>'+
      '<div style="text-align:right;flex:0 0 auto"><div style="font-family:var(--f-head);font-weight:700;color:var(--cyan)">+'+c.xp+'</div><div style="font-size:11px;color:var(--dim)">XP</div></div></div>'+
      '<div class="bar" style="margin:12px 0"><i style="width:'+(doneN/c.tasks.length*100)+'%"></i></div>'+
      '<div class="rows">'+c.tasks.map(function(t,i){
        return '<button class="row" data-chtask="'+c.id+'|'+i+'"><span class="check'+(st[i]?' on':'')+'">'+(st[i]?'✓':'')+'</span><div class="grow"><div class="t" style="font-weight:500;font-size:13.5px">'+esc(t)+'</div></div></button>';
      }).join("")+'</div>'+
      '<div style="font-size:12px;color:var(--dim);margin-top:8px">'+c.days+'-day challenge &middot; '+doneN+'/'+c.tasks.length+' done</div></div>';
  }).join("");
  return h('<h2 class="page-h">Challenges</h2><p class="page-sub">Multi-day quests. Check off tasks as you go and bank the XP.</p>'+cards);
}

function vFeed(){
  var cards = window.FEED.map(function(a){
    var read = S.read.indexOf(a.id)>-1;
    var pro = !S.pro;
    return '<div class="card"><div style="display:flex;gap:8px;align-items:center;margin-bottom:8px"><span class="pill free">'+esc(a.tag)+'</span><span style="font-size:12px;color:var(--dim)">'+esc(a.date)+'</span><span class="spacer" style="flex:1"></span>'+(read?'<span class="pill done">READ +20</span>':(pro?'<span class="pill locked">PRO</span>':''))+'</div>'+
      '<div style="font-family:var(--f-head);font-weight:700;font-size:16px;margin-bottom:5px">'+esc(a.title)+'</div>'+
      '<div class="article teaser" style="max-height:66px;overflow:hidden"><p style="margin:0">'+esc(a.teaser)+'</p></div>'+
      '<button class="btn '+(pro?'pro':'primary')+' sm block" style="margin-top:12px" data-article="'+a.id+'">'+(pro?'Read full article — Go Pro':(read?'Read again':'Read article  +20 XP'))+'</button></div>';
  }).join("");
  return h('<h2 class="page-h">This Week in AI</h2><p class="page-sub">A feed of what is changing, written to be understood. +20 XP per article.</p>'+cards);
}

function vCareers(){
  var cards = window.CAREERS.map(function(c){
    return '<div class="card"><div style="display:flex;justify-content:space-between;gap:10px"><div style="font-family:var(--f-head);font-weight:700">'+esc(c.t)+'</div><div style="color:var(--cyan);font-weight:600;font-size:13px;white-space:nowrap">'+esc(c.sal)+'</div></div>'+
      '<div class="s" style="color:var(--muted);font-size:13.5px;margin:6px 0 10px">'+esc(c.d)+'</div>'+
      '<div style="display:flex;flex-wrap:wrap;gap:6px">'+c.p.map(function(x){ return '<span class="pill">'+esc(x)+'</span>'; }).join("")+'</div></div>';
  }).join("");
  return h('<h2 class="page-h">Careers</h2><p class="page-sub">Where AI skills lead. Salaries are typical US ranges and vary by market.</p>'+cards);
}

function vProfile(){
  var lv = levelInfo(), st = stats();
  var badges = window.BADGES.map(function(b){
    var on = S.badges.indexOf(b.id)>-1;
    return '<div class="card" style="text-align:center;opacity:'+(on?1:.4)+'"><div style="font-size:26px">'+b.icon+'</div><div style="font-family:var(--f-head);font-weight:600;font-size:13px;margin-top:4px">'+esc(b.name)+'</div><div class="s" style="color:var(--dim);font-size:11.5px">'+esc(b.desc)+'</div></div>';
  }).join("");
  var trackRows = window.TRACKS.map(function(tr){
    var n = tr.lessons.filter(function(l){ return S.done.indexOf(l.id)>-1; }).length;
    return '<div class="row"><div class="grow"><div class="t" style="font-size:13.5px">'+esc(tr.title)+'</div></div><span style="color:var(--dim);font-size:12px">'+n+'/'+tr.lessons.length+'</span></div>';
  }).join("");
  return h('<h2 class="page-h">Profile</h2><p class="page-sub">'+lv.cur.name+' &middot; Level '+lv.cur.n+' &middot; '+S.xp+' XP</p>'+
    '<div class="grid two">'+
      '<div class="card"><div style="font-family:var(--f-head);font-size:24px;font-weight:700">'+S.xp+'</div><div class="s" style="color:var(--muted);font-size:12px">total XP</div></div>'+
      '<div class="card"><div style="font-family:var(--f-head);font-size:24px;font-weight:700">'+S.badges.length+'/10</div><div class="s" style="color:var(--muted);font-size:12px">badges</div></div>'+
    '</div>'+
    '<div class="section-t">Badges</div><div class="grid two">'+badges+'</div>'+
    '<div class="section-t">Track progress</div><div class="card"><div class="rows">'+trackRows+'</div></div>'+
    '<div class="section-t">Membership</div>'+
    (S.pro ? '<div class="card"><b style="color:var(--pro)">★ Pro active</b><div class="s" style="color:var(--muted)">All tracks and full articles unlocked on this device.</div></div>'
           : '<div class="card"><b>Free plan</b><div class="s" style="color:var(--muted)">Unlock all 6 Pro tracks and full articles.</div><button class="btn pro block" style="margin-top:10px" data-pro="1">Go Pro — $'+window.CONFIG.PRO_PRICE_MONTH+'/mo</button></div>')+
    '<div class="section-t">About</div><div class="card"><div class="s" style="color:var(--muted);font-size:13px">TampifyAI Learning Hub &mdash; learn AI skills and tech careers. Ages 13+. Progress is saved on this device.</div><button class="btn ghost block" style="margin-top:10px" data-reset="1">Reset progress</button></div>'
  );
}

var VIEWS = { home:vHome, courses:vCourses, challenges:vChallenges, feed:vFeed, careers:vCareers, profile:vProfile };

/* ---------- RENDER ---------- */
function bind(){
  var v = el("view");
  Array.prototype.forEach.call(v.querySelectorAll("[data-lesson]"), function(b){ b.onclick=function(){ openLesson(b.getAttribute("data-lesson")); }; });
  Array.prototype.forEach.call(v.querySelectorAll("[data-chtask]"), function(b){ b.onclick=function(){ var p=b.getAttribute("data-chtask").split("|"); toggleChallengeTask(window.CHALLENGES.filter(function(c){return c.id===p[0];})[0], +p[1]); }; });
  Array.prototype.forEach.call(v.querySelectorAll("[data-article]"), function(b){ b.onclick=function(){ readArticle(window.FEED.filter(function(a){return a.id===b.getAttribute("data-article");})[0]); }; });
  Array.prototype.forEach.call(v.querySelectorAll("[data-go]"), function(b){ b.onclick=function(){ go(b.getAttribute("data-go")); }; });
  Array.prototype.forEach.call(v.querySelectorAll("[data-pro]"), function(b){ b.onclick=openPaywall; });
  Array.prototype.forEach.call(v.querySelectorAll("[data-reset]"), function(b){ b.onclick=resetAll; });
}
function render(){ updateChips(); renderTabs(); el("view").innerHTML = VIEWS[route](); bind(); }

/* ---------- MODAL ---------- */
function openModal(html){
  var m = el("modal");
  m.innerHTML = '<div class="modal-card" role="dialog" aria-modal="true"><button class="modal-x" data-close="1" aria-label="Close">×</button><div class="modal-body">'+html+'</div></div>';
  m.hidden = false;
  m.querySelector("[data-close]").onclick = closeModal;
  m.onclick = function(e){ if(e.target===m) closeModal(); };
}
function closeModal(){ el("modal").hidden = true; }
function openLesson(id){
  var x = lessonById(id); if(!x) return;
  var tr = x.tr, l = x.l;
  if(isLocked(tr)){ openPaywall(); return; }
  var dn = S.done.indexOf(l.id)>-1;
  openModal(
    '<div class="pill '+(isLocked(tr)?'locked':'free')+'" style="margin-bottom:10px">'+esc(tr.title)+'</div>'+
    '<h3 style="font-family:var(--f-head);font-size:22px;margin:0 0 4px">'+esc(l.title)+'</h3>'+
    '<div class="s" style="color:var(--dim);margin-bottom:16px">+'+l.xp+' XP</div>'+
    '<div class="article">'+(l.body||'<p style="color:var(--muted)">Lesson body coming soon.</p>')+'</div>'+
    '<button class="btn '+(dn?'ghost':'primary')+' block" style="margin-top:20px" data-mark="'+l.id+'">'+(dn?'✓ Completed — tap to undo':'Mark as complete  +'+l.xp+' XP')+'</button>'
  );
  var mb = el("modal").querySelector("[data-mark]");
  if(mb) mb.onclick = function(){ markLesson(tr, l); closeModal(); };
}
function articleHTML(a){
  return '<div class="pill free" style="margin-bottom:10px">'+esc(a.tag)+'</div>'+
    '<h3 style="font-family:var(--f-head);font-size:22px;margin:0 0 4px">'+esc(a.title)+'</h3>'+
    '<div class="s" style="color:var(--dim);margin-bottom:16px">'+esc(a.date)+'</div>'+
    '<div class="article">'+a.body+'</div>';
}

/* ---------- PAYWALL ---------- */
function openPaywall(){
  var p = el("paywall"), C = window.CONFIG;
  p.innerHTML =
    '<div class="pw-card" role="dialog" aria-modal="true">'+
      '<button class="modal-x" data-close="1" aria-label="Close">×</button>'+
      '<div style="text-align:center;margin-bottom:6px"><span class="chip pro">★ TampifyAI Pro</span></div>'+
      '<h2 style="font-family:var(--f-head);font-size:24px;margin:8px 0 4px;text-align:center">Unlock everything</h2>'+
      '<p style="color:var(--muted);text-align:center;margin:0 0 18px;font-size:14px">All 6 Pro tracks, full articles, and every badge. Cancel anytime.</p>'+
      '<div class="grid two" style="margin-bottom:10px">'+
        '<button class="plan" data-plan="monthly"><div class="s" style="color:var(--muted);font-size:12px">Monthly</div><div style="font-family:var(--f-head);font-size:24px;font-weight:700">$'+C.PRO_PRICE_MONTH+'</div><div class="s" style="color:var(--dim);font-size:11px">per month</div></button>'+
        '<button class="plan best" data-plan="yearly"><div class="s" style="color:var(--cyan);font-size:12px;font-weight:700">BEST VALUE</div><div style="font-family:var(--f-head);font-size:24px;font-weight:700">$'+C.PRO_PRICE_YEAR+'</div><div class="s" style="color:var(--dim);font-size:11px">per year &middot; save 17%</div></button>'+
      '</div>'+
      '<div style="display:flex;gap:8px;margin:14px 0 4px">'+
        '<input id="pw-code" class="pw-input" placeholder="Have an access code?" autocomplete="off" />'+
        '<button class="btn" data-redeem="1">Redeem</button>'+
      '</div>'+
      '<div id="pw-msg" class="s" style="color:var(--dim);font-size:12px;min-height:16px"></div>'+
      '<button class="btn ghost block" style="margin-top:14px" data-close="1">Maybe later</button>'+
    '</div>';
  p.hidden = false;
  p.querySelectorAll("[data-close]").forEach(function(b){ b.onclick = closePaywall; });
  p.onclick = function(e){ if(e.target===p) closePaywall(); };
  p.querySelectorAll("[data-plan]").forEach(function(b){ b.onclick = function(){ startCheckout(b.getAttribute("data-plan")); }; });
  p.querySelector("[data-redeem]").onclick = redeem;
}
function closePaywall(){ el("paywall").hidden = true; }
function startCheckout(plan){
  var C = window.CONFIG;
  var url = plan==="yearly" ? C.CHECKOUT_YEARLY : C.CHECKOUT_MONTHLY;
  if(!url || url.indexOf("http")!==0){
    el("pw-msg").textContent = "Checkout link not set yet. Add your payment link at the top of data-core.js (CONFIG).";
    return;
  }
  window.open(url, "_blank", "noopener");
}
function redeem(){
  var v = (el("pw-code").value||"").trim().toUpperCase();
  if(window.CONFIG.ACCESS_CODES.map(function(c){return c.toUpperCase();}).indexOf(v)>-1){ unlockPro(); }
  else { el("pw-msg").textContent = v ? "That code is not valid." : "Enter a code first."; }
}

/* ---------- INIT ---------- */
streakTick(); checkBadges(); render();
document.addEventListener("keydown", function(e){ if(e.key==="Escape"){ closeModal(); closePaywall(); } });
window.TampifyDebug = { state:S, stats:stats, level:levelInfo };
})();
