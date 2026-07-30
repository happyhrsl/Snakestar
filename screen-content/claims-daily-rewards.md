# Daily Rewards (Claims) — Exact Screen Content

**Source:** `src/components/panels/daily-rewards.tsx` (240 lines) + `src/lib/game-config.ts`

---

## Loading State

```
┌──────────────────────────────────────────┐
│  [1 × pulsing rounded-2xl skeleton bar]  │
│  (h-48, bg-slate-900/60, border-         │
│   slate-800/80, animate-pulse)           │
└──────────────────────────────────────────┘
```

---

## Not-Signed-In State

```
┌──────────────────────────────────────────┐
│                                          │
│             Not signed in.                │
│                                          │
└──────────────────────────────────────────┘
```
(Rounded-2xl card, border-slate-800/80, bg-slate-900/60, text-sm text-slate-400, centered, max-w-md mx-auto, p-8)

---

## Full View (signed in)

Layout: Single rounded-2xl card (border-slate-800/80, bg-slate-900/60, shadow-md, p-5 sm:p-6, overflow-hidden) with a decorative blurred green glow blob (bg-emerald-500/10, -top-12 -right-12, w-56 h-56).

### ── Header Section ──

```
┌──────────────────────────────────────────────────────────────────────┐
│  🎁 Daily Log Rewards                                                │
│  Build your claim streak to secure massive payouts for arena entries!│
│                                                                      │
│                              ┌──────────────────────────────┐        │
│                              │ 🔥 Current Streak            │        │
│                              │    [DYNAMIC: N] Days           │        │
│                              └──────────────────────────────┘        │
└──────────────────────────────────────────────────────────────────────┘
```

**Heading:** `🎁 Daily Log Rewards` — text-xl sm:text-2xl, font-black, text-white, tracking-tight, flex items-center gap-2.5 (Gift icon w-5.5 h-5.5, text-emerald-400, **animate-bounce**)

**Subtitle:** `Build your claim streak to secure massive payouts for arena entries!` — text-xs, text-slate-400, mt-1, max-w-2xl

**Streak badge:** inline-flex, items-center gap-3, bg-slate-950, px-4 py-2, rounded-xl, border border-amber-500/30
- Flame icon w-5 h-5, text-amber-500, fill-amber-500
- MicroLabel: `CURRENT STREAK` — text-[10px], font-mono, uppercase, tracking-widest, text-slate-500
- Value: `[DYNAMIC: player.dailyStreak] Days` — text-base, font-bold, font-mono, text-white

**Header separator:** mb-5 pb-5, border-b border-slate-800

---

### ── 7-Day Cycle Grid ──

**Grid:** grid-cols-2 sm:grid-cols-4 md:grid-cols-7, gap-3, mb-5

**Data source:** `DAILY_REWARDS = [10, 20, 50, 100, 250, 500, 1000]` (from game-config.ts)

Each day cell: flex flex-col, items-center, justify-between, p-4, rounded-2xl, border, relative

#### Day Cell Visual States

| State | Background | Border | Text | Opacity | Extras |
|-------|-----------|--------|------|---------|--------|
| **Today** (claimable) | bg-emerald-950/30 | border-emerald-400, ring-1 ring-emerald-500/40 | text-white | 100% | shadow-lg shadow-emerald-950/40, "Today" pill at top |
| **Claimed** | bg-slate-950 | border-emerald-500/20 | text-slate-500 | 100% | Green checkmark at top-right |
| **Future** | bg-slate-950/60 | border-slate-800 | text-slate-400 | 70% | — |

#### Day Cell Layout (example for "Today")

```
        ┌──── Today ────┐       ← absolute -top-2, centered, pill badge
│                      │
│  DAY 1               │       ← MicroLabel (text-[10px] font-mono uppercase tracking-widest)
│                      │
│       📅             │       ← Calendar icon w-7 h-7, my-3
│                      │
│       10 c           │       ← reward amount + "c" suffix
│                      │
└──────────────────────┘
```

**MicroLabel:** `DAY {N}` — text-[10px], font-mono, uppercase, tracking-widest, text-slate-500 (today variant: text-emerald-300/80)

**Calendar icon colors:**
- Claimed: text-emerald-500/40
- Today: text-emerald-400, **animate-pulse**
- Future: text-slate-600

**Reward amount:** text-base, font-bold, font-mono, tracking-tight
- Today: text-white
- Claimed: text-slate-500
- Future: text-emerald-400
- Suffix `c`: text-[10px], text-emerald-400, ml-0.5

**"Today" pill:** absolute, -top-2, left-1/2, -translate-x-1/2, px-2 py-0.5, rounded-full, bg-emerald-500, text-[9px], font-bold, text-slate-950, uppercase, tracking-wider, whitespace-nowrap — text: `Today`

