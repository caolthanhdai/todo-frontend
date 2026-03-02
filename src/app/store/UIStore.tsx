import { create } from "zustand"
import { NotificationItem } from "@/types/type"

type UIState = {
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
  dark: boolean
  setDark: (dark: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  mobileOpen: false,
  setMobileOpen: (open) => set({ mobileOpen: open }),
  dark: false,
  setDark: (dark) => set({ dark }),
}))

interface NotificationStore {
  unread: number
  items: NotificationItem[]
  open: boolean

  add: (n: NotificationItem) => void
  openPanel: () => void
  closePanel: () => void
  markReadAll: () => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  unread: 0,
  items: [],
  open: false,

  add: (n) =>
    set((s) => ({
      unread: s.unread + 1,
      items: [n, ...s.items],
    })),

  openPanel: () => set({ open: true }),
  closePanel: () => set({ open: false }),

  markReadAll: () => set({ unread: 0 }),
}))
