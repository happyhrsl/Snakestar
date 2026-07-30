# Clan System — Viper Clan & Syndicate Guild HQ
**Source:** `src/components/panels/clan-system.tsx` (784 lines)
**Prerequisite:** User must be signed in. If not, renders `<NotSignedIn />` component.
**Theme color:** Indigo (glow blob, active tabs, accents).

---

## PANEL HEADER (Always Visible)

```
[Shield icon] Viper Clan & Syndicate Guild HQ
Form or join a player syndicate, pool chips into the Clan Treasury, level up for
extraction perks, and dominate Clan Wars!
```

### Tabs (3 buttons in a dark pill container)

```
[Shield icon] My Clan
[Search icon] Browse Clans
[Plus icon] Form Syndicate
```

- Active tab: indigo background tint, indigo border, indigo text
- Inactive tab: slate-500 text, transparent border

---

## ═══════════ TAB 1: MY CLAN ═══════════

### Branch A: Not in a Clan (`playerClanTag === null`)

```
┌─────────────────────────────────────────────────────────────┐
│                     [Shield icon]                            │
│            You are not in a Viper Clan                       │
│                                                              │
│  Join an existing clan from the directory to participate    │
│  in Clan Wars and earn extraction perks, or form your own   │
│  syndicate!                                                  │
│                                                              │
│           [Browse Clans]    [Form Syndicate]                 │
└─────────────────────────────────────────────────────────────┘
```

- "Browse Clans" button: indigo-600 bg, white text
- "Form Syndicate" button: slate-950 bg, slate border, indigo hover border

### Branch B: In a Clan (`playerClanTag !== null`)

#### Clan Identity Header

```
┌──────────────────────────────────────────────────────────────────────┐
│ [EMOJI emblem]  ClanName  [CLAN-TAG]  [🏆 clanRank badge]        │
│               "[DYNAMIC: description]"                              │
│                                                                      │
│                                         [✗ icon] Leave Syndicate   │
└──────────────────────────────────────────────────────────────────────┘
```

- Clan tag badge: indigo-300 text, indigo-500/10 bg, indigo-500/30 border
- Clan rank badge (conditional, only if `player.clanRank` exists): amber-300 text, amber-500/10 bg, amber-500/30 border, Trophy icon, text e.g. "Leader"
- Leave Syndicate button: slate-950 bg, rose hover; shows Loader2 spinner while busy

#### Stats Row (3 columns)

```
┌─ YOUR RANK ──────────┐  ┌─ MEMBERS ─────────────┐  ┌─ CLAN LEVEL ────────┐
│ [DYNAMIC: clanRank]  │  │ [DYNAMIC: count] / 30 │  │ Lvl [DYNAMIC: lvl]  │
│ or "Viper"           │  │                        │  │                      │
└──────────────────────┘  └────────────────────────┘  └──────────────────────┘
```

#### Clan Treasury Bank

```
┌─ Clan Treasury Bank ────────────────────────── [DYNAMIC: bankedChips] c ─┐
│ [Coins icon]                                                                │
│                                                                             │
│ [Input: "Amt (e.g. 100)"]                          [Coins icon] Deposit  │
└─────────────────────────────────────────────────────────────────────────────┘
```

- Deposit button: emerald-600 bg; shows Loader2 spinner while busy

#### Perks Row (3 columns)

```
┌─ Self-Sponsored Arenas ───────────────────┐
│ Host custom clan tournaments funded by   │
│ Treasury                                   │
└───────────────────────────────────────────┘
┌─ Clan Tag Emblem ────────────────────────┐
│ Displays [CLAN-TAG] badge in match       │
│ leaderboards                              │
└───────────────────────────────────────────┘
┌─ Syndicate Wars Access ─────────────────┐
│ Qualified for weekly Clan vs Clan        │
│ prize matches                            │
└──────────────────────────────────────────┘
```

#### Member Roster

```
Member Roster ([DYNAMIC: memberCount])                    Max Capacity: 30
```

**Branch A: Loading** — 3 skeleton rows (PanelSkeleton)

**Branch B: No members**
```
┌──────────────────────────────────────────────────────────────┐
│                       [Users icon]                           │
│  Clan roster will populate as members play matches.          │
└──────────────────────────────────────────────────────────────┘
```

