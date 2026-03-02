// app/(main)/messages/page.tsx
import MessagesClient from "./MessagesClient"

export default function MessagesPage() {
  return (
    <div className=" h-[calc(100vh-64px)] overflow-hidden">
      <MessagesClient />
    </div>
  )
}
