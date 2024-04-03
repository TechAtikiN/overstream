"use server"

import { blockUser, unBlockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache"

export const onBlock = async (id: string) => {
  // TODO: Adapt to disconnect from live stream 
  // TODO: Allow ability to kick the guest 
  const blockedUser = await blockUser(id)

  revalidatePath("/")

  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`)
  }

  return blockedUser
}

export const onUnBlock = async (id: string) => {
  const unBlockedUser = await unBlockUser(id)

  revalidatePath("/")

  if (unBlockedUser) {
    revalidatePath(`/${unBlockedUser.blocked.username}`)
  }

  return unBlockedUser
}