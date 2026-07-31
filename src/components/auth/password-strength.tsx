"use client";

import { cn } from "@/lib/utils";

export function PasswordStrength({ password }: { password: string }) {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const width = score <= 1 ? "w-1/4" : score === 2 ? "w-2/4" : score === 3 ? "w-3/4" : "w-full";
  const color =
    score <= 1 ? "bg-red-500" : score === 2 ? "bg-orange-500" : score === 3 ? "bg-yellow-500" : "bg-emerald-500";
  const textColor =
    score < 2 ? "text-red-500" : score < 3 ? "text-yellow-500" : "text-emerald-500";
  const label = score <= 1 ? "Weak" : score === 2 ? "Fair" : score === 3 ? "Good" : "Strong";

  if (password.length === 0) return null;

  return (
    <div className="space-y-1">
      <div className="h-1.5 w-full rounded-full bg-muted">
        <div className={cn("h-full rounded-full transition-all duration-300", color, width)} />
      </div>
      <p className="text-[10px] text-muted-foreground">
        Strength: <span className={cn("font-semibold", textColor)}>{label}</span>
      </p>
    </div>
  );
}
