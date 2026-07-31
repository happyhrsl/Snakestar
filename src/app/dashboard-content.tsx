"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Footer } from "@/components/layout/footer";
import { SubPageNav } from "@/components/layout/sub-page-nav";
import { HeroBanner } from "@/components/dashboard/hero-banner";
import { BentoGrid } from "@/components/dashboard/bento-grid";
import { ChallengesSidebar } from "@/components/dashboard/challenges-sidebar";
import { NotSignedIn } from "@/components/shared/not-signed-in";

export function DashboardContent() {
  const player = useAuthStore((s) => s.player);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLaunchMatchmaker = () => setActiveTab("arena");

  if (!player) return <NotSignedIn featureName={"Dashboard"} />;

  const isDashboard = activeTab === "dashboard";

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
            {!isDashboard && (
              <SubPageNav title={activeTab} onBack={() => setActiveTab("dashboard")} />
            )}

            {isDashboard ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <HeroBanner onLaunchMatchmaker={handleLaunchMatchmaker} />
                  <BentoGrid onTabChange={handleTabChange} />
                </div>
                <div className="lg:col-span-4 flex flex-col gap-4">
                  <ChallengesSidebar />
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg font-bold text-slate-300">{activeTab.toUpperCase()}</p>
                <p className="text-sm text-slate-500 mt-2">This section is coming in the next phase.</p>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className="mt-4 text-emerald-400 text-sm hover:underline"
                >
                  ← Back to Dashboard
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <div className="pb-16 lg:pb-0">
        <Footer />
      </div>

      <MobileNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
