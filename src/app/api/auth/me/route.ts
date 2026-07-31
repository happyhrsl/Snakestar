// Purpose: Return the authenticated player's full profile data
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireAuth, success } from "@/lib/api-helpers";
import { toFullPlayer } from "@/lib/player-helpers";

export async function GET(req: NextRequest) {
  // Verify authentication
  const auth = await requireAuth(req);
  if (auth.error) return auth.error;

  // Fetch full player from DB
  const player = await db.player.findUnique({ where: { id: auth.player.playerId } });
  if (!player) return { success: false, error: "Player not found" } as ReturnType<typeof success>;

  // Update last login timestamp
  await db.player.update({
    where: { id: player.id },
    data: { lastLoginAt: new Date() },
  });

  // Return full player data (with wallet, email, etc.)
  return success(toFullPlayer(player));
}
