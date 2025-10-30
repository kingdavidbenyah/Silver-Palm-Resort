import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse  bg-[var(--skeleton-bg)]",
        className
      )}
      {...props}
    />
  );
}

// Room Card Skeleton
export function RoomCardSkeleton() {
  return (
    <div className="w-[350px] rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
      {/* Image skeleton */}
      <Skeleton className="h-[250px] w-full rounded-none" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Room type title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Price and button row */}
        <div className="flex items-center justify-between pt-2">
          {/* Price skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>

          {/* Button skeleton */}
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Blog Card Skeleton
export function BlogCardSkeleton() {
  return (
    <div className="w-[350px] rounded-lg overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="h-[200px] w-full rounded-t-lg" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Tags */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Title */}
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />

        {/* Description */}
        <div className="space-y-2 pt-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Date */}
        <Skeleton className="h-4 w-24 mt-3" />
      </div>
    </div>
  );
}
