# SNAKESTAR — COMPLETE GAME DESIGN DOCUMENT (GDD)
# Source: Exhaustive inventory of every UI element from old Venom Arena project
# Date: 2026 | Every string/number/button/label below is EXACT as seen in old code — nothing invented

---

# ═══════════════════════════════════════════════════════════════════════
# PART 1: APP SHELL & NAVIGATION (page.tsx)
# ═══════════════════════════════════════════════════════════════════════

## 1.1 LOADING STATE
- Spinner icon (Loader2, indigo-400, animate-spin)
- Text: `Loading arena…`
- Background: `bg-slate-950`

## 1.2 AUTH GATE (when !player)
- Renders `<AuthGate />` component (see Part 13)

## 1.3 HEADER (sticky top-0 z-40, backdrop-blur-md)
### Logo Area (left, clickable → goes to dashboard)
- 40×40px rounded-xl icon box: gradient `from-indigo-500 to-purple-600`, Compass icon (white, animate spin-slow)
- Title: `Project Venom` (text-lg font-extrabold uppercase tracking-tight text-white)
- Badge: `Arena` (text-xs px-2 py-0.5 bg-indigo-500 text-white font-bold rounded-full tracking-widest font-mono)
- Subtitle: `STORES-SAFE COMPLIANT VERSION` (text-[10px] text-slate-500 font-mono)

### Player Badge (right area)
- 32×32px avatar box: bg-slate-950, shows avatar image OR level number
- Label: `Challenger (Lvl {player.level})` (text-[9px] text-slate-500 uppercase font-semibold)
- Name: `{player.name}` (text-xs font-bold text-white)

### Chips Wallet
- Coins icon (emerald-400, animate-pulse)
- Label: `Secure Chips` (text-[9px] text-emerald-500/60 uppercase font-semibold)
- Value: `{player.bankedChips.toLocaleString()}` (text-sm font-bold font-mono text-emerald-400 tabular-nums)

### Rules Button
- BookOpen icon (indigo-400)
- Text: `Rules & Guide` (text-xs font-bold hidden sm:inline)
- Title attr: `Official Guide, Rules & FAQ`
- Style: bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30

### Sign Out Button
- LogOut icon
- Text: `Sign Out` (text-xs font-bold hidden md:inline)
- Title attr: `Secure Logout`
- Toast on click: `Secure session disconnected. 🔒`

## 1.4 FOOTER (sticky bottom, mt-auto)
- Left: `© 2026 Project Venom Arena. All Rights Reserved. Fully store-safe, non-gambling gameplay edition.`
- Right (font-mono text-[10px] text-slate-400): `APP_VERSION: 1.0.0-MVP` | `ENGINE: TSX_CANVAS`

---

# ═══════════════════════════════════════════════════════════════════════
# PART 2: DASHBOARD (default tab)
# ═══════════════════════════════════════════════════════════════════════

## 2.1 HERO BANNER
- Gradient: `from-slate-900 to-indigo-950/80`
- Label: `Lobby Headquarters` (text-[10px] text-indigo-400 font-mono font-bold tracking-widest uppercase)
- Heading: `WELCOME BACK, {PLAYER.NAME.UPPERCASE()}` (text-xl font-black text-white tracking-tight)
- XP bar: `LVL {level}` | progress bar (indigo-500 fill) | `{xpIntoLevel} / {xpSpan} XP`
- Button: `▶ LAUNCH MATCHMAKER` (bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs, Play icon)
  → Clicks: sets activeTab to 'arena'

## 2.2 SECTION LABEL
- Text: `Lobby Stations` (text-[10px] font-bold text-slate-500 uppercase tracking-widest)

## 2.3 12 BENTO GATES (grid 2 cols, each 176px tall)

### Gate 1: Play
- Icon: Compass, accent: indigo
- Badge: `Battle Gate`
- Title: `Play Endless Arenas`
- Desc: `Risk chips to compete in simulated multiplayer shards. Harvest dropping stars and escape safely.`
- FootLeft: `STAKES FROM: 10 chips`
- FootRight: `Enter →`

### Gate 2: Shop
- Icon: ShoppingBag, accent: purple
- Badge: `Customize Lab`
- Title: `Identity Workshop & Shop`
- Desc: `Unlock glowing skins, trials, death burst novas, or design a custom repeating body segment sequence.`
- FootLeft: `EQUIPPED: {player.currentSkin ? 'Custom DNA' : 'Gallery Skin'}`
- FootRight: `Modify →`

### Gate 3: Profile
- Icon: User, accent: blue
- Badge: `My Record`
- Title: `Challenger Dossier`
- Desc: `Examine your records, high scores, total banked wealth, and change your operative callsign.`
- FootLeft: `HIGH SCORE: {(player.biggestExtract || 0).toLocaleString()}`
- FootRight: `Inspect →`

### Gate 4: Leaderboard
- Icon: Trophy, accent: amber
- Badge: `Elite Standings`
- Title: `Global Standings`
- Desc: `Track rank placements and compare your banked chip balance against other elite venom snake operators.`
- FootLeft: `LEADERBOARD RANK: Tier 1`
- FootRight: `View →`

### Gate 5: Daily Rewards
- Icon: Gift, accent: emerald
- Badge: `Complimentary`
- Title: `Daily Free Claims`
- Desc: `Secure your complimentary login chips. Claim hourly or daily packages to rebuild your wallet!`
- FootLeft: `STREAK: {player.dailyStreak || 1} Days`
- FootRight: `Claim →`

### Gate 6: Chip Store
- Icon: Coins, accent: cyan
- Badge: `Secure Vault`
- Title: `Virtual Chip Store`
- Desc: `Acquire secure safe-guarded chip packs immediately to compete in high-stakes premium arena tables.`
- FootLeft: `WALLET: {player.bankedChips.toLocaleString()} c`
- FootRight: `Shop →`

### Gate 7: Championships
- Icon: Crown, accent: rose
- Badge: `Tournament`
- Title: `Championships`
- Desc: `Enter elite championship events. Compete against top-ranked operators for massive chip prizes and exclusive titles.`
- FootLeft: `SEASONAL EVENTS`
- FootRight: `Compete →`

### Gate 8: Hall of Fame
- Icon: Award, accent: yellow
- Badge: `Legends`
- Title: `Hall of Fame`
- Desc: `View legendary players and record-breaking performances. The greatest venom operators of all time.`
- FootLeft: `LEGENDARY RANKINGS`
- FootRight: `View Legends →`

### Gate 9: Syndicates
- Icon: Shield, accent: violet
- Badge: `Team Ops`
- Title: `Syndicates`
- Desc: `Create or join a syndicate. Team up with allies, pool resources, and dominate arenas together.`
- FootLeft: `CLAN WARFARE`
- FootRight: `Assemble →`

### Gate 10: Season Pass
- Icon: Sparkles, accent: pink
- Badge: `Season XP`
- Title: `Season Pass`
- Desc: `Track your seasonal progression. Unlock exclusive rewards, cosmetics, and bonus chip multipliers as you level up.`
- FootLeft: `FREE TIER REWARDS`
- FootRight: `Progress →`

