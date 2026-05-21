import { useContext, useCallback } from "react"
import { ResponsiveContext } from "./ResponsiveContext"
import { BREAKPOINT_ORDER } from "./ResponsiveProvider"
import type { Breakpoint } from "./types"

export interface UseBreakpointResult {
  breakpoint: Breakpoint
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isAtLeast: (bp: Breakpoint) => boolean
  isAtMost: (bp: Breakpoint) => boolean
}

export function useBreakpoint(): UseBreakpointResult {
  const { breakpoint, isMobile, isTablet, isDesktop } = useContext(ResponsiveContext)

  const currentIndex = BREAKPOINT_ORDER.indexOf(breakpoint)

  const isAtLeast = useCallback(
    (bp: Breakpoint) => currentIndex >= BREAKPOINT_ORDER.indexOf(bp),
    [currentIndex]
  )

  const isAtMost = useCallback(
    (bp: Breakpoint) => currentIndex <= BREAKPOINT_ORDER.indexOf(bp),
    [currentIndex]
  )

  return { breakpoint, isMobile, isTablet, isDesktop, isAtLeast, isAtMost }
}
