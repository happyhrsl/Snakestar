// Purpose: Refresh/extend the JWT token for the authenticated player
import { NextRequest } from "next/server";
import { createToken } from "@/lib/auth";
import { requireAuth, success, setAuthCookie } from "@/lib/api-helpers";
import type { AuthResponse } from "@/types/api";

export async function POST(req: NextRequest) {
  // Verify authentication
  const auth = await requireAuth(req);
  if (auth.error) return auth.error;

  // Create new token with same payload
  const token = createToken({
    playerId: auth.player.playerId,
    userTag: auth.player.userTag,
    role: auth.player.role,
  });

  // Set new cookie and return
  const res = success<AuthResponse>({
    player: {
      id: auth.player.playerId,
      userTag: auth.player.userTag,
      displayName: "", // minimal — client will /me for full data
      role: auth.player.role,
      isGuest: false,
    },
  });
  setAuthCookie(token, res);
  return res;
}
