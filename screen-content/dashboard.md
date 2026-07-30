# Dashboard Screen — Full Visual Walkthrough

> Source: `/src/app/page.tsx` (1053 lines) — `Home` component, `activeTab === 'dashboard'` branch
> This is the default view after login, before clicking any sidebar tab.

---

## Page Shell

- **Root container:** `min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white`
- **Layout:** Sticky header → main content (flex-1) → sticky footer (`mt-auto`)
- **Animation:** Dashboard fades in with `va-fade-in` class

---

## HEADER (sticky top-0, z-40)

- **Container:** `border-b border-slate-900 bg-slate-950/80 sticky top-0 z-40 backdrop-blur-md`
- **Inner:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4`

### Left Side — Logo + Title (clickable button, navigates to dashboard)

- **Icon container:** 40×40px `rounded-xl` with gradient `bg-gradient-to-tr from-indigo-500 to-purple-600`, border `border-indigo-400/20`, shadow `shadow-lg shadow-indigo-950/40`. Contains a `Compass` icon (white, 20×20px, slow spin animation `va-spin-slow`). Hover: `group-hover:scale-105`.
- **Title:** `Project Venom` — `text-lg font-extrabold tracking-tight text-white uppercase`. On hover: `group-hover:text-indigo-400`.
- **Badge pill** (inline, right of title): `Arena` — `text-xs px-2 py-0.5 bg-indigo-500 text-white font-bold rounded-full leading-none tracking-widest font-mono`
- **Subtitle line:** `STORES-SAFE COMPLIANT VERSION` — `text-[10px] text-slate-500 block font-mono`
- **Button aria-label:** `Return to lobby dashboard`

### Right Side — Account Controls

A flex row (`flex items-center gap-3`, wraps on mobile, right-justified):

---

#### Player Badge

- **Container:** `bg-slate-900/60 border border-slate-800/80 px-4 py-2 rounded-xl flex items-center gap-2.5`
- **Avatar box:** 32×32px `rounded-lg bg-slate-950 border border-slate-800/80`, `overflow-hidden shrink-0 shadow-inner`.
  - If `player.avatar` is a URL (data: or http:): renders an `<img>` with `object-cover`, `no-referrer`.
  - If `player.avatar` is a string (emoji): renders the character at `text-base`.
  - If no avatar: renders the player's **level number** in `text-[10px] font-mono font-bold text-slate-400`.
- **Text block:**
  - Top line (label): `Challenger (Lvl {level})` — `text-[9px] text-slate-500 uppercase font-semibold`
  - Bottom line (name): `{player.name}` — `text-xs font-bold text-white truncate max-w-28`

---

#### Chips Wallet

- **Container:** `bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl flex items-center gap-2.5`
- **Icon:** `Coins` (emerald-400, 16×16px, `animate-pulse`)
- **Text block:**
  - Top line (label): `Secure Chips` — `text-[9px] text-emerald-500/60 uppercase font-semibold`
  - Bottom line (value): `{player.bankedChips.toLocaleString()}` — `text-sm font-bold font-mono text-emerald-400 tabular-nums`

---

#### Rules & Guide Button

- **Container:** `bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 p-2 py-2.5 rounded-xl transition duration-200 cursor-pointer flex items-center gap-1.5 shadow`
- **Icon:** `BookOpen` (indigo-400, 16×16px)
- **Label:** `Rules & Guide` — `text-xs font-bold hidden sm:inline` (hidden on mobile)
- **Title attribute:** `Official Guide, Rules & FAQ`
- **Action:** Opens the `GameRulesModal`

---

#### Sign Out Button

- **Container:** `bg-slate-900/60 hover:bg-red-950/40 hover:text-red-400 hover:border-red-500/20 border border-slate-800/80 p-2 py-2.5 rounded-xl transition duration-200 cursor-pointer flex items-center gap-1.5`
- **Icon:** `LogOut` (slate, 16×16px; turns red on hover)
- **Label:** `Sign Out` — `text-xs font-bold hidden md:inline` (hidden on small/medium screens)
- **Title attribute:** `Secure Logout`
- **Action:** Calls `logout()`, resets tab to `dashboard`, shows toast: `Secure session disconnected. 🔒`

---

## MAIN CONTENT AREA

- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full flex flex-col justify-start`
- **Layout:** 12-column CSS grid: `grid grid-cols-1 lg:grid-cols-12 gap-6 items-start`
  - **Left column:** `lg:col-span-8` — Hero banner + Bento gate grid
  - **Right column:** `lg:col-span-4` — Tactical Challenges sidebar

