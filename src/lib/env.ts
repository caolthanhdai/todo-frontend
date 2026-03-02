export const getApiBaseUrl = (): string => {
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL!
  }

  return process.env.NEXT_PUBLIC_API_URL!
}

export const env = {
  get apiBaseUrl() {
    return getApiBaseUrl()
  },
  appName: process.env.NEXT_PUBLIC_APP_NAME || "Project M",
}
