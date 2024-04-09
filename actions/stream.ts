"use server"

import { getUser } from "@/lib/auth-service"
import { db } from "@/lib/db"
import { Stream } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const updateStream = async (values: Partial<Stream>) => { // Partial<Stream> means that we can pass only a part of the Stream object
  try {
    const user = await getUser()
    const userStream = await db.stream.findUnique({
      where: {
        userId: user.id
      }
    })

    if (!userStream) {
      throw new Error("Stream not found")
    }

    const validData = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    }

    const stream = await db.stream.update({
      where: {
        id: userStream.id
      },
      data: {
        ...validData
      }
    })

    revalidatePath(`/u${user.username}/chat`)
    revalidatePath(`/u${user.username}`)
    revalidatePath(`/${user.username}`)

    return stream
  } catch (error) {
    throw new Error("Internal Server Error")
  }

}