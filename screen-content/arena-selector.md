# Arena Selector — Exact Screen Content

**Source:** `src/components/panels/arena-selector.tsx` (491 lines) + `src/lib/game-config.ts`

---

## Loading State

```
┌──────────────────────────────────────┐
│  [4 × pulsing rounded-2xl skeleton bars]  │
│  (each h-40, bg-slate-900/60, border-     │
│   slate-800/80, animate-pulse)             │
└──────────────────────────────────────┘
```

---

## Not-Signed-In State

```
┌──────────────────────────────────────┐
│                                          │
│             Not signed in.                │
│                                          │
└──────────────────────────────────────┘
```
(Rounded-2xl card, border-slate-800/80, bg-slate-900/60, text-sm text-slate-400, centered, max-w-md mx-auto, p-8)

---

## Default View: Online Mode (isOnline = true)

Layout: 2-column grid (grid-cols-1 lg:grid-cols-12, gap-6) — Left (7/12 cols) = tier list, Right (5/12 cols) = detail card (sticky top-4).

### ── LEFT COLUMN ──

#### Header Row

```
ONLINE PVP SHARDS                        ┌─────────┐
30 tiers · 10c → 1B chips                │ 👥 Online │
                                         │ ⚔ Offline│
                                         └─────────┘
```

- **Heading:** `ONLINE PVP SHARDS` — text-sm, font-bold, uppercase, tracking-wider, text-slate-400
- **Subtitle:** `30 tiers · 10c → 1B chips` — text-xs, text-slate-500
- **Mode Toggle** (bg-slate-950, p-0.5, rounded-lg, border border-slate-800/80):
  - **Online** button: `[Users icon ⓧ3.5] Online`
    - Active: bg-indigo-600/25, text-indigo-300, border border-indigo-500/20
    - Inactive: text-slate-500, hover:text-slate-300
  - **Offline** button: `[Swords icon ⓧ3.5] Offline`
    - Active: bg-amber-600/25, text-amber-300, border border-amber-500/20
    - Inactive: text-slate-500, hover:text-slate-300
  - Both: px-3 py-1, rounded-md, text-xs, font-medium, flex items-center gap-1

#### Difficulty Filter Tabs (online mode only)

```
[Filter icon ⓧ3.5]  ALL(30)  BEGINNER(6)  MEDIUM(6)  HIGH STAKES(6)  EXTREME(6)  LEGENDARY(6)
```

Each tab:
- Active: bg-slate-800, border-slate-600, text-white
- Inactive: bg-slate-950, border-slate-800/80, text-slate-500, hover:text-slate-300, hover:border-slate-700
- Format: px-2.5 py-1, rounded-md, text-[10px], font-bold, uppercase, tracking-wider, border
- Count in parentheses: `text-slate-600`
- Tabs wrap (flex-wrap)

| Tab Label | Count | Accent Class |
|-----------|-------|-------------|
| All | (30) | text-slate-400 |
| Beginner | (6) | text-emerald-400 |
| Medium | (6) | text-amber-400 |
| High Stakes | (6) | text-rose-400 |
| Extreme | (6) | text-red-400 |
| Legendary | (6) | text-yellow-400 |

#### Jump to Highest Affordable (conditional — only shown when player can afford ≥ 1 tier)

```
⚡ Jump to highest affordable: [TIER NAME] ([BUY-IN FULL AMOUNT])
```
- text-[10px], text-emerald-400/70, hover:text-emerald-400, cursor-pointer, flex items-center gap-1
- Clicking resets difficulty filter to null ("All") and selects that tier
- Buy-in shown via `chipFull()` — e.g. `7,500c (7.5Kc)` or `300c` (no short form below 1,000)

#### Tier Card Layout (repeated for each visible tier)

```
┌─────────────────────────────────────────────────────────┐
│ [●] Scrap Alley      BEGINNER          Online     Buy-In   > │
│      The starting proving grounds...  [●] 42/1,000   10c     > │
└─────────────────────────────────────────────────────────┘
```

**Selected card:** bg-slate-800/50, border-indigo-500, shadow-md shadow-indigo-950/20
**Unselected card:** bg-slate-900, border-slate-800/80, hover:border-slate-700/80

