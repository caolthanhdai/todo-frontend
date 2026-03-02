"use client"

import { useEffect, useRef, useState } from "react"
import { createTask } from "@/lib/api/tasks"
import type { CreateTaskDto } from "@/types/type"

interface Props {
  open: boolean
  onClose: () => void
  onCreated: () => void
}

export default function CreateTaskModal({ open, onClose, onCreated }: Props) {
  const modalRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState<CreateTaskDto>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
  })

  const [files, setFiles] = useState<File[]>([])
  const [images, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  // click outside → close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (open) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open, onClose])

  if (!open) return null

  const submit = async () => {
    if (!form.title.trim()) return

    try {
      setLoading(true)
      await createTask(form, files, images)
      onCreated()
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-[var(--c-surface)]
border border-[rgb(var(--c-border-rgb)/1)]
 rounded-2xl p-6 shadow-xl space-y-4"
      >
        {/* header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[var(--c-text)]">Create Task</h2>
          <button
            onClick={onClose}
            className="text-xl text-[rgb(var(--c-text-rgb)/0.6)] hover:text-[var(--c-text)]"
          >
            ✕
          </button>
        </div>

        {/* title */}
        <input
          className=" w-full rounded-lg px-3 py-2
  bg-transparent
  border border-[rgb(var(--c-border-rgb)/1)]
  text-[rgb(var(--c-text-rgb)/0.9)]
  placeholder:text-[rgb(var(--c-text-rgb)/0.4)]
  focus:outline-none
  focus:ring-2 focus:ring-[var(--c-primary)]"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* description */}
        <textarea
          className=" w-full rounded-lg px-3 py-2
  bg-transparent
  border border-[rgb(var(--c-border-rgb)/1)]
  text-[rgb(var(--c-text-rgb)/0.9)]
  placeholder:text-[rgb(var(--c-text-rgb)/0.4)]
  focus:outline-none
  focus:ring-2 focus:ring-[var(--c-primary)]"
          placeholder="Description"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* status + priority */}
        <div className="grid grid-cols-2 gap-3">
          <select
            className="border rounded-lg px-2 py-2 bg-transparent border-[rgb(var(--c-border-rgb)/1)] text-[rgb(var(--c-text-rgb)/0.9)] focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)]"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as CreateTaskDto["status"] })
            }
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <select
            className="border rounded-lg px-2 py-2 bg-transparent border-[rgb(var(--c-border-rgb)/1)] text-[rgb(var(--c-text-rgb)/0.9)] focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)]"
            value={form.priority}
            onChange={(e) =>
              setForm({ ...form, priority: e.target.value as CreateTaskDto["priority"] })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* files */}
        <div>
          <label className="block text-sm font-medium mb-1">Files</label>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />
        </div>

        {/* images */}
        <div>
          <label className="block text-sm font-medium mb-1">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(Array.from(e.target.files || []))}
          />

          {/* preview */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="w-16 h-16 rounded object-cover"
              />
            ))}
          </div>
        </div>

        {/* actions */}
        <button
          disabled={loading}
          onClick={submit}
          className="
  w-full py-2 rounded-lg
  bg-[var(--c-primary)]
  text-white
  hover:opacity-90
  transition
"
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </div>
    </div>
  )
}
