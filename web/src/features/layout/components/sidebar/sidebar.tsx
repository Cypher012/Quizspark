import { useBreakpoint } from '#/hooks/use-mobile'
import { DesktopDashboardSidebar } from './desktop-sidebar'
import type { DashboardLayoutUserProps } from '../types'

const DashboardSidebar = ({ user }: { user: DashboardLayoutUserProps }) => {
  const { isDesktop } = useBreakpoint()

  if (isDesktop) return <DesktopDashboardSidebar user={user} />

  return null
}

export default DashboardSidebar
