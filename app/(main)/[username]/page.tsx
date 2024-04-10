import { isBlockedByUser } from "@/lib/block-service"
import { isFollowingUser } from "@/lib/follow-service"
import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation"
import StreamPlayer from "@/components/global/stream/StreamPlayer"

interface UserPageProps {
  params: {
    username: string
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserByUsername(params.username)

  if (!user || !user.stream) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.id)
  const isBlocked = await isBlockedByUser(user.id)

  if (isBlocked) {
    notFound()
  }

  return (
    <div className="h-full w-full">
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing={isFollowing}
      />
    </div>
  )
}