---

## LEFT COLUMN (8/12 width on desktop)

---

### Hero Banner

- **Container:** `p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/80 border border-indigo-500/10 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6`
- **Decorative blob:** Absolute-positioned 64×64 (w-64 h-64) `bg-indigo-500/10 rounded-full blur-3xl` in top-right corner, `pointer-events-none`.

#### Left Side — Welcome Block

- **Icon container:** 56×56px `rounded-2xl` with gradient `bg-gradient-to-tr from-indigo-500 to-purple-600`, border `border-indigo-400/20`, shadow `shadow-lg shadow-indigo-950/40`. Contains an `Award` icon (white, 28×28px, `animate-pulse`).
- **Label:** `Lobby Headquarters` — `text-[10px] text-indigo-400 font-mono font-bold tracking-widest block uppercase`
- **Heading:** `WELCOME BACK, {PLAYER_NAME}` — `text-xl font-black text-white tracking-tight mt-0.5`. The player name is dynamically uppercased.

#### XP Progress Bar

- **Container:** `flex items-center gap-3 mt-2`
- **Left label:** `LVL {level}` — `text-[10px] font-mono text-slate-400`
- **Track:** `w-36 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800`
  - **Fill bar:** `h-full bg-indigo-500 rounded-full transition-all duration-500` — width set to `{xpPercent}%`
- **Right label:** `{xpIntoLevel} / {xpSpan} XP` — `text-[9px] font-mono text-slate-500`. These values are computed from the `xpForLevel()` curve:
  - `xpThisLevel` = XP required for current level
  - `xpNextLevel` = XP required for next level
  - `xpIntoLevel` = `player.xp - xpThisLevel` (clamped ≥0)
  - `xpSpan` = `xpNextLevel - xpThisLevel` (clamped ≥1)
  - `xpPercent` = `floor((xpIntoLevel / xpSpan) * 100)` (clamped ≤100)

#### Right Side — LAUNCH MATCHMAKER Button

- **Container:** `px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition duration-200 cursor-pointer shadow-lg shadow-indigo-950/40 border border-indigo-500 shrink-0 self-stretch sm:self-auto justify-center`
- **Icon:** `Play` (white, 14×14px, `fill-current`)
- **Label:** `LAUNCH MATCHMAKER`
- **Action:** Sets `activeTab` to `'arena'` (navigates to arena selector sub-page)

---

### Bento Gate Grid

#### Section Label

- **Text:** `Lobby Stations` — `text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1`

#### Grid Layout

- **Container:** `grid grid-cols-1 sm:grid-cols-2 gap-4`
- Each gate is a `BentoGate` component rendered as a `<button>`.
- One gate (Gate 12) has the `wide` prop, making it `sm:col-span-2`.

#### BentoGate Component Structure

Each gate card is a `<button>` with:
- **Container:** `p-5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 {accent.borderHover} rounded-2xl cursor-pointer transition-all duration-300 group shadow-md flex flex-col justify-between h-44 text-left` (or `sm:col-span-2` if wide)
- **Top row** (flex, items-start, justify-between):
  - **Icon box:** 40×40px `rounded-xl {accent.iconBg} border flex items-center justify-center group-hover:scale-110 transition-transform`. Contains the gate's icon at 20×20px.
  - **Badge pill:** `text-[9px] px-2 py-0.5 {accent.badgeBg} border font-bold rounded-full uppercase` — shows the gate's category label.
- **Middle** (title + description):
  - **Title:** `text-sm font-bold text-white {accent.textHover} transition-colors`
  - **Description:** `text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed` (max 2 lines)
