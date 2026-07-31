// Purpose: Clear the auth cookie to log the player out
import { NextRequest } from "next/server";
import { success, clearAuthCookie } from "@/lib/api-helpers";

export async function POST(_req: NextRequest) {
  const res = success({ message: "Logged out" });
  clearAuthCookie(res);
  return res;
}
