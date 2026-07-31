# 08 — Panel Components Exhaustive UI Catalog

> Every string literal, button label, heading, status message, placeholder, tab name,
> tooltip, number, icon, import, state variable, API call, and comment with design intent
> from all 15 panel files in `/src/components/panels/`.
>
> **Convention**: `[CODE COMMENT]` = developer comment with design intent.
> Toast messages are prefixed with their type: `[success]`, `[error]`, `[info]`.

---

## 1. `_panel-primitives.tsx` (207 lines) — Shared UI Primitives

[CODE COMMENT] *"Shared visual primitives used by all 8 panels in this directory.
These reproduce the dark-slate / indigo-accent design language of the
original Venom Arena panels."*

### Imports
- `toast` from `sonner`
- `ReactNode` from `react`

### Types
- `ToastType` = `'success' | 'error' | 'info'`
- `ToastFn` = `(msg: string, type?: ToastType) => void`

### Components

#### `notify()` function
- No UI text — routes to `toast.success()`, `toast.error()`, `toast.info()`

#### `PanelShell`
[CODE COMMENT] *"Outer container card for a whole panel."*
- No text content

#### `GlowBlob`
[CODE COMMENT] *"Decorative blurred color blob (for backgrounds)."*
- Default color: `bg-indigo-500/10`
- `aria-hidden="true"`

#### `MicroLabel`
[CODE COMMENT] *"Tiny mono label like \"GLOBAL RANK\" — matches original tracking-widest style."*
- No text content (receives children)

#### `PanelTitle`
[CODE COMMENT] *"Panel heading: big white sans-black tracking-tight title."*
- Props: `icon?`, `title` (string), `subtitle?` (string), `right?`

#### `PrimaryButton`
[CODE COMMENT] *"Primary button — indigo-600, hover indigo-500, mono-ish caps."*
- Default type: `'button'`

#### `GhostButton`
[CODE COMMENT] *"Outline / ghost button — slate border, slate-300 text."*
- Default type: `'button'`

#### `PanelSkeleton`
[CODE COMMENT] *"Skeleton placeholder used during loading."*
- Default count: `6`, default height: `"h-24"`
- `aria-busy="true"`, `aria-live="polite"`

#### `ErrorCard`
[CODE COMMENT] *"Inline error card with retry button."*
- Default retry label: **"Retry"**
- Props: `message` (string), `onRetry?`, `retryLabel?`

#### `NotSignedIn`
- Text: **"Not signed in."**

---

## 2. `arena-selector.tsx` (491 lines) — Arena Tier Selection

[CODE COMMENT] *"Displays 30 online competitive tiers (10c → 1B) grouped by difficulty
with filter tabs, plus 3 offline practice arenas.
Difficulty groups: Beginner (1-6) · Medium (7-12) · High Stakes (13-18) ·
                    Extreme (19-24) · Legendary (25-30)"*

### Imports
- React: `useEffect`, `useMemo`, `useState`
- `useAuth` from `@/components/providers/auth-provider`
- `ARENA_TIERS`, `PRACTICE_TIERS` from `@/lib/game-config`
- `PanelSkeleton`, `NotSignedIn`, `notify`, `ToastFn` from `./_panel-primitives`

### Icons (lucide-react)
- `ChevronRight`, `Filter`, `Landmark`, `Play`, `Shield`, `Swords`, `Trophy`, `Users`, `Zap`

### State Variables
- `isOnline` (boolean, default `true`) — online vs offline mode toggle
- `selectedTierId` (string, default `'tier-1'`)
- `difficultyFilter` (string | null, default `null`)
- `arenaStats` (Record<string, {players, maxPlayers}>)

### API Calls
- `GET /api/arena-stats` — polled every **5 seconds** in online mode
  - [CODE COMMENT] *"network errors silently ignored — stats are decorative"*

### Chip Formatting Helpers
- `chipShort()`: `1500` → `"1.5Kc"`, `1000000` → `"1.0Mc"`, `1000000000` → `"1.0Bc"`
- `chipFull()`: `1500` → `"1,500c (1.5Kc)"`, `0` → `"FREE"`

### Difficulty Filter Tabs
| Label | Accent Color |
|-------|-------------|
| All | `text-slate-400` |
| Beginner | `text-emerald-400` |
| Medium | `text-amber-400` |
| High Stakes | `text-rose-400` |
| Extreme | `text-red-400` |
| Legendary | `text-yellow-400` |

### Mode Toggle Buttons
- **"Online"** (with `Users` icon) — indigo accent when active
- **"Offline"** (with `Swords` icon) — amber accent when active

### Headings
- **"Online PvP Shards"** (when online mode active)
- **"Practice Arenas"** (when offline mode active)
- Subtitle (online): **"30 tiers · 10c → 1B chips"**
- Subtitle (offline): **"Choose your difficulty"**

### Jump to Highest Affordable
- **"Jump to highest affordable: {tierName} ({chipFull})"** (with `Zap` icon)

### Tier List Item Labels
- **"Online"** (micro label for live player count)
- **"Buy-In"** (micro label for cost)
- Status text: **"0 / 1,000"** (fallback when no stats)
- **"FREE"** (when buyIn is 0)

### Selected Arena Detail Card (Right Side)
- Badge: **"{difficulty} Match"**
- Heading: selected tier name
- Subtitle: **"TIER {index} / {total}"** (e.g. "TIER 1 / 30")

### Detail Rows
| Icon | Label | Example Value |
|------|-------|---------------|
| `Landmark` | **"Stake Buy-In"** | `"FREE"` or `"1,000c (1.0Kc)"` |
| `Trophy` | **"Extraction"** | **"EXIT ANYTIME"** |
| `Users` | **"Bot Population"** | **"500 Bots"** |
| — | **"Live Online Players"** | **"42 / 1,000"** |
| `Zap` | **"XP Multiplier"** | **"x1.5 Multi"** |

### Mode Warning Block
**Online multiplayer:**
- **"ONLINE MULTIPLAYER:"** High-stakes arena for up to 1,000 players.
  Collect star chips from defeated opponents and extract safely.
  Graduated commission: **"0% if ≤3 players"**, **"35% if ≥4 players"**.

**Offline practice:**
- **"OFFLINE PRACTICE MODE:"** Risk-free training ground. Test your skills against {bots} bots without wagering, losing, or earning any of your banked chips!

### Enter Button States
- Online, affordable: **"BUY IN ARENA (-{chipFull})"** (indigo gradient)
- Online, unaffordable: **"STAKE AMOUNT EXCEEDS BANK"** (greyed out)
- Offline: **"START PRACTICE MODE (FREE)"** (amber gradient)
- All use `Play` icon

### Toast Messages
- [error] **"Insufficient chips to enter this arena! Claim daily rewards or play lower stakes to rebuild."**

---

## 3. `chip-store.tsx` (404 lines) — Chip Purchase Packs

### Imports
- React: `useEffect`, `useState`
- `useAuth` from `@/components/providers/auth-provider`
- `CHIP_PACKS`, `PROMO_CODES`, `MAX_YEARLY_BUY_CHIPS`, `MAX_DAILY_ADS`, `AD_REWARD_CHIPS`, `ChipPack` from `@/lib/game-config`
- `GlowBlob`, `MicroLabel`, `PanelSkeleton`, `NotSignedIn`, `notify`, `ToastFn` from `./_panel-primitives`

### Icons (lucide-react)
- `Landmark`, `Coins`, `Loader2`, `Sparkles`, `Info`, `ShieldAlert`, `CreditCard`, `Lock`, `Gift`, `Video`

### State Variables
- `busyId` (string | null) — which pack is being purchased
- `promoCode` (string)
- `promoBusy` (boolean)
- `adBusy` (boolean)
- `yearlyPurchased` (number, from localStorage key `venom_yearly_purchased_chips`)
- `adState` ({date, count}, from localStorage key `venom_daily_ads`)

### API Calls
- `POST /api/chips/pack` — body: `{packId}`
- `POST /api/player/promo-reward` — body: `{code}`
- `POST /api/player/video-reward` — no body

### Header
- Heading: **"Integrated Store Matrix (Base Rate: 100 Chips = ₹1)"** (with `Landmark` icon)
- Subtitle: **"Rebuild your bank cushion with fair-play packages bounded by strict annual buy limits (25 Lakh Chips max / year)."** (with `Info` icon)

### Wallet Displays
- **"Your Wallet"** (MicroLabel) — shows `{bankedChips}c` (emerald)
- **"Yearly Buy Cap"** (MicroLabel) — shows `{purchased} / 25,00,000 c` (rose)

### Store Lock Alert
- Heading: **"ANTI-MONOPOLY STORE LOCK ACTIVE (365 DAYS)"** (with `Lock` icon)
- Text: **"You have reached the absolute maximum yearly buy cap of 25 Lakh Chips (2,500,000 chips). Store purchases are disabled to ensure tournament skill remains 100% fair across all 197 countries. Free ad rewards (1,200 chips/day) and arena wagers remain fully active!"**

### Pack Card (per pack from CHIP_PACKS)
- Badge on max pack (`pack-15000`): **"MAX CAP"** (with `Sparkles` icon, amber, animate-pulse)
- Pack name (h3), price MicroLabel: **"₹{priceINR} · {priceUSD}"**
- Description text (p)
- Chips display: **"{count} chips"** (with `Coins` icon)
- Bonus badge: **"{bonus text}"** (with `Sparkles` icon, emerald)
- Button states:
  - Loading: `Loader2` spinner
  - Disabled/locked: **"Locked"** (with `Lock` icon)
  - Normal: **"Buy Pack"** (with `CreditCard` icon)