- **Colored dot:** w-3.5 h-3.5, rounded-full, border border-white/20, filled with tier's `accentColor`. When selected: adds box-shadow glow `0 0 12px [accentColor]`.
- **Tier name:** text-sm, font-bold, text-white, group-hover:text-indigo-300, truncate
- **Difficulty badge:** text-[9px], px-1.5 py-0.5, rounded, font-bold, uppercase, tracking-wider, colored per difficulty (see badge color table below)
- **Description:** text-xs, text-slate-400, mt-1, line-clamp-1
- **"Online" label:** text-[10px], text-slate-500, uppercase, font-mono, tracking-wider
- **Live player count:** text-xs, font-bold, font-mono, text-indigo-400, with pulsing green dot (w-1.5 h-1.5, bg-emerald-500, animate-pulse)
  - Value: `[DYNAMIC: players] / [DYNAMIC: maxPlayers]` or `0 / 1,000` if stats not loaded yet
- **"Buy-In" label:** text-[10px], text-slate-500, uppercase, font-mono, tracking-wider
- **Buy-in value:** text-sm, font-bold, font-mono
  - Affordable: text-emerald-400
  - Unaffordable: text-red-400
  - 0 buy-in shows: `FREE` (text-emerald-400)
  - If buy-in ≥ 1,000: shows short form below in text-[9px] font-mono, same color at 50% opacity (e.g. `1Kc`)
- **Chevron icon (›):** w-4 h-4, text-slate-500; selected: translate-x-1, text-indigo-400

---

### ── ALL 30 ONLINE TIERS (exact data from game-config.ts) ──

#### BEGINNER (Tiers 1–6)

| # | ID | Name | Buy-In | Card Short | XP Multi | Bots | Difficulty Badge Color | Description |
|---|-----|------|--------|------------|----------|------|----------------------|-------------|
| 1 | tier-1 | Scrap Alley | 10c | 10c | x1.0 Multi | 30 | bg-emerald-500/10 border-emerald-500/30 text-emerald-400 | The starting proving grounds. Low stakes, soft competition, perfect for learning the ropes. |
| 2 | tier-2 | Rust Market | 20c | 20c | x1.1 Multi | 30 | bg-emerald-500/10 border-emerald-500/30 text-emerald-400 | A scrappy underground market arena. Slightly tougher bots patrol the dimly lit corridors. |
| 3 | tier-3 | Copper Lane | 40c | 40c | x1.2 Multi | 30 | bg-emerald-400/10 border-emerald-400/30 text-emerald-300 | Warm copper-lit corridors. Bots here move a bit faster — stay sharp. |
| 4 | tier-4 | Neon Grid | 75c | 75c | x1.5 Multi | 30 | bg-cyan-500/10 border-cyan-500/30 text-cyan-400 | A glowing synthwave arena where speed is key. Pulsing neon borders and quick bots. |
| 5 | tier-5 | Iron District | 150c | 150c | x1.8 Multi | 30 | bg-cyan-500/10 border-cyan-500/30 text-cyan-400 | Industrial zone with moderate competition and steady food flow. Iron walls glow faintly. |
| 6 | tier-6 | Bronze Arena | 300c | 300c | x2.0 Multi | 30 | bg-teal-500/10 border-teal-500/30 text-teal-400 | The final beginner tier. Solid competition — prove yourself here before advancing to medium. |

#### MEDIUM (Tiers 7–12)

| # | ID | Name | Buy-In | Card Short | XP Multi | Bots | Difficulty Badge Color | Description |
|---|-----|------|--------|------------|----------|------|----------------------|-------------|
| 7 | tier-7 | Silver Strip | 500c | 500c | x2.5 Multi | 30 | bg-amber-500/10 border-amber-500/30 text-amber-400 | A polished medium-stakes corridor with balanced competition and reliable food spawns. |
| 8 | tier-8 | Jade Corridor | 1,000c | 1Kc | x3.0 Multi | 30 | bg-amber-500/10 border-amber-500/30 text-amber-400 | Lush and dangerous. Mid-tier hunters roam freely through the jade-colored passages. |
| 9 | tier-9 | Amber Crossing | 2,000c | 2Kc | x3.5 Multi | 30 | bg-amber-400/10 border-amber-400/30 text-amber-300 | A golden intersection where fortunes shift quickly. Watch for coordinated bot ambushes. |
| 10 | tier-10 | Gold Quarter | 4,000c | 4Kc | x4.5 Multi | 30 | bg-orange-500/10 border-orange-500/30 text-orange-400 | Affluent territory with premium food density. Expect coordinated bot packs defending star chips. |
| 11 | tier-11 | Ruby Den | 7,500c | 7.5Kc | x5.5 Multi | 30 | bg-orange-500/10 border-orange-500/30 text-orange-400 | Deep red arena with aggressive predators and scarce food. Only the cunning survive here. |
| 12 | tier-12 | Sapphire Hall | 15,000c | 15Kc | x7.0 Multi | 30 | bg-rose-500/10 border-rose-500/30 text-rose-400 | Elegant but deadly. The gateway to high-stakes play — blue crystalline walls refract light. |

