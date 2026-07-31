# Leaderboards Panel — Screen Content Walkthrough

Source: `src/components/panels/leaderboards.tsx` (830 lines)

---

## PRE-CONDITION: Signed In State

[IF player is NOT signed in]
  Renders the `<NotSignedIn />` component:

  ┌─────────────────────────────────────────────┐
  │                                             │
  │            Not signed in.                   │
  │                                             │
  └─────────────────────────────────────────────┘
  (rounded-2xl, border border-slate-800/80, bg-slate-900/60, centered text-sm text-slate-400)

  **Panel stops here. Nothing else renders.**

[IF player IS signed in] → continue below

---

## FULL PANEL (signed-in user)

**Outer container:** rounded-2xl, border border-slate-800/80, bg-slate-900/60, shadow-md, p-5 sm:p-6, overflow-hidden, relative

**Background decoration:** A GlowBlob (amber-500/10, 56×56, positioned -top-12 -right-12) — purely decorative gradient circle.

---

### 1. HEADER SECTION

**Separated from body by:** border-b border-slate-800, mb-5 pb-5

Layout: flex-col on mobile, flex-row on sm+, items-center, justify-between, gap-3

#### 1a. Left column

**Badge row (flex, items-center, gap-2, flex-wrap):**

  ┌──────────────────────────────────────────────────────────────────────────┐
  │ CURRENT YEAR (2026) CONCURRENT TOURNAMENT   ⚡ Live Ranks Update Every  │
  │                                           30 Minutes                    │
  └──────────────────────────────────────────────────────────────────────────┘

  - Badge 1: `CURRENT YEAR (2026) CONCURRENT TOURNAMENT`
    - bg-amber-500/10, border border-amber-500/30, text-amber-300
    - text-[9px], font-mono, font-bold, px-2 py-0.5, rounded, uppercase, tracking-widest

  - Badge 2 (inline-flex, items-center, gap-1): `⚡ Live Ranks Update Every 30 Minutes`
    - text-[9px], font-mono, text-amber-400, font-bold
    - bg-amber-500/10, border border-amber-500/30, rounded
    - ⚡ icon (Zap, w-3 h-3)

**Panel Title:**

  🏆 Official World Tournament Leaderboards

  - Trophy icon (w-5.5 h-5.5, text-amber-400)
  - text-xl sm:text-2xl, font-sans, font-black, text-white, tracking-tight

**Subtitle paragraph:**

  Complete real-time standings for World Summit, Global, National, and Milestone Tiers.
  Click any player row to inspect full profile & rank status!

  - text-xs, text-slate-400, mt-1, max-w-3xl

**Last sync micro-label:**
  [IF lastUpdated is not null]
    Last sync: [DYNAMIC: lastUpdated.toLocaleTimeString('en-US', { hour12: false })] UTC
    - MicroLabel component, mt-1.5, inline-block
  [IF lastUpdated is null]
    (not rendered)

#### 1b. Right column — Refresh button

  ┌──────────┐
  │ 🔄 Refresh │
  └──────────┘

  - inline-flex, items-center, justify-center, gap-1.5
  - px-3, py-2, bg-slate-950, hover:bg-slate-800
  - border border-slate-800, text-slate-300, hover:text-white
  - font-bold, rounded-xl, text-[11px], uppercase, tracking-wider
  - [IF loading is true] → shows Loader2 spinning icon (w-3.5 h-3.5, animate-spin, text-amber-400)
  - [IF loading is false] → shows RefreshCw icon (w-3.5 h-3.5)
  - [IF loading is true] → button is disabled (opacity-50)
  - onClick: re-fetches live data, fires toast "Leaderboard refreshed." (info)

---

### 2. YOUR RANK SUMMARY CARD

