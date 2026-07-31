# SNAKESTAR — Build Plan

## Rule: Everything in V1. No phasing.

## Build Order

Each item = one git commit. Dependencies listed in ().

---

### PHASE 1: FOUNDATION (see something on screen)

| # | Commit | Files | Depends On | Notes |
|---|--------|-------|-----------|-------|
| 1.1 | DB Schema | `prisma/schema.prisma` | — | 12+ models: Player, DailyReward, Challenge, Clan, ClanMember, ClanChat, Friendship, MatchHistory, PromoCode, VideoReward, PromoCodeClaim, HallOfFame, Invite, Block, Report |
| 1.2 | Game Config | `src/lib/game-config.ts`, `src/lib/constants.ts` | — | All 30 tiers, 3 practice, cosmetics (9 slot types), rewards, challenges, countries, real-money pricing |
| 1.3 | Shared Types | `src/types/game.ts`, `src/types/player.ts`, `src/types/api.ts` | — | All TypeScript interfaces |
| 1.4 | Utility Libs | `src/lib/db.ts`, `src/lib/auth.ts`, `src/lib/api-helpers.ts`, `src/lib/utils.ts`, `src/lib/date-utils.ts`, `src/lib/player-helpers.ts`, `src/lib/responsive.ts` | 1.1, 1.3 | DB client, JWT, response helpers |
| 1.5 | Auth API | `src/app/api/auth/` (12 routes) | 1.1, 1.4 | Register, login, guest, logout, me, token, change-password, change-pin, forgot-password, social-login, social-callback, upgrade |
| 1.6 | Auth Provider | `src/stores/auth-store.ts`, `src/components/providers/auth-provider.tsx` | 1.5 | Zustand store + React context |
| 1.7 | Auth Screens | `src/components/auth/` (6 files) | 1.6 | Login, register, forgot password, social buttons, password strength |
| 1.8 | Shared Components | `src/components/shared/` (2 files) | 1.6 | not-signed-in.tsx (auth gate for panels), report-modal.tsx |
| 1.9 | Theme + Layout | `src/components/providers/theme-provider.tsx`, `src/components/layout/` (5 files) | 1.7 | Header (with sound toggle), sidebar, mobile-nav, footer, sub-page-nav |
| 1.10 | Dashboard | `src/components/dashboard/` (5 files), `src/app/page.tsx`, `src/app/layout.tsx` | 1.9 | Hero, bento grid, 12 gates, challenges sidebar, SPA routing |
| **MILESTONE** | **Lobby visible** | User can register, login, see dashboard | |

---

### PHASE 2: CORE GAME