### Gate 11: Highlights
- Icon: Film, accent: red
- Badge: `Replays`
- Title: `Highlights`
- Desc: `Watch and share your greatest moments. Review match replays, clutch extractions, and legendary eliminations.`
- FootLeft: `MATCH HIGHLIGHTS`
- FootRight: `Watch →`

### Gate 12: Social (WIDE - spans 2 cols)
- Icon: Users, accent: violet
- Badge: `Friends & Global Search`
- Title: `Friends, Global Search & Syndicate Hub`
- Desc: `Search and connect with players globally by tag or country flag (🇮🇳, 🇺🇸, 🇯🇵, etc.), send daily chip gifts (+25c), spectate matches, and create co-op team codes!`
- FootLeft: `GLOBAL PLAYER NETWORK READY`
- FootRight: `Search & Connect →`

## 2.4 RIGHT COLUMN: TACTICAL CHALLENGES
- Section header: `Tactical Challenges` (text-xs font-bold text-white uppercase tracking-wider, ListTodo icon indigo-400 animate-pulse)
- Challenge tier badge (conditional, dynamic): shows tier name in colored badge (elite=red, veteran=amber, operative=cyan, else=emerald)
- Streak badge: `🔥 {streak}d streak ×{multiplier}` (text-[9px] font-mono text-amber-400 font-bold)
- Loading: Loader2 spinner + `Loading challenges…`
- Empty: `No challenges available right now.`

### Daily Challenges Section
- Header: ☀️ Sunrise icon + `Daily Challenges ({count})` (text-[10px] font-bold text-amber-400 uppercase tracking-widest)
- Sub: `Resets daily at UTC midnight` (text-[9px] font-mono text-slate-600)
- Per challenge card:
  - Title (text-xs font-bold text-white)
  - Description (text-[10.5px] text-slate-400)
  - `PROGRESS:` label + `{current} / {target} ({percent}%)`
  - Progress bar (amber→orange gradient when in progress, emerald→teal when complete, emerald-600 when claimed)
  - `+{reward} CHIPS` (text-[10px] font-mono font-bold text-emerald-400)
  - Button: `Claim` (emerald gradient) / `Claimed ✓` (slate, disabled)

### Weekly Challenges Section
- Header: ⭐ Star icon + `Weekly Challenges ({count})` (text-[10px] font-bold text-violet-400 uppercase tracking-widest)
- Sub: `Resets every Monday UTC`
- Same card layout as daily but border-t divider, violet-500/20 border, violet→purple progress bar

### Last Match Summary (conditional)
- MicroLabel: `Last Match`
- Icon: 🏆 (extract) or 💀 (death)
- Line 1: `Extracted · {arenaName}` or `Eliminated · {arenaName}` (font-bold text-white)
- Line 2: `{chips}c · {kills} kills · +{xp} XP · {seconds}s` (text-slate-500)

## 2.5 SUB-PAGE NAV (when activeTab !== 'dashboard')
- Back button: `← Lobby HQ` (ChevronLeft icon, text-xs font-bold, bg-slate-950 border border-slate-800)
- Breadcrumb: `STATION / {TAB_ID.UPPERCASE()}` (text-[10px] text-slate-500 font-mono)
- Horizontal tab strip (scrollable, rounded-xl, bg-slate-950):
  - `Play` (Compass, indigo-400/indigo-600/10)
  - `Shop & Lab` (ShoppingBag, purple-400/purple-600/10)
  - `Dossier` (User, blue-400/blue-600/10)
  - `Leaderboard` (Trophy, amber-400/amber-500/10)
  - `Championships` (Crown, amber-400/amber-500/10)
  - `Hall of Fame` (Award, yellow-400/yellow-500/10)
  - `Syndicates` (Shield, indigo-400/indigo-600/10)
  - `Pass` (Sparkles, purple-400/purple-600/10)
  - `Highlights` (Film, red-400/red-600/10)
  - `Claims` (Gift, emerald-400/emerald-600/10)
  - `Vault` (Coins, emerald-400/emerald-600/10)
  - `Friends & Search` (Users, violet-400/violet-600/10)
  - `Admin` (Shield, red-400/red-600/10, adminOnly=true)

---

# ═══════════════════════════════════════════════════════════════════════
# PART 3: AUTH GATE (Login/Register/Guest)
# ═══════════════════════════════════════════════════════════════════════

## 3.1 AUTH SCREEN
- Title: `VENOM ARENA` (large, centered)
- Tagline: `Hunt. Harvest. Extract. Don't get caught.`
- Card title: `Enter the arena`
- Card desc: `Sign in or create an account to play.`

## 3.2 TABS
- `Login` | `Register`

## 3.3 SOCIAL LOGIN
- Divider: `or continue with`
- Buttons: `Google` | `Facebook` | `Apple`
- Divider 2: `or`
- Button: `Play as Guest`
- Guest info: `Guests get 150 starter chips. Register to keep your progress.`
- Link: `View Rules & Guide`

## 3.4 LOGIN FORM
- Email label: `Email` | placeholder: `you@arena.gg`
- Password label: `Password` | placeholder: `••••••••`
- Checkbox: `Remember me (30 days)`
- Submit: `Login`
- Link: `Don't have an account? Register`
- Link: `Forgot Password?`

## 3.5 REGISTER FORM
- Display name label: `Display name (up to 20 chars)` | placeholder: `ViperStrike`
- Email label: `Email` | placeholder: `you@arena.gg`
- Password label: `Password (min 6 chars)` | placeholder: `••••••••`
- Strength meter: `Strength:` + labels `Weak`/`Fair`/`Good`/`Strong` (red/orange/yellow/emerald bar)
- Confirm label: `Confirm Password` | placeholder: `••••••••`
- PIN label: `Security PIN (4 digits, optional)` | placeholder: `e.g. 1234`
- PIN help: `Required for password recovery. Keep it safe!`
- Submit: `Create Account`
- Error: `Passwords do not match.`
- Link: `Already have an account? Login`

## 3.6 FORGOT PASSWORD
- Title: `Reset Password`
- Desc: `Enter your email and 4-digit Security PIN to set a new password.`
- Email label: `Email` | placeholder: `you@arena.gg`
- PIN label: `4-Digit Security PIN` | placeholder: `1234`
- PIN help: `This is the PIN you set during registration.`
- New password label: `New Password (min 6 chars)` | placeholder: `••••••••`
- Confirm label: `Confirm New Password` | placeholder: `••••••••`
- Submit: `Reset Password`
- Success title: `Password Reset!`
- Success body: `Your password has been changed. You can now log in with your new password.`
- Success button: `Back to Login`

---

# ═══════════════════════════════════════════════════════════════════════
# PART 4: ARENA SELECTOR PANEL
# ═══════════════════════════════════════════════════════════════════════

## 4.1 HEADER
- Title (online): `Online PvP Shards` | (offline): `Practice Arenas`
- Sub (online): `30 tiers · 10c → 1B chips` | (offline): `Choose your difficulty`

