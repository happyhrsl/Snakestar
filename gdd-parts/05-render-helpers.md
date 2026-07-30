# 05 — render-helpers.ts Exhaustive Visual Catalogue

> Source: `/src/components/game/render-helpers.ts` (1218 lines)
> All canvas drawing functions. Pure functions, no React.

---

## 1. Types & Interfaces

### `FrameRenderCtx` (per-frame render context)
| Field | Type | Purpose |
|---|---|---|
| `ctx` | `CanvasRenderingContext2D` | Canvas drawing context |
| `w` | `number` | Canvas CSS-pixel width (DPR-adjusted backing store) |
| `h` | `number` | Canvas CSS-pixel height |
| `camX` | `number` | World-space X at centre of viewport |
| `camY` | `number` | World-space Y at centre of viewport |
| `zoom` | `number` | Camera zoom factor |
| `worldSize` | `number` | World bounds (square) |
| `lowQuality` | `boolean` | Disables glow, simplifies food, fewer particles |
| `myId` | `string` | Local player snake ID (head-glow + label emphasis) |
| `now` | `number` | High-resolution timestamp (ms) for animations |
| `metallicCache` | `Map<string, CanvasGradient>` | Cached metallic gradients, keyed `${color}:${secondary}:${sizeBucket}` |
| `playerSkin` | `Skin \| undefined` | Equipped skin cosmetic (player-only pattern tweaks) |
| `dpr` | `number` | Pixel ratio (sizing glow radii in device pixels) |

### `Particle`
| Field | Type |
|---|---|
| `x`, `y` | `number` (world position) |
| `vx`, `vy` | `number` (velocity) |
| `life` | `number` (remaining life) |
| `maxLife` | `number` (initial life) |
| `color` | `string` |
| `size` | `number` |

### `VisibleRect`
| Field | Type |
|---|---|
| `left`, `right`, `top`, `bottom` | `number` (world-space) |

### `MinimapArgs`
| Field | Type | Purpose |
|---|---|---|
| `ctx` | `CanvasRenderingContext2D` | |
| `x`, `y` | `number` | Top-left of minimap in CSS pixels |
| `size` | `number` | Minimap size (square) |
| `worldSize` | `number` | |
| `arenaRadius` | `number` | Current breathing arena radius (world units) |
| `snakes` | `SnakeSnapshot[]` | |
| `myId` | `string` | |
| `range?` | `number` | Radar coverage radius in world-space; defaults `WORLD_SIZE/2` |

### `FullMapArgs`
| Field | Type | Purpose |
|---|---|---|
| `ctx` | `CanvasRenderingContext2D` | |
| `w`, `h` | `number` | Canvas CSS-pixel dimensions |
| `worldSize` | `number` | |
| `arenaRadius` | `number` | Current breathing arena radius (world units) |
| `snakes` | `SnakeSnapshot[]` | |
| `myId` | `string` | |

---

## 2. Function Index

| Function | Visual Purpose |
|---|---|
| `computeVisibleRect(rc, marginPx=100)` | Returns world-space visible rectangle with margin |
| `rectContainsPoint(rect, x, y)` | AABB point-in-rect test (internal) |
| `snakeIsVisible(pts, rect)` | Check if any point of a snake is in visible rect (internal) |
| `getMetallicGradient(rc, radius, color, secondary)` | Cache/bucket radial gradient for metallic skin (internal) |
| `getArenaRadius(now)` | Breathing arena radius: `baseRadius + sin(cycleProgress * 2π) * amplitude` |
| `formatChipDisplay(chips)` | Indian numbering: K / L / Cr formatting |
| `drawGrid(rc)` | Breathing circular arena: bg fill + grid + neon boundary |
| `drawMapBoundary(ctx, centerX, centerY, radius, tick)` | Dynamic-radius neon-rose boundary with breathing pulse |
| `drawFoodOrb(ctx, x, y, orbSize, value, color, glowColor, now, lowQuality)` | Single food orb with glow + radial gradient |
| `drawStarShape(ctx, cx, cy, outerR, innerR, points, rotation)` | Generic N-pointed star path (internal helper) |
| `drawStarCollectible(ctx, x, y, size, tick, lowQuality)` | 5-pointed gold star with rotation + pulse |
| `drawExtractionRing(ctx, x, y, snakeSize, progress, zoom)` | Extraction progress ring (white→green) around snake head |
| `drawFood(rc, foods)` | Batches orbs by tier + draws star chips individually |
| `drawSnake(rc, snake, opacity?)` | Full snake: body polyline + outline + head + eyes + name + chat bubble |
| `drawSnakeWithLayering(rc, snake, allSnakes)` | Snake with proximity-based opacity fade (0.75 for larger) |
| `drawChipLabel(ctx, x, y, chips, snakeSize, zoom)` | Indian-numbered chip pill above real-player heads |
| `drawChatBubble(rc, x, y, msg)` | Chat bubble above snake head (internal) |
| `drawParticles(rc, particles)` | Particle burst rendering (death/eat) |
| `drawMinimap(args)` | Corner radar minimap (circular, player-centred) |
| `drawFullMap(args)` | Full-screen arena overlay (press M) with legend |

