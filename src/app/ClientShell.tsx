"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobieSideBar from "@/components/MobieSideBar";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);
  console.log("ClientShell rendered", { mobileOpen, collapsed, dark });
  return (
   <div className="min-h-screen flex">
       
        <aside className="hidden sm:block shrink-0 ">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} dark={dark} setDark={setDark} />
        </aside>
   
        <section className="flex-1 flex flex-col">
            <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} dark={dark} setDark={setDark} user={{ name: "Cao Le Thanh Dai", email: "caolethanhdai@example.com", unreadNotifications: 4523626 }} />
            <main className="p-6 ">{children}</main>
        </section>
    </div>
  );
}