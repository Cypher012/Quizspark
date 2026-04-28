import { Link } from '@tanstack/react-router'

import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import type { Course } from '../types'
import { DeleteCourseDialog } from './delete-course-dialog'

type CourseRowCardProps = {
  course: Course
  isAdmin?: boolean
}

export function CourseRowCard({
  course,
  isAdmin = false,
}: CourseRowCardProps) {
  return (
    <Card className="gap-4 rounded-lg border-border/80 py-5">
      <CardHeader className="gap-3 px-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="inline-flex w-fit items-center rounded-md border bg-muted px-2.5 py-1 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              {course.courseCode}
            </div>
            <CardTitle className="text-lg leading-tight">
              {course.courseTitle}
            </CardTitle>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin ? (
              <DeleteCourseDialog course={course} />
            ) : null}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-5">
        <CardDescription className="text-sm leading-6 text-foreground/85">
          {course.courseDescription}
        </CardDescription>
      </CardContent>

      <CardFooter className="justify-between border-t px-5 pt-4">
        <p className="text-sm text-muted-foreground">
          Course id: <span className="font-mono text-foreground">{course.id}</span>
        </p>
        <Button asChild variant="outline" size="sm">
          <Link
            to="/courses/$courseId"
            params={{ courseId: course.id }}
          >
            View details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
