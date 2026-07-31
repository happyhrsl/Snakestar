# Social Panel — Friends & Global Search
**Source:** `src/components/panels/social-panel.tsx` (1322 lines)
**Prerequisite:** User must be signed in. If not, renders `<NotSignedIn />` component.

---

## PANEL HEADER (Always Visible)

No standalone heading. The panel is a rounded container with a violet glow blob (top-right, decorative).

### Top-Level Tabs
Two tab buttons in a dark pill container:

```
[Users icon] Friends & Global Search ([DYNAMIC: friends.length])
[Shield icon] Competitive Syndicate [DYNAMIC: joinedClan.tag]  ← only if in a clan
```

- Active tab: violet background tint, violet border, violet text
- Inactive tab: slate-500 text, transparent border

---

## ═══════════ TAB 1: FRIENDS & GLOBAL SEARCH ═══════════

### Sub-Tabs (3 buttons in a dark pill container)

```
[Users icon] My Friends ([DYNAMIC: friends.length])
[Swords icon] My Rivals ([DYNAMIC: rivals.length])
[Globe icon] Search Global Players
```

### Add Friend Bar (always visible under sub-tabs)

```
┌──────────────────────────────────────────────────────────────┐
│ [Input field]  "Enter Player Tag (e.g. COBRA-4231)..."      │
│                               [UserPlus icon] Add Friend     │
└──────────────────────────────────────────────────────────────┘
```

- Button disabled + spinning Loader2 icon when `addFriendLoading` is true

---

### ──── SUB-TAB: My Friends ────

#### Branch A: Has Incoming Pending Requests (`pendingReceived.length > 0`)

```
[UserPlus icon] INCOMING REQUESTS ([DYNAMIC: count])
```

Each pending request is an amber-bordered card:

```
┌─────────────────────────────────────────────────────────────────────┐
│ [🐍 avatar]  PlayerName                                             │
│             #USER-TAG · Lvl [DYNAMIC: level]                        │
│                                              [✓ Accept] [✗ Decline]│
└─────────────────────────────────────────────────────────────────────┘
```
- Accept button: green (`bg-emerald-600`), text "✓ Accept"
- Decline button: dark with rose hover (`bg-slate-800`), text "✗ Decline"

#### Branch B: Has Outgoing Pending Requests (`pendingSent.length > 0`)

```
OUTGOING REQUESTS ([DYNAMIC: count])
```

Each sent request is a compact row:

```
[🐍 avatar]  PlayerName  #USER-TAG  [Pending badge (amber, pill)]
```

- "Pending" badge: amber-400 text, amber-500/10 bg, amber-500/30 border, pill shape

#### Branch C: Loading State (`friendsLoading === true`)

```
        [spinning Loader2 icon] Loading friends…
```

#### Branch D: Empty State (no friends, no pending requests)

```
┌─────────────────────────────────────────────┐
│               [Users icon]                  │
│        Your Friends List is Empty           │
│  Use "Search Global Players" above or      │
│  enter a player tag to send a friend        │
│  request, gift daily free chips, and play!  │
└─────────────────────────────────────────────┘
```

#### Branch E: Has Accepted Friends

2-column grid of **Friend Cards**. Each card:

```
┌──────────────────────────────────────────────────────────────┐
│ [🐍 avatar]  PlayerName                            [✗ remove]│
│             #USER-TAG                                    │
│                                                              │
│ [● status dot] Lobby              Lvl [DYNAMIC: level]      │
│                                                              │
│ [Conditional: Gift button]  [Spectate]  [Invite]  [Gift]    │
└──────────────────────────────────────────────────────────────┘
```

**Status line:**
- If online: green dot + "Lobby"
- If offline: slate dot + "Offline"

**Action buttons (flex-wrap row):**

| Button | Condition | Appearance | Text |
|--------|-----------|------------|------|
| Gift claim | `giftReceived === true` | Green (`bg-emerald-600`) | "🎁 Claim +25c" |
| No gift | `giftReceived === false` | Slate, disabled-looking | "No pending gift" |
| Spectate | `online === true` | Cyan, bordered | "👁 Spectate" |
| Invite | Always visible | Violet, bordered. Disabled if offline | "⚔ Invite" |
| Send Gift | `giftSent === false` | Amber, bordered | "📤 Send Gift" |
| Gift Sent | `giftSent === true` | Slate, cursor-not-allowed | "📤 Sent Today" |

- Remove (✗) button: top-right corner, rose hover, tooltip "Remove Friend"

---

### ──── SUB-TAB: My Rivals ────

#### Section Header

```
RIVALRY & REVENGE TRACKER                              [DYNAMIC: count] Active Rivals
Players who eliminated you or collided with you in arena matches.
Track their online status and join their exact arena to seek revenge!
```

