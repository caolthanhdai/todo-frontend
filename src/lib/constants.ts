// API_ENDPOINTS

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",
  REFRESH: "/auth/refresh",
  ME: "/users/me",
  CREATE: "/tasks",
  LIST: "/tasks/list",
  UPDATE: (taskId: string) => `/tasks/${taskId}`,
  DELETETASK: (taskId: string) => `/tasks/${taskId}`,
  ADD_FILE: (taskId: string) => `/tasks/${taskId}/files`,
  ADD_IMAGE: (taskId: string) => `/tasks/${taskId}/images`,
  GET_BY_ID: (id: string) => `/tasks/${id}`,
  ADD_MEMBER: (taskId: string) => `/tasks/${taskId}/members`,
  ADD_FILES: (taskId: string) => `/tasks/${taskId}/files`,
  ADD_IMAGES: (taskId: string) => `/tasks/${taskId}/images`,
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
