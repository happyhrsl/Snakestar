// Snakestar — API Request & Response Types
// Used by API routes and client-side fetch/TanStack Query calls

// Standard API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Auth response (returned after login/register/guest)
export interface AuthResponse {
  player: {
    id: string
    userTag: string
    displayName: string
    role: 'player' | 'admin'
    isGuest: boolean
  }
}

// Login request body
export interface LoginRequest {
  email: string
  password: string
}

// Register request body
export interface RegisterRequest {
  email: string
  password: string
  displayName: string
  country: string
  pin?: string
}

// Paginated list response
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// Leaderboard entry (ranked player row)
export interface LeaderboardEntry {
  rank: number
  playerId: string
  displayName: string
  userTag: string
  country: string
  avatarPreset: string
  clanTag: string | null
  walletChips: number
  milestoneBadge: string
}

// Live arena stats (online players & rooms)
export interface ArenaStats {
  tierId: string
  tierName: string
  onlinePlayers: number
  totalRooms: number
}

// Chip transaction type discriminator
export type ChipTransactionType =
  | 'match_buy_in'
  | 'match_extract'
  | 'daily_reward'
  | 'ad_reward'
  | 'promo_code'
  | 'chip_pack'
  | 'gift_sent'
  | 'gift_received'
  | 'admin_adjust'
