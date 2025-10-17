export type User = {
    name: string;
    email: string;
    avatarSrc?: string | React.ReactNode;
    location?: string;
    unreadNotifications?: number;
}

// Task types for Todo App
export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string;
    createdAt: string;
}