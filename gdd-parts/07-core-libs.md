# 07 — Core Libraries: Exhaustive Catalog

**Task ID:** 7
**Source files:**
1. `/tmp/venom-arena/src/lib/types.ts` (141 lines)
2. `/tmp/venom-arena/src/lib/snake-engine.ts` (663 lines)
3. `/tmp/venom-arena/src/lib/game-audio.ts` (145 lines)
4. `/tmp/venom-arena/prisma/schema.prisma` (196 lines)

---

## A. `src/lib/types.ts` — Shared Player-Facing Types

File comment: `// Shared player-facing types (used by both client and API routes)`

### A1. `PlayerProfile` (interface, exported)

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | |
| `userTag` | `string` | |
| `name` | `string` | |
| `email` | `string \| null` | |
| `country` | `string` | |
| `avatar` | `string \| null` | |
| `role` | `'player' \| 'admin'` | Union literal |
| `bankedChips` | `number` | |
| `totalEarned` | `number` | |
| `totalLost` | `number` | |
| `level` | `number` | |
| `xp` | `number` | |
| `lifetimeKills` | `number` | |
| `lifetimeDeaths` | `number` | |
| `lifetimeExtracts` | `number` | |
| `bestStreak` | `number` | |
| `biggestExtract` | `number` | |
| `dailyStreak` | `number` | |
| `lastDailyClaim` | `string \| null` | |
| `unlockedSkins` | `string[]` | JSON array encoded in DB |
| `currentSkin` | `string` | |
| `currentTrail` | `string` | |
| `currentDeath` | `string` | |
| `currentFlag` | `string \| null` | |
| `currentBanner` | `string \| null` | |
| `clanTag` | `string \| null` | |
| `clanRank` | `string \| null` | |
| `securityPin` | `boolean` | Code comment: `// true if PIN is set` |
| `oauthProvider` | `string \| null` | Code comment: `// "google" \| "facebook" \| "apple" \| null` |
| `createdAt` | `string` | |
| `lastSeenAt` | `string` | |

**Total fields: 30**

---

### A2. `LeaderboardEntry` (interface, exported)

| Field | Type | Notes |
|-------|------|-------|
| `userTag` | `string` | |
| `name` | `string` | |
| `country` | `string` | |
| `bankedChips` | `number` | |
| `level` | `number` | |
| `rank` | `number` | |
| `isPlayer` | `boolean` | Optional (`?`) |

**Total fields: 7**

---

### A3. `MatchResult` (interface, exported)

| Field | Type | Notes |
|-------|------|-------|
| `outcome` | `'extract' \| 'death'` | Union literal |
| `arenaId` | `string` | |
| `arenaName` | `string` | |
| `chipsExtracted` | `number` | Comment: `// chips taken out (extract) or lost (death)` |
| `commission` | `number` | Comment: `// 35% commission on extract (0 if <=3 players)` |
| `bankedAmount` | `number` | Comment: `// actual chips banked after commission` |
| `kills` | `number` | |
| `score` | `number` | Comment: `// body-length score at end` |
| `deaths` | `number` | Comment: `// 0 or 1` |
| `xpGained` | `number` | Comment: `// XP: floor((score*5 + kills*50) * rewardMultiplier) — only on extract` |
| `newLevel` | `number` | |
| `newBankedChips` | `number` | |
| `durationSeconds` | `number` | |
| `killerName` | `string` | Optional (`?`) |
| `killerTag` | `string` | Optional (`?`) |
| `isOffline` | `boolean` | Optional (`?`). Comment: `// true if practice mode (no XP, no chips)` |

**Total fields: 15**

---

### A4. `SnakeSnapshot` (interface, exported)

Comment above: `// Snake (used in client rendering of server snapshots)`

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | |
| `name` | `string` | |
| `userTag` | `string` | Optional (`?`) |
| `points` | `{ x: number; y: number }[]` | Array of Vec2-like objects |
| `angle` | `number` | |
| `size` | `number` | |
| `color` | `string` | |
| `secondaryColor` | `string` | Optional (`?`) |
| `isPlayer` | `boolean` | |
| `isBot` | `boolean` | |
| `carriedChips` | `number` | |
| `score` | `number` | Comment: `// body length score (INITIAL_SPAWN_SCORE + all food collected)` |
| `isExtracting` | `boolean` | |
| `extractionProgress` | `number` | Comment: `// 0..1` |
| `isDead` | `boolean` | |
| `spawnProtected` | `boolean` | |
| `chatMessage` | `string` | Optional (`?`) |
| `country` | `string` | Optional (`?`) |
| `isBoosting` | `boolean` | Comment: `// whether snake is actively boosting (for head-on collision rendering)` |
| `botState` | `'harvesting' \| 'selfDestruct'` | Optional (`?`). Comment: `// online bots only; undefined for players` |
| `visualRadius` | `number` | Optional (`?`) |
| `collisionRadius` | `number` | Optional (`?`) |

**Total fields: 22**

---

### A5. `FoodSnapshot` (interface, exported)

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | |
| `x` | `number` | |
| `y` | `number` | |
| `size` | `number` | |
| `value` | `number` | |
| `isStarChip` | `boolean` | |
| `color` | `string` | |
| `glowColor` | `string` | Optional (`?`) |
| `orbSize` | `'small' \| 'medium' \| 'large'` | Optional (`?`). Comment: `// only for regular food orbs` |

**Total fields: 9**

---

### A6. `ArenaLeaderboardEntry` (interface, exported)

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | |
| `name` | `string` | |
| `userTag` | `string` | Optional (`?`) |
| `carriedChips` | `number` | |
| `score` | `number` | |
| `kills` | `number` | |
| `isPlayer` | `boolean` | |
| `country` | `string` | Optional (`?`) |

**Total fields: 8**

---

### A7. `GameSnapshot` (interface, exported)

| Field | Type | Notes |
|-------|------|-------|
| `arenaId` | `string` | |
| `tick` | `number` | |
| `snakes` | `SnakeSnapshot[]` | |
| `foods` | `FoodSnapshot[]` | |
| `worldSize` | `number` | |
| `mapRadius` | `number` | Comment: `// current dynamic map radius (online) or 0 (offline infinite)` |
| `mapCenterX` | `number` | Comment: `// center of the map` |
| `mapCenterY` | `number` | |
| `leaderId` | `string \| null` | |
| `leaderChips` | `number` | |
| `realPlayerCount` | `number` | JSDoc: `/** Number of real (human) players in the arena — bots excluded. */` |
| `yourRank` | `number` | JSDoc: `/** Your rank among real players (1 = highest chips). 0 if not in arena. */` |
| `arenaLeaderboard` | `ArenaLeaderboardEntry[]` | JSDoc: `/** Top 10 real players by carried chips, for the arena leaderboard HUD. */` |
| `commissionRate` | `number` | JSDoc: `/** Current commission rate (0 if <=3 players, 0.35 if >=4). */` |

**Total fields: 14**

---

### A8. Type Summary for `types.ts`

- **Total exported interfaces:** 7
- **Total exported types:** 0
- **Total exported enums:** 0
- **Union literals found:**
  - `'player' | 'admin'` (PlayerProfile.role)
  - `'extract' | 'death'` (MatchResult.outcome)
  - `'harvesting' | 'selfDestruct'` (SnakeSnapshot.botState)
  - `'small' | 'medium' | 'large'` (FoodSnapshot.orbSize)

