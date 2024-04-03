"use client"

import { useTransition } from "react";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean
  userId: string
}

export default function Actions({ isFollowing, userId }: ActionsProps) {
  const [isPending, startTransition] = useTransition()

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch(() => toast.error("Failed to follow the user"))
    })
  }

  const handleUnfollow = () => {
    startTransition(() => {
      onUnFollow(userId)
        .then((data) => toast.success(`You are no longer following ${data.following.username}`))
        .catch(() => toast.error("Failed to unfollow the user"))
    })
  }

  const onClick = () => {
    isFollowing ? handleUnfollow() : handleFollow()
  }

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant={"primary"}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
}
