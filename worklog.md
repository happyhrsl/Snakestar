# Venom Arena V2 — Complete Analysis & Rebuild Plan

> Deep study completed from old project at `/tmp/venom-arena/`
> Source of truth: `requirements-checklist.md` + `game-rules-modal.tsx` + `game-config.ts`

---

## COMPLETE INVENTORY OF WHAT EXISTS

### Panels (12 lobby stations + 2 extras)
1. Arena Selector — tier list, mode toggle, detail card, buy-in
2. Cosmetics Shop — 2307 lines, presets, premium items, genetic pattern lab with canvas previews
3. Player Profile — 2361 lines, stats, identity editor, match history, friends, security settings
4. Leaderboards — 831 lines, summit/global/national/tiers tabs
5. Daily Rewards — 240 lines, streak system, 7-day cycle
6. Chip Store — 404 lines, packs, promo codes, video ads
7. Social Panel — 1323 lines, friends, rivals, search, clans (duplicate!)
8. Clan System — 785 lines, chat, treasury, browse, create
9. Hall of Fame — 543 lines, milestone tiers, tournament archives, fake live ticker
10. Championships — 441 lines, countdown, contender standings, scope filters
11. Season Pass — 254 lines, 20-tier rewards, elite unlock
12. Clip Showcase — 269 lines, clips grid, upload, upvote
13. Admin Panel — 489 lines, diagnostics, player management, chip modification
14. Player Inspector Modal — 561 lines, overview/stats/logs/loadout tabs

### Game Canvas (3152 lines)
- 17 HUD elements documented
- Socket.IO connection (auth, reconnect, cleanup)
- Input: mouse, keyboard, touch joystick
- Snapshot: 20Hz server → 60fps render (NO interpolation)
- Offline mode: separate engine with raw DOM HUD
- Kill feed, extraction progress, death vignette, end screen
- Death replay: 15s pre + 15s post

### Game Server (81KB total)
- Socket.IO on port 3001, Bun runtime
- Room/arena system with auto-sharding (1000 max/shard)
- 20Hz broadcast, configurable tick rate
- Spatial hash grid (120px cells)
- 5 bot personalities (but behaviorally near-identical)
- Per-player snapshot builds (N builds per room = main bottleneck)
- NO delta encoding, NO interpolation

### API Routes (30+ endpoints)
- Auth: login, register, guest, me, token, logout, change-password, forgot-password, upgrade, social
- Player: GET/PUT, daily, cosmetic, challenges, promo-reward, video-reward
- Match: verify (internal), join (internal), result (internal)
- Leaderboard: GET with filters
- Friends: list, request, accept, remove, gift
- Clans: list, join, leave, create, chat (GET/POST), deposit
- Arena Stats: proxy to game server
- Chips: pack purchase
- Admin: ban, modify-chips, config (GET/PUT)

### Sound System (game-audio.ts)
- 8 procedural sounds via Web Audio API (no audio files)
- Food collect (4 sizes), kill, death, extract start/success/restart, boost, wall hit
- `setGameAudioMuted()` exists but NO mute button in HUD

---

## ALL BUGS, GAPS & ISSUES FOUND

### CRITICAL SECURITY
1. Admin config (GET/PUT `/api/admin/config`) has ZERO auth — publicly writable
2. Security PIN stored in plaintext, compared with `!==`
3. `/api/chips/pack` has no payment verification — free chips for anyone
4. In-memory promo tracking resets on server restart
5. No rate limiting on guest account creation
6. Social login endpoints are stubs (non-functional)

### CRITICAL PERFORMANCE
7. Per-player snapshot builds: N snapshots per room per broadcast (main bottleneck)
8. NO delta encoding — full JSON state every frame
9. NO client-side interpolation — 20Hz snapshots rendered raw at 60fps (jittery)
10. `getSession()` queries DB on every API call (no caching)

### GAMEPLAY GAPS (from rules vs code)
11. BOOST_DROP_INTERVAL = 40 frames (~0.75/sec) but rules say ~3/sec (should be 10 frames)
12. Food collection sound never plays online (no server event, no client detection)
13. Boost activation sound never plays (imported but not called)
14. Wall hit sound never plays (imported but not called)
15. Star chip collection sound missing online
16. `starsCollected` never sent by game server → star_collect challenges never progress
17. RewardedAdModal exists but NOT wired to EndOverlay's "Watch Video" button
18. No mute/unmute button in game HUD

