"use client"

import { useEffect, useState } from "react"
import { TaskWithLastMessageDto, MessageResponseDto } from "@/types/type"
import TaskList from "@/components/TaskList"
import { ChatWindow } from "@/components/ChatWindow"
import { getAccessToken } from "@/lib/authToken"
import { getSocket } from "@/lib/socket"
import { messageApi } from "@/lib/api/messages"

export default function MessagesClient() {
  const [tasks, setTasks] = useState<TaskWithLastMessageDto[]>([])
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)

  /* FETCH TASKS – CLIENT ONLY */
  useEffect(() => {
    messageApi.getTasks().then((res) => {
      const data = res.data.data
      setTasks(data)
      if (data.length > 0) {
        setActiveTaskId(data[0].taskId)
      }
    })
  }, [])

  /* SOCKET LISTEN */
  useEffect(() => {
    const token = getAccessToken()
    if (!token) return

    const socket = getSocket()

    socket.on("message:new", (msg: MessageResponseDto) => {
      setTasks((prev) => {
        const idx = prev.findIndex((t) => t.taskId === msg.taskId)
        if (idx === -1) return prev

        const updated = {
          ...prev[idx],
          lastMessage: msg,
          updatedAt: msg.createdAt,
        }

        const clone = [...prev]
        clone.splice(idx, 1)
        return [updated, ...clone]
      })
    })

    return () => {
      socket.off("message:new")
    }
  }, [])
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <div className="flex h-full w-full overflow-hidden border rounded-lg">
      <div className="w-[320px] border-r overflow-hidden">
        <TaskList tasks={tasks} activeTaskId={activeTaskId} onSelect={setActiveTaskId} />
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTaskId ? (
          <ChatWindow taskId={activeTaskId} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Chọn một task để bắt đầu chat
          </div>
        )}
      </div>
    </div>
  )
}
