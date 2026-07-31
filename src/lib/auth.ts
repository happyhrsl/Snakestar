// Purpose: JWT token creation and verification for auth
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "snakestar-dev-secret-change-in-production";
const JWT_EXPIRY = "7d";

// Payload stored in JWT — keep minimal
export interface JwtPayload {
  playerId: string;
  userTag: string;
  role: "player" | "admin";
}

// Purpose: Create a JWT token for a player session
export function createToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

// Purpose: Verify a JWT token and return payload
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

// Purpose: Extract JWT from request cookies (handles Next.js ReadonlyRequestCookies and plain objects)
export function getTokenFromCookies(
  cookies: Record<string, string | undefined> | { get: (name: string) => { value: string } | undefined }
): string | null {
  // Next.js 16: req.cookies is a ReadonlyRequestCookies with .get() method
  if (typeof cookies.get === 'function') {
    return cookies.get('snakestar-token')?.value ?? null;
  }
  return cookies['snakestar-token'] ?? null;
}