### Promotional Codes Section
- Heading: **"Promotional Codes"** (with `Gift` icon)
- Text: **"Redeem a promo code for instant bonus chips. Try `VENOM` (+500c) or `CHAMPION` (+1000c)."**
- Placeholder: **"Enter Code (e.g. VENOM)"**
- Button: **"Redeem"** (loading: `Loader2` spinner)

### Daily Reward Ads Section
- Heading: **"Daily Reward Ads (12 Max / Day)"** (with `Video` icon)
- Text: **"Each completed ad awards 100 chips directly to your wallet (Max 1,200 free chips per day). Resets strictly at 00:00 UTC daily."**
- Counter: **"Today: {count}/12 ads · {remaining} remaining"**
- Button states:
  - Loading: **"Buffering Sponsor Offer..."** (with `Loader2`)
  - Exhausted: **"Daily Limit Reached (12/12)"**
  - Available: **"Watch Sponsor Ad (+100 Chips)"** (with `Video` icon)

### Compliance Notice
- **"STORE POLICY COMPLIANCE ASSURANCE:"** This is a store-safe edition. Spending is capped at ₹15,000/year to block monopoly loops. Free potential daily rewards allow non-paying competitors to fully win the World Cup purely through skill and win-rate!

### Toast Messages
- [error] **"Store is locked for 365 days after reaching the 25 Lakh yearly cap."**
- [info] **"Initializing secure App Store/Play Store sandboxed billing for ₹{price} ({usdPrice})..."**
- [error] **"Failed to add chips."**
- [success] **"🎉 Purchase Successful! +{granted} CHIPS added! Annual buy cap of 25 Lakh Chips (2,500,000) reached — Store locked for 365 days to maintain tournament skill parity!"**
- [success] **"Purchase Successful! +{granted} CHIPS credited. (Bought this year: {total} / 25,00,000 max)"**
- [error] **"Network error. Please try again."**
- [error] **"Invalid or expired promo code."**
- [success] **"Promo Code redeemed: +{reward} CHIPS credited!"**
- [error] **"Network error redeeming promo code."**
- [error] **"Daily Ad Limit Reached (12/12)! Resets at 00:00 UTC."**
- [info] **"Launching high-definition sponsor video... Keep active."**
- [error] **"Failed to claim ad reward."**
- [success] **"Sponsor Ad Completed: +{reward} FREE CHIPS deposited! ({count}/12 ads today)"**
- [error] **"Network error claiming ad reward."**

---

## 4. `daily-rewards.tsx` (240 lines) — Daily Login Rewards

### Imports
- React: `useEffect`, `useState`
- `useAuth` from `@/components/providers/auth-provider`
- `DAILY_REWARDS` from `@/lib/game-config`
- `GlowBlob`, `MicroLabel`, `PanelSkeleton`, `NotSignedIn`, `notify`, `ToastFn` from `./_panel-primitives`

### Icons (lucide-react)
- `Gift`, `Check`, `Calendar`, `Flame`, `Loader2`, `Sparkles`

### State Variables
- `busy` (boolean)
- `adBusy` (boolean)
- `now` (number, Date.now(), updates every 1 second via setInterval)

### API Calls
- `POST /api/player/daily` — body: `{multiplier: 1 | 2}`

### Header
- Heading: **"Daily Log Rewards"** (with `Gift` icon, animate-bounce)
- Subtitle: **"Build your claim streak to secure massive payouts for arena entries!"**
- Streak display: **"Current Streak"** (MicroLabel) + **"{days} Days"** (with `Flame` icon, fill)

### 7-Day Grid
- Day labels: **"Day 1"** through **"Day 7"** (MicroLabel)
- Each cell shows reward amount + **"c"** suffix
- Today indicator: **"Today"** badge (emerald, rounded-full)
- Claimed indicator: `Check` icon in emerald circle (aria-label: **"Claimed"**)

### Claim Actions
- **When already claimed:** **"Next Daily Claim available in: {HH:MM:SS}"** + disabled button **"Already Claimed Today"** (with `Check` icon)
- **When available:** **"Day {n} reward is available! Claim now to boost your chips balance."** (with `Sparkles` icon, animate-spin)
  - **"Standard Claim"** button (emerald-to-teal gradient, with `Gift` icon)
  - **"Watch Ad (Double Claim)"** button (indigo, with `Sparkles` icon)
  - Loading state: **"Buffering Sponsor..."** (with `Loader2`)

### Toast Messages
- [error] **"Failed to claim daily reward."**
- [success] **"Claimed Daily Reward: +{reward} CHIPS! {multiplier > 1 ? '(2x Ad Bonus!)' : ''}"**
- [error] **"Network error. Please try again."**
- [info] **"Launching ad-stream sponsor link... Please hold"**

---

## 5. `social-panel.tsx` (1322 lines) — Friends, Rivals, Clans, Community

### Imports
- React: `useCallback`, `useEffect`, `useMemo`, `useState`
- `useAuth` from `@/components/providers/auth-provider`
- `SOCIAL_COUNTRY_FILTER`, `PUBLIC_CLANS`, `PRESET_EMBLEMS`, `BOT_REPLIES`, `countryFlag`, `ARENA_TIERS` from `@/lib/game-config`
- `LeaderboardEntry` from `@/lib/types`
- `GlowBlob`, `MicroLabel`, `NotSignedIn`, `notify`, `ToastFn` from `./_panel-primitives`

### Icons (lucide-react)
- `Users`, `Shield`, `Swords`, `Globe`, `UserPlus`, `Gift`, `Eye`, `Send`, `X`, `Check`, `Coins`, `MessageSquare`, `Search`, `Plus`, `LogOut`, `Award`, `Loader2`

### State Variables
- `topTab` ("friends" | "syndicate", default "friends")
- `friendsSub` ("friends" | "rivals" | "search", default "friends")
- `friends` (FriendItem[])
- `pendingReceived` (PendingRequestItem[])
- `pendingSent` (PendingRequestItem[])
- `friendsLoading` (boolean)
- `rivals` (RivalItem[])
- `globalPlayers` (LeaderboardEntry[])
- `globalLoading` (boolean)
- `search` (string)
- `countryFilter` (string, default "ALL")
- `addFriendInput` (string)
- `addFriendLoading` (boolean)
- `joinedClanId` (string | null)
- `showCreateClan` (boolean)
- `clanForm` ({name, tag, emblem, description})
- `clanChat` ({author, text, ts}[])
- `chatInput` (string)
- `depositAmount` (string)
- `coOpFriend` (FriendItem | null)

### API Calls
- `GET /api/friends/list`
- `GET /api/leaderboard?type=chips&limit=50`
- `POST /api/friends/request` — body: `{userTag}`
- `POST /api/friends/remove` — body: `{userTag}`
- `POST /api/friends/accept` — body: `{userTag}`

### Status Labels
| Key | Label |
|-----|-------|
| online | **"Lobby"** |
| idle | **"Idle"** |
| in-match | **"In-Arena"** |
| offline | **"Offline"** |

### Status Badges (emojis)
| Key | Badge |
|-----|-------|
| in-match | **"⚔️ Playing Arena"** |
| online | **"🟢 Online"** |
| idle | **"🟢 Online"** |
| offline | **"⚪ Offline"** |

### Top Tabs
- **"Friends & Global Search ({count})"** (with `Users` icon)
- **"Competitive Syndicate [{tag}]"** or **"Competitive Syndicate"** (with `Shield` icon)

### Friends Sub-Tabs
- **"My Friends ({count})"** (with `Users` icon)
- **"My Rivals ({count})"** (with `Swords` icon)
- **"Search Global Players"** (with `Globe` icon)

### Add Friend Bar
- Placeholder: **"Enter Player Tag (e.g. COBRA-4231)..."**
- Button: **"Add Friend"** (with `UserPlus` icon, violet)

### Incoming Requests Section
- Heading: **"Incoming Requests ({count})"** (with `UserPlus` icon, amber)
- Buttons per request: **"Accept"** (emerald, with `Check`), **"Decline"** (slate, with `X`)
- User display: avatar (🐍), name, **"#{userTag} · Lvl {level}"**

### Outgoing Requests Section
- Heading: **"Outgoing Requests ({count})"** (slate)
- Badge: **"Pending"** (amber)

### Empty States
- **"Your Friends List is Empty"** (with `Users` icon)
  - **"Use \"Search Global Players\" above or enter a player tag to send a friend request, gift daily free chips, and play!"**
- **"No Rivals in Your List"** (with `Swords` icon)
  - **"When you get eliminated or collide with players in matches, click \"ADD RIVAL\" on the game-over screen to track them here!"**

### Rivals Section
- Heading: **"RIVALRY & REVENGE TRACKER"** (uppercase, white)
- Subtitle: **"Players who eliminated you or collided with you in arena matches. Track their online status and join their exact arena to seek revenge!"**
- Badge: **"{count} Active Rivals"** (rose)

