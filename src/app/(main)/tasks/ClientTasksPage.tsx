"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getTasks } from "@/lib/api/tasks"
import type { TaskResponseDto } from "@/types/type"
import { TaskColumn } from "@/components/TaskColumn"
import { getSocket } from "@/lib/socket"
export default function ClientTasksPage() {
  const [tasks, setTasks] = useState<TaskResponseDto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .finally(() => setLoading(false))

    const socket = getSocket()

    const onTaskCreated = (task: TaskResponseDto) => {
      setTasks((prev) => {
        const existed = prev.some((t) => t.taskId === task.taskId)
        if (existed) return prev
        return [task, ...prev]
      })
    }

    const onTaskAdded = (task: TaskResponseDto) => {
      setTasks((prev) => {
        const existed = prev.some((t) => t.taskId === task.taskId)
        if (existed) return prev
        return [task, ...prev]
      })
    }

    const onTaskUpdated = (task: TaskResponseDto) => {
      setTasks((prev) => prev.map((t) => (t.taskId === task.taskId ? task : t)))
    }

    const onTaskDeleted = ({ taskId }: { taskId: string }) => {
      setTasks((prev) => prev.filter((t) => t.taskId !== taskId))
    }

    /** ========== LISTEN ========== */
    socket.on("task:created", onTaskCreated)
    socket.on("task:added", onTaskAdded)
    socket.on("task:updated", onTaskUpdated)
    socket.on("task:deleted", onTaskDeleted)

    return () => {
      socket.off("task:created", onTaskCreated)
      socket.off("task:added", onTaskAdded)
      socket.off("task:updated", onTaskUpdated)
      socket.off("task:deleted", onTaskDeleted)
    }
  }, [])

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading tasks...</div>
  }

  const todo = tasks.filter((t) => t.status === "todo")
  const inProgress = tasks.filter((t) => t.status === "in_progress")
  const done = tasks.filter((t) => t.status === "done")

  return (
    <div
      className="
    flex h-screen overflow-hidden
    bg-[var(--c-surface)]
  "
    >
      {/* Sidebar */}
      <aside
        className="
    w-64 p-4
    bg-[var(--c-surface)]
    border-r border-[rgb(var(--c-border-rgb)/1)]
  "
      >
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.taskId}
              className="
    rounded-xl
    bg-[var(--c-surface)]
    border border-[rgb(var(--c-border-rgb)/1)]
    hover:shadow-sm
    transition
  "
            >
              <Link
                href={`/tasks/${task.taskId}`}
                className="
  block rounded-md px-3 py-2 text-sm
  text-[var(--c-text)]
  hover:bg-[rgb(var(--c-border-rgb)/0.25)]
  transition
"
              >
                {task.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main
        className="
    flex-1 p-6 overflow-auto space-y-8
    bg-[var(--c-surface)]
  "
      >
        <TaskColumn title="To Do" items={todo} />
        <TaskColumn title="In Progress" items={inProgress} />
        <TaskColumn title="Done" items={done} />
      </main>
    </div>
  )
}
