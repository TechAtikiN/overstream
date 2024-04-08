"use client"

import { useParticipants, useRemoteParticipant } from "@livekit/components-react"
import UserAvatar, { UserAvatarSkeleton } from "../UserAvatar"
import VerifiedMark from "../VerifiedMark"
import { UserIcon } from "lucide-react"
import Actions, { ActionSkeleton } from "./Actions"
import { Skeleton } from "@/components/ui/skeleton"

interface HeaderProps {
  hostName: string
  hostIdentity: string
  viewerIdentity: string
  imageUrl: string
  isFollowing: boolean
  name: string
}

export default function Header({
  hostName,
  hostIdentity,
  viewerIdentity,
  imageUrl,
  isFollowing,
  name
}: HeaderProps) {
  const participants = useParticipants()
  const participant = useRemoteParticipant(hostIdentity)

  const isLive = !!participant
  const participantsCount = participants.length - 1

  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          isLive={isLive}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-xl font-semibold">
              {hostName}
            </h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">
            {name}
          </p>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
              <UserIcon className="h-4 w-4" />
              <p>
                {participantsCount} {participantsCount === 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-xs text-muted-foreground">
              Offline
            </p>
          )}
        </div>
      </div>
      <Actions
        isFollowing={isFollowing}
        hostIdentity={hostIdentity}
        isHost={isHost}
      />
    </div>
  )
}

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-2">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <ActionSkeleton />
    </div>
  )
}