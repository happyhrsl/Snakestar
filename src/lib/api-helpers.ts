// Purpose: Shared helpers for all API routes — auth guard, response formatters, rate limiter
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromCookies, type JwtPayload } from "@/lib/auth";
import { db } from "@/lib/db";
import type { ApiResponse } from "@/types/api";

// --- Auth guard ---

// Purpose: Verify JWT and return player data, or 401
export async function requireAuth(
  req: NextRequest
): Promise<{ player: JwtPayload; error: NextResponse } | { player: JwtPayload; error?: never }> {
  const token = getTokenFromCookies(req.cookies);
  if (!token) {
    return { player: null as unknown as JwtPayload, error: unauthorized("Not authenticated") };
  }
  const payload = verifyToken(token);
  if (!payload) {
    return { player: null as unknown as JwtPayload, error: unauthorized("Invalid or expired token") };
  }
  return { player: payload };
}

// Purpose: Same as requireAuth but also checks admin role
export async function requireAdmin(
  req: NextRequest
): Promise<{ player: JwtPayload; error?: never } | { player: JwtPayload; error: NextResponse }> {
  const result = await requireAuth(req);
  if (result.error) return result;
  if (result.player.role !== "admin") {
    return { player: null as unknown as JwtPayload, error: forbidden("Admin access required") };
  }
  return result;
}

// --- Response helpers ---

// Purpose: Success response with data
export function success<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

// Purpose: Error response with message
export function error(message: string, status = 400): NextResponse<ApiResponse> {
  return NextResponse.json({ success: false, error: message }, { status });
}

// Purpose: Shorthand for common HTTP errors
export function unauthorized(message = "Unauthorized"): NextResponse<ApiResponse> {
  return NextResponse.json({ success: false, error: message }, { status: 401 });
}

export function forbidden(message = "Forbidden"): NextResponse<ApiResponse> {
  return NextResponse.json({ success: false, error: message }, { status: 403 });
}

export function notFound(message = "Not found"): NextResponse<ApiResponse> {
  return NextResponse.json({ success: false, error: message }, { status: 404 });
}

export function tooManyRequests(retryAfter = 60): NextResponse<ApiResponse> {
  return NextResponse.json(
    { success: false, error: "Too many requests" },
    { status: 429, headers: { "Retry-After": String(retryAfter) } }
  );
}

// --- Rate limiter (in-memory) ---

interface RateEntry {
  count: number;
  resetAt: number;
}

const rateMap = new Map<string, RateEntry>();

// Purpose: Check if a key has exceeded its rate limit. Call before processing.
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const entry = rateMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + windowMs });
    return false; // under limit
  }
  entry.count++;
  return entry.count > maxRequests; // true = over limit
}

// Purpose: Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateMap) {
    if (now > entry.resetAt) rateMap.delete(key);
  }
}, 300_000);

// --- Cookie helpers ---

// Purpose: Set JWT in httpOnly cookie
export function setAuthCookie(token: string, response: NextResponse): void {
  response.cookies.set("snakestar-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

// Purpose: Clear JWT cookie (logout)
export function clearAuthCookie(response: NextResponse): void {
  response.cookies.delete("snakestar-token");
}
