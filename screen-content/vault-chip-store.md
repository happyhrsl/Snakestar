# Chip Store (Vault) — Exact Screen Content

**Source:** `src/components/panels/chip-store.tsx` (404 lines) + `src/lib/game-config.ts`

---

## Loading State

```
┌──────────────────────────────────────┐
│  [4 × pulsing rounded-2xl skeleton bars]  │
│  (each h-44, bg-slate-900/60, border-     │
│   slate-800/80, animate-pulse)             │
└──────────────────────────────────────┘
```

---

## Not-Signed-In State

```
┌──────────────────────────────────────┐
│                                          │
│             Not signed in.                │
│                                          │
└──────────────────────────────────────┘
```
(Rounded-2xl card, border-slate-800/80, bg-slate-900/60, text-sm text-slate-400, centered, max-w-md mx-auto, p-8)

---

## Full Store View (signed in, store NOT locked)

Layout: Single rounded-2xl card (border-slate-800/80, bg-slate-900/60, shadow-md, p-5 sm:p-6, overflow-hidden) with a decorative blurred green glow blob (bg-emerald-500/10, -top-12 -right-12, w-56 h-56).

### ── Header Section ──

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  🏛 Integrated Store Matrix (Base Rate: 100 Chips = ₹1)                      │
│  ℹ Rebuild your bank cushion with fair-play packages bounded by strict       │
│    annual buy limits (25 Lakh Chips max / year).                            │
│                                                                              │
│                    ┌────────────────┐  ┌─────────────────────┐               │
│                    │ 🪙 Your Wallet  │  │ 🛡 Yearly Buy Cap   │               │
│                    │  5,000c         │  │  0 / 25,00,000 c    │               │
│                    └────────────────┘  └─────────────────────┘               │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Heading:** `🏛 Integrated Store Matrix (Base Rate: 100 Chips = ₹1)` — text-xl sm:text-2xl, font-black, text-white, tracking-tight, flex items-center gap-2.5 (Landmark icon w-5.5 h-5.5, text-emerald-400)

**Subtitle:** `ℹ Rebuild your bank cushion with fair-play packages bounded by strict annual buy limits (25 Lakh Chips max / year).` — text-xs, text-slate-400, mt-1, max-w-2xl, flex items-center gap-1.5 (Info icon w-3 h-3)

**Header separator:** mb-5 pb-5, border-b border-slate-800

**Your Wallet badge:** px-3 py-1.5, rounded-xl, bg-amber-500/10, border border-amber-500/30
- MicroLabel: `YOUR WALLET` — text-[10px], font-mono, uppercase, tracking-widest, text-slate-500
- Value: `[DYNAMIC: player.bankedChips in en-IN locale]c` — font-mono, font-bold, text-amber-300, text-sm
- Coins icon w-4 h-4, text-amber-400

**Yearly Buy Cap badge:** px-3 py-1.5, rounded-xl, bg-rose-500/10, border border-rose-500/30
- MicroLabel: `YEARLY BUY CAP` — text-[10px], font-mono, uppercase, tracking-widest, text-slate-500
- Value: `[DYNAMIC: yearlyPurchased in en-IN locale] / 25,00,000 c` — font-mono, font-bold, text-rose-300, text-sm
- ShieldAlert icon w-4 h-4, text-rose-400

---

### ── Store Lock Alert (conditional — only when yearlyPurchased >= 2,500,000) ──

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  🔒 ANTI-MONOPOLY STORE LOCK ACTIVE (365 DAYS)                               │
│  You have reached the absolute maximum yearly buy cap of 25 Lakh Chips       │
│  (2,500,000 chips). Store purchases are disabled to ensure tournament skill  │
│  remains 100% fair across all 197 countries. Free ad rewards (1,200          │
│  chips/day) and arena wagers remain fully active!                            │
└──────────────────────────────────────────────────────────────────────────────┘
```

- mb-5, p-4, rounded-xl, border border-rose-500/40, bg-rose-950/30
- Heading: text-sm, font-bold, text-rose-100, mb-1, flex items-center gap-1.5 (Lock icon w-4 h-4)
- Body: text-xs, text-rose-200, leading-relaxed

---

### ── Chip Pack Grid ──

```
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ 🪙      │  │ 💰      │  │ 🎒      │  │ 🧰      │  │ 💎      │
│ Starter │  │ Scout   │  │Contender│  │Gladiator│  │ High    │
│ Pack    │  │ Bundle  │  │ Sack    │  │ Chest   │  │ Roller  │
│         │  │         │  │         │  │         │  │ Vault   │
│  1,000  │  │  5,100  │  │ 10,500  │  │ 27,500  │  │ 57,500  │
│  chips  │  │  chips  │  │  chips  │  │  chips  │  │  chips  │
│ [Base   │  │ [+2%    │  │ [+5%    │  │ [+10%   │  │ [+15%   │
│  Rate]  │  │ Bonus]  │  │ Bonus]  │  │ Bonus]  │  │ Bonus]  │
│ [Buy   │  │ [Buy    │  │ [Buy    │  │ [Buy    │  │ [Buy    │
│  Pack]  │  │  Pack]  │  │  Pack]  │  │  Pack]  │  │  Pack]  │
└─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘

┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ 🏆      │  │ 🏦      │  │ 🏛️     │  │ 🌍      │  │ 👑      │
│Champion-│  │Syndicate│  │National │  │  World  │  │  MAX    │
│ ship    │  │Treasury │  │ Titan   │  │Champion │  │ ANNUAL  │
│ Crate   │  │         │  │ Coffer  │  │ Trove   │  │CAP PACK │
│         │  │         │  │         │  │         │  │ [✨MAX  │
│ 1,20,000│  │ 3,25,000│  │ 7,00,000│  │15,00,000│  │25,00,000│
│  chips  │  │  chips  │  │  chips  │  │  chips  │  │  chips  │
│ [+20%   │  │ [+30%   │  │ [+40%   │  │ [+50%   │  │ [+66.67%│
│ Bonus]  │  │ Bonus]  │  │ Bonus]  │  │ Bonus]  │  │ BONUS]  │
│ [Buy    │  │ [Buy    │  │ [Buy    │  │ [Buy    │  │ [Buy    │
│  Pack]  │  │  Pack]  │  │  Pack]  │  │  Pack]  │  │  Pack]  │
└─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘
```

**Grid:** grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5, gap-3

#### Pack Card Layout

Each card: p-4, rounded-2xl, border, bg-slate-950/90, flex flex-col justify-between

**Standard cards:** border-slate-800/80, hover:border-emerald-500/40, hover:-translate-y-0.5
**MAX CAP card (pack-15000):** border-amber-500/50, bg-gradient-to-b from-amber-950/20 to-slate-950, shadow-lg shadow-amber-950/20, hover:border-amber-400

- **Emoji:** text-3xl, with drop-shadow glow
  - Standard: `drop-shadow(0 0 6px rgba(16,185,129,0.4))`
  - MAX CAP: `drop-shadow(0 0 8px rgba(245,158,11,0.6))`
- **Pack name:** text-sm, font-bold, text-white, tracking-tight, truncate
- **Price line (MicroLabel):** text-[10px], font-mono, uppercase, tracking-widest, text-slate-500 — `₹{priceINR} · {priceUSD}`
- **Description:** text-[10px], text-slate-400, leading-relaxed, mb-2, line-clamp-2
- **Chip amount:** Coins icon (w-4 h-4, text-emerald-400) + `text-2xl font-extrabold font-mono text-emerald-400 tabular-nums` + `chips` (text-[10px], text-slate-500)
- **Bonus badge:** inline-flex, items-center gap-1, px-2 py-0.5, rounded-full, text-[10px], font-bold, uppercase, tracking-wider, bg-emerald-500/10, border border-emerald-500/30, text-emerald-300, Sparkles icon w-2.5 h-2.5

#### MAX CAP Badge (only on pack-15000)
- Absolute, top-2.5 right-2.5, bg-amber-500, text-slate-950, text-[9px], font-bold, px-2.5 py-0.5, rounded-full, uppercase, tracking-wider, flex items-center gap-1, animate-pulse
- Text: `✨ MAX CAP`

#### Buy Button States

| State | Button Text | Styling |
|-------|-------------|----------|
| Default (available) | `💳 Buy Pack` | bg-slate-900, text-slate-200, border border-slate-800; hover: bg-emerald-600, text-white, border-emerald-500 |
| Loading (busy) | `[spinning Loader2]` | Same styling, disabled:opacity-50 |
| Disabled (store locked OR another pack busy) | `🔒 Locked` | Same styling, disabled:opacity-50 |
| MAX CAP card available | `💳 Buy Pack` | bg-amber-500, text-slate-950, shadow-md shadow-amber-950/40; hover: bg-amber-400 |

Button: w-full, py-2.5, text-xs, font-bold, uppercase, tracking-wider, rounded-xl, flex items-center justify-center gap-1.5

#### All 10 Pack Cards (exact data from game-config.ts)

| # | ID | Name | Chips | Price INR | Price USD | Bonus Label | Description | Emoji |
|---|-----|------|-------|-----------|-----------|-------------|-------------|-------|
| 1 | pack-10 | Starter Pack | 1,000 | ₹10 | $0.12 | Base Rate | 1,000 Chips at 100 Chips/₹1. | 🪙 |
| 2 | pack-50 | Scout Bundle | 5,100 | ₹50 | $0.60 | +2% Bonus | 5,100 Chips with early stakes bonus. | 💰 |
| 3 | pack-100 | Contender Sack | 10,500 | ₹100 | $1.20 | +5% Bonus | 10,500 Chips for medium arena buy-ins. | 🎒 |
| 4 | pack-250 | Gladiator Chest | 27,500 | ₹250 | $3.00 | +10% Bonus | 27,500 Chips for serious competitors. | 🧰 |
| 5 | pack-500 | High Roller Vault | 57,500 | ₹500 | $6.00 | +15% Bonus | 57,500 Chips for VIP Syndicate arenas. | 💎 |
| 6 | pack-1000 | Championship Crate | 1,20,000 | ₹1,000 | $12.00 | +20% Bonus | 1,20,000 Chips for Apex Vault entry. | 🏆 |
| 7 | pack-2500 | Syndicate Treasury | 3,25,000 | ₹2,500 | $30.00 | +30% Bonus | 3,25,000 Chips for grand tournament runs. | 🏦 |
| 8 | pack-5000 | National Titan Coffer | 7,00,000 | ₹5,000 | $60.00 | +40% Bonus | 7,00,000 Chips for country leaderboard pushes. | 🏛️ |
| 9 | pack-10000 | World Champion Trove | 15,00,000 | ₹10,000 | $120.00 | +50% Bonus | 15,00,000 Chips for global elite domination. | 🌍 |
| 10 | pack-15000 | MAX ANNUAL CAP PACK | 25,00,000 | ₹15,000 | $175.00 | +66.67% BONUS (INSTANT LOCK) | 25,00,000 Chips! Reaches ₹15,000 annual spending cap and locks store for 365 days. | 👑 |

---

### ── Promo Codes + Ad Rewards Row ──

Grid: grid-cols-1 md:grid-cols-2, gap-4, mt-5

#### Left: Promotional Codes

```
┌────────────────────────────────────────────────────────────────┐
│  🎁 Promotional Codes                                           │
│  Redeem a promo code for instant bonus chips. Try VENOM (+500c)  │
│  or CHAMPION (+1000c).                                          │
│                                                                  │
│  ┌────────────────────────────┐  [Redeem]                       │
│  │ Enter Code (e.g. VENOM)    │                                 │
│  └────────────────────────────┘                                 │
└────────────────────────────────────────────────────────────────┘
```

- p-4, rounded-2xl, border border-slate-800, bg-slate-950/60
- **Heading:** text-sm, font-bold, text-white, flex items-center gap-2, mb-2 (Gift icon w-4 h-4, text-amber-400) — `Promotional Codes`
- **Description:** text-[11px], text-slate-400, mb-3
  - Exact text: `Redeem a promo code for instant bonus chips. Try VENOM (+500c) or CHAMPION (+1000c).`
  - Code names rendered as `<code>` elements: text-amber-300, font-mono
- **Input field:** flex-1, bg-slate-950, border border-slate-800, rounded-lg, px-3 py-2, text-xs, text-white, font-mono, uppercase, focus:border-amber-500/50, placeholder: `Enter Code (e.g. VENOM)`
- **Redeem button:** px-4 py-2, rounded-lg, bg-amber-500, hover:bg-amber-400, text-slate-950, text-xs, font-bold, transition, disabled:opacity-50
  - Idle: `Redeem`
  - Busy (promoBusy): `[spinning Loader2 w-3.5 h-3.5]`
  - Disabled when: promoBusy OR input is empty

#### Right: Daily Reward Ads

```
┌────────────────────────────────────────────────────────────────┐
│  📹 Daily Reward Ads (12 Max / Day)                             │
│  Each completed ad awards 100 chips directly to your wallet      │
│  (Max 1,200 free chips per day). Resets strictly at 00:00 UTC.  │
│                                                                  │
│  Today: 3/12 ads · 9 remaining          [📹 Watch Sponsor Ad    │
│                                        (+100 Chips)]            │
└────────────────────────────────────────────────────────────────┘
```

- p-4, rounded-2xl, border border-slate-800, bg-slate-950/60
- **Heading:** text-sm, font-bold, text-white, flex items-center gap-2, mb-2 (Video icon w-4 h-4, text-indigo-400) — `Daily Reward Ads (12 Max / Day)`
- **Description:** text-[11px], text-slate-400, mb-3
  - Exact text: `Each completed ad awards 100 chips directly to your wallet (Max 1,200 free chips per day). Resets strictly at 00:00 UTC.`
- **Counter:** text-[10px], font-mono, text-slate-500 — `Today: [DYNAMIC: count]/12 ads · [DYNAMIC: remaining] remaining`
- **Watch Ad button:** px-4 py-2, rounded-lg, bg-indigo-600, hover:bg-indigo-500, text-white, text-xs, font-bold, flex items-center gap-1.5, transition, disabled:opacity-50
  - Available: `[Video icon w-3.5 h-3.5] Watch Sponsor Ad (+100 Chips)`
  - Busy (adBusy): `[spinning Loader2 w-3.5 h-3.5] Buffering Sponsor Offer...`
  - Limit reached (adsRemaining <= 0): `[Video icon w-3.5 h-3.5] Daily Limit Reached (12/12)`
  - Disabled when: adBusy OR adsRemaining <= 0

---

### ── Compliance Notice (bottom) ──

```
┌────────────────────────────────────────────────────────────────┐
│  🛡 STORE POLICY COMPLIANCE ASSURANCE: This is a store-safe      │
│  edition. Spending is capped at ₹15,000/year to block monopoly  │
│  loops. Free potential daily rewards allow non-paying           │
│  competitors to fully win the World Cup purely through skill     │
│  and win-rate!                                                   │
└────────────────────────────────────────────────────────────────┘
```

- mt-5, p-3, bg-indigo-950/20, border border-indigo-900/30, rounded-xl, text-[10px], text-indigo-300, leading-relaxed, flex items-start gap-2
- ShieldAlert icon w-4 h-4, text-indigo-400, shrink-0, mt-0.5
- `STORE POLICY COMPLIANCE ASSURANCE:` is **bold**

---

## Toast Messages

| Trigger | Message | Type |
|---------|---------|------|
| Click Buy Pack (store locked) | `Store is locked for 365 days after reaching the 25 Lakh yearly cap.` | error |
| Click Buy Pack (initiating) | `Initializing secure App Store/Play Store sandboxed billing for ₹{price} ({priceUSD})...` | info |
| Purchase success (cap NOT reached) | `Purchase Successful! +{granted} CHIPS credited. (Bought this year: {newTotal} / 25,00,000 max)` | success |
| Purchase success (cap reached) | `🎉 Purchase Successful! +{granted} CHIPS added! Annual buy cap of 25 Lakh Chips (2,500,000) reached — Store locked for 365 days to maintain tournament skill parity!` | success |
| Purchase API failure | `{data?.error}Failed to add chips.` | error |
| Network error on purchase | `Network error. Please try again.` | error |
| Promo success | `Promo Code redeemed: +{reward} CHIPS credited!` | success |
| Promo failure | `{data?.error}Invalid or expired promo code.` | error |
| Promo network error | `Network error redeeming promo code.` | error |
| Ad limit reached (click) | `Daily Ad Limit Reached (12/12)! Resets at 00:00 UTC.` | error |
| Ad initiated | `Launching high-definition sponsor video... Keep active.` | info |
| Ad success | `Sponsor Ad Completed: +{reward} FREE CHIPS deposited! ({count}/12 ads today)` | success |
| Ad failure | `{data?.error}Failed to claim ad reward.` | error |
| Ad network error | `Network error claiming ad reward.` | error |

## Known Promo Codes (from game-config.ts)

| Code | Reward |
|------|--------|
| VENOM | +500 chips |
| CHAMPION | +1,000 chips |

## Config Constants

| Constant | Value |
|----------|-------|
| MAX_YEARLY_BUY_CHIPS | 2,500,000 (25 Lakh) |
| MAX_DAILY_ADS | 12 |
| AD_REWARD_CHIPS | 100 |
| Yearly cap in ₹ | ₹15,000 |