---

---

## B. `src/lib/snake-engine.ts` — Pure Snake Logic Module

File header comment:
```
// ============================================================================
// snake-engine.ts — Pure snake logic module.
// ---------------------------------------------------------------------------
// Shared between game-server (online) and offline-engine (practice).
// All values are driven by a config object (from DB / admin panel).
// ============================================================================
```

---

### B1. Types and Interfaces

#### B1a. `Vec2` (interface, exported)

| Field | Type |
|-------|------|
| `x` | `number` |
| `y` | `number` |

---

#### B1b. `SnakeConfig` (interface, exported)

JSDoc: `/** Config object — all tunable game parameters. Loaded from DB. */`

**Snake Physics:**

| Field | Type | Comment |
|-------|------|---------|
| `collisionRadius` | `number` | `// hitbox radius for body segments` |
| `visualRadius` | `number` | `// render radius for body segments` |
| `segmentSpacing` | `number` | `// center-to-center distance between segments` |
| `baseSpeed` | `number` | `// normal move speed (px/tick)` |
| `boostSpeed` | `number` | `// speed while boosting` |
| `turnBase` | `number` | `// base turn rate (rad/tick)` |
| `turnMin` | `number` | `// minimum turn rate at high score` |
| `turnScoreFactor` | `number` | `// how much score reduces turn rate` |
| `initialBodyLength` | `number` | `// starting segments at spawn` |
| `initialSpawnScore` | `number` | `// starting score` |

**Growth:**

| Field | Type | Comment |
|-------|------|---------|
| `maxSegments` | `number` | `// hard cap on body length` |
| `lengthLogFactor` | `number` | `// controls length growth curve` |
| `maxExtraRadius` | `number` | `// max additional thickness beyond base visual` |
| `thicknessLogFactor` | `number` | `// controls thickness growth curve` |

**Boost:**

| Field | Type | Comment |
|-------|------|---------|
| `boostMinLength` | `number` | `// min segments to activate boost` |
| `boostDropInterval` | `number` | `// frames between tail drops while boosting` |

**Collision:**

| Field | Type | Comment |
|-------|------|---------|
| `hitFactor` | `number` | `// body collision multiplier (0-1)` |
| `headOnHitFactor` | `number` | `// head-on collision multiplier (0-1)` |
| `neckAngleThreshold` | `number` | `// angle threshold for neck protection (degrees)` |
| `neckSegmentCount` | `number` | `// number of neck segments to check` |

**Food:**

| Field | Type | Comment |
|-------|------|---------|
| `foodSmallValue` | `number` | |
| `foodSmallRadius` | `number` | |
| `foodSmallWeight` | `number` | |
| `foodMediumValue` | `number` | |
| `foodMediumRadius` | `number` | |
| `foodMediumWeight` | `number` | |
| `foodLargeValue` | `number` | |
| `foodLargeRadius` | `number` | |
| `foodLargeWeight` | `number` | |
| `foodCountTarget` | `number` | |
| `starDropCount` | `number` | |

**Extraction:**

| Field | Type | Comment |
|-------|------|---------|
| `extractionDurationMs` | `number` | |
| `extractionGlideSpeed` | `number` | |

**Spawning:**

| Field | Type | Comment |
|-------|------|---------|
| `spawnSafeDistance` | `number` | |
| `spawnBoundaryMargin` | `number` | |
| `spawnSafeAttempts` | `number` | |
| `spawnProtectionMs` | `number` | |

**Map:**

| Field | Type | Comment |
|-------|------|---------|
| `mapMinRadius` | `number` | |
| `mapMaxRadius` | `number` | |
| `mapBreathAmplitude` | `number` | |
| `mapBreathCycleMs` | `number` | |

**Bots:**

| Field | Type | Comment |
|-------|------|---------|
| `botSelfDestructThreshold` | `number` | |
| `botEvadeRadius` | `number` | |
| `botFoodScanRadius` | `number` | |

**Economy:**

| Field | Type | Comment |
|-------|------|---------|
| `commissionThreshold` | `number` | |
| `commissionRate` | `number` | |

**Total SnakeConfig fields: 38**

---

#### B1c. `SkinSegment` (interface, exported)

JSDoc: `/** Skin definition — a repeating pattern applied to body segments. */`

| Field | Type | Optional |
|-------|------|----------|
| `color` | `string` | No |
| `glow` | `string` | Yes (`?`) |
| `glowRadius` | `number` | Yes (`?`) |

---

#### B1d. `SnakeSkin` (interface, exported)

| Field | Type | Comment |
|-------|------|---------|
| `id` | `string` | |
| `name` | `string` | |
| `body` | `SkinSegment[]` | `// repeating pattern` |
| `headColor` | `string` | `// head always uses this` |
| `headEyeColor` | `string` | Optional (`?`) |

---

#### B1e. `SnakeMetrics` (interface, exported)

JSDoc: `/** Computed visual properties for a snake at a given score. */`

| Field | Type | Comment |
|-------|------|---------|
| `bodyLength` | `number` | `// total segments` |
| `visualRadius` | `number` | `// render radius per segment` |
| `collisionRadius` | `number` | `// hitbox radius per segment` |
| `turnRate` | `number` | `// current turn rate (rad/tick)` |
| `speed` | `number` | `// current speed (px/tick)` |

---

#### B1f. `FoodOrbDef` (interface, exported)

| Field | Type |
|-------|------|
| `size` | `'small' \| 'medium' \| 'large'` |
| `value` | `number` |
| `radius` | `number` |
| `weight` | `number` |
| `color` | `string` |
| `glowColor` | `string` |

---

### B2. `DEFAULT_SNAKE_CONFIG` — Constant Object (exported)

Comment: `// Default config — used as fallback if DB is not available.`
Comment: `// Matches the seed values in game-config-db.ts.`

| Key | Value | Category |
|-----|-------|----------|
| `collisionRadius` | `6` | Snake physics |
| `visualRadius` | `8` | Snake physics |
| `segmentSpacing` | `16` | Snake physics |
| `baseSpeed` | `4.5` | Snake physics |
| `boostSpeed` | `8.0` | Snake physics |
| `turnBase` | `0.35` | Snake physics |
| `turnMin` | `0.08` | Snake physics |
| `turnScoreFactor` | `0.0003` | Snake physics |
| `initialBodyLength` | `20` | Snake physics |
| `initialSpawnScore` | `20` | Snake physics |
| `maxSegments` | `200` | Growth |
| `lengthLogFactor` | `20` | Growth |
| `maxExtraRadius` | `3` | Growth |
| `thicknessLogFactor` | `0.5` | Growth |
| `boostMinLength` | `8` | Boost |
| `boostDropInterval` | `10` | Boost |
| `hitFactor` | `0.75` | Collision |
| `headOnHitFactor` | `0.8` | Collision |
| `neckAngleThreshold` | `60` | Collision (degrees) |
| `neckSegmentCount` | `5` | Collision |
| `foodSmallValue` | `1` | Food |
| `foodSmallRadius` | `3` | Food |
| `foodSmallWeight` | `0.93` | Food |
| `foodMediumValue` | `3` | Food |
| `foodMediumRadius` | `5` | Food |
| `foodMediumWeight` | `0.04` | Food |
| `foodLargeValue` | `5` | Food |
| `foodLargeRadius` | `8` | Food |
| `foodLargeWeight` | `0.03` | Food |
| `foodCountTarget` | `1200` | Food |
| `starDropCount` | `10` | Food |
| `extractionDurationMs` | `3000` | Extraction |
| `extractionGlideSpeed` | `3.2` | Extraction |
| `spawnSafeDistance` | `500` | Spawning |
| `spawnBoundaryMargin` | `500` | Spawning |
| `spawnSafeAttempts` | `30` | Spawning |
| `spawnProtectionMs` | `4000` | Spawning |
| `mapMinRadius` | `3000` | Map |
| `mapMaxRadius` | `16000` | Map |
| `mapBreathAmplitude` | `40` | Map |
| `mapBreathCycleMs` | `10000` | Map |
| `botSelfDestructThreshold` | `100` | Bots |
| `botEvadeRadius` | `300` | Bots |
| `botFoodScanRadius` | `300` | Bots |
| `commissionThreshold` | `4` | Economy |
| `commissionRate` | `0.35` | Economy |

