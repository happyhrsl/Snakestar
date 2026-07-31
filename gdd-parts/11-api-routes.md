# 11 — API Routes Catalog

Exhaustive catalog of every API route in the old Venom Arena project (`src/app/api/`).
Source: Next.js App Router route files.

---

## 1. AUTH Routes

### 1.1 POST /api/auth/register

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `email` | string | Required. Trimmed, lowercased. Must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. |
| `password` | string | Required. Minimum 6 characters. |
| `name` | string | Required. Trimmed, sliced to max 20 characters. |
| `pin` | string | Optional. If provided, must match `/^\d{4}$/` (exactly 4 digits). |

**Response (200):**
```json
{ "player": { /* toProfile(player) */ } }
```

**Error Messages (exact text):**
- `400` — "Valid email is required."
- `400` — "Password must be at least 6 characters."
- `400` — "Display name is required."
- `400` — "Security PIN must be exactly 4 digits."
- `409` — "Email already registered. Try logging in."
- `500` — "Registration failed. Please try again."

**Business Logic:**
- Hashes password via `hashPassword()`.
- Generates unique userTag via `generateUniqueUserTag()`.
- New player starts with:
  - `country`: `'US'`
  - `unlockedSkins`: `encodeSkins(DEFAULT_UNLOCKED_SKINS)`
  - `bankedChips`: `150`
  - `totalEarned`: `150`
- Signs session JWT with `{ playerId, userTag, role: 'player' }`.
- Sets session cookie.
- Also catches Prisma `P2002` unique-constraint error, returns 409.

**Database Operations:**
- `db.player.findUnique({ where: { email } })` — check duplicate
- `db.player.create({ data: { email, passwordHash, securityPin, userTag, name, country, unlockedSkins, bankedChips, totalEarned } })`

---

### 1.2 POST /api/auth/login

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `email` | string | Required. Trimmed, lowercased. |
| `password` | string | Required. |
| `remember` | boolean | Optional. Controls session duration. |

**Response (200):**
```json
{ "player": { /* toProfile(player) */ } }
```

**Error Messages (exact text):**
- `400` — "Email and password are required."
- `401` — "Invalid email or password."
- `403` — "This account has been banned."
- `500` — "Login failed. Please try again."

**Business Logic:**
- Constants: `SESSION_REMEMBER_DAYS = 30`, `SESSION_DEFAULT_DAYS = 7`.
- If `remember` is true, session cookie maxAge = `30 * 24 * 60 * 60` seconds (30 days).
- If `remember` is false, session cookie maxAge = `7 * 24 * 60 * 60` seconds (7 days).
- Signs session with `{ playerId, userTag, role }` where role is `'player' | 'admin'`.
- Updates `lastSeenAt` to `new Date()` on successful login.
- Returns 401 if player not found OR has no `passwordHash` (guest/OAuth accounts).

**Database Operations:**
- `db.player.findUnique({ where: { email } })`
- `db.player.update({ where: { id }, data: { lastSeenAt: new Date() } })`

---

### 1.3 POST /api/auth/guest

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `name` | string | Optional. Defaults to `'Guest'`. Trimmed, sliced to max 20 characters. |

**Response (200):**
```json
{ "player": { /* toProfile(player) */ } }
```

**Error Messages (exact text):**
- `500` — "Guest login failed."

**Business Logic:**
- Creates a player with `email: null`, `passwordHash: null`.
- New guest starts with:
  - `country`: `'US'`
  - `unlockedSkins`: `encodeSkins(DEFAULT_UNLOCKED_SKINS)`
  - `bankedChips`: `150`
  - `totalEarned`: `150`
- Signs session with `{ playerId, userTag, role: 'player' }`.

**Database Operations:**
- `db.player.create({ data: { email: null, passwordHash: null, userTag, name, country, unlockedSkins, bankedChips, totalEarned } })`

---

### 1.4 POST /api/auth/logout

**Request Body:** None.

**Response (200):**
```json
{ "ok": true }
```

**Business Logic:**
- Calls `clearSessionCookie()` — clears the httpOnly session cookie.

---

### 1.5 GET /api/auth/me

**Request Body:** None.

**Response (200):**
```json
{ "player": { /* toProfile(player) */ } }
```
**Response (200, no session):**
```json
{ "player": null }
```

**Business Logic:**
- If no session, returns `{ player: null }`.
- If player is `null` or `player.banned` is true, returns `{ player: null }`.

**Database Operations:**
- `db.player.findUnique({ where: { id: session.playerId } })`

---

### 1.6 GET /api/auth/token

[CODE COMMENT] Returns a short-lived JWT for Socket.IO auth. The httpOnly session cookie cannot be read by client-side JS, so the canvas fetches this endpoint to obtain a fresh token to pass in `socket.auth = { token }`. The token is re-signed from the current session (not the same as the cookie token — it is freshly minted on each call so we never expose the cookie value itself).

**Request Body:** None.

**Response (200):**
```json
{ "token": "<jwt-string>" }
```
**Response (401):**
```json
{ "token": null }
```
**Response (500):**
```json
{ "token": null, "error": "sign_failed" }
```

**Business Logic:**
- Requires session. If no session, returns 401.
- Signs a fresh JWT with `{ playerId, userTag, role }` from current session.

---

### 1.7 POST /api/auth/change-password

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `currentPassword` | string | Required. |
| `newPassword` | string | Required. Minimum 6 characters. |

**Response (200):**
```json
{ "ok": true }
```

**Error Messages (exact text):**
- `401` — "Not authenticated."
- `400` — "Current and new password are required."
- `400` — "New password must be at least 6 characters."
- `400` — "This account has no password set."
- `401` — "Current password is incorrect."
- `500` — "Failed to change password."

**Business Logic:**
- Verifies current password via `verifyPassword()`.
- Guest/OAuth accounts (no `passwordHash`) cannot change password.

**Database Operations:**
- `db.player.findUnique({ where: { id: session.playerId } })`
- `db.player.update({ where: { id }, data: { passwordHash: newHash } })`

---

### 1.8 POST /api/auth/change-pin

[CODE COMMENT] Changes the player's 4-digit Security PIN. Requires current session + either existing PIN verification or first-time set. Body: { currentPin?: string, newPin: string }. If player already has a PIN, currentPin is required. If player has no PIN, currentPin is not needed (first time setup).

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `currentPin` | string | Required only if player already has a PIN set. Must match `/^\d{4}$/`. |
| `newPin` | string | Required. Must match `/^\d{4}$/` (exactly 4 digits). |

**Response (200):**
```json
{ "ok": true, "message": "Security PIN updated successfully." }
```
**Response (200, first-time set):**
```json
{ "ok": true, "message": "Security PIN set successfully." }
```

**Error Messages (exact text):**
- `401` — "Not authenticated."
- `400` — "New Security PIN must be exactly 4 digits."
- `404` — "Account not found."
- `403` — "Guest accounts cannot set a Security PIN."
- `400` — "Current Security PIN (4 digits) is required."
- `401` — "Current Security PIN is incorrect."
- `500` — "Failed to change PIN."

**Business Logic:**
- Guest accounts (no email) cannot set a PIN — PIN is for password recovery.
- PIN is stored in plaintext (compared with `!==`).
- Message differs between update and first-time set.

**Database Operations:**
- `db.player.findUnique({ where: { id: session.playerId } })`
- `db.player.update({ where: { id }, data: { securityPin: newPin } })`

---

### 1.9 POST /api/auth/forgot-password

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `email` | string | Required. Trimmed, lowercased. Must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. |
| `securityPin` | string | Required. Must match `/^\d{4}$/` (exactly 4 digits). |
| `newPassword` | string | Required. Minimum 6 characters. |

**Response (200):**
```json
{ "ok": true, "message": "Password has been reset. You can now log in." }
```

