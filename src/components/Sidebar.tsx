"use client";

import Link from "next/link";
import {
  Home,
  Message,
  TaskSquare,
  Setting2,
  ArrowLeft2,
  ArrowRight2,
} from "iconsax-react";
import { useState } from "react";
import Image from "next/image";
import logo from "../public/images/logo.png";
import ThemeToggleButton from "./ThemeToggleButton";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: <Home size={20} color="currentColor" /> },
  { label: "Messages", href: "/messages", icon: <Message size={20} color="currentColor" /> },
  { label: "Tasks", href: "/tasks", icon: <TaskSquare size={20} color="currentColor" /> },
  { label: "Settings", href: "/settings", icon: <Setting2 size={20} color="currentColor" /> },
];

export default function Sidebar({
  collapsed, dark,
  setCollapsed, setDark
}: {
  collapsed: boolean; dark: boolean;
  setCollapsed: (collapsed: boolean) => void;
  setDark: (dark: boolean) => void;
}) {
  const [hover, setHover] = useState(false);
  
  console.log("Sidebar rendered", { dark });
  return (
    <aside
      className={`hidden sm:flex h-screen sticky top-0 
                  border-r border-[rgb(var(--c-border-rgb)/1)] 
                  bg-[var(--c-surface)] text-[var(--c-text)]
                  flex-col transition-all duration-300 
                  ${collapsed ? "w-[72px]" : "w-[224px]"}`}
    >
      {/* LOGO + TOGGLE */}
      <div className="flex items-center justify-between h-16 px-4 ">
        <div className="flex items-center gap-2">
          {!collapsed && (
            <>
              <Image src={logo} alt="Logo" width={28} height={28} />
              <span className="font-semibold">ProjectM</span>
            </>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          onMouseEnter={() => collapsed && setHover(true)}
          onMouseLeave={() => collapsed && setHover(false)}
          className="p-2 rounded-lg text-[var(--c-text)] hover:bg-[rgb(var(--c-text-rgb)/0.06)]"
        >
          {collapsed ? (
            hover ? (
              <ArrowRight2 size={20} color="currentColor" />
            ) : (
              <Image src={logo} alt="Expand" width={20} height={20} />
            )
          ) : (
            <ArrowLeft2 size={20} color="currentColor" />
          )}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setCollapsed(collapsed ? true : true)} // giữ nguyên như bạn muốn
                className={`flex items-center rounded-lg 
                            text-[var(--c-text)]
                            hover:bg-[rgb(var(--c-text-rgb)/0.06)] 
                            ${collapsed ? "justify-center p-3" : "gap-3 px-4 py-2"}`}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className=" py-3 border-t border-[rgb(var(--c-border-rgb)/1)]">
        <ThemeToggleButton dark={dark} setDark={setDark} />
      </div>
    </aside>
  );
}
