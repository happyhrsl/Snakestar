# Shop & Lab Panel — Full Screen Content Walkthrough

**File:** `/tmp/venom-arena/src/components/panels/cosmetics-shop.tsx` (2306 lines)
**Data source:** `/tmp/venom-arena/src/lib/game-config.ts` — `ALL_COSMETICS`, `PALETTE_COLORS`, `SLITHER_PRESETS`

---

## Pre-Render States

### [IF loading === true]

```
[6 x rounded-2xl skeleton bars, each h-44, with pulse animation]
```
No text. No labels. Pure loading placeholder.

### [IF player === null (not signed in)]

```
┌──────────────────────────────────────┐
│                                      │
│          Not signed in.              │
│                                      │
└──────────────────────────────────────┘
```
- Text: `Not signed in.`
- Style: 12px, slate-400, centered

---

## Main Panel: Signed-In, Fully Loaded

### Panel Container

- Outer div: `bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl`
- Decorative background blurs (non-interactive):
  - Top-right: purple-500/5, 320×320px, rounded-full, blur-3xl
  - Bottom-left: indigo-500/5, 240×240px, rounded-full, blur-3xl

---

## HEADER SECTION

```
┌─────────────────────────────────────────────────────────────────┐
│ 🛍️  Identity Workshop & Skin Gallery           [🎨 Skin & Eff.. │
│      Browse and equip real-time wiggling skins,    [🧬 Genetic..]│
│      luminous laser trails, or customize your own               │
│      custom repeating venom snake DNA blueprint!                │
├─────────────────────────────────────────────────────────────────┤
```

#### Left side:

- **H2:** `🛍️  Identity Workshop & Skin Gallery`
  - 20px bold, white, tracking-tight, ShoppingBag icon (indigo-400)
- **Subtitle paragraph:** `Browse and equip real-time wiggling skins, luminous laser trails, or customize your own custom repeating venom snake DNA blueprint!`
  - 12px, slate-400

#### Right side — View-Mode Tabs (pill toggle):

- Container: `bg-slate-950 p-1 rounded-xl border border-slate-800/80`
- **Tab 1:** `🎨 Skin & Effect Gallery`
  - [IF shopView === 'presets']: `bg-indigo-600 text-white shadow`
  - [IF shopView !== 'presets']: `text-slate-400 hover:text-slate-200`
- **Tab 2:** `🧬 Genetic Pattern Lab`
  - [IF shopView === 'editor']: `bg-purple-600 text-white shadow`
  - [IF shopView !== 'editor']: `text-slate-400 hover:text-slate-200`

---

## VIEW 1: Skin & Effect Gallery (`shopView === 'presets'`)

### Category Filter Tabs

```
🌈 All Items   🐍 Ready Presets (Free!)   ✨ Premium Shop   💫 Laser Trails   💥 Death Novas   🇺🇸 Flags   🏆 Profile Banners
```

- 7 buttons in a flex-wrap row, gap-2
- [IF activeCategory matches]: `bg-slate-800 text-white border border-slate-700 shadow-md font-bold`
- [IF not active]: `bg-slate-950 text-slate-400 hover:text-slate-200 border border-transparent`

| Tab ID  | Label                     |
|---------|---------------------------|
| all     | 🌈 All Items              |
| presets | 🐍 Ready Presets (Free!)  |
| premium | ✨ Premium Shop            |
| trails  | 💫 Laser Trails            |
| deaths  | 💥 Death Novas             |
| flags   | 🇺🇸 Flags                   |
| banners | 🏆 Profile Banners         |

### Gallery Grid

- 3-column responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`)
- Items shown depend on activeCategory filter:
  - `all` → shows ALL sections (presets + premium + trails + deaths + flags + banners)
  - `presets` → only presets section
  - `premium` → only premium skins
  - `trails` → only trail section
  - `deaths` → only death section
  - `flags` → only flags section
  - `banners` → only banners section

---

## SECTION A: Ready Presets (Free!) — 20 Presets

Each card is a clickable `PresetCard` div:

#### Card Structure (PresetCard):

```
┌─────────────────────────────────┐
│  [Active badge IF active]      │
│  ┌─────────────────────────┐   │
│  │  [Animated Canvas 180×80]│   │
│  │  (10-segment wiggling   │   │
│  │   snake preview)        │   │
│  └─────────────────────────┘   │
│      🐟 The Fish Snake          │
│  Aquatic scales with hydro-     │
│  dynamic dorsal fins and...     │
│  ┌─────────────────────────┐   │
│  │ [Equipped] or            │   │
│  │ [Equip Preset]           │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

- [IF active === true]:
  - Badge top-right: `✓ Active` (indigo-500/15 bg, indigo-400 text, indigo-500/30 border)
  - Button: `EQUIPPED` (indigo-950/40 bg, indigo-400 text, indigo-500/20 border)
  - Card border: `border-indigo-500 shadow-lg shadow-indigo-950/60 ring-1 ring-indigo-500/25`
