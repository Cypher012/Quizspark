import { Link } from '@tanstack/react-router'

import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import type { TopicWithCourse } from '../types'
import { DeleteTopicDialog } from './delete-topic-dialog'

type TopicRowCardProps = {
  topic: TopicWithCourse
  isAdmin?: boolean
}

export function TopicRowCard({
  topic,
  isAdmin = false,
}: TopicRowCardProps) {
  return (
    <Card className="gap-4 rounded-lg border-border/80 py-5">
      <CardHeader className="gap-3 px-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {topic.courseCode ? (
                <span className="inline-flex items-center rounded-md border bg-muted px-2.5 py-1 font-medium tracking-[0.18em] uppercase">
                  {topic.courseCode}
                </span>
              ) : null}
              {topic.courseTitle ? (
                <span className="rounded-md border px-2.5 py-1">
                  {topic.courseTitle}
                </span>
              ) : (
                <span className="rounded-md border border-dashed px-2.5 py-1">
                  Course context unavailable
                </span>
              )}
            </div>
            <CardTitle className="text-lg leading-tight">
              {topic.title}
            </CardTitle>
          </div>

          {isAdmin ? <DeleteTopicDialog topic={topic} /> : null}
        </div>
      </CardHeader>

      <CardContent className="px-5">
        <p className="text-sm leading-6 text-foreground/85">
          {getTopicPreview(topic.note)}
        </p>
      </CardContent>

      <CardFooter className="justify-between border-t px-5 pt-4">
        <p className="text-sm text-muted-foreground">
          Topic id: <span className="font-mono text-foreground">{topic.id}</span>
        </p>
        <Button asChild variant="outline" size="sm">
          <Link to="/topics/$topicId" params={{ topicId: topic.id }}>
            View topic
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function getTopicPreview(note: string | null) {
  if (!note) {
    return 'No markdown note has been attached to this topic yet.'
  }

  const compact = note.replace(/\s+/g, ' ').trim()

  if (compact.length <= 180) {
    return compact
  }

  return `${compact.slice(0, 177)}...`
}