**Total config keys: 43**

---

### B3. Growth Formulas — Diminishing Returns

#### B3a. `calcBodyLength(score, cfg)` → `number` (exported)

**Formula:** `initialLength + min(maxExtra, logFactor × ln(1 + score))`

Where:
- `base = cfg.initialBodyLength` (default `20`)
- `maxExtra = cfg.maxSegments - base` (default `200 - 20 = 180`)
- `growth = cfg.lengthLogFactor * Math.log(1 + score)` (default `20 * ln(1 + score)`)
- Result: `Math.min(cfg.maxSegments, Math.floor(base + Math.min(maxExtra, growth)))`

**Documented score-value examples:**
| Score | Segments |
|-------|----------|
| `0` | `20` |
| `100` | `~31` |
| `1,000` | `~38` |
| `10,000` | `~46` |
| `100,000` | `~53` |
| Hard cap | `maxSegments (200)` |

---

#### B3b. `calcVisualRadius(score, cfg)` → `number` (exported)

**Formula:** `baseVisualRadius + min(maxExtra, thicknessFactor × ln(1 + score))`

Where:
- `base = cfg.visualRadius` (default `8`)
- `growth = cfg.thicknessLogFactor * Math.log(1 + score)` (default `0.5 * ln(1 + score)`)
- Result: `base + Math.min(cfg.maxExtraRadius, growth)`

**Documented score-value examples:**
| Score | Visual Radius |
|-------|--------------|
| `0` | `8px` |
| `1,000` | `~8.35px` |
| `10,000` | `~8.69px` |
| `100,000` | `~9.04px` |
| Hard cap | `baseVisualRadius + maxExtraRadius (8 + 3 = 11px)` |

---

#### B3c. `calcCollisionRadius(score, cfg)` → `number` (exported)

**Formula:** `cfg.collisionRadius + min(1, 0.1 × ln(1 + score))`

Comment: `// Collision radius barely grows — max 1px extra even at 100k score`
- The hardcoded `0.1` multiplier is NOT in the config; it is a fixed constant in the code.
- Max additional: `1` (hardcoded, not configurable).

**Design intent (verbatim comment):**
> At any score, collision radius stays between baseCollision and baseCollision + 1px.
> The gap between collision circles is what enables threading through tight spaces.

---

#### B3d. `calcTurnRate(score, cfg)` → `number` (exported)

**Formula:** `max(turnMin, turnBase - turnScoreFactor × score)`

Where (defaults):
- `turnMin = 0.08` (rad/tick)
- `turnBase = 0.35` (rad/tick)
- `turnScoreFactor = 0.0003`

Comment: `// Higher score = slower turning (heavier snake).`

---

#### B3e. `calcSpeed(isBoosting, isExtracting, cfg)` → `number` (exported)

**Logic (priority order):**
1. If `isExtracting` → return `cfg.extractionGlideSpeed` (default `3.2`)
2. If `isBoosting` → return `cfg.boostSpeed` (default `8.0`)
3. Otherwise → return `cfg.baseSpeed` (default `4.5`)

---

#### B3f. `calcSnakeMetrics(score, isBoosting, isExtracting, cfg)` → `SnakeMetrics` (exported)

**Returns object with:**
- `bodyLength`: from `calcBodyLength`
- `visualRadius`: from `calcVisualRadius`
- `collisionRadius`: from `calcCollisionRadius`
- `turnRate`: from `calcTurnRate`
- `speed`: from `calcSpeed`

---

### B4. Movement Functions

#### B4a. `turnToward(current, desired, maxStep)` → `number` (exported)

**Purpose:** Turn toward desired angle with max step per tick. Handles angle wrapping.

**Logic:**
1. `diff = desired - current`
2. Normalize diff to `[-π, π]` via `while (diff > π) diff -= 2π` and `while (diff < -π) diff += 2π`
3. If `Math.abs(diff) <= maxStep` → return `desired`
4. Otherwise → return `current + Math.sign(diff) * maxStep`

---

#### B4b. `moveHead(pos, angle, speed)` → `Vec2` (exported)

**Formula:**
- `x = pos.x + Math.cos(angle) * speed`
- `y = pos.y + Math.sin(angle) * speed`

---

### B5. Body Management Functions

#### B5a. `buildInitialPath(headX, headY, angle, segmentCount, spacing)` → `Vec2[]` (exported)

**Purpose:** Build initial body path. Stores FULL path history, not just segment positions.

**Logic:**
- `totalPathPoints = segmentCount * spacing + 1`
- For each `i` from `0` to `totalPathPoints - 1`:
  - `x = headX - Math.cos(angle) * i`
  - `y = headY - Math.sin(angle) * i`

**Design comments (verbatim):**
> CRITICAL: We store the FULL path history (not just segment positions).
> Segments are then sampled from this path at `spacing` intervals.
> This gives smooth curves and enables gap navigation.

---

#### B5b. `extendPath(path, newHead, oldHead, bodySegmentCount, spacing)` → `Vec2[]` (exported)

**Purpose:** Extend path history with new head position. Interpolates between old and new head.

**Logic:**
1. Calculate `dx = newHead.x - oldHead.x`, `dy = newHead.y - oldHead.y`
2. `dist = Math.hypot(dx, dy)`
3. `steps = Math.max(1, Math.ceil(dist))` — 1 step per pixel of movement
4. Interpolate `steps` new points: `t = i/steps`, position = `oldHead + (dx,dy) * t`
5. Prepend: `newPath = [...newPoints, ...path]`
6. Trim: `maxNeeded = bodySegmentCount * spacing + spacing + 10` (buffer of `spacing + 10`)
7. If `newPath.length > maxNeeded` → slice to `maxNeeded`

**Design comment (verbatim):**
> Each movement of `speed` px adds `speed` new points (1 per pixel of movement).

---

#### B5c. `sampleSegments(path, spacing, count)` → `Vec2[]` (exported)

**Purpose:** Sample segment positions from path. Every `spacing`-th point = one segment.

**Logic:**
- For each `i` from `0` to `count - 1`:
  - `pathIdx = i * spacing`
  - If `pathIdx < path.length` → use `path[pathIdx]`
  - Else if path is non-empty → clamp to `path[path.length - 1]`

