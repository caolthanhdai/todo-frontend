# 🚀 Quick Start Guide - Intern Onboarding

## 👋 Chào Mừng!

Bạn sẽ học Next.js và build một Todo App hoàn chỉnh trong 2 tuần. Document này là **starting point** của bạn.

---

## 📚 Documents Overview

### 1. **NEXTJS_LEARNING_GUIDE.md** (ĐỌC ĐẦU TIÊN)
- ✅ Kiến thức Next.js core concepts
- ✅ Phân tích source code hiện tại
- ✅ Kế hoạch học 2 tuần chi tiết
- ✅ Roadmap tính năng

**Khi nào đọc:** Ngay bây giờ, đọc hết 1 lần để hiểu big picture

---

### 2. **CODE_EXAMPLES.md** (REFERENCE KHI CODE)
- ✅ Component examples đầy đủ (TaskCard, AddTaskForm, TasksPage)
- ✅ State management patterns
- ✅ Exercises từng tuần
- ✅ Common patterns & debugging tips

**Khi nào đọc:** Khi bắt đầu code, copy examples và customize

---

### 3. **PROJECT_STATUS.md** (CHO AI CONSULTATION)
- ✅ Hiện trạng dự án chi tiết
- ✅ Trình độ intern
- ✅ Prompt templates để hỏi AI
- ✅ Success metrics

**Khi nào dùng:** Khi cần hỏi ChatGPT/Claude, copy context từ đây

---

### 4. **QUICK_START.md** (THIS FILE)
- ✅ Setup instructions
- ✅ First steps
- ✅ Daily workflow

---

## 🛠️ Setup Instructions

### 1. Verify Installation
```bash
# Check Node.js version (should be 18+)
node --version

# Check npm
npm --version

# Check if project runs
npm run dev
```

Mở browser: `http://localhost:3000` → Should redirect to `/dashboard`

---

### 2. Explore Current Code

#### A. Test Routing
```
✓ Visit http://localhost:3000/dashboard
✓ Visit http://localhost:3000/tasks
✓ Visit http://localhost:3000/messages
✓ Visit http://localhost:3000/settings
```

#### B. Test UI Features
```
✓ Click sidebar collapse button
✓ Resize browser (test mobile sidebar)
✓ Click theme toggle (sun/moon icons)
✓ Type in search bar
```

#### C. Read Source Code
```
1. Open app/layout.tsx
2. Open app/ClientShell.tsx
3. Open components/Sidebar.tsx
4. Open components/Header.tsx
5. Open styles/global.css
```

**Goal:** Hiểu flow từ layout → ClientShell → Sidebar/Header

---

### 3. Setup Git Workflow

```bash
# Create feature branch
git checkout -b week1-day1-routing

# Make changes...

# Commit with clear message
git add .
git commit -m "feat: add dynamic task detail route"

# Push
git push origin week1-day1-routing
```

**Commit Message Format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactor
- `docs:` - Documentation
- `style:` - Styling changes

---

## 📅 Your First Week

### Day 1-2: Understanding Next.js

#### Morning (2-3 hours)
1. **Read** `NEXTJS_LEARNING_GUIDE.md` sections:
   - Kiến Thức Next.js Core Concepts
   - Phân Tích Source Code

2. **Draw** app flow diagram:
   ```
   User → / → redirect → /dashboard
                ↓
           layout.tsx
                ↓
          ClientShell.tsx
                ↓
        Sidebar + Header + Page
   ```

3. **Trace code** với console.log:
   ```typescript
   // Add to ClientShell.tsx
   console.log("ClientShell rendered", { mobileOpen, collapsed });
   
   // Add to Sidebar.tsx
   console.log("Sidebar rendered", { collapsed });
   ```

#### Afternoon (2-3 hours)
1. **Create** dynamic route: `app/tasks/[id]/page.tsx`
   ```typescript
   export default function TaskDetailPage({ 
     params 
   }: { 
     params: { id: string } 
   }) {
     return (
       <div>
         <h1 className="text-2xl font-bold">Task Detail</h1>
         <p>Task ID: {params.id}</p>
       </div>
     );
   }
   ```

