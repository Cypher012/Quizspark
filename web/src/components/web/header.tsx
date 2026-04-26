"use client"

import { useMemo, useState } from "react"
import { useLocation, useNavigate } from "@tanstack/react-router"
import { useTheme } from "next-themes"

import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar"
import { Button } from "#/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu"
import { Skeleton } from "#/components/ui/skeleton"
import { authClient } from "#/lib/auth-client"

type DashboardHeaderProps = {
  userName?: string
  userEmail?: string
  userImage?: string | null
}

const titleByPathname: Record<string, string> = {
  "/": "Dashboard",
  "/courses": "Courses",
  "/quiz": "Quiz",
  "/results": "Results",
}

export function DashboardHeader({
  userName = "Alex Johnson",
  userEmail = "alex@quizspark.app",
  userImage,
}: DashboardHeaderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { resolvedTheme, setTheme } = useTheme()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const title = useMemo(
    () => getPageTitle(location.pathname),
    [location.pathname]
  )

  const isThemeReady = resolvedTheme === "light" || resolvedTheme === "dark"

  async function handleSignOut() {
    try {
      setIsSigningOut(true)
      await authClient.signOut()
      await navigate({ to: "/auth" })
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
          QuizSpark workspace
        </p>
        {isThemeReady ? (
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        ) : (
          <Skeleton className="h-8 w-40" />
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label={
            resolvedTheme === "dark"
              ? "Switch to light theme"
              : "Switch to dark theme"
          }
        >
          {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="h-auto rounded-full px-1.5 py-1"
            >
              <Avatar className="border border-border/60">
                <AvatarImage src={userImage ?? undefined} alt={userName} />
                <AvatarFallback>{getInitials(userName)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">{userName}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {userEmail}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              disabled={isSigningOut}
              onSelect={(event) => {
                event.preventDefault()
                void handleSignOut()
              }}
            >
              {isSigningOut ? "Signing out..." : "Sign out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function getPageTitle(pathname: string) {
  if (titleByPathname[pathname]) {
    return titleByPathname[pathname]
  }

  if (pathname.startsWith("/")) {
    const segment = pathname.split("/").filter(Boolean).at(-1) ?? "dashboard"
    return segment.charAt(0).toUpperCase() + segment.slice(1)
  }

  return "Dashboard"
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

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.25" />
      <path d="M12 19.25v2.25" />
      <path d="m4.93 4.93 1.59 1.59" />
      <path d="m17.48 17.48 1.59 1.59" />
      <path d="M2.5 12h2.25" />
      <path d="M19.25 12h2.25" />
      <path d="m4.93 19.07 1.59-1.59" />
      <path d="m17.48 6.52 1.59-1.59" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
    </svg>
  )
}
