// ══════════════════════════════════════════════════════════════
//  SNAKESTAR — Pure server component, NO database dependency
//  Auth is handled via client-side script → API calls
//  This ensures the page ALWAYS renders, never hangs on DB
// ══════════════════════════════════════════════════════════════

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{height:100%;background:#08080f;color:#fff;font-family:system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
        html{overflow:hidden}
        select option{background:#0d0d15;color:#fff}
        button,input,select{-webkit-tap-highlight-color:transparent}
        @keyframes fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .fade-in{animation:fadein 0.4s ease-out}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        .loading-dot{animation:pulse 1.5s ease-in-out infinite}
      ` }} />
      <div id="app" dangerouslySetInnerHTML={{ __html: AUTH_HTML }} />
      <script dangerouslySetInnerHTML={{ __html: APP_JS }} />
    </>
  );
}

// ── All HTML in one string for zero-dependency rendering ──
const AUTH_HTML = `
<div style="height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;gap:10px;overflow:hidden" class="fade-in">

  <!-- Logo -->
  <div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#34d399,#0d9488);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 0 40px rgba(16,185,129,0.25),inset 0 -2px 6px rgba(0,0,0,0.3)">
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><path d="M4 12c0-3 2-6 5-7l2 4 2-4c3 1 5 4 5 7s-2 6-5 7l-2-4-2 4c-3-1-5-4-5-7z"/><circle cx="9" cy="11" r="1.5" fill="white" stroke="none"/><circle cx="15" cy="11" r="1.5" fill="white" stroke="none"/></svg>
  </div>
  <h1 style="font-size:28px;font-weight:900;color:#34d399;letter-spacing:-0.5px;flex-shrink:0;text-shadow:0 0 20px rgba(16,185,129,0.3)">SNAKESTAR</h1>
  <p style="color:#475569;font-size:9px;letter-spacing:3px;text-transform:uppercase;flex-shrink:0">Hunt · Harvest · Extract</p>

  <!-- Tab Switcher -->
  <div style="display:flex;background:#111119;border-radius:10px;padding:3px;border:1px solid #1a1a2e;flex-shrink:0;width:100%;max-width:300px">
    <button id="tab-login" onclick="switchTab('login')" style="flex:1;padding:8px 0;border-radius:8px;border:none;font-size:12px;font-weight:700;cursor:pointer;background:#10b981;color:white;transition:all 0.2s">Sign In</button>
    <button id="tab-register" onclick="switchTab('register')" style="flex:1;padding:8px 0;border-radius:8px;border:none;font-size:12px;font-weight:700;cursor:pointer;background:transparent;color:#475569;transition:all 0.2s">Register</button>
  </div>

  <!-- Login Form -->
  <form id="form-login" onsubmit="handleAuth(event,'login')" style="width:100%;max-width:300px;display:flex;flex-direction:column;gap:8px;flex-shrink:0">
    <input name="email" type="email" required placeholder="Email" style="width:100%;height:38px;border-radius:10px;border:1px solid #1a1a2e;background:#0d0d15;color:white;font-size:13px;padding:0 12px;outline:none;box-sizing:border-box" />
    <input name="password" type="password" required placeholder="Password" minlength="6" style="width:100%;height:38px;border-radius:10px;border:1px solid #1a1a2e;background:#0d0d15;color:white;font-size:13px;padding:0 12px;outline:none;box-sizing:border-box" />
    <button type="submit" id="btn-login" style="width:100%;height:40px;border-radius:10px;border:none;background:#10b981;color:white;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(16,185,129,0.3)">Sign In</button>
  </form>

  <!-- Register Form (hidden) -->
  <form id="form-register" onsubmit="handleAuth(event,'register')" style="width:100%;max-width:300px;display:none;flex-direction:column;gap:6px;flex-shrink:0">
    <input name="displayName" required placeholder="Display Name" maxlength="20" style="width:100%;height:38px;border-radius:10px;border:1px solid #1a1a2e;background:#0d0d15;color:white;font-size:13px;padding:0 12px;outline:none;box-sizing:border-box" />
    <input name="email" type="email" required placeholder="Email" style="width:100%;height:38px;border-radius:10px;border:1px solid #1a1a2e;background:#0d0d15;color:white;font-size:13px;padding:0 12px;outline:none;box-sizing:border-box" />
    <div style="display:flex;gap:8px">
      <input name="password" type="password" required placeholder="Password" minlength="6" style="flex:1;height:38px;border-radius:10px;border:1px solid #1a1a2e;background:#0d0d15;color:white;font-size:13px;padding:0 12px;outline:none;box-sizing:border-box" />
      <input name="confirm" type="password" required placeholder="Confirm" minlength="6" style="flex:1;height:38px;border-radius:10px;border:1px solid #1a1a2e;background:#0d0d15;color:white;font-size:13px;padding:0 12px;outline:none;box-sizing:border-box" />
    </div>
    <select name="country" required style="width:100%;height:38px;border-radius:10px;border:1px solid #1a1a2e;background:#0d0d15;color:#94a3b8;font-size:13px;padding:0 12px;outline:none;box-sizing:border-box;appearance:auto">
      <option value="">Select country</option>
      <option value="IN">🇮🇳 India</option><option value="US">🇺🇸 United States</option>
      <option value="GB">🇬🇧 United Kingdom</option><option value="KR">🇰🇷 South Korea</option>
      <option value="JP">🇯🇵 Japan</option><option value="BR">🇧🇷 Brazil</option>
      <option value="DE">🇩🇪 Germany</option><option value="FR">🇫🇷 France</option>
      <option value="AU">🇦🇺 Australia</option><option value="CA">🇨🇦 Canada</option>
      <option value="RU">🇷🇺 Russia</option><option value="MX">🇲🇽 Mexico</option>
      <option value="ES">🇪🇸 Spain</option><option value="ID">🇮🇩 Indonesia</option>
      <option value="PH">🇵🇭 Philippines</option><option value="TR">🇹🇷 Turkey</option>
      <option value="SA">🇸🇦 Saudi Arabia</option><option value="ZA">🇿🇦 South Africa</option>
      <option value="NG">🇳🇬 Nigeria</option><option value="AR">🇦🇷 Argentina</option>
      <option value="OTHER">🌍 Other</option>
    </select>
    <button type="submit" id="btn-register" style="width:100%;height:40px;border-radius:10px;border:none;background:#10b981;color:white;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(16,185,129,0.3)">Create Account</button>
  </form>

  <!-- Divider + Guest -->
  <div style="display:flex;align-items:center;width:100%;max-width:300px;flex-shrink:0">
    <div style="flex:1;height:1px;background:#1a1a2e"></div>
    <span style="padding:0 10px;font-size:9px;color:#334155;text-transform:uppercase;letter-spacing:2px">or</span>
    <div style="flex:1;height:1px;background:#1a1a2e"></div>
  </div>
  <button onclick="handleGuest()" id="btn-guest" style="width:100%;max-width:300px;height:40px;border-radius:10px;border:1px solid #1a1a2e;background:transparent;color:#e2e8f0;font-size:13px;font-weight:700;cursor:pointer;flex-shrink:0">Play as Guest</button>
  <p style="color:#334155;font-size:9px;flex-shrink:0">Guests get 500 starter chips</p>

  <!-- Error -->
  <div id="auth-error" style="display:none;width:100%;max-width:300px;padding:8px 12px;border-radius:10px;background:#450a0a;border:1px solid #7f1d1d;color:#fca5a5;font-size:12px;flex-shrink:0"></div>
</div>
`;

// ── Client-side logic: auth + dashboard switching ──
const APP_JS = `
function switchTab(t){
  document.getElementById('form-login').style.display=t==='login'?'flex':'none';
  document.getElementById('form-register').style.display=t==='register'?'flex':'none';
  var tl=document.getElementById('tab-login'),tr=document.getElementById('tab-register');
  tl.style.background=t==='login'?'#10b981':'transparent';tl.style.color=t==='login'?'#fff':'#475569';
  tr.style.background=t==='register'?'#10b981':'transparent';tr.style.color=t==='register'?'#fff':'#475569';
  document.getElementById('auth-error').style.display='none';
}

function showErr(m){var e=document.getElementById('auth-error');e.textContent=m;e.style.display='block'}
function setBtn(id,t,d){var b=document.getElementById(id);if(b){b.textContent=t;b.disabled=d}}

async function handleAuth(ev,mode){
  ev.preventDefault();var f=ev.target;var bid=mode==='login'?'btn-login':'btn-register';
  setBtn(bid,'...',true);
  try{
    var o={};new FormData(f).forEach(function(v,k){o[k]=v});
    if(mode==='register')delete o.confirm;
    var r=await fetch('/api/auth/'+mode,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(o)});
    var j=await r.json();
    if(j.success){window.location.reload()}else{showErr(j.error||'Auth failed')}
  }catch(e){showErr('Network error')}
  setBtn(bid,mode==='login'?'Sign In':'Create Account',false);
}

async function handleGuest(){
  setBtn('btn-guest','...',true);
  try{
    var r=await fetch('/api/auth/guest',{method:'POST'});
    var j=await r.json();
    if(j.success){window.location.reload()}else{showErr(j.error||'Failed')}
  }catch(e){showErr('Network error')}
  setBtn('btn-guest','Play as Guest',false);
}

// Check auth on load and show dashboard if logged in
(async function(){
  try{
    var r=await fetch('/api/auth/me');
    var j=await r.json();
    if(j.success&&j.player){showDashboard(j.player)}
  }catch(e){}
})();

function showDashboard(p){
  var xpPct=Math.min(Math.round((p.xp/((p.level+1)*500))*100),100);
  var bento=[
    {t:'Quick Play',s:'Jump in now',i:'⚡',c:'rgba(16,185,129,0.1)'},
    {t:'Ranked',s:'Climb the board',i:'🏆',c:'rgba(245,158,11,0.1)'},
    {t:'Practice',s:'Hone skills',i:'🎯',c:'rgba(139,92,246,0.1)'},
    {t:'Clans',s:'Team up',i:'👥',c:'rgba(59,130,246,0.1)'},
    {t:'Events',s:'Weekly contests',i:'📅',c:'rgba(236,72,153,0.1)'},
    {t:'Shop',s:'Skins & boosts',i:'🛒',c:'rgba(249,115,22,0.1)'}
  ];
  var nav=[{n:'Home',i:'🏠'},{n:'Arena',i:'⚔️'},{n:'Shop',i:'🛒'},{n:'Ranks',i:'📊'},{n:'Profile',i:'👤'}];
  var bentoHtml='';
  for(var i=0;i<bento.length;i++){var b=bento[i];
    bentoHtml+='<div style="border-radius:14px;background:linear-gradient(135deg,'+b.c+',#111119);border:1px solid #1a1a2e;padding:10px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;min-height:0;overflow:hidden"><span style="font-size:22px;line-height:1">'+b.i+'</span><div><p style="font-size:11px;font-weight:700;margin:0;color:white">'+b.t+'</p><p style="font-size:9px;margin:2px 0 0;color:#475569">'+b.s+'</p></div></div>';
  }
  var navHtml='';
  for(var i=0;i<nav.length;i++){var n=nav[i];
    navHtml+='<button style="background:none;border:none;padding:4px 8px;border-radius:8px;cursor:pointer;color:'+(i===0?'#34d399':'#475569')+';font-size:10px;font-weight:'+(i===0?'700':'500')+';display:flex;flex-direction:column;align-items:center;gap:2px"><span style="font-size:16px;line-height:1">'+n.i+'</span><span>'+n.n+'</span></button>';
  }
  document.getElementById('app').innerHTML=
    '<div style="height:100dvh;display:flex;flex-direction:column;overflow:hidden" class="fade-in">'+
    '<header style="flex-shrink:0;height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;border-bottom:1px solid #1a1a2e;background:rgba(8,8,15,0.95)">'+
      '<div style="display:flex;align-items:center;gap:6px">'+
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round"><path d="M4 12c0-3 2-6 5-7l2 4 2-4c3 1 5 4 5 7s-2 6-5 7l-2-4-2 4c-3-1-5-4-5-7z"/><circle cx="9" cy="11" r="1.5" fill="#34d399" stroke="none"/><circle cx="15" cy="11" r="1.5" fill="#34d399" stroke="none"/></svg>'+
        '<span style="font-size:14px;font-weight:900;color:#34d399">SNAKESTAR</span>'+
      '</div>'+
      '<div style="display:flex;align-items:center;gap:10px">'+
        '<span style="font-size:11px;color:#cbd5e1">💰 '+(p.walletChips||0).toLocaleString()+'</span>'+
        '<button onclick="logout()" style="font-size:16px;color:#475569;background:none;border:none;cursor:pointer">✕</button>'+
      '</div>'+
    '</header>'+
    '<main style="flex:1;overflow:hidden;padding:10px;display:flex;flex-direction:column;gap:8px;min-height:0">'+
      '<div style="flex-shrink:0;border-radius:14px;background:linear-gradient(135deg,rgba(16,185,129,0.08),rgba(13,148,136,0.04));border:1px solid rgba(16,185,129,0.15);padding:10px 12px">'+
        '<div style="display:flex;align-items:center;justify-content:space-between">'+
          '<div>'+
            '<p style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:1px">Welcome back</p>'+
            '<h2 style="font-size:15px;font-weight:700">'+(p.displayName||'Player')+(p.isGuest?' (Guest)':'')+'</h2>'+
            '<p style="font-size:9px;color:#34d399;font-weight:600;margin-top:1px">Lv '+(p.level||1)+' · '+(p.userTag||'')+'</p>'+
          '</div>'+
          '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">'+
            '<button style="height:34px;padding:0 18px;border-radius:10px;border:none;background:#10b981;color:white;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(16,185,129,0.3);letter-spacing:1px">▶ PLAY</button>'+
            '<span style="font-size:8px;color:#475569">'+(p.totalMatches||0)+' matches · Best: '+(p.bestScore||0)+'</span>'+
          '</div>'+
        '</div>'+
        '<div style="margin-top:8px">'+
          '<div style="display:flex;justify-content:space-between;font-size:8px;color:#334155;margin-bottom:2px"><span>XP '+(p.xp||0)+'</span><span>'+xpPct+'%</span></div>'+
          '<div style="height:5px;border-radius:99px;background:#0d0d15;overflow:hidden"><div style="height:100%;width:'+xpPct+'%;border-radius:99px;background:linear-gradient(to right,#34d399,#2dd4bf)"></div></div>'+
        '</div>'+
      '</div>'+
      '<div style="flex:1;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:8px;min-height:0">'+bentoHtml+'</div>'+
      '<div style="flex-shrink:0;background:#111119;border:1px solid #1a1a2e;border-radius:12px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between">'+
        '<div>'+
          '<p style="font-size:9px;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:1px">🔥 Daily Challenge</p>'+
          '<p style="font-size:11px;color:#e2e8f0;margin-top:1px">Score 500+ in Quick Play</p>'+
        '</div>'+
        '<div style="text-align:right">'+
          '<p style="font-size:9px;color:#64748b">Reward: 50 chips</p>'+
          '<p style="font-size:9px;color:#f59e0b;font-weight:600;margin-top:1px">⏰ 14:23:01</p>'+
        '</div>'+
      '</div>'+
    '</main>'+
    '<nav style="flex-shrink:0;height:52px;display:flex;align-items:center;justify-content:space-around;border-top:1px solid #1a1a2e;background:rgba(8,8,15,0.95);padding-bottom:env(safe-area-inset-bottom,0px)">'+navHtml+'</nav>'+
    '</div>';
}

async function logout(){
  try{await fetch('/api/auth/logout',{method:'POST'})}catch(e){}
  window.location.reload();
}
`;
