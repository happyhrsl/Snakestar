// Purpose: Placeholder for OAuth social login (Google/Facebook/Apple)
import { NextRequest } from "next/server";
import { success } from "@/lib/api-helpers";

export async function GET(_req: NextRequest) {
  // V1 placeholder — real implementation would redirect to OAuth provider
  return success({
    message:
      "Social login coming soon. In production this would redirect to the OAuth provider (Google, Facebook, Apple).",
  });
}
