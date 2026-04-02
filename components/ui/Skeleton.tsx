import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'shimmer rounded-lg bg-slate-800',
        className
      )}
    />
  )
}

export function TaskCardSkeleton() {
  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <Skeleton className="h-5 w-3/4 rounded-md" />
        <Skeleton className="h-6 w-6 rounded-lg shrink-0" />
      </div>
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-2/3 rounded-md" />
      <div className="flex items-center justify-between mt-1">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-xl" />
      </div>
      <Skeleton className="h-8 w-16 rounded-md" />
      <Skeleton className="h-3 w-20 rounded-md" />
    </div>
  )
}
