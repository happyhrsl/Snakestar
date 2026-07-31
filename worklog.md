# Work Log

---

## Task 1: Catalog game-rules-modal.tsx

- **File:** `/tmp/venom-arena/src/components/modals/game-rules-modal.tsx` (851 lines)
- **Output:** `/home/z/my-project/gdd-parts/01-game-rules-modal.md`
- **Status:** ✅ Complete
- **Summary:** Exhaustive catalog of every text string, number, button label, heading, paragraph, FAQ Q&A, table data, emoji, keyboard control, HUD string, and code comment found in the Game Rules Modal component. Cross-referenced with `@/lib/game-config.ts` to resolve all 30 ARENA_TIERS rows (name, buy-in, bots, XP multiplier, difficulty) and 3 PRACTICE_TIERS rows. Noted that `MILESTONE_TIERS` is imported but unused in render (milestone table is hardcoded inline). Identified 3 unused lucide-react imports (Compass, Sparkles, Medal). Captured all 19 FAQ items, 7 milestone badge rows, 4 challenge tier cards, all 5 emotes, and all numeric game parameters.

---

## Task 2: Catalog game-config.ts

- **File:** `/tmp/venom-arena/src/lib/game-config.ts` (1196 lines)
- **Output:** `/home/z/my-project/gdd-parts/02-game-config.md`
- **Status:** Complete
- **Summary:** Exhaustive catalog of every constant, variable, interface, type alias, array entry, object field, and code comment in the shared game config file. Captured all 30 online competitive arena tiers (every field: id, name, buyIn, description, difficulty, color, accentColor, borderAccent, botsCount, rewardMultiplier), all 3 practice tiers, all 27 cosmetics (13 skins, 3 trails, 2 death bursts, 6 flags, 3 banners), all 24 physics/world constants, 3 food orb configs, 6 bot constants, 7 daily rewards, 10 chip store packs, 2 promo codes, XP/level formulas, 20 bot names, 6 bot skins, 197 countries, 8 milestone tiers, 10 mock leaderboard entries, 6 Hall of Fame tiers, 4 championship prize tiers, 13 championship contenders, 4 initial friends, 3 initial rivals, 12 global community players, 11 social country filters, 2 public clans, 10 preset emblems, 7 bot chat replies, 3 sample clans (ClanSystem), 20 free season pass rewards, 20 elite season pass rewards, 3 showcase clips, inspector data (2 regional allies, 2 global allies, 2 badges, 4 loadout items), 19 exported interfaces, 2 type aliases, and 8 helper functions. Noted: no challenge templates exist in this file.

---

## Task 3: Catalog game-canvas.tsx

- **File:** `/tmp/venom-arena/src/components/game/game-canvas.tsx` (3152 lines)
- **Output:** `/home/z/my-project/gdd-parts/03-game-canvas.md`
- **Status:** ✅ Complete
- **Summary:** Exhaustive catalog of the main GameCanvas component (~17 HUD elements) and its two sub-components (ReplayPlayer, EndOverlay). Captured: 22 sections covering all constants/thresholds (50+ numeric values), all 26 lucide-react icons with exact usage locations, all 25 React state variables with types/initial values, all 50+ ref variables, 15 toast messages, 5 emote texts (with button label vs socket message discrepancies), 12 sound effect triggers, 19 socket events (7 client→server, 12 server→client), 10 keyboard controls, complete HUD breakdown by screen position (connecting overlay, reconnecting banner, top-left stats with 5 sub-cards, top-right banked/FPS/ping, chat/minimap toggle row, arena leaderboard panel with open/collapsed states, full-map close button, death vignette, kill feed with wall/elimination formats, hold-to-extract popup with progress bar and fee display, mobile boost/extract buttons, leave button, emotes bar, minimap, virtual joystick), full EndOverlay catalog (accent bars, icons, title logic with 4 variants, subtitle logic with 5 variants, death stats panel online/offline, killer card with avatar/tag/social buttons, replay viewer trigger, 3-column extract stats, online results table with commission, offline results, final banked/level with level-up badge, pending tally, 6 action buttons with IDs and conditional labels, ESC hint), ReplayPlayer controls (6 buttons + progress bar + death marker + canvas watermarks), Chat dialog, all color references (Tailwind classes and raw CSS values organized by category), replay buffer system (pre/post 300-frame circular/linear buffers), connecting message states (5 variants), full online-vs-offline conditional display differences table (21 elements), offline mode behavior, input priority system, socket.io configuration, and killer avatar fallback logic.

---

## Task 4: Catalog offline-engine.ts

- **File:** `/tmp/venom-arena/src/components/game/offline-engine.ts` (3149 lines)
- **Output:** `/home/z/my-project/gdd-parts/04-offline-engine.md`
- **Status:** Complete
- **Summary:** Exhaustive catalog of the entire offline game loop + bot AI engine. Cross-referenced with `@/lib/snake-engine.ts` and `@/lib/game-config.ts` to resolve all engine config values and formulas. Captured 30 sections: 7 public/internal type definitions (OfflineState, SnakeBase, BotSession, VirtualBot, Food, GridItem, ReplayFrame), 50+ constants organized by subsystem (game loop, input, rendering, adaptive quality, bot AI, virtual bot pool, food spawning, replay, extraction), complete DEFAULT_SNAKE_CONFIG table (30+ parameters with values), 5 growth/physics formulas with documented score-value examples, 13-step tickPhysics game loop, full bot AI decision tree (5-priority system: player predictive evasion, bot predictive evasion, threat flee, food seek, wander) with all numeric thresholds, virtual bot pool lifecycle (1000 definitions, activation/deactivation with hysteresis, recycling), collision detection rules (head-on with 4-case boost-aware resolution, body collision with neck protection index 5), food system (3 orb sizes with weights 93/4/3%, weighted spawn, death food distribution along body with scatter), spawn system (player at origin with 4s protection, bot score 0-79, safe respawn >=1500px), boost mechanics (8px/tick speed, -1 score per 10 ticks, small food drop at tail), death mechanics (player death flow with 15s post-death recording, bot recycling), state machine (3 states with transitions), camera system (0.18 lerp, mobile 0.58/ desktop 0.9 zoom, growth-based zoom-out), spatial hash grid (120px cells, every-2nd-segment insertion), input system (mouse/keyboard/touch joystick with deadzones), extraction system (3s hold at 3.2px/tick glide), opacity layering (larger snakes fade to 0.75 when smaller snake within 3x combined sizes), particle system (eat 4 particles, death 24 particles, 0.96 damping), adaptive quality (40 FPS low/55 FPS high thresholds with 2s/5s durations), replay system (pre 450 + post 450 frame buffers, 0.25-2x speed, 0.3-2.0 zoom, 30-point snake downsampling), complete HUD breakdown (6 sections with exact pixel sizes and colors), 20 bot names, 6 bot skins, 5 quick emotes, skin resolution from localStorage, chat system (4s expiry), and full function index (65+ functions).

---

## Task 5: Catalog render-helpers.ts

