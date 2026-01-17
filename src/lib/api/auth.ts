import { apiClient } from "../apiClient"
import { API_ENDPOINTS } from "../constants"
import { getAccessToken, setAccessToken, clearAccessToken } from "../authToken"
import { UserResponseDto, AuthResponseDto, LoginDto, RegisterDto } from "@/types/type"

// Hàm đăng nhập
export async function login(dto: LoginDto): Promise<AuthResponseDto> {
  const res = await apiClient.post<AuthResponseDto>(API_ENDPOINTS.LOGIN, dto)
  const data = res.data

  // Lưu accessToken vào bộ nhớ tạm FE
  setAccessToken(data.accessToken)

  return data
}

// Hàm đăng ký
export async function register(dto: RegisterDto): Promise<AuthResponseDto> {
  const res = await apiClient.post<AuthResponseDto>(API_ENDPOINTS.REGISTER, dto)
  const data = res.data

  // Nếu BE cũng trả về accessToken sau khi register  `
  setAccessToken(data.accessToken)

  return data
}

// Hàm đăng xuất
export async function logout(): Promise<void> {
  try {
    // Gửi yêu cầu logout lên BE (xoá refresh token, cookie...)
    await apiClient.post(API_ENDPOINTS.LOGOUT)
  } finally {
    // Ở FE thì xoá accessToken trong bộ nhớ
    clearAccessToken()
  }
}
