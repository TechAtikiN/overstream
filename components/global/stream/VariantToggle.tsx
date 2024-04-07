"use client"

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar"
import { MessageSquare, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Hint from "../Hint"

export default function VariantToggle() {
  const { variant, onChangeVariant } = useChatSidebar((state) => state)

  const isChat = variant === ChatVariant.CHAT

  let Icon = isChat ? Users : MessageSquare

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
    onChangeVariant(newVariant)
  }

  const label = isChat ? "Community" : "Go back to Chat"

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant={"ghost"}
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  )
}
