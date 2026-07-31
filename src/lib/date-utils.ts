// Purpose: Date/time utilities — all server timestamps are UTC
import { formatDistanceToNow, format } from "date-fns";

// Purpose: Get the start of today in UTC (for daily reward reset at 00:00 UTC)
export function utcTodayStart(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

// Purpose: Get the start of this week (Monday) in UTC
export function utcWeekStart(): Date {
  const now = new Date();
  const day = now.getUTCDay();
  const diff = day === 0 ? 6 : day - 1; // Monday = 0
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() - diff);
  monday.setUTCHours(0, 0, 0, 0);
  return monday;
}

// Purpose: Get current calendar year
export function currentYear(): number {
  return new Date().getUTCFullYear();
}

// Purpose: Format a date for display in user's local timezone
export function formatLocal(date: string | Date, pattern = "MMM d, yyyy"): string {
  return format(new Date(date), pattern);
}

// Purpose: Relative time string (e.g., "3 minutes ago")
export function timeAgo(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

// Purpose: Check if a date is today (UTC)
export function isUtcToday(date: string | Date): boolean {
  const d = new Date(date);
  const today = utcTodayStart();
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  return d >= today && d < tomorrow;
}
