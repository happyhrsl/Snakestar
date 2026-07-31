# 06 — Game Server Exhaustive Catalog

> Source files: `mini-services/game-server/index.ts` (1063 lines), `game-state.ts` (1215 lines), `spatial-grid.ts` (111 lines). Plus referenced: `src/lib/game-config.ts`, `src/lib/snake-engine.ts`, `src/lib/types.ts`.
> **Everything below is transcribed verbatim from code. Nothing invented.**

---

## 1. Server Architecture & Networking

### 1.1 Process & Port
| Field | Value | Source |
|---|---|---|
| Default port | `3001` (env `PORT`) | `index.ts:71` |
| Internal secret | `venom-arena-internal-dev` (env `INTERNAL_SECRET`) | `index.ts:72` |
| Next app URL | `http://localhost:3000` (env `NEXT_APP_URL`) | `index.ts:73` |
| CORS origin | `*` | `index.ts:215` |
| CORS methods | `['GET', 'POST']` | `index.ts:215` |
| Socket.IO path | `'/'` | `index.ts:214` |
| Ping timeout | `60000` ms | `index.ts:216` |
| Ping interval | `25000` ms | `index.ts:217` |
| Gateway | Caddy via `io("/?XTransformPort=3001")` | [CODE COMMENT] `index.ts:5` |

### 1.2 Loop Architecture
| Loop | Rate | Mechanism | Source |
|---|---|---|---|
| Game tick | `TICK_MS` = `1000/30` ≈ 33.33ms (30 Hz) | Recursive `setTimeout(tickOnce, TICK_MS)` | `index.ts:620` |
| Broadcast | `BROADCAST_MS` = `1000/20` = 50ms (20 Hz) | Recursive `setTimeout(broadcastOnce, BROADCAST_MS)` | `index.ts:75,656` |
| Heartbeat log | Every `15000` ms | Recursive `setTimeout(heartbeat, 15000)` | `index.ts:1032-1035` |

[CODE COMMENT] `index.ts:20-21`: "Recursive setTimeout (not setInterval) for both tick and broadcast loops — a slow tick can't overlap the next."
[CODE COMMENT] `index.ts:22`: "Every tick is wrapped in try/catch; one bad snake never kills the loop."
[CODE COMMENT] `index.ts:609`: "Skip empty rooms (no players) for CPU savings — bots stay idle."

### 1.3 HTTP Endpoints (Server-Level)
| Method | Path | Purpose | Source |
|---|---|---|---|
| GET | `/stats` | Returns `{ [roomKey]: { players, maxPlayers } }` | `index.ts:201-210` |

### 1.4 Server-to-Server HTTP Calls
All use 3-second timeout (`AbortController`) and `x-internal-secret` header.

| Endpoint | Purpose | Source |
|---|---|---|
| `POST /api/match/verify` | Validate JWT, fetch `PlayerIdentity` | `index.ts:126-140` |
| `POST /api/match/join` | Atomically deduct buyIn | `index.ts:142-157` |
| `POST /api/match/result` | Credit/debit player's account | `index.ts:171-193` |

**HTTP timeout:** `3000` ms (`index.ts:80`)

### 1.5 Process Signal Handling
| Signal | Behavior | Source |
|---|---|---|
| `SIGINT` | Broadcast `server_shutdown`, exit after 400ms (hard fallback 2000ms) | `index.ts:998-1009,1011` |
| `SIGTERM` | Same as SIGINT | `index.ts:1012` |
| `SIGHUP` | Ignored, logged as warning | `index.ts:1014-1016` |
| `SIGPIPE` | Ignored, logged as warning | `index.ts:1018-1020` |
| `uncaughtException` | Logged to stderr, not fatal | `index.ts:989-991` |
| `unhandledRejection` | Logged to stderr, not fatal | `index.ts:993-996` |
| `beforeExit` | Logged as warning | `index.ts:1024-1026` |
| `exit` | Logged as warning | `index.ts:1027-1029` |

[CODE COMMENT] `index.ts:986`: "Process-level guards (the OLD server had none → one bad write killed it)"

### 1.6 Boot Sequence
1. Log CORS warning (`index.ts:1046`)
2. Log `NEXT_APP_URL` and `PORT` (`index.ts:1047`)
3. Pre-create all arena rooms from `ARENA_TIERS` (`index.ts:1050-1052`)
4. Log pre-created room count (`index.ts:1053`)
5. Start tick loop (`index.ts:1056`)
6. Start broadcast loop (`index.ts:1057`)
7. Start heartbeat (`index.ts:1058`)
8. Listen on PORT (`index.ts:1060-1062`)

---

## 2. Socket.IO Events

### 2.1 Client → Server Events

#### `join_arena`
| Field | Type | Required | Source |
|---|---|---|---|
| `arenaId` | string | Yes | `index.ts:766` |

#### `input`
| Field | Type | Required | Source |
|---|---|---|---|
| `angle` | number (finite) | Yes | `index.ts:867,870` |
| `wantsBoost` | boolean | Yes | `index.ts:868,871` |

- Angle is normalized to `[0, 2π)` on receipt (`index.ts:873-876`)
- Rate-limited: max `MAX_SNAPSHOTS_PER_SECOND` (20) per second; interval minimum `INPUT_MIN_INTERVAL_MS` = 50ms (`index.ts:77,880-881`)
- Flood counter logged every 20 drops (`index.ts:883-885`)

#### `extract`
No payload. Starts extraction (`index.ts:718-720`).

#### `cancel_extract`
No payload. Cancels extraction (`index.ts:723-725`).

#### `chat`
| Field | Type | Required | Source |
|---|---|---|---|
| `message` | string | Yes | `index.ts:937-938` |

- Trimmed and sliced to `CHAT_MAX_LEN` = `80` chars (`index.ts:939`)
- Rate-limited: `CHAT_MIN_INTERVAL_MS` = `2000` ms (`index.ts:78,943`)

#### `leave`
No payload. Removes player, drops carried chips as stars (`index.ts:733-735`).

#### `disconnect`
Auto-handled by Socket.IO. Reason passed as string. Cleans up `userTagToSocket` mapping (`index.ts:738-746`).

### 2.2 Server → Client Events

#### `joined`
| Field | Type | Source |
|---|---|---|
| `arenaId` | string | `index.ts:852` |
| `worldSize` | number (8000) | `index.ts:853` |
| `yourId` | string (socket.id) | `index.ts:854` |

#### `join_error`
| Field | Type | Source |
|---|---|---|
| `reason` | string: `'invalid_arena'` \| `'already_in_match'` \| `'insufficient_chips'` \| `'banned'` | `index.ts:763,769,775,792,795,801` |

#### `kicked`
| Field | Type | Source |
|---|---|---|
| `reason` | string | `index.ts:700,798` |

#### `death`
| Field | Type | Source |
|---|---|---|
| `killerId` | string? | `index.ts:363` |
| `killerName` | string? | `index.ts:364` |
| `killerTag` | string? | `index.ts:365` |
| `killerColor` | string? | `index.ts:366` |
| `killerIsBot` | boolean (default `true`) | `index.ts:367` |

Emitted BEFORE `match_result` so client's `onDeath` handler runs first (`index.ts:357-360`).

#### `match_result`
| Field | Type | Source |
|---|---|---|
| `outcome` | `'extract'` \| `'death'` | `index.ts:285` |
| `arenaId` | string | `index.ts:286` |
| `arenaName` | string | `index.ts:287` |
| `chipsExtracted` | number (0 on death) | `index.ts:288,344` |
| `commission` | number | `index.ts:289` |
| `bankedAmount` | number | `index.ts:290` |
| `kills` | number | `index.ts:291` |
| `score` | number | `index.ts:292` |
| `xpGained` | number | `index.ts:293` |
| `newLevel` | number | `index.ts:294` |
| `newBankedChips` | number | `index.ts:295` |
| `durationSeconds` | number | `index.ts:296` |

#### `snapshot`
Full `GameSnapshot` object (see §6). Emitted per-player at 20 Hz (`index.ts:650`).

#### `extract_progress`
| Field | Type | Source |
|---|---|---|
| `progress` | number (0..1) | `index.ts:582` |

#### `extract_start`
| Field | Type | Source |
|---|---|---|
| `durationMs` | number (from `cfg.extractionDurationMs`, default 3000) | `index.ts:920` |

#### `extract_cancelled_by_steer`
Empty payload `{}`. Emitted when player steers during extraction (`index.ts:902`).

