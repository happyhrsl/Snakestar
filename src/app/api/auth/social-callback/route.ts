// Purpose: Placeholder for OAuth social login callback handler
import { NextRequest } from "next/server";
import { success } from "@/lib/api-helpers";

export async function POST(_req: NextRequest) {
  // V1 placeholder — real implementation would exchange OAuth code for tokens
  return success({
    message:
      "Social login callback coming soon. In production this would exchange the OAuth code for user info and create/link an account.",
  });
}
