// Purpose: Fetch current player on mount, provide auth state to entire app
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setPlayer, setLoading, logout } = useAuthStore();

  useEffect(() => {
    // Check if user has a valid session on mount
    async function fetchMe() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          logout();
          return;
        }
        const json = await res.json();
        if (json.success && json.data) {
          setPlayer(json.data);
        } else {
          logout();
        }
      } catch {
        logout();
      }
    }
    fetchMe();
  }, [setPlayer, setLoading, logout]);

  return <>{children}</>;
}