- **Footer** (top-border separator, flex justify-between):
  - **Left foot text:** `text-[10px] font-mono text-slate-500 truncate pr-2`
  - **Right foot text + arrow:** `text-[10px] font-mono {accent.arrow} group-hover:translate-x-1 transition-transform shrink-0` — always ends with ` →`

#### Accent Color Classes Reference

| Accent | iconBg | badgeBg | borderHover | textHover | arrow |
|--------|--------|---------|-------------|-----------|-------|
| indigo | `bg-indigo-500/10 border-indigo-500/20 text-indigo-400` | `bg-indigo-500/15 border-indigo-500/20 text-indigo-400` | `hover:border-indigo-500/40` | `group-hover:text-indigo-400` | `text-indigo-400` |
| purple | `bg-purple-500/10 border-purple-500/20 text-purple-400` | `bg-purple-500/15 border-purple-500/20 text-purple-400` | `hover:border-purple-500/40` | `group-hover:text-purple-400` | `text-purple-400` |
| blue | `bg-blue-500/10 border-blue-500/20 text-blue-400` | `bg-blue-500/15 border-blue-500/20 text-blue-400` | `hover:border-blue-500/40` | `group-hover:text-blue-400` | `text-blue-400` |
| amber | `bg-amber-500/10 border-amber-500/20 text-amber-400` | `bg-amber-500/15 border-amber-500/20 text-amber-400` | `hover:border-amber-500/40` | `group-hover:text-amber-400` | `text-amber-400` |
| yellow | `bg-yellow-500/10 border-yellow-500/20 text-yellow-400` | `bg-yellow-500/15 border-yellow-500/20 text-yellow-400` | `hover:border-yellow-500/40` | `group-hover:text-yellow-400` | `text-yellow-400` |
| emerald | `bg-emerald-500/10 border-emerald-500/20 text-emerald-400` | `bg-emerald-500/15 border-emerald-500/20 text-emerald-400` | `hover:border-emerald-500/40` | `group-hover:text-emerald-400` | `text-emerald-400` |
| violet | `bg-violet-500/10 border-violet-500/20 text-violet-400` | `bg-violet-500/15 border-violet-500/20 text-violet-400` | `hover:border-violet-500/40` | `group-hover:text-violet-400` | `text-violet-400` |
| red | `bg-red-500/10 border-red-500/20 text-red-400` | `bg-red-500/15 border-red-500/20 text-red-400` | `hover:border-red-500/40` | `group-hover:text-red-400` | `text-red-400` |
| cyan | `bg-cyan-500/10 border-cyan-500/20 text-cyan-400` | `bg-cyan-500/15 border-cyan-500/20 text-cyan-400` | `hover:border-cyan-500/40` | `group-hover:text-cyan-400` | `text-cyan-400` |
| rose | `bg-rose-500/10 border-rose-500/20 text-rose-400` | `bg-rose-500/15 border-rose-500/20 text-rose-400` | `hover:border-rose-500/40` | `group-hover:text-rose-400` | `text-rose-400` |
| pink | `bg-pink-500/10 border-pink-500/20 text-pink-400` | `bg-pink-500/15 border-pink-500/20 text-pink-400` | `hover:border-pink-500/40` | `group-hover:text-pink-400` | `text-pink-400` |

#### All 12 Bento Gate Cards

