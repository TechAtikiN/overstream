import { getUser } from "@/lib/auth-service"
import { db } from "@/lib/db"

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getUser()
    
    const otherUser = await db.user.findUnique({
      where: {
        id
      }
    })

    if (!otherUser) {
      throw new Error("User not found")
    }

    // Check if the current user is the same as the other user, in which case they are following themselves
    if (otherUser.id === self.id) {
      return true 
    }

    // Check if the current user is following the other user
    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id
      }
    })

    return !!existingFollow // !! converts a value to a boolean
  } catch (error) {
    return false
  }
}

export const followUser = async (id: string) => {
  const self = await getUser()

  const otherUser = await db.user.findUnique({
    where: {
      id
    }
  })

  if (!otherUser) {
    throw new Error("User not found")
  }

  if (otherUser.id === self.id) {
    throw new Error("You can't follow yourself")
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id
    }
  })

  if (existingFollow) {
    throw new Error("You are already following this user")
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id
    },
    include: {
      follower: true,
      following: true
    }
  })
  
  return follow
}