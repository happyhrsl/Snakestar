"use client";

import { useAuthStore } from "@/stores/auth-store";
import { formatChips } from "@/lib/utils";
import { BentoGate } from "./bento-gate";
import {
  Compass, ShoppingBag, User, Trophy, Gift, Coins, Crown,
  Award, Shield, Sparkles, Film, Users,
} from "lucide-react";

const ACCENT = {
  indigo: { iconBg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400", borderHover: "hover:border-indigo-500/40", textHover: "group-hover:text-indigo-400", arrow: "text-indigo-400" },
  purple: { iconBg: "bg-purple-500/10 border-purple-500/20 text-purple-400", borderHover: "hover:border-purple-500/40", textHover: "group-hover:text-purple-400", arrow: "text-purple-400" },
  blue:   { iconBg: "bg-blue-500/10 border-blue-500/20 text-blue-400", borderHover: "hover:border-blue-500/40", textHover: "group-hover:text-blue-400", arrow: "text-blue-400" },
  amber:  { iconBg: "bg-amber-500/10 border-amber-500/20 text-amber-400", borderHover: "hover:border-amber-500/40", textHover: "group-hover:text-amber-400", arrow: "text-amber-400" },
  emerald:{ iconBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400", borderHover: "hover:border-emerald-500/40", textHover: "group-hover:text-emerald-400", arrow: "text-emerald-400" },
  cyan:   { iconBg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400", borderHover: "hover:border-cyan-500/40", textHover: "group-hover:text-cyan-400", arrow: "text-cyan-400" },
  rose:   { iconBg: "bg-rose-500/10 border-rose-500/20 text-rose-400", borderHover: "hover:border-rose-500/40", textHover: "group-hover:text-rose-400", arrow: "text-rose-400" },
  yellow: { iconBg: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400", borderHover: "hover:border-yellow-500/40", textHover: "group-hover:text-yellow-400", arrow: "text-yellow-400" },
  violet: { iconBg: "bg-violet-500/10 border-violet-500/20 text-violet-400", borderHover: "hover:border-violet-500/40", textHover: "group-hover:text-violet-400", arrow: "text-violet-400" },
  red:    { iconBg: "bg-red-500/10 border-red-500/20 text-red-400", borderHover: "hover:border-red-500/40", textHover: "group-hover:text-red-400", arrow: "text-red-400" },
  pink:   { iconBg: "bg-pink-500/10 border-pink-500/20 text-pink-400", borderHover: "hover:border-pink-500/40", textHover: "group-hover:text-pink-400", arrow: "text-pink-400" },
} as const;

export function BentoGrid({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const player = useAuthStore((s) => s.player);
  const p = player;

  const gates = [
    { icon: Compass, title: "Play Endless Arenas", desc: "Risk chips to compete in simulated multiplayer shards. Harvest dropping stars and escape safely.", footL: "STAKES FROM: 10 chips", footR: "Enter", accent: ACCENT.indigo, tab: "arena" },
    { icon: ShoppingBag, title: "Identity Workshop & Shop", desc: "Unlock glowing skins, trials, death burst novas, or design a custom repeating body segment sequence.", footL: p?.equippedCosmetics?.dna_skin ? "EQUIPPED: Custom DNA" : "EQUIPPED: Gallery Skin", footR: "Modify", accent: ACCENT.purple, tab: "shop" },
    { icon: User, title: "Challenger Dossier", desc: "Examine your records, high scores, total banked wealth, and change your operative callsign.", footL: `HIGH SCORE: ${formatChips(p?.bestScore || 0)}`, footR: "Inspect", accent: ACCENT.blue, tab: "profile" },
    { icon: Trophy, title: "Global Standings", desc: "Track rank placements and compare your banked chip balance against other elite venom snake operators.", footL: "LEADERBOARD RANK: Tier 1", footR: "View", accent: ACCENT.amber, tab: "leaderboard" },
    { icon: Gift, title: "Daily Free Claims", desc: "Secure your complimentary login chips. Claim hourly or daily packages to rebuild your wallet!", footL: `STREAK: ${p?.totalMatches ? Math.max(1, Math.floor(p.totalMatches / 3)) : 1} Days`, footR: "Claim", accent: ACCENT.emerald, tab: "rewards" },
    { icon: Coins, title: "Virtual Chip Store", desc: "Acquire secure safe-guarded chip packs immediately to compete in high-stakes premium arena tables.", footL: `WALLET: ${formatChips(p?.walletChips || 0)} c`, footR: "Shop", accent: ACCENT.cyan, tab: "store" },
    { icon: Crown, title: "Championships", desc: "Enter elite championship events. Compete against top-ranked operators for massive chip prizes and exclusive titles.", footL: "SEASONAL EVENTS", footR: "Compete", accent: ACCENT.rose, tab: "championships" },
    { icon: Award, title: "Hall of Fame", desc: "View legendary players and record-breaking performances. The greatest venom operators of all time.", footL: "LEGENDARY RANKINGS", footR: "View Legends", accent: ACCENT.yellow, tab: "halloffame" },
    { icon: Shield, title: "Syndicates", desc: "Create or join a syndicate. Team up with allies, pool resources, and dominate arenas together.", footL: "CLAN WARFARE", footR: "Assemble", accent: ACCENT.violet, tab: "clans" },
    { icon: Sparkles, title: "Season Pass", desc: "Track your seasonal progression. Unlock exclusive rewards, cosmetics, and bonus chip multipliers as you level up.", footL: "FREE TIER REWARDS", footR: "Progress", accent: ACCENT.pink, tab: "seasonpass" },
    { icon: Film, title: "Highlights", desc: "Watch and share your greatest moments. Review match replays, clutch extractions, and legendary eliminations.", footL: "MATCH HIGHLIGHTS", footR: "Watch", accent: ACCENT.red, tab: "clips" },
    { icon: Users, title: "Friends, Global Search & Syndicate Hub", desc: "Search and connect with players globally by tag or country flag, send daily chip gifts, spectate matches, and create co-op team codes!", footL: "GLOBAL PLAYER NETWORK READY", footR: "Search & Connect", accent: ACCENT.violet, tab: "social", wide: true },
  ];

  return (
    <>
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1 mb-3">
        Lobby Stations
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {gates.map((g) => (
          <BentoGate
            key={g.tab}
            icon={g.icon}
            title={g.title}
            description={g.desc}
            footLeft={g.footL}
            footRight={g.footR}
            accent={g.accent}
            wide={g.wide}
            onClick={() => onTabChange(g.tab)}
          />
        ))}
      </div>
    </>
  );
}
