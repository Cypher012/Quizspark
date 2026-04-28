import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { itemVariants } from './user-menu'

export default function UserMenuItem({
  href,
  icon,
  label,
  params,
  onClick,
}: {
  href: string
  icon: React.ReactNode
  params?: Record<string, string>
  label: string
  onClick: () => void
}) {
  return (
    <motion.div variants={itemVariants}>
      <Link
        to={href}
        onClick={onClick}
        params={params}
        className="md:text-sm text-xs text-foreground/80 hover:bg-muted hover:text-foreground flex items-center space-x-3 rounded-lg px-3 py-2 font-medium transition-colors"
      >
        {icon}
        <span>{label}</span>
      </Link>
    </motion.div>
  )
}
