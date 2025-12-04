import ClientShell from "@/app/(main)/ClientShell"
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <ClientShell>{children}</ClientShell>
}
