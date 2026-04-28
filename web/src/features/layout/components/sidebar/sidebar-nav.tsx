import { Link } from '@tanstack/react-router'
import { cn } from '#/lib/utils'
import { navigationItems } from './nav-items'

export function SidebarNav() {
  return (
    <nav className="flex-1 space-y-6 px-4 py-6">
      {navigationItems.map(({ label, to, icon: Icon }) => (
        <Link
          key={to}
          to={to as never}
          activeOptions={{ exact: to === '/' }}
          className={cn(
            'flex items-center gap-3 rounded-xl px-3 py-2.5 font-semibold text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            '[&.active]:bg-secondary/40 [&.active]:text-secondary-foreground',
          )}
        >
          <Icon />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  )
}
