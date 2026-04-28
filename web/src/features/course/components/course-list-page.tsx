import { useQuery } from '@tanstack/react-query'

import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Skeleton } from '#/components/ui/skeleton'
import { getErrorMessage } from '#/lib/api/client'
import { CourseList } from './course-list'
import { CreateCourseDialog } from './create-course-dialog'
import { coursesQueryOptions } from '../queries'

type CourseListPageProps = {
  isAdmin?: boolean
}

export function CourseListPage({ isAdmin = false }: CourseListPageProps) {
  const coursesQuery = useQuery(coursesQueryOptions)

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <section className="flex flex-col gap-4 rounded-xl border bg-card px-5 py-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Course management
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">Courses</h2>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Browse the backend course catalog, open individual course detail
            views, and keep admin actions constrained to the exact create and
            delete flows available on the server.
          </p>
        </div>

        {isAdmin ? <CreateCourseDialog /> : null}
      </section>

      {coursesQuery.isPending ? <CourseListSkeleton /> : null}

      {coursesQuery.isError ? (
        <Card className="rounded-lg border-destructive/30">
          <CardHeader>
            <CardTitle className="text-base">Unable to load courses</CardTitle>
            <CardDescription>
              {getErrorMessage(coursesQuery.error, 'Unable to load courses right now.')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => void coursesQuery.refetch()}
              variant="outline"
            >
              Try again
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {coursesQuery.isSuccess && coursesQuery.data.length === 0 ? (
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-base">No courses yet</CardTitle>
            <CardDescription>
              The course list is currently empty. Once courses exist, each one
              will appear here with its code, description, and a direct path to
              its detail page.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      {coursesQuery.isSuccess && coursesQuery.data.length > 0 ? (
        <CourseList courses={coursesQuery.data} isAdmin={isAdmin} />
      ) : null}
    </div>
  )
}

function CourseListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="gap-4 rounded-lg py-5">
          <CardHeader className="gap-3 px-5">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-7 w-2/3" />
          </CardHeader>
          <CardContent className="space-y-2 px-5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-8/12" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
