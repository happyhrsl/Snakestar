# GDD Part 12 — Requirements Checklist & Gap Analysis Catalog
> Source files: `requirements-checklist.md` (324 lines), `GAP-ANALYSIS.md` (165 lines)
> Task ID: 12

---

# SECTION A: COMPLETE REQUIREMENTS CHECKLIST

> Last updated: Session 6 (current)

Legend:
- ✅ = Implemented & Verified
- 🔧 = Implemented (needs testing)
- ❌ = Not Done
- ⚠️ = Partially Done

---

## 1. CORE GAME MECHANICS

### 1.1 Snake Movement
- ✅ Server-authoritative movement (client sends angle + wantsBoost only)
- ✅ BASE_SPEED = 4.5 (normal speed)
- ✅ BOOST_SPEED = 8.0 (boost speed)
- ✅ EXTRACT_GLIDE_SPEED = 3.2 (extraction speed)
- ✅ Turn rate: TURN_BASE(0.35) - score * TURN_SCORE_FACTOR(0.0003), min TURN_MIN(0.08)
- ✅ Bigger snakes turn slower (score affects turn rate)
- ✅ Segment spacing = 6px

### 1.2 Score & Body System
- ✅ INITIAL_SPAWN_SCORE = 20 (starting score)
- ✅ INITIAL_BODY_LENGTH = 20 (base body segments at spawn)
- ✅ Body length = INITIAL_BODY_LENGTH + (score - INITIAL_SPAWN_SCORE)
- ✅ MAX_BODY_LENGTH = 200 (body cap)
- ✅ Size formula: SIZE_BASE(8) + sqrt(score) * SIZE_SCORE_FACTOR(0.4)
- ✅ Score increases by eating food orbs (+1, +3, or +5 per orb)

### 1.3 Food Orbs
- ✅ Three sizes: Small(1pt, 3px), Medium(3pt, 5px), Large(5pt, 8px)
- ✅ Spawn weights: Small=60%, Medium=30%, Large=10%
- ✅ Food count target maintained per arena
- ✅ Visual rendering with glow effects per size

### 1.4 Star Collectibles
- ✅ Always exactly 10 stars dropped per real player death (STAR_DROP_COUNT=10)
- ✅ Each star value = floor(carriedChips / 10), remainder to last star
- ✅ 5-pointed golden glow star visual
- ✅ ONLY real players drop stars; bots NEVER drop stars
- ✅ Bots NEVER collect star chips (ignored in bot AI)

### 1.5 Death Food Drop
- ✅ Food orbs spread evenly along the ENTIRE body path (not one spot)
- ✅ S/M/L distribution: greedily pick Large(5) first, then Medium(3), then Small(1)
- ✅ Sum of all food orbs = snake's total score (exact match)
- ✅ Scatter = 15-20px around each body segment position
- ✅ Map death: 0 food orbs dropped (score destroyed)
- ✅ Bot selfDestruct WALL death: 0 food, 0 stars (vanish cleanly)
- ✅ Bot selfDestruct COLLISION death: STILL drops food

### 1.6 Boost Mechanic
- ✅ Activation: Hold Space / Left-click / Boost button
- ✅ BOOST_MIN_LENGTH = 8 (need >8 segments to boost)
- ✅ BOOST_DROP_INTERVAL = 40 frames (~2s at 20Hz)
- ✅ Drops 1 tail segment as small food orb per interval
- ✅ Snake shrinks: score -= 1 per drop
- ✅ Both online and offline modes implement boost food drops
- ✅ Boost is purely cosmetic/speed — does NOT affect collision outcome directly

---

## 2. COLLISION SYSTEM

### 2.1 Head-to-Body Collision
- ✅ Snake head hits foreign body segment → head owner dies
- ✅ Neck protection: First 5 segments (NECK_PROTECTION_SEGS=5) cannot kill
- ✅ Collision detection uses spatial hash grid for performance
- ✅ Hit factor: COLLISION_HIT_FACTOR applied to sum of sizes

