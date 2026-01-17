import { apiClient } from "../apiClient"
import { API_ENDPOINTS } from "../constants"
import {
  CreateTaskDto,
  CreateTaskResponseDto,
  TaskResponseDto,
  UpdateTaskDto,
  UpdateTaskResponseDto,
  AddFileResponseDto,
  AddImageResponseDto,
  AddTaskMemberDto,
  AddTaskMemberResponseDto,
} from "@/types/type"
export const createTask = async (
  dto: CreateTaskDto,
  files?: File[],
  images?: File[]
): Promise<CreateTaskResponseDto> => {
  const formData = new FormData()

  Object.entries(dto).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value))
    }
  })

  files?.forEach((file) => {
    formData.append("files", file) // ✅
  })

  images?.forEach((image) => {
    formData.append("images", image) // ✅
  })

  const { data } = await apiClient.post(API_ENDPOINTS.CREATE, formData)

  return data
}

export const getTasks = async (): Promise<TaskResponseDto[]> => {
  const { data } = await apiClient.get<TaskResponseDto[]>(API_ENDPOINTS.LIST)
  return data
}

export const updateTask = async (
  id: string,
  dto: UpdateTaskDto
): Promise<UpdateTaskResponseDto> => {
  const { data } = await apiClient.patch<UpdateTaskResponseDto>(API_ENDPOINTS.UPDATE(id), dto)
  return data
}

export const deleteTask = async (id: string): Promise<void> => {
  await apiClient.delete(API_ENDPOINTS.DELETETASK(id))
}

export const addTaskFile = async (taskId: string, file: File): Promise<AddFileResponseDto> => {
  const formData = new FormData()
  formData.append("file", file)

  const { data } = await apiClient.post<AddFileResponseDto>(
    API_ENDPOINTS.ADD_FILE(taskId),
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  )

  return data
}

export const addTaskImage = async (taskId: string, image: File): Promise<AddImageResponseDto> => {
  const formData = new FormData()
  formData.append("image", image)

  const { data } = await apiClient.post<AddImageResponseDto>(
    API_ENDPOINTS.ADD_IMAGE(taskId),
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  )

  return data
}
// lib/api/tasks.ts
export const getTaskById = async (taskId: string): Promise<TaskResponseDto> => {
  const { data } = await apiClient.get<TaskResponseDto>(API_ENDPOINTS.GET_BY_ID(taskId))
  return data
}
export const addTaskFiles = async (
  taskId: string,
  files: File[]
): Promise<AddFileResponseDto[]> => {
  const formData = new FormData()
  files.forEach((f) => formData.append("files", f))

  const { data } = await apiClient.post<AddFileResponseDto[]>(
    API_ENDPOINTS.ADD_FILES(taskId),
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  )

  return data
}

export const addTaskImages = async (
  taskId: string,
  images: File[]
): Promise<AddImageResponseDto[]> => {
  const formData = new FormData()
  images.forEach((img) => formData.append("images", img))

  const { data } = await apiClient.post<AddImageResponseDto[]>(
    API_ENDPOINTS.ADD_IMAGES(taskId),
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  )

  return data
}
export const addTaskMemberByEmail = async (
  taskId: string,
  dto: AddTaskMemberDto
): Promise<AddTaskMemberResponseDto> => {
  const { data } = await apiClient.post<AddTaskMemberResponseDto>(
    API_ENDPOINTS.ADD_MEMBER(taskId),
    dto
  )
  return data
}
