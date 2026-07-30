# Dossier (Player Profile) Panel — Complete Screen Content

Source: `src/components/panels/player-profile.tsx` (2360 lines)

---

## Pre-Render States

### Loading State
```
[IF loading === true]
  [PanelSkeleton] × 3 (1 × h-48, 2 × h-40) — animated pulse rectangles
```

### Not Signed In State
```
[IF !player]
  "Not signed in."
```

---

## Main Panel (player is loaded)

Background: `bg-slate-950/60` with `border-slate-900`, rounded-2xl, backdrop-blur-md
Decorative glows: indigo-500/10 top-right, emerald-500/5 bottom-left (both `blur-3xl`, `pointer-events-none`)

---

### HEADER (top section, `border-b border-slate-900 pb-6 mb-6`)

#### Left Column: Avatar + Name Block

**Avatar** (64×64, rounded-2xl, `bg-gradient-to-br from-indigo-500 to-purple-600`, `border-indigo-400/30`)

```
[IF player.avatar starts with "data:" or "http"]
  <img> of player.avatar
[ELSE IF player.avatar is non-empty (preset emoji)]
  <span> player.avatar (e.g. "🐍")
[ELSE]
  <span> [DYNAMIC: activeSkin?.emoji || '🐍']
    title="EQuipped DNA Skin"

[Overlay badge — absolute -bottom-1 -right-1]
  "Lvl [DYNAMIC: player.level]"
  (bg-slate-950, border-slate-800, text-indigo-400, 10px mono bold)
```

**Name Row**
```
[FLAG ICON] [DYNAMIC: activeFlag?.flag || '🇺🇸']  title="Region flag"
[DYNAMIC: player.name]  (text-xl, bold, white, sans, tracking-tight)
[DYNAMIC: player.country || 'US']  (10px, mono, bold, bg-slate-950, border-slate-800, text-indigo-400, uppercase, rounded)
[✏️ Edit icon button]  title="Edit Identity"  aria-label="Edit identity"
```

**Tag Line** (text-xs, text-slate-400)
```
Ledger Tag: #[DYNAMIC: player.userTag || 'STRK-8291'] • Global Standing: #999
```

**Social Badges** (flex-wrap, gap-2, mt-2)

```
[IF instagram is truthy]
  📸 [DYNAMIC: instagram]
  (link to https://instagram.com/{instagram without @}, target _blank)
  (bg-pink-500/10, border-pink-500/30, text-pink-400, 11px bold)

[IF youtube is truthy]
  🎥 YouTube
  (link to youtube URL or https://youtube.com/{youtube})
  (bg-red-500/10, border-red-500/30, text-red-400, 11px bold)

[IF twitch is truthy]
  📱 Twitch
  (link to https://twitch.tv/{twitch})
  (bg-purple-500/10, border-purple-500/30, text-purple-400, 11px bold)

[IF all socials empty]
  (nothing rendered — no social badges shown)
```

#### Right Column: Level Progress + Sign Out

**Level Progress Card** (w-72, bg-slate-900/60, border-slate-800, rounded-xl, backdrop-blur-sm)
```
✨ Level Progress     [DYNAMIC: player.xp] / [DYNAMIC: player.level * 200] XP
(gradient progress bar: from-indigo-500 to-purple-500, h-2.5, rounded-full)
  fill width = [DYNAMIC: Math.min(100, Math.floor((player.xp / (player.level * 200)) * 100))]%
```

**Sign Out Button** (bg-red-950/20, border-red-500/20, text-red-400, h-52px)
```
[🚪 LogOut icon] Sign Out
  title="Logout Session"
  [IF loggingOut === true] → disabled:opacity-50, disabled cursor
```

---

### TAB NAVIGATION BAR (`border-b border-slate-900 pb-3`, flex-wrap, gap-2)

Four tabs. Active tab: `bg-indigo-600/10 border-indigo-500/30 text-indigo-400 shadow-lg`. Inactive: `bg-transparent border-transparent text-slate-400`.

