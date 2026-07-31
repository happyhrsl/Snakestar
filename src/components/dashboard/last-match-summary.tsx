"use client";

import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

export function LastMatchSummary({ onLaunch }: { onLaunch: () => void }) {
  // For V1, show a placeholder card
  // Real implementation would fetch from player data
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 shadow-xl"
    >
      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
        Last Match
      </p>
      <div className="text-center py-6 space-y-3">
        <p className="text-3xl">🐍</p>
        <p className="text-sm text-slate-400">
          No matches yet. Jump into the arena!
        </p>
        <Button
          onClick={onLaunch}
          size="sm"
          className="gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
        >
          <Play className="h-3 w-3 fill-current" /> LAUNCH MATCHMAKER
        </Button>
      </div>
    </motion.div>
  );
}
