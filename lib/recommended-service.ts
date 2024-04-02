import { db } from "./db"

export const getRecommended = async () => {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  return users
}