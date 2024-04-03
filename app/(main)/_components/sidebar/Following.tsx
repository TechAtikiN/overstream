"use client"

import { useSidebar } from "@/store/use-sidebar"
import { Follow, User } from "@prisma/client"
import UserItem, { UserItemSkeleton } from "./UserItem"

interface FollowingProps {
  data: (Follow & { following: User })[]
}

export default function Following({ data }: FollowingProps) {
  const { collapsed } = useSidebar((state) => state)

  if (!data.length) {
    return null
  }

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">
            Following
          </p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data?.map((user) => (
          <UserItem
            key={user.following.id}
            username={user.following.username}
            imageUrl={user.following.imageUrl}
          />
        ))}
      </ul>
    </div>
  )
}

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, index) => (
        <UserItemSkeleton key={index} />
      ))}
    </ul>
  )
}