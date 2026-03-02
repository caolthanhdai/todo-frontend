"use client"

import { TaskWithLastMessageDto } from "@/types/type"

export default function TaskList({
  tasks,
  activeTaskId,
  onSelect,
}: {
  tasks: TaskWithLastMessageDto[]
  activeTaskId: string | null
  onSelect: (taskId: string) => void
}) {
  return (
    <div
      className="
    w-80 h-full overflow-y-auto
    bg-[var(--c-surface)]
    border-r border-[rgb(var(--c-border-rgb)/1)]
  "
    >
      {tasks.map((t) => (
        <div
          key={t.taskId}
          className={`p-3 cursor-pointer ${
            activeTaskId === t.taskId
              ? "bg-[rgb(var(--c-border-rgb)/0.35)]"
              : "hover:bg-[rgb(var(--c-border-rgb)/0.2)]"
          }`}
          onClick={() => onSelect(t.taskId)}
        >
          <div className="font-semibold text-[var(--c-text)]">{t.title}</div>

          {t.lastMessage && (
            <div className="text-sm text-[rgb(var(--c-text-rgb)/0.6)] truncate">
              {t.lastMessage.author.name}: {t.lastMessage.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