- **File:** `/tmp/venom-arena/src/components/game/render-helpers.ts` (1218 lines)
- **Output:** `/home/z/my-project/gdd-parts/05-render-helpers.md`
- **Status:** Complete
- **Summary:** Exhaustive catalog of all canvas drawing functions (20 functions). Captured 20 sections: 5 type/interface definitions (FrameRenderCtx with 11 fields, Particle, VisibleRect, MinimapArgs, FullMapArgs), arena background (fill `#020617` clipped circle), grid (spacing 60, stroke `#1e293b`, width 1/zoom), arena boundary (stroke `#f43f5e`, width 10, shadowBlur 16), dynamic boundary (breathing ±3px via `sin(tick*0.0015)*3`, outer glow blur 20, inner ring `rgba(244,63,94,0.35)` width 3 at r-6), 3 food orb tiers (small: r3 `#34d399`/`#10b981` blur6, medium: r5 `#38bdf8`/`#0ea5e9` blur10, large: r8 `#f472b6`/`#ec4899` blur16), orb radial gradient (white→color→glow at stops 0/0.3/1), large orb pulse (±1.5px at `sin(now*0.004)`), star collectibles (5-pointed, outer/inner 40% ratio, rotation `tick*0.002`, pulse ±1.5px, glow `#f59e0b` blur 12±4, gradient `#fef3c7`→`#fbbf24`→`#f59e0b`), star chip label (bold monospace, size 7-11px, color `#7c2d12`, format `Nk` for ≥1000), extraction ring (track white 15% opacity, progress arc white→green interpolated RGB, round lineCap, glow pass), snake body (polyline width=radius*2, round cap/join, outline +4/zoom at 55% alpha), 5 skin patterns (metallic: radial gradient `#f8fafc`→secondary→color at stops 0/0.35/1, bucketed cache; rainbow: HSL chunks `(now*0.05+i*14)%360` sat90% light55%; neon: alternating `#06b6d4`/`#a855f7` via `sin(now*0.009-chunkIdx*0.28)`; camo: 4-color cycle `#15803d`/`#854d0e`/`#78350f`/`#166534`; default: solid color), snake head (filled circle, player glow shadowBlur 14), eyes (white `#ffffff` radius 32% of snake, pupils `#0a0a0a` radius 18%, forward-offset, perpendicular placement), spawn protection ring (white 60%, width 2/zoom, radius+4/zoom), name labels (monospace, bots orange-400 75% with `[BOT]` prefix, player green-500, others slate-200 85%), user tag (slate-400 70%, 8-9px), chip label (Indian K/L/Cr formatting, black 65% pill with amber-400 70% border, corner radius 4/zoom, white text), chat bubble (slate-900 92% bg, indigo-500 60% border, width 1.5/zoom, corner radius 4/zoom, max 80 chars truncated with ellipsis, slate-50 text), particles (additive blend `lighter`, linear alpha fade, circles sized by particle.size/zoom, max 200), proximity layering (30px threshold, larger snake fades to 0.75), minimap (deep slate 85% bg, indigo-500 40% border width 1.5, 3 concentric rings at insets 2/5/8, crosshairs slate-900 40%, dashed arena boundary rose-500 60% dash [4,4], player dot indigo-400 r3, bots rose-500 r2, real players emerald-400 r2), full map overlay (deep slate 94% bg, margin 80px, 3 concentric rings at 25/50/75%, crosshairs slate-900 50%, dashed arena rose-500 80% dash [6,6] width 2, player dot indigo-400 r5 with pulse ring r9, bots rose-500 r2.5, real players emerald-400 r3, title "ARENA OVERVIEW — ALL SNAKES" bold 14px, hint "Press M to close" 11px, legend with 3 entries at 18px spacing), complete color master list (23 hex + 22 rgba + 1 HSL runtime), 9 animation/timing formulas with computed periods, low quality mode effects (6 disabled features), all 8 font settings, 20+ drawn shape types, 4 imported config values, and 8-step rendering pipeline order.

---

## Task 6: Catalog game-server (index.ts, game-state.ts, spatial-grid.ts)

- **Files:** 
  - `/tmp/venom-arena/mini-services/game-server/index.ts` (1063 lines)
  - `/tmp/venom-arena/mini-services/game-server/game-state.ts` (1215 lines)
  - `/tmp/venom-arena/mini-services/game-server/spatial-grid.ts` (111 lines)
  - Cross-referenced: `src/lib/game-config.ts`, `src/lib/snake-engine.ts`, `src/lib/types.ts`
