"use client"

import { useSidebar } from "@/store/use-sidebar"
import { useIsClient } from "usehooks-ts"
import { ToggleSkeleton } from "./Toggle"
import { RecommendedSkeleton } from "./Recommended"
import { FollowingSkeleton } from "./Following"

interface WrapperProps {
  children: React.ReactNode
}

export default function Wrapper({ children }: WrapperProps) {
  const { collapsed } = useSidebar((state) => state)
  const isClient = useIsClient()

  if (!isClient) {
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    )
  }

  return (
    <aside
      className={`fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50 ${collapsed ? "w-[70px]" : "w-60"}`}
    >
      {children}
    </aside>
  )
}
