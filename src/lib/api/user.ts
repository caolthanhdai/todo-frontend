import { apiClient } from "../apiClient"
import { API_ENDPOINTS } from "../constants"
import { UserResponseDto } from "@/types/type"

// Hàm lấy thông tin người dùng hiện tại
export async function getMe(): Promise<UserResponseDto> {
  const res = await apiClient.get<UserResponseDto>(API_ENDPOINTS.ME)
  return res.data
}
