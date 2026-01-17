// app/task/[taskId]/page.tsx
import TaskDetail from "./TaskDetail"

interface PageProps {
  params: {
    taskId: string
  }
}

export default function TaskDetailPage({ params }: PageProps) {
  return <TaskDetail taskId={params.taskId} />
}
