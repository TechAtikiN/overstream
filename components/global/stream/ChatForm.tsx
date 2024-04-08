"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { FormEvent, useState } from "react"
import ChatInfo from "./ChatInfo"

interface ChatFormProps {
  onSubmit: () => void
  onChange: (value: string) => void
  value: string
  isHidden: boolean
  isFollowersOnly: boolean
  isFollowing: boolean
  isDelayed: boolean
}

export default function ChatForm({
  onSubmit,
  onChange,
  value,
  isHidden,
  isFollowersOnly,
  isFollowing,
  isDelayed
}: ChatFormProps) {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false)

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing
  const isDisabled = isHidden || isFollowersOnlyAndNotFollowing || isDelayBlocked

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!value || isDisabled) return

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true)
      setTimeout(() => {
        setIsDelayBlocked(false)
        onSubmit()
      }, 3000)
    } else {
      onSubmit()
    }
  }

  if (isHidden) return null

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="w-full">
        <ChatInfo
          isDelayed={isDelayed}
          isFollowersOnly={isFollowersOnly}
        />
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn(
            "border-white/10",
            isFollowersOnly && "rounded-t-none border-t-0"
          )}
        />
      </div>
      <div className="ml-auto">
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={isDisabled}
        >
          Chat
        </Button>
      </div>
    </form>
  )
}

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="w-7 h-7" />
        <Skeleton className="w-12 h-7" />
      </div>
    </div>
  )
}