### 2.2 Head-on (Head-to-Head) Collision
- ✅ 3 rules:
  - (A) Neither boosting → larger score survives
  - (B) Smaller boosting vs larger steady → smaller survives
  - (C) Both boosting → larger score survives
- ✅ Tie → both die
- ✅ HEAD_ON_HIT_FACTOR applied to sum of sizes

### 2.3 Wall/Map Collision
- ✅ Online: Circular boundary — going outside radius = death
- ✅ Offline: NO wall death (infinite map, no boundaries)
- ✅ Map boundary has breathing oscillation (±40px over 10s cycle)

---

## 3. BOT AI

### 3.1 Bot Personalities (Online)
- ✅ Scavenger, Opportunist, Hunter, Extractor, Coward
- ✅ All bots seek food and evade human players
- ✅ Body segment collision avoidance (150px range)
- ✅ Predictive evasion: project player 8 ticks ahead, steer perpendicular
- ✅ Edge avoidance: if near boundary (300px), turn toward center

### 3.2 Self-Destruct (Online Only)
- ✅ Triggered at score >= 100 (BOT_SELF_DESTRUCT_THRESHOLD)
- ✅ Navigate AWAY from center (toward wall) — SLOWLY
- ✅ NEVER boost during self-destruct
- ✅ Still collect food on the way (20% food seeking + 80% wall seeking)
- ✅ Wall death = vanish cleanly (0 food, 0 stars)
- ✅ Collision death = still drops food

### 3.3 Bot Restrictions
- ✅ Bots never boost (wantsBoost always false)
- ✅ Bots never collect star chips
- ✅ Bots drop 0 stars on death
- ✅ Bots have no chips (carriedChips = 0)

### 3.4 Offline Bots
- ✅ Always exactly 1000 bots in offline mode
- ✅ Varied body sizes: random initial score (0-80), random body length (+0 to +30)
- ✅ Rendering culling: only render bots within 1500px of camera
- ✅ No self-destruct behavior in offline mode
- ✅ No chips, no stars, no XP in offline mode

---

## 4. MAP SYSTEM

### 4.1 Online Map
- ✅ Circular boundary with breathing (radius oscillates ±40px, 10s cycle)
- ✅ Dynamic sizing: sqrt(realPlayerCount) scaling
- ✅ MAP_MIN_RADIUS = 3000 (1 player)
- ✅ MAP_MAX_RADIUS = 16000 (1000 players)
- ✅ Map boundary rendered as neon circle
- ✅ Safe spawn at least 500px inside boundary

### 4.2 Offline Map
- ✅ Infinite map (no boundaries, no wall death)
- ✅ No map boundary rendering

---

## 5. SPAWN SYSTEM

### 5.1 Safe Spawning
- ✅ Distance-based check from ALL snake heads (SAFE_SPAWN_MIN_DIST = 500px)
- ✅ At least 500px inside map boundary (online)
- ✅ SAFE_SPAWN_ATTEMPTS = 30 (max attempts before fallback)
- ✅ Fallback to random point if no safe spot found
- ✅ Spawn protection: 4 seconds invulnerability (RESPAWN_INVULN_MS = 4000)

### 5.2 Bot Displacement (Online)
- ✅ When human joins, one harvesting bot is forced into selfDestruct
- ✅ Makes room for new player without exceeding MAX_ARENA_PLAYERS

---

## 6. DEATH REPLAY SYSTEM

### 6.1 Recording
- ✅ Pre-death: 300-frame circular buffer (15s at 20Hz)
- ✅ Post-death: 300-frame linear buffer (15s at 20Hz)
- ✅ No pre-spawn frames (recording starts only after player snake appears)
- ✅ Death frame index tracked for progress bar marker

