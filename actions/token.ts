"use server"

import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";

import { getUser } from "@/lib/auth-service";
import { getUserById } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";

export const createViewerToken = async (hostIdentity: string) => {
  let user;

  try {
    user = await getUser()
  } catch {
    const id = v4()
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    user = { id, username }
  }

  const host = await getUserById(hostIdentity)

  if (!host) {
    throw new Error("User not found")
  }

  const isBlocked = await isBlockedByUser(host.id)

  if(isBlocked) {
    throw new Error("User is blocked")
  }

  const isHost = user.id === host.id

  let identity;

  if (isHost) {
    identity = `host-${user.id}`
  } else {
    identity = user.id
  }

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      name: user.username,
      identity: identity,
    }
  )

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  })

  return await Promise.resolve(token.toJwt())
}