# 04 — Offline Engine Catalog
**Source:** `src/components/game/offline-engine.ts` (3149 lines)
**Purpose:** Pure client-side snake game engine for "Venom Arena" offline practice mode.

---

## File Header Design Intent

[CODE COMMENT] `"Infinite-map offline practice mode. No server connection, no chips, no stars, no wallet, no boundaries. Camera follows the player in an endless world."`

[CODE COMMENT] Key changes from the original:
- **Infinite map** — no boundaries, no wall death, no breathing radius.
- **Food orb system** — three sizes (Small/Medium/Large) with weighted spawn.
- **No chips / stars / wallet** — pure score-based gameplay.
- **Death food drop** — dead snakes drop orbs summing to their total score.
- **Head-on collision** — boost-aware resolution rules.
- **Bot AI** — no self-destruct, predictive evasion, food-seeking.
- **Opacity layering** — larger snakes fade when a smaller snake is near.
- **Score model** — INITIAL_SPAWN_SCORE + food eaten, body from score.

---

## 1. PUBLIC TYPES

### `OfflineState` (state machine)
- Values: `'playing'` | `'dead'` | `'extracted'`

### `OfflineExitResult`
- `score: number`
- `kills: number`
- `durationSeconds: number`

---

## 2. INTERNAL TYPES

### `Vec2`
- `x: number`
- `y: number`

### `BotPersonality`
- Values: `'scavenger'` | `'opportunist'` | `'hunter'` | `'extractor'` | `'coward'`

### `SnakeBase`
- `id: string`
- `name: string`
- `userTag?: string`
- `country?: string`
- `points: Vec2[]`
- `angle: number`
- `size: number`
- `collisionRadius: number`
- `color: string`
- `secondaryColor?: string`
- `isPlayer: boolean`
- `isBot: boolean`
- `score: number` — [CODE COMMENT] "Food-mass score (starts at 0, grows with food, shrinks with boost). Display score = cfg.initialSpawnScore + this value."
- `boostFrameCounter: number`
- `isExtracting: boolean`
- `extractionProgress: number`
- `isDead: boolean`
- `spawnProtectedUntil: number`
- `chatMessage?: string`
- `chatExpiry?: number`
- `kills: number`
- `desiredAngle: number`
- `wantsBoost: boolean`
- `isBoosting: boolean` — [CODE COMMENT] "Whether the snake is actively boosting (for head-on collision + rendering)."

### `BotSession` (extends SnakeBase)
- `botId: string`
- `personality: BotPersonality`
- `nextThinkAt: number`
- `virtualIdx: number` — [CODE COMMENT] "Index into the virtualBots array this active bot came from."

### `VirtualBot`
[CODE COMMENT] "Lightweight bot definition for the virtual pool (1000 total). Only stores identity + cheap position. Active bots (BotSession) are created from these when near the player."
- `idx: number`
- `id: string`
- `botId: string`
- `name: string`
- `personality: BotPersonality`
- `color: string`
- `secondaryColor: string`
- `initialScore: number`
- `x: number` — [CODE COMMENT] "Cheap world position — updated each tick with straight-line wander."
- `y: number`
- `angle: number`
- `score: number`
- `isActive: boolean`

### `Food`
- `id: string`
- `x: number`
- `y: number`
- `size: number` — [CODE COMMENT] "Visual radius in px."
- `value: number` — [CODE COMMENT] "Score value (1, 3, or 5)."
- `orbSize: 'small' | 'medium' | 'large'`
- `color: string`
- `glowColor: string`
- `isStarChip?: boolean`

### `GridItem`
- `id: string`
- `kind: 'segment' | 'food'`
- `x: number`
- `y: number`
- `radius: number`
- `snakeId?: string`
- `segIdx?: number`
- `value?: number`
- `foodRef?: Food`

### `ReplaySnakeData`
- `id, name, points, angle, size, color, secondaryColor, isDead, score, isBoosting, isPlayer`

### `ReplayFoodData`
- `x, y, size, value, color, glowColor, orbSize`

### `ReplayFrame`
- `snakes: ReplaySnakeData[]`
- `foods: ReplayFoodData[]`
- `camX, camY, camZoom`

---

## 3. CONSTANTS

### Game Loop
| Constant | Value | Purpose |
|---|---|---|
| `TICK_MS` | `33` | Physics tick interval (ms) — **30 Hz** |
| `MAX_PARTICLES` | `200` | Maximum particles on screen |

### Input
| Constant | Value | Purpose |
|---|---|---|
| `MOUSE_DEADZONE_PX` | `15` | Minimum mouse distance from center to register input |
| `JOYSTICK_DEADZONE` | `0.18` | Touch joystick deadzone (magnitude) |
| `JOYSTICK_MAX_RADIUS_PX` | `70` | Touch joystick maximum radius in pixels |
| `JOYSTICK_BOOST_MAGNITUDE` | `0.6` | Touch joystick magnitude threshold for boosting |

### Rendering
| Constant | Value | Purpose |
|---|---|---|
| `MAX_SNAPSHOT_POINTS` | `60` | Max rendered body points per snake (downsample cap) |
| `OPACITY_PROXIMITY_FACTOR` | `3` | Multiplied by sum of sizes for opacity proximity check |
| `OPACITY_FADE_TO` | `0.75` | Opacity to which larger snake fades |

### Adaptive Quality (FPS)
| Constant | Value | Purpose |
|---|---|---|
| `FPS_LOW_THRESHOLD` | `40` | FPS below this triggers low-quality check |
| `FPS_HIGH_THRESHOLD` | `55` | FPS above this triggers high-quality check |
| `FPS_LOW_DURATION_MS` | `2000` | Duration FPS must stay low before downgrading |
| `FPS_HIGH_DURATION_MS` | `5000` | Duration FPS must stay high before upgrading |

### Bot AI
| Constant | Value | Purpose |
|---|---|---|
| `BOT_THINK_INTERVAL_MS` | `120` | Base interval between bot AI decisions |
| `BOT_THINK_JITTER_MS` | `80` | Random jitter added to think interval |
| `BOT_THREAT_SCAN_RADIUS` | `250` | Radius for scanning nearby body segment threats |
| `BOT_MAX_TURN_PER_TICK` | `0.22` | Max radians a bot can turn per tick (defined but not directly used in offline; uses engine `calcTurnRate` instead) |
| `BOT_PREDICT_AHEAD_TICKS` | `8` | Number of ticks to predict ahead for evasion |
| `BOT_PREDICT_SPEED` | `DEFAULT_SNAKE_CONFIG.baseSpeed * 1.5` = `6.75` | Speed used for predictive position calculations |

