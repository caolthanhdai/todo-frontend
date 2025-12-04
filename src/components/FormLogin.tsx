"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { setAccessToken, getAccessToken } from "@/lib/authToken"
import { login } from "@/lib/api/auth"

export default function FormLogin() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (getAccessToken()) router.replace("/")
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await login({ identifier, password })

      setAccessToken(res.accessToken)
      router.push("/dashboard")
    } catch (err) {
      setError("Sai email/username hoặc mật khẩu.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full">
      {error && <p className="text-red-500 text-center text-sm mb-3">{error}</p>}

      {/* Email / Username */}
      <input
        type="text"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="Email hoặc tên tài khoản"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:border-blue-500"
        required
      />

      {/* Password */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-blue-500"
        required
      />

      {/* Login button */}
      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer  w-full bg-[#1877f2] text-white font-bold py-3 rounded-lg text-lg disabled:opacity-60"
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>

      {/* Quên mật khẩu */}
      <p className="text-center text-blue-600 mt-3 cursor-pointer hover:underline">
        Quên mật khẩu?
      </p>

      <div className="h-[1px] w-full bg-gray-300 my-4" />

      {/* Create account button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="cursor-pointer bg-[#42b72a] text-white font-bold px-5 py-3 rounded-lg"
        >
          Tạo tài khoản mới
        </button>
      </div>
    </form>
  )
}
