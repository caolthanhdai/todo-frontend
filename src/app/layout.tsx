import ClientShell from "./ClientShell";
import "../styles/global.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Project M",
  description: "Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 
  return (
    <html lang="en" >
      <body>
        {/* Shell: sidebar | content */}
        <ClientShell>{children}</ClientShell>


      </body>
    </html>
  );
}

