"use client"

import FormLogin from "../../../components/FormLogin"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-4">
      {/* MAIN CONTAINER */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl">
        {/* LEFT SECTION – Logo + Text */}
        <div className="flex-1 mb-10 md:mb-0 md:mr-10">
          <h1 className="text-[#1877f2] text-5xl font-bold mb-4">TodooApp</h1>
          <p className="text-[22px]">
            TodooApp của anh đại , shark tank tương lai đó mấy thằng em!!
          </p>
        </div>

        {/* RIGHT SECTION – Login Form */}
        <div className="w-full max-w-md">
          <FormLogin />
        </div>
      </div>
    </div>
  )
}