| Tab ID    | Label                                          | Icon       |
|-----------|-------------------------------------------------|------------|
| `stats`   | Records & Statistics                            | 🎯 Target  |
| `history` | Match History Ledger                             | 🕐 History |
| `friends` | Friends & Spectate ([DYNAMIC: friends.length])   | 👥 Users   |
| `identityLog` | Identity Anti-Tamper Logs                     | 🔒 Lock    |

---

## TAB 1: Records & Statistics (`stats`)

### Guest Upgrade Banner

```
[IF !player.email — i.e. guest account]
  ┌──────────────────────────────────────────────────────────────────────────┐
  │ (bg-gradient from-amber-950/40 via-slate-900 to-indigo-950/40,        │
  │  border-amber-500/30, rounded-2xl)                                      │
  │                                                                          │
  │  [🛡️ Shield icon — amber-400, w-10 h-10, rounded-xl]                   │
  │                                                                          │
  │  You're playing as a Guest                                              │
  │  Upgrade to a registered account to secure your progress. All chips,  │
  │  stats, cosmetics, and friends carry over.                              │
  │                                                                          │
  │  [👤 UserPlus icon] Upgrade Now                                         │
  │    (amber gradient button, shadow-amber-600/20)                         │
  └──────────────────────────────────────────────────────────────────────────┘

[IF guest banner "Upgrade Now" is clicked → expands to upgrade form]
  ┌──────────────────────────────────────────────────────────────────────────┐
  │  [🛡️ Shield] Upgrade to Registered Account                    [✕ close] │
  │                                                                          │
  │  🔒 Your progress is safe. All chips, stats, cosmetics, streaks,       │
  │     friends, and clan memberships carry over. You keep your VENOM tag.  │
  │     Just add an email and password to secure your account.              │
  │                                                                          │
  │  Display Name:  [________________] placeholder="ViperStrike"            │
  │  Email:         [________________] placeholder="you@arena.gg"          │
  │  Password:      [________________] placeholder="••••••••"               │
  │  Security PIN:  [________________] placeholder="e.g. 1234"              │
  │                  (4 digits, optional)                                   │
  │                                                                          │
  │  [DYNAMIC: error message — IF upgrade fails]  (text-rose-400)          │
  │                                                                          │
  │  [Upgrade & Secure Account]  [Cancel]                                   │
  │    [IF busy → "Upgrading…" disabled:opacity-50]                         │
  └──────────────────────────────────────────────────────────────────────────┘
```

### Identity Editor

