import { Menu } from 'lucide-react'
import { Button } from '#/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '#/components/ui/drawer'
import { SidebarNav } from '#/features/layout/components/sidebar/sidebar-nav'
import { SidebarLogo } from '#/features/layout/components/sidebar/sidebar-logo'
import { SidebarUser } from '#/features/layout/components/sidebar/sidebar-user'
import type { DashboardLayoutUserProps } from '../types'

type MobileSidebarProps = {
  user: DashboardLayoutUserProps
}

export default function MobileDashboardSidebar({ user }: MobileSidebarProps) {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[240px] h-full flex flex-col">
        <DrawerTitle className="sr-only">Navigation menu</DrawerTitle>
        <DrawerDescription className="sr-only">
          Browse dashboard navigation links and account actions.
        </DrawerDescription>
        <div className="flex h-20 items-center px-6">
          <SidebarLogo />
        </div>
        <SidebarNav />
        <SidebarUser user={user} />
      </DrawerContent>
    </Drawer>
  )
}
