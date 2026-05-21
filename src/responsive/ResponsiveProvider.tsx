import React, { useState, useEffect, useCallback } from "react"
import { ResponsiveContext } from "./ResponsiveContext"
import { breakpoints } from "./breakpointTokens"
import type { Breakpoint } from "./types"

const BREAKPOINT_ORDER: Breakpoint[] = ["sm", "md", "lg", "xl", "xxl"]

export function resolveBreakpoint(width: number): Breakpoint {
  if (width >= breakpoints.xxl) return "xxl"
  if (width >= breakpoints.xl) return "xl"
  if (width >= breakpoints.lg) return "lg"
  if (width >= breakpoints.md) return "md"
  return "sm"
}

interface ResponsiveProviderProps {
  children: React.ReactNode
}

export function ResponsiveProvider({ children }: ResponsiveProviderProps) {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
    if (typeof window === "undefined") return "lg"
    return resolveBreakpoint(window.innerWidth)
  })

  const handleResize = useCallback(() => {
    setBreakpoint(resolveBreakpoint(window.innerWidth))
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  const isMobile = breakpoint === "sm"
  const isTablet = breakpoint === "md"
  const isDesktop = breakpoint === "lg" || breakpoint === "xl" || breakpoint === "xxl"

  return (
    <ResponsiveContext.Provider value={{ breakpoint, isMobile, isTablet, isDesktop }}>
      {children}
    </ResponsiveContext.Provider>
  )
}

export { BREAKPOINT_ORDER }
