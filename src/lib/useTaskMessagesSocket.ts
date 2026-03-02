import { useEffect } from "react"
import { MessageResponseDto } from "@/types/type"
import { getAccessToken } from "./authToken"
import { getSocket } from "@/lib/socket"
export default function useTaskMessagesSocket(
  taskId: string,
  onMessage: (msg: MessageResponseDto) => void
) {
  useEffect(() => {
    const token = getAccessToken()
    if (!token) return

    const socket = getSocket()

    socket.emit("joinTask", { taskId })

    const handler = (msg: MessageResponseDto) => {
      if (msg.taskId === taskId) {
        onMessage(msg)
      }
    }

    socket.on("message:new", handler)

    return () => {
      socket.emit("leaveTask", { taskId })
      socket.off("message:new", handler)
    }
  }, [taskId, onMessage])
}
