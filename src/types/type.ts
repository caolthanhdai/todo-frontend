// src/types/user.ts
export type User = {
  userId: string
  name: string
  email: string
  avatarSrc?: string // FE render <img src={avatarSrc} />
  location?: string
  unreadNotifications: number
  createdAt: string // ISO
}

// src/types/task.ts
export type TaskStatus = "todo" | "in-progress" | "done"
export type TaskPriority = "low" | "medium" | "high"

export type Task = {
  taskId: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: string // ISO
  createdAt: string // ISO
  createdById: string
  members?: Pick<User, "userId" | "name" | "avatarSrc">[]
  images?: UploadedImage[]
  comments?: TaskMessage[]
  files?: TaskFile[]
}

// src/types/upload.ts
export type UploadedImage = {
  imageId: string
  name: string
  url: string
  size: number
  type: string // "image/png" ...
  uploadedAt: string // ISO
  uploadedById: string
  taskId: string
}

// src/types/comment.ts
export type TaskMessage = {
  id: string
  messageId: string
  taskId: string
  authorId: string
  content: string
  createdAt: string // ISO
  editedAt?: string // ISO
}

// src/types/file.ts
export type TaskFile = {
  fileId: string
  name: string
  url: string
  size: number
  type: string // "application/pdf" ...
  uploadedAt: string // ISO
  uploadedById: string
  taskId: string
}

// auth type definitions
export type LoginDto = {
  identifier: string
  password: string
}
export type RegisterDto = {
  name: string
  email: string
  password: string
}
export type AuthResponseDto = {
  user: User
  accessToken: string
}