**Branch C: Has members** (ordered list, scrollable max-h-64)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [Country flag]  MemberName  [userTag]  [LEADER badge]       [chips]c      │
│                 Level [level]                          [Inspect]          │
└──────────────────────────────────────────────────────────────────────────┘
```

- LEADER badge (conditional, only if `clanRank === 'Leader'`): amber-300 text, amber-500/10 bg, amber-500/30 border
- Inspect button: slate-900 bg, indigo-300 text, indigo border

#### Syndicate Chat Feed

```
┌─ [MessageSquare icon] Syndicate Chat Feed ────────────────────────────────┐
│                                                                           │
│  [Branch A: Loading] — 3 skeleton rows (PanelSkeleton)                    │
│                                                                           │
│  [Branch B: No messages]                                                  │
│  No messages yet. Be the first to post!                                   │
│                                                                           │
│  [Branch C: With messages]                                                │
│  senderName [rank] · [DYNAMIC: HH:MM:SS timestamp]                       │
│  ┌──────────────────────────────────────────────┐                        │
│  │ message text                                 │                        │
│  └──────────────────────────────────────────────┘                        │
│  (scrollable, max-h-200)                                                   │
│                                                                           │
│  ─────────────────────────────────────────────────────────────────────  │
│  [Input: "Type a message for your clan..."]  [Send icon] Send           │
└───────────────────────────────────────────────────────────────────────────┘
```

- Send button: indigo-600 bg; shows Loader2 spinner while busy; disabled when input empty or busy
- Message author name: indigo-300, bold
- Message rank: slate-600

---

## ═══════════ TAB 2: BROWSE CLANS ═══════════

### Search Bar

```
[🔍 icon] [Input] "Search clans by name or tag..."
```

### Branch A: Loading

6 skeleton cards (PanelSkeleton, h-52)

### Branch B: No Clans

```
┌─────────────────────────────────────────────────────────────┐
│                     [Shield icon]                            │
│                   No Clans Found                             │
│                                                              │
│  No syndicate clans have been formed yet. Be the first to   │
│  create one!                                                 │
│                                                              │
│              [Form the First Syndicate]                      │
└─────────────────────────────────────────────────────────────┘
```

### Branch C: Clan Cards (3-column responsive grid)

Each clan card:

```
┌──────────────────────────────────────────────────────┐
│ [EMOJI emblem]  ClanName                              │
│                 [CLAN-TAG]                             │
│                                                        │
│ "[DYNAMIC: description]"                               │
│                                                        │
│ ┌─ LEVEL ──┐  ┌─ MEMBERS ──┐  ┌─ TREASURY ──────┐  │
│ │ [level]   │  │ [count]/30 │  │ [chips formatted]│  │
│ └───────────┘  └────────────┘  └─────────────────┘  │
│                                                        │
│ [        Join Syndicate        ]  OR                   │
│ [      Already a Member        ]  OR                   │
│ [     Join Syndicate (disabled)  ]                      │
└──────────────────────────────────────────────────────┘
```

- Treasury values ≥1,000,000 display as "X.XM"; otherwise comma-formatted
- Join button states:
  - Not in any clan: indigo-600 bg, white text, "Join Syndicate" (Loader2 spinner while joining)
  - Already in this clan: slate-900 bg, slate-500 text, "Already a Member", cursor-default
  - In a different clan: slate-900 bg, slate-500 text, "Join Syndicate", cursor-not-allowed, disabled

---

## ═══════════ TAB 3: FORM SYNDICATE ═══════════

```
┌──────────────────────────────────────────────────────────────────┐
│ [Plus icon] Form a New Viper Syndicate Clan                      │
│                                                                    │
│ SYNDICATE NAME                                                    │
│ [Input: "e.g. Omega Extractions"]                               │
│                                                                    │
│ CLAN TAG (3-5 CHARS, LETTERS/NUMBERS)                           │
│ [Input: "e.g. OMG"]  (max 5 chars, mono font, uppercase auto)  │
│                                                                    │
│ SYNDICATE DESCRIPTION                                            │
│ [Input: "e.g. Extraction above all else."]                     │
│                                                                    │
│ EMBLEM LOGO                                                        │
│ [Dropdown select]                                                │
│   🐍 Viper Snake                                                 │
│   👑 Royal Crown                                                 │
│   🥷 Cyber Ninja                                                 │
│   🔥 Phoenix Fire                                                │
│   ⚡ Lightning Bolt                                              │
│   💎 Diamond Shield                                              │
│                                                                    │
│ ─────────────────────────────────────────────────────────────── │
│ Formation: Free                            [Award icon] Form     │
│                                            Syndicate              │
└──────────────────────────────────────────────────────────────────┘
```

- Form Syndicate button: indigo-600 bg; shows Loader2 spinner while busy
- All labels: 10px mono, uppercase, tracking-widest, slate-500

---

## TOAST NOTIFICATIONS

| Action | Toast Text | Type |
|--------|-----------|------|
| Join clan (already in one) | "You are already in a clan! Leave your current clan first." | error |
| Join clan fail | "Failed to join clan." or `[dynamic error]` | error |
| Join clan success | "Welcome to [name] [[TAG]]! 🛡️" | success |
| Leave clan fail | "Failed to leave clan." or `[dynamic error]` | error |
| Leave clan success | "Left [name] [[TAG]]." | info |
| Deposit (invalid) | "Enter a valid deposit amount." | error |
| Deposit (insufficient) | "Insufficient chips to deposit." | error |
| Deposit (no clan) | "You must be in a clan to deposit." | error |
| Deposit fail | "Failed to deposit." or `[dynamic error]` | error |
| Deposit success | "Deposited [amt]c to clan treasury!" | success |
| Broadcast fail | "Failed to send broadcast." or `[dynamic error]` | error |
| Broadcast success | "Broadcast posted to clan chat! 📢" | success |
| Create (missing fields) | "Syndicate Name and Clan Tag are required." | error |
| Create (already in clan) | "Leave your current clan before forming a new one." | error |
| Create fail | "Failed to create clan." or `[dynamic error]` | error |
| Create success | 'Syndicate "[name]" [[TAG]] formed! You are the Leader.' | success |
| Network errors | "Network error [joining/leaving/depositing/creating/broadcasting] clan." | error |
