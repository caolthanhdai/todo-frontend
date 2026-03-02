// src/types/task.ts
export type TaskStatus = "todo" | "in_progress" | "done"
export type TaskPriority = "low" | "medium" | "high"
export type Role = "manager" | "member"
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
  user: UserResponseDto
  accessToken: string
}
export class UserResponseDto {
  userId!: string
  name!: string
  email!: string
  avatarSrc?: string | null
  location?: string | null
  unreadNotifications!: number
  createdAt!: string
}
export interface TaskMemberResponseDto {
  userId: string
  name: string
  email: string
  avatarSrc?: string | null
  role: Role
}

export interface TaskResponseDto {
  taskId: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority

  members: TaskMemberResponseDto[]
  myRole: Role
  files?: {
    id: string
    name: string
    url: string
    uploadedAt: string
    uploadedBy?: {
      userId: string
      name: string
    }
  }[]

  images?: {
    id: string
    name: string
    url: string
    uploadedAt: string
    uploadedBy?: {
      userId: string
      name: string
    }
  }[]

  messagesCount: number
  createdAt: string
  updatedAt: string
}

export interface CreateTaskDto {
  title: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  dueTime?: string
}
export interface UpdateTaskDto {
  title?: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
}
export interface AddFileResponseDto {
  id: string
  name: string
  url: string
}
export interface AddImageResponseDto {
  id: string
  name: string
  url: string
}
export interface AddTaskMemberDto {
  email: string
}

export interface AddTaskMemberResponseDto {
  userId: string
  name: string
  email: string
  avatarSrc?: string
  role: string
}

export type CreateTaskResponseDto = TaskResponseDto
export type UpdateTaskResponseDto = TaskResponseDto

export interface MessageResponseDto {
  messageId: string
  taskId: string
  content: string
  createdAt: string
  author: MessageAuthorDto
}
export class MessageAuthorDto {
  userId!: string
  name!: string
  avatarSrc?: string | null
}

export interface TaskWithLastMessageDto {
  taskId: string
  title: string
  updatedAt: string
  lastMessage?: MessageResponseDto | null
}
export interface PaginationResponseDto<T> {
  data: T[]
  nextCursor: string | null
}

export interface TaskSearchResponseDto {
  taskId: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  myRole: Role
  messagesCount: number
  updatedAt: string
}
export interface TaskMemberDetailResponseDto {
  userId: string
  name: string
  email: string
  avatarSrc?: string | null
  role: Role
}

export interface TaskImageDetailResponseDto {
  id: string
  name: string
  url: string
  uploadedBy: {
    userId: string
    name: string
  }
  uploadedAt: string
}

export interface TaskFileDetailResponseDto {
  id: string
  name: string
  url: string
  uploadedBy: {
    userId: string
    name: string
  }
  uploadedAt: string
}
export interface NotificationPayload {
  taskId?: string
}

export interface NotificationItem {
  id: string
  userId: string
  type: string
  title: string
  content?: string | null
  payload?: NotificationPayload | null
  isRead: boolean
  createdAt: string
}