| # | Commit | Files | Depends On | Notes |
|---|--------|-------|-----------|-------|
| 2.1 | Game Constants | `src/components/game/engine/constants.ts`, `src/components/game/engine/types.ts` | 1.2 | All game numbers, entity types, per-tier bot counts |
| 2.2 | Physics Engine | `src/components/game/engine/physics.ts` | 2.1 | Movement, speed, turning formulas |
| 2.3 | Collision System | `src/components/game/engine/collision.ts` | 2.2 | Head-body, head-on, wall detection |
| 2.4 | Food System | `src/components/game/engine/food.ts` | 2.1 | Spawning, death food scatter |
| 2.5 | Star System | `src/components/game/engine/stars.ts` | 2.1 | Star creation on death, collection |
| 2.6 | Spawning | `src/components/game/engine/spawning.ts` | 2.2, 2.3 | Safe spawn position (500px rules) |
| 2.7 | Extraction | `src/components/game/engine/extraction.ts` | 2.1 | 3s timer, graduated commission (0% ≤3 players, 35% ≥4), steering reset |
| 2.8 | Bot AI | `src/components/game/engine/bots.ts` | 2.2, 2.3, 2.4 | 5 personalities, harvest/evade/self-destruct, per-tier bot count |
| 2.9 | Snake Engine Lib | `src/lib/snake-engine.ts` | 2.2 | Shared growth/size formulas |
| 2.10 | Canvas Renderer | `src/components/game/render/renderer.ts`, `snake.ts`, `food.ts`, `stars.ts`, `boundary.ts`, `background.ts`, `effects.ts` | 2.4, 2.5 | All drawing functions |
| 2.11 | Game Server | `mini-services/game-server/` (6 files) | 2.1–2.8 | Socket.IO, rooms, tick loop, spatial grid, bot AI, room sharding, spectate support, concurrent session prevention, disconnect safety |
| 2.12 | Client Network | `src/components/game/client/network-sync.ts`, `src/components/game/client/game-loop.ts` | 2.11 | Socket events, RAF loop |
| 2.13 | Input System | `src/components/game/client/input.ts` | 2.12 | Mouse, keyboard, touch handlers |
| 2.14 | Prediction + Interpolation | `src/components/game/client/prediction.ts`, `interpolation.ts` | 2.12, 2.13 | Smooth movement, no lag |
| 2.15 | Game Canvas Shell | `src/components/game/game-canvas.tsx` | 2.10, 2.12 | Thin wrapper: canvas + socket + HUD root |
| 2.16 | HUD Elements | `src/components/game/hud/` (12 files) | 2.15 | Status cards, leaderboard, buttons, emotes, minimap, kill feed, **sound toggle** |
| 2.17 | Game Overlays | `src/components/game/overlays/` (8 files) | 2.16 | Death (vignette + killer social buttons + watch video), extract (watch video), connecting, reconnecting, replay (embedded + online full-screen), rewarded ad modal |
| 2.18 | Mobile Controls | `src/components/game/controls/` (3 files), `src/hooks/use-orientation.ts` | 2.13, 2.16 | Joystick, touch buttons, orientation adapter |
| 2.19 | Match API | `src/app/api/match/` (3 routes), `src/app/api/arena-stats/route.ts` | 1.5, 2.11 | Join validation, result submission, live stats |
| 2.20 | Audio | `src/lib/game-audio.ts` | — | 8 procedural Web Audio sounds, sound toggle integration |
| 2.21 | Replay Buffer | `src/components/game/client/replay-buffer.ts` | 2.12, 2.17 | 300-frame pre/post death recording |
| 2.22 | Spectate System | `src/components/game/spectate/` (2 files), `src/app/api/player/spectate-status/route.ts` | 2.11, 5.2 | Read-only room join, HUD adjustments, spectate banner |
| **MILESTONE** | **Game playable** | Can join arena, play, die/extract, spectate, see HUD | |

---

### PHASE 3: ECONOMY + PROGRESSION

| # | Commit | Files | Depends On | Notes |
|---|--------|-------|-----------|-------|
| 3.1 | Arena Selector | `src/components/panels/arena-selector/` (6 files) | 1.10, 2.19 | 30 tiers, 3 practice, live player counts, graduated commission display |
| 3.2 | Player API | `src/app/api/player/` (9 routes) | 1.5 | Profile, challenges, cosmetics, daily, promo, video reward, block, blocked list |
| 3.3 | Chip Economy | Update `match/result/route.ts` to handle chips, XP, level calc | 2.19, 3.2 | Buy-in deduct, extract deposit, graduated commission, XP formula |
| 3.4 | XP + Leveling | Update `game-config.ts` xpForLevel, player level-up logic, streak multiplier (3d/7d/14d) | 3.3 | `level * 200` XP per level, streak ×1.5/×2.0/×3.0 |
| 3.5 | Daily Rewards Panel | `src/components/panels/daily-rewards/` (3 files) | 3.2 | 7-day cycle, streak, Day 7 ad 2x multiplier |
| 3.6 | Chip Store Panel | `src/components/panels/chip-store/` (5 files) | 3.2 | 10 packs (₹10–₹15,000 / $0.12–$175), promo codes, yearly cap lock, store ad reward (+100c, 12/day) |
| 3.7 | Chip Pack API | `src/app/api/chips/pack/route.ts` | 3.2 | Purchase validation, yearly cap tracking (25L chips / ₹15,000), anti-monopoly lock |
| **MILESTONE** | **Economy working** | Can buy in, extract chips, claim rewards, hit cap | |

