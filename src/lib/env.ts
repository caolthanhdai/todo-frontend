function getEnv(key: string, fallback?: string): string {
  const value = process.env[key]

  if (value === undefined || value === "") {
    if (fallback !== undefined) return fallback

    // Lỗi này sẽ hiện ở console server khi thiếu env
    throw new Error(`Missing environment variable: ${key}`)
  }

  return value
}

// Hàm lấy base URL API
export const getApiBaseUrl = (): string => {
  return getEnv("NEXT_PUBLIC_API_URL", "http://localhost:3001")
}

// Gom các biến hay dùng vào 1 object
export const env = {
  apiBaseUrl: getApiBaseUrl(),
  appName: getEnv("NEXT_PUBLIC_APP_NAME", "Project M"),
}
