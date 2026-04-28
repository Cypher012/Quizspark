import { createFileRoute } from '@tanstack/react-router'

import { useAuthState } from '#/features/auth/auth-context'
import { TopicDetailPage } from '#/features/topic'
import { topicDetailQueryOptions } from '#/features/topic/queries'

export const Route = createFileRoute('/_protected/topics/$topicId')({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(
      topicDetailQueryOptions(params.topicId),
    ),
  component: TopicDetailRoute,
})

function TopicDetailRoute() {
  const { topicId } = Route.useParams()
  const { isAdmin } = useAuthState()

  return <TopicDetailPage topicId={topicId} isAdmin={isAdmin} />
}
