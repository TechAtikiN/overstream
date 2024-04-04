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

export const getUserByUsername = async (username: string) => {
  const user = await currentUser()

  if(!user || !user.username) {
    throw new Error("Unauthorized")
  }

  const userDetails = await db.user.findUnique({
    where: {
      username
    }
  })

  if (!userDetails) {
    throw new Error("User not found")
  }

  if (user.username !== userDetails.username) {
    throw new Error("Unauthorized")
  }

  return userDetails
}