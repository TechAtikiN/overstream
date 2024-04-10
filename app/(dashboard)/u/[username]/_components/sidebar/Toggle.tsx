"use client"

import { Hint } from "@/components/global/Hint"
import { Button } from "@/components/ui/button"
import { useCreatorSidebar } from "@/store/use-creator-sidebar"
import { ArrowLeft, ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"

export default function Toggle() {
  const { collapsed, onExpand, onCollapse } = useCreatorSidebar((state) => state)
  const label = collapsed ? "Expand" : "Collapse"

  return (
    <>
      {collapsed && (
        <div className="p-3 w-full hidden lg:flex items-center justify-centerpt-4 mb-4">
          <Hint
            label={label}
            side="right"
            asChild
          >
            <Button
              onClick={onExpand}
              variant={"ghost"}
              className="h-auto p-2"
            >
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>

          </Hint>
        </div>
      )}

      {!collapsed && (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center w-full">
          <p className="font-semibold text-primary">
            Dashboard
          </p>
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              variant={"ghost"}
              className="h-auto p-2 ml-auto"
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}
