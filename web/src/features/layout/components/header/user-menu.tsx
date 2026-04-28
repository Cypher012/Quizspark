// src/components/web/UserMenu.tsx
import { useState } from 'react'
import { motion, AnimatePresence, easeInOut } from 'framer-motion'
import { LogOut, Settings } from 'lucide-react'
import ThemeToggle from './theme-toggle'
import { useNavigate } from '@tanstack/react-router'
import { authClient } from '#/lib/auth-client'
import UserMenuItem from './user-menu-item'
import type { DashboardLayoutUserProps } from '../types'

export const menuVariants = {
  closed: {
    opacity: 0,
    x: 20,
    scale: 0.95,
    transition: { duration: 0.2, ease: easeInOut },
  },
  open: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.3, ease: easeInOut, staggerChildren: 0.05 },
  },
}

export const itemVariants = {
  closed: { opacity: 0, x: 10 },
  open: { opacity: 1, x: 0 },
}

export default function UserMenu({ user }: { user: DashboardLayoutUserProps }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  const navigate = useNavigate()

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
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
        whileTap={{ scale: 0.95 }}
      >
        <div className="md:size-9 size-8  overflow-hidden rounded-full border-2 border-transparent transition-colors hover:border-primary">
          <img
            src={user.image ?? ''}
            alt={user.name}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="border-border/30 bg-background absolute right-0 z-50 mt-3 md:w-64 w-55 overflow-hidden rounded-2xl border shadow-2xl"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="p-4">
                <div className="mb-4 flex flex-col px-2">
                  <span className="text-foreground truncate md:text-sm text-xs font-bold">
                    {user.name}
                  </span>
                  <span className="text-muted-foreground truncate md:text-xs text-[10px]">
                    {user.email}
                  </span>
                </div>

                <div className="space-y-1">
                  <UserMenuItem
                    href="/settings"
                    icon={<Settings className="md:size-4 size-3.5" />}
                    label="Settings"
                    onClick={() => setIsOpen(false)}
                  />
                  <motion.div variants={itemVariants}>
                    <ThemeToggle />
                  </motion.div>
                </div>

                <motion.div
                  className="border-border mt-4 border-t pt-2"
                  variants={itemVariants}
                >
                  <button
                    onClick={handleSignOut}
                    className="md:text-sm text-xs text-destructive hover:bg-destructive/10 flex w-full items-center space-x-3 rounded-lg px-3 py-2 font-medium transition-colors"
                  >
                    <LogOut className="md:size-4 size-3.5" />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
