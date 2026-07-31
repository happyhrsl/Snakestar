// Snakestar — In-Game Entity Types
// Shared between client rendering and server game logic

// Snake entity (player or bot in the arena)
export interface Snake {
  id: string
  playerId: string
  displayName: string
  userTag: string
  country: string
  avatarPreset: string
  avatarUrl: string | null
  clanTag: string | null
  x: number
  y: number
  angle: number
  speed: number
  body: { x: number; y: number }[]
  score: number
  bodyLength: number
  carriedChips: number
  isBoosting: boolean
  isExtracting: boolean
  extractionProgress: number
  kills: number
  isBot: boolean
  isDead: boolean
  skinPattern: string
  tailFx: string
  equippedCosmetics: Record<string, string | null>
}

// Food orb (spawned on the map)
export interface Food {
  id: string
  x: number
  y: number
  size: 'small' | 'medium' | 'large'
  value: number
  glowPhase: number
}

// Star chip (dropped when a snake dies)
export interface Star {
  id: string
  x: number
  y: number
  value: number
  fromPlayerId: string | null
  pulsePhase: number
}

// Game room state (full snapshot sent from server)
export interface GameState {
  snakes: Snake[]
  food: Food[]
  stars: Star[]
  killFeed: KillFeedEntry[]
  tick: number
}

// Kill feed entry (shown in HUD)
export interface KillFeedEntry {
  killerId: string
  killerName: string
  killerAvatar: string
  victimId: string
  victimName: string
  victimAvatar: string
  timestamp: number
}

// Client input (sent to game server each frame)
export interface PlayerInput {
  angle: number
  wantsBoost: boolean
}

// Server state delta (bandwidth-optimized incremental update)
export interface StateDelta {
  tick: number
  updated: Partial<Snake>[]
  removed: string[]
  newFood: Food[]
  removedFood: string[]
  newStars: Star[]
  removedStars: string[]
  killFeed: KillFeedEntry[]
}

// Match result (HMAC-signed by server for anti-cheat)
export interface MatchResult {
  playerId: string
  tierId: string
  score: number
  kills: number
  carriedChips: number
  result: 'extracted' | 'died'
  commission: number
  netBanked: number
  xp: number
  timestamp: number
  matchId: string
  signature: string
  killerId?: string
  killerName?: string
  duration: number
}

// Replay frame (lightweight snapshot for replay playback)
export interface ReplayFrame {
  tick: number
  snakes: {
    id: string
    x: number
    y: number
    angle: number
    bodyLength: number
    isDead: boolean
    score: number
  }[]
  food: { id: string; x: number; y: number }[]
  stars: { id: string; x: number; y: number }[]
}

// Arena tier config (subset exposed to client for lobby display)
export interface ArenaTier {
  id: string
  name: string
  buyIn: number
  bots: number
  xpMultiplier: number
  mapRadius: number
  difficulty: string
}