### Virtual Bot Pool
| Constant | Value | Purpose |
|---|---|---|
| `VIRTUAL_BOT_COUNT` | `1000` | Total lightweight bot definitions |
| `ACTIVATION_RADIUS` | `2500` | Distance from player to activate a virtual bot |
| `DEACTIVATION_RADIUS` | `3500` | Distance from player to deactivate an active bot (hysteresis) |
| `MAX_ACTIVE_BOTS` | `60` | Maximum active bots with full physics at any time |
| `VIRTUAL_BOT_SPEED` | `2.5` | Cheap movement speed for inactive virtual bots |
| `VIRTUAL_WORLD_RADIUS` | `8000` | Virtual bots spread within this radius of player |

### Food Spawning
| Constant | Value | Purpose |
|---|---|---|
| `FOOD_SPAWN_RADIUS_NEAR` | `1500` | Primary food spawn radius around player |
| `FOOD_SPAWN_RADIUS_FAR` | `2500` | Some food scattered further out |
| `FOOD_FAR_FRACTION` | `0.15` | 15% of replenishment food spawns far |
| `FOOD_COUNT_TARGET` | `1200` | Total food orbs target in the world (from game-config.ts) |

### Replay Recording
| Constant | Value | Purpose |
|---|---|---|
| `REPLAY_PRE_MAX` | `450` | 15s at 30Hz before death (circular buffer) |
| `REPLAY_POST_MAX` | `450` | 15s at 30Hz after death (linear) |
| `REPLAY_VISIBLE_RADIUS` | `2500` | Only record snakes within this radius of camera |
| `REPLAY_MAX_SNAKE_POINTS` | `30` | Downsample snake points for replay |

### Extraction
| Constant | Value | Purpose |
|---|---|---|
| `EXTRACT_DURATION_MS` | `3000` | 3-second extraction hold duration (from game-config.ts) |

### Chat
| Constant | Value | Purpose |
|---|---|---|
| (chat duration) | `4000` ms | Chat bubble expiry time (`p.chatExpiry = performance.now() + 4000`) |

### Bot Personalities (array)
- `'scavenger'`, `'opportunist'`, `'hunter'`, `'extractor'`, `'coward'`

### Quick Emotes
1. `'GG! 🏆'`
2. `'Target Spot! 🎯'`
3. `'Fleeing! 🏃💨'`
4. `'Get Ripped! 💪'`
5. `'Extracting soon! ⚡'`

---

## 4. SNAKE ENGINE CONFIG (DEFAULT_SNAKE_CONFIG)

*Imported from `@/lib/snake-engine`* — used as `this.cfg`:

| Parameter | Value | Description |
|---|---|---|
| `collisionRadius` | `6` | Base collision radius in px |
| `visualRadius` | `8` | Base visual radius in px |
| `segmentSpacing` | `16` | Center-to-center distance between segments |
| `baseSpeed` | `4.5` | Normal move speed (px/tick) |
| `boostSpeed` | `8.0` | Speed while boosting (px/tick) |
| `turnBase` | `0.35` | Base turn rate (rad/tick) |
| `turnMin` | `0.08` | Minimum turn rate at max score |
| `turnScoreFactor` | `0.0003` | Score penalty per point to turn rate |
| `initialBodyLength` | `20` | Starting segments at spawn |
| `initialSpawnScore` | `20` | Starting display score (INITIAL_SPAWN_SCORE) |
| `maxSegments` | `200` | Hard cap on body segments |
| `lengthLogFactor` | `20` | Logarithmic growth factor for body length |
| `maxExtraRadius` | `3` | Max additional visual radius from growth |
| `thicknessLogFactor` | `0.5` | Logarithmic growth factor for thickness |
| `boostMinLength` | `8` | Minimum body segments to activate boost |
| `boostDropInterval` | `10` | Frames between tail drops while boosting |
| `hitFactor` | `0.75` | Body collision multiplier (0-1) |
| `headOnHitFactor` | `0.8` | Head-on collision multiplier (0-1) |
| `neckAngleThreshold` | `60` | Degrees for neck protection pass-through |
| `neckSegmentCount` | `5` | Number of neck segments protected |
| `foodSmallValue` | `1` | Small orb score value |
| `foodSmallRadius` | `3` | Small orb visual radius |
| `foodSmallWeight` | `0.93` | Small orb spawn weight (93%) |
| `foodMediumValue` | `3` | Medium orb score value |
| `foodMediumRadius` | `5` | Medium orb visual radius |
| `foodMediumWeight` | `0.04` | Medium orb spawn weight (4%) |
| `foodLargeValue` | `5` | Large orb score value |
| `foodLargeRadius` | `8` | Large orb visual radius |
| `foodLargeWeight` | `0.03` | Large orb spawn weight (3%) |
| `foodCountTarget` | `1200` | Total food orbs per arena |
| `extractionDurationMs` | `3000` | 3-second extraction hold |
| `extractionGlideSpeed` | `3.2` | Speed while extracting |
| `spawnProtectionMs` | `4000` | 4-second spawn protection |
| `botEvadeRadius` | `300` | Bot evasion scan radius |
| `botFoodScanRadius` | `300` | Bot food scanning radius |

---

## 5. GROWTH/PHYSICS FORMULAS

### Body Length
[CODE COMMENT] "Uses logarithmic scaling with a hard cap."
- Formula: `initialBodyLength + min(maxExtra, logFactor × ln(1 + score))`
- Score 0: 20 segments
- Score 100: ~31 segments
- Score 1,000: ~38 segments
- Score 10,000: ~46 segments
- Score 100,000: ~53 segments
- Hard cap: maxSegments (200)

### Visual Radius
[CODE COMMENT] "Grows very slowly with diminishing returns."
- Formula: `baseVisualRadius + min(maxExtra, thicknessFactor × ln(1 + score))`
- Score 0: 8px, Score 1,000: ~8.35px, Score 10,000: ~8.69px, Score 100,000: ~9.04px
- Hard cap: 8 + 3 = 11px