- "Active Rivals" badge: rose-300 text, rose-500/10 bg, rose-500/30 border, pill shape

#### Branch A: Empty State (`rivals.length === 0`)

```
┌─────────────────────────────────────────────────────────────┐
│                    [Swords icon]                             │
│              No Rivals in Your List                          │
│  When you get eliminated or collide with players in matches, │
│  click "ADD RIVAL" on the game-over screen to track them    │
│  here!                                                       │
└─────────────────────────────────────────────────────────────┘
```

#### Branch B: Has Rivals

2-column grid of **Rival Cards**. Each card (rose border):

```
┌──────────────────────────────────────────────────────────────┐
│ [⚔️ avatar]  RivalName                      [UserPlus] [✗]  │
│             #USER-TAG · Lvl [DYNAMIC: level]                │
│                                                              │
│ ⚔️ Playing Arena                🕒 [DYNAMIC: lastDate]     │
│                                                              │
│ ┌─ Head-To-Head Record: ───────────────────────────────┐   │
│ │  You: [DYNAMIC: killsByYou]  -  Rival: [DYNAMIC: kills│   │
│ │                                        OfYou]         │   │
│ └───────────────────────────────────────────────────────┘   │
│ ┌─ CURRENT ARENA TABLE: ──────────────────────────────┐     │
│ │  [DYNAMIC: arenaName]                                │     │
│ └───────────────────────────────────────────────────────┘   │
│                                                              │
│ [  ⚔ HUNT / JOIN ARENA  ]                                   │
└──────────────────────────────────────────────────────────────┘
```

**Status badges (top of card body):**
- `in-match`: "⚔️ Playing Arena" (rose-400)
- `online`: "🟢 Online" (emerald-400)
- `idle`: "🟢 Online" (emerald-400)
- `offline`: "⚪ Offline" (slate-500)

**Header icons:**
- UserPlus icon: tooltip "Convert to Friend", emerald hover
- ✗ icon: tooltip "Remove Rival", rose hover

**HUNT / JOIN ARENA button:** Full-width, rose-600 bg, white text

---

### ──── SUB-TAB: Search Global Players ────

#### Search Bar + Country Filter

```
┌──────────────────────────────────────────────────────────────────┐
│ [🔍 icon] [Input] "Search players globally by Name or Tag       │
│            (e.g. Cobra, #IND-8821)..."                           │
│                                                                  │
│            [Dropdown: Country Filter]                            │
└──────────────────────────────────────────────────────────────────┘
```

**Country filter dropdown options (11 items):**

| Value | Label |
|-------|-------|
| ALL | 🌐 All Countries |
| IN | 🇮🇳 India |
| US | 🇺🇸 United States |
| JP | 🇯🇵 Japan |
| KR | 🇰🇷 South Korea |
| GB | 🇬🇧 United Kingdom |
| DE | 🇩🇪 Germany |
| BR | 🇧🇷 Brazil |
| AU | 🇦🇺 Australia |
| CA | 🇨🇦 Canada |
| FR | 🇫🇷 France |

#### Branch A: Loading State

```
        [spinning Loader2 icon] Loading global players…
```

#### Branch B: No Results

```
No players match your search.
```

#### Branch C: Player List (ordered list, max-height 55vh, scrollable)

Each player row:

```
┌──────────────────────────────────────────────────────────────────────┐
│ [Country flag]  PlayerName [You badge] #USER-TAG                    │
│                🪙 [DYNAMIC: chips]k · Lvl [DYNAMIC: lvl] · #[rank] │
│                                                              [btn]  │
└──────────────────────────────────────────────────────────────────────┘
```

**Right-side button — 3 conditions:**

| Condition | Display |
|-----------|---------|
| Self (`isSelf`) | Slate badge: "You" |
| Already connected (friend or pending) | Green badge: "✓ Connected" |
| Not connected | Violet bordered button: "[UserPlus icon] Connect" |

**"You" inline badge** (next to name, only for self): violet-300 text, violet-500/10 bg, violet-500/30 border, pill, text "You"

---

## ═══════════ TAB 2: COMPETITIVE SYNDICATE ═══════════

### Branch A: Not in a Clan (`joinedClan === null`)

#### Header Section

```
[Shield icon] Choose Your Combat Syndicate
Syndicates are competitive teams of Venom Arena players. Work cooperatively,
pool chip assets to unlock level-based buffs, compete on Clan Leaderboards,
and chat in private feeds!

                                         [Plus icon] Register Syndicate (500c)
```

#### Search Bar

```
[🔍 icon] [Input] "Search public Syndicates..."
```

#### Clan Cards (2-column grid, data from PUBLIC_CLANS)

