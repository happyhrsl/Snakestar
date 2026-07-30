# Season Pass — Cyber Pass & Season Progression
**Source:** `src/components/panels/season-pass.tsx` (254 lines)
**Prerequisite:** User must be signed in. If not, renders `<NotSignedIn />` component.
**Theme color:** Purple (glow blob, accents).

---

## SEASON BANNER

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│  [SEASON 01: VENOM GENESIS]   [Trophy icon] Ends in 48 Days                        │
│                                                                               
│  [Award icon] Cyber Pass & Season Progression                                     │
│  Earn Season XP from arena extractions and daily missions to unlock 20 tiers of  │
│  exclusive DNA skins, tail trails, kill sounds, avatar borders, and badges!       │
│                                                                               
│                                                     ┌─ Pass Status ────────────┐ │
│                                                     │ [Sparkles icon]          [status] │
│                                                     │                         [btn]  │
│                                                     └─────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

- "SEASON 01: VENOM GENESIS" badge: purple-300 text, purple-500/20 bg, purple-500/40 border, 10px mono, uppercase tracking-widest
- "Ends in 48 Days" badge: amber-400 text, 10px mono, bold, Trophy icon
- Pass Status card (dark bg, amber border, min-w-240px):

### Pass Status Card — 2 Branches

**Branch A: Free Pass (`hasElite === false`)**

```
Pass Status                              FREE PASS
[👑 icon] Unlock Elite Pass (1,00,000 c)
```

- Unlock button: gold gradient (amber-500 → yellow-400), dark text, full-width
- While unlocking: text changes to "Unlocking...", button opacity-60

**Branch B: Elite Pass Active (`hasElite === true`)**

```
Pass Status                              👑 ELITE PASS ACTIVE
✓ 3x rewards & exclusive skins unlocked
```
- "ELITE PASS ACTIVE" text: amber-400, 10px mono bold
- Confirmation text: emerald-400, 10px mono, centered

---

## SEASON XP BAR

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [Zap icon] Season Level [DYNAMIC: currentLevel]   [DYNAMIC: currentXP] / [DYNAMIC: nextLevelXP] XP │
│ [████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░] (gradient indigo→purple→pink) │
│ Tier unlocked: [DYNAMIC: unlockedCount]/20                    Banked: [DYNAMIC: chips]c │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## REWARD TIERS

### Section Label

```
[Trophy icon] Reward Tier Track (1 to 20)
```
- Text: 10px mono, uppercase tracking-widest, slate-500

### Tier Card Grid
- Responsive: 1 col → 2 cols → 3 cols → 5 cols
- Scrollable max-h-600px
- 20 tier cards total

### Individual Tier Card

