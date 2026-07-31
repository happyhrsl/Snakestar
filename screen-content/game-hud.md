# Game Canvas HUD + Death/Extract Overlay — Screen Content

Source: `src/components/game/game-canvas.tsx` (3152 lines)
Secondary: `src/components/game/render-helpers.ts`, `src/components/game/online-replay-player.tsx`

---

## 1. CONNECTING OVERLAY

**Shown when:** `phase === 'connecting'`

Full-screen semi-transparent backdrop (`bg-background/80 backdrop-blur-sm`) centered content.

### 1a. Default (no error)

```
  [Loader2 icon — spinning, primary color, 40×40]

  "Authenticating…"           ← default text (slate-400, text-sm)
  "Rejoining arena…"          ← after PLAY AGAIN (slate-400, text-sm)
  "Reconnecting (attempt N)…" ← during reconnect attempt (slate-400, text-sm)
  "Connecting…"               ← fallback when connectingMsg is empty
```

### 1b. Connection Error

```
  [AlertTriangle icon — rose-500, 48×48]

  [DYNAMIC: connectionError text]       ← e.g. "Not authenticated. Please sign in again."
                                        ← e.g. "Connection failed"
                                        ← e.g. "Not enough chips to enter this arena."
                                        ← e.g. "Your account has been banned."
                                        ← e.g. "This arena does not exist."
                                        ← e.g. "You are already in a match."
                                        ← e.g. "Could not join arena."
     (text-lg font-semibold, foreground color)

  [Button: outline] "← Back to lobby"   ← LogOut icon + text
```

---

## 2. RECONNECTING BANNER

**Shown when:** `isReconnecting === true && phase === 'playing'`

Top-center, pill shape, below the canvas top edge:

```
  [WifiOff icon — 14×14] Reconnecting…
  (amber-300 text, amber-500/40 border, amber-500/10 bg, backdrop-blur, rounded-full)
```

---

## 3. IN-GAME HUD (Online Mode)

**Shown when:** `phase !== 'connecting'` (i.e. playing or ended)

### 3A. TOP-LEFT STATUS CARDS

Stacked vertically, top-left corner (left:3, top:3), `pointer-events-none`, `font-mono`.

#### Card 1 — Carried Chips
**Condition:** `!isOfflineMode` (hidden in offline)

```
  ┌─────────────────────────────────────┐
  │ 🏛 Carried Chips                    │  ← Landmark icon (emerald-400), 10px uppercase slate-500
  │ 0c                                  │  ← 2xl bold emerald-400 tabular-nums + "c" suffix (base size)
  └─────────────────────────────────────┘
  (border-emerald-500/30, bg-slate-950/80, backdrop-blur)
```

#### Card 2 — Stars Earned
**Condition:** `!isOfflineMode && hudCarried > arena.buyIn` (only when profit)

```
  ┌─────────────────────────────────────┐
  │ ⭐ Stars Earned                     │  ← Star icon (amber-400), 10px uppercase slate-500
  │ +[DYNAMIC: profit amount]c           │  ← sm bold amber-400 tabular-nums + "c" suffix (xs)
  └─────────────────────────────────────┘
  (border-amber-500/30, bg-slate-950/80, backdrop-blur)
```

#### Card 3 — Stars in Arena
**Condition:** `!isOfflineMode && starsInArena > 0`

```
  ┌─────────────────────────────────────┐
  │ ⭐ Stars in Arena                   │  ← Star icon (yellow-400), 10px uppercase slate-500
  │ [DYNAMIC: count]                     │  ← sm bold yellow-300 tabular-nums
  └─────────────────────────────────────┘
  (border-yellow-500/30, bg-slate-950/80, backdrop-blur)
```

#### Card 4 — Rank / Score / Kills / Boost

```
  ┌─────────────────────────────────────┐
  │ 🏆 Rank: [DYNAMIC: rankDisplay]     │  ← Trophy(yellow-500) + "Rank:" slate-400 + bold yellow-400
  │ 🛡 Score: [DYNAMIC: snakeLength]    │  ← Shield(indigo-400) + "Score:" slate-400 + bold white
  │ 💀 Kills: [DYNAMIC: hudKills]       │  ← Skull(rose-500) + "Kills:" slate-400 + bold rose-400
  │ ⚡ Boost: SPACE                      │  ← Zap(amber-500) + "Boost:" slate-400 + bold amber-400 "SPACE"
  └─────────────────────────────────────┘
  (border-slate-700/60, bg-slate-950/80, backdrop-blur)
```

