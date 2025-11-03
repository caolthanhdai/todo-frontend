"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, MessageQuestion, Notification, SearchNormal, HambergerMenu } from "iconsax-react"
import { useState } from "react"
import { User } from "../types/type"
import logo from "../public/images/logo.png"
import MobileSidebar from "./MobieSideBar"
import { useUIStore } from "@/app/store/UIStore"

function getInitial(name: string) {
  return (name?.trim()?.[0] ?? "?").toUpperCase()
}

export default function Header({ user }: { user: User }) {
  const unread = user.unreadNotifications ?? 0
  const badgeText = unread > 99 ? "99+" : String(unread)
  const [query, setQuery] = useState("")
  const mobileOpen = useUIStore((state) => state.mobileOpen)
  const setMobileOpen = useUIStore((state) => state.setMobileOpen)
  const dark = useUIStore((state) => state.dark)
  const setDark = useUIStore((state) => state.setDark)

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
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="peer w-full h-10 rounded-xl border border-[rgb(var(--c-border-rgb)/1)]
                           bg-[var(--c-surface)] pl-10 pr-3 text-sm text-[var(--c-text)]
                           outline-none focus:ring-2 focus:ring-[var(--c-primary)]/40"
              />
              {/* Fake placeholder (ẩn khi gõ hoặc focus) */}
              {!query && (
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[rgb(var(--c-text-rgb)/0.5)] text-sm peer-focus:hidden z-10">
                  <SearchNormal size={16} color="currentColor" variant="Linear" />
                  <span>Search for anything...</span>
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
              className="relative p-2 rounded-lg text-[var(--c-text)] hover:bg-[rgb(var(--c-text-rgb)/0.06)]"
              aria-label="Notifications"
            >
              <Notification size="20" color="currentColor" />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-red-500 text-white text-[10px] leading-4 text-center">
                  {badgeText}
                </span>
              )}
            </button>
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
                src={typeof user.avatarSrc === "string" ? user.avatarSrc : (user.avatarSrc as any)}
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
