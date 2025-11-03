"use client";

import Image from "next/image";
import { Message, Folder2 } from "iconsax-react";
import { Task } from "../types/type";
import { AvatarGroup } from "./AvatarGroup"; 


export default function TaskCard({ task }: { task: Task }) {
  const { title, priority, images, members = [], comments = [] } = task;
  const priorityColor =
    priority === "high"
      ? "bg-red-100 text-red-600"
      : priority === "medium"
      ? "bg-yellow-100 text-yellow-600"
      : "bg-green-100 text-green-600";

  return (
    <div className="rounded-xl border border-[rgb(var(--c-border-rgb)/1)] bg-[var(--c-surface)]/90 shadow-sm hover:shadow-md transition-shadow p-3 space-y-3">
      {/* Priority */}
      <span
        className={`text-xs font-medium px-2 py-1 rounded-md ${priorityColor}`}
      >
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>

      {/* Title */}
      <h3 className="text-base font-semibold text-[var(--c-text)]">
        {title}
      </h3>

      {/* Image */}
      {images?.[0] && (
        <div className="relative w-full h-28 overflow-hidden rounded-lg">
          <Image
            src={images[0].url}
            alt={images[0].name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Bottom info */}
      <div className="flex items-center justify-between text-sm text-[var(--c-text)]">
        {/* Avatars */}
        <AvatarGroup users={members} />

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Message size={16} color="currentcolor"/> {comments.length}
          </div>
          <div className="flex items-center gap-1">
            <Folder2 size={16} color="currentcolor"/> {task.files?.length ?? 0}
          </div>
        </div>
      </div>
    </div>
  );
}