---

## 3. Background & Arena

### `drawGrid(rc)` — Arena Background + Grid + Boundary

**Arena disc fill:**
- Shape: Circle at `(worldSize/2, worldSize/2)` with breathing radius
- Fill color: `#020617` (deep slate)
- Clipped to circle before grid drawn

**Grid lines:**
- Grid spacing: `60` world units
- Visible rect computed, start/end snapped to grid multiples
- Stroke color: `#1e293b` (slate-800)
- Line width: `1 / zoom` (constant 1px screen-space)
- Lines: vertical `moveTo(x, startY) → lineTo(x, endY)`, horizontal `moveTo(startX, y) → lineTo(endX, y)`

**Arena boundary (outer ring):**
- Stroke color: `#f43f5e` (rose-500, neon-rose)
- Line width: `10`
- Shadow color: `#f43f5e`
- Shadow blur: `16` (skipped if `lowQuality`)
- Shape: Circle at `(worldSize/2, worldSize/2)` with breathing radius, full arc `0 → 2π`

### `getArenaRadius(now)` — Breathing Formula
- `cycleTime = (now % MAP_BREATH_CYCLE_MS) / MAP_BREATH_CYCLE_MS`
- `sinVal = sin(cycleTime * 2π)`
- Returns `MAP_BASE_RADIUS + sinVal * MAP_BREATH_AMPLITUDE`
- Values imported from `@/lib/game-config`

### `drawMapBoundary(ctx, centerX, centerY, radius, tick)` — Dynamic Online Boundary

**Breathing pulse:**
- Oscillation: `sin(tick * 0.0015) * 3` (±3px over ~4.2s cycle at `0.0015` rad/ms)
- Minimum radius: `100`
- Effective radius: `max(100, radius + breathe)`

**Outer glow ring:**
- Stroke color: `#f43f5e`
- Line width: `10`
- Shadow color: `#f43f5e`
- Shadow blur: `20`
- Shape: Full circle at `(centerX, centerY)` with effective radius

**Inner subtle glow ring:**
- Stroke color: `rgba(244, 63, 94, 0.35)` (rose at 35% opacity)
- Line width: `3`
- Shadow blur: `8`
- Radius offset: `r - 6` (6px inside outer ring)

---

## 4. Food Orbs

### `ORB_CONFIGS` — Three Visual Tiers

| Value (key) | Label | Radius | Color | Glow Color | Shadow Blur |
|---|---|---|---|---|---|
| `1` | small | `3` | `#34d399` (emerald-400) | `#10b981` (emerald-500) | `6` |
| `3` | medium | `5` | `#38bdf8` (sky-400) | `#0ea5e9` (sky-500) | `10` |
| `5` | large | `8` | `#f472b6` (pink-400) | `#ec4899` (pink-500) | `16` |

- Default fallback: `ORB_CONFIGS[1]` (small green)

### `drawFoodOrb(ctx, x, y, orbSize, value, color, glowColor, now, lowQuality)`

**Radius selection:**
- Config radius used unless `orbSize > 0`, then uses `orbSize`
- Minimum radius: `2`

**Pulse animation (large orbs only, value === 5):**
- Skipped in low quality
- Formula: `pulse = sin(now * 0.004) * 1.5`
- Animated radius: `r + pulse` (±1.5px oscillation)
- Timing: ~0.004 rad/ms → period ≈ 1571ms (~1.57s)

**Glow effect:**
- Skipped in low quality
- Shadow color: orb's `glowColor`
- Shadow blur: config's `shadowBlur` (6 / 10 / 16 by tier)

**Radial gradient (lit-from-within look):**
- Center: `(x, y)`, radius 0 → outer: `(x, y)`, radius `animR`
- Color stops:
  - `0.0` → `#ffffff` (white center)
  - `0.3` → orb's color (e.g. `#34d399`, `#38bdf8`, `#f472b6`)
  - `1.0` → orb's glow color (e.g. `#10b981`, `#0ea5e9`, `#ec4899`)
