# Clip Showcase — Esports Clip Showcase & Highlights
**Source:** `src/components/panels/clip-showcase.tsx` (269 lines)
**Prerequisite:** User must be signed in. If not, renders `<NotSignedIn />` component.
**Theme color:** Red (glow blob, accents).

---

## PANEL HEADER (Always Visible)

```
[Film icon] Esports Clip Showcase & Highlights
Watch community clutch extractions, vote on top plays of the week, and share your
own YouTube & Twitch clips!

                                                        [+ icon] Share Game Clip
```

- "Share Game Clip" button: red-600 bg, white text, uppercase tracking-wider, 12px bold

---

## CLIPS GRID

- Responsive: 1 col → 2 cols → 3 cols
- Data source: `SAMPLE_CLIPS` from game-config.ts (3 initial clips)
- New user-submitted clips are prepended to the top

### Clip Card (each)

```
┌──────────────────────────────────────────────────────────┐
│ [Platform badge]              [💰 extracted chips] c     │
│                       Extracted                        │
│                                                          │
│                     [▶️ / 🎮 play icon]                 │
│                    CLICK TO PLAY                        │
├──────────────────────────────────────────────────────────┤
│ Clip Title                                              │
│                                                          │
│ [Flag] CreatorName                                       │
│        #USER-TAG · Date                                  │
│                                                          │
│ [#tag1] [#tag2] [#tag3]                                 │
│                                                          │
│ ────────────────────────────────────────────────────── │
│ [🔥 upvote count]                       [Watch →]      │
└──────────────────────────────────────────────────────────┘
```

#### Thumbnail Section
- Background: gradient slate-900 → slate-950 → red-950/30, aspect-video
- **Platform badge** (top-left): slate-950/80 bg, slate-800 border
  - YouTube: red Youtube icon + text "YouTube"
  - Twitch: violet Twitch icon + text "Twitch"
- **Extracted chips badge** (top-right): emerald-300 text, emerald-500/20 bg, emerald-500/40 border, pill
  - Text: "💰 [formatted en-IN] c Extracted"
- **Center play icon:**
  - YouTube: ▶️ emoji
  - Twitch: 🎮 emoji
  - Below: "CLICK TO PLAY" (10px mono, slate-500)

#### Body Section
- **Title:** 14px bold white, max 2 lines (line-clamp-2)
- **Creator row** (clickable → triggers `onInspectPlayer`):
  - Country flag emoji + creator name (bold white, truncate)
  - Below: "#USER-TAG · Date" (10px mono, slate-500)
- **Tags:** red-300 text, red-500/10 bg, red-500/20 border, pill, 9px mono, prefixed with "#"
- **Footer bar:**
  - **Upvote button** (left):
    - Not upvoted: slate-900 bg, red-300 text, red-500/30 border, Flame icon + count
    - Upvoted: red-600 bg, white text, no border, Flame icon + count (cursor-default)
  - **Watch button** (right): slate-900 bg, slate-300 text, slate-800 border, ExternalLink icon
    - Links to `clip.url` in new tab

---

## ALL 3 INITIAL CLIPS (exact data from game-config.ts)

### Clip 1

```
┌──────────────────────────────────────────────────────────┐
│ [YouTube]  💰 1,00,00,000 c Extracted                  │
│                                                          │
│                         ▶️                               │
│                   CLICK TO PLAY                         │
├──────────────────────────────────────────────────────────┤
│ 1,00,00,000 CHIPS EXTRACTION CLUTCH IN TIER-05 ARENA! 🔥│
│                                                          │
│ 🇮🇳 Hari                                                 │
│    #IND-001 · 23 Jan 2027                                │
│                                                          │
│ [#Crore Milestone] [#Tier-05] [#High Stakes]            │
│                                                          │
│ ────────────────────────────────────────────────────── │
│ 🔥 4,210                                  Watch →       │
└──────────────────────────────────────────────────────────┘
```

### Clip 2

```
┌──────────────────────────────────────────────────────────┐
│ [Twitch]   💰 25,00,000 c Extracted                     │
│                                                          │
│                         🎮                               │
│                   CLICK TO PLAY                         │
├──────────────────────────────────────────────────────────┤
│ SOLO 1V3 VIPER TRAP ON EXTRACTION ZONE BOUNDARY 🐍     │
│                                                          │
│ 🇺🇸 Apex_Viper                                            │
│    #USA-882 · 25 Jan 2027                                │
│                                                          │
│ [#1v3 Clutch] [#Platinum Tier]                           │
│                                                          │
│ ────────────────────────────────────────────────────── │
│ 🔥 1,890                                  Watch →       │
└──────────────────────────────────────────────────────────┘
```

### Clip 3

```
┌──────────────────────────────────────────────────────────┐
│ [YouTube]  💰 50,00,000 c Extracted                     │
│                                                          │
│                         ▶️                               │
│                   CLICK TO PLAY                         │
├──────────────────────────────────────────────────────────┤
│ NINJA SNAKE DNA SKIN SHOWCASE & SPEED EXTRACTION ⚡     │
│                                                          │
│ 🇯🇵 Shadow_Ninja                                          │
│    #JPN-309 · 22 Jan 2027                                │
│                                                          │
│ [#Skin Showcase] [#Speed Run]                            │
│                                                          │
│ ────────────────────────────────────────────────────── │
│ 🔥 1,240                                  Watch →       │
└──────────────────────────────────────────────────────────┘
```

---

## UPLOAD MODAL

**Triggered by:** "Share Game Clip" button when `showUpload === true`

```
┌──────────────────────────────────────────────────────────────────┐
│ [Film icon] Share Game Clip to Community Feed          [✗ close]│
│                                                                    │
│ CLIP TITLE                                                        │
│ [Input: "e.g. INSANE 1V2 EXTRACTION CLUTCH!"]                    │
│                                                                    │
│ PLATFORM                                                          │
│ [Dropdown select]                                                 │
│   YouTube                                                         │
│   Twitch                                                          │
│                                                                    │
│ EXTRACTED CHIPS (C)                                               │
│ [Input: "e.g. 2500000"]  (mono font)                            │
│                                                                    │
│ VIDEO URL                                                         │
│ [Input: "https://youtube.com/watch?v=..."]  (mono font)        │
│                                                                    │
│ ─────────────────────────────────────────────────────────────── │
│                              [Cancel]  [Publish Clip]             │
└──────────────────────────────────────────────────────────────────┘
```

- All labels use `<MicroLabel>` component (10px mono, uppercase, tracking-widest, slate-500)
- Publish Clip button: red-600 bg, white text
- Cancel button: slate-950 bg, slate-800 border, slate-400 text
- New clips are prepended to the grid with:
  - `id`: `clip-[timestamp]`
  - `creator`: player.name
  - `tag`: `#[player.userTag]`
  - `country`: player.country
  - `dateStr`: current date in DD MMM YYYY format
  - `tags`: `["Community"]`

---

## TOAST NOTIFICATIONS

| Action | Toast Text | Type |
|--------|-----------|------|
| Upload (missing fields) | "Clip Title and Video URL are required." | error |
| Upload success | "Game Clip published to Esports Highlights feed! 🎬" | success |
| Upvote | 'Upvoted "[clip title]"! 🔥' | success |
| Upvote (already upvoted) | (no toast — early return) | — |