| Gate # | Icon | Accent | Badge | Title | Description | Foot Left | Foot Right | Wide? | Tab Target |
|--------|------|--------|-------|-------|-------------|-----------|------------|-------|------------|
| 1 | `Compass` | indigo | `Battle Gate` | `Play Endless Arenas` | `Risk chips to compete in simulated multiplayer shards. Harvest dropping stars and escape safely.` | `STAKES FROM: 10 chips` | `Enter →` | No | arena |
| 2 | `ShoppingBag` | purple | `Customize Lab` | `Identity Workshop & Shop` | `Unlock glowing skins, trials, death burst novas, or design a custom repeating body segment sequence.` | `EQUIPPED: {dynamic}` | `Modify →` | No | shop |
| 3 | `User` | blue | `My Record` | `Challenger Dossier` | `Examine your records, high scores, total banked wealth, and change your operative callsign.` | `HIGH SCORE: {biggestExtract}` | `Inspect →` | No | profile |
| 4 | `Trophy` | amber | `Elite Standings` | `Global Standings` | `Track rank placements and compare your banked chip balance against other elite venom snake operators.` | `LEADERBOARD RANK: Tier 1` | `View →` | No | leaderboard |
| 5 | `Gift` | emerald | `Complimentary` | `Daily Free Claims` | `Secure your complimentary login chips. Claim hourly or daily packages to rebuild your wallet!` | `STREAK: {dailyStreak} Days` | `Claim →` | No | rewards |
| 6 | `Coins` | cyan | `Secure Vault` | `Virtual Chip Store` | `Acquire secure safe-guarded chip packs immediately to compete in high-stakes premium arena tables.` | `WALLET: {bankedChips} c` | `Shop →` | No | store |
| 7 | `Crown` | rose | `Tournament` | `Championships` | `Enter elite championship events. Compete against top-ranked operators for massive chip prizes and exclusive titles.` | `SEASONAL EVENTS` | `Compete →` | No | championships |
| 8 | `Award` | yellow | `Legends` | `Hall of Fame` | `View legendary players and record-breaking performances. The greatest venom operators of all time.` | `LEGENDARY RANKINGS` | `View Legends →` | No | halloffame |
| 9 | `Shield` | violet | `Team Ops` | `Syndicates` | `Create or join a syndicate. Team up with allies, pool resources, and dominate arenas together.` | `CLAN WARFARE` | `Assemble →` | No | clans |
| 10 | `Sparkles` | pink | `Season XP` | `Season Pass` | `Track your seasonal progression. Unlock exclusive rewards, cosmetics, and bonus chip multipliers as you level up.` | `FREE TIER REWARDS` | `Progress →` | No | seasonpass |
| 11 | `Film` | red | `Replays` | `Highlights` | `Watch and share your greatest moments. Review match replays, clutch extractions, and legendary eliminations.` | `MATCH HIGHLIGHTS` | `Watch →` | No | clips |
| 12 | `Users` | violet | `Friends & Global Search` | `Friends, Global Search & Syndicate Hub` | `Search and connect with players globally by tag or country flag (🇮🇳, 🇺🇸, 🇯🇵, etc.), send daily chip gifts (+25c), spectate matches, and create co-op team codes!` | `GLOBAL PLAYER NETWORK READY` | `Search & Connect →` | **Yes** | social |

**Dynamic values in foot text:**

- Gate 2 `footLeft`: `EQUIPPED: Custom DNA` (if `player.currentSkin` is truthy) or `EQUIPPED: Gallery Skin` (if falsy)
- Gate 3 `footLeft`: `HIGH SCORE: {(player.biggestExtract || 0).toLocaleString()}`
- Gate 5 `footLeft`: `STREAK: {player.dailyStreak || 1} Days`
- Gate 6 `footLeft`: `WALLET: {player.bankedChips.toLocaleString()} c`

---

## RIGHT COLUMN (4/12 width on desktop) — Tactical Challenges Sidebar

- **Container:** `lg:col-span-4 flex flex-col gap-4`
- **Section element:** `bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col gap-4`
- **ARIA label:** `Tactical challenges`
- **ID:** `challenges-dashboard-panel`

### Panel Header

- **Container:** `flex items-center justify-between border-b border-slate-800 pb-3`
- **Left side:**
  - **Icon:** `ListTodo` (indigo-400, 16×16px, `animate-pulse`)
  - **Title:** `Tactical Challenges` — `text-xs font-bold text-white uppercase tracking-wider`
  - **Tier badge** (conditional — only rendered if `challengeTier` is truthy): `text-[8px] px-1.5 py-0.5 font-bold rounded uppercase` with tier-specific styling:
    - `elite`: `bg-red-500/15 border border-red-500/20 text-red-400`
    - `veteran`: `bg-amber-500/15 border border-amber-500/20 text-amber-400`
    - `operative`: `bg-cyan-500/15 border border-cyan-500/20 text-cyan-400`
    - (fallback / `novice`): `bg-emerald-500/15 border border-emerald-500/20 text-emerald-400`
  - **Badge text:** The value of `challengeTier` (e.g., `elite`, `veteran`, `operative`, `novice`)
