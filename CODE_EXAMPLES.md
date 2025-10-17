# 💻 Code Examples & Exercises - Todo App

## 📋 Mục Lục
1. [Component Examples](#component-examples)
2. [State Management Examples](#state-management-examples)
3. [Exercises by Week](#exercises-by-week)
4. [Common Patterns](#common-patterns)
5. [Debugging Tips](#debugging-tips)

---

## 🎨 Component Examples

### 1. TaskCard Component (Complete)

```typescript
// components/TaskCard.tsx
"use client";

import { Task } from "@/types/type";
import { Trash, Edit2, Calendar } from "iconsax-react";

type TaskCardProps = {
  task: Task;
  onStatusChange: (id: string, status: Task["status"]) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export default function TaskCard({ task, onStatusChange, onDelete, onEdit }: TaskCardProps) {
  // Status badge colors
  const statusColors = {
    todo: "bg-gray-100 text-gray-700",
    "in-progress": "bg-blue-100 text-blue-700",
    done: "bg-green-100 text-green-700",
  };

  // Priority colors
  const priorityColors = {
    low: "border-l-gray-400",
    medium: "border-l-yellow-400",
    high: "border-l-red-400",
  };

  return (
    <div
      className={`
        border-l-4 ${priorityColors[task.priority || "low"]}
        bg-[var(--c-surface)] 
        border border-[rgb(var(--c-border-rgb)/1)]
        rounded-lg p-4 
        hover:shadow-md transition-shadow
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-[var(--c-text)]">{task.title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task.id)}
            className="p-1 hover:bg-[rgb(var(--c-text-rgb)/0.06)] rounded"
            aria-label="Edit task"
          >
            <Edit2 size={16} color="currentColor" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 hover:bg-red-50 text-red-500 rounded"
            aria-label="Delete task"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-[rgb(var(--c-text-rgb)/0.7)] mb-3">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Status Dropdown */}
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as Task["status"])}
          className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${statusColors[task.status]}
            border-none outline-none cursor-pointer
          `}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {/* Due Date */}
        {task.dueDate && (
          <div className="flex items-center gap-1 text-xs text-[rgb(var(--c-text-rgb)/0.6)]">
            <Calendar size={14} />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

### 2. AddTaskForm Component (Complete)

```typescript
// components/AddTaskForm.tsx
"use client";

import { useState } from "react";
import { Task } from "@/types/type";
import { AddSquare } from "iconsax-react";

type AddTaskFormProps = {
  onAdd: (task: Omit<Task, "id" | "createdAt">) => void;
};

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      status: "todo",
      priority,
      dueDate: dueDate || undefined,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    setIsOpen(false);
  };

  return (
    <div>
      {/* Add Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            flex items-center gap-2 
            px-4 py-2 
            bg-[var(--c-primary)] text-white 
            rounded-lg 
            hover:opacity-90 
            transition-opacity
          "
        >
          <AddSquare size={20} />
          <span>Add Task</span>
        </button>
      )}

      {/* Form */}
      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="
            bg-[var(--c-surface)] 
            border border-[rgb(var(--c-border-rgb)/1)]
            rounded-lg p-4 
            space-y-4
          "
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="
                w-full px-3 py-2 
                border border-[rgb(var(--c-border-rgb)/1)]
                rounded-lg 
                bg-[var(--c-surface)] text-[var(--c-text)]
                outline-none focus:ring-2 focus:ring-[var(--c-primary)]/40
              "
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description..."
              rows={3}
              className="
                w-full px-3 py-2 
                border border-[rgb(var(--c-border-rgb)/1)]
                rounded-lg 
                bg-[var(--c-surface)] text-[var(--c-text)]
                outline-none focus:ring-2 focus:ring-[var(--c-primary)]/40
                resize-none
              "
            />
          </div>

          {/* Priority & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Task["priority"])}
                className="
                  w-full px-3 py-2 
                  border border-[rgb(var(--c-border-rgb)/1)]
                  rounded-lg 
                  bg-[var(--c-surface)] text-[var(--c-text)]
                  outline-none focus:ring-2 focus:ring-[var(--c-primary)]/40
                "
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="
                  w-full px-3 py-2 
                  border border-[rgb(var(--c-border-rgb)/1)]
                  rounded-lg 
                  bg-[var(--c-surface)] text-[var(--c-text)]
                  outline-none focus:ring-2 focus:ring-[var(--c-primary)]/40
                "
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="
                px-4 py-2 
                border border-[rgb(var(--c-border-rgb)/1)]
                rounded-lg 
                hover:bg-[rgb(var(--c-text-rgb)/0.06)]
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="
                px-4 py-2 
                bg-[var(--c-primary)] text-white 
                rounded-lg 
                hover:opacity-90
              "
            >
              Add Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
```

---

### 3. TasksPage with Full CRUD (Complete)

```typescript
// app/tasks/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types/type";
import TaskCard from "@/components/TaskCard";
import AddTaskForm from "@/components/AddTaskForm";
import { SearchNormal, Filter } from "iconsax-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Task["status"] | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse tasks from localStorage", error);
      }
    }
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  // Update task status
  const updateTaskStatus = (id: string, status: Task["status"]) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)));
  };

  // Delete task
  const deleteTask = (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // Edit task (placeholder - you can implement modal later)
  const editTask = (id: string) => {
    alert(`Edit task ${id} - Implement modal later`);
  };

  // Filter & Search
  const filteredTasks = tasks
    .filter((task) => filter === "all" || task.status === filter)
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Group by status
  const tasksByStatus = {
    todo: filteredTasks.filter((t) => t.status === "todo"),
    "in-progress": filteredTasks.filter((t) => t.status === "in-progress"),
    done: filteredTasks.filter((t) => t.status === "done"),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--c-text)]">Tasks</h1>
        <AddTaskForm onAdd={addTask} />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <SearchNormal
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--c-text-rgb)/0.5)]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="
              w-full pl-10 pr-4 py-2 
              border border-[rgb(var(--c-border-rgb)/1)]
              rounded-lg 
              bg-[var(--c-surface)] text-[var(--c-text)]
              outline-none focus:ring-2 focus:ring-[var(--c-primary)]/40
            "
          />
        </div>

        {/* Status Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Task["status"] | "all")}
          className="
            px-4 py-2 
            border border-[rgb(var(--c-border-rgb)/1)]
            rounded-lg 
            bg-[var(--c-surface)] text-[var(--c-text)]
            outline-none focus:ring-2 focus:ring-[var(--c-primary)]/40
          "
        >
          <option value="all">All Tasks</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold">{tasksByStatus.todo.length}</div>
          <div className="text-sm text-[rgb(var(--c-text-rgb)/0.7)]">Todo</div>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4">
          <div className="text-2xl font-bold">{tasksByStatus["in-progress"].length}</div>
          <div className="text-sm text-[rgb(var(--c-text-rgb)/0.7)]">In Progress</div>
        </div>
        <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4">
          <div className="text-2xl font-bold">{tasksByStatus.done.length}</div>
          <div className="text-sm text-[rgb(var(--c-text-rgb)/0.7)]">Done</div>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[rgb(var(--c-text-rgb)/0.5)]">
            {searchQuery || filter !== "all" ? "No tasks found" : "No tasks yet. Add one to get started!"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={updateTaskStatus}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 🔄 State Management Examples

### 1. Basic useState

```typescript
// Simple counter
const [count, setCount] = useState(0);

// Increment
setCount(count + 1); // ❌ Can cause issues with async updates
setCount((prev) => prev + 1); // ✅ Always use functional update

// Array state
const [items, setItems] = useState<string[]>([]);

// Add item
setItems([...items, "new item"]); // ❌ Mutates original
setItems((prev) => [...prev, "new item"]); // ✅ Better

// Remove item
setItems(items.filter((item) => item !== "remove me"));

// Update item
setItems(items.map((item) => (item.id === id ? { ...item, updated: true } : item)));
```

### 2. useEffect Patterns

```typescript
// Run once on mount
useEffect(() => {
  console.log("Component mounted");
}, []); // ← Empty dependency array

// Run when dependency changes
useEffect(() => {
  console.log("Count changed:", count);
}, [count]);

// Cleanup
useEffect(() => {
  const timer = setInterval(() => console.log("tick"), 1000);

  return () => {
    clearInterval(timer); // ← Cleanup on unmount
  };
}, []);

// Async in useEffect
useEffect(() => {
  async function fetchData() {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    setTasks(data);
  }

  fetchData();
}, []);
```

### 3. LocalStorage Pattern

```typescript
// Custom hook for localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    // Initialize from localStorage
    if (typeof window === "undefined") return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Save to localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

// Usage
const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
```

---

## 📝 Exercises by Week

### Week 1 Exercises

#### Exercise 1.1: Dynamic Route
**Task:** Create `/tasks/[id]/page.tsx` that displays task ID from URL

**Solution:**
```typescript
// app/tasks/[id]/page.tsx
export default function TaskDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Task Detail</h1>
      <p>Task ID: {params.id}</p>
    </div>
  );
}
```

#### Exercise 1.2: TaskCard Styling
**Task:** Style TaskCard with different colors based on priority

**Hint:**
```typescript
const priorityColors = {
  low: "border-l-gray-400",
  medium: "border-l-yellow-400",
  high: "border-l-red-400",
};

<div className={`border-l-4 ${priorityColors[task.priority]}`}>
```

#### Exercise 1.3: Task List
**Task:** Display array of tasks using `.map()`

**Hint:**
```typescript
{tasks.map((task) => (
  <TaskCard key={task.id} task={task} />
))}
```

---

### Week 2 Exercises

#### Exercise 2.1: Update Status
**Task:** Implement status dropdown that updates task

**Solution:**
```typescript
const updateStatus = (id: string, status: string) => {
  setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
};

// In TaskCard
<select value={task.status} onChange={(e) => onStatusChange(task.id, e.target.value)}>
  <option value="todo">Todo</option>
  <option value="in-progress">In Progress</option>
  <option value="done">Done</option>
</select>
```

#### Exercise 2.2: Filter Tasks
**Task:** Filter tasks by status

**Solution:**
```typescript
const [filter, setFilter] = useState("all");

const filteredTasks =
  filter === "all" ? tasks : tasks.filter((t) => t.status === filter);
```

#### Exercise 2.3: Search Tasks
**Task:** Search tasks by title

**Solution:**
```typescript
const [search, setSearch] = useState("");

const searchedTasks = tasks.filter((t) =>
  t.title.toLowerCase().includes(search.toLowerCase())
);
```

---

## 🎯 Common Patterns

### 1. Conditional Rendering

```typescript
// If/else
{isLoading ? <Spinner /> : <TaskList />}

// Show if true
{error && <ErrorMessage />}

// Show if exists
{task.description && <p>{task.description}</p>}

// Multiple conditions
{
  status === "loading" ? <Spinner /> :
  status === "error" ? <Error /> :
  <TaskList />
}
```

### 2. Event Handlers

```typescript
// Inline
<button onClick={() => deleteTask(task.id)}>Delete</button>

// Function reference
<button onClick={handleClick}>Click</button>

// With event object
<input onChange={(e) => setValue(e.target.value)} />

// Prevent default
<form onSubmit={(e) => {
  e.preventDefault();
  handleSubmit();
}}>
```

### 3. Array Operations

```typescript
// Add
setTasks([...tasks, newTask]);
setTasks((prev) => [...prev, newTask]); // ← Better

// Remove
setTasks(tasks.filter((t) => t.id !== id));

// Update
setTasks(tasks.map((t) => (t.id === id ? { ...t, updated: true } : t)));

// Sort
const sorted = [...tasks].sort((a, b) => a.createdAt.localeCompare(b.createdAt));

// Find
const task = tasks.find((t) => t.id === id);
```

---

## 🐛 Debugging Tips

### 1. Console Logging

```typescript
// Log state changes
useEffect(() => {
  console.log("Tasks updated:", tasks);
}, [tasks]);

// Log renders
console.log("Component rendered");

// Log props
console.log("Received props:", { task, onDelete });
```

### 2. React DevTools
- Install React DevTools extension
- Inspect component props/state
- Track re-renders

### 3. Common Errors

**Error:** "Cannot read property of undefined"
```typescript
// ❌ Bad
<div>{task.title}</div>

// ✅ Good
<div>{task?.title}</div>
<div>{task && task.title}</div>
```

**Error:** "Objects are not valid as React child"
```typescript
// ❌ Bad
<div>{task}</div> // task is object

// ✅ Good
<div>{task.title}</div>
<div>{JSON.stringify(task)}</div>
```

**Error:** "Each child should have unique key"
```typescript
// ❌ Bad
{tasks.map((task) => <TaskCard task={task} />)}

// ✅ Good
{tasks.map((task) => <TaskCard key={task.id} task={task} />)}
```

---

## 🚀 Next Steps

After completing all exercises:
1. **Refactor** with Context API
2. **Add** drag & drop
3. **Implement** Kanban board view
4. **Deploy** to Vercel
5. **Integrate** with real API

**Good luck! 💪**
