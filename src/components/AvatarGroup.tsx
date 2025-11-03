import Image from "next/image";
import { User } from "../types/type";

export function AvatarGroup({ users }: { users: User[] }) {
  return (
    <div className="flex -space-x-2">
      {users.slice(0, 3).map((u) => (
        <Image
          key={u.userId}
          src={typeof u.avatarSrc === "string" ? u.avatarSrc : "/default-avatar.png"}
          alt={u.name}
          width={28}
          height={28}
          className="rounded-full border-2 border-[rgb(var(--c-border-rgb)/1)]"
        />
      ))}
      {users.length > 3 && (
        <div className="w-7 h-7 flex items-center justify-center text-xs bg-[var(--c-surface)]/90 rounded-full border-2 border-white">
          +{users.length - 3}
        </div>
      )}
    </div>
  );
}
