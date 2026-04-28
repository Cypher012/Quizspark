import { Link } from '@tanstack/react-router'

export function SidebarLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 rounded-xl outline-none transition hover:opacity-90"
    >
      <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
        <span className="text-sm font-semibold tracking-[0.2em]">QS</span>
      </div>
      <div className="min-w-0">
        <p className="text-lg font-bold text-primary leading-none">QuizSpark</p>
      </div>
    </Link>
  )
}
