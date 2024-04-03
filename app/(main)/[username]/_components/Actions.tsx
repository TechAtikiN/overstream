"use client"

import { useTransition } from "react";
import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean
  userId: string
}

export default function Actions({ isFollowing, userId }: ActionsProps) {
  const [isPending, startTransition] = useTransition()

  const onClick = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch(() => toast.error("Failed to follow the user"))
    })
  }
  return (
    <Button
      disabled={isFollowing || isPending}
      onClick={onClick}
      variant={"primary"}
    >
      Follow
    </Button>
  )
}
