"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { ChallengeDisplay } from "@/types/player";
import { Loader2, ListTodo, Sparkles, Sunrise, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ChallengesSidebar() {
  const [missions, setMissions] = useState<ChallengeDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [streakMult, setStreakMult] = useState(1);

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const res = await fetch("/api/player/challenges");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setMissions(data.data?.missions || []);
            setStreak(data.data?.streak || 0);
            setStreakMult(data.data?.streakMultiplier || 1);
          }
        }
      } catch {
        // handle gracefully
      } finally {
        setLoading(false);
      }
    }
    fetchChallenges();
  }, []);

  const dailies = missions.filter((m) => m.type === "daily");
  const weeklies = missions.filter((m) => m.type === "weekly");

  async function handleClaim(m: ChallengeDisplay) {
    try {
      const res = await fetch("/api/player/challenges/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: m.id }),
      });
      if (res.ok) {
        setMissions((prev) => prev.map((c) => (c.id === m.id ? { ...c, claimed: true } : c)));
        toast.success(`Claimed +${m.chipReward} chips!`);
      }
    } catch {
      // silent
    }
  }

  return (
    <section aria-label="Tactical challenges" className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ListTodo className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Tactical Challenges</span>
        </div>
        {streakMult > 1 ? (
          <span className="text-[9px] font-mono text-amber-400 font-bold">🔥 {streak}d streak ×{streakMult}</span>
        ) : (
          <Sparkles className="h-4 w-4 text-emerald-400" />
        )}
      </div>

      {/* Loading / Empty */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />
          <p className="text-xs text-slate-400 mt-2">Loading challenges…</p>
        </div>
      )}
      {!loading && missions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-xs text-slate-500">No challenges available right now.</p>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-4 max-h-[480px] overflow-y-auto pr-1">
        {dailies.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Sunrise className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                Daily Challenges ({dailies.length})
              </span>
              <span className="text-[9px] font-mono text-slate-600 ml-auto">Resets daily at UTC midnight</span>
            </div>
            {dailies.map(renderChallenge)}
          </div>
        )}
        {weeklies.length > 0 && (
          <div className="border-t border-slate-800 pt-3 mt-1">
            <div className="flex items-center gap-1.5 mb-2">
              <Star className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">
                Weekly Challenges ({weeklies.length})
              </span>
              <span className="text-[9px] font-mono text-slate-600 ml-auto">Resets every Monday UTC</span>
            </div>
            {weeklies.map(renderChallenge)}
          </div>
        )}
      </div>
    </section>
  );

  function renderChallenge(m: ChallengeDisplay) {
    const pct = Math.min(100, Math.floor((m.progress / m.target) * 100));
    const isWeekly = m.type === "weekly";
    const barColor = m.claimed
      ? "bg-emerald-600"
      : m.completed
        ? "bg-gradient-to-r from-emerald-400 to-teal-500"
        : isWeekly
          ? "bg-gradient-to-r from-violet-500 to-purple-500"
          : "bg-gradient-to-r from-amber-500 to-orange-500";

    return (
      <div key={m.id} className={cn("p-3.5 bg-slate-950/90 rounded-xl border flex flex-col gap-2.5", isWeekly ? "border-violet-500/20" : "border-slate-800")}>
        <p className="text-xs font-bold text-white leading-snug">{m.title}</p>
        <p className="text-[10.5px] text-slate-400 mt-1 leading-normal">{m.description}</p>
        <div className="text-[10px] font-mono text-slate-500 flex justify-between">
          <span>PROGRESS:</span>
          <span>{m.progress} / {m.target} ({pct}%)</span>
        </div>
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/60">
          <div className={cn("h-full rounded-full transition-all duration-300", barColor)} style={{ width: `${pct}%` }} />
        </div>
        <div className="flex items-center justify-between border-t border-slate-900/40 pt-2 mt-1">
          <span className="text-[10px] font-mono font-bold text-emerald-400">+{m.chipReward} CHIPS</span>
          {m.claimed ? (
            <span className="px-3 py-1 rounded-lg text-[10px] font-bold bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed">
              Claimed ✓
            </span>
          ) : m.completed ? (
            <Button size="sm" className="px-3 py-1 h-auto text-[10px] font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-black shadow shadow-emerald-950/20" onClick={() => handleClaim(m)}>
              Claim
            </Button>
          ) : (
            <span className="px-3 py-1 rounded-lg text-[10px] font-bold bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed">
              Claim
            </span>
          )}
        </div>
      </div>
    );
  }
}
