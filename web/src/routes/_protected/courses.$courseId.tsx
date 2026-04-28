import { createFileRoute } from '@tanstack/react-router'

import { useAuthState } from '#/features/auth/auth-context'
import { CourseDetailPage } from '#/features/course'
import { courseDetailQueryOptions } from '#/features/course/queries'

export const Route = createFileRoute('/_protected/courses/$courseId')({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(
      courseDetailQueryOptions(params.courseId),
    ),
  component: CourseDetailRoute,
})

function CourseDetailRoute() {
  const { courseId } = Route.useParams()
  const { isAdmin } = useAuthState()

  return <CourseDetailPage courseId={courseId} isAdmin={isAdmin} />
}
