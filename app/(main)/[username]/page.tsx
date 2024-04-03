import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation"
import { isFollowingUser } from "@/lib/follow-service"
import Actions from "./_components/Actions"

interface UserPageProps {
  params: {
    username: string
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserByUsername(params.username)
  if (!user) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.id)

  return (
    <div>
      <p>{user?.username}</p>
      <Actions userId={user?.id} isFollowing={isFollowing} />
    </div>
  )
}
