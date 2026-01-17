export default function HistoryItem({ title, time }: { title: string; time: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-2 rounded-full bg-blue-500" />
      <div className="flex-1">
        <div>{title}</div>
        <div className="text-xs text-gray-500">{new Date(time).toLocaleString()}</div>
      </div>
    </div>
  )
}
