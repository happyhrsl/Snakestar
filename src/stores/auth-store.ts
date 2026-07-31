// Purpose: Zustand store for player session state
import { create } from "zustand";
import type { FullPlayer, PublicPlayer } from "@/types/player";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthState {
  // State
  player: FullPlayer | null;
  status: AuthStatus;

  // Actions
  setPlayer: (player: FullPlayer) => void;
  setLoading: () => void;
  logout: () => void;
  updatePlayer: (partial: Partial<FullPlayer>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  player: null,
  status: "loading",

  setPlayer: (player) => set({ player, status: "authenticated" }),
  setLoading: () => set({ status: "loading" }),
  logout: () => set({ player: null, status: "unauthenticated" }),
  updatePlayer: (partial) =>
    set((state) => ({
      player: state.player ? { ...state.player, ...partial } : null,
    })),
}));
