import { Outlet } from "@tanstack/react-router"
import { DashboardSidebar } from "./sidebar"
import { DashboardHeader } from "./header"



type DashboardLayoutProps = {
  userName?: string
  userEmail?: string
  userImage?: string | null
}

export function DashboardLayout({
  userName,
  userEmail,
  userImage,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardSidebar
        userName={userName}
        userEmail={userEmail}
        userImage={userImage}
      />

      <div className="ml-[240px] min-h-screen">
        <DashboardHeader
          userName={userName}
          userEmail={userEmail}
          userImage={userImage}
        />

        <main className="min-h-[calc(100vh-5rem)] px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
