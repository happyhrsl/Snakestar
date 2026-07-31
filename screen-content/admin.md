# Admin Panel — Screen Content Walkthrough

**File:** `src/components/panels/admin-panel.tsx` (488 lines)

---

## SCREEN 1: Role Guard (Non-Admin User)

*Rendered when `player.role !== 'admin'`*

```
┌─────────────────────────────────────────────────┐
│                                                 │
│              [ShieldAlert icon]                 │
│                  (rose-400)                     │
│                                                 │
│              Access Denied                      │
│            (text-xl, font-black, white)         │
│                                                 │
│  This console is restricted to authorized       │
│  Venom Arena operators with the                 │
│  admin role. Your account does not have         │
│  permission to view or modify player data.      │
│            (text-xs, rose-300/80)               │
│                                                 │
└─────────────────────────────────────────────────┘
  (rounded-2xl, border rose-500/40, bg-rose-950/30,
   max-w-md, centered, p-8)

NOTE: The word "admin" is rendered in font-mono text-rose-200
      (inline span within the paragraph).
```

---

## SCREEN 2: Central Operations Gate (Access Code Entry)

*Rendered when user has admin role but gate not yet unlocked*

```
┌─────────────────────────────────────────────────────┐
│  (decorative GlowBlob: rose-500/10, top-right)      │
│                                                     │
│                [Shield icon]                        │
│                   (rose-400)                        │
│                                                     │
│           Central Operations Gate                   │
│          (text-xl, font-black, white)               │
│                                                     │
│    Access is restricted to authorized Syndicate     │
│    Technical Overseers. Enter your operations       │
│    code to proceed.                                 │
│              (text-xs, slate-400)                   │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │ Operations Code                             │    │
│  └─────────────────────────────────────────────┘    │
│  (type=password, placeholder: "Operations Code",    │
│   font-mono, bg-slate-950, border-slate-800,        │
│   focus:border-rose-500/50)                         │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │            Authorize Terminal               │    │
│  └─────────────────────────────────────────────┘    │
│  (bg-rose-600, hover:bg-rose-500, font-bold,         │
│   text-xs, uppercase, tracking-wider, full-width)    │
│                                                     │
│  TOAST on invalid code: "Invalid operations code."  │
│  TOAST on success:      "Admin credentials verified!"
│                                                     │
└─────────────────────────────────────────────────────┘
  (rounded-2xl, border-slate-800/80, bg-slate-900/60,
   max-w-md, centered, p-5 sm:p-6)
```

**Behavior:** Pressing Enter in the input field also triggers authorize.

---

## SCREEN 3: Full Admin Dashboard (Gate Unlocked)

*3-column grid layout (1 col on mobile, 3 cols on lg)*

---

### COLUMN 1: System Diagnostics

