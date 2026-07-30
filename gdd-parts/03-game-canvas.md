# GDD Part 03 — game-canvas.tsx Exhaustive Catalog

**Source file:** `/tmp/venom-arena/src/components/game/game-canvas.tsx` (3152 lines)
**Component:** `GameCanvas` + sub-components `ReplayPlayer`, `EndOverlay`
**Build reference:** BUILD-10 game-canvas fix, BUILD-13 arena leaderboard/minimap/full-map, BUILD-14 offline engine

---

## 1. CONSTANTS & NUMERIC THRESHOLDS

| Constant | Value | Purpose |
|---|---|---|
| `SOCKET_PORT` | `3001` | Socket.IO server port |
| `MAX_PARTICLES` | `200` | Hard cap on particle array (C10 fix) |
| `INPUT_HEARTBEAT_MS` | `200` | Min ms between forced input emits |
| `PING_INTERVAL_MS` | `2500` | Ping send interval |
| `FPS_LOW_THRESHOLD` | `40` | FPS below this triggers LQ |
| `FPS_HIGH_THRESHOLD` | `55` | FPS above this disables LQ |
| `FPS_LOW_DURATION_MS` | `2000` | Duration below low threshold to enable LQ |
| `FPS_HIGH_DURATION_MS` | `5000` | Duration above high threshold to disable LQ |
| `MOUSE_DEADZONE_PX` | `15` | Mouse distance from center to register direction (I2 fix, was 5) |
| `JOYSTICK_DEADZONE` | `0.18` | Min magnitude to register joystick input |
| `JOYSTICK_MAX_RADIUS_PX` | `70` | Joystick outer ring radius in px |
| `JOYSTICK_BOOST_MAGNITUDE` | `0.6` | >60% deflection = boost trigger |
| `REPLAY_PRE_MAX` | `300` | Pre-death circular buffer size (15s at 20Hz) |
| `REPLAY_POST_MAX` | `300` | Post-death linear buffer size (15s at 20Hz) |
| `DEATH_VIGNETTE_DELAY_MS` | `3000` | Red vignette duration before end screen |
| `REPLAY_POST_RECORD_MS` | `15500` | Timeout for post-death replay capture completion |
| `KILL_FEED_MAX` | `8` | Max kill feed entries |
| `KILL_FEED_AUTO_REMOVE_MS` | `5000` | Auto-remove kill feed entry |
| `KILL_DETECT_RADIUS` | `220` | Heuristic kill detection distance (px) |
| `CAM_LERP_FACTOR` | `0.18` | Camera smoothing factor |
| `CAM_ZOOM_LERP` | `0.05` | Camera zoom smoothing factor |
| `CAM_ZOOM_MIN` | `0.6` | Minimum zoom (big snake) |
| `CAM_ZOOM_MAX` | `1.4` | Maximum zoom (small snake) |
| `CAM_ZOOM_BASE_LENGTH` | `12` | Body length at which zoom starts decreasing |
| `CAM_ZOOM_DECREASE_RATE` | `0.008` | Zoom decrease per body length unit |
| `DPR_CAP` | `2` | Max device pixel ratio for canvas |
| `INPUT_ANGLE_THRESHOLD` | `0.015` | Min angle change to emit |
| `INPUT_MIN_EMIT_INTERVAL` | `50` | Min ms between non-heartbeat emits |
| `PARTICLE_VELOCITY_DAMPING` | `0.96` | Per-frame velocity multiplier |
| `RECONNECT_AUTO_EXIT_MS` | `1800` | Auto-exit after join error |
| `KICKED_AUTO_EXIT_MS` | `1500` | Auto-exit after kick |
| `MINIMAP_SIZE` | `96` | Minimap dimension in px |
| `MINIMAP_MARGIN` | `12` | Minimap margin from edges |
| `MINIMAP_RANGE` | `1800` | Minimap snake detection range |
| `LEADERBOARD_DEFAULT_COLLAPSE_WIDTH` | `640` | window.innerWidth below which leaderboard auto-collapses |
| `CHAT_MAX_LENGTH` | `200` | Max chat message length |
| `MENTION_PREVIEW_LENGTH` | `120` | Max chars in mention toast |
| `REPLAY_FRAME_INTERVAL` | `50` | ms per replay frame at 1x speed |
| `REPLAY_SPEEDS` | `[0.25, 0.5, 1, 2]` | Available replay playback speeds |
| `REPLAY_ZOOM_MIN` | `0.3` | Min replay zoom |
| `REPLAY_ZOOM_MAX` | `2` | Max replay zoom |
| `REPLAY_ZOOM_STEP` | `0.15` | Zoom adjustment per click |
| `REPLAY_DEATH_FOOD_RADIUS` | `300` | Radius to detect food collected near death |
| `REPLAY_GRID_SIZE` | `80` | Replay grid line spacing |
| `REPLAY_SLOW_ZOOM_RATE` | `0.0003` | Slow zoom-out rate when no one collects death food |
| `SNIPPET_COLLAPSE_WIDTH` | `640` | `sm` breakpoint for hiding inline text |

---

## 2. LUCIDE-REACT ICONS (all 26 imported)

| Icon | Usage Location(s) |
|---|---|
| `AlertTriangle` | Connection error overlay |
| `ChevronDown` | Collapsed leaderboard expand button |
| `ChevronUp` | Leaderboard header collapse button |
| `Compass` | EndOverlay extract icon; Play Again button |
| `Landmark` | Carried Chips card icon |
| `Loader2` | Connecting spinner (animated spin) |
| `LogOut` | Connection error "Back to lobby" button; Leave arena button |
| `Map as MapIcon` | Minimap toggle button |
| `MessageSquare` | Chat open button; Emotes bar header |
| `Pause` | Replay pause control |
| `Play` | Replay play control |
| `RotateCcw` | Replay restart button |
| `Send` | Chat dialog send button |
| `Shield` | Score row icon |
| `Signal` | Ping display icon |
| `Skull` | Kills row icon; death end-overlay icon; killer card header |
| `Star` | Stars Earned card icon; Stars in Arena card icon |
| `Swords` | Add Rival button icon |
| `Trophy` | Rank row icon; Extract mobile button; Arena Leaders header |
| `User` | View Profile button icon |
| `UserPlus` | Add Friend button icon |
| `Users` | Bots row icon |
| `WifiOff` | Reconnecting banner icon |
| `X` | Full-map close button |
| `Zap` | Boost row icon; Boost mobile button |
| `ZoomIn` | Replay zoom-in button |
| `ZoomOut` | Replay zoom-out button |

---

## 3. STATE VARIABLES (React — trigger re-render, HUD/overlays only)

| Variable | Type | Initial Value | Purpose |
|---|---|---|---|
| `phase` | `Phase` | `'connecting'` | Game phase: `'connecting'` \| `'playing'` \| `'ended'` |
| `connectingMsg` | `string` | `'Authenticating…'` | Status text shown on connecting overlay |
| `connectionError` | `string \| null` | `null` | Error message replacing spinner |
| `isReconnecting` | `boolean` | `false` | Triggers reconnecting banner |
| `endScreen` | `EndScreenState \| null` | `null` | Death/extract end screen data |
| `hudCarried` | `number` | `0` | Carried chips (HUD) |
| `hudKills` | `number` | `0` | Kill count (HUD) |
| `hudScore` | `number` | `0` | Body-length score (HUD) |
| `hudRank` | `number` | `1` | Player rank (HUD) |
| `hudRealPlayers` | `number` | `1` | Real player count (HUD, secondary) |
| `hudBots` | `number` | `0` | Bot count (HUD) |
| `extracting` | `boolean` | `false` | Extraction in progress flag |
| `extractProgress` | `number` | `0` | Extraction progress 0..1 |
| `showDeathVignette` | `boolean` | `false` | Red radial vignette overlay |
| `fps` | `number` | `60` | Current FPS (HUD) |
| `ping` | `number` | `-1` | Current RTT ms (-1 = unknown) |
| `lowQuality` | `boolean` | `false` | Adaptive quality flag |
| `chatOpen` | `boolean` | `false` | Chat dialog visibility |
| `chatInput` | `string` | `''` | Chat input field value |
| `killFeed` | `KillFeedEntry[]` | `[]` | Kill feed entries (max 8) |
| `hudCommissionRate` | `number` | `0` | Server-reported commission rate |
| `hudLeaderboard` | `ArenaLeaderboardEntry[]` | `[]` | Top 10 leaderboard |
| `hudYourRank` | `number` | `0` | Server-reported your rank |
| `hudRealPlayerCount` | `number` | `isOffline ? 0 : 1` | Server-reported real player count |
| `leaderboardOpen` | `boolean` | `true` | Leaderboard panel visibility |
| `minimapVisible` | `boolean` | `true` | Minimap visibility (auto-hidden in offline) |
| `fullMapOpen` | `boolean` | `false` | Full-screen map overlay |