- [IF active === false]:
  - No badge
  - Button: `EQUIP PRESET` (slate-900 bg, slate-300 text → hover: indigo-600 bg, white text)
  - Card border: `border-slate-800 hover:border-slate-700`

#### Full Preset List:

| # | Emoji | Name | Category | Description | Colors | Shape | Taper | Glow |
|---|-------|------|----------|-------------|--------|-------|-------|------|
| 1 | 🐟 | The Fish Snake | Cyber | Aquatic scales with hydrodynamic dorsal fins and bubble bioluminescence. | Cyan, Blue, Sky, Dark Blue | crystal | wave | true |
| 2 | 🦁 | The Lion Snake | Classic | Golden apex mane headpiece with furious amber predator scales. | Gold, Amber Dark, Orange, Brown | dragon | heavy | true |
| 3 | 🏍️ | The Motorbike Snake | Cyber | Chrome exhaust head, asphalt dark body segments, and burnout smoke trail. | Blue, Pitch Black, Slate Gray, Pitch Black | armored | heavy | true |
| 4 | 🪙 | The Coin Snake | Classic | Gold dollar medallion crown with stacked casino chip coin segments. | Yellow, Amber, Gold, Amber Dark | obsidian | natural | true |
| 5 | 🐝 | Bumblebee stripe | Classic | Classic yellow and black stripes reminiscent of a honey bee. | Gold, Pitch Black, Gold, Pitch Black | smooth | natural | false |
| 6 | 🇺🇸 | Patriot Streamer | Flags | Brave red, white, and blue colors streaming in perfect unison. | Red, White, Blue, White | smooth | natural | true |
| 7 | 🍉 | Watermelon Slicer | Classic | Sweet pink flesh bordered by alternating deep forest green scales. | Green, Green, Pink, Pink | smooth | wave | false |
| 8 | 🐯 | Tiger Shifter | Classic | Dangerous orange and obsidian bands armed with body-tapering spikes. | Orange, Pitch Black, Orange, Pitch Black | dragon | natural | false |
| 9 | 🍬 | Mint Candy | Classic | Sweet spearmint and white swirl nodes radiating clean aura. | Emerald, White, Emerald, White | smooth | uniform | true |
| 10 | 🦄 | Rainbow Unicorn | Classic | Full visible spectrum of pulsing diamond-crystal nodes. | Red, Orange, Gold, Green, Cyan, Indigo, Purple | crystal | wave | true |
| 11 | 🇩🇪 | Germany Banner | Flags | Bold black, red, and golden stripes representing national pride. | Pitch Black, Red, Gold | smooth | natural | false |
| 12 | 🇧🇷 | Brazil Samba | Flags | Vibrant green and gold diamond nodes reflecting carnival energy. | Green, Gold, Blue, Green | crystal | natural | true |
| 13 | 🇫🇷 | France Tricolore | Flags | Symmetric blue, white, and red bands of the French Republic. | Blue, White, Red | smooth | natural | false |
| 14 | 🏳️‍🌈 | Pride Rainbow | Flags | Classic rainbow flags celebrating diversity and inclusion. | Red, Orange, Gold, Green, Blue, Purple | smooth | uniform | true |
| 15 | 🔥 | Solar Flare | Cyber | Armor scales colored in blazing gold, solar orange, and furnace red. | Gold, Orange, Red, Orange | dragon | heavy | true |
| 16 | 🌌 | Cosmic Nebula | Cyber | Deep cosmic space colors with pulsing neon aurora bioluminescence. | Indigo, Purple, Pink, Blue | smooth | wave | true |
| 17 | 🌋 | Lava Dreadnought | Cyber | Armored obsidian spikes interspaced with blistering crimson core nodes. | Red, Slate, Red, Pitch Black | obsidian | heavy | true |
| 18 | 💻 | Tron Grid | Cyber | Futuristic cyan lines on dark background representing grid patterns. | Cyan, Pitch Black, Cyan, Pitch Black | armored | uniform | true |
| 19 | 🤖 | Gundam Mech | Cyber | Tactical ironclad grey plates accented with heavy yellow and blue rocket spikes. | Slate, Blue, White, Gold | dragon | heavy | true |
| 20 | 🐉 | Golden Dragon | Classic | Shining royal gold armored spike scales fit for mythical emperors. | Gold, Crimson, Gold, Crimson | dragon | heavy | true |

---

## SECTION B: Premium Shop — 13 Manufactured Skins

Each card is a `SkinCard` (accent="emerald").

#### Card Structure (SkinCard):

