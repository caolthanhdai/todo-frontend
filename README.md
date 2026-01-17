# Todoap backend

This is frontend of Todoapp where I learner core, construction , flow, resouses

## Tech stack

- NextJs (framework)
- React (library)
- Tailwind (Styling)
- Axios (API Communication)

## Way to run the Frontend

1. install library:

```bash
  npm install
```

2. Create and fill out .env as form of .env.example
3. Check Nodejs in your device , sure that Node version >= 18
4. Run the Backend part
5. Run Frontend

```
npm run dev
```

## Frontend Flow

## Resources and Knowlegde I learned

### React

1. What is a Component? (Most important)  
   Component = an independent piece of UI

Examples:

- Header
- Sidebar
- TaskCard
- LoginForm

```typescript
function Header() {
  return <div>Header</div>
}
```

> > UI = a collection of components  
> > A big app = many components put together

2. Props (data coming from outside)

Props = parameters passed into a component

```typescript
function TaskCard({ title }: { title: string }) {
  return <h3>{title}</h3>
}
```

> > Props:
> >
> > - Read-only
> > - Passed from parent component

3. State (internal status)  
   State = data that changes over time  
   const [count, setCount] = useState(0)

> > When setCount is called:
> >
> > - React re-renders the component
> > - UI updates automatically

4. What is Re-render?

React doesn’t update each HTML line manually. It:

- Detects state change
- Re-renders the component
- Compares and updates only what is necessary

> > You shouldn’t manually manipulate the DOM

5. JSX (reminder of the real concept)  
   JSX is not a language  
   It’s a way to write UI inside JS

```typescript
return <button>Click</button>
```

> > Easier to read than plain JS

🧠 React Concept Summary

> > > > React = Component + Props + State + Automatic Re-render 6. What is an Event Handler?  
> > > > Event handler = a function that handles an event

Example:

```typescript
function handleClick() {
  console.log("Clicked");
}
<button onClick={handleClick}>Click</button>
```

> > handleClick is the event handler here. 7. What is a Hook?  
> > Hook = a special React function  
> > Used to:

- Attach state-
- Attach lifecycle
- Attach logic to function components

> > Previously, only class components could do this

- useState (most important hook)

```typescript
const [loading, setLoading] = useState(false)
```

> > Meaning:
> >
> > - loading: current state
> > - setLoading: function to update state

- useEffect (side effect)
  Side effect = something that is not rendering UI  
  Examples:

* Calling an API
* Setting a timeout
* Listening to events

```typescript
useEffect(() => {
  fetchData()
}, [])
```

[ ] = runs once when the component mounts

### SERVER COMPONENT & CLIENT COMPONENT

Summary first

- Server Component runs on SERVER → pre-render + fetch data
- Client Component runs on BROWSER → interaction + state + events

#### SERVER COMPONENT (SC)

1. What is a Server Component?

- Runs on the server
- Renders HTML before sending to browser
- Default in Next.js App Router

> > If no "use client" → it’s a Server Component

2. What is it used for?

- Render static UI
- Call backend APIs
- Fetch database
- SEO optimization
- Reduce JS sent to browser

Examples:

- Page
- Layout
- Dashboard data
- List of tasks (initial render)

3. What Server Component CAN do?  
   ✅ Call API directly  
   ✅ Use async/await  
   ✅ Use secret env variables  
   ✅ Fetch server-side data  
   ✅ Fast render, good for SEO

```javascript
export default async function Page() {
  const data = await fetchData()
  return <div>{data.title}</div>
}
```

4. What Server Component CANNOT do?  
   ❌ useState  
   ❌ useEffect  
   ❌ onClick, onChange  
   ❌ User interaction  
   ❌ Run in browser

> > Because it doesn’t exist in browser 5. Advantages

- Less JS sent to client
- Fast render
- Good SEO
- Secure env

#### CLIENT COMPONENT (CC)

1. What is a Client Component?

- Runs in browser
- Supports interaction, state, events
  > > Must include: "use client"

2. What is it used for?

- Form
- Button
- Modal
- Dropdown
- Sidebar toggle
- Theme switch
- Login / logout

3. What Client Component CAN do?  
   ✅ useState  
   ✅ useEffect  
   ✅ Events (onClick, onSubmit)  
   ✅ Access window, document  
   ✅ User interaction

```javascript
"use client"

export default function Counter() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

4. What Client Component SHOULD NOT do?  
   ❌ Call DB directly  
   ❌ Expose secret env  
   ❌ Heavy fetches unnecessarily

> > Client = UI + interaction

5. Disadvantages

- JS sent to browser
- Heavier than Server Component
- SEO worse if overused

### Type of Rendering

#### RENDER FLOW IN NEXT.JS (DEEP EXPLANATION FROM THE ROOT)

Step 1. — BUILD TIME (NO USERS YET)  
 ❓ What exists at this point?

- No request
- No user
- No cookies
- No tokens

Only source code

> > If Next.js detects that a route can be pre-rendered.

Conditions:

- No cookies()
- No headers()
- No fetch({ cache: "no-store" })
- No force-dynamic
- Fetch does NOT depend on the user

✅ RESULT: SSG

Detailed flow:

```
next build
→ execute page/layout code
→ fetch data (cached)
→ render HTML
→ generate page.html
→ deploy to static server
```

Step 2 — BUILD TIME BUT WITH EXPIRATION (ISR)

ISR is just a variation of SSG.

Condition:

```javascript
export const revalidate = 60
```

Flow:

```
build → generate HTML
user 1 → gets old HTML
after 60s → server rebuilds HTML
user 2 → gets new HTML
```

📌 Still no user  
📌 Still no user-based fetch

Step 3 — REQUEST TIME (USER FINALLY EXISTS)

❗ This is where most people get confused.

SSR DOES NOT RUN AT BUILD TIME  
SSR ONLY RUNS WHEN THERE IS A REQUEST

> > When can’t Next.js render at build time?

Just ONE of these is enough:

- cookies()
- headers()
- fetch({ cache: "no-store" })
- User-based auth
- force-dynamic

➡ Next.js concludes:

“I can’t generate HTML ahead of time because I need the user.”

✅ RESULT: SSR

Detailed flow:

```
next build
→ NO page.html generated
→ only JS code is built

