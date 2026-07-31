# Player Inspector Modal — Screen Content Walkthrough

**File:** `src/components/panels/player-inspector-modal.tsx` (560 lines)

---

## Modal Shell

- **Overlay:** `fixed inset-0 z-[60]`, `bg-slate-950/85 backdrop-blur-sm`, full screen
- **Container:** `max-w-2xl`, `max-h-[92vh]`, `rounded-2xl`, `border-slate-800`, `bg-slate-900`, `shadow-2xl`, flex column
- **Close button:** Top-right corner, `X` icon, `aria-label="Close inspector"`, `bg-slate-950 border border-slate-800`
- **Backdrop click** closes the modal
- **Escape key** closes the modal
- If `player` prop is null/undefined, **nothing renders** (returns null)

---

## BANNER (Top Info Bar)

```
┌─────────────────────────────────────────────────────────┐
│ ✨ Current Year (2026) Official Standings   ⚡ Auto-up..│
└─────────────────────────────────────────────────────────┘
(amber-500/10 bg, border-amber-500/30, font-mono, text-[11px],
 text-amber-300)

Left side: [Sparkles icon] + "Current Year (2026) Official Standings"
Right side: [Zap icon, emerald-400] + "Auto-updates every 30 mins"
           (text-[10px], text-slate-400)
```

---

## AVATAR + IDENTITY BLOCK

```
┌──────┐
│ [Flag]│  [Player Name] [Flag]
│ emoji │  (text-lg sm:text-xl, font-black, white)
│      │
│      │  [clanTag]                          ← CONDITIONAL
│      │    (bg-indigo-500/20, text-indigo-300,
│ ┌──┐  │     border-indigo-500/40, text-[10px],
│ │Lv│  │     font-mono, font-bold. e.g. "[VIP]")
│ │N │  │
│ └──┘  │  Ledger Tag: [USER_TAG]  •  [bankedChips] c Bank
│(Lvl) │  (text-xs, text-slate-400. Tag in amber-400
│      │   font-mono font-bold. Chips in emerald-400
│      │   font-mono font-bold)
│      │
│      │  [🏆 Global Rank #N] [🇮🇳 Country Rank #N] [✨ Region Rank #N]
│      │  (all text-[10px], font-mono, badges with colored borders)
│      │   - Global:  bg-amber-500/10, text-amber-300, border-amber-500/30
│      │   - Country: bg-emerald-500/10, text-emerald-300, border-emerald-500/30
│      │   - Region: bg-indigo-500/10, text-indigo-300, border-indigo-500/30
│      │
│      │  Achieved: [DYNAMIC: achievedAt]
│      │  (text-[10px], text-slate-500, font-mono)
│      │  Fallback: "26 Jul 2026, 05:42 PM UTC"
│      └──────┘

Avatar box: 16x16 (w-16 h-16), rounded-2xl, bg-slate-950,
  border-2 border-amber-500/40, shows country flag emoji (text-3xl).

Level badge: absolute bottom-right of avatar, bg-indigo-600,
  text-white, font-mono, text-[9px], font-bold,
  e.g. "Lvl [N]"
```

---

## TAB BAR

```
┌──────────┬──────────────┬──────────────────┬──────────┐
│ Overview │ Career Stats │ Extraction Logs  │ Loadout  │
└──────────┴──────────────┴──────────────────┴──────────┘
(4 equal-width tabs in a bg-slate-950 rounded-xl container,
 border-slate-800, text-xs, font-bold)

Active tab:  bg-indigo-600, text-white, shadow
Inactive tab: text-slate-400, hover:text-white
```

---

## TAB 1: Overview

### Section: Syndicate Clan Membership (CONDITIONAL — only if `clanTag && clanName`)

```
┌──────────────────────────────────────────────────┐
│ [Shield icon] SYNDICATE CLAN MEMBERSHIP   Active │
│                                    Member       │
│              (text-emerald-400, font-mono)      │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │ 🐍 [Clan Name] [[clanTag]]              │    │
│  │    Member                                 │    │
│  └──────────────────────────────────────────┘    │
│  (bg-slate-950, p-3.5, rounded-xl, border-slate-800)
│  Clan tag badge: bg-indigo-500/20, text-indigo-300,
│    text-[9px], font-mono, font-bold, border-indigo-500/30
└──────────────────────────────────────────────────┘
```

### Section: Regional Allies

```
┌──────────────────────────────────────────────────┐
│ [Users icon] [FLAG] REGIONAL ALLIES ([COUNTRY]  │
│               NETWORK)            X Members     │
│               (text-violet-400)                  │
│                                                  │
│  LOADING STATE:
│  [Loader2 spinner] Loading regional allies…      │
│  (text-[11px], text-slate-500, centered, py-4)  │
│                                                  │
│  EMPTY STATE:
│  "No regional allies found on the leaderboard." │
│  (text-[11px], text-slate-500, centered, py-4)  │
│                                                  │
│  ── OR: Ally list ──                             │
│  ┌──────────────────────────────────────────┐    │
│  │ [flag] [Ally Name]          Rank #[N]   │    │
│  │        [allyUserTag]                   │    │
│  └──────────────────────────────────────────┘    │
│  (per ally: bg-slate-900, border-slate-800,     │
│   text-xs. Name: font-bold white.               │
│   UserTag: text-[10px], font-mono, slate-500.   │
│   Rank badge: text-[10px], font-mono,            │
│   text-violet-300, bg-violet-500/10,             │
│   border-violet-500/30)                          │
└──────────────────────────────────────────────────┘
```