```
[IF isEditing === true]
  ┌──────────────────────────────────────────────────────────────────────────┐
  │ (border-indigo-500/30, bg-slate-950/80, rounded-2xl)                   │
  │                                                                          │
  │  [🔒 Lock icon — animate-pulse] Handshake Registration Protocol        │
  │  Lock down your tournament handle and regional alignment. All          │
  │  changes are logged.                                                    │
  │  ─────────────────────────────────────────────────────────────────────  │
  │                                                                          │
  │  CHALLENGER HANDLE                                                       │
  │  [________________________] placeholder="Enter nickname" (max 15)       │
  │  Max 15 characters. System validates non-duplicate handle signatures. │
  │                                                                          │
  │  FACTION REGION (FLAG)                                                   │
  │  [▼ dropdown] [DYNAMIC: all countries from COUNTRIES array]             │
  │    Each option: "{flag} {name} ({code})"                                │
  │  Associates your extraction chips to regional champion rankings.      │
  │                                                                          │
  │  ─────────────────────────────────────────────────────────────────────  │
  │  PROFILE AVATAR / IDENTITY EMBLEM                                        │
  │                                                                          │
  │  ┌─ LEFT: Drag & Drop Zone (md:col-span-5) ──────┐  ┌─ RIGHT (col-7) ─┐│
  │  │                                                 │  │ CHOOSE PRESET   ││
  │  │ [IF no avatar selected]                        │  │ EMBLEM          ││
  │  │   [Upload icon]                                │  │                 ││
  │  │   Upload Custom Photo                         │  │ ┌───┐┌───┐┌──┐┌─┐││
  │  │   Drag & Drop or click to browse               │  │ │🐍 ││☠️ ││👾││🤖│││
  │  │   PNG, JPG, WebP up to 1.5MB                   │  │ │Ven││Syn││Pix││Cy│││
  │  │                                                 │  │ │omo││dic││In ││be│││
  │  │ [IF preset emoji avatar selected]              │  │ │us ││at ││va││r  │││
  │  │   [large emoji display]                        │  │ │Vip││Sku││de││Se│││
  │  │   Preset Selected                              │  │ │er ││ll ││r  ││nt│││
  │  │   Click here to upload custom image instead    │  │ └───┘└───┘└──┘└─┘││
  │  │                                                 │  │ ┌───┐┌───┐┌──┐┌─┐││
  │  │ [IF custom image avatar selected]              │  │ │👑 ││⚡ ││🔥 ││🌌│││
  │  │   <img> preview (96×96, rounded-2xl)           │  │ │Mid││Sto││Cri││Cos│││
  │  │   [hover overlay]:                             │  │ │as ││rm  ││mso││mic│││
  │  │     CHANGE IMAGE                               │  │ │Kin││Sur││n  ││Neb│││
  │  │     Drag & Drop or Click                      │  │ │g  ││ge ││Fur││ula│││
  │  │                                                 │  │ └───┘└───┘└──┘└─┘││
  │  │ [IF isDragging === true → border-indigo-500]  │  └─────────────────┘│
  │  │ [hidden file input: accept="image/*"]          │                     │
  │  │                                                 │                     │
  │  │ [IF avatar selected]                           │                     │
  │  │   [🗑️ Reset to Skin Default]                   │                     │
  │  └─────────────────────────────────────────────────┘                     │
  │                                                                          │
  │  ─────────────────────────────────────────────────────────────────────  │
  │  🌐 Creator Social Channels (Showcased on your Public Profile)          │
  │  Link your Instagram handle, YouTube channel, and Twitch profile so     │
  │  other vipers and allies can follow you and watch your game clips!      │
  │                                                                          │
  │  📸 INSTAGRAM HANDLE       🎥 YOUTUBE CHANNEL /     📱 TWITCH STREAM    │
  │  [@username (e.g. @hari   HANDLE                 HANDLE                │
  │   _snake_god)]              [@channel or URL]      [twitch_username]    │
  │                                                                          │
  │  ─────────────────────────────────────────────────────────────────────  │
  │  🛡️ CYBER HANDSHAKE WARNING:                                               │
  │  Changing your registered alias or territory updates global tournament  │
  │  indices. Immutable record logs are appended to the ledger below.      │
  │                                                                          │
  │  [Cancel]  [✓ Save Handshake]                                            │
  │    [IF saving === true → disabled:opacity-50]                            │
  └──────────────────────────────────────────────────────────────────────────┘
```

### Statistics Grid (2×3→4 cols responsive, gap-4)

8 stat cards, each with: label (top-left, xs, text-slate-400), icon (top-right), value (xl, mono, bold, colored), subLabel (9px, mono, uppercase, text-slate-500).

