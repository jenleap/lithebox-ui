import type { BreakpointTokens, ResponsiveDensityTokens } from "./types"

export const breakpoints: BreakpointTokens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const

export const responsiveDensity: ResponsiveDensityTokens = {
  sm: "compact",
  md: "comfortable",
  lg: "comfortable",
} as const