**rankDisplay logic:**
- Offline: `#N` (e.g. `#1`)
- Online with ≤1 real player: `#1 of 1`
- Online with >1 real players: `#N of M` (e.g. `#3 of 12`)

#### Card 5 — Active Competitors

```
  ┌─────────────────────────────────────┐
  │ 👤 Real Players: [N] Active         │  ← indigo-400, animate-pulse
  │ 👥 Bots: [DYNAMIC: hudBots]          │  ← slate-400 + bold slate-300
  └─────────────────────────────────────┘
  (border-slate-700/60, bg-slate-950/80, backdrop-blur, text-xs)
```

**IF offline mode:**
```
  ┌─────────────────────────────────────┐
  │ Offline Mode: 1 Player              │  ← slate-400 + bold amber-400
  │ 👥 Bots: [DYNAMIC: hudBots]          │  ← slate-400 + bold slate-300
  └─────────────────────────────────────┘
```

### 3B. TOP-RIGHT (Banked / FPS / Ping)

Right:3, top:3, `pointer-events-none`, `font-mono`.

```
  ┌──────────────────┐
  │      BANKED      │  ← 10px uppercase tracking-wider slate-500
  │  [DYNAMIC: N]c   │  ← sm bold amber-300 tabular-nums (e.g. "12,450c")
  └──────────────────┘
  (border-amber-500/30, bg-slate-950/80, backdrop-blur)

  [DYNAMIC: fps] fps    Signal-icon [DYNAMIC: ping]ms    [IF lowQuality] 🎨 LQ
  (11px, border-slate-700/60, bg-slate-950/80, backdrop-blur)
  - ping < 0: text-muted-foreground, shows "—"
  - ping < 80: text-emerald-400
  - ping < 160: text-amber-400
  - ping >= 160: text-rose-400
  - LQ badge: amber-500/20 bg, amber-300 text, title="Low quality mode (adaptive)"
```

### 3C. CHAT + MINIMAP-TOGGLE ROW

**Shown when:** `phase === 'playing'`, at right:3, top:92px.

```
  [MessageSquare icon button]    ← h-9 w-9 rounded-full, aria-label="Open chat"
  [MapIcon] Collapse             ← IF minimapVisible (text hidden on <sm screens)
  [MapIcon] Show Minimap         ← IF !minimapVisible (text hidden on <sm screens)
```
(Both: border-primary/40, bg-card/80, backdrop-blur, h-9)

### 3D. ARENA LEADERBOARD

**Shown when:** `phase !== 'connecting'`, at right:3, top:140px.

#### 3D-i. Expanded (leaderboardOpen === true)

```
  ┌─── Arena Leaders ──────── [▲] ─┐
  │                                 │
  │  [IF empty:]                    │
  │     "No real players yet."      │
  │                                 │
  │  [IF entries:] (max 8 scroll)   │
  │   1 [🇺🇸] PlayerName  YOU 1,200c│
  │   2 [🇬🇧] OtherGuy       800c  │
  │   3       BotName (no flag) 500c│
  │   ...                           │
  └─────────────────────────────────┘
  (w-240px, max-w-80vw, border-slate-700/60, bg-slate-950/90, backdrop-blur)
```

**Per entry:**
- Rank number (w-5, right-aligned, slate-500, tabular-nums)
- Country flag emoji (if `entry.country` exists)
- Name (truncated, slate-300; or bold indigo-300 if `isPlayer`)
- "YOU" badge (IF `isPlayer`, 9px bold, indigo-500/30 bg + indigo-200 text in online; emerald-500/30 bg + emerald-200 text in offline)
- Value column:
  - **Online:** emerald-400 tabular-nums, `{carriedChips}c`
  - **Offline:** indigo-300 tabular-nums, `{score}`
- Player's own row: indigo-500/15 bg + indigo-500/30 border

#### 3D-ii. Collapsed (leaderboardOpen === false)

```
  [▼ Show Leaderboard]
  (rounded-full, border-slate-700, bg-slate-950/85, text slate-400)
  (ChevronDown icon in yellow-500; text hidden on <sm screens)
```

### 3E. KILL FEED

**Shown when:** `killFeed.length > 0`, at left:3, top:112px, `pointer-events-none`.

Max 8 entries, each auto-removed after 5 seconds.

**Format A — Wall death:**
```
  [victimName] hit the wall
```
- victimName: orange-400 if bot, slate-200 if player
- "hit the wall": red-400

**Format B — Eliminated by player/bot:**
```
  [killerName] eliminated [victimName]
```
- killerName: emerald-400 if real player, orange-400 if bot
- "eliminated": slate-500
- victimName: red-400 if real player, orange-400 if bot

