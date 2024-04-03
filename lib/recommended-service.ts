import { getUser } from "./auth-service";
import { db } from "./db"

export const getRecommended = async () => {
  let userId;

  // Get the current user
  try {
    const self = await getUser()
    userId = self.id
  } catch (error) {
      userId = null 
  }

  let users = []

  // Get all users except the current user
  if (userId) {
    users = await db.user.findMany({
      where: {
        NOT: {
          id: userId
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
  }

  return users
}