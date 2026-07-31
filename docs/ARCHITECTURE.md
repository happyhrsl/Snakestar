# SNAKESTAR — Architecture Document

## Core Principles

1. **No god files** — every file has ONE purpose, max 200-400 lines
2. **No lag** — server sends only nearby players, client interpolates, adaptive quality
3. **Mobile-first** — phone portrait, phone landscape, tablet, desktop
4. **On-demand server** — game server starts when players join, stops when empty
5. **Zero-cost idle** — 0 players online = $0 server cost
6. **Every commit saved** — no work lives only in memory

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 16 (App Router) | Required |
| Language | TypeScript 5 | Required |
| Styling | Tailwind CSS 4 + shadcn/ui | Required |
| Database | Prisma ORM + SQLite | Free, no separate server |
| Real-time | Socket.IO | Game server communication |
| Rendering | HTML5 Canvas 2D | Lightweight, fast |
| Audio | Web Audio API | Procedural, no audio files |
| Auth | JWT (custom, not NextAuth) | Simpler for game context |
| Client State | Zustand | Lightweight |
| Server State | TanStack Query | Caching, deduplication |

---

## File Structure

```
src/
  app/
    page.tsx                          — Single route, SPA shell
    layout.tsx                        — Root layout (providers, theme)
    api/
      auth/
        register/route.ts             — Email registration
        login/route.ts                 — Email login
        guest/route.ts                 — One-click guest play
        logout/route.ts                — Clear session
        me/route.ts                    — Current user data
        token/route.ts                 — JWT refresh
        change-password/route.ts       — Password change
        change-pin/route.ts            — PIN change/set
        forgot-password/route.ts       — PIN-based recovery
        social-login/route.ts          — OAuth redirect
        social-callback/route.ts       — OAuth callback
        upgrade/route.ts               — Guest → registered
      player/
        route.ts                       — Get/update profile
        challenges/route.ts            — Get challenges
        challenges/progress/route.ts   — Update challenge progress
        cosmetic/route.ts              — Equip cosmetic
        daily/route.ts                  — Claim daily reward
        promo-reward/route.ts          — Redeem promo code
        video-reward/route.ts          — Ad reward claim
      chips/
        pack/route.ts                  — Buy chip pack
      friends/
        list/route.ts                  — Get friends/rivals
        request/route.ts               — Send friend request
        accept/route.ts                — Accept request
        remove/route.ts                — Remove friend/rival
        gift/route.ts                  — Gift chips
      clans/
        list/route.ts                  — List clans
        create/route.ts                — Create clan
        join/route.ts                  — Join clan
        leave/route.ts                 — Leave clan
        chat/route.ts                  — Clan chat messages
        deposit/route.ts               — Deposit to treasury
      leaderboard/
        route.ts                       — Global/national rankings
        my-rank/route.ts               — Player's rank summary
      match/
        join/route.ts                  — Validate + authorize match
        result/route.ts                — Submit match result
        verify/route.ts                — Server-verified result
      admin/
        config/route.ts                — Get/set game config
        config/seed/route.ts           — Seed default config
        modify-chips/route.ts          — Adjust player chips
        ban/route.ts                   — Ban/unban player
      arena-stats/route.ts            — Live player counts per tier

  components/
    auth/
      auth-gate.tsx                   — Auth screen container (routes to login/register)
      login-form.tsx                  — Email + password form
      register-form.tsx               — Full registration form
      forgot-password-form.tsx        — PIN-based recovery form
      social-buttons.tsx              — Google/Facebook/Apple buttons
      password-strength.tsx           — 4-level strength indicator

    layout/
      header.tsx                      — App title, player badge, chips wallet, buttons
      sidebar.tsx                     — Desktop left sidebar (13 tabs)
      mobile-nav.tsx                  — Bottom tab bar (mobile)
      footer.tsx                      — Sticky footer
      sub-page-nav.tsx                — Back button + breadcrumb (panel pages)

    dashboard/
      hero-banner.tsx                 — Welcome + XP bar + LAUNCH MATCHMAKER
      bento-gate.tsx                  — Reusable card component
      bento-grid.tsx                  — 12 gate cards layout
      challenges-sidebar.tsx         — Daily + weekly challenges with streak
      last-match-summary.tsx          — Recent match result card

    panels/
      arena-selector/
        index.tsx                     — Panel shell + online/offline toggle
        difficulty-filters.tsx         — 5 difficulty tabs
        tier-card.tsx                  — Single tier card (name, buy-in, etc)
        tier-detail-card.tsx           — Expanded info (commission, stats)
        practice-section.tsx           — 3 practice tiers

      cosmetics-shop/
        index.tsx                     — Panel shell + gallery/lab toggle
        category-tabs.tsx             — 7 filter tabs
        cosmetic-card.tsx              — Single item card (skin/trail/etc)
        skin-gallery.tsx               — Grid of all cosmetics
        genetic-lab/
          index.tsx                   — 4-step lab container
          step-stripes.tsx            — Step 1: color sequence picker
          step-geometry.tsx            — Step 2: segment shape picker
          step-taper.tsx               — Step 3: taper physics picker
          step-glow.tsx                — Step 4: glow toggle
          tryon-canvas.tsx             — Live 450x180 preview

      player-profile/
        index.tsx                     — Panel shell with 4 tabs
        stats-tab/
          index.tsx                   — Records & statistics tab
          stat-card.tsx                — Single stat card
          identity-editor.tsx          — Name/country/avatar editor
          security-settings.tsx        — Password + PIN management
          guest-upgrade-banner.tsx     — Guest → registered CTA
          tournament-caps.tsx          — 3 guardrail cap cards
        match-history-tab.tsx          — Match ledger table
        friends-tab.tsx                — Friends list + spectate/invite
        tamper-logs-tab.tsx           — Identity change history

      leaderboards/
        index.tsx                     — Panel shell with 4 tabs
        rank-summary-card.tsx          — Your rank (global, national, badge)
        world-summit-tab.tsx           — Tab 1: #1 per country
        global-rankings-tab.tsx        — Tab 2: top 100 worldwide
        national-boards-tab.tsx        — Tab 3: per-country rankings
        tier-filters.tsx              — 9 milestone badge pills

      championships/
        index.tsx                     — Panel shell
        hero-section.tsx              — Banner + countdown timer
        player-dossier.tsx            — Wallet chips + status + join
        prize-tier-card.tsx           — Single prize tier card
        prize-tiers-grid.tsx          — 4 prize tier cards
        scope-tabs.tsx                — Global/Regional/National tabs
        region-filter.tsx             — APAC/NA/EU/LATAM dropdown
        rank-filters.tsx              — 5 rank filter pills
        standings-table.tsx           — Contender rankings table

      hall-of-fame/
        index.tsx                     — Panel shell with 3 tabs
        milestone-tiers-tab.tsx        — Tab 1: 6 tier cards
        tier-card.tsx                 — Single HOF tier card
        archives-tab.tsx              — Tab 2: year/country rankings
        live-ticker-tab.tsx           — Tab 3: esports event feed
        ticker-entry.tsx              — Single event entry
        broadcast-marquee.tsx         — Persistent LIVE banner

      social-panel/
        index.tsx                     — Panel shell with 3 sub-tabs
        friends-list.tsx              — Tab: friends with status
        rivals-list.tsx               — Tab: rivals
        community-search.tsx           — Tab: global player search
        player-row.tsx                — Single friend/rival row

      clan-system/
        index.tsx                     — Panel shell with 3 tabs
        my-clan-tab.tsx               — Tab: roster + treasury
        browse-tab.tsx                — Tab: public clans list
        chat-tab.tsx                  — Tab: real-time chat
        create-clan-form.tsx          — Create clan modal/form
        member-row.tsx                — Single clan member row
        deposit-section.tsx           — Chip deposit form
        chat-message.tsx              — Single chat message bubble

      season-pass/
        index.tsx                     — Panel shell
        pass-tier.tsx                 — Single tier row (free + elite)
        reward-track.tsx              — Scrollable track of all tiers

      daily-rewards/
        index.tsx                     — Panel shell
        day-cell.tsx                  — Single day reward cell
        streak-banner.tsx             — Streak counter + multiplier

      chip-store/
        index.tsx                     — Panel shell
        pack-card.tsx                 — Single chip pack
        promo-section.tsx             — Promo code input
        yearly-cap-alert.tsx          — 25L cap warning
        ad-reward-section.tsx         — Watch ad for +50c

      clip-showcase/
        index.tsx                     — Panel shell
        clip-card.tsx                 — Single clip card
        upload-modal.tsx              — Upload form

      admin-panel/
        index.tsx                     — Panel shell
        auth-gate.tsx                 — Admin password terminal
        diagnostics-tab.tsx           — Stats + broadcast
        player-roster-tab.tsx         — Search + manage players
        economy-ledger-tab.tsx        — Chip override

      player-inspector/
        index.tsx                     — Modal shell with 4 tabs
        overview-tab.tsx              — Tab 1: clan, allies, social, badges
        career-tab.tsx                — Tab 2: stats grid
        extraction-logs-tab.tsx       — Tab 3: match entries
        loadout-tab.tsx               — Tab 4: cosmetics

    game/
      game-canvas.tsx               — THIN shell: canvas + socket init + HUD overlay
      engine/
        constants.ts                — All game numbers (speeds, sizes, rates)
        types.ts                    — Snake, Food, Star, Room types
        physics.ts                  — Movement, speed, turning formulas
        collision.ts                — Head-body, head-on, wall detection
        food.ts                     — Food spawning, death food scatter
        stars.ts                    — Star chip creation/collection
        bots.ts                     — Bot AI (5 personalities, decision tree)
        extraction.ts               — Extraction timer, commission calc
        spawning.ts                 — Safe spawn position finder
      client/
        game-loop.ts                — requestAnimationFrame, tick management
        input.ts                    — Mouse, keyboard, touch handlers
        prediction.ts               — Client-side movement prediction
        interpolation.ts            — Smooth entity pos between server ticks
        network-sync.ts             — Socket event send/receive
        replay-buffer.ts            — 300-frame pre/post death recording
      render/
        renderer.ts                 — Main render orchestrator
        snake.ts                    — Snake body, eyes, 5 skin patterns
        food.ts                     — 3 food orb sizes with glow
        stars.ts                    — Golden star collectibles
        boundary.ts                 — Circular map edge with breathing
        background.ts               — Grid pattern
        effects.ts                  — Glow, pulse, particles
      hud/
        hud-root.tsx                — Combines all HUD elements
        status-cards.tsx            — Top-left: carried, stars, rank, score, kills
        network-info.tsx            — Top-right: banked, FPS, ping
        arena-leaderboard.tsx       — Collapsible top-10 list
        kill-feed.tsx               — Elimination notifications
        extraction-popup.tsx        — Progress bar + commission
        action-buttons.tsx          — Boost, Extract, Leave
        emotes-bar.tsx              — 5 quick chat emotes
        chat-dialog.tsx             — In-game chat popup
        minimap-renderer.tsx        — Canvas radar minimap
        full-map-overlay.tsx        — Press M for full arena map
      controls/
        virtual-joystick.tsx        — Touch drag joystick
        mobile-buttons.tsx          — Touch boost/extract/leave
        orientation-adapter.tsx     — Portrait/landscape layout switch
      overlays/
        connecting-overlay.tsx      — Loading states
        reconnecting-banner.tsx     — Top-center wifi pill
        death-screen.tsx            — Elimination results + killer card
        extract-screen.tsx          — Extraction success results
        replay-player.tsx           — Death replay controls + canvas

    modals/
      game-rules-modal.tsx          — 14 sections + 19 FAQs
      player-inspector-modal.tsx    — Click player → inspect popup

    providers/
      auth-provider.tsx             — User session context
      theme-provider.tsx            — Dark/light mode

    ui/                             — shadcn/ui components (existing)

  lib/
    auth.ts                         — JWT create/verify helpers
    oauth.ts                        — Social OAuth URL builders
    db.ts                           — Prisma client singleton
    api-helpers.ts                  — Auth guard, response helpers
    game-config.ts                  — Tiers, cosmetics, rewards, challenges
    game-audio.ts                   — 8 procedural Web Audio sounds
    snake-engine.ts                 — Shared physics/growth formulas
    player-helpers.ts               — Player → display profile mapping
    date-utils.ts                   — UTC midnight, week start helpers
    constants.ts                    — App-wide constants
    utils.ts                        — Tailwind merge, general utils
    responsive.ts                   — Breakpoint + orientation hooks

  hooks/
    use-mobile.ts                   — < 768px detection
    use-orientation.ts              — Portrait/landscape detection
    use-toast.ts                    — Toast notification state

  stores/
    auth-store.ts                   — Player session, login/logout actions
    game-store.ts                   — Active arena, match state

  types/
    game.ts                         — Game entities (Snake, Food, Star, etc)
    player.ts                       — Player, Profile, Challenge types
    api.ts                          — API request/response types

mini-services/
  game-server/
    index.ts                        — Socket.IO server, room management
    game-state.ts                   — Per-room game loop, state, tick
    spatial-grid.ts                 — 120px cell collision grid
    bot-ai.ts                       — 5 personalities, decision priorities
    constants.ts                    — Server-side config
    types.ts                        — Server types
    package.json
    tsconfig.json
```

