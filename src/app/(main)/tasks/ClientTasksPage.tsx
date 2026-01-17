"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getTasks } from "@/lib/api/tasks"
import type { TaskResponseDto } from "@/types/type"
import { TaskColumn } from "@/components/TaskColumn"

export default function ClientTasksPage() {
  const [tasks, setTasks] = useState<TaskResponseDto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading tasks...</div>
  }

  const todo = tasks.filter((t) => t.status === "todo")
  const inProgress = tasks.filter((t) => t.status === "in_progress")
  const done = tasks.filter((t) => t.status === "done")

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white p-4 bg-white rounded-xl border border-gray-200">
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.taskId}
              className="bg-white rounded-xl border border-gray-200 hover:shadow-sm"
            >
              <Link
                href={`/tasks/${task.taskId}`}
                className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100"
              >
                {task.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto space-y-8">
        <TaskColumn title="To Do" items={todo} />
        <TaskColumn title="In Progress" items={inProgress} />
        <TaskColumn title="Done" items={done} />
      </main>
    </div>
  )
}
