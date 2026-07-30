# Game Rules Modal — Full Screen Content Walkthrough

> Source: `/src/components/modals/game-rules-modal.tsx` (850 lines)

---

## Modal Container

- **Component:** `Dialog` (Radix/shadcn Dialog)
- **Max width:** `max-w-3xl` (48rem / 768px)
- **Max height:** `max-h-[88vh]` (88% of viewport height)
- **Background:** `bg-slate-950` with `border-slate-800` border, `text-slate-200`
- **Overflow:** `p-0 overflow-hidden` (content scrolls inside)

---

## Header (fixed at top, not scrollable)

**Layout:** Flex row, items centered, justified between. Border bottom: `border-slate-800/80`, background: `bg-slate-900/50`. Padding: `p-5`.

**Left side — Icon + Title block:**

- A 40×40px rounded-xl icon container with `bg-emerald-500/10` background, `border-emerald-500/20` border, containing a `BookOpen` icon (emerald-400, 20×20px).
- **Title (DialogTitle):** `VENOM ARENA — OFFICIAL GUIDE & RULES`
  - Font: `text-base sm:text-lg font-black text-white tracking-tight`
- **Subtitle (DialogDescription):** `Accounts, controls, modes, arena tiers, HUD, extraction, challenges, death, replay, leaderboards & FAQ`
  - Font: `text-xs text-slate-400`