---

## Data Flow

### Auth Flow
```
Browser → POST /api/auth/register → Server → Prisma (create Player) → JWT cookie
Browser → GET /api/auth/me → Server → verify JWT → return Player
Browser → auth-provider.tsx → stores player in context + Zustand
```

### Match Flow
```
1. Player clicks "Join Arena" in arena-selector
2. Browser → POST /api/match/join (tierId, player JWT)
3. Server verifies: enough banked chips? deducts buy-in, returns { roomId, token }
4. Browser → Socket.IO connect to game-server/?token={token}&roomId={roomId}
5. Game server: creates/reuses room, adds player, spawns snake safely
6. During match: client sends steer input (20Hz), server broadcasts state (20Hz)
7. On death/extract: server sends result, client shows overlay
8. Browser → POST /api/match/result (server-signed payload)
9. Server verifies signature, updates banked chips, awards XP, updates challenges
10. Client shows results, returns to lobby
```

### Data Persistence Points (only these hit DB)
```
- Player registers / logs in / updates profile
- Match ends (extract or death) → update bankedChips, XP, level, matchHistory
- Daily reward claimed
- Challenge progress update
- Cosmetic equipped
- Clan created / joined / left / deposit
- Friend request sent / accepted / removed
- Chip pack purchased
- Promo code redeemed
```