(11px, bg-slate-950/75, backdrop-blur, fade-in slide-in-from-left animation)

### 3F. HOLD-TO-EXTRACT POPUP (Top-Center)

**Shown when:** `phase === 'playing' && !endScreen`, at left-1/2, top:56px.

**Idle state (not extracting):**
```
  Hold [E] or press the button below to cash out safely!
  (11px mono, slate-400; [E] is a kbd element: border-slate-600, bg-slate-800, 10px, slate-200)

  HOLD TO EXTRACT SUCCESSFUL!           ← IF online
  HOLD TO LEAVE PRACTICE ARENA           ← IF offline
  (11px bold emerald-400)
```

**Extracting state:**
```
  Hold [E] or press the button below to cash out safely!

  ┌───────────────────────────────────────────┐
  │ EXTRACTING CHIPS ([DYNAMIC: N]%)          │  ← xs bold amber-400
  │ [████████████████░░░░░░░░░░░░░░]           │  ← h-2, w-48, bg-slate-800 track
  │                                             │  ← fill: gradient yellow-500→amber-500
  │ FEE: 0% (LOW POPULATION)                  │  ← IF commissionRate=0, 10px mono, emerald-400
  │ FEE: [N]%                                  │  ← IF commissionRate>0, 10px mono, yellow-500
  └───────────────────────────────────────────┘
  (border-amber-500/40, bg-slate-950/85, backdrop-blur)
  [Fee line hidden in offline mode]
```

### 3G. BOTTOM ACTION BUTTONS

**Shown when:** `phase === 'playing'`

#### BOOST button (bottom-right)
```
  ┌──────────┐
  │  ⚡      │   ← Zap icon (24×24), amber-300
  │  BOOST   │   ← 10px bold amber-300
  └──────────┘
  (h-16 w-16 rounded-full, border-amber-400/50, bg-amber-500/20, shadow-lg)
  (active:scale-95, touch-none, hold to boost)
```

#### EXTRACT button (bottom-right, below BOOST)
```
  ┌──────────┐
  │  🏆      │   ← Trophy icon (24×24)
  │  EXTRACT │   ← 10px bold (emerald-300 idle / white when extracting)
  └──────────┘
  (h-20 w-20 rounded-full)
  - Idle:  border-emerald-400/60, bg-emerald-500/15, text-emerald-300
  - Active: border-emerald-400, bg-emerald-500/40, text-white
  - When extracting: shows "[N]%" instead of "EXTRACT"
  (active:scale-95, touch-none, hold to extract)
```

#### LEAVE button (bottom-left, to the right of emotes)
```
  [LogOut icon] Leave
  (h-10, rounded-full, border-slate-700, bg-slate-950/80, text-slate-400, backdrop-blur)
  (aria-label="Leave arena")
```

### 3H. EMOTES BAR (Bottom-Left)

**Shown when:** `phase === 'playing'`, at bottom:4, left:4 (bottom:2, left:2 on mobile).

```
  ┌─────────────────────────────────────┐
  │ 💬 Emotes (Keys 1-5)                │  ← MessageSquare(indigo-400) + 10px uppercase mono slate-400
  │                                     │
  │ [GG! 🏆]  [Target! 🎯]              │  ← buttons, 10px, slate-300, border-slate-800
  │ [Flee! 🏃💨]  [Ripped! 💪]          │     bg-slate-900, hover:bg-slate-800
  │ [Extracting! ⚡]                    │
  └─────────────────────────────────────┘
  (w-[min(60vw,280px)], rounded-xl, border-slate-800, bg-slate-950/90, backdrop-blur)
```

**Button labels as sent:**
1. `GG! 🏆` (key 1)
2. `Target Spot! 🎯` → button shows `Target! 🎯` (key 2)
3. `Fleeing! 🏃💨` → button shows `Flee! 🏃💨` (key 3)
4. `Get Ripped! 💪` → button shows `Ripped! 💪` (key 4)
5. `Extracting soon! ⚡` → button shows `Extracting! ⚡` (key 5)

### 3I. MINIMAP (Canvas-drawn, bottom-right)

**Shown when:** `minimapVisible === true && phase !== 'connecting'`

96×96px circle, bottom-right corner (12px from edges).

- Background: dark slate circle (`rgba(2,6,23,0.85)`)
- Border: indigo-400 at 40% opacity
- 3 concentric indigo rings (faint)
- Crosshairs (dark slate)
- Arena boundary: dashed rose circle (60% opacity)
- Player dot: indigo-400, r=3 (centered)
- Bot dots: rose-500, r=2
- Real player dots: emerald-400, r=2
- Range: 1800 world units