---

## 4. REF VARIABLES (mutable, read by rAF/handlers, no re-render)

| Variable | Type | Initial Value | Purpose |
|---|---|---|---|
| `canvasRef` | `HTMLCanvasElement \| null` | `null` | Canvas DOM element |
| `socketRef` | `Socket \| null` | `null` | Socket.IO instance |
| `rafRef` | `number \| null` | `null` | requestAnimationFrame handle |
| `resizeObserverRef` | `ResizeObserver \| null` | `null` | Canvas resize observer |
| `snapshotRef` | `GameSnapshot \| null` | `null` | Latest server snapshot |
| `mySnakeIdRef` | `string \| null` | `null` | Player's snake server ID |
| `phaseRef` | `Phase` | `'connecting'` | Phase mirror for rAF |
| `replayPreBufferRef` | `GameSnapshot[]` | `[]` | Circular pre-death replay buffer |
| `replayWriteIdxRef` | `number` | `0` | Write index for circular buffer |
| `replayPostBufferRef` | `GameSnapshot[]` | `[]` | Linear post-death replay buffer |
| `isPostDeathRef` | `boolean` | `false` | Post-death recording flag |
| `postDeathRecordRef` | `number` | `0` | Countdown frames for post-death recording |
| `deathFrameIdxRef` | `number` | `0` | Index in combined replay where death occurs |
| `hasStartedRecordingRef` | `boolean` | `false` | Skip pre-spawn frames flag |
| `keysRef` | `Set<string>` | `new Set()` | Currently held keys |
| `mousePosRef` | `{x, y}` | `{x:0, y:0}` | Mouse position relative to canvas |
| `mouseActiveRef` | `boolean` | `false` | Mouse is active (moved recently) |
| `mouseLeftDownRef` | `boolean` | `false` | Left mouse button held (boost) |
| `touchAngleRef` | `number \| null` | `null` | Touch joystick angle |
| `touchBoostRef` | `boolean` | `false` | Touch joystick boost |
| `joystickRef` | `JoystickState \| null` | `null` | Virtual joystick state |
| `camRef` | `{x, y, zoom}` | `{x:4000, y:4000, zoom:1.0}` | Camera position & zoom |
| `camInitRef` | `boolean` | `false` | Camera has been initialized |
| `particlesRef` | `Particle[]` | `[]` | Particle effects array |
| `metallicCacheRef` | `Map<string, CanvasGradient>` | `new Map()` | Cached metallic gradients |
| `lowQualityRef` | `boolean` | `false` | LQ mirror for rAF |
| `fpsAccumRef` | `{frames, lastSecond, lowSince, highSince}` | `{0,0,0,0}` | FPS accumulation counters |
| `pingRef` | `number` | `-1` | Ping mirror for rAF |
| `pendingPingsRef` | `Map<string, number>` | `new Map()` | Pending ping timestamps |
| `lastPingSentRef` | `number` | `0` | Last ping send timestamp |
| `matchEndedRef` | `boolean` | `false` | Idempotency guard (C3 fix) |
| `startTimeRef` | `number` | `Date.now()` | Match start timestamp |
| `killsRef` | `number` | `0` | Heuristic kill count |
| `prevSnakesRef` | `SnakeSnapshot[]` | `[]` | Previous frame snakes (kill detection) |
| `carriedRef` | `number` | `0` | Last known carried chips |
| `scoreRef` | `number` | `0` | Last known score |
| `wasBoostingRef` | `boolean` | `false` | For boost sound edge trigger |
| `lastInputEmitRef` | `number` | `0` | Last input emit timestamp |
| `lastEmittedAngleRef` | `number` | `0` | Last emitted angle |
| `lastEmittedBoostRef` | `boolean` | `false` | Last emitted boost state |
| `isMountedRef` | `boolean` | `true` | Component mount guard |
| `timersRef` | `Set<Timeout>` | `new Set()` | Tracked timers for cleanup |
| `chatTimeoutsRef` | `Map<string, Timeout>` | `new Map()` | Chat message timeouts |
| `extractActiveRef` | `boolean` | `false` | Extraction currently active |
| `boostHoldRef` | `boolean` | `false` | Mobile boost button held |
| `minimapVisibleRef` | `boolean` | `true` | Minimap mirror for rAF |
| `fullMapOpenRef` | `boolean` | `false` | Full map mirror for rAF |
| `isOfflineModeRef` | `boolean` | `isOffline` | Offline mode mirror for rAF |
| `playerSkinRef` | `string` | `player.currentSkin` | Current cosmetic skin ID |
| `arenaIdRef` | `string` | `arenaId` | Arena ID mirror |
| `playerNameRef` | `string` | `player.name` | Player name mirror |
| `onExitRef` | `function` | `onExit` | Exit callback mirror |
| `offlineEngineRef` | `OfflineGameEngine \| null` | `null` | Offline game engine instance |
| `offlineFinalStateRef` | `OfflineState \| null` | `null` | Offline final state (dead/extracted) |
| `computeInputRef` | `function \| null` | `null` | Input computation function for rAF |

---

## 5. HUD ELEMENTS — BY POSITION

### 5.1 CONNECTING OVERLAY (center, phase === 'connecting')

**Position:** Center of screen, `z-40`
**Container:** `absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm`

#### 5.1.1 Error State (when `connectionError` is truthy)
- **Icon:** `AlertTriangle`, size `h-12 w-12`, color `text-rose-500`
- **Text:** `{connectionError}` (dynamic — set by error handler)
  - Possible values:
    - `"Not authenticated. Please sign in again."`
    - `"Connection failed"` (fallback from connect_error)
    - Join error messages (see §7)
- **Text styling:** `max-w-sm text-center text-lg font-semibold text-foreground`
- **Button:**
  - Label: `"Back to lobby"`
  - Icon: `LogOut` (`h-4 w-4`, `mr-2`)
  - Variant: `outline`
  - Action: `exitNow()`

#### 5.1.2 Connecting State (when no error)
- **Icon:** `Loader2`, size `h-10 w-10`, classes `animate-spin text-primary`
- **Text:** `{connectingMsg || 'Connecting…'}`
  - Possible values:
    - `"Authenticating…"` (initial)
    - `"Reconnecting (attempt N)…"` (on reconnect_attempt)
    - `""` (cleared on join or error)
- **Text styling:** `text-sm text-muted-foreground`

---

### 5.2 RECONNECTING BANNER (top-center, in-game)

**Position:** Top-center of screen
**Show when:** `isReconnecting && phase === 'playing'`
**Container:** `absolute left-1/2 top-3 -translate-x-1/2 flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-300 backdrop-blur-sm`
- **Icon:** `WifiOff`, size `h-3.5 w-3.5`
- **Text:** `"Reconnecting…"`

---

### 5.3 TOP-LEFT HUD (stats panel)