## 4.2 MODE TOGGLE
- `Online` (Users icon, indigo active) | `Offline` (Swords icon, amber active)

## 4.3 DIFFICULTY FILTERS (online only)
- Filter icon
- Buttons: `All ({30})` | `Beginner (6)` | `Medium (6)` | `High Stakes (6)` | `Extreme (6)` | `Legendary (6)`
- Colors: slate-400 (all), emerald-400 (beginner), amber-400 (medium), rose-400 (high), red-400 (extreme), yellow-400 (legendary)

## 4.4 HIGHEST AFFORDABLE LINK
- `⚡ Jump to highest affordable: {tier.name} ({chipFull(buyIn)})`

## 4.5 TIER LIST ITEMS
- Each shows: colored dot, tier name, difficulty badge, description
- Right side (online): `Online` label + green pulse dot + `{players} / {maxPlayers.toLocaleString()}`
- Right side: `Buy-In` label + value (emerald if affordable, red if not) + short form
- ChevronRight arrow

## 4.6 DETAIL CARD (sticky right column)
- Difficulty badge: `{difficulty} Match`
- Tier name + `TIER {index} / 30` badge
- Description text
- Detail rows:
  - `Stake Buy-In` → `{chipFull(buyIn)}` (white)
  - `Extraction` → `EXIT ANYTIME` (emerald-400)
  - `Bot Population` → `{botsCount.toLocaleString()} Bots` (cyan-400)
  - `XP Multiplier` → `x{rewardMultiplier} Multi` (indigo-400)
  - (online) `Live Online Players` → `{players} / {maxPlayers}` (indigo-400)
