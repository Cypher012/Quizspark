import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { Separator } from '#/components/ui/separator'
import type { DashboardLayoutUserProps } from '../types'

type SidebarUserProps = {
  user: DashboardLayoutUserProps
}

export function getInitials(name?: string) {
  if (!name) return 'QS'
  const parts = name
    .split(' ')
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 2)
  return parts.map((p) => p[0].toUpperCase()).join('')
}

export function SidebarUser({ user }: SidebarUserProps) {
  return (
    <div className="mt-auto p-4">
      <Separator className="mb-4" />
      <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent/70 px-3 py-3">
        <Avatar size="lg" className="border border-border/60">
          <AvatarImage src={user.image ?? undefined} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </div>
  )
}
