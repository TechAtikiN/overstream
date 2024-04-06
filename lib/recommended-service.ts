import { getUser } from "@/lib/auth-service";
import { db } from "@/lib/db"

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
        AND: [
          {
            NOT: {
            id: userId
            }
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId // Exclude users that the current user is already following
                }
              }
            }
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId // Exclude users that the current user has blocked
                }
              }
            }
          }
        ]
      },
      include: {
        stream: {
          select: {
            isLive: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  } else {
    users = await db.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  }

  return users
}