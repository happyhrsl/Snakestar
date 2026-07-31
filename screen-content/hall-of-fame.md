# Hall of Fame Panel — Exact Screen Content Walkthrough

> Source: `/src/components/panels/hall-of-fame.tsx` (542 lines)
> Config: `/src/lib/game-config.ts` — `HALL_OF_FAME_TIERS`, `INITIAL_COMMENTARY`, `COMMENTARY_NAMES`, `COUNTRIES`

---

## Pre-condition Gate

[IF `player` is null/falsy → entire panel replaced by `<NotSignedIn />`]

```
┌─────────────────────────────────────────────┐
│                                             │
│           Not signed in.                    │
│                                             │
└─────────────────────────────────────────────┘
```

(Styled: `rounded-2xl border-slate-800/80 bg-slate-900/60 p-8 text-center max-w-md`, text `text-sm text-slate-400`)

[ELSE — signed in — continue below]

---

## Panel Container

Decorative hidden glow blob: `bg-yellow-500/10`, positioned `top-12 right-12`, `w-56 h-56`, `blur-3xl`. Not visible to user (pointer-events-none, aria-hidden).

---

## 1. Header (always visible)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 👑  Project Venom Hall of Fame & Esports Shrine                           │
│     Immortalizing milestone achievers (1 Lakh to 1 Crore), annual World Cup  │
│     champions, and live 1–100 national & global tier rankings!              │
│ ─────────────────────────────────────────────────────────────────────────── │
└──────────────────────────────────────────────────────────────────────────────┘
```

- **Crown icon** (`Crown` from lucide-react): `w-5.5 h-5.5`, color `text-yellow-400`
- **H2**: `text-xl sm:text-2xl font-sans font-black text-white tracking-tight`
- **Paragraph**: `text-xs text-slate-400 mt-1 max-w-3xl`
- Bottom border: `border-b border-slate-800`, margin-bottom `mb-5 pb-5`

---

## 2. Tab Bar (always visible)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [✨ Milestone Tiers (1L - 1Cr)] [🏆 Tournament Archives (Ranks 1-100)] [📻 Live Esports Ticker] │
└──────────────────────────────────────────────────────────────────────────────┘
```

Container: `flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border-slate-800/60 mb-5`

| Tab | Icon | Label (exact text) | Active style | Inactive style |
|-----|------|--------------------|--------------|----------------|
| `milestones` | `Sparkles` ✨ | `Milestone Tiers (1L - 1Cr)` | `bg-yellow-500/20 border-yellow-500/40 text-yellow-300` | `text-slate-500 border-transparent` |
| `archives` | `Trophy` 🏆 | `Tournament Archives (Ranks 1-100)` | same active | same inactive |
| `ticker` | `Radio` 📻 | `Live Esports Ticker` | same active | same inactive |

Each button: `px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition border`
Icons: `w-3.5 h-3.5`

**Default active tab**: `milestones`

---

