import { getUser } from "./auth-service"
import { db } from "./db"

export const getSearch = async (term?: string) => {
  let userId

  try {
    const user = await getUser()
    userId = user.id
  } catch {
    userId = null
  }

  let streams = []

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId
              }
            }
          }
        },
        OR: [
          {
            name: {
              contains: term
            }
          },
          {
            user: {
              username: {
                contains: term
              }
            }
          }
        ]
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true
      },
      orderBy: [
        {
          isLive: "desc"
        },
        {
          updatedAt: "desc"
        }
      ]
    })
  } else {
    streams = await db.stream.findMany({
      where: {
        OR: [
          {
            name: {
              contains: term
            }
          },
          {
            user: {
              username: {
                contains: term
              }
            }
          }
        ]
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true
      },
      orderBy: [
        {
          isLive: "desc"
        },
        {
          updatedAt: "desc"
        }
      ]
    })
  }
  return streams
}