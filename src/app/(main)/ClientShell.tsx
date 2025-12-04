"use client"
import { useEffect, useState } from "react"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import MobieSideBar from "@/components/MobieSideBar"
import { useRouter, usePathname } from "next/navigation"
import { getAccessToken } from "../../lib/authToken"

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)

  if (pathname === "/login") {
    setChecking(false)
    return
  }

  useEffect(() => {
    const token = getAccessToken()

    // Không có token => đẩy về login
    if (!token) {
      router.replace("/login")
    } else {
      setChecking(false)
    }
  }, [router, pathname])

  if (checking) return null

  return (
    <div className="min-h-screen flex">
      <aside className="hidden sm:block shrink-0 ">
        <Sidebar />
      </aside>

      <section className="flex-1 flex flex-col">
        <Header
          user={{
            userId: "1",
            name: "Cao Le Thanh Dai",
            email: "caolethanhdai@example.com",
            unreadNotifications: 4523626,
            createdAt: "2024-06-01",
          }}
        />
        <main className="p-6 ">{children}</main>
      </section>
    </div>
  )
}
