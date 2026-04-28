import { Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'

import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import type { Course } from '../types'
import { DeleteCourseDialog } from './delete-course-dialog'

type CourseHeaderProps = {
  course: Course
  isAdmin?: boolean
  onDeleted: (id: string) => Promise<void> | void
}

export function CourseHeader({
  course,
  isAdmin = false,
  onDeleted,
}: CourseHeaderProps) {
  return (
    <Card className="gap-5 rounded-xl border-border/80 py-5">
      <CardHeader className="gap-4 px-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Button asChild variant="ghost" size="sm" className="-ml-3 w-fit">
              <Link to="/courses">
                <ArrowLeftIcon className="size-4" />
                Back to courses
              </Link>
            </Button>

            <div className="space-y-3">
              <div className="inline-flex w-fit items-center rounded-md border bg-muted px-2.5 py-1 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                {course.courseCode}
              </div>
              <CardTitle className="text-2xl tracking-tight">
                {course.courseTitle}
              </CardTitle>
            </div>
          </div>

          {isAdmin ? (
            <DeleteCourseDialog
              course={course}
              onDeleted={onDeleted}
              buttonLabel="Delete course"
            />
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="grid gap-4 border-t px-5 pt-5 sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Description
          </p>
          <CardDescription className="text-sm leading-6 text-foreground/85">
            {course.courseDescription}
          </CardDescription>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Course id
          </p>
          <p className="font-mono text-sm text-foreground">{course.id}</p>
        </div>
      </CardContent>
    </Card>
  )
}