```
┌─────────────────────────────────┐
│  [Active badge IF active]      │
│  OR                             │
│  [🔒 Locked badge IF !unlocked] │
│  ┌─────────────────────────┐   │
│  │  [Animated Canvas 180×80]│   │
│  │  (10-segment wiggling   │   │
│  │   snake preview)        │   │
│  └─────────────────────────┘   │
│      🐍 Toxic Slime             │
│  The standard issue bio-        │
│  luminescent skin.              │
│  ┌─────────────────────────┐   │
│  │ [EQUIPPED] or             │   │
│  │ [EQUIP SKIN] or          │   │
│  │ [✨ Unlock (40 Chips)]   │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

#### Button States (SkinCard):

1. **[IF active === true]:** `EQUIPPED` — emerald-950/40 bg, emerald-400 text, emerald-500/20 border
2. **[IF active === false AND unlocked === true]:** `EQUIP SKIN` — slate-900 bg, slate-300 text → hover: emerald-600 bg, white text
3. **[IF active === false AND unlocked === false AND canAfford === true]:** `✨ Unlock ([DYNAMIC: item.cost] Chips)` — amber-500/10 bg, amber-400 text, amber-500/20 border → hover: amber-500 bg, slate-950 text
4. **[IF active === false AND unlocked === false AND canAfford === false]:** `✨ Unlock ([DYNAMIC: item.cost] Chips)` — slate-900/40 bg, slate-500 text, cursor-not-allowed

#### Badge States (SkinCard):

- **Active badge:** `✓ Active` (emerald variant — emerald-500/15 bg, emerald-400 text, emerald-500/30 border)
- **Locked badge:** `🔒 Locked` (amber-500/10 bg, amber-400 text, amber-500/20 border)

#### Full Premium Skin List:

| # | ID | Emoji | Name | Cost (Chips) | Description | Pattern |
|---|-----|-------|------|-------------|-------------|
| 1 | skin-default | 🐍 | Toxic Slime | 0 | The standard issue bio-luminescent skin. | — |
| 2 | skin-venom | 👾 | Venom Stryker | 40 | A striking royal purple skin designed to intimidate. | — |
| 3 | skin-cyber | 🤖 | Cyber Grid | 100 | Futuristic grid design that flows like computer data. | — |
| 4 | skin-fish | 🐟 | The Fish Snake | 200 | Aquatic scales with hydrodynamic dorsal fins and bubble bioluminescence. | neon |
| 5 | skin-rainbow | 🌈 | Chameleon Aurora | 350 | A high-fidelity skin that transitions smoothly through a full color spectrum. | rainbow |
| 6 | skin-lion | 🦁 | The Lion Snake | 350 | Golden apex mane headpiece with furious amber predator scales. | camo |
| 7 | skin-neonglow | ⚡ | Cyber Glow Pulsar | 500 | Radiates intense neon cyberpunk particles and a glowing high-contrast energy aura. | neon |
| 8 | skin-motorbike | 🏍️ | The Motorbike Snake | 500 | Chrome exhaust head, asphalt dark body segments, and burnout smoke trail. | metallic |
| 9 | skin-metallic | ⚙️ | Ironclad Titanium | 750 | Sleek metallic armor plating that reflects light with heavy specularity. | metallic |
| 10 | skin-coin | 🪙 | The Coin Snake | 750 | Gold dollar medallion crown with stacked casino chip coin segments. | rainbow |
| 11 | skin-camo | 🛡️ | Bio-Desert Camo | 900 | Tactical jungle and sand digital scales to blend into toxic terrains. | camo |
| 12 | skin-gold | 👑 | Midas Touch | 1200 | A skin layered in solid gold to boast extreme wealth. | — |
| 13 | skin-crimson | 🔥 | Crimson Fury | 1800 | For players who leave a trail of blood in their wake. | — |

---

## SECTION C: Laser Trails — 3 Trails

Each card is a `TrailCard`.

#### Card Structure (TrailCard):

```
┌─────────────────────────────────┐
│  [Active badge IF active]      │
│  OR                             │
│  [🔒 Locked badge IF !unlocked] │
│  ┌─────────────────────────┐   │
│  │  [80px tall dark area]   │   │
│  │  4 animated pinging      │   │
│  │  dots (item.color),      │   │
│  │  staggered 160ms delay   │   │
│  └─────────────────────────┘   │
│      ✨ Basic Sparks            │
│  A simple trail of glowing      │
│  friction particles.            │
│  ┌─────────────────────────┐   │
│  │ [EQUIPPED] or             │   │
│  │ [EQUIP TRAIL] or         │   │
│  │ [✨ Unlock (N Chips)]    │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

#### Trail visual: 4 small circular dots (w-2 h-2), each colored with `item.color`, with `animate-ping` and a glow `boxShadow: 0 0 10px {color}, 0 0 20px {color}`, staggered at 0ms, 160ms, 320ms, 480ms.

