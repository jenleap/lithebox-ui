export type Breakpoint = "sm" | "md" | "lg" | "xl" | "xxl"

export interface BreakpointTokens {
  sm: number
  md: number
  lg: number
  xl: number
  xxl: number
}

export type ResponsiveDensity = "compact" | "comfortable"

export interface ResponsiveDensityTokens {
  sm: ResponsiveDensity
  md: ResponsiveDensity
  lg: ResponsiveDensity
}

export type ResponsiveValue<T> = Partial<Record<Breakpoint, T>>