### DATA REALITY GAP (Fake/Mock Data)
19. Leaderboards: Global/National/Summit/Tiers all use generated fake players
20. Hall of Fame: 100% fake data, fake live ticker
21. Championships: 100% client-side (registration, games played, contenders)
22. Season Pass: Claims are in-memory only (lost on reload), no server state
23. Clip Showcase: 100% client-side, no persistence
24. Player Profile Friends: localStorage only (not the server-backed friend system)
25. Player Profile Match History: 3 hardcoded mock entries
26. Player Inspector: Career stats/extraction logs are fake
27. Social Panel clans: mock implementation (redundant with Clan System panel)
28. Rivals: entirely client-side from localStorage

### ARCHITECTURE PROBLEMS
29. Massive page.tsx (1054 lines) — monolithic SPA shell
30. game-canvas.tsx (3152 lines) — god component
31. cosmetics-shop.tsx (2307 lines) — should be split
32. player-profile.tsx (2361 lines) — should be split
33. Duplicate clan functionality (Social Panel + Clan System)
34. Offline engine creates raw DOM elements (not React)
35. Dynamic Tailwind class construction bug (`text-${accent}-400`)
36. 5 bot personalities defined but behaviorally near-identical
37. No TypeScript strict mode enforcement

---

## REBUILD ARCHITECTURE PLAN

### Core Improvements

1. **LAG-FREE NETWORKING**
   - Client-side prediction: client simulates own snake locally
   - Server reconciliation: corrections sent on mismatch
   - Entity interpolation: other snakes interpolated between snapshots
   - Delta compression: only changed data sent
   - Single shared snapshot per room (not per-player)

2. **SMARTER AI**
   - True personality differentiation (not cosmetic)
   - Multi-tick danger lookahead
   - Potential field-based pathfinding
   - Pack hunting (coordinated bot groups)
   - Strategic extraction decisions
   - Arena-aware behavior (center vs edge preference)

3. **BETTER ARCHITECTURE**
   - Pure engine module (zero deps, shared client+server)
   - Clean module boundaries
   - Type-safe networking (shared types)
   - Proper component decomposition
   - Server-authoritative with client prediction
   - All panels backed by real server data (no fakes)

4. **SECURITY FIXES**
   - All admin endpoints properly auth-gated
   - PIN hashed with bcrypt
   - Rate limiting on all public endpoints
   - Server-side caps (not localStorage)
   - Payment verification (or honest "free" model)

### Directory Structure
```
src/
  lib/
    engine/           # Pure game logic (shared)
      types.ts         # All shared types
      config.ts        # Game config, tiers, cosmetics
      snake.ts         # Movement, growth, physics
      food.ts          # Food spawning, collection
      collision.ts     # Collision detection
      map.ts           # Map boundaries, breathing
      bot-ai.ts        # Smart bot AI
      spatial-grid.ts # Spatial hash
      math.ts          # Vector math
    auth.ts           # JWT auth
    db.ts             # Prisma client
    store.ts          # Zustand store
    game-audio.ts     # Procedural sounds
  components/
    auth/
      auth-gate.tsx
      login-form.tsx
      register-form.tsx
    game/
      canvas.tsx       # Main game wrapper
      renderer.tsx     # Canvas renderer (60fps)
      hud.tsx          # React HUD overlay
      minimap.tsx      # Minimap
      input.tsx        # Input handler
      offline-engine.ts
      replay.tsx       # Death replay
    lobby/
      shell.tsx        # Lobby layout shell
      arena-selector.tsx
      cosmetics-shop.tsx
      player-profile.tsx
      leaderboards.tsx
      daily-rewards.tsx
      chip-store.tsx
      social-panel.tsx
      clan-system.tsx
      hall-of-fame.tsx
      championships.tsx
      season-pass.tsx
      clip-showcase.tsx
    admin/
      admin-panel.tsx
      config-panel.tsx
    shared/
      player-inspector.tsx
      game-rules-modal.tsx
  app/
    page.tsx          # Root SPA shell (thin)
    api/
      auth/
      player/
      match/
      friends/
      clans/
      leaderboard/
      admin/
      chips/
mini-services/
  game-server/
    index.ts          # Socket.IO server
    game-loop.ts      # Fixed timestep loop
    room.ts           # Arena room management
    snapshot.ts       # Delta compression
    bot-controller.ts # Bot AI
    spatial-grid.ts
```

### Rebuild Priority Order
1. Core engine (types, config, snake, food, collision, map, math)
2. Prisma schema + DB setup
3. Auth system (API routes + provider + gate)
4. Game server (socket.io, game loop, spatial grid, bot AI)
5. Game renderer (canvas, HUD, input, minimap)
6. Lobby shell + arena selector (get playable ASAP)
7. Player profile + leaderboards
8. Friends + clans
9. Economy (daily rewards, chip store, cosmetics)
10. Remaining panels (championships, HoF, season pass, clips)
11. Admin panel
12. Sound wiring, replay, polish
