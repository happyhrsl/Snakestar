"use client";

import { useAuthStore } from "@/stores/auth-store";
import { Play, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function xpForLevel(level: number): number {
  return level * 200;
}

export function HeroBanner({ onLaunchMatchmaker }: { onLaunchMatchmaker: () => void }) {
  const player = useAuthStore((s) => s.player);
  const name = player?.displayName || "Guest";
  const level = player?.level || 1;
  const xp = player?.xp || 0;
  const isGuest = player?.isGuest ?? true;

  const xpThisLevel = xpForLevel(level);
  const xpNextLevel = xpForLevel(level + 1);
  const xpIntoLevel = Math.max(0, xp - xpThisLevel);
  const xpSpan = Math.max(1, xpNextLevel - xpThisLevel);
  const xpPercent = Math.min(100, Math.floor((xpIntoLevel / xpSpan) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950/40 border border-emerald-500/10 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6"
    >
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Welcome block */}
      <div className="relative flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-amber-500 border border-emerald-400/20 shadow-lg shadow-emerald-950/40 flex items-center justify-center shrink-0">
          <Award className="w-7 h-7 text-white animate-pulse" />
        </div>
        <div>
          <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-widest block uppercase">
            Lobby Headquarters
          </span>
          <h2 className="text-xl font-black text-white tracking-tight mt-0.5">
            {isGuest ? "WELCOME, GUEST!" : `WELCOME BACK, ${name.toUpperCase()}`}
          </h2>
          {/* XP bar */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] font-mono text-slate-400">LVL {level}</span>
            <div className="w-36 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <span className="text-[9px] font-mono text-slate-500">
              {xpIntoLevel} / {xpSpan} XP
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Button
        onClick={onLaunchMatchmaker}
        className="relative shrink-0 self-stretch sm:self-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs gap-2 shadow-lg shadow-emerald-950/40 border border-emerald-500 px-5 py-3 rounded-xl h-auto"
      >
        <Play className="h-3.5 w-3.5 fill-current" />
        LAUNCH MATCHMAKER
      </Button>
    </motion.div>
  );
}