[IF playerRankInfo is NOT null (player is signed in)]

  Container: rounded-xl, p-4, mb-5, border-0
  - Background: linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(16,185,129,0.08) 100%)
  - Border: gradient border using mask technique, gradient from #f59e0b (amber) to #10b981 (emerald)

  **Card header row:**
    👑 YOUR RANK
    - Crown icon (w-4 h-4, text-amber-400)
    - "YOUR RANK" in text-xs, font-bold, text-amber-300, uppercase, tracking-widest, font-mono

  **Stats grid:** grid grid-cols-2 on mobile, grid-cols-5 on sm+, gap-3

  ┌──────────────────┬──────────────────┬────────────────────┬──────────────────┬──────────────────┐
  │   GLOBAL RANK    │  NATIONAL RANK   │  MILESTONE BADGE   │  BANKED CHIPS    │      LEVEL       │
  │                  │                  │                    │                  │                  │
  │  [DYNAMIC]       │  [DYNAMIC]       │  [DYNAMIC]         │  [DYNAMIC]       │  [DYNAMIC]       │
  └──────────────────┴──────────────────┴────────────────────┴──────────────────┴──────────────────┘

  **Column 1 — Global Rank**
  - Label: "GLOBAL RANK" — text-[10px], font-mono, text-slate-500, uppercase, tracking-wider, mb-0.5
  - Value (text-lg, font-black, text-white, tabular-nums):
    [IF loading is true] → spinning Loader2 icon (w-4 h-4, animate-spin, text-amber-400)
    [IF loading is false AND globalRank is not null] → `#[DYNAMIC: globalRank]` in text-amber-400
    [IF loading is false AND globalRank is null] → `N/A` in text-slate-600

  **Column 2 — National Rank**
  - Label: "NATIONAL RANK" — same style as above
  - Value (text-lg, font-black, text-white, tabular-nums):
    [IF nationalRank is not null] → `#[DYNAMIC: nationalRank]` in text-emerald-400
    [IF nationalRank is null] → `N/A` in text-slate-600

  **Column 3 — Milestone Badge**
  - Label: "MILESTONE BADGE" — same style as above
  - Value: [DYNAMIC: tierBadge from milestoneTierForChips(player.bankedChips)] — text-sm, font-bold, color = tier's hex color
  - Sub-label: [DYNAMIC: tierName from milestoneTierForChips(player.bankedChips)] — text-[10px], text-slate-500, truncate, max-w-[140px]

  **Column 4 — Banked Chips**
  - Label: "BANKED CHIPS" — same style as above
  - Value: `[DYNAMIC: player.bankedChips.toLocaleString()]c` — text-sm, font-mono, font-bold, text-emerald-400, tabular-nums

  **Column 5 — Level** (spans 2 cols on mobile via col-span-2 sm:col-span-1)
  - Label: "LEVEL" — same style as above
  - Value: [DYNAMIC: playerRankInfo.level] — text-lg, font-black, text-white, tabular-nums

[IF playerRankInfo IS null]
  (card is not rendered — skipped entirely)

---

### 3. TAB BAR

Container: flex, flex-wrap, items-center, gap-1.5, bg-slate-950, p-1, rounded-xl, border border-slate-800/60, mb-5

Four tab buttons rendered as `<TabBtn>` components. Each is a button with icon + label.

  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │ 👑 Summit│  │ 🌍Global │  │ 📍National│  │ 🏅 Tiers │
  └──────────┘  └──────────┘  └──────────┘  └──────────┘

  Each button: flex, items-center, gap-1.5, px-3, py-1.5, rounded-lg, text-xs, font-bold, transition, border, whitespace-nowrap

  | Tab  | Icon (lucide) | Label     | Color    | Default Active |
  |------|---------------|-----------|----------|----------------|
  | summit | Crown      | Summit    | #f59e0b  | YES            |
  | global | Globe      | Global    | #06b6d4  | no             |
  | national | MapPin   | National  | #8b5cf6  | no             |
  | tiers  | Medal        | Tiers     | #eab308  | no             |

  [IF tab is active]: border colored with tab's color, text colored with tab's color, backgroundColor = color + '1a'
  [IF tab is inactive]: text-slate-500, hover:text-slate-300, border-transparent, no background

---

### 4. TAB CONTENT — SUMMIT (default active tab)

