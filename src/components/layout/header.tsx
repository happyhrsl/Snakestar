"use client";

import { useAuthStore } from "@/stores/auth-store";
import { shortChips } from "@/lib/utils";
import { APP_NAME, AVATAR_PRESETS } from "@/lib/constants";
import { Coins, Settings, LogOut, Skull } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function Header() {
  const { player, logout } = useAuthStore();

  if (!player) return null;

  const avatarPreset = AVATAR_PRESETS.find((a) => a.id === player.avatarPreset);
  const avatarDisplay = avatarPreset?.emoji || player.avatarUrl || player.level;
  const isUrl = typeof avatarDisplay === "string" && (avatarDisplay.startsWith("http") || avatarDisplay.startsWith("data:"));

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <button className="flex items-center gap-2.5 group" aria-label="Return to lobby dashboard">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-500 border border-emerald-400/20 shadow-lg shadow-emerald-950/40 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Skull className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight text-white uppercase group-hover:text-emerald-400 transition-colors">
                {APP_NAME}
              </span>
              <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500 text-white font-bold rounded-full leading-none tracking-widest font-mono">
                Arena
              </span>
            </div>
            <span className="text-[10px] text-slate-500 block font-mono">195 Countries. One Champion.</span>
          </div>
        </button>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Player badge */}
          <div className="bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-xl flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800/80 overflow-hidden shrink-0 shadow-inner flex items-center justify-center">
              {isUrl ? (
                <img src={avatarDisplay as string} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : typeof avatarDisplay === "string" && avatarDisplay.length <= 2 ? (
                <span className="text-sm">{avatarDisplay}</span>
              ) : (
                <span className="text-[10px] font-mono font-bold text-slate-400">{player.level}</span>
              )}
            </div>
            <div className="hidden md:block">
              <p className="text-[9px] text-slate-500 uppercase font-semibold">Challenger (Lvl {player.level})</p>
              <p className="text-xs font-bold text-white truncate max-w-28">{player.displayName}</p>
            </div>
          </div>

          {/* Chips wallet */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl flex items-center gap-2">
            <Coins className="h-4 w-4 text-emerald-400 animate-pulse" />
            <div>
              <p className="text-[9px] text-emerald-500/60 uppercase font-semibold hidden sm:block">Secure Chips</p>
              <p className="text-sm font-bold font-mono text-emerald-400 tabular-nums">{shortChips(player.walletChips)}</p>
            </div>
          </div>

          {/* Settings & Logout */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-slate-400 hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-red-400 hover:bg-red-950/40"
            onClick={() => { logout(); toast.success("Secure session disconnected."); }}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
