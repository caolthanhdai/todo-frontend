import Image from "next/image"
import { MessageAuthorDto } from "@/types/type"

function getInitial(name?: string) {
  return (name?.trim()?.[0] ?? "?").toUpperCase()
}

export function UserAvatar({ user }: { user: MessageAuthorDto }) {
  if (user.avatarSrc) {
    return (
      <Image
        src={user.avatarSrc}
        alt={user.name}
        width={32}
        height={32}
        className="rounded-full object-cover"
      />
    )
  }

  return (
    <span className="h-8 w-8 rounded-full bg-[var(--c-primary)] text-white grid place-items-center text-sm font-medium">
      {getInitial(user.name)}
    </span>
  )
}
