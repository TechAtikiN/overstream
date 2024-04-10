import { getUser } from "./auth-service";
import { db } from "./db";

export const getStreams = async () => {
  let userId;

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
        }
      },
      select: {
        id: true,
        thumbnailUrl: true,
        user: true,
        isLive: true,
        name: true
      },
      orderBy: [
        {
          isLive: 'desc',
        },
        {
          updatedAt: 'desc'
        }
    ]
    })
  } else {
    streams = await db.stream.findMany({
      select: {
        id: true,
        thumbnailUrl: true,
        user: true,
        isLive: true,
        name: true
      },
      orderBy: [
          {
            isLive: 'desc',
          },
          {
            updatedAt: 'desc'
          }
      ]
    })
  }

  return streams
}