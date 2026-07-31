// ══════════════════════════════════════════════════════════════
//  SNAKESTAR — Fresh design · 3 viewport modes · zero imports
//  Portrait (zero scroll) · Landscape (minimal scroll) · Desktop
// ══════════════════════════════════════════════════════════════

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div id="app" dangerouslySetInnerHTML={{ __html: AUTH_HTML }} />
      <script dangerouslySetInnerHTML={{ __html: APP_JS }} />
    </>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;background:#07070d;color:#e2e8f0;font-family:system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden}
select option{background:#0f0f1a;color:#e2e8f0}
button,input,select{-webkit-tap-highlight-color:transparent;font-family:inherit}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#1e293b;border-radius:99px}

@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes glow{0%,100%{box-shadow:0 0 20px rgba(16,185,129,0.15)}50%{box-shadow:0 0 35px rgba(16,185,129,0.3)}}

.fade-up{animation:fadeUp 0.4s ease-out both}
.fd1{animation:fadeUp 0.4s 0.05s ease-out both}
.fd2{animation:fadeUp 0.4s 0.1s ease-out both}
.fd3{animation:fadeUp 0.4s 0.15s ease-out both}
.fd4{animation:fadeUp 0.4s 0.2s ease-out both}

.ipt{width:100%;height:40px;border-radius:12px;border:1px solid #1e293b;background:#0f0f1a;color:#f1f5f9;font-size:13px;padding:0 14px;outline:none;transition:border-color 0.2s,box-shadow 0.2s}
.ipt:focus{border-color:#10b981;box-shadow:0 0 0 3px rgba(16,185,129,0.1)}
.ipt::placeholder{color:#475569}

.btn-go{width:100%;height:42px;border-radius:12px;border:none;background:linear-gradient(135deg,#10b981,#059669);color:white;font-size:14px;font-weight:700;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s;box-shadow:0 4px 20px rgba(16,185,129,0.25)}
.btn-go:active{transform:scale(0.97)}
.btn-go:disabled{opacity:0.5;cursor:not-allowed;transform:none}

.btn-s{height:40px;border-radius:12px;border:1px solid #1e293b;background:#0f0f1a;color:#94a3b8;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all 0.2s}
.btn-s:hover{border-color:#334155;background:#141425}

.dvd{display:flex;align-items:center;gap:12px}
.dvd::before,.dvd::after{content:'';flex:1;height:1px;background:linear-gradient(to right,transparent,#1e293b,transparent)}
.dvd span{font-size:10px;color:#475569;text-transform:uppercase;letter-spacing:2px;white-space:nowrap}

/* Auth container */
#aw{height:100dvh;display:flex;align-items:center;justify-content:center;padding:16px;overflow:hidden}
#af{width:100%;max-width:380px;display:flex;flex-direction:column;gap:10px}

/* Landscape auth */
@media (orientation:landscape) and (max-width:1023px){
  #aw{flex-direction:row;gap:40px;padding:24px}
  #af{max-width:340px}
  .abrand{display:flex!important}
  .aplogo{display:none!important}
  .af .ipt{height:36px}.af .btn-go{height:38px}
}

/* Desktop auth */
@media (min-width:1024px){
  #aw{flex-direction:row;gap:0;padding:0}
  .abrand{display:flex!important;width:420px;min-height:100dvh;padding:40px;background:linear-gradient(160deg,#0a1a14,#07070d 60%);border-right:1px solid #1e293b}
  .abrand .bl{width:72px!important;height:72px!important}
  .abrand .bt{font-size:36px!important}
  .abrand .bart{display:block!important}
  #af{max-width:400px;padding:40px;gap:14px}
  .aplogo{display:none!important}
}

/* Dashboard */
#dw{height:100dvh;display:flex;flex-direction:column;overflow:hidden}
#dm{flex:1;overflow:hidden;padding:10px;display:flex;flex-direction:column;gap:8px;min-height:0}
#db{flex:1;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:8px;min-height:0}

.bc{border-radius:16px;border:1px solid #1e293b;padding:14px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;min-height:0;overflow:hidden;transition:transform 0.2s,border-color 0.2s}
.bc:hover{transform:translateY(-2px);border-color:#334155}
.bc:active{transform:scale(0.98)}
.bc .bi{font-size:24px;line-height:1;margin-bottom:6px}
.bc .btt{font-size:12px;font-weight:700;color:#f1f5f9}
.bc .bs{font-size:10px;color:#64748b;margin-top:1px}

/* Landscape dashboard */
@media (orientation:landscape) and (max-width:1023px){
  #dm{flex-direction:row;gap:12px;padding:10px 16px}
  #dl{flex:0 0 280px;display:flex;flex-direction:column;gap:10px;min-height:0}
  #dbw{flex:1;display:flex;flex-direction:column;gap:8px;min-height:0}
  #db{flex:1;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr)}
}

/* Desktop dashboard */
@media (min-width:1024px){
  #dw{flex-direction:row}
  #dsb{width:72px;flex-shrink:0;border-right:1px solid #1e293b;background:#0a0a12;display:flex;flex-direction:column;align-items:center;padding:16px 0;gap:4px}
  #dsb .nb{width:52px;height:52px;border-radius:14px;border:none;background:transparent;color:#475569;font-size:20px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;transition:all 0.2s;padding:6px}
  #dsb .nb:hover{background:#141425;color:#e2e8f0}
  #dsb .nb.on{background:rgba(16,185,129,0.1);color:#34d399}
  #dsb .nb em{font-style:normal;font-size:9px;font-weight:600}
  #dc{flex:1;display:flex;flex-direction:column;overflow:hidden}
  #dh{flex-shrink:0}
  #dm{flex:1;padding:16px 24px;gap:16px}
  #db{grid-template-columns:repeat(3,1fr);grid-template-rows:1fr;gap:12px}
  .bc{min-height:120px!important;padding:20px!important}
  #dn{display:none!important}
}

/* Modal */
.mo{position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100;padding:16px;backdrop-filter:blur(4px)}
.mb{background:#0f0f1a;border:1px solid #1e293b;border-radius:20px;padding:24px;width:100%;max-width:340px;animation:fadeUp 0.3s ease-out}
`;

const AUTH_HTML = `
<div id="aw">
  <!-- Brand (landscape/desktop only) -->
  <div class="abrand" style="display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px">
    <div class="bl" style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#34d399,#0d9488);display:flex;align-items:center;justify-content:center;box-shadow:0 0 40px rgba(16,185,129,0.2);animation:glow 3s ease-in-out infinite">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><path d="M5 12c0-2.5 1.8-5 4.5-6L12 10l2.5-4C17.2 7 19 9.5 19 12s-1.8 5-4.5 6L12 14l-2.5 4C6.8 17 5 14.5 5 12z"/><circle cx="9.5" cy="11" r="1.5" fill="white" stroke="none"/><circle cx="14.5" cy="11" r="1.5" fill="white" stroke="none"/></svg>
    </div>
    <h1 class="bt" style="font-size:26px;font-weight:900;color:#34d399;letter-spacing:-0.5px;text-shadow:0 0 30px rgba(16,185,129,0.3)">SNAKESTAR</h1>
    <p style="color:#475569;font-size:10px;letter-spacing:3px;text-transform:uppercase">Hunt · Harvest · Extract</p>
    <div class="bart" style="display:none;margin-top:20px;opacity:0.12">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none"><circle cx="60" cy="60" r="55" stroke="#34d399" stroke-width="1" stroke-dasharray="4 6"/><circle cx="60" cy="60" r="35" stroke="#34d399" stroke-width="0.5" stroke-dasharray="2 4"/><path d="M30 60 Q45 30 60 60 Q75 90 90 60" stroke="#34d399" stroke-width="2" fill="none"/></svg>
    </div>
  </div>

  <!-- Form area -->
  <div id="af" class="af">
    <div class="aplogo fade-up" style="display:flex;flex-direction:column;align-items:center;gap:4px">
      <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#34d399,#0d9488);display:flex;align-items:center;justify-content:center;box-shadow:0 0 30px rgba(16,185,129,0.2);animation:glow 3s ease-in-out infinite">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><path d="M5 12c0-2.5 1.8-5 4.5-6L12 10l2.5-4C17.2 7 19 9.5 19 12s-1.8 5-4.5 6L12 14l-2.5 4C6.8 17 5 14.5 5 12z"/><circle cx="9.5" cy="11" r="1.5" fill="white" stroke="none"/><circle cx="14.5" cy="11" r="1.5" fill="white" stroke="none"/></svg>
      </div>
      <h1 style="font-size:22px;font-weight:900;color:#34d399;letter-spacing:-0.5px">SNAKESTAR</h1>
      <p style="color:#475569;font-size:9px;letter-spacing:2.5px;text-transform:uppercase">Hunt · Harvest · Extract</p>
    </div>

    <!-- Tabs -->
    <div class="fd1" style="display:flex;background:#0f0f1a;border-radius:12px;padding:3px;border:1px solid #1e293b">
      <button id="tl" onclick="sw('l')" style="flex:1;padding:8px 0;border-radius:10px;border:none;font-size:12px;font-weight:700;cursor:pointer;background:#10b981;color:white;transition:all 0.2s">Sign In</button>
      <button id="tr" onclick="sw('r')" style="flex:1;padding:8px 0;border-radius:10px;border:none;font-size:12px;font-weight:700;cursor:pointer;background:transparent;color:#475569;transition:all 0.2s">Register</button>
    </div>

    <!-- Login -->
    <form id="fl" onsubmit="ha(event,'login')" class="fd2" style="display:flex;flex-direction:column;gap:8px">
      <input name="email" type="email" required placeholder="Email address" class="ipt" autocomplete="email" />
      <div style="position:relative">
        <input name="password" id="lpw" type="password" required placeholder="Password" minlength="6" class="ipt" style="padding-right:40px" autocomplete="current-password" />
        <button type="button" onclick="tpw('lpw')" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:none;border:none;color:#475569;cursor:pointer;padding:6px;font-size:14px">👁</button>
      </div>
      <div style="display:flex;justify-content:flex-end">
        <button type="button" onclick="ofg()" style="background:none;border:none;color:#34d399;font-size:11px;cursor:pointer;font-weight:600">Forgot Password?</button>
      </div>
      <button type="submit" id="bl" class="btn-go">Sign In</button>
    </form>

    <!-- Social -->
    <div id="ss" class="fd3" style="display:flex;flex-direction:column;gap:10px">
      <div class="dvd"><span>or continue with</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        <button onclick="scl('Google')" class="btn-s"><svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> Google</button>
        <button onclick="scl('Apple')" class="btn-s"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg> Apple</button>
        <button onclick="scl('Facebook')" class="btn-s"><svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> Facebook</button>
      </div>
    </div>

    <!-- Register (hidden) -->
    <form id="fr" onsubmit="ha(event,'register')" class="fd2" style="display:none;flex-direction:column;gap:6px">
      <input name="displayName" required placeholder="Display name" maxlength="20" class="ipt" autocomplete="username" />
      <input name="email" type="email" required placeholder="Email address" class="ipt" autocomplete="email" />
      <div style="display:flex;gap:6px">
        <input name="password" type="password" required placeholder="Password" minlength="6" class="ipt" style="flex:1" autocomplete="new-password" />
        <input name="confirm" type="password" required placeholder="Confirm" minlength="6" class="ipt" style="flex:1" autocomplete="new-password" />
      </div>
      <select name="country" required class="ipt" style="color:#64748b;appearance:auto">
        <option value="">Select country</option>
        <option value="IN">India</option><option value="US">United States</option>
        <option value="GB">United Kingdom</option><option value="KR">South Korea</option>
        <option value="JP">Japan</option><option value="BR">Brazil</option>
        <option value="DE">Germany</option><option value="FR">France</option>
        <option value="AU">Australia</option><option value="CA">Canada</option>
        <option value="OTHER">Other</option>
      </select>
      <button type="submit" id="br" class="btn-go">Create Account</button>
    </form>

    <!-- Guest -->
    <div class="fd4" style="display:flex;flex-direction:column;align-items:center;gap:6px">
      <div class="dvd" style="width:100%"><span>or</span></div>
      <button onclick="hg()" id="bg" style="width:100%;height:42px;border-radius:12px;border:1px solid #1e293b;background:transparent;color:#cbd5e1;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.2s">🎮  Play as Guest</button>
      <p style="color:#334155;font-size:9px">Guests receive 500 starter chips</p>
    </div>

    <div id="ae" style="display:none;padding:10px 14px;border-radius:12px;background:#1c0a0a;border:1px solid #7f1d1d;color:#fca5a5;font-size:12px;line-height:1.4"></div>
  </div>
</div>

<!-- Forgot Password Modal -->
<div id="fmod" class="mo" style="display:none" onclick="if(event.target===this)cfl()">
  <div class="mb">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <h3 style="font-size:16px;font-weight:700;color:#f1f5f9">Reset Password</h3>
      <button onclick="cfl()" style="background:none;border:none;color:#64748b;font-size:20px;cursor:pointer;padding:4px">✕</button>
    </div>
    <p style="font-size:12px;color:#64748b;margin-bottom:14px;line-height:1.5">Enter your email and security PIN to reset your password.</p>
    <form id="ff" onsubmit="hfg(event)" style="display:flex;flex-direction:column;gap:8px">
      <input name="email" type="email" required placeholder="Email address" class="ipt" />
      <input name="pin" type="text" required placeholder="Security PIN" maxlength="6" class="ipt" style="letter-spacing:6px;text-align:center;font-size:16px;font-weight:700" />
      <input name="newPassword" type="password" required placeholder="New password (min 6 chars)" minlength="6" class="ipt" />
      <button type="submit" id="bf" class="btn-go" style="margin-top:4px">Reset Password</button>
    </form>
    <div id="fe" style="display:none;margin-top:8px;padding:8px 12px;border-radius:10px;background:#1c0a0a;border:1px solid #7f1d1d;color:#fca5a5;font-size:11px"></div>
    <div id="fs" style="display:none;margin-top:8px;padding:8px 12px;border-radius:10px;background:#0a1c0a;border:1px solid #166534;color:#86efac;font-size:11px"></div>
  </div>
</div>
`;

const APP_JS = `
function sw(t){
  var il=t==='l';
  document.getElementById('fl').style.display=il?'flex':'none';
  document.getElementById('fr').style.display=il?'none':'flex';
  document.getElementById('ss').style.display=il?'flex':'none';
  var a=document.getElementById('tl'),b=document.getElementById('tr');
  a.style.background=il?'#10b981':'transparent';a.style.color=il?'#fff':'#475569';
  b.style.background=il?'transparent':'#10b981';b.style.color=il?'#475569':'#fff';
  document.getElementById('ae').style.display='none';
}
function tpw(id){var i=document.getElementById(id);i.type=i.type==='password'?'text':'password'}
function se(m){var e=document.getElementById('ae');e.textContent=m;e.style.display='block'}
function sb(id,t,d){var b=document.getElementById(id);if(b){b.textContent=t;b.disabled=d}}
function scl(p){se(p+' login coming soon — use email or play as guest')}
function ofg(){document.getElementById('fmod').style.display='flex';document.getElementById('ae').style.display='none'}
function cfl(){document.getElementById('fmod').style.display='none';document.getElementById('fe').style.display='none';document.getElementById('fs').style.display='none'}
async function hfg(ev){
  ev.preventDefault();sb('bf','Resetting...',true);
  var o={};new FormData(ev.target).forEach(function(v,k){o[k]=v});
  try{
    var r=await fetch('/api/auth/forgot-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(o)});
    var j=await r.json();
    if(j.success){document.getElementById('fs').textContent=j.message||'Password reset!';document.getElementById('fs').style.display='block';document.getElementById('fe').style.display='none'}
    else{var fe=document.getElementById('fe');fe.textContent=j.error||'Reset failed';fe.style.display='block';document.getElementById('fs').style.display='none'}
  }catch(e){var fe2=document.getElementById('fe');fe2.textContent='Network error';fe2.style.display='block'}
  sb('bf','Reset Password',false);
}
async function ha(ev,mode){
  ev.preventDefault();var f=ev.target;var bid=mode==='login'?'bl':'br';
  sb(bid,'...',true);
  try{
    var o={};new FormData(f).forEach(function(v,k){o[k]=v});
    if(mode==='register'){if(o.password!==o.confirm){se('Passwords do not match');sb(bid,mode==='login'?'Sign In':'Create Account',false);return}delete o.confirm}
    var r=await fetch('/api/auth/'+mode,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(o)});
    var j=await r.json();
    if(j.success){window.location.reload()}else{se(j.error||'Auth failed')}
  }catch(e){se('Network error')}
  sb(bid,mode==='login'?'Sign In':'Create Account',false);
}
async function hg(){
  sb('bg','...',true);
  try{var r=await fetch('/api/auth/guest',{method:'POST'});var j=await r.json();if(j.success){window.location.reload()}else{se(j.error||'Failed')}}catch(e){se('Network error')}
  sb('bg','🎮  Play as Guest',false);
}
(async function(){try{var r=await fetch('/api/auth/me');var j=await r.json();if(j.success&&j.player){sd(j.player)}}catch(e){}})();

function sd(p){
  var xn=(p.level+1)*500,xp=Math.min(Math.round((p.xp/xn)*100),100);
  var xb='<div style="display:flex;justify-content:space-between;font-size:9px;color:#475569;margin-bottom:3px"><span>XP '+p.xp+'/'+xn+'</span><span>'+xp+'%</span></div><div style="height:6px;border-radius:99px;background:#0f0f1a;overflow:hidden"><div style="height:100%;width:'+xp+'%;border-radius:99px;background:linear-gradient(90deg,#10b981,#34d399);transition:width 0.6s"></div></div>';
  var bn=[
    {t:'Quick Play',s:'Jump into a match',i:'⚡',bg:'linear-gradient(135deg,rgba(16,185,129,0.12),rgba(16,185,129,0.03))',bd:'rgba(16,185,129,0.2)'},
    {t:'Ranked',s:'Climb the leaderboard',i:'🏆',bg:'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(245,158,11,0.03))',bd:'rgba(245,158,11,0.2)'},
    {t:'Practice',s:'Hone your skills',i:'🎯',bg:'linear-gradient(135deg,rgba(139,92,246,0.12),rgba(139,92,246,0.03))',bd:'rgba(139,92,246,0.2)'},
    {t:'Clans',s:'Build your team',i:'👥',bg:'linear-gradient(135deg,rgba(59,130,246,0.12),rgba(59,130,246,0.03))',bd:'rgba(59,130,246,0.2)'},
    {t:'Events',s:'Weekly contests',i:'📅',bg:'linear-gradient(135deg,rgba(236,72,153,0.12),rgba(236,72,153,0.03))',bd:'rgba(236,72,153,0.2)'},
    {t:'Shop',s:'Skins & boosts',i:'🛒',bg:'linear-gradient(135deg,rgba(249,115,22,0.12),rgba(249,115,22,0.03))',bd:'rgba(249,115,22,0.2)'}
  ];
  var bh='';for(var i=0;i<bn.length;i++){var b=bn[i];bh+='<div class="bc" style="background:'+b.bg+';border-color:'+b.bd+'"><span class="bi">'+b.i+'</span><div><p class="btt">'+b.t+'</p><p class="bs">'+b.s+'</p></div></div>'}
  var nv=[{n:'Home',i:'🏠'},{n:'Arena',i:'⚔️'},{n:'Shop',i:'🛒'},{n:'Ranks',i:'📊'},{n:'Profile',i:'👤'}];
  var nh='',snh='';
  for(var i=0;i<nv.length;i++){var ni=nv[i];var a=i===0;
    nh+='<button style="background:none;border:none;padding:4px 8px;border-radius:8px;cursor:pointer;color:'+(a?'#34d399':'#475569')+';font-size:10px;font-weight:'+(a?'700':'500')+';display:flex;flex-direction:column;align-items:center;gap:2px"><span style="font-size:18px;line-height:1">'+ni.i+'</span><span>'+ni.n+'</span></button>';
    snh+='<button class="nb'+(a?' on':'')+'"><span style="font-size:20px;line-height:1">'+ni.i+'</span><em>'+ni.n+'</em></button>';
  }
  var now=new Date(),eod=new Date(now);eod.setHours(23,59,59,999);
  var df=Math.max(0,Math.floor((eod-now)/1000));
  var tm=String(Math.floor(df/3600)).padStart(2,'0')+':'+String(Math.floor((df%3600)/60)).padStart(2,'0')+':'+String(df%60).padStart(2,'0');

  document.getElementById('app').innerHTML=
    '<div id="dw" class="fade-up">'+
    '<div id="dsb">'+snh+'</div>'+
    '<div id="dc">'+
    '<header id="dh" style="flex-shrink:0;height:48px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid #1e293b;background:rgba(7,7,13,0.95);backdrop-filter:blur(8px)">'+
      '<div style="display:flex;align-items:center;gap:8px">'+
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round"><path d="M5 12c0-2.5 1.8-5 4.5-6L12 10l2.5-4C17.2 7 19 9.5 19 12s-1.8 5-4.5 6L12 14l-2.5 4C6.8 17 5 14.5 5 12z"/><circle cx="9.5" cy="11" r="1.5" fill="#34d399" stroke="none"/><circle cx="14.5" cy="11" r="1.5" fill="#34d399" stroke="none"/></svg>'+
        '<span style="font-size:15px;font-weight:900;color:#34d399;letter-spacing:-0.3px">SNAKESTAR</span>'+
      '</div>'+
      '<div style="display:flex;align-items:center;gap:14px">'+
        '<span style="font-size:12px;color:#cbd5e1;font-weight:600">💰 '+(p.walletChips||0).toLocaleString()+'</span>'+
        '<button onclick="lo()" style="background:none;border:none;cursor:pointer;color:#475569;font-size:11px;font-weight:600;padding:6px 10px;border-radius:8px;border:1px solid #1e293b">Logout</button>'+
      '</div></header>'+
    '<div id="dm"><div id="dl">'+
      '<div style="border-radius:16px;background:linear-gradient(135deg,rgba(16,185,129,0.08),rgba(13,148,136,0.04));border:1px solid rgba(16,185,129,0.15);padding:14px">'+
        '<div style="display:flex;align-items:center;justify-content:space-between">'+
          '<div><p style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:1.5px;font-weight:600">Welcome back</p><h2 style="font-size:16px;font-weight:800;margin-top:2px">'+(p.displayName||'Player')+(p.isGuest?' <span style="font-size:10px;color:#f59e0b;font-weight:600">(Guest)</span>':'')+'</h2><p style="font-size:10px;color:#34d399;font-weight:600;margin-top:2px">⭐ Level '+(p.level||1)+' · '+(p.userTag||'')+'</p></div>'+
          '<button style="height:38px;padding:0 20px;border-radius:12px;border:none;background:linear-gradient(135deg,#10b981,#059669);color:white;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(16,185,129,0.3);transition:transform 0.15s">▶ PLAY</button>'+
        '</div>'+
        '<div style="margin-top:10px">'+xb+'</div>'+
        '<div style="display:flex;gap:16px;margin-top:8px;font-size:10px;color:#64748b"><span>🎮 '+(p.totalMatches||0)+' matches</span><span>🏅 Best: '+(p.bestScore||0)+'</span></div>'+
      '</div>'+
      '<div id="dch" style="background:#0f0f1a;border:1px solid #1e293b;border-radius:14px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between">'+
        '<div><p style="font-size:10px;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:1px">🔥 Daily Challenge</p><p style="font-size:12px;color:#e2e8f0;margin-top:3px">Score 500+ in Quick Play</p></div>'+
        '<div style="text-align:right"><p style="font-size:10px;color:#64748b">Reward: 50 chips</p><p style="font-size:11px;color:#f59e0b;font-weight:700;margin-top:2px;font-variant-numeric:tabular-nums" id="ct">⏰ '+tm+'</p></div>'+
      '</div>'+
    '</div><div id="dbw"><div id="db">'+bh+'</div></div></div>'+
    '<nav id="dn" style="flex-shrink:0;height:56px;display:flex;align-items:center;justify-content:space-around;border-top:1px solid #1e293b;background:rgba(7,7,13,0.95);backdrop-filter:blur(8px);padding-bottom:env(safe-area-inset-bottom,0px)">'+nh+'</nav>'+
    '</div></div>';
  sti();
}

var _ti;
function sti(){
  clearInterval(_ti);
  _ti=setInterval(function(){
    var el=document.getElementById('ct');if(!el){clearInterval(_ti);return}
    var now=new Date(),eod=new Date(now);eod.setHours(23,59,59,999);
    var df=Math.max(0,Math.floor((eod-now)/1000));
    el.textContent='⏰ '+String(Math.floor(df/3600)).padStart(2,'0')+':'+String(Math.floor((df%3600)/60)).padStart(2,'0')+':'+String(df%60).padStart(2,'0');
  },1000);
}

async function lo(){try{await fetch('/api/auth/logout',{method:'POST'})}catch(e){}window.location.reload()}
`;