- **Right side** (conditional):
  - If `streakMultiplier > 1`: Shows `🔥 {challengeStreak}d streak ×{streakMultiplier}` — `text-[9px] font-mono text-amber-400 font-bold`
  - If `streakMultiplier <= 1`: Shows a `Sparkles` icon (indigo-400, 16×16px)

### Loading State

If `challengesLoading` is true and `missions` is empty:
- Shows centered `Loader2` spinner (indigo-400, 20×20px, `animate-spin`) with text `Loading challenges…` (slate-400, 12px)

### Empty State

If `challengesLoading` is false and `missions` is empty:
- Shows centered text: `No challenges available right now.` (slate-500, 12px)

### Challenges List Container

- **Container:** `flex flex-col gap-4 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar`

---

#### Daily Challenges Section

- **Section header:** flex row with:
  - **Icon:** `Sunrise` (amber-400, 14×14px)
  - **Label:** `Daily Challenges ({count})` — `text-[10px] font-bold text-amber-400 uppercase tracking-widest`
  - **Right-aligned reset note:** `Resets daily at UTC midnight` — `text-[9px] font-mono text-slate-600 ml-auto`
- Only rendered if there are daily missions (`m.type === 'daily'`)

Each daily mission card:

- **Container:** `p-3.5 bg-slate-950/90 rounded-xl border border-slate-800 flex flex-col gap-2.5`
- **Title:** `{m.title}` — `text-xs font-bold text-white leading-snug`
- **Description:** `{m.description}` — `text-[10.5px] text-slate-400 mt-1 leading-normal`
- **Progress text row:** `text-[10px] font-mono text-slate-500 mt-0.5` — left: `PROGRESS:`, right: `{m.current} / {m.target} ({percent}%)`
- **Progress bar track:** `w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/60`
  - **Fill** (3 states):
    - Claimed: `bg-emerald-600`
    - Completed (not claimed): `bg-gradient-to-r from-emerald-400 to-teal-500`
    - In progress: `bg-gradient-to-r from-amber-500 to-orange-500`
  - Width = `{percent}%` with `transition-all duration-300`
- **Footer row** (top border `border-t border-slate-900/40`, `pt-2 mt-1`, flex justify-between):
  - **Left:** `+{m.reward} CHIPS` — `text-[10px] font-mono font-bold text-emerald-400`
  - **Right:** Claim button (3 states):
    - **Claimed:** `bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed` — text: `Claimed ✓`
    - **Completed (claimable):** `bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-black shadow shadow-emerald-950/20` — text: `Claim`
    - **Not completed:** `bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed` — text: `Claim`
  - Button: `px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer`
  - Disabled when `!m.completed || m.claimed`

---

#### Weekly Challenges Section

- **Section header:** flex row with top border (`border-t border-slate-800 pt-3 mt-1`):
  - **Icon:** `Star` (violet-400, 14×14px)
  - **Label:** `Weekly Challenges ({count})` — `text-[10px] font-bold text-violet-400 uppercase tracking-widest`
  - **Right-aligned reset note:** `Resets every Monday UTC` — `text-[9px] font-mono text-slate-600 ml-auto`
- Only rendered if there are weekly missions (`m.type === 'weekly'`)

Each weekly mission card:

- **Container:** `p-3.5 bg-slate-950/90 rounded-xl border border-violet-500/20 flex flex-col gap-2.5`
  - (Note: border uses `violet-500/20` instead of `slate-800` for daily)
- **Title, description, progress text:** Same as daily
- **Progress bar fill** (3 states):
  - Claimed: `bg-emerald-600`
  - Completed (not claimed): `bg-gradient-to-r from-emerald-400 to-teal-500`
  - In progress: `bg-gradient-to-r from-violet-500 to-purple-500` (violet instead of amber)
