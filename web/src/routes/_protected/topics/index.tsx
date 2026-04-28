import { createFileRoute } from '@tanstack/react-router'

import { useAuthState } from '#/features/auth/auth-context'
import { TopicListPage } from '#/features/topic'
import { topicsWithCourseQueryOptions } from '#/features/topic/queries'

export const Route = createFileRoute('/_protected/topics/')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(topicsWithCourseQueryOptions),
  component: TopicsIndexRoute,
})

function TopicsIndexRoute() {
  const { isAdmin } = useAuthState()

  return <TopicListPage isAdmin={isAdmin} />
}
