import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useTheme } from 'next-themes'
import { Sun, Moon, LogOut, ChevronDown } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { authClient } from '#/lib/auth-client'

type DashboardHeaderProps = {
  userName?: string
  userEmail?: string
  userImage?: string | null
}

const titleByPathname: Record<string, string> = {
  '/': 'Dashboard',
  '/courses': 'Courses',
  '/topics': 'Topics',
  '/quiz': 'Quiz',
  '/results': 'Results',
}

function getPageTitle(pathname: string) {
  if (pathname.startsWith('/courses/')) return 'Course details'
  if (pathname.startsWith('/topics/')) return 'Topic details'
  if (titleByPathname[pathname]) return titleByPathname[pathname]
  const segment = pathname.split('/').filter(Boolean).at(-1) ?? 'dashboard'
  return segment.charAt(0).toUpperCase() + segment.slice(1)
}

function getInitials(name: string) {
  return (
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0].toUpperCase())
      .join('') || 'QS'
  )
}

export function DashboardHeader({
  userName = 'User',
  userEmail = '',
  userImage,
}: DashboardHeaderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { resolvedTheme, setTheme } = useTheme()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const title = useMemo(
    () => getPageTitle(location.pathname),
    [location.pathname],
  )

  async function handleSignOut() {
    try {
      setIsSigningOut(true)
      await authClient.signOut()
      await navigate({ to: '/auth' })
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background px-6">
      <h1 className="text-lg font-semibold tracking-tight">{title}</h1>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="size-7">
                <AvatarImage src={userImage ?? undefined} alt={userName} />
                <AvatarFallback className="text-xs">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {userName.split(' ')[0]}
              </span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{userName}</span>
              <span className="text-xs text-muted-foreground">{userEmail}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              disabled={isSigningOut}
              onSelect={(e) => {
                e.preventDefault()
                void handleSignOut()
              }}
              className="gap-2"
            >
              <LogOut size={14} />
              {isSigningOut ? 'Signing out...' : 'Sign out'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
