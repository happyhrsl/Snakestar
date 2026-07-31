// Purpose: Allow authenticated player to change their password
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { requireAuth, success, error } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  // Verify authentication
  const auth = await requireAuth(req);
  if (auth.error) return auth.error;

  const body = await req.json();
  const { currentPassword, newPassword } = body;

  // Validate required fields
  if (!currentPassword || !newPassword) return error("Current and new password are required");

  // Validate new password min 6 chars
  if (newPassword.length < 6) return error("New password must be at least 6 characters");

  // Fetch player with password hash
  const player = await db.player.findUnique({ where: { id: auth.player.playerId } });
  if (!player || !player.passwordHash) return error("Account has no password set");

  // Verify current password
  const valid = await bcrypt.compare(currentPassword, player.passwordHash);
  if (!valid) return error("Current password is incorrect");

  // Hash and update new password
  const newHash = await bcrypt.hash(newPassword, 10);
  await db.player.update({
    where: { id: player.id },
    data: { passwordHash: newHash },
  });

  return success({ message: "Password changed successfully" });
}