---

### PHASE 4: COMPETITIVE SYSTEMS

| # | Commit | Files | Depends On | Notes |
|---|--------|-------|-----------|-------|
| 4.1 | In-Game Leaderboard | Already in `hud/arena-leaderboard.tsx` | 2.16 | Online: real players by carried chips. Offline: by score. Clan tag emblem shown. |
| 4.2 | Lobby Leaderboard | `src/components/panels/leaderboards/` (6 files) | 3.1 | 4 tabs, rank card, tier filters, 30-min auto-refresh |
| 4.3 | Leaderboard API | `src/app/api/leaderboard/` (2 routes) | 1.5 | Global, national, my-rank |
| 4.4 | Milestone Badges | Badge logic in `game-config.ts` + display in leaderboard + header | 4.2 | 7 badges (Rookie → Omega), real-time calculation |
| 4.5 | Championship Panel | `src/components/panels/championships/` (8 files) | 4.2 | Hero, countdown, 4 prize tiers, scope tabs, standings |
| 4.6 | Hall of Fame Panel | `src/components/panels/hall-of-fame/` (8 files) | 4.2 | 3 tabs, 6 tiers, ticker, archives per year |
| 4.7 | HOF Induction System | `src/app/api/admin/hof-induct/route.ts`, HOF query logic | 4.6 | Year-end batch: query top wallets, induct to HOF, award prizes, archive. Admin trigger button. |
| 4.8 | Tactical Challenges | Dashboard sidebar + `src/app/api/player/challenges/` (2 routes) | 3.2 | Daily (3) + weekly (2), streak ×1.5/×2.0/×3.0, 4 level tiers, 68+40 templates |
| 4.9 | Season Pass Panel | `src/components/panels/season-pass/` (3 files) | 3.2 | 20 tiers, 40 rewards, elite unlock |
| **MILESTONE** | **Competitive systems live** | Leaderboards, championship, HOF, challenges, pass, HOF induction | |

---

### PHASE 5: SOCIAL + CONTENT

| # | Commit | Files | Depends On | Notes |
|---|--------|-------|-----------|-------|
| 5.1 | Player Profile Panel | `src/components/panels/player-profile/` (10 files) | 3.2 | 4 tabs: stats, identity (8 preset avatars + upload + social channels IG/YT/Twitch), security, match history, friends, tamper logs |
| 5.2 | Friends API | `src/app/api/friends/` (10 routes) | 1.5 | List, request, accept, remove, gift, invite, invite/respond, invite/pending, rival/convert, rival/hunt |
| 5.3 | Social Panel | `src/components/panels/social-panel/` (7 files) | 5.2 | Friends, rivals (HUNT + head-to-head + convert), community search, co-op invite modal, invite notification |
| 5.4 | Clan System | `src/components/panels/clan-system/` (8 files) + `src/app/api/clans/` (8 routes) | 5.2 | Create (emblem selector), join, leave, chat (mention toast + profanity filter), deposit, roster, role promote/demote, disband. Clan level/XP, 3 roles (Leader/Co-Leader/Member). |
| 5.5 | Player Inspector | `src/components/panels/player-inspector/` (6 files) | 4.2 | Modal with 4 tabs + regional/global allies (country-filtered leaderboard), challenge dispatch, block player, social channel links |
| 5.6 | Clip Showcase | `src/components/panels/clip-showcase/` (3 files) | 1.10 | Community clips, upload, upvote |
| 5.7 | Admin Panel | `src/components/panels/admin-panel/` (6 files) + `src/app/api/admin/` (6 routes) | 1.5 | Auth gate, diagnostics, player roster, economy ledger, reports tab, HOF induction trigger, DB backup trigger, mute player |
| **MILESTONE** | **Social features live** | Friends, rivals, clans, profile, inspector, clips, admin, reporting, co-op | |

---

### PHASE 6: POLISH