#### 4a. Info banner

  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ WORLD CUP SUMMIT MECHANIC: This master leaderboard aggregates ONLY the #1 Ranked Player from      │
  │ each country. Dec 31 midnight UTC #1 wins the World Championship!                               │
  └──────────────────────────────────────────────────────────────────────────────────────────────────┘

  - rounded-xl, border border-amber-500/30, bg-amber-950/20, p-3
  - text-[11px], text-amber-200, leading-relaxed
  - "WORLD CUP SUMMIT MECHANIC:" is bold

#### 4b. Summit table

Container: rounded-2xl, border border-slate-800/60, bg-slate-950/80, overflow-hidden

**Column headers (grid cols-12, gap-2, px-4, py-2.5, border-b border-slate-800, bg-slate-950, text-slate-500, text-[10px], font-bold, uppercase, tracking-wider):**

  | Col span | Header Text        | Alignment |
  |----------|-------------------|-----------|
  | 2        | Global Rank       | left      |
  | 5        | Country #1 Champion | left   |
  | 3        | Nation            | left      |
  | 2        | Banked Chips      | right     |

**Row list:** `<ol>` with divide-y divide-slate-900, max-h-[55vh], overflow-y-auto, va-scroll class

  [IF countrySummit.length === 0]
    → EmptyState component:
      📥 Inbox icon (w-10 h-10, text-slate-600)
      "No entries yet" (text-sm, font-medium, text-slate-500)
      (centered vertically/horizontally, py-16)

  [IF countrySummit has entries]
    Each row is a clickable `<li>` (onClick triggers Player Inspector — see Section 8):

    **Row styling:**
    [IF isMe (userTag matches player)] → bg-amber-500/10, border-l-2 border-amber-500
    [ELSE] → hover:bg-slate-900/40
    Grid cols-12, gap-2, px-4, py-3, text-sm, cursor-pointer, transition-colors

    **Row content (4 columns):**

    Col 1 (span-2): Global Rank
      [IF rank is 1] → 🥇 (text-lg)
      [IF rank is 2] → 🥈 (text-lg)
      [IF rank is 3] → 🥉 (text-lg)
      [IF rank > 3] → `#[rank]` (text-slate-400, font-bold)
      [IF isMe] → yellow "YOU" badge (text-[9px], bg-amber-500, text-black, px-1, rounded, font-bold)

    Col 2 (span-5): Country #1 Champion
      Line 1: Player name (font-bold, text-white, truncate)
      Line 2: `[userTag] · 26 Jul 2026` (text-[10px], font-mono, text-slate-500)

    Col 3 (span-3): Nation
      `[flag emoji] [country name]` (text-xs, text-slate-300, flex, items-center, gap-1.5)
      - flag from countryFlag(), name from countryName()

    Col 4 (span-2): Banked Chips
      `[chips.toLocaleString()]c` (text-right, font-mono, font-bold, text-emerald-400, tabular-nums)

**Demo/seed data for Summit (one row per country, sorted by chips descending):**

Known seeded entries (from COUNTRY_SEEDS):
- 🇮🇳 IN: Hari, #IND-001, 10,000,000c, level 50
- 🇺🇸 US: Apex_Viper, #USA-882, 9,400,000c, level 49
- 🇰🇷 KR: K-Snake_Master, #KOR-114, 8,900,000c, level 49
- 🇮🇳 IN (2nd): Arjun_Viper, #IND-002, 8,400,000c, level 48 (NOT in summit — only #1 per country)
- 🇮🇳 IN (3rd): Delhi_King, #IND-003, 6,200,000c, level 45 (NOT in summit)
- 🇺🇸 US (2nd): Cyber_Wolf, #USA-102, 7,800,000c, level 46 (NOT in summit)

  All other countries auto-generated as: `Apex_{countryCode}_Leader`, userTag `#{code}-001`, chips = 10,000,000 - (index × 450,000), level = 50 - index

---

### 5. TAB CONTENT — GLOBAL

#### 5a. Competitor count line

  Total Global Competitors: [DYNAMIC: (liveEntries.length || globalRanks.length).toLocaleString()] Players
  - text-[10px], font-mono, text-slate-500

#### 5b. Global table

Container: rounded-2xl, border border-slate-800/60, bg-slate-950/80, overflow-hidden

