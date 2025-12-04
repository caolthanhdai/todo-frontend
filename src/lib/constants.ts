// API_ENDPOINTS

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",
  REFRESH: "/auth/refresh",
} as const

export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  DONE: "done",
} as const

export const TASK_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const

export const ROLE = {
  MANAGER: "manager",
  MEMBER: "member",
  VIEWER: "viewer",
} as const

// TIME OUT
export const API_TIMEOUT = 10_000
