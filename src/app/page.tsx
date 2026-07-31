import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { verifyToken, getTokenFromCookies } from "@/lib/auth";
import { toFullPlayer } from "@/lib/player-helpers";
import { COUNTRIES } from "@/lib/constants";

// Server component — no client JS needed for initial render
async function getPlayer() {
  try {
    const cookieStore = await cookies();
    const token = getTokenFromCookies({ snakestarToken: cookieStore.get("snakestar-token")?.value });
    if (!token) return null;
    const payload = verifyToken(token);
    if (!payload) return null;
    const player = await db.player.findUnique({ where: { id: payload.playerId } });
    if (!player) return null;
    const full = toFullPlayer(player);
    return { id: full.id, displayName: full.displayName, userTag: full.userTag, level: full.level, xp: full.xp, walletChips: full.walletChips, totalMatches: full.totalMatches || 0, bestScore: full.bestScore || 0, isGuest: full.isGuest };
  } catch { return null; }
}

export default async function Home() {
  const player = await getPlayer();
  return player ? <Dashboard player={player} /> : <AuthScreen />;
}

function AuthScreen() {
  const IS = inputStyle;
  const BS = btnStyle;
  return (
    <div style={{ minHeight: "100dvh", background: "#08080f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #34d399, #0d9488)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 12 }}>▲</div>
      <h1 style={{ fontSize: 28, fontWeight: 900, color: "#34d399", margin: "0 0 2px", letterSpacing: "-0.5px" }}>SNAKESTAR</h1>
      <p style={{ color: "#94a3b8", fontSize: 11, marginTop: 4, letterSpacing: 2, textTransform: "uppercase" }}>Hunt . Harvest . Extract</p>

      <div style={{ display: "flex", marginTop: 20, marginBottom: 16, background: "#111119", borderRadius: 12, padding: 3, border: "1px solid #1a1a2e" }}>
        <button id="tab-login" onClick="switchTab('login')" style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", background: "#10b981", color: "white" }}>Sign In</button>
        <button id="tab-register" onClick="switchTab('register')" style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", background: "transparent", color: "#94a3b8" }}>Register</button>
      </div>

      <form id="form-login" onSubmit="handleAuth(event,'login')" style={{ width: "100%", maxWidth: 280 }}>
        <input name="email" type="email" required placeholder="Email" style={IS} />
        <input name="password" type="password" required placeholder="Password" minLength={6} style={{ ...IS, marginTop: 8 }} />
        <button type="submit" id="btn-login" style={BS}>Sign In</button>
      </form>

      <form id="form-register" onSubmit="handleAuth(event,'register')" style={{ width: "100%", maxWidth: 280, display: "none" }}>
        <input name="displayName" required placeholder="Display Name" maxLength={20} style={IS} />
        <input name="email" type="email" required placeholder="Email" style={{ ...IS, marginTop: 8 }} />
        <input name="password" type="password" required placeholder="Password" minLength={6} style={{ ...IS, marginTop: 8 }} />
        <input name="confirm" type="password" required placeholder="Confirm Password" minLength={6} style={{ ...IS, marginTop: 8 }} />
        <select name="country" required style={{ ...IS, marginTop: 8 }}>
          <option value="">Select country</option>
          {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
        </select>
        <button type="submit" id="btn-register" style={{ ...BS, marginTop: 8 }}>Create Account</button>
      </form>

      <div style={{ display: "flex", alignItems: "center", width: "100%", maxWidth: 280, margin: "14px 0" }}>
        <div style={{ flex: 1, height: 1, background: "#1a1a2e" }} />
        <span style={{ padding: "0 12px", fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: 2 }}>or</span>
        <div style={{ flex: 1, height: 1, background: "#1a1a2e" }} />
      </div>
      <button onClick="handleGuest()" id="btn-guest" style={{ width: "100%", maxWidth: 280, height: 40, borderRadius: 12, border: "1px solid #1a1a2e", background: "transparent", color: "#e2e8f0", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Play as Guest</button>
      <p style={{ color: "#475569", fontSize: 10, marginTop: 6 }}>Guests get 150 starter chips</p>
      <div id="auth-error" style={{ display: "none", width: "100%", maxWidth: 280, marginTop: 10, padding: "8px 12px", borderRadius: 10, background: "#450a0a", border: "1px solid #7f1d1d", color: "#fca5a5", fontSize: 12 }}></div>
      <script dangerouslySetInnerHTML={{ __html: JS_CODE }} />
    </div>
  );
}

function Dashboard({ player }: { player: NonNullable<Awaited<ReturnType<typeof getPlayer>>> }) {
  const p = player;
  const xpPct = Math.min(Math.round((p.xp / ((p.level + 1) * 500)) * 100), 100);
  const nav = ["Home","Arena","Shop","Ranks","Profile"];
  const bento = [{t:"Quick Play",s:"Jump in now"},{t:"Ranked",s:"Climb the board"},{t:"Practice",s:"Hone skills"},{t:"Clans",s:"Team up"},{t:"Events",s:"Weekly contests"},{t:"Tournaments",s:"Pro brackets"},{t:"Stats",s:"Your numbers"},{t:"Shop",s:"Skins and boosts"},{t:"News",s:"Latest updates"},{t:"Settings",s:"Customize"}];
  return (
    <div style={{ minHeight: "100dvh", background: "#08080f", display: "flex", flexDirection: "column", fontFamily: "system-ui, -apple-system, sans-serif", color: "white" }}>
      <header style={{ flexShrink: 0, height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", borderBottom: "1px solid #1a1a2e", background: "rgba(8,8,15,0.95)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 18 }}>▲</span>
          <span style={{ fontSize: 14, fontWeight: 900, color: "#34d399" }}>SNAKESTAR</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#cbd5e1" }}>{p.walletChips.toLocaleString()} chips</span>
          <a href="/api/auth/logout" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>X</a>
        </div>
      </header>
      <main style={{ flex: 1, overflowY: "auto", paddingBottom: 60 }}>
        <div style={{ padding: 12, maxWidth: 640, margin: "0 auto" }}>
          <div style={{ borderRadius: 16, background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(13,148,136,0.05))", border: "1px solid rgba(16,185,129,0.2)", padding: 14, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>Welcome back</p>
                <h2 style={{ fontSize: 16, fontWeight: 700, margin: "4px 0 2px" }}>{p.displayName}{p.isGuest ? " (Guest)" : ""}</h2>
                <p style={{ fontSize: 10, color: "#34d399", fontWeight: 600, margin: 0 }}>Level {p.level} / {p.userTag}</p>
              </div>
              <button style={{ height: 36, padding: "0 16px", borderRadius: 12, border: "none", background: "#10b981", color: "white", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>PLAY</button>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#475569", marginBottom: 3 }}><span>XP {p.xp}</span><span>{xpPct}%</span></div>
              <div style={{ height: 6, borderRadius: 99, background: "#0d0d15", overflow: "hidden" }}><div style={{ height: "100%", width: xpPct + "%", borderRadius: 99, background: "linear-gradient(to right, #34d399, #2dd4bf)" }} /></div>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
              <span style={{ fontSize: 10, color: "#64748b" }}>{p.totalMatches} matches</span>
              <span style={{ fontSize: 10, color: "#64748b" }}>Best: {p.bestScore}</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {bento.map((item, i) => (
              <div key={i} style={{ height: 72, borderRadius: 16, background: "#111119", border: "1px solid #1a1a2e", padding: 10, display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
                <span style={{ fontSize: 10, color: "#34d399", fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</span>
                <div><p style={{ fontSize: 12, fontWeight: 700, margin: 0, color: "white" }}>{item.t}</p><p style={{ fontSize: 10, margin: "2px 0 0", color: "#475569" }}>{item.s}</p></div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 56, display: "flex", alignItems: "center", justifyContent: "space-around", borderTop: "1px solid #1a1a2e", background: "rgba(8,8,15,0.95)" }}>
        {nav.map((n, i) => <button key={n} style={{ background: "none", border: "none", padding: "6px 12px", borderRadius: 8, cursor: "pointer", color: i === 0 ? "#34d399" : "#475569", fontSize: 10, fontWeight: 600, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>{n}</button>)}
      </nav>
    </div>
  );
}

const inputStyle: React.CSSProperties = { width: "100%", height: 40, borderRadius: 12, border: "1px solid #1a1a2e", background: "#0d0d15", color: "white", fontSize: 13, padding: "0 12px", outline: "none", boxSizing: "border-box" };
const btnStyle: React.CSSProperties = { width: "100%", height: 40, borderRadius: 12, border: "none", background: "#10b981", color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 8, boxShadow: "0 4px 12px rgba(16,185,129,0.3)" };

const JS_CODE = `
function switchTab(t){document.getElementById('form-login').style.display=t==='login'?'block':'none';document.getElementById('form-register').style.display=t==='register'?'block':'none';document.getElementById('tab-login').style.background=t==='login'?'#10b981':'transparent';document.getElementById('tab-login').style.color=t==='login'?'white':'#94a3b8';document.getElementById('tab-register').style.background=t==='register'?'#10b981':'transparent';document.getElementById('tab-register').style.color=t==='register'?'white':'#94a3b8';document.getElementById('auth-error').style.display='none'}
function showError(m){var e=document.getElementById('auth-error');e.textContent=m;e.style.display='block'}
async function handleAuth(e,m){e.preventDefault();var f=e.target;var b=document.getElementById(m==='login'?'btn-login':'btn-register');b.textContent='...';b.disabled=true;try{var o={};new FormData(f).forEach(function(v,k){o[k]=v});if(m==='register')delete o.confirm;var r=await fetch('/api/auth/'+m,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(o)});var j=await r.json();if(j.success){window.location.reload()}else{showError(j.error||'Auth failed')}}catch(e){showError('Network error')}b.textContent=m==='login'?'Sign In':'Create Account';b.disabled=false}
async function handleGuest(){var b=document.getElementById('btn-guest');b.textContent='...';b.disabled=true;try{var r=await fetch('/api/auth/guest',{method:'POST'});var j=await r.json();if(j.success){window.location.reload()}else{showError(j.error||'Failed')}}catch(e){showError('Network error')}b.textContent='Play as Guest';b.disabled=false}
`;
