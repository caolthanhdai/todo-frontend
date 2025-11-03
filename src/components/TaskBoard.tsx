"use client"

import { Add } from "iconsax-react"
import TaskCard from "./TaskCard"
import { useState } from "react"
import AddSquare from "@/public/icons/AddSquare"
import { Task } from "@/types/type"

export default function TaskBoard() {
  // Giả sử 3 mảng task (bạn có thể thay bằng dữ liệu thật sau)
  const [todo, setTodo] = useState<Task[]>([])
  const [inProgress, setInProgress] = useState<Task[]>([])
  const [done, setDone] = useState<Task[]>([])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* --- To Do --- */}
      <section className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 flex flex-col">
        <header className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">To Do</h2>
            <span className="text-sm text-gray-500">{todo.length}</span>
          </div>
          <button className="p-1.5 rounded-md">
            <AddSquare />
          </button>
        </header>
        <div className="mx-4 mt-2 h-[3px] rounded bg-violet-600"></div>
        <div className="flex-1 p-4 space-y-4 min-h-[200px]">
          {todo.length === 0 ? (
            <div className="text-center text-gray-400  text-sm py-8  rounded-lg">
              Create New Task !
            </div>
          ) : (
            todo.map((t, i) => <TaskCard key={i} task={task} />)
          )}
        </div>
      </section>

      {/* --- On Progress --- */}
      <section className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 flex flex-col">
        <header className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">On Progress</h2>
            <span className="text-sm text-gray-500">{inProgress.length}</span>
          </div>
        </header>
        <div className="mx-4 mt-2 h-[3px] rounded bg-sky-500"></div>
        <div className="flex-1 p-4 space-y-4 min-h-[200px]">
          {inProgress.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-8 border border-dashed border-gray-300 rounded-lg">
              Create
            </div>
          ) : (
            inProgress.map((t, i) => <TaskCard key={i} task={task} />)
          )}
        </div>
      </section>

      {/* --- Done --- */}
      <section className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 flex flex-col">
        <header className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">Done</h2>
            <span className="text-sm text-gray-500">{done.length}</span>
          </div>
        </header>
        <div className="mx-4 mt-2 h-[3px] rounded bg-green-500"></div>
        <div className="flex-1 p-4 space-y-4 min-h-[200px]">
          {done.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-8 border border-dashed border-gray-300 rounded-lg">
              Create
            </div>
          ) : (
            done.map((t, i) => <TaskCard key={i} task={task} />)
          )}
        </div>
      </section>
    </div>
  )
}
