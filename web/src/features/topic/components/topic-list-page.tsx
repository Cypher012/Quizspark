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
import { topicsWithCourseQueryOptions } from '../queries'
import { CreateTopicDialog } from './create-topic-dialog'
import { TopicList } from './topic-list'

type TopicListPageProps = {
  isAdmin?: boolean
}

export function TopicListPage({ isAdmin = false }: TopicListPageProps) {
  const topicsQuery = useQuery(topicsWithCourseQueryOptions)

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <section className="flex flex-col gap-4 rounded-xl border bg-card px-5 py-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Topic management
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">Topics</h2>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Browse topic notes with course labels, open markdown detail views,
            and keep admin creation tied to a real course selection plus
            client-side markdown file reading.
          </p>
        </div>

        {isAdmin ? <CreateTopicDialog /> : null}
      </section>

      {topicsQuery.isPending ? <TopicListSkeleton /> : null}

      {topicsQuery.isError ? (
        <Card className="rounded-lg border-destructive/30">
          <CardHeader>
            <CardTitle className="text-base">Unable to load topics</CardTitle>
            <CardDescription>
              {getErrorMessage(topicsQuery.error, 'Unable to load topics right now.')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => void topicsQuery.refetch()} variant="outline">
              Try again
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {topicsQuery.isSuccess && topicsQuery.data.length === 0 ? (
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-base">No topics yet</CardTitle>
            <CardDescription>
              The topic listing is empty. Once topics exist, they will appear
              here with course context and a short markdown preview.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      {topicsQuery.isSuccess && topicsQuery.data.length > 0 ? (
        <TopicList topics={topicsQuery.data} isAdmin={isAdmin} />
      ) : null}
    </div>
  )
}

function TopicListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="gap-4 rounded-lg py-5">
          <CardHeader className="gap-3 px-5">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-40" />
            </div>
            <Skeleton className="h-7 w-2/3" />
          </CardHeader>
          <CardContent className="space-y-2 px-5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-10/12" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
