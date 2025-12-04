import axios, { AxiosError } from "axios"
import { apiClient } from "./apiClient"
import { API_ENDPOINTS } from "./constants"
import { getApiBaseUrl } from "./env"
import { getAccessToken, setAccessToken, clearAccessToken } from "./authToken"
import { redirect } from "next/navigation"

// Tạo axios instance riêng để gọi refresh token tránh lỗi lặp vô hạn
const refreshClient = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
})

// Biến theo dõi trạng thái refresh token
let isRefreshing = false
let refreshPromise: Promise<string | null> | null = null

// Hàm gọi API làm mới access token
async function requestNewAccessToken(): Promise<string | null> {
  try {
    const res = await refreshClient.post(API_ENDPOINTS.REFRESH)
    const data = res.data as { accessToken?: string }
    return data.accessToken ?? null
  } catch (error) {
    console.error("Refresh token failed", error)
    return null
  }
}

// Thêm interceptor để tự động gắn token vào header Authorization Authorization: Bearer <token>
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken()

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Thêm interceptor để xử lý lỗi 401 và làm mới token
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Lấy config gốc của request
    const originalConfig: any = error.config

    // Không phải 401 hoặc đã retry rồi thì bỏ
    if (error.response?.status !== 401 || originalConfig?._retry) {
      return Promise.reject(error)
    }
    // Đánh dấu đã retry
    originalConfig._retry = true

    // Tránh nhiều request cùng lúc đều gọi refresh vì isRefreshing được lưu ở phạm vi module
    // tất cả các request đều chạy file này, cùng 1 instance của apiClient nên dùng chung 1 biến duy nhất
    if (!isRefreshing) {
      isRefreshing = true
      refreshPromise = requestNewAccessToken().finally(() => {
        isRefreshing = false
      })
    }
    // Chờ lấy token mới
    const newToken = await refreshPromise

    // Nếu không lấy được token mới thì clear token cũ và trả về lỗi
    if (!newToken) {
      clearAccessToken()
      redirect("/login")
      return Promise.reject(error)
    }
    // Lưu token mới
    setAccessToken(newToken)
    // Gắn token mới vào header và retry request gốc
    if (originalConfig.headers) {
      originalConfig.headers.Authorization = `Bearer ${newToken}`
    }

    return apiClient(originalConfig)
  }
)
