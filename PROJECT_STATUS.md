# 📊 Project Status & AI Consultation Guide

## 🎯 Mục Đích Document
Document này tổng hợp **hiện trạng dự án**, **trình độ intern**, và **các vấn đề cần tư vấn** để có thể nhờ AI (ChatGPT, Claude, v.v.) hỗ trợ hiệu quả.

---

## 📋 Tổng Quan Dự Án

### Thông Tin Cơ Bản
- **Tên dự án:** Todo App Frontend
- **Mục tiêu:** Học Next.js từ zero to hero trong 2 tuần
- **Tech stack:** Next.js 15.5.4, React 19, TypeScript, TailwindCSS 4
- **Figma design:** [URL Figma design với card và status]

### Vai Trò
- **Senior FE:** Hướng dẫn, review code
- **Intern FE:** Học và implement features
- **AI Assistant:** Tư vấn khi stuck, giải thích concepts

---

## 👤 Trình Độ Intern

### ✅ Đã Biết
```
✓ JavaScript cơ bản (variables, functions, arrays, objects)
✓ HTML/CSS cơ bản
✓ Git basics (commit, push, pull)
✓ Đã tự build source code hiện tại (layout, routing)
```

### ❌ Chưa Biết / Yếu
```
✗ Next.js App Router (mới học)
✗ Server vs Client Components (chưa hiểu rõ)
✗ React Hooks (useState, useEffect) - chưa thành thạo
✗ State management patterns
✗ TypeScript advanced types
✗ Data fetching & persistence
✗ CRUD operations implementation
```

### 🎯 Mục Tiêu Sau 2 Tuần
```
→ Hiểu Next.js App Router
→ Thành thạo React hooks
→ Implement đầy đủ CRUD cho Todo App
→ Hiểu state management
→ Có thể làm việc độc lập trên FE projects
```

---

## 📁 Hiện Trạng Source Code

### Cấu Trúc Thư Mục
```
src/
├── app/
│   ├── layout.tsx              ✅ Root layout (Server Component)
│   ├── ClientShell.tsx         ✅ State wrapper (Client Component)
│   ├── page.tsx                ✅ Homepage (redirect to /dashboard)
│   ├── dashboard/page.tsx      ⚠️ UI only, no task logic
│   ├── tasks/page.tsx          ❌ Empty, cần implement
│   ├── messages/page.tsx       ✅ Placeholder
│   └── settings/page.tsx       ✅ Placeholder
│
├── components/
│   ├── Sidebar.tsx             ✅ Desktop sidebar hoàn chỉnh
│   ├── MobieSideBar.tsx        ✅ Mobile sidebar hoàn chỉnh
│   ├── Header.tsx              ✅ Header với search, notifications
│   └── ThemeToggleButton.tsx   ✅ Dark/light mode toggle
│
├── lib/
│   └── api.ts                  ❌ EMPTY - chưa có API functions
│
├── types/
│   └── type.ts                 ✅ User type, ✅ Task types (vừa thêm)
│
└── styles/
    └── global.css              ✅ CSS variables + theming
```

### Tính Năng Đã Hoàn Thành
```
✅ Layout System
   - Root layout với metadata
   - ClientShell quản lý state
   - Sidebar (desktop + mobile responsive)
   - Header với search bar, notifications, user profile

✅ Routing
   - 4 routes: /dashboard, /tasks, /messages, /settings
   - Redirect / → /dashboard
   - File-based routing setup

✅ UI Components
   - Sidebar với collapse animation
   - Mobile sidebar với overlay
   - Theme toggle (dark/light mode)
   - Responsive design (Tailwind breakpoints)

✅ Styling
   - TailwindCSS 4 setup
   - CSS variables cho theming
   - Dark mode với html.dark class

✅ TypeScript
   - User type definition
   - Task types (TaskStatus, TaskPriority, Task)
   - Component props typing
```

### Tính Năng Chưa Hoàn Thành
```
❌ Todo App Core Features
   - TaskCard component (chưa có)
   - TaskList component (chưa có)
   - AddTaskForm component (chưa có)
   - CRUD operations (Create, Read, Update, Delete)

❌ State Management
   - Task state management (chưa có)
   - Filter state (buttons có nhưng không hoạt động)
   - Sort state (chưa có)

❌ Data Persistence
   - localStorage integration (chưa có)
   - API integration (api.ts trống)

❌ Advanced Features
   - Search functionality (UI có nhưng không hoạt động)
   - Filter by status (UI có nhưng không hoạt động)
   - Sort by date/priority (chưa có)
   - Task detail page (chưa có)
   - Edit task modal (chưa có)
```