- **Footer:** Same structure as daily (reward text + claim button with same 3 states)

---

#### Last Match Summary (conditional)

Only rendered if `lastResult` is truthy (player just returned from a match).

- **Container:** `mt-2 p-3 rounded-xl border border-slate-800 bg-slate-950/80`
- **Label:** `Last Match` — `text-[10px] font-mono text-slate-500 uppercase tracking-widest`
- **Content row** (`mt-1 flex items-center gap-2`):
  - **Emoji:** `🏆` if `lastResult.outcome === 'extract'`, `💀` otherwise — `text-base`
  - **Text block** (`text-[11px] text-slate-300 leading-tight`):
    - **Line 1:** `{Extracted or Eliminated} · {arenaName}` — `font-bold text-white`
    - **Line 2:** `{chipsExtracted}c · {kills} kills · +{xpGained} XP · {durationSeconds}s` — `text-slate-500`

---

## SIDEBAR TABS (visible on sub-pages, not on dashboard)

> The sidebar tab strip is rendered when `activeTab !== 'dashboard'`. It appears as a horizontal scrollable strip at the top of the sub-page navigation bar. These tabs are defined in the `TABS` constant array and filtered by admin role.

### Tab Strip Container

- **Outer nav bar:** `bg-slate-900/40 border border-slate-800 rounded-2xl p-4 mb-6 shadow-md`
- **Layout:** flex row, items center, justify between, gap 4. On mobile: flex column, items start.
- **Left side:**
  - **Back button:** `px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 transition-all cursor-pointer flex items-center gap-1.5 shadow`
    - Icon: `ChevronLeft` (indigo-400, 16×16px)
    - Label: `Lobby HQ`
  - **Divider:** Vertical 1px line (`h-4 w-[1px] bg-slate-800`), hidden on mobile
  - **Breadcrumb:** `STATION / {ACTIVE_TAB}` — `text-[10px] text-slate-500 font-mono hidden sm:block` (the tab ID is uppercased)
- **Right side (tab strip):** `flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800/60 overflow-x-auto max-w-full no-scrollbar`

### All 13 Tab Definitions

| # | Tab ID | Label | Icon | Active Color Classes | Admin Only? |
|---|--------|-------|------|---------------------|-------------|
| 1 | `arena` | `Play` | `Compass` | `text-indigo-400 bg-indigo-600/10 border-indigo-500/30` | No |
| 2 | `shop` | `Shop & Lab` | `ShoppingBag` | `text-purple-400 bg-purple-600/10 border-purple-500/30` | No |
| 3 | `profile` | `Dossier` | `User` | `text-blue-400 bg-blue-600/10 border-blue-500/30` | No |
| 4 | `leaderboard` | `Leaderboard` | `Trophy` | `text-amber-400 bg-amber-500/10 border-amber-500/30` | No |
| 5 | `championships` | `Championships` | `Crown` | `text-amber-400 bg-amber-500/10 border-amber-500/30` | No |
| 6 | `halloffame` | `Hall of Fame` | `Award` | `text-yellow-400 bg-yellow-500/10 border-yellow-500/30` | No |
| 7 | `clans` | `Syndicates` | `Shield` | `text-indigo-400 bg-indigo-600/10 border-indigo-500/30` | No |
| 8 | `seasonpass` | `Pass` | `Sparkles` | `text-purple-400 bg-purple-600/10 border-purple-500/30` | No |
| 9 | `clips` | `Highlights` | `Film` | `text-red-400 bg-red-600/10 border-red-500/30` | No |
| 10 | `rewards` | `Claims` | `Gift` | `text-emerald-400 bg-emerald-600/10 border-emerald-500/30` | No |
| 11 | `store` | `Vault` | `Coins` | `text-emerald-400 bg-emerald-600/10 border-emerald-500/30` | No |
| 12 | `social` | `Friends & Search` | `Users` | `text-violet-400 bg-violet-600/10 border-violet-500/30` | No |
| 13 | `admin` | `Admin` | `Shield` | `text-red-400 bg-red-600/10 border-red-500/30` | **Yes** |

