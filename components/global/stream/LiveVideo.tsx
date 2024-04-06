"use client"

import { useRef, useState } from "react"
import { Participant, Track } from "livekit-client"
import { useTracks } from "@livekit/components-react"
import FullScreenControl from "./FullScreenControl"
import { useEventListener } from "usehooks-ts"

interface LiveVideoProps {
  participant: Participant
}

export default function LiveVideo({ participant }: LiveVideoProps) {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen()
    } else {
      wrapperRef.current?.requestFullscreen()
    }
  }

  // fix bug 
  const handleFullScreenChange = () => {
    const isCurrentlyFullScreen = document.fullscreenElement !== null
    setIsFullScreen(isCurrentlyFullScreen)
  }

  useEventListener("fullscreenchange", handleFullScreenChange, wrapperRef)

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current)
      }
    });

  return (
    <div
      ref={wrapperRef}
      className="relative h-full flex"
    >
      <video
        ref={videoRef}
        width="100%"
      />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div
          className="absolute bottom-0 flex h-14 w-full items-center justify-between
          bg-gradient-to-r from-neutral-900 px-4"
        >
          <FullScreenControl
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  )
}
