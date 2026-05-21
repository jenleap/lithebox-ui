import { createContext } from "react"
import type { Breakpoint } from "./types"

export interface ResponsiveContextValue {
  breakpoint: Breakpoint
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export const ResponsiveContext = createContext<ResponsiveContextValue>({
  breakpoint: "lg",
  isMobile: false,
  isTablet: false,
  isDesktop: true,
})