### During Match (NO DB writes)
```
Server memory only:
- Snake positions, food, stars, scores, kills
- Bot AI state
- Collision detection
- Extraction progress
All lost on server restart (acceptable — match is ephemeral)
```

---

## Performance Strategy (No Lag)

### Server Side

**Spatial Grid (120px cells):**
- Only broadcast snakes/food within viewport + margin to each client
- A player at position (5000, 3000) only receives data for entities within ~2000px
- O(1) cell lookup instead of O(n) distance checks

**Fixed 20Hz Tick:**
- Server processes physics 20 times per second (50ms interval)
- Consistent, predictable, not tied to frame rate
- All clients receive updates at same rate

**Minimal Payload:**
- Don't send full snake body for distant snakes — send only head position + direction
- Food: only send food within player's viewport
- Stars: only send stars within viewport
- Bot updates: only send nearby bots (same spatial grid)

### Client Side

**Client-Side Prediction:**
- Player's own snake responds instantly to input (no server round-trip)
- Server sends authoritative correction if prediction was wrong
- Correction is smooth (lerp to server position, not snap)

**Entity Interpolation:**
- Other players' snakes move smoothly between server updates
- At 20Hz server, 60fps client = 3 frames per server update
- Interpolate position: `pos = prev + (target - prev) * (framesSinceUpdate / 3)`