#### `kill_feed`
| Field | Type | Source |
|---|---|---|
| `victimName` | string | `index.ts:532-536` |
| `victimIsBot` | boolean | `index.ts:532-536` |
| `killerName` | string? (null for wall) | `index.ts:532-536` |
| `killerIsBot` | boolean | `index.ts:532-536` |
| `cause` | `'wall'` \| `'body'` \| `'headOn'` | `index.ts:532-536` |

#### `chat`
| Field | Type | Source |
|---|---|---|
| `senderId` | string | `index.ts:952` |
| `senderName` | string | `index.ts:953` |
| `senderTag` | string | `index.ts:954` |
| `message` | string | `index.ts:955` |

#### `server_shutdown`
Empty payload `{}`. Broadcast to ALL sockets on SIGINT/SIGTERM (`index.ts:1001`).

---

## 3. Authentication & Connection

### 3.1 Auth Middleware
- Socket.IO auth middleware validates JWT via `POST /api/match/verify` (`index.ts:664-680`)
- Token extracted from `socket.handshake.auth.token` (must be non-empty string) (`index.ts:665-667`)
- On failure: socket rejected with error
- On success: `PlayerIdentity` stored in `socket.data.identity`

[CODE COMMENT] `index.ts:8`: "Auth is mandatory — sockets without a valid JWT (verified via POST /api/match/verify) are disconnected at the middleware. No 'auth optional, admit anyway' path."
[CODE COMMENT] `index.ts:11`: "Identity is the verify response only. We never trust any subsequent client-supplied userTag/name/color/skin."

### 3.2 One-Socket-Per-User Rule
- Global `userTagToSocket: Map<string, string>` (`index.ts:223`)
- On connect: if prior socket exists for this userTag, emit `kicked` to it, then disconnect it (`index.ts:696-703`)

[CODE COMMENT] `index.ts:13`: "One socket per userTag — a new connection kicks the prior socket."

### 3.3 `PlayerIdentity` Interface
| Field | Type | Source |
|---|---|---|
| `id` | string | `game-state.ts:57` |
| `userTag` | string | `game-state.ts:58` |
| `name` | string | `game-state.ts:59` |
| `country` | string | `game-state.ts:60` |
| `level` | number | `game-state.ts:61` |
| `bankedChips` | number? | `game-state.ts:62` |
| `currentSkin` | string | `game-state.ts:63` |
| `currentTrail` | string | `game-state.ts:64` |
| `currentDeath` | string | `game-state.ts:65` |
| `currentFlag` | string? | `game-state.ts:66` |
| `color` | string | `game-state.ts:67` |
| `secondaryColor` | string? | `game-state.ts:68` |
| `pattern` | string? | `game-state.ts:69` |
| `unlockedSkins` | string[] | `game-state.ts:70` |
| `clanTag` | string? | `game-state.ts:71` |
| `clanRank` | string? | `game-state.ts:72` |
| `role` | `'player'` \| `'admin'` | `game-state.ts:73` |

---

## 4. Arena Room System

### 4.1 Sharding
- Per-arena rooms lazily created, keyed by arena id (`index.ts:221`)
- Max real players per shard: `MAX_PLAYERS_PER_SHARD` = `1000` (`index.ts:236`)
- Shard key format: `{arenaId}` (shard 0), `{arenaId}#2` (shard 1), `{arenaId}#3`, etc. (`index.ts:250`)
- Max shards: safety cap at 200 (`index.ts:265`)
- All arena tiers pre-created at boot (`index.ts:1050-1052`)

### 4.2 `ArenaRoom` Interface
| Field | Type | Source |
|---|---|---|
| `arena` | `ArenaTier` | `game-state.ts:153` |
| `cfg` | `SnakeConfig` | `game-state.ts:154` |
| `players` | `Map<string, PlayerSession>` | `game-state.ts:155` |
| `bots` | `Map<string, BotSession>` | `game-state.ts:156` |
| `foods` | `Food[]` | `game-state.ts:157` |
| `grid` | `SpatialHashGrid` (cellSize=120) | `game-state.ts:158,292` |
| `tick` | number (monotonic counter) | `game-state.ts:159` |
| `lastBroadcast` | number | `game-state.ts:160` |
| `leaderId` | string? | `game-state.ts:161` |
| `leaderChips` | number | `game-state.ts:162` |
| `foodIdCounter` | number (monotonic) | `game-state.ts:164` |
| `botIdCounter` | number (monotonic) | `game-state.ts:166` |
| `mapCenterX` | number (0) | `game-state.ts:168` |
| `mapCenterY` | number (0) | `game-state.ts:170` |

---

## 5. Server Constants (Defined in index.ts)

| Constant | Value | Source |
|---|---|---|
| `PORT` | `3001` (env override) | `index.ts:71` |
| `BROADCAST_MS` | `1000 / 20` = 50 | `index.ts:75` |
| `MAX_SNAPSHOTS_PER_SECOND` | `20` | `index.ts:76` |
| `INPUT_MIN_INTERVAL_MS` | `1000 / 20` = 50 | `index.ts:77` |
| `CHAT_MIN_INTERVAL_MS` | `2000` | `index.ts:78` |
| `CHAT_MAX_LEN` | `80` | `index.ts:79` |
| `HTTP_TIMEOUT_MS` | `3000` | `index.ts:80` |
| `MAX_PLAYERS_PER_SHARD` | `1000` | `index.ts:236` |

---

## 6. Shared Game Constants (from game-config.ts / snake-engine.ts)

### 6.1 World & Tick
| Constant | Value | Source |
|---|---|---|
| `WORLD_SIZE` | `8000` | `game-config.ts:185` |
| `WORLD_RADIUS` | `4000` | `game-config.ts:186` |
| `TICK_RATE_HZ` | `30` | `game-config.ts:199` |
| `TICK_MS` | `1000 / 30` ≈ 33.33 | `game-config.ts:200` |
| `BROADCAST_RATE_HZ` | `20` | `game-config.ts:201` |
| `MAX_SNAPSHOTS_PER_SECOND` | `20` | `game-config.ts:203` |

### 6.2 Snake Physics (`DEFAULT_SNAKE_CONFIG`)
| Config Key | Value | Source |
|---|---|---|
| `collisionRadius` | `6` px | `snake-engine.ts:116` |
| `visualRadius` | `8` px | `snake-engine.ts:117` |
| `segmentSpacing` | `16` px | `snake-engine.ts:118` |
| `baseSpeed` | `4.5` px/tick | `snake-engine.ts:119` |
| `boostSpeed` | `8.0` px/tick | `snake-engine.ts:120` |
| `turnBase` | `0.35` rad/tick | `snake-engine.ts:121` |
| `turnMin` | `0.08` rad/tick | `snake-engine.ts:122` |
| `turnScoreFactor` | `0.0003` | `snake-engine.ts:123` |
| `initialBodyLength` | `20` segments | `snake-engine.ts:124` |
| `initialSpawnScore` | `20` | `snake-engine.ts:125` |
| `maxSegments` | `200` | `snake-engine.ts:126` |
| `lengthLogFactor` | `20` | `snake-engine.ts:127` |
| `maxExtraRadius` | `3` px | `snake-engine.ts:128` |
| `thicknessLogFactor` | `0.5` | `snake-engine.ts:129` |
| `boostMinLength` | `8` segments | `snake-engine.ts:130` |
| `boostDropInterval` | `10` frames | `snake-engine.ts:131` |
| `hitFactor` | `0.75` | `snake-engine.ts:132` |
| `headOnHitFactor` | `0.8` | `snake-engine.ts:133` |
| `neckAngleThreshold` | `60` degrees | `snake-engine.ts:134` |
| `neckSegmentCount` | `5` | `snake-engine.ts:135` |

### 6.3 Food System
| Config Key | Value | Source |
|---|---|---|
| `foodSmallValue` | `1` | `snake-engine.ts:136` |
| `foodSmallRadius` | `3` px | `snake-engine.ts:137` |
| `foodSmallWeight` | `0.93` (93%) | `snake-engine.ts:138` |
| `foodMediumValue` | `3` | `snake-engine.ts:139` |
| `foodMediumRadius` | `5` px | `snake-engine.ts:140` |
| `foodMediumWeight` | `0.04` (4%) | `snake-engine.ts:141` |
| `foodLargeValue` | `5` | `snake-engine.ts:142` |
| `foodLargeRadius` | `8` px | `snake-engine.ts:143` |
| `foodLargeWeight` | `0.03` (3%) | `snake-engine.ts:144` |
| `foodCountTarget` | `1200` | `snake-engine.ts:145` |
| `starDropCount` | `10` | `snake-engine.ts:146` |

