// src/app/(auth)/register/FormRegister.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { setAccessToken } from "@/lib/authToken"
import { register } from "@/lib/api/auth" // giả sử bạn đã có hàm này

export default function FormRegister() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Gọi API BE: tuỳ theo DTO của bạn
      const res = await register({ name, email, password })

      // Nếu BE trả luôn accessToken sau khi đăng ký
      if (res.accessToken) {
        setAccessToken(res.accessToken)
        router.push("/dashboard") // vào thẳng app
      } else {
        // nếu không có token thì cho quay về login
        router.push("/login")
      }
    } catch (err) {
      setError("Đăng ký thất bại, hãy kiểm tra lại thông tin.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* HEADER */}
      <div className="px-4 py-3 border-b">
        <h1 className="text-[28px] font-bold">Tạo tài khoản mới</h1>
        <p className="text-sm text-gray-600">Nhanh chóng và dễ dàng.</p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-3">
        {error && <p className="text-red-500 text-sm text-center mb-1">{error}</p>}

        {/* Username */}
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          required
        />

        {/* Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#42b72a] text-white font-bold text-lg py-2.5 rounded-md disabled:opacity-60"
          >
            {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
          </button>
        </div>
      </form>

      {/* FOOTER – link về login */}
      <div className="pb-4">
        <p
          className="text-center text-sm text-blue-600 cursor-pointer hover:underline"
          onClick={() => router.push("/login")}
        >
          Đã có tài khoản? Đăng nhập
        </p>
      </div>
    </div>
  )
}