**Card 1: Apex Predators**
```
┌──────────────────────────────────────────────────────┐
│ 🦅  Apex Predators                      Lvl 8       │
│     [APEX]                                               │
│ "Elite hunters only. Extract with 100+ chips or get    │
│  kicked."                                               │
│                                                         │
│ ┌─ Members ──┐  ┌─ Clan Bank ──────────────────────┐  │
│ │ 3           │  │ 15,000c                          │  │
│ └─────────────┘  └──────────────────────────────────┘  │
│                                                         │
│ [        Join Syndicate        ]                        │
└──────────────────────────────────────────────────────┘
```

**Card 2: Slinky Syndicate**
```
┌──────────────────────────────────────────────────────┐
│ 🐍  Slinky Syndicate                     Lvl 5       │
│     [SLYK]                                               │
│ "Casual chip collectors. Let's grow together!"          │
│                                                         │
│ ┌─ Members ──┐  ┌─ Clan Bank ──────────────────────┐  │
│ │ 3           │  │ 4,500c                           │  │
│ └─────────────┘  └──────────────────────────────────┘  │
│                                                         │
│ [        Join Syndicate        ]                        │
└──────────────────────────────────────────────────────┘
```

- Clan tag badge: violet-300 text, violet-500/10 bg, violet-500/30 border
- Level badge: amber-300 text, amber-500/10 bg, amber-500/30 border
- Join button: slate-900 bg, violet text, hover violet-600 bg

### Branch B: In a Clan (`joinedClan !== null`)

#### Clan Header

```
[EMOJI emblem] ClanName  [CLAN-TAG]
Level [DYNAMIC: level] · [DYNAMIC: memberCount] Members

                                           [LogOut icon] Leave Syndicate
```

- Leave button: slate-950 bg, rose hover

#### Level Progress Bar

```
┌──────────────────────────────────────────────────────────────────┐
│ [Award icon] Syndicate level [DYNAMIC: level]     [DYNAMIC XP] / [DYNAMIC XP] XP │
│ [████████████████████░░░░░░░░░░░░░░░░░░] (gradient violet→amber)  │
└──────────────────────────────────────────────────────────────────┘
```

#### 3-Column Layout

**Column 1 (left): Vault + Members**

```
┌─ Co-Op Syndicate Vault ─────────────────────────────────────────┐
│ [Coins icon]                                                     │
│ Deposit excess banked chips to grow the vault balance.          │
│ Deposits earn 10% value in Clan XP! Current Vault:              │
│ [DYNAMIC: player.bankedChips] c                                  │
│                                                                  │
│ [Input: "Amt (e.g. 100)"]  [Coins icon] Deposit                │
└──────────────────────────────────────────────────────────────────┘
```

```
┌─ Active Members ([DYNAMIC: memberCount]/30) ────────────────────┐
│ Leader: 👑 [DYNAMIC: leaderName]                                 │
│                                                                  │
│ MemberName  [role]                      Lvl [level]              │
│ MemberName  [role]                      Lvl [level]              │
│ ...  (scrollable, max-h-48)                                     │
└──────────────────────────────────────────────────────────────────┘
```

**Column 2-3 (right): Chat**

```
┌─ Syndicate HQ Feed ──────────────────── Active conversation channel ─┐
│                                                                      │
│  [Branch A: No messages]                                            │
│  No messages yet. Say hi to your syndicate!                         │
│                                                                      │
│  [Branch B: With messages]                                          │
│  senderName · just now                                               │
│  ┌─ [self msg: violet bg] ───────────┐  or  ┌─ [other: slate bg] ─┐ │
│  │ Message text                       │     │ Message text         │ │
│  └────────────────────────────────────┘     └──────────────────────┘ │
│  (scrollable, max-h-300, min-h-200)                                  │
│                                                                      │
│  [Input: "Type message to Syndicate..."]  [Send icon] Send         │
└──────────────────────────────────────────────────────────────────────┘
```

---

## MODAL: Syndicate Charter Registration

**Triggered by:** "Register Syndicate (500c)" button when `showCreateClan === true`

```
┌──────────────────────────────────────────────────────────────────┐
│  Syndicate Charter Registration                          [✗ close]│
│                                                                  │
│  SYNDICATE NAME                                                │
│  [Input: "e.g. Poison Fangs"]                                 │
│                                                                  │
│  CLAN TAG (3-4 CHARS)                                          │
│  [Input: "e.g. FANG"]  (max 4 chars, uppercase auto)          │
│                                                                  │
│  SELECT EMBLEM SYMBOL                                          │
│  [🐍] [🦅] [🎯] [💀] [💎] [🔥] [👑] [⚡] [🏆] [☣️]            │
│  (selected: violet bg+border; unselected: dark bg+border)      │
│                                                                  │
│  DESCRIPTION / MANIFESTO                                       │
│  [Textarea: "Write your squad's focus, rules or motto..."]     │
│  (3 rows)                                                       │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│  Cost: 500 c                    [Cancel]  [✓ Establish Charter]│
└──────────────────────────────────────────────────────────────────┘
```

