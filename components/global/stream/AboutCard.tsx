"use client"

import VerifiedMark from "../VerifiedMark"
import BioModal from "./BioModal"

interface AboutCardProps {
  hostName: string
  hostIdentity: string
  viewerIdentity: string
  bio: string | null
  followedByCount: number
}

export default function AboutCard({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
  followedByCount
}: AboutCardProps) {
  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer

  const followedByLabel = followedByCount === 1 ? "follower" : "followers"

  return (
    <div className="px-4">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostName}
            <VerifiedMark />
          </div>
          {isHost && (
            <BioModal initialValue={bio} />
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followedByCount}</span>&nbsp;{followedByLabel}
        </div>
        <p className="text-sm">
          {bio || "This user prefers to keep an air of mystery about them."}
        </p>
      </div>
    </div>
  )
}
