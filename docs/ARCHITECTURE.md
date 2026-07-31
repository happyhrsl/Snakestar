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
        hof-induct/route.ts            — Run year-end HOF induction
        reports/route.ts               — List/action player reports
      player/
        spectate-status/route.ts       — Check if player is in-match (for spectate)
        block/route.ts                 — Block/unblock player
        blocked/route.ts               — List blocked players
      friends/
        invite/route.ts                — Send co-op arena invite
        invite/respond/route.ts       — Accept/reject/counter co-op invite
        invite/pending/route.ts       — Get pending invites
        rival/convert/route.ts         — Convert rival to friend
        rival/hunt/route.ts            — Get rival's current arena for HUNT
      clans/
        role/route.ts                  — Promote/demote clan member
        disband/route.ts               — Disband clan (leader only)
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

    shared/
      not-signed-in.tsx            — Auth gate for all panels (sign in CTA)
      report-modal.tsx               — Report player form (reason + details)

    game/
      game-canvas.tsx               — THIN shell: canvas + socket init + HUD overlay
      spectate/
        spectate-mode.tsx            — Overlay: hides actions, shows SPECTATING badge
        spectate-banner.tsx          — "👁 Spectating [name]" + leave button
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
        death-screen.tsx            — Elimination results + killer card + social buttons + vignette
        extract-screen.tsx          — Extraction success results + watch video button
        replay-player.tsx           — Embedded death replay (on death overlay)
        online-replay-player.tsx    — Full-screen replay with controls (speed, zoom)
        rewarded-ad-modal.tsx       — Watch-ad wrapper (moved to shared/)
      spectate/
        spectate-mode.tsx            — Overlay: hides actions, shows SPECTATING badge (moved to game/)
        spectate-banner.tsx          — "👁 Spectating [name]" + leave button (moved to game/)
      modals/
      game-rules-modal.tsx          — 14 sections + 19 FAQs
      player-inspector-modal.tsx    — Click player → inspect popup
      report-modal.tsx               — Report player form (moved to shared/)
      co-op-invite-modal.tsx        — Arena selection + eligibility for co-op invite

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

---

## Architecture Gaps & TODOs

> Identified by cross-referencing ARCHITECTURE.md against BUILD-PLAN.md, REBUILD-ANALYSIS.md, gdd-parts/12-requirements-and-gaps.md, package.json, and prisma/schema.prisma.
> This section is a living document — remove items once resolved.

---

### 1. MISSING SECTIONS (needs to be written)

| # | Missing Section | Why It Matters | Source Reference |
|---|----------------|---------------|------------------|
| 1.1 | **Database Schema** | No Prisma models documented with fields anywhere in ARCHITECTURE.md. The 9 models (Player, DailyReward, Challenge, Clan, ClanMember, ClanChat, Friendship, MatchHistory, PromoCode) plus VideoReward, PromoCodeClaim, BroadcastMessage need full field definitions. Current `schema.prisma` is still the Next.js starter (User + Post). | BUILD-PLAN 1.1, Security section mentions VideoReward/PromoCodeClaim |
| 1.2 | **Offline / Practice Mode** | Barely mentioned (one line in arena tier table). Needs a full section covering: infinite map, 1000 bots, no chips/stars/XP, 30Hz physics tick, no self-destruct, different leaderboard sort (score not chips). | gdd-parts/12 Section 7, REBUILD-ANALYSIS |
| 1.3 | **Animation Strategy** | `framer-motion` is a dependency (listed in REBUILD-ANALYSIS tech stack, in package.json) but not in ARCHITECTURE.md tech stack table, and no section describes when/where animations are used. | REBUILD-ANALYSIS tech stack, package.json |
| 1.4 | **Form Handling & Validation** | `react-hook-form` + `zod` are dependencies but undocumented. Need section on which forms use RHF vs controlled inputs, Zod schemas location, shared validation patterns. | package.json |
| 1.5 | **Toast / Notification System** | `sonner` is the toast library but not mentioned anywhere in architecture. Need to document: when toasts fire, toast types, toast positioning on mobile. | package.json, BUILD-PLAN 6.7 |
| 1.6 | **Error Handling Strategy** | BUILD-PLAN 6.7 calls for "edge cases, loading states, error boundaries" but architecture has no section. Need: error boundary wrapping, API error response format, retry strategy, loading skeleton pattern. | BUILD-PLAN 6.7 |
| 1.7 | **Clip Recording & Sharing** | Clip showcase panel is in file structure, but the recording mechanism (how clips are captured from canvas) and storage strategy (where do clips live?) are not documented. | REBUILD-ANALYSIS #23, file structure |
| 1.8 | **Tournament / Championship Game Mode** | Championships panel has standings and prize tiers, but there's no section describing: how tournaments are structured (timed? elimination?), how standings are calculated, how prizes are distributed. | REBUILD-ANALYSIS #21, screen-content/championships.md |

