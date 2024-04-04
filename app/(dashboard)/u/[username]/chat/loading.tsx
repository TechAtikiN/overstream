import { Skeleton } from '@/components/ui/skeleton'
import { ToggleCardSkeleton } from './_components/ToggleCard'

export default function ChatLoading() {
  return (
    <div className="p-3 space-y-4">
      <Skeleton className="h-10 w-[200px]" />
      <div className='space-y-4'>
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
      </div>
    </div>
  )
}
