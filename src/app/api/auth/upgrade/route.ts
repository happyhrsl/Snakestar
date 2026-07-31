// Purpose: Upgrade a guest account to a full registered account
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createToken } from "@/lib/auth";
import { requireAuth, success, error, setAuthCookie } from "@/lib/api-helpers";
import { randomId } from "@/lib/utils";
import { COUNTRIES, PIN_LENGTH, MAX_USERNAME_LENGTH } from "@/lib/constants";
import type { AuthResponse } from "@/types/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DISPLAY_RE = /^[a-zA-Z0-9 ]{1,20}$/;
const PIN_RE = /^\d{4}$/;

export async function POST(req: NextRequest) {
  // Verify authentication
  const auth = await requireAuth(req);
  if (auth.error) return auth.error;

  const body = await req.json();
  const { email, password, displayName, country, pin } = body;

  // Fetch player and verify it's a guest
  const player = await db.player.findUnique({ where: { id: auth.player.playerId } });
  if (!player) return error("Player not found");
  if (player.passwordHash) return error("Account is already registered");

  // Validate email format
  if (!email || !EMAIL_RE.test(email)) return error("Invalid email format");

  // Validate password min 6 chars
  if (!password || password.length < 6) return error("Password must be at least 6 characters");

  // Validate displayName: 1-20 chars, alphanumeric + spaces
  if (!displayName || !DISPLAY_RE.test(displayName)) {
    return error(`Display name must be 1-${MAX_USERNAME_LENGTH} alphanumeric characters or spaces`);
  }

  // Validate country code exists
  const countryExists = COUNTRIES.some((c) => c.code === country);
  if (!country || !countryExists) return error("Invalid country code");

  // Validate PIN: exactly 4 digits if provided
  if (pin !== undefined && pin !== "" && !PIN_RE.test(pin)) {
    return error(`PIN must be exactly ${PIN_LENGTH} digits`);
  }

  // Check email not taken by another player
  const existing = await db.player.findUnique({ where: { email: email.toLowerCase() } });
  if (existing && existing.id !== player.id) return error("Email already registered");

  // Generate unique userTag if still generic
  let userTag = player.userTag;
  if (userTag.startsWith("GUEST") || !userTag) {
    let unique = false;
    while (!unique) {
      const candidate = randomId(8).toUpperCase();
      const tagExists = await db.player.findUnique({ where: { userTag: candidate } });
      if (!tagExists) { userTag = candidate; unique = true; }
    }
  }

  // Hash password and optional PIN
  const passwordHash = await bcrypt.hash(password, 10);
  const securityPinHash = pin ? await bcrypt.hash(pin, 10) : null;

  // Update player to registered account
  const updated = await db.player.update({
    where: { id: player.id },
    data: { email: email.toLowerCase(), passwordHash, displayName, country, userTag, securityPinHash },
  });

  // Create new JWT and set cookie
  const token = createToken({
    playerId: updated.id,
    userTag: updated.userTag,
    role: updated.role as "player" | "admin",
  });
  const res = success<AuthResponse>({
    player: {
      id: updated.id,
      userTag: updated.userTag,
      displayName: updated.displayName,
      role: updated.role as "player" | "admin",
      isGuest: false,
    },
  });
  setAuthCookie(token, res);
  return res;
}
