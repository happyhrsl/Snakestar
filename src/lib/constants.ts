// ═══════════════════════════════════════════════════════════════════════
// constants.ts — App-wide constants (non-game-config)
// ═══════════════════════════════════════════════════════════════════════

/** Application display name */
export const APP_NAME = 'Snakestar';

/** Maximum characters allowed in a player username */
export const MAX_USERNAME_LENGTH = 20;

/** JWT secret — read from env at runtime */
export const JWT_SECRET = process.env.JWT_SECRET!;

/** JWT token expiry duration */
export const JWT_EXPIRY = '7d';

/** Max chips a player can purchase per calendar year (25 Lakh) */
export const MAX_CHIPS_YEARLY = 2_500_000;

/** Max INR a player can spend in the store per calendar year */
export const MAX_SPENDING_YEARLY_INR = 15_000;

/** Cooldown between store ad-watches (1 minute) */
export const STORE_AD_COOLDOWN_MS = 60_000;

/** Chips rewarded per store ad watch */
export const STORE_AD_CHIPS = 100;

/** Max store ad watches allowed per day */
export const STORE_AD_MAX_PER_DAY = 12;

/** Chips rewarded for watching an ad on the game-over overlay */
export const END_OVERLAY_AD_CHIPS = 50;

/** PIN length for parental/transaction locks */
export const PIN_LENGTH = 4;

/** Maximum characters for a clan tag (e.g. "APEX") */
export const MAX_CLAN_TAG_LENGTH = 5;

/** Minimum characters for a clan tag */
export const MIN_CLAN_TAG_LENGTH = 3;

/** Maximum characters for a chat message */
export const MAX_CHAT_MESSAGE_LENGTH = 200;

/** Maximum characters for a clan name */
export const MAX_CLAN_NAME_LENGTH = 30;

/** Preset avatar emojis players can choose from */
export const AVATAR_PRESETS = [
  { id: 'avatar-snake', emoji: '🐍', name: 'Snake' },
  { id: 'avatar-skull', emoji: '☠️', name: 'Skull' },
  { id: 'avatar-alien', emoji: '👾', name: 'Alien' },
  { id: 'avatar-robot', emoji: '🤖', name: 'Robot' },
  { id: 'avatar-crown', emoji: '👑', name: 'Crown' },
  { id: 'avatar-bolt', emoji: '⚡', name: 'Bolt' },
  { id: 'avatar-fire', emoji: '🔥', name: 'Fire' },
  { id: 'avatar-galaxy', emoji: '🌌', name: 'Galaxy' },
] as const;

/** Preset clan emblems */
export const CLAN_EMBLEMS = ['🐍', '🦅', '🎯', '💀', '💎', '🔥', '👑', '⚡', '🏆', '☣️'] as const;

/** Clan role hierarchy */
export const CLAN_ROLES = ['leader', 'co-leader', 'member'] as const;

/** 9 cosmetic equip slots in the loadout system */
export const COSMETIC_SLOTS = [
  'dna_skin', 'tail_fx', 'kill_sound', 'avatar_border',
  'badge', 'title', 'emote', 'spray', 'profile_banner',
] as const;

/** Challenge streak multipliers (consecutive days → reward multiplier) */
export const STREAK_MULTIPLIERS = {
  3: 1.5,
  7: 2.0,
  14: 3.0,
} as const;

/** Day 7 daily-reward ad bonus multiplier */
export const DAY7_AD_MULTIPLIER = 2;

/** Major countries for player profiles and leaderboards */
export const COUNTRIES = [
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
] as const;

/** Milestone badges — 7 tiers from Rookie to Omega based on banked chips */
export const MILESTONE_BADGES = [
  { id: 'rookie', name: 'Rookie', badge: '🛡️ Rookie', minWalletChips: 0, color: '#64748b' },
  { id: 'bronze', name: 'Bronze Elite', badge: '🥉 Bronze Elite', minWalletChips: 100_000, color: '#b45309' },
  { id: 'silver', name: 'Silver Commander', badge: '🥈 Silver Commander', minWalletChips: 500_000, color: '#cbd5e1' },
  { id: 'gold', name: 'Gold Apex Vanguard', badge: '🥇 Gold Apex Vanguard', minWalletChips: 1_000_000, color: '#f59e0b' },
  { id: 'platinum', name: 'Platinum Sovereign', badge: '💎 Platinum Sovereign', minWalletChips: 2_500_000, color: '#22d3ee' },
  { id: 'diamond', name: 'Diamond Warlord', badge: '🔮 Diamond Warlord', minWalletChips: 5_000_000, color: '#06b6d4' },
  { id: 'omega', name: 'Omega Legend', badge: '👑 Omega Legend', minWalletChips: 10_000_000, color: '#fbbf24' },
] as const;