**Column headers (same grid layout as Summit):**

  | Col span | Header Text        | Alignment |
  |----------|-------------------|-----------|
  | 2        | Global Rank       | left      |
  | 5        | Player & User Tag | left      |
  | 3        | Milestone Badge   | left      |
  | 2        | Banked Chips      | right     |

**Row list:** `<ol>` same scroll container

  [IF loading is true]
    → Loading state:
      Loader2 spinning icon (w-4 h-4, animate-spin, text-amber-400) + "Loading global ranks…"
      (p-4, text-center, text-slate-500, text-xs, flex, items-center, justify-center, gap-2)

  [IF loading is false AND globalRanks.length === 0]
    → EmptyState: 📥 "No entries yet"

  [IF loading is false AND globalRanks has entries]
    Each row is a clickable `<li>`:

    **Row styling:**
    [IF isMe] → bg-amber-500/10, border-l-2 border-amber-500
    [ELSE] → hover:bg-slate-900/40

    **Row content:**

    Col 1 (span-2): Global Rank
      [IF rank is 1] → 🥇 (text-lg)
      [IF rank is 2] → 🥈 (text-lg)
      [IF rank is 3] → 🥉 (text-lg)
      [IF rank > 3] → `#[rank]` (text-slate-400, font-bold)
      [IF isMe] → yellow "YOU" badge

    Col 2 (span-5): Player & User Tag
      Line 1: `[flag emoji] [name]` (font-bold, text-white, truncate, flex, items-center, gap-1.5)
      Line 2: `[userTag] · 26 Jul 2026` (text-[10px], font-mono, text-slate-500)

    Col 3 (span-3): Milestone Badge
      Pill/badge: `[DYNAMIC: tier.badge from milestoneTierForChips(bankedChips)]`
      - inline-flex, items-center, gap-1, px-2, py-0.5, rounded-full
      - bg-slate-900, border border-slate-800
      - text-[10px], font-mono
      - color = tier's hex color

    Col 4 (span-2): Banked Chips
      `[bankedChips.toLocaleString()]c` (text-right, font-mono, font-bold, text-emerald-400, tabular-nums)

**Demo/seed rows (top 6 from topAchievers, then MOCK_LEADERBOARD, then auto-filled to 100):**

  #1  🥇  🇮🇳 Hari                #IND-001 · 26 Jul 2026   👑 Omega        10,000,000c
  #2  🥈  🇺🇸 Apex_Viper          #USA-882 · 26 Jul 2026   👑 Omega         9,400,000c
  #3  🥉  🇰🇷 K-Snake_Master      #KOR-114 · 26 Jul 2026   👑 Omega         8,900,000c
  #4      🇯🇵 Shadow_Ninja        #JPN-309 · 26 Jul 2026   🔮 Diamond       5,000,000c
  #5      🇺🇸 Viper_Zero          #USA-402 · 26 Jul 2026   💎 Platinum      2,500,000c
  #6      🇮🇳 Rookie_Striker      #IND-104 · 26 Jul 2026   🥇 Gold          1,200,000c
  #7      🇺🇸 ViperX              US-2854 · 26 Jul 2026     🥉 Bronze         285,400c
  #8      🇰🇷 KobraCommander      KR-1982 · 26 Jul 2026     🥉 Bronze         198,250c
  #9      🇧🇷 SlinkySlayer        BR-1420 · 26 Jul 2026     🥉 Bronze         142,010c
  #10     🇩🇪 VenomousRex         DE-9545 · 26 Jul 2026     🥉 Bronze          95,450c
  #11     🇨🇦 Basilisk_99         CA-7420 · 26 Jul 2026     🥉 Bronze          74,200c
  #12     🇯🇵 PythonicPro         JP-5190 · 26 Jul 2026     🛡️ Rookie         51,900c
  #13     🇬🇧 SidewinderAlpha     GB-3870 · 26 Jul 2026     🛡️ Rookie         38,700c
  #14     🇮🇳 Naga_Queen           IN-2465 · 26 Jul 2026     🛡️ Rookie         24,650c
  #15     🇦🇺 Anacondaaa          AU-1950 · 26 Jul 2026     🛡️ Rookie         19,500c
  #16     🇫🇷 Copperhead          FR-1240 · 26 Jul 2026     🛡️ Rookie         12,400c
  #17+    (auto-generated: Viper_Challenger_17 through Viper_Challenger_100)

