import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

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
import { CourseHeader } from './course-header'
import { RelatedTopicsSection } from './related-topics-section'
import {
  courseDetailQueryOptions,
  topicsWithCourseQueryOptions,
} from '../queries'
import { CreateTopicDialog } from '#/features/topic/components/create-topic-dialog'

type CourseDetailPageProps = {
  courseId: string
  isAdmin?: boolean
}

export function CourseDetailPage({
  courseId,
  isAdmin = false,
}: CourseDetailPageProps) {
  const navigate = useNavigate()
  const courseQuery = useQuery(courseDetailQueryOptions(courseId))
  const topicsQuery = useQuery(topicsWithCourseQueryOptions)

  async function handleDeleted(_courseId: string) {
    await navigate({ to: '/courses' })
  }

  if (courseQuery.isPending) {
    return <CourseDetailSkeleton />
  }

  if (courseQuery.isError) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="text-base">Course not available</CardTitle>
            <CardDescription>
              {getErrorMessage(
                courseQuery.error,
                'The requested course could not be loaded.',
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => void courseQuery.refetch()}>
              Retry
            </Button>
            <Button
              variant="ghost"
              onClick={() => void navigate({ to: '/courses' })}
            >
              Back to courses
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const course = courseQuery.data

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <CourseHeader course={course} isAdmin={isAdmin} onDeleted={handleDeleted} />

      <div
        className={
          isAdmin
            ? 'space-y-6'
            : 'space-y-6'
        }
      >
        {isAdmin ? (
          <div className="flex justify-end">
            <CreateTopicDialog
              coursePreset={{
                id: course.id,
                courseCode: course.courseCode,
                courseTitle: course.courseTitle,
              }}
            />
          </div>
        ) : null}

        <RelatedTopicsSection
          course={course}
          topics={topicsQuery.data ?? []}
          status={
            topicsQuery.isPending
              ? 'loading'
              : topicsQuery.isError
                ? 'error'
                : 'ready'
          }
          errorMessage={
            topicsQuery.isError
              ? getErrorMessage(topicsQuery.error, 'Unable to load topics right now.')
              : null
          }
          onRetry={topicsQuery.refetch}
        />
      </div>
    </div>
  )
}

function CourseDetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <Card className="rounded-xl py-5">
        <CardHeader className="gap-3 px-5">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-2/3" />
        </CardHeader>
        <CardContent className="space-y-2 px-5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>

      <Card className="rounded-xl py-5">
        <CardHeader className="px-5">
          <Skeleton className="h-7 w-40" />
        </CardHeader>
        <CardContent className="space-y-3 px-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-lg border p-4">
              <Skeleton className="h-5 w-1/3" />
              <div className="mt-3 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-10/12" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