### 3J. FULL-SCREEN ARENA MAP (Canvas-drawn, M key toggle)

**Shown when:** `fullMapOpen === true && phase === 'playing'`

Full-screen dark overlay (`rgba(2,6,23,0.94)`) with:

```
  ┌──────────────────────────────────────────────────┐
  │ ● You                                              │
  │ ● Real Players     (legend, top-left)              │
  │ ● Bots                                            │
  │                                                    │
  │              [ARENA OVERVIEW — ALL SNAKES]          │  ← bold 14px mono, slate-200
   │                                                    │
  │         ╭ ─ ─ ─ arena boundary (dashed rose) ─ ─ ╮ │
  │         │       concentric range rings            │ │
  │         │       crosshairs                        │ │
  │         │  dots: you(lg indigo) / players(emerald) │ │
  │         │        bots(rose)                        │ │
  │         ╰ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ╯ │
  │                                                    │
  │                    Press M to close                 │  ← 11px mono, slate-400
  │                                        [✕]         │  ← HTML close button, top-right
  └──────────────────────────────────────────────────┘
```

### 3K. CHAT DIALOG

**Shown when:** `chatOpen === true` (Dialog component)

```
  ┌────────── Send a message ──────── [✕] ─┐
  │                                          │
  │ [Type a message…_________________] [Send]│
  │                                          │
  │                          [Cancel]        │
  └──────────────────────────────────────────┘
  (sm:max-w-md, DialogContent with showCloseButton)
  - Input: maxLength=200, autoFocus, placeholder="Type a message…"
  - Send button: Send icon, disabled when input is empty
  - Cancel button: outline variant
```

### 3L. SNAKE NAME LABELS (Canvas-drawn, above each snake head)

- Bots: `[BOT] BotName` (orange-400, 75% opacity)
- Other players: `PlayerName` (slate-200, 85% opacity)
- Self: `YourName` (green-500, full opacity)
- Below name (if `userTag` exists): `#tag` (slate-400, 70% opacity)

### 3M. CHAT BUBBLES (Canvas-drawn, above snake heads)

**Shown when:** a snake has a `chatMessage` field.

- Positioned above the snake head name label
- Dark slate rounded rect with indigo border
- White monospace text, centered
- Rendered via `drawChatBubble()`

### 3N. STAR CHIP VALUE LABELS (Canvas-drawn)

Inside each golden star collectible on the arena floor:
- Value text in dark brown (`#7c2d12`), bold monospace
- Format: `N` or `Nk` for values ≥1000

### 3O. EXTRACTION RING (Canvas-drawn around snake head)

**Shown when:** `snake.extractionProgress > 0`
- Rendered via `drawExtractionRing()` around the player's snake head

### 3P. DEATH VIGNETTE

**Shown when:** `showDeathVignette === true` (3 seconds after death, before end screen)

- Full-screen red radial gradient: transparent at center 30%, `rgba(220,38,38,0.6)` at edges
- `pointer-events-none`, z-30, 300ms fade-in animation

---

## 4. TOAST NOTIFICATIONS

All toasts appear via the app toast system (not in-canvas).

### 4A. On Connect

```
  Title: "Connected"
  Description: "Connected to real-time multiplayer shard!"
```

### 4B. On Join Error

```
  Title: "Cannot join arena"
  Description: [DYNAMIC: error message]   ← variant: destructive
```

### 4C. On Death (Online)

```
  Title: "Eliminated"
  Description: "ELIMINATED: You collided with [killerName]! 💀"   ← variant: destructive
  [IF wall death, no killerName:] "ELIMINATED: You collided with another player! 💀"
```

### 4D. On Death (Offline)

```
  Title: "Crashed"
  Description: "CRASH! (Offline Practice Mode - No chips lost!)"
```

### 4E. On Extract Fail

```
  Title: "Extraction failed"
  Description: [DYNAMIC: reason] OR "You moved or took damage."   ← variant: destructive
```

### 4F. On Extract Cancelled by Steering

```
  Title: "⚠ Steering Detected"
  Description: "Extraction progress restarted! Keep moving straight."   ← variant: destructive
```

### 4G. On Level Up (match_result)

```
  Title: "Level Up!"
  Description: "LEVEL UP! You reached Level [N]!"
```

### 4H. On Kicked

```
  Title: "Kicked"
  Description: [DYNAMIC: reason] OR "You were removed by an admin."   ← variant: destructive
```

### 4I. On Server Shutdown

```
  Title: "Server restarting"
  Description: "The game server is going down for maintenance."   ← variant: destructive
```

### 4J. On Server Error