### Collision Radius
[CODE COMMENT] "Collision radius barely grows — max 1px extra even at 100k score. The gap between collision circles is what enables threading through tight spaces."
- Formula: `baseCollisionRadius + min(1, 0.1 × ln(1 + score))`
- Always between 6px and 7px

### Turn Rate
[CODE COMMENT] "Higher score = slower turning (heavier snake)."
- Formula: `max(turnMin, turnBase - turnScoreFactor × score)`
- Range: `0.08` to `0.35` rad/tick

### Speed
- If extracting: `3.2` px/tick
- If boosting: `8.0` px/tick
- Otherwise: `4.5` px/tick

### Head Movement
- `newX = x + cos(angle) × speed`
- `newY = y + sin(angle) × speed`

### Turn Toward
- Wraps angle difference to [-π, π]
- If `|diff| <= maxStep`, snaps to desired
- Otherwise moves by `sign(diff) × maxStep`

---

## 6. GAME LOOP SYSTEM

### `frame(now)` — Main rAF Loop
- Calls `updateFps(now)`
- Calls `updateParticles(dt)`
- Physics: accumulates `dt` into `accumulator`; runs `tickPhysics(now)` while `accumulator >= TICK_MS` with safety limit of 4 ticks max
- If `safety === 0`, resets `accumulator` to 0 (spiral-of-death prevention)
- Post-death: counts down `postDeathTicksRemaining`
- Calls `render(now)`
- Calls `updateHUD()`

### `tickPhysics(now)` — One Server-Tick Equivalent (13 steps)
1. Increment `tick`
2. **Player input** — `computePlayerInput()` → sets `desiredAngle`, `wantsBoost`, `isBoosting`
3. **Extraction progress** — increments by `TICK_MS` (33ms); completes at `extractionDurationMs` (3000ms)
4. **Move player** — `tickSnakeMovement(p, desiredAngle, wantsBoost)`
5. **Virtual bot positions** — `updateVirtualBotPositions()` + `activateNearbyBots()`
6. **Bot AI** — loops all active bots: `tickBot(bot, now)`
7. **Boost food drops** — processes `boostDropQueue`; creates small food orbs (size=3, value=1, green `#34d399`/`#10b981`)
8. **Build spatial grid** — clears grid, inserts all snake segments (every 2nd) + all food
9. **Eat food** — `eatFood()` for player + all bots
10. **Collision detection** — `detectCollisions(now)`
11. **Apply deaths + drop food** — computes death food drops, credits kills, removes dead bots
12. **Replenish food** — `replenishFood()`
13. **Expire chat** — `expireChat(now)`
14. **Update camera** — `updateCamera()`
15. **Capture replay snapshot** — `captureReplaySnapshot()`

---

## 7. SNAKE MOVEMENT (`tickSnakeMovement`)

1. **Turn:** `snake.angle = engineTurnToward(snake.angle, desiredAngle, calcTurnRate(snake.score, cfg))`
2. **Boost check:** `isBoosting = wantsBoost && points.length > boostMinLength (8) && score > 0`
3. **Boost tail shedding:**
   - Increments `boostFrameCounter`
   - When `boostFrameCounter >= boostDropInterval (10)`: resets counter
   - If `points.length > boostMinLength + 1 (9)` AND `score > 1`:
     - Pushes tail position to `boostDropQueue`
     - Pops last point
     - `score = max(0, score - 1)`
4. **Move head:** `moveHead(head, angle, speed)` — unshifts new head to points[0]
5. **Body length regulation:** target = `max(boostMinLength + 1, calcBodyLength(score, cfg))`; pops excess points
6. **Update radii:** `snake.size = calcVisualRadius(score, cfg)`, `snake.collisionRadius = calcCollisionRadius(score, cfg)`

---

## 8. BOT AI SYSTEM

### Personality Assignment
- Virtual bots are assigned personalities in round-robin: `PERSONALITIES[i % 5]`
- 5 personalities: `'scavenger'`, `'opportunist'`, `'hunter'`, `'extractor'`, `'coward'`

### Bot Think Cycle
- Think interval: `BOT_THINK_INTERVAL_MS (120) + random(0..BOT_THINK_JITTER_MS (80))` = 120–200ms
- Each think cycle, a bot makes one decision

### Bot AI Decision Tree (in priority order)

1. **Predictive evasion against the human player**
   - Condition: player exists, alive, has points, not spawn-protected
   - Check: `playerDist < botEvadeRadius * 2 (600)`
   - Prediction: `predictedX = playerHead.x + cos(p.angle) × BOT_PREDICT_SPEED × BOT_PREDICT_AHEAD_TICKS`
   - Same for Y
   - If `distToPredicted < (bot.size + p.size) * 3`: EVADE
   - Evade direction: perpendicular to player heading ±90° (random 50/50 choice)
   - Hunter personality also boosts while evading if `score > 10`

2. **Predictive evasion against other bot heads**
   - Loops all other active bots
   - Check: `otherDist < 200`
   - Same prediction formula as above
   - If `distToPredicted < (bot.size + other.size) * 3`: EVADE
   - Evade direction: perpendicular ±90° (random 50/50)
   - Does NOT boost while evading other bots

3. **Flee from nearby body segments**
   - Scans grid for segments within `BOT_THREAT_SCAN_RADIUS (250)`
   - Skips own segments and head segments (segIdx === 0)
   - Finds nearest foreign body segment
   - Condition: `threatDist < 150`
   - Action: flee directly away: `angle = atan2(head.y - threatY, head.x - threatX)`

4. **Seek nearest food**
   - Scans grid for food within `cfg.botFoodScanRadius (300)`
   - Finds nearest food with value > 0
   - Action: head toward food: `angle = atan2(food.y - head.y, food.x - head.x)`

5. **Wander** (fallback)
   - Action: `angle = bot.angle + (random() - 0.5) * 0.4`
   - Random angular drift of ±0.2 radians

[CODE COMMENT] "NO edge avoidance — infinite map, no boundaries."

### Bot Boost Behavior
- After the think decision, outside the think block:
  - Hunter personality: `score > 5` AND `random() < 0.05` (5% chance per tick)
- All other personalities: never boost (unless evading player, see above)

### No Self-Destruct
[CODE COMMENT] "Bot AI — no self-destruct, seek food, predictive evasion"

