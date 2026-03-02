// app/task/[taskId]/page.tsx
import TaskDetail from "./TaskDetail"

interface PageProps {
  params: {
    taskId: string
  }
}

export default async function TaskDetailPage({ params }: PageProps) {
  const { taskId } = await params
  return <TaskDetail taskId={taskId} />
}