### Rival Card
- Avatar: ⚔️
- Display: **"#{userTag} · Lvl {level}"**, **"🕒 {lastEncounterDate}"**
- MicroLabel: **"Head-To-Head Record:"**
- **"You: {kills}"** (emerald) / **"Rival: {deaths}"** (rose)
- MicroLabel: **"CURRENT ARENA TABLE:"**
- Button: **"HUNT / JOIN ARENA"** (with `Swords` icon, rose)
- Tooltip: **"Convert to Friend"** (with `UserPlus`), **"Remove Rival"** (with `X`)

### Global Search (Leaderboard)
- Placeholder: **"Search players globally by Name or Tag (e.g. Cobra, #IND-8821)..."**
- Country filter dropdown (from `SOCIAL_COUNTRY_FILTER`)
- Empty: **"No players match your search."**
- Player display: flag, name, **"You"** badge (violet), **"#{userTag}"**, **"🪙 {k}k · Lvl {level} · #{rank}"**
- Self badge: **"You"** (slate)
- Connected badge: **"Connected"** (with `Check`, emerald)
- Button: **"Connect"** (with `UserPlus`, violet)

### Friend Card
- Avatar: 🐍 (colored ring based on skinColor)
- Display: name, **"#{userTag}"**, status (online/offline), **"Lvl {level}"**
- Tooltip: **"Remove Friend"** (with `X`)
- Buttons:
  - **"Claim +25c"** (with `Gift`, emerald) — when gift received
  - **"No pending gift"** (slate, disabled) — when no gift
  - **"Spectate"** (with `Eye`, cyan) — only when online
  - **"Invite"** (with `Swords`, violet) — disabled when offline
  - **"Send Gift"** / **"Sent Today"** (with `Send`, amber) — toggle state

### Syndicate Tab (No Clan)
- Heading: **"Choose Your Combat Syndicate"** (with `Shield` icon)
- Subtitle: **"Syndicates are competitive teams of Venom Arena players. Work cooperatively, pool chip assets to unlock level-based buffs, compete on Clan Leaderboards, and chat in private feeds!"**
- Button: **"Register Syndicate (500c)"** (with `Plus` icon, violet)
- Placeholder: **"Search public Syndicates..."**
- Clan card shows: emblem, name, **"[{tag}]"**, **"Lvl {level}"**
- Description in quotes (italic)
- MicroLabels: **"Members"** (count), **"Clan Bank"** (chips)
- Button: **"Join Syndicate"**

### Syndicate Tab (Joined Clan)
- Header: emblem + name + **"[{tag}]"** + **"Level {level} · {members} Members"**
- Button: **"Leave Syndicate"** (with `LogOut` icon)
- XP bar: **"Syndicate level {n}"** (amber, with `Award` icon), **"{xp} / {max} XP"**

#### Co-Op Syndicate Vault
- Heading: **"Co-Op Syndicate Vault"** (with `Coins` icon)
- Text: **"Deposit excess banked chips to grow the vault balance. Deposits earn 10% value in Clan XP! Current Vault: {chips} c"**
- Placeholder: **"Amt (e.g. 100)"**
- Button: **"Deposit"** (with `Coins`, emerald)

#### Active Members
- Heading: **"Active Members ({count}/30)"** (with `Users` icon, violet)
- **"Leader: 👑 {name}"** (or **"Leader: None"**)
- Per member: name + role (MicroLabel) + **"Lvl {level}"** (amber)

#### Syndicate HQ Feed (Chat)
- Heading: **"Syndicate HQ Feed"** (with `MessageSquare`, violet)
- Subtitle: **"Active conversation channel"**
- Empty: **"No messages yet. Say hi to your syndicate!"**
- Message format: **"{author} · {ts}"**
- Placeholder: **"Type message to Syndicate..."**
- Button: **"Send"** (with `Send` icon, violet)

### Create Clan Modal
- Heading: **"Syndicate Charter Registration"**
- Close button: `X` icon
- Label: **"Syndicate Name"**, Placeholder: **"e.g. Poison Fangs"**
- Label: **"Clan Tag (3-4 Chars)"**, Placeholder: **"e.g. FANG"** (maxLength 4, uppercase, mono)
- Label: **"Select Emblem Symbol"** — grid of `PRESET_EMBLEMS`
- Label: **"Description / Manifesto"**, Placeholder: **"Write your squad's focus, rules or motto..."**
- Cost: **"Cost: 500 c"** (emerald)
- Buttons: **"Cancel"** (slate), **"Establish Charter"** (with `Check`, violet)

### Co-Op Invite Modal
- Heading: **"Co-Op Lobby Invite"** (with `Swords` icon, animate-pulse)
- Subtitle: **"Assemble a squad with your allies"**
- Balance cards: **"Your Balance"** / **"{friendName}"** (showing chips with "c" suffix)
- Label: **"Select Arena Stakes"**
- Per tier: name + **"Buy-In: {cost} c"**
- Eligibility pills:
  - **"You can't afford"** (rose)
  - **"They can't afford"** (amber)
  - **"Eligible 🤝"** (emerald)
- Counter-proposal speech: **"{name} responds:"** → quoted text with **"🤝 Accept Proposal & Invite"** button
- Buttons: **"Cancel"**, **"Send Co-Op Invite"** (violet-to-indigo gradient)

### Toast Messages
- [error] **"Please enter a player tag or name."**
- [success] **"Friend request sent to {tag}! 🤝"**
- [error] **"Failed to send request."**
- [success] **"Accepted friend request from {name}! 🤝"**
- [error] **"Failed to accept request."**
- [info] **"Declined friend request from {name}."**
- [info] **"Removed {name} from friends list."**
- [error] **"Failed to remove friend."**
- [success] **"Connected with {name}! 🤝"**
- [success] **"Sent 25 Daily Chips Gift to {name}! 🎁"**
- [success] **"Claimed 25 chips gift from {name}! 🪙"**
- [info] **"Joining spectating server for {name}... 👁️"**
- [info] **"⚔️ HUNT INITIATED: Entering {arena} to take down {name}!"**
- [success] **"{name} converted from rival to friend!"**
- [info] **"Removed {name} from rivals list."**
- [error] **"You are already in a clan! Leave your current clan first."**
- [success] **"Welcome to {name} [{tag}]! 🛡️"**
- [info] **"Left {name} [{tag}]."**
- [error] **"Syndicate Name must be at least 4 characters."**
- [error] **"Clan Tag must be 3-4 characters."**
- [error] **"You need at least 500 chips to register a Syndicate."**
- [success] **"Syndicate \"{name}\" [{tag}] established!"**
- [error] **"Enter a valid deposit amount."**
- [error] **"Insufficient chips to deposit."**
- [success] **"Deposited {amt}c to syndicate vault (+{xp} Clan XP)!"**
- [success] **"Broadcast posted to clan chat! 📢"**
- [success] **"Co-Op invite sent to {name} for {arena}! 🤝"**

---

## 6. `player-profile.tsx` (2360 lines) — Full Player Profile

[CODE COMMENT] *"Faithful replica of /upload/extracted/src/components/PlayerProfile.tsx (1429 lines).
Every text string (4 tabs, 8 stat cards, 3 tournament caps, FAQ, social
badges, ALL button labels and toast messages) is preserved verbatim from
AUDIT-C section D."*

### Imports
- React: `useEffect`, `useState`
- lucide-react: `Award`, `Check`, `Clock`, `Compass`, `Edit2`, `Eye`, `Globe`, `History`, `Landmark`, `Lock`, `LogOut`, `RefreshCw`, `Shield`, `Skull`, `Sparkles`, `Swords`, `Target`, `Trash2`, `Trophy`, `Upload`, `UserPlus`, `Users`, `X`
- `useAuth` from `@/components/providers/auth-provider`
- `ARENA_TIERS`, `COUNTRIES`, `getCosmeticById` from `@/lib/game-config`
- `PlayerProfile` from `@/lib/types`
- `PanelSkeleton`, `NotSignedIn`, `notify`, `ToastFn` from `./_panel-primitives`

### Preset Avatars (8)
| ID | Label | Emoji |
|----|-------|------|
| av-viper | **"Venomous Viper"** | 🐍 |
| av-skull | **"Syndicate Skull"** | 🏴‍☠️ |
| av-invader | **"Pixel Invader"** | 👾 |
| av-sentinel | **"Cyber Sentinel"** | 🤖 |
| av-king | **"Midas King"** | 👑 |
| av-storm | **"Storm Surge"** | ⚡ |
| av-fury | **"Crimson Fury"** | 🔥 |
| av-nebula | **"Cosmic Nebula"** | 🌌 |