**Error Messages (exact text):**
- `400` — "A valid email address is required."
- `400` — "A valid 4-digit Security PIN is required."
- `400` — "New password must be at least 6 characters."
- `404` — "No account found with that email."
- `400` — "This is a guest account. Guest accounts have no password to reset."
- `400` — "This account has no Security PIN set. PIN is required for password recovery. Please create a new account or contact an admin."
- `401` — "Incorrect Security PIN. Please try again."
- `500` — "Failed to reset password."

**Business Logic:**
- No session required (unauthenticated endpoint).
- Does NOT require being logged in.
- PIN is compared in plaintext.

**Database Operations:**
- `db.player.findUnique({ where: { email } })`
- `db.player.update({ where: { id }, data: { passwordHash: newHash } })`

---

### 1.10 GET /api/auth/social-login

[CODE COMMENT] Redirects the user to the OAuth provider's authorization page. After authentication, the provider redirects back to /api/auth/social-callback.

**Query Parameters:**
| Param | Type | Validation |
|-------|------|------------|
| `provider` | string | Required. Must be in `OAUTH_PROVIDERS` array. Lowercased. |

**Response (302 redirect):** Redirects to OAuth provider's authorization URL.

**Error Responses:**
- `400` — `{ "error": "Unsupported or missing provider. Supported: <provider1>, <provider2>, ..." }`
- `200` — `{ "error": "<Provider> login is not configured.", "notConfigured": true, "provider": "<p>", "setupGuide": <guide> }`
- `500` — `{ "error": "Failed to generate authorization URL." }`

**Business Logic:**
- Checks if provider is configured via `isProviderConfigured(p)`.
- Generates a random state for CSRF protection via `crypto.randomUUID()`.
- Sets a short-lived cookie `oauth_state_{provider}` with `maxAge: 600` (10 minutes), `httpOnly: true`, `secure` in production, `sameSite: 'lax'`.

---

### 1.11 GET /api/auth/social-callback

[CODE COMMENT] Handles the OAuth callback from Google and Facebook (query-string based). Also handles Apple OAuth callback via POST (form_post mode).

**GET Query Parameters:**
| Param | Type | Validation |
|-------|------|------------|
| `provider` | string | Optional. Defaults to `'google'`. Lowercased. Must be in `OAUTH_PROVIDERS`. |
| `code` | string | Required. OAuth authorization code. |
| `state` | string | CSRF state to verify. |

**POST Body (Apple only, form-data):**
| Field | Type | Validation |
|-------|------|------------|
| `code` | string | Required. OAuth authorization code. |
| `state` | string | CSRF state to verify. |
| `name` | string | Optional. Apple name (only on first authorization). |

**All responses are 302 redirects:**
- `/?oauth=success` — Existing OAuth account logged in.
- `/?oauth=linked` — Existing email account linked to OAuth provider.
- `/?oauth=registered` — New account created via OAuth.
- `/?oauth_error=no_code` — Missing code.
- `/?oauth_error=invalid_provider` — Invalid provider.
- `/?oauth_error=csrf_mismatch` — CSRF state mismatch.
- `/?oauth_error=token_exchange_failed` — Token exchange failed.
- `/?oauth_error=no_user_info` — Could not get user info.
- `/?oauth_error=account_banned` — Account is banned.
- `/?oauth_error=account_error` — Account creation/linking error.

**Business Logic (handleOAuthLogin helper):**
1. Check if account with this OAuth provider+ID already exists → log in.
2. If email exists (no OAuth linked) → link/merge: update existing account with `oauthProvider` and `oauthProviderId`.
3. Otherwise → create brand new account:
   - `email`: userInfo.email
   - `passwordHash`: null (OAuth accounts have no password)
   - `name`: `userInfo.name || userInfo.email?.split('@')[0] || 'Player'`, sliced to max 20 chars
   - `country`: `'US'`
   - `bankedChips`: `150`
   - `totalEarned`: `150`
   - `unlockedSkins`: `encodeSkins(DEFAULT_UNLOCKED_SKINS)`
   - `oauthProvider`: provider
   - `oauthProviderId`: userInfo.providerId
   - If existing OAuth account has no avatar and userInfo provides one, updates avatar.

**Database Operations:**
- `db.player.findFirst({ where: { oauthProvider, oauthProviderId } })`
- `db.player.findUnique({ where: { email } })`
- `db.player.update({ where: { id }, data: { oauthProvider, oauthProviderId, avatar } })`
- `db.player.create({ data: { email, passwordHash: null, userTag, name, country, avatar, unlockedSkins, bankedChips, totalEarned, oauthProvider, oauthProviderId } })`

---

### 1.12 POST /api/auth/upgrade

[CODE COMMENT] Upgrades a guest account to a registered account. Preserves ALL existing progress (chips, stats, cosmetics, friends, etc.). Rules & Guide Section 0: "Guest accounts can upgrade to registered later (in Profile panel). All progress carries over when upgrading."

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `email` | string | Required. Trimmed, lowercased. Must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. |
| `password` | string | Required. Minimum 6 characters. |
| `name` | string | Required. Trimmed, sliced to max 20 characters. |
| `pin` | string | Optional. If provided, must match `/^\d{4}$/`. |

**Response (200):**
```json
{ "player": { /* toProfile(player) */ } }
```

**Error Messages (exact text):**
- `401` — "Not authenticated."
- `400` — "Valid email is required."
- `400` — "Password must be at least 6 characters."
- `400` — "Display name is required."
- `400` — "Security PIN must be exactly 4 digits."
- `404` — "Account not found."
- `400` — "This account is already registered."
- `409` — "Email already registered. Try a different email."
- `500` — "Upgrade failed. Please try again."

**Business Logic:**
- Requires session.
- Only guests can upgrade (identified by `null` email).
- Updates only `email`, `passwordHash`, `name`, `securityPin` — all other fields preserved.
- Issues a fresh session token after upgrade.
- Also catches Prisma `P2002` unique-constraint error.

**Database Operations:**
- `db.player.findUnique({ where: { id: session.playerId } })`
- `db.player.findUnique({ where: { email } })`
- `db.player.update({ where: { id }, data: { email, passwordHash, name, securityPin } })`

---

## 2. PLAYER Routes

### 2.1 GET /api/player

**Request Body:** None.

**Response (200):**
```json
{ "player": { /* toProfile(player) */ } }
```
**Error Messages:**
- `401` — "Unauthorized"
- `404` — "Not found"

---

### 2.2 PUT /api/player

[CODE COMMENT] Whitelisted fields the player can edit directly. Cosmetics equip / name / country / avatar only. Economy is server-only.

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `name` | string | Optional. Trimmed, sliced to max 20 chars. Must be >= 2 characters after trim. |
| `country` | string | Optional. Must match a code in `COUNTRIES` config. |
| `avatar` | string | Optional. Max length 8 characters. |
| `currentSkin` | string | Optional. Must be in player's `unlockedSkins` list. |
| `currentTrail` | string | Optional. Must be in player's `unlockedSkins` list. |
| `currentDeath` | string | Optional. Must be in player's `unlockedSkins` list. |
| `currentFlag` | string | Optional. Must be in `unlockedSkins` or empty string (`''`). Empty string sets to `null`. |
| `currentBanner` | string | Optional. Must be in `unlockedSkins` or empty string (`''`). Empty string sets to `null`. |

**Response (200):**
```json
{ "player": { /* toProfile(updated) */ } }
```
**Response (200, no valid fields):** Returns current player profile unchanged.

**Business Logic:**
- Only the whitelisted fields listed above can be updated.
- Economy fields (bankedChips, totalEarned, etc.) cannot be modified.
- Cosmetic equip requires the skin to be in the player's `unlockedSkins` JSON array.
- `lastSeenAt` is updated to `new Date()` on any update.

**Database Operations:**
- `db.player.findUnique({ where: { id: session.playerId } })`
- `db.player.update({ where: { id }, data: { ...whitelistedFields, lastSeenAt: new Date() } })`

**Exported helper:**
- `unlockSkin(playerId, skinId)` — Adds `skinId` to the player's `unlockedSkins` JSON array if not already present. Returns updated player or null.