## 3. Live Broadcast Marquee (always visible)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 📻 LIVE BROADCAST  🎙️ ESPORTS DESK: Hari from India (#IND-001) locked in a   │
│                    massive extraction in Tier-05 High Stakes Arena!           │
└──────────────────────────────────────────────────────────────────────────────┘
```

Container: `rounded-xl border-rose-500/30 bg-rose-950/20 p-3 flex items-center gap-3 overflow-hidden mb-5`

- **LIVE BROADCAST badge**: `inline-flex items-center gap-1 text-[10px] font-mono font-bold text-rose-300 uppercase tracking-widest px-2 py-1 bg-rose-500/20 border-rose-500/40 rounded shrink-0`
  - Pulsing `Radio` icon (`w-3 h-3 animate-pulse`)
  - Text: `LIVE BROADCAST`
- **Marquee text**: `text-xs text-rose-200 truncate`
  - Shows `commentary[0]?.text` or fallback: `🎙️ ESPORTS COMMENTARY ACTIVE: Welcome to Project Venom World Arena Championship!`

**Initial 3 commentary items** (from `INITIAL_COMMENTARY`):

| ID | Timestamp | Text |
|----|-----------|------|
| c1 | `13:41:02 UTC` | `🎙️ ESPORTS DESK: Hari from India (#IND-001) locked in a massive extraction in Tier-05 High Stakes Arena!` |
| c2 | `13:40:48 UTC` | `💥 ARENA BLAST: Apex_Viper eliminated Scavenger_Bot and harvested 12 Star Chips on boundary!` |
| c3 | `13:39:15 UTC` | `👑 MILESTONE NOTICE: User K-Snake_Master reached 2,500,000 banked chips & secured Platinum Sovereign Tier!` |

**Live ticker** (on Ticker tab only): every 5 seconds, a new entry is prepended. Templates:

1. `🎙️ LIVE EXTRACTION: [name] from [country_name] [country_flag] successfully extracted [chips] chips in Tier-05 Arena!`
2. `💥 ARENA ELIMINATION: [name] [country_flag] trapped a rival viper and claimed [chips/2] star chips!`
3. `👑 MILESTONE UPDATE: [name] [country_flag] reached a new milestone tier with [chips] chips!`
4. `🔥 HIGH STAKES ACTION: Room #04 is boiling as [name] [country_flag] enters extraction zone holding [chips] chips!`

- `[name]` = random from `COMMENTARY_NAMES`: `['Hari', 'Apex_Viper', 'Shadow_Ninja', 'Elysium_God', 'Ronin_JP', 'Brazil_King']`
- `[country]` = random from `COUNTRIES` array (full list of ~200 countries)
- `[chips]` = random 50,000–5,050,000 formatted via `toLocaleString('en-IN')`
- Max 30 entries kept

---

## 4. Tab 1: Milestone Tiers (`tab === 'milestones'`)

### 4a. Info Banner

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ PERMANENT MILESTONE IMMORTALITY                                              │
│ Whenever a player reaches a milestone target (from 1 Lakh to 1 Crore Chips), │
│ their record is permanently inscribed in the Hall of Fame for that           │
│ tournament year! Live ranks update every 30 mins.                             │
└──────────────────────────────────────────────────────────────────────────────┘
```

Styled: `rounded-xl border-yellow-500/30 bg-yellow-950/10 p-3 text-[11px] text-yellow-200 leading-relaxed`
- `PERMANENT MILESTONE IMMORTALITY` is bold (`<strong>`)

### 4b. Milestone Year Selector

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ MILESTONE YEAR: [2026 (Current)] [2025] [2024] [2023] [2022]                  │
└──────────────────────────────────────────────────────────────────────────────┘
```

- Label: `text-[10px] font-mono uppercase tracking-widest text-slate-500` → `MILESTONE YEAR:`
- Year buttons: `px-2.5 py-1 rounded-full text-[10px] font-bold font-mono transition border`
  - **Active year** (default 2026): `bg-yellow-500/20 border-yellow-500/40 text-yellow-300` → `2026 (Current)`
  - **Other years**: `border-slate-800 bg-slate-950 text-slate-500 hover:text-slate-300` → `2025`, `2024`, `2023`, `2022`

Years array: `[2026, 2025, 2024, 2023, 2022]`

### 4c. Tier Cards Grid (2 columns on lg)

Layout: `grid grid-cols-1 lg:grid-cols-2 gap-4`, `space-y-4`

**6 tier cards rendered from `HALL_OF_FAME_TIERS`:**

---

#### Card 1: 1 LAKH CHIPS MILESTONE

```
┌────────────────────────────────────────────────────────────┐
│  🥉 Bronze Elite                              Season 2026  │
│  1 LAKH CHIPS MILESTONE                                   │
│  ────────────────────────────────────────────────────────  │
│  FIRST ACHIEVER (2026)                                    │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ 🇮🇳  Rookie_Striker  ✓ Achieved!                     │ │
│  │     #IND-104 · 🕒 02 Jan 2026, 09:15 AM UTC          │ │
│  └──────────────────────────────────────────────────────┘ │
│  TOTAL QUALIFIERS THIS YEAR:     Threshold               │
│  14,209 Players                  1,00,000c                │
│  ┌──────────────────────────────────────────────────────┐ │
│  │   🏆 View Ranks #1 to #100 for 2026                  │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

- Card: `relative p-5 rounded-2xl border-slate-800 bg-slate-950/80 shadow-md flex flex-col gap-3 overflow-hidden`
- Decorative blur circle: `absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none` (aria-hidden)
- **Badge**: `text-[10px] font-mono uppercase tracking-widest text-yellow-400` → `🥉 Bronze Elite`
- **Name**: `text-sm font-bold text-white mt-1` → `1 LAKH CHIPS MILESTONE`
- **Season pill** (right-aligned): `text-[9px] font-mono text-slate-500 px-2 py-0.5 bg-slate-900 border-slate-800 rounded-full` → `Season 2026`
  - Label: `text-[10px] font-mono uppercase tracking-widest text-slate-500` → `FIRST ACHIEVER (2026)`
- **First achiever box**: `p-3 bg-slate-900/60 rounded-xl border-slate-800 flex items-center gap-3`
  - Flag square: `w-10 h-10 rounded-lg bg-gradient-to-tr from-yellow-500 to-amber-700 flex items-center justify-center text-lg` → `🇮🇳`
  - Name: `text-sm font-bold text-white truncate` → `Rookie_Striker`
  - Achieved badge: `text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border-emerald-500/30` → `✓ Achieved!` (Check icon `w-2.5 h-2.5`)
  - Tag + date: `text-[10px] font-mono text-slate-400 mt-0.5` → `#IND-104 · 🕒 02 Jan 2026, 09:15 AM UTC`
- **Stats row** (`flex items-center justify-between text-[11px] text-slate-400`):
  - Left: MicroLabel `TOTAL QUALIFIERS THIS YEAR:` then `font-mono font-bold text-yellow-400 mt-0.5` → `14,209 Players`
  - Right: MicroLabel `Threshold` then `font-mono font-bold text-emerald-400 mt-0.5` → `1,00,000c`
- **View Ranks button**: `mt-1 px-3 py-2 rounded-lg bg-slate-900 hover:bg-yellow-500/10 text-yellow-300 border-yellow-500/20 text-xs font-bold flex items-center justify-center gap-1.5` → `🏆 View Ranks #1 to #100 for 2026`

---

#### Card 2: 5 LAKH CHIPS MILESTONE

```
┌────────────────────────────────────────────────────────────┐
│  🥈 Silver Commander                           Season 2026  │
│  5 LAKH CHIPS MILESTONE                                   │
│  ────────────────────────────────────────────────────────  │
│  FIRST ACHIEVER (2026)                                    │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ 🇺🇸  Viper_Zero  ✓ Achieved!                         │ │
│  │     #USA-402 · 🕒 07 Jan 2026, 02:40 PM UTC          │ │
│  └──────────────────────────────────────────────────────┘ │
│  TOTAL QUALIFIERS THIS YEAR:     Threshold               │
│  4,810 Players                   5,00,000c                │
│  ┌──────────────────────────────────────────────────────┐ │
│  │   🏆 View Ranks #1 to #100 for 2026                  │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

- Badge: `🥈 Silver Commander`
- Name: `5 LAKH CHIPS MILESTONE`
- First Achiever: `🇺🇸 Viper_Zero` / `#USA-402` / `07 Jan 2026, 02:40 PM UTC`
- Total Qualifiers: `4,810 Players`
- Threshold: `5,00,000c`

---

#### Card 3: 10 LAKH CHIPS (1 MILLION) MILESTONE

```
┌────────────────────────────────────────────────────────────┐
│  🥇 Gold Apex Vanguard                        Season 2026  │
│  10 LAKH CHIPS (1 MILLION) MILESTONE                       │
│  ────────────────────────────────────────────────────────  │
│  FIRST ACHIEVER (2026)                                    │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ 🇰🇷  K-Snake_Master  ✓ Achieved!                     │ │
│  │     #KOR-114 · 🕒 11 Jan 2026, 06:30 AM SGT          │ │
│  └──────────────────────────────────────────────────────┘ │
│  TOTAL QUALIFIERS THIS YEAR:     Threshold               │
│  1,290 Players                   10,00,000c               │
│  ┌──────────────────────────────────────────────────────┐ │
│  │   🏆 View Ranks #1 to #100 for 2026                  │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

- Badge: `🥇 Gold Apex Vanguard`
- Name: `10 LAKH CHIPS (1 MILLION) MILESTONE`
- First Achiever: `🇰🇷 K-Snake_Master` / `#KOR-114` / `11 Jan 2026, 06:30 AM SGT`
- Total Qualifiers: `1,290 Players`
- Threshold: `10,00,000c`

---

#### Card 4: 25 LAKH CHIPS MILESTONE

```
┌────────────────────────────────────────────────────────────┐
│  💎 Platinum Sovereign                         Season 2026  │
│  25 LAKH CHIPS MILESTONE                                   │
│  ────────────────────────────────────────────────────────  │
│  FIRST ACHIEVER (2026)                                    │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ 🇺🇸  Apex_Viper  ✓ Achieved!                         │ │
│  │     #USA-882 · 🕒 16 Jan 2026, 11:10 PM UTC          │ │
│  └──────────────────────────────────────────────────────┘ │
│  TOTAL QUALIFIERS THIS YEAR:     Threshold               │
│  312 Players                     25,00,000c               │
│  ┌──────────────────────────────────────────────────────┐ │
│  │   🏆 View Ranks #1 to #100 for 2026                  │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

- Badge: `💎 Platinum Sovereign`
- Name: `25 LAKH CHIPS MILESTONE`
- First Achiever: `🇺🇸 Apex_Viper` / `#USA-882` / `16 Jan 2026, 11:10 PM UTC`
- Total Qualifiers: `312 Players`
- Threshold: `25,00,000c`

---

#### Card 5: 50 LAKH CHIPS MILESTONE

```
┌────────────────────────────────────────────────────────────┐
│  🔮 Diamond Warlord                            Season 2026  │
│  50 LAKH CHIPS MILESTONE                                   │
│  ────────────────────────────────────────────────────────  │
│  FIRST ACHIEVER (2026)                                    │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ 🇯🇵  Shadow_Ninja  ✓ Achieved!                       │ │
│  │     #JPN-309 · 🕒 19 Jan 2026, 08:22 PM JST          │ │
│  └──────────────────────────────────────────────────────┘ │
│  TOTAL QUALIFIERS THIS YEAR:     Threshold               │
│  64 Players                      50,00,000c               │
│  ┌──────────────────────────────────────────────────────┐ │
│  │   🏆 View Ranks #1 to #100 for 2026                  │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

- Badge: `🔮 Diamond Warlord`
- Name: `50 LAKH CHIPS MILESTONE`
- First Achiever: `🇯🇵 Shadow_Ninja` / `#JPN-309` / `19 Jan 2026, 08:22 PM JST`
- Total Qualifiers: `64 Players`
- Threshold: `50,00,000c`

---

#### Card 6: 1 CRORE CHIPS (10,000,000) LEGENDARY MILESTONE

```
┌────────────────────────────────────────────────────────────┐
│  👑 OMEGA IMMORTAL GOD                        Season 2026  │
│  1 CRORE CHIPS (10,000,000) LEGENDARY MILESTONE             │
│  ────────────────────────────────────────────────────────  │
│  FIRST ACHIEVER (2026)                                    │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ 🇮🇳  Hari  ✓ Achieved!                               │ │
│  │     #IND-001 · 🕒 23 Jan 2026, 05:00 PM WST          │ │
│  └──────────────────────────────────────────────────────┘ │
│  TOTAL QUALIFIERS THIS YEAR:     Threshold               │
│  3 Players                       1,00,00,000c             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │   🏆 View Ranks #1 to #100 for 2026                  │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

- Badge: `👑 OMEGA IMMORTAL GOD`
- Name: `1 CRORE CHIPS (10,000,000) LEGENDARY MILESTONE`
- First Achiever: `🇮🇳 Hari` / `#IND-001` / `23 Jan 2026, 05:00 PM WST`
- Total Qualifiers: `3 Players`
- Threshold: `1,00,00,000c`

---

### HALL_OF_FAME_TIERS Complete Data Table

| id | name | chips | badge | firstAchiever.name | firstAchiever.userTag | firstAchiever.country | firstAchiever.dateStr | totalAchieversCount |
|----|------|-------|-------|--------------------|-----------------------|----------------------|----------------------|--------------------|
| `t-1lakh` | 1 LAKH CHIPS MILESTONE | 100,000 | 🥉 Bronze Elite | Rookie_Striker | #IND-104 | IN | 02 Jan 2026, 09:15 AM UTC | 14,209 |
| `t-5lakh` | 5 LAKH CHIPS MILESTONE | 500,000 | 🥈 Silver Commander | Viper_Zero | #USA-402 | US | 07 Jan 2026, 02:40 PM UTC | 4,810 |
| `t-10lakh` | 10 LAKH CHIPS (1 MILLION) MILESTONE | 1,000,000 | 🥇 Gold Apex Vanguard | K-Snake_Master | #KOR-114 | KR | 11 Jan 2026, 06:30 AM SGT | 1,290 |
| `t-25lakh` | 25 LAKH CHIPS MILESTONE | 2,500,000 | 💎 Platinum Sovereign | Apex_Viper | #USA-882 | US | 16 Jan 2026, 11:10 PM UTC | 312 |
| `t-50lakh` | 50 LAKH CHIPS MILESTONE | 5,000,000 | 🔮 Diamond Warlord | Shadow_Ninja | #JPN-309 | JP | 19 Jan 2026, 08:22 PM JST | 64 |
| `t-1crore` | 1 CRORE CHIPS (10,000,000) LEGENDARY MILESTONE | 10,000,000 | 👑 OMEGA IMMORTAL GOD | Hari | #IND-001 | IN | 23 Jan 2026, 05:00 PM WST | 3 |

---

## 5. Tab 2: Tournament Archives (`tab === 'archives'`)

### 5a. Archive Year Selector

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [2026 (Current Live)] [2025 (Archive)] [2024 (Archive)] [2023 (Archive)] [2022 (Archive)] │
└──────────────────────────────────────────────────────────────────────────────┘
```

Same button style as Milestone Year. Active year gets `(Current Live)`, all others get `(Archive)`.
Default: `2026 (Current Live)`

### 5b. Country Leaderboard Selector

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 🌐 Country Leaderboard: [🌐 Global ▾]                                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

- Globe icon (`Globe`): `w-4 h-4 text-cyan-400`
- Label: `text-xs font-bold text-white` → `Country Leaderboard:`
- Dropdown (`<select>`): `bg-slate-950 border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono`

**COUNTRY_OPTIONS** (10 entries):

| Value | Display Text |
|-------|-------------|
| GLOBAL | 🌐 Global |
| IN | 🇮🇳 India |
| US | 🇺🇸 United States |
| JP | 🇯🇵 Japan |
| KR | 🇰🇷 South Korea |
| DE | 🇩🇪 Germany |
| BR | 🇧🇷 Brazil |
| GB | 🇬🇧 United Kingdom |
| FR | 🇫🇷 France |
| AU | 🇦🇺 Australia |

Default: `GLOBAL` (which internally falls back to `IN` for data generation)

### 5c. Section Heading + Gold Medal Badge

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 2026 Global Top 100 Ranking                     #1 Country Champion Wins     │
│                                                National Gold Medal           │
└──────────────────────────────────────────────────────────────────────────────┘
```

- H3: `text-sm font-bold text-white` → `[DYNAMIC: {archiveYear}] [DYNAMIC: countryName or "Global"] Top 100 Ranking`
- Badge (right): `text-[9px] font-mono text-amber-300 px-2 py-0.5 bg-amber-500/10 border-amber-500/30 rounded-full` → `#1 Country Champion Wins National Gold Medal`

### 5d. Top 100 Table

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ RANK  │ CHALLENGER          │ USER TAG     │ BANKED CHIPS  │ LEVEL │ ACTION              │
│───────│─────────────────────│──────────────│───────────────│───────│─────────────────────│
│ 🥇    │ 🇮🇳 Hari            │ #IND-001     │    1,00,00,000c │ 50   │ [Inspect]           │
│       │    NATIONAL CHAMP   │              │               │       │                     │
│ 🥈    │ 🇮🇳 Arjun_Viper     │ #IND-002     │      84,00,000c │ 48   │ [Inspect]           │
│ 🥉    │ 🇮🇳 Delhi_King      │ #IND-003     │      62,00,000c │ 45   │ [Inspect]           │
│ #4    │ 🇮🇳 India_Chal...   │ #IN-104      │      57,70,000c │ 44   │ [Inspect]           │
│ #5    │ 🇮🇳 India_Chal...   │ #IN-105      │      57,23,000c │ 44   │ [Inspect]           │
│  ...  │ ...                 │ ...          │ ...           │ ...   │ ...                 │
│ #100  │ 🇮🇳 India_Chal...   │ #IN-203      │          50,000c │  5   │ [Inspect]           │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

**Table header** (sticky concept, `grid grid-cols-12`): `bg-slate-950 text-slate-500 text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 border-b border-slate-800`

| Col | Header | Width | Align |
|-----|--------|-------|-------|
| col-span-1 | Rank | 1 | left |
| col-span-4 | Challenger | 4 | left |
| col-span-2 | User Tag | 2 | left |
| col-span-2 | Banked Chips | 2 | right |
| col-span-1 | Level | 1 | right |
| col-span-2 | Action | 2 | right |

**Row styling**: `px-4 py-3 text-sm hover:bg-slate-900/40`, rows divided by `divide-slate-900`
Scrollable container: `max-h-[55vh] overflow-y-auto va-scroll`

**Rank column behavior**:
- Rank 1: `🥇` + `NATIONAL CHAMP` badge (`text-[9px] font-mono font-bold text-yellow-400`)
- Rank 2: `🥈`
- Rank 3: `🥉`
- Rank 4+: `#N` in `text-slate-400 font-bold`

**Challenger column**: Country flag + name, `font-bold text-white truncate`
**User Tag**: `text-[10px] font-mono text-slate-500 truncate`
**Banked Chips**: `font-mono font-bold text-emerald-400 tabular-nums` + `c` suffix
**Level**: `text-xs text-amber-400 font-mono`
**Inspect button**: `px-2 py-1 rounded text-[10px] font-bold bg-slate-900 hover:bg-yellow-500/10 text-yellow-300 border-yellow-500/20` → `Inspect`

**Seed data** (3 named entries per country, rest procedurally generated):

| Country | Seeds |
|---------|-------|
| IN | Hari (#IND-001, 10,000,000c, lv50), Arjun_Viper (#IND-002, 8,400,000c, lv48), Delhi_King (#IND-003, 6,200,000c, lv45) |
| US | Apex_Viper (#USA-882, 9,400,000c, lv49), Cyber_Wolf (#USA-102, 7,800,000c, lv46) |
| KR | K-Snake_Master (#KOR-114, 8,900,000c, lv49) |

For countries with no seed data (JP, DE, BR, GB, FR, AU): 100 procedurally generated entries.
For seeded countries, 100 entries total (seeded + procedural fill).
All chips formatted via `toLocaleString('en-IN')`.

---

## 6. Tab 3: Live Esports Ticker (`tab === 'ticker'`)

### 6a. Channel Filter Buttons

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 📻 Channel Filter: [🌐 All Arena Events] [💰 High Stakes Extractions]        │
│                    [💥 Viper Eliminations] [👑 Milestone Breakers]             │
└──────────────────────────────────────────────────────────────────────────────┘
```

- Radio icon: `w-4 h-4 text-rose-400`
- Label: `text-xs font-bold text-white` → `Channel Filter:`

| Filter ID | Label | Active style | Inactive style |
|-----------|-------|--------------|----------------|
| `all` | 🌐 All Arena Events | `bg-rose-500/20 border-rose-500/40 text-rose-300` | `border-slate-800 bg-slate-950 text-slate-500` |
| `extractions` | 💰 High Stakes Extractions | same active | same inactive |
| `eliminations` | 💥 Viper Eliminations | same active | same inactive |
| `milestones` | 👑 Milestone Breakers | same active | same inactive |

Button style: `px-2.5 py-1 rounded-full text-[10px] font-bold transition border`
Default: `all` active

### 6b. Ticker Event List

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 13:41:02 UTC  🎙️ ESPORTS DESK: Hari from India (#IND-001) locked in a         │
│               massive extraction in Tier-05 High Stakes Arena!                 │
│ 13:40:48 UTC  💥 ARENA BLAST: Apex_Viper eliminated Scavenger_Bot and          │
│               harvested 12 Star Chips on boundary!                             │
│ 13:39:15 UTC  👑 MILESTONE NOTICE: User K-Snake_Master reached 2,500,000       │
│               banked chips & secured Platinum Sovereign Tier!                  │
└──────────────────────────────────────────────────────────────────────────────┘
```

Container: `rounded-2xl border-slate-800/60 bg-slate-950/80`, list `max-h-[55vh] overflow-y-auto va-scroll`, divided by `divide-slate-900`

- **Timestamp**: `text-[10px] font-mono text-slate-500 mt-0.5 shrink-0`
- **Event text**: `text-slate-200 leading-relaxed text-sm`
- Row hover: `hover:bg-slate-900/40 transition-colors`

[IF `filteredCommentary.length === 0` (i.e., no matching events for selected filter)]
```
│          No events in this channel yet…                                       │
```
Styled: `p-6 text-center text-xs text-slate-500`

**Filtering logic**:
- `all`: shows all entries
- `extractions`: regex `/EXTRACTION/i`
- `eliminations`: regex `/ELIMINATION/i`
- `milestones`: regex `/MILESTONE/i`

**Live update**: Every 5 seconds a new random event is prepended (when Ticker tab is active).

---

## 7. Tier Top 100 Modal (overlay, opened from "View Ranks" button)

[IF `inspectedTier` is not null — shown as fixed full-screen overlay]

```
┌════════════════════════════════════════════════════════════════════════════════┐
│ ╔════════════════════════════════════════════════════════════════════════╗   │
│ ║  🏆 [DYNAMIC: tier.name]                            Ranks 1–100    [✕] ║   │
│ ║     Target Threshold: [DYNAMIC: formatted chips]c                    ║   │
│ ╠════════════════════════════════════════════════════════════════════════╣   │
│ ║ TIER RANK │ IMMORTAL ACHIEVER        │ USER TAG    │ ACHIEVED ON          │ ║   │
│ ║           │                         │             │ QUALIFYING CHIPS │ACT│ ║   │
│ ╠═══════════╪═════════════════════════╪═════════════╪══════════════════╪═══╣   │
│ ║ 👑 #1     │ 🇮🇳 Rookie_Striker       │ #IND-104    │ 02 Jan 2026,...    │Inspec│  ║
│ ║   First   │                         │             │     1,00,000c     │  t  │  ║
│ ║ 🥇        │ [DYNAMIC: country flag] [DYNAMIC: name] │ [DYNAMIC: tag]  │ [chips]c │ [Inspect] │
│ ║ 🥈        │ ...                     │ ...         │ ...               │ ... │   ║
│ ║ 🥉        │ ...                     │ ...         │ ...               │ ... │   ║
│ ║ #4        │ ...                     │ ...         │ ...               │ ... │   ║
│ ║  ...      │                         │             │                   │     │   ║
│ ╚═══════════╧═════════════════════════╧═════════════╧══════════════════╧═══╝   │
╚════════════════════════════════════════════════════════════════════════════════╝
```

Overlay: `fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm`
Modal: `w-full max-w-4xl max-h-[85vh] rounded-2xl border-slate-800 bg-slate-900 shadow-2xl overflow-hidden flex flex-col`

**Header** (`flex items-center justify-between p-4 border-b border-slate-800`):
- **Title**: Award icon (`w-5 h-5 text-yellow-400`) + `text-lg font-black text-white` + `[DYNAMIC: inspectedTier.name]`
  - e.g., `🏆 1 LAKH CHIPS MILESTONE`
- **Subtitle**: `text-[10px] font-mono text-slate-400 mt-1` → `Target Threshold: [DYNAMIC: formatted chips]c`
  - e.g., `Target Threshold: 1,00,000c`
- **Ranks badge** (right): `text-[10px] font-mono text-yellow-300 px-2 py-0.5 bg-yellow-500/10 border-yellow-500/30 rounded-full` → `Ranks 1–100`
- **Close button** (right): `p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-800` → X icon (`w-4 h-4`), aria-label `Close`

**Table** (`w-full text-sm`, scrollable `overflow-auto va-scroll flex-1`):

Table header (sticky): `sticky top-0 bg-slate-950 text-slate-500 text-[10px] font-bold uppercase tracking-wider`

| Column | Header | Align |
|--------|--------|-------|
| Tier Rank | TIER RANK | left |
| Immortal Achiever | IMMORTAL ACHIEVER | left |
| User Tag | USER TAG | left |
| Achieved On | ACHIEVED ON | left |
| Qualifying Chips | QUALIFYING CHIPS | right |
| Action | ACTION | right |

**Row rank display**:
- Rank 1: `text-yellow-400 font-bold` → `👑 #1 First`
- Rank 2: `text-lg` → `🥇`
- Rank 3: `text-lg` → `🥈`
- Rank 4+: `text-lg` → `🥉` ... wait, rank 3 would be `🥉`. Actually the code is: `['', '🥇', '🥈', '🥉'][r.rank]` for rank <= 3 but not rank 1. So:
  - Rank 1: `👑 #1 First`
  - Rank 2: `🥇`
  - Rank 3: `🥈`
  - Rank 4+: `#[N]` in `text-slate-400 font-bold`

**Achiever column**: Country flag + name, `font-bold text-white flex items-center gap-1.5`
**User Tag**: `text-[10px] font-mono text-slate-500`
**Achieved On**: `text-[10px] font-mono text-slate-400`
**Qualifying Chips**: `text-right font-mono font-bold text-emerald-400 tabular-nums` + `c` suffix
**Inspect button**: Same style as archives Inspect button → `Inspect`

**Special case — `t-1crore` tier**: Only 3 rows (not 100):

| Rank | Name | User Tag | Country | Chips | Level | Date |
|------|------|----------|---------|-------|-------|------|
| 1 | Hari | #IND-001 | IN | 10,000,000 | 50 | 23 Jan 2026, 05:00 PM WST |
| 2 | Apex_Viper | #USA-882 | US | 10,000,000 | 49 | 24 Jan 2026, 09:11 AM UTC |
| 3 | K-Snake_Master | #KOR-114 | KR | 10,000,000 | 49 | 25 Jan 2026, 04:30 PM SGT |

**All other tiers**: 100 rows. Row 1 = firstAchiever from config. Rows 2–100 = procedurally generated from `COUNTRIES` array cycling.

---

## 8. Inspect Player Action

Both the Archives table and the Tier Modal have `Inspect` buttons. Clicking one calls `onInspectPlayer` with:

```
{
  name: [DYNAMIC],
  userTag: [DYNAMIC],
  country: [DYNAMIC],
  flag: [DYNAMIC: countryFlag(country)],
  bankedChips: [DYNAMIC],
  level: [DYNAMIC],
  clanTag: 'APEX',
  clanName: 'Viper Apex Syndicate',
  achievedAt: '26 Jul 2026, 05:42 PM UTC'
}
```

This data is passed to the parent component via the `onInspectPlayer` prop. The panel itself does not render an inspection view.

---

## Supporting Data Reference

### YEARS array
```js
[2026, 2025, 2024, 2023, 2022]
```

### COMMENTARY_NAMES array
```js
['Hari', 'Apex_Viper', 'Shadow_Ninja', 'Elysium_God', 'Ronin_JP', 'Brazil_King']
```

### COUNTRY_SEEDS (for Archives tab)

| Country | Name | User Tag | Chips | Level |
|---------|------|----------|-------|-------|
| IN | Hari | #IND-001 | 10,000,000 | 50 |
| IN | Arjun_Viper | #IND-002 | 8,400,000 | 48 |
| IN | Delhi_King | #IND-003 | 6,200,000 | 45 |
| US | Apex_Viper | #USA-882 | 9,400,000 | 49 |
| US | Cyber_Wolf | #USA-102 | 7,800,000 | 46 |
| KR | K-Snake_Master | #KOR-114 | 8,900,000 | 49 |

### Chip formatting

All chip values use `toLocaleString('en-IN')` which produces Indian numbering format (e.g., `1,00,000` not `100,000`), followed by `c` suffix.

### Icons used (lucide-react)

| Icon | Usage |
|------|-------|
| Crown | Header title |
| Sparkles | Milestone Tiers tab |
| Trophy | Tournament Archives tab + View Ranks button + Modal title |
| Radio | Live Esports Ticker tab + LIVE BROADCAST badge + Channel Filter |
| Globe | Country Leaderboard selector |
| Check | "Achieved!" badge on first achiever |
| Award | Modal tier title |
| X | Modal close button |
| Search | (imported but not used in render) |
