// src/features/dashboard/components/recent-quizzes.tsx
import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { cn } from '#/lib/utils'

type QuizAttempt = {
  id: string
  courseCode: string
  courseTitle: string
  score: number
  total: number
  mode: 'practice' | 'exam'
  date: string
}

const mockAttempts: QuizAttempt[] = [
  {
    id: '1',
    courseCode: 'CPE 316',
    courseTitle: 'Intro to AI',
    score: 18,
    total: 20,
    mode: 'exam',
    date: '2 hours ago',
  },
  {
    id: '2',
    courseCode: 'CSC 302',
    courseTitle: 'OOP',
    score: 12,
    total: 20,
    mode: 'practice',
    date: 'Yesterday',
  },
  {
    id: '3',
    courseCode: 'CSC 308',
    courseTitle: 'Numerical Computation II',
    score: 8,
    total: 20,
    mode: 'exam',
    date: '2 days ago',
  },
  {
    id: '4',
    courseCode: 'CSC 312',
    courseTitle: 'Systems Analysis',
    score: 15,
    total: 20,
    mode: 'practice',
    date: '3 days ago',
  },
]

function ScoreBadge({ score, total }: { score: number; total: number }) {
  const pct = (score / total) * 100
  const color =
    pct >= 70
      ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
      : pct >= 50
        ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/40'
        : 'text-red-600 bg-red-50 dark:bg-red-950/40'
  return (
    <span
      className={cn(
        'text-xs font-semibold px-2 py-1 rounded-md font-mono',
        color,
      )}
    >
      {score}/{total}
    </span>
  )
}

export function RecentQuizzes() {
  return (
    <Card className="border-none bg-accent">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">
            Recent Quizzes
          </CardTitle>
          <Link
            to="/results"
            className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all <ChevronRight size={13} />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {mockAttempts.map((attempt) => (
          <Link
            key={attempt.id}
            to="/results"
            className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-accent transition-colors group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-primary shrink-0">
                    {attempt.courseCode}
                  </span>
                  <span
                    className={cn(
                      'text-[10px] px-1.5 py-0.5 rounded font-medium',
                      attempt.mode === 'exam'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {attempt.mode}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground truncate mt-0.5">
                  {attempt.courseTitle}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <ScoreBadge score={attempt.score} total={attempt.total} />
              <span className="text-xs text-muted-foreground hidden sm:block">
                {attempt.date}
              </span>
              <ChevronRight
                size={13}
                className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
