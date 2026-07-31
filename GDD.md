# SNAKESTAR — Complete Game Design Document (GDD)
## Source: Venom Arena Codebase Exhaustive Catalog
### Generated: $(date -u '+%Y-%m-%d %H:%M UTC')

---

## How This Document Was Created

This GDD was created by exhaustively reading and cataloging EVERY file in the old Venom Arena project at `/tmp/venom-arena/`. Every text string, number, button label, heading, value, configuration, rule, and UI element was captured verbatim. Nothing was added from imagination.

### Source Files Cataloged (12 parts, 14,210 lines of inventory)

| Part | File(s) | Lines | Size |
|------|---------|-------|------|
| 01 | game-rules-modal.tsx | 850 | 61KB |
| 02 | game-config.ts | 1,195 | 55KB |
| 03 | game-canvas.tsx | 3,151 | 52KB |
| 04 | offline-engine.ts | 3,148 | 43KB |
| 05 | render-helpers.ts | 1,217 | 28KB |
| 06 | game-server (index.ts, game-state.ts, spatial-grid.ts) | 2,386 | 57KB |
| 07 | snake-engine.ts, game-audio.ts, types.ts, schema.prisma | 1,145 | 51KB |
| 08 | 15 panel components (11,497 lines total) | 11,497 | 63KB |
| 09 | page.tsx (main SPA shell) | 1,053 | 48KB |
| 10 | auth-gate.tsx + 11 lib/hook files | 1,855 | — |
| 11 | 43 API route files | ~2,500 | 61KB |
| 12 | requirements-checklist.md + GAP-ANALYSIS.md | 489 | 20KB |

**Total source lines cataloged: ~30,000+ lines of code**
**Total GDD inventory: 14,210 lines across 12 parts (~513KB)**

---

## Table of Contents

1. [Game Rules (from game-rules-modal.tsx)](gdd-parts/01-game-rules-modal.md)
2. [Game Configuration (from game-config.ts)](gdd-parts/02-game-config.md)
3. [Game Canvas HUD (from game-canvas.tsx)](gdd-parts/03-game-canvas.md)
4. [Offline Engine & Bot AI (from offline-engine.ts)](gdd-parts/04-offline-engine.md)
5. [Render Helpers & Visuals (from render-helpers.ts)](gdd-parts/05-render-helpers.md)
6. [Game Server (from game-server/)](gdd-parts/06-game-server.md)
7. [Core Libraries, Types & DB Schema (from snake-engine, audio, types, prisma)](gdd-parts/07-core-libs.md)
8. [All 15 Panel Components](gdd-parts/08-panels.md)
9. [Main Page Shell (from page.tsx)](gdd-parts/09-page-shell.md)
10. [Auth, Libs & Hooks](gdd-parts/10-auth-and-other.md)
11. [All 42 API Endpoints](gdd-parts/11-api-routes.md)
12. [Requirements Checklist & Gap Analysis](gdd-parts/12-requirements-and-gaps.md)

---

## Quick Reference: All User-Facing Text

### The content the user pointed out as missing is primarily in Part 01 (game-rules-modal.tsx).
It covers:
- Accounts & Getting Started (Register, Social Login, Guest Play, Chip Economy, Password Recovery, Security PIN)
- Controls (Mouse/Touch, Keyboard)
- Online Multiplayer vs Offline Practice
- Arena Tiers (30 competitive + 3 practice)
- Food Orbs & Star Chips
- Boost Mechanic
- Collision Rules
- Bot AI Behavior
- Map & Safe Spawning
- Extraction
- In-Game HUD Explained
- Tactical Challenges
- Death & Replay
- Lobby Leaderboards
- FAQ (19 items)

All of this and much more is now exhaustively cataloged in the 12 parts below.

---

---

01-game-rules-modal.md
===
# Game Rules Modal — Exhaustive Text & UI Catalog

**Source file:** `/tmp/venom-arena/src/components/modals/game-rules-modal.tsx` (851 lines)
**Component:** `GameRulesModal`
**File-level directive:** `'use client'`

---

## IMPORTS

### From `@/components/ui/dialog`
- `Dialog`
- `DialogContent`
- `DialogDescription`
- `DialogHeader`
- `DialogTitle`

### From `lucide-react` (icons, used as `<Icon className="w-4 h-4" />` or `w-3.5 h-3.5`)
- `BookOpen` — Modal header icon
- `Compass`
- `Coins`
- `Skull`
- `Shield`
- `Trophy`
- `Sparkles`
- `Users`
- `Zap`
- `AlertTriangle`
- `Target`
- `Map`
- `Bot`
- `Star`
- `Crosshair`
- `Gamepad`
- `Landmark`
- `LogIn`
- `ListTodo`
- `Crown`
- `Globe`
- `Medal`

### From `@/lib/game-config`
- `ARENA_TIERS` — Array of 30 arena tier objects (rendered dynamically in Arena Tiers table)
- `PRACTICE_TIERS` — Array of 3 practice tier objects (rendered dynamically in Practice Tiers table)
- `MILESTONE_TIERS` — Array of 8 milestone tier objects (**imported but NOT directly rendered** in this component; the milestone badge table is hardcoded inline)

---

## HELPER FUNCTION: `fmtShort(n: number): string`

[CODE COMMENT] `// ── Short-form chip formatter for tier tables ──`

Logic:
- If `n === 0` → returns string literal `'FREE'`
- Otherwise formats as `N.toLocaleString()c`
- If `n >= 1_000_000_000` → appends ` (X.XBc)`
- If `n >= 1_000_000` → appends ` (X.XMc)`
- If `n >= 1_000` → appends ` (X.XKc)`
- Suffix letters: `Kc` = kilo-chips, `Mc` = mega-chips, `Bc` = billion-chips

---

## COMPONENT PROPS: `GameRulesModalProps`

| Prop | Type | Notes |
|------|------|-------|
| `isOpen` | `boolean` | Controls Dialog open state |
| `onClose` | `() => void` | Close handler |

---

## MODAL DIALOG ROOT

### Dialog Behavior
- `open={isOpen}`
- `onOpenChange={(o) => !o && onClose()}` — only calls `onClose` when dialog closes

### DialogContent Styling
- `className`: `bg-slate-950 border-slate-800 text-slate-200 max-w-3xl max-h-[88vh] p-0 overflow-hidden`

---

## DIALOG HEADER

### Icon Container
- `className`: `w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0`
- Icon: `<BookOpen className="w-5 h-5" />`

### DialogTitle
- Text: **`VENOM ARENA — OFFICIAL GUIDE & RULES`**
- `className`: `text-base sm:text-lg font-black text-white tracking-tight`

### DialogDescription
- Text: **`Accounts, controls, modes, arena tiers, HUD, extraction, challenges, death, replay, leaderboards & FAQ`**
- `className`: `text-xs text-slate-400`

---

## SCROLLABLE CONTENT AREA

- `className`: `px-6 py-5 flex flex-col gap-5 overflow-y-auto va-scroll max-h-[calc(88vh-130px)]`

---

## HERO SECTION

[CODE COMMENT] `{/* HERO */}`

### Container
- `className`: `p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950/50 border border-emerald-500/20 relative overflow-hidden`
- Decorative blur: `absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none`

### Tag Label
- Text: **`Core Loop`**
- `className`: `text-[10px] text-emerald-400 font-mono font-bold tracking-widest block uppercase`

### Heading (h3)
- Text: **`Hunt. Harvest. Extract. Don't get caught.`**
- `className`: `text-lg font-black text-white mt-1`

### Body Paragraph
- Text: **`You spawn as a small venom snake. Grow by harvesting food orbs for score/size, and collect star chips from fallen rivals to increase your carried chips. The bigger you are, the more dangerous you become — but also the easier to cut off. Bank your winnings by extracting before someone makes you their harvest.`**
- `className`: `text-xs text-slate-300 font-sans mt-2 leading-relaxed`

---

## SECTION 0: ACCOUNTS & GETTING STARTED

[CODE COMMENT] `{/* ================================================================= */}`
[CODE COMMENT] `{/* 0. ACCOUNTS & GETTING STARTED */}`
[CODE COMMENT] `{/* ================================================================= */}`

### Section Header
- Icon: `<Landmark className="w-4 h-4" />`
- Title: **`0. ACCOUNTS & GETTING STARTED`**
- Accent: `text-emerald-400`

### Grid: 3-column layout (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3`)

#### Card 1: Register (Recommended)
- Container: `bg-emerald-950/20 border border-emerald-500/30 p-3 rounded-xl space-y-1.5`
- Label: Icon `<LogIn className="w-3.5 h-3.5" />` + text **`Register (Recommended)`** (`font-bold text-emerald-300 text-xs`)
- Bullet list (`list-disc pl-4 space-y-1 text-slate-400 text-[11px]`):
  1. **`Choose a display name (up to 20 chars)`**
  2. **`Enter a valid email + password (min 6 chars)`**
  3. **`Set a 4-digit Security PIN (needed for password recovery)`**
  4. **`Receive a unique VENOM-XXXX tag (your permanent ID)`**
  5. **`Start with 150 starter chips (free!)`**
  6. **`Your progress is saved permanently`**

#### Card 2: Social Login
- Container: `bg-violet-950/20 border border-violet-500/30 p-3 rounded-xl space-y-1.5`
- Label: Icon `<Globe className="w-3.5 h-3.5" />` + text **`Social Login`** (`font-bold text-violet-300 text-xs`)
- Bullet list:
  1. **`Sign in with Google, Facebook, or Apple`**
  2. **`No password needed — uses your existing account`**
  3. **`Also starts with 150 starter chips and a VENOM-XXXX tag`**
  4. **`If your social email matches an existing account, it links automatically`**
  5. **`You can also set a password later in Profile → Security Settings`**

#### Card 3: Guest Play
- Container: `bg-amber-950/20 border border-amber-500/30 p-3 rounded-xl space-y-1.5`
- Label: Icon `<Shield className="w-3.5 h-3.5" />` + text **`Guest Play`** (`font-bold text-amber-300 text-xs`)
- Bullet list:
  1. **`No email needed — one-click to play`**
  2. **`Also starts with 150 starter chips`**
  3. **`Gets a random VENOM-XXXX tag`**
  4. **`Guest accounts can upgrade to registered later (in Profile panel)`**
  5. **`All progress carries over when upgrading`**

### InfoCard: Chip Economy Basics
- Title: **`Chip Economy Basics`** (`text-amber-300`)
- Bullet list:
  1. **`Chips are free in-game currency — no real-world value`**
  2. **`Start with 150 chips. Earn more by: extracting from arenas, daily login rewards, chip store, or gifting from friends (+25 per friend)`**
  3. **`Buy into arenas costs chips. If you die, you lose your carried chips. If you extract, you bank them!`**
  4. **`Need more chips? Visit the Chip Store (free packs) or claim Daily Rewards`**

### InfoCard: Password Recovery (Forgot Password)
- Title: **`🔑 Password Recovery (Forgot Password)`** (`text-cyan-300`)
- Bullet list:
  1. **`On the Login page, click "Forgot Password?"`**
  2. **`Enter your registered email and your 4-digit Security PIN`**
  3. **`Set a new password (min 6 chars) and confirm it`**
  4. **`Your password is updated instantly — no email verification needed`**
  5. **`Important: If you didn't set a Security PIN during registration, password recovery is not available. Contact support or set a PIN in Profile → Security Settings before you forget your password!`**

### InfoCard: Managing Your Security PIN
- Title: **`🔒 Managing Your Security PIN`** (`text-emerald-300`)
- Bullet list:
  1. **`Your PIN is set during registration (optional but recommended)`**
  2. **`Change or set your PIN anytime in Profile → Security Settings`**
  3. **`If you already have a PIN, you must enter your current PIN before setting a new one`**
  4. **`The PIN is your only recovery method — memorize it or store it securely`**
  5. **`Guest accounts cannot set a PIN (they have no password to recover)`**

---

## SECTION 1: CONTROLS

[CODE COMMENT] `{/* ================================================================= */}`
[CODE COMMENT] `{/* 1. CONTROLS */}`
[CODE COMMENT] `{/* ================================================================= */}`

### Section Header
- Icon: `<Gamepad className="w-4 h-4" />`
- Title: **`1. CONTROLS`**
- Accent: `text-cyan-400`

### Grid: 2-column

#### InfoCard: 🖱️ Mouse / Touch
- Title: **`🖱️ Mouse / Touch`** (`text-cyan-300`)
- Body text: **`Move cursor to steer. Left-click or hold for Boost. On mobile, drag the joystick — push far for boost.`**

#### InfoCard: ⌨️ Keyboard
- Title: **`⌨️ Keyboard`** (`text-amber-300`)
- Body text: **`WASD or Arrow Keys to steer. Hold Space/Shift for Boost. Hold E for Extract.`**

---

## SECTION 2: ONLINE MULTIPLAYER VS. OFFLINE PRACTICE

[CODE COMMENT] `{/* ================================================================= */}`
[CODE COMMENT] `{/* 2. ONLINE MULTIPLAYER VS. OFFLINE PRACTICE */}`
[CODE COMMENT] `{/* ================================================================= */}`

### Section Header
- Icon: `<Users className="w-4 h-4" />`
- Title: **`2. ONLINE MULTIPLAYER VS. OFFLINE PRACTICE`**
- Accent: `text-emerald-400`

### Grid: 2-column

#### Card: Online Arena (High Stakes)
- Container: `bg-emerald-950/20 border border-emerald-500/30 p-3 rounded-xl space-y-1.5`
- Label: Icon `<Users className="w-3.5 h-3.5" />` + text **`Online Arena (High Stakes)`** (`font-bold text-emerald-300 text-xs`)
- Bullet list:
  1. **`Chip Buy-In: Deducts buy-in from your banked vault into carried match chips.`**
  2. **`Real Players: Live PvP with real opponents and leaderboard rankings.`**
  3. **`Graduated Commission: 0% if ≤3 real players, 35% if ≥4. Extract anytime.`**
  4. **`Full Death Penalty: On death, your carried chips transform into 10 stars at your last position for others to collect.`**
  5. **`Star Chips: Golden stars dropped when real players die. Each star = player's carried chips ÷ 10. Collect to increase your carried chips.`**
  6. **`XP: Earned on successful extraction only.`**
  7. **`Map: Circular boundary that breathes. Stay inside!`**
  8. **`Bots: 30 bots per tier. Self-destruct at score≥100. Bots never drop or collect stars.`**

#### Card: Offline Practice (Risk-Free)
- Container: `bg-amber-950/20 border border-amber-500/30 p-3 rounded-xl space-y-1.5`
- Label: Icon `<Target className="w-3.5 h-3.5" />` + text **`Offline Practice (Risk-Free)`** (`font-bold text-amber-300 text-xs`)
- Bullet list:
  1. **`100% FREE: Zero chip cost. No buy-in.`**
  2. **`AI Bots: 1,000 AI bots of varied sizes.`**
  3. **`No Chips / Stars / XP: Score-based leaderboard (body length), no chip economy`**
  4. **`Infinite Map: No boundaries, no wall death.`**
  5. **`No Bot Self-Destruct: Bots just harvest and dodge.`**
  6. **`Ideal for Warmups: Practice without pressure.`**

### InfoCard: 🏆 Arena Leaderboard: Online vs Offline
- Title: **`🏆 Arena Leaderboard: Online vs Offline`** (`text-yellow-300`)
- Inner grid: 2-column

#### Sub-card: Online Arena Leaderboard
- Container: `bg-emerald-950/20 border border-emerald-500/20 rounded-lg p-2.5 space-y-1`
- Label: **`Online Arena Leaderboard`** (`font-bold text-emerald-300 text-[11px]`)
- Bullet list:
  1. **`Who appears: Real players only (no bots)`**
  2. **`Sorted by: Carried Chips (highest first)`**
  3. **`Value shown: Carried chips in green (e.g., "100c")`**
  4. **`Your entry: Highlighted with indigo background + "YOU" badge`**
  5. **`Country flags: ✅ Shown next to each player name`**
  6. **`Ranking format: "#X of Y" (e.g., "#1 of 3")`**
  7. **`Empty state: Shows "No real players yet."`**

#### Sub-card: Offline Practice Leaderboard
- Container: `bg-amber-950/20 border border-amber-500/20 rounded-lg p-2.5 space-y-1`
- Label: **`Offline Practice Leaderboard`** (`font-bold text-amber-300 text-[11px]`)
- Bullet list:
  1. **`Who appears: You + nearby active bots (top 10)`**
  2. **`Sorted by: Score / body length (highest first)`**
  3. **`Value shown: Score in indigo (e.g., "42")`**
  4. **`Your entry: Highlighted with green background`**
  5. **`Country flags: ❌ Not shown`**
  6. **`Ranking format: "#X" only (e.g., "#31")`**
  7. **`Always populated: Player + bots always visible`**

---

## ARENA TIERS REFERENCE TABLE (InfoCard — not inside a Section)

[CODE COMMENT] `{/* ================================================================= */}`
[CODE COMMENT] `{/* ARENA TIERS REFERENCE TABLE */}`
[CODE COMMENT] `{/* ================================================================= */}`

### InfoCard: ⚔️ Arena Tiers — 30 Competitive Tiers (10c → 1B)
- Title: **`⚔️ Arena Tiers — 30 Competitive Tiers (10c → 1B)`** (`text-indigo-300`)
- Data source: `ARENA_TIERS` from `@/lib/game-config` (rendered via `.map()`)

#### Table Structure
- Table: `w-full text-[10px] border-collapse`

##### Arena Tiers Table Headers
| Column | Header Text |
|--------|-------------|
| 1 | `#` (left-aligned) |
| 2 | `Tier` (left-aligned) |
| 3 | `Buy-In` (left-aligned) |
| 4 | `Bots` (left-aligned) |
| 5 | `XP Multi` (left-aligned) |
| 6 | `Difficulty` (left-aligned) |

##### Arena Tiers Table Data (from `ARENA_TIERS` array, 30 rows)
Each row renders:
- `#` column: `#{i + 1}` (1-indexed), colored by `tier.accentColor`, `font-bold`
- `Tier` column: `tier.name`, colored by `tier.accentColor`, `font-bold`
- `Buy-In` column: `fmtShort(tier.buyIn)` — formatted chip string
- `Bots` column: `tier.botsCount` — number
- `XP Multi` column: `x{tier.rewardMultiplier}` — prefixed with `x`, colored `text-indigo-300`
- `Difficulty` column: `tier.difficulty` — string literal
- Row border: `border-b border-slate-900` (all except last row)

**Resolved ARENA_TIERS data (30 tiers):**

| # | Tier Name | Buy-In | Bots | XP Multi | Difficulty |
|---|-----------|--------|------|----------|------------|
| #1 | Scrap Alley | 10c | 30 | x1.0 | Beginner |
| #2 | Rust Market | 20c | 30 | x1.1 | Beginner |
| #3 | Copper Lane | 40c | 30 | x1.2 | Beginner |
| #4 | Neon Grid | 75c | 30 | x1.5 | Beginner |
| #5 | Iron District | 150c | 30 | x1.8 | Beginner |
| #6 | Bronze Arena | 300c | 30 | x2.0 | Beginner |
| #7 | Silver Strip | 500c | 30 | x2.5 | Medium |
| #8 | Jade Corridor | 1,000c (1.0Kc) | 30 | x3.0 | Medium |
| #9 | Amber Crossing | 2,000c (2.0Kc) | 30 | x3.5 | Medium |
| #10 | Gold Quarter | 4,000c (4.0Kc) | 30 | x4.5 | Medium |
| #11 | Ruby Den | 7,500c (7.5Kc) | 30 | x5.5 | Medium |
| #12 | Sapphire Hall | 15,000c (15.0Kc) | 30 | x7.0 | Medium |
| #13 | Viper Pit | 30,000c (30.0Kc) | 30 | x8.0 | High Stakes |
| #14 | Championship Hub | 50,000c (50.0Kc) | 30 | x10.0 | High Stakes |
| #15 | Emerald Court | 100,000c (100.0Kc) | 30 | x12.0 | High Stakes |
| #16 | Diamond Nexus | 200,000c (200.0Kc) | 30 | x15.0 | High Stakes |
| #17 | Apex Vault | 350,000c (350.0Kc) | 30 | x18.0 | High Stakes |
| #18 | Obsidian Core | 750,000c (750.0Kc) | 30 | x22.0 | High Stakes |
| #19 | Crimson Abyss | 1,500,000c (1.5Mc) | 30 | x28.0 | Extreme |
| #20 | Shadow Realm | 3,000,000c (3.0Mc) | 30 | x32.0 | Extreme |
| #21 | Void Station | 5,000,000c (5.0Mc) | 30 | x38.0 | Extreme |
| #22 | Phantom Reach | 10,000,000c (10.0Mc) | 30 | x45.0 | Extreme |
| #23 | Inferno Gate | 20,000,000c (20.0Mc) | 30 | x52.0 | Extreme |
| #24 | Tartarus Pit | 40,000,000c (40.0Mc) | 30 | x60.0 | Extreme |
| #25 | Venom Grand | 75,000,000c (75.0Mc) | 30 | x70.0 | Legendary |
| #26 | Omega Station | 150,000,000c (150.0Mc) | 30 | x80.0 | Legendary |
| #27 | Singularity Core | 300,000,000c (300.0Mc) | 30 | x90.0 | Legendary |
| #28 | Eternity Vault | 500,000,000c (500.0Mc) | 30 | x100.0 | Legendary |
| #29 | Abyssal Throne | 750,000,000c (750.0Mc) | 30 | x120.0 | Legendary |
| #30 | The Singularity | 1,000,000,000c (1.0Bc) | 30 | x150.0 | Legendary |

---

## PRACTICE TIERS TABLE (InfoCard — not inside a Section)

### InfoCard: 🎯 Practice Tiers (3 Free Tiers — 1,000 Bots Each)
- Title: **`🎯 Practice Tiers (3 Free Tiers — 1,000 Bots Each)`** (`text-amber-300`)
- Data source: `PRACTICE_TIERS` from `@/lib/game-config` (rendered via `.map()`)

#### Table Structure
- Table: `w-full text-[10px] border-collapse`

##### Practice Tiers Table Headers
| Column | Header Text |
|--------|-------------|
| 1 | `Tier` (left-aligned) |
| 2 | `Buy-In` (left-aligned) |
| 3 | `Bots` (left-aligned) |
| 4 | `XP Multi` (left-aligned) |
| 5 | `Difficulty` (left-aligned) |

Note: No `#` column (unlike arena tiers table).

##### Practice Tiers Table Data (from `PRACTICE_TIERS` array, 3 rows)
Each row renders:
- `Tier` column: `tier.name`, colored by `tier.accentColor`, `font-bold`
- `Buy-In` column: static string `FREE` (colored `text-emerald-300`)
- `Bots` column: `tier.botsCount`
- `XP Multi` column: `x{tier.rewardMultiplier}`, colored `text-slate-500`
- `Difficulty` column: `tier.difficulty`
- Row border: `border-b border-slate-900` (all except last row)

**Resolved PRACTICE_TIERS data (3 tiers):**

| Tier Name | Buy-In | Bots | XP Multi | Difficulty |
|-----------|--------|------|----------|------------|
| Easy Practice Arena | FREE | 1000 | x0.0 | Beginner |
| Medium Practice Arena | FREE | 1000 | x0.0 | Medium |
| Hard Practice Arena | FREE | 1000 | x0.0 | High Stakes |

---

## SECTION 3: FOOD ORBS & STAR CHIPS

[CODE COMMENT] `{/* ================================================================= */}`
[CODE COMMENT] `{/* 3. FOOD ORBS & STAR CHIPS */}`
[CODE COMMENT] `{/* ================================================================= */}`

### Section Header
- Icon: `<Coins className="w-4 h-4" />`
- Title: **`3. FOOD ORBS & STAR CHIPS`**
- Accent: `text-amber-400`

### Intro Paragraph
- Text: **`Two types of collectibles exist on the arena floor:`**

### Grid: 2-column

#### InfoCard: 🟢 Food Orbs (3 sizes)
- Title: **`🟢 Food Orbs (3 sizes)`** (`text-emerald-300`)
- Bullet list:
  1. **`Small: 1 point, green glow (93% chance — very common)`**
  2. **`Medium: 3 points, blue glow (4% chance)`**
  3. **`Large: 5 points, pink glow (3% chance — rare)`**
- Body text: **`Eating food increases score and body length. Growth rate is 1/4 of food value. ALL snakes eat food orbs. Food orbs do NOT affect carried chips.`**

#### InfoCard: 💀 Death Food Orbs (Body Drop)
- Title: **`💀 Death Food Orbs (Body Drop)`** (`text-rose-300`)
- Bullet list:
  1. **`When any snake (bot or player) dies from collision, their body transforms into food orbs scattered along the body path.`**
  2. **`Total food value = the dead snake's entire score, broken into S/M/L orbs.`**
  3. **`Large (5pts, pink): score ÷ 5. Medium (3pts, blue): remainder ÷ 3. Small (1pt, green): whatever's left.`**
  4. **`Example: A snake with score 23 dies → 4 large (4×5=20), 1 medium (1×3=3), 0 small. Total = 23 ✓`**
  5. **`ALL snakes (players + bots) can eat death food → increases score/size only.`**
  6. **`Wall death: NO food orbs drop at all (score is destroyed to prevent edge farming).`**
  7. **`Death food orbs are completely separate from stars — food affects score/size, stars affect carried chips.`**

#### InfoCard: ⭐ Star Chips (Chip Fragments from Death)
- Title: Icon `<Star className="w-3.5 h-3.5 text-amber-400 inline" />` + text **`Star Chips (Chip Fragments from Death)`** (`text-amber-300`)
- Bullet list:
  1. **`A player enters the arena with their buy-in chips. During the match, collecting stars from dead opponents increases their carried chips (buy-in + star value collected). This total is shown above the player's head.`**
  2. **`Carried Chips = buy-in chips + collected star value. Food orbs and boost do NOT affect carried chips — they only affect score and size.`**
  3. **`When a real player dies, their carried chips transform into exactly 10 stars at the player's last position. Stars do NOT scatter or spread on the map.`**
  4. **`Each star's value = carried chips ÷ 10. All 10 stars have the same value.`**
  5. **`Example: If your carried chips are 275c when you die → each star = 275 ÷ 10 = 27.5c. 10 stars × 27.5c = 275c total.`**
  6. **`Only real players can collect stars. Bots cannot see, touch, or collect stars.`**
  7. **`Collecting a star adds its chip value to your carried chips (not score).`**
  8. **`Bots never drop stars on death — they vanish cleanly.`**

---

## SECTION 4: BOOST MECHANIC

[CODE COMMENT] `{/* ================================================================= */}`
[CODE COMMENT] `{/* 4. BOOST MECHANIC */}`
[CODE COMMENT] `{/* ================================================================= */}`

### Section Header
- Icon: `<Zap className="w-4 h-4" />`
- Title: **`4. BOOST MECHANIC`**
- Accent: `text-cyan-400`

### Grid: 2-column

#### InfoCard: How Boost Works
- Title: **`How Boost Works`** (`text-cyan-300`)
- Bullet list:
  1. **`Hold Space / Left-click / Boost button`**
  2. **`Speed: 4.5 → 8.0 (nearly 2x faster)`**
  3. **`~3 times per second, tail drops a food orb (continuous trail)`**
  4. **`Snake shrinks by 1 segment per drop`**
  5. **`Need >8 body segments to boost`**
  6. **`Earned mass required: Must have eaten food first (score above starting score)`**

#### InfoCard: Strategy Tips
- Title: **`Strategy Tips`** (`text-rose-300`)
- Bullet list:
  1. **`Use to cut off rivals or escape danger`**
  2. **`Boosting burns earned mass faster than eating grows it`**
  3. **`Dropped food orbs can be collected by anyone`**
  4. **`Cannot boost at starting score — eat food first!`**

---

## SECTION 5: COLLISION RULES

[CODE COMMENT] `{/* ================================================================= */}`
[CODE COMMENT] `{/* 5. COLLISION RULES */}`
[CODE COMMENT] `{/* ================================================================= */}`

### Section Header
- Icon: `<Crosshair className="w-4 h-4" />`
- Title: **`5. COLLISION RULES`**
- Accent: `text-rose-400`

### InfoCard: Head-to-Body Collision
- Title: **`Head-to-Body Collision`** (`text-rose-300`)
- Body text: **`If your head hits another snake's body, YOU die. Your body transforms into food orbs spread along your body path. If you had carried chips, 10 stars appear at your last position.`**
- Additional text: **`Neck protection: First 5 segments behind a head cannot kill (prevents unfair "neck touch").`**

### InfoCard: Head-on Collision (Head vs Head)
- Title: **`Head-on Collision (Head vs Head)`** (`text-amber-300`)
- Bullet list:
  1. **`Neither boosting: Larger wins, smaller dies`**
  2. **`Smaller boosting, larger steady: Smaller survives!`**
 3. **`Both boosting: Larger wins`**
 4. **`Tie: Both die`**

### InfoCard: Map Boundary (Online Only)
- Title: **`Map Boundary (Online Only)`** (`text-emerald-300`)
- Bullet list:
  1. **`Going outside the circular map = instant death. Boundary gently breathes (±40px).`**
  2. **`Food Orbs: NONE — score is completely destroyed (prevents edge farming).`**
  3. **`Stars: YES — if player had carried chips > 0, exactly 10 stars drop at death position. Other players can collect them.`**
  4. **`Player loses everything: Both score and carried chips are gone.`**
  5. **`Bot wall death: Vanish cleanly — 0 food, 0 stars (bots never carry chips).`**

---

## SECTION 6: BOT AI BEHAVIOR

[CODE COMMENT] `{/* ================================================================= */}`
[CODE COMMENT] `{/* 6. BOT AI BEHAVIOR */}`
[CODE COMMENT] `{/* ================================================================= */}`

### Section Header
- Icon: `<Bot className="w-4 h-4" />`
- Title: **`6. BOT AI BEHAVIOR`**
- Accent: `text-violet-400`

### Grid: 2-column

#### InfoCard: Harvesting Mode
- Title: **`Harvesting Mode`** (`text-violet-300`)
- Bullet list:
  1. **`Seek nearest food orbs`**
  2. **`Dodge players (predictive — 8 ticks ahead)`**
  3. **`Avoid body segments (150px range)`**
  4. **`Turn away from map boundary`**
  5. **`Never boost, never collect stars`**

#### InfoCard: Self-Destruct (Online Only)
- Title: **`Self-Destruct (Online Only)`** (`text-rose-300`)
- Bullet list:
  1. **`Triggered at score ≥100`**
  2. **`Navigate toward wall slowly`**
  3. **`NEVER boost`**
  4. **`Still collect food on the way`**
  5. **`Wall death = vanish cleanly (0 food, 0 stars)`**

---

## SECTION 7: MAP & SAFE SPAWNING

[CODE COMMENT] `{/* ================================================================= */}`
[CODE COMMENT] `{/* 7. MAP & SAFE SPAWNING */}`
[CODE COMMENT] `{/* ================================================================= */}`

### Section Header
- Icon: `<Map className="w-4 h-4" />`
- Title: **`7. MAP & SAFE SPAWNING`**
- Accent: `text-emerald-400`

### Grid: 2-column (3 cards)

#### InfoCard: Online Map
- Title: **`Online Map`** (`text-emerald-300`)
- Bullet list:
  1. **`Circular arena (breathes ±40px over 10s)`**
  2. **`Radius scales with player count`**
  3. **`Outside boundary = death`**

#### InfoCard: Offline Map
- Title: **`Offline Map`** (`text-amber-300`)
- Bullet list:
  1. **`Infinite — no boundaries, no wall death`**
  2. **`Roam freely in any direction`**

#### InfoCard: Safe Spawning
- Title: **`Safe Spawning`** (`text-cyan-300`)
- Bullet list:
  1. **`500px from every other snake`**
  2. **`500px inside map boundary (online)`**
  3. **`4s spawn protection (invulnerable)`**

---

## SECTION 8: EXTRACTION

[CODE COMMENT] `{/* ================================================================= */}`
[CODE COMMENT] `{/* 8. EXTRACTION */}`
[CODE COMMENT] `{/* ================================================================= */}`

### Section Header
- Icon: `<Trophy className="w-4 h-4" />`
- Title: **`8. EXTRACTION`**
- Accent: `text-amber-400`

### Grid: 2-column

#### InfoCard: How to Extract
- Title: **`How to Extract`** (`text-amber-300`)
- Bullet list:
  1. **`Hold E key or EXTRACT button`**
  2. **`3-second progress bar — forward gliding is allowed`**
  3. **`Steering restarts progress to 0% — you can glide forward naturally, but any direction change (even slight) resets the timer`**
  4. **`A white-to-green progress ring appears near your snake head — only visible to you, other players cannot see it`**
  5. **`Extract anytime — no minimum threshold`**
  6. **`Extract anywhere — no zone restriction`**

#### InfoCard: Commission
- Title: **`Commission`** (`text-rose-300`)
- Bullet list:
  1. **`≤3 real players: 0% (keep 100%)`**
  2. **`≥4 real players: 35% (keep 65%)`**
  3. **`Rate shown live on HUD`**

### InfoCard: Extraction UI Elements
- Title: **`Extraction UI Elements`** (`text-cyan-300`)
- Bullet list:
  1. **`Top-center hint: "Hold E or press the button below to cash out safely!" — always visible while playing`**
  2. **`Progress popup: When extracting, a bar fills 0→100% with amber gradient. Commission rate shown below`**
  3. **`Movement flash: If you move during extraction, a red "⚠ MOVEMENT DETECTED — Extraction restarted!" warning flashes`**
  4. **`EXTRACT button: Bottom-right circular button (80px). Shows percentage while extracting, turns green when active`**
  5. **`BOOST button: Adjacent circular button (64px, amber). Hold to boost. Must have 8+ body segments and earned mass`**

---

## SECTION 9: IN-GAME HUD EXPLAINED

[CODE COMMENT] `{/* ================================================================= */}`
[CODE COMMENT] `{/* 9. IN-GAME HUD EXPLAINED */}`
[CODE COMMENT] `{/* ================================================================= */}`

### Section Header
- Icon: `<Gamepad className="w-4 h-4" />`
- Title: **`9. IN-GAME HUD EXPLAINED`**
- Accent: `text-indigo-400`

### Grid: 2-column

#### InfoCard: Top-Left: Status Cards
- Title: **`Top-Left: Status Cards`** (`text-emerald-300`)
- Bullet list:
  1. **`Carried Chips (online only): Green card showing total carried chips with "c" suffix. Starts at buy-in amount, increases when you collect star chips from dead players. Hidden in offline mode`**
  2. **`Stars Earned (online only): Amber card showing extra chips earned from collecting star collectibles (Carried Chips − Buy-In)`**
  3. **`Stars in Arena (online only): Shows how many golden star collectibles are currently on the arena floor (drops when real players die, decreases when collected)`**
  4. **`Rank: Yellow trophy icon + arena rank number`**
  5. **`Score: Purple shield icon + snake body length`**
  6. **`Kills: Red skull icon + opponents eliminated`**
  7. **`Boost: Amber zap icon + "SPACE" reminder`**
  8. **`Active Competitors: "Real Players: N Active" (pulsing indigo) or "Offline Mode: 1 Player" (amber)`**

#### InfoCard: Top-Right: Network & Leaderboard
- Title: **`Top-Right: Network & Leaderboard`** (`text-cyan-300`)
- Bullet list:
  1. **`Banked Chips: Amber card showing vault balance (deducts buy-in on match start)`**
  2. **`FPS / Ping: Frames per second + latency in ms. Color-coded. "LQ" badge if low quality`**
  3. **`Chat / Minimap: Below banked card. Chat opens message dialog. Minimap toggles radar`**
  4. **`Arena Leaders (Online): Collapsible top-10 leaderboard of real players only. Sorted by carried chips (e.g., "100c" in green). Shows player name, country flag, carried chips. Your entry highlighted with "YOU" badge in indigo. Shows "No real players yet." if you're the only one`**
  5. **`Arena Leaders (Offline): Top-10 of you + nearby active bots. Sorted by score (body length, shown in indigo). Your entry highlighted in green. No country flags shown`**

#### InfoCard: Bottom-Left: Quick Chat Emotes
- Title: **`Bottom-Left: Quick Chat Emotes`** (`text-violet-300`)
- Bullet list:
  1. **`5 emotes: GG! 🏆, Target! 🎯, Flee! 🏃💨, Ripped! 💪, Extracting! ⚡`**
  2. **`Keyboard shortcuts: Keys 1-5 for instant emotes`**
  3. **`Emotes appear as chat bubbles above snake head for 4 seconds`**

#### InfoCard: Bottom-Right: Action Buttons
- Title: **`Bottom-Right: Action Buttons`** (`text-amber-300`)
- Bullet list:
  1. **`BOOST: 64px amber circle. Hold to activate`**
  2. **`EXTRACT: 80px green circle. Hold to extract. Shows % during extraction`**
  3. **`EXIT: Small pill button at far-left bottom. Leaves match (forfeits carried chips online)`**

### InfoCard: Overlays & Indicators
- Title: **`Overlays & Indicators`** (`text-rose-300`)
- Bullet list:
  1. **`Reconnecting: Amber pill at top-center with Wifi icon`**
  2. **`Minimap: Bottom-left circular radar (toggle M key). Player, food, boundary`**
  3. **`Full Map: Press M for full-screen arena map`**
  4. **`Commission indicator: Rate shown below extraction progress bar`**

---

## SECTION 10: TACTICAL CHALLENGES

[CODE COMMENT] `{/* ================================================================= */}`
[CODE COMMENT] `{/* 10. TACTICAL CHALLENGES */}`
[CODE COMMENT] `{/* ================================================================= */}`

### Section Header
- Icon: `<ListTodo className="w-4 h-4" />`
- Title: **`10. TACTICAL CHALLENGES`**
- Accent: `text-emerald-400`

### Intro Paragraph
- Text: **`Tactical Challenges are daily and weekly missions that reward bonus chips for completing specific in-game objectives. View them in the right sidebar of the Lobby Headquarters. Challenges scale with your level — as you grow, missions get harder but pay more.`**

### InfoCard: Challenge Level Tiers
- Title: **`Challenge Level Tiers`** (`text-emerald-300`)
- Grid: 4-column (`grid-cols-2 sm:grid-cols-4 gap-2`)

#### Tier Card: Novice
- Container: `bg-emerald-950/30 border border-emerald-500/20 p-2 rounded-lg text-center`
- Label: **`Novice`** (`text-[10px] font-bold text-emerald-400 uppercase`)
- Level: **`Level 1–5`** (`text-[10px] text-slate-500`)
- Reward: **`×1.0 reward`** (`text-[10px] text-slate-400`)

#### Tier Card: Operative
- Container: `bg-cyan-950/30 border border-cyan-500/20 p-2 rounded-lg text-center`
- Label: **`Operative`** (`text-[10px] font-bold text-cyan-400 uppercase`)
- Level: **`Level 6–15`** (`text-[10px] text-slate-500`)
- Reward: **`×1.5 reward`** (`text-[10px] text-slate-400`)

#### Tier Card: Veteran
- Container: `bg-amber-950/30 border border-amber-500/20 p-2 rounded-lg text-center`
- Label: **`Veteran`** (`text-[10px] font-bold text-amber-400 uppercase`)
- Level: **`Level 16–30`** (`text-[10px] text-slate-500`)
- Reward: **`×2.5 reward`** (`text-[10px] text-slate-400`)

#### Tier Card: Elite
- Container: `bg-red-950/30 border border-red-500/20 p-2 rounded-lg text-center`
- Label: **`Elite`** (`text-[10px] font-bold text-red-400 uppercase`)
- Level: **`Level 31+`** (`text-[10px] text-slate-500`)
- Reward: **`×4.0 reward`** (`text-[10px] text-slate-400`)

### Grid: 2-column (Daily vs Weekly)

#### Card: Daily Challenges (3 per day)
- Container: `bg-emerald-950/20 border border-emerald-500/30 p-3 rounded-xl space-y-1.5`
- Label: Icon `<Zap className="w-3.5 h-3.5" />` + text **`Daily Challenges (3 per day)`** (`font-bold text-emerald-300 text-xs`)
- Bullet list:
  1. **`3 new challenges every day (UTC midnight reset)`**
  2. **`Always 3 different categories (no duplicates in same day)`**
  3. **`Anti-repeat: yesterday's challenges are excluded`**
  4. **`Objectives include: kills, extractions, star collection, score (body length), arena entries, survival time, and extraction streaks`**
  5. **`Rewards scale with your level tier (×1.0 to ×4.0)`**

#### Card: Weekly Challenges (2 per week)
- Container: `bg-violet-950/20 border border-violet-500/30 p-3 rounded-xl space-y-1.5`
- Label: Icon `<Star className="w-3.5 h-3.5" />` + text **`Weekly Challenges (2 per week)`** (`font-bold text-violet-300 text-xs`)
- Bullet list:
  1. **`2 new challenges every Monday (UTC weekly reset)`**
  2. **`Always 2 different categories`**
  3. **`Anti-repeat: last week's challenges are excluded`**
  4. **`Higher difficulty with bigger scaled rewards`**
  5. **`Must claim before the week ends!`**

### InfoCard: 🔥 Streak Bonus System
- Title: **`🔥 Streak Bonus System`** (`text-amber-300`)
- Intro paragraph: **`Complete and claim ALL daily challenges for consecutive days to build a streak:`**
- Bullet list:
  1. **`3-day streak → ×1.5 reward bonus on all challenge claims`**
  2. **`7-day streak → ×2.0 reward bonus`**
  3. **`14-day streak → ×3.0 reward bonus`**
  4. **`Missing a day resets your streak to 0`**
  5. **`Your current streak and multiplier are shown in the challenges panel header`**

---

## SECTION 11: DEATH & REPLAY

[CODE COMMENT] `{/* ================================================================= */}`
[CODE COMMENT] `{/* 11. DEATH & REPLAY */}`
[CODE COMMENT] `{/* ================================================================= */}`

### Section Header
- Icon: `<Skull className="w-4 h-4" />`
- Title: **`11. DEATH & REPLAY`**
- Accent: `text-rose-400`

### InfoCard: When You Die
- Title: **`When You Die`** (`text-rose-300`)
- Bullet list:
  1. **`Body transforms to food orbs spread along your body path`**
  2. **`Food values sum to exactly your total score`**
  3. **`10 golden star chips appear at your death position if you had carried chips`**
  4. **`Anyone can collect your dropped food/stars`**
  5. **`Killed by real player → View Profile / Add Friend / Add Rival buttons`**

### InfoCard: Death Replay (15s Before + 15s After)
- Title: **`Death Replay (15s Before + 15s After)`** (`text-cyan-300`)
- Bullet list:
  1. **`15s before death (circular buffer)`**
  2. **`15s after death (shows food being collected)`**
  3. **`Camera stays on death food, then follows first collector`**
  4. **`Controls: Play/Pause, Speed, Zoom, Restart`**
  5. **`Progress bar with death marker`**

---

## SECTION 12: LOBBY LEADERBOARDS

[CODE COMMENT] `{/* ================================================================= */}`
[CODE COMMENT] `{/* 12. LOBBY LEADERBOARDS */}`
[CODE COMMENT] `{/* ================================================================= */}`

### Section Header
- Icon: `<Crown className="w-4 h-4" />`
- Title: **`12. LOBBY LEADERBOARDS`**
- Accent: `text-amber-400`

### InfoCard: What is the Lobby Leaderboard?
- Title: **`What is the Lobby Leaderboard?`** (`text-amber-300`)
- Body text: **`The lobby houses three levels of official tournament leaderboards, all database-backed and real-time. Your rank reflects your lifetime banked chips across all matches.`**

### InfoCard: Your Rank Summary Card
- Title: **`Your Rank Summary Card`** (`text-amber-300`)
- Body text: **`At the top of the leaderboard tab, a prominent card always shows your position at a glance:`**
- Bullet list:
  1. **`Global Rank — Your position among all players worldwide`**
  2. **`National Rank — Your rank within your country`**
  3. **`Country — Your registered nation (flag + name)`**
  4. **`Milestone Tier — Your current badge (see below)`**
  5. **`Banked Chips — Your total lifetime banked chips`**

### InfoCard: Level 3: World Summit & Global
- Title: **`Level 3: World Summit & Global`** (`text-amber-300`)
- Body paragraph 1: **`World Summit — Shows the #1 ranked player from each country, sorted by banked chips. Only one champion per nation.`**
- Body paragraph 2: **`Global Rankings — Top 100 players worldwide sorted by banked chips. Each row shows: Global Rank, Player name + Ledger Tag + Country flag, Milestone Badge, and Banked Chips.`**
- Body paragraph 3: **`If you're in the list, the page auto-scrolls to your "YOU" row.`**

### InfoCard: Level 2: National Boards
- Title: **`Level 2: National Boards`** (`text-cyan-300`)
- Body text: **`Choose from 197 supported countries via dropdown + search. Shows the top 100 players from that country, sorted by banked chips. Columns: National Rank, Player name + Tag, Level, Banked Chips.`**

### InfoCard: 🏅 Milestone Badge System — What Are These Badges?
- Title: **`🏅 Milestone Badge System — What Are These Badges?`** (`text-yellow-300`)
- Body paragraph 1: **`Every player is assigned a Milestone Badge based on their lifetime banked chips. This badge appears beside your name on the Global View leaderboard, in your "Your Rank" summary card, and in the Player Inspector.`**
- Bullet list:
  1. **`Badges automatically upgrade when your banked chips cross a threshold — no action needed.`**
  2. **`Badges can downgrade if your banked chips fall below a tier's requirement (e.g., by buying into arenas and dying without extracting).`**
  3. **`Your tier is always calculated from your current banked chip balance in real-time.`**
  4. **`Only extracted chips count — carried chips lost in-arena do NOT contribute.`**

#### Milestone Badge Table (hardcoded, NOT from MILESTONE_TIERS import)
- Table: `w-full text-[10px] border-collapse`

##### Table Headers
| Column | Header Text |
|--------|-------------|
| 1 | `Badge` (left-aligned) |
| 2 | `Tier Name` (left-aligned) |
| 3 | `Min. Banked Chips` (left-aligned) |
| 4 | `Description` (left-aligned) |

##### Table Rows (7 rows)

| Badge | Tier Name | Min. Banked Chips | Description | Badge Color (hex) |
|-------|-----------|-------------------|-------------|-------------------|
| 🛡️ Rookie | Challenger | 0 — 99,999 | Starting tier for all new players. Just getting started! | #64748b |
| 🥉 Bronze | Bronze Elite | 100K+ (1 Lakh) | First milestone. Proven arena survival skills. | #b45309 |
| 🥈 Silver | Silver Commander | 500K+ (5 Lakhs) | Consistent extractor with strategic awareness. | #cbd5e1 |
| 🥇 Gold | Gold Apex Vanguard | 1M+ (10 Lakhs) | Elite player — top-tier extraction machine. | #f59e0b |
| 💎 Platinum | Platinum Sovereign | 2.5M+ (25 Lakhs) | Arena dominator — feared by rivals. | #22d3ee |
| 🔮 Diamond | Diamond Warlord | 5M+ (50 Lakhs) | Legendary status — a true warlord of the arena. | #06b6d4 |
| 👑 Omega | Omega Legend | 10M+ (1 Crore) | The pinnacle. Ultimate venom arena champion. | #fbbf24 |

Row styling note: All rows except the last have `border-b border-slate-900`. Badge and Tier Name cells are `font-bold` and colored by their hex value. Min. Banked Chips and Description cells are `text-slate-400`.

### InfoCard: Level 1: Milestone Tier Ranks
- Title: **`Level 1: Milestone Tier Ranks`** (`text-yellow-300`)
- Intro paragraph: **`Filter by milestone tier using the badge buttons:`**
- Bullet list:
  1. **`⭐ All Tiers — Every ranked player`**
  2. **`🛡️ Rookie / Challenger — Players below 100K banked chips`**
  3. **`🥉 Bronze Elite — 100K+ banked chips`**
  4. **`🥈 Silver Commander — 5 Lakh (500K+) banked chips`**
  5. **`🥇 Gold Apex Vanguard — 10 Lakh (1M+) banked chips`**
  6. **`💎 Platinum Sovereign — 25 Lakh (2.5M+) banked chips`**
  7. **`🔮 Diamond Warlord — 50 Lakh (5M+) banked chips`**
  8. **`👑 Omega Legend — 1 Crore (10M+) banked chips`**

### InfoCard: Empty Boards & Demo Rows
- Title: **`Empty Boards & Demo Rows`** (`text-slate-300`)
- Body text: **`If no players have reached a particular tier or country board yet, you'll see an encouraging message and a demo row (clearly labeled) showing how the leaderboard will look once players qualify.`**

### InfoCard: Player Inspector
- Title: **`Player Inspector`** (`text-indigo-300`)
- Body text: **`Click any player row to open their profile inspector. Currently shows demo data for clan, career stats, match history, and loadout. Real data will populate as the game economy develops. Ranks shown are always real from the leaderboard.`**

### InfoCard: Auto-Refresh
- Title: **`Auto-Refresh`** (`text-emerald-300`)
- Body text: **`Leaderboards auto-refresh every 30 minutes. Click the Refresh button to fetch the latest data immediately. "Last sync" timestamp shows when data was last fetched.`**

---

## SECTION 13: FAQ

[CODE COMMENT] `{/* ================================================================= */}`
[CODE COMMENT] `{/* 13. FAQ */}`
[CODE COMMENT] `{/* ================================================================= */}`

### Section Header
- Icon: `<AlertTriangle className="w-4 h-4" />`
- Title: **`13. FAQ`**
- Accent: `text-purple-400`

### FAQ Items (19 total, rendered via `FaqItem` component)
Each FAQ item displays:
- Question: prefixed with **`Q.`** (in `text-emerald-400 font-mono`), question text in `text-xs font-bold text-white`
- Answer: in `text-[11.5px] text-slate-400 mt-1.5 leading-relaxed pl-5`

| # | Question (Q) | Answer (A) |
|---|---------------|------------|
| 1 | **`Do I lose my banked vault chips if I crash?`** | `No! Your banked vault chips are 100% safe. You only lose the buy-in chips carried in that specific match.` |
| 2 | **`What is the graduated commission?`** | `If ≤3 real players are in the arena, extraction is FREE (0%). If ≥4 real players, 35% commission applies (you keep 65%).` |
| 3 | **`Why did my extraction restart from 0%?`** | `Any steering (changing direction) while extracting resets the 3-second progress to 0%. Forward gliding is natural and allowed — just don't turn!` |
| 4 | **`What is the green ring near extracting players?`** | `When YOU are extracting, a white-to-green progress ring appears near your snake head. It's private — only you can see your own extraction ring.` |
| 5 | **`Can I Play Again if I don't have enough chips?`** | `No. Play Again checks your banked vault balance before letting you rejoin. If you don't have enough chips for the buy-in, you'll see an error and need to earn more chips first.` |
| 6 | **`Can I extract at any time?`** | `Yes! No minimum chip threshold and no zone restriction. Extract from anywhere on the map.` |
| 7 | **`What happens to bots at score 100?`** | `(Online only) They enter self-destruct: slowly navigate toward the wall without boosting, collecting food on the way. Wall death = vanish cleanly.` |
| 8 | **`Is this gambling?`** | `No. Chips are free in-game soft currency with no real-world value. The buy-in is a gameplay risk mechanic, not a wager.` |
| 9 | **`How does anti-cheat work?`** | `Server is authoritative. All chip creation, food eating, collisions, extraction computed server-side. Client only sends steering input.` |
| 10 | **`Do challenge missions carry over?`** | `No. Daily missions reset every day at UTC midnight. Weekly missions reset every Monday at UTC midnight. Complete and claim before the period ends!` |
| 11 | **`Can I claim a mission reward twice?`** | `No. Each mission can only be claimed once per period. The server prevents double-claiming — even if you refresh or use a different browser.` |
| 12 | **`Do I earn XP when I die?`** | `No. XP is only earned on successful extraction. Dying forfeits your carried chips and awards 0 XP. Extract safely to earn XP!` |
| 13 | **`How does the Watch Video reward work?`** | `After a match ends, click the Watch Video button on the results screen. A 5-second ad plays, then you claim +50 free chips. One ad reward per 60 seconds cooldown.` |
| 14 | **`What are the milestone badges (Rookie, Bronze, Silver, Gold, Platinum, Diamond, Omega)?`** | `Milestone badges represent your lifetime achievement level. They are automatically assigned based on your total banked chips: Rookie (0-99K), Bronze (100K+), Silver (500K+), Gold (1M+), Platinum (2.5M+), Diamond (5M+), Omega (10M+). Your badge upgrades instantly when you cross a threshold, and can downgrade if your banked chips drop below the requirement.` |
| 15 | **`Can I lose my milestone badge?`** | `Yes. Your badge is calculated from your current banked chip balance in real-time. If you buy into an arena with a high buy-in and die (losing those chips), your banked balance may drop below your tier threshold, causing a downgrade. Only extracted chips count!` |
| 16 | **`How do I reset my password if I forgot it?`** | `Go to the Login page → click "Forgot Password?" → enter your registered email + 4-digit Security PIN → set a new password. This works instantly — no email verification needed. Important: you must have set a Security PIN during registration or in Profile → Security Settings. Without a PIN, password recovery is not available.` |
| 17 | **`How do I change or set my Security PIN?`** | `Go to Profile → Dossier tab → Security Settings card. If you already have a PIN, enter your current PIN first, then set a new one. If you don't have a PIN yet, you can set one without entering a current PIN. Your PIN is required for password recovery — don't forget it!` |
| 18 | **`How does social login (Google, Facebook, Apple) work?`** | `Click the provider button on the login page. You'll be redirected to sign in with your social account. After authorization, a Venom Arena account is automatically created (or linked if your social email matches an existing account). You get 150 starter chips and a VENOM-XXXX tag just like regular registration. No separate password needed.` |
| 19 | **`Can I link a password to my social login account?`** | `Yes! Go to Profile → Dossier tab → Security Settings. You can change your Security PIN there. If you need a full password (for email login), contact support. Your social login always works regardless.` |

---

## FOOTER

[CODE COMMENT] `{/* FOOTER */}`

- `className`: `text-center text-[10px] font-mono text-slate-500 uppercase tracking-widest pt-2 border-t border-slate-800/60`
- Text: **`Play responsibly · Chips have no real-world value · Stores-safe edition`**

---

## CLOSE BUTTON (Footer Bar)

### Container
- `className`: `p-4 border-t border-slate-800/80 bg-slate-900/50 flex justify-end`

### Button
- `type`: `button`
- `onClick`: `{onClose}`
- `className`: `px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-lg shadow-emerald-600/30`
- Button label text: **`Understood & Ready to Play`**

---

## HELPER SUB-COMPONENTS (defined at bottom of file)

[CODE COMMENT] `/* ========================================================================== */`
[CODE COMMENT] `/* Helper sub-components */`
[CODE COMMENT] `/* ========================================================================== */`

### `Section` Component
- Props: `{ icon: React.ReactNode; title: string; accent: string; children: React.ReactNode }`
- Renders: `<section>` with `p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2`
- Heading: `<h3>` with `flex items-center gap-2 font-bold text-sm {accent}` — displays `{icon} {title}`
- Body: `<div>` with `text-slate-300 text-xs leading-relaxed space-y-2` — renders `{children}`

### `InfoCard` Component
- Props: `{ title: React.ReactNode; accent: string; children: React.ReactNode }`
- Renders: `<div>` with `bg-slate-950/60 p-3 rounded-lg border border-slate-800/80`
- Title: `<span>` with `font-bold {accent} block text-xs mb-1`
- Body: `<div>` with `text-slate-400 text-[11px] leading-relaxed`

### `FaqItem` Component
- Props: `{ q: string; a: string }`
- Renders: `<div>` with `p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80`
- Question: `<h4>` with `text-xs font-bold text-white`
  - Prefix: `<span>` with `text-emerald-400 font-mono mr-1.5` containing text **`Q.`**
  - Question text follows
- Answer: `<p>` with `text-[11.5px] text-slate-400 mt-1.5 leading-relaxed pl-5`

### Default Export
- `export default GameRulesModal;`

---

## COMPLETE EMOJI INVENTORY

| Emoji | Location | Context |
|-------|----------|---------|
| 🖱️ | Section 1 — Controls | "Mouse / Touch" card title |
| ⌨️ | Section 1 — Controls | "Keyboard" card title |
| 🏆 | Section 2 — Online vs Offline | "Arena Leaderboard: Online vs Offline" card title |
| ✅ | Section 2 — Online vs Offline | Online leaderboard: "Country flags: ✅ Shown" |
| ❌ | Section 2 — Online vs Offline | Offline leaderboard: "Country flags: ❌ Not shown" |
| ⚔️ | Arena Tiers table | "Arena Tiers — 30 Competitive Tiers (10c → 1B)" card title |
| 🎯 | Practice Tiers table | "Practice Tiers (3 Free Tiers — 1,000 Bots Each)" card title |
| 🟢 | Section 3 — Food Orbs | "Food Orbs (3 sizes)" card title |
| 💀 | Section 3 — Food Orbs | "Death Food Orbs (Body Drop)" card title |
| ⭐ | Section 3 — Star Chips | Star Chips card title (inline `<Star>` icon used as well) |
| 🔑 | Section 0 — Accounts | "Password Recovery (Forgot Password)" card title |
| 🔒 | Section 0 — Accounts | "Managing Your Security PIN" card title |
| 🔥 | Section 10 — Challenges | "Streak Bonus System" card title |
| ⚠ | Section 8 — Extraction | "MOVEMENT DETECTED — Extraction restarted!" warning text |
| 🛡️ | Milestone Badge table | Rookie badge |
| 🥉 | Milestone Badge table | Bronze badge |
| 🥈 | Milestone Badge table | Silver badge |
| 🥇 | Milestone Badge table | Gold badge |
| 💎 | Milestone Badge table | Platinum badge |
| 🔮 | Milestone Badge table | Diamond badge |
| 👑 | Milestone Badge table | Omega badge |
| 🏅 | Section 12 — Leaderboards | "Milestone Badge System" card title |
| 🏃💨 | Section 9 — HUD | Flee! emote |
| 💪 | Section 9 — HUD | Ripped! emote |
| ⚡ | Section 9 — HUD | Extracting! emote |
| 🎯 | Section 9 — HUD | Target! emote |
| 🏆 | Section 9 — HUD | GG! emote |

---

## COMPLETE NUMBER & UNIT INVENTORY

| Number | Unit | Context |
|--------|------|--------|
| 20 | chars | Display name max length |
| 6 | chars | Password minimum length |
| 4 | digits | Security PIN length |
| 150 | chips | Starter chips for all account types |
| 25 | chips | Gifting bonus per friend |
| 3 | seconds | Extraction progress bar duration |
| 0% | percent | Commission when ≤3 real players |
| 35% | percent | Commission when ≥4 real players |
| 65% | percent | Player keeps when ≥4 real players |
| 100% | percent | Player keeps when ≤3 real players |
| 30 | bots | Online arena bots per tier |
| 1,000 | bots | Practice arena bots per tier |
| 100 | score | Bot self-destruct threshold (online) |
| 10 | stars | Dropped on real player death |
| 1 | point | Small food orb value |
| 3 | points | Medium food orb value |
| 5 | points | Large food orb value |
| 93% | chance | Small food orb spawn rate |
| 4% | chance | Medium food orb spawn rate |
| 3% | chance | Large food orb spawn rate |
| 1/4 | ratio | Growth rate per food value |
| 4.5 | speed | Normal snake speed |
| 8.0 | speed | Boost snake speed |
| ~3 | per second | Tail food drop rate during boost |
| 1 | segment | Snake shrink rate per boost drop |
| 8 | segments | Minimum body segments to boost |
| 5 | segments | Neck protection (cannot kill zone) |
| ±40px | pixels | Map boundary breathing range |
| 10 | seconds | Map boundary breathing cycle |
| 500px | pixels | Safe spawn distance from other snakes |
| 500px | pixels | Safe spawn distance inside map boundary |
| 4 | seconds | Spawn protection duration |
| 8 | ticks | Bot predictive dodge lookahead |
| 150px | pixels | Bot body avoidance range |
| 80px | pixels | EXTRACT button size |
| 64px | pixels | BOOST button size |
| 23 | score | Death food example (snake score) |
| 4 | count | Death food example: large orbs from score 23 |
| 20 | points | Death food example: 4 large × 5pts |
| 1 | count | Death food example: medium orbs from score 23 |
| 3 | points | Death food example: 1 medium × 3pts |
| 0 | count | Death food example: small orbs from score 23 |
| 275 | chips | Star chip math example: carried chips |
| 27.5 | chips | Star chip math example: per-star value (275÷10) |
| 10 | count | Stars in star chip math example |
| 15 | seconds | Death replay: before-death buffer |
| 15 | seconds | Death replay: after-death observation |
| 4 | seconds | Emote chat bubble display duration |
| 1–5 | keys | Keyboard shortcuts for emotes |
| 1–5 | levels | Novice challenge tier |
| 6–15 | levels | Operative challenge tier |
| 16–30 | levels | Veteran challenge tier |
| 31+ | levels | Elite challenge tier |
| ×1.0 | multiplier | Novice reward multiplier |
| ×1.5 | multiplier | Operative reward multiplier |
| ×2.5 | multiplier | Veteran reward multiplier |
| ×4.0 | multiplier | Elite reward multiplier |
| 3 | per day | Daily challenge count |
| 2 | per week | Weekly challenge count |
| 3 | days | Streak bonus: ×1.5 |
| 7 | days | Streak bonus: ×2.0 |
| 14 | days | Streak bonus: ×3.0 |
| 30 | minutes | Leaderboard auto-refresh interval |
| 197 | countries | Supported countries for national leaderboards |
| 100 | players | Top N shown in Global and National leaderboards |
| 10 | players | Top N shown in arena leaderboards |
| 5 | seconds | Watch Video ad duration |
| 50 | chips | Watch Video reward |
| 60 | seconds | Watch Video cooldown |
| 10c | chips | Lowest arena tier buy-in (Tier 1: Scrap Alley) |
| 1,000,000,000c (1.0Bc) | chips | Highest arena tier buy-in (Tier 30: The Singularity) |
| 0–99,999 | chips | Rookie milestone range |
| 100,000 (100K) | chips | Bronze milestone minimum |
| 500,000 (500K) | chips | Silver milestone minimum |
| 1,000,000 (1M) | chips | Gold milestone minimum |
| 2,500,000 (2.5M) | chips | Platinum milestone minimum |
| 5,000,000 (5M) | chips | Diamond milestone minimum |
| 10,000,000 (10M) | chips | Omega milestone minimum |
| x1.0 | XP multiplier | Tier 1 (Scrap Alley) — lowest |
| x150.0 | XP multiplier | Tier 30 (The Singularity) — highest |

---

## ALL KEYBOARD / INPUT CONTROLS MENTIONED

| Input | Action | Context |
|-------|--------|--------|
| Mouse cursor | Steer | Mouse / Touch control |
| Left-click / Hold | Boost | Mouse / Touch control |
| Mobile joystick drag | Steer | Touch control (push far for boost) |
| WASD | Steer | Keyboard control |
| Arrow Keys | Steer | Keyboard control |
| Space / Shift (hold) | Boost | Keyboard control |
| E (hold) | Extract | Keyboard control |
| M | Toggle minimap / Full Map | HUD control |
| Keys 1–5 | Instant emotes | Quick Chat |

---

## ALL BUTTON LABELS

| Button | Label Text | Context |
|--------|------------|--------|
| Modal close | **`Understood & Ready to Play`** | Bottom-right of modal footer |
| In-game EXTRACT | **`EXTRACT`** | 80px green circle, bottom-right (mentioned in Section 8) |
| In-game BOOST | **`BOOST`** | 64px amber circle, bottom-right (mentioned in Section 9) |
| In-game EXIT | **`EXIT`** | Small pill button, far-left bottom (mentioned in Section 9) |
| Forgot Password | **`"Forgot Password?"`** | Login page (referenced in Section 0 and FAQ #16) |
| Watch Video | **`Watch Video`** | Results screen (mentioned in FAQ #13) |
| Refresh | **`Refresh`** | Leaderboard refresh button (mentioned in Section 12) |
| View Profile | **`View Profile`** | Death screen button (mentioned in Section 11) |
| Add Friend | **`Add Friend`** | Death screen button (mentioned in Section 11) |
| Add Rival | **`Add Rival`** | Death screen button (mentioned in Section 11) |

---

## ALL EMOTE TEXTS

| # | Emote Text | Emoji | Keyboard Shortcut |
|---|------------|-------|------------------|
| 1 | **`GG!`** | 🏆 | Key 1 |
| 2 | **`Target!`** | 🎯 | Key 2 |
| 3 | **`Flee!`** | 🏃💨 | Key 3 |
| 4 | **`Ripped!`** | 💪 | Key 4 |
| 5 | **`Extracting!`** | ⚡ | Key 5 |

---

## ALL IN-GAME HUD TEXT STRINGS

| Location | Text | Notes |
|----------|------|-------|
| Top-center hint | **`"Hold E or press the button below to cash out safely!"`** | Always visible while playing |
| Movement warning | **`"⚠ MOVEMENT DETECTED — Extraction restarted!"`** | Red flash during extraction |
| Empty leaderboard | **`"No real players yet."`** | Online arena leaderboard empty state |
| Active competitors (online) | **`"Real Players: N Active"`** | Pulsing indigo, N = count |
| Active competitors (offline) | **`"Offline Mode: 1 Player"`** | Amber text |
| "LQ" badge | **`"LQ"`** | Shown if low quality FPS |
| "YOU" badge | **`"YOU"`** | Highlighted player entry in leaderboards |
| Boost reminder | **`"SPACE"`** | Amber zap icon reminder |
| "Last sync" | **`"Last sync"`** | Leaderboard timestamp |

---

## COMPLETE LIST OF CODE COMMENTS

| Line(s) | Comment Text |
|---------|--------------|
| 3–8 | `Venom Arena — Official Guide, Rules & FAQ modal. Comprehensive rules page covering ALL game mechanics, modes, food, stars, collision, boost, bot AI, map, extraction, challenges, HUD, lobby leaderboards, milestone badges, and FAQ.` |
| 44 | `// ── Short-form chip formatter for tier tables ──` |
| 80 | `{/* HERO */}` |
| 96–98 | `{/* 0. ACCOUNTS & GETTING STARTED */}` (surrounded by `═══` dividers) |
| 167–169 | `{/* 1. CONTROLS */}` |
| 181–183 | `{/* 2. ONLINE MULTIPLAYER VS. OFFLINE PRACTICE */}` |
| 247–249 | `{/* ARENA TIERS REFERENCE TABLE */}` |
| 306–308 | `{/* 3. FOOD ORBS & STAR CHIPS */}` |
| 346–348 | `{/* 4. BOOST MECHANIC */}` |
| 372–374 | `{/* 5. COLLISION RULES */}` |
| 401–403 | `{/* 6. BOT AI BEHAVIOR */}` |
| 427–429 | `{/* 7. MAP & SAFE SPAWNING */}` |
| 455–457 | `{/* 8. EXTRACTION */}` |
| 489–491 | `{/* 9. IN-GAME HUD EXPLAINED */}` |
| 540–542 | `{/* 10. TACTICAL CHALLENGES */}` |
| 550 | `{/* Level Tiers */}` |
| 576 | `{/* Challenge Types */}` |
| 605 | `{/* Streak Bonus */}` |
| 618–620 | `{/* 11. DEATH & REPLAY */}` |
| 644–646 | `{/* 12. LOBBY LEADERBOARDS */}` |
| 768–770 | `{/* 13. FAQ */}` |
| 795 | `{/* FOOTER */}` |
| 815–817 | `/* Helper sub-components */` (surrounded by `═══` dividers) |

---

## SECTION NAVIGATION SUMMARY (all top-level sections in order)

| Order | Section Title | Accent Color |
|-------|--------------|-------------|
| — | (Hero — Core Loop) | emerald-400 (tag label) |
| 0 | **0. ACCOUNTS & GETTING STARTED** | emerald-400 |
| — | ⚔️ Arena Tiers — 30 Competitive Tiers (10c → 1B) | indigo-300 |
| — | 🎯 Practice Tiers (3 Free Tiers — 1,000 Bots Each) | amber-300 |
| 1 | **1. CONTROLS** | cyan-400 |
| 2 | **2. ONLINE MULTIPLAYER VS. OFFLINE PRACTICE** | emerald-400 |
| 3 | **3. FOOD ORBS & STAR CHIPS** | amber-400 |
| 4 | **4. BOOST MECHANIC** | cyan-400 |
| 5 | **5. COLLISION RULES** | rose-400 |
| 6 | **6. BOT AI BEHAVIOR** | violet-400 |
| 7 | **7. MAP & SAFE SPAWNING** | emerald-400 |
| 8 | **8. EXTRACTION** | amber-400 |
| 9 | **9. IN-GAME HUD EXPLAINED** | indigo-400 |
| 10 | **10. TACTICAL CHALLENGES** | emerald-400 |
| 11 | **11. DEATH & REPLAY** | rose-400 |
| 12 | **12. LOBBY LEADERBOARDS** | amber-400 |
| 13 | **13. FAQ** | purple-400 |

Note: The Arena Tiers and Practice Tiers tables are rendered as standalone `InfoCard` components between sections 0 and 1 (not inside any `Section` wrapper). They sit between the end of Section 0 and the start of Section 1.

---

## IMPORTED BUT UNUSED IN RENDER

| Import | Status |
|--------|--------|
| `MILESTONE_TIERS` | Imported from `@/lib/game-config` but **never referenced in the JSX**. The milestone badge table in Section 12 is hardcoded inline (not mapped from this import). |
| `Compass` | Imported from `lucide-react` but **never used** in any JSX. |
| `Sparkles` | Imported from `lucide-react` but **never used** in any JSX. |
| `Medal` | Imported from `lucide-react` but **never used** in any JSX. |

---

*Catalog generated from: `/tmp/venom-arena/src/components/modals/game-rules-modal.tsx` (851 lines)*
*Cross-referenced with: `/tmp/venom-arena/src/lib/game-config.ts` for ARENA_TIERS, PRACTICE_TIERS, and MILESTONE_TIERS data*

---

02-game-config.md
===
# GDD Part 02 — Exhaustive Catalog of `game-config.ts`

> **Source file:** `/tmp/venom-arena/src/lib/game-config.ts` (1195 lines)
> **Purpose:** Single source of truth for both Next.js API routes, the Socket.IO game server mini-service, and the React client.
> [CODE COMMENT]

---

## Table of Contents

1. [Interfaces / Type Definitions](#1-interfaces--type-definitions)
2. [Arena Tiers — 30 Online Competitive Tiers](#2-arena-tiers--30-online-competitive-tiers)
3. [Practice Tiers — 3 Free Practice Arenas](#3-practice-tiers--3-free-practice-arenas)
4. [Cosmetics — 27 Items Total](#4-cosmetics--27-items-total)
5. [World / Physics Constants](#5-world--physics-constants)
6. [Food Orb System](#6-food-orb-system)
7. [Dynamic Map Scaling (Online Mode)](#7-dynamic-map-scaling-online-mode)
8. [Bot Constants](#8-bot-constants)
9. [Daily Rewards (7-Day Cycle)](#9-daily-rewards-7-day-cycle)
10. [Chip Store Packs — 10 Packs](#10-chip-store-packs--10-packs)
11. [Promo Codes](#11-promo-codes)
12. [Levels / XP System](#12-levels--xp-system)
13. [Bot Names & Skins](#13-bot-names--skins)
14. [Countries (197)](#14-countries-197)
15. [Milestone Tiers (8)](#15-milestone-tiers-8)
16. [Mock Leaderboard (10 entries)](#16-mock-leaderboard-10-entries)
17. [Hall of Fame Tiers (6)](#17-hall-of-fame-tiers-6)
18. [Hall of Fame Commentary Seeds](#18-hall-of-fame-commentary-seeds)
19. [Championship Prize Tiers (4)](#19-championship-prize-tiers-4)
20. [Championship Contenders (13)](#20-championship-contenders-13)
21. [Social Panel — Friends, Rivals, Global Players](#21-social-panel--friends-rivals-global-players)
22. [Public Clans (2)](#22-public-clans-2)
23. [Preset Emblems](#23-preset-emblems)
24. [Bot Chat Replies (7)](#24-bot-chat-replies-7)
25. [Sample Clans — ClanSystem (3)](#25-sample-clans--clansystem-3)
26. [Season Pass — 20 Free + 20 Elite Rewards](#26-season-pass--20-free--20-elite-rewards)
27. [Elite Pass Cost](#27-elite-pass-cost)
28. [Showcase Clips (3)](#28-showcase-clips-3)
29. [Player Inspector Data](#29-player-inspector-data)
30. [Helper Functions](#30-helper-functions)

---

## 1. Interfaces / Type Definitions

### `ArenaTier`
- `id: string`
- `name: string`
- `buyIn: number`
- `description: string`
- `difficulty: 'Beginner' | 'Medium' | 'High Stakes' | 'Extreme' | 'Legendary'`
- `color: string` — tailwind classes for badges/cards [CODE COMMENT]
- `accentColor: string` — hex [CODE COMMENT]
- `borderAccent: string` — hex [CODE COMMENT]
- `botsCount: number`
- `rewardMultiplier: number`
- `isPractice?: boolean`

### `CosmeticType`
- Values: `'skin' | 'trail' | 'death' | 'flag' | 'banner'`

### `SkinPattern`
- Values: `'rainbow' | 'neon' | 'glow' | 'metallic' | 'pulse' | 'zebra' | 'camo' | 'cyber'`

### `Skin`
- `id: string`
- `name: string`
- `cost: number`
- `type: CosmeticType`
- `color: string`
- `secondaryColor?: string`
- `description: string`
- `emoji?: string`
- `pattern?: SkinPattern`

### `FoodOrbSize`
- Values: `'small' | 'medium' | 'large'`

### `FoodOrbConfig`
- `size: FoodOrbSize`
- `value: number` — points added to score [CODE COMMENT]
- `radius: number` — visual radius in px [CODE COMMENT]
- `color: string`
- `glowColor: string`

### `ChipPack`
- `id: string`
- `name: string`
- `chips: number`
- `priceINR: number`
- `priceUSD: string`
- `bonus: string`
- `desc: string`
- `emoji: string`

### `MilestoneTier`
- `id: string`
- `name: string`
- `minChips: number`
- `badge: string`
- `color: string` — hex accent [CODE COMMENT]

### `HallOfFameTier`
- `id: string`
- `name: string`
- `chips: number`
- `badge: string`
- `firstAchiever: { name: string; userTag: string; country: string; dateStr: string }`
- `totalAchieversCount: number`

### `ChampionshipPrize`
- `category: string`
- `title: string`
- `badge: string`
- `chipsReward: number`
- `crownTitle: string`
- `itemReward: string`
- `hallOfFameInduction: boolean`

### `ChampionshipContender`
- `rank: number`
- `name: string`
- `userTag: string`
- `gamesPlayed: number`
- `walletChips: number`
- `clanTag: string`
- `country: string`
- `region: string`
- `projectedPrize: string`

### `MockFriend`
- `id: string`
- `name: string`
- `userTag: string`
- `status: 'online' | 'idle' | 'in-match' | 'offline'`
- `currentArenaId?: string`
- `currentArenaName?: string`
- `level: number`
- `skinColor: string`
- `giftSent: boolean`
- `giftReceived: boolean`

### `MockRival`
- `id: string`
- `name: string`
- `userTag: string`
- `status: 'online' | 'idle' | 'in-match' | 'offline'`
- `currentArenaName: string`
- `level: number`
- `timesKilledByYou: number`
- `timesKilledYou: number`
- `lastEncounterDate: string`

### `GlobalPlayer`
- `name: string`
- `userTag: string`
- `country: string`
- `level: number`
- `chips: number`
- `skinColor: string`
- `status: 'online' | 'idle' | 'in-match' | 'offline'`
- `connected?: boolean`

### `PublicClan`
- `id: string`
- `name: string`
- `tag: string`
- `emblem: string`
- `level: number`
- `bankedChips: number`
- `description: string`
- `members: { name: string; role: string; level: number; chips: number }[]`

### `SampleClanMember`
- `name: string`
- `userTag: string`
- `role: 'Leader' | 'Officer' | 'Member'`
- `chips: number`
- `level: number`
- `country: string`
- `joinedDate: string`

### `SampleClanAnnouncement`
- `author: string`
- `text: string`
- `dateStr: string`

### `SampleClan`
- `id: string`
- `name: string`
- `tag: string`
- `motto: string`
- `level: number`
- `logoEmoji: string`
- `treasuryChips: number`
- `members: SampleClanMember[]`
- `maxMembers: number`
- `leaderName: string`
- `leaderTag: string`
- `minLevelReq: number`
- `clanRank: number`
- `announcements: SampleClanAnnouncement[]`

### `SeasonReward`
- `title: string`
- `category: string`
- `icon: string`
- `skinName?: string`

### `ShowcaseClip`
- `id: string`
- `title: string`
- `creator: string`
- `tag: string`
- `country: string`
- `platform: 'YouTube' | 'Twitch'`
- `url: string`
- `extractedChips: number`
- `upvotes: number`
- `dateStr: string`
- `tags: string[]`

### `InspectedPlayer`
- `name: string`
- `userTag: string`
- `country: string`
- `flag: string`
- `bankedChips: number`
- `level: number`
- `achievedAt?: string`
- `globalRank?: number`
- `countryRank?: number`
- `regionalRank?: number`
- `clanTag?: string`
- `clanName?: string`
- `lifetimeKills?: number`
- `lifetimeDeaths?: number`
- `lifetimeExtracts?: number`
- `bestStreak?: number`
- `biggestExtract?: number`
- `totalEarned?: number`
- `totalLost?: number`
- `currentSkin?: string`
- `currentTrail?: string`
- `currentDeath?: string`
- `currentFlag?: string | null`
- `currentBanner?: string | null`

---

## 2. Arena Tiers — 30 Online Competitive Tiers

[CODE COMMENT] Buy-in: 10c → 1,000,000,000c (1 billion). Every tier has exactly 30 bots.
[CODE COMMENT] Difficulty groups: Beginner (1-6) · Medium (7-12) · High Stakes (13-18) · Extreme (19-24) · Legendary (25-30)

### Beginner (Tiers 1–6): 10c to 300c [CODE COMMENT]

| # | id | name | buyIn | description | difficulty | color (tailwind) | accentColor (hex) | borderAccent (hex) | botsCount | rewardMultiplier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `tier-1` | Scrap Alley | 10 | The starting proving grounds. Low stakes, soft competition, perfect for learning the ropes. | Beginner | `bg-emerald-500/10 border-emerald-500/30 text-emerald-400` | `#10b981` | `#059669` | 30 | 1.0 |
| 2 | `tier-2` | Rust Market | 20 | A scrappy underground market arena. Slightly tougher bots patrol the dimly lit corridors. | Beginner | `bg-emerald-500/10 border-emerald-500/30 text-emerald-400` | `#34d399` | `#10b981` | 30 | 1.1 |
| 3 | `tier-3` | Copper Lane | 40 | Warm copper-lit corridors. Bots here move a bit faster — stay sharp. | Beginner | `bg-emerald-400/10 border-emerald-400/30 text-emerald-300` | `#4ade80` | `#22c55e` | 30 | 1.2 |
| 4 | `tier-4` | Neon Grid | 75 | A glowing synthwave arena where speed is key. Pulsing neon borders and quick bots. | Beginner | `bg-cyan-500/10 border-cyan-500/30 text-cyan-400` | `#06b6d4` | `#0891b2` | 30 | 1.5 |
| 5 | `tier-5` | Iron District | 150 | Industrial zone with moderate competition and steady food flow. Iron walls glow faintly. | Beginner | `bg-cyan-500/10 border-cyan-500/30 text-cyan-400` | `#22d3ee` | `#06b6d4` | 30 | 1.8 |
| 6 | `tier-6` | Bronze Arena | 300 | The final beginner tier. Solid competition — prove yourself here before advancing to medium. | Beginner | `bg-teal-500/10 border-teal-500/30 text-teal-400` | `#14b8a6` | `#0d9488` | 30 | 2.0 |

### Medium (Tiers 7–12): 500c to 15,000c [CODE COMMENT]

| # | id | name | buyIn | description | difficulty | color (tailwind) | accentColor (hex) | borderAccent (hex) | botsCount | rewardMultiplier |
|---|---|---|---|---|---|---|---|---|---|
| 7 | `tier-7` | Silver Strip | 500 | A polished medium-stakes corridor with balanced competition and reliable food spawns. | Medium | `bg-amber-500/10 border-amber-500/30 text-amber-400` | `#f59e0b` | `#d97706` | 30 | 2.5 |
| 8 | `tier-8` | Jade Corridor | 1,000 | Lush and dangerous. Mid-tier hunters roam freely through the jade-colored passages. | Medium | `bg-amber-500/10 border-amber-500/30 text-amber-400` | `#fbbf24` | `#f59e0b` | 30 | 3.0 |
| 9 | `tier-9` | Amber Crossing | 2,000 | A golden intersection where fortunes shift quickly. Watch for coordinated bot ambushes. | Medium | `bg-amber-400/10 border-amber-400/30 text-amber-300` | `#fcd34d` | `#fbbf24` | 30 | 3.5 |
| 10 | `tier-10` | Gold Quarter | 4,000 | Affluent territory with premium food density. Expect coordinated bot packs defending star chips. | Medium | `bg-orange-500/10 border-orange-500/30 text-orange-400` | `#f97316` | `#ea580c` | 30 | 4.5 |
| 11 | `tier-11` | Ruby Den | 7,500 | Deep red arena with aggressive predators and scarce food. Only the cunning survive here. | Medium | `bg-orange-500/10 border-orange-500/30 text-orange-400` | `#fb923c` | `#f97316` | 30 | 5.5 |
| 12 | `tier-12` | Sapphire Hall | 15,000 | Elegant but deadly. The gateway to high-stakes play — blue crystalline walls refract light. | Medium | `bg-rose-500/10 border-rose-500/30 text-rose-400` | `#f43f5e` | `#e11d48` | 30 | 7.0 |

### High Stakes (Tiers 13–18): 30,000c to 750,000c [CODE COMMENT]

| # | id | name | buyIn | description | difficulty | color (tailwind) | accentColor (hex) | borderAccent (hex) | botsCount | rewardMultiplier |
|---|---|---|---|---|---|---|---|---|---|
| 13 | `tier-13` | Viper Pit | 30,000 | The viper syndicate's den. Elite bot AI with predictive dodging starts here. | High Stakes | `bg-rose-500/10 border-rose-500/30 text-rose-400` | `#fb7185` | `#f43f5e` | 30 | 8.0 |
| 14 | `tier-14` | Championship Hub | 50,000 | Championship qualifier grounds. Extraction commission is heavily contested by skilled bots. | High Stakes | `bg-pink-500/10 border-pink-500/30 text-pink-400` | `#ec4899` | `#db2777` | 30 | 10.0 |
| 15 | `tier-15` | Emerald Court | 100,000 | A hundred-thousand buy-in. Only serious operators enter this prestigious emerald arena. | High Stakes | `bg-pink-500/10 border-pink-500/30 text-pink-400` | `#f472b6` | `#ec4899` | 30 | 12.0 |
| 16 | `tier-16` | Diamond Nexus | 200,000 | Brilliant and ruthless. High-value star drops attract fierce competition from all sides. | High Stakes | `bg-violet-500/10 border-violet-500/30 text-violet-400` | `#8b5cf6` | `#7c3aed` | 30 | 15.0 |
| 17 | `tier-17` | Apex Vault | 350,000 | Three hundred fifty thousand to enter. The apex of mid-tier competition — only veterans tread here. | High Stakes | `bg-violet-500/10 border-violet-500/30 text-violet-400` | `#a78bfa` | `#8b5cf6` | 30 | 18.0 |
| 18 | `tier-18` | Obsidian Core | 750,000 | Dark and unforgiving obsidian arena. One wrong move costs hundreds of thousands — precision is key. | High Stakes | `bg-purple-500/10 border-purple-500/30 text-purple-400` | `#a855f7` | `#9333ea` | 30 | 22.0 |

### Extreme (Tiers 19–24): 1,500,000c to 40,000,000c [CODE COMMENT]

| # | id | name | buyIn | description | difficulty | color (tailwind) | accentColor (hex) | borderAccent (hex) | botsCount | rewardMultiplier |
|---|---|---|---|---|---|---|---|---|---|
| 19 | `tier-19` | Crimson Abyss | 1,500,000 | A bottomless crimson arena where only the strongest survive. Bots are relentless hunters. | Extreme | `bg-purple-500/10 border-purple-500/30 text-purple-400` | `#c084fc` | `#a855f7` | 30 | 28.0 |
| 20 | `tier-20` | Shadow Realm | 3,000,000 | Shrouded in darkness. Predators hunt by prediction — stay mobile or become prey. | Extreme | `bg-red-500/10 border-red-500/30 text-red-400` | `#ef4444` | `#dc2626` | 30 | 32.0 |
| 21 | `tier-21` | Void Station | 5,000,000 | An orbital arena floating in the void. Zero room for error at a five-million buy-in. | Extreme | `bg-red-500/10 border-red-500/30 text-red-400` | `#f87171` | `#ef4444` | 30 | 38.0 |
| 22 | `tier-22` | Phantom Reach | 10,000,000 | Ghost-like operators compete for massive chip pools. Bots use advanced flanking tactics. | Extreme | `bg-red-600/10 border-red-600/30 text-red-500` | `#dc2626` | `#b91c1c` | 30 | 45.0 |
| 23 | `tier-23` | Inferno Gate | 20,000,000 | Twenty million at stake. The heat is unbearable — bots charge aggressively on sight. | Extreme | `bg-rose-600/10 border-rose-600/30 text-rose-500` | `#e11d48` | `#be123c` | 30 | 52.0 |
| 24 | `tier-24` | Tartarus Pit | 40,000,000 | The deepest pit before legendary territory. Forty million to enter — only the elite survive. | Extreme | `bg-rose-600/10 border-rose-600/30 text-rose-500` | `#f43f5e` | `#e11d48` | 30 | 60.0 |

### Legendary (Tiers 25–30): 75,000,000c to 1,000,000,000c [CODE COMMENT]

| # | id | name | buyIn | description | difficulty | color (tailwind) | accentColor (hex) | borderAccent (hex) | botsCount | rewardMultiplier |
|---|---|---|---|---|---|---|---|---|---|
| 25 | `tier-25` | Venom Grand | 75,000,000 | The grand Venom arena. Only the wealthiest operators dare challenge at this level. | Legendary | `bg-amber-500/10 border-amber-500/30 text-amber-400` | `#f59e0b` | `#d97706` | 30 | 70.0 |
| 26 | `tier-26` | Omega Station | 150,000,000 | A hundred fifty million to enter. The stakes defy comprehension — every second is worth thousands. | Legendary | `bg-orange-500/10 border-orange-500/30 text-orange-400` | `#f97316` | `#ea580c` | 30 | 80.0 |
| 27 | `tier-27` | Singularity Core | 300,000,000 | A gravitational singularity arena. Three hundred million at stake — nothing escapes its pull. | Legendary | `bg-red-500/10 border-red-500/30 text-red-400` | `#ef4444` | `#dc2626` | 30 | 90.0 |
| 28 | `tier-28` | Eternity Vault | 500,000,000 | Time stands still in this vault. Five hundred million at play — patience or aggression? | Legendary | `bg-rose-600/10 border-rose-600/30 text-rose-500` | `#e11d48` | `#be123c` | 30 | 100.0 |
| 29 | `tier-29` | Abyssal Throne | 750,000,000 | The throne of the abyss. Seven hundred fifty million to challenge the king of the arena. | Legendary | `bg-yellow-500/10 border-yellow-500/30 text-yellow-400` | `#eab308` | `#ca8a04` | 30 | 120.0 |
| 30 | `tier-30` | The Singularity | 1,000,000,000 | The ultimate arena. One billion chips. Mythical territory where fortunes are made and destroyed in an instant. | Legendary | `bg-yellow-400/10 border-yellow-400/30 text-yellow-300` | `#facc15` | `#eab308` | 30 | 150.0 |

---

## 3. Practice Tiers — 3 Free Practice Arenas

[CODE COMMENT] All FREE, 0 XP, 1000 bots each

| # | id | name | buyIn | description | difficulty | color (tailwind) | accentColor (hex) | borderAccent (hex) | botsCount | rewardMultiplier | isPractice |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `practice-easy` | Easy Practice Arena | 0 | A relaxed learning zone. Slow speeds, simple AI behavior, and forgiving competition. | Beginner | `bg-emerald-500/10 border-emerald-500/30 text-emerald-400` | `#10b981` | `#059669` | 1000 | 0.0 | true |
| 2 | `practice-medium` | Medium Practice Arena | 0 | Standard speed and balanced bot behavior. Moderate competition for warming up. | Medium | `bg-cyan-500/10 border-cyan-500/30 text-cyan-400` | `#06b6d4` | `#0891b2` | 1000 | 0.0 | true |
| 3 | `practice-hard` | Hard Practice Arena | 0 | Aggressive bot hunters. Dynamic speed, tight maneuvers, and heavy competition. | High Stakes | `bg-rose-500/10 border-rose-500/30 text-rose-400` | `#f43f5e` | `#e11d48` | 1000 | 0.0 | true |

### ALL_ARENAS
[CODE COMMENT] Combined array: `const ALL_ARENAS = [...ARENA_TIERS, ...PRACTICE_TIERS]` — 33 total arenas

---

## 4. Cosmetics — 27 Items Total

### Skins (13)

| # | id | name | cost | type | color | secondaryColor | description | emoji | pattern |
|---|---|---|---|---|---|---|---|---|
| 1 | `skin-default` | Toxic Slime | 0 | skin | `#22c55e` | `#15803d` | The standard issue bio-luminescent skin. | 🐍 | — |
| 2 | `skin-venom` | Venom Stryker | 40 | skin | `#a855f7` | `#6b21a8` | A striking royal purple skin designed to intimidate. | 🙾 | — |
| 3 | `skin-cyber` | Cyber Grid | 100 | skin | `#06b6d4` | `#0891b2` | Futuristic grid design that flows like computer data. | 🤖 | — |
| 4 | `skin-fish` | The Fish Snake | 200 | skin | `#06b6d4` | `#3b82f6` | Aquatic scales with hydrodynamic dorsal fins and bubble bioluminescence. | 🐟 | neon |
| 5 | `skin-rainbow` | Chameleon Aurora | 350 | skin | `#ec4899` | `#3b82f6` | A high-fidelity skin that transitions smoothly through a full color spectrum. | 🌈 | rainbow |
| 6 | `skin-lion` | The Lion Snake | 350 | skin | `#f59e0b` | `#b45309` | Golden apex mane headpiece with furious amber predator scales. | 💁 | camo |
| 7 | `skin-neonglow` | Cyber Glow Pulsar | 500 | skin | `#06b6d4` | `#a855f7` | Radiates intense neon cyberpunk particles and a glowing high-contrast energy aura. | ⚡ | neon |
| 8 | `skin-motorbike` | The Motorbike Snake | 500 | skin | `#3b82f6` | `#090d16` | Chrome exhaust head, asphalt dark body segments, and burnout smoke trail. | 🏍️ | metallic |
| 9 | `skin-metallic` | Ironclad Titanium | 750 | skin | `#64748b` | `#475569` | Sleek metallic armor plating that reflects light with heavy specularity. | ⚙️ | metallic |
| 10 | `skin-coin` | The Coin Snake | 750 | skin | `#fbbf24` | `#d97706` | Gold dollar medallion crown with stacked casino chip coin segments. | 🪙 | rainbow |
| 11 | `skin-camo` | Bio-Desert Camo | 900 | skin | `#10b981` | `#d97706` | Tactical jungle and sand digital scales to blend into toxic terrains. | 🛡️ | camo |
| 12 | `skin-gold` | Midas Touch | 1200 | skin | `#fbbf24` | `#b45309` | A skin layered in solid gold to boast extreme wealth. | 👑 | — |
| 13 | `skin-crimson` | Crimson Fury | 1800 | skin | `#ef4444` | `#991b1b` | For players who leave a trail of blood in their wake. | 🔥 | — |

### Trails (3)

| # | id | name | cost | type | color | description | emoji |
|---|---|---|---|---|---|---|
| 1 | `trail-none` | Basic Sparks | 0 | trail | `#ffffff` | A simple trail of glowing friction particles. | ✨ |
| 2 | `trail-plasma` | Plasma Arc | 80 | trail | `#ec4899` | Charged electromagnetic pink plasma particles. | ⚡ |
| 3 | `trail-comet` | Stardust Drift | 300 | trail | `#3b82f6` | Cosmic tail particles that simulate a falling comet. | ☄️ |

### Death Bursts (2)

| # | id | name | cost | type | color | description | emoji |
|---|---|---|---|---|---|---|
| 1 | `death-default` | Toxic Splash | 0 | death | `#22c55e` | The standard chemical burst upon disintegration. | 💥 |
| 2 | `death-nova` | Hypernova Burst | 180 | death | `#f97316` | A dazzling flash resembling a collapsing star. | 🌌 |

### Flags (6)

| # | id | name | cost | type | color | description | emoji |
|---|---|---|---|---|---|---|
| 1 | `flag-syndicate` | Syndicate Skull | 50 | flag | `#ef4444` | The pirate skull insignia of the Viper Syndicate. | 🏴️‍☠️ |
| 2 | `flag-pride` | Rainbow Pride | 80 | flag | `#ec4899` | Express pride with a rainbow flag on your tail. | 🏳️‍🌈 |
| 3 | `flag-stars` | Star Spangled | 100 | flag | `#3b82f6` | The patriotic stripes and stars flag. | 🇺🇸 |
| 4 | `flag-union` | Union Jack | 100 | flag | `#ef4444` | The royal cross of the Union Jack. | 🇬🇧 |
| 5 | `flag-tricolor` | Tricolor Saffron | 100 | flag | `#f97316` | The elegant tricolor flag with the Ashoka Chakra. | 🇮🇳 |
| 6 | `flag-vip` | VIP Gold | 300 | flag | `#fbbf24` | The golden flag of elite high stakes participants. | 🚩 |

### Banners (3)

| # | id | name | cost | type | color (gradient) | description | emoji |
|---|---|---|---|---|---|---|
| 1 | `banner-neon` | Synthwave Sunset | 150 | banner | `from-pink-500 via-purple-600 to-indigo-700` | A gorgeous retro-synthwave neon skyline backdrop. | 🌅 |
| 2 | `banner-obsidian` | Obsidian Matrix | 200 | banner | `from-slate-900 via-emerald-950 to-slate-950 border-emerald-500/40` | Dark, sleek green terminal hex lines for elite coders. | 🌌 |
| 3 | `banner-championship` | Grand Champion | 500 | banner | `from-amber-400 via-yellow-600 to-amber-900 border-amber-400` | Prestige golden frame reserved for championship qualified. | 🏆 |

---

## 5. World / Physics Constants

| Constant | Value | Notes |
|---|---|---|
| `WORLD_SIZE` | `8000` | — |
| `WORLD_RADIUS` | `4000` | center of 8000x8000 world (used for offline infinite offset) [CODE COMMENT] |
| `INITIAL_BODY_LENGTH` | `20` | Base body value at spawn (score starts at 20) [CODE COMMENT] |
| `INITIAL_SPAWN_SCORE` | `20` | Starting score — all food collected adds to this [CODE COMMENT] |
| `SEGMENT_SPACING` | `6` | — |
| `BASE_SPEED` | `4.5` | normal snake speed (reduced for better control) [CODE COMMENT] |
| `BOOST_SPEED` | `8.0` | boost speed (reduced for better control) [CODE COMMENT] |
| `EXTRACT_GLIDE_SPEED` | `3.2` | speed while extracting [CODE COMMENT] |
| `EXTRACT_DURATION_MS` | `3000` | 3-second extraction [CODE COMMENT] |
| `EXTRACT_COMMISSION` | `0.35` | 35% commission when >=4 real players [CODE COMMENT] |
| `RESPAWN_INVULN_MS` | `4000` | spawn protection [CODE COMMENT] |
| `MAX_BODY_LENGTH` | `200` | cap raised for longer games [CODE COMMENT] |
| `BOOST_MIN_LENGTH` | `8` | need >8 segments to boost [CODE COMMENT] |
| `BOOST_DROP_INTERVAL` | `10` | drop 1 tail segment every 10 frames (~3 times/sec at 30Hz) [CODE COMMENT] |
| `TICK_RATE_HZ` | `30` | — |
| `TICK_MS` | `1000 / TICK_RATE_HZ` (= ~33.33ms) | — |
| `BROADCAST_RATE_HZ` | `20` | — |
| `BROADCAST_MS` | `1000 / BROADCAST_RATE_HZ` (= 50ms) | — |
| `MAX_SNAPSHOTS_PER_SECOND` | `20` | — |

### Turn Rate

| Constant | Value | Notes |
|---|---|---|
| `TURN_BASE` | `0.35` | increased for much tighter control [CODE COMMENT] |
| `TURN_MIN` | `0.08` | — |
| `TURN_SCORE_FACTOR` | `0.0003` | further reduced impact of score on turn rate [CODE COMMENT] |

### Size Formula

| Constant | Value |
|---|---|
| `SIZE_BASE` | `8` |
| `SIZE_SCORE_FACTOR` | `0.4` |

### Collision

| Constant | Value | Notes |
|---|---|---|
| `COLLISION_HIT_FACTOR` | `0.75` | — |
| `HEAD_ON_HIT_FACTOR` | `0.8` | slightly tighter for head-head [CODE COMMENT] |

---

## 6. Food Orb System

[CODE COMMENT] Three size variants

### Food Orb Configs

| Variant | size | value | radius (px) | color | glowColor |
|---|---|---|---|---|
| `FOOD_ORB_SMALL` | `small` | 1 | 3 | `#34d399` | `#10b981` |
| `FOOD_ORB_MEDIUM` | `medium` | 3 | 5 | `#38bdf8` | `#0ea5e9` |
| `FOOD_ORB_LARGE` | `large` | 5 | 8 | `#f472b6` | `#ec4899` |

### Food Spawn Distribution

[CODE COMMENT] 93% small, 4% medium, 3% large

| Constant | Value |
|---|---|
| `FOOD_ORB_WEIGHTS` | `[0.93, 0.04, 0.03]` |
| `FOOD_COUNT_TARGET` | `1200` | total food orbs per arena [CODE COMMENT] |
| `REGULAR_FOOD_GROW` | `1` | legacy alias (food value IS the grow amount) [CODE COMMENT] |

### Star Collectibles

[CODE COMMENT] always exactly 10 dropped on player death

| Constant | Value | Notes |
|---|---|---|
| `STAR_DROP_COUNT` | `10` | ALWAYS exactly 10 stars [CODE COMMENT] |

---

## 7. Dynamic Map Scaling (Online Mode)

| Constant | Value | Notes |
|---|---|---|
| `MAP_MIN_RADIUS` | `3000` | radius when 1 player (doubled for comfort) [CODE COMMENT] |
| `MAP_MAX_RADIUS` | `16000` | radius when 1000 players (DOUBLED for 1000-player density) [CODE COMMENT] |
| `MAP_BREATH_AMPLITUDE` | `40` | breathing oscillation [CODE COMMENT] |
| `MAP_BREATH_CYCLE_MS` | `10000` | — |
| `MAX_ARENA_PLAYERS` | `1000` | — |
| `MAP_BASE_RADIUS` | `3800` | Legacy alias for backward compat [CODE COMMENT] |

**`getDynamicMapRadius(realPlayerCount, elapsedMs?)` function:**
[CODE COMMENT] Compute dynamic map radius based on real player count.
- Uses sqrt scaling: 1 player → 1500, ~31 players → ~3000, 1000 players → 5000
- Formula: `baseRadius = MAP_MIN_RADIUS + (MAP_MAX_RADIUS - MAP_MIN_RADIUS) * Math.sqrt((count - 1) / (maxP - 1))`
- If `elapsedMs` provided, adds breathing oscillation: `+ Math.sin(cycle * Math.PI * 2) * MAP_BREATH_AMPLITUDE`

---

## 8. Bot Constants

| Constant | Value | Notes |
|---|---|---|
| `BOT_SELF_DESTRUCT_THRESHOLD` | `100` | score at which bots self-destruct (online only) [CODE COMMENT] |
| `BOT_EVADE_RADIUS` | `300` | distance at which bots start evading human players [CODE COMMENT] |
| `BOT_FOOD_SCAN_RADIUS` | `300` | how far bots scan for food [CODE COMMENT] |
| `NECK_PROTECTION_SEGS` | `5` | first N segments behind the head are immune to head-to-body collision. Prevents "close call" deaths where a head barely touches the neck area. [CODE COMMENT] |
| `SAFE_SPAWN_MIN_DIST` | `500` | minimum distance from any existing snake when spawning [CODE COMMENT] |
| `SAFE_SPAWN_ATTEMPTS` | `30` | max attempts to find safe spawn point [CODE COMMENT] |

---

## 9. Daily Rewards (7-Day Cycle)

[CODE COMMENT] 7-day cycle, repeats — original: [10,20,50,100,250,500,1000]

**`DAILY_REWARDS` = `[10, 20, 50, 100, 250, 500, 1000]`**

| Day | Chips Reward |
|---|---|
| 1 | 10 |
| 2 | 20 |
| 3 | 50 |
| 4 | 100 |
| 5 | 250 |
| 6 | 500 |
| 7 | 1000 |

---

## 10. Chip Store Packs — 10 Packs

[CODE COMMENT] original: 10 packs, 100 chips = ₹1, yearly cap 25 Lakh

| # | id | name | chips | priceINR | priceUSD | bonus | desc | emoji |
|---|---|---|---|---|---|---|---|---|
| 1 | `pack-10` | Starter Pack | 1,000 | 10 | $0.12 | Base Rate | 1,000 Chips at 100 Chips/₹1. | 🪙 |
| 2 | `pack-50` | Scout Bundle | 5,100 | 50 | $0.60 | +2% Bonus | 5,100 Chips with early stakes bonus. | 💰 |
| 3 | `pack-100` | Contender Sack | 10,500 | 100 | $1.20 | +5% Bonus | 10,500 Chips for medium arena buy-ins. | 🎒 |
| 4 | `pack-250` | Gladiator Chest | 27,500 | 250 | $3.00 | +10% Bonus | 27,500 Chips for serious competitors. | 🧠 |
| 5 | `pack-500` | High Roller Vault | 57,500 | 500 | $6.00 | +15% Bonus | 57,500 Chips for VIP Syndicate arenas. | 💎 |
| 6 | `pack-1000` | Championship Crate | 120,000 | 1,000 | $12.00 | +20% Bonus | 1,20,000 Chips for Apex Vault entry. | 🏆 |
| 7 | `pack-2500` | Syndicate Treasury | 325,000 | 2,500 | $30.00 | +30% Bonus | 3,25,000 Chips for grand tournament runs. | 🏦 |
| 8 | `pack-5000` | National Titan Coffer | 700,000 | 5,000 | $60.00 | +40% Bonus | 7,00,000 Chips for country leaderboard pushes. | 🏛️ |
| 9 | `pack-10000` | World Champion Trove | 1,500,000 | 10,000 | $120.00 | +50% Bonus | 15,00,000 Chips for global elite domination. | 🌍 |
| 10 | `pack-15000` | MAX ANNUAL CAP PACK | 2,500,000 | 15,000 | $175.00 | +66.67% BONUS (INSTANT LOCK) | 25,00,000 Chips! Reaches ₹15,000 annual spending cap and locks store for 365 days. | 👑 |

### Store Limits

| Constant | Value | Notes |
|---|---|---|
| `MAX_YEARLY_BUY_CHIPS` | `2500000` | 25 Lakh [CODE COMMENT] |
| `MAX_DAILY_ADS` | `12` | — |
| `AD_REWARD_CHIPS` | `100` | — |

---

## 11. Promo Codes

**`PROMO_CODES: Record<string, number>`**

| Code | Reward (chips) |
|---|---|
| `VENOM` | 500 |
| `CHAMPION` | 1000 |

---

## 12. Levels / XP System

[CODE COMMENT] original: xpNeeded = level * 200

**`xpForLevel(level)`:** returns `level * 200`

**`levelFromXp(xp)`:** returns `Math.max(1, Math.floor(xp / 200) + 1)`

- Level 1 requires 200 XP
- Level 2 requires 400 XP
- Level N requires N * 200 XP

---

## 13. Bot Names & Skins

[CODE COMMENT] server-only use, but defined here to avoid duplication

### BOT_NAMES (20)

```
'ViperStrike', 'NeonFang', 'CyberCobra', 'ToxicPython', 'ShadowAdder',
'ChronoKrait', 'QuantumMamba', 'AeroBoa', 'SavageSerpent', 'GlitchViper',
'ApexPredator', 'GhostScale', 'MatrixAsp', 'Synthetix', 'StaticFang',
'VectorVenom', 'OmegaSlink', 'BetaByte', 'RattleTech', 'HoloHydra'
```

### BOT_SKINS (6)

| # | color | secondaryColor |
|---|---|---|
| 1 | `#22c55e` | `#15803d` |
| 2 | `#a855f7` | `#6b21a8` |
| 3 | `#06b6d4` | `#0891b2` |
| 4 | `#ec4899` | `#8b5cf6` |
| 5 | `#f59e0b` | `#b45309` |
| 6 | `#ef4444` | `#991b1b` |

---

## 14. Countries (197)

[CODE COMMENT] full ISO-3166-1 list

| # | code | name | flag |
|---|---|---|---|
| 1 | AF | Afghanistan | 🇦🇫 |
| 2 | AL | Albania | 🇱🇹 |
| 3 | DZ | Algeria | 🇿🇩 |
| 4 | AD | Andorra | 🇦🇹 |
| 5 | AO | Angola | 🇦🇴 |
| 6 | AG | Antigua and Barbuda | 🇦🇬 |
| 7 | AR | Argentina | 🇦🇷 |
| 8 | AM | Armenia | 🇦🏢 |
| 9 | AU | Australia | 🇦🇺 |
| 10 | AT | Austria | 🇦🇹 |
| 11 | AZ | Azerbaijan | 🇦🇿 |
| 12 | BS | Bahamas | 🇧🇸 |
| 13 | BH | Bahrain | 🇧🇭 |
| 14 | BD | Bangladesh | 🇧🇩 |
| 15 | BB | Barbados | 🇧🇧 |
| 16 | BY | Belarus | 🇧🇿 |
| 17 | BE | Belgium | 🇧🇪 |
| 18 | BZ | Belize | 🇧🇿 |
| 19 | BJ | Benin | 🇧🇯 |
| 20 | BT | Bhutan | 🇧🇹 |
| 21 | BO | Bolivia | 🇧🇴 |
| 22 | BA | Bosnia and Herzegovina | 🇧🇦 |
| 23 | BW | Botswana | 🇧🇼 |
| 24 | BR | Brazil | 🇧🇷 |
| 25 | BN | Brunei | 🇧🇩 |
| 26 | BG | Bulgaria | 🇧🇬 |
| 27 | BF | Burkina Faso | 🇧🇫 |
| 28 | BI | Burundi | 🇧🇮 |
| 29 | CV | Cabo Verde | 🇨🇻 |
| 30 | KH | Cambodia | 🇰🇭 |
| 31 | CM | Cameroon | 🇨🇲 |
| 32 | CA | Canada | 🇨🇦 |
| 33 | CF | Central African Republic | 🇨🇫 |
| 34 | TD | Chad | 🇨🇭 |
| 35 | CL | Chile | 🇨🇱 |
| 36 | CN | China | 🇨🇳 |
| 37 | CO | Colombia | 🇨🇴 |
| 38 | KM | Comoros | 🇨🇲 |
| 39 | CG | Congo | 🇨🇬 |
| 40 | CD | DR Congo | 🇨🇩 |
| 41 | CR | Costa Rica | 🇨🇷 |
| 42 | CI | Côte d'Ivoire | 🇨🇮 |
| 43 | HR | Croatia | 🇭🇷 |
| 44 | CU | Cuba | 🇨🆺 |
| 45 | CY | Cyprus | 🇨🇾 |
| 46 | CZ | Czechia | 🇨🇿 |
| 47 | DK | Denmark | 🇩🇰 |
| 48 | DJ | Djibouti | 🇹🇳 |
| 49 | DM | Dominica | 🇹🇲 |
| 50 | DO | Dominican Republic | 🇹🇴 |
| 51 | EC | Ecuador | 🇪🇨 |
| 52 | EG | Egypt | 🇪🇬 |
| 53 | SV | El Salvador | 🇸🇻 |
| 54 | GQ | Equatorial Guinea | 🇬🇶 |
| 55 | ER | Eritrea | 🇪🇷 |
| 56 | EE | Estonia | 🇪🇪 |
| 57 | SZ | Eswatini | 🇸🇿 |
| 58 | ET | Ethiopia | 🇪🇷 |
| 59 | FJ | Fiji | 🇻🇯 |
| 60 | FI | Finland | 🇫🇭 |
| 61 | FR | France | 🇫🇷 |
| 62 | GA | Gabon | 🇬🇦 |
| 63 | GM | Gambia | 🇬🇲 |
| 64 | GE | Georgia | 🇬🇪 |
| 65 | DE | Germany | 🇩🇪 |
| 66 | GH | Ghana | 🇬🇭 |
| 67 | GR | Greece | 🇬🇷 |
| 68 | GD | Grenada | 🇬🇭 |
| 69 | GT | Guatemala | 🇬🇩 |
| 70 | GN | Guinea | 🇬🇭 |
| 71 | GW | Guinea-Bissau | 🇬🇼 |
| 72 | GY | Guyana | 🇬🇾 |
| 73 | HT | Haiti | 🇭🇹 |
| 74 | HN | Honduras | 🇭🇴 |
| 75 | HU | Hungary | 🇭🇚 |
| 76 | IS | Iceland | 🇮🇸 |
| 77 | IN | India | 🇮🇳 |
| 78 | ID | Indonesia | 🇮🇩 |
| 79 | IR | Iran | 🇮🇧 |
| 80 | IQ | Iraq | 🇮🇦 |
| 81 | IE | Ireland | 🇮🇪 |
| 82 | IL | Israel | 🇮🇡 |
| 83 | IT | Italy | 🇮🇩 |
| 84 | JM | Jamaica | 🇯🇲 |
| 85 | JP | Japan | 🇯🇵 |
| 86 | JO | Jordan | 🇯🇴 |
| 87 | KZ | Kazakhstan | 🇰🇿 |
| 88 | KE | Kenya | 🇰🇪 |
| 89 | KI | Kiribati | 🇰🇮 |
| 90 | XK | Kosovo | 🇽🇰 |
| 91 | KW | Kuwait | 🇰🇼 |
| 92 | KG | Kyrgyzstan | 🇰🇬 |
| 93 | LA | Laos | 🇱🇦 |
| 94 | LV | Latvia | 🇱🇫 |
| 95 | LB | Lebanon | 🇱🇧 |
| 96 | LS | Lesotho | 🇱🇸 |
| 97 | LR | Liberia | 🇱🇷 |
| 98 | LY | Libya | 🇱🇾 |
| 99 | LI | Liechtenstein | 🇱🇮 |
| 100 | LT | Lithuania | 🇱🇹 |
| 101 | LU | Luxembourg | 🇱🇺 |
| 102 | MG | Madagascar | 🇲🇬 |
| 103 | MW | Malawi | 🇲🇿 |
| 104 | MY | Malaysia | 🇲🇾 |
| 105 | MV | Maldives | 🇲🇻 |
| 106 | ML | Mali | 🇲🇱 |
| 107 | MT | Malta | 🇲🇺 |
| 108 | MH | Marshall Islands | 🇲🇭 |
| 109 | MR | Mauritania | 🇲🇷 |
| 110 | MU | Mauritius | 🇲🇺 |
| 111 | MX | Mexico | 🇲🇽 |
| 112 | FM | Micronesia | 🇫🇲 |
| 113 | MD | Moldova | 🇲🇩 |
| 114 | MC | Monaco | 🇲🇨 |
| 115 | MN | Mongolia | 🇲🇩 |
| 116 | ME | Montenegro | 🇲🇪 |
| 117 | MA | Morocco | 🇲🇦 |
| 118 | MZ | Mozambique | 🇲🇿 |
| 119 | MM | Myanmar | 🇲🇾 |
| 120 | NA | Namibia | 🇳🇦 |
| 121 | NR | Nauru | 🇳🇷 |
| 122 | NP | Nepal | 🇳🇵 |
| 123 | NL | Netherlands | 🇳🇱 |
| 124 | NZ | New Zealand | 🇳🇿 |
| 125 | NI | Nicaragua | 🇳🇾 |
| 126 | NE | Niger | 🇳🇮 |
| 127 | NG | Nigeria | 🇳🇬 |
| 128 | KP | North Korea | 🇰🇵 |
| 129 | MK | North Macedonia | 🇲🇩 |
| 130 | NO | Norway | 🇳🇴 |
| 131 | OM | Oman | 🇴🇲 |
| 132 | PK | Pakistan | 🇵🇰 |
| 133 | PW | Palau | 🏵🇼 |
| 134 | PS | Palestine | 🇵🇸 |
| 135 | PA | Panama | 🇵🇪 |
| 136 | PG | Papua New Guinea | 🇵🇬 |
| 137 | PY | Paraguay | 🇵🏾 |
| 138 | PE | Peru | 🇵🇪 |
| 139 | PH | Philippines | 🇵🇭 |
| 140 | PL | Poland | 🇵🇱 |
| 141 | PT | Portugal | 🇵🇼 |
| 142 | QA | Qatar | 🇶🇦 |
| 143 | RO | Romania | 🇷🇴 |
| 144 | RU | Russia | 🇷🇺 |
| 145 | RW | Rwanda | 🇷🇼 |
| 146 | KN | Saint Kitts and Nevis | 🇰🇸 |
| 147 | LC | Saint Lucia | 🇱🇨 |
| 148 | VC | Saint Vincent and the Grenadines | 🇻🇨 |
| 149 | WS | Samoa | 🇼🇸 |
| 150 | SM | San Marino | 🇽🇲 |
| 151 | ST | Sao Tome and Principe | 🇹🇹 |
| 152 | SA | Saudi Arabia | 🇸🇦 |
| 153 | SN | Senegal | 🇸🇭 |
| 154 | RS | Serbia | 🇷🇸 |
| 155 | SC | Seychelles | 🇸🇬 |
| 156 | SL | Sierra Leone | 🇸🇱 |
| 157 | SG | Singapore | 🇸🇬 |
| 158 | SK | Slovakia | 🇸🇰 |
| 159 | SI | Slovenia | 🇸🇮 |
| 160 | SB | Solomon Islands | 🇨🇧 |
| 161 | SO | Somalia | 🇸🇴 |
| 162 | ZA | South Africa | 🇿🇦 |
| 163 | KR | South Korea | 🇰🇷 |
| 164 | SS | South Sudan | 🇸🇾 |
| 165 | ES | Spain | 🇪🇸 |
| 166 | LK | Sri Lanka | 🇱🇰 |
| 167 | SD | Sudan | 🇸🇩 |
| 168 | SR | Suriname | 🇸🇧 |
| 169 | SE | Sweden | 🇸🇪 |
| 170 | CH | Switzerland | 🇨🇭 |
| 171 | SY | Syria | 🇸🇾 |
| 172 | TW | Taiwan | 🇱🇹 |
| 173 | TJ | Tajikistan | 🇲🇰 |
| 174 | TZ | Tanzania | 🇹🇰 |
| 175 | TH | Thailand | 🇹🇭 |
| 176 | TL | Timor-Leste | 🇹🇱 |
| 177 | TG | Togo | 🇹🇬 |
| 178 | TO | Tonga | 🇹🇼 |
| 179 | TT | Trinidad and Tobago | 🇹🇹 |
| 180 | TN | Tunisia | 🇹🇳 |
| 181 | TR | Turkey | 🇹🇶 |
| 182 | TM | Turkmenistan | 🇹🇨 |
| 183 | TV | Tuvalu | 🇹🇻 |
| 184 | UG | Uganda | 🇺🇬 |
| 185 | UA | Ukraine | 🇺🇪 |
| 186 | AE | United Arab Emirates | 🇦🇪 |
| 187 | GB | United Kingdom | 🇬🇧 |
| 188 | US | United States | 🇺🇸 |
| 189 | UY | Uruguay | 🇺🇾 |
| 190 | UZ | Uzbekistan | 🇺🇿 |
| 191 | VU | Vanuatu | 🇻🇺 |
| 192 | VA | Vatican City | 🇻🇦 |
| 193 | VE | Venezuela | 🇻🇪 |
| 194 | VN | Vietnam | 🇻🇳 |
| 195 | YE | Yemen | 🇾🇪 |
| 196 | ZM | Zambia | 🇿🇲 |
| 197 | ZW | Zimbabwe | 🇿🇾 |

---

## 15. Milestone Tiers (8)

[CODE COMMENT] used by Leaderboards + Hall of Fame

| # | id | name | minChips | badge | color (hex) |
|---|---|---|---|---|
| 1 | `all` | All Milestone Tiers | 0 | ⭐ All Tiers | `#94a3b8` |
| 2 | `omega` | Omega Legend (1 Crore / 10M+) | 10,000,000 | 👑 Omega | `#fbbf24` |
| 3 | `diamond` | Diamond Warlord (50 Lakhs / 5M+) | 5,000,000 | 🔮 Diamond | `#06b6d4` |
| 4 | `platinum` | Platinum Sovereign (25 Lakhs / 2.5M+) | 2,500,000 | 💎 Platinum | `#22d3ee` |
| 5 | `gold` | Gold Apex Vanguard (10 Lakhs / 1M+) | 1,000,000 | 🥇 Gold | `#f59e0b` |
| 6 | `silver` | Silver Commander (5 Lakhs / 500K+) | 500,000 | 🥈 Silver | `#cbd5e1` |
| 7 | `bronze` | Bronze Elite (1 Lakh / 100K+) | 100,000 | 🥉 Bronze | `#b45309` |
| 8 | `rookie` | Rookie (0 - 99K) | 0 | 🛡️ Rookie | `#64748b` |

**`milestoneTierForChips(chips)` function:** Returns highest matching tier (skips 'all' id). Default fallback: `{ name: 'Rookie (0 - 99K)', badge: '🛡️ Rookie', color: '#64748b' }`

---

## 16. Mock Leaderboard (10 entries)

[CODE COMMENT] used by Leaderboards when API is sparse

| Rank | name | bankedChips | level | country | rank | userTag |
|---|---|---|---|---|---|
| 1 | ViperX | 285,400 | 42 | US | 1 | US-2854 |
| 2 | KobraCommander | 198,250 | 38 | KR | 2 | KR-1982 |
| 3 | SlinkySlayer | 142,010 | 31 | BR | 3 | BR-1420 |
| 4 | VenomousRex | 95,450 | 27 | DE | 4 | DE-9545 |
| 5 | Basilisk_99 | 74,200 | 24 | CA | 5 | CA-7420 |
| 6 | PythonicPro | 51,900 | 21 | JP | 6 | JP-5190 |
| 7 | SidewinderAlpha | 38,700 | 18 | GB | 7 | GB-3870 |
| 8 | Naga_Queen | 24,650 | 15 | IN | 8 | IN-2465 |
| 9 | Anacondaaa | 19,500 | 12 | AU | 9 | AU-1950 |
| 10 | Copperhead | 12,400 | 10 | FR | 10 | FR-1240 |

---

## 17. Hall of Fame Tiers (6)

[CODE COMMENT] 6 milestone tiers with first achievers

| # | id | name | chips | badge | firstAchiever name | firstAchiever userTag | firstAchiever country | firstAchiever dateStr | totalAchieversCount |
|---|---|---|---|---|---|---|---|---|
| 1 | `t-1lakh` | 1 LAKH CHIPS MILESTONE | 100,000 | 🥉 Bronze Elite | Rookie_Striker | #IND-104 | IN | 02 Jan 2026, 09:15 AM UTC | 14,209 |
| 2 | `t-5lakh` | 5 LAKH CHIPS MILESTONE | 500,000 | 🥈 Silver Commander | Viper_Zero | #USA-402 | US | 07 Jan 2026, 02:40 PM UTC | 4,810 |
| 3 | `t-10lakh` | 10 LAKH CHIPS (1 MILLION) MILESTONE | 1,000,000 | 🥇 Gold Apex Vanguard | K-Snake_Master | #KOR-114 | KR | 11 Jan 2026, 06:30 AM SGT | 1,290 |
| 4 | `t-25lakh` | 25 LAKH CHIPS MILESTONE | 2,500,000 | 💎 Platinum Sovereign | Apex_Viper | #USA-882 | US | 16 Jan 2026, 11:10 PM UTC | 312 |
| 5 | `t-50lakh` | 50 LAKH CHIPS MILESTONE | 5,000,000 | 🔮 Diamond Warlord | Shadow_Ninja | #JPN-309 | JP | 19 Jan 2026, 08:22 PM JST | 64 |
| 6 | `t-1crore` | 1 CRORE CHIPS (10,000,000) LEGENDARY MILESTONE | 10,000,000 | 👑 OMEGA IMMORTAL GOD | Hari | #IND-001 | IN | 23 Jan 2026, 05:00 PM WST | 3 |

---

## 18. Hall of Fame Commentary Seeds

### INITIAL_COMMENTARY (3)

| id | ts | text |
|---|---|---|
| c1 | 13:41:02 UTC | 🎙️ ESPORTS DESK: Hari from India (#IND-001) locked in a massive extraction in Tier-05 High Stakes Arena! |
| c2 | 13:40:48 UTC | 💥 ARENA BLAST: Apex_Viper eliminated Scavenger_Bot and harvested 12 Star Chips on boundary! |
| c3 | 13:39:15 UTC | 👑 MILESTONE NOTICE: User K-Snake_Master reached 2,500,000 banked chips & secured Platinum Sovereign Tier! |

### COMMENTARY_NAMES (6)

```
'Hari', 'Apex_Viper', 'Shadow_Ninja', 'Elysium_God', 'Ronin_JP', 'Brazil_King'
```

---

## 19. Championship Prize Tiers (4)

[CODE COMMENT] prize tiers + 13 mock contenders

| # | category | title | badge | chipsReward | crownTitle | itemReward | hallOfFameInduction |
|---|---|---|---|---|---|---|---|
| 1 | RANK_1 | 👑 RANK 1: GRAND CHAMPION | 🥇 1st Place (World / Region / Country) | 5,000,000 | 👑 2026 WORLD VENOM CHAMPION | Mythic Golden Dragon Skin & World Crown | true |
| 2 | RANK_2_10 | 🥈 RANKS 2–10: TOP 10 LEGENDS | 🥈 Top 10 Legends | 2,500,000 | 🥈 VENOM ARENA OVERLORD | Platinum Armor Skin & Crown Effect | true |
| 3 | RANK_11_50 | 🥉 RANKS 11–50: ELITE MASTERS | 🥉 Ranks 11–50 Masters | 1,000,000 | 🥉 ARENA ELITE MASTER | Diamond Trail Effect & Master Crest | true |
| 4 | RANK_51_100 | 🛡️ RANKS 51–100: CHAMPIONSHIP CONTENDERS | 🛡️ Ranks 51–100 Contenders | 250,000 | 🛡️ CHAMPIONSHIP CONTENDER | 2,500 Season Pass XP & Contender Badge | true |

---

## 20. Championship Contenders (13)

| rank | name | userTag | gamesPlayed | walletChips | clanTag | country | region | projectedPrize |
|---|---|---|---|---|---|---|---|
| 1 | Hari | #IND-001 | 4820 | 10,000,000 | APEX | IN | APAC | 5,00,000 Chips + 👑 2026 WORLD CHAMPION |
| 2 | ApexViper_IND | #IND-002 | 6210 | 9,400,000 | APEX | IN | APAC | 2,500,000 Chips + 🥈 ARENA OVERLORD |
| 3 | VenomKing_US | #USA-882 | 5890 | 8,800,000 | APEX | US | NA | 2,500,000 Chips + 🥈 ARENA OVERLORD |
| 4 | K-Snake_Master | #KOR-114 | 4120 | 8,200,000 | NINJA | KR | APAC | 2,500,000 Chips + 🥈 ARENA OVERLORD |
| 5 | ShadowSlinker_JP | #JPN-309 | 3940 | 7,600,000 | NINJA | JP | APAC | 2,500,000 Chips + 🥈 ARENA OVERLORD |
| 6 | KaiserSlayer_DE | #GER-901 | 5100 | 6,900,000 | WAR | DE | EU | 2,500,000 Chips + 🥈 ARENA OVERLORD |
| 7 | SambaVenom_BR | #BRA-502 | 4890 | 6,400,000 | BRZ | BR | LATAM | 2,500,000 Chips + 🥈 ARENA OVERLORD |
| 8 | BritStriker_UK | #UK-402 | 3820 | 5,800,000 | ROYAL | GB | EU | 2,500,000 Chips + 🥈 ARENA OVERLORD |
| 9 | CobraMaster_IN | #IND-8821 | 2950 | 5,200,000 | PHNX | IN | APAC | 2,500,000 Chips + 🥈 ARENA OVERLORD |
| 10 | Dragon_Slayer_US | #USA-104 | 4100 | 4,900,000 | APEX | US | NA | 2,500,000 Chips + 🥈 ARENA OVERLORD |
| 11 | Delhi_King | #IND-003 | 2100 | 4,500,000 | PHNX | IN | APAC | 1,000,000 Chips + 🥉 ELITE MASTER |
| 12 | Cyber_Wolf_US | #USA-102 | 3200 | 4,100,000 | CYBER | US | NA | 1,000,000 Chips + 🥉 ELITE MASTER |
| 15 | Ronin_Slayer_JP | #JPN-881 | 1800 | 3,800,000 | NINJA | JP | APAC | 1,000,000 Chips + 🥉 ELITE MASTER |
| 52 | Challenger_Viper | #IND-902 | 850 | 1,200,000 | VPR | IN | APAC | 250,000 Chips + 🛡️ CONTENDER |

---

## 21. Social Panel — Friends, Rivals, Global Players

### INITIAL_FRIENDS (4)

| id | name | userTag | status | currentArenaId | currentArenaName | level | skinColor | giftSent | giftReceived |
|---|---|---|---|---|---|---|---|---|
| f-1 | ApexViper | APEX-1029 | online | tier-1 | Training Pit | 42 | `#10b981` | false | true |
| f-2 | ShadowSlinker | SLNK-9281 | in-match | tier-2 | High Stakes Lounge | 18 | `#a855f7` | false | false |
| f-3 | CoinGobbler | COIN-5432 | offline | — | — | 29 | `#eab308` | true | false |
| f-4 | VenomKing | VNOM-0001 | idle | — | — | 55 | `#ef4444` | false | false |

### INITIAL_RIVALS (3)

| id | name | userTag | status | currentArenaName | level | timesKilledByYou | timesKilledYou | lastEncounterDate |
|---|---|---|---|---|---|---|---|
| r-1 | VenomKing | VNOM-0001 | in-match | Venom Pit (5,000 Buy-In) | 55 | 2 | 5 | Today, 2:15 PM |
| r-2 | ShadowSlinker | SLNK-9281 | online | High Stakes Lounge (1,000 Buy-In) | 38 | 4 | 1 | Yesterday, 8:40 PM |
| r-3 | ApexViper | APEX-1029 | in-match | Extreme Arena (25,000 Buy-In) | 42 | 1 | 3 | 2 days ago |

### GLOBAL_COMMUNITY_PLAYERS (12)

| name | userTag | country | level | chips | skinColor | status |
|---|---|---|---|---|---|---|
| CobraMaster_IN | IND-8821 | IN | 48 | 4,500,000 | `#10b981` | online |
| Viper_Syndicate | IND-1049 | IN | 52 | 12,500,000 | `#eab308` | in-match |
| Mamba_Strike | USA-4012 | US | 39 | 2,100,000 | `#ef4444` | online |
| Tokyo_Slinker | JPN-9012 | JP | 44 | 3,800,000 | `#a855f7` | idle |
| Seoul_Apex | KOR-2290 | KR | 50 | 8,900,000 | `#3b82f6` | online |
| London_Viper | GBR-5012 | GB | 35 | 1,800,000 | `#f43f5e` | in-match |
| Dragon_Cobra | IND-2201 | IN | 41 | 2,900,000 | `#06b6d4` | online |
| Phoenix_Venom | BRA-7712 | BR | 33 | 950,000 | `#84cc16` | offline |
| Berlin_Predator | DEU-3321 | DE | 46 | 5,400,000 | `#ec4899` | online |
| Sydney_Strike | AUS-6612 | AU | 37 | 1,400,000 | `#6366f1` | idle |
| Zenith_Slither | CAN-8840 | CA | 28 | 620,000 | `#14b8a6` | online |
| Paris_Serpent | FRA-1190 | FR | 38 | 1,950,000 | `#8b5cf6` | offline |

### SOCIAL_COUNTRY_FILTER (11)

| code | name | flag |
|---|---|---|
| ALL | All Countries | 🌐 |
| IN | India | 🇮🇳 |
| US | United States | 🇺🇸 |
| JP | Japan | 🇯🇵 |
| KR | South Korea | 🇰🇷 |
| GB | United Kingdom | 🇬🇧 |
| DE | Germany | 🇩🇪 |
| BR | Brazil | 🇧🇷 |
| AU | Australia | 🇦🇺 |
| CA | Canada | 🇨🇦 |
| FR | France | 🇫🇷 |

---

## 22. Public Clans (2)

[CODE COMMENT] distinct from ClanSystem.tsx

### Clan 1: Apex Predators

| Field | Value |
|---|---|
| id | c-1 |
| name | Apex Predators |
| tag | APEX |
| emblem | 🦅 |
| level | 8 |
| bankedChips | 15,000 |
| description | Elite hunters only. Extract with 100+ chips or get kicked. |
| members | (see below) |

**Members:**

| name | role | level | chips |
|---|---|---|---|
| VenomKing | Leader | 55 | 5,000 |
| ApexViper | Co-Leader | 42 | 3,500 |
| StrikeFast | Viper | 22 | 1,200 |

### Clan 2: Slinky Syndicate

| Field | Value |
|---|---|
| id | c-2 |
| name | Slinky Syndicate |
| tag | SLYK |
| emblem | 🐍 |
| level | 5 |
| bankedChips | 4,500 |
| description | Let's grow together! |
| members | (see below) |

**Members:**

| name | role | level | chips |
|---|---|---|---|
| CozyCobra | Leader | 31 | 2,000 |
| ShadowSlinker | Viper | 18 | 800 |
| GoldHoarder | Viper | 15 | 500 |

---

## 23. Preset Emblems

**`PRESET_EMBLEMS` = `['🐍', '🦅', '🎯', '💀', '💎', '🔥', '👑', '⚡', '🏆', '☣️']`**

| # | Emblem |
|---|---|
| 1 | 🐍 (Snake) |
| 2 | 🦅 (Eagle) |
| 3 | 🎯 (Target) |
| 4 | 💀 (Skull) |
| 5 | 💎 (Gem) |
| 6 | 🔥 (Fire) |
| 7 | 👑 (Crown) |
| 8 | ⚡ (Lightning) |
| 9 | 🏆 (Trophy) |
| 10 | ☣️ (Biohazard) |

---

## 24. Bot Chat Replies (7)

| # | Reply Text |
|---|---|
| 1 | Nice run in the High-Stakes Arena today! 🏆 |
| 2 | That was an insane cut-off! Easy food. 💥 |
| 3 | Don't forget to deposit chips, we need that Level 10 Clan Buff! 💎 |
| 4 | Who is up for some Venom Arena lobbies? 🐍 |
| 5 | Just extracted with 250 chips, feeling like a god! 😎 |
| 6 | Slinky style, baby! 😂 |
| 7 | Be careful of VenomKing, he was hunting everyone in Tier 3! |

---

## 25. Sample Clans — ClanSystem (3)

[CODE COMMENT] ClanSystem.tsx — 3 sample clans

### Clan 1: Viper Apex Syndicate

| Field | Value |
|---|---|
| id | clan-1 |
| name | Viper Apex Syndicate |
| tag | APEX |
| motto | Dominate the boundary, extract all chips. |
| level | 12 |
| logoEmoji | 🐍 |
| treasuryChips | 14,500,000 |
| maxMembers | 30 |
| leaderName | Hari |
| leaderTag | #IND-001 |
| minLevelReq | 1 |
| clanRank | 1 |

**Members:**

| name | userTag | role | chips | level | country | joinedDate |
|---|---|---|---|---|---|---|
| Hari | #IND-001 | Leader | 10,000,000 | 50 | IN | 01 Jan 2027 |
| Apex_Viper | #USA-882 | Officer | 9,400,000 | 49 | US | 03 Jan 2027 |
| K-Snake_Master | #KOR-114 | Officer | 8,900,000 | 49 | KR | 05 Jan 2027 |
| Rookie_Striker | #IND-104 | Member | 1,200,000 | 32 | IN | 12 Jan 2027 |

**Announcements:**

| author | text | dateStr |
|---|---|---|
| Hari (Leader) | 🔥 Self-Sponsored Clan Arena War starts Saturday! Treasury pool funds 1,00,000c prize pool. | 2 hours ago |
| Apex_Viper (Officer) | Treasury Bank replenished by members for custom clan tournaments! | 1 day ago |

### Clan 2: Cyber Ninja Shadow Squad

| Field | Value |
|---|---|
| id | clan-2 |
| name | Cyber Ninja Shadow Squad |
| tag | NINJA |
| motto | Silent extraction, maximum venom. |
| level | 9 |
| logoEmoji | 🥷 |
| treasuryChips | 8,200,000 |
| maxMembers | 25 |
| leaderName | Shadow_Ninja |
| leaderTag | #JPN-309 |
| minLevelReq | 15 |
| clanRank | 2 |

**Members:**

| name | userTag | role | chips | level | country | joinedDate |
|---|---|---|---|---|---|---|
| Shadow_Ninja | #JPN-309 | Leader | 5,000,000 | 48 | JP | 02 Jan 2027 |

**Announcements:**

| author | text | dateStr |
|---|---|---|
| Shadow_Ninja | Recruiting active players for High Stakes Tier 5 extractions! | 3 days ago |

### Clan 3: Phoenix Elite Extraction Corps

| Field | Value |
|---|---|
| id | clan-3 |
| name | Phoenix Elite Extraction Corps |
| tag | PHNX |
| motto | From the ashes, we reclaim the arena. |
| level | 6 |
| logoEmoji | 🔥 |
| treasuryChips | 3,400,000 |
| maxMembers | 20 |
| leaderName | Viper_Zero |
| leaderTag | #USA-402 |
| minLevelReq | 10 |
| clanRank | 3 |
| members | [] (empty) |
| announcements | [] (empty) |

---

## 26. Season Pass — 20 Free + 20 Elite Rewards

[CODE COMMENT] 20 free + 20 elite rewards

### Free Rewards (20)

| # | title | category | icon | skinName |
|---|---|---|---|
| 1 | Neon Viper Badge | Badge | 🏷️ | — |
| 2 | Cyber Pulse Trail FX | Tail FX | ⚡ | — |
| 3 | Green Venom Frame | Avatar Border | 🖼️ | — |
| 4 | Serpent Whispers SFX | Kill Sound | 🔊 | — |
| 5 | Genesis Pioneer Title | Title | 🎖️ | — |
| 6 | Bio-Hazard Emote Spray | Spray | 🎨 | — |
| 7 | Emerald Tail Glow | Tail FX | ✨ | — |
| 8 | Cobra Strike Taunt | Emote | 🐍 | — |
| 9 | Cyber Samurai Border | Avatar Border | ⚔️ | — |
| 10 | Toxic Acid DNA Skin | DNA Skin | 🧪 | — |
| 11 | Quantum Grid Avatar | Profile Icon | 🌐 | — |
| 12 | Apex Vanguard Emblem | Badge | 🛡️ | — |
| 13 | Neon Matrix Audio FX | Kill Sound | 🎵 | — |
| 14 | Plasma Arc Tail Trail | Tail FX | ⚡ | — |
| 15 | Cyber Warlord Title | Title | 👑 | — |
| 16 | Solar Flare Emote | Emote | ☀️ | — |
| 17 | Titanium Viper Skin | DNA Skin | 🦾 | — |
| 18 | Cyber Void Frame | Avatar Border | 🌌 | — |
| 19 | Genesis Immortal Badge | Badge | 🏆 | — |
| 20 | Genesis Master DNA Skin | DNA Skin | 🐉 | — |

### Elite Rewards (20)

| # | title | category | icon | skinName |
|---|---|---|---|
| 1 | Cyber Serpent God Skin | DNA Skin | 👑 | Cyber Serpent God |
| 2 | Hyper Plasma Arc FX | Tail FX | ⚡ | — |
| 3 | Cyber Siren Roar SFX | Kill Sound | 🔊 | — |
| 4 | Royal Throne Taunt | Emote | 🛋 | — |
| 5 | 1 Crore Immortal Badge | Badge | 🎖️ | — |
| 6 | Modular Venom DNA Skin | DNA Skin | 🐍 | Modular Venom DNA |
| 7 | Holo-Shield Tail Aura | Tail FX | 🛡️ | — |
| 8 | Golden Viper Frame | Avatar Border | 🖼️ | — |
| 9 | Galactic Overlord Title | Title | 🌌 | — |
| 10 | Dark Matter DNA Skin | DNA Skin | 🌑 | Dark Matter DNA |
| 11 | Celestial Fire Trail | Tail FX | 🔥 | — |
| 12 | Apex Predator Emblem | Badge | 🦅 | — |
| 13 | Cyber Phantom Skin | DNA Skin | 👻 | Cyber Phantom |
| 14 | Supernova Explosion SFX | Kill Sound | 💥 | — |
| 15 | Emperor's Crown Frame | Avatar Border | 👑 | — |
| 16 | Diamond Viper DNA Skin | DNA Skin | 💎 | Diamond Viper |
| 17 | Hyper-Drive Trail FX | Tail FX | ⚡ | — |
| 18 | Genesis Sovereign Title | Title | 📜 | — |
| 19 | Infinite Horizon Frame | Avatar Border | 🎆 | — |
| 20 | Serpent God Ascended | DNA Skin | 🌟 | Serpent God Ascended |

---

## 27. Elite Pass Cost

**`ELITE_PASS_COST` = `100,000`** (chips)

---

## 28. Showcase Clips (3)

[CODE COMMENT] 3 mock clips

| # | id | title | creator | tag | country | platform | url | extractedChips | upvotes | dateStr | tags |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | clip-1 | 1,00,00,000 CHIPS EXTRACTION CLUTCH IN TIER-05 ARENA! 🔥 | Hari | #IND-001 | IN | YouTube | https://youtube.com/watch?v=demo_hari_crore | 10,000,000 | 4,210 | 23 Jan 2027 | ['Crore Milestone', 'Tier-05', 'High Stakes'] |
| 2 | clip-2 | SOLO 1V3 VIPER TRAP ON EXTRACTION ZONE BOUNDARY 🐍 | Apex_Viper | #USA-882 | US | Twitch | https://twitch.tv/videos/demo_apex_clutch | 2,500,000 | 1,890 | 25 Jan 2027 | ['1v3 Clutch', 'Platinum Tier'] |
| 3 | clip-3 | NINJA SNAKE DNA SKIN SHOWCASE & SPEED EXTRACTION ⚡ | Shadow_Ninja | #JPN-309 | JP | YouTube | https://youtube.com/watch?v=demo_ninja_speed | 5,000,000 | 1,240 | 22 Jan 2027 | ['Skin Showcase', 'Speed Run'] |

---

## 29. Player Inspector Data

### INSPECTOR_ALLIES_REGIONAL (2)

| name | userTag | country | role |
|---|---|---|---|
| Hari | #IND-001 | IN | Leader |
| Rookie_Striker | #IND-104 | IN | Member |

### INSPECTOR_ALLIES_GLOBAL (2)

| name | userTag | country | role |
|---|---|---|---|
| Apex_Viper | #USA-882 | US | Officer |
| K-Snake | #KOR-114 | KR | Ally |

### INSPECTOR_BADGES (2)

| icon | title | desc |
|---|---|---|
| 👑 | 1 Crore Immortal | Extracted over 10M Chips |
| ⚡ | Apex Vanguard | Top 1% Arena Leaderboard |

### INSPECTOR_LOADOUT (4)

| label | value |
|---|---|
| Snake DNA Skin: | 👑 Cyber Serpent God |
| Tail Trail FX: | ⚡ Hyper Plasma Arc |
| Kill Sound Effect: | 🔊 Cyber Siren Roar |
| Victory Emote: | 👑 Royal Throne Taunt |

---

## 30. Helper Functions

| Function | Signature | Behavior |
|---|---|---|
| `getArenaById` | `(id: string): ArenaTier \| undefined` | Finds arena by id in ALL_ARENAS |
| `getCosmeticById` | `(id: string): Skin \| undefined` | Finds cosmetic by id in ALL_COSMETICS |
| `getDynamicMapRadius` | `(realPlayerCount: number, elapsedMs?: number): number` | Computes dynamic map radius with sqrt scaling + optional breathing oscillation |
| `xpForLevel` | `(level: number): number` | Returns `level * 200` |
| `levelFromXp` | `(xp: number): number` | Returns `Math.max(1, Math.floor(xp / 200) + 1)` |
| `milestoneTierForChips` | `(chips: number): { name; badge; color }` | Returns highest matching milestone tier (skips 'all'), default Rookie |
| `countryFlag` | `(code: string): string` | Returns flag emoji for country code, fallback `🏳️🌀` |
| `countryName` | `(code: string): string` | Returns country name for code, fallback returns code as-is |

---

## Summary Counts

| Category | Count |
|---|---|
| Online Competitive Arena Tiers | 30 |
| Practice Arena Tiers | 3 |
| Total Arenas (ALL_ARENAS) | 33 |
| Cosmetic Skins | 13 |
| Cosmetic Trails | 3 |
| Cosmetic Death Bursts | 2 |
| Cosmetic Flags | 6 |
| Cosmetic Banners | 3 |
| Total Cosmetics | 27 |
| Food Orb Variants | 3 |
| Physics / World Constants | 24 (see Section 5) |
| Bot Constants | 6 (see Section 8) |
| Daily Rewards | 7 |
| Chip Store Packs | 10 |
| Promo Codes | 2 |
| Bot Names | 20 |
| Bot Skins | 6 |
| Countries | 197 |
| Milestone Tiers | 8 |
| Mock Leaderboard Entries | 10 |
| Hall of Fame Tiers | 6 |
| Hall of Fame Commentary | 3 |
| Commentary Names | 6 |
| Championship Prize Tiers | 4 |
| Championship Contenders | 13 |
| Initial Friends | 4 |
| Initial Rivals | 3 |
| Global Community Players | 12 |
| Social Country Filters | 11 |
| Public Clans | 2 |
| Preset Emblems | 10 |
| Bot Chat Replies | 7 |
| Sample Clans (ClanSystem) | 3 |
| Season Free Rewards | 20 |
| Season Elite Rewards | 20 |
| Showcase Clips | 3 |
| Inspector Allies (Regional) | 2 |
| Inspector Allies (Global) | 2 |
| Inspector Badges | 2 |
| Inspector Loadout Items | 4 |
| Exported Interfaces | 19 |
| Exported Type Aliases | 2 |
| Helper Functions | 8 |

---

**NOTE:** No challenge templates, daily challenge objectives, or challenge systems were found in this file. If they exist elsewhere, they are not defined in `game-config.ts`.

---

03-game-canvas.md
===
# GDD Part 03 — game-canvas.tsx Exhaustive Catalog

**Source file:** `/tmp/venom-arena/src/components/game/game-canvas.tsx` (3152 lines)
**Component:** `GameCanvas` + sub-components `ReplayPlayer`, `EndOverlay`
**Build reference:** BUILD-10 game-canvas fix, BUILD-13 arena leaderboard/minimap/full-map, BUILD-14 offline engine

---

## 1. CONSTANTS & NUMERIC THRESHOLDS

| Constant | Value | Purpose |
|---|---|---|
| `SOCKET_PORT` | `3001` | Socket.IO server port |
| `MAX_PARTICLES` | `200` | Hard cap on particle array (C10 fix) |
| `INPUT_HEARTBEAT_MS` | `200` | Min ms between forced input emits |
| `PING_INTERVAL_MS` | `2500` | Ping send interval |
| `FPS_LOW_THRESHOLD` | `40` | FPS below this triggers LQ |
| `FPS_HIGH_THRESHOLD` | `55` | FPS above this disables LQ |
| `FPS_LOW_DURATION_MS` | `2000` | Duration below low threshold to enable LQ |
| `FPS_HIGH_DURATION_MS` | `5000` | Duration above high threshold to disable LQ |
| `MOUSE_DEADZONE_PX` | `15` | Mouse distance from center to register direction (I2 fix, was 5) |
| `JOYSTICK_DEADZONE` | `0.18` | Min magnitude to register joystick input |
| `JOYSTICK_MAX_RADIUS_PX` | `70` | Joystick outer ring radius in px |
| `JOYSTICK_BOOST_MAGNITUDE` | `0.6` | >60% deflection = boost trigger |
| `REPLAY_PRE_MAX` | `300` | Pre-death circular buffer size (15s at 20Hz) |
| `REPLAY_POST_MAX` | `300` | Post-death linear buffer size (15s at 20Hz) |
| `DEATH_VIGNETTE_DELAY_MS` | `3000` | Red vignette duration before end screen |
| `REPLAY_POST_RECORD_MS` | `15500` | Timeout for post-death replay capture completion |
| `KILL_FEED_MAX` | `8` | Max kill feed entries |
| `KILL_FEED_AUTO_REMOVE_MS` | `5000` | Auto-remove kill feed entry |
| `KILL_DETECT_RADIUS` | `220` | Heuristic kill detection distance (px) |
| `CAM_LERP_FACTOR` | `0.18` | Camera smoothing factor |
| `CAM_ZOOM_LERP` | `0.05` | Camera zoom smoothing factor |
| `CAM_ZOOM_MIN` | `0.6` | Minimum zoom (big snake) |
| `CAM_ZOOM_MAX` | `1.4` | Maximum zoom (small snake) |
| `CAM_ZOOM_BASE_LENGTH` | `12` | Body length at which zoom starts decreasing |
| `CAM_ZOOM_DECREASE_RATE` | `0.008` | Zoom decrease per body length unit |
| `DPR_CAP` | `2` | Max device pixel ratio for canvas |
| `INPUT_ANGLE_THRESHOLD` | `0.015` | Min angle change to emit |
| `INPUT_MIN_EMIT_INTERVAL` | `50` | Min ms between non-heartbeat emits |
| `PARTICLE_VELOCITY_DAMPING` | `0.96` | Per-frame velocity multiplier |
| `RECONNECT_AUTO_EXIT_MS` | `1800` | Auto-exit after join error |
| `KICKED_AUTO_EXIT_MS` | `1500` | Auto-exit after kick |
| `MINIMAP_SIZE` | `96` | Minimap dimension in px |
| `MINIMAP_MARGIN` | `12` | Minimap margin from edges |
| `MINIMAP_RANGE` | `1800` | Minimap snake detection range |
| `LEADERBOARD_DEFAULT_COLLAPSE_WIDTH` | `640` | window.innerWidth below which leaderboard auto-collapses |
| `CHAT_MAX_LENGTH` | `200` | Max chat message length |
| `MENTION_PREVIEW_LENGTH` | `120` | Max chars in mention toast |
| `REPLAY_FRAME_INTERVAL` | `50` | ms per replay frame at 1x speed |
| `REPLAY_SPEEDS` | `[0.25, 0.5, 1, 2]` | Available replay playback speeds |
| `REPLAY_ZOOM_MIN` | `0.3` | Min replay zoom |
| `REPLAY_ZOOM_MAX` | `2` | Max replay zoom |
| `REPLAY_ZOOM_STEP` | `0.15` | Zoom adjustment per click |
| `REPLAY_DEATH_FOOD_RADIUS` | `300` | Radius to detect food collected near death |
| `REPLAY_GRID_SIZE` | `80` | Replay grid line spacing |
| `REPLAY_SLOW_ZOOM_RATE` | `0.0003` | Slow zoom-out rate when no one collects death food |
| `SNIPPET_COLLAPSE_WIDTH` | `640` | `sm` breakpoint for hiding inline text |

---

## 2. LUCIDE-REACT ICONS (all 26 imported)

| Icon | Usage Location(s) |
|---|---|
| `AlertTriangle` | Connection error overlay |
| `ChevronDown` | Collapsed leaderboard expand button |
| `ChevronUp` | Leaderboard header collapse button |
| `Compass` | EndOverlay extract icon; Play Again button |
| `Landmark` | Carried Chips card icon |
| `Loader2` | Connecting spinner (animated spin) |
| `LogOut` | Connection error "Back to lobby" button; Leave arena button |
| `Map as MapIcon` | Minimap toggle button |
| `MessageSquare` | Chat open button; Emotes bar header |
| `Pause` | Replay pause control |
| `Play` | Replay play control |
| `RotateCcw` | Replay restart button |
| `Send` | Chat dialog send button |
| `Shield` | Score row icon |
| `Signal` | Ping display icon |
| `Skull` | Kills row icon; death end-overlay icon; killer card header |
| `Star` | Stars Earned card icon; Stars in Arena card icon |
| `Swords` | Add Rival button icon |
| `Trophy` | Rank row icon; Extract mobile button; Arena Leaders header |
| `User` | View Profile button icon |
| `UserPlus` | Add Friend button icon |
| `Users` | Bots row icon |
| `WifiOff` | Reconnecting banner icon |
| `X` | Full-map close button |
| `Zap` | Boost row icon; Boost mobile button |
| `ZoomIn` | Replay zoom-in button |
| `ZoomOut` | Replay zoom-out button |

---

## 3. STATE VARIABLES (React — trigger re-render, HUD/overlays only)

| Variable | Type | Initial Value | Purpose |
|---|---|---|---|
| `phase` | `Phase` | `'connecting'` | Game phase: `'connecting'` \| `'playing'` \| `'ended'` |
| `connectingMsg` | `string` | `'Authenticating…'` | Status text shown on connecting overlay |
| `connectionError` | `string \| null` | `null` | Error message replacing spinner |
| `isReconnecting` | `boolean` | `false` | Triggers reconnecting banner |
| `endScreen` | `EndScreenState \| null` | `null` | Death/extract end screen data |
| `hudCarried` | `number` | `0` | Carried chips (HUD) |
| `hudKills` | `number` | `0` | Kill count (HUD) |
| `hudScore` | `number` | `0` | Body-length score (HUD) |
| `hudRank` | `number` | `1` | Player rank (HUD) |
| `hudRealPlayers` | `number` | `1` | Real player count (HUD, secondary) |
| `hudBots` | `number` | `0` | Bot count (HUD) |
| `extracting` | `boolean` | `false` | Extraction in progress flag |
| `extractProgress` | `number` | `0` | Extraction progress 0..1 |
| `showDeathVignette` | `boolean` | `false` | Red radial vignette overlay |
| `fps` | `number` | `60` | Current FPS (HUD) |
| `ping` | `number` | `-1` | Current RTT ms (-1 = unknown) |
| `lowQuality` | `boolean` | `false` | Adaptive quality flag |
| `chatOpen` | `boolean` | `false` | Chat dialog visibility |
| `chatInput` | `string` | `''` | Chat input field value |
| `killFeed` | `KillFeedEntry[]` | `[]` | Kill feed entries (max 8) |
| `hudCommissionRate` | `number` | `0` | Server-reported commission rate |
| `hudLeaderboard` | `ArenaLeaderboardEntry[]` | `[]` | Top 10 leaderboard |
| `hudYourRank` | `number` | `0` | Server-reported your rank |
| `hudRealPlayerCount` | `number` | `isOffline ? 0 : 1` | Server-reported real player count |
| `leaderboardOpen` | `boolean` | `true` | Leaderboard panel visibility |
| `minimapVisible` | `boolean` | `true` | Minimap visibility (auto-hidden in offline) |
| `fullMapOpen` | `boolean` | `false` | Full-screen map overlay |

---

## 4. REF VARIABLES (mutable, read by rAF/handlers, no re-render)

| Variable | Type | Initial Value | Purpose |
|---|---|---|---|
| `canvasRef` | `HTMLCanvasElement \| null` | `null` | Canvas DOM element |
| `socketRef` | `Socket \| null` | `null` | Socket.IO instance |
| `rafRef` | `number \| null` | `null` | requestAnimationFrame handle |
| `resizeObserverRef` | `ResizeObserver \| null` | `null` | Canvas resize observer |
| `snapshotRef` | `GameSnapshot \| null` | `null` | Latest server snapshot |
| `mySnakeIdRef` | `string \| null` | `null` | Player's snake server ID |
| `phaseRef` | `Phase` | `'connecting'` | Phase mirror for rAF |
| `replayPreBufferRef` | `GameSnapshot[]` | `[]` | Circular pre-death replay buffer |
| `replayWriteIdxRef` | `number` | `0` | Write index for circular buffer |
| `replayPostBufferRef` | `GameSnapshot[]` | `[]` | Linear post-death replay buffer |
| `isPostDeathRef` | `boolean` | `false` | Post-death recording flag |
| `postDeathRecordRef` | `number` | `0` | Countdown frames for post-death recording |
| `deathFrameIdxRef` | `number` | `0` | Index in combined replay where death occurs |
| `hasStartedRecordingRef` | `boolean` | `false` | Skip pre-spawn frames flag |
| `keysRef` | `Set<string>` | `new Set()` | Currently held keys |
| `mousePosRef` | `{x, y}` | `{x:0, y:0}` | Mouse position relative to canvas |
| `mouseActiveRef` | `boolean` | `false` | Mouse is active (moved recently) |
| `mouseLeftDownRef` | `boolean` | `false` | Left mouse button held (boost) |
| `touchAngleRef` | `number \| null` | `null` | Touch joystick angle |
| `touchBoostRef` | `boolean` | `false` | Touch joystick boost |
| `joystickRef` | `JoystickState \| null` | `null` | Virtual joystick state |
| `camRef` | `{x, y, zoom}` | `{x:4000, y:4000, zoom:1.0}` | Camera position & zoom |
| `camInitRef` | `boolean` | `false` | Camera has been initialized |
| `particlesRef` | `Particle[]` | `[]` | Particle effects array |
| `metallicCacheRef` | `Map<string, CanvasGradient>` | `new Map()` | Cached metallic gradients |
| `lowQualityRef` | `boolean` | `false` | LQ mirror for rAF |
| `fpsAccumRef` | `{frames, lastSecond, lowSince, highSince}` | `{0,0,0,0}` | FPS accumulation counters |
| `pingRef` | `number` | `-1` | Ping mirror for rAF |
| `pendingPingsRef` | `Map<string, number>` | `new Map()` | Pending ping timestamps |
| `lastPingSentRef` | `number` | `0` | Last ping send timestamp |
| `matchEndedRef` | `boolean` | `false` | Idempotency guard (C3 fix) |
| `startTimeRef` | `number` | `Date.now()` | Match start timestamp |
| `killsRef` | `number` | `0` | Heuristic kill count |
| `prevSnakesRef` | `SnakeSnapshot[]` | `[]` | Previous frame snakes (kill detection) |
| `carriedRef` | `number` | `0` | Last known carried chips |
| `scoreRef` | `number` | `0` | Last known score |
| `wasBoostingRef` | `boolean` | `false` | For boost sound edge trigger |
| `lastInputEmitRef` | `number` | `0` | Last input emit timestamp |
| `lastEmittedAngleRef` | `number` | `0` | Last emitted angle |
| `lastEmittedBoostRef` | `boolean` | `false` | Last emitted boost state |
| `isMountedRef` | `boolean` | `true` | Component mount guard |
| `timersRef` | `Set<Timeout>` | `new Set()` | Tracked timers for cleanup |
| `chatTimeoutsRef` | `Map<string, Timeout>` | `new Map()` | Chat message timeouts |
| `extractActiveRef` | `boolean` | `false` | Extraction currently active |
| `boostHoldRef` | `boolean` | `false` | Mobile boost button held |
| `minimapVisibleRef` | `boolean` | `true` | Minimap mirror for rAF |
| `fullMapOpenRef` | `boolean` | `false` | Full map mirror for rAF |
| `isOfflineModeRef` | `boolean` | `isOffline` | Offline mode mirror for rAF |
| `playerSkinRef` | `string` | `player.currentSkin` | Current cosmetic skin ID |
| `arenaIdRef` | `string` | `arenaId` | Arena ID mirror |
| `playerNameRef` | `string` | `player.name` | Player name mirror |
| `onExitRef` | `function` | `onExit` | Exit callback mirror |
| `offlineEngineRef` | `OfflineGameEngine \| null` | `null` | Offline game engine instance |
| `offlineFinalStateRef` | `OfflineState \| null` | `null` | Offline final state (dead/extracted) |
| `computeInputRef` | `function \| null` | `null` | Input computation function for rAF |

---

## 5. HUD ELEMENTS — BY POSITION

### 5.1 CONNECTING OVERLAY (center, phase === 'connecting')

**Position:** Center of screen, `z-40`
**Container:** `absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm`

#### 5.1.1 Error State (when `connectionError` is truthy)
- **Icon:** `AlertTriangle`, size `h-12 w-12`, color `text-rose-500`
- **Text:** `{connectionError}` (dynamic — set by error handler)
  - Possible values:
    - `"Not authenticated. Please sign in again."`
    - `"Connection failed"` (fallback from connect_error)
    - Join error messages (see §7)
- **Text styling:** `max-w-sm text-center text-lg font-semibold text-foreground`
- **Button:**
  - Label: `"Back to lobby"`
  - Icon: `LogOut` (`h-4 w-4`, `mr-2`)
  - Variant: `outline`
  - Action: `exitNow()`

#### 5.1.2 Connecting State (when no error)
- **Icon:** `Loader2`, size `h-10 w-10`, classes `animate-spin text-primary`
- **Text:** `{connectingMsg || 'Connecting…'}`
  - Possible values:
    - `"Authenticating…"` (initial)
    - `"Reconnecting (attempt N)…"` (on reconnect_attempt)
    - `""` (cleared on join or error)
- **Text styling:** `text-sm text-muted-foreground`

---

### 5.2 RECONNECTING BANNER (top-center, in-game)

**Position:** Top-center of screen
**Show when:** `isReconnecting && phase === 'playing'`
**Container:** `absolute left-1/2 top-3 -translate-x-1/2 flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-300 backdrop-blur-sm`
- **Icon:** `WifiOff`, size `h-3.5 w-3.5`
- **Text:** `"Reconnecting…"`

---

### 5.3 TOP-LEFT HUD (stats panel)

**Position:** `absolute left-3 top-3 z-40`
**Container:** `flex max-w-sm flex-col gap-2 font-mono pointer-events-none`
**Show when:** `phase !== 'connecting'`

#### 5.3.1 Carried Chips Card (online only, hidden when `isOfflineMode`)
**Container:** `rounded-lg border border-emerald-500/30 bg-slate-950/80 px-3 py-2 backdrop-blur-sm`
- **Header:**
  - Icon: `Landmark`, size `h-3 w-3`, color `text-emerald-400`
  - Label: `"Carried Chips"`, classes `text-[10px] uppercase tracking-wider text-slate-500`
- **Value:** `{hudCarried.toLocaleString()}c`
  - Styling: `text-2xl font-bold text-emerald-400 tabular-nums`
  - Suffix: `c` (chips), `text-base` size, `ml-0.5`

#### 5.3.2 Stars Earned Card (online only, conditional)
**Show when:** `!isOfflineMode && hudCarried > (arena?.buyIn ?? 0)`
**Container:** `rounded-lg border border-amber-500/30 bg-slate-950/80 px-3 py-1.5 backdrop-blur-sm`
- **Header:**
  - Icon: `Star`, size `h-3 w-3`, color `text-amber-400`
  - Label: `"Stars Earned"`, classes `text-[10px] uppercase tracking-wider text-slate-500`
- **Value:** `+{Math.max(0, hudCarried - buyIn).toLocaleString()}c`
  - Styling: `text-sm font-bold text-amber-400 tabular-nums`
  - Prefix: `+`
  - Suffix: `c`, `text-xs`

#### 5.3.3 Stars in Arena Card (online only, conditional)
**Show when:** `!isOfflineMode && starsInArena > 0`
**Container:** `rounded-lg border border-yellow-500/30 bg-slate-950/80 px-3 py-1.5 backdrop-blur-sm`
- **Header:**
  - Icon: `Star`, size `h-3 w-3`, color `text-yellow-400`
  - Label: `"Stars in Arena"`, classes `text-[10px] uppercase tracking-wider text-slate-500`
- **Value:** `{starsInArena}`
  - Styling: `text-sm font-bold text-yellow-300 tabular-nums`
  - No suffix

#### 5.3.4 Rank / Score / Kills / Boost Card (always visible)
**Container:** `rounded-lg border border-slate-700/60 bg-slate-950/80 px-3 py-2 backdrop-blur-sm`

| Row | Icon | Icon Color | Label | Label Color | Value | Value Color |
|---|---|---|---|---|---|---|
| Rank | `Trophy` `h-3.5 w-3.5` | `text-yellow-500` | `"Rank:"` | `text-slate-400` | `{rankDisplay}` | `text-yellow-400 font-bold` |
| Score | `Shield` `h-3.5 w-3.5` | `text-indigo-400` | `"Score:"` | `text-slate-400` | `{snakeLength.toLocaleString()}` | `text-white font-bold` |
| Kills | `Skull` `h-3.5 w-3.5` | `text-rose-500` | `"Kills:"` | `text-slate-400` | `{hudKills}` | `text-rose-400 font-bold` |
| Boost | `Zap` `h-3.5 w-3.5` | `text-amber-500` | `"Boost:"` | `text-slate-400` | `"SPACE"` | `text-amber-400 font-bold` |

**Rank display logic:**
- Offline mode: `"#X"` (e.g. `"#3"`)
- Online ≤1 real player: `"#1 of 1"`
- Online >1 real player: `"#{yourRank} of {realPlayerCount}"`

#### 5.3.5 Active Competitors Card (always visible)
**Container:** `rounded-lg border border-slate-700/60 bg-slate-950/80 px-3 py-2 backdrop-blur-sm text-xs`

**Offline mode variant:**
- Label: `"Offline Mode:"` (`text-slate-400`)
- Value: `"1 Player"` (`text-amber-400 font-bold`)

**Online mode variant:**
- Label: `"Real Players:"` (`text-slate-400`)
- Value: `"{count} Active"` (`text-indigo-400 font-bold animate-pulse`)
- Uses `hudRealPlayerCount || hudRealPlayers` (server count preferred)

**Bots row (both modes):**
- Icon: `Users` `h-3.5 w-3.5` `text-slate-400`
- Label: `"Bots:"` (`text-slate-400`)
- Value: `{hudBots}` (`text-slate-300 font-bold`)

---

### 5.4 TOP-RIGHT HUD (banked chips, FPS, ping)

**Position:** `absolute right-3 top-3 z-40`
**Container:** `flex flex-col items-end gap-1.5 font-mono pointer-events-none`
**Show when:** `phase !== 'connecting'`

#### 5.4.1 Banked Chips
**Container:** `rounded-md border border-amber-500/30 bg-slate-950/80 px-2.5 py-1 text-right backdrop-blur-sm`
- **Header:** `"BANKED"`, classes `text-[10px] uppercase tracking-wider text-slate-500`
- **Value:** `{player.bankedChips.toLocaleString()}c`
  - Styling: `text-sm font-bold text-amber-300 tabular-nums`

#### 5.4.2 FPS / Ping / LQ Badge
**Container:** `flex items-center gap-2 rounded-md border border-slate-700/60 bg-slate-950/80 px-2 py-1 text-[11px] backdrop-blur-sm`
- **FPS:** `"{fps} fps"` (`text-slate-400`)
- **Ping:**
  - Icon: `Signal` `h-3 w-3`
  - When `ping < 0`: `"—"` (em dash), color `text-muted-foreground`
  - When `ping < 80`: `"{ping}ms"`, color `text-emerald-400`
  - When `ping < 160`: `"{ping}ms"`, color `text-amber-400`
  - When `ping >= 160`: `"{ping}ms"`, color `text-rose-400`
- **Low Quality Badge** (conditional when `lowQuality === true`):
  - Text: `"🎨 LQ"`
  - Styling: `rounded bg-amber-500/20 px-1 text-amber-300`
  - Tooltip: `"Low quality mode (adaptive)"`

---

### 5.5 TOP-RIGHT ROW — CHAT + MINIMAP TOGGLE (below BANKED/FPS)

**Position:** `absolute right-3 top-[92px] z-20`
**Show when:** `phase === 'playing'`

#### 5.5.1 Chat Button
- **Icon:** `MessageSquare` `h-4 w-4`
- **Type:** Icon button (`size="icon"`, `variant="outline"`)
- **Size:** `h-9 w-9 rounded-full`
- **Styling:** `border-primary/40 bg-card/80 backdrop-blur-sm`
- **Aria-label:** `"Open chat"`
- **Action:** `setChatOpen(true)`

#### 5.5.2 Minimap Toggle Button
- **Icon:** `MapIcon` `h-3.5 w-3.5`
- **Type:** Small button (`size="sm"`, `variant="outline"`)
- **Size:** `h-9 rounded-full`
- **Styling:** `border-primary/40 bg-card/80 px-3 text-[10px] uppercase tracking-wider backdrop-blur-sm`
- **Aria-label:** `"Collapse minimap"` / `"Show minimap"`
- **Text (desktop only, hidden on mobile via `hidden sm:inline`):**
  - When visible: `"Collapse"`
  - When hidden: `"Show Minimap"`
- **Action:** `setMinimapVisible(v => !v)`

---

### 5.6 TOP-RIGHT — ARENA LEADERBOARD PANEL

**Position:** `absolute right-3 top-[140px] z-20 max-h-[60vh]`
**Show when:** `phase !== 'connecting'`

#### 5.6.1 Open State
**Container:** `w-[240px] max-w-[80vw] overflow-hidden rounded-lg border border-slate-700/60 bg-slate-950/90 backdrop-blur-md`

**Header:**
- Icon: `Trophy` `h-3 w-3` `text-yellow-500`
- Label: `"Arena Leaders"`, classes `text-[10px] uppercase tracking-wider text-slate-500`
- Collapse button:
  - Icon: `ChevronUp` `h-3.5 w-3.5`
  - Aria-label: `"Collapse leaderboard"`
  - Action: `setLeaderboardOpen(false)`

**Empty State:**
- Text: `"No real players yet."`
- Styling: `px-2 py-3 text-center text-[10px] text-slate-500`

**Entry Row** (per leaderboard entry):
- **Rank number:** `{i + 1}` (1-indexed), `w-5 text-right text-slate-500 tabular-nums`
- **Country flag:** `{countryFlag(entry.country)}` (conditional, `text-xs leading-none`)
- **Name:** `{entry.name || 'Unknown'}`, truncated with `flex-1 truncate`
  - Self: `font-bold text-indigo-300` + `border border-indigo-500/30 bg-indigo-500/15`
  - Others: `text-slate-300`
  - Tooltip: `entry.name` (full name on hover)
- **YOU badge** (self only):
  - Text: `"YOU"`, `text-[9px] font-bold`
  - Offline: `bg-emerald-500/30 text-emerald-200`
  - Online: `bg-indigo-500/30 text-indigo-200`
- **Value column:**
  - Offline mode: `{entry.score.toLocaleString()}` (score), `text-indigo-300`
  - Online mode: `{entry.carriedChips.toLocaleString()}c` (chips with suffix), `text-emerald-400`

**List container:** `max-h-72 overflow-y-auto p-1.5 va-scroll`

#### 5.6.2 Collapsed State
- **Icon:** `ChevronDown` `h-3.5 w-3.5` `text-yellow-500`
- **Text (desktop only):** `"Show Leaderboard"`, `text-[10px] uppercase tracking-wider text-slate-400`
- **Styling:** `flex h-9 items-center gap-1.5 rounded-full border border-slate-700 bg-slate-950/85 px-3 backdrop-blur-sm hover:text-white`
- **Aria-label:** `"Show leaderboard"`
- **Action:** `setLeaderboardOpen(true)`

---

### 5.7 TOP-RIGHT — FULL-MAP CLOSE BUTTON (M key)

**Position:** `absolute right-4 top-4 z-30`
**Show when:** `fullMapOpen && phase === 'playing'`
- **Icon:** `X` `h-4 w-4`
- **Size:** `h-10 w-10 rounded-full`
- **Styling:** `border border-slate-700 bg-slate-900/80 text-slate-300 backdrop-blur-sm hover:text-white`
- **Aria-label:** `"Close full map"`
- **Action:** `setFullMapOpen(false)`

---

### 5.8 DEATH VIGNETTE OVERLAY

**Position:** `absolute inset-0 z-30 pointer-events-none`
**Show when:** `showDeathVignette === true`
- **Animation:** `animate-[fadeIn_300ms_ease-out]`
- **Visual:** Radial gradient ellipse:
  - Center: `transparent 30%`
  - Edge: `rgba(220, 38, 38, 0.6) 100%`
- **Duration:** 3 seconds (DEATH_VIGNETTE_DELAY_MS)
- **Aria:** `aria-hidden="true"`

---

### 5.9 KILL FEED (top-left, below stats)

**Position:** `absolute left-3 top-28 z-20 w-64 max-w-[70vw]`
**Container:** `pointer-events-none flex flex-col gap-0.5 font-mono`
**Show when:** `killFeed.length > 0`

**Entry row styling:** `animate-in fade-in slide-in-from-left-2 flex items-center gap-1 rounded bg-slate-950/75 px-2 py-1 text-[10px] backdrop-blur-sm`

**Wall death entry format:**
- `"{victimName} hit the wall"`
  - Victim name color: `text-orange-400` (bot) or `text-slate-200` (player)
  - "hit the wall" color: `text-red-400`
  - Wrapper: `text-slate-400`

**Elimination entry format:**
- `"{killerName} eliminated {victimName}"`
  - Killer name color: `text-orange-400` (bot) or `text-emerald-400` (player)
  - "eliminated" color: `text-slate-500`
  - Victim name color: `text-orange-400` (bot) or `text-red-400` (player)
  - Wrapper: `text-slate-400`

---

### 5.10 HOLD-TO-EXTRACT POPUP (top-center)

**Position:** `absolute left-1/2 top-14 -translate-x-1/2`
**Show when:** `phase === 'playing' && !endScreen`
**Container:** `pointer-events-none flex flex-col items-center gap-1 text-center`

#### 5.10.1 Instruction Text
- **Text:** `"Hold E or press the button below to cash out safely!"`
- Styling: `text-[11px] font-mono text-slate-400`
- `<kbd>` element: `E`, classes `rounded border border-slate-600 bg-slate-800 px-1 text-[10px] text-slate-200`

#### 5.10.2 Extracting State
**Container:** `rounded-lg border border-amber-500/40 bg-slate-950/85 px-4 py-2 backdrop-blur-sm`
- **Title:** `"EXTRACTING CHIPS ({progress}%)"` (e.g. `"EXTRACTING CHIPS (47%)"`)
  - Styling: `text-xs font-bold text-amber-400`
- **Progress bar:**
  - Track: `h-2 w-48 overflow-hidden rounded-full bg-slate-800`
  - Fill: `h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-500`
  - Width: `{progress * 100}%`, transition `duration-100`
- **Fee display** (online only):
  - When `commissionRate > 0`: `"FEE: {X}%"`, `text-yellow-500`, `text-[10px] font-mono`
  - When `commissionRate === 0`: `"FEE: 0% (LOW POPULATION)"`, `text-emerald-400`, `text-[10px] font-mono`

#### 5.10.3 Idle State (not extracting)
- **Text (online):** `"HOLD TO EXTRACT SUCCESSFUL!"`, `text-[11px] font-bold text-emerald-400`
- **Text (offline):** `"HOLD TO LEAVE PRACTICE ARENA"`, `text-[11px] font-bold text-emerald-400`

---

### 5.11 MOBILE CONTROLS — BOOST + EXTRACT (bottom-right)

**Position:** `absolute bottom-6 right-6 flex items-end gap-3`
**Show when:** `phase === 'playing'`

#### 5.11.1 Boost Button
- **Size:** `h-16 w-16 rounded-full`
- **Icon:** `Zap` `h-6 w-6`
- **Label:** `"BOOST"`, `text-[10px] font-bold`
- **Styling:** `border border-amber-400/50 bg-amber-500/20 text-amber-300 shadow-lg`
- **Active state:** `active:scale-95 transition-transform`
- **Input:** `touch-none select-none flex-col items-center justify-center`
- **Aria-label:** `"Boost"`
- **Pointer events:** `onPointerDown` → `onBoostPointerDown`, `onPointerUp`/`onPointerCancel` → `onBoostPointerUp`, `onContextMenu` → `preventDefault`

#### 5.11.2 Extract Button
- **Size:** `h-20 w-20 rounded-full` (larger than boost)
- **Icon:** `Trophy` `h-6 w-6`
- **Label (idle):** `"EXTRACT"`, `text-[10px] font-bold`
- **Label (extracting):** `"{progress}%"`, `text-[10px] font-bold`
- **Styling (idle):** `border-emerald-400/60 bg-emerald-500/15 text-emerald-300 shadow-lg`
- **Styling (extracting):** `border-emerald-400 bg-emerald-500/40 text-white shadow-lg`
- **Active state:** `active:scale-95 transition-transform`
- **Input:** `touch-none select-none flex-col items-center justify-center`
- **Aria-label:** `"Extract chips"`
- **Pointer events:** `onPointerDown` → `onExtractPointerDown`, `onPointerUp`/`onPointerCancel` → `onExtractPointerUp`, `onContextMenu` → `preventDefault`

---

### 5.12 LEAVE ARENA BUTTON (bottom-left, beside emotes)

**Position:** `absolute bottom-6 left-3 sm:left-28`
**Show when:** `phase === 'playing'`
- **Icon:** `LogOut` `h-3.5 w-3.5`
- **Label:** `"Leave"`
- **Size:** `h-10`
- **Styling:** `rounded-full border border-slate-700 bg-slate-950/80 px-3 text-xs font-medium text-slate-400 backdrop-blur-sm hover:text-foreground`
- **Aria-label:** `"Leave arena"`
- **Action:** `exitNow()`

---

### 5.13 QUICK CHAT EMOTES BAR (bottom-left)

**Position:** `absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-20`
**Container width:** `w-[min(60vw,280px)]`
**Container styling:** `rounded-xl border border-slate-800 bg-slate-950/90 p-2.5 backdrop-blur-md`
**Show when:** `phase === 'playing'`

**Header:**
- Icon: `MessageSquare` `h-3 w-3` `text-indigo-400`
- Label: `"Emotes (Keys 1-5)"`, classes `text-[10px] font-mono uppercase tracking-wider text-slate-400`

| Button Label | Socket Message | Key |
|---|---|---|
| `"GG! 🏆"` | `"GG! 🏆"` | `1` |
| `"Target! 🎯"` | `"Target Spot! 🎯"` | `2` |
| `"Flee! 🏃💨"` | `"Fleeing! 🏃💨"` | `3` |
| `"Ripped! 💪"` | `"Get Ripped! 💪"` | `4` |
| `"Extracting! ⚡"` | `"Extracting soon! ⚡"` | `5` |

**Button styling:** `rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[10px] font-medium text-slate-300 hover:bg-slate-800`
**Note:** Button labels are shortened versions of the actual socket messages (e.g., `"Target! 🎯"` sends `"Target Spot! 🎯"`).

---

### 5.14 MINIMAP (canvas-drawn, bottom-right)

**Position:** Canvas-drawn at `(cssW - 96 - 12, cssH - 96 - 12)`
**Show when:** `minimapVisibleRef.current === true` (auto-hidden in offline mode)
- **Size:** 96×96 px
- **Margin:** 12px from edges
- **Range:** 1800 (only nearby snakes visible)
- **Renders:** Arena boundary, snake dots, player dot
- **Function:** `drawMinimap()` from `render-helpers.ts`

---

### 5.15 VIRTUAL JOYSTICK (canvas-drawn, bottom-left quadrant)

**Position:** Wherever touch begins in bottom-left quadrant (`x < width/2, y > height/2`)
**Show when:** Active touch detected in quadrant
- **Outer ring:** Radius `JOYSTICK_MAX_RADIUS_PX` (70px)
  - Fill: `rgba(129, 140, 248, 0.12)` (indigo-400 alpha)
  - Stroke: `rgba(129, 140, 248, 0.5)`, lineWidth `2`
- **Inner stick:** Radius 24px
  - Fill: `rgba(129, 140, 248, 0.85)` (indigo-400 opaque)

---

### 5.16 CANVAS BACKGROUND

- **Fill color:** `#020617` (Deep Slate / slate-950)
- **DPR capping:** `Math.min(window.devicePixelRatio || 1, 2)`

---

## 6. END OVERLAY (EndOverlay sub-component)

**Position:** `absolute inset-0 z-50 flex items-center justify-center`
**Overlay:** `bg-slate-950/80 backdrop-blur-md`
**Dialog attributes:** `role="dialog"`, `aria-modal="true"`
**Aria-label:** `"Extraction successful"` / `"You died"`
**Panel:** `w-[min(94vw,520px)] rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl`

### 6.1 Top Accent Bar
- **Extract:** `h-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-t-2xl`
- **Death:** `h-1.5 bg-red-600 rounded-t-2xl`

### 6.2 Icon
- **Extract:** `Compass` `h-9 w-9 text-yellow-400`
  - Conditionally animated: `animate-spin` with `animationDuration: '6s'` (except when title = "Practice Run Completed!")
  - Container: `border-yellow-500/20 bg-yellow-500/10`
- **Death:** `Skull` `h-9 w-9 text-red-500`
  - Container: `border-red-500/20 bg-red-500/10`
- Container: `mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border`

### 6.3 Title (centered)
- **Extract (offline):** `"Practice Run Completed!"`
- **Extract (online, chips > 0):** `"Extraction Completed!"`
- **Extract (online, no chips):** `"Secure Extraction!"`
- **Death:** `"Arena Disintegration!"`
- Styling: `text-center text-2xl font-bold text-white`

### 6.4 Subtitle

#### Extract subtitle (online, chips > 0):
`"Tactical extraction successful! You secured {carriedChips} star chips, eliminated {kills} rivals, reached a max size of {snakeLength}, and survived for {mins}m {secs}s."`
#### Extract subtitle (online, no chips):
`"Tactical extraction successful! You exited safely after surviving for {mins}m {secs}s, eliminating {kills} rivals, with a final snake size of {snakeLength}."`
#### Extract subtitle (offline):
`"Practice run finished! You eliminated {kills} training bots, reached a max size of {snakeLength}, and survived for {mins}m {secs}s."`
#### Death subtitle (offline):
`"Offline Training — No chips lost."`
#### Death subtitle (online):
`"Your snake head collided with a rival. All unbanked carried chips were lost in-match."`

All subtitles: `mt-1 text-center text-xs text-slate-400`

### 6.5 Death Stats Panel (death, online)
**Container:** `mt-4 rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs font-mono`

| Label | Value |
|---|---|
| `"Stakes Buy-In Cost:"` | `"-{buyIn} chips"` (`text-red-400`) |
| `"Match Carried Value Forfeited:"` | `"-{carriedChips} c"` (`text-slate-500`) |
| `"Opponents Eliminated:"` | `"{kills} Kills"` (`text-white`) |

### 6.6 Death Stats Panel (death, offline)
**Container:** Same styling as above

| Label | Value |
|---|---|
| `"Opponents Eliminated:"` | `"{kills} Kills"` (`text-white`) |

### 6.7 Killer Card (death, when killer exists)
**Container:** `mt-3 rounded-lg border border-rose-900/50 bg-slate-900/60 p-3`

**Header:**
- Icon: `Skull` `h-3 w-3`
- Label: `"Collided With / Eliminated By"`
- Styling: `text-[10px] uppercase tracking-wider text-rose-400 font-mono`

**Tag badge** (when `killer.tag` exists):
- Text: `{killer.tag}`
- Styling: `rounded bg-slate-900 px-1.5 py-0.5 text-[10px] font-mono text-slate-400`

**Killer avatar + info:**
- **Avatar:** Circle `h-8 w-8 rounded-full text-xs font-bold text-white`
  - Background: `killer.color ?? '#f43f5e'`
  - Text: `killer.name.substring(0, 2).toUpperCase()` (first 2 chars) or `'??'`
- **Name:** `{killer.name}`, `text-xs font-bold text-white`
- **Type label:**
  - Real player (`killer.isBot === false`): `"Online Rival Player"`, `text-[10px] text-slate-400`
  - Bot: `"Arena AI Combatant"`, `text-[10px] text-slate-400`

**Social buttons** (only for real players, `killer.isBot === false`):
- **View Profile:** `User` icon + `"View Profile"`, `bg-slate-700 px-2.5 py-1 text-[11px] font-bold text-white`
- **Add Rival:** `Swords` icon + `"Add Rival"`, `bg-rose-600 px-2.5 py-1 text-[11px] font-bold text-white`
- **Add Friend:** `UserPlus` icon + `"Add Friend"`, `bg-slate-800 px-2.5 py-1 text-[11px] font-bold text-white`

### 6.8 Replay Viewer (death only)
**Show when:** `hasReplay && !showReplay`
- **Button text:** `"📺 Watch Death Replay"`
- **Styling:** `mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 py-2.5 text-xs font-bold text-indigo-300 hover:bg-indigo-500/20`
- **Minimum frames to show:** `replayFrames.length > 10`

**When replay is shown:**
- Online mode: uses `OnlineReplayPlayer` component
- Offline mode: uses embedded `ReplayPlayer` component
- **Hide button (online):** `"Hide Replay"`, `mt-2 flex w-full items-center justify-center gap-1 rounded-md bg-slate-800 py-1.5 text-[10px] font-bold text-slate-300`

### 6.9 Extract Performance Stats (3-column grid)
**Container:** `mt-4 grid grid-cols-3 gap-2 text-center`

| Column | Header | Value Styling |
|---|---|---|
| Kills | `"Kills"` (`text-[10px] uppercase text-slate-500`) | `{kills}` (`text-lg font-bold text-rose-400`) |
| Max Length | `"Max Length"` (`text-[10px] uppercase text-slate-500`) | `{snakeLength}` (`text-lg font-bold text-indigo-400`) |
| Survival Time | `"Survival Time"` (`text-[10px] uppercase text-slate-500`) | `{M:SS}` (`text-lg font-bold text-sky-400`) |

All containers: `rounded-md border border-slate-800 bg-slate-900/60 p-2`

### 6.10 Online Extract Results Table
**Container:** `mt-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs font-mono`

| Label | Value |
|---|---|
| `"Carried Value:"` | `"{carriedChips} chips"` (`text-white`) |
| `"System Commission (X%)"` / `"System Commission (0% — Low Density)"` | `"-{commission} chips"` (`text-yellow-500`) |
| `"BANKED TO ACCOUNT:"` (bold) | `"+{bankedAmount} c"` (`text-emerald-400 font-bold`) |

Commission label logic: When `commission > 0`, appends `({percentage}%)`; when `commission === 0`, appends `(0% — Low Density)`.

### 6.11 Offline Extract Results
**Container:** `mt-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-center`
- **Header:** `"Offline Training Complete"`, `text-xs font-mono uppercase tracking-wider text-amber-400/95`
- **Subtext:** `"No buy-in or banking fees. Great job sharpening your skills and maneuvers!"`, `text-[11px] text-slate-400`

### 6.12 Final Banked + Level (when `result` exists)
**Container:** `mt-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs font-mono`

| Label | Value |
|---|---|
| `"Total Banked:"` | `"{finalBankedChips}c"` (`text-amber-300 font-semibold`) |
| `"Level:"` | `"{result.newLevel}"` (`text-white font-semibold`) + optional badge |

**Level Up Badge** (when `leveledUp === true`):
- Text: `"↑ Level Up!"`, `ml-1 rounded bg-emerald-500/20 px-1 text-emerald-300`

### 6.13 Pending Tally
- **Text:** `"Final tally pending from server…"`
- Styling: `mt-3 text-center text-xs text-slate-400`
- **Show when:** `!result`

### 6.14 Action Buttons

| Button | ID | Label | Gradient/Style |
|---|---|---|---|
| Play Again (extract) | `btn-success-play-again` | `Compass icon + "PLAY AGAIN"` | `bg-gradient-to-r from-emerald-500 to-teal-500` |
| Play Again (death) | `btn-defeat-play-again` | `Compass icon + "PLAY AGAIN"` | `bg-gradient-to-r from-red-600 to-rose-600` |
| Watch Video | (none) | `"📺 Watch Video (Get +50 Chips)"` | `border border-amber-500/40 bg-amber-500/10 text-amber-300` |
| Exit (extract, online) | `btn-success-close` | `"SECURE CHIPS & RETURN TO LOBBY"` | `bg-slate-800 text-slate-200` |
| Exit (extract, offline) | `btn-success-close` | `"RETURN TO LOBBY"` | `bg-slate-800 text-slate-200` |
| Exit (death) | `btn-defeat-close` | `"RETURN TO LOBBY"` | `bg-slate-800 text-slate-200` |

All buttons: `mt-5 flex flex-col gap-2`, `flex w-full items-center justify-center gap-2 rounded-xl`, Play Again = `py-3 text-sm font-bold text-white shadow-lg active:scale-[0.98]`, others = `py-2.5 text-xs font-bold`

### 6.15 ESC Hint
- **Text:** `"Press ESC to exit"`
- Styling: `mt-3 text-center text-[10px] text-slate-500`

---

## 7. REPLAY PLAYER (ReplayPlayer sub-component)

### 7.1 Canvas Watermarks (drawn on canvas)
- **Replay indicator:** `"⏺ REPLAY"`, `bold 12px monospace`, `rgba(244, 63, 94, 0.8)`, left-aligned at `(10, 10)`
- **Pre-death frame info:** `"Frame {N}/{total} | -{X}s to death"`, `10px monospace`, `rgba(226, 232, 240, 0.6)`
- **Post-death frame info:** `"⛔ DEATH +{X}s | Frame {N}/{total}"`, `10px monospace`, `rgba(244, 63, 94, 0.9)`

### 7.2 Progress Bar
- **Track:** `h-1.5 bg-slate-800`
- **Fill:** `bg-rose-500`, `transition-all duration-75`, `width: {progress}%`
- **Death marker:** Vertical line `h-full w-0.5 bg-yellow-400` at `{deathProgress}%`, tooltip: `"💀 Death"`

### 7.3 Controls (bottom-center)
| Control | Icon | Styling | Action |
|---|---|---|---|
| Restart | `RotateCcw` `h-3.5 w-3.5` | `h-8 w-8 bg-slate-900/80 text-white` | `restart()` |
| Play/Pause | `Pause`/`Play` `h-4 w-4` | `h-9 w-9 bg-rose-600 text-white` | `togglePlay()` |
| Speed | `"{N}x"` text | `h-8 bg-slate-900/80 px-2.5 text-white text-xs font-mono font-bold` | `cycleSpeed()` |
| Zoom Out | `ZoomOut` `h-3.5 w-3.5` | `h-8 w-8 bg-slate-900/80 text-white` | `adjustZoom(-0.15)` |
| Zoom % | `"{N}%"` | `text-[10px] text-slate-400 font-mono w-8 text-center` | Display only |
| Zoom In | `ZoomIn` `h-3.5 w-3.5` | `h-8 w-8 bg-slate-900/80 text-white` | `adjustZoom(0.15)` |

**Speed values:** `0.25x`, `0.5x`, `1x`, `2x` (cycles)
**Zoom display:** `{Math.round(zoom * 100)}%` (e.g., `"80%"`)
**Container:** `absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2`

### 7.4 Replay Camera Behavior
- **Pre-death:** Follows player's snake head
- **At death:** Centers on midpoint of body (where food drops)
- **Post-death:** Stays at death position + slow zoom out (rate 0.0003/frame), OR follows entity that collected death food (closest snake to collected food within 300px radius)

---

## 8. CHAT DIALOG

**Component:** `Dialog` with `showCloseButton`
**Position:** Center modal
**Width:** `sm:max-w-md`

- **Title:** `"Send a message"` (`DialogTitle`)
- **Input:**
  - Placeholder: `"Type a message…"`
  - Max length: `200`
  - Auto focus: `true`
  - On Enter key: submit
- **Send button:** `Send` icon + `"Send"`, disabled when input is empty
- **Cancel button:** `"Cancel"`, variant `outline`

---

## 9. ALL TOAST MESSAGES

| Trigger | Title | Description | Variant |
|---|---|---|---|
| Connected (online) | `"Connected"` | `"Connected to real-time multiplayer shard!"` | default |
| Connected (offline) | `"Practice Mode"` | `"Offline training arena loaded."` | default |
| Join error (any) | `"Cannot join arena"` | (reason-specific messages, see §7.1) | `destructive` |
| Extract failed | `"Extraction failed"` | `"You moved or took damage."` or `data?.reason` | `destructive` |
| Steering detected | `"⚠ Steering Detected"` | `"Extraction progress restarted! Keep moving straight."` | `destructive` |
| Eliminated (online) | `"Eliminated"` | `"ELIMINATED: You collided with {killerName}! 💀"` (fallback: `"another player"`) | `destructive` |
| Crashed (offline) | `"Crashed"` | `"CRASH! (Offline Practice Mode - No chips lost!)"` | default |
| Kicked | `"Kicked"` | `data?.reason` or `"You were removed by an admin."` | `destructive` |
| Server shutdown | `"Server restarting"` | `"The game server is going down for maintenance."` | `destructive` |
| Server error | `"Server error"` | `data?.message` or `"An error occurred."` | `destructive` |
| Level up | `"Level Up!"` | `"LEVEL UP! You reached Level {newLevel}!"` | default |
| Rival added | `"Rival Added"` | `"⚔️ {killer.name} added to your Rival List! Hunt them in future lobbies!"` | default |
| Friend added | `"Friend Added"` | `"🤝 Added {killer.name} ({killer.tag}) to your Friends list!"` | default |
| View profile | `"Viewing Profile"` | `"👁️ Viewing {killer.name}'s profile ({killer.tag})"` | default |
| Mention in chat | `"{senderName} mentioned you"` | `data.message.slice(0, 120)` | default |

### 9.1 Join Error Reason Messages
| Reason Key | Message |
|---|---|
| `insufficient_chips` | `"Not enough chips to enter this arena."` |
| `banned` | `"Your account has been banned."` |
| `invalid_arena` | `"This arena does not exist."` |
| `already_in_match` | `"You are already in a match."` |
| (fallback) | `"Could not join arena."` |

---

## 10. ALL EMOTE TEXTS (full socket messages vs button labels)

| Key | Button Label (UI) | Socket Message (sent) |
|---|---|---|
| `1` | `"GG! 🏆"` | `"GG! 🏆"` |
| `2` | `"Target! 🎯"` | `"Target Spot! 🎯"` |
| `3` | `"Flee! 🏃💨"` | `"Fleeing! 🏃💨"` |
| `4` | `"Ripped! 💪"` | `"Get Ripped! 💪"` |
| `5` | `"Extracting! ⚡"` | `"Extracting soon! ⚡"` |

---

## 11. SOUND EFFECT TRIGGERS

| Function | Trigger Condition |
|---|---|
| `initGameAudio()` | On first socket `connect` |
| `setGameAudioMuted()` | Imported but not directly called in this file |
| `playExtractStart()` | Server emits `extract_start` |
| `playExtractSuccess()` | Server emits `match_result` with `outcome === 'extract'` |
| `playExtractRestart()` | Server emits `extract_cancelled_by_steer` |
| `playFoodCollect('star')` | Star chip collected (`carriedChips` increases, online only) |
| `playFoodCollect('large')` | Score gain ≥ 5 (not star) |
| `playFoodCollect('medium')` | Score gain ≥ 3 but < 5 |
| `playFoodCollect('small')` | Score gain < 3 |
| `playBoost()` | Snake transitions from not boosting to boosting (`isBoosting && !wasBoosting`) |
| `playDeath()` | Death with a killer (`data.killerName` exists) |
| `playWallHit()` | Death without a killer (wall collision) |
| `playKill()` | Kill feed event where `killerIsBot === false` |

---

## 12. SOCKET.IO EVENTS (all 16)

### Client → Server:
| Event | Payload |
|---|---|
| `join_arena` | `{ arenaId: string }` |
| `leave` | `{}` |
| `input` | `{ angle: number, wantsBoost: boolean }` |
| `ping` | `{ t: number, id: string }` |
| `extract` | `{}` |
| `cancel_extract` | `{}` |
| `chat` | `{ message: string }` |

### Server → Client:
| Event | Payload Type | Handler |
|---|---|---|
| `connect` | — | Reset reconnecting, emit join, init audio, reset ping clock |
| `disconnect` | — | Set reconnecting, clear keys |
| `connect_error` | `Error` | Set reconnecting + error message |
| `reconnect_attempt` | `number` (attempt) | Update connecting msg |
| `joined` | `JoinedPayload` | Set phase to playing, reset HUD, show toast |
| `join_error` | `JoinErrorPayload` | Show error toast, auto-exit |
| `snapshot` | `GameSnapshot` | Update snapshot ref, HUD, replay buffer, kill detection, leaderboard |
| `match_result` | `MatchResultPayload` | Set phase to ended, play sound, show end screen |
| `extract_start` | `ExtractStartPayload` | Set extracting flag, play sound |
| `extract_progress` | `ExtractProgressPayload` | Update progress 0..1 |
| `extract_fail` | `ExtractFailPayload` | Clear extraction, show toast |
| `extract_cancelled_by_steer` | — | Play restart sound, show toast |
| `kill_feed` | `{ victimName, victimIsBot, killerName, killerIsBot, cause }` | Add to feed (max 8), auto-remove 5s |
| `death` | `DeathPayload` | Play death/wall sound, show vignette, prepare end screen |
| `chat` | `ChatPayload` | Check for mentions, show toast |
| `kicked` | `KickedPayload` | Show toast, auto-exit |
| `server_shutdown` | — | Show toast, auto-exit |
| `error` | `ServerErrorPayload` | Show toast |
| `pong` | `PongPayload` | Calculate RTT, update ping state |

---

## 13. KEYBOARD CONTROLS

| Key | Action |
|---|---|
| `W` / `ArrowUp` | Steer up |
| `S` / `ArrowDown` | Steer down |
| `A` / `ArrowLeft` | Steer left |
| `D` / `ArrowRight` | Steer right |
| `Space` | Boost (hold) |
| `E` (hold) | Extract |
| `E` (release) | Cancel extract |
| `M` | Toggle full-screen arena map |
| `Escape` | Exit (when `phase === 'ended'`) |
| `1`–`5` | Send quick emote |
| `Enter` | Submit chat (when dialog open) |
| Arrow keys + Space | `preventDefault()` to prevent page scroll |
| (blur) | Clear all stuck keys |

---

## 14. COLOR REFERENCES (Tailwind Classes)

### Background / Surface Colors
| Class | Context |
|---|---|
| `bg-background` / `bg-background/80` | Main canvas wrapper, connecting overlay |
| `bg-slate-950/80` | Most HUD card backgrounds |
| `bg-slate-950/90` | Leaderboard, emotes bar |
| `bg-slate-950` | End overlay panel, replay container |
| `bg-slate-900` | End screen stat panels, replay controls |
| `bg-slate-900/60` | End screen stat rows |
| `bg-slate-900/80` | Replay controls, killer tag badge |
| `bg-card/80` | Chat/minimap buttons |

### Border Colors
| Class | Context |
|---|---|
| `border-emerald-500/30` | Carried Chips card |
| `border-amber-500/30` | Stars Earned, Banked Chips |
| `border-yellow-500/30` | Stars in Arena |
| `border-slate-700/60` | Rank/score card, competitors card, FPS/ping |
| `border-slate-800` | Emotes bar, leaderboard container, replay |
| `border-slate-700` | Leave button, collapsed leaderboard, full-map close |
| `border-amber-500/40` | Reconnecting banner, Watch Video button |
| `border-rose-900/50` | Killer card |
| `border-indigo-500/30` | Replay button, leaderboard self-entry |
| `border-primary/40` | Chat/minimap toggle buttons |

### Text Colors
| Class | Context |
|---|---|
| `text-foreground` | Connection error text |
| `text-muted-foreground` | Connecting msg, unknown ping |
| `text-slate-500` | HUD labels, leaderboard header, etc. |
| `text-slate-400` | HUD secondary labels, most descriptive text |
| `text-slate-300` | HUD values, competitors, bots |
| `text-slate-200` | Kill feed player names, reconnecting banner kbd |
| `text-white` | Score value, end overlay titles/buttons |
| `text-emerald-400` | Carried chips value, leaderboard chip values, extract success |
| `text-emerald-300` | Leaderboard self-name, YOUR badge (offline) |
| `text-emerald-200` | YOUR badge (offline) |
| `text-amber-400` | Stars Earned, boost label, active competitors (offline), KillFeed human victim |
| `text-amber-300` | Banked chips value, Stars in Arena, Watch Video button, FPS badge, final banked |
| `text-amber-500` | LQ badge background, extracting popup |
| `text-yellow-400` | Rank value, Trophy icon, leaderboard rank, end extract icon, replay death marker |
| `text-yellow-500` | Extraction fee, commission value, Compass icon in header |
| `text-yellow-300` | Stars in Arena value |
| `text-indigo-400` | Score icon, real players count, emotes header, leaderboard self-value (offline) |
| `text-indigo-300` | Leaderboard self-name (online), replay button |
| `text-indigo-200` | YOUR badge (online) |
| `text-rose-400` | Kills value, kill feed wall text |
| `text-rose-500` | Kills icon, AlertTriangle, Skull death icon |
| `text-rose-600` | Death accent bar, Play/Pause button, Add Rival button |
| `text-orange-400` | Kill feed bot names (victims/killers) |
| `text-red-400` | Kill feed eliminated victim (player) |
| `text-sky-400` | Survival time value |

### Canvas Colors (raw CSS values)
| Value | Context |
|---|---|
| `#020617` | Canvas background fill (Deep Slate) |
| `#1e293b` | Replay grid lines |
| `rgba(129, 140, 248, 0.12)` | Joystick outer ring fill (indigo-400) |
| `rgba(129, 140, 248, 0.5)` | Joystick outer ring stroke (indigo-400) |
| `rgba(129, 140, 248, 0.85)` | Joystick inner stick fill (indigo-400) |
| `rgba(220, 38, 38, 0.6)` | Death vignette outer (red-600) |
| `rgba(244, 63, 94, 0.8)` | Replay watermark "⏺ REPLAY" (rose-500) |
| `rgba(244, 63, 94, 0.9)` | Replay post-death frame info (rose-500) |
| `rgba(226, 232, 240, 0.6)` | Replay pre-death frame info (slate-200) |
| `#f43f5e` | Killer avatar default color (rose-500) |

---

## 15. REPLAY BUFFER SYSTEM

- **Pre-death buffer:** Circular, `REPLAY_PRE_MAX = 300` frames (15s at 20Hz server tick rate)
- **Post-death buffer:** Linear, `REPLAY_POST_MAX = 300` frames (15s)
- **Skip condition:** Frames before player snake exists are not recorded (`hasStartedRecordingRef`)
- **Combined replay:** `[...preFrames, ...postFrames]` — pre frames are time-ordered (oldest → newest), post frames appended linearly
- **Death frame index:** `preFrames.length` — marks the exact frame where death occurred in the combined array

---

## 16. CONNECTING MESSAGE STATES

| State | Text |
|---|---|
| Initial | `"Authenticating…"` |
| On `reconnect_attempt` | `"Reconnecting (attempt N)…"` (N = attempt number) |
| On `joined` (online) | `""` (cleared) |
| On `joined` (offline) | `""` (cleared) |
| On connection error | `""` (cleared, replaced by `connectionError`) |
| On join error | `""` (cleared, replaced by `connectionError`) |
| On play again | `"Rejoining arena…"` |

---

## 17. CONDITIONAL DISPLAY DIFFERENCES (Online vs Offline)

| Element | Online | Offline |
|---|---|---|
| Carried Chips card | Visible | Hidden |
| Stars Earned card | Visible (when chips > buyIn) | Hidden |
| Stars in Arena card | Visible (when stars > 0) | Hidden |
| Extracting fee display | `"FEE: X%"` or `"FEE: 0% (LOW POPULATION)"` | Hidden |
| Hold-to-extract idle text | `"HOLD TO EXTRACT SUCCESSFUL!"` | `"HOLD TO LEAVE PRACTICE ARENA"` |
| Competitors card | `"Real Players: N Active"` | `"Offline Mode: 1 Player"` |
| Leaderboard value | `carriedChips.toLocaleString() + "c"` | `score.toLocaleString()` |
| Leaderboard YOU badge color | `bg-indigo-500/30 text-indigo-200` | `bg-emerald-500/30 text-emerald-200` |
| End overlay extract title | `"Extraction Completed!"` or `"Secure Extraction!"` | `"Practice Run Completed!"` |
| End overlay death subtitle | `"Your snake head collided..."` | `"Offline Training — No chips lost."` |
| Death stats panel | Shows buy-in + forfeited + kills | Shows kills only |
| Extract results table | Shows carried + commission + banked | Shows offline training text |
| Extract close button | `"SECURE CHIPS & RETURN TO LOBBY"` | `"RETURN TO LOBBY"` |
| Minimap | Visible (toggleable) | Hidden (auto-disabled) |
| Full-screen map | Visible (M key toggle) | N/A (engine doesn't reach canvas code) |
| Death toast | `"Eliminated"` + killer name | `"Crashed"` + no chips lost |
| Star chip sound | `playFoodCollect('star')` | Skipped |
| Replay player | `OnlineReplayPlayer` | `ReplayPlayer` (embedded) |
| Compass animation | `animate-spin` (6s) | No spin |
| Extraction exit button ID | `btn-success-close` | `btn-success-close` |
| Practice extraction text | — | `"HOLD TO LEAVE PRACTICE ARENA"` |
| Chip labels above heads | Drawn for real players | N/A |
| Extraction progress rings | Drawn for extracting self | N/A |

---

## 18. OFFLINE MODE (BUILD-14)

**Condition:** `arena.isPractice === true` (arena IDs starting with `practice-`)

**Behavior:**
- No Socket.IO connection — the `OfflineGameEngine` (from `./offline-engine.ts`) owns the entire game loop
- Canvas rendered by React, but all overlays (HUD, death screen, extract screen) are DOM nodes appended by the engine
- No minimap, no chips, no leaderboard, no chat, no kill feed, no full map
- Audio: No star chip sounds
- The `playAgain` flow resets state and re-emits `join_arena` for online; for offline the engine handles restart
- Score is body-length based (same as online)
- On exit: `onExit(result)` where `chipsExtracted: 0`, `commission: 0`, `xpGained: 0`

---

## 19. INPUT PRIORITY

1. **Touch joystick** (highest — overrides keyboard/mouse)
2. **Keyboard** (WASD / arrows)
3. **Mouse** (position relative to canvas center)

**Boost conditions** (any of):
- SPACE key held
- Mobile BOOST button held (`boostHoldRef`)
- Touch joystick magnitude > 0.6 (`JOYSTICK_BOOST_MAGNITUDE`)
- Left mouse button held

---

## 20. SOCKET.IO CONFIGURATION

| Parameter | Value |
|---|---|
| Transports | `['websocket']` only |
| Query | `{ XTransformPort: 3001 }` |
| Auth | `{ token: string }` (JWT from `/api/auth/token`) |
| Reconnection | `true` |
| Max attempts | `Infinity` |
| Initial delay | `1000` ms |
| Max delay | `5000` ms |
| Timeout | `10000` ms |
| Auth endpoint | `GET /api/auth/token` (cache: no-store) |

---

## 21. END SCREEN KILLER AVATAR FALLBACK

- When `killer.name` exists: First 2 characters, uppercased, e.g. `"JO"` from `"John"`
- When `killer.name` is empty/null: `"??"`
- Background: `killer.color ?? '#f43f5e'`

---

## 22. CANVAS ARIA LABELS

| Context | Aria-label |
|---|---|
| Online canvas | `"Venom Arena game canvas"` |
| Offline canvas | `"Venom Arena offline practice canvas"` |
| Both | `style={{ touchAction: 'none' }}` |

---

04-offline-engine.md
===
# 04 — Offline Engine Catalog
**Source:** `src/components/game/offline-engine.ts` (3149 lines)
**Purpose:** Pure client-side snake game engine for "Venom Arena" offline practice mode.

---

## File Header Design Intent

[CODE COMMENT] `"Infinite-map offline practice mode. No server connection, no chips, no stars, no wallet, no boundaries. Camera follows the player in an endless world."`

[CODE COMMENT] Key changes from the original:
- **Infinite map** — no boundaries, no wall death, no breathing radius.
- **Food orb system** — three sizes (Small/Medium/Large) with weighted spawn.
- **No chips / stars / wallet** — pure score-based gameplay.
- **Death food drop** — dead snakes drop orbs summing to their total score.
- **Head-on collision** — boost-aware resolution rules.
- **Bot AI** — no self-destruct, predictive evasion, food-seeking.
- **Opacity layering** — larger snakes fade when a smaller snake is near.
- **Score model** — INITIAL_SPAWN_SCORE + food eaten, body from score.

---

## 1. PUBLIC TYPES

### `OfflineState` (state machine)
- Values: `'playing'` | `'dead'` | `'extracted'`

### `OfflineExitResult`
- `score: number`
- `kills: number`
- `durationSeconds: number`

---

## 2. INTERNAL TYPES

### `Vec2`
- `x: number`
- `y: number`

### `BotPersonality`
- Values: `'scavenger'` | `'opportunist'` | `'hunter'` | `'extractor'` | `'coward'`

### `SnakeBase`
- `id: string`
- `name: string`
- `userTag?: string`
- `country?: string`
- `points: Vec2[]`
- `angle: number`
- `size: number`
- `collisionRadius: number`
- `color: string`
- `secondaryColor?: string`
- `isPlayer: boolean`
- `isBot: boolean`
- `score: number` — [CODE COMMENT] "Food-mass score (starts at 0, grows with food, shrinks with boost). Display score = cfg.initialSpawnScore + this value."
- `boostFrameCounter: number`
- `isExtracting: boolean`
- `extractionProgress: number`
- `isDead: boolean`
- `spawnProtectedUntil: number`
- `chatMessage?: string`
- `chatExpiry?: number`
- `kills: number`
- `desiredAngle: number`
- `wantsBoost: boolean`
- `isBoosting: boolean` — [CODE COMMENT] "Whether the snake is actively boosting (for head-on collision + rendering)."

### `BotSession` (extends SnakeBase)
- `botId: string`
- `personality: BotPersonality`
- `nextThinkAt: number`
- `virtualIdx: number` — [CODE COMMENT] "Index into the virtualBots array this active bot came from."

### `VirtualBot`
[CODE COMMENT] "Lightweight bot definition for the virtual pool (1000 total). Only stores identity + cheap position. Active bots (BotSession) are created from these when near the player."
- `idx: number`
- `id: string`
- `botId: string`
- `name: string`
- `personality: BotPersonality`
- `color: string`
- `secondaryColor: string`
- `initialScore: number`
- `x: number` — [CODE COMMENT] "Cheap world position — updated each tick with straight-line wander."
- `y: number`
- `angle: number`
- `score: number`
- `isActive: boolean`

### `Food`
- `id: string`
- `x: number`
- `y: number`
- `size: number` — [CODE COMMENT] "Visual radius in px."
- `value: number` — [CODE COMMENT] "Score value (1, 3, or 5)."
- `orbSize: 'small' | 'medium' | 'large'`
- `color: string`
- `glowColor: string`
- `isStarChip?: boolean`

### `GridItem`
- `id: string`
- `kind: 'segment' | 'food'`
- `x: number`
- `y: number`
- `radius: number`
- `snakeId?: string`
- `segIdx?: number`
- `value?: number`
- `foodRef?: Food`

### `ReplaySnakeData`
- `id, name, points, angle, size, color, secondaryColor, isDead, score, isBoosting, isPlayer`

### `ReplayFoodData`
- `x, y, size, value, color, glowColor, orbSize`

### `ReplayFrame`
- `snakes: ReplaySnakeData[]`
- `foods: ReplayFoodData[]`
- `camX, camY, camZoom`

---

## 3. CONSTANTS

### Game Loop
| Constant | Value | Purpose |
|---|---|---|
| `TICK_MS` | `33` | Physics tick interval (ms) — **30 Hz** |
| `MAX_PARTICLES` | `200` | Maximum particles on screen |

### Input
| Constant | Value | Purpose |
|---|---|---|
| `MOUSE_DEADZONE_PX` | `15` | Minimum mouse distance from center to register input |
| `JOYSTICK_DEADZONE` | `0.18` | Touch joystick deadzone (magnitude) |
| `JOYSTICK_MAX_RADIUS_PX` | `70` | Touch joystick maximum radius in pixels |
| `JOYSTICK_BOOST_MAGNITUDE` | `0.6` | Touch joystick magnitude threshold for boosting |

### Rendering
| Constant | Value | Purpose |
|---|---|---|
| `MAX_SNAPSHOT_POINTS` | `60` | Max rendered body points per snake (downsample cap) |
| `OPACITY_PROXIMITY_FACTOR` | `3` | Multiplied by sum of sizes for opacity proximity check |
| `OPACITY_FADE_TO` | `0.75` | Opacity to which larger snake fades |

### Adaptive Quality (FPS)
| Constant | Value | Purpose |
|---|---|---|
| `FPS_LOW_THRESHOLD` | `40` | FPS below this triggers low-quality check |
| `FPS_HIGH_THRESHOLD` | `55` | FPS above this triggers high-quality check |
| `FPS_LOW_DURATION_MS` | `2000` | Duration FPS must stay low before downgrading |
| `FPS_HIGH_DURATION_MS` | `5000` | Duration FPS must stay high before upgrading |

### Bot AI
| Constant | Value | Purpose |
|---|---|---|
| `BOT_THINK_INTERVAL_MS` | `120` | Base interval between bot AI decisions |
| `BOT_THINK_JITTER_MS` | `80` | Random jitter added to think interval |
| `BOT_THREAT_SCAN_RADIUS` | `250` | Radius for scanning nearby body segment threats |
| `BOT_MAX_TURN_PER_TICK` | `0.22` | Max radians a bot can turn per tick (defined but not directly used in offline; uses engine `calcTurnRate` instead) |
| `BOT_PREDICT_AHEAD_TICKS` | `8` | Number of ticks to predict ahead for evasion |
| `BOT_PREDICT_SPEED` | `DEFAULT_SNAKE_CONFIG.baseSpeed * 1.5` = `6.75` | Speed used for predictive position calculations |

### Virtual Bot Pool
| Constant | Value | Purpose |
|---|---|---|
| `VIRTUAL_BOT_COUNT` | `1000` | Total lightweight bot definitions |
| `ACTIVATION_RADIUS` | `2500` | Distance from player to activate a virtual bot |
| `DEACTIVATION_RADIUS` | `3500` | Distance from player to deactivate an active bot (hysteresis) |
| `MAX_ACTIVE_BOTS` | `60` | Maximum active bots with full physics at any time |
| `VIRTUAL_BOT_SPEED` | `2.5` | Cheap movement speed for inactive virtual bots |
| `VIRTUAL_WORLD_RADIUS` | `8000` | Virtual bots spread within this radius of player |

### Food Spawning
| Constant | Value | Purpose |
|---|---|---|
| `FOOD_SPAWN_RADIUS_NEAR` | `1500` | Primary food spawn radius around player |
| `FOOD_SPAWN_RADIUS_FAR` | `2500` | Some food scattered further out |
| `FOOD_FAR_FRACTION` | `0.15` | 15% of replenishment food spawns far |
| `FOOD_COUNT_TARGET` | `1200` | Total food orbs target in the world (from game-config.ts) |

### Replay Recording
| Constant | Value | Purpose |
|---|---|---|
| `REPLAY_PRE_MAX` | `450` | 15s at 30Hz before death (circular buffer) |
| `REPLAY_POST_MAX` | `450` | 15s at 30Hz after death (linear) |
| `REPLAY_VISIBLE_RADIUS` | `2500` | Only record snakes within this radius of camera |
| `REPLAY_MAX_SNAKE_POINTS` | `30` | Downsample snake points for replay |

### Extraction
| Constant | Value | Purpose |
|---|---|---|
| `EXTRACT_DURATION_MS` | `3000` | 3-second extraction hold duration (from game-config.ts) |

### Chat
| Constant | Value | Purpose |
|---|---|---|
| (chat duration) | `4000` ms | Chat bubble expiry time (`p.chatExpiry = performance.now() + 4000`) |

### Bot Personalities (array)
- `'scavenger'`, `'opportunist'`, `'hunter'`, `'extractor'`, `'coward'`

### Quick Emotes
1. `'GG! 🏆'`
2. `'Target Spot! 🎯'`
3. `'Fleeing! 🏃💨'`
4. `'Get Ripped! 💪'`
5. `'Extracting soon! ⚡'`

---

## 4. SNAKE ENGINE CONFIG (DEFAULT_SNAKE_CONFIG)

*Imported from `@/lib/snake-engine`* — used as `this.cfg`:

| Parameter | Value | Description |
|---|---|---|
| `collisionRadius` | `6` | Base collision radius in px |
| `visualRadius` | `8` | Base visual radius in px |
| `segmentSpacing` | `16` | Center-to-center distance between segments |
| `baseSpeed` | `4.5` | Normal move speed (px/tick) |
| `boostSpeed` | `8.0` | Speed while boosting (px/tick) |
| `turnBase` | `0.35` | Base turn rate (rad/tick) |
| `turnMin` | `0.08` | Minimum turn rate at max score |
| `turnScoreFactor` | `0.0003` | Score penalty per point to turn rate |
| `initialBodyLength` | `20` | Starting segments at spawn |
| `initialSpawnScore` | `20` | Starting display score (INITIAL_SPAWN_SCORE) |
| `maxSegments` | `200` | Hard cap on body segments |
| `lengthLogFactor` | `20` | Logarithmic growth factor for body length |
| `maxExtraRadius` | `3` | Max additional visual radius from growth |
| `thicknessLogFactor` | `0.5` | Logarithmic growth factor for thickness |
| `boostMinLength` | `8` | Minimum body segments to activate boost |
| `boostDropInterval` | `10` | Frames between tail drops while boosting |
| `hitFactor` | `0.75` | Body collision multiplier (0-1) |
| `headOnHitFactor` | `0.8` | Head-on collision multiplier (0-1) |
| `neckAngleThreshold` | `60` | Degrees for neck protection pass-through |
| `neckSegmentCount` | `5` | Number of neck segments protected |
| `foodSmallValue` | `1` | Small orb score value |
| `foodSmallRadius` | `3` | Small orb visual radius |
| `foodSmallWeight` | `0.93` | Small orb spawn weight (93%) |
| `foodMediumValue` | `3` | Medium orb score value |
| `foodMediumRadius` | `5` | Medium orb visual radius |
| `foodMediumWeight` | `0.04` | Medium orb spawn weight (4%) |
| `foodLargeValue` | `5` | Large orb score value |
| `foodLargeRadius` | `8` | Large orb visual radius |
| `foodLargeWeight` | `0.03` | Large orb spawn weight (3%) |
| `foodCountTarget` | `1200` | Total food orbs per arena |
| `extractionDurationMs` | `3000` | 3-second extraction hold |
| `extractionGlideSpeed` | `3.2` | Speed while extracting |
| `spawnProtectionMs` | `4000` | 4-second spawn protection |
| `botEvadeRadius` | `300` | Bot evasion scan radius |
| `botFoodScanRadius` | `300` | Bot food scanning radius |

---

## 5. GROWTH/PHYSICS FORMULAS

### Body Length
[CODE COMMENT] "Uses logarithmic scaling with a hard cap."
- Formula: `initialBodyLength + min(maxExtra, logFactor × ln(1 + score))`
- Score 0: 20 segments
- Score 100: ~31 segments
- Score 1,000: ~38 segments
- Score 10,000: ~46 segments
- Score 100,000: ~53 segments
- Hard cap: maxSegments (200)

### Visual Radius
[CODE COMMENT] "Grows very slowly with diminishing returns."
- Formula: `baseVisualRadius + min(maxExtra, thicknessFactor × ln(1 + score))`
- Score 0: 8px, Score 1,000: ~8.35px, Score 10,000: ~8.69px, Score 100,000: ~9.04px
- Hard cap: 8 + 3 = 11px

### Collision Radius
[CODE COMMENT] "Collision radius barely grows — max 1px extra even at 100k score. The gap between collision circles is what enables threading through tight spaces."
- Formula: `baseCollisionRadius + min(1, 0.1 × ln(1 + score))`
- Always between 6px and 7px

### Turn Rate
[CODE COMMENT] "Higher score = slower turning (heavier snake)."
- Formula: `max(turnMin, turnBase - turnScoreFactor × score)`
- Range: `0.08` to `0.35` rad/tick

### Speed
- If extracting: `3.2` px/tick
- If boosting: `8.0` px/tick
- Otherwise: `4.5` px/tick

### Head Movement
- `newX = x + cos(angle) × speed`
- `newY = y + sin(angle) × speed`

### Turn Toward
- Wraps angle difference to [-π, π]
- If `|diff| <= maxStep`, snaps to desired
- Otherwise moves by `sign(diff) × maxStep`

---

## 6. GAME LOOP SYSTEM

### `frame(now)` — Main rAF Loop
- Calls `updateFps(now)`
- Calls `updateParticles(dt)`
- Physics: accumulates `dt` into `accumulator`; runs `tickPhysics(now)` while `accumulator >= TICK_MS` with safety limit of 4 ticks max
- If `safety === 0`, resets `accumulator` to 0 (spiral-of-death prevention)
- Post-death: counts down `postDeathTicksRemaining`
- Calls `render(now)`
- Calls `updateHUD()`

### `tickPhysics(now)` — One Server-Tick Equivalent (13 steps)
1. Increment `tick`
2. **Player input** — `computePlayerInput()` → sets `desiredAngle`, `wantsBoost`, `isBoosting`
3. **Extraction progress** — increments by `TICK_MS` (33ms); completes at `extractionDurationMs` (3000ms)
4. **Move player** — `tickSnakeMovement(p, desiredAngle, wantsBoost)`
5. **Virtual bot positions** — `updateVirtualBotPositions()` + `activateNearbyBots()`
6. **Bot AI** — loops all active bots: `tickBot(bot, now)`
7. **Boost food drops** — processes `boostDropQueue`; creates small food orbs (size=3, value=1, green `#34d399`/`#10b981`)
8. **Build spatial grid** — clears grid, inserts all snake segments (every 2nd) + all food
9. **Eat food** — `eatFood()` for player + all bots
10. **Collision detection** — `detectCollisions(now)`
11. **Apply deaths + drop food** — computes death food drops, credits kills, removes dead bots
12. **Replenish food** — `replenishFood()`
13. **Expire chat** — `expireChat(now)`
14. **Update camera** — `updateCamera()`
15. **Capture replay snapshot** — `captureReplaySnapshot()`

---

## 7. SNAKE MOVEMENT (`tickSnakeMovement`)

1. **Turn:** `snake.angle = engineTurnToward(snake.angle, desiredAngle, calcTurnRate(snake.score, cfg))`
2. **Boost check:** `isBoosting = wantsBoost && points.length > boostMinLength (8) && score > 0`
3. **Boost tail shedding:**
   - Increments `boostFrameCounter`
   - When `boostFrameCounter >= boostDropInterval (10)`: resets counter
   - If `points.length > boostMinLength + 1 (9)` AND `score > 1`:
     - Pushes tail position to `boostDropQueue`
     - Pops last point
     - `score = max(0, score - 1)`
4. **Move head:** `moveHead(head, angle, speed)` — unshifts new head to points[0]
5. **Body length regulation:** target = `max(boostMinLength + 1, calcBodyLength(score, cfg))`; pops excess points
6. **Update radii:** `snake.size = calcVisualRadius(score, cfg)`, `snake.collisionRadius = calcCollisionRadius(score, cfg)`

---

## 8. BOT AI SYSTEM

### Personality Assignment
- Virtual bots are assigned personalities in round-robin: `PERSONALITIES[i % 5]`
- 5 personalities: `'scavenger'`, `'opportunist'`, `'hunter'`, `'extractor'`, `'coward'`

### Bot Think Cycle
- Think interval: `BOT_THINK_INTERVAL_MS (120) + random(0..BOT_THINK_JITTER_MS (80))` = 120–200ms
- Each think cycle, a bot makes one decision

### Bot AI Decision Tree (in priority order)

1. **Predictive evasion against the human player**
   - Condition: player exists, alive, has points, not spawn-protected
   - Check: `playerDist < botEvadeRadius * 2 (600)`
   - Prediction: `predictedX = playerHead.x + cos(p.angle) × BOT_PREDICT_SPEED × BOT_PREDICT_AHEAD_TICKS`
   - Same for Y
   - If `distToPredicted < (bot.size + p.size) * 3`: EVADE
   - Evade direction: perpendicular to player heading ±90° (random 50/50 choice)
   - Hunter personality also boosts while evading if `score > 10`

2. **Predictive evasion against other bot heads**
   - Loops all other active bots
   - Check: `otherDist < 200`
   - Same prediction formula as above
   - If `distToPredicted < (bot.size + other.size) * 3`: EVADE
   - Evade direction: perpendicular ±90° (random 50/50)
   - Does NOT boost while evading other bots

3. **Flee from nearby body segments**
   - Scans grid for segments within `BOT_THREAT_SCAN_RADIUS (250)`
   - Skips own segments and head segments (segIdx === 0)
   - Finds nearest foreign body segment
   - Condition: `threatDist < 150`
   - Action: flee directly away: `angle = atan2(head.y - threatY, head.x - threatX)`

4. **Seek nearest food**
   - Scans grid for food within `cfg.botFoodScanRadius (300)`
   - Finds nearest food with value > 0
   - Action: head toward food: `angle = atan2(food.y - head.y, food.x - head.x)`

5. **Wander** (fallback)
   - Action: `angle = bot.angle + (random() - 0.5) * 0.4`
   - Random angular drift of ±0.2 radians

[CODE COMMENT] "NO edge avoidance — infinite map, no boundaries."

### Bot Boost Behavior
- After the think decision, outside the think block:
  - Hunter personality: `score > 5` AND `random() < 0.05` (5% chance per tick)
- All other personalities: never boost (unless evading player, see above)

### No Self-Destruct
[CODE COMMENT] "Bot AI — no self-destruct, seek food, predictive evasion"

---

## 9. VIRTUAL BOT POOL SYSTEM

### `createVirtualBotPool(cx, cy)`
[CODE COMMENT] "Create 1000 virtual bot definitions with cheap positions spread around (cx, cy)."
- Creates `VIRTUAL_BOT_COUNT (1000)` virtual bots
- Name: `BOT_NAMES[i % 20]`, with `-N` suffix for duplicates
- Skin: `BOT_SKINS[i % 6]`
- Personality: `PERSONALITIES[i % 5]`
- ID: `bot-${arena.id}-${i}`
- Initial score: `floor(random() * 80)` (0–79)
- Position: `randomPointInCircle(cx, cy, VIRTUAL_WORLD_RADIUS (8000))`
- Angle: `random() * 2π`
- `isActive: false`

### `updateVirtualBotPositions()`
[CODE COMMENT] "Cheaply update all virtual bot positions (straight-line wander). Called every tick but is very lightweight."
- Skips active bots (moved by full physics)
- Deterministic pseudo-random angle tweak: `((tick + i) * 7919) % 1000 < 20` (~2% chance per tick)
- Angle adjustment: `((tick + i) * 3571) % 1000 - 500) * 0.0016`
- Movement: `x += cos(angle) * VIRTUAL_BOT_SPEED (2.5)`, same for Y

### `activateNearbyBots()`
- **Deactivation:** Active bots beyond `DEACTIVATION_RADIUS (3500)` from player get state saved back to virtual bot, then removed
- **Activation scan:** Only scans every 10 ticks (line: `if (this.tick % 10 !== 0) return`)
- Stops if `bots.size >= MAX_ACTIVE_BOTS (60)`
- Activates inactive virtual bots within `ACTIVATION_RADIUS (2500)` of player

### `createActiveBotFromVirtual(vb, playerX, playerY)`
- Creates full `BotSession` from `VirtualBot`
- Body length: `calcBodyLength(vb.score, cfg)`
- Initial body: `initialBody(vb.x, vb.y, angle, bodyLen, cfg.segmentSpacing (16))`
- Spawn protection: `now + cfg.spawnProtectionMs (4000)`
- `nextThinkAt: 0` (thinks immediately)

### `respawnVirtualBot(vb, playerX, playerY)`
- Sets `isActive: false`
- Spawns at `randomPointInCircle(playerX, playerY, VIRTUAL_WORLD_RADIUS (8000))`
- If spawn is too close (< 1500): forced to `1500 + random() * 2000` distance away
- Random angle, random score: `floor(random() * 80)`

---

## 10. COLLISION DETECTION (`detectCollisions`)

### Head-on Collision (checked FIRST, takes priority)
- Pairs all living snakes (O(n²))
- Skips spawn-protected snakes
- Deduplicates pairs via sorted ID key
- Hit distance: `(size_a + size_b) * cfg.headOnHitFactor (0.8)`
- **Resolution rules:**
  - Equal total score → **both die**
  - A boosting, B not boosting → **B dies** (boost advantage)
  - B boosting, A not boosting → **A dies** (boost advantage)
  - Both boosting or neither → **higher total score wins**
- Death cause: `'headon'`

### Body Collision (head vs foreign non-head segment)
[CODE COMMENT] "NO wall collision — infinite map."
- For each living, non-dead, non-protected snake:
  - Query grid within `snake.size + 30` radius
  - Skip own segments (`item.snakeId === snake.id`)
  - Skip head segments (`item.segIdx === 0` — handled by head-on)
  - **Neck protection:** Skip segments where `segIdx <= 5` (first 6 segments)
  - Hit distance: `(snake.size + item.radius) * cfg.hitFactor (0.75)`
  - First collision kills the head snake
  - Death cause: `'body'`

### Neck Protection Detail
- In offline engine: simple index check — `segIdx <= 5` → skip
- In the engine library (`isNeckProtected`): angle-based approach check (not used in offline; offline uses simpler index check)

---

## 11. FOOD SYSTEM

### Food Orb Definitions (from `getFoodOrbs`)
| Size | Value | Radius | Weight | Color | Glow Color |
|---|---|---|---|---|---|
| small | 1 | 3px | 0.93 (93%) | `#34d399` | `#10b981` |
| medium | 3 | 5px | 0.04 (4%) | `#38bdf8` | `#0ea5e9` |
| large | 5 | 8px | 0.03 (3%) | `#f472b6` | `#ec4899` |

### Food Orb Selection
- Weighted random selection via `randomFoodOrb()`

### Food Spawning
- Initial spawn: `cfg.foodCountTarget (1200)` orbs around origin (0,0)
- 15% (`FOOD_FAR_FRACTION`) spawn far (within 2500px), rest within 1500px
- `createFoodOrb()`: picks random orb from weighted pool, places at `randomPointInCircle(cx, cy, radius)`
- `randomPointInCircle`: `r = sqrt(random()) * maxR` (uniform distribution in circle)

### Food Replenishment (`replenishFood`)
- Removes eaten food (value <= 0)
- Spawns new food around player's current head position
- Up to `FOOD_COUNT_TARGET (1200)` total
- Guard limit: max 50 new food per tick
- Same 15% far fraction

### Food Eating (`eatFoodForSnake`)
- Queries grid within `snake.collisionRadius + 20` of head
- Eat condition: `dist < snake.collisionRadius + item.radius + 6`
- On eat: `snake.score += eatenValue`; sets food `value = 0`
- Player-only effects:
  - Sound: `playFoodCollect(orbSize)`
  - Particles: `spawnEatParticles(x, y, size, color)` — 4 particles

### Boost Food Drops
- When boosting and `boostFrameCounter >= boostDropInterval (10)`:
  - Creates a small food orb at tail position
  - Properties: `size: 3, value: 1, color: '#34d399', glowColor: '#10b981', orbSize: 'small'`

### Death Food Drop
- Total score used: `cfg.initialSpawnScore (20) + snake.score`
- `calcDeathFood(totalScore, false)` → `[smallCount, mediumCount, largeCount]`
  - `largeCount = floor(score / 5)`
  - `remainder = score - largeCount * 5`
  - `mediumCount = floor(remainder / 3)`
  - `smallCount = remainder - mediumCount * 3`
- Orbs are shuffled
- Distributed evenly along the dead snake's body
- Scatter: `±7.5px` (random offset of `(random()-0.5) * 15`)

---

## 12. SPAWN SYSTEM

### Player Spawn
- Position: origin `(0, 0)`, facing east (angle = 0)
- Body: `initialBody(0, 0, 0, cfg.initialBodyLength (20), cfg.segmentSpacing (16))`
- Score: 0 (display score = INITIAL_SPAWN_SCORE + 0 = 20)
- Spawn protection: `performance.now() + cfg.spawnProtectionMs (4000)` (4 seconds)
- Default color: `'#22c55e'` (green-500) / secondary `'#15803d'` (green-700)
- Skin resolved from: localStorage `'venom_custom_skin_state'` → `playerProfile.currentSkin`

### Bot Spawn (on activation)
- Position: from VirtualBot's stored position
- Body length: `calcBodyLength(vb.score, cfg)`
- Spawn protection: `now + cfg.spawnProtectionMs (4000)` (4 seconds)
- Score: from virtual bot (0–79)

### Safe Respawn (virtual bot recycling)
- If respawned position < 1500px from player, forced to `1500 + random() * 2000` away

---

## 13. BOOST MECHANICS

### Activation Conditions
- `wantsBoost == true`
- `snake.points.length > cfg.boostMinLength (8)`
- `snake.score > 0`

### Speed While Boosting
- `8.0` px/tick (vs normal `4.5` px/tick)
- Speed multiplier: ~1.78x

### Cost While Boosting
- Every `boostDropInterval (10)` ticks:
  - Tail segment removed (if length > `boostMinLength + 1 = 9`)
  - Score decreased by 1 (min 0)
  - Small food orb (value=1) dropped at tail position
- This means boost costs 1 score per 10 ticks = ~3 score/second at 30Hz

### Sound Effects
- `playBoost()` when player starts boosting (transition from not-boosting to boosting)

---

## 14. DEATH MECHANICS

### Player Death Flow
1. Collision detected → player ID in deaths array
2. Death food computed from `cfg.initialSpawnScore + p.score`
3. `playerDied = true`
4. `p.isDead = true`
5. `playDeath()` — dramatic crash sound
6. `enterPostDeathRecording()` — begins 15s post-death recording
7. Death particles spawned at head position (24 particles in normal quality, 8 in low quality)
8. After post-death recording completes:
   - Final score computed: `INITIAL_SPAWN_SCORE + player.score`
   - Final kills: `player.kills`
   - Final duration: `floor((now - startTime) / 1000)` seconds
   - State transitions to `'dead'`
   - End screen shown (`showEndScreen('death')`)

### Bot Death Flow
1. Collision detected → bot ID in deaths array
2. `bot.isDead = true`
3. Death food computed and added to world
4. Kill credited to player if `d.killerId === p.id` → `p.kills++`, `playKill()` sound
5. Virtual bot recycled via `respawnVirtualBot()`
6. Bot removed from active bots map

### Post-Death Recording (`tickPostDeathPhysics`)
- Runs for `REPLAY_POST_MAX (450)` ticks (15 seconds at 30Hz)
- Bots continue to move, eat, collide, die
- Player is dead (no player physics)
- Food replenishment continues
- Camera freezes at death position (`deathCamX`, `deathCamY`)
- Spatial grid rebuilt with bots + food only

### End Screen Outcomes
- **Death:** Title "Arena Disintegration!", color `#ef4444`, icon 💀
  - Subtitle: "Your snake was destroyed! Final score: X. No chips were wagered or lost — offline practice only."
  - Shows: Final Score, Opponents Eliminated (Kills), Survival Time
  - Buttons: "WATCH DEATH REPLAY" (if > 20 frames), "PLAY AGAIN", "RETURN TO LOBBY"
- **Extract:** Title "Practice Run Completed!", color `#fbbf24`, icon 🧭
  - Subtitle: "Practice run finished! You eliminated X training bots, reached a score of X, and survived for Xm Xs."
  - Same stats display
  - Shows "Offline Training Complete" box
  - Buttons: "PLAY AGAIN", "RETURN TO LOBBY" (no replay option)

---

## 15. STATE MACHINE

### States: `'playing'` → `'dead'` → (lobby) / `'playing'` → `'extracted'` → (lobby)

### Transitions:
- `'playing'` → `'dead'`: Player dies and post-death recording completes
- `'playing'` → `'extracted'`: Extraction hold completes (3 seconds)
- `'dead'` → `'playing'`: "PLAY AGAIN" button pressed (resets world)
- `'extracted'` → `'playing'`: "PLAY AGAIN" button pressed (resets world)
- Any non-`'playing'` state → lobby: ESC key or "RETURN TO LOBBY" button

### `setState(s)`
- No-op if same state
- Calls `onStateChange(s)` callback (error caught and ignored)

---

## 16. CAMERA SYSTEM

[CODE COMMENT] "Camera (follows player, no world bounds)"

### Camera Initialization
- Default zoom: `0.9`
- Snaps to player head position on first frame

### Camera Follow
- Lerp factor: `0.18`
- `cam.x += (head.x - cam.x) * 0.18`
- `cam.y += (head.y - cam.y) * 0.18`

### Camera Zoom
- Base zoom: mobile = `0.58`, desktop = `0.9`
- Zoom out as body grows: `max(baseZoom * 0.65, baseZoom - (len - initialBodyLength) * 0.005)`
- Zoom lerp: `cam.zoom += (targetZoom - cam.zoom) * 0.05`
- Mobile detection: `window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768`

### Infinite Grid Rendering
- Grid size: `60` px
- Grid lines: `strokeStyle = '#1e293b'`, `lineWidth = 1/zoom`
- Origin crosshair: `strokeStyle = '#334155'`, `lineWidth = 1.5/zoom`
- View rect clamped to avoid extreme ranges
- Background: `'#020617'`
- World size placeholder: `1000000` (for render helpers, though map is infinite)

---

## 17. SPATIAL HASH GRID

[CODE COMMENT] "Spatial hash grid — slimmed-down client port of the server's grid. Items are bucketed into square cells; queries return a deduplicated Map."

- Default cell size: `120` px
- `insert(item)`: Inserts into all overlapping cells (based on item position ± radius)
- `queryRadius(x, y, r)`: Returns deduplicated `Map<string, GridItem>` of items in overlapping cells
- `clear()`: Empties all cells

### Snake Grid Insertion (`insertSnakeIntoGrid`)
- Inserts every **2nd** point (`i += 2`) as a segment
- Grid item ID: `${snake.id}:${i}`
- Kind: `'segment'`, radius: `snake.collisionRadius`

---

## 18. INPUT SYSTEM

### Mouse
- `mousemove` → stores canvas-relative position
- Direction: `atan2(dy, dx)` from canvas center
- Deadzone: `MOUSE_DEADZONE_PX (15)` px from center
- `blur` → clears mouse active

### Keyboard
- Direction: W/A/S/D or Arrow keys
- Boost: Space bar
- Extract: Hold E key
- Emotes: Keys 1-5
- Exit: Escape (when not playing)
- Prevents default on arrows, space, spacebar
- `blur` → clears all keys, cancels extract

### Touch (Joystick)
- Joystick detection zone: bottom-left quadrant of canvas (`x < width/2 && y > height/2`)
- Joystick visual: outer radius `JOYSTICK_MAX_RADIUS_PX (70)`, inner thumb radius `24` px
- Outer ring: `rgba(129, 140, 248, 0.12)` fill, `rgba(129, 140, 248, 0.5)` stroke
- Inner thumb: `rgba(129, 140, 248, 0.85)` fill
- Deadzone: `JOYSTICK_DEADZONE (0.18)` magnitude
- Boost threshold: `JOYSTICK_BOOST_MAGNITUDE (0.6)` magnitude
- Magnitude clamped to `1.0`

### Mobile Controls (DOM buttons)
- **BOOST** button: 64×64px circle, bottom-right, amber border, ⚡ icon
  - `pointerdown` → sets `boostHold = true`, adds space to keys
  - `pointerup`/`pointercancel` → releases
- **EXTRACT** button: 80×80px circle, bottom-right, green border, 🏆 icon
  - `pointerdown` → begins extraction
  - `pointerup`/`pointercancel` → cancels extraction

---

## 19. EXTRACTION SYSTEM

### Start
- Trigger: Hold E key (keyboard) or hold EXTRACT button (mobile)
- `beginExtract()`: Sets `isExtracting = true`, `extractionProgress = 0`
- Shows extraction progress bar, hides idle hint

### Progress
- Increments by `TICK_MS (33)` per physics tick
- Completes at `EXTRACT_DURATION_MS (3000)` = ~3 seconds
- HUD shows percentage bar with `width` transition of `80ms linear`

### Cancel
- Trigger: Release E key or release EXTRACT button or window blur
- `cancelExtract()`: Resets `isExtracting`, `extractionProgress`, hides bar, shows hint

### Complete
- `finishExtract()`: Computes final score, kills, duration → state `'extracted'` → end screen

### Speed While Extracting
- `calcSpeed(false, true, cfg)` = `extractionGlideSpeed (3.2)` px/tick

---

## 20. OPACITY LAYERING SYSTEM

[CODE COMMENT] "Opacity layering — larger snakes fade when a smaller snake is near."

### Logic (`drawAllSnakes`)
1. Culling: Only render snakes within `VIEW_RADIUS (1500)` of camera center
2. Initialize all snakes to opacity `1.0`
3. For each pair of visible snakes (A, B):
   - If A's total score < B's total score (A is smaller):
     - `proximityThreshold = (a.size + b.size) * OPACITY_PROXIMITY_FACTOR (3)`
     - If `dist(A.head, B.head) < proximityThreshold`:
       - B's opacity → `min(current, OPACITY_FADE_TO (0.75))`
4. Bots rendered first, player last (on top)

---

## 21. PARTICLE SYSTEM

### `updateParticles(dtMs)`
- Updates position: `p.x += p.vx * dt`, `p.y += p.vy * dt` (dt in seconds)
- Damping: `p.vx *= 0.96`, `p.vy *= 0.96` per frame
- Life decrement: `p.life -= dtMs`
- Removes when `life <= 0`
- Cap: if `length > MAX_PARTICLES (200)`, removes oldest

### `spawnEatParticles(x, y, size, color)`
- Count: `4` particles
- Speed: `30 + random() * 50` px/s (30–80)
- Life: `350 + random() * 150` ms (350–500)
- `maxLife: 500`
- Size: `max(1, size * 0.6)`
- Skipped entirely in low quality mode

### `spawnDeathParticles(x, y, color)`
- Count: `24` (normal) or `8` (low quality)
- Speed: `80 + random() * 180` px/s (80–260)
- Life: `700 + random() * 400` ms (700–1100)
- `maxLife: 1100`
- Size: `3 + random() * 3` px (3–6)

---

## 22. ADAPTIVE QUALITY SYSTEM

### `updateFps(now)`
- Measures FPS every second
- If FPS < `FPS_LOW_THRESHOLD (40)` for `FPS_LOW_DURATION_MS (2000)`: enables `lowQuality`
- If FPS > `FPS_HIGH_THRESHOLD (55)` for `FPS_HIGH_DURATION_MS (5000)`: disables `lowQuality`
- Mid-range FPS (40–55): resets both timers

### Low Quality Effects
- No glow/shadow on food orbs
- No eat particles
- Reduced death particles (8 vs 24)
- Passes `lowQuality: true` to `FrameRenderCtx`

---

## 23. RENDERING SYSTEM

### Canvas Setup
- DPR: `min(devicePixelRatio, 2)`
- `{ alpha: false }` context
- `touchAction: 'none'`, `outline: 'none'`
- `ResizeObserver` for dynamic resizing
- Metallic gradient cache cleared on resize

### Render Order
1. Clear background: `#020617`
2. Infinite grid
3. Food orbs (batched by size)
4. Snakes with opacity layering (bots first, player on top)
5. Particles
6. Reset transform → screen-space overlays (joystick)

### Food Orb Rendering
- **Small:** Batched circles, fill `#34d399`, glow `#10b981`, shadowBlur `4`
- **Medium:** Batched circles, fill `#38bdf8`, glow `#0ea5e9`, shadowBlur `8`
- **Large:** Batched circles, fill `#f472b6`, glow `#ec4899`, shadowBlur `14`, plus outer ring: `rgba(236, 72, 153, 0.4)` at `radius + 3`, lineWidth `2/zoom`
- View culling: skips food outside `computeVisibleRect`

### Snake Rendering
- Downsampled to `MAX_SNAPSHOT_POINTS (60)` if longer
- Delegated to `drawSnake()` from `render-helpers`
- Extraction progress passed as `Math.min(1, extractionProgress / EXTRACT_DURATION_MS)`
- `carriedChips: 0` always (no chips in offline)

---

## 24. REPLAY SYSTEM

### Recording
- **Pre-death buffer:** Circular buffer of `REPLAY_PRE_MAX (450)` frames (15s at 30Hz)
- **Post-death buffer:** Linear buffer of `REPLAY_POST_MAX (450)` frames (15s)
- **Visible radius:** Only records snakes/food within `REPLAY_VISIBLE_RADIUS (2500)` of camera
- **Snake downsampling:** Max `REPLAY_MAX_SNAKE_POINTS (30)` points per snake
- Dead player included for first 30 post-death frames (1 second)

### Snapshot Content (`ReplayFrame`)
- All visible snakes (position, angle, size, color, score, isBoosting, isPlayer, isDead)
- All visible food (position, size, value, color, glowColor, orbSize)
- Camera position (camX, camY, camZoom)

### Playback
- Separate canvas: `90vw × 800px max`, 16:9 aspect ratio
- Default zoom: `0.8`
- Frame rate: 30Hz (`1000/30 / replaySpeed` ms per frame)
- Speed options: `[0.25, 0.5, 1, 2]`x
- Zoom range: `0.3` to `2.0`, step `0.15`
- Controls: Restart, Play/Pause, Speed toggle, Zoom ±, Exit
- Progress bar with death marker (gold `#fbbf24`, 2px wide)
- Frame counter display
- Overlay text: "⏺ REPLAY", pre/post death timing
- Loop: `(playbackIdx + 1) % frames.length` (loops when reaching end)

### Replay Rendering
- Grid: same `60px` grid, `#1e293b` lines
- Food: simple filled circles (no glow)
- Snakes: stroke with `size * 2` lineWidth, round cap/join
- Snake head: filled circle at `size * 1.2`
- Player highlight: outer stroke `rgba(250, 204, 21, 0.5)` at `size * 2.5`
- Name tags: bold 10px sans-serif, player `#fcd34d`, others `#e2e8f0`

---

## 25. HUD SYSTEM

### Top-Left Stack
- **Score card:** Label "Score:", bold white value
- **Stats card:**
  - "Kills:" with red `#f43f5e` dot and value
  - "Rank:" with yellow `#eab308` dot and value
  - "Boost:" with amber `#f59e0b` dot, static text "SPACE"
  - "Bots:" with slate `#cbd5e1` dot, value = `VIRTUAL_BOT_COUNT (1000)` (always shows total, not active)

### Top-Right Stack
- **FPS display:** Slate `#94a3b8` text, bordered card
- **Leaderboard:** Toggle-able (▾/▸), shows top 10 by total score
  - Player row highlighted: green bg `rgba(34,197,94,0.15)`, text `#86efac`
- Bot rows: `#cbd5e1` text
- Ranks: `#64748b`, bold, 20px min-width
- Signature-based DOM update (only rebuilds if scores change)

### Top-Center
- Extract hint: "Hold E or tap EXTRACT to end your practice run." (hidden during extraction)
- Extract progress bar: 200×8px, gradient `#eab308 → #f59e0b`, 80ms transition, percentage text `#fbbf24`

### Bottom-Left
- Emote bar: 5 buttons mapped to keys 1-5
- Leave button: "⨯ Leave", positioned at `bottom: 96px`

### Bottom-Right (mobile)
- BOOST button: 64×64px, amber
- EXTRACT button: 80×80px, green

---

## 26. SKIN RESOLUTION

### `resolvePlayerSkin()`
1. Check `localStorage` key `'venom_custom_skin_state'`
2. Parse JSON, look for `useCustomSkin: true` and `currentSkin`
3. Exclude `'custom-lab-skin'`
4. Fall back to `playerProfile.currentSkin` via `getCosmeticById()`
5. Error caught and ignored

---

## 27. BOT NAMES (20 total)
`ViperStrike, NeonFang, CyberCobra, ToxicPython, ShadowAdder, ChronoKrait, QuantumMamba, AeroBoa, SavageSerpent, GlitchViper, ApexPredator, GhostScale, MatrixAsp, Synthetix, StaticFang, VectorVenom, OmegaSlink, BetaByte, RattleTech, HoloHydra`

### BOT SKINS (6 total)
| Color | Secondary |
|---|---|
| `#22c55e` | `#15803d` |
| `#a855f7` | `#6b21a8` |
| `#06b6d4` | `#0891b2` |
| `#ec4899` | `#8b5cf6` |
| `#f59e0b` | `#b45309` |
| `#ef4444` | `#991b1b` |

---

## 28. CHAT SYSTEM

### Player Chat
- Keys 1-5 trigger quick emotes
- `setPlayerChat(msg)`: sets `chatMessage`, `chatExpiry = now + 4000`
- Expired after 4 seconds

### Bot Chat
- Bots have `chatMessage?` and `chatExpiry?` fields
- Same 4-second expiry
- No bot chat generation observed in this file (only player-triggered)

---

## 29. PLAY AGAIN / EXIT

### `handlePlayAgain()`
- Removes end overlay
- Clears all replay state (pre buffer, post buffer, frames, death index)
- Exits replay mode if active
- Calls `resetWorld()`
- Resets `startTime`, `accumulator`
- Hides extraction bar, shows idle hint

### `handleExitToLobby()`
- Constructs `OfflineExitResult` with `finalScore`, `finalKills`, `finalDurationSeconds`
- Calls `onExit(result)` callback (error caught and ignored)

---

## 30. COMPLETE FUNCTION INDEX

| Function | Purpose |
|---|---|
| `dist(ax,ay,bx,by)` | Euclidean distance (local helper) |
| `randomPointInCircle(cx,cy,maxR)` | Uniform random point in circle using `sqrt(random())` distribution |
| `initialBody(headX,headY,angle,length,spacing)` | Creates initial body points along reverse angle |
| `createFoodOrb(...)` | Creates a Food object from weighted random orb + random position |
| `computeDeathFoodDrop(...)` | Computes and distributes death food along body |
| `SpatialHashGrid.constructor(cellSize=120)` | Creates spatial hash with given cell size |
| `SpatialHashGrid.clear()` | Empties all cells |
| `SpatialHashGrid.insert(item)` | Inserts item into overlapping cells |
| `SpatialHashGrid.queryRadius(x,y,r)` | Queries items within radius, deduplicated |
| `OfflineGameEngine.constructor(arena,profile,canvas)` | Initializes engine with config, canvas, skin, bound listeners |
| `start()` | Sets up canvas, input, HUD, world; begins rAF loop; inits audio |
| `stop()` | Stops rAF, exits replay, detaches input, teardown HUD |
| `resolvePlayerSkin()` | Resolves player skin from localStorage or profile |
| `setupCanvas()` | Sets touch-action, outline, initial resize, ResizeObserver |
| `handleResize()` | Resizes canvas to match CSS size × DPR (capped at 2) |
| `resetWorld()` | Clears all state, spawns player at origin, creates virtual pool, activates bots, spawns food |
| `createVirtualBotPool(cx,cy)` | Creates 1000 virtual bot definitions |
| `updateVirtualBotPositions()` | Cheap straight-line wander for all inactive virtual bots |
| `activateNearbyBots()` | Activates nearby virtual bots, deactivates far active bots |
| `createActiveBotFromVirtual(vb,px,py)` | Creates full BotSession from VirtualBot |
| `respawnVirtualBot(vb,px,py)` | Resets dead virtual bot to random position |
| `idCounterObj` | Getter returning `{value: this.idCounter}` for pass-by-reference |
| `attachInput()` | Attaches mouse, touch, keyboard, blur listeners |
| `detachInput()` | Removes all input listeners |
| `onMouseMove(e)` | Updates mousePos, sets mouseActive |
| `onTouchStart(e)` | Initializes joystick from bottom-left quadrant touch |
| `onTouchMove(e)` | Updates joystick position, computes angle and boost |
| `onTouchEnd(e)` | Clears joystick if touch ended |
| `findJoystickTouch(touches)` | Finds touch in bottom-left quadrant of canvas |
| `onKeyDown(e)` | Handles keyboard: arrows, space, E, emotes, ESC, blur |
| `onKeyUp(e)` | Handles key release: E (cancel extract), space |
| `onBlur()` | Clears all keys, mouse, cancels extract |
| `beginExtract()` | Starts extraction if player alive and not already extracting |
| `cancelExtract()` | Cancels extraction, resets progress, toggles UI |
| `finishExtract()` | Completes extraction, sets final stats, transitions to `'extracted'` |
| `setPlayerChat(msg)` | Sets player chat message with 4s expiry |
| `frame(now)` | Main rAF loop: FPS, particles, physics ticks, render, HUD |
| `tickPhysics(now)` | Full physics tick (13 steps) |
| `tickSnakeMovement(snake,desiredAngle,wantsBoost)` | Turns, moves head, manages boost, regulates body length |
| `tickBot(bot,now)` | Bot AI: predictive evasion, threat flee, food seek, wander |
| `insertSnakeIntoGrid(snake)` | Inserts every 2nd segment into spatial grid |
| `eatFood()` | Eats food for player + all bots |
| `eatFoodForSnake(snake)` | Eats nearby food for one snake, plays sound/particles for player |
| `detectCollisions(now)` | Head-on + body collision detection |
| `enterPostDeathRecording()` | Begins 15s post-death recording, spawns death particles |
| `tickPostDeathPhysics(now)` | Bot-only physics during post-death recording |
| `captureReplaySnapshot()` | Records frame data for replay |
| `finishPostDeathRecording()` | Ends post-death recording, assembles replay, shows death screen |
| `getPreDeathFrames()` | Reads circular pre-death buffer in order |
| `replenishFood()` | Removes eaten food, spawns new food toward target count |
| `expireChat(now)` | Removes expired chat messages |
| `updateCamera()` | Lerps camera to player head, adjusts zoom |
| `computePlayerInput()` | Computes desired angle + boost from mouse/keyboard/touch |
| `render(now)` | Main render: background, grid, food, snakes, particles, joystick |
| `drawInfiniteGrid(ctx,rc)` | Renders infinite grid lines + origin crosshair |
| `drawFoodOrbs(ctx,rc)` | Renders food orbs batched by size with glow |
| `drawAllSnakes(ctx,rc,now)` | Renders all visible snakes with opacity layering |
| `drawSnakeSnapshot(rc,snake)` | Renders a single snake (downsampled to 60 pts) |
| `drawJoystick(ctx)` | Renders touch joystick overlay |
| `updateParticles(dtMs)` | Updates particle positions, damping, life, culling |
| `spawnEatParticles(x,y,size,color)` | Spawns 4 eat particles |
| `spawnDeathParticles(x,y,color)` | Spawns 24 (or 8) death particles |
| `updateFps(now)` | Measures FPS, triggers adaptive quality changes |
| `setState(s)` | State machine transition with callback |
| `buildHUD()` | Constructs full HUD DOM (score, kills, rank, FPS, leaderboard, emotes, mobile controls) |
| `makeHudCard(rows)` | Creates a styled HUD card container |
| `makeHudRow(icon,color,label,makeValue)` | Creates a labeled HUD row with colored dot |
| `makeSpan(text,style)` | Creates a styled span element |
| `buildLeaderboard()` | Creates toggle-able top-10 score leaderboard |
| `buildEmoteBar()` | Creates 5 quick-chat emote buttons |
| `buildMobileControls()` | Creates BOOST (64px) and EXTRACT (80px) mobile buttons |
| `buildLeaveButton()` | Creates "⨯ Leave" button |
| `teardownHUD()` | Removes HUD + end overlay DOM |
| `updateHUD()` | Per-frame HUD update: score, kills, rank, bots, FPS, leaderboard, extraction |
| `showEndScreen(outcome)` | Shows death/extract end overlay with stats and action buttons |
| `enterReplayMode()` | Creates replay canvas, controls, starts playback rAF |
| `replayFrame(now)` | Renders one replay frame, advances playback |
| `exitReplayMode()` | Stops replay rAF, removes replay DOM, shows end screen |
| `handlePlayAgain()` | Resets everything and restarts |
| `handleExitToLobby()` | Calls onExit callback with final results |

---

05-render-helpers.md
===
# 05 — render-helpers.ts Exhaustive Visual Catalogue

> Source: `/src/components/game/render-helpers.ts` (1218 lines)
> All canvas drawing functions. Pure functions, no React.

---

## 1. Types & Interfaces

### `FrameRenderCtx` (per-frame render context)
| Field | Type | Purpose |
|---|---|---|
| `ctx` | `CanvasRenderingContext2D` | Canvas drawing context |
| `w` | `number` | Canvas CSS-pixel width (DPR-adjusted backing store) |
| `h` | `number` | Canvas CSS-pixel height |
| `camX` | `number` | World-space X at centre of viewport |
| `camY` | `number` | World-space Y at centre of viewport |
| `zoom` | `number` | Camera zoom factor |
| `worldSize` | `number` | World bounds (square) |
| `lowQuality` | `boolean` | Disables glow, simplifies food, fewer particles |
| `myId` | `string` | Local player snake ID (head-glow + label emphasis) |
| `now` | `number` | High-resolution timestamp (ms) for animations |
| `metallicCache` | `Map<string, CanvasGradient>` | Cached metallic gradients, keyed `${color}:${secondary}:${sizeBucket}` |
| `playerSkin` | `Skin \| undefined` | Equipped skin cosmetic (player-only pattern tweaks) |
| `dpr` | `number` | Pixel ratio (sizing glow radii in device pixels) |

### `Particle`
| Field | Type |
|---|---|
| `x`, `y` | `number` (world position) |
| `vx`, `vy` | `number` (velocity) |
| `life` | `number` (remaining life) |
| `maxLife` | `number` (initial life) |
| `color` | `string` |
| `size` | `number` |

### `VisibleRect`
| Field | Type |
|---|---|
| `left`, `right`, `top`, `bottom` | `number` (world-space) |

### `MinimapArgs`
| Field | Type | Purpose |
|---|---|---|
| `ctx` | `CanvasRenderingContext2D` | |
| `x`, `y` | `number` | Top-left of minimap in CSS pixels |
| `size` | `number` | Minimap size (square) |
| `worldSize` | `number` | |
| `arenaRadius` | `number` | Current breathing arena radius (world units) |
| `snakes` | `SnakeSnapshot[]` | |
| `myId` | `string` | |
| `range?` | `number` | Radar coverage radius in world-space; defaults `WORLD_SIZE/2` |

### `FullMapArgs`
| Field | Type | Purpose |
|---|---|---|
| `ctx` | `CanvasRenderingContext2D` | |
| `w`, `h` | `number` | Canvas CSS-pixel dimensions |
| `worldSize` | `number` | |
| `arenaRadius` | `number` | Current breathing arena radius (world units) |
| `snakes` | `SnakeSnapshot[]` | |
| `myId` | `string` | |

---

## 2. Function Index

| Function | Visual Purpose |
|---|---|
| `computeVisibleRect(rc, marginPx=100)` | Returns world-space visible rectangle with margin |
| `rectContainsPoint(rect, x, y)` | AABB point-in-rect test (internal) |
| `snakeIsVisible(pts, rect)` | Check if any point of a snake is in visible rect (internal) |
| `getMetallicGradient(rc, radius, color, secondary)` | Cache/bucket radial gradient for metallic skin (internal) |
| `getArenaRadius(now)` | Breathing arena radius: `baseRadius + sin(cycleProgress * 2π) * amplitude` |
| `formatChipDisplay(chips)` | Indian numbering: K / L / Cr formatting |
| `drawGrid(rc)` | Breathing circular arena: bg fill + grid + neon boundary |
| `drawMapBoundary(ctx, centerX, centerY, radius, tick)` | Dynamic-radius neon-rose boundary with breathing pulse |
| `drawFoodOrb(ctx, x, y, orbSize, value, color, glowColor, now, lowQuality)` | Single food orb with glow + radial gradient |
| `drawStarShape(ctx, cx, cy, outerR, innerR, points, rotation)` | Generic N-pointed star path (internal helper) |
| `drawStarCollectible(ctx, x, y, size, tick, lowQuality)` | 5-pointed gold star with rotation + pulse |
| `drawExtractionRing(ctx, x, y, snakeSize, progress, zoom)` | Extraction progress ring (white→green) around snake head |
| `drawFood(rc, foods)` | Batches orbs by tier + draws star chips individually |
| `drawSnake(rc, snake, opacity?)` | Full snake: body polyline + outline + head + eyes + name + chat bubble |
| `drawSnakeWithLayering(rc, snake, allSnakes)` | Snake with proximity-based opacity fade (0.75 for larger) |
| `drawChipLabel(ctx, x, y, chips, snakeSize, zoom)` | Indian-numbered chip pill above real-player heads |
| `drawChatBubble(rc, x, y, msg)` | Chat bubble above snake head (internal) |
| `drawParticles(rc, particles)` | Particle burst rendering (death/eat) |
| `drawMinimap(args)` | Corner radar minimap (circular, player-centred) |
| `drawFullMap(args)` | Full-screen arena overlay (press M) with legend |

---

## 3. Background & Arena

### `drawGrid(rc)` — Arena Background + Grid + Boundary

**Arena disc fill:**
- Shape: Circle at `(worldSize/2, worldSize/2)` with breathing radius
- Fill color: `#020617` (deep slate)
- Clipped to circle before grid drawn

**Grid lines:**
- Grid spacing: `60` world units
- Visible rect computed, start/end snapped to grid multiples
- Stroke color: `#1e293b` (slate-800)
- Line width: `1 / zoom` (constant 1px screen-space)
- Lines: vertical `moveTo(x, startY) → lineTo(x, endY)`, horizontal `moveTo(startX, y) → lineTo(endX, y)`

**Arena boundary (outer ring):**
- Stroke color: `#f43f5e` (rose-500, neon-rose)
- Line width: `10`
- Shadow color: `#f43f5e`
- Shadow blur: `16` (skipped if `lowQuality`)
- Shape: Circle at `(worldSize/2, worldSize/2)` with breathing radius, full arc `0 → 2π`

### `getArenaRadius(now)` — Breathing Formula
- `cycleTime = (now % MAP_BREATH_CYCLE_MS) / MAP_BREATH_CYCLE_MS`
- `sinVal = sin(cycleTime * 2π)`
- Returns `MAP_BASE_RADIUS + sinVal * MAP_BREATH_AMPLITUDE`
- Values imported from `@/lib/game-config`

### `drawMapBoundary(ctx, centerX, centerY, radius, tick)` — Dynamic Online Boundary

**Breathing pulse:**
- Oscillation: `sin(tick * 0.0015) * 3` (±3px over ~4.2s cycle at `0.0015` rad/ms)
- Minimum radius: `100`
- Effective radius: `max(100, radius + breathe)`

**Outer glow ring:**
- Stroke color: `#f43f5e`
- Line width: `10`
- Shadow color: `#f43f5e`
- Shadow blur: `20`
- Shape: Full circle at `(centerX, centerY)` with effective radius

**Inner subtle glow ring:**
- Stroke color: `rgba(244, 63, 94, 0.35)` (rose at 35% opacity)
- Line width: `3`
- Shadow blur: `8`
- Radius offset: `r - 6` (6px inside outer ring)

---

## 4. Food Orbs

### `ORB_CONFIGS` — Three Visual Tiers

| Value (key) | Label | Radius | Color | Glow Color | Shadow Blur |
|---|---|---|---|---|---|
| `1` | small | `3` | `#34d399` (emerald-400) | `#10b981` (emerald-500) | `6` |
| `3` | medium | `5` | `#38bdf8` (sky-400) | `#0ea5e9` (sky-500) | `10` |
| `5` | large | `8` | `#f472b6` (pink-400) | `#ec4899` (pink-500) | `16` |

- Default fallback: `ORB_CONFIGS[1]` (small green)

### `drawFoodOrb(ctx, x, y, orbSize, value, color, glowColor, now, lowQuality)`

**Radius selection:**
- Config radius used unless `orbSize > 0`, then uses `orbSize`
- Minimum radius: `2`

**Pulse animation (large orbs only, value === 5):**
- Skipped in low quality
- Formula: `pulse = sin(now * 0.004) * 1.5`
- Animated radius: `r + pulse` (±1.5px oscillation)
- Timing: ~0.004 rad/ms → period ≈ 1571ms (~1.57s)

**Glow effect:**
- Skipped in low quality
- Shadow color: orb's `glowColor`
- Shadow blur: config's `shadowBlur` (6 / 10 / 16 by tier)

**Radial gradient (lit-from-within look):**
- Center: `(x, y)`, radius 0 → outer: `(x, y)`, radius `animR`
- Color stops:
  - `0.0` → `#ffffff` (white center)
  - `0.3` → orb's color (e.g. `#34d399`, `#38bdf8`, `#f472b6`)
  - `1.0` → orb's glow color (e.g. `#10b981`, `#0ea5e9`, `#ec4899`)
- Shape: Circle filled with this gradient

### `drawFood(rc, foods)` — Batching Logic

**Tier routing (by `value`):**
- `value >= 5` → `largeOrbs`
- `value >= 3` → `mediumOrbs`
- else → `smallOrbs`
- `isStarChip === true` → `starChips`

**Culling:** Skips food outside `computeVisibleRect`

---

## 5. Star Collectibles (Star Chips)

### `drawStarShape(ctx, cx, cy, outerR, innerR, points, rotation)`
- Generic N-pointed star path builder
- Alternates between `outerR` (tips) and `innerR` (valleys)
- Angle per vertex: `π / points`, starting at `-π / 2 + rotation` (12 o'clock, rotated)
- Uses `moveTo` for first point, `lineTo` for rest, `closePath`

### `drawStarCollectible(ctx, x, y, size, tick, lowQuality)`

**Dimensions:**
- Outer radius: `max(4, size)`
- Inner radius: `max(2, size * 0.4)` (40% of outer)

**Rotation animation:**
- Formula: `tick * 0.002` (slow spin, 0.002 rad/ms)

**Pulse animation:**
- Skipped in low quality
- Formula: `sin(tick * 0.004) * 1.5` (±1.5px, ~1.57s period)
- Outer animated: `outerR + pulse`
- Inner animated: `innerR + pulse * 0.4` (inner pulses at 40% amplitude)

**Glow effect:**
- Skipped in low quality
- Shadow color: `#f59e0b` (amber-500)
- Shadow blur: `12 + sin(tick * 0.003) * 4` (oscillates 8–16, ~2.09s period at 0.003 rad/ms)

**Golden radial gradient fill:**
- Center: `(x, y)` radius 0 → outer: `(x, y)` radius `animOuter`
- Color stops:
  - `0.0` → `#fef3c7` (amber-100, bright center)
  - `0.4` → `#fbbf24` (amber-400)
  - `1.0` → `#f59e0b` (amber-500)

**Star chip value label (drawn inside star, in `drawFood`):**
- Star radius: `max(4, f.size + 4)`
- Label font size: `max(7, min(11, starRadius * 0.55))` — range 7–11px
- Font: `bold ${labelSize}px monospace`
- Text align: `center`, baseline: `middle`
- Fill color: `#7c2d12` (dark brown, readable on gold)
- Y offset: `+0.5` pixels (slight downward nudge)
- Format: `value >= 1000` → `${Math.round(value/1000)}k`, else `${Math.round(value)}`
- Called with `drawStarCollectible(ctx, f.x, f.y, max(6, f.size + 4), rc.now, lowQuality)`

---

## 6. Extraction Ring

### `drawExtractionRing(ctx, x, y, snakeSize, progress, zoom)`
- Only renders when `0 < progress <= 1`

**Ring dimensions:**
- Ring radius: `max(8, snakeSize + 10/zoom)`
- Track line width: `max(2, 3/zoom)`
- Progress arc line width: `track + 1/zoom`

**Background track (full circle):**
- Stroke: `rgba(255, 255, 255, 0.15)` (white at 15% opacity)
- Line width: `max(2, 3/zoom)`
- Shape: Full circle `0 → 2π`

**Progress arc:**
- Start angle: `-π/2` (12 o'clock)
- End angle: `-π/2 + progress * 2π`
- Line cap: `round`
- Color interpolation (white → emerald green):
  - R: `round(255 - progress * 227)` → 255 to 28
  - G: `round(255 - progress * 55)` → 255 to 200
  - B: `round(255 - progress * 215)` → 255 to 40
  - Stroke: `rgba(R, G, B, 0.9)`

**Glow pass (same arc, fainter):**
- Shadow color: `rgba(R, G, B, 0.5)`
- Shadow blur: `8/zoom`
- Stroke: `rgba(R, G, B, 0.4)`
- Line width: track width (thinner than progress arc)

---

## 7. Snake Rendering

### `drawSnake(rc, snake, opacity?)`

**Visibility check:** Uses `computeVisibleRect` + `snakeIsVisible`

**Downsample stride:**
- `pts.length > 60` → stride `2` (skip every other point)
- else → stride `1`

**Body dimensions:**
- Radius: `max(2, snake.visualRadius ?? snake.size)`
- Width (line width): `radius * 2`

**Outline underlay (if `snake.secondaryColor` exists):**
- Line cap: `round`, line join: `round`
- Line width: `width + 4/zoom`
- Stroke: `snake.secondaryColor`
- Global alpha: `baseAlpha * 0.55`

**Body rendering — 5 skin patterns + default:**

| Pattern | Condition | Rendering |
|---|---|---|
| **metallic** | `playerSkin?.pattern === 'metallic'` AND `secondaryColor` exists | Radial gradient stroke (see metallic gradient below) |
| **rainbow** | `playerSkin?.pattern === 'rainbow'` AND NOT lowQuality | Chunked HSL cycling, chunkSize = `max(4, floor(pts.length/12))`, hue = `(now*0.05 + i*14) % 360`, color = `hsl(hue, 90%, 55%)` |
| **neon** | `playerSkin?.pattern === 'neon'` AND NOT lowQuality | Chunked alternating cyan/purple, chunkSize = `max(4, floor(pts.length/10))`, ratio = `(sin(now*0.009 - chunkIndex*0.28)+1)/2`, color = `#06b6d4` (cyan-500) if ratio>0.5 else `#a855f7` (purple-500) |
| **camo** | `playerSkin?.pattern === 'camo'` | Chunked cycling colors: `['#15803d', '#854d0e', '#78350f', '#166534']`, chunkSize = `max(4, floor(pts.length/12))` |
| **default** | All other cases | Solid `snake.color` stroke |

All patterns: line cap `round`, line join `round`, line width = `width`

**Metallic gradient detail (`getMetallicGradient`):**
- Bucketed by `max(4, round(radius))` — 2px buckets minimum
- Cache key: `${color}:${secondary}:${bucket}`
- Gradient: radial from `(-bucket*0.35, -bucket*0.35)` radius `bucket*0.1` → center `(0,0)` radius `bucket`
- Color stops:
  - `0.0` → `#f8fafc` (slate-50, highlight)
  - `0.35` → `secondaryColor` (or `color` if no secondary)
  - `1.0` → `color`

**Head:**
- Shape: Filled circle at `pts[0]` (head position), radius = `radius`
- Fill: `snake.color`
- Player head glow (if `isMe` AND NOT lowQuality):
  - Shadow color: `snake.color`
  - Shadow blur: `14`

**Eyes:**
- Eye offset from center: `radius * 0.45`
- Eye white radius: `max(1.5, radius * 0.32)`
- Pupil radius: `max(0.8, radius * 0.18)`
- Eyes positioned perpendicular to snake angle (`angle + π/2`):
  - Forward offset: `cos(angle) * eyeOffset * 0.4`
  - Lateral offset: `±cos(perp) * eyeOffset`
- Eye whites fill: `#ffffff`
- Pupils fill: `#0a0a0a` (near-black)
- Pupils offset forward by `cos(angle) * pupilR`, `sin(angle) * pupilR`

**Spawn protection ring (if `snake.spawnProtected`):**
- Stroke: `rgba(255,255,255,0.6)` (white at 60%)
- Line width: `2/zoom`
- Radius: `radius + 4/zoom`
- Shape: Full circle

**Name label (if `snake.name` exists):**
- Font: `${max(10, 12/zoom)}px monospace`
- Text align: `center`, baseline: `bottom`
- Y position: `head.y - radius - 6/zoom`

| Snake Type | Label Color | Label Text |
|---|---|---|
| Bot | `rgba(251, 146, 60, 0.75)` (orange-400 at 75%) | `[BOT] ${snake.name}` |
| Local player | `#22c55e` (green-500) | `snake.name` |
| Other player | `rgba(226, 232, 240, 0.85)` (slate-200 at 85%) | `snake.name` |

**User tag (if `snake.userTag` exists):**
- Font: `${max(8, 9/zoom)}px monospace`
- Fill: `rgba(148, 163, 184, 0.7)` (slate-400 at 70%)
- Y position: `labelY - 12/zoom` (above name)

**Chat bubble (if `snake.chatMessage` exists):**
- Position: `head.y - radius - 24/zoom`
- Delegated to `drawChatBubble`

### `drawSnakeWithLayering(rc, snake, allSnakes)` — Proximity Opacity

- `LAYERING_PROXIMITY` constant: `30` (world-space pixels)
- Check each other snake's head distance from this snake's head
- If a **smaller** snake (by `visualRadius ?? size`) is within 30px, fade this snake to `0.75` opacity
- Otherwise, full `1.0` opacity
- Delegates to `drawSnake(rc, snake, opacity)`

---

## 8. Chip Label

### `drawChipLabel(ctx, x, y, chips, snakeSize, zoom)`
- Skipped when `chips <= 0`
- Label text: `formatChipDisplay(chips)` (Indian numbering: K/L/Cr)

**Font:**
- `${max(9, 10/zoom)}px monospace`, bold
- Text align: `center`, baseline: `bottom` (then switched to `middle` for fill)

**Pill background:**
- Fill: `rgba(0, 0, 0, 0.65)` (black at 65%)
- Border: `rgba(251, 191, 36, 0.7)` (amber-400 at 70%)
- Border width: `1/zoom`
- Corner radius: `4/zoom`
- Padding X: `5/zoom`, Padding Y: `2/zoom`
- Position: centered on `(x, y - offset - th)` where `offset = snakeSize + 12/zoom`

**Label text:**
- Fill: `#ffffff` (white)
- Positioned at pill vertical centre

---

## 9. Chat Bubble

### `drawChatBubble(rc, x, y, msg)`

**Text truncation:**
- Max 80 chars; if longer, truncated to 78 chars + `'…'` (ellipsis)

**Font:**
- `${max(10, 11/zoom)}px monospace`
- Text align: `center`, baseline: `middle`

**Bubble dimensions:**
- Padding X: `6/zoom`, Padding Y: `3/zoom`
- Height: `14/zoom + padY*2`
- Corner radius: `4/zoom`
- Position: centered on `(x, y - th)` (above the given y)

**Bubble appearance:**
- Fill: `rgba(15, 23, 42, 0.92)` (slate-900 at 92%)
- Border: `rgba(99, 102, 241, 0.6)` (indigo-500 at 60%)
- Border width: `1.5/zoom`
- Shape: Rounded rectangle (pill) via `arcTo` path

**Text:**
- Fill: `#f8fafc` (slate-50)
- Position: `(x, y - th/2)` (vertically centred in bubble)

---

## 10. Particles

### `drawParticles(rc, particles)`

**Rendering mode:**
- `globalCompositeOperation`: `'lighter'` (additive blending)
- Per-particle alpha: `max(0, min(1, life/maxLife))` — linear fade over lifetime
- Shape: Filled circle at `(p.x, p.y)`
- Radius: `p.size / zoom`
- Fill: `p.color` (per-particle, set by caller)
- Skipped if `p.life <= 0`
- Max particles (caller-enforced): `200`
- Restores `globalCompositeOperation` to `'source-over'` after

---

## 11. Minimap (Corner Radar)

### `drawMinimap(args)`

**Dimensions & layout:**
- Square minimap at `(x, y)` with `size` pixels
- Center: `(x + size/2, y + size/2)`
- Radius: `size/2`
- Scale factor: `r / radarRange` where `radarRange` defaults to `WORLD_SIZE/2`
- Player-centred: player head is always at minimap centre

**Background disc:**
- Fill: `rgba(2, 6, 23, 0.85)` (deep slate at 85%)
- Border: `rgba(99, 102, 241, 0.4)` (indigo-500 at 40%)
- Border width: `1.5`
- Clipped to circle

**Concentric rings:**
- Stroke: `rgba(99, 102, 241, 0.10)` (indigo-500 at 10%)
- Line width: `1`
- 3 rings at insets: `[2, 5, 8]` pixels from edge (radii: `r-2`, `r-5`, `r-8`)

**Crosshairs:**
- Stroke: `rgba(15, 23, 42, 0.4)` (slate-900 at 40%)
- Vertical: `(cx, y) → (cx, y+size)`
- Horizontal: `(x, cy) → (x+size, cy)`

**Arena boundary on minimap:**
- Stroke: `rgba(244, 63, 94, 0.6)` (rose-500 at 60%)
- Line width: `1.2`
- Dash: `[4, 4]`
- Centred on world centre (offset from player position)

**Snake dots on minimap:**

| Type | Dot Radius | Fill Color |
|---|---|---|
| Local player | `3` | `#818cf8` (indigo-400) |
| Bot | `2` | `#f43f5e` (rose-500) |
| Other real player | `2` | `#34d399` (emerald-400) |

- Snakes beyond minimap radius are culled

---

## 12. Full Map Overlay (Press M)

### `drawFullMap(args)`

**Canvas reset:** `ctx.setTransform(1, 0, 0, 1, 0, 0)` (draws in screen-space)

**Background fill:**
- `rgba(2, 6, 23, 0.94)` (deep slate at 94%)
- Full canvas `fillRect(0, 0, w, h)`

**Layout:**
- Arena centered on screen: `cx = w/2`, `cy = h/2`
- Margin: `80`px
- Fit dimension: `min(w, h) - margin*2`
- Scale: `fitDim / (arenaRadius * 2)`
- Screen radius: `arenaRadius * scale`
- World-to-screen transforms: `cx + (wx - worldSize/2) * scale`

**Concentric range rings:**
- Stroke: `rgba(99, 102, 241, 0.10)` (indigo-500 at 10%)
- Line width: `1`
- 3 rings at fractions: `[0.25, 0.5, 0.75]` of `screenR`

**Crosshairs:**
- Stroke: `rgba(15, 23, 42, 0.5)` (slate-900 at 50%)
- Vertical: `(cx, cy - screenR) → (cx, cy + screenR)`
- Horizontal: `(cx - screenR, cy) → (cx + screenR, cy)`

**Arena boundary:**
- Stroke: `rgba(244, 63, 94, 0.8)` (rose-500 at 80%)
- Line width: `2`
- Dash: `[6, 6]`

**Snake dots:**

| Type | Dot Radius | Fill Color | Extra |
|---|---|---|---|
| Local player | `5` | `#818cf8` (indigo-400) | Pulsing ring: radius `9`, stroke `rgba(129, 140, 248, 0.7)`, width `2` |
| Bot | `2.5` | `#f43f5e` (rose-500) | None |
| Other real player | `3` | `#34d399` (emerald-400) | None |

**Title:**
- Text: `"ARENA OVERVIEW — ALL SNAKES"`
- Font: `bold 14px monospace`
- Fill: `rgba(226, 232, 240, 0.95)` (slate-200 at 95%)
- Align: `center`, baseline: `top`
- Position: `(cx, 16)`

**Close hint:**
- Text: `"Press M to close"`
- Font: `11px monospace`
- Fill: `rgba(148, 163, 184, 0.85)` (slate-400 at 85%)
- Position: `(cx, h - 24)`

**Legend (top-left):**
- Font: `11px monospace`, align `left`
- Start position: `(20, 20)`
- Each entry: 18px vertical spacing
- Dot + text pattern:
  - Dot at `(legendX + 6, legendY + 6)` with entry's `dotR`
  - Text at `(legendX + 18, legendY)` with fill `rgba(226, 232, 240, 0.85)`

| Label | Dot Color | Dot Radius |
|---|---|---|
| `"You"` | `#818cf8` | `5` |
| `"Real Players"` | `#34d399` | `3` |
| `"Bots"` | `#f43f5e` | `2.5` |

---

## 13. Indian Number Formatting (`formatChipDisplay`)

| Range | Format | Examples |
|---|---|---|
| `< 1000` | Plain number | `"500"`, `"999"` |
| `1000 – 99,999` | K suffix | `"1K"`, `"1.5K"`, `"25K"`, `"99.9K"` |
| `100,000 – 9,999,999` | L (lakh) suffix | `"1L"`, `"1.5L"`, `"50L"`, `"99.9L"` |
| `≥ 10,000,000` | Cr (crore) suffix | `"1Cr"`, `"1.2Cr"`, `"15Cr"` |

- Decimal `.0` trailing zeros stripped (e.g. `"1.0K"` → `"1K"`)

---

## 14. Complete Color Master List

### Hex Colors
| Color | Name/Usage |
|---|---|
| `#020617` | Arena background (slate-950) |
| `#1e293b` | Grid lines (slate-800) |
| `#f43f5e` | Arena boundary, bot dots (rose-500) |
| `#34d399` | Small orb color, real player dots (emerald-400) |
| `#10b981` | Small orb glow (emerald-500) |
| `#38bdf8` | Medium orb color (sky-400) |
| `#0ea5e9` | Medium orb glow (sky-500) |
| `#f472b6` | Large orb color (pink-400) |
| `#ec4899` | Large orb glow (pink-500) |
| `#f59e0b` | Star glow, star outer gradient (amber-500) |
| `#fbbf24` | Star mid gradient (amber-400) |
| `#fef3c7` | Star center gradient (amber-100) |
| `#7c2d12` | Star chip value label (dark brown) |
| `#ffffff` | Orb gradient center, eye whites, chip label text |
| `#0a0a0a` | Pupil fill (near-black) |
| `#f8fafc` | Chat bubble text, metallic gradient highlight (slate-50) |
| `#22c55e` | Local player name label (green-500) |
| `#818cf8` | Player minimap/fullmap dot (indigo-400) |
| `#06b6d4` | Neon skin cyan (cyan-500) |
| `#a855f7` | Neon skin purple (purple-500) |
| `#15803d` | Camo color 1 (green-700) |
| `#854d0e` | Camo color 2 (yellow-800) |
| `#78350f` | Camo color 3 (amber-900) |
| `#166534` | Camo color 4 (green-800) |

### RGBA Colors
| Color | Usage |
|---|---|
| `rgba(244, 63, 94, 0.35)` | Inner boundary glow ring |
| `rgba(255, 255, 255, 0.15)` | Extraction track ring |
| `rgba(R, G, B, 0.9)` | Extraction progress arc (interpolated white→green) |
| `rgba(R, G, B, 0.5)` | Extraction glow shadow |
| `rgba(R, G, B, 0.4)` | Extraction glow stroke |
| `rgba(255,255,255,0.6)` | Spawn protection ring |
| `rgba(251, 146, 60, 0.75)` | Bot name label (orange-400) |
| `rgba(226, 232, 240, 0.85)` | Other player name label (slate-200) |
| `rgba(148, 163, 184, 0.7)` | User tag text (slate-400) |
| `rgba(148, 163, 184, 0.85)` | Full-map close hint, legend text (slate-400) |
| `rgba(0, 0, 0, 0.65)` | Chip label pill background |
| `rgba(251, 191, 36, 0.7)` | Chip label pill border (amber-400) |
| `rgba(15, 23, 42, 0.92)` | Chat bubble background (slate-900) |
| `rgba(99, 102, 241, 0.6)` | Chat bubble border (indigo-500) |
| `rgba(99, 102, 241, 0.4)` | Minimap border (indigo-500) |
| `rgba(99, 102, 241, 0.10)` | Minimap/fullmap concentric rings (indigo-500) |
| `rgba(15, 23, 42, 0.4)` | Minimap crosshairs (slate-900) |
| `rgba(15, 23, 42, 0.5)` | Full-map crosshairs (slate-900) |
| `rgba(244, 63, 94, 0.6)` | Minimap arena boundary (rose-500) |
| `rgba(244, 63, 94, 0.8)` | Full-map arena boundary (rose-500) |
| `rgba(2, 6, 23, 0.85)` | Minimap background (deep slate) |
| `rgba(2, 6, 23, 0.94)` | Full-map background (deep slate) |
| `rgba(226, 232, 240, 0.95)` | Full-map title (slate-200) |
| `rgba(129, 140, 248, 0.7)` | Full-map player pulse ring (indigo-400) |

### HSL Colors (generated at runtime)
| Pattern | Formula | Values |
|---|---|---|
| Rainbow skin | `hsl(hue, 90%, 55%)` | Hue cycles: `(now * 0.05 + i * 14) % 360` |

---

## 15. Animation / Timing Values

| Animation | Formula | Period / Rate |
|---|---|---|
| Arena breathing radius | `sin((now % CYCLE) / CYCLE * 2π) * AMP` | `MAP_BREATH_CYCLE_MS` (from config) |
| Dynamic boundary pulse | `sin(tick * 0.0015) * 3` | ~4189ms (~4.2s) |
| Large orb pulse | `sin(now * 0.004) * 1.5` | ~1571ms (~1.57s) |
| Star rotation | `tick * 0.002` | 0.002 rad/ms (continuous) |
| Star outer pulse | `sin(tick * 0.004) * 1.5` | ~1571ms (~1.57s) |
| Star inner pulse | `outerPulse * 0.4` | Same freq, 40% amplitude |
| Star glow oscillation | `12 + sin(tick * 0.003) * 4` | ~2094ms (~2.09s), range 8–16 |
| Rainbow hue shift | `(now * 0.05 + i * 14) % 360` | 0.05 hue/ms per chunk + 14°/chunk offset |
| Neon pattern toggle | `sin(now * 0.009 - chunkIdx * 0.28)` | ~698ms (~0.7s) per toggle |
| Particle lifetime fade | `life / maxLife` | Linear, set by caller |

---

## 16. Low Quality Mode Effects

When `lowQuality === true`:
- Arena boundary: no shadow/glow
- Food orbs: no shadow/glow, no pulse animation on large orbs
- Star collectibles: no glow, no pulse animation (rotation still applies)
- Snake head: no player glow halo
- Rainbow/neon skin patterns: fall through to default solid color
- Metallic pattern: still renders (no quality gate)
- Camo pattern: still renders (no quality gate)
- Extraction ring glow: gated by `lowQualityCheck` (currently always returns `false`, so glow always renders — likely a stub)

---

## 17. All Font Settings

| Element | Size | Family | Weight | Align | Baseline |
|---|---|---|---|---|
| Snake name | `max(10, 12/zoom)px` | monospace | normal | center | bottom |
| Snake user tag | `max(8, 9/zoom)px` | monospace | normal | center | (continues from name) |
| Star chip value | `max(7, min(11, starRadius*0.55))px` | monospace | bold | center | middle |
| Chip label | `max(9, 10/zoom)px` | monospace | bold | center | bottom → middle |
| Chat bubble | `max(10, 11/zoom)px` | monospace | normal | center | middle |
| Full-map title | `14px` | monospace | bold | center | top |
| Full-map hint | `11px` | monospace | normal | center | (continues) |
| Full-map legend | `11px` | monospace | normal | left | (continues) |

---

## 18. All Drawn Shapes Summary

| Shape | Where | Key Properties |
|---|---|---|
| Filled circle (arena bg) | `drawGrid` | Radius = breathing arena radius, fill `#020617`, clipped |
| Grid lines | `drawGrid` | Horizontal + vertical, spacing 60, stroke `#1e293b` |
| Stroked circle (boundary) | `drawGrid`, `drawMapBoundary` | Radius = breathing, stroke `#f43f5e`, width 10, glow |
| Filled circle (food orb) | `drawFoodOrb` | Radial gradient white→color→glow, radius 3/5/8 |
| 5-pointed star | `drawStarCollectible` | Golden gradient, rotation + pulse, outer/inner radius |
| Stroked circle track | `drawExtractionRing` | White 15% opacity, progress arc overlay |
| Stroked polyline (body) | `drawSnake` | Width = radius*2, round cap/join, 5 pattern modes |
| Stroked polyline (outline) | `drawSnake` | Width = radius*2 + 4/zoom, 55% alpha |
| Filled circle (head) | `drawSnake` | Radius = snake radius, player gets glow |
| Filled circles (eyes) | `drawSnake` | White + near-black pupils, positioned by angle |
| Stroked circle (spawn ring) | `drawSnake` | White 60%, width 2/zoom |
| Rounded rect (chip pill) | `drawChipLabel` | Black 65% bg, amber border, white text |
| Rounded rect (chat bubble) | `drawChatBubble` | Slate-900 92% bg, indigo border, slate-50 text |
| Filled circles (particles) | `drawParticles` | Additive blend, per-particle color, linear fade |
| Filled circle (minimap bg) | `drawMinimap` | Deep slate 85%, indigo border |
| Stroked circles (concentric) | `drawMinimap`, `drawFullMap` | Indigo 10%, 3 rings |
| Lines (crosshairs) | `drawMinimap`, `drawFullMap` | Slate-900 40-50% |
| Dashed circle (arena on map) | `drawMinimap` | Rose 60%, dash [4,4], width 1.2 |
| Dashed circle (arena full) | `drawFullMap` | Rose 80%, dash [6,6], width 2 |
| Filled circles (dots) | `drawMinimap`, `drawFullMap` | 3 sizes/colors by player type |
| Stroked circle (player pulse) | `drawFullMap` | Indigo 70%, radius 9, width 2 |
| Filled rect (full-map bg) | `drawFullMap` | Deep slate 94%, full canvas |

---

## 19. Imported Config Values (from `@/lib/game-config`)

| Value | Type | Usage |
|---|---|---|
| `MAP_BASE_RADIUS` | `number` | Base arena radius for breathing formula |
| `MAP_BREATH_AMPLITUDE` | `number` | Sinusoidal amplitude for breathing |
| `MAP_BREATH_CYCLE_MS` | `number` | Full breathing cycle duration (ms) |
| `WORLD_SIZE` | `number` | Square world bounds; default radar range = `WORLD_SIZE/2` |
| `Skin` (type) | type | Player skin cosmetic type |

---

## 20. Rendering Pipeline Order (from file header comment)

1. `drawGrid` — breathing circular arena background + subtle grid + boundary
2. `drawFood` — three distinct orb sizes (small/medium/large) + star collectibles
3. `drawSnake` / `drawSnakeWithLayering` — polyline body + head + eyes + labels with optional opacity layering
4. `drawChipLabel` — Indian-numbered chip display above real-player heads
5. `drawParticles` — death/eat particle bursts
6. `drawMinimap` — corner radar minimap
7. `drawFullMap` — full-screen arena overlay
8. `drawMapBoundary` — dynamic-radius neon-rose boundary with breathing

---

*End of 05-render-helpers.ts catalogue.*

---

06-game-server.md
===
# 06 — Game Server Exhaustive Catalog

> Source files: `mini-services/game-server/index.ts` (1063 lines), `game-state.ts` (1215 lines), `spatial-grid.ts` (111 lines). Plus referenced: `src/lib/game-config.ts`, `src/lib/snake-engine.ts`, `src/lib/types.ts`.
> **Everything below is transcribed verbatim from code. Nothing invented.**

---

## 1. Server Architecture & Networking

### 1.1 Process & Port
| Field | Value | Source |
|---|---|---|
| Default port | `3001` (env `PORT`) | `index.ts:71` |
| Internal secret | `venom-arena-internal-dev` (env `INTERNAL_SECRET`) | `index.ts:72` |
| Next app URL | `http://localhost:3000` (env `NEXT_APP_URL`) | `index.ts:73` |
| CORS origin | `*` | `index.ts:215` |
| CORS methods | `['GET', 'POST']` | `index.ts:215` |
| Socket.IO path | `'/'` | `index.ts:214` |
| Ping timeout | `60000` ms | `index.ts:216` |
| Ping interval | `25000` ms | `index.ts:217` |
| Gateway | Caddy via `io("/?XTransformPort=3001")` | [CODE COMMENT] `index.ts:5` |

### 1.2 Loop Architecture
| Loop | Rate | Mechanism | Source |
|---|---|---|---|
| Game tick | `TICK_MS` = `1000/30` ≈ 33.33ms (30 Hz) | Recursive `setTimeout(tickOnce, TICK_MS)` | `index.ts:620` |
| Broadcast | `BROADCAST_MS` = `1000/20` = 50ms (20 Hz) | Recursive `setTimeout(broadcastOnce, BROADCAST_MS)` | `index.ts:75,656` |
| Heartbeat log | Every `15000` ms | Recursive `setTimeout(heartbeat, 15000)` | `index.ts:1032-1035` |

[CODE COMMENT] `index.ts:20-21`: "Recursive setTimeout (not setInterval) for both tick and broadcast loops — a slow tick can't overlap the next."
[CODE COMMENT] `index.ts:22`: "Every tick is wrapped in try/catch; one bad snake never kills the loop."
[CODE COMMENT] `index.ts:609`: "Skip empty rooms (no players) for CPU savings — bots stay idle."

### 1.3 HTTP Endpoints (Server-Level)
| Method | Path | Purpose | Source |
|---|---|---|---|
| GET | `/stats` | Returns `{ [roomKey]: { players, maxPlayers } }` | `index.ts:201-210` |

### 1.4 Server-to-Server HTTP Calls
All use 3-second timeout (`AbortController`) and `x-internal-secret` header.

| Endpoint | Purpose | Source |
|---|---|---|
| `POST /api/match/verify` | Validate JWT, fetch `PlayerIdentity` | `index.ts:126-140` |
| `POST /api/match/join` | Atomically deduct buyIn | `index.ts:142-157` |
| `POST /api/match/result` | Credit/debit player's account | `index.ts:171-193` |

**HTTP timeout:** `3000` ms (`index.ts:80`)

### 1.5 Process Signal Handling
| Signal | Behavior | Source |
|---|---|---|
| `SIGINT` | Broadcast `server_shutdown`, exit after 400ms (hard fallback 2000ms) | `index.ts:998-1009,1011` |
| `SIGTERM` | Same as SIGINT | `index.ts:1012` |
| `SIGHUP` | Ignored, logged as warning | `index.ts:1014-1016` |
| `SIGPIPE` | Ignored, logged as warning | `index.ts:1018-1020` |
| `uncaughtException` | Logged to stderr, not fatal | `index.ts:989-991` |
| `unhandledRejection` | Logged to stderr, not fatal | `index.ts:993-996` |
| `beforeExit` | Logged as warning | `index.ts:1024-1026` |
| `exit` | Logged as warning | `index.ts:1027-1029` |

[CODE COMMENT] `index.ts:986`: "Process-level guards (the OLD server had none → one bad write killed it)"

### 1.6 Boot Sequence
1. Log CORS warning (`index.ts:1046`)
2. Log `NEXT_APP_URL` and `PORT` (`index.ts:1047`)
3. Pre-create all arena rooms from `ARENA_TIERS` (`index.ts:1050-1052`)
4. Log pre-created room count (`index.ts:1053`)
5. Start tick loop (`index.ts:1056`)
6. Start broadcast loop (`index.ts:1057`)
7. Start heartbeat (`index.ts:1058`)
8. Listen on PORT (`index.ts:1060-1062`)

---

## 2. Socket.IO Events

### 2.1 Client → Server Events

#### `join_arena`
| Field | Type | Required | Source |
|---|---|---|---|
| `arenaId` | string | Yes | `index.ts:766` |

#### `input`
| Field | Type | Required | Source |
|---|---|---|---|
| `angle` | number (finite) | Yes | `index.ts:867,870` |
| `wantsBoost` | boolean | Yes | `index.ts:868,871` |

- Angle is normalized to `[0, 2π)` on receipt (`index.ts:873-876`)
- Rate-limited: max `MAX_SNAPSHOTS_PER_SECOND` (20) per second; interval minimum `INPUT_MIN_INTERVAL_MS` = 50ms (`index.ts:77,880-881`)
- Flood counter logged every 20 drops (`index.ts:883-885`)

#### `extract`
No payload. Starts extraction (`index.ts:718-720`).

#### `cancel_extract`
No payload. Cancels extraction (`index.ts:723-725`).

#### `chat`
| Field | Type | Required | Source |
|---|---|---|---|
| `message` | string | Yes | `index.ts:937-938` |

- Trimmed and sliced to `CHAT_MAX_LEN` = `80` chars (`index.ts:939`)
- Rate-limited: `CHAT_MIN_INTERVAL_MS` = `2000` ms (`index.ts:78,943`)

#### `leave`
No payload. Removes player, drops carried chips as stars (`index.ts:733-735`).

#### `disconnect`
Auto-handled by Socket.IO. Reason passed as string. Cleans up `userTagToSocket` mapping (`index.ts:738-746`).

### 2.2 Server → Client Events

#### `joined`
| Field | Type | Source |
|---|---|---|
| `arenaId` | string | `index.ts:852` |
| `worldSize` | number (8000) | `index.ts:853` |
| `yourId` | string (socket.id) | `index.ts:854` |

#### `join_error`
| Field | Type | Source |
|---|---|---|
| `reason` | string: `'invalid_arena'` \| `'already_in_match'` \| `'insufficient_chips'` \| `'banned'` | `index.ts:763,769,775,792,795,801` |

#### `kicked`
| Field | Type | Source |
|---|---|---|
| `reason` | string | `index.ts:700,798` |

#### `death`
| Field | Type | Source |
|---|---|---|
| `killerId` | string? | `index.ts:363` |
| `killerName` | string? | `index.ts:364` |
| `killerTag` | string? | `index.ts:365` |
| `killerColor` | string? | `index.ts:366` |
| `killerIsBot` | boolean (default `true`) | `index.ts:367` |

Emitted BEFORE `match_result` so client's `onDeath` handler runs first (`index.ts:357-360`).

#### `match_result`
| Field | Type | Source |
|---|---|---|
| `outcome` | `'extract'` \| `'death'` | `index.ts:285` |
| `arenaId` | string | `index.ts:286` |
| `arenaName` | string | `index.ts:287` |
| `chipsExtracted` | number (0 on death) | `index.ts:288,344` |
| `commission` | number | `index.ts:289` |
| `bankedAmount` | number | `index.ts:290` |
| `kills` | number | `index.ts:291` |
| `score` | number | `index.ts:292` |
| `xpGained` | number | `index.ts:293` |
| `newLevel` | number | `index.ts:294` |
| `newBankedChips` | number | `index.ts:295` |
| `durationSeconds` | number | `index.ts:296` |

#### `snapshot`
Full `GameSnapshot` object (see §6). Emitted per-player at 20 Hz (`index.ts:650`).

#### `extract_progress`
| Field | Type | Source |
|---|---|---|
| `progress` | number (0..1) | `index.ts:582` |

#### `extract_start`
| Field | Type | Source |
|---|---|---|
| `durationMs` | number (from `cfg.extractionDurationMs`, default 3000) | `index.ts:920` |

#### `extract_cancelled_by_steer`
Empty payload `{}`. Emitted when player steers during extraction (`index.ts:902`).

#### `kill_feed`
| Field | Type | Source |
|---|---|---|
| `victimName` | string | `index.ts:532-536` |
| `victimIsBot` | boolean | `index.ts:532-536` |
| `killerName` | string? (null for wall) | `index.ts:532-536` |
| `killerIsBot` | boolean | `index.ts:532-536` |
| `cause` | `'wall'` \| `'body'` \| `'headOn'` | `index.ts:532-536` |

#### `chat`
| Field | Type | Source |
|---|---|---|
| `senderId` | string | `index.ts:952` |
| `senderName` | string | `index.ts:953` |
| `senderTag` | string | `index.ts:954` |
| `message` | string | `index.ts:955` |

#### `server_shutdown`
Empty payload `{}`. Broadcast to ALL sockets on SIGINT/SIGTERM (`index.ts:1001`).

---

## 3. Authentication & Connection

### 3.1 Auth Middleware
- Socket.IO auth middleware validates JWT via `POST /api/match/verify` (`index.ts:664-680`)
- Token extracted from `socket.handshake.auth.token` (must be non-empty string) (`index.ts:665-667`)
- On failure: socket rejected with error
- On success: `PlayerIdentity` stored in `socket.data.identity`

[CODE COMMENT] `index.ts:8`: "Auth is mandatory — sockets without a valid JWT (verified via POST /api/match/verify) are disconnected at the middleware. No 'auth optional, admit anyway' path."
[CODE COMMENT] `index.ts:11`: "Identity is the verify response only. We never trust any subsequent client-supplied userTag/name/color/skin."

### 3.2 One-Socket-Per-User Rule
- Global `userTagToSocket: Map<string, string>` (`index.ts:223`)
- On connect: if prior socket exists for this userTag, emit `kicked` to it, then disconnect it (`index.ts:696-703`)

[CODE COMMENT] `index.ts:13`: "One socket per userTag — a new connection kicks the prior socket."

### 3.3 `PlayerIdentity` Interface
| Field | Type | Source |
|---|---|---|
| `id` | string | `game-state.ts:57` |
| `userTag` | string | `game-state.ts:58` |
| `name` | string | `game-state.ts:59` |
| `country` | string | `game-state.ts:60` |
| `level` | number | `game-state.ts:61` |
| `bankedChips` | number? | `game-state.ts:62` |
| `currentSkin` | string | `game-state.ts:63` |
| `currentTrail` | string | `game-state.ts:64` |
| `currentDeath` | string | `game-state.ts:65` |
| `currentFlag` | string? | `game-state.ts:66` |
| `color` | string | `game-state.ts:67` |
| `secondaryColor` | string? | `game-state.ts:68` |
| `pattern` | string? | `game-state.ts:69` |
| `unlockedSkins` | string[] | `game-state.ts:70` |
| `clanTag` | string? | `game-state.ts:71` |
| `clanRank` | string? | `game-state.ts:72` |
| `role` | `'player'` \| `'admin'` | `game-state.ts:73` |

---

## 4. Arena Room System

### 4.1 Sharding
- Per-arena rooms lazily created, keyed by arena id (`index.ts:221`)
- Max real players per shard: `MAX_PLAYERS_PER_SHARD` = `1000` (`index.ts:236`)
- Shard key format: `{arenaId}` (shard 0), `{arenaId}#2` (shard 1), `{arenaId}#3`, etc. (`index.ts:250`)
- Max shards: safety cap at 200 (`index.ts:265`)
- All arena tiers pre-created at boot (`index.ts:1050-1052`)

### 4.2 `ArenaRoom` Interface
| Field | Type | Source |
|---|---|---|
| `arena` | `ArenaTier` | `game-state.ts:153` |
| `cfg` | `SnakeConfig` | `game-state.ts:154` |
| `players` | `Map<string, PlayerSession>` | `game-state.ts:155` |
| `bots` | `Map<string, BotSession>` | `game-state.ts:156` |
| `foods` | `Food[]` | `game-state.ts:157` |
| `grid` | `SpatialHashGrid` (cellSize=120) | `game-state.ts:158,292` |
| `tick` | number (monotonic counter) | `game-state.ts:159` |
| `lastBroadcast` | number | `game-state.ts:160` |
| `leaderId` | string? | `game-state.ts:161` |
| `leaderChips` | number | `game-state.ts:162` |
| `foodIdCounter` | number (monotonic) | `game-state.ts:164` |
| `botIdCounter` | number (monotonic) | `game-state.ts:166` |
| `mapCenterX` | number (0) | `game-state.ts:168` |
| `mapCenterY` | number (0) | `game-state.ts:170` |

---

## 5. Server Constants (Defined in index.ts)

| Constant | Value | Source |
|---|---|---|
| `PORT` | `3001` (env override) | `index.ts:71` |
| `BROADCAST_MS` | `1000 / 20` = 50 | `index.ts:75` |
| `MAX_SNAPSHOTS_PER_SECOND` | `20` | `index.ts:76` |
| `INPUT_MIN_INTERVAL_MS` | `1000 / 20` = 50 | `index.ts:77` |
| `CHAT_MIN_INTERVAL_MS` | `2000` | `index.ts:78` |
| `CHAT_MAX_LEN` | `80` | `index.ts:79` |
| `HTTP_TIMEOUT_MS` | `3000` | `index.ts:80` |
| `MAX_PLAYERS_PER_SHARD` | `1000` | `index.ts:236` |

---

## 6. Shared Game Constants (from game-config.ts / snake-engine.ts)

### 6.1 World & Tick
| Constant | Value | Source |
|---|---|---|
| `WORLD_SIZE` | `8000` | `game-config.ts:185` |
| `WORLD_RADIUS` | `4000` | `game-config.ts:186` |
| `TICK_RATE_HZ` | `30` | `game-config.ts:199` |
| `TICK_MS` | `1000 / 30` ≈ 33.33 | `game-config.ts:200` |
| `BROADCAST_RATE_HZ` | `20` | `game-config.ts:201` |
| `MAX_SNAPSHOTS_PER_SECOND` | `20` | `game-config.ts:203` |

### 6.2 Snake Physics (`DEFAULT_SNAKE_CONFIG`)
| Config Key | Value | Source |
|---|---|---|
| `collisionRadius` | `6` px | `snake-engine.ts:116` |
| `visualRadius` | `8` px | `snake-engine.ts:117` |
| `segmentSpacing` | `16` px | `snake-engine.ts:118` |
| `baseSpeed` | `4.5` px/tick | `snake-engine.ts:119` |
| `boostSpeed` | `8.0` px/tick | `snake-engine.ts:120` |
| `turnBase` | `0.35` rad/tick | `snake-engine.ts:121` |
| `turnMin` | `0.08` rad/tick | `snake-engine.ts:122` |
| `turnScoreFactor` | `0.0003` | `snake-engine.ts:123` |
| `initialBodyLength` | `20` segments | `snake-engine.ts:124` |
| `initialSpawnScore` | `20` | `snake-engine.ts:125` |
| `maxSegments` | `200` | `snake-engine.ts:126` |
| `lengthLogFactor` | `20` | `snake-engine.ts:127` |
| `maxExtraRadius` | `3` px | `snake-engine.ts:128` |
| `thicknessLogFactor` | `0.5` | `snake-engine.ts:129` |
| `boostMinLength` | `8` segments | `snake-engine.ts:130` |
| `boostDropInterval` | `10` frames | `snake-engine.ts:131` |
| `hitFactor` | `0.75` | `snake-engine.ts:132` |
| `headOnHitFactor` | `0.8` | `snake-engine.ts:133` |
| `neckAngleThreshold` | `60` degrees | `snake-engine.ts:134` |
| `neckSegmentCount` | `5` | `snake-engine.ts:135` |

### 6.3 Food System
| Config Key | Value | Source |
|---|---|---|
| `foodSmallValue` | `1` | `snake-engine.ts:136` |
| `foodSmallRadius` | `3` px | `snake-engine.ts:137` |
| `foodSmallWeight` | `0.93` (93%) | `snake-engine.ts:138` |
| `foodMediumValue` | `3` | `snake-engine.ts:139` |
| `foodMediumRadius` | `5` px | `snake-engine.ts:140` |
| `foodMediumWeight` | `0.04` (4%) | `snake-engine.ts:141` |
| `foodLargeValue` | `5` | `snake-engine.ts:142` |
| `foodLargeRadius` | `8` px | `snake-engine.ts:143` |
| `foodLargeWeight` | `0.03` (3%) | `snake-engine.ts:144` |
| `foodCountTarget` | `1200` | `snake-engine.ts:145` |
| `starDropCount` | `10` | `snake-engine.ts:146` |

Food orb colors:
| Size | Color | Glow Color | Source |
|---|---|---|---|
| small | `#34d399` | `#10b981` | `snake-engine.ts:542-543` |
| medium | `#38bdf8` | `#0ea5e9` | `snake-engine.ts:549-550` |
| large | `#f472b6` | `#ec4899` | `snake-engine.ts:556-557` |

### 6.4 Extraction
| Config Key | Value | Source |
|---|---|---|
| `extractionDurationMs` | `3000` (3s) | `snake-engine.ts:147` |
| `extractionGlideSpeed` | `3.2` px/tick | `snake-engine.ts:148` |

### 6.5 Spawning
| Config Key | Value | Source |
|---|---|---|
| `spawnSafeDistance` | `500` px | `snake-engine.ts:149` |
| `spawnBoundaryMargin` | `500` px | `snake-engine.ts:150` |
| `spawnSafeAttempts` | `30` | `snake-engine.ts:151` |
| `spawnProtectionMs` | `4000` (4s) | `snake-engine.ts:152` |

### 6.6 Map
| Config Key | Value | Source |
|---|---|---|
| `mapMinRadius` | `3000` px | `snake-engine.ts:153` |
| `mapMaxRadius` | `16000` px | `snake-engine.ts:154` |
| `mapBreathAmplitude` | `40` px | `snake-engine.ts:155` |
| `mapBreathCycleMs` | `10000` (10s) | `snake-engine.ts:156` |

### 6.7 Bots
| Config Key | Value | Source |
|---|---|---|
| `botSelfDestructThreshold` | `100` score | `snake-engine.ts:157` |
| `botEvadeRadius` | `300` px | `snake-engine.ts:158` |
| `botFoodScanRadius` | `300` px | `snake-engine.ts:159` |

### 6.8 Economy
| Config Key | Value | Source |
|---|---|---|
| `commissionThreshold` | `4` real players | `snake-engine.ts:160` |
| `commissionRate` | `0.35` (35%) | `snake-engine.ts:161` |

### 6.9 Game-State-Local Constants
| Constant | Value | Source |
|---|---|---|
| `MAX_TURN_PER_TICK` | `0.22` rad (bot max turn) | `game-state.ts:178` |
| `MAX_SNAPSHOT_POINTS` | `60` (body point downsampling) | `game-state.ts:180` |

---

## 7. Growth & Size Formulas

### 7.1 Body Length
**Formula:** `initialBodyLength + min(maxSegments - initialBodyLength, lengthLogFactor × ln(1 + score))`
**Hard cap:** `maxSegments` (200)

Examples from [CODE COMMENT] `snake-engine.ts:172-179`:
- Score 0: 20 segments
- Score 100: ~31 segments
- Score 1,000: ~38 segments
- Score 10,000: ~46 segments
- Score 100,000: ~53 segments

### 7.2 Visual Radius
**Formula:** `visualRadius + min(maxExtraRadius, thicknessLogFactor × ln(1 + score))`
**Hard cap:** `visualRadius + maxExtraRadius` = 8 + 3 = 11px

Examples from [CODE COMMENT] `snake-engine.ts:192-198`:
- Score 0: 8px
- Score 1,000: ~8.35px
- Score 10,000: ~8.69px
- Score 100,000: ~9.04px

### 7.3 Collision Radius
**Formula:** `collisionRadius + min(1, 0.1 × ln(1 + score))`
- Ranges from 6px to ~7px at extreme scores

[CODE COMMENT] `snake-engine.ts:208-213`: "Collision radius barely grows — max 1px extra even at 100k score. The gap between collision circles is what enables threading through tight spaces."

### 7.4 Turn Rate
**Formula:** `max(turnMin, turnBase - turnScoreFactor × score)`
- Range: `0.08` to `0.35` rad/tick

### 7.5 Speed States
| State | Speed | Source |
|---|---|---|
| Normal | `baseSpeed` = 4.5 px/tick | `snake-engine.ts:236` |
| Boosting | `boostSpeed` = 8.0 px/tick | `snake-engine.ts:235` |
| Extracting | `extractionGlideSpeed` = 3.2 px/tick | `snake-engine.ts:234` |

### 7.6 Dynamic Map Radius
**Formula:** `mapMinRadius + (mapMaxRadius - mapMinRadius) × sqrt((count - 1) / (maxP - 1))`
- Where count = real player count (clamped 1–1000)
- Then add breathing: `+ sin(cycle × 2π) × mapBreathAmplitude`
- Cycle = `(elapsedMs % mapBreathCycleMs) / mapBreathCycleMs`

---

## 8. Tick Loop Processing Order

Each tick (30 Hz) processes in this exact sequence (`index.ts:406-602`):

1. **Increment tick counter** (`room.tick++`)
2. **Rebuild spatial grid** (clear + re-insert all segments and food) (`index.ts:410-443`)
3. **Bot AI tick** (all non-dead bots) (`index.ts:447-454`)
4. **Player movement** (server-authoritative, apply `desiredAngle` + `wantsBoost`) (`index.ts:457-480`)
5. **Body collision detection** → `detectCollisions()` (`index.ts:485`)
6. **Head-on collision detection** → `detectHeadOnCollisions()` (`index.ts:487`)
7. **Apply deaths** with drop rules (`index.ts:498-558`)
8. **Food eating** → `eatFood()` (`index.ts:561-565`)
9. **Replenish food** up to `foodCountTarget` (1200) (`index.ts:568-572`)
10. **Extraction progress** (non-dead, non-settling, extracting players) (`index.ts:575-590`)
11. **Recompute leader** + **expire chat** (`index.ts:593-602`)

---

## 9. Player Session & Snake State

### 9.1 `SnakeBase` (shared between players and bots)
| Field | Type | Purpose | Source |
|---|---|---|---|
| `id` | string | Unique identifier | `game-state.ts:78` |
| `name` | string | Display name | `game-state.ts:79` |
| `userTag` | string? | User tag (players only) | `game-state.ts:80` |
| `country` | string? | Country code | `game-state.ts:81` |
| `points` | `Vec2[]` | Body points (index 0 = head) | `game-state.ts:83` |
| `angle` | number | Current heading (radians) | `game-state.ts:84` |
| `size` | number | Visual radius in px | `game-state.ts:86` |
| `color` | string | Primary color | `game-state.ts:87` |
| `secondaryColor` | string? | Secondary color | `game-state.ts:88` |
| `isPlayer` | boolean | True for human | `game-state.ts:89` |
| `isBot` | boolean | True for bot | `game-state.ts:90` |
| `carriedChips` | number | Chips from star chips only | `game-state.ts:92` |
| `score` | number | `INITIAL_SPAWN_SCORE` + food collected | `game-state.ts:94` |
| `boostFrameCounter` | number | Boost tail-drop frame counter | `game-state.ts:96` |
| `isExtracting` | boolean | Currently extracting | `game-state.ts:97` |
| `extractionProgress` | number | ms toward extraction | `game-state.ts:99` |
| `isDead` | boolean | Dead flag | `game-state.ts:100` |
| `spawnProtectedUntil` | number | Invulnerability until epoch ms | `game-state.ts:102` |
| `chatMessage` | string? | Current chat bubble | `game-state.ts:103` |
| `chatExpiry` | number? | Chat expire epoch ms | `game-state.ts:104` |
| `wantsBoost` | boolean | Actively boosting | `game-state.ts:106` |
| `botState` | `'harvesting'` \| `'selfDestruct'`? | Bot state (online) | `game-state.ts:108` |

### 9.2 `PlayerSession` (extends `SnakeBase`)
| Field | Type | Source |
|---|---|---|
| `identity` | `PlayerIdentity` | `game-state.ts:113` |
| `desiredAngle` | number | `game-state.ts:115` |
| `kills` | number | `game-state.ts:116` |
| `joinedAt` | number (epoch ms) | `game-state.ts:117` |
| `lastInputAt` | number (epoch ms) | `game-state.ts:118` |
| `inputDropCount` | number | `game-state.ts:120` |
| `lastChatAt` | number (epoch ms) | `game-state.ts:121` |
| `arenaId` | string? | `game-state.ts:122` |
| `matchSettling` | boolean | `game-state.ts:124` |

### 9.3 Spawn Initialization
On join, a player is initialized with (`index.ts:817-846`):
- `id` = `socket.id`
- `name` = `identity.name`
- `userTag` = `identity.userTag`
- `country` = `identity.country`
- `points` = `initialBody(spawn.x, spawn.y, angle, cfg.initialBodyLength, cfg.segmentSpacing)`
- `angle` = random `[0, 2π)`
- `size` = `calcVisualRadius(cfg.initialSpawnScore, cfg)` (= 8)
- `color` = `identity.color`
- `secondaryColor` = `identity.secondaryColor`
- `isPlayer` = true, `isBot` = false
- `carriedChips` = `room.arena.buyIn` (the arena's buy-in amount)
- `score` = `cfg.initialSpawnScore` (= 20)
- `boostFrameCounter` = 0
- `isExtracting` = false, `extractionProgress` = 0
- `isDead` = false
- `spawnProtectedUntil` = `Date.now() + cfg.spawnProtectionMs` (4 seconds)
- `desiredAngle` = spawn angle
- `wantsBoost` = false
- `kills` = 0
- `joinedAt` = `Date.now()`
- `lastInputAt` = 0, `inputDropCount` = 0
- `lastChatAt` = 0
- `arenaId` = the joined arena id
- `matchSettling` = false

---

## 10. Snake Movement (Server-Authoritative)

[CODE COMMENT] `index.ts:14`: "Movement is server-authoritative — clients send only `angle`; the server computes position. Teleport is impossible."

### 10.1 `tickSnakeMovement()` — `game-state.ts:505-555`

**Step 1 — Turn:**
- `turnRate = calcTurnRate(snake.score, cfg)`
- `snake.angle = engineTurnToward(snake.angle, desiredAngle, turnRate)`

**Step 2 — Speed:**
- Boost conditions: `wantsBoost && !snake.isExtracting && snake.points.length > cfg.boostMinLength (8) && snake.score > cfg.initialSpawnScore (20)`
- If boosting: speed = `cfg.boostSpeed` (8.0)
- If extracting: speed = `cfg.extractionGlideSpeed` (3.2)
- Otherwise: speed = `cfg.baseSpeed` (4.5)

**Step 3 — Boost Tail Dropping:**
- If boosting: increment `boostFrameCounter`
- When `boostFrameCounter >= cfg.boostDropInterval` (10 frames):
  - Reset counter
  - If `points.length > cfg.boostMinLength + 1 (9)` AND `score > cfg.initialSpawnScore + 1 (21)`:
    - Drop tail position as food orb
    - `snake.points.pop()`
    - `snake.score = max(cfg.initialSpawnScore, snake.score - 1)` (floor at 20)
- If not boosting: reset counter, `wantsBoost = false`

**Step 4 — Move Head:**
- `newHead = moveHead(head, snake.angle, speed)` → `{ x: head.x + cos(angle) × speed, y: head.y + sin(angle) × speed }`
- `snake.points.unshift(newHead)`

**Step 5 — Body Length (Diminishing Growth):**
- `targetLen = calcBodyLength(snake.score, cfg)`
- While `points.length > targetLen`: `points.pop()`

**Step 6 — Size Update:**
- `snake.size = calcVisualRadius(snake.score, cfg)`

**Boost food drops** (from index.ts:462-476):
- Each dropped point becomes a `small` food orb (value=1, size=3, color=`#34d399`)
- Id: `food-{arenaId}-{foodIdCounter++}`

### 10.2 Extraction Steering Detection
- While extracting, if angle change > `0.08` rad (~4.6°), extraction progress resets to 0
- Emits `extract_progress { progress: 0 }` and `extract_cancelled_by_steer {}`
[CODE COMMENT] `index.ts:891`: "Forward gliding during extraction is allowed (natural movement). BUT any intentional steering (angle change > threshold) restarts extraction."

---

## 11. Collision Detection

### 11.1 Body Collision — `detectCollisions()` `game-state.ts:887-937`

**Skip conditions:** snake is dead, no points, spawn-protected, already dead this tick.

**Wall collision:**
- `distFromCenter = hypot(head.x - mapCenterX, head.y - mapCenterY)`
- If `distFromCenter > mapRadius` → death by `'wall'`, killerId = `'wall'`

**Head-to-body collision:**
- Query spatial grid: `queryRadius(head.x, head.y, snake.size + 30)`
- For each `segment`-kind item where `snakeId !== own id` and `segIdx !== 0`:
  - **Neck protection check:** `isNeckProtected(attackerAngle, head, segment, segIdx, victimAngle, cfg)` — if true, skip
  - Distance check: `d < (headCollisionRadius + segmentCollisionRadius × 0.7) × cfg.hitFactor (0.75)`
  - On collision: head's owner dies, body owner is killer

**Neck protection** (`snake-engine.ts:402-457`):
- Only applies to first `neckSegmentCount` (5) segments
- Blocked (pass-through) when:
  - `approachDeg > (90 - neckAngleThreshold)` (i.e. > 30°)
  - AND `bodyAlignDeg < neckAngleThreshold` (i.e. < 60°)
- `approachDeg` = angle between attacker's heading and direction from attacker to segment
- `bodyAlignDeg` = angle between attacker's heading and victim's heading

### 11.2 Head-On Collision — `detectHeadOnCollisions()` `game-state.ts:947-1028`

**Query:** `queryRadius(headA.x, headA.y, snakeA.size + 20)`, only `segIdx === 0` items.

**Distance threshold:** `d < (colA + colB) × cfg.headOnHitFactor (0.8)`

**Priority rules** (from [CODE COMMENT] `game-state.ts:941-945`):
- **Rule A:** No boost / both boosting → higher score survives
- **Rule B:** Smaller boosting, larger steady → **smaller** survives
- **Rule C:** Both boosting → higher score survives (same as A)
- **Tie** (equal score) → **both die**

Implementation (`game-state.ts:991-1015`):
- If `aScore === bScore`: both die
- If `aScore > bScore` (A is bigger):
  - If B boosting AND A not boosting → A dies (Rule B: smaller survives)
  - Else → B dies (Rule A/C: bigger survives)
- If `bScore > aScore` (B is bigger):
  - If A boosting AND B not boosting → B dies (Rule B: smaller survives)
  - Else → A dies (Rule A/C: bigger survives)

### 11.3 Death Processing (`index.ts:498-558`)

**Drop rules per cause:**

| Cause | Food Orbs | Star Chips | Source |
|---|---|---|---|
| Body collision (any snake) | Yes (score orbs along body) | Yes (real players only, if carriedChips > 0) | `index.ts:513-521` |
| Head-on collision (any snake) | Yes (score orbs along body) | Yes (real players only, if carriedChips > 0) | `index.ts:513-521` |
| Wall death (real player) | **No** (score destroyed) | Yes (if carriedChips > 0) | `index.ts:506-511` |
| Wall death (selfDestruct bot) | **No** | **No** (vanish cleanly) | `index.ts:512` |
| SelfDestruct bot collision death | Yes (food drops) | No | `index.ts:515-516` |

[CODE COMMENT] `index.ts:494-497`: "Body/headOn collision: drop score orbs (ALL snakes, including selfDestruct bots) + 10 stars (real players only). Wall death: drop 0 food (score destroyed) + 10 stars (real players only). Bot selfDestruct WALL death: 0 food, 0 stars (vanish cleanly). Bot selfDestruct COLLISION death: STILL drops food (only wall death vanishes cleanly)."

**Kill credit:** Only if killer is alive AND killer is a real player (`index.ts:524-529`). Bots don't track kills.

**Kill feed:** Broadcast `kill_feed` to all players in arena. Fields: `victimName`, `victimIsBot`, `killerName` (null for wall), `killerIsBot`, `cause` (`index.ts:532-539`).

**Player death:** Asynchronous `settleMatch(room, session, 'death', killer)` (`index.ts:545`).

**Bot death:** Remove from `room.bots`, spawn replacement bot to maintain count (`index.ts:549-557`).

### 11.4 Post-Death Replay Window
- Death: player stays in room for **16 seconds** after dying (`index.ts:378-390`)
- Client records 15s of post-death frames (300 frames at 20 Hz) for replay
- After 16s: removed from `room.players`, `playerSession` cleared
- Extract: removed immediately (no replay needed) (`index.ts:391-398`)

[CODE COMMENT] `index.ts:373-377`: "For death: keep the player in the room for 16 s so the broadcast loop continues sending snapshots. The client records 15 s of post-death frames (300 frames at 20 Hz) for the replay."

---

## 12. Food System

### 12.1 Food Interface
| Field | Type | Source |
|---|---|---|
| `id` | string | `game-state.ts:139` |
| `x` | number | `game-state.ts:140` |
| `y` | number | `game-state.ts:141` |
| `size` | number (radius in px) | `game-state.ts:142` |
| `value` | number (score/chip value) | `game-state.ts:143` |
| `isStarChip` | boolean | `game-state.ts:144` |
| `color` | string | `game-state.ts:145` |
| `glowColor` | string? | `game-state.ts:146` |
| `orbSize` | `'small'` \| `'medium'` \| `'large'`? | `game-state.ts:148` |

### 12.2 Regular Food
- Three sizes: Small (1pt, 3px), Medium (3pt, 5px), Large (5pt, 8px)
- Spawn distribution: 93% small, 4% medium, 3% large (weighted random)
- Food adds to `snake.score` (NOT `carriedChips`)
- All snakes (players AND bots) eat regular food

### 12.3 Star Chips
- Dropped on real player death (NOT bot death)
- Exactly `starDropCount` (10) stars per death
- Each star value = `carriedChips / 10` (all equal, floating point)
- Size: 12px, Color: `#fbbf24`, Glow: `#f59e0b`
- Positioned at death location with tiny 2px offset grid (5×2 pattern)
- Star chips add to `snake.carriedChips` only (NO score change)
- **ONLY real players** collect star chips; bots skip them

[CODE COMMENT] `game-state.ts:1037-1038`: "Star chips: carriedChips += value ONLY. NO score change. ONLY real players. Bots NEVER collect star chips."

### 12.4 Food Eating (`eatFood()`) `game-state.ts:1040-1068`
- Query grid: `queryRadius(head.x, head.y, snake.size + 20)`
- For each food item: `d < (headCollisionRadius + 4) + item.radius`
- Star chips: skip if `!snake.isPlayer`
- Regular food: `snake.score += item.value`
- Eaten food: both grid item and real `foodRef.value` set to 0 (sentinel)

### 12.5 Food Replenishment (`replenishFood()`) `game-state.ts:1192-1201`
- Filter out eaten food (value <= 0)
- Spawn up to `foodCountTarget` (1200) per tick, max 50 new orbs per tick

### 12.6 Food Spawn Location
- Random point in disc: `sqrt(random()) * maxR * 0.85` at random angle, centered at map center
- Spawn radius = `baseRadius - 50` (50px inside boundary)

### 12.7 Death Food Drops

**Score orbs** (`dropScoreOrbsAtBody()` `game-state.ts:399-442`):
- Compute mix: greedily Large (5pt) first, then Medium (3pt), then Small (1pt)
- Total value sums to exactly `snake.score`
- Orbs distributed along body path, shuffled for visual variety
- Scatter radius: 20px from body segment position
- Colors: Large = `#f472b6`/`#ec4899`, Medium = `#38bdf8`/`#0ea5e9`, Small = `#34d399`/`#10b981`

**Star chips** (`dropStarsAtDeath()` `game-state.ts:450-477`):
- Exactly 10 stars
- Each = `carriedChips / starDropCount`
- Size: 12px, Color: `#fbbf24`, Glow: `#f59e0b`
- No scatter — 2px offset grid at death position

### 12.8 Leave/Disconnect Drops
- On leave (not dead, not settling, carriedChips > 0): drop 10 star chips at head position (`index.ts:970-977`)
- No score orbs on leave

---

## 13. Extraction System

### 13.1 Start Extraction (`handleExtract()`) `index.ts:911-921`
- Guards: must be alive, not settling, not already extracting
- **NO zone check** — extract anywhere
[CODE COMMENT] `index.ts:916`: "NO zone check — extract anywhere (matches original design)."
- Sets `isExtracting = true`, `extractionProgress = 0`
- Emits `extract_start { durationMs }`

### 13.2 Cancel Extraction
- `cancel_extract` event: `isExtracting = false`, `extractionProgress = 0` (`index.ts:924-929`)
- Steering detection: angle change > 0.08 rad resets progress, emits `extract_progress { progress: 0 }` + `extract_cancelled_by_steer {}` (`index.ts:894-903`)

### 13.3 Progress (`tickRoom` step 10) `index.ts:575-590`
- Each tick: `extractionProgress += TICK_MS`
- `progress = min(1, extractionProgress / extractionDurationMs)`
- Emits `extract_progress { progress }` to player's socket
- On completion: async `settleMatch(room, session, 'extract')`
- Speed while extracting: `extractionGlideSpeed` = 3.2 px/tick
- Boost disabled while extracting

### 13.4 Extraction Steering Threshold
- `STEER_THRESHOLD` = `0.08` rad (~4.6°) (`index.ts:897`)
- Below this: "forward gliding during extraction is allowed (natural movement)"
- Above this: intentional steering, restarts extraction

---

## 14. Match Settlement

### 14.1 `settleMatch()` `index.ts:304-399`
- **Idempotent:** guarded by `matchSettling` flag — concurrent calls short-circuit
- Sets `matchSettling = true`, `isExtracting = false`, `extractionProgress = 0`

**Computed values:**
- `durationSeconds` = `max(0, floor((now - joinedAt) / 1000))`
- `carriedChips` = `max(0, floor(session.carriedChips))`
- `kills` = `session.kills`
- `killerTag` = killer's `userTag` (if applicable)
- `score` = `session.score`

### 14.2 Commission Calculation (`index.ts:322-326`)
- `realPlayerCount` = `room.players.size` (includes dead/settling in the Map, but only those still in map)
- If `realPlayerCount <= 3`: `commissionRate = 0`
- If `realPlayerCount >= 4`: `commissionRate = 0.35`
- `commission = outcome === 'extract' ? floor(carriedChips × commissionRate) : 0`
- `bankedAmount = outcome === 'extract' ? (carriedChips - commission) : 0`

### 14.3 Report to Next.js (`reportMatchResult()`) `index.ts:159-193`
**Payload sent to `/api/match/result`:**
| Field | Type | Source |
|---|---|---|
| `userTag` | string | `index.ts:160` |
| `arenaId` | string | `index.ts:161` |
| `outcome` | `'extract'` \| `'death'` | `index.ts:162` |
| `carriedChips` | number | `index.ts:163` |
| `kills` | number | `index.ts:164` |
| `durationSeconds` | number | `index.ts:165` |
| `killerTag` | string? | `index.ts:166` |
| `score` | number? | `index.ts:167` |
| `bankedAmount` | number? | `index.ts:168` |

**Response from `/api/match/result` (`MatchResultResponse`):**
| Field | Type | Source |
|---|---|---|
| `player` | unknown? | `index.ts:117` |
| `chipsEarned` | number? | `index.ts:118` |
| `chipsLost` | number? | `index.ts:119` |
| `xpGained` | number? | `index.ts:120` |
| `newLevel` | number? | `index.ts:121` |
| `newBankedChips` | number? | `index.ts:122` |

### 14.4 Client Notification
- On death: emit `death` first, then `match_result` (order matters for client-side handler) (`index.ts:357-371`)
[CODE COMMENT] `index.ts:357-360`: "Emit death BEFORE match_result so the client's onDeath handler runs first (sets up post-death replay recording). If match_result arrived first it would set matchEndedRef=true and cause onDeath to bail via its idempotency guard."

---

## 15. Bot AI

### 15.1 Bot Types
| Type | `BotPersonality` Values | Source |
|---|---|---|
| 5 personalities | `'scavenger'` \| `'opportunist'` \| `'hunter'` \| `'extractor'` \| `'coward'` | `game-state.ts:127` |
| Bot states | `'harvesting'` \| `'selfDestruct'` | `game-state.ts:108` |

### 15.2 Bot Spawning (`spawnBot()`) `game-state.ts:305-343`
- Id format: `bot-{arenaId}-{botIdCounter++}`
- Name: `BOT_NAMES[idx % 20]` (+ suffix if idx >= 20)
- Skin: `BOT_SKINS[idx % 6]` (6 color pairs)
- Personality: cycles through all 5 in order
- Spawned at safe point within `baseRadius - 200`
- `carriedChips` = 0 (bots never carry chips from buy-in)
- `score` = `cfg.initialSpawnScore` (20)
- `botState` = `'harvesting'`
- `nextThinkAt` = 0 (think immediately)
- `wantsBoost` = false

### 15.3 Bot Names (20)
`ViperStrike`, `NeonFang`, `CyberCobra`, `ToxicPython`, `ShadowAdder`, `ChronoKrait`, `QuantumMamba`, `AeroBoa`, `SavageSerpent`, `GlitchViper`, `ApexPredator`, `GhostScale`, `MatrixAsp`, `Synthetix`, `StaticFang`, `VectorVenom`, `OmegaSlink`, `BetaByte`, `RattleTech`, `HoloHydra`

### 15.4 Bot Skins (6)
| # | Color | Secondary | Source |
|---|---|---|---|
| 0 | `#22c55e` | `#15803d` | `game-config.ts:372` |
| 1 | `#a855f7` | `#6b21a8` | `game-config.ts:373` |
| 2 | `#06b6d4` | `#0891b2` | `game-config.ts:374` |
| 3 | `#ec4899` | `#8b5cf6` | `game-config.ts:375` |
| 4 | `#f59e0b` | `#b45309` | `game-config.ts:376` |
| 5 | `#ef4444` | `#991b1b` | `game-config.ts:377` |

### 15.5 Bot Count
- Each arena tier has `botsCount` = `30` bots (`game-config.ts:22`)
- `ensureBots()` maintains this count (`game-state.ts:346-351`)
- Dead bots are immediately replaced to maintain count (`index.ts:549-557`)

### 15.6 Bot Think Intervals
| Personality | Think Interval (ms) | Source |
|---|---|---|
| `coward` | `80` | `game-state.ts:613` |
| `hunter` | `100` | `game-state.ts:614` |
| `extractor` | `90` | `game-state.ts:615` |
| `scavenger` | `130 + random(0..80)` = 130–210 | `game-state.ts:616` |
| `opportunist` | `130 + random(0..80)` = 130–210 | `game-state.ts:616` |

### 15.7 Bot Scanning
- Food scan: `room.grid.queryRadius(head.x, head.y, cfg.botFoodScanRadius)` = 300px (`game-state.ts:625`)
- Body threat scan: `room.grid.queryRadius(head.x, head.y, 150)` = 150px (`game-state.ts:663`)
- Nearest human player: full scan of all `room.players` (`game-state.ts:644-657`)
- Hunter prey scan: all bots within 600px, only smaller (`game-state.ts:673-681`)

### 15.8 Bot Evade Radius Multipliers
| Personality | Evade Multiplier | Effective Radius | Source |
|---|---|---|---|
| `coward` | `2×` | 600px | `game-state.ts:683` |
| `hunter` | `0.6×` | 180px | `game-state.ts:684` |
| `extractor` | `0.8×` | 240px | `game-state.ts:685` |
| `scavenger` | `1×` | 300px | `game-state.ts:686` |
| `opportunist` | `1×` | 300px | `game-state.ts:686` |

### 15.9 Personality Behaviors

**Self-Destruct State** (all personalities behave the same, `game-state.ts:587-608`):
- Navigate toward nearest wall: angle = `atan2(head.y - centerY, head.x - centerX)`
- `wantsBoost = false` (NEVER boost during self-destruct)
- Think interval: 120ms
- If food within 120px, slightly veer toward it (turn 0.03 rad toward food)

**Scavenger** (`game-state.ts:694-721`):
- Prefers edge: if `distFromCenter < mapRadius * 0.6`, move toward edge
- Priority 1: Body threat < 120px → flee
- Priority 2: Player within `evadeRadius × 1.2` (360px) → evade with ±0.6 jitter
- Priority 3: Too close to center → move toward edge with ±0.3 jitter
- Priority 4: Food (only if no players within evadeRadius) → seek
- Priority 5: Wander near edges with ±0.3 jitter

**Opportunist** (`game-state.ts:727-755`):
- Confident when `bot.size > nearPlayerSize && nearPlayerDist < 400`
- Priority 1: Body threat < 140px → flee
- Priority 2: Confident + 60% random → chase smaller player
- Priority 3: Larger player within evadeRadius → perpendicular evasion (predict future position at 8 ticks)
- Priority 4: Seek food
- Priority 5: Wander with ±0.4 jitter

**Hunter** (`game-state.ts:761-788`):
- Boosts toward prey/bot/food when conditions met
- Priority 1: Body threat < 120px → flee
- Priority 2: Smaller bot prey < 400px → chase (boost if < 300px and body > 8 segments)
- Priority 3: Smaller human < 500px → chase (boost if < 350px and body > 8 segments)
- Priority 4: Food → seek (boost if < 200px and body > 8 segments)
- Priority 5: Wander toward center with ±0.3 jitter

**Extractor** (`game-state.ts:794-814`):
- Priority 1: Body threat < 130px → flee
- Priority 2: Player within `evadeRadius × 0.8` (240px) → flee
- Priority 3: Food → seek (boost if value >= 3 and < 250px and body > 8 segments)
- Priority 4: Move toward center with ±0.2 jitter

**Coward** (`game-state.ts:820-841`):
- Priority 1: Body threat < 160px → PANIC (flee + ±0.8 erratic jitter)
- Priority 2: Player within evadeRadius (600px) → flee with random zigzag (±0.5–1.0)
- Priority 3: Food only if `nearPlayerDist > evadeRadius × 1.5` (900px)
- Priority 4: Nervous wander with ±0.6 jitter

### 15.10 Bot Edge Avoidance (`game-state.ts:848-853`)
- If `distFromCenter > mapRadius - 300`:
  - Turn toward center with `MAX_TURN_PER_TICK × 2` (0.44 rad) max step

### 15.11 Bot Self-Destruct Trigger
- If `bot.score >= cfg.botSelfDestructThreshold` (100) AND `botState === 'harvesting'`:
  - Set `botState = 'selfDestruct'` (`game-state.ts:859-861`)

### 15.12 Bot Boosting
- Only `hunter` and `extractor` personalities can boost (`game-state.ts:612`)
- Final boost condition: `shouldBoost && bot.points.length > cfg.boostMinLength` (`game-state.ts:864`)

### 15.13 Bot Displacement
- `displaceBotForPlayer()`: picks random `harvesting` bot, sets `botState = 'selfDestruct'`, disables boost
- Purpose: make room for new human player (`game-state.ts:483-491`)

---

## 16. Spatial Hash Grid

### 16.1 `SpatialHashGrid` Class (`spatial-grid.ts`)

| Property | Value | Source |
|---|---|---|
| Default cellSize | `120` px | `spatial-grid.ts:52` |
| Grid storage | `Map<string, Map<string, GridItem>>` (cellKey → itemId → item) | `spatial-grid.ts:45` |
| Cell key format | `"{cx}:{cy}"` (integer coordinates) | `spatial-grid.ts:56-58` |

[CODE COMMENT] `spatial-grid.ts:3-10`: "The OLD server ran an O(n²×m) nested loop every tick (every snake head vs every other snake's every body segment) which produced ~220M ops/sec at peak. This grid gives O(1) cell lookups so a head-vs-world query touches only ~9–25 nearby items. The grid is cleared and rebuilt once per tick (cheap: ~1000 items/arena × constant cells each). Mid-tick mutations use the `value=0` sentinel for food instead of removing items, so we never mutate a Map while iterating it."

### 16.2 `GridItem` Interface
| Field | Type | Purpose | Source |
|---|---|---|
| `id` | string | Unique id (`snakeId:segIdx` or food id) | `spatial-grid.ts:17` |
| `kind` | `'segment'` \| `'food'` | Item type | `spatial-grid.ts:13,19` |
| `x` | number | Position X | `spatial-grid.ts:20` |
| `y` | number | Position Y | `spatial-grid.ts:21` |
| `radius` | number | Bounding radius | `spatial-grid.ts:22` |
| `snakeId` | string? | Owner (segments only) | `spatial-grid.ts:24` |
| `segIdx` | number? | Segment index (0 = head) | `spatial-grid.ts:26` |
| `value` | number? | Food value (0 = eaten sentinel) | `spatial-grid.ts:28` |
| `isStarChip` | boolean? | Star chip flag | `spatial-grid.ts:29` |
| `color` | string? | Color | `spatial-grid.ts:30` |
| `foodRef` | `{ value: number }?` | Reference to real food object | `spatial-grid.ts:34` |

### 16.3 Operations

**`clear()`** — empties all cells (`spatial-grid.ts:61-63`)

**`insert(item)`** — inserts item into every cell its bounding circle overlaps (`spatial-grid.ts:69-85`):
- `minCx = floor((x - radius) / cellSize)`
- `maxCx = floor((x + radius) / cellSize)`
- Same for Y
- Same item referenced from multiple cells (expected)

**`queryRadius(x, y, r)`** — returns `Map<string, GridItem>` of items in overlapping cells (`spatial-grid.ts:93-109`):
- Scans cells under query bounding box
- Deduplicates by item id
- Caller must do precise distance checks

### 16.4 Grid Population (per tick, `index.ts:410-443`)
1. Clear grid
2. Insert all snake body segments: id = `{snakeId}:{segIdx}`, kind = `'segment'`
3. Insert all food with value > 0: id = food id, kind = `'food'`, includes `foodRef`

---

## 17. Snapshot / Broadcast System

### 17.1 `buildSnapshot()` `game-state.ts:1085-1173`
- One snapshot per player per broadcast cycle (customized `yourRank`)
- Body points downsampled to `MAX_SNAPSHOT_POINTS` (60) if longer

**`GameSnapshot` fields:**
| Field | Type | Source |
|---|---|---|
| `arenaId` | string | `game-state.ts:1158` |
| `tick` | number | `game-state.ts:1159` |
| `snakes` | `SnakeSnapshot[]` | `game-state.ts:1160` |
| `foods` | `FoodSnapshot[]` | `game-state.ts:1161` |
| `worldSize` | number (8000) | `game-state.ts:1162` |
| `mapRadius` | number (current breathing radius) | `game-state.ts:1163` |
| `mapCenterX` | number | `game-state.ts:1164` |
| `mapCenterY` | number | `game-state.ts:1165` |
| `leaderId` | string? | `game-state.ts:1166` |
| `leaderChips` | number | `game-state.ts:1167` |
| `realPlayerCount` | number | `game-state.ts:1168` |
| `yourRank` | number (0 if not found) | `game-state.ts:1169` |
| `arenaLeaderboard` | `ArenaLeaderboardEntry[]` (top 10) | `game-state.ts:1170` |
| `commissionRate` | number | `game-state.ts:1171` |

### 17.2 `SnakeSnapshot` fields (per-snake in snapshot)
| Field | Type | Source |
|---|---|---|
| `id` | string | `game-state.ts:1103` |
| `name` | string | `game-state.ts:1104` |
| `userTag` | string? | `game-state.ts:1105` |
| `points` | `Vec2[]` (downsampled to max 60) | `game-state.ts:1106` |
| `angle` | number | `game-state.ts:1107` |
| `size` | number | `game-state.ts:1108` |
| `color` | string | `game-state.ts:1109` |
| `secondaryColor` | string? | `game-state.ts:1110` |
| `isPlayer` | boolean | `game-state.ts:1111` |
| `isBot` | boolean | `game-state.ts:1112` |
| `carriedChips` | number (floored) | `game-state.ts:1113` |
| `score` | number | `game-state.ts:1114` |
| `isExtracting` | boolean | `game-state.ts:1115` |
| `extractionProgress` | number (0..1) | `game-state.ts:1116` |
| `isDead` | boolean | `game-state.ts:1117` |
| `spawnProtected` | boolean | `game-state.ts:1118` |
| `chatMessage` | string? | `game-state.ts:1119` |
| `country` | string? | `game-state.ts:1120` |
| `isBoosting` | boolean | `game-state.ts:1121` |
| `botState` | string? | `game-state.ts:1122` |
| `visualRadius` | number | `game-state.ts:1123` |
| `collisionRadius` | number | `game-state.ts:1124` |

### 17.3 Arena Leaderboard
- Sorted by `carriedChips` descending, real players only (non-dead, non-settling)
- Top 10 entries
- Each entry: `id`, `name`, `userTag`, `carriedChips` (floored), `score`, `kills`, `isPlayer` (true for viewer), `country`
- `yourRank` = 1-based index of viewer in sorted list (0 if not found)

### 17.4 Leader Recomputation (`recomputeLeader()`) `game-state.ts:1178-1189`
- Scans ALL snakes (players + bots)
- Highest `carriedChips` wins
- `carriedChips` is floored for display

---

## 18. Safe Spawn System

### 18.1 `findSafeSpawnPoint()` `game-state.ts:234-265`
- Attempts: `spawnSafeAttempts` (30) iterations
- Spawn radius: `baseRadius - 200` (200px inside boundary for players, same for bots)
- Must be at least `spawnBoundaryMargin` (500px) inside boundary
- Must be at least `spawnSafeDistance` (500px) from all existing snake heads
- Falls back to random point if no safe spot found

### 18.2 `randomSpawnPoint()` `game-state.ts:224-228`
- Uniform random in disc: `sqrt(random()) * maxR * 0.85` at random angle
- The 0.85 factor prevents spawning at the very edge

### 18.3 `initialBody()` `game-state.ts:271-280`
- `length` points along reverse of angle direction
- Point i at: `{ x: headX - cos(angle) × i × spacing, y: headY - sin(angle) × i × spacing }`

---

## 19. Chat System

### 19.1 Sending (`handleChat()`) `index.ts:932-959`
- Must be in a match with valid identity
- Message trimmed and sliced to 80 chars
- Rate limited: 2 second cooldown
- Sets `session.chatMessage` and `session.chatExpiry = now + 4000` (4s visible)
- Broadcast `chat` event to all players in room (not bots)

### 19.2 Expiry (`expireChat()`) `game-state.ts:1204-1211`
- Every tick: if `now > chatExpiry`, clear `chatMessage` and `chatExpiry`

---

## 20. Score / XP / Chip Calculations

### 20.1 Score Model
[CODE COMMENT] `game-state.ts:6`: "Score model: INITIAL_SPAWN_SCORE(20) + food collected"
- `score` starts at 20, increases by food value (1, 3, or 5)
- Score determines body length and visual size
- Score is separate from `carriedChips`

### 20.2 Carried Chips
[CODE COMMENT] `game-state.ts:91`: "Chips carried in-match (ONLY from star chips). Lost on death, banked on extract."
- Players start with `carriedChips = arena.buyIn`
- Only star chips add to `carriedChips`
- Regular food does NOT affect `carriedChips`

### 20.3 Commission
- ≤3 real players: 0% commission
- ≥4 real players: 35% commission
- Applied only on extraction
- Formula: `commission = floor(carriedChips × rate)`, `banked = carriedChips - commission`

### 20.4 XP (Computed by Next.js, returned in result)
- From `types.ts:64`: `floor((score × 5 + kills × 50) × rewardMultiplier)` — only on extract
- Level formula: `xpForLevel(level) = level × 200` (`game-config.ts:355-357`)
- `levelFromXp(xp) = max(1, floor(xp / 200) + 1)` (`game-config.ts:358-360`)

---

## 21. Arena Tiers

30 competitive tiers defined in `ARENA_TIERS` array (`game-config.ts:25`). All have `botsCount: 30`.

Buy-in range: 10 to 1,000,000,000 chips.
Difficulty groups:
- Beginner (tiers 1–6): buy-in 10–300
- Medium (tiers 7–12): buy-in 500–5,000
- High Stakes (tiers 13–18): buy-in 10,000–100,000
- Extreme (tiers 19–24): buy-in 200,000–10,000,000
- Legendary (tiers 25–30): buy-in 20,000,000–1,000,000,000

Each tier has: `id`, `name`, `buyIn`, `description`, `difficulty`, `color` (tailwind), `accentColor` (hex), `borderAccent` (hex), `botsCount`, `rewardMultiplier`.

---

## 22. Join Flow (Complete Sequence)

1. Client sends `join_arena { arenaId }`
2. Server validates payload and arena exists
3. Checks not already in match (`join_error: 'already_in_match'`)
4. Calls `POST /api/match/join { userTag, arenaId }` to deduct buyIn
5. On `insufficient_chips`: `join_error: 'insufficient_chips'`
6. On `banned`: `join_error: 'banned'` + `kicked` + disconnect
7. Gets or creates arena room (with sharding)
8. Computes `baseRadius` from current real player count
9. Finds safe spawn point within `baseRadius - 200`
10. Creates `PlayerSession` with all initial values
11. Adds to `room.players` Map
12. Emits `joined { arenaId, worldSize: 8000, yourId }`

---

## 23. Logging

### 23.1 Log Format
- `[HH:MM:SS] [LEVEL] message`
- Levels: `'info'` (stdout), `'warn'` (stdout), `'error'` (stderr)
- Single sink — no `console.log` elsewhere (`index.ts:83-98`)

### 23.2 Logged Events
| Event | Level | Source |
|---|---|---|
| Arena shard created | info | `index.ts:260` |
| Player join | info | `index.ts:857` |
| Socket connect | info | `index.ts:705` |
| Socket disconnect | info | `index.ts:745` |
| Match settle (death/extract) | info | `index.ts:399` |
| Player death | info | `index.ts:543` |
| Post-death replay window expired | info | `index.ts:389` |
| Player leave | info | `index.ts:982` |
| Input flood | warn (every 20 drops) | `index.ts:884` |
| Bot tick error | error | `index.ts:452` |
| Player movement error | error | `index.ts:478` |
| Collision detection error | error | `index.ts:490` |
| eatFood error | error | `index.ts:563` |
| replenishFood error | error | `index.ts:571` |
| recomputeLeader error | error | `index.ts:595` |
| settleMatch error | error | `index.ts:546,587` |
| joinMatch fetch failed | error | `index.ts:784` |
| dropStarsAtDeath on leave error | error | `index.ts:975` |
| match/result HTTP error | error | `index.ts:183` |
| match/result fetch failed | error | `index.ts:188` |
| Verify fetch failed | warn | `index.ts:677` |
| Heartbeat | info (every 15s) | `index.ts:1033` |
| Server boot | info | `index.ts:1047,1053,1061` |
| CORS warning | warn | `index.ts:1046` |

---

## 24. XP / Level System (from game-config.ts)

| Constant | Value | Source |
|---|---|---|
| XP per level | `level × 200` | `game-config.ts:355` |
| Level from XP | `max(1, floor(xp / 200) + 1)` | `game-config.ts:358` |
| Daily rewards (7-day cycle) | `[10, 20, 50, 100, 250, 500, 1000]` | `game-config.ts:313` |
| Max yearly chip purchase | `2,500,000` (25 Lakh) | `game-config.ts:329` |
| Max daily ads | `12` | `game-config.ts:330` |
| Ad reward chips | `100` | `game-config.ts:331` |

---

## 25. All Design Intent Comments (verbatim)

| # | Comment | Location |
|---|---|---|
| 1 | "Server-authoritative multiplayer snake. The Next.js app (port 3000) talks to this server via the Caddy gateway using io(\"/?XTransformPort=3001\")." | `index.ts:4-5` |
| 2 | "Auth is mandatory — sockets without a valid JWT (verified via POST /api/match/verify) are disconnected at the middleware. No 'auth optional, admit anyway' path." | `index.ts:8-10` |
| 3 | "Identity is the verify response only. We never trust any subsequent client-supplied userTag/name/color/skin." | `index.ts:11-12` |
| 4 | "One socket per userTag — a new connection kicks the prior socket." | `index.ts:13` |
| 5 | "Movement is server-authoritative — clients send only `angle`; the server computes position. Teleport is impossible." | `index.ts:14-15` |
| 6 | "Buy-in is deducted atomically by /api/match/join (Next.js + Prisma transaction). We never touch the DB directly." | `index.ts:16-17` |
| 7 | "Match results are reported exactly once via /api/match/result, guarded by a `matchSettling` flag to prevent double-credit on disconnect races." | `index.ts:18-19` |
| 8 | "Recursive setTimeout (not setInterval) for both tick and broadcast loops — a slow tick can't overlap the next." | `index.ts:20-21` |
| 9 | "Every tick is wrapped in try/catch; one bad snake never kills the loop." | `index.ts:22` |
| 10 | "Spatial hash grid (see spatial-grid.ts) keeps collision detection near-linear instead of O(n²)." | `index.ts:23-24` |
| 11 | "Broadcasts happen at 20 Hz, not every tick, and snapshot points are downsampled to 60 to keep payloads small." | `index.ts:25-26` |
| 12 | "uncaughtException / unhandledRejection are logged, never fatal." | `index.ts:27` |
| 13 | "Graceful shutdown on SIGINT/SIGTERM broadcasts `server_shutdown` then exits." | `index.ts:28` |
| 14 | "Skip empty rooms (no players) for CPU savings — bots stay idle." | `index.ts:609` |
| 15 | "Forward gliding during extraction is allowed (natural movement). BUT any intentional steering (angle change > threshold) restarts extraction." | `index.ts:892-893` |
| 16 | "Emit death BEFORE match_result so the client's onDeath handler runs first (sets up post-death replay recording)." | `index.ts:357-360` |
| 17 | "For death: keep the player in the room for 16 s so the broadcast loop continues sending snapshots. The client records 15 s of post-death frames (300 frames at 20 Hz) for the replay." | `index.ts:373-377` |
| 18 | "Process-level guards (the OLD server had none → one bad write killed it)" | `index.ts:986` |
| 19 | "Pre-create all online arenas so bots are ready when the first player joins." | `index.ts:1049` |
| 20 | "CORS is open (origin: *) — OK for dev (Caddy restricts in prod)" | `index.ts:1046` |
| 21 | "Three food orb sizes (Small=1pt, Medium=3pt, Large=5pt)" | `game-state.ts:5` |
| 22 | "Score model: INITIAL_SPAWN_SCORE(20) + food collected" | `game-state.ts:6` |
| 23 | "Star drops: ALWAYS exactly 10 per player death" | `game-state.ts:7` |
| 24 | "Death food: exact sum matching snake's total score" | `game-state.ts:8` |
| 25 | "Head-on collision: mass + boost priority rules" | `game-state.ts:9` |
| 26 | "Bot AI: all bots evade humans, self-destruct at score >= 100 (online only)" | `game-state.ts:10` |
| 27 | "Dynamic map radius based on real player count" | `game-state.ts:11` |
| 28 | "Max turn rate per tick (radians) for bots." | `game-state.ts:177` |
| 29 | "Max points emitted in a snapshot — longer bodies are downsampled." | `game-state.ts:179` |
| 30 | "scavenger — cautious edge-dweller. Stays away from center & players. Only eats food far from danger. Won't chase anything." | `game-state.ts:566-567` |
| 31 | "opportunist — balanced. Eats food, evades players at medium range, occasionally chases smaller snakes if confident." | `game-state.ts:568-569` |
| 32 | "hunter — aggressive. Actively chases smaller snakes (head-on intimidation), seeks food aggressively, boosts to close gaps." | `game-state.ts:570-571` |
| 33 | "extractor — efficient food vacuum. Prioritizes dense food clusters, boosts toward high-value orbs. Less evasive (focused)." | `game-state.ts:572-573` |
| 34 | "coward — extremely skittish. Flees at 2× evade radius, erratic direction changes, never chases, fastest reaction time." | `game-state.ts:574-575` |
| 35 | "Star chips do NOT affect score — they only add to carried chips." | `game-state.ts:1057` |
| 36 | "Star chips: ONLY real players collect (bots skip)." | `game-state.ts:1054` |
| 37 | "Drop exactly 10 Star collectibles at the exact death position. Each star = carried chips ÷ 10 (floating point, all equal). Stars do NOT scatter — they appear at the death position. ONLY for real players. Bots never drop stars." | `game-state.ts:444-449` |
| 38 | "Force one bot into self-destruct state to make room for a new human player." | `game-state.ts:480` |
| 39 | "NEVER boost during self-destruct — go slowly" | `game-state.ts:490` |
| 40 | "Mid-tick mutations use the `value=0` sentinel for food instead of removing items, so we never mutate a Map while iterating it." | `spatial-grid.ts:9-10` |
| 41 | "~120px is a good trade-off for a 6000px world with snake sizes ~8–20 and food sizes ~5–10: most queries touch only the 3×3 block around the query point." | `spatial-grid.ts:48-50` |
| 42 | "Collision radius barely grows — max 1px extra even at 100k score. The gap between collision circles is what enables threading through tight spaces." | `snake-engine.ts:208-213` |
| 43 | "Server-authoritative: only desiredAngle from client." | `game-state.ts:502` |
| 44 | "Body/headOn collision: drop score orbs (ALL snakes, including selfDestruct bots) + 10 stars (real players only). Wall death: drop 0 food (score destroyed) + 10 stars (real players only). Bot selfDestruct WALL death: 0 food, 0 stars (vanish cleanly). Bot selfDestruct COLLISION death: STILL drops food (only wall death vanishes cleanly)." | `index.ts:494-497` |

---

07-core-libs.md
===
# 07 — Core Libraries: Exhaustive Catalog

**Task ID:** 7
**Source files:**
1. `/tmp/venom-arena/src/lib/types.ts` (141 lines)
2. `/tmp/venom-arena/src/lib/snake-engine.ts` (663 lines)
3. `/tmp/venom-arena/src/lib/game-audio.ts` (145 lines)
4. `/tmp/venom-arena/prisma/schema.prisma` (196 lines)

---

## A. `src/lib/types.ts` — Shared Player-Facing Types

File comment: `// Shared player-facing types (used by both client and API routes)`

### A1. `PlayerProfile` (interface, exported)

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | |
| `userTag` | `string` | |
| `name` | `string` | |
| `email` | `string \| null` | |
| `country` | `string` | |
| `avatar` | `string \| null` | |
| `role` | `'player' \| 'admin'` | Union literal |
| `bankedChips` | `number` | |
| `totalEarned` | `number` | |
| `totalLost` | `number` | |
| `level` | `number` | |
| `xp` | `number` | |
| `lifetimeKills` | `number` | |
| `lifetimeDeaths` | `number` | |
| `lifetimeExtracts` | `number` | |
| `bestStreak` | `number` | |
| `biggestExtract` | `number` | |
| `dailyStreak` | `number` | |
| `lastDailyClaim` | `string \| null` | |
| `unlockedSkins` | `string[]` | JSON array encoded in DB |
| `currentSkin` | `string` | |
| `currentTrail` | `string` | |
| `currentDeath` | `string` | |
| `currentFlag` | `string \| null` | |
| `currentBanner` | `string \| null` | |
| `clanTag` | `string \| null` | |
| `clanRank` | `string \| null` | |
| `securityPin` | `boolean` | Code comment: `// true if PIN is set` |
| `oauthProvider` | `string \| null` | Code comment: `// "google" \| "facebook" \| "apple" \| null` |
| `createdAt` | `string` | |
| `lastSeenAt` | `string` | |

**Total fields: 30**

---

### A2. `LeaderboardEntry` (interface, exported)

| Field | Type | Notes |
|-------|------|-------|
| `userTag` | `string` | |
| `name` | `string` | |
| `country` | `string` | |
| `bankedChips` | `number` | |
| `level` | `number` | |
| `rank` | `number` | |
| `isPlayer` | `boolean` | Optional (`?`) |

**Total fields: 7**

---

### A3. `MatchResult` (interface, exported)

| Field | Type | Notes |
|-------|------|-------|
| `outcome` | `'extract' \| 'death'` | Union literal |
| `arenaId` | `string` | |
| `arenaName` | `string` | |
| `chipsExtracted` | `number` | Comment: `// chips taken out (extract) or lost (death)` |
| `commission` | `number` | Comment: `// 35% commission on extract (0 if <=3 players)` |
| `bankedAmount` | `number` | Comment: `// actual chips banked after commission` |
| `kills` | `number` | |
| `score` | `number` | Comment: `// body-length score at end` |
| `deaths` | `number` | Comment: `// 0 or 1` |
| `xpGained` | `number` | Comment: `// XP: floor((score*5 + kills*50) * rewardMultiplier) — only on extract` |
| `newLevel` | `number` | |
| `newBankedChips` | `number` | |
| `durationSeconds` | `number` | |
| `killerName` | `string` | Optional (`?`) |
| `killerTag` | `string` | Optional (`?`) |
| `isOffline` | `boolean` | Optional (`?`). Comment: `// true if practice mode (no XP, no chips)` |

**Total fields: 15**

---

### A4. `SnakeSnapshot` (interface, exported)

Comment above: `// Snake (used in client rendering of server snapshots)`

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | |
| `name` | `string` | |
| `userTag` | `string` | Optional (`?`) |
| `points` | `{ x: number; y: number }[]` | Array of Vec2-like objects |
| `angle` | `number` | |
| `size` | `number` | |
| `color` | `string` | |
| `secondaryColor` | `string` | Optional (`?`) |
| `isPlayer` | `boolean` | |
| `isBot` | `boolean` | |
| `carriedChips` | `number` | |
| `score` | `number` | Comment: `// body length score (INITIAL_SPAWN_SCORE + all food collected)` |
| `isExtracting` | `boolean` | |
| `extractionProgress` | `number` | Comment: `// 0..1` |
| `isDead` | `boolean` | |
| `spawnProtected` | `boolean` | |
| `chatMessage` | `string` | Optional (`?`) |
| `country` | `string` | Optional (`?`) |
| `isBoosting` | `boolean` | Comment: `// whether snake is actively boosting (for head-on collision rendering)` |
| `botState` | `'harvesting' \| 'selfDestruct'` | Optional (`?`). Comment: `// online bots only; undefined for players` |
| `visualRadius` | `number` | Optional (`?`) |
| `collisionRadius` | `number` | Optional (`?`) |

**Total fields: 22**

---

### A5. `FoodSnapshot` (interface, exported)

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | |
| `x` | `number` | |
| `y` | `number` | |
| `size` | `number` | |
| `value` | `number` | |
| `isStarChip` | `boolean` | |
| `color` | `string` | |
| `glowColor` | `string` | Optional (`?`) |
| `orbSize` | `'small' \| 'medium' \| 'large'` | Optional (`?`). Comment: `// only for regular food orbs` |

**Total fields: 9**

---

### A6. `ArenaLeaderboardEntry` (interface, exported)

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | |
| `name` | `string` | |
| `userTag` | `string` | Optional (`?`) |
| `carriedChips` | `number` | |
| `score` | `number` | |
| `kills` | `number` | |
| `isPlayer` | `boolean` | |
| `country` | `string` | Optional (`?`) |

**Total fields: 8**

---

### A7. `GameSnapshot` (interface, exported)

| Field | Type | Notes |
|-------|------|-------|
| `arenaId` | `string` | |
| `tick` | `number` | |
| `snakes` | `SnakeSnapshot[]` | |
| `foods` | `FoodSnapshot[]` | |
| `worldSize` | `number` | |
| `mapRadius` | `number` | Comment: `// current dynamic map radius (online) or 0 (offline infinite)` |
| `mapCenterX` | `number` | Comment: `// center of the map` |
| `mapCenterY` | `number` | |
| `leaderId` | `string \| null` | |
| `leaderChips` | `number` | |
| `realPlayerCount` | `number` | JSDoc: `/** Number of real (human) players in the arena — bots excluded. */` |
| `yourRank` | `number` | JSDoc: `/** Your rank among real players (1 = highest chips). 0 if not in arena. */` |
| `arenaLeaderboard` | `ArenaLeaderboardEntry[]` | JSDoc: `/** Top 10 real players by carried chips, for the arena leaderboard HUD. */` |
| `commissionRate` | `number` | JSDoc: `/** Current commission rate (0 if <=3 players, 0.35 if >=4). */` |

**Total fields: 14**

---

### A8. Type Summary for `types.ts`

- **Total exported interfaces:** 7
- **Total exported types:** 0
- **Total exported enums:** 0
- **Union literals found:**
  - `'player' | 'admin'` (PlayerProfile.role)
  - `'extract' | 'death'` (MatchResult.outcome)
  - `'harvesting' | 'selfDestruct'` (SnakeSnapshot.botState)
  - `'small' | 'medium' | 'large'` (FoodSnapshot.orbSize)

---

---

## B. `src/lib/snake-engine.ts` — Pure Snake Logic Module

File header comment:
```
// ============================================================================
// snake-engine.ts — Pure snake logic module.
// ---------------------------------------------------------------------------
// Shared between game-server (online) and offline-engine (practice).
// All values are driven by a config object (from DB / admin panel).
// ============================================================================
```

---

### B1. Types and Interfaces

#### B1a. `Vec2` (interface, exported)

| Field | Type |
|-------|------|
| `x` | `number` |
| `y` | `number` |

---

#### B1b. `SnakeConfig` (interface, exported)

JSDoc: `/** Config object — all tunable game parameters. Loaded from DB. */`

**Snake Physics:**

| Field | Type | Comment |
|-------|------|---------|
| `collisionRadius` | `number` | `// hitbox radius for body segments` |
| `visualRadius` | `number` | `// render radius for body segments` |
| `segmentSpacing` | `number` | `// center-to-center distance between segments` |
| `baseSpeed` | `number` | `// normal move speed (px/tick)` |
| `boostSpeed` | `number` | `// speed while boosting` |
| `turnBase` | `number` | `// base turn rate (rad/tick)` |
| `turnMin` | `number` | `// minimum turn rate at high score` |
| `turnScoreFactor` | `number` | `// how much score reduces turn rate` |
| `initialBodyLength` | `number` | `// starting segments at spawn` |
| `initialSpawnScore` | `number` | `// starting score` |

**Growth:**

| Field | Type | Comment |
|-------|------|---------|
| `maxSegments` | `number` | `// hard cap on body length` |
| `lengthLogFactor` | `number` | `// controls length growth curve` |
| `maxExtraRadius` | `number` | `// max additional thickness beyond base visual` |
| `thicknessLogFactor` | `number` | `// controls thickness growth curve` |

**Boost:**

| Field | Type | Comment |
|-------|------|---------|
| `boostMinLength` | `number` | `// min segments to activate boost` |
| `boostDropInterval` | `number` | `// frames between tail drops while boosting` |

**Collision:**

| Field | Type | Comment |
|-------|------|---------|
| `hitFactor` | `number` | `// body collision multiplier (0-1)` |
| `headOnHitFactor` | `number` | `// head-on collision multiplier (0-1)` |
| `neckAngleThreshold` | `number` | `// angle threshold for neck protection (degrees)` |
| `neckSegmentCount` | `number` | `// number of neck segments to check` |

**Food:**

| Field | Type | Comment |
|-------|------|---------|
| `foodSmallValue` | `number` | |
| `foodSmallRadius` | `number` | |
| `foodSmallWeight` | `number` | |
| `foodMediumValue` | `number` | |
| `foodMediumRadius` | `number` | |
| `foodMediumWeight` | `number` | |
| `foodLargeValue` | `number` | |
| `foodLargeRadius` | `number` | |
| `foodLargeWeight` | `number` | |
| `foodCountTarget` | `number` | |
| `starDropCount` | `number` | |

**Extraction:**

| Field | Type | Comment |
|-------|------|---------|
| `extractionDurationMs` | `number` | |
| `extractionGlideSpeed` | `number` | |

**Spawning:**

| Field | Type | Comment |
|-------|------|---------|
| `spawnSafeDistance` | `number` | |
| `spawnBoundaryMargin` | `number` | |
| `spawnSafeAttempts` | `number` | |
| `spawnProtectionMs` | `number` | |

**Map:**

| Field | Type | Comment |
|-------|------|---------|
| `mapMinRadius` | `number` | |
| `mapMaxRadius` | `number` | |
| `mapBreathAmplitude` | `number` | |
| `mapBreathCycleMs` | `number` | |

**Bots:**

| Field | Type | Comment |
|-------|------|---------|
| `botSelfDestructThreshold` | `number` | |
| `botEvadeRadius` | `number` | |
| `botFoodScanRadius` | `number` | |

**Economy:**

| Field | Type | Comment |
|-------|------|---------|
| `commissionThreshold` | `number` | |
| `commissionRate` | `number` | |

**Total SnakeConfig fields: 38**

---

#### B1c. `SkinSegment` (interface, exported)

JSDoc: `/** Skin definition — a repeating pattern applied to body segments. */`

| Field | Type | Optional |
|-------|------|----------|
| `color` | `string` | No |
| `glow` | `string` | Yes (`?`) |
| `glowRadius` | `number` | Yes (`?`) |

---

#### B1d. `SnakeSkin` (interface, exported)

| Field | Type | Comment |
|-------|------|---------|
| `id` | `string` | |
| `name` | `string` | |
| `body` | `SkinSegment[]` | `// repeating pattern` |
| `headColor` | `string` | `// head always uses this` |
| `headEyeColor` | `string` | Optional (`?`) |

---

#### B1e. `SnakeMetrics` (interface, exported)

JSDoc: `/** Computed visual properties for a snake at a given score. */`

| Field | Type | Comment |
|-------|------|---------|
| `bodyLength` | `number` | `// total segments` |
| `visualRadius` | `number` | `// render radius per segment` |
| `collisionRadius` | `number` | `// hitbox radius per segment` |
| `turnRate` | `number` | `// current turn rate (rad/tick)` |
| `speed` | `number` | `// current speed (px/tick)` |

---

#### B1f. `FoodOrbDef` (interface, exported)

| Field | Type |
|-------|------|
| `size` | `'small' \| 'medium' \| 'large'` |
| `value` | `number` |
| `radius` | `number` |
| `weight` | `number` |
| `color` | `string` |
| `glowColor` | `string` |

---

### B2. `DEFAULT_SNAKE_CONFIG` — Constant Object (exported)

Comment: `// Default config — used as fallback if DB is not available.`
Comment: `// Matches the seed values in game-config-db.ts.`

| Key | Value | Category |
|-----|-------|----------|
| `collisionRadius` | `6` | Snake physics |
| `visualRadius` | `8` | Snake physics |
| `segmentSpacing` | `16` | Snake physics |
| `baseSpeed` | `4.5` | Snake physics |
| `boostSpeed` | `8.0` | Snake physics |
| `turnBase` | `0.35` | Snake physics |
| `turnMin` | `0.08` | Snake physics |
| `turnScoreFactor` | `0.0003` | Snake physics |
| `initialBodyLength` | `20` | Snake physics |
| `initialSpawnScore` | `20` | Snake physics |
| `maxSegments` | `200` | Growth |
| `lengthLogFactor` | `20` | Growth |
| `maxExtraRadius` | `3` | Growth |
| `thicknessLogFactor` | `0.5` | Growth |
| `boostMinLength` | `8` | Boost |
| `boostDropInterval` | `10` | Boost |
| `hitFactor` | `0.75` | Collision |
| `headOnHitFactor` | `0.8` | Collision |
| `neckAngleThreshold` | `60` | Collision (degrees) |
| `neckSegmentCount` | `5` | Collision |
| `foodSmallValue` | `1` | Food |
| `foodSmallRadius` | `3` | Food |
| `foodSmallWeight` | `0.93` | Food |
| `foodMediumValue` | `3` | Food |
| `foodMediumRadius` | `5` | Food |
| `foodMediumWeight` | `0.04` | Food |
| `foodLargeValue` | `5` | Food |
| `foodLargeRadius` | `8` | Food |
| `foodLargeWeight` | `0.03` | Food |
| `foodCountTarget` | `1200` | Food |
| `starDropCount` | `10` | Food |
| `extractionDurationMs` | `3000` | Extraction |
| `extractionGlideSpeed` | `3.2` | Extraction |
| `spawnSafeDistance` | `500` | Spawning |
| `spawnBoundaryMargin` | `500` | Spawning |
| `spawnSafeAttempts` | `30` | Spawning |
| `spawnProtectionMs` | `4000` | Spawning |
| `mapMinRadius` | `3000` | Map |
| `mapMaxRadius` | `16000` | Map |
| `mapBreathAmplitude` | `40` | Map |
| `mapBreathCycleMs` | `10000` | Map |
| `botSelfDestructThreshold` | `100` | Bots |
| `botEvadeRadius` | `300` | Bots |
| `botFoodScanRadius` | `300` | Bots |
| `commissionThreshold` | `4` | Economy |
| `commissionRate` | `0.35` | Economy |

**Total config keys: 43**

---

### B3. Growth Formulas — Diminishing Returns

#### B3a. `calcBodyLength(score, cfg)` → `number` (exported)

**Formula:** `initialLength + min(maxExtra, logFactor × ln(1 + score))`

Where:
- `base = cfg.initialBodyLength` (default `20`)
- `maxExtra = cfg.maxSegments - base` (default `200 - 20 = 180`)
- `growth = cfg.lengthLogFactor * Math.log(1 + score)` (default `20 * ln(1 + score)`)
- Result: `Math.min(cfg.maxSegments, Math.floor(base + Math.min(maxExtra, growth)))`

**Documented score-value examples:**
| Score | Segments |
|-------|----------|
| `0` | `20` |
| `100` | `~31` |
| `1,000` | `~38` |
| `10,000` | `~46` |
| `100,000` | `~53` |
| Hard cap | `maxSegments (200)` |

---

#### B3b. `calcVisualRadius(score, cfg)` → `number` (exported)

**Formula:** `baseVisualRadius + min(maxExtra, thicknessFactor × ln(1 + score))`

Where:
- `base = cfg.visualRadius` (default `8`)
- `growth = cfg.thicknessLogFactor * Math.log(1 + score)` (default `0.5 * ln(1 + score)`)
- Result: `base + Math.min(cfg.maxExtraRadius, growth)`

**Documented score-value examples:**
| Score | Visual Radius |
|-------|--------------|
| `0` | `8px` |
| `1,000` | `~8.35px` |
| `10,000` | `~8.69px` |
| `100,000` | `~9.04px` |
| Hard cap | `baseVisualRadius + maxExtraRadius (8 + 3 = 11px)` |

---

#### B3c. `calcCollisionRadius(score, cfg)` → `number` (exported)

**Formula:** `cfg.collisionRadius + min(1, 0.1 × ln(1 + score))`

Comment: `// Collision radius barely grows — max 1px extra even at 100k score`
- The hardcoded `0.1` multiplier is NOT in the config; it is a fixed constant in the code.
- Max additional: `1` (hardcoded, not configurable).

**Design intent (verbatim comment):**
> At any score, collision radius stays between baseCollision and baseCollision + 1px.
> The gap between collision circles is what enables threading through tight spaces.

---

#### B3d. `calcTurnRate(score, cfg)` → `number` (exported)

**Formula:** `max(turnMin, turnBase - turnScoreFactor × score)`

Where (defaults):
- `turnMin = 0.08` (rad/tick)
- `turnBase = 0.35` (rad/tick)
- `turnScoreFactor = 0.0003`

Comment: `// Higher score = slower turning (heavier snake).`

---

#### B3e. `calcSpeed(isBoosting, isExtracting, cfg)` → `number` (exported)

**Logic (priority order):**
1. If `isExtracting` → return `cfg.extractionGlideSpeed` (default `3.2`)
2. If `isBoosting` → return `cfg.boostSpeed` (default `8.0`)
3. Otherwise → return `cfg.baseSpeed` (default `4.5`)

---

#### B3f. `calcSnakeMetrics(score, isBoosting, isExtracting, cfg)` → `SnakeMetrics` (exported)

**Returns object with:**
- `bodyLength`: from `calcBodyLength`
- `visualRadius`: from `calcVisualRadius`
- `collisionRadius`: from `calcCollisionRadius`
- `turnRate`: from `calcTurnRate`
- `speed`: from `calcSpeed`

---

### B4. Movement Functions

#### B4a. `turnToward(current, desired, maxStep)` → `number` (exported)

**Purpose:** Turn toward desired angle with max step per tick. Handles angle wrapping.

**Logic:**
1. `diff = desired - current`
2. Normalize diff to `[-π, π]` via `while (diff > π) diff -= 2π` and `while (diff < -π) diff += 2π`
3. If `Math.abs(diff) <= maxStep` → return `desired`
4. Otherwise → return `current + Math.sign(diff) * maxStep`

---

#### B4b. `moveHead(pos, angle, speed)` → `Vec2` (exported)

**Formula:**
- `x = pos.x + Math.cos(angle) * speed`
- `y = pos.y + Math.sin(angle) * speed`

---

### B5. Body Management Functions

#### B5a. `buildInitialPath(headX, headY, angle, segmentCount, spacing)` → `Vec2[]` (exported)

**Purpose:** Build initial body path. Stores FULL path history, not just segment positions.

**Logic:**
- `totalPathPoints = segmentCount * spacing + 1`
- For each `i` from `0` to `totalPathPoints - 1`:
  - `x = headX - Math.cos(angle) * i`
  - `y = headY - Math.sin(angle) * i`

**Design comments (verbatim):**
> CRITICAL: We store the FULL path history (not just segment positions).
> Segments are then sampled from this path at `spacing` intervals.
> This gives smooth curves and enables gap navigation.

---

#### B5b. `extendPath(path, newHead, oldHead, bodySegmentCount, spacing)` → `Vec2[]` (exported)

**Purpose:** Extend path history with new head position. Interpolates between old and new head.

**Logic:**
1. Calculate `dx = newHead.x - oldHead.x`, `dy = newHead.y - oldHead.y`
2. `dist = Math.hypot(dx, dy)`
3. `steps = Math.max(1, Math.ceil(dist))` — 1 step per pixel of movement
4. Interpolate `steps` new points: `t = i/steps`, position = `oldHead + (dx,dy) * t`
5. Prepend: `newPath = [...newPoints, ...path]`
6. Trim: `maxNeeded = bodySegmentCount * spacing + spacing + 10` (buffer of `spacing + 10`)
7. If `newPath.length > maxNeeded` → slice to `maxNeeded`

**Design comment (verbatim):**
> Each movement of `speed` px adds `speed` new points (1 per pixel of movement).

---

#### B5c. `sampleSegments(path, spacing, count)` → `Vec2[]` (exported)

**Purpose:** Sample segment positions from path. Every `spacing`-th point = one segment.

**Logic:**
- For each `i` from `0` to `count - 1`:
  - `pathIdx = i * spacing`
  - If `pathIdx < path.length` → use `path[pathIdx]`
  - Else if path is non-empty → clamp to `path[path.length - 1]`

**Design comment (verbatim):**
> This is what enables gap navigation: if spacing = 16 and collisionRadius = 6,
> there's a 4px gap between collision circles of adjacent segments.

---

### B6. Neck Protection

#### B6. `isNeckProtected(attackerAngle, attackerPos, bodySegment, segIndex, victimAngle, cfg)` → `boolean` (exported)

**Purpose:** Check if head-to-body collision should be blocked by neck protection.

**Parameters:**
| Param | Type |
|-------|------|
| `attackerAngle` | `number` (radians) |
| `attackerPos` | `Vec2` |
| `bodySegment` | `Vec2` |
| `segIndex` | `number` (0 = first behind head) |
| `victimAngle` | `number` (radians) |
| `cfg` | `SnakeConfig` |

**Returns:** `true` if collision should be BLOCKED (pass-through allowed).

**Logic:**
1. If `segIndex >= cfg.neckSegmentCount` → return `false` (only first N segments)
2. Calculate direction from attacker to body segment: `dx = bodySegment.x - attackerPos.x`, `dy = bodySegment.y - attackerPos.y`
3. `dist = Math.hypot(dx, dy)`
4. If `dist < 0.001` → return `false` (practically on top — always collide)
5. `angleToSeg = Math.atan2(dy, dx)`
6. `approachAngle = Math.abs(attackerAngle - angleToSeg)`, normalized to `[-π, π]`, then absolute
7. `approachDeg = (approachAngle * 180) / Math.PI`
8. `bodyAlign = Math.abs(attackerAngle - victimAngle)`, normalized, then absolute
9. `bodyAlignDeg = (bodyAlign * 180) / Math.PI`
10. `threshold = cfg.neckAngleThreshold` (default `60`)
11. Pass-through condition: `approachDeg > (90 - threshold) && bodyAlignDeg < threshold`

**Design comments (verbatim):**
> - 0° = heading straight at the segment (head-on) → should COLLIDE
> - 90° = passing perpendicular to the segment → should PASS
> Two conditions for pass-through:
> 1. Approach angle is shallow (attacker isn't heading AT the segment) AND body alignment is close to parallel
> OR
> 2. The attacker is moving nearly parallel to the victim's body direction (passing alongside, not crossing)

---

### B7. Skin System

#### B7a. `DEFAULT_SKIN` — Constant Object (exported)

Comment: `/** Default snake skin. */`

| Key | Value |
|-----|-------|
| `id` | `'skin-default'` |
| `name` | `'Default Viper'` |
| `body` | `[{ color: '#22c55e' }]` (comment: `// green-500`) |
| `headColor` | `'#16a34a'` (comment: `// green-600`) |
| `headEyeColor` | `'#ffffff'` |

---

#### B7b. `getSegmentStyle(segIndex, skin)` → `SkinSegment` (exported)

**Logic:**
- If `skin.body.length === 0` → return `{ color: '#22c55e' }` (fallback)
- Otherwise → return `skin.body[segIndex % skin.body.length]` (repeating pattern via modulo)

---

### B8. Collision Helpers

#### B8a. `dist(a, b)` → `number` (exported)

Comment: `/** Distance between two points. */`
- Returns `Math.hypot(a.x - b.x, a.y - b.y)`

---

#### B8b. `circlesOverlap(ax, ay, ar, bx, by, br, hitFactor = 1.0)` → `boolean` (exported)

Comment: `/** Check if two circles overlap. Uses the collision hit factor to make hitboxes slightly smaller than visual. */`

**Logic:**
- `effectiveR1 = ar * hitFactor`
- `effectiveR2 = br * hitFactor`
- `d = Math.hypot(ax - bx, ay - by)`
- Returns `d < effectiveR1 + effectiveR2` (strictly less than, not ≤)

---

#### B8c. `pointInCircle(px, py, cx, cy, radius)` → `boolean` (exported)

Comment: `/** Check if a point is inside a circle. */`
- Returns `Math.hypot(px - cx, py - cy) < radius` (strictly less than)

---

### B9. Food System

#### B9a. `getFoodOrbs(cfg)` → `FoodOrbDef[]` (exported)

**Returns array of 3 objects:**

| Index | `size` | `value` (from cfg) | `radius` (from cfg) | `weight` (from cfg) | `color` | `glowColor` |
|-------|--------|--------------------|---------------------|---------------------|--------|------------|
| 0 | `'small'` | `cfg.foodSmallValue` | `cfg.foodSmallRadius` | `cfg.foodSmallWeight` | `'#34d399'` | `'#10b981'` |
| 1 | `'medium'` | `cfg.foodMediumValue` | `cfg.foodMediumRadius` | `cfg.foodMediumWeight` | `'#38bdf8'` | `'#0ea5e9'` |
| 2 | `'large'` | `cfg.foodLargeValue` | `cfg.foodLargeRadius` | `cfg.foodLargeWeight` | `'#f472b6'` | `'#ec4899'` |

**Default values resolved from config:**
| Size | Value | Radius | Weight |
|------|-------|--------|--------|
| small | `1` | `3` | `0.93` |
| medium | `3` | `5` | `0.04` |
| large | `5` | `8` | `0.03` |

---

#### B9b. `randomFoodOrb(orbs)` → `FoodOrbDef` (exported)

**Logic:**
1. `totalWeight = orbs.reduce((sum, o) => sum + o.weight, 0)`
2. `r = Math.random() * totalWeight`
3. Iterate: `r -= orb.weight`; if `r <= 0` → return that orb
4. Fallback: return `orbs[orbs.length - 1]`

---

### B10. Death Food Math

#### B10. `calcDeathFood(score, isWallDeath)` → `[number, number, number]` (exported)

**Returns:** `[smallCount, mediumCount, largeCount]`

**Logic:**
1. If `isWallDeath` → return `[0, 0, 0]` (no food drops on wall death)
2. `largeCount = Math.floor(score / 5)`
3. `remainder = score - largeCount * 5`
4. `mediumCount = Math.floor(remainder / 3)`
5. `smallCount = remainder - mediumCount * 3`

**Comment (verbatim):**
> Wall death = NO food drops.
> Otherwise: Large (score÷5), Medium (remainder÷3), Small (rest).

---

### B11. Star Chip Value

#### B11. `calcStarChipValues(carriedChips)` → `number[]` (exported)

**Logic:**
- `perStar = Math.floor(carriedChips / 10)`
- Returns `new Array(10).fill(perStar)` — exactly 10 elements, all equal

**Comment (verbatim):**
> 10 stars, each worth: carriedChips ÷ 10.

---

### B12. Map Breathing

#### B12a. `getBreathingMapRadius(baseRadius, elapsedMs, cfg)` → `number` (exported)

**Formula:** `baseRadius + Math.sin(cycle * Math.PI * 2) * cfg.mapBreathAmplitude`

Where: `cycle = (elapsedMs % cfg.mapBreathCycleMs) / cfg.mapBreathCycleMs`

Default behavior: radius oscillates ±40px over a 10,000ms cycle.

---

#### B12b. `calcBaseMapRadius(realPlayerCount, cfg)` → `number` (exported)

**Formula:** `cfg.mapMinRadius + (cfg.mapMaxRadius - cfg.mapMinRadius) * Math.sqrt((count - 1) / (maxP - 1))`

Where:
- `minP = 1` (hardcoded)
- `maxP = 1000` (hardcoded)
- `count = Math.max(1, Math.min(1000, realPlayerCount))`

Default behavior: `3000 + 13000 * sqrt((count-1)/999)`
- 1 player: `3000` (min)
- 1000 players: `16000` (max)
- Scaling: square root

---

### B13. Commission

#### B13. `calcCommissionRate(realPlayerCount, cfg)` → `number` (exported)

**Logic:**
1. If `realPlayerCount < cfg.commissionThreshold` → return `0`
2. Otherwise → return `cfg.commissionRate`

Default: `0` if <4 players, `0.35` if ≥4.

---

### B14. Utility

#### B14. `normalizeAngle(a)` → `number` (exported)

**Logic:** Normalize angle to `[-π, π]`:
- `while (a > Math.PI) a -= 2 * Math.PI`
- `while (a < -Math.PI) a += 2 * Math.PI`

---

### B15. Complete Function Index for `snake-engine.ts`

| # | Name | Exported | Parameters | Returns | Line |
|---|------|----------|------------|---------|------|
| 1 | `calcBodyLength` | Yes | `(score: number, cfg: SnakeConfig)` | `number` | 181 |
| 2 | `calcVisualRadius` | Yes | `(score: number, cfg: SnakeConfig)` | `number` | 200 |
| 3 | `calcCollisionRadius` | Yes | `(score: number, cfg: SnakeConfig)` | `number` | 214 |
| 4 | `calcTurnRate` | Yes | `(score: number, cfg: SnakeConfig)` | `number` | 226 |
| 5 | `calcSpeed` | Yes | `(isBoosting: boolean, isExtracting: boolean, cfg: SnakeConfig)` | `number` | 233 |
| 6 | `calcSnakeMetrics` | Yes | `(score: number, isBoosting: boolean, isExtracting: boolean, cfg: SnakeConfig)` | `SnakeMetrics` | 242 |
| 7 | `turnToward` | Yes | `(current: number, desired: number, maxStep: number)` | `number` | 265 |
| 8 | `moveHead` | Yes | `(pos: Vec2, angle: number, speed: number)` | `Vec2` | 276 |
| 9 | `buildInitialPath` | Yes | `(headX: number, headY: number, angle: number, segmentCount: number, spacing: number)` | `Vec2[]` | 295 |
| 10 | `extendPath` | Yes | `(path: Vec2[], newHead: Vec2, oldHead: Vec2, bodySegmentCount: number, spacing: number)` | `Vec2[]` | 324 |
| 11 | `sampleSegments` | Yes | `(path: Vec2[], spacing: number, count: number)` | `Vec2[]` | 367 |
| 12 | `isNeckProtected` | Yes | `(attackerAngle: number, attackerPos: Vec2, bodySegment: Vec2, segIndex: number, victimAngle: number, cfg: SnakeConfig)` | `boolean` | 402 |
| 13 | `getSegmentStyle` | Yes | `(segIndex: number, skin: SnakeSkin)` | `SkinSegment` | 478 |
| 14 | `dist` | Yes | `(a: Vec2, b: Vec2)` | `number` | 491 |
| 15 | `circlesOverlap` | Yes | `(ax, ay, ar, bx, by, br, hitFactor = 1.0)` | `boolean` | 499 |
| 16 | `pointInCircle` | Yes | `(px, py, cx, cy, radius)` | `boolean` | 513 |
| 17 | `getFoodOrbs` | Yes | `(cfg: SnakeConfig)` | `FoodOrbDef[]` | 535 |
| 18 | `randomFoodOrb` | Yes | `(orbs: FoodOrbDef[])` | `FoodOrbDef` | 565 |
| 19 | `calcDeathFood` | Yes | `(score: number, isWallDeath: boolean)` | `[number, number, number]` | 586 |
| 20 | `calcStarChipValues` | Yes | `(carriedChips: number)` | `number[]` | 608 |
| 21 | `getBreathingMapRadius` | Yes | `(baseRadius: number, elapsedMs: number, cfg: SnakeConfig)` | `number` | 620 |
| 22 | `calcBaseMapRadius` | Yes | `(realPlayerCount: number, cfg: SnakeConfig)` | `number` | 632 |
| 23 | `calcCommissionRate` | Yes | `(realPlayerCount: number, cfg: SnakeConfig)` | `number` | 650 |
| 24 | `normalizeAngle` | Yes | `(a: number)` | `number` | 659 |

**Total exported functions: 24**

---

---

## C. `src/lib/game-audio.ts` — Procedural Game Audio

File JSDoc comment:
```
/**
 * Venom Arena — procedural game audio using Web Audio API.
 *
 * All sounds are synthesized at runtime — no audio files needed.
 * Sounds are short and non-intrusive, designed for competitive gameplay.
 */
```

### C1. Module State

| Variable | Type | Initial Value | Access |
|----------|------|---------------|--------|
| `audioCtx` | `AudioContext \| null` | `null` | Module-private |
| `muted` | `boolean` | `false` | Module-private |

---

### C2. Internal Helper Functions (not exported)

#### C2a. `getCtx()` → `AudioContext`

**Logic:**
1. If `!audioCtx` → `audioCtx = new AudioContext()`
2. If `audioCtx.state === 'suspended'` → `audioCtx.resume()`
3. Return `audioCtx`

---

#### C2b. `playTone(freq, duration, type = 'sine', volume = 0.08, detune = 0)` → `void`

**Parameters:**
| Param | Type | Default | Notes |
|-------|------|---------|-------|
| `freq` | `number` | (required) | Frequency in Hz |
| `duration` | `number` | (required) | Duration in seconds |
| `type` | `OscillatorType` | `'sine'` | Wave type |
| `volume` | `number` | `0.08` | Starting gain |
| `detune` | `number` | `0` | Detune in cents |

**Audio graph:**
1. Create `OscillatorNode` → set `type`, `frequency.value = freq`, `detune.value = detune`
2. Create `GainNode` → `setValueAtTime(volume, ctx.currentTime)`, `exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)`
3. Connect: `osc → gain → destination`
4. Start at `ctx.currentTime`, stop at `ctx.currentTime + duration`
5. Wrapped in `try/catch` — silently fails
6. If `muted` → early return

---

#### C2c. `playNoise(duration, volume = 0.06)` → `void`

**Parameters:**
| Param | Type | Default |
|-------|------|--------|
| `duration` | `number` | (required) |
| `volume` | `number` | `0.06` |

**Audio graph:**
1. `bufferSize = Math.floor(ctx.sampleRate * duration)`
2. Create mono buffer of that size
3. Fill with white noise: `data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2)` (quadratic decay envelope)
4. Create `BufferSourceNode` → set buffer
5. Create `GainNode` → `setValueAtTime(volume, ctx.currentTime)`, `exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)`
6. Connect: `source → gain → destination`
7. Start at `ctx.currentTime`
8. Wrapped in `try/catch` — silently fails
9. If `muted` → early return

---

### C3. Exported Control Functions

#### C3a. `setGameAudioMuted(value: boolean)` → `void`

Sets module-private `muted = value`.

#### C3b. `isGameAudioMuted()` → `boolean`

Returns module-private `muted`.

#### C3c. `initGameAudio()` → `void`

Calls `getCtx()` to initialize AudioContext on first user interaction.
Comment: `// Resume AudioContext on first user interaction (required by browsers).`

---

### C4. Sound Effects — Complete Catalog

#### C4a. `playFoodCollect(size: 'small' | 'medium' | 'large' | 'star')` → `void` (exported)

Comment: `/** Food collection — short blip (higher pitch for larger food). */`

| Size | Frequency (Hz) | Duration (s) | Wave Type | Volume |
|------|----------------|--------------|-----------|--------|
| `small` | `660` | `0.08` | `sine` | `0.06` |
| `medium` | `880` | `0.1` | `sine` | `0.06` |
| `large` | `1100` | `0.12` | `sine` | `0.06` |
| `star` | `1320` | `0.15` | `sine` | `0.06` |

**Star chip bonus:** If `size === 'star'`, plays a secondary harmonic:
- Frequency: `1760` Hz, Duration: `0.12` s, Wave: `sine`, Volume: `0.03`

---

#### C4b. `playKill()` → `void` (exported)

Comment: `/** Kill / elimination — satisfying impact sound. */`

| Layer | Function | Freq/Type | Duration | Volume | Detune |
|-------|----------|-----------|----------|--------|--------|
| 1 | `playNoise` | — | `0.15` s | `0.08` | — |
| 2 | `playTone` | `220` Hz, `sawtooth` | `0.2` s | `0.04` | `0` |

---

#### C4c. `playDeath()` → `void` (exported)

Comment: `/** Death (you died) — dramatic crash. */`

| Layer | Function | Freq/Type | Duration | Volume | Delay |
|-------|----------|-----------|----------|--------|-------|
| 1 | `playNoise` | — | `0.3` s | `0.1` | `0ms` |
| 2 | `playTone` | `150` Hz, `sawtooth` | `0.4` s | `0.06` | `0ms` |
| 3 | `playTone` | `100` Hz, `sine` | `0.3` s | `0.04` | `100ms` (via setTimeout) |

---

#### C4d. `playExtractStart()` → `void` (exported)

Comment: `/** Extraction start — ascending chime. */`

| Layer | Freq (Hz) | Note | Duration | Wave | Volume | Delay |
|-------|-----------|------|----------|------|--------|-------|
| 1 | `523` | C5 | `0.1` s | `sine` | `0.05` | `0ms` |
| 2 | `659` | E5 | `0.1` s | `sine` | `0.05` | `80ms` |

---

#### C4e. `playExtractSuccess()` → `void` (exported)

Comment: `/** Extraction success — triumphant ascending arpeggio. */`

| Layer | Freq (Hz) | Note | Duration | Wave | Volume | Delay |
|-------|-----------|------|----------|------|--------|-------|
| 1 | `523` | C5 | `0.15` s | `sine` | `0.07` | `0ms` |
| 2 | `659` | E5 | `0.15` s | `sine` | `0.07` | `100ms` |
| 3 | `784` | G5 | `0.2` s | `sine` | `0.07` | `200ms` |
| 4 | `1047` | C6 | `0.3` s | `sine` | `0.06` | `300ms` |

---

#### C4f. `playExtractRestart()` → `void` (exported)

Comment: `/** Extraction cancelled / restarted — descending tone. */`

| Layer | Freq (Hz) | Duration | Wave | Volume | Delay |
|-------|-----------|----------|------|--------|-------|
| 1 | `440` | `0.12` s | `sine` | `0.05` | `0ms` |
| 2 | `330` | `0.15` s | `sine` | `0.04` | `80ms` |

---

#### C4g. `playBoost()` → `void` (exported)

Comment: `/** Boost activation — short whoosh. */`

| Layer | Function | Freq/Type | Duration | Volume | Detune | Delay |
|-------|----------|-----------|----------|--------|--------|-------|
| 1 | `playNoise` | — | `0.08` s | `0.03` | — | `0ms` |
| 2 | `playTone` | `200` Hz, `sine` | `0.1` s | `0.03` | `-200` | `0ms` |

---

#### C4h. `playWallHit()` → `void` (exported)

Comment: `/** Wall collision — heavy thud. */`

| Layer | Function | Freq/Type | Duration | Volume | Delay |
|-------|----------|-----------|----------|--------|-------|
| 1 | `playNoise` | — | `0.2` s | `0.1` | `0ms` |
| 2 | `playTone` | `80` Hz, `sine` | `0.3` s | `0.06` | `0ms` |

---

### C5. Sound Effect Summary Table

| # | Name | Trigger Context | Layers | Total Duration (approx) |
|---|------|-----------------|--------|----------------------|
| 1 | `playFoodCollect` | Food orb collected by player | 1 (+ 1 bonus for star) | 0.08–0.27s |
| 2 | `playKill` | Player eliminates another snake | 2 (noise + tone) | 0.2s |
| 3 | `playDeath` | Player's snake dies | 3 (noise + 2 tones) | 0.4s (+ 100ms delay) |
| 4 | `playExtractStart` | Extraction channel initiated | 2 (ascending chime) | 0.18s (80ms gap) |
| 5 | `playExtractSuccess` | Extraction completed | 4 (ascending arpeggio) | 0.6s (100ms gaps) |
| 6 | `playExtractRestart` | Extraction cancelled/restarted | 2 (descending tone) | 0.23s (80ms gap) |
| 7 | `playBoost` | Boost activated | 2 (noise + detuned tone) | 0.1s |
| 8 | `playWallHit` | Snake hits arena wall | 2 (noise + low tone) | 0.3s |

**Total exported sound functions: 8**
**Total exported control functions: 3** (`setGameAudioMuted`, `isGameAudioMuted`, `initGameAudio`)
**Total internal helpers: 3** (`getCtx`, `playTone`, `playNoise`)

### C6. Audio Design Notes

- All audio is **procedural** (synthesized at runtime via Web Audio API) — no audio files.
- Noise uses **quadratic decay envelope**: `Math.pow(1 - i / bufferSize, 2)`
- All gain ramps to `0.001` (not zero) via `exponentialRampToValueAtTime`
- All wrapped in `try/catch` — silent failure if AudioContext unavailable
- Global mute flag checked at top of `playTone` and `playNoise`
- Default `playTone` volume: `0.08`
- Default `playNoise` volume: `0.06`
- Musical notes used: C5 (523), E5 (659), G5 (784), C6 (1047), plus non-note frequencies (80, 100, 150, 200, 220, 330, 440, 660, 880, 1100, 1320, 1760 Hz)

---

---

## D. `prisma/schema.prisma` — Database Schema

File comments:
```
// Venom Arena — server-authoritative multiplayer snake game
// SQLite backing store. Arrays are encoded as JSON strings (SQLite limitation).
```

### D0. Generator & Datasource

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

- **Generator provider:** `prisma-client-js`
- **Database provider:** `sqlite`
- **Connection:** `env("DATABASE_URL")`

---

### D1. Model: `Player`

**Table:** `Player`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `email` | `String?` | `@unique` | — | `// null for guest accounts` |
| `passwordHash` | `String?` | — | — | `// null for guests` |
| `securityPin` | `String?` | — | — | `// optional 4-digit PIN for password recovery` |
| `userTag` | `String` | `@unique` | — | `// e.g. VENOM-8291` |
| `name` | `String` | — | — | |
| `country` | `String` | — | `"US"` | |
| `avatar` | `String?` | — | — | |
| `oauthProvider` | `String?` | — | — | `// "google" \| "facebook" \| "apple" \| null` |
| `oauthProviderId` | `String?` | — | — | `// unique ID from the OAuth provider` |
| `bankedChips` | `Int` | — | `150` | |
| `totalEarned` | `Int` | — | `150` | |
| `totalLost` | `Int` | — | `0` | |
| `level` | `Int` | — | `1` | |
| `xp` | `Int` | — | `0` | |
| `lifetimeKills` | `Int` | — | `0` | |
| `lifetimeDeaths` | `Int` | — | `0` | |
| `lifetimeExtracts` | `Int` | — | `0` | |
| `bestStreak` | `Int` | — | `0` | |
| `biggestExtract` | `Int` | — | `0` | |
| `dailyStreak` | `Int` | — | `0` | |
| `lastDailyClaim` | `String?` | — | — | `// ISO date (YYYY-MM-DD)` |
| `unlockedSkins` | `String` | — | `"[]"` | JSON-encoded array |
| `currentSkin` | `String` | — | `"skin-default"` | |
| `currentTrail` | `String` | — | `"trail-none"` | |
| `currentDeath` | `String` | — | `"death-default"` | |
| `currentFlag` | `String?` | — | — | |
| `currentBanner` | `String?` | — | — | |
| `role` | `String` | — | `"player"` | `// player \| admin` |
| `banned` | `Boolean` | — | `false` | |
| `createdAt` | `DateTime` | — | `now()` | |
| `updatedAt` | `DateTime` | `@updatedAt` | auto | |
| `lastSeenAt` | `DateTime` | — | `now()` | |
| `clanTag` | `String?` | — | — | |
| `clanRank` | `String?` | — | — | `// Leader \| Co-Leader \| Viper` |

**Total fields: 33**

**Relations:**

| Relation Name | Type | Model | Field Mapping | On Delete |
|---------------|------|-------|---------------|-----------|
| `clan` | Optional (1:1) | `Clan` | `clanTag → Clan.tag` | `SetNull` |
| `dailyClaims` | Many | `DailyClaim[]` | implicit via DailyClaim.playerId | — |
| `purchases` | Many | `Purchase[]` | implicit via Purchase.playerId | — |
| `sentGifts` | Many | `Gift[]` | `@relation("giftFrom")` via Gift.fromId | — |
| `receivedGifts` | Many | `Gift[]` | `@relation("giftTo")` via Gift.toId | — |
| `friendsFrom` | Many | `Friendship[]` | `@relation("friendshipInitiator")` via Friendship.initiatorId | — |
| `friendsTo` | Many | `Friendship[]` | `@relation("friendshipRecipient")` via Friendship.recipientId | — |
| `challenges` | Many | `Challenge[]` | implicit via Challenge.playerId | — |

**Indexes:**

| Fields | Sort | Index Type |
|--------|------|------------|
| `[bankedChips(sort: Desc)]` | Descending | Standard |
| `[level(sort: Desc)]` | Descending | Standard |
| `[role]` | Ascending | Standard |

---

### D2. Model: `Clan`

**Table:** `Clan`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `tag` | `String` | `@id` | — (required) | `// e.g. "APEX" (3-5 chars)` |
| `name` | `String` | — | — | |
| `emblem` | `String` | — | `"🐍"` | |
| `description` | `String` | — | `""` | |
| `level` | `Int` | — | `1` | |
| `bankedChips` | `Int` | — | `0` | |
| `createdAt` | `DateTime` | — | `now()` | |
| `updatedAt` | `DateTime` | `@updatedAt` | auto | |

**Total fields: 8**

**Relations:**

| Relation Name | Type | Model |
|---------------|------|-------|
| `members` | Many | `Player[]` |
| `messages` | Many | `ClanMessage[]` |

**Indexes:** None

---

### D3. Model: `ClanMessage`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `clanTag` | `String` | — | — | |
| `clan` | `Clan` | `@relation(fields: [clanTag], references: [tag], onDelete: Cascade)` | — | |
| `senderTag` | `String` | — | — | |
| `senderName` | `String` | — | — | |
| `rank` | `String` | — | `"Viper"` | |
| `message` | `String` | — | — | |
| `createdAt` | `DateTime` | — | `now()` | |

**Total fields: 8**

**Relations:**

| Relation Name | Type | Model | On Delete |
|---------------|------|-------|-----------|
| `clan` | Single | `Clan` | `Cascade` |

**Indexes:**

| Fields | Index Type |
|--------|------------|
| `[clanTag, createdAt]` | Standard (composite) |

**Unique constraints:** None (beyond `@id`)

---

### D4. Model: `DailyClaim`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `player` | `Player` | `@relation(fields: [playerId], references: [id], onDelete: Cascade)` | — | |
| `playerId` | `String` | — | — | |
| `day` | `String` | — | — | `// YYYY-MM-DD` |
| `reward` | `Int` | — | — | |
| `streak` | `Int` | — | — | |
| `createdAt` | `DateTime` | — | `now()` | |

**Total fields: 7**

**Relations:**

| Relation Name | Type | Model | On Delete |
|---------------|------|-------|-----------|
| `player` | Single | `Player` | `Cascade` |

**Indexes:** None (beyond unique constraint)

**Unique constraints:**

| Fields | Constraint Type |
|--------|----------------|
| `[playerId, day]` | `@@unique` (composite) |

---

### D5. Model: `Purchase`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `player` | `Player` | `@relation(fields: [playerId], references: [id], onDelete: Cascade)` | — | |
| `playerId` | `String` | — | — | |
| `itemId` | `String` | — | — | `// skin id or chip pack id` |
| `itemType` | `String` | — | — | `// "skin" \| "chip_pack"` |
| `amountChips` | `Int` | — | — | `// chips spent (skins) or gained (chip packs)` |
| `createdAt` | `DateTime` | — | `now()` | |

**Total fields: 7**

**Relations:**

| Relation Name | Type | Model | On Delete |
|---------------|------|-------|-----------|
| `player` | Single | `Player` | `Cascade` |

**Indexes:**

| Fields | Index Type |
|--------|------------|
| `[playerId, createdAt]` | Standard (composite) |

---

### D6. Model: `Gift`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `from` | `Player` | `@relation("giftFrom", fields: [fromId], references: [id], onDelete: Cascade)` | — | |
| `fromId` | `String` | — | — | |
| `to` | `Player` | `@relation("giftTo", fields: [toId], references: [id], onDelete: Cascade)` | — | |
| `toId` | `String` | — | — | |
| `amount` | `Int` | — | — | |
| `createdAt` | `DateTime` | — | `now()` | |

**Total fields: 7**

**Relations:**

| Relation Name | Type | Model | On Delete |
|---------------|------|-------|-----------|
| `from` | Single | `Player` | `Cascade` (named `giftFrom`) |
| `to` | Single | `Player` | `Cascade` (named `giftTo`) |

**Indexes:**

| Fields | Index Type |
|--------|------------|
| `[fromId, createdAt]` | Standard (composite) |
| `[toId, createdAt]` | Standard (composite) |

---

### D7. Model: `Friendship`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `initiator` | `Player` | `@relation("friendshipInitiator", fields: [initiatorId], references: [id], onDelete: Cascade)` | — | |
| `initiatorId` | `String` | — | — | |
| `recipient` | `Player` | `@relation("friendshipRecipient", fields: [recipientId], references: [id], onDelete: Cascade)` | — | |
| `recipientId` | `String` | — | — | |
| `status` | `String` | — | `"pending"` | `// pending \| accepted \| blocked` |
| `createdAt` | `DateTime` | — | `now()` | |

**Total fields: 7**

**Relations:**

| Relation Name | Type | Model | On Delete |
|---------------|------|-------|-----------|
| `initiator` | Single | `Player` | `Cascade` (named `friendshipInitiator`) |
| `recipient` | Single | `Player` | `Cascade` (named `friendshipRecipient`) |

**Indexes:**

| Fields | Index Type |
|--------|------------|
| `[recipientId, status]` | Standard (composite) |

**Unique constraints:**

| Fields | Constraint Type |
|--------|----------------|
| `[initiatorId, recipientId]` | `@@unique` (composite) |

---

### D8. Model: `Challenge`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `playerId` | `String` | — | — | |
| `player` | `Player` | `@relation(fields: [playerId], references: [id], onDelete: Cascade)` | — | |
| `type` | `String` | — | — | `// "daily" \| "weekly"` |
| `category` | `String` | — | — | `// "kill" \| "extract" \| "star_collect" \| "score" \| "arena_entry"` |
| `title` | `String` | — | — | |
| `description` | `String` | — | — | |
| `target` | `Int` | — | — | `// target value to complete` |
| `current` | `Int` | — | `0` | `// progress so far` |
| `reward` | `Int` | — | — | `// chips reward` |
| `completed` | `Boolean` | — | `false` | |
| `claimed` | `Boolean` | — | `false` | |
| `periodStart` | `String` | — | — | `// ISO date when this challenge period started (YYYY-MM-DD)` |
| `createdAt` | `DateTime` | — | `now()` | |

**Total fields: 14**

**Relations:**

| Relation Name | Type | Model | On Delete |
|---------------|------|-------|-----------|
| `player` | Single | `Player` | `Cascade` |

**Indexes:**

| Fields | Index Type |
|--------|------------|
| `[playerId, type]` | Standard (composite) |
| `[playerId, periodStart]` | Standard (composite) |

---

### D9. Model: `ChallengeProgress`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `playerId` | `String` | — | — | |
| `category` | `String` | — | — | `// "kill" \| "extract" \| "star_collect" \| "score" \| "arena_entry"` |
| `periodType` | `String` | — | — | `// "daily" \| "weekly"` |
| `periodStart` | `String` | — | — | `// ISO date` |
| `increment` | `Int` | — | `1` | `// how much to add per event` |
| `createdAt` | `DateTime` | — | `now()` | |

**Total fields: 7**

**Relations:** None (no `@relation` — `playerId` is a plain `String`, not a foreign key to `Player`)

**Unique constraints:**

| Fields | Constraint Type |
|--------|----------------|
| `[playerId, category, periodType, periodStart]` | `@@unique` (4-field composite) |

---

### D10. Model: `GameConfig`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `key` | `String` | `@unique` | — | `// e.g. "snake.collisionRadius"` |
| `value` | `String` | — | — | `// JSON-encoded value (number, string, boolean, or object)` |
| `label` | `String` | — | — | `// human-readable name for admin panel` |
| `category` | `String` | — | — | See valid categories below |
| `order` | `Int` | — | `0` | `// display order within category` |
| `type` | `String` | — | `"number"` | `// "number" \| "boolean" \| "string" \| "json"` |
| `updatedAt` | `DateTime` | `@updatedAt` | auto | |

**Total fields: 8**

**Relations:** None

**Valid `category` values (from comment):**
- `"snake_physics"`
- `"food_system"`
- `"map_settings"`
- `"boost_system"`
- `"collision"`
- `"economy"`
- `"bot_settings"`
- `"extraction"`
- `"spawning"`

**Valid `type` values (from comment):**
- `"number"` (default)
- `"boolean"`
- `"string"`
- `"json"`

---

### D11. Schema-Wide Summary

**Total models:** 9

| # | Model | Fields | Relations | Unique Constraints | Indexes |
|---|-------|--------|-----------|-------------------|---------|
| 1 | `Player` | 33 | 8 | 2 (`email @unique`, `userTag @unique`) | 3 |
| 2 | `Clan` | 8 | 2 (incoming) | 1 (`tag @id`) | 0 |
| 3 | `ClanMessage` | 8 | 1 | 1 (`id @id`) | 1 |
| 4 | `DailyClaim` | 7 | 1 | 2 (`id @id`, `[playerId, day]`) | 0 |
| 5 | `Purchase` | 7 | 1 | 1 (`id @id`) | 1 |
| 6 | `Gift` | 7 | 2 | 1 (`id @id`) | 2 |
| 7 | `Friendship` | 7 | 2 | 2 (`id @id`, `[initiatorId, recipientId]`) | 1 |
| 8 | `Challenge` | 14 | 1 | 1 (`id @id`) | 2 |
| 9 | `ChallengeProgress` | 7 | 0 | 2 (`id @id`, `[playerId, category, periodType, periodStart]`) | 0 |

**Total fields across all models:** 98
**Total relations:** 18 (explicitly named or inferred)
**Total unique constraints:** 13
**Total indexes:** 10

**CUID-based IDs:** 7 models (`Player`, `ClanMessage`, `DailyClaim`, `Purchase`, `Gift`, `Friendship`, `Challenge`, `ChallengeProgress`, `GameConfig`) = 9 models
**Non-CUID primary keys:** 1 model (`Clan` — uses `tag` as `@id`)

**On Delete behaviors:**
- `Cascade`: 8 relations (all Player→child relations, Clan→ClanMessage)
- `SetNull`: 1 relation (Player→Clan)

**Notable default values:**
- `Player.bankedChips`: `150`
- `Player.totalEarned`: `150`
- `Player.country`: `"US"`
- `Player.unlockedSkins`: `"[]"` (JSON array)
- `Player.currentSkin`: `"skin-default"`
- `Player.currentTrail`: `"trail-none"`
- `Player.currentDeath`: `"death-default"`
- `Player.role`: `"player"`
- `Clan.emblem`: `"🐍"`
- `ClanMessage.rank`: `"Viper"`
- `Friendship.status`: `"pending"`
- `GameConfig.type`: `"number"`

**String enums (documented in comments, not enforced by Prisma):**
- `Player.role`: `"player" | "admin"`
- `Player.oauthProvider`: `"google" | "facebook" | "apple" | null`
- `Player.clanRank`: `"Leader" | "Co-Leader" | "Viper"`
- `Purchase.itemType`: `"skin" | "chip_pack"`
- `Friendship.status`: `"pending" | "accepted" | "blocked"`
- `Challenge.type`: `"daily" | "weekly"`
- `Challenge.category`: `"kill" | "extract" | "star_collect" | "score" | "arena_entry"`
- `ChallengeProgress.periodType`: `"daily" | "weekly"`
- `GameConfig.category`: `"snake_physics" | "food_system" | "map_settings" | "boost_system" | "collision" | "economy" | "bot_settings" | "extraction" | "spawning"`
- `GameConfig.type`: `"number" | "boolean" | "string" | "json"`

---

08-panels.md
===
# 08 — Panel Components Exhaustive UI Catalog

> Every string literal, button label, heading, status message, placeholder, tab name,
> tooltip, number, icon, import, state variable, API call, and comment with design intent
> from all 15 panel files in `/src/components/panels/`.
>
> **Convention**: `[CODE COMMENT]` = developer comment with design intent.
> Toast messages are prefixed with their type: `[success]`, `[error]`, `[info]`.

---

## 1. `_panel-primitives.tsx` (207 lines) — Shared UI Primitives

[CODE COMMENT] *"Shared visual primitives used by all 8 panels in this directory.
These reproduce the dark-slate / indigo-accent design language of the
original Venom Arena panels."*

### Imports
- `toast` from `sonner`
- `ReactNode` from `react`

### Types
- `ToastType` = `'success' | 'error' | 'info'`
- `ToastFn` = `(msg: string, type?: ToastType) => void`

### Components

#### `notify()` function
- No UI text — routes to `toast.success()`, `toast.error()`, `toast.info()`

#### `PanelShell`
[CODE COMMENT] *"Outer container card for a whole panel."*
- No text content

#### `GlowBlob`
[CODE COMMENT] *"Decorative blurred color blob (for backgrounds)."*
- Default color: `bg-indigo-500/10`
- `aria-hidden="true"`

#### `MicroLabel`
[CODE COMMENT] *"Tiny mono label like \"GLOBAL RANK\" — matches original tracking-widest style."*
- No text content (receives children)

#### `PanelTitle`
[CODE COMMENT] *"Panel heading: big white sans-black tracking-tight title."*
- Props: `icon?`, `title` (string), `subtitle?` (string), `right?`

#### `PrimaryButton`
[CODE COMMENT] *"Primary button — indigo-600, hover indigo-500, mono-ish caps."*
- Default type: `'button'`

#### `GhostButton`
[CODE COMMENT] *"Outline / ghost button — slate border, slate-300 text."*
- Default type: `'button'`

#### `PanelSkeleton`
[CODE COMMENT] *"Skeleton placeholder used during loading."*
- Default count: `6`, default height: `"h-24"`
- `aria-busy="true"`, `aria-live="polite"`

#### `ErrorCard`
[CODE COMMENT] *"Inline error card with retry button."*
- Default retry label: **"Retry"**
- Props: `message` (string), `onRetry?`, `retryLabel?`

#### `NotSignedIn`
- Text: **"Not signed in."**

---

## 2. `arena-selector.tsx` (491 lines) — Arena Tier Selection

[CODE COMMENT] *"Displays 30 online competitive tiers (10c → 1B) grouped by difficulty
with filter tabs, plus 3 offline practice arenas.
Difficulty groups: Beginner (1-6) · Medium (7-12) · High Stakes (13-18) ·
                    Extreme (19-24) · Legendary (25-30)"*

### Imports
- React: `useEffect`, `useMemo`, `useState`
- `useAuth` from `@/components/providers/auth-provider`
- `ARENA_TIERS`, `PRACTICE_TIERS` from `@/lib/game-config`
- `PanelSkeleton`, `NotSignedIn`, `notify`, `ToastFn` from `./_panel-primitives`

### Icons (lucide-react)
- `ChevronRight`, `Filter`, `Landmark`, `Play`, `Shield`, `Swords`, `Trophy`, `Users`, `Zap`

### State Variables
- `isOnline` (boolean, default `true`) — online vs offline mode toggle
- `selectedTierId` (string, default `'tier-1'`)
- `difficultyFilter` (string | null, default `null`)
- `arenaStats` (Record<string, {players, maxPlayers}>)

### API Calls
- `GET /api/arena-stats` — polled every **5 seconds** in online mode
  - [CODE COMMENT] *"network errors silently ignored — stats are decorative"*

### Chip Formatting Helpers
- `chipShort()`: `1500` → `"1.5Kc"`, `1000000` → `"1.0Mc"`, `1000000000` → `"1.0Bc"`
- `chipFull()`: `1500` → `"1,500c (1.5Kc)"`, `0` → `"FREE"`

### Difficulty Filter Tabs
| Label | Accent Color |
|-------|-------------|
| All | `text-slate-400` |
| Beginner | `text-emerald-400` |
| Medium | `text-amber-400` |
| High Stakes | `text-rose-400` |
| Extreme | `text-red-400` |
| Legendary | `text-yellow-400` |

### Mode Toggle Buttons
- **"Online"** (with `Users` icon) — indigo accent when active
- **"Offline"** (with `Swords` icon) — amber accent when active

### Headings
- **"Online PvP Shards"** (when online mode active)
- **"Practice Arenas"** (when offline mode active)
- Subtitle (online): **"30 tiers · 10c → 1B chips"**
- Subtitle (offline): **"Choose your difficulty"**

### Jump to Highest Affordable
- **"Jump to highest affordable: {tierName} ({chipFull})"** (with `Zap` icon)

### Tier List Item Labels
- **"Online"** (micro label for live player count)
- **"Buy-In"** (micro label for cost)
- Status text: **"0 / 1,000"** (fallback when no stats)
- **"FREE"** (when buyIn is 0)

### Selected Arena Detail Card (Right Side)
- Badge: **"{difficulty} Match"**
- Heading: selected tier name
- Subtitle: **"TIER {index} / {total}"** (e.g. "TIER 1 / 30")

### Detail Rows
| Icon | Label | Example Value |
|------|-------|---------------|
| `Landmark` | **"Stake Buy-In"** | `"FREE"` or `"1,000c (1.0Kc)"` |
| `Trophy` | **"Extraction"** | **"EXIT ANYTIME"** |
| `Users` | **"Bot Population"** | **"500 Bots"** |
| — | **"Live Online Players"** | **"42 / 1,000"** |
| `Zap` | **"XP Multiplier"** | **"x1.5 Multi"** |

### Mode Warning Block
**Online multiplayer:**
- **"ONLINE MULTIPLAYER:"** High-stakes arena for up to 1,000 players.
  Collect star chips from defeated opponents and extract safely.
  Graduated commission: **"0% if ≤3 players"**, **"35% if ≥4 players"**.

**Offline practice:**
- **"OFFLINE PRACTICE MODE:"** Risk-free training ground. Test your skills against {bots} bots without wagering, losing, or earning any of your banked chips!

### Enter Button States
- Online, affordable: **"BUY IN ARENA (-{chipFull})"** (indigo gradient)
- Online, unaffordable: **"STAKE AMOUNT EXCEEDS BANK"** (greyed out)
- Offline: **"START PRACTICE MODE (FREE)"** (amber gradient)
- All use `Play` icon

### Toast Messages
- [error] **"Insufficient chips to enter this arena! Claim daily rewards or play lower stakes to rebuild."**

---

## 3. `chip-store.tsx` (404 lines) — Chip Purchase Packs

### Imports
- React: `useEffect`, `useState`
- `useAuth` from `@/components/providers/auth-provider`
- `CHIP_PACKS`, `PROMO_CODES`, `MAX_YEARLY_BUY_CHIPS`, `MAX_DAILY_ADS`, `AD_REWARD_CHIPS`, `ChipPack` from `@/lib/game-config`
- `GlowBlob`, `MicroLabel`, `PanelSkeleton`, `NotSignedIn`, `notify`, `ToastFn` from `./_panel-primitives`

### Icons (lucide-react)
- `Landmark`, `Coins`, `Loader2`, `Sparkles`, `Info`, `ShieldAlert`, `CreditCard`, `Lock`, `Gift`, `Video`

### State Variables
- `busyId` (string | null) — which pack is being purchased
- `promoCode` (string)
- `promoBusy` (boolean)
- `adBusy` (boolean)
- `yearlyPurchased` (number, from localStorage key `venom_yearly_purchased_chips`)
- `adState` ({date, count}, from localStorage key `venom_daily_ads`)

### API Calls
- `POST /api/chips/pack` — body: `{packId}`
- `POST /api/player/promo-reward` — body: `{code}`
- `POST /api/player/video-reward` — no body

### Header
- Heading: **"Integrated Store Matrix (Base Rate: 100 Chips = ₹1)"** (with `Landmark` icon)
- Subtitle: **"Rebuild your bank cushion with fair-play packages bounded by strict annual buy limits (25 Lakh Chips max / year)."** (with `Info` icon)

### Wallet Displays
- **"Your Wallet"** (MicroLabel) — shows `{bankedChips}c` (emerald)
- **"Yearly Buy Cap"** (MicroLabel) — shows `{purchased} / 25,00,000 c` (rose)

### Store Lock Alert
- Heading: **"ANTI-MONOPOLY STORE LOCK ACTIVE (365 DAYS)"** (with `Lock` icon)
- Text: **"You have reached the absolute maximum yearly buy cap of 25 Lakh Chips (2,500,000 chips). Store purchases are disabled to ensure tournament skill remains 100% fair across all 197 countries. Free ad rewards (1,200 chips/day) and arena wagers remain fully active!"**

### Pack Card (per pack from CHIP_PACKS)
- Badge on max pack (`pack-15000`): **"MAX CAP"** (with `Sparkles` icon, amber, animate-pulse)
- Pack name (h3), price MicroLabel: **"₹{priceINR} · {priceUSD}"**
- Description text (p)
- Chips display: **"{count} chips"** (with `Coins` icon)
- Bonus badge: **"{bonus text}"** (with `Sparkles` icon, emerald)
- Button states:
  - Loading: `Loader2` spinner
  - Disabled/locked: **"Locked"** (with `Lock` icon)
  - Normal: **"Buy Pack"** (with `CreditCard` icon)

### Promotional Codes Section
- Heading: **"Promotional Codes"** (with `Gift` icon)
- Text: **"Redeem a promo code for instant bonus chips. Try `VENOM` (+500c) or `CHAMPION` (+1000c)."**
- Placeholder: **"Enter Code (e.g. VENOM)"**
- Button: **"Redeem"** (loading: `Loader2` spinner)

### Daily Reward Ads Section
- Heading: **"Daily Reward Ads (12 Max / Day)"** (with `Video` icon)
- Text: **"Each completed ad awards 100 chips directly to your wallet (Max 1,200 free chips per day). Resets strictly at 00:00 UTC daily."**
- Counter: **"Today: {count}/12 ads · {remaining} remaining"**
- Button states:
  - Loading: **"Buffering Sponsor Offer..."** (with `Loader2`)
  - Exhausted: **"Daily Limit Reached (12/12)"**
  - Available: **"Watch Sponsor Ad (+100 Chips)"** (with `Video` icon)

### Compliance Notice
- **"STORE POLICY COMPLIANCE ASSURANCE:"** This is a store-safe edition. Spending is capped at ₹15,000/year to block monopoly loops. Free potential daily rewards allow non-paying competitors to fully win the World Cup purely through skill and win-rate!

### Toast Messages
- [error] **"Store is locked for 365 days after reaching the 25 Lakh yearly cap."**
- [info] **"Initializing secure App Store/Play Store sandboxed billing for ₹{price} ({usdPrice})..."**
- [error] **"Failed to add chips."**
- [success] **"🎉 Purchase Successful! +{granted} CHIPS added! Annual buy cap of 25 Lakh Chips (2,500,000) reached — Store locked for 365 days to maintain tournament skill parity!"**
- [success] **"Purchase Successful! +{granted} CHIPS credited. (Bought this year: {total} / 25,00,000 max)"**
- [error] **"Network error. Please try again."**
- [error] **"Invalid or expired promo code."**
- [success] **"Promo Code redeemed: +{reward} CHIPS credited!"**
- [error] **"Network error redeeming promo code."**
- [error] **"Daily Ad Limit Reached (12/12)! Resets at 00:00 UTC."**
- [info] **"Launching high-definition sponsor video... Keep active."**
- [error] **"Failed to claim ad reward."**
- [success] **"Sponsor Ad Completed: +{reward} FREE CHIPS deposited! ({count}/12 ads today)"**
- [error] **"Network error claiming ad reward."**

---

## 4. `daily-rewards.tsx` (240 lines) — Daily Login Rewards

### Imports
- React: `useEffect`, `useState`
- `useAuth` from `@/components/providers/auth-provider`
- `DAILY_REWARDS` from `@/lib/game-config`
- `GlowBlob`, `MicroLabel`, `PanelSkeleton`, `NotSignedIn`, `notify`, `ToastFn` from `./_panel-primitives`

### Icons (lucide-react)
- `Gift`, `Check`, `Calendar`, `Flame`, `Loader2`, `Sparkles`

### State Variables
- `busy` (boolean)
- `adBusy` (boolean)
- `now` (number, Date.now(), updates every 1 second via setInterval)

### API Calls
- `POST /api/player/daily` — body: `{multiplier: 1 | 2}`

### Header
- Heading: **"Daily Log Rewards"** (with `Gift` icon, animate-bounce)
- Subtitle: **"Build your claim streak to secure massive payouts for arena entries!"**
- Streak display: **"Current Streak"** (MicroLabel) + **"{days} Days"** (with `Flame` icon, fill)

### 7-Day Grid
- Day labels: **"Day 1"** through **"Day 7"** (MicroLabel)
- Each cell shows reward amount + **"c"** suffix
- Today indicator: **"Today"** badge (emerald, rounded-full)
- Claimed indicator: `Check` icon in emerald circle (aria-label: **"Claimed"**)

### Claim Actions
- **When already claimed:** **"Next Daily Claim available in: {HH:MM:SS}"** + disabled button **"Already Claimed Today"** (with `Check` icon)
- **When available:** **"Day {n} reward is available! Claim now to boost your chips balance."** (with `Sparkles` icon, animate-spin)
  - **"Standard Claim"** button (emerald-to-teal gradient, with `Gift` icon)
  - **"Watch Ad (Double Claim)"** button (indigo, with `Sparkles` icon)
  - Loading state: **"Buffering Sponsor..."** (with `Loader2`)

### Toast Messages
- [error] **"Failed to claim daily reward."**
- [success] **"Claimed Daily Reward: +{reward} CHIPS! {multiplier > 1 ? '(2x Ad Bonus!)' : ''}"**
- [error] **"Network error. Please try again."**
- [info] **"Launching ad-stream sponsor link... Please hold"**

---

## 5. `social-panel.tsx` (1322 lines) — Friends, Rivals, Clans, Community

### Imports
- React: `useCallback`, `useEffect`, `useMemo`, `useState`
- `useAuth` from `@/components/providers/auth-provider`
- `SOCIAL_COUNTRY_FILTER`, `PUBLIC_CLANS`, `PRESET_EMBLEMS`, `BOT_REPLIES`, `countryFlag`, `ARENA_TIERS` from `@/lib/game-config`
- `LeaderboardEntry` from `@/lib/types`
- `GlowBlob`, `MicroLabel`, `NotSignedIn`, `notify`, `ToastFn` from `./_panel-primitives`

### Icons (lucide-react)
- `Users`, `Shield`, `Swords`, `Globe`, `UserPlus`, `Gift`, `Eye`, `Send`, `X`, `Check`, `Coins`, `MessageSquare`, `Search`, `Plus`, `LogOut`, `Award`, `Loader2`

### State Variables
- `topTab` ("friends" | "syndicate", default "friends")
- `friendsSub` ("friends" | "rivals" | "search", default "friends")
- `friends` (FriendItem[])
- `pendingReceived` (PendingRequestItem[])
- `pendingSent` (PendingRequestItem[])
- `friendsLoading` (boolean)
- `rivals` (RivalItem[])
- `globalPlayers` (LeaderboardEntry[])
- `globalLoading` (boolean)
- `search` (string)
- `countryFilter` (string, default "ALL")
- `addFriendInput` (string)
- `addFriendLoading` (boolean)
- `joinedClanId` (string | null)
- `showCreateClan` (boolean)
- `clanForm` ({name, tag, emblem, description})
- `clanChat` ({author, text, ts}[])
- `chatInput` (string)
- `depositAmount` (string)
- `coOpFriend` (FriendItem | null)

### API Calls
- `GET /api/friends/list`
- `GET /api/leaderboard?type=chips&limit=50`
- `POST /api/friends/request` — body: `{userTag}`
- `POST /api/friends/remove` — body: `{userTag}`
- `POST /api/friends/accept` — body: `{userTag}`

### Status Labels
| Key | Label |
|-----|-------|
| online | **"Lobby"** |
| idle | **"Idle"** |
| in-match | **"In-Arena"** |
| offline | **"Offline"** |

### Status Badges (emojis)
| Key | Badge |
|-----|-------|
| in-match | **"⚔️ Playing Arena"** |
| online | **"🟢 Online"** |
| idle | **"🟢 Online"** |
| offline | **"⚪ Offline"** |

### Top Tabs
- **"Friends & Global Search ({count})"** (with `Users` icon)
- **"Competitive Syndicate [{tag}]"** or **"Competitive Syndicate"** (with `Shield` icon)

### Friends Sub-Tabs
- **"My Friends ({count})"** (with `Users` icon)
- **"My Rivals ({count})"** (with `Swords` icon)
- **"Search Global Players"** (with `Globe` icon)

### Add Friend Bar
- Placeholder: **"Enter Player Tag (e.g. COBRA-4231)..."**
- Button: **"Add Friend"** (with `UserPlus` icon, violet)

### Incoming Requests Section
- Heading: **"Incoming Requests ({count})"** (with `UserPlus` icon, amber)
- Buttons per request: **"Accept"** (emerald, with `Check`), **"Decline"** (slate, with `X`)
- User display: avatar (🐍), name, **"#{userTag} · Lvl {level}"**

### Outgoing Requests Section
- Heading: **"Outgoing Requests ({count})"** (slate)
- Badge: **"Pending"** (amber)

### Empty States
- **"Your Friends List is Empty"** (with `Users` icon)
  - **"Use \"Search Global Players\" above or enter a player tag to send a friend request, gift daily free chips, and play!"**
- **"No Rivals in Your List"** (with `Swords` icon)
  - **"When you get eliminated or collide with players in matches, click \"ADD RIVAL\" on the game-over screen to track them here!"**

### Rivals Section
- Heading: **"RIVALRY & REVENGE TRACKER"** (uppercase, white)
- Subtitle: **"Players who eliminated you or collided with you in arena matches. Track their online status and join their exact arena to seek revenge!"**
- Badge: **"{count} Active Rivals"** (rose)

### Rival Card
- Avatar: ⚔️
- Display: **"#{userTag} · Lvl {level}"**, **"🕒 {lastEncounterDate}"**
- MicroLabel: **"Head-To-Head Record:"**
- **"You: {kills}"** (emerald) / **"Rival: {deaths}"** (rose)
- MicroLabel: **"CURRENT ARENA TABLE:"**
- Button: **"HUNT / JOIN ARENA"** (with `Swords` icon, rose)
- Tooltip: **"Convert to Friend"** (with `UserPlus`), **"Remove Rival"** (with `X`)

### Global Search (Leaderboard)
- Placeholder: **"Search players globally by Name or Tag (e.g. Cobra, #IND-8821)..."**
- Country filter dropdown (from `SOCIAL_COUNTRY_FILTER`)
- Empty: **"No players match your search."**
- Player display: flag, name, **"You"** badge (violet), **"#{userTag}"**, **"🪙 {k}k · Lvl {level} · #{rank}"**
- Self badge: **"You"** (slate)
- Connected badge: **"Connected"** (with `Check`, emerald)
- Button: **"Connect"** (with `UserPlus`, violet)

### Friend Card
- Avatar: 🐍 (colored ring based on skinColor)
- Display: name, **"#{userTag}"**, status (online/offline), **"Lvl {level}"**
- Tooltip: **"Remove Friend"** (with `X`)
- Buttons:
  - **"Claim +25c"** (with `Gift`, emerald) — when gift received
  - **"No pending gift"** (slate, disabled) — when no gift
  - **"Spectate"** (with `Eye`, cyan) — only when online
  - **"Invite"** (with `Swords`, violet) — disabled when offline
  - **"Send Gift"** / **"Sent Today"** (with `Send`, amber) — toggle state

### Syndicate Tab (No Clan)
- Heading: **"Choose Your Combat Syndicate"** (with `Shield` icon)
- Subtitle: **"Syndicates are competitive teams of Venom Arena players. Work cooperatively, pool chip assets to unlock level-based buffs, compete on Clan Leaderboards, and chat in private feeds!"**
- Button: **"Register Syndicate (500c)"** (with `Plus` icon, violet)
- Placeholder: **"Search public Syndicates..."**
- Clan card shows: emblem, name, **"[{tag}]"**, **"Lvl {level}"**
- Description in quotes (italic)
- MicroLabels: **"Members"** (count), **"Clan Bank"** (chips)
- Button: **"Join Syndicate"**

### Syndicate Tab (Joined Clan)
- Header: emblem + name + **"[{tag}]"** + **"Level {level} · {members} Members"**
- Button: **"Leave Syndicate"** (with `LogOut` icon)
- XP bar: **"Syndicate level {n}"** (amber, with `Award` icon), **"{xp} / {max} XP"**

#### Co-Op Syndicate Vault
- Heading: **"Co-Op Syndicate Vault"** (with `Coins` icon)
- Text: **"Deposit excess banked chips to grow the vault balance. Deposits earn 10% value in Clan XP! Current Vault: {chips} c"**
- Placeholder: **"Amt (e.g. 100)"**
- Button: **"Deposit"** (with `Coins`, emerald)

#### Active Members
- Heading: **"Active Members ({count}/30)"** (with `Users` icon, violet)
- **"Leader: 👑 {name}"** (or **"Leader: None"**)
- Per member: name + role (MicroLabel) + **"Lvl {level}"** (amber)

#### Syndicate HQ Feed (Chat)
- Heading: **"Syndicate HQ Feed"** (with `MessageSquare`, violet)
- Subtitle: **"Active conversation channel"**
- Empty: **"No messages yet. Say hi to your syndicate!"**
- Message format: **"{author} · {ts}"**
- Placeholder: **"Type message to Syndicate..."**
- Button: **"Send"** (with `Send` icon, violet)

### Create Clan Modal
- Heading: **"Syndicate Charter Registration"**
- Close button: `X` icon
- Label: **"Syndicate Name"**, Placeholder: **"e.g. Poison Fangs"**
- Label: **"Clan Tag (3-4 Chars)"**, Placeholder: **"e.g. FANG"** (maxLength 4, uppercase, mono)
- Label: **"Select Emblem Symbol"** — grid of `PRESET_EMBLEMS`
- Label: **"Description / Manifesto"**, Placeholder: **"Write your squad's focus, rules or motto..."**
- Cost: **"Cost: 500 c"** (emerald)
- Buttons: **"Cancel"** (slate), **"Establish Charter"** (with `Check`, violet)

### Co-Op Invite Modal
- Heading: **"Co-Op Lobby Invite"** (with `Swords` icon, animate-pulse)
- Subtitle: **"Assemble a squad with your allies"**
- Balance cards: **"Your Balance"** / **"{friendName}"** (showing chips with "c" suffix)
- Label: **"Select Arena Stakes"**
- Per tier: name + **"Buy-In: {cost} c"**
- Eligibility pills:
  - **"You can't afford"** (rose)
  - **"They can't afford"** (amber)
  - **"Eligible 🤝"** (emerald)
- Counter-proposal speech: **"{name} responds:"** → quoted text with **"🤝 Accept Proposal & Invite"** button
- Buttons: **"Cancel"**, **"Send Co-Op Invite"** (violet-to-indigo gradient)

### Toast Messages
- [error] **"Please enter a player tag or name."**
- [success] **"Friend request sent to {tag}! 🤝"**
- [error] **"Failed to send request."**
- [success] **"Accepted friend request from {name}! 🤝"**
- [error] **"Failed to accept request."**
- [info] **"Declined friend request from {name}."**
- [info] **"Removed {name} from friends list."**
- [error] **"Failed to remove friend."**
- [success] **"Connected with {name}! 🤝"**
- [success] **"Sent 25 Daily Chips Gift to {name}! 🎁"**
- [success] **"Claimed 25 chips gift from {name}! 🪙"**
- [info] **"Joining spectating server for {name}... 👁️"**
- [info] **"⚔️ HUNT INITIATED: Entering {arena} to take down {name}!"**
- [success] **"{name} converted from rival to friend!"**
- [info] **"Removed {name} from rivals list."**
- [error] **"You are already in a clan! Leave your current clan first."**
- [success] **"Welcome to {name} [{tag}]! 🛡️"**
- [info] **"Left {name} [{tag}]."**
- [error] **"Syndicate Name must be at least 4 characters."**
- [error] **"Clan Tag must be 3-4 characters."**
- [error] **"You need at least 500 chips to register a Syndicate."**
- [success] **"Syndicate \"{name}\" [{tag}] established!"**
- [error] **"Enter a valid deposit amount."**
- [error] **"Insufficient chips to deposit."**
- [success] **"Deposited {amt}c to syndicate vault (+{xp} Clan XP)!"**
- [success] **"Broadcast posted to clan chat! 📢"**
- [success] **"Co-Op invite sent to {name} for {arena}! 🤝"**

---

## 6. `player-profile.tsx` (2360 lines) — Full Player Profile

[CODE COMMENT] *"Faithful replica of /upload/extracted/src/components/PlayerProfile.tsx (1429 lines).
Every text string (4 tabs, 8 stat cards, 3 tournament caps, FAQ, social
badges, ALL button labels and toast messages) is preserved verbatim from
AUDIT-C section D."*

### Imports
- React: `useEffect`, `useState`
- lucide-react: `Award`, `Check`, `Clock`, `Compass`, `Edit2`, `Eye`, `Globe`, `History`, `Landmark`, `Lock`, `LogOut`, `RefreshCw`, `Shield`, `Skull`, `Sparkles`, `Swords`, `Target`, `Trash2`, `Trophy`, `Upload`, `UserPlus`, `Users`, `X`
- `useAuth` from `@/components/providers/auth-provider`
- `ARENA_TIERS`, `COUNTRIES`, `getCosmeticById` from `@/lib/game-config`
- `PlayerProfile` from `@/lib/types`
- `PanelSkeleton`, `NotSignedIn`, `notify`, `ToastFn` from `./_panel-primitives`

### Preset Avatars (8)
| ID | Label | Emoji |
|----|-------|------|
| av-viper | **"Venomous Viper"** | 🐍 |
| av-skull | **"Syndicate Skull"** | 🏴‍☠️ |
| av-invader | **"Pixel Invader"** | 👾 |
| av-sentinel | **"Cyber Sentinel"** | 🤖 |
| av-king | **"Midas King"** | 👑 |
| av-storm | **"Storm Surge"** | ⚡ |
| av-fury | **"Crimson Fury"** | 🔥 |
| av-nebula | **"Cosmic Nebula"** | 🌌 |

### Default Seed Friends (4)
- ApexViper (#APEX-1029, Lvl 42, online, #10b981, gift received)
- ShadowSlinker (#SLNK-9281, Lvl 18, in-match, #a855f7)
- CoinGobbler (#COIN-5432, Lvl 29, offline, #eab308, gift sent)
- VenomKing (#VNOM-0001, Lvl 55, idle, #ef4444)

### Sample Match History (3)
- Slum Alley (practice, EXTRACTED, +180c, 3 kills, len 22, 85s)
- Neon Grid (online, COLLIDED, -50c, 1 kill, len 14, 42s)
- Viper Syndicate (online, EXTRACTED, +640c, 6 kills, len 35, 164s)

### State Variables
- `activeTab` ("stats" | "history" | "friends" | "identityLog")
- `activeInviteFriend` (Friend | null)
- `inviteSelectedArenaId` (string, default "tier-1")
- `inviteStatusMessage` (InviteStatusMessage | null)
- `isEditing` (boolean)
- `newName`, `selectedCountry`, `selectedAvatar` (string)
- `instagram`, `youtube`, `twitch` (string)
- `isDragging`, `saving`, `loggingOut` (boolean)
- `friends`, `matches`, `identityLogs` (arrays from localStorage)
- `newFriendName` (string)

### localStorage Keys
- `venom_friends`
- `venom_match_history`
- `venom_identity_history_log`
- `venom_social_channels`
- `venom_active_match_invite`

### API Calls
- `PUT /api/player` — body: `{name, country, avatar, instagram, youtube, twitch}`
- `POST /api/auth/change-password` — body: `{currentPassword, newPassword}`
- `POST /api/auth/change-pin` — body: `{currentPin, newPin}`
- `POST /api/auth/upgrade` — body: `{name, email, password, pin}`

### Header Section
- Tooltip (avatar): **"EQuipped DNA Skin"**
- Tooltip (edit button): **"Edit Identity"**, aria-label: **"Edit identity"**
- Name display with flag, country code badge (e.g. **"US"**)
- **"Ledger Tag: #{userTag || 'STRK-8291'} • Global Standing: #999"**
- Social links: 📸 (Instagram, pink), 🎥 **"YouTube"** (red), 📱 **"Twitch"** (purple)

### Level Progress
- **"Level Progress"** (with `Sparkles` icon, animate-pulse)
- **"{xp} / {needed} XP"**
- Progress bar (indigo-to-purple gradient)

### Sign Out Button
- Tooltip: **"Logout Session"**
- Label: **"Sign Out"** (with `LogOut` icon, red)

### Tab Navigation (4 tabs)
| ID | Label | Icon |
|----|-------|------|
| stats | **"Records & Statistics"** | `Target` |
| history | **"Match History Ledger"** | `History` |
| friends | **"Friends & Spectate ({count})"** | `Users` |
| identityLog | **"Identity Anti-Tamper Logs"** | `Lock` |

### Stats Tab — 8 Stat Cards
| Label | Sub-Label | Icon | Color |
|-------|----------|------|-------|
| **"Banked Wallet"** | Deposited Chips | `Landmark` | emerald |
| **"Tournament Kills"** | Total Terminations | `Skull` | white |
| **"K/D Ratio"** | Kill / Death Index | `Target` | amber |
| **"Extraction Rate"** | Successful Handshakes | `Compass` | cyan |
| **"Survival Streak"** | Consecutive Extractions | `Trophy` | yellow |
| **"Record Extraction"** | Max Retained in One Run | `Award` | indigo |
| **"Lifetime Retained"** | Cumulative Chip Profit | `Landmark` | teal |
| **"Total Forfeited"** | Forfeited in Crash Events | `RefreshCw` | red |

### Annual Tournament Guardrails
- Heading: **"Annual Tournament Guardrails & Limit Allowances"** (with `Shield`, amber)
- Badge: **"1-YEAR UTC TOURNAMENT CYCLE ACTIVE"** (amber)

#### 3 Cap Cards
1. **"Matches Allowed"** — icon: `Swords`, value: **"18 / 10,000"**, left: **"Completed: 18"**, right: **"Remaining: 9,982 matches"** (emerald)
2. **"Annual Buy Cap (25L)"** — icon: `Landmark`, value: **"0 / 25,00,000 c"**, left: **"Bought: 0 c"**, right: **"Cap Remaining: 25,00,000 c"** (emerald)
3. **"Rewarded Ads Today"** — icon: `Trophy`, value: **"0 / 12 Ads"**, left: **"Watched: 0"**, right: **"Resets at 00:00 UTC"** (amber)

### Challenger Standing Rating Banner
- **"CHALLENGER STANDING RATING"** (uppercase, white)
- **"All tournament statistics are linked directly to your global challenger index handle. Altering your registry flag updates leaderboard feeds dynamically. Data verification handshakes run periodically to check metrics validity."**

### History Tab
- Heading: **"Match Run Records Ledger"** (with `History` icon, indigo)
- Subtitle: **"Showing last 25 operations"**
- Empty: **"No matches found in the active ledger standing."** + **"Jump into any arena to log your first run data!"**

#### Table Headers
| Column | Label |
|--------|-------|
| 1 | **"Arena Sector"** |
| 2 | **"Status"** |
| 3 | **"Chips Outcome"** (right) |
| 4 | **"Kills"** (center) |
| 5 | **"Tail Score"** (center) |
| 6 | **"Time Elapsed"** |
| 7 | **"Timestamp"** |

- Status badges: **"ONLINE"** (indigo) / **"PRACTICE"** (slate)
- Status text: **"EXTRACTED"** (emerald) / **"COLLIDED"** (rose)
- Chip display: **"+{amount} c"** / **"-{amount} c"**
- Time: **"{seconds}s"** (with `Clock` icon)

### Friends Tab
- Heading: **"Friends & Live Spectate Portal"** (with `Users` icon, indigo)
- Subtitle: **"Add allies to build your roster. Send daily gifts, invite them to high-stakes co-op matches, or spectate their live runs in real-time when they are in-match!"**
- Placeholder: **"Enter challenger alias..."** (maxLength 15)
- Button: **"Sync Ally"** (with `UserPlus` icon, indigo)
- Status labels: **"Online"**, **"Idle"**, **"In Match"**, **"Offline"**
- Avatar: 🐍
- Per friend buttons:
  - **"Spectate"** (fuchsia, when in-match, animate-pulse, tooltip: **"Spectate Match"**)
  - **"Invite"** (violet, when online/idle, tooltip: **"Invite to Match"**)
  - **"Gift"** / **"Gifted"** (emerald, tooltip: **"Send Gift"**)
  - Remove (rose, `Trash2` icon, tooltip: **"Dismantle Alliance"**, aria-label: **"Dismantle alliance"**)

### Identity Log Tab
- Info block: **"CHALLENGER REGISTRY LEDGER"** (with `Lock` icon, indigo)
- **"To maintain the integrity of global tournaments, all modifications to nickname tags or regional affiliations are permanently logged to this client audit ledger. Tampering or spoofing database records will immediately reset active tournament streak counts."**
- Empty: **"No handshakes registered yet."**
- Per log entry:
  - **"TAG REGISTERED:"** → old name → **"➜"** → new name
  - **"REGION ALIGNMENT:"** → old country → **"➜"** → new country
  - **"HANDSHAKE TIMESTAMP"** → date + time
  - Status badge: **"VERIFIED"** / **"APPROVED"** / **"FIRST_HANDSHAKE"** (emerald)

### Identity Editor (Handshake Registration Protocol)
- Heading: **"Handshake Registration Protocol"** (with `Lock` icon, animate-pulse, indigo)
- Subtitle: **"Lock down your tournament handle and regional alignment. All changes are logged."**
- Label: **"Challenger Handle"**, Placeholder: **"Enter nickname"**
  - Helper: **"Max 15 characters. System validates non-duplicate handle signatures."**
- Label: **"Faction Region (Flag)"** (country select dropdown)
  - Helper: **"Associates your extraction chips to regional champion rankings."**
  - Format: **"{flag} {name} ({code})"**
- Label: **"Profile Avatar / Identity Emblem"**
  - Drag & drop: **"CHANGE IMAGE"**, **"Drag & Drop or Click"**
  - When preset selected: **"Preset Selected"**, **"Click here to upload custom image instead"**
  - When no avatar: **"Upload Custom Photo"**, **"Drag & Drop or click to browse"**, **"PNG, JPG, WebP up to 1.5MB"**
  - Button: **"Reset to Skin Default"** (with `Trash2`)
  - Label: **"Choose Preset Emblem"** (grid of 8 preset avatars)
- Label: **"Creator Social Channels (Showcased on your Public Profile)"** (with `Globe` icon, purple)
  - Subtitle: **"Link your Instagram handle, YouTube channel, and Twitch profile so other vipers and allies can follow you and watch your game clips!"**
  - Label: **"📸 Instagram Handle"**, Placeholder: **"@username (e.g. @hari_snake_god)"**
  - Label: **"🎥 YouTube Channel / Handle"**, Placeholder: **"@channel or URL"**
  - Label: **"📱 Twitch Stream Handle"**, Placeholder: **"twitch_username"**
- Warning: **"CYBER HANDSHAKE WARNING:"** Changing your registered alias or territory updates global tournament indices. Immutable record logs are appended to the ledger below.
- Buttons: **"Cancel"** (slate), **"Save Handshake"** (with `Check`, indigo)

### Co-Op Invite Modal
- Heading: **"Co-Op Lobby Invite"** (with `Swords`, animate-pulse)
- Subtitle: **"Assemble a squad with your allies"**
- Close: aria-label **"Close modal"**
- Balance cards: **"Your Balance"** / **"{friendName}"**
- Label: **"Select Arena Stakes"**
- Per arena: name + **"Buy-In: {cost} c"**
- Eligibility pills: **"You can't afford"** (rose), **"They can't afford"** (amber), **"Eligible 🤝"** (emerald)
- Speech bubble: **"{name} responds:"** → quoted text
  - Counter button: **"🤝 Accept Proposal & Invite"** (indigo)
- Buttons: **"Cancel"**, **"Send Co-Op Invite"** (violet-to-indigo gradient)

### Security Settings Card
- Heading: **"Security Settings"** (with `Lock`, amber)
- Status: **"🔐 PIN Set"** / **"⚠️ No PIN"**

#### Password
- Label: **"Password"**, description: **"Change your account password"**
- Button: **"Change"** → form:
  - Placeholder: **"Current password"**, **"New password (min 6)"** (minLength 6)
  - Buttons: **"Saving…"** / **"Update Password"**, **"Cancel"**

#### Security PIN
- Label: **"Security PIN"**
- With PIN: description **"Used for password recovery. Keep it safe!"**, button **"Change PIN"**
- Without PIN: description **"Set a 4-digit PIN to enable password recovery."**, button **"Set PIN"**
- Form: Label **"Current PIN"** (if changing), **"New PIN (4 digits)"**
- Placeholders: **"Enter current 4-digit PIN"**, **"Enter new 4-digit PIN"**
- Buttons: **"Saving…"** / **"Update PIN"** / **"Set PIN"**, **"Cancel"**

### Guest Upgrade Banner
- Heading: **"You're playing as a Guest"** (amber)
- Subtitle: **"Upgrade to a registered account to secure your progress. All chips, stats, cosmetics, and friends carry over."**
- Button: **"Upgrade Now"** (with `UserPlus`, amber gradient)

#### Upgrade Form
- Heading: **"Upgrade to Registered Account"**
- Info: **"Your progress is safe. All chips, stats, cosmetics, streaks, friends, and clan memberships carry over. You keep your VENOM tag. Just add an email and password to secure your account."**
- Labels: **"Display Name"** (placeholder **"ViperStrike"**), **"Email"** (placeholder **"you@arena.gg"**), **"Password (min 6 chars)"** (placeholder **"••••••••"**), **"Security PIN (4 digits, optional)"** (placeholder **"e.g. 1234"**)
- Buttons: **"Upgrading…"** / **"Upgrade & Secure Account"** (amber gradient), **"Cancel"**

### Toast Messages
- [error] **"Please select a valid image file."**
- [error] **"Image size exceeds 1.5MB. Please choose a smaller file."**
- [success] **"Custom avatar selected! Save your handshake to lock it in."**
- [success] **"Handshake secure! Profile & Social links saved successfully! 🔒"**
- [error] **"Network error. Please try again."**
- [error] **"Nickname cannot be empty!"**
- [error] **"Nickname must be 15 characters or less."**
- [error] **"Failed to save profile."**
- [error] **"{name} is already in your allied squad list!"**
- [success] **"{name} has been synced into your ally list! 🔗"**
- [info] **"Alliance with {name} dismantled."**
- [success] **"Deposited 25 tactical bonus Chips to {name}! 🎁"**
- [error] **"You do not have enough chips for {name}!"**
- [info] **"Co-op invitation rejected: Insufficient chips. Counter-proposal received!"**
- [success] **"Co-op invite accepted by {name}! Staking buy-in... 🤝⚔️"**
- [info] **"Signed out."**
- [info] **"Switched buy-in to match counter-proposal!"**
- [error] **"Failed to change password."**
- [success] **"Password changed successfully!"**
- [error] **"Network error."**
- [error] **"Failed to change PIN."**
- [success] **"Security PIN updated!"**
- [error] **"Upgrade failed."**
- [success] **"Account upgraded successfully! All progress preserved."**

---

## 7. `leaderboards.tsx` (830 lines) — Lobby Leaderboards

### Imports
- React: `useCallback`, `useEffect`, `useMemo`, `useState`
- `useAuth` from `@/components/providers/auth-provider`
- `COUNTRIES`, `MILESTONE_TIERS`, `MOCK_LEADERBOARD`, `countryFlag`, `countryName`, `milestoneTierForChips`, `InspectedPlayer` from `@/lib/game-config`
- `LeaderboardEntry` from `@/lib/types`
- `GlowBlob`, `MicroLabel`, `PanelSkeleton`, `NotSignedIn`, `notify`, `ToastFn` from `./_panel-primitives`

### Icons (lucide-react)
- `Trophy`, `Crown`, `Globe`, `Medal`, `Zap`, `Search`, `Loader2`, `RefreshCw`, `MapPin`, `Inbox`

### State Variables
- `activeTab` ("summit" | "global" | "national" | "tiers", default "summit")
- `selectedCountry` (string, default "IN")
- `selectedTierId` (string, default "all")
- `countrySearch` (string)
- `liveEntries` (LeaderboardEntry[])
- `loading` (boolean, default true)
- `lastUpdated` (Date | null)

### API Calls
- `GET /api/leaderboard?type=chips&limit=100` (no-store cache)
  - Auto-refreshes every **30 minutes**

### Constants
- `RANK_MEDALS`: {1: **"🥇"**, 2: **"🥈"**, 3: **"🥉"**}
- Seed players: Hari (#IND-001, IN, 10M chips), Apex_Viper (#USA-882, US, 9.4M), K-Snake_Master (#KOR-114, KR, 8.9M), Shadow_Ninja (#JPN-309, JP, 5M), Viper_Zero (#USA-402, US, 2.5M), Rookie_Striker (#IND-104, IN, 1.2M)

### Header
- Badge: **"CURRENT YEAR (2026) CONCURRENT TOURNAMENT"** (amber)
- Badge: **"Live Ranks Update Every 30 Minutes"** (with `Zap` icon, amber)
- Heading: **"Official World Tournament Leaderboards"** (with `Trophy` icon, amber)
- Subtitle: **"Complete real-time standings for World Summit, Global, National, and Milestone Tiers. Click any player row to inspect full profile & rank status!"**
- MicroLabel: **"Last sync: {time} UTC"**
- Button: **"Refresh"** (with `RefreshCw` / `Loader2` icon)

### Your Rank Card
- **"Your Rank"** (MicroLabel, with `Crown`, amber)
- Stats grid:
  - **"Global Rank"** — **"#{rank}"** (amber) or **"N/A"** (slate)
  - **"National Rank"** — **"#{rank}"** (emerald) or **"N/A"** (slate)
  - **"Milestone Badge"** — badge text + tier name
  - **"Banked Chips"** — `{chips}c` (emerald)
  - **"Level"** — number (white)

### Tab Navigation
| ID | Label | Icon | Color |
|----|-------|------|-------|
| summit | **"Summit"** | `Crown` | #f59e0b (amber) |
| global | **"Global"** | `Globe` | #06b6d4 (cyan) |
| national | **"National"** | `MapPin` | #8b5cf6 (violet) |
| tiers | **"Tiers"** | `Medal` | #eab308 (yellow) |

### Summit Tab
- Info: **"WORLD CUP SUMMIT MECHANIC:"** This master leaderboard aggregates ONLY the #1 Ranked Player from each country. Dec 31 midnight UTC #1 wins the World Championship!
- Column headers: **"Global Rank"**, **"Country #1 Champion"**, **"Nation"**, **"Banked Chips"** (right)
- Per row: medal emoji or **"#{rank}"**, **"YOU"** badge (amber), name, **"{tag} · 26 Jul 2026"**, flag + country name, chips
- Empty: `EmptyState` — **"No entries yet"**

### Global Tab
- Counter: **"Total Global Competitors: {count} Players"**
- Loading: **"Loading global ranks…"** (with `Loader2`)
- Column headers: **"Global Rank"**, **"Player & User Tag"**, **"Milestone Badge"**, **"Banked Chips"** (right)
- Per row: medal/number, **"YOU"** badge, flag + name, **"{tag} · 26 Jul 2026"**, badge, chips

### National Tab
- **"Select Country ({197} Countries):"** (with `MapPin`, violet)
- Country dropdown (all `COUNTRIES`)
- Placeholder: **"Search player in country..."**
- Column headers: **"National Rank"**, **"Local Challenger"**, **"Level"**, **"Banked Chips"** (right)
- Per row: medal/number, **"YOU"** badge (violet), flag + name, tag, **"Lvl {level}"** (amber), chips
- Empty: **"No players found for {countryName}"**

### Tiers Tab
- Info: **"MILESTONE TIER RANKING BOARD:"** All players who have reached each chip milestone are ranked from #1 to all joined competitors! Click any player to inspect profile & dossier.
- Tier filter buttons from `ALL_MILESTONE_TIERS`:
  - **"⭐ All"**, **"🛡️ Rookie"** (Below 100K), plus all `MILESTONE_TIERS`
- Column headers: **"Tier Rank"**, **"Player Name & User Tag"**, **"Country"**, **"Banked Chips"** (right)
- Per row: medal/number, **"YOU"** badge (yellow), name, tag, flag + country, chips

### Toast Messages
- [info] **"Leaderboard refreshed."**

---

## 8. `cosmetics-shop.tsx` (2306 lines) — Skins, Trails, Effects

[CODE COMMENT] *"Faithful replica of /upload/extracted/src/components/CosmeticsShop.tsx (1810 lines).
All textual strings — the H2 title, the subtitle, the two view-mode tabs,
the 7 category filters, the 20 preset descriptions, every 'Active/Locked/
Equipped/Equip X/Unlock (N Chips)' button label, the 4-step Pattern Lab,
the TryOnPreview overlay caption 'LAB HOLO-PREVIEW (STEER TO TEST)' and
every toast message — are preserved verbatim from the original audit (AUDIT-C section A)."*

### Imports
- React: `useEffect`, `useRef`, `useState`
- lucide-react: `ArrowLeftRight`, `Check`, `CheckCircle2`, `Flame`, `Lock`, `Paintbrush`, `Palette`, `Plus`, `ShoppingBag`, `Sliders`, `Sparkles`, `Trash2`, `Wand2`
- `useAuth` from `@/components/providers/auth-provider`
- `ALL_COSMETICS`, `Skin` from `@/lib/game-config`
- `PanelSkeleton`, `NotSignedIn`, `notify`, `ToastFn` from `./_panel-primitives`

### State Variables
- `shopView` ("presets" | "editor")
- `activeCategory` ("all" | "presets" | "premium" | "trails" | "deaths" | "flags" | "banners")
- `customState` (CustomSkinState | null, from localStorage `venom_custom_skin_state`)
- `colorSequence` (string[])
- `bodyStyle` (BodyStyle)
- `taperStyle` (TaperStyle)
- `glowEnabled` (boolean)

### API Calls
- `POST /api/player/cosmetic` — body: `{action: 'buy' | 'equip', skinId}`

### 18 Palette Colors
| Name | Hex |
|------|-----|
| Red Alert | #ef4444 |
| Solar Orange | #f97316 |
| Midas Gold | #f59e0b |
| Lime Venom | #84cc16 |
| Acid Green | #22c55e |
| Emerald | #10b981 |
| Teal Void | #0d9488 |
| Cyber Cyan | #06b6d4 |
| Sky Blue | #0ea5e9 |
| Sapphire | #3b82f6 |
| Royal Indigo | #6366f1 |
| Shadow Purple | #a855f7 |
| Orchid Pink | #ec4899 |
| Crimson | #dc2626 |
| Pure White | #ffffff |
| Slate Gray | #64748b |
| Deep Carbon | #1e293b |
| Pitch Black | #090d16 |

### 20 Free Slither Presets
| Name | Emoji | Category | Description |
|------|-------|----------|-------------|
| The Fish Snake | 🐟 | Cyber | Aquatic scales with hydrodynamic dorsal fins and bubble bioluminescence. |
| The Lion Snake | 🦁 | Classic | Golden apex mane headpiece with furious amber predator scales. |
| The Motorbike Snake | 🏍️ | Cyber | Chrome exhaust head, asphalt dark body segments, and burnout smoke trail. |
| The Coin Snake | 🪙 | Classic | Gold dollar medallion crown with stacked casino chip coin segments. |
| Bumblebee stripe | 🐝 | Classic | Classic yellow and black stripes reminiscent of a honey bee. |
| Patriot Streamer | 🇺🇸 | Flags | Brave red, white, and blue colors streaming in perfect unison. |
| Watermelon Slicer | 🍉 | Classic | Sweet pink flesh bordered by alternating deep forest green scales. |
| Tiger Shifter | 🐯 | Classic | Dangerous orange and obsidian bands armed with body-tapering spikes. |
| Mint Candy | 🍬 | Classic | Sweet spearmint and white swirl nodes radiating clean aura. |
| Rainbow Unicorn | 🦄 | Classic | Full visible spectrum of pulsing diamond-crystal nodes. |
| Germany Banner | 🇩🇪 | Flags | Bold black, red, and golden stripes representing national pride. |
| Brazil Samba | 🇧🇷 | Flags | Vibrant green and gold diamond nodes reflecting carnival energy. |
| France Tricolore | 🇫🇷 | Flags | Symmetric blue, white, and red bands of the French Republic. |
| Pride Rainbow | 🏳️‍🌈 | Flags | Classic rainbow flags celebrating diversity and inclusion. |
| Solar Flare | 🔥 | Cyber | Armor scales colored in blazing gold, solar orange, and furnace red. |
| Cosmic Nebula | 🌌 | Cyber | Deep cosmic space colors with pulsing neon aurora bioluminescence. |
| Lava Dreadnought | 🌋 | Cyber | Armored obsidian spikes interspaced with blistering crimson core nodes. |
| Tron Grid | 💻 | Cyber | Futuristic cyan lines on dark background representing grid patterns. |
| Gundam Mech | 🤖 | Cyber | Tactical ironclad grey plates accented with heavy yellow and blue rocket spikes. |
| Golden Dragon | 🐉 | Classic | Shining royal gold armored spike scales fit for mythical emperors. |

### View-Mode Tabs
- **"🎨 Skin & Effect Gallery"** (indigo when active)
- **"🧬 Genetic Pattern Lab"** (purple when active, with `Wand2` icon)

### Category Filter Tabs
| ID | Label |
|----|-------|
| all | **"🌈 All Items"** |
| presets | **"🐍 Ready Presets (Free!)"** |
| premium | **"✨ Premium Shop"** |
| trails | **"💫 Laser Trails"** |
| deaths | **"💥 Death Novas"** |
| flags | **"🇺🇸 Flags"** |
| banners | **"🏆 Profile Banners"** |

### Header
- Heading: **"Identity Workshop & Skin Gallery"** (with `ShoppingBag`, indigo)
- Subtitle: **"Browse and equip real-time wiggling skins, luminous laser trails, or customize your own custom repeating venom snake DNA blueprint!"**

### Genetic Pattern Lab

#### Preview Overlay
- **"LAB HOLO-PREVIEW (STEER TO TEST)"** (indigo, mono, uppercase, animate-pulse)

#### Projector Details Card
- MicroLabel: **"GENETIC PROFILE STATS"** (indigo, mono)
- Heading: **"Pattern DNA Engine"** (with `Palette`, purple)
- Text: **"Your stripe nodes loop continuously as your snake grows in the arena. You can tweak color order, skin geometries, tapering physics, and aurora bioluminescence before deploying!"**
- Stats: **"NODES: {count} nodes"** (purple), **"GLOW: ENABLED"** / **"GLOW: DISABLED"**
- Button (deployed): **"DNA DEPLOYED & EQUIPPED (ACTIVE)"** (with `CheckCircle2`, animate-bounce, emerald)
- Button (not deployed): **"DEPLOY TO BATTLE-ARENA"** (with `Wand2`, purple)

#### STEP 1 — Construct Stripe Sequence
- Label: **"STEP 1"** (mono, uppercase)
- Heading: **"Construct Stripe Sequence"** (with `Paintbrush`, indigo)
- Text: **"Click any palette color below to append it to the tail sequence. Click any crown node inside the wiggling strip to erase it."** (indigo highlight)
- Palette tooltips: **"Add {colorName}"**
- Node tooltip: **"Click to erase node"**
- Helper buttons: **"Double Sequence Length"** (with `Plus`), **"Mirror Symmetrically"** (with `ArrowLeftRight`), **"🎲 Mutate DNA"** (purple), **"Reset"** (with `Trash2`, rose)

#### STEP 2 — Choose Segment Geometry
- Label: **"STEP 2"** (mono, uppercase)
- Heading: **"Choose Segment Geometry"** (with `Sliders`, indigo)

| Option | Label | Description |
|--------|-------|-------------|
| smooth | **"Smooth Circles"** | Standard sleek nodes |
| dragon | **"Dragon Scales"** | Alternating jagged spikes |
| armored | **"Armored Plates"** | Futuristic squad blocks |
| crystal | **"Crystal Shards"** | Alternating shiny gems |
| obsidian | **"Spiky Obsidian"** | Full high-threat spikes |
| basilisk | **"Basilisk Diamonds"** | Pointy royal nodes |

#### STEP 3 — Body Taper Physics
- Label: **"STEP 3"** (mono, uppercase)
- Heading: **"Body Taper Physics"**
- Text: **"Configure snake tail scaling density styles."**

| Option | Label |
|--------|-------|
| natural | **"Natural Taper"** |
| uniform | **"Uniform Width"** |
| wave | **"Sinuous Wave"** |
| heavy | **"Heavy Head"** |

#### STEP 4 — Bioluminescent Aura
- Label: **"STEP 4"** (mono, uppercase)
- Heading: **"Bioluminescent Aura"**
- Text: **"Toggle active radioactive body node shading glow in battle arenas."**
- Toggle label: **"Neon Glow"**, description: **"Emit high-vis plasma light"**
- aria-label: **"Toggle neon glow"**

### Card Sub-Components

#### Badges
- **"Active"** (with `Check`, indigo/emerald)
- **"Locked"** (with `Lock`, amber)

#### PresetCard
- Button states: **"Equipped"** (indigo, disabled) / **"Equip Preset"** (slate → indigo on hover)

#### SkinCard
- Equip label: **"Equip Skin"**
- Button states: **"Equipped"** / **"Equip Skin"** / **"Unlock ({cost} Chips)"** (with `Sparkles`)

#### TrailCard
- Equip label: **"Equip Trail"**

#### DeathCard
- Equip label: **"Equip Nova"**

#### FlagCard
- Equip label: **"Equip Flag"**

#### BannerCard
- Equip label: **"Equip Banner"**

#### UnlockFooter (shared)
- States: **"Equipped"** / `{equipLabel}` / **"Unlock ({cost} Chips)"**

### Toast Messages
- [error] **"Network error. Please try again."**
- [success] **"Equipped Body Skin: {name}"**
- [error] **"You need {cost} chips to unlock {name}! Play matches to earn chips."**
- [success] **"Unlocked & Equipped {name}! -{cost} CHIPS"**
- [success] **"Injected DNA: {name}! Equipped in Battle Arena."**
- [success] **"Equipped Trail Effect: {name}"**
- [error] **"You need {cost} chips to unlock this trail!"**
- [success] **"Unlocked & Equipped Trail: {name}! -{cost} CHIPS"**
- [success] **"Equipped Death Effect: {name}"**
- [error] **"You need {cost} chips to unlock this death effect!"**
- [success] **"Unlocked & Equipped Death Nova: {name}! -{cost} CHIPS"**
- [success] **"Equipped Flag: {name}"**
- [error] **"You need {cost} chips to unlock this flag!"**
- [success] **"Unlocked & Equipped Flag: {emoji} {name}! -{cost} CHIPS"**
- [success] **"Equipped Profile Banner: {name}"**
- [error] **"You need {cost} chips to unlock this profile banner!"**
- [success] **"Unlocked & Equipped Profile Banner: {name}! -{cost} CHIPS"**
- [error] **"Maximum 24 segments in stripe pattern!"**
- [error] **"Stripe sequence must have at least 1 color node!"**
- [info] **"Sequence reset."**
- [error] **"Sequence too long to double!"**
- [error] **"Sequence too long to mirror!"**
- [success] **"Mutated new genetic chain!"**
- [error] **"Choose at least 1 color node before deploying!"**
- [success] **"🧪 Genetic Custom Segment deployed! Equipped in Battle Arena."**
- [error] **"Action failed."**

---

## 9. `clan-system.tsx` (784 lines) — Clan Management

### Imports
- React: `useEffect`, `useState`
- `useAuth` from `@/components/providers/auth-provider`
- Config imports for clans
- `notify`, `ToastFn`, `GlowBlob`, `MicroLabel`, `NotSignedIn` from `./_panel-primitives`

### State Variables
- `clan` (clan data from API)
- `clanMembers` (member[])
- `loading` (boolean)
- `depositAmount` (string)
- `depositing` (boolean)
- `chatMessages` (message[])
- `chatInput` (string)
- `broadcastInput` (string)
- `searchQuery` (string)
- `allClans` (clan[])
- `showCreate` (boolean)
- `formName` (string)
- `formTag` (string)
- `formDesc` (string)
- `selectedEmblem` (string)

### API Calls
- `GET /api/clan`
- `POST /api/clan/join` — body: `{clanId}`
- `POST /api/clan/leave`
- `POST /api/clan/deposit` — body: `{amount}`
- `POST /api/clan/chat` — body: `{message}`
- `GET /api/clan/search?query=...`
- `POST /api/clan/create` — body: `{name, tag, description, emblem}`

### Not in Clan State
- Heading: **"You are not in a Viper Clan"** (with icon)

### In Clan — Stats Row
- MicroLabels: **"YOUR RANK"**, **"MEMBERS"**, **"CLAN LEVEL"**
- Vault section: placeholder **"Amt (e.g. 100)"**, button **"Deposit"**
- **"Max Capacity: 30"** (MicroLabel)
- Members list with **"LEADER"** badge
- Chat: placeholder **"Type a message for your clan..."**, button **"Send"**
- Broadcast section

### Clan Search
- Placeholder: **"Search clans by name or tag..."**
- Empty: **"No Clans Found"** (h3)
- Per clan: MicroLabels **"LEVEL"**, **"MEMBERS"**, **"TREASURY"**

### Create Clan Form
- Label: **"Syndicate Name"**, placeholder **"e.g. Omega Extractions"**
- Label: **"Clan Tag (3-5 Chars, Letters/Numbers)"**, placeholder **"e.g. OMG"**
- Label: **"Syndicate Description"**, placeholder **"e.g. Extraction above all else."**
- Label: **"Emblem Logo"** — preset emblem grid
- Cost: **"Free"** (span)

### Toast Messages
- [error] **"You are already in a clan! Leave your current clan first."**
- [error] **"Network error joining clan."**
- [error] **"Network error leaving clan."**
- [error] **"Enter a valid deposit amount."**
- [error] **"Insufficient chips to deposit."**
- [error] **"You must be in a clan to deposit."**
- [error] **"Network error depositing chips."**
- [success] **"Broadcast posted to clan chat! 📢"**
- [error] **"Network error sending broadcast."**
- [error] **"Syndicate Name and Clan Tag are required."**
- [error] **"Leave your current clan before forming a new one."**
- [error] **"Network error creating clan."**

---

## 10. `season-pass.tsx` (254 lines) — Battle Pass

### Imports
- React: `useEffect`, `useState`
- `useAuth` from `@/components/providers/auth-provider`
- Season pass config
- `notify`, `ToastFn`, `GlowBlob`, `PanelSkeleton`, `NotSignedIn` from `./_panel-primitives`

### State Variables
- `isElite` (boolean)
- `busy` (boolean)

### API Calls
- `POST /api/season-pass/claim` — body: `{tierId, track}`
- `POST /api/season-pass/buy-elite`

### UI Elements
- Banner: aria-label **"Season banner"**
- Track labels: **"FREE TRACK"** (with **"CLAIMED"** state), **"ELITE TRACK"** (with **"Requires Elite Pass"** state)
- Tier grid: aria-label **"Reward tiers"**

### Toast Messages
- [error] **"1,00,000 Banked Chips required for Elite Cyber Pass!"**
- [success] **"ELITE CYBER PASS UNLOCKED! Enjoy 3x Rewards & Exclusive Skins! 👑"**
- [error] **"Unlock Elite Cyber Pass to claim premium rewards!"**

---

## 11. `hall-of-fame.tsx` (542 lines) — Hall of Fame

### Imports
- React: `useState`
- `useAuth` from `@/components/providers/auth-provider`
- Hall of fame config
- `notify`, `ToastFn`, `GlowBlob`, `PanelSkeleton`, `NotSignedIn`, `MicroLabel` from `./_panel-primitives`

### State Variables
- `tickerFilter` (string)

### UI Elements
- **"PERMANENT MILESTONE IMMORTALITY"** (strong, uppercase)
- **"Milestone Year:"** (span)
- MicroLabel: **"Total Qualifiers This Year:"**
- MicroLabel: **"Threshold"**
- **"Country Leaderboard:"** (span)

#### Country Leaderboard Columns
| Column | Header |
|--------|--------|
| Rank | **"Rank"** |
| Challenger | **"Challenger"** |
| User Tag | **"User Tag"** |
| Banked Chips | **"Banked Chips"** |
| Level | **"Level"** |
| Action | **"Action"** |
- **"NATIONAL CHAMP"** (span, on #1)

#### Channel Filter
- Label: **"Channel Filter:"**
- Empty: **"No events in this channel yet…"**

#### Event Table (modal)
- Close: aria-label **"Close"**
| Column | Header |
|--------|--------|
| Tier Rank | **"Tier Rank"** |
| Immortal Achiever | **"Immortal Achiever"** |
| (no User Tag column header in code) | — |
| Achieved On | **"Achieved On"** |
| Qualifying Chips | **"Qualifying Chips"** |
| Action | **"Action"** |
- **"👑 #1 First"** (span, on top achiever)

---

## 12. `championships.tsx` (440 lines) — Championship Events

### Imports
- React: `useState`
- `useAuth` from `@/components/providers/auth-provider`
- Championship config
- `notify`, `ToastFn`, `GlowBlob`, `PanelSkeleton`, `NotSignedIn`, `MicroLabel` from `./_panel-primitives`

### State Variables
- `registered` (boolean)
- `filter` (string, default "all")
- `chips` (number)
- `games` (number)

### API Calls
- `POST /api/championship/register`
- `POST /api/championship/play`

### UI Elements
- MicroLabel: **"COMPETING WALLET CHIPS"**
- Text: **"Max chips at year-end decides rank!"**
- MicroLabel: **"STATUS"**
- **"Awarded automatically on 01 January"** (span)

#### Contenders Table
- Label: **"Rank Filter:"**
| Column | Header |
|--------|--------|
| Rank | **"Rank"** |
| Contender Name | **"Contender Name"** |
| User Tag | **"User Tag"** |
| Games | **"Games"** |
| Wallet Chips | **"Wallet Chips"** |
| Projected Jan 1 Payout | **"Projected Jan 1 Payout"** |
| HOF | **"HOF"** |
- Empty: **"No contenders match the current filters."**
- **"YOU"** badge (on self)

### Toast Messages
- [success] **"🏆 REGISTERED FOR 2026 ANNUAL VENOM WORLD CHAMPIONSHIP! You have 10,000 matches limit. Good luck!"**
- [error] **"Register first to play championship matches!"**
- [error] **"You have reached the 10,000 championship match cap for this year!"**
- [info] **"Entering Championship High-Stakes Arena match..."**

---

## 13. `admin-panel.tsx` (488 lines) — Admin Configuration

### Imports
- React: `useState`, `useEffect`
- `useAuth` from `@/components/providers/auth-provider`
- Admin config
- `notify`, `ToastFn`, `PanelSkeleton`, `NotSignedIn`, `MicroLabel` from `./_panel-primitives`

### State Variables
- `authenticated` (boolean)
- `code` (string)
- `busy` (boolean)
- `targetTag` (string)
- `amount` (string)
- `broadcastMsg` (string)
- `diagnostics` ({sockets, rooms, transactions})
- `searchQuery` (string)
- `onlinePlayers` (player[])

### API Calls
- `POST /api/admin/verify` — body: `{code}`
- `POST /api/admin/adjust-chips` — body: `{userTag, amount}`
- `POST /api/admin/ban` — body: `{userTag}`
- `POST /api/admin/broadcast` — body: `{message}`
- `GET /api/admin/diagnostics`
- `GET /api/admin/online-players`

### Access Denied
- Heading: **"Access Denied"** (h3)
- Text: **"admin"** (span)

### Authenticated State
- Heading: **"Central Operations Gate"** (h3)
- Placeholder: **"Operations Code"**

### System Diagnostics
- Heading: **"System Diagnostics"** (h3)
- Refresh: aria-label **"Refresh stats"**
- **"Connected Sockets"** (span)
- **"Active Rooms"** (span)

### Global Intercom Broadcast
- MicroLabel: **"Global Intercom Broadcast"**
- Placeholder: **"Announce to all active matches..."**
- Send button (implied)

### Syslog Monitor
- **"SYSLOG MONITOR"** (span)
- Empty: **"No recent transactions..."**

### Live Operations Roster
- Heading: **"Live Operations Roster"** (h3)
- Placeholder: **"Search by name or userTag..."**
- **"YOU"** badge on self
- Per player tooltips:
  - **"Toggle Mute Player"**
  - **"Kick Connection"**
  - **"Ban UserTag Permanently"**

### Economy Ledger Overrides
- **"Economy Ledger Overrides"** (span)
- **"Target:"** (span/label)
- Placeholder: **"Player Tag (e.g. STRK-8291)"**
- Placeholder: **"Amount (+/- e.g. 5000)"**
- Button: **"Adjust"** (implied)

### Toast Messages
- [error] **"Invalid operations code."**
- [success] **"Admin credentials verified!"**
- [error] **"Select a player first."**
- [error] **"Amount must be a non-zero number."**
- [error] **"Failed to adjust player chips."**
- [error] **"Network error during ban action."**
- [success] **"Global admin broadcast sent!"**

---

## 14. `clip-showcase.tsx` (269 lines) — Clip/Video Showcase

### Imports
- React: `useState`
- `useAuth` from `@/components/providers/auth-provider`
- Clip config
- `notify`, `ToastFn`, `PanelSkeleton`, `NotSignedIn`, `MicroLabel` from `./_panel-primitives`

### State Variables
- `title` (string)
- `platform` (string, default "youtube")
- `chips` (string)
- `url` (string)
- `submitting` (boolean)
- `clips` (clip[])

### API Calls
- `GET /api/clips`
- `POST /api/clips` — body: `{title, platform, chips, url}`

### UI Elements
- Video overlay: **"CLICK TO PLAY"** (p tag)
- Publish form:
  - MicroLabel: **"Clip Title"**, Placeholder: **"e.g. INSANE 1V2 EXTRACTION CLUTCH!"**
  - MicroLabel: **"Platform"**
  - Options: **"YouTube"**, **"Twitch"**
  - MicroLabel: **"Extracted Chips (c)"**, Placeholder: **"e.g. 2500000"**
  - MicroLabel: **"Video URL"**, Placeholder: **"https://youtube.com/watch?v=..."**

### Toast Messages
- [error] **"Clip Title and Video URL are required."**
- [success] **"Game Clip published to Esports Highlights feed! 🎬"**

---

## 15. `player-inspector-modal.tsx` (560 lines) — Player Inspector Popup

### Imports
- React: `useEffect`, `useState`
- `useAuth` from `@/components/providers/auth-provider`
- Inspector config
- `notify`, `ToastFn`, `GlowBlob`, `PanelSkeleton`, `NotSignedIn`, `MicroLabel` from `./_panel-primitives`

### State Variables
- `clanMembers` (member[])
- `globalAllies` (ally[])
- `regionalAllies` (ally[])
- `milestoneBadges` (badge[])
- `verifiedHandles` (handle[])

### API Calls
- `GET /api/player/inspect?tag={userTag}`
- `GET /api/clan/{clanTag}/members`
- `GET /api/leaderboard?type=chips&limit=10`
- `GET /api/leaderboard?type=chips&country={country}&limit=10`

### Modal Header
- Close: aria-label **"Close inspector"**
- **"Ledger Tag: "{userTag}"** (strong)

### Clan Section
- **"Active Member"** (span, if in clan) / **"Member"** (if not)
- Empty (regional): **"No regional allies found on the leaderboard."**
- Empty (global): **"No global allies found on the leaderboard."**

### Verified Handles Section
- **"Verified Handles"** (span)

### Milestone Badges Section
- Empty: **"No milestone badges earned yet."**

### Real-Time Sync Section
- **"Real-Time Sync"** (span)
- **"Global World Rank"** (span)
- **"Regional Arena Rank"** (span)

---

## Cross-File Summary: All Icons Used

| Icon | Files Used In |
|------|--------------|
| `ChevronRight` | arena-selector |
| `Filter` | arena-selector |
| `Landmark` | arena-selector, chip-store, player-profile |
| `Play` | arena-selector |
| `Shield` | arena-selector, social-panel, player-profile, hall-of-fame |
| `Swords` | arena-selector, social-panel, player-profile |
| `Trophy` | arena-selector, player-profile, leaderboards |
| `Users` | arena-selector, social-panel, player-profile |
| `Zap` | arena-selector, leaderboards |
| `Coins` | chip-store, social-panel |
| `Loader2` | chip-store, daily-rewards, social-panel, leaderboards |
| `Sparkles` | daily-rewards, cosmetics-shop |
| `Info` | chip-store |
| `ShieldAlert` | chip-store |
| `CreditCard` | chip-store |
| `Lock` | chip-store, cosmetics-shop, player-profile, clan-system |
| `Gift` | daily-rewards, social-panel |
| `Video` | chip-store |
| `UserPlus` | social-panel, player-profile |
| `Globe` | social-panel, player-profile |
| `Eye` | social-panel, player-profile |
| `Send` | social-panel |
| `X` | social-panel, player-profile, cosmetics-shop |
| `Check` | daily-rewards, cosmetics-shop, social-panel, player-profile |
| `MessageSquare` | social-panel |
| `Search` | social-panel, leaderboards, clan-system, admin-panel |
| `Plus` | social-panel, cosmetics-shop |
| `LogOut` | social-panel, player-profile |
| `Award` | social-panel, player-profile |
| `Clock` | player-profile |
| `Compass` | player-profile |
| `Edit2` | player-profile |
| `RefreshCw` | player-profile, leaderboards |
| `Skull` | player-profile |
| `Target` | player-profile |
| `Trash2` | player-profile, cosmetics-shop |
| `Upload` | player-profile |
| `ArrowLeftRight` | cosmetics-shop |
| `CheckCircle2` | cosmetics-shop |
| `Flame` | cosmetics-shop |
| `Paintbrush` | cosmetics-shop |
| `Palette` | cosmetics-shop |
| `ShoppingBag` | cosmetics-shop |
| `Sliders` | cosmetics-shop |
| `Wand2` | cosmetics-shop |
| `Crown` | leaderboards |
| `Medal` | leaderboards |
| `MapPin` | leaderboards |
| `Inbox` | leaderboards |
| `Calendar` | daily-rewards |

## Cross-File Summary: All API Endpoints Referenced

| Endpoint | Method | Files |
|----------|--------|-------|
| `/api/arena-stats` | GET | arena-selector |
| `/api/chips/pack` | POST | chip-store |
| `/api/player/promo-reward` | POST | chip-store |
| `/api/player/video-reward` | POST | chip-store |
| `/api/player/daily` | POST | daily-rewards |
| `/api/friends/list` | GET | social-panel |
| `/api/friends/request` | POST | social-panel |
| `/api/friends/remove` | POST | social-panel |
| `/api/friends/accept` | POST | social-panel |
| `/api/leaderboard` | GET | social-panel, leaderboards, player-inspector-modal |
| `/api/player` | PUT | player-profile |
| `/api/player/cosmetic` | POST | cosmetics-shop |
| `/api/auth/change-password` | POST | player-profile |
| `/api/auth/change-pin` | POST | player-profile |
| `/api/auth/upgrade` | POST | player-profile |
| `/api/clan` | GET | clan-system |
| `/api/clan/join` | POST | clan-system |
| `/api/clan/leave` | POST | clan-system |
| `/api/clan/deposit` | POST | clan-system |
| `/api/clan/chat` | POST | clan-system |
| `/api/clan/search` | GET | clan-system |
| `/api/clan/create` | POST | clan-system |
| `/api/season-pass/claim` | POST | season-pass |
| `/api/season-pass/buy-elite` | POST | season-pass |
| `/api/championship/register` | POST | championships |
| `/api/championship/play` | POST | championships |
| `/api/admin/verify` | POST | admin-panel |
| `/api/admin/adjust-chips` | POST | admin-panel |
| `/api/admin/ban` | POST | admin-panel |
| `/api/admin/broadcast` | POST | admin-panel |
| `/api/admin/diagnostics` | GET | admin-panel |
| `/api/admin/online-players` | GET | admin-panel |
| `/api/clips` | GET | clip-showcase |
| `/api/clips` | POST | clip-showcase |
| `/api/player/inspect` | GET | player-inspector-modal |
| `/api/clan/{tag}/members` | GET | player-inspector-modal |

---

09-page-shell.md
===
# 09 — Page Shell (`src/app/page.tsx`) Exhaustive Catalog

**Source file:** `/tmp/venom-arena/src/app/page.tsx` — 1054 lines
**Component:** `Home` (default export) + `BentoGate` (local helper component)

---

## 1. File Header & Code Comments

| Line(s) | Text | Category |
|---------|------|----------|
| 1 | `'use client'` | [CODE COMMENT] Directive: client-side rendering |
| 3–15 | Block comment (see below) | [CODE COMMENT] Design intent |

**Full block comment (lines 3–15):**

> Venom Arena — main app shell (BUILD-6).
>
> Replicates the dark slate + indigo AAA dashboard from the original
> `upload/extracted/src/App.tsx` while wiring into the new server-
> authoritative BUILD-2/3/4 stack:
>   - `useAuth()` for player data + logout
>   - `<GameCanvas />` (BUILD-3) when an arena is active
>   - 12 lobby panels (Bento Gates) + sub-page tab system + GameRulesModal
>
> Layout: sticky header → main (dashboard OR sub-page nav + content) →
> sticky footer (`min-h-screen flex flex-col` + `mt-auto`).

| Line | Text | Category |
|------|------|----------|
| 64–66 | `// Types` | [CODE COMMENT] Section divider |
| 121 | `// Challenges are fetched from the server — no more hardcoded INITIAL_MISSIONS.` | [CODE COMMENT] Design intent |
| 123–125 | `// Component` | [CODE COMMENT] Section divider |
| 150 | `// Filter tabs by admin role (must run before any early return).` | [CODE COMMENT] Design intent |
| 156–158 | `// Handlers` | [CODE COMMENT] Section divider |
| 160 | `// Fetch challenges from the server` | [CODE COMMENT] Design intent |
| 173 | `// Silently fail — challenges are non-critical` | [CODE COMMENT] Error-handling intent |
| 179 | `// Fetch challenges on mount and when player changes` | [CODE COMMENT] Design intent |
| 199 | `// Refresh player profile so header chips reflect the new bank balance.` | [CODE COMMENT] Design intent |
| 201 | `// Re-fetch challenges to see any progress updates` | [CODE COMMENT] Design intent |
| 254–256 | `// Loading / Auth / Game-canvas gates` | [CODE COMMENT] Section divider |
| 281–283 | `// XP progress (proper curve via xpForLevel)` | [CODE COMMENT] Design intent |
| 291–293 | `// Render` | [CODE COMMENT] Section divider |
| 297 | `{/* ============= HEADER ============= */}` | [CODE COMMENT] Section divider |
| 392 | `{/* ============= MAIN ============= */}` | [CODE COMMENT] Section divider |
| 394 | `{/* ========== DASHBOARD TAB ========== */}` | [CODE COMMENT] Section divider |
| 397 | `{/* LEFT COLUMN: Hero + Bento gates (8 cols) */}` | [CODE COMMENT] Layout note |
| 399 | `{/* Hero banner */}` | [CODE COMMENT] Layout note |
| 414 | `{/* XP progress bar */}` | [CODE COMMENT] Layout note |
| 440 | `{/* Bento grid of lobby stations */}` | [CODE COMMENT] Layout note |
| 447 | `{/* Gate 1: Play Endless Arenas */}` | [CODE COMMENT] Gate number |
| 459 | `{/* Gate 2: Identity Workshop & Shop */}` | [CODE COMMENT] Gate number |
| 471 | `{/* Gate 3: Challenger Dossier */}` | [CODE COMMENT] Gate number |
| 483 | `{/* Gate 4: Global Standings */}` | [CODE COMMENT] Gate number |
| 495 | `{/* Gate 5: Daily Free Claims */}` | [CODE COMMENT] Gate number |
| 507 | `{/* Gate 6: Virtual Chip Store */}` | [CODE COMMENT] Gate number |
| 519 | `{/* Gate 7: Championships */}` | [CODE COMMENT] Gate number |
| 531 | `{/* Gate 8: Hall of Fame */}` | [CODE COMMENT] Gate number |
| 543 | `{/* Gate 9: Syndicates */}` | [CODE COMMENT] Gate number |
| 555 | `{/* Gate 10: Season Pass */}` | [CODE COMMENT] Gate number |
| 567 | `{/* Gate 11: Highlights */}` | [CODE COMMENT] Gate number |
| 579 | `{/* Gate 12: Friends, Global Search & Syndicate Hub (wide) */}` | [CODE COMMENT] Gate number |
| 595 | `{/* RIGHT COLUMN: Tactical Challenges (4 cols) */}` | [CODE COMMENT] Layout note |
| 640 | `{/* Daily Challenges */}` | [CODE COMMENT] Sub-section |
| 715 | `{/* Weekly Challenges */}` | [CODE COMMENT] Sub-section |
| 792 | `{/* Last-match summary */}` | [CODE COMMENT] Sub-section |
| 820 | `{/* ========== SUB-PAGE NAV + CONTENT ========== */}` | [CODE COMMENT] Section divider |
| 823 | `{/* Top nav: back button + breadcrumb + tab strip */}` | [CODE COMMENT] Layout note |
| 840 | `{/* Horizontal scrollable tab strip */}` | [CODE COMMENT] Layout note |
| 865 | `{/* Tab content */}` | [CODE COMMENT] Sub-section |
| 886 | `{/* ============= FOOTER ============= */}` | [CODE COMMENT] Section divider |
| 899 | `{/* ============= MODALS ============= */}` | [CODE COMMENT] Section divider |
| 906–908 | `// Bento gate card (dashboard quick-link)` | [CODE COMMENT] Component purpose |

---

## 2. Imports

### 2.1 React Hooks

| Import | Source |
|--------|--------|
| `useCallback` | `'react'` |
| `useEffect` | `'react'` |
| `useMemo` | `'react'` |
| `useState` | `'react'` |

### 2.2 External Libraries

| Import | Source | Purpose |
|--------|--------|---------|
| `toast` | `'sonner'` | Toast notification system |

### 2.3 Lucide React Icons (20 icons)

| Icon Name | Usage Location |
|-----------|---------------|
| `Compass` | Logo icon (header); Gate 1 icon; Tab 1 (arena) icon |
| `Shield` | Gate 9 icon; Tab 7 (clans) icon; Tab 13 (admin) icon |
| `User` | Gate 3 icon; Tab 3 (profile) icon |
| `Trophy` | Gate 4 icon; Tab 4 (leaderboard) icon |
| `Gift` | Gate 5 icon; Tab 10 (rewards) icon |
| `ShoppingBag` | Gate 2 icon; Tab 2 (shop) icon |
| `Coins` | Header chips wallet; Gate 6 icon; Tab 11 (store) icon |
| `Sparkles` | Gate 10 icon; Tab 8 (seasonpass) icon; Challenges fallback icon (when streak ≤ 1) |
| `Users` | Gate 12 icon; Tab 12 (social) icon |
| `ChevronLeft` | Sub-page back button icon |
| `Play` | Hero banner "LAUNCH MATCHMAKER" button icon |
| `ListTodo` | Tactical Challenges panel heading icon |
| `Award` | Hero banner icon; Gate 8 icon; Tab 6 (halloffame) icon |
| `LogOut` | Header sign out button icon |
| `Film` | Gate 11 icon; Tab 9 (clips) icon |
| `BookOpen` | Header "Rules & Guide" button icon |
| `Crown` | Gate 7 icon; Tab 5 (championships) icon |
| `Loader2` | Loading screen spinner; Challenges loading spinner |
| `Sunrise` | Daily Challenges section icon |
| `Star` | Weekly Challenges section icon |

### 2.4 Internal Component Imports (16 components)

| Import | Source Path |
|--------|-------------|
| `useAuth` | `@/components/providers/auth-provider` |
| `AuthGate` | `@/components/auth/auth-gate` |
| `GameCanvas` | `@/components/game/game-canvas` |
| `ArenaSelector` | `@/components/panels/arena-selector` |
| `CosmeticsShop` | `@/components/panels/cosmetics-shop` |
| `PlayerProfilePanel` | `@/components/panels/player-profile` |
| `Leaderboards` | `@/components/panels/leaderboards` |
| `DailyRewards` | `@/components/panels/daily-rewards` |
| `ChipStore` | `@/components/panels/chip-store` |
| `SocialPanel` | `@/components/panels/social-panel` |
| `ClanSystem` | `@/components/panels/clan-system` |
| `HallOfFame` | `@/components/panels/hall-of-fame` |
| `Championships` | `@/components/panels/championships` |
| `SeasonPass` | `@/components/panels/season-pass` |
| `ClipShowcase` | `@/components/panels/clip-showcase` |
| `AdminPanel` | `@/components/panels/admin-panel` |
| `PlayerInspectorModal` | `@/components/panels/player-inspector-modal` |
| `GameRulesModal` | `@/components/modals/game-rules-modal` |

### 2.5 Utility / Type Imports

| Import | Source Path | Kind |
|--------|-------------|------|
| `xpForLevel` | `@/lib/game-config` | Function |
| `InspectedPlayer` (type) | `@/lib/game-config` | Type |
| `MatchResult` (type) | `@/lib/types` | Type |

---

## 3. Type Definitions

### 3.1 `TabId` (union type, line 68–82)

Literal values (14 total):

| # | Value | Panel Component |
|---|-------|-----------------|
| 1 | `'dashboard'` | Inline dashboard (no panel component) |
| 2 | `'arena'` | `ArenaSelector` |
| 3 | `'shop'` | `CosmeticsShop` |
| 4 | `'profile'` | `PlayerProfilePanel` |
| 5 | `'leaderboard'` | `Leaderboards` |
| 6 | `'championships'` | `Championships` |
| 7 | `'halloffame'` | `HallOfFame` |
| 8 | `'clans'` | `ClanSystem` |
| 9 | `'seasonpass'` | `SeasonPass` |
| 10 | `'clips'` | `ClipShowcase` |
| 11 | `'rewards'` | `DailyRewards` |
| 12 | `'store'` | `ChipStore` |
| 13 | `'social'` | `SocialPanel` |
| 14 | `'admin'` | `AdminPanel` |

### 3.2 `Mission` (interface, lines 84–95)

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | |
| `type` | `'daily' \| 'weekly'` | Challenge category |
| `title` | `string` | Displayed as `<h4>` |
| `description` | `string` | Displayed as paragraph |
| `reward` | `number` | Chips rewarded |
| `target` | `number` | Goal threshold |
| `current` | `number` | Progress toward goal |
| `completed` | `boolean` | Whether goal is met |
| `claimed` | `boolean` | Whether reward has been collected |
| `periodStart` | `string` | ISO date string |

### 3.3 `TabDef` (interface, lines 97–103)

| Field | Type | Notes |
|-------|------|-------|
| `id` | `TabId` | |
| `label` | `string` | Sidebar/tab button label text |
| `icon` | `typeof Compass` | Lucide icon component |
| `activeColor` | `string` | Tailwind classes when active |
| `adminOnly?` | `boolean` | If true, only visible to admins |

### 3.4 `BentoGateProps` (interface, lines 910–920)

| Field | Type | Notes |
|-------|------|-------|
| `icon` | `typeof Compass` | |
| `accent` | `'indigo' \| 'purple' \| 'blue' \| 'amber' \| 'yellow' \| 'emerald' \| 'violet' \| 'red' \| 'cyan' \| 'rose' \| 'pink'` | 11 possible accent values |
| `badge` | `string` | Top-right badge text |
| `title` | `string` | Card title |
| `desc` | `string` | Card description |
| `footLeft` | `string` | Footer left text |
| `footRight` | `string` | Footer right text (arrow → appended) |
| `onClick` | `() => void` | Navigation handler |
| `wide?` | `boolean` | If true, spans 2 columns |

---

## 4. State Management

All state lives in `useState` / `useMemo` / `useCallback` within the `Home` component. No external Zustand store is imported or used in this file.

| Variable | Type | Initial Value | Purpose |
|----------|------|---------------|---------|
| `player` | (from `useAuth()`) | — | Player profile data |
| `loading` | (from `useAuth()`) | — | Auth loading state |
| `logout` | (from `useAuth()`) | — | Logout function |
| `refresh` | (from `useAuth()`) | — | Refresh player data function |
| `activeTab` | `TabId` | `'dashboard'` | Current active navigation tab |
| `activeArenaId` | `string \| null` | `null` | If set, game canvas is shown |
| `isRulesOpen` | `boolean` | `false` | Controls GameRulesModal visibility |
| `missions` | `Mission[]` | `[]` | Challenge list from server |
| `challengesLoading` | `boolean` | `false` | Challenges fetch in progress |
| `challengeStreak` | `number` | `0` | Consecutive daily challenge days |
| `streakMultiplier` | `number` | `1` | Streak bonus multiplier |
| `challengeTier` | `string` | `''` | Player challenge tier name |
| `lastResult` | `MatchResult \| undefined` | `undefined` | Most recent match result |
| `inspectedPlayer` | `InspectedPlayer \| null` | `null` | Player inspector modal data |
| `toastFn` | `(msg: string, type?: 'success' \| 'error' \| 'info') => void` | Lazy-initialized wrapper around `sonner.toast` | Standardized toast for child panels |

### Derived / Memoized Values

| Variable | Derivation | Purpose |
|----------|-----------|---------|
| `visibleTabs` | `TABS.filter(t => !t.adminOnly \|\| player?.role === 'admin')` | Tabs visible to current user |
| `xpThisLevel` | `xpForLevel(player.level)` | XP required for current level |
| `xpNextLevel` | `xpForLevel(player.level + 1)` | XP required for next level |
| `xpIntoLevel` | `Math.max(0, player.xp - xpThisLevel)` | XP progress into current level |
| `xpSpan` | `Math.max(1, xpNextLevel - xpThisLevel)` | Total XP range for current level |
| `xpPercent` | `Math.min(100, Math.floor((xpIntoLevel / xpSpan) * 100))` | XP bar fill percentage |

---

## 5. Sidebar / Tab Definitions — `TABS` Array (exact order)

The `TABS` array defines 13 entries (12 visible to all users + 1 admin-only). The order below is the **exact source order**:

| # | `id` | Label | Icon | Active Color Classes | `adminOnly` |
|---|------|-------|------|---------------------|-------------|
| 1 | `arena` | **Play** | `Compass` | `text-indigo-400 bg-indigo-600/10 border-indigo-500/30` | — |
| 2 | `shop` | **Shop & Lab** | `ShoppingBag` | `text-purple-400 bg-purple-600/10 border-purple-500/30` | — |
| 3 | `profile` | **Dossier** | `User` | `text-blue-400 bg-blue-600/10 border-blue-500/30` | — |
| 4 | `leaderboard` | **Leaderboard** | `Trophy` | `text-amber-400 bg-amber-500/10 border-amber-500/30` | — |
| 5 | `championships` | **Championships** | `Crown` | `text-amber-400 bg-amber-500/10 border-amber-500/30` | — |
| 6 | `halloffame` | **Hall of Fame** | `Award` | `text-yellow-400 bg-yellow-500/10 border-yellow-500/30` | — |
| 7 | `clans` | **Syndicates** | `Shield` | `text-indigo-400 bg-indigo-600/10 border-indigo-500/30` | — |
| 8 | `seasonpass` | **Pass** | `Sparkles` | `text-purple-400 bg-purple-600/10 border-purple-500/30` | — |
| 9 | `clips` | **Highlights** | `Film` | `text-red-400 bg-red-600/10 border-red-500/30` | — |
| 10 | `rewards` | **Claims** | `Gift` | `text-emerald-400 bg-emerald-600/10 border-emerald-500/30` | — |
| 11 | `store` | **Vault** | `Coins` | `text-emerald-400 bg-emerald-600/10 border-emerald-500/30` | — |
| 12 | `social` | **Friends & Search** | `Users` | `text-violet-400 bg-violet-600/10 border-violet-500/30` | — |
| 13 | `admin` | **Admin** | `Shield` | `text-red-400 bg-red-600/10 border-red-500/30` | `true` |

**Note:** `'dashboard'` is a valid `TabId` but has NO entry in `TABS` — it is the default view rendered inline, not a tab in the strip.

---

## 6. Conditional Rendering Branches (Render Gates)

The component has 4 early-return / conditional branches in this exact priority order:

| Priority | Condition | Rendered Output | Line |
|----------|-----------|-----------------|------|
| 1 | `loading === true` | Full-screen loading spinner (see §7.1) | 258–267 |
| 2 | `player === null/undefined` | `<AuthGate />` (see §7.2) | 269–271 |
| 3 | `activeArenaId !== null` | Full-screen `<GameCanvas />` (see §7.3) | 273–279 |
| 4 | `activeTab === 'dashboard'` | Dashboard grid (see §8) | 395–818 |
| 5 | `activeTab !== 'dashboard'` | Sub-page nav + panel content (see §9) | 821–883 |

---

## 7. Loading / Auth / Game-Canvas Gates

### 7.1 Loading Screen (lines 258–267)

| Element | Value |
|---------|-------|
| Background | `bg-slate-950` full screen centered |
| Spinner | `Loader2` icon, `w-8 h-8`, `animate-spin`, `text-indigo-400` |
| Text | **"Loading arena…"** (text-sm, text-slate-400) |

### 7.2 Auth Gate (line 270)

| Element | Value |
|---------|-------|
| Component | `<AuthGate />` (delegated entirely — no inline auth UI in this file) |

**Note:** This file contains NO inline login form, register form, guest button, or social login UI. All auth is delegated to the `AuthGate` component.

### 7.3 Game Canvas Fullscreen (lines 273–279)

| Element | Value |
|---------|-------|
| Container | `w-screen h-screen overflow-hidden bg-slate-950` |
| Component | `<GameCanvas arenaId={activeArenaId} player={player} onExit={handleExitGame} />` |

---

## 8. Header Section (lines 297–390)

### 8.1 App Branding / Logo Button

| Element | Value |
|---------|-------|
| `aria-label` | **"Return to lobby dashboard"** |
| On click | Sets `activeTab` to `'dashboard'` |
| Icon | `Compass`, `w-5 h-5`, white, inside gradient box (`from-indigo-500 to-purple-600`), with `va-spin-slow` animation class |
| **App Title** (h1) | **"Project Venom"** (text-lg, font-extrabold, tracking-tight, white, uppercase) |
| **Badge** (span inside h1) | **"Arena"** (text-xs, bg-indigo-500, white, font-bold, rounded-full, tracking-widest, font-mono) |
| **Subtitle** (span below h1) | **"STORES-SAFE COMPLIANT VERSION"** (text-[10px], text-slate-500, font-mono, block) |

### 8.2 Player Badge (lines 327–354)

| Element | Value |
|---------|-------|
| Container | `bg-slate-900/60`, border `slate-800/80`, rounded-xl |
| Avatar | 8×8 rounded-lg box; renders `<img>` if avatar is data: or http: URL; renders emoji character if avatar is short string; falls back to **player level number** (text-[10px], font-mono, font-bold, text-slate-400) |
| **Label line 1** | **"Challenger (Lvl {player.level})"** (text-[9px], text-slate-500, uppercase, font-semibold) |
| **Label line 2** | `{player.name}` (text-xs, font-bold, white, max-w-28, truncated) |

### 8.3 Chips Wallet (lines 357–367)

| Element | Value |
|---------|-------|
| Icon | `Coins`, `w-4 h-4`, text-emerald-400, `animate-pulse` |
| **Label line 1** | **"Secure Chips"** (text-[9px], text-emerald-500/60, uppercase, font-semibold) |
| **Label line 2** | `{player.bankedChips.toLocaleString()}` (text-sm, font-bold, font-mono, text-emerald-400, tabular-nums) |

### 8.4 Rules & Guide Button (lines 370–377)

| Element | Value |
|---------|-------|
| Title (tooltip) | **"Official Guide, Rules & FAQ"** |
| Icon | `BookOpen`, `w-4 h-4`, text-indigo-400 |
| **Button label** | **"Rules & Guide"** (text-xs, font-bold, hidden on screens < `sm`) |
| On click | Sets `isRulesOpen` to `true` (opens GameRulesModal) |
| Style | bg-indigo-600/20, hover:bg-indigo-600, border-indigo-500/30, rounded-xl |

### 8.5 Sign Out Button (lines 380–387)

| Element | Value |
|---------|-------|
| Title (tooltip) | **"Secure Logout"** |
| Icon | `LogOut`, `w-4 h-4` |
| **Button label** | **"Sign Out"** (text-xs, font-bold, hidden on screens < `md`) |
| On click | Calls `handleLogout` |
| Hover style | hover:bg-red-950/40, hover:text-red-400, hover:border-red-500/20 |

---

## 9. Dashboard Tab — Hero Banner (lines 400–438)

### 9.1 Hero Banner Content

| Element | Value |
|---------|-------|
| Background | Gradient `from-slate-900 to-indigo-950/80`, border `indigo-500/10`, with decorative blur circle `bg-indigo-500/10` |
| Icon | `Award`, `w-7 h-7`, white, `animate-pulse`, inside gradient box (`from-indigo-500 to-purple-600`) |
| **Subtitle** | **"Lobby Headquarters"** (text-[10px], text-indigo-400, font-mono, font-bold, tracking-widest, uppercase) |
| **Heading** (h2) | **"WELCOME BACK, {PLAYER.NAME.UPPERCASE}"** (text-xl, font-black, white, tracking-tight) |

### 9.2 XP Progress Bar

| Element | Value |
|---------|-------|
| Left label | **"LVL {player.level}"** (text-[10px], font-mono, text-slate-400) |
| Bar | Width `w-36`, height `h-1.5`, bg-slate-950, border-slate-800, rounded-full; fill bg-indigo-500, width = `{xpPercent}%` |
| Right label | **"{xpIntoLevel} / {xpSpan} XP"** (text-[9px], font-mono, text-slate-500, with locale-formatted numbers) |

### 9.3 LAUNCH MATCHMAKER Button

| Element | Value |
|---------|-------|
| Icon | `Play`, `w-3.5 h-3.5`, fill-current |
| **Button label** | **"LAUNCH MATCHMAKER"** (text-xs, font-bold, white) |
| On click | Sets `activeTab` to `'arena'` |
| Style | bg-indigo-600, hover:bg-indigo-500, rounded-xl, shadow-indigo-950/40, border-indigo-500 |

---

## 10. Dashboard Tab — 12 Bento Gates ("Lobby Stations")

### Section Header

| Element | Value |
|---------|-------|
| **Label** | **"Lobby Stations"** (text-[10px], font-bold, text-slate-500, uppercase, tracking-widest) |

### Grid Layout

- `grid-cols-1 sm:grid-cols-2 gap-4`
- Gate 12 is `wide` (spans `sm:col-span-2`)
- Left column (8/12 cols): Hero + all 12 gates
- Right column (4/12 cols): Tactical Challenges panel

### Gate Cards (exact order, all text verbatim)

#### Gate 1: Play

| Field | Value |
|-------|-------|
| Accent | `indigo` |
| Icon | `Compass` |
| **Badge** | **"Battle Gate"** |
| **Title** | **"Play Endless Arenas"** |
| **Description** | **"Risk chips to compete in simulated multiplayer shards. Harvest dropping stars and escape safely."** |
| **Foot Left** | **"STAKES FROM: 10 chips"** |
| **Foot Right** | **"Enter"** |
| On click | `setActiveTab('arena')` |

#### Gate 2: Shop

| Field | Value |
|-------|-------|
| Accent | `purple` |
| Icon | `ShoppingBag` |
| **Badge** | **"Customize Lab"** |
| **Title** | **"Identity Workshop & Shop"** |
| **Description** | **"Unlock glowing skins, trials, death burst novas, or design a custom repeating body segment sequence."** |
| **Foot Left** | **"EQUIPPED: {player.currentSkin ? 'Custom DNA' : 'Gallery Skin'}"** (conditional) |
| **Foot Right** | **"Modify"** |
| On click | `setActiveTab('shop')` |

#### Gate 3: Profile

| Field | Value |
|-------|-------|
| Accent | `blue` |
| Icon | `User` |
| **Badge** | **"My Record"** |
| **Title** | **"Challenger Dossier"** |
| **Description** | **"Examine your records, high scores, total banked wealth, and change your operative callsign."** |
| **Foot Left** | **"HIGH SCORE: {(player.biggestExtract \|\| 0).toLocaleString()}"** (dynamic) |
| **Foot Right** | **"Inspect"** |
| On click | `setActiveTab('profile')` |

#### Gate 4: Leaderboard

| Field | Value |
|-------|-------|
| Accent | `amber` |
| Icon | `Trophy` |
| **Badge** | **"Elite Standings"** |
| **Title** | **"Global Standings"** |
| **Description** | **"Track rank placements and compare your banked chip balance against other elite venom snake operators."** |
| **Foot Left** | **"LEADERBOARD RANK: Tier 1"** |
| **Foot Right** | **"View"** |
| On click | `setActiveTab('leaderboard')` |

#### Gate 5: Daily Rewards

| Field | Value |
|-------|-------|
| Accent | `emerald` |
| Icon | `Gift` |
| **Badge** | **"Complimentary"** |
| **Title** | **"Daily Free Claims"** |
| **Description** | **"Secure your complimentary login chips. Claim hourly or daily packages to rebuild your wallet!"** |
| **Foot Left** | **"STREAK: {player.dailyStreak \|\| 1} Days"** (dynamic) |
| **Foot Right** | **"Claim"** |
| On click | `setActiveTab('rewards')` |

#### Gate 6: Chip Store

| Field | Value |
|-------|-------|
| Accent | `cyan` |
| Icon | `Coins` |
| **Badge** | **"Secure Vault"** |
| **Title** | **"Virtual Chip Store"** |
| **Description** | **"Acquire secure safe-guarded chip packs immediately to compete in high-stakes premium arena tables."** |
| **Foot Left** | **"WALLET: {player.bankedChips.toLocaleString()} c"** (dynamic) |
| **Foot Right** | **"Shop"** |
| On click | `setActiveTab('store')` |

#### Gate 7: Championships

| Field | Value |
|-------|-------|
| Accent | `rose` |
| Icon | `Crown` |
| **Badge** | **"Tournament"** |
| **Title** | **"Championships"** |
| **Description** | **"Enter elite championship events. Compete against top-ranked operators for massive chip prizes and exclusive titles."** |
| **Foot Left** | **"SEASONAL EVENTS"** |
| **Foot Right** | **"Compete"** |
| On click | `setActiveTab('championships')` |

#### Gate 8: Hall of Fame

| Field | Value |
|-------|-------|
| Accent | `yellow` |
| Icon | `Award` |
| **Badge** | **"Legends"** |
| **Title** | **"Hall of Fame"** |
| **Description** | **"View legendary players and record-breaking performances. The greatest venom operators of all time."** |
| **Foot Left** | **"LEGENDARY RANKINGS"** |
| **Foot Right** | **"View Legends"** |
| On click | `setActiveTab('halloffame')` |

#### Gate 9: Syndicates (Clans)

| Field | Value |
|-------|-------|
| Accent | `violet` |
| Icon | `Shield` |
| **Badge** | **"Team Ops"** |
| **Title** | **"Syndicates"** |
| **Description** | **"Create or join a syndicate. Team up with allies, pool resources, and dominate arenas together."** |
| **Foot Left** | **"CLAN WARFARE"** |
| **Foot Right** | **"Assemble"** |
| On click | `setActiveTab('clans')` |

#### Gate 10: Season Pass

| Field | Value |
|-------|-------|
| Accent | `pink` |
| Icon | `Sparkles` |
| **Badge** | **"Season XP"** |
| **Title** | **"Season Pass"** |
| **Description** | **"Track your seasonal progression. Unlock exclusive rewards, cosmetics, and bonus chip multipliers as you level up."** |
| **Foot Left** | **"FREE TIER REWARDS"** |
| **Foot Right** | **"Progress"** |
| On click | `setActiveTab('seasonpass')` |

#### Gate 11: Highlights (Clips)

| Field | Value |
|-------|-------|
| Accent | `red` |
| Icon | `Film` |
| **Badge** | **"Replays"** |
| **Title** | **"Highlights"** |
| **Description** | **"Watch and share your greatest moments. Review match replays, clutch extractions, and legendary eliminations."** |
| **Foot Left** | **"MATCH HIGHLIGHTS"** |
| **Foot Right** | **"Watch"** |
| On click | `setActiveTab('clips')` |

#### Gate 12: Social (WIDE — spans 2 columns)

| Field | Value |
|-------|-------|
| Accent | `violet` |
| Icon | `Users` |
| **Badge** | **"Friends & Global Search"** |
| **Title** | **"Friends, Global Search & Syndicate Hub"** |
| **Description** | **"Search and connect with players globally by tag or country flag (🇮🇳, 🇺🇸, 🇯🇵, etc.), send daily chip gifts (+25c), spectate matches, and create co-op team codes!"** |
| **Foot Left** | **"GLOBAL PLAYER NETWORK READY"** |
| **Foot Right** | **"Search & Connect"** |
| `wide` | `true` |
| On click | `setActiveTab('social')` |

---

## 11. Dashboard Tab — Tactical Challenges Panel (Right Column)

### 11.1 Panel Header

| Element | Value |
|---------|-------|
| `aria-label` | **"Tactical challenges"** |
| `id` | `challenges-dashboard-panel` |
| Icon | `ListTodo`, `w-4 h-4`, text-indigo-400, `animate-pulse` |
| **Heading** | **"Tactical Challenges"** (text-xs, font-bold, white, uppercase, tracking-wider) |

### 11.2 Challenge Tier Badge (conditional)

Rendered only when `challengeTier` is truthy.

| Tier Value | Background | Border | Text Color |
|------------|-----------|--------|------------|
| `'elite'` | `bg-red-500/15` | `border-red-500/20` | `text-red-400` |
| `'veteran'` | `bg-amber-500/15` | `border-amber-500/20` | `text-amber-400` |
| `'operative'` | `bg-cyan-500/15` | `border-cyan-500/20` | `text-cyan-400` |
| (other/fallback) | `bg-emerald-500/15` | `border-emerald-500/20` | `text-emerald-400` |

Style: text-[8px], px-1.5, py-0.5, font-bold, rounded, uppercase, font-sans.

### 11.3 Streak Multiplier Badge (conditional)

Rendered only when `streakMultiplier > 1`.

| Element | Value |
|---------|-------|
| **Text** | **"🔥 {challengeStreak}d streak ×{streakMultiplier}"** (text-[9px], font-mono, text-amber-400, font-bold) |

### 11.4 Fallback Icon (conditional)

Rendered only when `streakMultiplier <= 1`.

| Element | Value |
|---------|-------|
| Icon | `Sparkles`, `w-4 h-4`, text-indigo-400 |

### 11.5 Loading State (conditional: `challengesLoading && missions.length === 0`)

| Element | Value |
|---------|-------|
| Spinner | `Loader2`, `w-5 h-5`, `animate-spin`, text-indigo-400 |
| **Text** | **"Loading challenges…"** (text-xs, text-slate-400) |

### 11.6 Empty State (conditional: `!challengesLoading && missions.length === 0`)

| Element | Value |
|---------|-------|
| **Text** | **"No challenges available right now."** (text-xs, text-slate-500, font-sans) |

### 11.7 Challenge Cards Container

| Element | Value |
|---------|-------|
| Max height | `max-h-[480px]` |
| Overflow | `overflow-y-auto` with `custom-scrollbar` class |

### 11.8 Daily Challenges Section

| Element | Value |
|---------|-------|
| Icon | `Sunrise`, `w-3.5 h-3.5`, text-amber-400 |
| **Heading** | **"Daily Challenges ({count})"** (text-[10px], font-bold, text-amber-400, uppercase, tracking-widest) — count is dynamic |
| **Reset note** | **"Resets daily at UTC midnight"** (text-[9px], font-mono, text-slate-600, ml-auto) |

Conditional: rendered only when `dailies.length > 0` (filtered from `missions` where `m.type === 'daily'`).

### 11.9 Weekly Challenges Section

| Element | Value |
|---------|-------|
| Separator | Border-top `border-slate-800`, `pt-3 mt-1` |
| Icon | `Star`, `w-3.5 h-3.5`, text-violet-400 |
| **Heading** | **"Weekly Challenges ({count})"** (text-[10px], font-bold, text-violet-400, uppercase, tracking-widest) — count is dynamic |
| **Reset note** | **"Resets every Monday UTC"** (text-[9px], font-mono, text-slate-600, ml-auto) |
| Card border | `border-violet-500/20` (vs daily's `border-slate-800`) |

Conditional: rendered only when `weeklies.length > 0` (filtered from `missions` where `m.type === 'weekly'`).

### 11.10 Individual Challenge Card (Daily)

| Element | Value |
|---------|-------|
| Container | `bg-slate-950/90`, rounded-xl, border-slate-800, p-3.5 |
| **Title** (h4) | `{m.title}` (text-xs, font-bold, white, leading-snug) |
| **Description** (p) | `{m.description}` (text-[10.5px], text-slate-400, mt-1, leading-normal) |
| **Progress label** | **"PROGRESS:"** (text-[10px], font-mono, text-slate-500) |
| **Progress value** | **"{m.current} / {m.target} ({percent}%)"** (same style) |
| **Reward label** | **"+{m.reward} CHIPS"** (text-[10px], font-mono, font-bold, text-emerald-400) |

#### Progress Bar Colors (Daily)

| State | Gradient/Color |
|-------|---------------|
| Claimed | `bg-emerald-600` (solid) |
| Completed (not claimed) | `bg-gradient-to-r from-emerald-400 to-teal-500` |
| In progress | `bg-gradient-to-r from-amber-500 to-orange-500` |

#### Progress Bar Colors (Weekly)

| State | Gradient/Color |
|-------|---------------|
| Claimed | `bg-emerald-600` (solid) |
| Completed (not claimed) | `bg-gradient-to-r from-emerald-400 to-teal-500` |
| In progress | `bg-gradient-to-r from-violet-500 to-purple-500` |

### 11.11 Claim Button (per challenge)

| State | Label | Style |
|-------|-------|-------|
| Claimed | **"Claimed ✓"** | `bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed` |
| Completed (not claimed) | **"Claim"** | `bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-black shadow-emerald-950/20` |
| Not completed | **"Claim"** (disabled) | `bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed` |

Disabled when `!m.completed \|\| m.claimed`.

### 11.12 Last Match Summary (conditional: `lastResult` is truthy)

| Element | Value |
|---------|-------|
| **Label** | **"Last Match"** (text-[10px], font-mono, text-slate-500, uppercase, tracking-widest) |
| **Outcome icon** | `🏆` (if extract) or `💀` (if eliminated) |
| **Outcome title** | **"Extracted"** or **"Eliminated"** (font-bold, white) — followed by arena name |
| **Stats line** | **"{chipsExtracted}c · {kills} kills · +{xpGained} XP · {durationSeconds}s"** (text-slate-500, with locale-formatted chips and floor'd seconds) |

---

## 12. Sub-Page Navigation Bar (lines 821–863)

Rendered when `activeTab !== 'dashboard'`.

### 12.1 Back Button

| Element | Value |
|---------|-------|
| Icon | `ChevronLeft`, `w-4 h-4`, text-indigo-400 |
| **Label** | **"Lobby HQ"** (text-xs, font-bold, text-slate-300, hover:text-white) |
| On click | `setActiveTab('dashboard')` |
| Style | `bg-slate-950`, border-slate-800, rounded-xl, shadow |

### 12.2 Breadcrumb Text

| Element | Value |
|---------|-------|
| Separator | Vertical divider, `h-4 w-[1px]`, `bg-slate-800`, hidden on < `sm` |
| **Text** | **"STATION / {activeTab.toUpperCase()}"** (text-[10px], text-slate-500, font-mono, hidden on < `sm`) |

### 12.3 Horizontal Tab Strip

| Element | Value |
|---------|-------|
| Container | `bg-slate-950`, `p-1`, rounded-xl, border-slate-800/60, `overflow-x-auto`, `no-scrollbar` |
| Tab button | `px-3 py-1.5`, rounded-lg, text-xs, font-bold, flex items-center gap-1.5, shrink-0 |
| Active state | Uses `tab.activeColor` classes + `border` |
| Inactive state | `text-slate-500 hover:text-slate-300`, border-transparent |
| Content | `{TabIcon w-3.5 h-3.5}` + `{tab.label}` |

---

## 13. Tab-to-Panel Content Mapping (lines 866–881)

| Tab ID | Component | Props |
|---------|-----------|-------|
| `arena` | `<ArenaSelector />` | `onPlay={handlePlayArena}`, `onToast={toastFn}` |
| `shop` | `<CosmeticsShop />` | (none) |
| `profile` | `<PlayerProfilePanel />` | (none) |
| `leaderboard` | `<Leaderboards />` | `onInspectPlayer={handleInspectPlayer}`, `onToast={toastFn}` |
| `championships` | `<Championships />` | `onToast={toastFn}` |
| `halloffame` | `<HallOfFame />` | `onInspectPlayer={handleInspectPlayer}`, `onToast={toastFn}` |
| `clans` | `<ClanSystem />` | `onInspectPlayer={handleInspectPlayer}`, `onToast={toastFn}` |
| `seasonpass` | `<SeasonPass />` | `onToast={toastFn}` |
| `clips` | `<ClipShowcase />` | `onInspectPlayer={handleInspectPlayer}`, `onToast={toastFn}` |
| `rewards` | `<DailyRewards />` | `onToast={toastFn}` |
| `store` | `<ChipStore />` | `onToast={toastFn}` |
| `social` | `<SocialPanel />` | `onToast={toastFn}` |
| `admin` | `<AdminPanel />` | `onToast={toastFn}` — **additionally gated** by `player.role === 'admin'` |

---

## 14. Footer (lines 886–897)

| Element | Value |
|---------|-------|
| Border | `border-t border-slate-900/60` |
| Background | `bg-slate-950/40` |
| Padding | `py-6`, `mt-auto` |
| **Copyright text** | **"© 2026 Project Venom Arena. All Rights Reserved. Fully store-safe, non-gambling gameplay edition."** (text-xs, text-slate-500, font-sans) |
| **Version string** | **"APP_VERSION: 1.0.0-MVP"** (font-mono, text-[10px], text-slate-400) |
| **Engine string** | **"ENGINE: TSX_CANVAS"** (font-mono, text-[10px], text-slate-400) |

---

## 15. Modals (lines 899–901)

| Modal | Component | Trigger | Props |
|-------|-----------|---------|-------|
| Game Rules | `<GameRulesModal />` | `isRulesOpen` state; opened by "Rules & Guide" header button | `isOpen={isRulesOpen}`, `onClose={() => setIsRulesOpen(false)}` |
| Player Inspector | `<PlayerInspectorModal />` | `inspectedPlayer` state; opened by child panels via `handleInspectPlayer` | `player={inspectedPlayer}`, `onClose={() => setInspectedPlayer(null)}`, `onToast={toastFn}` |

---

## 16. Toast / Notification Messages

All toasts use the `sonner` library via the `toastFn` wrapper or direct `toast` calls.

| Trigger | Type | Message (verbatim) | Location |
|---------|------|--------------------|----|
| Match exit — extracted | `success` | **"🏆 Extracted {chipsExtracted}c from {arenaName}! +{xpGained} XP"** | `handleExitGame` (line 192–194) |
| Match exit — eliminated | `error` | **"💀 Eliminated in {arenaName}. {kills} kill(s) this match."** | `handleExitGame` (line 196) |
| Logout | `info` | **"Secure session disconnected. 🔒"** | `handleLogout` (line 219) |
| Challenge claimed — with streak bonus | `success` | **"Challenge claimed: +{reward}c (includes {bonusReward}c streak bonus ×{streakMultiplier})!"** | `claimMission` (line 237) |
| Challenge claimed — no bonus | `success` | **"Challenge reward claimed: +{reward}c!"** | `claimMission` (line 239) |
| Claim failed (API error) | `error` | **"{data.error} Failed to claim reward."** (fallback) | `claimMission` (line 245) |
| Claim failed (network) | `error` | **"Network error while claiming reward."** | `claimMission` (line 248) |

---

## 17. Handler Functions

| Function | Purpose | API Calls | State Mutations |
|----------|---------|-----------|-----------------|
| `fetchChallenges` | Fetch challenge data from server | `GET /api/player/challenges` | Sets `missions`, `challengeStreak`, `streakMultiplier`, `challengeTier`, `challengesLoading` |
| `handleExitGame(result?)` | Process match end | (none) | Sets `activeArenaId=null`, `lastResult`, fires toasts, calls `refresh()`, `fetchChallenges()` |
| `handlePlayArena(arenaId, _isOnline?)` | Start a match | (none) | Sets `activeArenaId=arenaId` (guard: returns if `!player`) |
| `handleLogout` | Sign out user | `logout()` (from useAuth) | Sets `activeTab='dashboard'`, `activeArenaId=null`, fires toast |
| `claimMission(mission)` | Claim challenge reward | `POST /api/player/challenges` body: `{ challengeId: mission.id }` | Updates `missions` (sets `claimed=true`), fires toast, calls `refresh()`, `fetchChallenges()` |
| `handleInspectPlayer(p)` | Open player inspector | (none) | Sets `inspectedPlayer=p` |
| `toastFn(msg, type?)` | Standardized toast for child panels | (none) | Calls `toast.success/error/info` based on type |

---

## 18. BentoGate Sub-Component (lines 905–1052)

### 18.1 `ACCENT_CLASSES` Mapping (11 accents)

Each accent defines 5 Tailwind class strings:

| Accent | `iconBg` | `badgeBg` | `borderHover` | `textHover` | `arrow` |
|--------|----------|----------|---------------|-------------|--------|
| `indigo` | `bg-indigo-500/10 border-indigo-500/20 text-indigo-400` | `bg-indigo-500/15 border-indigo-500/20 text-indigo-400` | `hover:border-indigo-500/40` | `group-hover:text-indigo-400` | `text-indigo-400` |
| `purple` | `bg-purple-500/10 border-purple-500/20 text-purple-400` | `bg-purple-500/15 border-purple-500/20 text-purple-400` | `hover:border-purple-500/40` | `group-hover:text-purple-400` | `text-purple-400` |
| `blue` | `bg-blue-500/10 border-blue-500/20 text-blue-400` | `bg-blue-500/15 border-blue-500/20 text-blue-400` | `hover:border-blue-500/40` | `group-hover:text-blue-400` | `text-blue-400` |
| `amber` | `bg-amber-500/10 border-amber-500/20 text-amber-400` | `bg-amber-500/15 border-amber-500/20 text-amber-400` | `hover:border-amber-500/40` | `group-hover:text-amber-400` | `text-amber-400` |
| `yellow` | `bg-yellow-500/10 border-yellow-500/20 text-yellow-400` | `bg-yellow-500/15 border-yellow-500/20 text-yellow-400` | `hover:border-yellow-500/40` | `group-hover:text-yellow-400` | `text-yellow-400` |
| `emerald` | `bg-emerald-500/10 border-emerald-500/20 text-emerald-400` | `bg-emerald-500/15 border-emerald-500/20 text-emerald-400` | `hover:border-emerald-500/40` | `group-hover:text-emerald-400` | `text-emerald-400` |
| `violet` | `bg-violet-500/10 border-violet-500/20 text-violet-400` | `bg-violet-500/15 border-violet-500/20 text-violet-400` | `hover:border-violet-500/40` | `group-hover:text-violet-400` | `text-violet-400` |
| `red` | `bg-red-500/10 border-red-500/20 text-red-400` | `bg-red-500/15 border-red-500/20 text-red-400` | `hover:border-red-500/40` | `group-hover:text-red-400` | `text-red-400` |
| `cyan` | `bg-cyan-500/10 border-cyan-500/20 text-cyan-400` | `bg-cyan-500/15 border-cyan-500/20 text-cyan-400` | `hover:border-cyan-500/40` | `group-hover:text-cyan-400` | `text-cyan-400` |
| `rose` | `bg-rose-500/10 border-rose-500/20 text-rose-400` | `bg-rose-500/15 border-rose-500/20 text-rose-400` | `hover:border-rose-500/40` | `group-hover:text-rose-400` | `text-rose-400` |
| `pink` | `bg-pink-500/10 border-pink-500/20 text-pink-400` | `bg-pink-500/15 border-pink-500/20 text-pink-400` | `hover:border-pink-500/40` | `group-hover:text-pink-400` | `text-pink-400` |

### 18.2 BentoGate Card Structure

| Slot | Content | Style Notes |
|------|---------|-------------|
| Top-left | Icon in accent-colored box (`w-10 h-10 rounded-xl`) | `group-hover:scale-110 transition-transform` |
| Top-right | Badge text (`text-[9px] px-2 py-0.5`, accent colored, rounded-full, uppercase, font-bold) | |
| Middle | Title (`h3`, text-sm, font-bold, white) + Description (`p`, text-xs, text-slate-400, line-clamp-2) | Title has accent hover color |
| Bottom-left | `footLeft` text (text-[10px], font-mono, text-slate-500, truncated) | Above border-t |
| Bottom-right | `footRight` text + **"→"** arrow (accent colored, `group-hover:translate-x-1`) | |

Card dimensions: `h-44`, `p-5`, `rounded-2xl`, `bg-slate-900/60 hover:bg-slate-900`, `border-slate-800/80`, `shadow-md`. If `wide`: `sm:col-span-2`.

---

## 19. API Endpoints Referenced

| Method | Endpoint | Purpose | Handler |
|--------|----------|---------|---------|
| `GET` | `/api/player/challenges` | Fetch player's active challenges + streak data | `fetchChallenges` |
| `POST` | `/api/player/challenges` | Claim a challenge reward | `claimMission` |

---

## 20. Dynamic / Data-Driven Text (player-dependent)

The following text contains runtime values and is not static:

| Location | Template | Variables |
|----------|---------|-----------|
| Header player badge | "Challenger (Lvl {player.level})" | `player.level` |
| Header player name | `{player.name}` | `player.name` |
| Header chips wallet | `{player.bankedChips.toLocaleString()}` | `player.bankedChips` |
| Hero heading | "WELCOME BACK, {player.name.toUpperCase()}" | `player.name` |
| Hero XP bar | "LVL {player.level}" | `player.level` |
| Hero XP bar | "{xpIntoLevel} / {xpSpan} XP" | Derived XP values |
| Gate 2 foot left | "EQUIPPED: Custom DNA" or "EQUIPPED: Gallery Skin" | `player.currentSkin` (truthy/falsy) |
| Gate 3 foot left | "HIGH SCORE: {n}" | `player.biggestExtract` |
| Gate 5 foot left | "STREAK: {n} Days" | `player.dailyStreak` (fallback 1) |
| Gate 6 foot left | "WALLET: {n} c" | `player.bankedChips` |
| Streak badge | "🔥 {n}d streak ×{m}" | `challengeStreak`, `streakMultiplier` |
| Challenge tier badge | `{challengeTier}` | `challengeTier` (elite/veteran/operative/other) |
| Daily/Weekly heading | "Daily Challenges ({count})" / "Weekly Challenges ({count})" | Filtered mission count |
| Challenge card title | `{m.title}` | `mission.title` |
| Challenge card description | `{m.description}` | `mission.description` |
| Challenge progress | "{current} / {target} ({percent}%)" | `mission.current`, `mission.target`, computed percent |
| Challenge reward | "+{m.reward} CHIPS" | `mission.reward` |
| Toast: extracted | "🏆 Extracted {n}c from {arena}! +{xp} XP" | `MatchResult` fields |
| Toast: eliminated | "💀 Eliminated in {arena}. {kills} kill(s) this match." | `MatchResult` fields |
| Toast: claimed with bonus | "Challenge claimed: +{r}c (includes {b}c streak bonus ×{m})!" | API response fields |
| Toast: claimed no bonus | "Challenge reward claimed: +{r}c!" | API response fields |
| Last match: title | "Extracted" or "Eliminated" + arena name | `lastResult.outcome`, `lastResult.arenaName` |
| Last match: stats | "{n}c · {k} kills · +{x} XP · {d}s" | `lastResult` fields |
| Breadcrumb | "STATION / {activeTab.toUpperCase()}" | `activeTab` |

---

## 21. Emojis Used

| Emoji | Location | Context |
|-------|----------|---------|
| 🏆 | Toast (extract), Last Match summary | Victory/extraction |
| 💀 | Toast (eliminated), Last Match summary | Death/elimination |
| 🔒 | Toast (logout) | Security |
| 🔥 | Streak badge | Streak fire |
| ✓ | Claim button (claimed state) | Checkmark |
| → | BentoGate footer right (all 12 gates) | Arrow indicator |
| 🇮🇳 | Gate 12 description | Country flag example (India) |
| 🇺🇸 | Gate 12 description | Country flag example (USA) |
| 🇯🇵 | Gate 12 description | Country flag example (Japan) |

---

## 22. Responsive Behavior Summary

| Element | Breakpoint | Behavior |
|---------|-----------|----------|
| Header | `sm` | Switches from flex-col to flex-row layout |
| "Rules & Guide" label | `< sm` | Hidden (icon-only) |
| "Sign Out" label | `< md` | Hidden (icon-only) |
| Dashboard grid | `lg` | 8/4 column split; below: single column |
| Bento gate grid | `sm` | 2-column; below: 1-column |
| Hero banner | `sm` | Switches from flex-col to flex-row |
| Sub-page nav bar | `sm` | Switches from flex-col to flex-row; breadcrumb + divider hidden below `sm` |
| Tab strip | always | Horizontally scrollable (`overflow-x-auto`, `no-scrollbar`) |
| Footer | `sm` | Switches from flex-col to flex-row |
| Gate 12 (wide) | `sm` | Spans 2 columns (`sm:col-span-2`) |

---

## 23. CSS Class Conventions & Custom Classes

| Class | Purpose |
|-------|---------|
| `va-spin-slow` | Custom slow rotation animation (logo compass icon) |
| `va-fade-in` | Custom fade-in animation (dashboard, sub-page content) |
| `custom-scrollbar` | Custom scrollbar styling (challenges list) |
| `no-scrollbar` | Hide scrollbar (tab strip) |
| `selection:bg-indigo-500 selection:text-white` | Global text selection color (on root div) |
| `tabular-nums` | Monospaced number rendering (chips wallet) |

---

## 24. Auth Flow Summary

**This file contains NO inline auth UI.** The entire auth flow is delegated:

- **Unauthenticated state:** Renders `<AuthGate />` (line 270). All login, register, guest, and social login UI lives in that component.
- **Authenticated state:** `useAuth()` provides `player`, `loading`, `logout`, `refresh`.
- **No Zustand stores** are used in this file. All state is local React state.

---

## 25. Complete Text Inventory (Alphabetical Unique Strings)

### Static UI Text

- "APP_VERSION: 1.0.0-MVP"
- "ADMIN" (tab label, admin-only)
- "Assemble" (gate 9 foot right)
- "Battle Gate" (gate 1 badge)
- "Challenger (Lvl ...)" (header player label)
- "Challenger Dossier" (gate 3 title)
- "Challenge reward claimed: +...c!" (toast)
- "Challenge claimed: +...c (includes ...c streak bonus ×...)!" (toast)
- "Championships" (tab label, gate 7 title)
- "Claims" (tab label)
- "Claim" / "Claimed ✓" (challenge button)
- "CLAN WARFARE" (gate 9 foot left)
- "Compete" (gate 7 foot right)
- "Complimentary" (gate 5 badge)
- "Customize Lab" (gate 2 badge)
- "Daily Challenges (...)" (section heading)
- "Daily Free Claims" (gate 5 title)
- "Eliminated" / "Extracted" (last match outcome)
- "ENGINE: TSX_CANVAS" (footer)
- "Enter" (gate 1 foot right)
- "EQUIPPED: Custom DNA" / "EQUIPPED: Gallery Skin" (gate 2 foot left, conditional)
- "Elite Standings" (gate 4 badge)
- "Failed to claim reward." (toast fallback)
- "Friends & Global Search" (gate 12 badge)
- "Friends & Search" (tab label)
- "Friends, Global Search & Syndicate Hub" (gate 12 title)
- "Fully store-safe, non-gambling gameplay edition." (footer)
- "GLOBAL PLAYER NETWORK READY" (gate 12 foot left)
- "Global Standings" (gate 4 title)
- "Hall of Fame" (tab label, gate 8 title)
- "Highlights" (tab label, gate 11 title)
- "HIGH SCORE: ..." (gate 3 foot left)
- "Identity Workshop & Shop" (gate 2 title)
- "Lobby HQ" (back button label)
- "Lobby Headquarters" (hero subtitle)
- "Lobby Stations" (section heading)
- "Loading arena…" (loading screen)
- "Loading challenges…" (challenges loading)
- "Match Highlights" (gate 11 foot left)
- "Modify" (gate 2 foot right)
- "My Record" (gate 3 badge)
- "Network error while claiming reward." (toast)
- "No challenges available right now." (empty state)
- "Official Guide, Rules & FAQ" (rules button title attr)
- "Pass" (tab label)
- "Play" (tab label)
- "Play Endless Arenas" (gate 1 title)
- "PROGRESS:" (challenge progress label)
- "Project Venom" (app title h1)
- "Progress" (gate 10 foot right)
- "Replays" (gate 11 badge)
- "Resets daily at UTC midnight" (daily challenges note)
- "Resets every Monday UTC" (weekly challenges note)
- "Return to lobby dashboard" (logo aria-label)
- "Rules & Guide" (header button label)
- "Search & Connect" (gate 12 foot right)
- "Season Pass" (gate 10 title)
- "Season XP" (gate 10 badge)
- "Secure Chips" (header wallet label)
- "Secure Logout" (sign out title attr)
- "Secure session disconnected. 🔒" (logout toast)
- "Secure Vault" (gate 6 badge)
- "SEASONAL EVENTS" (gate 7 foot left)
- "Shop" (gate 6 foot right)
- "Shop & Lab" (tab label)
- "Sign Out" (header button label)
- "STAKES FROM: 10 chips" (gate 1 foot left)
- "STATION / ..." (breadcrumb)
- "STORES-SAFE COMPLIANT VERSION" (app subtitle)
- "Syndicates" (tab label, gate 9 title)
- "Tactical Challenges" (panel heading)
- "Team Ops" (gate 9 badge)
- "Tournament" (gate 7 badge)
- "Vault" (tab label)
- "View" (gate 4 foot right)
- "View Legends" (gate 8 foot right)
- "Virtual Chip Store" (gate 6 title)
- "WALLET: ... c" (gate 6 foot left)
- "Watch" (gate 11 foot right)
- "WELCOME BACK, ..." (hero h2)
- "Weekly Challenges (...)" (section heading)
- "© 2026 Project Venom Arena. All Rights Reserved. ..." (footer copyright)
- "Arena" (title badge span)
- "LAUNCH MATCHMAKER" (hero button)
- "FREE TIER REWARDS" (gate 10 foot left)
- "LEGENDARY RANKINGS" (gate 8 foot left)
- "STREAK: ... Days" (gate 5 foot left)
- "Dossier" (tab label)
- "Leaderboard" (tab label)
- "Legends" (gate 8 badge)
- "CLIP" (challenge card label — "+... CHIPS")
- "Inspect" (gate 3 foot right)
- "Claim" (gate 5 foot right)

---

10-auth-and-other.md
===
# 10 — Auth Gate, Lib Files & Hooks

> Exhaustive catalog of every text string, label, heading, placeholder, validation message, button, constant, function, and UI element across the Venom Arena auth screen, utility libraries, and custom hooks.

---

## TABLE OF CONTENTS

1. [Auth Gate Component (`auth-gate.tsx` — 746 lines)](#1-auth-gate-component-auth-gatetsx)
2. [Auth Library (`lib/auth.ts` — 82 lines)](#2-auth-library-libauthts)
3. [Constants (`lib/constants.ts` — 2 lines)](#3-constants-libconstantsts)
4. [OAuth Library (`lib/oauth.ts` — 210 lines)](#4-oauth-library-liboauthts)
5. [API Helpers (`lib/api-helpers.ts` — 22 lines)](#5-api-helpers-libapi-helpersts)
6. [Game Config DB (`lib/game-config-db.ts` — 461 lines)](#6-game-config-db-libgame-config-dbts)
7. [Player Helpers (`lib/player-helpers.ts` — 56 lines)](#7-player-helpers-libplayer-helpersts)
8. [Date Utilities (`lib/date-utils.ts` — 40 lines)](#8-date-utilities-libdate-utilsts)
9. [Database Client (`lib/db.ts` — 18 lines)](#9-database-client-libdbts)
10. [Utility (`lib/utils.ts` — 6 lines)](#10-utility-libutilsts)
11. [useMobile Hook (`hooks/use-mobile.ts` — 19 lines)](#11-usemobile-hook-hooksuse-mobilets)
12. [useToast Hook (`hooks/use-toast.ts` — 193 lines)](#12-usetoast-hook-hooksuse-toastts)

---

## 1. AUTH GATE COMPONENT (`auth-gate.tsx`)

**File:** `src/components/auth/auth-gate.tsx` (746 lines)
**Directive:** `'use client'`

### 1.1 Imports & Icons

**UI Component imports:** `Button`, `Input`, `Label`, `Tabs`/`TabsContent`/`TabsList`/`TabsTrigger`, `Card`/`CardContent`/`CardDescription`/`CardHeader`/`CardTitle`, `Skeleton`, `Dialog`/`DialogContent`/`DialogHeader`/`DialogTitle`/`DialogDescription`

**Internal imports:** `useAuth` from `@/components/providers/auth-provider`, `GameRulesModal` from `@/components/modals/game-rules-modal`

**Lucide-react icons used (12):**

| Icon | Usage Location |
|------|---------------|
| `Skull` | Logo area (w-9 h-9, neon text) |
| `Zap` | Guest info text inline icon (w-3 h-3) |
| `LogIn` | Login tab icon (w-4 h-4, mr-2) |
| `UserPlus` | Register tab icon (w-4 h-4, mr-2) |
| `Ghost` | "Play as Guest" button icon (w-4 h-4, mr-2) |
| `Loader2` | Loading spinner (w-8 h-8 in loading state; w-3.5 h-3.5 in social buttons; w-4 h-4 in submit buttons) |
| `Eye` | Password visibility toggle (show state, w-3.5 h-3.5) |
| `EyeOff` | Password visibility toggle (hidden state, w-3.5 h-3.5) |
| `BookOpen` | "View Rules & Guide" link icon (w-3 h-3) |
| `KeyRound` | Password fields left icon (w-3.5 h-3.5); Forgot Password dialog title icon (w-4 h-4) |
| `Mail` | Email fields left icon (w-3.5 h-3.5) |
| `Shield` | Error message icon (w-3 h-3); Password Reset success icon (w-6 h-6) |

### 1.2 Password Strength Calculator (internal function — not exported)

**Function:** `getPasswordStrength(pw: string)` returns `{ label: string; color: string; width: string; score: number }`

**Scoring rules (each met condition adds +1):**

| Criterion | Regex / Condition |
|-----------|-------------------|
| Length >= 6 | `pw.length >= 6` |
| Length >= 10 | `pw.length >= 10` |
| Uppercase letter | `/[A-Z]/.test(pw)` |
| Digit | `/[0-9]/.test(pw)` |
| Special character | `/[^A-Za-z0-9]/.test(pw)` |

| Score | Label | Color Class | Width Class |
|-------|-------|-------------|-------------|
| 0–1 | `Weak` | `bg-red-500` | `w-1/4` |
| 2 | `Fair` | `bg-orange-500` | `w-2/4` |
| 3 | `Good` | `bg-yellow-500` | `w-3/4` |
| 4–5 | `Strong` | `bg-emerald-500` | `w-full` |

### 1.3 AuthGate — Loading State

**Exported function:** `AuthGate` (default export)

**Component renders when `loading` is true from `useAuth()`:**

| Element | Text / Value |
|---------|-------------|
| Layout | `min-h-screen flex items-center justify-center` (centered full screen) |
| Spinner | `Loader2` icon, class `w-8 h-8 animate-spin text-primary` |
| Loading text (p) | `Loading arena…` (class: `text-sm text-muted-foreground`) |

When `loading` is false, renders `<AuthScreen />`.

### 1.4 AuthGateSkeleton (exported)

**Exported function:** `AuthGateSkeleton`

| Element | Value |
|---------|-------|
| Render | `<Skeleton className="w-full h-screen" />` |

### 1.5 AuthScreen — Main Auth Page

**Function:** `AuthScreen` (internal, not exported)

**State variables:**

| State | Type | Default |
|-------|------|---------|
| `busy` | `boolean` | `false` |
| `error` | `string \| null` | `null` |
| `forgotOpen` | `boolean` | `false` |
| `rulesOpen` | `boolean` | `false` |

**Internal helper — `callApi(path, body)`:**

| Error Message | Trigger |
|--------------|---------|
| `data?.error \|\| 'Something went wrong.'` | API response not `ok` |
| `'Network error. Please try again.'` | `catch` block (fetch failure) |

**Social login handler — `handleSocialLogin(provider)`:**
- Redirects to: `` `/api/auth/social-login?provider=${provider}` ``

#### 1.5.1 Logo / Title Section

| Element | Text / Value | Notes |
|---------|-------------|-------|
| Container | `text-center space-y-2` | — |
| Logo container | `w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 va-neon-border` | Rounded box around Skull icon |
| Logo icon | `Skull` (w-9 h-9, `text-primary va-neon-text`) | — |
| Main heading (h1) | `VENOM ARENA` | `text-4xl font-black tracking-tight va-neon-text` |
| Tagline part 1 (p) | `Hunt. Harvest. Extract. ` | `text-sm text-muted-foreground` |
| Tagline part 2 (span) | `Don't get caught.` | `text-primary font-semibold` |

#### 1.5.2 Card Wrapper

| Element | Value |
|---------|-------|
| Card class | `border-primary/20 bg-card/80 backdrop-blur` |

#### 1.5.3 Card Header

| Element | Text / Value |
|---------|-------------|
| CardTitle | `Enter the arena` (class: `text-lg`) |
| CardDescription | `Sign in or create an account to play.` |

#### 1.5.4 Tab Navigation

| Tab | `value` | Text | Icon |
|-----|---------|------|------|
| Tab 1 | `login` | `Login` | `LogIn` (w-4 h-4, mr-2) |
| Tab 2 | `register` | `Register` | `UserPlus` (w-4 h-4, mr-2) |

- Default tab: `login`
- Layout: `grid w-full grid-cols-2`
- `onValueChange` handler: clears error state (`setError(null)`)

#### 1.5.5 Social Login Divider

| Element | Text / Value |
|---------|-------------|
| Divider text | `or continue with` |
| Text class | `text-xs text-muted-foreground` with `bg-card px-2` |

- Rendered as centered text over a horizontal `border-t border-border` line

#### 1.5.6 Social Login Buttons (3 buttons in `grid grid-cols-3 gap-2`)

| Button | Label | Provider | Icon |
|--------|-------|----------|------|
| Button 1 | `Google` | `google` | Inline SVG (Google "G" logo with 4 color paths: #4285F4, #34A853, #FBBC05, #EA4335) |
| Button 2 | `Facebook` | `facebook` | Inline SVG (Facebook "f" logo, fill `#1877F2`) |
| Button 3 | `Apple` | `apple` | Inline SVG (Apple logo, fill `currentColor`) |

- All buttons: `variant="outline"`, class `w-full text-xs`, disabled when `busy`
- When `busy`: icon replaced with `Loader2` spinner (w-3.5 h-3.5, mr-1, animate-spin)
- When not busy: icon is inline SVG (w-4 h-4, mr-1)

#### 1.5.7 Guest Divider

| Element | Text / Value |
|---------|-------------|
| Divider text | `or` |
| Text class | `text-xs text-muted-foreground` with `bg-card px-2` |

- Same centered-over-line pattern as social divider

#### 1.5.8 Guest Play Button

| Element | Text / Value |
|---------|-------------|
| Button variant | `secondary` |
| Button text (idle) | `Play as Guest` |
| Icon (idle) | `Ghost` (w-4 h-4, mr-2) |
| Icon (busy) | `Loader2` (w-4 h-4, mr-2, animate-spin) |
| API endpoint | `POST /api/auth/guest` with body `{}` |

#### 1.5.9 Bottom Info Section

| Element | Text / Value |
|---------|-------------|
| Guest info text | ⚡ `Guests get 150 starter chips. Register to keep your progress.` |
| Info text class | `text-[11px] text-muted-foreground text-center` |
| Zap icon | `w-3 h-3 inline mr-1` |

#### 1.5.10 View Rules & Guide Link

| Element | Text / Value |
|---------|-------------|
| Link text | `View Rules & Guide` |
| Icon | `BookOpen` (w-3 h-3) |
| Action | Opens `GameRulesModal` dialog (`setRulesOpen(true)`) |
| Link class | `text-[11px] text-primary hover:text-primary/80 underline-offset-2 hover:underline cursor-pointer` |

#### 1.5.11 Game Rules Modal

| Element | Value |
|---------|-------|
| Component | `<GameRulesModal>` |
| Props | `isOpen={rulesOpen}`, `onClose={() => setRulesOpen(false)}` |

#### 1.5.12 Forgot Password Dialog (Modal)

| Element | Text / Value |
|---------|-------------|
| Dialog class | `bg-card border-border max-w-sm` |
| DialogTitle | `Reset Password` (with `KeyRound` icon, w-4 h-4, text-primary, gap-2) |
| DialogDescription | `Enter your email and 4-digit Security PIN to set a new password.` (class: `text-xs`) |
| Content | Renders `<ForgotPasswordForm>` |
| `onOpenChange` handler | Sets `forgotOpen`, clears error |

---

### 1.6 LoginForm Component

**Function:** `LoginForm` (internal, not exported)

**Props:**

| Prop | Type | Usage |
|------|------|-------|
| `busy` | `boolean` | Disables submit button |
| `error` | `string \| null` | Displays error message |
| `onSubmit` | `(path: string, body: unknown) => Promise<boolean>` | API call handler |
| `onForgotPassword` | `() => void` | Opens forgot password dialog |

**Local state:**

| State | Type | Default |
|-------|------|---------|
| `email` | `string` | `''` |
| `password` | `string` | `''` |
| `showPassword` | `boolean` | `false` |
| `remember` | `boolean` | `false` |

**Form submits to:** `POST /api/auth/login` with body `{ email, password, remember }`

#### 1.6.1 Email Field

| Element | Value |
|---------|-------|
| Label | `Email` (class: `text-xs`) |
| `htmlFor` | `l-email` |
| Input `id` | `l-email` |
| Input `type` | `email` |
| Input `required` | yes |
| Input `autoComplete` | `email` |
| Placeholder | `you@arena.gg` |
| Input class | `pl-8 text-sm` |
| Left icon | `Mail` (absolute, left-2.5, w-3.5 h-3.5, text-muted-foreground) |

#### 1.6.2 Password Field

| Element | Value |
|---------|-------|
| Label | `Password` (class: `text-xs`) |
| `htmlFor` | `l-pass` |
| Input `id` | `l-pass` |
| Input `type` | Dynamic: `text` when `showPassword`, else `password` |
| Input `required` | yes |
| Input `autoComplete` | `current-password` |
| Placeholder | `••••••••` |
| Input class | `pl-8 pr-9 text-sm` |
| Left icon | `KeyRound` (absolute, left-2.5, w-3.5 h-3.5, text-muted-foreground) |
| Visibility toggle button | Right side (absolute, right-2.5) |
| Toggle icon (password hidden) | `Eye` (w-3.5 h-3.5) |
| Toggle icon (password visible) | `EyeOff` (w-3.5 h-3.5) |
| Toggle button `tabIndex` | `-1` (not keyboard focusable) |

#### 1.6.3 Remember Me Checkbox

| Element | Value |
|---------|-------|
| Input `id` | `l-remember` |
| Input `type` | `checkbox` |
| Label | `Remember me (30 days)` (class: `text-[11px] text-muted-foreground cursor-pointer`) |

#### 1.6.4 Error Display

| Element | Value |
|---------|-------|
| Condition | Shown when `error` is truthy |
| Icon | `Shield` (w-3 h-3) |
| Text class | `text-xs text-destructive flex items-center gap-1` |
| Text content | The `error` string value |

#### 1.6.5 Submit Button

| Element | Value |
|---------|-------|
| Button text | `Login` |
| Button class | `w-full` |
| Disabled when | `busy` is true |
| Busy icon | `Loader2` (w-4 h-4, mr-2, animate-spin), shown when `busy &&` |

#### 1.6.6 Cross-links (below submit button)

| Element | Text / Value | Action |
|---------|-------------|--------|
| Left link | `Don't have an account? Register` ("Register" is `font-semibold`) | Programmatically clicks tab `[1]` (Register tab via DOM) |
| Right link | `Forgot Password?` | Calls `onForgotPassword()` |
| Link class (both) | `text-[11px] text-primary hover:text-primary/80 underline-offset-2 hover:underline cursor-pointer` |

---

### 1.7 RegisterForm Component

**Function:** `RegisterForm` (internal, not exported)

**Props:**

| Prop | Type | Usage |
|------|------|-------|
| `busy` | `boolean` | Disables submit button |
| `error` | `string \| null` | Displays error message |
| `onSubmit` | `(path: string, body: unknown) => Promise<boolean>` | API call handler |

**Local state:**

| State | Type | Default |
|-------|------|---------|
| `name` | `string` | `''` |
| `email` | `string` | `''` |
| `password` | `string` | `''` |
| `confirmPassword` | `string` | `''` |
| `showPassword` | `boolean` | `false` |
| `showConfirm` | `boolean` | `false` |
| `pin` | `string` | `''` |

**Form submits to:** `POST /api/auth/register` with body `{ name, email, password, pin }`

**Client-side validation (before submit):**

| Condition | Error Message | Implementation |
|-----------|--------------|----------------|
| `password !== confirmPassword` | `Passwords do not match.` | Set via `document.querySelector('[data-register-error]').textContent` |

#### 1.7.1 Display Name Field

| Element | Value |
|---------|-------|
| Label | `Display name (up to 20 chars)` (class: `text-xs`) |
| `htmlFor` | `r-name` |
| Input `id` | `r-name` |
| Input `type` | text (default) |
| Input `required` | yes |
| Input `maxLength` | `20` |
| Placeholder | `ViperStrike` |
| Input class | `text-sm` |

#### 1.7.2 Email Field

| Element | Value |
|---------|-------|
| Label | `Email` (class: `text-xs`) |
| `htmlFor` | `r-email` |
| Input `id` | `r-email` |
| Input `type` | `email` |
| Input `required` | yes |
| Input `autoComplete` | `email` |
| Placeholder | `you@arena.gg` |
| Input class | `pl-8 text-sm` |
| Left icon | `Mail` (absolute, left-2.5, w-3.5 h-3.5, text-muted-foreground) |

#### 1.7.3 Password Field

| Element | Value |
|---------|-------|
| Label | `Password (min 6 chars)` (class: `text-xs`) |
| `htmlFor` | `r-pass` |
| Input `id` | `r-pass` |
| Input `type` | Dynamic: `text` when `showPassword`, else `password` |
| Input `required` | yes |
| Input `minLength` | `6` |
| Input `autoComplete` | `new-password` |
| Placeholder | `••••••••` |
| Input class | `pl-8 pr-9 text-sm` |
| Left icon | `KeyRound` (absolute, left-2.5, w-3.5 h-3.5, text-muted-foreground) |
| Visibility toggle | `Eye` / `EyeOff` (w-3.5 h-3.5), right side, `tabIndex={-1}` |

#### 1.7.4 Password Strength Indicator

| Element | Value |
|---------|-------|
| Condition | Shown when `password.length > 0` |
| Strength label prefix | `Strength: ` (class: `text-[10px] text-muted-foreground`) |
| Strength label color | `text-emerald-500` if score >= 3; `text-yellow-500` if score >= 2; `text-red-500` otherwise |
| Progress bar container | `h-1.5 w-full bg-muted rounded-full overflow-hidden` |
| Progress bar fill | Dynamic color + width from `getPasswordStrength()`, `rounded-full transition-all duration-300` |

#### 1.7.5 Confirm Password Field

| Element | Value |
|---------|-------|
| Label | `Confirm Password` (class: `text-xs`) |
| `htmlFor` | `r-confirm` |
| Input `id` | `r-confirm` |
| Input `type` | Dynamic: `text` when `showConfirm`, else `password` |
| Input `required` | yes |
| Input `minLength` | `6` |
| Input `autoComplete` | `new-password` |
| Placeholder | `••••••••` |
| Input class | `pl-8 pr-9 text-sm` |
| Left icon | `KeyRound` (absolute, left-2.5, w-3.5 h-3.5, text-muted-foreground) |
| Visibility toggle | `Eye` / `EyeOff` (w-3.5 h-3.5), right side, `tabIndex={-1}` |
| `onChange` extra | Clears match error if `e.target.value === password` (via `[data-register-error]` DOM query) |

#### 1.7.6 Security PIN Field

| Element | Value |
|---------|-------|
| Label | `Security PIN (4 digits, optional)` (class: `text-xs`) |
| `htmlFor` | `r-pin` |
| Input `id` | `r-pin` |
| Input `type` | `text` |
| Input `inputMode` | `numeric` (mobile numeric keyboard) |
| Input `maxLength` | `4` |
| Input `pattern` | `[0-9]{0,4}` |
| Input `autoComplete` | `off` |
| Placeholder | `e.g. 1234` |
| Input class | `text-sm` |
| `onChange` filter | `e.target.value.replace(/\D/g, '')` (strips non-digits) |
| Helper text | `Required for password recovery. Keep it safe!` (class: `text-[10px] text-muted-foreground`) |

#### 1.7.7 Error Display

| Element | Value |
|---------|-------|
| Error element | `data-register-error` attribute (used by DOM manipulation) |
| Icon | `Shield` (w-3 h-3, shrink-0) |
| Text class | `text-xs text-destructive flex items-center gap-1` |
| Hidden error slot | Always rendered as empty `<p data-register-error />` when no error (for DOM target) |

#### 1.7.8 Submit Button

| Element | Value |
|---------|-------|
| Button text | `Create Account` |
| Button class | `w-full` |
| Disabled when | `busy` is true |
| Busy icon | `Loader2` (w-4 h-4, mr-2, animate-spin) |

#### 1.7.9 Cross-link to Login

| Element | Text / Value | Action |
|---------|-------------|--------|
| Link text | `Already have an account? Login` ("Login" is `font-semibold`) | Programmatically clicks tab `[0]` (Login tab via DOM) |
| Link class | `text-[11px] text-primary hover:text-primary/80 underline-offset-2 hover:underline cursor-pointer` |

---

### 1.8 ForgotPasswordForm Component

**Function:** `ForgotPasswordForm` (internal, not exported)

**Props:**

| Prop | Type | Usage |
|------|------|-------|
| `busy` | `boolean` | Parent busy state |
| `error` | `string \| null` | Parent error state |
| `onSuccess` | `() => void` | Called on successful reset |

**Local state:**

| State | Type | Default |
|-------|------|---------|
| `email` | `string` | `''` |
| `securityPin` | `string` | `''` |
| `newPassword` | `string` | `''` |
| `confirmNew` | `string` | `''` |
| `localError` | `string \| null` | `null` |
| `localBusy` | `boolean` | `false` |
| `success` | `boolean` | `false` |
| `showNewPassword` | `boolean` | `false` |

**Form submits to:** `POST /api/auth/forgot-password` with body `{ email, securityPin, newPassword }`

**Client-side validation:**

| Condition | Error Message |
|-----------|--------------|
| `newPassword !== confirmNew` | `Passwords do not match.` |

**API error fallback messages:**

| Message | Trigger |
|---------|---------|
| `data?.error \|\| 'Failed to reset password.'` | API response not `ok` |
| `'Network error. Please try again.'` | `catch` block (fetch failure) |

#### 1.8.1 Success State

Shown when `success === true`:

| Element | Text / Value |
|---------|-------------|
| Success icon container | `w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto` |
| Success icon | `Shield` (w-6 h-6, `text-emerald-400`) |
| Heading | `Password Reset!` (class: `text-sm font-semibold text-foreground`) |
| Description | `Your password has been changed. You can now log in with your new password.` (class: `text-xs text-muted-foreground`) |
| Action button | `Back to Login` (size `sm`, class `mt-2`) — calls `onSuccess()` |

#### 1.8.2 Email Field (Forgot Password)

| Element | Value |
|---------|-------|
| Label | `Email` (class: `text-xs`) |
| `htmlFor` | `fp-email` |
| Input `id` | `fp-email` |
| Input `type` | `email` |
| Input `required` | yes |
| Placeholder | `you@arena.gg` |
| Input class | `text-sm` |
| Note | No left Mail icon in this variant |

#### 1.8.3 Security PIN Field (Forgot Password)

| Element | Value |
|---------|-------|
| Label | `4-Digit Security PIN` (class: `text-xs`) |
| `htmlFor` | `fp-pin` |
| Input `id` | `fp-pin` |
| Input `type` | `text` |
| Input `inputMode` | `numeric` |
| Input `required` | yes |
| Input `maxLength` | `4` |
| Input `pattern` | `[0-9]{4}` |
| Input `autoComplete` | `off` |
| Placeholder | `1234` |
| Input class | `text-sm` |
| `onChange` filter | `e.target.value.replace(/\D/g, '')` (strips non-digits) |
| Helper text | `This is the PIN you set during registration.` (class: `text-[10px] text-muted-foreground`) |

#### 1.8.4 New Password Field (Forgot Password)

| Element | Value |
|---------|-------|
| Label | `New Password (min 6 chars)` (class: `text-xs`) |
| `htmlFor` | `fp-new` |
| Input `id` | `fp-new` |
| Input `type` | Dynamic: `text` when `showNewPassword`, else `password` |
| Input `required` | yes |
| Input `minLength` | `6` |
| Placeholder | `••••••••` |
| Input class | `pr-9 text-sm` |
| Visibility toggle | `Eye` / `EyeOff` (w-3.5 h-3.5), right side, `tabIndex={-1}` |
| Note | No left KeyRound icon in this variant |

#### 1.8.5 Confirm New Password Field (Forgot Password)

| Element | Value |
|---------|-------|
| Label | `Confirm New Password` (class: `text-xs`) |
| `htmlFor` | `fp-confirm` |
| Input `id` | `fp-confirm` |
| Input `type` | `password` (always hidden — no toggle) |
| Input `required` | yes |
| Input `minLength` | `6` |
| Placeholder | `••••••••` |
| Input class | `text-sm` |
| `onChange` extra | Clears `localError` if `e.target.value === newPassword` |

#### 1.8.6 Error Display (Forgot Password)

| Element | Value |
|---------|-------|
| Condition | Shown when `localError \|\| error` is truthy |
| Text class | `text-xs text-destructive` (no icon) |
| Text content | `localError \|\| error` |

#### 1.8.7 Submit Button (Forgot Password)

| Element | Value |
|---------|-------|
| Button text | `Reset Password` |
| Button class | `w-full` |
| Disabled when | `localBusy \|\| busy` |
| Busy icon | `Loader2` (w-4 h-4, mr-2, animate-spin) |

---

### 1.9 Complete API Endpoints Referenced in Auth Gate

| Endpoint | Method | Body Fields | Called From |
|----------|--------|-------------|-------------|
| `/api/auth/login` | POST | `{ email, password, remember }` | LoginForm |
| `/api/auth/register` | POST | `{ name, email, password, pin }` | RegisterForm |
| `/api/auth/guest` | POST | `{}` | AuthScreen (Guest button) |
| `/api/auth/forgot-password` | POST | `{ email, securityPin, newPassword }` | ForgotPasswordForm |
| `/api/auth/social-login?provider={provider}` | GET (redirect) | Query param only | Social login buttons |

---

### 1.10 Code Comments in auth-gate.tsx

| Line(s) | Comment |
|---------|---------|
| 34–36 | `// Password strength calculator` |
| 52 | `// AuthGate — loading skeleton → AuthScreen` |
| 70 | `// AuthScreen — main auth page with all tabs, social buttons, forgot password` |
| 79 | `// Per-tab error handling — clear error when switching tabs` |
| 109–110 | `// Redirect to the server-side OAuth initiation` |
| 117 | `{/* Logo / Title */}` |
| 155 | `{/* Divider */}` |
| 165 | `{/* Social Login Buttons */}` |
| 211 | `{/* Divider */}` |
| 221 | `{/* Guest Play */}` |
| 238 | `{/* Bottom info */}` |
| 245 | `{/* View Rules & Guide link */}` |
| 260 | `{/* Game Rules Modal */}` |
| 263 | `{/* Forgot Password Modal */}` |
| 290–292 | `// LoginForm` |
| 358 | `{/* Remember me */}` |
| 379 | `{/* Cross-links */}` |
| 385 | `// Switch to register tab` |
| 407–409 | `// RegisterForm` |
| 489 | `{/* Password strength indicator */}` |
| 564 | `{/* Cross-link to login */}` |
| 584–586 | `// ForgotPasswordForm (used inside the Dialog)` |
| 514 | `// Clear match error if they now match` |
| 432 | `// Manually set error through parent — we can't call setError from here / so we use a temporary approach` |
| 741–743 | `// Export skeleton` |

---

## 2. AUTH LIBRARY (`lib/auth.ts`)

**File:** `src/lib/auth.ts` (82 lines)

### 2.1 Imports

| Import | Source |
|--------|--------|
| `jwt` (default) | `jsonwebtoken` |
| `cookies` | `next/headers` |
| `db` | `./db` |
| `bcrypt` | `bcryptjs` |

### 2.2 Constants

| Constant | Value | Notes |
|----------|-------|-------|
| `JWT_SECRET` | `process.env.JWT_SECRET \|\| 'venom-arena-dev-secret-change-in-prod'` | Fallback for development |
| `COOKIE_NAME` | `'va_session'` | Session cookie name |
| `SESSION_DAYS` | `30` | Default session expiry in days |

### 2.3 Exported Types

**Interface:** `SessionPayload`

| Field | Type | Notes |
|-------|------|-------|
| `playerId` | `string` | — |
| `userTag` | `string` | — |
| `role` | `'player' \| 'admin'` | Union literal |
| `iat?` | `number` | Optional, JWT issued-at |
| `exp?` | `number` | Optional, JWT expiry |

### 2.4 Exported Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `signSession` | `(payload: Omit<SessionPayload, 'iat' \| 'exp'>, expiresIn?: string) => Promise<string>` | JWT string | Signs a session token. Default expiry: `${SESSION_DAYS}d` (30 days) |
| `verifySession` | `(token: string) => SessionPayload \| null` | Payload or null | Verifies a JWT. Returns null on any error. |
| `getSession` | `() => Promise<SessionPayload \| null>` | Payload or null | Reads `va_session` cookie, verifies JWT. Returns null if banned player (`player.banned === true`). |
| `setSessionCookie` | `(token: string, maxAgeSeconds?: number) => Promise<void>` | void | Sets `va_session` cookie with `httpOnly: true`, `sameSite: 'lax'`, `secure` in production. Default maxAge: `SESSION_DAYS * 24 * 60 * 60` (30 days in seconds). Path: `/`. |
| `clearSessionCookie` | `() => Promise<void>` | void | Deletes `va_session` cookie. |
| `hashPassword` | `(plain: string) => Promise<string>` | bcrypt hash | Uses bcrypt with salt rounds `10`. |
| `verifyPassword` | `(plain: string, hash: string) => Promise<boolean>` | boolean | Uses `bcrypt.compare`. |
| `generateUserTag` | `() => string` | string | Generates tag like `VENOM-{NNNN}` where NNNN is random 1000–9999. |
| `generateUniqueUserTag` | `() => Promise<string>` | string | Tries up to 20 times to find a non-colliding tag via DB check. Fallback: `VENOM-{random 0-9999999}`. |

### 2.5 Code Comments

| Line(s) | Comment |
|---------|---------|
| 37 | `// Invalidate session for banned players` |
| 67 | `// Generate a unique user tag like VENOM-8291` |
| 74 | `// Try up to 20 times to find a non-colliding tag` |
| 80 | `// Fallback: use a longer random` |

---

## 3. CONSTANTS (`lib/constants.ts`)

**File:** `src/lib/constants.ts` (2 lines)

### 3.1 Code Comment

| Line | Comment |
|------|---------|
| 1 | `// Small shared constants — keep here to avoid circular imports` |

### 3.2 Exported Constants

| Constant | Value | Type |
|----------|-------|------|
| `DEFAULT_UNLOCKED_SKINS` | `['skin-default', 'trail-none', 'death-default']` | `string[]` |

Contains 3 skin identifiers: the default snake skin, the no-trail option, and the default death burst effect.

---

## 4. OAUTH LIBRARY (`lib/oauth.ts`)

**File:** `src/lib/oauth.ts` (210 lines)

### 4.1 Exported Types

**Constant:** `OAUTH_PROVIDERS` — `['google', 'facebook', 'apple'] as const`

**Type alias:** `OAuthProvider` — union of `'google' | 'facebook' | 'apple'`

**Interface:** `OAuthUserInfo`

| Field | Type | Notes |
|-------|------|-------|
| `provider` | `OAuthProvider` | — |
| `providerId` | `string` | Unique ID from the provider |
| `email` | `string` | — |
| `name` | `string` | — |
| `avatar?` | `string` | Optional |

**Interface:** `OAuthConfig`

| Field | Type |
|-------|------|
| `clientId` | `string` |
| `clientSecret` | `string` |
| `authUrl` | `string` |
| `tokenUrl` | `string` |
| `userInfoUrl` | `string` |
| `scopes` | `string[]` |

### 4.2 Internal Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `getBaseUrl` | `() => string` | string | Returns `process.env.NEXTAUTH_URL \|\| process.env.NEXT_PUBLIC_BASE_URL \|\| 'http://localhost:3000'` |

### 4.3 Exported Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `getRedirectUri` | `() => string` | string | Returns `${getBaseUrl()}/api/auth/social-callback` |
| `getProviderConfig` | `(provider: OAuthProvider) => OAuthConfig \| null` | Config or null | Returns null if env vars `{PROVIDER}_CLIENT_ID` or `{PROVIDER}_CLIENT_SECRET` missing |
| `getAuthorizationUrl` | `(provider: OAuthProvider, state: string) => string \| null` | URL or null | Builds full OAuth authorization URL with redirect URI, scopes, and state param |
| `exchangeCodeForTokens` | `(provider: OAuthProvider, code: string) => Promise<{ accessToken, idToken?, refreshToken? } \| null>` | Token set or null | POSTs to provider token URL with `application/x-www-form-urlencoded` |
| `getUserInfo` | `(provider: OAuthProvider, accessToken: string, idToken?: string) => Promise<OAuthUserInfo \| null>` | User info or null | Fetches user profile from provider. Apple decodes JWT payload from `idToken`. Default name: `'Player'`. |
| `getSetupGuide` | `(provider: OAuthProvider) => string` | string | Returns setup instructions for each provider (URLs to Google Console, Facebook Developers, Apple Developer) |
| `isProviderConfigured` | `(provider: OAuthProvider) => boolean` | boolean | Checks if `getProviderConfig` returns non-null |

### 4.4 Provider Configurations

**Google:**

| Field | Value |
|-------|-------|
| `authUrl` | `https://accounts.google.com/o/oauth2/v2/auth` |
| `tokenUrl` | `https://oauth2.googleapis.com/token` |
| `userInfoUrl` | `https://www.googleapis.com/oauth2/v2/userinfo` |
| `scopes` | `['openid', 'email', 'profile']` |
| Extra params | `access_type=offline`, `prompt=select_account` |

**Facebook:**

| Field | Value |
|-------|-------|
| `authUrl` | `https://www.facebook.com/v18.0/dialog/oauth` |
| `tokenUrl` | `https://graph.facebook.com/v18.0/oauth/access_token` |
| `userInfoUrl` | `https://graph.facebook.com/v18.0/me?fields=id,name,email,picture` |
| `scopes` | `['email', 'public_profile']` |

**Apple:**

| Field | Value |
|-------|-------|
| `authUrl` | `https://appleid.apple.com/auth/authorize` |
| `tokenUrl` | `https://appleid.apple.com/auth/token` |
| `userInfoUrl` | `''` (empty — Apple returns user info in token response + ID token) |
| `scopes` | `['name', 'email']` |
| Extra params | `response_type=code%20id_token`, `response_mode=form_post` |

### 4.5 Apple-Specific Name Fallback

When Apple doesn't provide a name (subsequent logins): `email.split('@')[0]` or `'Player'` if no email.

### 4.6 Console Error Messages (from oauth.ts)

| Message | Trigger |
|---------|---------|
| `` `[oauth/${provider}] token exchange failed:` `` | Token response not `ok` |
| `` `[oauth/${provider}] token exchange error:` `` | Fetch/parse error in `exchangeCodeForTokens` |
| `` `[oauth/${provider}] getUserInfo error:` `` | Fetch/parse error in `getUserInfo` |

### 4.7 Setup Guide Text (verbatim)

| Provider | Guide Text |
|----------|-----------|
| Google | `Go to https://console.cloud.google.com → APIs & Services → Credentials → Create OAuth 2.0 Client ID. Add redirect URI: {redirectUri}` |
| Facebook | `Go to https://developers.facebook.com → My Apps → Create App → Add Facebook Login. Set redirect URI: {redirectUri}` |
| Apple | `Go to https://developer.apple.com → Certificates → Register an App ID with Sign in with Apple. Set redirect URI: {redirectUri}` |

### 4.8 Code Comments

| Line(s) | Comment |
|---------|---------|
| 1–3 | `// OAuth Utility Library — Google, Facebook, Apple` |
| 174 | `// Apple returns user info in the ID token (JWT)` |
| 176 | `// Decode the JWT payload without verification (Apple verifies server-side)` |
| 181 | `// Apple only sends name on FIRST authorization via POST body, not in ID token` |
| 182 | `// For subsequent logins, we need to use the email/sub to find the existing account` |

---

## 5. API HELPERS (`lib/api-helpers.ts`)

**File:** `src/lib/api-helpers.ts` (22 lines)

### 5.1 Code Comments

| Line(s) | Comment |
|---------|---------|
| 1–3 | `// Shared API route helpers — reduce boilerplate across 20+ routes.` |

### 5.2 Imports

| Import | Source |
|--------|--------|
| `NextResponse` | `next/server` |
| `getSession` | `@/lib/auth` |

### 5.3 Exported Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `requireAuth` | `() => Promise<{ session: SessionPayload \| null, error: NextResponse \| null }>` | Session+error tuple | Calls `getSession()`. If null, returns `{ error: NextResponse.json({ error: 'Not authenticated.' }, { status: 401 }) }`. |

**JSDoc usage example:**
```
const { session, error } = await requireAuth();
if (error) return error;
```

### 5.4 Error Messages

| Message | HTTP Status | Trigger |
|---------|-------------|---------|
| `'Not authenticated.'` | 401 | `getSession()` returns null |

---

## 6. GAME CONFIG DB (`lib/game-config-db.ts`)

**File:** `src/lib/game-config-db.ts` (461 lines)

### 6.1 Internal Interface

**Interface:** `GameConfigEntry`

| Field | Type |
|-------|------|
| `key` | `string` |
| `value` | `string` (JSON-encoded) |
| `label` | `string` |
| `category` | `string` |
| `order` | `number` |
| `type` | `string` |

### 6.2 Exported Constants

**Constant:** `DEFAULT_GAME_CONFIG` — `GameConfigEntry[]` (40 entries across 9 categories)

#### Category: `snake_physics` (10 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `snake.collisionRadius` | `6` | `Collision radius (px)` | 0 |
| `snake.visualRadius` | `8` | `Visual radius (px)` | 1 |
| `snake.segmentSpacing` | `16` | `Segment spacing (px)` | 2 |
| `snake.baseSpeed` | `4.5` | `Base move speed` | 3 |
| `snake.boostSpeed` | `8.0` | `Boost speed` | 4 |
| `snake.turnBase` | `0.35` | `Base turn rate (rad/tick)` | 5 |
| `snake.turnMin` | `0.08` | `Min turn rate (rad/tick)` | 6 |
| `snake.turnScoreFactor` | `0.0003` | `Turn rate score penalty` | 7 |
| `snake.initialBodyLength` | `20` | `Initial body segments at spawn` | 8 |
| `snake.initialSpawnScore` | `20` | `Starting score` | 9 |

#### Category: `snake_growth` (4 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `growth.maxSegments` | `200` | `Max body segments (hard cap)` | 0 |
| `growth.lengthLogFactor` | `20` | `Length growth: log factor` | 1 |
| `growth.maxExtraRadius` | `3` | `Max extra thickness (px) beyond base` | 2 |
| `growth.thicknessLogFactor` | `0.5` | `Thickness growth: log factor` | 3 |

#### Category: `boost_system` (2 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `boost.minLength` | `8` | `Min segments to boost` | 0 |
| `boost.dropInterval` | `10` | `Frames between tail drops during boost` | 1 |

#### Category: `collision` (4 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `collision.hitFactor` | `0.75` | `Body collision hit factor` | 0 |
| `collision.headOnHitFactor` | `0.8` | `Head-on collision hit factor` | 1 |
| `collision.neckAngleThreshold` | `60` | `Neck protection angle threshold (degrees)` | 2 |
| `collision.neckSegmentCount` | `5` | `Neck protection segment count` | 3 |

#### Category: `food_system` (11 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `food.smallValue` | `1` | `Small food value` | 0 |
| `food.smallRadius` | `3` | `Small food radius` | 1 |
| `food.smallWeight` | `0.93` | `Small food spawn weight` | 2 |
| `food.mediumValue` | `3` | `Medium food value` | 3 |
| `food.mediumRadius` | `5` | `Medium food radius` | 4 |
| `food.mediumWeight` | `0.04` | `Medium food spawn weight` | 5 |
| `food.largeValue` | `5` | `Large food value` | 6 |
| `food.largeRadius` | `8` | `Large food radius` | 7 |
| `food.largeWeight` | `0.03` | `Large food spawn weight` | 8 |
| `food.countTarget` | `1200` | `Target food count per arena` | 9 |
| `food.starDropCount` | `10` | `Star chips dropped on player death` | 10 |

#### Category: `extraction` (2 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `extraction.durationMs` | `3000` | `Extraction duration (ms)` | 0 |
| `extraction.glideSpeed` | `3.2` | `Speed while extracting` | 1 |

#### Category: `spawning` (4 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `spawning.safeDistance` | `500` | `Min distance from other snakes` | 0 |
| `spawning.safeBoundaryMargin` | `500` | `Min distance inside boundary` | 1 |
| `spawning.safeAttempts` | `30` | `Max spawn attempts` | 2 |
| `spawning.protectionMs` | `4000` | `Spawn protection duration (ms)` | 3 |

#### Category: `map_settings` (4 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `map.minRadius` | `3000` | `Min map radius (1 player)` | 0 |
| `map.maxRadius` | `16000` | `Max map radius (1000 players)` | 1 |
| `map.breathAmplitude` | `40` | `Breathing amplitude (px)` | 2 |
| `map.breathCycleMs` | `10000` | `Breathing cycle duration (ms)` | 3 |

#### Category: `bot_settings` (3 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `bot.selfDestructThreshold` | `100` | `Bot self-destruct score (online)` | 0 |
| `bot.evadeRadius` | `300` | `Bot evade radius` | 1 |
| `bot.foodScanRadius` | `300` | `Bot food scan radius` | 2 |

#### Category: `economy` (3 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `economy.commissionThreshold` | `4` | `Min real players for commission` | 0 |
| `economy.commissionRate` | `0.35` | `Commission rate (0-1)` | 1 |
| `economy.guestStarterChips` | `150` | `Guest starter chips` | 2 |

### 6.3 Exported Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `seedGameConfig` | `() => Promise<void>` | void | Upserts all 40 default config entries into `GameConfig` table. Existing rows left untouched. |
| `getGameConfig` | `() => Promise<Record<string, any>>` | Flat key-value map | Loads ALL configs from DB, parses JSON values. Ordered by `order asc`. |
| `getGameConfigValue` | `(key: string) => Promise<any>` | any or `undefined` | Gets single config value by key. Returns `undefined` if not found. |

### 6.4 Code Comments

| Line(s) | Comment |
|---------|---------|
| 12 | `/** Ordered list of every default game-config entry, grouped by category. */` |
| 411–414 | `/** Upsert every default config entry into the GameConfig table. Safe to call repeatedly — existing rows are left untouched. */` |
| 432–435 | `/** Load ALL configs from DB and return as a flat Record<string, any>. Each stored JSON string is parsed back to its native type. */` |
| 449–452 | `/** Get a single config value by key. Returns \`undefined\` if the key does not exist in the database. */` |

---

## 7. PLAYER HELPERS (`lib/player-helpers.ts`)

**File:** `src/lib/player-helpers.ts` (56 lines)

### 7.1 Imports

| Import | Source |
|--------|--------|
| `db` | `./db` |
| `Player` (type) | `@prisma/client` |
| `PlayerProfile` (type) | `./types` |

### 7.2 Exported Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `toProfile` | `(p: Player) => PlayerProfile` | `PlayerProfile` | Converts Prisma Player to public PlayerProfile. Parses `unlockedSkins` JSON. Sets `securityPin: !!p.securityPin` (boolean). Converts dates to ISO strings. |
| `encodeSkins` | `(skins: string[]) => string` | string | JSON-stringifies array, deduplicating with `new Set()`. |
| `getFirstAdmin` | `() => Promise<Player \| null>` | Player or null | Finds first player with `role: 'admin'`. |

### 7.3 toProfile Field Mapping

All fields mapped from Prisma Player to PlayerProfile:

| Profile Field | Source |
|---------------|--------|
| `id` | `p.id` |
| `userTag` | `p.userTag` |
| `name` | `p.name` |
| `email` | `p.email` |
| `country` | `p.country` |
| `avatar` | `p.avatar` |
| `role` | `p.role as 'player' \| 'admin'` |
| `bankedChips` | `p.bankedChips` |
| `totalEarned` | `p.totalEarned` |
| `totalLost` | `p.totalLost` |
| `level` | `p.level` |
| `xp` | `p.xp` |
| `lifetimeKills` | `p.lifetimeKills` |
| `lifetimeDeaths` | `p.lifetimeDeaths` |
| `lifetimeExtracts` | `p.lifetimeExtracts` |
| `bestStreak` | `p.bestStreak` |
| `biggestExtract` | `p.biggestExtract` |
| `dailyStreak` | `p.dailyStreak` |
| `lastDailyClaim` | `p.lastDailyClaim` |
| `unlockedSkins` | Parsed from `p.unlockedSkins` (JSON array, fallback `[]`) |
| `currentSkin` | `p.currentSkin` |
| `currentTrail` | `p.currentTrail` |
| `currentDeath` | `p.currentDeath` |
| `currentFlag` | `p.currentFlag` |
| `currentBanner` | `p.currentBanner` |
| `clanTag` | `p.clanTag` |
| `clanRank` | `p.clanRank` |
| `securityPin` | `!!p.securityPin` (converted to boolean) |
| `oauthProvider` | `p.oauthProvider` |
| `createdAt` | `p.createdAt.toISOString()` |
| `lastSeenAt` | `p.lastSeenAt.toISOString()` |

### 7.4 Code Comments

| Line(s) | Comment |
|---------|---------|
| 48 | `// Serialized JSON helper for unlockedSkins` |

---

## 8. DATE UTILITIES (`lib/date-utils.ts`)

**File:** `src/lib/date-utils.ts` (40 lines)

### 8.1 Internal Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `fmt` | `(date: Date) => string` | `YYYY-MM-DD` | Formats a Date to UTC date string. Uses `getUTCFullYear`, `getUTCMonth`, `getUTCDate` with zero-padding. |

### 8.2 Exported Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `utcToday` | `() => string` | `YYYY-MM-DD` | Today's date in UTC |
| `utcMonday` | `() => string` | `YYYY-MM-DD` | Most recent Monday in UTC. Sunday (day 0) treated as 6 days back. |
| `utcYesterday` | `() => string` | `YYYY-MM-DD` | Yesterday's date in UTC |
| `utcLastMonday` | `() => string` | `YYYY-MM-DD` | Previous week's Monday in UTC (7 days before current Monday) |

### 8.3 Code Comments

| Line(s) | Comment |
|---------|---------|
| 1–4 | `// Shared date utility functions. Used by challenges, match/result, and challenges/progress routes.` |
| 6 | `/** Format a Date to YYYY-MM-DD in UTC */` |
| 11 | `/** Get today's date in UTC as YYYY-MM-DD */` |
| 16 | `/** Get the most recent Monday in UTC as YYYY-MM-DD */` |
| 19 | `// 0=Sun … 6=Sat` |
| 20 | `// shift so Monday=0` |
| 25 | `/** Get yesterday's date in UTC as YYYY-MM-DD */` |
| 32 | `/** Get the previous week's Monday in UTC as YYYY-MM-DD */` |

---

## 9. DATABASE CLIENT (`lib/db.ts`)

**File:** `src/lib/db.ts` (18 lines)

### 9.1 Imports

| Import | Source |
|--------|--------|
| `PrismaClient` | `@prisma/client` |

### 9.2 Exported Constants

| Constant | Value | Type | Notes |
|----------|-------|------|-------|
| `db` | Singleton `PrismaClient` | `PrismaClient` | Global singleton to prevent multiple instances in development. Logs `['query']` in development mode only. |

### 9.3 Singleton Pattern

- Uses `globalThis` casting to hold the PrismaClient instance across hot reloads in dev
- Only persists to global in non-production (`process.env.NODE_ENV !== 'production'`)
- Development logging: `log: process.env.NODE_ENV === 'development' ? ['query'] : []`

---

## 10. UTILITY (`lib/utils.ts`)

**File:** `src/lib/utils.ts` (6 lines)

### 10.1 Imports

| Import | Source |
|--------|--------|
| `clsx`, `ClassValue` (type) | `clsx` |
| `twMerge` | `tailwind-merge` |

### 10.2 Exported Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `cn` | `(...inputs: ClassValue[]) => string` | string | Merges Tailwind CSS classes using `twMerge(clsx(inputs))` — deduplicates and resolves conflicting utility classes. |

---

## 11. useMobile Hook (`hooks/use-mobile.ts`)

**File:** `src/hooks/use-mobile.ts` (19 lines)

### 11.1 Constants

| Constant | Value | Notes |
|----------|-------|-------|
| `MOBILE_BREAKPOINT` | `768` | Pixel width threshold for mobile detection |

### 11.2 Exported Functions

| Hook | Signature | Returns | Description |
|------|-----------|---------|-------------|
| `useIsMobile` | `() => boolean` | `boolean` | Returns `true` if `window.innerWidth < 768`. Uses `matchMedia("(max-width: 767px)")` with change event listener. Initial state: `undefined` (becomes boolean after first effect). Final return coerces to `!!isMobile` (false when undefined). |

---

## 12. useToast Hook (`hooks/use-toast.ts`)

**File:** `src/hooks/use-toast.ts` (193 lines)

### 12.1 Code Comments

| Line(s) | Comment |
|---------|---------|
| 3 | `// Inspired by react-hot-toast library` |

### 12.2 Internal Constants

| Constant | Value | Notes |
|----------|-------|-------|
| `TOAST_LIMIT` | `1` | Maximum visible toasts at once |
| `TOAST_REMOVE_DELAY` | `1000000` | ms delay before removing dismissed toast (~16.7 minutes) |

### 12.3 Internal Types

| Type | Fields |
|------|--------|
| `ToasterToast` | Extends `ToastProps` + `id: string`, `title?: ReactNode`, `description?: ReactNode`, `action?: ToastActionElement` |
| `actionTypes` | Object with 4 string constants: `ADD_TOAST`, `UPDATE_TOAST`, `DISMISS_TOAST`, `REMOVE_TOAST` |
| `Action` | Discriminated union on `actionTypes` — 4 variants for add/update/dismiss/remove |
| `State` | `{ toasts: ToasterToast[] }` |
| `Toast` | `Omit<ToasterToast, 'id'>` |

### 12.4 Internal Functions

| Function | Signature | Description |
|----------|-----------|---------|
| `genId` | `() => string` | Auto-incrementing counter mod `Number.MAX_SAFE_INTEGER` |
| `addToRemoveQueue` | `(toastId: string) => void` | Schedules `REMOVE_TOAST` dispatch after `TOAST_REMOVE_DELAY` ms. Deduplicates via Map. |
| `dispatch` | `(action: Action) => void` | Updates `memoryState` via reducer, notifies all listeners. |
| `toast` | `(props: Toast) => { id, dismiss, update }` | Creates toast, dispatches `ADD_TOAST`, returns controls. |

### 12.5 Exported Items

| Export | Type | Description |
|--------|------|-------------|
| `reducer` | `(state: State, action: Action) => State` | Handles 4 action types: ADD (prepend, slice to `TOAST_LIMIT`), UPDATE (merge by id), DISMISS (set `open: false`, schedule remove), REMOVE (filter by id or clear all) |
| `useToast` | `() => { ...state, toast, dismiss }` | React hook. Returns current state (toasts array), `toast()` function, and `dismiss(toastId?)` function. Subscribes to state changes via listener pattern. |
| `toast` | `(props: Toast) => { id, dismiss, update }` | Standalone function to create a toast. Returns `{ id, dismiss, update }` controls. |

---

## MASTER TEXT INVENTORY — ALL USER-FACING STRINGS

Below is every user-facing text string found in the auth gate component, organized alphabetically:

| String | Location |
|--------|----------|
| `150` (in "Guests get 150 starter chips...") | AuthScreen bottom info |
| `4-digit Security PIN` (forgot password label) | ForgotPasswordForm |
| `Already have an account? Login` | RegisterForm cross-link |
| `Apple` | Social login button |
| `Back to Login` | ForgotPasswordForm success button |
| `Confirm New Password` | ForgotPasswordForm label |
| `Confirm Password` | RegisterForm label |
| `Create Account` | RegisterForm submit button |
| `Display name (up to 20 chars)` | RegisterForm label |
| `Don't get caught.` | AuthScreen tagline (emphasized) |
| `Email` | LoginForm, RegisterForm, ForgotPasswordForm labels |
| `Enter the arena` | Card title |
| `Enter your email and 4-digit Security PIN to set a new password.` | Forgot Password dialog description |
| `Facebook` | Social login button |
| `Forgot Password?` | LoginForm cross-link |
| `Good` | Password strength label |
| `Google` | Social login button |
| `Guests get 150 starter chips. Register to keep your progress.` | AuthScreen bottom info |
| `Hunt. Harvest. Extract. ` | AuthScreen tagline (part 1) |
| `Loading arena…` | AuthGate loading state |
| `Login` | Tab label, LoginForm submit button |
| `Network error. Please try again.` | callApi catch, ForgotPasswordForm catch |
| `New Password (min 6 chars)` | ForgotPasswordForm label |
| `Passwords do not match.` | RegisterForm validation, ForgotPasswordForm validation |
| `Password` | LoginForm label |
| `Password (min 6 chars)` | RegisterForm label |
| `Password Reset!` | ForgotPasswordForm success heading |
| `Play as Guest` | Guest button |
| `Register` | Tab label |
| `Remember me (30 days)` | LoginForm checkbox label |
| `Required for password recovery. Keep it safe!` | RegisterForm PIN helper text |
| `Reset Password` | Forgot Password dialog title, submit button |
| `Security PIN (4 digits, optional)` | RegisterForm label |
| `Sign in or create an account to play.` | Card description |
| `Something went wrong.` | callApi fallback error |
| `Strength:` | RegisterForm password strength prefix |
| `Strong` | Password strength label |
| `VENOM ARENA` | Main heading |
| `View Rules & Guide` | AuthScreen bottom link |
| `Weak` | Password strength label |
| `Your password has been changed. You can now log in with your new password.` | ForgotPasswordForm success description |
| `or` | Guest divider |
| `or continue with` | Social login divider |

**Placeholders:**

| Placeholder | Location |
|-------------|----------|
| `you@arena.gg` | All email fields |
| `••••••••` | All password fields |
| `e.g. 1234` | RegisterForm Security PIN |
| `1234` | ForgotPasswordForm PIN |
| `ViperStrike` | RegisterForm Display name |

**Password strength labels:** `Weak`, `Fair`, `Good`, `Strong`

**Non-user-facing error strings:**

| String | Location |
|--------|----------|
| `'Not authenticated.'` | api-helpers.ts (HTTP 401 JSON) |
| `Failed to reset password.` | ForgotPasswordForm API fallback |
| `'Player'` | oauth.ts fallback name |
| `'venom-arena-dev-secret-change-in-prod'` | auth.ts JWT secret fallback |

---

*End of Task 10 catalog.*

---

11-api-routes.md
===
# 11 — API Routes Catalog

Exhaustive catalog of every API route in the old Venom Arena project (`src/app/api/`).
Source: Next.js App Router route files.

---

## 1. AUTH Routes

### 1.1 POST /api/auth/register

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `email` | string | Required. Trimmed, lowercased. Must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. |
| `password` | string | Required. Minimum 6 characters. |
| `name` | string | Required. Trimmed, sliced to max 20 characters. |
| `pin` | string | Optional. If provided, must match `/^\d{4}$/` (exactly 4 digits). |

**Response (200):**
```json
{ "player": { /* toProfile(player) */ } }
```

**Error Messages (exact text):**
- `400` — "Valid email is required."
- `400` — "Password must be at least 6 characters."
- `400` — "Display name is required."
- `400` — "Security PIN must be exactly 4 digits."
- `409` — "Email already registered. Try logging in."
- `500` — "Registration failed. Please try again."

**Business Logic:**
- Hashes password via `hashPassword()`.
- Generates unique userTag via `generateUniqueUserTag()`.
- New player starts with:
  - `country`: `'US'`
  - `unlockedSkins`: `encodeSkins(DEFAULT_UNLOCKED_SKINS)`
  - `bankedChips`: `150`
  - `totalEarned`: `150`
- Signs session JWT with `{ playerId, userTag, role: 'player' }`.
- Sets session cookie.
- Also catches Prisma `P2002` unique-constraint error, returns 409.

**Database Operations:**
- `db.player.findUnique({ where: { email } })` — check duplicate
- `db.player.create({ data: { email, passwordHash, securityPin, userTag, name, country, unlockedSkins, bankedChips, totalEarned } })`

---

### 1.2 POST /api/auth/login

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `email` | string | Required. Trimmed, lowercased. |
| `password` | string | Required. |
| `remember` | boolean | Optional. Controls session duration. |

**Response (200):**
```json
{ "player": { /* toProfile(player) */ } }
```

**Error Messages (exact text):**
- `400` — "Email and password are required."
- `401` — "Invalid email or password."
- `403` — "This account has been banned."
- `500` — "Login failed. Please try again."

**Business Logic:**
- Constants: `SESSION_REMEMBER_DAYS = 30`, `SESSION_DEFAULT_DAYS = 7`.
- If `remember` is true, session cookie maxAge = `30 * 24 * 60 * 60` seconds (30 days).
- If `remember` is false, session cookie maxAge = `7 * 24 * 60 * 60` seconds (7 days).
- Signs session with `{ playerId, userTag, role }` where role is `'player' | 'admin'`.
- Updates `lastSeenAt` to `new Date()` on successful login.
- Returns 401 if player not found OR has no `passwordHash` (guest/OAuth accounts).

**Database Operations:**
- `db.player.findUnique({ where: { email } })`
- `db.player.update({ where: { id }, data: { lastSeenAt: new Date() } })`

---

### 1.3 POST /api/auth/guest

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `name` | string | Optional. Defaults to `'Guest'`. Trimmed, sliced to max 20 characters. |

**Response (200):**
```json
{ "player": { /* toProfile(player) */ } }
```

**Error Messages (exact text):**
- `500` — "Guest login failed."

**Business Logic:**
- Creates a player with `email: null`, `passwordHash: null`.
- New guest starts with:
  - `country`: `'US'`
  - `unlockedSkins`: `encodeSkins(DEFAULT_UNLOCKED_SKINS)`
  - `bankedChips`: `150`
  - `totalEarned`: `150`
- Signs session with `{ playerId, userTag, role: 'player' }`.

**Database Operations:**
- `db.player.create({ data: { email: null, passwordHash: null, userTag, name, country, unlockedSkins, bankedChips, totalEarned } })`

---

### 1.4 POST /api/auth/logout

**Request Body:** None.

**Response (200):**
```json
{ "ok": true }
```

**Business Logic:**
- Calls `clearSessionCookie()` — clears the httpOnly session cookie.

---

### 1.5 GET /api/auth/me

**Request Body:** None.

**Response (200):**
```json
{ "player": { /* toProfile(player) */ } }
```
**Response (200, no session):**
```json
{ "player": null }
```

**Business Logic:**
- If no session, returns `{ player: null }`.
- If player is `null` or `player.banned` is true, returns `{ player: null }`.

**Database Operations:**
- `db.player.findUnique({ where: { id: session.playerId } })`

---

### 1.6 GET /api/auth/token

[CODE COMMENT] Returns a short-lived JWT for Socket.IO auth. The httpOnly session cookie cannot be read by client-side JS, so the canvas fetches this endpoint to obtain a fresh token to pass in `socket.auth = { token }`. The token is re-signed from the current session (not the same as the cookie token — it is freshly minted on each call so we never expose the cookie value itself).

**Request Body:** None.

**Response (200):**
```json
{ "token": "<jwt-string>" }
```
**Response (401):**
```json
{ "token": null }
```
**Response (500):**
```json
{ "token": null, "error": "sign_failed" }
```

**Business Logic:**
- Requires session. If no session, returns 401.
- Signs a fresh JWT with `{ playerId, userTag, role }` from current session.

---

### 1.7 POST /api/auth/change-password

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `currentPassword` | string | Required. |
| `newPassword` | string | Required. Minimum 6 characters. |

**Response (200):**
```json
{ "ok": true }
```

**Error Messages (exact text):**
- `401` — "Not authenticated."
- `400` — "Current and new password are required."
- `400` — "New password must be at least 6 characters."
- `400` — "This account has no password set."
- `401` — "Current password is incorrect."
- `500` — "Failed to change password."

**Business Logic:**
- Verifies current password via `verifyPassword()`.
- Guest/OAuth accounts (no `passwordHash`) cannot change password.

**Database Operations:**
- `db.player.findUnique({ where: { id: session.playerId } })`
- `db.player.update({ where: { id }, data: { passwordHash: newHash } })`

---

### 1.8 POST /api/auth/change-pin

[CODE COMMENT] Changes the player's 4-digit Security PIN. Requires current session + either existing PIN verification or first-time set. Body: { currentPin?: string, newPin: string }. If player already has a PIN, currentPin is required. If player has no PIN, currentPin is not needed (first time setup).

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `currentPin` | string | Required only if player already has a PIN set. Must match `/^\d{4}$/`. |
| `newPin` | string | Required. Must match `/^\d{4}$/` (exactly 4 digits). |

**Response (200):**
```json
{ "ok": true, "message": "Security PIN updated successfully." }
```
**Response (200, first-time set):**
```json
{ "ok": true, "message": "Security PIN set successfully." }
```

**Error Messages (exact text):**
- `401` — "Not authenticated."
- `400` — "New Security PIN must be exactly 4 digits."
- `404` — "Account not found."
- `403` — "Guest accounts cannot set a Security PIN."
- `400` — "Current Security PIN (4 digits) is required."
- `401` — "Current Security PIN is incorrect."
- `500` — "Failed to change PIN."

**Business Logic:**
- Guest accounts (no email) cannot set a PIN — PIN is for password recovery.
- PIN is stored in plaintext (compared with `!==`).
- Message differs between update and first-time set.

**Database Operations:**
- `db.player.findUnique({ where: { id: session.playerId } })`
- `db.player.update({ where: { id }, data: { securityPin: newPin } })`

---

### 1.9 POST /api/auth/forgot-password

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `email` | string | Required. Trimmed, lowercased. Must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. |
| `securityPin` | string | Required. Must match `/^\d{4}$/` (exactly 4 digits). |
| `newPassword` | string | Required. Minimum 6 characters. |

**Response (200):**
```json
{ "ok": true, "message": "Password has been reset. You can now log in." }
```

**Error Messages (exact text):**
- `400` — "A valid email address is required."
- `400` — "A valid 4-digit Security PIN is required."
- `400` — "New password must be at least 6 characters."
- `404` — "No account found with that email."
- `400` — "This is a guest account. Guest accounts have no password to reset."
- `400` — "This account has no Security PIN set. PIN is required for password recovery. Please create a new account or contact an admin."
- `401` — "Incorrect Security PIN. Please try again."
- `500` — "Failed to reset password."

**Business Logic:**
- No session required (unauthenticated endpoint).
- Does NOT require being logged in.
- PIN is compared in plaintext.

**Database Operations:**
- `db.player.findUnique({ where: { email } })`
- `db.player.update({ where: { id }, data: { passwordHash: newHash } })`

---

### 1.10 GET /api/auth/social-login

[CODE COMMENT] Redirects the user to the OAuth provider's authorization page. After authentication, the provider redirects back to /api/auth/social-callback.

**Query Parameters:**
| Param | Type | Validation |
|-------|------|------------|
| `provider` | string | Required. Must be in `OAUTH_PROVIDERS` array. Lowercased. |

**Response (302 redirect):** Redirects to OAuth provider's authorization URL.

**Error Responses:**
- `400` — `{ "error": "Unsupported or missing provider. Supported: <provider1>, <provider2>, ..." }`
- `200` — `{ "error": "<Provider> login is not configured.", "notConfigured": true, "provider": "<p>", "setupGuide": <guide> }`
- `500` — `{ "error": "Failed to generate authorization URL." }`

**Business Logic:**
- Checks if provider is configured via `isProviderConfigured(p)`.
- Generates a random state for CSRF protection via `crypto.randomUUID()`.
- Sets a short-lived cookie `oauth_state_{provider}` with `maxAge: 600` (10 minutes), `httpOnly: true`, `secure` in production, `sameSite: 'lax'`.

---

### 1.11 GET /api/auth/social-callback

[CODE COMMENT] Handles the OAuth callback from Google and Facebook (query-string based). Also handles Apple OAuth callback via POST (form_post mode).

**GET Query Parameters:**
| Param | Type | Validation |
|-------|------|------------|
| `provider` | string | Optional. Defaults to `'google'`. Lowercased. Must be in `OAUTH_PROVIDERS`. |
| `code` | string | Required. OAuth authorization code. |
| `state` | string | CSRF state to verify. |

**POST Body (Apple only, form-data):**
| Field | Type | Validation |
|-------|------|------------|
| `code` | string | Required. OAuth authorization code. |
| `state` | string | CSRF state to verify. |
| `name` | string | Optional. Apple name (only on first authorization). |

**All responses are 302 redirects:**
- `/?oauth=success` — Existing OAuth account logged in.
- `/?oauth=linked` — Existing email account linked to OAuth provider.
- `/?oauth=registered` — New account created via OAuth.
- `/?oauth_error=no_code` — Missing code.
- `/?oauth_error=invalid_provider` — Invalid provider.
- `/?oauth_error=csrf_mismatch` — CSRF state mismatch.
- `/?oauth_error=token_exchange_failed` — Token exchange failed.
- `/?oauth_error=no_user_info` — Could not get user info.
- `/?oauth_error=account_banned` — Account is banned.
- `/?oauth_error=account_error` — Account creation/linking error.

**Business Logic (handleOAuthLogin helper):**
1. Check if account with this OAuth provider+ID already exists → log in.
2. If email exists (no OAuth linked) → link/merge: update existing account with `oauthProvider` and `oauthProviderId`.
3. Otherwise → create brand new account:
   - `email`: userInfo.email
   - `passwordHash`: null (OAuth accounts have no password)
   - `name`: `userInfo.name || userInfo.email?.split('@')[0] || 'Player'`, sliced to max 20 chars
   - `country`: `'US'`
   - `bankedChips`: `150`
   - `totalEarned`: `150`
   - `unlockedSkins`: `encodeSkins(DEFAULT_UNLOCKED_SKINS)`
   - `oauthProvider`: provider
   - `oauthProviderId`: userInfo.providerId
   - If existing OAuth account has no avatar and userInfo provides one, updates avatar.

**Database Operations:**
- `db.player.findFirst({ where: { oauthProvider, oauthProviderId } })`
- `db.player.findUnique({ where: { email } })`
- `db.player.update({ where: { id }, data: { oauthProvider, oauthProviderId, avatar } })`
- `db.player.create({ data: { email, passwordHash: null, userTag, name, country, avatar, unlockedSkins, bankedChips, totalEarned, oauthProvider, oauthProviderId } })`

---

### 1.12 POST /api/auth/upgrade

[CODE COMMENT] Upgrades a guest account to a registered account. Preserves ALL existing progress (chips, stats, cosmetics, friends, etc.). Rules & Guide Section 0: "Guest accounts can upgrade to registered later (in Profile panel). All progress carries over when upgrading."

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `email` | string | Required. Trimmed, lowercased. Must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. |
| `password` | string | Required. Minimum 6 characters. |
| `name` | string | Required. Trimmed, sliced to max 20 characters. |
| `pin` | string | Optional. If provided, must match `/^\d{4}$/`. |

**Response (200):**
```json
{ "player": { /* toProfile(player) */ } }
```

**Error Messages (exact text):**
- `401` — "Not authenticated."
- `400` — "Valid email is required."
- `400` — "Password must be at least 6 characters."
- `400` — "Display name is required."
- `400` — "Security PIN must be exactly 4 digits."
- `404` — "Account not found."
- `400` — "This account is already registered."
- `409` — "Email already registered. Try a different email."
- `500` — "Upgrade failed. Please try again."

**Business Logic:**
- Requires session.
- Only guests can upgrade (identified by `null` email).
- Updates only `email`, `passwordHash`, `name`, `securityPin` — all other fields preserved.
- Issues a fresh session token after upgrade.
- Also catches Prisma `P2002` unique-constraint error.

**Database Operations:**
- `db.player.findUnique({ where: { id: session.playerId } })`
- `db.player.findUnique({ where: { email } })`
- `db.player.update({ where: { id }, data: { email, passwordHash, name, securityPin } })`

---

## 2. PLAYER Routes

### 2.1 GET /api/player

**Request Body:** None.

**Response (200):**
```json
{ "player": { /* toProfile(player) */ } }
```
**Error Messages:**
- `401` — "Unauthorized"
- `404` — "Not found"

---

### 2.2 PUT /api/player

[CODE COMMENT] Whitelisted fields the player can edit directly. Cosmetics equip / name / country / avatar only. Economy is server-only.

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `name` | string | Optional. Trimmed, sliced to max 20 chars. Must be >= 2 characters after trim. |
| `country` | string | Optional. Must match a code in `COUNTRIES` config. |
| `avatar` | string | Optional. Max length 8 characters. |
| `currentSkin` | string | Optional. Must be in player's `unlockedSkins` list. |
| `currentTrail` | string | Optional. Must be in player's `unlockedSkins` list. |
| `currentDeath` | string | Optional. Must be in player's `unlockedSkins` list. |
| `currentFlag` | string | Optional. Must be in `unlockedSkins` or empty string (`''`). Empty string sets to `null`. |
| `currentBanner` | string | Optional. Must be in `unlockedSkins` or empty string (`''`). Empty string sets to `null`. |

**Response (200):**
```json
{ "player": { /* toProfile(updated) */ } }
```
**Response (200, no valid fields):** Returns current player profile unchanged.

**Business Logic:**
- Only the whitelisted fields listed above can be updated.
- Economy fields (bankedChips, totalEarned, etc.) cannot be modified.
- Cosmetic equip requires the skin to be in the player's `unlockedSkins` JSON array.
- `lastSeenAt` is updated to `new Date()` on any update.

**Database Operations:**
- `db.player.findUnique({ where: { id: session.playerId } })`
- `db.player.update({ where: { id }, data: { ...whitelistedFields, lastSeenAt: new Date() } })`

**Exported helper:**
- `unlockSkin(playerId, skinId)` — Adds `skinId` to the player's `unlockedSkins` JSON array if not already present. Returns updated player or null.

---

### 2.3 GET /api/player/challenges

**Request Body:** None.

**Response (200):**
```json
{
  "challenges": [
    {
      "id": "<uuid>",
      "playerId": "<uuid>",
      "type": "daily" | "weekly",
      "category": "kill" | "extract" | "extract_streak" | "star_collect" | "score" | "arena_entry" | "survive",
      "title": "<string>",
      "description": "<string>",
      "target": <number>,
      "reward": <number>,
      "current": <number>,
      "completed": <boolean>,
      "claimed": <boolean>,
      "periodStart": "<YYYY-MM-DD>",
      "createdAt": "<ISO date>"
    }
  ],
  "streak": <number>,
  "streakMultiplier": <number>,
  "tier": "novice" | "operative" | "veteran" | "elite"
}
```
**Error Messages:**
- `401` — "Unauthorized"
- `404` — "Player not found."

**Business Logic:**
- **Level Tiers:**
  - `novice`: level ≤ 5
  - `operative`: level ≤ 15
  - `veteran`: level ≤ 30
  - `elite`: level > 30

- **Level-Based Reward Multiplier:**
  - Level ≤ 5: `1.0`
  - Level ≤ 15: `1.5`
  - Level ≤ 30: `2.5`
  - Level > 30: `4.0`

- **Daily Challenges:** Auto-generated if none exist for today (`utcToday()`). Picks 3 challenges from the tier's pool using `pickDiverse()` (ensures no duplicate categories). Excludes yesterday's daily challenge titles (anti-repeat). Falls back to full pool if pool too small after exclusions. Rewards are multiplied by level reward multiplier: `Math.floor(template.reward * rewardMult)`.

- **Weekly Challenges:** Auto-generated if none exist for this week (`utcMonday()`). Picks 2 challenges. Same anti-repeat logic excludes last week's weekly titles.

- **Streak Calculation (`calculateStreak`):**
  - Counts consecutive days where ALL daily challenges were claimed.
  - Looks back up to 30 days.
  - If today has challenges but not all claimed, does not break streak (just doesn't count today).
  - Streak Multiplier:
    - streak ≥ 14: `3.0`
    - streak ≥ 7: `2.0`
    - streak ≥ 3: `1.5`
    - otherwise: `1.0`

- **Challenge Categories:** `kill`, `extract`, `extract_streak`, `star_collect`, `score`, `arena_entry`, `survive`

- **Challenge Pool (Daily, Novice tier — 16 templates):**
  | Title | Category | Target | Base Reward |
  |-------|----------|--------|-------------|
  | Novice Hunter | kill | 2 | 15 |
  | First Blood | kill | 3 | 20 |
  | Young Fang | kill | 5 | 30 |
  | Safe Exit | extract | 30 | 20 |
  | Pocket Cash | extract | 50 | 25 |
  | Clean Getaway | extract | 75 | 35 |
  | Star Spark | star_collect | 3 | 20 |
  | Star Gazer | star_collect | 5 | 30 |
  | Star Dust | star_collect | 8 | 35 |
  | Tiny Rattler | score | 30 | 15 |
  | Growing Serpent | score | 50 | 25 |
  | Medium Coil | score | 75 | 35 |
  | Arena Explorer | arena_entry | 1 | 20 |
  | Warm Up | arena_entry | 2 | 30 |
  | Snake Survival | survive | 60 | 25 |
  | Last Serpent | survive | 90 | 35 |

- **Challenge Pool (Daily, Operative tier — 18 templates):**
  | Title | Category | Target | Base Reward |
  |-------|----------|--------|-------------|
  | Snake Slayer | kill | 5 | 35 |
  | Venom Strike | kill | 8 | 45 |
  | Double Digit | kill | 10 | 55 |
  | Aggressive Hunter | kill | 12 | 65 |
  | Quick Cash Out | extract | 100 | 40 |
  | High Roller Exit | extract | 200 | 55 |
  | Solid Extraction | extract | 300 | 70 |
  | Star Collector | star_collect | 10 | 40 |
  | Star Hunter | star_collect | 15 | 50 |
  | Star Feast | star_collect | 20 | 60 |
  | Long Snake | score | 100 | 40 |
  | Impressive Coil | score | 150 | 55 |
  | Arena Regular | arena_entry | 2 | 35 |
  | Arena Addict | arena_entry | 3 | 45 |
  | Iron Scales | survive | 90 | 45 |
  | Endurance Run | survive | 120 | 60 |
  | Clean Escape | extract_streak | 2 | 60 |
  | Hat Trick | extract_streak | 3 | 80 |

- **Challenge Pool (Daily, Veteran tier — 17 templates):**
  | Title | Category | Target | Base Reward |
  |-------|----------|--------|-------------|
  | Apex Predator | kill | 12 | 70 |
  | Arena Butcher | kill | 15 | 85 |
  | Venom Reaper | kill | 20 | 100 |
  | Death Incarnate | kill | 25 | 120 |
  | Mega Extraction | extract | 500 | 90 |
  | Grand Withdrawal | extract | 750 | 120 |
  | Fortune Escape | extract | 1000 | 150 |
  | Star Hoarder | star_collect | 25 | 70 |
  | Star Monopoly | star_collect | 35 | 90 |
  | Titan Length | score | 200 | 75 |
  | Behemoth Coil | score | 300 | 100 |
  | Arena Grinder | arena_entry | 4 | 50 |
  | Arena Machine | arena_entry | 5 | 60 |
  | Titan's Endurance | survive | 150 | 80 |
  | Unbreakable Coil | survive | 200 | 110 |
  | Veteran Escape | extract_streak | 3 | 100 |
  | Untouchable | extract_streak | 4 | 140 |

- **Challenge Pool (Daily, Elite tier — 17 templates):**
  | Title | Category | Target | Base Reward |
  |-------|----------|--------|-------------|
  | Massacre Protocol | kill | 20 | 100 |
  | Genocide Mode | kill | 30 | 150 |
  | Extinction Event | kill | 40 | 200 |
  | God of Venom | kill | 50 | 250 |
  | Elite Withdrawal | extract | 2000 | 150 |
  | Phantom Bank | extract | 5000 | 250 |
  | Legendary Haul | extract | 10000 | 400 |
  | Star Conqueror | star_collect | 40 | 110 |
  | Star Emperor | star_collect | 60 | 150 |
  | World Serpent | score | 400 | 140 |
  | Mythical Coil | score | 500 | 200 |
  | Arena Warlord | arena_entry | 6 | 70 |
  | Arena Zealot | arena_entry | 8 | 100 |
  | Immortal Coil | survive | 240 | 150 |
  | Timeless Venom | survive | 300 | 200 |
  | Elite Phantom | extract_streak | 5 | 200 |
  | Untouchable Legend | extract_streak | 6 | 300 |

- **Weekly Challenge Pools (all 4 tiers, 10 templates each):**
  - Novice weekly targets: 8-12 kills, 150-250 extract, 20-30 star_collect, 100 score, 4 arena_entry, 120 survive, 3 extract_streak. Rewards: 55-100.
  - Operative weekly targets: 20-30 kills, 500-750 extract, 50-75 star_collect, 200 score, 6 arena_entry, 180 survive, 5 extract_streak. Rewards: 100-180.
  - Veteran weekly targets: 40-60 kills, 1500-3000 extract, 100-150 star_collect, 350 score, 10 arena_entry, 300 survive, 8 extract_streak. Rewards: 180-350.
  - Elite weekly targets: 80-120 kills, 5000-10000 extract, 200-300 star_collect, 600 score, 15 arena_entry, 600 survive, 12 extract_streak. Rewards: 300-600.

**Database Operations:**
- `db.player.findUnique({ where: { id: playerId } })`
- `db.challenge.findMany({ where: { playerId, type: 'daily', periodStart: yesterday }, select: { title: true } })`
- `db.challenge.findMany({ where: { playerId, type: 'weekly', periodStart: lastMonday }, select: { title: true } })`
- `db.challenge.findMany({ where: { playerId, type: 'daily', periodStart: today } })`
- `db.challenge.findMany({ where: { playerId, type: 'weekly', periodStart: monday } })`
- `db.challenge.createMany({ data: [...] })` — for daily and weekly generation
- `db.challenge.findMany({ where: { playerId, OR: [...] }, orderBy: [...] })` — fetch active challenges
- `db.challenge.findMany({ where: { playerId, type: 'daily', periodStart: { gte: thirtyDaysAgo } }, select: { periodStart, claimed } })` — for streak calc

---

### 2.4 POST /api/player/challenges (Claim)

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `challengeId` | string | Required. Trimmed. |

**Response (200):**
```json
{
  "success": true,
  "reward": <totalReward>,
  "baseReward": <baseReward>,
  "bonusReward": <bonusReward>,
  "streakMultiplier": <multiplier>
}
```

**Error Messages (exact text):**
- `401` — "Unauthorized"
- `400` — "Missing challengeId."
- `404` — "Challenge not found."
- `400` — "Challenge not yet completed."
- `400` — "Already claimed."

**Business Logic:**
- Verifies challenge ownership (`challenge.playerId !== playerId`).
- Calculates streak bonus: `bonusReward = Math.floor(baseReward * (multiplier - 1))`, `totalReward = baseReward + bonusReward`.
- Credits `totalReward` chips to `bankedChips` and `totalEarned`.
- Atomic transaction: update player chips + mark challenge claimed.

**Database Operations:**
- `db.challenge.findUnique({ where: { id: challengeId } })`
- `db.player.update({ where: { id: playerId }, data: { bankedChips: { increment: totalReward }, totalEarned: { increment: totalReward } } })`
- `db.challenge.update({ where: { id: challengeId }, data: { claimed: true } })`

---

### 2.5 POST /api/player/challenges/progress

[CODE COMMENT] Called by the game canvas during gameplay to track real-time challenge progress. Uses session auth (user JWT).

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `category` | string | Required. Trimmed. Must be one of: `kill`, `extract`, `extract_streak`, `star_collect`, `score`, `arena_entry`, `survive`. |
| `amount` | number | Optional. Defaults to 1. Clamped by category max: |

**Max Amount Per Category:**
| Category | Max per request |
|----------|----------------|
| kill | 10 |
| extract | 1 |
| extract_streak | 1 |
| star_collect | 10 |
| score | 1000 |
| arena_entry | 1 |
| survive | 1 |

**Response (200):**
```json
{ "updated": <number>, "completed": <number>, "category": "<string>" }
```
**Response (200, no challenges):**
```json
{ "updated": 0, "message": "No active challenges for this category." }
```
**Error Messages:**
- `401` — "Unauthorized"
- `400` — `"Invalid category. Must be one of: kill, extract, extract_streak, star_collect, score, arena_entry, survive"`

**Business Logic:**
- Finds all active (incomplete) challenges for the player matching the category, for today's dailies and this week's weeklies.
- Increments `current` by `amount`. If `newCurrent >= target`, sets `completed: true`.
- All updates run in a single Prisma transaction.

---

### 2.6 POST /api/player/cosmetic

[CODE COMMENT] body: { action: 'buy' | 'equip', skinId: string }

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `action` | string | Required. Must be `'buy'` or `'equip'`. |
| `skinId` | string | Required. Must exist in game config via `getCosmeticById()`. |

**Response (200, buy):**
```json
{ "player": { /* toProfile(updated) */ } }
```
**Response (200, equip):**
```json
{ "player": { /* toProfile(updated) */ } }
```

**Error Messages (buy action):**
- `401` — "Unauthorized"
- `404` — "Cosmetic not found."
- `404` — "Player not found."
- `400` — "Already owned."
- `400` — "Not enough chips."
- `500` — "Purchase failed."

**Error Messages (equip action):**
- `401` — "Unauthorized"
- `404` — "Cosmetic not found."
- `404` — "Player not found."
- `403` — "You do not own this item."

**Error Messages (unknown action):**
- `400` — "Unknown action."

**Business Logic (buy):**
- Atomic transaction: deduct `cosmetic.cost` from `bankedChips`, increment `totalLost` by `cosmetic.cost`, add skinId to `unlockedSkins`, auto-equip the purchased item based on `cosmetic.type` (`skin`, `trail`, `death`, `flag`, `banner`).
- Records a `purchase` with `itemId: skinId`, `itemType: 'skin'`, `amountChips: -cosmetic.cost`.

**Business Logic (equip):**
- Verifies skin is in `unlockedSkins`.
- Sets the corresponding `current*` field based on `cosmetic.type`.

**Database Operations (buy):**
- `tx.player.findUnique({ where: { id } })`
- `tx.player.update({ where: { id }, data: { bankedChips: { decrement: cost }, totalLost: { increment: cost }, unlockedSkins: ..., currentSkin/Trail/Death/Flag/Banner: ... } })`
- `tx.purchase.create({ data: { playerId, itemId, itemType: 'skin', amountChips: -cost } })`

---

### 2.7 POST /api/player/daily

[CODE COMMENT] Claim today's daily reward (idempotent per day)

**Request Body:** None.

**Response (200):**
```json
{ "player": { /* toProfile(player) */ }, "reward": <number>, "streak": <number> }
```

**Error Messages:**
- `401` — "Unauthorized"
- `404` — "Player not found."
- `400` — "Already claimed today. Come back tomorrow!"
- `500` — "Claim failed."

**Business Logic:**
- Transaction-based idempotency: re-checks `lastDailyClaim === today` inside the transaction to prevent double-claim.
- **Daily Streak Logic:**
  - If `lastDailyClaim` is yesterday → `newStreak = player.dailyStreak + 1`
  - Otherwise → `newStreak = 0` (missed a day resets)
  - Cycle is 7 days: `cycleDay = newStreak % 7`
  - Reward amount comes from `DAILY_REWARDS[cycleDay]` (config array).
- Credits reward to `bankedChips` and `totalEarned`.
- Creates a `dailyClaim` record with `day`, `reward`, `streak`.

**Database Operations:**
- `tx.player.findUnique({ where: { id } })`
- `tx.player.update({ where: { id }, data: { bankedChips: { increment: reward }, totalEarned: { increment: reward }, dailyStreak: newStreak, lastDailyClaim: today } })`
- `tx.dailyClaim.create({ data: { playerId, day: today, reward, streak: newStreak } })`

---

### 2.8 POST /api/player/promo-reward

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `code` | string | Required. Trimmed, uppercased. |

**Response (200):**
```json
{ "success": true, "reward": <number>, "newBankedChips": <number> }
```

**Error Messages:**
- `401` — "Authentication required."
- `400` — "Promo code is required."
- `400` — `"Invalid or expired promo code. Try \"VENOM\" or \"CHAMPION\"."`
- `400` — "You already redeemed this promo code."

**Business Logic:**
- Looks up reward amount from `PROMO_CODES` config (a `Record<string, number>`).
- In-memory double-claim tracking: `Map<string, Set<string>>` keyed by playerId.
- Credits reward to `bankedChips` and `totalEarned`.
- **NOTE:** In-memory tracking resets on server restart (no DB persistence for redemption records).

**Database Operations:**
- `db.player.update({ where: { id }, data: { bankedChips: { increment: reward }, totalEarned: { increment: reward } }, select: { bankedChips: true } })`

---

### 2.9 POST /api/player/video-reward

**Request Body:** None.

**Response (200):**
```json
{ "success": true, "reward": 50, "newBankedChips": <number> }
```
**Response (429):**
```json
{ "error": "Cooldown active. Try again in <N> seconds." }
```

**Constants:**
- `VIDEO_REWARD_COOLDOWN_MS = 60_000` (60 seconds)
- `VIDEO_REWARD_AMOUNT = 50`

**Error Messages:**
- `401` — "Authentication required."
- `429` — "Cooldown active. Try again in ${remainingSeconds} seconds."

**Business Logic:**
- In-memory cooldown tracking per player (`Map<string, number>`).
- Awards 50 chips per call.
- Cleans up stale entries when map exceeds 10,000 entries (removes entries older than `2 * VIDEO_REWARD_COOLDOWN_MS`).
- **NOTE:** In-memory tracking resets on server restart.

**Database Operations:**
- `db.player.update({ where: { id }, data: { bankedChips: { increment: 50 }, totalEarned: { increment: 50 } }, select: { bankedChips: true } })`

---

## 3. CHIPS Routes

### 3.1 POST /api/chips/pack

[CODE COMMENT] "buy" a chip pack (simulated payment, credits chips)

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `packId` | string | Required. Must match an entry in `CHIP_PACKS` config. |

**Response (200):**
```json
{ "player": { /* toProfile(player) */ }, "granted": <totalChips> }
```

**Error Messages:**
- `401` — "Unauthorized"
- `400` — "Invalid pack."
- `404` — "Player not found."

**Business Logic:**
- `totalChips = pack.chips + pack.bonus`.
- Credits `totalChips` to `bankedChips` and `totalEarned`.
- Creates a `purchase` record with `itemId: pack.id`, `itemType: 'chip_pack'`, `amountChips: totalChips`.
- [CODE COMMENT] Simulated payment — no real money transaction.

**Database Operations:**
- `db.player.findUnique({ where: { id } })`
- `db.player.update({ where: { id }, data: { bankedChips: { increment: totalChips }, totalEarned: { increment: totalChips } })`
- `db.purchase.create({ data: { playerId, itemId: pack.id, itemType: 'chip_pack', amountChips: totalChips } })`

---

## 4. FRIENDS Routes

### 4.1 GET /api/friends/list

[CODE COMMENT] Returns accepted friends + pending requests received

**Request Body:** None.

**Response (200):**
```json
{
  "friends": [
    {
      "id": "<uuid>",
      "userTag": "<string>",
      "name": "<string>",
      "country": "<string>",
      "level": <number>,
      "bankedChips": <number>,
      "status": "accepted",
      "online": <boolean>
    }
  ],
  "pendingReceived": [
    {
      "id": "<uuid>",
      "userTag": "<string>",
      "name": "<string>",
      "country": "<string>",
      "level": <number>,
      "bankedChips": <number>,
      "status": "pending_received",
      "online": <boolean>
    }
  ],
  "pendingSent": [
    {
      "id": "<uuid>",
      "userTag": "<string>",
      "name": "<string>",
      "country": "<string>",
      "level": <number>,
      "bankedChips": <number>,
      "status": "pending_sent",
      "online": <boolean>
    }
  ]
}
```

**Error Messages:**
- `401` — "Unauthorized"
- `404` — "Not found"

**Business Logic:**
- Online detection: `Date.now() - new Date(p.lastSeenAt).getTime() < 60_000` (60 seconds).
- `friendsFrom` = friendships where player is initiator; `friendsTo` = where player is recipient.

**Database Operations:**
- `db.player.findUnique({ where: { id }, include: { friendsFrom: { include: { recipient: true } }, friendsTo: { include: { initiator: true } } } })`

---

### 4.2 POST /api/friends/request

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `userTag` | string | Required. Uppercased, trimmed. |

**Response (200):**
```json
{ "ok": true }
```

**Error Messages:**
- `401` — "Unauthorized"
- `400` — "userTag required"
- `400` — "Cannot friend yourself."
- `404` — "Player not found."
- `400` — "Already friends."
- `403` — "Cannot send request."
- `400` — "Request already pending."

**Business Logic:**
- Checks for existing friendship in both directions (initiator→recipient OR recipient→initiator).
- Friendship statuses: `pending`, `accepted`, `blocked`.

**Database Operations:**
- `db.player.findUnique({ where: { userTag: targetTag } })`
- `db.friendship.findFirst({ where: { OR: [{ initiatorId, recipientId }, { initiatorId: target, recipientId: me }] } })`
- `db.friendship.create({ data: { initiatorId, recipientId, status: 'pending' } })`

---

### 4.3 POST /api/friends/accept

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `userTag` | string | Required. Uppercased, trimmed. The initiator's tag. |

**Response (200):**
```json
{ "ok": true }
```

**Error Messages:**
- `401` — "Unauthorized"
- `404` — "Player not found."
- `404` — "No pending request from that player."

**Database Operations:**
- `db.player.findUnique({ where: { userTag: fromTag } })`
- `db.friendship.findFirst({ where: { initiatorId: from.id, recipientId: session.playerId, status: 'pending' } })`
- `db.friendship.update({ where: { id: f.id }, data: { status: 'accepted' } })`

---

### 4.4 POST /api/friends/remove

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `userTag` | string | Required. Uppercased, trimmed. |

**Response (200):**
```json
{ "ok": true }
```

**Error Messages:**
- `401` — "Unauthorized"
- `404` — "Player not found."

**Business Logic:**
- Deletes the friendship record in both directions (no error if none exists).

**Database Operations:**
- `db.player.findUnique({ where: { userTag: otherTag } })`
- `db.friendship.deleteMany({ where: { OR: [{ initiatorId: me, recipientId: other }, { initiatorId: other, recipientId: me }] } })`

---

### 4.5 POST /api/friends/gift

[CODE COMMENT] Sends chips to a friend. Atomic: deduct from sender, credit recipient, record gift.

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `userTag` | string | Required. Uppercased, trimmed. |
| `amount` | number | Clamped: `Math.max(1, Math.min(1000, Math.floor(Number(amount) || 0)))`. Max 1000 chips per gift. |

**Response (200):**
```json
{ "ok": true, "newBankedChips": <number> }
```

**Error Messages:**
- `401` — "Unauthorized"
- `400` — "Invalid request."
- `400` — "Cannot gift yourself."
- `400` — "Not enough chips."
- `400` — "You can only gift friends."
- `400` — "Sender missing."
- `400` — "Recipient not found."
- `400` — "Gift failed."

**Business Logic:**
- Requires accepted friendship in either direction.
- Amount range: 1 to 1000 chips per transaction.
- Atomic transaction: deduct from sender (`bankedChips` decrement, `totalLost` increment), credit to recipient (`bankedChips` increment, `totalEarned` increment), record `gift` (fromId, toId, amount).

**Database Operations:**
- `tx.player.findUnique({ where: { id: senderId } })`
- `tx.player.findUnique({ where: { userTag: toTag } })`
- `tx.friendship.findFirst({ where: { OR: [accepted friendship in both directions] } })`
- `tx.player.update({ where: { id: senderId }, data: { bankedChips: { decrement: amount }, totalLost: { increment: amount } } })`
- `tx.player.update({ where: { id: recipientId }, data: { bankedChips: { increment: amount }, totalEarned: { increment: amount } } })`
- `tx.gift.create({ data: { fromId, toId, amount } })`

---

## 5. CLANS Routes

### 5.1 GET /api/clans

**Request Body:** None. No auth required.

**Response (200):**
```json
{
  "clans": [
    {
      "tag": "<string>",
      "name": "<string>",
      "emblem": "<string>",
      "description": "<string>",
      "level": <number>,
      "bankedChips": <number>,
      "memberCount": <number>
    }
  ]
}
```

**Business Logic:**
- Returns top 50 clans ordered by `bankedChips` descending.
- Includes member count via Prisma `_count`.

**Database Operations:**
- `db.clan.findMany({ include: { _count: { select: { members: true } } }, orderBy: { bankedChips: 'desc' }, take: 50 })`

---

### 5.2 POST /api/clans/create

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `tag` | string | Uppercased, trimmed, sliced to max 5 chars. Must match `/^[A-Z0-9]{3,5}$/` (3-5 alphanumeric). |
| `name` | string | Trimmed, sliced to max 30 chars. Minimum 3 characters. |
| `emblem` | string | Sliced to max 4 chars. Defaults to `'🐍'`. |
| `description` | string | Sliced to max 200 chars. |

**Response (200):**
```json
{ "ok": true, "clanTag": "<tag>" }
```

**Error Messages:**
- `401` — "Unauthorized"
- `400` — "Tag must be 3-5 letters/numbers."
- `400` — "Name must be at least 3 characters."
- `404` — "Not found"
- `400` — "You are already in a clan."
- `409` — "Tag already taken."

**Business Logic:**
- Creates clan + sets player as `'Leader'` in a single transaction.
- Player must not already be in a clan (`me.clanTag` must be null).

**Database Operations:**
- `db.player.findUnique({ where: { id } })`
- `db.clan.findUnique({ where: { tag } })`
- `db.clan.create({ data: { tag, name, emblem, description } })`
- `db.player.update({ where: { id }, data: { clanTag: tag, clanRank: 'Leader' } })`

---

### 5.3 POST /api/clans/join

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `tag` | string | Uppercased, trimmed. |

**Response (200):**
```json
{ "ok": true }
```

**Error Messages:**
- `401` — "Unauthorized"
- `404` — "Clan not found."
- `400` — "Clan is full (max 30)."
- `404` — "Not found"
- `400` — "Leave your current clan first."
- `500` — "Failed to join clan."

**Business Logic:**
- Max clan members: 30.
- New members get rank `'Viper'`.
- Player must not already be in a clan.

**Database Operations:**
- `tx.clan.findUnique({ where: { tag }, include: { _count: { select: { members: true } } } })`
- `tx.player.findUnique({ where: { id } })`
- `tx.player.update({ where: { id }, data: { clanTag: tag, clanRank: 'Viper' } })`

---

### 5.4 POST /api/clans/leave

**Request Body:** None.

**Response (200):**
```json
{ "ok": true }
```

**Error Messages:**
- `401` — "Unauthorized"
- `400` — "Not in a clan."
- `500` — "Failed to leave clan."

**Business Logic:**
- Removes player from clan (sets `clanTag: null`, `clanRank: null`).
- If player was Leader:
  - Promotes oldest member (by `createdAt` ascending) to Leader.
- If no members remain: deletes the clan.

**Database Operations:**
- `tx.player.findUnique({ where: { id } })`
- `tx.player.update({ where: { id }, data: { clanTag: null, clanRank: null } })`
- `tx.player.count({ where: { clanTag } })`
- `tx.clan.delete({ where: { tag: clanTag } })` — if no remaining members
- `tx.player.findFirst({ where: { clanTag }, orderBy: { createdAt: 'asc' } })`
- `tx.player.update({ where: { id: oldest.id }, data: { clanRank: 'Leader' } })`

---

### 5.5 GET /api/clans/chat

**Query Parameters:**
| Param | Type | Validation |
|-------|------|------------|
| `tag` | string | Required. Uppercased. |

**Response (200):**
```json
{ "messages": [ /* ClanMessage[] */ ] }
```

**Error Messages:**
- `401` — "Unauthorized"
- `400` — "tag required"
- `403` — "Not a member."

**Business Logic:**
- Returns last 50 messages ordered by `createdAt` ascending.
- Membership check: player's `clanTag` must match the requested tag.

**Database Operations:**
- `db.player.findUnique({ where: { id } })`
- `db.clanMessage.findMany({ where: { clanTag: tag }, orderBy: { createdAt: 'asc' }, take: 50 })`

---

### 5.6 POST /api/clans/chat

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `tag` | string | Required. Uppercased. |
| `message` | string | Required. Trimmed, sliced to max 300 characters. |

**Response (200):**
```json
{ "ok": true, "message": { /* ClanMessage record */ } }
```

**Error Messages:**
- `401` — "Unauthorized"
- `400` — "Invalid message."
- `403` — "Not a member."

**Business Logic:**
- Records sender's `userTag`, `name`, and `clanRank` (defaults to `'Viper'`).

**Database Operations:**
- `db.player.findUnique({ where: { id } })`
- `db.clanMessage.create({ data: { clanTag, senderTag, senderName, rank, message } })`

---

### 5.7 POST /api/clans/deposit

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `tag` | string | Required. Uppercased, trimmed. |
| `amount` | number | Required. Must be > 0. Floor'd to integer. Max 1,000,000 per transaction. |

**Response (200):**
```json
{ "ok": true, "newTreasury": <number> }
```

**Error Messages:**
- `401` — "Unauthorized"
- `400` — "Invalid tag or amount."
- `400` — "Max deposit is 1,000,000 chips per transaction."
- `404` — "Not found."
- `403` — "You are not a member of this clan."
- `400` — "Insufficient chips."
- `404` — "Clan not found."
- `500` — "Deposit failed."

**Business Logic:**
- Atomic: deduct from player (`bankedChips` decrement, `totalLost` increment), add to clan treasury (`bankedChips` increment).
- Player must be a member of the target clan.

**Database Operations:**
- `tx.player.findUnique({ where: { id } })`
- `tx.clan.findUnique({ where: { tag } })`
- `tx.player.update({ where: { id }, data: { bankedChips: { decrement: amount }, totalLost: { increment: amount } } })`
- `tx.clan.update({ where: { tag }, data: { bankedChips: { increment: amount } })`

---

## 6. LEADERBOARD Routes

### 6.1 GET /api/leaderboard

**Query Parameters:**
| Param | Type | Validation | Default |
|-------|------|------------|---------|
| `type` | string | `'chips'` or `'level'`. | `'chips'` (anything other than `'level'` defaults to `'bankedChips'`) |
| `limit` | number | Min 1, max 100. | `100` |
| `view` | string | `'global'`, `'national'`, or `'world_summit'`. | `'global'` |
| `country` | string | Required when `view=national`. | `''` |
| `milestone` | string | Must match a `MILESTONE_TIERS` id or `'all'`. | `''` (no filter) |

**Response (200):**
```json
{
  "entries": [
    {
      "userTag": "<string>",
      "name": "<string>",
      "country": "<string>",
      "bankedChips": <number>,
      "level": <number>,
      "rank": <number>,
      "isPlayer": <boolean>,
      "milestoneBadge": "<string>",
      "milestoneColor": "<string>"
    }
  ],
  "view": "<string>",
  "total": <number>,
  "country": "<string>",       // only when view='national'
  "milestone": "<string>"    // only when milestone filter is active
}
```

**Error Messages:**
- `400` — "Invalid view. Use global, national, or world_summit."
- `400` — "National view requires a country parameter."
- `400` — "Invalid milestone tier."

**Business Logic:**
- **Global/National view:** Fetches players ordered by `type` descending, filters out `banned: true`. For milestone filter, fetches `limit * 5` (min 500) then filters in-memory.
- **World Summit view:** Uses raw SQL to get the top player per country (by `bankedChips`). Excludes banned players and those without a country.
- **Milestone filter:** Uses `MILESTONE_TIERS` config. Filters players whose `bankedChips` falls within `[tier.minChips, nextHigherTier.minChips)` range. If highest tier, upper bound is Infinity.
- `isPlayer` field highlights the current session's player in the list.
- `milestoneBadge` and `milestoneColor` come from `milestoneTierForChips()`.

---

### 6.2 GET /api/leaderboard/my-rank

**Request Body:** None.

**Response (200):**
```json
{
  "globalRank": <number>,
  "nationalRank": <number>,
  "country": "<string>",
  "bankedChips": <number>,
  "level": <number>,
  "tier": "<badge string>",
  "tierName": "<tier name string>",
  "totalGlobal": <number>,
  "totalNational": <number>
}
```

**Error Messages:**
- `401` — "Not signed in"
- `404` — "Player not found"

**Business Logic:**
- **Global rank:** Count of non-banned players with MORE `bankedChips` + 1.
- **National rank:** Count of non-banned players in same country with MORE `bankedChips` + 1.
- All 4 count queries (globalRank, nationalRank, totalGlobal, totalNational) run in parallel via `Promise.all`.
- `tier` comes from `milestoneTierForChips(bankedChips)`.

**Database Operations:**
- `db.player.findUnique({ where: { userTag }, select: { userTag, country, bankedChips, level } })`
- `db.player.count({ where: { banned: false, bankedChips: { gt: player.bankedChips } } })` — global
- `db.player.count({ where: { banned: false, country: player.country, bankedChips: { gt: player.bankedChips } } })` — national
- `db.player.count({ where: { banned: false } })` — total global
- `db.player.count({ where: { banned: false, country: player.country } })` — total national

---

## 7. MATCH Routes (Internal)

All match routes use `x-internal-secret` header for authentication (shared secret between Next.js API and Socket.IO game server). Default: `'venom-arena-internal-dev'`.

### 7.1 POST /api/match/join

[CODE COMMENT] Internal endpoint called by the Socket.IO server when a player joins an arena. Atomically deducts buyIn. Returns the player's snapshot for spawning.

**Authentication:** Header `x-internal-secret` must match `process.env.INTERNAL_SECRET` (default `'venom-arena-internal-dev'`).

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `userTag` | string | Required. |
| `arenaId` | string | Required. Must exist in arena config via `getArenaById()`. |

**Response (200, success):**
```json
{
  "ok": true,
  "player": {
    "userTag": "<string>",
    "name": "<string>",
    "country": "<string>",
    "level": <number>,
    "currentSkin": "<string>",
    "currentTrail": "<string>",
    "currentDeath": "<string>",
    "currentFlag": "<string>",
    "bankedChipsAfterBuyIn": <number>,
    "unlockedSkins": ["<string>", ...],
    "clanTag": "<string>",
    "clanRank": "<string>"
  }
}
```
**Response (400, failure):**
```json
{ "ok": false, "reason": "invalid_arena" | "player_not_found" | "banned" | "insufficient_chips" }
```
**Response (500):**
```json
{ "ok": false, "reason": "database_error" }
```
**Response (403):**
```json
{ "error": "Forbidden" }
```

**Business Logic:**
- Atomically checks balance and deducts `arena.buyIn` from `bankedChips`.
- Increments `totalLost` by `arena.buyIn`.
- Updates `lastSeenAt`.
- Returns player snapshot for game server spawning.

**Database Operations:**
- `tx.player.findUnique({ where: { userTag } })`
- `tx.player.update({ where: { id }, data: { bankedChips: { decrement: arena.buyIn }, totalLost: { increment: arena.buyIn }, lastSeenAt: new Date() } })`

---

### 7.2 POST /api/match/result

[CODE COMMENT] Called by the Socket.IO game server (mini-service) when a player extracts or dies. Authenticates via a shared internal secret (NOT the user JWT).

**Authentication:** Header `x-internal-secret`.

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `userTag` | string | Required. |
| `arenaId` | string | Required. Must exist in arena config. |
| `outcome` | string | Treated as `'extract'` if exactly `'extract'`, otherwise `'death'`. |
| `carriedChips` | number | Floor'd, min 0. |
| `kills` | number | Floor'd, min 0. |
| `durationSeconds` | number | Floor'd, min 0. |
| `score` | number | Optional. Floor'd, min 0. |
| `bankedAmount` | number | Optional. Floor'd, min 0. The post-commission chips to credit on extract. |
| `starsCollected` | number | Optional. Floor'd, min 0. |
| `killerTag` | string | Optional. Present when outcome is `'death'`. |

**Response (200):**
```json
{
  "player": { /* toProfile(updated) */ },
  "chipsEarned": <number>,
  "chipsLost": <number>,
  "commission": <number>,
  "xpGained": <number>,
  "newLevel": <number>,
  "newBankedChips": <number>
}
```

**Error Messages:**
- `403` — "Forbidden"
- `400` — "Unknown arena."
- `404` — "Player not found."
- `500` — "Database error processing match result."

**Business Logic (Economy Rules):**
[CODE COMMENT] Extract: game server computes commission (dynamic: 0% if ≤3 players, 35% if ≥4). The `bankedAmount` field is the actual chips to credit (already post-commission). We use it directly instead of recomputing here. Death: carriedChips lost. Still earn XP. Practice (rewardMultiplier=0): 0 chips, 0 XP.

- **On Extract:**
  - `chipsEarned = bankedAmountFromBody` (post-commission, computed by game server)
  - `chipsLost = 0`
  - Credits: `bankedChips += chipsEarned`, `totalEarned += chipsEarned`
  - Increments `lifetimeExtracts` by 1
  - Updates `biggestExtract` if `chipsEarned > current biggestExtract`
  - `commission = carriedChips - bankedAmountFromBody`

- **On Death:**
  - `chipsEarned = 0`
  - `chipsLost = carriedChips`
  - Increments `totalLost += chipsLost`
  - Increments `lifetimeDeaths` by 1
  - [CODE COMMENT] chips carried are lost (already paid buyIn at join, no further deduction)

- **XP Formula:** `Math.floor((score * 5 + kills * 50) * arena.rewardMultiplier)`
  - Practice arenas have `rewardMultiplier = 0` → 0 XP.

- **Level Calculation:** `newLevel = Math.max(currentLevel, levelFromXp(newXp))`
  - Level never goes down.

- **Best Streak:** Updates `bestStreak` if `kills > current bestStreak`.

- **Challenge Progress (updateChallengeProgress helper):**
  - Runs inside the same transaction as the match result update.
  - Finds all active (incomplete) daily + weekly challenges for the player.
  - Per-category progress logic:
    - `kill`: `newCurrent += kills`
    - `extract`: `newCurrent = Math.max(newCurrent, carriedChips)` (tracks best single-run amount)
    - `extract_streak`: `newCurrent += 1` (only on extract outcome)
    - `score`: If `score >= target`, `newCurrent = target` (milestone-based)
    - `arena_entry`: `newCurrent += 1`
    - `star_collect`: `newCurrent += starsCollected`
    - `survive`: `newCurrent = Math.max(newCurrent, durationSeconds)` (tracks best single-match survival)
  - Auto-completes when `newCurrent >= target`.

**Database Operations:**
- `db.player.findUnique({ where: { userTag } })`
- `tx.player.findUnique({ where: { id } })`
- `tx.player.update({ where: { id }, data: { xp, level, lifetimeKills, bankedChips, totalEarned, lifetimeExtracts, biggestExtract, totalLost, lifetimeDeaths, bestStreak } })`
- `tx.challenge.findMany({ where: { playerId, completed: false, OR: [daily, weekly] } })`
- `tx.challenge.update({ where: { id }, data: { current, completed } })` — for each active challenge

---

### 7.3 POST /api/match/verify

[CODE COMMENT] Internal endpoint called by the Socket.IO server on socket connection. Validates the user's JWT (passed from the client via socket auth) and returns the player's spawn-safe profile.

**Authentication:** Header `x-internal-secret`.

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `token` | string | Required. Player JWT from `/api/auth/token`. |

**Response (200, success):**
```json
{
  "ok": true,
  "player": {
    "id": "<uuid>",
    "userTag": "<string>",
    "name": "<string>",
    "country": "<string>",
    "level": <number>,
    "bankedChips": <number>,
    "currentSkin": "<string>",
    "currentTrail": "<string>",
    "currentDeath": "<string>",
    "currentFlag": "<string>",
    "color": "<hex string>",
    "secondaryColor": "<string | undefined>",
    "pattern": "<string | undefined>",
    "unlockedSkins": ["<string>", ...],
    "clanTag": "<string>",
    "clanRank": "<string>",
    "role": "<string>"
  }
}
```
**Response (failure):**
```json
{ "ok": false, "reason": "invalid_token" | "player_not_found" | "banned" }
```
**Response (403):**
```json
{ "error": "Forbidden" }
```

**Business Logic:**
- Verifies the JWT using `verifySession(token)`.
- Resolves skin color/secondaryColor/pattern from `getCosmeticById()`. Default color: `'#22c55e'`.
- Includes `role` in response (for admin detection).

**Database Operations:**
- `db.player.findUnique({ where: { id: session.playerId } })`

---

## 8. ADMIN Routes

### 8.1 GET /api/admin/config

[CODE COMMENT] Returns all GameConfig rows. If the table is empty, seeds defaults first.

**Request Body:** None. No session/auth check in this route.

**Response (200):**
```json
[
  {
    "id": "<uuid>",
    "key": "<string>",
    "value": <any>,
    "label": "<string>",
    "category": "<string>",
    "order": <number>,
    "type": "<string>",
    "updatedAt": "<ISO date>"
  }
]
```

**Business Logic:**
- If `GameConfig` table is empty, calls `seedGameConfig()` to populate defaults, then re-fetches.
- Parses JSON `value` field back to native types for response.

**Database Operations:**
- `db.gameConfig.findMany({ orderBy: { order: 'asc' } })`

---

### 8.2 PUT /api/admin/config

[CODE COMMENT] Updates the given config keys with new values. Returns all configs after update.

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `updates` | Array<{ key: string, value: any }> | Required. Must be an array. |

**Response (200):** Same as GET response (full config list after update).

**Error Messages:**
- `400` — "updates must be an array"

**Business Logic:**
- Iterates through updates array, calls `db.gameConfig.update()` for each entry.
- Values are `JSON.stringify()`'d before storage.
- No session/auth check in this route.

**Database Operations:**
- `db.gameConfig.update({ where: { key }, data: { value: JSON.stringify(value) } })` — per entry
- `db.gameConfig.findMany({ orderBy: { order: 'asc' } })`

---

### 8.3 POST /api/admin/config/seed

[CODE COMMENT] Re-seeds the GameConfig table with defaults. Existing rows are left untouched (upsert semantics). Returns the full updated config list.

**Request Body:** None. No session/auth check.

**Response (200):**
```json
{ "success": true }
```

**Database Operations:**
- `seedGameConfig()` — upserts default config rows.

---

### 8.4 POST /api/admin/modify-chips

[CODE COMMENT] Admin-only. Atomically adjusts target player's bankedChips by amount (+/-).

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `userTag` | string | Required. Uppercased, trimmed. |
| `amount` | number | Required. Must be a non-zero finite number. Truncated to integer. |

**Response (200):**
```json
{ "ok": true, "player": { /* toProfile(updated) */ } }
```

**Error Messages:**
- `401` — "Unauthorized"
- `403` — "Forbidden: admin role required"
- `400` — "userTag required"
- `400` — "amount must be a non-zero number"
- `404` — "Player not found"
- `500` — "Database error"

**Business Logic:**
- Requires session with `role === 'admin'`.
- Chips are integers (uses `Math.trunc`).
- Banked chips clamped at 0 (no negative balances): `newChips = Math.max(0, bankedChips + amount)`.
- If amount > 0: increments `totalEarned`.
- If amount < 0: increments `totalLost` by `Math.abs(amount)`.
- Updates `lastSeenAt`.

**Database Operations:**
- `tx.player.findUnique({ where: { userTag } })`
- `tx.player.update({ where: { userTag }, data: { bankedChips: newChips, totalEarned, totalLost, lastSeenAt } })`

---

### 8.5 POST /api/admin/ban

[CODE COMMENT] Admin-only. Sets the target player's `banned` field.

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `userTag` | string | Required. Uppercased, trimmed. |
| `banned` | boolean | Required (coerced via `Boolean()`). |

**Response (200):**
```json
{ "ok": true, "userTag": "<string>", "banned": <boolean> }
```

**Error Messages:**
- `401` — "Unauthorized"
- `403` — "Forbidden: admin role required"
- `400` — "userTag required"
- `400` — "Cannot ban yourself"
- `404` — "Player not found"
- `400` — "Cannot ban an admin"

**Business Logic:**
- Requires session with `role === 'admin'`.
- Cannot ban yourself or other admins.
- Sets `banned` field and updates `lastSeenAt`.

**Database Operations:**
- `db.player.findUnique({ where: { userTag } })`
- `db.player.update({ where: { userTag }, data: { banned, lastSeenAt: new Date() } })`

---

## 9. OTHER Routes

### 9.1 GET /api/arena-stats

[CODE COMMENT] Returns live player counts per arena (proxied from game-server /stats endpoint). Falls back to maxPlayers=MAX_ARENA_PLAYERS and players=0 if game server unreachable.

**Request Body:** None. No auth required.

**Response (200):**
```json
{
  "<arenaId>": { "players": <number>, "maxPlayers": <number> },
  ...
}
```

**Business Logic:**
- Fetches from `http://localhost:3001/stats` with 2-second timeout.
- Merges with `ALL_ARENAS` config to ensure every arena has an entry.
- Falls back to `players: 0, maxPlayers: MAX_ARENA_PLAYERS` if game server unreachable.

---

### 9.2 GET /api/

**Request Body:** None. No auth required.

**Response (200):**
```json
{ "message": "Hello, world!" }
```

---

## 10. Shared Constants & Patterns

### Authentication Methods
- **Session JWT (httpOnly cookie):** Most player-facing routes use `getSession()` to read the session.
- **Internal Secret Header:** Match routes (`/api/match/*`) use `x-internal-secret` header.
- **Admin role check:** Admin routes check `session.role !== 'admin'`.

### Economy Patterns
- **Earning chips:** Increments `bankedChips` AND `totalEarned`.
- **Losing/spending chips:** Decrements `bankedChips` AND increments `totalLost`.
- **Starting chips:** All new accounts (registered, guest, OAuth) start with `bankedChips: 150`, `totalEarned: 150`.

### XP & Level Formula (in match/result)
- `xpGained = Math.floor((score * 5 + kills * 50) * arena.rewardMultiplier)`
- `newLevel = Math.max(currentLevel, levelFromXp(newXp))`
- Practice arenas: `rewardMultiplier = 0` → 0 XP, 0 chips.

### Commission (computed by game server, not API)
- Dynamic commission: 0% if ≤3 players in arena, 35% if ≥4 players.
- `bankedAmount` in match/result body is already post-commission.
- `commission = carriedChips - bankedAmount`

### Challenge System Constants
- **Streak multiplier:** 3+ days = 1.5×, 7+ days = 2.0×, 14+ days = 3.0×
- **Level tier thresholds:** novice ≤5, operative ≤15, veteran ≤30, elite >30
- **Level reward multiplier:** novice 1.0×, operative 1.5×, veteran 2.5×, elite 4.0×
- **Daily challenge count:** 3 per day
- **Weekly challenge count:** 2 per week
- **Anti-repeat:** Excludes previous day's daily titles and previous week's weekly titles

### Cosmetic Types
- `skin`, `trail`, `death`, `flag`, `banner`
- Stored in `unlockedSkins` as a JSON array of IDs.
- Equip requires ownership (skin must be in `unlockedSkins`).

### Clan Constants
- Max members: 30
- Default rank for new members: `'Viper'`
- Creator rank: `'Leader'`
- Clan tag: 3-5 uppercase alphanumeric characters
- Clan name: min 3 chars, max 30 chars
- Clan emblem: max 4 chars, default `'🐍'`
- Clan description: max 200 chars
- Max deposit per transaction: 1,000,000 chips
- Chat message max: 300 chars
- Chat history: last 50 messages

### Friend System
- Gift amount range: 1–1000 chips per transaction
- Online threshold: `lastSeenAt` within 60 seconds
- Friendship statuses: `'pending'`, `'accepted'`, `'blocked'`

### Video Reward
- Reward: 50 chips per view
- Cooldown: 60 seconds
- In-memory tracking (resets on server restart)
- Cleanup: triggers when map exceeds 10,000 entries

### Daily Login Reward
- Cycle: 7 days (streak % 7)
- Reward amounts: from `DAILY_REWARDS` config array
- Idempotent: checked inside transaction
- Missed day resets streak to 0

---

12-requirements-and-gaps.md
===
# GDD Part 12 — Requirements Checklist & Gap Analysis Catalog
> Source files: `requirements-checklist.md` (324 lines), `GAP-ANALYSIS.md` (165 lines)
> Task ID: 12

---

# SECTION A: COMPLETE REQUIREMENTS CHECKLIST

> Last updated: Session 6 (current)

Legend:
- ✅ = Implemented & Verified
- 🔧 = Implemented (needs testing)
- ❌ = Not Done
- ⚠️ = Partially Done

---

## 1. CORE GAME MECHANICS

### 1.1 Snake Movement
- ✅ Server-authoritative movement (client sends angle + wantsBoost only)
- ✅ BASE_SPEED = 4.5 (normal speed)
- ✅ BOOST_SPEED = 8.0 (boost speed)
- ✅ EXTRACT_GLIDE_SPEED = 3.2 (extraction speed)
- ✅ Turn rate: TURN_BASE(0.35) - score * TURN_SCORE_FACTOR(0.0003), min TURN_MIN(0.08)
- ✅ Bigger snakes turn slower (score affects turn rate)
- ✅ Segment spacing = 6px

### 1.2 Score & Body System
- ✅ INITIAL_SPAWN_SCORE = 20 (starting score)
- ✅ INITIAL_BODY_LENGTH = 20 (base body segments at spawn)
- ✅ Body length = INITIAL_BODY_LENGTH + (score - INITIAL_SPAWN_SCORE)
- ✅ MAX_BODY_LENGTH = 200 (body cap)
- ✅ Size formula: SIZE_BASE(8) + sqrt(score) * SIZE_SCORE_FACTOR(0.4)
- ✅ Score increases by eating food orbs (+1, +3, or +5 per orb)

### 1.3 Food Orbs
- ✅ Three sizes: Small(1pt, 3px), Medium(3pt, 5px), Large(5pt, 8px)
- ✅ Spawn weights: Small=60%, Medium=30%, Large=10%
- ✅ Food count target maintained per arena
- ✅ Visual rendering with glow effects per size

### 1.4 Star Collectibles
- ✅ Always exactly 10 stars dropped per real player death (STAR_DROP_COUNT=10)
- ✅ Each star value = floor(carriedChips / 10), remainder to last star
- ✅ 5-pointed golden glow star visual
- ✅ ONLY real players drop stars; bots NEVER drop stars
- ✅ Bots NEVER collect star chips (ignored in bot AI)

### 1.5 Death Food Drop
- ✅ Food orbs spread evenly along the ENTIRE body path (not one spot)
- ✅ S/M/L distribution: greedily pick Large(5) first, then Medium(3), then Small(1)
- ✅ Sum of all food orbs = snake's total score (exact match)
- ✅ Scatter = 15-20px around each body segment position
- ✅ Map death: 0 food orbs dropped (score destroyed)
- ✅ Bot selfDestruct WALL death: 0 food, 0 stars (vanish cleanly)
- ✅ Bot selfDestruct COLLISION death: STILL drops food

### 1.6 Boost Mechanic
- ✅ Activation: Hold Space / Left-click / Boost button
- ✅ BOOST_MIN_LENGTH = 8 (need >8 segments to boost)
- ✅ BOOST_DROP_INTERVAL = 40 frames (~2s at 20Hz)
- ✅ Drops 1 tail segment as small food orb per interval
- ✅ Snake shrinks: score -= 1 per drop
- ✅ Both online and offline modes implement boost food drops
- ✅ Boost is purely cosmetic/speed — does NOT affect collision outcome directly

---

## 2. COLLISION SYSTEM

### 2.1 Head-to-Body Collision
- ✅ Snake head hits foreign body segment → head owner dies
- ✅ Neck protection: First 5 segments (NECK_PROTECTION_SEGS=5) cannot kill
- ✅ Collision detection uses spatial hash grid for performance
- ✅ Hit factor: COLLISION_HIT_FACTOR applied to sum of sizes

### 2.2 Head-on (Head-to-Head) Collision
- ✅ 3 rules:
  - (A) Neither boosting → larger score survives
  - (B) Smaller boosting vs larger steady → smaller survives
  - (C) Both boosting → larger score survives
- ✅ Tie → both die
- ✅ HEAD_ON_HIT_FACTOR applied to sum of sizes

### 2.3 Wall/Map Collision
- ✅ Online: Circular boundary — going outside radius = death
- ✅ Offline: NO wall death (infinite map, no boundaries)
- ✅ Map boundary has breathing oscillation (±40px over 10s cycle)

---

## 3. BOT AI

### 3.1 Bot Personalities (Online)
- ✅ Scavenger, Opportunist, Hunter, Extractor, Coward
- ✅ All bots seek food and evade human players
- ✅ Body segment collision avoidance (150px range)
- ✅ Predictive evasion: project player 8 ticks ahead, steer perpendicular
- ✅ Edge avoidance: if near boundary (300px), turn toward center

### 3.2 Self-Destruct (Online Only)
- ✅ Triggered at score >= 100 (BOT_SELF_DESTRUCT_THRESHOLD)
- ✅ Navigate AWAY from center (toward wall) — SLOWLY
- ✅ NEVER boost during self-destruct
- ✅ Still collect food on the way (20% food seeking + 80% wall seeking)
- ✅ Wall death = vanish cleanly (0 food, 0 stars)
- ✅ Collision death = still drops food

### 3.3 Bot Restrictions
- ✅ Bots never boost (wantsBoost always false)
- ✅ Bots never collect star chips
- ✅ Bots drop 0 stars on death
- ✅ Bots have no chips (carriedChips = 0)

### 3.4 Offline Bots
- ✅ Always exactly 1000 bots in offline mode
- ✅ Varied body sizes: random initial score (0-80), random body length (+0 to +30)
- ✅ Rendering culling: only render bots within 1500px of camera
- ✅ No self-destruct behavior in offline mode
- ✅ No chips, no stars, no XP in offline mode

---

## 4. MAP SYSTEM

### 4.1 Online Map
- ✅ Circular boundary with breathing (radius oscillates ±40px, 10s cycle)
- ✅ Dynamic sizing: sqrt(realPlayerCount) scaling
- ✅ MAP_MIN_RADIUS = 3000 (1 player)
- ✅ MAP_MAX_RADIUS = 16000 (1000 players)
- ✅ Map boundary rendered as neon circle
- ✅ Safe spawn at least 500px inside boundary

### 4.2 Offline Map
- ✅ Infinite map (no boundaries, no wall death)
- ✅ No map boundary rendering

---

## 5. SPAWN SYSTEM

### 5.1 Safe Spawning
- ✅ Distance-based check from ALL snake heads (SAFE_SPAWN_MIN_DIST = 500px)
- ✅ At least 500px inside map boundary (online)
- ✅ SAFE_SPAWN_ATTEMPTS = 30 (max attempts before fallback)
- ✅ Fallback to random point if no safe spot found
- ✅ Spawn protection: 4 seconds invulnerability (RESPAWN_INVULN_MS = 4000)

### 5.2 Bot Displacement (Online)
- ✅ When human joins, one harvesting bot is forced into selfDestruct
- ✅ Makes room for new player without exceeding MAX_ARENA_PLAYERS

---

## 6. DEATH REPLAY SYSTEM

### 6.1 Recording
- ✅ Pre-death: 300-frame circular buffer (15s at 20Hz)
- ✅ Post-death: 300-frame linear buffer (15s at 20Hz)
- ✅ No pre-spawn frames (recording starts only after player snake appears)
- ✅ Death frame index tracked for progress bar marker

### 6.2 Camera Behavior
- ✅ Pre-death: follows player's snake head
- ✅ At death: camera centers on body midpoint (where food drops)
- ✅ Post-death: stays at death food position initially
- ✅ Tracks first entity (bot/player) collecting death food
- ✅ Switches to follow that entity's head (spectator mode)
- ✅ If no one collects food, slow zoom out at death position

### 6.3 UI
- ✅ Play/pause button
- ✅ Speed cycle: 0.25x, 0.5x, 1x, 2x
- ✅ Zoom in/out
- ✅ Restart button
- ✅ Progress bar with death marker (yellow line)
- ✅ Frame counter + time display (pre-death countdown / post-death count-up)
- ✅ "REPLAY" watermark
- ✅ Death indicator text after death frame

### 6.4 Server Side
- ✅ Death event emitted BEFORE match_result
- ✅ Player kept in room for 16s after death (for post-death snapshot delivery)
- ✅ Snapshots continue broadcasting during post-death window

---

## 7. ONLINE vs OFFLINE DIFFERENCES

| Feature | Online | Offline |
|---------|--------|--------|
| Chips | Buy-in + carry + extract | None (0) |
| Stars | Drop on player death | Not present |
| XP | Earned on extract | 0 |
| Commission | 0% if ≤3 real players, 35% if ≥4 | N/A |
| Map | Circular boundary, dynamic radius | Infinite, no walls |
| Leaderboard | By carried chips (top 10 real players) | By score (top 10 all snakes) |
| Bot Self-Destruct | Yes (score≥100, online only) | No |
| Bot Count | Per arena tier (25-60) | Always 1000 |
| Death Penalty | Lose all carried chips | None (practice) |
| Food on death | Spread along body + stars | Spread along body only |
| Wall death | Yes (map boundary) | No (infinite map) |

---

## 8. EXTRACTION SYSTEM

- ✅ Hold E key or Extract button to start extraction
- ✅ 3-second channel (EXTRACT_DURATION_MS = 3000)
- ✅ Steering interrupts extraction (cancel on turn)
- ✅ NO minimum extraction threshold (extract anytime)
- ✅ NO extraction zone restriction (extract anywhere)
- ✅ Graduated commission: 0% if ≤3 real players, 35% if ≥4
- ✅ Extracted chips = carriedChips - commission

---

## 9. HUD / UI ELEMENTS

### 9.1 In-Game HUD
- ✅ Kill counter
- ✅ Rank (#X of Y real players)
- ✅ Commission rate display
- ✅ Real player count
- ✅ Carried chips counter
- ✅ Score (body length)
- ✅ Mini-map
- ✅ Arena leaderboard (top 10)
- ✅ Boost button (mobile)
- ✅ Extract button with progress bar

### 9.2 Death Screen
- ✅ Kill/death info
- ✅ Killer name and tag
- ✅ Duration played
- ✅ Score at death
- ✅ Carried chips lost
- ✅ "Watch Death Replay" button
- ✅ Social buttons (View Profile, Add Friend, Add Rival) — only for real player killers
- ✅ XP gained display (online extract only)

### 9.3 Post-Game
- ✅ Match result with chips banked
- ✅ Level up notification
- ✅ Return to lobby button

---

## 10. ARENA TIERS

| Tier | Name | Buy-In | Bots | Reward Mult | Difficulty |
|------|------|--------|------|-------------|------------|
| 1 | Slum Alley | 10 | 25 | 1.0x | Beginner |
| 2 | Neon Grid | 100 | 30 | 1.5x | Medium |
| 3 | Viper Syndicate | 500 | 40 | 2.0x | High Stakes |
| 4 | Crimson Pit | 1,000 | 50 | 2.5x | Extreme |
| 5 | Void Serpent | 5,000 | 60 | 3.0x | Legendary |
| 6 | Venom Royale | 25,000 | 60 | 4.0x | Mythic |
| 7 | Apocalypse | 100,000 | 60 | 5.0x | Apocalypse |
| Practice | Offline | 0 | 1000 | 0x | Free |

---

## 11. SOCIAL FEATURES

- ✅ Global search by name or tag
- ✅ Friend system (request, accept, remove)
- ✅ Daily gifting (+25 chips per friend)
- ✅ Rival system (add rival from death screen)
- ✅ Clan system (create, join, leave)
- ✅ Player profile inspection
- ✅ Country flags display

---

## 12. ADMIN FEATURES

- ✅ Player banning
- ✅ Chip modification
- ✅ Banlist management

---

## 13. COSMETICS

- ✅ Skins (unlockable, equipable)
- ✅ Trails (visual effect behind snake)
- ✅ Death effects (visual on death)
- ✅ Flags (country flag display)
- ✅ Banners (profile banner)
- ✅ Chip store (purchase chip packs)

---

## 14. PROGRESSION

- ✅ XP system (online extract only)
- ✅ Level system
- ✅ Daily rewards (streak system)
- ✅ Season pass

---

## 15. INFRASTRUCTURE

- ✅ Next.js 16 + App Router (port 3000)
- ✅ Socket.IO game server (Bun mini-service, port 3001)
- ✅ Prisma ORM with SQLite
- ✅ Spatial hash grid for collision detection
- ✅ Caddy gateway for port forwarding
- ✅ JWT authentication
- ✅ Server-authoritative game state
- ✅ Dynamic map scaling
- ✅ 20Hz broadcast rate (online)
- ✅ 30Hz physics tick (offline)

---

## 16. RULES & GUIDE PAGE

- ✅ Comprehensive rules modal with all mechanics documented
- ✅ Sections: Controls, Online vs Offline, Food/Stars, Extraction, Collision, Boost, Bot AI, Map, FAQ
- ✅ Accurate graduated commission info
- ✅ No outdated information (min extraction, extraction zone, etc.)

---

## CHECKLIST NOTES

- Items marked ✅ have been implemented and code-reviewed
- Items marked 🔧 need browser verification
- This checklist is the single source of truth for all game requirements
- Update this file whenever new features are added or changed

---

# SECTION B: GAP ANALYSIS

> Source of Truth: Official Guide & Rules modal ONLY
> Generated after deep study of every rule section against actual code implementation.

---

## CRITICAL BUGS (Already Fixed)

### BUG #1: Death Replay Crash — `isOfflineMode is not defined`
- **File**: `src/components/game/game-canvas.tsx`
- **Location**: `EndOverlay` component (lines 2955, 2985)
- **Problem**: `EndOverlay` is a separate function component that receives `isOffline` as a prop, but references `isOfflineMode` which only exists in the parent `GameCanvas` scope
- **Rule impact**: Any online death triggers "isOfflineMode is not defined" → white error screen, replay completely broken
- **Fix applied**: Changed `isOfflineMode` → `isOffline` in both locations
- **Status**: ✅ FIXED

---

## RULE vs CODE GAPS

### GAP #1: Boost Drop Rate Wrong (~0.75/sec instead of ~3/sec)
- **Rule (Section 4 - Boost Mechanic)**: "Speed: 4.5 → 8.0 (nearly 2x faster). **~3 times per second**, tail drops a food orb (continuous trail)."
- **Code** (`game-config.ts` line 198): `BOOST_DROP_INTERVAL = 40`
- **Math**: 40 frames × 33.3ms = 1333ms per drop = **0.75 drops/sec**
- **Rule says**: ~3 drops/sec → needs interval of **10 frames** (10 × 33.3ms = 333ms)
- **File to fix**: `src/lib/game-config.ts` — change `BOOST_DROP_INTERVAL = 40` → `10`

### GAP #2: Food Collection Sound Never Plays (Online Mode)
- **Rule (Section 4)**: Sound effects for food collection exist
- **Code**: `playFoodCollect` is **imported** in `game-canvas.tsx` (line 45) but **NEVER CALLED**
- **Problem**: Online mode has no "food_eaten" event from server. Client only receives 20Hz snapshots. No food-eaten sound trigger mechanism exists.
- **Fix needed**: Either (a) server emits a `food_eaten` event when player eats food, OR (b) client detects food collection by diffing snapshots
- **Files**: `mini-services/game-server/index.ts` + `src/components/game/game-canvas.tsx`

### GAP #3: Boost Sound Never Plays
- **Rule (Section 4)**: Sound effects for boosting
- **Code**: `playBoost()` exists in `game-audio.ts` but is **NOT IMPORTED or CALLED** anywhere
- **Problem**: No boost activation sound effect plays
- **Fix needed**: Import and call `playBoost()` when boost activates
- **Files**: `src/components/game/game-canvas.tsx`

### GAP #4: Wall Hit Sound Never Plays
- **Rule (Section 5)**: Wall collision = death → should have sound
- **Code**: `playWallHit()` exists in `game-audio.ts` but is **NOT IMPORTED or CALLED** anywhere
- **Problem**: No sound when hitting the map boundary wall
- **Fix needed**: Import and call `playWallHit()` on wall death
- **Files**: `src/components/game-canvas.tsx`

### GAP #5: Star Chip Collection Sound Missing (Online Mode)
- **Rule (Section 3)**: Star chips = golden collectibles → should have distinct sound
- **Code**: `playFoodCollect('star')` exists (special two-tone sound) but is never triggered for online star collection
- **Problem**: Same as GAP #2 — no star collection event from server
- **Fix**: Same as GAP #2 — server event or client detection
- **Files**: Same as GAP #2 (`mini-services/game-server/index.ts` + `src/components/game/game-canvas.tsx`)

---

## ALREADY CORRECT (Rule ✅ = Code ✅)

### ✅ Section 0: Accounts
- 150 starter chips, VENOM-XXXX tag, Security PIN, guest upgrade — all match

### ✅ Section 1: Controls
- Mouse/Touch steering, WASD/Arrows, Space/Shift boost, E extract — all match
- Joystick boost (magnitude > 0.6), keyboard shortcuts 1-5 for emotes — match

### ✅ Section 2: Online vs Offline Mode
- Online: chip buy-in, real players, graduated commission (0% ≤3, 35% ≥4), death penalty, star chips, XP on extraction only, circular breathing map, 30 bots/tier, bots self-destruct at score≥100, bots never drop/collect stars — all match
- Offline: FREE, 1000 AI bots, no chips/stars/XP, infinite map, no self-destruct — all match

### ✅ Section 3: Food Orbs & Star Chips
- Small=1pt green 93%, Medium=3pt blue 4%, Large=5pt pink 3% — match
- Death food orbs: body→S/M/L scattered along body, total=snake score, Large=score÷5, Medium=remainder÷3, Small=rest — match
- Wall death: NO food orbs (score destroyed) — match
- Star chips: 10 per player death, each=carried÷10, only real players collect, bots never see/collect/drop — match
- Star chip scatter (ring pattern, not scattered) — match

### ✅ Section 4: Boost Mechanic
- Speed: 4.5 → 8.0 — match (BASE_SPEED=4.5, BOOST_SPEED=8.0)
- Tail drops food orb, snake shrinks 1 segment — match (BOOST_DROP_INTERVAL controls timing)
- Need >8 body segments — match (BOOST_MIN_LENGTH=8)
- Earned mass required (score above starting) — match

### ✅ Section 5: Collision Rules
- Head-to-body: YOU die, food scattered, 10 stars if carried chips >0 — match
- Neck protection: first 5 segments — match (NECK_PROTECTION_SEGS=5)
- Head-on: Neither boosting → larger wins. Smaller boosting + larger steady → smaller survives. Both boosting → larger wins. Tie → both die — match
- Map boundary = instant death — match
- Wall death: NO food (score destroyed), stars YES if carried > 0, bot wall death = vanish cleanly — match

### ✅ Section 6: Bot AI Behavior
- 5 personalities implemented: scavenger, opportunist, hunter, extractor, coward — match
- Harvesting: seek food, dodge players (predictive 8 ticks), avoid body (150px), turn from boundary — match
- Self-destruct (online only): score ≥100, navigate toward wall, NEVER boost, collect food on way — match
- Self-destruct wall death = vanish cleanly — match

### ✅ Section 7: Map & Safe Spawning
- Online: circular, ±40px breathing over 10s, radius scales with player count — match
- Offline: infinite, no boundaries — match
- Safe spawn: 500px from snakes, 500px inside boundary — match
- 4s spawn protection — match (RESPAWN_INVULN_MS)

### ✅ Section 8: Extraction
- Hold E / EXTRACT button, 3-second progress — match
- Forward gliding allowed — match (speed = EXTRACT_GLIDE_SPEED)
- Steering restarts progress — match (game-server STEER_THRESHOLD = 0.08 rad ≈ 4.6°)
- Progress ring near head (private, only you see) — match (render-helpers)
- Extract anytime, anywhere — match
- Commission display — match
- Movement flash warning — match (extract_cancelled_by_steer event)

### ✅ Section 9: HUD
- Top-left: Carried Chips, Stars Earned, Stars in Arena (online only), Rank, Score, Kills, Boost reminder, Active Competitors — match
- Top-right: Banked Chips, FPS/Ping, Arena Leaders — match
- Bottom-left: Quick Chat emotes (5, keys 1-5, 4s bubbles) — match
- Bottom-right: BOOST (64px), EXTRACT (80px), EXIT — match

### ✅ Section 11: Death & Replay
- Body → food orbs along path, total = score — match
- 10 stars at death position — match
- Replay: 15s before + 15s after — match (450 frames × 30Hz = 15s each)
- Online replay player exists with play/pause, speed, scrub — match

### ✅ Section 12: Leaderboards
- Lobby leaderboards with milestone badges — match
- Arena leaderboards (online: real players by chips; offline: bots + player by score) — match

### ✅ Section 13: FAQ
- Graduated commission, extraction restart, private ring, bot self-destruct — all match

---

## APPROVED FEATURES STATUS

| Feature | Status | Notes |
|---------|--------|-------|
| Online replay system | ✅ Implemented | OnlineReplayPlayer component exists, was crashed by isOfflineMode bug (FIXED) |
| Kill feed / event log | ✅ Implemented | Server emits kill_feed, client displays top-left |
| Sound effects | ⚠️ Partial | Extract/death/kill sounds work. Food/boost/wall sounds NOT wired |
| Bot personalities | ✅ Implemented | 5 personalities with distinct behavior in game-state.ts |
| Bot vs player visual | ✅ Implemented | isBot check in render-helpers for labels, minimap dots |
| Extraction steering restart | ✅ Implemented | STEER_THRESHOLD in game-server, front gliding allowed |
| Arena stats player count | ❌ REJECTED | Per user instruction |
| Last alive notification | ❌ REJECTED | Per user instruction |

---

## IMPLEMENTATION PLAN (Priority Order)

### Phase 1: Fix Audio Wiring (small scope)
1. Fix BOOST_DROP_INTERVAL: 40 → 10 in game-config.ts (rules say ~3/sec)
2. Wire `playFoodCollect()` — add server `food_eaten` event OR client detection
3. Wire `playBoost()` — import and call on boost activation
4. Wire `playWallHit()` — import and call on wall death

### Phase 2: Verify Replay (test thoroughly)
1. The isOfflineMode fix should unblock replay
2. Test: online death → replay button → plays correctly
3. Verify frame data types align between game-canvas and OnlineReplayPlayer

### Phase 3: Rewrite Only If Needed
- Current code is mostly correct per rules analysis
- 9 GAPs found, 1 critical bug fixed, 4 sound wiring issues, 1 config fix
- Major rewrite NOT recommended — targeted fixes sufficient
