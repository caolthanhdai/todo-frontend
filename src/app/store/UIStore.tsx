import {create } from "zustand"

type UIState = {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  dark: boolean;
  setDark: (dark: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  mobileOpen: false,
  setMobileOpen: (open) => set({ mobileOpen: open }),
  dark: false,
  setDark: (dark) => set({ dark }),

}));