**Position:** `absolute left-3 top-3 z-40`
**Container:** `flex max-w-sm flex-col gap-2 font-mono pointer-events-none`
**Show when:** `phase !== 'connecting'`

#### 5.3.1 Carried Chips Card (online only, hidden when `isOfflineMode`)
**Container:** `rounded-lg border border-emerald-500/30 bg-slate-950/80 px-3 py-2 backdrop-blur-sm`
- **Header:**
  - Icon: `Landmark`, size `h-3 w-3`, color `text-emerald-400`
  - Label: `"Carried Chips"`, classes `text-[10px] uppercase tracking-wider text-slate-500`
- **Value:** `{hudCarried.toLocaleString()}c`
  - Styling: `text-2xl font-bold text-emerald-400 tabular-nums`
  - Suffix: `c` (chips), `text-base` size, `ml-0.5`

#### 5.3.2 Stars Earned Card (online only, conditional)
**Show when:** `!isOfflineMode && hudCarried > (arena?.buyIn ?? 0)`
**Container:** `rounded-lg border border-amber-500/30 bg-slate-950/80 px-3 py-1.5 backdrop-blur-sm`
- **Header:**
  - Icon: `Star`, size `h-3 w-3`, color `text-amber-400`
  - Label: `"Stars Earned"`, classes `text-[10px] uppercase tracking-wider text-slate-500`
- **Value:** `+{Math.max(0, hudCarried - buyIn).toLocaleString()}c`
  - Styling: `text-sm font-bold text-amber-400 tabular-nums`
  - Prefix: `+`
  - Suffix: `c`, `text-xs`

#### 5.3.3 Stars in Arena Card (online only, conditional)
**Show when:** `!isOfflineMode && starsInArena > 0`
**Container:** `rounded-lg border border-yellow-500/30 bg-slate-950/80 px-3 py-1.5 backdrop-blur-sm`
- **Header:**
  - Icon: `Star`, size `h-3 w-3`, color `text-yellow-400`
  - Label: `"Stars in Arena"`, classes `text-[10px] uppercase tracking-wider text-slate-500`
- **Value:** `{starsInArena}`
  - Styling: `text-sm font-bold text-yellow-300 tabular-nums`
  - No suffix

#### 5.3.4 Rank / Score / Kills / Boost Card (always visible)
**Container:** `rounded-lg border border-slate-700/60 bg-slate-950/80 px-3 py-2 backdrop-blur-sm`

| Row | Icon | Icon Color | Label | Label Color | Value | Value Color |
|---|---|---|---|---|---|---|
| Rank | `Trophy` `h-3.5 w-3.5` | `text-yellow-500` | `"Rank:"` | `text-slate-400` | `{rankDisplay}` | `text-yellow-400 font-bold` |
| Score | `Shield` `h-3.5 w-3.5` | `text-indigo-400` | `"Score:"` | `text-slate-400` | `{snakeLength.toLocaleString()}` | `text-white font-bold` |
| Kills | `Skull` `h-3.5 w-3.5` | `text-rose-500` | `"Kills:"` | `text-slate-400` | `{hudKills}` | `text-rose-400 font-bold` |
| Boost | `Zap` `h-3.5 w-3.5` | `text-amber-500` | `"Boost:"` | `text-slate-400` | `"SPACE"` | `text-amber-400 font-bold` |

**Rank display logic:**
- Offline mode: `"#X"` (e.g. `"#3"`)
- Online ≤1 real player: `"#1 of 1"`
- Online >1 real player: `"#{yourRank} of {realPlayerCount}"`

#### 5.3.5 Active Competitors Card (always visible)
**Container:** `rounded-lg border border-slate-700/60 bg-slate-950/80 px-3 py-2 backdrop-blur-sm text-xs`

**Offline mode variant:**
- Label: `"Offline Mode:"` (`text-slate-400`)
- Value: `"1 Player"` (`text-amber-400 font-bold`)

**Online mode variant:**
- Label: `"Real Players:"` (`text-slate-400`)
- Value: `"{count} Active"` (`text-indigo-400 font-bold animate-pulse`)
- Uses `hudRealPlayerCount || hudRealPlayers` (server count preferred)

**Bots row (both modes):**
- Icon: `Users` `h-3.5 w-3.5` `text-slate-400`
- Label: `"Bots:"` (`text-slate-400`)
- Value: `{hudBots}` (`text-slate-300 font-bold`)

---

### 5.4 TOP-RIGHT HUD (banked chips, FPS, ping)

**Position:** `absolute right-3 top-3 z-40`
**Container:** `flex flex-col items-end gap-1.5 font-mono pointer-events-none`
**Show when:** `phase !== 'connecting'`

#### 5.4.1 Banked Chips
**Container:** `rounded-md border border-amber-500/30 bg-slate-950/80 px-2.5 py-1 text-right backdrop-blur-sm`
- **Header:** `"BANKED"`, classes `text-[10px] uppercase tracking-wider text-slate-500`
- **Value:** `{player.bankedChips.toLocaleString()}c`
  - Styling: `text-sm font-bold text-amber-300 tabular-nums`

#### 5.4.2 FPS / Ping / LQ Badge
**Container:** `flex items-center gap-2 rounded-md border border-slate-700/60 bg-slate-950/80 px-2 py-1 text-[11px] backdrop-blur-sm`
- **FPS:** `"{fps} fps"` (`text-slate-400`)
- **Ping:**
  - Icon: `Signal` `h-3 w-3`
  - When `ping < 0`: `"—"` (em dash), color `text-muted-foreground`
  - When `ping < 80`: `"{ping}ms"`, color `text-emerald-400`
  - When `ping < 160`: `"{ping}ms"`, color `text-amber-400`
  - When `ping >= 160`: `"{ping}ms"`, color `text-rose-400`
- **Low Quality Badge** (conditional when `lowQuality === true`):
  - Text: `"🎨 LQ"`
  - Styling: `rounded bg-amber-500/20 px-1 text-amber-300`
  - Tooltip: `"Low quality mode (adaptive)"`

---

### 5.5 TOP-RIGHT ROW — CHAT + MINIMAP TOGGLE (below BANKED/FPS)

**Position:** `absolute right-3 top-[92px] z-20`
**Show when:** `phase === 'playing'`

#### 5.5.1 Chat Button
- **Icon:** `MessageSquare` `h-4 w-4`
- **Type:** Icon button (`size="icon"`, `variant="outline"`)
- **Size:** `h-9 w-9 rounded-full`
- **Styling:** `border-primary/40 bg-card/80 backdrop-blur-sm`
- **Aria-label:** `"Open chat"`
- **Action:** `setChatOpen(true)`

#### 5.5.2 Minimap Toggle Button
- **Icon:** `MapIcon` `h-3.5 w-3.5`
- **Type:** Small button (`size="sm"`, `variant="outline"`)
- **Size:** `h-9 rounded-full`
- **Styling:** `border-primary/40 bg-card/80 px-3 text-[10px] uppercase tracking-wider backdrop-blur-sm`
- **Aria-label:** `"Collapse minimap"` / `"Show minimap"`
- **Text (desktop only, hidden on mobile via `hidden sm:inline`):**
  - When visible: `"Collapse"`
  - When hidden: `"Show Minimap"`
- **Action:** `setMinimapVisible(v => !v)`

---

### 5.6 TOP-RIGHT — ARENA LEADERBOARD PANEL

**Position:** `absolute right-3 top-[140px] z-20 max-h-[60vh]`
**Show when:** `phase !== 'connecting'`

#### 5.6.1 Open State
**Container:** `w-[240px] max-w-[80vw] overflow-hidden rounded-lg border border-slate-700/60 bg-slate-950/90 backdrop-blur-md`

