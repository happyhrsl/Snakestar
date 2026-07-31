// Purpose: Allow authenticated player to set or change their security PIN
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { requireAuth, success, error } from "@/lib/api-helpers";
import { PIN_LENGTH } from "@/lib/constants";

const PIN_RE = /^\d{4}$/;

export async function POST(req: NextRequest) {
  // Verify authentication
  const auth = await requireAuth(req);
  if (auth.error) return auth.error;

  const body = await req.json();
  const { currentPin, newPin } = body;

  // Validate new PIN: exactly 4 digits
  if (!newPin || !PIN_RE.test(newPin)) {
    return error(`PIN must be exactly ${PIN_LENGTH} digits`);
  }

  // Fetch player
  const player = await db.player.findUnique({ where: { id: auth.player.playerId } });
  if (!player) return error("Player not found");

  // If player already has a PIN, verify the current one
  if (player.securityPinHash) {
    if (!currentPin) return error("Current PIN is required to change it");
    const valid = await bcrypt.compare(currentPin, player.securityPinHash);
    if (!valid) return error("Current PIN is incorrect");
  }

  // Hash and update the new PIN
  const newHash = await bcrypt.hash(newPin, 10);
  await db.player.update({
    where: { id: player.id },
    data: { securityPinHash: newHash },
  });

  return success({ message: "PIN updated successfully" });
}