---

### 2. TECH STACK MISMATCHES

| # | Issue | ARCHITECTURE.md Says | Actual / Other Doc Says | Fix |
|---|-------|---------------------|----------------------|-----|
| 2.1 | Framer Motion missing from table | Not listed | REBUILD-ANALYSIS: `Framer Motion (animations)` — also in package.json | Add row to tech stack table |
| 2.2 | next-auth is in package.json | "JWT (custom, not NextAuth)" | `next-auth@4.24.11` is a dependency | Remove from package.json (stale from starter) |
| 2.3 | next-intl is in package.json | Not mentioned (no i18n planned) | `next-intl@4.3.4` is a dependency | Remove from package.json if i18n not planned, or document if it is |
| 2.4 | recharts in package.json | Not mentioned | `recharts@2.15.4` is a dependency | Document usage (likely statistics charts in profile/admin) or remove |
| 2.5 | @dnd-kit in package.json | Not mentioned | 3 dnd-kit packages are dependencies | Document usage (likely cosmetics reordering or clip upload ordering) or remove |
| 2.6 | react-hook-form + zod | Not mentioned | Both in package.json | Add to tech stack table under "Forms & Validation" |
| 2.7 | sonner | Not mentioned | In package.json | Add to tech stack table under "Notifications" |
| 2.8 | date-fns | Not mentioned | In package.json | Add to tech stack table under "Utilities" |

---

### 3. ARENA TIER COUNT MISMATCH

| Source | Tier Count |
|--------|------------|
| ARCHITECTURE.md (section 10 — Arena Tiers in gdd-parts/12, implied in file structure) | 7 competitive tiers + practice |
| BUILD-PLAN 3.1 | 30 competitive tiers + 3 practice modes |
| REBUILD-ANALYSIS | "30 competitive arena tiers (10c → 1B buy-in) + 3 practice modes" |

**Resolution needed**: Update ARCHITECTURE.md to reflect 30 tiers + 3 practice. The 7-tier table shown in `gdd-parts/12` appears to be a simplified summary, not the full list. The architecture file structure section's arena-selector panel should note it displays 30 tiers grouped by difficulty, not 5 difficulty filters for 7 tiers.

---

### 4. BOT COUNT PER TIER MISMATCH

| Source | Bot Counts |
|--------|-----------|
| ARCHITECTURE.md (On-Demand Game Server section) | "Each room: 30 bots + up to 30 real players" |
| gdd-parts/12 (Arena Tiers table) | Tier 1: 25 bots, Tier 2: 30, Tier 3: 40, Tier 4: 50, Tiers 5-7: 60 |
| BUILD-PLAN 2.11 | Not specified |

**Resolution needed**: The "30 bots" in architecture is a simplification. The actual counts scale from 25–60 by tier. Update the On-Demand Game Server section to reference `game-config.ts` for per-tier bot counts rather than stating a flat 30.

---

### 5. FEATURES MENTIONED ELSEWHERE BUT NOT IN ARCHITECTURE