---

## 🚧 Vấn Đề Hiện Tại

### 1. State Management Issues
**Vấn đề:**
- `ClientShell.tsx` có `dark` state nhưng không dùng
- `ThemeToggleButton.tsx` có state riêng → không sync
- Props drilling (ClientShell → Sidebar/Header)

**Cần làm:**
- Refactor theme state lên ClientShell
- Hoặc dùng Context API để share state

### 2. Empty Files
**Vấn đề:**
- `lib/api.ts` trống hoàn toàn
- `app/tasks/page.tsx` chỉ có placeholder

**Cần làm:**
- Implement task CRUD logic trong `tasks/page.tsx`
- Tạo API functions trong `api.ts` (hoặc dùng localStorage trước)

### 3. Missing Components
**Vấn đề:**
- Không có TaskCard, TaskList, AddTaskForm components

**Cần làm:**
- Tạo các components này theo design Figma
- Follow examples trong `CODE_EXAMPLES.md`

### 4. No Data Persistence
**Vấn đề:**
- Tasks không được lưu (reload page → mất data)

**Cần làm:**
- Implement localStorage persistence
- Hoặc integrate với backend API

---

## 📝 Kế Hoạch 2 Tuần

### Tuần 1: Fundamentals + Basic CRUD
```
Ngày 1-2: Next.js Routing & Components
  → Học App Router, Server vs Client Components
  → Tạo dynamic route /tasks/[id]
  → Vẽ diagram flow

Ngày 3-4: React Hooks & Task Components
  → Học useState, useEffect
  → Tạo TaskCard component
  → Styling với TailwindCSS

Ngày 5-6: Task List & Mock Data
  → Display task list với mock data
  → Array mapping, conditional rendering

Ngày 7: Create Task Form
  → AddTaskForm component
  → Form handling, controlled inputs
  → Add task to state
```

### Tuần 2: Advanced Features
```
Ngày 8-9: Update & Delete
  → Update task status dropdown
  → Delete task với confirmation

Ngày 10-11: Filter & Sort
  → Filter by status
  → Search by title
  → Sort by date/priority

Ngày 12-13: LocalStorage Persistence
  → Save tasks to localStorage
  → Load on mount
  → useEffect patterns

Ngày 14: Context API (Optional)
  → Refactor với Context API
  → Tránh props drilling
```

---

## 🤖 Prompt Templates cho AI

### Template 1: Giải Thích Concept
```
Tôi đang học Next.js và cần giải thích về [CONCEPT].

Context:
- Tôi đã biết: JavaScript cơ bản
- Tôi đang làm: Todo App với Next.js 15
- Tôi chưa hiểu: [SPECIFIC ISSUE]

Ví dụ trong source code hiện tại:
[PASTE CODE]

Hãy giải thích:
1. [CONCEPT] là gì?
2. Tại sao cần dùng nó?
3. Cách hoạt động trong ví dụ trên?
4. Best practices?
```

**Ví dụ cụ thể:**
```
Tôi đang học Next.js và cần giải thích về Server vs Client Components.

Context:
- Tôi đã biết: JavaScript, React cơ bản
- Tôi đang làm: Todo App với Next.js 15
- Tôi chưa hiểu: Khi nào dùng "use client" và khi nào không

Ví dụ trong source code:
// app/layout.tsx (không có "use client")
export default function RootLayout({ children }) {
  return <html><body>{children}</body></html>
}

// app/ClientShell.tsx (có "use client")
"use client";
export default function ClientShell({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  return <div>...</div>
}

Hãy giải thích:
1. Server Component vs Client Component khác nhau như thế nào?
2. Tại sao layout.tsx không cần "use client" nhưng ClientShell.tsx cần?
3. Khi nào tôi nên dùng mỗi loại?
```

---

### Template 2: Debug Error
```
Tôi gặp lỗi khi implement [FEATURE].

Error message:
[PASTE ERROR]

Code hiện tại:
[PASTE CODE]

Tôi đã thử:
- [ATTEMPT 1]
- [ATTEMPT 2]

Hãy giúp tôi:
1. Tìm nguyên nhân lỗi
2. Giải pháp fix
3. Giải thích tại sao lỗi xảy ra
```

---

