// Purpose: Reset password using email + security PIN verification
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { success, error, checkRateLimit, tooManyRequests } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  // Rate limit: 5 attempts per hour per IP
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (checkRateLimit(`forgot:${ip}`, 5, 3_600_000)) return tooManyRequests(3600);

  const body = await req.json();
  const { email, pin, newPassword } = body;

  // Validate required fields
  if (!email || !pin || !newPassword) return error("Email, PIN, and new password are required");

  // Validate new password min 6 chars
  if (newPassword.length < 6) return error("New password must be at least 6 characters");

  // Find player by email
  const player = await db.player.findUnique({ where: { email: email.toLowerCase() } });
  if (!player) return error("No account found with that email");

  // Check player has a security PIN set
  if (!player.securityPinHash) return error("No PIN set for account recovery");

  // Verify PIN
  const valid = await bcrypt.compare(pin, player.securityPinHash);
  if (!valid) return error("Incorrect PIN");

  // Hash and update new password
  const newHash = await bcrypt.hash(newPassword, 10);
  await db.player.update({
    where: { id: player.id },
    data: { passwordHash: newHash },
  });

  return success({ message: "Password reset successfully" });
}
