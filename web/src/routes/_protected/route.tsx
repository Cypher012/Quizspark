import { useEffect, useState } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

import { Skeleton } from "#/components/ui/skeleton"
import { authClient } from "#/lib/auth-client"
import { DashboardLayout } from "#/components/web/layout"

export const Route = createFileRoute("/_protected")({
  component: ProtectedLayout,
})

type SessionData = Awaited<ReturnType<typeof authClient.getSession>>["data"]

function ProtectedLayout() {
  const navigate = useNavigate()
  const [session, setSession] = useState<SessionData | undefined>(undefined)

  useEffect(() => {
    let isMounted = true

    async function loadSession() {
      const { data } = await authClient.getSession()

      if (!isMounted) {
        return
      }

      if (!data) {
        await navigate({ to: "/auth", replace: true })
        return
      }

      setSession(data)
    }

    void loadSession()

    return () => {
      isMounted = false
    }
  }, [navigate])

  if (!session) {
    return <ProtectedLayoutSkeleton />
  }

  return (
    <DashboardLayout
      userName={session.user.name}
      userEmail={session.user.email}
      userImage={session.user.image}
    />
  )
}

function ProtectedLayoutSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-[240px] flex-col border-r bg-sidebar px-4 py-6">
        <Skeleton className="h-14 w-full rounded-2xl" />
        <div className="mt-6 space-y-3">
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
        <Skeleton className="mt-auto h-16 w-full rounded-xl" />
      </aside>

      <div className="ml-[240px] min-h-screen">
        <div className="flex h-20 items-center justify-between border-b px-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-40" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="size-9 rounded-md" />
            <Skeleton className="size-9 rounded-full" />
          </div>
        </div>

        <main className="px-6 py-6">
          <Skeleton className="h-40 w-full rounded-2xl" />
        </main>
      </div>
    </div>
  )
}
