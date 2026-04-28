import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { PlayCircle, BookOpen } from 'lucide-react'

type DashboardHeroProps = {
  userName: string
  lastCourse?: {
    title: string
    code: string
    topic: string
    questionsAnswered: number
    totalQuestions: number
  }
}

function getGreeting(name: string) {
  const hour = new Date().getHours()
  const period = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
  return `Good ${period}, ${name.split(' ')[0]}`
}

export function DashboardHero({
  userName,
  lastCourse,
  stats,
}: DashboardHeroProps) {
  const greeting = useMemo(() => getGreeting(userName), [userName])

  return (
    <div className="h-full rounded-xl bg-primary text-primary-foreground p-5 sm:p-6 overflow-hidden relative">
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 -translate-y-1/2 translate-x-1/4"
        style={{ background: 'var(--primary-foreground)' }}
      />
      <div
        className="absolute bottom-0 right-32 w-40 h-40 rounded-full opacity-10 translate-y-1/2"
        style={{ background: 'var(--primary-foreground)' }}
      />

      <div className="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-5">
        <div className="flex flex-col gap-3 sm:max-w-[60%]">
          <div>
            <p className="text-lg sm:text-xl font-semibold opacity-70 mb-0.5">
              {greeting}
            </p>
            <p className="text-xs opacity-50">
              Nice to have you back. Keep the momentum going.
            </p>
          </div>

          {lastCourse ? (
            <div>
              <p className="text-xs font-medium uppercase tracking-widest opacity-60 mb-1">
                Last studied
              </p>
              <h2 className="text-base sm:text-xl font-semibold leading-snug mb-1">
                {lastCourse.title}
              </h2>
              <p className="text-xs sm:text-sm opacity-60 mb-4 font-mono">
                {lastCourse.code} · {lastCourse.topic} ·{' '}
                {lastCourse.questionsAnswered}/{lastCourse.totalQuestions}{' '}
                questions
              </p>
              <Link
                to="/quiz"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary rounded-lg px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <PlayCircle size={15} />
                Continue quiz
              </Link>
            </div>
          ) : (
            <div>
              <h2 className="text-base sm:text-xl font-semibold mb-1">
                Ready to study?
              </h2>
              <p className="text-xs sm:text-sm opacity-60 mb-4">
                Pick a course and start practicing for your exams.
              </p>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary rounded-lg px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <BookOpen size={15} />
                Browse courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