#### HIGH STAKES (Tiers 13–18)

| # | ID | Name | Buy-In | Card Short | XP Multi | Bots | Difficulty Badge Color | Description |
|---|-----|------|--------|------------|----------|------|----------------------|-------------|
| 13 | tier-13 | Viper Pit | 30,000c | 30Kc | x8.0 Multi | 30 | bg-rose-500/10 border-rose-500/30 text-rose-400 | The viper syndicate's den. Elite bot AI with predictive dodging starts here. |
| 14 | tier-14 | Championship Hub | 50,000c | 50Kc | x10.0 Multi | 30 | bg-pink-500/10 border-pink-500/30 text-pink-400 | Championship qualifier grounds. Extraction commission is heavily contested by skilled bots. |
| 15 | tier-15 | Emerald Court | 1,00,000c | 100Kc | x12.0 Multi | 30 | bg-pink-500/10 border-pink-500/30 text-pink-400 | A hundred-thousand buy-in. Only serious operators enter this prestigious emerald arena. |
| 16 | tier-16 | Diamond Nexus | 2,00,000c | 200Kc | x15.0 Multi | 30 | bg-violet-500/10 border-violet-500/30 text-violet-400 | Brilliant and ruthless. High-value star drops attract fierce competition from all sides. |
| 17 | tier-17 | Apex Vault | 3,50,000c | 350Kc | x18.0 Multi | 30 | bg-violet-500/10 border-violet-500/30 text-violet-400 | Three hundred fifty thousand to enter. The apex of mid-tier competition — only veterans tread here. |
| 18 | tier-18 | Obsidian Core | 7,50,000c | 750Kc | x22.0 Multi | 30 | bg-purple-500/10 border-purple-500/30 text-purple-400 | Dark and unforgiving obsidian arena. One wrong move costs hundreds of thousands — precision is key. |

#### EXTREME (Tiers 19–24)

| # | ID | Name | Buy-In | Card Short | XP Multi | Bots | Difficulty Badge Color | Description |
|---|-----|------|--------|------------|----------|------|----------------------|-------------|
| 19 | tier-19 | Crimson Abyss | 15,00,000c | 1.5Mc | x28.0 Multi | 30 | bg-purple-500/10 border-purple-500/30 text-purple-400 | A bottomless crimson arena where only the strongest survive. Bots are relentless hunters. |
| 20 | tier-20 | Shadow Realm | 30,00,000c | 3Mc | x32.0 Multi | 30 | bg-red-500/10 border-red-500/30 text-red-400 | Shrouded in darkness. Predators hunt by prediction — stay mobile or become prey. |
| 21 | tier-21 | Void Station | 50,00,000c | 5Mc | x38.0 Multi | 30 | bg-red-500/10 border-red-500/30 text-red-400 | An orbital arena floating in the void. Zero room for error at a five-million buy-in. |
| 22 | tier-22 | Phantom Reach | 1,00,00,000c | 10Mc | x45.0 Multi | 30 | bg-red-600/10 border-red-600/30 text-red-500 | Ghost-like operators compete for massive chip pools. Bots use advanced flanking tactics. |
| 23 | tier-23 | Inferno Gate | 2,00,00,000c | 20Mc | x52.0 Multi | 30 | bg-rose-600/10 border-rose-600/30 text-rose-500 | Twenty million at stake. The heat is unbearable — bots charge aggressively on sight. |
| 24 | tier-24 | Tartarus Pit | 4,00,00,000c | 40Mc | x60.0 Multi | 30 | bg-rose-600/10 border-rose-600/30 text-rose-500 | The deepest pit before legendary territory. Forty million to enter — only the elite survive. |

#### LEGENDARY (Tiers 25–30)