```
  Title: "Server error"
  Description: [DYNAMIC: message] OR "An error occurred."   ← variant: destructive
```

### 4K. On Chat Mention

```
  Title: "[senderName] mentioned you"
  Description: [first 120 chars of message]
```

### 4L. On Add Rival (from death overlay button)

```
  Title: "Rival Added"
  Description: "⚔️ [killerName] added to your Rival List! Hunt them in future lobbies!"
```

### 4M. On Add Friend (from death overlay button)

```
  Title: "Friend Added"
  Description: "🤝 Added [killerName] ([killerTag]) to your Friends list!"
```

### 4N. On View Profile (from death overlay button)

```
  Title: "Viewing Profile"
  Description: "👁️ Viewing [killerName]'s profile ([killerTag])"
```

---

## 5. DEATH OVERLAY (EndOverlay — outcome === 'death')

**Shown when:** `phase === 'ended' && endScreen.outcome === 'death'`

Full-screen overlay: `bg-slate-950/80 backdrop-blur-md`, z-50.

```
  ┌──────────────────────────────────────────────────────┐
  │ ══════════════════════════════════════════════════════ │  ← red-600 accent bar (h-1.5, full width, rounded-t-2xl)
  │                                                        │
  │                    [💀]                                │  ← Skull icon, 64×64, red-500, in red-500/10 bg + red-500/20 border
  │                                                        │
  │              Arena Disintegration!                     │  ← h3, 2xl bold white (ALWAYS this title for death)
  │                                                        │
  │   [subtitle — see 5A below]                            │  ← 1 line, xs, slate-400
  │                                                        │
  │   [death stats panel — see 5B below]                   │
  │   [killer card — see 5C below]                         │
  │   [replay button — see 5D below]                       │
  │   [replay player — see 5E / Section 6 below]          │
  │   [pending message — see 5F below]                     │
  │                                                        │
  │   [PLAY AGAIN]                                         │  ← gradient red-600→rose-600, Compass icon, sm bold white
  │   [📺 Watch Video (Get +50 Chips)]                     │  ← border-amber-500/40, bg-amber-500/10, amber-300, xs bold
  │   [RETURN TO LOBBY]                                    │  ← bg-slate-800, slate-200, xs bold
  │                                                        │
  │                Press ESC to exit                       │  ← 10px, slate-500
  └──────────────────────────────────────────────────────┘
  (w-[min(94vw,520px)], rounded-2xl, border-slate-800, bg-slate-950, shadow-2xl)
```

### 5A. Death Subtitle Variants

**IF online:**
```
  "Your snake head collided with a rival. All unbanked carried chips were lost in-match."
```

**IF offline:**
```
  "Offline Training — No chips lost."
```

### 5B. Death Stats Panel

**IF online (`!isExtract && !isOffline`):**
```
  ┌────────────────────────────────────────────────┐
  │ Stakes Buy-In Cost:           -[buyIn] chips    │  ← slate-400 label, red-400 value
  │ Match Carried Value Forfeited: -[carried] c     │  ← slate-400 label, slate-500 value
  │ Opponents Eliminated:         [kills] Kills     │  ← slate-400 label, white value
  └────────────────────────────────────────────────┘
  (border-slate-800, bg-slate-900/60, xs mono)
```

**IF offline (`!isExtract && isOffline`):**
```
  ┌────────────────────────────────────────────────┐
  │ Opponents Eliminated:         [kills] Kills     │  ← slate-400 label, white value
  └────────────────────────────────────────────────┘
  (border-slate-800, bg-slate-900/60, xs mono)
```

### 5C. Killer Card

**Condition:** `killer` exists (not a wall death)

```
  ┌────────────────────────────────────────────────────────────┐
  │ 💀 COLLIDED WITH / ELIMINATED BY                           │  ← 10px uppercase mono, rose-400
  │                                                            │
  │ [#tag]                                                     │  ← IF killer.tag exists (10px mono, slate-400, in slate-900 bg pill)
  │                                                            │
  │  [AB]  KillerName                                          │  ← avatar circle (killer.color bg, white bold, first 2 chars)
  │        Online Rival Player      ← IF killer.isBot === false│  ← name: xs bold white; subtitle: 10px slate-400
  │        Arena AI Combatant        ← IF killer.isBot !== false│
  │                                                            │
  │  [IF killer.isBot === false (real player only):]           │
  │  [👤 View Profile] [⚔️ Add Rival] [➕ Add Friend]          │  ← 11px bold white buttons
   │   (bg-slate-700)     (bg-rose-600)     (bg-slate-800)      │
  └────────────────────────────────────────────────────────────┘
  (border-rose-900/50, bg-slate-900/60)
```