**Header:**
- Icon: `Trophy` `h-3 w-3` `text-yellow-500`
- Label: `"Arena Leaders"`, classes `text-[10px] uppercase tracking-wider text-slate-500`
- Collapse button:
  - Icon: `ChevronUp` `h-3.5 w-3.5`
  - Aria-label: `"Collapse leaderboard"`
  - Action: `setLeaderboardOpen(false)`

**Empty State:**
- Text: `"No real players yet."`
- Styling: `px-2 py-3 text-center text-[10px] text-slate-500`

**Entry Row** (per leaderboard entry):
- **Rank number:** `{i + 1}` (1-indexed), `w-5 text-right text-slate-500 tabular-nums`
- **Country flag:** `{countryFlag(entry.country)}` (conditional, `text-xs leading-none`)
- **Name:** `{entry.name || 'Unknown'}`, truncated with `flex-1 truncate`
  - Self: `font-bold text-indigo-300` + `border border-indigo-500/30 bg-indigo-500/15`
  - Others: `text-slate-300`
  - Tooltip: `entry.name` (full name on hover)
- **YOU badge** (self only):
  - Text: `"YOU"`, `text-[9px] font-bold`
  - Offline: `bg-emerald-500/30 text-emerald-200`
  - Online: `bg-indigo-500/30 text-indigo-200`
- **Value column:**
  - Offline mode: `{entry.score.toLocaleString()}` (score), `text-indigo-300`
  - Online mode: `{entry.carriedChips.toLocaleString()}c` (chips with suffix), `text-emerald-400`

**List container:** `max-h-72 overflow-y-auto p-1.5 va-scroll`

#### 5.6.2 Collapsed State
- **Icon:** `ChevronDown` `h-3.5 w-3.5` `text-yellow-500`
- **Text (desktop only):** `"Show Leaderboard"`, `text-[10px] uppercase tracking-wider text-slate-400`
- **Styling:** `flex h-9 items-center gap-1.5 rounded-full border border-slate-700 bg-slate-950/85 px-3 backdrop-blur-sm hover:text-white`
- **Aria-label:** `"Show leaderboard"`
- **Action:** `setLeaderboardOpen(true)`

---

### 5.7 TOP-RIGHT — FULL-MAP CLOSE BUTTON (M key)

**Position:** `absolute right-4 top-4 z-30`
**Show when:** `fullMapOpen && phase === 'playing'`
- **Icon:** `X` `h-4 w-4`
- **Size:** `h-10 w-10 rounded-full`
- **Styling:** `border border-slate-700 bg-slate-900/80 text-slate-300 backdrop-blur-sm hover:text-white`
- **Aria-label:** `"Close full map"`
- **Action:** `setFullMapOpen(false)`

---

### 5.8 DEATH VIGNETTE OVERLAY

**Position:** `absolute inset-0 z-30 pointer-events-none`
**Show when:** `showDeathVignette === true`
- **Animation:** `animate-[fadeIn_300ms_ease-out]`
- **Visual:** Radial gradient ellipse:
  - Center: `transparent 30%`
  - Edge: `rgba(220, 38, 38, 0.6) 100%`
- **Duration:** 3 seconds (DEATH_VIGNETTE_DELAY_MS)
- **Aria:** `aria-hidden="true"`

---

### 5.9 KILL FEED (top-left, below stats)

**Position:** `absolute left-3 top-28 z-20 w-64 max-w-[70vw]`
**Container:** `pointer-events-none flex flex-col gap-0.5 font-mono`
**Show when:** `killFeed.length > 0`

**Entry row styling:** `animate-in fade-in slide-in-from-left-2 flex items-center gap-1 rounded bg-slate-950/75 px-2 py-1 text-[10px] backdrop-blur-sm`

**Wall death entry format:**
- `"{victimName} hit the wall"`
  - Victim name color: `text-orange-400` (bot) or `text-slate-200` (player)
  - "hit the wall" color: `text-red-400`
  - Wrapper: `text-slate-400`

**Elimination entry format:**
- `"{killerName} eliminated {victimName}"`
  - Killer name color: `text-orange-400` (bot) or `text-emerald-400` (player)
  - "eliminated" color: `text-slate-500`
  - Victim name color: `text-orange-400` (bot) or `text-red-400` (player)
  - Wrapper: `text-slate-400`

---

### 5.10 HOLD-TO-EXTRACT POPUP (top-center)

**Position:** `absolute left-1/2 top-14 -translate-x-1/2`
**Show when:** `phase === 'playing' && !endScreen`
**Container:** `pointer-events-none flex flex-col items-center gap-1 text-center`

#### 5.10.1 Instruction Text
- **Text:** `"Hold E or press the button below to cash out safely!"`
- Styling: `text-[11px] font-mono text-slate-400`
- `<kbd>` element: `E`, classes `rounded border border-slate-600 bg-slate-800 px-1 text-[10px] text-slate-200`

#### 5.10.2 Extracting State
**Container:** `rounded-lg border border-amber-500/40 bg-slate-950/85 px-4 py-2 backdrop-blur-sm`
- **Title:** `"EXTRACTING CHIPS ({progress}%)"` (e.g. `"EXTRACTING CHIPS (47%)"`)
  - Styling: `text-xs font-bold text-amber-400`
- **Progress bar:**
  - Track: `h-2 w-48 overflow-hidden rounded-full bg-slate-800`
  - Fill: `h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-500`
  - Width: `{progress * 100}%`, transition `duration-100`
- **Fee display** (online only):
  - When `commissionRate > 0`: `"FEE: {X}%"`, `text-yellow-500`, `text-[10px] font-mono`
  - When `commissionRate === 0`: `"FEE: 0% (LOW POPULATION)"`, `text-emerald-400`, `text-[10px] font-mono`

#### 5.10.3 Idle State (not extracting)
- **Text (online):** `"HOLD TO EXTRACT SUCCESSFUL!"`, `text-[11px] font-bold text-emerald-400`
- **Text (offline):** `"HOLD TO LEAVE PRACTICE ARENA"`, `text-[11px] font-bold text-emerald-400`

---

### 5.11 MOBILE CONTROLS — BOOST + EXTRACT (bottom-right)

**Position:** `absolute bottom-6 right-6 flex items-end gap-3`
**Show when:** `phase === 'playing'`

#### 5.11.1 Boost Button
- **Size:** `h-16 w-16 rounded-full`
- **Icon:** `Zap` `h-6 w-6`
- **Label:** `"BOOST"`, `text-[10px] font-bold`
- **Styling:** `border border-amber-400/50 bg-amber-500/20 text-amber-300 shadow-lg`
- **Active state:** `active:scale-95 transition-transform`
- **Input:** `touch-none select-none flex-col items-center justify-center`
- **Aria-label:** `"Boost"`
- **Pointer events:** `onPointerDown` → `onBoostPointerDown`, `onPointerUp`/`onPointerCancel` → `onBoostPointerUp`, `onContextMenu` → `preventDefault`

#### 5.11.2 Extract Button
- **Size:** `h-20 w-20 rounded-full` (larger than boost)
- **Icon:** `Trophy` `h-6 w-6`
- **Label (idle):** `"EXTRACT"`, `text-[10px] font-bold`
- **Label (extracting):** `"{progress}%"`, `text-[10px] font-bold`
- **Styling (idle):** `border-emerald-400/60 bg-emerald-500/15 text-emerald-300 shadow-lg`
- **Styling (extracting):** `border-emerald-400 bg-emerald-500/40 text-white shadow-lg`
- **Active state:** `active:scale-95 transition-transform`
- **Input:** `touch-none select-none flex-col items-center justify-center`
- **Aria-label:** `"Extract chips"`
- **Pointer events:** `onPointerDown` → `onExtractPointerDown`, `onPointerUp`/`onPointerCancel` → `onExtractPointerUp`, `onContextMenu` → `preventDefault`

---

### 5.12 LEAVE ARENA BUTTON (bottom-left, beside emotes)

