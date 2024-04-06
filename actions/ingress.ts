"use server"

import { getUser } from '@/lib/auth-service'
import { db } from '@/lib/db'
import {
  CreateIngressOptions,
  IngressAudioEncodingPreset,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  TrackSource
} from 'livekit-server-sdk' 
import { revalidatePath } from 'next/cache'

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
)

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!)

export const resetIngress = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  })

  const rooms = await roomService.listRooms([hostIdentity])

  for (const room of rooms) {
    await roomService.deleteRoom(room.name)
  }

  for (const ingress of ingresses) {
    await ingressClient.deleteIngress(ingress.ingressId)
  }
}

export const createIngress = async (ingressType: IngressInput) => {
  const user = await getUser();
  
  await resetIngress(user.id)

  const options: CreateIngressOptions = {
    name: user.username,
    roomName: user.id,
    participantName: user.username,
    participantIdentity: user.id,
  }

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true
  } else {
    // @ts-ignore
    options.video = {
      name: 'camera',
      source: TrackSource.CAMERA,
      encodingOptions: {
        value: IngressVideoEncodingPreset.H264_1080P_30FPS_1_LAYER,
        case: "preset"
      },
    };
    // @ts-ignore
    options.audio = {
      name: 'microphone',
      source: TrackSource.MICROPHONE,
      encodingOptions: {
        value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
        case: "preset"
      }
    }
  }

  const ingress = await ingressClient.createIngress(ingressType, options)

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error('Failed to create ingress')
  }

  await db.stream.update({
    where: { userId: user.id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    }
  })

  revalidatePath(`/u/${user.username}/keys`)

  return ingress
}