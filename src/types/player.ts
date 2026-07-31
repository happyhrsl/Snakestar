// Snakestar — Player, Social, Clan & Challenge Types
// Used by lobby components, panels, and modals

// Public player profile (safe to expose to other players)
export interface PublicPlayer {
  id: string
  userTag: string
  displayName: string
  country: string
  region: string
  avatarPreset: string
  avatarUrl: string | null
  clanTag: string | null
  clanName: string | null
  level: number
  xp: number
  milestoneBadge: string
  instagram: string | null
  youtube: string | null
  twitch: string | null
}

// Full player data (own profile only, includes wallet and stats)
export interface FullPlayer extends PublicPlayer {
  email: string | null
  role: 'player' | 'admin'
  walletChips: number
  yearlyPurchasedChips: number
  isGuest: boolean
  hasPin: boolean
  equippedCosmetics: Record<string, string | null>
  totalMatches: number
  totalKills: number
  totalExtracts: number
  bestScore: number
  totalChipsEarned: number
  createdAt: string
  lastLoginAt: string
}

// Friend or rival relationship with kill tracking
export interface FriendRelation {
  id: string
  player: PublicPlayer
  type: 'friend' | 'rival'
  status: 'pending' | 'accepted'
  killsByA: number
  killsByB: number
  currentArena: string | null  // for HUNT feature
  isOnline: boolean
  isInMatch: boolean
  createdAt: string
}

// Clan info (syndicate overview)
export interface ClanInfo {
  id: string
  name: string
  tag: string
  emblem: string
  level: number
  xp: number
  memberCount: number
  treasuryChips: number
  leaderName: string
  createdAt: string
}

// Clan member with role info
export interface ClanMemberInfo extends PublicPlayer {
  role: 'leader' | 'co-leader' | 'member'
  joinedAt: string
  contribution: number  // chips deposited to vault
}

// Clan chat message
export interface ChatMessage {
  id: string
  playerName: string
  playerAvatar: string
  playerTag: string
  message: string
  createdAt: string
  isMention: boolean  // whether current user is @mentioned
}

// Challenge display (daily or weekly mission card)
export interface ChallengeDisplay {
  id: string
  type: 'daily' | 'weekly'
  title: string
  description: string
  progress: number
  target: number
  xpReward: number
  chipReward: number
  streakMultiplier: number
  completed: boolean
  claimed: boolean
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
}

// Daily reward day (7-day streak cycle)
export interface DailyRewardDay {
  day: number
  chips: number
  claimed: boolean
  isAdBonus: boolean  // day 7 has 2x ad bonus
}

// Co-op invite between friends
export interface CoOpInvite {
  id: string
  fromPlayer: PublicPlayer
  tierId: string
  tierName: string
  status: 'pending' | 'accepted' | 'declined' | 'expired' | 'counter_proposed'
  counterTierId?: string
  expiresAt: string
  createdAt: string
}

// Match history entry (extraction log row)
export interface MatchHistoryEntry {
  id: string
  tierName: string
  result: 'extracted' | 'died'
  score: number
  kills: number
  carriedChips: number
  commission: number
  netBanked: number
  xpEarned: number
  duration: number
  killerName?: string
  createdAt: string
}