---

### 6. TAB CONTENT — NATIONAL

#### 6a. Country selector row

Layout: flex-col on mobile, flex-row on sm+, items-start sm:items-center, justify-between, gap-3

**Left side:**
  📍 Select Country (208 Countries):
  - MapPin icon (w-4 h-4, text-violet-400)
  - "Select Country (208 Countries):" — text-xs, font-bold, text-white

**Right side (flex, items-center, gap-2):**

  **Country dropdown (`<select>`):**
  - Default value: `IN` (India)
  - bg-slate-950, border border-slate-800, rounded-lg, px-3, py-1.5
  - text-xs, text-white, font-mono
  - focus:border-violet-500/50
  - Options: all 208 countries listed as `[flag] [name]` (e.g. "🇮🇳 India", "🇺🇸 United States", "🇰🇷 South Korea", ...)

  **Search input:**
  - 🔍 Search icon (w-3.5 h-3.5, text-slate-500, absolute left-2.5, vertically centered)
  - Placeholder: "Search player in country..."
  - bg-slate-950, border border-slate-800, rounded-lg, pl-8, pr-3, py-1.5
  - text-xs, text-white, placeholder:text-slate-600
  - focus:border-violet-500/50
  - Filters national board by name or userTag (case-insensitive substring match)

#### 6b. National table

Container: rounded-2xl, border border-slate-800/60, bg-slate-950/80, overflow-hidden

**Column headers:**

  | Col span | Header Text     | Alignment |
  |----------|----------------|-----------|
  | 2        | National Rank  | left      |
  | 5        | Local Challenger | left    |
  | 3        | Level          | left      |
  | 2        | Banked Chips   | right     |

**Row list:** same scroll container

  [IF filteredNational.length === 0]
    → EmptyState with custom message:
      📥 "No players found for [DYNAMIC: countryName(selectedCountry)]"

  [IF filteredNational has entries]
    Each row is a clickable `<li>`:

    **Row styling:**
    [IF isMe] → bg-violet-500/10, border-l-2 border-violet-500 (NOTE: violet, not amber)
    [ELSE] → hover:bg-slate-900/40

    **Row content:**

    Col 1 (span-2): National Rank
      [IF rank is 1] → 🥇
      [IF rank is 2] → 🥈
      [IF rank is 3] → 🥉
      [IF rank > 3] → `#[rank]`
      [IF isMe] → violet "YOU" badge (bg-violet-500, text-black)

    Col 2 (span-5): Local Challenger
      Line 1: `[flag emoji] [name]` (font-bold, text-white, truncate)
      Line 2: `[userTag]` (text-[10px], font-mono, text-slate-500) — NOTE: no date shown here

    Col 3 (span-3): Level
      `Lvl [level]` (text-xs, text-amber-400, font-mono)

    Col 4 (span-2): Banked Chips
      `[bankedChips.toLocaleString()]c` (text-right, font-mono, font-bold, text-emerald-400, tabular-nums)

**Demo data (default: India / IN):**
  #1  🥇  🇮🇳 Hari                 #IND-001          Lvl 50    10,000,000c
  #2  🥈  🇮🇳 Arjun_Viper          #IND-002          Lvl 48     8,400,000c
  #3  🥉  🇮🇳 Delhi_King           #IND-003          Lvl 45     6,200,000c
  #4      🇮🇳 India_Challenger_4   #IN-104           Lvl 44     4,970,000c
  #5      🇮🇳 India_Challenger_5   #IN-105           Lvl 43     4,923,000c
  ... (auto-filled to 100, chips decreasing by ~47K, level decreasing by ~0.4 per rank)

---

### 7. TAB CONTENT — TIERS

