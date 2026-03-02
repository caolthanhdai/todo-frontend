"use client"

import { MessageText1 } from "iconsax-react"
import type { TaskSearchResponseDto } from "@/types/type"

interface Props {
  loading: boolean
  tasks: TaskSearchResponseDto[]
  onSelect: (taskId: string) => void
}

export default function TaskSearchDropdown({ loading, tasks, onSelect }: Props) {
  return (
    <div
      className="absolute top-full mt-2 w-full max-w-md
                 rounded-xl bg-[var(--c-surface)]
                 border border-[rgb(var(--c-border-rgb)/1)]
                 shadow-xl z-50 overflow-hidden"
    >
      {/* Loading */}
      {loading && (
        <div className="px-4 py-3 text-sm text-[rgb(var(--c-text-rgb)/0.6)]">
          Searching tasks...
        </div>
      )}

      {/* Empty */}
      {!loading && tasks.length === 0 && (
        <div className="px-4 py-3 text-sm text-[rgb(var(--c-text-rgb)/0.6)]">
          No tasks you joined
        </div>
      )}

      {/* Result */}
      {!loading &&
        tasks.map((task) => (
          <div
            key={task.taskId}
            onMouseDown={() => onSelect(task.taskId)}
            className="px-4 py-3 cursor-pointer
                       hover:bg-[rgb(var(--c-text-rgb)/0.05)]
                       transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="font-medium text-sm truncate">{task.title}</div>

              <span
                className="text-[10px] px-2 py-0.5 rounded-md
                           bg-[rgb(var(--c-text-rgb)/0.06)]
                           text-[var(--c-text)] shrink-0"
              >
                {task.status}
              </span>
            </div>

            <div
              className="mt-1 flex items-center gap-3 text-xs
                            text-[rgb(var(--c-text-rgb)/0.55)]"
            >
              <span>{task.priority}</span>

              <span className="flex items-center gap-1">
                <MessageText1 size={12} color="currentColor" />
                {task.messagesCount}
              </span>

              <span className="capitalize">{task.myRole}</span>
            </div>
          </div>
        ))}
    </div>
  )
}
