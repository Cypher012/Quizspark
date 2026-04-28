import { Link } from '@tanstack/react-router'
import { ChevronRight, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Button } from '#/components/ui/button'

const courses = [
  { code: 'CPE 316', title: 'Intro to Artificial Intelligence', topics: 8 },
  { code: 'CSC 302', title: 'Object Oriented Programming', topics: 6 },
  { code: 'CSC 308', title: 'Numerical Computation II', topics: 5 },
  { code: 'CSC 312', title: 'Systems Analysis & Design', topics: 7 },
]

export function QuickStart() {
  return (
    <Card className="border-none bg-accent">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            Quick Start
          </CardTitle>
          <Link
            to="/courses"
            className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all <ChevronRight size={13} />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {courses.map((course) => (
          <div
            key={course.code}
            className="flex items-center justify-between rounded-lg  px-3 py-2.5 hover:bg-accent transition-colors group"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-mono font-medium text-primary">
                {course.code}
              </span>
              <span className="text-xs text-muted-foreground truncate mt-0.5">
                {course.title}
              </span>
            </div>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="shrink-0 h-7 text-xs ml-3"
            >
              <Link to="/quiz">Start</Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
