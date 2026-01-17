import Image from "next/image"
import { TaskMemberResponseDto } from "../types/type"

function getInitial(name?: string) {
  return (name?.trim()?.[0] ?? "?").toUpperCase()
}

export function AvatarGroup({ users }: { users: TaskMemberResponseDto[] }) {
  const visible = users.slice(0, 3)
  const rest = users.length - visible.length

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((u) => (
        <div
          key={u.userId}
          className="
            relative
            w-7 h-7
            rounded-full
            border-2 border-white
            overflow-hidden
            bg-gray-200
            grid place-items-center
          "
        >
          {u.avatarSrc ? (
            <Image
              src={u.avatarSrc}
              alt={u.name || "User avatar"}
              fill
              sizes="28px"
              className="object-cover"
            />
          ) : (
            <span
              className="
                w-full h-full
                rounded-full
                bg-[var(--c-primary)]
                text-white
                grid place-items-center
                text-xs font-medium
              "
            >
              {getInitial(u.name)}
            </span>
          )}
        </div>
      ))}

      {rest > 0 && (
        <div
          className="
            w-7 h-7
            rounded-full
            border-2 border-white
            bg-gray-100
            text-gray-600
            text-xs font-medium
            grid place-items-center
          "
        >
          +{rest}
        </div>
      )}
    </div>
  )
}