| # | ID | Name | Buy-In | Card Short | XP Multi | Bots | Difficulty Badge Color | Description |
|---|-----|------|--------|------------|----------|------|----------------------|-------------|
| 25 | tier-25 | Venom Grand | 7,50,00,000c | 75Mc | x70.0 Multi | 30 | bg-amber-500/10 border-amber-500/30 text-amber-400 | The grand Venom arena. Only the wealthiest operators dare challenge at this level. |
| 26 | tier-26 | Omega Station | 15,00,00,000c | 150Mc | x80.0 Multi | 30 | bg-orange-500/10 border-orange-500/30 text-orange-400 | A hundred fifty million to enter. The stakes defy comprehension — every second is worth thousands. |
| 27 | tier-27 | Singularity Core | 30,00,00,000c | 300Mc | x90.0 Multi | 30 | bg-red-500/10 border-red-500/30 text-red-400 | A gravitational singularity arena. Three hundred million at stake — nothing escapes its pull. |
| 28 | tier-28 | Eternity Vault | 50,00,00,000c | 500Mc | x100.0 Multi | 30 | bg-rose-600/10 border-rose-600/30 text-rose-500 | Time stands still in this vault. Five hundred million at play — patience or aggression? |
| 29 | tier-29 | Abyssal Throne | 75,00,00,000c | 750Mc | x120.0 Multi | 30 | bg-yellow-500/10 border-yellow-500/30 text-yellow-400 | The throne of the abyss. Seven hundred fifty million to challenge the king of the arena. |
| 30 | tier-30 | The Singularity | 1,00,00,00,000c | 1Bc | x150.0 Multi | 30 | bg-yellow-400/10 border-yellow-400/30 text-yellow-300 | The ultimate arena. One billion chips. Mythical territory where fortunes are made and destroyed in an instant. |

---

### ── RIGHT COLUMN: Selected Arena Detail Card ──

```
┌───────────────────────────────────────────────────────────┐
│  (blurred glow blob top-right, opacity-10, accentColor)        │
│                                                            │
│  [BEGINNER Match]                           TIER 1 / 30       │
│                                                            │
│  Scrap Alley                                               │
│                                                            │
│  The starting proving grounds. Low stakes, soft            │
│  competition, perfect for learning the ropes.              │
│                                                            │
│  ┌──────────────────────────────────────────┐  │
│  │ Stake Buy-In           10c                         │  │
│  │ Extraction             EXIT ANYTIME                │  │
│  │ Bot Population         30 Bots                     │  │
│  │ ───────────────────────────────────────────── │  │
│  │ [●] Live Online Players   42 / 1,000                 │  │
│  │ XP Multiplier          x1.0 Multi                  │  │
│  └──────────────────────────────────────────┘  │
│                                                            │
│  ┌───────────────────────────────────────────┐  │
│  │ 🛡 ONLINE MULTIPLAYER: High-stakes arena for up to    │  │
│  │ 1,000 players. Collect star chips from defeated       │  │
│  │ opponents and extract safely. Graduated commission:  │  │
│  │ 0% if ≤3 players, 35% if ≥4 players.                 │  │
│  └───────────────────────────────────────────┘  │
│                                                            │
│  ───────────────────────────────────────────────  │
│  ┌───────────────────────────────────────────┐  │
│  │  [▶] BUY IN ARENA (-10c)                           │  │
│  └───────────────────────────────────────────┘  │
│                                                            │
└───────────────────────────────────────────────────────────┘
```

**Card styling:** bg-slate-900, border border-slate-800, rounded-2xl, p-6, shadow-2xl, relative overflow-hidden, sticky top-4, self-start

**Glow blob:** absolute, -top-12 -right-12, w-48 h-48, rounded-full, blur-3xl, opacity-10, pointer-events-none, colored with tier's `accentColor`

**Difficulty badge (top):** text-[10px], px-2 py-1, rounded-full, font-bold, uppercase, tracking-wider, border border-transparent, `{difficulty} Match`

**Tier index badge (next to title):** text-[10px], font-mono, font-bold, text-slate-500, bg-slate-950/60, px-2 py-0.5, rounded-full, border border-slate-800 — shows `TIER {N} / 30` (only in online mode)

**Title:** text-2xl, font-bold, tracking-tight, text-white, flex items-center gap-2

**Description:** text-sm, text-slate-300, mt-2.5, leading-relaxed

**Details box:** bg-slate-950/60, p-4, rounded-xl, border border-slate-800/60, mt-6, flex flex-col gap-3

| Row | Icon | Label | Value | Value Color |
|-----|------|-------|-------|-------------|
| Stake Buy-In | Landmark | Stake Buy-In | `FREE` or `1,000c (1Kc)` | text-white |
| Extraction | Trophy | Extraction | `EXIT ANYTIME` | text-emerald-400 |
| Bot Population | Users | Bot Population | `30 Bots` | text-cyan-400 |
| Live Online Players | (pulsing green dot w-1.5 h-1.5 bg-emerald-500 animate-pulse) | Live Online Players | `[DYNAMIC: N / maxPlayers]` or `0 / 1,000` | text-indigo-400 font-semibold |
| XP Multiplier | Zap | XP Multiplier | `x1.0 Multi` | text-indigo-400 |

Live Online Players row has a border-t border-slate-900/50 separator above it (only in online mode).