**Design comment (verbatim):**
> This is what enables gap navigation: if spacing = 16 and collisionRadius = 6,
> there's a 4px gap between collision circles of adjacent segments.

---

### B6. Neck Protection

#### B6. `isNeckProtected(attackerAngle, attackerPos, bodySegment, segIndex, victimAngle, cfg)` → `boolean` (exported)

**Purpose:** Check if head-to-body collision should be blocked by neck protection.

**Parameters:**
| Param | Type |
|-------|------|
| `attackerAngle` | `number` (radians) |
| `attackerPos` | `Vec2` |
| `bodySegment` | `Vec2` |
| `segIndex` | `number` (0 = first behind head) |
| `victimAngle` | `number` (radians) |
| `cfg` | `SnakeConfig` |

**Returns:** `true` if collision should be BLOCKED (pass-through allowed).

**Logic:**
1. If `segIndex >= cfg.neckSegmentCount` → return `false` (only first N segments)
2. Calculate direction from attacker to body segment: `dx = bodySegment.x - attackerPos.x`, `dy = bodySegment.y - attackerPos.y`
3. `dist = Math.hypot(dx, dy)`
4. If `dist < 0.001` → return `false` (practically on top — always collide)
5. `angleToSeg = Math.atan2(dy, dx)`
6. `approachAngle = Math.abs(attackerAngle - angleToSeg)`, normalized to `[-π, π]`, then absolute
7. `approachDeg = (approachAngle * 180) / Math.PI`
8. `bodyAlign = Math.abs(attackerAngle - victimAngle)`, normalized, then absolute
9. `bodyAlignDeg = (bodyAlign * 180) / Math.PI`
10. `threshold = cfg.neckAngleThreshold` (default `60`)
11. Pass-through condition: `approachDeg > (90 - threshold) && bodyAlignDeg < threshold`