### Tab Button Styling

- **Base:** `px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-transparent shrink-0`
- **Inactive:** `text-slate-500 hover:text-slate-300`
- **Active:** Adds the tab's `activeColor` classes + `border` (which applies the colored border from activeColor)
- **Icon size:** 14×14px (`w-3.5 h-3.5`)
- **Filtering:** `TABS.filter((t) => !t.adminOnly || player?.role === 'admin')` — Admin tab only visible to admin-role players

### Tab → Component Mapping

| Tab ID | Component Rendered |
|--------|-------------------|
| `arena` | `<ArenaSelector onPlay={handlePlayArena} onToast={toastFn} />` |
| `shop` | `<CosmeticsShop />` |
| `profile` | `<PlayerProfilePanel />` |
| `leaderboard` | `<Leaderboards onInspectPlayer={handleInspectPlayer} onToast={toastFn} />` |
| `championships` | `<Championships onToast={toastFn} />` |
| `halloffame` | `<HallOfFame onInspectPlayer={handleInspectPlayer} onToast={toastFn} />` |
| `clans` | `<ClanSystem onInspectPlayer={handleInspectPlayer} onToast={toastFn} />` |
| `seasonpass` | `<SeasonPass onToast={toastFn} />` |
| `clips` | `<ClipShowcase onInspectPlayer={handleInspectPlayer} onToast={toastFn} />` |
| `rewards` | `<DailyRewards onToast={toastFn} />` |
| `store` | `<ChipStore onToast={toastFn} />` |
| `social` | `<SocialPanel onToast={toastFn} />` |
| `admin` | `<AdminPanel onToast={toastFn} />` (only if `player.role === 'admin'`) |

---

## FOOTER (sticky bottom)

- **Container:** `border-t border-slate-900/60 bg-slate-950/40 py-6 mt-auto text-center text-xs text-slate-500`
- **Inner:** `max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4`
- **Left:** `© 2026 Project Venom Arena. All Rights Reserved. Fully store-safe, non-gambling gameplay edition.` — `font-sans`
- **Right:** `font-mono text-[10px] text-slate-400 flex gap-4`:
  - `APP_VERSION: 1.0.0-MVP`
  - `ENGINE: TSX_CANVAS`

---

## MODALS (rendered outside main content)

1. **GameRulesModal** — `isOpen={isRulesOpen}` / `onClose` sets `isRulesOpen` to false
2. **PlayerInspectorModal** — `player={inspectedPlayer}` / `onClose` sets `inspectedPlayer` to null

---

## Pre-Dashboard States

### Loading State

- Full-screen centered: `min-h-screen flex items-center justify-center bg-slate-950`
- Spinning `Loader2` (indigo-400, 32×32px) + text `Loading arena…` (slate-400, 14px)

### Unauthenticated State

- Renders `<AuthGate />` component (login/register screen)

### In-Game State

- When `activeArenaId` is set: renders `<GameCanvas>` full-screen (`w-screen h-screen overflow-hidden bg-slate-950`), completely replacing the dashboard layout

---

## Imports Inventory

### Lucide Icons (20 imports)

Compass, Shield, User, Trophy, Gift, ShoppingBag, Coins, Sparkles, Users, ChevronLeft, Play, ListTodo, Award, LogOut, Film, BookOpen, Crown, Loader2, Sunrise, Star

### Panel Components (12)

ArenaSelector, CosmeticsShop, PlayerProfilePanel, Leaderboards, DailyRewards, ChipStore, SocialPanel, ClanSystem, HallOfFame, Championships, SeasonPass, ClipShowcase, AdminPanel

### Modal Components (2)

PlayerInspectorModal, GameRulesModal

### Other

`useAuth` (auth provider), `AuthGate`, `GameCanvas`, `xpForLevel` + `InspectedPlayer` from game-config, `MatchResult` from types, `toast` from sonner