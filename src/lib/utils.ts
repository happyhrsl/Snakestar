// Purpose: Shared utility functions — Tailwind merge, formatting, helpers
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MILESTONE_BADGES } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Purpose: Clamp a number between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// Purpose: Generate a random alphanumeric string
export function randomId(length = 12): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Purpose: Format large chip numbers with Indian commas (e.g., 1,23,456)
export function formatChips(n: number): string {
  return n.toLocaleString("en-IN");
}

// Purpose: Shorten large chip numbers (1.2K, 3.5L, 2.5Cr)
export function shortChips(n: number): string {
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

// Purpose: Format seconds into mm:ss or hh:mm:ss
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Purpose: Calculate milestone badge from wallet chips
export function getMilestoneBadge(walletChips: number): string {
  let badge = MILESTONE_BADGES[0].name;
  for (const b of MILESTONE_BADGES) {
    if (walletChips >= b.minWalletChips) badge = b.name;
  }
  return badge;
}