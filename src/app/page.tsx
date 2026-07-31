"use client";

import { useEffect, useState, useCallback } from "react";
import { APP_NAME, COUNTRIES } from "@/lib/constants";
import { useAuthStore } from "@/stores/auth-store";
import { Toaster } from "sonner";
import { toast } from "sonner";

/* ═══════════════════════════════════════════════════════════════════════
   PAGE — Single entry point, routes between Auth ↔ Dashboard
   ═══════════════════════════════════════════════════════════════════════ */

export default function Home() {
  const { player, status, setPlayer, logout, updatePlayer } = useAuthStore();
  const [checking, setChecking] = useState(true);

  // Check session on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setPlayer(json.data);
          }
        }
      } catch {
        // offline or error — stay logged out
      } finally {
        setChecking(false);
      }
    })();
  }, [setPlayer]);

  if (checking) return <SplashScreen />;
  if (!player) return <AuthScreen />;
  return <DashboardShell player={player} onLogout={logout} onUpdate={updatePlayer} />;
}

/* ═══════════════════════════════════════════════════════════════════════
   SPLASH — Brief loading state
   ═══════════════════════════════════════════════════════════════════════ */

function SplashScreen() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-[#0a0a0f]">
      <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4">
        <SnakeLogo className="w-7 h-7 text-emerald-400" />
      </div>
      <p className="text-emerald-400 font-black text-xl tracking-tight">{APP_NAME}</p>
      <div className="mt-4 w-32 h-1 bg-emerald-900 rounded-full overflow-hidden">
        <div className="h-full w-1/2 bg-emerald-500 rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   AUTH SCREEN — Mobile-first login / register / guest
   ═══════════════════════════════════════════════════════════════════════ */

function AuthScreen() {
  const setPlayer = useAuthStore((s) => s.setPlayer);
  const [tab, setTab] = useState<"login" | "register">("login");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Shared login handler
  const doLogin = useCallback(async (email: string, password: string) => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Login failed"); return; }
      setPlayer(data.data);
      toast.success("Welcome back to the arena!");
    } catch { setError("Network error"); } finally { setBusy(false); }
  }, [setPlayer]);

  // Guest handler
  const doGuest = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/guest", { method: "POST" });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Guest failed"); return; }
      setPlayer(data.data);
      toast.success("Playing as guest!");
    } catch { setError("Network error"); } finally { setBusy(false); }
  }, [setPlayer]);

  // Register handler
  const doRegister = useCallback(async (body: Record<string, string>) => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Registration failed"); return; }
      setPlayer(data.data);
      toast.success("Account created! Welcome!");
    } catch { setError("Network error"); } finally { setBusy(false); }
  }, [setPlayer]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-[#0a0a0f] px-4 py-8">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-3">
          <SnakeLogo className="w-9 h-9 text-white" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white">{APP_NAME}</h1>
        <p className="text-xs text-slate-500 mt-1">Hunt · Harvest · Extract</p>
      </div>

      {/* Tab switcher */}
      <div className="flex w-full max-w-sm bg-slate-900 rounded-xl p-1 mb-5">
        {(["login", "register"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setError(""); }}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
              tab === t
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {t === "login" ? "Sign In" : "Create Account"}
          </button>
        ))}
      </div>

      {/* Forms */}
      <div className="w-full max-w-sm">
        {tab === "login" ? (
          <LoginForm onLogin={doLogin} busy={busy} error={error} />
        ) : (
          <RegisterForm onRegister={doRegister} busy={busy} error={error} />
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-[10px] text-slate-600 uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        {/* Guest button */}
        <button
          onClick={doGuest}
          disabled={busy}
          className="w-full py-3 rounded-xl border border-slate-700 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-50 active:scale-[0.98]"
        >
          👻 Play as Guest
        </button>
        <p className="text-center text-[10px] text-slate-600 mt-2">
          Guests get 150 starter chips. Register to save progress.
        </p>
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
}

/* ── Login Form ── */

function LoginForm({ onLogin, busy, error }: {
  onLogin: (email: string, password: string) => Promise<void>;
  busy: boolean;
  error: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (email && password) onLogin(email, password);
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <InputField label="Email" type="email" value={email} onChange={setEmail} placeholder="you@arena.gg" autoCapitalize="off" />
      <InputField label="Password" type={showPw ? "text" : "password"} value={password} onChange={setPassword} placeholder="••••••••">
        <button type="button" tabIndex={-1} onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
          {showPw ? "🙈" : "👁️"}
        </button>
      </InputField>
      {error && <p className="text-xs text-red-400 bg-red-950/50 border border-red-900/50 rounded-lg px-3 py-2">{error}</p>}
      <button
        type="submit"
        disabled={busy || !email || !password}
        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 transition-all disabled:opacity-40 active:scale-[0.98]"
      >
        {busy ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}

/* ── Register Form ── */

function RegisterForm({ onRegister, busy, error }: {
  onRegister: (body: Record<string, string>) => Promise<void>;
  busy: boolean;
  error: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [country, setCountry] = useState("");
  const [showPw, setShowPw] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) return;
    const body: Record<string, string> = { displayName: name, email, password, country };
    onRegister(body);
  }

  const pwMatch = password && confirm && password === confirm;

  return (
    <form onSubmit={submit} className="space-y-3">
      <InputField label="Display Name" type="text" value={name} onChange={setName} placeholder="ViperStrike" maxLength={20} />
      <InputField label="Email" type="email" value={email} onChange={setEmail} placeholder="you@arena.gg" autoCapitalize="off" />
      <div>
        <InputField label="Password" type={showPw ? "text" : "password"} value={password} onChange={setPassword} placeholder="Min 6 chars">
          <button type="button" tabIndex={-1} onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
            {showPw ? "🙈" : "👁️"}
          </button>
        </InputField>
      </div>
      <InputField
        label="Confirm Password"
        type="password"
        value={confirm}
        onChange={setConfirm}
        placeholder="Repeat password"
        hint={confirm && !pwMatch ? "Passwords don't match" : pwMatch ? "✓ Match" : undefined}
        hintColor={pwMatch ? "text-emerald-400" : "text-red-400"}
      />
      <div>
        <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">Country</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="w-full h-11 px-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 appearance-none"
        >
          <option value="">Select country</option>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
          ))}
        </select>
      </div>
      {error && <p className="text-xs text-red-400 bg-red-950/50 border border-red-900/50 rounded-lg px-3 py-2">{error}</p>}
      <button
        type="submit"
        disabled={busy || !name || !email || !password || !confirm || !country || !pwMatch}
        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 transition-all disabled:opacity-40 active:scale-[0.98]"
      >
        {busy ? "Creating…" : "Create Account"}
      </button>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   DASHBOARD SHELL — Mobile-first layout with bottom nav
   ═══════════════════════════════════════════════════════════════════════ */

function DashboardShell({
  player,
  onLogout,
  onUpdate,
}: {
  player: Record<string, unknown>;
  onLogout: () => void;
  onUpdate: (partial: Record<string, unknown>) => void;
}) {
  const [activeTab, setActiveTab] = useState("home");
  const p = player as {
    displayName?: string;
    level?: number;
    xp?: number;
    walletChips?: number;
    totalMatches?: number;
    isGuest?: boolean;
    bestScore?: number;
  };

  const name = p.displayName || "Guest";
  const level = p.level || 1;
  const chips = p.walletChips || 0;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#0a0a0f] text-white">
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-slate-800/60 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <SnakeLogo className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-sm tracking-tight">{APP_NAME}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
            <span className="text-emerald-400 text-xs">💰</span>
            <span className="text-xs font-bold text-emerald-400 tabular-nums">{formatChips(chips)}</span>
          </div>
          <button
            onClick={() => { onLogout(); toast.success("Disconnected"); }}
            className="w-8 h-8 rounded-lg bg-slate-800/60 flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-all"
            aria-label="Logout"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </header>

      {/* ── Content Area ── */}
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === "home" && <HomeTab player={p} onNavigate={setActiveTab} />}
        {activeTab === "arena" && <PlaceholderTab title="Arena" icon="⚔️" desc="Matchmaking coming soon." />}
        {activeTab === "shop" && <PlaceholderTab title="Shop" icon="🛍️" desc="Cosmetics & identity workshop coming soon." />}
        {activeTab === "rank" && <PlaceholderTab title="Rankings" icon="🏆" desc="Global leaderboards coming soon." />}
        {activeTab === "profile" && <PlaceholderTab title="Profile" icon="👤" desc={`LVL ${level} · ${name} · ${formatChips(chips)} chips`} />}
      </main>

      {/* ── Bottom Nav (mobile) ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d14]/95 backdrop-blur-md border-t border-slate-800/60">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[56px] ${
                activeTab === item.id
                  ? "text-emerald-400 bg-emerald-500/10"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
        {/* Safe area for notched devices */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>

      <Toaster position="top-center" richColors />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   HOME TAB — Hero + Bento grid + Challenges
   ═══════════════════════════════════════════════════════════════════════ */

function HomeTab({ player, onNavigate }: {
  player: { level?: number; xp?: number; displayName?: string; isGuest?: boolean; walletChips?: number; totalMatches?: number; bestScore?: number };
  onNavigate: (tab: string) => void;
}) {
  const [challenges, setChallenges] = useState<{ title: string; progress: number; target: number; chips: number }[]>([]);

  useEffect(() => {
    fetch("/api/player/challenges")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.success) setChallenges(d.data?.missions || []); })
      .catch(() => {});
  }, []);

  const level = player.level || 1;
  const xp = player.xp || 0;
  const xpForLevel = level * 200;
  const xpNext = (level + 1) * 200;
  const xpPct = Math.min(100, Math.floor(((xp - xpForLevel) / Math.max(1, xpNext - xpForLevel)) * 100));

  return (
    <div className="px-4 pt-4 pb-4 max-w-2xl mx-auto space-y-5">
      {/* Hero Card */}
      <div className="relative p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 border border-emerald-500/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-500 flex items-center justify-center shadow-lg">
            <span className="text-lg">🐍</span>
          </div>
          <div>
            <p className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider">Lobby HQ</p>
            <p className="text-base font-black text-white">Welcome, {player.isGuest ? "Guest" : (player.displayName || "Player").toUpperCase()}</p>
          </div>
        </div>
        {/* XP bar */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-500">LVL {level}</span>
          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all" style={{ width: `${Math.max(0, xpPct)}%` }} />
          </div>
          <span className="text-[9px] font-mono text-slate-600">{xpPct}%</span>
        </div>
        <button
          onClick={() => onNavigate("arena")}
          className="mt-4 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 active:scale-[0.98] transition-all"
        >
          ⚔️ LAUNCH MATCHMAKER
        </button>
      </div>

      {/* Bento Grid — Mobile: 2 cols, Landscape: 3 cols, Desktop: 3-4 cols */}
      <div>
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3 px-1">Lobby Stations</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {BENTO_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/60 hover:border-emerald-500/30 text-left transition-all active:scale-[0.97] group flex flex-col justify-between h-36"
            >
              <span className="text-2xl mb-2 group-hover:scale-110 transition-transform inline-block">{item.icon}</span>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">{item.title}</p>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{item.desc}</p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-800/40 pt-2 mt-2">
                <span className="text-[9px] font-mono text-slate-600 truncate">{item.tag}</span>
                <span className="text-[9px] font-mono text-emerald-500/70">{item.action} →</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Challenges Sidebar (mobile: full width below bento) */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="text-sm">📋</span>
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Tactical Challenges</p>
        </div>
        {challenges.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/60 text-center">
            <p className="text-xs text-slate-500">No challenges available right now.</p>
            <p className="text-[10px] text-slate-600 mt-1">Play matches to unlock challenges!</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {challenges.slice(0, 5).map((ch, i) => {
              const pct = Math.min(100, Math.floor((ch.progress / ch.target) * 100));
              return (
                <div key={i} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/60">
                  <p className="text-xs font-bold text-white">{ch.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{ch.progress}/{ch.target}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] font-bold text-emerald-400">+{ch.chips} chips</span>
                    <span className="text-[9px] font-mono text-slate-600">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PLACEHOLDER TAB — For unimplemented sections
   ═══════════════════════════════════════════════════════════════════════ */

function PlaceholderTab({ title, icon, desc }: { title: string; icon: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <span className="text-5xl mb-4">{icon}</span>
      <h2 className="text-xl font-black text-white">{title}</h2>
      <p className="text-sm text-slate-400 mt-2 max-w-xs">{desc}</p>
      <p className="text-[10px] text-slate-600 mt-4">Coming in a future update.</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SHARED UI PRIMITIVES
   ═══════════════════════════════════════════════════════════════════════ */

function InputField({
  label, type, value, onChange, placeholder, maxLength, autoCapitalize,
  hint, hintColor, children,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  autoCapitalize?: string;
  hint?: string;
  hintColor?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize as React.HTMLInputAutoCapitalizeAttribute}
          className="w-full h-11 px-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all"
        />
        {children}
      </div>
      {hint && <p className={`text-[10px] mt-1 ${hintColor || "text-slate-600"}`}>{hint}</p>}
    </div>
  );
}

/* ── Snake Logo SVG ── */

function SnakeLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12c0-2 1-4 3-4s3 2 3 4-1 4-3 4-3-2-3-4z" />
      <path d="M10 8h4c2 0 4 2 4 4s-2 4-4 4h-2" />
      <circle cx="14" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   DATA / CONSTANTS
   ═══════════════════════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "arena", icon: "⚔️", label: "Arena" },
  { id: "shop", icon: "🛍️", label: "Shop" },
  { id: "rank", icon: "🏆", label: "Ranks" },
  { id: "profile", icon: "👤", label: "Profile" },
];

const BENTO_ITEMS = [
  { id: "arena", icon: "🎮", title: "Play Arena", desc: "Risk chips, harvest stars, escape alive.", tag: "STAKES: 10+", action: "Enter" },
  { id: "shop", icon: "🎨", title: "Identity Workshop", desc: "Skins, trails, kill effects, and more.", tag: "CUSTOMIZE", action: "Modify" },
  { id: "profile", icon: "📊", title: "Your Dossier", desc: "Records, scores, and banked wealth.", tag: "STATS", action: "Inspect" },
  { id: "rank", icon: "🌍", title: "Global Standings", desc: "Compare yourself against the world.", tag: "195 COUNTRIES", action: "View" },
  { id: "rewards", icon: "🎁", title: "Daily Claims", desc: "Free login chips. Hourly & daily packages.", tag: "FREE CHIPS", action: "Claim" },
  { id: "store", icon: "💰", title: "Chip Store", desc: "Buy chip packs for premium stakes.", tag: "WALLET", action: "Shop" },
  { id: "championships", icon: "👑", title: "Championships", desc: "Elite events with massive prizes.", tag: "SEASONAL", action: "Compete" },
  { id: "halloffame", icon: "⭐", title: "Hall of Fame", desc: "Legendary players and records.", tag: "LEGENDS", action: "View" },
  { id: "clans", icon: "🛡️", title: "Syndicates", desc: "Create or join a clan. Dominate together.", tag: "TEAMS", action: "Assemble" },
  { id: "social", icon: "👥", title: "Players & Friends", desc: "Search globally, send gifts, spectate.", tag: "SOCIAL", action: "Connect" },
];

/* ── Helpers ── */

function formatChips(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}