| # | Label                  | Sub-Label                      | Value                                      | Value Color | Icon     |
|---|------------------------|--------------------------------|--------------------------------------------|-------------|----------|
| 1 | Banked Wallet          | Deposited Chips                | [DYNAMIC: player.bankedChips.toLocaleString()] | emerald-400  | 🏛️ Landmark |
| 2 | Tournament Kills       | Total Terminations             | [DYNAMIC: player.lifetimeKills]            | white       | 💀 Skull  |
| 3 | K/D Ratio              | Kill / Death Index             | [DYNAMIC: (lifetimeKills / max(1,lifetimeDeaths)).toFixed(2)] | amber-400 | 🎯 Target |
| 4 | Extraction Rate        | Successful Handshakes          | [DYNAMIC: extract%]                        | cyan-400    | 🧭 Compass |
| 5 | Survival Streak        | Consecutive Extractions        | [DYNAMIC: player.bestStreak]               | yellow-500  | 🏆 Trophy |
| 6 | Record Extraction      | Max Retained in One Run        | [DYNAMIC: player.biggestExtract.toLocaleString()] | indigo-400 | 🏅 Award |
| 7 | Lifetime Retained      | Cumulative Chip Profit         | [DYNAMIC: player.totalEarned.toLocaleString()] | teal-400   | 🏛️ Landmark |
| 8 | Total Forfeited        | Forfeited in Crash Events      | [DYNAMIC: player.totalLost.toLocaleString()]  | red-400    | 🔄 RefreshCw |

### Annual Tournament Guardrails & Limit Allowances

```
(bg-slate-950, border-amber-500/30, rounded-2xl, p-5)

  [🛡️ Shield — amber-400]  ANNUAL TOURNAMENT GUARDRAILS & LIMIT ALLOWANCES
  ─────────────────────────────────────────────────────────────────────────
  1-YEAR UTC TOURNAMENT CYCLE ACTIVE  (amber-400, 11px mono, bg-amber-500/10, rounded-full)

  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
  │ ⚔️ MATCHES       │  │ 🏛️ ANNUAL BUY    │  │ 🏆 REWARDED ADS  │
  │    ALLOWED       │  │    CAP (25L)     │  │    TODAY         │
  │                  │  │                  │  │                  │
  │ 18 / 10,000      │  │ 0 / 25,00,000 c  │  │ 0 / 12 Ads       │
  │ [===......]      │  │ [..........]     │  │ [..........]     │
  │                  │  │                  │  │                  │
  │ Completed: 18    │  │ Bought: 0 c      │  │ Watched: 0       │
  │ Remaining: 9,982 │  │ Cap Remaining:   │  │ Resets at 00:00  │
  │ matches          │  │ 25,00,000 c      │  │ UTC              │
  │ (emerald-400)    │  │ (emerald-400)    │  │ (amber-400)      │
  └──────────────────┘  └──────────────────┘  └──────────────────┘

  Note: "Matches Allowed" bar gradient: from-indigo-500 to-purple-500
        "Annual Buy Cap" bar gradient: from-emerald-500 to-teal-400
        "Rewarded Ads Today" bar gradient: from-amber-500 to-yellow-400
```

### Security Settings Card

```
[IF !player.email (guest account)] → entire section hidden (returns null)

[IF player.email exists (registered account)]
  ┌──────────────────────────────────────────────────────────────────────────┐
  │ (rounded-xl, border-slate-800, bg-slate-900/30)                          │
  │                                                                          │
  │ 🔒 Security Settings                              [DYNAMIC: status]     │
  │                                                  [IF player.securityPin │
  │                                                   → "🔐 PIN Set"       │
  │                                                   [ELSE                 │
  │                                                   → "⚠️ No PIN"]       │
  │ ─────────────────────────────────────────────────────────────────────── │
  │                                                                          │
  │ PASSWORD                                                                 │
  │ [IF showChangePassword === false]                                        │
  │   Password                                    [Change]                  │
  │   Change your account password                (amber button)            │
  │                                                                          │
  │ [IF showChangePassword === true]                                         │
  │   [Current password________] [New password (min 6)________]             │
  │   [Update Password]  [Cancel]                                            │
  │   [IF cpBusy === true → button text: "Saving…" disabled]                 │
  │ ─────────────────────────────────────────────────────────────────────── │
  │                                                                          │
  │ SECURITY PIN                                                             │
  │ [IF showChangePin === false]                                             │
  │   Security PIN                                [DYNAMIC: button label]  │
  │   [IF player.securityPin exists]                                         │
  │     Used for password recovery. Keep it safe!      [Change PIN]         │
  │   [ELSE]                                                                │
  │     Set a 4-digit PIN to enable password           [Set PIN]             │
  │     recovery.                                   (emerald button)       │
  │                                                                          │
  │ [IF showChangePin === true]                                                 │
  │   [IF player.securityPin exists]                                         │
  │     Current PIN                                                            │
  │     [Enter current 4-digit PIN________] (numeric, max 4)                 │
  │   New PIN (4 digits)                                                      │
  │   [Enter new 4-digit PIN________] (numeric, max 4)                       │
  │   [DYNAMIC: player.securityPin ? "Update PIN" : "Set PIN"]  [Cancel]   │
  │   [IF pinBusy === true → button text: "Saving…" disabled]                │
  └──────────────────────────────────────────────────────────────────────────┘
```

