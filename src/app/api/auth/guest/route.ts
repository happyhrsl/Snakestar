// Purpose: Create a temporary guest account with no email or password
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { createToken } from "@/lib/auth";
import { success, checkRateLimit, setAuthCookie, tooManyRequests } from "@/lib/api-helpers";
import { randomId } from "@/lib/utils";
import type { AuthResponse } from "@/types/api";

export async function POST(req: NextRequest) {
  // Rate limit: 3 guest accounts per hour per IP
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (checkRateLimit(`guest:${ip}`, 3, 3_600_000)) return tooManyRequests(3600);

  // Generate random display name
  const displayName = `Guest_${randomId(6)}`;

  // Generate unique userTag
  let userTag: string;
  let unique = false;
  while (!unique) {
    userTag = randomId(8).toUpperCase();
    const tagExists = await db.player.findUnique({ where: { userTag } });
    if (!tagExists) unique = true;
  }

  // Create guest player with no email/password
  const player = await db.player.create({
    data: {
      displayName,
      userTag: userTag!,
      country: "XX",
      walletChips: 500,
      avatarPreset: "🐍",
      level: 1,
      xp: 0,
    },
  });

  // Create JWT and set cookie
  const token = createToken({ playerId: player.id, userTag: player.userTag, role: "player" });
  const res = success<AuthResponse>({
    player: {
      id: player.id,
      userTag: player.userTag,
      displayName: player.displayName,
      role: "player",
      isGuest: true,
    },
  });
  setAuthCookie(token, res);
  return res;
}
