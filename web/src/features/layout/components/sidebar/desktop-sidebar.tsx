import { Separator } from '#/components/ui/separator'
import type { DashboardLayoutUserProps } from '../types'
import { SidebarLogo } from './sidebar-logo'
import { SidebarNav } from './sidebar-nav'
import { SidebarUser } from './sidebar-user'

export function DesktopDashboardSidebar({
  user,
}: {
  user: DashboardLayoutUserProps
}) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden md:flex w-[240px] flex-col text-sidebar-foreground">
      <div className="flex h-20 items-center px-6">
        <SidebarLogo />
      </div>
      <SidebarNav />
      <SidebarUser user={user} />
    </aside>
  )
}
