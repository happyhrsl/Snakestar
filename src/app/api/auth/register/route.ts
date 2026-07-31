// Purpose: Register a new player account with email, password, display name, country, optional PIN
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createToken } from "@/lib/auth";
import { success, error, checkRateLimit, setAuthCookie, tooManyRequests } from "@/lib/api-helpers";
import { randomId } from "@/lib/utils";
import { COUNTRIES, PIN_LENGTH, MAX_USERNAME_LENGTH } from "@/lib/constants";
import type { AuthResponse } from "@/types/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DISPLAY_RE = /^[a-zA-Z0-9 ]{1,20}$/;
const PIN_RE = /^\d{4}$/;

export async function POST(req: NextRequest) {
  // Rate limit: 3 registrations per hour per IP
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (checkRateLimit(`register:${ip}`, 3, 3_600_000)) return tooManyRequests(3600);

  const body = await req.json();
  const { email, password, displayName, country, pin } = body;

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

  // Check email not already taken
  const existing = await db.player.findUnique({ where: { email: email.toLowerCase() } });
  if (existing) return error("Email already registered");

  // Generate unique userTag
  let userTag: string;
  let unique = false;
  while (!unique) {
    userTag = randomId(8).toUpperCase();
    const tagExists = await db.player.findUnique({ where: { userTag } });
    if (!tagExists) unique = true;
  }

  // Hash password and optional PIN
  const passwordHash = await bcrypt.hash(password, 10);
  const securityPinHash = pin ? await bcrypt.hash(pin, 10) : null;

  // Create player with starting chips and defaults
  const player = await db.player.create({
    data: {
      email: email.toLowerCase(),
      passwordHash,
      displayName,
      country,
      userTag: userTag!,
      securityPinHash,
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
      isGuest: false,
    },
  });
  setAuthCookie(token, res);
  return res;
}