---

## 9. VIRTUAL BOT POOL SYSTEM

### `createVirtualBotPool(cx, cy)`
[CODE COMMENT] "Create 1000 virtual bot definitions with cheap positions spread around (cx, cy)."
- Creates `VIRTUAL_BOT_COUNT (1000)` virtual bots
- Name: `BOT_NAMES[i % 20]`, with `-N` suffix for duplicates
- Skin: `BOT_SKINS[i % 6]`
- Personality: `PERSONALITIES[i % 5]`
- ID: `bot-${arena.id}-${i}`
- Initial score: `floor(random() * 80)` (0–79)
- Position: `randomPointInCircle(cx, cy, VIRTUAL_WORLD_RADIUS (8000))`
- Angle: `random() * 2π`
- `isActive: false`

### `updateVirtualBotPositions()`
[CODE COMMENT] "Cheaply update all virtual bot positions (straight-line wander). Called every tick but is very lightweight."
- Skips active bots (moved by full physics)
- Deterministic pseudo-random angle tweak: `((tick + i) * 7919) % 1000 < 20` (~2% chance per tick)
- Angle adjustment: `((tick + i) * 3571) % 1000 - 500) * 0.0016`
- Movement: `x += cos(angle) * VIRTUAL_BOT_SPEED (2.5)`, same for Y

### `activateNearbyBots()`
- **Deactivation:** Active bots beyond `DEACTIVATION_RADIUS (3500)` from player get state saved back to virtual bot, then removed
- **Activation scan:** Only scans every 10 ticks (line: `if (this.tick % 10 !== 0) return`)
- Stops if `bots.size >= MAX_ACTIVE_BOTS (60)`
- Activates inactive virtual bots within `ACTIVATION_RADIUS (2500)` of player

### `createActiveBotFromVirtual(vb, playerX, playerY)`
- Creates full `BotSession` from `VirtualBot`
- Body length: `calcBodyLength(vb.score, cfg)`
- Initial body: `initialBody(vb.x, vb.y, angle, bodyLen, cfg.segmentSpacing (16))`
- Spawn protection: `now + cfg.spawnProtectionMs (4000)`
- `nextThinkAt: 0` (thinks immediately)

### `respawnVirtualBot(vb, playerX, playerY)`
- Sets `isActive: false`
- Spawns at `randomPointInCircle(playerX, playerY, VIRTUAL_WORLD_RADIUS (8000))`
- If spawn is too close (< 1500): forced to `1500 + random() * 2000` distance away
- Random angle, random score: `floor(random() * 80)`

---

## 10. COLLISION DETECTION (`detectCollisions`)

### Head-on Collision (checked FIRST, takes priority)
- Pairs all living snakes (O(n²))
- Skips spawn-protected snakes
- Deduplicates pairs via sorted ID key
- Hit distance: `(size_a + size_b) * cfg.headOnHitFactor (0.8)`
- **Resolution rules:**
  - Equal total score → **both die**
  - A boosting, B not boosting → **B dies** (boost advantage)
  - B boosting, A not boosting → **A dies** (boost advantage)
  - Both boosting or neither → **higher total score wins**
- Death cause: `'headon'`

### Body Collision (head vs foreign non-head segment)
[CODE COMMENT] "NO wall collision — infinite map."
- For each living, non-dead, non-protected snake:
  - Query grid within `snake.size + 30` radius
  - Skip own segments (`item.snakeId === snake.id`)
  - Skip head segments (`item.segIdx === 0` — handled by head-on)
  - **Neck protection:** Skip segments where `segIdx <= 5` (first 6 segments)
  - Hit distance: `(snake.size + item.radius) * cfg.hitFactor (0.75)`
  - First collision kills the head snake
  - Death cause: `'body'`

### Neck Protection Detail
- In offline engine: simple index check — `segIdx <= 5` → skip
- In the engine library (`isNeckProtected`): angle-based approach check (not used in offline; offline uses simpler index check)

---

## 11. FOOD SYSTEM

### Food Orb Definitions (from `getFoodOrbs`)
| Size | Value | Radius | Weight | Color | Glow Color |
|---|---|---|---|---|---|
| small | 1 | 3px | 0.93 (93%) | `#34d399` | `#10b981` |
| medium | 3 | 5px | 0.04 (4%) | `#38bdf8` | `#0ea5e9` |
| large | 5 | 8px | 0.03 (3%) | `#f472b6` | `#ec4899` |

### Food Orb Selection
- Weighted random selection via `randomFoodOrb()`

### Food Spawning
- Initial spawn: `cfg.foodCountTarget (1200)` orbs around origin (0,0)
- 15% (`FOOD_FAR_FRACTION`) spawn far (within 2500px), rest within 1500px
- `createFoodOrb()`: picks random orb from weighted pool, places at `randomPointInCircle(cx, cy, radius)`
- `randomPointInCircle`: `r = sqrt(random()) * maxR` (uniform distribution in circle)

### Food Replenishment (`replenishFood`)
- Removes eaten food (value <= 0)
- Spawns new food around player's current head position
- Up to `FOOD_COUNT_TARGET (1200)` total
- Guard limit: max 50 new food per tick
- Same 15% far fraction

### Food Eating (`eatFoodForSnake`)
- Queries grid within `snake.collisionRadius + 20` of head
- Eat condition: `dist < snake.collisionRadius + item.radius + 6`
- On eat: `snake.score += eatenValue`; sets food `value = 0`
- Player-only effects:
  - Sound: `playFoodCollect(orbSize)`
  - Particles: `spawnEatParticles(x, y, size, color)` — 4 particles

### Boost Food Drops
- When boosting and `boostFrameCounter >= boostDropInterval (10)`:
  - Creates a small food orb at tail position
  - Properties: `size: 3, value: 1, color: '#34d399', glowColor: '#10b981', orbSize: 'small'`

### Death Food Drop
- Total score used: `cfg.initialSpawnScore (20) + snake.score`
- `calcDeathFood(totalScore, false)` → `[smallCount, mediumCount, largeCount]`
  - `largeCount = floor(score / 5)`
  - `remainder = score - largeCount * 5`
  - `mediumCount = floor(remainder / 3)`
  - `smallCount = remainder - mediumCount * 3`
