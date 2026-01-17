"use client"
import { useEffect, useState } from "react"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import { useRouter, usePathname } from "next/navigation"
import { clearAccessToken, getAccessToken } from "../../lib/authToken"
import { getMe } from "../../lib/api/user"
import { UserResponseDto } from "@/types/type"
import { getSocket } from "@/lib/socket"

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<UserResponseDto | null>(null)
  const [checking, setChecking] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  // 1) CHECK TOKEN
  useEffect(() => {
    const t = getAccessToken()
    if (!t) {
      if (pathname !== "/login") router.replace("/login")
      return
    }
    setToken(t)
    setChecking(false)
  }, [])

  // 2) LOAD USER SAU KHI CHECK TOKEN XONG
  useEffect(() => {
    const token = getAccessToken()
    if (!checking && token) {
      getMe()
        .then(setUser)
        .catch(() => {
          clearAccessToken()
          router.replace("/login")
        })
    }
  }, [checking])

  useEffect(() => {
    if (!token) return

    const socket = getSocket(token)
    socket.emit("ready")

    return () => {
      socket.disconnect()
    }
  }, [token])

  // 3) CHẶN RENDER UI CHO ĐẾN KHI USER SẴN SÀNG
  if (checking || !user) return null
  return (
    <div className="min-h-screen flex">
      <aside className="hidden sm:block shrink-0 ">
        <Sidebar />
      </aside>

      <section className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="p-6 ">{children}</main>
      </section>
    </div>
  )
}