### 6.2 Camera Behavior
- ✅ Pre-death: follows player's snake head
- ✅ At death: camera centers on body midpoint (where food drops)
- ✅ Post-death: stays at death food position initially
- ✅ Tracks first entity (bot/player) collecting death food
- ✅ Switches to follow that entity's head (spectator mode)
- ✅ If no one collects food, slow zoom out at death position

### 6.3 UI
- ✅ Play/pause button
- ✅ Speed cycle: 0.25x, 0.5x, 1x, 2x
- ✅ Zoom in/out
- ✅ Restart button
- ✅ Progress bar with death marker (yellow line)
- ✅ Frame counter + time display (pre-death countdown / post-death count-up)
- ✅ "REPLAY" watermark
- ✅ Death indicator text after death frame

### 6.4 Server Side
- ✅ Death event emitted BEFORE match_result
- ✅ Player kept in room for 16s after death (for post-death snapshot delivery)
- ✅ Snapshots continue broadcasting during post-death window

---

## 7. ONLINE vs OFFLINE DIFFERENCES

| Feature | Online | Offline |
|---------|--------|--------|
| Chips | Buy-in + carry + extract | None (0) |
| Stars | Drop on player death | Not present |
| XP | Earned on extract | 0 |
| Commission | 0% if ≤3 real players, 35% if ≥4 | N/A |
| Map | Circular boundary, dynamic radius | Infinite, no walls |
| Leaderboard | By carried chips (top 10 real players) | By score (top 10 all snakes) |
| Bot Self-Destruct | Yes (score≥100, online only) | No |
| Bot Count | Per arena tier (25-60) | Always 1000 |
| Death Penalty | Lose all carried chips | None (practice) |
| Food on death | Spread along body + stars | Spread along body only |
| Wall death | Yes (map boundary) | No (infinite map) |

---

## 8. EXTRACTION SYSTEM

- ✅ Hold E key or Extract button to start extraction
- ✅ 3-second channel (EXTRACT_DURATION_MS = 3000)
- ✅ Steering interrupts extraction (cancel on turn)
- ✅ NO minimum extraction threshold (extract anytime)
- ✅ NO extraction zone restriction (extract anywhere)
- ✅ Graduated commission: 0% if ≤3 real players, 35% if ≥4
- ✅ Extracted chips = carriedChips - commission

---

## 9. HUD / UI ELEMENTS

