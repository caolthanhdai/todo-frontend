"use client"

import { useEffect, useState } from "react"
import TaskCard from "./TaskCard"
import AddSquare from "@/public/icons/AddSquare"
import { deleteTask, getTasks } from "@/lib/api/tasks"
import type { TaskResponseDto } from "@/types/type"
import CreateTaskModal from "./CreateTaskModal"

export default function TaskBoard() {
  const [todo, setTodo] = useState<TaskResponseDto[]>([])
  const [inProgress, setInProgress] = useState<TaskResponseDto[]>([])
  const [done, setDone] = useState<TaskResponseDto[]>([])
  const [loading, setLoading] = useState(true)
  const [openCreate, setOpenCreate] = useState(false)
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null)

  const loadTasks = async () => {
    const tasks = await getTasks()
    setTodo(tasks.filter((t) => t.status === "todo"))
    setInProgress(tasks.filter((t) => t.status === "in_progress"))
    setDone(tasks.filter((t) => t.status === "done"))
    setLoading(false)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  if (loading) {
    return <div className="p-10 text-center text-gray-400">Loading task board...</div>
  }

  return (
    <>
      <CreateTaskModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={loadTasks}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {/* TODO */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col">
          <header className="px-4 py-3 flex justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full" />
              <h2 className="font-semibold">To Do</h2>
              <span className="text-sm text-gray-500">{todo.length}</span>
            </div>

            <button onClick={() => setOpenCreate(true)}>
              <AddSquare />
            </button>
          </header>

          <div className="mx-4 mt-2 h-[3px] bg-violet-600 rounded" />

          <div className="flex-1 p-4 space-y-4">
            {todo.length === 0 ? (
              <p className="text-center text-gray-400">Create New Task !</p>
            ) : (
              todo.map((task) => (
                <TaskCard
                  key={task.taskId}
                  task={task}
                  onRequestDelete={(id) => setDeleteTaskId(id)}
                />
              ))
            )}
          </div>
        </section>

        {/* ---------- IN PROGRESS ---------- */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col">
          <header className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-sky-500 rounded-full" />
              <h2 className="font-semibold">In Progress</h2>
              <span className="text-sm text-gray-500">{inProgress.length}</span>
            </div>
          </header>

          <div className="mx-4 mt-2 h-[3px] rounded bg-sky-500" />

          <div className="flex-1 p-4 space-y-4 min-h-[200px]">
            {inProgress.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-8">
                You have no tasks in progress.
              </p>
            ) : (
              inProgress.map((task) => (
                <TaskCard
                  key={task.taskId}
                  task={task}
                  onRequestDelete={(id) => setDeleteTaskId(id)}
                />
              ))
            )}
          </div>
        </section>

        {/* ---------- DONE ---------- */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col">
          <header className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <h2 className="font-semibold">Done</h2>
              <span className="text-sm text-gray-500">{done.length}</span>
            </div>
          </header>

          <div className="mx-4 mt-2 h-[3px] rounded bg-green-500" />

          <div className="flex-1 p-4 space-y-4 min-h-[200px]">
            {done.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-8">All tasks completed!</p>
            ) : (
              done.map((task) => (
                <TaskCard
                  key={task.taskId}
                  task={task}
                  onRequestDelete={(id) => setDeleteTaskId(id)}
                />
              ))
            )}
          </div>
        </section>
        {deleteTaskId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <div className="bg-white rounded-xl p-6 w-[320px] space-y-4 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg">Xóa task?</h3>

              <p className="text-sm text-gray-500">Bạn có chắc chắn muốn xóa task này không?</p>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                  onClick={() => setDeleteTaskId(null)}
                >
                  Không
                </button>

                <button
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                  onClick={async () => {
                    await deleteTask(deleteTaskId)
                    setDeleteTaskId(null)
                    loadTasks()
                  }}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
