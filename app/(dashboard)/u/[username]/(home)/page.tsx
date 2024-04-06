import { getUserByUsername } from "@/lib/user-service"
import { currentUser } from "@clerk/nextjs"
import StreamPlayer from "@/components/global/stream/StreamPlayer"

interface CreatorPageProps {
  params: {
    username: string
  }
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const externalUser = await currentUser()
  const user = await getUserByUsername(params.username)

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized")
  }

  return (
    <div className="h-full">
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing
      />
    </div>
  )
}