- Orbs are shuffled
- Distributed evenly along the dead snake's body
- Scatter: `±7.5px` (random offset of `(random()-0.5) * 15`)

---

## 12. SPAWN SYSTEM

### Player Spawn
- Position: origin `(0, 0)`, facing east (angle = 0)
- Body: `initialBody(0, 0, 0, cfg.initialBodyLength (20), cfg.segmentSpacing (16))`
- Score: 0 (display score = INITIAL_SPAWN_SCORE + 0 = 20)
- Spawn protection: `performance.now() + cfg.spawnProtectionMs (4000)` (4 seconds)
- Default color: `'#22c55e'` (green-500) / secondary `'#15803d'` (green-700)
- Skin resolved from: localStorage `'venom_custom_skin_state'` → `playerProfile.currentSkin`

### Bot Spawn (on activation)
- Position: from VirtualBot's stored position
- Body length: `calcBodyLength(vb.score, cfg)`
- Spawn protection: `now + cfg.spawnProtectionMs (4000)` (4 seconds)
- Score: from virtual bot (0–79)

### Safe Respawn (virtual bot recycling)
- If respawned position < 1500px from player, forced to `1500 + random() * 2000` away

---

## 13. BOOST MECHANICS

### Activation Conditions
- `wantsBoost == true`
- `snake.points.length > cfg.boostMinLength (8)`
- `snake.score > 0`

### Speed While Boosting
- `8.0` px/tick (vs normal `4.5` px/tick)
- Speed multiplier: ~1.78x

### Cost While Boosting
- Every `boostDropInterval (10)` ticks:
  - Tail segment removed (if length > `boostMinLength + 1 = 9`)
  - Score decreased by 1 (min 0)
  - Small food orb (value=1) dropped at tail position
- This means boost costs 1 score per 10 ticks = ~3 score/second at 30Hz

### Sound Effects
- `playBoost()` when player starts boosting (transition from not-boosting to boosting)

---

## 14. DEATH MECHANICS

### Player Death Flow
1. Collision detected → player ID in deaths array
2. Death food computed from `cfg.initialSpawnScore + p.score`
3. `playerDied = true`
4. `p.isDead = true`
5. `playDeath()` — dramatic crash sound
6. `enterPostDeathRecording()` — begins 15s post-death recording
7. Death particles spawned at head position (24 particles in normal quality, 8 in low quality)
8. After post-death recording completes:
   - Final score computed: `INITIAL_SPAWN_SCORE + player.score`
   - Final kills: `player.kills`
   - Final duration: `floor((now - startTime) / 1000)` seconds
   - State transitions to `'dead'`
   - End screen shown (`showEndScreen('death')`)

### Bot Death Flow
1. Collision detected → bot ID in deaths array
2. `bot.isDead = true`
3. Death food computed and added to world
4. Kill credited to player if `d.killerId === p.id` → `p.kills++`, `playKill()` sound
5. Virtual bot recycled via `respawnVirtualBot()`
6. Bot removed from active bots map

### Post-Death Recording (`tickPostDeathPhysics`)
- Runs for `REPLAY_POST_MAX (450)` ticks (15 seconds at 30Hz)
- Bots continue to move, eat, collide, die
- Player is dead (no player physics)
- Food replenishment continues
- Camera freezes at death position (`deathCamX`, `deathCamY`)
- Spatial grid rebuilt with bots + food only

### End Screen Outcomes
- **Death:** Title "Arena Disintegration!", color `#ef4444`, icon 💀
  - Subtitle: "Your snake was destroyed! Final score: X. No chips were wagered or lost — offline practice only."
  - Shows: Final Score, Opponents Eliminated (Kills), Survival Time
  - Buttons: "WATCH DEATH REPLAY" (if > 20 frames), "PLAY AGAIN", "RETURN TO LOBBY"
- **Extract:** Title "Practice Run Completed!", color `#fbbf24`, icon 🧭
  - Subtitle: "Practice run finished! You eliminated X training bots, reached a score of X, and survived for Xm Xs."
  - Same stats display
  - Shows "Offline Training Complete" box
  - Buttons: "PLAY AGAIN", "RETURN TO LOBBY" (no replay option)

---

## 15. STATE MACHINE

### States: `'playing'` → `'dead'` → (lobby) / `'playing'` → `'extracted'` → (lobby)

### Transitions:
- `'playing'` → `'dead'`: Player dies and post-death recording completes
- `'playing'` → `'extracted'`: Extraction hold completes (3 seconds)
- `'dead'` → `'playing'`: "PLAY AGAIN" button pressed (resets world)
- `'extracted'` → `'playing'`: "PLAY AGAIN" button pressed (resets world)
- Any non-`'playing'` state → lobby: ESC key or "RETURN TO LOBBY" button

### `setState(s)`
- No-op if same state
- Calls `onStateChange(s)` callback (error caught and ignored)

---

## 16. CAMERA SYSTEM

[CODE COMMENT] "Camera (follows player, no world bounds)"

### Camera Initialization
- Default zoom: `0.9`
- Snaps to player head position on first frame

### Camera Follow
- Lerp factor: `0.18`
- `cam.x += (head.x - cam.x) * 0.18`
- `cam.y += (head.y - cam.y) * 0.18`

### Camera Zoom
- Base zoom: mobile = `0.58`, desktop = `0.9`
- Zoom out as body grows: `max(baseZoom * 0.65, baseZoom - (len - initialBodyLength) * 0.005)`
- Zoom lerp: `cam.zoom += (targetZoom - cam.zoom) * 0.05`
- Mobile detection: `window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768`

### Infinite Grid Rendering
- Grid size: `60` px
- Grid lines: `strokeStyle = '#1e293b'`, `lineWidth = 1/zoom`
- Origin crosshair: `strokeStyle = '#334155'`, `lineWidth = 1.5/zoom`
- View rect clamped to avoid extreme ranges
- Background: `'#020617'`
- World size placeholder: `1000000` (for render helpers, though map is infinite)

---

## 17. SPATIAL HASH GRID

[CODE COMMENT] "Spatial hash grid — slimmed-down client port of the server's grid. Items are bucketed into square cells; queries return a deduplicated Map."

- Default cell size: `120` px
- `insert(item)`: Inserts into all overlapping cells (based on item position ± radius)
- `queryRadius(x, y, r)`: Returns deduplicated `Map<string, GridItem>` of items in overlapping cells
- `clear()`: Empties all cells

