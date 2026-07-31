// Purpose: Convert Prisma Player to PublicPlayer or FullPlayer display types
import type { PublicPlayer, FullPlayer } from "@/types/player";
import { getMilestoneBadge, shortChips } from "@/lib/utils";

// Purpose: Convert a Prisma player row to a safe public profile (no email, no wallet)
export function toPublicPlayer(p: {
  id: string;
  userTag: string;
  displayName: string;
  country: string;
  region: string;
  avatarPreset: string;
  avatarUrl: string | null;
  clanTag?: string | null;
  clanName?: string | null;
  level: number;
  xp: number;
  walletChips: number;
  instagram?: string | null;
  youtube?: string | null;
  twitch?: string | null;
}): PublicPlayer {
  return {
    id: p.id,
    userTag: p.userTag,
    displayName: p.displayName,
    country: p.country,
    region: p.region,
    avatarPreset: p.avatarPreset,
    avatarUrl: p.avatarUrl,
    clanTag: p.clanTag ?? null,
    clanName: p.clanName ?? null,
    level: p.level,
    xp: p.xp,
    milestoneBadge: getMilestoneBadge(p.walletChips),
    instagram: p.instagram ?? null,
    youtube: p.youtube ?? null,
    twitch: p.twitch ?? null,
  };
}

// Purpose: Convert a Prisma player row to full profile (own player, includes sensitive data)
export function toFullPlayer(p: {
  id: string;
  userTag: string;
  displayName: string;
  country: string;
  region: string;
  avatarPreset: string;
  avatarUrl: string | null;
  clanTag?: string | null;
  clanName?: string | null;
  level: number;
  xp: number;
  walletChips: number;
  yearlyPurchasedChips: number;
  email: string | null;
  role: string;
  passwordHash?: string | null;
  securityPinHash?: string | null;
  equippedCosmetics?: string;
  createdAt: Date;
  lastLoginAt: Date | null;
  instagram?: string | null;
  youtube?: string | null;
  twitch?: string | null;
} & { totalMatches?: number; totalKills?: number; totalExtracts?: number; bestScore?: number; totalChipsEarned?: number }): FullPlayer {
  let cosmetics: Record<string, string | null> = {};
  try {
    cosmetics = p.equippedCosmetics ? JSON.parse(p.equippedCosmetics) : {};
  } catch {
    /* ignore parse error */
  }
  return {
    id: p.id,
    userTag: p.userTag,
    displayName: p.displayName,
    country: p.country,
    region: p.region,
    avatarPreset: p.avatarPreset,
    avatarUrl: p.avatarUrl,
    clanTag: p.clanTag ?? null,
    clanName: p.clanName ?? null,
    level: p.level,
    xp: p.xp,
    milestoneBadge: getMilestoneBadge(p.walletChips),
    instagram: p.instagram ?? null,
    youtube: p.youtube ?? null,
    twitch: p.twitch ?? null,
    email: p.email,
    role: (p.role as "player" | "admin") || "player",
    walletChips: p.walletChips,
    yearlyPurchasedChips: p.yearlyPurchasedChips,
    isGuest: !p.passwordHash,
    hasPin: !!p.securityPinHash,
    equippedCosmetics: cosmetics,
    totalMatches: p.totalMatches ?? 0,
    totalKills: p.totalKills ?? 0,
    totalExtracts: p.totalExtracts ?? 0,
    bestScore: p.bestScore ?? 0,
    totalChipsEarned: p.totalChipsEarned ?? 0,
    createdAt: new Date(p.createdAt).toISOString(),
    lastLoginAt: p.lastLoginAt ? new Date(p.lastLoginAt).toISOString() : "",
  };
}