**Claimed checkmark:** absolute, top-1.5, right-1.5, bg-emerald-500, rounded-full, p-0.5, aria-label="Claimed" — contains Check icon w-3 h-3, text-slate-950

#### All 7 Day Cells (exact data)

| Cell | Label | Reward | Description |
|------|-------|--------|-------------|
| Day 1 | `DAY 1` | `10 c` | First day reward |
| Day 2 | `DAY 2` | `20 c` | Second day reward |
| Day 3 | `DAY 3` | `50 c` | Third day reward |
| Day 4 | `DAY 4` | `100 c` | Fourth day reward |
| Day 5 | `DAY 5` | `250 c` | Fifth day reward |
| Day 6 | `DAY 6` | `500 c` | Sixth day reward |
| Day 7 | `DAY 7` | `1,000 c` | Seventh day reward (cycle repeats) |

Note: The 7-day cycle repeats. If streak is, say, 9, then `currentDayIndex = 9 % 7 = 2` (Day 3 is next). `claimedCount = ((9-1) % 7) + 1 = 3` (Days 1-3 appear claimed).

---

### ── Claim Actions Bar ──

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  [Available message OR Timer message]     [Button(s)]               │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Container:** bg-slate-950/40, rounded-2xl, border border-slate-800, p-4, flex flex-col sm:flex-row, items-center, justify-between, gap-4

#### Branch A: Reward Available (NOT yet claimed today)

**Message (left):**
```
✨ Day {N} reward is available! Claim now to boost your chips balance.
```
- text-sm, text-emerald-400, flex items-center gap-1.5
- Sparkles icon w-4 h-4, **animate-spin**, text-emerald-400
- `{N}` = `currentDayIndex + 1`

**Buttons (right) — flex items-center gap-2 flex-wrap:**

**Button 1 — Standard Claim:**
```
[🎁 Standard Claim]
```
- px-5 py-2.5, rounded-xl, bg-gradient-to-r from-emerald-500 to-teal-500, hover:from-emerald-400 hover:to-teal-400, text-slate-950, font-bold, text-xs, uppercase, tracking-wider, shadow-md shadow-emerald-950/40, disabled:opacity-50
- Idle: Gift icon w-4 h-4
- Busy (busy=true): spinning Loader2 icon w-4 h-4
- Disabled when: busy OR adBusy

**Button 2 — Watch Ad (Double Claim):**
```
[✨ Watch Ad (Double Claim)]
```
- px-5 py-2.5, rounded-xl, bg-indigo-600, hover:bg-indigo-500, text-white, font-bold, text-xs, uppercase, tracking-wider, shadow-md shadow-indigo-950/40, disabled:opacity-50
- Idle: Sparkles icon w-4 h-4
- Busy (adBusy=true): spinning Loader2 icon w-4 h-4 + text changes to `Buffering Sponsor...`
- Disabled when: busy OR adBusy

**Ad flow:** Clicking "Watch Ad" triggers: (1) sets adBusy=true, (2) shows info toast `Launching ad-stream sponsor link... Please hold`, (3) waits 2.5 seconds via setTimeout, (4) calls handleClaim(2) which sends multiplier=2 to API.

#### Branch B: Already Claimed Today

**Message (left):**
```
Next Daily Claim available in: HH:MM:SS
```
- text-sm, text-slate-400
- Timer: font-mono, font-bold, text-amber-400
- Format: `HH:MM:SS` (zero-padded, 2-digit each)
- Updates every 1 second via setInterval
- If timeLeft is empty string: shows `calculating...`

**Button (right):**
```
[✓ Already Claimed Today]
```
- px-5 py-2.5, rounded-xl, bg-slate-950, border border-slate-800, text-slate-500, font-bold, text-xs, uppercase, tracking-wider, cursor-not-allowed, **disabled** (always)
- Check icon w-4 h-4

---

## Toast Messages

| Trigger | Message | Type |
|---------|---------|------|
| Standard claim success | `Claimed Daily Reward: +{reward} CHIPS!` | success |
| Ad (2x) claim success | `Claimed Daily Reward: +{reward} CHIPS! (2x Ad Bonus!)` | success |
| Claim API failure | `{data?.error}Failed to claim daily reward.` | error |
| Claim network error | `Network error. Please try again.` | error |
| Ad initiated | `Launching ad-stream sponsor link... Please hold` | info |

## Config Constants

| Constant | Value |
|----------|-------|
| DAILY_REWARDS | `[10, 20, 50, 100, 250, 500, 1000]` |
| Cycle length | 7 days (repeats) |
| Timer resolution | 1 second (updates every 1000ms) |
| Ad double-claim multiplier | 2x (sends `{ multiplier: 2 }` to API) |
| Standard claim multiplier | 1x (sends `{ multiplier: 1 }` to API) |
| Ad buffer delay | 2,500 ms (setTimeout before actual claim) |
| Day boundary | 00:00 UTC (based on ISO date string `YYYY-MM-DD`) |