### Challenger Standing Rating Banner

```
(p-4, rounded-xl, border-slate-900, bg-slate-900/10)

  [🛡️ Shield — indigo-500, w-8]

  CHALLENGER STANDING RATING  (bold, uppercase, text-slate-200)
  All tournament statistics are linked directly to your global challenger
  index handle. Altering your registry flag updates leaderboard feeds
  dynamically. Data verification handshakes run periodically to check
  metrics validity.
  (text-xs, text-slate-400)
```

---

## TAB 2: Match History Ledger (`history`)

### Header Row

```
[🕐 History icon] Match Run Records Ledger                Showing last 25 operations
(bold, uppercase, text-slate-300)                          (text-xs, text-slate-500, mono)
```

### Empty State

```
[IF matches.length === 0]
  (text-center, py-12, border-dashed border-slate-900, rounded-2xl)

  [🕐 History icon — text-slate-600, w-8]
  No matches found in the active ledger standing.
  Jump into any arena to log your first run data!
  (text-xs, text-slate-600)
```

### Match History Table

```
[IF matches.length > 0]
  (overflow-x-auto table)

  ┌─────────────┬──────────┬───────────────┬───────┬───────────┬──────────────┬──────────────────────┐
  │ Arena Sector │ Status   │ Chips Outcome │ Kills │ Tail Score│ Time Elapsed │ Timestamp            │
  │ (10px upper) │          │ (right)       │(center)│ (center)  │              │                      │
  ├─────────────┼──────────┼───────────────┼───────┼───────────┼──────────────┼──────────────────────┤
  │ 🧭 [DYNAMIC:│ [badge]  │ [DYNAMIC:     │[DYN: │[DYNAMIC:  │ 🕐 [DYNAMIC:  │ [DYNAMIC: date]      │
  │  match.arena│ EXTRACTED│  +chips c     │match.│ match.    │ match.      │ [DYNAMIC: time       │
  │  Name]      │ (green)  │  OR -chips c  │kills]│ snakeLen] │ durationSec │  HH:MM]              │
  │ [ONLINE]    │ COLLIDED │  (green/red)  │      │           │ s            │                      │
  │ [PRACTICE]  │ (red)    │               │      │           │              │                      │
  └─────────────┴──────────┴───────────────┴───────┴───────────┴──────────────┴──────────────────────┘

  Status badges:
    EXTRACTED → bg-emerald-500/10, border-emerald-500/30, text-emerald-400
    COLLIDED  → bg-rose-500/10, border-rose-500/30, text-rose-400

  Arena type badge (per row):
    isOnline=true  → "ONLINE"  (bg-indigo-500/10, border-indigo-500/20, text-indigo-300)
    isOnline=false → "PRACTICE" (bg-slate-800, text-slate-400)

  Chips Outcome color:
    EXTRACTED → text-emerald-400, prefix "+"
    COLLIDED  → text-rose-400, prefix "-"

  Tail Score default: match.snakeLength || 10
```

---

## TAB 3: Friends & Spectate (`friends`)

### Section Header

```
[👥 Users icon — indigo-400] Friends & Live Spectate Portal
  (text-lg, bold, white)
Add allies to build your roster. Send daily gifts, invite them to
high-stakes co-op matches, or spectate their live runs in real-time
when they are in-match!
  (text-xs, text-slate-400)
```