### Snake Grid Insertion (`insertSnakeIntoGrid`)
- Inserts every **2nd** point (`i += 2`) as a segment
- Grid item ID: `${snake.id}:${i}`
- Kind: `'segment'`, radius: `snake.collisionRadius`

---

## 18. INPUT SYSTEM

### Mouse
- `mousemove` → stores canvas-relative position
- Direction: `atan2(dy, dx)` from canvas center
- Deadzone: `MOUSE_DEADZONE_PX (15)` px from center
- `blur` → clears mouse active

### Keyboard
- Direction: W/A/S/D or Arrow keys
- Boost: Space bar
- Extract: Hold E key
- Emotes: Keys 1-5
- Exit: Escape (when not playing)
- Prevents default on arrows, space, spacebar
- `blur` → clears all keys, cancels extract

### Touch (Joystick)
- Joystick detection zone: bottom-left quadrant of canvas (`x < width/2 && y > height/2`)
- Joystick visual: outer radius `JOYSTICK_MAX_RADIUS_PX (70)`, inner thumb radius `24` px
- Outer ring: `rgba(129, 140, 248, 0.12)` fill, `rgba(129, 140, 248, 0.5)` stroke
- Inner thumb: `rgba(129, 140, 248, 0.85)` fill
- Deadzone: `JOYSTICK_DEADZONE (0.18)` magnitude
- Boost threshold: `JOYSTICK_BOOST_MAGNITUDE (0.6)` magnitude
- Magnitude clamped to `1.0`

### Mobile Controls (DOM buttons)
- **BOOST** button: 64×64px circle, bottom-right, amber border, ⚡ icon
  - `pointerdown` → sets `boostHold = true`, adds space to keys
  - `pointerup`/`pointercancel` → releases
- **EXTRACT** button: 80×80px circle, bottom-right, green border, 🏆 icon
  - `pointerdown` → begins extraction
  - `pointerup`/`pointercancel` → cancels extraction

---

## 19. EXTRACTION SYSTEM

### Start
- Trigger: Hold E key (keyboard) or hold EXTRACT button (mobile)
- `beginExtract()`: Sets `isExtracting = true`, `extractionProgress = 0`
- Shows extraction progress bar, hides idle hint

### Progress
- Increments by `TICK_MS (33)` per physics tick
- Completes at `EXTRACT_DURATION_MS (3000)` = ~3 seconds
- HUD shows percentage bar with `width` transition of `80ms linear`

### Cancel
- Trigger: Release E key or release EXTRACT button or window blur
- `cancelExtract()`: Resets `isExtracting`, `extractionProgress`, hides bar, shows hint

### Complete
- `finishExtract()`: Computes final score, kills, duration → state `'extracted'` → end screen

### Speed While Extracting
- `calcSpeed(false, true, cfg)` = `extractionGlideSpeed (3.2)` px/tick

---

## 20. OPACITY LAYERING SYSTEM

[CODE COMMENT] "Opacity layering — larger snakes fade when a smaller snake is near."

### Logic (`drawAllSnakes`)
1. Culling: Only render snakes within `VIEW_RADIUS (1500)` of camera center
2. Initialize all snakes to opacity `1.0`
3. For each pair of visible snakes (A, B):
   - If A's total score < B's total score (A is smaller):
     - `proximityThreshold = (a.size + b.size) * OPACITY_PROXIMITY_FACTOR (3)`
     - If `dist(A.head, B.head) < proximityThreshold`:
       - B's opacity → `min(current, OPACITY_FADE_TO (0.75))`
4. Bots rendered first, player last (on top)

---

## 21. PARTICLE SYSTEM

### `updateParticles(dtMs)`
- Updates position: `p.x += p.vx * dt`, `p.y += p.vy * dt` (dt in seconds)
- Damping: `p.vx *= 0.96`, `p.vy *= 0.96` per frame
- Life decrement: `p.life -= dtMs`
- Removes when `life <= 0`
- Cap: if `length > MAX_PARTICLES (200)`, removes oldest

### `spawnEatParticles(x, y, size, color)`
- Count: `4` particles
- Speed: `30 + random() * 50` px/s (30–80)
- Life: `350 + random() * 150` ms (350–500)
- `maxLife: 500`
- Size: `max(1, size * 0.6)`
- Skipped entirely in low quality mode

### `spawnDeathParticles(x, y, color)`
- Count: `24` (normal) or `8` (low quality)
- Speed: `80 + random() * 180` px/s (80–260)
- Life: `700 + random() * 400` ms (700–1100)
- `maxLife: 1100`
- Size: `3 + random() * 3` px (3–6)

---

## 22. ADAPTIVE QUALITY SYSTEM

### `updateFps(now)`
- Measures FPS every second
- If FPS < `FPS_LOW_THRESHOLD (40)` for `FPS_LOW_DURATION_MS (2000)`: enables `lowQuality`
- If FPS > `FPS_HIGH_THRESHOLD (55)` for `FPS_HIGH_DURATION_MS (5000)`: disables `lowQuality`
- Mid-range FPS (40–55): resets both timers

### Low Quality Effects
- No glow/shadow on food orbs
- No eat particles
- Reduced death particles (8 vs 24)
- Passes `lowQuality: true` to `FrameRenderCtx`

---

## 23. RENDERING SYSTEM

### Canvas Setup
- DPR: `min(devicePixelRatio, 2)`
- `{ alpha: false }` context
- `touchAction: 'none'`, `outline: 'none'`
- `ResizeObserver` for dynamic resizing
- Metallic gradient cache cleared on resize

### Render Order
1. Clear background: `#020617`
2. Infinite grid
3. Food orbs (batched by size)
4. Snakes with opacity layering (bots first, player on top)
5. Particles
6. Reset transform → screen-space overlays (joystick)

### Food Orb Rendering
- **Small:** Batched circles, fill `#34d399`, glow `#10b981`, shadowBlur `4`
- **Medium:** Batched circles, fill `#38bdf8`, glow `#0ea5e9`, shadowBlur `8`
- **Large:** Batched circles, fill `#f472b6`, glow `#ec4899`, shadowBlur `14`, plus outer ring: `rgba(236, 72, 153, 0.4)` at `radius + 3`, lineWidth `2/zoom`
- View culling: skips food outside `computeVisibleRect`