### Section: Global Allies & International Alliances

```
┌──────────────────────────────────────────────────┐
│ [Globe icon] 🌐 GLOBAL ALLIES & INTERNATIONAL   │
│               ALLIANCES            X Members    │
│               (text-cyan-400)                    │
│                                                  │
│  LOADING STATE:
│  [Loader2 spinner] Loading global allies…        │
│  (text-[11px], text-slate-500, centered, py-4)  │
│                                                  │
│  EMPTY STATE:
│  "No global allies found on the leaderboard."   │
│  (text-[11px], text-slate-500, centered, py-4)  │
│                                                  │
│  ── OR: Ally list (same structure as regional) ──│
│  Per ally rank badge uses cyan variant:          │
│    text-cyan-300, bg-cyan-500/10,                │
│    border-cyan-500/30                            │
└──────────────────────────────────────────────────┘
```

### Section: Creator Social Channels

```
┌──────────────────────────────────────────────────┐
│ [Globe icon] CREATOR SOCIAL CHANNELS             │
│                            Verified Handles      │
│               (text-emerald-400, font-mono)      │
│                                                  │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐    │
│  │ 📸        │  │ 🎥        │  │ 📱        │    │
│  │ Instagram │  │ YouTube   │  │ Twitch    │    │
│  │    [↗]    │  │    [↗]    │  │    [↗]    │    │
│  └───────────┘  └───────────┘  └───────────┘    │
│  (3 equal columns, bg-slate-900, hover:bg-slate-800,│
│   border-slate-800, text-[11px], font-bold, white,│
│   ExternalLink icon on each)                     │
└──────────────────────────────────────────────────┘
```

Clicking a social button fires toast:
`"Opening [Instagram|YouTube|Twitch] channel for [player name]..."`

### Section: Earned Badges & Honors

```
┌──────────────────────────────────────────────────┐
│ [Award icon] EARNED BADGES & HONORS              │
│                          [DYNAMIC: milestone.badge]│
│                          (text-[9px], text-amber-400,│
│                           font-mono)                   │
│                                                    │
│  EMPTY STATE:                                      │
│  "No milestone badges earned yet."               │
│  (col-span-2, centered, py-3, text-[11px],        │
│   text-slate-500)                                  │
│                                                    │
│  ── OR: Badge grid (2 columns) ──                 │
│  ┌──────────────┐  ┌──────────────┐               │
│  │ [emoji]      │  │ [emoji]      │               │
│  │ [Badge Name] │  │ [Badge Name] │               │
│  │ [N]L+ Chips  │  │ [N]L+ Chips  │               │
│  └──────────────┘  └──────────────┘               │
│  (bg-slate-900, border-slate-800.                 │
│   Badge name: text-[11px], font-bold, text-amber-300│
│   Chip threshold: text-[9px], text-slate-400,     │
│     e.g. "10L+ Chips")                            │
└──────────────────────────────────────────────────┘
```

---

## TAB 2: Career Stats

### Section: Live Leaderboard Standings

```
┌──────────────────────────────────────────────────┐
│ [Trophy icon] LIVE LEADERBOARD STANDINGS         │
│                                Real-Time Sync     │
│               (text-emerald-400, font-mono)      │
│  (border-b, slate-900, pb-1.5)                   │
│                                                  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐    │
│  │Global World│ │[FLAG]      │ │Regional    │    │
│  │   Rank     │ │Country Rank│ │Arena Rank  │    │
│  │            │ │            │ │            │    │
│  │   #[N]     │ │   #[N]     │ │   #[N]     │    │
│  │ (amber-400)│ │(emerald-   │ │(indigo-400)│    │
│  │            │ │  400)      │ │            │    │
│  └────────────┘ └────────────┘ └────────────┘    │
│  (3 equal columns, bg-slate-900, border-slate-800,│
│   text-center, font-mono. Labels: text-[9px],    │
│   text-slate-400. Values: font-bold, text-sm)     │
└──────────────────────────────────────────────────┘
```

### Stat Cards (2-column grid)

```
┌──────────────────┐  ┌──────────────────┐
│ [Trophy] TOTAL   │  │ [Award] HIGHEST  │
│   BANKED CHIPS   │  │   EXTRACTION     │
│                  │  │                  │
│ [N] c            │  │ [N] c / —        │
│ (emerald-400)    │  │ (amber-400)      │
├──────────────────┤  ├──────────────────┤
│ [Zap] EXTRACTION │  │ [Swords] SNAKE   │
│  SUCCESS RATE    │  │  ELIMINATIONS   │
│                  │  │                  │
│ [N]% / —         │  │ [N] Kills / —   │
│ (indigo-400)     │  │ (rose-400)       │
└──────────────────┘  └──────────────────┘
(bg-slate-950, border-slate-800, p-3)
(Labels: text-[10px], font-bold, uppercase, text-slate-400)
(Values: font-mono, font-bold, text-sm)
```