### Add Friend Form

```
[👤 UserPlus icon — inside input, left]  [Sync Ally] button
[Enter challenger alias...                ] (indigo-600, white, bold)
  (input: bg-slate-900, border-slate-800, rounded-xl, max 15 chars)
  (button: px-4, py-2, [👤 UserPlus icon] Sync Ally)
```

### Friend Cards Grid (1 col → 2 col responsive)

Each friend card: `bg-slate-950/40, border-slate-900, rounded-2xl, p-4`

```
┌────────────────────────────────────────────────────────────────────┐
│ [🐍 avatar — 44×44, rounded-xl, bg-slate-900]  [status dot]       │
│  [DYNAMIC: friend.name]  #[DYNAMIC: friend.userTag]               │
│  Level [DYNAMIC: friend.level] • [DYNAMIC: friend.status]         │
│                                                                    │
│  Action buttons (right side, flex-wrap):                          │
│                                                                    │
│  [IF friend.status === 'in-match']                                │
│    [👁️ Spectate] (bg-fuchsia-600/20, text-fuchsia-300,            │
│     animate-pulse, border-fuchsia-500/30)                         │
│     title="Spectate Match"                                       │
│                                                                    │
│  [IF friend.status === 'online' OR 'idle']                        │
│    [⚔️ Invite] (bg-violet-600/20, text-violet-300,                │
│     border-violet-500/30)                                         │
│     title="Invite to Match"                                      │
│                                                                    │
│  [🏛️ Gift] / [🏛️ Gifted]                                         │
│    [IF friend.giftSentToday === true OR friend.status === 'offline']
│      → "Gifted" (bg-slate-900, border-slate-800, text-slate-500,   │
│         cursor-not-allowed, disabled)                              │
│    [ELSE]                                                         │
│      → "Gift" (bg-emerald-500/10, border-emerald-500/20,          │
│         text-emerald-400)                                          │
│      title="Send Gift"                                            │
│                                                                    │
│  [🗑️ Trash2 icon] (text-rose-400, hover:bg-rose-500/10,           │
│     hover:border-rose-500/20)                                     │
│     title="Dismantle Alliance"                                    │
│     aria-label="Dismantle alliance"                               │
└────────────────────────────────────────────────────────────────────┘

Status dot colors:
  online   → bg-emerald-500
  idle     → bg-amber-500, animate-pulse
  in-match → bg-fuchsia-500, animate-pulse
  offline  → bg-slate-600

Status text colors:
  online   → text-emerald-400
  idle     → text-amber-400
  in-match → text-fuchsia-400
  offline  → text-slate-500
```

### Co-Op Lobby Invite Modal