**Adaptive Quality:**
- Monitor FPS every second
- If FPS < 30: disable glow, reduce food render range, disable rainbow/neon skins
- If FPS < 20: further reduce — disable minimap, reduce food detail
- Show "LQ" badge when in low quality mode

**Render Culling:**
- Only draw entities within canvas viewport + 100px margin
- Food > 2000px from camera: skip entirely
- Snakes > 3000px: skip body detail, draw only head dot

**Canvas Optimization:**
- Single canvas, single render pass per frame
- No DOM manipulation during gameplay (all canvas)
- HUD elements are React components overlaid on canvas (minimal re-renders)

### Bandwidth Per Player (estimated)
```
Server → Client per tick (50ms):
- Own snake correction: ~50 bytes
- Nearby snakes (avg 10 nearby × 100 bytes): ~1000 bytes
- Nearby food (avg 30 orbs × 20 bytes): ~600 bytes
- Nearby stars (avg 2 × 30 bytes): ~60 bytes
- Kill feed + events: ~100 bytes
- Total: ~1800 bytes/tick = ~36 KB/s = ~288 Kbps

Client → Server per tick:
- Steering angle: ~20 bytes
- Boost state: ~10 bytes
- Extraction state: ~10 bytes
- Total: ~40 bytes/tick = ~0.8 KB/s = ~6.4 Kbps
```