| # | Commit | Files | Depends On | Notes |
|---|--------|-------|-----------|-------|
| 6.1 | Cosmetics Shop Panel | `src/components/panels/cosmetics-shop/` (7 files) | 3.2 | Gallery + Genetic Pattern Lab (4 steps). 9 cosmetic slots: DNA Skin, Tail FX, Kill Sound, Avatar Border, Badge, Title, Emote, Spray, Profile Banner |
| 6.2 | Cosmetic API | `src/app/api/player/cosmetic/route.ts` | 1.5 | Equip/unequip cosmetics |
| 6.3 | Game Rules Modal | `src/components/modals/game-rules-modal.tsx` | 1.10 | 14 sections + 19 FAQs |
| 6.4 | Sound Effects | `src/lib/game-audio.ts` integration in game-canvas | 2.20 | 8 sounds: food×3, boost, wall, death, extract, star. All wired to events. |
| 6.5 | Responsive Polish | Audit all panels for mobile/tablet/landscape | ALL | Tables→cards, sidebar→bottom nav, touch targets, 5 breakpoints |
| 6.6 | Performance Optimization | Adaptive quality, render culling, LQ mode | 2.14, 2.15 | FPS monitor, auto-disable effects |
| 6.7 | Error Handling | Edge cases, loading states, error boundaries | ALL | Toast for every action, skeleton loaders, not-signed-in gates |
| 6.8 | Final QA | Browser test all flows end-to-end | ALL | Fix any remaining issues, verify all 27 missing features work |
| **MILESTONE** | **V1 COMPLETE** | Every feature working, all gaps closed | |

---

## Total: 57 commits across 6 phases

### Dependency Graph (simplified)

```
Phase 1 (Foundation)
  1.1 → 1.2 → 1.3 → 1.4 → 1.5 → 1.6 → 1.7 → 1.8 → 1.9 → 1.10

Phase 2 (Core Game) — can start at 1.3 in parallel with 1.4-1.10
  1.3 → 2.1 → 2.2 → 2.3 → 2.4 → 2.5 → 2.6 → 2.7 → 2.8
  2.1-2.8 → 2.11 (game server)
  2.1-2.5 → 2.10 (renderer, can start early)
  2.11 + 2.10 → 2.12 → 2.13 → 2.14 → 2.15 → 2.16 → 2.17 → 2.18
  2.17 → 2.22 (spectate needs overlays + friends API)

Phase 3 (Economy) — needs Phase 2 match API
  2.19 + 3.2 → 3.1, 3.3, 3.4, 3.5, 3.6, 3.7

Phase 4 (Competitive) — needs leaderboards from 3.1
  3.1 → 4.2 → 4.4, 4.5, 4.6, 4.7, 4.8, 4.9

Phase 5 (Social) — needs player API from 3.2
  3.2 → 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7

Phase 6 (Polish) — needs everything
  ALL → 6.1 through 6.8
```

### Parallelization Opportunities

During build, these can be worked on simultaneously by different agents:
- **1.2 (config) + 1.3 (types)** — no dependency between them
- **2.10 (renderer) + 2.11 (game server)** — renderer is client-side, server is independent
- **4.x (competitive) + 5.x (social)** — different API endpoints, different panels
- **6.1 (cosmetics) + 6.3 (rules modal)** — completely independent

### Changes from v1 (audit update)

Added 8 new commits, expanded several existing ones:

| New Commit | Phase | What It Covers |
|-----------|-------|---------------|
| 1.8 | Foundation | `not-signed-in.tsx`, `report-modal.tsx` shared components |
| 2.22 | Core Game | Spectate system (server + client) |
| 4.7 | Competitive | HOF yearly induction system (batch + admin trigger) |
| 4.8→4.9 | Competitive | Split challenges into own commit (was sharing with pass) |
| 5.2→5.3 | Social | Expanded: 5→10 friend API routes (co-op invite, rival hunt/convert) |
| 5.4→5.4 | Social | Expanded: 6→8 clan routes (+ role, disband), level/XP/emblem/roles |
| 5.5→5.5 | Social | Expanded: regional/global allies, challenge dispatch, block player, social channels |
| 5.7→5.7 | Social | Expanded: reports tab, HOF induction trigger, DB backup, mute |

Total: 49 → **57 commits**