---

### 2.3 GET /api/player/challenges

**Request Body:** None.

**Response (200):**
```json
{
  "challenges": [
    {
      "id": "<uuid>",
      "playerId": "<uuid>",
      "type": "daily" | "weekly",
      "category": "kill" | "extract" | "extract_streak" | "star_collect" | "score" | "arena_entry" | "survive",
      "title": "<string>",
      "description": "<string>",
      "target": <number>,
      "reward": <number>,
      "current": <number>,
      "completed": <boolean>,
      "claimed": <boolean>,
      "periodStart": "<YYYY-MM-DD>",
      "createdAt": "<ISO date>"
    }
  ],
  "streak": <number>,
  "streakMultiplier": <number>,
  "tier": "novice" | "operative" | "veteran" | "elite"
}
```
**Error Messages:**
- `401` — "Unauthorized"
- `404` — "Player not found."

**Business Logic:**
- **Level Tiers:**
  - `novice`: level ≤ 5
  - `operative`: level ≤ 15
  - `veteran`: level ≤ 30
  - `elite`: level > 30

- **Level-Based Reward Multiplier:**
  - Level ≤ 5: `1.0`
  - Level ≤ 15: `1.5`
  - Level ≤ 30: `2.5`
  - Level > 30: `4.0`

- **Daily Challenges:** Auto-generated if none exist for today (`utcToday()`). Picks 3 challenges from the tier's pool using `pickDiverse()` (ensures no duplicate categories). Excludes yesterday's daily challenge titles (anti-repeat). Falls back to full pool if pool too small after exclusions. Rewards are multiplied by level reward multiplier: `Math.floor(template.reward * rewardMult)`.

- **Weekly Challenges:** Auto-generated if none exist for this week (`utcMonday()`). Picks 2 challenges. Same anti-repeat logic excludes last week's weekly titles.