Even on 3G (750 Kbps), this works.

---

## Responsive Design Strategy

### Breakpoints
```
Mobile portrait:  < 640px  (375×812, 390×844)
Mobile landscape: < 640px wide, > 640px tall rotated
Tablet portrait:  640-1024px (768×1024)
Tablet landscape: 768-1280px (1024×768)
Desktop:          > 1024px (1366×768, 1920×1080)
```

### Layout Adaptation

**Lobby (panels, dashboard):**
```
Desktop:       Sidebar left (240px) + Main content (flex-1)
Tablet:       Sidebar collapses to icons only (64px) + Main content
Mobile:       No sidebar — bottom tab bar (56px) + full-width content
Landscape:    Sidebar bottom (64px) + content fills rest
```

**Bento Grid (dashboard):**
```
Desktop:  3-column grid (8 cols content, 4 cols challenges)
Tablet:  2-column grid, challenges below
Mobile:   1-column stack, challenges below gates
```

**Game Canvas:**
```
Always full-screen. Canvas auto-sizes to window.
HUD elements reposition based on orientation:
  Portrait:  leaderboard collapsed, buttons bottom, joystick bottom-left
  Landscape: leaderboard visible, more horizontal space for game
```

### Tables → Cards on Mobile
```
Desktop: Full tables with columns
Mobile:  Tables become vertical card stacks (label + value pairs)
```

### Touch Targets
```
All interactive elements: minimum 44×44px on touch devices.
Buttons in game: 64px (boost) and 80px (extract) — already touch-friendly.
```

---

## Mobile Controls Strategy

### Portrait Mode
```
┌─────────────────┐
│   [HUD cards]   │  ← Top-left: chips, score, kills
│                  │
│                  │
│   GAME CANVAS    │  ← Full screen
│                  │
│   [Minimap]      │  ← Bottom-left, small
│                  │
│ [Joystick]  [Btns]│  ← Bottom: joystick left, boost/extract right
└─────────────────┘
```

### Landscape Mode
```
┌──────────────────────────────┐
│ [HUD]              [Leader]  │  ← Top: status cards + leaderboard
│                              │
│         GAME CANVAS          │  ← Full screen, wider view
│                              │
│ [Joy]  [Minimap]     [Btns]  │  ← Bottom: joystick, minimap, buttons
└──────────────────────────────┘
```

### Virtual Joystick
- Appears on touch devices only (detected via `use-mobile` hook)
- Bottom-left quadrant, 120px diameter
- Drag distance controls turn rate (further = sharper turn)
- Double-tap or far-push = boost
- Disappears on desktop (mouse/keyboard used instead)

### Orientation Handling
- `useOrientation` hook listens to `screen.orientation` API
- When rotation detected: reposition HUD, resize canvas, adjust joystick position
- No page reload needed — CSS transforms + state update

---

## On-Demand Game Server

### Lifecycle
```
Player clicks Join → Next.js API validates → starts game server if not running →
Socket.IO connect → play match → last player leaves → 5-min timeout → server stops
```

### Implementation
```
mini-services/game-server/ runs via: bun --hot index.ts
- Starts on port 3001
- Next.js /api/match/join spawns it if not running
- Health check endpoint: GET /health
- When room count = 0 for 5 minutes: process.exit()
- Caddy/gateway proxies /api/game/?XTransformPort=3001
```

### Room Management
```
One server process handles multiple rooms:
- Room = one arena instance (one tier)
- Max rooms: unlimited (limited by memory)
- Each room: 30 bots + up to 30 real players
- Empty room: garbage collected after 60 seconds
- Room ID format: "tier-{id}-{shard}" (e.g., "tier-1-a")
```

---

## Security & Anti-Cheat