| # | Feature | Where Documented | Missing From |
|---|---------|-----------------|--------------|
| 5.1 | Death vignette (3s red overlay) | REBUILD-ANALYSIS (In-Game #17) | ARCHITECTURE.md overlays section |
| 5.2 | Mute/unmute button in HUD | REBUILD-ANALYSIS (#18) | ARCHITECTURE.md HUD section |
| 5.3 | Delta compression for bandwidth | REBUILD-ANALYSIS (#63) | ARCHITECTURE.md bandwidth section |
| 5.4 | Single shared snapshot per room (not per-player) | REBUILD-ANALYSIS (#64) | ARCHITECTURE.md performance section |
| 5.5 | RewardedAdModal for video rewards | REBUILD-ANALYSIS (#17) | ARCHITECTURE.md file structure / overlays |
| 5.6 | Graduated commission (0% if ≤3 real, 35% if ≥4) | gdd-parts/12 (Section 8) | ARCHITECTURE.md mentions commission but not the graduated formula |
| 5.7 | Bot displacement on player join | gdd-parts/12 (Section 5.2) | ARCHITECTURE.md On-Demand Server section (partially, as "adds player") |

---

### 6. CODE-LEVEL GAPS (from gdd-parts/12-requirements-and-gaps.md)

These are implementation bugs/gaps between the rules and code, not architecture gaps, but tracked here for completeness:

| # | Gap | Severity | Status |
|---|-----|----------|--------|
| 6.1 | Boost drop interval = 40 frames (~0.75/sec) but rules say ~3/sec (needs 10 frames) | Medium | ❌ Not fixed in config yet |
| 6.2 | Food collection sound never plays (no server event or client detection) | Medium | ❌ Not wired |
| 6.3 | Boost activation sound never plays | Low | ❌ Not wired |
| 6.4 | Wall hit sound never plays | Low | ❌ Not wired |
| 6.5 | Star chip collection sound missing (online) | Low | ❌ Not wired |

---

### 7. PREREQUISITE STATE

| Check | Status |
|-------|--------|
| `src/` directory exists | ❌ No — entire codebase unbuilt |
| Prisma schema matches architecture (9+ models) | ❌ No — still has default User + Post starter models |
| `mini-services/game-server/` exists | ❌ No — not created yet |
| shadcn/ui components initialized | ⚠️ Partial — `components.json` exists but likely starter config |

**Conclusion**: ARCHITECTURE.md is a complete design document for a not-yet-built project. The gaps above are design documentation gaps (sections, mismatches, missing details) — not code bugs. All code-level gaps (Section 6) will be relevant once implementation begins per BUILD-PLAN.md.

---

### 8. PRIORITY ORDER FOR RESOLVING GAPS

1. **[Critical]** Write Database Schema section (#1.1) — needed before any API or auth code
2. **[High]** Fix arena tier count (#3) and bot count (#4) — fundamental game design
3. **[High]** Add Framer Motion + form libs to tech stack table (#2.1, #2.6, #2.7, #2.8)
4. **[High]** Write Offline/Practice Mode section (#1.2) — affects game server architecture
5. **[Medium]** Add missing HUD/overlay features (#5.1, #5.2, #5.5)
6. **[Medium]** Document delta compression + shared snapshot (#5.3, #5.4)
7. **[Medium]** Write Error Handling + Animation + Toast sections (#1.3, #1.5, #1.6)
8. **[Low]** Clean up stale package.json deps (#2.2, #2.3) or document them
9. **[Low]** Write Clip Recording + Championship sections (#1.7, #1.8)
10. **[Low]** Document graduated commission formula (#5.6) and bot displacement (#5.7)

---

## Missing Features (Screen-Content Audit)

> Cross-referenced all 18 screen-content files against ARCHITECTURE.md file structure.
> These features are DESIGNED (exist in screen-content) but MISSING from the architecture document.
> All must be built in V1.

---

### A. SPECTATE SYSTEM (CRITICAL — Major Feature)

Described in: `friends-and-search.md`, `dossier.md`, `dashboard.md`

Players can spectate a friend's live match in real-time when the friend is `in-match`.

**How it works:**
```
1. Friend's status === 'in-match' → Spectate button appears (pulsing cyan)
2. Player clicks Spectate → joins friend's arena room as READ-ONLY observer
3. Spectator receives same state broadcasts as players but CANNOT send input
4. Spectator sees: all snakes, food, stars, HUD (no action buttons, no extraction)
5. Spectator's own snake is NOT spawned — they are invisible to players
6. When spectated player dies/extracts → spectator sees result overlay
7. Toast: "Spectating [name]'s live match..."
```

**Server changes needed:**
- Socket connection accepts `?mode=spectate&targetPlayerId=xxx`
- Spectators join room but are excluded from: collision checks, kill feed generation, food spawn logic
- Spectators receive the same `state` broadcast as real players
- Server tracks spectator count per room (for admin stats)
- Spectators disconnected if target player disconnects

**Client changes needed:**
- `src/components/game/spectate/spectate-mode.tsx` — wrapper that hides action buttons, shows "SPECTATING" badge
- HUD shows "👁 Spectating [name]" banner, no boost/extract/leave buttons
- No virtual joystick (spectator can't control anything)
- Can leave spectate any time → returns to lobby

**API:**
- `GET /api/player/spectate-status?playerId=xxx` — check if player is in-match and get roomId
- No new match/join needed — spectator connects directly to game server

**Files to add:**
```
src/components/game/spectate/
  spectate-mode.tsx          — Overlay wrapper for spectate HUD adjustments
  spectate-banner.tsx         — "👁 Spectating [name]" + leave button
```

---

### B. CO-OP LOBBY INVITE MODAL

Described in: `friends-and-search.md`, `dossier.md`

Players can invite a friend to a specific arena with buy-in stakes.

**How it works:**
```
1. Player clicks friend → sees Invite button
2. Modal opens: shows YOUR balance + FRIEND'S balance
3. Lists all 30 ARENA_TIERS with eligibility:
   - "Eligible 🤝" (both can afford)
   - "You can't afford" (your balance too low)
   - "They can't afford" (friend's balance too low)
4. Player selects tier → sends invite
5. Friend sees invite notification in lobby
6. Friend can: Accept (joins that tier), Reject, or Counter-propose (different tier)
7. Toast: "Co-op invite accepted by [name]! Staking buy-in..."
```

**Server/DB:**
- New table: `Invite { id, fromPlayerId, toPlayerId, tierId, status, createdAt }`
- Status: 'pending' | 'accepted' | 'rejected' | 'counter_proposed' | 'expired'
- Invites expire after 5 minutes
- On accept: deduct buy-in from both players, both join same room

**Files to add:**
```
src/components/panels/social-panel/
  co-op-invite-modal.tsx    — Arena selection + eligibility + send
  invite-notification.tsx    — Incoming invite display + accept/reject

prisma schema:
  Invite model (see above)

API:
  POST /api/friends/invite/route.ts      — Send co-op invite
  POST /api/friends/invite/respond/route.ts  — Accept/reject/counter
  GET  /api/friends/invite/pending/route.ts  — Get pending invites
```

---

### C. BLOCK PLAYER

Described in: `player-inspector.md`

Players can block other players to prevent interaction.

**How it works:**
```
1. Player inspects another player → sees [Ban icon] Block Player button
2. After blocking: button shows "Player Blocked" (disabled)
3. Blocked players CANNOT: send friend requests, send co-op invites, appear in search results, send clan invites
4. Toast: "Player [name] has been added to your block list."
```

**DB:**
- New table: `Block { id, blockerId, blockedId, createdAt }`
- Unique constraint: [blockerId, blockedId]

**Files to add:**
```
API:
  POST /api/player/block/route.ts    — Block/unblock player
  GET  /api/player/blocked/route.ts   — List blocked players

Update existing:
  player-inspector/overview-tab.tsx  — Add Block button
  social-panel/community-search.tsx  — Filter out blocked players
  friends/request/route.ts           — Reject if blocker/blockee
```

---

### D. CREATOR SOCIAL CHANNELS (Instagram, YouTube, Twitch)

Described in: `dossier.md`, `player-inspector.md`

Players can link their social media handles on their public profile.

**How it works:**
```
1. In dossier (identity editor): 3 input fields for Instagram, YouTube, Twitch handles
2. On public profile (player inspector): 3 social buttons with external links
3. Links open in new tab: instagram.com/{handle}, youtube.com/@{handle}, twitch.tv/{handle}
4. Only shown if the field is truthy (non-empty)
```

**DB changes:**
```
Player model — add 3 optional fields:
  instagram   String?   — handle without @
  youtube     String?   — channel/handle
  twitch      String?   — channel name
```

**Files to update:**
```
  player-profile/stats-tab/identity-editor.tsx  — Add 3 social input fields
  player-inspector/overview-tab.tsx              — Add 3 social link buttons
```

---

### E. WATCH VIDEO (+50 CHIPS) ON END OVERLAYS

Described in: `game-hud.md`, `game-rules-modal.md`

After death or extraction, a "Watch Video" button appears for +50 chips.

**How it works:**
```
1. Match ends (death or extract) → end overlay shows results
2. Below results: [📺 Watch Video (Get +50 Chips)] button
3. Player clicks → RewardedAdModal opens → 5-second ad plays
4. After ad: +50 chips added to wallet, button disabled
5. 60-second cooldown (same as store ad reward)
6. This is SEPARATE from the store's ad reward (+100c, 12/day max)
```

**Two distinct ad reward systems:**
```
Store ad reward:  +100 chips per ad, max 12/day (1,200/day), resets at 00:00 UTC
End overlay ad:   +50 chips per ad, 60-second cooldown, no daily limit
```

**Files to add:**
```
src/components/game/overlays/
  rewarded-ad-modal.tsx       — Ad wrapper with timer + reward callback

Update existing:
  overlays/death-screen.tsx    — Add Watch Video button + ad modal
  overlays/extract-screen.tsx  — Add Watch Video button + ad modal
```

---

### F. ADD RIVAL / ADD FRIEND FROM DEATH OVERLAY

Described in: `game-hud.md`

When killed by a real player, the killer card shows social action buttons.

**How it works:**
```
1. Player dies → death overlay shows killer card (name, avatar, carried chips)
2. Killer card has 3 buttons: [👤 View Profile] [⚔️ Add Rival] [➕ Add Friend]
3. Add Rival → toast: "[killerName] added to your Rival List!"
4. Add Friend → sends friend request → toast: "Friend request sent to [killerName]"
5. View Profile → opens player inspector modal for killer
6. Buttons only shown for REAL players (not bots)
```

**Files to update:**
```
  overlays/death-screen.tsx  — Add 3 buttons to killer card
  (APIs already exist in /api/friends/)
```

---

### G. DEATH VIGNETTE (Red Flash)

Described in: `game-hud.md`

Full-screen red radial gradient flash on death.

**Implementation:**
```
- Full-screen div: fixed inset-0, pointer-events-none, z-30
- Red radial gradient: transparent center 30%, rgba(220,38,38,0.6) at edges
- 300ms fade-in, then fades out over 1s
- Only triggers on death, NOT on extraction
```

**Files to update:**
```
  overlays/death-screen.tsx  — Add vignette div before results content
```

---

### H. CLAN WARS, CLAN LEVEL, CLAN ROLES, CLAN EMBLEM

Described in: `syndicates.md`, `friends-and-search.md`

**Clan Level/XP:**
- Clans have a level + XP system (displayed as violet→amber gradient bar)
- XP earned from: members winning matches, deposits, activity
- Level unlocks perks

**Clan Roles:**
- 3 roles: Leader (👑), Co-Leader, Member (Viper)
- Leader can: promote/demote, disband clan, edit settings
- Co-Leader can: accept/decline join requests, manage chat
- Member: basic participation

**Clan Emblem:**
- 10 preset emoji emblems: 🐍 🦅 🎯 💀 💎 🔥 👑 ⚡ 🏆 ☣️
- Selected during clan creation
- Displayed in clan list, member roster, and in-match leaderboards as [CLAN-TAG]

**Clan Perks (future-proof, basic in V1):**
- Self-Sponsored Arenas (host custom clan tournaments from treasury)
- Clan Tag Emblem in match leaderboards
- Syndicate Wars (weekly Clan vs Clan — UI only in V1, full match in V2)

**DB changes:**
```
Clan model — add:
  level       Int      default 1
  xp          Int      default 0
  emblem      String   default '🐍'

ClanMember model — add:
  role        String   default 'member'  // 'leader' | 'co-leader' | 'member'
```

**Files to update:**
```
  clan-system/my-clan-tab.tsx      — Show level bar, emblem, member roles
  clan-system/browse-tab.tsx       — Show clan emblem + level in listing
  clan-system/create-clan-form.tsx — Add emblem selector (10 emoji grid)
  api/clans/role/route.ts          — NEW: promote/demote member (leader only)
  api/clans/disband/route.ts       — NEW: disband clan (leader only)
```

---

### I. RIVALS: HUNT/JOIN ARENA + HEAD-TO-HEAD RECORD

Described in: `friends-and-search.md`, `game-hud.md`

**HUNT mechanism:**
```
1. Rival list shows each rival's current arena name
2. [⚔ HUNT / JOIN ARENA] button on each rival card
3. Clicking: validates player can afford the tier buy-in, then joins that exact arena
4. Toast: "⚔️ HUNT INITIATED: Entering [arena] to take down [name]!"
```

**Head-to-Head Record:**
```
Each rivalry tracks: killsByYou, killsOfYou
Displayed as: "Head-To-Head: You: 3 - Rival: 7"
Updated on every kill event between the two players.
```

**Rival-to-Friend conversion:**
```
Rival card has [UserPlus icon: "Convert to Friend"] button
Converts rivalry to friendship, preserves history.
```

**DB changes:**
```
Friendship model — add fields:
  killsByA    Int  default 0   // A killed B this many times
  killsByB    Int  default 0   // B killed A this many times
  type        String           // 'friend' | 'rival' (allows conversion)

API updates:
  POST /api/friends/rival/convert/route.ts  — Convert rival to friend
  GET  /api/friends/rival/hunt/route.ts     — Get rival's current arena
```

---

### J. CHALLENGE DISPATCH (FROM PLAYER INSPECTOR)

Described in: `player-inspector.md`

Players can send a challenge notification to another player.

**How it works:**
```
1. Player inspects another player → [Swords icon] Challenge button
2. Click → toast: "Arena challenge dispatch sent to [name]! ⚔️"
3. The challenged player sees a notification in their lobby
4. Challenge = a notification only (no forced match, no special game mode)
5. It's essentially a "I challenge you to beat my score" social notification
```

**Implementation:**
- Uses the existing `BroadcastMessage` or a new `Challenge` notification table
- Simple notification row: { fromPlayerId, toPlayerId, tierId, message, createdAt }

---

### K. REGIONAL & GLOBAL ALLIES (PLAYER INSPECTOR)

Described in: `player-inspector.md`

**How it works:**
```
1. Player inspector shows "Regional Allies" section (same country)
   - Lists other players from the same country with rank badges
   - Shows ally count: "REGIONAL ALLIES (INDIA NETWORK) 1,234 Members"
2. "Global Allies & International Alliances" section (all countries)
   - Same structure, different color (cyan variant)
3. This is a READ-ONLY display — it's a leaderboard filtered by country/region
4. Data comes from the existing leaderboard API with country filter
```

**Files to update:**
```
  player-inspector/overview-tab.tsx  — Add 2 ally sections (leaderboard filtered by country)
  (Uses existing leaderboard API, no new backend needed)
```

---

### L. HOF YEARLY RESET & WINNER DETERMINATION

Described in: `hall-of-fame.md`, `championships.md`

**How it works:**
```
1. Championship runs for one calendar year (Jan 1 → Dec 31)
2. On January 1st at 00:00 UTC: automated batch process runs
3. Process:
   a. Query: players with highest walletChips per scope (global, regional, national)
   b. Induct winners into HallOfFame table with year, scope, rank
   c. Award massive chip prizes to winners
   d. Reset championship standings (new year begins)
   e. Archive previous year's data
4. HOF page shows milestone years: 2026 (current), 2025, 2024, etc.
5. "PERMANENT MILESTONE IMMORTALITY" — once inscribed, never removed
```

**DB:**
```
HallOfFame model:
  id, playerId, year, scope ('global'|'regional'|'national'),
  rank Int, walletChips Int, country, region,
  inductedAt DateTime, tier String

HallOfFameTier model (6 tiers: Bronze → Omega):
  id, name, minWalletChips, icon, color
```

**Implementation:**
- Cron job or manual admin trigger for Jan 1st induction
- Admin panel: "Run Year-End Induction" button (for testing + actual use)
- API: `POST /api/admin/hof-induct/route.ts`

---

### M. NOTSIGNEDIN COMPONENT

Described in: Every screen-content file

**How it works:**
```
Every panel checks auth state. If not signed in:
  → Entire panel replaced by <NotSignedIn /> component
  → Shows: "Sign in to access [feature name]" + Sign In button
  → Clicking Sign In navigates to auth screen
```

**File to add:**
```
src/components/shared/
  not-signed-in.tsx  — Auth gate component for all panels
```

---

### N. ADDITIONAL DETAIL FIXES

| # | What's Wrong | Correction | Source |
|---|-------------|------------|--------|
| N.1 | Architecture says store ad = +50c | Store ad = +100c, 12/day, 1,200/day max. End overlay ad = +50c, 60s cooldown. TWO different systems. | `vault-chip-store.md`, `game-hud.md` |
| N.2 | No preset avatar system | 8 emoji avatars (🐍☠️👾🤖👑⚡🔥🌌) + custom image upload (PNG/JPG/WebP, 1.5MB max, drag & drop) | `dossier.md` |
| N.3 | No cosmetic slot detail | Slots: DNA Skin, Tail FX, Kill Sound, Avatar Border, Badge, Title, Emote, Spray, Profile Banner | `shop-and-lab.md`, `pass.md` |
| N.4 | No challenge streak multiplier | 3-day → ×1.5, 7-day → ×2.0, 14-day → ×3.0 bonus on challenge rewards | `game-rules-modal.md` |
| N.5 | No Day 7 ad multiplier | Daily reward Day 7: ad reward doubled (multiplier=2 sent to API) | `claims-daily-rewards.md` |
| N.6 | No real-money pricing | 10 chip packs: ₹10 to ₹15,000 ($0.12 to $175.00) with bonus percentages | `vault-chip-store.md` |
| N.7 | No store anti-monopoly lock | When yearly purchase cap (25L chips / ₹15,000) reached: store LOCKED for 365 days | `vault-chip-store.md` |
| N.8 | Bot count is not flat 30 | Bots scale by tier: 25 (tier 1) → 60 (tier 7+) | `gdd-parts/12` |
| N.9 | No mute button in HUD | Header/HUD needs sound toggle button | `game-hud.md` |
| N.10 | No chat mention toast | When @mentioned in clan chat → toast notification | `game-hud.md` |
| N.11 | No online replay player | Full-screen replay player (separate from embedded replay on death screen) | `game-hud.md` |
| N.12 | Graduated commission not documented | 0% commission if ≤3 real players, 35% if ≥4 real players | `gdd-parts/12` |

---

## Production Readiness Suggestions

> These are NOT in screen-content but are essential for a production multiplayer game.
> Strongly recommended to add before launch.

---

### P1. CONCURRENT SESSION PREVENTION

**Problem:** Player opens 2 browser tabs → joins 2 matches → double-spends buy-in chips.

**Solution:**
```
1. On match join: check if player already has an active room in game server
2. Game server tracks: Map<playerId, roomId> for all connected players
3. If player already in a room → reject new connection with error: "Already in a match"
4. On disconnect/crash: 5-second grace period, then clear from map
5. Admin can force-clear stuck sessions
```

---

### P2. MID-MATCH DISCONNECT SAFETY

**Problem:** Player's internet drops mid-match → snake sits idle → gets killed by wall → loses buy-in.

**Solution:**
```
1. On disconnect: server marks player as "disconnected" (not immediately removed)
2. 15-second grace window: snake continues on last known path (straight line)
3. After 15 seconds: snake is auto-killed (fair — prevents infinite AFK)
4. Match result still processed normally (death → chips lost, stars dropped)
5. On reconnect within 15s: player resumes controlling their snake
6. Reconnecting banner shows countdown: "Reconnecting... 12s remaining"
```

---

### P3. SOUND TOGGLE / VOLUME CONTROL

**Problem:** No way to mute game sounds. Players in public spaces need this.

**Solution:**
```
1. Small 🔊/🔇 toggle button in HUD (top-right, near network info)
2. Persists preference in localStorage
3. Mutes all 8 Web Audio sounds
4. Does NOT affect UI click sounds (if any)
```

---

### P4. PLAYER REPORTING

**Problem:** Toxic players, cheating suspects, inappropriate names — no way to report.

**Solution:**
```
1. Player inspector: [Flag icon] Report Player button
2. Report modal: reason dropdown (Cheating, Toxic Behavior, Inappropriate Name, Other) + text field
3. Reports stored in DB: Report { reporterId, reportedId, reason, details, createdAt }
4. Admin panel: new "Reports" tab to review and action reports
5. Auto-ban after 5 confirmed reports (admin-reviewed)
```

---

### P5. CHAT PROFANITY FILTER

**Problem:** Clan chat has no moderation. Toxic messages persist.

**Solution:**
```
1. Simple word-block list on server side (array of banned words/phrases)
2. Messages containing blocked words: replaced with "***" before broadcast
3. Not a sophisticated AI filter — just a basic blocklist
4. Admin can add/remove words from the blocklist
5. Reported messages reviewed by admin
```

---

### P6. DATABASE BACKUP STRATEGY

**Problem:** SQLite is a single file. If corrupted, all data lost.

**Solution:**
```
1. SQLite WAL mode enabled (Write-Ahead Logging) — safer concurrent access
2. Daily backup: copy db/snakestar.db to db/backups/snakestar-YYYY-MM-DD.db
3. Keep last 7 days of backups
4. Backup runs via simple cron/scheduled task
5. Admin panel shows last backup time + manual backup trigger button
```

---

### P7. ROOM SHARDING / MATCHMAKING

**Problem:** Architecture says "unlimited rooms" but doesn't describe how rooms are assigned.

**Solution:**
```
1. Room ID format: "{tierId}#1", "{tierId}#2" (shard number)
2. First player joining a tier → creates shard #1
3. When shard reaches MAX_PLAYERS_PER_SHARD (1000) → create shard #2
4. Safety cap: max 200 shards per tier
5. Player joining: assigned to shard with most real players (fill existing first)
6. Practice mode: each player gets their own instance (no sharing)
```

---

### P8. TIMEZONE HANDLING

**Problem:** Daily rewards, streaks, and yearly reset — which timezone?

**Solution:**
```
1. All server-side timestamps: UTC (DateTime in Prisma = UTC)
2. Daily reward reset: 00:00 UTC (consistent for all players globally)
3. Streak calculation: based on UTC date of last claim
4. Yearly championship/HOF: calendar year UTC (Jan 1 00:00 UTC)
5. Client displays times in user's local timezone (using Intl.DateTimeFormat)
6. No per-user timezone setting needed — browser handles display
```