#### Button uses `UnlockFooter` with equipLabel=`"Equip Trail"`

#### Full Trail List:

| # | ID | Emoji | Name | Cost (Chips) | Description |
|---|-----|-------|------|-------------|-------------|
| 1 | trail-none | ✨ | Basic Sparks | 0 | A simple trail of glowing friction particles. |
| 2 | trail-plasma | ⚡ | Plasma Arc | 80 | Charged electromagnetic pink plasma particles. |
| 3 | trail-comet | ☄️ | Stardust Drift | 300 | Cosmic tail particles that simulate a falling comet. |

---

## SECTION D: Death Novas — 2 Death Effects

Each card is a `DeathCard`.

#### Card Structure (DeathCard):

```
┌─────────────────────────────────┐
│  [Active badge IF active]      │
│  OR                             │
│  [🔒 Locked badge IF !unlocked] │
│  ┌─────────────────────────┐   │
│  │  [80px tall dark area]   │   │
│  │  Pinging indigo circle   │   │
│  │  (bg, animate-ping)      │   │
│  │  + centered 🔥 Flame     │   │
│  │  icon (item.color, glow) │   │
│  └─────────────────────────┘   │
│      💥 Toxic Splash            │
│  The standard chemical burst    │
│  upon disintegration.           │
│  ┌─────────────────────────┐   │
│  │ [EQUIPPED] or             │   │
│  │ [EQUIP NOVA] or          │   │
│  │ [✨ Unlock (N Chips)]    │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

#### Death visual: A pinging indigo-500/20 circle (w-5 h-5, animate-ping) behind a centered `Flame` icon (w-6 h-6), colored with `item.color`, with a drop-shadow `filter: drop-shadow(0 0 10px {color})`. Scales 1.25x on hover.

#### Button uses `UnlockFooter` with equipLabel=`"Equip Nova"`

#### Full Death Nova List:

| # | ID | Emoji | Name | Cost (Chips) | Description |
|---|-----|-------|------|-------------|-------------|
| 1 | death-default | 💥 | Toxic Splash | 0 | The standard chemical burst upon disintegration. |
| 2 | death-nova | 🌌 | Hypernova Burst | 180 | A dazzling flash resembling a collapsing star. |

---

## SECTION E: Flags — 6 Flags

Each card is a `FlagCard`.

#### Card Structure (FlagCard):

```
┌─────────────────────────────────┐
│  [Active badge IF active]      │
│  OR                             │
│  [🔒 Locked badge IF !unlocked] │
│  ┌─────────────────────────┐   │
│  │  [80px tall dark area]   │   │
│  │  Large emoji (text-4xl)  │   │
│  │  centered, bounce anim  │   │
│  └─────────────────────────┘   │
│  🏴‍☠️ Syndicate Skull             │
│  The pirate skull insignia of   │
│  the Viper Syndicate.           │
│  ┌─────────────────────────┐   │
│  │ [EQUIPPED] or             │   │
│  │ [EQUIP FLAG] or          │   │
│  │ [✨ Unlock (N Chips)]    │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

#### Flag visual: 80px tall dark area with the flag emoji displayed at text-4xl (36px) with `animate-bounce`, scaling 1.25x on hover.

**Note:** FlagCard does NOT show the emoji next to the name — only the emoji in the preview area, and the name alone below.

#### Button uses `UnlockFooter` with equipLabel=`"Equip Flag"`

#### Full Flag List:

| # | ID | Emoji | Name | Cost (Chips) | Description |
|---|-----|-------|------|-------------|-------------|
| 1 | flag-syndicate | 🏴‍☠️ | Syndicate Skull | 50 | The pirate skull insignia of the Viper Syndicate. |
| 2 | flag-pride | 🏳️‍🌈 | Rainbow Pride | 80 | Express pride with a rainbow flag on your tail. |
| 3 | flag-stars | 🇺🇸 | Star Spangled | 100 | The patriotic stripes and stars flag. |
| 4 | flag-union | 🇬🇧 | Union Jack | 100 | The royal cross of the Union Jack. |
| 5 | flag-tricolor | 🇮🇳 | Tricolor Saffron | 100 | The elegant tricolor flag with the Ashoka Chakra. |
| 6 | flag-vip | 🚩 | VIP Gold | 300 | The golden flag of elite high stakes participants. |

---

## SECTION F: Profile Banners — 3 Banners

Each card is a `BannerCard`.

#### Card Structure (BannerCard):