**IF wall death (no killer):** killer card is not shown at all.

### 5D. Replay Button

**Condition:** `hasReplay === true && !showReplay` (death only, frames > 10)

```
  ┌──────────────────────────────────────────┐
  │     📺 Watch Death Replay                │  ← xs bold indigo-300, border-indigo-500/30
  └──────────────────────────────────────────┘     bg-indigo-500/10, full width
```

### 5E. Replay Player (Embedded, Offline)

**Condition:** `hasReplay && showReplay && isOffline`

See **Section 7** (Offline ReplayPlayer) — rendered inline in the overlay.

### 5F. Pending Tally Message

**Condition:** `!result` (server hasn't sent match_result yet)

```
  "Final tally pending from server…"
  (text-center, xs, slate-400)
```

---

## 6. EXTRACT OVERLAY (EndOverlay — outcome === 'extract')

**Shown when:** `phase === 'ended' && endScreen.outcome === 'extract'`

Same container structure as death overlay but with yellow/amber accent.

```
  ┌──────────────────────────────────────────────────────┐
  │ ══════════════════════════════════════════════════════ │  ← gradient yellow-500→amber-500 accent bar
  │                                                        │
  │                    [🧭]                                │  ← Compass icon, 64×64, yellow-400
  │                   (spinning 6s)                        │  ← IF title !== "Practice Run Completed!"
  │                                                        │
  │   [title — see 6A below]                              │  ← h3, 2xl bold white
  │                                                        │
  │   [subtitle — see 6B below]                            │  ← 1 line, xs, slate-400
  │                                                        │
  │   [3-column stats grid — see 6C below]                │
  │   [results table — see 6D / 6E below]                 │
  │   [final banked + level — see 6F below]               │
  │   [pending message — see 6G below]                     │
  │                                                        │
  │   [PLAY AGAIN]                                         │  ← gradient emerald-500→teal-500, Compass icon, sm bold white
  │   [📺 Watch Video (Get +50 Chips)]                     │  ← border-amber-500/40, bg-amber-500/10, amber-300, xs bold
  │   [SECURE CHIPS & RETURN TO LOBBY]                     │  ← IF online: bg-slate-800, slate-200, xs bold
  │   [RETURN TO LOBBY]                                    │  ← IF offline: bg-slate-800, slate-200, xs bold
  │                                                        │
  │                Press ESC to exit                       │  ← 10px, slate-500
  └──────────────────────────────────────────────────────┘
```

### 6A. Extract Title Variants

| Condition | Title |
|---|---|
| Offline (`isOffline`) | "Practice Run Completed!" |
| Online, `carriedChips > 0` | "Extraction Completed!" |
| Online, `carriedChips === 0` | "Secure Extraction!" |

### 6B. Extract Subtitle Variants

**IF offline:**
```
  "Practice run finished! You eliminated [kills] training bots, reached a max size of [snakeLength], and survived for [N]m [S]s."
```

**IF online, `carriedChips > 0`:**
```
  "Tactical extraction successful! You secured [carriedChips] star chips, eliminated [kills] rivals, reached a max size of [snakeLength], and survived for [N]m [S]s."
```

**IF online, `carriedChips === 0`:**
```
  "Tactical extraction successful! You exited safely after surviving for [N]m [S]s, eliminating [kills] rivals, with a final snake size of [snakeLength]."
```

### 6C. Extract 3-Column Stats Grid

```
  ┌─────────────┬─────────────┬─────────────────┐
  │   KILLS     │ MAX LENGTH  │ SURVIVAL TIME   │
  │   [kills]   │ [snakeLen]  │    [M]:[SS]     │
  │  (rose-400)  │(indigo-400) │   (sky-400)     │
  └─────────────┴─────────────┴─────────────────┘
  (3-column grid, each: border-slate-800, bg-slate-900/60, p-2)
  (labels: 10px uppercase tracking-wider slate-500; values: lg bold colored)
```

### 6D. Extract Results Table (Online)

**Condition:** `!isOffline`

```
  ┌────────────────────────────────────────────────────────────┐
  │ Carried Value:                          [carriedChips] chips│  ← slate-400 / white
  │ System Commission ([N]%):                  -[commission]   │  ← IF commission>0: shows percentage
  │                                           chips            │      IF commission=0: "(0% — Low Density)"
  │ BANKED TO ACCOUNT:                      +[banked] c       │  ← bold slate-300 / bold emerald-400
  └────────────────────────────────────────────────────────────┘
  (border-slate-800, bg-slate-900/60, xs mono)
```

### 6E. Extract Results (Offline)

**Condition:** `isOffline`

```
  ┌──────────────────────────────────────────────────┐
  │        OFFLINE TRAINING COMPLETE                │  ← xs mono uppercase, amber-400/95
   │                                                  │
  │  No buy-in or banking fees. Great job sharpening │  ← 11px, slate-400, text-center
   │  your skills and maneuvers!                     │
  └──────────────────────────────────────────────────┘
  (border-slate-800, bg-slate-900/60, text-center)
```

### 6F. Final Banked Chips + Level

**Condition:** `result` exists (server has sent match_result)

```
  ┌────────────────────────────────────────────────────────────┐
  │ Total Banked:                          [newBankedChips]c    │  ← slate-400 / bold amber-300
   │ Level:                                 [newLevel]           │  ← slate-400 / bold white
   │                                         [↑ Level Up!]       │  ← IF leveledUp: emerald-500/20 bg, emerald-300, badge
  └────────────────────────────────────────────────────────────┘
  (border-slate-800, bg-slate-900/60, xs mono)
```

### 6G. Pending Tally Message

**Condition:** `!result`

```
  "Final tally pending from server…"
  (text-center, xs, slate-400)
```

---

## 7. OFFLINE REPLAY PLAYER (Embedded in Death Overlay)

**Shown when:** `hasReplay && showReplay && isOffline`

```
  ┌──────────────────────────────────────────────────────┐
  │  ⏺ REPLAY                                           │  ← bold 12px mono, rose-400 (80% opacity)
  │  Frame N/Total | -Ns to death   OR                   │  ← 10px mono (slate-200 pre-death, rose-400 post-death)
  │  ⛔ DEATH +Ns | Frame N/Total   (after death frame)  │
  │                                                      │
  │              [replay canvas]                         │  ← aspect-video, cursor-crosshair
   │                                                      │
  │  [════════════════💀═════════════════]                │  ← progress bar: rose-500 fill, yellow-400 death marker
   │                                                      │
  │       [↻]  [▶/⏸]  [1x]  [−] 100% [+]               │  ← controls row, centered
   │        restart play  speed   zoom                    │
  └──────────────────────────────────────────────────────┘
  (rounded-lg, border-slate-800, bg-slate-950)
```

**Controls:**
- Restart (RotateCcw icon, h-8 w-8, bg-slate-900/80)
- Play/Pause (Pause/Play icon, h-9 w-9, bg-rose-600)
- Speed (cycles: 0.25x → 0.5x → 1x → 2x, xs mono bold, bg-slate-900/80)
- Zoom Out (ZoomOut icon, h-8 w-8, bg-slate-900/80)
- Zoom % (10px mono, slate-400, w-8 text-center)
- Zoom In (ZoomIn icon, h-8 w-8, bg-slate-900/80)
- Death marker on progress bar: yellow-400 vertical line with title="💀 Death"

---

## 8. ONLINE REPLAY PLAYER (Full-Screen, Death Only)

**Shown when:** `hasReplay && showReplay && !isOffline`

Full-screen (`fixed inset-0 z-50`), black background.

```
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │            ┌────────────────────────┐                        │
  │            │    DEATH REPLAY         │                        │  ← sm bold red-400, border-red-500/30
  │            │  Click anywhere on the  │                        │  ← 10px red-300/70
  │            │  timeline to scrub      │                        │
  │            └────────────────────────┘                        │
  │                                                              │
  │                    [full-screen replay canvas]               │
  │                                                              │
  │  Frame N/Total  |  N.Ns                        [minimap]    │  ← 10px mono, white 50%, bottom-left
   │                                                              │
  │  ┌──────────────────────────────────────────────────────┐    │
  │  │ [═════════════💀═════════════════════════]           │    │  ← progress bar: gradient red→amber, yellow death marker
   │  │                                                      │    │     clickable to scrub
  │  │    [⏮]  [⏸/▶]  [⏭]  [1x]  [ZOOM +] [ZOOM −]  [↻ RESTART]  [CLOSE] │    │
  │  └──────────────────────────────────────────────────────┘    │
  └──────────────────────────────────────────────────────────────┘
```

**Controls bar:** (auto-hides after 3s of inactivity, fades in on mouse move/click)
- Skip to Start (⏮, rounded-full, bg-slate-800/80)
- Play/Pause (⏸/▶, rounded-full, bg-white/10, backdrop-blur, p-3)
- Skip to End (⏭, rounded-full, bg-slate-800/80)
- Speed (cycles: 0.25x → 0.5x → 1x → 2x, xs mono, bg-slate-800/80)
- ZOOM + (rounded-lg, bg-slate-800/80, xs mono)
- ZOOM − (rounded-lg, bg-slate-800/80, xs mono)
- ↻ RESTART (rounded-lg, bg-slate-800/80, xs mono) — resets zoom to 1x
- CLOSE (rounded-lg, bg-slate-800/80, xs mono, ml-4) — returns to death overlay
- Death marker: yellow-400 vertical line on progress bar
- Frame counter (bottom-left): `Frame N/Total  |  N.Ns`
- Minimap (bottom-right): 96px, same style as in-game
- Red death flash: 20-frame red overlay fading from 30% opacity at death frame

---

## 9. OFFLINE MODE (Practice Arena)

**Entirely different rendering path.** When `isOffline === true`, the component returns:

```jsx
  <div className="fixed inset-0 overflow-hidden bg-background select-none">
    <canvas className="va-game-canvas absolute inset-0 h-full w-full"
            aria-label="Venom Arena offline practice canvas" />
  </div>
```

**No HTML overlays are rendered by React.** All HUD elements (stats, death screen, extract screen, leaderboard, emotes, etc.) are managed entirely by the `OfflineGameEngine` which appends DOM nodes directly to the canvas parent.

---

## 10. COMPLETE ELEMENT INVENTORY

| Element | Position | Condition | Type |
|---|---|---|---|
| Connecting overlay | Full-screen center | phase=connecting, no error | HTML overlay |
| Connection error overlay | Full-screen center | phase=connecting, error | HTML overlay |
| Reconnecting banner | Top-center, below top | isReconnecting && playing | HTML overlay |
| Carried Chips card | Top-left (3,3) | !connecting, !offline | HTML overlay |
| Stars Earned card | Top-left, below carried | !connecting, !offline, profit | HTML overlay |
| Stars in Arena card | Top-left, below earned | !connecting, !offline, stars>0 | HTML overlay |
| Rank/Score/Kills/Boost card | Top-left, below stars | !connecting | HTML overlay |
| Active Competitors card | Top-left, below rank | !connecting | HTML overlay |
| Banked chips | Top-right (3,3) | !connecting | HTML overlay |
| FPS / Ping / LQ badge | Top-right, below banked | !connecting | HTML overlay |
| Chat button | Right (3,92px) | playing | HTML overlay |
| Minimap toggle button | Right, beside chat | playing | HTML overlay |
| Arena Leaderboard (expanded) | Right (3,140px) | !connecting, open | HTML overlay |
| Arena Leaderboard (collapsed) | Right (3,140px) | !connecting, collapsed | HTML overlay |
| Full map close button | Right (4,4) | fullMapOpen && playing | HTML overlay |
| Kill feed | Left (3,112px) | entries exist | HTML overlay |
| Extract hint text | Top-center (56px) | playing, no endScreen | HTML overlay |
| Extract progress bar | Top-center, below hint | playing, extracting | HTML overlay |
| BOOST button | Bottom-right (6,6) | playing | HTML overlay |
| EXTRACT button | Bottom-right, below boost | playing | HTML overlay |
| LEAVE button | Bottom-left | playing | HTML overlay |
| Emotes bar | Bottom-left (4,4) | playing | HTML overlay |
| Chat dialog | Centered modal | chatOpen | Dialog |
| Death vignette | Full-screen | showDeathVignette (3s) | HTML overlay |
| End overlay (death) | Full-screen center | ended + death | HTML overlay (z-50) |
| End overlay (extract) | Full-screen center | ended + extract | HTML overlay (z-50) |
| Game canvas | Full-screen | always | Canvas |
| Minimap (radar) | Bottom-right, canvas | minimapVisible, !connecting | Canvas-drawn |
| Full arena map | Full-screen, canvas | fullMapOpen, playing | Canvas-drawn |
| Snake name labels | Above each head | snake exists | Canvas-drawn |
| Bot [BOT] prefix | Above bot heads | snake.isBot | Canvas-drawn |
| User #tag | Above name | snake.userTag exists | Canvas-drawn |
| Chat bubbles | Above snake heads | snake.chatMessage | Canvas-drawn |
| Star chip value labels | Inside stars | food.isStarChip, value>0 | Canvas-drawn |
| Extraction ring | Around player head | extractionProgress > 0 | Canvas-drawn |
| Grid | World-space | always | Canvas-drawn |
| Map boundary | World-space | always | Canvas-drawn |
| Food orbs | World-space | always | Canvas-drawn |
| Star collectibles | World-space | always | Canvas-drawn |
| Snakes | World-space | always | Canvas-drawn |
| Particles | World-space | particles exist | Canvas-drawn |