### Default Seed Friends (4)
- ApexViper (#APEX-1029, Lvl 42, online, #10b981, gift received)
- ShadowSlinker (#SLNK-9281, Lvl 18, in-match, #a855f7)
- CoinGobbler (#COIN-5432, Lvl 29, offline, #eab308, gift sent)
- VenomKing (#VNOM-0001, Lvl 55, idle, #ef4444)

### Sample Match History (3)
- Slum Alley (practice, EXTRACTED, +180c, 3 kills, len 22, 85s)
- Neon Grid (online, COLLIDED, -50c, 1 kill, len 14, 42s)
- Viper Syndicate (online, EXTRACTED, +640c, 6 kills, len 35, 164s)

### State Variables
- `activeTab` ("stats" | "history" | "friends" | "identityLog")
- `activeInviteFriend` (Friend | null)
- `inviteSelectedArenaId` (string, default "tier-1")
- `inviteStatusMessage` (InviteStatusMessage | null)
- `isEditing` (boolean)
- `newName`, `selectedCountry`, `selectedAvatar` (string)
- `instagram`, `youtube`, `twitch` (string)
- `isDragging`, `saving`, `loggingOut` (boolean)
- `friends`, `matches`, `identityLogs` (arrays from localStorage)
- `newFriendName` (string)

### localStorage Keys
- `venom_friends`
- `venom_match_history`
- `venom_identity_history_log`
- `venom_social_channels`
- `venom_active_match_invite`

### API Calls
- `PUT /api/player` — body: `{name, country, avatar, instagram, youtube, twitch}`
- `POST /api/auth/change-password` — body: `{currentPassword, newPassword}`
- `POST /api/auth/change-pin` — body: `{currentPin, newPin}`
- `POST /api/auth/upgrade` — body: `{name, email, password, pin}`

### Header Section
- Tooltip (avatar): **"EQuipped DNA Skin"**
- Tooltip (edit button): **"Edit Identity"**, aria-label: **"Edit identity"**
- Name display with flag, country code badge (e.g. **"US"**)
- **"Ledger Tag: #{userTag || 'STRK-8291'} • Global Standing: #999"**
- Social links: 📸 (Instagram, pink), 🎥 **"YouTube"** (red), 📱 **"Twitch"** (purple)

### Level Progress
- **"Level Progress"** (with `Sparkles` icon, animate-pulse)
- **"{xp} / {needed} XP"**
- Progress bar (indigo-to-purple gradient)

### Sign Out Button
- Tooltip: **"Logout Session"**
- Label: **"Sign Out"** (with `LogOut` icon, red)

### Tab Navigation (4 tabs)
| ID | Label | Icon |
|----|-------|------|
| stats | **"Records & Statistics"** | `Target` |
| history | **"Match History Ledger"** | `History` |
| friends | **"Friends & Spectate ({count})"** | `Users` |
| identityLog | **"Identity Anti-Tamper Logs"** | `Lock` |

### Stats Tab — 8 Stat Cards
| Label | Sub-Label | Icon | Color |
|-------|----------|------|-------|
| **"Banked Wallet"** | Deposited Chips | `Landmark` | emerald |
| **"Tournament Kills"** | Total Terminations | `Skull` | white |
| **"K/D Ratio"** | Kill / Death Index | `Target` | amber |
| **"Extraction Rate"** | Successful Handshakes | `Compass` | cyan |
| **"Survival Streak"** | Consecutive Extractions | `Trophy` | yellow |
| **"Record Extraction"** | Max Retained in One Run | `Award` | indigo |
| **"Lifetime Retained"** | Cumulative Chip Profit | `Landmark` | teal |
| **"Total Forfeited"** | Forfeited in Crash Events | `RefreshCw` | red |

### Annual Tournament Guardrails
- Heading: **"Annual Tournament Guardrails & Limit Allowances"** (with `Shield`, amber)
- Badge: **"1-YEAR UTC TOURNAMENT CYCLE ACTIVE"** (amber)

#### 3 Cap Cards
1. **"Matches Allowed"** — icon: `Swords`, value: **"18 / 10,000"**, left: **"Completed: 18"**, right: **"Remaining: 9,982 matches"** (emerald)
2. **"Annual Buy Cap (25L)"** — icon: `Landmark`, value: **"0 / 25,00,000 c"**, left: **"Bought: 0 c"**, right: **"Cap Remaining: 25,00,000 c"** (emerald)
3. **"Rewarded Ads Today"** — icon: `Trophy`, value: **"0 / 12 Ads"**, left: **"Watched: 0"**, right: **"Resets at 00:00 UTC"** (amber)

### Challenger Standing Rating Banner
- **"CHALLENGER STANDING RATING"** (uppercase, white)
- **"All tournament statistics are linked directly to your global challenger index handle. Altering your registry flag updates leaderboard feeds dynamically. Data verification handshakes run periodically to check metrics validity."**

### History Tab
- Heading: **"Match Run Records Ledger"** (with `History` icon, indigo)
- Subtitle: **"Showing last 25 operations"**
- Empty: **"No matches found in the active ledger standing."** + **"Jump into any arena to log your first run data!"**

#### Table Headers
| Column | Label |
|--------|-------|
| 1 | **"Arena Sector"** |
| 2 | **"Status"** |
| 3 | **"Chips Outcome"** (right) |
| 4 | **"Kills"** (center) |
| 5 | **"Tail Score"** (center) |
| 6 | **"Time Elapsed"** |
| 7 | **"Timestamp"** |

- Status badges: **"ONLINE"** (indigo) / **"PRACTICE"** (slate)
- Status text: **"EXTRACTED"** (emerald) / **"COLLIDED"** (rose)
- Chip display: **"+{amount} c"** / **"-{amount} c"**
- Time: **"{seconds}s"** (with `Clock` icon)

### Friends Tab
- Heading: **"Friends & Live Spectate Portal"** (with `Users` icon, indigo)
- Subtitle: **"Add allies to build your roster. Send daily gifts, invite them to high-stakes co-op matches, or spectate their live runs in real-time when they are in-match!"**
- Placeholder: **"Enter challenger alias..."** (maxLength 15)
- Button: **"Sync Ally"** (with `UserPlus` icon, indigo)
- Status labels: **"Online"**, **"Idle"**, **"In Match"**, **"Offline"**
- Avatar: 🐍
- Per friend buttons:
  - **"Spectate"** (fuchsia, when in-match, animate-pulse, tooltip: **"Spectate Match"**)
  - **"Invite"** (violet, when online/idle, tooltip: **"Invite to Match"**)
  - **"Gift"** / **"Gifted"** (emerald, tooltip: **"Send Gift"**)
  - Remove (rose, `Trash2` icon, tooltip: **"Dismantle Alliance"**, aria-label: **"Dismantle alliance"**)

### Identity Log Tab
- Info block: **"CHALLENGER REGISTRY LEDGER"** (with `Lock` icon, indigo)
- **"To maintain the integrity of global tournaments, all modifications to nickname tags or regional affiliations are permanently logged to this client audit ledger. Tampering or spoofing database records will immediately reset active tournament streak counts."**
- Empty: **"No handshakes registered yet."**
- Per log entry:
  - **"TAG REGISTERED:"** → old name → **"➜"** → new name
  - **"REGION ALIGNMENT:"** → old country → **"➜"** → new country
  - **"HANDSHAKE TIMESTAMP"** → date + time
  - Status badge: **"VERIFIED"** / **"APPROVED"** / **"FIRST_HANDSHAKE"** (emerald)

### Identity Editor (Handshake Registration Protocol)
- Heading: **"Handshake Registration Protocol"** (with `Lock` icon, animate-pulse, indigo)
- Subtitle: **"Lock down your tournament handle and regional alignment. All changes are logged."**
- Label: **"Challenger Handle"**, Placeholder: **"Enter nickname"**
  - Helper: **"Max 15 characters. System validates non-duplicate handle signatures."**
- Label: **"Faction Region (Flag)"** (country select dropdown)
  - Helper: **"Associates your extraction chips to regional champion rankings."**
  - Format: **"{flag} {name} ({code})"**
- Label: **"Profile Avatar / Identity Emblem"**
  - Drag & drop: **"CHANGE IMAGE"**, **"Drag & Drop or Click"**
  - When preset selected: **"Preset Selected"**, **"Click here to upload custom image instead"**
  - When no avatar: **"Upload Custom Photo"**, **"Drag & Drop or click to browse"**, **"PNG, JPG, WebP up to 1.5MB"**
  - Button: **"Reset to Skin Default"** (with `Trash2`)
  - Label: **"Choose Preset Emblem"** (grid of 8 preset avatars)
- Label: **"Creator Social Channels (Showcased on your Public Profile)"** (with `Globe` icon, purple)
  - Subtitle: **"Link your Instagram handle, YouTube channel, and Twitch profile so other vipers and allies can follow you and watch your game clips!"**
  - Label: **"📸 Instagram Handle"**, Placeholder: **"@username (e.g. @hari_snake_god)"**
  - Label: **"🎥 YouTube Channel / Handle"**, Placeholder: **"@channel or URL"**
  - Label: **"📱 Twitch Stream Handle"**, Placeholder: **"twitch_username"**
- Warning: **"CYBER HANDSHAKE WARNING:"** Changing your registered alias or territory updates global tournament indices. Immutable record logs are appended to the ledger below.
- Buttons: **"Cancel"** (slate), **"Save Handshake"** (with `Check`, indigo)

### Co-Op Invite Modal
- Heading: **"Co-Op Lobby Invite"** (with `Swords`, animate-pulse)
- Subtitle: **"Assemble a squad with your allies"**
- Close: aria-label **"Close modal"**
- Balance cards: **"Your Balance"** / **"{friendName}"**
- Label: **"Select Arena Stakes"**
- Per arena: name + **"Buy-In: {cost} c"**
- Eligibility pills: **"You can't afford"** (rose), **"They can't afford"** (amber), **"Eligible 🤝"** (emerald)
- Speech bubble: **"{name} responds:"** → quoted text
  - Counter button: **"🤝 Accept Proposal & Invite"** (indigo)
- Buttons: **"Cancel"**, **"Send Co-Op Invite"** (violet-to-indigo gradient)

### Security Settings Card
- Heading: **"Security Settings"** (with `Lock`, amber)
- Status: **"🔐 PIN Set"** / **"⚠️ No PIN"**

#### Password
- Label: **"Password"**, description: **"Change your account password"**
- Button: **"Change"** → form:
  - Placeholder: **"Current password"**, **"New password (min 6)"** (minLength 6)
  - Buttons: **"Saving…"** / **"Update Password"**, **"Cancel"**

#### Security PIN
- Label: **"Security PIN"**
- With PIN: description **"Used for password recovery. Keep it safe!"**, button **"Change PIN"**
- Without PIN: description **"Set a 4-digit PIN to enable password recovery."**, button **"Set PIN"**
- Form: Label **"Current PIN"** (if changing), **"New PIN (4 digits)"**
- Placeholders: **"Enter current 4-digit PIN"**, **"Enter new 4-digit PIN"**
- Buttons: **"Saving…"** / **"Update PIN"** / **"Set PIN"**, **"Cancel"**

### Guest Upgrade Banner
- Heading: **"You're playing as a Guest"** (amber)
- Subtitle: **"Upgrade to a registered account to secure your progress. All chips, stats, cosmetics, and friends carry over."**
- Button: **"Upgrade Now"** (with `UserPlus`, amber gradient)

#### Upgrade Form
- Heading: **"Upgrade to Registered Account"**
- Info: **"Your progress is safe. All chips, stats, cosmetics, streaks, friends, and clan memberships carry over. You keep your VENOM tag. Just add an email and password to secure your account."**
- Labels: **"Display Name"** (placeholder **"ViperStrike"**), **"Email"** (placeholder **"you@arena.gg"**), **"Password (min 6 chars)"** (placeholder **"••••••••"**), **"Security PIN (4 digits, optional)"** (placeholder **"e.g. 1234"**)
- Buttons: **"Upgrading…"** / **"Upgrade & Secure Account"** (amber gradient), **"Cancel"**

### Toast Messages
- [error] **"Please select a valid image file."**
- [error] **"Image size exceeds 1.5MB. Please choose a smaller file."**
- [success] **"Custom avatar selected! Save your handshake to lock it in."**
- [success] **"Handshake secure! Profile & Social links saved successfully! 🔒"**
- [error] **"Network error. Please try again."**
- [error] **"Nickname cannot be empty!"**
- [error] **"Nickname must be 15 characters or less."**
- [error] **"Failed to save profile."**
- [error] **"{name} is already in your allied squad list!"**
- [success] **"{name} has been synced into your ally list! 🔗"**
- [info] **"Alliance with {name} dismantled."**
- [success] **"Deposited 25 tactical bonus Chips to {name}! 🎁"**
- [error] **"You do not have enough chips for {name}!"**
- [info] **"Co-op invitation rejected: Insufficient chips. Counter-proposal received!"**
- [success] **"Co-op invite accepted by {name}! Staking buy-in... 🤝⚔️"**
- [info] **"Signed out."**
- [info] **"Switched buy-in to match counter-proposal!"**
- [error] **"Failed to change password."**
- [success] **"Password changed successfully!"**
- [error] **"Network error."**
- [error] **"Failed to change PIN."**
- [success] **"Security PIN updated!"**
- [error] **"Upgrade failed."**
- [success] **"Account upgraded successfully! All progress preserved."**

---

## 7. `leaderboards.tsx` (830 lines) — Lobby Leaderboards

### Imports
- React: `useCallback`, `useEffect`, `useMemo`, `useState`
- `useAuth` from `@/components/providers/auth-provider`
- `COUNTRIES`, `MILESTONE_TIERS`, `MOCK_LEADERBOARD`, `countryFlag`, `countryName`, `milestoneTierForChips`, `InspectedPlayer` from `@/lib/game-config`
- `LeaderboardEntry` from `@/lib/types`
- `GlowBlob`, `MicroLabel`, `PanelSkeleton`, `NotSignedIn`, `notify`, `ToastFn` from `./_panel-primitives`

### Icons (lucide-react)
- `Trophy`, `Crown`, `Globe`, `Medal`, `Zap`, `Search`, `Loader2`, `RefreshCw`, `MapPin`, `Inbox`

### State Variables
- `activeTab` ("summit" | "global" | "national" | "tiers", default "summit")
- `selectedCountry` (string, default "IN")
- `selectedTierId` (string, default "all")
- `countrySearch` (string)
- `liveEntries` (LeaderboardEntry[])
- `loading` (boolean, default true)
- `lastUpdated` (Date | null)

### API Calls
- `GET /api/leaderboard?type=chips&limit=100` (no-store cache)
  - Auto-refreshes every **30 minutes**

### Constants
- `RANK_MEDALS`: {1: **"🥇"**, 2: **"🥈"**, 3: **"🥉"**}
- Seed players: Hari (#IND-001, IN, 10M chips), Apex_Viper (#USA-882, US, 9.4M), K-Snake_Master (#KOR-114, KR, 8.9M), Shadow_Ninja (#JPN-309, JP, 5M), Viper_Zero (#USA-402, US, 2.5M), Rookie_Striker (#IND-104, IN, 1.2M)

### Header
- Badge: **"CURRENT YEAR (2026) CONCURRENT TOURNAMENT"** (amber)
- Badge: **"Live Ranks Update Every 30 Minutes"** (with `Zap` icon, amber)
- Heading: **"Official World Tournament Leaderboards"** (with `Trophy` icon, amber)
- Subtitle: **"Complete real-time standings for World Summit, Global, National, and Milestone Tiers. Click any player row to inspect full profile & rank status!"**
- MicroLabel: **"Last sync: {time} UTC"**
- Button: **"Refresh"** (with `RefreshCw` / `Loader2` icon)

### Your Rank Card
- **"Your Rank"** (MicroLabel, with `Crown`, amber)
- Stats grid:
  - **"Global Rank"** — **"#{rank}"** (amber) or **"N/A"** (slate)
  - **"National Rank"** — **"#{rank}"** (emerald) or **"N/A"** (slate)
  - **"Milestone Badge"** — badge text + tier name
  - **"Banked Chips"** — `{chips}c` (emerald)
  - **"Level"** — number (white)

### Tab Navigation
| ID | Label | Icon | Color |
|----|-------|------|-------|
| summit | **"Summit"** | `Crown` | #f59e0b (amber) |
| global | **"Global"** | `Globe` | #06b6d4 (cyan) |
| national | **"National"** | `MapPin` | #8b5cf6 (violet) |
| tiers | **"Tiers"** | `Medal` | #eab308 (yellow) |

### Summit Tab
- Info: **"WORLD CUP SUMMIT MECHANIC:"** This master leaderboard aggregates ONLY the #1 Ranked Player from each country. Dec 31 midnight UTC #1 wins the World Championship!
- Column headers: **"Global Rank"**, **"Country #1 Champion"**, **"Nation"**, **"Banked Chips"** (right)
- Per row: medal emoji or **"#{rank}"**, **"YOU"** badge (amber), name, **"{tag} · 26 Jul 2026"**, flag + country name, chips
- Empty: `EmptyState` — **"No entries yet"**

### Global Tab
- Counter: **"Total Global Competitors: {count} Players"**
- Loading: **"Loading global ranks…"** (with `Loader2`)
- Column headers: **"Global Rank"**, **"Player & User Tag"**, **"Milestone Badge"**, **"Banked Chips"** (right)
- Per row: medal/number, **"YOU"** badge, flag + name, **"{tag} · 26 Jul 2026"**, badge, chips

### National Tab
- **"Select Country ({197} Countries):"** (with `MapPin`, violet)
- Country dropdown (all `COUNTRIES`)
- Placeholder: **"Search player in country..."**
- Column headers: **"National Rank"**, **"Local Challenger"**, **"Level"**, **"Banked Chips"** (right)
- Per row: medal/number, **"YOU"** badge (violet), flag + name, tag, **"Lvl {level}"** (amber), chips
- Empty: **"No players found for {countryName}"**

### Tiers Tab
- Info: **"MILESTONE TIER RANKING BOARD:"** All players who have reached each chip milestone are ranked from #1 to all joined competitors! Click any player to inspect profile & dossier.
- Tier filter buttons from `ALL_MILESTONE_TIERS`:
  - **"⭐ All"**, **"🛡️ Rookie"** (Below 100K), plus all `MILESTONE_TIERS`
- Column headers: **"Tier Rank"**, **"Player Name & User Tag"**, **"Country"**, **"Banked Chips"** (right)
- Per row: medal/number, **"YOU"** badge (yellow), name, tag, flag + country, chips

### Toast Messages
- [info] **"Leaderboard refreshed."**

---

## 8. `cosmetics-shop.tsx` (2306 lines) — Skins, Trails, Effects

[CODE COMMENT] *"Faithful replica of /upload/extracted/src/components/CosmeticsShop.tsx (1810 lines).
All textual strings — the H2 title, the subtitle, the two view-mode tabs,
the 7 category filters, the 20 preset descriptions, every 'Active/Locked/
Equipped/Equip X/Unlock (N Chips)' button label, the 4-step Pattern Lab,
the TryOnPreview overlay caption 'LAB HOLO-PREVIEW (STEER TO TEST)' and
every toast message — are preserved verbatim from the original audit (AUDIT-C section A)."*

### Imports
- React: `useEffect`, `useRef`, `useState`
- lucide-react: `ArrowLeftRight`, `Check`, `CheckCircle2`, `Flame`, `Lock`, `Paintbrush`, `Palette`, `Plus`, `ShoppingBag`, `Sliders`, `Sparkles`, `Trash2`, `Wand2`
- `useAuth` from `@/components/providers/auth-provider`
- `ALL_COSMETICS`, `Skin` from `@/lib/game-config`
- `PanelSkeleton`, `NotSignedIn`, `notify`, `ToastFn` from `./_panel-primitives`

### State Variables
- `shopView` ("presets" | "editor")
- `activeCategory` ("all" | "presets" | "premium" | "trails" | "deaths" | "flags" | "banners")
- `customState` (CustomSkinState | null, from localStorage `venom_custom_skin_state`)
- `colorSequence` (string[])
- `bodyStyle` (BodyStyle)
- `taperStyle` (TaperStyle)
- `glowEnabled` (boolean)

### API Calls
- `POST /api/player/cosmetic` — body: `{action: 'buy' | 'equip', skinId}`

### 18 Palette Colors
| Name | Hex |
|------|-----|
| Red Alert | #ef4444 |
| Solar Orange | #f97316 |
| Midas Gold | #f59e0b |
| Lime Venom | #84cc16 |
| Acid Green | #22c55e |
| Emerald | #10b981 |
| Teal Void | #0d9488 |
| Cyber Cyan | #06b6d4 |
| Sky Blue | #0ea5e9 |
| Sapphire | #3b82f6 |
| Royal Indigo | #6366f1 |
| Shadow Purple | #a855f7 |
| Orchid Pink | #ec4899 |
| Crimson | #dc2626 |
| Pure White | #ffffff |
| Slate Gray | #64748b |
| Deep Carbon | #1e293b |
| Pitch Black | #090d16 |

### 20 Free Slither Presets
| Name | Emoji | Category | Description |
|------|-------|----------|-------------|
| The Fish Snake | 🐟 | Cyber | Aquatic scales with hydrodynamic dorsal fins and bubble bioluminescence. |
| The Lion Snake | 🦁 | Classic | Golden apex mane headpiece with furious amber predator scales. |
| The Motorbike Snake | 🏍️ | Cyber | Chrome exhaust head, asphalt dark body segments, and burnout smoke trail. |
| The Coin Snake | 🪙 | Classic | Gold dollar medallion crown with stacked casino chip coin segments. |
| Bumblebee stripe | 🐝 | Classic | Classic yellow and black stripes reminiscent of a honey bee. |
| Patriot Streamer | 🇺🇸 | Flags | Brave red, white, and blue colors streaming in perfect unison. |
| Watermelon Slicer | 🍉 | Classic | Sweet pink flesh bordered by alternating deep forest green scales. |
| Tiger Shifter | 🐯 | Classic | Dangerous orange and obsidian bands armed with body-tapering spikes. |
| Mint Candy | 🍬 | Classic | Sweet spearmint and white swirl nodes radiating clean aura. |
| Rainbow Unicorn | 🦄 | Classic | Full visible spectrum of pulsing diamond-crystal nodes. |
| Germany Banner | 🇩🇪 | Flags | Bold black, red, and golden stripes representing national pride. |
| Brazil Samba | 🇧🇷 | Flags | Vibrant green and gold diamond nodes reflecting carnival energy. |
| France Tricolore | 🇫🇷 | Flags | Symmetric blue, white, and red bands of the French Republic. |
| Pride Rainbow | 🏳️‍🌈 | Flags | Classic rainbow flags celebrating diversity and inclusion. |
| Solar Flare | 🔥 | Cyber | Armor scales colored in blazing gold, solar orange, and furnace red. |
| Cosmic Nebula | 🌌 | Cyber | Deep cosmic space colors with pulsing neon aurora bioluminescence. |
| Lava Dreadnought | 🌋 | Cyber | Armored obsidian spikes interspaced with blistering crimson core nodes. |
| Tron Grid | 💻 | Cyber | Futuristic cyan lines on dark background representing grid patterns. |
| Gundam Mech | 🤖 | Cyber | Tactical ironclad grey plates accented with heavy yellow and blue rocket spikes. |
| Golden Dragon | 🐉 | Classic | Shining royal gold armored spike scales fit for mythical emperors. |

### View-Mode Tabs
- **"🎨 Skin & Effect Gallery"** (indigo when active)
- **"🧬 Genetic Pattern Lab"** (purple when active, with `Wand2` icon)

### Category Filter Tabs
| ID | Label |
|----|-------|
| all | **"🌈 All Items"** |
| presets | **"🐍 Ready Presets (Free!)"** |
| premium | **"✨ Premium Shop"** |
| trails | **"💫 Laser Trails"** |
| deaths | **"💥 Death Novas"** |
| flags | **"🇺🇸 Flags"** |
| banners | **"🏆 Profile Banners"** |

### Header
- Heading: **"Identity Workshop & Skin Gallery"** (with `ShoppingBag`, indigo)
- Subtitle: **"Browse and equip real-time wiggling skins, luminous laser trails, or customize your own custom repeating venom snake DNA blueprint!"**

### Genetic Pattern Lab

#### Preview Overlay
- **"LAB HOLO-PREVIEW (STEER TO TEST)"** (indigo, mono, uppercase, animate-pulse)

#### Projector Details Card
- MicroLabel: **"GENETIC PROFILE STATS"** (indigo, mono)
- Heading: **"Pattern DNA Engine"** (with `Palette`, purple)
- Text: **"Your stripe nodes loop continuously as your snake grows in the arena. You can tweak color order, skin geometries, tapering physics, and aurora bioluminescence before deploying!"**
- Stats: **"NODES: {count} nodes"** (purple), **"GLOW: ENABLED"** / **"GLOW: DISABLED"**
- Button (deployed): **"DNA DEPLOYED & EQUIPPED (ACTIVE)"** (with `CheckCircle2`, animate-bounce, emerald)
- Button (not deployed): **"DEPLOY TO BATTLE-ARENA"** (with `Wand2`, purple)

#### STEP 1 — Construct Stripe Sequence
- Label: **"STEP 1"** (mono, uppercase)
- Heading: **"Construct Stripe Sequence"** (with `Paintbrush`, indigo)
- Text: **"Click any palette color below to append it to the tail sequence. Click any crown node inside the wiggling strip to erase it."** (indigo highlight)
- Palette tooltips: **"Add {colorName}"**
- Node tooltip: **"Click to erase node"**
- Helper buttons: **"Double Sequence Length"** (with `Plus`), **"Mirror Symmetrically"** (with `ArrowLeftRight`), **"🎲 Mutate DNA"** (purple), **"Reset"** (with `Trash2`, rose)

#### STEP 2 — Choose Segment Geometry
- Label: **"STEP 2"** (mono, uppercase)
- Heading: **"Choose Segment Geometry"** (with `Sliders`, indigo)

| Option | Label | Description |
|--------|-------|-------------|
| smooth | **"Smooth Circles"** | Standard sleek nodes |
| dragon | **"Dragon Scales"** | Alternating jagged spikes |
| armored | **"Armored Plates"** | Futuristic squad blocks |
| crystal | **"Crystal Shards"** | Alternating shiny gems |
| obsidian | **"Spiky Obsidian"** | Full high-threat spikes |
| basilisk | **"Basilisk Diamonds"** | Pointy royal nodes |

#### STEP 3 — Body Taper Physics
- Label: **"STEP 3"** (mono, uppercase)
- Heading: **"Body Taper Physics"**
- Text: **"Configure snake tail scaling density styles."**

| Option | Label |
|--------|-------|
| natural | **"Natural Taper"** |
| uniform | **"Uniform Width"** |
| wave | **"Sinuous Wave"** |
| heavy | **"Heavy Head"** |

#### STEP 4 — Bioluminescent Aura
- Label: **"STEP 4"** (mono, uppercase)
- Heading: **"Bioluminescent Aura"**
- Text: **"Toggle active radioactive body node shading glow in battle arenas."**
- Toggle label: **"Neon Glow"**, description: **"Emit high-vis plasma light"**
- aria-label: **"Toggle neon glow"**

### Card Sub-Components

#### Badges
- **"Active"** (with `Check`, indigo/emerald)
- **"Locked"** (with `Lock`, amber)

#### PresetCard
- Button states: **"Equipped"** (indigo, disabled) / **"Equip Preset"** (slate → indigo on hover)

#### SkinCard
- Equip label: **"Equip Skin"**
- Button states: **"Equipped"** / **"Equip Skin"** / **"Unlock ({cost} Chips)"** (with `Sparkles`)

#### TrailCard
- Equip label: **"Equip Trail"**

#### DeathCard
- Equip label: **"Equip Nova"**

#### FlagCard
- Equip label: **"Equip Flag"**

#### BannerCard
- Equip label: **"Equip Banner"**

#### UnlockFooter (shared)
- States: **"Equipped"** / `{equipLabel}` / **"Unlock ({cost} Chips)"**

### Toast Messages
- [error] **"Network error. Please try again."**
- [success] **"Equipped Body Skin: {name}"**
- [error] **"You need {cost} chips to unlock {name}! Play matches to earn chips."**
- [success] **"Unlocked & Equipped {name}! -{cost} CHIPS"**
- [success] **"Injected DNA: {name}! Equipped in Battle Arena."**
- [success] **"Equipped Trail Effect: {name}"**
- [error] **"You need {cost} chips to unlock this trail!"**
- [success] **"Unlocked & Equipped Trail: {name}! -{cost} CHIPS"**
- [success] **"Equipped Death Effect: {name}"**
- [error] **"You need {cost} chips to unlock this death effect!"**
- [success] **"Unlocked & Equipped Death Nova: {name}! -{cost} CHIPS"**
- [success] **"Equipped Flag: {name}"**
- [error] **"You need {cost} chips to unlock this flag!"**
- [success] **"Unlocked & Equipped Flag: {emoji} {name}! -{cost} CHIPS"**
- [success] **"Equipped Profile Banner: {name}"**
- [error] **"You need {cost} chips to unlock this profile banner!"**
- [success] **"Unlocked & Equipped Profile Banner: {name}! -{cost} CHIPS"**
- [error] **"Maximum 24 segments in stripe pattern!"**
- [error] **"Stripe sequence must have at least 1 color node!"**
- [info] **"Sequence reset."**
- [error] **"Sequence too long to double!"**
- [error] **"Sequence too long to mirror!"**
- [success] **"Mutated new genetic chain!"**
- [error] **"Choose at least 1 color node before deploying!"**
- [success] **"🧪 Genetic Custom Segment deployed! Equipped in Battle Arena."**
- [error] **"Action failed."**

---

## 9. `clan-system.tsx` (784 lines) — Clan Management

### Imports
- React: `useEffect`, `useState`
- `useAuth` from `@/components/providers/auth-provider`
- Config imports for clans
- `notify`, `ToastFn`, `GlowBlob`, `MicroLabel`, `NotSignedIn` from `./_panel-primitives`

### State Variables
- `clan` (clan data from API)
- `clanMembers` (member[])
- `loading` (boolean)
- `depositAmount` (string)
- `depositing` (boolean)
- `chatMessages` (message[])
- `chatInput` (string)
- `broadcastInput` (string)
- `searchQuery` (string)
- `allClans` (clan[])
- `showCreate` (boolean)
- `formName` (string)
- `formTag` (string)
- `formDesc` (string)
- `selectedEmblem` (string)

### API Calls
- `GET /api/clan`
- `POST /api/clan/join` — body: `{clanId}`
- `POST /api/clan/leave`
- `POST /api/clan/deposit` — body: `{amount}`
- `POST /api/clan/chat` — body: `{message}`
- `GET /api/clan/search?query=...`
- `POST /api/clan/create` — body: `{name, tag, description, emblem}`

### Not in Clan State
- Heading: **"You are not in a Viper Clan"** (with icon)

### In Clan — Stats Row
- MicroLabels: **"YOUR RANK"**, **"MEMBERS"**, **"CLAN LEVEL"**
- Vault section: placeholder **"Amt (e.g. 100)"**, button **"Deposit"**
- **"Max Capacity: 30"** (MicroLabel)
- Members list with **"LEADER"** badge
- Chat: placeholder **"Type a message for your clan..."**, button **"Send"**
- Broadcast section

### Clan Search
- Placeholder: **"Search clans by name or tag..."**
- Empty: **"No Clans Found"** (h3)
- Per clan: MicroLabels **"LEVEL"**, **"MEMBERS"**, **"TREASURY"**

### Create Clan Form
- Label: **"Syndicate Name"**, placeholder **"e.g. Omega Extractions"**
- Label: **"Clan Tag (3-5 Chars, Letters/Numbers)"**, placeholder **"e.g. OMG"**
- Label: **"Syndicate Description"**, placeholder **"e.g. Extraction above all else."**
- Label: **"Emblem Logo"** — preset emblem grid
- Cost: **"Free"** (span)

### Toast Messages
- [error] **"You are already in a clan! Leave your current clan first."**
- [error] **"Network error joining clan."**
- [error] **"Network error leaving clan."**
- [error] **"Enter a valid deposit amount."**
- [error] **"Insufficient chips to deposit."**
- [error] **"You must be in a clan to deposit."**
- [error] **"Network error depositing chips."**
- [success] **"Broadcast posted to clan chat! 📢"**
- [error] **"Network error sending broadcast."**
- [error] **"Syndicate Name and Clan Tag are required."**
- [error] **"Leave your current clan before forming a new one."**
- [error] **"Network error creating clan."**

---

## 10. `season-pass.tsx` (254 lines) — Battle Pass

### Imports
- React: `useEffect`, `useState`
- `useAuth` from `@/components/providers/auth-provider`
- Season pass config
- `notify`, `ToastFn`, `GlowBlob`, `PanelSkeleton`, `NotSignedIn` from `./_panel-primitives`

### State Variables
- `isElite` (boolean)
- `busy` (boolean)

### API Calls
- `POST /api/season-pass/claim` — body: `{tierId, track}`
- `POST /api/season-pass/buy-elite`

### UI Elements
- Banner: aria-label **"Season banner"**
- Track labels: **"FREE TRACK"** (with **"CLAIMED"** state), **"ELITE TRACK"** (with **"Requires Elite Pass"** state)
- Tier grid: aria-label **"Reward tiers"**

### Toast Messages
- [error] **"1,00,000 Banked Chips required for Elite Cyber Pass!"**
- [success] **"ELITE CYBER PASS UNLOCKED! Enjoy 3x Rewards & Exclusive Skins! 👑"**
- [error] **"Unlock Elite Cyber Pass to claim premium rewards!"**

---

## 11. `hall-of-fame.tsx` (542 lines) — Hall of Fame

### Imports
- React: `useState`
- `useAuth` from `@/components/providers/auth-provider`
- Hall of fame config
- `notify`, `ToastFn`, `GlowBlob`, `PanelSkeleton`, `NotSignedIn`, `MicroLabel` from `./_panel-primitives`

### State Variables
- `tickerFilter` (string)

### UI Elements
- **"PERMANENT MILESTONE IMMORTALITY"** (strong, uppercase)
- **"Milestone Year:"** (span)
- MicroLabel: **"Total Qualifiers This Year:"**
- MicroLabel: **"Threshold"**
- **"Country Leaderboard:"** (span)

#### Country Leaderboard Columns
| Column | Header |
|--------|--------|
| Rank | **"Rank"** |
| Challenger | **"Challenger"** |
| User Tag | **"User Tag"** |
| Banked Chips | **"Banked Chips"** |
| Level | **"Level"** |
| Action | **"Action"** |
- **"NATIONAL CHAMP"** (span, on #1)

#### Channel Filter
- Label: **"Channel Filter:"**
- Empty: **"No events in this channel yet…"**

#### Event Table (modal)
- Close: aria-label **"Close"**
| Column | Header |
|--------|--------|
| Tier Rank | **"Tier Rank"** |
| Immortal Achiever | **"Immortal Achiever"** |
| (no User Tag column header in code) | — |
| Achieved On | **"Achieved On"** |
| Qualifying Chips | **"Qualifying Chips"** |
| Action | **"Action"** |
- **"👑 #1 First"** (span, on top achiever)

---

## 12. `championships.tsx` (440 lines) — Championship Events

### Imports
- React: `useState`
- `useAuth` from `@/components/providers/auth-provider`
- Championship config
- `notify`, `ToastFn`, `GlowBlob`, `PanelSkeleton`, `NotSignedIn`, `MicroLabel` from `./_panel-primitives`

### State Variables
- `registered` (boolean)
- `filter` (string, default "all")
- `chips` (number)
- `games` (number)

### API Calls
- `POST /api/championship/register`
- `POST /api/championship/play`

### UI Elements
- MicroLabel: **"COMPETING WALLET CHIPS"**
- Text: **"Max chips at year-end decides rank!"**
- MicroLabel: **"STATUS"**
- **"Awarded automatically on 01 January"** (span)

#### Contenders Table
- Label: **"Rank Filter:"**
| Column | Header |
|--------|--------|
| Rank | **"Rank"** |
| Contender Name | **"Contender Name"** |
| User Tag | **"User Tag"** |
| Games | **"Games"** |
| Wallet Chips | **"Wallet Chips"** |
| Projected Jan 1 Payout | **"Projected Jan 1 Payout"** |
| HOF | **"HOF"** |
- Empty: **"No contenders match the current filters."**
- **"YOU"** badge (on self)

### Toast Messages
- [success] **"🏆 REGISTERED FOR 2026 ANNUAL VENOM WORLD CHAMPIONSHIP! You have 10,000 matches limit. Good luck!"**
- [error] **"Register first to play championship matches!"**
- [error] **"You have reached the 10,000 championship match cap for this year!"**
- [info] **"Entering Championship High-Stakes Arena match..."**

---

## 13. `admin-panel.tsx` (488 lines) — Admin Configuration

### Imports
- React: `useState`, `useEffect`
- `useAuth` from `@/components/providers/auth-provider`
- Admin config
- `notify`, `ToastFn`, `PanelSkeleton`, `NotSignedIn`, `MicroLabel` from `./_panel-primitives`

### State Variables
- `authenticated` (boolean)
- `code` (string)
- `busy` (boolean)
- `targetTag` (string)
- `amount` (string)
- `broadcastMsg` (string)
- `diagnostics` ({sockets, rooms, transactions})
- `searchQuery` (string)
- `onlinePlayers` (player[])

### API Calls
- `POST /api/admin/verify` — body: `{code}`
- `POST /api/admin/adjust-chips` — body: `{userTag, amount}`
- `POST /api/admin/ban` — body: `{userTag}`
- `POST /api/admin/broadcast` — body: `{message}`
- `GET /api/admin/diagnostics`
- `GET /api/admin/online-players`

### Access Denied
- Heading: **"Access Denied"** (h3)
- Text: **"admin"** (span)

### Authenticated State
- Heading: **"Central Operations Gate"** (h3)
- Placeholder: **"Operations Code"**

### System Diagnostics
- Heading: **"System Diagnostics"** (h3)
- Refresh: aria-label **"Refresh stats"**
- **"Connected Sockets"** (span)
- **"Active Rooms"** (span)

### Global Intercom Broadcast
- MicroLabel: **"Global Intercom Broadcast"**
- Placeholder: **"Announce to all active matches..."**
- Send button (implied)

### Syslog Monitor
- **"SYSLOG MONITOR"** (span)
- Empty: **"No recent transactions..."**

### Live Operations Roster
- Heading: **"Live Operations Roster"** (h3)
- Placeholder: **"Search by name or userTag..."**
- **"YOU"** badge on self
- Per player tooltips:
  - **"Toggle Mute Player"**
  - **"Kick Connection"**
  - **"Ban UserTag Permanently"**

### Economy Ledger Overrides
- **"Economy Ledger Overrides"** (span)
- **"Target:"** (span/label)
- Placeholder: **"Player Tag (e.g. STRK-8291)"**
- Placeholder: **"Amount (+/- e.g. 5000)"**
- Button: **"Adjust"** (implied)

### Toast Messages
- [error] **"Invalid operations code."**
- [success] **"Admin credentials verified!"**
- [error] **"Select a player first."**
- [error] **"Amount must be a non-zero number."**
- [error] **"Failed to adjust player chips."**
- [error] **"Network error during ban action."**
- [success] **"Global admin broadcast sent!"**

---

## 14. `clip-showcase.tsx` (269 lines) — Clip/Video Showcase

### Imports
- React: `useState`
- `useAuth` from `@/components/providers/auth-provider`
- Clip config
- `notify`, `ToastFn`, `PanelSkeleton`, `NotSignedIn`, `MicroLabel` from `./_panel-primitives`

### State Variables
- `title` (string)
- `platform` (string, default "youtube")
- `chips` (string)
- `url` (string)
- `submitting` (boolean)
- `clips` (clip[])

### API Calls
- `GET /api/clips`
- `POST /api/clips` — body: `{title, platform, chips, url}`

### UI Elements
- Video overlay: **"CLICK TO PLAY"** (p tag)
- Publish form:
  - MicroLabel: **"Clip Title"**, Placeholder: **"e.g. INSANE 1V2 EXTRACTION CLUTCH!"**
  - MicroLabel: **"Platform"**
  - Options: **"YouTube"**, **"Twitch"**
  - MicroLabel: **"Extracted Chips (c)"**, Placeholder: **"e.g. 2500000"**
  - MicroLabel: **"Video URL"**, Placeholder: **"https://youtube.com/watch?v=..."**

### Toast Messages
- [error] **"Clip Title and Video URL are required."**
- [success] **"Game Clip published to Esports Highlights feed! 🎬"**

---

## 15. `player-inspector-modal.tsx` (560 lines) — Player Inspector Popup

### Imports
- React: `useEffect`, `useState`
- `useAuth` from `@/components/providers/auth-provider`
- Inspector config
- `notify`, `ToastFn`, `GlowBlob`, `PanelSkeleton`, `NotSignedIn`, `MicroLabel` from `./_panel-primitives`

### State Variables
- `clanMembers` (member[])
- `globalAllies` (ally[])
- `regionalAllies` (ally[])
- `milestoneBadges` (badge[])
- `verifiedHandles` (handle[])

### API Calls
- `GET /api/player/inspect?tag={userTag}`
- `GET /api/clan/{clanTag}/members`
- `GET /api/leaderboard?type=chips&limit=10`
- `GET /api/leaderboard?type=chips&country={country}&limit=10`

### Modal Header
- Close: aria-label **"Close inspector"**
- **"Ledger Tag: "{userTag}"** (strong)

### Clan Section
- **"Active Member"** (span, if in clan) / **"Member"** (if not)
- Empty (regional): **"No regional allies found on the leaderboard."**
- Empty (global): **"No global allies found on the leaderboard."**

### Verified Handles Section
- **"Verified Handles"** (span)

### Milestone Badges Section
- Empty: **"No milestone badges earned yet."**

### Real-Time Sync Section
- **"Real-Time Sync"** (span)
- **"Global World Rank"** (span)
- **"Regional Arena Rank"** (span)

---

## Cross-File Summary: All Icons Used

| Icon | Files Used In |
|------|--------------|
| `ChevronRight` | arena-selector |
| `Filter` | arena-selector |
| `Landmark` | arena-selector, chip-store, player-profile |
| `Play` | arena-selector |
| `Shield` | arena-selector, social-panel, player-profile, hall-of-fame |
| `Swords` | arena-selector, social-panel, player-profile |
| `Trophy` | arena-selector, player-profile, leaderboards |
| `Users` | arena-selector, social-panel, player-profile |
| `Zap` | arena-selector, leaderboards |
| `Coins` | chip-store, social-panel |
| `Loader2` | chip-store, daily-rewards, social-panel, leaderboards |
| `Sparkles` | daily-rewards, cosmetics-shop |
| `Info` | chip-store |
| `ShieldAlert` | chip-store |
| `CreditCard` | chip-store |
| `Lock` | chip-store, cosmetics-shop, player-profile, clan-system |
| `Gift` | daily-rewards, social-panel |
| `Video` | chip-store |
| `UserPlus` | social-panel, player-profile |
| `Globe` | social-panel, player-profile |
| `Eye` | social-panel, player-profile |
| `Send` | social-panel |
| `X` | social-panel, player-profile, cosmetics-shop |
| `Check` | daily-rewards, cosmetics-shop, social-panel, player-profile |
| `MessageSquare` | social-panel |
| `Search` | social-panel, leaderboards, clan-system, admin-panel |
| `Plus` | social-panel, cosmetics-shop |
| `LogOut` | social-panel, player-profile |
| `Award` | social-panel, player-profile |
| `Clock` | player-profile |
| `Compass` | player-profile |
| `Edit2` | player-profile |
| `RefreshCw` | player-profile, leaderboards |
| `Skull` | player-profile |
| `Target` | player-profile |
| `Trash2` | player-profile, cosmetics-shop |
| `Upload` | player-profile |
| `ArrowLeftRight` | cosmetics-shop |
| `CheckCircle2` | cosmetics-shop |
| `Flame` | cosmetics-shop |
| `Paintbrush` | cosmetics-shop |
| `Palette` | cosmetics-shop |
| `ShoppingBag` | cosmetics-shop |
| `Sliders` | cosmetics-shop |
| `Wand2` | cosmetics-shop |
| `Crown` | leaderboards |
| `Medal` | leaderboards |
| `MapPin` | leaderboards |
| `Inbox` | leaderboards |
| `Calendar` | daily-rewards |

## Cross-File Summary: All API Endpoints Referenced

| Endpoint | Method | Files |
|----------|--------|-------|
| `/api/arena-stats` | GET | arena-selector |
| `/api/chips/pack` | POST | chip-store |
| `/api/player/promo-reward` | POST | chip-store |
| `/api/player/video-reward` | POST | chip-store |
| `/api/player/daily` | POST | daily-rewards |
| `/api/friends/list` | GET | social-panel |
| `/api/friends/request` | POST | social-panel |
| `/api/friends/remove` | POST | social-panel |
| `/api/friends/accept` | POST | social-panel |
| `/api/leaderboard` | GET | social-panel, leaderboards, player-inspector-modal |
| `/api/player` | PUT | player-profile |
| `/api/player/cosmetic` | POST | cosmetics-shop |
| `/api/auth/change-password` | POST | player-profile |
| `/api/auth/change-pin` | POST | player-profile |
| `/api/auth/upgrade` | POST | player-profile |
| `/api/clan` | GET | clan-system |
| `/api/clan/join` | POST | clan-system |
| `/api/clan/leave` | POST | clan-system |
| `/api/clan/deposit` | POST | clan-system |
| `/api/clan/chat` | POST | clan-system |
| `/api/clan/search` | GET | clan-system |
| `/api/clan/create` | POST | clan-system |
| `/api/season-pass/claim` | POST | season-pass |
| `/api/season-pass/buy-elite` | POST | season-pass |
| `/api/championship/register` | POST | championships |
| `/api/championship/play` | POST | championships |
| `/api/admin/verify` | POST | admin-panel |
| `/api/admin/adjust-chips` | POST | admin-panel |
| `/api/admin/ban` | POST | admin-panel |
| `/api/admin/broadcast` | POST | admin-panel |
| `/api/admin/diagnostics` | GET | admin-panel |
| `/api/admin/online-players` | GET | admin-panel |
| `/api/clips` | GET | clip-showcase |
| `/api/clips` | POST | clip-showcase |
| `/api/player/inspect` | GET | player-inspector-modal |
| `/api/clan/{tag}/members` | GET | player-inspector-modal |
