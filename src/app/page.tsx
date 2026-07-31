// ══════════════════════════════════════════════════════════════
//  SNAKESTAR — Full-featured auth + dashboard · 3 viewport modes
//  Parity with auth-gate.tsx ecosystem + login/register/forgot forms
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
button,input,select,textarea{-webkit-tap-highlight-color:transparent;font-family:inherit}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#1e293b;border-radius:99px}

@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes glow{0%,100%{box-shadow:0 0 20px rgba(16,185,129,0.15)}50%{box-shadow:0 0 35px rgba(16,185,129,0.3)}}
@keyframes spin{to{transform:rotate(360deg)}}

.fade-up{animation:fadeUp 0.35s ease-out both}
.fd1{animation:fadeUp 0.35s 0.04s ease-out both}
.fd2{animation:fadeUp 0.35s 0.08s ease-out both}
.fd3{animation:fadeUp 0.35s 0.12s ease-out both}
.fd4{animation:fadeUp 0.35s 0.16s ease-out both}
.fd5{animation:fadeUp 0.35s 0.2s ease-out both}

.ipt{width:100%;height:38px;border-radius:10px;border:1px solid #1e293b;background:#0f0f1a;color:#f1f5f9;font-size:13px;padding:0 12px;outline:none;transition:border-color 0.2s,box-shadow 0.2s}
.ipt:focus{border-color:#10b981;box-shadow:0 0 0 3px rgba(16,185,129,0.08)}
.ipt::placeholder{color:#475569}
.ipt-icon{position:relative}.ipt-icon svg{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#475569;pointer-events:none}
.ipt-icon .ipt{padding-left:32px}
.ipt-icon .pw-toggle{position:absolute;right:4px;top:50%;transform:translateY(-50%);background:none;border:none;color:#475569;cursor:pointer;padding:6px;font-size:13px}

.lbl{font-size:11px;color:#94a3b8;font-weight:600;margin-bottom:3px;display:block}

.btn-go{width:100%;height:40px;border-radius:10px;border:none;background:linear-gradient(135deg,#10b981,#059669);color:white;font-size:13px;font-weight:700;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s;box-shadow:0 4px 18px rgba(16,185,129,0.25);display:flex;align-items:center;justify-content:center;gap:8px}
.btn-go:active{transform:scale(0.97)}
.btn-go:disabled{opacity:0.5;cursor:not-allowed;transform:none}
.spinner{width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.6s linear infinite}

.btn-s{height:38px;border-radius:10px;border:1px solid #1e293b;background:#0f0f1a;color:#64748b;font-size:11px;font-weight:600;cursor:not-allowed;display:flex;align-items:center;justify-content:center;gap:6px;opacity:0.5;transition:all 0.2s}

.dvd{display:flex;align-items:center;gap:10px}
.dvd::before,.dvd::after{content:'';flex:1;height:1px;background:linear-gradient(to right,transparent,#1e293b,transparent)}
.dvd span{font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:2px;white-space:nowrap}

.chk{display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#64748b}
.chk input{width:15px;height:15px;accent-color:#10b981;cursor:pointer}

.link{background:none;border:none;color:#34d399;font-size:11px;cursor:pointer;font-weight:600;padding:0}
.link:hover{text-decoration:underline}

.err{display:none;padding:8px 12px;border-radius:10px;background:#1c0a0a;border:1px solid #7f1d1d;color:#fca5a5;font-size:11px;line-height:1.4;align-items:center;gap:6px}
.err.show{display:flex}

.pw-str{height:3px;border-radius:99px;background:#1e293b;overflow:hidden;margin-top:4px}
.pw-str-bar{height:100%;border-radius:99px;transition:all 0.3s}
.pw-str-label{font-size:10px;color:#475569;margin-top:2px}
.pw-str-label b{font-weight:700}

/* Auth container */
#aw{height:100dvh;display:flex;align-items:center;justify-content:center;padding:16px;overflow:hidden}
#af{width:100%;max-width:380px;display:flex;flex-direction:column;gap:8px}

/* Landscape auth */
@media (orientation:landscape) and (max-width:1023px){
  #aw{flex-direction:row;gap:36px;padding:20px}
  #af{max-width:340px;gap:6px}
  .abrand{display:flex!important}
  .aplogo{display:none!important}
  .af .ipt{height:34px}
}

/* Desktop auth */
@media (min-width:1024px){
  #aw{flex-direction:row;gap:0;padding:0}
  .abrand{display:flex!important;width:400px;min-height:100dvh;padding:40px;background:linear-gradient(160deg,#0a1a14,#07070d 60%);border-right:1px solid #1e293b}
  .abrand .bl{width:68px!important;height:68px!important}
  .abrand .bt{font-size:32px!important}
  .abrand .bart{display:block!important}
  #af{max-width:400px;padding:36px;gap:10px}
  .aplogo{display:none!important}
}

/* Dashboard */
#dw{height:100dvh;display:flex;flex-direction:column;overflow:hidden}
#dm{flex:1;overflow:hidden;padding:10px;display:flex;flex-direction:column;gap:8px;min-height:0}
#db{flex:1;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:8px;min-height:0}
.bc{border-radius:14px;border:1px solid #1e293b;padding:12px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;min-height:0;overflow:hidden;transition:transform 0.2s,border-color 0.2s}
.bc:hover{transform:translateY(-2px);border-color:#334155}
.bc:active{transform:scale(0.98)}
.bc .bi{font-size:22px;line-height:1;margin-bottom:4px}
.bc .btt{font-size:11px;font-weight:700;color:#f1f5f9}
.bc .bs{font-size:9px;color:#64748b;margin-top:1px}

/* Landscape dashboard */
@media (orientation:landscape) and (max-width:1023px){
  #dm{flex-direction:row;gap:10px;padding:10px 14px}
  #dl{flex:0 0 260px;display:flex;flex-direction:column;gap:8px;min-height:0}
  #dbw{flex:1;display:flex;flex-direction:column;gap:8px;min-height:0}
  #db{flex:1;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr)}
}

/* Desktop dashboard */
@media (min-width:1024px){
  #dw{flex-direction:row}
  #dsb{width:68px;flex-shrink:0;border-right:1px solid #1e293b;background:#0a0a12;display:flex;flex-direction:column;align-items:center;padding:14px 0;gap:4px}
  #dsb .nb{width:48px;height:48px;border-radius:12px;border:none;background:transparent;color:#475569;font-size:18px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px;transition:all 0.2s;padding:6px}
  #dsb .nb:hover{background:#141425;color:#e2e8f0}
  #dsb .nb.on{background:rgba(16,185,129,0.1);color:#34d399}
  #dsb .nb em{font-style:normal;font-size:9px;font-weight:600}
  #dc{flex:1;display:flex;flex-direction:column;overflow:hidden}
  #dm{flex:1;padding:16px 24px;gap:14px}
  #db{grid-template-columns:repeat(3,1fr);grid-template-rows:1fr;gap:12px}
  .bc{min-height:110px!important;padding:18px!important}
  #dn{display:none!important}
}

/* Modal */
.mo{position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100;padding:16px;backdrop-filter:blur(4px)}
.mb{background:#0f0f1a;border:1px solid #1e293b;border-radius:18px;padding:22px;width:100%;max-width:340px;animation:fadeUp 0.25s ease-out;max-height:90dvh;overflow-y:auto}
`;

// Loading state shown while checking session
const LOADING_HTML = `
<div id="loading-state" style="height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">
  <div class="spinner" style="width:28px;height:28px;border-color:rgba(16,185,129,0.2);border-top-color:#10b981"></div>
  <p style="font-size:13px;color:#64748b">Loading arena…</p>
</div>
`;

// SVG snippets
const IC = {
  mail: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  key: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.3 9.3"/><path d="m18.4 5.6 2 2"/></svg>',
  shield: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>',
  check: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
};

const BRAND = `
<div class="abrand" style="display:none;flex-direction:column;align-items:center;justify-content:center;gap:12px">
  <div class="bl" style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#34d399,#0d9488);display:flex;align-items:center;justify-content:center;box-shadow:0 0 40px rgba(16,185,129,0.2);animation:glow 3s ease-in-out infinite">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><path d="M5 12c0-2.5 1.8-5 4.5-6L12 10l2.5-4C17.2 7 19 9.5 19 12s-1.8 5-4.5 6L12 14l-2.5 4C6.8 17 5 14.5 5 12z"/><circle cx="9.5" cy="11" r="1.5" fill="white" stroke="none"/><circle cx="14.5" cy="11" r="1.5" fill="white" stroke="none"/></svg>
  </div>
  <h1 class="bt" style="font-size:24px;font-weight:900;color:#34d399;letter-spacing:-0.5px;text-shadow:0 0 30px rgba(16,185,129,0.3)">SNAKESTAR</h1>
  <p style="color:#475569;font-size:9px;letter-spacing:3px;text-transform:uppercase">Hunt · Harvest · Extract</p>
  <div class="bart" style="display:none;margin-top:16px;opacity:0.12">
    <svg width="110" height="110" viewBox="0 0 120 120" fill="none"><circle cx="60" cy="60" r="55" stroke="#34d399" stroke-width="1" stroke-dasharray="4 6"/><circle cx="60" cy="60" r="35" stroke="#34d399" stroke-width="0.5" stroke-dasharray="2 4"/><path d="M30 60 Q45 30 60 60 Q75 90 90 60" stroke="#34d399" stroke-width="2" fill="none"/></svg>
  </div>
</div>`;

const AUTH_HTML = `
<div id="aw">
  ${BRAND}
  <div id="af" class="af">
    <!-- Portrait logo -->
    <div class="aplogo fade-up" style="display:flex;flex-direction:column;align-items:center;gap:3px">
      <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#34d399,#0d9488);display:flex;align-items:center;justify-content:center;box-shadow:0 0 28px rgba(16,185,129,0.2);animation:glow 3s ease-in-out infinite">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><path d="M5 12c0-2.5 1.8-5 4.5-6L12 10l2.5-4C17.2 7 19 9.5 19 12s-1.8 5-4.5 6L12 14l-2.5 4C6.8 17 5 14.5 5 12z"/><circle cx="9.5" cy="11" r="1.5" fill="white" stroke="none"/><circle cx="14.5" cy="11" r="1.5" fill="white" stroke="none"/></svg>
      </div>
      <h1 style="font-size:20px;font-weight:900;color:#34d399;letter-spacing:-0.5px">SNAKESTAR</h1>
      <p style="color:#475569;font-size:9px;letter-spacing:2px;text-transform:uppercase">Hunt · Harvest · Extract. <span style="color:#34d399;font-weight:700">Don't get caught.</span></p>
    </div>

    <!-- Card header -->
    <div class="fd1" style="background:#0f0f1a;border:1px solid #1e293b;border-radius:14px 14px 0 0;padding:12px 14px 8px">
      <h2 style="font-size:15px;font-weight:700">Enter the arena</h2>
      <p style="font-size:11px;color:#64748b;margin-top:2px">Sign in or create an account to play.</p>
    </div>

    <!-- Card body -->
    <div style="background:#0f0f1a;border-left:1px solid #1e293b;border-right:1px solid #1e293b;padding:10px 14px;display:flex;flex-direction:column;gap:8px">
      <!-- Tabs -->
      <div class="fd1" style="display:flex;background:#0a0a12;border-radius:10px;padding:3px;border:1px solid #1e293b">
        <button id="tl" onclick="sw('l')" style="flex:1;padding:7px 0;border-radius:8px;border:none;font-size:11px;font-weight:700;cursor:pointer;background:#10b981;color:white;transition:all 0.2s">Sign In</button>
        <button id="tr" onclick="sw('r')" style="flex:1;padding:7px 0;border-radius:8px;border:none;font-size:11px;font-weight:700;cursor:pointer;background:transparent;color:#475569;transition:all 0.2s">Register</button>
      </div>

      <!-- LOGIN FORM -->
      <form id="fl" onsubmit="ha(event,'login')" class="fd2" style="display:flex;flex-direction:column;gap:7px">
        <div>
          <label class="lbl">Email</label>
          <div class="ipt-icon">${IC.mail}<input name="email" type="email" required placeholder="you@arena.gg" class="ipt" autocomplete="email" /></div>
        </div>
        <div>
          <label class="lbl">Password</label>
          <div class="ipt-icon">${IC.key}<input name="password" id="lpw" type="password" required placeholder="••••••••" minlength="6" class="ipt" style="padding-right:36px" autocomplete="current-password" /><button type="button" class="pw-toggle" onclick="tpw('lpw')">••••••••</button></div>
        </div>
        <label class="chk"><input type="checkbox" name="rememberMe" value="true" /> Remember me (30 days)</label>
        <div class="err" id="ae"><span style="flex-shrink:0">${IC.shield}</span><span></span></div>
        <button type="submit" id="bl" class="btn-go">Sign In</button>
      </form>

      <!-- SOCIAL (login only) -->
      <div id="ss" class="fd3" style="display:flex;flex-direction:column;gap:8px">
        <div class="dvd"><span>or continue with</span></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">
          <button disabled class="btn-s" title="Coming soon"><svg width="14" height="14" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> Google</button>
          <button disabled class="btn-s" title="Coming soon"><svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg> Apple</button>
          <button disabled class="btn-s" title="Coming soon"><svg width="14" height="14" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> Facebook</button>
        </div>
        <div class="dvd"><span>or</span></div>
        <button onclick="hg()" id="bg" style="width:100%;height:38px;border-radius:10px;border:1px solid #1e293b;background:transparent;color:#cbd5e1;font-size:12px;font-weight:700;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:6px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Play as Guest
        </button>
        <p style="text-align:center;font-size:9px;color:#334155">⚡ Guests get 150 starter chips. Register to keep your progress.</p>
        <div style="display:flex;justify-content:space-between;font-size:11px">
          <button class="link" onclick="sw('r')">Don't have an account? <b>Register</b></button>
          <button class="link" onclick="ofg()">Forgot Password?</button>
        </div>
      </div>

      <!-- REGISTER FORM (hidden) -->
      <form id="freg" onsubmit="ha(event,'register')" class="fd2" style="display:none;flex-direction:column;gap:6px">
        <div>
          <label class="lbl">Display name (up to 20 chars)</label>
          <input name="displayName" required placeholder="ViperStrike" maxlength="20" class="ipt" autocomplete="username" />
        </div>
        <div>
          <label class="lbl">Email</label>
          <div class="ipt-icon">${IC.mail}<input name="email" type="email" required placeholder="you@arena.gg" class="ipt" autocomplete="email" /></div>
        </div>
        <div>
          <label class="lbl">Password (min 6 chars)</label>
          <div class="ipt-icon">${IC.key}<input name="password" id="rpw" type="password" required placeholder="••••••••" minlength="6" class="ipt" style="padding-right:36px" autocomplete="new-password" oninput="updPwStr(this.value)" /><button type="button" class="pw-toggle" onclick="tpw('rpw')">••••••••</button></div>
          <div class="pw-str" id="pwbar"><div class="pw-str-bar" id="pwbar-fill"></div></div>
          <p class="pw-str-label" id="pwlabel"></p>
        </div>
        <div>
          <label class="lbl">Confirm Password</label>
          <div class="ipt-icon">${IC.key}<input name="confirm" id="rcpw" type="password" required placeholder="••••••••" minlength="6" class="ipt" style="padding-right:36px" autocomplete="new-password" /><button type="button" class="pw-toggle" onclick="tpw('rcpw')">••••••••</button></div>
        </div>
        <div>
          <label class="lbl">Country</label>
          <select name="country" required class="ipt" style="color:#64748b;appearance:auto">
            <option value="">Select country</option>
            <option value="IN">🇮🇳 India</option><option value="US">🇺🇸 United States</option>
            <option value="GB">🇬🇧 United Kingdom</option><option value="KR">🇰🇷 South Korea</option>
            <option value="JP">🇯🇵 Japan</option><option value="BR">🇧🇷 Brazil</option>
            <option value="DE">🇩🇪 Germany</option><option value="FR">🇫🇷 France</option>
            <option value="AU">🇦🎦 Australia</option><option value="CA">🇨🇦 Canada</option>
            <option value="OTHER">🌍 Other</option>
          </select>
        </div>
        <div>
          <label class="lbl">Security PIN (4 digits, optional)</label>
          <input name="pin" type="text" inputmode="numeric" maxlength="4" placeholder="e.g. 1234" class="ipt" style="letter-spacing:4px;text-align:center;font-weight:700" oninput="this.value=this.value.replace(/[^0-9]/g,'')" />
          <p style="font-size:9px;color:#475569;margin-top:2px">Required for password recovery. Keep it safe!</p>
        </div>
        <div class="err" id="re"><span style="flex-shrink:0">${IC.shield}</span><span></span></div>
        <button type="submit" id="br" class="btn-go">Create Account</button>
        <p style="text-align:center;font-size:11px;margin-top:2px">Already have an account? <button class="link" onclick="sw('l')"><b>Login</b></button></p>
      </form>
    </div>

    <!-- Card footer (login view links) -->
    <div id="log-links" class="fd4" style="background:#0f0f1a;border:1px solid #1e293b;border-radius:0 0 14px 14px;padding:8px 14px;display:flex;justify-content:space-between;font-size:11px">
      <button class="link" onclick="sw('r')">Don't have an account? <b>Register</b></button>
      <button class="link" onclick="ofg()">Forgot Password?</button>
    </div>
  </div>
</div>

<!-- FORGOT PASSWORD MODAL -->
<div id="fmod" class="mo" style="display:none" onclick="if(event.target===this)cfl()">
  <div class="mb" id="fmod-inner">
    <!-- Forgot form -->
    <div id="fview-form">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <h3 style="font-size:15px;font-weight:700;color:#f1f5f9">Reset Password</h3>
        <button onclick="cfl()" style="background:none;border:none;color:#64748b;font-size:18px;cursor:pointer;padding:4px">✕</button>
      </div>
      <form id="ff" onsubmit="hfg(event)" style="display:flex;flex-direction:column;gap:8px">
        <div>
          <label class="lbl">Email</label>
          <input name="email" type="email" required placeholder="you@arena.gg" class="ipt" />
        </div>
        <div>
          <label class="lbl">4-Digit Security PIN</label>
          <input name="pin" type="text" inputmode="numeric" required maxlength="4" placeholder="1234" class="ipt" style="letter-spacing:6px;text-align:center;font-weight:700" oninput="this.value=this.value.replace(/[^0-9]/g,'')" />
          <p style="font-size:9px;color:#475569;margin-top:2px">This is the PIN you set during registration.</p>
        </div>
        <div>
          <label class="lbl">New Password (min 6 chars)</label>
          <div class="ipt-icon">${IC.key}<input name="newPassword" id="fpw" type="password" required placeholder="••••••••" minlength="6" class="ipt" style="padding-right:36px" /><button type="button" class="pw-toggle" onclick="tpw('fpw')">••••••••</button></div>
        </div>
        <div>
          <label class="lbl">Confirm New Password</label>
          <input name="confirmNewPw" type="password" required placeholder="••••••••" minlength="6" class="ipt" />
        </div>
        <div class="err" id="fe"><span style="flex-shrink:0">${IC.shield}</span><span></span></div>
        <button type="submit" id="bf" class="btn-go">Reset Password</button>
      </form>
      <p style="text-align:center;margin-top:10px;font-size:11px">
        <button class="link" onclick="cfl()">← Back to Login</button>
      </p>
    </div>
    <!-- Success state -->
    <div id="fview-ok" style="display:none;text-align:center;padding:12px 0">
      <div style="margin:0 auto 12px;width:48px;height:48px;border-radius:50%;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);display:flex;align-items:center;justify-content:center">${IC.check}</div>
      <p style="font-size:14px;font-weight:700;color:#f1f5f9">Password Reset!</p>
      <p style="font-size:11px;color:#64748b;margin-top:6px;line-height:1.5">Your password has been changed. You can now log in with your new password.</p>
      <button onclick="cfl()" class="btn-go" style="margin-top:14px;max-width:160px;margin-left:auto;margin-right:auto;height:36px;font-size:12px">Back to Login</button>
    </div>
  </div>
</div>
`;

const APP_JS = `
// Tab switching
function sw(t){
  var il=t==='l';
  document.getElementById('fl').style.display=il?'flex':'none';
  document.getElementById('freg').style.display=il?'none':'flex';
  document.getElementById('ss').style.display=il?'flex':'none';
  document.getElementById('log-links').style.display=il?'flex':'none';
  var a=document.getElementById('tl'),b=document.getElementById('tr');
  a.style.background=il?'#10b981':'transparent';a.style.color=il?'#fff':'#475569';
  b.style.background=il?'transparent':'#10b981';b.style.color=il?'#475569':'#fff';
  herr('ae');herr('re');
}

// Password visibility toggle
function tpw(id){var i=document.getElementById(id);i.type=i.type==='password'?'text':'password'}

// Error helpers
function serr(el,m){var e=document.getElementById(el);if(!e)return;e.classList.add('show');e.querySelector('span:last-child').textContent=m}
function herr(el){var e=document.getElementById(el);if(!e)return;e.classList.remove('show');e.querySelector('span:last-child').textContent=''}

// Button state (with spinner)
function sbb(id,busy,txt){
  var b=document.getElementById(id);if(!b)return;
  b.disabled=busy;
  b.innerHTML=busy?'<div class="spinner"></div>':txt;
}

// Password strength
function updPwStr(pw){
  var s=0;
  if(pw.length>=6)s++;if(pw.length>=10)s++;
  if(/[A-Z]/.test(pw))s++;if(/[0-9]/.test(pw))s++;
  if(/[^A-Za-z0-9]/.test(pw))s++;
  var w=s<=1?'25%':s===2?'50%':s===3?'75%':'100%';
  var c=s<=1?'#ef4444':s===2?'#f97316':s===3?'#eab308':'#10b981';
  var tc=s<=1?'#ef4444':s<3?'#eab308':'#10b981';
  var lb=s<=1?'Weak':s===2?'Fair':s===3?'Good':'Strong';
  var fill=document.getElementById('pwbar-fill');
  var label=document.getElementById('pwlabel');
  if(!pw.length){fill.style.width='0';label.innerHTML='';return}
  fill.style.width=w;fill.style.background=c;
  label.innerHTML='Strength: <b style="color:'+tc+'">'+lb+'</b>';
}

// Auth submit
async function ha(ev,mode){
  ev.preventDefault();var f=ev.target;var bid=mode==='login'?'bl':'br';var eid=mode==='login'?'ae':'re';
  sbb(bid,true,'');herr(eid);
  try{
    var o={};new FormData(f).forEach(function(v,k){o[k]=v});
    if(mode==='register'){
      if(o.password!==o.confirm){serr(eid,'Passwords do not match.');sbb(bid,false,mode==='login'?'Sign In':'Create Account');return}
      delete o.confirm;
      if(o.pin&&o.pin.length===4)o.pin=o.pin;else delete o.pin;
    }
    var r=await fetch('/api/auth/'+mode,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(o)});
    var j=await r.json();
    if(j.success){window.location.reload()}else{serr(eid,j.error||'Something went wrong.')}
  }catch(e){serr(eid,'Network error. Please try again.')}
  sbb(bid,false,mode==='login'?'Sign In':'Create Account');
}

// Guest
async function hg(){
  sbb('bg',true,'');herr('ae');
  try{var r=await fetch('/api/auth/guest',{method:'POST'});var j=await r.json();if(j.success){window.location.reload()}else{serr('ae',j.error||'Guest play failed.')}}catch(e){serr('ae','Network error.')}
  sbb('bg',false,'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Play as Guest');
}

// Forgot password
function ofg(){document.getElementById('fmod').style.display='flex';document.getElementById('fview-form').style.display='block';document.getElementById('fview-ok').style.display='none';herr('ae')}
function cfl(){document.getElementById('fmod').style.display='none';herr('fe');document.getElementById('ff').reset()}
async function hfg(ev){
  ev.preventDefault();sbb('bf',true,'');herr('fe');
  var o={};new FormData(ev.target).forEach(function(v,k){o[k]=v});
  if(o.newPassword!==o.confirmNewPw){serr('fe','Passwords do not match.');sbb('bf',false,'Reset Password');return}
  delete o.confirmNewPw;
  try{
    var r=await fetch('/api/auth/forgot-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(o)});
    var j=await r.json();
    if(j.success){document.getElementById('fview-form').style.display='none';document.getElementById('fview-ok').style.display='block'}
    else{serr('fe',j.error||'Failed to reset password.')}
  }catch(e){serr('fe','Network error.')}
  sbb('bf',false,'Reset Password');
}

// Session check — non-blocking, auth screen already visible
(async function(){
  try{var r=await fetch('/api/auth/me');var j=await r.json();if(j.success&&j.player){sd(j.player)}}catch(e){}
})();

function sd(p){
  var xn=(p.level+1)*500,xp=Math.min(Math.round((p.xp/xn)*100),100);
  var xb='<div style="display:flex;justify-content:space-between;font-size:9px;color:#475569;margin-bottom:2px"><span>XP '+p.xp+'/'+xn+'</span><span>'+xp+'%</span></div><div style="height:5px;border-radius:99px;background:#0f0f1a;overflow:hidden"><div style="height:100%;width:'+xp+'%;border-radius:99px;background:linear-gradient(90deg,#10b981,#34d399);transition:width 0.6s"></div></div>';
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
    '<header id="dh" style="flex-shrink:0;height:46px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid #1e293b;background:rgba(7,7,13,0.95);backdrop-filter:blur(8px)">'+
      '<div style="display:flex;align-items:center;gap:8px">'+
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round"><path d="M5 12c0-2.5 1.8-5 4.5-6L12 10l2.5-4C17.2 7 19 9.5 19 12s-1.8 5-4.5 6L12 14l-2.5 4C6.8 17 5 14.5 5 12z"/><circle cx="9.5" cy="11" r="1.5" fill="#34d399" stroke="none"/><circle cx="14.5" cy="11" r="1.5" fill="#34d399" stroke="none"/></svg>'+
        '<span style="font-size:14px;font-weight:900;color:#34d399;letter-spacing:-0.3px">SNAKESTAR</span>'+
      '</div>'+
      '<div style="display:flex;align-items:center;gap:12px">'+
        '<span style="font-size:11px;color:#cbd5e1;font-weight:600">💰 '+(p.walletChips||0).toLocaleString()+'</span>'+
        '<button onclick="lo()" style="background:none;border:none;cursor:pointer;color:#475569;font-size:10px;font-weight:600;padding:5px 10px;border-radius:8px;border:1px solid #1e293b">Logout</button>'+
      '</div></header>'+
    '<div id="dm"><div id="dl">'+
      '<div style="border-radius:14px;background:linear-gradient(135deg,rgba(16,185,129,0.08),rgba(13,148,136,0.04));border:1px solid rgba(16,185,129,0.15);padding:12px">'+
        '<div style="display:flex;align-items:center;justify-content:space-between">'+
          '<div><p style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:1.5px;font-weight:600">Welcome back</p><h2 style="font-size:15px;font-weight:800;margin-top:2px">'+(p.displayName||'Player')+(p.isGuest?' <span style="font-size:9px;color:#f59e0b;font-weight:600">(Guest)</span>':'')+'</h2><p style="font-size:10px;color:#34d399;font-weight:600;margin-top:2px">⭐ Level '+(p.level||1)+' · '+(p.userTag||'')+'</p></div>'+
          '<button style="height:36px;padding:0 18px;border-radius:10px;border:none;background:linear-gradient(135deg,#10b981,#059669);color:white;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 4px 18px rgba(16,185,129,0.3)">▶ PLAY</button>'+
        '</div>'+
        '<div style="margin-top:8px">'+xb+'</div>'+
        '<div style="display:flex;gap:14px;margin-top:6px;font-size:10px;color:#64748b"><span>🎮 '+(p.totalMatches||0)+' matches</span><span>🏅 Best: '+(p.bestScore||0)+'</span></div>'+
      '</div>'+
      '<div style="background:#0f0f1a;border:1px solid #1e293b;border-radius:12px;padding:10px 12px;display:flex;align-items:center;justify-content:space-between">'+
        '<div><p style="font-size:9px;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:1px">🔥 Daily Challenge</p><p style="font-size:11px;color:#e2e8f0;margin-top:2px">Score 500+ in Quick Play</p></div>'+
        '<div style="text-align:right"><p style="font-size:9px;color:#64748b">Reward: 50 chips</p><p style="font-size:10px;color:#f59e0b;font-weight:700;margin-top:2px;font-variant-numeric:tabular-nums" id="ct">⏰ '+tm+'</p></div>'+
      '</div>'+
    '</div><div id="dbw"><div id="db">'+bh+'</div></div></div>'+
    '<nav id="dn" style="flex-shrink:0;height:52px;display:flex;align-items:center;justify-content:space-around;border-top:1px solid #1e293b;background:rgba(7,7,13,0.95);backdrop-filter:blur(8px);padding-bottom:env(safe-area-inset-bottom,0px)">'+nh+'</nav>'+
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