**Position:** `absolute bottom-6 left-3 sm:left-28`
**Show when:** `phase === 'playing'`
- **Icon:** `LogOut` `h-3.5 w-3.5`
- **Label:** `"Leave"`
- **Size:** `h-10`
- **Styling:** `rounded-full border border-slate-700 bg-slate-950/80 px-3 text-xs font-medium text-slate-400 backdrop-blur-sm hover:text-foreground`
- **Aria-label:** `"Leave arena"`
- **Action:** `exitNow()`

---

### 5.13 QUICK CHAT EMOTES BAR (bottom-left)

**Position:** `absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-20`
**Container width:** `w-[min(60vw,280px)]`
**Container styling:** `rounded-xl border border-slate-800 bg-slate-950/90 p-2.5 backdrop-blur-md`
**Show when:** `phase === 'playing'`

**Header:**
- Icon: `MessageSquare` `h-3 w-3` `text-indigo-400`
- Label: `"Emotes (Keys 1-5)"`, classes `text-[10px] font-mono uppercase tracking-wider text-slate-400`

| Button Label | Socket Message | Key |
|---|---|---|
| `"GG! 🏆"` | `"GG! 🏆"` | `1` |
| `"Target! 🎯"` | `"Target Spot! 🎯"` | `2` |
| `"Flee! 🏃💨"` | `"Fleeing! 🏃💨"` | `3` |
| `"Ripped! 💪"` | `"Get Ripped! 💪"` | `4` |
| `"Extracting! ⚡"` | `"Extracting soon! ⚡"` | `5` |

**Button styling:** `rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[10px] font-medium text-slate-300 hover:bg-slate-800`
**Note:** Button labels are shortened versions of the actual socket messages (e.g., `"Target! 🎯"` sends `"Target Spot! 🎯"`).

---

### 5.14 MINIMAP (canvas-drawn, bottom-right)

**Position:** Canvas-drawn at `(cssW - 96 - 12, cssH - 96 - 12)`
**Show when:** `minimapVisibleRef.current === true` (auto-hidden in offline mode)
- **Size:** 96×96 px
- **Margin:** 12px from edges
- **Range:** 1800 (only nearby snakes visible)
- **Renders:** Arena boundary, snake dots, player dot
- **Function:** `drawMinimap()` from `render-helpers.ts`

---

### 5.15 VIRTUAL JOYSTICK (canvas-drawn, bottom-left quadrant)

**Position:** Wherever touch begins in bottom-left quadrant (`x < width/2, y > height/2`)
**Show when:** Active touch detected in quadrant
- **Outer ring:** Radius `JOYSTICK_MAX_RADIUS_PX` (70px)
  - Fill: `rgba(129, 140, 248, 0.12)` (indigo-400 alpha)
  - Stroke: `rgba(129, 140, 248, 0.5)`, lineWidth `2`
- **Inner stick:** Radius 24px
  - Fill: `rgba(129, 140, 248, 0.85)` (indigo-400 opaque)

---

### 5.16 CANVAS BACKGROUND

- **Fill color:** `#020617` (Deep Slate / slate-950)
- **DPR capping:** `Math.min(window.devicePixelRatio || 1, 2)`

---

## 6. END OVERLAY (EndOverlay sub-component)

**Position:** `absolute inset-0 z-50 flex items-center justify-center`
**Overlay:** `bg-slate-950/80 backdrop-blur-md`
**Dialog attributes:** `role="dialog"`, `aria-modal="true"`
**Aria-label:** `"Extraction successful"` / `"You died"`
**Panel:** `w-[min(94vw,520px)] rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl`

### 6.1 Top Accent Bar
- **Extract:** `h-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-t-2xl`
- **Death:** `h-1.5 bg-red-600 rounded-t-2xl`

### 6.2 Icon
- **Extract:** `Compass` `h-9 w-9 text-yellow-400`
  - Conditionally animated: `animate-spin` with `animationDuration: '6s'` (except when title = "Practice Run Completed!")
  - Container: `border-yellow-500/20 bg-yellow-500/10`
- **Death:** `Skull` `h-9 w-9 text-red-500`
  - Container: `border-red-500/20 bg-red-500/10`
- Container: `mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border`

### 6.3 Title (centered)
- **Extract (offline):** `"Practice Run Completed!"`
- **Extract (online, chips > 0):** `"Extraction Completed!"`
- **Extract (online, no chips):** `"Secure Extraction!"`
- **Death:** `"Arena Disintegration!"`
- Styling: `text-center text-2xl font-bold text-white`

### 6.4 Subtitle

#### Extract subtitle (online, chips > 0):
`"Tactical extraction successful! You secured {carriedChips} star chips, eliminated {kills} rivals, reached a max size of {snakeLength}, and survived for {mins}m {secs}s."`
#### Extract subtitle (online, no chips):
`"Tactical extraction successful! You exited safely after surviving for {mins}m {secs}s, eliminating {kills} rivals, with a final snake size of {snakeLength}."`
#### Extract subtitle (offline):
`"Practice run finished! You eliminated {kills} training bots, reached a max size of {snakeLength}, and survived for {mins}m {secs}s."`
#### Death subtitle (offline):
`"Offline Training — No chips lost."`
#### Death subtitle (online):
`"Your snake head collided with a rival. All unbanked carried chips were lost in-match."`

All subtitles: `mt-1 text-center text-xs text-slate-400`

### 6.5 Death Stats Panel (death, online)
**Container:** `mt-4 rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs font-mono`

| Label | Value |
|---|---|
| `"Stakes Buy-In Cost:"` | `"-{buyIn} chips"` (`text-red-400`) |
| `"Match Carried Value Forfeited:"` | `"-{carriedChips} c"` (`text-slate-500`) |
| `"Opponents Eliminated:"` | `"{kills} Kills"` (`text-white`) |

### 6.6 Death Stats Panel (death, offline)
**Container:** Same styling as above

| Label | Value |
|---|---|
| `"Opponents Eliminated:"` | `"{kills} Kills"` (`text-white`) |

### 6.7 Killer Card (death, when killer exists)
**Container:** `mt-3 rounded-lg border border-rose-900/50 bg-slate-900/60 p-3`

**Header:**
- Icon: `Skull` `h-3 w-3`
- Label: `"Collided With / Eliminated By"`
- Styling: `text-[10px] uppercase tracking-wider text-rose-400 font-mono`

**Tag badge** (when `killer.tag` exists):
- Text: `{killer.tag}`
- Styling: `rounded bg-slate-900 px-1.5 py-0.5 text-[10px] font-mono text-slate-400`

**Killer avatar + info:**
- **Avatar:** Circle `h-8 w-8 rounded-full text-xs font-bold text-white`
  - Background: `killer.color ?? '#f43f5e'`
  - Text: `killer.name.substring(0, 2).toUpperCase()` (first 2 chars) or `'??'`
- **Name:** `{killer.name}`, `text-xs font-bold text-white`
- **Type label:**
  - Real player (`killer.isBot === false`): `"Online Rival Player"`, `text-[10px] text-slate-400`
  - Bot: `"Arena AI Combatant"`, `text-[10px] text-slate-400`

**Social buttons** (only for real players, `killer.isBot === false`):
- **View Profile:** `User` icon + `"View Profile"`, `bg-slate-700 px-2.5 py-1 text-[11px] font-bold text-white`
- **Add Rival:** `Swords` icon + `"Add Rival"`, `bg-rose-600 px-2.5 py-1 text-[11px] font-bold text-white`
- **Add Friend:** `UserPlus` icon + `"Add Friend"`, `bg-slate-800 px-2.5 py-1 text-[11px] font-bold text-white`

### 6.8 Replay Viewer (death only)
**Show when:** `hasReplay && !showReplay`
- **Button text:** `"📺 Watch Death Replay"`
- **Styling:** `mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 py-2.5 text-xs font-bold text-indigo-300 hover:bg-indigo-500/20`
- **Minimum frames to show:** `replayFrames.length > 10`

