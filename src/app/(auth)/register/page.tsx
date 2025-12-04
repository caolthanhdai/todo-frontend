// src/app/(auth)/register/page.tsx

import FormRegister from "../../../components/FormRegister"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <FormRegister />
      </div>
    </div>
  )
}
