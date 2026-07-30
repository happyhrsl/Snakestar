# Championships Panel — Full Screen Content Walkthrough

> Source: `src/components/panels/championships.tsx` (440 lines) + `src/lib/game-config.ts`
> Generated: screen-content/championships.md

---

## PRE-CONDITION: NOT SIGNED IN

If `player` is null/falsy, the entire panel is replaced by:

```
┌─────────────────────────────────────────┐
│           Not signed in.                │
└─────────────────────────────────────────┘
```

(No other content is rendered. This is the `NotSignedIn` primitive.)

---

=== CHAMPIONSHIPS PANEL (signed in) ===

--- HERO BANNER ---
(Gradient background: amber-950/40 → slate-900 → indigo-950/40, amber border, rounded-2xl)

[BADGE] OFFICIAL 1-YEAR TOURNAMENT
  (amber text on amber bg, 9px mono bold uppercase tracking-widest, rounded)

[BADGE with Sparkles icon ✨] JAN 1 HALL OF FAME PAYOUT
  (indigo text on indigo bg, 9px mono bold uppercase tracking-widest, rounded)

[HEADING — 2xl/3xl font-black white] 2026 ANNUAL VENOM WORLD CHAMPIONSHIP

[PARAGRAPH — xs/sm slate-300] Join anytime during the year! Play up to 10,000 Games. When the year ends,
  players with the Maximum Wallet Chips across Global, Regional, and Country
  leaderboards will be awarded massive chip prizes and permanently inducted
  into the Hall of Fame on January 1st!

--- COUNTDOWN SECTION ---
(Dark slate-950/70 bg, amber border, inside hero banner, rounded-xl)

[LABEL — with Timer icon ⏱️, 10px mono bold uppercase amber-300]
  YEAR-END FINALE & JAN 1 PAYOUT IN:

[LABEL — right-aligned, 10px mono slate-500]
  Payout Date: Midnight UTC, 01 January 2027

