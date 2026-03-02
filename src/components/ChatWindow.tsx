"use client"
import useTaskMessagesSocket from "@/lib/useTaskMessagesSocket"
import { useCallback, useEffect, useState, useRef } from "react"
import { messageApi } from "@/lib/api/messages"
import { MessageResponseDto } from "@/types/type"
import { UserAvatar } from "./UserAvatar"
export function ChatWindow({ taskId }: { taskId: string }) {
  const [messages, setMessages] = useState<MessageResponseDto[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [content, setContent] = useState("")
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)

  /* load initial */
  useEffect(() => {
    loadInitial()
  }, [taskId])

  const handleSocketMessage = useCallback((msg: MessageResponseDto) => {
    setMessages((prev) => [...prev, msg])
  }, [])

  useTaskMessagesSocket(taskId, handleSocketMessage)

  async function loadInitial() {
    const res = await messageApi.getInitialMessages(taskId)
    setMessages(res.data.data)
    setCursor(res.data.nextCursor)
  }

  async function loadMore() {
    if (!cursor) return
    const res = await messageApi.getMessagesBefore(taskId, cursor)
    setMessages((prev) => [...res.data.data, ...prev])
    setCursor(res.data.nextCursor)
  }

  async function handleSend() {
    if (!content.trim()) return
    await messageApi.sendMessage(taskId, content)
    setContent("")
    // socket tự push về
  }
  const firstLoad = useRef(true)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: firstLoad.current ? "auto" : "smooth",
    })
    firstLoad.current = false
  }, [messages])
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div
        ref={listRef}
        className="
  flex-1 overflow-y-auto p-4 space-y-3
  bg-[var(--c-surface)]
"
        onScroll={(e) => {
          if ((e.target as HTMLElement).scrollTop === 0) {
            loadMore()
          }
        }}
      >
        {messages.map((m) => (
          <div key={m.messageId} className="flex gap-3">
            <UserAvatar user={m.author} />
            <div
              className="
    rounded-lg px-3 py-2
    bg-[rgb(var(--c-border-rgb)/0.25)]
  "
            >
              <div className="text-sm font-medium text-[var(--c-text)]">{m.author.name}</div>

              <div className="text-sm text-[rgb(var(--c-text-rgb)/0.8)]">{m.content}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div
        className="
    p-3 flex gap-2
    border-t border-[rgb(var(--c-border-rgb)/1)]
    bg-[var(--c-surface)]
  "
      >
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="
  flex-1 rounded px-3 py-2
  bg-[var(--c-surface)]
  border border-[rgb(var(--c-border-rgb)/1)]
  text-[var(--c-text)]
  placeholder:text-[rgb(var(--c-text-rgb)/0.5)]
  focus:outline-none
  focus:ring-2 focus:ring-[rgb(var(--c-primary)/0.5)]
"
          placeholder="Nhập tin nhắn..."
        />
        <button onClick={handleSend} className="px-4 py-2 bg-blue-600 text-white rounded">
          Gửi
        </button>
      </div>
    </div>
  )
}
