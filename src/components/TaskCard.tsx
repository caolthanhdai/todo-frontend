"use client"
import { More } from "iconsax-react"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

import Image from "next/image"
import { Message, Folder2 } from "iconsax-react"
import { TaskResponseDto } from "../types/type"
import { AvatarGroup } from "./AvatarGroup"

export default function TaskCard({
  task,
  onRequestDelete,
}: {
  task: TaskResponseDto
  onRequestDelete: (taskId: string) => void
}) {
  const [openMenu, setOpenMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { title, priority, images = [], members = [], messagesCount, files } = task

  const priorityMap = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-600",
    low: "bg-green-100 text-green-600",
  }
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false)
      }
    }

    if (openMenu) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [openMenu])

  const displayImages = images.slice(0, 2)

  return (
    <div className="relative rounded-xl border border-[rgb(var(--c-border-rgb)/1)] bg-[var(--c-surface)] p-3 space-y-3 hover:shadow-md transition">
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        onClick={() => setOpenMenu((v) => !v)}
      >
        <More size={18} color="currentColor" />
      </button>
      {openMenu && (
        <div
          ref={menuRef}
          className="absolute top-10 right-3 z-20 w-40 rounded-lg border bg-white shadow-md text-sm"
        >
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => router.push(`/tasks/${task.taskId}`)}
          >
            Chi tiết hơn
          </button>

          <button
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
            onClick={() => {
              setOpenMenu(false)
              onRequestDelete(task.taskId)
            }}
          >
            Delete
          </button>
        </div>
      )}
      {/* Priority */}

      <span
        className={`inline-block text-xs font-medium px-2 py-1 rounded-md ${priorityMap[priority]}`}
      >
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>

      {/* Title */}
      <h3 className="font-semibold text-sm text-[var(--c-text)] line-clamp-2">{title}</h3>

      {/* Images */}
      {displayImages.length === 1 && (
        <div className="relative w-full h-36 rounded-lg overflow-hidden">
          <Image
            src={displayImages[0].url}
            alt={displayImages[0].name || "Task image"}
            fill
            className="object-cover"
          />
        </div>
      )}

      {displayImages.length === 2 && (
        <div className="grid grid-cols-2 gap-2">
          {displayImages.map((img) => (
            <div key={img.url} className="relative h-24 rounded-lg overflow-hidden">
              <Image src={img.url} alt={img.name || "Task image"} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Bottom */}
      <div className="flex items-center justify-between pt-1">
        <AvatarGroup users={members} />

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Message size={14} color="currentColor" />{" "}
            {messagesCount == 1 ? "1 Message" : messagesCount + " Messages"}
          </div>
          <div className="flex items-center gap-1">
            <Folder2 size={14} color="currentColor" />{" "}
            {files?.length == 0
              ? "0 File"
              : files?.length == 1
                ? "1 File"
                : files?.length + " Files"}
          </div>
        </div>
      </div>
    </div>
  )
}
