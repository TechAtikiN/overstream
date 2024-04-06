"use client"

import { useEffect, useRef, useState } from "react"
import { Participant, Track } from "livekit-client"
import { useTracks } from "@livekit/components-react"
import { useEventListener } from "usehooks-ts"
import FullScreenControl from "./FullScreenControl"
import VolumeControl from "./VolumeControl"

interface LiveVideoProps {
  participant: Participant
}

export default function LiveVideo({ participant }: LiveVideoProps) {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [volume, setVolume] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const onVolumeChange = (value: number) => {
    setVolume(+value)
    if (videoRef?.current) {
      videoRef.current.muted = value === 0
      videoRef.current.volume = +value * 0.01
    }
  }

  const toggleMute = () => {
    const isMuted = volume === 0
    setVolume(isMuted ? 50 : 0)

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted
      videoRef.current.volume = isMuted ? 0.5 : 0
    }
  }

  useEffect(() => {
    onVolumeChange(0)
  }, [])

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
          <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
          <FullScreenControl
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  )
}
