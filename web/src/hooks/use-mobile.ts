import { useWindowSize } from '@reactuses/core'

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export function useIsMobile() {
  const { width } = useWindowSize()
  return width < breakpoints.md
}

export function useBreakpoint() {
  const { width } = useWindowSize()

  return {
    width,

    // exact ranges
    isXs: width < breakpoints.sm,
    isSm: width >= breakpoints.sm && width < breakpoints.md,
    isMd: width >= breakpoints.md && width < breakpoints.lg,
    isLg: width >= breakpoints.lg && width < breakpoints.xl,
    isXl: width >= breakpoints.xl && width < breakpoints['2xl'],
    is2xl: width >= breakpoints['2xl'],

    // semantic aliases
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
  }
}