#### 7a. Info banner

  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ MILESTONE TIER RANKING BOARD: All players who have reached each chip milestone are ranked from     │
  │ #1 to all joined competitors! Click any player to inspect profile & dossier.                     │
  └──────────────────────────────────────────────────────────────────────────────────────────────────┘

  - rounded-xl, border border-yellow-500/30, bg-yellow-950/10, p-3
  - text-[11px], text-yellow-200, leading-relaxed
  - "MILESTONE TIER RANKING BOARD:" is bold

#### 7b. Milestone tier filter buttons

Container: flex, flex-wrap, items-center, gap-1.5

Pill-shaped buttons (rounded-full, px-2.5, py-1, text-xs, font-bold, transition):

  [IF selectedTierId === button.id]
    → Active: border colored, text colored, backgroundColor = color + '1a'
  [IF selectedTierId !== button.id]
    → Inactive: border border-slate-800, bg-slate-950, text-slate-400, hover:text-slate-200

  Each button's `title` attribute = tier's `name`
  Each button's displayed text = tier's `badge`

  | # | id      | Badge Text      | Name                              | Color    | Default Active |
  |---|---------|----------------|-----------------------------------|----------|----------------|
  | 1 | all     | ⭐ All         | All Tiers                         | #94a3b8  | YES            |
  | 2 | rookie  | 🛡️ Rookie      | Rookie (Below 100K)               | #64748b  | no             |
  | 3 | omega   | 👑 Omega       | Omega Legend (1 Crore / 10M+)     | #fbbf24  | no             |
  | 4 | diamond | 🔮 Diamond     | Diamond Warlord (50 Lakhs / 5M+)  | #06b6d4  | no             |
  | 5 | platinum| 💎 Platinum    | Platinum Sovereign (25Lakhs/2.5M+)| #22d3ee  | no             |
  | 6 | gold    | 🥇 Gold        | Gold Apex Vanguard (10Lakhs/1M+)  | #f59e0b  | no             |
  | 7 | silver  | 🥈 Silver      | Silver Commander (5 Lakhs / 500K+) | #cbd5e1  | no             |
  | 8 | bronze  | 🥉 Bronze      | Bronze Elite (1 Lakh / 100K+)     | #b45309  | no             |
  | 9 | rookie  | 🛡️ Rookie      | Rookie (0 - 99K)                  | #64748b  | no             |

  NOTE: Rookie appears TWICE in the filter buttons (ids both 'rookie') — once from the hardcoded ALL_MILESTONE_TIERS entry and once from MILESTONE_TIERS spread. Selecting either activates the same 'rookie' tier board.

#### 7c. Tier table

Container: rounded-2xl, border border-slate-800/60, bg-slate-950/80, overflow-hidden

**Column headers:**

  | Col span | Header Text              | Alignment |
  |----------|-------------------------|-----------|
  | 2        | Tier Rank               | left      |
  | 5        | Player Name & User Tag  | left      |
  | 3        | Country                 | left      |
  | 2        | Banked Chips            | right     |

**Row list:** same scroll container

  [IF milestoneBoard.length === 0]
    → EmptyState: 📥 "No entries yet"

  [IF milestoneBoard has entries]
    Each row is a clickable `<li>`:

    **Row styling:**
    [IF isMe] → bg-yellow-500/10, border-l-2 border-yellow-500 (NOTE: yellow, not amber)
    [ELSE] → hover:bg-slate-900/40

    **Row content:**

    Col 1 (span-2): Tier Rank
      [IF rank is 1] → 🥇
      [IF rank is 2] → 🥈
      [IF rank is 3] → 🥉
      [IF rank > 3] → `#[rank]`
      [IF isMe] → yellow "YOU" badge (bg-yellow-500, text-black)

    Col 2 (span-5): Player Name & User Tag
      Line 1: `[name]` (font-bold, text-white, truncate) — NOTE: no flag emoji here
      Line 2: `[userTag]` (text-[10px], font-mono, text-slate-500)

    Col 3 (span-3): Country
      `[flag emoji] [country name]` (text-xs, text-slate-300, flex, items-center, gap-1.5)

    Col 4 (span-2): Banked Chips
      `[bankedChips.toLocaleString()]c` (text-right, font-mono, font-bold, text-emerald-400, tabular-nums)

