import { useEffect, useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { Skeleton } from '#/components/ui/skeleton'
import { authClient } from '#/lib/auth-client'
import { AuthProvider } from '#/features/auth/auth-context'
import { DashboardLayout } from '#/features/layout/components/layout'
import type { DashboardLayoutUserProps } from '#/features/layout/components/types'

export const Route = createFileRoute('/_protected')({
  component: ProtectedLayout,
})

type SessionData = typeof authClient.$Infer.Session

function ProtectedLayout() {
  const navigate = useNavigate()
  const [session, setSession] = useState<SessionData | null | undefined>(
    undefined,
  )

  useEffect(() => {
    let isMounted = true

    async function loadSession() {
      const { data } = await authClient.getSession()

      if (!isMounted) {
        return
      }

      if (!data) {
        await navigate({ to: '/auth', replace: true })
        return
      }

      setSession(data)
    }

    void loadSession()

    return () => {
      isMounted = false
    }
  }, [navigate])

  if (session === undefined) return <LoadingScreen />
  if (session === null) return null

  const user: DashboardLayoutUserProps = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  }

  return (
    <AuthProvider
      value={{
        isAdmin: getIsAdmin(session.user),
      }}
    >
      <DashboardLayout user={user} />
    </AuthProvider>
  )
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <span className="text-sm font-semibold tracking-[0.2em]">QS</span>
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  )
}

function getIsAdmin(user: SessionData['user']) {
  return 'role' in user && user.role === 'admin'
}
