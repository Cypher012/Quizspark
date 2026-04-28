import UserMenu from './user-menu'
import type { DashboardLayoutUserProps } from '../types'
import { useBreakpoint } from '#/hooks/use-mobile'
import MobileDashboardSidebar from '../sidebar/mobile-sidebar'

const DashboardHeader = ({ user }: { user: DashboardLayoutUserProps }) => {
  const { isTablet, isMobile } = useBreakpoint()

  return (
    <header className="bg-background lg:fixed sticky top-0 left-0 right-0 z-20  flex justify-between items-center py-4 px-6 md:px-8 border-b backdrop-blur border-border/20 supports-backdrop-filter:bg-background/60">
      <div className="w-full space-x-5 flex justify-between lg:justify-end items-center">
        {(isMobile || isTablet) && <MobileDashboardSidebar user={user} />}
        <UserMenu user={user} />
      </div>
    </header>
  )
}

export default DashboardHeader