- **Streak Calculation (`calculateStreak`):**
  - Counts consecutive days where ALL daily challenges were claimed.
  - Looks back up to 30 days.
  - If today has challenges but not all claimed, does not break streak (just doesn't count today).
  - Streak Multiplier:
    - streak ≥ 14: `3.0`
    - streak ≥ 7: `2.0`
    - streak ≥ 3: `1.5`
    - otherwise: `1.0`

- **Challenge Categories:** `kill`, `extract`, `extract_streak`, `star_collect`, `score`, `arena_entry`, `survive`

- **Challenge Pool (Daily, Novice tier — 16 templates):**
  | Title | Category | Target | Base Reward |
  |-------|----------|--------|-------------|
  | Novice Hunter | kill | 2 | 15 |
  | First Blood | kill | 3 | 20 |
  | Young Fang | kill | 5 | 30 |
  | Safe Exit | extract | 30 | 20 |
  | Pocket Cash | extract | 50 | 25 |
  | Clean Getaway | extract | 75 | 35 |
  | Star Spark | star_collect | 3 | 20 |
  | Star Gazer | star_collect | 5 | 30 |
  | Star Dust | star_collect | 8 | 35 |
  | Tiny Rattler | score | 30 | 15 |
  | Growing Serpent | score | 50 | 25 |
  | Medium Coil | score | 75 | 35 |
  | Arena Explorer | arena_entry | 1 | 20 |
  | Warm Up | arena_entry | 2 | 30 |
  | Snake Survival | survive | 60 | 25 |
  | Last Serpent | survive | 90 | 35 |

- **Challenge Pool (Daily, Operative tier — 18 templates):**
  | Title | Category | Target | Base Reward |
  |-------|----------|--------|-------------|
  | Snake Slayer | kill | 5 | 35 |
  | Venom Strike | kill | 8 | 45 |
  | Double Digit | kill | 10 | 55 |
  | Aggressive Hunter | kill | 12 | 65 |
  | Quick Cash Out | extract | 100 | 40 |
  | High Roller Exit | extract | 200 | 55 |
  | Solid Extraction | extract | 300 | 70 |
  | Star Collector | star_collect | 10 | 40 |
  | Star Hunter | star_collect | 15 | 50 |
  | Star Feast | star_collect | 20 | 60 |
  | Long Snake | score | 100 | 40 |
  | Impressive Coil | score | 150 | 55 |
  | Arena Regular | arena_entry | 2 | 35 |
  | Arena Addict | arena_entry | 3 | 45 |
  | Iron Scales | survive | 90 | 45 |
  | Endurance Run | survive | 120 | 60 |
  | Clean Escape | extract_streak | 2 | 60 |
  | Hat Trick | extract_streak | 3 | 80 |

- **Challenge Pool (Daily, Veteran tier — 17 templates):**
  | Title | Category | Target | Base Reward |
  |-------|----------|--------|-------------|
  | Apex Predator | kill | 12 | 70 |
  | Arena Butcher | kill | 15 | 85 |
  | Venom Reaper | kill | 20 | 100 |
  | Death Incarnate | kill | 25 | 120 |
  | Mega Extraction | extract | 500 | 90 |
  | Grand Withdrawal | extract | 750 | 120 |
  | Fortune Escape | extract | 1000 | 150 |
  | Star Hoarder | star_collect | 25 | 70 |
  | Star Monopoly | star_collect | 35 | 90 |
  | Titan Length | score | 200 | 75 |
  | Behemoth Coil | score | 300 | 100 |
  | Arena Grinder | arena_entry | 4 | 50 |
  | Arena Machine | arena_entry | 5 | 60 |
  | Titan's Endurance | survive | 150 | 80 |
  | Unbreakable Coil | survive | 200 | 110 |
  | Veteran Escape | extract_streak | 3 | 100 |
  | Untouchable | extract_streak | 4 | 140 |

- **Challenge Pool (Daily, Elite tier — 17 templates):**
  | Title | Category | Target | Base Reward |
  |-------|----------|--------|-------------|
  | Massacre Protocol | kill | 20 | 100 |
  | Genocide Mode | kill | 30 | 150 |
  | Extinction Event | kill | 40 | 200 |
  | God of Venom | kill | 50 | 250 |
  | Elite Withdrawal | extract | 2000 | 150 |
  | Phantom Bank | extract | 5000 | 250 |
  | Legendary Haul | extract | 10000 | 400 |
  | Star Conqueror | star_collect | 40 | 110 |
  | Star Emperor | star_collect | 60 | 150 |
  | World Serpent | score | 400 | 140 |
  | Mythical Coil | score | 500 | 200 |
  | Arena Warlord | arena_entry | 6 | 70 |
  | Arena Zealot | arena_entry | 8 | 100 |
  | Immortal Coil | survive | 240 | 150 |
  | Timeless Venom | survive | 300 | 200 |
  | Elite Phantom | extract_streak | 5 | 200 |
  | Untouchable Legend | extract_streak | 6 | 300 |

- **Weekly Challenge Pools (all 4 tiers, 10 templates each):**
  - Novice weekly targets: 8-12 kills, 150-250 extract, 20-30 star_collect, 100 score, 4 arena_entry, 120 survive, 3 extract_streak. Rewards: 55-100.
  - Operative weekly targets: 20-30 kills, 500-750 extract, 50-75 star_collect, 200 score, 6 arena_entry, 180 survive, 5 extract_streak. Rewards: 100-180.
  - Veteran weekly targets: 40-60 kills, 1500-3000 extract, 100-150 star_collect, 350 score, 10 arena_entry, 300 survive, 8 extract_streak. Rewards: 180-350.
  - Elite weekly targets: 80-120 kills, 5000-10000 extract, 200-300 star_collect, 600 score, 15 arena_entry, 600 survive, 12 extract_streak. Rewards: 300-600.

**Database Operations:**
- `db.player.findUnique({ where: { id: playerId } })`
- `db.challenge.findMany({ where: { playerId, type: 'daily', periodStart: yesterday }, select: { title: true } })`
- `db.challenge.findMany({ where: { playerId, type: 'weekly', periodStart: lastMonday }, select: { title: true } })`
- `db.challenge.findMany({ where: { playerId, type: 'daily', periodStart: today } })`
- `db.challenge.findMany({ where: { playerId, type: 'weekly', periodStart: monday } })`
- `db.challenge.createMany({ data: [...] })` — for daily and weekly generation
- `db.challenge.findMany({ where: { playerId, OR: [...] }, orderBy: [...] })` — fetch active challenges
- `db.challenge.findMany({ where: { playerId, type: 'daily', periodStart: { gte: thirtyDaysAgo } }, select: { periodStart, claimed } })` — for streak calc

---

### 2.4 POST /api/player/challenges (Claim)

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `challengeId` | string | Required. Trimmed. |

**Response (200):**
```json
{
  "success": true,
  "reward": <totalReward>,
  "baseReward": <baseReward>,
  "bonusReward": <bonusReward>,
  "streakMultiplier": <multiplier>
}
```

**Error Messages (exact text):**
- `401` — "Unauthorized"
- `400` — "Missing challengeId."
- `404` — "Challenge not found."
- `400` — "Challenge not yet completed."
- `400` — "Already claimed."

**Business Logic:**
- Verifies challenge ownership (`challenge.playerId !== playerId`).
- Calculates streak bonus: `bonusReward = Math.floor(baseReward * (multiplier - 1))`, `totalReward = baseReward + bonusReward`.
- Credits `totalReward` chips to `bankedChips` and `totalEarned`.
- Atomic transaction: update player chips + mark challenge claimed.

**Database Operations:**
- `db.challenge.findUnique({ where: { id: challengeId } })`
- `db.player.update({ where: { id: playerId }, data: { bankedChips: { increment: totalReward }, totalEarned: { increment: totalReward } } })`
- `db.challenge.update({ where: { id: challengeId }, data: { claimed: true } })`

---

### 2.5 POST /api/player/challenges/progress

[CODE COMMENT] Called by the game canvas during gameplay to track real-time challenge progress. Uses session auth (user JWT).

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `category` | string | Required. Trimmed. Must be one of: `kill`, `extract`, `extract_streak`, `star_collect`, `score`, `arena_entry`, `survive`. |
| `amount` | number | Optional. Defaults to 1. Clamped by category max: |

**Max Amount Per Category:**
| Category | Max per request |
|----------|----------------|
| kill | 10 |
| extract | 1 |
| extract_streak | 1 |
| star_collect | 10 |
| score | 1000 |
| arena_entry | 1 |
| survive | 1 |

**Response (200):**
```json
{ "updated": <number>, "completed": <number>, "category": "<string>" }
```
**Response (200, no challenges):**
```json
{ "updated": 0, "message": "No active challenges for this category." }
```
**Error Messages:**
- `401` — "Unauthorized"
- `400` — `"Invalid category. Must be one of: kill, extract, extract_streak, star_collect, score, arena_entry, survive"`

**Business Logic:**
- Finds all active (incomplete) challenges for the player matching the category, for today's dailies and this week's weeklies.
- Increments `current` by `amount`. If `newCurrent >= target`, sets `completed: true`.
- All updates run in a single Prisma transaction.

---

### 2.6 POST /api/player/cosmetic

[CODE COMMENT] body: { action: 'buy' | 'equip', skinId: string }

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `action` | string | Required. Must be `'buy'` or `'equip'`. |
| `skinId` | string | Required. Must exist in game config via `getCosmeticById()`. |

**Response (200, buy):**
```json
{ "player": { /* toProfile(updated) */ } }
```
**Response (200, equip):**
```json
{ "player": { /* toProfile(updated) */ } }
```

**Error Messages (buy action):**
- `401` — "Unauthorized"
- `404` — "Cosmetic not found."
- `404` — "Player not found."
- `400` — "Already owned."
- `400` — "Not enough chips."
- `500` — "Purchase failed."

**Error Messages (equip action):**
- `401` — "Unauthorized"
- `404` — "Cosmetic not found."
- `404` — "Player not found."
- `403` — "You do not own this item."

**Error Messages (unknown action):**
- `400` — "Unknown action."

**Business Logic (buy):**
- Atomic transaction: deduct `cosmetic.cost` from `bankedChips`, increment `totalLost` by `cosmetic.cost`, add skinId to `unlockedSkins`, auto-equip the purchased item based on `cosmetic.type` (`skin`, `trail`, `death`, `flag`, `banner`).
- Records a `purchase` with `itemId: skinId`, `itemType: 'skin'`, `amountChips: -cosmetic.cost`.

**Business Logic (equip):**
- Verifies skin is in `unlockedSkins`.
- Sets the corresponding `current*` field based on `cosmetic.type`.

**Database Operations (buy):**
- `tx.player.findUnique({ where: { id } })`
- `tx.player.update({ where: { id }, data: { bankedChips: { decrement: cost }, totalLost: { increment: cost }, unlockedSkins: ..., currentSkin/Trail/Death/Flag/Banner: ... } })`
- `tx.purchase.create({ data: { playerId, itemId, itemType: 'skin', amountChips: -cost } })`

---

### 2.7 POST /api/player/daily

[CODE COMMENT] Claim today's daily reward (idempotent per day)

**Request Body:** None.

**Response (200):**
```json
{ "player": { /* toProfile(player) */ }, "reward": <number>, "streak": <number> }
```

**Error Messages:**
- `401` — "Unauthorized"
- `404` — "Player not found."
- `400` — "Already claimed today. Come back tomorrow!"
- `500` — "Claim failed."

**Business Logic:**
- Transaction-based idempotency: re-checks `lastDailyClaim === today` inside the transaction to prevent double-claim.
- **Daily Streak Logic:**
  - If `lastDailyClaim` is yesterday → `newStreak = player.dailyStreak + 1`
  - Otherwise → `newStreak = 0` (missed a day resets)
  - Cycle is 7 days: `cycleDay = newStreak % 7`
  - Reward amount comes from `DAILY_REWARDS[cycleDay]` (config array).
- Credits reward to `bankedChips` and `totalEarned`.
- Creates a `dailyClaim` record with `day`, `reward`, `streak`.

**Database Operations:**
- `tx.player.findUnique({ where: { id } })`
- `tx.player.update({ where: { id }, data: { bankedChips: { increment: reward }, totalEarned: { increment: reward }, dailyStreak: newStreak, lastDailyClaim: today } })`
- `tx.dailyClaim.create({ data: { playerId, day: today, reward, streak: newStreak } })`

---

### 2.8 POST /api/player/promo-reward

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `code` | string | Required. Trimmed, uppercased. |

**Response (200):**
```json
{ "success": true, "reward": <number>, "newBankedChips": <number> }
```

**Error Messages:**
- `401` — "Authentication required."
- `400` — "Promo code is required."
- `400` — `"Invalid or expired promo code. Try \"VENOM\" or \"CHAMPION\"."`
- `400` — "You already redeemed this promo code."

**Business Logic:**
- Looks up reward amount from `PROMO_CODES` config (a `Record<string, number>`).
- In-memory double-claim tracking: `Map<string, Set<string>>` keyed by playerId.
- Credits reward to `bankedChips` and `totalEarned`.
- **NOTE:** In-memory tracking resets on server restart (no DB persistence for redemption records).

**Database Operations:**
- `db.player.update({ where: { id }, data: { bankedChips: { increment: reward }, totalEarned: { increment: reward } }, select: { bankedChips: true } })`

---

### 2.9 POST /api/player/video-reward

**Request Body:** None.

**Response (200):**
```json
{ "success": true, "reward": 50, "newBankedChips": <number> }
```
**Response (429):**
```json
{ "error": "Cooldown active. Try again in <N> seconds." }
```

**Constants:**
- `VIDEO_REWARD_COOLDOWN_MS = 60_000` (60 seconds)
- `VIDEO_REWARD_AMOUNT = 50`

**Error Messages:**
- `401` — "Authentication required."
- `429` — "Cooldown active. Try again in ${remainingSeconds} seconds."

**Business Logic:**
- In-memory cooldown tracking per player (`Map<string, number>`).
- Awards 50 chips per call.
- Cleans up stale entries when map exceeds 10,000 entries (removes entries older than `2 * VIDEO_REWARD_COOLDOWN_MS`).
- **NOTE:** In-memory tracking resets on server restart.

**Database Operations:**
- `db.player.update({ where: { id }, data: { bankedChips: { increment: 50 }, totalEarned: { increment: 50 } }, select: { bankedChips: true } })`

---

## 3. CHIPS Routes

### 3.1 POST /api/chips/pack

[CODE COMMENT] "buy" a chip pack (simulated payment, credits chips)

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `packId` | string | Required. Must match an entry in `CHIP_PACKS` config. |

**Response (200):**
```json
{ "player": { /* toProfile(player) */ }, "granted": <totalChips> }
```

**Error Messages:**
- `401` — "Unauthorized"
- `400` — "Invalid pack."
- `404` — "Player not found."

**Business Logic:**
- `totalChips = pack.chips + pack.bonus`.
- Credits `totalChips` to `bankedChips` and `totalEarned`.
- Creates a `purchase` record with `itemId: pack.id`, `itemType: 'chip_pack'`, `amountChips: totalChips`.
- [CODE COMMENT] Simulated payment — no real money transaction.

**Database Operations:**
- `db.player.findUnique({ where: { id } })`
- `db.player.update({ where: { id }, data: { bankedChips: { increment: totalChips }, totalEarned: { increment: totalChips } })`
- `db.purchase.create({ data: { playerId, itemId: pack.id, itemType: 'chip_pack', amountChips: totalChips } })`

---

## 4. FRIENDS Routes

### 4.1 GET /api/friends/list

[CODE COMMENT] Returns accepted friends + pending requests received

**Request Body:** None.

**Response (200):**
```json
{
  "friends": [
    {
      "id": "<uuid>",
      "userTag": "<string>",
      "name": "<string>",
      "country": "<string>",
      "level": <number>,
      "bankedChips": <number>,
      "status": "accepted",
      "online": <boolean>
    }
  ],
  "pendingReceived": [
    {
      "id": "<uuid>",
      "userTag": "<string>",
      "name": "<string>",
      "country": "<string>",
      "level": <number>,
      "bankedChips": <number>,
      "status": "pending_received",
      "online": <boolean>
    }
  ],
  "pendingSent": [
    {
      "id": "<uuid>",
      "userTag": "<string>",
      "name": "<string>",
      "country": "<string>",
      "level": <number>,
      "bankedChips": <number>,
      "status": "pending_sent",
      "online": <boolean>
    }
  ]
}
```

**Error Messages:**
- `401` — "Unauthorized"
- `404` — "Not found"

**Business Logic:**
- Online detection: `Date.now() - new Date(p.lastSeenAt).getTime() < 60_000` (60 seconds).
- `friendsFrom` = friendships where player is initiator; `friendsTo` = where player is recipient.

**Database Operations:**
- `db.player.findUnique({ where: { id }, include: { friendsFrom: { include: { recipient: true } }, friendsTo: { include: { initiator: true } } } })`

---

### 4.2 POST /api/friends/request

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `userTag` | string | Required. Uppercased, trimmed. |

**Response (200):**
```json
{ "ok": true }
```

**Error Messages:**
- `401` — "Unauthorized"
- `400` — "userTag required"
- `400` — "Cannot friend yourself."
- `404` — "Player not found."
- `400` — "Already friends."
- `403` — "Cannot send request."
- `400` — "Request already pending."

**Business Logic:**
- Checks for existing friendship in both directions (initiator→recipient OR recipient→initiator).
- Friendship statuses: `pending`, `accepted`, `blocked`.

**Database Operations:**
- `db.player.findUnique({ where: { userTag: targetTag } })`
- `db.friendship.findFirst({ where: { OR: [{ initiatorId, recipientId }, { initiatorId: target, recipientId: me }] } })`
- `db.friendship.create({ data: { initiatorId, recipientId, status: 'pending' } })`

---

### 4.3 POST /api/friends/accept

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `userTag` | string | Required. Uppercased, trimmed. The initiator's tag. |

**Response (200):**
```json
{ "ok": true }
```

**Error Messages:**
- `401` — "Unauthorized"
- `404` — "Player not found."
- `404` — "No pending request from that player."

**Database Operations:**
- `db.player.findUnique({ where: { userTag: fromTag } })`
- `db.friendship.findFirst({ where: { initiatorId: from.id, recipientId: session.playerId, status: 'pending' } })`
- `db.friendship.update({ where: { id: f.id }, data: { status: 'accepted' } })`

---

### 4.4 POST /api/friends/remove

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `userTag` | string | Required. Uppercased, trimmed. |

**Response (200):**
```json
{ "ok": true }
```

**Error Messages:**
- `401` — "Unauthorized"
- `404` — "Player not found."

**Business Logic:**
- Deletes the friendship record in both directions (no error if none exists).

**Database Operations:**
- `db.player.findUnique({ where: { userTag: otherTag } })`
- `db.friendship.deleteMany({ where: { OR: [{ initiatorId: me, recipientId: other }, { initiatorId: other, recipientId: me }] } })`

---

### 4.5 POST /api/friends/gift

[CODE COMMENT] Sends chips to a friend. Atomic: deduct from sender, credit recipient, record gift.

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `userTag` | string | Required. Uppercased, trimmed. |
| `amount` | number | Clamped: `Math.max(1, Math.min(1000, Math.floor(Number(amount) || 0)))`. Max 1000 chips per gift. |

**Response (200):**
```json
{ "ok": true, "newBankedChips": <number> }
```

**Error Messages:**
- `401` — "Unauthorized"
- `400` — "Invalid request."
- `400` — "Cannot gift yourself."
- `400` — "Not enough chips."
- `400` — "You can only gift friends."
- `400` — "Sender missing."
- `400` — "Recipient not found."
- `400` — "Gift failed."

**Business Logic:**
- Requires accepted friendship in either direction.
- Amount range: 1 to 1000 chips per transaction.
- Atomic transaction: deduct from sender (`bankedChips` decrement, `totalLost` increment), credit to recipient (`bankedChips` increment, `totalEarned` increment), record `gift` (fromId, toId, amount).

**Database Operations:**
- `tx.player.findUnique({ where: { id: senderId } })`
- `tx.player.findUnique({ where: { userTag: toTag } })`
- `tx.friendship.findFirst({ where: { OR: [accepted friendship in both directions] } })`
- `tx.player.update({ where: { id: senderId }, data: { bankedChips: { decrement: amount }, totalLost: { increment: amount } } })`
- `tx.player.update({ where: { id: recipientId }, data: { bankedChips: { increment: amount }, totalEarned: { increment: amount } } })`
- `tx.gift.create({ data: { fromId, toId, amount } })`

---

## 5. CLANS Routes

### 5.1 GET /api/clans

**Request Body:** None. No auth required.

**Response (200):**
```json
{
  "clans": [
    {
      "tag": "<string>",
      "name": "<string>",
      "emblem": "<string>",
      "description": "<string>",
      "level": <number>,
      "bankedChips": <number>,
      "memberCount": <number>
    }
  ]
}
```

**Business Logic:**
- Returns top 50 clans ordered by `bankedChips` descending.
- Includes member count via Prisma `_count`.

**Database Operations:**
- `db.clan.findMany({ include: { _count: { select: { members: true } } }, orderBy: { bankedChips: 'desc' }, take: 50 })`

---

### 5.2 POST /api/clans/create

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `tag` | string | Uppercased, trimmed, sliced to max 5 chars. Must match `/^[A-Z0-9]{3,5}$/` (3-5 alphanumeric). |
| `name` | string | Trimmed, sliced to max 30 chars. Minimum 3 characters. |
| `emblem` | string | Sliced to max 4 chars. Defaults to `'🐍'`. |
| `description` | string | Sliced to max 200 chars. |

**Response (200):**
```json
{ "ok": true, "clanTag": "<tag>" }
```

**Error Messages:**
- `401` — "Unauthorized"
- `400` — "Tag must be 3-5 letters/numbers."
- `400` — "Name must be at least 3 characters."
- `404` — "Not found"
- `400` — "You are already in a clan."
- `409` — "Tag already taken."

**Business Logic:**
- Creates clan + sets player as `'Leader'` in a single transaction.
- Player must not already be in a clan (`me.clanTag` must be null).

**Database Operations:**
- `db.player.findUnique({ where: { id } })`
- `db.clan.findUnique({ where: { tag } })`
- `db.clan.create({ data: { tag, name, emblem, description } })`
- `db.player.update({ where: { id }, data: { clanTag: tag, clanRank: 'Leader' } })`

---

### 5.3 POST /api/clans/join

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `tag` | string | Uppercased, trimmed. |

**Response (200):**
```json
{ "ok": true }
```

**Error Messages:**
- `401` — "Unauthorized"
- `404` — "Clan not found."
- `400` — "Clan is full (max 30)."
- `404` — "Not found"
- `400` — "Leave your current clan first."
- `500` — "Failed to join clan."

**Business Logic:**
- Max clan members: 30.
- New members get rank `'Viper'`.
- Player must not already be in a clan.

**Database Operations:**
- `tx.clan.findUnique({ where: { tag }, include: { _count: { select: { members: true } } } })`
- `tx.player.findUnique({ where: { id } })`
- `tx.player.update({ where: { id }, data: { clanTag: tag, clanRank: 'Viper' } })`

---

### 5.4 POST /api/clans/leave

**Request Body:** None.

**Response (200):**
```json
{ "ok": true }
```

**Error Messages:**
- `401` — "Unauthorized"
- `400` — "Not in a clan."
- `500` — "Failed to leave clan."

**Business Logic:**
- Removes player from clan (sets `clanTag: null`, `clanRank: null`).
- If player was Leader:
  - Promotes oldest member (by `createdAt` ascending) to Leader.
- If no members remain: deletes the clan.

**Database Operations:**
- `tx.player.findUnique({ where: { id } })`
- `tx.player.update({ where: { id }, data: { clanTag: null, clanRank: null } })`
- `tx.player.count({ where: { clanTag } })`
- `tx.clan.delete({ where: { tag: clanTag } })` — if no remaining members
- `tx.player.findFirst({ where: { clanTag }, orderBy: { createdAt: 'asc' } })`
- `tx.player.update({ where: { id: oldest.id }, data: { clanRank: 'Leader' } })`

---

### 5.5 GET /api/clans/chat

**Query Parameters:**
| Param | Type | Validation |
|-------|------|------------|
| `tag` | string | Required. Uppercased. |

**Response (200):**
```json
{ "messages": [ /* ClanMessage[] */ ] }
```

**Error Messages:**
- `401` — "Unauthorized"
- `400` — "tag required"
- `403` — "Not a member."

**Business Logic:**
- Returns last 50 messages ordered by `createdAt` ascending.
- Membership check: player's `clanTag` must match the requested tag.

**Database Operations:**
- `db.player.findUnique({ where: { id } })`
- `db.clanMessage.findMany({ where: { clanTag: tag }, orderBy: { createdAt: 'asc' }, take: 50 })`

---

### 5.6 POST /api/clans/chat

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `tag` | string | Required. Uppercased. |
| `message` | string | Required. Trimmed, sliced to max 300 characters. |

**Response (200):**
```json
{ "ok": true, "message": { /* ClanMessage record */ } }
```

**Error Messages:**
- `401` — "Unauthorized"
- `400` — "Invalid message."
- `403` — "Not a member."

**Business Logic:**
- Records sender's `userTag`, `name`, and `clanRank` (defaults to `'Viper'`).

**Database Operations:**
- `db.player.findUnique({ where: { id } })`
- `db.clanMessage.create({ data: { clanTag, senderTag, senderName, rank, message } })`

---

### 5.7 POST /api/clans/deposit

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `tag` | string | Required. Uppercased, trimmed. |
| `amount` | number | Required. Must be > 0. Floor'd to integer. Max 1,000,000 per transaction. |

**Response (200):**
```json
{ "ok": true, "newTreasury": <number> }
```

**Error Messages:**
- `401` — "Unauthorized"
- `400` — "Invalid tag or amount."
- `400` — "Max deposit is 1,000,000 chips per transaction."
- `404` — "Not found."
- `403` — "You are not a member of this clan."
- `400` — "Insufficient chips."
- `404` — "Clan not found."
- `500` — "Deposit failed."

**Business Logic:**
- Atomic: deduct from player (`bankedChips` decrement, `totalLost` increment), add to clan treasury (`bankedChips` increment).
- Player must be a member of the target clan.

**Database Operations:**
- `tx.player.findUnique({ where: { id } })`
- `tx.clan.findUnique({ where: { tag } })`
- `tx.player.update({ where: { id }, data: { bankedChips: { decrement: amount }, totalLost: { increment: amount } } })`
- `tx.clan.update({ where: { tag }, data: { bankedChips: { increment: amount } })`

---

## 6. LEADERBOARD Routes

### 6.1 GET /api/leaderboard

**Query Parameters:**
| Param | Type | Validation | Default |
|-------|------|------------|---------|
| `type` | string | `'chips'` or `'level'`. | `'chips'` (anything other than `'level'` defaults to `'bankedChips'`) |
| `limit` | number | Min 1, max 100. | `100` |
| `view` | string | `'global'`, `'national'`, or `'world_summit'`. | `'global'` |
| `country` | string | Required when `view=national`. | `''` |
| `milestone` | string | Must match a `MILESTONE_TIERS` id or `'all'`. | `''` (no filter) |

**Response (200):**
```json
{
  "entries": [
    {
      "userTag": "<string>",
      "name": "<string>",
      "country": "<string>",
      "bankedChips": <number>,
      "level": <number>,
      "rank": <number>,
      "isPlayer": <boolean>,
      "milestoneBadge": "<string>",
      "milestoneColor": "<string>"
    }
  ],
  "view": "<string>",
  "total": <number>,
  "country": "<string>",       // only when view='national'
  "milestone": "<string>"    // only when milestone filter is active
}
```

**Error Messages:**
- `400` — "Invalid view. Use global, national, or world_summit."
- `400` — "National view requires a country parameter."
- `400` — "Invalid milestone tier."

**Business Logic:**
- **Global/National view:** Fetches players ordered by `type` descending, filters out `banned: true`. For milestone filter, fetches `limit * 5` (min 500) then filters in-memory.
- **World Summit view:** Uses raw SQL to get the top player per country (by `bankedChips`). Excludes banned players and those without a country.
- **Milestone filter:** Uses `MILESTONE_TIERS` config. Filters players whose `bankedChips` falls within `[tier.minChips, nextHigherTier.minChips)` range. If highest tier, upper bound is Infinity.
- `isPlayer` field highlights the current session's player in the list.
- `milestoneBadge` and `milestoneColor` come from `milestoneTierForChips()`.

---

### 6.2 GET /api/leaderboard/my-rank

**Request Body:** None.

**Response (200):**
```json
{
  "globalRank": <number>,
  "nationalRank": <number>,
  "country": "<string>",
  "bankedChips": <number>,
  "level": <number>,
  "tier": "<badge string>",
  "tierName": "<tier name string>",
  "totalGlobal": <number>,
  "totalNational": <number>
}
```

**Error Messages:**
- `401` — "Not signed in"
- `404` — "Player not found"

**Business Logic:**
- **Global rank:** Count of non-banned players with MORE `bankedChips` + 1.
- **National rank:** Count of non-banned players in same country with MORE `bankedChips` + 1.
- All 4 count queries (globalRank, nationalRank, totalGlobal, totalNational) run in parallel via `Promise.all`.
- `tier` comes from `milestoneTierForChips(bankedChips)`.

**Database Operations:**
- `db.player.findUnique({ where: { userTag }, select: { userTag, country, bankedChips, level } })`
- `db.player.count({ where: { banned: false, bankedChips: { gt: player.bankedChips } } })` — global
- `db.player.count({ where: { banned: false, country: player.country, bankedChips: { gt: player.bankedChips } } })` — national
- `db.player.count({ where: { banned: false } })` — total global
- `db.player.count({ where: { banned: false, country: player.country } })` — total national

---

## 7. MATCH Routes (Internal)

All match routes use `x-internal-secret` header for authentication (shared secret between Next.js API and Socket.IO game server). Default: `'venom-arena-internal-dev'`.

### 7.1 POST /api/match/join

[CODE COMMENT] Internal endpoint called by the Socket.IO server when a player joins an arena. Atomically deducts buyIn. Returns the player's snapshot for spawning.

**Authentication:** Header `x-internal-secret` must match `process.env.INTERNAL_SECRET` (default `'venom-arena-internal-dev'`).

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `userTag` | string | Required. |
| `arenaId` | string | Required. Must exist in arena config via `getArenaById()`. |

**Response (200, success):**
```json
{
  "ok": true,
  "player": {
    "userTag": "<string>",
    "name": "<string>",
    "country": "<string>",
    "level": <number>,
    "currentSkin": "<string>",
    "currentTrail": "<string>",
    "currentDeath": "<string>",
    "currentFlag": "<string>",
    "bankedChipsAfterBuyIn": <number>,
    "unlockedSkins": ["<string>", ...],
    "clanTag": "<string>",
    "clanRank": "<string>"
  }
}
```
**Response (400, failure):**
```json
{ "ok": false, "reason": "invalid_arena" | "player_not_found" | "banned" | "insufficient_chips" }
```
**Response (500):**
```json
{ "ok": false, "reason": "database_error" }
```
**Response (403):**
```json
{ "error": "Forbidden" }
```

**Business Logic:**
- Atomically checks balance and deducts `arena.buyIn` from `bankedChips`.
- Increments `totalLost` by `arena.buyIn`.
- Updates `lastSeenAt`.
- Returns player snapshot for game server spawning.

**Database Operations:**
- `tx.player.findUnique({ where: { userTag } })`
- `tx.player.update({ where: { id }, data: { bankedChips: { decrement: arena.buyIn }, totalLost: { increment: arena.buyIn }, lastSeenAt: new Date() } })`

---

### 7.2 POST /api/match/result

[CODE COMMENT] Called by the Socket.IO game server (mini-service) when a player extracts or dies. Authenticates via a shared internal secret (NOT the user JWT).

**Authentication:** Header `x-internal-secret`.

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `userTag` | string | Required. |
| `arenaId` | string | Required. Must exist in arena config. |
| `outcome` | string | Treated as `'extract'` if exactly `'extract'`, otherwise `'death'`. |
| `carriedChips` | number | Floor'd, min 0. |
| `kills` | number | Floor'd, min 0. |
| `durationSeconds` | number | Floor'd, min 0. |
| `score` | number | Optional. Floor'd, min 0. |
| `bankedAmount` | number | Optional. Floor'd, min 0. The post-commission chips to credit on extract. |
| `starsCollected` | number | Optional. Floor'd, min 0. |
| `killerTag` | string | Optional. Present when outcome is `'death'`. |

**Response (200):**
```json
{
  "player": { /* toProfile(updated) */ },
  "chipsEarned": <number>,
  "chipsLost": <number>,
  "commission": <number>,
  "xpGained": <number>,
  "newLevel": <number>,
  "newBankedChips": <number>
}
```

**Error Messages:**
- `403` — "Forbidden"
- `400` — "Unknown arena."
- `404` — "Player not found."
- `500` — "Database error processing match result."

**Business Logic (Economy Rules):**
[CODE COMMENT] Extract: game server computes commission (dynamic: 0% if ≤3 players, 35% if ≥4). The `bankedAmount` field is the actual chips to credit (already post-commission). We use it directly instead of recomputing here. Death: carriedChips lost. Still earn XP. Practice (rewardMultiplier=0): 0 chips, 0 XP.

- **On Extract:**
  - `chipsEarned = bankedAmountFromBody` (post-commission, computed by game server)
  - `chipsLost = 0`
  - Credits: `bankedChips += chipsEarned`, `totalEarned += chipsEarned`
  - Increments `lifetimeExtracts` by 1
  - Updates `biggestExtract` if `chipsEarned > current biggestExtract`
  - `commission = carriedChips - bankedAmountFromBody`

- **On Death:**
  - `chipsEarned = 0`
  - `chipsLost = carriedChips`
  - Increments `totalLost += chipsLost`
  - Increments `lifetimeDeaths` by 1
  - [CODE COMMENT] chips carried are lost (already paid buyIn at join, no further deduction)

- **XP Formula:** `Math.floor((score * 5 + kills * 50) * arena.rewardMultiplier)`
  - Practice arenas have `rewardMultiplier = 0` → 0 XP.

- **Level Calculation:** `newLevel = Math.max(currentLevel, levelFromXp(newXp))`
  - Level never goes down.

- **Best Streak:** Updates `bestStreak` if `kills > current bestStreak`.

- **Challenge Progress (updateChallengeProgress helper):**
  - Runs inside the same transaction as the match result update.
  - Finds all active (incomplete) daily + weekly challenges for the player.
  - Per-category progress logic:
    - `kill`: `newCurrent += kills`
    - `extract`: `newCurrent = Math.max(newCurrent, carriedChips)` (tracks best single-run amount)
    - `extract_streak`: `newCurrent += 1` (only on extract outcome)
    - `score`: If `score >= target`, `newCurrent = target` (milestone-based)
    - `arena_entry`: `newCurrent += 1`
    - `star_collect`: `newCurrent += starsCollected`
    - `survive`: `newCurrent = Math.max(newCurrent, durationSeconds)` (tracks best single-match survival)
  - Auto-completes when `newCurrent >= target`.

**Database Operations:**
- `db.player.findUnique({ where: { userTag } })`
- `tx.player.findUnique({ where: { id } })`
- `tx.player.update({ where: { id }, data: { xp, level, lifetimeKills, bankedChips, totalEarned, lifetimeExtracts, biggestExtract, totalLost, lifetimeDeaths, bestStreak } })`
- `tx.challenge.findMany({ where: { playerId, completed: false, OR: [daily, weekly] } })`
- `tx.challenge.update({ where: { id }, data: { current, completed } })` — for each active challenge

---

### 7.3 POST /api/match/verify

[CODE COMMENT] Internal endpoint called by the Socket.IO server on socket connection. Validates the user's JWT (passed from the client via socket auth) and returns the player's spawn-safe profile.

**Authentication:** Header `x-internal-secret`.

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `token` | string | Required. Player JWT from `/api/auth/token`. |

**Response (200, success):**
```json
{
  "ok": true,
  "player": {
    "id": "<uuid>",
    "userTag": "<string>",
    "name": "<string>",
    "country": "<string>",
    "level": <number>,
    "bankedChips": <number>,
    "currentSkin": "<string>",
    "currentTrail": "<string>",
    "currentDeath": "<string>",
    "currentFlag": "<string>",
    "color": "<hex string>",
    "secondaryColor": "<string | undefined>",
    "pattern": "<string | undefined>",
    "unlockedSkins": ["<string>", ...],
    "clanTag": "<string>",
    "clanRank": "<string>",
    "role": "<string>"
  }
}
```
**Response (failure):**
```json
{ "ok": false, "reason": "invalid_token" | "player_not_found" | "banned" }
```
**Response (403):**
```json
{ "error": "Forbidden" }
```

**Business Logic:**
- Verifies the JWT using `verifySession(token)`.
- Resolves skin color/secondaryColor/pattern from `getCosmeticById()`. Default color: `'#22c55e'`.
- Includes `role` in response (for admin detection).

**Database Operations:**
- `db.player.findUnique({ where: { id: session.playerId } })`

---

## 8. ADMIN Routes

### 8.1 GET /api/admin/config

[CODE COMMENT] Returns all GameConfig rows. If the table is empty, seeds defaults first.

**Request Body:** None. No session/auth check in this route.

**Response (200):**
```json
[
  {
    "id": "<uuid>",
    "key": "<string>",
    "value": <any>,
    "label": "<string>",
    "category": "<string>",
    "order": <number>,
    "type": "<string>",
    "updatedAt": "<ISO date>"
  }
]
```

**Business Logic:**
- If `GameConfig` table is empty, calls `seedGameConfig()` to populate defaults, then re-fetches.
- Parses JSON `value` field back to native types for response.

**Database Operations:**
- `db.gameConfig.findMany({ orderBy: { order: 'asc' } })`

---

### 8.2 PUT /api/admin/config

[CODE COMMENT] Updates the given config keys with new values. Returns all configs after update.

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `updates` | Array<{ key: string, value: any }> | Required. Must be an array. |

**Response (200):** Same as GET response (full config list after update).

**Error Messages:**
- `400` — "updates must be an array"

**Business Logic:**
- Iterates through updates array, calls `db.gameConfig.update()` for each entry.
- Values are `JSON.stringify()`'d before storage.
- No session/auth check in this route.

**Database Operations:**
- `db.gameConfig.update({ where: { key }, data: { value: JSON.stringify(value) } })` — per entry
- `db.gameConfig.findMany({ orderBy: { order: 'asc' } })`

---

### 8.3 POST /api/admin/config/seed

[CODE COMMENT] Re-seeds the GameConfig table with defaults. Existing rows are left untouched (upsert semantics). Returns the full updated config list.

**Request Body:** None. No session/auth check.

**Response (200):**
```json
{ "success": true }
```

**Database Operations:**
- `seedGameConfig()` — upserts default config rows.

---

### 8.4 POST /api/admin/modify-chips

[CODE COMMENT] Admin-only. Atomically adjusts target player's bankedChips by amount (+/-).

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `userTag` | string | Required. Uppercased, trimmed. |
| `amount` | number | Required. Must be a non-zero finite number. Truncated to integer. |

**Response (200):**
```json
{ "ok": true, "player": { /* toProfile(updated) */ } }
```

**Error Messages:**
- `401` — "Unauthorized"
- `403` — "Forbidden: admin role required"
- `400` — "userTag required"
- `400` — "amount must be a non-zero number"
- `404` — "Player not found"
- `500` — "Database error"

**Business Logic:**
- Requires session with `role === 'admin'`.
- Chips are integers (uses `Math.trunc`).
- Banked chips clamped at 0 (no negative balances): `newChips = Math.max(0, bankedChips + amount)`.
- If amount > 0: increments `totalEarned`.
- If amount < 0: increments `totalLost` by `Math.abs(amount)`.
- Updates `lastSeenAt`.

**Database Operations:**
- `tx.player.findUnique({ where: { userTag } })`
- `tx.player.update({ where: { userTag }, data: { bankedChips: newChips, totalEarned, totalLost, lastSeenAt } })`

---

### 8.5 POST /api/admin/ban

[CODE COMMENT] Admin-only. Sets the target player's `banned` field.

**Request Body Fields:**
| Field | Type | Validation |
|-------|------|------------|
| `userTag` | string | Required. Uppercased, trimmed. |
| `banned` | boolean | Required (coerced via `Boolean()`). |

**Response (200):**
```json
{ "ok": true, "userTag": "<string>", "banned": <boolean> }
```

**Error Messages:**
- `401` — "Unauthorized"
- `403` — "Forbidden: admin role required"
- `400` — "userTag required"
- `400` — "Cannot ban yourself"
- `404` — "Player not found"
- `400` — "Cannot ban an admin"

**Business Logic:**
- Requires session with `role === 'admin'`.
- Cannot ban yourself or other admins.
- Sets `banned` field and updates `lastSeenAt`.

**Database Operations:**
- `db.player.findUnique({ where: { userTag } })`
- `db.player.update({ where: { userTag }, data: { banned, lastSeenAt: new Date() } })`

---

## 9. OTHER Routes

### 9.1 GET /api/arena-stats

[CODE COMMENT] Returns live player counts per arena (proxied from game-server /stats endpoint). Falls back to maxPlayers=MAX_ARENA_PLAYERS and players=0 if game server unreachable.

**Request Body:** None. No auth required.

**Response (200):**
```json
{
  "<arenaId>": { "players": <number>, "maxPlayers": <number> },
  ...
}
```

**Business Logic:**
- Fetches from `http://localhost:3001/stats` with 2-second timeout.
- Merges with `ALL_ARENAS` config to ensure every arena has an entry.
- Falls back to `players: 0, maxPlayers: MAX_ARENA_PLAYERS` if game server unreachable.

---

### 9.2 GET /api/

**Request Body:** None. No auth required.

**Response (200):**
```json
{ "message": "Hello, world!" }
```

---

## 10. Shared Constants & Patterns

### Authentication Methods
- **Session JWT (httpOnly cookie):** Most player-facing routes use `getSession()` to read the session.
- **Internal Secret Header:** Match routes (`/api/match/*`) use `x-internal-secret` header.
- **Admin role check:** Admin routes check `session.role !== 'admin'`.

### Economy Patterns
- **Earning chips:** Increments `bankedChips` AND `totalEarned`.
- **Losing/spending chips:** Decrements `bankedChips` AND increments `totalLost`.
- **Starting chips:** All new accounts (registered, guest, OAuth) start with `bankedChips: 150`, `totalEarned: 150`.

### XP & Level Formula (in match/result)
- `xpGained = Math.floor((score * 5 + kills * 50) * arena.rewardMultiplier)`
- `newLevel = Math.max(currentLevel, levelFromXp(newXp))`
- Practice arenas: `rewardMultiplier = 0` → 0 XP, 0 chips.

### Commission (computed by game server, not API)
- Dynamic commission: 0% if ≤3 players in arena, 35% if ≥4 players.
- `bankedAmount` in match/result body is already post-commission.
- `commission = carriedChips - bankedAmount`

### Challenge System Constants
- **Streak multiplier:** 3+ days = 1.5×, 7+ days = 2.0×, 14+ days = 3.0×
- **Level tier thresholds:** novice ≤5, operative ≤15, veteran ≤30, elite >30
- **Level reward multiplier:** novice 1.0×, operative 1.5×, veteran 2.5×, elite 4.0×
- **Daily challenge count:** 3 per day
- **Weekly challenge count:** 2 per week
- **Anti-repeat:** Excludes previous day's daily titles and previous week's weekly titles

### Cosmetic Types
- `skin`, `trail`, `death`, `flag`, `banner`
- Stored in `unlockedSkins` as a JSON array of IDs.
- Equip requires ownership (skin must be in `unlockedSkins`).

### Clan Constants
- Max members: 30
- Default rank for new members: `'Viper'`
- Creator rank: `'Leader'`
- Clan tag: 3-5 uppercase alphanumeric characters
- Clan name: min 3 chars, max 30 chars
- Clan emblem: max 4 chars, default `'🐍'`
- Clan description: max 200 chars
- Max deposit per transaction: 1,000,000 chips
- Chat message max: 300 chars
- Chat history: last 50 messages

### Friend System
- Gift amount range: 1–1000 chips per transaction
- Online threshold: `lastSeenAt` within 60 seconds
- Friendship statuses: `'pending'`, `'accepted'`, `'blocked'`

### Video Reward
- Reward: 50 chips per view
- Cooldown: 60 seconds
- In-memory tracking (resets on server restart)
- Cleanup: triggers when map exceeds 10,000 entries

### Daily Login Reward
- Cycle: 7 days (streak % 7)
- Reward amounts: from `DAILY_REWARDS` config array
- Idempotent: checked inside transaction
- Missed day resets streak to 0