User requests /dashboard
→ runtime server executes code
→ reads cookies
→ identifies user
→ fetches user-based data
→ renders HTML
→ sends to browser
```

📌 No static page.html  
📌 No static server involved  
📌 HTML is generated per request

Step 4 — SERVER CAN’T RENDER ANYTHING  
When does this happen?

- Page uses "use client"
- Fetch is inside useEffect
- Uses localStorage, window

✅ RESULT: CSR

Flow:

```
User requests page
→ server returns almost empty HTML
→ browser downloads JS
→ React runs
→ fetches data
→ renders UI
```

📌 Server doesn’t know the user  
📌 Browser handles everything

❓ “What if there is a client component?”

```
Page (Server)
└── Sidebar ("use client")
```

👉 Flow:

- Page is still SSG or SSR
- Sidebar renders only in the browser  
  ❗ Having a client component does NOT turn the page into CSR

### API Comunication

1. What does “calling an API from the Frontend” mean?
   Frontend calling an API = the browser sends HTTP requests to the backend to:

- Fetch data (GET /tasks)
- Create data (POST /tasks)
- Update data (PATCH /tasks/:id)
- Delete data (DELETE /tasks/:id)
- Auth stuff: login / register / refresh / me …

A typical request includes:

- URL:` http://localhost:3001/tasks`
- Method: GET / POST / PATCH / DELETE …
- Headers:

```
Content-Type,
Authorization: Bearer <accessToken>
```

- Body (POST / PATCH): JSON
- Cookies (sent automatically if same domain or`credentials`is enabled)

2. What is Axios? (Compared to fetch)  
   Axios (library)

- Automatically parses JSON (no need for `.json()`)
- Has interceptors (biggest advantage)
- Built-in support for: timeout baseURL params request cancellation
- Better error handling`(e.g. error.response.status)`

  Fetch (built-in)

- No interceptors out of the box
- You must manually parse JSON
- Does NOT automatically throw on 4xx / 5xx
  (you must check `res.ok` yourself)

Upside: no extra dependency

> > For projects with access / refresh tokens, Axios + Interceptors is the go-to setup.

3. What is an Axios Instance?

Instead of calling`axios.get(...)`everywhere, you create a shared “API client”:

- `baseURL` (e.g.` http://localhost:3001`)
- `withCredentials: true`
  → so HttpOnly refresh-token cookies are sent
- Default headers / timeouts / configs

> > Cleaner code + change baseURL in one place.

4. What is an Interceptor? (Super important)

Interceptor = middleware that runs before a request is sent or after a response is received.

A) There are two types:

Request Interceptor  
 Runs before the request goes out:

- `Attach Authorization: Bearer <accessToken>`
- Add shared headers (Content-Type, X-Request-Id, etc.)

B) Response Interceptor  
Runs after the response comes back:

- If success → return response as-is
- If error:
- If 401 due to expired access token
  → call refresh API → get new access token → retry the original request
- If refresh fails
  → logout / redirect to login

5. Standard Auth Flow in Frontend (Access + Refresh Token)

This is the flow you’re using:

Login  
|  
v  
Backend returns:  
| - `accessToken` in JSON  
| - `refreshToken` in an HttpOnly cookie  
|  
v  
Frontend stores `accessToken`  
(usually in memory / state, avoid localStorage)  
|  
v  
For every request:  
| - Interceptor adds `Authorization: Bearer accessToken`  
|  
v  
When access token expires:  
| - Backend responds with 401  
|  
v  
Response interceptor:

- Calls /auth/refresh
  (refresh cookie is sent automatically if withCredentials: trueReceives a new access token
- Updates token in FE
- Retries the original request

> > Important:
> >
> > > Frontend cannot read the refresh token because it’s in an HttpOnly cookie (JS has no access).

6. What does “avoid multiple requests refreshing at the same time” mean?

The problem:
You’re on a dashboard and the FE fires 5 API requests in parallel.

- Access token just expired
- All 5 requests get 401
- If each one calls `/refresh` separately:
- Backend gets spammed
- Tokens get overwritten and out of sync

The standard solution:  
Use `isRefreshing` + `refreshPromise`

When refresh is already running:

- Other 401 requests wait for refreshPromise

When refresh succeeds:

- All waiting requests retry with the new token

> > That’s why you see logic like:
> > `isRefreshing`,`refreshPromise`,` _retry`