### Template 3: Implement Feature
```
Tôi cần implement [FEATURE] cho Todo App.

Requirements:
- [REQ 1]
- [REQ 2]

Source code hiện tại:
[PASTE RELEVANT CODE]

Tech stack:
- Next.js 15.5.4 (App Router)
- React 19
- TypeScript
- TailwindCSS 4

Hãy hướng dẫn:
1. Cấu trúc component/file cần tạo
2. Code example với comments giải thích
3. Best practices cần lưu ý
4. Common pitfalls cần tránh
```

**Ví dụ cụ thể:**
```
Tôi cần implement TaskCard component cho Todo App.

Requirements:
- Hiển thị task title, description, status, priority
- Dropdown để change status (todo/in-progress/done)
- Button delete task
- Button edit task
- Priority color coding (low=gray, medium=yellow, high=red)
- Responsive design

Tech stack:
- Next.js 15.5.4, React 19, TypeScript, TailwindCSS 4
- Icons: iconsax-react

Task type:
export type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt: string;
}

Hãy hướng dẫn:
1. Component structure với TypeScript props
2. Code example với TailwindCSS styling
3. Event handlers cho status change, delete, edit
4. Best practices cho component này
```

---

### Template 4: Code Review Request
```
Tôi vừa implement [FEATURE]. Hãy review code và suggest improvements.

Code:
[PASTE CODE]

Concerns:
- [CONCERN 1]
- [CONCERN 2]

Hãy review:
1. Code quality & best practices
2. Performance issues
3. TypeScript types
4. Accessibility
5. Suggestions for improvement
```

---

## 📚 Resources cho Intern

### Official Docs
- [Next.js Docs](https://nextjs.org/docs) - App Router section
- [React Docs](https://react.dev) - Hooks reference
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

### Tutorials
- [Next.js Learn Course](https://nextjs.org/learn) - Official tutorial
- [React Tutorial](https://react.dev/learn) - Official React guide

### Tools
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [TailwindCSS Playground](https://play.tailwindcss.com)
- React DevTools (Chrome extension)

---

## 🎯 Success Metrics

### Sau Tuần 1
```
✓ Hiểu App Router, dynamic routes
✓ Phân biệt Server vs Client Components
✓ Tạo được TaskCard, TaskList components
✓ Hiển thị mock data
✓ Implement Add Task form
```

### Sau Tuần 2
```
✓ CRUD operations hoàn chỉnh
✓ Filter & search hoạt động
✓ LocalStorage persistence
✓ Code clean, có comments
✓ Responsive design
✓ (Optional) Context API refactor
```

### Deliverables
```
✓ Working Todo App với full CRUD
✓ Clean, documented code
✓ Git commits với clear messages
✓ README với setup instructions
✓ (Optional) Deployed to Vercel
```

---

## 🆘 Khi Nào Cần Hỏi AI

### Nên Hỏi Khi:
- ✅ Stuck > 30 phút sau khi đã Google
- ✅ Không hiểu concept sau khi đọc docs
- ✅ Cần giải thích code example
- ✅ Gặp error không biết fix
- ✅ Cần review code pattern
- ✅ Cần suggestions cho implementation

### Không Nên Hỏi Khi:
- ❌ Chưa thử tự làm
- ❌ Chưa đọc docs/examples
- ❌ Hỏi "làm hộ tôi" thay vì "hướng dẫn tôi"
- ❌ Không provide context/code

### Best Practices Khi Hỏi AI:
1. **Provide context**: Tech stack, trình độ, mục tiêu
2. **Show code**: Paste relevant code, error messages
3. **Specific questions**: Thay vì "làm sao làm X", hỏi "tại sao X không hoạt động khi tôi làm Y"
4. **Show attempts**: "Tôi đã thử A, B nhưng vẫn lỗi C"
5. **Ask for explanation**: "Giải thích tại sao" thay vì chỉ "code cho tôi"

---

## 📞 Support Channels

### Khi Cần Hỗ Trợ:
1. **Tự research** (15-30 phút)
   - Google error message
   - Đọc docs
   - Xem examples trong CODE_EXAMPLES.md

2. **AI Assistant** (ChatGPT, Claude)
   - Giải thích concepts
   - Debug errors
   - Code review

3. **Senior FE** (pair programming, code review)
   - Review code mỗi 2-3 ngày
   - Pair programming khi stuck
   - Architecture decisions

---

## 🎓 Kết Luận

Document này là **single source of truth** về:
- ✅ Hiện trạng dự án
- ✅ Trình độ intern
- ✅ Kế hoạch học tập
- ✅ Cách nhờ AI hỗ trợ

**Update document này khi:**
- Hoàn thành features mới
- Gặp blockers mới
- Thay đổi kế hoạch
- Học được lessons mới

**Good luck! 🚀**