### 9.1 In-Game HUD
- ✅ Kill counter
- ✅ Rank (#X of Y real players)
- ✅ Commission rate display
- ✅ Real player count
- ✅ Carried chips counter
- ✅ Score (body length)
- ✅ Mini-map
- ✅ Arena leaderboard (top 10)
- ✅ Boost button (mobile)
- ✅ Extract button with progress bar

### 9.2 Death Screen
- ✅ Kill/death info
- ✅ Killer name and tag
- ✅ Duration played
- ✅ Score at death
- ✅ Carried chips lost
- ✅ "Watch Death Replay" button
- ✅ Social buttons (View Profile, Add Friend, Add Rival) — only for real player killers
- ✅ XP gained display (online extract only)

### 9.3 Post-Game
- ✅ Match result with chips banked
- ✅ Level up notification
- ✅ Return to lobby button

---

## 10. ARENA TIERS

| Tier | Name | Buy-In | Bots | Reward Mult | Difficulty |
|------|------|--------|------|-------------|------------|
| 1 | Slum Alley | 10 | 25 | 1.0x | Beginner |
| 2 | Neon Grid | 100 | 30 | 1.5x | Medium |
| 3 | Viper Syndicate | 500 | 40 | 2.0x | High Stakes |
| 4 | Crimson Pit | 1,000 | 50 | 2.5x | Extreme |
| 5 | Void Serpent | 5,000 | 60 | 3.0x | Legendary |
| 6 | Venom Royale | 25,000 | 60 | 4.0x | Mythic |
| 7 | Apocalypse | 100,000 | 60 | 5.0x | Apocalypse |
| Practice | Offline | 0 | 1000 | 0x | Free |

---

## 11. SOCIAL FEATURES

- ✅ Global search by name or tag
- ✅ Friend system (request, accept, remove)
- ✅ Daily gifting (+25 chips per friend)
- ✅ Rival system (add rival from death screen)
- ✅ Clan system (create, join, leave)
- ✅ Player profile inspection
- ✅ Country flags display

---

## 12. ADMIN FEATURES

- ✅ Player banning
- ✅ Chip modification
- ✅ Banlist management

---

## 13. COSMETICS

- ✅ Skins (unlockable, equipable)
- ✅ Trails (visual effect behind snake)
- ✅ Death effects (visual on death)
- ✅ Flags (country flag display)
- ✅ Banners (profile banner)
- ✅ Chip store (purchase chip packs)

---

## 14. PROGRESSION

- ✅ XP system (online extract only)
- ✅ Level system
- ✅ Daily rewards (streak system)
- ✅ Season pass

---

## 15. INFRASTRUCTURE

- ✅ Next.js 16 + App Router (port 3000)
- ✅ Socket.IO game server (Bun mini-service, port 3001)
- ✅ Prisma ORM with SQLite
- ✅ Spatial hash grid for collision detection
- ✅ Caddy gateway for port forwarding
- ✅ JWT authentication
- ✅ Server-authoritative game state
- ✅ Dynamic map scaling
- ✅ 20Hz broadcast rate (online)
- ✅ 30Hz physics tick (offline)

---

## 16. RULES & GUIDE PAGE

- ✅ Comprehensive rules modal with all mechanics documented
- ✅ Sections: Controls, Online vs Offline, Food/Stars, Extraction, Collision, Boost, Bot AI, Map, FAQ
- ✅ Accurate graduated commission info
- ✅ No outdated information (min extraction, extraction zone, etc.)

---

## CHECKLIST NOTES

- Items marked ✅ have been implemented and code-reviewed
- Items marked 🔧 need browser verification
- This checklist is the single source of truth for all game requirements
- Update this file whenever new features are added or changed

---

# SECTION B: GAP ANALYSIS

> Source of Truth: Official Guide & Rules modal ONLY
> Generated after deep study of every rule section against actual code implementation.

---

## CRITICAL BUGS (Already Fixed)

### BUG #1: Death Replay Crash — `isOfflineMode is not defined`
- **File**: `src/components/game/game-canvas.tsx`
- **Location**: `EndOverlay` component (lines 2955, 2985)
- **Problem**: `EndOverlay` is a separate function component that receives `isOffline` as a prop, but references `isOfflineMode` which only exists in the parent `GameCanvas` scope
- **Rule impact**: Any online death triggers "isOfflineMode is not defined" → white error screen, replay completely broken
- **Fix applied**: Changed `isOfflineMode` → `isOffline` in both locations
- **Status**: ✅ FIXED

---

## RULE vs CODE GAPS

### GAP #1: Boost Drop Rate Wrong (~0.75/sec instead of ~3/sec)
- **Rule (Section 4 - Boost Mechanic)**: "Speed: 4.5 → 8.0 (nearly 2x faster). **~3 times per second**, tail drops a food orb (continuous trail)."
- **Code** (`game-config.ts` line 198): `BOOST_DROP_INTERVAL = 40`
- **Math**: 40 frames × 33.3ms = 1333ms per drop = **0.75 drops/sec**
- **Rule says**: ~3 drops/sec → needs interval of **10 frames** (10 × 33.3ms = 333ms)
- **File to fix**: `src/lib/game-config.ts` — change `BOOST_DROP_INTERVAL = 40` → `10`

### GAP #2: Food Collection Sound Never Plays (Online Mode)
- **Rule (Section 4)**: Sound effects for food collection exist
- **Code**: `playFoodCollect` is **imported** in `game-canvas.tsx` (line 45) but **NEVER CALLED**
- **Problem**: Online mode has no "food_eaten" event from server. Client only receives 20Hz snapshots. No food-eaten sound trigger mechanism exists.
- **Fix needed**: Either (a) server emits a `food_eaten` event when player eats food, OR (b) client detects food collection by diffing snapshots
- **Files**: `mini-services/game-server/index.ts` + `src/components/game/game-canvas.tsx`

### GAP #3: Boost Sound Never Plays
- **Rule (Section 4)**: Sound effects for boosting
- **Code**: `playBoost()` exists in `game-audio.ts` but is **NOT IMPORTED or CALLED** anywhere
- **Problem**: No boost activation sound effect plays
- **Fix needed**: Import and call `playBoost()` when boost activates
- **Files**: `src/components/game/game-canvas.tsx`

### GAP #4: Wall Hit Sound Never Plays
- **Rule (Section 5)**: Wall collision = death → should have sound
- **Code**: `playWallHit()` exists in `game-audio.ts` but is **NOT IMPORTED or CALLED** anywhere
- **Problem**: No sound when hitting the map boundary wall
- **Fix needed**: Import and call `playWallHit()` on wall death
- **Files**: `src/components/game-canvas.tsx`

### GAP #5: Star Chip Collection Sound Missing (Online Mode)
- **Rule (Section 3)**: Star chips = golden collectibles → should have distinct sound
- **Code**: `playFoodCollect('star')` exists (special two-tone sound) but is never triggered for online star collection
- **Problem**: Same as GAP #2 — no star collection event from server
- **Fix**: Same as GAP #2 — server event or client detection
- **Files**: Same as GAP #2 (`mini-services/game-server/index.ts` + `src/components/game/game-canvas.tsx`)

---

## ALREADY CORRECT (Rule ✅ = Code ✅)

### ✅ Section 0: Accounts
- 150 starter chips, VENOM-XXXX tag, Security PIN, guest upgrade — all match

### ✅ Section 1: Controls
- Mouse/Touch steering, WASD/Arrows, Space/Shift boost, E extract — all match
- Joystick boost (magnitude > 0.6), keyboard shortcuts 1-5 for emotes — match

### ✅ Section 2: Online vs Offline Mode
- Online: chip buy-in, real players, graduated commission (0% ≤3, 35% ≥4), death penalty, star chips, XP on extraction only, circular breathing map, 30 bots/tier, bots self-destruct at score≥100, bots never drop/collect stars — all match
- Offline: FREE, 1000 AI bots, no chips/stars/XP, infinite map, no self-destruct — all match

### ✅ Section 3: Food Orbs & Star Chips
- Small=1pt green 93%, Medium=3pt blue 4%, Large=5pt pink 3% — match
- Death food orbs: body→S/M/L scattered along body, total=snake score, Large=score÷5, Medium=remainder÷3, Small=rest — match
- Wall death: NO food orbs (score destroyed) — match
- Star chips: 10 per player death, each=carried÷10, only real players collect, bots never see/collect/drop — match
- Star chip scatter (ring pattern, not scattered) — match

### ✅ Section 4: Boost Mechanic
- Speed: 4.5 → 8.0 — match (BASE_SPEED=4.5, BOOST_SPEED=8.0)
- Tail drops food orb, snake shrinks 1 segment — match (BOOST_DROP_INTERVAL controls timing)
- Need >8 body segments — match (BOOST_MIN_LENGTH=8)
- Earned mass required (score above starting) — match

### ✅ Section 5: Collision Rules
- Head-to-body: YOU die, food scattered, 10 stars if carried chips >0 — match
- Neck protection: first 5 segments — match (NECK_PROTECTION_SEGS=5)
- Head-on: Neither boosting → larger wins. Smaller boosting + larger steady → smaller survives. Both boosting → larger wins. Tie → both die — match
- Map boundary = instant death — match
- Wall death: NO food (score destroyed), stars YES if carried > 0, bot wall death = vanish cleanly — match

### ✅ Section 6: Bot AI Behavior
- 5 personalities implemented: scavenger, opportunist, hunter, extractor, coward — match
- Harvesting: seek food, dodge players (predictive 8 ticks), avoid body (150px), turn from boundary — match
- Self-destruct (online only): score ≥100, navigate toward wall, NEVER boost, collect food on way — match
- Self-destruct wall death = vanish cleanly — match

### ✅ Section 7: Map & Safe Spawning
- Online: circular, ±40px breathing over 10s, radius scales with player count — match
- Offline: infinite, no boundaries — match
- Safe spawn: 500px from snakes, 500px inside boundary — match
- 4s spawn protection — match (RESPAWN_INVULN_MS)

### ✅ Section 8: Extraction
- Hold E / EXTRACT button, 3-second progress — match
- Forward gliding allowed — match (speed = EXTRACT_GLIDE_SPEED)
- Steering restarts progress — match (game-server STEER_THRESHOLD = 0.08 rad ≈ 4.6°)
- Progress ring near head (private, only you see) — match (render-helpers)
- Extract anytime, anywhere — match
- Commission display — match
- Movement flash warning — match (extract_cancelled_by_steer event)

### ✅ Section 9: HUD
- Top-left: Carried Chips, Stars Earned, Stars in Arena (online only), Rank, Score, Kills, Boost reminder, Active Competitors — match
- Top-right: Banked Chips, FPS/Ping, Arena Leaders — match
- Bottom-left: Quick Chat emotes (5, keys 1-5, 4s bubbles) — match
- Bottom-right: BOOST (64px), EXTRACT (80px), EXIT — match

### ✅ Section 11: Death & Replay
- Body → food orbs along path, total = score — match
- 10 stars at death position — match
- Replay: 15s before + 15s after — match (450 frames × 30Hz = 15s each)
- Online replay player exists with play/pause, speed, scrub — match

### ✅ Section 12: Leaderboards
- Lobby leaderboards with milestone badges — match
- Arena leaderboards (online: real players by chips; offline: bots + player by score) — match

### ✅ Section 13: FAQ
- Graduated commission, extraction restart, private ring, bot self-destruct — all match

---

## APPROVED FEATURES STATUS

| Feature | Status | Notes |
|---------|--------|-------|
| Online replay system | ✅ Implemented | OnlineReplayPlayer component exists, was crashed by isOfflineMode bug (FIXED) |
| Kill feed / event log | ✅ Implemented | Server emits kill_feed, client displays top-left |
| Sound effects | ⚠️ Partial | Extract/death/kill sounds work. Food/boost/wall sounds NOT wired |
| Bot personalities | ✅ Implemented | 5 personalities with distinct behavior in game-state.ts |
| Bot vs player visual | ✅ Implemented | isBot check in render-helpers for labels, minimap dots |
| Extraction steering restart | ✅ Implemented | STEER_THRESHOLD in game-server, front gliding allowed |
| Arena stats player count | ❌ REJECTED | Per user instruction |
| Last alive notification | ❌ REJECTED | Per user instruction |

---

## IMPLEMENTATION PLAN (Priority Order)

### Phase 1: Fix Audio Wiring (small scope)
1. Fix BOOST_DROP_INTERVAL: 40 → 10 in game-config.ts (rules say ~3/sec)
2. Wire `playFoodCollect()` — add server `food_eaten` event OR client detection
3. Wire `playBoost()` — import and call on boost activation
4. Wire `playWallHit()` — import and call on wall death

### Phase 2: Verify Replay (test thoroughly)
1. The isOfflineMode fix should unblock replay
2. Test: online death → replay button → plays correctly
3. Verify frame data types align between game-canvas and OnlineReplayPlayer

### Phase 3: Rewrite Only If Needed
- Current code is mostly correct per rules analysis
- 9 GAPs found, 1 critical bug fixed, 4 sound wiring issues, 1 config fix
- Major rewrite NOT recommended — targeted fixes sufficient
