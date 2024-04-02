"use client"

import { useSidebar } from "@/store/use-sidebar"

interface WrapperProps {
  children: React.ReactNode
}

export default function Wrapper({ children }: WrapperProps) {
  const { collapsed } = useSidebar((state) => state)

  return (
    <aside className={`fixed left-0 flex flex-col ${collapsed ? "w-[70px]" : "w-60"} h-full bg-background border-r border-[#2D2E35] z-50`}>
      {children}
    </aside>
  )
}
