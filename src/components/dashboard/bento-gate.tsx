"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Accent {
  iconBg: string;
  borderHover: string;
  textHover: string;
  arrow: string;
}

export function BentoGate({
  icon: Icon,
  title,
  description,
  footLeft,
  footRight,
  accent,
  wide,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  footLeft: string;
  footRight: string;
  accent: Accent;
  wide?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        "p-5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 rounded-2xl cursor-pointer transition-all duration-300 group shadow-md flex flex-col justify-between h-44 text-left",
        accent.borderHover,
        wide && "sm:col-span-2"
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("w-10 h-10 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform", accent.iconBg)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <p className={cn("text-sm font-bold text-white transition-colors", accent.textHover)}>{title}</p>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{description}</p>
      </div>
      <div className="flex items-center justify-between border-t border-slate-800/40 pt-2 mt-auto">
        <span className="text-[10px] font-mono text-slate-500 truncate pr-2">{footLeft}</span>
        <span className={cn("text-[10px] font-mono group-hover:translate-x-1 transition-transform shrink-0", accent.arrow)}>
          {footRight} →
        </span>
      </div>
    </motion.button>
  );
}