### Why This Matters
The old Venom Arena had real security holes: admin routes with NO authentication, PIN stored in plaintext, no rate limiting, in-memory promo tracking (exploitable on restart), and no movement validation. Snakestar fixes ALL of these.

---

### Anti-Cheat: Server Is The Truth

The client is NEVER trusted. The server is ALWAYS authoritative. The client only sends INPUT (steering angle + boost state). The server computes everything else.

**What the client sends per tick (ONLY these):**
```
{
  "angle": 1.57,        // steering direction (radians)
  "wantsBoost": false    // boost button held?
}
```

**What the client NEVER sends:**
- Position (server computes from angle + speed)
- Score (server tracks food eating)
- Body length (server computes from score)
- Carried chips (server tracks star collection)
- Other players' positions (client only receives, never sends)

**Movement Validation (server-side, every tick):**
```
Max distance per tick = speed × tickInterval
If snake moved more than maxDistance → teleport detected → kick player

Speed must be either BASE_SPEED (4.5) or BOOST_SPEED (8.0)
If speed is anything else → speed hack detected → kick player

Boost requires: bodyLength > 8 AND score > INITIAL_SPAWN_SCORE (20)
If boosting without meeting requirements → kick player

Turn rate must be physically possible given TURN_BASE and snake's score
If angle changed more than max turn per tick → turn hack → snap to max allowed turn
```

**Food Collection Validation:**
```
Client does NOT tell server "I ate food."
Server checks: is snake head within collision radius of any food orb?
If yes → server removes food, increases score, grows body.
Client cannot eat food it's not near.
```

**Star Collection Validation:**
```
Same as food. Server checks head proximity to stars.
Bots are excluded from star collision checks in server code.
Client cannot collect stars through code modification.
```

**Extraction Validation:**
```
Server tracks extraction timer server-side.
Client sends wantsBoost = false (gliding).
Server checks: did angle change > 0.08 rad since last tick?
If yes → reset extraction progress to 0.
Client cannot fake extraction completion.
```

**Match Result Signing:**
```
When match ends, game server creates an HMAC-signed payload:
{
  "playerId": "...",
  "tierId": "tier-1",
  "score": 142,
  "kills": 3,
  "carriedChips": 275,
  "result": "extracted",    // or "died"
  "commission": 96,        // 35% of 275
  "netBanked": 179,
  "xp": 1445,
  "timestamp": 1722345678,
  "signature": "hmac-sha256(...)"  // signed with server secret
}

POST /api/match/result verifies the HMAC signature before updating DB.
Client CANNOT forge a match result (doesn't know the server secret).
Client CANNOT modify chips/score in the payload (signature breaks).
```

**Duplicate Match Prevention:**
```
Server generates unique matchId per session.
Client submits matchId with result.
API checks: has this matchId already been processed?
If yes → reject ("match already recorded").
Prevents replaying a good result multiple times.
```

**AFK Detection:**
```
If player sends same angle for 60+ seconds (1200 ticks):
  → Server marks as AFK
  → AFK players don't count toward real player count
  → AFK players get kicked after 120 seconds
  → Prevents chip farming by going AFK in safe corner
```

---

### API Security

**Authentication:**
```
Every API route (except register, login, guest, social-login, social-callback)
runs through requireAuth() middleware:
  1. Read JWT from httpOnly cookie
  2. Verify signature + expiry
  3. Look up player in DB
  4. Attach player to request
  5. If any step fails → 401 Unauthorized

JWT payload: { playerId, userTag, role, iat, exp }
Expiry: 7 days
```

**Admin Authentication (FIXED from old code):**
```
Old code: admin routes had ZERO auth — anyone could access.
Snakestar: admin routes check BOTH:
  1. requireAuth() — must be logged in
  2. player.role === 'admin' — must have admin role
  3. Missing either → 403 Forbidden
```

**PIN Storage (FIXED from old code):**
```
Old code: PIN stored in PLAINTEXT in database.
Snakestar: PIN hashed with bcrypt (saltRounds: 10).
  - Store: hash = await bcrypt.hash(pin, 10)
  - Verify: await bcrypt.compare(inputPin, hash)
  - DB column: securityPinHash (NOT securityPin)
```

