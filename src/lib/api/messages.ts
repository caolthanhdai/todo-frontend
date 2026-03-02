import { apiClient } from "../apiClient"
import { API_ENDPOINTS } from "../constants"
import { PaginationResponseDto, TaskWithLastMessageDto, MessageResponseDto } from "@/types/type"

export const messageApi = {
  getTasks(cursor?: string) {
    return apiClient.get<PaginationResponseDto<TaskWithLastMessageDto>>(
      API_ENDPOINTS.TASK_WITH_LAST_MESSAGE,
      { params: { cursor } }
    )
  },

  getInitialMessages(taskId: string) {
    return apiClient.get<PaginationResponseDto<MessageResponseDto>>(
      API_ENDPOINTS.GET_INITIAL_MESSAGES(taskId)
    )
  },

  getMessagesBefore(taskId: string, cursor: string) {
    return apiClient.get<PaginationResponseDto<MessageResponseDto>>(
      API_ENDPOINTS.GET_MESSAGES_BEFORE(taskId),
      { params: { cursor } }
    )
  },

  sendMessage(taskId: string, content: string) {
    return apiClient.post<MessageResponseDto>(API_ENDPOINTS.SEND_MESSAGE(taskId), { content })
  },
}
