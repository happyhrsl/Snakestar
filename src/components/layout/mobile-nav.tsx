"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import {
  LayoutDashboard,
  Swords,
  Trophy,
  User,
 MoreHorizontal,
  Crown,
  Shield,
  Users,
  Building2,
  Star,
  Vault,
  Film,
  BookOpen,
  Settings,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const MAIN_TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "arena", label: "Arena", icon: Swords },
  { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  { id: "profile", label: "Profile", icon: User },
  { id: "_more", label: "More", icon: MoreHorizontal },
] as const;

const MORE_TABS = [
  { id: "championships", label: "Championship", icon: Crown },
  { id: "halloffame", label: "Hall of Fame", icon: Shield },
  { id: "social", label: "Social", icon: Users },
  { id: "clans", label: "Syndicates", icon: Building2 },
  { id: "seasonpass", label: "Pass", icon: Star },
  { id: "store", label: "Store", icon: Vault },
  { id: "clips", label: "Highlights", icon: Film },
  { id: "rules", label: "Rules", icon: BookOpen },
  { id: "admin", label: "Admin", icon: Settings, adminOnly: true },
] as const;

export function MobileNav({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const player = useAuthStore((s) => s.player);
  const isAdmin = player?.role === "admin";

  function handleTabClick(tabId: string) {
    if (tabId === "_more") {
      setMoreOpen(true);
      return;
    }
    onTabChange(tabId);
  }

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-t border-slate-800/60 h-14 flex items-center justify-around px-2">
        {MAIN_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 flex-1 py-1 rounded-lg transition-colors",
                isActive ? "text-emerald-400" : "text-slate-500"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl max-h-[60vh]">
          <SheetHeader>
            <SheetTitle className="text-left">More</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-4 gap-3 py-4">
            {MORE_TABS.map((tab) => {
              if (tab.adminOnly && !isAdmin) return null;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { onTabChange(tab.id); setMoreOpen(false); }}
                  className="flex flex-col items-center gap-2 py-3 rounded-xl hover:bg-slate-800/40 transition-colors"
                >
                  <Icon className="h-6 w-6 text-slate-300" />
                  <span className="text-[10px] text-slate-400">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