### Snake Rendering
- Downsampled to `MAX_SNAPSHOT_POINTS (60)` if longer
- Delegated to `drawSnake()` from `render-helpers`
- Extraction progress passed as `Math.min(1, extractionProgress / EXTRACT_DURATION_MS)`
- `carriedChips: 0` always (no chips in offline)

---

## 24. REPLAY SYSTEM

### Recording
- **Pre-death buffer:** Circular buffer of `REPLAY_PRE_MAX (450)` frames (15s at 30Hz)
- **Post-death buffer:** Linear buffer of `REPLAY_POST_MAX (450)` frames (15s)
- **Visible radius:** Only records snakes/food within `REPLAY_VISIBLE_RADIUS (2500)` of camera
- **Snake downsampling:** Max `REPLAY_MAX_SNAKE_POINTS (30)` points per snake
- Dead player included for first 30 post-death frames (1 second)

### Snapshot Content (`ReplayFrame`)
- All visible snakes (position, angle, size, color, score, isBoosting, isPlayer, isDead)
- All visible food (position, size, value, color, glowColor, orbSize)
- Camera position (camX, camY, camZoom)

### Playback
- Separate canvas: `90vw × 800px max`, 16:9 aspect ratio
- Default zoom: `0.8`
- Frame rate: 30Hz (`1000/30 / replaySpeed` ms per frame)
- Speed options: `[0.25, 0.5, 1, 2]`x
- Zoom range: `0.3` to `2.0`, step `0.15`
- Controls: Restart, Play/Pause, Speed toggle, Zoom ±, Exit
- Progress bar with death marker (gold `#fbbf24`, 2px wide)
- Frame counter display
- Overlay text: "⏺ REPLAY", pre/post death timing
- Loop: `(playbackIdx + 1) % frames.length` (loops when reaching end)

### Replay Rendering
- Grid: same `60px` grid, `#1e293b` lines
- Food: simple filled circles (no glow)
- Snakes: stroke with `size * 2` lineWidth, round cap/join
- Snake head: filled circle at `size * 1.2`
- Player highlight: outer stroke `rgba(250, 204, 21, 0.5)` at `size * 2.5`
- Name tags: bold 10px sans-serif, player `#fcd34d`, others `#e2e8f0`

---

## 25. HUD SYSTEM

### Top-Left Stack
- **Score card:** Label "Score:", bold white value
- **Stats card:**
  - "Kills:" with red `#f43f5e` dot and value
  - "Rank:" with yellow `#eab308` dot and value
  - "Boost:" with amber `#f59e0b` dot, static text "SPACE"
  - "Bots:" with slate `#cbd5e1` dot, value = `VIRTUAL_BOT_COUNT (1000)` (always shows total, not active)

### Top-Right Stack
- **FPS display:** Slate `#94a3b8` text, bordered card
- **Leaderboard:** Toggle-able (▾/▸), shows top 10 by total score
  - Player row highlighted: green bg `rgba(34,197,94,0.15)`, text `#86efac`
- Bot rows: `#cbd5e1` text
- Ranks: `#64748b`, bold, 20px min-width
- Signature-based DOM update (only rebuilds if scores change)

### Top-Center
- Extract hint: "Hold E or tap EXTRACT to end your practice run." (hidden during extraction)
- Extract progress bar: 200×8px, gradient `#eab308 → #f59e0b`, 80ms transition, percentage text `#fbbf24`

### Bottom-Left
- Emote bar: 5 buttons mapped to keys 1-5
- Leave button: "⨯ Leave", positioned at `bottom: 96px`

### Bottom-Right (mobile)
- BOOST button: 64×64px, amber
- EXTRACT button: 80×80px, green

---

## 26. SKIN RESOLUTION

### `resolvePlayerSkin()`
1. Check `localStorage` key `'venom_custom_skin_state'`
2. Parse JSON, look for `useCustomSkin: true` and `currentSkin`
3. Exclude `'custom-lab-skin'`
4. Fall back to `playerProfile.currentSkin` via `getCosmeticById()`
5. Error caught and ignored

---

## 27. BOT NAMES (20 total)
`ViperStrike, NeonFang, CyberCobra, ToxicPython, ShadowAdder, ChronoKrait, QuantumMamba, AeroBoa, SavageSerpent, GlitchViper, ApexPredator, GhostScale, MatrixAsp, Synthetix, StaticFang, VectorVenom, OmegaSlink, BetaByte, RattleTech, HoloHydra`

### BOT SKINS (6 total)
| Color | Secondary |
|---|---|
| `#22c55e` | `#15803d` |
| `#a855f7` | `#6b21a8` |
| `#06b6d4` | `#0891b2` |
| `#ec4899` | `#8b5cf6` |
| `#f59e0b` | `#b45309` |
| `#ef4444` | `#991b1b` |

---

## 28. CHAT SYSTEM

### Player Chat
- Keys 1-5 trigger quick emotes
- `setPlayerChat(msg)`: sets `chatMessage`, `chatExpiry = now + 4000`
- Expired after 4 seconds

### Bot Chat
- Bots have `chatMessage?` and `chatExpiry?` fields
- Same 4-second expiry
- No bot chat generation observed in this file (only player-triggered)

---

## 29. PLAY AGAIN / EXIT

### `handlePlayAgain()`
- Removes end overlay
- Clears all replay state (pre buffer, post buffer, frames, death index)
- Exits replay mode if active
- Calls `resetWorld()`
- Resets `startTime`, `accumulator`
- Hides extraction bar, shows idle hint

### `handleExitToLobby()`
- Constructs `OfflineExitResult` with `finalScore`, `finalKills`, `finalDurationSeconds`
- Calls `onExit(result)` callback (error caught and ignored)

---

## 30. COMPLETE FUNCTION INDEX

