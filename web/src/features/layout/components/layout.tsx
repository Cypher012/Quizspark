import { Outlet } from '@tanstack/react-router'
import DashboardHeader from './header/header'
import DashboardSidebar from './sidebar/sidebar'
import type { DashboardLayoutProps } from './types'

export function DashboardLayout({ user }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardSidebar user={user} />

      <div className="lg:ml-[240px] min-h-screen">
        <DashboardHeader user={user} />

        <main className="min-h-screen bg-muted/50 px-3 md:px-6 py-6 lg:pt-24 ">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
