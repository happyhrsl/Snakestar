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