**Tier-specific demo data:**

  **"all" (default):** Same as Global rankings (100 entries)

  **"omega" (10M+):** Exactly 3 entries:
    #1  🥇  Hari              #IND-001    🇮🇳 India        10,000,000c
    #2  🥈  Apex_Viper        #USA-882    🇺🇸 United States 10,000,000c
    #3  🥉  K-Snake_Master    #KOR-114    🇰🇷 South Korea   10,000,000c

  **"rookie" (below 100K):** 100 entries, first is:
    #1  🥇  Starter_Pawn      #GEN-000    🇺🇸 United States    45,000c
    Then auto-generated: `[CountryName]_Rookie_2` through `_Rookie_100`
    Chips decrease from 90,000 by 880 per rank, levels from 10 downward

  **"bronze" (100K+):** 100 entries, first known:
    #1  🥇  Rookie_Striker    #IND-104    🇮🇳 India        100,000c
    Then auto-generated: `[CountryName]_Achiever_2` through `_Achiever_100`, all at 100,000c

  **"silver" (500K+):** 100 entries, first known:
    #1  🥇  Viper_Zero        #USA-402    🇺🇸 United States 500,000c
    Then auto-generated, all at 500,000c

  **"gold" (1M+):** 100 entries, first known:
    #1  🥇  K-Snake_Master    #KOR-114    🇰🇷 South Korea   1,000,000c
    Then auto-generated, all at 1,000,000c

  **"platinum" (2.5M+):** 100 entries, first known:
    #1  🥇  Apex_Viper        #USA-882    🇺🇸 United States 2,500,000c
    Then auto-generated, all at 2,500,000c

  **"diamond" (5M+):** 100 entries, first known:
    #1  🥇  Shadow_Ninja      #JPN-309    🇯🇵 Japan        5,000,000c
    Then auto-generated, all at 5,000,000c

---

### 8. PLAYER INSPECTOR (click behavior)

**Trigger:** Clicking any player row in any tab (Summit, Global, National, Tiers) calls `inspectPlayer()`, which calls `onInspectPlayer` (prop callback to parent).

**Hardcoded values passed for ALL inspected players:**
  - `clanTag`: "APEX"
  - `clanName`: "Viper Apex Syndicate"
  - `achievedAt`: "26 Jul 2026, 05:42 PM UTC"
  - `globalRank`: [DYNAMIC: e.rank]
  - `countryRank`: [DYNAMIC: Math.floor(e.rank / 1.4) || 1]
  - `regionalRank`: [DYNAMIC: Math.floor(e.rank / 2) || 1]
  - `flag`: [DYNAMIC: countryFlag(e.country)]

**Dynamic values:**
  - `name`, `userTag`, `country`, `bankedChips`, `level` — from the row data

**InspectedPlayer interface fields (all passed to parent):**
  name, userTag, country, flag, bankedChips, level, achievedAt, globalRank, countryRank, regionalRank, clanTag, clanName

  NOTE: The actual Player Inspector UI is NOT rendered inside this component. It is rendered by the parent that receives the `onInspectPlayer` callback. This component only fires the callback.

---

### 9. AUTO-REFRESH BEHAVIOR

- On mount: fetches `/api/leaderboard?type=chips&limit=100` with `{ cache: 'no-store' }`
- Polling interval: every 30 minutes (`30 * 60 * 1000` ms) via `setInterval`
- [IF API returns OK with entries] → uses live entries
- [IF API fails or returns no entries] → falls back to `generateGlobalRanks(playerTag)`
- Loading state: shows spinner in Your Rank card (Global Rank) and in Global tab row list
- Manual refresh: "Refresh" button in header, fires toast "Leaderboard refreshed." (info)

---

### 10. EMPTY STATES SUMMARY

| Location         | Condition                    | Icon  | Message                                              |
|------------------|------------------------------|-------|------------------------------------------------------|
| Summit table     | countrySummit.length === 0   | 📥    | No entries yet                                       |
| Global table     | globalRanks.length === 0     | 📥    | No entries yet                                       |
| National table   | filteredNational.length === 0| 📥    | No players found for [DYNAMIC: countryName(selectedCountry)] |
| Tiers table      | milestoneBoard.length === 0  | 📥    | No entries yet                                       |

  All empty states: flex, flex-col, items-center, justify-center, py-16, text-slate-500
  - Inbox icon (w-10 h-10, mb-3, text-slate-600)
  - Message: text-sm, font-medium, text-slate-500