**Mode warning box:** bg-indigo-950/20, border border-indigo-900/30, text-[11px], text-indigo-300, rounded-lg, p-3, mt-4, flex items-start gap-2, leading-relaxed, with Shield icon (w-4 h-4, text-indigo-400, shrink-0, mt-0.5)

#### Online mode warning text:
```
ONLINE MULTIPLAYER: High-stakes arena for up to 1,000 players.
Collect star chips from defeated opponents and extract safely.
Graduated commission: 0% if ≤3 players, 35% if ≥4 players.
```
("ONLINE MULTIPLAYER:" and both percentage values are **bold**)

#### Offline mode warning text:
```
OFFLINE PRACTICE MODE: Risk-free training
ground. Test your skills against 1,000 bots without wagering,
losing, or earning any of your banked chips!
```
("OFFLINE PRACTICE MODE:" is **bold**, bot count is dynamic from selected practice tier)

---

### ── Enter Arena Button (bottom of detail card) ──

**Container:** mt-6, pt-4, border-t border-slate-800/60

#### Online Mode — Can Afford:
```
[▶] BUY IN ARENA (-1,000c (1Kc))
```
- bg-gradient-to-r from-indigo-500 to-indigo-600, hover:from-indigo-400 hover:to-indigo-500
- text-white, shadow-lg shadow-indigo-950/30, border border-indigo-500
- w-full, py-3, rounded-xl, font-bold, text-sm, flex items-center justify-center gap-2

#### Online Mode — Cannot Afford:
```
STAKE AMOUNT EXCEEDS BANK
```
- bg-slate-950, border border-slate-800, text-slate-600, cursor-not-allowed
- Same sizing as above, no Play icon
- Clicking shows error toast: `Insufficient chips to enter this arena! Claim daily rewards or play lower stakes to rebuild.`

#### Offline Mode — Always Available:
```
[▶] START PRACTICE MODE (FREE)
```
- bg-gradient-to-r from-amber-500 to-amber-600, hover:from-amber-400 hover:to-amber-500
- text-white, shadow-lg shadow-amber-950/30, border border-amber-500

---

## Practice / Offline Mode (isOnline = false)

### What Changes vs Online:

1. **Heading** changes to: `PRACTICE ARENAS`
2. **Subtitle** changes to: `Choose your difficulty`
3. **Offline button becomes active** in toggle
4. **Difficulty filter tabs are hidden** entirely
5. **"Jump to highest affordable" link is hidden**
6. **Tier list shows 3 practice tiers** (no online player count column, no "Online" label)
7. **Default selection:** `practice-easy`

### 3 Practice Tiers (exact data from game-config.ts)

| # | ID | Name | Buy-In | Bots | XP Multi | Difficulty | Difficulty Badge Color | Description |
|---|-----|------|--------|------|----------|------------|----------------------|-------------|
| 1 | practice-easy | Easy Practice Arena | FREE | 1,000 | x0.0 Multi | Beginner | bg-emerald-500/10 border-emerald-500/30 text-emerald-400 | A relaxed learning zone. Slow speeds, simple AI behavior, and forgiving competition. |
| 2 | practice-medium | Medium Practice Arena | FREE | 1,000 | x0.0 Multi | Medium | bg-cyan-500/10 border-cyan-500/30 text-cyan-400 | Standard speed and balanced bot behavior. Moderate competition for warming up. |
| 3 | practice-hard | Hard Practice Arena | FREE | 1,000 | x0.0 Multi | High Stakes | bg-rose-500/10 border-rose-500/30 text-rose-400 | Aggressive bot hunters. Dynamic speed, tight maneuvers, and heavy competition. |

### Practice Tier Card Differences:
- No "Online" label or live player count
- Buy-In column shows `FREE` (text-emerald-400)
- No short form below (buy-in is 0)
- Detail card shows `1,000 Bots` instead of `30 Bots`
- No "TIER N / 30" index badge (tierIndex is 0 for practice)
- No "Live Online Players" row in details box
- XP Multiplier shows `x0.0 Multi`
- Warning box shows offline-specific text
- Button: `[▶] START PRACTICE MODE (FREE)` (amber gradient)

---

## Error / Toast Messages

| Trigger | Message | Type |
|---------|---------|------|
| Click "BUY IN ARENA" when unaffordable | `Insufficient chips to enter this arena! Claim daily rewards or play lower stakes to rebuild.` | error |

No other inline error messages. Network errors fetching `/api/arena-stats` are silently ignored (stats are decorative). Stats poll every 5 seconds via `setInterval` in online mode.