```
[IF activeInviteFriend is set — full-screen overlay]
  (fixed inset-0, z-50, bg-slate-950/80, backdrop-blur-sm)
  ┌──────────────────────────────────────────────────────────────────────┐
  │ Modal: max-w-md, bg-slate-900, border-slate-800, rounded-3xl, p-6  │
  │ Glow: colored blur circle using friend.skinColor (top-right)       │
  │                                                                      │
  │ [⚔️ Swords — violet-400, animate-pulse] Co-Op Lobby Invite  [✕]  │
  │ Assemble a squad with your allies                                   │
  │                                                                      │
  │ ┌─────────────────┐  ┌─────────────────┐                           │
  │ │ YOUR BALANCE    │  │ [DYNAMIC:        │                           │
  │ │ [DYNAMIC:        │  │  friend.name]    │                           │
  │ │  chips] c       │  │ [DYNAMIC:        │                           │
  │ │                  │  │  friendChips] c  │                           │
  │ └─────────────────┘  └─────────────────┘                           │
  │                                                                      │
  │ SELECT ARENA STAKES                                                  │
  │ ┌──────────────────────────────────────────────────────────────┐     │
  │ │ [●] Scrap Alley        Buy-In: 10 c        [Eligible 🤝]    │     │
  │ │ [ ] Rust Market         Buy-In: 20 c        [Eligible 🤝]    │     │
  │ │ [ ] Neon Grid           Buy-In: 50 c        [Eligible 🤝]    │     │
  │ │ [ ] ... (all 30 ARENA_TIERS, scrollable max-h-180px)       │     │
  │ │                                                            │     │
  │ │ Per-row eligibility pill:                                    │     │
  │ │   [IF !youAfford]   → "You can't afford"   (rose)          │     │
  │ │   [IF !friendAffords] → "They can't afford" (amber)        │     │
  │ │   [IF both afford]  → "Eligible 🤝"          (emerald)     │     │
  │ └──────────────────────────────────────────────────────────────┘     │
  │                                                                      │
  │ [IF statusMessage exists]                                           │
  │ ┌──────────────────────────────────────────────────────────────┐     │
  │ │ 💬 [DYNAMIC: friend.name] responds:                          │     │
  │ │ "[DYNAMIC: statusMessage.text]"                              │     │
  │ │                                                              │     │
  │ │ [IF statusMessage.type === 'counter' && counterArenaId]      │     │
  │ │   [🤝 Accept Proposal & Invite]                              │     │
  │ └──────────────────────────────────────────────────────────────┘     │
  │                                                                      │
  │ [Cancel]  [Send Co-Op Invite]                                       │
  │   (Cancel: border-slate-800, text-slate-400)                         │
  │   (Send: gradient violet-600→indigo-600, border-violet-500/30)       │
  └──────────────────────────────────────────────────────────────────────┘
```

---

## TAB 4: Identity Anti-Tamper Logs (`identityLog`)

### Info Banner

```
(p-4, rounded-xl, border-indigo-500/20, bg-indigo-500/5)

  [🔒 Lock — indigo-400]
  CHALLENGER REGISTRY LEDGER  (bold, uppercase, text-white)
  To maintain the integrity of global tournaments, all modifications to
  nickname tags or regional affiliations are permanently logged to this
  client audit ledger. Tampering or spoofing database records will
  immediately reset active tournament streak counts.
  (text-xs, text-slate-300)
```

### Empty State

```
[IF identityLogs.length === 0]
  (text-center, py-8, text-slate-500, text-xs, mono)
  "No handshakes registered yet."
```

### Log Entries

```
[IF identityLogs.length > 0]
  (border-slate-900, rounded-2xl, bg-slate-950/20, divide-y divide-slate-900)

  Each log entry (p-4, flex-col→row responsive, text-xs, mono):
  ┌──────────────────────────────────────────────────────────────────┐
  │ TAG REGISTERED: [DYNAMIC: log.previousName]                      │
  │                    ➜  [DYNAMIC: log.newName]                      │
  │ REGION ALIGNMENT: [DYNAMIC: log.previousCountry] (uppercase)     │
  │                    ➜  [DYNAMIC: log.newCountry] (emerald, bold)  │
  │                                                                  │
  │                          HANDSHAKE TIMESTAMP   [DYNAMIC: log.   │
  │                          [date] [time]           status]        │
  │                                                (emerald badge,   │
  │                                                 9px, uppercase,  │
  │                                                 bg-emerald-500/10│
  │                                                 border-emerald-  │
  │                                                 500/20)          │
  └──────────────────────────────────────────────────────────────────┘

  Status badge values: VERIFIED | APPROVED | FIRST_HANDSHAKE
```

---

## Complete Toast/Notification Messages

