import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { Skeleton } from '#/components/ui/skeleton'
import { getRelatedTopics } from '../queries'
import type { Course, TopicWithCourse } from '../types'

type RelatedTopicsSectionProps = {
  course: Course
  topics: TopicWithCourse[]
  status: 'loading' | 'ready' | 'error'
  errorMessage: string | null
  onRetry: () => Promise<unknown> | void
}

export function RelatedTopicsSection({
  course,
  topics,
  status,
  errorMessage,
  onRetry,
}: RelatedTopicsSectionProps) {
  const relatedTopics = getRelatedTopics(course, topics)

  return (
    <Card className="rounded-xl border-border/80 py-5">
      <CardHeader className="gap-2 px-5">
        <CardTitle className="text-xl tracking-tight">
          Related topics
        </CardTitle>
        <CardDescription className="max-w-2xl leading-6">
          Topics are derived from <span className="font-mono">GET /api/topic/course</span> by matching the selected course’s code first, then falling back to title only when needed.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5">
        {status === 'loading' ? <RelatedTopicsSkeleton /> : null}

        {status === 'error' ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <p className="text-sm font-medium">Unable to load related topics</p>
            <p className="mt-1 text-sm text-muted-foreground">{errorMessage}</p>
            <Button
              className="mt-4"
              variant="outline"
              size="sm"
              onClick={() => void onRetry()}
            >
              Retry
            </Button>
          </div>
        ) : null}

        {status === 'ready' && relatedTopics.length === 0 ? (
          <div className="rounded-lg border border-dashed bg-muted/40 p-6">
            <p className="text-sm font-medium">No related topics yet</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              No topics in the current topic listing match this course by code
              or title.
            </p>
          </div>
        ) : null}

        {status === 'ready' && relatedTopics.length > 0 ? (
          <div className="space-y-3">
            {relatedTopics.map((topic) => (
              <article
                key={topic.id}
                className="rounded-lg border bg-background p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold leading-6">
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {getTopicPreview(topic.note)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

function getTopicPreview(note: string | null) {
  if (!note) {
    return 'No note preview available for this topic.'
  }

  const compact = note.replace(/\s+/g, ' ').trim()

  if (compact.length <= 180) {
    return compact
  }

  return `${compact.slice(0, 177)}...`
}

function RelatedTopicsSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="rounded-lg border p-4">
          <Skeleton className="h-5 w-1/3" />
          <div className="mt-3 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
          </div>
        </div>
      ))}
    </div>
  )
}
