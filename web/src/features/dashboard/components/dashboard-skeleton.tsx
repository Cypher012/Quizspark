// src/features/dashboard/components/dashboard-skeleton.tsx
import { Skeleton } from '#/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '#/components/ui/card'

function HeroSkeleton() {
  return <Skeleton className="rounded-xl min-h-[180px] w-full" />
}

function StatsPanelSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3"
            >
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-10" />
                <Skeleton className="h-3 w-14" />
              </div>
              <Skeleton className="h-11 w-11 rounded-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function CoursesProgressSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-14" />
        </div>
        <div className="flex items-center gap-4 mt-1">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-3 w-24" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 pt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-40" />
              </div>
              <Skeleton className="h-3 w-10" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <Skeleton className="h-1.5 w-full rounded-full" />
                <Skeleton className="h-3 w-8" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-1.5 w-full rounded-full" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function RecentQuizzesSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-14" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-3 py-2.5"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-12 rounded" />
              </div>
              <Skeleton className="h-3 w-36" />
            </div>
            <Skeleton className="h-6 w-12 rounded-md" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function QuickStartSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-14" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg border px-3 py-2.5"
          >
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-40" />
            </div>
            <Skeleton className="h-7 w-14 rounded-md" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <HeroSkeleton />
        </div>
        <div className="col-span-4">
          <StatsPanelSkeleton />
        </div>
      </div>
      <CoursesProgressSkeleton />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <RecentQuizzesSkeleton />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <QuickStartSkeleton />
        </div>
      </div>
    </div>
  )
}
