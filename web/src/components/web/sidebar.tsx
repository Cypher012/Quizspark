import { Link } from "@tanstack/react-router"

import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar"
import { Separator } from "#/components/ui/separator"
import { cn } from "#/lib/utils"

const navigationItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: DashboardIcon,
  },
  {
    label: "Courses",
    to: "/courses",
    icon: CoursesIcon,
  },
  {
    label: "Quiz",
    to: "/quiz",
    icon: QuizIcon,
  },
  {
    label: "Results",
    to: "/results",
    icon: ResultsIcon,
  },
] as const

const dashboardHomePath = "/" as never

type DashboardSidebarProps = {
  userName?: string
  userEmail?: string
  userImage?: string | null
}

export function DashboardSidebar({
  userName = "Alex Johnson",
  userEmail = "alex@quizspark.app",
  userImage,
}: DashboardSidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[240px] flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex h-20 items-center px-6">
        <Link
          to={dashboardHomePath}
          className="flex items-center gap-3 rounded-xl outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <span className="text-sm font-semibold tracking-[0.2em]">QS</span>
          </div>
          <div className="min-w-0">
            <p className="text-lg font-semibold leading-none">QuizSpark</p>
            <p className="text-xs text-muted-foreground">Learning command center</p>
          </div>
        </Link>
      </div>

      <Separator />

      <nav className="flex-1 space-y-2 px-4 py-6">
        {navigationItems.map(({ label, to, icon: Icon }) => (
          <Link
            key={to}
            to={to as never}
            activeOptions={{ exact: to === "/" }}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              "[&.active]:bg-sidebar-accent [&.active]:text-sidebar-accent-foreground"
            )}
          >
            <Icon />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto p-4">
        <Separator className="mb-4" />
        <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent/70 px-3 py-3">
          <Avatar size="lg" className="border border-border/60">
            <AvatarImage src={userImage ?? undefined} alt={userName} />
            <AvatarFallback>{getInitials(userName)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{userName}</p>
            <p className="truncate text-xs text-muted-foreground">{userEmail}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

function getInitials(name: string) {
  const parts = name
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2)

  if (parts.length === 0) {
    return "QS"
  }

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("")
}

function DashboardIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 13.5h6.5V20H4z" />
      <path d="M13.5 4H20v8h-6.5z" />
      <path d="M4 4h6.5v6H4z" />
      <path d="M13.5 15.5H20V20h-6.5z" />
    </svg>
  )
}

function CoursesIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v14H7.5A2.5 2.5 0 0 0 5 20.5z" />
      <path d="M5 6.5v14" />
      <path d="M8.5 8.5h7" />
      <path d="M8.5 12h7" />
    </svg>
  )
}

function QuizIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 2-3 4" />
      <path d="M12 17h.01" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  )
}

function ResultsIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 19V9" />
      <path d="M12 19V5" />
      <path d="M19 19v-7" />
      <path d="M3 19h18" />
    </svg>
  )
}
