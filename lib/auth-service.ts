import { currentUser } from "@clerk/nextjs"
import { db } from "@/lib/db"

export const getUser = async() => {
  const loggedInUser = await currentUser()

  if (!loggedInUser || !loggedInUser.username) {
    throw new Error("Unauthorized")
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: loggedInUser.id // Clerk user ID
    }
  })

  if (!user) {
    throw new Error("User not found")
  }

  return user
}