import axios, { AxiosError, AxiosInstance } from "axios"
import { API_ENDPOINTS } from "./constants"
import { getApiBaseUrl } from "./env"
import { getAccessToken, setAccessToken, clearAccessToken } from "./authToken"
import type { InternalAxiosRequestConfig } from "axios"

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
export function setupInterceptors(apiClient: AxiosInstance) {
  /* REQUEST */
  apiClient.interceptors.request.use(
    (config) => {
      // 🔒 CHẶN SSR
      if (typeof window === "undefined") {
        return config
      }

      const token = getAccessToken()
      if (token) {
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (err) => Promise.reject(err)
  )

  /* RESPONSE */
  apiClient.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      // 🔒 CHẶN SSR
      if (typeof window === "undefined") {
        return Promise.reject(error)
      }

      const originalConfig = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean
      }

      if (error.response?.status !== 401 || originalConfig._retry) {
        return Promise.reject(error)
      }

      originalConfig._retry = true

      if (!isRefreshing) {
        isRefreshing = true
        refreshPromise = requestNewAccessToken().finally(() => {
          isRefreshing = false
        })
      }

      const newToken = await refreshPromise

      if (!newToken) {
        clearAccessToken()
        window.location.href = "/login"
        return Promise.reject(error)
      }

      setAccessToken(newToken)

      originalConfig.headers.set("Authorization", `Bearer ${newToken}`)

      return apiClient(originalConfig)
    }
  )
}