---

### 11. VISUAL DIFFERENCES BETWEEN TABS ("YOU" BADGE COLOR)

| Tab     | Your-row highlight bg    | Your-row left border | "YOU" badge bg   |
|---------|--------------------------|----------------------|-------------------|
| Summit  | bg-amber-500/10          | border-amber-500     | bg-amber-500      |
| Global  | bg-amber-500/10          | border-amber-500     | bg-amber-500      |
| National| bg-violet-500/10         | border-violet-500    | bg-violet-500     |
| Tiers   | bg-yellow-500/10         | border-yellow-500    | bg-yellow-500     |

---

### 12. COMPLETE VISUAL WALKTHROUGH (top-to-bottom, default state)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│  CURRENT YEAR (2026) CONCURRENT TOURNAMENT    ⚡ Live Ranks Update Every 30 Min  │
│                                                                                 │
│  🏆 Official World Tournament Leaderboards                                      │
│  Complete real-time standings for World Summit, Global, National, and            │
│  Milestone Tiers. Click any player row to inspect full profile & rank status!    │
│  Last sync: [DYNAMIC: HH:MM:SS] UTC                                      🔄 Refresh│
│─────────────────────────────────────────────────────────────────────────────────│
│  👑 YOUR RANK                                                                  │
│  ┌──────────────┬──────────────┬──────────────────┬──────────────┬────────────┐  │
│  │ GLOBAL RANK  │NATIONAL RANK │ MILESTONE BADGE  │ BANKED CHIPS │   LEVEL    │  │
│  │ #[DYNAMIC]   │ #[DYNAMIC]   │ [DYNAMIC badge]  │ [DYNAMIC]c   │ [DYNAMIC]  │  │
│  │              │              │ [DYNAMIC name]   │              │            │  │
│  └──────────────┴──────────────┴──────────────────┴──────────────┴────────────┘  │
│─────────────────────────────────────────────────────────────────────────────────│
│  [👑 Summit]  [🌍Global]  [📍National]  [🏅Tiers]                               │
│─────────────────────────────────────────────────────────────────────────────────│
│                                                                                 │
│  WORLD CUP SUMMIT MECHANIC: This master leaderboard aggregates ONLY the #1      │
│  Ranked Player from each country. Dec 31 midnight UTC #1 wins the World          │
│  Championship!                                                                   │
│                                                                                 │
│  ┌──────────┬─────────────────────────┬──────────────┬───────────────┐          │
│  │Global Rank│ Country #1 Champion     │ Nation       │ Banked Chips  │          │
│  ├──────────┼─────────────────────────┼──────────────┼───────────────┤          │
│  │ 🥇        │ Hari                    │ 🇮🇳 India    │  10,000,000c  │          │
│  │          │ #IND-001 · 26 Jul 2026   │              │               │          │
│  ├──────────┼─────────────────────────┼──────────────┼───────────────┤          │
│  │ 🥈        │ Apex_Viper              │ 🇺🇸 United.. │   9,400,000c  │          │
│  │          │ #USA-882 · 26 Jul 2026   │              │               │          │
│  ├──────────┼─────────────────────────┼──────────────┼───────────────┤          │
│  │ 🥉        │ K-Snake_Master          │ 🇰🇷 South .. │   8,900,000c  │          │
│  │          │ #KOR-114 · 26 Jul 2026   │              │               │          │
│  ├──────────┼─────────────────────────┼──────────────┼───────────────┤          │
│  │ #4       │ Apex_IN_Leader           │ 🇮🇳 India    │   ...c        │          │
│  │          │ #IN-001 · 26 Jul 2026    │              │               │          │
│  │  ... (scrollable, max 55vh, one row per country)                      │          │
│  └──────────┴─────────────────────────┴──────────────┴───────────────┘          │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```
