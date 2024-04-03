import { getUser } from "./auth-service"
import { db } from "./db"

export const isBlockedByUser = async (id: string) => {
  try {
    const user = await getUser()
    
    const otherUser = await db.user.findUnique({
      where: { id }
    })

    if (!otherUser) {
      throw new Error("User not found")
    }

    if (otherUser.id === user.id) {
      return false
    }
    
    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: user.id
        }
      }
    })

    return !!existingBlock
  } catch (error) {
    return false
  }
}

export const blockUser = async (id: string) => {
  const user = await getUser()

  if (user.id === id) {
    throw new Error("You cannot block yourself")
  }

  const otherUser = await db.user.findUnique({
    where: { id }
  })

  if (!otherUser) {
    throw new Error("User not found")
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: user.id,
        blockedId: otherUser.id
      }
    }
  })

  if (existingBlock) {
    throw new Error("User already blocked")
  }

  const block = await db.block.create({
    data: {
      blockerId: user.id,
      blockedId: otherUser.id
    },
    include: {
      blocked: true
    }
  })
  return block
}

export const unBlockUser = async (id: string) => {
  const user = await getUser()

  if (user.id === id) {
    throw new Error("You cannot unblock yourself")
  }

  const otherUser = await db.user.findUnique({
    where: { id }
  })

  if (!otherUser) {
    throw new Error("User not found")
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: user.id,
        blockedId: otherUser.id
      }
    }
  })

  if (!existingBlock) {
    throw new Error("User not blocked")
  }

  const unblock = await db.block.delete({
    where: {
      id: existingBlock.id
    },
    include: {
      blocked: true
    }
  })

  return unblock
}