Food orb colors:
| Size | Color | Glow Color | Source |
|---|---|---|---|
| small | `#34d399` | `#10b981` | `snake-engine.ts:542-543` |
| medium | `#38bdf8` | `#0ea5e9` | `snake-engine.ts:549-550` |
| large | `#f472b6` | `#ec4899` | `snake-engine.ts:556-557` |

### 6.4 Extraction
| Config Key | Value | Source |
|---|---|---|
| `extractionDurationMs` | `3000` (3s) | `snake-engine.ts:147` |
| `extractionGlideSpeed` | `3.2` px/tick | `snake-engine.ts:148` |

### 6.5 Spawning
| Config Key | Value | Source |
|---|---|---|
| `spawnSafeDistance` | `500` px | `snake-engine.ts:149` |
| `spawnBoundaryMargin` | `500` px | `snake-engine.ts:150` |
| `spawnSafeAttempts` | `30` | `snake-engine.ts:151` |
| `spawnProtectionMs` | `4000` (4s) | `snake-engine.ts:152` |

### 6.6 Map
| Config Key | Value | Source |
|---|---|---|
| `mapMinRadius` | `3000` px | `snake-engine.ts:153` |
| `mapMaxRadius` | `16000` px | `snake-engine.ts:154` |
| `mapBreathAmplitude` | `40` px | `snake-engine.ts:155` |
| `mapBreathCycleMs` | `10000` (10s) | `snake-engine.ts:156` |

### 6.7 Bots
| Config Key | Value | Source |
|---|---|---|
| `botSelfDestructThreshold` | `100` score | `snake-engine.ts:157` |
| `botEvadeRadius` | `300` px | `snake-engine.ts:158` |
| `botFoodScanRadius` | `300` px | `snake-engine.ts:159` |

### 6.8 Economy
| Config Key | Value | Source |
|---|---|---|
| `commissionThreshold` | `4` real players | `snake-engine.ts:160` |
| `commissionRate` | `0.35` (35%) | `snake-engine.ts:161` |

### 6.9 Game-State-Local Constants
| Constant | Value | Source |
|---|---|---|
| `MAX_TURN_PER_TICK` | `0.22` rad (bot max turn) | `game-state.ts:178` |
| `MAX_SNAPSHOT_POINTS` | `60` (body point downsampling) | `game-state.ts:180` |

---

## 7. Growth & Size Formulas

### 7.1 Body Length
**Formula:** `initialBodyLength + min(maxSegments - initialBodyLength, lengthLogFactor × ln(1 + score))`
**Hard cap:** `maxSegments` (200)

Examples from [CODE COMMENT] `snake-engine.ts:172-179`:
- Score 0: 20 segments
- Score 100: ~31 segments
- Score 1,000: ~38 segments
- Score 10,000: ~46 segments
- Score 100,000: ~53 segments

### 7.2 Visual Radius
**Formula:** `visualRadius + min(maxExtraRadius, thicknessLogFactor × ln(1 + score))`
**Hard cap:** `visualRadius + maxExtraRadius` = 8 + 3 = 11px

Examples from [CODE COMMENT] `snake-engine.ts:192-198`:
- Score 0: 8px
- Score 1,000: ~8.35px
- Score 10,000: ~8.69px
- Score 100,000: ~9.04px

### 7.3 Collision Radius
**Formula:** `collisionRadius + min(1, 0.1 × ln(1 + score))`
- Ranges from 6px to ~7px at extreme scores

[CODE COMMENT] `snake-engine.ts:208-213`: "Collision radius barely grows — max 1px extra even at 100k score. The gap between collision circles is what enables threading through tight spaces."

### 7.4 Turn Rate
**Formula:** `max(turnMin, turnBase - turnScoreFactor × score)`
- Range: `0.08` to `0.35` rad/tick

### 7.5 Speed States
| State | Speed | Source |
|---|---|---|
| Normal | `baseSpeed` = 4.5 px/tick | `snake-engine.ts:236` |
| Boosting | `boostSpeed` = 8.0 px/tick | `snake-engine.ts:235` |
| Extracting | `extractionGlideSpeed` = 3.2 px/tick | `snake-engine.ts:234` |

### 7.6 Dynamic Map Radius
**Formula:** `mapMinRadius + (mapMaxRadius - mapMinRadius) × sqrt((count - 1) / (maxP - 1))`
- Where count = real player count (clamped 1–1000)
- Then add breathing: `+ sin(cycle × 2π) × mapBreathAmplitude`
- Cycle = `(elapsedMs % mapBreathCycleMs) / mapBreathCycleMs`

---

## 8. Tick Loop Processing Order

Each tick (30 Hz) processes in this exact sequence (`index.ts:406-602`):

1. **Increment tick counter** (`room.tick++`)
2. **Rebuild spatial grid** (clear + re-insert all segments and food) (`index.ts:410-443`)
3. **Bot AI tick** (all non-dead bots) (`index.ts:447-454`)
4. **Player movement** (server-authoritative, apply `desiredAngle` + `wantsBoost`) (`index.ts:457-480`)
5. **Body collision detection** → `detectCollisions()` (`index.ts:485`)
6. **Head-on collision detection** → `detectHeadOnCollisions()` (`index.ts:487`)
7. **Apply deaths** with drop rules (`index.ts:498-558`)
8. **Food eating** → `eatFood()` (`index.ts:561-565`)
9. **Replenish food** up to `foodCountTarget` (1200) (`index.ts:568-572`)
10. **Extraction progress** (non-dead, non-settling, extracting players) (`index.ts:575-590`)
11. **Recompute leader** + **expire chat** (`index.ts:593-602`)

---

## 9. Player Session & Snake State

### 9.1 `SnakeBase` (shared between players and bots)
| Field | Type | Purpose | Source |
|---|---|---|---|
| `id` | string | Unique identifier | `game-state.ts:78` |
| `name` | string | Display name | `game-state.ts:79` |
| `userTag` | string? | User tag (players only) | `game-state.ts:80` |
| `country` | string? | Country code | `game-state.ts:81` |
| `points` | `Vec2[]` | Body points (index 0 = head) | `game-state.ts:83` |
| `angle` | number | Current heading (radians) | `game-state.ts:84` |
| `size` | number | Visual radius in px | `game-state.ts:86` |
| `color` | string | Primary color | `game-state.ts:87` |
| `secondaryColor` | string? | Secondary color | `game-state.ts:88` |
| `isPlayer` | boolean | True for human | `game-state.ts:89` |
| `isBot` | boolean | True for bot | `game-state.ts:90` |
| `carriedChips` | number | Chips from star chips only | `game-state.ts:92` |
| `score` | number | `INITIAL_SPAWN_SCORE` + food collected | `game-state.ts:94` |
| `boostFrameCounter` | number | Boost tail-drop frame counter | `game-state.ts:96` |
| `isExtracting` | boolean | Currently extracting | `game-state.ts:97` |
| `extractionProgress` | number | ms toward extraction | `game-state.ts:99` |
| `isDead` | boolean | Dead flag | `game-state.ts:100` |
| `spawnProtectedUntil` | number | Invulnerability until epoch ms | `game-state.ts:102` |
| `chatMessage` | string? | Current chat bubble | `game-state.ts:103` |
| `chatExpiry` | number? | Chat expire epoch ms | `game-state.ts:104` |
| `wantsBoost` | boolean | Actively boosting | `game-state.ts:106` |
| `botState` | `'harvesting'` \| `'selfDestruct'`? | Bot state (online) | `game-state.ts:108` |

### 9.2 `PlayerSession` (extends `SnakeBase`)
| Field | Type | Source |
|---|---|---|
| `identity` | `PlayerIdentity` | `game-state.ts:113` |
| `desiredAngle` | number | `game-state.ts:115` |
| `kills` | number | `game-state.ts:116` |
| `joinedAt` | number (epoch ms) | `game-state.ts:117` |
| `lastInputAt` | number (epoch ms) | `game-state.ts:118` |
| `inputDropCount` | number | `game-state.ts:120` |
| `lastChatAt` | number (epoch ms) | `game-state.ts:121` |
| `arenaId` | string? | `game-state.ts:122` |
| `matchSettling` | boolean | `game-state.ts:124` |