```
┌─────────────────────────────────┐
│  [Active badge IF active]      │
│  OR                             │
│  [🔒 Locked badge IF !unlocked] │
│  ┌─────────────────────────┐   │
│  │  [80px tall dark area]   │   │
│  │  Gradient banner bar:    │   │
│  │  ┌───────────────────┐   │   │
│  │  │ [circle] [text]   │   │   │
│  │  └───────────────────┘   │   │
│  └─────────────────────────┘   │
│      🌅 Synthwave Sunset        │
│  A gorgeous retro-synthwave     │
│  neon skyline backdrop.         │
│  ┌─────────────────────────┐   │
│  │ [EQUIPPED] or             │   │
│  │ [EQUIP BANNER] or        │   │
│  │ [✨ Unlock (N Chips)]    │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

#### Banner visual: 80px tall area with a gradient bar (h-8, w-full, rounded-lg) rendered using `item.color` as Tailwind gradient classes. Inside the bar: a small white/20 circle (w-4 h-4) on the left and a white/20 text placeholder bar (h-3 w-16) to the right.

#### Button uses `UnlockFooter` with equipLabel=`"Equip Banner"`

#### Full Banner List:

| # | ID | Emoji | Name | Cost (Chips) | Description |
|---|-----|-------|------|-------------|-------------|
| 1 | banner-neon | 🌅 | Synthwave Sunset | 150 | A gorgeous retro-synthwave neon skyline backdrop. |
| 2 | banner-obsidian | 🌌 | Obsidian Matrix | 200 | Dark, sleek green terminal hex lines for elite coders. |
| 3 | banner-championship | 🏆 | Grand Champion | 500 | Prestige golden frame reserved for championship qualified. |

---

## Shared `UnlockFooter` Component Logic

Used by TrailCard, DeathCard, FlagCard, and BannerCard:

1. **[IF active === true]:** `EQUIPPED` — indigo-950/40 bg, indigo-400 text, indigo-500/20 border
2. **[IF active === false AND unlocked === true]:** `[DYNAMIC: equipLabel]` — slate-900 bg, slate-300 text → hover: indigo-600 bg, white text
3. **[IF active === false AND unlocked === false AND canAfford === true]:** `✨ Unlock ([DYNAMIC: cost] Chips)` — amber-500/10 bg, amber-400 text → hover: amber-500 bg, slate-950 text
4. **[IF active === false AND unlocked === false AND canAfford === false]:** `✨ Unlock ([DYNAMIC: cost] Chips)` — slate-900/40 bg, slate-500 text, cursor-not-allowed

---

# VIEW 2: Genetic Pattern Lab (`shopView === 'editor'`)

Layout: 2-column grid on lg screens (5+7 split). Single column on mobile.

```
┌──────────────────────┬───────────────────────────────┐
│  LEFT COLUMN (5/12)  │  RIGHT COLUMN (7/12)         │
│                      │                               │
│  [TryOn Preview]     │  STEP 1: Construct Stripe     │
│  450×180 canvas      │  Sequence                      │
│                      │                               │
│  [Projector Card]    │  STEP 2: Choose Segment       │
│  GENETIC PROFILE     │  Geometry                      │
│  STATS               │                               │
│  Pattern DNA Engine  │  STEP 3: Body Taper Physics   │
│  NODES: N nodes      │                               │
│  GLOW: ENABLED/DIS   │  STEP 4: Bioluminescent Aura  │
│                      │                               │
│  [DEPLOY TO          │                               │
│   BATTLE-ARENA]      │                               │
└──────────────────────┴───────────────────────────────┘
```

---

## LEFT COLUMN

### TryOn Preview (Interactive Canvas)

```
┌──────────────────────────────────────────────┐
│ ● LAB HOLO-PREVIEW (STEER TO TEST)          │
│ ┌──────────────────────────────────────────┐ │
│ │                                          │ │
│ │     [450×180 canvas — dark bg,           │ │
│ │      grid scanlines, 26-segment          │ │
│ │      interactive snake that follows      │ │
│ │      mouse cursor or auto-patrols]       │ │
│ │                                          │ │
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

- **Overlay badge** (top-left, absolute):
  - Pulsing indigo-400 dot (w-2 h-2, animate-pulse)
  - Text: `LAB HOLO-PREVIEW (STEER TO TEST)`
  - Style: 9px, indigo-300, font-mono, font-bold, uppercase, tracking-wider
  - Background: slate-900/90, px-2 py-0.5, rounded, border border-indigo-500/20
- Canvas: 450×180, bg-slate-950/90, cursor-crosshair
- Snake auto-patrols in a figure-8; when mouse hovers the canvas, snake follows cursor
- Shows forked red tongue flickering, white eyes with dark pupils
- Snake renders with current lab settings (colors, shape, taper, glow)
- Mouse radar ring appears when hovering (indigo-400, 12px radius)

### Projector Details Card