**When replay is shown:**
- Online mode: uses `OnlineReplayPlayer` component
- Offline mode: uses embedded `ReplayPlayer` component
- **Hide button (online):** `"Hide Replay"`, `mt-2 flex w-full items-center justify-center gap-1 rounded-md bg-slate-800 py-1.5 text-[10px] font-bold text-slate-300`

### 6.9 Extract Performance Stats (3-column grid)
**Container:** `mt-4 grid grid-cols-3 gap-2 text-center`

| Column | Header | Value Styling |
|---|---|---|
| Kills | `"Kills"` (`text-[10px] uppercase text-slate-500`) | `{kills}` (`text-lg font-bold text-rose-400`) |
| Max Length | `"Max Length"` (`text-[10px] uppercase text-slate-500`) | `{snakeLength}` (`text-lg font-bold text-indigo-400`) |
| Survival Time | `"Survival Time"` (`text-[10px] uppercase text-slate-500`) | `{M:SS}` (`text-lg font-bold text-sky-400`) |

All containers: `rounded-md border border-slate-800 bg-slate-900/60 p-2`

### 6.10 Online Extract Results Table
**Container:** `mt-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs font-mono`

| Label | Value |
|---|---|
| `"Carried Value:"` | `"{carriedChips} chips"` (`text-white`) |
| `"System Commission (X%)"` / `"System Commission (0% — Low Density)"` | `"-{commission} chips"` (`text-yellow-500`) |
| `"BANKED TO ACCOUNT:"` (bold) | `"+{bankedAmount} c"` (`text-emerald-400 font-bold`) |

Commission label logic: When `commission > 0`, appends `({percentage}%)`; when `commission === 0`, appends `(0% — Low Density)`.

### 6.11 Offline Extract Results
**Container:** `mt-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-center`
- **Header:** `"Offline Training Complete"`, `text-xs font-mono uppercase tracking-wider text-amber-400/95`
- **Subtext:** `"No buy-in or banking fees. Great job sharpening your skills and maneuvers!"`, `text-[11px] text-slate-400`

### 6.12 Final Banked + Level (when `result` exists)
**Container:** `mt-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs font-mono`

| Label | Value |
|---|---|
| `"Total Banked:"` | `"{finalBankedChips}c"` (`text-amber-300 font-semibold`) |
| `"Level:"` | `"{result.newLevel}"` (`text-white font-semibold`) + optional badge |

**Level Up Badge** (when `leveledUp === true`):
- Text: `"↑ Level Up!"`, `ml-1 rounded bg-emerald-500/20 px-1 text-emerald-300`

### 6.13 Pending Tally
- **Text:** `"Final tally pending from server…"`
- Styling: `mt-3 text-center text-xs text-slate-400`
- **Show when:** `!result`

### 6.14 Action Buttons

| Button | ID | Label | Gradient/Style |
|---|---|---|---|
| Play Again (extract) | `btn-success-play-again` | `Compass icon + "PLAY AGAIN"` | `bg-gradient-to-r from-emerald-500 to-teal-500` |
| Play Again (death) | `btn-defeat-play-again` | `Compass icon + "PLAY AGAIN"` | `bg-gradient-to-r from-red-600 to-rose-600` |
| Watch Video | (none) | `"📺 Watch Video (Get +50 Chips)"` | `border border-amber-500/40 bg-amber-500/10 text-amber-300` |
| Exit (extract, online) | `btn-success-close` | `"SECURE CHIPS & RETURN TO LOBBY"` | `bg-slate-800 text-slate-200` |
| Exit (extract, offline) | `btn-success-close` | `"RETURN TO LOBBY"` | `bg-slate-800 text-slate-200` |
| Exit (death) | `btn-defeat-close` | `"RETURN TO LOBBY"` | `bg-slate-800 text-slate-200` |

All buttons: `mt-5 flex flex-col gap-2`, `flex w-full items-center justify-center gap-2 rounded-xl`, Play Again = `py-3 text-sm font-bold text-white shadow-lg active:scale-[0.98]`, others = `py-2.5 text-xs font-bold`

### 6.15 ESC Hint
- **Text:** `"Press ESC to exit"`
- Styling: `mt-3 text-center text-[10px] text-slate-500`

---

## 7. REPLAY PLAYER (ReplayPlayer sub-component)

### 7.1 Canvas Watermarks (drawn on canvas)
- **Replay indicator:** `"⏺ REPLAY"`, `bold 12px monospace`, `rgba(244, 63, 94, 0.8)`, left-aligned at `(10, 10)`
- **Pre-death frame info:** `"Frame {N}/{total} | -{X}s to death"`, `10px monospace`, `rgba(226, 232, 240, 0.6)`
- **Post-death frame info:** `"⛔ DEATH +{X}s | Frame {N}/{total}"`, `10px monospace`, `rgba(244, 63, 94, 0.9)`

### 7.2 Progress Bar
- **Track:** `h-1.5 bg-slate-800`
- **Fill:** `bg-rose-500`, `transition-all duration-75`, `width: {progress}%`
- **Death marker:** Vertical line `h-full w-0.5 bg-yellow-400` at `{deathProgress}%`, tooltip: `"💀 Death"`

### 7.3 Controls (bottom-center)
| Control | Icon | Styling | Action |
|---|---|---|---|
| Restart | `RotateCcw` `h-3.5 w-3.5` | `h-8 w-8 bg-slate-900/80 text-white` | `restart()` |
| Play/Pause | `Pause`/`Play` `h-4 w-4` | `h-9 w-9 bg-rose-600 text-white` | `togglePlay()` |
| Speed | `"{N}x"` text | `h-8 bg-slate-900/80 px-2.5 text-white text-xs font-mono font-bold` | `cycleSpeed()` |
| Zoom Out | `ZoomOut` `h-3.5 w-3.5` | `h-8 w-8 bg-slate-900/80 text-white` | `adjustZoom(-0.15)` |
| Zoom % | `"{N}%"` | `text-[10px] text-slate-400 font-mono w-8 text-center` | Display only |
| Zoom In | `ZoomIn` `h-3.5 w-3.5` | `h-8 w-8 bg-slate-900/80 text-white` | `adjustZoom(0.15)` |

**Speed values:** `0.25x`, `0.5x`, `1x`, `2x` (cycles)
**Zoom display:** `{Math.round(zoom * 100)}%` (e.g., `"80%"`)
**Container:** `absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2`

### 7.4 Replay Camera Behavior
- **Pre-death:** Follows player's snake head
- **At death:** Centers on midpoint of body (where food drops)
- **Post-death:** Stays at death position + slow zoom out (rate 0.0003/frame), OR follows entity that collected death food (closest snake to collected food within 300px radius)

---

## 8. CHAT DIALOG

**Component:** `Dialog` with `showCloseButton`
**Position:** Center modal
**Width:** `sm:max-w-md`

- **Title:** `"Send a message"` (`DialogTitle`)
- **Input:**
  - Placeholder: `"Type a message…"`
  - Max length: `200`
  - Auto focus: `true`
  - On Enter key: submit
- **Send button:** `Send` icon + `"Send"`, disabled when input is empty
- **Cancel button:** `"Cancel"`, variant `outline`

---

## 9. ALL TOAST MESSAGES