- All 10 PRESET_EMBLEMS displayed as clickable buttons

---

## MODAL: Co-Op Lobby Invite

**Triggered by:** "Invite" button on a Friend Card when `coOpFriend !== null`

```
┌──────────────────────────────────────────────────────────────────┐
│  Co-Op Lobby Invite                                    [✗ close]│
│  Assemble a squad with your allies                             │
│                                                                  │
│  ┌─ Your Balance ──────────┐  ┌─ [Friend Name] ────────────┐  │
│  │ [DYNAMIC: chips]c       │  │ [DYNAMIC: friendChips]c    │  │
│  └─────────────────────────┘  └────────────────────────────┘  │
│                                                                  │
│  SELECT ARENA STAKES                                            │
│  ┌─ Scrap Alley ─────┐  ┌─ Rust Market ──────┐                │
│  │ Buy-In: 10 c      │  │ Buy-In: 20 c       │                │
│  └────────────────────┘  └────────────────────┘                │
│  ┌─ Copper Lane ─────┐  ┌─ Neon Grid ────────┐                │
│  │ Buy-In: 40 c      │  │ Buy-In: 75 c       │                │
│  └────────────────────┘  └────────────────────┘                │
│  ┌─ Iron District ───┐  ┌─ Bronze Arena ─────┐                │
│  │ Buy-In: 150 c     │  │ Buy-In: 300 c      │                │
│  └────────────────────┘  └────────────────────┘                │
│  ... (all 30 ARENA_TIERS, scrollable max-h-200)                 │
│                                                                  │
│  [Center status badges - 3 conditions:]                         │
│  - Both can afford:  "Eligible 🤝" (emerald)                   │
│  - You can't afford: "You can't afford" (rose)                 │
│  - They can't afford: "They can't afford" (rose)               │
│                                                                  │
│  [Branch: You can't afford - shows proposal box:]               │
│  "Sorry! I don't have enough chips for [arena name]             │
│   (need [buyIn] c, only have [chips] c).                        │
│   Let's join the "Scrap Alley" (Buy-In: 10 c) instead!         │
│   Re-invite me?"                                                │
│   [🤝 Accept Proposal & Invite]                                 │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                              [Cancel]  [Send Co-Op Invite]      │
└──────────────────────────────────────────────────────────────────┘
```

- Arena tier cards: selected = violet bg+border; unselected = dark bg+border
- Send Co-Op Invite disabled when either player can't afford

---

## TOAST NOTIFICATIONS (triggered by various actions)

| Action | Toast Text | Type |
|--------|-----------|------|
| Add friend (empty tag) | "Please enter a player tag or name." | error |
| Add friend fail | "Failed to send request." or `[dynamic error]` | error |
| Add friend success | "Friend request sent to [TAG]! 🤝" | success |
| Remove friend | "Removed [name] from friends list." | info |
| Accept request | "Accepted friend request from [name]! 🤝" | success |
| Decline request | "Declined friend request from [name]." | info |
| Connect global | "Connected with [name]! 🤝" | success |
| Send gift | "Sent 25 Daily Chips Gift to [name]! 🎁" | success |
| Claim gift | "Claimed 25 chips gift from [name]! 🪙" | success |
| Spectate (no onSpectateFriend) | "Joining spectating server for [name]... 👁️" | info |
| Hunt rival | "⚔️ HUNT INITIATED: Entering [arena] to take down [name]!" | info |
| Convert rival | "[name] converted from rival to friend!" | success |
| Remove rival | "Removed [name] from rivals list." | info |
| Join clan (already in one) | "You are already in a clan! Leave your current clan first." | error |
| Join clan success | "Welcome to [name] [[TAG]]! 🛡️" | success |
| Leave clan | "Left [name] [[TAG]]." | info |
| Create clan (short name) | "Syndicate Name must be at least 4 characters." | error |
| Create clan (bad tag) | "Clan Tag must be 3-4 characters." | error |
| Create clan (no chips) | "You need at least 500 chips to register a Syndicate." | error |
| Create clan success | 'Syndicate "[name]" [[TAG]] established!' | success |
| Deposit (invalid) | "Enter a valid deposit amount." | error |
| Deposit (insufficient) | "Insufficient chips to deposit." | error |
| Deposit success | "Deposited [amt]c to syndicate vault (+[10%] Clan XP)!" | success |
| Network error | "Network error. Please try again." | error |
