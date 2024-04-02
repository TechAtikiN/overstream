import { cva, VariantProps } from "class-variance-authority"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { cn } from "@/lib/utils"
import LiveBadge from "./LiveBadge"
import { Skeleton } from "../ui/skeleton"

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  username: string
  imageUrl: string
  isLive?: boolean
  showBadge?: boolean
}

const avatarSizes = cva(
  "",
  {
    variants: {
      size: {
        default: "h-8 w-8",
        lg: "h-14 w-14"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
)

export default function UserAvatar({
  imageUrl,
  username,
  isLive,
  showBadge,
  size
}: UserAvatarProps) {
  const canShowBadge = showBadge && isLive

  return (
    <div className="relative">
      <Avatar className={cn(
        isLive && "ring ring-rose-500 border border-background",
        avatarSizes({ size })
      )}>
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  )
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> { }

export const UserAvatarSkeleton = ({
  size
}: UserAvatarSkeletonProps) => {
  return (
    <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />
  )
}