- Shape: Circle filled with this gradient

### `drawFood(rc, foods)` — Batching Logic

**Tier routing (by `value`):**
- `value >= 5` → `largeOrbs`
- `value >= 3` → `mediumOrbs`
- else → `smallOrbs`
- `isStarChip === true` → `starChips`

**Culling:** Skips food outside `computeVisibleRect`

---

## 5. Star Collectibles (Star Chips)

### `drawStarShape(ctx, cx, cy, outerR, innerR, points, rotation)`
- Generic N-pointed star path builder
- Alternates between `outerR` (tips) and `innerR` (valleys)
- Angle per vertex: `π / points`, starting at `-π / 2 + rotation` (12 o'clock, rotated)
- Uses `moveTo` for first point, `lineTo` for rest, `closePath`

### `drawStarCollectible(ctx, x, y, size, tick, lowQuality)`

**Dimensions:**
- Outer radius: `max(4, size)`
- Inner radius: `max(2, size * 0.4)` (40% of outer)

**Rotation animation:**
- Formula: `tick * 0.002` (slow spin, 0.002 rad/ms)

**Pulse animation:**
- Skipped in low quality
- Formula: `sin(tick * 0.004) * 1.5` (±1.5px, ~1.57s period)
- Outer animated: `outerR + pulse`
- Inner animated: `innerR + pulse * 0.4` (inner pulses at 40% amplitude)

**Glow effect:**
- Skipped in low quality
- Shadow color: `#f59e0b` (amber-500)
- Shadow blur: `12 + sin(tick * 0.003) * 4` (oscillates 8–16, ~2.09s period at 0.003 rad/ms)

**Golden radial gradient fill:**
- Center: `(x, y)` radius 0 → outer: `(x, y)` radius `animOuter`
- Color stops:
  - `0.0` → `#fef3c7` (amber-100, bright center)
  - `0.4` → `#fbbf24` (amber-400)
  - `1.0` → `#f59e0b` (amber-500)

**Star chip value label (drawn inside star, in `drawFood`):**
- Star radius: `max(4, f.size + 4)`
- Label font size: `max(7, min(11, starRadius * 0.55))` — range 7–11px
- Font: `bold ${labelSize}px monospace`
- Text align: `center`, baseline: `middle`
- Fill color: `#7c2d12` (dark brown, readable on gold)
- Y offset: `+0.5` pixels (slight downward nudge)
- Format: `value >= 1000` → `${Math.round(value/1000)}k`, else `${Math.round(value)}`
- Called with `drawStarCollectible(ctx, f.x, f.y, max(6, f.size + 4), rc.now, lowQuality)`

---

## 6. Extraction Ring

### `drawExtractionRing(ctx, x, y, snakeSize, progress, zoom)`
- Only renders when `0 < progress <= 1`

**Ring dimensions:**
- Ring radius: `max(8, snakeSize + 10/zoom)`
- Track line width: `max(2, 3/zoom)`
- Progress arc line width: `track + 1/zoom`

**Background track (full circle):**
- Stroke: `rgba(255, 255, 255, 0.15)` (white at 15% opacity)
- Line width: `max(2, 3/zoom)`
- Shape: Full circle `0 → 2π`

**Progress arc:**
- Start angle: `-π/2` (12 o'clock)
- End angle: `-π/2 + progress * 2π`
- Line cap: `round`
- Color interpolation (white → emerald green):
  - R: `round(255 - progress * 227)` → 255 to 28
  - G: `round(255 - progress * 55)` → 255 to 200
  - B: `round(255 - progress * 215)` → 255 to 40
  - Stroke: `rgba(R, G, B, 0.9)`

**Glow pass (same arc, fainter):**
- Shadow color: `rgba(R, G, B, 0.5)`
- Shadow blur: `8/zoom`
- Stroke: `rgba(R, G, B, 0.4)`
- Line width: track width (thinner than progress arc)

---

## 7. Snake Rendering

### `drawSnake(rc, snake, opacity?)`

**Visibility check:** Uses `computeVisibleRect` + `snakeIsVisible`

**Downsample stride:**
- `pts.length > 60` → stride `2` (skip every other point)
- else → stride `1`

**Body dimensions:**
- Radius: `max(2, snake.visualRadius ?? snake.size)`
- Width (line width): `radius * 2`

**Outline underlay (if `snake.secondaryColor` exists):**
- Line cap: `round`, line join: `round`
- Line width: `width + 4/zoom`
- Stroke: `snake.secondaryColor`
- Global alpha: `baseAlpha * 0.55`

**Body rendering — 5 skin patterns + default:**

| Pattern | Condition | Rendering |
|---|---|---|
| **metallic** | `playerSkin?.pattern === 'metallic'` AND `secondaryColor` exists | Radial gradient stroke (see metallic gradient below) |
| **rainbow** | `playerSkin?.pattern === 'rainbow'` AND NOT lowQuality | Chunked HSL cycling, chunkSize = `max(4, floor(pts.length/12))`, hue = `(now*0.05 + i*14) % 360`, color = `hsl(hue, 90%, 55%)` |
| **neon** | `playerSkin?.pattern === 'neon'` AND NOT lowQuality | Chunked alternating cyan/purple, chunkSize = `max(4, floor(pts.length/10))`, ratio = `(sin(now*0.009 - chunkIndex*0.28)+1)/2`, color = `#06b6d4` (cyan-500) if ratio>0.5 else `#a855f7` (purple-500) |
| **camo** | `playerSkin?.pattern === 'camo'` | Chunked cycling colors: `['#15803d', '#854d0e', '#78350f', '#166534']`, chunkSize = `max(4, floor(pts.length/12))` |
| **default** | All other cases | Solid `snake.color` stroke |

All patterns: line cap `round`, line join `round`, line width = `width`

**Metallic gradient detail (`getMetallicGradient`):**
- Bucketed by `max(4, round(radius))` — 2px buckets minimum
- Cache key: `${color}:${secondary}:${bucket}`
- Gradient: radial from `(-bucket*0.35, -bucket*0.35)` radius `bucket*0.1` → center `(0,0)` radius `bucket`
- Color stops:
  - `0.0` → `#f8fafc` (slate-50, highlight)
  - `0.35` → `secondaryColor` (or `color` if no secondary)
  - `1.0` → `color`

**Head:**
- Shape: Filled circle at `pts[0]` (head position), radius = `radius`
- Fill: `snake.color`
- Player head glow (if `isMe` AND NOT lowQuality):
  - Shadow color: `snake.color`
  - Shadow blur: `14`

**Eyes:**
- Eye offset from center: `radius * 0.45`
- Eye white radius: `max(1.5, radius * 0.32)`
- Pupil radius: `max(0.8, radius * 0.18)`
- Eyes positioned perpendicular to snake angle (`angle + π/2`):
  - Forward offset: `cos(angle) * eyeOffset * 0.4`
  - Lateral offset: `±cos(perp) * eyeOffset`
- Eye whites fill: `#ffffff`
- Pupils fill: `#0a0a0a` (near-black)
- Pupils offset forward by `cos(angle) * pupilR`, `sin(angle) * pupilR`

**Spawn protection ring (if `snake.spawnProtected`):**
- Stroke: `rgba(255,255,255,0.6)` (white at 60%)
- Line width: `2/zoom`
- Radius: `radius + 4/zoom`
- Shape: Full circle

**Name label (if `snake.name` exists):**
- Font: `${max(10, 12/zoom)}px monospace`
- Text align: `center`, baseline: `bottom`
- Y position: `head.y - radius - 6/zoom`

| Snake Type | Label Color | Label Text |
|---|---|---|
| Bot | `rgba(251, 146, 60, 0.75)` (orange-400 at 75%) | `[BOT] ${snake.name}` |
| Local player | `#22c55e` (green-500) | `snake.name` |
| Other player | `rgba(226, 232, 240, 0.85)` (slate-200 at 85%) | `snake.name` |

**User tag (if `snake.userTag` exists):**
- Font: `${max(8, 9/zoom)}px monospace`
- Fill: `rgba(148, 163, 184, 0.7)` (slate-400 at 70%)
- Y position: `labelY - 12/zoom` (above name)

**Chat bubble (if `snake.chatMessage` exists):**
- Position: `head.y - radius - 24/zoom`
- Delegated to `drawChatBubble`

### `drawSnakeWithLayering(rc, snake, allSnakes)` — Proximity Opacity

- `LAYERING_PROXIMITY` constant: `30` (world-space pixels)
- Check each other snake's head distance from this snake's head
- If a **smaller** snake (by `visualRadius ?? size`) is within 30px, fade this snake to `0.75` opacity
- Otherwise, full `1.0` opacity
- Delegates to `drawSnake(rc, snake, opacity)`

---

## 8. Chip Label

### `drawChipLabel(ctx, x, y, chips, snakeSize, zoom)`
- Skipped when `chips <= 0`
- Label text: `formatChipDisplay(chips)` (Indian numbering: K/L/Cr)

**Font:**
- `${max(9, 10/zoom)}px monospace`, bold
- Text align: `center`, baseline: `bottom` (then switched to `middle` for fill)

**Pill background:**
- Fill: `rgba(0, 0, 0, 0.65)` (black at 65%)
- Border: `rgba(251, 191, 36, 0.7)` (amber-400 at 70%)
- Border width: `1/zoom`
- Corner radius: `4/zoom`
- Padding X: `5/zoom`, Padding Y: `2/zoom`
- Position: centered on `(x, y - offset - th)` where `offset = snakeSize + 12/zoom`

**Label text:**
- Fill: `#ffffff` (white)
- Positioned at pill vertical centre

---

## 9. Chat Bubble

### `drawChatBubble(rc, x, y, msg)`

**Text truncation:**
- Max 80 chars; if longer, truncated to 78 chars + `'…'` (ellipsis)

**Font:**
- `${max(10, 11/zoom)}px monospace`
- Text align: `center`, baseline: `middle`

**Bubble dimensions:**
- Padding X: `6/zoom`, Padding Y: `3/zoom`
- Height: `14/zoom + padY*2`
- Corner radius: `4/zoom`
- Position: centered on `(x, y - th)` (above the given y)

**Bubble appearance:**
- Fill: `rgba(15, 23, 42, 0.92)` (slate-900 at 92%)
- Border: `rgba(99, 102, 241, 0.6)` (indigo-500 at 60%)
- Border width: `1.5/zoom`
- Shape: Rounded rectangle (pill) via `arcTo` path

**Text:**
- Fill: `#f8fafc` (slate-50)
- Position: `(x, y - th/2)` (vertically centred in bubble)

---

## 10. Particles

### `drawParticles(rc, particles)`

**Rendering mode:**
- `globalCompositeOperation`: `'lighter'` (additive blending)
- Per-particle alpha: `max(0, min(1, life/maxLife))` — linear fade over lifetime
- Shape: Filled circle at `(p.x, p.y)`
- Radius: `p.size / zoom`
- Fill: `p.color` (per-particle, set by caller)
- Skipped if `p.life <= 0`
- Max particles (caller-enforced): `200`
- Restores `globalCompositeOperation` to `'source-over'` after

---

## 11. Minimap (Corner Radar)

### `drawMinimap(args)`

**Dimensions & layout:**
- Square minimap at `(x, y)` with `size` pixels
- Center: `(x + size/2, y + size/2)`
- Radius: `size/2`
- Scale factor: `r / radarRange` where `radarRange` defaults to `WORLD_SIZE/2`
- Player-centred: player head is always at minimap centre

**Background disc:**
- Fill: `rgba(2, 6, 23, 0.85)` (deep slate at 85%)
- Border: `rgba(99, 102, 241, 0.4)` (indigo-500 at 40%)
- Border width: `1.5`
- Clipped to circle

**Concentric rings:**
- Stroke: `rgba(99, 102, 241, 0.10)` (indigo-500 at 10%)
- Line width: `1`
- 3 rings at insets: `[2, 5, 8]` pixels from edge (radii: `r-2`, `r-5`, `r-8`)

**Crosshairs:**
- Stroke: `rgba(15, 23, 42, 0.4)` (slate-900 at 40%)
- Vertical: `(cx, y) → (cx, y+size)`
- Horizontal: `(x, cy) → (x+size, cy)`

**Arena boundary on minimap:**
- Stroke: `rgba(244, 63, 94, 0.6)` (rose-500 at 60%)
- Line width: `1.2`
- Dash: `[4, 4]`
- Centred on world centre (offset from player position)

**Snake dots on minimap:**

| Type | Dot Radius | Fill Color |
|---|---|---|
| Local player | `3` | `#818cf8` (indigo-400) |
| Bot | `2` | `#f43f5e` (rose-500) |
| Other real player | `2` | `#34d399` (emerald-400) |

- Snakes beyond minimap radius are culled

---

## 12. Full Map Overlay (Press M)

### `drawFullMap(args)`

**Canvas reset:** `ctx.setTransform(1, 0, 0, 1, 0, 0)` (draws in screen-space)

**Background fill:**
- `rgba(2, 6, 23, 0.94)` (deep slate at 94%)
- Full canvas `fillRect(0, 0, w, h)`

**Layout:**
- Arena centered on screen: `cx = w/2`, `cy = h/2`
- Margin: `80`px
- Fit dimension: `min(w, h) - margin*2`
- Scale: `fitDim / (arenaRadius * 2)`
- Screen radius: `arenaRadius * scale`
- World-to-screen transforms: `cx + (wx - worldSize/2) * scale`

**Concentric range rings:**
- Stroke: `rgba(99, 102, 241, 0.10)` (indigo-500 at 10%)
- Line width: `1`
- 3 rings at fractions: `[0.25, 0.5, 0.75]` of `screenR`

**Crosshairs:**
- Stroke: `rgba(15, 23, 42, 0.5)` (slate-900 at 50%)
- Vertical: `(cx, cy - screenR) → (cx, cy + screenR)`
- Horizontal: `(cx - screenR, cy) → (cx + screenR, cy)`

**Arena boundary:**
- Stroke: `rgba(244, 63, 94, 0.8)` (rose-500 at 80%)
- Line width: `2`
- Dash: `[6, 6]`

**Snake dots:**

| Type | Dot Radius | Fill Color | Extra |
|---|---|---|---|
| Local player | `5` | `#818cf8` (indigo-400) | Pulsing ring: radius `9`, stroke `rgba(129, 140, 248, 0.7)`, width `2` |
| Bot | `2.5` | `#f43f5e` (rose-500) | None |
| Other real player | `3` | `#34d399` (emerald-400) | None |

**Title:**
- Text: `"ARENA OVERVIEW — ALL SNAKES"`
- Font: `bold 14px monospace`
- Fill: `rgba(226, 232, 240, 0.95)` (slate-200 at 95%)
- Align: `center`, baseline: `top`
- Position: `(cx, 16)`

**Close hint:**
- Text: `"Press M to close"`
- Font: `11px monospace`
- Fill: `rgba(148, 163, 184, 0.85)` (slate-400 at 85%)
- Position: `(cx, h - 24)`

**Legend (top-left):**
- Font: `11px monospace`, align `left`
- Start position: `(20, 20)`
- Each entry: 18px vertical spacing
- Dot + text pattern:
  - Dot at `(legendX + 6, legendY + 6)` with entry's `dotR`
  - Text at `(legendX + 18, legendY)` with fill `rgba(226, 232, 240, 0.85)`

| Label | Dot Color | Dot Radius |
|---|---|---|
| `"You"` | `#818cf8` | `5` |
| `"Real Players"` | `#34d399` | `3` |
| `"Bots"` | `#f43f5e` | `2.5` |

---

## 13. Indian Number Formatting (`formatChipDisplay`)

| Range | Format | Examples |
|---|---|---|
| `< 1000` | Plain number | `"500"`, `"999"` |
| `1000 – 99,999` | K suffix | `"1K"`, `"1.5K"`, `"25K"`, `"99.9K"` |
| `100,000 – 9,999,999` | L (lakh) suffix | `"1L"`, `"1.5L"`, `"50L"`, `"99.9L"` |
| `≥ 10,000,000` | Cr (crore) suffix | `"1Cr"`, `"1.2Cr"`, `"15Cr"` |

- Decimal `.0` trailing zeros stripped (e.g. `"1.0K"` → `"1K"`)

---

## 14. Complete Color Master List

### Hex Colors
| Color | Name/Usage |
|---|---|
| `#020617` | Arena background (slate-950) |
| `#1e293b` | Grid lines (slate-800) |
| `#f43f5e` | Arena boundary, bot dots (rose-500) |
| `#34d399` | Small orb color, real player dots (emerald-400) |
| `#10b981` | Small orb glow (emerald-500) |
| `#38bdf8` | Medium orb color (sky-400) |
| `#0ea5e9` | Medium orb glow (sky-500) |
| `#f472b6` | Large orb color (pink-400) |
| `#ec4899` | Large orb glow (pink-500) |
| `#f59e0b` | Star glow, star outer gradient (amber-500) |
| `#fbbf24` | Star mid gradient (amber-400) |
| `#fef3c7` | Star center gradient (amber-100) |
| `#7c2d12` | Star chip value label (dark brown) |
| `#ffffff` | Orb gradient center, eye whites, chip label text |
| `#0a0a0a` | Pupil fill (near-black) |
| `#f8fafc` | Chat bubble text, metallic gradient highlight (slate-50) |
| `#22c55e` | Local player name label (green-500) |
| `#818cf8` | Player minimap/fullmap dot (indigo-400) |
| `#06b6d4` | Neon skin cyan (cyan-500) |
| `#a855f7` | Neon skin purple (purple-500) |
| `#15803d` | Camo color 1 (green-700) |
| `#854d0e` | Camo color 2 (yellow-800) |
| `#78350f` | Camo color 3 (amber-900) |
| `#166534` | Camo color 4 (green-800) |

### RGBA Colors
| Color | Usage |
|---|---|
| `rgba(244, 63, 94, 0.35)` | Inner boundary glow ring |
| `rgba(255, 255, 255, 0.15)` | Extraction track ring |
| `rgba(R, G, B, 0.9)` | Extraction progress arc (interpolated white→green) |
| `rgba(R, G, B, 0.5)` | Extraction glow shadow |
| `rgba(R, G, B, 0.4)` | Extraction glow stroke |
| `rgba(255,255,255,0.6)` | Spawn protection ring |
| `rgba(251, 146, 60, 0.75)` | Bot name label (orange-400) |
| `rgba(226, 232, 240, 0.85)` | Other player name label (slate-200) |
| `rgba(148, 163, 184, 0.7)` | User tag text (slate-400) |
| `rgba(148, 163, 184, 0.85)` | Full-map close hint, legend text (slate-400) |
| `rgba(0, 0, 0, 0.65)` | Chip label pill background |
| `rgba(251, 191, 36, 0.7)` | Chip label pill border (amber-400) |
| `rgba(15, 23, 42, 0.92)` | Chat bubble background (slate-900) |
| `rgba(99, 102, 241, 0.6)` | Chat bubble border (indigo-500) |
| `rgba(99, 102, 241, 0.4)` | Minimap border (indigo-500) |
| `rgba(99, 102, 241, 0.10)` | Minimap/fullmap concentric rings (indigo-500) |
| `rgba(15, 23, 42, 0.4)` | Minimap crosshairs (slate-900) |
| `rgba(15, 23, 42, 0.5)` | Full-map crosshairs (slate-900) |
| `rgba(244, 63, 94, 0.6)` | Minimap arena boundary (rose-500) |
| `rgba(244, 63, 94, 0.8)` | Full-map arena boundary (rose-500) |
| `rgba(2, 6, 23, 0.85)` | Minimap background (deep slate) |
| `rgba(2, 6, 23, 0.94)` | Full-map background (deep slate) |
| `rgba(226, 232, 240, 0.95)` | Full-map title (slate-200) |
| `rgba(129, 140, 248, 0.7)` | Full-map player pulse ring (indigo-400) |

### HSL Colors (generated at runtime)
| Pattern | Formula | Values |
|---|---|---|
| Rainbow skin | `hsl(hue, 90%, 55%)` | Hue cycles: `(now * 0.05 + i * 14) % 360` |

---

## 15. Animation / Timing Values

| Animation | Formula | Period / Rate |
|---|---|---|
| Arena breathing radius | `sin((now % CYCLE) / CYCLE * 2π) * AMP` | `MAP_BREATH_CYCLE_MS` (from config) |
| Dynamic boundary pulse | `sin(tick * 0.0015) * 3` | ~4189ms (~4.2s) |
| Large orb pulse | `sin(now * 0.004) * 1.5` | ~1571ms (~1.57s) |
| Star rotation | `tick * 0.002` | 0.002 rad/ms (continuous) |
| Star outer pulse | `sin(tick * 0.004) * 1.5` | ~1571ms (~1.57s) |
| Star inner pulse | `outerPulse * 0.4` | Same freq, 40% amplitude |
| Star glow oscillation | `12 + sin(tick * 0.003) * 4` | ~2094ms (~2.09s), range 8–16 |
| Rainbow hue shift | `(now * 0.05 + i * 14) % 360` | 0.05 hue/ms per chunk + 14°/chunk offset |
| Neon pattern toggle | `sin(now * 0.009 - chunkIdx * 0.28)` | ~698ms (~0.7s) per toggle |
| Particle lifetime fade | `life / maxLife` | Linear, set by caller |

---

## 16. Low Quality Mode Effects

When `lowQuality === true`:
- Arena boundary: no shadow/glow
- Food orbs: no shadow/glow, no pulse animation on large orbs
- Star collectibles: no glow, no pulse animation (rotation still applies)
- Snake head: no player glow halo
- Rainbow/neon skin patterns: fall through to default solid color
- Metallic pattern: still renders (no quality gate)
- Camo pattern: still renders (no quality gate)
- Extraction ring glow: gated by `lowQualityCheck` (currently always returns `false`, so glow always renders — likely a stub)

---

## 17. All Font Settings

| Element | Size | Family | Weight | Align | Baseline |
|---|---|---|---|---|
| Snake name | `max(10, 12/zoom)px` | monospace | normal | center | bottom |
| Snake user tag | `max(8, 9/zoom)px` | monospace | normal | center | (continues from name) |
| Star chip value | `max(7, min(11, starRadius*0.55))px` | monospace | bold | center | middle |
| Chip label | `max(9, 10/zoom)px` | monospace | bold | center | bottom → middle |
| Chat bubble | `max(10, 11/zoom)px` | monospace | normal | center | middle |
| Full-map title | `14px` | monospace | bold | center | top |
| Full-map hint | `11px` | monospace | normal | center | (continues) |
| Full-map legend | `11px` | monospace | normal | left | (continues) |

---

## 18. All Drawn Shapes Summary

| Shape | Where | Key Properties |
|---|---|---|
| Filled circle (arena bg) | `drawGrid` | Radius = breathing arena radius, fill `#020617`, clipped |
| Grid lines | `drawGrid` | Horizontal + vertical, spacing 60, stroke `#1e293b` |
| Stroked circle (boundary) | `drawGrid`, `drawMapBoundary` | Radius = breathing, stroke `#f43f5e`, width 10, glow |
| Filled circle (food orb) | `drawFoodOrb` | Radial gradient white→color→glow, radius 3/5/8 |
| 5-pointed star | `drawStarCollectible` | Golden gradient, rotation + pulse, outer/inner radius |
| Stroked circle track | `drawExtractionRing` | White 15% opacity, progress arc overlay |
| Stroked polyline (body) | `drawSnake` | Width = radius*2, round cap/join, 5 pattern modes |
| Stroked polyline (outline) | `drawSnake` | Width = radius*2 + 4/zoom, 55% alpha |
| Filled circle (head) | `drawSnake` | Radius = snake radius, player gets glow |
| Filled circles (eyes) | `drawSnake` | White + near-black pupils, positioned by angle |
| Stroked circle (spawn ring) | `drawSnake` | White 60%, width 2/zoom |
| Rounded rect (chip pill) | `drawChipLabel` | Black 65% bg, amber border, white text |
| Rounded rect (chat bubble) | `drawChatBubble` | Slate-900 92% bg, indigo border, slate-50 text |
| Filled circles (particles) | `drawParticles` | Additive blend, per-particle color, linear fade |
| Filled circle (minimap bg) | `drawMinimap` | Deep slate 85%, indigo border |
| Stroked circles (concentric) | `drawMinimap`, `drawFullMap` | Indigo 10%, 3 rings |
| Lines (crosshairs) | `drawMinimap`, `drawFullMap` | Slate-900 40-50% |
| Dashed circle (arena on map) | `drawMinimap` | Rose 60%, dash [4,4], width 1.2 |
| Dashed circle (arena full) | `drawFullMap` | Rose 80%, dash [6,6], width 2 |
| Filled circles (dots) | `drawMinimap`, `drawFullMap` | 3 sizes/colors by player type |
| Stroked circle (player pulse) | `drawFullMap` | Indigo 70%, radius 9, width 2 |
| Filled rect (full-map bg) | `drawFullMap` | Deep slate 94%, full canvas |

---

## 19. Imported Config Values (from `@/lib/game-config`)

| Value | Type | Usage |
|---|---|---|
| `MAP_BASE_RADIUS` | `number` | Base arena radius for breathing formula |
| `MAP_BREATH_AMPLITUDE` | `number` | Sinusoidal amplitude for breathing |
| `MAP_BREATH_CYCLE_MS` | `number` | Full breathing cycle duration (ms) |
| `WORLD_SIZE` | `number` | Square world bounds; default radar range = `WORLD_SIZE/2` |
| `Skin` (type) | type | Player skin cosmetic type |

---

## 20. Rendering Pipeline Order (from file header comment)

1. `drawGrid` — breathing circular arena background + subtle grid + boundary
2. `drawFood` — three distinct orb sizes (small/medium/large) + star collectibles
3. `drawSnake` / `drawSnakeWithLayering` — polyline body + head + eyes + labels with optional opacity layering
4. `drawChipLabel` — Indian-numbered chip display above real-player heads
5. `drawParticles` — death/eat particle bursts
6. `drawMinimap` — corner radar minimap
7. `drawFullMap` — full-screen arena overlay
8. `drawMapBoundary` — dynamic-radius neon-rose boundary with breathing

---

*End of 05-render-helpers.ts catalogue.*
