import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'

type StatItem = {
  label: string
  value: number
  total: number
  color: string
}

const stats: StatItem[] = [
  { label: 'Courses', value: 6, total: 9, color: '#6366f1' },
  { label: 'Questions', value: 124, total: 300, color: '#f59e0b' },
  { label: 'Quizzes', value: 14, total: 50, color: '#10b981' },
  { label: 'Topics', value: 18, total: 40, color: '#ec4899' },
]

export function DashboardStatsPanel() {
  const totalContents = stats.reduce((acc, s) => acc + s.total, 0)

  return (
    <Card className="h-full border-none bg-accent">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">
            Total Contents
          </CardTitle>
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
            {totalContents} contents
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3"
            >
              <div>
                <p className="text-xl font-semibold leading-none">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
              <CircleProgress
                value={stat.value}
                total={stat.total}
                color={stat.color}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function CircleProgress({
  value,
  total,
  color,
}: {
  value: number
  total: number
  color: string
}) {
  const size = 44
  const stroke = 3.5
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const progress = Math.min(value / total, 1)
  const offset = circumference * (1 - progress)

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--muted)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  )
}
