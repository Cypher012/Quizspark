import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'

type CourseProgress = {
  code: string
  title: string
  questionsAttempted: number
  totalQuestions: number
  avgScore: number
}

const mockCourses: CourseProgress[] = [
  {
    code: 'CPE 316',
    title: 'Intro to Artificial Intelligence',
    questionsAttempted: 24,
    totalQuestions: 60,
    avgScore: 78,
  },
  {
    code: 'CSC 302',
    title: 'Object Oriented Programming',
    questionsAttempted: 40,
    totalQuestions: 80,
    avgScore: 65,
  },
  {
    code: 'CSC 308',
    title: 'Numerical Computation II',
    questionsAttempted: 10,
    totalQuestions: 50,
    avgScore: 90,
  },
]

function ProgressBar({
  value,
  max,
  color,
}: {
  value: number
  max: number
  color: string
}) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  )
}

export function CoursesProgress() {
  return (
    <Card className="border-none bg-accent">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">
            Courses Progress
          </CardTitle>
          <Link
            to="/courses"
            className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all <ChevronRight size={13} />
          </Link>
        </div>

        <div className="flex items-center gap-4 mt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            <span className="text-xs text-muted-foreground">
              Questions attempted
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span className="text-xs text-muted-foreground">Avg score</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-5 pt-2">
        {mockCourses.map((course) => (
          <div key={course.code} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-mono font-medium text-primary shrink-0">
                  {course.code}
                </span>
                <span className="text-sm text-muted-foreground truncate">
                  {course.title}
                </span>
              </div>
              <span className="text-xs text-muted-foreground shrink-0 ml-4">
                {course.questionsAttempted}/{course.totalQuestions}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <ProgressBar
                  value={course.questionsAttempted}
                  max={course.totalQuestions}
                  color="var(--primary)"
                />
                <span className="text-xs text-muted-foreground shrink-0 w-8 text-right">
                  {Math.round(
                    (course.questionsAttempted / course.totalQuestions) * 100,
                  )}
                  %
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ProgressBar
                  value={course.avgScore}
                  max={100}
                  color="#10b981"
                />
                <span className="text-xs text-muted-foreground shrink-0 w-8 text-right">
                  {course.avgScore}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
