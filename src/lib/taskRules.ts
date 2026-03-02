import { TaskStatus } from "@/types/type"

export const ALLOWED_TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
  todo: ["in_progress"],
  in_progress: ["todo", "done"],
  done: [],
}

export function canMove(from: TaskStatus, to: TaskStatus) {
  return ALLOWED_TRANSITIONS[from]?.includes(to)
}