```
┌────────────────────────────────────────────────────┐
│ [Server icon] SYSTEM DIAGNOSTICS        [Refresh] │
│ (text-sm, font-bold, white, uppercase)             │
│ (border-b, slate-800, pb-3)                        │
│                                                     │
│  Refresh button: icon button, border-slate-800,    │
│    bg-slate-900. Shows RefreshCw when idle,        │
│    Loader2 spinner when loading.                    │
│    aria-label="Refresh stats"                      │
│                                                     │
│  ┌──────────────────┐  ┌──────────────────┐        │
│  │ CONNECTED SOCKETS│  │  ACTIVE ROOMS    │        │
│  │                  │  │                  │        │
│  │      [DYNAMIC:    │  │    [DYNAMIC:      │        │
│  │   totalPlayers]  │  │   activeArenas]   │        │
│  │   (rose-400)     │  │   (emerald-400)   │        │
│  └──────────────────┘  └──────────────────┘        │
│  (text-[10px] label, font-mono, uppercase,         │
│   slate-500. Value: text-lg, font-black,           │
│   font-mono, tabular-nums)                         │
│                                                     │
│  ─── Global Intercom Broadcast ───                 │
│  (MicroLabel: text-[10px], font-mono, uppercase,   │
│   tracking-widest, text-slate-500)                 │
│                                                     │
│  ┌─────────────────────────────┐ ┌──────┐          │
│  │ Announce to all active      │ │ Send │          │
│  │ matches...                   │ │      │          │
│  └─────────────────────────────┘ └──────┘          │
│  (placeholder: "Announce to all active matches...")│
│  (Send btn: bg-rose-600, Send icon + "Send",       │
│   disabled when empty)                              │
│                                                     │
│  ─── SYSLOG MONITOR ───────────── X entries ─────  │
│  (text-[11px], font-bold, uppercase, slate-400,    │
│   FileText icon. Entry count: text-[10px],          │
│   font-mono, slate-500, right-aligned)             │
│                                                     │
│  ┌────────────────────────────────────────────┐    │
│  │  EMPTY STATE:                              │    │
│  │  "No recent transactions..."               │    │
│  │  (italic, text-slate-600)                  │    │
│  │                                            │    │
│  │  ── OR when logs exist: ──                 │    │
│  │                                            │    │
│  │  [HH:MM:SS] ✓/✗ ACTION  TARGET  DETAIL    │    │
│  │  (✓ = emerald-400, ✗ = rose-400)           │    │
│  │  (target = amber-300, detail = slate-500)  │    │
│  │  (text-[10px], font-mono, border-b per row)│    │
│  └────────────────────────────────────────────┘    │
│  (bg-slate-950, border-slate-800, max-h-280px,     │
│   overflow-y-auto, up to 50 entries)                │
│                                                     │
└────────────────────────────────────────────────────┘
```

---

### COLUMNS 2-3 (merged): Live Operations Roster

