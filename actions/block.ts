"use server"

import { getUser } from "@/lib/auth-service"
import { blockUser, unBlockUser } from "@/lib/block-service"
import { RoomServiceClient } from "livekit-server-sdk"
import { revalidatePath } from "next/cache"

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
)

export const onBlock = async (id: string) => {
  const user = await getUser()

  let blockedUser;

  try {
   blockedUser = await blockUser(id)
  } catch {
    // This means the user is a guest
    
  }

  try {
    await roomService.removeParticipant(user.id, id)
  } catch {
    // This means the user is not in the room
  }

  revalidatePath(`/u/${user.username}/community`)

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