# Snakestar — Complete Rebuild Analysis

> Rebuilt from scratch based on deep study of Venom Arena (old project)
> Source of truth: rules modal + requirements checklist + game-config

## Project Scope

### Core Game
- Multiplayer snake battle (Slither.io-style) with server-authoritative physics
- 30 competitive arena tiers (10c → 1B buy-in) + 3 practice modes
- Client-side prediction + server reconciliation for lag-free play
- Smart bot AI with true personality differentiation
- Extraction mechanic (3s channel, steering cancels)
- Chip economy, star chips, XP, levels

### Lobby (13 stations, ALL real data)
1. Arena Selector — tier list, online/offline mode, live player counts
2. Cosmetics Shop — presets, premium items, genetic pattern lab
3. Player Profile — stats, identity, match history, security
4. Leaderboards — summit/global/national/tiers (REAL data from DB)
5. Daily Rewards — streak system, 7-day cycle
6. Chip Store — packs, promo codes, video rewards
7. Social Panel — friends, rivals, global search
8. Clan System — create/join, chat, treasury
9. Hall of Fame — milestone tiers, tournament archives
10. Championships — tournament system with contender standings
11. Season Pass — 20-tier reward track with elite pass
12. Clip Showcase — share and browse game clips
13. Admin Panel — config tuning, player management

### In-Game (17 HUD elements)
- Status cards (chips, stars, rank, score, kills, boost, competitors)
- Banked chips + FPS/ping
- Arena leaderboard (top 10)
- Kill feed (max 8, auto-expire)
- Extraction progress popup
- Mobile controls (boost 64px, extract 80px)
- Quick chat emotes (5 buttons + keys 1-5)
- Leave button
- Minimap (96px radar)
- Full-map overlay (M key)
- Connecting/reconnecting overlays
- Death vignette (3s red)
- End screen (death + extract variants)
- Death replay (15s pre + 15s post)
- Chat dialog
- Touch joystick (mobile)

## 38 Issues Fixed in Rebuild

### Critical Security (6)
1. Admin config endpoints now auth-gated
2. Security PIN hashed with bcrypt
3. Chip pack purchases server-validated
4. Promo redemption persisted to DB
5. Video reward cooldown persisted to DB
6. Rate limiting on all public endpoints

### Performance (4)
7. Client-side prediction eliminates input lag
8. Entity interpolation smooths other snakes
9. Delta compression reduces bandwidth
10. Single shared snapshot per room (not per-player)

### Gameplay (8)
11. Boost drop rate corrected (~3/sec)
12. Food collection sound triggers on server event
13. Boost activation sound wired
14. Wall hit sound wired
15. Star chip sound wired
16. Stars collected tracked and sent by server
17. RewardedAdModal properly wired
18. Mute/unmute button in HUD

### Data Reality (10)
19. Leaderboards use real DB data
20. Hall of Fame uses real milestone data
21. Championships have real server state
22. Season Pass claims persisted to DB
23. Clip Showcase persisted to DB
24. Friends are fully server-backed
25. Match history recorded from real games
26. Player inspector shows real data
27. Clan chat is real-time via socket
28. Rival system persisted to DB

### Architecture (8)
29. Page shell is thin (<100 lines)
30. Game canvas split into focused modules
31. Cosmetics shop split into sub-components
32. Player profile split into tab components
33. Single clan system (no duplication)
34. Offline engine renders via React (not raw DOM)
35. Tailwind classes are static (no dynamic construction)
36. 5 bot personalities with truly different behavior

## Tech Stack
- Next.js 16 + TypeScript 5 (strict)
- Tailwind CSS 4 + shadcn/ui
- Prisma ORM + SQLite
- Socket.IO game server (Bun mini-service)
- Zustand (client state) + TanStack Query (server state)
- Framer Motion (animations)
- JWT auth + bcrypt
- Web Audio API (procedural sounds)