**Design comments (verbatim):**
> - 0° = heading straight at the segment (head-on) → should COLLIDE
> - 90° = passing perpendicular to the segment → should PASS
> Two conditions for pass-through:
> 1. Approach angle is shallow (attacker isn't heading AT the segment) AND body alignment is close to parallel
> OR
> 2. The attacker is moving nearly parallel to the victim's body direction (passing alongside, not crossing)

---

### B7. Skin System

#### B7a. `DEFAULT_SKIN` — Constant Object (exported)

Comment: `/** Default snake skin. */`

| Key | Value |
|-----|-------|
| `id` | `'skin-default'` |
| `name` | `'Default Viper'` |
| `body` | `[{ color: '#22c55e' }]` (comment: `// green-500`) |
| `headColor` | `'#16a34a'` (comment: `// green-600`) |
| `headEyeColor` | `'#ffffff'` |

---

#### B7b. `getSegmentStyle(segIndex, skin)` → `SkinSegment` (exported)

**Logic:**
- If `skin.body.length === 0` → return `{ color: '#22c55e' }` (fallback)
- Otherwise → return `skin.body[segIndex % skin.body.length]` (repeating pattern via modulo)

---

### B8. Collision Helpers

#### B8a. `dist(a, b)` → `number` (exported)

Comment: `/** Distance between two points. */`
- Returns `Math.hypot(a.x - b.x, a.y - b.y)`

---

#### B8b. `circlesOverlap(ax, ay, ar, bx, by, br, hitFactor = 1.0)` → `boolean` (exported)

Comment: `/** Check if two circles overlap. Uses the collision hit factor to make hitboxes slightly smaller than visual. */`

**Logic:**
- `effectiveR1 = ar * hitFactor`
- `effectiveR2 = br * hitFactor`
- `d = Math.hypot(ax - bx, ay - by)`
- Returns `d < effectiveR1 + effectiveR2` (strictly less than, not ≤)

---

#### B8c. `pointInCircle(px, py, cx, cy, radius)` → `boolean` (exported)

Comment: `/** Check if a point is inside a circle. */`
- Returns `Math.hypot(px - cx, py - cy) < radius` (strictly less than)

---

### B9. Food System

#### B9a. `getFoodOrbs(cfg)` → `FoodOrbDef[]` (exported)

**Returns array of 3 objects:**

| Index | `size` | `value` (from cfg) | `radius` (from cfg) | `weight` (from cfg) | `color` | `glowColor` |
|-------|--------|--------------------|---------------------|---------------------|--------|------------|
| 0 | `'small'` | `cfg.foodSmallValue` | `cfg.foodSmallRadius` | `cfg.foodSmallWeight` | `'#34d399'` | `'#10b981'` |
| 1 | `'medium'` | `cfg.foodMediumValue` | `cfg.foodMediumRadius` | `cfg.foodMediumWeight` | `'#38bdf8'` | `'#0ea5e9'` |
| 2 | `'large'` | `cfg.foodLargeValue` | `cfg.foodLargeRadius` | `cfg.foodLargeWeight` | `'#f472b6'` | `'#ec4899'` |

**Default values resolved from config:**
| Size | Value | Radius | Weight |
|------|-------|--------|--------|
| small | `1` | `3` | `0.93` |
| medium | `3` | `5` | `0.04` |
| large | `5` | `8` | `0.03` |

---

#### B9b. `randomFoodOrb(orbs)` → `FoodOrbDef` (exported)

**Logic:**
1. `totalWeight = orbs.reduce((sum, o) => sum + o.weight, 0)`
2. `r = Math.random() * totalWeight`
3. Iterate: `r -= orb.weight`; if `r <= 0` → return that orb
4. Fallback: return `orbs[orbs.length - 1]`

---

### B10. Death Food Math

#### B10. `calcDeathFood(score, isWallDeath)` → `[number, number, number]` (exported)

**Returns:** `[smallCount, mediumCount, largeCount]`

**Logic:**
1. If `isWallDeath` → return `[0, 0, 0]` (no food drops on wall death)
2. `largeCount = Math.floor(score / 5)`
3. `remainder = score - largeCount * 5`
4. `mediumCount = Math.floor(remainder / 3)`
5. `smallCount = remainder - mediumCount * 3`

**Comment (verbatim):**
> Wall death = NO food drops.
> Otherwise: Large (score÷5), Medium (remainder÷3), Small (rest).

---

### B11. Star Chip Value

#### B11. `calcStarChipValues(carriedChips)` → `number[]` (exported)

**Logic:**
- `perStar = Math.floor(carriedChips / 10)`
- Returns `new Array(10).fill(perStar)` — exactly 10 elements, all equal

**Comment (verbatim):**
> 10 stars, each worth: carriedChips ÷ 10.

---

### B12. Map Breathing

#### B12a. `getBreathingMapRadius(baseRadius, elapsedMs, cfg)` → `number` (exported)

**Formula:** `baseRadius + Math.sin(cycle * Math.PI * 2) * cfg.mapBreathAmplitude`

Where: `cycle = (elapsedMs % cfg.mapBreathCycleMs) / cfg.mapBreathCycleMs`

Default behavior: radius oscillates ±40px over a 10,000ms cycle.

---

#### B12b. `calcBaseMapRadius(realPlayerCount, cfg)` → `number` (exported)

**Formula:** `cfg.mapMinRadius + (cfg.mapMaxRadius - cfg.mapMinRadius) * Math.sqrt((count - 1) / (maxP - 1))`

Where:
- `minP = 1` (hardcoded)
- `maxP = 1000` (hardcoded)
- `count = Math.max(1, Math.min(1000, realPlayerCount))`

Default behavior: `3000 + 13000 * sqrt((count-1)/999)`
- 1 player: `3000` (min)
- 1000 players: `16000` (max)
- Scaling: square root

---

### B13. Commission

#### B13. `calcCommissionRate(realPlayerCount, cfg)` → `number` (exported)

**Logic:**
1. If `realPlayerCount < cfg.commissionThreshold` → return `0`
2. Otherwise → return `cfg.commissionRate`

Default: `0` if <4 players, `0.35` if ≥4.

---

### B14. Utility

#### B14. `normalizeAngle(a)` → `number` (exported)

**Logic:** Normalize angle to `[-π, π]`:
- `while (a > Math.PI) a -= 2 * Math.PI`
- `while (a < -Math.PI) a += 2 * Math.PI`

---

### B15. Complete Function Index for `snake-engine.ts`

| # | Name | Exported | Parameters | Returns | Line |
|---|------|----------|------------|---------|------|
| 1 | `calcBodyLength` | Yes | `(score: number, cfg: SnakeConfig)` | `number` | 181 |
| 2 | `calcVisualRadius` | Yes | `(score: number, cfg: SnakeConfig)` | `number` | 200 |
| 3 | `calcCollisionRadius` | Yes | `(score: number, cfg: SnakeConfig)` | `number` | 214 |
| 4 | `calcTurnRate` | Yes | `(score: number, cfg: SnakeConfig)` | `number` | 226 |
| 5 | `calcSpeed` | Yes | `(isBoosting: boolean, isExtracting: boolean, cfg: SnakeConfig)` | `number` | 233 |
| 6 | `calcSnakeMetrics` | Yes | `(score: number, isBoosting: boolean, isExtracting: boolean, cfg: SnakeConfig)` | `SnakeMetrics` | 242 |
| 7 | `turnToward` | Yes | `(current: number, desired: number, maxStep: number)` | `number` | 265 |
| 8 | `moveHead` | Yes | `(pos: Vec2, angle: number, speed: number)` | `Vec2` | 276 |
| 9 | `buildInitialPath` | Yes | `(headX: number, headY: number, angle: number, segmentCount: number, spacing: number)` | `Vec2[]` | 295 |
| 10 | `extendPath` | Yes | `(path: Vec2[], newHead: Vec2, oldHead: Vec2, bodySegmentCount: number, spacing: number)` | `Vec2[]` | 324 |
| 11 | `sampleSegments` | Yes | `(path: Vec2[], spacing: number, count: number)` | `Vec2[]` | 367 |
| 12 | `isNeckProtected` | Yes | `(attackerAngle: number, attackerPos: Vec2, bodySegment: Vec2, segIndex: number, victimAngle: number, cfg: SnakeConfig)` | `boolean` | 402 |
| 13 | `getSegmentStyle` | Yes | `(segIndex: number, skin: SnakeSkin)` | `SkinSegment` | 478 |
| 14 | `dist` | Yes | `(a: Vec2, b: Vec2)` | `number` | 491 |
| 15 | `circlesOverlap` | Yes | `(ax, ay, ar, bx, by, br, hitFactor = 1.0)` | `boolean` | 499 |
| 16 | `pointInCircle` | Yes | `(px, py, cx, cy, radius)` | `boolean` | 513 |
| 17 | `getFoodOrbs` | Yes | `(cfg: SnakeConfig)` | `FoodOrbDef[]` | 535 |
| 18 | `randomFoodOrb` | Yes | `(orbs: FoodOrbDef[])` | `FoodOrbDef` | 565 |
| 19 | `calcDeathFood` | Yes | `(score: number, isWallDeath: boolean)` | `[number, number, number]` | 586 |
| 20 | `calcStarChipValues` | Yes | `(carriedChips: number)` | `number[]` | 608 |
| 21 | `getBreathingMapRadius` | Yes | `(baseRadius: number, elapsedMs: number, cfg: SnakeConfig)` | `number` | 620 |
| 22 | `calcBaseMapRadius` | Yes | `(realPlayerCount: number, cfg: SnakeConfig)` | `number` | 632 |
| 23 | `calcCommissionRate` | Yes | `(realPlayerCount: number, cfg: SnakeConfig)` | `number` | 650 |
| 24 | `normalizeAngle` | Yes | `(a: number)` | `number` | 659 |

**Total exported functions: 24**

---

---

## C. `src/lib/game-audio.ts` — Procedural Game Audio

File JSDoc comment:
```
/**
 * Venom Arena — procedural game audio using Web Audio API.
 *
 * All sounds are synthesized at runtime — no audio files needed.
 * Sounds are short and non-intrusive, designed for competitive gameplay.
 */
```

### C1. Module State

| Variable | Type | Initial Value | Access |
|----------|------|---------------|--------|
| `audioCtx` | `AudioContext \| null` | `null` | Module-private |
| `muted` | `boolean` | `false` | Module-private |

---

### C2. Internal Helper Functions (not exported)

#### C2a. `getCtx()` → `AudioContext`

**Logic:**
1. If `!audioCtx` → `audioCtx = new AudioContext()`
2. If `audioCtx.state === 'suspended'` → `audioCtx.resume()`
3. Return `audioCtx`

---

#### C2b. `playTone(freq, duration, type = 'sine', volume = 0.08, detune = 0)` → `void`

**Parameters:**
| Param | Type | Default | Notes |
|-------|------|---------|-------|
| `freq` | `number` | (required) | Frequency in Hz |
| `duration` | `number` | (required) | Duration in seconds |
| `type` | `OscillatorType` | `'sine'` | Wave type |
| `volume` | `number` | `0.08` | Starting gain |
| `detune` | `number` | `0` | Detune in cents |

**Audio graph:**
1. Create `OscillatorNode` → set `type`, `frequency.value = freq`, `detune.value = detune`
2. Create `GainNode` → `setValueAtTime(volume, ctx.currentTime)`, `exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)`
3. Connect: `osc → gain → destination`
4. Start at `ctx.currentTime`, stop at `ctx.currentTime + duration`
5. Wrapped in `try/catch` — silently fails
6. If `muted` → early return

---

#### C2c. `playNoise(duration, volume = 0.06)` → `void`

**Parameters:**
| Param | Type | Default |
|-------|------|--------|
| `duration` | `number` | (required) |
| `volume` | `number` | `0.06` |

**Audio graph:**
1. `bufferSize = Math.floor(ctx.sampleRate * duration)`
2. Create mono buffer of that size
3. Fill with white noise: `data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2)` (quadratic decay envelope)
4. Create `BufferSourceNode` → set buffer
5. Create `GainNode` → `setValueAtTime(volume, ctx.currentTime)`, `exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)`
6. Connect: `source → gain → destination`
7. Start at `ctx.currentTime`
8. Wrapped in `try/catch` — silently fails
9. If `muted` → early return

---

### C3. Exported Control Functions

#### C3a. `setGameAudioMuted(value: boolean)` → `void`

Sets module-private `muted = value`.

#### C3b. `isGameAudioMuted()` → `boolean`

Returns module-private `muted`.

#### C3c. `initGameAudio()` → `void`

Calls `getCtx()` to initialize AudioContext on first user interaction.
Comment: `// Resume AudioContext on first user interaction (required by browsers).`

---

### C4. Sound Effects — Complete Catalog

#### C4a. `playFoodCollect(size: 'small' | 'medium' | 'large' | 'star')` → `void` (exported)

Comment: `/** Food collection — short blip (higher pitch for larger food). */`

| Size | Frequency (Hz) | Duration (s) | Wave Type | Volume |
|------|----------------|--------------|-----------|--------|
| `small` | `660` | `0.08` | `sine` | `0.06` |
| `medium` | `880` | `0.1` | `sine` | `0.06` |
| `large` | `1100` | `0.12` | `sine` | `0.06` |
| `star` | `1320` | `0.15` | `sine` | `0.06` |

**Star chip bonus:** If `size === 'star'`, plays a secondary harmonic:
- Frequency: `1760` Hz, Duration: `0.12` s, Wave: `sine`, Volume: `0.03`

---

#### C4b. `playKill()` → `void` (exported)

Comment: `/** Kill / elimination — satisfying impact sound. */`

| Layer | Function | Freq/Type | Duration | Volume | Detune |
|-------|----------|-----------|----------|--------|--------|
| 1 | `playNoise` | — | `0.15` s | `0.08` | — |
| 2 | `playTone` | `220` Hz, `sawtooth` | `0.2` s | `0.04` | `0` |

---

#### C4c. `playDeath()` → `void` (exported)

Comment: `/** Death (you died) — dramatic crash. */`

| Layer | Function | Freq/Type | Duration | Volume | Delay |
|-------|----------|-----------|----------|--------|-------|
| 1 | `playNoise` | — | `0.3` s | `0.1` | `0ms` |
| 2 | `playTone` | `150` Hz, `sawtooth` | `0.4` s | `0.06` | `0ms` |
| 3 | `playTone` | `100` Hz, `sine` | `0.3` s | `0.04` | `100ms` (via setTimeout) |

---

#### C4d. `playExtractStart()` → `void` (exported)

Comment: `/** Extraction start — ascending chime. */`

| Layer | Freq (Hz) | Note | Duration | Wave | Volume | Delay |
|-------|-----------|------|----------|------|--------|-------|
| 1 | `523` | C5 | `0.1` s | `sine` | `0.05` | `0ms` |
| 2 | `659` | E5 | `0.1` s | `sine` | `0.05` | `80ms` |

---

#### C4e. `playExtractSuccess()` → `void` (exported)

Comment: `/** Extraction success — triumphant ascending arpeggio. */`

| Layer | Freq (Hz) | Note | Duration | Wave | Volume | Delay |
|-------|-----------|------|----------|------|--------|-------|
| 1 | `523` | C5 | `0.15` s | `sine` | `0.07` | `0ms` |
| 2 | `659` | E5 | `0.15` s | `sine` | `0.07` | `100ms` |
| 3 | `784` | G5 | `0.2` s | `sine` | `0.07` | `200ms` |
| 4 | `1047` | C6 | `0.3` s | `sine` | `0.06` | `300ms` |

---

#### C4f. `playExtractRestart()` → `void` (exported)

Comment: `/** Extraction cancelled / restarted — descending tone. */`

| Layer | Freq (Hz) | Duration | Wave | Volume | Delay |
|-------|-----------|----------|------|--------|-------|
| 1 | `440` | `0.12` s | `sine` | `0.05` | `0ms` |
| 2 | `330` | `0.15` s | `sine` | `0.04` | `80ms` |

---

#### C4g. `playBoost()` → `void` (exported)

Comment: `/** Boost activation — short whoosh. */`

| Layer | Function | Freq/Type | Duration | Volume | Detune | Delay |
|-------|----------|-----------|----------|--------|--------|-------|
| 1 | `playNoise` | — | `0.08` s | `0.03` | — | `0ms` |
| 2 | `playTone` | `200` Hz, `sine` | `0.1` s | `0.03` | `-200` | `0ms` |

---

#### C4h. `playWallHit()` → `void` (exported)

Comment: `/** Wall collision — heavy thud. */`

| Layer | Function | Freq/Type | Duration | Volume | Delay |
|-------|----------|-----------|----------|--------|-------|
| 1 | `playNoise` | — | `0.2` s | `0.1` | `0ms` |
| 2 | `playTone` | `80` Hz, `sine` | `0.3` s | `0.06` | `0ms` |

---

### C5. Sound Effect Summary Table

| # | Name | Trigger Context | Layers | Total Duration (approx) |
|---|------|-----------------|--------|----------------------|
| 1 | `playFoodCollect` | Food orb collected by player | 1 (+ 1 bonus for star) | 0.08–0.27s |
| 2 | `playKill` | Player eliminates another snake | 2 (noise + tone) | 0.2s |
| 3 | `playDeath` | Player's snake dies | 3 (noise + 2 tones) | 0.4s (+ 100ms delay) |
| 4 | `playExtractStart` | Extraction channel initiated | 2 (ascending chime) | 0.18s (80ms gap) |
| 5 | `playExtractSuccess` | Extraction completed | 4 (ascending arpeggio) | 0.6s (100ms gaps) |
| 6 | `playExtractRestart` | Extraction cancelled/restarted | 2 (descending tone) | 0.23s (80ms gap) |
| 7 | `playBoost` | Boost activated | 2 (noise + detuned tone) | 0.1s |
| 8 | `playWallHit` | Snake hits arena wall | 2 (noise + low tone) | 0.3s |

**Total exported sound functions: 8**
**Total exported control functions: 3** (`setGameAudioMuted`, `isGameAudioMuted`, `initGameAudio`)
**Total internal helpers: 3** (`getCtx`, `playTone`, `playNoise`)

### C6. Audio Design Notes

- All audio is **procedural** (synthesized at runtime via Web Audio API) — no audio files.
- Noise uses **quadratic decay envelope**: `Math.pow(1 - i / bufferSize, 2)`
- All gain ramps to `0.001` (not zero) via `exponentialRampToValueAtTime`
- All wrapped in `try/catch` — silent failure if AudioContext unavailable
- Global mute flag checked at top of `playTone` and `playNoise`
- Default `playTone` volume: `0.08`
- Default `playNoise` volume: `0.06`
- Musical notes used: C5 (523), E5 (659), G5 (784), C6 (1047), plus non-note frequencies (80, 100, 150, 200, 220, 330, 440, 660, 880, 1100, 1320, 1760 Hz)

---

---

## D. `prisma/schema.prisma` — Database Schema

File comments:
```
// Venom Arena — server-authoritative multiplayer snake game
// SQLite backing store. Arrays are encoded as JSON strings (SQLite limitation).
```

### D0. Generator & Datasource

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

- **Generator provider:** `prisma-client-js`
- **Database provider:** `sqlite`
- **Connection:** `env("DATABASE_URL")`

---

### D1. Model: `Player`

**Table:** `Player`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `email` | `String?` | `@unique` | — | `// null for guest accounts` |
| `passwordHash` | `String?` | — | — | `// null for guests` |
| `securityPin` | `String?` | — | — | `// optional 4-digit PIN for password recovery` |
| `userTag` | `String` | `@unique` | — | `// e.g. VENOM-8291` |
| `name` | `String` | — | — | |
| `country` | `String` | — | `"US"` | |
| `avatar` | `String?` | — | — | |
| `oauthProvider` | `String?` | — | — | `// "google" \| "facebook" \| "apple" \| null` |
| `oauthProviderId` | `String?` | — | — | `// unique ID from the OAuth provider` |
| `bankedChips` | `Int` | — | `150` | |
| `totalEarned` | `Int` | — | `150` | |
| `totalLost` | `Int` | — | `0` | |
| `level` | `Int` | — | `1` | |
| `xp` | `Int` | — | `0` | |
| `lifetimeKills` | `Int` | — | `0` | |
| `lifetimeDeaths` | `Int` | — | `0` | |
| `lifetimeExtracts` | `Int` | — | `0` | |
| `bestStreak` | `Int` | — | `0` | |
| `biggestExtract` | `Int` | — | `0` | |
| `dailyStreak` | `Int` | — | `0` | |
| `lastDailyClaim` | `String?` | — | — | `// ISO date (YYYY-MM-DD)` |
| `unlockedSkins` | `String` | — | `"[]"` | JSON-encoded array |
| `currentSkin` | `String` | — | `"skin-default"` | |
| `currentTrail` | `String` | — | `"trail-none"` | |
| `currentDeath` | `String` | — | `"death-default"` | |
| `currentFlag` | `String?` | — | — | |
| `currentBanner` | `String?` | — | — | |
| `role` | `String` | — | `"player"` | `// player \| admin` |
| `banned` | `Boolean` | — | `false` | |
| `createdAt` | `DateTime` | — | `now()` | |
| `updatedAt` | `DateTime` | `@updatedAt` | auto | |
| `lastSeenAt` | `DateTime` | — | `now()` | |
| `clanTag` | `String?` | — | — | |
| `clanRank` | `String?` | — | — | `// Leader \| Co-Leader \| Viper` |

**Total fields: 33**

**Relations:**

| Relation Name | Type | Model | Field Mapping | On Delete |
|---------------|------|-------|---------------|-----------|
| `clan` | Optional (1:1) | `Clan` | `clanTag → Clan.tag` | `SetNull` |
| `dailyClaims` | Many | `DailyClaim[]` | implicit via DailyClaim.playerId | — |
| `purchases` | Many | `Purchase[]` | implicit via Purchase.playerId | — |
| `sentGifts` | Many | `Gift[]` | `@relation("giftFrom")` via Gift.fromId | — |
| `receivedGifts` | Many | `Gift[]` | `@relation("giftTo")` via Gift.toId | — |
| `friendsFrom` | Many | `Friendship[]` | `@relation("friendshipInitiator")` via Friendship.initiatorId | — |
| `friendsTo` | Many | `Friendship[]` | `@relation("friendshipRecipient")` via Friendship.recipientId | — |
| `challenges` | Many | `Challenge[]` | implicit via Challenge.playerId | — |

**Indexes:**

| Fields | Sort | Index Type |
|--------|------|------------|
| `[bankedChips(sort: Desc)]` | Descending | Standard |
| `[level(sort: Desc)]` | Descending | Standard |
| `[role]` | Ascending | Standard |

---

### D2. Model: `Clan`

**Table:** `Clan`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `tag` | `String` | `@id` | — (required) | `// e.g. "APEX" (3-5 chars)` |
| `name` | `String` | — | — | |
| `emblem` | `String` | — | `"🐍"` | |
| `description` | `String` | — | `""` | |
| `level` | `Int` | — | `1` | |
| `bankedChips` | `Int` | — | `0` | |
| `createdAt` | `DateTime` | — | `now()` | |
| `updatedAt` | `DateTime` | `@updatedAt` | auto | |

**Total fields: 8**

**Relations:**

| Relation Name | Type | Model |
|---------------|------|-------|
| `members` | Many | `Player[]` |
| `messages` | Many | `ClanMessage[]` |

**Indexes:** None

---

### D3. Model: `ClanMessage`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `clanTag` | `String` | — | — | |
| `clan` | `Clan` | `@relation(fields: [clanTag], references: [tag], onDelete: Cascade)` | — | |
| `senderTag` | `String` | — | — | |
| `senderName` | `String` | — | — | |
| `rank` | `String` | — | `"Viper"` | |
| `message` | `String` | — | — | |
| `createdAt` | `DateTime` | — | `now()` | |

**Total fields: 8**

**Relations:**

| Relation Name | Type | Model | On Delete |
|---------------|------|-------|-----------|
| `clan` | Single | `Clan` | `Cascade` |

**Indexes:**

| Fields | Index Type |
|--------|------------|
| `[clanTag, createdAt]` | Standard (composite) |

**Unique constraints:** None (beyond `@id`)

---

### D4. Model: `DailyClaim`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `player` | `Player` | `@relation(fields: [playerId], references: [id], onDelete: Cascade)` | — | |
| `playerId` | `String` | — | — | |
| `day` | `String` | — | — | `// YYYY-MM-DD` |
| `reward` | `Int` | — | — | |
| `streak` | `Int` | — | — | |
| `createdAt` | `DateTime` | — | `now()` | |

**Total fields: 7**

**Relations:**

| Relation Name | Type | Model | On Delete |
|---------------|------|-------|-----------|
| `player` | Single | `Player` | `Cascade` |

**Indexes:** None (beyond unique constraint)

**Unique constraints:**

| Fields | Constraint Type |
|--------|----------------|
| `[playerId, day]` | `@@unique` (composite) |

---

### D5. Model: `Purchase`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `player` | `Player` | `@relation(fields: [playerId], references: [id], onDelete: Cascade)` | — | |
| `playerId` | `String` | — | — | |
| `itemId` | `String` | — | — | `// skin id or chip pack id` |
| `itemType` | `String` | — | — | `// "skin" \| "chip_pack"` |
| `amountChips` | `Int` | — | — | `// chips spent (skins) or gained (chip packs)` |
| `createdAt` | `DateTime` | — | `now()` | |

**Total fields: 7**

**Relations:**

| Relation Name | Type | Model | On Delete |
|---------------|------|-------|-----------|
| `player` | Single | `Player` | `Cascade` |

**Indexes:**

| Fields | Index Type |
|--------|------------|
| `[playerId, createdAt]` | Standard (composite) |

---

### D6. Model: `Gift`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `from` | `Player` | `@relation("giftFrom", fields: [fromId], references: [id], onDelete: Cascade)` | — | |
| `fromId` | `String` | — | — | |
| `to` | `Player` | `@relation("giftTo", fields: [toId], references: [id], onDelete: Cascade)` | — | |
| `toId` | `String` | — | — | |
| `amount` | `Int` | — | — | |
| `createdAt` | `DateTime` | — | `now()` | |

**Total fields: 7**

**Relations:**

| Relation Name | Type | Model | On Delete |
|---------------|------|-------|-----------|
| `from` | Single | `Player` | `Cascade` (named `giftFrom`) |
| `to` | Single | `Player` | `Cascade` (named `giftTo`) |

**Indexes:**

| Fields | Index Type |
|--------|------------|
| `[fromId, createdAt]` | Standard (composite) |
| `[toId, createdAt]` | Standard (composite) |

---

### D7. Model: `Friendship`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `initiator` | `Player` | `@relation("friendshipInitiator", fields: [initiatorId], references: [id], onDelete: Cascade)` | — | |
| `initiatorId` | `String` | — | — | |
| `recipient` | `Player` | `@relation("friendshipRecipient", fields: [recipientId], references: [id], onDelete: Cascade)` | — | |
| `recipientId` | `String` | — | — | |
| `status` | `String` | — | `"pending"` | `// pending \| accepted \| blocked` |
| `createdAt` | `DateTime` | — | `now()` | |

**Total fields: 7**

**Relations:**

| Relation Name | Type | Model | On Delete |
|---------------|------|-------|-----------|
| `initiator` | Single | `Player` | `Cascade` (named `friendshipInitiator`) |
| `recipient` | Single | `Player` | `Cascade` (named `friendshipRecipient`) |

**Indexes:**

| Fields | Index Type |
|--------|------------|
| `[recipientId, status]` | Standard (composite) |

**Unique constraints:**

| Fields | Constraint Type |
|--------|----------------|
| `[initiatorId, recipientId]` | `@@unique` (composite) |

---

### D8. Model: `Challenge`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `playerId` | `String` | — | — | |
| `player` | `Player` | `@relation(fields: [playerId], references: [id], onDelete: Cascade)` | — | |
| `type` | `String` | — | — | `// "daily" \| "weekly"` |
| `category` | `String` | — | — | `// "kill" \| "extract" \| "star_collect" \| "score" \| "arena_entry"` |
| `title` | `String` | — | — | |
| `description` | `String` | — | — | |
| `target` | `Int` | — | — | `// target value to complete` |
| `current` | `Int` | — | `0` | `// progress so far` |
| `reward` | `Int` | — | — | `// chips reward` |
| `completed` | `Boolean` | — | `false` | |
| `claimed` | `Boolean` | — | `false` | |
| `periodStart` | `String` | — | — | `// ISO date when this challenge period started (YYYY-MM-DD)` |
| `createdAt` | `DateTime` | — | `now()` | |

**Total fields: 14**

**Relations:**

| Relation Name | Type | Model | On Delete |
|---------------|------|-------|-----------|
| `player` | Single | `Player` | `Cascade` |

**Indexes:**

| Fields | Index Type |
|--------|------------|
| `[playerId, type]` | Standard (composite) |
| `[playerId, periodStart]` | Standard (composite) |

---

### D9. Model: `ChallengeProgress`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `playerId` | `String` | — | — | |
| `category` | `String` | — | — | `// "kill" \| "extract" \| "star_collect" \| "score" \| "arena_entry"` |
| `periodType` | `String` | — | — | `// "daily" \| "weekly"` |
| `periodStart` | `String` | — | — | `// ISO date` |
| `increment` | `Int` | — | `1` | `// how much to add per event` |
| `createdAt` | `DateTime` | — | `now()` | |

**Total fields: 7**

**Relations:** None (no `@relation` — `playerId` is a plain `String`, not a foreign key to `Player`)

**Unique constraints:**

| Fields | Constraint Type |
|--------|----------------|
| `[playerId, category, periodType, periodStart]` | `@@unique` (4-field composite) |

---

### D10. Model: `GameConfig`

| Field | Type | Modifiers | Default | Comment |
|-------|------|-----------|---------|---------|
| `id` | `String` | `@id @default(cuid())` | auto (cuid) | |
| `key` | `String` | `@unique` | — | `// e.g. "snake.collisionRadius"` |
| `value` | `String` | — | — | `// JSON-encoded value (number, string, boolean, or object)` |
| `label` | `String` | — | — | `// human-readable name for admin panel` |
| `category` | `String` | — | — | See valid categories below |
| `order` | `Int` | — | `0` | `// display order within category` |
| `type` | `String` | — | `"number"` | `// "number" \| "boolean" \| "string" \| "json"` |
| `updatedAt` | `DateTime` | `@updatedAt` | auto | |

**Total fields: 8**

**Relations:** None

**Valid `category` values (from comment):**
- `"snake_physics"`
- `"food_system"`
- `"map_settings"`
- `"boost_system"`
- `"collision"`
- `"economy"`
- `"bot_settings"`
- `"extraction"`
- `"spawning"`

**Valid `type` values (from comment):**
- `"number"` (default)
- `"boolean"`
- `"string"`
- `"json"`

---

### D11. Schema-Wide Summary

**Total models:** 9

| # | Model | Fields | Relations | Unique Constraints | Indexes |
|---|-------|--------|-----------|-------------------|---------|
| 1 | `Player` | 33 | 8 | 2 (`email @unique`, `userTag @unique`) | 3 |
| 2 | `Clan` | 8 | 2 (incoming) | 1 (`tag @id`) | 0 |
| 3 | `ClanMessage` | 8 | 1 | 1 (`id @id`) | 1 |
| 4 | `DailyClaim` | 7 | 1 | 2 (`id @id`, `[playerId, day]`) | 0 |
| 5 | `Purchase` | 7 | 1 | 1 (`id @id`) | 1 |
| 6 | `Gift` | 7 | 2 | 1 (`id @id`) | 2 |
| 7 | `Friendship` | 7 | 2 | 2 (`id @id`, `[initiatorId, recipientId]`) | 1 |
| 8 | `Challenge` | 14 | 1 | 1 (`id @id`) | 2 |
| 9 | `ChallengeProgress` | 7 | 0 | 2 (`id @id`, `[playerId, category, periodType, periodStart]`) | 0 |

**Total fields across all models:** 98
**Total relations:** 18 (explicitly named or inferred)
**Total unique constraints:** 13
**Total indexes:** 10

**CUID-based IDs:** 7 models (`Player`, `ClanMessage`, `DailyClaim`, `Purchase`, `Gift`, `Friendship`, `Challenge`, `ChallengeProgress`, `GameConfig`) = 9 models
**Non-CUID primary keys:** 1 model (`Clan` — uses `tag` as `@id`)

**On Delete behaviors:**
- `Cascade`: 8 relations (all Player→child relations, Clan→ClanMessage)
- `SetNull`: 1 relation (Player→Clan)

**Notable default values:**
- `Player.bankedChips`: `150`
- `Player.totalEarned`: `150`
- `Player.country`: `"US"`
- `Player.unlockedSkins`: `"[]"` (JSON array)
- `Player.currentSkin`: `"skin-default"`
- `Player.currentTrail`: `"trail-none"`
- `Player.currentDeath`: `"death-default"`
- `Player.role`: `"player"`
- `Clan.emblem`: `"🐍"`
- `ClanMessage.rank`: `"Viper"`
- `Friendship.status`: `"pending"`
- `GameConfig.type`: `"number"`

**String enums (documented in comments, not enforced by Prisma):**
- `Player.role`: `"player" | "admin"`
- `Player.oauthProvider`: `"google" | "facebook" | "apple" | null`
- `Player.clanRank`: `"Leader" | "Co-Leader" | "Viper"`
- `Purchase.itemType`: `"skin" | "chip_pack"`
- `Friendship.status`: `"pending" | "accepted" | "blocked"`
- `Challenge.type`: `"daily" | "weekly"`
- `Challenge.category`: `"kill" | "extract" | "star_collect" | "score" | "arena_entry"`
- `ChallengeProgress.periodType`: `"daily" | "weekly"`
- `GameConfig.category`: `"snake_physics" | "food_system" | "map_settings" | "boost_system" | "collision" | "economy" | "bot_settings" | "extraction" | "spawning"`
- `GameConfig.type`: `"number" | "boolean" | "string" | "json"`