| Trigger | Title | Description | Variant |
|---|---|---|---|
| Connected (online) | `"Connected"` | `"Connected to real-time multiplayer shard!"` | default |
| Connected (offline) | `"Practice Mode"` | `"Offline training arena loaded."` | default |
| Join error (any) | `"Cannot join arena"` | (reason-specific messages, see §7.1) | `destructive` |
| Extract failed | `"Extraction failed"` | `"You moved or took damage."` or `data?.reason` | `destructive` |
| Steering detected | `"⚠ Steering Detected"` | `"Extraction progress restarted! Keep moving straight."` | `destructive` |
| Eliminated (online) | `"Eliminated"` | `"ELIMINATED: You collided with {killerName}! 💀"` (fallback: `"another player"`) | `destructive` |
| Crashed (offline) | `"Crashed"` | `"CRASH! (Offline Practice Mode - No chips lost!)"` | default |
| Kicked | `"Kicked"` | `data?.reason` or `"You were removed by an admin."` | `destructive` |
| Server shutdown | `"Server restarting"` | `"The game server is going down for maintenance."` | `destructive` |
| Server error | `"Server error"` | `data?.message` or `"An error occurred."` | `destructive` |
| Level up | `"Level Up!"` | `"LEVEL UP! You reached Level {newLevel}!"` | default |
| Rival added | `"Rival Added"` | `"⚔️ {killer.name} added to your Rival List! Hunt them in future lobbies!"` | default |
| Friend added | `"Friend Added"` | `"🤝 Added {killer.name} ({killer.tag}) to your Friends list!"` | default |
| View profile | `"Viewing Profile"` | `"👁️ Viewing {killer.name}'s profile ({killer.tag})"` | default |
| Mention in chat | `"{senderName} mentioned you"` | `data.message.slice(0, 120)` | default |

### 9.1 Join Error Reason Messages
| Reason Key | Message |
|---|---|
| `insufficient_chips` | `"Not enough chips to enter this arena."` |
| `banned` | `"Your account has been banned."` |
| `invalid_arena` | `"This arena does not exist."` |
| `already_in_match` | `"You are already in a match."` |
| (fallback) | `"Could not join arena."` |

---

## 10. ALL EMOTE TEXTS (full socket messages vs button labels)

| Key | Button Label (UI) | Socket Message (sent) |
|---|---|---|
| `1` | `"GG! 🏆"` | `"GG! 🏆"` |
| `2` | `"Target! 🎯"` | `"Target Spot! 🎯"` |
| `3` | `"Flee! 🏃💨"` | `"Fleeing! 🏃💨"` |
| `4` | `"Ripped! 💪"` | `"Get Ripped! 💪"` |
| `5` | `"Extracting! ⚡"` | `"Extracting soon! ⚡"` |

---

## 11. SOUND EFFECT TRIGGERS

| Function | Trigger Condition |
|---|---|
| `initGameAudio()` | On first socket `connect` |
| `setGameAudioMuted()` | Imported but not directly called in this file |
| `playExtractStart()` | Server emits `extract_start` |
| `playExtractSuccess()` | Server emits `match_result` with `outcome === 'extract'` |
| `playExtractRestart()` | Server emits `extract_cancelled_by_steer` |
| `playFoodCollect('star')` | Star chip collected (`carriedChips` increases, online only) |
| `playFoodCollect('large')` | Score gain ≥ 5 (not star) |
| `playFoodCollect('medium')` | Score gain ≥ 3 but < 5 |
| `playFoodCollect('small')` | Score gain < 3 |
| `playBoost()` | Snake transitions from not boosting to boosting (`isBoosting && !wasBoosting`) |
| `playDeath()` | Death with a killer (`data.killerName` exists) |
| `playWallHit()` | Death without a killer (wall collision) |
| `playKill()` | Kill feed event where `killerIsBot === false` |

---

## 12. SOCKET.IO EVENTS (all 16)

### Client → Server:
| Event | Payload |
|---|---|
| `join_arena` | `{ arenaId: string }` |
| `leave` | `{}` |
| `input` | `{ angle: number, wantsBoost: boolean }` |
| `ping` | `{ t: number, id: string }` |
| `extract` | `{}` |
| `cancel_extract` | `{}` |
| `chat` | `{ message: string }` |

### Server → Client:
| Event | Payload Type | Handler |
|---|---|---|
| `connect` | — | Reset reconnecting, emit join, init audio, reset ping clock |
| `disconnect` | — | Set reconnecting, clear keys |
| `connect_error` | `Error` | Set reconnecting + error message |
| `reconnect_attempt` | `number` (attempt) | Update connecting msg |
| `joined` | `JoinedPayload` | Set phase to playing, reset HUD, show toast |
| `join_error` | `JoinErrorPayload` | Show error toast, auto-exit |
| `snapshot` | `GameSnapshot` | Update snapshot ref, HUD, replay buffer, kill detection, leaderboard |
| `match_result` | `MatchResultPayload` | Set phase to ended, play sound, show end screen |
| `extract_start` | `ExtractStartPayload` | Set extracting flag, play sound |
| `extract_progress` | `ExtractProgressPayload` | Update progress 0..1 |
| `extract_fail` | `ExtractFailPayload` | Clear extraction, show toast |
| `extract_cancelled_by_steer` | — | Play restart sound, show toast |
| `kill_feed` | `{ victimName, victimIsBot, killerName, killerIsBot, cause }` | Add to feed (max 8), auto-remove 5s |
| `death` | `DeathPayload` | Play death/wall sound, show vignette, prepare end screen |
| `chat` | `ChatPayload` | Check for mentions, show toast |
| `kicked` | `KickedPayload` | Show toast, auto-exit |
| `server_shutdown` | — | Show toast, auto-exit |
| `error` | `ServerErrorPayload` | Show toast |
| `pong` | `PongPayload` | Calculate RTT, update ping state |

---

## 13. KEYBOARD CONTROLS

| Key | Action |
|---|---|
| `W` / `ArrowUp` | Steer up |
| `S` / `ArrowDown` | Steer down |
| `A` / `ArrowLeft` | Steer left |
| `D` / `ArrowRight` | Steer right |
| `Space` | Boost (hold) |
| `E` (hold) | Extract |
| `E` (release) | Cancel extract |
| `M` | Toggle full-screen arena map |
| `Escape` | Exit (when `phase === 'ended'`) |
| `1`–`5` | Send quick emote |
| `Enter` | Submit chat (when dialog open) |
| Arrow keys + Space | `preventDefault()` to prevent page scroll |
| (blur) | Clear all stuck keys |

---

## 14. COLOR REFERENCES (Tailwind Classes)

### Background / Surface Colors
| Class | Context |
|---|---|
| `bg-background` / `bg-background/80` | Main canvas wrapper, connecting overlay |
| `bg-slate-950/80` | Most HUD card backgrounds |
| `bg-slate-950/90` | Leaderboard, emotes bar |
| `bg-slate-950` | End overlay panel, replay container |
| `bg-slate-900` | End screen stat panels, replay controls |
| `bg-slate-900/60` | End screen stat rows |
| `bg-slate-900/80` | Replay controls, killer tag badge |
| `bg-card/80` | Chat/minimap buttons |

### Border Colors
| Class | Context |
|---|---|
| `border-emerald-500/30` | Carried Chips card |
| `border-amber-500/30` | Stars Earned, Banked Chips |
| `border-yellow-500/30` | Stars in Arena |
| `border-slate-700/60` | Rank/score card, competitors card, FPS/ping |
| `border-slate-800` | Emotes bar, leaderboard container, replay |
| `border-slate-700` | Leave button, collapsed leaderboard, full-map close |
| `border-amber-500/40` | Reconnecting banner, Watch Video button |
| `border-rose-900/50` | Killer card |
| `border-indigo-500/30` | Replay button, leaderboard self-entry |
| `border-primary/40` | Chat/minimap toggle buttons |

