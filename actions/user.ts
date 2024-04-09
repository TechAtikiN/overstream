"use server"

import { getUser } from "@/lib/auth-service"
import { db } from "@/lib/db"
import { User } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const updateUser = async (values: Partial<User>) => {
    const user = await getUser()

    const validData = {
      bio: values.bio 
    }

    const updatedUser = await db.user.update({
      where: {
        id: user.id
      },
      data: { ...validData }
    })

    revalidatePath(`/${user.username}`)
    revalidatePath(`/u/${user.username}`)

    return updatedUser
}