import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router'

import { useAuthState } from '#/features/auth/auth-context'
import { CourseListPage } from '#/features/course'
import { coursesQueryOptions } from '#/features/course/queries'

export const Route = createFileRoute('/_protected/courses')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(coursesQueryOptions),
  component: CoursesRoute,
})

function CoursesRoute() {
  const location = useLocation()
  const { isAdmin } = useAuthState()

  if (location.pathname !== '/courses') {
    return <Outlet />
  }

  return <CourseListPage isAdmin={isAdmin} />
}