### Text Colors
| Class | Context |
|---|---|
| `text-foreground` | Connection error text |
| `text-muted-foreground` | Connecting msg, unknown ping |
| `text-slate-500` | HUD labels, leaderboard header, etc. |
| `text-slate-400` | HUD secondary labels, most descriptive text |
| `text-slate-300` | HUD values, competitors, bots |
| `text-slate-200` | Kill feed player names, reconnecting banner kbd |
| `text-white` | Score value, end overlay titles/buttons |
| `text-emerald-400` | Carried chips value, leaderboard chip values, extract success |
| `text-emerald-300` | Leaderboard self-name, YOUR badge (offline) |
| `text-emerald-200` | YOUR badge (offline) |
| `text-amber-400` | Stars Earned, boost label, active competitors (offline), KillFeed human victim |
| `text-amber-300` | Banked chips value, Stars in Arena, Watch Video button, FPS badge, final banked |
| `text-amber-500` | LQ badge background, extracting popup |
| `text-yellow-400` | Rank value, Trophy icon, leaderboard rank, end extract icon, replay death marker |
| `text-yellow-500` | Extraction fee, commission value, Compass icon in header |
| `text-yellow-300` | Stars in Arena value |
| `text-indigo-400` | Score icon, real players count, emotes header, leaderboard self-value (offline) |
| `text-indigo-300` | Leaderboard self-name (online), replay button |
| `text-indigo-200` | YOUR badge (online) |
| `text-rose-400` | Kills value, kill feed wall text |
| `text-rose-500` | Kills icon, AlertTriangle, Skull death icon |
| `text-rose-600` | Death accent bar, Play/Pause button, Add Rival button |
| `text-orange-400` | Kill feed bot names (victims/killers) |
| `text-red-400` | Kill feed eliminated victim (player) |
| `text-sky-400` | Survival time value |

### Canvas Colors (raw CSS values)
| Value | Context |
|---|---|
| `#020617` | Canvas background fill (Deep Slate) |
| `#1e293b` | Replay grid lines |
| `rgba(129, 140, 248, 0.12)` | Joystick outer ring fill (indigo-400) |
| `rgba(129, 140, 248, 0.5)` | Joystick outer ring stroke (indigo-400) |
| `rgba(129, 140, 248, 0.85)` | Joystick inner stick fill (indigo-400) |
| `rgba(220, 38, 38, 0.6)` | Death vignette outer (red-600) |
| `rgba(244, 63, 94, 0.8)` | Replay watermark "⏺ REPLAY" (rose-500) |
| `rgba(244, 63, 94, 0.9)` | Replay post-death frame info (rose-500) |
| `rgba(226, 232, 240, 0.6)` | Replay pre-death frame info (slate-200) |
| `#f43f5e` | Killer avatar default color (rose-500) |

---

## 15. REPLAY BUFFER SYSTEM

- **Pre-death buffer:** Circular, `REPLAY_PRE_MAX = 300` frames (15s at 20Hz server tick rate)
- **Post-death buffer:** Linear, `REPLAY_POST_MAX = 300` frames (15s)
- **Skip condition:** Frames before player snake exists are not recorded (`hasStartedRecordingRef`)
- **Combined replay:** `[...preFrames, ...postFrames]` — pre frames are time-ordered (oldest → newest), post frames appended linearly
- **Death frame index:** `preFrames.length` — marks the exact frame where death occurred in the combined array

---

## 16. CONNECTING MESSAGE STATES

| State | Text |
|---|---|
| Initial | `"Authenticating…"` |
| On `reconnect_attempt` | `"Reconnecting (attempt N)…"` (N = attempt number) |
| On `joined` (online) | `""` (cleared) |
| On `joined` (offline) | `""` (cleared) |
| On connection error | `""` (cleared, replaced by `connectionError`) |
| On join error | `""` (cleared, replaced by `connectionError`) |
| On play again | `"Rejoining arena…"` |

---

## 17. CONDITIONAL DISPLAY DIFFERENCES (Online vs Offline)

| Element | Online | Offline |
|---|---|---|
| Carried Chips card | Visible | Hidden |
| Stars Earned card | Visible (when chips > buyIn) | Hidden |
| Stars in Arena card | Visible (when stars > 0) | Hidden |
| Extracting fee display | `"FEE: X%"` or `"FEE: 0% (LOW POPULATION)"` | Hidden |
| Hold-to-extract idle text | `"HOLD TO EXTRACT SUCCESSFUL!"` | `"HOLD TO LEAVE PRACTICE ARENA"` |
| Competitors card | `"Real Players: N Active"` | `"Offline Mode: 1 Player"` |
| Leaderboard value | `carriedChips.toLocaleString() + "c"` | `score.toLocaleString()` |
| Leaderboard YOU badge color | `bg-indigo-500/30 text-indigo-200` | `bg-emerald-500/30 text-emerald-200` |
| End overlay extract title | `"Extraction Completed!"` or `"Secure Extraction!"` | `"Practice Run Completed!"` |
| End overlay death subtitle | `"Your snake head collided..."` | `"Offline Training — No chips lost."` |
| Death stats panel | Shows buy-in + forfeited + kills | Shows kills only |
| Extract results table | Shows carried + commission + banked | Shows offline training text |
| Extract close button | `"SECURE CHIPS & RETURN TO LOBBY"` | `"RETURN TO LOBBY"` |
| Minimap | Visible (toggleable) | Hidden (auto-disabled) |
| Full-screen map | Visible (M key toggle) | N/A (engine doesn't reach canvas code) |
| Death toast | `"Eliminated"` + killer name | `"Crashed"` + no chips lost |
| Star chip sound | `playFoodCollect('star')` | Skipped |
| Replay player | `OnlineReplayPlayer` | `ReplayPlayer` (embedded) |
| Compass animation | `animate-spin` (6s) | No spin |
| Extraction exit button ID | `btn-success-close` | `btn-success-close` |
| Practice extraction text | — | `"HOLD TO LEAVE PRACTICE ARENA"` |
| Chip labels above heads | Drawn for real players | N/A |
| Extraction progress rings | Drawn for extracting self | N/A |

---

## 18. OFFLINE MODE (BUILD-14)

**Condition:** `arena.isPractice === true` (arena IDs starting with `practice-`)

**Behavior:**
- No Socket.IO connection — the `OfflineGameEngine` (from `./offline-engine.ts`) owns the entire game loop
- Canvas rendered by React, but all overlays (HUD, death screen, extract screen) are DOM nodes appended by the engine
- No minimap, no chips, no leaderboard, no chat, no kill feed, no full map
- Audio: No star chip sounds
- The `playAgain` flow resets state and re-emits `join_arena` for online; for offline the engine handles restart
- Score is body-length based (same as online)
- On exit: `onExit(result)` where `chipsExtracted: 0`, `commission: 0`, `xpGained: 0`

---

## 19. INPUT PRIORITY

1. **Touch joystick** (highest — overrides keyboard/mouse)
2. **Keyboard** (WASD / arrows)
3. **Mouse** (position relative to canvas center)

**Boost conditions** (any of):
- SPACE key held
- Mobile BOOST button held (`boostHoldRef`)
- Touch joystick magnitude > 0.6 (`JOYSTICK_BOOST_MAGNITUDE`)
- Left mouse button held

---

## 20. SOCKET.IO CONFIGURATION

| Parameter | Value |
|---|---|
| Transports | `['websocket']` only |
| Query | `{ XTransformPort: 3001 }` |
| Auth | `{ token: string }` (JWT from `/api/auth/token`) |
| Reconnection | `true` |
| Max attempts | `Infinity` |
| Initial delay | `1000` ms |
| Max delay | `5000` ms |
| Timeout | `10000` ms |
| Auth endpoint | `GET /api/auth/token` (cache: no-store) |

---

## 21. END SCREEN KILLER AVATAR FALLBACK

- When `killer.name` exists: First 2 characters, uppercased, e.g. `"JO"` from `"John"`
- When `killer.name` is empty/null: `"??"`
- Background: `killer.color ?? '#f43f5e'`

---

## 22. CANVAS ARIA LABELS

| Context | Aria-label |
|---|---|
| Online canvas | `"Venom Arena game canvas"` |
| Offline canvas | `"Venom Arena offline practice canvas"` |
| Both | `style={{ touchAction: 'none' }}` |