2. **Test** route:
   - Visit `/tasks/123` → Should show "Task ID: 123"
   - Visit `/tasks/abc` → Should show "Task ID: abc"

3. **Commit** your work:
   ```bash
   git add .
   git commit -m "feat: add dynamic task detail route"
   ```

#### Evening (Optional)
- Watch Next.js tutorial video
- Read React Hooks docs

---

### Day 3-4: First Component

#### Morning
1. **Read** `CODE_EXAMPLES.md` → TaskCard section

2. **Create** `components/TaskCard.tsx`:
   - Copy example từ CODE_EXAMPLES.md
   - Customize styling
   - Add comments giải thích

3. **Test** component:
   ```typescript
   // app/tasks/page.tsx
   "use client";
   import TaskCard from "@/components/TaskCard";
   
   const mockTask = {
     id: "1",
     title: "Learn Next.js",
     description: "Complete tutorial",
     status: "in-progress" as const,
     priority: "high" as const,
     createdAt: new Date().toISOString()
   };
   
   export default function TasksPage() {
     return (
       <div className="p-6">
         <h1 className="text-2xl font-bold mb-4">Tasks</h1>
         <TaskCard 
           task={mockTask}
           onStatusChange={(id, status) => console.log("Status changed", id, status)}
           onDelete={(id) => console.log("Delete", id)}
           onEdit={(id) => console.log("Edit", id)}
         />
       </div>
     );
   }
   ```

#### Afternoon
1. **Style** TaskCard với TailwindCSS
2. **Test** responsive design (resize browser)
3. **Test** dark mode (toggle theme)
4. **Commit** your work

---

### Day 5-6: Task List

#### Task
Display multiple tasks với mock data

#### Steps
1. **Create** mock data:
   ```typescript
   const mockTasks = [
     {
       id: "1",
       title: "Learn Next.js",
       description: "Complete tutorial",
       status: "in-progress" as const,
       priority: "high" as const,
       createdAt: "2024-01-01T00:00:00Z"
     },
     {
       id: "2",
       title: "Build Todo App",
       description: "Implement CRUD",
       status: "todo" as const,
       priority: "medium" as const,
       createdAt: "2024-01-02T00:00:00Z"
     },
     // Add 3-5 more tasks
   ];
   ```

2. **Display** with map:
   ```typescript
   <div className="grid gap-4">
     {mockTasks.map(task => (
       <TaskCard key={task.id} task={task} {...handlers} />
     ))}
   </div>
   ```

3. **Add** empty state:
   ```typescript
   {tasks.length === 0 ? (
     <p className="text-center text-gray-500">No tasks yet</p>
   ) : (
     // Task list
   )}
   ```

---

### Day 7: Add Task Form

#### Task
Create form to add new task

#### Steps
1. **Copy** AddTaskForm từ `CODE_EXAMPLES.md`
2. **Integrate** vào TasksPage:
   ```typescript
   const [tasks, setTasks] = useState(mockTasks);
   
   const addTask = (taskData) => {
     const newTask = {
       ...taskData,
       id: Date.now().toString(),
       createdAt: new Date().toISOString()
     };
     setTasks([newTask, ...tasks]);
   };
   ```

3. **Test** adding tasks
4. **Commit** your work

---

## 🎯 Daily Workflow

### Every Morning
1. **Review** yesterday's code
2. **Read** today's section in NEXTJS_LEARNING_GUIDE.md
3. **Plan** what to build today

### While Coding
1. **Reference** CODE_EXAMPLES.md
2. **Console.log** để debug
3. **Test** frequently (save file → check browser)
4. **Commit** after each small feature

### Every Evening
1. **Review** what you learned
2. **Write** notes về concepts mới
3. **Commit** all work
4. **Plan** tomorrow