```
┌────────────────────────────────────────────────────────┐
│ [Users icon] LIVE OPERATIONS ROSTER  [N Active]       │
│ (text-sm, font-bold, white, uppercase)                │
│                                                        │
│ Badge: "[DYNAMIC: filteredPlayers.length] Active"     │
│ (bg-rose-500/10, text-rose-400, font-mono, text-[10px],│
│  px-2, py-0.5, rounded-full, border rose-500/20)       │
│                                                        │
│ ┌──────────────────────────────────────────────────┐  │
│ │ 🔍 Search by name or userTag...                  │  │
│ └──────────────────────────────────────────────────┘  │
│ (Search icon left, placeholder: "Search by name or    │
│  userTag...", font-mono, bg-slate-950,                │
│  border-slate-800, focus:border-rose-500/60)           │
│                                                        │
│ ┌────────────────────────────────────────────────┐    │
│ │                                                │    │
│ │  LOADING STATE:                                │    │
│ │  [Loader2 spinner, rose-400]                   │    │
│ │  Loading roster...                             │    │
│ │  (text-slate-500, text-xs)                     │    │
│ │                                                │    │
│ │  ── OR ──                                      │    │
│ │                                                │    │
│ │  EMPTY STATE (no filtered results):            │    │
│ │  "No active human players currently linked     │    │
│ │   to server memory."                           │    │
│ │  (bg-slate-950/30, border-slate-800,            │    │
│ │   rounded-xl, text-slate-500, text-xs)         │    │
│ │                                                │    │
│ │  ── OR: Player rows ──                         │    │
│ │                                                │    │
│ │  ● [Player Name]  #[USER_TAG]  [YOU]           │    │
│ │    🇮🇳 • Lvl [level] • Room: tier-[N]          │    │
│ │    [bankedChips] Chips  SID: [XXXXXXXX]        │    │
│ │                                                │    │
│ │        [🔇] [👤✗] [🗑] [Select/Selected]       │    │
│ │                                                │    │
│ └────────────────────────────────────────────────┘    │
│                                                        │
│  Per-player row details:                              │
│  - Green pulsing dot (bg-emerald-500, va-pulse)       │
│  - Player name (text-xs, font-bold, white)             │
│  - #[userTag] badge (text-[9px], font-mono,            │
│    slate-500, bg-slate-900, border-slate-800/60)       │
│  - [YOU] badge (conditional — only if isSelf;          │
│    text-[9px], font-mono, font-bold, bg-amber-500,     │
│    text-slate-950)                                      │
│  - Country flag emoji + "• Lvl [N]" +                  │
│    "• Room: tier-[N]" + "[chips] Chips" +              │
│    "SID: [XXXXXXXX]" (text-[10px], font-mono)          │
│  - Chips value in amber-400, font-bold                 │
│                                                        │
│  Action buttons per row:                               │
│  - 🔇 Toggle Mute (title="Toggle Mute Player",        │
│    text-amber-400, disabled if busy or isSelf)         │
│  - 👤✗ Kick (title="Kick Connection",                   │
│    text-yellow-400, disabled if busy or isSelf)         │
│  - 🗑 Ban (title="Ban UserTag Permanently",            │
│    text-rose-400, bg-rose-500/10, border-rose-500/20,  │
│    disabled if busy or isSelf)                          │
│  - [Select] / [Selected] button                        │
│    (unselected: bg-slate-900, text-slate-300,           │
│     border-slate-800)                                   │
│    (selected: bg-rose-500, text-white)                  │
│                                                        │
│  Selected row styling: bg-rose-500/10,                  │
│    border-rose-500/40 (vs default bg-slate-950,         │
│    border-slate-800/60)                                 │
│                                                        │
│  ═══════════════════════════════════════════════════   │
│  Economy Ledger Overrides                             │
│  (Coins icon + label, text-xs, font-bold,              │
│   text-rose-400, uppercase, tracking-wider)            │
│                                                        │
│  When a player is selected, right-aligned target:      │
│  [Zap icon] Target: [player name] #[userTag]           │
│  (text-[10px], font-mono, slate-500, player name in    │
│   amber-300)                                           │
│                                                        │
│  ┌─────────────────┐ ┌─────────────────┐ ┌──────────┐ │
│  │ [selectedTag or │ │ Amount          │ │ Adjust   │ │
│  │  placeholder]   │ │ (+/- e.g. 5000) │ │ Chips    │ │
│  │                 │ │                 │ │ Balance  │ │
│  └─────────────────┘ └─────────────────┘ └──────────┘ │
│  Field 1: type=text, placeholder="Player Tag          │
│           (e.g. STRK-8291)", font-mono                │
│  Field 2: type=number, placeholder="Amount             │
│           (+/- e.g. 5000)", required, font-mono       │
│  Button:  "Adjust Chips Balance"                      │
│           (Coins icon, bg-rose-600, disabled when      │
│            busy or no selectedTag. Shows Loader2       │
│            spinner when busy)                          │
│                                                        │
│  [Shield icon] All actions are logged. Banked chips    │
│  clamp at 0 (no negatives).                            │
│  (text-[10px], text-slate-500, font-mono)              │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## Toast Messages (triggered by admin actions)

| Action | Toast Type | Message |
|--------|-----------|---------|
| Invalid access code | error | "Invalid operations code." |
| Valid access code | success | "Admin credentials verified!" |
| No player selected for chip modify | error | "Select a player first." |
| Invalid chip amount | error | "Amount must be a non-zero number." |
| Chip modify API fail | error | `[data.error]` or "Failed to adjust player chips." |
| Chip modify success | success | "Modified balance of [userTag] by [+/-N] chips!" |
| Ban success | error | "Banned player [userTag] permanently." |
| Unban success | success | "Unbanned player [userTag]." |
| Ban API fail | error | `[data.error]` or "Ban action failed." |
| Kick | info | "Player [playerId] kicked from active lobby." |
| Mute | info | "Toggled mute state for player [playerId]." |
| Broadcast sent | success | "Global admin broadcast sent!" |
| Network error (ban) | error | "Network error during ban action." |
