"use client";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import {
  LayoutDashboard,
  Swords,
  Trophy,
  Crown,
  Shield,
  User,
  Users,
  Building2,
  Star,
  Vault,
  Film,
  BookOpen,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "arena", label: "Arena", icon: Swords },
  { id: "leaderboard", label: "Leaderboards", icon: Trophy },
  { id: "championships", label: "Championship", icon: Crown },
  { id: "halloffame", label: "Hall of Fame", icon: Shield },
  { id: "profile", label: "Dossier", icon: User },
  { id: "social", label: "Social", icon: Users },
  { id: "clans", label: "Syndicates", icon: Building2 },
  { id: "seasonpass", label: "Pass", icon: Star },
  { id: "store", label: "Store", icon: Vault },
  { id: "clips", label: "Highlights", icon: Film },
  { id: "rules", label: "Rules", icon: BookOpen },
  { id: "admin", label: "Admin", icon: Settings, adminOnly: true },
] as const;

export function Sidebar({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  const player = useAuthStore((s) => s.player);
  const isAdmin = player?.role === "admin";

  return (
    <aside className="hidden lg:flex flex-col w-60 border-r border-slate-800/60 bg-slate-950/60 py-4 px-3 overflow-y-auto shrink-0">
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          if (item.adminOnly && !isAdmin) return null;
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer",
                isActive
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