- Warning box (online): `ONLINE MULTIPLAYER: High-stakes arena for up to 1,000 players. Collect star chips from defeated opponents and extract safely. Graduated commission: 0% if ≤3 players, 35% if ≥4 players.`
- Warning box (offline): `OFFLINE PRACTICE MODE: Risk-free training ground. Test your skills against {botsCount.toLocaleString()} bots without wagering, losing, or earning any of your banked chips!`
- Enter button (online, can afford): `BUY IN ARENA (-{chipFull(buyIn)})`
- Enter button (online, can't afford): `STAKE AMOUNT EXCEEDS BANK`
- Enter button (offline): `START PRACTICE MODE (FREE)`

---

# ═══════════════════════════════════════════════════════════════════════
# PART 5: ALL 30 ARENA TIERS (EXACT VALUES)
# ═══════════════════════════════════════════════════════════════════════

| # | ID | Name | Buy-In | Bots | XP Multi | Difficulty | Color |
|---|---|---|---|---|---|---|---|
| 1 | tier-1 | Scrap Alley | 10c | 30 | x1.0 | Beginner | emerald |
| 2 | tier-2 | Rust Market | 20c | 30 | x1.1 | Beginner | emerald |
| 3 | tier-3 | Copper Lane | 40c | 30 | x1.2 | Beginner | emerald |
| 4 | tier-4 | Neon Grid | 75c | 30 | x1.5 | Beginner | cyan |
| 5 | tier-5 | Iron District | 150c | 30 | x1.8 | Beginner | cyan |
| 6 | tier-6 | Bronze Arena | 300c | 30 | x2.0 | Beginner | teal |
| 7 | tier-7 | Silver Strip | 500c | 30 | x2.5 | Medium | amber |
| 8 | tier-8 | Jade Corridor | 1,000c | 30 | x3.0 | Medium | amber |
| 9 | tier-9 | Amber Crossing | 2,000c | 30 | x3.5 | Medium | amber |
| 10 | tier-10 | Gold Quarter | 4,000c | 30 | x4.5 | Medium | orange |
| 11 | tier-11 | Ruby Den | 7,500c | 30 | x5.5 | Medium | orange |
| 12 | tier-12 | Sapphire Hall | 15,000c | 30 | x7.0 | Medium | rose |
| 13 | tier-13 | Viper Pit | 30,000c | 30 | x8.0 | High Stakes | rose |
| 14 | tier-14 | Championship Hub | 50,000c | 30 | x10.0 | High Stakes | pink |
| 15 | tier-15 | Emerald Court | 100,000c | 30 | x12.0 | High Stakes | pink |
| 16 | tier-16 | Diamond Nexus | 200,000c | 30 | x15.0 | High Stakes | violet |
| 17 | tier-17 | Apex Vault | 350,000c | 30 | x18.0 | High Stakes | violet |
| 18 | tier-18 | Obsidian Core | 750,000c | 30 | x22.0 | High Stakes | purple |
| 19 | tier-19 | Crimson Abyss | 1,500,000c | 30 | x28.0 | Extreme | purple |
| 20 | tier-20 | Shadow Realm | 3,000,000c | 30 | x32.0 | Extreme | red |
| 21 | tier-21 | Void Station | 5,000,000c | 30 | x38.0 | Extreme | red |
| 22 | tier-22 | Phantom Reach | 10,000,000c | 30 | x45.0 | Extreme | red |
| 23 | tier-23 | Inferno Gate | 20,000,000c | 30 | x52.0 | Extreme | rose |
| 24 | tier-24 | Tartarus Pit | 40,000,000c | 30 | x60.0 | Extreme | rose |
| 25 | tier-25 | Venom Grand | 75,000,000c | 30 | x70.0 | Legendary | amber |
| 26 | tier-26 | Omega Station | 150,000,000c | 30 | x80.0 | Legendary | orange |
| 27 | tier-27 | Singularity Core | 300,000,000c | 30 | x90.0 | Legendary | red |
| 28 | tier-28 | Eternity Vault | 500,000,000c | 30 | x100.0 | Legendary | rose |
| 29 | tier-29 | Abyssal Throne | 750,000,000c | 30 | x120.0 | Legendary | yellow |
| 30 | tier-30 | The Singularity | 1,000,000,000c | 30 | x150.0 | Legendary | yellow |

## 3 PRACTICE TIERS
| ID | Name | Buy-In | Bots | XP Multi | Difficulty |
|---|---|---|---|---|---|
| practice-easy | Easy Practice Arena | FREE | 1000 | x0.0 | Beginner |
| practice-medium | Medium Practice Arena | FREE | 1000 | x0.0 | Medium |
| practice-hard | Hard Practice Arena | FREE | 1000 | x0.0 | High Stakes |

---

# ═══════════════════════════════════════════════════════════════════════
# PART 6: IN-GAME HUD (game-canvas.tsx)
# ═══════════════════════════════════════════════════════════════════════

## 6.1 CONNECTING OVERLAY
- Text: `Authenticating…` / `Connecting…`
- Error: `Not authenticated. Please sign in again.`
- Reconnecting: `Reconnecting (attempt {N})…`
- Button: `Back to lobby`

## 6.2 RECONNECTING BANNER (in-game top center)
- Text: `Reconnecting…` (amber pill)

## 6.3 TOP-LEFT STATUS CARDS
- `Carried Chips` → value + `c` (green card, online only)
- `Stars Earned` → value (amber card, online only)
- `Stars in Arena` → count (online only)
- `Rank:` → number (trophy icon)
- `Score:` → number (shield icon)
- `Kills:` → number (skull icon)
- `Boost:` → `SPACE` (zap icon)
- `Offline Mode: 1 Player` (amber) OR `Real Players: {N} Active` (indigo pulse)
- `Bots:` → count

## 6.4 TOP-RIGHT
- `BANKED` → value + `c` (amber card)
- `{fps} fps` | `{ping}ms` | `—` (unknown)
- `🎨 LQ` badge (low quality mode, title: `Low quality mode (adaptive)`)

## 6.5 CHAT + MINIMAP ROW
- Chat button (aria: `Open chat`)
- Minimap toggle: `Collapse` / `Show Minimap` (aria: `Collapse minimap` / `Show minimap`)

## 6.6 ARENA LEADERBOARD (collapsible)
- Header: `Arena Leaders`
- Collapse aria: `Collapse leaderboard`
- Empty (online): `No real players yet.`
- Columns: rank, name, carried chips (green, e.g. `100c`)
- Self badge: `YOU`
- Show button: `Show Leaderboard` (aria: `Show leaderboard`)

## 6.7 FULL-MAP OVERLAY (M key)
- Canvas renders: `ARENA OVERVIEW — ALL SNAKES`, `Press M to close`, legend: `You`/`Real Players`/`Bots`
- Close aria: `Close full map`

## 6.8 QUICK CHAT EMOTES BAR
- Label: `Emotes (Keys 1-5)`
- Buttons: `GG! 🏆` | `Target! 🎯` | `Flee! 🏃💨` | `Ripped! 💪` | `Extracting! ⚡`
- Keyboard messages (1-5): `GG! 🏆` | `Target Spot! 🎯` | `Fleeing! 🏃💨` | `Get Ripped! 💪` | `Extracting soon! ⚡`

## 6.9 KILL FEED (max 8, auto-expire)
- Wall death: `{victimName} hit the wall`
- Kill: `{killerName} eliminated {victimName}`

## 6.10 EXTRACTION POPUP (top center)
- Idle: `Hold E or press the button below to cash out safely!` + `E` kbd badge
- Extracting: `EXTRACTING CHIPS ({X}%)`
- Commission: `FEE: {X}%` OR `FEE: 0% (LOW POPULATION)`
- Offline idle: `HOLD TO LEAVE PRACTICE ARENA`
- Online idle: `HOLD TO EXTRACT SUCCESSFUL!`

## 6.11 MOBILE CONTROLS (bottom right)
- BOOST button (64px, amber): `BOOST` (aria: `Boost`)
- EXTRACT button (80px, green): `EXTRACT` → `{X}%` when active (aria: `Extract chips`)

## 6.12 LEAVE BUTTON (bottom left)
- `Leave` (aria: `Leave arena`)

## 6.13 CHAT DIALOG
- Title: `Send a message`
- Placeholder: `Type a message…`
- Buttons: `Send` | `Cancel`

---

# ═══════════════════════════════════════════════════════════════════════
# PART 7: DEATH & EXTRACTION END SCREENS
# ═══════════════════════════════════════════════════════════════════════

## 7.1 DEATH SCREEN
- Aria: `You died`
- Title: `Arena Disintegration!`
- Subtitle (offline): `Offline Training — No chips lost.`
- Subtitle (online): `Your snake head collided with a rival. All unbanked carried chips were lost in-match.`
- `Stakes Buy-In Cost:` → `-{X} chips`
- `Match Carried Value Forfeited:` → `-{X} c`
- `Opponents Eliminated:` → `{X} Kills`
- `Collided With / Eliminated By` → killer name/tag
- Killer type: `Online Rival Player` or `Arena AI Combatant`
- Buttons: `View Profile` | `Add Rival` | `Add Friend` (real player killer only)
- `📺 Watch Death Replay`
- `Hide Replay`
- `PLAY AGAIN` | `📺 Watch Video (Get +50 Chips)` | `RETURN TO LOBBY`
- `Press ESC to exit`
- Pending: `Final tally pending from server…`

## 7.2 EXTRACTION SCREEN
- Aria: `Extraction successful`
- Titles: `Practice Run Completed!` / `Extraction Completed!` / `Secure Extraction!`
- Stats: `Kills` | `Max Length` | `Survival Time`
- `Carried Value:` → `{X} chips`
- `System Commission ({X}%)` → `-{X} chips` OR `System Commission (0% — Low Density)` → `-{X} chips`
- `BANKED TO ACCOUNT:` → `+{X} c`
- `Total Banked:` → value
- `Level:` → `{X}` + `↑ Level Up!` badge
- Offline section: `Offline Training Complete` / `No buy-in or banking fees. Great job sharpening your skills and maneuvers!`
- Buttons: `PLAY AGAIN` | `📺 Watch Video (Get +50 Chips)` | `RETURN TO LOBBY` / `SECURE CHIPS & RETURN TO LOBBY`

## 7.3 DEATH REPLAY
- Watermark: `⏺ REPLAY`
- Post-death: `⛔ DEATH +{X}s | Frame {X}/{X}`
- Pre-death: `Frame {X}/{X} | -{X}s to death`
- Death marker: `💀 Death`
- Controls: Play/Pause, speed `{X}x`, zoom `{X}%`, restart, zoom in/out

---

# ═══════════════════════════════════════════════════════════════════════
# PART 8: GAME RULES MODAL (13 SECTIONS + 20 FAQ)
# ═══════════════════════════════════════════════════════════════════════

Title: `VENOM ARENA — OFFICIAL GUIDE & RULES`
Subtitle: `Accounts, controls, modes, arena tiers, HUD, extraction, challenges, death, replay, leaderboards & FAQ`
Hero: `Hunt. Harvest. Extract. Don't get caught.`

Sections:
0. Accounts & Getting Started (Register, Social, Guest, Chip Economy, Password Recovery, Security PIN)
1. Controls (Mouse/Touch, Keyboard)
2. Online vs Offline (Online Arena, Offline Practice, Arena Leaderboard comparison table)
3. Arena Tiers (30 tiers table + 3 practice tiers table)
4. Food Orbs & Star Chips (3 sizes, death food, star chips, examples)
5. Boost Mechanic (speed 4.5→8.0, 3x/sec tail drop, >8 segments needed)
6. Collision Rules (Head-to-Body, Head-on 3 rules, Map Boundary)
7. Bot AI (Harvesting, Self-Destruct, Restrictions)
8. Map & Safe Spawning (Online circular, Offline infinite, 500px safe, 4s protection)
9. Extraction (Hold E 3s, steering cancels, 0%/35% commission)
10. In-Game HUD Explained (all 17 HUD elements documented)
11. Tactical Challenges (4 tiers: Novice/Operative/Veteran/Elite, daily 3, weekly 2, streak bonus)
12. Death & Replay (15s pre + 15s post, camera behavior, controls)
13. Lobby Leaderboards (Summit/Global/National/Tiers, 7 milestone badges, Your Rank card)
FAQ: 20 questions (chips lost on crash, commission, extraction restart, green ring, Play Again, extract anytime, bot score 100, gambling, anti-cheat, challenge carryover, double claim, XP on death, video reward, milestone badges, lose badge, reset password, change PIN, social login, link password)

Footer: `Play responsibly · Chips have no real-world value · Stores-safe edition`
Close button: `Understood & Ready to Play`

---

# ═══════════════════════════════════════════════════════════════════════
# PART 9: COSMETICS SHOP PANEL
# ═══════════════════════════════════════════════════════════════════════

## 9.1 HEADER
- Title: `Identity Workshop & Skin Gallery`
- Desc: `Browse and equip real-time wiggling skins, luminous laser trails, or customize your own custom repeating venom snake DNA blueprint!`

## 9.2 VIEW MODE TABS
- `🎨 Skin & Effect Gallery` | `🧬 Genetic Pattern Lab`

## 9.3 CATEGORY FILTERS
- `🌈 All Items` | `🐍 Ready Presets (Free!)` | `✨ Premium Shop` | `💫 Laser Trails` | `💥 Death Novas` | `🇺🇸 Flags` | `🏆 Profile Banners`

## 9.4 18 PALETTE COLORS
Red Alert #ef4444, Solar Orange #f97316, Midas Gold #f59e0b, Lime Venom #84cc16, Acid Green #22c55e, Emerald #10b981, Teal Void #0d9488, Cyber Cyan #06b6d4, Sky Blue #0ea5e9, Sapphire #3b82f6, Royal Indigo #6366f1, Shadow Purple #a855f7, Orchid Pink #ec4899, Crimson #dc2626, Pure White #ffffff, Slate Gray #64748b, Deep Carbon #1e293b, Pitch Black #090d16

## 9.5 20 FREE SLITHER PRESETS
Each has: id, name, colors[], shape, taper, glow, emoji, category, description
Names: The Fish Snake🐟, The Lion Snake🦁, The Motorbike Snake🏍️, The Coin Snake🪙, Bumblebee stripe🐝, Patriot Streamer🇺🇸, Watermelon Slicer🍉, Tiger Shifter🐯, Mint Candy🍬, Rainbow Unicorn🦄, Germany Banner🇩🇪, Brazil Samba🇧🇷, France Tricolore🇫🇷, Pride Rainbow🏳️‍🌈, Solar Flare🔥, Cosmic Nebula🌌, Lava Dreadnought🌋, Tron Grid💻, Gundam Mech🤖, Golden Dragon🐉

## 9.6 6 BODY STYLES
Smooth Circles, Dragon Scales, Armored Plates, Crystal Shards, Spiky Obsidian, Basilisk Diamonds

## 9.7 4 TAPER STYLES
Natural Taper, Uniform Width, Sinuous Wave, Heavy Head

## 9.8 GENETIC PATTERN LAB (4 Steps)
- Label: `GENETIC PROFILE STATS`
- Step 1: `Construct Stripe Sequence` — `Click any palette color below to append it to the tail sequence.`
  - Buttons: `Double Sequence Length` | `Mirror Symmetrically` | `🎲 Mutate DNA` | `Reset`
- Step 2: `Choose Segment Geometry`
- Step 3: `Body Taper Physics` — `Configure snake tail scaling density styles.`
- Step 4: `Bioluminescent Aura` — `Toggle active radioactive body node shading glow in battle arenas.`
  - Toggle: `Neon Glow` / `Emit high-vis plasma light`
- Deploy: `DEPLOY TO BATTLE-ARENA` / `DNA DEPLOYED & EQUIPPED (ACTIVE)`
- Preview overlay: `LAB HOLO-PREVIEW (STEER TO TEST)`

## 9.9 27 PREMIUM COSMETICS
### 13 Skins: Toxic Slime🐍(0c), Venom Stryker👾(40c), Cyber Grid🤖(100c), The Fish Snake🐟(200c), Chameleon Aurora🌈(350c), The Lion Snake🦁(350c), Cyber Glow Pulsar⚡(500c), The Motorbike Snake🏍️(500c), Ironclad Titanium⚙️(750c), The Coin Snake🪙(750c), Bio-Desert Camo🛡️(900c), Midas Touch👑(1200c), Crimson Fury🔥(1800c)
### 3 Trails: Basic Sparks✨(0c), Plasma Arc⚡(80c), Stardust Drift☄️(300c)
### 2 Deaths: Toxic Splash💥(0c), Hypernova Burst🌌(180c)
### 6 Flags: Syndicate Skull🏴‍☠️(50c), Rainbow Pride🏳️‍🌈(80c), Star Spangled🇺🇸(100c), Union Jack🇬🇧(100c), Tricolor Saffron🇮🇳(100c), VIP Gold🚩(300c)
### 3 Banners: Synthwave Sunset🌅(150c), Obsidian Matrix🌌(200c), Grand Champion🏆(500c)

---

# ═══════════════════════════════════════════════════════════════════════
# PART 10: PLAYER PROFILE PANEL (4 tabs)
# ═══════════════════════════════════════════════════════════════════════

## 10.1 TABS
- `Records & Statistics` | `Match History Ledger` | `Friends & Spectate ({N})` | `Identity Anti-Tamper Logs`

## 10.2 STATS TAB — 8 Stat Cards
1. `Banked Wallet` / `Deposited Chips`
2. `Tournament Kills` / `Total Terminations`
3. `K/D Ratio` / `Kill / Death Index`
4. `Extraction Rate` / `Successful Handshakes`
5. `Survival Streak` / `Consecutive Extractions`
6. `Record Extraction` / `Max Retained in One Run`
7. `Lifetime Retained` / `Cumulative Chip Profit`
8. `Total Forfeited` / `Forfeited in Crash Events`

## 10.3 TOURNAMENT GUARDRAILS
- H3: `Annual Tournament Guardrails & Limit Allowances`
- Badge: `1-YEAR UTC TOURNAMENT CYCLE ACTIVE`
- `Matches Allowed`: `Completed: 18` | `Remaining: 9,982 matches`
- `Annual Buy Cap (25L)`: `Bought: 0 c` | `Cap Remaining: 25,00,000 c`
- `Rewarded Ads Today`: `Watched: 0` | `Resets at 00:00 UTC`
- `CHALLENGER STANDING RATING` + description about global index

## 10.4 HISTORY TAB
- H3: `Match Run Records Ledger` / `Showing last 25 operations`
- Empty: `No matches found in the active ledger standing.` / `Jump into any arena to log your first run data!`
- Table headers: `Arena Sector` | `Status` | `Chips Outcome` | `Kills` | `Tail Score` | `Time Elapsed` | `Timestamp`
- Status badges: `ONLINE`/`PRACTICE` | `EXTRACTED`/`COLLIDED`

## 10.5 FRIENDS TAB
- H3: `Friends & Live Spectate Portal`
- Desc: `Add allies to build your roster. Send daily gifts, invite them to high-stakes co-op matches, or spectate their live runs in real-time when they are in-match!`
- Input: `Enter challenger alias...` + `Sync Ally` button
- Statuses: `Online` | `Idle` | `In Match` | `Offline`
- Actions: `Spectate` | `Invite` | `Gift`/`Gifted` | `Dismantle Alliance`

## 10.6 IDENTITY LOGS TAB
- Title: `CHALLENGER REGISTRY LEDGER`
- Desc: `To maintain the integrity of global tournaments, all modifications to nickname tags or regional affiliations are permanently logged to this client audit ledger.`
- Labels: `TAG REGISTERED:` / `REGION ALIGNMENT:` / `HANDSHAKE TIMESTAMP`
- Empty: `No handshakes registered yet.`

## 10.7 IDENTITY EDITOR
- H3: `Handshake Registration Protocol`
- Desc: `Lock down your tournament handle and regional alignment. All changes are logged.`
- Fields: `Challenger Handle` (max 15), `Faction Region (Flag)`, `Profile Avatar / Identity Emblem`
- Presets: Venomous Viper, Syndicate Skull, Pixel Invader, Cyber Sentinel, Midas King, Storm Surge, Crimson Fury, Cosmic Nebula
- Upload: `CHANGE IMAGE` / `Drag & Drop or Click` / `PNG, JPG, WebP up to 1.5MB`
- Social: `📸 Instagram Handle` | `🎥 YouTube Channel / Handle` | `📱 Twitch Stream Handle`
- Warning: `CYBER HANDSHAKE WARNING:` + text about global index updates
- Buttons: `Cancel` | `Save Handshake`

## 10.8 SECURITY SETTINGS
- Section: `Security Settings`
- PIN status: `🔐 PIN Set` or `⚠️ No PIN`
- Password: `Change` button / `Current password` + `New password (min 6)` / `Update Password` / `Cancel`
- PIN: `Set PIN`/`Change PIN` / `Current PIN` + `New PIN (4 digits)` / `Update PIN` / `Set PIN` / `Cancel`

## 10.9 GUEST UPGRADE BANNER
- Collapsed: `You're playing as a Guest` + desc + `Upgrade Now`
- Expanded: `Upgrade to Registered Account` + info + form (Display Name, Email, Password, PIN)
- Button: `Upgrade & Secure Account`

## 10.10 CO-OP INVITE MODAL
- H3: `Co-Op Lobby Invite` / `Assemble a squad with your allies`
- Balance: `Your Balance` | `{friend.name}`
- Arena selector: `Select Arena Stakes` / `Buy-In: {buyIn} c`
- Eligibility: `You can't afford` / `They can't afford` / `Eligible 🤝`
- Buttons: `🤝 Accept Proposal & Invite` | `Cancel` | `Send Co-Op Invite`

---

# ═══════════════════════════════════════════════════════════════════════
# PART 11: LEADERBOARDS PANEL
# ═══════════════════════════════════════════════════════════

## 11.1 HEADER
- Badge: `CURRENT YEAR (2026) CONCURRENT TOURNAMENT`
- Badge: `Live Ranks Update Every 30 Minutes`
- Title: `Official World Tournament Leaderboards`
- Desc: `Complete real-time standings for World Summit, Global, National, and Milestone Tiers. Click any player row to inspect full profile & rank status!`
- `Last sync:` {time} UTC
- Button: `Refresh`

## 11.2 TABS
- `Summit` | `Global` | `National` | `Tiers`

## 11.3 YOUR RANK CARD
- `Global Rank` → value/N/A
- `National Rank` → value/N/A
- `Milestone Badge` → badge
- `Banked Chips` → value
- `Level` → value

## 11.4 SUMMIT TAB
- Info: `WORLD CUP SUMMIT MECHANIC:` + desc about #1 per country
- Columns: `Global Rank` | `Country #1 Champion` | `Nation` | `Banked Chips`

## 11.5 GLOBAL TAB
- `{N} Total Global Competitors: Players`
- Columns: `Global Rank` | `Player & User Tag` | `Milestone Badge` | `Banked Chips`
- Loading: `Loading global ranks…`

## 11.6 NATIONAL TAB
- `Select Country ({N} Countries):` + search
- Columns: `National Rank` | `Local Challenger` | `Level` | `Banked Chips`

## 11.7 TIERS TAB
- Info: `MILESTONE TIER RANKING BOARD:` + desc
- Filter buttons: `⭐ All Tiers` | `🛡️ Rookie` | `🥉 Bronze` | `🥈 Silver` | `🥇 Gold` | `💎 Platinum` | `🔮 Diamond` | `👑 Omega`
- Columns: `Tier Rank` | `Player Name & User Tag` | `Country` | `Banked Chips`

## 11.8 7 MILESTONE BADGES
| Badge | Name | Min Chips |
|---|---|---|
| 🛡️ Rookie | Challenger | 0 |
| 🥉 Bronze | Bronze Elite | 100,000 |
| 🥈 Silver | Silver Commander | 500,000 |
| 🥇 Gold | Gold Apex Vanguard | 1,000,000 |
| 💎 Platinum | Platinum Sovereign | 2,500,000 |
| 🔮 Diamond | Diamond Warlord | 5,000,000 |
| 👑 Omega | Omega Legend | 10,000,000 |

---

# ═══════════════════════════════════════════════════════════════════════
# PART 12: REMAINING PANELS (summarized key text)
# ═══════════════════════════════════════════════════════════════════════

## 12.1 DAILY REWARDS
- Title: `Daily Log Rewards` / `Build your claim streak to secure massive payouts for arena entries!`
- `Current Streak` / `{N} Days`
- 7-day grid: `Day 1` through `Day 7` with chip values [10, 20, 50, 100, 250, 500, 1000]c
- `Today` badge on current day
- `Next Daily Claim available in:` + countdown OR `Day {N} reward is available! Claim now to boost your chips balance.`
- Buttons: `Standard Claim` | `Already Claimed Today` | `Watch Ad (Double Claim)` | `Buffering Sponsor...`

## 12.2 CHIP STORE
- Title: `Integrated Store Matrix (Base Rate: 100 Chips = ₹1)`
- Desc: `Rebuild your bank cushion with fair-play packages bounded by strict annual buy limits (25 Lakh Chips max / year).`
- `Your Wallet` | `Yearly Buy Cap`
- 10 packs (100c–2,500,000c, ₹10–₹15,000)
- Store lock: `ANTI-MONOPOLY STORE LOCK ACTIVE (365 DAYS)`
- Promo: `Promotional Codes` / `Redeem a promo code... Try VENOM (+500c) or CHAMPION (+1000c).`
- Ad rewards: `Daily Reward Ads (12 Max / Day)` / 100c per ad / 1,200c max/day
- Compliance: `STORE POLICY COMPLIANCE ASSURANCE:` + text

## 12.3 SOCIAL PANEL
- Tabs: `Friends & Global Search ({N})` | `Competitive Syndicate [{tag}]`
- Sub-tabs: `My Friends ({N})` | `My Rivals ({N})` | `Search Global Players`
- Input: `Enter Player Tag (e.g. COBRA-4231)...` + `Add Friend`
- `Incoming Requests ({N})` / `Accept` | `Decline`
- `Outgoing Requests ({N})` / `Pending`
- Rivals: `RIVALRY & REVENGE TRACKER` + desc + `{N} Active Rivals`
- Rival actions: `Convert to Friend` | `Remove Rival` | `HUNT / JOIN ARENA`
- Search: `Search players globally by Name or Tag...`

## 12.4 CLAN SYSTEM
- Title: `Viper Clan & Syndicate Guild HQ`
- Tabs: `My Clan` | `Browse Clans` | `Form Syndicate`
- Stats: `YOUR RANK` | `MEMBERS` ({N}/30) | `CLAN LEVEL` (Lvl {N})
- Treasury: `Clan Treasury Bank` / `Amt (e.g. 100)` + `Deposit`
- Perks: `Self-Sponsored Arenas` | `Clan Tag Emblem` | `Syndicate Wars Access`
- Roster: `Member Roster ({N})` / `Max Capacity: 30` / `LEADER` badge
- Chat: `Syndicate Chat Feed` / `Type a message for your clan...` + `Send`
- Browse: `Search clans by name or tag...` / `Join Syndicate`
- Form: `Syndicate Name` | `Clan Tag (3-5 Chars)` | `Syndicate Description` | 6 emblem options (🐍🥷🔥⚡💎👑) | `Form Syndicate`

## 12.5 HALL OF FAME
- Title: `Project Venom Hall of Fame & Esports Shrine`
- Tabs: `Milestone Tiers (1L - 1Cr)` | `Tournament Archives (Ranks 1-100)` | `Live Esports Ticker`
- 6 HoF tiers: 1Lakh, 5Lakh, 10Lakh, 25Lakh, 50Lakh, 1Crore
- Live broadcast marquee with 4 event templates
- Year selector + country dropdown (Global + 9 countries)
- Table: `Rank` | `Challenger` | `User Tag` | `Banked Chips` | `Level` | `Action`
- `NATIONAL CHAMP` badge for rank 1

## 12.6 CHAMPIONSHIPS
- Badge: `OFFICIAL 1-YEAR TOURNAMENT` | `JAN 1 HALL OF FAME PAYOUT`
- Title: `2026 ANNUAL VENOM WORLD CHAMPIONSHIP`
- Countdown: `YEAR-END FINALE & JAN 1 PAYOUT IN:` + Days/Hours/Mins/Secs
- `Payout Date: Midnight UTC, 01 January 2027`
- Match limit: `{games} / 10,000 Played`
- Status: `✅ Registered & Active` OR `Free Entry | Join Anytime`
- Buttons: `JOIN 2026 CHAMPIONSHIP NOW` | `PLAY CHAMPIONSHIP MATCH`
- 4 prize tiers (Rank 1: 5M, 2-10: 2.5M, 11-50: 1M, 51-100: 250K)
- Scope tabs: `GLOBAL WORLD CHAMPIONSHIP` | `REGIONAL MASTERS` | `NATIONAL COUNTRY CIRCUIT`
- Rank filters: `All Ranks` | `👑 Rank 1` | `🥈 Ranks 2–10` | `🥉 Ranks 11–50` | `🛡️ Ranks 51–100`

## 12.7 SEASON PASS
- Badge: `Season 01: Venom Genesis`
- Timer: `Ends in 48 Days`
- Title: `Cyber Pass & Season Progression`
- Pass status: `👑 ELITE PASS ACTIVE` / `FREE PASS`
- Unlock: `Unlock Elite Pass (1,00,000 c)` / `✓ 3x rewards & exclusive skins unlocked`
- XP bar: `Season Level {N}` / `{current} / {next} XP`
- Track: 20 tiers, FREE + ELITE columns
- Free rewards: Badge, Tail FX, Avatar Border, Kill Sound, Title, Spray, Emote, DNA Skin, Profile Icon (×20)
- Elite rewards: DNA Skin, Tail FX, Kill Sound, Emote, Badge, Avatar Border, Title (×20)

## 12.8 CLIP SHOWCASE
- Title: `Esports Clip Showcase & Highlights`
- Desc: `Watch community clutch extractions, vote on top plays of the week, and share your own YouTube & Twitch clips!`
- Button: `Share Game Clip`
- Upload modal: `Clip Title` | `Platform` (YouTube/Twitch) | `Extracted Chips (c)` | `Video URL`
- Buttons: `Cancel` | `Publish Clip`

## 12.9 ADMIN PANEL
- Access denied: `Access Denied` + desc about admin role
- Gate: `Central Operations Gate` + `Operations Code` + `Authorize Terminal`
- Diagnostics: `System Diagnostics` / `Connected Sockets` / `Active Rooms`
- Broadcast: `Global Intercom Broadcast` / placeholder / `Send`
- Roster: `Live Operations Roster` / search / `Search by name or userTag...`
- Actions: `Toggle Mute Player` | `Kick Connection` | `Ban UserTag Permanently`
- Economy: `Economy Ledger Overrides` / `Player Tag` / `Amount (+/-)` / `Adjust Chips Balance`
- Disclaimer: `All actions are logged. Banked chips clamp at 0 (no negatives).`

## 12.10 PLAYER INSPECTOR MODAL
- 4 tabs: `Overview` | `Career Stats` | `Extraction Logs` | `Loadout`
- Banner: `Current Year (2026) Official Standings` / `Auto-updates every 30 mins`
- Identity: `Ledger Tag: {tag}` / `{chips} c Bank`
- Ranks: `Global Rank #{N}` / `Country Rank #{N}` / `Region Rank #{N}`
- Clan: `Syndicate Clan Membership` / `Active Member` / `Member`
- Allies: `REGIONAL ALLIES ({country} NETWORK)` / `GLOBAL ALLIES & INTERNATIONAL ALLIANCES`
- Social: `Creator Social Channels` / `Verified Handles` / Instagram/YouTube/Twitch
- Badges: `Earned Badges & Honors`
- Stats: `Global World Rank` / `Country Rank` / `Regional Arena Rank` / `Total Banked Chips` / `Highest Extraction` / `Extraction Success Rate` / `Snake Eliminations` / `Total Extractions` / `Best Streak`
- Actions: `Add Friend` / `Challenge` / `Block Player`

---

# ═══════════════════════════════════════════════════════════════════════
# PART 13: CORE PHYSICS & ENGINE VALUES
# ═══════════════════════════════════════════════════════════════════════

## 13.1 SNAKE PHYSICS
- BASE_SPEED = 4.5 px/tick
- BOOST_SPEED = 8.0 px/tick
- EXTRACT_GLIDE_SPEED = 3.2 px/tick
- TURN_BASE = 0.35 rad/tick
- TURN_MIN = 0.08 rad/tick
- TURN_SCORE_FACTOR = 0.0003
- SIZE_BASE = 8 px
- SIZE_SCORE_FACTOR = 0.4
- COLLISION_HIT_FACTOR = 0.75
- HEAD_ON_HIT_FACTOR = 0.8
- INITIAL_BODY_LENGTH = 20
- INITIAL_SPAWN_SCORE = 20
- MAX_BODY_LENGTH = 200
- SEGMENT_SPACING = 6 px
- BOOST_MIN_LENGTH = 8
- BOOST_DROP_INTERVAL = 10 frames (~2s at 20Hz)

## 13.2 FOOD SYSTEM
- Small: value=1, radius=3, weight=0.93, color=#34d399, glow=#10b981
- Medium: value=3, radius=5, weight=0.04, color=#38bdf8, glow=#0ea5e9
- Large: value=5, radius=8, weight=0.03, color=#f472b6, glow=#ec4899
- FOOD_COUNT_TARGET = 1200
- STAR_DROP_COUNT = 10

## 13.3 MAP
- MAP_MIN_RADIUS = 3000
- MAP_MAX_RADIUS = 16000
- MAP_BREATH_AMPLITUDE = 40
- MAP_BREATH_CYCLE_MS = 10000
- MAX_ARENA_PLAYERS = 1000

## 13.4 SPAWN
- SAFE_SPAWN_MIN_DIST = 500
- RESPAWN_INVULN_MS = 4000
- SAFE_SPAWN_ATTEMPTS = 30

## 13.5 BOT
- BOT_SELF_DESTRUCT_THRESHOLD = 100
- BOT_EVADE_RADIUS = 300
- BOT_FOOD_SCAN_RADIUS = 300
- NECK_PROTECTION_SEGS = 5

## 13.6 EXTRACTION
- EXTRACT_DURATION_MS = 3000
- EXTRACT_COMMISSION = 0.35 (when ≥4 real players)
- COMMISSION_THRESHOLD = 4

## 13.7 SERVER
- TICK_RATE_HZ = 30
- BROADCAST_RATE_HZ = 20
- MAX_SNAPSHOTS_PER_SECOND = 20

## 13.8 ECONOMY
- STARTER_CHIPS = 150
- DAILY_REWARDS = [10, 20, 50, 100, 250, 500, 1000]
- MAX_YEARLY_BUY_CHIPS = 2,500,000
- MAX_DAILY_ADS = 12
- AD_REWARD_CHIPS = 100
- ELITE_PASS_COST = 100,000
- DAILY_GIFT_AMOUNT = 25
- VIDEO_REWARD_CHIPS = 50
- XP FORMULA: xpForLevel(N) = N * 200

## 13.8 AUDIO (8 procedural sounds via Web Audio API)
- Food collect: 660/880/1100/1320Hz sine, 0.06-0.15s
- Kill: noise 0.15s + 220Hz sawtooth 0.2s
- Death: noise 0.3s + 150Hz sawtooth 0.4s + 100Hz sine 0.3s
- Extract start: 523Hz(C5) + 659Hz(E5) sine 0.1s
- Extract success: C5→E5→G5→C6 arpeggio 0.15-0.3s
- Extract restart: 440Hz→330Hz descending 0.12-0.15s
- Boost: noise 0.08s + 200Hz sine 0.1s detuned -200
- Wall hit: noise 0.2s + 80Hz sine 0.3s

---

# ═══════════════════════════════════════════════════════════════════════
# PART 14: DATABASE SCHEMA (Prisma/SQLite)
# ═══════════════════════════════════════════════════════════════════════

10 Models: Player, Clan, ClanMessage, DailyClaim, Purchase, Gift, Friendship, Challenge, ChallengeProgress, GameConfig

Player: id, email, passwordHash, securityPin, userTag(unique), name, country, avatar, oauthProvider, bankedChips(150), totalEarned(150), totalLost(0), level(1), xp(0), lifetimeKills(0), lifetimeDeaths(0), lifetimeExtracts(0), bestStreak(0), biggestExtract(0), dailyStreak(0), lastDailyClaim, unlockedSkins([]), currentSkin(skin-default), currentTrail(trail-none), currentDeath(death-default), currentFlag, currentBanner, role(player|admin), banned(false), clanTag→Clan, clanRank, timestamps
Clan: tag(id), name, emblem(🐍), description, level(1), bankedChips(0), members[], messages[]
ClanMessage: id, clanTag→Clan, senderTag, senderName, rank, message, createdAt
DailyClaim: id, playerId→Player, day, reward, streak, [playerId,day] unique
Purchase: id, playerId→Player, itemId, itemType(skin|chip_pack), amountChips, createdAt
Gift: id, fromId→Player, toId→Player, amount, createdAt
Friendship: id, initiatorId, recipientId, status(pending|accepted|blocked), [initiatorId,recipientId] unique
Challenge: id, playerId, type(daily|weekly), category(kill|extract|star_collect|score|arena_entry), title, description, target, current(0), reward, completed, claimed, periodStart
ChallengeProgress: id, playerId, category, periodType, periodStart, increment(1), [playerId,category,periodType,periodStart] unique
GameConfig: id, key(unique), value(JSON string), label, category, order, type(number|boolean|string|json)

---

# ═══════════════════════════════════════════════════════════════════════
# PART 15: SCALE TARGET & ARCHITECTURE SUGGESTION
# ═══════════════════════════════════════════════════════════════════════

## SCALE ANALYSIS
- 13 lobby panels + auth gate + in-game HUD (17 elements) + 2 end screens + death replay
- 30 competitive tiers + 3 practice tiers
- 27 cosmetics + 20 presets + genetic lab (18 colors, 6 shapes, 4 tapers)
- 10 chip packs + promo codes + ad rewards
- 8 milestone badges, 4 championship prize tiers
- 20 free + 20 elite season rewards
- Real-time: socket.io game server, 20Hz broadcast, 30Hz physics
- 197 countries, global/national/summit leaderboards
- Clan system (30 members, chat, treasury, 10 emblems)
- Friend system + rival system + gift system
- Challenge system (daily 3 + weekly 2, streak bonuses, 4 tier multipliers)
- Death replay (15s pre + 15s post)
- 8 procedural audio sounds
- Admin panel (broadcast, kick, ban, chip modification, config tuning)

## SUGGESTED ARCHITECTURE FOR V1
This project is a full-stack game platform — not a simple web app. The old codebase tried to fit everything into one Next.js app and it became unmaintainable. For the rebuild:

### Frontend (Next.js 16 + TypeScript)
- Thin page shell (<100 lines)
- 14 panel components (one per station, properly split)
- Game canvas split into: renderer, HUD overlay, input handler, replay player
- Zustand for client state (UI tabs, modal state)
- TanStack Query for server state (leaderboards, profile, challenges)
- shadcn/ui for all panel UI
- Framer Motion for animations

### Backend
- Socket.IO game server (Bun mini-service, port 3001)
  - Fixed timestep physics loop (30Hz)
  - Spatial hash grid for collision
  - 5 bot AI personalities (truly differentiated behavior)
  - Client-side prediction + server reconciliation
  - Entity interpolation for smooth rendering
  - Delta compression for bandwidth
- Next.js API routes (auth, economy, social, admin)
- Prisma ORM + SQLite
- JWT auth with httpOnly cookies

### V1 Ship Priority
1. Auth (login/register/guest)
2. Arena selector + offline game engine
3. Canvas renderer + HUD
4. Online game server + socket connection
5. Extraction + death + end screens
6. All 13 lobby panels (real data, no fakes)
7. Sound, replay, polish
