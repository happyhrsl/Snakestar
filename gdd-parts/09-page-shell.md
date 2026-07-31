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
