"use client";

import { ChevronLeft } from "lucide-react";

export function SubPageNav({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 transition-all cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4 text-emerald-400" />
        Lobby HQ
      </button>
      <span className="text-[10px] text-slate-500 font-mono hidden sm:block">
        STATION / {title.toUpperCase()}
      </span>
    </div>
  );
}
