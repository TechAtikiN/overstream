"use client"

import { useViewerToken } from "@/hooks/use-viewer-token"
import { Stream, User } from "@prisma/client"
import { LiveKitRoom } from '@livekit/components-react'
import Video from './Video'

interface StreamPlayerProps {
  user: User & { stream: Stream | null }
  stream: Stream
  isFollowing: boolean
}

export default function StreamPlayer({ user, stream, isFollowing }: StreamPlayerProps) {
  const {
    token,
    name,
    identity
  } = useViewerToken(user.id)

  if (!token || !name || !identity) {
    return (
      <div>
        Cannot watch the stream
      </div>
    )
  }

  return (
    <>
      <LiveKitRoom
        token={token}
        className="grid grid-cols-2 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full"
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
      >
        <div className="space-y-4 col-span-2 lg-col-span-2 xl:col-span 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video
            hostName={user.username}
            hostIdentity={user.id}
          />
        </div>
      </LiveKitRoom>
    </>
  )
}