**Right side:** Empty (close is handled by the dialog's own X button via `onOpenChange`).

---

## Scrollable Content Area

- Padding: `px-6 py-5`
- Layout: `flex flex-col gap-5`
- Scroll: `overflow-y-auto va-scroll`
- Max height: `max-h-[calc(88vh-130px)]`

---

### HERO BANNER

- Container: `p-4 rounded-2xl` with gradient background `from-slate-900 to-emerald-950/50`, border `border-emerald-500/20`, relative with overflow hidden.
- Decorative: A 48×48 (w-48 h-48) emerald-500/10 blurred circle in the top-right corner (`blur-3xl`), pointer-events-none.

**Content:**

- Small label (uppercase, mono, bold, tracking-widest, emerald-400, 10px):
  `Core Loop`
- Heading (18px, black font, white):
  `Hunt. Harvest. Extract. Don't get caught.`
- Body paragraph (12px, slate-300, leading-relaxed):
  `You spawn as a small venom snake. Grow by harvesting food orbs for score/size, and collect star chips from fallen rivals to increase your carried chips. The bigger you are, the more dangerous you become — but also the easier to cut off. Bank your winnings by extracting before someone makes you their harvest.`

---

### SECTION 0 — ACCOUNTS & GETTING STARTED

- **Section icon:** `Landmark` (emerald, 16×16)
- **Section heading:** `0. ACCOUNTS & GETTING STARTED` (emerald-400, bold, 14px)

#### 3-Column Grid (1 col mobile / 2 col sm / 3 col lg):

---

**Card 1 — Register (Recommended)**

- Border: `bg-emerald-950/20 border-emerald-500/30 p-3 rounded-xl`
- Heading (emerald-300, bold, 12px, with `LogIn` icon):
  `Register (Recommended)`
- Bullet list (disc, slate-400, 11px):
  - Choose a **display name** (up to 20 chars)
  - Enter a valid **email** + password (min 6 chars)
  - Set a **4-digit Security PIN** (needed for password recovery)
  - Receive a unique **VENOM-XXXX** tag (your permanent ID)
  - Start with **150 starter chips** (free!)
  - Your progress is **saved permanently**

---

**Card 2 — Social Login**

- Border: `bg-violet-950/20 border-violet-500/30 p-3 rounded-xl`
- Heading (violet-300, bold, 12px, with `Globe` icon):
  `Social Login`
- Bullet list (disc, slate-400, 11px):
  - Sign in with **Google**, **Facebook**, or **Apple**
  - No password needed — uses your existing account
  - Also starts with **150 starter chips** and a VENOM-XXXX tag
  - If your social email matches an existing account, it **links automatically**
  - You can also set a password later in Profile → Security Settings

---

**Card 3 — Guest Play**

- Border: `bg-amber-950/20 border-amber-500/30 p-3 rounded-xl`
- Heading (amber-300, bold, 12px, with `Shield` icon):
  `Guest Play`
- Bullet list (disc, slate-400, 11px):
  - **No email needed** — one-click to play
  - Also starts with **150 starter chips**
  - Gets a random VENOM-XXXX tag
  - Guest accounts can **upgrade to registered** later (in Profile panel)
  - All progress carries over when upgrading

---

#### InfoCard: Chip Economy Basics

- Title (amber-300, bold, 12px):
  `Chip Economy Basics`
- Bullet list (disc, slate-400, 11px):
  - Chips are **free in-game currency** — no real-world value
  - Start with 150 chips. Earn more by: extracting from arenas, daily login rewards, chip store, or gifting from friends (+25 per friend)
  - Buy into arenas costs chips. If you die, you lose your carried chips. If you extract, you bank them!
  - Need more chips? Visit the Chip Store (free packs) or claim Daily Rewards

---

#### InfoCard: Password Recovery (Forgot Password)

- Title (cyan-300, bold, 12px):
  `Password Recovery (Forgot Password)`
- Bullet list (disc, slate-400, 11px):
  - On the Login page, click **"Forgot Password?"**
  - Enter your **registered email** and your **4-digit Security PIN**
  - Set a new password (min 6 chars) and confirm it
  - Your password is updated instantly — no email verification needed
  - **Important:** If you didn't set a Security PIN during registration, password recovery is not available. Contact support or set a PIN in Profile → Security Settings before you forget your password!

---

#### InfoCard: Managing Your Security PIN

- Title (emerald-300, bold, 12px):
  `Managing Your Security PIN`
- Bullet list (disc, slate-400, 11px):
  - Your PIN is set during **registration** (optional but recommended)
  - Change or set your PIN anytime in **Profile → Security Settings**
  - If you already have a PIN, you must enter your current PIN before setting a new one
  - The PIN is your **only recovery method** — memorize it or store it securely
  - Guest accounts cannot set a PIN (they have no password to recover)

---

### SECTION 1 — CONTROLS

- **Section icon:** `Gamepad` (cyan, 16×16)
- **Section heading:** `1. CONTROLS` (cyan-400, bold, 14px)

#### 2-Column Grid:

---

**InfoCard: Mouse / Touch**

- Title (cyan-300, bold, 12px):
  `Mouse / Touch`
- Body text (slate-400, 11px):
  `Move cursor to steer. Left-click or hold for Boost. On mobile, drag the joystick — push far for boost.`

---

**InfoCard: Keyboard**

- Title (amber-300, bold, 12px):
  `Keyboard`
- Body text (slate-400, 11px):
  `WASD or Arrow Keys to steer. Hold Space/Shift for Boost. Hold E for Extract.`

---

### SECTION 2 — ONLINE MULTIPLAYER VS. OFFLINE PRACTICE

- **Section icon:** `Users` (emerald, 16×16)
- **Section heading:** `2. ONLINE MULTIPLAYER VS. OFFLINE PRACTICE` (emerald-400, bold, 14px)

#### 2-Column Grid:

---

**Card 1 — Online Arena (High Stakes)**

- Border: `bg-emerald-950/20 border-emerald-500/30 p-3 rounded-xl`
- Heading (emerald-300, bold, 12px, with `Users` icon):
  `Online Arena (High Stakes)`
- Bullet list (disc, slate-400, 11px):
  - **Chip Buy-In:** Deducts buy-in from your banked vault into carried match chips.
  - **Real Players:** Live PvP with real opponents and leaderboard rankings.
  - **Graduated Commission:** 0% if ≤3 real players, 35% if ≥4. Extract anytime.
  - **Full Death Penalty:** On death, your carried chips transform into 10 stars at your last position for others to collect.
  - **Star Chips:** Golden stars dropped when real players die. Each star = player's carried chips ÷ 10. Collect to increase your carried chips.
  - **XP:** Earned on successful extraction only.
  - **Map:** Circular boundary that breathes. Stay inside!
  - **Bots:** 30 bots per tier. Self-destruct at score≥100. Bots never drop or collect stars.

---

**Card 2 — Offline Practice (Risk-Free)**

- Border: `bg-amber-950/20 border-amber-500/30 p-3 rounded-xl`
- Heading (amber-300, bold, 12px, with `Target` icon):
  `Offline Practice (Risk-Free)`
- Bullet list (disc, slate-400, 11px):
  - **100% FREE:** Zero chip cost. No buy-in.
  - **AI Bots:** 1,000 AI bots of varied sizes.
  - **No Chips / Stars / XP:** Score-based leaderboard (body length), no chip economy
  - **Infinite Map:** No boundaries, no wall death.
  - **No Bot Self-Destruct:** Bots just harvest and dodge.
  - **Ideal for Warmups:** Practice without pressure.

---

#### InfoCard: Arena Leaderboard: Online vs Offline

- Title (yellow-300, bold, 12px):
  `Arena Leaderboard: Online vs Offline`

Contains a 2-column grid inside:

**Left sub-card — Online Arena Leaderboard**

- Border: `bg-emerald-950/20 border-emerald-500/20 rounded-lg p-2.5`
- Heading (emerald-300, bold, 11px):
  `Online Arena Leaderboard`
- Bullet list (disc, slate-400, 11px):
  - **Who appears:** Real players only (no bots)
  - **Sorted by:** Carried Chips (highest first)
  - **Value shown:** Carried chips in green (e.g., "100c")
  - **Your entry:** Highlighted with indigo background + "YOU" badge
  - **Country flags:** ✅ Shown next to each player name
  - **Ranking format:** "#X of Y" (e.g., "#1 of 3")
  - **Empty state:** Shows "No real players yet."

**Right sub-card — Offline Practice Leaderboard**

- Border: `bg-amber-950/20 border-amber-500/20 rounded-lg p-2.5`
- Heading (amber-300, bold, 11px):
  `Offline Practice Leaderboard`
- Bullet list (disc, slate-400, 11px):
  - **Who appears:** You + nearby active bots (top 10)
  - **Sorted by:** Score / body length (highest first)
  - **Value shown:** Score in indigo (e.g., "42")
  - **Your entry:** Highlighted with green background
  - **Country flags:** ❌ Not shown
  - **Ranking format:** "#X" only (e.g., "#31")
  - **Always populated:** Player + bots always visible

---

### Arena Tiers — 30 Competitive Tiers (10c → 1B)

> This is an InfoCard (not a numbered section), placed between sections 2 and 3.

- Title (indigo-300, bold, 12px):
  `Arena Tiers — 30 Competitive Tiers (10c → 1B)`

**Table — Arena Tiers** (full width, 10px font, border-collapse):

| # | Tier | Buy-In | Bots | XP Multi | Difficulty |
|---|------|--------|------|----------|------------|
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

> **Note on `fmtShort` formatting:** Buy-in values ≥1,000 display a short-form in parentheses. Values <1,000 display only the full number (e.g., `10c`, `20c`). The `#` column and `Tier` column text color matches the tier's `accentColor`. The `XP Multi` column text is indigo-300. Bots column is always 30. Rows are separated by `border-b border-slate-900` except the last row.

---

### Practice Tiers (3 Free Tiers — 1,000 Bots Each)

> This is an InfoCard (not a numbered section), placed after the Arena Tiers table.

- Title (amber-300, bold, 12px):
  `Practice Tiers (3 Free Tiers — 1,000 Bots Each)`

**Table — Practice Tiers** (full width, 10px font, border-collapse):

| Tier | Buy-In | Bots | XP Multi | Difficulty |
|------|--------|------|----------|------------|
| Easy Practice Arena | FREE | 1,000 | x0.0 | Beginner |
| Medium Practice Arena | FREE | 1,000 | x0.0 | Medium |
| Hard Practice Arena | FREE | 1,000 | x0.0 | High Stakes |

> **Note:** Buy-In column text is emerald-300 ("FREE"). XP Multi column text is slate-500. Tier names colored by their `accentColor`. Rows separated by `border-b border-slate-900` except last row.

---

### SECTION 3 — FOOD ORBS & STAR CHIPS

- **Section icon:** `Coins` (amber, 16×16)
- **Section heading:** `3. FOOD ORBS & STAR CHIPS` (amber-400, bold, 14px)

**Intro paragraph** (slate-300, 12px, margin-bottom 2):
`Two types of collectibles exist on the arena floor:`

#### 2-Column Grid:

---

**InfoCard: Food Orbs (3 sizes)**

- Title (emerald-300, bold, 12px):
  `Food Orbs (3 sizes)`
- Bullet list (disc, slate-400, 11px):
  - **Small:** 1 point, green glow (93% chance — very common)
  - **Medium:** 3 points, blue glow (4% chance)
  - **Large:** 5 points, pink glow (3% chance — rare)
- Body paragraph (slate-400, 11px, margin-top 1):
  `Eating food increases score and body length. Growth rate is 1/4 of food value. ALL snakes eat food orbs. Food orbs do NOT affect carried chips.`

---

**InfoCard: Death Food Orbs (Body Drop)**

- Title (rose-300, bold, 12px):
  `Death Food Orbs (Body Drop)`
- Bullet list (disc, slate-400, 11px):
  - When any snake (bot or player) dies from **collision**, their body transforms into food orbs **scattered along the body path**.
  - Total food value = the dead snake's **entire score**, broken into S/M/L orbs.
  - **Large (5pts, pink):** score ÷ 5. **Medium (3pts, blue):** remainder ÷ 3. **Small (1pt, green):** whatever's left.
  - **Example:** A snake with score 23 dies → 4 large (4×5=20), 1 medium (1×3=3), 0 small. Total = 23 ✓
  - **ALL snakes** (players + bots) can eat death food → increases score/size only.
  - **Wall death:** NO food orbs drop at all (score is destroyed to prevent edge farming).
  - Death food orbs are **completely separate from stars** — food affects score/size, stars affect carried chips.

---

**InfoCard: Star Chips (Chip Fragments from Death)**

- Title (amber-300, bold, 12px, with inline `Star` icon in amber-400):
  `Star Chips (Chip Fragments from Death)`
- Bullet list (disc, slate-400, 11px):
  - A player enters the arena with their **buy-in chips**. During the match, collecting stars from dead opponents increases their **carried chips** (buy-in + star value collected). This total is shown above the player's head.
  - **Carried Chips** = buy-in chips + collected star value. Food orbs and boost do NOT affect carried chips — they only affect score and size.
  - When a **real player dies**, their carried chips transform into exactly **10 stars** at the player's last position. Stars do NOT scatter or spread on the map.
  - Each star's value = **carried chips ÷ 10**. All 10 stars have the same value.
  - **Example:** If your carried chips are **275c** when you die → each star = 275 ÷ 10 = **27.5c**. 10 stars × 27.5c = 275c total.
  - Only **real players** can collect stars. Bots cannot see, touch, or collect stars.
  - Collecting a star adds its chip value to your **carried chips** (not score).
  - Bots **never** drop stars on death — they vanish cleanly.

---

### SECTION 4 — BOOST MECHANIC

- **Section icon:** `Zap` (cyan, 16×16)
- **Section heading:** `4. BOOST MECHANIC` (cyan-400, bold, 14px)

#### 2-Column Grid:

---

**InfoCard: How Boost Works**

- Title (cyan-300, bold, 12px):
  `How Boost Works`
- Bullet list (disc, slate-400, 11px):
  - Hold Space / Left-click / Boost button
  - Speed: 4.5 → 8.0 (nearly 2x faster)
  - ~3 times per second, tail drops a **food orb** (continuous trail)
  - Snake **shrinks** by 1 segment per drop
  - Need >8 body segments to boost
  - **Earned mass required:** Must have eaten food first (score above starting score)

---

**InfoCard: Strategy Tips**

- Title (rose-300, bold, 12px):
  `Strategy Tips`
- Bullet list (disc, slate-400, 11px):
  - Use to cut off rivals or escape danger
  - Boosting burns earned mass faster than eating grows it
  - Dropped food orbs can be collected by anyone
  - Cannot boost at starting score — eat food first!

---

### SECTION 5 — COLLISION RULES

- **Section icon:** `Crosshair` (rose, 16×16)
- **Section heading:** `5. COLLISION RULES` (rose-400, bold, 14px)

#### Stacked InfoCards (vertical layout):

---

**InfoCard: Head-to-Body Collision**

- Title (rose-300, bold, 12px):
  `Head-to-Body Collision`
- Body text (slate-400, 11px):
  `If your head hits another snake's body, YOU die. Your body transforms into food orbs spread along your body path. If you had carried chips, 10 stars appear at your last position.`
  `Neck protection: First 5 segments behind a head cannot kill (prevents unfair "neck touch").`

---

**InfoCard: Head-on Collision (Head vs Head)**

- Title (amber-300, bold, 12px):
  `Head-on Collision (Head vs Head)`
- Bullet list (disc, slate-400, 11px):
  - **Neither boosting:** Larger wins, smaller dies
  - **Smaller boosting, larger steady:** Smaller survives!
  - **Both boosting:** Larger wins
  - **Tie:** Both die

---

**InfoCard: Map Boundary (Online Only)**

- Title (emerald-300, bold, 12px):
  `Map Boundary (Online Only)`
- Bullet list (disc, slate-400, 11px):
  - Going outside the circular map = **instant death**. Boundary gently breathes (±40px).
  - **Food Orbs:** NONE — score is completely destroyed (prevents edge farming).
  - **Stars:** YES — if player had carried chips > 0, exactly **10 stars** drop at death position. Other players can collect them.
  - **Player loses everything:** Both score and carried chips are gone.
  - **Bot wall death:** Vanish cleanly — 0 food, 0 stars (bots never carry chips).

---

### SECTION 6 — BOT AI BEHAVIOR

- **Section icon:** `Bot` (violet, 16×16)
- **Section heading:** `6. BOT AI BEHAVIOR` (violet-400, bold, 14px)

#### 2-Column Grid:

---

**InfoCard: Harvesting Mode**

- Title (violet-300, bold, 12px):
  `Harvesting Mode`
- Bullet list (disc, slate-400, 11px):
  - Seek nearest food orbs
  - Dodge players (predictive — 8 ticks ahead)
  - Avoid body segments (150px range)
  - Turn away from map boundary
  - Never boost, never collect stars

---

**InfoCard: Self-Destruct (Online Only)**

- Title (rose-300, bold, 12px):
  `Self-Destruct (Online Only)`
- Bullet list (disc, slate-400, 11px):
  - Triggered at score ≥100
  - Navigate **toward** wall slowly
  - **NEVER boost**
  - Still collect food on the way
  - Wall death = vanish cleanly (0 food, 0 stars)

---

### SECTION 7 — MAP & SAFE SPAWNING

- **Section icon:** `Map` (emerald, 16×16)
- **Section heading:** `7. MAP & SAFE SPAWNING` (emerald-400, bold, 14px)

#### 2-Column Grid (3 cards):

---

**InfoCard: Online Map**

- Title (emerald-300, bold, 12px):
  `Online Map`
- Bullet list (disc, slate-400, 11px):
  - Circular arena (breathes ±40px over 10s)
  - Radius scales with player count
  - Outside boundary = death

---

**InfoCard: Offline Map**

- Title (amber-300, bold, 12px):
  `Offline Map`
- Bullet list (disc, slate-400, 11px):
  - **Infinite** — no boundaries, no wall death
  - Roam freely in any direction

---

**InfoCard: Safe Spawning**

- Title (cyan-300, bold, 12px):
  `Safe Spawning`
- Bullet list (disc, slate-400, 11px):
  - 500px from every other snake
  - 500px inside map boundary (online)
  - **4s spawn protection** (invulnerable)

---

### SECTION 8 — EXTRACTION

- **Section icon:** `Trophy` (amber, 16×16)
- **Section heading:** `8. EXTRACTION` (amber-400, bold, 14px)

#### 2-Column Grid:

---

**InfoCard: How to Extract**

- Title (amber-300, bold, 12px):
  `How to Extract`
- Bullet list (disc, slate-400, 11px):
  - Hold **E key** or **EXTRACT** button
  - 3-second progress bar — forward gliding is allowed
  - **Steering restarts progress to 0%** — you can glide forward naturally, but any direction change (even slight) resets the timer
  - A white-to-green **progress ring** appears near your snake head — **only visible to you**, other players cannot see it
  - Extract **anytime** — no minimum threshold
  - Extract **anywhere** — no zone restriction

---

**InfoCard: Commission**

- Title (rose-300, bold, 12px):
  `Commission`
- Bullet list (disc, slate-400, 11px):
  - **≤3 real players:** 0% (keep 100%)
  - **≥4 real players:** 35% (keep 65%)
  - Rate shown live on HUD

---

**InfoCard: Extraction UI Elements**

- Title (cyan-300, bold, 12px):
  `Extraction UI Elements`
- Bullet list (disc, slate-400, 11px):
  - **Top-center hint:** "Hold E or press the button below to cash out safely!" — always visible while playing
  - **Progress popup:** When extracting, a bar fills 0→100% with amber gradient. Commission rate shown below
  - **Movement flash:** If you move during extraction, a red "⚠ MOVEMENT DETECTED — Extraction restarted!" warning flashes
  - **EXTRACT button:** Bottom-right circular button (80px). Shows percentage while extracting, turns green when active
  - **BOOST button:** Adjacent circular button (64px, amber). Hold to boost. Must have 8+ body segments and earned mass

---

### SECTION 9 — IN-GAME HUD EXPLAINED

- **Section icon:** `Gamepad` (indigo, 16×16)
- **Section heading:** `9. IN-GAME HUD EXPLAINED` (indigo-400, bold, 14px)

#### 2-Column Grid:

---

**InfoCard: Top-Left: Status Cards**

- Title (emerald-300, bold, 12px):
  `Top-Left: Status Cards`
- Bullet list (disc, slate-400, 11px):
  - **Carried Chips (online only):** Green card showing total carried chips with "c" suffix. Starts at buy-in amount, increases when you collect star chips from dead players. Hidden in offline mode
  - **Stars Earned (online only):** Amber card showing extra chips earned from collecting star collectibles (Carried Chips − Buy-In)
  - **Stars in Arena (online only):** Shows how many golden star collectibles are currently on the arena floor (drops when real players die, decreases when collected)
  - **Rank:** Yellow trophy icon + arena rank number
  - **Score:** Purple shield icon + snake body length
  - **Kills:** Red skull icon + opponents eliminated
  - **Boost:** Amber zap icon + "SPACE" reminder
  - **Active Competitors:** "Real Players: N Active" (pulsing indigo) or "Offline Mode: 1 Player" (amber)

---

**InfoCard: Top-Right: Network & Leaderboard**

- Title (cyan-300, bold, 12px):
  `Top-Right: Network & Leaderboard`
- Bullet list (disc, slate-400, 11px):
  - **Banked Chips:** Amber card showing vault balance (deducts buy-in on match start)
  - **FPS / Ping:** Frames per second + latency in ms. Color-coded. "LQ" badge if low quality
  - **Chat / Minimap:** Below banked card. Chat opens message dialog. Minimap toggles radar
  - **Arena Leaders (Online):** Collapsible top-10 leaderboard of real players only. Sorted by carried chips (e.g., "100c" in green). Shows player name, country flag, carried chips. Your entry highlighted with "YOU" badge in indigo. Shows "No real players yet." if you're the only one
  - **Arena Leaders (Offline):** Top-10 of you + nearby active bots. Sorted by score (body length, shown in indigo). Your entry highlighted in green. No country flags shown

---

**InfoCard: Bottom-Left: Quick Chat Emotes**

- Title (violet-300, bold, 12px):
  `Bottom-Left: Quick Chat Emotes`
- Bullet list (disc, slate-400, 11px):
  - 5 emotes: GG! 🏆, Target! 🎯, Flee! 🏃💨, Ripped! 💪, Extracting! ⚡
  - Keyboard shortcuts: Keys 1-5 for instant emotes
  - Emotes appear as chat bubbles above snake head for 4 seconds

---

**InfoCard: Bottom-Right: Action Buttons**

- Title (amber-300, bold, 12px):
  `Bottom-Right: Action Buttons`
- Bullet list (disc, slate-400, 11px):
  - **BOOST:** 64px amber circle. Hold to activate
  - **EXTRACT:** 80px green circle. Hold to extract. Shows % during extraction
  - **EXIT:** Small pill button at far-left bottom. Leaves match (forfeits carried chips online)

---

**InfoCard: Overlays & Indicators**

- Title (rose-300, bold, 12px):
  `Overlays & Indicators`
- Bullet list (disc, slate-400, 11px):
  - **Reconnecting:** Amber pill at top-center with Wifi icon
  - **Minimap:** Bottom-left circular radar (toggle M key). Player, food, boundary
  - **Full Map:** Press M for full-screen arena map
  - **Commission indicator:** Rate shown below extraction progress bar

---

### SECTION 10 — TACTICAL CHALLENGES

- **Section icon:** `ListTodo` (emerald, 16×16)
- **Section heading:** `10. TACTICAL CHALLENGES` (emerald-400, bold, 14px)

**Intro paragraph** (slate-300, 12px, margin-bottom 2):
`Tactical Challenges are daily and weekly missions that reward bonus chips for completing specific in-game objectives. View them in the right sidebar of the Lobby Headquarters. Challenges scale with your level — as you grow, missions get harder but pay more.`

---

**InfoCard: Challenge Level Tiers**

- Title (emerald-300, bold, 12px):
  `Challenge Level Tiers`

**4-Column Grid (2 col mobile / 4 col sm):**

| Column | Header | Level Range | Reward Multiplier | Border/Text Color |
|--------|--------|-------------|-------------------|-------------------|
| 1 | **NOVICE** | Level 1–5 | ×1.0 reward | emerald |
| 2 | **OPERATIVE** | Level 6–15 | ×1.5 reward | cyan |
| 3 | **VETERAN** | Level 16–30 | ×2.5 reward | amber |
| 4 | **ELITE** | Level 31+ | ×4.0 reward | red |

> Each cell is `p-2 rounded-lg text-center` with tier-specific background/border colors. Header text is 10px bold uppercase. Level range in slate-500. Reward in slate-400.

---

**2-Column Grid — Challenge Types:**

**Card 1 — Daily Challenges (3 per day)**

- Border: `bg-emerald-950/20 border-emerald-500/30 p-3 rounded-xl`
- Heading (emerald-300, bold, 12px, with `Zap` icon):
  `Daily Challenges (3 per day)`
- Bullet list (disc, slate-400, 11px):
  - **3 new challenges** every day (UTC midnight reset)
  - Always **3 different categories** (no duplicates in same day)
  - **Anti-repeat:** yesterday's challenges are excluded
  - Objectives include: kills, extractions, star collection, score (body length), arena entries, survival time, and extraction streaks
  - Rewards scale with your level tier (×1.0 to ×4.0)

---

**Card 2 — Weekly Challenges (2 per week)**

- Border: `bg-violet-950/20 border-violet-500/30 p-3 rounded-xl`
- Heading (violet-300, bold, 12px, with `Star` icon):
  `Weekly Challenges (2 per week)`
- Bullet list (disc, slate-400, 11px):
  - **2 new challenges** every Monday (UTC weekly reset)
  - Always **2 different categories**
  - **Anti-repeat:** last week's challenges are excluded
  - Higher difficulty with bigger scaled rewards
  - Must claim before the week ends!

---

**InfoCard: Streak Bonus System**

- Title (amber-300, bold, 12px):
  `Streak Bonus System`
- Body paragraph (slate-400, 11px, margin-bottom 1):
  `Complete and claim ALL daily challenges for consecutive days to build a streak:`
- Bullet list (disc, slate-400, 11px):
  - **3-day streak** → ×1.5 reward bonus on all challenge claims
  - **7-day streak** → ×2.0 reward bonus
  - **14-day streak** → ×3.0 reward bonus
  - Missing a day resets your streak to 0
  - Your current streak and multiplier are shown in the challenges panel header

---

### SECTION 11 — DEATH & REPLAY

- **Section icon:** `Skull` (rose, 16×16)
- **Section heading:** `11. DEATH & REPLAY` (rose-400, bold, 14px)

#### Stacked InfoCards (vertical layout):

---

**InfoCard: When You Die**

- Title (rose-300, bold, 12px):
  `When You Die`
- Bullet list (disc, slate-400, 11px):
  - Body transforms to food orbs **spread along your body path**
  - Food values sum to exactly your total score
  - 10 golden star chips appear at your death position if you had carried chips
  - Anyone can collect your dropped food/stars
  - Killed by real player → View Profile / Add Friend / Add Rival buttons

---

**InfoCard: Death Replay (15s Before + 15s After)**

- Title (cyan-300, bold, 12px):
  `Death Replay (15s Before + 15s After)`
- Bullet list (disc, slate-400, 11px):
  - 15s before death (circular buffer)
  - 15s after death (shows food being collected)
  - Camera stays on death food, then follows first collector
  - Controls: Play/Pause, Speed, Zoom, Restart
  - Progress bar with death marker

---

### SECTION 12 — LOBBY LEADERBOARDS

- **Section icon:** `Crown` (amber, 16×16)
- **Section heading:** `12. LOBBY LEADERBOARDS` (amber-400, bold, 14px)

#### Vertical stack of InfoCards:

---

**InfoCard: What is the Lobby Leaderboard?**

- Title (amber-300, bold, 12px):
  `What is the Lobby Leaderboard?`
- Body paragraph (slate-400, 11px):
  `The lobby houses three levels of official tournament leaderboards, all database-backed and real-time. Your rank reflects your lifetime banked chips across all matches.`

---

**InfoCard: Your Rank Summary Card**

- Title (amber-300, bold, 12px):
  `Your Rank Summary Card`
- Body paragraph (slate-400, 11px):
  `At the top of the leaderboard tab, a prominent card always shows your position at a glance:`
- Bullet list (disc, slate-400, 11px):
  - **Global Rank** — Your position among all players worldwide
  - **National Rank** — Your rank within your country
  - **Country** — Your registered nation (flag + name)
  - **Milestone Tier** — Your current badge (see below)
  - **Banked Chips** — Your total lifetime banked chips

---

**InfoCard: Level 3: World Summit & Global**

- Title (amber-300, bold, 12px):
  `Level 3: World Summit & Global`
- Body paragraph (slate-400, 11px, margin-bottom 1.5):
  `World Summit — Shows the #1 ranked player from each country, sorted by banked chips. Only one champion per nation.`
- Body paragraph (slate-400, 11px):
  `Global Rankings — Top 100 players worldwide sorted by banked chips. Each row shows: Global Rank, Player name + Ledger Tag + Country flag, Milestone Badge, and Banked Chips.`
- Body paragraph (slate-400, 11px, margin-top 1):
  `If you're in the list, the page auto-scrolls to your "YOU" row.`

---

**InfoCard: Level 2: National Boards**

- Title (cyan-300, bold, 12px):
  `Level 2: National Boards`
- Body paragraph (slate-400, 11px):
  `Choose from 197 supported countries via dropdown + search. Shows the top 100 players from that country, sorted by banked chips. Columns: National Rank, Player name + Tag, Level, Banked Chips.`

---

**InfoCard: Milestone Badge System — What Are These Badges?**

- Title (yellow-300, bold, 12px):
  `Milestone Badge System — What Are These Badges?`
- Body paragraph (slate-400, 11px, margin-bottom 1.5):
  `Every player is assigned a Milestone Badge based on their lifetime banked chips. This badge appears beside your name on the Global View leaderboard, in your "Your Rank" summary card, and in the Player Inspector.`
- Bullet list (disc, slate-400, 11px, margin-bottom 2):
  - Badges **automatically upgrade** when your banked chips cross a threshold — no action needed.
  - Badges **can downgrade** if your banked chips fall below a tier's requirement (e.g., by buying into arenas and dying without extracting).
  - Your tier is always calculated from your **current banked chip balance** in real-time.
  - Only **extracted chips** count — carried chips lost in-arena do NOT contribute.

**Table — Milestone Badge Tiers** (full width, 10px font, border-collapse):

| Badge | Tier Name | Min. Banked Chips | Description |
|-------|-----------|-------------------|-------------|
| 🛡️ Rookie | Challenger | 0 — 99,999 | Starting tier for all new players. Just getting started! |
| 🥉 Bronze | Bronze Elite | 100K+ (1 Lakh) | First milestone. Proven arena survival skills. |
| 🥈 Silver | Silver Commander | 500K+ (5 Lakhs) | Consistent extractor with strategic awareness. |
| 🥇 Gold | Gold Apex Vanguard | 1M+ (10 Lakhs) | Elite player — top-tier extraction machine. |
| 💎 Platinum | Platinum Sovereign | 2.5M+ (25 Lakhs) | Arena dominator — feared by rivals. |
| 🔮 Diamond | Diamond Warlord | 5M+ (50 Lakhs) | Legendary status — a true warlord of the arena. |
| 👑 Omega | Omega Legend | 10M+ (1 Crore) | The pinnacle. Ultimate venom arena champion. |

> **Badge colors:** 🛡️ Rookie — slate (#64748b), 🥉 Bronze — brown (#b45309), 🥈 Silver — light gray (#cbd5e1), 🥇 Gold — amber (#f59e0b), 💎 Platinum — cyan (#22d3ee), 🔮 Diamond — teal (#06b6d4), 👑 Omega — yellow (#fbbf24). Min. Banked Chips column text is slate-400. Description column text is slate-400. Rows separated by `border-b border-slate-900` except last row.

---

**InfoCard: Level 1: Milestone Tier Ranks**

- Title (yellow-300, bold, 12px):
  `Level 1: Milestone Tier Ranks`
- Body paragraph (slate-400, 11px):
  `Filter by milestone tier using the badge buttons:`
- Bullet list (disc, slate-400, 11px):
  - ⭐ **All Tiers** — Every ranked player
  - 🛡️ **Rookie / Challenger** — Players below 100K banked chips
  - 🥉 **Bronze Elite** — 100K+ banked chips
  - 🥈 **Silver Commander** — 5 Lakh (500K+) banked chips
  - 🥇 **Gold Apex Vanguard** — 10 Lakh (1M+) banked chips
  - 💎 **Platinum Sovereign** — 25 Lakh (2.5M+) banked chips
  - 🔮 **Diamond Warlord** — 50 Lakh (5M+) banked chips
  - 👑 **Omega Legend** — 1 Crore (10M+) banked chips

---

**InfoCard: Empty Boards & Demo Rows**

- Title (slate-300, bold, 12px):
  `Empty Boards & Demo Rows`
- Body paragraph (slate-400, 11px):
  `If no players have reached a particular tier or country board yet, you'll see an encouraging message and a demo row (clearly labeled) showing how the leaderboard will look once players qualify.`

---

**InfoCard: Player Inspector**

- Title (indigo-300, bold, 12px):
  `Player Inspector`
- Body paragraph (slate-400, 11px):
  `Click any player row to open their profile inspector. Currently shows demo data for clan, career stats, match history, and loadout. Real data will populate as the game economy develops. Ranks shown are always real from the leaderboard.`

---

**InfoCard: Auto-Refresh**

- Title (emerald-300, bold, 12px):
  `Auto-Refresh`
- Body paragraph (slate-400, 11px):
  `Leaderboards auto-refresh every 30 minutes. Click the Refresh button to fetch the latest data immediately. "Last sync" timestamp shows when data was last fetched.`

---

### SECTION 13 — FAQ

- **Section icon:** `AlertTriangle` (purple, 16×16)
- **Section heading:** `13. FAQ` (purple-400, bold, 14px)

**Layout:** Vertical stack of FAQ items (flex column, gap 2.5).

Each FAQ item is a `p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80` card with:
- Question heading: 12px bold white, with green mono `Q.` prefix (emerald-400, margin-right 1.5)
- Answer paragraph: 11.5px slate-400, leading-relaxed, left padding 5

---

#### FAQ 1

**Q.** Do I lose my banked vault chips if I crash?

**A.** No! Your banked vault chips are 100% safe. You only lose the buy-in chips carried in that specific match.

---

#### FAQ 2

**Q.** What is the graduated commission?

**A.** If ≤3 real players are in the arena, extraction is FREE (0%). If ≥4 real players, 35% commission applies (you keep 65%).

---

#### FAQ 3

**Q.** Why did my extraction restart from 0%?

**A.** Any steering (changing direction) while extracting resets the 3-second progress to 0%. Forward gliding is natural and allowed — just don't turn!

---

#### FAQ 4

**Q.** What is the green ring near extracting players?

**A.** When YOU are extracting, a white-to-green progress ring appears near your snake head. It's private — only you can see your own extraction ring.

---

#### FAQ 5

**Q.** Can I Play Again if I don't have enough chips?

**A.** No. Play Again checks your banked vault balance before letting you rejoin. If you don't have enough chips for the buy-in, you'll see an error and need to earn more chips first.

---

#### FAQ 6

**Q.** Can I extract at any time?

**A.** Yes! No minimum chip threshold and no zone restriction. Extract from anywhere on the map.

---

#### FAQ 7

**Q.** What happens to bots at score 100?

**A.** (Online only) They enter self-destruct: slowly navigate toward the wall without boosting, collecting food on the way. Wall death = vanish cleanly.

---

#### FAQ 8

**Q.** Is this gambling?

**A.** No. Chips are free in-game soft currency with no real-world value. The buy-in is a gameplay risk mechanic, not a wager.

---

#### FAQ 9

**Q.** How does anti-cheat work?

**A.** Server is authoritative. All chip creation, food eating, collisions, extraction computed server-side. Client only sends steering input.

---

#### FAQ 10

**Q.** Do challenge missions carry over?

**A.** No. Daily missions reset every day at UTC midnight. Weekly missions reset every Monday at UTC midnight. Complete and claim before the period ends!

---

#### FAQ 11

**Q.** Can I claim a mission reward twice?

**A.** No. Each mission can only be claimed once per period. The server prevents double-claiming — even if you refresh or use a different browser.

---

#### FAQ 12

**Q.** Do I earn XP when I die?

**A.** No. XP is only earned on successful extraction. Dying forfeits your carried chips and awards 0 XP. Extract safely to earn XP!

---

#### FAQ 13

**Q.** How does the Watch Video reward work?

**A.** After a match ends, click the Watch Video button on the results screen. A 5-second ad plays, then you claim +50 free chips. One ad reward per 60 seconds cooldown.

---

#### FAQ 14

**Q.** What are the milestone badges (Rookie, Bronze, Silver, Gold, Platinum, Diamond, Omega)?

**A.** Milestone badges represent your lifetime achievement level. They are automatically assigned based on your total banked chips: Rookie (0-99K), Bronze (100K+), Silver (500K+), Gold (1M+), Platinum (2.5M+), Diamond (5M+), Omega (10M+). Your badge upgrades instantly when you cross a threshold, and can downgrade if your banked chips drop below the requirement.

---

#### FAQ 15

**Q.** Can I lose my milestone badge?

**A.** Yes. Your badge is calculated from your current banked chip balance in real-time. If you buy into an arena with a high buy-in and die (losing those chips), your banked balance may drop below your tier threshold, causing a downgrade. Only extracted chips count!

---

#### FAQ 16

**Q.** How do I reset my password if I forgot it?

**A.** Go to the Login page → click "Forgot Password?" → enter your registered email + 4-digit Security PIN → set a new password. This works instantly — no email verification needed. Important: you must have set a Security PIN during registration or in Profile → Security Settings. Without a PIN, password recovery is not available.

---

#### FAQ 17

**Q.** How do I change or set my Security PIN?

**A.** Go to Profile → Dossier tab → Security Settings card. If you already have a PIN, enter your current PIN first, then set a new one. If you don't have a PIN yet, you can set one without entering a current PIN. Your PIN is required for password recovery — don't forget it!

---

#### FAQ 18

**Q.** How does social login (Google, Facebook, Apple) work?

**A.** Click the provider button on the login page. You'll be redirected to sign in with your social account. After authorization, a Venom Arena account is automatically created (or linked if your social email matches an existing account). You get 150 starter chips and a VENOM-XXXX tag just like regular registration. No separate password needed.

---

#### FAQ 19

**Q.** Can I link a password to my social login account?

**A.** Yes! Go to Profile → Dossier tab → Security Settings. You can change your Security PIN there. If you need a full password (for email login), contact support. Your social login always works regardless.

---

## FOOTER

- Container: `text-center p-2 pt-2 border-t border-slate-800/60`
- Text: `Play responsibly · Chips have no real-world value · Stores-safe edition`
- Font: 10px, mono, slate-500, uppercase, tracking-widest

---

## Footer Action Bar (fixed at bottom, not scrollable)

- Container: `p-4 border-t border-slate-800/80 bg-slate-900/50 flex justify-end`
- **Button:** `Understood & Ready to Play`
  - Style: `px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-lg shadow-emerald-600/30`
  - Action: Calls `onClose()` to dismiss the modal

---

## Helper Sub-Components

### Section Component

- Container: `p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2`
- Heading: `h3` with flex, items-center, gap-2, bold, 14px, accent color class
- Content wrapper: slate-300, 12px, leading-relaxed, space-y-2

### InfoCard Component

- Container: `bg-slate-950/60 p-3 rounded-lg border border-slate-800/80`
- Title: bold, accent color class, block, 12px, margin-bottom 1
- Content: slate-400, 11px, leading-relaxed

### FaqItem Component

- Container: `p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80`
- Question: `h4`, 12px, bold, white. Green mono `Q.` prefix (emerald-400, margin-right 1.5)
- Answer: 11.5px, slate-400, margin-top 1.5, leading-relaxed, left-padding 5

---

## Imports & Dependencies

- **UI Components:** Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle (from `@/components/ui/dialog`)
- **Lucide Icons (20):** BookOpen, Compass, Coins, Skull, Shield, Trophy, Sparkles, Users, Zap, AlertTriangle, Target, Map, Bot, Star, Crosshair, Gamepad, Landmark, LogIn, ListTodo, Crown, Globe, Medal
  - **Used in render (20):** BookOpen (header), Landmark (§0), Gamepad (§1, §9), Users (§2), Target (§2), Coins (§3), Star (§3, §10), Zap (§4, §10), Crosshair (§5), Bot (§6), Map (§7), Trophy (§8), Skull (§11), Crown (§12), ListTodo (§10), AlertTriangle (§13), Globe (§0), LogIn (§0), Shield (§0)
  - **Unused imports (3):** Compass, Sparkles, Medal
- **Game Config:** ARENA_TIERS, PRACTICE_TIERS, MILESTONE_TIERS (from `@/lib/game-config`)
  - ARENA_TIERS: Used in arena tier table (30 rows)
  - PRACTICE_TIERS: Used in practice tier table (3 rows)
  - MILESTONE_TIERS: Imported but **not used** in render (milestone table is hardcoded inline)

---

## Section Count Summary

| # | Section Title | Sub-cards |
|---|-------------|-----------|
| 0 | Accounts & Getting Started | Register, Social Login, Guest Play, Chip Economy, Password Recovery, Security PIN |
| 1 | Controls | Mouse/Touch, Keyboard |
| 2 | Online Multiplayer vs. Offline Practice | Online Arena, Offline Practice, Arena Leaderboard comparison |
| — | Arena Tiers (unnumbered) | 30-tier table + 3-tier Practice table |
| 3 | Food Orbs & Star Chips | Food Orbs, Death Food Orbs, Star Chips |
| 4 | Boost Mechanic | How Boost Works, Strategy Tips |
| 5 | Collision Rules | Head-to-Body, Head-on, Map Boundary |
| 6 | Bot AI Behavior | Harvesting Mode, Self-Destruct |
| 7 | Map & Safe Spawning | Online Map, Offline Map, Safe Spawning |
| 8 | Extraction | How to Extract, Commission, Extraction UI Elements |
| 9 | In-Game HUD Explained | Status Cards, Network & Leaderboard, Quick Chat Emotes, Action Buttons, Overlays & Indicators |
| 10 | Tactical Challenges | Level Tiers, Daily Challenges, Weekly Challenges, Streak Bonus |
| 11 | Death & Replay | When You Die, Death Replay |
| 12 | Lobby Leaderboards | What is the Lobby Leaderboard?, Rank Summary Card, World Summit & Global, National Boards, Milestone Badges (7-row table), Milestone Tier Ranks, Empty Boards, Player Inspector, Auto-Refresh |
| 13 | FAQ | 19 FAQ items |

**Total: 14 numbered sections (0–13) + 1 unnumbered arena tiers reference + 1 practice tiers reference + 1 hero banner + footer + action bar.**