[COUNTDOWN — 4-column grid, each cell in slate-900 box with slate-800 border]
  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
  │   XX     │ │   XX     │ │   XX     │ │   XX     │
  │  Days    │ │  Hours   │ │  Mins    │ │  Secs    │
  │(9px mono │ │(9px mono │ │(9px mono │ │(9px mono │
  │ slate-500│ │ slate-500│ │ slate-500│ │ slate-500│
  └──────────┘ └──────────┘ └──────────┘ └──────────┘
  (XX = live countdown to 2027-01-01T00:00:00Z, 2-digit padded, amber-400 font-black tabular-nums)

--- PLAYER DOSSIER ---
(Rounded-2xl, slate-800 border, slate-950/60 bg)

[ROW — label right-aligned]
  [LABEL — with Swords icon ⚔️, sm bold white] Matches Limit Progress:
  [VALUE — xs mono slate-300, right-aligned] [DYNAMIC: gamesPlayed.toLocaleString()] / 10,000 Played
  (Default gamesPlayed = 34, so initially: "34 / 10,000 Played")

[PROGRESS BAR — full width, 2px tall, slate-900 bg, slate-800 border, rounded-full]
  [FILL — h-full, gradient from-indigo-500 to-amber-500, rounded-full]
  Width = (gamesPlayed / 10,000) * 100%, capped at 100%
  (Default: 0.34%)

[TEXT — 11px slate-400] [DYNAMIC: remaining.toLocaleString()] Championship matches remaining this year
  (Default: "9,966 Championship matches remaining this year")

[3-COLUMN GRID]

  ┌─────────────────────────────┐ ┌─────────────────────────────┐ ┌─────────────────────────────┐
  │ [MICRO-LABEL]               │ │ [MICRO-LABEL]               │ │ [MICRO-LABEL]               │
  │ COMPETING WALLET CHIPS      │ │ STATUS                      │ │ (button area, centered)     │
  │                             │ │                             │ │                             │
  │ [VALUE — lg bold mono       │ │ [VALUE — sm bold white]     │ │ [IF NOT registered:]        │
  │  emerald-400]               │ │                             │ │ [BUTTON — amber gradient    │
  │ [DYNAMIC: fmtINR(           │ │ ✅ Registered & Active in   │ │  with Trophy icon 🏆]       │
  │  player.bankedChips)] Chips │ │   2026 Championship         │ │ JOIN 2026 CHAMPIONSHIP NOW  │
  │                             │ │                             │ │ (xsmall black text on       │
  │ [TEXT — 10px slate-500]    │ │ [IF NOT registered:]        │ │  amber/yellow gradient,     │
  │ Max chips at year-end      │ │ Free Entry | Join Anytime   │ │  rounded-xl, uppercase)     │
  │ decides rank!              │ │                             │ │                             │
  │                             │ │                             │ │ [IF registered:]            │
  │                             │ │                             │ │ [BUTTON — indigo-600 with   │
  │                             │ │                             │ │  Play icon ▶]               │
  │                             │ │                             │ │ PLAY CHAMPIONSHIP MATCH     │
  │                             │ │                             │ │ (xsmall white text on       │
  │                             │ │                             │ │  indigo bg, rounded-xl,     │
  │                             │ │                             │ │  uppercase)                 │
  └─────────────────────────────┘ └─────────────────────────────┘ └─────────────────────────────┘

--- PRIZE TIERS ---
(From CHAMPIONSHIP_PRIZE_TIERS config)

[HEADING — with Gift icon 🎁, lg/xl font-black white]
  Jan 1st Payout & Hall of Fame Induction Tiers

[LABEL — right-aligned, 10px mono slate-500] Awarded automatically on 01 January

[2-COLUMN GRID of tier cards — each card: rounded-2xl, slate-800 border, slate-950/70 bg]

  ┌──────────────────────────────────┐ ┌──────────────────────────────────┐
  │ TIER 1 (RANK_1)                  │ │ TIER 2 (RANK_2_10)               │
  │                                  │ │                                  │
  │ [BADGE — 10px mono amber-300]   │ │ [BADGE — 10px mono amber-300]   │
  │ 🥇 1st Place (World / Region /  │ │ 🥈 Top 10 Legends                │
  │     Country)                     │ │                                  │
  │ [TITLE — sm bold white]         │ │ [TITLE — sm bold white]         │
  │ 👑 RANK 1: GRAND CHAMPION       │ │ 🥈 RANKS 2–10: TOP 10 LEGENDS   │
  │                                  │ │                                  │
  │ [CHIPS — lg font-black mono     │ │ [CHIPS — lg font-black mono     │
  │  emerald-400]                   │ │  emerald-400]                   │
  │ +50,00,000 CHIPS                │ │ +25,00,000 CHIPS                │
  │                                  │ │                                  │
  │ [TEXT — 11px slate-400]         │ │ [TEXT — 11px slate-400]         │
  │ Crown Title:                    │ │ Crown Title:                    │
  │   [bold white] 👑 2026 WORLD    │ │   [bold white] 🥈 VENOM ARENA   │
  │   VENOM CHAMPION                │ │   OVERLORD                      │
  │                                  │ │                                  │
  │ [TEXT — 11px slate-400 with     │ │ [TEXT — 11px slate-400 with     │
  │  Sparkles icon ✨ amber-400]    │ │  Sparkles icon ✨ amber-400]    │
  │ Mythic Golden Dragon Skin &     │ │ Platinum Armor Skin & Crown     │
  │ World Crown                     │ │ Effect                          │
  │                                  │ │                                  │
  │ [TEXT — 11px yellow-300 with    │ │ [TEXT — 11px yellow-300 with    │
  │  Award icon 🏅]                 │ │  Award icon 🏅]                 │
  │ Permanent Hall of Fame          │ │ Permanent Hall of Fame          │
  │ Inscription                     │ │ Inscription                     │
  └──────────────────────────────────┘ └──────────────────────────────────┘

  ┌──────────────────────────────────┐ ┌──────────────────────────────────┐
  │ TIER 3 (RANK_11_50)             │ │ TIER 4 (RANK_51_100)            │
  │                                  │ │                                  │
  │ [BADGE — 10px mono amber-300]   │ │ [BADGE — 10px mono amber-300]   │
  │ 🥉 Ranks 11–50 Masters          │ │ 🛡️ Ranks 51–100 Contenders     │
  │                                  │ │                                  │
  │ [TITLE — sm bold white]         │ │ [TITLE — sm bold white]         │
  │ 🥉 RANKS 11–50: ELITE MASTERS   │ │ 🛡️ RANKS 51–100: CHAMPIONSHIP  │
  │                                  │ │    CONTENDERS                   │
  │ [CHIPS — lg font-black mono     │ │ [CHIPS — lg font-black mono     │
  │  emerald-400]                   │ │  emerald-400]                   │
  │ +10,00,000 CHIPS                │ │ +2,50,000 CHIPS                 │
  │                                  │ │                                  │
  │ [TEXT — 11px slate-400]         │ │ [TEXT — 11px slate-400]         │
  │ Crown Title:                    │ │ Crown Title:                    │
  │   [bold white] 🥉 ARENA ELITE   │ │   [bold white] 🛡️ CHAMPIONSHIP  │
  │   MASTER                        │ │   CONTENDER                     │
  │                                  │ │                                  │
  │ [TEXT — 11px slate-400 with     │ │ [TEXT — 11px slate-400 with     │
  │  Sparkles icon ✨ amber-400]    │ │  Sparkles icon ✨ amber-400]    │
  │ Diamond Trail Effect & Master   │ │ 2,500 Season Pass XP &          │
  │ Crest                           │ │ Contender Badge                 │
  │                                  │ │                                  │
  │ [TEXT — 11px yellow-300 with    │ │ [TEXT — 11px yellow-300 with    │
  │  Award icon 🏅]                 │ │  Award icon 🏅]                 │
  │ Permanent Hall of Fame          │ │ Permanent Hall of Fame          │
  │ Inscription                     │ │ Inscription                     │
  └──────────────────────────────────┘ └──────────────────────────────────┘

--- SCOPE TABS ---
(Rounded-xl tab bar, slate-950 bg, slate-800/60 border)

  [TAB — with Globe icon 🌐] GLOBAL WORLD CHAMPIONSHIP    [active by default: amber bg/border/text]
  [TAB — with MapPin icon 📍] REGIONAL MASTERS
  [TAB — with Flag icon 🏳️] NATIONAL COUNTRY CIRCUIT
  (Inactive tabs: slate-500 text, transparent border)

--- FILTERS ROW ---

  [IF scope === 'REGIONAL':]
    [SELECT dropdown — slate-950 bg, slate-800 border, xs mono white]
      🌐 All Regions
      🌏 Asia-Pacific (APAC)
      🌎 North America (NA)
      🌍 Europe (EU)
      💃 Latin America (LATAM)

  [IF scope === 'NATIONAL':]
    [SELECT dropdown — slate-950 bg, slate-800 border, xs mono white]
      🌐 All Countries
      🇮🇳 India
      🇺🇸 United States
      🇯🇵 Japan
      🇰🇷 South Korea
      🇩🇪 Germany
      🇧🇷 Brazil
      🇬🇧 United Kingdom

  [LABEL — right-aligned, 10px mono slate-500] Rank Filter:

  [FILTER BUTTONS — 10px bold, rounded-full]
    All Ranks              [active: amber bg/border/text]
    👑 Rank 1
    🥈 Ranks 2–10
    🥉 Ranks 11–50
    🛡️ Ranks 51–100
  (Inactive: slate-800 border, slate-950 bg, slate-500 text)

--- STANDINGS TABLE ---

[HEADING — sm bold white] 2026 Championship Standings ([DYNAMIC: scope])
  (e.g. "2026 Championship Standings (GLOBAL)")

[BADGE — right, 9px mono amber-300, amber bg, amber border, rounded-full]
  Jan 1 Hall of Fame Payout Eligible

[TABLE — rounded-2xl, slate-800/60 border, slate-950/80 bg]

  [HEADER ROW — 12-col grid, slate-950 bg, slate-500 10px bold uppercase tracking-wider]
    Col 1 (1 span):  Rank
    Col 2 (3 span):  Contender Name
    Col 3 (2 span):  User Tag
    Col 4 (1 span):  Games          (right-aligned)
    Col 5 (2 span):  Wallet Chips   (right-aligned)
    Col 6 (2 span):  Projected Jan 1 Payout  (right-aligned)
    Col 7 (1 span):  HOF            (right-aligned)

  [ROWS — each row: 12-col grid, divided by slate-900 borders]
  (Note: Contenders are sorted by walletChips descending and re-ranked 1..N)
  (Max height: 60vh, scrollable)

  ┌──────┬──────────────────────────┬────────────┬────────┬──────────────┬────────────────────────────────────────┬───────────────────────┐
  │ Rank │ Contender Name           │ User Tag   │ Games  │ Wallet Chips │ Projected Jan 1 Payout                 │ HOF                   │
  ├──────┼──────────────────────────┼────────────┼────────┼──────────────┼────────────────────────────────────────┼───────────────────────┤
  │ 🥇   │ 🇮🇳 Hari                 │ #IND-001   │ 4,820  │ 1,00,00,000c│ 5,00,000 Chips + 👑 2026 WORLD CHAMPION│ 🏅 INDUCTED JAN 1     │
  │      │ [APEX] · APAC            │            │        │              │                                        │                       │
  ├──────┼──────────────────────────┼────────────┼────────┼──────────────┼────────────────────────────────────────┼───────────────────────┤
  │ 🥈   │ 🇮🇳 ApexViper_IND        │ #IND-002   │ 6,210  │ 94,00,000c  │ 2,500,000 Chips + 🥈 ARENA OVERLORD    │ 🏅 INDUCTED JAN 1     │
  │      │ [APEX] · APAC            │            │        │              │                                        │                       │
  ├──────┼──────────────────────────┼────────────┼────────┼──────────────┼────────────────────────────────────────┼───────────────────────┤
  │ 🥉   │ 🇺🇸 VenomKing_US         │ #USA-882   │ 5,890  │ 88,00,000c  │ 2,500,000 Chips + 🥈 ARENA OVERLORD    │ 🏅 INDUCTED JAN 1     │
  │      │ [APEX] · NA              │            │        │              │                                        │                       │
  ├──────┼──────────────────────────┼────────────┼────────┼──────────────┼────────────────────────────────────────┼───────────────────────┤
  │ #4   │ 🇰🇷 K-Snake_Master       │ #KOR-114   │ 4,120  │ 82,00,000c  │ 2,500,000 Chips + 🥈 ARENA OVERLORD    │ 🏅 INDUCTED JAN 1     │
  │      │ [NINJA] · APAC           │            │        │              │                                        │                       │
  ├──────┼──────────────────────────┼────────────┼────────┼──────────────┼────────────────────────────────────────┼───────────────────────┤
  │ #5   │ 🇯🇵 ShadowSlinker_JP     │ #JPN-309   │ 3,940  │ 76,00,000c  │ 2,500,000 Chips + 🥈 ARENA OVERLORD    │ 🏅 INDUCTED JAN 1     │
  │      │ [NINJA] · APAC           │            │        │              │                                        │                       │
  ├──────┼──────────────────────────┼────────────┼────────┼──────────────┼────────────────────────────────────────┼───────────────────────┤
  │ #6   │ 🇩🇪 KaiserSlayer_DE      │ #GER-901   │ 5,100  │ 69,00,000c  │ 2,500,000 Chips + 🥈 ARENA OVERLORD    │ 🏅 INDUCTED JAN 1     │
  │      │ [WAR] · EU               │            │        │              │                                        │                       │
  ├──────┼──────────────────────────┼────────────┼────────┼──────────────┼────────────────────────────────────────┼───────────────────────┤
  │ #7   │ 🇧🇷 SambaVenom_BR        │ #BRA-502   │ 4,890  │ 64,00,000c  │ 2,500,000 Chips + 🥈 ARENA OVERLORD    │ 🏅 INDUCTED JAN 1     │
  │      │ [BRZ] · LATAM            │            │        │              │                                        │                       │
  ├──────┼──────────────────────────┼────────────┼────────┼──────────────┼────────────────────────────────────────┼───────────────────────┤
  │ #8   │ 🇬🇧 BritStriker_UK       │ #UK-402    │ 3,820  │ 58,00,000c  │ 2,500,000 Chips + 🥈 ARENA OVERLORD    │ 🏅 INDUCTED JAN 1     │
  │      │ [ROYAL] · EU             │            │        │              │                                        │                       │
  ├──────┼──────────────────────────┼────────────┼────────┼──────────────┼────────────────────────────────────────┼───────────────────────┤
  │ #9   │ 🇮🇳 CobraMaster_IN       │ #IND-8821  │ 2,950  │ 52,00,000c  │ 2,500,000 Chips + 🥈 ARENA OVERLORD    │ 🏅 INDUCTED JAN 1     │
  │      │ [PHNX] · APAC            │            │        │              │                                        │                       │
  ├──────┼──────────────────────────┼────────────┼────────┼──────────────┼────────────────────────────────────────┼───────────────────────┤
  │ #10  │ 🇺🇸 Dragon_Slayer_US     │ #USA-104   │ 4,100  │ 49,00,000c  │ 2,500,000 Chips + 🥈 ARENA OVERLORD    │ 🏅 INDUCTED JAN 1     │
  │      │ [APEX] · NA              │            │        │              │                                        │                       │
  ├──────┼──────────────────────────┼────────────┼────────┼──────────────┼────────────────────────────────────────┼───────────────────────┤
  │ #11  │ 🇮🇳 Delhi_King            │ #IND-003   │ 2,100  │ 45,00,000c  │ 1,000,000 Chips + 🥉 ELITE MASTER      │ 🏅 INDUCTED JAN 1     │
  │      │ [PHNX] · APAC            │            │        │              │                                        │                       │
  ├──────┼──────────────────────────┼────────────┼────────┼──────────────┼────────────────────────────────────────┼───────────────────────┤
  │ #12  │ 🇺🇸 Cyber_Wolf_US        │ #USA-102   │ 3,200  │ 41,00,000c  │ 1,000,000 Chips + 🥉 ELITE MASTER      │ 🏅 INDUCTED JAN 1     │
  │      │ [CYBER] · NA             │            │        │              │                                        │                       │
  ├──────┼──────────────────────────┼────────────┼────────┼──────────────┼────────────────────────────────────────┼───────────────────────┤
  │ #13  │ 🇯🇵 Ronin_Slayer_JP      │ #JPN-881   │ 1,800  │ 38,00,000c  │ 1,000,000 Chips + 🥉 ELITE MASTER      │ 🏅 INDUCTED JAN 1     │
  │      │ [NINJA] · APAC           │            │        │              │                                        │                       │
  ├──────┼──────────────────────────┼────────────┼────────┼──────────────┼────────────────────────────────────────┼───────────────────────┤
  │ #14  │ 🇮🇳 Challenger_Viper     │ #IND-902   │ 850    │ 12,00,000c  │ 250,000 Chips + 🛡️ CONTENDER           │ 🏅 INDUCTED JAN 1     │
  │      │ [VPR] · APAC             │            │        │              │                                        │                       │
  └──────┴──────────────────────────┴────────────┴────────┴──────────────┴────────────────────────────────────────┴───────────────────────┘

  [IF registered && player exists — player row injected at current chip-sorted position]
    Player row is highlighted: amber-500/10 bg, amber-500 left border (2px)
    Rank column shows: [rank emoji/number] [badge "YOU" — 9px amber bg, black text, bold]
    Name: [countryFlag] [DYNAMIC: player.name]
    Subtitle: [[DYNAMIC: player.clanTag || 'VPR']] · [DYNAMIC: computed region]
    User Tag: #[DYNAMIC: player.userTag]
    Games: [DYNAMIC: gamesPlayed]
    Wallet Chips: [DYNAMIC: fmtINR(player.bankedChips)]c
    Projected Prize: "Hall of Fame Qualifying Contender"
    HOF: 🏅 INDUCTED JAN 1

  [IF no contenders match current filters (EMPTY STATE)]:
    [TEXT — centered, xs slate-500] "No contenders match the current filters."

---

## TOAST NOTIFICATIONS (triggered by button clicks)

  [ON "JOIN 2026 CHAMPIONSHIP NOW" click]:
    🏆 REGISTERED FOR 2026 ANNUAL VENOM WORLD CHAMPIONSHIP! You have 10,000 matches limit. Good luck!
    (type: success)

  [ON "PLAY CHAMPIONSHIP MATCH" click — if not registered]:
    Register first to play championship matches!
    (type: error)

  [ON "PLAY CHAMPIONSHIP MATCH" click — if registered but cap reached]:
    You have reached the 10,000 championship match cap for this year!
    (type: error)

  [ON "PLAY CHAMPIONSHIP MATCH" click — if registered and cap not reached]:
    Entering Championship High-Stakes Arena match...
    (type: info)

---

## COMPLETE CONFIG DATA REFERENCE

--- CHAMPIONSHIP_PRIZE_TIERS (game-config.ts lines 723–760) ---

| # | category      | title                                | badge                                  | chipsReward | crownTitle                    | itemReward                              | hallOfFameInduction |
|---|---------------|--------------------------------------|----------------------------------------|-------------|-------------------------------|-----------------------------------------|---------------------|
| 1 | RANK_1        | 👑 RANK 1: GRAND CHAMPION            | 🥇 1st Place (World / Region / Country)| 5,000,000   | 👑 2026 WORLD VENOM CHAMPION  | Mythic Golden Dragon Skin & World Crown | true                |
| 2 | RANK_2_10     | 🥈 RANKS 2–10: TOP 10 LEGENDS        | 🥈 Top 10 Legends                      | 2,500,000   | 🥈 VENOM ARENA OVERLORD       | Platinum Armor Skin & Crown Effect      | true                |
| 3 | RANK_11_50    | 🥉 RANKS 11–50: ELITE MASTERS        | 🥉 Ranks 11–50 Masters                 | 1,000,000   | 🥉 ARENA ELITE MASTER         | Diamond Trail Effect & Master Crest     | true                |
| 4 | RANK_51_100   | 🛡️ RANKS 51–100: CHAMPIONSHIP CONTENDERS | 🛡️ Ranks 51–100 Contenders          | 250,000     | 🛡️ CHAMPIONSHIP CONTENDER     | 2,500 Season Pass XP & Contender Badge | true                |

--- INITIAL_CONTENDERS (game-config.ts lines 774–789) ---

| Rank (re-sorted) | name             | userTag   | gamesPlayed | walletChips | clanTag | country | region | projectedPrize                                |
|------------------|------------------|-----------|-------------|-------------|---------|---------|--------|-----------------------------------------------|
| 1                | Hari             | #IND-001  | 4,820       | 10,000,000  | APEX    | IN      | APAC   | 5,00,000 Chips + 👑 2026 WORLD CHAMPION     |
| 2                | ApexViper_IND    | #IND-002  | 6,210       | 9,400,000   | APEX    | IN      | APAC   | 2,500,000 Chips + 🥈 ARENA OVERLORD          |
| 3                | VenomKing_US     | #USA-882  | 5,890       | 8,800,000   | APEX    | US      | NA     | 2,500,000 Chips + 🥈 ARENA OVERLORD          |
| 4                | K-Snake_Master   | #KOR-114  | 4,120       | 8,200,000   | NINJA   | KR      | APAC   | 2,500,000 Chips + 🥈 ARENA OVERLORD          |
| 5                | ShadowSlinker_JP | #JPN-309  | 3,940       | 7,600,000   | NINJA   | JP      | APAC   | 2,500,000 Chips + 🥈 ARENA OVERLORD          |
| 6                | KaiserSlayer_DE  | #GER-901  | 5,100       | 6,900,000   | WAR     | DE      | EU     | 2,500,000 Chips + 🥈 ARENA OVERLORD          |
| 7                | SambaVenom_BR    | #BRA-502  | 4,890       | 6,400,000   | BRZ     | BR      | LATAM  | 2,500,000 Chips + 🥈 ARENA OVERLORD          |
| 8                | BritStriker_UK   | #UK-402   | 3,820       | 5,800,000   | ROYAL   | GB      | EU     | 2,500,000 Chips + 🥈 ARENA OVERLORD          |
| 9                | CobraMaster_IN   | #IND-8821 | 2,950       | 5,200,000   | PHNX    | IN      | APAC   | 2,500,000 Chips + 🥈 ARENA OVERLORD          |
| 10               | Dragon_Slayer_US | #USA-104  | 4,100       | 4,900,000   | APEX    | US      | NA     | 2,500,000 Chips + 🥈 ARENA OVERLORD          |
| 11               | Delhi_King       | #IND-003  | 2,100       | 4,500,000   | PHNX    | IN      | APAC   | 1,000,000 Chips + 🥉 ELITE MASTER            |
| 12               | Cyber_Wolf_US    | #USA-102  | 3,200       | 4,100,000   | CYBER   | US      | NA     | 1,000,000 Chips + 🥉 ELITE MASTER            |
| 13               | Ronin_Slayer_JP  | #JPN-881  | 1,800       | 3,800,000   | NINJA   | JP      | APAC   | 1,000,000 Chips + 🥉 ELITE MASTER            |
| 14               | Challenger_Viper | #IND-902  | 850         | 1,200,000   | VPR     | IN      | APAC   | 250,000 Chips + 🛡️ CONTENDER                 |

Note: Initial ranks in config (1,2,3,4,5,6,7,8,9,10,11,12,15,52) are OVERRIDDEN at runtime.
The component sorts all contenders by walletChips descending and re-assigns sequential ranks 1..N.

--- HALL_OF_FAME_TIERS (game-config.ts lines 650–699) ---
(Not used in the Championships panel directly — used by the Hall of Fame panel.)

| id         | name                                  | chips      | badge                     | firstAchiever                                       | totalAchieversCount |
|------------|---------------------------------------|------------|---------------------------|-----------------------------------------------------|---------------------|
| t-1lakh    | 1 LAKH CHIPS MILESTONE                | 100,000    | 🥉 Bronze Elite           | Rookie_Striker, #IND-104, IN, 02 Jan 2026 09:15 AM UTC  | 14,209              |
| t-5lakh    | 5 LAKH CHIPS MILESTONE                | 500,000    | 🥈 Silver Commander       | Viper_Zero, #USA-402, US, 07 Jan 2026 02:40 PM UTC    | 4,810               |
| t-10lakh   | 10 LAKH CHIPS (1 MILLION) MILESTONE   | 1,000,000  | 🥇 Gold Apex Vanguard     | K-Snake_Master, #KOR-114, KR, 11 Jan 2026 06:30 AM SGT| 1,290               |
| t-25lakh   | 25 LAKH CHIPS MILESTONE               | 2,500,000  | 💎 Platinum Sovereign     | Apex_Viper, #USA-882, US, 16 Jan 2026 11:10 PM UTC    | 312                 |
| t-50lakh   | 50 LAKH CHIPS MILESTONE               | 5,000,000  | 🔮 Diamond Warlord        | Shadow_Ninja, #JPN-309, JP, 19 Jan 2026 08:22 PM JST  | 64                  |
| t-1crore   | 1 CRORE CHIPS (10,000,000) LEGENDARY   | 10,000,000 | 👑 OMEGA IMMORTAL GOD     | Hari, #IND-001, IN, 23 Jan 2026 05:00 PM WST          | 3                   |

--- SEASON PASS DATA (game-config.ts lines 1029–1082) ---
(Not used in the Championships panel — used by the Season Pass panel.)

**ELITE_PASS_COST:** 100,000 chips

**COSMETIC_FREE_REWARDS (20 items):**
| # | title                       | category       | icon |
|---|-----------------------------|----------------|------|
| 1 | Neon Viper Badge            | Badge          | 🏷️  |
| 2 | Cyber Pulse Trail FX        | Tail FX        | ⚡   |
| 3 | Green Venom Frame           | Avatar Border  | 🖼️  |
| 4 | Serpent Whispers SFX        | Kill Sound     | 🔊   |
| 5 | Genesis Pioneer Title       | Title          | 🎖️  |
| 6 | Bio-Hazard Emote Spray      | Spray          | 🎨   |
| 7 | Emerald Tail Glow           | Tail FX        | ✨   |
| 8 | Cobra Strike Taunt          | Emote          | 🐍   |
| 9 | Cyber Samurai Border        | Avatar Border  | ⚔️   |
| 10| Toxic Acid DNA Skin         | DNA Skin       | 🧪   |
| 11| Quantum Grid Avatar         | Profile Icon   | 🌐   |
| 12| Apex Vanguard Emblem        | Badge          | 🛡️  |
| 13| Neon Matrix Audio FX        | Kill Sound     | 🎵   |
| 14| Plasma Arc Tail Trail       | Tail FX        | ⚡   |
| 15| Cyber Warlord Title         | Title          | 👑   |
| 16| Solar Flare Emote           | Emote          | ☀️   |
| 17| Titanium Viper Skin         | DNA Skin       | 🦾   |
| 18| Cyber Void Frame            | Avatar Border  | 🌌   |
| 19| Genesis Immortal Badge      | Badge          | 🏆   |
| 20| Genesis Master DNA Skin     | DNA Skin       | 🐉   |

**COSMETIC_ELITE_REWARDS (20 items):**
| # | title                        | category       | icon | skinName            |
|---|------------------------------|----------------|------|---------------------|
| 1 | Cyber Serpent God Skin       | DNA Skin       | 👑   | Cyber Serpent God   |
| 2 | Hyper Plasma Arc FX          | Tail FX        | ⚡   | —                   |
| 3 | Cyber Siren Roar SFX         | Kill Sound     | 🔊   | —                   |
| 4 | Royal Throne Taunt           | Emote          | 🛋️  | —                   |
| 5 | 1 Crore Immortal Badge       | Badge          | 🎖️  | —                   |
| 6 | Modular Venom DNA Skin       | DNA Skin       | 🐍   | Modular Venom DNA   |
| 7 | Holo-Shield Tail Aura        | Tail FX        | 🛡️  | —                   |
| 8 | Golden Viper Frame           | Avatar Border  | 🖼️  | —                   |
| 9 | Galactic Overlord Title      | Title          | 🌌   | —                   |
| 10| Dark Matter DNA Skin         | DNA Skin       | 🌑   | Dark Matter DNA     |
| 11| Celestial Fire Trail         | Tail FX        | 🔥   | —                   |
| 12| Apex Predator Emblem         | Badge          | 🦅   | —                   |
| 13| Cyber Phantom Skin           | DNA Skin       | 👻   | Cyber Phantom       |
| 14| Supernova Explosion SFX      | Kill Sound     | 💥   | —                   |
| 15| Emperor's Crown Frame        | Avatar Border  | 👑   | —                   |
| 16| Diamond Viper DNA Skin       | DNA Skin       | 💎   | Diamond Viper       |
| 17| Hyper-Drive Trail FX         | Tail FX        | ⚡   | —                   |
| 18| Genesis Sovereign Title      | Title          | 📜   | —                   |
| 19| Infinite Horizon Frame       | Avatar Border  | 🎆   | —                   |
| 20| Serpent God Ascended         | DNA Skin       | 🌟   | Serpent God Ascended|

--- SHOWCASE_CLIPS / SAMPLE_CLIPS (game-config.ts lines 1101–1141) ---
(Not used in the Championships panel — used by the Clips Showcase panel.)

| id     | title                                                       | creator       | tag        | country | platform | extractedChips | upvotes | dateStr     | tags                        |
|--------|-------------------------------------------------------------|---------------|------------|---------|----------|----------------|---------|-------------|-----------------------------|
| clip-1 | 1,00,00,000 CHIPS EXTRACTION CLUTCH IN TIER-05 ARENA! 🔥  | Hari          | #IND-001   | IN      | YouTube  | 10,000,000     | 4,210   | 23 Jan 2027 | Crore Milestone, Tier-05, High Stakes |
| clip-2 | SOLO 1V3 VIPER TRAP ON EXTRACTION ZONE BOUNDARY 🐍        | Apex_Viper    | #USA-882   | US      | Twitch   | 2,500,000      | 1,890   | 25 Jan 2027 | 1v3 Clutch, Platinum Tier    |
| clip-3 | NINJA SNAKE DNA SKIN SHOWCASE & SPEED EXTRACTION ⚡        | Shadow_Ninja  | #JPN-309   | JP      | YouTube  | 5,000,000      | 1,240   | 22 Jan 2027 | Skin Showcase, Speed Run     |

--- SOCIAL DATA (game-config.ts lines 794–925) ---
(Not used in the Championships panel — used by the Social panel.)

**INITIAL_FRIENDS (4 entries):**
| id  | name           | userTag   | status    | currentArenaId | currentArenaName      | level | skinColor | giftSent | giftReceived |
|-----|----------------|-----------|-----------|----------------|-----------------------|-------|-----------|----------|--------------|
| f-1 | ApexViper      | APEX-1029 | online    | tier-1         | Training Pit          | 42    | #10b981   | false    | true         |
| f-2 | ShadowSlinker  | SLNK-9281 | in-match  | tier-2         | High Stakes Lounge   | 18    | #a855f7   | false    | false        |
| f-3 | CoinGobbler    | COIN-5432 | offline   | —              | —                     | 29    | #eab308   | true     | false        |
| f-4 | VenomKing      | VNOM-0001 | idle      | —              | —                     | 55    | #ef4444   | false    | false        |

**INITIAL_RIVALS (3 entries):**
| id  | name           | userTag   | status    | currentArenaName                        | level | timesKilledByYou | timesKilledYou | lastEncounterDate  |
|-----|----------------|-----------|-----------|-----------------------------------------|-------|------------------|----------------|---------------------|
| r-1 | VenomKing      | VNOM-0001 | in-match  | Venom Pit (5,000 Buy-In)               | 55    | 2                | 5              | Today, 2:15 PM      |
| r-2 | ShadowSlinker  | SLNK-9281 | online    | High Stakes Lounge (1,000 Buy-In)       | 38    | 4                | 1              | Yesterday, 8:40 PM   |
| r-3 | ApexViper      | APEX-1029 | in-match  | Extreme Arena (25,000 Buy-In)           | 42    | 1                | 3              | 2 days ago          |

**GLOBAL_COMMUNITY_PLAYERS (12 entries):**
| name            | userTag   | country | level | chips      | skinColor | status    |
|-----------------|-----------|---------|-------|------------|-----------|-----------|
| CobraMaster_IN  | IND-8821  | IN      | 48    | 4,500,000  | #10b981   | online    |
| Viper_Syndicate | IND-1049  | IN      | 52    | 12,500,000 | #eab308   | in-match  |
| Mamba_Strike    | USA-4012  | US      | 39    | 2,100,000  | #ef4444   | online    |
| Tokyo_Slinker   | JPN-9012  | JP      | 44    | 3,800,000  | #a855f7   | idle      |
| Seoul_Apex      | KOR-2290  | KR      | 50    | 8,900,000  | #3b82f6   | online    |
| London_Viper    | GBR-5012  | GB      | 35    | 1,800,000  | #f43f5e   | in-match  |
| Dragon_Cobra    | IND-2201  | IN      | 41    | 2,900,000  | #06b6d4   | online    |
| Phoenix_Venom   | BRA-7712  | BR      | 33    | 950,000    | #84cc16   | offline   |
| Berlin_Predator | DEU-3321  | DE      | 46    | 5,400,000  | #ec4899   | online    |
| Sydney_Strike   | AUS-6612  | AU      | 37    | 1,400,000  | #6366f1   | idle      |
| Zenith_Slither  | CAN-8840  | CA      | 28    | 620,000    | #14b8a6   | online    |
| Paris_Serpent   | FRA-1190  | FR      | 38    | 1,950,000  | #8b5cf6   | offline   |

**PUBLIC_CLANS (2 entries):**
| id  | name               | tag  | emblem | level | bankedChips | description                                                | members                                                              |
|-----|--------------------|------|--------|-------|-------------|------------------------------------------------------------|----------------------------------------------------------------------|
| c-1 | Apex Predators     | APEX | 🦅     | 8     | 15,000      | Elite hunters only. Extract with 100+ chips or get kicked. | VenomKing (Leader, Lv55, 5000c), ApexViper (Co-Leader, Lv42, 3500c), StrikeFast (Viper, Lv22, 1200c) |
| c-2 | Slinky Syndicate   | SLYK | 🐍     | 5     | 4,500       | Casual chip collectors. Let's grow together!               | CozyCobra (Leader, Lv31, 2000c), ShadowSlinker (Viper, Lv18, 800c), GoldHoarder (Viper, Lv15, 500c) |

**SOCIAL_COUNTRY_FILTER (11 options):**
| code | name            | flag |
|------|-----------------|------|
| ALL  | All Countries   | 🌐   |
| IN   | India           | 🇮🇳  |
| US   | United States   | 🇺🇸  |
| JP   | Japan           | 🇯🇵  |
| KR   | South Korea     | 🇰🇷  |
| GB   | United Kingdom  | 🇬🇧  |
| DE   | Germany         | 🇩🇪  |
| BR   | Brazil          | 🇧🇷  |
| AU   | Australia       | 🇦🇺  |
| CA   | Canada          | 🇨🇦  |
| FR   | France          | 🇫🇷  |

---

## COMPONENT CONSTANTS (championships.tsx)

| Constant              | Value                     | Usage                                   |
|-----------------------|---------------------------|-----------------------------------------|
| MAX_GAMES             | 10,000                    | Match cap per year                     |
| DEFAULT_GAMES_PLAYED  | 34                        | Initial games played for display       |
| CHAMPIONSHIP_END_DATE | 2027-01-01T00:00:00Z      | Countdown target                       |
| REGIONS               | [see below]               | Regional scope dropdown options        |
| COUNTRIES_FILTER      | [see below]               | National scope dropdown options        |

**REGIONS (5 options):**
| code  | name                     | flag |
|-------|--------------------------|------|
| ALL   | All Regions              | 🌐   |
| APAC  | Asia-Pacific (APAC)      | 🌏   |
| NA    | North America (NA)       | 🌎   |
| EU    | Europe (EU)              | 🌍   |
| LATAM | Latin America (LATAM)    | 💃   |

**COUNTRIES_FILTER (8 options):**
| code | name            | flag |
|------|-----------------|------|
| ALL  | All Countries   | 🌐   |
| IN   | India           | 🇮🇳  |
| US   | United States   | 🇺🇸  |
| JP   | Japan           | 🇯🇵  |
| KR   | South Korea     | 🇰🇷  |
| DE   | Germany         | 🇩🇪  |
| BR   | Brazil          | 🇧🇷  |
| GB   | United Kingdom  | 🇬🇧  |

---

## BEHAVIOR NOTES

1. **Rank re-sorting**: INITIAL_CONTENDERS initial `rank` field is ignored. The component sorts all contenders (including the injected player) by `walletChips` descending and reassigns sequential ranks 1..N.
2. **Player injection**: When registered, the player is appended to the contender list with a default rank of 142 (overridden by sorting), `projectedPrize: 'Hall of Fame Qualifying Contender'`, and `clanTag` defaulting to `'VPR'` if player.clanTag is falsy.
3. **Chip formatting**: All chip amounts use `fmtINR()` which is `toLocaleString('en-IN')` — Indian number formatting (e.g., 5,00,000 not 500,000).
4. **Country flags**: Resolved via `countryFlag(code)` from COUNTRIES lookup table (returns 🏳️ if not found).
5. **Rank medals**: Rank 1 = 🥇, Rank 2 = 🥈, Rank 3 = 🥉, Rank 4+ = #N (mono bold slate-400).
6. **"YOU" badge**: Appears next to the rank number for the current player's row (9px amber bg, black text).
7. **HOF badge**: Every row shows 🏅 INDUCTED JAN 1 (yellow-300 text on yellow-500/10 bg, rounded-full) — there is no conditional logic to hide it for non-qualifying ranks.
8. **Countdown**: Live-updating every 1 second via setInterval.
9. **Toast notifications**: Triggered via the `notify()` helper — not inline messages.
