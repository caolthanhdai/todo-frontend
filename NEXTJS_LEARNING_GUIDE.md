# 📚 Next.js Learning Guide - Todo App Frontend

## 📋 Mục Lục
1. [Hiện Trạng Dự Án](#hiện-trạng-dự-án)
2. [Kiến Thức Next.js Core](#kiến-thức-nextjs-core)
3. [Phân Tích Source Code](#phân-tích-source-code)
4. [Kế Hoạch 2 Tuần](#kế-hoạch-2-tuần)
5. [Roadmap Tính Năng](#roadmap-tính-năng)

---

## 🎯 Hiện Trạng Dự Án

### Trình Độ Intern
- ✅ **Đã biết**: JavaScript cơ bản
- ✅ **Đã làm**: Tự build layout, routing cơ bản
- ❌ **Chưa biết**: State management, data fetching, CRUD operations
- ❌ **Khó khăn**: Phân biệt Server vs Client Components, implement features

### Source Code Hiện Tại

#### ✅ Đã Có
```
✓ Layout System (Sidebar + Header)
✓ 4 Routes: /dashboard, /tasks, /messages, /settings
✓ Responsive design (mobile sidebar)
✓ Dark/Light theme toggle
✓ TypeScript setup
✓ TailwindCSS styling
```

#### ❌ Chưa Có
```
✗ Todo CRUD operations (Create, Read, Update, Delete)
✗ Task components (TaskCard, TaskList, TaskForm)
✗ State management cho tasks
✗ Data persistence (localStorage/API)
✗ Filter & sort logic
✗ Task status management (todo/in-progress/done)
```

#### 🔧 Tech Stack
```json
{
  "framework": "Next.js 15.5.4 (App Router)",
  "react": "19.1.0",
  "styling": "TailwindCSS 4",
  "icons": "iconsax-react",
  "language": "TypeScript"
}
```

---

## 🧠 Kiến Thức Next.js Core

### 1. App Router - File-based Routing
```
app/
├── layout.tsx          → Root layout (/)
├── page.tsx            → Homepage (/)
├── dashboard/
│   └── page.tsx        → /dashboard
└── tasks/
    ├── page.tsx        → /tasks
    └── [id]/
        └── page.tsx    → /tasks/123 (dynamic)
```

**Quy tắc:**
- `page.tsx` = accessible route
- `layout.tsx` = shared layout
- `[id]` = dynamic segment

---

### 2. Server vs Client Components

#### 🖥️ Server Components (Default)
```typescript
// app/dashboard/page.tsx
export default function DashboardPage() {
  // ✅ Render on server
  // ✅ Can fetch data directly
  // ❌ No useState, useEffect, onClick
  return <h1>Dashboard</h1>
}
```

#### 💻 Client Components
```typescript
// components/Sidebar.tsx
"use client";  // ← Required!

import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  // ✅ Can use hooks
  // ✅ Can handle events
  return <button onClick={() => setOpen(!open)}>Toggle</button>
}
```

**Khi nào dùng Client Component:**
- Cần `useState`, `useEffect`, hooks
- Cần event handlers (`onClick`, `onChange`)
- Cần browser APIs (`localStorage`, `window`)

---

### 3. React Hooks

#### `useState` - State Management
```typescript
const [count, setCount] = useState(0);
//     ↑ value   ↑ setter   ↑ initial

// Update
setCount(count + 1);
setCount(prev => prev + 1); // ← Better
```

#### `useEffect` - Side Effects
```typescript
useEffect(() => {
  // Runs after render
  console.log("Mounted");
  
  return () => {
    // Cleanup
    console.log("Unmounted");
  };
}, [dependency]); // ← Re-run when changes
```

**Ví dụ trong source:**
```typescript
// ThemeToggleButton.tsx
useEffect(() => {
  if (dark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [dark]);
```

---

### 4. Props & Component Communication

```typescript
// Parent
<Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

// Child
export default function Sidebar({ 
  collapsed, 
  setCollapsed 
}: { 
  collapsed: boolean; 
  setCollapsed: (val: boolean) => void;
}) {
  return <button onClick={() => setCollapsed(!collapsed)}>Toggle</button>
}
```

---

### 5. TypeScript Basics

```typescript
// types/type.ts
export type Task = {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority?: "low" | "medium" | "high";  // optional
  createdAt: string;
}

// Usage
const task: Task = {
  id: "1",
  title: "Learn Next.js",
  status: "in-progress",
  createdAt: new Date().toISOString()
}
```

---

## 🔍 Phân Tích Source Code

### Cấu Trúc
```
src/
├── app/
│   ├── layout.tsx           # Root layout (Server)
│   ├── ClientShell.tsx      # State wrapper (Client)
│   ├── page.tsx             # Home (redirect to /dashboard)
│   ├── dashboard/page.tsx   # Dashboard page
│   ├── tasks/page.tsx       # Tasks page (empty)
│   ├── messages/page.tsx
│   └── settings/page.tsx
│
├── components/
│   ├── Sidebar.tsx          # Desktop sidebar
│   ├── MobieSideBar.tsx     # Mobile sidebar
│   ├── Header.tsx           # Top header
│   └── ThemeToggleButton.tsx
│
├── lib/
│   └── api.ts               # API functions (EMPTY)
│
├── types/
│   └── type.ts              # Type definitions
│
└── styles/
    └── global.css           # CSS variables + theme
```

### Flow Hoạt Động

#### 1. App Initialization
```
User → http://localhost:3000/
  ↓
next.config.ts redirect → /dashboard
  ↓
layout.tsx (Server)
  ↓
ClientShell.tsx (Client - manages state)
  ↓
Sidebar + Header + Page content
```

#### 2. State Management
```
ClientShell.tsx
├── mobileOpen: boolean     → MobileSidebar
├── collapsed: boolean      → Sidebar
└── dark: boolean           → (unused, ThemeToggleButton has own state)
```

#### 3. Theme Toggle
```
User clicks ThemeToggleButton
  ↓
setDark(true)
  ↓
useEffect → document.documentElement.classList.add("dark")
  ↓
CSS variables switch (global.css)
  ↓
UI re-renders with new colors
```

### Chi Tiết Components

#### `app/layout.tsx` (Server)
```typescript
export const metadata = { title: "Project M" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
```
- ✅ Root layout
- ✅ Metadata (SEO)
- ❌ No state/hooks (Server Component)

#### `app/ClientShell.tsx` (Client)
```typescript
"use client";
import { useState } from "react";

export default function ClientShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <section>
        <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <main>{children}</main>
      </section>
    </div>
  );
}
```
- ✅ Manages state
- ✅ Passes props to Sidebar/Header
- ⚠️ `dark` state unused

#### `components/Sidebar.tsx` (Client)
```typescript
"use client";
const navItems = [
  { label: "Home", href: "/dashboard", icon: <Home /> },
  { label: "Tasks", href: "/tasks", icon: <TaskSquare /> },
  // ...
];

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside className={collapsed ? "w-[72px]" : "w-[224px]"}>
      {navItems.map(item => (
        <Link href={item.href}>{item.icon} {!collapsed && item.label}</Link>
      ))}
    </aside>
  );
}
```
- ✅ Navigation links
- ✅ Collapse animation
- ✅ Sticky position

#### `styles/global.css`
```css
:root {
  --c-text: #111827;
  --c-surface: #ffffff;
  --c-primary: #4f46e5;
}

html.dark {
  --c-text: #f1f5f9;
  --c-surface: #0f172a;
  --c-primary: #6366f1;
}
```
- ✅ CSS variables for theming
- ✅ Auto-switch on `.dark` class

---

## 📅 Kế Hoạch 2 Tuần

### 🎯 Mục Tiêu
1. Hiểu Next.js App Router, Server/Client Components
2. Thành thạo React hooks (useState, useEffect, useContext)
3. Implement CRUD operations cho Todo App
4. State management & data persistence

---

### TUẦN 1: Fundamentals + Basic Features

#### **Ngày 1-2: Routing & Components**

**Học:**
- App Router, dynamic routes
- Server vs Client Components
- Props & TypeScript

**Làm:**
1. Tạo route `/tasks/[id]` (task detail)
   ```typescript
   // app/tasks/[id]/page.tsx
   export default function TaskDetail({ params }: { params: { id: string } }) {
     return <h1>Task {params.id}</h1>
   }
   ```

2. Vẽ diagram flow của app

**Output:** Task detail page hoạt động

---

#### **Ngày 3-4: State & Task Components**

**Học:**
- `useState`, `useEffect`
- Component composition
- TailwindCSS styling

**Làm:**
1. Tạo Task type
   ```typescript
   // types/type.ts
   export type Task = {
     id: string;
     title: string;
     description: string;
     status: "todo" | "in-progress" | "done";
     priority: "low" | "medium" | "high";
     dueDate?: string;
     createdAt: string;
   }
   ```

2. Tạo TaskCard component
   ```typescript
   // components/TaskCard.tsx
   "use client";
   
   export default function TaskCard({ task }: { task: Task }) {
     return (
       <div className="border rounded-lg p-4">
         <h3>{task.title}</h3>
         <p>{task.description}</p>
         <span className={`badge ${task.status}`}>{task.status}</span>
       </div>
     );
   }
   ```

**Output:** TaskCard component với styling

---

#### **Ngày 5-6: Task List & Mock Data**

**Học:**
- Array mapping
- Conditional rendering
- Mock data

**Làm:**
1. Tạo mock tasks
   ```typescript
   // app/tasks/page.tsx
   "use client";
   import { useState } from "react";
   import TaskCard from "@/components/TaskCard";
   
   const mockTasks = [
     { id: "1", title: "Learn Next.js", status: "in-progress", ... },
     { id: "2", title: "Build Todo App", status: "todo", ... },
   ];
   
   export default function TasksPage() {
     const [tasks] = useState(mockTasks);
     
     return (
       <div>
         <h1>Tasks</h1>
         <div className="grid gap-4">
           {tasks.map(task => <TaskCard key={task.id} task={task} />)}
         </div>
       </div>
     );
   }
   ```

**Output:** Task list hiển thị mock data

---

#### **Ngày 7: Create Task Form**

**Học:**
- Form handling
- Controlled inputs
- Add to array state

**Làm:**
1. Tạo AddTaskForm component
   ```typescript
   // components/AddTaskForm.tsx
   "use client";
   import { useState } from "react";
   
   export default function AddTaskForm({ onAdd }: { onAdd: (task: Task) => void }) {
     const [title, setTitle] = useState("");
     const [description, setDescription] = useState("");
     
     const handleSubmit = (e) => {
       e.preventDefault();
       onAdd({
         id: Date.now().toString(),
         title,
         description,
         status: "todo",
         createdAt: new Date().toISOString()
       });
       setTitle("");
       setDescription("");
     };
     
     return (
       <form onSubmit={handleSubmit}>
         <input value={title} onChange={e => setTitle(e.target.value)} />
         <textarea value={description} onChange={e => setDescription(e.target.value)} />
         <button type="submit">Add Task</button>
       </form>
     );
   }
   ```

2. Integrate vào TasksPage
   ```typescript
   const [tasks, setTasks] = useState(mockTasks);
   
   const addTask = (task: Task) => {
     setTasks([...tasks, task]);
   };
   
   return (
     <>
       <AddTaskForm onAdd={addTask} />
       {tasks.map(task => <TaskCard task={task} />)}
     </>
   );
   ```

**Output:** Có thể thêm task mới

---

### TUẦN 2: Advanced Features

#### **Ngày 8-9: Update & Delete**

**Làm:**
1. Update task status
   ```typescript
   const updateTaskStatus = (id: string, status: TaskStatus) => {
     setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
   };
   
   // In TaskCard
   <select value={task.status} onChange={e => onStatusChange(task.id, e.target.value)}>
     <option value="todo">Todo</option>
     <option value="in-progress">In Progress</option>
     <option value="done">Done</option>
   </select>
   ```

2. Delete task
   ```typescript
   const deleteTask = (id: string) => {
     setTasks(tasks.filter(t => t.id !== id));
   };
   
   // In TaskCard
   <button onClick={() => onDelete(task.id)}>Delete</button>
   ```

**Output:** CRUD hoàn chỉnh

---

#### **Ngày 10-11: Filter & Sort**

**Làm:**
1. Filter by status
   ```typescript
   const [filter, setFilter] = useState<TaskStatus | "all">("all");
   
   const filteredTasks = filter === "all" 
     ? tasks 
     : tasks.filter(t => t.status === filter);
   
   return (
     <>
       <select value={filter} onChange={e => setFilter(e.target.value)}>
         <option value="all">All</option>
         <option value="todo">Todo</option>
         <option value="in-progress">In Progress</option>
         <option value="done">Done</option>
       </select>
       {filteredTasks.map(task => <TaskCard task={task} />)}
     </>
   );
   ```

2. Sort by date/priority

**Output:** Filter & sort hoạt động

---

#### **Ngày 12-13: LocalStorage Persistence**

**Học:**
- `useEffect` với localStorage
- JSON serialize/deserialize

**Làm:**
```typescript
const [tasks, setTasks] = useState<Task[]>([]);

// Load from localStorage
useEffect(() => {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    setTasks(JSON.parse(saved));
  }
}, []);

// Save to localStorage
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
```

**Output:** Tasks persist sau reload

---

#### **Ngày 14: Context API (Optional)**

**Học:**
- Context API để tránh props drilling
- `useContext` hook

**Làm:**
```typescript
// contexts/TaskContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  
  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);

// Usage
const { tasks, setTasks } = useTasks();
```

**Output:** Refactor với Context API

---

## 🎨 Roadmap Tính Năng Todo App

### Phase 1: Core CRUD (Tuần 1)
```
✓ TaskCard component
✓ Task list display
✓ Add task form
✓ Update task status
✓ Delete task
```

### Phase 2: Enhanced UX (Tuần 2)
```
✓ Filter by status
✓ Sort by date/priority
✓ Search tasks
✓ LocalStorage persistence
✓ Loading states
✓ Empty states
```

### Phase 3: Advanced (Bonus)
```
□ Drag & drop (react-beautiful-dnd)
□ Task categories/tags
□ Due date picker
□ Task priority colors
□ Kanban board view (todo | in-progress | done columns)
□ Dark mode persistence
□ Export/Import tasks (JSON)
```

---

## 📚 Tài Nguyên Học Tập

### Official Docs
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

### Tutorials
- [Next.js App Router Tutorial](https://nextjs.org/learn)
- [React Hooks Guide](https://react.dev/reference/react)

### Tools
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [TailwindCSS Playground](https://play.tailwindcss.com)

---

## 🚀 Cách Sử Dụng Guide Này

### Cho Intern
1. **Đọc từ đầu đến cuối** để hiểu big picture
2. **Follow kế hoạch 2 tuần** từng ngày
3. **Code theo ví dụ**, sau đó customize
4. **Commit code mỗi ngày** với message rõ ràng
5. **Hỏi khi stuck** > 30 phút

### Cho Senior/Mentor
1. **Review code mỗi 2-3 ngày**
2. **Pair programming** khi intern stuck
3. **Code review** focus vào:
   - Component structure
   - State management
   - TypeScript types
   - Code style
4. **Adjust plan** nếu intern nhanh/chậm hơn dự kiến

---

## 📝 Checklist Hoàn Thành

### Tuần 1
- [ ] Hiểu App Router, dynamic routes
- [ ] Phân biệt Server vs Client Components
- [ ] Tạo được TaskCard component
- [ ] Hiển thị task list với mock data
- [ ] Implement Add Task form

### Tuần 2
- [ ] Update task status
- [ ] Delete task
- [ ] Filter by status
- [ ] Sort tasks
- [ ] LocalStorage persistence
- [ ] (Optional) Context API refactor

### Bonus
- [ ] Drag & drop
- [ ] Kanban board view
- [ ] Advanced filtering
- [ ] Export/Import

---

## 🎓 Kết Luận

Sau 2 tuần, intern sẽ:
- ✅ Hiểu Next.js App Router
- ✅ Thành thạo React hooks
- ✅ Có 1 Todo App hoàn chỉnh
- ✅ Sẵn sàng làm FE projects

**Next Steps:**
1. Deploy lên Vercel
2. Integrate với real API
3. Learn advanced patterns (Server Actions, Suspense)
4. Build project mới

---

**Chúc bạn học tốt! 🚀**