| Function | Purpose |
|---|---|
| `dist(ax,ay,bx,by)` | Euclidean distance (local helper) |
| `randomPointInCircle(cx,cy,maxR)` | Uniform random point in circle using `sqrt(random())` distribution |
| `initialBody(headX,headY,angle,length,spacing)` | Creates initial body points along reverse angle |
| `createFoodOrb(...)` | Creates a Food object from weighted random orb + random position |
| `computeDeathFoodDrop(...)` | Computes and distributes death food along body |
| `SpatialHashGrid.constructor(cellSize=120)` | Creates spatial hash with given cell size |
| `SpatialHashGrid.clear()` | Empties all cells |
| `SpatialHashGrid.insert(item)` | Inserts item into overlapping cells |
| `SpatialHashGrid.queryRadius(x,y,r)` | Queries items within radius, deduplicated |
| `OfflineGameEngine.constructor(arena,profile,canvas)` | Initializes engine with config, canvas, skin, bound listeners |
| `start()` | Sets up canvas, input, HUD, world; begins rAF loop; inits audio |
| `stop()` | Stops rAF, exits replay, detaches input, teardown HUD |
| `resolvePlayerSkin()` | Resolves player skin from localStorage or profile |
| `setupCanvas()` | Sets touch-action, outline, initial resize, ResizeObserver |
| `handleResize()` | Resizes canvas to match CSS size × DPR (capped at 2) |
| `resetWorld()` | Clears all state, spawns player at origin, creates virtual pool, activates bots, spawns food |
| `createVirtualBotPool(cx,cy)` | Creates 1000 virtual bot definitions |
| `updateVirtualBotPositions()` | Cheap straight-line wander for all inactive virtual bots |
| `activateNearbyBots()` | Activates nearby virtual bots, deactivates far active bots |
| `createActiveBotFromVirtual(vb,px,py)` | Creates full BotSession from VirtualBot |
| `respawnVirtualBot(vb,px,py)` | Resets dead virtual bot to random position |
| `idCounterObj` | Getter returning `{value: this.idCounter}` for pass-by-reference |
| `attachInput()` | Attaches mouse, touch, keyboard, blur listeners |
| `detachInput()` | Removes all input listeners |
| `onMouseMove(e)` | Updates mousePos, sets mouseActive |
| `onTouchStart(e)` | Initializes joystick from bottom-left quadrant touch |
| `onTouchMove(e)` | Updates joystick position, computes angle and boost |
| `onTouchEnd(e)` | Clears joystick if touch ended |
| `findJoystickTouch(touches)` | Finds touch in bottom-left quadrant of canvas |
| `onKeyDown(e)` | Handles keyboard: arrows, space, E, emotes, ESC, blur |
| `onKeyUp(e)` | Handles key release: E (cancel extract), space |
| `onBlur()` | Clears all keys, mouse, cancels extract |
| `beginExtract()` | Starts extraction if player alive and not already extracting |
| `cancelExtract()` | Cancels extraction, resets progress, toggles UI |
| `finishExtract()` | Completes extraction, sets final stats, transitions to `'extracted'` |
| `setPlayerChat(msg)` | Sets player chat message with 4s expiry |
| `frame(now)` | Main rAF loop: FPS, particles, physics ticks, render, HUD |
| `tickPhysics(now)` | Full physics tick (13 steps) |
| `tickSnakeMovement(snake,desiredAngle,wantsBoost)` | Turns, moves head, manages boost, regulates body length |
| `tickBot(bot,now)` | Bot AI: predictive evasion, threat flee, food seek, wander |
| `insertSnakeIntoGrid(snake)` | Inserts every 2nd segment into spatial grid |
| `eatFood()` | Eats food for player + all bots |
| `eatFoodForSnake(snake)` | Eats nearby food for one snake, plays sound/particles for player |
| `detectCollisions(now)` | Head-on + body collision detection |
| `enterPostDeathRecording()` | Begins 15s post-death recording, spawns death particles |
| `tickPostDeathPhysics(now)` | Bot-only physics during post-death recording |
| `captureReplaySnapshot()` | Records frame data for replay |
| `finishPostDeathRecording()` | Ends post-death recording, assembles replay, shows death screen |
| `getPreDeathFrames()` | Reads circular pre-death buffer in order |
| `replenishFood()` | Removes eaten food, spawns new food toward target count |
| `expireChat(now)` | Removes expired chat messages |
| `updateCamera()` | Lerps camera to player head, adjusts zoom |
| `computePlayerInput()` | Computes desired angle + boost from mouse/keyboard/touch |
| `render(now)` | Main render: background, grid, food, snakes, particles, joystick |
| `drawInfiniteGrid(ctx,rc)` | Renders infinite grid lines + origin crosshair |
| `drawFoodOrbs(ctx,rc)` | Renders food orbs batched by size with glow |
| `drawAllSnakes(ctx,rc,now)` | Renders all visible snakes with opacity layering |
| `drawSnakeSnapshot(rc,snake)` | Renders a single snake (downsampled to 60 pts) |
| `drawJoystick(ctx)` | Renders touch joystick overlay |
| `updateParticles(dtMs)` | Updates particle positions, damping, life, culling |
| `spawnEatParticles(x,y,size,color)` | Spawns 4 eat particles |
| `spawnDeathParticles(x,y,color)` | Spawns 24 (or 8) death particles |
| `updateFps(now)` | Measures FPS, triggers adaptive quality changes |
| `setState(s)` | State machine transition with callback |
| `buildHUD()` | Constructs full HUD DOM (score, kills, rank, FPS, leaderboard, emotes, mobile controls) |
| `makeHudCard(rows)` | Creates a styled HUD card container |
| `makeHudRow(icon,color,label,makeValue)` | Creates a labeled HUD row with colored dot |
| `makeSpan(text,style)` | Creates a styled span element |
| `buildLeaderboard()` | Creates toggle-able top-10 score leaderboard |
| `buildEmoteBar()` | Creates 5 quick-chat emote buttons |
| `buildMobileControls()` | Creates BOOST (64px) and EXTRACT (80px) mobile buttons |
| `buildLeaveButton()` | Creates "⨯ Leave" button |
| `teardownHUD()` | Removes HUD + end overlay DOM |
| `updateHUD()` | Per-frame HUD update: score, kills, rank, bots, FPS, leaderboard, extraction |
| `showEndScreen(outcome)` | Shows death/extract end overlay with stats and action buttons |
| `enterReplayMode()` | Creates replay canvas, controls, starts playback rAF |
| `replayFrame(now)` | Renders one replay frame, advances playback |
| `exitReplayMode()` | Stops replay rAF, removes replay DOM, shows end screen |
| `handlePlayAgain()` | Resets everything and restarts |
| `handleExitToLobby()` | Calls onExit callback with final results |
