"use client"

import Image from "next/image"
import { Calendar, MessageQuestion, Notification, SearchNormal, HambergerMenu } from "iconsax-react"
import { useEffect, useRef, useState } from "react"
import { TaskSearchResponseDto, UserResponseDto } from "../types/type"
import logo from "../public/images/logo.png"
import MobileSidebar from "./MobieSideBar"
import { useNotificationStore, useUIStore } from "@/app/store/UIStore"
import { searchMyTasksLite } from "@/lib/api/tasks"
import TaskSearchDropdown from "./TaskSearchDropdown"
import { useRouter } from "next/navigation"
import { getSocket } from "@/lib/socket"
import NotificationDropdown from "./NotificationDropdown"

function getInitial(name: string) {
  return (name?.trim()?.[0] ?? "?").toUpperCase()
}

export default function Header({ user }: { user: UserResponseDto }) {
  const router = useRouter()

  const unread = useNotificationStore((s) => s.unread)
  const isNotificationOpen = useNotificationStore((s) => s.open)
  const openPanel = useNotificationStore((s) => s.openPanel)
  const closePanel = useNotificationStore((s) => s.closePanel)
  const markReadAll = useNotificationStore((s) => s.markReadAll)

  const [query, setQuery] = useState("")
  const mobileOpen = useUIStore((state) => state.mobileOpen)
  const setMobileOpen = useUIStore((state) => state.setMobileOpen)
  const dark = useUIStore((state) => state.dark)
  const setDark = useUIStore((state) => state.setDark)

  const [tasks, setTasks] = useState<TaskSearchResponseDto[]>([])
  const [isCreateOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // Không có query → clear & đóng dropdown
    if (!query.trim()) {
      setTasks([])
      setOpen(false)
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const data = await searchMyTasksLite(query)
        setTasks(data)
        setOpen(true)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    const socket = getSocket()

    socket.on("notification:new", (noti) => {
      useNotificationStore.getState().add(noti)
    })

    return () => {
      socket.off("notification:new")
    }
  }, [])

  useEffect(() => {
    if (!isNotificationOpen) return

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (
        target.closest("[data-notification-dropdown]") ||
        target.closest("[data-notification-button]")
      ) {
        return
      }

      closePanel()
    }

    window.addEventListener("click", onClick)
    return () => window.removeEventListener("click", onClick)
  }, [isNotificationOpen])

  return (
    <header className="sticky top-0 z-40 bg-[var(--c-surface)]/90 backdrop-blur">
      {/* viền dưới dùng token viền */}
      <div className="border-b border-[rgb(var(--c-border-rgb)/1)]">
        <div className="mx-auto w-full px-4 h-16 grid grid-cols-[1fr_auto_auto] items-center gap-4">
          {/* SEARCH */}
          <div className="relative flex items-center">
            {/* Mobile: logo + hamburger */}
            <Image src={logo} alt="Logo" width={28} height={28} className="sm:hidden" />
            <button
              aria-label="Mở sidebar"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-[var(--c-text)] hover:bg-[rgb(var(--c-text-rgb)/0.06)] active:scale-[0.98] sm:hidden"
            >
              <HambergerMenu size="22" color="currentColor" />
            </button>

            <MobileSidebar
              dark={dark}
              setDark={setDark}
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />

            <button
              className="sm:hidden p-2 rounded-lg text-[var(--c-text)] hover:bg-[rgb(var(--c-text-rgb)/0.06)]"
              aria-label="Search"
            >
              <SearchNormal size="20" color="currentColor" />
            </button>

            {/* Desktop input */}
            <div className="hidden sm:block relative w-full max-w-md">
              {isCreateOpen && (
                <TaskSearchDropdown
                  loading={loading}
                  tasks={tasks}
                  onSelect={(taskId) => {
                    router.push(`/tasks/${taskId}`)
                    setQuery("")
                    setOpen(false)
                  }}
                />
              )}

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query && setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
                className="peer w-full h-10 rounded-xl border border-[rgb(var(--c-border-rgb)/1)]
                           bg-[var(--c-surface)] pl-10 pr-3 text-sm text-[var(--c-text)]
                           outline-none focus:ring-2 focus:ring-[var(--c-primary)]/40"
              />
              {/* Fake placeholder (ẩn khi gõ hoặc focus) */}
              {!query && (
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[rgb(var(--c-text-rgb)/0.5)] text-sm peer-focus:hidden z-10">
                  <SearchNormal size={16} color="currentColor" variant="Linear" />
                  <span>Search Tasks You Have</span>
                </div>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg text-[var(--c-text)] hover:bg-[rgb(var(--c-text-rgb)/0.06)]"
              aria-label="Calendar"
            >
              <Calendar size="20" color="currentColor" />
            </button>
            <button
              className="p-2 rounded-lg text-[var(--c-text)] hover:bg-[rgb(var(--c-text-rgb)/0.06)]"
              aria-label="Messages"
            >
              <MessageQuestion size="20" color="currentColor" />
            </button>
            <button
              data-notification-button
              onClick={(e) => {
                e.stopPropagation()

                if (!isNotificationOpen) {
                  openPanel()
                  markReadAll()
                  getSocket().emit("notification:readAll")
                } else {
                  closePanel()
                }
              }}
              className="relative p-2 rounded-lg hover:bg-[rgb(var(--c-text-rgb)/0.06)]"
            >
              <Notification size="20" color="currentColor" />

              {unread > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5
      h-4 min-w-4 px-1 rounded-full bg-red-500
      text-white text-[10px] leading-4 text-center"
                >
                  {unread > 99 ? "99+" : unread}
                </span>
              )}
            </button>
            <NotificationDropdown />
          </div>

          {/* USER */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right leading-tight">
              <span className="font-medium text-[13px]">{user.name}</span>
              {user.location && (
                <span className="text-[11px] text-[rgb(var(--c-text-rgb)/0.6)]">
                  {user.location}
                </span>
              )}
            </div>

            {user.avatarSrc ? (
              <Image
                src={typeof user.avatarSrc === "string" ? user.avatarSrc : user.avatarSrc}
                alt={user.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <span className="h-8 w-8 rounded-full bg-[var(--c-primary)] text-white grid place-items-center text-sm font-medium">
                {getInitial(user.name)}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