**Rate Limiting:**
```
In-memory rate limiter (no Redis needed):
  Map<string, { count: number, resetAt: number }>

Limits per player:
  - Login attempts:     5 per minute   (brute force prevention)
  - Register:           3 per hour    (spam prevention)
  - Guest creation:     3 per hour
  - Match join:         10 per minute
  - Chip pack purchase: 5 per minute
  - Promo code redeem:  5 per minute
  - Friend request:     10 per minute
  - Clan create:        2 per hour
  - General API:        60 per minute

On limit exceeded → 429 Too Many Requests with retry-after header.
```

**Input Validation (every API route):**
```
Every input field validated server-side:
  - Display name: 1-20 chars, alphanumeric + spaces only
  - Email: valid email regex
  - Password: min 6 chars
  - PIN: exactly 4 digits
  - Chip amounts: Math.max(0, Math.min(MAX, value)) — clamped
  - Tier IDs: must exist in ARENA_TIERS config
  - Clan tags: 3-5 alphanumeric chars
  - All strings: .trim() + max length enforced

NEVER trust client-sent values. Validate AND sanitize.
```

**SQL Injection:**
```
Prisma ORM uses parameterized queries by default.
No raw SQL queries anywhere in the codebase.
Safe by design.
```

**XSS Prevention:**
```
React auto-escapes all rendered content.
No dangerouslySetInnerHTML used anywhere.
Player names, clan names, chat messages: all rendered as text content, not HTML.
Chat messages: max 200 chars, no HTML tags allowed.
```

**CSRF Protection:**
```
All mutations use POST/PUT/DELETE (not GET).
JWT in httpOnly cookie (not accessible via JavaScript).
SameSite=Strict on cookies.
```

---

### Promo & Reward Abuse Prevention (FIXED from old code)

```
Old code: promo codes and video rewards tracked in-memory.
Problem: server restart resets tracking → exploit for unlimited chips.

Snakestar: ALL tracking in SQLite database.
  - VideoReward table: { playerId, claimedAt }
  - PromoCodeClaim table: { playerId, codeId, claimedAt }
  - 60-second cooldown: check DB for most recent claim time
  - Cannot claim same promo code twice
  - Cannot claim video reward within 60 seconds
  - Survives server restart
```

---

### Socket.IO Security

```
Connection authentication:
  - Client connects with: ?token={jwt}&roomId={roomId}
  - Server verifies JWT signature + expiry
  - Server verifies player is authorized for this room (match join API was called)
  - Invalid token → disconnect immediately
  - Connection rate limit: max 5 connections per player per minute

Message validation:
  - Every incoming message validated for expected fields
  - Unknown message types → ignored (not error, silently drop)
  - Malformed messages → ignored
  - No server-side code execution from client messages

Room isolation:
  - Player in room A cannot receive events from room B
  - Player cannot send events to other rooms
  - Each room has its own game state, food, bots
```

---

### Security Checklist (What Was Wrong → What We Fix)

| Issue | Old Code | Snakestar |
-------|---------|-----------|
| Admin routes unauthenticated | No auth check at all | requireAuth() + role === 'admin' |
| PIN stored plaintext | securityPin column, plain text | securityPinHash, bcrypt hashed |
| No rate limiting | Unlimited requests | In-memory rate limiter per endpoint |
| Promo codes in-memory | Lost on restart, exploitable | DB-backed, 60s cooldown, per-player tracking |
| Video rewards in-memory | Same problem | DB-backed VideoReward table |
| No movement validation | Client position trusted | Server validates distance/speed per tick |
| No match result verification | Client could forge results | HMAC-signed payload, server verification |
| No duplicate match prevention | Replay results for infinite chips | Unique matchId, reject duplicates |
| No AFK detection | Players could farm AFK | 60s no-input → AFK, 120s → kick |
| No connection rate limit | Could spam socket connections | 5 connections/minute per player |

---

## Cost Summary

| Scenario | Monthly Cost |
|----------|-------------|
| 0 players | ~$0-5 (Next.js hosting only) |
| 10 players | ~$5 (1 small VPS) |
| 100 players | ~$10-20 (1 VPS, 2-3 rooms) |
| 1,000 players | ~$30-50 (1-2 VPS instances) |
| 10,000 players | ~$100-200 (load balancer + 3-5 VPS) |

SQLite = free. No separate DB server. No Redis. No CDN costs (procedural audio, minimal static assets).