### 9.3 Spawn Initialization
On join, a player is initialized with (`index.ts:817-846`):
- `id` = `socket.id`
- `name` = `identity.name`
- `userTag` = `identity.userTag`
- `country` = `identity.country`
- `points` = `initialBody(spawn.x, spawn.y, angle, cfg.initialBodyLength, cfg.segmentSpacing)`
- `angle` = random `[0, 2π)`
- `size` = `calcVisualRadius(cfg.initialSpawnScore, cfg)` (= 8)
- `color` = `identity.color`
- `secondaryColor` = `identity.secondaryColor`
- `isPlayer` = true, `isBot` = false
- `carriedChips` = `room.arena.buyIn` (the arena's buy-in amount)
- `score` = `cfg.initialSpawnScore` (= 20)
- `boostFrameCounter` = 0
- `isExtracting` = false, `extractionProgress` = 0
- `isDead` = false
- `spawnProtectedUntil` = `Date.now() + cfg.spawnProtectionMs` (4 seconds)
- `desiredAngle` = spawn angle
- `wantsBoost` = false
- `kills` = 0
- `joinedAt` = `Date.now()`
- `lastInputAt` = 0, `inputDropCount` = 0
- `lastChatAt` = 0
- `arenaId` = the joined arena id
- `matchSettling` = false

---

## 10. Snake Movement (Server-Authoritative)

[CODE COMMENT] `index.ts:14`: "Movement is server-authoritative — clients send only `angle`; the server computes position. Teleport is impossible."

### 10.1 `tickSnakeMovement()` — `game-state.ts:505-555`

**Step 1 — Turn:**
- `turnRate = calcTurnRate(snake.score, cfg)`
- `snake.angle = engineTurnToward(snake.angle, desiredAngle, turnRate)`

**Step 2 — Speed:**
- Boost conditions: `wantsBoost && !snake.isExtracting && snake.points.length > cfg.boostMinLength (8) && snake.score > cfg.initialSpawnScore (20)`
- If boosting: speed = `cfg.boostSpeed` (8.0)
- If extracting: speed = `cfg.extractionGlideSpeed` (3.2)
- Otherwise: speed = `cfg.baseSpeed` (4.5)

**Step 3 — Boost Tail Dropping:**
- If boosting: increment `boostFrameCounter`
- When `boostFrameCounter >= cfg.boostDropInterval` (10 frames):
  - Reset counter
  - If `points.length > cfg.boostMinLength + 1 (9)` AND `score > cfg.initialSpawnScore + 1 (21)`:
    - Drop tail position as food orb
    - `snake.points.pop()`
    - `snake.score = max(cfg.initialSpawnScore, snake.score - 1)` (floor at 20)
- If not boosting: reset counter, `wantsBoost = false`

**Step 4 — Move Head:**
- `newHead = moveHead(head, snake.angle, speed)` → `{ x: head.x + cos(angle) × speed, y: head.y + sin(angle) × speed }`
- `snake.points.unshift(newHead)`

**Step 5 — Body Length (Diminishing Growth):**
- `targetLen = calcBodyLength(snake.score, cfg)`
- While `points.length > targetLen`: `points.pop()`

**Step 6 — Size Update:**
- `snake.size = calcVisualRadius(snake.score, cfg)`

**Boost food drops** (from index.ts:462-476):
- Each dropped point becomes a `small` food orb (value=1, size=3, color=`#34d399`)
- Id: `food-{arenaId}-{foodIdCounter++}`

### 10.2 Extraction Steering Detection
- While extracting, if angle change > `0.08` rad (~4.6°), extraction progress resets to 0
- Emits `extract_progress { progress: 0 }` and `extract_cancelled_by_steer {}`
[CODE COMMENT] `index.ts:891`: "Forward gliding during extraction is allowed (natural movement). BUT any intentional steering (angle change > threshold) restarts extraction."

---

## 11. Collision Detection

### 11.1 Body Collision — `detectCollisions()` `game-state.ts:887-937`

**Skip conditions:** snake is dead, no points, spawn-protected, already dead this tick.

**Wall collision:**
- `distFromCenter = hypot(head.x - mapCenterX, head.y - mapCenterY)`
- If `distFromCenter > mapRadius` → death by `'wall'`, killerId = `'wall'`

**Head-to-body collision:**
- Query spatial grid: `queryRadius(head.x, head.y, snake.size + 30)`
- For each `segment`-kind item where `snakeId !== own id` and `segIdx !== 0`:
  - **Neck protection check:** `isNeckProtected(attackerAngle, head, segment, segIdx, victimAngle, cfg)` — if true, skip
  - Distance check: `d < (headCollisionRadius + segmentCollisionRadius × 0.7) × cfg.hitFactor (0.75)`
  - On collision: head's owner dies, body owner is killer

**Neck protection** (`snake-engine.ts:402-457`):
- Only applies to first `neckSegmentCount` (5) segments
- Blocked (pass-through) when:
  - `approachDeg > (90 - neckAngleThreshold)` (i.e. > 30°)
  - AND `bodyAlignDeg < neckAngleThreshold` (i.e. < 60°)
- `approachDeg` = angle between attacker's heading and direction from attacker to segment
- `bodyAlignDeg` = angle between attacker's heading and victim's heading

### 11.2 Head-On Collision — `detectHeadOnCollisions()` `game-state.ts:947-1028`

**Query:** `queryRadius(headA.x, headA.y, snakeA.size + 20)`, only `segIdx === 0` items.

**Distance threshold:** `d < (colA + colB) × cfg.headOnHitFactor (0.8)`

**Priority rules** (from [CODE COMMENT] `game-state.ts:941-945`):
- **Rule A:** No boost / both boosting → higher score survives
- **Rule B:** Smaller boosting, larger steady → **smaller** survives
- **Rule C:** Both boosting → higher score survives (same as A)
- **Tie** (equal score) → **both die**

Implementation (`game-state.ts:991-1015`):
- If `aScore === bScore`: both die
- If `aScore > bScore` (A is bigger):
  - If B boosting AND A not boosting → A dies (Rule B: smaller survives)
  - Else → B dies (Rule A/C: bigger survives)
- If `bScore > aScore` (B is bigger):
  - If A boosting AND B not boosting → B dies (Rule B: smaller survives)
  - Else → A dies (Rule A/C: bigger survives)

### 11.3 Death Processing (`index.ts:498-558`)

**Drop rules per cause:**

| Cause | Food Orbs | Star Chips | Source |
|---|---|---|---|
| Body collision (any snake) | Yes (score orbs along body) | Yes (real players only, if carriedChips > 0) | `index.ts:513-521` |
| Head-on collision (any snake) | Yes (score orbs along body) | Yes (real players only, if carriedChips > 0) | `index.ts:513-521` |
| Wall death (real player) | **No** (score destroyed) | Yes (if carriedChips > 0) | `index.ts:506-511` |
| Wall death (selfDestruct bot) | **No** | **No** (vanish cleanly) | `index.ts:512` |
| SelfDestruct bot collision death | Yes (food drops) | No | `index.ts:515-516` |

[CODE COMMENT] `index.ts:494-497`: "Body/headOn collision: drop score orbs (ALL snakes, including selfDestruct bots) + 10 stars (real players only). Wall death: drop 0 food (score destroyed) + 10 stars (real players only). Bot selfDestruct WALL death: 0 food, 0 stars (vanish cleanly). Bot selfDestruct COLLISION death: STILL drops food (only wall death vanishes cleanly)."

**Kill credit:** Only if killer is alive AND killer is a real player (`index.ts:524-529`). Bots don't track kills.

**Kill feed:** Broadcast `kill_feed` to all players in arena. Fields: `victimName`, `victimIsBot`, `killerName` (null for wall), `killerIsBot`, `cause` (`index.ts:532-539`).

**Player death:** Asynchronous `settleMatch(room, session, 'death', killer)` (`index.ts:545`).

**Bot death:** Remove from `room.bots`, spawn replacement bot to maintain count (`index.ts:549-557`).

### 11.4 Post-Death Replay Window
- Death: player stays in room for **16 seconds** after dying (`index.ts:378-390`)
- Client records 15s of post-death frames (300 frames at 20 Hz) for replay
- After 16s: removed from `room.players`, `playerSession` cleared
- Extract: removed immediately (no replay needed) (`index.ts:391-398`)

[CODE COMMENT] `index.ts:373-377`: "For death: keep the player in the room for 16 s so the broadcast loop continues sending snapshots. The client records 15 s of post-death frames (300 frames at 20 Hz) for the replay."

---

## 12. Food System

### 12.1 Food Interface
| Field | Type | Source |
|---|---|---|
| `id` | string | `game-state.ts:139` |
| `x` | number | `game-state.ts:140` |
| `y` | number | `game-state.ts:141` |
| `size` | number (radius in px) | `game-state.ts:142` |
| `value` | number (score/chip value) | `game-state.ts:143` |
| `isStarChip` | boolean | `game-state.ts:144` |
| `color` | string | `game-state.ts:145` |
| `glowColor` | string? | `game-state.ts:146` |
| `orbSize` | `'small'` \| `'medium'` \| `'large'`? | `game-state.ts:148` |

### 12.2 Regular Food
- Three sizes: Small (1pt, 3px), Medium (3pt, 5px), Large (5pt, 8px)
- Spawn distribution: 93% small, 4% medium, 3% large (weighted random)
- Food adds to `snake.score` (NOT `carriedChips`)
- All snakes (players AND bots) eat regular food

### 12.3 Star Chips
- Dropped on real player death (NOT bot death)
- Exactly `starDropCount` (10) stars per death
- Each star value = `carriedChips / 10` (all equal, floating point)
- Size: 12px, Color: `#fbbf24`, Glow: `#f59e0b`
- Positioned at death location with tiny 2px offset grid (5×2 pattern)
- Star chips add to `snake.carriedChips` only (NO score change)
- **ONLY real players** collect star chips; bots skip them

[CODE COMMENT] `game-state.ts:1037-1038`: "Star chips: carriedChips += value ONLY. NO score change. ONLY real players. Bots NEVER collect star chips."

### 12.4 Food Eating (`eatFood()`) `game-state.ts:1040-1068`
- Query grid: `queryRadius(head.x, head.y, snake.size + 20)`
- For each food item: `d < (headCollisionRadius + 4) + item.radius`
- Star chips: skip if `!snake.isPlayer`
- Regular food: `snake.score += item.value`
- Eaten food: both grid item and real `foodRef.value` set to 0 (sentinel)

### 12.5 Food Replenishment (`replenishFood()`) `game-state.ts:1192-1201`
- Filter out eaten food (value <= 0)
- Spawn up to `foodCountTarget` (1200) per tick, max 50 new orbs per tick

### 12.6 Food Spawn Location
- Random point in disc: `sqrt(random()) * maxR * 0.85` at random angle, centered at map center
- Spawn radius = `baseRadius - 50` (50px inside boundary)

### 12.7 Death Food Drops

**Score orbs** (`dropScoreOrbsAtBody()` `game-state.ts:399-442`):
- Compute mix: greedily Large (5pt) first, then Medium (3pt), then Small (1pt)
- Total value sums to exactly `snake.score`
- Orbs distributed along body path, shuffled for visual variety
- Scatter radius: 20px from body segment position
- Colors: Large = `#f472b6`/`#ec4899`, Medium = `#38bdf8`/`#0ea5e9`, Small = `#34d399`/`#10b981`

**Star chips** (`dropStarsAtDeath()` `game-state.ts:450-477`):
- Exactly 10 stars
- Each = `carriedChips / starDropCount`
- Size: 12px, Color: `#fbbf24`, Glow: `#f59e0b`
- No scatter — 2px offset grid at death position

### 12.8 Leave/Disconnect Drops
- On leave (not dead, not settling, carriedChips > 0): drop 10 star chips at head position (`index.ts:970-977`)
- No score orbs on leave

---

## 13. Extraction System

### 13.1 Start Extraction (`handleExtract()`) `index.ts:911-921`
- Guards: must be alive, not settling, not already extracting
- **NO zone check** — extract anywhere
[CODE COMMENT] `index.ts:916`: "NO zone check — extract anywhere (matches original design)."
- Sets `isExtracting = true`, `extractionProgress = 0`
- Emits `extract_start { durationMs }`

### 13.2 Cancel Extraction
- `cancel_extract` event: `isExtracting = false`, `extractionProgress = 0` (`index.ts:924-929`)
- Steering detection: angle change > 0.08 rad resets progress, emits `extract_progress { progress: 0 }` + `extract_cancelled_by_steer {}` (`index.ts:894-903`)

### 13.3 Progress (`tickRoom` step 10) `index.ts:575-590`
- Each tick: `extractionProgress += TICK_MS`
- `progress = min(1, extractionProgress / extractionDurationMs)`
- Emits `extract_progress { progress }` to player's socket
- On completion: async `settleMatch(room, session, 'extract')`
- Speed while extracting: `extractionGlideSpeed` = 3.2 px/tick
- Boost disabled while extracting

### 13.4 Extraction Steering Threshold
- `STEER_THRESHOLD` = `0.08` rad (~4.6°) (`index.ts:897`)
- Below this: "forward gliding during extraction is allowed (natural movement)"
- Above this: intentional steering, restarts extraction

---

## 14. Match Settlement

### 14.1 `settleMatch()` `index.ts:304-399`
- **Idempotent:** guarded by `matchSettling` flag — concurrent calls short-circuit
- Sets `matchSettling = true`, `isExtracting = false`, `extractionProgress = 0`

**Computed values:**
- `durationSeconds` = `max(0, floor((now - joinedAt) / 1000))`
- `carriedChips` = `max(0, floor(session.carriedChips))`
- `kills` = `session.kills`
- `killerTag` = killer's `userTag` (if applicable)
- `score` = `session.score`

### 14.2 Commission Calculation (`index.ts:322-326`)
- `realPlayerCount` = `room.players.size` (includes dead/settling in the Map, but only those still in map)
- If `realPlayerCount <= 3`: `commissionRate = 0`
- If `realPlayerCount >= 4`: `commissionRate = 0.35`
- `commission = outcome === 'extract' ? floor(carriedChips × commissionRate) : 0`
- `bankedAmount = outcome === 'extract' ? (carriedChips - commission) : 0`

### 14.3 Report to Next.js (`reportMatchResult()`) `index.ts:159-193`
**Payload sent to `/api/match/result`:**
| Field | Type | Source |
|---|---|---|
| `userTag` | string | `index.ts:160` |
| `arenaId` | string | `index.ts:161` |
| `outcome` | `'extract'` \| `'death'` | `index.ts:162` |
| `carriedChips` | number | `index.ts:163` |
| `kills` | number | `index.ts:164` |
| `durationSeconds` | number | `index.ts:165` |
| `killerTag` | string? | `index.ts:166` |
| `score` | number? | `index.ts:167` |
| `bankedAmount` | number? | `index.ts:168` |

**Response from `/api/match/result` (`MatchResultResponse`):**
| Field | Type | Source |
|---|---|---|
| `player` | unknown? | `index.ts:117` |
| `chipsEarned` | number? | `index.ts:118` |
| `chipsLost` | number? | `index.ts:119` |
| `xpGained` | number? | `index.ts:120` |
| `newLevel` | number? | `index.ts:121` |
| `newBankedChips` | number? | `index.ts:122` |

### 14.4 Client Notification
- On death: emit `death` first, then `match_result` (order matters for client-side handler) (`index.ts:357-371`)
[CODE COMMENT] `index.ts:357-360`: "Emit death BEFORE match_result so the client's onDeath handler runs first (sets up post-death replay recording). If match_result arrived first it would set matchEndedRef=true and cause onDeath to bail via its idempotency guard."

---

## 15. Bot AI

### 15.1 Bot Types
| Type | `BotPersonality` Values | Source |
|---|---|---|
| 5 personalities | `'scavenger'` \| `'opportunist'` \| `'hunter'` \| `'extractor'` \| `'coward'` | `game-state.ts:127` |
| Bot states | `'harvesting'` \| `'selfDestruct'` | `game-state.ts:108` |

### 15.2 Bot Spawning (`spawnBot()`) `game-state.ts:305-343`
- Id format: `bot-{arenaId}-{botIdCounter++}`
- Name: `BOT_NAMES[idx % 20]` (+ suffix if idx >= 20)
- Skin: `BOT_SKINS[idx % 6]` (6 color pairs)
- Personality: cycles through all 5 in order
- Spawned at safe point within `baseRadius - 200`
- `carriedChips` = 0 (bots never carry chips from buy-in)
- `score` = `cfg.initialSpawnScore` (20)
- `botState` = `'harvesting'`
- `nextThinkAt` = 0 (think immediately)
- `wantsBoost` = false

### 15.3 Bot Names (20)
`ViperStrike`, `NeonFang`, `CyberCobra`, `ToxicPython`, `ShadowAdder`, `ChronoKrait`, `QuantumMamba`, `AeroBoa`, `SavageSerpent`, `GlitchViper`, `ApexPredator`, `GhostScale`, `MatrixAsp`, `Synthetix`, `StaticFang`, `VectorVenom`, `OmegaSlink`, `BetaByte`, `RattleTech`, `HoloHydra`

### 15.4 Bot Skins (6)
| # | Color | Secondary | Source |
|---|---|---|---|
| 0 | `#22c55e` | `#15803d` | `game-config.ts:372` |
| 1 | `#a855f7` | `#6b21a8` | `game-config.ts:373` |
| 2 | `#06b6d4` | `#0891b2` | `game-config.ts:374` |
| 3 | `#ec4899` | `#8b5cf6` | `game-config.ts:375` |
| 4 | `#f59e0b` | `#b45309` | `game-config.ts:376` |
| 5 | `#ef4444` | `#991b1b` | `game-config.ts:377` |

### 15.5 Bot Count
- Each arena tier has `botsCount` = `30` bots (`game-config.ts:22`)
- `ensureBots()` maintains this count (`game-state.ts:346-351`)
- Dead bots are immediately replaced to maintain count (`index.ts:549-557`)

### 15.6 Bot Think Intervals
| Personality | Think Interval (ms) | Source |
|---|---|---|
| `coward` | `80` | `game-state.ts:613` |
| `hunter` | `100` | `game-state.ts:614` |
| `extractor` | `90` | `game-state.ts:615` |
| `scavenger` | `130 + random(0..80)` = 130–210 | `game-state.ts:616` |
| `opportunist` | `130 + random(0..80)` = 130–210 | `game-state.ts:616` |

### 15.7 Bot Scanning
- Food scan: `room.grid.queryRadius(head.x, head.y, cfg.botFoodScanRadius)` = 300px (`game-state.ts:625`)
- Body threat scan: `room.grid.queryRadius(head.x, head.y, 150)` = 150px (`game-state.ts:663`)
- Nearest human player: full scan of all `room.players` (`game-state.ts:644-657`)
- Hunter prey scan: all bots within 600px, only smaller (`game-state.ts:673-681`)

### 15.8 Bot Evade Radius Multipliers
| Personality | Evade Multiplier | Effective Radius | Source |
|---|---|---|---|
| `coward` | `2×` | 600px | `game-state.ts:683` |
| `hunter` | `0.6×` | 180px | `game-state.ts:684` |
| `extractor` | `0.8×` | 240px | `game-state.ts:685` |
| `scavenger` | `1×` | 300px | `game-state.ts:686` |
| `opportunist` | `1×` | 300px | `game-state.ts:686` |

### 15.9 Personality Behaviors

**Self-Destruct State** (all personalities behave the same, `game-state.ts:587-608`):
- Navigate toward nearest wall: angle = `atan2(head.y - centerY, head.x - centerX)`
- `wantsBoost = false` (NEVER boost during self-destruct)
- Think interval: 120ms
- If food within 120px, slightly veer toward it (turn 0.03 rad toward food)

**Scavenger** (`game-state.ts:694-721`):
- Prefers edge: if `distFromCenter < mapRadius * 0.6`, move toward edge
- Priority 1: Body threat < 120px → flee
- Priority 2: Player within `evadeRadius × 1.2` (360px) → evade with ±0.6 jitter
- Priority 3: Too close to center → move toward edge with ±0.3 jitter
- Priority 4: Food (only if no players within evadeRadius) → seek
- Priority 5: Wander near edges with ±0.3 jitter

**Opportunist** (`game-state.ts:727-755`):
- Confident when `bot.size > nearPlayerSize && nearPlayerDist < 400`
- Priority 1: Body threat < 140px → flee
- Priority 2: Confident + 60% random → chase smaller player
- Priority 3: Larger player within evadeRadius → perpendicular evasion (predict future position at 8 ticks)
- Priority 4: Seek food
- Priority 5: Wander with ±0.4 jitter

**Hunter** (`game-state.ts:761-788`):
- Boosts toward prey/bot/food when conditions met
- Priority 1: Body threat < 120px → flee
- Priority 2: Smaller bot prey < 400px → chase (boost if < 300px and body > 8 segments)
- Priority 3: Smaller human < 500px → chase (boost if < 350px and body > 8 segments)
- Priority 4: Food → seek (boost if < 200px and body > 8 segments)
- Priority 5: Wander toward center with ±0.3 jitter

**Extractor** (`game-state.ts:794-814`):
- Priority 1: Body threat < 130px → flee
- Priority 2: Player within `evadeRadius × 0.8` (240px) → flee
- Priority 3: Food → seek (boost if value >= 3 and < 250px and body > 8 segments)
- Priority 4: Move toward center with ±0.2 jitter

**Coward** (`game-state.ts:820-841`):
- Priority 1: Body threat < 160px → PANIC (flee + ±0.8 erratic jitter)
- Priority 2: Player within evadeRadius (600px) → flee with random zigzag (±0.5–1.0)
- Priority 3: Food only if `nearPlayerDist > evadeRadius × 1.5` (900px)
- Priority 4: Nervous wander with ±0.6 jitter

### 15.10 Bot Edge Avoidance (`game-state.ts:848-853`)
- If `distFromCenter > mapRadius - 300`:
  - Turn toward center with `MAX_TURN_PER_TICK × 2` (0.44 rad) max step

### 15.11 Bot Self-Destruct Trigger
- If `bot.score >= cfg.botSelfDestructThreshold` (100) AND `botState === 'harvesting'`:
  - Set `botState = 'selfDestruct'` (`game-state.ts:859-861`)

### 15.12 Bot Boosting
- Only `hunter` and `extractor` personalities can boost (`game-state.ts:612`)
- Final boost condition: `shouldBoost && bot.points.length > cfg.boostMinLength` (`game-state.ts:864`)

### 15.13 Bot Displacement
- `displaceBotForPlayer()`: picks random `harvesting` bot, sets `botState = 'selfDestruct'`, disables boost
- Purpose: make room for new human player (`game-state.ts:483-491`)

---

## 16. Spatial Hash Grid

### 16.1 `SpatialHashGrid` Class (`spatial-grid.ts`)

| Property | Value | Source |
|---|---|---|
| Default cellSize | `120` px | `spatial-grid.ts:52` |
| Grid storage | `Map<string, Map<string, GridItem>>` (cellKey → itemId → item) | `spatial-grid.ts:45` |
| Cell key format | `"{cx}:{cy}"` (integer coordinates) | `spatial-grid.ts:56-58` |

[CODE COMMENT] `spatial-grid.ts:3-10`: "The OLD server ran an O(n²×m) nested loop every tick (every snake head vs every other snake's every body segment) which produced ~220M ops/sec at peak. This grid gives O(1) cell lookups so a head-vs-world query touches only ~9–25 nearby items. The grid is cleared and rebuilt once per tick (cheap: ~1000 items/arena × constant cells each). Mid-tick mutations use the `value=0` sentinel for food instead of removing items, so we never mutate a Map while iterating it."

### 16.2 `GridItem` Interface
| Field | Type | Purpose | Source |
|---|---|---|
| `id` | string | Unique id (`snakeId:segIdx` or food id) | `spatial-grid.ts:17` |
| `kind` | `'segment'` \| `'food'` | Item type | `spatial-grid.ts:13,19` |
| `x` | number | Position X | `spatial-grid.ts:20` |
| `y` | number | Position Y | `spatial-grid.ts:21` |
| `radius` | number | Bounding radius | `spatial-grid.ts:22` |
| `snakeId` | string? | Owner (segments only) | `spatial-grid.ts:24` |
| `segIdx` | number? | Segment index (0 = head) | `spatial-grid.ts:26` |
| `value` | number? | Food value (0 = eaten sentinel) | `spatial-grid.ts:28` |
| `isStarChip` | boolean? | Star chip flag | `spatial-grid.ts:29` |
| `color` | string? | Color | `spatial-grid.ts:30` |
| `foodRef` | `{ value: number }?` | Reference to real food object | `spatial-grid.ts:34` |

### 16.3 Operations

**`clear()`** — empties all cells (`spatial-grid.ts:61-63`)

**`insert(item)`** — inserts item into every cell its bounding circle overlaps (`spatial-grid.ts:69-85`):
- `minCx = floor((x - radius) / cellSize)`
- `maxCx = floor((x + radius) / cellSize)`
- Same for Y
- Same item referenced from multiple cells (expected)

**`queryRadius(x, y, r)`** — returns `Map<string, GridItem>` of items in overlapping cells (`spatial-grid.ts:93-109`):
- Scans cells under query bounding box
- Deduplicates by item id
- Caller must do precise distance checks

### 16.4 Grid Population (per tick, `index.ts:410-443`)
1. Clear grid
2. Insert all snake body segments: id = `{snakeId}:{segIdx}`, kind = `'segment'`
3. Insert all food with value > 0: id = food id, kind = `'food'`, includes `foodRef`

---

## 17. Snapshot / Broadcast System

### 17.1 `buildSnapshot()` `game-state.ts:1085-1173`
- One snapshot per player per broadcast cycle (customized `yourRank`)
- Body points downsampled to `MAX_SNAPSHOT_POINTS` (60) if longer

**`GameSnapshot` fields:**
| Field | Type | Source |
|---|---|---|
| `arenaId` | string | `game-state.ts:1158` |
| `tick` | number | `game-state.ts:1159` |
| `snakes` | `SnakeSnapshot[]` | `game-state.ts:1160` |
| `foods` | `FoodSnapshot[]` | `game-state.ts:1161` |
| `worldSize` | number (8000) | `game-state.ts:1162` |
| `mapRadius` | number (current breathing radius) | `game-state.ts:1163` |
| `mapCenterX` | number | `game-state.ts:1164` |
| `mapCenterY` | number | `game-state.ts:1165` |
| `leaderId` | string? | `game-state.ts:1166` |
| `leaderChips` | number | `game-state.ts:1167` |
| `realPlayerCount` | number | `game-state.ts:1168` |
| `yourRank` | number (0 if not found) | `game-state.ts:1169` |
| `arenaLeaderboard` | `ArenaLeaderboardEntry[]` (top 10) | `game-state.ts:1170` |
| `commissionRate` | number | `game-state.ts:1171` |

### 17.2 `SnakeSnapshot` fields (per-snake in snapshot)
| Field | Type | Source |
|---|---|---|
| `id` | string | `game-state.ts:1103` |
| `name` | string | `game-state.ts:1104` |
| `userTag` | string? | `game-state.ts:1105` |
| `points` | `Vec2[]` (downsampled to max 60) | `game-state.ts:1106` |
| `angle` | number | `game-state.ts:1107` |
| `size` | number | `game-state.ts:1108` |
| `color` | string | `game-state.ts:1109` |
| `secondaryColor` | string? | `game-state.ts:1110` |
| `isPlayer` | boolean | `game-state.ts:1111` |
| `isBot` | boolean | `game-state.ts:1112` |
| `carriedChips` | number (floored) | `game-state.ts:1113` |
| `score` | number | `game-state.ts:1114` |
| `isExtracting` | boolean | `game-state.ts:1115` |
| `extractionProgress` | number (0..1) | `game-state.ts:1116` |
| `isDead` | boolean | `game-state.ts:1117` |
| `spawnProtected` | boolean | `game-state.ts:1118` |
| `chatMessage` | string? | `game-state.ts:1119` |
| `country` | string? | `game-state.ts:1120` |
| `isBoosting` | boolean | `game-state.ts:1121` |
| `botState` | string? | `game-state.ts:1122` |
| `visualRadius` | number | `game-state.ts:1123` |
| `collisionRadius` | number | `game-state.ts:1124` |

### 17.3 Arena Leaderboard
- Sorted by `carriedChips` descending, real players only (non-dead, non-settling)
- Top 10 entries
- Each entry: `id`, `name`, `userTag`, `carriedChips` (floored), `score`, `kills`, `isPlayer` (true for viewer), `country`
- `yourRank` = 1-based index of viewer in sorted list (0 if not found)

### 17.4 Leader Recomputation (`recomputeLeader()`) `game-state.ts:1178-1189`
- Scans ALL snakes (players + bots)
- Highest `carriedChips` wins
- `carriedChips` is floored for display

---

## 18. Safe Spawn System

### 18.1 `findSafeSpawnPoint()` `game-state.ts:234-265`
- Attempts: `spawnSafeAttempts` (30) iterations
- Spawn radius: `baseRadius - 200` (200px inside boundary for players, same for bots)
- Must be at least `spawnBoundaryMargin` (500px) inside boundary
- Must be at least `spawnSafeDistance` (500px) from all existing snake heads
- Falls back to random point if no safe spot found

### 18.2 `randomSpawnPoint()` `game-state.ts:224-228`
- Uniform random in disc: `sqrt(random()) * maxR * 0.85` at random angle
- The 0.85 factor prevents spawning at the very edge

### 18.3 `initialBody()` `game-state.ts:271-280`
- `length` points along reverse of angle direction
- Point i at: `{ x: headX - cos(angle) × i × spacing, y: headY - sin(angle) × i × spacing }`

---

## 19. Chat System

### 19.1 Sending (`handleChat()`) `index.ts:932-959`
- Must be in a match with valid identity
- Message trimmed and sliced to 80 chars
- Rate limited: 2 second cooldown
- Sets `session.chatMessage` and `session.chatExpiry = now + 4000` (4s visible)
- Broadcast `chat` event to all players in room (not bots)

### 19.2 Expiry (`expireChat()`) `game-state.ts:1204-1211`
- Every tick: if `now > chatExpiry`, clear `chatMessage` and `chatExpiry`

---

## 20. Score / XP / Chip Calculations

### 20.1 Score Model
[CODE COMMENT] `game-state.ts:6`: "Score model: INITIAL_SPAWN_SCORE(20) + food collected"
- `score` starts at 20, increases by food value (1, 3, or 5)
- Score determines body length and visual size
- Score is separate from `carriedChips`

### 20.2 Carried Chips
[CODE COMMENT] `game-state.ts:91`: "Chips carried in-match (ONLY from star chips). Lost on death, banked on extract."
- Players start with `carriedChips = arena.buyIn`
- Only star chips add to `carriedChips`
- Regular food does NOT affect `carriedChips`

### 20.3 Commission
- ≤3 real players: 0% commission
- ≥4 real players: 35% commission
- Applied only on extraction
- Formula: `commission = floor(carriedChips × rate)`, `banked = carriedChips - commission`

### 20.4 XP (Computed by Next.js, returned in result)
- From `types.ts:64`: `floor((score × 5 + kills × 50) × rewardMultiplier)` — only on extract
- Level formula: `xpForLevel(level) = level × 200` (`game-config.ts:355-357`)
- `levelFromXp(xp) = max(1, floor(xp / 200) + 1)` (`game-config.ts:358-360`)

---

## 21. Arena Tiers

30 competitive tiers defined in `ARENA_TIERS` array (`game-config.ts:25`). All have `botsCount: 30`.

Buy-in range: 10 to 1,000,000,000 chips.
Difficulty groups:
- Beginner (tiers 1–6): buy-in 10–300
- Medium (tiers 7–12): buy-in 500–5,000
- High Stakes (tiers 13–18): buy-in 10,000–100,000
- Extreme (tiers 19–24): buy-in 200,000–10,000,000
- Legendary (tiers 25–30): buy-in 20,000,000–1,000,000,000

Each tier has: `id`, `name`, `buyIn`, `description`, `difficulty`, `color` (tailwind), `accentColor` (hex), `borderAccent` (hex), `botsCount`, `rewardMultiplier`.

---

## 22. Join Flow (Complete Sequence)

1. Client sends `join_arena { arenaId }`
2. Server validates payload and arena exists
3. Checks not already in match (`join_error: 'already_in_match'`)
4. Calls `POST /api/match/join { userTag, arenaId }` to deduct buyIn
5. On `insufficient_chips`: `join_error: 'insufficient_chips'`
6. On `banned`: `join_error: 'banned'` + `kicked` + disconnect
7. Gets or creates arena room (with sharding)
8. Computes `baseRadius` from current real player count
9. Finds safe spawn point within `baseRadius - 200`
10. Creates `PlayerSession` with all initial values
11. Adds to `room.players` Map
12. Emits `joined { arenaId, worldSize: 8000, yourId }`

---

## 23. Logging

### 23.1 Log Format
- `[HH:MM:SS] [LEVEL] message`
- Levels: `'info'` (stdout), `'warn'` (stdout), `'error'` (stderr)
- Single sink — no `console.log` elsewhere (`index.ts:83-98`)

### 23.2 Logged Events
| Event | Level | Source |
|---|---|---|
| Arena shard created | info | `index.ts:260` |
| Player join | info | `index.ts:857` |
| Socket connect | info | `index.ts:705` |
| Socket disconnect | info | `index.ts:745` |
| Match settle (death/extract) | info | `index.ts:399` |
| Player death | info | `index.ts:543` |
| Post-death replay window expired | info | `index.ts:389` |
| Player leave | info | `index.ts:982` |
| Input flood | warn (every 20 drops) | `index.ts:884` |
| Bot tick error | error | `index.ts:452` |
| Player movement error | error | `index.ts:478` |
| Collision detection error | error | `index.ts:490` |
| eatFood error | error | `index.ts:563` |
| replenishFood error | error | `index.ts:571` |
| recomputeLeader error | error | `index.ts:595` |
| settleMatch error | error | `index.ts:546,587` |
| joinMatch fetch failed | error | `index.ts:784` |
| dropStarsAtDeath on leave error | error | `index.ts:975` |
| match/result HTTP error | error | `index.ts:183` |
| match/result fetch failed | error | `index.ts:188` |
| Verify fetch failed | warn | `index.ts:677` |
| Heartbeat | info (every 15s) | `index.ts:1033` |
| Server boot | info | `index.ts:1047,1053,1061` |
| CORS warning | warn | `index.ts:1046` |

---

## 24. XP / Level System (from game-config.ts)

| Constant | Value | Source |
|---|---|---|
| XP per level | `level × 200` | `game-config.ts:355` |
| Level from XP | `max(1, floor(xp / 200) + 1)` | `game-config.ts:358` |
| Daily rewards (7-day cycle) | `[10, 20, 50, 100, 250, 500, 1000]` | `game-config.ts:313` |
| Max yearly chip purchase | `2,500,000` (25 Lakh) | `game-config.ts:329` |
| Max daily ads | `12` | `game-config.ts:330` |
| Ad reward chips | `100` | `game-config.ts:331` |

---

## 25. All Design Intent Comments (verbatim)

| # | Comment | Location |
|---|---|---|
| 1 | "Server-authoritative multiplayer snake. The Next.js app (port 3000) talks to this server via the Caddy gateway using io(\"/?XTransformPort=3001\")." | `index.ts:4-5` |
| 2 | "Auth is mandatory — sockets without a valid JWT (verified via POST /api/match/verify) are disconnected at the middleware. No 'auth optional, admit anyway' path." | `index.ts:8-10` |
| 3 | "Identity is the verify response only. We never trust any subsequent client-supplied userTag/name/color/skin." | `index.ts:11-12` |
| 4 | "One socket per userTag — a new connection kicks the prior socket." | `index.ts:13` |
| 5 | "Movement is server-authoritative — clients send only `angle`; the server computes position. Teleport is impossible." | `index.ts:14-15` |
| 6 | "Buy-in is deducted atomically by /api/match/join (Next.js + Prisma transaction). We never touch the DB directly." | `index.ts:16-17` |
| 7 | "Match results are reported exactly once via /api/match/result, guarded by a `matchSettling` flag to prevent double-credit on disconnect races." | `index.ts:18-19` |
| 8 | "Recursive setTimeout (not setInterval) for both tick and broadcast loops — a slow tick can't overlap the next." | `index.ts:20-21` |
| 9 | "Every tick is wrapped in try/catch; one bad snake never kills the loop." | `index.ts:22` |
| 10 | "Spatial hash grid (see spatial-grid.ts) keeps collision detection near-linear instead of O(n²)." | `index.ts:23-24` |
| 11 | "Broadcasts happen at 20 Hz, not every tick, and snapshot points are downsampled to 60 to keep payloads small." | `index.ts:25-26` |
| 12 | "uncaughtException / unhandledRejection are logged, never fatal." | `index.ts:27` |
| 13 | "Graceful shutdown on SIGINT/SIGTERM broadcasts `server_shutdown` then exits." | `index.ts:28` |
| 14 | "Skip empty rooms (no players) for CPU savings — bots stay idle." | `index.ts:609` |
| 15 | "Forward gliding during extraction is allowed (natural movement). BUT any intentional steering (angle change > threshold) restarts extraction." | `index.ts:892-893` |
| 16 | "Emit death BEFORE match_result so the client's onDeath handler runs first (sets up post-death replay recording)." | `index.ts:357-360` |
| 17 | "For death: keep the player in the room for 16 s so the broadcast loop continues sending snapshots. The client records 15 s of post-death frames (300 frames at 20 Hz) for the replay." | `index.ts:373-377` |
| 18 | "Process-level guards (the OLD server had none → one bad write killed it)" | `index.ts:986` |
| 19 | "Pre-create all online arenas so bots are ready when the first player joins." | `index.ts:1049` |
| 20 | "CORS is open (origin: *) — OK for dev (Caddy restricts in prod)" | `index.ts:1046` |
| 21 | "Three food orb sizes (Small=1pt, Medium=3pt, Large=5pt)" | `game-state.ts:5` |
| 22 | "Score model: INITIAL_SPAWN_SCORE(20) + food collected" | `game-state.ts:6` |
| 23 | "Star drops: ALWAYS exactly 10 per player death" | `game-state.ts:7` |
| 24 | "Death food: exact sum matching snake's total score" | `game-state.ts:8` |
| 25 | "Head-on collision: mass + boost priority rules" | `game-state.ts:9` |
| 26 | "Bot AI: all bots evade humans, self-destruct at score >= 100 (online only)" | `game-state.ts:10` |
| 27 | "Dynamic map radius based on real player count" | `game-state.ts:11` |
| 28 | "Max turn rate per tick (radians) for bots." | `game-state.ts:177` |
| 29 | "Max points emitted in a snapshot — longer bodies are downsampled." | `game-state.ts:179` |
| 30 | "scavenger — cautious edge-dweller. Stays away from center & players. Only eats food far from danger. Won't chase anything." | `game-state.ts:566-567` |
| 31 | "opportunist — balanced. Eats food, evades players at medium range, occasionally chases smaller snakes if confident." | `game-state.ts:568-569` |
| 32 | "hunter — aggressive. Actively chases smaller snakes (head-on intimidation), seeks food aggressively, boosts to close gaps." | `game-state.ts:570-571` |
| 33 | "extractor — efficient food vacuum. Prioritizes dense food clusters, boosts toward high-value orbs. Less evasive (focused)." | `game-state.ts:572-573` |
| 34 | "coward — extremely skittish. Flees at 2× evade radius, erratic direction changes, never chases, fastest reaction time." | `game-state.ts:574-575` |
| 35 | "Star chips do NOT affect score — they only add to carried chips." | `game-state.ts:1057` |
| 36 | "Star chips: ONLY real players collect (bots skip)." | `game-state.ts:1054` |
| 37 | "Drop exactly 10 Star collectibles at the exact death position. Each star = carried chips ÷ 10 (floating point, all equal). Stars do NOT scatter — they appear at the death position. ONLY for real players. Bots never drop stars." | `game-state.ts:444-449` |
| 38 | "Force one bot into self-destruct state to make room for a new human player." | `game-state.ts:480` |
| 39 | "NEVER boost during self-destruct — go slowly" | `game-state.ts:490` |
| 40 | "Mid-tick mutations use the `value=0` sentinel for food instead of removing items, so we never mutate a Map while iterating it." | `spatial-grid.ts:9-10` |
| 41 | "~120px is a good trade-off for a 6000px world with snake sizes ~8–20 and food sizes ~5–10: most queries touch only the 3×3 block around the query point." | `spatial-grid.ts:48-50` |
| 42 | "Collision radius barely grows — max 1px extra even at 100k score. The gap between collision circles is what enables threading through tight spaces." | `snake-engine.ts:208-213` |
| 43 | "Server-authoritative: only desiredAngle from client." | `game-state.ts:502` |
| 44 | "Body/headOn collision: drop score orbs (ALL snakes, including selfDestruct bots) + 10 stars (real players only). Wall death: drop 0 food (score destroyed) + 10 stars (real players only). Bot selfDestruct WALL death: 0 food, 0 stars (vanish cleanly). Bot selfDestruct COLLISION death: STILL drops food (only wall death vanishes cleanly)." | `index.ts:494-497` |
