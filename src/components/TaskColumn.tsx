"use client"

import Link from "next/link"
import type { TaskResponseDto } from "@/types/type"

export function TaskColumn({ title, items }: { title: string; items: TaskResponseDto[] }) {
  return (
    <div
      className="
    rounded-xl
    bg-[var(--c-surface)]
    border border-[rgb(var(--c-border-rgb)/1)]
  "
    >
      {/* Column title */}
      <div
        className="
    px-4 py-3
    border-b border-[rgb(var(--c-border-rgb)/0.6)]
    text-sm font-semibold
    text-[var(--c-text)]
  "
      >
        {title}
        {title == "To Do" ? (
          <div className="mx-4 mt-2 h-[3px] bg-violet-600 rounded" />
        ) : title == "In Progress" ? (
          <div className="mx-4 mt-2 h-[3px] rounded bg-sky-500" />
        ) : (
          <div className="mx-4 mt-2 h-[3px] rounded bg-green-500" />
        )}
      </div>

      {/* Table header */}
      <div
        className="
    grid grid-cols-[2fr_1fr_1fr_1fr_1fr]
    px-4 py-2 text-xs
    text-[rgb(var(--c-text-rgb)/0.5)]
    border-b border-[rgb(var(--c-border-rgb)/1)]
  "
      >
        <span>Task</span>
        <span>Stage</span>
        <span>Priority</span>
        <span>Team</span>
        <span>Manager</span>
      </div>

      {/* Rows */}
      {items.map((task) => (
        <Link
          key={task.taskId}
          href={`/tasks/${task.taskId}`}
          className="
  grid grid-cols-[2fr_1fr_1fr_1fr_1fr]
  px-4 py-3 text-sm
  border-b border-[rgb(var(--c-border-rgb)/0.6)]
  hover:bg-[rgb(var(--c-border-rgb)/0.25)]
  transition
"
        >
          <span className="font-medium text-[var(--c-text)]">{task.title}</span>
          <span className="text-[rgb(var(--c-text-rgb)/0.6)]">{task.status}</span>
          <span className="text-[rgb(var(--c-text-rgb)/0.6)]">{task.priority}</span>
          <span className="text-[rgb(var(--c-text-rgb)/0.6)]">—</span>
          <span className="text-[rgb(var(--c-text-rgb)/0.6)]">
            {task.members.find((m) => m.role === "manager")?.name ?? "—"}
          </span>
        </Link>
      ))}

      {items.length === 0 && (
        <div className="px-4 py-6 text-xs text-[rgb(var(--c-text-rgb)/0.5)]">No tasks</div>
      )}
    </div>
  )
}
