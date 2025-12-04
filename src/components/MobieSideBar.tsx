"use client"

import Link from "next/link"
import { useEffect } from "react"
import { NavItem } from "./Sidebar"
import { Setting2, Home, Message, TaskSquare } from "iconsax-react"
import ThemeToggleButton from "./ThemeToggleButton"

const navItems: NavItem[] = [
  { label: "Home", href: "/home", icon: <Home size={20} color="currentColor" /> },
  { label: "Messages", href: "/messages", icon: <Message size={20} color="currentColor" /> },
  { label: "Tasks", href: "/tasks", icon: <TaskSquare size={20} color="currentColor" /> },
  { label: "Settings", href: "/settings", icon: <Setting2 size={20} color="currentColor" /> },
]

export default function MobileSidebar({
  mobileOpen,
  dark,
  setMobileOpen,
  setDark,
}: {
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
  dark: boolean
  setDark: (dark: boolean) => void
}) {
  // lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = mobileOpen ? "hidden" : prev || ""
    return () => {
      document.body.style.overflow = prev || ""
    }
  }, [mobileOpen])

  return (
    <>
      <aside
        role="dialog"
        aria-modal="true"
        className={`fixed left-0 top-16  z-60 sm:hidden h-dvh w-72
      bg-[var(--c-surface)] text-[var(--c-text)]
      border-r border-[rgb(var(--c-border-rgb)/1)]
      transition-transform duration-200 ease-out
      flex flex-col

      ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* NAV  */}
        <nav className="flex-1 min-h-0 overflow-y-auto py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg
                text-[var(--c-text)]
                hover:bg-[rgb(var(--c-text-rgb)/0.06)]"
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-4 py-3 border-t border-[rgb(var(--c-border-rgb)/1)] bg-[var(--c-surface)]">
          <ThemeToggleButton dark={dark} setDark={setDark} />
        </div>
      </aside>
    </>
  )
}