```
┌────────────────────────────────────────────────┐
│ TIER [N]                      [N,000] XP        │
│ ─────────────────────────────────────────────  │
│                                                 │
│ ┌─ FREE TRACK ─────────────────────────────┐  │
│ │ [Coins icon] FREE TRACK    [✓ CLAIMED]   │  │
│ │ [ICON] Reward Title                      │  │
│ │ Category                                  │  │
│ │ [Claimed] / [Claim Free] / [Reach Lvl N]  │  │
│ └───────────────────────────────────────────┘  │
│                                                 │
│ ┌─ ELITE TRACK ────────────────────────────┐  │
│ │ [Crown icon] ELITE TRACK  [✓ CLAIMED]   │  │
│ │ [ICON] Reward Title                      │  │
│ │ Category                                  │  │
│ │ [Claimed] / [Claim Elite] / [🔒 Requires  │  │
│ │  Elite Pass] / [Reach Lvl N]             │  │
│ └───────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

- Unlocked tiers: brighter border (`border-slate-700`), shadow-md
- Locked tiers: dimmer (`opacity-80`, `border-slate-900`)
- Free Track section: slate-900 bg, slate-800 border
- Elite Track section (hasElite): amber-950/20 bg, amber-500/30 border
- Elite Track section (!hasElite): slate-900/40 bg, slate-800 border

### Button States — Free Track

| Condition | Text | Style |
|-----------|------|-------|
| Claimed | "Claimed" | Slate-800 bg, slate-500 text, cursor-default |
| Unlocked, not claimed | "Claim Free" | Emerald-600 bg, white text, hover emerald-500 |
| Locked | "Reach Lvl [N]" | Slate-900 bg, slate-600 text, cursor-not-allowed |

### Button States — Elite Track

| Condition | Text | Style |
|-----------|------|-------|
| Claimed | "Claimed" | Slate-800 bg, slate-500 text, cursor-default |
| No elite pass | "🔒 Requires Elite Pass" | Slate-900 bg, slate-600 text, cursor-not-allowed |
| Has elite, unlocked | "Claim Elite" | Amber-500 bg, dark text, hover amber-400 |
| Has elite, locked | "Reach Lvl [N]" | Slate-900 bg, slate-600 text, cursor-not-allowed |

---

## ALL 20 REWARD TIERS (exact data from game-config.ts)

| Tier | XP Required | Free Reward (Icon) | Category | Elite Reward (Icon) | Category |
|------|-------------|--------------------| ---------|--------------------| ---------|
| 1 | 1,000 | 🏷️ Neon Viper Badge | Badge | 👑 Cyber Serpent God Skin | DNA Skin |
| 2 | 2,000 | ⚡ Cyber Pulse Trail FX | Tail FX | ⚡ Hyper Plasma Arc FX | Tail FX |
| 3 | 3,000 | 🖼️ Green Venom Frame | Avatar Border | 🔊 Cyber Siren Roar SFX | Kill Sound |
| 4 | 4,000 | 🔊 Serpent Whispers SFX | Kill Sound | 🛋️ Royal Throne Taunt | Emote |
| 5 | 5,000 | 🎖️ Genesis Pioneer Title | Title | 🎖️ 1 Crore Immortal Badge | Badge |
| 6 | 6,000 | 🎨 Bio-Hazard Emote Spray | Spray | 🐍 Modular Venom DNA Skin | DNA Skin |
| 7 | 7,000 | ✨ Emerald Tail Glow | Tail FX | 🛡️ Holo-Shield Tail Aura | Tail FX |
| 8 | 8,000 | 🐍 Cobra Strike Taunt | Emote | 🖼️ Golden Viper Frame | Avatar Border |
| 9 | 9,000 | ⚔️ Cyber Samurai Border | Avatar Border | 🌌 Galactic Overlord Title | Title |
| 10 | 10,000 | 🧪 Toxic Acid DNA Skin | DNA Skin | 🌑 Dark Matter DNA Skin | DNA Skin |
| 11 | 11,000 | 🌐 Quantum Grid Avatar | Profile Icon | 🔥 Celestial Fire Trail | Tail FX |
| 12 | 12,000 | 🛡️ Apex Vanguard Emblem | Badge | 🦅 Apex Predator Emblem | Badge |
| 13 | 13,000 | 🎵 Neon Matrix Audio FX | Kill Sound | 👻 Cyber Phantom Skin | DNA Skin |
| 14 | 14,000 | ⚡ Plasma Arc Tail Trail | Tail FX | 💥 Supernova Explosion SFX | Kill Sound |
| 15 | 15,000 | 👑 Cyber Warlord Title | Title | 👑 Emperor's Crown Frame | Avatar Border |
| 16 | 16,000 | ☀️ Solar Flare Emote | Emote | 💎 Diamond Viper DNA Skin | DNA Skin |
| 17 | 17,000 | 🦾 Titanium Viper Skin | DNA Skin | ⚡ Hyper-Drive Trail FX | Tail FX |
| 18 | 18,000 | 🌌 Cyber Void Frame | Avatar Border | 📜 Genesis Sovereign Title | Title |
| 19 | 19,000 | 🏆 Genesis Immortal Badge | Badge | 🎆 Infinite Horizon Frame | Avatar Border |
| 20 | 20,000 | 🐉 Genesis Master DNA Skin | DNA Skin | 🌟 Serpent God Ascended | DNA Skin |

---

## ELITE PASS DETAILS

- **Cost:** 1,00,000 banked chips (`ELITE_PASS_COST`)
- **Initial state:** `hasElite` is true if `player.level > 15`
- **Initial claimed:** Free tiers 1, 2, 3 pre-claimed; Elite tiers 1, 2 pre-claimed
- **Season duration:** 48 days remaining (hardcoded `SEASON_DAYS_REMAINING`)
- **XP per tier:** Tier N requires N × 1,000 XP

---

## TOAST NOTIFICATIONS

| Action | Toast Text | Type |
|--------|-----------|------|
| Unlock elite (insufficient chips) | "1,00,000 Banked Chips required for Elite Cyber Pass!" | error |
| Unlock elite success | "ELITE CYBER PASS UNLOCKED! Enjoy 3x Rewards & Exclusive Skins! 👑" | success |
| Claim free (locked) | "Reach Season Level [N] to unlock this reward!" | error |
| Claim free (already claimed) | (no toast — early return) | — |
| Claim free success | "Unlocked Free Cosmetic [category] for Tier [N]: [title]! 🎨" | success |
| Claim elite (no pass) | "Unlock Elite Cyber Pass to claim premium rewards!" | error |
| Claim elite (locked) | "Reach Season Level [N] to unlock this reward!" | error |
| Claim elite (already claimed) | (no toast — early return) | — |
| Claim elite success | "Unlocked ELITE Cosmetic [category] for Tier [N]: [title]! 👑" | success |
