import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'

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
import { topicDetailQueryOptions } from '../queries'
import { DeleteTopicDialog } from './delete-topic-dialog'
import { TopicContentView } from './topic-content-view'

type TopicDetailPageProps = {
  topicId: string
  isAdmin?: boolean
}

export function TopicDetailPage({
  topicId,
  isAdmin = false,
}: TopicDetailPageProps) {
  const navigate = useNavigate()
  const topicQuery = useQuery(topicDetailQueryOptions(topicId))

  async function handleDeleted() {
    await navigate({ to: '/topics' })
  }

  if (topicQuery.isPending) {
    return <TopicDetailSkeleton />
  }

  if (topicQuery.isError) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="text-base">Topic not available</CardTitle>
            <CardDescription>
              {getErrorMessage(
                topicQuery.error,
                'The requested topic could not be loaded.',
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => void topicQuery.refetch()}>
              Retry
            </Button>
            <Button asChild variant="ghost">
              <Link to="/topics">Back to topics</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const topic = topicQuery.data

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border bg-card px-5 py-5">
        <div className="space-y-3">
          <Button asChild variant="ghost" size="sm" className="-ml-3 w-fit">
            <Link to="/topics">
              <ArrowLeftIcon className="size-4" />
              Back to topics
            </Link>
          </Button>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Topic detail
            </p>
            <p className="font-mono text-sm text-muted-foreground">{topic.id}</p>
          </div>
        </div>

        {isAdmin ? (
          <DeleteTopicDialog
            topic={topic}
            buttonLabel="Delete topic"
            onDeleted={handleDeleted}
          />
        ) : null}
      </div>

      <TopicContentView title={topic.title} note={topic.note} />
    </div>
  )
}

function TopicDetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <Card className="rounded-xl py-5">
        <CardHeader className="gap-3 px-5">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-5 w-48" />
        </CardHeader>
      </Card>

      <Card className="rounded-xl py-5">
        <CardHeader className="gap-3 px-5">
          <Skeleton className="h-10 w-2/3" />
        </CardHeader>
        <CardContent className="space-y-3 px-5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-10/12" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}
