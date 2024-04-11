"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useSidebar } from "@/store/use-sidebar"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"
import HintLabel from "@/components/global/HintLabel"

export default function Toggle() {
  const { collapsed, onExpand, onCollapse } = useSidebar()

  const label = collapsed ? "Expand" : "Collapse"

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <HintLabel label={label} side="right" asChild>
            <Button
              onClick={onExpand}
              className="h-auto p-2"
              variant={"ghost"}
            >
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </HintLabel>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary">
            For you
          </p>
          <HintLabel label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              className="h-auto p-2 ml-auto"
              variant={"ghost"}
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </HintLabel>
        </div>
      )}
    </>
  )
}

export const ToggleSkeleton = () => {
  return (
    <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="h- w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  )
}
