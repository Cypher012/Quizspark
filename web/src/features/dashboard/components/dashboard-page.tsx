import { CoursesProgress } from './courses-progress'
import { DashboardHero } from './dashboard-hero'
import { DashboardStatsPanel } from './dashboard-stats-panel'
import { RecentQuizzes } from './recent-quizzes'
import { QuickStart } from './quick-start'
import { useBreakpoint } from '#/hooks/use-mobile'
import { cn } from '#/lib/utils'

export default function DashboardPage() {
  const { width } = useBreakpoint()
  return (
    <div className="space-y-6">
      <div
        className={cn(
          'grid items-stretch',
          width > 900 ? 'grid-cols-12 gap-6' : 'grid-cols-1 gap-y-6',
        )}
      >
        <div className="col-span-7 xl:col-span-8 h-full">
          <DashboardHero
            userName="Ayowole Ojoade"
            lastCourse={{
              title: 'Introduction to Artificial Intelligence',
              code: 'CPE 316',
              topic: 'Search Algorithms',
              questionsAnswered: 6,
              totalQuestions: 32,
            }}
          />
        </div>
        <div className="col-span-5 xl:col-span-4 h-full">
          <DashboardStatsPanel />
        </div>
      </div>
      <div className="">
        <CoursesProgress />
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <RecentQuizzes />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <QuickStart />
        </div>
      </div>
    </div>
  )
}
