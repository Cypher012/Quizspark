import { DashboardIcon, CoursesIcon, TopicsIcon, ResultsIcon } from './icons'

export const navigationItems = [
  { label: 'Dashboard', to: '/', icon: DashboardIcon },
  { label: 'Courses', to: '/courses', icon: CoursesIcon },
  { label: 'Topics', to: '/topics', icon: TopicsIcon },
  { label: 'Results', to: '/results', icon: ResultsIcon },
] as const
