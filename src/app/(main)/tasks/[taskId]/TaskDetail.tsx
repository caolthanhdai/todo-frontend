"use client"

import { useEffect, useState } from "react"
import HistoryItem from "@/components/HistoryItem"
import type { TaskResponseDto, UpdateTaskDto } from "@/types/type"
import {
  getTaskById,
  deleteTask,
  updateTask,
  addTaskFiles,
  addTaskImages,
  addTaskMemberByEmail,
} from "@/lib/api/tasks"

interface Props {
  taskId: string
}

export default function TaskDetail({ taskId }: Props) {
  const [task, setTask] = useState<TaskResponseDto | null>(null)
  const [loading, setLoading] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [updateForm, setUpdateForm] = useState<UpdateTaskDto>({
    title: task?.title,
    description: task?.description,
    status: task?.status,
    priority: task?.priority,
  })
  const [showDelete, setShowDelete] = useState(false)
  const [showAddMember, setShowAddMember] = useState(false)
  const [memberEmail, setMemberEmail] = useState("")

  const [activeTab, setActiveTab] = useState<"props" | "attachments" | "history">("props")

  useEffect(() => {
    getTaskById(taskId).then(setTask)
  }, [taskId])

  if (!task) return <div>Loading...</div>
  const attachmentsCount = (task.files?.length ?? 0) + (task.images?.length ?? 0)
  const histories = [
    {
      title: "Task created",
      time: task.createdAt,
    },

    ...(task.updatedAt !== task.createdAt ? [{ title: "Task updated", time: task.updatedAt }] : []),

    ...(task.files ?? []).map((f) => ({
      title: `${f.uploadedBy?.name ?? "Someone"} added file ${f.name}`,
      time: f.uploadedAt,
    })),

    ...(task.images ?? []).map((i) => ({
      title: `${i.uploadedBy?.name ?? "Someone"} added image ${i.name}`,
      time: i.uploadedAt,
    })),
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())

  return (
    <div className="rounded-lg border bg-white p-6 border border-gray-200">
      {/* Tabs */}
      <div className="mb-4 flex gap-6 border-b text-sm border-gray-200">
        <button
          onClick={() => setActiveTab("props")}
          className={`pb-2 cursor-pointer pointer ${
            activeTab === "props" ? "border-b-2 border-blue-500 font-medium" : "text-gray-500"
          }`}
        >
          Task Properties
        </button>

        <button
          onClick={() => setActiveTab("attachments")}
          className={`pb-2 cursor-pointer  ${
            activeTab === "attachments" ? "border-b-2 border-blue-500 font-medium" : "text-gray-500"
          }`}
        >
          Attachments ({attachmentsCount})
        </button>

        <span className="pb-2 cursor-pointer text-gray-400" onClick={() => setActiveTab("history")}>
          History ({task.messagesCount})
        </span>
      </div>

      {/* Content */}
      {activeTab === "props" && (
        <div className="grid grid-cols-[180px_1fr] gap-y-3 text-sm">
          <Label>Name</Label>
          <Value>{task.title}</Value>

          <Label>Description</Label>
          <Value>{task.description || "-"}</Value>

          <Label>Status</Label>
          <Value>
            <StatusBadge status={task.status} />
          </Value>

          <Label>Priority</Label>
          <Value>
            <PriorityBadge priority={task.priority} />
          </Value>

          <Label>Members</Label>
          <Value>{task.members.map((m) => m.name).join(", ") || "-"}</Value>

          <Label>Date Created</Label>
          <Value>{new Date(task.createdAt).toLocaleString()}</Value>

          <Label>Date Updated</Label>
          <Value>{new Date(task.updatedAt).toLocaleString()}</Value>
        </div>
      )}

      {activeTab === "attachments" && (
        <div className="text-sm">
          <div className="mb-2 grid grid-cols-[120px_1fr_160px] font-medium text-gray-600">
            <div>Type</div>
            <div>Name</div>
            <div>Uploaded by</div>
          </div>

          {/* Images */}
          {task.images?.map((img) => (
            <div
              key={img.id}
              className="grid grid-cols-[120px_1fr_160px] items-center border-t border-gray-200 py-2 cursor-pointer hover:bg-gray-50"
              onClick={() => window.open(img.url, "_blank")}
            >
              <div className="text-blue-600">Image</div>
              <div className="truncate">{img.name}</div>
              <div className="text-gray-500 text-sm">{img.uploadedBy?.name ?? "Unknown"}</div>
            </div>
          ))}

          {/* Files */}
          {task.files?.map((file) => (
            <div
              key={file.id}
              className="grid grid-cols-[120px_1fr_160px] items-center border-t border-gray-200 py-2 cursor-pointer hover:bg-gray-50"
              onClick={() => window.open(file.url, "_blank")}
            >
              <div className="text-gray-700">File</div>
              <div className="truncate">{file.name}</div>
              <div className="text-gray-500 text-sm">{file.uploadedBy?.name ?? "Unknown"}</div>
            </div>
          ))}

          {attachmentsCount === 0 && <div className="py-4 text-gray-500">No attachments</div>}
        </div>
      )}
      {activeTab === "history" && (
        <div className="space-y-3 text-sm">
          {histories.map((h, idx) => (
            <HistoryItem key={idx} title={h.title} time={h.time} />
          ))}

          {histories.length === 0 && <div className="text-gray-500">No history</div>}
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
        <button
          className="btn-primary border rounded-xl border-gray-200  px-4 py-2 cursor-pointer "
          onClick={() => {
            setUpdateForm({
              title: task.title,
              description: task.description,
              status: task.status,
              priority: task.priority,
            })
            setShowUpdate(true)
          }}
        >
          Update
        </button>
        {showUpdate && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowUpdate(false)}
          >
            <div className="w-[400px] rounded-xl bg-white p-4" onClick={(e) => e.stopPropagation()}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">Update Task</h3>
                <button onClick={() => setShowUpdate(false)}>✕</button>
              </div>

              <div className="space-y-3 text-sm">
                <input
                  className="w-full rounded border p-2"
                  placeholder="Title"
                  value={updateForm.title ?? ""}
                  onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
                />

                <textarea
                  className="w-full rounded border p-2"
                  placeholder="Description"
                  value={updateForm.description ?? ""}
                  onChange={(e) => setUpdateForm({ ...updateForm, description: e.target.value })}
                />

                <select
                  className="w-full rounded border p-2"
                  value={updateForm.status}
                  onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value as any })}
                >
                  <option value="todo">Todo</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>

                <select
                  className="w-full rounded border p-2"
                  value={updateForm.priority}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, priority: e.target.value as any })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button className="rounded border px-3 py-1 " onClick={() => setShowUpdate(false)}>
                  Cancel
                </button>

                <button
                  className="rounded bg-blue-600 px-3 py-1 text-white"
                  onClick={async () => {
                    await updateTask(taskId, updateForm)
                    const updated = await getTaskById(taskId)
                    setTask(updated)
                    setShowUpdate(false)
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          className="btn-danger rounded-xl border px-4 py-2 cursor-pointer border-gray-200 "
          onClick={() => setShowDelete(true)}
        >
          Delete
        </button>
        {showDelete && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowDelete(false)}
          >
            <div className="rounded-xl bg-white p-4" onClick={(e) => e.stopPropagation()}>
              <h3 className="mb-3 font-semibold">Are you sure you want to delete this task?</h3>

              <div className="flex justify-end gap-2">
                <button className="rounded border px-3 py-1" onClick={() => setShowDelete(false)}>
                  Cancel
                </button>
                <button
                  className="rounded bg-red-600 px-3 py-1 text-white"
                  onClick={async () => {
                    await deleteTask(taskId)
                    window.location.href = "/tasks"
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <label className="btn-secondary rounded-xl px-4 py-2 cursor-pointer border border-gray-200">
          Add File
          <input
            type="file"
            hidden
            onChange={(e) => {
              if (!e.target.files) return
              const files = Array.from(e.target.files)
              addTaskFiles(taskId, files)
            }}
          />
        </label>

        <label className="btn-secondary rounded-xl px-4 py-2 cursor-pointer border border-gray-200">
          Add Image
          <input
            type="file"
            accept="image/*"
            hidden
            multiple
            onChange={(e) => {
              if (!e.target.files) return
              const images = Array.from(e.target.files)
              addTaskImages(taskId, images)
            }}
          />
        </label>
        <button
          className="rounded-xl border px-4 py-2 cursor-pointer border-gray-200 hover:bg-gray-50"
          onClick={() => {
            setMemberEmail("")
            setShowAddMember(true)
          }}
        >
          Add Member
        </button>
        {showAddMember && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowAddMember(false)}
          >
            <div className="w-[360px] rounded-xl bg-white p-4" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">Add member</h3>
                <button onClick={() => setShowAddMember(false)}>✕</button>
              </div>

              {/* Content */}
              <div className="space-y-3 text-sm">
                <input
                  type="email"
                  className="w-full rounded border px-3 py-2"
                  placeholder="Enter email..."
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="rounded border px-3 py-1"
                  onClick={() => setShowAddMember(false)}
                >
                  Cancel
                </button>

                <button
                  className="rounded bg-blue-600 px-3 py-1 text-white disabled:opacity-50"
                  disabled={!memberEmail}
                  onClick={async () => {
                    await addTaskMemberByEmail(taskId, { email: memberEmail })
                    const updated = await getTaskById(taskId)
                    setTask(updated)
                    setShowAddMember(false)
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- Small components ---------- */

function Label({ children }: { children: React.ReactNode }) {
  return <div className="font-medium text-gray-600">{children}</div>
}

function Value({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

function StatusBadge({ status }: { status: string }) {
  return <span className="rounded bg-green-500 px-2 py-1 text-white">{status}</span>
}

function PriorityBadge({ priority }: { priority: string }) {
  return <span className="rounded bg-yellow-400 px-2 py-1 text-white">{priority}</span>
}

/* ---------- Handlers ---------- */

async function handleDelete(taskId: string) {
  if (!confirm("Delete this task?")) return
  await deleteTask(taskId)
  window.location.href = "/tasks"
}

async function handleUpdate(taskId: string) {
  // ví dụ tạm
  await updateTask(taskId, {
    title: "Updated title",
  })
}