```
┌──────────────────────────────────────┐
│ GENETIC PROFILE STATS                │
│ 🎨 Pattern DNA Engine                │
│                                      │
│ Your stripe nodes loop continuously  │
│ as your snake grows in the arena.    │
│ You can tweak color order, skin      │
│ geometries, tapering physics, and    │
│ aurora bioluminescence before        │
│ deploying!                           │
│                                      │
│ ┌─────────────┐ ┌─────────────────┐ │
│ │ NODES:      │ │ GLOW:           │ │
│ │ [N] nodes   │ │ [ENABLED/DIS.]  │ │
│ └─────────────┘ └─────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │  🪄 DEPLOY TO BATTLE-ARENA      │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

- **Section label:** `GENETIC PROFILE STATS` (9px, indigo-400, font-mono, tracking-widest, uppercase, font-extrabold)
- **H3:** `🎨 Pattern DNA Engine` (14px bold, white, Palette icon in purple-400)
- **Description:** `Your stripe nodes loop continuously as your snake grows in the arena. You can tweak color order, skin geometries, tapering physics, and aurora bioluminescence before deploying!` (11px, slate-400)

#### Stats Grid (2 columns):

| Label | Value |
|-------|-------|
| `NODES:` | `[DYNAMIC: colorSequence.length] nodes` (purple-400, font-black) |
| `GLOW:` | [IF glowEnabled]: `ENABLED` (emerald-400) / [IF !glowEnabled]: `DISABLED` (slate-500) |

#### Deploy Button:

- [IF isCustomLabDeployed === true]:
  - Text: `✓ DNA DEPLOYED & EQUIPPED (ACTIVE)`
  - Icon: CheckCircle2 (emerald-100, animate-bounce)
  - Style: `bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-950`
- [IF isCustomLabDeployed === false]:
  - Text: `🪄 DEPLOY TO BATTLE-ARENA`
  - Icon: Wand2 (purple-100)
  - Style: `bg-purple-600 hover:bg-purple-500 text-white border border-purple-500 hover:shadow-purple-500/20`

---

## RIGHT COLUMN — 4-Step Editor

---

### STEP 1: Construct Stripe Sequence

```
┌──────────────────────────────────────────────────────────────┐
│ STEP 1                                                       │
│ 🖌️  Construct Stripe Sequence                                 │
│                                                              │
│ Click any palette color below to append it to the tail       │
│ sequence. Click any crown node inside the wiggling strip     │
│ to erase it.                                                 │
│                                                              │
│ [18 color swatches in 6×3 / 9×2 grid]                        │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ [Active strip — horizontal row of colored circles]      │  │
│ │ 👑 [1] [2] [3] [4] ...                                  │  │
│ │ (scrollable, each clickable to remove)                   │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ [➕ Double Sequence Length] [↔ Mirror Symmetrically]         │
│                            [🎲 Mutate DNA] [🗑️ Reset]       │
└──────────────────────────────────────────────────────────────┘
```

- **Step label:** `STEP 1` (10px, slate-500, font-mono, tracking-wider, uppercase, font-bold)
- **H3:** `🖌️  Construct Stripe Sequence` (14px bold, white, Paintbrush icon in indigo-400)
- **Description:** `Click any palette color below to append it to the tail sequence. Click any crown node inside the wiggling strip to erase it.`
  - First sentence: 11px, slate-400
  - Second sentence: 11px, indigo-400, font-semibold

#### Color Palette (18 swatches):

| # | Name | Hex | Tooltip on hover |
|---|------|-----|------------------|
| 1 | Red Alert | #ef4444 | Add Red Alert |
| 2 | Solar Orange | #f97316 | Add Solar Orange |
| 3 | Midas Gold | #f59e0b | Add Midas Gold |
| 4 | Lime Venom | #84cc16 | Add Lime Venom |
| 5 | Acid Green | #22c55e | Add Acid Green |
| 6 | Emerald | #10b981 | Add Emerald |
| 7 | Teal Void | #0d9488 | Add Teal Void |
| 8 | Cyber Cyan | #06b6d4 | Add Cyber Cyan |
| 9 | Sky Blue | #0ea5e9 | Add Sky Blue |
| 10 | Sapphire | #3b82f6 | Add Sapphire |
| 11 | Royal Indigo | #6366f1 | Add Royal Indigo |
| 12 | Shadow Purple | #a855f7 | Add Shadow Purple |
| 13 | Orchid Pink | #ec4899 | Add Orchid Pink |
| 14 | Crimson | #dc2626 | Add Crimson |
| 15 | Pure White | #ffffff | Add Pure White |
| 16 | Slate Gray | #64748b | Add Slate Gray |
| 17 | Deep Carbon | #1e293b | Add Deep Carbon |
| 18 | Pitch Black | #090d16 | Add Pitch Black |

- Each swatch: aspect-square, rounded-full, border border-slate-800
- On hover: border-white, scale-110, shows a `+` icon (Plus) overlay
- On active (click): scale-95

#### Active Color Strip (the constructed sequence):

- Container: bg-slate-900, border border-slate-800/80, rounded-xl, min-h-[64px], horizontally scrollable
- Each node: w-8 h-8, rounded-full, colored circle with glow box-shadow
- First node shows `👑` emoji, subsequent nodes show their index number (0-based)
- On hover: border turns red-500, shows a 🗑️ (Trash2) icon overlay on red-600/90 background
- Title attribute: `Click to erase node`

#### Helper Buttons Row:

| Button | Label | Icon | Style |
|--------|-------|------|-------|
| Double Sequence Length | `➕ Double Sequence Length` | Plus (indigo-400) | slate-900 bg, slate-300 text |
| Mirror Symmetrically | `↔ Mirror Symmetrically` | ArrowLeftRight (indigo-400) | slate-900 bg, slate-300 text |
| Mutate DNA | `🎲 Mutate DNA` | — | purple-950/20 bg, purple-300 text, ml-auto |
| Reset | `🗑️ Reset` | Trash2 | rose-950/10 bg, rose-400 text |

All helper buttons: 10px font-bold, rounded-lg, border.

---

### STEP 2: Choose Segment Geometry

```
┌──────────────────────────────────────────────────────────────┐
│ STEP 2                                                       │
│ ⚙️  Choose Segment Geometry                                   │
│                                                              │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│ │ Smooth       │ │ Dragon       │ │ Armored      │          │
│ │ Circles      │ │ Scales       │ │ Plates       │          │
│ │ Standard     │ │ Alternating  │ │ Futuristic   │          │
│ │ sleek nodes  │ │ jagged spikes│ │ squad blocks │          │
│ └──────────────┘ └──────────────┘ └──────────────┘          │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│ │ Crystal      │ │ Spiky        │ │ Basilisk     │          │
│ │ Shards       │ │ Obsidian     │ │ Diamonds     │          │
│ │ Alternating  │ │ Full high-   │ │ Pointy       │          │
│ │ shiny gems   │ │ threat spikes│ │ royal nodes  │          │
│ └──────────────┘ └──────────────┘ └──────────────┘          │
└──────────────────────────────────────────────────────────────┘
```

- **Step label:** `STEP 2` (10px, slate-500, font-mono, tracking-wider, uppercase, font-bold)
- **H3:** `⚙️  Choose Segment Geometry` (14px bold, white, Sliders icon in indigo-400)
- Grid: 2×3 on sm, 3×2 on larger (`grid-cols-2 sm:grid-cols-3`)
- [IF selected]: `bg-indigo-600/10 border-indigo-500 shadow shadow-indigo-950`
- [IF not selected]: `bg-slate-900 border-slate-800/80 hover:border-slate-700`

| # | ID | Label | Description |
|---|-----|-------|-------------|
| 1 | smooth | Smooth Circles | Standard sleek nodes |
| 2 | dragon | Dragon Scales | Alternating jagged spikes |
| 3 | armored | Armored Plates | Futuristic squad blocks |
| 4 | crystal | Crystal Shards | Alternating shiny gems |
| 5 | obsidian | Spiky Obsidian | Full high-threat spikes |
| 6 | basilisk | Basilisk Diamonds | Pointy royal nodes |

---

### STEP 3: Body Taper Physics

```
┌──────────────────────────────────────────────────────────────┐
│ STEP 3                                                       │
│ Body Taper Physics                                            │
│ Configure snake tail scaling density styles.                 │
│                                                              │
│ ┌──────────────┐ ┌──────────────┐                          │
│ │ Natural Taper│ │Uniform Width │                          │
│ └──────────────┘ └──────────────┘                          │
│ ┌──────────────┐ ┌──────────────┐                          │
│ │Sinuous Wave  │ │ Heavy Head   │                          │
│ └──────────────┘ └──────────────┘                          │
└──────────────────────────────────────────────────────────────┘
```

- **Step label:** `STEP 3` (10px, slate-500, font-mono, tracking-wider, uppercase, font-bold)
- **H3:** `Body Taper Physics` (14px bold, white)
- **Description:** `Configure snake tail scaling density styles.` (10px, slate-400)
- Grid: 2×2
- [IF selected]: `bg-indigo-600/15 border-indigo-500 text-indigo-300`
- [IF not selected]: `bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200`

| # | ID | Label |
|---|-----|-------|
| 1 | natural | Natural Taper |
| 2 | uniform | Uniform Width |
| 3 | wave | Sinuous Wave |
| 4 | heavy | Heavy Head |

---

### STEP 4: Bioluminescent Aura

```
┌──────────────────────────────────────────────────────────────┐
│ STEP 4                                                       │
│ Bioluminescent Aura                                          │
│ Toggle active radioactive body node shading glow in battle    │
│ arenas.                                                      │
│                                                              │
│ ┌──────────────────────────────────────┐                     │
│ │ Neon Glow              [====○    ]  │                     │
│ │ Emit high-vis plasma light          │                     │
│ └──────────────────────────────────────┘                     │
└──────────────────────────────────────────────────────────────┘
```

- **Step label:** `STEP 4` (10px, slate-500, font-mono, tracking-wider, uppercase, font-bold)
- **H3:** `Bioluminescent Aura` (14px bold, white)
- **Description:** `Toggle active radioactive body node shading glow in battle arenas.` (10px, slate-400)

#### Toggle Control:

- Container: `bg-slate-900 rounded-xl border border-slate-800`, p-3
- Left side:
  - Label: `Neon Glow` (12px bold, white)
  - Sub-label: `Emit high-vis plasma light` (10px, slate-400)
- Right side:
  - Toggle switch: w-11 h-6, rounded-full
  - [IF glowEnabled === true]: `bg-indigo-500`, white dot at `translate-x-5`
  - [IF glowEnabled === false]: `bg-slate-800`, white dot at `translate-x-0`
  - aria-pressed: [DYNAMIC: glowEnabled]
  - aria-label: `Toggle neon glow`

---

## Steps 3 & 4 Layout Note

Steps 3 and 4 are placed side-by-side in the same card on `md` screens and above, separated by a left border. On mobile, they stack vertically with a top border separator.

```
┌────────────────────────────┬──────────────────────────────┐
│ STEP 3                     │ STEP 4                       │
│ Body Taper Physics         │ Bioluminescent Aura          │
│ Configure snake tail...    │ Toggle active radioactive... │
│                            │                              │
│ [Natural Taper][Uniform]   │ Neon Glow          [====○]  │
│ [Sinuous Wave][Heavy Head] │ Emit high-vis plasma light  │
└────────────────────────────┴──────────────────────────────┘
```

---

## Toast Notifications (triggered by actions)

| Trigger | Message | Type |
|---------|---------|------|
| Equip manufactured skin (owned) | `Equipped Body Skin: [DYNAMIC: item.name]` | success |
| Unlock manufactured skin (insufficient chips) | `You need [DYNAMIC: item.cost] chips to unlock [DYNAMIC: item.name]! Play matches to earn chips.` | error |
| Buy+equip manufactured skin | `Unlocked & Equipped [DYNAMIC: item.name]! -[DYNAMIC: item.cost] CHIPS` | success |
| Equip free preset | `Injected DNA: [DYNAMIC: preset.name]! Equipped in Battle Arena.` | success |
| Equip trail (owned) | `Equipped Trail Effect: [DYNAMIC: item.name]` | success |
| Unlock trail (insufficient) | `You need [DYNAMIC: item.cost] chips to unlock this trail!` | error |
| Buy+equip trail | `Unlocked & Equipped Trail: [DYNAMIC: item.name]! -[DYNAMIC: item.cost] CHIPS` | success |
| Equip death (owned) | `Equipped Death Effect: [DYNAMIC: item.name]` | success |
| Unlock death (insufficient) | `You need [DYNAMIC: item.cost] chips to unlock this death effect!` | error |
| Buy+equip death | `Unlocked & Equipped Death Nova: [DYNAMIC: item.name]! -[DYNAMIC: item.cost] CHIPS` | success |
| Equip flag (owned) | `Equipped Flag: [DYNAMIC: item.name]` | success |
| Unlock flag (insufficient) | `You need [DYNAMIC: item.cost] chips to unlock this flag!` | error |
| Buy+equip flag | `Unlocked & Equipped Flag: [DYNAMIC: item.emoji] [DYNAMIC: item.name]! -[DYNAMIC: item.cost] CHIPS` | success |
| Equip banner (owned) | `Equipped Profile Banner: [DYNAMIC: item.name]` | success |
| Unlock banner (insufficient) | `You need [DYNAMIC: item.cost] chips to unlock this profile banner!` | error |
| Buy+equip banner | `Unlocked & Equipped Profile Banner: [DYNAMIC: item.name]! -[DYNAMIC: item.cost] CHIPS` | success |
| Color sequence max reached | `Maximum 24 segments in stripe pattern!` | error |
| Remove last color | `Stripe sequence must have at least 1 color node!` | error |
| Clear sequence | `Sequence reset.` | info |
| Double pattern (too long) | `Sequence too long to double!` | error |
| Mirror pattern (too long) | `Sequence too long to mirror!` | error |
| Randomize pattern | `Mutated new genetic chain!` | success |
| Deploy with empty sequence | `Choose at least 1 color node before deploying!` | error |
| Deploy custom skin | `🧪 Genetic Custom Segment deployed! Equipped in Battle Arena.` | success |
| Network error | `Network error. Please try again.` | error |
| Generic API error | `Action failed.` | error |
