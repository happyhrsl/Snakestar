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
