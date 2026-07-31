// Purpose: Authenticate a registered player with email and password
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createToken } from "@/lib/auth";
import { success, error, checkRateLimit, setAuthCookie, tooManyRequests } from "@/lib/api-helpers";
import type { AuthResponse } from "@/types/api";

export async function POST(req: NextRequest) {
  // Rate limit: 5 login attempts per minute per IP
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (checkRateLimit(`login:${ip}`, 5, 60_000)) return tooManyRequests(60);

  const body = await req.json();
  const { email, password } = body;

  // Validate required fields
  if (!email || !password) return error("Email and password are required");

  // Find player by email
  const player = await db.player.findUnique({ where: { email: email.toLowerCase() } });
  if (!player || !player.passwordHash) return error("Invalid email or password");

  // Verify password
  const valid = await bcrypt.compare(password, player.passwordHash);
  if (!valid) return error("Invalid email or password");

  // Check if banned
  if (player.banned) return error("Your account has been banned");

  // Update last login timestamp
  await db.player.update({
    where: { id: player.id },
    data: { lastLoginAt: new Date() },
  });

  // Create JWT and set cookie
  const token = createToken({
    playerId: player.id,
    userTag: player.userTag,
    role: player.role as "player" | "admin",
  });
  const res = success<AuthResponse>({
    player: {
      id: player.id,
      userTag: player.userTag,
      displayName: player.displayName,
      role: player.role as "player" | "admin",
      isGuest: false,
    },
  });
  setAuthCookie(token, res);
  return res;
}
