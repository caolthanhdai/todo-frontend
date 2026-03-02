import { useNotificationStore } from "../app/store/UIStore"
import { useRouter } from "next/navigation"
import { useRef } from "react"
export default function NotificationDropdown() {
  const ref = useRef<HTMLDivElement>(null)
  const items = useNotificationStore((s) => s.items)
  const open = useNotificationStore((s) => s.open)
  const router = useRouter()

  if (!open) return null

  return (
    <div
      ref={ref}
      data-notification-dropdown
      className="absolute right-4 top-14 w-80
      bg-[var(--c-surface)]
      border rounded-xl shadow-xl z-50 overflow-hidden"
    >
      {items.length === 0 && <div className="p-4 text-sm opacity-60">No notifications</div>}

      {items.map((n) => (
        <div
          key={n.id}
          onClick={() => {
            if (n.payload!.taskId) {
              router.push(`/tasks/${n.payload!.taskId}`)
            }
          }}
          className="p-3 text-sm border-b last:border-b-0
            hover:bg-black/5 cursor-pointer"
        >
          <div className="font-medium">{n.title}</div>
          {n.content && <div className="text-xs opacity-70 line-clamp-2">{n.content}</div>}
        </div>
      ))}
    </div>
  )
}