| Trigger | Type | Message |
|---------|------|---------|
| Avatar file not image | error | "Please select a valid image file." |
| Avatar file > 1.5MB | error | "Image size exceeds 1.5MB. Please choose a smaller file." |
| Avatar selected successfully | success | "Custom avatar selected! Save your handshake to lock it in." |
| Save profile — empty name | error | "Nickname cannot be empty!" |
| Save profile — name > 15 chars | error | "Nickname must be 15 characters or less." |
| Save profile — server error | error | [DYNAMIC: data.error] OR "Failed to save profile." |
| Save profile — network error | error | "Network error. Please try again." |
| Save profile — success | success | "Handshake secure! Profile & Social links saved successfully! 🔒" |
| Add friend — already exists | error | "[DYNAMIC: name] is already in your allied squad list!" |
| Add friend — success | success | "[DYNAMIC: name] has been synced into your ally list! 🔗" |
| Remove friend | info | "Alliance with [DYNAMIC: name] dismantled." |
| Send gift | success | "Deposited 25 tactical bonus Chips to [DYNAMIC: name]! 🎁" |
| Spectate (demo) | info | "Spectating [DYNAMIC: name]'s live match... (demo)" |
| Co-op — player can't afford | error | "You do not have enough chips for [DYNAMIC: arena.name]!" |
| Co-op — friend can't afford (counter exists) | info | "Co-op invitation rejected: Insufficient chips. Counter-proposal received!" |
| Co-op — friend can't afford (no counter) | error | "Co-op invitation rejected: Insufficient chips." |
| Co-op — friend no chips at all | error | (sets modal status message, no separate toast beyond above) |
| Co-op — accepted | success | "Co-op invite accepted by [DYNAMIC: name]! Staking buy-in... 🤝⚔️" |
| Co-op — counter-proposal accepted | info | "Switched buy-in to match counter-proposal!" |
| Logout | info | "Signed out." |
| Change password — success | success | "Password changed successfully!" |
| Change password — server error | error | [DYNAMIC: data.error] OR "Failed to change password." |
| Change password — network error | error | "Network error." |
| Change PIN — success | success | [DYNAMIC: data.message] OR "Security PIN updated!" |
| Change PIN — server error | error | [DYNAMIC: data.error] OR "Failed to change PIN." |
| Change PIN — network error | error | "Network error." |
| Guest upgrade — success | success | "Account upgraded successfully! All progress preserved." |
| Guest upgrade — server error | (inline) | [DYNAMIC: data.error] OR "Upgrade failed." |
| Guest upgrade — network error | (inline) | "Network error. Please try again." |

---

## Preset Avatar Options (Identity Editor)

| ID | Label | Emoji |
|----|-------|-------|
| av-viper | Venomous Viper | 🐍 |
| av-skull | Syndicate Skull | ☠️ |
| av-invader | Pixel Invader | 👾 |
| av-sentinel | Cyber Sentinel | 🤖 |
| av-king | Midas King | 👑 |
| av-storm | Storm Surge | ⚡ |
| av-fury | Crimson Fury | 🔥 |
| av-nebula | Cosmic Nebula | 🌌 |

---

## Seed Data (Initial Friends)

| Name | Tag | Status | Level | Skin Color |
|------|-----|--------|-------|------------|
| ApexViper | APEX-1029 | online | 42 | #10b981 |
| ShadowSlinker | SLNK-9281 | in-match | 18 | #a855f7 |
| CoinGobbler | COIN-5432 | offline | 29 | #eab308 |
| VenomKing | VNOM-0001 | idle | 55 | #ef4444 |

## Seed Data (Initial Match History)

| Arena | Online | Status | Chips | Kills | Tail | Duration |
|-------|--------|--------|-------|-------|------|----------|
| Slum Alley | no | EXTRACTED | +180 c | 3 | 22 | 85s |
| Neon Grid | yes | COLLIDED | -50 c | 1 | 14 | 42s |
| Viper Syndicate | yes | EXTRACTED | +640 c | 6 | 35 | 164s |

## Seed Data (Initial Identity Log)

| Previous Name | New Name | Prev Country | New Country | Status |
|---------------|----------|--------------|-------------|--------|
| Unregistered Agent | [DYNAMIC: player.name] | None | [DYNAMIC: player.country \|\| 'US'] | FIRST_HANDSHAKE |