---

## 🆘 When Stuck

### Step 1: Debug (15 minutes)
```typescript
// Add console.logs
console.log("State:", tasks);
console.log("Props:", { task, onDelete });

// Check React DevTools
// - Inspect component props/state
// - Check if component renders
```

### Step 2: Research (15 minutes)
- Google error message
- Check Next.js docs
- Read CODE_EXAMPLES.md

### Step 3: Ask AI (Use PROJECT_STATUS.md)
```
Copy context từ PROJECT_STATUS.md + your code + error
→ Paste vào ChatGPT/Claude
→ Follow prompt templates
```

### Step 4: Ask Senior
- Prepare: Code, error, what you tried
- Schedule: Pair programming session
- Learn: Take notes during explanation

---

## ✅ Week 1 Checklist

Copy checklist này vào notion/notes để track progress:

```
Week 1 Progress:

Day 1-2: Routing & Components
[ ] Đọc NEXTJS_LEARNING_GUIDE.md
[ ] Vẽ app flow diagram
[ ] Tạo dynamic route /tasks/[id]
[ ] Test routing hoạt động
[ ] Commit code

Day 3-4: TaskCard Component
[ ] Đọc CODE_EXAMPLES.md TaskCard section
[ ] Tạo TaskCard component
[ ] Style với TailwindCSS
[ ] Test responsive + dark mode
[ ] Commit code

Day 5-6: Task List
[ ] Tạo mock data (5+ tasks)
[ ] Display với .map()
[ ] Add empty state
[ ] Test rendering
[ ] Commit code

Day 7: Add Task Form
[ ] Copy AddTaskForm từ examples
[ ] Integrate vào TasksPage
[ ] Test adding tasks
[ ] Verify state updates
[ ] Commit code

Bonus:
[ ] Deploy to Vercel
[ ] Share demo link
```

---

## 🎓 Learning Tips

### 1. Learn by Doing
- ❌ Đừng chỉ đọc code
- ✅ Type code ra (không copy-paste)
- ✅ Modify examples
- ✅ Break things và fix

### 2. Understand, Don't Memorize
- ❌ Đừng học thuộc syntax
- ✅ Hiểu tại sao code hoạt động
- ✅ Giải thích code bằng lời
- ✅ Teach back concepts

### 3. Debug Mindset
- ❌ "Code không chạy, không biết sao"
- ✅ "Console.log để xem state"
- ✅ "React DevTools để inspect"
- ✅ "Error message nói gì?"

### 4. Ask Good Questions
- ❌ "Code này sao không chạy?"
- ✅ "Tôi expect X nhưng nhận được Y, tại sao?"
- ✅ "Tôi đã thử A và B, vẫn lỗi C"
- ✅ "Concept X hoạt động như thế nào?"

---

## 🚀 Ready to Start?

### Your Action Items NOW:
1. ✅ Read this file (you're here!)
2. ⏭️ Open `NEXTJS_LEARNING_GUIDE.md`
3. ⏭️ Read "Kiến Thức Next.js Core Concepts" section
4. ⏭️ Start Day 1 tasks

### Remember:
- 💪 You got this!
- 🐢 Slow and steady wins
- 🤝 Ask for help when stuck
- 🎯 Focus on understanding, not speed

---

**Let's build something awesome! 🚀**

---

## 📞 Quick Reference

### Commands
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### File Locations
```
Components:     src/components/
Pages:          src/app/
Types:          src/types/type.ts
Styles:         src/styles/global.css
```

### Important URLs
```
Dev server:     http://localhost:3000
Dashboard:      http://localhost:3000/dashboard
Tasks:          http://localhost:3000/tasks
```

### Docs
```
Next.js:        https://nextjs.org/docs
React:          https://react.dev
TailwindCSS:    https://tailwindcss.com/docs
TypeScript:     https://www.typescriptlang.org/docs
```

---

**Good luck! 🎉**