### Additional Stats (CONDITIONAL — only if `lifetimeExtracts` or `bestStreak` exist)

```
┌──────────────────┐  ┌──────────────────┐
│ [Sparkles] TOTAL │  │ [Trophy] BEST    │
│  EXTRACTIONS     │  │    STREAK        │
│                  │  │                  │
│ [N]              │  │ [N] Wins         │
│ (cyan-400)       │  │ (yellow-400)     │
└──────────────────┘  └──────────────────┘
(same card style as above, conditional rendering)
```

---

## TAB 3: Extraction Logs

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │ [Arena Name]              [Extracted]    │    │
│  │ 🕒 10 mins ago · 14 kills  +10,000,000c  │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │ [Arena Name]              [Extracted]    │    │
│  │ 🕒 2 hours ago · 8 kills   +15,00,000c   │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │ [Arena Name]              [Extracted]    │    │
│  │ 🕒 1 day ago · 5 kills     +5,00,000c    │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │ [Arena Name]              [Eliminated]   │    │
│  │ 🕒 2 days ago · 3 kills    -2,00,000c    │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  (bg-slate-950, border-slate-800, p-3,          │
│   rounded-xl per row, text-xs)                   │
│                                                  │
│  Outcome badges:                                 │
│    Extracted: bg-emerald-500/20, text-emerald-300│
│    Eliminated: bg-rose-500/20, text-rose-300     │
│                                                  │
│  Chip values:                                   │
│    Positive: text-emerald-400, prefixed "+"     │
│    Negative: text-rose-400, no prefix            │
│    (font-mono, font-bold, tabular-nums)          │
│                                                  │
│  Match data (built-in, not API-driven):          │
│    - Tier-05 Crore High Roller                   │
│    - Tier-04 Platinum Arena                      │
│    - Tier-03 Viper Boundary                     │
│  Big chip value: 10,000,000 if bankedChips >=    │
│    10M, otherwise 2,500,000                       │
└──────────────────────────────────────────────────┘
```

---

## TAB 4: Loadout

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  Snake DNA Skin:     [🐍 Skin Name] / Not visible│
│  ─────────────────────────────────────────────  │
│  Tail Trail FX:      [✨ Trail Name] / Not visible│
│  ─────────────────────────────────────────────  │
│  Kill Sound Effect:  [💥 Sound Name] / Not visible│
│  ─────────────────────────────────────────────  │
│  Victory Emote:      [🏆 Emote Name] / Not visible│
│                                                  │
│  (bg-slate-950, border-slate-800, p-4, rounded-xl)│
│  Labels: text-xs, text-slate-400                 │
│  Values with data: font-bold, text-white          │
│  Values without data: "Not visible" (italic,     │
│    text-slate-500)                                │
└──────────────────────────────────────────────────┘
```

---

## ACTION BUTTONS (Fixed Footer, always visible)

```
┌───────────────────────┬───────────────────────┐
│                       │                       │
│   [Add Friend]        │   [Challenge]         │
│   (UserPlus icon)     │   (Swords icon)       │
│                       │                       │
├───────────────────────┴───────────────────────┤
│                                               │
│              [Block Player]                   │
│              (Ban icon)                       │
│                                               │
└───────────────────────────────────────────────┘
(grid 2 cols top row, full-width bottom row)
(border-t, slate-800, p-4, pt-2)
```

### Button States:

**Add Friend — Before click:**
- `[UserPlus icon] Add Friend`
- `bg-emerald-600`, hover: `bg-emerald-500`, `text-white`, shadow

**Add Friend — After click (request sent):**
- `[Check icon] Request Sent`
- `bg-emerald-500/20`, `text-emerald-400`, `border-emerald-500/40`, `cursor-default`, disabled

**Challenge — always the same:**
- `[Swords icon] Challenge`
- `bg-indigo-600`, hover: `bg-indigo-500`, `text-white`, shadow

**Block Player — Before click:**
- `[Ban icon] Block Player`
- `bg-rose-950/20`, hover: `bg-rose-950/40`, `text-rose-400`, `border-rose-500/20`

**Block Player — After click (blocked):**
- `[Ban icon] Player Blocked`
- `bg-rose-950/60`, `text-slate-400`, `border-slate-800`, `cursor-default`, disabled

---

## Toast Messages

| Action | Toast Type | Message |
|--------|-----------|---------|
| Add Friend | success | "Friend request sent to [name] ([userTag])! 🤝" |
| Challenge | info | "Arena challenge dispatch sent to [name]! ⚔️" |
| Block Player | error | "Player [name] has been added to your block list. 🚫" |
| Social button click | info | "Opening [Instagram/YouTube/Twitch] channel for [name]..." |
