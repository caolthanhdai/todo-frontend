"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobieSideBar from "@/components/MobieSideBar";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
   <div className="min-h-screen flex">
       
        <aside className="hidden sm:block shrink-0 ">
            <Sidebar  />
        </aside>
   
        <section className="flex-1 flex flex-col">
            <Header user={{userId:'1', name: "Cao Le Thanh Dai", email: "caolethanhdai@example.com", unreadNotifications: 4523626 }}/>
            <main className="p-6 ">{children}</main>
        </section>
    </div>
  );
}