- **Output:** `/home/z/my-project/gdd-parts/06-game-server.md`
- **Status:** ✅ Complete
- **Summary:** Exhaustive catalog of the entire online game server. Captured 25 major sections: (1) Server Architecture — port 3001, Socket.IO with CORS *, Caddy gateway, ping 60s/25s; (2) Network Protocol — 6 client→server events (join_arena, input, extract, cancel_extract, chat, leave) with full payload schemas and rate limits, 10 server→client events (joined, join_error, kicked, death, match_result, snapshot, extract_progress, extract_start, extract_cancelled_by_steer, kill_feed, chat, server_shutdown) with all field names/types; (3) Authentication — JWT mandatory via POST /api/match/verify, one-socket-per-userTag enforcement; (4) Arena Room System — 1000-player shard capacity, lazy creation, 200-shard safety cap; (5) All server constants (5 local + 30+ from shared config); (6) Shared game constants from SnakeConfig (30+ parameters with exact values); (7) Growth formulas — body length (logarithmic, cap 200), visual radius (log, cap 11px), collision radius (max +1px), turn rate (linear diminishing), 3 speed states; (8) Tick loop 11-step processing order (30 Hz); (9) Player Session / SnakeBase complete field tables (22 + 12 fields); (10) Spawn initialization (all 24 fields set on join); (11) Server-authoritative movement — 6-step tickSnakeMovement with boost tail-drop mechanics; (12) Collision detection — body collision with spatial grid queries (size+30 range), neck protection (5 segments, 60° angle threshold), head-on collision with 3 rules (A/B/C) plus tie=both-die; (13) Death processing — 5 drop rule scenarios (body/headOn/wall for player vs bot vs selfDestruct), kill feed broadcast, 16-second post-death replay window, bot auto-replacement; (14) Food system — 3 orb sizes (1/3/5 pts, 3/5/8px, 93/4/3% weights), star chips (exactly 10 per death, chips/10 each, 12px #fbbf24), eating with headCollisionRadius+4 range, replenish up to 1200 per tick; (15) Death food drops — greedy Large/Medium/Small decomposition along body, shuffled, 20px scatter; (16) Extraction — no zone check (extract anywhere), 3s duration at 3.2px/tick glide, 0.08 rad steering threshold, progress events; (17) Match settlement — idempotent via matchSettling flag, commission (0% ≤3 players, 35% ≥4), full ReportResultPayload schema, death-before-match_result emit order; (18) Bot AI — 5 personalities (scavenger/opportunist/hunter/extractor/coward) with complete priority trees and all numeric thresholds, think intervals (80-210ms), evade radius multipliers (0.6×-2×), self-destruct at score ≥100, edge avoidance at mapRadius-300, 30 bot names, 6 bot skins, 30 bots per arena; (19) Spatial hash grid — 120px cells, Map<cellKey, Map<itemId, GridItem>>, clear-rebuild-per-tick pattern, value=0 sentinel for eaten food, GridItem 11-field schema; (20) Snapshot system — 20-field GameSnapshot, 22-field SnakeSnapshot, 60-point downsampling, top-10 arena leaderboard by carriedChips; (21) Safe spawn — 30 attempts, 500px boundary margin, 500px snake distance; (22) Chat — 80 char max, 2s cooldown, 4s display; (23) Economy — score vs carriedChips separation, commission calculation, XP formula (score×5 + kills×50)×multiplier, level=×200 XP; (24) All 44 verbatim code comments expressing design intent; (25) Complete logging catalog (25+ log points with levels). Plus: process signal handling (SIGINT/SIGTERM/SIGHUP/SIGPIPE/uncaughtException/unhandledRejection), graceful shutdown (400ms soft/2000ms hard), heartbeat every 15s, HTTP /stats endpoint.

---

## Task 7: Catalog Core Libraries (types.ts, snake-engine.ts, game-audio.ts, schema.prisma)

- **Files:**
  - `/tmp/venom-arena/src/lib/types.ts` (141 lines)
  - `/tmp/venom-arena/src/lib/snake-engine.ts` (663 lines)
  - `/tmp/venom-arena/src/lib/game-audio.ts` (145 lines)
  - `/tmp/venom-arena/prisma/schema.prisma` (196 lines)
- **Output:** `/home/z/my-project/gdd-parts/07-core-libs.md`
- **Status:** ✅ Complete
- **Summary:** Exhaustive catalog of all 4 core library files. (1) types.ts — 7 exported interfaces with complete field tables: PlayerProfile (30 fields), LeaderboardEntry (7), MatchResult (15), SnakeSnapshot (22), FoodSnapshot (9), ArenaLeaderboardEntry (8), GameSnapshot (14). Identified 4 union literal types. (2) snake-engine.ts — 6 exported interfaces (Vec2, SnakeConfig 38 fields, SkinSegment, SnakeSkin, SnakeMetrics, FoodOrbDef), 1 constant object DEFAULT_SNAKE_CONFIG with 43 key-value pairs, 24 exported functions with full signatures/formulas: 5 growth formulas (body length logarithmic, visual radius logarithmic, collision radius capped at +1px via hardcoded 0.1 multiplier, turn rate linear diminishing, speed 3-state priority), 2 movement functions (turnToward with angle wrapping, moveHead with cos/sin), 3 body management functions (buildInitialPath with segmentCount×spacing+1 points, extendPath with per-pixel interpolation and trim buffer of spacing+10, sampleSegments with gap navigation), 1 neck protection function (isNeckProtected with approach angle and body alignment checks against threshold), 2 skin functions (DEFAULT_SKIN constant with green-500/green-600 colors, getSegmentStyle with modulo wrapping), 3 collision helpers (dist, circlesOverlap with hitFactor parameter using strict less-than, pointInCircle), 2 food functions (getFoodOrbs returning 3 tiered definitions with exact hex colors #34d399/#38bdf8/#f472b6, randomFoodOrb with weighted selection), death food math (greedy Large/Medium/Small decomposition, wall death = zero drops), star chip value (10 stars each worth floor(carriedChips/10)), 2 map functions (breathing via sin oscillation ±40px/10s cycle, base radius via sqrt scaling from 3000-16000 for 1-1000 players), commission calculation (0% <4 players, 35% ≥4), normalizeAngle utility. (3) game-audio.ts — fully procedural Web Audio API with no audio files. 3 internal helpers (getCtx with lazy init and suspended-state resume, playTone with 5 params and exponential ramp to 0.001, playNoise with quadratic decay envelope), 3 exported control functions (setGameAudioMuted, isGameAudioMuted, initGameAudio), 8 exported sound effects with complete parameter tables: playFoodCollect (4 size variants 660/880/1100/1320 Hz, star adds 1760 Hz harmonic), playKill (noise 0.15s + sawtooth 220Hz 0.2s), playDeath (noise 0.3s + sawtooth 150Hz + delayed sine 100Hz at 100ms), playExtractStart (C5 523Hz + E5 659Hz at 80ms), playExtractSuccess (C5-E5-G5-C6 arpeggio 523-659-784-1047 Hz at 100ms intervals), playExtractRestart (440Hz→330Hz descending at 80ms), playBoost (noise 0.08s + detuned -200 cent 200Hz), playWallHit (noise 0.2s + 80Hz sine 0.3s). (4) schema.prisma — SQLite with prisma-client-js generator. 9 models: Player (33 fields, 8 relations, 3 indexes, 2 unique), Clan (8 fields, @id on tag, default emblem 🐍), ClanMessage (8 fields, cascade delete, composite index), DailyClaim (7 fields, unique on [playerId,day]), Purchase (7 fields, composite index), Gift (7 fields, 2 named relations giftFrom/giftTo, 2 indexes), Friendship (7 fields, 2 named relations, unique on [initiatorId,recipientId], status pending/accepted/blocked), Challenge (14 fields, 2 indexes, category kill/extract/star_collect/score/arena_entry), ChallengeProgress (7 fields, 4-field composite unique, no FK relation to Player — plain string playerId). GameConfig model (8 fields) for admin panel with 9 category values and 4 type values. Total: 98 fields, 18 relations, 13 unique constraints, 10 indexes across all models.

---

## Task 9: Catalog page.tsx main shell

- **File:** `/tmp/venom-arena/src/app/page.tsx` (1054 lines)
- **Output:** `/home/z/my-project/gdd-parts/09-page-shell.md`
- **Status:** ✅ Complete
- **Summary:** Exhaustive catalog of the monolithic SPA shell containing all panel navigation. Captured 25 major sections: (1) 45+ code comments with design intent; (2) 4 React hook imports, 1 external lib import (sonner), 20 lucide-react icons with exact usage locations, 18 internal component imports, 3 utility/type imports; (3) 4 type definitions (TabId 14-value union, Mission 10 fields, TabDef 5 fields, BentoGateProps 9 fields with 11 accent union values); (4) 15 state variables (activeTab defaulting 'dashboard', activeArenaId, isRulesOpen, missions, challengesLoading, challengeStreak, streakMultiplier, challengeTier, lastResult, inspectedPlayer, toastFn) + 5 derived values (xpThisLevel/Next/Into/Span/Percent); (5) 13-entry TABS array in exact source order with label/icon/activeColor/adminOnly — 'dashboard' has no tab entry; (6) 5 conditional rendering branches (loading spinner, AuthGate delegation, GameCanvas fullscreen, dashboard grid, sub-page nav+content); (7) Loading screen (Loader2 spinner + 'Loading arena…' text); (8) Auth gate (fully delegated to <AuthGate /> — NO inline login/register/guest/social UI); (9) Header — app branding 'Project Venom' with 'Arena' badge and 'STORES-SAFE COMPLIANT VERSION' subtitle, player badge with 'Challenger (Lvl N)' label, 'Secure Chips' wallet, 'Rules & Guide' button with 'Official Guide, Rules & FAQ' tooltip, 'Sign Out' button with 'Secure Logout' tooltip; (10) Dashboard hero banner — 'Lobby Headquarters' subtitle, 'WELCOME BACK, {NAME}' heading, XP progress bar, 'LAUNCH MATCHMAKER' button; (11) 12 Bento Gate cards with exact badge/title/description/footLeft/footRight text (Play/Shop/Profile/Leaderboard/Championships/HallOfFame/Syndicates/SeasonPass/Highlights/Claims/Vault/Social), Gate 12 is wide (2-col span); (12) Tactical Challenges panel with 4 tier color variants (elite/veteran/operative/fallback), streak badge '🔥 Nd streak ×M', loading/empty states, daily section ('Resets daily at UTC midnight') and weekly section ('Resets every Monday UTC'), challenge cards with progress bars (3 color states each), 'Claim'/'Claimed ✓' buttons; (13) Last Match summary with 'Extracted'/'Eliminated' + stats line; (14) Sub-page navigation — 'Lobby HQ' back button, 'STATION / {TAB}' breadcrumb, horizontal scrollable tab strip; (15) 13 tab-to-panel content mappings with props; (16) Footer — '© 2026 Project Venom Arena. All Rights Reserved. Fully store-safe, non-gambling gameplay edition.', 'APP_VERSION: 1.0.0-MVP', 'ENGINE: TSX_CANVAS'; (17) 2 modals (GameRulesModal, PlayerInspectorModal) with triggers and props; (18) 7 toast messages (extract/eliminate/logout/claim+bonus/claim+no-bonus/claim-error/network-error); (19) 6 handler functions with API calls and state mutations; (20) BentoGate sub-component with 11 accent class maps (5 properties each) and card structure; (21) 2 API endpoints (GET/POST /api/player/challenges); (22) 25 dynamic text templates; (23) 9 emojis used; (24) 10 responsive breakpoints; (25) 5 custom CSS classes. Complete alphabetical text inventory of all static UI strings.

---

## Task 11: Catalog all API routes

- **Files:** 43 route files under `/tmp/venom-arena/src/app/api/` (12 auth, 7 player, 1 chips, 5 friends, 6 clans, 2 leaderboard, 3 match, 4 admin, 2 other, 1 root)
- **Output:** `/home/z/my-project/gdd-parts/11-api-routes.md`
- **Status:** ✅ Complete
- **Summary:** Exhaustive catalog of every API route in the old Venom Arena project. Organized into 10 sections: (1) AUTH — 12 endpoints covering register, login, guest, logout, me, token, change-password, change-pin, forgot-password, social-login (GET+POST callback), and upgrade; (2) PLAYER — 9 endpoints covering GET/PUT player, GET/POST challenges (with complete challenge pool tables: 68 daily templates across 4 tiers, 40 weekly templates across 4 tiers), POST challenges/progress, POST cosmetic (buy+equip), POST daily, POST promo-reward, POST video-reward; (3) CHIPS — 1 endpoint for chip pack purchase; (4) FRIENDS — 5 endpoints for list, request, accept, remove, gift; (5) CLANS — 7 endpoints for list, create, join, leave, GET+POST chat, deposit; (6) LEADERBOARD — 2 endpoints for global/national/world-summit rankings and my-rank; (7) MATCH — 3 internal endpoints (join, result, verify) using x-internal-secret auth; (8) ADMIN — 5 endpoints for GET/PUT config, seed, modify-chips, ban; (9) OTHER — arena-stats and root. For every route captured: HTTP method(s), all request body/query fields with exact validation rules (regex patterns, min/max lengths, numeric clamps), complete response body structures with field types, every error message with exact text and HTTP status codes, all business logic (chip calculations, XP formula `floor((score*5 + kills*50) * rewardMultiplier)`, commission 0%/35% dynamic, daily streak 7-day cycle, challenge streak multipliers 1.5×/2×/3×, level tier thresholds, reward multipliers, starting chips 150, gift range 1-1000, clan max 30 members, video reward 50 chips/60s cooldown), all database operations (Prisma queries), and all code comments expressing design intent (marked as [CODE COMMENT]). Final section catalogs shared constants and cross-cutting patterns.

---

## Task 12: Catalog requirements-checklist.md and GAP-ANALYSIS.md

- **Files:**
  - `/tmp/venom-arena/requirements-checklist.md` (324 lines)
  - `/tmp/venom-arena/GAP-ANALYSIS.md` (165 lines)
- **Output:** `/home/z/my-project/gdd-parts/12-requirements-and-gaps.md`
- **Status:** ✅ Complete
- **Summary:** Exhaustive catalog of the complete requirements checklist (324 lines) and rules-vs-code gap analysis (165 lines). Captured: (A) REQUIREMENTS — 16 top-level sections with 100+ individual requirement items, every item with ✅ status (all implemented & verified). Section 1 Core Game Mechanics (6 subsections: snake movement 7 items with 4 speed constants, score/body 6 items with 5 constants, food orbs 4 items with 3 sizes and weights, star collectibles 5 items with STAR_DROP_COUNT=10, death food drop 7 items, boost mechanic 7 items with BOOST_MIN_LENGTH=8 and BOOST_DROP_INTERVAL=40), Section 2 Collision System (3 subsections: head-to-body 4 items with NECK_PROTECTION_SEGS=5, head-on 3 items with 3 rules A/B/C, wall/map 3 items), Section 3 Bot AI (4 subsections: 5 personalities with 5 behavior rules, self-destruct 6 items with threshold 100, bot restrictions 4 items, offline bots 5 items with 1000 count), Section 4 Map System (2 subsections: online 6 items with MAP_MIN_RADIUS=3000/MAP_MAX_RADIUS=16000/±40px breathing, offline 2 items), Section 5 Spawn System (2 subsections: safe spawn 5 items with SAFE_SPAWN_MIN_DIST=500px/SAFE_SPAWN_ATTEMPTS=30/RESPAWN_INVULN_MS=4000, bot displacement 2 items), Section 6 Death Replay System (4 subsections: recording 4 items with 300-frame buffers at 20Hz, camera behavior 6 items, UI 8 items with speed cycle 0.25-2x, server side 3 items with 16s post-death window), Section 7 Online vs Offline Differences (11-row comparison table), Section 8 Extraction System (7 items with EXTRACT_DURATION_MS=3000), Section 9 HUD/UI (3 subsections: in-game HUD 10 items, death screen 8 items, post-game 3 items), Section 10 Arena Tiers (8-row table: 7 competitive tiers from Slum Alley 10-buyIn/25-bots to Apocalypse 100000-buyIn/60-bots, plus Practice 0-buyIn/1000-bots), Section 11 Social Features (7 items including +25 chips daily gifting), Section 12 Admin Features (3 items), Section 13 Cosmetics (6 item categories), Section 14 Progression (4 items), Section 15 Infrastructure (10 items including Next.js 16 port 3000, Socket.IO port 3001, 20Hz online/30Hz offline), Section 16 Rules & Guide Page (4 items). (B) GAP ANALYSIS — 1 critical bug (BUG #1: isOfflineMode undefined in EndOverlay, ✅ FIXED), 5 rule-vs-code gaps (GAP #1: BOOST_DROP_INTERVAL 40→10, GAP #2: food collect sound never plays online, GAP #3: boost sound never plays, GAP #4: wall hit sound never plays, GAP #5: star chip collection sound missing), 12 verified-correct rule sections (Sections 0-13, all ✅), 8-row approved features status table (2 ✅, 1 ⚠️ partial, 2 ❌ rejected), 3-phase implementation plan (Phase 1: 4 audio wiring fixes, Phase 2: replay verification, Phase 3: targeted fixes only). All file paths, line numbers, severity ratings, descriptions, and suggested fixes preserved verbatim.

---

## Task 10: Catalog auth-gate.tsx, lib files & hooks

- **Files:**
  - `/tmp/venom-arena/src/components/auth/auth-gate.tsx` (746 lines)
  - `/tmp/venom-arena/src/lib/auth.ts` (82 lines)
  - `/tmp/venom-arena/src/lib/constants.ts` (2 lines)
  - `/tmp/venom-arena/src/lib/oauth.ts` (210 lines)
  - `/tmp/venom-arena/src/lib/api-helpers.ts` (22 lines)
  - `/tmp/venom-arena/src/lib/game-config-db.ts` (461 lines)
  - `/tmp/venom-arena/src/lib/player-helpers.ts` (56 lines)
  - `/tmp/venom-arena/src/lib/date-utils.ts` (40 lines)
  - `/tmp/venom-arena/src/lib/db.ts` (18 lines)
  - `/tmp/venom-arena/src/lib/utils.ts` (6 lines)
  - `/tmp/venom-arena/src/hooks/use-mobile.ts` (19 lines)
  - `/tmp/venom-arena/src/hooks/use-toast.ts` (193 lines)
- **Output:** `/home/z/my-project/gdd-parts/10-auth-and-other.md`
- **Status:** ✅ Complete
- **Summary:** Exhaustive catalog of all 12 files. (1) auth-gate.tsx — 7 internal functions (getPasswordStrength, AuthGate default export, AuthGateSkeleton export, AuthScreen, LoginForm, RegisterForm, ForgotPasswordForm), 12 lucide-react icons with exact usage locations, password strength calculator (4 labels: Weak/Fair/Good/Strong, 5 scoring criteria), loading state ("Loading arena…" text + Loader2 spinner), AuthScreen with logo (Skull icon + "VENOM ARENA" heading + "Hunt. Harvest. Extract. Don't get caught." tagline), card header ("Enter the arena" title + "Sign in or create an account to play." description), 2-tab navigation (Login with LogIn icon, Register with UserPlus icon, default=login, error cleared on tab switch), social login divider ("or continue with"), 3 social buttons (Google/Facebook/Apple with inline SVG icons, all redirect to /api/auth/social-login?provider=X), guest divider ("or"), guest button ("Play as Guest" with Ghost icon, POST /api/auth/guest), bottom info ("⚡ Guests get 150 starter chips. Register to keep your progress."), "View Rules & Guide" link (BookOpen icon), Forgot Password dialog ("Reset Password" title, "Enter your email and 4-digit Security PIN to set a new password." description). LoginForm: 4 fields (Email with Mail icon + placeholder "you@arena.gg", Password with KeyRound icon + placeholder "••••••••" + Eye/EyeOff toggle, Remember me checkbox "Remember me (30 days)", hidden error with Shield icon), submit "Login" button, 2 cross-links ("Don't have an account? Register", "Forgot Password?"), 3 error messages ("Something went wrong.", "Network error. Please try again."). RegisterForm: 5 fields (Display name "up to 20 chars" placeholder "ViperStrike" maxLength 20, Email with Mail icon placeholder "you@arena.gg", Password "min 6 chars" minLength 6 with strength indicator showing "Strength: {label}", Confirm Password with Eye/EyeOff toggle, Security PIN "4 digits, optional" maxLength 4 pattern [0-9]{0,4} placeholder "e.g. 1234" helper "Required for password recovery. Keep it safe!"), validation "Passwords do not match." via DOM manipulation, submit "Create Account" button, cross-link "Already have an account? Login". ForgotPasswordForm: 4 fields (Email placeholder "you@arena.gg", "4-Digit Security PIN" required placeholder "1234" helper "This is the PIN you set during registration.", "New Password (min 6 chars)" minLength 6 with Eye/EyeOff toggle, "Confirm New Password" always hidden), 3 error messages ("Passwords do not match.", "Failed to reset password.", "Network error. Please try again."), success state ("Password Reset!" heading, "Your password has been changed..." description, "Back to Login" button with Shield emerald icon), submit "Reset Password" button. All autoComplete values, tabIndex, inputMode, and pattern attributes cataloged. (2) lib/auth.ts — 3 constants (JWT_SECRET fallback, COOKIE_NAME='va_session', SESSION_DAYS=30), SessionPayload interface (5 fields with role union), 9 exported functions (signSession, verifySession, getSession with banned-player check, setSessionCookie with httpOnly/lax/secure, clearSessionCookie, hashPassword bcrypt rounds 10, verifyPassword, generateUserTag VENOM-NNNN, generateUniqueUserTag 20 retries). (3) lib/constants.ts — DEFAULT_UNLOCKED_SKINS=['skin-default','trail-none','death-default']. (4) lib/oauth.ts — OAUTH_PROVIDERS constant, OAuthProvider/OAuthUserInfo/OAuthConfig interfaces, 7 exported functions (getRedirectUri, getProviderConfig, getAuthorizationUrl, exchangeCodeForTokens, getUserInfo with Apple JWT decode, getSetupGuide, isProviderConfigured), 3 provider configs with exact URLs/scopes, 3 console error templates, 3 setup guide strings. (5) lib/api-helpers.ts — requireAuth function returning 'Not authenticated.' at 401. (6) lib/game-config-db.ts — GameConfigEntry interface, DEFAULT_GAME_CONFIG with 40 entries across 9 categories (snake_physics 10, snake_growth 4, boost_system 2, collision 4, food_system 11, extraction 2, spawning 4, map_settings 4, bot_settings 3, economy 3), 3 exported functions (seedGameConfig, getGameConfig, getGameConfigValue). (7) lib/player-helpers.ts — 3 exported functions (toProfile mapping 30 Player→PlayerProfile fields, encodeSkins with Set dedup, getFirstAdmin). (8) lib/date-utils.ts — 5 exported functions (utcToday, utcMonday, utcYesterday, utcLastMonday, internal fmt). (9) lib/db.ts — PrismaClient singleton with dev query logging. (10) lib/utils.ts — cn() Tailwind class merger. (11) hooks/use-mobile.ts — useIsMobile() hook, MOBILE_BREAKPOINT=768. (12) hooks/use-toast.ts — useToast/reducer/toast exports, TOAST_LIMIT=1, TOAST_REMOVE_DELAY=1000000, 4 action types, full reducer logic. Master text inventory of all 42+ user-facing strings appended.

---

## Task sc-1: Championships Panel Screen Content Walkthrough

- **Files:** `/tmp/venom-arena/src/components/panels/championships.tsx` (440 lines) + `/tmp/venom-arena/src/lib/game-config.ts` (1196 lines)
- **Output:** `/home/z/my-project/screen-content/championships.md`
- **Status:** Complete
- **Summary:** Full visual mockup walkthrough of the Championships panel as seen on screen. Documented: hero banner with 2 badges, heading, paragraph; live countdown timer (4 boxes) to Jan 1 2027; player dossier section with progress bar, competing wallet chips, registration status, and conditional join/play buttons; 4 prize tier cards from CHAMPIONSHIP_PRIZE_TIERS config (Rank 1, Ranks 2-10, Ranks 11-50, Ranks 51-100) each with badge, title, chips (INR formatted), crown title, item reward, and HOF induction line; 3 scope tabs (Global/Regional/National); region and country dropdown filters; 5 rank filter buttons (All Ranks, Rank 1, Ranks 2-10, Ranks 11-50, Ranks 51-100); standings table with 12-col grid header and 14 initial contender rows (re-sorted by walletChips at runtime). Also fully documented all requested config data objects: CHAMPIONSHIP_PRIZE_TIERS (4 tiers), INITIAL_CONTENDERS (14 contenders), HALL_OF_FAME_TIERS (6 tiers), SEASON PASS (20 free + 20 elite rewards + cost), SAMPLE_CLIPS (3 clips), SOCIAL data (4 friends, 3 rivals, 12 community players, 2 public clans, 11 country filters). Noted behavior quirks: ranks are re-assigned at runtime, player injected at rank 142 (overridden by sort), HOF badge shown unconditionally on every row, Indian number formatting via fmtINR().

---

## Task sc-2: Screen content — Hall of Fame panel

- **File:** `/tmp/venom-arena/src/components/panels/hall-of-fame.tsx` (542 lines)
- **Config:** `/tmp/venom-arena/src/lib/game-config.ts` — HALL_OF_FAME_TIERS, INITIAL_COMMENTARY, COMMENTARY_NAMES, COUNTRIES, countryFlag/countryName, InspectedPlayer
- **Primitives:** `/tmp/venom-arena/src/components/panels/_panel-primitives.tsx` — NotSignedIn, MicroLabel, GlowBlob
- **Output:** `/home/z/my-project/screen-content/hall-of-fame.md`
- **Status:** Complete
- **Summary:** Exact visual mockup of the Hall of Fame panel. Documented the NotSignedIn gate, header (Crown icon + title + subtitle), 3-tab bar (Milestone Tiers, Tournament Archives, Live Esports Ticker), persistent LIVE BROADCAST marquee with 3 seed commentary entries and 4 live ticker templates. For Tab 1 (Milestones): info banner, year selector (2022–2026), all 6 tier cards with full data from HALL_OF_FAME_TIERS (badge, name, chips, firstAchiever with flag/name/tag/date, totalAchieversCount, threshold), Season pill, Achieved badge, and View Ranks button. For Tab 2 (Archives): year selector, country dropdown (10 COUNTRY_OPTIONS), Top 100 table with 12-col grid layout, 3 seeded players per country (IN/US/KR), rank medals, NATIONAL CHAMP badge, Inspect buttons. For Tab 3 (Ticker): 4 channel filter buttons, scrolling event list with timestamps, empty state. Tier Top 100 modal: full-screen overlay with 6-column table, rank display logic (crown for #1, medals for #2-#3), special 3-row behavior for t-1crore. Inspect action data shape documented. All chip values use en-IN locale formatting.

---

## sc-3 — Shop & Lab Panel Screen Content
- **Task:** Document EXACTLY what a user sees on screen when clicking the Shop & Lab panel.
- **Primary source:** `/tmp/venom-arena/src/components/panels/cosmetics-shop.tsx` (2306 lines)
- **Data source:** `/tmp/venom-arena/src/lib/game-config.ts` — ALL_COSMETICS (27 items), SLITHER_PRESETS (20 presets), PALETTE_COLORS (18 swatches)
- **Primitives:** `/tmp/venom-arena/src/components/panels/_panel-primitives.tsx` — PanelSkeleton (6× h-44 pulse bars), NotSignedIn ("Not signed in.")
- **Output:** `/home/z/my-project/screen-content/shop-and-lab.md`
- **Status:** Complete
- **Summary:** Exact visual mockup of the Shop & Lab panel. Documented all pre-render gates (loading skeleton, not-signed-in), the header (ShoppingBag icon + "Identity Workshop & Skin Gallery" H2 + subtitle), 2 view-mode tabs ("🎨 Skin & Effect Gallery" / "🧬 Genetic Pattern Lab"), 7 category filter tabs. View 1 (Gallery): 20 free SLITHER_PRESETS with full names/descriptions/emojis/shapes/tapers/glow per card; 13 premium skins from ALL_COSMETICS with exact id/name/cost/description/emoji/pattern; 3 laser trails; 2 death novas; 6 flags; 3 profile banners — all with exact button states (Equipped / Equip X / Unlock N Chips), badge states (Active / Locked), and card-specific visuals (canvas wiggle preview for skins, pinging dots for trails, Flame icon for deaths, bouncing emoji for flags, gradient bar for banners). View 2 (Genetic Pattern Lab): TryOn Preview 450×180 canvas with "LAB HOLO-PREVIEW (STEER TO TEST)" overlay; Projector Details Card with "GENETIC PROFILE STATS" / "Pattern DNA Engine" H3 / NODES + GLOW stats / Deploy button (two states); Step 1 (Construct Stripe Sequence) with 18 named palette swatches, active color strip with crown node indexing, 4 helper buttons (Double Sequence Length, Mirror Symmetrically, Mutate DNA, Reset); Step 2 (Choose Segment Geometry) with 6 options (Smooth Circles, Dragon Scales, Armored Plates, Crystal Shards, Spiky Obsidian, Basilisk Diamonds); Step 3 (Body Taper Physics) with 4 taper options (Natural Taper, Uniform Width, Sinuous Wave, Heavy Head); Step 4 (Bioluminescent Aura) with Neon Glow toggle switch. All 22 toast notification messages documented with trigger conditions and types.

---

## sc-4 — Dossier (Player Profile) Panel Screen Content
- **Task:** Document EXACTLY what a user sees on screen when clicking the Dossier (Player Profile) panel.
- **Primary source:** `/tmp/venom-arena/src/components/panels/player-profile.tsx` (2360 lines)
- **Data source:** `/tmp/venom-arena/src/lib/game-config.ts` — ARENA_TIERS (30 tiers), COUNTRIES array, getCosmeticById
- **Primitives:** `/tmp/venom-arena/src/components/panels/_panel-primitives.tsx` — PanelSkeleton (1× h-48 + 2× h-40), NotSignedIn ("Not signed in.")
- **Output:** `/home/z/my-project/screen-content/dossier.md`
- **Status:** Complete
- **Summary:** Exact visual mockup of the Dossier (Player Profile) panel — the largest panel at 2360 lines. Documented all pre-render gates (loading skeleton, not-signed-in). Header section: avatar (custom image / preset emoji / equipped skin fallback with level badge), player name with country flag + code badge, edit button, Ledger Tag + Global Standing #999, 3 conditional social badges (Instagram/YouTube/Twitch), level progress bar with XP, Sign Out button. 4-tab navigation: "Records & Statistics" / "Match History Ledger" / "Friends & Spectate (N)" / "Identity Anti-Tamper Logs". Tab 1 (Stats): conditional Guest Upgrade Banner (collapsed + expanded form with 4 fields), conditional Identity Editor (Challenger Handle input, Faction Region dropdown with all COUNTRIES, avatar drag-drop zone with 3 states, 8 preset emblems, 3 social channel inputs, Cyber Handshake Warning), 8 stat cards (Banked Wallet, Tournament Kills, K/D Ratio, Extraction Rate, Survival Streak, Record Extraction, Lifetime Retained, Total Forfeited), Annual Tournament Guardrails section with 3 cap cards (Matches Allowed, Annual Buy Cap, Rewarded Ads Today), conditional Security Settings card (registered accounts only — Change Password form + Security PIN form with set/change states), Challenger Standing Rating info banner. Tab 2 (History): header with "Showing last 25 operations", empty state, 7-column match history table with arena name + ONLINE/PRACTICE badge, EXTRACTED/COLLIDED status badge, chips outcome with +/- prefix and color, kills, tail score, time elapsed with clock icon, timestamp. Tab 3 (Friends): section header with description, add-friend form (input + Sync Ally button), friend card grid with avatar + status dot (4 colors), name/tag/level/status, conditional action buttons (Spectate for in-match, Invite for online/idle, Gift/Gifted with disabled states, Dismantle Alliance trash icon), Co-Op Lobby Invite modal (full-screen overlay, 2 balance cards, arena stakes list from 30 ARENA_TIERS with 3 eligibility pills, speech bubble with counter-proposal Accept button, Cancel + Send buttons). Tab 4 (Identity Logs): info banner about CHALLENGER REGISTRY LEDGER, empty state, log entries with TAG REGISTERED → arrows, REGION ALIGNMENT → arrows, HANDSHAKE TIMESTAMP, status badge (VERIFIED/APPROVED/FIRST_HANDSHAKE). All 27+ toast/notification messages catalogued with trigger/type. Seed data: 4 initial friends, 3 sample matches, 1 initial identity log entry. 8 preset avatar options documented.

---

## Task sc-5: Screen Content — Leaderboards Panel

- **File:** `/tmp/venom-arena/src/components/panels/leaderboards.tsx` (830 lines)
- **Data sources:** `/tmp/venom-arena/src/lib/game-config.ts` — COUNTRIES (208 entries), MILESTONE_TIERS (8 entries), MOCK_LEADERBOARD (10 entries), milestoneTierForChips(), countryFlag(), countryName(), InspectedPlayer interface
- **Type source:** `/tmp/venom-arena/src/lib/types.ts` — LeaderboardEntry interface
- **Primitives:** `/tmp/venom-arena/src/components/panels/_panel-primitives.tsx` — NotSignedIn ("Not signed in."), MicroLabel, GlowBlob
- **Output:** `/home/z/my-project/screen-content/leaderboards.md`
- **Status:** ✅ Complete
- **Summary:** Exhaustive visual mockup of the Leaderboards panel. Documented the signed-out gate (NotSignedIn), header section (2 status badges, title with Trophy icon, subtitle, last-sync MicroLabel, Refresh button with loading spinner), Your Rank summary card (5-column grid: Global Rank, National Rank, Milestone Badge, Banked Chips, Level — each with conditional loading/null states), 4-tab navigation bar (Summit/Global/National/Tiers with colored icons). Summit tab: info banner about World Cup Summit mechanic, table with columns Global Rank/Country #1 Champion/Nation/Banked Chips, medals for top-3, YOU badge, per-country champions. Global tab: competitor count line, table with Global Rank/Player & User Tag/Milestone Badge/Banked Chips, tier-colored badge pills, loading spinner state. National tab: country dropdown (208 countries), search input with placeholder, table with National Rank/Local Challenger/Level/Banked Chips, violet-themed YOU badge, empty state with country name. Tiers tab: info banner about Milestone Tier Ranking, 9 filter pill buttons (All/Rookie×2/Omega/Diamond/Platinum/Gold/Silver/Bronze with badge text and per-tier colors), table with Tier Rank/Player Name & User Tag/Country/Banked Chips, yellow-themed YOU badge, tier-specific seed data (Omega=3 entries, Rookie=100, others=100 each with first achiever). Player Inspector click behavior documented (fires onInspectPlayer callback with hardcoded clanTag/clanName/achievedAt + dynamic rank calculations). Auto-refresh: 30-minute polling of /api/leaderboard, manual Refresh button. 4 empty states documented. Visual differences table for YOU badge colors across tabs.

---

## Task sc-6: Screen Content Documentation — Arena Selector + Chip Store + Daily Rewards

- **Files read:**
  - `/tmp/venom-arena/src/components/panels/arena-selector.tsx` (491 lines)
  - `/tmp/venom-arena/src/components/panels/chip-store.tsx` (404 lines)
  - `/tmp/venom-arena/src/components/panels/daily-rewards.tsx` (240 lines)
  - `/tmp/venom-arena/src/components/panels/_panel-primitives.tsx` (208 lines)
  - `/tmp/venom-arena/src/lib/game-config.ts` (1196 lines) — ARENA_TIERS, PRACTICE_TIERS, CHIP_PACKS, DAILY_REWARDS, PROMO_CODES, MAX_YEARLY_BUY_CHIPS, MAX_DAILY_ADS, AD_REWARD_CHIPS
- **Outputs written:**
  - `/home/z/my-project/screen-content/arena-selector.md` — 30 online tiers (all names, buy-ins, XP multis, descriptions), 3 practice tiers, online/offline toggle, 6 difficulty filter tabs with counts, live player count polling, commission rules (0%/35%), join button text (3 states: affordable/unaffordable/practice), error toast, highest affordable jump link
  - `/home/z/my-project/screen-content/vault-chip-store.md` — 10 chip packs (names, prices INR/USD, chip amounts, bonus labels, descriptions, emojis), promo code section (VENOM +500c, CHAMPION +1000c), 12/day ad reward section, yearly 25L cap with lock alert, compliance notice, 3 button states (buy/locked/loading), all toast messages
  - `/home/z/my-project/screen-content/claims-daily-rewards.md` — 7-day cycle (10,20,50,100,250,500,1000c), streak display, 3 day cell states (today/claimed/future), 2 claim buttons (standard + 2x ad), already-claimed timer (HH:MM:SS), all toast messages
- **Status:** Complete

---

## Task sc-7: Screen Content — Social, Clan System, Season Pass, Highlights

- **Files read:**
  - `/tmp/venom-arena/src/components/panels/social-panel.tsx` (1322 lines)
  - `/tmp/venom-arena/src/components/panels/clan-system.tsx` (784 lines)
  - `/tmp/venom-arena/src/components/panels/season-pass.tsx` (254 lines)
  - `/tmp/venom-arena/src/components/panels/clip-showcase.tsx` (269 lines)
  - `/tmp/venom-arena/src/lib/game-config.ts` (1195 lines) — SEASON_PASS data, SAMPLE_CLIPS, PUBLIC_CLANS, SOCIAL_COUNTRY_FILTER, ARENA_TIERS, PRESET_EMBLEMS, BOT_REPLIES

- **Outputs written:**
  - `/home/z/my-project/screen-content/friends-and-search.md` — 2 top-level tabs (Friends & Global Search, Competitive Syndicate), 3 sub-tabs (My Friends, My Rivals, Search Global Players), friend cards with 5 action buttons (Claim Gift/Spectate/Invite/Send Gift/Remove), rival cards with HUNT button + head-to-head record + arena table, pending request cards (incoming Accept/Decline, outgoing Pending badge), global player list with 3 right-side states (self/connected/connect), 11 country filter options, 2 PUBLIC_CLANS data cards, Co-Op Invite Modal (30 arena tiers, dual balance display, 3 eligibility badges, fallback proposal), Create Clan Modal (4 form fields + 10 emblem buttons), all empty states and loading spinners, full toast table (22+ messages)
  - `/home/z/my-project/screen-content/syndicates.md` — 3 tabs (My Clan, Browse Clans, Form Syndicate), My Clan with/not-with-clan branches, 3 stat columns (Rank/Members/Level), treasury deposit section, 3 perks cards, member roster with LEADER badge + Inspect button, chat feed with 3 branches (loading/empty/messages), Browse tab with search + 3 card states (join/already member/disabled), empty clans state, Form tab with 4 fields + 6-option emblem dropdown, full toast table (15+ messages)
  - `/home/z/my-project/screen-content/pass.md` — Season banner (SEASON 01: VENOM GENESIS, 48 days remaining), Pass Status card (Free/Elite 2 branches, 1,00,000c unlock cost), XP progress bar (indigo→purple→pink gradient), all 20 tier cards with both Free and Elite tracks, exact reward names/icons/categories for all 40 items (20 free + 20 elite), 4 button states per track, all toast messages
  - `/home/z/my-project/screen-content/highlights.md` — Panel header with Share Game Clip button, clip card anatomy (thumbnail with platform badge + chips badge + play icon, body with title/creator/tags, footer with upvote + watch), all 3 SAMPLE_CLIPS rendered as exact visual mockups (titles, creators, tags, upvotes, dates, chips, platforms), Upload Modal (4 fields: title, platform dropdown, chips, URL), upvote 2-state button, all toast messages

- **Status:** Complete

---

## Task sc-8: Screen Content — Admin, Player Inspector, Auth Screens

- **Files read:**
  - `/tmp/venom-arena/src/components/panels/admin-panel.tsx` (488 lines)
  - `/tmp/venom-arena/src/components/panels/player-inspector-modal.tsx` (560 lines)
  - `/tmp/venom-arena/src/components/auth/auth-gate.tsx` (746 lines)
  - `/tmp/venom-arena/src/components/panels/_panel-primitives.tsx` (208 lines) — MicroLabel, NotSignedIn

- **Outputs written:**
  - `/home/z/my-project/screen-content/admin.md` — 3 screen states (Role Guard, Central Operations Gate, full 3-column dashboard). System Diagnostics column (Connected Sockets + Active Rooms, Global Intercom Broadcast, Syslog Monitor). Roster column (search, player rows with 4 action buttons, Economy Ledger Overrides). Full toast message table (12 entries).
  - `/home/z/my-project/screen-content/player-inspector.md` — Full modal walkthrough: banner, avatar+identity, 4 tabs (Overview, Career Stats, Extraction Logs, Loadout), 3 action buttons with state variants. Full toast table (4 entries).
  - `/home/z/my-project/screen-content/auth-screens.md` — Loading skeleton, Auth Screen (logo+tagline, card, tabs, social buttons, guest play), Login form, Register form (with password strength indicator), Forgot Password modal (form + success state). Complete reference tables for all errors, placeholders, labels, buttons, links, dividers.

---

## Task sc-9: Document Game Canvas HUD + Death/Extract Overlay

- **Sources read:**
  - `/tmp/venom-arena/src/components/game/game-canvas.tsx` (3152 lines)
  - `/tmp/venom-arena/src/components/game/render-helpers.ts` (1218 lines)
  - `/tmp/venom-arena/src/components/game/online-replay-player.tsx` (357 lines)

- **Output written:**
  - `/home/z/my-project/screen-content/game-hud.md` — 10 sections covering: (1) Connecting overlay (2 variants), (2) Reconnecting banner, (3) In-game HUD with 11 subsections (top-left cards, top-right banked/FPS/ping, chat+minimap row, arena leaderboard expanded/collapsed with online/offline format differences, kill feed wall vs eliminated formats, extraction hint+progress+commission, bottom BOOST/EXTRACT/LEAVE buttons, emotes bar 5 emotes with keys 1-5, minimap canvas-drawn radar, full arena map M-key toggle, chat dialog), (4) Toast notifications (14 entries), (5) Death overlay (title, 2 subtitle variants, 2 stats panel variants, killer card with 3 social buttons for real players, replay button, pending message, 3 action buttons), (6) Extract overlay (3 title variants, 3 subtitle variants, 3-column stats grid, 2 results table variants, banked+level panel, pending message, 3 action buttons with label variants), (7) Offline replay player (embedded canvas with 6 controls), (8) Online replay player (full-screen auto-hiding controls with 8 buttons + death marker + minimap), (9) Offline mode note, (10) Complete element inventory table (40+ rows). Canvas-drawn elements documented: snake names, [BOT] prefix, #tag, chat bubbles, star chip value labels, extraction ring.

- **Status:** Complete

---

## Task sc-10b: Complete game-rules-modal screen content

- **Source file:** `/tmp/venom-arena/src/components/modals/game-rules-modal.tsx` (850 lines)
- **Output file:** `/home/z/my-project/screen-content/game-rules-modal.md`
- **Status:** ✅ Complete
- **Summary:** Overwrote previously incomplete file (which cut off at Section 7) with the COMPLETE visual screen walkthrough covering ALL 14 numbered sections (0–13) plus unnumbered Arena Tiers (30-row table), Practice Tiers (3-row table), Hero Banner, Footer, and Footer Action Bar. Documented every section heading, paragraph, bullet point, table row (30 arena tiers, 3 practice tiers, 7 milestone badges, 4 challenge level tiers), all 19 FAQ Q&A items, all emotes, badges, numbers, button labels, and sub-component structures. Cross-referenced `@/lib/game-config.ts` for ARENA_TIERS (30 rows) and PRACTICE_TIERS (3 rows) data. Noted 3 unused lucide-react imports (Compass, Sparkles, Medal) and unused MILESTONE_TIERS config import.

---

## Task dashboard: Document Dashboard screen (default post-login view)

- **Source file:** `/tmp/venom-arena/src/app/page.tsx` (1053 lines)
- **Output file:** `/home/z/my-project/screen-content/dashboard.md`
- **Status:** ✅ Complete
- **Summary:** Complete visual screen walkthrough of the Dashboard (Lobby Headquarters) — the default view after login. Documented: (1) Sticky header with 4 controls (logo/title, player badge with avatar+level+name, chips wallet with Secure Chips label and pulse-animated icon, Rules & Guide button, Sign Out button), (2) Hero banner with Lobby Headquarters label, WELCOME BACK heading (dynamic name), XP progress bar (computed from xpForLevel curve), and LAUNCH MATCHMAKER button, (3) All 12 Bento Gate cards with exact badge/title/description/footLeft/footRight text, accent colors, icon, and tab targets (including wide Gate 12), (4) BentoGate component structure and full 11-row accent color class reference table, (5) Tactical Challenges sidebar panel with header (tier badge in 4 color variants, streak multiplier indicator), daily/weekly challenge card structures with 3-state progress bars and 3-state claim buttons, last match summary card, (6) All 13 sidebar tabs with exact labels, icons, active color classes, and admin-only filtering, (7) Sub-page navigation bar with back button and breadcrumb, (8) Tab-to-component mapping table, (9) Footer with copyright and version info, (10) Pre-dashboard states (loading, auth gate, in-game), (11) Imports inventory (20 lucide icons, 12 panel components, 2 modals).

---

Task ID: audit-complete
Agent: main
Task: Comprehensive architecture audit - find all missing features and suggest production improvements

Work Log:
- Read ARCHITECTURE.md (835 lines) - confirmed security section exists (lines 567-821), comprehensive
- Read BUILD-PLAN.md (153 lines) - 49 commits across 6 phases
- Launched Explore agent to cross-reference all 18 screen-content files against architecture
- Agent found 27 gaps: spectate, co-op invite, block player, social channels, watch video on end overlays, death vignette, clan wars/roles/level/emblem, HOF reset, rivals hunt, challenge dispatch, regional allies, not-signed-in, chat mention, online replay, preset avatars, cosmetic slots, streak multipliers, real-money pricing, anti-monopoly lock, ad system correction
- Manually verified: no reporting system, no sound toggle, no concurrent session prevention, no disconnect safety, no profanity filter, no DB backup, no room sharding docs, no timezone handling
- Updated ARCHITECTURE.md: added 14 new sections (A-N) covering all 27 screen-content gaps + 8 production suggestions (P1-P8)
- Updated file structure with 13 new API routes, 4 new component files
- Updated BUILD-PLAN.md: 49 → 57 commits, expanded existing commits with missing details
- Committed and pushed to GitHub

Stage Summary:
- ARCHITECTURE.md now has: Security (existing), Missing Features Audit (14 subsections), Production Suggestions (8 items)
- BUILD-PLAN.md now has: 57 commits (was 49), new commits for spectate, HOF induction, shared components
- All changes pushed to GitHub: commit 05ca72c

---
Task ID: 1.1
Agent: full-stack-developer
Task: DB Schema - all 16+ Prisma models

Work Log:
- Read architecture, screen-content docs for field details
- Wrote prisma/schema.prisma with 16 models
- Ran db:push successfully

Stage Summary:
- 16 models defined: Player, DailyReward, Challenge, Clan, ClanMember, ClanChat, Friendship, MatchHistory, PromoCode, PromoCodeClaim, VideoReward, HallOfFame, Invite, Block, Report, BroadcastMessage
- SQLite DB created at db/custom.db
---
Task ID: 1.2
Agent: full-stack-developer
Task: Game Config - constants.ts + game-config.ts

Work Log:
- Read reference docs: 02-game-config.md (30 tiers, chip packs, daily rewards, cosmetics, HOF, championship prizes, season pass), arena-selector.md, vault-chip-store.md, claims-daily-rewards.md, pass.md, hall-of-fame.md, game-rules-modal.md, ARCHITECTURE.md
- Wrote src/lib/constants.ts (121 lines) with app-wide constants: APP_NAME, JWT config, spending caps, store ad limits, avatar presets, clan emblems/roles, cosmetic slots, streak multipliers, 24 countries, 7 milestone badges
- Wrote src/lib/game-config.ts (162 lines) with: 30 ARENA_TIERS (10c to 1B buy-in, 25-60 bots, graduated commission 0.35), 3 PRACTICE_TIERS, 7 DAILY_REWARDS, 10 CHIP_PACKS (₹10-₹15,000), 10 daily + 5 weekly CHALLENGE_TEMPLATES, 20 SEASON_PASS_TIERS, 6 HOF_TIERS, 4 CHAMPIONSHIP_PRIZES

Stage Summary:
- 30 ARENA_TIERS defined (10c to 1B buy-in) with bots, xpMultiplier, mapRadius, maxFood, maxStars, commissionRate, starChipValue, foodValue
- 3 PRACTICE_TIERS (Practice Pit, Training Grounds, Proving Grounds) with free buy-in
- 10 CHIP_PACKS with INR ($0.12-$175) and USD pricing, bonus percentages
- 7 DAILY_REWARDS (10-1000 chips), Day 7 ad 2x multiplier in constants.ts
- 10 daily + 5 weekly challenge templates with tier scaling
- 20 season pass tiers (free + elite tracks), Elite cost = 100K chips
- 6 HOF tiers (100K to 1 Crore), 4 championship prize tiers
- All data sourced from reference docs, kept under 400 lines total
---
Task ID: 1.3
Agent: full-stack-developer
Task: Shared Types - game.ts, player.ts, api.ts

Work Log:
- Read architecture and screen-content docs for type shapes
- Read prisma schema to align field names and types
- Wrote game.ts with in-game entity types (Snake, Food, Star, GameState, KillFeedEntry, PlayerInput, StateDelta, MatchResult, ReplayFrame, ArenaTier)
- Wrote player.ts with player/social types (PublicPlayer, FullPlayer, FriendRelation, ClanInfo, ClanMemberInfo, ChatMessage, ChallengeDisplay, DailyRewardDay, CoOpInvite, MatchHistoryEntry)
- Wrote api.ts with API request/response types (ApiResponse, AuthResponse, LoginRequest, RegisterRequest, PaginatedResponse, LeaderboardEntry, ArenaStats, ChipTransactionType)
- All types use export interface (except ChipTransactionType which is a union alias)
- Line counts: game.ts ~108, player.ts ~130, api.ts ~68 (all within limits)

Stage Summary:
- 3 type files created with all interfaces needed for Phase 1+
- Types align with Prisma schema field names and screen-content data shapes

---
Task ID: 1.5
Agent: full-stack-developer
Task: Auth API - 12 routes

Work Log:
- Wrote 12 auth API route files
- Ran lint, fixed import path in login route (lib/db → @/lib/db)
- All 12 files pass lint cleanly

Stage Summary:
- 12 routes: register, login, guest, logout, me, token, change-password, change-pin, forgot-password, social-login, social-callback, upgrade
- All routes use JWT httpOnly cookies, rate limiting, bcrypt hashing
- Guest accounts can upgrade to registered accounts
---
Task ID: 1.7-1.10
Agent: full-stack-developer
Task: Auth screens, shared components, layout, dashboard, page.tsx, layout.tsx

Work Log:
- Wrote 6 auth screen components (auth-gate, login-form, register-form, forgot-password-form, social-buttons, password-strength)
- Wrote 2 shared components (not-signed-in, report-modal)
- Wrote 6 layout components (theme-provider, header, sidebar, mobile-nav, footer, sub-page-nav)
- Wrote 5 dashboard components (hero-banner, bento-gate, bento-grid, challenges-sidebar, last-match-summary)
- Wrote page.tsx, dashboard-content.tsx, layout.tsx, globals.css
- Fixed lint: duplicate import in header.tsx, escaped newline in register-form.tsx
- Ran lint: 0 errors
- Started dev server: compiled / successfully, GET / 200 in 6.5s, no runtime errors

Stage Summary:
- Full lobby visible: auth screens (login/register/forgot/guest) → dashboard with hero, bento grid, challenges
- Responsive: sidebar on desktop, bottom nav with sheet on mobile
- Dark theme with emerald/amber gaming aesthetic
- 22 files created total

---
Task ID: fix-blank-screen
Agent: Main
Task: Fix blank screen issue on the lobby page

Work Log:
- Diagnosed that the dev server was returning 200 OK with valid HTML (15KB) but page appeared blank
- Found root cause: Tailwind v4 was installed but globals.css had no @theme block to register shadcn/ui CSS variables as Tailwind utility tokens
- The old tailwind.config.ts was v3 format (hsl(var(--...)) syntax) which Tailwind v4 completely ignores
- All shadcn/ui utility classes (bg-background, text-primary, bg-card, text-muted-foreground, border-primary, etc.) were generating NO CSS
- Added @theme inline {} block to globals.css mapping all 30+ CSS variables to --color-* tokens
- Added missing --chart-1 through --chart-5 variables that shadcn/ui expects
- Verified compiled CSS now includes proper utility classes (156KB CSS with bg-background, text-primary, etc.)
- Confirmed bg-background resolves to background-color: var(--background) (direct, no intermediate variable)
- Removed unused BookOpen import from auth-gate.tsx
- Verified /api/auth/me returns 401 correctly for unauthenticated users
- Verified /api/auth/guest creates guest accounts successfully

Stage Summary:
- Root cause: Tailwind v4 requires @theme block to create utility classes from CSS custom properties
- Fix: Added @theme inline {} block in globals.css with all shadcn/ui token mappings
- All auth flows (login, register, guest, forgot password) should now render with proper styling
- The loading spinner briefly shows, then transitions to the auth form (login/register tabs + guest button)

---
Task ID: fix-blank-screen-v2
Agent: Main
Task: Fix blank screen + rebuild with mobile-first design

Work Log:
- Isolated root cause: Next.js dev server blocks cross-origin requests from preview panel domain
- Added `allowedDevOrigins` to next.config.ts for `.space-z.ai` domains
- Rebuilt entire page.tsx as self-contained mobile-first component (no external component chain)
- Simplified layout.tsx to minimal wrapper (removed provider chain that could break rendering)
- Auth screen: Sign In / Create Account tabs, email/password forms, Play as Guest button
- Dashboard: sticky header with chips, hero card with XP bar, 10-item bento grid (2col mobile, 3col tablet, 4col desktop), challenges section, fixed bottom nav with 5 tabs
- Added @theme inline block in globals.css for Tailwind v4 shadcn/ui token support
- All styling uses raw Tailwind classes with emerald/dark theme — no shadcn dependency for rendering
- Bottom nav has safe-area-inset-bottom for notched devices
- Bento grid uses h-36 cards with icon, title, desc, tag, action arrow
- Challenges gracefully handles 404 from missing API route

Stage Summary:
- BLANK SCREEN ROOT CAUSE: `allowedDevOrigins` missing in next.config.ts — Next.js blocked all cross-origin dev resource requests from the preview panel
- CSS was also broken (Tailwind v4 @theme missing) — fixed in parallel
- New mobile-first design: portrait-optimized auth, responsive bento grid, bottom tab navigation
- Server logs clean: no errors, no cross-origin blocks, 200s on page load, 401 on auth check
